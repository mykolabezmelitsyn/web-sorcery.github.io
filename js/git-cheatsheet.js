/* Add only Git categories supplied by the user, in image order. */
const handbook = {
  categories: [
    {
      name: "Setup",
      id: "setup",
      intro:
        "Install and configure Git. Choose the installation instructions for your operating system, then verify Git and set your commit identity. Run commands yourself in a terminal; this page only displays them.",
      methods: [
        {
          name: "Install Git on macOS",
          explanation:
            "Installs Git with Homebrew so it is available from your terminal. Use this method on a Mac that already has Homebrew installed.",
          note: "Run in Terminal. If Homebrew is not installed, follow its official installation instructions first. Package-manager commands install software on your computer.",
          source: "https://git-scm.com/install/mac",
          examples: [
            {
              label: "Quick reference — install with Homebrew",
              language: "bash",
              code: "brew install git",
            },
            {
              label: "Install and verify the available Git command",
              language: "bash",
              code: "brew install git\ngit --version",
            },
          ],
        },
        {
          name: "Install Git on Windows",
          explanation:
            "Installs Git for Windows with Windows Package Manager. Use the exact package ID and source to select the intended package.",
          note: "Run winget in PowerShell or Command Prompt with Windows Package Manager available. After installation, open a new terminal so PATH changes are picked up. The winget package can lag the installer published by Git for Windows.",
          source: "https://git-scm.com/install/windows",
          examples: [
            {
              label: "Quick reference — install the exact Git package",
              language: "powershell",
              code: "winget install --id Git.Git -e --source winget",
            },
            {
              label: "Verify Git in a new terminal after installation",
              language: "powershell",
              code: "# Open a new PowerShell or Command Prompt after installation.\ngit --version",
            },
          ],
        },
        {
          name: "Install Git on Ubuntu or Debian",
          explanation:
            "Installs Git from the distribution’s APT repositories. Refresh package metadata first when preparing a new machine.",
          note: "Requires an APT-based distribution and permission to use sudo. The available Git version depends on your distribution’s configured repositories.",
          source: "https://git-scm.com/install/linux",
          examples: [
            {
              label: "Quick reference — refresh metadata and install Git",
              language: "bash",
              code: "sudo apt update\nsudo apt install git",
            },
            {
              label: "Install using recently refreshed metadata and verify",
              language: "bash",
              code: "# Use this after package metadata has already been refreshed.\nsudo apt install git\ngit --version",
            },
          ],
        },
        {
          name: "git --version",
          explanation:
            "Prints the version of the Git executable found by your shell. Use it to confirm installation before configuring Git.",
          note: "Version output varies by platform and installed release. If the command is not found after installation, reopen the terminal and check that Git is on PATH.",
          source: "https://git-scm.com/docs/git",
          examples: [
            {
              label: "Quick reference — print the installed version",
              language: "bash",
              code: "git --version",
            },
            {
              label:
                "Show the executable selected by a POSIX shell, then its version",
              language: "bash",
              code: "# macOS/Linux shell or Git Bash:\ncommand -v git\ngit --version",
            },
          ],
        },
        {
          name: "git config --global user.name",
          explanation:
            "Sets the author and committer name used for future commits by your user account. Choose the name you want recorded in commit metadata.",
          note: "Replace the placeholder with your own name. This is a commit identity, not a hosting-service login; repository settings can override the global value. Existing commits are unchanged.",
          source:
            "https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup",
          examples: [
            {
              label: "Quick reference — set your commit name",
              language: "bash",
              code: 'git config --global user.name "Your Name"',
            },
            {
              label: "Set and read back a name containing spaces",
              language: "bash",
              code: 'git config --global user.name "Alex Morgan"\ngit config --global user.name\n# Alex Morgan',
            },
          ],
        },
        {
          name: "git config --global user.email",
          explanation:
            "Sets the email address recorded in future commits by your user account. Use an address appropriate for the repositories you work on.",
          note: "Replace the example address before running. The address is stored in commit metadata, which may be shared when you publish commits; it does not configure authentication. Repository settings can override it.",
          source:
            "https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup",
          examples: [
            {
              label: "Quick reference — set your commit email",
              language: "bash",
              code: 'git config --global user.email "you@example.com"',
            },
            {
              label: "Set and verify the stored global address",
              language: "bash",
              code: '# Replace this sample address with your own.\ngit config --global user.email "alex@example.com"\ngit config --global user.email\n# alex@example.com',
            },
          ],
        },
        {
          name: "git config --global init.defaultBranch",
          explanation:
            "Sets the initial branch name for repositories you create in the future. Use main to make your preferred naming explicit.",
          note: "Supported since Git 2.28. This does not rename branches in existing repositories or change the default branch on a remote hosting service; an explicit initialization option can override it.",
          source: "https://git-scm.com/docs/git-init",
          examples: [
            {
              label: "Quick reference — default new repositories to main",
              language: "bash",
              code: "git config --global init.defaultBranch main",
            },
            {
              label: "Set and read back the initial branch preference",
              language: "bash",
              code: "git config --global init.defaultBranch main\ngit config --global init.defaultBranch\n# main",
            },
          ],
        },
      ],
    },
    {
      name: "Getting Started",
      id: "getting-started",
      intro:
        "Initial Setup → Create & Clone Repositories → .gitignore, following all six images. Repeated identity settings are retained in this category as supplied. Configuration examples show intentional changes to your settings; repository and ignore examples belong in practice repositories. The local clone fixture below needs Git 2.28+ and no network or account. Each clone example uses its own destination; rerun the fixture to get fresh destinations when repeating examples.",
      setup: [
        {
          label:
            "Optional offline fixture — prepare repositories for the clone examples",
          language: "bash",
          code: '# POSIX shell or Git Bash. Keep this shell open for the clone examples.\n# Everything is created in a fresh temporary directory.\ngit_practice=$(mktemp -d)\ngit init -b main "$git_practice/dependency"\ngit -C "$git_practice/dependency" -c user.name="Demo User" -c user.email="demo@example.com" commit --allow-empty -m "Dependency baseline"\ngit init -b main "$git_practice/source-repo"\ngit -C "$git_practice/source-repo" -c user.name="Demo User" -c user.email="demo@example.com" commit --allow-empty -m "First snapshot"\ngit -C "$git_practice/source-repo" -c protocol.file.allow=always submodule add "$git_practice/dependency" vendor/dependency\ngit -C "$git_practice/source-repo" -c user.name="Demo User" -c user.email="demo@example.com" commit -m "Add dependency"\ngit -C "$git_practice/source-repo" branch develop\nmkdir "$git_practice/clones"\ncd "$git_practice/clones"',
        },
      ],
      methods: [
        {
          name: "git config --global user.name",
          explanation:
            "Sets the name recorded in future commits for your user account. Use your own preferred commit identity.",
          note: "Replace sample names before running. This does not authenticate to a hosting service or rewrite existing commits.",
          examples: [
            {
              label: "Set your global commit name",
              language: "bash",
              code: 'git config --global user.name "Your Name"',
            },
            {
              label: "Set and verify a name with spaces",
              language: "bash",
              code: 'git config --global user.name "Alex Morgan"\ngit config --global user.name\n# Alex Morgan',
            },
          ],
          source: "https://git-scm.com/docs/git-config",
        },
        {
          name: "git config --global user.email",
          explanation:
            "Sets the email address used for future commits. Choose an address suitable for the repositories where you publish work.",
          note: "Commit metadata can be public; this is not a login credential. A repository-specific setting can override the global value.",
          examples: [
            {
              label: "Set your commit email",
              language: "bash",
              code: 'git config --global user.email "you@example.com"',
            },
            {
              label: "Read back the stored global address",
              language: "bash",
              code: 'git config --global user.email "alex@example.com"\ngit config --global user.email\n# alex@example.com',
            },
          ],
          source: "https://git-scm.com/docs/git-config",
        },
        {
          name: "git config --global init.defaultBranch",
          explanation:
            "Chooses the initial branch name for newly initialized repositories. Set it explicitly for a consistent starting name.",
          note: "Requires Git 2.28 or later. Existing local branches and remote default-branch settings are unchanged.",
          examples: [
            {
              label: "Default future repositories to main",
              language: "bash",
              code: "git config --global init.defaultBranch main",
            },
            {
              label: "Verify the configured initial branch name",
              language: "bash",
              code: "git config --global init.defaultBranch main\ngit config --global init.defaultBranch\n# main",
            },
          ],
          source: "https://git-scm.com/docs/git-config",
        },
        {
          name: "git config --list",
          explanation:
            "Lists configuration values Git reads in the current context. Use it to inspect your effective setup.",
          note: "The same key can appear from multiple files; later applicable values can override earlier ones. Run inside the intended repository to include its local settings.",
          examples: [
            {
              label: "List settings in the current context",
              language: "bash",
              code: "git config --list",
            },
            {
              label: "Show each setting’s source file",
              language: "bash",
              code: "git config --list --show-origin",
            },
          ],
          source: "https://git-scm.com/docs/git-config",
        },
        {
          name: "Global vs local configuration",
          explanation:
            "Global settings apply to your user account; local settings apply to one repository. Use a local identity when a project needs a different name.",
          note: "Run the local example inside an existing practice repository. Omitting a scope when writing defaults to local; the --local read makes the chosen scope explicit.",
          examples: [
            {
              label: "Set a default for your repositories",
              language: "bash",
              code: 'git config --global user.name "Personal Name"\ngit config --global user.name',
            },
            {
              label: "Override only the current repository",
              language: "bash",
              code: '# Run inside a Git repository.\ngit config user.name "Work Name"\ngit config --local user.name\n# Work Name',
            },
          ],
          source: "https://git-scm.com/docs/git-config",
        },
        {
          name: "git config --global core.editor",
          explanation:
            "Selects the editor Git invokes when it needs an editable message. The --wait argument makes VS Code keep Git waiting until the file closes.",
          note: "Requires the code command installed on PATH. This changes configuration without launching an editor.",
          examples: [
            {
              label: "Use VS Code and wait for the file to close",
              language: "bash",
              code: 'git config --global core.editor "code --wait"',
            },
            {
              label: "Verify the stored editor command",
              language: "bash",
              code: 'git config --global core.editor "code --wait"\ngit config --global core.editor\n# code --wait',
            },
          ],
          source: "https://git-scm.com/docs/git-config",
        },
        {
          name: "git config --global pull.rebase",
          explanation:
            "Selects merge rather than rebase as the default integration method for pulls when set to false. Use it when you want to preserve existing commit identities during integration.",
          note: "false does not force a merge commit: a pull can fast-forward. Other settings such as pull.ff and command-line options can constrain behavior.",
          examples: [
            {
              label: "Choose merge-based pull integration",
              language: "bash",
              code: "git config --global pull.rebase false",
            },
            {
              label: "Verify the configured pull preference",
              language: "bash",
              code: "git config --global pull.rebase false\ngit config --global pull.rebase\n# false",
            },
          ],
          source: "https://git-scm.com/docs/git-config",
        },
        {
          name: "git config --global merge.conflictstyle",
          explanation:
            "Selects how textual conflicts are displayed. diff3 includes the common ancestor alongside the two conflicting sides.",
          note: "Applies when Git writes conflict markers; setting it does not retroactively regenerate markers in files already conflicted.",
          examples: [
            {
              label: "Include ancestor text in future conflicts",
              language: "bash",
              code: "git config --global merge.conflictstyle diff3",
            },
            {
              label: "Verify the conflict marker style",
              language: "bash",
              code: "git config --global merge.conflictstyle diff3\ngit config --global merge.conflictstyle\n# diff3",
            },
          ],
          source: "https://git-scm.com/docs/git-config",
        },
        {
          name: "git init",
          explanation:
            "Initializes a repository in the current directory or a named directory. Use it when starting a project that has no Git history.",
          note: "Each example creates a fresh temporary practice workspace in a POSIX shell or Git Bash. Initialization alone creates no commits.",
          examples: [
            {
              label: "Initialize the current directory",
              language: "bash",
              code: 'git_practice=$(mktemp -d)\ncd "$git_practice"\ngit init',
            },
            {
              label: "Initialize a named project directory",
              language: "bash",
              code: 'git_practice=$(mktemp -d)\ncd "$git_practice"\ngit init my-project',
            },
          ],
          source: "https://git-scm.com/docs/git-init",
        },
        {
          name: "git clone",
          explanation:
            "Copies a repository and checks out its default branch. Supply a destination to choose the new folder name.",
          note: "Run the local repository fixture below first, then run examples in the same shell. The default directory for source-repo is source-repo in the current clone workspace; the source lives one level higher.",
          examples: [
            {
              label: "Clone using the source-derived directory name",
              language: "bash",
              code: 'cd "$git_practice/clones"\ngit clone ../source-repo',
            },
            {
              label: "Choose the destination directory",
              language: "bash",
              code: 'cd "$git_practice/clones"\ngit clone ../source-repo custom-copy',
            },
          ],
          source: "https://git-scm.com/docs/git-clone",
        },
        {
          name: "git clone -b",
          explanation:
            "Checks out the specified branch after cloning. Use it to begin work on a nondefault branch.",
          note: "-b selects the initial checkout; it does not by itself limit the clone to that one branch. The fixture provides develop.",
          examples: [
            {
              label: "Start on the develop branch",
              language: "bash",
              code: 'cd "$git_practice/clones"\ngit clone -b develop ../source-repo develop-copy',
            },
            {
              label: "Select main explicitly",
              language: "bash",
              code: 'cd "$git_practice/clones"\ngit clone -b main ../source-repo main-copy',
            },
          ],
          source: "https://git-scm.com/docs/git-clone",
        },
        {
          name: "git clone --depth",
          explanation:
            "Creates a shallow clone with a limited history. Use it when a task only needs recent commits.",
          note: "A depth limit normally implies a single branch. A plain local path ignores --depth, so these offline examples use a file:// URL.",
          examples: [
            {
              label: "Fetch only the latest commit",
              language: "bash",
              code: 'cd "$git_practice/clones"\ngit clone --depth 1 "file://$git_practice/source-repo" shallow-copy',
            },
            {
              label: "Keep two commits of history",
              language: "bash",
              code: 'cd "$git_practice/clones"\ngit clone --depth 2 "file://$git_practice/source-repo" two-commit-copy',
            },
          ],
          source: "https://git-scm.com/docs/git-clone",
        },
        {
          name: "git clone --recurse-submodules",
          explanation:
            "Initializes and checks out the cloned repository’s recorded submodules, including nested ones. Use it when the project depends on submodule working trees.",
          note: "--recursive is an alias. The fixture has one trusted local submodule; the command-scoped file transport permission below is only for that offline demo. Normal HTTPS submodule URLs do not need it, and private submodules require their own access.",
          examples: [
            {
              label:
                "Clone with the recursive alias for the trusted local fixture",
              language: "bash",
              code: 'cd "$git_practice/clones"\ngit -c protocol.file.allow=always clone --recursive ../source-repo recursive-copy',
            },
            {
              label: "Use the explicit recurse-submodules spelling",
              language: "bash",
              code: 'cd "$git_practice/clones"\ngit -c protocol.file.allow=always clone --recurse-submodules ../source-repo submodule-copy',
            },
          ],
          source: "https://git-scm.com/docs/git-clone",
        },
        {
          name: "git clone --single-branch",
          explanation:
            "Restricts the clone’s branch history and usual future fetch mapping to one selected branch. Combine it with -b to name that branch.",
          note: "This limits branch selection, not history depth. The source fixture has main and develop so you can observe the difference.",
          examples: [
            {
              label: "Clone only develop",
              language: "bash",
              code: 'cd "$git_practice/clones"\ngit clone --single-branch -b develop ../source-repo develop-only',
            },
            {
              label: "Clone only main",
              language: "bash",
              code: 'cd "$git_practice/clones"\ngit clone --single-branch -b main ../source-repo main-only',
            },
          ],
          source: "https://git-scm.com/docs/git-clone",
        },
        {
          name: "Clone a private repository over HTTPS",
          explanation:
            "Uses an HTTPS repository URL and your configured authentication flow to obtain a private repository. Supplying a username can help identify the account.",
          note: "Use a repository you can access and a new destination folder. GitHub does not accept an account password for Git HTTPS; use a credential manager or a suitably authorized token when prompted. An existing helper may handle authentication without a prompt. Never embed a token in the URL.",
          examples: [
            {
              label: "Prompt for a private HTTPS repository URL",
              language: "bash",
              code: '# Bash, macOS/Linux shell, or Git Bash; enter the URL when asked.\nprintf "Private repository HTTPS URL: "\nread -r private_repo_url\ngit clone "$private_repo_url" private-copy',
            },
            {
              label: "Include your GitHub username without a token",
              language: "bash",
              code: 'printf "GitHub username: "\nread -r github_user\nprintf "Repository owner: "\nread -r github_owner\nprintf "Repository name: "\nread -r github_repo\ngit clone "https://${github_user}@github.com/${github_owner}/${github_repo}.git" private-github-copy',
            },
          ],
          source:
            "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github",
        },
        {
          name: ".gitignore — common project patterns",
          explanation:
            "Lists untracked paths Git should ignore. Put shared project rules in the repository’s .gitignore file.",
          note: "Save these as file contents, not shell commands. Each block is an alternative for a root .gitignore. Ignore rules do not untrack existing files or remove secrets from past commits.",
          examples: [
            {
              label: "Node project outputs, local settings, and logs",
              language: "none",
              code: "# .gitignore — repository root\nnode_modules/\n.env\n.env.local\ndist/\nbuild/\n*.log\n.DS_Store\n.vscode/\n.idea/",
            },
            {
              label: "A smaller project-specific ignore file",
              language: "none",
              code: "# .gitignore — repository root\nnode_modules/\ndist/\n.env.local\n*.log",
            },
          ],
          source: "https://git-scm.com/docs/gitignore",
        },
        {
          name: "git rm --cached",
          explanation:
            "Removes a file from the index while leaving its working copy on disk. Use it to stop tracking a file that should now be ignored.",
          note: "Requires the named file to be tracked and acceptable to git rm’s index checks. This stages a removal for the next commit; it does not erase earlier history. Commit the ignore rule with the staged removal.",
          examples: [
            {
              label: "Stop tracking a local environment file",
              language: "bash",
              code: '# In a practice repository where .env is already tracked:\nprintf "\\n.env\\n" >> .gitignore\ngit rm --cached -- .env',
            },
            {
              label: "Stop tracking an already committed log",
              language: "bash",
              code: '# In a practice repository where debug.log is already tracked:\nprintf "\\n*.log\\n" >> .gitignore\ngit rm --cached -- debug.log',
            },
          ],
          source: "https://git-scm.com/docs/git-rm",
        },
        {
          name: "git rm -r --cached",
          explanation:
            "Recursively removes tracked directory contents from the index while preserving local files. Use it for generated folders accidentally committed to a project.",
          note: "Run only for the specified tracked generated folder; the removal is staged for the next commit. Avoid clearing the entire index just to fix one directory.",
          examples: [
            {
              label: "Untrack a build output directory",
              language: "bash",
              code: '# In a practice repository with tracked dist files:\nprintf "\\ndist/\\n" >> .gitignore\ngit rm -r --cached -- dist/',
            },
            {
              label: "Untrack an installed dependency directory",
              language: "bash",
              code: '# In a practice repository with tracked node_modules files:\nprintf "\\nnode_modules/\\n" >> .gitignore\ngit rm -r --cached -- node_modules/',
            },
          ],
          source: "https://git-scm.com/docs/git-rm",
        },
        {
          name: ".gitignore — wildcard patterns",
          explanation:
            "Matches filenames with wildcard patterns such as *.log. Use it when a filename extension identifies generated content.",
          note: "These are .gitignore contents. A pattern without a slash can match names at any depth. Put comments on their own lines; trailing # text is part of a pattern, not an inline comment.",
          examples: [
            {
              label: "Ignore log files anywhere",
              language: "none",
              code: "*.log",
            },
            {
              label: "Ignore logs and temporary suffixes",
              language: "none",
              code: "# Generated logs\n*.log\n# Temporary files\n*.tmp",
            },
          ],
          source: "https://git-scm.com/docs/gitignore",
        },
        {
          name: ".gitignore — negation",
          explanation:
            "Uses a leading ! to re-include paths excluded by an earlier pattern. Place the exception after the broad rule.",
          note: "An ignored parent directory prevents traversal; re-include the parent or avoid excluding it if you need exceptions within it.",
          examples: [
            {
              label: "Keep an important log",
              language: "none",
              code: "*.log\n!important.log",
            },
            {
              label: "Keep one explicitly named root log",
              language: "none",
              code: "*.log\n!/important.log",
            },
          ],
          source: "https://git-scm.com/docs/gitignore",
        },
        {
          name: ".gitignore — directory patterns",
          explanation:
            "A trailing slash limits a pattern to directories. Use it for generated folders without excluding a regular file of the same name.",
          note: "build/ matches directories named build at any depth; /build/ anchors the rule at the location of this root .gitignore.",
          examples: [
            {
              label: "Ignore build directories anywhere",
              language: "none",
              code: "build/",
            },
            {
              label: "Ignore only the root build directory",
              language: "none",
              code: "/build/",
            },
          ],
          source: "https://git-scm.com/docs/gitignore",
        },
        {
          name: ".gitignore — root-relative paths",
          explanation:
            "A leading slash anchors a rule to the directory containing that .gitignore. In a root ignore file, it targets a root-relative path.",
          note: "A nested .gitignore has its own relative base. Ignoring a file is not access control or secret cleanup.",
          examples: [
            {
              label: "Ignore only secret.txt in the repository root",
              language: "none",
              code: "/secret.txt",
            },
            {
              label: "Ignore one root-local environment file",
              language: "none",
              code: "/.env.local",
            },
          ],
          source: "https://git-scm.com/docs/gitignore",
        },
        {
          name: ".gitignore — recursive ** patterns",
          explanation:
            "Uses ** for recursive directory matching in supported slash-separated patterns. Use it for generated directories that may appear at different depths.",
          note: "A leading **/ can match zero or more directories. Thus **/temp matches a path named temp at any depth; add a trailing slash when it must be a directory.",
          examples: [
            {
              label: "Match temp paths at every depth",
              language: "none",
              code: "**/temp",
            },
            {
              label: "Limit the rule to temp directories",
              language: "none",
              code: "**/temp/",
            },
          ],
          source: "https://git-scm.com/docs/gitignore",
        },
        {
          name: ".gitignore — directory-scoped wildcards",
          explanation:
            "Combines directory paths with filename wildcards to limit a rule’s reach. Use it to ignore generated files only under a specific folder.",
          note: "docs/*.pdf matches PDFs immediately inside docs, not in nested docs folders. docs/**/*.pdf also reaches nested directories.",
          examples: [
            {
              label: "Ignore PDFs directly inside docs",
              language: "none",
              code: "docs/*.pdf",
            },
            {
              label: "Include nested documentation folders too",
              language: "none",
              code: "docs/**/*.pdf",
            },
          ],
          source: "https://git-scm.com/docs/gitignore",
        },
        {
          name: "git config --global core.excludesfile",
          explanation:
            "Points Git at a personal ignore file used across repositories. Use it for editor or operating-system clutter that is not project policy.",
          note: "Run in a POSIX shell or Git Bash. The examples append to one user ignore file and replace this global setting; retain any existing personal rules you need. Already tracked files remain tracked.",
          examples: [
            {
              label: "Ignore personal macOS metadata",
              language: "bash",
              code: 'git config --global core.excludesfile "$HOME/.gitignore_global"\nprintf "\\n.DS_Store\\n" >> "$HOME/.gitignore_global"',
            },
            {
              label: "Add personal IDE directories to the same file",
              language: "bash",
              code: 'git config --global core.excludesfile "$HOME/.gitignore_global"\nprintf "\\n.idea/\\n" >> "$HOME/.gitignore_global"',
            },
          ],
          source: "https://git-scm.com/docs/git-config",
        },
        {
          name: "git check-ignore -v",
          explanation:
            "Explains whether a path matches an ignore rule and shows the source file, line, and pattern. Use it when ignore behavior is unclear.",
          note: "Run inside the repository. Tracked files are normally omitted; --no-index lets you inspect patterns as though they were untracked. Exit 1 usually means no path was ignored. A reported ! pattern is an exception, not an ignored result.",
          examples: [
            {
              label: "Explain an untracked log file",
              language: "bash",
              code: "# With *.log in the root .gitignore:\ngit check-ignore -v -- debug.log",
            },
            {
              label: "Diagnose a path even when already tracked",
              language: "bash",
              code: "# With .env in the root .gitignore:\ngit check-ignore -v --no-index -- .env",
            },
          ],
          source: "https://git-scm.com/docs/git-check-ignore",
        },
        {
          name: "Generate a starter .gitignore",
          explanation:
            "Downloads a stack-specific ignore template from the gitignore.io service. Review the result and merge appropriate rules into your project.",
          note: "Requires curl and network access. -f makes HTTP errors fail; -L follows redirects. Download to a separate new file so an existing .gitignore is not replaced. Shell examples refuse to overwrite the named output.",
          examples: [
            {
              label: "Download the Node and macOS template to a new file",
              language: "bash",
              code: '(set -C; curl -fL "https://www.toptal.com/developers/gitignore/api/node,macos" > .gitignore.generated)',
            },
            {
              label: "Download a Node-only starter for review",
              language: "bash",
              code: '(set -C; curl -fL "https://www.toptal.com/developers/gitignore/api/node" > .gitignore.node)',
            },
          ],
          source: "https://www.toptal.com/developers/gitignore",
        },
      ],
    },
    {
      name: "Making Changes",
      id: "making-changes",
      intro:
        "Check Status & Differences → Stage & Commit Changes, in the order shown across your four images. Every example uses a fresh copy of the practice fixture below. It supplies two commits on main, a staged-and-edited README, two separated source hunks, a whitespace-only edit, a tracked deletion, and untracked files. Commit and interactive examples change only that practice repository when you run them there; signed examples additionally need your own signing setup.",
      setup: [
        {
          label: "Practice fixture — run afresh before each example",
          language: "bash",
          code: "# Run this before EACH independent example in a POSIX shell or Git Bash.\n# Keep the same shell open; the fixture leaves you inside its new repository.\ngit_changes=$(mktemp -d)\ncd \"$git_changes\"\ngit init -b main\ngit config user.name \"Demo User\"\ngit config user.email \"demo@example.com\"\nmkdir src\nprintf 'Original introduction\\n' > README.md\nprintf 'Outside source subtree\\n' > outside.txt\nprintf 'one two\\n' > spacing.txt\nprintf 'Old generated file\\n' > obsolete.txt\nprintf 'const first = 1;\\n' > src/app.js\nfor line in 1 2 3 4 5 6 7 8 9 10 11 12; do\n  printf '// unchanged context %s\\n' \"$line\" >> src/app.js\ndone\nprintf 'const last = 1;\\n' >> src/app.js\ngit add .\ngit commit -m \"Initial practice snapshot\"\nprintf 'Current introduction\\n' > README.md\ngit add -- README.md\ngit commit -m \"Improve introduction\"\nprintf 'Staged introduction\\n' > README.md\ngit add -- README.md\nprintf 'Staged introduction with more detail\\n' > README.md\nprintf 'Outside source subtree changed\\n' > outside.txt\nprintf 'one    two\\n' > spacing.txt\nprintf 'const first = 2;\\n' > src/app.js\nfor line in 1 2 3 4 5 6 7 8 9 10 11 12; do\n  printf '// unchanged context %s\\n' \"$line\" >> src/app.js\ndone\nprintf 'const last = 2;\\n' >> src/app.js\n# Delete only this disposable fixture file.\nrm obsolete.txt\nprintf 'New project notes\\n' > new.txt\nprintf 'New source notes\\n' > src/new.txt",
        },
      ],
      methods: [
        {
          name: "git status",
          explanation:
            "Reports the state of the index and working tree, including untracked files. Use it before staging or committing to understand what Git sees.",
          note: "The fixture deliberately includes staged, unstaged, deleted, and untracked paths. Status describes changes; it does not show line-by-line patches.",
          examples: [
            {
              label: "Inspect the whole practice repository",
              language: "bash",
              code: "git status",
            },
            {
              label: "Limit the report to source files",
              language: "bash",
              code: "git status -- src/",
            },
          ],
          source: "https://git-scm.com/docs/git-status",
        },
        {
          name: "git status -s",
          explanation:
            "Shows a compact status report. Use it for a quick scan of staged and unstaged changes.",
          note: "For tracked files the first column describes the index and the second the working tree; ?? denotes an untracked path. A file can have changes in both columns.",
          examples: [
            {
              label: "Show short status",
              language: "bash",
              code: "git status -s",
            },
            {
              label: "Inspect the staged-and-edited README",
              language: "bash",
              code: "git status -s -- README.md\n# MM README.md",
            },
          ],
          source: "https://git-scm.com/docs/git-status",
        },
        {
          name: "git diff",
          explanation:
            "Compares the working tree with the index. Use it to inspect tracked edits that have not yet been staged.",
          note: "Untracked file contents are omitted. A staged file can still appear if it was edited again after staging.",
          examples: [
            {
              label: "Inspect unstaged tracked changes",
              language: "bash",
              code: "git diff",
            },
            {
              label: "Inspect unstaged edits to one source file",
              language: "bash",
              code: "git diff -- src/app.js",
            },
          ],
          source: "https://git-scm.com/docs/git-diff",
        },
        {
          name: "git diff --staged",
          explanation:
            "Compares the index with HEAD to show the snapshot prepared for the next commit. Use it to review staged changes before saving them.",
          note: "--cached is an alias. On a branch with no commits yet, it can show all staged content.",
          examples: [
            {
              label: "Review the next commit’s staged patch",
              language: "bash",
              code: "git diff --staged",
            },
            {
              label: "Review only the staged README change",
              language: "bash",
              code: "git diff --staged -- README.md",
            },
          ],
          source: "https://git-scm.com/docs/git-diff",
        },
        {
          name: "git diff HEAD",
          explanation:
            "Compares tracked working-tree content with the current commit. Use it to see the net result of staged and unstaged edits together.",
          note: "Requires an existing HEAD commit. It omits untracked files and can hide staged changes canceled by later working-tree edits, so it is not a substitute for reviewing the index.",
          examples: [
            {
              label: "Review net tracked changes since HEAD",
              language: "bash",
              code: "git diff HEAD",
            },
            {
              label: "Review the net README change",
              language: "bash",
              code: "git diff HEAD -- README.md",
            },
          ],
          source: "https://git-scm.com/docs/git-diff",
        },
        {
          name: "git diff <branch>",
          explanation:
            "Compares the named branch tip with your current tracked working-tree content. Use it to see how your checkout differs from that saved snapshot.",
          note: "This one-revision form is not a comparison of two branch tips. The fixture provides main; replace it with an existing branch when using your own repository.",
          examples: [
            {
              label: "Compare the working tree with main",
              language: "bash",
              code: "git diff main",
            },
            {
              label: "Compare source content with main",
              language: "bash",
              code: "git diff main -- src/",
            },
          ],
          source: "https://git-scm.com/docs/git-diff",
        },
        {
          name: "git diff --stat",
          explanation:
            "Summarizes changed paths and line counts. Use it to judge the size of a change before reading its patch.",
          note: "Without a revision or --staged, this summarizes unstaged tracked changes. Binary files may be summarized differently from text.",
          examples: [
            {
              label: "Summarize unstaged changes",
              language: "bash",
              code: "git diff --stat",
            },
            {
              label: "Summarize staged changes",
              language: "bash",
              code: "git diff --staged --stat",
            },
          ],
          source: "https://git-scm.com/docs/git-diff",
        },
        {
          name: "git diff --name-only",
          explanation:
            "Prints changed path names without patch bodies. Use it when you only need the affected files.",
          note: "Its comparison scope follows the other diff arguments; untracked paths are not included.",
          examples: [
            {
              label: "List unstaged changed paths",
              language: "bash",
              code: "git diff --name-only",
            },
            {
              label: "List paths prepared for the next commit",
              language: "bash",
              code: "git diff --staged --name-only",
            },
          ],
          source: "https://git-scm.com/docs/git-diff",
        },
        {
          name: "git diff --cached",
          explanation:
            "Shows the same index-to-HEAD comparison as --staged. Use whichever spelling is familiar to your team.",
          note: "With a named commit, it compares that commit to the index instead. -- separates paths from revision arguments.",
          examples: [
            {
              label: "Review all cached changes",
              language: "bash",
              code: "git diff --cached",
            },
            {
              label: "Review the cached README patch",
              language: "bash",
              code: "git diff --cached -- README.md",
            },
          ],
          source: "https://git-scm.com/docs/git-diff",
        },
        {
          name: "git diff <file>",
          explanation:
            "Limits an unstaged comparison to a selected file or path. Use it when reviewing one part of your work.",
          note: "Use -- before the path to avoid ambiguity with branch or revision names. Quote paths that contain spaces.",
          examples: [
            {
              label: "Inspect one unstaged source file",
              language: "bash",
              code: "git diff -- src/app.js",
            },
            {
              label: "Inspect the README’s edits after staging",
              language: "bash",
              code: "git diff -- README.md",
            },
          ],
          source: "https://git-scm.com/docs/git-diff",
        },
        {
          name: "git diff <commit> <file>",
          explanation:
            "Compares a commit’s version of a path with the current working-tree version. Use it to inspect that file against a known historical baseline.",
          note: "HEAD names the current commit and HEAD~1 its first parent. The fixture creates two commits so both examples resolve.",
          examples: [
            {
              label: "Compare a file with the current commit",
              language: "bash",
              code: "git diff HEAD -- README.md",
            },
            {
              label: "Compare a file with the preceding commit",
              language: "bash",
              code: "git diff HEAD~1 -- README.md",
            },
          ],
          source: "https://git-scm.com/docs/git-diff",
        },
        {
          name: "git diff --word-diff",
          explanation:
            "Shows changes as word-level additions and removals. Use it for prose or edits where line-level output is too coarse.",
          note: "The default plain mode surrounds removals with [- -] and additions with {+ +}; delimiter text in the input can make output ambiguous.",
          examples: [
            {
              label: "Review words changed in the README",
              language: "bash",
              code: "git diff --word-diff -- README.md",
            },
            {
              label: "Review the staged wording change",
              language: "bash",
              code: "git diff --staged --word-diff -- README.md",
            },
          ],
          source: "https://git-scm.com/docs/git-diff",
        },
        {
          name: "git diff -w",
          explanation:
            "Ignores whitespace when comparing lines. Use it to separate substantive edits from whitespace-only formatting changes.",
          note: "Line boundaries still matter. This affects display only; the original file contents and index are unchanged.",
          examples: [
            {
              label: "Hide the fixture’s spacing-only edit",
              language: "bash",
              code: "git diff -w -- spacing.txt\n# No output: only spacing changed.",
            },
            {
              label: "Review substantive changes across tracked files",
              language: "bash",
              code: "git diff -w",
            },
          ],
          source: "https://git-scm.com/docs/git-diff",
        },
        {
          name: "git add <file>",
          explanation:
            "Copies the selected path’s current content into the index. Use it to choose specific files for the next commit.",
          note: "Later edits require another add. A named tracked path can also stage its deletion; ignored files are normally excluded.",
          examples: [
            {
              label: "Stage a new file",
              language: "bash",
              code: "git add -- new.txt",
            },
            {
              label: "Stage a tracked source file",
              language: "bash",
              code: "git add -- src/app.js",
            },
          ],
          source: "https://git-scm.com/docs/git-add",
        },
        {
          name: "git add .",
          explanation:
            "Stages additions, modifications, and deletions beneath the current directory. Use it when that directory defines the intended scope of your next snapshot.",
          note: "On current Git, it includes deletions within that path scope. From a subdirectory it does not stage unstaged changes outside that subtree.",
          examples: [
            {
              label: "Stage the repository tree from its root",
              language: "bash",
              code: "git add .",
            },
            {
              label: "Stage only the source subtree",
              language: "bash",
              code: "cd src\ngit add .",
            },
          ],
          source: "https://git-scm.com/docs/git-add",
        },
        {
          name: "git add -A",
          explanation:
            "Stages additions, modifications, and deletions across the working tree when no pathspec is supplied. Use it when you intend to include all eligible changes.",
          note: "Unlike git add . from a subdirectory, the pathspec-free -A covers the whole repository. Ignored untracked files remain excluded; review the result before committing.",
          examples: [
            {
              label: "Stage all eligible changes from the root",
              language: "bash",
              code: "git add -A",
            },
            {
              label: "Stage the whole repository from a subdirectory",
              language: "bash",
              code: "cd src\ngit add -A",
            },
          ],
          source: "https://git-scm.com/docs/git-add",
        },
        {
          name: "git add -p",
          explanation:
            "Lets you choose individual tracked change hunks to stage. Use it to split unrelated edits into separate commits.",
          note: "At each prompt, y stages a hunk, n skips it, and q stops. This does not stage ordinary untracked file contents. The source fixture has two separated hunks.",
          examples: [
            {
              label: "Choose hunks across tracked files",
              language: "bash",
              code: "git add -p",
            },
            {
              label: "Choose hunks in one source file",
              language: "bash",
              code: "git add -p -- src/app.js\n# Choose y for the first hunk and n for the second.",
            },
          ],
          source: "https://git-scm.com/docs/git-add",
        },
        {
          name: "git commit -m",
          explanation:
            "Creates a commit from the index using the supplied message. Use it after reviewing a deliberately staged snapshot.",
          note: "Unstaged and untracked content is not automatically included. The fixture already has a staged README edit; global hooks and signing settings in your environment can affect a commit.",
          examples: [
            {
              label: "Commit the already staged snapshot",
              language: "bash",
              code: 'git commit -m "Update project introduction"',
            },
            {
              label: "Stage one additional file, then commit the index",
              language: "bash",
              code: 'git add -- new.txt\ngit commit -m "Add project notes"',
            },
          ],
          source: "https://git-scm.com/docs/git-commit",
        },
        {
          name: "git commit -am",
          explanation:
            "Stages tracked modifications and deletions, then commits with a message. Use it when your intended changes involve files Git already tracks.",
          note: "It does not automatically add untracked files. Content already staged in the index is also part of the commit.",
          examples: [
            {
              label: "Commit tracked edits and deletions",
              language: "bash",
              code: 'git commit -am "Update tracked project files"',
            },
            {
              label: "Explicitly add a new file before using -am",
              language: "bash",
              code: 'git add -- new.txt\ngit commit -am "Update files and add notes"',
            },
          ],
          source: "https://git-scm.com/docs/git-commit",
        },
        {
          name: "git commit --amend",
          explanation:
            "Replaces the current tip commit with a new commit using the index and an editable message. Use it to correct your latest unpublished commit.",
          note: "Amending rewrites commit identity and may include all currently staged changes. Coordinate before changing commits other people already use. The editor must be configured and saved with a nonempty message.",
          examples: [
            {
              label: "Amend the tip using the already staged changes",
              language: "bash",
              code: "git commit --amend\n# Edit the message, save, and close the editor.",
            },
            {
              label: "Include a selected file while amending",
              language: "bash",
              code: "git add -- src/app.js\ngit commit --amend\n# Edit the message, save, and close the editor.",
            },
          ],
          source: "https://git-scm.com/docs/git-commit",
        },
        {
          name: "git add -i",
          explanation:
            "Opens an interactive staging menu. Use it to select files or move into patch-level staging from one interface.",
          note: "Choose update to stage tracked changes, add untracked to select new files, or patch to choose hunks. Follow the displayed prompts and quit when finished.",
          examples: [
            {
              label: "Open the repository’s staging menu",
              language: "bash",
              code: "git add -i",
            },
            {
              label: "Limit interactive staging to source paths",
              language: "bash",
              code: "git add -i -- src/",
            },
          ],
          source: "https://git-scm.com/docs/git-add",
        },
        {
          name: "git commit",
          explanation:
            "Commits the index and opens your configured editor for a message. Use it when a message needs more detail than a one-line shell argument.",
          note: "The fixture includes staged content. Enter a subject, optionally a blank line and explanatory body, then save and close; an empty message normally aborts.",
          examples: [
            {
              label: "Write a commit message in the editor",
              language: "bash",
              code: "git commit\n# Enter a message, save, and close the editor.",
            },
            {
              label: "Stage a new file and write a detailed message",
              language: "bash",
              code: "git add -- new.txt\ngit commit\n# Subject line, blank line, explanatory body; then save and close.",
            },
          ],
          source: "https://git-scm.com/docs/git-commit",
        },
        {
          name: "git commit -v",
          explanation:
            "Includes the staged patch in the commit-message editor for review. Use it to write a message while seeing what the index contains.",
          note: "The displayed diff is not added to the commit message. A second -v also displays tracked unstaged changes for context; those are not automatically committed.",
          examples: [
            {
              label: "Review the staged patch while writing a message",
              language: "bash",
              code: "git commit -v\n# Write the message above the displayed diff; save and close.",
            },
            {
              label: "Also show unstaged tracked changes as context",
              language: "bash",
              code: "git commit -v -v\n# Only the staged snapshot is committed.",
            },
          ],
          source: "https://git-scm.com/docs/git-commit",
        },
        {
          name: "git commit --amend -m",
          explanation:
            "Replaces the tip commit and supplies its message directly on the command line. Use it when you want to correct the latest unpublished message.",
          note: "Any staged changes are included too. In the fixture, the README is staged, so these examples update content as well as the message.",
          examples: [
            {
              label:
                "Replace the tip message and include current staged content",
              language: "bash",
              code: 'git commit --amend -m "Clarify project introduction"',
            },
            {
              label: "Include a new file and replace the tip message",
              language: "bash",
              code: 'git add -- new.txt\ngit commit --amend -m "Document project and add notes"',
            },
          ],
          source: "https://git-scm.com/docs/git-commit",
        },
        {
          name: "git commit --amend --no-edit",
          explanation:
            "Replaces the latest commit using staged content while preserving its message. Use it to add a small correction to an unpublished commit.",
          note: "The commit ID changes even though the message is kept. It does not include unstaged work unless you first stage that work.",
          examples: [
            {
              label:
                "Add the staged README correction without changing the message",
              language: "bash",
              code: "git commit --amend --no-edit",
            },
            {
              label: "Add a source correction and retain the message",
              language: "bash",
              code: "git add -- src/app.js\ngit commit --amend --no-edit",
            },
          ],
          source: "https://git-scm.com/docs/git-commit",
        },
        {
          name: "git commit -S",
          explanation:
            "Creates a cryptographically signed commit using the configured signing backend and key. Use it when verifiable commit signatures are required.",
          note: "Requires a working signing setup, key access, and any required agent or passphrase interaction. -S is uppercase; -s is a different feature (a sign-off trailer). Hosting-service verification also depends on its key and identity rules.",
          examples: [
            {
              label: "Sign with the configured default key",
              language: "bash",
              code: '# After configuring and verifying your signing key:\ngit commit -S -m "Signed project update"',
            },
            {
              label: "Select a signing key explicitly",
              language: "bash",
              code: '# Use a key identifier supported by your configured signing backend.\nprintf "Signing key identifier: "\nread -r signing_key\ngit commit -S"$signing_key" -m "Signed update with selected key"',
            },
          ],
          source: "https://git-scm.com/docs/git-commit",
        },
      ],
    },
    {
      name: "Branching",
      id: "branching",
      intro:
        "Branch Management → Merging → Rebasing → Cherry-pick, in the order of all eight supplied images. Run the fresh offline fixture before each independent example; its origin is a disposable local bare repository, so remote-delete and pull examples do not touch an online service. Commands need a clean worktree unless a conflict helper explicitly starts an operation. Interactive examples tell you exactly how to edit the todo; editor configuration must work. Rebase, amend, forced deletion, and hard-reset examples change or discard history in this practice repository.",
      setup: [
        {
          label:
            "Offline practice graph and verified conflict helpers — rerun before each example",
          language: "bash",
          code: '# POSIX shell or Git Bash, Git 2.28+. Run afresh BEFORE EACH example.\n# Keep this shell open so the helper functions remain available.\nbranch_lab=$(mktemp -d)\ngit init --bare "$branch_lab/origin.git"\ngit init -b main "$branch_lab/work"\ncd "$branch_lab/work"\ngit config user.name "Demo User"\ngit config user.email "demo@example.com"\nprintf \'Baseline content\\n\' > common.txt\ngit add .\ngit commit -m "Practice baseline"\ngit branch base\ngit branch release/1.x\ngit branch fast-base\ngit branch merged-demo\ngit branch merged-demo-two\ngit switch -c feature\nprintf \'Feature one\\n\' > feature-one.txt\ngit add .\ngit commit -m "Add feature one"\nprintf \'Feature two\\n\' > feature-two.txt\ngit add .\ngit commit -m "Add feature two"\nprintf \'Feature three\\n\' > feature-three.txt\ngit add .\ngit commit -m "Add feature three"\ngit branch topic-copy\ngit branch discard-demo\ngit branch discard-demo-two\ngit switch -c conflict base\nprintf \'Incoming content\\n\' > common.txt\ngit add .\ngit commit -m "Change common text on incoming side"\nprintf \'Independent follow-up\\n\' > followup.txt\ngit add .\ngit commit -m "Add incoming follow-up"\ngit switch main\nprintf \'Main content\\n\' > common.txt\ngit add .\ngit commit -m "Fix common text on main"\ngit branch current-side\ngit switch -c merge-source\ngit merge --no-ff feature -m "Practice source merge"\ngit switch main\ngit remote add origin "$branch_lab/origin.git"\ngit push origin main feature conflict release/1.x\ngit push origin feature:refs/heads/remote-topic feature:refs/heads/remote-topic-two\ngit push origin base:refs/heads/remote-obsolete base:refs/heads/remote-obsolete-two\ngit --git-dir="$branch_lab/origin.git" symbolic-ref HEAD refs/heads/main\n\n# Helpers intentionally provoke a conflict and verify it really occurred.\nstart_merge_conflict() {\n  git switch main || return\n  if git merge conflict -m "Practice conflict"; then\n    printf \'Expected a merge conflict in this fresh fixture.\\n\' >&2\n    return 1\n  fi\n  test -n "$(git ls-files -u)"\n}\nstart_rebase_conflict() {\n  git switch conflict || return\n  if git rebase main; then\n    printf \'Expected a rebase conflict in this fresh fixture.\\n\' >&2\n    return 1\n  fi\n  test -n "$(git ls-files -u)"\n}\nstart_pick_conflict() {\n  git switch main || return\n  if git cherry-pick conflict~1 conflict; then\n    printf \'Expected a cherry-pick conflict in this fresh fixture.\\n\' >&2\n    return 1\n  fi\n  test -n "$(git ls-files -u)"\n}',
        },
      ],
      methods: [
        {
          name: "git branch",
          explanation:
            "Lists local branches and marks the current one. Use it to inspect the branches available in this repository.",
          note: "A branch is a reference to a commit; listing branches does not fetch remote changes.",
          source: "https://git-scm.com/docs/git-branch",
          examples: [
            {
              label: "List all local branches",
              language: "bash",
              code: "git branch",
            },
            {
              label: "Filter local branch names",
              language: "bash",
              code: 'git branch --list "*feature*"',
            },
          ],
        },
        {
          name: "git branch -r",
          explanation:
            "Lists locally stored remote-tracking branches. Use it to inspect your last known view of a remote.",
          note: "These references can be stale until fetched or pruned; this command does not contact the remote.",
          source: "https://git-scm.com/docs/git-branch",
          examples: [
            {
              label: "List remote-tracking references",
              language: "bash",
              code: "git branch -r",
            },
            {
              label: "Filter references under origin",
              language: "bash",
              code: 'git branch -r --list "origin/remote-*"',
            },
          ],
        },
        {
          name: "git branch -a",
          explanation:
            "Lists both local and remote-tracking branches. Use it to compare the two sets of names.",
          note: "Remote-tracking entries describe cached remote state, not a live server listing.",
          source: "https://git-scm.com/docs/git-branch",
          examples: [
            {
              label: "Show both branch sets",
              language: "bash",
              code: "git branch -a",
            },
            {
              label: "Filter both sets by name",
              language: "bash",
              code: 'git branch -a --list "*feature*"',
            },
          ],
        },
        {
          name: "git switch -c",
          explanation:
            "Creates a branch at the chosen starting point and switches to it. Use it to start a new line of work.",
          note: "Requires Git 2.23+. The name must be new; the worktree must allow a safe switch.",
          source: "https://git-scm.com/docs/git-switch",
          examples: [
            {
              label: "Create a branch at the current commit",
              language: "bash",
              code: "git switch -c work/login",
            },
            {
              label: "Create a branch from another starting point",
              language: "bash",
              code: "git switch -c work/from-base base",
            },
          ],
        },
        {
          name: "git switch",
          explanation:
            "Switches to an existing local branch. Use it to work on a different branch’s snapshot.",
          note: "A switch can carry compatible local changes or refuse if they would be overwritten; it is not an automatic cleanup.",
          source: "https://git-scm.com/docs/git-switch",
          examples: [
            {
              label: "Switch to the feature branch",
              language: "bash",
              code: "git switch feature",
            },
            {
              label: "Visit a branch and return to the previous one",
              language: "bash",
              code: "git switch feature\ngit switch -",
            },
          ],
        },
        {
          name: "git checkout -b",
          explanation:
            "Creates and checks out a branch using the older combined checkout command. Use it when maintaining workflows that predate git switch.",
          note: "For branch-only work, switch -c expresses the intent more clearly. The starting revision is optional.",
          source: "https://git-scm.com/docs/git-checkout",
          examples: [
            {
              label: "Create a branch at HEAD",
              language: "bash",
              code: "git checkout -b work/legacy",
            },
            {
              label: "Create a branch at the fixture baseline",
              language: "bash",
              code: "git checkout -b work/legacy-base base",
            },
          ],
        },
        {
          name: "git checkout <branch>",
          explanation:
            "Checks out an existing branch using checkout. Use it when following an older branch-switching workflow.",
          note: "checkout also restores paths and can detach HEAD when given a commit; switch avoids that overload for branch navigation.",
          source: "https://git-scm.com/docs/git-checkout",
          examples: [
            {
              label: "Check out the feature branch",
              language: "bash",
              code: "git checkout feature",
            },
            {
              label: "Return to main",
              language: "bash",
              code: "git checkout feature\ngit checkout main",
            },
          ],
        },
        {
          name: "git branch -d",
          explanation:
            "Deletes a local branch after Git’s merged-history check succeeds. Use it to remove completed branch references.",
          note: "Git checks reachability from the branch’s upstream when configured, otherwise from HEAD. A branch checked out in any worktree cannot be deleted; this does not delete a remote branch.",
          source: "https://git-scm.com/docs/git-branch",
          examples: [
            {
              label: "Delete a fixture branch already merged into main",
              language: "bash",
              code: "git branch -d merged-demo",
            },
            {
              label: "Delete another branch at the baseline",
              language: "bash",
              code: "git branch -d merged-demo-two",
            },
          ],
        },
        {
          name: "git branch -D",
          explanation:
            "Deletes a local branch without the merged-history safety check. Use it only when intentionally discarding that branch reference.",
          note: "Unmerged commits can become unreachable if no other references retain them. This still refuses a branch checked out in a worktree and does not delete remote branches. The fixture retains feature as another reference.",
          source: "https://git-scm.com/docs/git-branch",
          examples: [
            {
              label: "Discard an unmerged practice branch",
              language: "bash",
              code: "git branch -D discard-demo",
            },
            {
              label: "Discard a second unmerged practice branch",
              language: "bash",
              code: "git branch -D discard-demo-two",
            },
          ],
        },
        {
          name: "git branch -m",
          explanation:
            "Renames a local branch, or the current branch when only a new name is supplied. Use it to correct a local branch name.",
          note: "The local reflog and branch configuration move with it; remote branch names do not change. -m refuses to overwrite an existing destination name.",
          source: "https://git-scm.com/docs/git-branch",
          examples: [
            {
              label: "Rename a branch without switching to it",
              language: "bash",
              code: "git branch -m feature renamed-feature",
            },
            {
              label: "Rename the current branch",
              language: "bash",
              code: "git switch feature\ngit branch -m current-feature",
            },
          ],
        },
        {
          name: "git branch -u",
          explanation:
            "Sets the upstream of an existing local branch. Use it to connect local work with a remote-tracking reference already present.",
          note: "This does not fetch, push, or switch branches. The configured upstream influences status and argument-free integration commands.",
          source: "https://git-scm.com/docs/git-branch",
          examples: [
            {
              label: "Set the current main branch upstream",
              language: "bash",
              code: "git branch -u origin/main",
            },
            {
              label: "Set another local branch upstream explicitly",
              language: "bash",
              code: "git branch -u origin/feature feature",
            },
          ],
        },
        {
          name: "git switch --track",
          explanation:
            "Creates and switches to a local branch with an upstream derived from a remote-tracking branch. Use it when starting local work on a remote branch.",
          note: "The remote-tracking reference must already exist; --track does not fetch it. The fixture has remote-topic names that have no local counterparts yet.",
          source: "https://git-scm.com/docs/git-switch",
          examples: [
            {
              label: "Create a tracking branch with its inferred name",
              language: "bash",
              code: "git switch --track origin/remote-topic",
            },
            {
              label: "Choose the local tracking branch name",
              language: "bash",
              code: "git switch -c review-topic --track origin/remote-topic-two",
            },
          ],
        },
        {
          name: "git branch -v",
          explanation:
            "Lists branches with abbreviated commit IDs and commit subjects. Use it for a quick view of branch tips.",
          note: "It summarizes tips rather than complete histories.",
          source: "https://git-scm.com/docs/git-branch",
          examples: [
            {
              label: "Inspect local branch tips",
              language: "bash",
              code: "git branch -v",
            },
            {
              label: "Inspect remote-tracking tips",
              language: "bash",
              code: "git branch -r -v",
            },
          ],
        },
        {
          name: "git branch -vv",
          explanation:
            "Adds upstream details to verbose branch listings. Use it to inspect tracking relationships and locally known ahead/behind status.",
          note: "Set an upstream first if needed. Ahead/behind information depends on the remote-tracking references you have fetched.",
          source: "https://git-scm.com/docs/git-branch",
          examples: [
            {
              label: "Inspect a configured main upstream",
              language: "bash",
              code: "git branch -u origin/main\ngit branch -vv",
            },
            {
              label: "Inspect local and remote-tracking details together",
              language: "bash",
              code: "git branch -u origin/feature feature\ngit branch -a -vv",
            },
          ],
        },
        {
          name: "git branch --merged",
          explanation:
            "Lists branches whose tips are reachable from the selected commit. Use it to identify history already contained in the current branch or another baseline.",
          note: "Defaults to HEAD. Reachability does not prove that deleting a name is operationally appropriate.",
          source: "https://git-scm.com/docs/git-branch",
          examples: [
            {
              label: "List branches merged into the current main tip",
              language: "bash",
              code: "git branch --merged",
            },
            {
              label: "Use main explicitly as the reachability baseline",
              language: "bash",
              code: "git branch --merged main",
            },
          ],
        },
        {
          name: "git branch --no-merged",
          explanation:
            "Lists branches whose tips are not reachable from the selected commit. Use it to find history that has not been integrated.",
          note: "Defaults to HEAD. It does not detect equivalent changes applied by squash or cherry-pick.",
          source: "https://git-scm.com/docs/git-branch",
          examples: [
            {
              label: "Find branches not merged into current main",
              language: "bash",
              code: "git branch --no-merged",
            },
            {
              label: "Compare against the original baseline",
              language: "bash",
              code: "git branch --no-merged base",
            },
          ],
        },
        {
          name: "git push origin --delete",
          explanation:
            "Requests deletion of a branch on origin. Use it to remove a remote branch after confirming that collaborators no longer need it.",
          note: "This is a remote write, subject to permissions and branch protection. The examples target only the fixture’s disposable local bare origin; local branch names are not deleted.",
          source: "https://git-scm.com/docs/git-push",
          examples: [
            {
              label: "Delete the first disposable remote branch",
              language: "bash",
              code: "git push origin --delete remote-obsolete",
            },
            {
              label: "Delete another disposable remote branch",
              language: "bash",
              code: "git push origin --delete remote-obsolete-two",
            },
          ],
        },
        {
          name: "git merge",
          explanation:
            "Integrates another branch into the current branch. Use it to combine completed work with your destination branch.",
          note: "A fast-forward may move the destination pointer without a merge commit. The fixture starts on main and has cleanly mergeable feature work; a message is supplied if a merge commit is needed.",
          source: "https://git-scm.com/docs/git-merge",
          examples: [
            {
              label: "Merge feature into main",
              language: "bash",
              code: 'git merge feature -m "Merge feature work"',
            },
            {
              label: "Merge feature into the release practice branch",
              language: "bash",
              code: 'git switch release/1.x\ngit merge feature -m "Integrate feature into release"',
            },
          ],
        },
        {
          name: "git merge --no-ff",
          explanation:
            "Creates a merge commit when integrating work even if a fast-forward is possible. Use it when the integration boundary should remain visible.",
          note: "If the source is already contained in the destination, Git reports that it is up to date rather than manufacturing a merge.",
          source: "https://git-scm.com/docs/git-merge",
          examples: [
            {
              label: "Record the integration on main",
              language: "bash",
              code: 'git merge --no-ff feature -m "Merge feature with history boundary"',
            },
            {
              label:
                "Keep an explicit merge boundary on a fast-forwardable branch",
              language: "bash",
              code: 'git switch fast-base\ngit merge --no-ff feature -m "Record feature integration"',
            },
          ],
        },
        {
          name: "git merge --ff-only",
          explanation:
            "Allows integration only when the destination can fast-forward. Use it to prevent an unexpected merge commit.",
          note: "It fails without changing the branch when histories have diverged. The fixture’s fast-base can fast-forward to feature, but main cannot.",
          source: "https://git-scm.com/docs/git-merge",
          examples: [
            {
              label: "Fast-forward a baseline branch to feature",
              language: "bash",
              code: "git switch fast-base\ngit merge --ff-only feature",
            },
            {
              label: "Observe refusal for diverged history",
              language: "bash",
              code: 'if git merge --ff-only feature; then\n  printf "Fast-forward succeeded\\n"\nelse\n  printf "No fast-forward: main and feature have diverged in this fixture.\\n"\nfi',
            },
          ],
        },
        {
          name: "git merge --squash",
          explanation:
            "Prepares the combined changes in the index and working tree without recording a merge commit or second parent. Use it to make one new commit from a topic’s net changes.",
          note: "You must commit afterward. The source branch does not become an ancestor merely because its patch was squashed.",
          source: "https://git-scm.com/docs/git-merge",
          examples: [
            {
              label: "Prepare and commit one squashed feature change",
              language: "bash",
              code: 'git merge --squash feature\ngit commit -m "Deliver feature as one change"',
            },
            {
              label: "Squash onto the release practice branch",
              language: "bash",
              code: 'git switch release/1.x\ngit merge --squash feature\ngit commit -m "Backport feature snapshot"',
            },
          ],
        },
        {
          name: "git merge --abort",
          explanation:
            "Cancels an in-progress merge and attempts to restore the pre-merge state. Use it when a conflicted merge should be abandoned.",
          note: "It requires an active merge. Begin from a clean worktree: pre-existing uncommitted changes can make complete reconstruction difficult. The helper below deliberately creates and verifies a fixture conflict.",
          source: "https://git-scm.com/docs/git-merge",
          examples: [
            {
              label: "Abandon the fixture conflict",
              language: "bash",
              code: "start_merge_conflict\ngit merge --abort",
            },
            {
              label: "Inspect the conflict before abandoning it",
              language: "bash",
              code: "start_merge_conflict\ngit status -s\ngit merge --abort",
            },
          ],
        },
        {
          name: "git merge -X theirs",
          explanation:
            "Favors the incoming side for conflicting hunks during the normal merge strategy. Use it when that conflict policy is intentional.",
          note: "Nonconflicting changes from both sides still participate. This is not a whole-tree replacement; some conflict types can still need intervention.",
          source: "https://git-scm.com/docs/git-merge",
          examples: [
            {
              label: "Prefer incoming conflict hunks on main",
              language: "bash",
              code: 'git merge -X theirs conflict -m "Prefer incoming conflict text"',
            },
            {
              label: "Apply the incoming preference on another diverged target",
              language: "bash",
              code: 'git switch current-side\ngit merge -X theirs conflict -m "Integrate incoming conflict text"',
            },
          ],
        },
        {
          name: "git merge -X ours",
          explanation:
            "Favors the current side for conflicting hunks while still integrating nonconflicting incoming changes. Use it for an intentional hunk-level preference.",
          note: "This differs from the ours merge strategy (-s ours), which discards the other tree’s changes wholesale. The meanings of sides during a rebase differ from an ordinary merge.",
          source: "https://git-scm.com/docs/git-merge",
          examples: [
            {
              label: "Retain current conflicting text on main",
              language: "bash",
              code: 'git merge -X ours conflict -m "Keep current conflict text"',
            },
            {
              label: "Retain current conflict hunks on another target",
              language: "bash",
              code: 'git switch current-side\ngit merge -X ours conflict -m "Keep target conflict text"',
            },
          ],
        },
        {
          name: "git log ..<branch>",
          explanation:
            "Lists commits reachable from the named branch but not from HEAD. Use it to inspect incoming history before a merge.",
          note: "The omitted left endpoint in ..feature is HEAD. This shows commit reachability, not a simulated merge result.",
          source: "https://git-scm.com/docs/git-log",
          examples: [
            {
              label: "Inspect commits incoming from feature",
              language: "bash",
              code: "git log --oneline ..feature",
            },
            {
              label: "Inspect commits incoming from the conflict branch",
              language: "bash",
              code: "git log --oneline ..conflict",
            },
          ],
        },
        {
          name: "git diff ..<branch>",
          explanation:
            "Compares the HEAD tree with the named branch’s tree. Use it to inspect endpoint differences before deciding how to integrate.",
          note: "For diff, A..B means the same endpoint comparison as A B; it is not a combined merge diff. HEAD-only changes can appear as removals, and the command does not predict conflicts.",
          source: "https://git-scm.com/docs/git-diff",
          examples: [
            {
              label: "Compare current main with feature",
              language: "bash",
              code: "git diff ..feature",
            },
            {
              label: "Limit the endpoint comparison to one path",
              language: "bash",
              code: "git diff ..conflict -- common.txt",
            },
          ],
        },
        {
          name: "Complete a conflicted merge",
          explanation:
            "Stages resolved files and commits the resulting merge. Use it after replacing conflict markers with the intended combined content.",
          note: "Resolve every unmerged path before committing. The helper supplies a deterministic conflict; each example replaces its single conflicted file with an explicit resolution.",
          source: "https://git-scm.com/docs/git-merge",
          examples: [
            {
              label: "Resolve the fixture conflict and finish the merge",
              language: "bash",
              code: 'start_merge_conflict\nprintf "Resolved together\\n" > common.txt\ngit add -- common.txt\ngit commit -m "Resolve merge conflict"',
            },
            {
              label: "Review the resolved index before finishing",
              language: "bash",
              code: 'start_merge_conflict\nprintf "Main and incoming reconciled\\n" > common.txt\ngit add -- common.txt\ngit diff --staged\ngit commit -m "Integrate reconciled changes"',
            },
          ],
        },
        {
          name: "git revert -m 1",
          explanation:
            "Creates an inverse commit for a merge, comparing it with the merge’s first parent. Use it to undo the merged change without removing the merge from history.",
          note: "Inspect parent order before choosing -m 1: it is a parent number, not a message option. Reverting a merge affects what later merges consider already integrated; it is not a history erase.",
          source: "https://git-scm.com/docs/git-revert",
          examples: [
            {
              label: "Revert a merge created on the current main branch",
              language: "bash",
              code: 'git merge --no-ff feature -m "Integrate feature"\ngit revert -m 1 --no-edit HEAD',
            },
            {
              label:
                "Revert a merge on another destination with an editable message",
              language: "bash",
              code: 'git switch current-side\ngit merge --no-ff feature -m "Integrate feature"\ngit revert -m 1 HEAD',
            },
          ],
        },
        {
          name: "git rebase",
          explanation:
            "Replays the current branch’s selected commits onto another base. Use it to update unpublished topic work on top of a newer destination.",
          note: "Replayed commits generally receive new IDs. Start clean and coordinate before rewriting history others use; this is not the same operation as merging.",
          source: "https://git-scm.com/docs/git-rebase",
          examples: [
            {
              label: "Replay feature on top of main",
              language: "bash",
              code: "git switch feature\ngit rebase main",
            },
            {
              label: "Replay a named topic without switching first",
              language: "bash",
              code: "git rebase main feature",
            },
          ],
        },
        {
          name: "git rebase -i",
          explanation:
            "Opens an editable todo list for a commit range. Use it to review and reshape unpublished history.",
          note: "The fixture’s feature branch has three independent commits after base. The boundary commit itself is excluded; save a valid todo list to start the replay.",
          source: "https://git-scm.com/docs/git-rebase",
          examples: [
            {
              label: "Review the last three feature commits",
              language: "bash",
              code: "git switch feature\ngit rebase -i HEAD~3\n# Leave pick on all three lines, save, and close.",
            },
            {
              label: "Review all feature commits after the named baseline",
              language: "bash",
              code: "git switch feature\ngit rebase -i base\n# Leave pick on all three lines, save, and close.",
            },
          ],
        },
        {
          name: "Interactive rebase: pick",
          explanation:
            "Keeps and replays a commit listed in the todo file. Use it for commits whose content and message should remain in the sequence.",
          note: "Todo lines run from top to bottom, oldest first by default. Even picked commits can receive new IDs when their parents change.",
          source: "https://git-scm.com/docs/git-rebase",
          examples: [
            {
              label: "Keep all three commits in their original order",
              language: "bash",
              code: "git switch feature\ngit rebase -i HEAD~3\n# Keep pick on every line; save and close.",
            },
            {
              label: "Reorder independent commits while keeping their contents",
              language: "bash",
              code: "git switch feature\ngit rebase -i base\n# Keep pick, but move the last commit line above the first.\n# These fixture commits add separate files, so this reorder is independent.",
            },
          ],
        },
        {
          name: "Interactive rebase: reword",
          explanation:
            "Pauses for a new commit message while retaining the selected commit’s patch. Use it to clarify an unpublished message.",
          note: "Change pick to reword on the desired todo line. Save the todo and then the message editor opened by Git.",
          source: "https://git-scm.com/docs/git-rebase",
          examples: [
            {
              label: "Rewrite the first feature commit’s message",
              language: "bash",
              code: "git switch feature\ngit rebase -i HEAD~3\n# Change the FIRST pick to reword; keep the other two as pick.\n# Save the todo, then enter and save the new message.",
            },
            {
              label: "Rewrite the last feature commit’s message",
              language: "bash",
              code: "git switch feature\ngit rebase -i base\n# Change the LAST pick to reword; save, then edit its message.",
            },
          ],
        },
        {
          name: "Interactive rebase: edit",
          explanation:
            "Stops after applying a selected commit so you can amend it. Use it for a focused correction while rewriting unpublished history.",
          note: "Change the selected todo action to edit. When Git stops, amend deliberately, then continue the rebase.",
          source: "https://git-scm.com/docs/git-rebase",
          examples: [
            {
              label: "Edit the first feature commit",
              language: "bash",
              code: 'git switch feature\ngit rebase -i HEAD~3\n# In the todo: set the FIRST action to edit; save and close.\n# After Git stops at that commit:\ngit commit --amend -m "Clarify first feature step"\ngit rebase --continue',
            },
            {
              label: "Edit the last feature commit",
              language: "bash",
              code: 'git switch feature\ngit rebase -i base\n# In the todo: set the LAST action to edit; save and close.\ngit commit --amend -m "Clarify final feature step"\ngit rebase --continue',
            },
          ],
        },
        {
          name: "Interactive rebase: squash",
          explanation:
            "Combines a commit with the preceding todo commit and opens a combined message for editing. Use it to present related changes as one logical commit.",
          note: "A squash line needs a preceding retained commit. Git offers the component messages for editing; the resulting commit has one final message.",
          source: "https://git-scm.com/docs/git-rebase",
          examples: [
            {
              label: "Combine the first two feature commits",
              language: "bash",
              code: "git switch feature\ngit rebase -i HEAD~3\n# Set the SECOND action to squash, leaving first and third as pick.\n# Save the todo, then review and save the combined message.",
            },
            {
              label: "Combine the final two feature commits",
              language: "bash",
              code: "git switch feature\ngit rebase -i base\n# Set the THIRD action to squash; retain the first two as pick.\n# Review and save the combined message.",
            },
          ],
        },
        {
          name: "Interactive rebase: fixup",
          explanation:
            "Combines a commit with its predecessor while normally discarding the fixup commit’s message. Use it to fold a small correction into the logical change it belongs to.",
          note: "The plain fixup action keeps the preceding commit’s message. It must follow another retained commit.",
          source: "https://git-scm.com/docs/git-rebase",
          examples: [
            {
              label: "Fold the second commit into the first",
              language: "bash",
              code: "git switch feature\ngit rebase -i HEAD~3\n# Set SECOND action to fixup; first and third remain pick.",
            },
            {
              label: "Fold the third commit into the second",
              language: "bash",
              code: "git switch feature\ngit rebase -i base\n# Set THIRD action to fixup; the first two remain pick.",
            },
          ],
        },
        {
          name: "Interactive rebase: drop",
          explanation:
            "Omits a selected commit from the replay. Use it to remove unwanted unpublished work.",
          note: "Later commits may depend on the dropped patch and can conflict or behave differently. The fixture’s separate feature files make these two omissions independent.",
          source: "https://git-scm.com/docs/git-rebase",
          examples: [
            {
              label: "Drop the middle feature commit",
              language: "bash",
              code: "git switch feature\ngit rebase -i HEAD~3\n# Set SECOND action to drop; save and close.",
            },
            {
              label: "Drop the final feature commit",
              language: "bash",
              code: "git switch feature\ngit rebase -i base\n# Set THIRD action to drop; save and close.",
            },
          ],
        },
        {
          name: "git rebase --continue",
          explanation:
            "Resumes a paused rebase after you resolve conflicts or finish an edit stop. Use it when the intended resolution is staged.",
          note: "Continuing is valid only during a rebase. The helper verifies a real conflict before the resolution below.",
          source: "https://git-scm.com/docs/git-rebase",
          examples: [
            {
              label: "Resolve and continue the fixture rebase",
              language: "bash",
              code: 'start_rebase_conflict\nprintf "Reconciled rebase content\\n" > common.txt\ngit add -- common.txt\ngit rebase --continue',
            },
            {
              label: "Review the staged resolution before continuing",
              language: "bash",
              code: 'start_rebase_conflict\nprintf "Updated shared content\\n" > common.txt\ngit add -- common.txt\ngit diff --staged\ngit rebase --continue',
            },
          ],
        },
        {
          name: "git rebase --skip",
          explanation:
            "Drops the currently stopped replay commit and resumes with later commits. Use it only when the current commit’s changes are intentionally unnecessary.",
          note: "Skipping loses that commit’s patch from the rebased sequence; it is not merely a way to bypass conflict prompts. The fixture’s following commit adds a separate file.",
          source: "https://git-scm.com/docs/git-rebase",
          examples: [
            {
              label: "Skip the fixture’s conflicting commit",
              language: "bash",
              code: "start_rebase_conflict\ngit rebase --skip",
            },
            {
              label: "Inspect the conflict before deciding to skip",
              language: "bash",
              code: "start_rebase_conflict\ngit status -s\ngit rebase --skip",
            },
          ],
        },
        {
          name: "git rebase --abort",
          explanation:
            "Cancels the rebase and restores the branch to its pre-rebase state. Use it when you want to abandon the attempted rewrite.",
          note: "This restores the original branch tip rather than keeping partially replayed commits. Begin with a clean repository to keep recovery straightforward.",
          source: "https://git-scm.com/docs/git-rebase",
          examples: [
            {
              label: "Cancel the fixture conflict",
              language: "bash",
              code: "start_rebase_conflict\ngit rebase --abort",
            },
            {
              label: "Inspect the in-progress state and cancel",
              language: "bash",
              code: "start_rebase_conflict\ngit status -s\ngit rebase --abort",
            },
          ],
        },
        {
          name: "git rebase --onto",
          explanation:
            "Replays commits selected after an old boundary onto a different new base. Use it to transplant a topic without bringing its earlier ancestry.",
          note: "The old boundary is excluded, and the branch argument selects what to move. These examples deliberately omit earlier feature commits; choose boundaries carefully.",
          source: "https://git-scm.com/docs/git-rebase",
          examples: [
            {
              label: "Move only the final two feature commits onto main",
              language: "bash",
              code: "git rebase --onto main feature~2 feature",
            },
            {
              label: "Move only the final feature commit onto main",
              language: "bash",
              code: "git rebase --onto main feature~1 feature",
            },
          ],
        },
        {
          name: "git pull --rebase",
          explanation:
            "Fetches the requested remote branch and rebases the current branch on it. Use it to integrate newer remote work without a local merge commit.",
          note: "It does not switch you to the named remote branch. The fixture origin is a local bare repository, so the examples perform no network or account operations.",
          source: "https://git-scm.com/docs/git-pull",
          examples: [
            {
              label: "Update feature using origin main as its base",
              language: "bash",
              code: "git switch feature\ngit pull --rebase origin main",
            },
            {
              label: "Rebase another unpublished topic onto origin main",
              language: "bash",
              code: "git switch topic-copy\ngit pull --rebase origin main",
            },
          ],
        },
        {
          name: "git config --global pull.rebase true",
          explanation:
            "Makes rebase the default integration method for pulls in your user configuration. Use it when that is the intended personal policy.",
          note: "This intentionally replaces the earlier false preference. Repository settings and command-line flags can override it; configuring the policy does not perform a pull.",
          source: "https://git-scm.com/docs/git-config",
          examples: [
            {
              label: "Choose rebase as the global pull preference",
              language: "bash",
              code: "git config --global pull.rebase true",
            },
            {
              label: "Set and verify the preference",
              language: "bash",
              code: "git config --global pull.rebase true\ngit config --global pull.rebase\n# true",
            },
          ],
        },
        {
          name: "git commit --fixup",
          explanation:
            "Creates a commit whose message identifies an earlier commit for later autosquashing. Use it to record a correction without immediately rewriting history.",
          note: "The correction must already be staged. The target needs to be within the subsequent interactive rebase range; creating the fixup commit alone does not fold it.",
          source: "https://git-scm.com/docs/git-commit",
          examples: [
            {
              label: "Create a fixup targeting the first feature commit",
              language: "bash",
              code: 'git switch feature\nprintf "Feature one corrected\\n" > feature-one.txt\ngit add -- feature-one.txt\ngit commit --fixup=feature~2',
            },
            {
              label: "Target the current tip with a staged correction",
              language: "bash",
              code: 'git switch feature\nprintf "Feature three corrected\\n" > feature-three.txt\ngit add -- feature-three.txt\ngit commit --fixup=HEAD',
            },
          ],
        },
        {
          name: "git rebase -i --autosquash",
          explanation:
            "Reorders fixup or squash commits beside their targets and adjusts the todo actions. Use it to fold review corrections into unpublished commits.",
          note: "Review the generated todo rather than accepting it blindly. The base must precede the target and its correction.",
          source: "https://git-scm.com/docs/git-rebase",
          examples: [
            {
              label: "Autosquash a correction into the first feature commit",
              language: "bash",
              code: 'git switch feature\nprintf "Feature one corrected\\n" > feature-one.txt\ngit add -- feature-one.txt\ngit commit --fixup=feature~2\ngit rebase -i --autosquash base\n# Review the generated fixup placement; save and close.',
            },
            {
              label: "Autosquash a correction into the last feature commit",
              language: "bash",
              code: 'git switch feature\nprintf "Feature three corrected\\n" > feature-three.txt\ngit add -- feature-three.txt\ngit commit --fixup=HEAD\ngit rebase -i --autosquash base\n# Review and accept the generated todo.',
            },
          ],
        },
        {
          name: "git reflog",
          explanation:
            "Shows locally recorded reference movements. Use it to locate a branch tip from before a rebase or other move.",
          note: "Reflogs are local and expire; they are not a permanent backup or shared remote history. Inspect the relevant reference rather than assuming a fixed HEAD@{n} position.",
          source: "https://git-scm.com/docs/git-reflog",
          examples: [
            {
              label: "Inspect HEAD movement after a practice rebase",
              language: "bash",
              code: "git switch feature\ngit rebase main\ngit reflog",
            },
            {
              label: "Inspect the rewritten branch’s own movements",
              language: "bash",
              code: "git switch feature\ngit rebase main\ngit reflog show feature",
            },
          ],
        },
        {
          name: "git reset --hard (rebase recovery)",
          explanation:
            "Moves the current branch to a verified earlier commit and resets the index and tracked working files. Use it to restore a clean, unpublished practice branch after a bad rebase.",
          note: "--hard discards staged and unstaged tracked work and can remove obstructing untracked paths. Verify the target, retain needed work elsewhere, and coordinate before replacing shared history. These examples start from the clean disposable fixture.",
          source: "https://git-scm.com/docs/git-reset",
          examples: [
            {
              label: "Restore the branch’s known pre-rebase tip",
              language: "bash",
              code: "git switch feature\ngit rebase main\ngit reflog show feature\n# In this fresh fixture, feature@{1} is the tip immediately before rebase.\ngit reset --hard 'feature@{1}'",
            },
            {
              label: "Select a verified HEAD reflog entry for recovery",
              language: "bash",
              code: 'git switch feature\ngit rebase main\ngit reflog\n# Find the pre-rebase feature tip; enter its HEAD@{n} index, not a guess.\nprintf "Verified pre-rebase HEAD reflog index: "\nread -r reflog_index\ngit reset --hard "HEAD@{$reflog_index}"',
            },
          ],
        },
        {
          name: "git cherry-pick",
          explanation:
            "Applies a selected commit’s patch to the current branch and records a new commit. Use it to transfer a focused fix without merging a whole branch.",
          note: "Start with a clean index and working tree. A new parent and usually a new commit ID are created; dependencies or conflicts may require manual handling.",
          source: "https://git-scm.com/docs/git-cherry-pick",
          examples: [
            {
              label: "Apply the first feature commit onto current main",
              language: "bash",
              code: "git cherry-pick feature~2",
            },
            {
              label: "Apply one independent feature change onto release",
              language: "bash",
              code: "git switch release/1.x\ngit cherry-pick feature~1",
            },
          ],
        },
        {
          name: "git cherry-pick <start>..<end>",
          explanation:
            "Selects commits reachable from the end but not the start, then applies them in replay order. Use it for a connected series of fixes.",
          note: "For this linear fixture the start commit is excluded and the end included. On nonlinear history, a range is a reachability set and can include more than a visual contiguous slice.",
          source: "https://git-scm.com/docs/git-cherry-pick",
          examples: [
            {
              label: "Pick all three feature commits after base",
              language: "bash",
              code: "git cherry-pick base..feature",
            },
            {
              label: "Pick only the final two feature commits",
              language: "bash",
              code: "git cherry-pick feature~2..feature",
            },
          ],
        },
        {
          name: "git cherry-pick -n",
          explanation:
            "Applies selected patches to the index and working tree without making commits. Use it to collect changes into a deliberately authored commit.",
          note: "-n is --no-commit; it does not merely stage metadata. Review the resulting index before committing, especially if it already held changes.",
          source: "https://git-scm.com/docs/git-cherry-pick",
          examples: [
            {
              label: "Apply one patch without recording a commit",
              language: "bash",
              code: "git cherry-pick -n feature~2",
            },
            {
              label: "Combine two selected patches into one commit",
              language: "bash",
              code: 'git cherry-pick -n feature~2 feature~1\ngit commit -m "Combine selected feature changes"',
            },
          ],
        },
        {
          name: "git cherry-pick --continue",
          explanation:
            "Resumes a paused cherry-pick after conflicts are resolved and staged. Use it to finish the current patch and proceed through the sequence.",
          note: "The helper deliberately starts a two-commit sequence whose first patch conflicts. Resolve every unmerged path before continuing.",
          source: "https://git-scm.com/docs/git-cherry-pick",
          examples: [
            {
              label: "Resolve the first patch and finish the sequence",
              language: "bash",
              code: 'start_pick_conflict\nprintf "Resolved backport content\\n" > common.txt\ngit add -- common.txt\ngit cherry-pick --continue',
            },
            {
              label: "Review the staged resolution before continuing",
              language: "bash",
              code: 'start_pick_conflict\nprintf "Reconciled backport text\\n" > common.txt\ngit add -- common.txt\ngit diff --staged\ngit cherry-pick --continue',
            },
          ],
        },
        {
          name: "git cherry-pick --abort",
          explanation:
            "Cancels the in-progress cherry-pick sequence and returns to its starting state. Use it to abandon an attempted backport.",
          note: "It differs from skipping one commit: abort discards the sequence’s in-progress application.",
          source: "https://git-scm.com/docs/git-cherry-pick",
          examples: [
            {
              label: "Abort the fixture sequence",
              language: "bash",
              code: "start_pick_conflict\ngit cherry-pick --abort",
            },
            {
              label: "Inspect the conflict and abort",
              language: "bash",
              code: "start_pick_conflict\ngit status -s\ngit cherry-pick --abort",
            },
          ],
        },
        {
          name: "git cherry-pick --skip",
          explanation:
            "Omits the currently stopped commit and resumes the remaining sequence. Use it when that specific patch is intentionally unwanted.",
          note: "The skipped commit’s patch is not applied. In this fixture the subsequent independent follow-up file still arrives.",
          source: "https://git-scm.com/docs/git-cherry-pick",
          examples: [
            {
              label: "Skip the conflicting patch but apply the next one",
              language: "bash",
              code: "start_pick_conflict\ngit cherry-pick --skip",
            },
            {
              label: "Inspect the conflict before deciding to skip",
              language: "bash",
              code: "start_pick_conflict\ngit status -s\ngit cherry-pick --skip",
            },
          ],
        },
        {
          name: "git cherry-pick <sha1> <sha2> <sha3>",
          explanation:
            "Applies explicitly named commits in the supplied order. Use it when selecting distinct changes rather than an entire branch range.",
          note: "Order the commits so prerequisites precede dependent changes. The fixture’s three commits add independent files.",
          source: "https://git-scm.com/docs/git-cherry-pick",
          examples: [
            {
              label: "Pick three explicitly named feature commits",
              language: "bash",
              code: "git cherry-pick feature~2 feature~1 feature",
            },
            {
              label: "Choose two nonadjacent feature commits",
              language: "bash",
              code: "git cherry-pick feature~2 feature",
            },
          ],
        },
        {
          name: "git cherry-pick -m 1",
          explanation:
            "Applies a merge commit’s change relative to its first parent. Use it when a merge’s resulting patch must be transferred without replaying its full ancestry.",
          note: "Choose the correct mainline parent after inspection. This creates an ordinary commit on the target, not a new merge commit.",
          source: "https://git-scm.com/docs/git-cherry-pick",
          examples: [
            {
              label: "Transfer the fixture merge’s feature delta onto main",
              language: "bash",
              code: "git cherry-pick -m 1 merge-source",
            },
            {
              label: "Transfer that merge delta onto release",
              language: "bash",
              code: "git switch release/1.x\ngit cherry-pick -m 1 merge-source",
            },
          ],
        },
        {
          name: "git cherry-pick -x",
          explanation:
            "Requests a source-commit reference in the new commit message. Use it to make a backport’s origin easy to trace.",
          note: "This is useful when both source and target histories are shared. Inspect the final message after any manual conflict resolution.",
          source: "https://git-scm.com/docs/git-cherry-pick",
          examples: [
            {
              label: "Document the origin of a feature backport",
              language: "bash",
              code: "git cherry-pick -x feature~2",
            },
            {
              label: "Trace a selected release backport",
              language: "bash",
              code: "git switch release/1.x\ngit cherry-pick -x feature~1",
            },
          ],
        },
        {
          name: "Backport a fix to a release branch",
          explanation:
            "Switches to a maintained release branch and applies a selected fix from main. Use it when a release needs the fix without unrelated new development.",
          note: "The fixture’s main tip is a focused common.txt fix, and release/1.x starts at the original baseline. Confirm that a real fix is compatible with the older release.",
          source: "https://git-scm.com/docs/git-cherry-pick",
          examples: [
            {
              label: "Apply the main fix onto release/1.x",
              language: "bash",
              code: "git switch release/1.x\ngit cherry-pick main",
            },
            {
              label: "Include the source reference in the release commit",
              language: "bash",
              code: "git switch release/1.x\ngit cherry-pick -x main",
            },
          ],
        },
      ],
    },
    {
      name: "Working with Remotes",
      id: "working-with-remotes",
      intro:
        "Remote Repositories from both images, in the supplied command order. Run the fresh offline fixture before each independent example and keep the same shell open for its helpers. It creates origin and backup locally, an upstream update, a stale remote-tracking branch, and two local tags. Pull and push behavior is made explicit through repository-local settings; no command in these examples accesses an online account. Force-push examples deliberately replace history only on the disposable fixture branch.",
      setup: [
        {
          label:
            "Offline remote fixture and push/lease helpers — rerun before each example",
          language: "bash",
          code: '# POSIX shell or Git Bash, Git 2.28+. Run afresh BEFORE EACH example.\n# Every remote below is a newly created local bare repository.\nremote_lab=$(mktemp -d)\ngit init --bare "$remote_lab/origin.git"\ngit init --bare "$remote_lab/backup.git"\ngit init -b main "$remote_lab/seed"\ngit -C "$remote_lab/seed" config user.name "Demo User"\ngit -C "$remote_lab/seed" config user.email "demo@example.com"\nprintf \'Practice baseline\\n\' > "$remote_lab/seed/README.md"\ngit -C "$remote_lab/seed" add .\ngit -C "$remote_lab/seed" commit -m "Remote practice baseline"\ngit -C "$remote_lab/seed" remote add origin "$remote_lab/origin.git"\ngit -C "$remote_lab/seed" remote add backup "$remote_lab/backup.git"\ngit -C "$remote_lab/seed" branch stale\ngit -C "$remote_lab/seed" push origin main stale\ngit -C "$remote_lab/seed" push backup main\ngit --git-dir="$remote_lab/origin.git" symbolic-ref HEAD refs/heads/main\ngit --git-dir="$remote_lab/backup.git" symbolic-ref HEAD refs/heads/main\ngit clone "$remote_lab/origin.git" "$remote_lab/work"\ncd "$remote_lab/work"\ngit config user.name "Demo User"\ngit config user.email "demo@example.com"\ngit config pull.rebase false\ngit config pull.ff true\ngit config push.default simple\ngit config remote.pushDefault origin\ngit remote add backup "$remote_lab/backup.git"\ngit branch stale origin/stale\ngit tag demo-v1\ngit tag demo-v2\n# Simulate an upstream advance and a deleted remote branch after the clone.\nprintf \'Upstream addition\\n\' > "$remote_lab/seed/upstream.txt"\ngit -C "$remote_lab/seed" add .\ngit -C "$remote_lab/seed" commit -m "Upstream update"\ngit -C "$remote_lab/seed" push origin main\ngit -C "$remote_lab/seed" push origin --delete stale\n\nprepare_local_commit() {\n  printf \'Local addition\\n\' > local.txt\n  git add -- local.txt && git commit -m "Local update"\n}\nprepare_push() {\n  git pull --ff-only origin main && prepare_local_commit\n}\nprepare_rewrite() {\n  git switch -c rewrite-demo || return\n  printf \'Original published work\\n\' > rewrite.txt\n  git add -- rewrite.txt || return\n  git commit -m "Original published practice work" || return\n  git push -u origin rewrite-demo || return\n  git commit --amend -m "Reworded unpublished replacement"\n}\nadvance_rewrite_elsewhere() {\n  git -C "$remote_lab/seed" fetch origin rewrite-demo || return\n  git -C "$remote_lab/seed" switch -c another-writer FETCH_HEAD || return\n  printf \'Another writer addition\\n\' > "$remote_lab/seed/other-writer.txt"\n  git -C "$remote_lab/seed" add . || return\n  git -C "$remote_lab/seed" commit -m "Another writer update" || return\n  git -C "$remote_lab/seed" push origin HEAD:refs/heads/rewrite-demo\n}',
        },
      ],
      methods: [
        {
          name: "git remote",
          explanation:
            "Lists the configured remote names. Use it to see which remote aliases this repository knows.",
          note: "A remote is a local configuration entry; listing it does not contact a server. The fixture has origin and backup.",
          examples: [
            {
              label: "List remote names",
              language: "bash",
              code: "git remote",
            },
            {
              label: "List names after adding another local alias",
              language: "bash",
              code: 'git remote add review "$remote_lab/backup.git"\ngit remote',
            },
          ],
          source: "https://git-scm.com/docs/git-remote",
        },
        {
          name: "git remote -v",
          explanation:
            "Shows remote names with their fetch and push URLs. Use it to check which repository each alias addresses.",
          note: "Fetch and push URLs can differ. This lists configuration rather than testing reachability or authentication.",
          examples: [
            {
              label: "Inspect all configured URLs",
              language: "bash",
              code: "git remote -v",
            },
            {
              label: "Inspect URLs after renaming a remote",
              language: "bash",
              code: "git remote rename backup archive\ngit remote -v",
            },
          ],
          source: "https://git-scm.com/docs/git-remote",
        },
        {
          name: "git remote add",
          explanation:
            "Creates a remote name for a URL or repository path. Use it to connect an existing local repository with another repository.",
          note: "The name must not already exist. Adding it alone does not fetch objects; the first example removes only the disposable fixture’s existing origin before recreating that alias.",
          examples: [
            {
              label: "Add origin using a trusted local repository path",
              language: "bash",
              code: 'git remote remove origin\ngit remote add origin "$remote_lab/origin.git"',
            },
            {
              label: "Add an additional remote alias",
              language: "bash",
              code: 'git remote add mirror "$remote_lab/backup.git"',
            },
          ],
          source: "https://git-scm.com/docs/git-remote",
        },
        {
          name: "git remote set-url",
          explanation:
            "Changes the URL attached to an existing remote. Use it when a repository moves or you need to correct its address.",
          note: "Changing the fetch URL does not refresh existing remote-tracking references. If separate push URLs are configured, update those deliberately too.",
          examples: [
            {
              label: "Point origin at the fixture backup repository",
              language: "bash",
              code: 'git remote set-url origin "$remote_lab/backup.git"',
            },
            {
              label: "Change and inspect an alias’s URL",
              language: "bash",
              code: 'git remote set-url backup "$remote_lab/origin.git"\ngit remote -v',
            },
          ],
          source: "https://git-scm.com/docs/git-remote",
        },
        {
          name: "git remote remove",
          explanation:
            "Removes a remote’s local configuration and associated remote-tracking references. Use it when the alias is no longer needed.",
          note: "Local branches and the remote repository itself remain. Branch upstream settings that named this remote may need attention.",
          examples: [
            {
              label: "Remove the origin alias in this practice repository",
              language: "bash",
              code: "git remote remove origin",
            },
            {
              label: "Remove the secondary backup alias",
              language: "bash",
              code: "git remote remove backup",
            },
          ],
          source: "https://git-scm.com/docs/git-remote",
        },
        {
          name: "git remote rename",
          explanation:
            "Renames a remote alias and updates its associated tracking configuration and remote-tracking references. Use it to clarify the remote’s role.",
          note: "This does not rename a hosted repository or its branches. The destination remote name must be available.",
          examples: [
            {
              label: "Rename origin to upstream",
              language: "bash",
              code: "git remote rename origin upstream",
            },
            {
              label: "Rename the secondary alias",
              language: "bash",
              code: "git remote rename backup archive",
            },
          ],
          source: "https://git-scm.com/docs/git-remote",
        },
        {
          name: "git fetch origin",
          explanation:
            "Downloads objects and updates references according to origin’s fetch configuration. Use it to inspect remote updates before integrating them.",
          note: "It normally updates remote-tracking references without merging into your current branch or changing checked-out files. The fixture’s origin/main is deliberately one commit behind.",
          examples: [
            {
              label: "Fetch origin without integrating its new commit",
              language: "bash",
              code: "git fetch origin",
            },
            {
              label: "Fetch a named remote branch",
              language: "bash",
              code: "git fetch origin main",
            },
          ],
          source: "https://git-scm.com/docs/git-fetch",
        },
        {
          name: "git fetch --all",
          explanation:
            "Fetches configured remotes in one operation. Use it when you need to refresh several remote views.",
          note: "Remotes configured with skipFetchAll are excluded. Fetching all remotes does not merge branches or mean fetching every possible ref.",
          examples: [
            {
              label: "Refresh origin and backup",
              language: "bash",
              code: "git fetch --all",
            },
            {
              label: "Refresh all eligible remotes and prune stale references",
              language: "bash",
              code: "git fetch --all --prune",
            },
          ],
          source: "https://git-scm.com/docs/git-fetch",
        },
        {
          name: "git fetch --prune",
          explanation:
            "Removes stale destination references covered by the fetch refspec while fetching. Use it to clean up remote-tracking branches deleted upstream.",
          note: "With the usual branch refspec, this removes stale remote-tracking branches, not your local branches. Explicit tag mappings can make pruning affect tags too. The fixture retains origin/stale after deleting that branch remotely.",
          examples: [
            {
              label: "Fetch the default remote and prune its stale branch view",
              language: "bash",
              code: "git fetch --prune",
            },
            {
              label: "Name the remote to prune explicitly",
              language: "bash",
              code: "git fetch --prune origin",
            },
          ],
          source: "https://git-scm.com/docs/git-fetch",
        },
        {
          name: "git pull origin main",
          explanation:
            "Fetches origin’s main and integrates it into the current branch using the selected pull policy. Use it when you are ready to incorporate remote work.",
          note: "The fixture sets pull.rebase=false and permits fast-forward or merge. User configuration can select different behavior; this command does not switch branches. A diverged merge may open an editor.",
          examples: [
            {
              label: "Fast-forward the fixture’s unchanged local main",
              language: "bash",
              code: "git pull origin main",
            },
            {
              label: "Merge after making independent local work",
              language: "bash",
              code: "prepare_local_commit\ngit pull origin main",
            },
          ],
          source: "https://git-scm.com/docs/git-pull",
        },
        {
          name: "git pull --rebase",
          explanation:
            "Fetches and rebases the current branch’s local commits on the chosen upstream. Use it to update unpublished work while avoiding a new merge commit.",
          note: "Replayed commits generally receive new IDs. Without arguments it uses the current branch’s configured upstream; start clean and coordinate before rewriting shared work.",
          examples: [
            {
              label: "Rebase a local commit onto its configured upstream",
              language: "bash",
              code: "prepare_local_commit\ngit pull --rebase",
            },
            {
              label: "Specify origin and main explicitly",
              language: "bash",
              code: "prepare_local_commit\ngit pull --rebase origin main",
            },
          ],
          source: "https://git-scm.com/docs/git-pull",
        },
        {
          name: "git push origin main",
          explanation:
            "Publishes local main to main on origin. Use it after integrating remote changes and reviewing the local commits to publish.",
          note: "Ordinary updates must satisfy fast-forward and server policy checks. This names local main even if another branch is currently checked out.",
          examples: [
            {
              label: "Publish one new local commit",
              language: "bash",
              code: "prepare_push\ngit push origin main",
            },
            {
              label: "Publish main while a different branch is checked out",
              language: "bash",
              code: "prepare_push\ngit switch -c review-local\ngit push origin main",
            },
          ],
          source: "https://git-scm.com/docs/git-push",
        },
        {
          name: "git push -u origin main",
          explanation:
            "Pushes main and records origin/main as its upstream on a successful or up-to-date push. Use it to establish tracking for later argument-free operations.",
          note: "-u is --set-upstream. A local upstream setting does not change the remote hosting service’s default branch.",
          examples: [
            {
              label: "Push and establish tracking for main",
              language: "bash",
              code: "prepare_push\ngit push -u origin main",
            },
            {
              label:
                "Re-establish tracking after removing the local upstream setting",
              language: "bash",
              code: "prepare_push\ngit branch --unset-upstream main\ngit push -u origin main",
            },
          ],
          source: "https://git-scm.com/docs/git-push",
        },
        {
          name: "git push --all",
          explanation:
            "Pushes all local branches to the selected remote. Use it only when every local branch is intended for publication.",
          note: "This selects refs/heads, not all refs or tags, and does not delete branches absent locally. The no-remote form uses the configured push destination; these fixtures explicitly set origin as the default.",
          examples: [
            {
              label:
                "Publish every local branch to the default push destination",
              language: "bash",
              code: "prepare_push\ngit branch publish-demo\ngit push --all",
            },
            {
              label: "Name origin explicitly when publishing local branches",
              language: "bash",
              code: "prepare_push\ngit branch publish-demo\ngit push --all origin",
            },
          ],
          source: "https://git-scm.com/docs/git-push",
        },
        {
          name: "git push --tags",
          explanation:
            "Pushes local tags to the selected remote. Use it to publish deliberately created release markers.",
          note: "Existing conflicting remote tags are normally rejected. This publishes all selected local tags, not just a tag related to the current branch; no-remote destination selection follows push configuration.",
          examples: [
            {
              label: "Publish the fixture’s two local tags",
              language: "bash",
              code: "git push --tags",
            },
            {
              label: "Name the remote while pushing tags",
              language: "bash",
              code: "git push --tags origin",
            },
          ],
          source: "https://git-scm.com/docs/git-push",
        },
        {
          name: "git push --force",
          explanation:
            "Permits a non-fast-forward update without checking that the remote still matches your last observed tip. Use it only for a coordinated intentional rewrite.",
          note: "It can discard someone else’s remote commits and is subject to server protections. Prefer a carefully checked lease when replacing history. Both examples target only the fixture’s own rewrite-demo branch on its temporary local origin.",
          examples: [
            {
              label: "Force-update only the named practice branch",
              language: "bash",
              code: "prepare_rewrite\ngit push --force origin rewrite-demo",
            },
            {
              label: "Use the fixture branch’s established push destination",
              language: "bash",
              code: "prepare_rewrite\ngit push --force",
            },
          ],
          source: "https://git-scm.com/docs/git-push",
        },
        {
          name: "git push --force-with-lease",
          explanation:
            "Permits a rewrite only if the remote reference matches an expected value. Use it when you intentionally replace history but want concurrent updates to be detected.",
          note: "The shorthand normally relies on your remote-tracking reference; background fetches can refresh that expectation and weaken the protection. An explicit expected commit pins the check. A lease does not prove the rewritten content is correct or bypass server policy.",
          examples: [
            {
              label:
                "Replace history when the last observed remote tip still matches",
              language: "bash",
              code: "prepare_rewrite\ngit push --force-with-lease origin rewrite-demo",
            },
            {
              label: "Pin an explicit expected remote commit",
              language: "bash",
              code: 'prepare_rewrite\nexpected_tip=$(git rev-parse refs/remotes/origin/rewrite-demo)\ngit push --force-with-lease="refs/heads/rewrite-demo:$expected_tip" origin rewrite-demo',
            },
            {
              label: "Observe rejection after a simulated collaborator update",
              language: "bash",
              code: 'prepare_rewrite\nadvance_rewrite_elsewhere\nif git push --force-with-lease origin rewrite-demo; then\n  printf "Unexpected success: inspect the fixture state.\\n"\nelse\n  printf "Lease rejected: inspect the other writer’s update before retrying.\\n"\nfi',
            },
          ],
          source: "https://git-scm.com/docs/git-push",
        },
      ],
    },
    {
      name: "Stashing Changes",
      id: "stashing-changes",
      intro:
        "Save Work Temporarily from both images, in the supplied order. Run the fresh practice fixture before each independent example. It creates two saved drafts plus current staged and unstaged edits, an untracked file, and an ignored cache file. Stashes belong to this repository and are shared across its branches; they are not pushed with ordinary branch pushes. The conflict-pop example intentionally leaves a conflict for inspection; all examples operate only in this disposable fixture.",
      setup: [
        {
          label: "Practice fixture — saved drafts and mixed current work",
          language: "bash",
          code: "# POSIX shell or Git Bash, Git 2.28+. Run afresh BEFORE EACH example.\n# The fixture leaves you inside a new disposable repository.\nstash_lab=$(mktemp -d)\ncd \"$stash_lab\"\ngit init -b main\ngit config user.name \"Demo User\"\ngit config user.email \"demo@example.com\"\nprintf 'Baseline README\\n' > README.md\nprintf 'Baseline settings\\n' > settings.txt\nprintf 'cache/\\n' > .gitignore\nprintf 'First line baseline\\n' > patch.txt\nfor line in 1 2 3 4 5 6 7 8 9 10 11 12; do\n  printf 'Unchanged context %s\\n' \"$line\" >> patch.txt\ndone\nprintf 'Last line baseline\\n' >> patch.txt\ngit add .\ngit commit -m \"Stash practice baseline\"\n# Two pre-existing entries, newest first: Recent draft, then Older draft.\nprintf 'Older draft README\\n' > README.md\ngit stash push -m \"Older draft\"\nprintf 'Recent draft README\\n' > README.md\ngit stash push -m \"Recent draft\"\n# A new mixed staged/unstaged working state, not yet saved.\nprintf 'Staged README\\n' > README.md\ngit add -- README.md\nprintf 'Working README after staging\\n' > README.md\nprintf 'Edited settings\\n' > settings.txt\nprintf 'First line edited\\n' > patch.txt\nfor line in 1 2 3 4 5 6 7 8 9 10 11 12; do\n  printf 'Unchanged context %s\\n' \"$line\" >> patch.txt\ndone\nprintf 'Last line edited\\n' >> patch.txt\nprintf 'New untracked scratch work\\n' > scratch.tmp\nmkdir cache\nprintf 'Ignored cache work\\n' > cache/ignored.txt",
        },
      ],
      methods: [
        {
          name: "git stash",
          explanation:
            "Saves tracked working-tree and index changes in a stash entry, then restores those paths toward HEAD. Use it to put unfinished work aside without making a normal branch commit.",
          note: "With no subcommand it is equivalent to git stash push. Untracked and ignored files remain unless explicitly included; a stash is local repository data, not a remote backup.",
          examples: [
            {
              label: "Save tracked edits with the default command",
              language: "bash",
              code: "git stash",
            },
            {
              label: "Save tracked edits using the explicit push spelling",
              language: "bash",
              code: "git stash push",
            },
          ],
          source: "https://git-scm.com/docs/git-stash",
        },
        {
          name: "git stash push -m",
          explanation:
            "Creates a stash with a descriptive message. Use it to distinguish several pieces of unfinished work.",
          note: "The message labels the entry; it does not change which paths are saved. Default behavior still excludes untracked and ignored files.",
          examples: [
            {
              label: "Name the current work in progress",
              language: "bash",
              code: 'git stash push -m "Draft interface changes"',
            },
            {
              label: "Save with a message, then inspect the list",
              language: "bash",
              code: 'git stash push -m "Pause settings work"\ngit stash list',
            },
          ],
          source: "https://git-scm.com/docs/git-stash",
        },
        {
          name: "git stash list",
          explanation:
            "Lists saved stash entries with their current selectors and descriptions. Use it before restoring or deleting an entry.",
          note: "stash@{0} is newest. Numeric positions shift when entries are added or removed; inspect the list again before acting on a selector.",
          examples: [
            {
              label: "List all saved entries",
              language: "bash",
              code: "git stash list",
            },
            {
              label: "Show only the latest two entries",
              language: "bash",
              code: "git stash list -n 2",
            },
          ],
          source: "https://git-scm.com/docs/git-stash",
        },
        {
          name: "git stash apply",
          explanation:
            "Restores a stash without removing its saved entry. Use it when you want to keep the saved snapshot available.",
          note: "Defaults to the latest entry; quote stash@{n} selectors for shell portability. Application can conflict. --index attempts to restore the original staged state as well as working-tree changes, and can fail when the index cannot be reconstructed.",
          examples: [
            {
              label: "Save current tracked edits and apply the latest snapshot",
              language: "bash",
              code: 'git stash push -m "Current tracked work"\ngit stash apply',
            },
            {
              label: "Apply a specific pre-existing entry",
              language: "bash",
              code: "git stash push -m \"Current tracked work\"\n# After the new push, stash@{1} is the fixture’s Recent draft.\ngit stash apply 'stash@{1}'",
            },
            {
              label: "Restore both staged and unstaged portions",
              language: "bash",
              code: "git stash push -m \"Preserve staging layout\"\ngit stash apply --index 'stash@{0}'",
            },
          ],
          source: "https://git-scm.com/docs/git-stash",
        },
        {
          name: "git stash pop",
          explanation:
            "Restores a stash and removes that entry only after successful application. Use it when the saved entry is no longer needed after restoration.",
          note: "A conflict leaves the entry saved for recovery; it is not automatically dropped. Resolve the files deliberately and inspect the stash before later deleting it.",
          examples: [
            {
              label: "Save and restore the latest tracked work",
              language: "bash",
              code: 'git stash push -m "Temporary tracked work"\ngit stash pop',
            },
            {
              label: "Pop a specific saved entry",
              language: "bash",
              code: "git stash push -m \"Current tracked work\"\n# Pop the fixture’s Recent draft while keeping the newest snapshot.\ngit stash pop 'stash@{1}'",
            },
            {
              label: "Observe that a conflicting pop retains the saved entry",
              language: "bash",
              code: 'git stash push -m "Pending tracked work"\nprintf "Conflicting committed replacement\\n" > README.md\ngit add -- README.md\ngit commit -m "Change README before restoring draft"\nif git stash pop; then\n  printf "Applied successfully.\\n"\nelse\n  printf "Inspect the conflict; the stash is retained.\\n"\n  git stash list\nfi',
            },
          ],
          source: "https://git-scm.com/docs/git-stash",
        },
        {
          name: "git stash drop",
          explanation:
            "Removes one saved stash entry from the stash list. Use it only after confirming that you no longer need that snapshot.",
          note: "This does not restore the saved files. Removing the reference can make its data eligible for pruning; do not rely on later recovery.",
          examples: [
            {
              label: "Drop the fixture’s newest saved draft",
              language: "bash",
              code: "git stash list\ngit stash drop 'stash@{0}'",
            },
            {
              label: "Drop the fixture’s older saved draft",
              language: "bash",
              code: "git stash list\ngit stash drop 'stash@{1}'",
            },
          ],
          source: "https://git-scm.com/docs/git-stash",
        },
        {
          name: "git stash clear",
          explanation:
            "Removes every saved entry from this repository’s stash list. Use it only when all those snapshots are disposable.",
          note: "It does not clean or restore your current working files. Cleared stash objects can become unrecoverable when pruned. These examples operate only in the fresh practice repository.",
          examples: [
            {
              label: "Inspect and clear the practice stash list",
              language: "bash",
              code: "git stash list\ngit stash clear",
            },
            {
              label: "Clear the list and verify that it is empty",
              language: "bash",
              code: "git stash clear\ngit stash list\n# No saved entries are listed.",
            },
          ],
          source: "https://git-scm.com/docs/git-stash",
        },
        {
          name: "git stash -u",
          explanation:
            "Includes ordinary untracked files alongside tracked changes when saving a stash. Use it when new files also need to be put aside.",
          note: "-u means --include-untracked. Ignored files are not included; the fixture’s scratch.tmp is saved while cache/ignored.txt remains.",
          examples: [
            {
              label: "Save tracked and untracked work",
              language: "bash",
              code: "git stash -u",
            },
            {
              label: "Name a snapshot that includes new files",
              language: "bash",
              code: 'git stash push -u -m "Tracked edits and new scratch file"',
            },
          ],
          source: "https://git-scm.com/docs/git-stash",
        },
        {
          name: "git stash -a",
          explanation:
            "Includes ignored files as well as untracked and tracked changes. Use it when the whole relevant worktree must be put aside.",
          note: "-a means --all. Saved untracked and ignored files are removed from the worktree, so this can move large caches or local configuration into the stash. Review the scope first.",
          examples: [
            {
              label: "Save tracked, untracked, and ignored paths",
              language: "bash",
              code: "git stash -a",
            },
            {
              label: "Label the all-files snapshot",
              language: "bash",
              code: 'git stash push -a -m "Pause all practice files"',
            },
          ],
          source: "https://git-scm.com/docs/git-stash",
        },
        {
          name: "git stash -p",
          explanation:
            "Interactively selects tracked diff hunks to save. Use it when only part of the current work should be put aside.",
          note: "Use y to stash a hunk and n to leave it. Patch mode implies --keep-index unless overridden, so existing staged changes normally stay staged. The fixture’s patch.txt has two separated hunks.",
          examples: [
            {
              label: "Choose hunks across tracked changes",
              language: "bash",
              code: "git stash -p\n# Answer y or n at each prompt; q stops selecting.",
            },
            {
              label: "Stash only the first patch.txt hunk",
              language: "bash",
              code: "git stash push -p -- patch.txt\n# Choose y for the first hunk and n for the second.",
            },
          ],
          source: "https://git-scm.com/docs/git-stash",
        },
        {
          name: "git stash branch",
          explanation:
            "Creates and checks out a new branch at the stash’s original base, then restores its working-tree and index changes. Use it when applying on a newer branch tip is troublesome.",
          note: "On success, a stash referenced through stash@{n} is dropped. Use a new branch name and a suitable clean tracked state; remaining untracked paths must not obstruct restoration.",
          examples: [
            {
              label: "Recover current tracked work onto a new branch",
              language: "bash",
              code: "git stash push -m \"Draft for a new branch\"\ngit stash branch draft-recovery 'stash@{0}'",
            },
            {
              label:
                "Recover the pre-existing Recent draft on its original base",
              language: "bash",
              code: "git stash push -m \"Keep current tracked work separate\"\ngit stash branch recent-draft 'stash@{1}'",
            },
          ],
          source: "https://git-scm.com/docs/git-stash",
        },
        {
          name: "git stash show -p",
          explanation:
            "Displays a saved entry’s tracked patch without applying it. Use it to review a snapshot before deciding how to restore it.",
          note: "Untracked files saved with -u or -a are omitted by default; add --include-untracked when you want their contents in the display.",
          examples: [
            {
              label: "Inspect a selected saved tracked patch",
              language: "bash",
              code: "git stash show -p 'stash@{0}'",
            },
            {
              label: "Inspect a snapshot including its saved untracked file",
              language: "bash",
              code: "git stash push -u -m \"Snapshot with scratch file\"\ngit stash show -p --include-untracked 'stash@{0}'",
            },
          ],
          source: "https://git-scm.com/docs/git-stash",
        },
        {
          name: "git stash push -- <paths>",
          explanation:
            "Selects paths whose working-tree changes should be stashed and rolled back. Use it to put selected file edits aside while leaving other working edits in place.",
          note: "Put -- before pathspecs. Selected paths are rolled back while other working edits remain. The stash’s index snapshot can still include already-staged changes outside the pathspec: in the second example, the staged README is also recorded. Inspect the saved snapshot before later applying it.",
          examples: [
            {
              label: "Stash two tracked files and leave other edits in place",
              language: "bash",
              code: 'git stash push -m "README and settings only" -- README.md settings.txt',
            },
            {
              label:
                "Save patch.txt edits while leaving other working edits in place",
              language: "bash",
              code: 'git stash push -m "Patch file only" -- patch.txt',
            },
          ],
          source: "https://git-scm.com/docs/git-stash",
        },
      ],
    },
    {
      name: "Fixing Mistakes",
      id: "fixing-mistakes",
      intro:
        "Undo Changes → Revert Commits → Recover with Reflog, following all six images. Run the fresh practice fixture before each independent example. It provides four linear commits on main, a separate topic and merge example, staged and unstaged edits, untracked files, and an ignored cache. Clean helpers intentionally discard only these fixture edits. Restore and reset are not interchangeable with revert: their notes identify index, worktree, branch, and data-loss effects. Reflog recovery depends on surviving local logs and objects, not a guaranteed permanent undo history.",
      setup: [
        {
          label:
            "Disposable undo/revert/recovery fixture — rerun before each example",
          language: "bash",
          code: '# POSIX shell or Git Bash, Git 2.28+. Run afresh BEFORE EACH example.\n# All destructive operations below affect only this new temporary repository.\nfix_lab=$(mktemp -d)\ncd "$fix_lab"\ngit init -b main\ngit config user.name "Demo User"\ngit config user.email "demo@example.com"\nfix_now=$(date +%s)\nprintf \'Baseline README\\n\' > README.md\nprintf \'Baseline tracked content\\n\' > tracked.txt\nprintf \'cache/\\n\' > .gitignore\ngit add .\nGIT_AUTHOR_DATE="$((fix_now - 259200)) +0000" GIT_COMMITTER_DATE="$((fix_now - 259200)) +0000" git commit -m "Baseline three days ago"\ngit branch base\nprintf \'Committed README update\\n\' > README.md\ngit add .\nGIT_AUTHOR_DATE="$((fix_now - 172800)) +0000" GIT_COMMITTER_DATE="$((fix_now - 172800)) +0000" git commit -m "Update README two days ago"\nprintf \'Second feature\\n\' > second.txt\ngit add .\nGIT_AUTHOR_DATE="$((fix_now - 3600)) +0000" GIT_COMMITTER_DATE="$((fix_now - 3600)) +0000" git commit -m "Add second feature one hour ago"\nprintf \'Third feature\\n\' > third.txt\ngit add .\ngit commit -m "Add third feature now"\ngit switch -c rebase-topic base\nprintf \'Topic work\\n\' > topic.txt\ngit add .\ngit commit -m "Independent topic change"\ngit switch -c merged-example main\ngit merge --no-ff rebase-topic -m "Merge topic into current main history"\ngit switch main\n# Dirty index and tracked worktree, plus disposable untracked and ignored files.\nprintf \'Staged README wording\\n\' > README.md\ngit add -- README.md\nprintf \'Working README wording\\n\' > README.md\nprintf \'Unstaged tracked edit\\n\' > tracked.txt\nprintf \'Untracked loose file\\n\' > loose.txt\nmkdir drafts cache\nprintf \'Untracked draft\\n\' > drafts/note.txt\nprintf \'Ignored cache\\n\' > cache/ignored.txt\n\nclean_practice() {\n  # Discard only this fixture’s tracked edits; leave untracked/ignored paths alone.\n  git restore --source=HEAD --staged --worktree -- .\n}\nprepare_lost_tip() {\n  clean_practice || return\n  lost_tip=$(git rev-parse HEAD) || return\n  git reset --hard HEAD~1\n}\nprepare_deleted_branch() {\n  clean_practice || return\n  git switch -c doomed || return\n  printf \'Recoverable branch-only work\\n\' > recovered.txt\n  git add -- recovered.txt || return\n  git commit -m "Unique work on disposable doomed branch" || return\n  git switch main || return\n  git branch -D doomed\n}',
        },
      ],
      methods: [
        {
          name: "git restore <file>",
          explanation:
            "Replaces a tracked working file with its index version by default. Use it to discard unstaged edits while retaining staged content.",
          note: "Requires Git 2.23+. The overwritten working edits are not saved by this command. In the fixture, restoring README.md keeps its staged wording rather than returning to HEAD.",
          examples: [
            {
              label: "Discard the README edits made after staging",
              language: "bash",
              code: "git restore -- README.md",
            },
            {
              label: "Discard another file’s unstaged edits",
              language: "bash",
              code: "git restore -- tracked.txt",
            },
          ],
          source: "https://git-scm.com/docs/git-restore",
        },
        {
          name: "git restore .",
          explanation:
            "Restores tracked working files beneath the current directory from the index. Use it to discard unstaged edits in that path scope.",
          note: "It does not unstage changes, remove ordinary untracked files, or automatically cover paths outside a subdirectory. Run from the repository root for the whole tree.",
          examples: [
            {
              label: "Discard unstaged edits from the practice repository root",
              language: "bash",
              code: "git restore .",
            },
            {
              label: "Inspect the scope before restoring",
              language: "bash",
              code: "git diff --name-only\ngit restore .",
            },
          ],
          source: "https://git-scm.com/docs/git-restore",
        },
        {
          name: "git restore --staged",
          explanation:
            "Restores selected index entries from HEAD by default. Use it to unstage content while leaving working files alone.",
          note: "This affects the index, not the current file contents. It needs a valid source commit unless another source is explicitly supplied.",
          examples: [
            {
              label: "Unstage the README while keeping its edits",
              language: "bash",
              code: "git restore --staged -- README.md",
            },
            {
              label: "Unstage all paths in the root scope",
              language: "bash",
              code: "git restore --staged -- .",
            },
          ],
          source: "https://git-scm.com/docs/git-restore",
        },
        {
          name: "git checkout -- <file>",
          explanation:
            "Uses the older checkout path form to replace working content from the index. Use it when following a legacy unstaged-edit workflow.",
          note: "The -- separates paths from branch names; no branch switch occurs. Unstaged contents of those files are overwritten.",
          examples: [
            {
              label: "Discard unstaged README edits using checkout",
              language: "bash",
              code: "git checkout -- README.md",
            },
            {
              label: "Restore two working files from their staged versions",
              language: "bash",
              code: "git checkout -- README.md tracked.txt",
            },
          ],
          source: "https://git-scm.com/docs/git-checkout",
        },
        {
          name: "git reset HEAD <file>",
          explanation:
            "Copies selected index entries from HEAD without moving the branch. Use it as the older form of unstaging a path.",
          note: "This path form keeps working file edits. It differs from resetting the branch tip without a pathspec.",
          examples: [
            {
              label: "Unstage one tracked file",
              language: "bash",
              code: "git reset HEAD -- README.md",
            },
            {
              label: "Unstage paths beneath the repository root",
              language: "bash",
              code: "git reset HEAD -- .",
            },
          ],
          source: "https://git-scm.com/docs/git-reset",
        },
        {
          name: "git reset --hard HEAD",
          explanation:
            "Resets the index and tracked worktree to the current commit without moving its tip. Use it only when the current uncommitted tracked changes should be discarded.",
          note: "This destroys staged and unstaged tracked edits. It does not normally remove unrelated untracked or ignored files, but untracked paths obstructing tracked output can be removed.",
          examples: [
            {
              label: "Discard tracked changes in the disposable fixture",
              language: "bash",
              code: "git reset --hard HEAD",
            },
            {
              label: "Review tracked changes, then discard them",
              language: "bash",
              code: "git diff HEAD --stat\ngit reset --hard HEAD",
            },
          ],
          source: "https://git-scm.com/docs/git-reset",
        },
        {
          name: "git clean -fd",
          explanation:
            "Deletes eligible untracked files and directories under the current directory. Use it to remove disposable untracked work after checking the deletion scope.",
          note: "Ignored paths remain by default. Cleaned files have no automatic Git recovery if they were never stored. Nested Git repositories have additional protection; this is not a universal disk cleanup.",
          examples: [
            {
              label:
                "Preview and remove ordinary untracked files and directories",
              language: "bash",
              code: "git clean -nd\n# Review the preview before running the deletion.\ngit clean -fd",
            },
            {
              label: "Limit deletion to the fixture’s untracked drafts folder",
              language: "bash",
              code: "git clean -nd -- drafts/\n# Review the preview.\ngit clean -fd -- drafts/",
            },
          ],
          source: "https://git-scm.com/docs/git-clean",
        },
        {
          name: "git restore --source",
          explanation:
            "Restores selected file content from a named commit. Use it to retrieve an earlier version without moving the branch tip.",
          note: "The default destination is the working tree, so the restored content remains an uncommitted edit. Adding --staged changes the index destination too.",
          examples: [
            {
              label: "Read an earlier README into the working tree",
              language: "bash",
              code: "git restore --source=HEAD~3 -- README.md",
            },
            {
              label: "Restore an earlier version into both index and worktree",
              language: "bash",
              code: "git restore --source=HEAD~3 --staged --worktree -- README.md",
            },
          ],
          source: "https://git-scm.com/docs/git-restore",
        },
        {
          name: "git clean -n",
          explanation:
            "Previews which untracked paths a clean would delete. Use it before running the corresponding forced clean command.",
          note: "-n is dry-run and makes no deletion. Match the preview’s -d, -x, and pathspec to the deletion you are considering.",
          examples: [
            {
              label: "Preview untracked loose files only",
              language: "bash",
              code: "git clean -n",
            },
            {
              label: "Preview untracked directories and ignored files too",
              language: "bash",
              code: "git clean -ndx",
            },
          ],
          source: "https://git-scm.com/docs/git-clean",
        },
        {
          name: "git clean -f",
          explanation:
            "Forces deletion of eligible untracked files. Use it after a matching dry-run when the loose files are disposable.",
          note: "Without -d and without an explicit directory pathspec, untracked directories are not traversed. Ignored files remain unless requested separately.",
          examples: [
            {
              label: "Preview and delete untracked loose files",
              language: "bash",
              code: "git clean -n\n# Review before deleting.\ngit clean -f",
            },
            {
              label: "Delete only the named untracked loose file",
              language: "bash",
              code: "git clean -n -- loose.txt\n# Review before deleting.\ngit clean -f -- loose.txt",
            },
          ],
          source: "https://git-scm.com/docs/git-clean",
        },
        {
          name: "git clean -fdx",
          explanation:
            "Deletes eligible ignored as well as untracked files and directories. Use it only when local caches, configuration, and generated files are disposable.",
          note: "-x disables ordinary ignore exclusions for this operation; this can remove node_modules, .env files, or other local data. Preview with the same scope first. Nested Git repositories still have additional protection.",
          examples: [
            {
              label:
                "Preview and clean all disposable extra files in the fixture",
              language: "bash",
              code: "git clean -ndx\n# Review: this includes cache/ignored.txt.\ngit clean -fdx",
            },
            {
              label: "Restrict ignored-file cleanup to the cache directory",
              language: "bash",
              code: "git clean -ndx -- cache/\n# Review before deleting.\ngit clean -fdx -- cache/",
            },
          ],
          source: "https://git-scm.com/docs/git-clean",
        },
        {
          name: "git reset --soft",
          explanation:
            "Moves the current branch tip while leaving the index and working tree unchanged. Use it to rework unpublished commits while retaining their content.",
          note: "The difference between the new HEAD and the unchanged index appears staged. Existing staged and unstaged edits remain in their respective states.",
          examples: [
            {
              label: "Move main back one commit while preserving current edits",
              language: "bash",
              code: "git reset --soft HEAD~1",
            },
            {
              label: "Rework the last two commits from a clean tracked state",
              language: "bash",
              code: "clean_practice\ngit reset --soft HEAD~2",
            },
          ],
          source: "https://git-scm.com/docs/git-reset",
        },
        {
          name: "git reset --mixed",
          explanation:
            "Moves the branch tip and resets the index to the selected commit while preserving working files. Use it to rework unpublished changes as unstaged work.",
          note: "This is the default branch-reset mode. Files added after the selected commit can become untracked rather than disappearing.",
          examples: [
            {
              label: "Move back one commit and leave work on disk",
              language: "bash",
              code: "git reset --mixed HEAD~1",
            },
            {
              label: "Use the default mixed mode for two commits",
              language: "bash",
              code: "clean_practice\ngit reset HEAD~2",
            },
          ],
          source: "https://git-scm.com/docs/git-reset",
        },
        {
          name: "git reset --hard HEAD~1",
          explanation:
            "Moves the branch back one commit and makes the index and tracked files match that commit. Use it only when intentionally discarding unpublished history and local tracked edits.",
          note: "It overwrites staged and unstaged tracked work and can remove obstructing untracked paths. Other untracked files are not generally cleaned; coordinate before replacing history that others use.",
          examples: [
            {
              label: "Discard the latest practice commit and tracked edits",
              language: "bash",
              code: "git reset --hard HEAD~1",
            },
            {
              label: "Discard two unpublished practice commits",
              language: "bash",
              code: "git reset --hard HEAD~2",
            },
          ],
          source: "https://git-scm.com/docs/git-reset",
        },
        {
          name: "git revert <commit>",
          explanation:
            "Creates a new commit that reverses a selected commit’s patch. Use it to undo an earlier change while retaining the existing history.",
          note: "Start with a clean index and tracked worktree; conflicts are possible. Reverting is a forward history change, not a guarantee of conflict-free or behaviorally correct output.",
          examples: [
            {
              label: "Revert the commit that added second.txt",
              language: "bash",
              code: "clean_practice\ngit revert --no-edit HEAD~1",
            },
            {
              label: "Revert the earlier README update",
              language: "bash",
              code: "clean_practice\ngit revert --no-edit HEAD~2",
            },
          ],
          source: "https://git-scm.com/docs/git-revert",
        },
        {
          name: "git revert HEAD",
          explanation:
            "Creates an inverse commit for the current tip. Use it to undo the latest committed change without moving the branch backward.",
          note: "The selected commit remains an ancestor. The fixture’s latest commit only added third.txt, so its inverse removes that file.",
          examples: [
            {
              label: "Revert the current commit with the generated message",
              language: "bash",
              code: "clean_practice\ngit revert --no-edit HEAD",
            },
            {
              label: "Edit the message for the inverse commit",
              language: "bash",
              code: "clean_practice\ngit revert HEAD\n# Review the message, save, and close the editor.",
            },
          ],
          source: "https://git-scm.com/docs/git-revert",
        },
        {
          name: "git revert <oldest>..<newest>",
          explanation:
            "Reverts a range of commits by reachability. Use it to reverse a sequence while recording the undo operations in history.",
          note: "In a linear range, the left endpoint is excluded and the right included. The fixture’s independent file additions avoid dependencies; more complex ranges may require conflict resolution.",
          examples: [
            {
              label: "Revert the final two commits separately",
              language: "bash",
              code: "clean_practice\ngit revert --no-edit HEAD~2..HEAD",
            },
            {
              label: "Revert only the range’s final commit",
              language: "bash",
              code: "clean_practice\ngit revert --no-edit HEAD~1..HEAD",
            },
          ],
          source: "https://git-scm.com/docs/git-revert",
        },
        {
          name: "git revert -m 1",
          explanation:
            "Reverts a merge’s change relative to its first parent. Use it to undo an integration while preserving the merge commit in history.",
          note: "Inspect the merge’s parent order before choosing a mainline. This declares the merge’s changes unwanted and affects what later merges consider already integrated.",
          examples: [
            {
              label: "Revert the fixture merge against its destination parent",
              language: "bash",
              code: "clean_practice\ngit switch merged-example\ngit revert -m 1 --no-edit HEAD",
            },
            {
              label: "Inspect the parents before reverting the merge",
              language: "bash",
              code: 'clean_practice\ngit switch merged-example\ngit show --no-patch --format="%H %P" HEAD\ngit revert -m 1 --no-edit HEAD',
            },
          ],
          source: "https://git-scm.com/docs/git-revert",
        },
        {
          name: "git reset --hard <commit>",
          explanation:
            "Moves the current branch to a chosen commit and overwrites index and tracked content to match. Use it for deliberate unpublished-history replacement.",
          note: "Unlike revert, it adds no inverse commit. It discards tracked uncommitted work and can remove obstructing untracked paths; inspect the target before running it.",
          examples: [
            {
              label: "Reset main to the fixture baseline",
              language: "bash",
              code: "git reset --hard base",
            },
            {
              label: "Select and inspect a historical target first",
              language: "bash",
              code: 'target_commit=$(git rev-parse HEAD~2)\ngit show --no-patch --oneline "$target_commit"\ngit reset --hard "$target_commit"',
            },
          ],
          source: "https://git-scm.com/docs/git-reset",
        },
        {
          name: "git revert -n",
          explanation:
            "Applies an inverse patch to the index and working tree without creating a commit. Use it to inspect or adjust the undo before recording it.",
          note: "-n is --no-commit. This stages the inverse; it is not a separate soft-revert mode. The examples start from a clean tracked state.",
          examples: [
            {
              label: "Prepare the latest inverse patch without committing",
              language: "bash",
              code: "clean_practice\ngit revert -n HEAD",
            },
            {
              label: "Prepare an earlier inverse patch for review",
              language: "bash",
              code: "clean_practice\ngit revert --no-commit HEAD~1\ngit diff --staged",
            },
          ],
          source: "https://git-scm.com/docs/git-revert",
        },
        {
          name: "Revert several commits as one commit",
          explanation:
            "Accumulates inverse patches without committing, then records the combined result once. Use it to group a deliberate multi-commit undo.",
          note: "The range’s left endpoint is excluded. The fixture provides three commits after base; review the staged result before committing.",
          examples: [
            {
              label: "Undo the last three commits in one new commit",
              language: "bash",
              code: 'clean_practice\ngit revert --no-commit HEAD~3..HEAD\ngit commit -m "Revert last three changes"',
            },
            {
              label: "Undo the last two commits as one change",
              language: "bash",
              code: 'clean_practice\ngit revert --no-commit HEAD~2..HEAD\ngit commit -m "Revert two file additions"',
            },
          ],
          source: "https://git-scm.com/docs/git-revert",
        },
        {
          name: "Edit a prepared revert before committing",
          explanation:
            "Uses --no-commit to prepare an inverse, then edits the resulting files before recording it. Use it when a complete reversal needs a deliberate adjustment.",
          note: "There is no special soft-revert command. The inverse is initially staged; stage any additional edits you want included in the final commit.",
          examples: [
            {
              label: "Adjust an inverse README change",
              language: "bash",
              code: 'clean_practice\ngit revert --no-commit HEAD~2\nprintf "Revised replacement introduction\\n" > README.md\ngit add -- README.md\ngit commit -m "Replace introduction after reversing prior wording"',
            },
            {
              label: "Prepare an inverse but keep a revised replacement file",
              language: "bash",
              code: 'clean_practice\ngit revert --no-commit HEAD\nprintf "Revised third feature\\n" > third.txt\ngit add -- third.txt\ngit commit -m "Replace third feature with revised version"',
            },
          ],
          source: "https://git-scm.com/docs/git-revert",
        },
        {
          name: "Reset vs revert",
          explanation:
            "Revert appends an inverse commit; branch-reset forms move a reference and may change the index and files. Choose based on whether you need to preserve the published history and local work.",
          note: "For shared changes, a revert usually avoids replacing existing commit IDs but can still conflict. A path-based reset merely unstages and does not rewrite history; these examples compare branch-reset and revert from the same clean fixture.",
          examples: [
            {
              label: "Preserve the old commit and add an inverse",
              language: "bash",
              code: "clean_practice\ngit revert --no-edit HEAD",
            },
            {
              label:
                "Move the unpublished branch back, keeping its change staged",
              language: "bash",
              code: "clean_practice\ngit reset --soft HEAD~1",
            },
          ],
          source: "https://git-scm.com/docs/git-revert",
        },
        {
          name: "git reflog",
          explanation:
            "Shows the locally recorded history of HEAD movement. Use it to identify a commit before a reset, rebase, or branch switch.",
          note: "Reflogs are local, expire, and do not record arbitrary unsaved file contents. The practice helper discards only the fixture edits before moving main back one commit.",
          examples: [
            {
              label: "Inspect HEAD after a practice reset",
              language: "bash",
              code: "prepare_lost_tip\ngit reflog",
            },
            {
              label: "Limit the displayed movement history",
              language: "bash",
              code: "prepare_lost_tip\ngit reflog -n 5",
            },
          ],
          source: "https://git-scm.com/docs/git-reflog",
        },
        {
          name: "git reflog --all",
          explanation:
            "Shows reflog entries for references that have logs, not only HEAD. Use it to look for a commit preserved in another local reference’s movement history.",
          note: "This does not query every collaborator’s repository or guarantee that a deleted branch’s own reflog survives.",
          examples: [
            {
              label: "Inspect all available local reflogs",
              language: "bash",
              code: "prepare_lost_tip\ngit reflog --all",
            },
            {
              label: "Limit the all-reference report",
              language: "bash",
              code: "prepare_lost_tip\ngit reflog --all -n 8",
            },
          ],
          source: "https://git-scm.com/docs/git-reflog",
        },
        {
          name: "Recover with HEAD@{n}",
          explanation:
            "Resets to a verified earlier HEAD reflog entry. Use it to restore an unpublished branch tip when discarding the current tracked state is intentional.",
          note: "Quote reflog selectors. Index positions change as HEAD moves; do not copy a numeric position from an unrelated history. In this helper’s immediate result, HEAD@{1} is exactly the tip before its one reset.",
          examples: [
            {
              label: "Restore the tip immediately preceding the fixture reset",
              language: "bash",
              code: "prepare_lost_tip\ngit reflog -n 3\ngit reset --hard 'HEAD@{1}'",
            },
            {
              label: "Resolve the verified selector before making another move",
              language: "bash",
              code: 'prepare_lost_tip\nrecovered_commit=$(git rev-parse \'HEAD@{1}\')\ngit show --no-patch --oneline "$recovered_commit"\ngit reset --hard "$recovered_commit"',
            },
          ],
          source: "https://git-scm.com/docs/git-reset",
        },
        {
          name: "Recover by commit ID",
          explanation:
            "Moves the branch back to an inspected commit ID found in local history. Use it after confirming which snapshot should be restored.",
          note: "A hard reset overwrites tracked local state and can remove obstructing untracked paths. The helper saves the known prior tip for this controlled example; in real recovery, verify the candidate with reflog and show.",
          examples: [
            {
              label: "Restore the known pre-reset tip in the fixture",
              language: "bash",
              code: 'prepare_lost_tip\ngit reflog\ngit show --no-patch --oneline "$lost_tip"\ngit reset --hard "$lost_tip"',
            },
            {
              label: "Resolve the verified reflog candidate to a full ID",
              language: "bash",
              code: 'prepare_lost_tip\nverified_sha=$(git rev-parse \'HEAD@{1}\')\ngit show --no-patch --oneline "$verified_sha"\ngit reset --hard "$verified_sha"',
            },
          ],
          source: "https://git-scm.com/docs/git-reset",
        },
        {
          name: "Create a recovery branch from a reflog entry",
          explanation:
            "Creates a new branch at a recovered commit without moving the original branch pointer back. Use it to retain a candidate snapshot for inspection.",
          note: "Switching still changes the checkout and can refuse if work would be overwritten. These examples start clean after the controlled reset; the new branch names must be unused.",
          examples: [
            {
              label: "Keep the recovered tip on a new branch",
              language: "bash",
              code: "prepare_lost_tip\ngit switch -c recovery 'HEAD@{1}'",
            },
            {
              label: "Inspect and name a recovered snapshot explicitly",
              language: "bash",
              code: 'prepare_lost_tip\ncandidate=$(git rev-parse \'HEAD@{1}\')\ngit show --no-patch --oneline "$candidate"\ngit switch -c recovered-snapshot "$candidate"',
            },
          ],
          source: "https://git-scm.com/docs/git-switch",
        },
        {
          name: "git reflog show <branch>",
          explanation:
            "Displays the local movement log of a selected branch. Use it when branch-specific history is clearer than the HEAD checkout log.",
          note: "The branch needs an existing reflog. Its selectors are relative to that reference’s own history.",
          examples: [
            {
              label: "Inspect main’s movements after the controlled reset",
              language: "bash",
              code: "prepare_lost_tip\ngit reflog show main",
            },
            {
              label: "Inspect a branch after rebasing it",
              language: "bash",
              code: "clean_practice\ngit switch rebase-topic\ngit rebase main\ngit reflog show rebase-topic",
            },
          ],
          source: "https://git-scm.com/docs/git-reflog",
        },
        {
          name: "Time-based reflog references",
          explanation:
            "Selects the value a reference had at a requested local time. Use it to investigate approximate historical states before choosing a recovery target.",
          note: "Quote selectors containing braces or spaces. A suitable reflog entry must exist; time expressions use Git’s date parser, and a request older than the log can warn and fall back to its oldest entry. Inspect before resetting. The fixture timestamps commits at earlier times for these examples.",
          examples: [
            {
              label: "Inspect and restore the state from five minutes ago",
              language: "bash",
              code: "clean_practice\ngit show --no-patch --oneline 'HEAD@{5.minutes.ago}'\ngit reset --hard 'HEAD@{5.minutes.ago}'",
            },
            {
              label: "Inspect yesterday’s recorded HEAD without changing it",
              language: "bash",
              code: "git show 'HEAD@{yesterday}'",
            },
          ],
          source: "https://git-scm.com/docs/gitrevisions",
        },
        {
          name: "git config --global gc.reflogExpire",
          explanation:
            "Sets the general age threshold for expiring reflog entries during applicable cleanup. Use it to adjust the retention policy for your user’s repositories.",
          note: "The default general threshold is 90 days; configuration and per-reference rules can override it. This does not immediately expire entries or restore entries already gone.",
          examples: [
            {
              label: "Extend general reflog retention",
              language: "bash",
              code: 'git config --global gc.reflogExpire "200 days"',
            },
            {
              label: "Set and read back the policy",
              language: "bash",
              code: 'git config --global gc.reflogExpire "200 days"\ngit config --global gc.reflogExpire',
            },
          ],
          source: "https://git-scm.com/docs/git-config",
        },
        {
          name: "git config --global gc.reflogExpireUnreachable",
          explanation:
            "Sets the age threshold for expiring entries unreachable from a reference’s current tip. Use it when rewritten-away history needs a longer local recovery window.",
          note: "The default unreachable threshold is 30 days, separately from the general 90-day policy. This setting is not a backup guarantee; pruned objects and missing logs cannot be recovered by extending it later.",
          examples: [
            {
              label: "Extend unreachable-entry retention",
              language: "bash",
              code: 'git config --global gc.reflogExpireUnreachable "200 days"',
            },
            {
              label: "Configure and verify the separate unreachable policy",
              language: "bash",
              code: 'git config --global gc.reflogExpireUnreachable "200 days"\ngit config --global gc.reflogExpireUnreachable',
            },
          ],
          source: "https://git-scm.com/docs/git-config",
        },
        {
          name: "Recover from a completed rebase",
          explanation:
            "Locates the original topic tip and restores it after a completed rewrite. Use it when an unpublished rebase produced the wrong history.",
          note: "If a rebase is still active, consider its abort workflow instead. The controlled examples record a known candidate and then verify it; real reflog positions vary.",
          examples: [
            {
              label:
                "Restore a saved pre-rebase commit after inspecting the reflog",
              language: "bash",
              code: 'clean_practice\ngit switch rebase-topic\npre_rebase_sha=$(git rev-parse HEAD)\ngit rebase main\ngit reflog\ngit show --no-patch --oneline "$pre_rebase_sha"\ngit reset --hard "$pre_rebase_sha"',
            },
            {
              label: "Recover from the topic branch’s own reflog",
              language: "bash",
              code: "clean_practice\ngit switch rebase-topic\ngit rebase main\ngit reflog show rebase-topic\n# In this fresh fixture, the branch’s immediately previous value is the old tip.\ngit reset --hard 'rebase-topic@{1}'",
            },
          ],
          source: "https://git-scm.com/docs/git-reflog",
        },
        {
          name: "Recover a deleted local branch",
          explanation:
            "Creates a new branch at the deleted branch’s last commit when that object can still be located. Use it to recover a recent accidental branch deletion.",
          note: "Deleting a branch deletes its own reflog too; a surviving HEAD reflog can retain the tip if it was checked out. Recovery is not guaranteed after expiry or pruning. The helper checks out and commits on a disposable branch before deleting only its name.",
          examples: [
            {
              label: "Recover the deleted branch using the surviving HEAD log",
              language: "bash",
              code: "prepare_deleted_branch\ngit reflog -n 5\n# In this controlled sequence, the last checkout left the deleted tip at HEAD@{1}.\ngit switch -c recovered-branch 'HEAD@{1}'",
            },
            {
              label:
                "Inspect the deleted tip before recreating its original name",
              language: "bash",
              code: 'prepare_deleted_branch\ndeleted_tip=$(git rev-parse \'HEAD@{1}\')\ngit show --no-patch --oneline "$deleted_tip"\ngit switch -c doomed "$deleted_tip"',
            },
          ],
          source: "https://git-scm.com/docs/git-reflog",
        },
      ],
    },
    {
      name: "Merge Conflicts",
      id: "merge-conflicts",
      intro:
        "Resolve Conflicts from both images, following the supplied order. Run the fresh local fixture before each shell example and keep the shell open for its conflict helpers. The helpers deliberately verify a failed merge or rebase, leaving common.txt unmerged. Some inspection and staging examples intentionally stop before the operation is finished; completion examples either make a merge commit or continue a rebase. The marker sample is literal file text. No remote repository or external merge application is needed.",
      setup: [
        {
          label:
            "Practice fixture — competing edits, independent changes, and a local merge tool",
          language: "bash",
          code: '# POSIX shell or Git Bash, Git 2.28+. Run afresh BEFORE EACH shell example.\nconflict_lab=$(mktemp -d)\ncd "$conflict_lab"\ngit init -b main\ngit config user.name "Demo User"\ngit config user.email "demo@example.com"\ngit config merge.conflictstyle merge\n# A noninteractive local tool for this practice repository only.\ngit config merge.tool practice\ngit config mergetool.practice.cmd \'printf "Resolved by practice tool\\n" > "$MERGED"\'\ngit config mergetool.practice.trustExitCode true\ngit config mergetool.prompt false\ngit config mergetool.keepBackup false\nprintf \'Baseline shared content\\n\' > common.txt\ngit add .\ngit commit -m "Conflict practice baseline"\ngit switch -c topic\nprintf \'Topic-side content\\n\' > common.txt\nprintf \'Independent part of the conflicting commit\\n\' > topic-note.txt\ngit add .\ngit commit -m "Change shared content and add topic note"\nprintf \'Later independent topic work\\n\' > followup.txt\ngit add .\ngit commit -m "Add topic follow-up"\ngit switch main\nprintf \'Main-side content\\n\' > common.txt\ngit add .\ngit commit -m "Change shared content on main"\n\nstart_merge_conflict() {\n  if git merge topic -m "Practice conflicted merge"; then\n    printf \'Expected a merge conflict in this fresh fixture.\\n\' >&2\n    return 1\n  fi\n  test -n "$(git ls-files -u)"\n}\nstart_rebase_conflict() {\n  git switch topic || return\n  if git rebase main; then\n    printf \'Expected a rebase conflict in this fresh fixture.\\n\' >&2\n    return 1\n  fi\n  test -n "$(git ls-files -u)"\n}',
        },
      ],
      methods: [
        {
          name: "git status during a conflict",
          explanation:
            "Reports unmerged paths and the operation currently in progress. Use it to identify what still needs resolution.",
          note: "Status does not decide how content should be reconciled. The fixture helpers deliberately stop with a real conflict in common.txt.",
          source: "https://git-scm.com/docs/git-status",
          examples: [
            {
              label: "Inspect a conflicted merge",
              language: "bash",
              code: "start_merge_conflict\ngit status",
            },
            {
              label: "Inspect short status during a conflicted rebase",
              language: "bash",
              code: "start_rebase_conflict\ngit status -s\n# UU common.txt means both sides modified the path.",
            },
          ],
        },
        {
          name: "git add <resolved-file>",
          explanation:
            "Records your chosen resolved file content in the index. Use it after replacing conflict markers with the intended result.",
          note: "Staging marks the path resolved; Git does not validate that your resolution is correct or that every marker is gone. Review content before staging and finish the active operation afterward.",
          source: "https://git-scm.com/docs/git-add",
          examples: [
            {
              label: "Stage a manual merge resolution without committing yet",
              language: "bash",
              code: 'start_merge_conflict\nprintf "Manually reconciled content\\n" > common.txt\ngit add -- common.txt',
            },
            {
              label: "Stage and inspect another deliberate resolution",
              language: "bash",
              code: 'start_merge_conflict\nprintf "Combined main and topic intent\\n" > common.txt\ngit add -- common.txt\ngit diff --staged',
            },
          ],
        },
        {
          name: "git commit to complete a merge",
          explanation:
            "Creates the merge commit after every conflicted path has been resolved and staged. Use it to finish an ordinary conflicted merge.",
          note: "Use rebase --continue for a paused rebase rather than treating it as an ordinary merge. A plain commit opens the configured editor; -m supplies the message directly.",
          source: "https://git-scm.com/docs/git-commit",
          examples: [
            {
              label: "Resolve, stage, and complete the merge with a message",
              language: "bash",
              code: 'start_merge_conflict\nprintf "Resolved merged content\\n" > common.txt\ngit add -- common.txt\ngit commit -m "Resolve merge conflict"',
            },
            {
              label: "Write the merge message in the editor",
              language: "bash",
              code: 'start_merge_conflict\nprintf "Reviewed merged result\\n" > common.txt\ngit add -- common.txt\ngit commit\n# Review the merge message, save, and close.',
            },
          ],
        },
        {
          name: "git merge --abort",
          explanation:
            "Abandons an in-progress merge and attempts to restore its starting state. Use it when you want to reconsider the integration.",
          note: "The fixture starts clean so the pre-merge state is reconstructible. Existing uncommitted changes can make complete restoration harder; this command is not the rebase abort operation.",
          source: "https://git-scm.com/docs/git-merge",
          examples: [
            {
              label: "Abort the practice merge conflict",
              language: "bash",
              code: "start_merge_conflict\ngit merge --abort",
            },
            {
              label: "Inspect affected paths before aborting",
              language: "bash",
              code: "start_merge_conflict\ngit status -s\ngit merge --abort",
            },
          ],
        },
        {
          name: "git checkout --ours",
          explanation:
            "Restores the entire unmerged path from index stage 2. Use it only when that side’s whole-file version is the intended resolution.",
          note: "In an ordinary merge, ours is the current branch. During a rebase it is the upstream plus already replayed work, not necessarily your original topic. This overwrites the working file; stage it afterward. It differs from the hunk-level merge option -X ours.",
          source: "https://git-scm.com/docs/git-checkout",
          examples: [
            {
              label: "Keep the main-side file during a merge",
              language: "bash",
              code: 'start_merge_conflict\ngit checkout --ours -- common.txt\ngit add -- common.txt\ngit commit -m "Keep main-side file"',
            },
            {
              label: "Keep the upstream-side file during a rebase",
              language: "bash",
              code: "start_rebase_conflict\ngit checkout --ours -- common.txt\ngit add -- common.txt\ngit rebase --continue\n# The fixture still replays the same commit’s independent topic-note.txt.",
            },
          ],
        },
        {
          name: "git checkout --theirs",
          explanation:
            "Restores the entire unmerged path from index stage 3. Use it when the incoming side’s whole-file content is the intended resolution.",
          note: "In a merge, theirs is the branch being integrated. During rebase, it is the topic commit currently being replayed. Other files can still contain automatically combined changes; stage the chosen path before continuing.",
          source: "https://git-scm.com/docs/git-checkout",
          examples: [
            {
              label: "Keep the topic-side file during a merge",
              language: "bash",
              code: 'start_merge_conflict\ngit checkout --theirs -- common.txt\ngit add -- common.txt\ngit commit -m "Keep incoming topic file"',
            },
            {
              label: "Keep the replayed topic file during a rebase",
              language: "bash",
              code: "start_rebase_conflict\ngit checkout --theirs -- common.txt\ngit add -- common.txt\ngit rebase --continue",
            },
          ],
        },
        {
          name: "Conflict markers",
          explanation:
            "Delimit competing content in an unresolved text file. Use them to locate the region that needs a deliberate decision.",
          note: "The default merge style uses <<<<<<<, =======, and >>>>>>> lines. diff3 adds an ancestor section; labels vary by operation. The block below is file content, not executable shell syntax. Remove marker lines while constructing the intended result.",
          source: "https://git-scm.com/docs/git-merge",
          examples: [
            {
              label: "Recognize the fixture’s default merge conflict",
              language: "none",
              code: "<<<<<<< HEAD\nMain-side content\n=======\nTopic-side content\n>>>>>>> topic",
            },
            {
              label:
                "Inspect the real markers and replace them with a resolution",
              language: "bash",
              code: 'start_merge_conflict\ncat common.txt\nprintf "Resolved combined content\\n" > common.txt\ngit add -- common.txt',
            },
          ],
        },
        {
          name: "git diff during a conflict",
          explanation:
            "Shows unmerged working content, often in a combined diff format. Use it to inspect competing edits and the resolution you are preparing.",
          note: "An unresolved file does not have an ordinary single stage-0 index entry. Once resolved and staged, review the index with --staged before committing.",
          source: "https://git-scm.com/docs/git-diff",
          examples: [
            {
              label: "Inspect the unresolved merge diff",
              language: "bash",
              code: "start_merge_conflict\ngit diff",
            },
            {
              label: "Limit the conflict view to one file",
              language: "bash",
              code: "start_merge_conflict\ngit diff -- common.txt",
            },
          ],
        },
        {
          name: "git log --merge",
          explanation:
            "Shows commits from the relevant sides that touch currently unmerged paths. Use it to understand the history behind a live conflict.",
          note: "Requires an in-progress conflicted operation with the relevant merge state and unmerged index entries. It is context, not a resolution command.",
          source: "https://git-scm.com/docs/git-log",
          examples: [
            {
              label: "Inspect the history related to the merge conflict",
              language: "bash",
              code: "start_merge_conflict\ngit log --merge",
            },
            {
              label: "Show a compact history for the conflicted path",
              language: "bash",
              code: "start_merge_conflict\ngit log --merge --oneline -- common.txt",
            },
          ],
        },
        {
          name: "git mergetool",
          explanation:
            "Invokes the selected merge tool to resolve unmerged files. Use it when a configured tool is preferable to editing marker text directly.",
          note: "The fixture configures a deterministic practice tool that writes a fixed resolution and trusts its successful exit, so no external application is required. For real projects, configure an installed tool and review its output; successful tools usually stage resolved files. A resolved file still needs the active merge or rebase completed.",
          source: "https://git-scm.com/docs/git-mergetool",
          examples: [
            {
              label: "Run the configured practice tool and finish the merge",
              language: "bash",
              code: 'start_merge_conflict\ngit mergetool\ngit diff --staged\ngit commit -m "Resolve with practice mergetool"',
            },
            {
              label: "Run the tool for only the selected conflicted file",
              language: "bash",
              code: 'start_merge_conflict\ngit mergetool -- common.txt\ngit diff --staged\ngit commit -m "Resolve selected file with mergetool"',
            },
          ],
        },
        {
          name: "git rebase --continue after resolving conflicts",
          explanation:
            "Resumes replay after the intended conflict resolution is staged. Use it to complete the stopped commit and continue the remaining todo.",
          note: "It may open a commit-message editor or stop at another conflict. If a resolution makes the replayed commit empty, inspect the situation before choosing how to proceed.",
          source: "https://git-scm.com/docs/git-rebase",
          examples: [
            {
              label: "Resolve the conflict and continue replay",
              language: "bash",
              code: 'start_rebase_conflict\nprintf "Reconciled rebase result\\n" > common.txt\ngit add -- common.txt\ngit rebase --continue',
            },
            {
              label: "Review the staged resolution before resuming",
              language: "bash",
              code: 'start_rebase_conflict\nprintf "Reviewed rebase result\\n" > common.txt\ngit add -- common.txt\ngit diff --staged\ngit rebase --continue',
            },
          ],
        },
        {
          name: "git rebase --skip",
          explanation:
            "Drops the entire currently stopped commit from replay and continues with later commits. Use it only when omitting that commit’s whole patch is intentional.",
          note: "It does not merely skip the conflicting hunk. In the fixture, skipping loses both the common.txt edit and the independent topic-note.txt from that commit, while the next commit’s followup.txt still arrives.",
          source: "https://git-scm.com/docs/git-rebase",
          examples: [
            {
              label: "Skip the whole conflicting topic commit",
              language: "bash",
              code: "start_rebase_conflict\ngit rebase --skip",
            },
            {
              label: "Inspect the affected paths before deliberately skipping",
              language: "bash",
              code: "start_rebase_conflict\ngit status -s\ngit rebase --skip",
            },
          ],
        },
      ],
    },
    {
      name: "Viewing History",
      id: "viewing-history",
      intro:
        "Log & History from both images, following the supplied order. The offline fixture has six main commits, eight distinct commits across main and feature, two authors, controlled dates, and a source change that distinguishes message search from pickaxe search. All category examples only inspect history, so you can reuse the clean fixture. Commit IDs and relative dates depend on when you run it; if Git opens a pager, q closes the pager.",
      setup: [
        {
          label:
            "Read-only history practice fixture — known authors, dates, and branch divergence",
          language: "bash",
          code: '# POSIX shell or Git Bash, Git 2.28+. Run once before an example or reuse it:\n# every history example below is read-only.\nhistory_lab=$(mktemp -d)\ncd "$history_lab"\ngit init -b main\ngit config user.name "Demo Committer"\ngit config user.email "committer@example.com"\nhistory_now=$(date +%s)\n# Control both author and committer dates, and vary authors independently.\nhistory_commit() {\n  history_author="$1"\n  history_email="$2"\n  history_age="$3"\n  history_message="$4"\n  GIT_AUTHOR_NAME="$history_author" GIT_AUTHOR_EMAIL="$history_email" \\\n  GIT_AUTHOR_DATE="$((history_now - history_age)) +0000" \\\n  GIT_COMMITTER_DATE="$((history_now - history_age)) +0000" \\\n  git commit -m "$history_message"\n}\nprintf \'Project notes\\n\' > README.md\ngit add .\nhistory_commit "Alice Example" "alice@example.com" 2592000 "Initialize project"\nprintf \'export const code = "alpha";\\n\' > app.js\ngit add .\nhistory_commit "Bob Example" "bob@example.com" 2160000 "Add source module"\nprintf \'Project notes\\nUsage instructions\\n\' > README.md\ngit add .\nhistory_commit "Alice Example" "alice@example.com" 1728000 "Document usage"\nprintf \'export const code = "beta";\\n\' > app.js\ngit add .\nhistory_commit "Bob Example" "bob@example.com" 864000 "fix source output"\nprintf \'Documentation addition\\n\' > docs.txt\ngit add .\nhistory_commit "Alice Example" "alice@example.com" 432000 "Add documentation"\nprintf \'Project notes\\nUsage instructions\\nLatest main notes\\n\' > README.md\ngit add .\nhistory_commit "Bob Example" "bob@example.com" 86400 "Update main notes"\n# Branch from the source fix: main and feature will each have two unique commits.\ngit switch -c feature main~2\nprintf \'Feature preview\\n\' > feature.txt\ngit add .\nhistory_commit "Alice Example" "alice@example.com" 172800 "Add feature preview"\nprintf \'Feature preview corrected\\n\' > feature.txt\ngit add .\nhistory_commit "Bob Example" "bob@example.com" 82800 "fix feature preview"\ngit switch main',
        },
      ],
      methods: [
        {
          name: "git log",
          explanation:
            "Displays commit history reachable from the selected starting point, defaulting to HEAD. Use it to read commit metadata and messages.",
          note: "It does not include uncommitted edits or every branch unless requested. These examples only read the fixture repository.",
          examples: [
            {
              label: "Read current main history",
              language: "bash",
              code: "git log",
            },
            {
              label: "Read history starting at feature instead",
              language: "bash",
              code: "git log feature",
            },
          ],
          source: "https://git-scm.com/docs/git-log",
        },
        {
          name: "git log --oneline",
          explanation:
            "Shows an abbreviated commit ID and subject per commit. Use it for a compact history scan.",
          note: "This is shorthand for an oneline pretty format plus abbreviated commit IDs. Commit IDs and abbreviation lengths vary by repository.",
          examples: [
            {
              label: "Read compact current history",
              language: "bash",
              code: "git log --oneline",
            },
            {
              label: "Read compact feature history",
              language: "bash",
              code: "git log --oneline feature",
            },
          ],
          source: "https://git-scm.com/docs/git-log",
        },
        {
          name: "git log --graph --all",
          explanation:
            "Draws an ASCII ancestry graph across references. Use it to inspect branch divergence and shared ancestry.",
          note: "--all includes commits reachable from refs and HEAD, not every dangling object or expired reflog entry. Display order can differ from simple chronological order.",
          examples: [
            {
              label: "Draw history across all fixture references",
              language: "bash",
              code: "git log --graph --all",
            },
            {
              label: "Use subjects and abbreviated IDs in the graph",
              language: "bash",
              code: "git log --graph --all --oneline",
            },
          ],
          source: "https://git-scm.com/docs/git-log",
        },
        {
          name: "git log -n",
          explanation:
            "Limits the number of commits displayed. Use it to focus on the most recent part of a selected history.",
          note: "The fixture has six main commits, so -n 5 deliberately omits its oldest main commit. Ordering and other filters still apply.",
          examples: [
            {
              label: "Show five commits from current history",
              language: "bash",
              code: "git log -n 5",
            },
            {
              label: "Show two compact feature commits",
              language: "bash",
              code: "git log --oneline -n 2 feature",
            },
          ],
          source: "https://git-scm.com/docs/git-log",
        },
        {
          name: "git log --grep",
          explanation:
            "Filters commits by their commit-message text. Use it to search subjects or bodies for a keyword or pattern.",
          note: "The default pattern is a case-sensitive basic regular expression, not a code-content search. Revision selection still limits the searched history.",
          examples: [
            {
              label: "Find fix messages in current main history",
              language: "bash",
              code: 'git log --grep="fix"',
            },
            {
              label: "Match messages without case sensitivity",
              language: "bash",
              code: 'git log --oneline -i --grep="FIX"',
            },
          ],
          source: "https://git-scm.com/docs/git-log",
        },
        {
          name: "git log --author",
          explanation:
            "Filters commits using the author identity. Use it when investigating work attributed to a particular person.",
          note: "The pattern is a regular expression matched against author information, not the committer identity. An author filter is not proof of who executed or reviewed the work.",
          examples: [
            {
              label: "Find commits authored by Alice",
              language: "bash",
              code: 'git log --author="Alice"',
            },
            {
              label: "Filter by Bob’s example email address",
              language: "bash",
              code: 'git log --oneline --author="bob@example[.]com"',
            },
          ],
          source: "https://git-scm.com/docs/git-log",
        },
        {
          name: "git log --since",
          explanation:
            "Filters commits newer than a date or relative-time boundary. Use it to narrow a recent investigation.",
          note: "Log time filtering uses commit timestamps, not file modification times. Relative dates are evaluated when you run the command; the fixture creates controlled historical dates.",
          examples: [
            {
              label: "Read the last two weeks of main commits",
              language: "bash",
              code: 'git log --since="2 weeks ago"',
            },
            {
              label: "Include recent commits from every fixture branch",
              language: "bash",
              code: 'git log --all --oneline --since="2 weeks ago"',
            },
          ],
          source: "https://git-scm.com/docs/git-log",
        },
        {
          name: "git log -- <file>",
          explanation:
            "Limits history to commits affecting a selected path. Use it to investigate a file’s evolution.",
          note: "-- separates revisions and options from paths. Path-based history simplification can omit other commits; following a rename requires a deliberate additional option.",
          examples: [
            {
              label: "Read README history",
              language: "bash",
              code: "git log -- README.md",
            },
            {
              label: "Read compact source-file history",
              language: "bash",
              code: "git log --oneline -- app.js",
            },
          ],
          source: "https://git-scm.com/docs/git-log",
        },
        {
          name: "git log -p <file>",
          explanation:
            "Includes patches for the selected file’s historical changes. Use it to see what changed, not just the commit messages.",
          note: "Place -- before the path to avoid ambiguity. This displays historical patches without modifying the current file.",
          examples: [
            {
              label: "Read source-file patches",
              language: "bash",
              code: "git log -p -- app.js",
            },
            {
              label: "Inspect the most recent README patch",
              language: "bash",
              code: "git log -n 1 -p -- README.md",
            },
          ],
          source: "https://git-scm.com/docs/git-log",
        },
        {
          name: "git blame",
          explanation:
            "Annotates lines with the commit and author that last changed them in the selected version. Use it as a starting point for understanding why a line exists.",
          note: "It is line attribution, not a measure of responsibility or ownership. By default it can account for working-tree content; the clean fixture makes the annotations entirely committed history.",
          examples: [
            {
              label: "Inspect README line authorship",
              language: "bash",
              code: "git blame -- README.md",
            },
            {
              label: "Limit the annotation to the first two lines",
              language: "bash",
              code: "git blame -L 1,2 -- README.md",
            },
          ],
          source: "https://git-scm.com/docs/git-blame",
        },
        {
          name: "git log --pretty=oneline",
          explanation:
            "Displays each commit as its ID and subject on one line. Use it when selecting the pretty format explicitly.",
          note: "Unlike the --oneline shorthand, this format alone normally keeps full commit IDs; use --abbrev-commit to request abbreviations.",
          examples: [
            {
              label: "Show full IDs with commit subjects",
              language: "bash",
              code: "git log --pretty=oneline",
            },
            {
              label: "Explicitly abbreviate the oneline pretty format",
              language: "bash",
              code: "git log --pretty=oneline --abbrev-commit",
            },
          ],
          source: "https://git-scm.com/docs/git-log",
        },
        {
          name: "git log --pretty=format",
          explanation:
            "Builds a custom textual commit summary from placeholders. Use it for a concise report tailored to your investigation.",
          note: "%h is the abbreviated ID, %an the author name, %ar the relative author date, and %s the subject. This is a display format, not a stable machine interchange format.",
          examples: [
            {
              label: "Show author and relative author date",
              language: "bash",
              code: 'git log --pretty=format:"%h - %an, %ar : %s"',
            },
            {
              label: "Use a calendar date for the author timestamp",
              language: "bash",
              code: 'git log --date=short --pretty=format:"%h | %an | %ad | %s"',
            },
          ],
          source: "https://git-scm.com/docs/git-log",
        },
        {
          name: "Formatted all-branch graph",
          explanation:
            "Combines ancestry drawing with compact IDs and subjects. Use it to inspect the shape of several branches in one report.",
          note: "--graph adds graph columns and affects ordering; --all selects all references. The fixture’s main and feature each contain two unique commits after their shared ancestor.",
          examples: [
            {
              label: "Use the exact graph and pretty-format combination",
              language: "bash",
              code: "git log --graph --pretty=oneline --abbrev-commit --all",
            },
            {
              label: "Limit the compact all-reference graph",
              language: "bash",
              code: "git log --graph --pretty=oneline --abbrev-commit --all -n 6",
            },
          ],
          source: "https://git-scm.com/docs/git-log",
        },
        {
          name: "git log --stat",
          explanation:
            "Adds per-commit file and line-change summaries. Use it to gauge the size and touched paths of historical changes.",
          note: "It summarizes each selected commit, not the current working directory. Binary changes may have non-line-count summaries.",
          examples: [
            {
              label: "Read statistics for main history",
              language: "bash",
              code: "git log --stat",
            },
            {
              label: "Inspect statistics for the latest two main commits",
              language: "bash",
              code: "git log --stat -n 2",
            },
          ],
          source: "https://git-scm.com/docs/git-log",
        },
        {
          name: "git shortlog -sn",
          explanation:
            "Summarizes commit counts by author and sorts by count. Use it to get a rough contribution summary for a selected history.",
          note: "-s suppresses per-commit subjects and -n sorts numerically. Name mapping can affect grouping. Pass HEAD explicitly in scripts so shortlog does not wait for log input on stdin; counts do not measure the size or value of work.",
          examples: [
            {
              label: "Count authors in current main history",
              language: "bash",
              code: "git shortlog -sn HEAD",
            },
            {
              label: "Count authors across all fixture branches",
              language: "bash",
              code: "git shortlog -sn --all",
            },
          ],
          source: "https://git-scm.com/docs/git-shortlog",
        },
        {
          name: "git log -S",
          explanation:
            "Selects commits whose diff changes the number of occurrences of a string. Use this pickaxe search to find when text was introduced or removed.",
          note: "It does not simply find every commit touching a line containing that text. The fixture’s fix changes alpha to beta while leaving the occurrence count of code unchanged.",
          examples: [
            {
              label: "Find the introduction of the code identifier",
              language: "bash",
              code: 'git log -S "code" -- app.js',
            },
            {
              label: "Find when alpha was added or removed",
              language: "bash",
              code: 'git log --oneline -S "alpha" -- app.js',
            },
          ],
          source: "https://git-scm.com/docs/git-log",
        },
        {
          name: "git log --all --grep",
          explanation:
            "Searches commit messages across all selected references. Use it when the relevant commit may be on another branch.",
          note: "--all broadens reachability; it does not search uncommitted files or every unreachable commit. The fixture has one fix message on main and another on feature.",
          examples: [
            {
              label: "Find fix messages across branches",
              language: "bash",
              code: 'git log --all --grep="fix"',
            },
            {
              label: "Read matching subjects compactly across branches",
              language: "bash",
              code: 'git log --all --oneline --grep="fix"',
            },
          ],
          source: "https://git-scm.com/docs/git-log",
        },
        {
          name: "git log main..feature",
          explanation:
            "Lists commits reachable from feature but not main. Use it to inspect history that feature could contribute to main.",
          note: "The left endpoint is excluded by reachability, not by a fixed chronological slice. Swapping the endpoints reverses which branch’s unique commits are selected.",
          examples: [
            {
              label: "Inspect commits unique to feature",
              language: "bash",
              code: "git log main..feature",
            },
            {
              label: "Inspect commits unique to main",
              language: "bash",
              code: "git log --oneline feature..main",
            },
          ],
          source: "https://git-scm.com/docs/git-log",
        },
        {
          name: "git log --left-right main...feature",
          explanation:
            "Lists commits unique to either side of a symmetric difference. Use it to inspect divergence from both branches at once.",
          note: "< marks commits only on the left (main) and > only on the right (feature); shared ancestors are excluded. Three-dot log selection differs from three-dot diff semantics.",
          examples: [
            {
              label: "Mark each side of the branch divergence",
              language: "bash",
              code: "git log --left-right main...feature",
            },
            {
              label: "Show a compact divergent-history report",
              language: "bash",
              code: "git log --left-right --oneline main...feature",
            },
          ],
          source: "https://git-scm.com/docs/git-log",
        },
        {
          name: "git show <commit>",
          explanation:
            "Displays a selected commit and its patch. Use it to inspect one known historical change.",
          note: "HEAD selects the current tip. The command also supports other object types, but these examples deliberately select commits.",
          examples: [
            {
              label: "Inspect the latest main commit",
              language: "bash",
              code: "git show HEAD",
            },
            {
              label: "Inspect the feature tip without switching branches",
              language: "bash",
              code: "git show feature",
            },
          ],
          source: "https://git-scm.com/docs/git-show",
        },
        {
          name: "git show <commit>:<file>",
          explanation:
            "Prints a file’s stored contents at a selected revision. Use it to inspect an old version without checking it out.",
          note: "The path after the colon is relative to the repository root. This reads the blob content rather than showing a patch, and leaves the index and working tree unchanged.",
          examples: [
            {
              label: "Read the current committed source file",
              language: "bash",
              code: "git show HEAD:app.js",
            },
            {
              label: "Read the source file before its fix",
              language: "bash",
              code: "git show HEAD~3:app.js",
            },
          ],
          source: "https://git-scm.com/docs/git-show",
        },
      ],
    },
    {
      name: "Tags & Releases",
      id: "tags-releases",
      intro:
        "Version Tagging from both images, following the supplied order. Run the fresh local fixture before each independent example: it supplies three commits, existing lightweight and annotated tags, and a disposable origin with only v0.8.0 initially published. v1.0.0 and v1.0 are deliberately unused for creation examples. Signed-tag examples additionally require a working signing setup. Git tag operations mark repository objects; hosting-service release pages, release notes, and downloadable assets are separate workflows not added here.",
      setup: [
        {
          label:
            "Local version-tagging fixture — fresh names and an offline publishing destination",
          language: "bash",
          code: '# POSIX shell or Git Bash, Git 2.28+. Run afresh BEFORE EACH example.\n# The origin below is a new local bare repository, never an online service.\ntag_lab=$(mktemp -d)\ngit init --bare "$tag_lab/origin.git"\ngit init -b main "$tag_lab/work"\ncd "$tag_lab/work"\ngit config user.name "Demo User"\ngit config user.email "demo@example.com"\ngit config tag.gpgSign false\nprintf \'Baseline release content\\n\' > release.txt\ngit add .\ngit commit -m "Initial release snapshot"\ngit tag v0.8.0\nprintf \'Second release content\\n\' > release.txt\ngit add .\ngit commit -m "Prepare second release snapshot"\ngit tag -a v0.9.0 -m "Version 0.9.0"\nprintf \'Current release content\\n\' > release.txt\ngit add .\ngit commit -m "Prepare current release snapshot"\ngit tag v1.1.0\ngit remote add origin "$tag_lab/origin.git"\ngit push origin main v0.8.0\ngit --git-dir="$tag_lab/origin.git" symbolic-ref HEAD refs/heads/main\n\nprepare_release_tag() {\n  # A retrospective annotation at the previous snapshot, not the newer main tip.\n  git tag -a v1.0.0 HEAD~1 -m "Version 1.0.0"\n}',
        },
      ],
      methods: [
        {
          name: "git tag",
          explanation:
            "Lists local tag names when called without a new tag argument. Use it to inspect the milestones already present in this repository.",
          note: "This is a local list, not a query of the server. Tags are references to objects; naming a tag does not by itself create a hosting-service release.",
          examples: [
            {
              label: "List the fixture’s local tags",
              language: "bash",
              code: "git tag",
            },
            {
              label: "List names after creating a lightweight milestone",
              language: "bash",
              code: "git tag local-milestone\ngit tag",
            },
          ],
          source: "https://git-scm.com/docs/git-tag",
        },
        {
          name: "git tag -l",
          explanation:
            "Lists tags matching one or more shell-style patterns. Use it to narrow a large release list.",
          note: "Quote patterns so your shell does not expand them against filenames. -l explicitly selects listing rather than tag creation.",
          examples: [
            {
              label: "List v1-series tag names",
              language: "bash",
              code: 'git tag -l "v1.*"',
            },
            {
              label: "List the older v0-series names",
              language: "bash",
              code: 'git tag -l "v0.*"',
            },
          ],
          source: "https://git-scm.com/docs/git-tag",
        },
        {
          name: "git tag <name>",
          explanation:
            "Creates a lightweight tag at HEAD by default. Use it for a simple local pointer to a chosen milestone.",
          note: "With signing defaults disabled, this creates no separate annotated tag object. The name must be available; do not overwrite published release names casually. The fixture leaves v1.0.0 unused.",
          examples: [
            {
              label: "Create a lightweight tag at the current commit",
              language: "bash",
              code: "git tag v1.0.0",
            },
            {
              label: "Create a short-form lightweight milestone",
              language: "bash",
              code: "git tag v1.0",
            },
          ],
          source: "https://git-scm.com/docs/git-tag",
        },
        {
          name: "git tag -a",
          explanation:
            "Creates an annotated tag with tagger information, date, and a message. Use it when a milestone needs its own descriptive metadata.",
          note: "-m supplies the message; without it Git opens an editor. A tag name cannot simultaneously refer to both lightweight and annotated objects; the independent examples start fresh.",
          examples: [
            {
              label: "Create an annotation without opening an editor",
              language: "bash",
              code: 'git tag -a v1.0.0 -m "Version 1.0.0"',
            },
            {
              label: "Write the annotation in the configured editor",
              language: "bash",
              code: "git tag -a v1.0\n# Enter a tag message, save, and close.",
            },
          ],
          source: "https://git-scm.com/docs/git-tag",
        },
        {
          name: "git tag <name> <commit>",
          explanation:
            "Creates a tag at an explicit historical commit instead of the current tip. Use it when labeling a milestone after development has moved on.",
          note: "Verify the target before tagging; creating a tag does not check out that commit or change its contents.",
          examples: [
            {
              label: "Tag the previous commit with a lightweight name",
              language: "bash",
              code: "git tag v1.0.0 HEAD~1",
            },
            {
              label: "Annotate an earlier release snapshot",
              language: "bash",
              code: 'git tag -a v1.0.0 HEAD~1 -m "Version 1.0.0 from the previous snapshot"',
            },
          ],
          source: "https://git-scm.com/docs/git-tag",
        },
        {
          name: "git push origin <tag>",
          explanation:
            "Publishes one named local tag to origin. Use it when only the selected milestone should be shared.",
          note: "Existing conflicting remote tags are normally rejected. Use an explicit refs/tags refspec when a branch and tag share a short name. The fixture origin is a disposable local bare repository.",
          examples: [
            {
              label: "Publish one new release tag",
              language: "bash",
              code: "prepare_release_tag\ngit push origin v1.0.0",
            },
            {
              label: "Publish the tag using an unambiguous refspec",
              language: "bash",
              code: "prepare_release_tag\ngit push origin refs/tags/v1.0.0:refs/tags/v1.0.0",
            },
          ],
          source: "https://git-scm.com/docs/git-push",
        },
        {
          name: "git push origin --tags",
          explanation:
            "Publishes all local tags to origin. Use it only when each local tag is intended for that destination.",
          note: "It does not create a release page or attach build assets. Publishing all tags can include private or experimental tag names, and conflicting existing tags can be rejected.",
          examples: [
            {
              label: "Publish all existing fixture tags",
              language: "bash",
              code: "git push origin --tags",
            },
            {
              label: "Include a newly prepared annotated release tag",
              language: "bash",
              code: "prepare_release_tag\ngit push origin --tags",
            },
          ],
          source: "https://git-scm.com/docs/git-push",
        },
        {
          name: "git tag -d",
          explanation:
            "Deletes a local tag reference. Use it to remove a local name you no longer need.",
          note: "This does not delete the tag on any remote or on another person’s clone. Removing its reference can eventually leave an otherwise unreferenced annotated object eligible for pruning.",
          examples: [
            {
              label:
                "Delete a local tag while leaving its published counterpart intact",
              language: "bash",
              code: "prepare_release_tag\ngit push origin v1.0.0\ngit tag -d v1.0.0",
            },
            {
              label: "Delete an existing local annotation",
              language: "bash",
              code: "git tag -d v0.9.0",
            },
          ],
          source: "https://git-scm.com/docs/git-tag",
        },
        {
          name: "git push origin --delete <tag>",
          explanation:
            "Requests deletion of a tag reference on origin. Use it only when removal of the shared tag is intentional and coordinated.",
          note: "The local tag remains. Use refs/tags/name to disambiguate a tag from an identically named branch; server permissions and tag protections still apply.",
          examples: [
            {
              label: "Delete a tag only on the practice remote",
              language: "bash",
              code: "prepare_release_tag\ngit push origin v1.0.0\ngit push origin --delete v1.0.0",
            },
            {
              label: "Delete the explicitly named tag reference",
              language: "bash",
              code: "prepare_release_tag\ngit push origin v1.0.0\ngit push origin --delete refs/tags/v1.0.0",
            },
          ],
          source: "https://git-scm.com/docs/git-push",
        },
        {
          name: "Annotated vs lightweight tags",
          explanation:
            "A lightweight tag points directly to its target; an annotated tag points to a separate tag object containing metadata. Choose the form based on whether the milestone needs its own annotation.",
          note: "The examples inspect object types without changing the target commit. Both names would live under refs/tags; these alternative examples use a fresh fixture to avoid name collisions.",
          examples: [
            {
              label: "Inspect a lightweight tag’s direct commit target",
              language: "bash",
              code: "git tag v1.0\ngit cat-file -t refs/tags/v1.0\n# commit",
            },
            {
              label: "Inspect the separate annotated tag object",
              language: "bash",
              code: 'git tag -a v1.0 -m "Annotated milestone"\ngit cat-file -t refs/tags/v1.0\n# tag',
            },
          ],
          source: "https://git-scm.com/docs/git-tag",
        },
        {
          name: "git tag -s",
          explanation:
            "Creates a cryptographically signed annotated tag. Use it when consumers need to verify the signed tag object and its claimed identity.",
          note: "Lowercase -s signs a tag; it differs from commit’s sign-off flag. Requires a configured signing backend and accessible key, with any necessary agent or passphrase flow. Signing a tag does not sign every referenced commit or automatically establish trust.",
          examples: [
            {
              label:
                "Sign a tag at the current commit using your configured key",
              language: "bash",
              code: '# Requires a working signing setup and key access.\ngit tag -s v1.0.0 -m "Signed release"',
            },
            {
              label: "Sign an explicitly selected earlier commit",
              language: "bash",
              code: '# Requires a working signing setup and key access.\ngit tag -s v1.0.0 HEAD~1 -m "Signed earlier release"',
            },
          ],
          source: "https://git-scm.com/docs/git-tag",
        },
        {
          name: "git show <tag>",
          explanation:
            "Displays the tagged object and, for annotated tags, the tag metadata first. Use it to inspect what a release name actually identifies.",
          note: "For a tag targeting a commit, the display normally includes commit information and its patch. Lightweight tags have no separate annotation to display.",
          examples: [
            {
              label: "Inspect an existing annotated tag",
              language: "bash",
              code: "git show v0.9.0",
            },
            {
              label: "Inspect a prepared release annotation and target",
              language: "bash",
              code: "prepare_release_tag\ngit show v1.0.0",
            },
          ],
          source: "https://git-scm.com/docs/git-show",
        },
        {
          name: "git tag -n",
          explanation:
            "Lists tags with message lines. Use it for a compact milestone list with context.",
          note: "The default is one message line. Annotated tags use the annotation; a lightweight tag uses its target commit’s message instead.",
          examples: [
            {
              label: "List tag names with their first message line",
              language: "bash",
              code: "git tag -n",
            },
            {
              label: "Display up to three message lines for v0 tags",
              language: "bash",
              code: 'git tag -n3 -l "v0.*"',
            },
          ],
          source: "https://git-scm.com/docs/git-tag",
        },
        {
          name: "git checkout tags/<tag>",
          explanation:
            "Checks out a tagged snapshot in detached HEAD state. Use it to inspect or test a release without moving a branch pointer.",
          note: "New commits made while detached need a branch or another reference if you want to retain them. The full refs/tags spelling avoids refname ambiguity; start with a clean working tree.",
          examples: [
            {
              label: "Inspect the prepared version in detached HEAD state",
              language: "bash",
              code: "prepare_release_tag\ngit checkout tags/v1.0.0",
            },
            {
              label: "Check out an existing tag with its full reference name",
              language: "bash",
              code: "git checkout refs/tags/v0.9.0",
            },
          ],
          source: "https://git-scm.com/docs/git-checkout",
        },
        {
          name: "git checkout -b <branch> <tag>",
          explanation:
            "Creates a branch at a tagged commit and checks it out. Use it when you want to make and retain changes based on an older release.",
          note: "The branch name must be new. Creating this branch does not move or rename the tag.",
          examples: [
            {
              label: "Start a branch from the prepared release tag",
              language: "bash",
              code: "prepare_release_tag\ngit checkout -b branch-from-tag v1.0.0",
            },
            {
              label: "Start maintenance work from an older annotated version",
              language: "bash",
              code: "git checkout -b maintenance-v0.9 v0.9.0",
            },
          ],
          source: "https://git-scm.com/docs/git-checkout",
        },
        {
          name: "git ls-remote --tags",
          explanation:
            "Queries tag references advertised by a remote without fetching them into local refs. Use it to inspect which tag names the destination currently exposes.",
          note: "Annotated tags can produce both a tag-object line and a peeled target line ending in ^{}. --refs suppresses peeled entries. This is a live query, unlike listing local tags.",
          examples: [
            {
              label: "Inspect tags already published on the practice remote",
              language: "bash",
              code: "git ls-remote --tags origin",
            },
            {
              label:
                "Publish one annotation, then list tag references without peeled lines",
              language: "bash",
              code: "prepare_release_tag\ngit push origin v1.0.0\ngit ls-remote --tags --refs origin",
            },
          ],
          source: "https://git-scm.com/docs/git-ls-remote",
        },
      ],
    },
    {
      name: "Advanced Techniques",
      id: "advanced-techniques",
      intro:
        "Submodules → Bisect (Find Bugs) → Worktrees, following all six images. Each section has its own offline fixture below: run the matching fixture afresh before each example, in the same shell as any helpers. Submodule file-transport exceptions apply only to trusted local practice sources, not global configuration. Bisect changes candidate checkouts until reset. Worktree and stored-module deletion examples affect only newly created temporary paths. No external repositories, accounts, or project files are modified by these examples.",
      setup: [
        {
          label:
            "Submodule fixture — two recorded pins and a newer upstream revision",
          language: "bash",
          code: '# Submodule examples: POSIX shell or Git Bash, Git 2.28+.\n# Run afresh before EACH submodule example; keep this shell open.\nsubmodule_lab=$(mktemp -d)\nsubmodule_lab=$(cd "$submodule_lab" && pwd -P)\ngit init -b main "$submodule_lab/library"\ngit -C "$submodule_lab/library" config user.name "Demo User"\ngit -C "$submodule_lab/library" config user.email "demo@example.com"\nprintf \'Library version one\\n\' > "$submodule_lab/library/library.txt"\ngit -C "$submodule_lab/library" add .\ngit -C "$submodule_lab/library" commit -m "Library baseline"\ngit init -b main "$submodule_lab/super"\ncd "$submodule_lab/super"\ngit config user.name "Demo User"\ngit config user.email "demo@example.com"\nprintf \'Superproject baseline\\n\' > README.md\ngit add .\ngit commit -m "Superproject baseline"\n# File transport is allowed only for these trusted disposable local sources.\ngit -c protocol.file.allow=always submodule add "$submodule_lab/library" vendor/library\ngit -c protocol.file.allow=always submodule add "$submodule_lab/library" vendor/plugin\ngit commit -m "Pin two dependencies to version one"\n# Advance the dependency upstream AFTER the superproject pins its older commit.\nprintf \'Library version two\\n\' > "$submodule_lab/library/library.txt"\ngit -C "$submodule_lab/library" add .\ngit -C "$submodule_lab/library" commit -m "Advance library upstream"\npurge_removed_module() {\n  # Refuse anything outside the newly created fixture’s stored module directory.\n  case "$1" in\n    "$submodule_lab"/super/.git/modules/*) rm -rf -- "$1" ;;\n    *) printf \'Refusing unexpected module directory.\\n\' >&2; return 1 ;;\n  esac\n}',
        },
        {
          label:
            "Bisect fixture — executable test and a known first-bad commit",
          language: "bash",
          code: '# Bisect examples: POSIX shell or Git Bash, Git 2.28+.\n# Run afresh before EACH bisect example.\nbisect_lab=$(mktemp -d)\ngit init -b main "$bisect_lab/repo"\ncd "$bisect_lab/repo"\ngit config user.name "Demo User"\ngit config user.email "demo@example.com"\nprintf \'#!/bin/sh\\ngrep -qx "result=good" app.txt\\n\' > test.sh\nchmod +x test.sh\nprintf \'result=good\\n\' > app.txt\ngit add .\ngit commit -m "Known good baseline"\ngit tag v1.0\nfor step in 1 2 3 4 5 6 7; do\n  printf \'History step %s\\n\' "$step" > progress.txt\n  if test "$step" -eq 4; then printf \'result=bad\\n\' > app.txt; fi\n  git add .\n  git commit -m "History step $step"\ndone\n# Step 4 introduced the deterministic regression; later steps keep it.\nstart_search() {\n  git bisect start HEAD v1.0\n}',
        },
        {
          label:
            "Worktree fixture — existing branches and a scoped stale-checkout helper",
          language: "bash",
          code: '# Worktree examples: POSIX shell or Git Bash, Git 2.28+.\n# Run afresh before EACH worktree example; keep this shell open.\nworktree_lab=$(mktemp -d)\nworktree_lab=$(cd "$worktree_lab" && pwd -P)\ngit init -b main "$worktree_lab/main"\ncd "$worktree_lab/main"\ngit config user.name "Demo User"\ngit config user.email "demo@example.com"\nprintf \'Baseline project\\n\' > README.md\ngit add .\ngit commit -m "Worktree baseline"\ngit branch release\nprintf \'Main project update\\n\' > README.md\ngit add .\ngit commit -m "Advance main"\ngit branch feature\nprepare_stale_worktree() {\n  git worktree add "$worktree_lab/stale-checkout" feature || return\n  # Delete only the checkout we just created inside this fresh fixture.\n  rm -rf -- "$worktree_lab/stale-checkout"\n}',
        },
      ],
      methods: [
        {
          name: "git submodule add",
          explanation:
            "Registers a repository at a path within the superproject and stages its gitlink and .gitmodules entry. Use it when a dependency needs its own Git history and a pinned revision.",
          note: "Use the submodule fixture. The examples allow file transport only for their trusted local source. A gitlink records a commit ID rather than copying the dependency history into the superproject; commit the staged registration to share it.",
          examples: [
            {
              label: "Add a dependency at a new path",
              language: "bash",
              code: 'git -c protocol.file.allow=always submodule add "$submodule_lab/library" vendor/extra\ngit commit -m "Register extra dependency"',
            },
            {
              label: "Add a dependency under a descriptive path",
              language: "bash",
              code: 'git -c protocol.file.allow=always submodule add "$submodule_lab/library" third-party/library\ngit commit -m "Register third-party library"',
            },
          ],
          source: "https://git-scm.com/docs/git-submodule",
        },
        {
          name: "git clone --recursive",
          explanation:
            "Clones a superproject and initializes its submodules recursively. Use it when you need the recorded dependency checkouts immediately.",
          note: "Use the submodule fixture. --recursive is an alias for --recurse-submodules; dependencies are checked out at recorded gitlink commits, not automatically at their latest upstream tips. Local file transport is enabled only for this trusted offline example.",
          examples: [
            {
              label: "Clone the superproject with its dependency checkouts",
              language: "bash",
              code: 'git -c protocol.file.allow=always clone --recursive "$submodule_lab/super" "$submodule_lab/recursive-copy"',
            },
            {
              label: "Use the explicit recurse-submodules spelling",
              language: "bash",
              code: 'git -c protocol.file.allow=always clone --recurse-submodules "$submodule_lab/super" "$submodule_lab/complete-copy"',
            },
          ],
          source: "https://git-scm.com/docs/git-clone",
        },
        {
          name: "git submodule update --init",
          explanation:
            "Initializes missing submodule configuration and checks out recorded commits. Use it after a clone that did not populate dependency worktrees.",
          note: "Use the submodule fixture. --recursive also processes nested submodules; updating to recorded commits is distinct from following remote branches.",
          examples: [
            {
              label: "Reinitialize one deinitialized dependency",
              language: "bash",
              code: "git submodule deinit -- vendor/library\ngit -c protocol.file.allow=always submodule update --init -- vendor/library",
            },
            {
              label: "Initialize dependency checkouts after an ordinary clone",
              language: "bash",
              code: 'git clone "$submodule_lab/super" "$submodule_lab/plain-copy"\ncd "$submodule_lab/plain-copy"\ngit -c protocol.file.allow=always submodule update --init --recursive',
            },
          ],
          source: "https://git-scm.com/docs/git-submodule",
        },
        {
          name: "git submodule update --remote",
          explanation:
            "Updates selected initialized submodules using their configured remote-tracking branch instead of the superproject’s recorded gitlink. Use it when intentionally advancing dependency versions.",
          note: "Use the submodule fixture, whose source main has one newer commit. The default checkout mode generally leaves detached submodule HEADs; review and commit the changed gitlink in the superproject to share the new pin.",
          examples: [
            {
              label:
                "Advance all initialized dependencies to their upstream tips",
              language: "bash",
              code: "git -c protocol.file.allow=always submodule update --remote",
            },
            {
              label: "Advance one dependency and record its new pin",
              language: "bash",
              code: 'git -c protocol.file.allow=always submodule update --remote -- vendor/library\ngit add -- vendor/library\ngit commit -m "Advance pinned library revision"',
            },
          ],
          source: "https://git-scm.com/docs/git-submodule",
        },
        {
          name: "git submodule init",
          explanation:
            "Registers submodule configuration locally from .gitmodules without checking out its files. Use it as the first half of an explicit init-then-update workflow.",
          note: "Use the submodule fixture. Existing local submodule settings are not simply overwritten. Initialization alone does not download or populate a missing dependency worktree.",
          examples: [
            {
              label: "Register one deinitialized dependency",
              language: "bash",
              code: "git submodule deinit -- vendor/library\ngit submodule init -- vendor/library",
            },
            {
              label: "Register all deinitialized dependencies",
              language: "bash",
              code: "git submodule deinit --all\ngit submodule init",
            },
          ],
          source: "https://git-scm.com/docs/git-submodule",
        },
        {
          name: "git submodule update",
          explanation:
            "Brings initialized submodule worktrees to the commits recorded in the superproject’s index under the default checkout mode. Use it to restore reproducible dependency pins.",
          note: "Use the submodule fixture. Without --init it does not initialize missing registrations, and local modifications can prevent checkout.",
          examples: [
            {
              label:
                "Return a deliberately advanced dependency to its recorded pin",
              language: "bash",
              code: "git -C vendor/library fetch origin\ngit -C vendor/library checkout --detach origin/main\ngit submodule update -- vendor/library",
            },
            {
              label: "Use the explicit two-step initialization workflow",
              language: "bash",
              code: "git submodule deinit -- vendor/library\ngit submodule init -- vendor/library\ngit -c protocol.file.allow=always submodule update -- vendor/library",
            },
          ],
          source: "https://git-scm.com/docs/git-submodule",
        },
        {
          name: "git submodule foreach git pull origin main",
          explanation:
            "Runs a command in each initialized, checked-out submodule. Use it only when the same integration policy really applies to every selected dependency.",
          note: "Use the submodule fixture. This pulls main into each current submodule checkout, which may be detached or on another branch; it is not the same as restoring recorded pins. Default foreach is not recursive and stops on a failing command. Review changed gitlinks before committing them.",
          examples: [
            {
              label: "Pull main in each initialized practice dependency",
              language: "bash",
              code: "git -c protocol.file.allow=always submodule foreach 'git pull origin main'",
            },
            {
              label: "Require fast-forward-only integration in each dependency",
              language: "bash",
              code: "git -c protocol.file.allow=always submodule foreach 'git pull --ff-only origin main'",
            },
          ],
          source: "https://git-scm.com/docs/git-submodule",
        },
        {
          name: "git submodule deinit",
          explanation:
            "Removes a submodule’s local registration and working checkout while retaining its recorded presence in the project. Use it when you do not currently need that dependency populated.",
          note: "Use the submodule fixture. It can refuse locally modified work unless forced; these examples use clean submodules. This is not removal of the tracked gitlink and .gitmodules entry.",
          examples: [
            {
              label: "Deinitialize one clean dependency",
              language: "bash",
              code: "git submodule deinit -- vendor/library",
            },
            {
              label: "Deinitialize the other clean dependency",
              language: "bash",
              code: "git submodule deinit -- vendor/plugin",
            },
          ],
          source: "https://git-scm.com/docs/git-submodule",
        },
        {
          name: "git rm <submodule-path>",
          explanation:
            "Stages removal of the submodule gitlink and its .gitmodules section. Use it when removing a dependency from the project history going forward.",
          note: "Use the submodule fixture. A clean populated submodule can be removed directly; deinit is an optional prior local step. The separate stored Git repository is usually retained for historical checkouts, and earlier commits remain unchanged.",
          examples: [
            {
              label: "Deinitialize and record removal of one dependency",
              language: "bash",
              code: 'git submodule deinit -- vendor/library\ngit rm -- vendor/library\ngit commit -m "Remove library dependency"',
            },
            {
              label: "Remove a clean submodule directly",
              language: "bash",
              code: 'git rm -- vendor/plugin\ngit commit -m "Remove plugin dependency"',
            },
          ],
          source: "https://git-scm.com/docs/git-rm",
        },
        {
          name: "Remove a submodule’s stored Git directory",
          explanation:
            "Optionally deletes the retained local submodule repository after removing its registration and gitlink. Use it only when that stored history is no longer needed locally and important commits are available elsewhere.",
          note: "Use the submodule fixture. This is irreversible local data deletion, not a routine requirement for git rm. A module’s name can differ from its path, and .git can be a file, so resolve its actual Git directory before removal rather than guessing .git/modules/<path>. The fixture helper verifies the resolved directory lies inside its disposable superproject before deleting it.",
          examples: [
            {
              label:
                "Remove the library and purge only its verified stored repository",
              language: "bash",
              code: 'module_store=$(git -C vendor/library rev-parse --absolute-git-dir)\ngit submodule deinit -- vendor/library\ngit rm -- vendor/library\npurge_removed_module "$module_store"\ngit commit -m "Remove library and discard local stored clone"',
            },
            {
              label:
                "Remove the plugin and its verified local stored repository",
              language: "bash",
              code: 'module_store=$(git -C vendor/plugin rev-parse --absolute-git-dir)\ngit submodule deinit -- vendor/plugin\ngit rm -- vendor/plugin\npurge_removed_module "$module_store"\ngit commit -m "Remove plugin and discard local stored clone"',
            },
          ],
          source: "https://git-scm.com/docs/gitsubmodules",
        },
        {
          name: "git bisect start",
          explanation:
            "Starts a regression-search session, optionally accepting bad and good boundaries. Use it when a reproducible test separates known-working from known-broken history.",
          note: "Use the bisect fixture. Begin clean; bisect normally checks out candidate commits with detached HEAD. A meaningful search assumes the chosen behavior has a usable good-to-bad boundary.",
          examples: [
            {
              label: "Start a session before supplying boundaries",
              language: "bash",
              code: "git bisect start",
            },
            {
              label: "Start with the known bad tip and known good tag",
              language: "bash",
              code: "git bisect start HEAD v1.0",
            },
          ],
          source: "https://git-scm.com/docs/git-bisect",
        },
        {
          name: "git bisect bad",
          explanation:
            "Marks a tested revision as exhibiting the regression. Use it to narrow the search toward the first bad commit.",
          note: "Use the bisect fixture. Mark only revisions actually known to be bad; the fixture’s current main is bad. Providing a revision marks that revision, not necessarily the current checkout.",
          examples: [
            {
              label:
                "Mark the current tip bad before selecting a good boundary",
              language: "bash",
              code: "git bisect start\ngit bisect bad",
            },
            {
              label: "Supply the known bad main and good tag explicitly",
              language: "bash",
              code: "git bisect start\ngit bisect bad main\ngit bisect good v1.0",
            },
          ],
          source: "https://git-scm.com/docs/git-bisect",
        },
        {
          name: "git bisect good",
          explanation:
            "Marks a tested revision as free of the selected regression. Use it with bad observations to narrow the candidate set.",
          note: "Use the bisect fixture. Test the currently checked-out candidate after each move; do not keep marking the old result after Git changes commits.",
          examples: [
            {
              label: "Provide the known working boundary",
              language: "bash",
              code: "git bisect start\ngit bisect bad HEAD\ngit bisect good v1.0",
            },
            {
              label: "Test one selected candidate and record its actual result",
              language: "bash",
              code: "start_search\nif ./test.sh; then\n  git bisect good\nelse\n  git bisect bad\nfi",
            },
          ],
          source: "https://git-scm.com/docs/git-bisect",
        },
        {
          name: "git bisect reset",
          explanation:
            "Ends the current bisect session and normally returns to the checkout where it began. Use it when you finish or abandon the search.",
          note: "Use the bisect fixture. Resetting bisect state is distinct from git reset modes that rewrite a branch tip or discard files.",
          examples: [
            {
              label: "Leave a search in progress and return to main",
              language: "bash",
              code: "start_search\ngit bisect reset",
            },
            {
              label:
                "Find the regression, then return to the starting checkout",
              language: "bash",
              code: "start_search\ngit bisect run ./test.sh\ngit bisect reset",
            },
          ],
          source: "https://git-scm.com/docs/git-bisect",
        },
        {
          name: "git bisect run",
          explanation:
            "Runs a test command on candidates and records results automatically. Use it when the regression can be checked reliably by a script.",
          note: "Use the bisect fixture. Exit 0 means good; 1–127 except 125 mean bad, 125 means untestable/skip, and other statuses abort. Beware missing-command or permission failures masquerading as bad results. The tracked executable test.sh exists at every fixture revision.",
          examples: [
            {
              label: "Automatically find the first bad fixture commit",
              language: "bash",
              code: "git bisect start\ngit bisect bad HEAD\ngit bisect good v1.0\ngit bisect run ./test.sh",
            },
            {
              label: "Pass the same tracked test through its shell explicitly",
              language: "bash",
              code: "git bisect start HEAD v1.0\ngit bisect run sh ./test.sh",
            },
          ],
          source: "https://git-scm.com/docs/git-bisect",
        },
        {
          name: "git bisect skip",
          explanation:
            "Marks a revision as untestable rather than good or bad. Use it when a build or environment problem prevents a trustworthy result.",
          note: "Use the bisect fixture. Skipping near the boundary can leave several possible first-bad commits; it does not certify that the skipped change is harmless.",
          examples: [
            {
              label: "Skip the selected candidate",
              language: "bash",
              code: "start_search\ngit bisect skip",
            },
            {
              label: "Mark a named candidate untestable",
              language: "bash",
              code: "start_search\ngit bisect skip main~2",
            },
          ],
          source: "https://git-scm.com/docs/git-bisect",
        },
        {
          name: "git bisect log",
          explanation:
            "Prints the decisions recorded in the active search. Use it to review or save a reproducible search transcript.",
          note: "Use the bisect fixture. Save the log outside the changing worktree so candidate checkouts do not overwrite it. This output is designed for bisect replay.",
          examples: [
            {
              label: "Inspect the current search decisions",
              language: "bash",
              code: "start_search\ngit bisect log",
            },
            {
              label:
                "Save a completed search transcript outside the repository",
              language: "bash",
              code: 'start_search\ngit bisect run ./test.sh\ngit bisect log > "$bisect_lab/session.log"',
            },
          ],
          source: "https://git-scm.com/docs/git-bisect",
        },
        {
          name: "git bisect replay",
          explanation:
            "Reconstructs a bisect session from a saved decision log. Use it to reproduce a search or revise a transcript after correcting a mistaken classification.",
          note: "Use the bisect fixture. Review the recorded decisions before replaying them; replay trusts the supplied observations and does not independently retest them. Replaying a completed log can report the first-bad commit without checking it out; inspect the reported commit ID rather than assuming HEAD is that commit.",
          examples: [
            {
              label: "Replay saved boundaries after resetting the search",
              language: "bash",
              code: 'start_search\ngit bisect log > "$bisect_lab/session.log"\ngit bisect reset\ngit bisect replay "$bisect_lab/session.log"',
            },
            {
              label:
                "Replay the observations from a completed automated search",
              language: "bash",
              code: 'start_search\ngit bisect run ./test.sh\ngit bisect log > "$bisect_lab/complete.log"\ngit bisect reset\ngit bisect replay "$bisect_lab/complete.log"',
            },
          ],
          source: "https://git-scm.com/docs/git-bisect",
        },
        {
          name: "git worktree add",
          explanation:
            "Creates another checkout attached to the same repository. Use it to work on an existing branch without switching the current directory’s checkout.",
          note: "Use the worktree fixture. Linked worktrees share objects and most refs but have separate indexes and working files. Git normally refuses to check out the same branch in multiple worktrees.",
          examples: [
            {
              label: "Check out feature in a sibling directory",
              language: "bash",
              code: "git worktree add ../feature-branch feature",
            },
            {
              label: "Check out release in another directory",
              language: "bash",
              code: "git worktree add ../release-checkout release",
            },
          ],
          source: "https://git-scm.com/docs/git-worktree",
        },
        {
          name: "git worktree list",
          explanation:
            "Lists the repository’s main and linked worktrees with their paths and checkout state. Use it to see where branches are already checked out.",
          note: "Use the worktree fixture. --porcelain provides a structured display suitable for more predictable inspection than the aligned human-oriented form.",
          examples: [
            {
              label: "List worktrees after creating one",
              language: "bash",
              code: "git worktree add ../feature-branch feature\ngit worktree list",
            },
            {
              label: "Inspect the structured worktree listing",
              language: "bash",
              code: "git worktree add ../feature-branch feature\ngit worktree list --porcelain",
            },
          ],
          source: "https://git-scm.com/docs/git-worktree",
        },
        {
          name: "git worktree remove",
          explanation:
            "Removes a linked working directory and its worktree administrative registration. Use it when a clean extra checkout is no longer needed.",
          note: "Use the worktree fixture. The branch remains; the main worktree cannot be removed this way. Dirty or locked worktrees and some submodule cases need special handling, which these examples do not override.",
          examples: [
            {
              label: "Remove a clean linked feature checkout",
              language: "bash",
              code: "git worktree add ../feature-branch feature\ngit worktree remove ../feature-branch",
            },
            {
              label: "Remove another clean linked checkout",
              language: "bash",
              code: "git worktree add ../release-checkout release\ngit worktree remove ../release-checkout",
            },
          ],
          source: "https://git-scm.com/docs/git-worktree",
        },
        {
          name: "git worktree add -b",
          explanation:
            "Creates a new branch and checks it out in a new linked worktree. Use it to start an isolated task alongside your current checkout.",
          note: "Use the worktree fixture. The branch and checkout path must be available; an explicit starting point chooses the new branch’s base.",
          examples: [
            {
              label: "Start new-feature at the current main tip",
              language: "bash",
              code: "git worktree add -b new-feature ../new-feature",
            },
            {
              label: "Start a maintenance branch from the release baseline",
              language: "bash",
              code: "git worktree add -b maintenance ../maintenance release",
            },
          ],
          source: "https://git-scm.com/docs/git-worktree",
        },
        {
          name: "git worktree lock",
          explanation:
            "Marks a linked worktree as locked so its administrative state is not automatically pruned and normal move/remove operations are blocked. Use it for a temporarily unavailable checkout.",
          note: "Use the worktree fixture. This is not a file-edit lock or a way to stop another process writing files; unlock deliberately before normal removal or movement.",
          examples: [
            {
              label: "Lock a linked checkout",
              language: "bash",
              code: "git worktree add ../feature-branch feature\ngit worktree lock ../feature-branch",
            },
            {
              label: "Record why the checkout must stay registered",
              language: "bash",
              code: 'git worktree add ../feature-branch feature\ngit worktree lock --reason "Temporarily unavailable practice checkout" ../feature-branch',
            },
          ],
          source: "https://git-scm.com/docs/git-worktree",
        },
        {
          name: "git worktree prune",
          explanation:
            "Removes stale worktree administrative entries according to expiry rules. Use it after a checkout was deleted outside git worktree remove.",
          note: "Use the worktree fixture. It does not delete an existing worktree directory or its branch. Locked entries are protected. The helper deletes only a newly created disposable checkout to demonstrate stale metadata; --expire now deliberately overrides the usual grace period.",
          examples: [
            {
              label:
                "Inspect what pruning would remove without changing registration",
              language: "bash",
              code: "prepare_stale_worktree\ngit worktree prune --dry-run --verbose --expire now",
            },
            {
              label: "Prune only the stale practice registration immediately",
              language: "bash",
              code: "prepare_stale_worktree\ngit worktree prune --verbose --expire now",
            },
          ],
          source: "https://git-scm.com/docs/git-worktree",
        },
        {
          name: "git worktree move",
          explanation:
            "Moves a linked checkout and updates its administrative path. Use it instead of an ordinary filesystem move when relocating a worktree.",
          note: "Use the worktree fixture. The main worktree and linked worktrees containing submodules cannot be moved this way; locked checkouts also need attention. The examples use clean linked trees without submodules.",
          examples: [
            {
              label: "Move a linked feature checkout to a new path",
              language: "bash",
              code: "git worktree add ../feature-branch feature\ngit worktree move ../feature-branch ../moved-feature",
            },
            {
              label: "Move a linked release checkout",
              language: "bash",
              code: "git worktree add ../release-checkout release\ngit worktree move ../release-checkout ../moved-release",
            },
          ],
          source: "https://git-scm.com/docs/git-worktree",
        },
      ],
    },
    {
      name: "Quick Reference",
      id: "quick-reference",
      intro:
        "Daily Workflow → Useful Aliases, following all four images. Run the fresh offline fixture before each example. Workflow examples simulate review and merge with local repositories; a real pull/merge request remains a separate hosting action. Alias examples explicitly write --global settings when you run them, potentially replacing aliases of the same name; the verification here uses an isolated temporary global configuration. Every alias example defines its own shortcut before using it. The clipped lg and today definitions are completed with valid quoting, and today resolves the name at invocation time.",
      setup: [
        {
          label:
            "Daily-workflow and alias fixture — local origin, simulated reviewer, and fresh work clone",
          language: "bash",
          code: '# POSIX shell or Git Bash, Git 2.28+. Run afresh BEFORE EACH example.\n# The workflow’s origin and reviewer are disposable local repositories.\nquick_lab=$(mktemp -d)\ngit init --bare "$quick_lab/origin.git"\ngit init -b main "$quick_lab/reviewer"\ngit -C "$quick_lab/reviewer" config user.name "Demo O\'Neil"\ngit -C "$quick_lab/reviewer" config user.email "demo@example.com"\nprintf \'Baseline project\\n\' > "$quick_lab/reviewer/README.md"\ngit -C "$quick_lab/reviewer" add .\ngit -C "$quick_lab/reviewer" commit -m "Daily workflow baseline"\nprintf \'Baseline project\\nUpdated project notes\\n\' > "$quick_lab/reviewer/README.md"\ngit -C "$quick_lab/reviewer" add .\ngit -C "$quick_lab/reviewer" commit -m "Update initial notes"\ngit -C "$quick_lab/reviewer" branch old-topic\ngit -C "$quick_lab/reviewer" remote add origin "$quick_lab/origin.git"\ngit -C "$quick_lab/reviewer" push origin main old-topic\ngit --git-dir="$quick_lab/origin.git" symbolic-ref HEAD refs/heads/main\ngit clone "$quick_lab/origin.git" "$quick_lab/work"\ncd "$quick_lab/work"\ngit config user.name "Demo O\'Neil"\ngit config user.email "demo@example.com"\ngit config pull.rebase false\ngit config pull.ff true\ngit branch feature-demo\n# Advance upstream and delete a remote branch after the clone.\nprintf \'First upstream update\\n\' > "$quick_lab/reviewer/upstream.txt"\ngit -C "$quick_lab/reviewer" add .\ngit -C "$quick_lab/reviewer" commit -m "Upstream daily update"\ngit -C "$quick_lab/reviewer" push origin main\ngit -C "$quick_lab/reviewer" push origin --delete old-topic\n\nadvance_main_during_review() {\n  printf \'Later upstream update\\n\' > "$quick_lab/reviewer/upstream-later.txt"\n  git -C "$quick_lab/reviewer" add . || return\n  git -C "$quick_lab/reviewer" commit -m "Advance main during feature work" || return\n  git -C "$quick_lab/reviewer" push origin main\n}\nsimulate_review_merge() {\n  # Offline simulation ONLY: it neither opens a PR nor sends anyone a message.\n  git -C "$quick_lab/reviewer" fetch origin "$1" || return\n  git -C "$quick_lab/reviewer" merge --no-ff FETCH_HEAD -m "Reviewed practice merge" || return\n  git -C "$quick_lab/reviewer" push origin main || return\n  git -C "$quick_lab/reviewer" push origin --delete "$1"\n}',
        },
      ],
      methods: [
        {
          name: "Daily feature workflow",
          explanation:
            "Updates main, develops on a feature branch, publishes it for review, then refreshes main and removes the completed local branch. Use it as a repeatable sequence rather than running unrelated commands in a dirty checkout.",
          note: "Run the fixture before each example. Opening and approving a pull/merge request is a separate hosting-service step; the helper simulates a reviewed merge only on the disposable local origin. The -d check is about ancestry, so squash/rebase merges can leave it refusing deletion even when equivalent work was accepted. Rebase unpublished work or coordinate any required rewrite of an already published branch.",
          source: "https://git-scm.com/docs/gitworkflows",
          examples: [
            {
              label:
                "Quick daily workflow with a locally simulated reviewed merge",
              language: "bash",
              code: "git checkout main\ngit pull origin main\ngit checkout -b feature/new-feature\nprintf 'New feature implementation\n' > new-feature.txt\ngit add .\ngit commit -m \"Add new feature\"\ngit push -u origin feature/new-feature\n# In a real project: open a PR/MR, complete review, and wait for its merge.\n# Offline fixture only: simulate that accepted merge and remote branch deletion.\nsimulate_review_merge feature/new-feature\ngit checkout main\ngit pull origin main\ngit branch -d feature/new-feature",
            },
            {
              label:
                "Selective staging, refreshing the feature base, and post-review cleanup",
              language: "bash",
              code: "git checkout main\ngit pull origin main\ngit checkout -b feature/user-auth\nprintf 'Baseline project\nUpdated project notes\nUser authentication support\n' > README.md\ngit add -p -- README.md\n# Select y for this intended README hunk.\ngit commit -m \"feat: add user authentication\"\n# Offline fixture only: simulate main advancing while the feature is developed.\nadvance_main_during_review\ngit fetch origin\ngit rebase origin/main\ngit push -u origin feature/user-auth\n# Real project: review and merge the PR/MR before continuing.\nsimulate_review_merge feature/user-auth\ngit checkout main\ngit pull origin main\ngit branch -d feature/user-auth\ngit remote prune origin",
            },
          ],
        },
        {
          name: "git remote prune origin",
          explanation:
            "Removes stale remote-tracking references for origin without fetching new commits. Use it after remote branches have been deleted and you want to refresh the local branch-name view.",
          note: "It queries the remote and applies the configured pruning rules; normal branch refspecs affect remote-tracking branches, not local branches. Explicit tag mappings can widen pruning scope. The fixture intentionally retains origin/old-topic after its remote deletion.",
          source: "https://git-scm.com/docs/git-remote",
          examples: [
            {
              label: "Prune the stale practice reference",
              language: "bash",
              code: "git remote prune origin",
            },
            {
              label: "Preview the cleanup, then perform it",
              language: "bash",
              code: "git remote prune --dry-run origin\ngit remote prune origin",
            },
          ],
        },
        {
          name: "alias.co",
          explanation:
            "Defines git co as a shortcut for checkout. Use it when a short spelling helps with familiar checkout workflows.",
          note: "These examples intentionally configure a global alias; repository-local aliases can override it. Arguments are appended to checkout, including its branch/path overloads. The fixture is disposable.",
          source: "https://git-scm.com/docs/git-config",
          examples: [
            {
              label: "Configure and switch to an existing branch",
              language: "bash",
              code: "git config --global alias.co checkout\ngit co feature-demo",
            },
            {
              label: "Configure and create a branch through the alias",
              language: "bash",
              code: "git config --global alias.co checkout\ngit co -b work/alias-feature",
            },
          ],
        },
        {
          name: "alias.br",
          explanation:
            "Defines git br as branch. Use it for concise branch listings and other branch operations.",
          note: "Additional arguments retain their ordinary git branch behavior; an alias does not add safety checks or change scope.",
          source: "https://git-scm.com/docs/git-config",
          examples: [
            {
              label: "Configure and list local branches",
              language: "bash",
              code: "git config --global alias.br branch\ngit br",
            },
            {
              label: "List branches merged into the current commit",
              language: "bash",
              code: "git config --global alias.br branch\ngit br --merged",
            },
          ],
        },
        {
          name: "alias.ci",
          explanation:
            "Defines git ci as commit. Use it after preparing and reviewing the index.",
          note: "The alias inherits normal commit behavior, including hooks and configured signing. Unstaged and untracked changes are not automatically committed.",
          source: "https://git-scm.com/docs/git-config",
          examples: [
            {
              label: "Commit a deliberately staged new note",
              language: "bash",
              code: 'git config --global alias.ci commit\nprintf "New daily note\\n" > note.txt\ngit add -- note.txt\ngit ci -m "Add daily note"',
            },
            {
              label: "Commit a staged README change",
              language: "bash",
              code: 'git config --global alias.ci commit\nprintf "Revised project notes\\n" > README.md\ngit add -- README.md\ngit ci -m "Revise project notes"',
            },
          ],
        },
        {
          name: "alias.st",
          explanation:
            "Defines git st as status. Use it for a short inspection command before staging or committing.",
          note: "Further options belong to status, so git st -s selects its short format.",
          source: "https://git-scm.com/docs/git-config",
          examples: [
            {
              label: "Inspect status through the alias",
              language: "bash",
              code: "git config --global alias.st status\ngit st",
            },
            {
              label: "Inspect a new file in short status",
              language: "bash",
              code: 'git config --global alias.st status\nprintf "Untracked note\\n" > note.txt\ngit st -s',
            },
          ],
        },
        {
          name: "alias.last",
          explanation:
            "Defines git last as log -1 HEAD. Use it to inspect the current tip quickly.",
          note: "This is fixed to HEAD rather than a different branch by default. Extra log options can request statistics or patches.",
          source: "https://git-scm.com/docs/git-config",
          examples: [
            {
              label: "Read the current commit through the shortcut",
              language: "bash",
              code: "git config --global alias.last 'log -1 HEAD'\ngit last",
            },
            {
              label: "Include statistics for the current commit",
              language: "bash",
              code: "git config --global alias.last 'log -1 HEAD'\ngit last --stat",
            },
          ],
        },
        {
          name: "alias.unstage",
          explanation:
            "Defines git unstage as the path-reset form reset HEAD --. Use it to remove selected changes from the index while keeping edits on disk.",
          note: "The trailing -- ensures appended arguments are paths. A valid HEAD is required; this alias does not move the current branch tip.",
          source: "https://git-scm.com/docs/git-config",
          examples: [
            {
              label: "Unstage one edited tracked file",
              language: "bash",
              code: "git config --global alias.unstage 'reset HEAD --'\nprintf \"Edited README\\n\" > README.md\ngit add -- README.md\ngit unstage README.md",
            },
            {
              label: "Unstage the root path scope",
              language: "bash",
              code: "git config --global alias.unstage 'reset HEAD --'\nprintf \"Edited README\\n\" > README.md\ngit add -- README.md\ngit unstage .",
            },
          ],
        },
        {
          name: "alias.lg",
          explanation:
            "Defines a compact colored ancestry graph with commit IDs, decorations, subjects, relative author dates, and author names. Use it for an overview across references.",
          note: "The image clips the end of this definition; this completes it with balanced quoting and color resets. Colors depend on Git’s output configuration, and --all selects history reachable from references rather than every unreachable object.",
          source: "https://git-scm.com/docs/git-config",
          examples: [
            {
              label: "Configure and display the colored graph",
              language: "bash",
              code: "git config --global alias.lg \"log --graph --pretty=format:'%C(red)%h%Creset -%C(yellow)%d%Creset %s %C(green)(%ar)%Creset %C(bold blue)<%an>%Creset' --abbrev-commit --all\"\ngit lg",
            },
            {
              label: "Limit the graph to five commits",
              language: "bash",
              code: "git config --global alias.lg \"log --graph --pretty=format:'%C(red)%h%Creset -%C(yellow)%d%Creset %s %C(green)(%ar)%Creset %C(bold blue)<%an>%Creset' --abbrev-commit --all\"\ngit lg -n 5",
            },
          ],
        },
        {
          name: "alias.amend",
          explanation:
            "Defines git amend as commit --amend --no-edit. Use it to include a correction in the latest unpublished commit without changing its message.",
          note: "This replaces the tip commit and can include every currently staged change. It does not automatically stage working edits; coordinate before rewriting shared history.",
          source: "https://git-scm.com/docs/git-config",
          examples: [
            {
              label: "Amend the tip with a staged README correction",
              language: "bash",
              code: "git config --global alias.amend 'commit --amend --no-edit'\nprintf \"Amended local introduction\\n\" > README.md\ngit add -- README.md\ngit amend",
            },
            {
              label: "Include an explicitly staged new file in the tip",
              language: "bash",
              code: "git config --global alias.amend 'commit --amend --no-edit'\nprintf \"Extra commit note\\n\" > extra.txt\ngit add -- extra.txt\ngit amend",
            },
          ],
        },
        {
          name: "alias.recent",
          explanation:
            "Defines git recent as a branch listing sorted by descending tip committer date. Use it to find branches with recently dated tip commits.",
          note: "This sorts by the tip commit’s committer timestamp, not by checkout time or a complete record of branch activity.",
          source: "https://git-scm.com/docs/git-config",
          examples: [
            {
              label: "List branches by tip committer date",
              language: "bash",
              code: 'git config --global alias.recent "branch --sort=-committerdate"\ngit recent',
            },
            {
              label: "Include commit details in the sorted list",
              language: "bash",
              code: 'git config --global alias.recent "branch --sort=-committerdate"\ngit recent -v',
            },
          ],
        },
        {
          name: "alias.undo",
          explanation:
            "Defines git undo as reset --soft HEAD~1. Use it to move an unpublished branch back one commit while preserving the index and working files.",
          note: "It requires a parent commit and rewrites the branch pointer. Existing staged and unstaged states remain; it is not the inverse-commit behavior of revert.",
          source: "https://git-scm.com/docs/git-config",
          examples: [
            {
              label:
                "Move the fixture branch back while keeping its snapshot staged",
              language: "bash",
              code: "git config --global alias.undo 'reset --soft HEAD~1'\ngit undo",
            },
            {
              label:
                "Undo a new unpublished commit without discarding its file",
              language: "bash",
              code: 'git config --global alias.undo \'reset --soft HEAD~1\'\nprintf "Additional local note\\n" > additional.txt\ngit add -- additional.txt\ngit commit -m "Add temporary local note"\ngit undo',
            },
          ],
        },
        {
          name: "alias.today",
          explanation:
            "Defines git today as a recent-history report filtered by the currently configured user.name. Use it as a convenient personal view of reachable commits since local midnight.",
          note: "The clipped image expands user.name while saving the alias; this shell-alias version resolves it when invoked and quotes it safely. The author match is fixed text within author information, not proof of identity or exact account ownership. The date filter uses commit timestamps, and aliases beginning with ! execute shell code; inspect definitions before installing them.",
          source: "https://git-scm.com/docs/git-config",
          examples: [
            {
              label: "Report today’s commits for the current configured name",
              language: "bash",
              code: 'git config --global alias.today \'!f() { author=$(git config user.name) || return; git log --since=midnight --fixed-strings --author="$author" --oneline "$@"; }; f\'\ngit today',
            },
            {
              label:
                "Demonstrate that the identity is read when the alias runs",
              language: "bash",
              code: 'git config --global alias.today \'!f() { author=$(git config user.name) || return; git log --since=midnight --fixed-strings --author="$author" --oneline "$@"; }; f\'\n# This identity change is local to the disposable practice repository.\ngit config user.name "Another Author"\ngit config user.email "another@example.com"\nprintf "Another author note\\n" > another.txt\ngit add -- another.txt\ngit commit -m "Another author update"\ngit today -n 1',
            },
          ],
        },
        {
          name: "alias.d",
          explanation:
            "Defines git d as diff. Use it to inspect unstaged tracked changes with less typing.",
          note: "The alias retains diff’s default index-to-worktree comparison and omits untracked file contents.",
          source: "https://git-scm.com/docs/git-config",
          examples: [
            {
              label: "Inspect an unstaged README change",
              language: "bash",
              code: 'git config --global alias.d diff\nprintf "Unstaged README edit\\n" > README.md\ngit d',
            },
            {
              label: "Limit the unstaged comparison to the README",
              language: "bash",
              code: 'git config --global alias.d diff\nprintf "Unstaged README edit\\n" > README.md\ngit d -- README.md',
            },
          ],
        },
        {
          name: "alias.dc",
          explanation:
            "Defines git dc as diff --cached. Use it to inspect the snapshot prepared for the next commit.",
          note: "--cached is the same staged comparison as --staged. Later working edits are not included unless staged again.",
          source: "https://git-scm.com/docs/git-config",
          examples: [
            {
              label: "Review a staged README edit",
              language: "bash",
              code: "git config --global alias.dc 'diff --cached'\nprintf \"Staged README edit\\n\" > README.md\ngit add -- README.md\ngit dc",
            },
            {
              label: "Distinguish the staged text from a subsequent edit",
              language: "bash",
              code: 'git config --global alias.dc \'diff --cached\'\nprintf "Staged README edit\\n" > README.md\ngit add -- README.md\nprintf "Later unstaged README edit\\n" > README.md\ngit dc -- README.md',
            },
          ],
        },
        {
          name: "alias.contains",
          explanation:
            "Defines git contains as branch -a --contains. Use it to find local and remote-tracking branch tips that contain a selected commit by ancestry.",
          note: "Remote-tracking refs can be stale until fetched. Containment does not recognize merely equivalent patches introduced by squash or cherry-pick.",
          source: "https://git-scm.com/docs/git-config",
          examples: [
            {
              label: "Find branch tips containing the current commit",
              language: "bash",
              code: "git config --global alias.contains 'branch -a --contains'\ngit contains HEAD",
            },
            {
              label: "Find branches containing the earlier baseline",
              language: "bash",
              code: "git config --global alias.contains 'branch -a --contains'\ngit contains HEAD~1",
            },
          ],
        },
      ],
    },
  ],
};

(() => {
  const content = document.querySelector("#content");
  const nav = document.querySelector("#nav");
  const search = document.querySelector("#search");
  const reset = document.querySelector("#reset");
  const count = document.querySelector("#count");
  const total = handbook.categories.reduce(
    (sum, category) => sum + category.methods.length,
    0,
  );
  const examples = handbook.categories.reduce(
    (sum, category) =>
      sum +
      category.methods.reduce((sum, method) => sum + method.examples.length, 0),
    0,
  );
  document.querySelector("#sheet-summary").textContent =
    `${handbook.categories.length} ${handbook.categories.length === 1 ? "category" : "categories"} · ${total} ${total === 1 ? "entry" : "entries"} · ${examples} examples`;
  search.disabled = total === 0;
  reset.disabled = total === 0;

  function node(tag, text, className) {
    const element = document.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  function codeBlock(parent, example) {
    const head = node("div", undefined, "example-head");
    const copy = node("button", "Copy");
    copy.type = "button";
    copy.setAttribute("aria-label", "Copy " + example.label);
    head.append(node("span", example.label), copy);
    const pre = node("pre");
    pre.tabIndex = 0;
    pre.setAttribute("aria-label", example.label);
    const code = node(
      "code",
      example.code,
      "language-" + (example.language || "bash"),
    );
    pre.append(code);
    parent.append(head, pre);
    window.HandbookHighlight?.highlight(code);
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(example.code);
        copy.textContent = "Copied!";
      } catch {
        copy.textContent = "Select code to copy";
        const range = document.createRange();
        range.selectNodeContents(code);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
      window.setTimeout(() => {
        copy.textContent = "Copy";
      }, 1800);
    });
  }

  function render() {
    const query = search.value.trim().toLowerCase();
    const fragment = document.createDocumentFragment();
    const menu = document.createDocumentFragment();
    let shown = 0;
    for (const category of handbook.categories) {
      const categoryMatch = category.name.toLowerCase().includes(query);
      const methods = category.methods.filter(
        (method) =>
          !query ||
          categoryMatch ||
          category.methodCategories?.[category.methods.indexOf(method)]?.name
            .toLowerCase()
            .includes(query) ||
          JSON.stringify(method).toLowerCase().includes(query),
      );
      if (!methods.length) continue;
      const section = node("section");
      section.id = category.id;
      section.append(node("h2", category.name));
      const link = node("a", category.name);
      link.href = "#" + category.id;
      menu.append(link);
      for (const intro of [category.intro].flat().filter(Boolean))
        section.append(node("p", intro));
      for (const example of category.setup || []) codeBlock(section, example);
      const renderedContexts = new Set();
      for (const method of methods) {
        const originalCategory =
          category.methodCategories?.[category.methods.indexOf(method)];
        const context = category.contexts?.[originalCategory?.id];
        if (context && !renderedContexts.has(originalCategory.id)) {
          for (const intro of [context.intro].flat().filter(Boolean))
            section.append(node("p", intro));
          for (const example of context.setup || [])
            codeBlock(section, example);
          renderedContexts.add(originalCategory.id);
        }
        const entry = node("article", undefined, "entry");
        entry.dataset.progressId =
          "git-cheatsheet:" +
          (category.methodCategories?.[category.methods.indexOf(method)]?.id ||
            category.id) +
          ":" +
          method.name;
        const heading = node("h3");
        heading.append(node("code", method.name));
        entry.append(heading, node("p", method.explanation));
        if (method.note) entry.append(node("p", method.note, "method-note"));
        for (const example of method.examples) {
          entry.append(node("h4", example.label));
          if (example.note)
            entry.append(node("p", example.note, "method-note"));
          if (example.files) {
            for (const file of example.files) {
              codeBlock(entry, {
                label: file.path,
                code: file.code,
                language: file.language || "bash",
              });
            }
          } else {
            codeBlock(entry, example);
          }
        }
        if (method.source) {
          const source = node("a", "Official reference ↗", "source");
          source.href = method.source;
          source.target = "_blank";
          source.rel = "noopener noreferrer";
          entry.append(source);
        }
        window.HandbookHighlight?.highlight(heading);
        section.append(entry);
      }
      fragment.append(section);
      shown += methods.length;
    }
    if (!shown)
      fragment.append(
        node(
          "p",
          total
            ? "No matches. Try another term or reset search."
            : "Ready for the first category image. Its items and examples will appear here.",
          "empty",
        ),
      );
    content.replaceChildren(fragment);
    nav.replaceChildren(menu);
    count.textContent = `${shown} of ${total} entries`;
  }
  search.addEventListener("input", render);
  reset.addEventListener("click", () => {
    search.value = "";
    render();
    search.focus();
  });
  render();
})();
