# Copilot Coding Agent Instructions

> **Single source of truth:** [`AGENTS.md`](../AGENTS.md) and this file describe the **actually-tested** build process. This fork builds locally with Bundler/Jekyll — **no Docker** (no `Dockerfile` or `docker-compose.yml` exists in this repo). When in doubt, trust `AGENTS.md` over upstream al-folio docs.

## Repository Overview

**al-folio (i18n fork)** is a simple, clean, and responsive [Jekyll](https://jekyllrb.com/) theme for academics, adapted with multilingual internationalization (i18n) support via `jekyll-polyglot` (4 locales: `en_US`, `zh_CN`, `de_DE`, `ja_JP`).

- **Type:** Jekyll static site generator (i18n fork of al-folio v1, using locked `al_folio_core` / `al_folio_cv` gems)
- **Target Users:** Academics, researchers, and professionals
- **Key Features:** CV display, publication bibliography, blog posts, projects, news/announcements, course listings, multilingual content

## Tech Stack & Versions

**Core Technologies:**

- **Jekyll:** v4.x (Ruby static site generator)
- **Ruby:** 3.4.2 (primary CI/CD version, matches `gh-pages-to-server.yml`). Some legacy workflows still pin 3.2.2/3.3 — being unified. Note: `.ruby-version` is gitignored by upstream convention; CI reads the version from workflow `ruby-version:` inputs.
- **Python:** 3.13 (for nbconvert, jupyter notebook support)
- **Node.js:** Latest LTS (for purgecss and prettier)

**Build Dependencies (from Gemfile):**

- `classifier-reborn` – Related posts calculation
- `jekyll-archives-v2` – Archive page generation
- `jekyll-jupyter-notebook` – Jupyter notebook embedding
- `jekyll-minifier` – CSS/JS minification
- `jekyll-paginate-v2` – Pagination
- `jekyll-polyglot` – Multilingual i18n support
- `jekyll-scholar` – Bibliography management
- `jekyll-tabs` – Tab UI components
- `jekyll-toc` – Table of contents generation
- `jemoji` – Emoji support
- `al_folio_core` / `al_folio_cv` / `al_search` / `al_img_tools` etc. – al-folio v1 plugin gems (locked versions)
- Multiple other specialized jekyll plugins

**Code Quality Tools:**

- **Prettier:** v3.1.1 (pinned in `package.json`) with `@shopify/prettier-plugin-liquid` v1.4.0 – Code formatter (mandatory for PRs)
- **Purgecss:** CSS purification for production builds

## Building & Local Development

### Bundle/Jekyll (the only supported local workflow)

This fork builds locally with Bundler — **no Docker**. See [`AGENTS.md`](../AGENTS.md) for the canonical commands.

**Initial Setup:**

```bash
bundle install                       # Install Ruby gems
pip install -r requirements.txt      # Install Python deps (jupyter/nbconvert)
# ImageMagick required: brew install imagemagick (macOS) / sudo apt-get install imagemagick (Linux)
```

**Development server:**

```bash
bundle exec jekyll serve --port 4000
# Site runs at http://localhost:4000
```

**Production build (enables CSS/JS minification):**

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

### Important Build Requirements

- **ImageMagick must be installed** – Required for image processing plugins
  - macOS: `brew install imagemagick`
  - Linux: `sudo apt-get install imagemagick`
  - Verify: `convert -version`
- **nbconvert/jupyter required for notebook support** – `pip install -r requirements.txt`
- **Always set `JEKYLL_ENV=production` for production builds** – Required for CSS/JS minification

## Project Layout & Key Files

### Root Directory Structure

- `_bibliography/papers.bib` – BibTeX bibliography for publications
- `_config.yml` – **Primary configuration file** (title, author, URLs, baseurl, feature flags, i18n)
- `_data/` – YAML data files, with per-locale subdirs (`_data/{en_US,zh_CN,de_DE,ja_JP}/`)
- `_includes/` – Reusable Liquid template components (includes `cv/` forked overrides)
- `_layouts/` – Page layout templates (about.liquid, post.liquid, bib.liquid, distill.liquid, cv.liquid, etc.)
- `_news/` – News/announcement entries (per-locale subdirs)
- `_pages/` – Static pages (per-locale subdirs: `_pages/{en_US,zh_CN,de_DE,ja_JP}/`)
- `_posts/` – Blog posts (format: `YYYY-MM-DD-title.md`)
- `_projects/` – Project showcase entries (per-locale subdirs)
- `_sass/` – SCSS stylesheets
- `_scripts/` – JavaScript files for functionality
- `_teachings/` – Course and teaching entries
- `assets/img/` – Images, profile pictures
- `Gemfile` & `Gemfile.lock` – Ruby dependency specifications
- `package.json` & `package-lock.json` – Node.js dependencies (prettier)
- `purgecss.config.js` – PurgeCSS configuration for production CSS optimization
- `.al-folio-overrides.yml` – Manifest of forked files overriding gem defaults

### Configuration Priority

When making changes:

1. **Always start with `_config.yml`** for site-wide settings
2. **Feature flags are in `_config.yml`** – Look for `enabled: true/false` options
3. **Social media links:** `_data/socials.yml`
4. **Content data:** Respective `_data/*.yml` files (per-locale under `_data/<locale>/`)
5. **Styling:** `_sass/` directory (uses SCSS)

## CI/CD Pipeline & Validation

### GitHub Workflows (in `.github/workflows/`)

- **gh-pages-to-server.yml** – Main deployment workflow (`Build and Deploy (gh-pages -> Server)`)
  - Sets up Ruby 3.4.2, Python 3.13
  - Installs imagemagick, nbconvert
  - Runs `bundle exec jekyll build` with `JEKYLL_ENV=production`
  - Runs purgecss for CSS optimization
  - Deploys built site to gh-pages branch, then SSH-deploys to server (lab.wenjiexu.site)
- **deploy.disabled.yml** – Legacy GitHub Pages deploy (DISABLED via `.disabled.yml` suffix)
- **prettier.yml** – Code formatting validation (mandatory)
  - Runs prettier on all files via `npm ci`
  - **Fails PRs if code is not properly formatted**
  - Generates HTML diff artifact on failure
- **broken-links.yml / broken-links-site.yml** – Link validation
- **axe.yml** – Accessibility testing
- **codeql.yml** – Security scanning (runs on master)
- **update-citations.yml** – Automatic Google Scholar citation updates (monthly)
- **render-cv.yml** – CV rendering from RenderCV format
- **schedule-posts.yml** – Scheduled post publishing (daily, enabled)

### Pre-commit Requirements

**You must run these locally before pushing** (per [`AGENTS.md`](../AGENTS.md)):

1. **Prettier formatting (mandatory):**

```bash
npx prettier . --write
```

2. **Local build verification:**

```bash
bundle exec jekyll build
# Or for live preview:
bundle exec jekyll serve --port 4000
# Visit http://localhost:4000 to verify the site
```

## Common Pitfalls & Workarounds

### YAML Syntax Errors in \_config.yml

- **Problem:** Special characters (`:`, `&`, `#`) in values cause parse errors
- **Solution:** Quote string values: `title: "My: Cool Site"`
- **Debug:** Run locally to see detailed error: `bundle exec jekyll build`

### "Unknown tag 'toc'" Error on Deployment

- **Problem:** Deploy succeeds locally but fails on GitHub Actions
- **Cause:** Jekyll plugins don't load properly
- **Solution:** Verify `jekyll-toc` is in Gemfile and run `bundle install`

### CSS/JS Not Loading After Deploy

- **Problem:** Site loads but has no styling
- **Cause:** Incorrect `url` and `baseurl` in `_config.yml`
- **Fix:**
  - Personal site: `url: https://username.github.io`, `baseurl:` (empty)
  - Project site: `url: https://username.github.io`, `baseurl: /repo-name/`
  - Clear browser cache (Ctrl+Shift+Del or private browsing)

### Prettier Formatting Failures

- **Problem:** PR fails prettier check after local builds passed
- **Solution:** Run prettier before committing:
  ```bash
  npx prettier . --write
  git add . && git commit -m "Format code with prettier"
  ```

### Port 4000 Already in Use

- Find and kill the process: `lsof -i :4000 | grep LISTEN | awk '{print $2}' | xargs kill`

### ImageMagick Related Errors

- Verify ImageMagick is installed: `convert -version`
- Reinstall: `brew install imagemagick` (macOS) or `sudo apt-get install imagemagick` (Linux)

### Related Posts Errors ("Zero vectors cannot be normalized")

- **Cause:** Empty blog posts or posts with only stop words confuse classifier-reborn
- **Solution:** Add meaningful content to posts, or set `related_posts: false` in post frontmatter
- **Note:** `lsi: true` conflicts with `jekyll-polyglot` plugin. This project uses `lsi: false` for i18n compatibility

### i18n / Multilingual Issues

- **Polyglot lang resolution:** `lang_from_path: true` infers language from per-locale subdirectory paths
- **Default lang:** `en_US` is the default language and renders at the root path (no `/en_US/` prefix); other locales render under `/{locale}/`
- **Per-locale data:** Access via `site.data[site.active_lang].cv` / `.strings` / `.toolbox` etc.
- **`parallel_localization: true`** — builds run in parallel (fork-based, safe on Linux CI)

## File Format Specifications

### Blog Post Frontmatter (\_posts/)

```yaml
---
layout: post
title: Post Title
date: YYYY-MM-DD
categories: category-name
---
```

### Project Frontmatter (\_projects/)

```yaml
---
layout: page
title: Project Name
description: Short description
img: /assets/img/project-image.jpg
importance: 1
---
```

### BibTeX Format (papers.bib)

- Standard BibTeX format
- al-folio supports custom keywords: `pdf`, `code`, `preview`, `doi`, etc.
- Check CUSTOMIZE.md for custom bibtex keyword documentation

## Trust These Instructions

This guidance documents the tested, working build process and project structure for this i18n fork. **Trust these instructions and only perform additional searches if:**

1. Specific information contradicts what you observe in the codebase
2. You need implementation details beyond what's documented
3. Error messages reference features or files not mentioned here

The instructions are designed to reduce unnecessary exploration and allow you to focus on code changes. For the canonical agent guidelines, see [`AGENTS.md`](../AGENTS.md).
