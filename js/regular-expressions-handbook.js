const topics = [
  [
    "Getting Started",
    [
      [
        "Regex literal",
        "Create a regular expression with /pattern/flags.",
        'const regex = /cat/i;\nconsole.log(regex.test("Cat food")); // true',
      ],
      [
        "RegExp constructor",
        "Create dynamic patterns; escape special characters in user text.",
        'function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&"); }\nconst term = "C++";\nconst re = new RegExp(escapeRegExp(term), "i");\nconsole.log(re.test("Learn C++")); // true',
      ],
      [
        "test()",
        "Return a boolean indicating whether a pattern matches.",
        'const productCode = "SKU-4821";\nconsole.log(/^SKU-\\d{4}$/.test(productCode)); // true',
      ],
      [
        "match()",
        "Return a match, or all matching strings when the global flag is used.",
        'const text = "Order 123 and order 456";\nconsole.log(text.match(/\\d+/g)); // ["123", "456"]',
      ],
      [
        "matchAll()",
        "Iterate over all matches, including captured groups; requires g.",
        'const text = "item-15 item-29";\nconst ids = [...text.matchAll(/item-(\\d+)/g)].map(m => m[1]);\nconsole.log(ids); // ["15", "29"]',
      ],
      [
        "replace()",
        "Replace the first match, or every match with g; supports callbacks.",
        'const htmlText = "Price: $20, shipping: $5";\nconst updated = htmlText.replace(/\\$(\\d+)/g, (_, amount) => `$${Number(amount) * 2}`);\nconsole.log(updated); // "Price: $40, shipping: $10"',
      ],
      [
        "split()",
        "Split a string around a regular expression.",
        'const keywords = "JS, CSS ;  HTML".split(/\\s*[,;]\\s*/);\nconsole.log(keywords); // ["JS", "CSS", "HTML"]',
      ],
      [
        "exec()",
        "Return match metadata (index, groups), or null.",
        'const result = /order-(\\d+)/.exec("Paid order-4821");\nconsole.log(result?.[1], result?.index); // "4821" 5',
      ],
    ],
  ],
  [
    "Character Classes",
    [
      [
        ".",
        "Match any character except line terminators (unless s flag).",
        'console.log(/c.t/.test("cat")); // true',
      ],
      [
        "\\d / \\D",
        "Match an ASCII digit / non-digit in JavaScript.",
        'console.log(/\\d{4}/.test("Ref: 2026")); // true',
      ],
      [
        "\\w / \\W",
        "Match an ASCII word character [A-Za-z0-9_] / non-word character (with Unicode-folding caveats under iu).",
        'console.log(/^\\w+$/.test("user_42")); // true',
      ],
      [
        "\\s / \\S",
        "Match whitespace / non-whitespace.",
        'const clean = "  New  item ".replace(/\\s+/g, " ").trim();\nconsole.log(clean); // "New item"',
      ],
      [
        "[abc]",
        "Match any one character in a set.",
        'console.log(/[aeiou]/i.test("Keyboard")); // true',
      ],
      [
        "[^abc]",
        "Match any one character NOT in a set.",
        'console.log(/[^0-9]/.test("42px")); // true',
      ],
      [
        "[a-z]",
        "Match a character in a range.",
        'console.log(/^[a-z]+$/i.test("Frontend")); // true',
      ],
      [
        "\\p{L} / \\p{N}",
        "Match Unicode letters or numbers with the u flag.",
        'const name = "Ірина";\nconsole.log(/^\\p{L}+$/u.test(name)); // true',
      ],
      [
        "Escaping metacharacters",
        "Use \\ to match symbols that normally have meaning.",
        'console.log(/\\$\\d+\\.\\d{2}/.test("Total $25.99")); // true',
      ],
    ],
  ],
  [
    "Quantifiers",
    [
      [
        "*",
        "Zero or more of the previous token.",
        'console.log(/^ab*c$/.test("ac")); // true',
      ],
      [
        "+",
        "One or more of the previous token.",
        'console.log(/^ab+c$/.test("abbbc")); // true',
      ],
      [
        "?",
        "Zero or one of the previous token (optional).",
        'console.log(/^colou?r$/.test("color")); // true',
      ],
      [
        "{n}",
        "Exactly n repetitions.",
        'console.log(/^\\d{6}$/.test("210500")); // true',
      ],
      [
        "{n,}",
        "At least n repetitions.",
        'console.log(/^.{8,}$/.test("myPassword")); // true',
      ],
      [
        "{n,m}",
        "Between n and m repetitions, inclusive.",
        'console.log(/^[A-Z]{2,3}$/.test("USA")); // true',
      ],
      [
        "Lazy quantifiers",
        "Add ? after a quantifier to match as little as possible.",
        'const tags = "<b>One</b><b>Two</b>";\nconsole.log(tags.match(/<b>.*?<\\/b>/g)); // two matches\n// Not suitable for parsing arbitrary HTML.',
      ],
      [
        "Greedy quantifiers",
        "By default, quantifiers match as much as possible.",
        'console.log("a123b456b".match(/a.*b/)?.[0]); // "a123b456b"',
      ],
    ],
  ],
  [
    "Anchors & Boundaries",
    [
      [
        "^",
        "Match the start of input (or each line with m).",
        'console.log(/^ERROR/.test("ERROR: timeout")); // true',
      ],
      [
        "$",
        "Match the end of input (or line with m; also may match before a final line break).",
        'console.log(/\\.pdf$/i.test("report.PDF")); // true',
      ],
      [
        "\\b",
        "Match an ASCII-oriented word boundary.",
        'console.log(/\\bcat\\b/.test("a cat sleeps")); // true',
      ],
      [
        "\\B",
        "Match a position that is not a word boundary.",
        'console.log(/\\Bend/.test("weekend")); // true',
      ],
      [
        "Line-by-line anchors (m)",
        "With m, ^ and $ also match line starts and ends.",
        'const logs = "INFO ready\\nERROR failed\\nINFO retry";\nconsole.log(logs.match(/^ERROR.*$/gm)); // ["ERROR failed"]',
      ],
    ],
  ],
  [
    "Groups & Alternation",
    [
      [
        "(abc)",
        "Capture a substring for later use.",
        'const match = "2026-10-08".match(/(\\d{4})-(\\d{2})-(\\d{2})/);\nconsole.log(match?.[1]); // "2026"',
      ],
      [
        "(?:abc)",
        "Group tokens without capturing.",
        'console.log(/^(?:http|https):\\/\\//.test("https://example.com")); // true',
      ],
      [
        "(?<name>...)",
        "Create named capture groups.",
        'const match = "2026-10-08".match(/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/);\nconsole.log(match?.groups?.month); // "10"',
      ],
      [
        "|",
        "Match either alternative (use grouping to scope it).",
        'console.log(/\\.(?:jpg|jpeg|png)$/i.test("photo.png")); // true',
      ],
      [
        "\\1",
        "Backreference: match the same text as an earlier capture.",
        'console.log(/\\b(\\w+)\\s+\\1\\b/i.test("the the")); // true',
      ],
      [
        "$1 in replacement",
        "Use captured groups in a replacement string.",
        'const formatted = "Doe, Jane".replace(/^(\\w+),\\s*(\\w+)$/, "$2 $1");\nconsole.log(formatted); // "Jane Doe"',
      ],
    ],
  ],
  [
    "Lookarounds",
    [
      [
        "(?=...)",
        "Positive lookahead: require following text without consuming it.",
        'console.log(/\\d+(?=px)/.exec("margin: 24px")?.[0]); // "24"',
      ],
      [
        "(?!...)",
        "Negative lookahead: reject a match when a pattern follows.",
        'console.log(/^(?!admin$)[a-z]+$/.test("guest")); // true',
      ],
      [
        "(?<=...)",
        "Positive lookbehind: require preceding text without consuming it.",
        'console.log(/(?<=\\$)\\d+/.exec("Price: $49")?.[0]); // "49"',
      ],
      [
        "(?<!...)",
        "Negative lookbehind: require that preceding text does not match.",
        'console.log(/(?<!\\$)\\b\\d+/.exec("Cost 49")?.[0]); // "49"',
      ],
    ],
  ],
  [
    "Flags",
    [
      [
        "g — global",
        "Find all matches rather than the first; test()/exec() update lastIndex.",
        'console.log("a1 b2".match(/\\d/g)); // ["1", "2"]',
      ],
      [
        "i — ignore case",
        "Perform case-insensitive matching.",
        'console.log(/javascript/i.test("JavaScript")); // true',
      ],
      [
        "m — multiline",
        "Let ^ and $ match at line boundaries too.",
        'console.log(/^TODO:/m.test("Done\\nTODO: review")); // true',
      ],
      [
        "s — dotAll",
        "Make . also match line terminators.",
        'console.log(/start.*end/s.test("start\\nend")); // true',
      ],
      [
        "u — Unicode",
        "Use Unicode-aware regular expression semantics.",
        'console.log(/^\\u{1F680}$/u.test("🚀")); // true',
      ],
      [
        "v — Unicode sets",
        "Enable Unicode set notation and set operations (modern engines).",
        'const lettersExceptAscii = /[\\p{L}--[a-zA-Z]]/v;\nconsole.log(lettersExceptAscii.test("Ї")); // true',
      ],
      [
        "y — sticky",
        "Match exactly at lastIndex (useful for tokenization).",
        'const regex = /\\d+/y;\nregex.lastIndex = 3;\nconsole.log(regex.exec("id:42")?.[0]); // "42"',
      ],
      [
        "d — indices",
        "Include start/end indices for overall matches and groups.",
        'const match = /(?<id>\\d+)/d.exec("ID: 42");\nconsole.log(match?.indices.groups.id); // [4, 6]',
      ],
    ],
  ],
  [
    "Real-World Patterns",
    [
      [
        "Email (basic format)",
        "Check a common email shape; not full RFC validation and not proof of deliverability.",
        'const email = "alex@example.com";\nconst looksLikeEmail = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);',
      ],
      [
        "Product SKU",
        "Require 3 capital letters, a dash, and 4 digits.",
        'const sku = "ABC-1234";\nconsole.log(/^[A-Z]{3}-\\d{4}$/.test(sku)); // true',
      ],
      [
        "Hex color",
        "Match 3-, 4-, 6-, or 8-digit hexadecimal CSS colors.",
        'const isHex = /^#(?:[\\da-f]{3}|[\\da-f]{4}|[\\da-f]{6}|[\\da-f]{8})$/i;\nconsole.log(isHex.test("#2F4E4F")); // true',
      ],
      [
        "URL query parameter",
        "Extract URL parameters with URLSearchParams instead of complicated regex.",
        'const url = new URL("https://example.com/?q=red%20shoes");\nconsole.log(url.searchParams.get("q")); // "red shoes"',
      ],
      [
        "HTML whitespace",
        "Collapse repeated whitespace in plain text.",
        'const title = "  Wireless   keyboard  ";\nconsole.log(title.trim().replace(/\\s+/g, " ")); // "Wireless keyboard"',
      ],
      [
        "Thousands separators",
        "Format digits manually with lookahead (prefer Intl for production localization).",
        'const amount = "1234567";\nconsole.log(amount.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",")); // "1,234,567"',
      ],
      [
        "Filename extension",
        "Allow a small set of upload extensions (not a security check).",
        'const allowed = /\\.(?:jpe?g|png|webp)$/i;\nconsole.log(allowed.test("avatar.webp")); // true\n// Also validate file content and MIME type server-side.',
      ],
      [
        "Remove duplicate words",
        "Replace consecutive repeated words.",
        'const text = "This is is a test";\nconsole.log(text.replace(/\\b(\\w+)(?:\\s+\\1\\b)+/gi, "$1")); // "This is a test"',
      ],
      [
        "Slug normalization",
        "Create a basic ASCII slug from a title.",
        'const title = "10 Useful JS Tips!";\nconst slug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");\nconsole.log(slug); // "10-useful-js-tips"',
      ],
      [
        "Extract hashtags",
        "Find simple ASCII hashtags in a post.",
        'const post = "Learn #JavaScript and #CSS today";\nconsole.log(post.match(/#[A-Za-z][\\w]*/g)); // ["#JavaScript", "#CSS"]',
      ],
      [
        "Date shape (YYYY-MM-DD)",
        "Check the shape, then validate actual calendar dates separately.",
        'const looksLikeDate = /^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$/;\nconsole.log(looksLikeDate.test("2026-10-08")); // true',
      ],
    ],
  ],
  [
    "Pitfalls & Best Practices",
    [
      [
        "Escape dynamic input",
        "Never interpolate untrusted input into a regex without escaping it.",
        'function escapeRegExp(value) {\n  return value.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&");\n}\nconst needle = "C++";\nconst regex = new RegExp(escapeRegExp(needle), "i");',
      ],
      [
        "Beware /g with test()",
        "Global or sticky expressions have stateful lastIndex.",
        'const regex = /a/g;\nconsole.log(regex.test("a")); // true\nconsole.log(regex.test("a")); // false (lastIndex advanced)\nregex.lastIndex = 0;',
      ],
      [
        "Avoid nested ambiguous quantifiers",
        "Patterns like (a+)+$ can take extremely long on failing input.",
        '// Prefer a linear, constrained form when possible:\nconst safe = /^a+$/;\nconsole.log(safe.test("aaaa")); // true',
      ],
      [
        "Keep validation layered",
        "Regex checks format only; validate semantics separately.",
        'const input = "2026-02-30";\nconst shapeOK = /^\\d{4}-\\d{2}-\\d{2}$/.test(input);\n// shapeOK is true, but February 30 is not a valid date.',
      ],
      [
        "Prefer built-in parsers",
        "For URLs, dates, HTML, and structured input, prefer purpose-built APIs.",
        'const params = new URLSearchParams("page=2&sort=price");\nconsole.log(params.get("sort")); // "price"',
      ],
    ],
  ],
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
function updateNavActive() {
  const links = [...nav.querySelectorAll("a")];
  const target = decodeURIComponent(location.hash.slice(1));
  const selected = links.find((a) => a.hash.slice(1) === target) || links[0];
  links.forEach((a) => {
    const active = a === selected;
    a.classList.toggle("active", active);
    if (active) a.setAttribute("aria-current", "location");
    else a.removeAttribute("aria-current");
  });
}
function render() {
  const q = search.value.trim().toLowerCase();
  content.replaceChildren();
  nav.replaceChildren();
  let total = 0;
  for (const [category, entries] of topics) {
    const matches = entries.filter(([name, description, example]) =>
      (category + " " + name + " " + description + " " + example)
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
    for (const [name, description, example] of matches) {
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
      label.textContent = "JavaScript example";
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "Copy code";
      button.setAttribute("aria-label", "Copy example for " + name);
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
      article.append(h3, p, head, pre);
      section.append(article);
    }
    content.append(section);
  }
  count.textContent = total + " entries";
  if (!total) {
    const p = document.createElement("p");
    p.className = "empty";
    p.textContent = "No matching patterns. Try another search.";
    content.append(p);
  }
  updateNavActive();
}
search.addEventListener("input", render);
window.addEventListener("hashchange", updateNavActive);
render();
