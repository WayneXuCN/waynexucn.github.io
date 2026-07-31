---
page_id: plugins
layout: page
title: Plugins
permalink: /plugins/
nav: false
description: Katalog des featured und bundled Plugin-Ökosystems für al-folio v1.x
---

`al-folio` `v1.x` ist ein Starter mit plugin-eigenen Runtime-Funktionen.
Diese Seite listet Plugins, die im Ökosystem-Katalog (`_data/featured_plugins.yml`) erfasst sind.

## Namenskonvention

- Theme-gekoppelte Plugins:
  - Repo: `al-folio-<feature>`
  - Gem/Plugin-ID: `al_folio_<feature>`
- Wiederverwendbare Plugins:
  - Repo: `al-<feature>` oder neutraler Name
  - Gem/Plugin-ID am Plugin-Namespace ausgerichtet

Auch Drittanbieter-Plugins ohne `al-*`-Präfix können featured werden.

## Bundled Plugins

{% assign bundled_plugins = site.data.featured_plugins | where: "status", "bundled" %}

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Gem</th>
      <th>Plugin-ID</th>
      <th>Kompatibilität</th>
      <th>Inhaber</th>
      <th>Demo</th>
      <th>Hinweise</th>
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

## Featured-only Plugins

{% assign featured_only_plugins = site.data.featured_plugins | where: "status", "featured" %}
{% if featured_only_plugins.size == 0 %}
Es gibt noch keine Featured-only-Einträge.
Öffne ein **Plugin Feature Proposal** Issue, wenn du ein Plugin vorschlagen möchtest.
{% else %}

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Gem</th>
      <th>Plugin-ID</th>
      <th>Kompatibilität</th>
      <th>Inhaber</th>
      <th>Demo</th>
      <th>Hinweise</th>
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

## Plugin zur Aufnahme vorschlagen

1. Öffne ein **Plugin Feature Proposal** Issue in diesem Repo.
2. Gib Plugin-Metadaten an (Repo-URL, Gem-Name, Plugin-ID, Kompatibilität, Demo-Pfad, Kontakt des Maintainers).
3. Reiche einen PR ein, der `_data/featured_plugins.yml` aktualisiert.
4. Für eine Aufnahme ins Standard-Bundling: füge im selben PR `Gemfile`- und `_config.yml`-Anpassungen hinzu.

Featuring und Bundling sind getrennte Entscheidungen der Maintainer.
