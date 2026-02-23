# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> 共通指示事項は ~/.claude/CLAUDE.md を参照

## プロジェクト概要

個人ブログサイト (blog.0maru.dev) - Next.js (App Router) ベースのMarkdownブログ。OpenNext経由でCloudflare Workersにデプロイ。

**技術スタック:**

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4 (スタイリング)
- OpenNext for Cloudflare (デプロイアダプター)
- Biome + Prettier (コード品質管理)

## 開発コマンド

```bash
# 初回セットアップ（Git hooks設定）
pnpm bootstrap

# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# OpenNextビルド + Cloudflareプレビュー
pnpm preview

# Cloudflareへデプロイ
pnpm deploy

# コードフォーマット・リント（コミット前に必須）
pnpm check  # BiomeとPrettierの両方を実行
pnpm lint   # Biomeのみ実行
```

## アーキテクチャ

### ディレクトリ構造

```
src/
├── app/             # Next.js App Router（ページ・レイアウト・API）
│   ├── layout.tsx   # ルートレイアウト
│   ├── page.tsx     # ホームページ
│   ├── globals.css  # グローバルCSS（Tailwind + テーマ）
│   ├── sitemap.ts   # サイトマップ生成
│   ├── posts/[slug]/page.tsx  # 個別記事ページ
│   ├── tags/page.tsx          # タグ一覧
│   ├── tags/[tag]/page.tsx    # タグ別記事一覧
│   ├── about/page.tsx         # Aboutページ
│   └── rss.xml/route.ts       # RSSフィードAPI
├── components/      # Reactコンポーネント（.tsx）
├── contents/blog/   # ブログ記事（年別にMarkdownファイル管理）
├── lib/             # ユーティリティ（Markdown処理、記事取得）
├── types/           # 型定義ファイル
└── consts.ts        # サイト定数（タイトル、説明文など）
```

### 重要な設定

- **サイトURL**: https://blog.0maru.dev
- **ビルド出力**: standalone (Next.js) → .open-next/ (OpenNext)
- **Markdownプロセッサ**: remark + remark-link-card + remark-gfm
- **デプロイ先**: Cloudflare Workers (wrangler.jsonc で設定)

### ルーティング

- `/` - ホームページ（記事一覧）
- `/posts/[slug]` - 個別記事ページ
- `/tags` - タグ一覧
- `/tags/[tag]` - タグ別記事一覧
- `/about` - Aboutページ
- `/rss.xml` - RSSフィード
- `/sitemap.xml` - サイトマップ

## コーディング規約

### フォーマット設定（Biome）

- インデント: スペース2つ
- 引用符: シングルクォート
- セミコロン: 必須
- 行幅: 100文字
- 末尾カンマ: あり
- 改行コード: LF

### ファイル編集時の注意

- JavaScript/TypeScript/TSX: Biomeルールに従う
- Markdown/YAML: Prettierルールに従う
- コミット前に必ず `pnpm check` を実行

## 新規記事の追加

1. `src/contents/blog/[年]/` に新しいMarkdownファイルを作成
2. フロントマターに必須項目を記載:
   ```yaml
   ---
   slug: 'unique-post-slug'
   title: '記事タイトル'
   createdAt: 'YYYY-MM-DD'
   pubDate: 'YYYY-MM-DD'
   tags: ['タグ1', 'タグ2']
   status: 'published'
   ---
   ```
3. 記事本文をMarkdownで記述

## デプロイ

- mainブランチへのプッシュで自動デプロイ（GitHub Actions → OpenNext → Cloudflare Workers）
- src/またはpublic/ディレクトリの変更時のみデプロイ実行
- Cloudflareプロジェクト名: blog-0maru-dev

## 開発時の重要な注意点

1. **pre-commitフック**: `pnpm bootstrap`でGit hooksを設定し、コミット時の自動フォーマットを有効化
2. **画像処理**: Sharpを使用した画像最適化が可能
3. **リンクカード**: URLを記載すると自動的にリンクカードが生成され、`public/remark-link-card/`にキャッシュされる
4. **環境変数**: Cloudflare Workersの環境変数が使用可能
5. **OpenNext**: `open-next.config.ts`でCloudflare向けのビルド設定を管理
