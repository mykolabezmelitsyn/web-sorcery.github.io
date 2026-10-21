/* Shared syntax highlighting for static code and dynamically rendered examples. */
(() => {
  const prism = window.Prism;
  if (!prism) return;

  // Distinguish member access and object/type keys alongside the standard
  // JavaScript/TypeScript functions, classes, literals, and keywords.
  for (const language of ["javascript", "typescript", "tsx"]) {
    prism.languages.insertBefore(language, "operator", {
      property: [
        {
          pattern: /(\.\s*)[A-Za-z_$][\w$]*(?![\w$]|\s*\()/,
          lookbehind: true,
        },
        /\b[A-Za-z_$][\w$]*\??(?=\s*:)/,
      ],
    });
  }
  prism.languages.shell = prism.languages.bash;

  function highlight(root) {
    const elements = root.matches?.("code")
      ? [root]
      : root.querySelectorAll("code");
    for (const element of elements) {
      // Explicit languages take precedence, including intentionally plain text.
      if (element.closest(".language-none, .lang-none")) continue;
      const explicit = prism.util.getLanguage(element);
      const language =
        explicit === "none"
          ? element.closest("[data-code-language]")?.dataset.codeLanguage
          : explicit;
      if (!language || !prism.languages[language]) continue;
      element.classList.add("language-" + language);
      prism.highlightElement(element);
    }
  }

  window.HandbookHighlight = { highlight };
  // Static inline examples already exist; renderers call highlight again for
  // newly created examples whenever search or stage filters rebuild content.
  highlight(document);
})();
