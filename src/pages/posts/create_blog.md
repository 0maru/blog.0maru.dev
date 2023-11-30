---
layout: ../../layouts/Post.astro
title: AstroとCloudflareでブロクを作ってみた
image: https://blog-images.0maru.dev/fujikokyoto0H0264_TP_V.webp
createdAt: 2023-10-01
tags: ["Astro", "Cloudflare", "環境"]
status: draft
---

## AstroとCloudflareでブロクを作ってみた

7年とか8年前から個人ブログを作っては消してを繰り返していましたが、そろそろ本腰をいれて個人ブログを作成しようと思い等々作成しました。　　
Tumblr とかnote とかQiita とかZenn とか色々わたり歩いてきて、使っていたサービスが方向転換をするなどで、ブログの記事を移行しようにも、
そのサービスにロックインしてしまっており、移行するのも億劫だし、3行くらいの雑な記事？備忘録みたいなものも書きたかったので、個人ブログを作成しました。

今回は記事に持ち出しが簡単になるように本文自体はMarkDown で書いているので、Markdown に対応しているサービスにならそのまま持っていけるのと、
今使っている技術スタックを変えたくなったときに比較的かんたんに変えれるような仕様にしました。

## 採用した技術スタック

### アプリケーション
Astro
https://astro.build/

Astro を採用した理由はMarkDown で書いた記事を静的はHTMLに変換して、配信がしたかったからです。
Gatby でもAstro でのなんでもよかったのですが、ブログを作り出したとき、Astro が結構活発で採用してみようと思いました。
React とかにもコンポーネントを埋め込めるみたいなので、ちょっと慣らしておきたいみたいな考えもあります。

### 

Cloudflare Pages

https://pages.cloudflare.com/

### CI/CD

GitHub Actions
https://github.co.jp/features/actions

###  さいごに
結局このブログがどこまで続くかはわかりませんが、Astro とかCloudflare Pages を仕事で使う機会はなかったのでいい経験になりました。

ブログ一発目の記事でこのようなことを書くことはあまり良くない気もしますが、 NueJS も気になっていて、
来年のこの頃にはAstro 製のブログをNueJS で書き直したみたいなことを書きたいなと思っています。
https://nuejs.org/docs/nuejs/

これくらいの規模なら数日あればNueJSに置き換えれるだろし、新しいフレームワークを触るにはいいんじゃないかな？と思っています。
