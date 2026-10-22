/* Format API references in entry prose without editing source examples or data. */
(() => {
  const additional = new Map([
    [
      "Array pipelines and non-mutating sorting",
      [
        "map",
        "filter",
        "reduce",
        "find",
        "some",
        "every",
        "flat",
        "flatMap",
        "sort",
        "toSorted",
      ],
    ],
    ["Mount, update, and destroy a component", ["mount", "update", "destroy"]],
    [
      "this follows the call form; arrows capture it",
      ["call", "apply", "bind"],
    ],
    [
      "Promises represent eventual outcomes and propagate errors",
      ["then", "catch", "finally"],
    ],
    [
      "Choose the promise combinator by its failure contract",
      ["allSettled", "race", "any"],
    ],
    [
      "Debounce, throttle, and cache with explicit limits",
      ["debounce", "throttle", "cancel"],
    ],
    [
      "Iterables supply iterators; generators simplify the protocol",
      ["next", "Symbol.iterator"],
    ],
  ]);
  const globalNames = new Set([
    "destroy",
    "mount",
    "update",
    "require",
    "Object.keys",
    "Object.values",
    "Object.entries",
    "Object.fromEntries",
    "Object.create",
    "Object.getPrototypeOf",
    "Object.setPrototypeOf",
    "Object.hasOwn",
    "Reflect.ownKeys",
    "Atomics.wait",
    "getAll",
    "pushState",
    "replaceState",
    "hasOwnProperty",
    "stopPropagation",
    "requestAnimationFrame",
    "cancelAnimationFrame",
    "URLSearchParams",
    "WebSocket",
    "WeakRef",
    "FinalizationRegistry",
  ]);
  for (const api of Object.values(window.JavaScriptNativeNotes?.apis ?? {})) {
    const name = api.title
      .replace(/^new /, "")
      .match(/^[\w$]+(?:\.[\w$]+)*/)?.[0];
    if (!name) continue;
    if (name.includes(".")) globalNames.add(name);
    const short = name.split(".").at(-1);
    // Camel-case APIs and constructors are distinct from ordinary prose words.
    if (/[A-Z]/.test(short)) globalNames.add(short);
  }

  function collect(tokens, names) {
    for (const token of tokens) {
      if (typeof token === "string") continue;
      if (
        ["function", "function-variable"].includes(token.type) &&
        typeof token.content === "string"
      ) {
        names.add(token.content);
      }
      if (Array.isArray(token.content)) collect(token.content, names);
    }
  }

  function isReference(name, text, start, end, lesson) {
    if (/[A-Z.$]/.test(name) || name === "require") return true;
    if (
      lesson.name ===
        "Promises represent eventual outcomes and propagate errors" &&
      ["then", "catch", "finally"].includes(name)
    )
      return true;
    const after = text.slice(end);
    // Do not style common nouns/verbs such as "focus" or "test" as APIs.
    if (
      [
        "focus",
        "test",
        "match",
        "read",
        "write",
        "open",
        "close",
        "get",
        "set",
        "add",
        "delete",
        "has",
        "values",
        "entries",
      ].includes(name)
    ) {
      return (
        /^\s*\(/.test(after) ||
        /^\s+(?:method|function|returns)\b/.test(after) ||
        (name === "match" && /^\s*,\s*matchAll\b/.test(after))
      );
    }
    if (/^\s*[(,/]/.test(after)) return true;
    if (
      /^\s+(?:returns|supplies|creates|provides|transforms|selects|combines|accumulates|asks|checks|lists|builds|prevents|changes|runs|waits|limits|collects|copies|removes|reads|writes|receives|sets|can|cannot|have|normally|instead|with|for|and|or|method|methods|function)\b/.test(
        after,
      )
    )
      return true;
    return /\b(?:use|using|through|with|exposes|called)\s+$/i.test(
      text.slice(0, start),
    );
  }

  function highlight(entry, lesson) {
    const names = new Set(globalNames);
    for (const name of additional.get(lesson.name) ?? []) names.add(name);
    for (const file of lesson.files) {
      const grammar = window.Prism?.languages[file.language];
      if (grammar) collect(window.Prism.tokenize(file.code, grammar), names);
    }
    const escaped = [...names]
      .filter((name) => /^[\w$]+(?:\.[\w$]+)*$/.test(name))
      .sort((a, b) => b.length - a.length)
      .map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const pattern = new RegExp(
      `(?<![\\w$])(?:${escaped.join("|")})(?![\\w$])`,
      "g",
    );
    const walker = document.createTreeWalker(entry, NodeFilter.SHOW_TEXT, {
      acceptNode(text) {
        return text.parentElement.closest("pre, code, button, a, script, style")
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT;
      },
    });
    const texts = [];
    while (walker.nextNode()) texts.push(walker.currentNode);
    for (const text of texts) {
      const fragment = document.createDocumentFragment();
      let offset = 0;
      for (const match of text.data.matchAll(pattern)) {
        const end = match.index + match[0].length;
        if (!isReference(match[0], text.data, match.index, end, lesson))
          continue;
        fragment.append(text.data.slice(offset, match.index));
        const code = document.createElement("code");
        code.className = "inline-function language-none";
        const token = document.createElement("span");
        token.className = "token function";
        token.textContent = match[0];
        code.append(token);
        fragment.append(code);
        offset = end;
      }
      if (offset) {
        fragment.append(text.data.slice(offset));
        text.replaceWith(fragment);
      }
    }
  }
  window.JavaScriptInlineFunctions = { highlight };
})();
