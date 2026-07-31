---
page_id: plugins
layout: page
title: 插件
permalink: /plugins/
nav: false
description: al-folio v1.x 精选与内置插件生态目录
---

`al-folio` `v1.x` 是一个以插件为核心运行时特性的 starter。
本页列出生态目录（`_data/featured_plugins.yml`）中收录的插件。

## 命名约定

- 主题耦合插件：
  - 仓库：`al-folio-<feature>`
  - gem/插件 ID：`al_folio_<feature>`
- 可复用插件：
  - 仓库：`al-<feature>` 或中性名称
  - gem/插件 ID 与插件命名空间对齐

第三方非 `al-*` 插件同样有资格入选 featured 列表。

## 内置插件（Bundled）

{% assign bundled_plugins = site.data.featured_plugins | where: "status", "bundled" %}

<table>
  <thead>
    <tr>
      <th>名称</th>
      <th>Gem</th>
      <th>插件 ID</th>
      <th>兼容性</th>
      <th>维护者</th>
      <th>演示</th>
      <th>说明</th>
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

## Featured-only 插件

{% assign featured_only_plugins = site.data.featured_plugins | where: "status", "featured" %}
{% if featured_only_plugins.size == 0 %}
目前暂无 featured-only 条目。
如果你希望插件入选，请提交 **Plugin Feature Proposal** issue。
{% else %}

<table>
  <thead>
    <tr>
      <th>名称</th>
      <th>Gem</th>
      <th>插件 ID</th>
      <th>兼容性</th>
      <th>维护者</th>
      <th>演示</th>
      <th>说明</th>
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

## 申请插件入选

1. 在本仓库提交 **Plugin Feature Proposal** issue。
2. 提供插件元数据（仓库 URL、gem 名称、插件 ID、兼容性、演示路径、维护者联系方式）。
3. 提交 PR 更新 `_data/featured_plugins.yml`。
4. 若申请加入默认 starter 捆绑，请在同一个 PR 中同时提供 `Gemfile` 与 `_config.yml` 接线改动。

入选（featuring）与捆绑（bundling）是相互独立的维护决策。
