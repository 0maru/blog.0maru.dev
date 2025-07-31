# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> 共通指示事項は ~/.claude/CLAUDE.md を参照

## プロジェクト概要

個人ブログサイト (blog.0maru.dev) - Astroベースの静的サイトジェネレーターを使用したMarkdownブログ。Cloudflare Pagesでホスティング。

**技術スタック:**
- Astro v5.5.4 (静的サイトジェネレーター)
- TypeScript
- Tailwind CSS (スタイリング)
- MDX (Markdown拡張)
- Biome + Prettier (コード品質管理)

## 開発コマンド

```bash
# 初回セットアップ（Git hooks設定）
pnpm bootstrap

# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# ビルド後のプレビュー
pnpm preview

# コードフォーマット・リント（コミット前に必須）
pnpm check  # BiomeとPrettierの両方を実行
pnpm lint   # Biomeのみ実行
```

## アーキテクチャ

### ディレクトリ構造
```
src/
├── components/      # Astroコンポーネント（.astro）
├── contents/blog/   # ブログ記事（年別にMarkdownファイル管理）
├── layouts/         # ページレイアウト
├── pages/           # ルーティング（Astroのファイルベースルーティング）
├── images/          # 画像アセット
└── consts.ts        # サイト定数（タイトル、説明文など）
```

### 重要な設定
- **サイトURL**: https://blog.0maru.dev
- **ビルド出力**: ./dist
- **Markdownプロセッサ**: remark-link-cardプラグイン（リンクカード自動生成）

### ルーティング
- `/` - ホームページ（記事一覧）
- `/posts/[slug]` - 個別記事ページ
- `/tags/[tag]` - タグ別記事一覧
- `/about` - Aboutページ
- `/rss.xml` - RSSフィード

## コーディング規約

### フォーマット設定（Biome）
- インデント: スペース2つ
- 引用符: シングルクォート
- セミコロン: 必須
- 行幅: 100文字
- 末尾カンマ: あり
- 改行コード: LF

### ファイル編集時の注意
- JavaScript/TypeScript: Biomeルールに従う
- Markdown/YAML/Astro: Prettierルールに従う
- コミット前に必ず `pnpm check` を実行

## 新規記事の追加

1. `src/contents/blog/[年]/` に新しいMarkdownファイルを作成
2. フロントマターに必須項目を記載:
   ```yaml
   ---
   title: "記事タイトル"
   date: "YYYY-MM-DD"
   tags: ["タグ1", "タグ2"]
   ---
   ```
3. 記事本文をMarkdownで記述

## デプロイ

- mainブランチへのプッシュで自動デプロイ（GitHub Actions → Cloudflare Pages）
- src/またはpublic/ディレクトリの変更時のみデプロイ実行
- Cloudflareプロジェクト名: blog-0maru-dev

## 開発時の重要な注意点

1. **pre-commitフック**: `pnpm bootstrap`でGit hooksを設定し、コミット時の自動フォーマットを有効化
2. **画像処理**: Sharpを使用した画像最適化が可能
3. **リンクカード**: URLを記載すると自動的にリンクカードが生成され、`public/remark-link-card/`にキャッシュされる
4. **環境変数**: 特に設定されていないが、Cloudflare Pagesの環境変数が使用可能