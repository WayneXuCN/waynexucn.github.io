# Agent Guidelines for al-folio (i18n Version)

A simple, clean, and responsive Jekyll theme for academics. This project has been adapted with multilingual internationalization (i18n) support.

## Quick Links by Role

- **Are you a coding agent?** → Read [`.github/copilot-instructions.md`](.github/copilot-instructions.md) first (tech stack, build, common pitfalls & solutions)
- **Customizing the site?** → See [`.github/agents/customize.agent.md`](.github/agents/customize.agent.md)
- **Writing documentation?** → See [`.github/agents/docs.agent.md`](.github/agents/docs.agent.md)
- **Git workflow?** → Check [.github/GIT_WORKFLOW.md](.github/GIT_WORKFLOW.md)
- **Code-Specific Instructions:** Consult the relevant instruction file for your code type.

| File Type                                     | Instruction File                                                                                |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Markdown content (`_posts/`, `_pages/`, etc.) | [markdown-content.instructions.md](.github/instructions/markdown-content.instructions.md)       |
| YAML config (`_config.yml`, `_data/`)         | [yaml-configuration.instructions.md](.github/instructions/yaml-configuration.instructions.md)   |
| BibTeX (`_bibliography/`)                     | [bibtex-bibliography.instructions.md](.github/instructions/bibtex-bibliography.instructions.md) |
| Liquid templates (`_includes/`, `_layouts/`)  | [liquid-templates.instructions.md](.github/instructions/liquid-templates.instructions.md)       |
| JavaScript (`_scripts/`)                      | [javascript-scripts.instructions.md](.github/instructions/javascript-scripts.instructions.md)   |

## Essential Commands

### Local Development (Bundle/Jekyll)

This project uses local building without Docker dependency.

```bash
# Initial setup: install Ruby dependencies
bundle install

# Install Python dependencies (nbconvert/rendercv/scholarly 等，见 requirements.txt)
uv pip install -r requirements.txt

# Build the site (production environment)
bundle exec jekyll build

# Start development server (accessible at http://localhost:4000)
bundle exec jekyll serve --port 4000

# Build with production environment settings (enables CSS/JS minification)
JEKYLL_ENV=production bundle exec jekyll build
```

### Dependency Requirements

- **Ruby:** 3.4.2 (primary CI/CD version; matches `.github/workflows/gh-pages-to-server.yml`. A local `.ruby-version` file is gitignored by upstream convention — CI reads the version from workflow `ruby-version:` inputs.)
- **Python:** For Jupyter Notebook support (nbconvert required)
- **ImageMagick:** Must be installed for image processing
  - macOS: `brew install imagemagick`
  - Linux: `sudo apt-get install imagemagick`
  - Verify installation: `convert -version`

### Pre-Commit Checklist

Before every commit, you **must** run these steps:

1.  **Format Code:**

    ```bash
    # First time only
    npm install --save-dev prettier @shopify/prettier-plugin-liquid
    # Format all files
    npx prettier . --write
    ```

2.  **Local Build Verification:**

    ```bash
    # Build the site
    bundle exec jekyll build

    # Or start development server for live preview
    bundle exec jekyll serve --port 4000
    # Visit http://localhost:4000 to verify the site
    ```

## Critical Configuration

### Multilingual Configuration (i18n)

This project uses the `jekyll-polyglot` plugin for multilingual support. Configuration is in `_config.yml`:

```yaml
languages: ["en_US", "zh_CN", "de_DE", "ja_JP"]
default_lang: "en_US"
lang_from_path: true
parallel_localization: false
```

### Directory Structure

Multilingual content is organized in language-specific subdirectories:

- `_pages/` - Page content
  - `_pages/en_US/` - English pages
  - `_pages/zh_CN/` - Chinese pages
  - `_pages/de_DE/` - German pages
  - `_pages/ja_JP/` - Japanese pages
- `_news/` - News/announcements
- `_projects/` - Project showcases
- `_books/` - Book reviews
- `_data/` - Language-specific YAML data
  - `_data/zh_CN/strings.yml` - Chinese text strings
  - `_data/en_US/strings.yml` - English text strings

### URL and Baseurl Configuration

When modifying `_config.yml`, these **must** be updated together:

- **Personal site:** `url: https://username.github.io` + `baseurl:` (empty)
- **Project site:** `url: https://username.github.io` + `baseurl: /repo-name/`
- **YAML errors:** Quote strings with special characters: `title: "My: Cool Site"`

### Related Posts Configuration (i18n Compatibility)

Note: The `lsi: true` option conflicts with the `jekyll-polyglot` plugin. This project uses `lsi: false` configuration to ensure multilingual functionality works correctly.

## Common Issues

For troubleshooting, see:

- [Common Pitfalls & Workarounds](.github/copilot-instructions.md#common-pitfalls--workarounds) in .github/copilot-instructions.md
- [GitHub Issues](https://github.com/alshedivat/al-folio/issues) to search for your specific problem

### Build Troubleshooting

1. **"Unknown tag 'toc'" Error**

   - Cause: Jekyll plugin not loaded properly
   - Solution: Verify `jekyll-toc` is in Gemfile and run `bundle install`

2. **CSS/JS Not Loading**

   - Cause: Incorrect `url` and `baseurl` configuration in `_config.yml`
   - Solution: Refer to the URL configuration section above

3. **Port 4000 Already in Use**

   - Find and kill the process: `lsof -i :4000 | grep LISTEN | awk '{print $2}' | xargs kill`

4. **ImageMagick Related Errors**
   - Verify ImageMagick is installed: `convert -version`
   - Reinstall: `brew install imagemagick` (macOS) or `sudo apt-get install imagemagick` (Linux)
