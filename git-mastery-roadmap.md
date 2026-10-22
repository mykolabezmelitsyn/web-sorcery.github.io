# Git Mastery Roadmap

**Starting point:** Intermediate Git user, revisiting fundamentals where useful.  
**Goal:** Become confident using Git independently on complex projects, collaborating safely, recovering from mistakes, and understanding what happens under the hood.

> **What mastery means:** You can predict how a Git command changes the working tree, index, references, and commit history; choose the right workflow for a team; and recover when operations go wrong. Memorizing every command is not required.

## How to use this roadmap

- **Review** stages 1–4, even if you use those commands daily. Explain the underlying concepts without looking them up.
- **Prioritize** stages 5–10: these deliver the biggest improvements for most intermediate developers.
- **Go deeper** with stages 11–17 to build expert-level understanding.
- **Practice in disposable repositories.** Use a separate sandbox repository when experimenting with destructive commands.
- For every topic, learn **what the command does**, **when to use it**, **what it modifies**, and **how to recover if it goes wrong**.

---

## Stage 1 — Git fundamentals and mental models

### Topics to master

- Git as a **distributed version control system** and a snapshot-based history model.
- The difference between **Git** and hosting platforms such as **GitHub**, GitLab, and Bitbucket.
- The four essential areas: **working tree**, **staging area (index)**, **local repository**, and **remote repository**.
- The three broad file states: **modified**, **staged**, and **committed**; plus **untracked** and **ignored** files.
- Commits as nodes in a **directed acyclic graph (DAG)** with parent links.
- What **HEAD**, branch names, tags, and remote-tracking references represent.
- The difference between a **branch** (movable reference) and a **commit** (immutable object).
- Why a Git commit records a snapshot, not merely a list of changed lines.
- The meanings of **checkout/switch**, **detached HEAD**, and **clean vs. dirty working tree**.
- What `origin`, `main`, and `HEAD` mean—and why none is magical or mandatory.

### Essential commands

```bash
git --version
git help <command>
git init
git clone <url>
git status
git status -sb
git log --oneline --graph --decorate --all
git show HEAD
```

**Practice:** Draw the working tree → index → commit flow, create a repository with three commits, and identify where `HEAD` and the branch reference point after each commit.

---

## Stage 2 — Configuration and repository hygiene

### Topics to master

- System, global, and local Git configuration; configuration precedence.
- Setting commit identity (`user.name`, `user.email`) and checking where a setting came from.
- Default branch names, default editor, aliases, and command-line help.
- `.gitignore`: patterns, negation rules, directory rules, and why it does **not** untrack already tracked files.
- `.git/info/exclude` and global ignore patterns.
- `.gitattributes`: text/binary classification, end-of-line rules, diff/merge behavior, and custom attributes.
- Line-ending differences among **LF**, **CRLF**, and platform settings; `core.autocrlf` vs. repository-level attributes.
- File modes and executable bits; symlink behavior; case sensitivity across operating systems.
- Proper repository contents: source code, configuration templates, dependency lockfiles, documentation, and appropriate assets.
- Files usually excluded: `node_modules/`, local credentials, `.env` secrets, temporary logs, caches, and most generated output (subject to deployment needs).

### Essential commands

```bash
git config --list --show-origin
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
git check-ignore -v path/to/file
git rm --cached path/to/tracked-file
```

**Practice:** Prepare a repository for a JavaScript/TypeScript project. Create appropriate `.gitignore` and `.gitattributes` files, confirm ignored paths, and simulate a line-ending issue.

---

## Stage 3 — Daily Git operations, precisely

### Topics to master

- `git add` as updating the **index**, not immediately making a commit.
- Staging an entire file versus specific **hunks** or selected lines.
- Differences among `git diff`, `git diff --staged`, and `git diff HEAD`.
- Creating small, focused, comprehensible commits with useful messages.
- Renaming, moving, deleting, and restoring files; Git's rename detection.
- Amending a **local, unpublished** commit.
- File history, inspection of individual commits, and viewing previous file versions.
- Pathspecs, quoting paths, and `--` to disambiguate revision names from file paths.
- Understanding the effect of `git commit -a` (tracks modifications/removals, but does not add untracked files).

### Essential commands

```bash
git add file.js
git add -p
git diff
git diff --staged
git diff HEAD
git commit -m "Add form validation"
git commit --amend
git restore file.js
git restore --staged file.js
git mv old.js new.js
git rm obsolete.js
git log -- path/to/file
```

**Practice:** Make three unrelated changes in one file, stage only one hunk, inspect the staged patch, and commit that change without including the others.

---

## Stage 4 — Branching, merging, and basic collaboration

### Topics to master

- Creating, switching, listing, renaming, and deleting branches.
- Local branches vs. **remote-tracking** branches; branch upstream/tracking configuration.
- Fast-forward merge vs. true **three-way merge** (merge commit).
- When Git can merge automatically and when a conflict occurs.
- Branch divergence, ancestry, merge bases, and reachability.
- Feature branches, short-lived branches, and why small pull requests are easier to review.
- `git switch` / `git restore` vs. the older multipurpose `git checkout` command.
- Safe deletion of merged branches and reasons to retain an unmerged branch.

### Essential commands

```bash
git branch -a
git switch -c feature/header
git switch main
git merge feature/header
git merge --no-ff feature/header
git branch -d feature/header
git branch -D feature/header
git merge-base main feature/header
```

**Practice:** Create two branches from a common commit, make changes on each, perform both a fast-forward merge and a non-fast-forward merge, and explain the resulting graph.

---

## Stage 5 — Remotes, syncing, and authentication

### Topics to master

- Remote URLs, multiple remotes, and the usual meaning of `origin` and `upstream` in fork workflows.
- The precise differences between **fetch**, **pull**, and **push**.
- `git pull` as fetch followed by an integration step (merge or rebase, depending on configuration/options).
- Tracking branches, setting an upstream, and viewing ahead/behind status.
- Non-fast-forward push rejection and what it signals.
- Safe force pushes with `--force-with-lease`; why `--force` is especially dangerous on shared branches.
- Fetching and pruning obsolete remote-tracking references.
- HTTPS authentication, credential managers, SSH keys, access tokens, and credential scopes.
- Fetch/push **refspecs** and the difference between local branch references and remote references.
- Fork-based contribution and keeping a fork synchronized with its upstream repository.

### Essential commands

```bash
git remote -v
git remote add upstream <url>
git fetch origin
git fetch --prune origin
git pull --ff-only
git pull --rebase
git push -u origin feature/header
git push --force-with-lease
git branch -vv
git ls-remote origin
```

**Practice:** Simulate a team using two clones of the same local bare repository. Create divergent commits, encounter a non-fast-forward rejection, and resolve it without losing either person's work.

---

## Stage 6 — Reading history and finding changes

### Topics to master

- Configuring useful commit graphs and concise/custom `git log` formats.
- Filtering history by author, date, file, path, message, and revision range.
- Revision syntax: `HEAD~2`, `HEAD^`, `HEAD^2`, `main~3`, `branch@{upstream}`.
- The difference between revision sets like `A..B` and symmetric differences like `A...B` in `git log`.
- How `git diff A..B` compares endpoints, while `git diff A...B` compares the merge base with `B`.
- `git show`, `git blame`, `git shortlog`, and `git grep`.
- Search for commits that add/remove a string (`-S`) or modify lines matching a regex (`-G`).
- Identify the commit containing a regression or a dependency change.
- Understand limitations of `blame` with bulk formatting, file moves, and refactors.

### Essential commands

```bash
git log --oneline --graph --decorate --all
git log --author="Name" --since="2 weeks ago"
git log -p -- src/app.js
git log -S"fetchData" -- src/
git log -G"useEffect\(" -- src/
git diff main...feature/header
git show HEAD~2
git blame -L 10,30 src/app.js
git grep -n "TODO"
```

**Practice:** Deliberately introduce and later modify a buggy line. Locate its introducing commit using multiple methods, and explain how a triple-dot diff for a feature branch is computed.

---

## Stage 7 — Merge conflicts and conflict resolution

### Topics to master

- Causes of content, delete/modify, rename, and other merge conflicts.
- Three-way merge inputs: **base**, **ours**, and **theirs**.
- Why the meanings of `ours`/`theirs` can be counterintuitive during a rebase.
- Conflict markers and resolving conflicts manually or through an IDE/merge tool.
- Inspecting unmerged index stages and verifying the final combined result.
- Completing, aborting, or retrying merge and rebase operations.
- `git rerere` (reuse recorded resolution) and when it helps.
- Preventing conflicts through focused commits, frequent synchronization, and coordination.

### Essential commands

```bash
git status
git ls-files -u
git mergetool
git add resolved-file.js
git merge --continue
git merge --abort
git rebase --continue
git rebase --abort
git rebase --skip
git config --global rerere.enabled true
```

**Practice:** Cause conflicts in JavaScript source, a JSON configuration file, and a dependency lockfile. Resolve them, run validation/tests, and compare the final tree with the intended result.

---

## Stage 8 — Rebasing and rewriting history

### Topics to master

- Merge vs. rebase: resulting history, trade-offs, and team conventions.
- Regular rebase onto a refreshed base branch and why rebased commits receive new IDs.
- Interactive rebase: **reword**, **edit**, **squash**, **fixup**, **drop**, **reorder**, and **split** commits.
- `git commit --fixup` and `git rebase --autosquash`.
- Cherry-picking selected commits and recognizing duplicate/empty changes.
- Rebasing an entire range with `--onto`.
- Inspecting changes between two iterations of a rebased patch series using `git range-diff`.
- Why rewriting a branch others depend on can disrupt collaborators.
- Updating your own published feature branch cautiously, using `--force-with-lease` when appropriate.

### Essential commands

```bash
git rebase main
git rebase -i HEAD~4
git commit --fixup <commit>
git rebase -i --autosquash main
git cherry-pick <commit>
git rebase --onto new-base old-base topic
git range-diff old-base..old-tip new-base..new-tip
git rebase --abort
```

**Practice:** Create a messy feature branch with five commits, then produce a clean, logically organized history using interactive rebase. Compare it with an alternate merge-based workflow.

---

## Stage 9 — Undoing mistakes and recovering work

### Topics to master

- Choose the correct recovery tool for **unstaged changes**, **staged changes**, **local commits**, and **published commits**.
- `git restore`: restore working-tree content and/or staging-area content.
- `git reset`: move `HEAD` (and usually the current branch) and optionally reset index/working tree.
- Differences among **`--soft`**, **`--mixed`** (default), and **`--hard`**.
- `git revert`: create a new commit that reverses earlier changes while preserving shared history.
- Reverting a merge commit with `-m` and the importance of choosing the mainline parent.
- `git reflog`: locate recent reference movements and recover accidentally lost branch tips or commits.
- Stashing (including untracked files), inspecting stashes, applying vs. popping, and stash conflicts.
- `git clean` for removing untracked files; **always inspect with `-n` before actual deletion**.
- Limits of recovery: uncommitted/untracked data and expired/unreachable objects are not always recoverable.
- Why a force push or history rewrite cannot reliably remove a leaked secret from other clones; revoke/rotate secrets immediately.

### Essential commands

```bash
git restore --staged src/app.js
git restore src/app.js
git reset --soft HEAD~1
git reset --mixed HEAD~1
git reset --hard HEAD~1
git revert <commit>
git reflog
git branch recovered <commit-id>
git stash push -u -m "Work in progress"
git stash list
git stash pop
git clean -nd
git clean -fd
```

**Practice:** In a throwaway repository, undo a staged hunk, uncommit without losing files, recover a branch after a hard reset using reflog, and revert a bad commit that was already shared.

### Decision guide

| Situation | Usually appropriate |
| --- | --- |
| Discard an unstaged edit to a tracked file | `git restore <file>` |
| Unstage a file but keep its contents | `git restore --staged <file>` |
| Change an unpublished latest commit | `git commit --amend` |
| Undo a local commit while keeping edits | `git reset --soft HEAD~1` or `--mixed`, depending on desired index state |
| Undo a published commit without rewriting history | `git revert <commit>` |
| Recover a recently moved branch tip | `git reflog` + `git branch` / careful `git reset` |
| Remove untracked files | `git clean -n` first; then `git clean` only after inspection |

---

## Stage 10 — Professional team workflows

### Topics to master

- **Trunk-based development**, short-lived feature branches, GitHub Flow, and Git Flow: benefits and trade-offs.
- Pull requests / merge requests, review etiquette, focused diffs, and responding to review comments.
- Merge commit vs. squash merge vs. rebase merge; impact on traceability and bisectability.
- Branch naming, commit-message conventions, and scope control.
- Protected branches, required checks, approval rules, linear-history requirements, and merge queues.
- Handling hotfixes, releases, backports, and maintenance branches.
- Managing parallel contributions, ownership, and avoiding work lost through force pushes.
- Repository permissions, `CODEOWNERS` (on supported hosts), and reviewing changes to sensitive files.
- Working with forks and upstream contributions in open-source projects.
- Choosing a history policy and documenting it in contribution guidelines.

**Practice:** Collaborate with a second person (or simulate two users) through feature branches, reviews, a deliberately failed CI check, revision of the pull request, and a protected-main merge.

---

## Stage 11 — Tags, releases, and versioning

### Topics to master

- Lightweight vs. annotated tags; moving branch references vs. usually stable release tags.
- Signed tags or commits where a team needs verifiable provenance.
- Semantic Versioning and conventional commits as **ecosystem conventions**, not Git requirements.
- Release branches, release notes, changelogs, and hotfix workflows.
- `git describe`, `git archive`, and comparing releases.
- Why changing or replacing a published release tag is risky.
- How Git releases interact with CI/CD deployment pipelines.

### Essential commands

```bash
git tag
git tag -a v1.0.0 -m "Release 1.0.0"
git show v1.0.0
git push origin v1.0.0
git diff v1.0.0..v1.1.0
git describe --tags
git archive --format=zip --output=release.zip v1.0.0
```

**Practice:** Tag a tested version of a frontend library, prepare release notes from commit history, and create a maintenance hotfix without changing the original release.

---

## Stage 12 — Advanced collaboration and repository layouts

### Topics to master

- `git worktree`: work on multiple branches in separate directories without multiple full clones.
- Submodules: pinned commits, clone/update commands, detached HEAD in submodules, and team pitfalls.
- Git subtree as an alternative for vendor/shared code; trade-offs vs. submodules and package managers.
- Monorepos vs. multirepos and how repository boundaries affect Git workflows.
- Sparse checkout: reduce which tracked paths appear in the working tree.
- Shallow clones vs. partial clones and the limitations of incomplete history/object availability.
- Git LFS for large binary assets and the distinction between an LFS pointer and actual file contents.
- Generating and applying patches, using `format-patch` and `git am` for email-style collaboration.
- `git bundle` for transferring repository history without a remote server.

### Essential commands

```bash
git worktree add ../project-hotfix -b hotfix/login main
git worktree list
git worktree remove ../project-hotfix
git submodule update --init --recursive
git sparse-checkout set packages/ui
git format-patch -1 HEAD
git bundle create project.bundle --all
```

**Practice:** Maintain one branch for a bug fix and another for a new feature via worktrees. In a separate sandbox, try a monorepo sparse checkout and a repository with a submodule.

---

## Stage 13 — Debugging and investigation

### Topics to master

- `git bisect`: binary-search commit history to locate a regression.
- Using `git bisect run` with an automated test/script and handling skipped or untestable commits.
- `git blame`, pickaxe (`-S` / `-G`), and file history to investigate how bugs emerged.
- Comparing release/tag boundaries, branches, and merge bases.
- Diagnosing strange merges, deleted files, bad rebases, and missing commits.
- Checking repository object integrity with `git fsck` and understanding that repair may require backups/remotes.
- Read errors and bad-object messages carefully before using destructive commands.

### Essential commands

```bash
git bisect start
git bisect bad
git bisect good <known-good-commit>
git bisect run ./test-regression.sh
git bisect reset
git fsck --full
```

**Practice:** Create a script that returns a nonzero exit code for a regression, introduce the bug midway through a 15-commit history, and locate it using automated bisect.

---

## Stage 14 — Git hooks, automation, and CI/CD

### Topics to master

- Local client hooks such as `pre-commit`, `commit-msg`, and `pre-push`.
- Server-side hooks and how they differ from local hooks.
- Sharing hooks through project tooling or `core.hooksPath`; hooks are not automatically distributed as executable policy.
- Running formatters, linters, TypeScript checks, unit tests, and secret scanners at appropriate stages.
- GitHub Actions / GitLab CI pipelines triggered by pushes, tags, and pull requests.
- Required checks and how CI enforces rules that optional client hooks cannot.
- Avoiding fragile or excessively slow hooks and protecting the ability to diagnose failures.
- CI permissions, token scopes, pull request trust boundaries, and artifact handling.

**Practice:** Set up a frontend repository with a pre-commit quality check and a remote CI job that installs dependencies, runs a linter, performs a TypeScript check, and executes tests before merge.

---

## Stage 15 — Security and repository policy

### Topics to master

- HTTPS credentials vs. SSH keys; credential helpers; access-token expiry and least privilege.
- Signed commits and tags using supported signing methods (for example SSH or GPG).
- Secrets detection and preventing `.env` credentials or production secrets from entering Git history.
- The difference between ignoring a file and **removing already committed contents from history**.
- Safely handling leaked secrets: **rotate/revoke them first**, then assess history cleanup and coordination.
- History rewrite tools for exceptional cleanup, such as `git filter-repo` (an external tool); implications for collaborators, forks, and caches.
- Repository rules, branch protections, status checks, and trusted release processes.
- Binary files, sensitive generated artifacts, and dependency provenance.

**Practice:** In a disposable repository, commit a fake secret, then investigate how many commits contain it. Practice coordinated cleanup without using any actual credentials.

---

## Stage 16 — Git internals: how Git really works

### Topics to master

- `.git/` structure: object database, refs, `HEAD`, index, logs, configuration, and hooks.
- Object types: **blob**, **tree**, **commit**, and **annotated tag**.
- Object hashes/IDs and content-addressed storage; understand that object format may use SHA-1 or SHA-256 depending on repository setup.
- Loose objects, packfiles, delta compression, and garbage collection.
- How branch names and remote-tracking refs ultimately resolve to commits.
- Symbolic references, detached HEAD, annotated tags, and reflogs.
- The index as a tree-building staging structure; conflict stages in the index.
- Git's **porcelain** (user-facing) and **plumbing** (low-level) commands.
- Revisions, ancestry, reachability, merge-base calculations, and commit graphs.
- Refspec syntax (`<src>:<dst>`), fetching, and pushing at the reference level.
- Object lifetime, pruning, and why unreachable commits may remain temporarily recoverable.

### Essential commands

```bash
git rev-parse HEAD
git cat-file -t HEAD
git cat-file -p HEAD
git ls-tree HEAD
git ls-files --stage
git show-ref
git symbolic-ref HEAD
git hash-object -w demo.txt
git count-objects -v
git gc
```

**Practice:** Build a tiny repository, inspect commit/tree/blob objects by ID, inspect `HEAD` and refs directly, and explain which internal objects change after each new commit.

---

## Stage 17 — Performance, maintenance, and unusual cases

### Topics to master

- Object packing, repository maintenance, `git gc`, and `git maintenance`.
- Commit-graph files, multi-pack indexes, and why large repos benefit from maintenance.
- Clone optimization: shallow and partial clones; sparse-checkout for large monorepos.
- Common performance problems: oversized binaries, massive untracked trees, generated files, and expensive status operations.
- Troubleshooting file-mode changes, case-only renames, line endings, encodings, and merge drivers.
- Recovering from interrupted operations; finding rebase/merge state and safely aborting it.
- Differences in commands and features across installed Git versions.
- When to escalate from familiar porcelain commands to plumbing commands or backup-based recovery.

**Practice:** Create a repository with substantial generated output. Compare behavior before and after correcting `.gitignore` and experiment with maintenance only in a disposable clone.

---

## Stage 18 — Git practices for frontend development

### What to be particularly good at

- Managing `.gitignore` for **JavaScript, TypeScript, React, Next.js, Vite, WordPress, and Shopify theme** projects.
- Committing dependency lockfiles appropriately (`package-lock.json`, `pnpm-lock.yaml`, or `yarn.lock`) and resolving lockfile conflicts by validating/re-generating them with the chosen package manager.
- Separating source from build artifacts and documenting when distribution files intentionally belong in the repository.
- Handling `.env.example` vs. local `.env` credentials and other sensitive configuration.
- Reviewing changes in HTML, CSS/SCSS, JavaScript, JSON, and generated/minified assets without drowning in noise.
- Choosing sensible workflows for **themes, plugins, custom UI components, client projects, and reusable libraries**.
- Working across several feature branches for code reviews, urgent fixes, and client requests using `git worktree`.
- Using pull requests with linters, formatters, tests, build checks, and accessibility/performance validation when relevant.
- Managing releases and hotfixes for packages and deployed sites; tagging deployable versions.
- Working with monorepos containing multiple packages or apps.
- Avoiding vendor code, uploads, caches, build directories, and secrets in repositories unless a project explicitly needs them tracked.

**Practice:** Build a small TypeScript component library with branches, focused commits, a GitHub-style pull request workflow, automated tests, and version tags. Simulate a production hotfix while another feature is in progress.

---

## Progressive hands-on projects

1. **Fundamentals lab:** Create a repository from scratch, write a `.gitignore`, stage partial changes, make readable commits, and inspect the graph.
2. **Collaboration lab:** Use two clones as two developers. Push conflicting edits, fetch, integrate updates, resolve conflicts, and submit a small reviewable change.
3. **History surgery lab:** Create messy commits, squash/reword/split them using rebase, cherry-pick a fix, and recover a lost branch through reflog.
4. **Regression lab:** Introduce a bug, discover it with `git bisect run`, identify the relevant source lines, and revert the faulty commit safely.
5. **Production-like frontend lab (capstone):** Set up a TypeScript/JavaScript application or component library with protected `main`, feature branches, CI checks, release tags, a documented workflow, a hotfix branch, and a clean release process.

### Capstone acceptance criteria

- The commit graph is understandable and the branch strategy is documented.
- Each pull request/change set is narrowly scoped and can be reviewed independently.
- A conflict is resolved correctly, with the application/tests validated afterward.
- A bad published commit can be reverted without rewriting `main`.
- A recently lost local commit can be recovered with reflog.
- The repository excludes secrets, dependency install directories, and accidental generated files.
- An automated pipeline validates important project checks.
- Releases use meaningful, stable tags and include an intelligible change summary.

---

## Suggested 10-week study plan

This is a **flexible progression**, not a fixed deadline. Spend less time on topics you can already demonstrate and more on exercises that expose gaps.

| Week | Main focus | Deliverable |
| --- | --- | --- |
| 1 | Fundamentals, Git mental model, config, staging, diffs | Explain the index and make partial commits reliably |
| 2 | Branches, merges, remotes, tracking | Resolve a two-clone integration scenario |
| 3 | Revision selection, logs, blame, diff ranges | Investigate and explain a change's history |
| 4 | Conflict resolution and rebasing | Resolve several conflict types; clean up commit history |
| 5 | Undo/recovery, stash, reflog, safe push | Recover an accidentally lost branch and undo published changes safely |
| 6 | Team workflows, PRs, protections, release tags | Define a professional repository contribution and release process |
| 7 | Worktrees, submodules, sparse checkout, LFS concepts | Parallel hotfix/feature worktree exercise |
| 8 | Bisect, hooks, CI, security | Automated regression search and CI checks |
| 9 | Git internals, plumbing, refs, packfiles | Trace objects and references in a tiny repository |
| 10 | Frontend capstone and troubleshooting | Complete a realistic feature → review → release → hotfix cycle |

---

## Priority checklist for an intermediate developer

Use this as the shortest route to skills that matter on real projects.

### Must be able to do confidently

- [ ] Explain the **working tree**, **index**, **commit**, **branch**, and **HEAD**.
- [ ] Stage individual hunks and inspect exactly what will be committed.
- [ ] Choose between fetch, pull, merge, rebase, and push appropriately.
- [ ] Resolve merge/rebase conflicts and know when to abort.
- [ ] Use interactive rebase to clean up **your own** feature-branch history.
- [ ] Know when to use restore, reset, revert, and reflog.
- [ ] Diagnose a non-fast-forward push rejection.
- [ ] Use `--force-with-lease` carefully, never casually rewrite shared work.
- [ ] Read commit graphs and understand branch divergence.
- [ ] Work effectively with pull requests and branch protection rules.
- [ ] Debug a regression using `git bisect` and commit/file history.
- [ ] Keep secrets and inappropriate build artifacts out of version control.

### Advanced / expert milestones

- [ ] Explain blobs, trees, commits, refs, packfiles, and the index from first principles.
- [ ] Work comfortably with `git worktree`, complex revision expressions, and `git range-diff`.
- [ ] Understand refspecs, cherry-pick, `rebase --onto`, and merge ancestry.
- [ ] Manage release tags, hotfix/backport workflows, and CI integration.
- [ ] Recognize when submodules, sparse checkout, shallow/partial clones, or LFS are appropriate.
- [ ] Recover from an accidentally moved branch tip and know when recovery is not guaranteed.
- [ ] Establish a maintainable Git workflow for a frontend team or client project.

---

## Final guidance

Git mastery is mainly about **mental models, safety, and repeatable problem-solving**. At the intermediate stage, prioritize **rebase, conflict resolution, reflog, reset vs. revert, history investigation, and team workflows** before spending significant time memorizing obscure plumbing commands. After those become instinctive, explore internals and advanced repository management to understand Git deeply enough to diagnose unexpected behavior.

> **Rule to remember:** Before a command that changes history or discards data, ask: *What will happen to my working tree, index, current branch, other people's history, and recovery options?*
