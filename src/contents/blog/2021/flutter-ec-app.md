---
slug: flutter-ec-app
title: Flutter でECアプリを新規開発してみて
createdAt: '2021-12-17'
pubDate: '2021-12-17'
tags: ['Flutter']
status: published
---

この記事は[株式会社TORICO Advent Calendar 2021](https://qiita.com/advent-calendar/2021/torico) の17日目の記事です。

-----

:::message
この記事ではFlutter 2.8, Dart 2.15 を対象としています。
:::

はじめまして。

株式会社TORICO でモバイルアプリエンジニアをしている[0maru](https://twitter.com/0maru_dev) です。
今回はECアプリをFlutter で開発したことについてお話したいとおもいます。

# はじめに

弊社では４つのモバイルアプリがリリースされており、その全てがFlutter で開発されています。
Git のコミットを遡ってみると初めてのコミットは2019年1月でした。
Flutter のバージョン1.0 がリリースされたのが2018年12月なのでバージョン 1.0 がリリースされてすぐにFlutter をプロダクションに採用しているので、弊社は比較的Flutter の採用が早かった会社ではないでしょうか。

今回開発したのは弊社の主要事業である漫画全巻ドットコムのモバイルアプリです。
漫画全巻ドットコムとはECサイトで鬼滅の刃なら1~23巻の23巻セットで、ワンピースなら1~101巻の101巻セットで全巻をまとめ買いができるサービスです。
漫画全巻ドットコムでは受注から出荷までワンストップで行われており、漫画は東京の本社に併設されている倉庫から発送されています。
今回は本サービスの紙の漫画を購入できるアプリを開発したことについてお話します。

また本サービスでは電子書籍も取り扱っており、電子書籍のリーダーアプリもFlutter で開発しリリースしていますが今回は触れません。
もしかするともうひとりのアプリエンジニアがアドベントカレンダーで書いてくれるかもしれないので良かったら[株式会社TORICO Advent Calendar 2021](https://qiita.com/advent-calendar/2021/torico) をチェックしてみてください！

# アプリについて

今回の記事ではサンプルコードは少なめです。
CI/CD, マルチパッケージ、Flutter のバージョン管理に関しては別で記事を書いていますので、[約3年間Flutter で開発してきてのあれやこれや](https://zenn.dev/0maru/articles/262c0f8ad52a0d) を確認してください。
まだ実際のコードを掻い摘んで掲載してる為、多少おかしいと感じる箇所があるかも知れませんがご了承ください。

## Flutter を採用した理由

このアプリを開発するという話を聞いたときにネイティブアプリとして作る話は全く出てこなかったと記憶しています。CTOから開発の話を聞いたときにはもちろんFlutter だよね！といった感じで話が進んでいたはずです。

上でも述べましたが、このアプリの開発が決定するまでにすでにFlutter 製のアプリが3つリリースされていたため私自身もFlutter を採用することに不安はありませんでした。
またECアプリということもあり、OS固有の機能（LiDARスキャナやセンサーなど）を使用することはなく、Flutter(Dart) で機能要件を満たせているということもFlutter を採用する決め手ではないでしょうか。

## アプリの構成について

このアプリはFirebase などのmBaas などで作っているわけではなく、サーバーサイドはPython とPHP で実装されており、WebAPIでリクエストするようになっています。
HttpClient は[`dio`](https://pub.dev/packages/dio) を使用しており、[`json_serializable`](https://pub.dev/packages/json_serializable) でJSON をクラスに変換しています。

Firebaseで作っているわけではないと書きましたが、Firebaseを全く使っていないわけではなくて、FCMやAnalytics、In-App Messaging,、RemoteConfig などはもちろん利用しています。

### 状態管理について

Flutter の記事を見ているとまだまだ状態管理についての記事が多く、この記事を読んでいる方もこのサービスではどの状態管理のライブラリーを使用しているのかと気になっている方が多いのではないでしょうか？


Provider を使用しており、StateNotifierを組み合わせて[`Provider`](https://pub.dev/packages/provider) + [`StateNotifier`](https://pub.dev/packages/state_notifier) + [`freezed`](https://pub.dev/packages/freezed) で開発しています。
Riverpod の記事を読めると期待されていた方はすみません...

Provider を採用した理由ついてですが、このアプリの開発初期段階ですでに`Riverpod v0.8.0` がリリースされており、Riverpod を選択するということも可能でした。
しかし、開発チーム内にアプリの開発だけを行う専任のメンバーが居るわけではなく、色々なメンバーが開発する可能性があったため情報も多く、弊社の他のアプリでも使われているという理由でProvider を採用しました。

Provider の使い方としてはごく普通の使い方で、1ページ、１コントローラー（Provider） なページがほとんどです。コントローラーに処理が多くなると適切に切り分けコントローラーの数が1 + α になることもあります。

### 設計について
デザインパターンとしてはRepository パターンを採用しています。
ほとんどの処理はサーバーサイドに寄せているので、アプリでは最低限の処理しか行わないので最低限秩序を保ちつつ開発速度などを考慮してRepositoryパターンを採用しました。

リポジトリの扱い方ですが、全てのリポジトリはProvider で提供しており、ツリーの下部にあるService やController から使えるようになっています。
リポジトリをなぜProvider で提供しているかというと、理由はDI で依存性の注入をしたかったからです。


```dart
// Provider でリポジトリを提供する
return MultiProvider(
  providers: [
    Provider(create: (_) => UserRepository()),
    Provider(create: (_) => PaymentRepository()),
    ...
  ],
  child: ...
);
```

さらにコントローラーでは`LocatorMixin` をMixin しているので、contextやcontext.read をコンストラクタの引数にしなくても使用できます。
ただcontextが不要という訳ではなくて、実際は`LocatorMixin` がその役目を代替してくれています。

```dart
class ProfileController extendsas StateNotifier<ProfileState> with LocatorMixin {
  ProfileController() : super(const ProfileState());
  
  // UserRepository get userRepository => context.read(); とおなじ
  UserRepository get userRepository => read();

  @override
  void initState() {
    super.initState();
    fetch();
  }

  Future<void> fetch() async {
    final result = await userRepository.get();
    state = state.copyWith(...);
  }
}

```

少し道がそれますが、`LocatorMixin`には[`debugMockDependency`](https://pub.dev/documentation/state_notifier/latest/state_notifier/LocatorMixin/debugMockDependency.html) というメソッドがあり、`debugMockDependency` を使用すると上記のコードの場合、 `UserRepository` をモックの`MockUserRepository` に差し替えることが出来ます。
この機能があるおかげでテストの際に、Controller が依存しているRepository(API通信などがありアプリ内で処理が完結しない) をモックに変えてテストを書くことができるといったメリットもあります。


### ディレクリ構成について

ディレクトリ構成は下記のようになっています。
誰かと相談して決めたわけではなく、開発を進めていて探り探り分割しているとこのようになっていました。Flutter の公式からおすすめされているような構成はなく、ディレクトリ構成はアーキテクチャによると思うので参考程度に見てください。

```
app/
  scripts/  # Dart で書かれたスクリプト
  packages/
    commons/  # 社内の共通ライブラリ
    app/  # アプリケーション
      lib/
        controller/  # 各ページのコントローラー(StateNotifier)とfreezed で書かれたモデル
          mypage/ 
            mypage_controller.dart
            mypage_state.dart
            mypage_state.freezed.dart
        models/
          user/
            user.dart
            user.freezed.dart
            user.g.dart
        pages/
          mypage/
            widgets/  # /pages/mypage にあるクラスからしか使用されないWidget
            mypage.dart
            profile.dart
        resources/
        repository/
        router/  # ページ遷移に関する処理など
        service/
        utils/
        widgets/  # 共通のWidget
        main.dart  # アプリケーションのエントリーポイント
```

### CI/CDについて

CI では`Github Actoins` を使用しています。
push の度にanalyze やformat が実行されるようになっています。
CD では`Codemagic` を使用しています。
テスト版の配布は iOS は`TestFlight`、Android は`Firebase App Distribution` を使用しています。
設定などに関してはこちらの記事をご確認ください。

https://zenn.dev/0maru/articles/262c0f8ad52a0d#ci%2Fcd-%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6

### PlatformView やMethodChannell について

今回のアプリでは各プラットフォームのネイティブの処理を呼び出すようなことはありませんでした。
自社のOAuthプロバイダーがあるのでそれようのライブラリは作成しましたが、[`twitter_login`](https://github.com/0maru/twitter_login) のコードを使いまわせたので、特に考えることもなく実装できました。

弊社の他のアプリではそこそこのサイズの画像を10枚から1000枚程度Canvasで全てのピクセルが移動するくらいに画像を加工してから表示するといった機能要件がありましたが、その際はたかだか画像ですがPlatformView を使って画像を表示する方法を取りました。

## その他諸々


### 決済方法について

このアプリでは紙の漫画を販売しているためアプリ内課金ではなく、クレジットカード決済やAmazonPay、auかんたん決済などの支払い方法を導入しています。

[`pub.dev`](https://pub.dev/) でいくら探しても、上記の決済方法をサポートしているライブラリは出てこないのではないでしょうか。この記事を書くにあたって軽く探してみましたが、現状では `Stripe`, `ApplePay`, `GooglePay`, `BrainTree`のライブラリくらいしか見つかりませんでした。
さらに決済代行会社を間に挟んでいるため、ライブラリが提供されていたとしても大抵使用出来ません。

またWeb版でも同じ決済方法を導入しているため、アプリではSDKを使用せずWeb版と同じWeb APIを使用したAPIベースで実装しないといけないといった制約もありました。
SDKが使えなかったりライブラリがないといっても、決済代行会社が提供しているドキュメントに沿って実装していくだけなのでけして難しいといったことはありませんでした。

難しくなかったといっても実装の段階で悩んだ点は何点かありました。
例えば、Web用のSDKしか提供していない決済方法でJavaScript のSDK を介してボタンを表示し決済を開始しないと行けない決済方法があり、その決済方法では支払いに使うクレジットカードやお届け先を変更する度にJSを実行してからでないと変更ができないのでWebView を部分的に埋め込んだりFlutterからJSを実行させるといった実装が必要になりました。

もう一つ悩んだ点が、このアプリではクレジットカード決済時のクレジットカードの登録処理です。クレジットカード決済時にユーザーが入力したクレジットカード番号は弊社のサーバーに送ることができません

クレジットカード番号はアプリ内でRSA暗号でトークン化して、そのトークンとユーザーIDを決済代行会社に送りユーザーに対してクレジットカード情報を登録してもらう必要があります。
トークン化の際に始めは[`encrypt`](https://pub.dev/packages/encrypt) だけを使用していたのですが、なぜかクレジットカードの登録に失敗しました。

トークン化されたものを見たところでなにがなんだか分からないので、決済代行会社が使用している鍵と同等の条件で公開鍵と秘密鍵を作りデバッグしていると、`encrypt` では[`pointycastle`](https://pub.dev/packages/pointycastle) と[`asn1lib`](https://pub.dev/packages/asn1lib) などに依存しており、今あげた２つのパッケージには同名のクラスが存在していることがわかりました。
そのうちの片方のライブラリの同名のクラスでは考慮漏れなのか、実装漏れなのか暗号化について詳しくないので判断つきませんでしたが、正常に動かないことがわかりました。
この段階でライブラリが使えなくなったので、`encrypt`の処理を確認しながら`pointycastle` と`asn1lib`を使って暗号化処理を実装するという暴挙に出ることになりました。

Dart には暗号化関連をライブラリを使用しなくても良いように充実させてほしいですね！


### freezed について

freezed で作成したクラスに複数のコンストラクタを持たせたい事があるかと思います。
API のレスポンスでJSON を受け取り、`fromJson` でクラスに変換する際に、変換対象のJSONに
どのコンストラクタを使用するかを判別できるフィールドがある場合に `unionKey` を使用するとJSON から使用するコンストラクタを決定してクラスを生成することが出来ます。

サンプルコードは freezed のドキュメントから持ってきました。
弊社ではType で表示するWidget を決定しておりサーバーサイドの変更をすることで、アプリのトップページのレイアウトをガラッと変えることができるようになっています。

```json
{
  "contents": {
    "items": [
      {
        "runtimeType": "default",
        "a": "This JSON object will use constructor MyResponse()"
      },
      {
        "runtimeType": "special",
        "a": "This JSON object will use constructor MyResponse.special()",
        "b": 42
      },
      {
        "runtimeType": "error",
        "message": "This JSON object will use constructor MyResponse.error()"
      }
    ]
  }
}
```

```
@Freezed(unionKey: 'type', unionValueCase: FreezedUnionCase.pascal)
abstract class MyResponse with _$MyResponse {
  const factory MyResponse(String a) = MyResponseData;

  @FreezedUnionValue('SpecialCase')
  const factory MyResponse.special(String a, int b) = MyResponseSpecial;

  const factory MyResponse.error(String message) = MyResponseError;

  // ...
}
```

https://pub.dev/packages/freezed#fromjson---classes-with-multiple-constructors

わかりますか？？？？
言葉で説明することは難しいので時間があればサンプルコードでも作って見たいと思います。
トップページのレイアウトが変わるのはこのような感じです。

```
1. 画像Widget
2. 商品リスト
3. キャンペーンバナー
の順番で表示していたWidget をサーバーからのレスポンスを変更することで
1. 画像Widget
2. お知らせWidget
3. キャンペーンバナー
4. 商品リスト
の順番でWidget を表示することができる。
```


### ページ遷移について

アプリとWebで同じAPI を使用しているので例えばトップページ用のAPIのレスポンスで画像Widget を表示するものは下記のようになっています。

```json
{
  "image": "https://....jpg",
  "url": "/campaign/12332/",
  "description": "画像です",
}
```

画像を表示してタップされた際に`url` のページに遷移させたい場合に、Webでは相対パスとしてなんなく処理出来ますがFlutter ではそうはいきません。
検索などではURLにクエリが付加されていて`/search/q=鬼滅の刃&category=1&sort=price-desc&page=1`のようなURLも処理する必要もあります。
さらに、`Navigator (1.0)`を使用しているので下記のコードでページ遷移する必要あります。

```dart
Navigator.of(context).push(
  MaterialPageRouter(
    builder: (context) {
      return CampaignPage();
    },
  ),
);
```

`/campaign/12332/` をどのように処理しているかというと[`named routes`](https://docs.flutter.dev/cookbook/navigation/named-routes) を使用しています。
[`MaterialApp`](https://api.flutter.dev/flutter/material/MaterialApp-class.html) の[`onGenerateRoute`](https://api.flutter.dev/flutter/material/MaterialApp/onGenerateRoute.html) にURLを正規表現でページのパスとマッチするかを確認し、マッチした際に遷移するページクラスの決定とクエリをパースしてarguments に変換して `Rotuer`クラスを返す処理を書いています。

このような処理方法を実装することによって、if の条件分岐で遷移先を変える必要がなかったり、API から返ってくるリンク先が変わったとしてもアプリの修正・リリース無しで実装済みのページの場合好きなように変更することが出来ます。

#### 実装例

遷移の際は`pushNamed` を使用します。
`pushNamed` をコールする際に`arguments` になにかを指定する必要はありません。
`MaterialApp.onGenerateRoute` でクエリなどが遷移先のクラスのコンストラクタに渡るようになっています。

```dart
Navigator.of(context).pushNamed('/campaign/12332/');

Navigator.of(context).pushNamed('/search/q=鬼滅の刃&category=1&sort=price-desc&page=1');
```

キャンペーンページクラスでは遷移する際のパス（URL）とキャンペーンのIDを受け取るようのクラス変数にid があり、path の `:id` にあるものがクラス変数の`id` 渡されるようになっています。

```dart
class CampaignPage extends StatelessWidget {
  const CampaignPage({Key? key, required this.id}) : super(key: key);

  const String path = '/campaign/:id/';

  final String id;
  ...
}
```

### Dart SDK について
Flutter のアップデートを行う方は多いと思いますが、プロジェクトで使用しているDart SDK を更新している方は少ないのではないでしょうか？？
つい先日Flutter 2.8 のリリースがありその際にDart 2.15 もリリースされましたが、皆さんはアップデート済みですか？

プロジェクトで使用するDart SDK のバージョン更新について書かれているページを見た記憶も無いですし、私が知る限りでは`pubspec.yaml` のSDK の項目はupdate のコマンドなどでは自動的に更新されないと認識しています。
まぁ私がSDK の更新に気がついたのもFlutter のアップデートはしたけどタイプエイリアスが使えないなーとのことで気がついたでの、知らない人が多いのではと思っています。

更新したい場合は`pubspec.yaml` を開いて、enviroment.sdk の項目を更新してください。
Stable チャンネルの最新版は`Dart2.15.1` です。

```diff:pubspec.yaml
name: flutter new app.
description: A new Flutter project.
version: 1.0.0+1

environment:
-  sdk: ">=2.12.0 <3.0.0"
+  sdk: ">=2.15.0 <3.0.0"
```

使用しているバージョンがわからない場合は下記のコマンドで確認ができます。

```
$ dart --version
```

# まとめ

弊社で新規開発したアプリについてお話してきました。
潤沢な開発リソースが無い中でiOS, Android の両OSに向けてアプリをリリースできたのは、確実にFlutter のおかげだと思います。
3Dゲームやシェーダーを使って画像をゴリゴリに加工したり、ARを使ったりしない場合や潤沢な開発リソースが無い場合にはFlutter を選択することは個人的には良い判断だと思っています。
特にAndroid の場合iOS と違いUIに関してもガイドラインに沿ったUIにすることも容易なのでAndroid だけFlutter で開発することもありかもしれません。

これまで拙い文章を読んで頂きありがとうございます。
Flutter のアプリ開発で悩んでいる方、Flutter を採用しようか悩んでいる方の参考になれれば幸いです。


この記事はGitHub で管理しています。
Typo などを見つけた方は下記のリポジトリにPull Request かIssues を作って頂けますと幸いです。

https://github.com/0maru/zenn-contents
