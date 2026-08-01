# 上游同步 Runbook（agent 执行手册）

> 适用：任何 agent 需要对 LabPage 与 al-folio v1 上游（starter + 16 个 `al_*` gem）做**对比或功能同步**时。
> 前置阅读：先读 `docs/upstream-tracking.md`（对账现状），再读本手册。
> 核心原则：**禁止 merge/cherry-pick 上游**（无共同 ancestry）；只允许"改 pin + override 审计 + 合入修复"；每批独立提交、可单独 revert。

## 0. 环境准备

```bash
git status --short          # 必须干净；异常时先与用户确认，勿自行 reset/rebase
```

## 1. 检测（上游有什么新东西）

```bash
# 对照上游 main（只读；若没有上游 clone，先 git clone https://github.com/alshedivat/al-folio 到 /tmp）
git -C /private/tmp/al-folio-upstream-analysis fetch origin 2>/dev/null || true
# 16 个插件仓库逐个 fetch（al-org-dev/<gem>），或直接查 GitHub releases
# 核对项：
#   a) starter: 上游 main HEAD、tag（v1.x）
#   b) 每个 gem 的 Gemfile pin vs 最新 tag/CHANGELOG（/Users/xu/.rbenv/versions/3.4.5/lib/ruby/gems/3.4.0/gems/<gem>/CHANGELOG.md）
```

输出格式（写入对账文档第 2 节或更新日志）：

```
al_folio_core  pin 1.0.13  latest X.Y.Z  变更摘要（来自 CHANGELOG）
...
```

**分类规则（把变更变成任务前必读）**：

- documentation-only / README / showcase / release notes → **不转任务**（只更新对账文档）
- bug fix → 转"修复移植"任务，小批次
- new feature → 转"功能启用"任务，需用户确认
- 依赖 bump（nokogiri 等）→ 仅 `bundle update`，不写进对账矩阵
- **不要因为配置键存在就判定功能可用；不要因为文件存在就判定已同步；不要因为实现方式不同就判定功能缺失**

## 2. 分类（对照对账矩阵）

打开 `docs/upstream-tracking.md` 第 3 节，给每个上游变更打状态标签：
`✅ 已同步 / 🟡 本地override·有意保留 / ⏸️ 主动拒绝 / N/A / ⚠️ 待决策`

- 已覆盖（本地实现等价/增强）→ 只更新备注，不动代码
- 缺失/过时 → 进入第 3 步
- 与本地设计冲突 → 记录到"主动拒绝登记"，不硬合

## 3. 执行（按批次，一次一个主题）

```bash
git checkout -b codex/upstream-<gem>-<version>   # 或直接在用户指定分支

# 升级依赖（精确 pin 下不会越级）
bundle update <gem> [--conservative]

# 查看本地 override 是否漂移（升级后必查）
bundle exec al-folio upgrade overrides audit
bundle exec al-folio upgrade overrides diff      # 逐文件审查：
#   - 上游修复值得吸收 → 手动合入本地 override（保留本地 i18n/设计）
#   - 上游新模板与本地设计冲突 → 保持本地，记录备注
```

**红线（不可违反）**：

1. 不修改 permalink / collections / archives / polyglot 路径配置（URL 契约冻结）
2. 不破坏 i18n：`site.active_lang` 体系、`_data/<locale>/strings.yml`、语言切换器、hreflang
3. 不为同步牺牲本地设计（Bootstrap 视觉、research/toolbox/books/teachings、CSP、字体）
4. 不删除仍被引用的本地资产；删除前 `grep -rn` 全仓确认
5. 不运行 `al-folio upgrade apply`（半自动改写，风险高）；不用 `git reset/rebase` 处理他人提交

## 4. 验证（每批必须全绿）

```bash
# a) 全量四语言生产构建（先 rm -rf _site 防增量残留）
rm -rf _site && JEKYLL_ENV=production bundle exec jekyll build

# b) URL manifest 与基线对比（139 条；基线暂存 /private/tmp/labpage-baseline-url-manifest.txt，
#    若已移入仓库则用 tests/baseline/url-manifest.txt）
find _site -name '*.html' | sed 's|^\./||' | sort > /tmp/urls.txt
# 规范化后与基线 diff：index.html→/、xxx/index.html→/xxx/、xxx.html→/xxx/
# 任何差异必须给出旧→新映射与 redirect 方案，禁止静默改 URL

# c) 契约审计
bundle exec al-folio upgrade audit --no-fail     # blocking 应为 0 或仅计划内 compat 引用
bundle exec al-folio upgrade overrides audit     # 不应出现新的 unacknowledged（除非本批新增并有备注）

# d) i18n 键覆盖
ruby scripts/audit-strings.rb                    # blocking: 0

# e) 行为抽查（编译产物级）：4 语言关键页（home/publications/cv/books/teachings/research/toolbox）
#    标签语言正确、hreflang 5 对、无旧资产引用残留
```

## 5. 提交与记账

```bash
git add -A
git commit -m "feat(v1): 同步 <gem> <version> — <摘要>（保留本地 i18n）"
# 更新 docs/upstream-tracking.md：
#   1) 第 2 节版本表状态
#   2) 第 3 节矩阵相关行状态/备注
#   3) 第 5 节更新日志追加一行（日期、事件、commit）
# 若台账需吸收：bundle exec al-folio upgrade overrides accept --all 后一并提交
```

提交信息规范：`feat(v1): ...` / `fix(v1): ...`，附"保留本地 i18n/设计"说明。
**不推送**（除非用户明确要求）；推送前先与用户确认分支与 force 策略（仓库存在多人/多 agent 操作风险）。

## 6. 回滚

- 单批回滚：`git revert <commit>`（依赖回滚 = 改回 pin + `bundle install`）
- override 文件单独回退：`git checkout HEAD -- <file>` 即回到 gem 默认或旧版
- 生产回滚：保留上一可发布 tag，部署流程回推旧 `_site`

## 7. 常见坑（迁移期实证）

1. **旧 `_site` 增量残留误导**：遇异常先 `rm -rf _site` 重构建再下结论
2. **polyglot 不更新 `site.lang`**：模板必须用 `site.active_lang`（上游模板用 `site.lang`，需在 override 中改）
3. **非 theme 插件 gem 的 `_includes` 不可被 `{% include %}` 解析**：gem 模板走 Ruby 渲染；wrapper 必须放站点或 theme
4. **gem 资产 URL 无 cache-bust**：升级 gem 后浏览器可能缓存旧 JS，验证时加 `?v=` 或清缓存
5. **多 agent 并发操作同一仓库**：操作前检查 `git status`/reflog，避免 reset/rebase 覆盖他人工作
