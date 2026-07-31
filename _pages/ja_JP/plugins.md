---
page_id: plugins
layout: page
title: プラグイン
permalink: /plugins/
nav: false
description: al-folio v1.x の featured / bundled プラグインエコシステムカタログ
---

`al-folio` `v1.x` はプラグインがランタイム機能を持つスターターです。
このページはエコシステムカタログ（`_data/featured_plugins.yml`）に登録されたプラグインを一覧表示します。

## 命名規則

- テーマ連携プラグイン：
  - リポジトリ：`al-folio-<feature>`
  - gem/プラグイン ID：`al_folio_<feature>`
- 再利用可能プラグイン：
  - リポジトリ：`al-<feature>` または中立な名前
  - gem/プラグイン ID はプラグインの名前空間に合わせる

サードパーティの非 `al-*` プラグインも featured 対象となります。

## Bundled プラグイン

{% assign bundled_plugins = site.data.featured_plugins | where: "status", "bundled" %}

<table>
  <thead>
    <tr>
      <th>名前</th>
      <th>Gem</th>
      <th>プラグイン ID</th>
      <th>互換性</th>
      <th>オーナー</th>
      <th>デモ</th>
      <th>備考</th>
    </tr>
  </thead>
  <tbody>
    {% for plugin in bundled_plugins %}
      <tr>
        <td>{{ plugin.name }}<br><small><code>{{ plugin.repo_url }}</code></small></td>
        <td><code>{{ plugin.gem_name }}</code></td>
        <td><code>{{ plugin.jekyll_plugin_id }}</code></td>
        <td><code>{{ plugin.compat.al_folio_min }}</code> - <code>{{ plugin.compat.al_folio_max }}</code></td>
        <td>{{ plugin.owner }}</td>
        <td><code>{{ plugin.demo_path }}</code></td>
        <td>{{ plugin.notes }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>

## Featured-only プラグイン

{% assign featured_only_plugins = site.data.featured_plugins | where: "status", "featured" %}
{% if featured_only_plugins.size == 0 %}
現在、featured-only エントリはありません。
プラグインを提案したい場合は **Plugin Feature Proposal** issue を開いてください。
{% else %}

<table>
  <thead>
    <tr>
      <th>名前</th>
      <th>Gem</th>
      <th>プラグイン ID</th>
      <th>互換性</th>
      <th>オーナー</th>
      <th>デモ</th>
      <th>備考</th>
    </tr>
  </thead>
  <tbody>
    {% for plugin in featured_only_plugins %}
      <tr>
        <td>{{ plugin.name }}<br><small><code>{{ plugin.repo_url }}</code></small></td>
        <td><code>{{ plugin.gem_name }}</code></td>
        <td><code>{{ plugin.jekyll_plugin_id }}</code></td>
        <td><code>{{ plugin.compat.al_folio_min }}</code> - <code>{{ plugin.compat.al_folio_max }}</code></td>
        <td>{{ plugin.owner }}</td>
        <td><code>{{ plugin.demo_path }}</code></td>
        <td>{{ plugin.notes }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>
{% endif %}

## プラグインの登録を提案する

1. このリポジトリで **Plugin Feature Proposal** issue を開く。
2. プラグインメタデータ（リポジトリ URL、gem 名、プラグイン ID、互換性、デモパス、メンテナー連絡先）を提供する。
3. `_data/featured_plugins.yml` を更新する PR を出す。
4. デフォルトスターターバンドルへの同梱を希望する場合、同じ PR で `Gemfile` と `_config.yml` の配線変更も含める。

登録（featuring）とバンドル（bundling）は別々のメンテナー判断です。
