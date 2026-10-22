/* API commentary stays outside example source and copied text. */
(() => {
  const data = window.JavaScriptNativeNotes;
  if (!data) return;
  const files = new WeakMap();
  let sequence = 0;
  let activeTrigger = null;
  const popup = document.createElement("div");
  popup.id = "native-api-popover";
  popup.className = "native-api-popover";
  popup.setAttribute("popover", "auto");
  popup.setAttribute("role", "dialog");
  popup.setAttribute("aria-label", "Native API reference");
  popup.tabIndex = -1;
  const popoversSupported = typeof popup.showPopover === "function";
  popup.hidden = !popoversSupported;
  document.body.append(popup);

  function element(tag, text, className) {
    const result = document.createElement(tag);
    if (text !== undefined) result.textContent = text;
    if (className) result.className = className;
    return result;
  }

  function explanation(api) {
    const fragment = document.createDocumentFragment();
    fragment.append(element("p", api.does));
    const details = element("dl");
    for (const [label, value] of [
      ["Parameters", api.parameters],
      ["Returns", api.returns],
      ["Behavior", api.behavior],
    ]) {
      details.append(element("dt", label), element("dd", value));
    }
    const source = element("a", "Reference ↗");
    source.href = api.source;
    source.target = "_blank";
    source.rel = "noopener noreferrer";
    fragment.append(details, source);
    return fragment;
  }

  function close() {
    if (
      typeof popup.hidePopover === "function" &&
      popup.matches(":popover-open")
    )
      popup.hidePopover();
  }

  popup.addEventListener("toggle", (event) => {
    if (event.newState === "closed" && activeTrigger) {
      activeTrigger.setAttribute("aria-expanded", "false");
      activeTrigger = null;
    }
  });

  function show(trigger, use, file) {
    close();
    const api = data.apis[use.api];
    const dismiss = element("button", "Close", "native-api-close");
    dismiss.type = "button";
    dismiss.addEventListener("click", () => {
      close();
      trigger.focus({ preventScroll: true });
    });
    popup.replaceChildren(
      dismiss,
      element(
        "p",
        `${file.name} · line ${use.line} · ${api.kind}`,
        "native-api-context",
      ),
      element("h4", api.title),
      explanation(api),
    );
    activeTrigger = trigger;
    trigger.setAttribute("aria-expanded", "true");
    popup.showPopover();
    position(trigger);
    popup.focus({ preventScroll: true });
  }

  function position(trigger) {
    const rect = trigger.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight) {
      close();
      return;
    }
    const gap = 10;
    const left = Math.max(
      gap,
      Math.min(rect.left, innerWidth - popup.offsetWidth - gap),
    );
    const below = rect.bottom + gap;
    const top =
      below + popup.offsetHeight <= innerHeight - gap
        ? below
        : Math.max(gap, rect.top - popup.offsetHeight - gap);
    popup.style.left = `${left}px`;
    popup.style.top = `${top}px`;
  }

  function decorate(code, file) {
    const uses = files.get(file);
    if (!uses?.length) return null;
    const notes = element("details", undefined, "native-api-notes");
    const groups = new Map();
    for (const use of uses) {
      if (!groups.has(use.api)) groups.set(use.api, []);
      groups.get(use.api).push(use);
    }
    const summary = element(
      "summary",
      `Native API notes · ${groups.size} APIs`,
    );
    notes.append(
      summary,
      element(
        "p",
        "Select an underlined function in the code for its explanation, or expand this reference. Line numbers refer to the unchanged example.",
        "native-api-hint",
      ),
    );
    const list = element("ul", undefined, "native-api-list");
    const ids = new Map();
    for (const [key, calls] of groups) {
      const api = data.apis[key];
      const item = element("li");
      const detail = element("details");
      detail.id = `native-api-note-${++sequence}`;
      ids.set(key, detail.id);
      const heading = element("summary");
      const lines = [...new Set(calls.map((use) => use.line))].join(", ");
      heading.append(
        element("code", api.title, "language-none"),
        element("span", ` · ${calls.length === 1 ? "line" : "lines"} ${lines}`),
      );
      detail.append(
        heading,
        element("p", api.kind, "native-api-context"),
        explanation(api),
      );
      item.append(detail);
      list.append(item);
    }
    notes.append(list);
    // Keep the instruction visible while the longer reference is collapsed.
    const wrapper = element("div", undefined, "native-api-reference");
    wrapper.append(
      element(
        "p",
        popoversSupported
          ? "Underlined native calls have API notes. Select one to read its parameters, return value, and behavior."
          : "Expand Native API notes for the functions in this example; line numbers locate each call.",
        "native-api-hint",
      ),
      notes,
    );

    // Map original source offsets into Prism's text nodes. Work backward so
    // wrapping a later identifier cannot shift an earlier source position.
    const walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);
    const texts = [];
    let offset = 0;
    while (walker.nextNode()) {
      const text = walker.currentNode;
      texts.push({ node: text, start: offset, end: offset + text.length });
      offset += text.length;
    }
    if (!popoversSupported) return wrapper;
    for (const use of [...uses].reverse()) {
      const start = texts.find(
        (text) => text.start <= use.start && text.end > use.start,
      );
      const end = texts.find(
        (text) => text.start < use.end && text.end >= use.end,
      );
      if (!start || !end) continue;
      const range = document.createRange();
      range.setStart(start.node, use.start - start.start);
      range.setEnd(end.node, use.end - end.start);
      const button = element("button", undefined, "native-api-call");
      button.type = "button";
      button.setAttribute(
        "aria-label",
        `${data.apis[use.api].title}: API notes, line ${use.line}`,
      );
      button.setAttribute("aria-haspopup", "dialog");
      button.setAttribute("aria-controls", popup.id);
      button.setAttribute("aria-expanded", "false");
      button.title = "Read API notes";
      button.dataset.api = use.api;
      button.append(range.extractContents());
      range.insertNode(button);
      button.addEventListener("click", () => show(button, use, file));
    }
    return wrapper;
  }

  window.addEventListener("resize", () => {
    if (activeTrigger) position(activeTrigger);
  });
  document.addEventListener(
    "scroll",
    (event) => {
      if (activeTrigger && !popup.contains(event.target))
        position(activeTrigger);
    },
    true,
  );
  window.JavaScriptApiNotes = {
    bind(book) {
      for (const example of data.examples) {
        const chapter = book.chapters.find(
          (chapter) => chapter.number === example.chapter,
        );
        const file = chapter?.lessons[example.lesson]?.files[example.file];
        if (!file) continue;
        // Offsets are valid only for the reviewed source. A later code edit must
        // refresh its notes instead of attaching an explanation to the wrong call.
        let hash = 2166136261;
        for (let index = 0; index < file.code.length; index++) {
          hash = Math.imul(hash ^ file.code.charCodeAt(index), 16777619);
        }
        if ((hash >>> 0).toString(16) === example.sourceHash) {
          files.set(file, example.uses);
        }
      }
    },
    decorate,
    close,
  };
})();
