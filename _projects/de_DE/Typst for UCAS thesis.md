---
layout: page
title: Typst-ucas-thesis
description: UCAS Thesis-Vorlage basierend auf Typst
img: assets/img/project/Typst-ucas-thesis/typstUCAS.png
importance: 1
category: work
giscus_comments: true
---

## [Typst-Vorlage für Abschlussarbeiten der Universität der Chinesischen Akademie der Wissenschaften](https://github.com/Vncntvx/modern-ucas-thesis)

![Project Status](https://img.shields.io/badge/Status-In%20Progress-yellow)

> 🚧 **Projektstatus: In Arbeit** 🚧

![Alt](https://repobeats.axiom.co/api/embed/bcb1c161953f87781138dcbbcd30bf4ba8df2268.svg "Repobeats analytics image")

#### Papieranforderungen & Seiteneinstellungen

- ✅ Anpassung von Seitengröße und Rändern.
- 🔄 Kopf- und Fußzeilenstil。

#### Umschlag und Buchrücken

- ✅ Grundlegende Umschlaginformationen (Titel, Autor, Betreuer usw。)。
- 🔄 Optimierung des Umschlagstils
- 🕒 Erstellung des Buchrückens

#### Zusammenfassung und Schlüsselwörter

- ✅ Vorlage für chinesische und englische Zusammenfassung。
- 🕒 Optimierung des Zusammenfassungsstils

#### Inhaltsverzeichnis

- ✅ Funktion für Inhaltsverzeichnis。
- 🔄 Optimierung des Inhaltsverzeichnis-Stils
- 🕒 Optimierung der Seitennummernausrichtung。

#### Haupttext

- 🕒 Optimierung von Überschriftenstil und Absatzabstand。
- 🕒 Optimierung von Abbildungs- und Tabellenstil

#### Sonstiges

- 🕒 Optimierung des Literaturverzeichnis-Stils。
- 🕒 Vorlagen für Anhang und Nachwort。
- 🕒 Lebenslauf des Autors und während des Studiums veröffentlichte wissenschaftliche Arbeiten und andere relevante wissenschaftliche Leistungen
- 🕒 Unterstützung verschiedener Literaturverzeichnis-Stile。

### Entwicklerhandbuch

#### template-Verzeichnis

- `thesis.typ`-Datei: Deine Quelltextdatei der Abschlussarbeit。 Du kannst den Dateinamen beliebig ändern oder mehrere Versionen im selben Verzeichnis anlegen。
- `ref.bib`-Datei: Für Literaturverweise。
- `images`-Verzeichnis: Für Bilder。

#### Interne Verzeichnisse

- `utils`-Verzeichnis: Enthält verschiedene benutzerdefinierte Hilfsfunktionen der Vorlage, ohne externe Abhängigkeiten, und **Funktionen, die keine Seiten rendern**。
- `pages`-Verzeichnis: Enthält **eigenständige Seiten** der Vorlage, z.B. Umschlag, Erklärung, Zusammenfassung usw。也就是说 **Funktionen, die eigenständige Seiten rendern, ohne andere zu beeinflussen**。
- `layouts`-Verzeichnis: Layout-Verzeichnis, enthält **funktionenübergreifende Layoutfunktionen**, die mit dem `show`-Befehl angewendet werden, z.B. die `preface`-Funktion für römische Fußzeilennummerierung。
  - Hauptsächlich unterteilt in `doc` (Dokument), `preface` (Vorwort), `mainmatter` (Hauptteil) und `appendix` (Anhang/Nachwort)。
- `lib.typ`:
  - **Aufgabe 1**: Dient als einheitliche externe Schnittstelle und stellt interne Utils-Funktionen bereit。
  - **Aufgabe 2**: Nutzt **Funktions-Closures**, um globale Einstellungen über die `documentclass`-Funktion zu konfigurieren und dann interne `layouts`- und `pages`-Funktionen mit globaler Konfiguration bereitzustellen。

### Danksagung

- Vielen Dank an [nju-lug](https://github.com/nju-lug) für die Entwicklung der [modern-nju-thesis](https://github.com/nju-lug/modern-nju-thesis) Vorlage, die eine gute Grundlage für diese Version geboten hat。
- Vielen Dank an [mohuangrui](https://github.com/mohuangrui) für die Entwicklung der [ucasthesis](https://github.com/mohuangrui/ucasthesis) LaTeX-Vorlage, deren Dokumentationsstruktur weitgehend als Referenz für diese Vorlage diente。
- Vielen Dank an [HUST-typst-template](https://github.com/werifu/HUST-typst-template) und [sysu-thesis-typst](https://github.com/howardlau1999/sysu-thesis-typst) sowie andere Typst-Vorlagen für chinesische Abschlussarbeiten。

### Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert。
