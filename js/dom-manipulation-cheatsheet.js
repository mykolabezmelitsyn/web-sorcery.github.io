/* Add only DOM Manipulation categories supplied by the user, in image order. */
const handbook = {
  categories: [
    {
      name: "Element Selection",
      id: "element-selection",
      intro:
        "Query Selectors → Get Element Methods → live and static collections. Each labeled example is an independent complete HTML file with its own DOM fixture; save it as index.html and open it in a browser. Selector output and collection behavior are verified without relying on the cheat sheet page’s own markup.",
      methods: [
        {
          name: "document.querySelector()",
          explanation:
            "Returns the first element matching a CSS selector, or null when none matches.",
          note: "A selector must be valid CSS or the call throws SyntaxError. The examples are complete independent HTML files; save each as index.html and open it in a browser.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector",
          examples: [
            {
              label: "Select by class and ID",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <p id="intro" class="class-name">First</p>\n  <p class="class-name">Second</p>\n  <script>\n    const byClass = document.querySelector(".class-name");\n    const byId = document.querySelector("#intro");\n    console.log(byClass.textContent, byClass === byId); // "First", true\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Select by exact data attribute",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <button data-id="123">Open</button>\n  <script>\n    const element = document.querySelector(\'[data-id="123"]\');\n    console.log(element.textContent, document.querySelector(".missing")); // "Open", null\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "document.querySelectorAll()",
          explanation:
            "Returns all matching elements in document order. The list does not update when elements are added or removed.",
          note: "An unmatched selector produces an empty NodeList. The list is a snapshot of membership, while its elements remain the actual mutable DOM nodes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll",
          examples: [
            {
              label: "Select matching classes and element types",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <div class="class-name active">A</div>\n  <div class="class-name">B</div>\n  <script>\n    console.log(document.querySelectorAll(".class-name").length);\n    console.log(document.querySelectorAll("div.active")[0].textContent);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Select checked checkboxes",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <input type="checkbox" value="a" checked />\n  <input type="checkbox" value="b" />\n  <input type="checkbox" value="c" checked />\n  <script>\n    const elements = document.querySelectorAll(\'[type="checkbox"]:checked\');\n    console.log(elements.length, elements[0].value, elements[1].value);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Convert a NodeList to an array",
          explanation:
            "Copies a node list into an array so you can use array methods.",
          note: "The copy contains references to the same elements; it does not clone nodes.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/NodeList",
          examples: [
            {
              label: "Convert with Array.from",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <p class="item">A</p><p class="item">B</p>\n  <script>\n    const array = Array.from(document.querySelectorAll(".item"));\n    console.log(Array.isArray(array), ...array.map((item) => item.textContent));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Convert with spread",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <p class="item">A</p>\n  <script>\n    const nodes = document.querySelectorAll(".item");\n    const array = [...nodes];\n    console.log(Array.isArray(array), array[0] === nodes[0]);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Attribute selectors",
          explanation:
            "Matches elements by attribute presence, exact value, word membership, or text patterns.",
          note: "~= matches a whitespace-separated word, ^= a prefix, $= a suffix, and *= a substring. These tests inspect attribute text rather than a normalized URL property.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector",
          examples: [
            {
              label: "Match presence, an exact value, and a class word",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <p data-id="123" class="active card">Selected</p>\n  <script>\n    console.log(document.querySelector("[data-id]").textContent);\n    console.log(\n      document.querySelector(\'[data-id="123"]\') ===\n        document.querySelector(\'[class~="active"]\'),\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Match link prefixes, suffixes, and substrings",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <a href="https://google.example/report.pdf">Report</a>\n  <script>\n    const starts = document.querySelector(\'[href^="https"]\');\n    const ends = document.querySelector(\'[href$=".pdf"]\');\n    const contains = document.querySelector(\'[href*="google"]\');\n    console.log(starts.textContent, starts === ends, ends === contains);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Pseudo-class selectors",
          explanation:
            "Selects elements by their position or state, such as first child or checked.",
          note: "nth-child counts element siblings starting at one. first-of-type finds the first sibling of its element type, which need not be the first child.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector",
          examples: [
            {
              label: "Select first, last, and third children",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <ul\n    ><li>One</li\n    ><li>Two</li\n    ><li>Three</li\n    ><li>Four</li></ul\n  >\n  <script>\n    console.log(\n      document.querySelector("li:first-child").textContent,\n      document.querySelector("li:last-child").textContent,\n      document.querySelector("li:nth-child(3)").textContent,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Select the first paragraph and exclude submit inputs",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <section><h2>Title</h2><p>First paragraph</p><p>Second</p></section>\n  <input type="submit" value="Send" /><input type="text" value="Name" />\n  <script>\n    console.log(document.querySelector("p:first-of-type").textContent);\n    console.log(document.querySelector(\'input:not([type="submit"])\').value);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "CSS combinators",
          explanation:
            "Combines selector parts to express child, descendant, or sibling relationships.",
          note: "A space includes any descendant depth; > requires a direct child. + selects an immediately following element sibling, and ~ permits any following element sibling sharing the same parent.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector",
          examples: [
            {
              label: "Distinguish a direct child from any descendant",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <div id="box"\n    ><section><p>Nested</p></section\n    ><p>Direct</p></div\n  >\n  <script>\n    console.log(\n      document.querySelector("#box > p").textContent,\n      document.querySelector("#box p").textContent,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Compare adjacent and general siblings",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <h2>Heading</h2><p>Adjacent</p><span>Gap</span><p>Later</p>\n  <script>\n    console.log(document.querySelector("h2 + p").textContent);\n    console.log(\n      ...Array.from(document.querySelectorAll("h2 ~ p"), (p) => p.textContent),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Multiple selectors",
          explanation:
            "Uses a comma-separated selector list to match any listed alternative.",
          note: "Results follow document order and each element appears once even if it matches more than one selector.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll",
          examples: [
            {
              label: "Select several heading levels",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <h2>Second level</h2><h1>First level</h1><h3>Third level</h3>\n  <script>\n    console.log(\n      ...Array.from(\n        document.querySelectorAll("h1, h2, h3"),\n        (item) => item.textContent,\n      ),\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Combine types without duplicate membership",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <div class="active highlight">A</div><span class="highlight">B</span>\n  <script>\n    const elements = document.querySelectorAll(\n      "div.active, span.highlight, .highlight",\n    );\n    console.log(\n      elements.length,\n      ...Array.from(elements, (item) => item.textContent),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Scoped element queries",
          explanation: "Searches for elements inside a chosen parent.",
          note: "Check that the parent exists before querying it. Ancestor selector matching can extend outside that parent; :scope > .item explicitly means direct children of this container.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll",
          examples: [
            {
              label: "Query one container rather than the whole document",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <p class="item">Outside</p\n  ><section class="container"\n    ><p class="item">Inside A</p><p class="item">Inside B</p></section\n  >\n  <script>\n    const container = document.querySelector(".container");\n    const items = container.querySelectorAll(".item");\n    const firstItem = container.querySelector(".item");\n    console.log(items.length, firstItem.textContent);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Limit a query to direct children with :scope",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <div class="container"\n    ><p class="item">Direct</p\n    ><section><p class="item">Nested</p></section></div\n  >\n  <script>\n    const container = document.querySelector(".container");\n    console.log(\n      container.querySelectorAll(".item").length,\n      container.querySelectorAll(":scope > .item").length,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Check for an element before using it",
          explanation:
            "Tests a query result for null before accessing element properties.",
          note: "Optional chaining can skip an operation on a nullish result, but a guard is clearer when several mutations belong together.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector",
          examples: [
            {
              label: "Show an existing modal",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <div class="modal" style="display: none">Dialog</div>\n  <script>\n    const modal = document.querySelector(".modal");\n    if (modal) modal.style.display = "block";\n    console.log(modal.style.display);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Handle a missing modal",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <p>No modal here</p>\n  <script>\n    const modal = document.querySelector(".modal");\n    if (modal) modal.style.display = "block";\n    else console.log("Modal absent");\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "NodeList.forEach()",
          explanation:
            "Visits the nodes in a NodeList without converting it into an array.",
          note: "querySelectorAll returns a static list, so changing the class used by the selector does not remove nodes from the iteration.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach",
          examples: [
            {
              label: "Mark matching items as processed",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <p class="item">A</p><p class="item">B</p>\n  <script>\n    document\n      .querySelectorAll(".item")\n      .forEach((item) => item.classList.add("processed"));\n    console.log(document.querySelectorAll(".item.processed").length);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Remove the matched class during snapshot iteration",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <p class="item">A</p><p class="item">B</p>\n  <script>\n    const items = document.querySelectorAll(".item");\n    items.forEach((item) => item.classList.remove("item"));\n    console.log(items.length, document.querySelectorAll(".item").length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "document.getElementById()",
          explanation:
            "Returns the element with the exact ID string, or null when it is absent.",
          note: "Pass the raw ID without a CSS # prefix. IDs should be unique; choosing this API does not justify a universal fastest-method claim without a relevant benchmark.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById",
          examples: [
            {
              label: "Look up known IDs",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <header id="header">Header</header><button id="submit-btn">Send</button>\n  <script>\n    const header = document.getElementById("header");\n    const submitBtn = document.getElementById("submit-btn");\n    console.log(header.textContent, submitBtn.textContent);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Use a raw ID rather than a CSS selector",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <header id="header">Header</header>\n  <script>\n    console.log(\n      document.getElementById("#header"),\n      document.getElementById("header").textContent,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "getElementsByClassName()",
          explanation:
            "Returns a live HTMLCollection of elements with all the requested classes.",
          note: "Class names are whitespace-separated, not CSS .class syntax. Document and Element provide this method; element queries include descendants rather than the element itself.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName",
          examples: [
            {
              label: "Select a class and inspect indexed membership",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <p class="item">A</p><p class="item">B</p>\n  <script>\n    const items = document.getElementsByClassName("item");\n    console.log(items.length, items[0].textContent);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Require multiple classes",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <p class="active highlight">Both</p><p class="active">One</p>\n  <script>\n    const active = document.getElementsByClassName("active highlight");\n    console.log(active.length, active[0].textContent);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Convert an HTMLCollection to an array",
          explanation:
            "Creates a stable array snapshot from a live HTMLCollection.",
          note: "HTMLCollection is array-like but has no built-in forEach. The snapshot still references the original mutable nodes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection",
          examples: [
            {
              label: "Convert with Array.from",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <p class="item">A</p><p class="item">B</p>\n  <script>\n    const items = document.getElementsByClassName("item");\n    const array = Array.from(items);\n    console.log(Array.isArray(array), ...array.map((item) => item.textContent));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Use spread before changing live membership",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <p class="item">A</p><p class="item">B</p>\n  <script>\n    const items = document.getElementsByClassName("item");\n    const array = [...items];\n    array.forEach((item) => item.classList.remove("item"));\n    console.log(array.length, items.length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "getElementsByTagName()",
          explanation:
            "Returns a live HTMLCollection of descendant elements with a given tag name.",
          note: "Available on Document and Element. In an HTML document ordinary tag names are case-insensitive; a scoped element query excludes the scope element itself.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName",
          examples: [
            {
              label: "Select div and img elements",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <div>A</div><div>B</div><img alt="Example" />\n  <script>\n    console.log(\n      document.getElementsByTagName("div").length,\n      document.getElementsByTagName("img")[0].alt,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Select all descendants of a container",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <section id="container"\n    ><p>One <strong>bold</strong></p\n    ><span>Two</span></section\n  >\n  <script>\n    const container = document.getElementById("container");\n    const all = container.getElementsByTagName("*");\n    console.log(all.length, ...Array.from(all, (element) => element.tagName));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "document.getElementsByName()",
          explanation:
            "Returns a live NodeList of elements with the exact name attribute.",
          note: "This returns a NodeList, not an HTMLCollection, and is not limited to form controls. It differs from querySelectorAll because its membership updates live.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByName",
          examples: [
            {
              label: "Select email inputs by name",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <input name="email" value="first@example.com" /><input\n    name="email"\n    value="second@example.com"\n  />\n  <script>\n    const emailInputs = document.getElementsByName("email");\n    console.log(emailInputs.length, emailInputs[0].value);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Find the selected radio in a group",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <input type="radio" name="color" value="red" /><input\n    type="radio"\n    name="color"\n    value="blue"\n    checked\n  />\n  <script>\n    const radioButtons = document.getElementsByName("color");\n    const selectedRadio = Array.from(radioButtons).find(\n      (radio) => radio.checked,\n    );\n    console.log(selectedRadio?.value);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Live collections",
          explanation:
            "Updates the list automatically when matching elements change.",
          note: "getElementsByClassName and getElementsByTagName return live HTMLCollections; getElementsByName returns a live NodeList. Live versus static cannot be inferred from the NodeList type alone.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection",
          examples: [
            {
              label: "Observe a live HTMLCollection update",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <div class="item">A</div><div class="item">B</div><div class="item">C</div>\n  <script>\n    const liveItems = document.getElementsByClassName("item");\n    console.log(liveItems.length);\n    const item = document.createElement("div");\n    item.className = "item";\n    item.textContent = "New";\n    document.body.append(item);\n    console.log(liveItems.length);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Observe a live NodeList update",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <input name="email" />\n  <script>\n    const inputs = document.getElementsByName("email");\n    console.log(inputs.length);\n    const input = document.createElement("input");\n    input.name = "email";\n    document.body.append(input);\n    console.log(inputs.length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Static querySelectorAll snapshots",
          explanation:
            "Keeps the same list of elements even when the page changes.",
          note: "Static membership does not freeze the nodes. Appending a new node preserves existing DOM identity; replacing body.innerHTML would recreate existing nodes and invalidate attached listeners.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll",
          examples: [
            {
              label: "Keep snapshot membership after an append",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <div class="item">A</div><div class="item">B</div><div class="item">C</div>\n  <script>\n    const staticItems = document.querySelectorAll(".item");\n    const item = document.createElement("div");\n    item.className = "item";\n    document.body.append(item);\n    console.log(staticItems.length, document.querySelectorAll(".item").length);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Keep a reference while the node itself changes",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Element selection example</title>\n<body>\n  <p class="item">Before</p>\n  <script>\n    const items = document.querySelectorAll(".item");\n    items[0].textContent = "After";\n    console.log(\n      items.length,\n      items[0].textContent,\n      items[0] === document.querySelector(".item"),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Creating Elements",
      id: "creating-elements",
      intro:
        "createElement & cloneNode → document fragments and templates → innerHTML & adjacent insertion. Every example is an independent complete HTML file with defined source and target nodes; save as index.html and open in a browser. Examples distinguish cloning from moving, text from parsed HTML, and DOM writes from measured layout cost.",
      methods: [
        {
          name: "document.createElement()",
          explanation: "Creates an element without adding it to the page.",
          note: "Creation alone does not display the element. All examples are independent complete HTML files; save each as index.html and open it in a browser.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement",
          examples: [
            {
              label: "Create several element types",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <script>\n    const div = document.createElement("div");\n    const span = document.createElement("span");\n    const button = document.createElement("button");\n    const input = document.createElement("input");\n    console.log(\n      div.tagName,\n      span.tagName,\n      button.tagName,\n      input.tagName,\n      div.isConnected,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Build and attach a simple card",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <main id="cards"></main>\n  <script>\n    const div = document.createElement("div");\n    div.className = "card";\n    div.textContent = "Hello World";\n    document.querySelector("#cards").appendChild(div);\n    console.log(div.textContent, div.isConnected);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Configure new element properties",
          explanation:
            "Sets properties such as className, id, textContent, style, and link attributes before insertion.",
          note: "textContent inserts text rather than interpreting HTML. Many HTML properties reflect attributes, but some properties have distinct live state or normalized values.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement",
          examples: [
            {
              label: "Configure a card before attachment",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <script>\n    const card = document.createElement("div");\n    card.className = "card active";\n    card.id = "card-1";\n    card.textContent = "Card content";\n    card.style.backgroundColor = "#f0f0f0";\n    console.log(\n      card.id,\n      card.className,\n      card.textContent,\n      card.style.backgroundColor,\n      card.isConnected,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Create a link with attributes",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <script>\n    const link = document.createElement("a");\n    link.href = "https://example.com";\n    link.textContent = "Click me";\n    link.target = "_blank";\n    link.rel = "noopener";\n    console.log(\n      link.getAttribute("href"),\n      link.textContent,\n      link.target,\n      link.rel,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Node.cloneNode()",
          explanation:
            "Copies a node and its attributes, optionally including its descendants.",
          note: "The returned clone is detached. cloneNode does not copy listeners registered with addEventListener or event-handler properties, although inline handler attributes are copied. Give inserted clones unique IDs and review descendant IDs and form names.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode",
          examples: [
            {
              label: "Compare shallow and deep clones",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <div class="card" id="original"><h3>Title</h3><p>Content</p></div>\n  <script>\n    const original = document.querySelector(".card");\n    const shallow = original.cloneNode(false);\n    const deep = original.cloneNode(true);\n    shallow.id = "shallow";\n    deep.id = "deep";\n    console.log(\n      shallow.className,\n      shallow.childNodes.length,\n      deep.querySelector("p").textContent,\n      deep.isConnected,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Verify that the copied subtree is independent",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <div class="card"><p>Original</p></div>\n  <script>\n    const original = document.querySelector(".card");\n    const clone = original.cloneNode(true);\n    clone.querySelector("p").textContent = "Changed";\n    console.log(\n      original.querySelector("p").textContent,\n      clone.querySelector("p").textContent,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Observe that addEventListener listeners are not cloned",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <button id="original">Run</button>\n  <script>\n    const original = document.querySelector("button");\n    let clicks = 0;\n    original.addEventListener("click", () => clicks++);\n    const clone = original.cloneNode(true);\n    clone.id = "copy";\n    document.body.appendChild(clone);\n    original.click();\n    clone.click();\n    console.log(clicks); // 1\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Clone and customize an existing card",
          explanation: "Copies an existing card and changes the copy.",
          note: "A class named template is an ordinary element; it differs from an actual HTML template element whose children live in content. Updating a clone does not update the original.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode",
          examples: [
            {
              label: "Change the cloned title and paragraph",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <article class="template"><h3>Old Title</h3><p>Old Content</p></article\n  ><main id="cards"></main>\n  <script>\n    const template = document.querySelector(".template");\n    const newCard = template.cloneNode(true);\n    newCard.className = "card";\n    newCard.querySelector("h3").textContent = "New Title";\n    newCard.querySelector("p").textContent = "New Content";\n    document.querySelector("#cards").appendChild(newCard);\n    console.log(\n      template.querySelector("h3").textContent,\n      newCard.querySelector("h3").textContent,\n      newCard.querySelector("p").textContent,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Give the inserted clone a unique ID",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <article id="card-1" class="card"><h3>First</h3></article>\n  <script>\n    const clone = document.querySelector(".card").cloneNode(true);\n    clone.id = "card-2";\n    clone.querySelector("h3").textContent = "Second";\n    document.body.appendChild(clone);\n    console.log(\n      document.querySelectorAll("#card-1").length,\n      document.querySelector("#card-2 h3").textContent,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "document.createDocumentFragment()",
          explanation:
            "Creates a temporary container for nodes before adding them to the page.",
          note: "Appending a fragment moves its children, leaving the fragment empty. It does not create a wrapper element, and it does not guarantee a fixed number of reflows or universally better performance.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment",
          examples: [
            {
              label: "Build and insert one hundred list items",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <ul id="items"></ul>\n  <script>\n    const fragment = document.createDocumentFragment();\n    for (let i = 0; i < 100; i++) {\n      const li = document.createElement("li");\n      li.textContent = `Item ${i}`;\n      fragment.appendChild(li);\n    }\n    const list = document.querySelector("#items");\n    list.appendChild(fragment);\n    console.log(\n      list.children.length,\n      list.lastElementChild.textContent,\n      fragment.childNodes.length,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Move existing nodes without cloning them",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <div id="source"><button>Run</button></div\n  ><div id="target"></div>\n  <script>\n    const button = document.querySelector("button");\n    button.addEventListener("click", () => console.log("Still listening"));\n    const fragment = document.createDocumentFragment();\n    fragment.appendChild(button);\n    document.querySelector("#target").appendChild(fragment);\n    console.log(\n      document.querySelector("#source").children.length,\n      document.querySelector("#target button") === button,\n    );\n    button.click();\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "HTML template content",
          explanation: "Stores reusable HTML that can be copied into the page.",
          note: "template.content is a DocumentFragment, not a visible child list of the template element. Use trusted fixed markup here; parsing HTML does not sanitize external input.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement/content",
          examples: [
            {
              label: "Create an element from a template string",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <main id="cards"></main>\n  <script>\n    const template = document.createElement("template");\n    template.innerHTML = `<div class="card"><h3>Title</h3><p>Content</p></div>`;\n    const element = template.content.firstElementChild.cloneNode(true);\n    document.querySelector("#cards").appendChild(element);\n    console.log(\n      element.querySelector("h3").textContent,\n      template.content.children.length,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Clone all content from an HTML template",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <template id="row"><h3>Title</h3><p>Content</p></template\n  ><section id="target"></section>\n  <script>\n    const template = document.querySelector("#row");\n    const content = template.content.cloneNode(true);\n    document.querySelector("#target").appendChild(content);\n    console.log(\n      document.querySelector("#target").children.length,\n      template.content.children.length,\n      content.childNodes.length,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.innerHTML",
          explanation: "Reads or replaces the HTML inside an element.",
          note: "Assigning replaces existing child nodes, including their identity and attached listeners. Never interpolate untrusted content directly: script tags are not the only injection route, and their behavior is not a reliable safety test. Use textContent for plain text or an appropriate sanitizer for required HTML.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML",
          examples: [
            {
              label: "Replace content and then clear it",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <div class="container"><button>Old</button></div>\n  <script>\n    const container = document.querySelector(".container");\n    const old = container.firstElementChild;\n    container.innerHTML = "<h1>New Title</h1><p>New paragraph</p>";\n    console.log(container.querySelector("h1").textContent, old.isConnected);\n    container.innerHTML = "";\n    console.log(container.childNodes.length);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Build a trusted article and a fixed-data list",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <div class="container"></div>\n  <script>\n    const article = document.createElement("article");\n    article.innerHTML =\n      "<h2>Article Title</h2><p>Article content goes here</p><footer>Published today</footer>";\n    const data = ["Apple", "Banana", "Orange"];\n    const container = document.querySelector(".container");\n    container.innerHTML = `<ul class="fruit-list">${data.map((item) => `<li>${item}</li>`).join("")}</ul>`;\n    console.log(\n      article.querySelector("footer").textContent,\n      container.querySelectorAll("li").length,\n      container.querySelector("li").textContent,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.insertAdjacentHTML()",
          explanation:
            "Parses an HTML string and inserts nodes relative to an element without replacing its existing children.",
          note: "beforebegin and afterend insert siblings and require a suitable parent. afterbegin and beforeend insert inside the element. This API does not sanitize HTML; use fixed trusted strings in these examples.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML",
          examples: [
            {
              label: "Append a list while preserving an existing listener",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <ul id="items"\n    ><li><button>Existing</button></li></ul\n  >\n  <script>\n    const list = document.querySelector("#items"),\n      button = list.querySelector("button");\n    button.addEventListener("click", () => console.log("Listener preserved"));\n    const newItems = ["Item 1", "Item 2", "Item 3"];\n    newItems.forEach((item) =>\n      list.insertAdjacentHTML("beforeend", `<li>${item}</li>`),\n    );\n    console.log(list.children.length, list.querySelector("button") === button);\n    button.click();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Insert the first and last children",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <div class="target"><p>Middle</p></div>\n  <script>\n    const element = document.querySelector(".target");\n    element.insertAdjacentHTML(\n      "afterbegin",\n      \'<div class="first">First child</div>\',\n    );\n    element.insertAdjacentHTML(\n      "beforeend",\n      \'<div class="last">Last child</div>\',\n    );\n    console.log(\n      element.firstElementChild.textContent,\n      element.lastElementChild.textContent,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Insert immediately before and after an element",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <main><div class="target">Target</div></main>\n  <script>\n    const element = document.querySelector(".target");\n    element.insertAdjacentHTML(\n      "beforebegin",\n      \'<div class="before">Before element</div>\',\n    );\n    element.insertAdjacentHTML(\n      "afterend",\n      \'<div class="after">After element</div>\',\n    );\n    console.log(\n      element.previousElementSibling.textContent,\n      element.nextElementSibling.textContent,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.insertAdjacentElement()",
          explanation:
            "Inserts an existing Element at one of the four adjacent positions.",
          note: "It moves an existing node rather than cloning it. Returns the inserted element, or null when sibling insertion cannot be completed because there is no parent.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement",
          examples: [
            {
              label: "Insert a new sibling element",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <section><div class="target">Target</div></section>\n  <script>\n    const element = document.querySelector(".target");\n    const newDiv = document.createElement("div");\n    newDiv.textContent = "After";\n    const inserted = element.insertAdjacentElement("afterend", newDiv);\n    console.log(inserted === newDiv, element.nextElementSibling.textContent);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Move an existing button into another element",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <section id="source"><button>Move</button></section\n  ><section id="target"></section>\n  <script>\n    const button = document.querySelector("button");\n    button.addEventListener("click", () => console.log("Moved listener"));\n    document\n      .querySelector("#target")\n      .insertAdjacentElement("afterbegin", button);\n    console.log(\n      document.querySelector("#source").children.length,\n      document.querySelector("#target").firstElementChild === button,\n    );\n    button.click();\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.insertAdjacentText()",
          explanation:
            "Inserts a string as a text node at a relative position.",
          note: "Markup characters remain text in this API’s text context. It does not sanitize strings for unrelated contexts such as URL attributes or HTML sinks.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentText",
          examples: [
            {
              label: "Insert literal markup-looking text",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <div class="target"></div>\n  <script>\n    const element = document.querySelector(".target");\n    const userText = "<b>Not bold</b>";\n    element.insertAdjacentText("beforeend", userText);\n    console.log(element.textContent, element.querySelector("b"));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Display script-looking input as text",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <div class="target">Middle</div>\n  <script>\n    const element = document.querySelector(".target");\n    const userText = "<scr" + \'ipt>alert("XSS")</scr\' + "ipt>";\n    element.insertAdjacentText("afterbegin", userText);\n    console.log(\n      element.firstChild.nodeType,\n      element.querySelectorAll("script").length,\n      element.textContent.endsWith("Middle"),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Build lists with nodes or a single HTML assignment",
          explanation:
            "Builds a larger list through explicit element construction or one trusted-markup replacement.",
          note: "DOM writes are not the same as synchronous layout passes: browsers can batch layout, so one hundred appends do not imply one hundred reflows. Avoid universal faster claims and measure relevant workloads; innerHTML replaces children while node construction can append.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment",
          examples: [
            {
              label: "Construct one hundred text-only nodes",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <ul id="items"></ul>\n  <script>\n    const list = document.querySelector("#items");\n    for (let i = 0; i < 100; i++) {\n      const li = document.createElement("li");\n      li.textContent = `Item ${i}`;\n      list.appendChild(li);\n    }\n    console.log(\n      list.children.length,\n      list.firstElementChild.textContent,\n      list.lastElementChild.textContent,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Assign one trusted generated markup string",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Creating elements example</title>\n<body>\n  <ul id="items"></ul>\n  <script>\n    const list = document.querySelector("#items");\n    const items = Array.from({ length: 100 }, (_, i) => `<li>Item ${i}</li>`);\n    list.innerHTML = items.join("");\n    console.log(\n      list.children.length,\n      list.firstElementChild.textContent,\n      list.lastElementChild.textContent,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Modifying Elements",
      id: "modifying-elements",
      intro:
        "Text & HTML Content → Attributes & Properties. Run each complete HTML file independently. Examples distinguish rendered text from raw descendant text, DOM replacements from preserved nodes, and initial attributes from live form state. DOMPurify examples state their external dependency; all other fixtures are self-contained.",
      methods: [
        {
          name: "Node.textContent",
          explanation:
            "Reads all text inside a node, or replaces its contents with plain text.",
          note: "Reading an element includes hidden descendant text and ignores CSS rendering. Setting textContent is safe for displaying plain text in this context, not a sanitizer for later use in HTML or other contexts.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent",
          examples: [
            {
              label: "Display markup-looking input as text",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <div class="content"></div>\n  <script>\n    const div = document.querySelector(".content");\n    const userInput = "<b>Bold</b>";\n    div.textContent = userInput;\n    console.log(div.textContent, div.querySelector("b"));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Read hidden descendant text",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <div class="content">Visible<span style="display: none">Hidden</span></div>\n  <script>\n    console.log(document.querySelector(".content").textContent);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Clear and append plain text",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <div class="content"><strong>Old</strong></div>\n  <script>\n    const div = document.querySelector(".content");\n    div.textContent = "";\n    div.textContent = "Hello";\n    div.textContent += " Additional text";\n    console.log(div.textContent, div.children.length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "HTMLElement.innerText",
          explanation:
            "Reads visible text, or replaces the contents with text and line breaks.",
          note: "Reading innerText can require layout. A rendered parent omits display:none descendants, but reading an element that is itself not rendered can fall back to textContent; it is not a universal visibility test.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText",
          examples: [
            {
              label: "Exclude a hidden descendant from a rendered parent",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <div class="content">Visible<span style="display: none">Hidden</span></div>\n  <script>\n    const div = document.querySelector(".content");\n    console.log(div.innerText, div.textContent);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Set text containing a line break",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <div class="content"></div>\n  <script>\n    const div = document.querySelector(".content");\n    div.innerText = "Line 1\\nLine 2";\n    console.log(div.innerText, div.querySelectorAll("br").length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.innerHTML",
          explanation: "Reads or replaces the HTML inside an element.",
          note: "The += form reads and reparses all child markup, replacing existing nodes and losing their attached listeners in the displayed subtree. It does not simply append nodes. Untrusted strings must not be assigned directly.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML",
          examples: [
            {
              label: "Set, read, and build trusted markup",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <div class="content"></div>\n  <script>\n    const div = document.querySelector(".content");\n    div.innerHTML = "<p>Paragraph</p><span>Span</span>";\n    console.log(div.innerHTML);\n    const items = ["Apple", "Banana", "Orange"];\n    div.innerHTML = `<h3>Fruits</h3><ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;\n    console.log(\n      div.querySelector("h3").textContent,\n      div.querySelectorAll("li").length,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Observe node replacement after +=",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <div class="content"><button>Run</button></div>\n  <script>\n    const div = document.querySelector(".content"),\n      oldButton = div.querySelector("button");\n    let clicks = 0;\n    oldButton.addEventListener("click", () => clicks++);\n    div.innerHTML += "<p>New paragraph</p>";\n    div.querySelector("button").click();\n    console.log(\n      oldButton.isConnected,\n      div.querySelector("button") === oldButton,\n      clicks,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.outerHTML",
          explanation:
            "Reads an element’s full HTML, or replaces the element with new HTML.",
          note: "After assignment, the original variable still refers to the old detached element. Assignment on a parentless element is ignored; replacing a document root is a separate prohibited case.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML",
          examples: [
            {
              label: "Read and replace the complete element",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <section><p class="old">Original</p></section>\n  <script>\n    const element = document.querySelector(".old");\n    console.log(element.outerHTML);\n    element.outerHTML = \'<div class="new">Replaced element</div>\';\n    console.log(\n      element.isConnected,\n      document.querySelector(".new").textContent,\n      element.tagName,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Observe parentless assignment",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <script>\n    const detached = document.createElement("div");\n    detached.outerHTML = "<span>New</span>";\n    console.log(detached.outerHTML); // "<div></div>"\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Compare text and HTML content APIs",
          explanation:
            "Chooses plain text, rendered text, or parsed markup based on the intended result.",
          note: "Setting these properties replaces descendants. textContent does not parse markup; innerText creates line-break nodes from newlines; innerHTML parses tags.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent",
          examples: [
            {
              label: "Compare plain text and parsed markup",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <div id="plain"></div><div id="markup"></div>\n  <script>\n    const plain = document.querySelector("#plain"),\n      markup = document.querySelector("#markup");\n    plain.textContent = "<b>Bold</b>";\n    markup.innerHTML = "<b>Bold</b>";\n    console.log(\n      plain.textContent,\n      plain.children.length,\n      markup.textContent,\n      markup.firstElementChild.tagName,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Distinguish newline text from inserted br elements",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <div id="plain"></div><div id="rendered"></div>\n  <script>\n    const plain = document.querySelector("#plain"),\n      rendered = document.querySelector("#rendered");\n    plain.textContent = "Line 1\\nLine 2";\n    rendered.innerText = "Line 1\\nLine 2";\n    console.log(\n      plain.querySelectorAll("br").length,\n      rendered.querySelectorAll("br").length,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "DOMPurify.sanitize() for required HTML",
          explanation:
            "Removes unsafe HTML before you insert it into the page.",
          note: "In an isolated example folder run npm install dompurify, save index.html, and open it with node_modules alongside it. Keep DOMPurify updated. These use the HTML-only profile and do not alter the sanitized result afterward. Plain text still belongs in textContent.",
          source: "https://github.com/cure53/DOMPurify",
          examples: [
            {
              label: "Keep allowed formatting and remove an event attribute",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <div class="content"></div>\n  <script src="./node_modules/dompurify/dist/purify.min.js"></script>\n  <script>\n    const userInput = \'<b onclick="alert(1)">Hello</b>\';\n    const div = document.querySelector(".content");\n    div.innerHTML = DOMPurify.sanitize(userInput, {\n      USE_PROFILES: { html: true },\n    });\n    console.log(\n      div.querySelector("b").textContent,\n      div.querySelector("b").hasAttribute("onclick"),\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Remove a script while preserving paragraph content",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <div class="content"></div>\n  <script src="./node_modules/dompurify/dist/purify.min.js"></script>\n  <script>\n    const userInput = "<scr" + "ipt>alert(1)</scr" + "ipt><p>Allowed</p>";\n    const div = document.querySelector(".content");\n    div.innerHTML = DOMPurify.sanitize(userInput, {\n      USE_PROFILES: { html: true },\n    });\n    console.log(\n      div.querySelectorAll("script").length,\n      div.querySelector("p").textContent,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.setAttribute()",
          explanation: "Adds or updates an attribute using a string value.",
          note: "Ordinary values are converted to strings. Arbitrary attribute names and values are not automatically safe in every context, such as event handlers or navigable URLs.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute",
          examples: [
            {
              label: "Set ID, classes, data, and an ARIA label",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <button></button>\n  <script>\n    const element = document.querySelector("button");\n    element.setAttribute("id", "unique-id");\n    element.setAttribute("class", "btn btn-primary");\n    element.setAttribute("data-user-id", "12345");\n    element.setAttribute("aria-label", "Close button");\n    console.log(\n      element.id,\n      element.className,\n      element.getAttribute("data-user-id"),\n      element.getAttribute("aria-label"),\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Convert an attribute value to a string",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <div></div>\n  <script>\n    const element = document.querySelector("div");\n    element.setAttribute("data-id", 123);\n    console.log(\n      element.getAttribute("data-id"),\n      typeof element.getAttribute("data-id"),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.getAttribute()",
          explanation:
            "Returns an attribute’s stored string value or null if absent.",
          note: "An existing empty attribute returns an empty string, which differs from null. Relative href attributes remain relative in getAttribute.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute",
          examples: [
            {
              label: "Read classes and a data attribute",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <div class="btn btn-primary" data-user-id="12345"></div>\n  <script>\n    const element = document.querySelector("div");\n    console.log(\n      element.getAttribute("class"),\n      element.getAttribute("data-user-id"),\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label:
                "Read literal link text and distinguish empty from missing",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <a href="/guide" data-empty="">Guide</a>\n  <script>\n    const link = document.querySelector("a");\n    console.log(\n      link.getAttribute("href"),\n      link.getAttribute("data-empty"),\n      link.getAttribute("missing"),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Boolean HTML attributes",
          explanation:
            "Enables a boolean attribute by its presence rather than its text value.",
          note: "disabled, required, and checked are boolean attributes; aria-* attributes have different string semantics. A checked attribute expresses the default state, which can diverge from current checked state.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute",
          examples: [
            {
              label:
                "Presence enables disabled even with a false-looking string",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <button>Send</button>\n  <script>\n    const button = document.querySelector("button");\n    button.setAttribute("disabled", "false");\n    console.log(button.disabled, button.hasAttribute("disabled"));\n    button.removeAttribute("disabled");\n    console.log(button.disabled);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Set required and an initial checked state",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <input id="text" /><input id="check" type="checkbox" />\n  <script>\n    const input = document.querySelector("#text"),\n      checkbox = document.querySelector("#check");\n    input.setAttribute("required", "");\n    checkbox.setAttribute("checked", "");\n    console.log(input.required, checkbox.defaultChecked, checkbox.checked);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.removeAttribute()",
          explanation: "Removes an attribute by name.",
          note: "Removing a missing attribute is a no-op. Removing an attribute need not reset every corresponding live property after its state has diverged.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute",
          examples: [
            {
              label: "Remove disabled and a data attribute",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <button disabled data-id="123">Send</button>\n  <script>\n    const element = document.querySelector("button");\n    element.removeAttribute("disabled");\n    element.removeAttribute("data-id");\n    console.log(element.disabled, element.getAttribute("data-id"));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Remove classes and tolerate a missing attribute",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <div class="card"></div>\n  <script>\n    const element = document.querySelector("div");\n    element.removeAttribute("class");\n    element.removeAttribute("missing");\n    console.log(element.className, element.hasAttribute("class"));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.hasAttribute()",
          explanation: "Checks whether an attribute is present.",
          note: "This checks attribute presence, not truthiness or the effective live state of a form control.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/hasAttribute",
          examples: [
            {
              label: "Read a present data attribute",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <div data-id="123"></div>\n  <script>\n    const element = document.querySelector("div");\n    if (element.hasAttribute("data-id"))\n      console.log(element.getAttribute("data-id"));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Distinguish an empty attribute from absence",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <button disabled>Send</button>\n  <script>\n    const button = document.querySelector("button");\n    console.log(\n      button.hasAttribute("disabled"),\n      button.getAttribute("disabled"),\n      button.hasAttribute("data-id"),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Direct DOM property access",
          explanation:
            "Reads and writes typed DOM state through properties such as value, disabled, checked, id, and href.",
          note: "Some properties reflect attributes, while live form state can diverge. URL properties can normalize URLs; use getAttribute for the original attribute text.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/value",
          examples: [
            {
              label: "Set element and input properties",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <div></div><input />\n  <script>\n    const element = document.querySelector("div"),\n      input = document.querySelector("input");\n    element.id = "my-id";\n    element.className = "my-class";\n    input.value = "text value";\n    input.disabled = true;\n    console.log(element.id, element.className, input.value, input.disabled);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Read boolean checked state and a normalized link",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <input type="checkbox" /><a>Link</a>\n  <script>\n    const checkbox = document.querySelector("input"),\n      link = document.querySelector("a");\n    checkbox.checked = true;\n    link.href = "https://example.com";\n    console.log(checkbox.checked, typeof checkbox.checked, link.href);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Attributes versus current form properties",
          explanation:
            "Compares a form control’s HTML attributes with its current value or state.",
          note: "Changing a dirty current value or checked state does not necessarily change the corresponding attribute. The input’s state and its default are separate concepts.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/defaultChecked",
          examples: [
            {
              label: "Read an initial attribute and a changed current value",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <input />\n  <script>\n    const input = document.querySelector("input");\n    input.setAttribute("value", "initial");\n    input.value = "current";\n    console.log(input.getAttribute("value"), input.defaultValue, input.value);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Keep a checked default while changing current state",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <input type="checkbox" checked />\n  <script>\n    const checkbox = document.querySelector("input");\n    checkbox.checked = false;\n    console.log(\n      checkbox.hasAttribute("checked"),\n      checkbox.defaultChecked,\n      checkbox.checked,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "HTMLElement.dataset",
          explanation:
            "Exposes data-* attributes as string-valued properties with camel-cased names.",
          note: "data-user-id maps to dataset.userId. Assigned values become strings, including null; delete removes the corresponding attribute. Convert numbers and booleans explicitly when reading.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset",
          examples: [
            {
              label: "Set and read string-valued metadata",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <div></div>\n  <script>\n    const element = document.querySelector("div");\n    element.dataset.userId = "123";\n    element.dataset.userName = "John";\n    element.dataset.isActive = true;\n    console.log(\n      element.getAttribute("data-user-id"),\n      element.dataset.userName,\n      element.dataset.isActive,\n      typeof element.dataset.isActive,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Map kebab-case names and delete metadata",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <div data-user-id="123"></div>\n  <script>\n    const element = document.querySelector("div");\n    element.setAttribute("data-user-age", "25");\n    console.log(element.dataset.userAge, Number(element.dataset.userAge));\n    delete element.dataset.userId;\n    console.log(element.hasAttribute("data-user-id"), element.dataset.userId);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Custom toggleAttribute helper",
          explanation:
            "Adds an empty attribute when absent and removes it when present.",
          note: "This custom helper reproduces the image’s behavior and returns undefined. It is distinct from the built-in Element.toggleAttribute method, which also supports a force parameter and returns a boolean.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/hasAttribute",
          examples: [
            {
              label: "Toggle a disabled button twice",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <button>Send</button>\n  <script>\n    function toggleAttribute(element, attr) {\n      if (element.hasAttribute(attr)) element.removeAttribute(attr);\n      else element.setAttribute(attr, "");\n    }\n    const button = document.querySelector("button");\n    toggleAttribute(button, "disabled");\n    console.log(button.disabled);\n    toggleAttribute(button, "disabled");\n    console.log(button.disabled);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Toggle metadata presence",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <div data-active="yes"></div>\n  <script>\n    function toggleAttribute(element, attr) {\n      if (element.hasAttribute(attr)) element.removeAttribute(attr);\n      else element.setAttribute(attr, "");\n    }\n    const element = document.querySelector("div");\n    toggleAttribute(element, "data-active");\n    console.log(element.hasAttribute("data-active"));\n    toggleAttribute(element, "data-active");\n    console.log(element.getAttribute("data-active"));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.attributes",
          explanation:
            "Returns the element’s attributes as a list that updates when they change.",
          note: "The collection is not an ordinary array. Avoid depending on attribute order when order is not part of your application’s contract; the examples sort output for deterministic inspection.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes",
          examples: [
            {
              label: "Enumerate attribute names and values",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <div id="card" class="active" data-id="123"></div>\n  <script>\n    const element = document.querySelector("div");\n    for (const attr of [...element.attributes].sort((a, b) =>\n      a.name.localeCompare(b.name),\n    ))\n      console.log(`${attr.name}: ${attr.value}`);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Observe that the attribute map is live",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <div id="card"></div>\n  <script>\n    const element = document.querySelector("div");\n    const attributes = element.attributes;\n    console.log(attributes.length);\n    element.setAttribute("data-id", "123");\n    console.log(attributes.length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Copy attributes between elements",
          explanation:
            "Copies attribute names and values from one element to another.",
          note: "This custom helper overwrites matching attributes but keeps unrelated target attributes. It does not copy live form state or listeners. Copy only intended attributes from a trusted source, and avoid duplicate IDs when both elements remain in the same document.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes",
          examples: [
            {
              label:
                "Copy metadata while retaining unrelated target attributes",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <div id="source" class="card" data-id="123"></div\n  ><div id="target" title="Keep"></div>\n  <script>\n    function copyAttributes(source, target) {\n      for (const attr of source.attributes)\n        target.setAttribute(attr.name, attr.value);\n    }\n    const source = document.querySelector("#source"),\n      target = document.querySelector("#target");\n    copyAttributes(source, target);\n    target.id = "target";\n    console.log(target.className, target.dataset.id, target.title);\n  </script></body\n>',
                },
              ],
            },
            {
              label:
                "Copy default value attributes without copying a dirty value",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modifying elements example</title>\n<body>\n  <input id="source" value="initial" /><input id="target" />\n  <script>\n    function copyAttributes(source, target) {\n      for (const attr of source.attributes)\n        target.setAttribute(attr.name, attr.value);\n    }\n    const source = document.querySelector("#source"),\n      target = document.querySelector("#target");\n    source.value = "current";\n    copyAttributes(source, target);\n    target.id = "target";\n    console.log(source.value, target.getAttribute("value"), target.value);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Styling & Classes",
      id: "styling-classes",
      intro:
        "classList Methods → className and class utilities → practical class patterns → Inline Styles. Every example is a complete independent HTML file. Tests verify class return values, rendered and pseudo-element styles, unit handling, CSS custom properties, and transition target declarations without relying on exact animation timing.",
      methods: [
        {
          name: "classList.add()",
          explanation: "Adds classes without removing existing ones.",
          note: "Returns undefined, so it is not chainable. Each token must be nonempty and contain no whitespace; pass multiple classes as separate arguments.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/add",
          examples: [
            {
              label: "Add one and then several classes",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div class="card"></div>\n  <script>\n    const element = document.querySelector("div");\n    element.classList.add("active");\n    element.classList.add("btn", "btn-primary", "large");\n    console.log(element.className);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Avoid duplicate class tokens",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div class="active"></div>\n  <script>\n    const element = document.querySelector("div");\n    console.log(element.classList.add("active"), element.classList.length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "classList.remove()",
          explanation: "Removes classes without changing the others.",
          note: "Returns undefined. Removing a class that is absent is harmless; add and remove should be separate statements rather than chained.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/remove",
          examples: [
            {
              label: "Remove single and multiple classes",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div class="active btn btn-primary large"></div>\n  <script>\n    const element = document.querySelector("div");\n    element.classList.remove("active");\n    element.classList.remove("btn", "btn-primary");\n    console.log(element.className);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Remove old classes and add new classes separately",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div class="old1 old2 keep"></div>\n  <script>\n    const element = document.querySelector("div");\n    console.log(element.classList.remove("old1", "old2", "missing"));\n    element.classList.add("new1", "new2");\n    console.log(element.className);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "classList.toggle()",
          explanation:
            "Adds or removes a class and returns whether it is now present.",
          note: "Returns a boolean, unlike add/remove. A true force ensures presence and a false force ensures absence rather than toggling blindly.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle",
          examples: [
            {
              label: "Toggle membership twice",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div></div>\n  <script>\n    const element = document.querySelector("div");\n    console.log(element.classList.toggle("visible"));\n    console.log(element.classList.toggle("visible"));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Set membership from a condition",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div></div>\n  <script>\n    const element = document.querySelector("div");\n    const isLoggedIn = true;\n    element.classList.toggle("authenticated", isLoggedIn);\n    element.classList.toggle("authenticated", isLoggedIn);\n    console.log(element.className);\n    console.log(element.classList.toggle("authenticated", false));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "classList.contains()",
          explanation: "Checks whether an element has a class.",
          note: "Pass a token without the CSS selector dot. The result is a boolean and class matching is case-sensitive.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/contains",
          examples: [
            {
              label: "Branch on an active class",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div class="active"></div>\n  <script>\n    const element = document.querySelector("div");\n    if (element.classList.contains("active")) console.log("Element is active");\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Distinguish token names from selectors",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div class="active"></div>\n  <script>\n    const element = document.querySelector("div");\n    console.log(\n      element.classList.contains("active"),\n      element.classList.contains(".active"),\n      element.classList.contains("Active"),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "classList.replace()",
          explanation:
            "Replaces a class and returns whether the old class was found.",
          note: "Returns false if the old class is absent and true if replaced. It does not add the new token when the old one is missing.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/replace",
          examples: [
            {
              label: "Replace a button variant",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <button class="btn btn-primary">Save</button>\n  <script>\n    const element = document.querySelector("button");\n    console.log(\n      element.classList.replace("btn-primary", "btn-secondary"),\n      element.className,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Observe a missing old class",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div class="card"></div>\n  <script>\n    const element = document.querySelector("div");\n    console.log(\n      element.classList.replace("old-class", "new-class"),\n      element.className,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.className",
          explanation:
            "Reads or replaces an HTML element’s class attribute as a string.",
          note: "Replacing className discards previous classes. String concatenation is an older approach that can introduce duplicates; classList is better for token operations. SVG className has different historical behavior.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/className",
          examples: [
            {
              label: "Read and replace the full class string",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div class="class1 class2 class3"></div>\n  <script>\n    const element = document.querySelector("div");\n    console.log(element.className);\n    element.className = "new-class another-class";\n    console.log(element.className);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Append a string and clear all classes",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div class="card"></div>\n  <script>\n    const element = document.querySelector("div");\n    element.className += " additional-class";\n    console.log(element.className);\n    element.className = "";\n    console.log(element.classList.length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "classList.length and indexed access",
          explanation:
            "Reads the number of class tokens and a token at an indexed position.",
          note: "classList is live and uses zero-based indices. An out-of-range bracket lookup returns undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/classList",
          examples: [
            {
              label: "Read a count and first class",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div class="card active large"></div>\n  <script>\n    const element = document.querySelector("div");\n    console.log(element.classList.length, element.classList[0]);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Observe live changes and a missing index",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div class="card"></div>\n  <script>\n    const list = document.querySelector("div").classList;\n    list.add("active");\n    console.log(list.length, list[1], list[5]);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "classList.forEach()",
          explanation: "Runs a function for each class on an element.",
          note: "The list is live; take a snapshot first if mutations would shift membership during iteration.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/forEach",
          examples: [
            {
              label: "Visit each token",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div class="card active"></div>\n  <script>\n    document\n      .querySelector("div")\n      .classList.forEach((className) => console.log(className));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Read token indices during iteration",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div class="small rounded"></div>\n  <script>\n    document\n      .querySelector("div")\n      .classList.forEach((token, index) => console.log(index, token));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Convert classList to an array",
          explanation: "Copies an element’s classes into an array.",
          note: "The snapshot does not update when the element’s classes change.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/classList",
          examples: [
            {
              label: "Create an array snapshot",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div class="card active"></div>\n  <script>\n    const element = document.querySelector("div");\n    const classArray = [...element.classList];\n    element.classList.add("large");\n    console.log(\n      Array.isArray(classArray),\n      ...classArray,\n      element.classList.length,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Remove prefixed classes through a snapshot",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div class="state-loading state-old card"></div>\n  <script>\n    const element = document.querySelector("div");\n    [...element.classList]\n      .filter((token) => token.startsWith("state-"))\n      .forEach((token) => element.classList.remove(token));\n    console.log(element.className);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Apply classes to multiple elements",
          explanation:
            "Iterates selected elements and updates each class list.",
          note: "querySelectorAll returns a static NodeList, so removing its selector class during iteration does not change that snapshot.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/classList",
          examples: [
            {
              label: "Mark selected items as processed",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <p class="item">A</p><p class="item">B</p>\n  <script>\n    document\n      .querySelectorAll(".item")\n      .forEach((item) => item.classList.add("processed"));\n    console.log(document.querySelectorAll(".item.processed").length);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Apply a class only to matching elements",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <p class="item" data-ready="yes">A</p><p class="item">B</p>\n  <script>\n    document\n      .querySelectorAll(".item")\n      .forEach((item) =>\n        item.classList.toggle("ready", item.dataset.ready === "yes"),\n      );\n    console.log(document.querySelectorAll(".ready").length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Conditional button state classes",
          explanation:
            "Removes mutually exclusive state classes before applying a selected state.",
          note: "The custom helper validates the state before removing existing classes. Unrelated base classes are preserved.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/classList",
          examples: [
            {
              label: "Move from loading to success",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <button class="btn loading">Save</button>\n  <script>\n    function updateButton(button, state) {\n      if (!["loading", "success", "error"].includes(state))\n        throw new RangeError("Unknown state");\n      button.classList.remove("loading", "success", "error");\n      button.classList.add(state);\n    }\n    const button = document.querySelector("button");\n    updateButton(button, "success");\n    console.log(button.className);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Reject an unsupported state without changing classes",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <button class="btn loading">Save</button>\n  <script>\n    function updateButton(button, state) {\n      if (!["loading", "success", "error"].includes(state))\n        throw new RangeError("Unknown state");\n      button.classList.remove("loading", "success", "error");\n      button.classList.add(state);\n    }\n    const button = document.querySelector("button");\n    try {\n      updateButton(button, "unknown");\n    } catch (error) {\n      console.log(error.name, button.className);\n    }\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Toggle a menu with classes",
          explanation:
            "Updates menu and button classes in response to a click.",
          note: "The example also synchronizes aria-expanded. CSS determines visibility; the initial button state is chosen to match the closed menu.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle",
          examples: [
            {
              label: "Open a menu from a button click",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <style>\n    .menu {\n      display: none;\n    }\n    .menu.open {\n      display: block;\n    }</style\n  ><button class="menu-toggle" aria-expanded="false">Menu</button\n  ><nav class="menu">Links</nav>\n  <script>\n    const menu = document.querySelector(".menu"),\n      toggleBtn = document.querySelector(".menu-toggle");\n    toggleBtn.addEventListener("click", () => {\n      const open = menu.classList.toggle("open");\n      toggleBtn.classList.toggle("active", open);\n      toggleBtn.setAttribute("aria-expanded", String(open));\n    });\n    toggleBtn.click();\n    console.log(\n      menu.classList.contains("open"),\n      toggleBtn.classList.contains("active"),\n      toggleBtn.getAttribute("aria-expanded"),\n      getComputedStyle(menu).display,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Close a menu after a second click",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <button class="menu-toggle" aria-expanded="false">Menu</button\n  ><nav class="menu">Links</nav>\n  <script>\n    const menu = document.querySelector(".menu"),\n      toggleBtn = document.querySelector(".menu-toggle");\n    toggleBtn.addEventListener("click", () => {\n      const open = menu.classList.toggle("open");\n      toggleBtn.classList.toggle("active", open);\n      toggleBtn.setAttribute("aria-expanded", String(open));\n    });\n    toggleBtn.click();\n    toggleBtn.click();\n    console.log(\n      menu.classList.contains("open"),\n      toggleBtn.classList.contains("active"),\n      toggleBtn.getAttribute("aria-expanded"),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Add a class after a delay",
          explanation: "Schedules a class change with a timer.",
          note: "A timer is not an exact deadline and does not guarantee an initial paint for a CSS transition. Cancel obsolete timers during component cleanup.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout",
          examples: [
            {
              label: "Apply a delayed fade class",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div class="card"></div>\n  <script>\n    const element = document.querySelector("div");\n    setTimeout(() => {\n      element.classList.add("fade-in");\n      console.log(element.className);\n    }, 10);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Cancel an obsolete class update",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div class="card"></div>\n  <script>\n    const element = document.querySelector("div");\n    const timer = setTimeout(() => element.classList.add("fade-in"), 10);\n    clearTimeout(timer);\n    setTimeout(() => console.log(element.className), 20);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Individual inline style properties",
          explanation:
            "Changes one inline style at a time, such as color or width.",
          note: "element.style reads inline declarations, not all stylesheet effects. Include CSS units for dimensional values that require them.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style",
          examples: [
            {
              label: "Set common camel-cased declarations",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div></div>\n  <script>\n    const element = document.querySelector("div");\n    element.style.color = "red";\n    element.style.backgroundColor = "#f0f0f0";\n    element.style.fontSize = "16px";\n    element.style.marginTop = "20px";\n    element.style.borderRadius = "5px";\n    element.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";\n    console.log(\n      element.style.color,\n      element.style.backgroundColor,\n      element.style.fontSize,\n      element.style.marginTop,\n      element.style.borderRadius,\n      element.style.boxShadow !== "",\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Update a single declaration without clearing another",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div style="padding: 10px"></div>\n  <script>\n    const element = document.querySelector("div");\n    element.style.color = "blue";\n    console.log(element.style.padding, element.style.color);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "style.setProperty()",
          explanation:
            "Sets an inline declaration using a CSS property name and an optional priority.",
          note: "Pass important as the separate priority argument, not as part of the value. Ordinary direct property assignment does not accept a value containing !important.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty",
          examples: [
            {
              label: "Set kebab-case and a custom property",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div></div>\n  <script>\n    const element = document.querySelector("div");\n    element.style.setProperty("background-color", "#f0f0f0");\n    element.style.setProperty("font-size", "16px");\n    element.style.setProperty("--custom-property", "value");\n    console.log(\n      element.style.backgroundColor,\n      element.style.fontSize,\n      element.style.getPropertyValue("--custom-property"),\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Set an important priority",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div></div>\n  <script>\n    const element = document.querySelector("div");\n    element.style.setProperty("color", "red", "important");\n    console.log(\n      element.style.color,\n      element.style.getPropertyPriority("color"),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Object.assign(element.style, styles)",
          explanation:
            "Assigns several supported inline style properties from an object.",
          note: "It updates the specified properties without replacing unrelated inline declarations. It does not provide a priority argument for !important.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style",
          examples: [
            {
              label: "Set text styles together",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div></div>\n  <script>\n    const element = document.querySelector("div");\n    Object.assign(element.style, {\n      color: "blue",\n      fontSize: "20px",\n      margin: "10px",\n    });\n    console.log(\n      element.style.color,\n      element.style.fontSize,\n      element.style.margin,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Set dimensions and retain an existing color",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div style="color: red"></div>\n  <script>\n    const element = document.querySelector("div");\n    Object.assign(element.style, {\n      width: "200px",\n      height: "100px",\n      padding: "10px",\n      border: "1px solid #ccc",\n    });\n    console.log(\n      element.style.width,\n      element.style.height,\n      element.style.padding,\n      element.style.borderWidth,\n      element.style.color,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "style.cssText",
          explanation: "Reads or replaces all inline styles as text.",
          note: "Assignment replaces existing inline declarations. Concatenation reparses the declaration string; individual property updates are usually clearer when preserving existing state matters.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/cssText",
          examples: [
            {
              label: "Replace all inline declarations",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div style="padding: 5px"></div>\n  <script>\n    const element = document.querySelector("div");\n    element.style.cssText = "color: red; font-size: 20px; margin: 10px;";\n    console.log(\n      element.style.color,\n      element.style.fontSize,\n      element.style.margin,\n      element.style.padding,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Append a declaration to cssText",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div style="color: red"></div>\n  <script>\n    const element = document.querySelector("div");\n    element.style.cssText += "border: 1px solid black;";\n    console.log(\n      element.style.color,\n      element.style.borderWidth,\n      element.style.borderStyle,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Remove a style with an empty string",
          explanation:
            "Clears a particular inline declaration by assigning an empty string.",
          note: "Clearing an inline declaration does not remove the property from applicable stylesheets.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style",
          examples: [
            {
              label: "Clear individual inline declarations",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div style="color: red; background-color: blue"></div>\n  <script>\n    const element = document.querySelector("div");\n    element.style.color = "";\n    element.style.backgroundColor = "";\n    console.log(element.style.color, element.style.backgroundColor);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Reveal a stylesheet declaration",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <style>\n    .card {\n      color: rgb(0, 128, 0);\n    }</style\n  ><div class="card" style="color: red"></div>\n  <script>\n    const element = document.querySelector("div");\n    element.style.color = "";\n    console.log(element.style.color, getComputedStyle(element).color);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "style.removeProperty()",
          explanation:
            "Removes an inline declaration by its CSS property name and returns its previous value.",
          note: "The removal affects inline style only; another declaration can still supply the computed result.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/removeProperty",
          examples: [
            {
              label: "Remove a color and background declaration",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div style="color: red; background-color: blue"></div>\n  <script>\n    const element = document.querySelector("div");\n    console.log(element.style.removeProperty("color"));\n    element.style.removeProperty("background-color");\n    console.log(element.style.color, element.style.backgroundColor);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Remove a custom property",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div style="--spacing: 20px"></div>\n  <script>\n    const element = document.querySelector("div");\n    console.log(\n      element.style.removeProperty("--spacing"),\n      element.style.getPropertyValue("--spacing"),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Clear all inline styles",
          explanation: "Removes every inline style from an element.",
          note: "Empty cssText can leave an empty style attribute; removeAttribute removes the attribute itself. Neither removes class-based CSS.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute",
          examples: [
            {
              label: "Clear declarations through cssText",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div style="color: red; padding: 10px"></div>\n  <script>\n    const element = document.querySelector("div");\n    element.style.cssText = "";\n    console.log(element.style.length, element.getAttribute("style"));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Remove the style attribute",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <style>\n    .card {\n      color: rgb(0, 0, 255);\n    }</style\n  ><div class="card" style="color: red"></div>\n  <script>\n    const element = document.querySelector("div");\n    element.removeAttribute("style");\n    console.log(element.hasAttribute("style"), getComputedStyle(element).color);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "getComputedStyle() and getPropertyValue()",
          explanation:
            "Reads the style values the browser applies, including styles from CSS rules.",
          note: "Computed-style reads can trigger style or layout work. Returned values can be normalized or resolved differently from authored CSS, and the returned object is read-only.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle",
          examples: [
            {
              label: "Compare inline and stylesheet values",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <style>\n    .card {\n      color: rgb(0, 128, 0);\n      font-size: 18px;\n      margin: 12px;\n    }</style\n  ><div class="card"></div>\n  <script>\n    const element = document.querySelector("div");\n    const computed = window.getComputedStyle(element);\n    console.log(\n      element.style.color,\n      computed.color,\n      computed.fontSize,\n      computed.getPropertyValue("margin"),\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Read a winning inline declaration",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <style>\n    .card {\n      color: green;\n    }</style\n  ><div class="card" style="color: blue"></div>\n  <script>\n    const element = document.querySelector("div");\n    const styles = window.getComputedStyle(element);\n    console.log(element.style.color, styles.getPropertyValue("color"));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Read pseudo-element styles",
          explanation:
            "Uses getComputedStyle with a pseudo-element argument to inspect generated content styling.",
          note: "CSS content values include their CSS serialization, often with quotes. The result is read-only.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle",
          examples: [
            {
              label: "Read ::before generated content",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <style>\n    .card::before {\n      content: "Label";\n      color: rgb(255, 0, 0);\n    }</style\n  ><div class="card"></div>\n  <script>\n    const before = window.getComputedStyle(\n      document.querySelector("div"),\n      "::before",\n    );\n    console.log(before.getPropertyValue("content"), before.color);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Read ::after generated content",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <style>\n    .card::after {\n      content: "Done";\n      font-size: 14px;\n    }</style\n  ><div class="card"></div>\n  <script>\n    const after = window.getComputedStyle(\n      document.querySelector("div"),\n      "::after",\n    );\n    console.log(after.content, after.fontSize);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "CSS units in style values",
          explanation:
            "Supplies valid CSS units for dimensional declarations such as width and height.",
          note: "The screenshot’s rule has exceptions: zero lengths and unitless properties such as opacity accept unitless values. A nonzero width assigned as 200 becomes an invalid unitless CSS length in standards mode.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style",
          examples: [
            {
              label: "Distinguish dimensional values from unitless properties",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div></div>\n  <script>\n    const element = document.querySelector("div");\n    element.style.width = 200;\n    console.log(element.style.width);\n    element.style.width = "200px";\n    element.style.height = "100px";\n    element.style.opacity = 0.5;\n    console.log(\n      element.style.width,\n      element.style.height,\n      element.style.opacity,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Preserve explicitly authored relative units",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div></div>\n  <script>\n    const element = document.querySelector("div");\n    element.style.width = "50%";\n    element.style.height = "10vh";\n    element.style.fontSize = "2rem";\n    console.log(\n      element.style.width,\n      element.style.height,\n      element.style.fontSize,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Calculate and update a pixel width",
          explanation:
            "Parses a resolved pixel width, computes a new value, and writes a CSS length.",
          note: "Use parseFloat when fractional pixels matter. Check for a finite numeric result; authored values such as auto are not numeric lengths. Reads followed by writes can cause layout work, so avoid repeated interleaving in large loops.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle",
          examples: [
            {
              label: "Retain fractional pixels while increasing a width",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div style="width: 200.5px"></div>\n  <script>\n    const element = document.querySelector("div");\n    const currentWidth = parseFloat(getComputedStyle(element).width);\n    if (Number.isFinite(currentWidth))\n      element.style.width = `${currentWidth + 50}px`;\n    console.log(element.style.width);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Handle a non-numeric authored width",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div style="width: auto"></div>\n  <script>\n    const element = document.querySelector("div");\n    const authoredWidth = parseFloat(element.style.width);\n    console.log(Number.isFinite(authoredWidth));\n    if (!Number.isFinite(authoredWidth)) element.style.width = "100px";\n    console.log(element.style.width);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "CSS custom properties",
          explanation:
            "Stores reusable CSS values under -- names and consumes them through var().",
          note: "Set and read custom properties with CSS-style names; trim read values when comparing because whitespace can be preserved. Changing a custom property can affect inheriting descendants.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty",
          examples: [
            {
              label: "Set custom colors and spacing and consume them",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div></div>\n  <script>\n    const element = document.querySelector("div");\n    element.style.setProperty("--primary-color", "#007bff");\n    element.style.setProperty("--spacing", "20px");\n    element.style.backgroundColor = "var(--primary-color)";\n    element.style.padding = "var(--spacing)";\n    const computed = getComputedStyle(element);\n    console.log(\n      computed.getPropertyValue("--primary-color").trim(),\n      computed.backgroundColor,\n      computed.padding,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Inherit a custom property from a parent",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <section style="--spacing: 12px"\n    ><div style="padding: var(--spacing)"></div\n  ></section>\n  <script>\n    const parent = document.querySelector("section"),\n      element = document.querySelector("div");\n    parent.style.setProperty("--spacing", "24px");\n    console.log(getComputedStyle(element).padding);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Inline CSS transitions",
          explanation:
            "Defines transition rules before changing animatable styles.",
          note: "A transition needs an established starting style and a later change. These examples explicitly resolve the starting style for demonstration; repeated forced layout reads should not become a general animation loop. They log target declarations rather than assuming the animation has already finished.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style",
          examples: [
            {
              label: "Establish a start style and change a transform",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div style="width: 20px; height: 20px; transform: translateX(0px)"></div>\n  <script>\n    const element = document.querySelector("div");\n    element.style.transition = "transform 0.3s ease";\n    getComputedStyle(element).transform; // establish the starting computed style\n    element.style.transform = "translateX(100px)";\n    console.log(\n      element.style.transitionProperty,\n      element.style.transitionDuration,\n      element.style.transform,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Configure different durations for multiple properties",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Styling and classes example</title>\n<body>\n  <div style="opacity: 1; transform: translateX(0px)"></div>\n  <script>\n    const element = document.querySelector("div");\n    element.style.transition = "opacity 0.3s, transform 0.5s";\n    getComputedStyle(element).opacity;\n    element.style.opacity = "0";\n    element.style.transform = "translateX(20px)";\n    console.log(\n      element.style.transitionProperty,\n      element.style.transitionDuration,\n      element.style.opacity,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "DOM Traversal",
      id: "dom-traversal",
      intro:
        "Parent & Child Navigation → ancestor searches and child operations → Sibling Navigation and practical peer patterns. Every example is an independent complete HTML file. Fixtures make whitespace and comment nodes explicit, and helpers document self-inclusion, ordering, detached elements, and boundary behavior.",
      methods: [
        {
          name: "Node.parentElement",
          explanation:
            "Returns the direct parent when that parent is an Element, otherwise null.",
          note: "Check for null on detached nodes or when the parent is a Document or DocumentFragment. It does not search for a more distant element ancestor.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement",
          examples: [
            {
              label: "Find and update a containing list item",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <ul\n    ><li><a href="#">Link</a></li></ul\n  >\n  <script>\n    const link = document.querySelector("a");\n    const listItem = link.parentElement;\n    if (listItem) listItem.classList.add("has-child");\n    console.log(listItem.tagName, listItem.className);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Handle a detached element",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <script>\n    const element = document.createElement("div");\n    console.log(element.parentElement);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Node.parentNode",
          explanation:
            "Returns the direct parent node of any supported parent type.",
          note: "A Text node cannot contain children, so the image’s suggestion of a text-node parent is incorrect. parentNode can be non-element without being a Text node.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode",
          examples: [
            {
              label: "Compare an element parent with a Document parent",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <section><p>Child</p></section>\n  <script>\n    const child = document.querySelector("p");\n    console.log(child.parentNode === child.parentElement);\n    console.log(\n      document.documentElement.parentNode === document,\n      document.documentElement.parentElement,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Inspect a DocumentFragment parent",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <script>\n    const fragment = document.createDocumentFragment();\n    const element = document.createElement("p");\n    fragment.appendChild(element);\n    console.log(\n      element.parentNode === fragment,\n      element.parentElement,\n      element.parentNode.nodeType,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.children",
          explanation:
            "Returns a live HTMLCollection of direct child elements.",
          note: "It includes element children of any namespace, not only HTML-specific element types. Membership updates when children are added, moved, or removed.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/children",
          examples: [
            {
              label: "Read direct element children",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div id="box"\n    >Text<span>A</span\n    ><!-- comment --><p>B</p></div\n  >\n  <script>\n    const children = document.querySelector("#box").children;\n    console.log(children.length, children[0].tagName, children[1].tagName);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Observe live membership",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div id="box"><p>A</p></div>\n  <script>\n    const element = document.querySelector("#box"),\n      children = element.children;\n    element.appendChild(document.createElement("span"));\n    console.log(children.length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Node.childNodes",
          explanation: "Returns a live NodeList of every direct child node.",
          note: "Formatting whitespace creates text nodes. A NodeList is not necessarily static: childNodes is live, unlike querySelectorAll.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes",
          examples: [
            {
              label: "Include text and comments",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div id="box"\n    >Text<span>A</span\n    ><!--note--></div\n  >\n  <script>\n    const nodes = document.querySelector("#box").childNodes;\n    console.log(nodes.length, ...Array.from(nodes, (node) => node.nodeType));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Count whitespace as a text node",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div id="box"> <span>A</span> </div>\n  <script>\n    const element = document.querySelector("#box");\n    console.log(element.childNodes.length, element.children.length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "firstElementChild and lastElementChild",
          explanation:
            "Returns the first or last direct element child, skipping other node types.",
          note: "Both return null if there are no element children, even when text nodes are present.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/firstElementChild",
          examples: [
            {
              label: "Skip surrounding whitespace",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div id="box"> <span>First</span><p>Last</p> </div>\n  <script>\n    const element = document.querySelector("#box");\n    console.log(\n      element.firstElementChild.textContent,\n      element.lastElementChild.textContent,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Handle a text-only parent",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div id="box">Only text</div>\n  <script>\n    const element = document.querySelector("#box");\n    console.log(element.firstElementChild, element.lastElementChild);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "firstChild and lastChild",
          explanation:
            "Returns the first or last child node regardless of its type.",
          note: "Whitespace can be the first or last node. An empty node returns null for both properties.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/firstChild",
          examples: [
            {
              label: "Read a leading text node and trailing comment",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div id="box"\n    >Text<span>A</span\n    ><!--last--></div\n  >\n  <script>\n    const element = document.querySelector("#box");\n    console.log(\n      element.firstChild.nodeType,\n      element.firstChild.textContent,\n      element.lastChild.nodeType,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Handle an empty parent",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div id="box"></div>\n  <script>\n    const element = document.querySelector("#box");\n    console.log(element.firstChild, element.lastChild);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Node.hasChildNodes()",
          explanation: "Checks whether a node has any direct child nodes.",
          note: "This differs from children.length > 0, which checks for element children only.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/hasChildNodes",
          examples: [
            {
              label: "Recognize text without element children",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div id="box"> </div>\n  <script>\n    const element = document.querySelector("#box");\n    console.log(element.hasChildNodes(), element.children.length > 0);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Distinguish empty from element-containing parents",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div id="empty"></div><div id="full"><span></span></div>\n  <script>\n    console.log(\n      document.querySelector("#empty").hasChildNodes(),\n      document.querySelector("#full").hasChildNodes(),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.childElementCount",
          explanation: "Returns the number of direct element children.",
          note: "It is equivalent to children.length and excludes text, comments, and deeper descendants.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/childElementCount",
          examples: [
            {
              label: "Count direct elements rather than all descendants",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div id="box"\n    >Text<section><span>Nested</span></section\n    ><p>Direct</p></div\n  >\n  <script>\n    console.log(document.querySelector("#box").childElementCount);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Observe an updated count",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div id="box"><p>A</p></div>\n  <script>\n    const element = document.querySelector("#box");\n    element.appendChild(document.createElement("p"));\n    console.log(element.childElementCount, element.children.length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Iterate and filter element children",
          explanation:
            "Uses for...of directly on children or converts it to an array for array methods.",
          note: "Changing a child’s class does not change children membership. Filtering direct children excludes matching nodes nested deeper in the tree.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/children",
          examples: [
            {
              label: "Apply a class with for...of",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div id="box"><p>A</p><span>B</span></div>\n  <script>\n    const element = document.querySelector("#box");\n    for (const child of element.children) child.classList.add("child-element");\n    Array.from(element.children).forEach((child) =>\n      console.log(child.tagName, child.className),\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Filter direct DIV children",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <section id="box"\n    ><div>A</div><article><div>Nested</div></article\n    ><span>B</span></section\n  >\n  <script>\n    const element = document.querySelector("#box");\n    const divChildren = Array.from(element.children).filter(\n      (child) => child.tagName === "DIV",\n    );\n    console.log(divChildren.length, divChildren[0].textContent);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.closest()",
          explanation:
            "Returns the nearest matching element among the element itself and its ancestors.",
          note: "The starting element can match itself. An unmatched valid selector returns null; an invalid CSS selector throws SyntaxError.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/closest",
          examples: [
            {
              label: "Find an enclosing section, form, and article",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <article\n    ><section class="section"\n      ><form><input /></form></section\n  ></article>\n  <script>\n    const input = document.querySelector("input");\n    console.log(\n      input.closest(".section").tagName,\n      input.closest("form").tagName,\n      input.closest("article").tagName,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Include self and handle no match",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div class="section"></div>\n  <script>\n    const element = document.querySelector(".section");\n    console.log(\n      element.closest(".section") === element,\n      element.closest("form"),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Node.contains() and strict descendant checks",
          explanation:
            "Checks whether a node is inside another node, including the container itself.",
          note: "The image’s isDescendantOf helper uses contains alone, which also accepts self. The helper below explicitly excludes self.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/contains",
          examples: [
            {
              label: "Check a nested descendant",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div id="parent"\n    ><section><p id="child">Text</p></section></div\n  >\n  <script>\n    function isDescendantOf(child, parent) {\n      return child !== parent && parent.contains(child);\n    }\n    const parent = document.querySelector("#parent"),\n      child = document.querySelector("#child");\n    console.log(parent.contains(child), isDescendantOf(child, parent));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Distinguish self from a strict descendant",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div id="box"></div>\n  <script>\n    function isDescendantOf(child, parent) {\n      return child !== parent && parent.contains(child);\n    }\n    const element = document.querySelector("#box");\n    console.log(\n      element.contains(element),\n      isDescendantOf(element, element),\n      element.contains(document.createElement("p")),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Walk upward through parentElement",
          explanation:
            "Moves through direct parent elements until a stopping condition is met.",
          note: "This helper starts checking at the parent, while closest includes self. It returns null instead of returning the last ancestor when no match exists.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement",
          examples: [
            {
              label: "Stop at a matching ancestor",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <section class="stop"\n    ><div><p id="start">Start</p></div></section\n  >\n  <script>\n    function findStopAncestor(element) {\n      let current = element;\n      while (current.parentElement) {\n        current = current.parentElement;\n        if (current.classList.contains("stop")) return current;\n      }\n      return null;\n    }\n    console.log(findStopAncestor(document.querySelector("#start")).tagName);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Handle no matching ancestor",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div><p id="start">Start</p></div>\n  <script>\n    function findStopAncestor(element) {\n      let current = element;\n      while (current.parentElement) {\n        current = current.parentElement;\n        if (current.classList.contains("stop")) return current;\n      }\n      return null;\n    }\n    console.log(findStopAncestor(document.querySelector("#start")));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Remove all child nodes",
          explanation:
            "Removes children repeatedly through firstChild or clears the container’s innerHTML.",
          note: "The loop includes text and comment nodes, not only elements. Removed nodes retain their own listeners if references are kept, but they are no longer part of the displayed subtree.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild",
          examples: [
            {
              label: "Remove every node type in a loop",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div id="box"\n    >Text<span>A</span\n    ><!--comment--></div\n  >\n  <script>\n    const element = document.querySelector("#box");\n    while (element.firstChild) element.removeChild(element.firstChild);\n    console.log(element.hasChildNodes(), element.isConnected);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Clear a container with an empty HTML string",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div id="box"><p>A</p><p>B</p></div>\n  <script>\n    const element = document.querySelector("#box");\n    element.innerHTML = "";\n    console.log(element.childNodes.length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Clone children into another element",
          explanation:
            "Copies each direct element child into a target container.",
          note: "children excludes direct text and comment nodes. Deep cloning includes each selected element’s descendants, but not addEventListener listeners; inserted copies need unique IDs if the originals have them.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode",
          examples: [
            {
              label: "Copy direct element children",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div class="source"><p>A</p><span>B</span></div\n  ><div class="target"></div>\n  <script>\n    const source = document.querySelector(".source"),\n      target = document.querySelector(".target");\n    Array.from(source.children).forEach((child) =>\n      target.appendChild(child.cloneNode(true)),\n    );\n    console.log(\n      source.children.length,\n      target.children.length,\n      target.firstElementChild.textContent,\n      source.firstElementChild === target.firstElementChild,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Preserve source content while editing a copied child",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div class="source"\n    ><p><strong>Original</strong></p></div\n  ><div class="target"></div>\n  <script>\n    const source = document.querySelector(".source"),\n      target = document.querySelector(".target");\n    Array.from(source.children).forEach((child) =>\n      target.appendChild(child.cloneNode(true)),\n    );\n    target.querySelector("strong").textContent = "Copy";\n    console.log(\n      source.querySelector("strong").textContent,\n      target.querySelector("strong").textContent,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Find a specific direct child",
          explanation:
            "Converts children to an array and selects the first element matching a predicate.",
          note: "Array.find returns undefined when there is no match. This does not search deeper descendants.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/children",
          examples: [
            {
              label: "Find a direct child by data-id",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div id="box"><p data-id="1">A</p><p data-id="123">B</p></div>\n  <script>\n    const parent = document.querySelector("#box");\n    const specificChild = Array.from(parent.children).find(\n      (child) => child.dataset.id === "123",\n    );\n    console.log(specificChild.textContent);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Exclude matching nested descendants",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div id="box"\n    ><section><p data-id="123">Nested</p></section></div\n  >\n  <script>\n    const parent = document.querySelector("#box");\n    console.log(\n      Array.from(parent.children).find((child) => child.dataset.id === "123"),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "nextElementSibling and nextSibling",
          explanation:
            "Navigates to the next sibling element or the next sibling node of any type.",
          note: "Both return null at their respective boundaries. nextSibling can be a text or comment node even when another element follows.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/nextElementSibling",
          examples: [
            {
              label: "Move to the next element and update it",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <section><p id="start">A</p> <p>B</p></section>\n  <script>\n    const element = document.querySelector("#start");\n    const next = element.nextElementSibling;\n    if (next) next.classList.add("next");\n    console.log(next.textContent, next.className, element.nextSibling.nodeType);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Handle the last sibling",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <section><p id="last">Only</p></section>\n  <script>\n    const element = document.querySelector("#last");\n    console.log(element.nextElementSibling, element.nextSibling);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Collect following element siblings",
          explanation:
            "Walks through nextElementSibling links and collects every later element sibling.",
          note: "The result is a new array in document order and excludes the starting element and non-element nodes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/nextElementSibling",
          examples: [
            {
              label: "Collect later elements in order",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <section\n    ><p id="start">A</p> <p>B</p\n    ><!--gap--><p>C</p></section\n  >\n  <script>\n    function getNextSiblings(element) {\n      const siblings = [];\n      let sibling = element.nextElementSibling;\n      while (sibling) {\n        siblings.push(sibling);\n        sibling = sibling.nextElementSibling;\n      }\n      return siblings;\n    }\n    console.log(\n      ...getNextSiblings(document.querySelector("#start")).map(\n        (element) => element.textContent,\n      ),\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Return an empty array at the boundary",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <section><p id="last">A</p></section>\n  <script>\n    function getNextSiblings(element) {\n      const siblings = [];\n      let sibling = element.nextElementSibling;\n      while (sibling) {\n        siblings.push(sibling);\n        sibling = sibling.nextElementSibling;\n      }\n      return siblings;\n    }\n    console.log(getNextSiblings(document.querySelector("#last")).length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "previousElementSibling and previousSibling",
          explanation:
            "Navigates to the preceding element sibling or preceding node of any type.",
          note: "The element form skips text and comments, while previousSibling preserves them. Both return null when no corresponding sibling exists.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling",
          examples: [
            {
              label: "Move to the previous element and update it",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <section><p>A</p> <p id="current">B</p></section>\n  <script>\n    const element = document.querySelector("#current"),\n      prev = element.previousElementSibling;\n    if (prev) prev.classList.add("previous");\n    console.log(\n      prev.textContent,\n      prev.className,\n      element.previousSibling.nodeType,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Handle the first sibling",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <section><p id="first">Only</p></section>\n  <script>\n    const element = document.querySelector("#first");\n    console.log(element.previousElementSibling, element.previousSibling);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Collect preceding element siblings",
          explanation:
            "Walks backward through previousElementSibling and returns preceding elements.",
          note: "Reversing the collected array restores document order; without reverse, the nearest previous element would be first.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling",
          examples: [
            {
              label: "Return preceding siblings in document order",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <section><p>A</p><p>B</p> <p id="current">C</p></section>\n  <script>\n    function getPreviousSiblings(element) {\n      const siblings = [];\n      let sibling = element.previousElementSibling;\n      while (sibling) {\n        siblings.push(sibling);\n        sibling = sibling.previousElementSibling;\n      }\n      return siblings.reverse();\n    }\n    console.log(\n      ...getPreviousSiblings(document.querySelector("#current")).map(\n        (element) => element.textContent,\n      ),\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Return an empty array for the first element",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <section><p id="first">A</p></section>\n  <script>\n    function getPreviousSiblings(element) {\n      const siblings = [];\n      let sibling = element.previousElementSibling;\n      while (sibling) {\n        siblings.push(sibling);\n        sibling = sibling.previousElementSibling;\n      }\n      return siblings.reverse();\n    }\n    console.log(getPreviousSiblings(document.querySelector("#first")).length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Collect siblings excluding self",
          explanation: "Returns other element children of the same parent.",
          note: "This guarded helper returns an empty array for a parentless element and also supports a DocumentFragment parent through parentNode.children. It excludes non-element nodes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode",
          examples: [
            {
              label: "Collect peers around a middle item",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <section><p>A</p><p id="current">B</p><p>C</p></section>\n  <script>\n    function getSiblings(element) {\n      return Array.from(element.parentNode?.children ?? []).filter(\n        (child) => child !== element,\n      );\n    }\n    console.log(\n      ...getSiblings(document.querySelector("#current")).map(\n        (element) => element.textContent,\n      ),\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Handle an element without a parent",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <script>\n    function getSiblings(element) {\n      return Array.from(element.parentNode?.children ?? []).filter(\n        (child) => child !== element,\n      );\n    }\n    console.log(getSiblings(document.createElement("p")).length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Collect the complete sibling group",
          explanation:
            "Returns all element children of the current element’s parent, including the current element.",
          note: "The helper returns an array in document order. Parentless elements have no containing sibling group and return an empty array.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode",
          examples: [
            {
              label: "Include the current element in its group",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <section><p>A</p><p id="current">B</p><p>C</p></section>\n  <script>\n    function getAllSiblings(element) {\n      return Array.from(element.parentNode?.children ?? []);\n    }\n    const element = document.querySelector("#current"),\n      group = getAllSiblings(element);\n    console.log(group.length, group.includes(element));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Support a fragment sibling group",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <script>\n    function getAllSiblings(element) {\n      return Array.from(element.parentNode?.children ?? []);\n    }\n    const fragment = document.createDocumentFragment();\n    const first = document.createElement("p"),\n      second = document.createElement("p");\n    fragment.append(first, second);\n    console.log(getAllSiblings(first).length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Activate one sibling tab",
          explanation:
            "Removes an active class from sibling tab controls and applies it to the clicked control.",
          note: "This demonstrates class-based selection, not a complete accessible tab widget with keyboard behavior and panels. It filters sibling tabs so unrelated sibling states remain untouched.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/nextElementSibling",
          examples: [
            {
              label: "Activate the clicked peer",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div id="tabs"\n    ><button class="tab active">A</button><button class="tab">B</button\n    ><button class="tab">C</button></div\n  >\n  <script>\n    function getSiblings(element) {\n      return Array.from(element.parentNode?.children ?? []).filter(\n        (child) => child !== element,\n      );\n    }\n    document.querySelectorAll(".tab").forEach((tab) => {\n      tab.addEventListener("click", () => {\n        getSiblings(tab)\n          .filter((sibling) => sibling.matches(".tab"))\n          .forEach((sibling) => sibling.classList.remove("active"));\n        tab.classList.add("active");\n      });\n    });\n    document.querySelectorAll(".tab")[1].click();\n    console.log(\n      document.querySelector(".tab.active").textContent,\n      document.querySelectorAll(".tab.active").length,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Keep another group unchanged",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div><button class="tab active">A</button><button class="tab">B</button></div\n  ><div><button class="tab active">Other</button></div>\n  <script>\n    function getSiblings(element) {\n      return Array.from(element.parentNode?.children ?? []).filter(\n        (child) => child !== element,\n      );\n    }\n    document.querySelectorAll(".tab").forEach((tab) => {\n      tab.addEventListener("click", () => {\n        getSiblings(tab)\n          .filter((sibling) => sibling.matches(".tab"))\n          .forEach((sibling) => sibling.classList.remove("active"));\n        tab.classList.add("active");\n      });\n    });\n    document.querySelectorAll(".tab")[1].click();\n    console.log(\n      ...Array.from(\n        document.querySelectorAll(".tab.active"),\n        (tab) => tab.textContent,\n      ),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Find a sibling matching a selector",
          explanation:
            "Selects the first sibling element that matches a CSS selector.",
          note: "The helper searches document-order siblings and returns undefined if no match exists. It excludes self and does not search inside siblings.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/matches",
          examples: [
            {
              label: "Find a matching peer",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <section><p id="current">A</p><p class="target">B</p><p>C</p></section>\n  <script>\n    function getSiblings(element) {\n      return Array.from(element.parentNode?.children ?? []).filter(\n        (child) => child !== element,\n      );\n    }\n    function findSibling(element, selector) {\n      return getSiblings(element).find((sibling) => sibling.matches(selector));\n    }\n    console.log(\n      findSibling(document.querySelector("#current"), ".target").textContent,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Do not match self",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <section><p id="current" class="target">A</p><p>B</p></section>\n  <script>\n    function getSiblings(element) {\n      return Array.from(element.parentNode?.children ?? []).filter(\n        (child) => child !== element,\n      );\n    }\n    function findSibling(element, selector) {\n      return getSiblings(element).find((sibling) => sibling.matches(selector));\n    }\n    console.log(findSibling(document.querySelector("#current"), ".target"));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Navigate a carousel with sibling links",
          explanation:
            "Advances to the next element and wraps from the last item to the first.",
          note: "The example assumes one active slide initially and no non-slide element children. A detached current slide returns null; a single-slide carousel stays on its only slide.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/nextElementSibling",
          examples: [
            {
              label: "Advance and wrap",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div id="slides"><p class="active">A</p><p>B</p></div>\n  <script>\n    function showNext(currentSlide) {\n      const parent = currentSlide.parentElement;\n      if (!parent) return null;\n      const next = currentSlide.nextElementSibling || parent.firstElementChild;\n      currentSlide.classList.remove("active");\n      next.classList.add("active");\n      return next;\n    }\n    let current = document.querySelector(".active");\n    current = showNext(current);\n    console.log(current.textContent);\n    current = showNext(current);\n    console.log(\n      current.textContent,\n      document.querySelectorAll("#slides .active").length,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Handle a one-slide container",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <div id="slides"><p class="active">Only</p></div>\n  <script>\n    function showNext(currentSlide) {\n      const parent = currentSlide.parentElement;\n      if (!parent) return null;\n      const next = currentSlide.nextElementSibling || parent.firstElementChild;\n      currentSlide.classList.remove("active");\n      next.classList.add("active");\n      return next;\n    }\n    const current = document.querySelector(".active");\n    console.log(\n      showNext(current) === current,\n      current.classList.contains("active"),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Find an element’s sibling index",
          explanation:
            "Returns the element’s zero-based index among its parent’s element children.",
          note: "Text and comment nodes do not count. The guarded helper returns -1 for a parentless element.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/children",
          examples: [
            {
              label: "Ignore whitespace in the index",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <section><p>A</p> <p id="current">B</p><p>C</p></section>\n  <script>\n    function getSiblingIndex(element) {\n      return Array.from(element.parentNode?.children ?? []).indexOf(element);\n    }\n    console.log(getSiblingIndex(document.querySelector("#current")));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Return -1 without a parent",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <script>\n    function getSiblingIndex(element) {\n      return Array.from(element.parentNode?.children ?? []).indexOf(element);\n    }\n    console.log(getSiblingIndex(document.createElement("p")));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Check first and last element positions",
          explanation:
            "Tests whether an element has a preceding or following element sibling.",
          note: "These helpers require a parent so detached nodes are not classified as children. A lone element child is both first and last even if text siblings exist.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling",
          examples: [
            {
              label: "Check opposite boundaries",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <section><p id="first">A</p><p id="last">B</p></section>\n  <script>\n    function isFirstChild(element) {\n      return Boolean(element.parentNode) && !element.previousElementSibling;\n    }\n    function isLastChild(element) {\n      return Boolean(element.parentNode) && !element.nextElementSibling;\n    }\n    console.log(\n      isFirstChild(document.querySelector("#first")),\n      isLastChild(document.querySelector("#first")),\n    );\n    console.log(\n      isFirstChild(document.querySelector("#last")),\n      isLastChild(document.querySelector("#last")),\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Handle a lone child and a detached element",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <section>Text<p>Only</p>Text</section>\n  <script>\n    function isFirstChild(element) {\n      return Boolean(element.parentNode) && !element.previousElementSibling;\n    }\n    function isLastChild(element) {\n      return Boolean(element.parentNode) && !element.nextElementSibling;\n    }\n    const child = document.querySelector("p"),\n      detached = document.createElement("p");\n    console.log(\n      isFirstChild(child),\n      isLastChild(child),\n      isFirstChild(detached),\n      isLastChild(detached),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Swap with the next element sibling",
          explanation:
            "Moves the next element before the current element, exchanging their element order.",
          note: "No clone is created, so listeners remain on moved nodes. Non-element nodes between them are not swapped as a separate group. At the last element, this helper does nothing.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore",
          examples: [
            {
              label: "Swap two peers without cloning",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <section\n    ><button id="first">A</button><button>B</button><button>C</button></section\n  >\n  <script>\n    function swapWithNext(element) {\n      const next = element.nextElementSibling;\n      if (next) element.parentNode.insertBefore(next, element);\n    }\n    const first = document.querySelector("#first");\n    first.addEventListener("click", () => console.log("Listener kept"));\n    swapWithNext(first);\n    console.log(\n      ...Array.from(first.parentElement.children, (child) => child.textContent),\n    );\n    first.click();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Leave the last element in place",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>DOM traversal example</title>\n<body>\n  <section><p>A</p><p id="last">B</p></section>\n  <script>\n    function swapWithNext(element) {\n      const next = element.nextElementSibling;\n      if (next) element.parentNode.insertBefore(next, element);\n    }\n    const last = document.querySelector("#last");\n    swapWithNext(last);\n    console.log(last.parentElement.lastElementChild === last);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Adding & Removing",
      id: "adding-removing",
      intro:
        "Adding Elements → practical insertion helpers and fragments → Removing Elements → replacement, clearing, temporary detachment, and fade removal. Every example is an independent complete HTML file. Examples verify moved-node identity, return values, text insertion, live-collection snapshots, and safe handling of missing anchors.",
      methods: [
        {
          name: "Node.appendChild()",
          explanation:
            "Inserts a node as the last child and returns that node.",
          note: "An existing node moves rather than being copied, preserving its identity and listeners. Appending a DocumentFragment instead moves its children and returns the emptied fragment.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild",
          examples: [
            {
              label: "Append a new list item and read the return value",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <ul></ul>\n  <script>\n    const list = document.querySelector("ul");\n    const li = document.createElement("li");\n    li.textContent = "New item";\n    const added = list.appendChild(li);\n    console.log(added === li, list.lastElementChild.textContent);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Move an existing element without cloning",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <section id="source"><button class="item">Move</button></section\n  ><section id="target"></section>\n  <script>\n    const element = document.querySelector(".item"),\n      newParent = document.querySelector("#target");\n    element.addEventListener("click", () => console.log("Listener preserved"));\n    newParent.appendChild(element);\n    console.log(\n      document.querySelector("#source").children.length,\n      newParent.firstElementChild === element,\n    );\n    element.click();\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.append()",
          explanation:
            "Adds multiple nodes or strings at the end of an element.",
          note: "Strings become text nodes rather than parsed HTML. Returns undefined, unlike appendChild, and moves existing nodes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/append",
          examples: [
            {
              label: "Append elements and text in order",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <div id="target"></div>\n  <script>\n    const parent = document.querySelector("#target");\n    const first = document.createElement("b"),\n      last = document.createElement("i");\n    first.textContent = "A";\n    last.textContent = "B";\n    console.log(parent.append(first, " text ", last));\n    console.log(parent.textContent, parent.childNodes.length);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Append literal text strings",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <div id="target"></div>\n  <script>\n    const div = document.querySelector("#target");\n    div.append("Hello ", "World!", " <b>text</b>");\n    console.log(div.textContent, div.querySelector("b"));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.prepend()",
          explanation: "Adds nodes or strings before all existing children.",
          note: "Multiple arguments retain their argument order. Strings are text nodes and the return value is undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/prepend",
          examples: [
            {
              label: "Add a new first element",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <ul\n    ><li>Existing</li></ul\n  >\n  <script>\n    const parent = document.querySelector("ul"),\n      child = document.createElement("li");\n    child.textContent = "First";\n    parent.prepend(child);\n    console.log(...Array.from(parent.children, (item) => item.textContent));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Prepend several items in one call",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <div id="target">Existing</div>\n  <script>\n    const parent = document.querySelector("#target"),\n      element = document.createElement("b");\n    element.textContent = "Second";\n    console.log(parent.prepend("First", element, "Third"));\n    console.log(parent.textContent);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Node.insertBefore()",
          explanation:
            "Inserts or moves a node before a direct child reference and returns the inserted node.",
          note: "The reference must be a child of the parent or null. firstChild includes text nodes, making it suitable for inserting before every existing node.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore",
          examples: [
            {
              label: "Insert before a specific child",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <ul\n    ><li>A</li\n    ><li class="marker">C</li></ul\n  >\n  <script>\n    const parent = document.querySelector("ul"),\n      child = document.createElement("li");\n    child.textContent = "B";\n    console.log(\n      parent.insertBefore(child, parent.querySelector(".marker")) === child,\n    );\n    console.log(...Array.from(parent.children, (item) => item.textContent));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Insert first, including before a text node",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <div id="target">Existing text<span>Last</span></div>\n  <script>\n    const parent = document.querySelector("#target"),\n      child = document.createElement("b");\n    child.textContent = "First";\n    parent.insertBefore(child, parent.firstChild);\n    console.log(parent.firstChild === child, parent.textContent);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Append through a null reference",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <ul\n    ><li>A</li></ul\n  >\n  <script>\n    const parent = document.querySelector("ul"),\n      child = document.createElement("li");\n    child.textContent = "B";\n    parent.insertBefore(child, null);\n    console.log(parent.lastElementChild === child);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.insertAdjacentElement()",
          explanation:
            "Inserts an Element relative to a target element or its children.",
          note: "beforebegin and afterend create siblings; afterbegin and beforeend create children. Existing elements move, so each intended insertion below uses a distinct new element.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement",
          examples: [
            {
              label: "Insert sibling elements before and after a target",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <section><div class="target">Target</div></section>\n  <script>\n    const target = document.querySelector(".target");\n    const before = document.createElement("p"),\n      after = document.createElement("p");\n    before.textContent = "Before";\n    after.textContent = "After";\n    target.insertAdjacentElement("beforebegin", before);\n    const inserted = target.insertAdjacentElement("afterend", after);\n    console.log(\n      target.previousElementSibling.textContent,\n      target.nextElementSibling.textContent,\n      inserted === after,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Insert first and last element children",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <div class="target"><span>Middle</span></div>\n  <script>\n    const target = document.querySelector(".target");\n    const first = document.createElement("b"),\n      last = document.createElement("i");\n    first.textContent = "First";\n    last.textContent = "Last";\n    target.insertAdjacentElement("afterbegin", first);\n    target.insertAdjacentElement("beforeend", last);\n    console.log(\n      target.firstElementChild.textContent,\n      target.lastElementChild.textContent,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.after()",
          explanation:
            "Inserts nodes or text immediately after an element in its parent.",
          note: "Accepts multiple arguments and returns undefined. A parentless element has no insertion location, so the call does nothing.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/after",
          examples: [
            {
              label: "Insert one element sibling",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <section><p id="current">A</p></section>\n  <script>\n    const element = document.querySelector("#current"),\n      next = document.createElement("p");\n    next.textContent = "B";\n    element.after(next);\n    console.log(element.nextElementSibling === next);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Insert multiple nodes and a text string",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <section><span id="current">Start</span></section>\n  <script>\n    const element = document.querySelector("#current"),\n      first = document.createElement("b"),\n      last = document.createElement("i");\n    first.textContent = "A";\n    last.textContent = "B";\n    console.log(element.after(first, " text ", last));\n    console.log(element.parentElement.textContent);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.before()",
          explanation:
            "Inserts nodes or strings immediately before an element.",
          note: "Arguments retain order and strings remain literal text. Returns undefined and does nothing if the target has no parent.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/before",
          examples: [
            {
              label: "Insert a preceding element",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <section><p id="current">B</p></section>\n  <script>\n    const element = document.querySelector("#current"),\n      previous = document.createElement("p");\n    previous.textContent = "A";\n    element.before(previous);\n    console.log(element.previousElementSibling.textContent);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Insert text and multiple elements",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <section><span id="current">End</span></section>\n  <script>\n    const element = document.querySelector("#current"),\n      first = document.createElement("b"),\n      last = document.createElement("i");\n    first.textContent = "A";\n    last.textContent = "B";\n    element.before("Text ", first, last);\n    console.log(element.parentElement.textContent);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Build a list from data",
          explanation:
            "Creates a text-bearing list item for each input value and adds it to a list.",
          note: "textContent treats item values as text. Existing list items are retained unless they are explicitly cleared.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild",
          examples: [
            {
              label: "Append fruit items",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <ul></ul>\n  <script>\n    const items = ["Apple", "Banana", "Orange"],\n      ul = document.querySelector("ul");\n    items.forEach((item) => {\n      const li = document.createElement("li");\n      li.textContent = item;\n      ul.appendChild(li);\n    });\n    console.log(...Array.from(ul.children, (li) => li.textContent));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Retain existing items and display markup literally",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <ul\n    ><li>Existing</li></ul\n  >\n  <script>\n    const ul = document.querySelector("ul"),\n      items = ["<b>Literal</b>"];\n    items.forEach((item) => {\n      const li = document.createElement("li");\n      li.textContent = item;\n      ul.appendChild(li);\n    });\n    console.log(\n      ul.children.length,\n      ul.lastElementChild.textContent,\n      ul.querySelector("b"),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Insert an element at an index",
          explanation:
            "Inserts an element before a selected element-child position, appending beyond the end.",
          note: "This custom helper rejects negative or fractional indices and excludes the moved child from the reference snapshot, giving existing children a final-position interpretation. Text and comments do not count toward the index.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore",
          examples: [
            {
              label: "Insert a new middle element",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <ul\n    ><li>A</li\n    ><li>C</li></ul\n  >\n  <script>\n    function insertAtIndex(parent, child, index) {\n      if (!Number.isInteger(index) || index < 0)\n        throw new RangeError("Invalid index");\n      const children = Array.from(parent.children).filter(\n        (element) => element !== child,\n      );\n      return parent.insertBefore(child, children[index] ?? null);\n    }\n    const parent = document.querySelector("ul"),\n      child = document.createElement("li");\n    child.textContent = "B";\n    insertAtIndex(parent, child, 1);\n    console.log(...Array.from(parent.children, (item) => item.textContent));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Move an existing child beyond the end and validate input",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <ul\n    ><li>A</li\n    ><li>B</li\n    ><li>C</li></ul\n  >\n  <script>\n    function insertAtIndex(parent, child, index) {\n      if (!Number.isInteger(index) || index < 0)\n        throw new RangeError("Invalid index");\n      const children = Array.from(parent.children).filter(\n        (element) => element !== child,\n      );\n      return parent.insertBefore(child, children[index] ?? null);\n    }\n    const parent = document.querySelector("ul"),\n      child = parent.firstElementChild;\n    insertAtIndex(parent, child, 99);\n    console.log(...Array.from(parent.children, (item) => item.textContent));\n    try {\n      insertAtIndex(parent, child, -1);\n    } catch (error) {\n      console.log(error.name);\n    }\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Batch insertion with a DocumentFragment",
          explanation:
            "Assembles several nodes in a fragment before moving them into the target.",
          note: "Inserting a fragment empties it and preserves the identity of its child nodes. It does not guarantee a single reflow or universal performance improvement.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment",
          examples: [
            {
              label: "Insert one hundred assembled nodes",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <div id="target"></div>\n  <script>\n    const fragment = document.createDocumentFragment();\n    for (let i = 0; i < 100; i++) {\n      const div = document.createElement("div");\n      div.textContent = `Item ${i}`;\n      fragment.appendChild(div);\n    }\n    const container = document.querySelector("#target");\n    container.appendChild(fragment);\n    console.log(\n      container.children.length,\n      container.lastElementChild.textContent,\n      fragment.childNodes.length,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Insert a fragment before a marker",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <ul\n    ><li id="marker">Last</li></ul\n  >\n  <script>\n    const fragment = document.createDocumentFragment(),\n      first = document.createElement("li");\n    first.textContent = "First";\n    fragment.appendChild(first);\n    const list = document.querySelector("ul");\n    list.insertBefore(fragment, document.querySelector("#marker"));\n    console.log(list.firstElementChild === first, list.children.length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.remove()",
          explanation: "Detaches an element from its parent.",
          note: "Returns undefined, and calling it on an already detached element is harmless. Holding a reference keeps the detached element available for reuse.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/remove",
          examples: [
            {
              label: "Remove one element and tolerate repeated removal",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <div class="unwanted">Remove</div>\n  <script>\n    const element = document.querySelector(".unwanted");\n    console.log(element.remove());\n    element.remove();\n    console.log(element.isConnected, element.textContent);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Remove selected temporary elements",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <section\n    ><p class="remove-me temporary">A</p><p class="remove-me">B</p\n    ><p>Keep</p></section\n  >\n  <script>\n    document.querySelectorAll(".remove-me").forEach((element) => {\n      if (element.classList.contains("temporary")) element.remove();\n    });\n    console.log(document.querySelectorAll(".remove-me").length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Node.removeChild()",
          explanation:
            "Removes a direct child from a parent and returns the removed node.",
          note: "The child must currently belong to that parent or NotFoundError is thrown. The returned node retains its identity and listeners.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild",
          examples: [
            {
              label: "Remove and reuse a child",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <section id="source"><button class="child">Run</button></section\n  ><section id="target"></section>\n  <script>\n    const child = document.querySelector(".child"),\n      parent = child.parentElement;\n    child.addEventListener("click", () => console.log("Still listening"));\n    const removed = parent.removeChild(child);\n    document.querySelector("#target").appendChild(removed);\n    console.log(removed === child, parent.children.length);\n    removed.click();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Remove first and last element children",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <ul\n    ><li>A</li\n    ><li>B</li\n    ><li>C</li></ul\n  >\n  <script>\n    const parent = document.querySelector("ul");\n    if (parent.firstElementChild) parent.removeChild(parent.firstElementChild);\n    if (parent.lastElementChild) parent.removeChild(parent.lastElementChild);\n    console.log(parent.children.length, parent.firstElementChild.textContent);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.replaceWith()",
          explanation: "Replaces an element with one or more nodes or strings.",
          note: "Returns undefined. Strings become text nodes, and a parentless target is left unchanged.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceWith",
          examples: [
            {
              label: "Replace a target with a new element",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <section><p class="old">Old</p></section>\n  <script>\n    const oldElement = document.querySelector(".old"),\n      newElement = document.createElement("div");\n    newElement.className = "new";\n    newElement.textContent = "Replaced!";\n    console.log(oldElement.replaceWith(newElement));\n    console.log(\n      oldElement.isConnected,\n      document.querySelector(".new").textContent,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Replace with several nodes and text",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <section><p class="old">Old</p></section>\n  <script>\n    const oldElement = document.querySelector(".old"),\n      parent = oldElement.parentElement;\n    const first = document.createElement("b"),\n      last = document.createElement("i");\n    first.textContent = "A";\n    last.textContent = "B";\n    oldElement.replaceWith(first, " text ", last);\n    console.log(parent.textContent, parent.childNodes.length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Node.replaceChild()",
          explanation: "Replaces a direct child and returns the old child.",
          note: "Argument order is newChild, oldChild, which differs from insertBefore’s insertion/reference interpretation. The old node must belong to the parent.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild",
          examples: [
            {
              label: "Read the replaced node return value",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <section><p class="old">Old</p></section>\n  <script>\n    const oldChild = document.querySelector(".old"),\n      parent = oldChild.parentElement;\n    const newChild = document.createElement("p");\n    newChild.textContent = "New";\n    const replaced = parent.replaceChild(newChild, oldChild);\n    console.log(\n      replaced === oldChild,\n      replaced.isConnected,\n      parent.textContent,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Move a replacement node from another parent",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <section id="source"><button>Move</button></section\n  ><section id="target"><p>Old</p></section>\n  <script>\n    const newChild = document.querySelector("button"),\n      parent = document.querySelector("#target");\n    parent.replaceChild(newChild, parent.firstChild);\n    console.log(\n      document.querySelector("#source").children.length,\n      parent.firstChild === newChild,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Clear all children with text, HTML, or a loop",
          explanation:
            "Empties a container while keeping the container itself.",
          note: "All three approaches remove text, comments, and elements. None is universally fastest; choose based on semantics and measure relevant workloads rather than assuming fixed reflow counts.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent",
          examples: [
            {
              label: "Clear through textContent or innerHTML",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <div id="a"><p>A</p></div\n  ><div id="b">Text<!--comment--></div>\n  <script>\n    const a = document.querySelector("#a"),\n      b = document.querySelector("#b");\n    a.textContent = "";\n    b.innerHTML = "";\n    console.log(a.childNodes.length, b.childNodes.length);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Remove every node in a loop",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <div id="target"\n    >Text<p>A</p\n    ><!--comment--></div\n  >\n  <script>\n    const parent = document.querySelector("#target");\n    while (parent.firstChild) parent.removeChild(parent.firstChild);\n    console.log(parent.hasChildNodes());\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.replaceChildren()",
          explanation:
            "Replaces all child nodes with supplied nodes or strings, or clears the container when called with no arguments.",
          note: "Returns undefined. Existing supplied nodes move rather than being cloned, and strings remain plain text.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceChildren",
          examples: [
            {
              label: "Clear all children",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <div id="target">Text<p>A</p></div>\n  <script>\n    const parent = document.querySelector("#target");\n    console.log(parent.replaceChildren(), parent.childNodes.length);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Replace the complete child list",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <div id="target"><p>Old</p></div>\n  <script>\n    const parent = document.querySelector("#target"),\n      first = document.createElement("b"),\n      last = document.createElement("i");\n    first.textContent = "A";\n    last.textContent = "B";\n    parent.replaceChildren(first, " text ", last);\n    console.log(parent.textContent, parent.children.length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Remove all elements with a class",
          explanation: "Selects matching elements and removes each one.",
          note: "The helper takes one class token and escapes it for use in a CSS selector, so punctuation in valid class names is handled correctly.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/remove",
          examples: [
            {
              label: "Remove matching elements only",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <section\n    ><p class="temporary">A</p><p class="temporary">B</p><p>Keep</p></section\n  >\n  <script>\n    function removeByClass(className) {\n      document\n        .querySelectorAll(`.${CSS.escape(className)}`)\n        .forEach((element) => element.remove());\n    }\n    removeByClass("temporary");\n    console.log(document.querySelector("section").textContent);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Escape punctuation in the class token",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <section><p class="temp:old">Remove</p><p>Keep</p></section>\n  <script>\n    function removeByClass(className) {\n      document\n        .querySelectorAll(`.${CSS.escape(className)}`)\n        .forEach((element) => element.remove());\n    }\n    removeByClass("temp:old");\n    console.log(document.querySelector("section").children.length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Safely remove an optional match",
          explanation:
            "Checks whether the first selector match exists before removing it.",
          note: "This guards missing matches, not invalid CSS selector syntax. An invalid selector still throws SyntaxError.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector",
          examples: [
            {
              label: "Remove an existing match",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <div class="temporary">Remove</div>\n  <script>\n    function safeRemove(selector) {\n      const element = document.querySelector(selector);\n      if (element) element.remove();\n    }\n    safeRemove(".temporary");\n    console.log(document.querySelector(".temporary"));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Ignore a missing match",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <p>Keep</p>\n  <script>\n    function safeRemove(selector) {\n      const element = document.querySelector(selector);\n      if (element) element.remove();\n    }\n    safeRemove(".missing");\n    console.log(document.querySelector("p").textContent);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Detach and reattach an element",
          explanation:
            "Saves a parent and sibling anchor before removal, then restores the same element.",
          note: "The helper preserves a text/comment anchor through nextSibling. If the anchor has moved or been removed, it appends to the original parent; a parentless element has nowhere to reattach.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore",
          examples: [
            {
              label: "Restore the original position and listener",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <section><button>A</button> <span>B</span></section>\n  <script>\n    function detach(element) {\n      const parent = element.parentNode,\n        nextSibling = element.nextSibling;\n      element.remove();\n      return {\n        element,\n        reattach() {\n          if (parent)\n            parent.insertBefore(\n              element,\n              nextSibling?.parentNode === parent ? nextSibling : null,\n            );\n          return element;\n        },\n      };\n    }\n    const element = document.querySelector("button");\n    element.addEventListener("click", () => console.log("Listener retained"));\n    const saved = detach(element);\n    console.log(element.isConnected);\n    saved.reattach();\n    console.log(element.parentElement.firstChild === element);\n    element.click();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Handle an anchor that was removed while detached",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <section><p id="item">A</p><p id="anchor">B</p><p>C</p></section>\n  <script>\n    function detach(element) {\n      const parent = element.parentNode,\n        nextSibling = element.nextSibling;\n      element.remove();\n      return {\n        element,\n        reattach() {\n          if (parent)\n            parent.insertBefore(\n              element,\n              nextSibling?.parentNode === parent ? nextSibling : null,\n            );\n          return element;\n        },\n      };\n    }\n    const saved = detach(document.querySelector("#item"));\n    document.querySelector("#anchor").remove();\n    saved.reattach();\n    console.log(\n      ...Array.from(\n        saved.element.parentElement.children,\n        (child) => child.textContent,\n      ),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Custom replaceChildren helper",
          explanation:
            "Clears a parent and adds a supplied collection of nodes.",
          note: "This custom function accepts a collection rather than variadic nodes/strings. It snapshots a live collection before clearing, so existing children are not lost from the input. Prefer the built-in method when its interface fits.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceChildren",
          examples: [
            {
              label: "Replace from a new array of nodes",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <div id="target"><p>Old</p></div>\n  <script>\n    function replaceChildren(parent, newChildren) {\n      const snapshot = Array.from(newChildren);\n      parent.innerHTML = "";\n      snapshot.forEach((child) => parent.appendChild(child));\n    }\n    const parent = document.querySelector("#target"),\n      child = document.createElement("p");\n    child.textContent = "New";\n    replaceChildren(parent, [child]);\n    console.log(parent.textContent, parent.firstChild === child);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Reuse the parent’s own live children collection",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <div id="target"><p>A</p><p>B</p></div>\n  <script>\n    function replaceChildren(parent, newChildren) {\n      const snapshot = Array.from(newChildren);\n      parent.innerHTML = "";\n      snapshot.forEach((child) => parent.appendChild(child));\n    }\n    const parent = document.querySelector("#target"),\n      first = parent.firstElementChild;\n    replaceChildren(parent, parent.children);\n    console.log(parent.children.length, parent.firstElementChild === first);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Remove an element after a fade delay",
          explanation:
            "Sets an opacity transition and removes the element after a scheduled delay.",
          note: "The returned promise reports removal. The timer is a scheduling threshold rather than proof an animation completed; transition overrides, reduced-motion rules, and background scheduling can affect visuals. The example intentionally avoids promising exact animation timing.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/remove",
          examples: [
            {
              label: "Remove after the short fade delay",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <div class="notice" style="opacity: 1">Notice</div>\n  <script>\n    function removeWithFade(element, duration = 20) {\n      element.style.transition = `opacity ${duration}ms`;\n      getComputedStyle(element).opacity; // establish starting style\n      element.style.opacity = "0";\n      return new Promise((resolve) => {\n        setTimeout(() => {\n          element.remove();\n          resolve(element);\n        }, duration);\n      });\n    }\n    const element = document.querySelector(".notice");\n    removeWithFade(element).then((removed) =>\n      console.log(\n        removed === element,\n        element.isConnected,\n        element.style.opacity,\n      ),\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Retain the removed element for later reuse",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Adding and removing example</title>\n<body>\n  <div class="notice" style="opacity: 1">Notice</div\n  ><section id="archive"></section>\n  <script>\n    function removeWithFade(element, duration = 20) {\n      element.style.transition = `opacity ${duration}ms`;\n      getComputedStyle(element).opacity; // establish starting style\n      element.style.opacity = "0";\n      return new Promise((resolve) => {\n        setTimeout(() => {\n          element.remove();\n          resolve(element);\n        }, duration);\n      });\n    }\n    removeWithFade(document.querySelector(".notice"), 10).then((element) => {\n      element.style.transition = "";\n      element.style.opacity = "1";\n      document.querySelector("#archive").appendChild(element);\n      console.log(element.isConnected, element.style.opacity);\n    });\n  </script></body\n>',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Events - Basics",
      id: "events-basics",
      intro:
        "Event Listeners → registration options and cleanup → Event Object → default actions, propagation, and keyboard/mouse/touch/custom events. Every example is a complete independent HTML file. Programmatic click and dispatched events make handlers reproducible but do not stand in for trusted hardware input or prove browser-UI shortcut behavior.",
      methods: [
        {
          name: "EventTarget.addEventListener()",
          explanation:
            "Registers a callback for a particular event type without replacing existing listeners.",
          note: "Callbacks may be ordinary functions, stored arrows, or named functions. The complete HTML examples invoke click or dispatchEvent to run automatically; those events are synthetic and do not prove trusted user input.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
          examples: [
            {
              label: "Register ordinary and arrow callbacks",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const button = document.querySelector("button");\n    button.addEventListener("click", function () {\n      console.log("Button clicked!");\n    });\n    button.addEventListener("click", (event) =>\n      console.log("Clicked:", event.target.tagName),\n    );\n    button.click();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Register a named function",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const button = document.querySelector("button");\n    function handleClick(event) {\n      console.log(event.type);\n    }\n    button.addEventListener("click", handleClick);\n    button.click();\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Listener option: once",
          explanation: "Runs a listener at most once, then removes it.",
          note: "The option applies to that listener registration, not the event type globally. A separate listener can still receive every event.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
          examples: [
            {
              label: "Run only once across two clicks",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const button = document.querySelector("button");\n    button.addEventListener("click", () => console.log("Once"), { once: true });\n    button.click();\n    button.click();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Combine a one-time listener with a persistent listener",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const button = document.querySelector("button");\n    button.addEventListener("click", () => console.log("First only"), {\n      once: true,\n    });\n    button.addEventListener("click", () => console.log("Every click"));\n    button.click();\n    button.click();\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Listener option: passive",
          explanation:
            "Promises the listener will not prevent the event’s default action.",
          note: "A passive listener cannot preventDefault. Scroll events themselves are generally not cancelable, so passive is not a universal scroll-performance switch. The cancellation demonstration can produce an expected browser diagnostic.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
          examples: [
            {
              label: "Observe one scroll event passively",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <div id="box"></div>\n  <script>\n    const element = document.querySelector("#box");\n    function handleScroll(event) {\n      console.log(event.type, event.cancelable);\n    }\n    element.addEventListener("scroll", handleScroll, {\n      passive: true,\n      once: true,\n    });\n    element.dispatchEvent(new Event("scroll"));\n    element.dispatchEvent(new Event("scroll"));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Show that passive prevents cancellation",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <div id="box"></div>\n  <script>\n    const element = document.querySelector("#box");\n    element.addEventListener(\n      "wheel",\n      (event) => {\n        event.preventDefault();\n        console.log(event.defaultPrevented);\n      },\n      { passive: true },\n    );\n    element.dispatchEvent(new WheelEvent("wheel", { cancelable: true }));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Listener option: capture",
          explanation:
            "Invokes an ancestor listener during the capture phase before the event reaches its target.",
          note: "Passing true is shorthand for capture: true. Registering the same type, callback, and capture flag twice does not create two registrations.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
          examples: [
            {
              label: "Observe capture before target and bubble",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <section><button>Run</button></section>\n  <script>\n    const parent = document.querySelector("section"),\n      button = document.querySelector("button");\n    parent.addEventListener("click", () => console.log("Capture"), {\n      capture: true,\n    });\n    button.addEventListener("click", () => console.log("Target"));\n    parent.addEventListener("click", () => console.log("Bubble"));\n    button.click();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Use boolean shorthand without duplicate registration",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <section><button>Run</button></section>\n  <script>\n    const parent = document.querySelector("section"),\n      button = document.querySelector("button");\n    function handleClick() {\n      console.log("Captured once");\n    }\n    parent.addEventListener("click", handleClick, { capture: true });\n    parent.addEventListener("click", handleClick, true);\n    button.click();\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "EventTarget.removeEventListener()",
          explanation:
            "Removes an existing listener by type, callback identity, and capture flag.",
          note: "A newly created anonymous function is a different callback even when its source is identical. Other options such as passive and once need not match for removal, but capture must match.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener",
          examples: [
            {
              label: "Remove a stored arrow function",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const button = document.querySelector("button");\n    const handler = () => console.log("Not reached");\n    button.addEventListener("click", handler);\n    button.removeEventListener("click", handler);\n    button.click();\n    console.log("Removed");\n  </script></body\n>',
                },
              ],
            },
            {
              label: "A new anonymous function cannot remove the original",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const button = document.querySelector("button");\n    button.addEventListener("click", () => console.log("Click"));\n    button.removeEventListener("click", () => console.log("Click"));\n    button.click();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Match the capture flag",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const button = document.querySelector("button");\n    let calls = 0;\n    function handler() {\n      calls++;\n    }\n    button.addEventListener("click", handler, true);\n    button.removeEventListener("click", handler, false);\n    button.click();\n    button.removeEventListener("click", handler, true);\n    button.click();\n    console.log(calls);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Multiple listeners and event types",
          explanation:
            "Registers independent callbacks for one event or shares a handler across multiple event types.",
          note: "Listeners on the same target normally run in registration order. Synthetic touchstart below tests event routing only, not a physical touch gesture.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
          examples: [
            {
              label: "Run two listeners for one click",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const element = document.querySelector("button");\n    element.addEventListener("click", () => console.log("First"));\n    element.addEventListener("click", () => console.log("Second"));\n    element.click();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Share one callback across two event names",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const element = document.querySelector("button");\n    function handleInteraction(event) {\n      console.log(event.type);\n    }\n    ["click", "touchstart"].forEach((type) =>\n      element.addEventListener(type, handleInteraction),\n    );\n    element.click();\n    element.dispatchEvent(new Event("touchstart"));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Listener this: ordinary functions and arrows",
          explanation:
            "Uses currentTarget as this for an ordinary event listener, while an arrow keeps its enclosing this.",
          note: "The outer receiver in the arrow example is deliberately supplied with call, so the result does not depend on classic-script versus module top-level this.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
          examples: [
            {
              label: "Use this as the listener element",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const element = document.querySelector("button");\n    element.addEventListener("click", function (event) {\n      this.classList.toggle("active");\n      console.log(this === event.currentTarget, this.className);\n    });\n    element.click();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Capture an enclosing receiver with an arrow",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const element = document.querySelector("button");\n    function attach() {\n      element.addEventListener("click", (event) =>\n        console.log(this.name, event.currentTarget === element),\n      );\n    }\n    attach.call({ name: "Outer" });\n    element.click();\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Remove listener groups with AbortController",
          explanation:
            "Registers multiple listeners with one signal so abort removes them together.",
          note: "An aborted signal cannot be reset. Aborting removes listeners but does not cancel timers or other asynchronous work already started by a callback.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
          examples: [
            {
              label: "Remove two event registrations at once",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const button = document.querySelector("button"),\n      controller = new AbortController();\n    button.addEventListener("click", () => console.log("Click"), {\n      signal: controller.signal,\n    });\n    button.addEventListener("mouseover", () => console.log("Over"), {\n      signal: controller.signal,\n    });\n    controller.abort();\n    button.click();\n    button.dispatchEvent(new MouseEvent("mouseover"));\n    console.log("Listeners removed");\n  </script></body\n>',
                },
              ],
            },
            {
              label: "An already-aborted signal skips registration",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const button = document.querySelector("button"),\n      controller = new AbortController();\n    controller.abort();\n    button.addEventListener("click", () => console.log("Not reached"), {\n      signal: controller.signal,\n    });\n    button.click();\n    console.log(controller.signal.aborted);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Debounce an input listener",
          explanation:
            "Resets a timer for each input event and handles only the final value after a quiet interval.",
          note: "The callback snapshots the value at event time. Capture currentTarget-dependent values synchronously because currentTarget becomes null after dispatch; cancel any pending timer during teardown.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
          examples: [
            {
              label: "Keep the last value in an input burst",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <input />\n  <script>\n    const input = document.querySelector("input");\n    let timeout;\n    input.addEventListener("input", (event) => {\n      const value = event.target.value;\n      clearTimeout(timeout);\n      timeout = setTimeout(() => console.log("Search:", value), 10);\n    });\n    for (const value of ["J", "Ja", "JavaScript"]) {\n      input.value = value;\n      input.dispatchEvent(new Event("input"));\n    }\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Cancel queued work when tearing down",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <input />\n  <script>\n    const input = document.querySelector("input");\n    let timeout;\n    input.addEventListener("input", (event) => {\n      const value = event.target.value;\n      clearTimeout(timeout);\n      timeout = setTimeout(() => console.log("Search:", value), 10);\n    });\n    input.value = "Obsolete";\n    input.dispatchEvent(new Event("input"));\n    clearTimeout(timeout);\n    setTimeout(() => console.log("Canceled"), 20);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Manual one-time listener setup",
          explanation: "Removes a listener from inside its own callback.",
          note: "Remove the registration before user-defined work if nested dispatch could occur. Repeated setup calls with newly created callbacks still add separate listeners.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener",
          examples: [
            {
              label: "Remove after the first invocation",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const button = document.querySelector("button");\n    function initButton(button) {\n      const handleClick = () => {\n        button.removeEventListener("click", handleClick);\n        console.log("Clicked");\n      };\n      button.addEventListener("click", handleClick);\n    }\n    initButton(button);\n    button.click();\n    button.click();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Remove before a nested dispatch",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const button = document.querySelector("button");\n    function handler() {\n      button.removeEventListener("click", handler);\n      console.log("Once");\n      button.dispatchEvent(new Event("click"));\n    }\n    button.addEventListener("click", handler);\n    button.click();\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Toggle a listener on and off",
          explanation:
            "Uses a retained callback and state flag to switch a registration.",
          note: "Keep the flag consistent with registration changes; unrelated code that removes the same listener can make an external flag stale.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener",
          examples: [
            {
              label: "Enable and then disable a callback",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const element = document.querySelector("button");\n    let isListening = false;\n    function handler() {\n      console.log("Handled");\n    }\n    function toggleListener() {\n      if (isListening) element.removeEventListener("click", handler);\n      else element.addEventListener("click", handler);\n      isListening = !isListening;\n    }\n    toggleListener();\n    element.click();\n    toggleListener();\n    element.click();\n    console.log(isListening);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Enable handling again",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const element = document.querySelector("button");\n    let isListening = false;\n    function handler() {\n      console.log("Handled");\n    }\n    function toggleListener() {\n      if (isListening) element.removeEventListener("click", handler);\n      else element.addEventListener("click", handler);\n      isListening = !isListening;\n    }\n    toggleListener();\n    toggleListener();\n    toggleListener();\n    element.click();\n    console.log(isListening);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Event.target and Event.currentTarget",
          explanation:
            "target is where the event began. currentTarget is where the current listener is attached.",
          note: "currentTarget is meaningful during dispatch and becomes null afterward. target can be retargeted across shadow DOM boundaries; it is not always an Element.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget",
          examples: [
            {
              label: "Inspect a child click from the parent listener",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <div id="parent"><button id="child">Run</button></div>\n  <script>\n    const parent = document.querySelector("#parent"),\n      child = document.querySelector("#child");\n    parent.addEventListener("click", function (event) {\n      console.log(\n        event.target.id,\n        event.currentTarget.id,\n        this === event.currentTarget,\n      );\n    });\n    child.click();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Snapshot currentTarget before asynchronous work",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const element = document.querySelector("button");\n    element.addEventListener("click", (event) => {\n      const current = event.currentTarget;\n      queueMicrotask(() =>\n        console.log(current === element, event.currentTarget),\n      );\n    });\n    element.click();\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Event type, timestamp, bubbles, and cancelable",
          explanation:
            "Reads basic metadata describing an event and its dispatch behavior.",
          note: "timeStamp is a high-resolution time relative to a time origin, not a Unix epoch timestamp. Its precision can be reduced. Constructor defaults for bubbles and cancelable are false unless specified.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/Event",
          examples: [
            {
              label: "Inspect explicit event flags",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const element = document.querySelector("button");\n    element.addEventListener("demo", (event) =>\n      console.log(\n        event.type,\n        typeof event.timeStamp,\n        event.timeStamp >= 0,\n        event.bubbles,\n        event.cancelable,\n      ),\n    );\n    element.dispatchEvent(\n      new Event("demo", { bubbles: true, cancelable: true }),\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Inspect constructor defaults and synthetic trust",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const element = document.querySelector("button");\n    element.addEventListener("demo", (event) =>\n      console.log(event.bubbles, event.cancelable, event.isTrusted),\n    );\n    element.dispatchEvent(new Event("demo"));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Mouse coordinate properties",
          explanation:
            "Reads viewport, document, screen, and target-relative coordinates from mouse events.",
          note: "clientX/Y are viewport-relative, pageX/Y are document-relative, screenX/Y are screen-relative, and offsetX/Y relate to the target padding edge. Synthetic values demonstrate fields and are not measurements of real pointer hardware.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent",
          examples: [
            {
              label: "Inspect configured viewport and screen coordinates",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <div id="target">Target</div>\n  <script>\n    const element = document.querySelector("#target");\n    element.addEventListener("mousemove", (event) =>\n      console.log(event.clientX, event.clientY, event.screenX, event.screenY),\n    );\n    element.dispatchEvent(\n      new MouseEvent("mousemove", {\n        clientX: 10,\n        clientY: 20,\n        screenX: 100,\n        screenY: 200,\n      }),\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Read document and target-relative coordinate fields",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <div id="target">Target</div>\n  <script>\n    const element = document.querySelector("#target");\n    element.addEventListener("mousemove", (event) => {\n      console.log(\n        Number.isFinite(event.pageX),\n        Number.isFinite(event.pageY),\n        Number.isFinite(event.offsetX),\n        Number.isFinite(event.offsetY),\n      );\n    });\n    element.dispatchEvent(\n      new MouseEvent("mousemove", { clientX: 10, clientY: 20 }),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Modifier key properties",
          explanation:
            "Reads ctrlKey, shiftKey, altKey, and metaKey from relevant input events.",
          note: "metaKey commonly represents Command on macOS or the Windows key on Windows, subject to platform behavior. These examples explicitly configure synthetic modifier state.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/ctrlKey",
          examples: [
            {
              label: "Inspect mouse-event modifiers",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const element = document.querySelector("button");\n    element.addEventListener("click", (event) =>\n      console.log(event.ctrlKey, event.shiftKey, event.altKey, event.metaKey),\n    );\n    element.dispatchEvent(\n      new MouseEvent("click", { ctrlKey: true, shiftKey: true }),\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Inspect keyboard-event modifiers",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <input />\n  <script>\n    const input = document.querySelector("input");\n    input.addEventListener("keydown", (event) =>\n      console.log(event.ctrlKey, event.shiftKey, event.altKey, event.metaKey),\n    );\n    input.dispatchEvent(\n      new KeyboardEvent("keydown", { key: "s", altKey: true, metaKey: true }),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Event.preventDefault()",
          explanation:
            "Requests cancellation of an event’s default action when cancellation is allowed.",
          note: "It does not stop propagation. It has no effect on non-cancelable events or inside passive listeners. Synthetic keyboard events do not trigger or prove cancellation of browser UI shortcuts.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault",
          examples: [
            {
              label: "Handle form submission without navigating",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <form\n    ><input name="email" value="john@example.com" /><button>Send</button></form\n  >\n  <script>\n    const form = document.querySelector("form");\n    form.addEventListener("submit", (event) => {\n      event.preventDefault();\n      const formData = new FormData(event.currentTarget);\n      console.log(formData.get("email"), event.defaultPrevented);\n    });\n    form.requestSubmit();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Cancel a link click while still allowing bubbling",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <div><a href="https://example.com/">Open</a></div>\n  <script>\n    const link = document.querySelector("a");\n    link.addEventListener("click", (event) => {\n      event.preventDefault();\n      console.log(event.currentTarget.href);\n    });\n    link.parentElement.addEventListener("click", (event) =>\n      console.log("Bubbled", event.defaultPrevented),\n    );\n    link.click();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Conditionally prevent checkbox activation",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <input type="checkbox" />\n  <script>\n    const checkbox = document.querySelector("input"),\n      someCondition = true;\n    checkbox.addEventListener("click", (event) => {\n      if (someCondition) event.preventDefault();\n    });\n    checkbox.click();\n    console.log(checkbox.checked);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Event.stopPropagation()",
          explanation:
            "Stops the event from reaching other elements on its path.",
          note: "It does not cancel the default action or stop other listeners already on the same target. Ancestor capture listeners that already ran cannot be undone.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation",
          examples: [
            {
              label: "Stop bubbling but keep another target listener",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <div><button>Run</button></div>\n  <script>\n    const parent = document.querySelector("div"),\n      child = document.querySelector("button");\n    parent.addEventListener("click", () => console.log("Not reached"));\n    child.addEventListener("click", (event) => {\n      event.stopPropagation();\n      console.log("Child");\n    });\n    child.addEventListener("click", () => console.log("Second child listener"));\n    child.click();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Observe an ancestor capture listener before stopping",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <div><button>Run</button></div>\n  <script>\n    const parent = document.querySelector("div"),\n      child = document.querySelector("button");\n    parent.addEventListener(\n      "click",\n      () => console.log("Captured already"),\n      true,\n    );\n    child.addEventListener("click", (event) => {\n      event.stopPropagation();\n      console.log(event.defaultPrevented);\n    });\n    child.click();\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Event.stopImmediatePropagation()",
          explanation:
            "Stops the event and skips the remaining listeners on the current element.",
          note: "Registration order matters: earlier listeners may already have run. It does not automatically cancel the default action.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation",
          examples: [
            {
              label: "Skip later same-target and ancestor listeners",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <div><button>Run</button></div>\n  <script>\n    const parent = document.querySelector("div"),\n      element = document.querySelector("button");\n    element.addEventListener("click", (event) => {\n      console.log("First");\n      event.stopImmediatePropagation();\n    });\n    element.addEventListener("click", () => console.log("Not reached"));\n    parent.addEventListener("click", () => console.log("Not reached"));\n    element.click();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Keep effects from earlier listeners",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const element = document.querySelector("button");\n    element.addEventListener("click", () => console.log("Earlier"));\n    element.addEventListener("click", (event) => {\n      event.stopImmediatePropagation();\n      console.log(event.defaultPrevented);\n    });\n    element.addEventListener("click", () => console.log("Not reached"));\n    element.click();\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "KeyboardEvent.key and code",
          explanation:
            "Reads the interpreted key value and physical-key code from keyboard events.",
          note: "keyCode is deprecated and should not drive new code. Synthetic events demonstrate handler logic only; dispatching them does not type text or invoke trusted browser shortcuts.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent",
          examples: [
            {
              label: "Handle Enter and Escape",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <input />\n  <script>\n    const input = document.querySelector("input");\n    input.addEventListener("keydown", (event) => {\n      if (event.key === "Enter") console.log("Enter", event.code);\n      if (event.key === "Escape") console.log("Escape", typeof event.keyCode);\n    });\n    input.dispatchEvent(\n      new KeyboardEvent("keydown", { key: "Enter", code: "Enter" }),\n    );\n    input.dispatchEvent(\n      new KeyboardEvent("keydown", { key: "Escape", code: "Escape" }),\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Handle a modified save shortcut",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <input />\n  <script>\n    const input = document.querySelector("input");\n    input.addEventListener("keydown", (event) => {\n      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {\n        event.preventDefault();\n        console.log("Save", event.defaultPrevented);\n      }\n    });\n    input.dispatchEvent(\n      new KeyboardEvent("keydown", {\n        key: "s",\n        code: "KeyS",\n        ctrlKey: true,\n        cancelable: true,\n      }),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "MouseEvent.button, buttons, and detail",
          explanation:
            "Reads the changed button, current pressed-button bitmask, and event-specific click count.",
          note: "button uses 0 for the primary, 1 for auxiliary, and 2 for secondary button; physical mappings can be customized. buttons is a bitmask, not the same numbering scheme. detail depends on event type.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent",
          examples: [
            {
              label: "Inspect primary-button press metadata",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const element = document.querySelector("button");\n    element.addEventListener("mousedown", (event) =>\n      console.log(event.button, event.buttons, event.detail),\n    );\n    element.dispatchEvent(\n      new MouseEvent("mousedown", { button: 0, buttons: 1, detail: 1 }),\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Inspect a secondary-button press",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <button>Run</button>\n  <script>\n    const element = document.querySelector("button");\n    element.addEventListener("mousedown", (event) =>\n      console.log(event.button, event.buttons, event.detail),\n    );\n    element.dispatchEvent(\n      new MouseEvent("mousedown", { button: 2, buttons: 2, detail: 1 }),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "TouchEvent.touches",
          explanation:
            "Reads the current active touch points and their coordinates.",
          note: "The complete fixtures require browser support for the Touch and TouchEvent constructors and are tested in Chrome. Synthetic touch events do not emulate actual hardware; an end event can have no remaining active touches.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/touches",
          examples: [
            {
              label: "Read one configured touch point",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <div id="surface">Touch area</div>\n  <script>\n    const element = document.querySelector("#surface");\n    element.addEventListener("touchstart", (event) => {\n      const touch = event.touches[0];\n      if (touch)\n        console.log(touch.clientX, touch.clientY, event.touches.length);\n    });\n    const touch = new Touch({\n      identifier: 1,\n      target: element,\n      clientX: 10,\n      clientY: 20,\n    });\n    element.dispatchEvent(new TouchEvent("touchstart", { touches: [touch] }));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Handle an event with no remaining active touches",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <div id="surface">Touch area</div>\n  <script>\n    const element = document.querySelector("#surface");\n    element.addEventListener("touchend", (event) => {\n      console.log(event.touches.length, event.touches[0] === undefined);\n    });\n    element.dispatchEvent(new TouchEvent("touchend", { touches: [] }));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "CustomEvent and dispatchEvent()",
          explanation:
            "Creates an application event carrying data in detail and dispatches it immediately.",
          note: "Set bubbles and cancelable explicitly when needed. dispatchEvent returns false if a cancelable event was canceled and true otherwise; its event is synthetic.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent",
          examples: [
            {
              label: "Dispatch and handle custom data",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <div id="target"></div>\n  <script>\n    const element = document.querySelector("#target");\n    element.addEventListener("myevent", (event) =>\n      console.log(event.detail.message),\n    );\n    const customEvent = new CustomEvent("myevent", {\n      detail: { message: "Hello" },\n      bubbles: true,\n      cancelable: true,\n    });\n    console.log(element.dispatchEvent(customEvent));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Bubble a custom event and cancel it",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Events basics example</title>\n<body>\n  <section><div id="target"></div></section>\n  <script>\n    const element = document.querySelector("#target"),\n      parent = element.parentElement;\n    parent.addEventListener("myevent", (event) => {\n      console.log(event.detail.message);\n      event.preventDefault();\n    });\n    const event = new CustomEvent("myevent", {\n      detail: { message: "Payload" },\n      bubbles: true,\n      cancelable: true,\n    });\n    console.log(element.dispatchEvent(event), event.defaultPrevented);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Events - Advanced",
      id: "events-advanced",
      intro:
        "Event Delegation → action, form, dynamic-content and exclusion patterns → Custom Events → component messages, document event bus and namespacing. Each example is an independent complete HTML file with defined handlers. Listeners are registered before synchronous dispatch; delegated matches are checked against their intended container.",
      methods: [
        {
          name: "Delegate bubbling events to a parent",
          explanation:
            "Registers a listener on a stable ancestor and selects relevant events from descendants.",
          note: "Choose the narrowest useful ancestor rather than automatically using document. Delegation relies on the event reaching that ancestor; direct listeners are also valid and are not inherently a performance problem.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
          examples: [
            {
              label: "Handle several buttons with one container listener",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <div id="controls"\n    ><button class="btn">A</button><button class="btn">B</button></div\n  >\n  <script>\n    const controls = document.querySelector("#controls");\n    controls.addEventListener("click", (event) => {\n      if (\n        event.target instanceof Element &&\n        event.target.classList.contains("btn")\n      )\n        console.log(event.target.textContent);\n    });\n    controls.querySelectorAll("button").forEach((button) => button.click());\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Ignore unrelated targets in the same container",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <div id="controls"><button class="btn">Run</button><p>Ignore</p></div>\n  <script>\n    const controls = document.querySelector("#controls");\n    let count = 0;\n    controls.addEventListener("click", (event) => {\n      if (event.target instanceof Element && event.target.matches(".btn"))\n        count++;\n    });\n    controls.querySelector("p").click();\n    controls.querySelector("button").click();\n    console.log(count);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Filter delegated targets with matches()",
          explanation:
            "Tests whether the event’s target itself matches a selector.",
          note: "Guard that target is an Element before calling Element methods. matches does not walk ancestors, so a click on a nested icon will not match its containing button.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/matches",
          examples: [
            {
              label:
                "Remove an item through its directly clicked delete button",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <ul id="list"\n    ><li class="item"><button class="delete-btn">Delete</button></li\n    ><li>Keep</li></ul\n  >\n  <script>\n    const list = document.querySelector("#list");\n    list.addEventListener("click", (event) => {\n      if (\n        !(event.target instanceof Element) ||\n        !event.target.matches(".delete-btn")\n      )\n        return;\n      const item = event.target.closest(".item");\n      if (item && item !== list && list.contains(item)) item.remove();\n    });\n    list.querySelector("button").click();\n    console.log(list.children.length, list.textContent);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Read a directly targeted data action",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <div id="controls"><button data-action="save">Save</button></div>\n  <script>\n    const controls = document.querySelector("#controls");\n    function handleAction(action) {\n      console.log("Action:", action);\n    }\n    controls.addEventListener("click", (event) => {\n      if (\n        event.target instanceof Element &&\n        event.target.matches("[data-action]")\n      )\n        handleAction(event.target.dataset.action);\n    });\n    controls.querySelector("button").click();\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Resolve nested targets with closest()",
          explanation:
            "Finds a matching item from the event target or its ancestors.",
          note: "closest can leave the delegation container, so verify the match belongs to the intended root. For nested independently managed lists, also check ownership using the nearest list root.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/closest",
          examples: [
            {
              label: "Select an item from a nested span click",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <ul id="list"\n    ><li class="list-item" data-id="123"\n      ><button><span>Choose</span></button></li\n    ></ul\n  >\n  <script>\n    const list = document.querySelector("#list");\n    list.addEventListener("click", (event) => {\n      if (!(event.target instanceof Element)) return;\n      const item = event.target.closest(".list-item");\n      if (!item || item === list || !list.contains(item)) return;\n      console.log("Selected:", item.dataset.id);\n    });\n    list.querySelector("span").click();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Reject an ancestor match outside the container",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <section class="list-item" data-id="outside"\n    ><div id="list"><button>Ignore</button></div></section\n  >\n  <script>\n    const list = document.querySelector("#list");\n    list.addEventListener("click", (event) => {\n      if (!(event.target instanceof Element)) return;\n      const item = event.target.closest(".list-item");\n      if (!item || item === list || !list.contains(item)) return;\n      console.log("Selected:", item.dataset.id);\n    });\n    list.querySelector("button").click();\n    console.log("Finished without selecting outside");\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Route multiple delegated handlers",
          explanation:
            "Selects one behavior according to the matched control’s classes.",
          note: "Each helper behavior is defined in the example. Resolving the button through closest lets nested button content trigger the same branch.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/closest",
          examples: [
            {
              label: "Edit one item and delete another",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <div id="list"\n    ><article class="item" id="keep"\n      ><button class="edit"><span>Edit</span></button></article\n    ><article class="item" id="remove"\n      ><button class="delete">Delete</button></article\n    ></div\n  >\n  <script>\n    const list = document.querySelector("#list");\n    list.addEventListener("click", (event) => {\n      if (!(event.target instanceof Element)) return;\n      const button = event.target.closest(".delete, .edit, .toggle");\n      if (!button || !list.contains(button)) return;\n      const item = button.closest(".item");\n      if (!item || item === list || !list.contains(item)) return;\n      if (button.matches(".delete")) {\n        item.remove();\n        return;\n      }\n      if (button.matches(".edit")) {\n        item.dataset.editing = "true";\n        return;\n      }\n      if (button.matches(".toggle")) button.classList.toggle("active");\n    });\n    list.querySelector(".edit span").click();\n    list.querySelector(".delete").click();\n    console.log(\n      document.querySelector("#keep").dataset.editing,\n      list.querySelectorAll(".item").length,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Toggle the matching control",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <div id="list"\n    ><article class="item"\n      ><button class="toggle"><span>Toggle</span></button></article\n    ></div\n  >\n  <script>\n    const list = document.querySelector("#list");\n    list.addEventListener("click", (event) => {\n      if (!(event.target instanceof Element)) return;\n      const button = event.target.closest(".delete, .edit, .toggle");\n      if (!button || !list.contains(button)) return;\n      const item = button.closest(".item");\n      if (!item || item === list || !list.contains(item)) return;\n      if (button.matches(".delete")) {\n        item.remove();\n        return;\n      }\n      if (button.matches(".edit")) {\n        item.dataset.editing = "true";\n        return;\n      }\n      if (button.matches(".toggle")) button.classList.toggle("active");\n    });\n    list.querySelector("span").click();\n    console.log(list.querySelector("button").classList.contains("active"));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Route actions with data attributes",
          explanation:
            "Uses data-action and data-id to select behavior through an explicit switch.",
          note: "Dataset values are strings. Keep an explicit set of allowed actions instead of invoking arbitrary object methods from attribute text.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset",
          examples: [
            {
              label: "Dispatch supported actions from nested content",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <div id="controls"\n    ><button data-action="delete" data-id="1"><span>Delete</span></button\n    ><button data-action="edit" data-id="2">Edit</button\n    ><button data-action="toggle" data-id="3">Toggle</button></div\n  >\n  <script>\n    const controls = document.querySelector("#controls");\n    function deleteItem(id) {\n      console.log("Delete", id);\n    }\n    function editItem(id) {\n      console.log("Edit", id);\n    }\n    function toggleItem(id) {\n      console.log("Toggle", id);\n    }\n    controls.addEventListener("click", (event) => {\n      if (!(event.target instanceof Element)) return;\n      const button = event.target.closest("[data-action]");\n      if (!button || button === controls || !controls.contains(button)) return;\n      const { action, id } = button.dataset;\n      switch (action) {\n        case "delete":\n          deleteItem(id);\n          break;\n        case "edit":\n          editItem(id);\n          break;\n        case "toggle":\n          toggleItem(id);\n          break;\n      }\n    });\n    controls.querySelector("span").click();\n    controls.querySelectorAll("button")[1].click();\n    controls.querySelectorAll("button")[2].click();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Ignore an unsupported action",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <div id="controls"\n    ><button data-action="unknown" data-id="1">Unknown</button></div\n  >\n  <script>\n    const controls = document.querySelector("#controls");\n    function deleteItem(id) {\n      console.log("Delete", id);\n    }\n    function editItem(id) {\n      console.log("Edit", id);\n    }\n    function toggleItem(id) {\n      console.log("Toggle", id);\n    }\n    controls.addEventListener("click", (event) => {\n      if (!(event.target instanceof Element)) return;\n      const button = event.target.closest("[data-action]");\n      if (!button || button === controls || !controls.contains(button)) return;\n      const { action, id } = button.dataset;\n      switch (action) {\n        case "delete":\n          deleteItem(id);\n          break;\n        case "edit":\n          editItem(id);\n          break;\n        case "toggle":\n          toggleItem(id);\n          break;\n      }\n    });\n    controls.querySelector("button").click();\n    console.log("Unsupported action ignored");\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Delegate form submission",
          explanation:
            "Handles bubbling submit events on a stable ancestor and reads the submitting form’s data.",
          note: "event.target is the submitted form while currentTarget is the delegation root. Call preventDefault synchronously; requestSubmit performs browser constraint validation before submitting.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event",
          examples: [
            {
              label: "Submit an existing matching form",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <div id="forms"\n    ><form class="ajax-form"\n      ><input name="name" value="Alice" /><button>Send</button></form\n    ></div\n  >\n  <script>\n    const container = document.querySelector("#forms");\n    function submitForm(data) {\n      console.log("Submitted:", data.get("name"));\n    }\n    container.addEventListener("submit", (event) => {\n      const form = event.target;\n      if (!(form instanceof HTMLFormElement) || !form.matches(".ajax-form"))\n        return;\n      event.preventDefault();\n      submitForm(new FormData(form));\n    });\n    container.querySelector("form").requestSubmit();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Handle a form added after listener registration",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <div id="forms"></div>\n  <script>\n    const container = document.querySelector("#forms");\n    function submitForm(data) {\n      console.log("Submitted:", data.get("name"));\n    }\n    container.addEventListener("submit", (event) => {\n      const form = event.target;\n      if (!(form instanceof HTMLFormElement) || !form.matches(".ajax-form"))\n        return;\n      event.preventDefault();\n      submitForm(new FormData(form));\n    });\n    const form = document.createElement("form");\n    form.className = "ajax-form";\n    const input = document.createElement("input");\n    input.name = "name";\n    input.value = "Bob";\n    form.append(input);\n    container.append(form);\n    form.requestSubmit();\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Delegate events from dynamic content",
          explanation:
            "Keeps a listener on an ancestor so newly inserted descendants use the same handler.",
          note: "Keep the ancestor itself stable. Appending nodes or using insertAdjacentHTML preserves existing descendants; innerHTML += reparses them even though the ancestor listener survives.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
          examples: [
            {
              label: "Handle a later inserted button",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <div id="container"></div>\n  <script>\n    const container = document.querySelector("#container");\n    container.addEventListener("click", (event) => {\n      if (!(event.target instanceof Element)) return;\n      const button = event.target.closest(".dynamic-btn");\n      if (button && container.contains(button))\n        console.log("Clicked dynamic button");\n    });\n    setTimeout(() => {\n      const button = document.createElement("button");\n      button.className = "dynamic-btn";\n      button.textContent = "New Button";\n      container.appendChild(button);\n      button.click();\n    }, 10);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Preserve an existing node while inserting trusted markup",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <div id="container"><p>Existing</p></div>\n  <script>\n    const container = document.querySelector("#container");\n    container.addEventListener("click", (event) => {\n      if (!(event.target instanceof Element)) return;\n      const button = event.target.closest(".dynamic-btn");\n      if (button && container.contains(button))\n        console.log("Clicked dynamic button");\n    });\n    const existing = container.querySelector("p");\n    container.insertAdjacentHTML(\n      "beforeend",\n      \'<button class="dynamic-btn"><span>New Button</span></button>\',\n    );\n    container.querySelector("span").click();\n    console.log(container.querySelector("p") === existing);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Stop or skip delegated handling",
          explanation:
            "Prevents an event from reaching a bubbling listener or filters an excluded region inside that listener.",
          note: "stopPropagation affects other ancestor listeners too, and cannot undo capture listeners that already ran. An early return only skips that particular handler’s logic.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation",
          examples: [
            {
              label: "Stop a click before it reaches the delegated parent",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <div id="container"><button>Run</button></div>\n  <script>\n    const container = document.querySelector("#container"),\n      button = container.querySelector("button");\n    container.addEventListener("click", () => console.log("Not reached"));\n    button.addEventListener("click", (event) => {\n      event.stopPropagation();\n      console.log("Local only");\n    });\n    button.click();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Skip an excluded region without stopping propagation",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <div id="container"\n    ><section class="no-delegation"><button>Skip</button></section\n    ><button id="normal">Run</button></div\n  >\n  <script>\n    const container = document.querySelector("#container");\n    container.addEventListener("click", (event) => {\n      if (\n        !(event.target instanceof Element) ||\n        event.target.closest(".no-delegation")\n      )\n        return;\n      console.log("Delegated");\n    });\n    container.addEventListener("click", () => console.log("Observer"));\n    container.querySelector(".no-delegation button").click();\n    container.querySelector("#normal").click();\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Create application events with Event",
          explanation:
            "Creates an event with an application-defined type and explicit propagation flags.",
          note: "Constructed events are synthetic. Register listeners before dispatching: dispatchEvent invokes them synchronously and does not save events for listeners added afterward.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Event/Event",
          examples: [
            {
              label: "Dispatch a basic event after registering its listener",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <div id="target"></div>\n  <script>\n    const element = document.querySelector("#target");\n    element.addEventListener("my-event", (event) =>\n      console.log(event.type, event.bubbles, event.cancelable),\n    );\n    element.dispatchEvent(\n      new Event("my-event", { bubbles: true, cancelable: true }),\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Show that earlier dispatches are not replayed",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <div id="target"></div>\n  <script>\n    const element = document.querySelector("#target");\n    element.dispatchEvent(new Event("ready"));\n    element.addEventListener("ready", () => console.log("Ready now"));\n    element.dispatchEvent(new Event("ready"));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "CustomEvent.detail payloads",
          explanation:
            "Passes data to event listeners through the event’s detail property.",
          note: "detail is a shared value or object reference, not an automatic clone. A payload timestamp such as Date.now is application data and differs from Event.timeStamp’s time origin.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail",
          examples: [
            {
              label: "Emit a user login payload",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <div id="target"></div>\n  <script>\n    const element = document.querySelector("#target");\n    element.addEventListener("user-login", (event) =>\n      console.log(event.detail.userId, event.detail.username),\n    );\n    element.dispatchEvent(\n      new CustomEvent("user-login", {\n        detail: { userId: 123, username: "john" },\n        bubbles: true,\n      }),\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Read a structured action and shared payload identity",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <div id="target"></div>\n  <script>\n    const element = document.querySelector("#target");\n    const payload = {\n      action: "click",\n      timestamp: Date.now(),\n      data: { id: 123 },\n    };\n    element.addEventListener("user-action", (event) =>\n      console.log(\n        event.detail.action,\n        event.detail.data.id,\n        Number.isFinite(event.detail.timestamp),\n        event.detail === payload,\n      ),\n    );\n    element.dispatchEvent(\n      new CustomEvent("user-action", {\n        detail: payload,\n        bubbles: true,\n        cancelable: true,\n      }),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "dispatchEvent() cancellation contracts",
          explanation:
            "Returns whether an event completed without cancellation.",
          note: "dispatchEvent returns false only when cancellation succeeds. It runs listeners synchronously, does not await async listeners, and does not automatically cancel application code unless the emitter honors the result.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent",
          examples: [
            {
              label: "Honor a synchronous cancellation request",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <div id="target"></div>\n  <script>\n    const element = document.querySelector("#target");\n    element.addEventListener("before-save", (event) => event.preventDefault());\n    const notPrevented = element.dispatchEvent(\n      new CustomEvent("before-save", { cancelable: true }),\n    );\n    if (!notPrevented) console.log("Event was prevented");\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Proceed when an event is not cancelable",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <div id="target"></div>\n  <script>\n    const element = document.querySelector("#target");\n    element.addEventListener("notice", (event) => event.preventDefault());\n    console.log(element.dispatchEvent(new CustomEvent("notice")));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Bubble custom events between components",
          explanation:
            "Dispatches a child component event that a containing component observes.",
          note: "The child class receives its actual element in the constructor. Plain bubbling stays within its DOM tree; crossing a shadow root would require a separate composed-event contract.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent",
          examples: [
            {
              label: "Notify a parent of an item selection",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <section id="parent"><button id="child">Choose</button></section>\n  <script>\n    class ChildComponent {\n      constructor(element) {\n        this.element = element;\n      }\n      selectItem(item) {\n        this.element.dispatchEvent(\n          new CustomEvent("item-selected", { detail: { item }, bubbles: true }),\n        );\n      }\n    }\n    const parentElement = document.querySelector("#parent"),\n      child = new ChildComponent(document.querySelector("#child"));\n    parentElement.addEventListener("item-selected", (event) =>\n      console.log("Selected:", event.detail.item.id),\n    );\n    child.selectItem({ id: 123 });\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Keep the child event target while the parent listens",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <section id="parent"><div id="child"></div></section>\n  <script>\n    class ChildComponent {\n      constructor(element) {\n        this.element = element;\n      }\n      selectItem(item) {\n        this.element.dispatchEvent(\n          new CustomEvent("item-selected", { detail: { item }, bubbles: true }),\n        );\n      }\n    }\n    const parentElement = document.querySelector("#parent"),\n      child = new ChildComponent(document.querySelector("#child"));\n    parentElement.addEventListener("item-selected", (event) =>\n      console.log(event.target.id, event.currentTarget.id),\n    );\n    child.selectItem("item");\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Document-based EventBus.emit(), on(), and off()",
          explanation:
            "Wraps document custom-event dispatch and listener registration in a small application bus.",
          note: "This bus is synchronous and scoped to this document, not cross-window or persistent. Retain handler references and call off when consumers are disposed. Broad bus usage can make dependencies harder to track.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent",
          examples: [
            {
              label: "Publish and consume a message",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <script>\n    class EventBus {\n      static emit(eventName, data) {\n        return document.dispatchEvent(\n          new CustomEvent(eventName, { detail: data }),\n        );\n      }\n      static on(eventName, handler) {\n        document.addEventListener(eventName, handler);\n      }\n      static off(eventName, handler) {\n        document.removeEventListener(eventName, handler);\n      }\n    }\n    function onMessage(event) {\n      console.log("Message:", event.detail.text);\n    }\n    EventBus.on("app:message", onMessage);\n    EventBus.emit("app:message", { text: "Hello" });\n    EventBus.off("app:message", onMessage);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Unsubscribe before a later publication",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <script>\n    class EventBus {\n      static emit(eventName, data) {\n        return document.dispatchEvent(\n          new CustomEvent(eventName, { detail: data }),\n        );\n      }\n      static on(eventName, handler) {\n        document.addEventListener(eventName, handler);\n      }\n      static off(eventName, handler) {\n        document.removeEventListener(eventName, handler);\n      }\n    }\n    let received = 0;\n    function onMessage() {\n      received++;\n    }\n    EventBus.on("app:message", onMessage);\n    EventBus.emit("app:message", {});\n    EventBus.off("app:message", onMessage);\n    EventBus.emit("app:message", {});\n    console.log(received);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Modal close events",
          explanation:
            "Notifies consumers of a closing component’s result before removing its element.",
          note: "This is a notification, not a cancelable before-close contract. The class constructor supplies the element, and removal occurs after synchronous listeners finish.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent",
          examples: [
            {
              label: "Notify before detaching the modal",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <section id="parent"><div class="modal">Dialog</div></section>\n  <script>\n    class Modal {\n      constructor(element) {\n        this.element = element;\n      }\n      close(result) {\n        this.element.dispatchEvent(\n          new CustomEvent("modal-close", { detail: { result }, bubbles: true }),\n        );\n        this.element.remove();\n      }\n    }\n    const element = document.querySelector(".modal"),\n      parent = document.querySelector("#parent");\n    parent.addEventListener("modal-close", (event) =>\n      console.log(event.detail.result, event.target.isConnected),\n    );\n    new Modal(element).close("saved");\n    console.log(element.isConnected);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Preserve a falsy result in the payload",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <div class="modal">Dialog</div>\n  <script>\n    class Modal {\n      constructor(element) {\n        this.element = element;\n      }\n      close(result) {\n        this.element.dispatchEvent(\n          new CustomEvent("modal-close", { detail: { result }, bubbles: true }),\n        );\n        this.element.remove();\n      }\n    }\n    const element = document.querySelector(".modal");\n    element.addEventListener("modal-close", (event) =>\n      console.log(event.detail.result),\n    );\n    new Modal(element).close(false);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Emit a form validation event",
          explanation:
            "Dispatches a custom event with form data after an explicit validation check succeeds.",
          note: "Native constraint validation is used rather than an undefined helper. requestSubmit validates before firing submit; a manually dispatched submit event needs its own validation check.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/checkValidity",
          examples: [
            {
              label: "Publish data from a valid submitted form",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <section\n    ><form\n      ><input\n        name="email"\n        type="email"\n        value="john@example.com"\n        required\n      /><button>Send</button></form\n    ></section\n  >\n  <script>\n    const form = document.querySelector("form");\n    function validateForm(form) {\n      return form.checkValidity();\n    }\n    form.addEventListener("submit", (event) => {\n      event.preventDefault();\n      if (validateForm(form))\n        form.dispatchEvent(\n          new CustomEvent("form-valid", {\n            detail: new FormData(form),\n            bubbles: true,\n          }),\n        );\n      else console.log("Invalid form");\n    });\n    form.parentElement.addEventListener("form-valid", (event) =>\n      console.log(event.detail.get("email")),\n    );\n    form.requestSubmit();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Reject manually submitted invalid data",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <form><input name="email" type="email" required /></form>\n  <script>\n    const form = document.querySelector("form");\n    function validateForm(form) {\n      return form.checkValidity();\n    }\n    form.addEventListener("submit", (event) => {\n      event.preventDefault();\n      if (validateForm(form))\n        form.dispatchEvent(\n          new CustomEvent("form-valid", {\n            detail: new FormData(form),\n            bubbles: true,\n          }),\n        );\n      else console.log("Invalid form");\n    });\n    form.addEventListener("form-valid", () => console.log("Not reached"));\n    form.dispatchEvent(\n      new Event("submit", { bubbles: true, cancelable: true }),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Publish tab change events",
          explanation:
            "Emits the selected control’s tab identifier for a containing component.",
          note: "This example publishes a message only; it does not implement a complete accessible tab widget or automatically switch panels. Dataset identifiers remain strings.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent",
          examples: [
            {
              label: "Read a selected tab identifier",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <div id="tabs"\n    ><button class="tab" data-tab="overview">Overview</button\n    ><button class="tab" data-tab="details">Details</button></div\n  >\n  <script>\n    document.querySelectorAll(".tab").forEach((tab) => {\n      tab.addEventListener("click", () => {\n        tab.dispatchEvent(\n          new CustomEvent("tab-change", {\n            detail: { tabId: tab.dataset.tab },\n            bubbles: true,\n          }),\n        );\n      });\n    });\n    document\n      .querySelector("#tabs")\n      .addEventListener("tab-change", (event) =>\n        console.log(event.detail.tabId),\n      );\n    document.querySelectorAll(".tab")[1].click();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Keep identifiers as strings",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <div id="tabs"><button class="tab" data-tab="123">Tab</button></div>\n  <script>\n    document.querySelectorAll(".tab").forEach((tab) => {\n      tab.addEventListener("click", () => {\n        tab.dispatchEvent(\n          new CustomEvent("tab-change", {\n            detail: { tabId: tab.dataset.tab },\n            bubbles: true,\n          }),\n        );\n      });\n    });\n    document\n      .querySelector("#tabs")\n      .addEventListener("tab-change", (event) =>\n        console.log(event.detail.tabId, typeof event.detail.tabId),\n      );\n    document.querySelector(".tab").click();\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Namespace application event names",
          explanation:
            "Groups event-type strings under shared constants to reduce collisions and spelling mistakes.",
          note: "Colons are ordinary characters in an event type, not a built-in namespace or wildcard system. Each exact type still requires its own registration.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/Event/type",
          examples: [
            {
              label: "Use a namespaced login event",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <script>\n    const APP_EVENTS = {\n      USER_LOGIN: "app:user:login",\n      USER_LOGOUT: "app:user:logout",\n      DATA_LOADED: "app:data:loaded",\n      ERROR: "app:error",\n    };\n    function onLogin(event) {\n      console.log(event.detail.user.name);\n    }\n    document.addEventListener(APP_EVENTS.USER_LOGIN, onLogin);\n    const user = { name: "John" };\n    document.dispatchEvent(\n      new CustomEvent(APP_EVENTS.USER_LOGIN, { detail: { user } }),\n    );\n    document.removeEventListener(APP_EVENTS.USER_LOGIN, onLogin);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Match exact names rather than a prefix",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Advanced events example</title>\n<body>\n  <script>\n    const APP_EVENTS = {\n      USER_LOGIN: "app:user:login",\n      USER_LOGOUT: "app:user:logout",\n      DATA_LOADED: "app:data:loaded",\n      ERROR: "app:error",\n    };\n    let exact = 0,\n      prefix = 0;\n    function onExact() {\n      exact++;\n    }\n    function onPrefix() {\n      prefix++;\n    }\n    document.addEventListener(APP_EVENTS.DATA_LOADED, onExact);\n    document.addEventListener("app:data", onPrefix);\n    document.dispatchEvent(new CustomEvent(APP_EVENTS.DATA_LOADED));\n    console.log(exact, prefix);\n    document.removeEventListener(APP_EVENTS.DATA_LOADED, onExact);\n    document.removeEventListener("app:data", onPrefix);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Forms",
      id: "forms",
      intro:
        "Form Elements & Data → FormData → submission, validation, reset and focus → Form Events and practical feedback, password and file patterns. Each example is a complete independent HTML file; the multipart submission example also includes a local Node.js echo server. Programmatic edit/file fixtures are labeled and do not claim to reproduce trusted user interaction.",
      methods: [
        {
          name: "Access forms through ID and document.forms",
          explanation:
            "Retrieves a form through an ID or the document’s live form collection.",
          note: "Form IDs should be unique. Prefer explicit collection access rather than relying on browser-created global variables for IDs.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Document/forms",
          examples: [
            {
              label: "Find the same form three ways",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form id="myForm" name="myForm"></form>\n  <script>\n    const form = document.getElementById("myForm");\n    console.log(document.forms["myForm"] === form, document.forms[0] === form);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Observe the live forms collection",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form id="first"></form>\n  <script>\n    const forms = document.forms;\n    document.body.appendChild(document.createElement("form"));\n    console.log(forms.length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "HTMLFormElement.elements",
          explanation:
            "Returns a live collection of associated form controls with named and indexed lookup.",
          note: "Named lookup can return one element or a RadioNodeList when names repeat. Controls associated with the form attribute can be outside the form subtree. Names such as submit can shadow form methods, so access controls explicitly through elements.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements",
          examples: [
            {
              label: "Use names, property syntax, and an index",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form id="myForm"\n    ><input name="username" value="john" /><input\n      name="email"\n      value="john@example.com"\n    /><button name="submit" value="save">Save</button></form\n  >\n  <script>\n    const form = document.querySelector("form");\n    console.log(\n      form.elements["username"].value,\n      form.elements.email.value,\n      form.elements["submit"].value,\n      form.elements[0].name,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Iterate associated controls including an external input",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form id="myForm"><input name="username" value="john" /></form\n  ><input form="myForm" name="external" value="outside" />\n  <script>\n    const form = document.querySelector("form");\n    for (const element of form.elements)\n      console.log(element.name, element.value);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Text input and textarea values",
          explanation:
            "Reads or sets the current text value of inputs and textareas.",
          note: "Assigning value programmatically does not automatically dispatch input or change. A textarea’s current value can differ from its default text.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/value",
          examples: [
            {
              label: "Read and update text input state",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input value="Original" />\n  <script>\n    const input = document.querySelector("input");\n    console.log(input.value);\n    input.value = "New value";\n    console.log(input.value, input.getAttribute("value"));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Update a textarea",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <textarea>Original text</textarea>\n  <script>\n    const textarea = document.querySelector("textarea");\n    textarea.value = "New text";\n    console.log(textarea.value, textarea.defaultValue);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Checkbox checked state",
          explanation:
            "Reads or sets a checkbox’s current boolean checked state.",
          note: "An unchecked checkbox is omitted from native FormData. A checked checkbox without an explicit value normally contributes on.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checked",
          examples: [
            {
              label: "Read state and check a checkbox",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input type="checkbox" value="yes" />\n  <script>\n    const checkbox = document.querySelector("input");\n    console.log(checkbox.checked);\n    checkbox.checked = true;\n    console.log(checkbox.checked, checkbox.value);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Distinguish a checked token from an omitted checkbox",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form\n    ><input type="checkbox" name="enabled" checked /><input\n      type="checkbox"\n      name="other"\n  /></form>\n  <script>\n    const data = new FormData(document.querySelector("form"));\n    console.log(data.get("enabled"), data.has("other"));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Radio group selection",
          explanation: "Reads a selected radio from same-named controls.",
          note: "A single matching control may not return a RadioNodeList, so code should not blindly assume named lookup is always iterable. The examples deliberately define multiple radios.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/RadioNodeList/value",
          examples: [
            {
              label: "Find the selected member",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form\n    ><input type="radio" name="color" value="red" /><input\n      type="radio"\n      name="color"\n      value="blue"\n      checked\n  /></form>\n  <script>\n    const radios = document.querySelector("form").elements["color"];\n    console.log(\n      Array.from(radios).find((radio) => radio.checked)?.value,\n      radios.value,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Change a group selection",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form\n    ><input type="radio" name="color" value="red" checked /><input\n      type="radio"\n      name="color"\n      value="blue"\n  /></form>\n  <script>\n    const radios = document.querySelector("form").elements["color"];\n    radios.value = "blue";\n    console.log(radios[0].checked, radios[1].checked);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Select value and selected options",
          explanation:
            "Reads the current option value, display text, index, and selected option element.",
          note: "No selection means selectedIndex is -1 and selectedOptions can be empty, so guard before reading a selected option.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/selectedOptions",
          examples: [
            {
              label: "Read value, text, and selected option",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <select\n    ><option value="a">Apple</option\n    ><option value="b" selected>Banana</option></select\n  >\n  <script>\n    const select = document.querySelector("select");\n    console.log(\n      select.value,\n      select.options[select.selectedIndex].text,\n      select.selectedOptions[0].value,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Handle no selected option",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <select\n    ><option value="a">Apple</option></select\n  >\n  <script>\n    const select = document.querySelector("select");\n    select.selectedIndex = -1;\n    console.log(\n      select.value,\n      select.selectedIndex,\n      select.selectedOptions[0]?.text,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Multiple-select values",
          explanation:
            "Collects all selected options from a multi-select control.",
          note: "selectedOptions is live. A multiple select with no selected options contributes no entries to FormData.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/selectedOptions",
          examples: [
            {
              label: "Read multiple selected values",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form\n    ><select name="tags" multiple\n      ><option value="js" selected>JavaScript</option\n      ><option value="css">CSS</option\n      ><option value="html" selected>HTML</option></select\n    ></form\n  >\n  <script>\n    const multiSelect = document.querySelector("form").elements["tags"];\n    console.log(\n      ...Array.from(multiSelect.selectedOptions, (option) => option.value),\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Clear all selections",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <select multiple\n    ><option value="a" selected>A</option\n    ><option value="b" selected>B</option></select\n  >\n  <script>\n    const select = document.querySelector("select");\n    for (const option of select.options) option.selected = false;\n    console.log(select.selectedOptions.length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "new FormData(form)",
          explanation:
            "Collects named form values, including repeated fields and files. Disabled and unchecked controls are excluded.",
          note: "Disabled or unnamed controls and unchecked checkboxes/radios are omitted. It is not the same as form.elements, and changing FormData does not update the form controls. A submit button is only included when the constructor receives a valid submitter.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData",
          examples: [
            {
              label: "Collect successful controls",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form\n    ><input name="username" value="john" /><input\n      name="ignored"\n      value="no"\n      disabled /><input value="unnamed" /><input type="checkbox" name="off"\n  /></form>\n  <script>\n    const data = new FormData(document.querySelector("form"));\n    console.log(\n      data.get("username"),\n      data.has("ignored"),\n      data.has("off"),\n      [...data].length,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Observe snapshot independence",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form><input name="username" value="john" /></form>\n  <script>\n    const form = document.querySelector("form"),\n      data = new FormData(form);\n    form.elements.username.value = "jane";\n    console.log(data.get("username"), new FormData(form).get("username"));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "FormData.get() and getAll()",
          explanation:
            "Returns the first value or all values for a field name.",
          note: "get returns null for a missing name; getAll returns an empty array. Values can be strings or File objects.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/FormData/getAll",
          examples: [
            {
              label: "Read a username and repeated hobbies",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form\n    ><input name="username" value="john" /><input\n      name="hobbies"\n      value="reading" /><input name="hobbies" value="coding"\n  /></form>\n  <script>\n    const data = new FormData(document.querySelector("form"));\n    console.log(data.get("username"), ...data.getAll("hobbies"));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Read missing and repeated names",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <script>\n    const data = new FormData();\n    data.append("tag", "a");\n    data.append("tag", "b");\n    console.log(\n      data.get("tag"),\n      data.get("missing"),\n      data.getAll("missing").length,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "FormData.set()",
          explanation:
            "Replaces all entries with a field name by one supplied value.",
          note: "This changes the FormData object, not the associated form’s UI.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/FormData/set",
          examples: [
            {
              label: "Replace repeated entries",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <script>\n    const data = new FormData();\n    data.append("username", "first");\n    data.append("username", "second");\n    data.set("username", "newuser");\n    console.log(...data.getAll("username"));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Leave the input unchanged",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form><input name="username" value="john" /></form>\n  <script>\n    const form = document.querySelector("form"),\n      data = new FormData(form);\n    data.set("username", "newuser");\n    console.log(data.get("username"), form.elements.username.value);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "FormData.append() and file entries",
          explanation:
            "Adds another entry without discarding earlier entries of the same name.",
          note: "Check files[0] exists before appending a selected file. The browser fixtures create a File and FileList programmatically for reproducibility; they do not open or bypass a user file picker.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/FormData/append",
          examples: [
            {
              label: "Append repeated string values",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <script>\n    const data = new FormData();\n    data.append("tag", "a");\n    data.append("tag", "b");\n    console.log(...data.getAll("tag"));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Append a file from a defined input fixture",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input type="file" />\n  <script>\n    const fileInput = document.querySelector("input"),\n      transfer = new DataTransfer();\n    transfer.items.add(\n      new File(["Hello"], "hello.txt", { type: "text/plain" }),\n    );\n    fileInput.files = transfer.files;\n    const data = new FormData();\n    if (fileInput.files[0]) data.append("file", fileInput.files[0]);\n    console.log(data.get("file").name, data.get("file").size);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "FormData.delete() and has()",
          explanation:
            "Removes every entry for a name or checks whether a name exists.",
          note: "has checks membership rather than whether a value is truthy, so an empty string still counts as present.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/FormData/delete",
          examples: [
            {
              label: "Remove a temporary field",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <script>\n    const data = new FormData();\n    data.append("temporary", "a");\n    data.append("temporary", "b");\n    data.delete("temporary");\n    console.log(data.has("temporary"));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Check an email field with an empty value",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <script>\n    const data = new FormData();\n    data.set("email", "");\n    if (data.has("email")) console.log(data.get("email"), data.has("missing"));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Iterate and convert FormData",
          explanation:
            "Iterates name/value pairs or converts them into an object with Object.fromEntries.",
          note: "Object.fromEntries keeps only the last value for repeated names and preserves File objects rather than JSON-serializing them. Use getAll when all repeated values matter.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/FormData",
          examples: [
            {
              label: "Iterate submission entries",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form\n    ><input name="username" value="john" /><input\n      name="email"\n      value="john@example.com"\n  /></form>\n  <script>\n    const formData = new FormData(document.querySelector("form"));\n    for (const [key, value] of formData) console.log(key, value);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Observe repeated-name loss in object conversion",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <script>\n    const data = new FormData();\n    data.append("tag", "first");\n    data.append("tag", "last");\n    const object = Object.fromEntries(data);\n    console.log(object.tag, data.getAll("tag").length);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Submit a form with fetch and FormData",
          explanation:
            "Intercepts submission immediately and sends a multipart form body with fetch.",
          note: "For the file-pair example, run node server.cjs with Node.js 22+ and open the printed loopback URL. Do not set Content-Type manually: the browser adds the multipart boundary. Cancel submission only when the application is intentionally taking responsibility for it.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/FormData",
          examples: [
            {
              label: "Submit multipart FormData to a local echo server",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form><input name="username" value="john" /><button>Send</button></form>\n  <script>\n    const form = document.querySelector("form");\n    form.addEventListener("submit", async (event) => {\n      event.preventDefault();\n      try {\n        const response = await fetch("./submit", {\n          method: "POST",\n          body: new FormData(form),\n        });\n        if (!response.ok) throw new Error(`HTTP ${response.status}`);\n        console.log((await response.json()).username);\n      } catch (error) {\n        console.log(error.message);\n      }\n    });\n    form.requestSubmit();\n  </script></body\n>',
                },
                {
                  path: "server.cjs",
                  language: "javascript",
                  code: 'const http = require("node:http");\nconst fs = require("node:fs");\nconst { Readable } = require("node:stream");\nconst server = http.createServer(async (req, res) => {\n  try {\n    if (req.method === "POST" && req.url === "/submit") {\n      const request = new Request("http://localhost/submit", {\n        method: "POST",\n        headers: req.headers,\n        body: Readable.toWeb(req),\n        duplex: "half",\n      });\n      const data = await request.formData();\n      res.writeHead(200, { "Content-Type": "application/json" });\n      res.end(JSON.stringify({ username: data.get("username") }));\n    } else if (req.method === "GET" && req.url === "/") {\n      res.writeHead(200, { "Content-Type": "text/html" });\n      res.end(\n        fs.readFileSync(require("node:path").join(__dirname, "index.html")),\n      );\n    } else {\n      res.writeHead(404);\n      res.end();\n    }\n  } catch {\n    res.writeHead(500);\n    res.end("Server error");\n  }\n});\nserver.listen(0, "127.0.0.1", () =>\n  console.log(`http://127.0.0.1:${server.address().port}/`),\n);',
                },
              ],
            },
            {
              label: "Validate before a custom submission operation",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form\n    ><input name="username" required value="john" /><button>Send</button></form\n  >\n  <script>\n    const form = document.querySelector("form");\n    function submitForm(data) {\n      console.log("Submitted:", data.get("username"));\n    }\n    form.addEventListener("submit", (event) => {\n      event.preventDefault();\n      if (!form.checkValidity()) return;\n      submitForm(new FormData(form));\n    });\n    form.requestSubmit();\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Configure HTML validation constraints",
          explanation:
            "Sets native constraints such as required, pattern, minLength, and maxLength.",
          note: "Pattern matching applies to the entire nonempty value. Length constraints interact with user editing; programmatic value assignment does not simulate a trusted user edit or prove tooShort/tooLong behavior.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/pattern",
          examples: [
            {
              label: "Configure a username field",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input />\n  <script>\n    const input = document.querySelector("input");\n    input.required = true;\n    input.pattern = "[A-Za-z]{3,}";\n    input.minLength = 3;\n    input.maxLength = 20;\n    console.log(\n      input.required,\n      input.pattern,\n      input.minLength,\n      input.maxLength,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Check a whole-value pattern",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input pattern="[A-Za-z]{3,}" />\n  <script>\n    const input = document.querySelector("input");\n    input.value = "123";\n    console.log(input.validity.patternMismatch);\n    input.value = "John";\n    console.log(input.checkValidity());\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "checkValidity()",
          explanation:
            "Checks native constraints and returns whether a control or form is valid.",
          note: "Invalid controls fire invalid events. Native requestSubmit validates before submit, while manually dispatching submit does not automatically perform that validation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity",
          examples: [
            {
              label: "Check an empty required control",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input required />\n  <script>\n    const input = document.querySelector("input");\n    console.log(input.checkValidity(), input.validity.valueMissing);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Check the complete form",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form\n    ><input required value="john" /><input\n      type="email"\n      value="john@example.com"\n  /></form>\n  <script>\n    console.log(document.querySelector("form").checkValidity());\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "setCustomValidity()",
          explanation:
            "Sets or clears an application-defined validation failure.",
          note: "A nonempty message keeps the control invalid until it is explicitly cleared with an empty string, even after the value changes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity",
          examples: [
            {
              label: "Set a custom username failure",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input value="john" />\n  <script>\n    const input = document.querySelector("input");\n    input.setCustomValidity("Username already taken");\n    console.log(\n      input.checkValidity(),\n      input.validity.customError,\n      input.validationMessage,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Clear a previous custom error",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input value="jane" />\n  <script>\n    const input = document.querySelector("input");\n    input.setCustomValidity("Taken");\n    input.setCustomValidity("");\n    console.log(input.checkValidity(), input.validationMessage);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "ValidityState and validationMessage",
          explanation:
            "Inspects which constraint failed and the control’s current validation message.",
          note: "Native message wording depends on browser and locale, so the examples do not assert exact native text. Read tooShort with awareness that programmatic assignments do not reproduce user-edit validation semantics.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/ValidityState",
          examples: [
            {
              label: "Inspect missing and pattern-mismatch states",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input required pattern="[A-Za-z]{3,}" />\n  <script>\n    const input = document.querySelector("input");\n    console.log(\n      input.validity.valueMissing,\n      input.validationMessage.length > 0,\n    );\n    input.value = "12";\n    console.log(input.validity.patternMismatch, input.validity.tooShort);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Inspect custom and overall validity",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input />\n  <script>\n    const input = document.querySelector("input");\n    input.setCustomValidity("Choose another name");\n    console.log(\n      input.validity.customError,\n      input.validity.valid,\n      input.validationMessage,\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "form.reset()",
          explanation: "Restores form controls to their default state.",
          note: "Reset restores defaults rather than always clearing fields. It does not automatically clear custom validity messages or arbitrary application UI state.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset",
          examples: [
            {
              label: "Restore a text field and checkbox default",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form\n    ><input name="username" value="john" /><input\n      name="enabled"\n      type="checkbox"\n      checked\n  /></form>\n  <script>\n    const form = document.querySelector("form");\n    form.elements.username.value = "jane";\n    form.elements.enabled.checked = false;\n    form.reset();\n    console.log(form.elements.username.value, form.elements.enabled.checked);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Clear custom validity explicitly when resetting",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form><input name="username" value="john" /></form>\n  <script>\n    const form = document.querySelector("form"),\n      input = form.elements.username;\n    input.setCustomValidity("Taken");\n    form.reset();\n    console.log(input.validity.customError);\n    input.setCustomValidity("");\n    console.log(input.validity.customError);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "focus(), select(), and blur()",
          explanation:
            "Moves focus, selects text in a supported text control, or removes focus.",
          note: "Selection APIs apply to supported text controls. Calling select is not a universal replacement for focus, and background or inactive browsing contexts can affect focus behavior.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select",
          examples: [
            {
              label: "Focus and select the full value",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input value="Hello" />\n  <script>\n    const input = document.querySelector("input");\n    input.focus();\n    input.select();\n    console.log(\n      document.activeElement === input,\n      input.selectionStart,\n      input.selectionEnd,\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Remove focus from a field",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input />\n  <script>\n    const input = document.querySelector("input");\n    input.focus();\n    input.blur();\n    console.log(document.activeElement === input);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Custom getFormValues helper",
          explanation:
            "Collects a defined application representation from controls instead of reproducing native submission exactly.",
          note: "This helper returns single checkbox booleans, checkbox-group arrays, radio values, multi-select arrays, and repeated text arrays. It skips disabled/unnamed controls and action buttons; groups should use one consistent control type. It differs deliberately from FormData successful-control rules.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements",
          examples: [
            {
              label: "Collect checkbox, radio, and multi-select state",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form\n    ><input name="enabled" type="checkbox" /><input\n      name="color"\n      type="radio"\n      value="red"\n    /><input name="color" type="radio" value="blue" checked /><select\n      name="tags"\n      multiple\n      ><option value="js" selected>JS</option\n      ><option value="css" selected>CSS</option></select\n    ></form\n  >\n  <script>\n    function getFormValues(form) {\n      const data = Object.create(null);\n      const controls = Array.from(form.elements).filter(\n        (element) =>\n          element.name &&\n          !element.matches(":disabled") &&\n          !["submit", "button", "reset", "fieldset"].includes(element.type),\n      );\n      const seen = new Set();\n      for (const element of controls) {\n        const name = element.name;\n        if (seen.has(name)) continue;\n        seen.add(name);\n        const group = controls.filter((control) => control.name === name);\n        if (group.every((control) => control.type === "checkbox"))\n          data[name] =\n            group.length === 1\n              ? element.checked\n              : group\n                  .filter((control) => control.checked)\n                  .map((control) => control.value);\n        else if (group.every((control) => control.type === "radio"))\n          data[name] = group.find((control) => control.checked)?.value;\n        else if (group.length > 1)\n          data[name] = group.map((control) => control.value);\n        else if (element.type === "select-multiple")\n          data[name] = Array.from(\n            element.selectedOptions,\n            (option) => option.value,\n          );\n        else if (element.type === "file")\n          data[name] = Array.from(element.files);\n        else data[name] = element.value;\n      }\n      return data;\n    }\n    const data = getFormValues(document.querySelector("form"));\n    console.log(data.enabled, data.color, ...data.tags);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Keep repeated names and omit disabled fields",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form\n    ><input name="tag" value="a" /><input name="tag" value="b" /><input\n      name="skip"\n      disabled\n      value="no" /><input\n      name="hobby"\n      type="checkbox"\n      value="read"\n      checked /><input name="hobby" type="checkbox" value="code"\n  /></form>\n  <script>\n    function getFormValues(form) {\n      const data = Object.create(null);\n      const controls = Array.from(form.elements).filter(\n        (element) =>\n          element.name &&\n          !element.matches(":disabled") &&\n          !["submit", "button", "reset", "fieldset"].includes(element.type),\n      );\n      const seen = new Set();\n      for (const element of controls) {\n        const name = element.name;\n        if (seen.has(name)) continue;\n        seen.add(name);\n        const group = controls.filter((control) => control.name === name);\n        if (group.every((control) => control.type === "checkbox"))\n          data[name] =\n            group.length === 1\n              ? element.checked\n              : group\n                  .filter((control) => control.checked)\n                  .map((control) => control.value);\n        else if (group.every((control) => control.type === "radio"))\n          data[name] = group.find((control) => control.checked)?.value;\n        else if (group.length > 1)\n          data[name] = group.map((control) => control.value);\n        else if (element.type === "select-multiple")\n          data[name] = Array.from(\n            element.selectedOptions,\n            (option) => option.value,\n          );\n        else if (element.type === "file")\n          data[name] = Array.from(element.files);\n        else data[name] = element.value;\n      }\n      return data;\n    }\n    const data = getFormValues(document.querySelector("form"));\n    console.log(...data.tag, ...data.hobby, Object.hasOwn(data, "skip"));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "input and change events",
          explanation:
            "Handles edits as they occur or when a control commits a changed value.",
          note: "Input is not limited to keystrokes: paste and other edits can trigger it. Change timing depends on the control. Programmatic value changes do not automatically fire either event; the fixtures dispatch them explicitly.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event",
          examples: [
            {
              label: "Observe input followed by a committed change",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input />\n  <script>\n    const input = document.querySelector("input");\n    input.addEventListener("input", (event) =>\n      console.log("Current value:", event.target.value),\n    );\n    input.addEventListener("change", (event) =>\n      console.log("Final value:", event.target.value),\n    );\n    input.value = "John";\n    input.dispatchEvent(new Event("input", { bubbles: true }));\n    input.dispatchEvent(new Event("change", { bubbles: true }));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Value assignment alone does not dispatch edits",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input />\n  <script>\n    const input = document.querySelector("input");\n    let changes = 0;\n    input.addEventListener("input", () => changes++);\n    input.addEventListener("change", () => changes++);\n    input.value = "Programmatic";\n    console.log(changes);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "focus and blur events",
          explanation: "Handles a control gaining or losing focus.",
          note: "These events do not bubble, although ancestors can observe them during capture. The examples focus and blur actual rendered controls and leave no lingering focused handler.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event",
          examples: [
            {
              label: "Apply and clear a focus class",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input />\n  <script>\n    const input = document.querySelector("input");\n    input.addEventListener("focus", (event) => {\n      event.target.classList.add("focused");\n      console.log("Focused", event.bubbles);\n    });\n    input.addEventListener("blur", (event) => {\n      event.target.classList.remove("focused");\n      console.log("Blurred", event.target.className);\n    });\n    input.focus();\n    input.blur();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Validate on blur with a defined helper",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input required />\n  <script>\n    const input = document.querySelector("input");\n    function validateField(field) {\n      console.log(field.checkValidity());\n    }\n    input.addEventListener("blur", (event) => validateField(event.target));\n    input.focus();\n    input.blur();\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "focusin and focusout delegation",
          explanation:
            "Observes focus entering or leaving descendant controls through bubbling events.",
          note: "These bubble unlike focus and blur. Event order details can vary across engines; the fixtures log only focusin/focusout, not an assumed ordering across every focus event family.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Element/focusin_event",
          examples: [
            {
              label: "Observe a child focus from the form",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form><input name="username" /></form>\n  <script>\n    const form = document.querySelector("form"),\n      input = form.elements.username;\n    form.addEventListener("focusin", (event) =>\n      console.log("Entered", event.target.name, event.bubbles),\n    );\n    form.addEventListener("focusout", (event) =>\n      console.log("Left", event.target.name, event.bubbles),\n    );\n    input.focus();\n    input.blur();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Delegate across two fields",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form><input name="a" /><input name="b" /></form>\n  <script>\n    const form = document.querySelector("form");\n    form.addEventListener("focusin", (event) => console.log(event.target.name));\n    form.elements.a.focus();\n    form.elements.b.focus();\n    form.elements.b.blur();\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Text select and dropdown change events",
          explanation:
            "Reads selected text from selection offsets or a changed dropdown value.",
          note: "Text-selection offsets are available only on supported text input types and textareas. The dropdown fixture explicitly dispatches change after a programmatic selection.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select_event",
          examples: [
            {
              label: "Read selected text",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input value="Hello World" />\n  <script>\n    const input = document.querySelector("input");\n    input.addEventListener(\n      "select",\n      (event) => {\n        const field = event.target;\n        console.log(\n          "Selected:",\n          field.value.substring(field.selectionStart, field.selectionEnd),\n        );\n      },\n      { once: true },\n    );\n    input.focus();\n    input.setSelectionRange(0, 5);\n    input.blur();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Read a changed dropdown value",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <select\n    ><option value="a">A</option\n    ><option value="b">B</option></select\n  >\n  <script>\n    const select = document.querySelector("select");\n    select.addEventListener("change", (event) =>\n      console.log("Selected:", event.target.value),\n    );\n    select.value = "b";\n    select.dispatchEvent(new Event("change", { bubbles: true }));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "invalid event and custom error presentation",
          explanation:
            "Handles a failed native constraint check and supplies custom feedback.",
          note: "Preventing invalid can suppress native presentation but does not make the field valid. invalid does not bubble; use capture for delegated form handling. Native validation messages are localized.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event",
          examples: [
            {
              label: "Show a native message in an owned error element",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input required aria-describedby="error" /><p id="error"></p>\n  <script>\n    const input = document.querySelector("input"),\n      error = document.querySelector("#error");\n    input.addEventListener("invalid", (event) => {\n      event.preventDefault();\n      error.textContent = event.target.validationMessage;\n    });\n    console.log(input.checkValidity(), error.textContent.length > 0);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Capture invalid events at the form",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form><input name="username" required /></form>\n  <script>\n    const form = document.querySelector("form");\n    form.addEventListener(\n      "invalid",\n      (event) => {\n        event.preventDefault();\n        console.log(event.target.name, event.bubbles);\n      },\n      true,\n    );\n    form.checkValidity();\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Real-time character counter",
          explanation: "Updates a counter when a textarea emits input.",
          note: "String length counts UTF-16 code units, not user-perceived grapheme clusters. A missing maxlength is represented by -1 and should not be displayed as a meaningful limit.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event",
          examples: [
            {
              label: "Count against a configured maximum",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <textarea maxlength="20"></textarea><output></output>\n  <script>\n    const textarea = document.querySelector("textarea"),\n      counter = document.querySelector("output");\n    textarea.addEventListener("input", (event) => {\n      counter.textContent = `${event.target.value.length}/${event.target.maxLength}`;\n    });\n    textarea.value = "Hello";\n    textarea.dispatchEvent(new Event("input"));\n    console.log(counter.textContent);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Handle a textarea without a maximum",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <textarea></textarea><output></output>\n  <script>\n    const textarea = document.querySelector("textarea"),\n      counter = document.querySelector("output");\n    textarea.addEventListener("input", (event) => {\n      const field = event.target;\n      counter.textContent =\n        field.maxLength < 0\n          ? String(field.value.length)\n          : `${field.value.length}/${field.maxLength}`;\n    });\n    textarea.value = "Hello";\n    textarea.dispatchEvent(new Event("input"));\n    console.log(counter.textContent);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Live email validation",
          explanation:
            "Updates custom feedback while a user edits an email field.",
          note: "Clear a prior custom error before evaluating the new value. This demonstrates syntax feedback, not proof that an email address exists or can receive mail; required is a separate constraint.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/typeMismatch",
          examples: [
            {
              label: "Display an invalid email message",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input type="email" /><output></output>\n  <script>\n    const email = document.querySelector("input"),\n      error = document.querySelector("output");\n    email.addEventListener("input", (event) => {\n      const field = event.target;\n      field.setCustomValidity("");\n      if (field.value && field.validity.typeMismatch) {\n        field.setCustomValidity("Invalid email format");\n        error.textContent = "Invalid email format";\n      } else error.textContent = "";\n    });\n    email.value = "invalid";\n    email.dispatchEvent(new Event("input"));\n    console.log(email.validity.customError, error.textContent);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Clear an error after a valid edit",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input type="email" /><output></output>\n  <script>\n    const email = document.querySelector("input"),\n      error = document.querySelector("output");\n    email.addEventListener("input", (event) => {\n      const field = event.target;\n      field.setCustomValidity("");\n      if (field.value && field.validity.typeMismatch) {\n        field.setCustomValidity("Invalid email format");\n        error.textContent = "Invalid email format";\n      } else error.textContent = "";\n    });\n    email.value = "invalid";\n    email.dispatchEvent(new Event("input"));\n    email.value = "john@example.com";\n    email.dispatchEvent(new Event("input"));\n    console.log(email.validity.valid, error.textContent);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Debounced availability validation",
          explanation:
            "Waits for an input quiet period before checking a value.",
          note: "The lookup here is explicitly simulated. Capture the queried value and discard a result when the current value no longer matches; real requests also need failure handling and may need cancellation or request-version checks.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event",
          examples: [
            {
              label: "Check only the last value in a burst",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input />\n  <script>\n    const username = document.querySelector("input");\n    let timeout;\n    async function checkUsernameAvailable(value) {\n      return value !== "taken";\n    } // simulated lookup\n    username.addEventListener("input", (event) => {\n      clearTimeout(timeout);\n      const value = event.target.value;\n      timeout = setTimeout(async () => {\n        const available = await checkUsernameAvailable(value);\n        if (username.value === value) console.log(value, available);\n      }, 10);\n    });\n    for (const value of ["ta", "taken"]) {\n      username.value = value;\n      username.dispatchEvent(new Event("input"));\n    }\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Cancel pending validation during teardown",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input />\n  <script>\n    const username = document.querySelector("input");\n    let timeout;\n    async function checkUsernameAvailable(value) {\n      return value !== "taken";\n    } // simulated lookup\n    username.addEventListener("input", (event) => {\n      clearTimeout(timeout);\n      const value = event.target.value;\n      timeout = setTimeout(async () => {\n        const available = await checkUsernameAvailable(value);\n        if (username.value === value) console.log(value, available);\n      }, 10);\n    });\n    username.value = "john";\n    username.dispatchEvent(new Event("input"));\n    clearTimeout(timeout);\n    setTimeout(() => console.log("Validation canceled"), 20);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Password visibility toggle",
          explanation:
            "Switches a password input between obscured and visible text.",
          note: "Changing the input type does not change its value or provide additional protection for the stored string. The example keeps aria-pressed synchronized with visibility.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/type",
          examples: [
            {
              label: "Reveal a password without changing it",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input type="password" value="example" /><button\n    type="button"\n    aria-pressed="false"\n    >Show</button\n  >\n  <script>\n    const passwordInput = document.querySelector("input"),\n      toggleBtn = document.querySelector("button");\n    toggleBtn.addEventListener("click", () => {\n      const type = passwordInput.type === "password" ? "text" : "password";\n      passwordInput.type = type;\n      toggleBtn.textContent = type === "password" ? "Show" : "Hide";\n      toggleBtn.setAttribute("aria-pressed", String(type === "text"));\n    });\n    toggleBtn.click();\n    console.log(\n      passwordInput.type,\n      passwordInput.value,\n      toggleBtn.textContent,\n      toggleBtn.getAttribute("aria-pressed"),\n    );\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Hide it again after a second click",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input type="password" value="example" /><button\n    type="button"\n    aria-pressed="false"\n    >Show</button\n  >\n  <script>\n    const passwordInput = document.querySelector("input"),\n      toggleBtn = document.querySelector("button");\n    toggleBtn.addEventListener("click", () => {\n      const type = passwordInput.type === "password" ? "text" : "password";\n      passwordInput.type = type;\n      toggleBtn.textContent = type === "password" ? "Show" : "Hide";\n      toggleBtn.setAttribute("aria-pressed", String(type === "text"));\n    });\n    toggleBtn.click();\n    toggleBtn.click();\n    console.log(\n      passwordInput.type,\n      toggleBtn.textContent,\n      toggleBtn.getAttribute("aria-pressed"),\n    );\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "File input change and File metadata",
          explanation:
            "Reads the file input’s FileList and each file’s name, size, and reported type.",
          note: "FileList fixtures below use DataTransfer for repeatable browser tests. MIME type is supplied metadata, not trustworthy content validation; a user may also select no files.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/files",
          examples: [
            {
              label: "Inspect a defined text file",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input type="file" />\n  <script>\n    const fileInput = document.querySelector("input");\n    fileInput.addEventListener("change", (event) => {\n      for (const file of event.target.files)\n        console.log("File:", file.name, file.size, file.type);\n    });\n    const transfer = new DataTransfer();\n    transfer.items.add(\n      new File(["Hello"], "hello.txt", { type: "text/plain" }),\n    );\n    fileInput.files = transfer.files;\n    fileInput.dispatchEvent(new Event("change"));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Handle an empty file list",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input type="file" />\n  <script>\n    const input = document.querySelector("input");\n    input.addEventListener("change", (event) =>\n      console.log(event.target.files.length),\n    );\n    input.dispatchEvent(new Event("change"));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "FileReader.readAsDataURL() image previews",
          explanation:
            "Reads a file into a data URL that can be shown as an image.",
          note: "Handle reader errors and select an intended file rather than letting concurrent readers race to overwrite one preview. Data URLs hold encoded file data in memory; checking an image MIME prefix is not file-content validation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL",
          examples: [
            {
              label: "Preview a defined SVG file",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input type="file" /><img alt="Preview" />\n  <script>\n    const fileInput = document.querySelector("input"),\n      preview = document.querySelector("img");\n    fileInput.addEventListener("change", (event) => {\n      const file = event.target.files[0];\n      if (!file || !file.type.startsWith("image/")) return;\n      const reader = new FileReader();\n      reader.onload = () => {\n        preview.src = reader.result;\n        console.log(preview.src.startsWith("data:image/svg+xml;base64,"));\n      };\n      reader.onerror = () => console.log("Preview failed");\n      reader.readAsDataURL(file);\n    });\n    const transfer = new DataTransfer();\n    transfer.items.add(\n      new File(\n        [\'<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>\'],\n        "pixel.svg",\n        { type: "image/svg+xml" },\n      ),\n    );\n    fileInput.files = transfer.files;\n    fileInput.dispatchEvent(new Event("change"));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Skip a non-image file",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <input type="file" /><img alt="Preview" />\n  <script>\n    const input = document.querySelector("input"),\n      preview = document.querySelector("img");\n    input.addEventListener("change", (event) => {\n      const file = event.target.files[0];\n      if (!file || !file.type.startsWith("image/")) {\n        console.log("No image selected");\n        return;\n      }\n    });\n    const transfer = new DataTransfer();\n    transfer.items.add(\n      new File(["Hello"], "notes.txt", { type: "text/plain" }),\n    );\n    input.files = transfer.files;\n    input.dispatchEvent(new Event("change"));\n    console.log(preview.hasAttribute("src"));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Cancelable form reset events",
          explanation:
            "Handles a reset request before controls are restored and can prevent it.",
          note: "The examples use a defined confirmation function to keep them runnable without a blocking dialog; an interactive UI could provide the decision instead. The reset event runs before default restoration.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset_event",
          examples: [
            {
              label: "Cancel reset when confirmation is declined",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form><input name="username" value="john" /></form>\n  <script>\n    const form = document.querySelector("form");\n    function confirmReset() {\n      return false;\n    }\n    form.addEventListener("reset", (event) => {\n      if (!confirmReset()) event.preventDefault();\n    });\n    form.elements.username.value = "jane";\n    form.reset();\n    console.log(form.elements.username.value);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Allow reset and observe pre-reset state in the handler",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Forms example</title>\n<body>\n  <form><input name="username" value="john" /></form>\n  <script>\n    const form = document.querySelector("form");\n    form.addEventListener("reset", () =>\n      console.log("Before:", form.elements.username.value),\n    );\n    form.elements.username.value = "jane";\n    form.reset();\n    console.log("After:", form.elements.username.value);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Modern DOM APIs",
      id: "modern-dom-apis",
      intro:
        "Intersection Observer → viewport options, lazy loading, pagination, sticky markers, animation and reusable loading → Mutation Observer → configuration, mutation kinds, editor/dynamic-content batching and cleanup. Each complete HTML file runs independently in a rendered browser. Examples use actual observer delivery and defined finite work instead of claiming visibility or arbitrary DOM-property detection.",
      methods: [
        {
          name: "new IntersectionObserver()",
          explanation:
            "Watches when elements enter or leave a chosen visible area.",
          note: "Intersection is not proof of visual visibility: an element may be covered or transparent. Initial observation produces an entry even if the target is outside the root. Intersection ratio is an area ratio, not a screen-pixel count.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver",
          examples: [
            {
              label: "Mark an intersecting viewport target",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div class="target" id="target"></div>\n  <script>\n    const element = document.querySelector("#target");\n    const observer = new IntersectionObserver((entries) => {\n      for (const entry of entries)\n        if (entry.isIntersecting) {\n          entry.target.classList.add("visible");\n          console.log(\n            entry.target.id,\n            entry.isIntersecting,\n            entry.intersectionRatio,\n            entry.target.className,\n          );\n          observer.disconnect();\n        }\n    });\n    observer.observe(element);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Receive an initial outside-root entry",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div class="root"\n    ><div id="target" class="target" style="margin-top: 200px"></div\n  ></div>\n  <script>\n    const root = document.querySelector(".root");\n    const observer = new IntersectionObserver(\n      (entries) => {\n        console.log(entries[0].isIntersecting, entries[0].intersectionRatio);\n        observer.disconnect();\n      },\n      { root },\n    );\n    observer.observe(document.querySelector("#target"));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "IntersectionObserver.observe()",
          explanation: "Starts tracking an element with an existing observer.",
          note: "The options are fixed for that observer. Calling observe again for the same target does not create a duplicate target registration.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/observe",
          examples: [
            {
              label: "Observe several targets with one instance",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div class="target lazy" id="a"></div><div class="target lazy" id="b"></div>\n  <script>\n    const seen = new Set();\n    const observer = new IntersectionObserver((entries) => {\n      entries.forEach((entry) => {\n        if (entry.isIntersecting) seen.add(entry.target.id);\n      });\n      if (seen.size === 2) {\n        console.log(...[...seen].sort());\n        observer.disconnect();\n      }\n    });\n    document\n      .querySelectorAll(".lazy")\n      .forEach((element) => observer.observe(element));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Observe the same target only once",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div class="target" id="target"></div>\n  <script>\n    const target = document.querySelector("#target");\n    const observer = new IntersectionObserver((entries) => {\n      console.log(entries.length);\n      observer.disconnect();\n    });\n    observer.observe(target);\n    observer.observe(target);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "IntersectionObserver.unobserve()",
          explanation:
            "Stops tracking one target without removing other targets.",
          note: "It does not dispose the observer itself. A callback may already contain queued entries, so the callback should still check whether its work is current.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/unobserve",
          examples: [
            {
              label: "Unobserve a target while retaining another",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div class="target" id="a"></div><div class="target" id="b"></div>\n  <script>\n    const observer = new IntersectionObserver((entries) => {\n      console.log(...entries.map((entry) => entry.target.id).sort());\n      observer.disconnect();\n    });\n    const a = document.querySelector("#a"),\n      b = document.querySelector("#b");\n    observer.observe(a);\n    observer.observe(b);\n    observer.unobserve(a);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Reveal once and stop tracking the target",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div class="target" id="target"></div>\n  <script>\n    const observer = new IntersectionObserver((entries, currentObserver) => {\n      for (const entry of entries)\n        if (entry.isIntersecting) {\n          entry.target.classList.add("in-view");\n          currentObserver.unobserve(entry.target);\n          console.log(entry.target.classList.contains("in-view"));\n        }\n    });\n    observer.observe(document.querySelector("#target"));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "IntersectionObserver.disconnect()",
          explanation:
            "Stops tracking all targets associated with an observer.",
          note: "The observer can later observe new targets again; disconnect is not irreversible. Clean up other work started by the callback separately.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/disconnect",
          examples: [
            {
              label: "Disconnect before initial delivery",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div class="target" id="target"></div>\n  <script>\n    const observer = new IntersectionObserver(() => console.log("Not reached"));\n    observer.observe(document.querySelector("#target"));\n    observer.disconnect();\n    setTimeout(() => console.log("Disconnected"), 30);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Reuse an observer after disconnecting",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div class="target" id="target"></div>\n  <script>\n    const observer = new IntersectionObserver((entries) => {\n      console.log(entries[0].isIntersecting);\n      observer.disconnect();\n    });\n    observer.observe(document.querySelector("#target"));\n    observer.disconnect();\n    observer.observe(document.querySelector("#target"));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Intersection observer root and rootMargin",
          explanation:
            "Configures the reference viewport or ancestor and expands or shrinks its intersection area.",
          note: "root: null uses the viewport. A root element must contain its observed descendants in the applicable layout relationship. Expanded margins are prefetch geometry, not proof the target is physically visible.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin",
          examples: [
            {
              label: "Inspect root and normalized margins",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div class="root"></div>\n  <script>\n    const root = document.querySelector(".root");\n    const observer = new IntersectionObserver(() => {}, {\n      root,\n      rootMargin: "10px 20px",\n      threshold: 0.5,\n    });\n    console.log(\n      observer.root === root,\n      observer.rootMargin,\n      observer.thresholds[0],\n    );\n    observer.disconnect();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Intersect within an expanded root margin",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div class="root"\n    ><div class="target" id="target" style="margin-top: 120px"></div\n  ></div>\n  <script>\n    const root = document.querySelector(".root");\n    const observer = new IntersectionObserver(\n      (entries) => {\n        console.log(entries[0].isIntersecting);\n        observer.disconnect();\n      },\n      { root, rootMargin: "50px" },\n    );\n    observer.observe(document.querySelector("#target"));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Intersection thresholds",
          explanation:
            "Requests notifications when intersection ratios cross configured boundaries.",
          note: "A threshold controls notification boundaries, not an automatic minimum for every entry. Check both isIntersecting and the needed intersectionRatio in the callback; initial delivery still occurs.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds",
          examples: [
            {
              label: "Require at least half of a target",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div class="root"\n    ><div\n      id="target"\n      style="width: 100px; height: 100px; margin-top: 50px"\n    ></div\n  ></div>\n  <script>\n    const root = document.querySelector(".root");\n    const observer = new IntersectionObserver(\n      (entries) => {\n        const entry = entries[0];\n        console.log(\n          entry.isIntersecting && entry.intersectionRatio >= 0.5,\n          entry.intersectionRatio,\n        );\n        observer.disconnect();\n      },\n      { root, threshold: 0.5 },\n    );\n    observer.observe(document.querySelector("#target"));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Cross several thresholds by scrolling a fixed root",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div class="root"\n    ><div\n      id="target"\n      style="width: 100px; height: 100px; margin-top: 200px"\n    ></div\n  ></div>\n  <script>\n    const root = document.querySelector(".root");\n    let stage = 0;\n    const observer = new IntersectionObserver(\n      (entries) => {\n        console.log(entries[0].intersectionRatio);\n        if (stage++ === 0) root.scrollTop = 150;\n        else if (stage === 2) root.scrollTop = 200;\n        else observer.disconnect();\n      },\n      { root, threshold: [0, 0.25, 0.5, 0.75, 1] },\n    );\n    observer.observe(document.querySelector("#target"));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Lazy-load images with intersection",
          explanation:
            "Assigns an image source when the placeholder enters the observed area.",
          note: "The loaded class is set after the load event, not merely after assigning src. Provide dimensions so the placeholder has useful geometry. The examples use a self-contained one-pixel SVG.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver",
          examples: [
            {
              label: "Load a visible placeholder",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <img id="image" width="20" height="20" alt="Preview" />\n  <script>\n    const imageObserver = new IntersectionObserver((entries) => {\n      for (const entry of entries)\n        if (entry.isIntersecting) {\n          const img = entry.target;\n          img.addEventListener(\n            "load",\n            () => {\n              img.classList.add("loaded");\n              console.log(img.classList.contains("loaded"), img.naturalWidth);\n            },\n            { once: true },\n          );\n          img.addEventListener("error", () => console.log("Image failed"), {\n            once: true,\n          });\n          img.src = img.dataset.src;\n          imageObserver.unobserve(img);\n        }\n    });\n    const image = document.querySelector("img");\n    image.dataset.src =\n      "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221%22%20height%3D%221%22%2F%3E";\n    imageObserver.observe(image);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Keep a hidden-outside placeholder unloaded",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div style="height: 2000px"></div><img width="20" height="20" alt="Later" />\n  <script>\n    const image = document.querySelector("img");\n    image.dataset.src =\n      "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221%22%20height%3D%221%22%2F%3E";\n    const observer = new IntersectionObserver((entries) => {\n      console.log(entries[0].isIntersecting, image.hasAttribute("src"));\n      observer.disconnect();\n    });\n    observer.observe(image);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Infinite-scroll loading with a sentinel",
          explanation:
            "Observes a stable end marker to request the next page near the list’s end.",
          note: "The example intentionally stops after two simulated pages. Watching only the original last item without updating the target does not reliably follow an extending list. Async callback failures must be handled.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver",
          examples: [
            {
              label:
                "Load two finite pages while the sentinel remains near view",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div class="root"><div id="sentinel" style="height: 1px"></div></div>\n  <script>\n    const root = document.querySelector(".root"),\n      sentinel = document.querySelector("#sentinel");\n    let loading = false,\n      page = 0;\n    async function loadMoreItems() {\n      if (loading) return;\n      loading = true;\n      observer.unobserve(sentinel);\n      try {\n        await new Promise((resolve) => setTimeout(resolve, 5));\n        const item = document.createElement("div");\n        item.style.height = "20px";\n        item.textContent = `Page ${++page}`;\n        root.insertBefore(item, sentinel);\n        console.log(item.textContent);\n        if (page < 2) observer.observe(sentinel);\n        else observer.disconnect();\n      } catch (error) {\n        console.log(error.message);\n        observer.disconnect();\n      } finally {\n        loading = false;\n      }\n    }\n    const observer = new IntersectionObserver(\n      (entries) => {\n        if (entries.some((entry) => entry.isIntersecting)) loadMoreItems();\n      },\n      { root, rootMargin: "100px" },\n    );\n    observer.observe(sentinel);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Handle a failed page load without an unhandled rejection",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div class="root"><div id="sentinel" style="height: 1px"></div></div>\n  <script>\n    const root = document.querySelector(".root"),\n      sentinel = document.querySelector("#sentinel");\n    const observer = new IntersectionObserver(\n      (entries) => {\n        if (!entries.some((entry) => entry.isIntersecting)) return;\n        observer.unobserve(sentinel);\n        Promise.reject(new Error("Load failed")).catch((error) => {\n          console.log(error.message);\n          observer.disconnect();\n        });\n      },\n      { root },\n    );\n    observer.observe(sentinel);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Detect a sticky-header boundary",
          explanation:
            "Observes a small marker to toggle a header state as scrolling crosses a boundary.",
          note: "CSS controls actual sticky positioning. Not intersecting can mean above or below the root, so compare the sentinel’s position to rootBounds when specifically detecting that it passed the top boundary.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/rootBounds",
          examples: [
            {
              label: "Track entering and leaving the pinned region",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div class="root"\n    ><div class="header-sentinel" style="height: 1px"></div\n    ><header style="position: sticky; top: 0; height: 20px">Header</header\n    ><div style="height: 300px"></div\n  ></div>\n  <script>\n    const root = document.querySelector(".root"),\n      header = document.querySelector("header"),\n      sentinel = document.querySelector(".header-sentinel");\n    let stage = 0;\n    const observer = new IntersectionObserver(\n      (entries) => {\n        const entry = entries[0];\n        const pinned =\n          !entry.isIntersecting &&\n          entry.boundingClientRect.bottom < entry.rootBounds.top;\n        header.classList.toggle("sticky", pinned);\n        console.log(pinned);\n        if (stage++ === 0) root.scrollTop = 30;\n        else if (stage === 2) root.scrollTop = 0;\n        else observer.disconnect();\n      },\n      { root, threshold: 0 },\n    );\n    observer.observe(sentinel);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Do not classify a below-root sentinel as pinned",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div class="root"\n    ><header>Header</header><div style="height: 200px"></div\n    ><div class="header-sentinel" style="height: 1px"></div\n  ></div>\n  <script>\n    const root = document.querySelector(".root"),\n      header = document.querySelector("header"),\n      sentinel = document.querySelector(".header-sentinel");\n    const observer = new IntersectionObserver(\n      (entries) => {\n        const entry = entries[0];\n        console.log(\n          !entry.isIntersecting &&\n            entry.boundingClientRect.bottom < entry.rootBounds.top,\n        );\n        observer.disconnect();\n      },\n      { root },\n    );\n    observer.observe(sentinel);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Start animation on intersection",
          explanation:
            "Keeps an existing CSS animation paused until its element reaches the desired intersection.",
          note: "Define the animation in CSS first; animationPlayState alone does not create an animation. Check the requested ratio explicitly, and unobserve one-time targets after starting them.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver",
          examples: [
            {
              label: "Start a defined paused animation",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <style>\n    @keyframes reveal {\n      from {\n        opacity: 0;\n      }\n      to {\n        opacity: 1;\n      }\n    }\n    .animate-on-scroll {\n      width: 20px;\n      height: 20px;\n      animation: reveal 1s paused;\n    }</style\n  ><div class="animate-on-scroll"></div>\n  <script>\n    const element = document.querySelector(".animate-on-scroll");\n    const observer = new IntersectionObserver(\n      (entries) => {\n        for (const entry of entries)\n          if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {\n            entry.target.style.animationPlayState = "running";\n            observer.unobserve(entry.target);\n            console.log(getComputedStyle(entry.target).animationPlayState);\n          }\n      },\n      { threshold: 0.1 },\n    );\n    observer.observe(element);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Keep a nonintersecting animation paused",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <style>\n    @keyframes reveal {\n      from {\n        opacity: 0;\n      }\n      to {\n        opacity: 1;\n      }\n    }\n    .animate-on-scroll {\n      width: 20px;\n      height: 20px;\n      animation: reveal 1s paused;\n    }</style\n  ><div class="root"\n    ><div class="animate-on-scroll" style="margin-top: 200px"></div\n  ></div>\n  <script>\n    const root = document.querySelector(".root"),\n      element = document.querySelector(".animate-on-scroll");\n    const observer = new IntersectionObserver(\n      (entries) => {\n        console.log(\n          entries[0].isIntersecting,\n          getComputedStyle(element).animationPlayState,\n        );\n        observer.disconnect();\n      },\n      { root, threshold: 0.1 },\n    );\n    observer.observe(element);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Reusable LazyLoader component",
          explanation:
            "Encapsulates observer dispatch, type-specific initialization, and teardown.",
          note: "All methods are defined, including loadVideo and disconnect. The video fixture initializes controls without claiming to download or play a video; image completion still uses its load event.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver",
          examples: [
            {
              label: "Load an image through the component",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <img width="20" height="20" alt="Preview" />\n  <script>\n    class LazyLoader {\n      constructor() {\n        this.observer = new IntersectionObserver(\n          this.handleIntersection.bind(this),\n          { rootMargin: "50px" },\n        );\n      }\n      handleIntersection(entries) {\n        for (const entry of entries)\n          if (entry.isIntersecting) this.loadElement(entry.target);\n      }\n      loadElement(element) {\n        if (element.tagName === "IMG") element.src = element.dataset.src;\n        else if (element.classList.contains("video-container"))\n          this.loadVideo(element);\n        this.observer.unobserve(element);\n      }\n      loadVideo(element) {\n        const video = document.createElement("video");\n        video.controls = true;\n        video.preload = "none";\n        element.appendChild(video);\n        console.log("Video initialized", video.controls);\n      }\n      observe(element) {\n        this.observer.observe(element);\n      }\n      disconnect() {\n        this.observer.disconnect();\n      }\n    }\n    const image = document.querySelector("img"),\n      loader = new LazyLoader();\n    image.dataset.src =\n      "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221%22%20height%3D%221%22%2F%3E";\n    image.addEventListener(\n      "load",\n      () => {\n        console.log(image.naturalWidth);\n        loader.disconnect();\n      },\n      { once: true },\n    );\n    loader.observe(image);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Initialize an intersecting video container",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div class="video-container" style="width: 20px; height: 20px"></div>\n  <script>\n    class LazyLoader {\n      constructor() {\n        this.observer = new IntersectionObserver(\n          this.handleIntersection.bind(this),\n          { rootMargin: "50px" },\n        );\n      }\n      handleIntersection(entries) {\n        for (const entry of entries)\n          if (entry.isIntersecting) this.loadElement(entry.target);\n      }\n      loadElement(element) {\n        if (element.tagName === "IMG") element.src = element.dataset.src;\n        else if (element.classList.contains("video-container"))\n          this.loadVideo(element);\n        this.observer.unobserve(element);\n      }\n      loadVideo(element) {\n        const video = document.createElement("video");\n        video.controls = true;\n        video.preload = "none";\n        element.appendChild(video);\n        console.log("Video initialized", video.controls);\n      }\n      observe(element) {\n        this.observer.observe(element);\n      }\n      disconnect() {\n        this.observer.disconnect();\n      }\n    }\n    const loader = new LazyLoader();\n    loader.observe(document.querySelector(".video-container"));\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "new MutationObserver()",
          explanation: "Watches for changes to elements, attributes, or text.",
          note: "It does not detect every possible change: properties such as input.value, layout, and computed styles can change without matching DOM mutation records. Callback records describe mutations rather than a full historical DOM snapshot.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/MutationObserver",
          examples: [
            {
              label: "Inspect a child-list record",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div id="target"></div>\n  <script>\n    const target = document.querySelector("#target");\n    const observer = new MutationObserver((records) => {\n      const record = records[0];\n      console.log(\n        record.type,\n        record.target.id,\n        record.addedNodes.length,\n        record.removedNodes.length,\n        record.oldValue,\n      );\n      observer.disconnect();\n    });\n    observer.observe(target, { childList: true });\n    target.appendChild(document.createElement("span"));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Receive records after synchronous work",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div id="target"></div>\n  <script>\n    const target = document.querySelector("#target");\n    const observer = new MutationObserver(() => {\n      console.log("Observer callback");\n      observer.disconnect();\n    });\n    observer.observe(target, { childList: true });\n    target.append("text");\n    console.log("Synchronous change done");\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "MutationObserver.observe() configuration",
          explanation:
            "Selects change kinds, subtree coverage, attribute filtering, and optional old values.",
          note: "At least one mutation kind must be enabled. Old-value options record previous strings; new values are read from the current target. A large subtree can generate significant callback work.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe",
          examples: [
            {
              label: "Observe several filtered mutation kinds",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div id="target" class="old"><p>Before</p></div>\n  <script>\n    const target = document.querySelector("#target");\n    const observer = new MutationObserver((records) => {\n      console.log(...records.map((record) => record.type).sort());\n      console.log(\n        records.find((record) => record.type === "attributes").oldValue,\n        records.find((record) => record.type === "characterData").oldValue,\n      );\n      observer.disconnect();\n    });\n    observer.observe(target, {\n      childList: true,\n      attributes: true,\n      characterData: true,\n      subtree: true,\n      attributeOldValue: true,\n      characterDataOldValue: true,\n      attributeFilter: ["class", "style"],\n    });\n    target.className = "new";\n    target.firstElementChild.firstChild.data = "After";\n    target.appendChild(document.createElement("span"));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Reject a configuration with no mutation kind",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div id="target"></div>\n  <script>\n    const observer = new MutationObserver(() => {});\n    try {\n      observer.observe(document.querySelector("#target"), {});\n    } catch (error) {\n      console.log(error.name);\n    }\n    observer.disconnect();\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Observe added and removed child nodes",
          explanation:
            "Uses childList records to inspect inserted and removed nodes.",
          note: "addedNodes and removedNodes can contain text and comments, not only elements. Check nodeType before using element-specific properties.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord/addedNodes",
          examples: [
            {
              label: "Handle added elements and removed nodes",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div id="target"><span id="old">Old</span></div>\n  <script>\n    const target = document.querySelector("#target");\n    const observer = new MutationObserver((records) => {\n      for (const record of records) {\n        record.addedNodes.forEach((node) => {\n          if (node.nodeType === Node.ELEMENT_NODE)\n            console.log("Added:", node.tagName);\n        });\n        record.removedNodes.forEach((node) =>\n          console.log("Removed:", node.nodeName),\n        );\n      }\n      observer.disconnect();\n    });\n    observer.observe(target, { childList: true, subtree: true });\n    target.appendChild(document.createElement("div"));\n    target.querySelector("#old").remove();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Observe a nested child insertion",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div id="target"><section></section></div>\n  <script>\n    const target = document.querySelector("#target");\n    const observer = new MutationObserver((records) => {\n      console.log(records[0].target.tagName, records[0].addedNodes[0].nodeType);\n      observer.disconnect();\n    });\n    observer.observe(target, { childList: true, subtree: true });\n    target.querySelector("section").append("Nested text");\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Observe filtered attribute changes",
          explanation:
            "Tracks selected attribute updates and their previous values.",
          note: "A mutation record has oldValue, not a frozen new-value field. If the attribute changes repeatedly before delivery, reading the target returns its latest value for every record.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord/oldValue",
          examples: [
            {
              label: "Ignore attributes outside the filter",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div id="target" class="old"></div>\n  <script>\n    const target = document.querySelector("#target");\n    const observer = new MutationObserver((records) => {\n      console.log(\n        records.length,\n        records[0].attributeName,\n        records[0].oldValue,\n        target.getAttribute(records[0].attributeName),\n      );\n      observer.disconnect();\n    });\n    observer.observe(target, {\n      attributes: true,\n      attributeOldValue: true,\n      attributeFilter: ["class", "data-status"],\n    });\n    target.setAttribute("title", "Ignored");\n    target.className = "new";\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Distinguish old snapshots from the current new value",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div id="target"></div>\n  <script>\n    const target = document.querySelector("#target");\n    const observer = new MutationObserver((records) => {\n      records.forEach((record) =>\n        console.log(record.oldValue, target.getAttribute(record.attributeName)),\n      );\n      observer.disconnect();\n    });\n    observer.observe(target, {\n      attributes: true,\n      attributeOldValue: true,\n      attributeFilter: ["data-status"],\n    });\n    target.dataset.status = "one";\n    target.dataset.status = "two";\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Observe text-node character data",
          explanation:
            "Tracks edits to an existing Text node with characterData observation.",
          note: "Setting an element’s textContent usually replaces child nodes and produces childList records instead. Observe both types when an editor may modify text through either route.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord/type",
          examples: [
            {
              label: "Edit the existing Text node",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <p id="target">Before</p>\n  <script>\n    const textNode = document.querySelector("#target").firstChild;\n    const observer = new MutationObserver((records) => {\n      console.log(\n        records[0].type,\n        records[0].oldValue,\n        records[0].target.textContent,\n      );\n      observer.disconnect();\n    });\n    observer.observe(textNode, {\n      characterData: true,\n      characterDataOldValue: true,\n    });\n    textNode.data = "After";\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Replace text children through textContent",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <p id="target">Before</p>\n  <script>\n    const target = document.querySelector("#target");\n    const observer = new MutationObserver((records) => {\n      console.log(records[0].type);\n      observer.disconnect();\n    });\n    observer.observe(target, {\n      childList: true,\n      characterData: true,\n      subtree: true,\n    });\n    target.textContent = "After";\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Debounced editor autosave observation",
          explanation:
            "Watches editor content mutations and delays persistence until a quiet period.",
          note: "The defined saveContent logs the HTML instead of contacting a service. Cleanup must disconnect observation and cancel pending timers; saved HTML still needs an appropriate trust policy before later rendering. The finite demo disconnects after its first save.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver",
          examples: [
            {
              label: "Save the final state after a burst",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div contenteditable="true">Start</div>\n  <script>\n    const editor = document.querySelector("[contenteditable]");\n    let saveTimeout;\n    function saveContent(html) {\n      console.log("Saved:", html);\n    } // replace with application persistence\n    const observer = new MutationObserver(() => {\n      clearTimeout(saveTimeout);\n      saveTimeout = setTimeout(() => {\n        saveContent(editor.innerHTML);\n        observer.disconnect();\n      }, 10);\n    });\n    observer.observe(editor, {\n      childList: true,\n      characterData: true,\n      subtree: true,\n    });\n    function cleanup() {\n      observer.disconnect();\n      clearTimeout(saveTimeout);\n    }\n    editor.textContent = "Draft";\n    editor.textContent = "Final";\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Cancel pending observation on teardown",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div contenteditable="true">Start</div>\n  <script>\n    const editor = document.querySelector("[contenteditable]");\n    let saveTimeout;\n    function saveContent(html) {\n      console.log("Saved:", html);\n    } // replace with application persistence\n    const observer = new MutationObserver(() => {\n      clearTimeout(saveTimeout);\n      saveTimeout = setTimeout(() => {\n        saveContent(editor.innerHTML);\n        observer.disconnect();\n      }, 10);\n    });\n    observer.observe(editor, {\n      childList: true,\n      characterData: true,\n      subtree: true,\n    });\n    function cleanup() {\n      observer.disconnect();\n      clearTimeout(saveTimeout);\n    }\n    editor.textContent = "Discarded";\n    cleanup();\n    setTimeout(() => console.log("Stopped without saving"), 20);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Initialize dynamically added components",
          explanation:
            "Inspects newly inserted elements and their descendants for components needing setup.",
          note: "Checking only addedNodes themselves misses matching descendants. A WeakSet prevents duplicate initialization; this example observes child changes only so its data-attribute writes do not trigger itself.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver",
          examples: [
            {
              label: "Initialize a matching added element",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div id="container"></div>\n  <script>\n    const container = document.querySelector("#container"),\n      initialized = new WeakSet();\n    function initializeComponent(element) {\n      if (initialized.has(element)) return;\n      initialized.add(element);\n      element.dataset.initialized = "true";\n    }\n    function inspect(node) {\n      if (!(node instanceof Element)) return;\n      if (node.matches(".needs-init")) initializeComponent(node);\n      node.querySelectorAll(".needs-init").forEach(initializeComponent);\n    }\n    const observer = new MutationObserver((records) => {\n      records.forEach((record) => record.addedNodes.forEach(inspect));\n      console.log(container.querySelectorAll("[data-initialized]").length);\n      observer.disconnect();\n    });\n    observer.observe(container, { childList: true, subtree: true });\n    const element = document.createElement("div");\n    element.className = "needs-init";\n    container.appendChild(element);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Initialize matches inside an added wrapper",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div id="container"></div>\n  <script>\n    const container = document.querySelector("#container"),\n      initialized = new WeakSet();\n    function initializeComponent(element) {\n      if (initialized.has(element)) return;\n      initialized.add(element);\n      element.dataset.initialized = "true";\n    }\n    function inspect(node) {\n      if (!(node instanceof Element)) return;\n      if (node.matches(".needs-init")) initializeComponent(node);\n      node.querySelectorAll(".needs-init").forEach(initializeComponent);\n    }\n    const observer = new MutationObserver((records) => {\n      records.forEach((record) => record.addedNodes.forEach(inspect));\n      console.log(container.querySelectorAll("[data-initialized]").length);\n      observer.disconnect();\n    });\n    observer.observe(container, { childList: true, subtree: true });\n    const wrapper = document.createElement("section");\n    wrapper.innerHTML =\n      \'<p class="needs-init">A</p><div><p class="needs-init">B</p></div>\';\n    container.appendChild(wrapper);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "Batch mutation processing",
          explanation:
            "Collects relevant nodes across a delivered record batch before processing them.",
          note: "MutationObserver already batches delivery, but one callback can contain multiple records. Deduplicate nodes when processing should happen once, and avoid mutations that recursively trigger the same observer without a guard.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver",
          examples: [
            {
              label: "Process added elements as one application batch",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div id="container"></div>\n  <script>\n    const container = document.querySelector("#container");\n    function processBatch(elements) {\n      console.log(\n        elements.length,\n        ...elements.map((element) => element.tagName),\n      );\n    }\n    const observer = new MutationObserver((records) => {\n      const added = new Set();\n      records.forEach((record) =>\n        record.addedNodes.forEach((node) => {\n          if (node.nodeType === 1) added.add(node);\n        }),\n      );\n      if (added.size) processBatch([...added]);\n      observer.disconnect();\n    });\n    observer.observe(container, { childList: true });\n    container.appendChild(document.createElement("p"));\n    container.appendChild(document.createElement("span"));\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Deduplicate a node added twice within the same batch",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div id="container"></div>\n  <script>\n    const container = document.querySelector("#container");\n    const observer = new MutationObserver((records) => {\n      const added = new Set();\n      records.forEach((record) =>\n        record.addedNodes.forEach((node) => {\n          if (node.nodeType === 1 && container.contains(node)) added.add(node);\n        }),\n      );\n      console.log(added.size);\n      observer.disconnect();\n    });\n    observer.observe(container, { childList: true });\n    const node = document.createElement("p");\n    container.appendChild(node);\n    node.remove();\n    container.appendChild(node);\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "MutationObserver.takeRecords()",
          explanation:
            "Returns queued undelivered records and empties the observer’s record queue.",
          note: "It does not call the callback or stop future observation. Calling disconnect without first taking records discards undelivered records.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/takeRecords",
          examples: [
            {
              label: "Drain pending records synchronously",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div id="target"></div>\n  <script>\n    const target = document.querySelector("#target");\n    const observer = new MutationObserver(() => console.log("Not reached"));\n    observer.observe(target, { childList: true });\n    target.append("Text");\n    const records = observer.takeRecords();\n    console.log(records.length, records[0].type, observer.takeRecords().length);\n    observer.disconnect();\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Continue observing after taking records",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div id="target"></div>\n  <script>\n    const target = document.querySelector("#target");\n    const observer = new MutationObserver((records) => {\n      console.log("Later:", records.length);\n      observer.disconnect();\n    });\n    observer.observe(target, { childList: true });\n    target.append("First");\n    console.log("Taken:", observer.takeRecords().length);\n    target.append("Second");\n  </script></body\n>',
                },
              ],
            },
          ],
        },
        {
          name: "MutationObserver.disconnect()",
          explanation:
            "Stops observation and removes pending undelivered records.",
          note: "Take records first if those pending changes must be processed. The same observer can be configured again with observe; disconnect is not a permanent destruction operation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/disconnect",
          examples: [
            {
              label: "Discard pending delivery on cleanup",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div id="target"></div>\n  <script>\n    const target = document.querySelector("#target");\n    const observer = new MutationObserver(() => console.log("Not reached"));\n    observer.observe(target, { childList: true });\n    target.append("Text");\n    observer.disconnect();\n    console.log(observer.takeRecords().length);\n  </script></body\n>',
                },
              ],
            },
            {
              label: "Reuse the instance after disconnect",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Modern DOM observer example</title>\n<style>\n  body {\n    margin: 0;\n  }\n  .root {\n    width: 100px;\n    height: 100px;\n    overflow: hidden;\n  }\n  .target {\n    width: 100px;\n    height: 20px;\n  }\n</style>\n<body>\n  <div id="target"></div>\n  <script>\n    const target = document.querySelector("#target");\n    const observer = new MutationObserver((records) => {\n      console.log(records[0].type);\n      observer.disconnect();\n    });\n    observer.observe(target, { childList: true });\n    observer.disconnect();\n    observer.observe(target, { attributes: true });\n    target.setAttribute("data-state", "ready");\n  </script></body\n>',
                },
              ],
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
    head.append(copy);
    const pre = node("pre");
    pre.tabIndex = 0;
    pre.setAttribute("aria-label", example.label);
    const code = node(
      "code",
      example.code,
      "language-" + (example.language || "javascript"),
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
          "dom-manipulation-cheatsheet:" +
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
                language: file.language || "javascript",
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
