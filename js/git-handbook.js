const topics = [
  [
    "Setup and configuration",
    [
      [
        "Set your commit identity",
        "git config set --global <key> <value>",
        "Set the author name and email used for new commits.",
        "git config set --global user.name \"Alex Morgan\"\ngit config set --global user.email \"alex@example.com\""
      ],
      [
        "Override identity for one repository",
        "git config set --local <key> <value>",
        "Override a global setting for the current repository.",
        "git config set --local user.email \"alex@acme.com\""
      ],
      [
        "Choose defaults",
        "git config set --global <key> <value>",
        "Set the initial branch name and commit-message editor.",
        "git config set --global init.defaultBranch main\ngit config set --global core.editor \"code --wait\""
      ],
      [
        "Inspect configuration",
        "git config list --show-origin",
        "List effective settings and the files they came from.",
        "git config list --show-origin"
      ],
      [
        "Read command help",
        "git help <command>",
        "Open the manual for a Git command.",
        "git help restore"
      ]
    ]
  ],
  [
    "Starting and cloning repositories",
    [
      [
        "Initialize a repository",
        "git init -b <branch> [directory]",
        "Create a repository with an explicit initial branch.",
        "git init -b main client-portal"
      ],
      [
        "Clone a repository",
        "git clone <url> [directory]",
        "Download a repository and its history, setting up origin.",
        "git clone https://github.com/acme/client-portal.git portal"
      ],
      [
        "Clone one branch",
        "git clone --branch <branch> --single-branch <url>",
        "Clone history for just the selected branch.",
        "git clone --branch release/2.4 --single-branch https://github.com/acme/client-portal.git"
      ]
    ]
  ],
  [
    "Staging and committing",
    [
      [
        "Check working state",
        "git status --short --branch",
        "Show the branch plus staged, unstaged, and untracked paths.",
        "git status --short --branch"
      ],
      [
        "Stage selected files",
        "git add -- <path>…",
        "Stage the current contents of selected paths.",
        "git add -- src/auth.js tests/auth.test.js"
      ],
      [
        "Stage all changes",
        "git add -A",
        "Stage additions, modifications, and deletions throughout the repository.",
        "git add -A"
      ],
      [
        "Stage selected hunks",
        "git add -p [-- <path>]",
        "Interactively select parts of a change to stage.",
        "git add -p -- src/auth.js"
      ],
      [
        "Unstage a file",
        "git restore --staged -- <path>",
        "Restore the index from HEAD while keeping working-tree edits.",
        "git restore --staged -- src/auth.js"
      ],
      [
        "Commit staged changes",
        "git commit -m <message>",
        "Record the staged snapshot with a message.",
        "git commit -m \"Fix expired session redirect\""
      ],
      [
        "Rename a tracked file",
        "git mv <old-path> <new-path>",
        "Move a tracked path and stage the rename.",
        "git mv src/login.js src/auth.js"
      ],
      [
        "Stop tracking a file",
        "git rm --cached -- <path>",
        "Stage removal from Git while leaving the local file on disk.",
        "git rm --cached -- .env",
        "The file remains in earlier commits; rotate any exposed secrets and add the path to .gitignore."
      ]
    ]
  ],
  [
    "Viewing history and diffs",
    [
      [
        "Browse recent history",
        "git log --oneline --graph --decorate -n <count>",
        "Show a compact commit graph with branch and tag labels.",
        "git log --oneline --graph --decorate -n 20"
      ],
      [
        "Find commits by message",
        "git log --all --grep=<pattern>",
        "Search commit messages across all refs.",
        "git log --all --grep=\"session\""
      ],
      [
        "Follow file history",
        "git log --follow -- <path>",
        "Show a single file’s history across renames.",
        "git log --follow -- src/auth.js"
      ],
      [
        "Review unstaged changes",
        "git diff [-- <path>]",
        "Compare tracked working-tree files with the index; untracked files are excluded.",
        "git diff -- src/auth.js"
      ],
      [
        "Review staged changes",
        "git diff --staged [-- <path>]",
        "Compare the index with HEAD before committing.",
        "git diff --staged -- src/auth.js"
      ],
      [
        "Compare branch tips",
        "git diff <base>..<branch>",
        "Compare the snapshots at two branch tips.",
        "git diff main..feature/login"
      ],
      [
        "Review changes since branching",
        "git diff <base>...<branch>",
        "Compare the common ancestor with the named branch tip.",
        "git diff main...feature/login"
      ],
      [
        "Inspect a commit",
        "git show <commit>",
        "Show a commit’s message and patch.",
        "git show a1b2c3d"
      ],
      [
        "Find who changed lines",
        "git blame -L <start>,<end> -- <path>",
        "Show the last commit and author for a range of lines.",
        "git blame -L 40,65 -- src/auth.js"
      ]
    ]
  ],
  [
    "Branching and merging",
    [
      [
        "List branches and tracking",
        "git branch -vv",
        "List local branches, their tips, and upstream relationships.",
        "git branch -vv"
      ],
      [
        "Switch branches",
        "git switch <branch>",
        "Move to an existing local branch; older equivalent: git checkout <branch>.",
        "git switch main"
      ],
      [
        "Create and switch branches",
        "git switch -c <branch> [start-point]",
        "Create a branch and switch to it; older equivalent: git checkout -b <branch>.",
        "git switch -c feature/login main"
      ],
      [
        "Track a remote branch",
        "git switch --track <remote>/<branch>",
        "Create a local branch that tracks a fetched remote branch.",
        "git switch --track origin/release/2.4"
      ],
      [
        "Rename a branch",
        "git branch -m <old-name> <new-name>",
        "Rename a local branch.",
        "git branch -m feature/login feature/sign-in"
      ],
      [
        "Delete a merged branch",
        "git branch -d <branch>",
        "Delete a local branch only if Git considers it merged into its upstream or HEAD.",
        "git branch -d feature/login"
      ],
      [
        "Force-delete a branch",
        "git branch -D <branch>",
        "Delete a local branch without checking whether it was merged.",
        "git branch -D experiment/login",
        "Discards the branch reference even if its commits are unmerged; save needed commits first."
      ],
      [
        "Merge a branch",
        "git merge <branch>",
        "Integrate a branch into the current branch, fast-forwarding when possible.",
        "git switch main\ngit merge feature/login"
      ],
      [
        "Finish or abort a conflicted merge",
        "git merge --continue | git merge --abort",
        "After resolving and staging conflicts, continue; abort instead to cancel the merge.",
        "git add -- src/auth.js\ngit merge --continue\n# To cancel instead:\ngit merge --abort"
      ],
      [
        "Replay commits on a new base",
        "git rebase <upstream>",
        "Replay current-branch commits on another base.",
        "git switch feature/login\ngit rebase main",
        "Rewrites replayed commits with new IDs; coordinate before rebasing commits others use."
      ],
      [
        "Continue or abort a rebase",
        "git rebase --continue | git rebase --abort",
        "Continue after resolving and staging conflicts, or return to the pre-rebase state.",
        "git add -- src/auth.js\ngit rebase --continue\n# To cancel instead:\ngit rebase --abort"
      ],
      [
        "Apply a specific commit",
        "git cherry-pick <commit>",
        "Apply an existing commit’s change as a new commit on the current branch.",
        "git cherry-pick a1b2c3d"
      ]
    ]
  ],
  [
    "Syncing with remotes",
    [
      [
        "Inspect remotes",
        "git remote -v",
        "List remote names and their fetch/push URLs.",
        "git remote -v"
      ],
      [
        "Add a remote",
        "git remote add <name> <url>",
        "Register a remote repository.",
        "git remote add origin git@github.com:acme/client-portal.git"
      ],
      [
        "Change a remote URL",
        "git remote set-url <name> <url>",
        "Update the URL for an existing remote.",
        "git remote set-url origin git@github.com:acme/client-portal.git"
      ],
      [
        "Fetch and prune stale refs",
        "git fetch --prune <remote>",
        "Download remote history and remove stale remote-tracking branches without merging.",
        "git fetch --prune origin"
      ],
      [
        "Pull with fast-forward only",
        "git pull --ff-only [remote branch]",
        "Fetch and advance the current branch only if no merge commit is needed.",
        "git switch main\ngit pull --ff-only origin main"
      ],
      [
        "Pull with rebase",
        "git pull --rebase [remote branch]",
        "Fetch and replay local commits on the fetched branch.",
        "git pull --rebase origin feature/login",
        "Rewrites replayed local commits; avoid rebasing shared history without coordination."
      ],
      [
        "Publish a branch",
        "git push -u <remote> <branch>",
        "Push a branch and set its upstream for later pull/push commands.",
        "git push -u origin feature/login"
      ],
      [
        "Push tracked branch",
        "git push",
        "Push using configured upstream and push settings (normally the same-named upstream branch).",
        "git push"
      ],
      [
        "Replace remote history with a lease",
        "git push --force-with-lease <remote> <branch>",
        "Allow a non-fast-forward update only if the remote ref matches your expected value.",
        "git push --force-with-lease origin feature/login",
        "Replaces remote history; the default lease uses your remote-tracking ref, which background fetches can refresh, so review the remote tip first."
      ],
      [
        "Force a remote update",
        "git push --force <remote> <branch>",
        "Replace the remote branch tip without the lease check.",
        "git push --force origin feature/login",
        "Can remove teammates’ commits from the remote branch; prefer a reviewed --force-with-lease update."
      ],
      [
        "Delete a remote branch",
        "git push <remote> --delete <branch>",
        "Remove a branch from the remote repository.",
        "git push origin --delete feature/login",
        "Deletes the shared branch reference; confirm nobody still needs it."
      ]
    ]
  ],
  [
    "Undoing and fixing mistakes",
    [
      [
        "Discard unstaged file edits",
        "git restore -- <path>",
        "Replace a tracked working-tree file with its staged version; older equivalent: git checkout -- <path>.",
        "git restore -- src/auth.js",
        "Discards unstaged edits in the selected file; Git cannot recover edits it never recorded."
      ],
      [
        "Restore a file from a commit",
        "git restore --source=<commit> -- <path>",
        "Replace a working-tree file with its version from a commit, leaving the index unchanged.",
        "git restore --source=HEAD~1 -- src/auth.js",
        "Overwrites current working-tree edits in the selected file; save them first."
      ],
      [
        "Amend the latest commit",
        "git commit --amend [-m <message> | --no-edit]",
        "Replace the latest commit with the current index and an updated or unchanged message.",
        "git add -- tests/auth.test.js\ngit commit --amend --no-edit",
        "Rewrites the latest commit ID; coordinate before amending a commit already pushed."
      ],
      [
        "Undo a published commit",
        "git revert <commit>",
        "Create a new commit that reverses a commit’s changes without rewriting history.",
        "git revert a1b2c3d"
      ],
      [
        "Undo a commit, keep changes staged",
        "git reset --soft <commit>",
        "Move the branch tip while leaving the index and working tree unchanged.",
        "git reset --soft HEAD~1",
        "Rewrites the current branch history; use on local commits or coordinate with collaborators."
      ],
      [
        "Undo a commit, keep changes unstaged",
        "git reset --mixed <commit>",
        "Move the branch tip and reset the index while keeping working-tree files.",
        "git reset --mixed HEAD~1",
        "Rewrites branch history and replaces staging selections; working-tree edits remain."
      ],
      [
        "Reset and discard local work",
        "git reset --hard <commit>",
        "Move the branch tip and reset the index and working tree to a commit.",
        "git reset --hard HEAD~1",
        "Rewrites branch history and discards tracked edits; untracked paths obstructing tracked files may also be deleted."
      ],
      [
        "Edit or squash recent commits",
        "git rebase -i <base>",
        "Open an interactive plan to reorder, edit, squash, or drop commits after a base.",
        "git rebase -i HEAD~3",
        "Rewrites affected commit IDs and can drop commits; avoid rewriting shared history without agreement."
      ],
      [
        "Find previous branch tips",
        "git reflog [show <ref>]",
        "List locally recorded ref movements to locate a commit after a mistake.",
        "git reflog show feature/login"
      ],
      [
        "Recover a commit on a new branch",
        "git switch -c <branch> <commit>",
        "Create a branch at a commit found in the reflog, without moving the original branch.",
        "git switch -c recovery/login a1b2c3d"
      ],
      [
        "Preview untracked-file cleanup",
        "git clean -nd",
        "List untracked files and directories that a cleanup would remove; ignored paths are excluded.",
        "git clean -nd"
      ],
      [
        "Delete untracked files and directories",
        "git clean -fd",
        "Delete untracked files and directories, excluding ignored paths.",
        "git clean -fd",
        "Permanently deletes untracked work that Git cannot restore; inspect git clean -nd first (adding -x also deletes ignored files)."
      ]
    ]
  ],
  [
    "Stashing",
    [
      [
        "Save work temporarily",
        "git stash push [-u] -m <message>",
        "Stash tracked changes and reset them locally; -u also includes untracked files.",
        "git stash push -u -m \"WIP login validation\""
      ],
      [
        "List saved work",
        "git stash list",
        "List stash entries, newest first.",
        "git stash list"
      ],
      [
        "Inspect a stash",
        "git stash show -p --include-untracked <stash>",
        "Show a stash patch including saved untracked files.",
        "git stash show -p --include-untracked 'stash@{0}'"
      ],
      [
        "Apply without removing",
        "git stash apply [--index] <stash>",
        "Apply a stash while keeping it saved; --index also attempts to restore staging.",
        "git stash apply --index 'stash@{1}'"
      ],
      [
        "Apply and remove on success",
        "git stash pop <stash>",
        "Apply a stash and remove it only if application succeeds; conflicts keep it saved.",
        "git stash pop 'stash@{0}'"
      ],
      [
        "Delete a saved stash",
        "git stash drop <stash>",
        "Remove a single stash entry.",
        "git stash drop 'stash@{1}'",
        "Removes the saved recovery reference; unreferenced stash contents can eventually be pruned."
      ]
    ]
  ],
  [
    "Tagging",
    [
      [
        "List release tags",
        "git tag --list <pattern>",
        "List tags matching a wildcard pattern.",
        "git tag --list 'v2.*'"
      ],
      [
        "Create an annotated release tag",
        "git tag -a <tag> [commit] -m <message>",
        "Create a tag with a message, tagger identity, and date.",
        "git tag -a v2.4.0 -m \"Release 2.4.0\""
      ],
      [
        "Inspect a tag",
        "git show <tag>",
        "Show the tag annotation and the tagged commit.",
        "git show v2.4.0"
      ],
      [
        "Push one tag",
        "git push <remote> tag <tag>",
        "Publish a specific tag; ordinary branch pushes do not publish all tags.",
        "git push origin tag v2.4.0"
      ],
      [
        "Delete a local tag",
        "git tag -d <tag>",
        "Remove a tag from this repository only.",
        "git tag -d v2.4.0-rc1",
        "Deletes the local tag reference; published copies remain until separately removed."
      ],
      [
        "Delete a remote tag",
        "git push <remote> --delete refs/tags/<tag>",
        "Remove a specific tag from the remote.",
        "git push origin --delete refs/tags/v2.4.0-rc1",
        "Removes a shared release reference; coordinate because other clones may retain the tag."
      ]
    ]
  ]
];
const nav = document.querySelector("#nav");
const content = document.querySelector("#content");
const search = document.querySelector("#search");
const count = document.querySelector("#count");
function slug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
function render() {
  const q = search.value.trim().toLowerCase();
  content.replaceChildren();
  nav.replaceChildren();
  let total = 0;
  for (const [category, entries] of topics) {
    const matches = entries.filter(([name, syntax, description, example, risk = ""]) =>
      (category + " " + name + " " + syntax + " " + description + " " + example + " " + risk)
        .toLowerCase()
        .includes(q),
    );
    if (!matches.length) continue;
    const id = slug(category);
    const link = document.createElement("a");
    link.href = "#" + id;
    link.textContent = category + " (" + matches.length + ")";
    nav.append(link);
    const section = document.createElement("section");
    section.id = id;
    const h2 = document.createElement("h2");
    h2.textContent = category;
    section.append(h2);
    for (const [name, syntax, description, example, risk] of matches) {
      total++;
      const article = document.createElement("article");
      article.className = "entry";
      const h3 = document.createElement("h3");
      h3.textContent = name;
      const p = document.createElement("p");
      p.textContent = description;
      const head = document.createElement("div");
      head.className = "example-head";
      const label = document.createElement("span");
      label.textContent = "Example";
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "Copy code";
      const hasExample = syntax !== example;
      button.setAttribute("aria-label", (hasExample ? "Copy example for " : "Copy syntax for ") + name);
      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(example);
          button.textContent = "Copied!";
          setTimeout(() => (button.textContent = "Copy code"), 1400);
        } catch {
          button.textContent = "Copy unavailable";
        }
      });
      head.append(label, button);
      const pre = document.createElement("pre");
      const code = document.createElement("code");
      code.textContent = example;
      pre.append(code);
      const syntaxLabel = document.createElement("div");
      syntaxLabel.className = "example-head";
      syntaxLabel.textContent = "Syntax";
      const syntaxPre = document.createElement("pre");
      const syntaxCode = document.createElement("code");
      syntaxCode.textContent = syntax;
      syntaxPre.append(syntaxCode);
      article.append(h3, p, syntaxLabel, syntaxPre);
      if (risk) {
        const warning = document.createElement("p");
        warning.className = "risk";
        warning.textContent = "Caution: " + risk;
        article.append(warning);
      }
      if (hasExample) {
        article.append(head, pre);
      } else {
        syntaxLabel.append(button);
      }
      section.append(article);
    }
    content.append(section);
  }
  count.textContent = total + " entries";
  if (!total) {
    const p = document.createElement("p");
    p.className = "empty";
    p.textContent = "No matching commands. Try a task, command, or filename.";
    content.append(p);
  }
}
search.addEventListener("input", render);
render();
