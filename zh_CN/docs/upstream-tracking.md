# 上游对账活文档（al-folio upstream tracking）

> 用途：记录 LabPage 与上游 al-folio（v1 插件架构）的功能对账状态，是后续 agent 对比/同步的**单源真相**。
> 维护规则：每次同步/决策后必须更新本文（见 `docs/upstream-sync-runbook.md` 第 5 步）。
> 最近更新：2026-07-31（B-1..B-8 前端迁移完成 + P 系列收尾 + 收尾 commit `70dcab7a`）

## 1. 关键基线事实

| 项            | 值                                                                                                                                                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 本地主分支    | `master`（当前 HEAD 见更新日志）                                                                                                                                                                               |
| 上游起始提交  | `ac7add4`（"Upgrade al-folio to v1.0 (#2968)"，squash 单父提交，+3361/−59871）                                                                                                                                 |
| 上游基线      | v0.16.3（`b5ecd1a6`）时代 → v1 架构                                                                                                                                                                            |
| 共同 ancestry | **无**（本地 vs 上游任何分支均无 merge-base）→ **禁止 merge/cherry-pick，只允许 pin 升级 + override 审计**                                                                                                     |
| 比较范围      | `ac7add4^..上游main` = 34 commits；插件各自独立演进                                                                                                                                                            |
| URL 契约      | `/`、`/blog/:year/:title/`、`/publications/`、`/cv/`、`/projects/`、`/news/`、`/books/`、`/teachings/`、`/research/`、`/toolbox/`、archives、`/app/*`、`/assets/*`、`/{zh_CN,de_DE,ja_JP}/` 前缀——**禁止变更** |
| 多语言        | jekyll-polyglot 1.13.0（引擎）+ `site.active_lang` 体系 + `_data/<locale>/strings.yml`（226 键 × 4 语言，`scripts/audit-strings.rb` 护栏）                                                                     |

## 2. Gem 版本基线（Gemfile `group :al_folio_plugins` 精确 pin）

| Gem                       | Pin      | 上游最新（2026-07-31 核对） | 状态                                  |
| ------------------------- | -------- | --------------------------- | ------------------------------------- |
| al_folio_core             | = 1.0.13 | 1.0.13                      | ✓ 最新                                |
| al_icons                  | = 1.0.0  | 1.0.0                       | ✓                                     |
| al_folio_cv               | = 1.0.2  | 1.0.2                       | ✓                                     |
| al_folio_distill          | = 1.0.3  | 1.0.3                       | ✓                                     |
| al_folio_upgrade          | = 1.0.3  | 1.0.3                       | ✓                                     |
| al_folio_bootstrap_compat | = 1.0.0  | 1.0.0                       | ✓（v1.3 弃用、v2.0 移除——**时间盒**） |
| al_cookie                 | = 1.0.0  | 1.0.0                       | ✓                                     |
| al_analytics              | = 1.0.2  | 1.0.2                       | ✓                                     |
| al_citations              | = 1.0.1  | 1.0.1                       | ✓                                     |
| al_ext_posts              | = 1.0.3  | 1.0.3                       | ✓                                     |
| al_img_tools              | = 1.0.3  | 1.0.3                       | ✓                                     |
| al_search                 | = 1.0.3  | 1.0.3                       | ✓                                     |
| al_charts                 | = 1.0.1  | 1.0.1                       | ✓                                     |
| al_math                   | = 1.0.2  | 1.0.2                       | ✓                                     |
| al_comments               | = 1.0.0  | 1.0.0                       | ✓                                     |
| al_newsletter             | = 1.0.0  | 1.0.0                       | ✓                                     |

上游 starter 参考：上游 main HEAD `1d3b191a`；tag `v1.1`（`e4342b9c`）/ `v1.0`（`f2517e2f`）。
**升级方式**：改 pin → `bundle update <gem>`（v1.1 起 `bundle update` 不会自动越级）→ runbook 第 3-4 步。

## 3. 功能对账矩阵

状态图例：✅ 已同步（gem/本地实现等价或已采用）｜🟡 本地 override/本地实现有意保留｜⏸️ 主动拒绝或保持关闭｜N/A 不适用｜⚠️ 待决策

### Core / 布局

| ID       | 上游功能                                   | 来源               | 状态 | 处置/备注                                                                                |
| -------- | ------------------------------------------ | ------------------ | ---- | ---------------------------------------------------------------------------------------- |
| CORE-001 | v1 theme/插件契约                          | ac7add4            | ✅   | P2-1 接线：`theme: al_folio_core` + 16 pin + plugins 双列表                              |
| CORE-002 | core 基础 layouts                          | ac7add4            | 🟡   | 本地 10 layouts 为 i18n override（B 系列后台账 61 项）；profiles 依赖 gem 布局           |
| CORE-003 | core 基础 includes                         | ac7add4            | 🟡   | 本地 includes override 保留（B-2 后 header/footer 已对齐 core 契约）                     |
| CORE-004 | details/file_exists tags                   | ac7add4            | ✅   | 本地副本已删，gem 提供                                                                   |
| CORE-005 | hideCustomBibtex/remove_accents filters    | ac7add4            | ✅   | 同上                                                                                     |
| CORE-006 | repository 卡片（stats/trophies/calendar） | core 1.0.11/1.0.12 | ✅   | P5-6 采用 github-stats-extended + onerror；repo_calendar 本地 metrics 保留               |
| CORE-007 | apple-touch-icon                           | core 1.0.13        | ✅   | P8-1 启用（favicon.ico → 180×180 PNG）                                                   |
| CORE-008 | bib 视频 preview + video .mov              | core 1.0.13        | ✅   | P5-2 合入                                                                                |
| CORE-009 | og:image 绝对 URL                          | core 1.0.12        | ✅   | P4-1 合入                                                                                |
| CORE-010 | 移动端子菜单                               | core 1.0.12        | N/A  | 本地 Bootstrap 4.5 实现等价；Tailwind 规则不适用                                         |
| CORE-011 | favicon 空值修复                           | core 1.0.13        | ✅   | P4-1 合入                                                                                |
| CORE-012 | cache-bust 修复                            | core 1.0.10        | ✅   | gem 对 jekyll-cache-bust 打补丁                                                          |
| CORE-013 | de-jQuery bib/figure                       | core 1.0.10        | ✅   | P5-2/P4-1 合入                                                                           |
| CORE-014 | af-popover/tooltip 样式                    | core 1.0.11        | ✅   | B-4 移植 .af-tooltip/.af-popover 到 \_sass/\_utilities.scss；AlFolioUi 原生运行时        |
| CORE-015 | Tailwind-first + style contract            | ac7add4            | ✅   | B-1 起 compat=false，tailwind.css 已加载；本地 main.css 叠加；compat gem 保留 pin 作回滚 |
| CORE-016 | 静默门控 + 双列表一致                      | ac7add4            | ✅   | 已建立 checklist 习惯                                                                    |

### CV / Publications

| ID      | 上游功能                        | 来源        | 状态 | 处置/备注                                                                                                                      |
| ------- | ------------------------------- | ----------- | ---- | ------------------------------------------------------------------------------------------------------------------------------ |
| CV-001  | al_folio_cv 统一渲染            | ac7add4     | 🟡   | 本地 4 语言 cv.liquid override 保留                                                                                            |
| CV-002  | al_cv_sort_by_date              | cv 1.0.1    | ✅   | P5-1 移植                                                                                                                      |
| CV-003  | bare-date badge / projects 日期 | cv 1.0.2    | ✅   | P5-1 移植                                                                                                                      |
| CV-004  | RenderCV 自动 PDF               | #3462/#3475 | ✅   | 本地 4 语言化保留                                                                                                              |
| CV-005  | JSONResume + jekyll_get_json    | v0.16       | 🟡   | jekyll*get_json/jsonresume 配置块已删（引用的 resume*\*.json 不存在）；模板层 jsonresume 分支保留兼容；CV 走 rendercv 单一格式 |
| PUB-001 | al_citations tags               | ac7add4     | ✅   | 迁移 gem；本地 badges 数据沿用                                                                                                 |
| PUB-002 | bib 布局（作者/按钮/badges）    | v0.16→v1    | 🟡   | 本地 19KB i18n override 保留                                                                                                   |
| PUB-003 | bib_search                      | v0.16→v1    | 🟡   | 本地 i18n placeholder override                                                                                                 |
| PUB-004 | 作者展开器原生化                | core 1.0.10 | ✅   | P5-2 合入                                                                                                                      |

### Search / Icons / Analytics / Comments / Cookie

| ID         | 上游功能                      | 来源                 | 状态 | 处置/备注                                                                                                     |
| ---------- | ----------------------------- | -------------------- | ---- | ------------------------------------------------------------------------------------------------------------- |
| SEARCH-001 | al_search 运行时              | ac7add4; 1.0.2/1.0.3 | ✅   | gem 资产 + 本地 i18n search-data override（P4-2 语言隔离验证）                                                |
| SEARCH-002 | 搜索模态/热键原生化           | 1.0.1/1.0.2          | ✅   | 本地 ninja-keys 保留（P4-2）                                                                                  |
| SEARCH-003 | search-data 性能              | 1.0.3                | ✅   | 本地 search-data 由 al_search gem（=1.0.3）生成，性能修复随 gem 生效                                          |
| ICONS-001  | al_icons CDN+SRI              | ac7add4              | ✅   | B-5 启用 al_icons CDN+SRI（fontawesome 7.2.0/academicons 1.9.5/scholar-icons 1.0.3），vendored 已删           |
| AN-001     | al_analytics（GA 等）         | ac7add4; 1.0.x       | ✅   | P5-7 gem wrapper；扁平键兼容（G-H0H008S793）                                                                  |
| AN-002     | Simple Analytics / Cloudflare | 1.0.1/1.0.2          | ⏸️   | 能力随 gem 具备；本地未配置键（需自加 enable_simple_analytics/enable_cloudflare_analytics），填 ID+开关即启用 |
| AN-003     | consent 门控 analytics        | al_cookie 联调       | ⏸️   | D4 默认关闭（与基线一致）；`enable_cookie_consent: true` 即可启用                                             |
| AN-004     | Search Console/Bing 验证      | v0.16→v1             | ✅   | 保留                                                                                                          |
| COM-001    | al_comments（Giscus/Disqus）  | ac7add4              | 🟡   | 本地 giscus override（主题检测 + i18n noscript + giscus_languages）保留                                       |
| COOKIE-001 | al_cookie                     | ac7add4              | ✅   | gem 接线（禁用态零输出）                                                                                      |

### Images / Math / Charts / Distill / Ext posts / Newsletter

| ID        | 上游功能                                      | 来源                 | 状态 | 处置/备注                                                              |
| --------- | --------------------------------------------- | -------------------- | ---- | ---------------------------------------------------------------------- |
| IMG-001   | al_img_tools（zoom/lightbox/gallery/slider）  | ac7add4; 1.0.2/1.0.3 | ✅   | P5-8 gem；lightbox2 adapter 替代 photoswipe                            |
| IMG-002   | Swiper 12.1.2（CVE-2026-27212）               | 1.0.3                | ✅   | gem 内置                                                               |
| IMG-003   | jekyll-imagemagick                            | v0.16→v1             | ✅   | 保留                                                                   |
| IMG-004   | video.liquid .mov                             | core 1.0.13          | ✅   | P4-1                                                                   |
| MATH-001  | al_math（MathJax/pseudocode/tikzjax CDN+SRI） | ac7add4; 1.0.1       | ✅   | P5-8 gem；tikzjax 走 CDN（config 已补）                                |
| MATH-002  | polyfill 移除                                 | 1.0.2                | ✅   | P5-8 随 gem 移除                                                       |
| CHART-001 | al_charts 全套                                | ac7add4              | ✅   | P5-8 gem                                                               |
| CHART-002 | chartjs de-jQuery                             | 1.0.1                | ✅   | P5-8 gem                                                               |
| DIST-001  | al_folio_distill                              | ac7add4; 1.0.2/1.0.3 | ✅   | P5-9 gem（本地 distill 已删）                                          |
| DIST-002  | 远程 loader 移除（安全）                      | 1.0.3                | ✅   | provenance `remote_loader_patched: true`；`allow_remote_loader: false` |
| DIST-003  | overrides de-jQuery                           | 1.0.2                | ✅   | gem                                                                    |
| EXT-001   | al_ext_posts                                  | ac7add4; 1.0.1–1.0.3 | ✅   | gem 接线，保持关闭                                                     |
| EXT-002   | 空标题修复等                                  | 1.0.3                | ✅   | 随 gem（关闭态无影响）                                                 |
| NL-001    | al_newsletter（Loops）                        | ac7add4              | 🟡   | 本地 newsletter.liquid i18n 保留；`enabled: false`                     |

### Collections / SEO / Build / Perf / A11y / Migration / Docs

| ID               | 上游功能                                       | 来源                | 状态 | 处置/备注                                                                                                            |
| ---------------- | ---------------------------------------------- | ------------------- | ---- | -------------------------------------------------------------------------------------------------------------------- |
| COLL-001/002/003 | books/teachings/archives                       | v0.16→v1            | 🟡   | 本地 i18n 增强保留                                                                                                   |
| SEO-001          | OG/Schema.org/socials                          | v0.16→v1            | 🟡   | 本地 metadata override（sameAs 全列表）                                                                              |
| SEO-002          | hreflang/og:locale:alternate                   | 本地独有            | ✅   | 保留（polyglot 1.13 + metadata override）                                                                            |
| SEO-003          | sitemap/feed/robots                            | v0.16→v1            | ✅   | 与基线一致                                                                                                           |
| SEO-004          | tocbot 侧边 TOC                                | ac7add4; core 1.0.7 | ✅   | B-3 接线 tocbot（4.36.4 + SRI，含 toc.collapse/collapse_depth 契约，cv 4 语言 collapse: auto）；内联 jekyll-toc 保留 |
| BUILD-001        | Gemfile v1 wiring                              | ac7add4             | ✅   | P2-1                                                                                                                 |
| BUILD-002        | minify/terser/purgecss                         | v0.16→v1            | ✅   | 保留（terser git pin）；purgecss safelist 16 项已补（修复 zoom/af-tooltip 误删）                                     |
| BUILD-003        | Docker 工具链                                  | v0.16→v1            | N/A  | 已删 3 个 Docker 惰性工作流（deploy-image/deploy-docker-tag/docker-slim），本地无 Docker                             |
| BUILD-004        | CI：unit-tests/visual-regression/upgrade-check | ac7add4             | ⏸️   | 未引入（本地 i18n-audit.yml 已加；可后补）                                                                           |
| BUILD-005        | 6 个 integration\_\*.sh                        | ac7add4             | ⏸️   | 未引入（可后补）                                                                                                     |
| PERF-001         | SRI/CDN 管理                                   | v0.16→v1            | ✅   | third_party_libraries 保留                                                                                           |
| PERF-002         | font preload                                   | 本地                | ✅   | 保留                                                                                                                 |
| A11Y-001         | axe workflow                                   | v0.16→v1            | ✅   | axe.yml 保留                                                                                                         |
| A11Y-002         | lang-switcher 无障碍                           | 本地                | ✅   | 键盘导航保留                                                                                                         |
| MIG-001          | al_folio_upgrade CLI                           | ac7add4             | ✅   | 迁移全程使用                                                                                                         |
| MIG-002          | .al-folio-overrides.yml                        | upgrade 1.0.3       | ✅   | 67 项台账（SHA256 + 版本 pin）                                                                                       |
| MIG-003          | migration manifests                            | core                | ✅   | 参考（migrations/\*.yml）                                                                                            |
| DOC-001          | 上游文档体系重构                               | #3681               | N/A  | 本地 CUSTOMIZE.md 已本地化                                                                                           |

## 4. 主动拒绝/保持关闭登记（重新评估条件见备注）

| 功能                          | 状态      | 原因                                                                                                                                                    | 重新评估条件                                            |
| ----------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| 上游 GH Pages deploy workflow | 拒绝      | 本地自定义服务器部署                                                                                                                                    | 迁移回 GH Pages 时                                      |
| Docker 工具链                 | 已删除    | 本地无 Docker；3 个惰性工作流（deploy-image/deploy-docker-tag/docker-slim）已移除，broken-links.yml 排除行同步清理                                      | 无                                                      |
| star-history 自托管           | 拒绝      | 仅上游 README 展示                                                                                                                                      | 无                                                      |
| newsletter 启用               | 关闭      | 无 Loops endpoint                                                                                                                                       | 提供 endpoint 后                                        |
| external posts 启用           | 关闭      | 无 RSS 需求                                                                                                                                             | 有需求时                                                |
| Simple Analytics / Cloudflare | 关闭      | 已用 GA                                                                                                                                                 | 需要时改 config                                         |
| polyglot 移除                 | 拒绝      | 多语言一级资产                                                                                                                                          | v1 官方提供 i18n 契约时                                 |
| 纯 Tailwind 重写              | 拒绝      | 视觉/工作量风险                                                                                                                                         | compat v1.3 弃用前（时间盒）                            |
| tocbot 替换 jekyll-toc        | ✅ 已启用 | B-3 完成（含 toc.collapse 契约）；内联 jekyll-toc 保留                                                                                                  | —                                                       |
| scholar badge 启用            | ✅ 已启用 | 2026-07-31：7 条 bib 迁移 gscholar→google_scholar_id（citations.yml 提取 pub_id）+ 修复 bib.liquid:389 userid 键引用；12 条无数据条目移除 gscholar 字段 | —                                                       |
| cookie consent（D4）          | 关闭      | 与基线一致                                                                                                                                              | 需要 GDPR 合规弹窗时翻 `enable_cookie_consent: true`    |
| isocalendar 卡片              | ⚠️ 待处理 | `Vncntvx/Vncntvx` 的 `.cache/metrics.plugin.isocalendar.fullyear.svg` 404（已加 onerror 兜底）                                                          | 重跑 github-metrics 或设 `repo_calendar.enabled: false` |

## 5. 更新日志

| 日期       | 事件                                                                                                                                                                                                                                                                                                                                                    | 证据                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| 2026-07-31 | **v1 迁移全部完成**：10 个 Phase / 14 commits（P2-1 → P9-1），+1174/−41222 行；master 同步 2fa977ac 并推送 origin                                                                                                                                                                                                                                       | 本文档矩阵即对账结果 |
| 2026-07-31 | i18n 加固：`scripts/audit-strings.rb`（226 键 × 4 语言）+ 136 处 default 兜底 + `i18n-audit.yml`（commit `74ff18dc`）                                                                                                                                                                                                                                   | 见 git log           |
| 2026-07-31 | 外部 rebase：master 顶部 3 commits 被 reword（`c202769c` 等，内容不变）；origin 仍为 `2fa977ac`，**分叉待用户决定 push 策略**                                                                                                                                                                                                                           | reflog               |
| 2026-07-31 | **P 系列收尾**：nokogiri/loofah 安全补丁（1.19.4/2.25.2，`63531aac`）；plugins 目录页 4 语言 + featured_plugins.yml + scholar badge 启用（`1267ea0b`）；draft 死链清理 + update-tocs 覆盖 docs/ 与 hash 校验 + 删 5 个 CV 死资产 + 删 3 个 Docker 工作流（`0307d079`）；JSONResume 死配置删除 + purgecss safelist 16 项（`f2075b0a`）                   | git log              |
| 2026-07-31 | **B-1..B-8 前端迁移全部完成**：compat=false + tailwind/nav-toggle 接管（B-1，`c8d68a8a`）；header/footer 对齐 core 契约（B-2，`a399f72e`）；tocbot 接线（B-3，`505760c1`）；af-\* 分页 + AlFolioUi 样式（B-4，`2e55198b`）；al_icons CDN（B-5，`94f52b2b`）；de-jQuery 收尾（B-6，`2303c04b`）；主题三态（B-7，`70dcab7a`）；upgrade audit Blocking 4→0 | git log + 本文档矩阵 |

> 待办提醒：P0-1 基线 URL manifest 目前仅存于 `/private/tmp/labpage-baseline-url-manifest.txt`（139 条；plugins 页后 143 条），建议后续移入仓库（如 `tests/baseline/`），否则 runbook 的验证步骤缺少永久基准。
