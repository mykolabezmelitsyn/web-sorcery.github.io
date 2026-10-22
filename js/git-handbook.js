/* Source: git-mastery-roadmap.md. Labs are text only; no commands execute here. */
(() => {
  const book = {
    stages: [
      {
        number: 1,
        name: "Git fundamentals and mental models",
        topics: [
          "Git as a **distributed version control system** and a snapshot-based history model.",
          "The difference between **Git** and hosting platforms such as **GitHub**, GitLab, and Bitbucket.",
          "The four essential areas: **working tree**, **staging area (index)**, **local repository**, and **remote repository**.",
          "The three broad file states: **modified**, **staged**, and **committed**; plus **untracked** and **ignored** files.",
          "Commits as nodes in a **directed acyclic graph (DAG)** with parent links.",
          "What **HEAD**, branch names, tags, and remote-tracking references represent.",
          "The difference between a **branch** (movable reference) and a **commit** (immutable object).",
          "Why a Git commit records a snapshot, not merely a list of changed lines.",
          "The meanings of **checkout/switch**, **detached HEAD**, and **clean vs. dirty working tree**.",
          "What `origin`, `main`, and `HEAD` mean—and why none is magical or mandatory.",
        ],
        commands: [
          "git --version",
          "git help <command>",
          "git init",
          "git clone <url>",
          "git status",
          "git status -sb",
          "git log --oneline --graph --decorate --all",
          "git show HEAD",
        ],
        practice:
          "Draw the working tree → index → commit flow, create a repository with three commits, and identify where `HEAD` and the branch reference point after each commit.",
        lessons: [
          {
            name: "Working tree → index → commit → remote",
            explanation:
              "Git is a distributed version-control system: a normal clone contains a local object database and references, not merely a checkout of server files. GitHub, GitLab, and Bitbucket host repositories and add collaboration policy. They are not Git itself. A commit stores a snapshot tree, metadata, and parent links; those links form a directed acyclic graph. Diffs are comparisons between snapshots.\n\nThe working tree is the editable files. The index is the proposed next snapshot. A local commit records that index. A push asks another repository to update references and transfers required objects. Modified, staged, and committed describe comparisons between these areas; untracked/ignored files are separate. The lab below makes three snapshots without touching any existing project.",
            changes:
              "Creates a new local repository, working files, index entries, commits, and a main branch. No remote is contacted.",
            recovery:
              "Keep the printed scratch directory to inspect it. Every command here stays inside that newly created repository.",
            requires:
              "Complete disposable lab; POSIX-style shell plus mktemp and Git 2.28+; run independently",
            risk: "Local changes",
            files: [
              {
                name: "first-repository.sh",
                code: 'set -eu\ngit_lab=$(mktemp -d)\ncd "$git_lab"\ngit init -b main\ngit config user.name "Study User"\ngit config user.email "study@example.test"\ngit config commit.gpgsign false\nprintf \'one\\n\' > notes.txt\ngit add -- notes.txt\ngit commit -m "Record first note"\nprintf \'two\\n\' >> notes.txt\ngit add -- notes.txt\ngit commit -m "Add second note"\nprintf \'three\\n\' >> notes.txt\ngit add -- notes.txt\ngit commit -m "Add third note"\ngit status -sb\ngit log --oneline --graph --decorate --all\nprintf \'Scratch repository: %s\\n\' "$git_lab"',
                language: "shell",
                test: "lab",
              },
            ],
            source: "https://git-scm.com/docs/gitcore-tutorial",
            note: "",
          },
          {
            name: "HEAD, branches, tags, and detached work",
            explanation:
              "HEAD normally names the current branch through a symbolic reference. The branch names a commit and moves when you commit. A commit object is immutable; changing its tree, metadata, or parents creates a different ID. Tags normally identify stable release points; remote-tracking references such as origin/main are your last fetched observations, not live views of the server.\n\norigin is a conventional remote name, main is a branch name, and neither is mandatory. A detached HEAD points directly to a commit. Committing there is allowed, but create a branch before leaving if you want an obvious durable name for the work. A clean status means no relevant differences are reported, not that ignored files do not exist.",
            changes:
              "The inspection commands only read objects/references. switch --detach changes HEAD, the index, and checked-out tracked files. switch -c creates a branch.",
            recovery:
              "Before leaving detached commits, create a branch at the current HEAD. Reflog may help after an accidental departure, subject to retention.",
            requires:
              "First-repository lab with its three commits; switch requires Git 2.23+",
            risk: "Local changes",
            files: [
              {
                name: "commands.sh",
                code: "# In the first-repository lab, starting clean:\ngit symbolic-ref HEAD\ngit rev-parse HEAD\ngit show --stat HEAD\ngit switch --detach HEAD~1\ngit status -sb\ngit switch -c study/detached-work\ngit switch main",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-symbolic-ref",
            note: "",
          },
        ],
      },
      {
        number: 2,
        name: "Configuration and repository hygiene",
        topics: [
          "System, global, and local Git configuration; configuration precedence.",
          "Setting commit identity (`user.name`, `user.email`) and checking where a setting came from.",
          "Default branch names, default editor, aliases, and command-line help.",
          "`.gitignore`: patterns, negation rules, directory rules, and why it does **not** untrack already tracked files.",
          "`.git/info/exclude` and global ignore patterns.",
          "`.gitattributes`: text/binary classification, end-of-line rules, diff/merge behavior, and custom attributes.",
          "Line-ending differences among **LF**, **CRLF**, and platform settings; `core.autocrlf` vs. repository-level attributes.",
          "File modes and executable bits; symlink behavior; case sensitivity across operating systems.",
          "Proper repository contents: source code, configuration templates, dependency lockfiles, documentation, and appropriate assets.",
          "Files usually excluded: `node_modules/`, local credentials, `.env` secrets, temporary logs, caches, and most generated output (subject to deployment needs).",
        ],
        commands: [
          "git config --list --show-origin",
          'git config --global user.name "Your Name"',
          'git config --global user.email "you@example.com"',
          "git config --global init.defaultBranch main",
          "git check-ignore -v path/to/file",
          "git rm --cached path/to/tracked-file",
        ],
        practice:
          "Prepare a repository for a JavaScript/TypeScript project. Create appropriate `.gitignore` and `.gitattributes` files, confirm ignored paths, and simulate a line-ending issue.",
        lessons: [
          {
            name: "Configuration has scopes and provenance",
            explanation:
              "System, global, and repository-local configuration contribute settings with precedence; command-line -c values can override a particular invocation. Worktree-specific configuration and environment variables can also matter. Inspect origin/scope before assuming which editor, identity, credential helper, or pull policy is active. Commit identity is metadata, not authentication to a server.\n\nSet identity locally in disposable exercises. Global identity/editor/default-branch settings affect future work across repositories and should be chosen deliberately. Aliases can shorten inspection commands, but shell aliases can execute arbitrary code. Learn git help and the installed version before copying flags from a tutorial.",
            changes:
              "The first commands inspect configuration. --local writes only this repository’s config; --global in the roadmap reference would write your user profile.",
            recovery:
              "Inspect --show-origin to locate a mistaken value, then edit/unset it in that same scope. Changing config does not rewrite existing commit identities.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Configuration",
            files: [
              {
                name: "commands.sh",
                code: 'git --version\ngit config --list --show-origin --show-scope\ngit config --local user.name "Study User"\ngit config --local user.email "study@example.test"\ngit config --local alias.graph "log --oneline --graph --decorate --all"\ngit graph\n# Inspect help for a command: git help commit\n# Git 2.46+ also provides newer config get/set/list forms; these examples\n# use the older, widely supported forms intentionally.',
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-config",
            note: "",
          },
          {
            name: "Ignore rules are not history deletion",
            explanation:
              "gitignore patterns control untracked-path discovery; they do not stop tracking an existing file. Negation can re-include a path only when its parent is traversable. .git/info/exclude is repository-local without being committed; a global excludes file can cover personal editor artifacts. Keep shared build/dependency rules in the project’s .gitignore.\n\nAttributes describe content handling: text normalization, binary classification, diff/merge drivers, and other metadata. Prefer an explicit team policy for LF/CRLF instead of relying solely on each user’s core.autocrlf. Lockfiles normally belong with source; deployment requirements may justify selected distribution files. Credentials and local .env data do not belong in history.",
            changes:
              "These files define future ignore/attribute behavior. rm --cached stages removal from the index while retaining the working copy; prior commits still contain it.",
            recovery:
              "Inspect staged deletion before committing. Re-add a mistakenly untracked file if appropriate. A real leaked secret needs revocation/rotation, not just an ignore rule.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Index and policy",
            files: [
              {
                name: ".gitignore",
                code: "node_modules/\n.env*\n!.env.example\n*.log\n.cache/\ndist/*\n!dist/README.md",
                language: "text",
                test: "reference",
              },
              {
                name: ".gitattributes",
                code: "* text=auto eol=lf\n*.bat text eol=crlf\n*.png binary\n*.jpg binary",
                language: "text",
                test: "reference",
              },
              {
                name: "inspect-hygiene.sh",
                code: "git check-ignore -v -- .env.local\ngit check-attr text eol -- src/app.js\n# Only if this local file is already tracked and should be untracked:\n# git rm --cached -- .env.local\n# git add -- .gitignore .gitattributes .env.example\n# git diff --staged",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/gitignore",
            note: "",
          },
          {
            name: "Cross-platform metadata is part of the review",
            explanation:
              "Git records executable mode for ordinary files and records symlinks as link content, subject to filesystem support and checkout configuration. Windows, macOS, and Linux may differ in case sensitivity, symlink capability, permissions, and line endings. A case-only rename can need an intermediate name on a case-insensitive filesystem.\n\nUse a real path-specific diagnosis instead of disabling checks globally. Inspect attributes and index modes to distinguish a real content change from metadata noise. Renormalizing a tracked tree can stage many files, so coordinate it as a focused change and verify the staged result rather than mixing it into a feature.",
            changes:
              "Inspection is read-only. update-index --chmod changes the staged executable bit; mv stages path changes. Renormalization changes index content.",
            recovery:
              "Use restore --staged for an accidental staged-only change, while retaining wanted working files. Keep normalization/case fixes in their own reviewable commit.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Index and metadata",
            files: [
              {
                name: "commands.sh",
                code: "git ls-files --stage\ngit config --show-origin --get core.autocrlf || :\ngit diff --summary\n# Intentional executable script:\n# git update-index --chmod=+x scripts/check.sh\n# Case-only rename, after verifying these paths:\n# git mv header.js temporary-header.js\n# git mv temporary-header.js Header.js\n# Reviewed normalization after attributes change:\n# git add --renormalize .",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/gitattributes",
            note: "",
          },
          {
            name: "Local excludes, shared attributes, and portable files",
            explanation:
              "Use .gitignore for shared untracked-file rules, .git/info/exclude for this clone’s private exclusions, and core.excludesFile for deliberately configured user-wide patterns. Negation cannot rescue a file inside a completely excluded parent directory: leave the parent traversable. Attributes are versioned rules for text conversion, binary handling, and selected diff/merge drivers; an attribute naming a custom driver does not install that driver.\n\nGit records executable versus non-executable file mode and symbolic-link targets, not every filesystem permission. Windows symlink privileges and filesystem case behavior vary. Test portability with teammates rather than masking a genuine rename or line-ending issue through local settings.",
            changes:
              "Shared ignore/attribute edits become versioned only after staging/committing; private excludes remain local.",
            recovery:
              "Review check-ignore/check-attr output. Save edits before an intentional renormalization commit.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Local changes",
            files: [
              {
                name: "commands.sh",
                code: "git rev-parse --git-path info/exclude\ngit config --show-origin --get core.excludesFile || :\ngit check-attr -a -- src/app.js\ngit ls-files --stage",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/gitattributes",
            note: "",
          },
        ],
      },
      {
        number: 3,
        name: "Daily Git operations, precisely",
        topics: [
          "`git add` as updating the **index**, not immediately making a commit.",
          "Staging an entire file versus specific **hunks** or selected lines.",
          "Differences among `git diff`, `git diff --staged`, and `git diff HEAD`.",
          "Creating small, focused, comprehensible commits with useful messages.",
          "Renaming, moving, deleting, and restoring files; Git's rename detection.",
          "Amending a **local, unpublished** commit.",
          "File history, inspection of individual commits, and viewing previous file versions.",
          "Pathspecs, quoting paths, and `--` to disambiguate revision names from file paths.",
          "Understanding the effect of `git commit -a` (tracks modifications/removals, but does not add untracked files).",
        ],
        commands: [
          "git add file.js",
          "git add -p",
          "git diff",
          "git diff --staged",
          "git diff HEAD",
          'git commit -m "Add form validation"',
          "git commit --amend",
          "git restore file.js",
          "git restore --staged file.js",
          "git mv old.js new.js",
          "git rm obsolete.js",
          "git log -- path/to/file",
        ],
        practice:
          "Make three unrelated changes in one file, stage only one hunk, inspect the staged patch, and commit that change without including the others.",
        lessons: [
          {
            name: "The index can intentionally differ from the working file",
            explanation:
              "git add copies selected content into the index at that moment. Editing the file again does not update the staged version. git diff compares working tree with index, --staged compares index with HEAD, and diff HEAD compares current working content with HEAD. This explains how one file can be both staged and modified.\n\nUse add -p for hunks; split a hunk or edit its patch when changes need finer separation. Review exactly the staged result before committing. Small focused commits make review and later regression isolation easier. commit -a stages tracked modifications/removals, but does not add untracked files.",
            changes:
              "add changes the index; commit creates an object and moves the current branch. diff commands only inspect.",
            recovery:
              "Unstage with restore --staged to restore the index from HEAD while keeping working edits. Amend only an unpublished commit when replacing the latest snapshot.",
            requires:
              "First-repository lab on main; this intentionally leaves notes.txt modified",
            risk: "Local changes",
            files: [
              {
                name: "commands.sh",
                code: "# In the first-repository lab:\nprintf 'staged addition\\n' >> notes.txt\ngit add -- notes.txt\nprintf 'unstaged addition\\n' >> notes.txt\ngit diff -- notes.txt\ngit diff --staged -- notes.txt\ngit diff HEAD -- notes.txt\ngit restore --staged -- notes.txt\n# For partial staging, run interactively: git add -p -- notes.txt",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-add",
            note: "",
          },
          {
            name: "Paths, rename detection, and local amendments",
            explanation:
              "Quote paths containing spaces or shell metacharacters. -- ends revision/options selection and makes the following arguments paths, which avoids ambiguity with a branch named like a file. A pathspec can match several files; quote wildcard patterns when Git, rather than the shell, should interpret them.\n\nGit records snapshots, then detects likely renames during comparison; mv is convenient staging, not a permanent rename identity record. rm stages removal of tracked content. show REV:path reads an older version, and log --follow can help with a single renamed file. amend replaces the latest commit with a new object; it does not edit the old object in place.",
            changes:
              "mv/rm affect working paths and index; amend creates a new commit ID and moves the current branch. show/log are read-only.",
            recovery:
              "Review staged changes first. A saved branch or reflog can identify the old commit after an accidental local amend; coordinate before rewriting anything already shared.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Local changes",
            files: [
              {
                name: "commands.sh",
                code: 'git log --follow -- notes.txt\ngit show HEAD~1:notes.txt\ngit diff -- \':(glob)**/*.js\'\n# Alternatives to use only when their paths exist:\n# git mv -- "old file.js" "new file.js"\n# git rm -- obsolete.js\n# git commit --amend\n# git restore -- notes.txt  # Discards that file\'s unstaged tracked edits.',
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-commit",
            note: "",
          },
        ],
      },
      {
        number: 4,
        name: "Branching, merging, and basic collaboration",
        topics: [
          "Creating, switching, listing, renaming, and deleting branches.",
          "Local branches vs. **remote-tracking** branches; branch upstream/tracking configuration.",
          "Fast-forward merge vs. true **three-way merge** (merge commit).",
          "When Git can merge automatically and when a conflict occurs.",
          "Branch divergence, ancestry, merge bases, and reachability.",
          "Feature branches, short-lived branches, and why small pull requests are easier to review.",
          "`git switch` / `git restore` vs. the older multipurpose `git checkout` command.",
          "Safe deletion of merged branches and reasons to retain an unmerged branch.",
        ],
        commands: [
          "git branch -a",
          "git switch -c feature/header",
          "git switch main",
          "git merge feature/header",
          "git merge --no-ff feature/header",
          "git branch -d feature/header",
          "git branch -D feature/header",
          "git merge-base main feature/header",
        ],
        practice:
          "Create two branches from a common commit, make changes on each, perform both a fast-forward merge and a non-fast-forward merge, and explain the resulting graph.",
        lessons: [
          {
            name: "Fast-forward and merge commits tell different stories",
            explanation:
              "A branch is a movable name, not a copied directory. Creating/switching a branch changes your current reference and checkout; the object graph is shared. A fast-forward is possible when the current tip is an ancestor of the other tip, so Git can advance the branch without a new merge commit.\n\nA divergent three-way merge compares a common base with both tips. A successful merge commit normally has two parents. --no-ff requests a merge commit even when a fast-forward is possible. Use merge-base to inspect ancestry and agree on a history convention with your team. switch and restore split several jobs previously handled by checkout.",
            changes:
              "switch changes HEAD and the checked-out tree/index. Merge may move a ref directly or create a commit; it may leave an unresolved index.",
            recovery:
              "Start clean and preserve important work first. During an unfinished merge, inspect status and use merge --abort when appropriate; it is not guaranteed to reconstruct arbitrary pre-existing dirty work.",
            requires:
              "First-repository lab, clean main; feature/header must not already exist",
            risk: "Local changes",
            files: [
              {
                name: "commands.sh",
                code: "# Fresh clean study branch from the first-repository lab:\ngit switch main\ngit switch -c feature/header\nprintf 'header\\n' > header.txt\ngit add -- header.txt\ngit commit -m \"Add header\"\ngit switch main\ngit merge --ff-only feature/header\ngit log --oneline --graph --decorate --all\n# For a separate branch where a merge commit is the intended policy:\n# git merge --no-ff other-feature",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-merge",
            note: "",
          },
          {
            name: "Tracking configuration and branch deletion",
            explanation:
              "A local branch can have an upstream configured, often origin/name. origin/name is a local remote-tracking ref, not another working branch. branch -vv shows the relationship and ahead/behind counts relative to your last fetched observations. A fork’s upstream remote and a branch’s upstream setting are related conventions, not the same object.\n\nRename a branch when its purpose changes. Delete a merged branch with -d after checking the integration result. -D removes the safety check and can discard the convenient name for unmerged commits. Do not force-delete a branch merely because its name looks old; preserve a recovery reference if its work still matters.",
            changes:
              "Branch operations change local references/configuration. They do not delete the corresponding server branch unless a separate push requests it.",
            recovery:
              "Before deleting an uncertain tip, create another branch/tag at it. Reflog/object retention may permit later recovery but is not a backup guarantee.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Local references",
            files: [
              {
                name: "commands.sh",
                code: "git branch -a\ngit branch -vv\ngit merge-base main feature/header\n# After the stage's successful merge, while checked out on main:\ngit branch -d feature/header\n# To retain an unmerged tip before any forced deletion:\n# git branch archive/old-feature old-feature\n# git branch -D old-feature",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-branch",
            note: "",
          },
          {
            name: "Tracking is a relationship, not a second copy of a branch",
            explanation:
              "A local branch and origin/main are different refs. Configured upstream metadata lets status and branch -vv report ahead/behind relative to the last fetched observation. Fetch before interpreting that count as current. Creating a local branch from a remote-tracking ref with --track sets that relationship; branch --set-upstream-to changes it without publishing anything.\n\nRename a branch when its purpose changes; delete a finished branch with -d after reviewing integration. Forced deletion removes its convenient name even if commits are not merged. Multiple remotes commonly separate an origin fork from the upstream project; inspect push destinations before sending work.",
            changes:
              "Creating/renaming/deleting branches changes local refs/config; no remote update happens automatically.",
            recovery:
              "Keep a backup ref for unmerged work. Recreate an accidentally removed name from a known commit or retained reflog.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Local changes",
            files: [
              {
                name: "commands.sh",
                code: "git branch -vv\ngit remote -v\n# After fetching the correct remote branch:\n# git switch --track -c feature/review origin/feature/review\n# git branch --set-upstream-to=origin/main main\n# Rename current local branch: git branch -m feature/better-name",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-branch",
            note: "",
          },
        ],
      },
      {
        number: 5,
        name: "Remotes, syncing, and authentication",
        topics: [
          "Remote URLs, multiple remotes, and the usual meaning of `origin` and `upstream` in fork workflows.",
          "The precise differences between **fetch**, **pull**, and **push**.",
          "`git pull` as fetch followed by an integration step (merge or rebase, depending on configuration/options).",
          "Tracking branches, setting an upstream, and viewing ahead/behind status.",
          "Non-fast-forward push rejection and what it signals.",
          "Safe force pushes with `--force-with-lease`; why `--force` is especially dangerous on shared branches.",
          "Fetching and pruning obsolete remote-tracking references.",
          "HTTPS authentication, credential managers, SSH keys, access tokens, and credential scopes.",
          "Fetch/push **refspecs** and the difference between local branch references and remote references.",
          "Fork-based contribution and keeping a fork synchronized with its upstream repository.",
        ],
        commands: [
          "git remote -v",
          "git remote add upstream <url>",
          "git fetch origin",
          "git fetch --prune origin",
          "git pull --ff-only",
          "git pull --rebase",
          "git push -u origin feature/header",
          "git push --force-with-lease",
          "git branch -vv",
          "git ls-remote origin",
        ],
        practice:
          "Simulate a team using two clones of the same local bare repository. Create divergent commits, encounter a non-fast-forward rejection, and resolve it without losing either person's work.",
        lessons: [
          {
            name: "Fetch observes; integration changes your branch; push proposes a remote update",
            explanation:
              "fetch transfers objects and normally updates remote-tracking refs without merging into your current branch. pull fetches and then integrates according to an explicit option or configuration. --ff-only refuses to invent an integration commit when histories diverge; --rebase replays local commits. push asks the remote to accept a reference update.\n\nA non-fast-forward rejection often means someone advanced the server branch or the histories differ. Fetch, inspect both sides, then merge or rebase under the team policy. A fork can have origin for your fork and upstream for the source project. Authentication uses HTTPS credentials/helpers or SSH keys; identities in commit metadata do not grant repository access.",
            changes:
              "Fetch updates local observations/objects; merge/rebase updates your local branch and checkout. Push can change remote references.",
            recovery:
              "A rejection is an opportunity to inspect, not a reason to add --force. Preserve your current tip, integrate the missing work, validate, then push normally.",
            requires:
              "A clone with origin/main; see the two-clone collaboration project for a complete local-only setup",
            risk: "Local and remote refs",
            files: [
              {
                name: "commands.sh",
                code: "git remote -v\ngit fetch --prune origin\ngit branch -vv\ngit log --left-right --oneline HEAD...origin/main\n# From clean main, when only a fast-forward is intended:\n# git pull --ff-only\n# Publish your own new feature branch explicitly:\n# git push -u origin HEAD:refs/heads/feature/header",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-fetch",
            note: "",
          },
          {
            name: "A lease protects an expected remote tip, not all collaboration",
            explanation:
              "A force push can replace published ancestry. Use it only for an owned feature branch with an agreed rewrite policy, never casually on shared main. The default --force-with-lease compares against a remote-tracking observation; a background fetch can update that observation and weaken your intended protection.\n\nAn explicit expected object ID expresses the exact server tip you reviewed. Save it before rewriting, retain the old local tip, inspect the new range, and ask the server to update only if its current value still matches. A lease does not prove that every collaborator has finished depending on those commits. Protected-branch rules may correctly refuse the update anyway.",
            changes:
              "Rebase rewrites local commit IDs. The final push may replace the named remote branch if the explicit lease matches.",
            recovery:
              "Keep the saved local branch and expected ID. If the lease fails, fetch and inspect the new server work; do not refresh the expectation and retry blindly.",
            requires:
              "Your clean feature/header branch with a corresponding origin/feature/header observation; final remote write is intentionally commented",
            risk: "Published history",
            files: [
              {
                name: "commands.sh",
                code: '# Only your own published feature branch, after discussing rewrite policy:\ngit fetch origin\nreviewed_tip=$(git rev-parse refs/remotes/origin/feature/header)\ngit branch backup/header-before-rebase\n# Rebase/validate locally here, under the Stage 8 workflow.\n# Then explicitly lease the exact remote ref you inspected:\n# git push --force-with-lease="refs/heads/feature/header:$reviewed_tip" \\\n#   origin HEAD:refs/heads/feature/header',
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-push",
            note: "",
          },
          {
            name: "Refspecs and credentials are separate layers",
            explanation:
              "A refspec describes a source reference and destination reference, often src:dst. Fetch and push use related syntax in opposite transfer directions. + permits a non-fast-forward ref update in a refspec; it is not harmless punctuation. ls-remote inspects advertised remote references without making a local tracking branch. Prune removes stale local remote-tracking refs, not someone else’s server branch.\n\nUse a supported credential manager and least-privilege, expiring tokens or appropriate SSH keys. Do not put a token in a URL committed to configuration examples. Review fetch/push URLs separately for multiple remotes, and verify the destination before any write.",
            changes:
              "Inspection commands read configuration or advertised refs; an explicit fetch updates only the selected local observation.",
            recovery:
              "Correct a mistaken URL with remote set-url after inspection. Revoke a leaked credential promptly; deleting its local URL or ignoring a file is not revocation.",
            requires:
              "Clone from the local collaboration lab or another remote you are authorized to read",
            risk: "Remote access",
            files: [
              {
                name: "commands.sh",
                code: "git remote get-url origin\ngit remote get-url --push origin\ngit config --get-all remote.origin.fetch\ngit ls-remote --heads origin\n# Explicit one-branch fetch; no merge into the current branch:\ngit fetch origin refs/heads/main:refs/remotes/origin/main",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-fetch",
            note: "",
          },
        ],
      },
      {
        number: 6,
        name: "Reading history and finding changes",
        topics: [
          "Configuring useful commit graphs and concise/custom `git log` formats.",
          "Filtering history by author, date, file, path, message, and revision range.",
          "Revision syntax: `HEAD~2`, `HEAD^`, `HEAD^2`, `main~3`, `branch@{upstream}`.",
          "The difference between revision sets like `A..B` and symmetric differences like `A...B` in `git log`.",
          "How `git diff A..B` compares endpoints, while `git diff A...B` compares the merge base with `B`.",
          "`git show`, `git blame`, `git shortlog`, and `git grep`.",
          "Search for commits that add/remove a string (`-S`) or modify lines matching a regex (`-G`).",
          "Identify the commit containing a regression or a dependency change.",
          "Understand limitations of `blame` with bulk formatting, file moves, and refactors.",
        ],
        commands: [
          "git log --oneline --graph --decorate --all",
          'git log --author="Name" --since="2 weeks ago"',
          "git log -p -- src/app.js",
          'git log -S"fetchData" -- src/',
          'git log -G"useEffect\\(" -- src/',
          "git diff main...feature/header",
          "git show HEAD~2",
          "git blame -L 10,30 src/app.js",
          'git grep -n "TODO"',
        ],
        practice:
          "Deliberately introduce and later modify a buggy line. Locate its introducing commit using multiple methods, and explain how a triple-dot diff for a feature branch is computed.",
        lessons: [
          {
            name: "Revision expressions select commits or sets",
            explanation:
              "HEAD~2 follows first-parent ancestry twice; HEAD^ selects the first parent, and HEAD^2 selects a merge’s second parent. branch@{upstream} resolves a configured upstream. A..B in log means commits reachable from B but not A. A...B is the symmetric difference, often viewed with --left-right to separate sides.\n\nDiff uses these dots differently: diff A..B is an endpoint comparison equivalent to diff A B, while diff A...B compares merge-base(A,B) to B. Swapping endpoints therefore changes a triple-dot diff. Use graph views to test your ancestry assumptions before choosing a review or rebase range.",
            changes:
              "These commands inspect existing refs/objects and do not change files, index, or history.",
            recovery:
              "If a range is empty or surprising, check ref names, fetch freshness, parents, and merge-base rather than creating commits to force the expected display.",
            requires:
              "Repository with main and feature/header; HEAD~2 needs sufficient ancestry",
            risk: "Read only",
            files: [
              {
                name: "commands.sh",
                code: "git log --oneline --graph --decorate --all\ngit log --left-right --oneline main...feature/header\ngit log --oneline main..feature/header\ngit merge-base main feature/header\ngit diff main...feature/header\ngit show HEAD~2\n# Only at a merge commit: git show HEAD^2",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/gitrevisions",
            note: "",
          },
          {
            name: "Investigate the change, not merely its last editor",
            explanation:
              "Use author/date/message/path filters to narrow a question, then inspect actual patches. -S finds changes in the number of occurrences of a string; -G finds added/removed lines matching a regex. They answer different questions. show can display one commit or an older file; shortlog summarizes authors, and grep searches selected tracked content.\n\nblame attributes surviving lines, not intent or responsibility for a defect. Formatting and moves can obscure the relevant change. Follow the path’s history, inspect parent snapshots, and correlate with tests and release boundaries. Options that ignore whitespace or use an ignore-revs file can help with documented bulk-format commits.",
            changes:
              "Read-only history and content inspection. No branch or index update is required.",
            recovery:
              "Refine a query and verify results against patches. If a clone lacks history, obtain the needed objects before concluding that a change never happened.",
            requires: "First-repository lab with three notes commits",
            risk: "Read only",
            files: [
              {
                name: "commands.sh",
                code: "git log --format='%h %ad %s' --date=short --all\ngit log --author='Study User' --since='2 weeks ago'\ngit log -p -- notes.txt\ngit log -S'two' -- notes.txt\ngit log -G'two|three' -- notes.txt\ngit blame -- notes.txt\ngit shortlog -sn HEAD\ngit grep -n 'two' HEAD -- notes.txt",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-log",
            note: "",
          },
        ],
      },
      {
        number: 7,
        name: "Merge conflicts and conflict resolution",
        topics: [
          "Causes of content, delete/modify, rename, and other merge conflicts.",
          "Three-way merge inputs: **base**, **ours**, and **theirs**.",
          "Why the meanings of `ours`/`theirs` can be counterintuitive during a rebase.",
          "Conflict markers and resolving conflicts manually or through an IDE/merge tool.",
          "Inspecting unmerged index stages and verifying the final combined result.",
          "Completing, aborting, or retrying merge and rebase operations.",
          "`git rerere` (reuse recorded resolution) and when it helps.",
          "Preventing conflicts through focused commits, frequent synchronization, and coordination.",
        ],
        commands: [
          "git status",
          "git ls-files -u",
          "git mergetool",
          "git add resolved-file.js",
          "git merge --continue",
          "git merge --abort",
          "git rebase --continue",
          "git rebase --abort",
          "git rebase --skip",
          "git config --global rerere.enabled true",
        ],
        practice:
          "Cause conflicts in JavaScript source, a JSON configuration file, and a dependency lockfile. Resolve them, run validation/tests, and compare the final tree with the intended result.",
        lessons: [
          {
            name: "Resolve intent, then validate the combined result",
            explanation:
              "A conflict means Git could not choose a combined result automatically. It can involve competing lines, deletion versus editing, renames, or binary content. status names unresolved paths; the index can hold stage 1 (base), 2 (ours), and 3 (theirs). During a rebase, ours is the branch being rebased onto and theirs is the commit being replayed: do not equate these names with your personal work.\n\nRead both changes and their common base. Edit a coherent result, remove conflict markers, stage resolved paths, and run relevant tests before continuing. For package locks, reconcile the manifest first and regenerate using the team’s package manager/version. Accepting one whole side can silently discard necessary changes. mergetool is an optional configured interface, not a correctness check.",
            changes:
              "Resolution edits the working tree and index; continuing creates commits.",
            recovery:
              "Use merge --abort or rebase --abort for the operation actually in progress. Preserve unrelated edits beforehand. Skip during rebase drops the current commit’s change.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Local changes",
            files: [
              {
                name: "commands.sh",
                code: "git status\ngit ls-files -u\n# For an unresolved tracked text path:\n# git show :1:src/app.js\n# git show :2:src/app.js\n# git show :3:src/app.js\n# Edit, inspect, and test before staging:\n# git add -- src/app.js\n# git merge --continue\n# Or, during a rebase: git rebase --continue",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-merge",
            note: "",
          },
          {
            name: "Reuse resolutions deliberately with rerere",
            explanation:
              "rerere records how you resolved a conflict and can reuse that resolution when a similar conflict returns. This helps long-lived integration work, but a previously correct textual resolution may no longer express correct behavior. Enable it locally, inspect the reused diff, and test before completing the operation. Keep automatic staging disabled while learning so the reused result remains visible for review.",
            changes:
              "Writes repository configuration and records/reuses local resolutions.",
            recovery:
              "Inspect rerere diff/status; rerere forget can discard a recorded resolution for the current conflict. Abort the surrounding merge/rebase when necessary.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Local changes",
            files: [
              {
                name: "commands.sh",
                code: "git config --local rerere.enabled true\ngit config --local rerere.autoupdate false\ngit rerere status\ngit rerere diff",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-rerere",
            note: "",
          },
        ],
      },
      {
        number: 8,
        name: "Rebasing and rewriting history",
        topics: [
          "Merge vs. rebase: resulting history, trade-offs, and team conventions.",
          "Regular rebase onto a refreshed base branch and why rebased commits receive new IDs.",
          "Interactive rebase: **reword**, **edit**, **squash**, **fixup**, **drop**, **reorder**, and **split** commits.",
          "`git commit --fixup` and `git rebase --autosquash`.",
          "Cherry-picking selected commits and recognizing duplicate/empty changes.",
          "Rebasing an entire range with `--onto`.",
          "Inspecting changes between two iterations of a rebased patch series using `git range-diff`.",
          "Why rewriting a branch others depend on can disrupt collaborators.",
          "Updating your own published feature branch cautiously, using `--force-with-lease` when appropriate.",
        ],
        commands: [
          "git rebase main",
          "git rebase -i HEAD~4",
          "git commit --fixup <commit>",
          "git rebase -i --autosquash main",
          "git cherry-pick <commit>",
          "git rebase --onto new-base old-base topic",
          "git range-diff old-base..old-tip new-base..new-tip",
          "git rebase --abort",
        ],
        practice:
          "Create a messy feature branch with five commits, then produce a clean, logically organized history using interactive rebase. Compare it with an alternate merge-based workflow.",
        lessons: [
          {
            name: "Rewrite private history with an explicit boundary",
            explanation:
              "Rebase replays selected commits on a new base, usually creating new commit IDs. Interactive rebase lets you reword, edit, squash, fixup, reorder, or drop commits. Each change must still produce a coherent sequence. Save a branch first and choose the upstream boundary explicitly; root commits need --root rather than HEAD~N.\n\nAt an edit stop, splitting a non-root commit can use reset HEAD^ (mixed), then stage and commit independent pieces before rebase --continue. A fixup! commit plus --autosquash is useful for integrating review corrections. Compare the old and new series with range-diff and run tests. Rewriting shared history requires team agreement and careful publication.",
            changes:
              "Creates replacement commits and moves the current branch; the backup ref retains the original series.",
            recovery:
              "rebase --abort returns to the starting state during an active rebase. After completion, inspect the backup/reflog before choosing recovery.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Private history rewrite",
            files: [
              {
                name: "commands.sh",
                code: '# On a clean private feature branch with at least three commits:\nbase=$(git rev-parse HEAD~3)\ngit branch backup/before-rebase\ngit rebase -i "$base"\n# In the editor: pick, reword, edit, squash, fixup, or drop.\n# After a completed rewrite:\ngit range-diff "$base"..backup/before-rebase "$base"..HEAD',
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-rebase",
            note: "",
          },
          {
            name: "Transplant a range or backport one change",
            explanation:
              "rebase --onto NEW OLD TOPIC takes the commits selected from OLD..TOPIC and replays them onto NEW. Draw the graph first: a wrong boundary can duplicate or omit changes. --rebase-merges is an advanced way to reconstruct merge topology; ordinary rebase does not simply preserve merge commits.\n\nCherry-pick applies an existing commit’s change as a new commit on the current branch. -x records its source ID, useful for maintenance-branch backports. Resolve and test against that older branch’s APIs. A successful textual application is not proof of compatibility. Both operations support continue/abort; skip intentionally omits a change and should follow inspection.",
            changes:
              "Moves a topic branch via replacement commits, or adds a backport commit to the current branch.",
            recovery:
              "Save a backup ref first. Use the matching operation’s --abort while in progress, and retain source IDs for review.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "History editing",
            files: [
              {
                name: "commands.sh",
                code: "# Reference only: replace branch names after inspecting the graph.\n# git rebase --onto main old-base feature/topic\n# On a clean maintenance branch, replace COMMIT_ID:\n# git cherry-pick -x COMMIT_ID\ngit log --graph --oneline --all --decorate",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-cherry-pick",
            note: "",
          },
        ],
      },
      {
        number: 9,
        name: "Undoing mistakes and recovering work",
        topics: [
          "Choose the correct recovery tool for **unstaged changes**, **staged changes**, **local commits**, and **published commits**.",
          "`git restore`: restore working-tree content and/or staging-area content.",
          "`git reset`: move `HEAD` (and usually the current branch) and optionally reset index/working tree.",
          "Differences among **`--soft`**, **`--mixed`** (default), and **`--hard`**.",
          "`git revert`: create a new commit that reverses earlier changes while preserving shared history.",
          "Reverting a merge commit with `-m` and the importance of choosing the mainline parent.",
          "`git reflog`: locate recent reference movements and recover accidentally lost branch tips or commits.",
          "Stashing (including untracked files), inspecting stashes, applying vs. popping, and stash conflicts.",
          "`git clean` for removing untracked files; **always inspect with `-n` before actual deletion**.",
          "Limits of recovery: uncommitted/untracked data and expired/unreachable objects are not always recoverable.",
          "Why a force push or history rewrite cannot reliably remove a leaked secret from other clones; revoke/rotate secrets immediately.",
        ],
        commands: [
          "git restore --staged src/app.js",
          "git restore src/app.js",
          "git reset --soft HEAD~1",
          "git reset --mixed HEAD~1",
          "git reset --hard HEAD~1",
          "git revert <commit>",
          "git reflog",
          "git branch recovered <commit-id>",
          'git stash push -u -m "Work in progress"',
          "git stash list",
          "git stash pop",
          "git clean -nd",
          "git clean -fd",
        ],
        practice:
          "In a throwaway repository, undo a staged hunk, uncommit without losing files, recover a branch after a hard reset using reflog, and revert a bad commit that was already shared.",
        lessons: [
          {
            name: "Choose restore, reset, or revert by what must change",
            explanation:
              "restore -- path copies the index version into the working tree, discarding unstaged tracked edits. restore --staged -- path copies HEAD into the index while preserving working files. With --source you choose another snapshot explicitly. These are different destinations, not interchangeable undo buttons.\n\nCommit-form reset moves the current branch: --soft keeps index/files, default --mixed resets the index but keeps files, and --hard resets both and can remove obstructing untracked paths. Path-form reset changes index entries without moving HEAD. Revert instead adds a new inverse commit, usually appropriate for published history. Reverting a merge requires choosing the mainline parent (-m) and affects what later merges consider already integrated.",
            changes:
              "Depending on the command: working files, index, branch tip, or a new inverse commit.",
            recovery:
              "Preview status/diffs and save valuable uncommitted files first. Reflog may recover old commits; it cannot generally recover unstaged content discarded from files.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Potential data loss",
            files: [
              {
                name: "commands.sh",
                code: "git status -sb\ngit diff\ngit diff --cached\n# Separate alternatives, not a sequence:\n# git restore -- notes.txt\n# git restore --staged -- notes.txt\n# git reset --soft HEAD^     # private commit only\n# git reset --mixed HEAD^    # private commit only\n# git revert COMMIT_ID       # published change; inspect first",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-reset",
            note: "",
          },
          {
            name: "Recovery needs retained objects and deliberate previews",
            explanation:
              "Reflogs record local reference movements; they are not shared backups and expire. Find the old commit, inspect it, then create a branch before further cleanup. Stash stores a temporary snapshot: -u includes untracked files, not ignored files; -a also includes ignored files. apply retains the stash entry. pop removes it only after a successful application, and conflicts require manual resolution.\n\nclean deletes untracked files; -d includes directories and -x includes ignored files. Preview the same narrow path/options with -n before a deliberate deletion. Git cannot restore files it never recorded. For a leaked secret, revoke/rotate first; history cleanup is a separate coordinated operation.",
            changes:
              "Stash changes files/index and creates stash objects; clean deletes files; a recovery branch retains an old commit.",
            recovery:
              "Keep stash entries until verified. Back up untracked assets separately; do not run pruning/cleanup while investigating lost work.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Recovery and deletion",
            files: [
              {
                name: "commands.sh",
                code: "git reflog --date=iso\ngit stash list\ngit stash show --stat 'stash@{0}'\n# Optional, after reviewing what will be stored:\n# git stash push -u -m 'Pause frontend work'\n# git stash apply 'stash@{0}'\n# Preview only; deletion is intentionally not included:\ngit clean -nd -- build-cache/",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-reflog",
            note: "",
          },
        ],
      },
      {
        number: 10,
        name: "Professional team workflows",
        topics: [
          "**Trunk-based development**, short-lived feature branches, GitHub Flow, and Git Flow: benefits and trade-offs.",
          "Pull requests / merge requests, review etiquette, focused diffs, and responding to review comments.",
          "Merge commit vs. squash merge vs. rebase merge; impact on traceability and bisectability.",
          "Branch naming, commit-message conventions, and scope control.",
          "Protected branches, required checks, approval rules, linear-history requirements, and merge queues.",
          "Handling hotfixes, releases, backports, and maintenance branches.",
          "Managing parallel contributions, ownership, and avoiding work lost through force pushes.",
          "Repository permissions, `CODEOWNERS` (on supported hosts), and reviewing changes to sensitive files.",
          "Working with forks and upstream contributions in open-source projects.",
          "Choosing a history policy and documenting it in contribution guidelines.",
        ],
        commands: [],
        practice:
          "Collaborate with a second person (or simulate two users) through feature branches, reviews, a deliberately failed CI check, revision of the pull request, and a protected-main merge.",
        lessons: [
          {
            name: "Choose a workflow that supports review and release",
            explanation:
              "Trunk-based development favors small changes integrated frequently, often behind feature flags. GitHub Flow uses short-lived branches and reviewed pull requests. Git Flow adds development/release/hotfix branches and may fit scheduled releases, at the cost of more integration work. Fork workflows add an upstream remote and separate contributor permissions. Choose based on release constraints, not branch-count prestige.\n\nA merge commit retains branch topology; squash creates one combined commit; rebase-and-merge produces a linear series with rewritten IDs. Agree on commit size, messages, review scope, tests, and backport policy. Pull requests, required reviewers, protected branches, status checks, CODEOWNERS enforcement, and merge queues are hosting features: Git alone does not activate them.",
            changes:
              "Branch/merge strategy shapes history; hosting settings control review and publication policy.",
            recovery:
              "Prefer a reviewed revert for a bad published integration. Keep hotfixes/backports traceable and bring fixes back into active development.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Local changes",
            files: [
              {
                name: "CONTRIBUTING.md",
                code: "# Contribution workflow\n\n1. Start a small topic branch from current main.\n2. Explain the problem, approach, and validation in the pull request.\n3. Run the same checks as CI; include regression coverage for fixes.\n4. Obtain required review and passing checks before merging.\n5. Backport fixes with source commit IDs and validate each release branch.\n6. Never rewrite shared main; revert a faulty published change.",
                language: "markdown",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/gitworkflows",
            note: "",
          },
        ],
      },
      {
        number: 11,
        name: "Tags, releases, and versioning",
        topics: [
          "Lightweight vs. annotated tags; moving branch references vs. usually stable release tags.",
          "Signed tags or commits where a team needs verifiable provenance.",
          "Semantic Versioning and conventional commits as **ecosystem conventions**, not Git requirements.",
          "Release branches, release notes, changelogs, and hotfix workflows.",
          "`git describe`, `git archive`, and comparing releases.",
          "Why changing or replacing a published release tag is risky.",
          "How Git releases interact with CI/CD deployment pipelines.",
        ],
        commands: [
          "git tag",
          'git tag -a v1.0.0 -m "Release 1.0.0"',
          "git show v1.0.0",
          "git push origin v1.0.0",
          "git diff v1.0.0..v1.1.0",
          "git describe --tags",
          "git archive --format=zip --output=release.zip v1.0.0",
        ],
        practice:
          "Tag a tested version of a frontend library, prepare release notes from commit history, and create a maintenance hotfix without changing the original release.",
        lessons: [
          {
            name: "Make release identity stable and verifiable",
            explanation:
              "Lightweight tags are direct references; annotated tags create an object containing tagger/message metadata and can be signed. Prefer annotated release tags and explicit publication of a specific tag. A signature requires configured signing tools/keys and verification against a trusted identity; it does not certify that the software is safe. Do not silently move published release tags.\n\nSemVer describes compatibility conventions (major/minor/patch), and Conventional Commits can feed release automation; neither is enforced by Git. describe provides a reachable-tag-based label, not an automatic product version. archive exports tracked content from a tree; ignored/untracked build output and submodule contents are not magically packaged.",
            changes:
              "Creates a local annotated tag; pushing it would publish a remote ref. archive writes a separate export file.",
            recovery:
              "Inspect tag targets before publication. Publish a corrected release with a new version rather than moving an established tag.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Local changes",
            files: [
              {
                name: "commands.sh",
                code: "# Clean, validated release commit:\ngit tag -a v0.1.0 -m 'Release 0.1.0'\ngit show v0.1.0\ngit describe --tags --always\nrelease_archive=$(mktemp)\ngit archive --format=tar --output=\"$release_archive\" v0.1.0\nprintf 'Tracked-source archive: %s\\n' \"$release_archive\"\n# Publish only when authorized: git push origin refs/tags/v0.1.0\n# Signed alternative, with configured key: git tag -s v0.2.0 -m 'Release 0.2.0'",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-tag",
            note: "",
          },
        ],
      },
      {
        number: 12,
        name: "Advanced collaboration and repository layouts",
        topics: [
          "`git worktree`: work on multiple branches in separate directories without multiple full clones.",
          "Submodules: pinned commits, clone/update commands, detached HEAD in submodules, and team pitfalls.",
          "Git subtree as an alternative for vendor/shared code; trade-offs vs. submodules and package managers.",
          "Monorepos vs. multirepos and how repository boundaries affect Git workflows.",
          "Sparse checkout: reduce which tracked paths appear in the working tree.",
          "Shallow clones vs. partial clones and the limitations of incomplete history/object availability.",
          "Git LFS for large binary assets and the distinction between an LFS pointer and actual file contents.",
          "Generating and applying patches, using `format-patch` and `git am` for email-style collaboration.",
          "`git bundle` for transferring repository history without a remote server.",
        ],
        commands: [
          "git worktree add ../project-hotfix -b hotfix/login main",
          "git worktree list",
          "git worktree remove ../project-hotfix",
          "git submodule update --init --recursive",
          "git sparse-checkout set packages/ui",
          "git format-patch -1 HEAD",
          "git bundle create project.bundle --all",
        ],
        practice:
          "Maintain one branch for a bug fix and another for a new feature via worktrees. In a separate sandbox, try a monorepo sparse checkout and a repository with a submodule.",
        lessons: [
          {
            name: "Separate working directories without duplicating history",
            explanation:
              "A linked worktree has its own HEAD, index, and working files while sharing objects and most refs with the main repository. This lets you review a release or fix a bug without stashing another branch. Normally one branch cannot be checked out in multiple worktrees at once. Use worktree commands for removal so metadata remains coherent.\n\nSubmodules instead record a specific commit of a separate repository. Cloning/updating needs explicit initialization and appropriate access. Commit a submodule change in its repository, then commit the new gitlink in the parent. subtree workflows copy another project’s files/history into a directory; the git subtree command is distributed separately on some installations. These mechanisms solve different ownership and update problems.",
            changes:
              "Creates another checkout and a branch; submodule updates affect both nested and parent repository state.",
            recovery:
              "Commit or separately save valuable files before worktree remove; avoid --force for routine cleanup. Review nested status before updating parent pointers.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Local changes",
            files: [
              {
                name: "commands.sh",
                code: "# From a clean repository; sibling path must not exist:\ngit worktree add -b fix/release ../release-fix main\ngit worktree list\n# Work in ../release-fix, then commit changes there.\n# Remove only after checking its status:\n# git worktree remove ../release-fix\n# For an existing trusted submodule project:\n# git submodule update --init --recursive\n# git submodule status --recursive",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-worktree",
            note: "",
          },
          {
            name: "Fetch fewer objects or exchange work offline",
            explanation:
              "Sparse checkout limits checked-out paths; it does not by itself reduce downloaded history. Partial clone filters reduce initially transferred objects when the server supports them; missing objects may later require network access. Shallow clones truncate ancestry, which can break log, merge-base, bisect, and release tooling until history is deepened.\n\nGit LFS is an additional client/server system: tracked Git files contain pointers while large payloads live in LFS storage. Install/configure it and verify hosting quotas/access before adopting it. format-patch/am exchange commit patches (with conflict/abort handling), while bundles transport refs and objects offline. Verify a received bundle and trust its source before use.",
            changes:
              "Sparse checkout changes checked-out paths/config; clone filters/shallow boundaries change locally available objects. Export commands write files.",
            recovery:
              "Disable sparse checkout to restore a full checkout; deepen/unshallow when ancestry is needed. Keep original repos and verify bundle imports before relying on them.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Local changes",
            files: [
              {
                name: "commands.sh",
                code: '# In a disposable clone with src/ and docs/:\n# git sparse-checkout init --cone\n# git sparse-checkout set src docs\n# git sparse-checkout disable\n# Separate network-dependent alternatives:\n# git clone --filter=blob:none REMOTE_URL partial-copy\n# git clone --depth=20 REMOTE_URL shallow-copy\n# git fetch --unshallow\nbundle_path=$(mktemp)\ngit bundle create "$bundle_path" --all\ngit bundle verify "$bundle_path"\nprintf \'Offline bundle: %s\\n\' "$bundle_path"\n# git format-patch -1 HEAD --stdout > /chosen/location/change.patch\n# In the recipient repo: git am /chosen/location/change.patch\n# On failure: inspect, resolve and git am --continue, or git am --abort',
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-bundle",
            note: "",
          },
          {
            name: "Choose repository boundaries by coupling and ownership",
            explanation:
              "A monorepo gives related packages one review/history boundary, making cross-package changes atomic but increasing tooling and access-control complexity. Multirepos offer independent history and permissions while requiring explicit versioning and coordinated releases. A package manager is often preferable to copying a third-party dependency’s source. Choose submodule/subtree only when source-level ownership and update constraints justify it.\n\nA submodule checkout may be detached at the parent’s pinned commit. Create a branch there before developing. The parent records only the nested commit ID, so colleagues need access to that repository and must initialize/update it. LFS assets and partial-clone objects similarly need their external stores to remain available.",
            changes:
              "Architecture decisions determine what a single commit/review can change and which repositories must be accessible.",
            recovery:
              "Document update, release, backup, and onboarding procedures before migrating repository boundaries.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Specialized architecture",
            files: [],
            source: "https://git-scm.com/docs/git-submodule",
            note: "",
          },
        ],
      },
      {
        number: 13,
        name: "Debugging and investigation",
        topics: [
          "`git bisect`: binary-search commit history to locate a regression.",
          "Using `git bisect run` with an automated test/script and handling skipped or untestable commits.",
          "`git blame`, pickaxe (`-S` / `-G`), and file history to investigate how bugs emerged.",
          "Comparing release/tag boundaries, branches, and merge bases.",
          "Diagnosing strange merges, deleted files, bad rebases, and missing commits.",
          "Checking repository object integrity with `git fsck` and understanding that repair may require backups/remotes.",
          "Read errors and bad-object messages carefully before using destructive commands.",
        ],
        commands: [
          "git bisect start",
          "git bisect bad",
          "git bisect good <known-good-commit>",
          "git bisect run ./test-regression.sh",
          "git bisect reset",
          "git fsck --full",
        ],
        practice:
          "Create a script that returns a nonzero exit code for a regression, introduce the bug midway through a 15-commit history, and locate it using automated bisect.",
        lessons: [
          {
            name: "Turn a regression into a repeatable predicate",
            explanation:
              "Bisect narrows a known-good/known-bad ancestry range by testing intermediate commits. First build a deterministic test for the symptom. bisect run treats exit 0 as good, 1–127 as bad except 125 (skip), and other exit codes as an abort. Distinguish “cannot build this revision” from a real regression; too many skipped revisions can leave an ambiguous answer.\n\nKeep the runner outside the checked-out paths when old revisions might delete it. Record the range, inspect the first bad patch, return with bisect reset, and reproduce before fixing. The regression project supplies a complete automated example. fsck checks object connectivity/validity; it does not automatically reconstruct missing working files or repair every corruption.",
            changes:
              "Bisect temporarily checks out commits and records investigation refs. fsck inspects objects.",
            recovery:
              "bisect reset returns to the starting checkout. Preserve backups and evidence before attempting corruption repair; do not prune potentially recoverable objects.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Local changes",
            files: [
              {
                name: "commands.sh",
                code: "# Replace GOOD_ID and BAD_ID after reproducing both boundaries:\n# git bisect start BAD_ID GOOD_ID\n# git bisect run sh /absolute/path/check-regression.sh\n# git bisect log\n# git bisect reset\ngit fsck --full",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-bisect",
            note: "",
          },
        ],
      },
      {
        number: 14,
        name: "Git hooks, automation, and CI/CD",
        topics: [
          "Local client hooks such as `pre-commit`, `commit-msg`, and `pre-push`.",
          "Server-side hooks and how they differ from local hooks.",
          "Sharing hooks through project tooling or `core.hooksPath`; hooks are not automatically distributed as executable policy.",
          "Running formatters, linters, TypeScript checks, unit tests, and secret scanners at appropriate stages.",
          "GitHub Actions / GitLab CI pipelines triggered by pushes, tags, and pull requests.",
          "Required checks and how CI enforces rules that optional client hooks cannot.",
          "Avoiding fragile or excessively slow hooks and protecting the ability to diagnose failures.",
          "CI permissions, token scopes, pull request trust boundaries, and artifact handling.",
        ],
        commands: [],
        practice:
          "Set up a frontend repository with a pre-commit quality check and a remote CI job that installs dependencies, runs a linter, performs a TypeScript check, and executes tests before merge.",
        lessons: [
          {
            name: "Hooks provide feedback; CI enforces shared checks",
            explanation:
              "Client hooks are executable programs triggered by Git operations. They are not copied into active .git/hooks by an ordinary clone, and developers can bypass many of them. Track a hooks directory and deliberately configure core.hooksPath for each clone. A pre-commit whitespace check inspects the staged diff; running a general test command may instead test working files, which can differ from the index.\n\nCI should install from the lockfile and run linting, type checks, tests, and a production build in a clean environment. Hosting must make those checks required before merge. Treat pull-request code as untrusted: use minimal token permissions and withhold deployment secrets. Pin/audit third-party automation, cache dependencies carefully, and separate build artifacts from source commits.",
            changes:
              "Writes a hook file and local configuration. Hosted CI configuration and required checks need separate setup.",
            recovery:
              "Correct/disable a faulty local hook configuration after diagnosis. Re-run failed checks with the same runtime and dependency versions as CI.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Local changes",
            files: [
              {
                name: ".githooks/pre-commit",
                code: "#!/bin/sh\nset -eu\ngit diff --cached --check",
                language: "shell",
                test: "reference",
              },
              {
                name: "enable-hooks.sh",
                code: "# Run from repository root after creating the hook file:\nchmod +x .githooks/pre-commit\ngit config --local core.hooksPath .githooks",
                language: "shell",
                test: "reference",
              },
              {
                name: "ci-checks.sh",
                code: "#!/bin/sh\nset -eu\n# Requires a package-lock.json and these project scripts:\nnpm ci\nnpm run lint\nnpm run typecheck\nnpm test\nnpm run build",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/githooks",
            note: "",
          },
          {
            name: "A hosted pipeline runs the project contract",
            explanation:
              "This GitLab CI example runs for merge requests and the default branch. The project must provide a committed npm lockfile and real lint/typecheck/test/build scripts; these names are project conventions. CI uses a clean install and publishes only the selected build directory for a limited time. Adjust dist/ for the framework. Node 22 is an explicit runtime family; choose the project’s supported runtime and pin an audited image digest when immutable infrastructure is required.\n\nUse the hosting UI to require the successful pipeline and review before merging. Add tag-triggered release jobs separately with scoped deployment credentials. Server-side pre-receive/update hooks can reject pushes on servers you administer; hosted services expose their own policy mechanisms. Client commit-msg/pre-push hooks provide earlier feedback but remain bypassable.",
            changes:
              "Committing this file enables a job only in a compatible configured GitLab project; it does not activate protected-branch policy.",
            recovery:
              "Diagnose failures from the job logs and reproduce with the same runtime. Revert a broken pipeline change through normal review.",
            requires:
              "GitLab project, committed package-lock.json, supported Node runtime, and the listed package scripts",
            risk: "Hosted automation",
            files: [
              {
                name: ".gitlab-ci.yml",
                code: "image: node:22\n\nworkflow:\n  rules:\n    - if: '$CI_PIPELINE_SOURCE == \"merge_request_event\"'\n    - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'\n    - when: never\n\nquality:\n  script:\n    - npm ci\n    - npm run lint\n    - npm run typecheck\n    - npm test\n    - npm run build\n  artifacts:\n    paths:\n      - dist/\n    expire_in: 7 days",
                language: "yaml",
                test: "reference",
              },
            ],
            source: "https://docs.gitlab.com/ci/yaml/",
            note: "",
          },
        ],
      },
      {
        number: 15,
        name: "Security and repository policy",
        topics: [
          "HTTPS credentials vs. SSH keys; credential helpers; access-token expiry and least privilege.",
          "Signed commits and tags using supported signing methods (for example SSH or GPG).",
          "Secrets detection and preventing `.env` credentials or production secrets from entering Git history.",
          "The difference between ignoring a file and **removing already committed contents from history**.",
          "Safely handling leaked secrets: **rotate/revoke them first**, then assess history cleanup and coordination.",
          "History rewrite tools for exceptional cleanup, such as `git filter-repo` (an external tool); implications for collaborators, forks, and caches.",
          "Repository rules, branch protections, status checks, and trusted release processes.",
          "Binary files, sensitive generated artifacts, and dependency provenance.",
        ],
        commands: [],
        practice:
          "In a disposable repository, commit a fake secret, then investigate how many commits contain it. Practice coordinated cleanup without using any actual credentials.",
        lessons: [
          {
            name: "Credentials, signing, and history cleanup solve different risks",
            explanation:
              "Commit identity is editable metadata. Signed commits/tags attach cryptographic evidence that must be checked against a trusted key and policy; configure GPG or SSH signing deliberately. Credentials authorize access, while branch protection and least privilege limit permitted writes. No signature or protected branch makes malicious dependencies harmless. Review automation, configuration includes, hooks, submodules, and imported code before running them.\n\nIf a secret reaches a commit, revoke/rotate it first, assess logs/artifacts/forks, and coordinate removal. git-filter-repo is a separate tool for planned history rewriting; it changes commit IDs and requires migration instructions for collaborators and hosting cleanup. .gitignore only prevents ordinary addition of untracked paths, not disclosure from existing history.",
            changes:
              "Inspection below is read-only. Signing setup and coordinated history filtering change configuration/history and need their own plan.",
            recovery:
              "Recover signing configuration from a known valid setup. After exposure, do not treat deleting a file or force-pushing as credential revocation.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Local changes",
            files: [
              {
                name: "commands.sh",
                code: "git log -1 --show-signature\ngit config --show-origin --get gpg.format || :\ngit config --show-origin --get commit.gpgsign || :\n# Once a signing identity/trust policy is configured:\n# git commit -S -m 'Validated change'\n# git verify-commit COMMIT_ID",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-verify-commit",
            note: "",
          },
        ],
      },
      {
        number: 16,
        name: "Git internals: how Git really works",
        topics: [
          "`.git/` structure: object database, refs, `HEAD`, index, logs, configuration, and hooks.",
          "Object types: **blob**, **tree**, **commit**, and **annotated tag**.",
          "Object hashes/IDs and content-addressed storage; understand that object format may use SHA-1 or SHA-256 depending on repository setup.",
          "Loose objects, packfiles, delta compression, and garbage collection.",
          "How branch names and remote-tracking refs ultimately resolve to commits.",
          "Symbolic references, detached HEAD, annotated tags, and reflogs.",
          "The index as a tree-building staging structure; conflict stages in the index.",
          "Git's **porcelain** (user-facing) and **plumbing** (low-level) commands.",
          "Revisions, ancestry, reachability, merge-base calculations, and commit graphs.",
          "Refspec syntax (`<src>:<dst>`), fetching, and pushing at the reference level.",
          "Object lifetime, pruning, and why unreachable commits may remain temporarily recoverable.",
        ],
        commands: [
          "git rev-parse HEAD",
          "git cat-file -t HEAD",
          "git cat-file -p HEAD",
          "git ls-tree HEAD",
          "git ls-files --stage",
          "git show-ref",
          "git symbolic-ref HEAD",
          "git hash-object -w demo.txt",
          "git count-objects -v",
          "git gc",
        ],
        practice:
          "Build a tiny repository, inspect commit/tree/blob objects by ID, inspect `HEAD` and refs directly, and explain which internal objects change after each new commit.",
        lessons: [
          {
            name: "Objects and references explain visible behavior",
            explanation:
              "Blobs store file content; trees associate names/modes with blobs or subtrees; commits reference a tree, parents, and metadata; annotated tags refer to another object. Objects are addressed by hashes, but do not hardcode a 40-character assumption: repository object format can differ. The index stores the proposed tree plus metadata and, during conflicts, multiple stages.\n\nRefs give objects useful names; HEAD is often symbolic. Loose objects may be packed, refs may be packed, and commit-graph files accelerate traversal. Storage optimization does not alter commit ancestry. In a linked worktree .git can be a file pointing elsewhere, so ask rev-parse for paths rather than editing internals. Unreachable objects can eventually be pruned; reflogs are retention aids, not permanent backups.",
            changes:
              "cat-file/ls-files/show-ref read metadata. hash-object -w below adds an otherwise unreferenced blob; it does not stage or commit it.",
            recovery:
              "Avoid editing internal files manually. Retain useful commits with refs and keep independent backups before maintenance.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Local changes",
            files: [
              {
                name: "commands.sh",
                code: "git rev-parse --git-dir --git-common-dir\ngit rev-parse --show-object-format\ngit cat-file -t HEAD\ngit cat-file -p HEAD\ngit cat-file -p 'HEAD^{tree}'\ngit ls-files --stage\ngit show-ref\nprintf 'An isolated object\\n' | git hash-object -w --stdin",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-cat-file",
            note: "",
          },
        ],
      },
      {
        number: 17,
        name: "Performance, maintenance, and unusual cases",
        topics: [
          "Object packing, repository maintenance, `git gc`, and `git maintenance`.",
          "Commit-graph files, multi-pack indexes, and why large repos benefit from maintenance.",
          "Clone optimization: shallow and partial clones; sparse-checkout for large monorepos.",
          "Common performance problems: oversized binaries, massive untracked trees, generated files, and expensive status operations.",
          "Troubleshooting file-mode changes, case-only renames, line endings, encodings, and merge drivers.",
          "Recovering from interrupted operations; finding rebase/merge state and safely aborting it.",
          "Differences in commands and features across installed Git versions.",
          "When to escalate from familiar porcelain commands to plumbing commands or backup-based recovery.",
        ],
        commands: [],
        practice:
          "Create a repository with substantial generated output. Compare behavior before and after correcting `.gitignore` and experiment with maintenance only in a disposable clone.",
        lessons: [
          {
            name: "Diagnose the bottleneck before changing storage",
            explanation:
              "Large histories, many filesystem entries, antivirus/network filesystems, huge binaries, and accidental generated files can each make different operations slow. Measure the specific operation first. Ignore disposable untracked directories; an ignore rule does not remove already tracked files. Consider sparse checkout, partial clone, LFS, or repository boundaries when they match the real bottleneck.\n\nmaintenance coordinates background-friendly tasks such as commit-graph/pack maintenance; gc can expire/prune unreachable objects according to configuration. Neither is a recovery command. Case-only renames, executable-bit changes, and line endings require cross-platform review; use deliberate attributes and tested renormalization commits rather than repeatedly rewriting unrelated files. Very large repo tuning should be measured against the team’s Git versions and filesystem.",
            changes:
              "Status/timing inspect; maintenance changes storage metadata and may perform cleanup according to configuration.",
            recovery:
              "Back up first when investigating missing objects. Avoid aggressive prune/expiry options; storage cleanup can eliminate otherwise recoverable history.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Local changes",
            files: [
              {
                name: "commands.sh",
                code: "time git status --short\ngit count-objects -vH\ngit config --show-origin --get core.filemode || :\ngit config --show-origin --get core.ignorecase || :\n# In a healthy backed-up repository, when maintenance is needed:\n# git maintenance run",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/git-maintenance",
            note: "",
          },
        ],
      },
      {
        number: 18,
        name: "Git practices for frontend development",
        topics: [
          "Managing `.gitignore` for **JavaScript, TypeScript, React, Next.js, Vite, WordPress, and Shopify theme** projects.",
          "Committing dependency lockfiles appropriately (`package-lock.json`, `pnpm-lock.yaml`, or `yarn.lock`) and resolving lockfile conflicts by validating/re-generating them with the chosen package manager.",
          "Separating source from build artifacts and documenting when distribution files intentionally belong in the repository.",
          "Handling `.env.example` vs. local `.env` credentials and other sensitive configuration.",
          "Reviewing changes in HTML, CSS/SCSS, JavaScript, JSON, and generated/minified assets without drowning in noise.",
          "Choosing sensible workflows for **themes, plugins, custom UI components, client projects, and reusable libraries**.",
          "Working across several feature branches for code reviews, urgent fixes, and client requests using `git worktree`.",
          "Using pull requests with linters, formatters, tests, build checks, and accessibility/performance validation when relevant.",
          "Managing releases and hotfixes for packages and deployed sites; tagging deployable versions.",
          "Working with monorepos containing multiple packages or apps.",
          "Avoiding vendor code, uploads, caches, build directories, and secrets in repositories unless a project explicitly needs them tracked.",
        ],
        commands: [],
        practice:
          "Build a small TypeScript component library with branches, focused commits, a GitHub-style pull request workflow, automated tests, and version tags. Simulate a production hotfix while another feature is in progress.",
        lessons: [
          {
            name: "Apply the workflow to a frontend delivery pipeline",
            explanation:
              "Track source, tests, manifests, the selected package-manager lockfile, and intentional configuration. Usually ignore node_modules, caches, credentials, and generated builds. React/Vite, Next.js, WordPress themes, and Shopify themes have different build/deployment outputs: decide which artifacts the host needs instead of applying one ignore file blindly. This documentation site, for example, may intentionally publish tracked static output.\n\nKeep component/refactor/formatting changes reviewable; avoid combining a dependency upgrade with unrelated UI rewrites. Resolve manifest intent before regenerating a conflicted lockfile with the agreed tool version, then test and review its diff. Use release tags and immutable artifacts for deployment traceability, separate preview/production credentials, and validate hotfixes both on the release line and active development.",
            changes:
              "A frontend change should produce a focused source/lockfile diff and separately generated build artifacts.",
            recovery:
              "Revert a faulty published change, rebuild from a known commit/tag, and follow the host’s deployment rollback process. Git alone does not roll back a database or remote service.",
            requires:
              "Independent reference: run only in a disposable repository with the stated files/branches",
            risk: "Local changes",
            files: [
              {
                name: ".gitignore",
                code: "node_modules/\n.next/\n.vite/\ncoverage/\n.env*\n!.env.example\n# Ignore dist/ only when the deployment contract does not track it.",
                language: "plaintext",
                test: "reference",
              },
              {
                name: "review-frontend-change.sh",
                code: "git status --short\ngit diff --check\ngit diff --stat\ngit diff -- package.json package-lock.json\n# With the project runtime installed and package scripts defined:\n# npm ci\n# npm run lint\n# npm run typecheck\n# npm test\n# npm run build",
                language: "shell",
                test: "reference",
              },
            ],
            source: "https://git-scm.com/docs/gitignore",
            note: "",
          },
        ],
      },
    ],
    projects: [
      {
        number: 1,
        name: "Fundamentals lab",
        brief:
          "Create a repository from scratch, write a `.gitignore`, stage partial changes, make readable commits, and inspect the graph.",
        files: [
          {
            name: "project-lab.sh",
            code: "set -eu\ngit_lab=$(mktemp -d)\ncd \"$git_lab\"\ngit init -b main project\ncd project\ngit config user.name 'Study User'\ngit config user.email 'study@example.test'\ngit config commit.gpgsign false\n\nprintf 'node_modules/\\n.env.local\\n' > .gitignore\nprintf 'one\\n' > notes.txt\ngit add .gitignore notes.txt\ngit commit -m 'Create notes project'\nprintf 'two\\n' >> notes.txt\ngit add notes.txt\nprintf 'three\\n' >> notes.txt\n# Index contains two lines; working file contains three:\ntest \"$(git show :notes.txt | wc -l | tr -d ' ')\" = 2\ntest \"$(wc -l < notes.txt | tr -d ' ')\" = 3\ngit diff --cached\ngit diff\ngit commit -m 'Record second line only'\ngit add notes.txt\ngit commit -m 'Record third line'\ngit tag -a v0.1.0 -m 'First study release'\ngit status -sb\nprintf 'Inspect your lab at %s/project\\n' \"$git_lab\"",
            language: "shell",
            test: "lab",
          },
        ],
        checks: [
          "Explain why staged and unstaged diffs differ before the second commit.",
          "Extend the lab with git add -p to select separate hunks, then review both diffs.",
          "Show a clean status and inspect the annotated release tag.",
        ],
      },
      {
        number: 2,
        name: "Collaboration lab",
        brief:
          "Use two clones as two developers. Push conflicting edits, fetch, integrate updates, resolve conflicts, and submit a small reviewable change.",
        files: [
          {
            name: "project-lab.sh",
            code: "set -eu\ngit_lab=$(mktemp -d)\ncd \"$git_lab\"\ngit init --bare -b main origin.git\ngit clone origin.git alice\ncd alice\ngit config user.name Alice\ngit config user.email alice@example.test\ngit config commit.gpgsign false\nprintf 'Base heading\\n' > heading.txt\ngit add heading.txt\ngit commit -m 'Create shared heading'\ngit push -u origin main\ncd ..\ngit clone origin.git bob\ncd bob\ngit config user.name Bob\ngit config user.email bob@example.test\ngit config commit.gpgsign false\nprintf 'Bob heading\\n' > heading.txt\ngit add heading.txt\ngit commit -m 'Improve heading as Bob'\ncd ../alice\nprintf 'Alice heading\\n' > heading.txt\ngit add heading.txt\ngit commit -m 'Improve heading as Alice'\ngit push origin main\ncd ../bob\n# This rejection is expected: Alice published a new server tip.\nif git push origin main; then\n  printf 'Expected a non-fast-forward rejection\\n' >&2\n  exit 1\nfi\ngit fetch origin\nif git merge --no-edit origin/main; then\n  printf 'Expected a content conflict\\n' >&2\n  exit 1\nfi\ngit ls-files -u\nprintf 'Alice and Bob heading\\n' > heading.txt\ngit add heading.txt\ngit commit -m 'Combine both heading improvements'\ngit push origin main\ncd ../alice\ngit pull --ff-only\ntest \"$(cat heading.txt)\" = 'Alice and Bob heading'\ntest \"$(git rev-parse HEAD)\" = \"$(git rev-parse origin/main)\"\ngit log --graph --oneline --all\nprintf 'Both clones: %s\\n' \"$git_lab\"",
            language: "shell",
            test: "lab",
          },
        ],
        checks: [
          "Explain the expected push rejection without force-pushing.",
          "Inspect base/ours/theirs before resolving the deliberate conflict.",
          "Both clones end at the same combined commit, retaining both contributions.",
        ],
      },
      {
        number: 3,
        name: "History surgery lab",
        brief:
          "Create messy commits, squash/reword/split them using rebase, cherry-pick a fix, and recover a lost branch through reflog.",
        files: [
          {
            name: "project-lab.sh",
            code: 'set -eu\ngit_lab=$(mktemp -d)\ncd "$git_lab"\ngit init -b main project\ncd project\ngit config user.name \'Study User\'\ngit config user.email \'study@example.test\'\ngit config commit.gpgsign false\n\nprintf \'base\\n\' > feature.txt\ngit add feature.txt\ngit commit -m \'Create base\'\nbase=$(git rev-parse HEAD)\nprintf \'feature\\n\' >> feature.txt\ngit add feature.txt\ngit commit -m \'Add feature\'\nprintf \'correction\\n\' >> feature.txt\ngit add feature.txt\ngit commit --fixup=HEAD\ngit branch backup/messy\n# Autosquash rewrites only the private commits after base.\nGIT_SEQUENCE_EDITOR=: git rebase -i --autosquash "$base"\ntest "$(git rev-list --count "$base"..HEAD)" = 1\ngit diff --exit-code backup/messy HEAD\ngit range-diff "$base"..backup/messy "$base"..HEAD\nsaved=$(git rev-parse HEAD)\n# Deliberate loss/recovery only inside this newly created lab:\ngit reset --hard HEAD^\ngit branch recovered \'HEAD@{1}\'\ntest "$(git rev-parse recovered)" = "$saved"\ngit switch recovered\ntest "$(tail -1 feature.txt)" = correction\nprintf \'Recovered private work: %s/project\\n\' "$git_lab"',
            language: "shell",
            test: "lab",
          },
        ],
        checks: [
          "Compare the old/new series and prove the final file tree stayed identical.",
          "Repeat manually with interactive reword, reorder, edit/split, and squash on a fresh copy.",
          "Recover the intentionally detached branch tip using the reflog; explain retention limits.",
        ],
      },
      {
        number: 4,
        name: "Regression lab",
        brief:
          "Introduce a bug, discover it with `git bisect run`, identify the relevant source lines, and revert the faulty commit safely.",
        files: [
          {
            name: "project-lab.sh",
            code: 'set -eu\ngit_lab=$(mktemp -d)\ncd "$git_lab"\ngit init -b main project\ncd project\ngit config user.name \'Study User\'\ngit config user.email \'study@example.test\'\ngit config commit.gpgsign false\n\nprintf \'#!/bin/sh\\ntest "$(cat behavior.txt)" = good\\n\' > "$git_lab/check.sh"\ni=1\nwhile test "$i" -le 15; do\n  if test "$i" -lt 8; then\n    printf \'good\\n\' > behavior.txt\n  else\n    printf \'bad\\n\' > behavior.txt\n  fi\n  if test "$i" != 8; then printf \'Revision %s\\n\' "$i" >> history.txt; fi\n  git add behavior.txt history.txt\n  git commit -m "Revision $i"\n  if test "$i" = 1; then good=$(git rev-parse HEAD); fi\n  if test "$i" = 8; then expected=$(git rev-parse HEAD); fi\n  i=$((i + 1))\ndone\npublished_tip=$(git rev-parse HEAD)\ngit bisect start HEAD "$good"\ngit bisect run sh "$git_lab/check.sh"\ntest "$(git rev-parse refs/bisect/bad)" = "$expected"\ngit bisect log\ngit bisect reset\n# Preserve the existing fifteen commits and append an inverse change:\ngit revert --no-edit "$expected"\nsh "$git_lab/check.sh"\ngit merge-base --is-ancestor "$published_tip" HEAD\nprintf \'Regression identified and reverted: %s/project\\n\' "$git_lab"',
            language: "shell",
            test: "lab",
          },
        ],
        checks: [
          "Find revision 8 automatically in the fifteen-commit history.",
          "Explain what exit 125 means and experiment with an untestable revision.",
          "Keep the original tip as an ancestor and validate the new revert commit.",
        ],
      },
      {
        number: 5,
        name: "Production-like frontend lab (capstone)",
        brief:
          "Set up a TypeScript/JavaScript application or component library with protected `main`, feature branches, CI checks, release tags, a documented workflow, a hotfix branch, and a clean release process.",
        files: [
          {
            name: "project-lab.sh",
            code: "set -eu\ngit_lab=$(mktemp -d)\ncd \"$git_lab\"\ngit init -b main project\ncd project\ngit config user.name 'Study User'\ngit config user.email 'study@example.test'\ngit config commit.gpgsign false\n\n# Minimal frontend component source; add your normal framework/tooling later.\nmkdir -p src .githooks\nprintf 'export const label = \"Button\";\\n' > src/button.js\nprintf '#!/bin/sh\\nset -eu\\ngit diff --cached --check\\n' > .githooks/pre-commit\nchmod +x .githooks/pre-commit\ngit config --local core.hooksPath .githooks\nprintf 'node_modules/\\n.env.local\\n' > .gitignore\ngit add src .githooks .gitignore\ngit commit -m 'Create component-library baseline'\ngit switch -c feature/button\nprintf 'export const label = \"Submit\";\\n' > src/button.js\ngit add src/button.js\ngit commit -m 'Improve button label'\ngit switch main\ngit merge --ff-only feature/button\ngit tag -a v1.0.0 -m 'Component release 1.0.0'\ngit worktree add -b hotfix/label \"$git_lab/hotfix\" v1.0.0\ncd \"$git_lab/hotfix\"\nprintf 'export const label = \"Submit form\";\\n' > src/button.js\ngit add src/button.js\ngit commit -m 'Clarify release button label'\nhotfix=$(git rev-parse HEAD)\ncd \"$git_lab/project\"\ngit cherry-pick -x \"$hotfix\"\ngit tag -a v1.0.1 -m 'Component release 1.0.1'\ngit worktree remove \"$git_lab/hotfix\"\ntest \"$(git show v1.0.0:src/button.js)\" = 'export const label = \"Submit\";'\ntest \"$(git show v1.0.1:src/button.js)\" = 'export const label = \"Submit form\";'\ngit log --oneline --graph --all --decorate\nprintf 'Local capstone starter: %s/project\\n' \"$git_lab\"",
            language: "shell",
            test: "lab",
          },
        ],
        checks: [
          "Use the starter as local release/worktree practice, then build the frontend project described above.",
          "Add real lint, typecheck, test, and build scripts; wire ci-checks.sh into your hosting provider.",
          "Configure actual protected branches, required checks, reviews, and deployment permissions on the host.",
          "Complete the roadmap capstone criteria below; the local starter does not claim hosted policy or CI is configured.",
        ],
      },
    ],
    plan: [
      [
        "1",
        "Fundamentals, Git mental model, config, staging, diffs",
        "Explain the index and make partial commits reliably",
      ],
      [
        "2",
        "Branches, merges, remotes, tracking",
        "Resolve a two-clone integration scenario",
      ],
      [
        "3",
        "Revision selection, logs, blame, diff ranges",
        "Investigate and explain a change's history",
      ],
      [
        "4",
        "Conflict resolution and rebasing",
        "Resolve several conflict types; clean up commit history",
      ],
      [
        "5",
        "Undo/recovery, stash, reflog, safe push",
        "Recover an accidentally lost branch and undo published changes safely",
      ],
      [
        "6",
        "Team workflows, PRs, protections, release tags",
        "Define a professional repository contribution and release process",
      ],
      [
        "7",
        "Worktrees, submodules, sparse checkout, LFS concepts",
        "Parallel hotfix/feature worktree exercise",
      ],
      [
        "8",
        "Bisect, hooks, CI, security",
        "Automated regression search and CI checks",
      ],
      [
        "9",
        "Git internals, plumbing, refs, packfiles",
        "Trace objects and references in a tiny repository",
      ],
      [
        "10",
        "Frontend capstone and troubleshooting",
        "Complete a realistic feature → review → release → hotfix cycle",
      ],
    ],
    priorities: [
      {
        group: "Must be able to do confidently",
        text: "Explain the **working tree**, **index**, **commit**, **branch**, and **HEAD**.",
      },
      {
        group: "Must be able to do confidently",
        text: "Stage individual hunks and inspect exactly what will be committed.",
      },
      {
        group: "Must be able to do confidently",
        text: "Choose between fetch, pull, merge, rebase, and push appropriately.",
      },
      {
        group: "Must be able to do confidently",
        text: "Resolve merge/rebase conflicts and know when to abort.",
      },
      {
        group: "Must be able to do confidently",
        text: "Use interactive rebase to clean up **your own** feature-branch history.",
      },
      {
        group: "Must be able to do confidently",
        text: "Know when to use restore, reset, revert, and reflog.",
      },
      {
        group: "Must be able to do confidently",
        text: "Diagnose a non-fast-forward push rejection.",
      },
      {
        group: "Must be able to do confidently",
        text: "Use `--force-with-lease` carefully, never casually rewrite shared work.",
      },
      {
        group: "Must be able to do confidently",
        text: "Read commit graphs and understand branch divergence.",
      },
      {
        group: "Must be able to do confidently",
        text: "Work effectively with pull requests and branch protection rules.",
      },
      {
        group: "Must be able to do confidently",
        text: "Debug a regression using `git bisect` and commit/file history.",
      },
      {
        group: "Must be able to do confidently",
        text: "Keep secrets and inappropriate build artifacts out of version control.",
      },
      {
        group: "Advanced / expert milestones",
        text: "Explain blobs, trees, commits, refs, packfiles, and the index from first principles.",
      },
      {
        group: "Advanced / expert milestones",
        text: "Work comfortably with `git worktree`, complex revision expressions, and `git range-diff`.",
      },
      {
        group: "Advanced / expert milestones",
        text: "Understand refspecs, cherry-pick, `rebase --onto`, and merge ancestry.",
      },
      {
        group: "Advanced / expert milestones",
        text: "Manage release tags, hotfix/backport workflows, and CI integration.",
      },
      {
        group: "Advanced / expert milestones",
        text: "Recognize when submodules, sparse checkout, shallow/partial clones, or LFS are appropriate.",
      },
      {
        group: "Advanced / expert milestones",
        text: "Recover from an accidentally moved branch tip and know when recovery is not guaranteed.",
      },
      {
        group: "Advanced / expert milestones",
        text: "Establish a maintainable Git workflow for a frontend team or client project.",
      },
    ],
    decisions: [
      ["Discard an unstaged edit to a tracked file", "`git restore <file>`"],
      ["Unstage a file but keep its contents", "`git restore --staged <file>`"],
      ["Change an unpublished latest commit", "`git commit --amend`"],
      [
        "Undo a local commit while keeping edits",
        "`git reset --soft HEAD~1` or `--mixed`, depending on desired index state",
      ],
      [
        "Undo a published commit without rewriting history",
        "`git revert <commit>`",
      ],
      [
        "Recover a recently moved branch tip",
        "`git reflog` + `git branch` / careful `git reset`",
      ],
      [
        "Remove untracked files",
        "`git clean -n` first; then `git clean` only after inspection",
      ],
    ],
    capstone: [
      "The commit graph is understandable and the branch strategy is documented.",
      "Each pull request/change set is narrowly scoped and can be reviewed independently.",
      "A conflict is resolved correctly, with the application/tests validated afterward.",
      "A bad published commit can be reverted without rewriting `main`.",
      "A recently lost local commit can be recovered with reflog.",
      "The repository excludes secrets, dependency install directories, and accidental generated files.",
      "An automated pipeline validates important project checks.",
      "Releases use meaningful, stable tags and include an intelligible change summary.",
    ],
    references: [
      ["Git command reference", "https://git-scm.com/docs"],
      ["Git LFS: separate client and storage", "https://git-lfs.com/"],
      [
        "git-filter-repo: coordinated history cleanup",
        "https://github.com/newren/git-filter-repo",
      ],
      [
        "GitHub protected branches",
        "https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches",
      ],
      ["GitLab CI pipeline configuration", "https://docs.gitlab.com/ci/yaml/"],
    ],
  };
  const $ = (selector) => document.querySelector(selector);
  const escape = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[character],
    );
  // Escape source text before applying its limited inline Markdown conventions.
  const inline = (text) =>
    escape(text)
      .replace(/`([^`]+)`/g, '<code class="language-none">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  const list = (items) =>
    `<ul>${items.map((item) => `<li>${inline(item)}</li>`).join("")}</ul>`;
  const table = (headers, rows) =>
    `<div class="table-wrap"><table><thead><tr>${headers.map((h) => `<th scope="col">${escape(h)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${inline(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  const group = (n) =>
    n <= 4 ? "review" : n <= 10 ? "focus" : n <= 17 ? "deepen" : "frontend";
  const codeBlock = (file, copy = true) =>
    `<div class="example-head"><span>${escape(file.name)}</span>${copy ? '<button type="button" data-copy>Copy</button>' : ""}</div><pre tabindex="0"><code class="language-${escape(file.language)}">${escape(file.code)}</code></pre>`;
  const lesson = (item) =>
    `<article class="entry"><h3>${escape(item.name)}</h3>${item.explanation
      .split("\n\n")
      .map((p) => `<p>${inline(p)}</p>`)
      .join(
        "",
      )}<p class="requirements"><strong>Context:</strong> ${inline(item.requires)} · ${escape(item.risk)}</p><dl class="git-effects"><dt>What changes</dt><dd>${inline(item.changes)}</dd><dt>Recovery</dt><dd>${inline(item.recovery)}</dd></dl>${item.files.map((file) => codeBlock(file)).join("")}${item.note ? `<p>${inline(item.note)}</p>` : ""}<a class="source" href="${escape(item.source)}">Official reference ↗</a></article>`;
  const search = $("#search");
  const filter = $("#stage-filter");
  function render() {
    const query = search.value.trim().toLocaleLowerCase();
    const matches = (value) =>
      !query || JSON.stringify(value).toLocaleLowerCase().includes(query);
    const stages = book.stages.filter(
      (stage) =>
        (filter.value === "all" || group(stage.number) === filter.value) &&
        matches(stage),
    );
    const projects =
      filter.value === "all" ? book.projects.filter(matches) : [];
    $("#nav").innerHTML =
      stages
        .map(
          (stage) =>
            `<a href="#stage-${stage.number}">${escape(stage.name)}</a>`,
        )
        .join("") +
      (projects.length ? '<a href="#projects">Hands-on projects</a>' : "");
    $("#content").innerHTML =
      stages
        .map(
          (stage) =>
            `<section id="stage-${stage.number}"><span class="stage">Stage ${stage.number} · ${group(stage.number) === "review" ? "Foundations" : group(stage.number) === "focus" ? "Essential collaboration" : group(stage.number) === "deepen" ? "Advanced / specialized" : "Frontend application"}</span><h2>${escape(stage.name)}</h2><details class="roadmap-topics"><summary>Roadmap topics · ${stage.topics.length}</summary>${list(stage.topics)}</details>${stage.lessons.map(lesson).join("")}${stage.commands.length ? `<details class="roadmap-topics command-reference"><summary>Essential command reference · ${stage.commands.length}</summary><p>Original roadmap commands, shown individually. These are alternatives and templates, <strong>not a script to run in order</strong>. Replace angle-bracket placeholders. Inspect context before resets, deletion, history rewrites, or remote writes.</p>${stage.commands.map((command) => codeBlock({ name: "Reference command", language: "shell", code: command }, false)).join("")}</details>` : ""}<div class="checkpoint"><strong>Practice</strong><p>${inline(stage.practice)}</p></div></section>`,
        )
        .join("") ||
      '<p class="tip">No stages match. Try another term or reset filters.</p>';
    $("#projects").innerHTML = projects.length
      ? `<h2>Progressive hands-on projects</h2><p>Run each script independently in a POSIX-style shell. All create new temporary repositories; none contacts a network server. Keep the printed directory for inspection. The scripts demonstrate the core workflow; extend them with the acceptance tasks to complete each roadmap project.</p>${projects.map((project) => `<article class="project"><h3>${escape(project.name)}</h3><p>${inline(project.brief)}</p>${project.files.map((file) => codeBlock(file)).join("")}<h4>Acceptance tasks</h4>${list(project.checks)}</article>`).join("")}<details class="roadmap-topics"><summary>Full frontend capstone criteria</summary>${list(book.capstone)}</details>`
      : "";
    $("#count").textContent =
      `${stages.length} of 18 stages · ${projects.length} of 5 projects`;
    window.HandbookHighlight?.highlight($("#content"));
    window.HandbookHighlight?.highlight($("#projects"));
  }
  $("#learning-plan").innerHTML =
    `<h2>Suggested ten-week plan</h2>${table(["Week", "Focus", "Outcome"], book.plan)}<h2>Choose the appropriate undo operation</h2><p>Use this decision guide after inspecting status and diffs. These are starting points, not guarantees that valuable files are recoverable.</p>${table(["Situation", "Usually appropriate"], book.decisions)}<h2>Priority checklist</h2>${[...new Set(book.priorities.map((p) => p.group))].map((group) => `<h3>${escape(group)}</h3>${list(book.priorities.filter((p) => p.group === group).map((p) => p.text))}`).join("")}`;
  $("#references").innerHTML =
    `<h2>References and tool boundaries</h2><p>Core Git is distinct from hosting policy, CI services, and separately installed extensions. Signing needs configured tools/keys; LFS needs client and server support; subtree and filter-repo availability varies. The examples do not configure a hosted account or publish a repository.</p><ul>${book.references.map(([title, url]) => `<li><a href="${escape(url)}">${escape(title)} ↗</a></li>`).join("")}</ul>`;
  search.addEventListener("input", render);
  filter.addEventListener("change", render);
  $("#reset").addEventListener("click", () => {
    search.value = "";
    filter.value = "all";
    render();
  });
  document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-copy]");
    if (!button) return;
    const code =
      button.parentElement.nextElementSibling.querySelector("code").textContent;
    try {
      await navigator.clipboard.writeText(code);
      button.textContent = "Copied";
    } catch {
      button.textContent = "Select code to copy";
    }
    setTimeout(() => {
      if (button.isConnected) button.textContent = "Copy";
    }, 1800);
  });
  render();
})();
