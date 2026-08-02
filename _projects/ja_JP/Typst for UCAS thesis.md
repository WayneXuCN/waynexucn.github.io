---
layout: page
title: Typst-ucas-thesis
description: Typst に基づく中国科学院大学論文テンプレート
img: assets/img/project/Typst-ucas-thesis/typstUCAS.png
importance: 1
category: work
giscus_comments: true
---

## [中国科学院大学学位論文 Typst テンプレート](https://github.com/Vncntvx/modern-ucas-thesis)

![Project Status](https://img.shields.io/badge/Status-In%20Progress-yellow)

> 🚧 **プロジェクト進行中** 🚧

![Alt](https://repobeats.axiom.co/api/embed/bcb1c161953f87781138dcbbcd30bf4ba8df2268.svg "Repobeats analytics image")

#### 用紙要件とページ設定

- ✅ ページサイズと余白の調整。
- 🔄 ヘッダー・フッターのスタイル。

#### 表紙と背表紙

- ✅ 表紙の基本情報（タイトル、著者、指導教員など）。
- 🔄 表紙スタイルの最適化
- 🕒 背表紙の生成

#### 要旨とキーワード

- ✅ 中国語・英語の要旨テンプレート。
- 🕒 要旨スタイルの最適化

#### 目次

- ✅ 目次機能。
- 🔄 目次スタイルの最適化
- 🕒 ページ番号の整列最適化。

#### 本文

- 🕒 タイトルスタイルと段落間隔の最適化。
- 🕒 図表スタイルの最適化

#### その他

- 🕒 参考文献スタイルの最適化。
- 🕒 付録とあとがきテンプレート。
- 🕒 著者略歴および学位取得期間中に発表した学術論文やその他の関連学術成果
- 🕒 文献フォーマットの多様なスタイルへの対応。

### 開発者ガイド

#### template ディレクトリ

- `thesis.typ` ファイル：あなたの論文ソースファイル。このファイル名は自由に変更可能で、同じディレクトリ内で複数コピーして複数バージョンを維持することもできます。
- `ref.bib` ファイル：参考文献を格納します。
- `images` ディレクトリ：画像を格納します。

#### 内部ディレクトリ

- `utils` ディレクトリ：テンプレートで使用される各種カスタム補助関数を含み、外部依存がなく、**ページをレンダリングしない関数**を格納します。
- `pages` ディレクトリ：テンプレートで使用される**独立ページ**（例：表紙、声明、要旨など）、つまり**他のページに影響しない独立ページをレンダリングする関数**を格納します。
- `layouts` ディレクトリ：レイアウトディレクトリで、`show` 命令に適用される、**複数ページにまたがる関数**を格納します。例えば、フッターにローマ数字を付ける前書き `preface` 関数など。
  - 主に `doc` 本文、`preface` 前書き、`mainmatter` 本文、`appendix` 付録/あとがきに分かれています。
- `lib.typ`:
  - **役割1**: 統一された外部インターフェースとして、内部の utils 関数を公開します。
  - **役割2**: **関数クロージャ**の特性を利用し、`documentclass` 関数でグローバル情報を設定し、グローバル設定を持つ具体的な `layouts` や `pages` 内部関数を公開します。

### 謝辞

- [nju-lug](https://github.com/nju-lug) が開発した [modern-nju-thesis](https://github.com/nju-lug/modern-nju-thesis) テンプレートに感謝します。本バージョンの開発に良い基盤を提供してくれました。
- [mohuangrui](https://github.com/mohuangrui) が開発した [ucasthesis](https://github.com/mohuangrui/ucasthesis) LaTeX テンプレートに感謝します。本テンプレートの大まかな構造は ucasthesis のドキュメントを参考にしています。
- [HUST-typst-template](https://github.com/werifu/HUST-typst-template) および [sysu-thesis-typst](https://github.com/howardlau1999/sysu-thesis-typst) などの Typst 中国語論文テンプレートに感謝します。

### ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。
