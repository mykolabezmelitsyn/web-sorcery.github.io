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
            "Returns the first element matching a CSS selector, or null when none matches. Use it to select an element by class, ID, or attribute.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<p id="intro" class="class-name">First</p>\n<p class="class-name">Second</p>\n<script>\nconst byClass = document.querySelector(".class-name");\nconst byId = document.querySelector("#intro");\nconsole.log(byClass.textContent, byClass === byId); // "First", true\n</script>',
                },
              ],
            },
            {
              label: "Select by exact data attribute",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<button data-id="123">Open</button>\n<script>\nconst element = document.querySelector(\'[data-id="123"]\');\nconsole.log(element.textContent, document.querySelector(".missing")); // "Open", null\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "document.querySelectorAll()",
          explanation:
            "Returns a static NodeList containing every matching element in document order. Use it when a selector can match several elements.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<div class="class-name active">A</div>\n<div class="class-name">B</div>\n<script>\nconsole.log(document.querySelectorAll(".class-name").length);\nconsole.log(document.querySelectorAll("div.active")[0].textContent);\n</script>',
                },
              ],
            },
            {
              label: "Select checked checkboxes",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<input type="checkbox" value="a" checked>\n<input type="checkbox" value="b">\n<input type="checkbox" value="c" checked>\n<script>\nconst elements = document.querySelectorAll(\'[type="checkbox"]:checked\');\nconsole.log(elements.length, elements[0].value, elements[1].value);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Convert a NodeList to an array",
          explanation:
            "Copies NodeList membership into an ordinary array. Use Array.from or spread to access array operations such as map.",
          note: "The copy contains references to the same elements; it does not clone nodes.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/NodeList",
          examples: [
            {
              label: "Convert with Array.from",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<p class="item">A</p><p class="item">B</p>\n<script>\nconst array = Array.from(document.querySelectorAll(".item"));\nconsole.log(Array.isArray(array), ...array.map(item => item.textContent));\n</script>',
                },
              ],
            },
            {
              label: "Convert with spread",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<p class="item">A</p>\n<script>\nconst nodes = document.querySelectorAll(".item");\nconst array = [...nodes];\nconsole.log(Array.isArray(array), array[0] === nodes[0]);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Attribute selectors",
          explanation:
            "Matches elements by attribute presence, exact value, word membership, or text patterns. Use CSS attribute selectors when IDs or classes alone are insufficient.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<p data-id="123" class="active card">Selected</p>\n<script>\nconsole.log(document.querySelector("[data-id]").textContent);\nconsole.log(document.querySelector(\'[data-id="123"]\') === document.querySelector(\'[class~="active"]\'));\n</script>',
                },
              ],
            },
            {
              label: "Match link prefixes, suffixes, and substrings",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<a href="https://google.example/report.pdf">Report</a>\n<script>\nconst starts = document.querySelector(\'[href^="https"]\');\nconst ends = document.querySelector(\'[href$=".pdf"]\');\nconst contains = document.querySelector(\'[href*="google"]\');\nconsole.log(starts.textContent, starts === ends, ends === contains);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Pseudo-class selectors",
          explanation:
            "Selects elements according to structural position or conditions. Use pseudo-classes to express first, last, indexed, or excluded matches.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<ul><li>One</li><li>Two</li><li>Three</li><li>Four</li></ul>\n<script>\nconsole.log(document.querySelector("li:first-child").textContent, document.querySelector("li:last-child").textContent, document.querySelector("li:nth-child(3)").textContent);\n</script>',
                },
              ],
            },
            {
              label: "Select the first paragraph and exclude submit inputs",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<section><h2>Title</h2><p>First paragraph</p><p>Second</p></section>\n<input type="submit" value="Send"><input type="text" value="Name">\n<script>\nconsole.log(document.querySelector("p:first-of-type").textContent);\nconsole.log(document.querySelector(\'input:not([type="submit"])\').value);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "CSS combinators",
          explanation:
            "Combines selector parts to express child, descendant, or sibling relationships. Use it to target elements by their surrounding structure.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<div id="box"><section><p>Nested</p></section><p>Direct</p></div>\n<script>\nconsole.log(document.querySelector("#box > p").textContent, document.querySelector("#box p").textContent);\n</script>',
                },
              ],
            },
            {
              label: "Compare adjacent and general siblings",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<h2>Heading</h2><p>Adjacent</p><span>Gap</span><p>Later</p>\n<script>\nconsole.log(document.querySelector("h2 + p").textContent);\nconsole.log(...Array.from(document.querySelectorAll("h2 ~ p"), p => p.textContent));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Multiple selectors",
          explanation:
            "Uses a comma-separated selector list to match any listed alternative. Use it to query several heading levels or unrelated component types in one pass.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<h2>Second level</h2><h1>First level</h1><h3>Third level</h3>\n<script>\nconsole.log(...Array.from(document.querySelectorAll("h1, h2, h3"), item => item.textContent));\n</script>',
                },
              ],
            },
            {
              label: "Combine types without duplicate membership",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<div class="active highlight">A</div><span class="highlight">B</span>\n<script>\nconst elements = document.querySelectorAll("div.active, span.highlight, .highlight");\nconsole.log(elements.length, ...Array.from(elements, item => item.textContent));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Scoped element queries",
          explanation:
            "Queries descendants through a selected parent element. Use it to limit result membership to a component container.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<p class="item">Outside</p><section class="container"><p class="item">Inside A</p><p class="item">Inside B</p></section>\n<script>\nconst container = document.querySelector(".container");\nconst items = container.querySelectorAll(".item");\nconst firstItem = container.querySelector(".item");\nconsole.log(items.length, firstItem.textContent);\n</script>',
                },
              ],
            },
            {
              label: "Limit a query to direct children with :scope",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<div class="container"><p class="item">Direct</p><section><p class="item">Nested</p></section></div>\n<script>\nconst container = document.querySelector(".container");\nconsole.log(container.querySelectorAll(".item").length, container.querySelectorAll(":scope > .item").length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Check for an element before using it",
          explanation:
            "Tests a query result for null before accessing element properties. Use it for optional UI elements that may be absent.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<div class="modal" style="display:none">Dialog</div>\n<script>\nconst modal = document.querySelector(".modal");\nif (modal) modal.style.display = "block";\nconsole.log(modal.style.display);\n</script>',
                },
              ],
            },
            {
              label: "Handle a missing modal",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<p>No modal here</p>\n<script>\nconst modal = document.querySelector(".modal");\nif (modal) modal.style.display = "block";\nelse console.log("Modal absent");\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "NodeList.forEach()",
          explanation:
            "Visits the nodes in a NodeList without converting it into an array. Use it to apply an operation to each querySelectorAll match.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<p class="item">A</p><p class="item">B</p>\n<script>\ndocument.querySelectorAll(".item").forEach(item => item.classList.add("processed"));\nconsole.log(document.querySelectorAll(".item.processed").length);\n</script>',
                },
              ],
            },
            {
              label: "Remove the matched class during snapshot iteration",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<p class="item">A</p><p class="item">B</p>\n<script>\nconst items = document.querySelectorAll(".item");\nitems.forEach(item => item.classList.remove("item"));\nconsole.log(items.length, document.querySelectorAll(".item").length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "document.getElementById()",
          explanation:
            "Returns the element with the exact ID string, or null when it is absent. Use it for a known unique document ID.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<header id="header">Header</header><button id="submit-btn">Send</button>\n<script>\nconst header = document.getElementById("header");\nconst submitBtn = document.getElementById("submit-btn");\nconsole.log(header.textContent, submitBtn.textContent);\n</script>',
                },
              ],
            },
            {
              label: "Use a raw ID rather than a CSS selector",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<header id="header">Header</header>\n<script>\nconsole.log(document.getElementById("#header"), document.getElementById("header").textContent);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "getElementsByClassName()",
          explanation:
            "Returns a live HTMLCollection of elements with all the requested classes. Use it for class-based selection when live membership is useful.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<p class="item">A</p><p class="item">B</p>\n<script>\nconst items = document.getElementsByClassName("item");\nconsole.log(items.length, items[0].textContent);\n</script>',
                },
              ],
            },
            {
              label: "Require multiple classes",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<p class="active highlight">Both</p><p class="active">One</p>\n<script>\nconst active = document.getElementsByClassName("active highlight");\nconsole.log(active.length, active[0].textContent);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Convert an HTMLCollection to an array",
          explanation:
            "Creates a stable array snapshot from a live HTMLCollection. Use it for array operations or when mutations should not shift iteration membership.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<p class="item">A</p><p class="item">B</p>\n<script>\nconst items = document.getElementsByClassName("item");\nconst array = Array.from(items);\nconsole.log(Array.isArray(array), ...array.map(item => item.textContent));\n</script>',
                },
              ],
            },
            {
              label: "Use spread before changing live membership",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<p class="item">A</p><p class="item">B</p>\n<script>\nconst items = document.getElementsByClassName("item");\nconst array = [...items];\narray.forEach(item => item.classList.remove("item"));\nconsole.log(array.length, items.length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "getElementsByTagName()",
          explanation:
            "Returns a live HTMLCollection of descendant elements with a given tag name. Use * to include every descendant element.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<div>A</div><div>B</div><img alt="Example">\n<script>\nconsole.log(document.getElementsByTagName("div").length, document.getElementsByTagName("img")[0].alt);\n</script>',
                },
              ],
            },
            {
              label: "Select all descendants of a container",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<section id="container"><p>One <strong>bold</strong></p><span>Two</span></section>\n<script>\nconst container = document.getElementById("container");\nconst all = container.getElementsByTagName("*");\nconsole.log(all.length, ...Array.from(all, element => element.tagName));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "document.getElementsByName()",
          explanation:
            "Returns a live NodeList of elements with the exact name attribute. Use it for form controls such as related radio buttons.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<input name="email" value="first@example.com"><input name="email" value="second@example.com">\n<script>\nconst emailInputs = document.getElementsByName("email");\nconsole.log(emailInputs.length, emailInputs[0].value);\n</script>',
                },
              ],
            },
            {
              label: "Find the selected radio in a group",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<input type="radio" name="color" value="red"><input type="radio" name="color" value="blue" checked>\n<script>\nconst radioButtons = document.getElementsByName("color");\nconst selectedRadio = Array.from(radioButtons).find(radio => radio.checked);\nconsole.log(selectedRadio?.value);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Live collections",
          explanation:
            "Updates collection membership as the matching DOM changes. Use it deliberately when later reads should reflect additions, removals, or class changes.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<div class="item">A</div><div class="item">B</div><div class="item">C</div>\n<script>\nconst liveItems = document.getElementsByClassName("item");\nconsole.log(liveItems.length);\nconst item = document.createElement("div"); item.className = "item"; item.textContent = "New";\ndocument.body.append(item);\nconsole.log(liveItems.length);\n</script>',
                },
              ],
            },
            {
              label: "Observe a live NodeList update",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<input name="email">\n<script>\nconst inputs = document.getElementsByName("email");\nconsole.log(inputs.length);\nconst input = document.createElement("input"); input.name = "email";\ndocument.body.append(input);\nconsole.log(inputs.length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Static querySelectorAll snapshots",
          explanation:
            "Keeps query membership fixed after selection even as the DOM changes. Use it for stable iteration and query again when current membership is needed.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<div class="item">A</div><div class="item">B</div><div class="item">C</div>\n<script>\nconst staticItems = document.querySelectorAll(".item");\nconst item = document.createElement("div"); item.className = "item";\ndocument.body.append(item);\nconsole.log(staticItems.length, document.querySelectorAll(".item").length);\n</script>',
                },
              ],
            },
            {
              label: "Keep a reference while the node itself changes",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Element selection example</title>\n<body>\n<p class="item">Before</p>\n<script>\nconst items = document.querySelectorAll(".item");\nitems[0].textContent = "After";\nconsole.log(items.length, items[0].textContent, items[0] === document.querySelector(".item"));\n</script>',
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
          explanation:
            "Creates an element that is initially detached from the document. Use it to build DOM nodes before inserting them.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n\n<script>\nconst div = document.createElement("div");\nconst span = document.createElement("span");\nconst button = document.createElement("button");\nconst input = document.createElement("input");\nconsole.log(div.tagName, span.tagName, button.tagName, input.tagName, div.isConnected);\n</script>',
                },
              ],
            },
            {
              label: "Build and attach a simple card",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n<main id="cards"></main>\n<script>\nconst div = document.createElement("div");\ndiv.className = "card";\ndiv.textContent = "Hello World";\ndocument.querySelector("#cards").appendChild(div);\nconsole.log(div.textContent, div.isConnected);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Configure new element properties",
          explanation:
            "Sets properties such as className, id, textContent, style, and link attributes before insertion. Use it to prepare a complete element in memory.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n\n<script>\nconst card = document.createElement("div");\ncard.className = "card active";\ncard.id = "card-1";\ncard.textContent = "Card content";\ncard.style.backgroundColor = "#f0f0f0";\nconsole.log(card.id, card.className, card.textContent, card.style.backgroundColor, card.isConnected);\n</script>',
                },
              ],
            },
            {
              label: "Create a link with attributes",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n\n<script>\nconst link = document.createElement("a");\nlink.href = "https://example.com";\nlink.textContent = "Click me";\nlink.target = "_blank";\nlink.rel = "noopener";\nconsole.log(link.getAttribute("href"), link.textContent, link.target, link.rel);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Node.cloneNode()",
          explanation:
            "Copies a node and its attributes, optionally including its descendants. Use a shallow clone for just the element or a deep clone for its subtree.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n<div class="card" id="original"><h3>Title</h3><p>Content</p></div>\n<script>\nconst original = document.querySelector(".card");\nconst shallow = original.cloneNode(false);\nconst deep = original.cloneNode(true);\nshallow.id = "shallow"; deep.id = "deep";\nconsole.log(shallow.className, shallow.childNodes.length, deep.querySelector("p").textContent, deep.isConnected);\n</script>',
                },
              ],
            },
            {
              label: "Verify that the copied subtree is independent",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n<div class="card"><p>Original</p></div>\n<script>\nconst original = document.querySelector(".card");\nconst clone = original.cloneNode(true);\nclone.querySelector("p").textContent = "Changed";\nconsole.log(original.querySelector("p").textContent, clone.querySelector("p").textContent);\n</script>',
                },
              ],
            },
            {
              label: "Observe that addEventListener listeners are not cloned",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n<button id="original">Run</button>\n<script>\nconst original = document.querySelector("button");\nlet clicks = 0;\noriginal.addEventListener("click", () => clicks++);\nconst clone = original.cloneNode(true); clone.id = "copy";\ndocument.body.appendChild(clone);\noriginal.click(); clone.click();\nconsole.log(clicks); // 1\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Clone and customize an existing card",
          explanation:
            "Reuses an existing DOM subtree and edits its copy. Use it for repeated components that share structure.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n<article class="template"><h3>Old Title</h3><p>Old Content</p></article><main id="cards"></main>\n<script>\nconst template = document.querySelector(".template");\nconst newCard = template.cloneNode(true);\nnewCard.className = "card";\nnewCard.querySelector("h3").textContent = "New Title";\nnewCard.querySelector("p").textContent = "New Content";\ndocument.querySelector("#cards").appendChild(newCard);\nconsole.log(template.querySelector("h3").textContent, newCard.querySelector("h3").textContent, newCard.querySelector("p").textContent);\n</script>',
                },
              ],
            },
            {
              label: "Give the inserted clone a unique ID",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n<article id="card-1" class="card"><h3>First</h3></article>\n<script>\nconst clone = document.querySelector(".card").cloneNode(true);\nclone.id = "card-2";\nclone.querySelector("h3").textContent = "Second";\ndocument.body.appendChild(clone);\nconsole.log(document.querySelectorAll("#card-1").length, document.querySelector("#card-2 h3").textContent);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "document.createDocumentFragment()",
          explanation:
            "Creates a detached container for assembling nodes before moving them into the document. Use it to organize a group of related insertions.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n<ul id="items"></ul>\n<script>\nconst fragment = document.createDocumentFragment();\nfor (let i = 0; i < 100; i++) {\n  const li = document.createElement("li"); li.textContent = `Item ${i}`;\n  fragment.appendChild(li);\n}\nconst list = document.querySelector("#items");\nlist.appendChild(fragment);\nconsole.log(list.children.length, list.lastElementChild.textContent, fragment.childNodes.length);\n</script>',
                },
              ],
            },
            {
              label: "Move existing nodes without cloning them",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n<div id="source"><button>Run</button></div><div id="target"></div>\n<script>\nconst button = document.querySelector("button");\nbutton.addEventListener("click", () => console.log("Still listening"));\nconst fragment = document.createDocumentFragment();\nfragment.appendChild(button);\ndocument.querySelector("#target").appendChild(fragment);\nconsole.log(document.querySelector("#source").children.length, document.querySelector("#target button") === button);\nbutton.click();\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "HTML template content",
          explanation:
            "Parses reusable markup into a template element’s detached content fragment. Clone that content when creating repeated instances.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n<main id="cards"></main>\n<script>\nconst template = document.createElement("template");\ntemplate.innerHTML = `<div class="card"><h3>Title</h3><p>Content</p></div>`;\nconst element = template.content.firstElementChild.cloneNode(true);\ndocument.querySelector("#cards").appendChild(element);\nconsole.log(element.querySelector("h3").textContent, template.content.children.length);\n</script>',
                },
              ],
            },
            {
              label: "Clone all content from an HTML template",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n<template id="row"><h3>Title</h3><p>Content</p></template><section id="target"></section>\n<script>\nconst template = document.querySelector("#row");\nconst content = template.content.cloneNode(true);\ndocument.querySelector("#target").appendChild(content);\nconsole.log(document.querySelector("#target").children.length, template.content.children.length, content.childNodes.length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.innerHTML",
          explanation:
            "Reads or replaces an element’s child markup by parsing an HTML string. Use it for trusted static markup or to clear a container.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n<div class="container"><button>Old</button></div>\n<script>\nconst container = document.querySelector(".container");\nconst old = container.firstElementChild;\ncontainer.innerHTML = "<h1>New Title</h1><p>New paragraph</p>";\nconsole.log(container.querySelector("h1").textContent, old.isConnected);\ncontainer.innerHTML = "";\nconsole.log(container.childNodes.length);\n</script>',
                },
              ],
            },
            {
              label: "Build a trusted article and a fixed-data list",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n<div class="container"></div>\n<script>\nconst article = document.createElement("article");\narticle.innerHTML = "<h2>Article Title</h2><p>Article content goes here</p><footer>Published today</footer>";\nconst data = ["Apple", "Banana", "Orange"];\nconst container = document.querySelector(".container");\ncontainer.innerHTML = `<ul class="fruit-list">${data.map(item => `<li>${item}</li>`).join("")}</ul>`;\nconsole.log(article.querySelector("footer").textContent, container.querySelectorAll("li").length, container.querySelector("li").textContent);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.insertAdjacentHTML()",
          explanation:
            "Parses an HTML string and inserts nodes relative to an element without replacing its existing children. Use it to insert trusted markup at a specific position.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n<ul id="items"><li><button>Existing</button></li></ul>\n<script>\nconst list = document.querySelector("#items"), button = list.querySelector("button");\nbutton.addEventListener("click", () => console.log("Listener preserved"));\nconst newItems = ["Item 1", "Item 2", "Item 3"];\nnewItems.forEach(item => list.insertAdjacentHTML("beforeend", `<li>${item}</li>`));\nconsole.log(list.children.length, list.querySelector("button") === button);\nbutton.click();\n</script>',
                },
              ],
            },
            {
              label: "Insert the first and last children",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n<div class="target"><p>Middle</p></div>\n<script>\nconst element = document.querySelector(".target");\nelement.insertAdjacentHTML("afterbegin", \'<div class="first">First child</div>\');\nelement.insertAdjacentHTML("beforeend", \'<div class="last">Last child</div>\');\nconsole.log(element.firstElementChild.textContent, element.lastElementChild.textContent);\n</script>',
                },
              ],
            },
            {
              label: "Insert immediately before and after an element",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n<main><div class="target">Target</div></main>\n<script>\nconst element = document.querySelector(".target");\nelement.insertAdjacentHTML("beforebegin", \'<div class="before">Before element</div>\');\nelement.insertAdjacentHTML("afterend", \'<div class="after">After element</div>\');\nconsole.log(element.previousElementSibling.textContent, element.nextElementSibling.textContent);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.insertAdjacentElement()",
          explanation:
            "Inserts an existing Element at one of the four adjacent positions. Use it when a node is already constructed instead of reparsing an HTML string.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n<section><div class="target">Target</div></section>\n<script>\nconst element = document.querySelector(".target");\nconst newDiv = document.createElement("div"); newDiv.textContent = "After";\nconst inserted = element.insertAdjacentElement("afterend", newDiv);\nconsole.log(inserted === newDiv, element.nextElementSibling.textContent);\n</script>',
                },
              ],
            },
            {
              label: "Move an existing button into another element",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n<section id="source"><button>Move</button></section><section id="target"></section>\n<script>\nconst button = document.querySelector("button");\nbutton.addEventListener("click", () => console.log("Moved listener"));\ndocument.querySelector("#target").insertAdjacentElement("afterbegin", button);\nconsole.log(document.querySelector("#source").children.length, document.querySelector("#target").firstElementChild === button);\nbutton.click();\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.insertAdjacentText()",
          explanation:
            "Inserts a string as a text node at a relative position. Use it for plain external text that should not be interpreted as HTML.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n<div class="target"></div>\n<script>\nconst element = document.querySelector(".target");\nconst userText = "<b>Not bold</b>";\nelement.insertAdjacentText("beforeend", userText);\nconsole.log(element.textContent, element.querySelector("b"));\n</script>',
                },
              ],
            },
            {
              label: "Display script-looking input as text",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n<div class="target">Middle</div>\n<script>\nconst element = document.querySelector(".target");\nconst userText = "<scr" + \'ipt>alert("XSS")</scr\' + "ipt>";\nelement.insertAdjacentText("afterbegin", userText);\nconsole.log(element.firstChild.nodeType, element.querySelectorAll("script").length, element.textContent.endsWith("Middle"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Build lists with nodes or a single HTML assignment",
          explanation:
            "Builds a larger list through explicit element construction or one trusted-markup replacement. Choose based on data trust, readability, and whether existing nodes must survive.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n<ul id="items"></ul>\n<script>\nconst list = document.querySelector("#items");\nfor (let i = 0; i < 100; i++) {\n  const li = document.createElement("li"); li.textContent = `Item ${i}`;\n  list.appendChild(li);\n}\nconsole.log(list.children.length, list.firstElementChild.textContent, list.lastElementChild.textContent);\n</script>',
                },
              ],
            },
            {
              label: "Assign one trusted generated markup string",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Creating elements example</title>\n<body>\n<ul id="items"></ul>\n<script>\nconst list = document.querySelector("#items");\nconst items = Array.from({ length: 100 }, (_, i) => `<li>Item ${i}</li>`);\nlist.innerHTML = items.join("");\nconsole.log(list.children.length, list.firstElementChild.textContent, list.lastElementChild.textContent);\n</script>',
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
            "Reads descendant text or replaces children with a text node. Use it when content must remain plain text rather than parsed markup.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<div class="content"></div>\n<script>\nconst div = document.querySelector(".content");\nconst userInput = "<b>Bold</b>";\ndiv.textContent = userInput;\nconsole.log(div.textContent, div.querySelector("b"));\n</script>',
                },
              ],
            },
            {
              label: "Read hidden descendant text",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<div class="content">Visible<span style="display:none">Hidden</span></div>\n<script>\nconsole.log(document.querySelector(".content").textContent);\n</script>',
                },
              ],
            },
            {
              label: "Clear and append plain text",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<div class="content"><strong>Old</strong></div>\n<script>\nconst div = document.querySelector(".content");\ndiv.textContent = "";\ndiv.textContent = "Hello";\ndiv.textContent += " Additional text";\nconsole.log(div.textContent, div.children.length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "HTMLElement.innerText",
          explanation:
            "Reads rendered text or replaces content using text with rendered line breaks. Use it when text should follow the element’s rendered presentation.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<div class="content">Visible<span style="display:none">Hidden</span></div>\n<script>\nconst div = document.querySelector(".content");\nconsole.log(div.innerText, div.textContent);\n</script>',
                },
              ],
            },
            {
              label: "Set text containing a line break",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<div class="content"></div>\n<script>\nconst div = document.querySelector(".content");\ndiv.innerText = "Line 1\\nLine 2";\nconsole.log(div.innerText, div.querySelectorAll("br").length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.innerHTML",
          explanation:
            "Serializes an element’s child markup or replaces its children by parsing a string. Use trusted markup or sanitized HTML when actual elements are required.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<div class="content"></div>\n<script>\nconst div = document.querySelector(".content");\ndiv.innerHTML = "<p>Paragraph</p><span>Span</span>";\nconsole.log(div.innerHTML);\nconst items = ["Apple", "Banana", "Orange"];\ndiv.innerHTML = `<h3>Fruits</h3><ul>${items.map(item => `<li>${item}</li>`).join("")}</ul>`;\nconsole.log(div.querySelector("h3").textContent, div.querySelectorAll("li").length);\n</script>',
                },
              ],
            },
            {
              label: "Observe node replacement after +=",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<div class="content"><button>Run</button></div>\n<script>\nconst div = document.querySelector(".content"), oldButton = div.querySelector("button");\nlet clicks = 0;\noldButton.addEventListener("click", () => clicks++);\ndiv.innerHTML += "<p>New paragraph</p>";\ndiv.querySelector("button").click();\nconsole.log(oldButton.isConnected, div.querySelector("button") === oldButton, clicks);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.outerHTML",
          explanation:
            "Serializes an element including its own tag or replaces it in its parent with parsed markup. Use it when the entire element should be replaced.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<section><p class="old">Original</p></section>\n<script>\nconst element = document.querySelector(".old");\nconsole.log(element.outerHTML);\nelement.outerHTML = \'<div class="new">Replaced element</div>\';\nconsole.log(element.isConnected, document.querySelector(".new").textContent, element.tagName);\n</script>',
                },
              ],
            },
            {
              label: "Observe parentless assignment",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n\n<script>\nconst detached = document.createElement("div");\ndetached.outerHTML = "<span>New</span>";\nconsole.log(detached.outerHTML); // "<div></div>"\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Compare text and HTML content APIs",
          explanation:
            "Chooses plain text, rendered text, or parsed markup based on the intended result. Use explicit text setters for text and HTML setters only when markup is required.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<div id="plain"></div><div id="markup"></div>\n<script>\nconst plain = document.querySelector("#plain"), markup = document.querySelector("#markup");\nplain.textContent = "<b>Bold</b>";\nmarkup.innerHTML = "<b>Bold</b>";\nconsole.log(plain.textContent, plain.children.length, markup.textContent, markup.firstElementChild.tagName);\n</script>',
                },
              ],
            },
            {
              label: "Distinguish newline text from inserted br elements",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<div id="plain"></div><div id="rendered"></div>\n<script>\nconst plain = document.querySelector("#plain"), rendered = document.querySelector("#rendered");\nplain.textContent = "Line 1\\nLine 2";\nrendered.innerText = "Line 1\\nLine 2";\nconsole.log(plain.querySelectorAll("br").length, rendered.querySelectorAll("br").length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "DOMPurify.sanitize() for required HTML",
          explanation:
            "Sanitizes an external HTML string before assigning it to an HTML sink. Use a maintained sanitizer when the intended output permits markup rather than plain text.",
          note: "In an isolated example folder run npm install dompurify, save index.html, and open it with node_modules alongside it. Keep DOMPurify updated. These use the HTML-only profile and do not alter the sanitized result afterward. Plain text still belongs in textContent.",
          source: "https://github.com/cure53/DOMPurify",
          examples: [
            {
              label: "Keep allowed formatting and remove an event attribute",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<div class="content"></div>\n<script src="./node_modules/dompurify/dist/purify.min.js"></script>\n<script>\nconst userInput = \'<b onclick="alert(1)">Hello</b>\';\nconst div = document.querySelector(".content");\ndiv.innerHTML = DOMPurify.sanitize(userInput, { USE_PROFILES: { html: true } });\nconsole.log(div.querySelector("b").textContent, div.querySelector("b").hasAttribute("onclick"));\n</script>',
                },
              ],
            },
            {
              label: "Remove a script while preserving paragraph content",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<div class="content"></div>\n<script src="./node_modules/dompurify/dist/purify.min.js"></script>\n<script>\nconst userInput = "<scr" + "ipt>alert(1)</scr" + "ipt><p>Allowed</p>";\nconst div = document.querySelector(".content");\ndiv.innerHTML = DOMPurify.sanitize(userInput, { USE_PROFILES: { html: true } });\nconsole.log(div.querySelectorAll("script").length, div.querySelector("p").textContent);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.setAttribute()",
          explanation:
            "Adds or updates an attribute using a string value. Use it for data attributes, ARIA labels, and other serialized HTML metadata.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<button></button>\n<script>\nconst element = document.querySelector("button");\nelement.setAttribute("id", "unique-id");\nelement.setAttribute("class", "btn btn-primary");\nelement.setAttribute("data-user-id", "12345");\nelement.setAttribute("aria-label", "Close button");\nconsole.log(element.id, element.className, element.getAttribute("data-user-id"), element.getAttribute("aria-label"));\n</script>',
                },
              ],
            },
            {
              label: "Convert an attribute value to a string",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<div></div>\n<script>\nconst element = document.querySelector("div");\nelement.setAttribute("data-id", 123);\nconsole.log(element.getAttribute("data-id"), typeof element.getAttribute("data-id"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.getAttribute()",
          explanation:
            "Returns an attribute’s stored string value or null if absent. Use it when the literal HTML attribute matters rather than a normalized DOM property.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<div class="btn btn-primary" data-user-id="12345"></div>\n<script>\nconst element = document.querySelector("div");\nconsole.log(element.getAttribute("class"), element.getAttribute("data-user-id"));\n</script>',
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<a href="/guide" data-empty="">Guide</a>\n<script>\nconst link = document.querySelector("a");\nconsole.log(link.getAttribute("href"), link.getAttribute("data-empty"), link.getAttribute("missing"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Boolean HTML attributes",
          explanation:
            "Enables a boolean attribute by its presence rather than its text value. Use properties for current boolean state and remove attributes to clear presence.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<button>Send</button>\n<script>\nconst button = document.querySelector("button");\nbutton.setAttribute("disabled", "false");\nconsole.log(button.disabled, button.hasAttribute("disabled"));\nbutton.removeAttribute("disabled");\nconsole.log(button.disabled);\n</script>',
                },
              ],
            },
            {
              label: "Set required and an initial checked state",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<input id="text"><input id="check" type="checkbox">\n<script>\nconst input = document.querySelector("#text"), checkbox = document.querySelector("#check");\ninput.setAttribute("required", "");\ncheckbox.setAttribute("checked", "");\nconsole.log(input.required, checkbox.defaultChecked, checkbox.checked);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.removeAttribute()",
          explanation:
            "Removes an attribute by name. Use it to clear serialized metadata or boolean attribute presence.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<button disabled data-id="123">Send</button>\n<script>\nconst element = document.querySelector("button");\nelement.removeAttribute("disabled"); element.removeAttribute("data-id");\nconsole.log(element.disabled, element.getAttribute("data-id"));\n</script>',
                },
              ],
            },
            {
              label: "Remove classes and tolerate a missing attribute",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<div class="card"></div>\n<script>\nconst element = document.querySelector("div");\nelement.removeAttribute("class"); element.removeAttribute("missing");\nconsole.log(element.className, element.hasAttribute("class"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.hasAttribute()",
          explanation:
            "Checks whether an attribute is present. Use it before reading metadata when presence carries meaning independent of its value.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<div data-id="123"></div>\n<script>\nconst element = document.querySelector("div");\nif (element.hasAttribute("data-id")) console.log(element.getAttribute("data-id"));\n</script>',
                },
              ],
            },
            {
              label: "Distinguish an empty attribute from absence",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<button disabled>Send</button>\n<script>\nconst button = document.querySelector("button");\nconsole.log(button.hasAttribute("disabled"), button.getAttribute("disabled"), button.hasAttribute("data-id"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Direct DOM property access",
          explanation:
            "Reads and writes typed DOM state through properties such as value, disabled, checked, id, and href. Use properties for current control values and reflected browser state.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<div></div><input>\n<script>\nconst element = document.querySelector("div"), input = document.querySelector("input");\nelement.id = "my-id"; element.className = "my-class";\ninput.value = "text value"; input.disabled = true;\nconsole.log(element.id, element.className, input.value, input.disabled);\n</script>',
                },
              ],
            },
            {
              label: "Read boolean checked state and a normalized link",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<input type="checkbox"><a>Link</a>\n<script>\nconst checkbox = document.querySelector("input"), link = document.querySelector("a");\ncheckbox.checked = true; link.href = "https://example.com";\nconsole.log(checkbox.checked, typeof checkbox.checked, link.href);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Attributes versus current form properties",
          explanation:
            "Distinguishes initial serialized form settings from a control’s current state. Use value and checked for live interaction and defaultValue/defaultChecked for defaults.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<input>\n<script>\nconst input = document.querySelector("input");\ninput.setAttribute("value", "initial"); input.value = "current";\nconsole.log(input.getAttribute("value"), input.defaultValue, input.value);\n</script>',
                },
              ],
            },
            {
              label: "Keep a checked default while changing current state",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<input type="checkbox" checked>\n<script>\nconst checkbox = document.querySelector("input");\ncheckbox.checked = false;\nconsole.log(checkbox.hasAttribute("checked"), checkbox.defaultChecked, checkbox.checked);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "HTMLElement.dataset",
          explanation:
            "Exposes data-* attributes as string-valued properties with camel-cased names. Use it for small element-associated metadata.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<div></div>\n<script>\nconst element = document.querySelector("div");\nelement.dataset.userId = "123"; element.dataset.userName = "John"; element.dataset.isActive = true;\nconsole.log(element.getAttribute("data-user-id"), element.dataset.userName, element.dataset.isActive, typeof element.dataset.isActive);\n</script>',
                },
              ],
            },
            {
              label: "Map kebab-case names and delete metadata",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<div data-user-id="123"></div>\n<script>\nconst element = document.querySelector("div");\nelement.setAttribute("data-user-age", "25");\nconsole.log(element.dataset.userAge, Number(element.dataset.userAge));\ndelete element.dataset.userId;\nconsole.log(element.hasAttribute("data-user-id"), element.dataset.userId);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Custom toggleAttribute helper",
          explanation:
            "Adds an empty attribute when absent and removes it when present. Use it for an explicit presence-based toggle.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<button>Send</button>\n<script>\nfunction toggleAttribute(element, attr) {\n  if (element.hasAttribute(attr)) element.removeAttribute(attr);\n  else element.setAttribute(attr, "");\n}\nconst button = document.querySelector("button");\ntoggleAttribute(button, "disabled"); console.log(button.disabled);\ntoggleAttribute(button, "disabled"); console.log(button.disabled);\n</script>',
                },
              ],
            },
            {
              label: "Toggle metadata presence",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<div data-active="yes"></div>\n<script>\nfunction toggleAttribute(element, attr) {\n  if (element.hasAttribute(attr)) element.removeAttribute(attr);\n  else element.setAttribute(attr, "");\n}\nconst element = document.querySelector("div");\ntoggleAttribute(element, "data-active");\nconsole.log(element.hasAttribute("data-active"));\ntoggleAttribute(element, "data-active");\nconsole.log(element.getAttribute("data-active"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.attributes",
          explanation:
            "Returns a live NamedNodeMap of an element’s attribute nodes. Use it to inspect each attribute’s name and string value.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<div id="card" class="active" data-id="123"></div>\n<script>\nconst element = document.querySelector("div");\nfor (const attr of [...element.attributes].sort((a, b) => a.name.localeCompare(b.name))) console.log(`${attr.name}: ${attr.value}`);\n</script>',
                },
              ],
            },
            {
              label: "Observe that the attribute map is live",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<div id="card"></div>\n<script>\nconst element = document.querySelector("div");\nconst attributes = element.attributes;\nconsole.log(attributes.length);\nelement.setAttribute("data-id", "123");\nconsole.log(attributes.length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Copy attributes between elements",
          explanation:
            "Copies serialized attribute names and values from one element to another. Use it when metadata should be mirrored without copying child content.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<div id="source" class="card" data-id="123"></div><div id="target" title="Keep"></div>\n<script>\nfunction copyAttributes(source, target) {\n  for (const attr of source.attributes) target.setAttribute(attr.name, attr.value);\n}\nconst source = document.querySelector("#source"), target = document.querySelector("#target");\ncopyAttributes(source, target); target.id = "target";\nconsole.log(target.className, target.dataset.id, target.title);\n</script>',
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modifying elements example</title>\n<body>\n<input id="source" value="initial"><input id="target">\n<script>\nfunction copyAttributes(source, target) {\n  for (const attr of source.attributes) target.setAttribute(attr.name, attr.value);\n}\nconst source = document.querySelector("#source"), target = document.querySelector("#target");\nsource.value = "current";\ncopyAttributes(source, target); target.id = "target";\nconsole.log(source.value, target.getAttribute("value"), target.value);\n</script>',
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
          explanation:
            "Adds one or more class tokens without removing existing classes. Use it to apply additive visual states.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div class="card"></div>\n<script>\nconst element = document.querySelector("div");\nelement.classList.add("active");\nelement.classList.add("btn", "btn-primary", "large");\nconsole.log(element.className);\n</script>',
                },
              ],
            },
            {
              label: "Avoid duplicate class tokens",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div class="active"></div>\n<script>\nconst element = document.querySelector("div");\nconsole.log(element.classList.add("active"), element.classList.length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "classList.remove()",
          explanation:
            "Removes one or more class tokens while retaining other classes. Use it to clear specific states.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div class="active btn btn-primary large"></div>\n<script>\nconst element = document.querySelector("div");\nelement.classList.remove("active");\nelement.classList.remove("btn", "btn-primary");\nconsole.log(element.className);\n</script>',
                },
              ],
            },
            {
              label: "Remove old classes and add new classes separately",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div class="old1 old2 keep"></div>\n<script>\nconst element = document.querySelector("div");\nconsole.log(element.classList.remove("old1", "old2", "missing"));\nelement.classList.add("new1", "new2");\nconsole.log(element.className);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "classList.toggle()",
          explanation:
            "Adds an absent class or removes a present class and returns the resulting membership. Use its force argument when membership should match a condition.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div></div>\n<script>\nconst element = document.querySelector("div");\nconsole.log(element.classList.toggle("visible"));\nconsole.log(element.classList.toggle("visible"));\n</script>',
                },
              ],
            },
            {
              label: "Set membership from a condition",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div></div>\n<script>\nconst element = document.querySelector("div");\nconst isLoggedIn = true;\nelement.classList.toggle("authenticated", isLoggedIn);\nelement.classList.toggle("authenticated", isLoggedIn);\nconsole.log(element.className);\nconsole.log(element.classList.toggle("authenticated", false));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "classList.contains()",
          explanation:
            "Returns whether an element has a particular class token. Use it to inspect a visual state without changing it.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div class="active"></div>\n<script>\nconst element = document.querySelector("div");\nif (element.classList.contains("active")) console.log("Element is active");\n</script>',
                },
              ],
            },
            {
              label: "Distinguish token names from selectors",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div class="active"></div>\n<script>\nconst element = document.querySelector("div");\nconsole.log(element.classList.contains("active"), element.classList.contains(".active"), element.classList.contains("Active"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "classList.replace()",
          explanation:
            "Replaces an existing class token and reports whether replacement occurred. Use it to exchange related visual variants.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<button class="btn btn-primary">Save</button>\n<script>\nconst element = document.querySelector("button");\nconsole.log(element.classList.replace("btn-primary", "btn-secondary"), element.className);\n</script>',
                },
              ],
            },
            {
              label: "Observe a missing old class",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div class="card"></div>\n<script>\nconst element = document.querySelector("div");\nconsole.log(element.classList.replace("old-class", "new-class"), element.className);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.className",
          explanation:
            "Reads or replaces an HTML element’s class attribute as a string. Use it when the entire class set should be assigned at once.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div class="class1 class2 class3"></div>\n<script>\nconst element = document.querySelector("div");\nconsole.log(element.className);\nelement.className = "new-class another-class";\nconsole.log(element.className);\n</script>',
                },
              ],
            },
            {
              label: "Append a string and clear all classes",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div class="card"></div>\n<script>\nconst element = document.querySelector("div");\nelement.className += " additional-class";\nconsole.log(element.className);\nelement.className = "";\nconsole.log(element.classList.length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "classList.length and indexed access",
          explanation:
            "Reads the number of class tokens and a token at an indexed position. Use it to inspect an element’s current token list.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div class="card active large"></div>\n<script>\nconst element = document.querySelector("div");\nconsole.log(element.classList.length, element.classList[0]);\n</script>',
                },
              ],
            },
            {
              label: "Observe live changes and a missing index",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div class="card"></div>\n<script>\nconst list = document.querySelector("div").classList;\nlist.add("active");\nconsole.log(list.length, list[1], list[5]);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "classList.forEach()",
          explanation:
            "Visits class tokens in the DOMTokenList. Use it to inspect or report the current classes.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div class="card active"></div>\n<script>\ndocument.querySelector("div").classList.forEach(className => console.log(className));\n</script>',
                },
              ],
            },
            {
              label: "Read token indices during iteration",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div class="small rounded"></div>\n<script>\ndocument.querySelector("div").classList.forEach((token, index) => console.log(index, token));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Convert classList to an array",
          explanation:
            "Copies token membership into an ordinary array through spread. Use a snapshot for array operations or mutation-safe iteration.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div class="card active"></div>\n<script>\nconst element = document.querySelector("div");\nconst classArray = [...element.classList];\nelement.classList.add("large");\nconsole.log(Array.isArray(classArray), ...classArray, element.classList.length);\n</script>',
                },
              ],
            },
            {
              label: "Remove prefixed classes through a snapshot",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div class="state-loading state-old card"></div>\n<script>\nconst element = document.querySelector("div");\n[...element.classList].filter(token => token.startsWith("state-")).forEach(token => element.classList.remove(token));\nconsole.log(element.className);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Apply classes to multiple elements",
          explanation:
            "Iterates selected elements and updates each class list. Use it to apply a shared processing state to several nodes.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<p class="item">A</p><p class="item">B</p>\n<script>\ndocument.querySelectorAll(".item").forEach(item => item.classList.add("processed"));\nconsole.log(document.querySelectorAll(".item.processed").length);\n</script>',
                },
              ],
            },
            {
              label: "Apply a class only to matching elements",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<p class="item" data-ready="yes">A</p><p class="item">B</p>\n<script>\ndocument.querySelectorAll(".item").forEach(item => item.classList.toggle("ready", item.dataset.ready === "yes"));\nconsole.log(document.querySelectorAll(".ready").length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Conditional button state classes",
          explanation:
            "Removes mutually exclusive state classes before applying a selected state. Use it to keep a button from appearing in conflicting states.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<button class="btn loading">Save</button>\n<script>\nfunction updateButton(button, state) {\n  if (!["loading", "success", "error"].includes(state)) throw new RangeError("Unknown state");\n  button.classList.remove("loading", "success", "error");\n  button.classList.add(state);\n}\nconst button = document.querySelector("button");\nupdateButton(button, "success");\nconsole.log(button.className);\n</script>',
                },
              ],
            },
            {
              label: "Reject an unsupported state without changing classes",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<button class="btn loading">Save</button>\n<script>\nfunction updateButton(button, state) {\n  if (!["loading", "success", "error"].includes(state)) throw new RangeError("Unknown state");\n  button.classList.remove("loading", "success", "error");\n  button.classList.add(state);\n}\nconst button = document.querySelector("button");\ntry { updateButton(button, "unknown"); } catch (error) { console.log(error.name, button.className); }\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Toggle a menu with classes",
          explanation:
            "Updates menu and button classes in response to a click. Use one resulting open state to keep related UI indicators synchronized.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<style>.menu{display:none}.menu.open{display:block}</style><button class="menu-toggle" aria-expanded="false">Menu</button><nav class="menu">Links</nav>\n<script>\nconst menu = document.querySelector(".menu"), toggleBtn = document.querySelector(".menu-toggle");\ntoggleBtn.addEventListener("click", () => {\n  const open = menu.classList.toggle("open");\n  toggleBtn.classList.toggle("active", open);\n  toggleBtn.setAttribute("aria-expanded", String(open));\n});\ntoggleBtn.click();\nconsole.log(menu.classList.contains("open"), toggleBtn.classList.contains("active"), toggleBtn.getAttribute("aria-expanded"), getComputedStyle(menu).display);\n</script>',
                },
              ],
            },
            {
              label: "Close a menu after a second click",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<button class="menu-toggle" aria-expanded="false">Menu</button><nav class="menu">Links</nav>\n<script>\nconst menu = document.querySelector(".menu"), toggleBtn = document.querySelector(".menu-toggle");\ntoggleBtn.addEventListener("click", () => {\n  const open = menu.classList.toggle("open");\n  toggleBtn.classList.toggle("active", open);\n  toggleBtn.setAttribute("aria-expanded", String(open));\n});\ntoggleBtn.click(); toggleBtn.click();\nconsole.log(menu.classList.contains("open"), toggleBtn.classList.contains("active"), toggleBtn.getAttribute("aria-expanded"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Add a class after a delay",
          explanation:
            "Schedules a class change with a timer. Use it when a state should begin after a short delay.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div class="card"></div>\n<script>\nconst element = document.querySelector("div");\nsetTimeout(() => { element.classList.add("fade-in"); console.log(element.className); }, 10);\n</script>',
                },
              ],
            },
            {
              label: "Cancel an obsolete class update",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div class="card"></div>\n<script>\nconst element = document.querySelector("div");\nconst timer = setTimeout(() => element.classList.add("fade-in"), 10);\nclearTimeout(timer);\nsetTimeout(() => console.log(element.className), 20);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Individual inline style properties",
          explanation:
            "Sets individual inline CSS declarations through camel-cased JavaScript properties. Use it for per-element values computed by JavaScript.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div></div>\n<script>\nconst element = document.querySelector("div");\nelement.style.color = "red"; element.style.backgroundColor = "#f0f0f0";\nelement.style.fontSize = "16px"; element.style.marginTop = "20px";\nelement.style.borderRadius = "5px"; element.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";\nconsole.log(element.style.color, element.style.backgroundColor, element.style.fontSize, element.style.marginTop, element.style.borderRadius, element.style.boxShadow !== "");\n</script>',
                },
              ],
            },
            {
              label: "Update a single declaration without clearing another",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div style="padding:10px"></div>\n<script>\nconst element = document.querySelector("div");\nelement.style.color = "blue";\nconsole.log(element.style.padding, element.style.color);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "style.setProperty()",
          explanation:
            "Sets an inline declaration using a CSS property name and an optional priority. Use kebab-case names and this method for custom properties or important declarations.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div></div>\n<script>\nconst element = document.querySelector("div");\nelement.style.setProperty("background-color", "#f0f0f0");\nelement.style.setProperty("font-size", "16px");\nelement.style.setProperty("--custom-property", "value");\nconsole.log(element.style.backgroundColor, element.style.fontSize, element.style.getPropertyValue("--custom-property"));\n</script>',
                },
              ],
            },
            {
              label: "Set an important priority",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div></div>\n<script>\nconst element = document.querySelector("div");\nelement.style.setProperty("color", "red", "important");\nconsole.log(element.style.color, element.style.getPropertyPriority("color"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Object.assign(element.style, styles)",
          explanation:
            "Assigns several supported inline style properties from an object. Use it for a small set of camel-cased declarations.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div></div>\n<script>\nconst element = document.querySelector("div");\nObject.assign(element.style, { color: "blue", fontSize: "20px", margin: "10px" });\nconsole.log(element.style.color, element.style.fontSize, element.style.margin);\n</script>',
                },
              ],
            },
            {
              label: "Set dimensions and retain an existing color",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div style="color:red"></div>\n<script>\nconst element = document.querySelector("div");\nObject.assign(element.style, { width: "200px", height: "100px", padding: "10px", border: "1px solid #ccc" });\nconsole.log(element.style.width, element.style.height, element.style.padding, element.style.borderWidth, element.style.color);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "style.cssText",
          explanation:
            "Reads or replaces the complete inline declaration string. Use it when all inline styles should be assigned as one CSS text value.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div style="padding:5px"></div>\n<script>\nconst element = document.querySelector("div");\nelement.style.cssText = "color: red; font-size: 20px; margin: 10px;";\nconsole.log(element.style.color, element.style.fontSize, element.style.margin, element.style.padding);\n</script>',
                },
              ],
            },
            {
              label: "Append a declaration to cssText",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div style="color:red"></div>\n<script>\nconst element = document.querySelector("div");\nelement.style.cssText += "border: 1px solid black;";\nconsole.log(element.style.color, element.style.borderWidth, element.style.borderStyle);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Remove a style with an empty string",
          explanation:
            "Clears a particular inline declaration by assigning an empty string. Use it to let the stylesheet cascade determine the value again.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div style="color:red;background-color:blue"></div>\n<script>\nconst element = document.querySelector("div");\nelement.style.color = ""; element.style.backgroundColor = "";\nconsole.log(element.style.color, element.style.backgroundColor);\n</script>',
                },
              ],
            },
            {
              label: "Reveal a stylesheet declaration",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<style>.card{color:rgb(0,128,0)}</style><div class="card" style="color:red"></div>\n<script>\nconst element = document.querySelector("div");\nelement.style.color = "";\nconsole.log(element.style.color, getComputedStyle(element).color);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "style.removeProperty()",
          explanation:
            "Removes an inline declaration by its CSS property name and returns its previous value. Use it for kebab-case names or custom properties.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div style="color:red;background-color:blue"></div>\n<script>\nconst element = document.querySelector("div");\nconsole.log(element.style.removeProperty("color"));\nelement.style.removeProperty("background-color");\nconsole.log(element.style.color, element.style.backgroundColor);\n</script>',
                },
              ],
            },
            {
              label: "Remove a custom property",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div style="--spacing:20px"></div>\n<script>\nconst element = document.querySelector("div");\nconsole.log(element.style.removeProperty("--spacing"), element.style.getPropertyValue("--spacing"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Clear all inline styles",
          explanation:
            "Clears every inline declaration through cssText or removes the style attribute. Use it to reset inline overrides while retaining stylesheet rules.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div style="color:red;padding:10px"></div>\n<script>\nconst element = document.querySelector("div");\nelement.style.cssText = "";\nconsole.log(element.style.length, element.getAttribute("style"));\n</script>',
                },
              ],
            },
            {
              label: "Remove the style attribute",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<style>.card{color:rgb(0,0,255)}</style><div class="card" style="color:red"></div>\n<script>\nconst element = document.querySelector("div");\nelement.removeAttribute("style");\nconsole.log(element.hasAttribute("style"), getComputedStyle(element).color);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "getComputedStyle() and getPropertyValue()",
          explanation:
            "Reads resolved style values after the cascade rather than only inline declarations. Use property access or getPropertyValue with CSS names to inspect applied values.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<style>.card{color:rgb(0,128,0);font-size:18px;margin:12px}</style><div class="card"></div>\n<script>\nconst element = document.querySelector("div");\nconst computed = window.getComputedStyle(element);\nconsole.log(element.style.color, computed.color, computed.fontSize, computed.getPropertyValue("margin"));\n</script>',
                },
              ],
            },
            {
              label: "Read a winning inline declaration",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<style>.card{color:green}</style><div class="card" style="color:blue"></div>\n<script>\nconst element = document.querySelector("div");\nconst styles = window.getComputedStyle(element);\nconsole.log(element.style.color, styles.getPropertyValue("color"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Read pseudo-element styles",
          explanation:
            "Uses getComputedStyle with a pseudo-element argument to inspect generated content styling. Use it for ::before or ::after values that do not correspond to ordinary DOM child elements.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<style>.card::before{content:"Label";color:rgb(255,0,0)}</style><div class="card"></div>\n<script>\nconst before = window.getComputedStyle(document.querySelector("div"), "::before");\nconsole.log(before.getPropertyValue("content"), before.color);\n</script>',
                },
              ],
            },
            {
              label: "Read ::after generated content",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<style>.card::after{content:"Done";font-size:14px}</style><div class="card"></div>\n<script>\nconst after = window.getComputedStyle(document.querySelector("div"), "::after");\nconsole.log(after.content, after.fontSize);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "CSS units in style values",
          explanation:
            "Supplies valid CSS units for dimensional declarations such as width and height. Use percentages, viewport units, or font-relative units when they express the intended sizing.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div></div>\n<script>\nconst element = document.querySelector("div");\nelement.style.width = 200;\nconsole.log(element.style.width);\nelement.style.width = "200px"; element.style.height = "100px"; element.style.opacity = 0.5;\nconsole.log(element.style.width, element.style.height, element.style.opacity);\n</script>',
                },
              ],
            },
            {
              label: "Preserve explicitly authored relative units",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div></div>\n<script>\nconst element = document.querySelector("div");\nelement.style.width = "50%"; element.style.height = "10vh"; element.style.fontSize = "2rem";\nconsole.log(element.style.width, element.style.height, element.style.fontSize);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Calculate and update a pixel width",
          explanation:
            "Parses a resolved pixel width, computes a new value, and writes a CSS length. Use it when JavaScript must derive a size from the current layout.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div style="width:200.5px"></div>\n<script>\nconst element = document.querySelector("div");\nconst currentWidth = parseFloat(getComputedStyle(element).width);\nif (Number.isFinite(currentWidth)) element.style.width = `${currentWidth + 50}px`;\nconsole.log(element.style.width);\n</script>',
                },
              ],
            },
            {
              label: "Handle a non-numeric authored width",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div style="width:auto"></div>\n<script>\nconst element = document.querySelector("div");\nconst authoredWidth = parseFloat(element.style.width);\nconsole.log(Number.isFinite(authoredWidth));\nif (!Number.isFinite(authoredWidth)) element.style.width = "100px";\nconsole.log(element.style.width);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "CSS custom properties",
          explanation:
            "Stores reusable CSS values under -- names and consumes them through var(). Use them to connect JavaScript updates with stylesheet-controlled styling.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div></div>\n<script>\nconst element = document.querySelector("div");\nelement.style.setProperty("--primary-color", "#007bff");\nelement.style.setProperty("--spacing", "20px");\nelement.style.backgroundColor = "var(--primary-color)";\nelement.style.padding = "var(--spacing)";\nconst computed = getComputedStyle(element);\nconsole.log(computed.getPropertyValue("--primary-color").trim(), computed.backgroundColor, computed.padding);\n</script>',
                },
              ],
            },
            {
              label: "Inherit a custom property from a parent",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<section style="--spacing:12px"><div style="padding:var(--spacing)"></div></section>\n<script>\nconst parent = document.querySelector("section"), element = document.querySelector("div");\nparent.style.setProperty("--spacing", "24px");\nconsole.log(getComputedStyle(element).padding);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Inline CSS transitions",
          explanation:
            "Defines transition rules before changing animatable styles. Use targeted transition properties to describe which changes should animate.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div style="width:20px;height:20px;transform:translateX(0px)"></div>\n<script>\nconst element = document.querySelector("div");\nelement.style.transition = "transform 0.3s ease";\ngetComputedStyle(element).transform; // establish the starting computed style\nelement.style.transform = "translateX(100px)";\nconsole.log(element.style.transitionProperty, element.style.transitionDuration, element.style.transform);\n</script>',
                },
              ],
            },
            {
              label: "Configure different durations for multiple properties",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Styling and classes example</title>\n<body>\n<div style="opacity:1;transform:translateX(0px)"></div>\n<script>\nconst element = document.querySelector("div");\nelement.style.transition = "opacity 0.3s, transform 0.5s";\ngetComputedStyle(element).opacity;\nelement.style.opacity = "0"; element.style.transform = "translateX(20px)";\nconsole.log(element.style.transitionProperty, element.style.transitionDuration, element.style.opacity);\n</script>',
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
            "Returns the direct parent when that parent is an Element, otherwise null. Use it to navigate to a containing element before changing its classes or content.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<ul><li><a href="#">Link</a></li></ul>\n<script>\nconst link = document.querySelector("a");\nconst listItem = link.parentElement;\nif (listItem) listItem.classList.add("has-child");\nconsole.log(listItem.tagName, listItem.className);\n</script>',
                },
              ],
            },
            {
              label: "Handle a detached element",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n\n<script>\nconst element = document.createElement("div");\nconsole.log(element.parentElement);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Node.parentNode",
          explanation:
            "Returns the direct parent node of any supported parent type. Use it when a parent may be an Element, Document, or DocumentFragment.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<section><p>Child</p></section>\n<script>\nconst child = document.querySelector("p");\nconsole.log(child.parentNode === child.parentElement);\nconsole.log(document.documentElement.parentNode === document, document.documentElement.parentElement);\n</script>',
                },
              ],
            },
            {
              label: "Inspect a DocumentFragment parent",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n\n<script>\nconst fragment = document.createDocumentFragment();\nconst element = document.createElement("p"); fragment.appendChild(element);\nconsole.log(element.parentNode === fragment, element.parentElement, element.parentNode.nodeType);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.children",
          explanation:
            "Returns a live HTMLCollection of direct child elements. Use it when whitespace text and comments should be ignored.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div id="box">Text<span>A</span><!-- comment --><p>B</p></div>\n<script>\nconst children = document.querySelector("#box").children;\nconsole.log(children.length, children[0].tagName, children[1].tagName);\n</script>',
                },
              ],
            },
            {
              label: "Observe live membership",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div id="box"><p>A</p></div>\n<script>\nconst element = document.querySelector("#box"), children = element.children;\nelement.appendChild(document.createElement("span"));\nconsole.log(children.length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Node.childNodes",
          explanation:
            "Returns a live NodeList of every direct child node. Use it when text, comments, and elements all matter.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div id="box">Text<span>A</span><!--note--></div>\n<script>\nconst nodes = document.querySelector("#box").childNodes;\nconsole.log(nodes.length, ...Array.from(nodes, node => node.nodeType));\n</script>',
                },
              ],
            },
            {
              label: "Count whitespace as a text node",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div id="box"> <span>A</span> </div>\n<script>\nconst element = document.querySelector("#box");\nconsole.log(element.childNodes.length, element.children.length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "firstElementChild and lastElementChild",
          explanation:
            "Returns the first or last direct element child, skipping other node types. Use them for element-only boundaries.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div id="box"> <span>First</span><p>Last</p> </div>\n<script>\nconst element = document.querySelector("#box");\nconsole.log(element.firstElementChild.textContent, element.lastElementChild.textContent);\n</script>',
                },
              ],
            },
            {
              label: "Handle a text-only parent",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div id="box">Only text</div>\n<script>\nconst element = document.querySelector("#box");\nconsole.log(element.firstElementChild, element.lastElementChild);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "firstChild and lastChild",
          explanation:
            "Returns the first or last child node regardless of its type. Use them when text and comments must be traversed too.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div id="box">Text<span>A</span><!--last--></div>\n<script>\nconst element = document.querySelector("#box");\nconsole.log(element.firstChild.nodeType, element.firstChild.textContent, element.lastChild.nodeType);\n</script>',
                },
              ],
            },
            {
              label: "Handle an empty parent",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div id="box"></div>\n<script>\nconst element = document.querySelector("#box");\nconsole.log(element.firstChild, element.lastChild);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Node.hasChildNodes()",
          explanation:
            "Checks whether a node has any direct child nodes. Use it when even text or comments count as content.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div id="box"> </div>\n<script>\nconst element = document.querySelector("#box");\nconsole.log(element.hasChildNodes(), element.children.length > 0);\n</script>',
                },
              ],
            },
            {
              label: "Distinguish empty from element-containing parents",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div id="empty"></div><div id="full"><span></span></div>\n<script>\nconsole.log(document.querySelector("#empty").hasChildNodes(), document.querySelector("#full").hasChildNodes());\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.childElementCount",
          explanation:
            "Returns the number of direct element children. Use it when only the count is needed.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div id="box">Text<section><span>Nested</span></section><p>Direct</p></div>\n<script>\nconsole.log(document.querySelector("#box").childElementCount);\n</script>',
                },
              ],
            },
            {
              label: "Observe an updated count",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div id="box"><p>A</p></div>\n<script>\nconst element = document.querySelector("#box");\nelement.appendChild(document.createElement("p"));\nconsole.log(element.childElementCount, element.children.length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Iterate and filter element children",
          explanation:
            "Uses for...of directly on children or converts it to an array for array methods. Use a snapshot when membership-changing mutations would disrupt a live traversal.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div id="box"><p>A</p><span>B</span></div>\n<script>\nconst element = document.querySelector("#box");\nfor (const child of element.children) child.classList.add("child-element");\nArray.from(element.children).forEach(child => console.log(child.tagName, child.className));\n</script>',
                },
              ],
            },
            {
              label: "Filter direct DIV children",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<section id="box"><div>A</div><article><div>Nested</div></article><span>B</span></section>\n<script>\nconst element = document.querySelector("#box");\nconst divChildren = Array.from(element.children).filter(child => child.tagName === "DIV");\nconsole.log(divChildren.length, divChildren[0].textContent);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.closest()",
          explanation:
            "Returns the nearest matching element among the element itself and its ancestors. Use it to locate a containing section, form, or component.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<article><section class="section"><form><input></form></section></article>\n<script>\nconst input = document.querySelector("input");\nconsole.log(input.closest(".section").tagName, input.closest("form").tagName, input.closest("article").tagName);\n</script>',
                },
              ],
            },
            {
              label: "Include self and handle no match",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div class="section"></div>\n<script>\nconst element = document.querySelector(".section");\nconsole.log(element.closest(".section") === element, element.closest("form"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Node.contains() and strict descendant checks",
          explanation:
            "Checks whether a node is inside another node, including the container itself. Add an identity check when you need a strict descendant relationship.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div id="parent"><section><p id="child">Text</p></section></div>\n<script>\nfunction isDescendantOf(child, parent) { return child !== parent && parent.contains(child); }\nconst parent = document.querySelector("#parent"), child = document.querySelector("#child");\nconsole.log(parent.contains(child), isDescendantOf(child, parent));\n</script>',
                },
              ],
            },
            {
              label: "Distinguish self from a strict descendant",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div id="box"></div>\n<script>\nfunction isDescendantOf(child, parent) { return child !== parent && parent.contains(child); }\nconst element = document.querySelector("#box");\nconsole.log(element.contains(element), isDescendantOf(element, element), element.contains(document.createElement("p")));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Walk upward through parentElement",
          explanation:
            "Moves through direct parent elements until a stopping condition is met. Use it for custom ancestor searches that need more than a selector.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<section class="stop"><div><p id="start">Start</p></div></section>\n<script>\nfunction findStopAncestor(element) {\n  let current = element;\n  while (current.parentElement) {\n    current = current.parentElement;\n    if (current.classList.contains("stop")) return current;\n  }\n  return null;\n}\nconsole.log(findStopAncestor(document.querySelector("#start")).tagName);\n</script>',
                },
              ],
            },
            {
              label: "Handle no matching ancestor",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div><p id="start">Start</p></div>\n<script>\nfunction findStopAncestor(element) {\n  let current = element;\n  while (current.parentElement) {\n    current = current.parentElement;\n    if (current.classList.contains("stop")) return current;\n  }\n  return null;\n}\nconsole.log(findStopAncestor(document.querySelector("#start")));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Remove all child nodes",
          explanation:
            "Removes children repeatedly through firstChild or clears the container’s innerHTML. Use it to empty a container while retaining the container itself.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div id="box">Text<span>A</span><!--comment--></div>\n<script>\nconst element = document.querySelector("#box");\nwhile (element.firstChild) element.removeChild(element.firstChild);\nconsole.log(element.hasChildNodes(), element.isConnected);\n</script>',
                },
              ],
            },
            {
              label: "Clear a container with an empty HTML string",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div id="box"><p>A</p><p>B</p></div>\n<script>\nconst element = document.querySelector("#box");\nelement.innerHTML = "";\nconsole.log(element.childNodes.length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Clone children into another element",
          explanation:
            "Copies each direct element child into a target container. Use it to duplicate a source layout without moving its original nodes.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div class="source"><p>A</p><span>B</span></div><div class="target"></div>\n<script>\nconst source = document.querySelector(".source"), target = document.querySelector(".target");\nArray.from(source.children).forEach(child => target.appendChild(child.cloneNode(true)));\nconsole.log(source.children.length, target.children.length, target.firstElementChild.textContent, source.firstElementChild === target.firstElementChild);\n</script>',
                },
              ],
            },
            {
              label: "Preserve source content while editing a copied child",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div class="source"><p><strong>Original</strong></p></div><div class="target"></div>\n<script>\nconst source = document.querySelector(".source"), target = document.querySelector(".target");\nArray.from(source.children).forEach(child => target.appendChild(child.cloneNode(true)));\ntarget.querySelector("strong").textContent = "Copy";\nconsole.log(source.querySelector("strong").textContent, target.querySelector("strong").textContent);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Find a specific direct child",
          explanation:
            "Converts children to an array and selects the first element matching a predicate. Use it to inspect a direct child’s dataset or other properties.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div id="box"><p data-id="1">A</p><p data-id="123">B</p></div>\n<script>\nconst parent = document.querySelector("#box");\nconst specificChild = Array.from(parent.children).find(child => child.dataset.id === "123");\nconsole.log(specificChild.textContent);\n</script>',
                },
              ],
            },
            {
              label: "Exclude matching nested descendants",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div id="box"><section><p data-id="123">Nested</p></section></div>\n<script>\nconst parent = document.querySelector("#box");\nconsole.log(Array.from(parent.children).find(child => child.dataset.id === "123"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "nextElementSibling and nextSibling",
          explanation:
            "Navigates to the next sibling element or the next sibling node of any type. Use the element form to skip whitespace and comments.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<section><p id="start">A</p> <p>B</p></section>\n<script>\nconst element = document.querySelector("#start");\nconst next = element.nextElementSibling;\nif (next) next.classList.add("next");\nconsole.log(next.textContent, next.className, element.nextSibling.nodeType);\n</script>',
                },
              ],
            },
            {
              label: "Handle the last sibling",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<section><p id="last">Only</p></section>\n<script>\nconst element = document.querySelector("#last");\nconsole.log(element.nextElementSibling, element.nextSibling);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Collect following element siblings",
          explanation:
            "Walks through nextElementSibling links and collects every later element sibling. Use it for all elements following a particular item.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<section><p id="start">A</p> <p>B</p><!--gap--><p>C</p></section>\n<script>\nfunction getNextSiblings(element) {\n  const siblings = [];\n  let sibling = element.nextElementSibling;\n  while (sibling) { siblings.push(sibling); sibling = sibling.nextElementSibling; }\n  return siblings;\n}\nconsole.log(...getNextSiblings(document.querySelector("#start")).map(element => element.textContent));\n</script>',
                },
              ],
            },
            {
              label: "Return an empty array at the boundary",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<section><p id="last">A</p></section>\n<script>\nfunction getNextSiblings(element) {\n  const siblings = [];\n  let sibling = element.nextElementSibling;\n  while (sibling) { siblings.push(sibling); sibling = sibling.nextElementSibling; }\n  return siblings;\n}\nconsole.log(getNextSiblings(document.querySelector("#last")).length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "previousElementSibling and previousSibling",
          explanation:
            "Navigates to the preceding element sibling or preceding node of any type. Use the element form to skip formatting nodes.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<section><p>A</p> <p id="current">B</p></section>\n<script>\nconst element = document.querySelector("#current"), prev = element.previousElementSibling;\nif (prev) prev.classList.add("previous");\nconsole.log(prev.textContent, prev.className, element.previousSibling.nodeType);\n</script>',
                },
              ],
            },
            {
              label: "Handle the first sibling",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<section><p id="first">Only</p></section>\n<script>\nconst element = document.querySelector("#first");\nconsole.log(element.previousElementSibling, element.previousSibling);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Collect preceding element siblings",
          explanation:
            "Walks backward through previousElementSibling and returns preceding elements. Use it to inspect everything before an item.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<section><p>A</p><p>B</p> <p id="current">C</p></section>\n<script>\nfunction getPreviousSiblings(element) {\n  const siblings = [];\n  let sibling = element.previousElementSibling;\n  while (sibling) { siblings.push(sibling); sibling = sibling.previousElementSibling; }\n  return siblings.reverse();\n}\nconsole.log(...getPreviousSiblings(document.querySelector("#current")).map(element => element.textContent));\n</script>',
                },
              ],
            },
            {
              label: "Return an empty array for the first element",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<section><p id="first">A</p></section>\n<script>\nfunction getPreviousSiblings(element) {\n  const siblings = [];\n  let sibling = element.previousElementSibling;\n  while (sibling) { siblings.push(sibling); sibling = sibling.previousElementSibling; }\n  return siblings.reverse();\n}\nconsole.log(getPreviousSiblings(document.querySelector("#first")).length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Collect siblings excluding self",
          explanation:
            "Returns other element children of the same parent. Use it to update peer elements without including the current item.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<section><p>A</p><p id="current">B</p><p>C</p></section>\n<script>\nfunction getSiblings(element) {\n  return Array.from(element.parentNode?.children ?? []).filter(child => child !== element);\n}\nconsole.log(...getSiblings(document.querySelector("#current")).map(element => element.textContent));\n</script>',
                },
              ],
            },
            {
              label: "Handle an element without a parent",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n\n<script>\nfunction getSiblings(element) {\n  return Array.from(element.parentNode?.children ?? []).filter(child => child !== element);\n}\nconsole.log(getSiblings(document.createElement("p")).length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Collect the complete sibling group",
          explanation:
            "Returns all element children of the current element’s parent, including the current element. Use it when a full peer group is needed.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<section><p>A</p><p id="current">B</p><p>C</p></section>\n<script>\nfunction getAllSiblings(element) { return Array.from(element.parentNode?.children ?? []); }\nconst element = document.querySelector("#current"), group = getAllSiblings(element);\nconsole.log(group.length, group.includes(element));\n</script>',
                },
              ],
            },
            {
              label: "Support a fragment sibling group",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n\n<script>\nfunction getAllSiblings(element) { return Array.from(element.parentNode?.children ?? []); }\nconst fragment = document.createDocumentFragment();\nconst first = document.createElement("p"), second = document.createElement("p");\nfragment.append(first, second);\nconsole.log(getAllSiblings(first).length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Activate one sibling tab",
          explanation:
            "Removes an active class from sibling tab controls and applies it to the clicked control. Use it for a mutually exclusive visual selection within one group.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div id="tabs"><button class="tab active">A</button><button class="tab">B</button><button class="tab">C</button></div>\n<script>\nfunction getSiblings(element) {\n  return Array.from(element.parentNode?.children ?? []).filter(child => child !== element);\n}\ndocument.querySelectorAll(".tab").forEach(tab => {\n  tab.addEventListener("click", () => {\n    getSiblings(tab).filter(sibling => sibling.matches(".tab")).forEach(sibling => sibling.classList.remove("active"));\n    tab.classList.add("active");\n  });\n});\ndocument.querySelectorAll(".tab")[1].click();\nconsole.log(document.querySelector(".tab.active").textContent, document.querySelectorAll(".tab.active").length);\n</script>',
                },
              ],
            },
            {
              label: "Keep another group unchanged",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div><button class="tab active">A</button><button class="tab">B</button></div><div><button class="tab active">Other</button></div>\n<script>\nfunction getSiblings(element) {\n  return Array.from(element.parentNode?.children ?? []).filter(child => child !== element);\n}\ndocument.querySelectorAll(".tab").forEach(tab => {\n  tab.addEventListener("click", () => {\n    getSiblings(tab).filter(sibling => sibling.matches(".tab")).forEach(sibling => sibling.classList.remove("active"));\n    tab.classList.add("active");\n  });\n});\ndocument.querySelectorAll(".tab")[1].click();\nconsole.log(...Array.from(document.querySelectorAll(".tab.active"), tab => tab.textContent));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Find a sibling matching a selector",
          explanation:
            "Selects the first sibling element that matches a CSS selector. Use it to locate a specific peer by class or attribute.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<section><p id="current">A</p><p class="target">B</p><p>C</p></section>\n<script>\nfunction getSiblings(element) {\n  return Array.from(element.parentNode?.children ?? []).filter(child => child !== element);\n}\nfunction findSibling(element, selector) { return getSiblings(element).find(sibling => sibling.matches(selector)); }\nconsole.log(findSibling(document.querySelector("#current"), ".target").textContent);\n</script>',
                },
              ],
            },
            {
              label: "Do not match self",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<section><p id="current" class="target">A</p><p>B</p></section>\n<script>\nfunction getSiblings(element) {\n  return Array.from(element.parentNode?.children ?? []).filter(child => child !== element);\n}\nfunction findSibling(element, selector) { return getSiblings(element).find(sibling => sibling.matches(selector)); }\nconsole.log(findSibling(document.querySelector("#current"), ".target"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Navigate a carousel with sibling links",
          explanation:
            "Advances to the next element and wraps from the last item to the first. Use it for a container whose direct element children are all slides.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div id="slides"><p class="active">A</p><p>B</p></div>\n<script>\nfunction showNext(currentSlide) {\n  const parent = currentSlide.parentElement;\n  if (!parent) return null;\n  const next = currentSlide.nextElementSibling || parent.firstElementChild;\n  currentSlide.classList.remove("active");\n  next.classList.add("active");\n  return next;\n}\nlet current = document.querySelector(".active");\ncurrent = showNext(current); console.log(current.textContent);\ncurrent = showNext(current); console.log(current.textContent, document.querySelectorAll("#slides .active").length);\n</script>',
                },
              ],
            },
            {
              label: "Handle a one-slide container",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<div id="slides"><p class="active">Only</p></div>\n<script>\nfunction showNext(currentSlide) {\n  const parent = currentSlide.parentElement;\n  if (!parent) return null;\n  const next = currentSlide.nextElementSibling || parent.firstElementChild;\n  currentSlide.classList.remove("active");\n  next.classList.add("active");\n  return next;\n}\nconst current = document.querySelector(".active");\nconsole.log(showNext(current) === current, current.classList.contains("active"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Find an element’s sibling index",
          explanation:
            "Returns the element’s zero-based index among its parent’s element children. Use it to map a peer to an ordered position.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<section><p>A</p> <p id="current">B</p><p>C</p></section>\n<script>\nfunction getSiblingIndex(element) { return Array.from(element.parentNode?.children ?? []).indexOf(element); }\nconsole.log(getSiblingIndex(document.querySelector("#current")));\n</script>',
                },
              ],
            },
            {
              label: "Return -1 without a parent",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n\n<script>\nfunction getSiblingIndex(element) { return Array.from(element.parentNode?.children ?? []).indexOf(element); }\nconsole.log(getSiblingIndex(document.createElement("p")));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Check first and last element positions",
          explanation:
            "Tests whether an element has a preceding or following element sibling. Use it to identify boundaries within a sibling group.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<section><p id="first">A</p><p id="last">B</p></section>\n<script>\nfunction isFirstChild(element) { return Boolean(element.parentNode) && !element.previousElementSibling; }\nfunction isLastChild(element) { return Boolean(element.parentNode) && !element.nextElementSibling; }\nconsole.log(isFirstChild(document.querySelector("#first")), isLastChild(document.querySelector("#first")));\nconsole.log(isFirstChild(document.querySelector("#last")), isLastChild(document.querySelector("#last")));\n</script>',
                },
              ],
            },
            {
              label: "Handle a lone child and a detached element",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<section>Text<p>Only</p>Text</section>\n<script>\nfunction isFirstChild(element) { return Boolean(element.parentNode) && !element.previousElementSibling; }\nfunction isLastChild(element) { return Boolean(element.parentNode) && !element.nextElementSibling; }\nconst child = document.querySelector("p"), detached = document.createElement("p");\nconsole.log(isFirstChild(child), isLastChild(child), isFirstChild(detached), isLastChild(detached));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Swap with the next element sibling",
          explanation:
            "Moves the next element before the current element, exchanging their element order. Use insertBefore to reorder existing nodes while preserving their identity.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<section><button id="first">A</button><button>B</button><button>C</button></section>\n<script>\nfunction swapWithNext(element) {\n  const next = element.nextElementSibling;\n  if (next) element.parentNode.insertBefore(next, element);\n}\nconst first = document.querySelector("#first");\nfirst.addEventListener("click", () => console.log("Listener kept"));\nswapWithNext(first);\nconsole.log(...Array.from(first.parentElement.children, child => child.textContent));\nfirst.click();\n</script>',
                },
              ],
            },
            {
              label: "Leave the last element in place",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>DOM traversal example</title>\n<body>\n<section><p>A</p><p id="last">B</p></section>\n<script>\nfunction swapWithNext(element) {\n  const next = element.nextElementSibling;\n  if (next) element.parentNode.insertBefore(next, element);\n}\nconst last = document.querySelector("#last");\nswapWithNext(last);\nconsole.log(last.parentElement.lastElementChild === last);\n</script>',
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
            "Inserts a node as the last child and returns that node. Use it to insert one constructed node or move an existing node.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<ul></ul>\n<script>\nconst list = document.querySelector("ul");\nconst li = document.createElement("li"); li.textContent = "New item";\nconst added = list.appendChild(li);\nconsole.log(added === li, list.lastElementChild.textContent);\n</script>',
                },
              ],
            },
            {
              label: "Move an existing element without cloning",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<section id="source"><button class="item">Move</button></section><section id="target"></section>\n<script>\nconst element = document.querySelector(".item"), newParent = document.querySelector("#target");\nelement.addEventListener("click", () => console.log("Listener preserved"));\nnewParent.appendChild(element);\nconsole.log(document.querySelector("#source").children.length, newParent.firstElementChild === element);\nelement.click();\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.append()",
          explanation:
            "Adds multiple nodes or strings at the end of an element. Use it to combine constructed elements and plain text in one insertion.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<div id="target"></div>\n<script>\nconst parent = document.querySelector("#target");\nconst first = document.createElement("b"), last = document.createElement("i");\nfirst.textContent = "A"; last.textContent = "B";\nconsole.log(parent.append(first, " text ", last));\nconsole.log(parent.textContent, parent.childNodes.length);\n</script>',
                },
              ],
            },
            {
              label: "Append literal text strings",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<div id="target"></div>\n<script>\nconst div = document.querySelector("#target");\ndiv.append("Hello ", "World!", " <b>text</b>");\nconsole.log(div.textContent, div.querySelector("b"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.prepend()",
          explanation:
            "Adds nodes or strings before all existing children. Use it for leading content without replacing the current children.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<ul><li>Existing</li></ul>\n<script>\nconst parent = document.querySelector("ul"), child = document.createElement("li");\nchild.textContent = "First";\nparent.prepend(child);\nconsole.log(...Array.from(parent.children, item => item.textContent));\n</script>',
                },
              ],
            },
            {
              label: "Prepend several items in one call",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<div id="target">Existing</div>\n<script>\nconst parent = document.querySelector("#target"), element = document.createElement("b");\nelement.textContent = "Second";\nconsole.log(parent.prepend("First", element, "Third"));\nconsole.log(parent.textContent);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Node.insertBefore()",
          explanation:
            "Inserts or moves a node before a direct child reference and returns the inserted node. Use null as the reference to append.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<ul><li>A</li><li class="marker">C</li></ul>\n<script>\nconst parent = document.querySelector("ul"), child = document.createElement("li");\nchild.textContent = "B";\nconsole.log(parent.insertBefore(child, parent.querySelector(".marker")) === child);\nconsole.log(...Array.from(parent.children, item => item.textContent));\n</script>',
                },
              ],
            },
            {
              label: "Insert first, including before a text node",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<div id="target">Existing text<span>Last</span></div>\n<script>\nconst parent = document.querySelector("#target"), child = document.createElement("b");\nchild.textContent = "First";\nparent.insertBefore(child, parent.firstChild);\nconsole.log(parent.firstChild === child, parent.textContent);\n</script>',
                },
              ],
            },
            {
              label: "Append through a null reference",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<ul><li>A</li></ul>\n<script>\nconst parent = document.querySelector("ul"), child = document.createElement("li");\nchild.textContent = "B"; parent.insertBefore(child, null);\nconsole.log(parent.lastElementChild === child);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.insertAdjacentElement()",
          explanation:
            "Inserts an Element relative to a target element or its children. Use it for precise element insertion without parsing markup.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<section><div class="target">Target</div></section>\n<script>\nconst target = document.querySelector(".target");\nconst before = document.createElement("p"), after = document.createElement("p");\nbefore.textContent = "Before"; after.textContent = "After";\ntarget.insertAdjacentElement("beforebegin", before);\nconst inserted = target.insertAdjacentElement("afterend", after);\nconsole.log(target.previousElementSibling.textContent, target.nextElementSibling.textContent, inserted === after);\n</script>',
                },
              ],
            },
            {
              label: "Insert first and last element children",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<div class="target"><span>Middle</span></div>\n<script>\nconst target = document.querySelector(".target");\nconst first = document.createElement("b"), last = document.createElement("i");\nfirst.textContent = "First"; last.textContent = "Last";\ntarget.insertAdjacentElement("afterbegin", first); target.insertAdjacentElement("beforeend", last);\nconsole.log(target.firstElementChild.textContent, target.lastElementChild.textContent);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.after()",
          explanation:
            "Inserts nodes or text immediately after an element in its parent. Use it for adding sibling content in one call.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<section><p id="current">A</p></section>\n<script>\nconst element = document.querySelector("#current"), next = document.createElement("p");\nnext.textContent = "B"; element.after(next);\nconsole.log(element.nextElementSibling === next);\n</script>',
                },
              ],
            },
            {
              label: "Insert multiple nodes and a text string",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<section><span id="current">Start</span></section>\n<script>\nconst element = document.querySelector("#current"), first = document.createElement("b"), last = document.createElement("i");\nfirst.textContent = "A"; last.textContent = "B";\nconsole.log(element.after(first, " text ", last));\nconsole.log(element.parentElement.textContent);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.before()",
          explanation:
            "Inserts nodes or strings immediately before an element. Use it for new sibling content that should precede a known target.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<section><p id="current">B</p></section>\n<script>\nconst element = document.querySelector("#current"), previous = document.createElement("p");\nprevious.textContent = "A"; element.before(previous);\nconsole.log(element.previousElementSibling.textContent);\n</script>',
                },
              ],
            },
            {
              label: "Insert text and multiple elements",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<section><span id="current">End</span></section>\n<script>\nconst element = document.querySelector("#current"), first = document.createElement("b"), last = document.createElement("i");\nfirst.textContent = "A"; last.textContent = "B";\nelement.before("Text ", first, last);\nconsole.log(element.parentElement.textContent);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Build a list from data",
          explanation:
            "Creates a text-bearing list item for each input value and appends it to a list. Use it to render plain data without HTML interpolation.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<ul></ul>\n<script>\nconst items = ["Apple", "Banana", "Orange"], ul = document.querySelector("ul");\nitems.forEach(item => { const li = document.createElement("li"); li.textContent = item; ul.appendChild(li); });\nconsole.log(...Array.from(ul.children, li => li.textContent));\n</script>',
                },
              ],
            },
            {
              label: "Retain existing items and display markup literally",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<ul><li>Existing</li></ul>\n<script>\nconst ul = document.querySelector("ul"), items = ["<b>Literal</b>"];\nitems.forEach(item => { const li = document.createElement("li"); li.textContent = item; ul.appendChild(li); });\nconsole.log(ul.children.length, ul.lastElementChild.textContent, ul.querySelector("b"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Insert an element at an index",
          explanation:
            "Inserts an element before a selected element-child position, appending beyond the end. Use the helper for zero-based placement among elements.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<ul><li>A</li><li>C</li></ul>\n<script>\nfunction insertAtIndex(parent, child, index) {\n  if (!Number.isInteger(index) || index < 0) throw new RangeError("Invalid index");\n  const children = Array.from(parent.children).filter(element => element !== child);\n  return parent.insertBefore(child, children[index] ?? null);\n}\nconst parent = document.querySelector("ul"), child = document.createElement("li"); child.textContent = "B";\ninsertAtIndex(parent, child, 1);\nconsole.log(...Array.from(parent.children, item => item.textContent));\n</script>',
                },
              ],
            },
            {
              label: "Move an existing child beyond the end and validate input",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<ul><li>A</li><li>B</li><li>C</li></ul>\n<script>\nfunction insertAtIndex(parent, child, index) {\n  if (!Number.isInteger(index) || index < 0) throw new RangeError("Invalid index");\n  const children = Array.from(parent.children).filter(element => element !== child);\n  return parent.insertBefore(child, children[index] ?? null);\n}\nconst parent = document.querySelector("ul"), child = parent.firstElementChild;\ninsertAtIndex(parent, child, 99);\nconsole.log(...Array.from(parent.children, item => item.textContent));\ntry { insertAtIndex(parent, child, -1); } catch (error) { console.log(error.name); }\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Batch insertion with a DocumentFragment",
          explanation:
            "Assembles several nodes in a fragment before moving them into the target. Use it to organize a group insertion without a wrapper element.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<div id="target"></div>\n<script>\nconst fragment = document.createDocumentFragment();\nfor (let i = 0; i < 100; i++) {\n  const div = document.createElement("div"); div.textContent = `Item ${i}`; fragment.appendChild(div);\n}\nconst container = document.querySelector("#target"); container.appendChild(fragment);\nconsole.log(container.children.length, container.lastElementChild.textContent, fragment.childNodes.length);\n</script>',
                },
              ],
            },
            {
              label: "Insert a fragment before a marker",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<ul><li id="marker">Last</li></ul>\n<script>\nconst fragment = document.createDocumentFragment(), first = document.createElement("li");\nfirst.textContent = "First"; fragment.appendChild(first);\nconst list = document.querySelector("ul"); list.insertBefore(fragment, document.querySelector("#marker"));\nconsole.log(list.firstElementChild === first, list.children.length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.remove()",
          explanation:
            "Detaches an element from its parent. Use it for direct removal without first retrieving the parent.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<div class="unwanted">Remove</div>\n<script>\nconst element = document.querySelector(".unwanted");\nconsole.log(element.remove()); element.remove();\nconsole.log(element.isConnected, element.textContent);\n</script>',
                },
              ],
            },
            {
              label: "Remove selected temporary elements",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<section><p class="remove-me temporary">A</p><p class="remove-me">B</p><p>Keep</p></section>\n<script>\ndocument.querySelectorAll(".remove-me").forEach(element => {\n  if (element.classList.contains("temporary")) element.remove();\n});\nconsole.log(document.querySelectorAll(".remove-me").length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Node.removeChild()",
          explanation:
            "Removes a direct child from a parent and returns the removed node. Use the returned node to move or reattach it later.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<section id="source"><button class="child">Run</button></section><section id="target"></section>\n<script>\nconst child = document.querySelector(".child"), parent = child.parentElement;\nchild.addEventListener("click", () => console.log("Still listening"));\nconst removed = parent.removeChild(child);\ndocument.querySelector("#target").appendChild(removed);\nconsole.log(removed === child, parent.children.length); removed.click();\n</script>',
                },
              ],
            },
            {
              label: "Remove first and last element children",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<ul><li>A</li><li>B</li><li>C</li></ul>\n<script>\nconst parent = document.querySelector("ul");\nif (parent.firstElementChild) parent.removeChild(parent.firstElementChild);\nif (parent.lastElementChild) parent.removeChild(parent.lastElementChild);\nconsole.log(parent.children.length, parent.firstElementChild.textContent);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.replaceWith()",
          explanation:
            "Replaces an element with one or more nodes or strings. Use it for replacing a target directly rather than calling its parent.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<section><p class="old">Old</p></section>\n<script>\nconst oldElement = document.querySelector(".old"), newElement = document.createElement("div");\nnewElement.className = "new"; newElement.textContent = "Replaced!";\nconsole.log(oldElement.replaceWith(newElement));\nconsole.log(oldElement.isConnected, document.querySelector(".new").textContent);\n</script>',
                },
              ],
            },
            {
              label: "Replace with several nodes and text",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<section><p class="old">Old</p></section>\n<script>\nconst oldElement = document.querySelector(".old"), parent = oldElement.parentElement;\nconst first = document.createElement("b"), last = document.createElement("i");\nfirst.textContent = "A"; last.textContent = "B";\noldElement.replaceWith(first, " text ", last);\nconsole.log(parent.textContent, parent.childNodes.length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Node.replaceChild()",
          explanation:
            "Replaces a direct child and returns the old child. Use it when the parent and both nodes are already known.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<section><p class="old">Old</p></section>\n<script>\nconst oldChild = document.querySelector(".old"), parent = oldChild.parentElement;\nconst newChild = document.createElement("p"); newChild.textContent = "New";\nconst replaced = parent.replaceChild(newChild, oldChild);\nconsole.log(replaced === oldChild, replaced.isConnected, parent.textContent);\n</script>',
                },
              ],
            },
            {
              label: "Move a replacement node from another parent",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<section id="source"><button>Move</button></section><section id="target"><p>Old</p></section>\n<script>\nconst newChild = document.querySelector("button"), parent = document.querySelector("#target");\nparent.replaceChild(newChild, parent.firstChild);\nconsole.log(document.querySelector("#source").children.length, parent.firstChild === newChild);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Clear all children with text, HTML, or a loop",
          explanation:
            "Empties a container while retaining the container itself. Use an empty textContent/innerHTML assignment or remove firstChild repeatedly.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<div id="a"><p>A</p></div><div id="b">Text<!--comment--></div>\n<script>\nconst a = document.querySelector("#a"), b = document.querySelector("#b");\na.textContent = ""; b.innerHTML = "";\nconsole.log(a.childNodes.length, b.childNodes.length);\n</script>',
                },
              ],
            },
            {
              label: "Remove every node in a loop",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<div id="target">Text<p>A</p><!--comment--></div>\n<script>\nconst parent = document.querySelector("#target");\nwhile (parent.firstChild) parent.removeChild(parent.firstChild);\nconsole.log(parent.hasChildNodes());\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Element.replaceChildren()",
          explanation:
            "Replaces all child nodes with supplied nodes or strings, or clears the container when called with no arguments. Use it for an explicit complete child-list replacement.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<div id="target">Text<p>A</p></div>\n<script>\nconst parent = document.querySelector("#target");\nconsole.log(parent.replaceChildren(), parent.childNodes.length);\n</script>',
                },
              ],
            },
            {
              label: "Replace the complete child list",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<div id="target"><p>Old</p></div>\n<script>\nconst parent = document.querySelector("#target"), first = document.createElement("b"), last = document.createElement("i");\nfirst.textContent = "A"; last.textContent = "B";\nparent.replaceChildren(first, " text ", last);\nconsole.log(parent.textContent, parent.children.length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Remove all elements with a class",
          explanation:
            "Selects matching elements and removes each one. Use a static selector result to avoid live-collection index shifts during removal.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<section><p class="temporary">A</p><p class="temporary">B</p><p>Keep</p></section>\n<script>\nfunction removeByClass(className) {\n  document.querySelectorAll(`.${CSS.escape(className)}`).forEach(element => element.remove());\n}\nremoveByClass("temporary");\nconsole.log(document.querySelector("section").textContent);\n</script>',
                },
              ],
            },
            {
              label: "Escape punctuation in the class token",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<section><p class="temp:old">Remove</p><p>Keep</p></section>\n<script>\nfunction removeByClass(className) {\n  document.querySelectorAll(`.${CSS.escape(className)}`).forEach(element => element.remove());\n}\nremoveByClass("temp:old");\nconsole.log(document.querySelector("section").children.length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Safely remove an optional match",
          explanation:
            "Checks whether the first selector match exists before removing it. Use it for optional UI elements.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<div class="temporary">Remove</div>\n<script>\nfunction safeRemove(selector) {\n  const element = document.querySelector(selector);\n  if (element) element.remove();\n}\nsafeRemove(".temporary");\nconsole.log(document.querySelector(".temporary"));\n</script>',
                },
              ],
            },
            {
              label: "Ignore a missing match",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<p>Keep</p>\n<script>\nfunction safeRemove(selector) {\n  const element = document.querySelector(selector);\n  if (element) element.remove();\n}\nsafeRemove(".missing");\nconsole.log(document.querySelector("p").textContent);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Detach and reattach an element",
          explanation:
            "Saves a parent and sibling anchor before removal, then restores the same element. Use it for temporary removal while retaining state and listeners.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<section><button>A</button> <span>B</span></section>\n<script>\nfunction detach(element) {\n  const parent = element.parentNode, nextSibling = element.nextSibling;\n  element.remove();\n  return {\n    element,\n    reattach() {\n      if (parent) parent.insertBefore(element, nextSibling?.parentNode === parent ? nextSibling : null);\n      return element;\n    }\n  };\n}\nconst element = document.querySelector("button");\nelement.addEventListener("click", () => console.log("Listener retained"));\nconst saved = detach(element);\nconsole.log(element.isConnected);\nsaved.reattach();\nconsole.log(element.parentElement.firstChild === element); element.click();\n</script>',
                },
              ],
            },
            {
              label: "Handle an anchor that was removed while detached",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<section><p id="item">A</p><p id="anchor">B</p><p>C</p></section>\n<script>\nfunction detach(element) {\n  const parent = element.parentNode, nextSibling = element.nextSibling;\n  element.remove();\n  return {\n    element,\n    reattach() {\n      if (parent) parent.insertBefore(element, nextSibling?.parentNode === parent ? nextSibling : null);\n      return element;\n    }\n  };\n}\nconst saved = detach(document.querySelector("#item"));\ndocument.querySelector("#anchor").remove();\nsaved.reattach();\nconsole.log(...Array.from(saved.element.parentElement.children, child => child.textContent));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Custom replaceChildren helper",
          explanation:
            "Clears a parent and appends a supplied collection of nodes. Use it to recognize the image’s manual alternative to the built-in method.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<div id="target"><p>Old</p></div>\n<script>\nfunction replaceChildren(parent, newChildren) {\n  const snapshot = Array.from(newChildren);\n  parent.innerHTML = "";\n  snapshot.forEach(child => parent.appendChild(child));\n}\nconst parent = document.querySelector("#target"), child = document.createElement("p"); child.textContent = "New";\nreplaceChildren(parent, [child]);\nconsole.log(parent.textContent, parent.firstChild === child);\n</script>',
                },
              ],
            },
            {
              label: "Reuse the parent’s own live children collection",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<div id="target"><p>A</p><p>B</p></div>\n<script>\nfunction replaceChildren(parent, newChildren) {\n  const snapshot = Array.from(newChildren);\n  parent.innerHTML = "";\n  snapshot.forEach(child => parent.appendChild(child));\n}\nconst parent = document.querySelector("#target"), first = parent.firstElementChild;\nreplaceChildren(parent, parent.children);\nconsole.log(parent.children.length, parent.firstElementChild === first);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Remove an element after a fade delay",
          explanation:
            "Sets an opacity transition and removes the element after a scheduled delay. Use it for the simple timer-based fade-removal pattern shown in the image.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<div class="notice" style="opacity:1">Notice</div>\n<script>\nfunction removeWithFade(element, duration = 20) {\n  element.style.transition = `opacity ${duration}ms`;\n  getComputedStyle(element).opacity; // establish starting style\n  element.style.opacity = "0";\n  return new Promise(resolve => {\n    setTimeout(() => { element.remove(); resolve(element); }, duration);\n  });\n}\nconst element = document.querySelector(".notice");\nremoveWithFade(element).then(removed => console.log(removed === element, element.isConnected, element.style.opacity));\n</script>',
                },
              ],
            },
            {
              label: "Retain the removed element for later reuse",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Adding and removing example</title>\n<body>\n<div class="notice" style="opacity:1">Notice</div><section id="archive"></section>\n<script>\nfunction removeWithFade(element, duration = 20) {\n  element.style.transition = `opacity ${duration}ms`;\n  getComputedStyle(element).opacity; // establish starting style\n  element.style.opacity = "0";\n  return new Promise(resolve => {\n    setTimeout(() => { element.remove(); resolve(element); }, duration);\n  });\n}\nremoveWithFade(document.querySelector(".notice"), 10).then(element => {\n  element.style.transition = ""; element.style.opacity = "1";\n  document.querySelector("#archive").appendChild(element);\n  console.log(element.isConnected, element.style.opacity);\n});\n</script>',
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
            "Registers a callback for a particular event type without replacing existing listeners. Use it to respond to interactions or dispatched events.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst button = document.querySelector("button");\nbutton.addEventListener("click", function () { console.log("Button clicked!"); });\nbutton.addEventListener("click", event => console.log("Clicked:", event.target.tagName));\nbutton.click();\n</script>',
                },
              ],
            },
            {
              label: "Register a named function",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst button = document.querySelector("button");\nfunction handleClick(event) { console.log(event.type); }\nbutton.addEventListener("click", handleClick);\nbutton.click();\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Listener option: once",
          explanation:
            "Automatically removes a listener before its first invocation. Use it when only the first matching event should be handled.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst button = document.querySelector("button");\nbutton.addEventListener("click", () => console.log("Once"), { once: true });\nbutton.click(); button.click();\n</script>',
                },
              ],
            },
            {
              label: "Combine a one-time listener with a persistent listener",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst button = document.querySelector("button");\nbutton.addEventListener("click", () => console.log("First only"), { once: true });\nbutton.addEventListener("click", () => console.log("Every click"));\nbutton.click(); button.click();\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Listener option: passive",
          explanation:
            "Declares that a listener will not cancel the event’s default action. Use it for observers that do not need cancellation, particularly relevant wheel or touch listeners.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<div id="box"></div>\n<script>\nconst element = document.querySelector("#box");\nfunction handleScroll(event) { console.log(event.type, event.cancelable); }\nelement.addEventListener("scroll", handleScroll, { passive: true, once: true });\nelement.dispatchEvent(new Event("scroll"));\nelement.dispatchEvent(new Event("scroll"));\n</script>',
                },
              ],
            },
            {
              label: "Show that passive prevents cancellation",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<div id="box"></div>\n<script>\nconst element = document.querySelector("#box");\nelement.addEventListener("wheel", event => {\n  event.preventDefault();\n  console.log(event.defaultPrevented);\n}, { passive: true });\nelement.dispatchEvent(new WheelEvent("wheel", { cancelable: true }));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Listener option: capture",
          explanation:
            "Invokes an ancestor listener during the capture phase before the event reaches its target. Use capture when the ancestor should observe an event on its way down the tree.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<section><button>Run</button></section>\n<script>\nconst parent = document.querySelector("section"), button = document.querySelector("button");\nparent.addEventListener("click", () => console.log("Capture"), { capture: true });\nbutton.addEventListener("click", () => console.log("Target"));\nparent.addEventListener("click", () => console.log("Bubble"));\nbutton.click();\n</script>',
                },
              ],
            },
            {
              label: "Use boolean shorthand without duplicate registration",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<section><button>Run</button></section>\n<script>\nconst parent = document.querySelector("section"), button = document.querySelector("button");\nfunction handleClick() { console.log("Captured once"); }\nparent.addEventListener("click", handleClick, { capture: true });\nparent.addEventListener("click", handleClick, true);\nbutton.click();\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "EventTarget.removeEventListener()",
          explanation:
            "Removes an existing listener by type, callback identity, and capture flag. Use a retained function reference to stop handling an event.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst button = document.querySelector("button");\nconst handler = () => console.log("Not reached");\nbutton.addEventListener("click", handler);\nbutton.removeEventListener("click", handler);\nbutton.click(); console.log("Removed");\n</script>',
                },
              ],
            },
            {
              label: "A new anonymous function cannot remove the original",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst button = document.querySelector("button");\nbutton.addEventListener("click", () => console.log("Click"));\nbutton.removeEventListener("click", () => console.log("Click"));\nbutton.click();\n</script>',
                },
              ],
            },
            {
              label: "Match the capture flag",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst button = document.querySelector("button"); let calls = 0;\nfunction handler() { calls++; }\nbutton.addEventListener("click", handler, true);\nbutton.removeEventListener("click", handler, false); button.click();\nbutton.removeEventListener("click", handler, true); button.click();\nconsole.log(calls);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Multiple listeners and event types",
          explanation:
            "Registers independent callbacks for one event or shares a handler across multiple event types. Use separate registrations for each event name.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst element = document.querySelector("button");\nelement.addEventListener("click", () => console.log("First"));\nelement.addEventListener("click", () => console.log("Second"));\nelement.click();\n</script>',
                },
              ],
            },
            {
              label: "Share one callback across two event names",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst element = document.querySelector("button");\nfunction handleInteraction(event) { console.log(event.type); }\n["click", "touchstart"].forEach(type => element.addEventListener(type, handleInteraction));\nelement.click(); element.dispatchEvent(new Event("touchstart"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Listener this: ordinary functions and arrows",
          explanation:
            "Uses currentTarget as this for an ordinary event listener, while an arrow retains its enclosing this. Use event.currentTarget when explicit receiver access is clearer.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst element = document.querySelector("button");\nelement.addEventListener("click", function (event) {\n  this.classList.toggle("active");\n  console.log(this === event.currentTarget, this.className);\n});\nelement.click();\n</script>',
                },
              ],
            },
            {
              label: "Capture an enclosing receiver with an arrow",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst element = document.querySelector("button");\nfunction attach() {\n  element.addEventListener("click", event => console.log(this.name, event.currentTarget === element));\n}\nattach.call({ name: "Outer" }); element.click();\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Remove listener groups with AbortController",
          explanation:
            "Registers multiple listeners with one signal so abort removes them together. Use it to clean up a set of related registrations.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst button = document.querySelector("button"), controller = new AbortController();\nbutton.addEventListener("click", () => console.log("Click"), { signal: controller.signal });\nbutton.addEventListener("mouseover", () => console.log("Over"), { signal: controller.signal });\ncontroller.abort();\nbutton.click(); button.dispatchEvent(new MouseEvent("mouseover"));\nconsole.log("Listeners removed");\n</script>',
                },
              ],
            },
            {
              label: "An already-aborted signal skips registration",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst button = document.querySelector("button"), controller = new AbortController();\ncontroller.abort();\nbutton.addEventListener("click", () => console.log("Not reached"), { signal: controller.signal });\nbutton.click(); console.log(controller.signal.aborted);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Debounce an input listener",
          explanation:
            "Resets a timer for each input event and handles only the final value after a quiet interval. Use it for delayed search or validation work.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<input>\n<script>\nconst input = document.querySelector("input");\nlet timeout;\ninput.addEventListener("input", event => {\n  const value = event.target.value;\n  clearTimeout(timeout);\n  timeout = setTimeout(() => console.log("Search:", value), 10);\n});\nfor (const value of ["J", "Ja", "JavaScript"]) { input.value = value; input.dispatchEvent(new Event("input")); }\n</script>',
                },
              ],
            },
            {
              label: "Cancel queued work when tearing down",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<input>\n<script>\nconst input = document.querySelector("input");\nlet timeout;\ninput.addEventListener("input", event => {\n  const value = event.target.value;\n  clearTimeout(timeout);\n  timeout = setTimeout(() => console.log("Search:", value), 10);\n});\ninput.value = "Obsolete"; input.dispatchEvent(new Event("input"));\nclearTimeout(timeout);\nsetTimeout(() => console.log("Canceled"), 20);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Manual one-time listener setup",
          explanation:
            "Removes a listener from inside its own callback. Use it to recognize a manual alternative to once: true.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst button = document.querySelector("button");\nfunction initButton(button) {\n  const handleClick = () => { button.removeEventListener("click", handleClick); console.log("Clicked"); };\n  button.addEventListener("click", handleClick);\n}\ninitButton(button); button.click(); button.click();\n</script>',
                },
              ],
            },
            {
              label: "Remove before a nested dispatch",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst button = document.querySelector("button");\nfunction handler() {\n  button.removeEventListener("click", handler);\n  console.log("Once");\n  button.dispatchEvent(new Event("click"));\n}\nbutton.addEventListener("click", handler); button.click();\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Toggle a listener on and off",
          explanation:
            "Uses a retained callback and state flag to switch a registration. Use it when handling is enabled only in a particular mode.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst element = document.querySelector("button");\nlet isListening = false;\nfunction handler() { console.log("Handled"); }\nfunction toggleListener() {\n  if (isListening) element.removeEventListener("click", handler);\n  else element.addEventListener("click", handler);\n  isListening = !isListening;\n}\ntoggleListener(); element.click();\ntoggleListener(); element.click();\nconsole.log(isListening);\n</script>',
                },
              ],
            },
            {
              label: "Enable handling again",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst element = document.querySelector("button");\nlet isListening = false;\nfunction handler() { console.log("Handled"); }\nfunction toggleListener() {\n  if (isListening) element.removeEventListener("click", handler);\n  else element.addEventListener("click", handler);\n  isListening = !isListening;\n}\ntoggleListener(); toggleListener(); toggleListener();\nelement.click(); console.log(isListening);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Event.target and Event.currentTarget",
          explanation:
            "Distinguishes the dispatch target from the object whose listener is currently running. Use currentTarget for the listener container and target for the originating node.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<div id="parent"><button id="child">Run</button></div>\n<script>\nconst parent = document.querySelector("#parent"), child = document.querySelector("#child");\nparent.addEventListener("click", function (event) {\n  console.log(event.target.id, event.currentTarget.id, this === event.currentTarget);\n});\nchild.click();\n</script>',
                },
              ],
            },
            {
              label: "Snapshot currentTarget before asynchronous work",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst element = document.querySelector("button");\nelement.addEventListener("click", event => {\n  const current = event.currentTarget;\n  queueMicrotask(() => console.log(current === element, event.currentTarget));\n});\nelement.click();\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Event type, timestamp, bubbles, and cancelable",
          explanation:
            "Reads basic metadata describing an event and its dispatch behavior. Use these fields to inspect the event kind and supported cancellation.",
          note: "timeStamp is a high-resolution time relative to a time origin, not a Unix epoch timestamp. Its precision can be reduced. Constructor defaults for bubbles and cancelable are false unless specified.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/Event",
          examples: [
            {
              label: "Inspect explicit event flags",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst element = document.querySelector("button");\nelement.addEventListener("demo", event => console.log(event.type, typeof event.timeStamp, event.timeStamp >= 0, event.bubbles, event.cancelable));\nelement.dispatchEvent(new Event("demo", { bubbles: true, cancelable: true }));\n</script>',
                },
              ],
            },
            {
              label: "Inspect constructor defaults and synthetic trust",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst element = document.querySelector("button");\nelement.addEventListener("demo", event => console.log(event.bubbles, event.cancelable, event.isTrusted));\nelement.dispatchEvent(new Event("demo"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Mouse coordinate properties",
          explanation:
            "Reads viewport, document, screen, and target-relative coordinates from mouse events. Use the coordinate space that matches the calculation.",
          note: "clientX/Y are viewport-relative, pageX/Y are document-relative, screenX/Y are screen-relative, and offsetX/Y relate to the target padding edge. Synthetic values demonstrate fields and are not measurements of real pointer hardware.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent",
          examples: [
            {
              label: "Inspect configured viewport and screen coordinates",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<div id="target">Target</div>\n<script>\nconst element = document.querySelector("#target");\nelement.addEventListener("mousemove", event => console.log(event.clientX, event.clientY, event.screenX, event.screenY));\nelement.dispatchEvent(new MouseEvent("mousemove", { clientX: 10, clientY: 20, screenX: 100, screenY: 200 }));\n</script>',
                },
              ],
            },
            {
              label: "Read document and target-relative coordinate fields",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<div id="target">Target</div>\n<script>\nconst element = document.querySelector("#target");\nelement.addEventListener("mousemove", event => {\n  console.log(Number.isFinite(event.pageX), Number.isFinite(event.pageY), Number.isFinite(event.offsetX), Number.isFinite(event.offsetY));\n});\nelement.dispatchEvent(new MouseEvent("mousemove", { clientX: 10, clientY: 20 }));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Modifier key properties",
          explanation:
            "Reads ctrlKey, shiftKey, altKey, and metaKey from relevant input events. Use modifiers to distinguish shortcuts or modified clicks.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst element = document.querySelector("button");\nelement.addEventListener("click", event => console.log(event.ctrlKey, event.shiftKey, event.altKey, event.metaKey));\nelement.dispatchEvent(new MouseEvent("click", { ctrlKey: true, shiftKey: true }));\n</script>',
                },
              ],
            },
            {
              label: "Inspect keyboard-event modifiers",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<input>\n<script>\nconst input = document.querySelector("input");\ninput.addEventListener("keydown", event => console.log(event.ctrlKey, event.shiftKey, event.altKey, event.metaKey));\ninput.dispatchEvent(new KeyboardEvent("keydown", { key: "s", altKey: true, metaKey: true }));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Event.preventDefault()",
          explanation:
            "Requests cancellation of an event’s default action when cancellation is allowed. Use it for custom form handling, controlled navigation, or conditional control activation.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<form><input name="email" value="john@example.com"><button>Send</button></form>\n<script>\nconst form = document.querySelector("form");\nform.addEventListener("submit", event => {\n  event.preventDefault();\n  const formData = new FormData(event.currentTarget);\n  console.log(formData.get("email"), event.defaultPrevented);\n});\nform.requestSubmit();\n</script>',
                },
              ],
            },
            {
              label: "Cancel a link click while still allowing bubbling",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<div><a href="https://example.com/">Open</a></div>\n<script>\nconst link = document.querySelector("a");\nlink.addEventListener("click", event => { event.preventDefault(); console.log(event.currentTarget.href); });\nlink.parentElement.addEventListener("click", event => console.log("Bubbled", event.defaultPrevented));\nlink.click();\n</script>',
                },
              ],
            },
            {
              label: "Conditionally prevent checkbox activation",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<input type="checkbox">\n<script>\nconst checkbox = document.querySelector("input"), someCondition = true;\ncheckbox.addEventListener("click", event => { if (someCondition) event.preventDefault(); });\ncheckbox.click();\nconsole.log(checkbox.checked);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Event.stopPropagation()",
          explanation:
            "Stops further traversal of the event path after the current target’s listeners. Use it when an event should not reach ancestor listeners in later propagation.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<div><button>Run</button></div>\n<script>\nconst parent = document.querySelector("div"), child = document.querySelector("button");\nparent.addEventListener("click", () => console.log("Not reached"));\nchild.addEventListener("click", event => { event.stopPropagation(); console.log("Child"); });\nchild.addEventListener("click", () => console.log("Second child listener"));\nchild.click();\n</script>',
                },
              ],
            },
            {
              label: "Observe an ancestor capture listener before stopping",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<div><button>Run</button></div>\n<script>\nconst parent = document.querySelector("div"), child = document.querySelector("button");\nparent.addEventListener("click", () => console.log("Captured already"), true);\nchild.addEventListener("click", event => { event.stopPropagation(); console.log(event.defaultPrevented); });\nchild.click();\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Event.stopImmediatePropagation()",
          explanation:
            "Stops remaining listeners on the current target and prevents further propagation. Use it when later same-target handlers must also be skipped.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<div><button>Run</button></div>\n<script>\nconst parent = document.querySelector("div"), element = document.querySelector("button");\nelement.addEventListener("click", event => { console.log("First"); event.stopImmediatePropagation(); });\nelement.addEventListener("click", () => console.log("Not reached"));\nparent.addEventListener("click", () => console.log("Not reached"));\nelement.click();\n</script>',
                },
              ],
            },
            {
              label: "Keep effects from earlier listeners",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst element = document.querySelector("button");\nelement.addEventListener("click", () => console.log("Earlier"));\nelement.addEventListener("click", event => { event.stopImmediatePropagation(); console.log(event.defaultPrevented); });\nelement.addEventListener("click", () => console.log("Not reached"));\nelement.click();\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "KeyboardEvent.key and code",
          explanation:
            "Reads the interpreted key value and physical-key code from keyboard events. Use key for user-intent checks such as Enter or Escape and code when physical position matters.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<input>\n<script>\nconst input = document.querySelector("input");\ninput.addEventListener("keydown", event => {\n  if (event.key === "Enter") console.log("Enter", event.code);\n  if (event.key === "Escape") console.log("Escape", typeof event.keyCode);\n});\ninput.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter" }));\ninput.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape" }));\n</script>',
                },
              ],
            },
            {
              label: "Handle a modified save shortcut",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<input>\n<script>\nconst input = document.querySelector("input");\ninput.addEventListener("keydown", event => {\n  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") { event.preventDefault(); console.log("Save", event.defaultPrevented); }\n});\ninput.dispatchEvent(new KeyboardEvent("keydown", { key: "s", code: "KeyS", ctrlKey: true, cancelable: true }));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "MouseEvent.button, buttons, and detail",
          explanation:
            "Reads the changed button, current pressed-button bitmask, and event-specific click count. Use these fields to distinguish mouse actions.",
          note: "button uses 0 for the primary, 1 for auxiliary, and 2 for secondary button; physical mappings can be customized. buttons is a bitmask, not the same numbering scheme. detail depends on event type.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent",
          examples: [
            {
              label: "Inspect primary-button press metadata",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst element = document.querySelector("button");\nelement.addEventListener("mousedown", event => console.log(event.button, event.buttons, event.detail));\nelement.dispatchEvent(new MouseEvent("mousedown", { button: 0, buttons: 1, detail: 1 }));\n</script>',
                },
              ],
            },
            {
              label: "Inspect a secondary-button press",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<button>Run</button>\n<script>\nconst element = document.querySelector("button");\nelement.addEventListener("mousedown", event => console.log(event.button, event.buttons, event.detail));\nelement.dispatchEvent(new MouseEvent("mousedown", { button: 2, buttons: 2, detail: 1 }));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "TouchEvent.touches",
          explanation:
            "Reads the current active touch points and their coordinates. Use touches length for active-contact counts and check for a point before reading it.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<div id="surface">Touch area</div>\n<script>\nconst element = document.querySelector("#surface");\nelement.addEventListener("touchstart", event => {\n  const touch = event.touches[0];\n  if (touch) console.log(touch.clientX, touch.clientY, event.touches.length);\n});\nconst touch = new Touch({ identifier: 1, target: element, clientX: 10, clientY: 20 });\nelement.dispatchEvent(new TouchEvent("touchstart", { touches: [touch] }));\n</script>',
                },
              ],
            },
            {
              label: "Handle an event with no remaining active touches",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<div id="surface">Touch area</div>\n<script>\nconst element = document.querySelector("#surface");\nelement.addEventListener("touchend", event => {\n  console.log(event.touches.length, event.touches[0] === undefined);\n});\nelement.dispatchEvent(new TouchEvent("touchend", { touches: [] }));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "CustomEvent and dispatchEvent()",
          explanation:
            "Creates an application event carrying data in detail and dispatches it synchronously. Use it to notify components without requiring a built-in interaction type.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<div id="target"></div>\n<script>\nconst element = document.querySelector("#target");\nelement.addEventListener("myevent", event => console.log(event.detail.message));\nconst customEvent = new CustomEvent("myevent", { detail: { message: "Hello" }, bubbles: true, cancelable: true });\nconsole.log(element.dispatchEvent(customEvent));\n</script>',
                },
              ],
            },
            {
              label: "Bubble a custom event and cancel it",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Events basics example</title>\n<body>\n<section><div id="target"></div></section>\n<script>\nconst element = document.querySelector("#target"), parent = element.parentElement;\nparent.addEventListener("myevent", event => { console.log(event.detail.message); event.preventDefault(); });\nconst event = new CustomEvent("myevent", { detail: { message: "Payload" }, bubbles: true, cancelable: true });\nconsole.log(element.dispatchEvent(event), event.defaultPrevented);\n</script>',
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
            "Registers a listener on a stable ancestor and selects relevant events from descendants. Use it to share handling across a group, including future children.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<div id="controls"><button class="btn">A</button><button class="btn">B</button></div>\n<script>\nconst controls = document.querySelector("#controls");\ncontrols.addEventListener("click", event => {\n  if (event.target instanceof Element && event.target.classList.contains("btn")) console.log(event.target.textContent);\n});\ncontrols.querySelectorAll("button").forEach(button => button.click());\n</script>',
                },
              ],
            },
            {
              label: "Ignore unrelated targets in the same container",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<div id="controls"><button class="btn">Run</button><p>Ignore</p></div>\n<script>\nconst controls = document.querySelector("#controls"); let count = 0;\ncontrols.addEventListener("click", event => { if (event.target instanceof Element && event.target.matches(".btn")) count++; });\ncontrols.querySelector("p").click(); controls.querySelector("button").click();\nconsole.log(count);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Filter delegated targets with matches()",
          explanation:
            "Tests whether the event’s target itself matches a selector. Use it when the directly targeted element is the actionable control.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<ul id="list"><li class="item"><button class="delete-btn">Delete</button></li><li>Keep</li></ul>\n<script>\nconst list = document.querySelector("#list");\nlist.addEventListener("click", event => {\n  if (!(event.target instanceof Element) || !event.target.matches(".delete-btn")) return;\n  const item = event.target.closest(".item");\n  if (item && item !== list && list.contains(item)) item.remove();\n});\nlist.querySelector("button").click();\nconsole.log(list.children.length, list.textContent);\n</script>',
                },
              ],
            },
            {
              label: "Read a directly targeted data action",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<div id="controls"><button data-action="save">Save</button></div>\n<script>\nconst controls = document.querySelector("#controls");\nfunction handleAction(action) { console.log("Action:", action); }\ncontrols.addEventListener("click", event => {\n  if (event.target instanceof Element && event.target.matches("[data-action]")) handleAction(event.target.dataset.action);\n});\ncontrols.querySelector("button").click();\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Resolve nested targets with closest()",
          explanation:
            "Finds a matching item from the event target or its ancestors. Use it when controls contain text, icons, or other nested elements.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<ul id="list"><li class="list-item" data-id="123"><button><span>Choose</span></button></li></ul>\n<script>\nconst list = document.querySelector("#list");\nlist.addEventListener("click", event => {\n  if (!(event.target instanceof Element)) return;\n  const item = event.target.closest(".list-item");\n  if (!item || item === list || !list.contains(item)) return;\n  console.log("Selected:", item.dataset.id);\n});\nlist.querySelector("span").click();\n</script>',
                },
              ],
            },
            {
              label: "Reject an ancestor match outside the container",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<section class="list-item" data-id="outside"><div id="list"><button>Ignore</button></div></section>\n<script>\nconst list = document.querySelector("#list");\nlist.addEventListener("click", event => {\n  if (!(event.target instanceof Element)) return;\n  const item = event.target.closest(".list-item");\n  if (!item || item === list || !list.contains(item)) return;\n  console.log("Selected:", item.dataset.id);\n});\nlist.querySelector("button").click();\nconsole.log("Finished without selecting outside");\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Route multiple delegated handlers",
          explanation:
            "Selects one behavior according to the matched control’s classes. Use early returns to avoid running unrelated branches after handling an action.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<div id="list"><article class="item" id="keep"><button class="edit"><span>Edit</span></button></article><article class="item" id="remove"><button class="delete">Delete</button></article></div>\n<script>\nconst list = document.querySelector("#list");\nlist.addEventListener("click", event => {\n  if (!(event.target instanceof Element)) return;\n  const button = event.target.closest(".delete, .edit, .toggle");\n  if (!button || !list.contains(button)) return;\n  const item = button.closest(".item");\n  if (!item || item === list || !list.contains(item)) return;\n  if (button.matches(".delete")) { item.remove(); return; }\n  if (button.matches(".edit")) { item.dataset.editing = "true"; return; }\n  if (button.matches(".toggle")) button.classList.toggle("active");\n});\nlist.querySelector(".edit span").click(); list.querySelector(".delete").click();\nconsole.log(document.querySelector("#keep").dataset.editing, list.querySelectorAll(".item").length);\n</script>',
                },
              ],
            },
            {
              label: "Toggle the matching control",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<div id="list"><article class="item"><button class="toggle"><span>Toggle</span></button></article></div>\n<script>\nconst list = document.querySelector("#list");\nlist.addEventListener("click", event => {\n  if (!(event.target instanceof Element)) return;\n  const button = event.target.closest(".delete, .edit, .toggle");\n  if (!button || !list.contains(button)) return;\n  const item = button.closest(".item");\n  if (!item || item === list || !list.contains(item)) return;\n  if (button.matches(".delete")) { item.remove(); return; }\n  if (button.matches(".edit")) { item.dataset.editing = "true"; return; }\n  if (button.matches(".toggle")) button.classList.toggle("active");\n});\nlist.querySelector("span").click();\nconsole.log(list.querySelector("button").classList.contains("active"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Route actions with data attributes",
          explanation:
            "Uses data-action and data-id to select behavior through an explicit switch. Use it to separate action metadata from presentation classes.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<div id="controls"><button data-action="delete" data-id="1"><span>Delete</span></button><button data-action="edit" data-id="2">Edit</button><button data-action="toggle" data-id="3">Toggle</button></div>\n<script>\nconst controls = document.querySelector("#controls");\nfunction deleteItem(id) { console.log("Delete", id); }\nfunction editItem(id) { console.log("Edit", id); }\nfunction toggleItem(id) { console.log("Toggle", id); }\ncontrols.addEventListener("click", event => {\n  if (!(event.target instanceof Element)) return;\n  const button = event.target.closest("[data-action]");\n  if (!button || button === controls || !controls.contains(button)) return;\n  const { action, id } = button.dataset;\n  switch (action) {\n    case "delete": deleteItem(id); break;\n    case "edit": editItem(id); break;\n    case "toggle": toggleItem(id); break;\n  }\n});\ncontrols.querySelector("span").click();\ncontrols.querySelectorAll("button")[1].click(); controls.querySelectorAll("button")[2].click();\n</script>',
                },
              ],
            },
            {
              label: "Ignore an unsupported action",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<div id="controls"><button data-action="unknown" data-id="1">Unknown</button></div>\n<script>\nconst controls = document.querySelector("#controls");\nfunction deleteItem(id) { console.log("Delete", id); }\nfunction editItem(id) { console.log("Edit", id); }\nfunction toggleItem(id) { console.log("Toggle", id); }\ncontrols.addEventListener("click", event => {\n  if (!(event.target instanceof Element)) return;\n  const button = event.target.closest("[data-action]");\n  if (!button || button === controls || !controls.contains(button)) return;\n  const { action, id } = button.dataset;\n  switch (action) {\n    case "delete": deleteItem(id); break;\n    case "edit": editItem(id); break;\n    case "toggle": toggleItem(id); break;\n  }\n});\ncontrols.querySelector("button").click();\nconsole.log("Unsupported action ignored");\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Delegate form submission",
          explanation:
            "Handles bubbling submit events on a stable ancestor and reads the submitting form’s data. Use it for a group of forms with shared handling.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<div id="forms"><form class="ajax-form"><input name="name" value="Alice"><button>Send</button></form></div>\n<script>\nconst container = document.querySelector("#forms");\nfunction submitForm(data) { console.log("Submitted:", data.get("name")); }\ncontainer.addEventListener("submit", event => {\n  const form = event.target;\n  if (!(form instanceof HTMLFormElement) || !form.matches(".ajax-form")) return;\n  event.preventDefault();\n  submitForm(new FormData(form));\n});\ncontainer.querySelector("form").requestSubmit();\n</script>',
                },
              ],
            },
            {
              label: "Handle a form added after listener registration",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<div id="forms"></div>\n<script>\nconst container = document.querySelector("#forms");\nfunction submitForm(data) { console.log("Submitted:", data.get("name")); }\ncontainer.addEventListener("submit", event => {\n  const form = event.target;\n  if (!(form instanceof HTMLFormElement) || !form.matches(".ajax-form")) return;\n  event.preventDefault();\n  submitForm(new FormData(form));\n});\nconst form = document.createElement("form"); form.className = "ajax-form";\nconst input = document.createElement("input"); input.name = "name"; input.value = "Bob";\nform.append(input); container.append(form);\nform.requestSubmit();\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Delegate events from dynamic content",
          explanation:
            "Keeps a listener on an ancestor so newly inserted descendants use the same handler. Use it when items are created after initial page setup.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<div id="container"></div>\n<script>\nconst container = document.querySelector("#container");\ncontainer.addEventListener("click", event => {\n  if (!(event.target instanceof Element)) return;\n  const button = event.target.closest(".dynamic-btn");\n  if (button && container.contains(button)) console.log("Clicked dynamic button");\n});\nsetTimeout(() => {\n  const button = document.createElement("button"); button.className = "dynamic-btn"; button.textContent = "New Button";\n  container.appendChild(button); button.click();\n}, 10);\n</script>',
                },
              ],
            },
            {
              label: "Preserve an existing node while inserting trusted markup",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<div id="container"><p>Existing</p></div>\n<script>\nconst container = document.querySelector("#container");\ncontainer.addEventListener("click", event => {\n  if (!(event.target instanceof Element)) return;\n  const button = event.target.closest(".dynamic-btn");\n  if (button && container.contains(button)) console.log("Clicked dynamic button");\n});\nconst existing = container.querySelector("p");\ncontainer.insertAdjacentHTML("beforeend", \'<button class="dynamic-btn"><span>New Button</span></button>\');\ncontainer.querySelector("span").click();\nconsole.log(container.querySelector("p") === existing);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Stop or skip delegated handling",
          explanation:
            "Prevents an event from reaching a bubbling listener or filters an excluded region inside that listener. Use filtering when unrelated listeners should still receive the event.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<div id="container"><button>Run</button></div>\n<script>\nconst container = document.querySelector("#container"), button = container.querySelector("button");\ncontainer.addEventListener("click", () => console.log("Not reached"));\nbutton.addEventListener("click", event => { event.stopPropagation(); console.log("Local only"); });\nbutton.click();\n</script>',
                },
              ],
            },
            {
              label: "Skip an excluded region without stopping propagation",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<div id="container"><section class="no-delegation"><button>Skip</button></section><button id="normal">Run</button></div>\n<script>\nconst container = document.querySelector("#container");\ncontainer.addEventListener("click", event => {\n  if (!(event.target instanceof Element) || event.target.closest(".no-delegation")) return;\n  console.log("Delegated");\n});\ncontainer.addEventListener("click", () => console.log("Observer"));\ncontainer.querySelector(".no-delegation button").click();\ncontainer.querySelector("#normal").click();\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Create application events with Event",
          explanation:
            "Creates an event with an application-defined type and explicit propagation flags. Use Event when no payload is required.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<div id="target"></div>\n<script>\nconst element = document.querySelector("#target");\nelement.addEventListener("my-event", event => console.log(event.type, event.bubbles, event.cancelable));\nelement.dispatchEvent(new Event("my-event", { bubbles: true, cancelable: true }));\n</script>',
                },
              ],
            },
            {
              label: "Show that earlier dispatches are not replayed",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<div id="target"></div>\n<script>\nconst element = document.querySelector("#target");\nelement.dispatchEvent(new Event("ready"));\nelement.addEventListener("ready", () => console.log("Ready now"));\nelement.dispatchEvent(new Event("ready"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "CustomEvent.detail payloads",
          explanation:
            "Creates a custom event with structured application data in detail. Use it for a documented component or application message.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<div id="target"></div>\n<script>\nconst element = document.querySelector("#target");\nelement.addEventListener("user-login", event => console.log(event.detail.userId, event.detail.username));\nelement.dispatchEvent(new CustomEvent("user-login", { detail: { userId: 123, username: "john" }, bubbles: true }));\n</script>',
                },
              ],
            },
            {
              label: "Read a structured action and shared payload identity",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<div id="target"></div>\n<script>\nconst element = document.querySelector("#target");\nconst payload = { action: "click", timestamp: Date.now(), data: { id: 123 } };\nelement.addEventListener("user-action", event => console.log(event.detail.action, event.detail.data.id, Number.isFinite(event.detail.timestamp), event.detail === payload));\nelement.dispatchEvent(new CustomEvent("user-action", { detail: payload, bubbles: true, cancelable: true }));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "dispatchEvent() cancellation contracts",
          explanation:
            "Returns whether an event completed without cancellation. Use cancelable custom events when the emitting component should offer a veto point.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<div id="target"></div>\n<script>\nconst element = document.querySelector("#target");\nelement.addEventListener("before-save", event => event.preventDefault());\nconst notPrevented = element.dispatchEvent(new CustomEvent("before-save", { cancelable: true }));\nif (!notPrevented) console.log("Event was prevented");\n</script>',
                },
              ],
            },
            {
              label: "Proceed when an event is not cancelable",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<div id="target"></div>\n<script>\nconst element = document.querySelector("#target");\nelement.addEventListener("notice", event => event.preventDefault());\nconsole.log(element.dispatchEvent(new CustomEvent("notice")));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Bubble custom events between components",
          explanation:
            "Dispatches a child component event that a containing component observes. Use a payload contract instead of requiring the parent to inspect the child’s internals.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<section id="parent"><button id="child">Choose</button></section>\n<script>\nclass ChildComponent {\n  constructor(element) { this.element = element; }\n  selectItem(item) {\n    this.element.dispatchEvent(new CustomEvent("item-selected", { detail: { item }, bubbles: true }));\n  }\n}\nconst parentElement = document.querySelector("#parent"), child = new ChildComponent(document.querySelector("#child"));\nparentElement.addEventListener("item-selected", event => console.log("Selected:", event.detail.item.id));\nchild.selectItem({ id: 123 });\n</script>',
                },
              ],
            },
            {
              label: "Keep the child event target while the parent listens",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<section id="parent"><div id="child"></div></section>\n<script>\nclass ChildComponent {\n  constructor(element) { this.element = element; }\n  selectItem(item) {\n    this.element.dispatchEvent(new CustomEvent("item-selected", { detail: { item }, bubbles: true }));\n  }\n}\nconst parentElement = document.querySelector("#parent"), child = new ChildComponent(document.querySelector("#child"));\nparentElement.addEventListener("item-selected", event => console.log(event.target.id, event.currentTarget.id));\nchild.selectItem("item");\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Document-based EventBus.emit(), on(), and off()",
          explanation:
            "Wraps document custom-event dispatch and listener registration in a small application bus. Use it when unrelated components need an agreed document-level message channel.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n\n<script>\nclass EventBus {\n  static emit(eventName, data) { return document.dispatchEvent(new CustomEvent(eventName, { detail: data })); }\n  static on(eventName, handler) { document.addEventListener(eventName, handler); }\n  static off(eventName, handler) { document.removeEventListener(eventName, handler); }\n}\nfunction onMessage(event) { console.log("Message:", event.detail.text); }\nEventBus.on("app:message", onMessage);\nEventBus.emit("app:message", { text: "Hello" });\nEventBus.off("app:message", onMessage);\n</script>',
                },
              ],
            },
            {
              label: "Unsubscribe before a later publication",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n\n<script>\nclass EventBus {\n  static emit(eventName, data) { return document.dispatchEvent(new CustomEvent(eventName, { detail: data })); }\n  static on(eventName, handler) { document.addEventListener(eventName, handler); }\n  static off(eventName, handler) { document.removeEventListener(eventName, handler); }\n}\nlet received = 0;\nfunction onMessage() { received++; }\nEventBus.on("app:message", onMessage);\nEventBus.emit("app:message", {});\nEventBus.off("app:message", onMessage);\nEventBus.emit("app:message", {});\nconsole.log(received);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Modal close events",
          explanation:
            "Notifies consumers of a closing component’s result before removing its element. Use it when a parent must read the result while the component is still connected.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<section id="parent"><div class="modal">Dialog</div></section>\n<script>\nclass Modal {\n  constructor(element) { this.element = element; }\n  close(result) {\n    this.element.dispatchEvent(new CustomEvent("modal-close", { detail: { result }, bubbles: true }));\n    this.element.remove();\n  }\n}\nconst element = document.querySelector(".modal"), parent = document.querySelector("#parent");\nparent.addEventListener("modal-close", event => console.log(event.detail.result, event.target.isConnected));\nnew Modal(element).close("saved");\nconsole.log(element.isConnected);\n</script>',
                },
              ],
            },
            {
              label: "Preserve a falsy result in the payload",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<div class="modal">Dialog</div>\n<script>\nclass Modal {\n  constructor(element) { this.element = element; }\n  close(result) {\n    this.element.dispatchEvent(new CustomEvent("modal-close", { detail: { result }, bubbles: true }));\n    this.element.remove();\n  }\n}\nconst element = document.querySelector(".modal");\nelement.addEventListener("modal-close", event => console.log(event.detail.result));\nnew Modal(element).close(false);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Emit a form validation event",
          explanation:
            "Dispatches a custom event with form data after an explicit validation check succeeds. Use it to separate validation from downstream processing.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<section><form><input name="email" type="email" value="john@example.com" required><button>Send</button></form></section>\n<script>\nconst form = document.querySelector("form");\nfunction validateForm(form) { return form.checkValidity(); }\nform.addEventListener("submit", event => {\n  event.preventDefault();\n  if (validateForm(form)) form.dispatchEvent(new CustomEvent("form-valid", { detail: new FormData(form), bubbles: true }));\n  else console.log("Invalid form");\n});\nform.parentElement.addEventListener("form-valid", event => console.log(event.detail.get("email")));\nform.requestSubmit();\n</script>',
                },
              ],
            },
            {
              label: "Reject manually submitted invalid data",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<form><input name="email" type="email" required></form>\n<script>\nconst form = document.querySelector("form");\nfunction validateForm(form) { return form.checkValidity(); }\nform.addEventListener("submit", event => {\n  event.preventDefault();\n  if (validateForm(form)) form.dispatchEvent(new CustomEvent("form-valid", { detail: new FormData(form), bubbles: true }));\n  else console.log("Invalid form");\n});\nform.addEventListener("form-valid", () => console.log("Not reached"));\nform.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Publish tab change events",
          explanation:
            "Emits the selected control’s tab identifier for a containing component. Use it to communicate a choice independently from panel-rendering logic.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<div id="tabs"><button class="tab" data-tab="overview">Overview</button><button class="tab" data-tab="details">Details</button></div>\n<script>\ndocument.querySelectorAll(".tab").forEach(tab => {\n  tab.addEventListener("click", () => {\n    tab.dispatchEvent(new CustomEvent("tab-change", { detail: { tabId: tab.dataset.tab }, bubbles: true }));\n  });\n});\ndocument.querySelector("#tabs").addEventListener("tab-change", event => console.log(event.detail.tabId));\ndocument.querySelectorAll(".tab")[1].click();\n</script>',
                },
              ],
            },
            {
              label: "Keep identifiers as strings",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n<div id="tabs"><button class="tab" data-tab="123">Tab</button></div>\n<script>\ndocument.querySelectorAll(".tab").forEach(tab => {\n  tab.addEventListener("click", () => {\n    tab.dispatchEvent(new CustomEvent("tab-change", { detail: { tabId: tab.dataset.tab }, bubbles: true }));\n  });\n});\ndocument.querySelector("#tabs").addEventListener("tab-change", event => console.log(event.detail.tabId, typeof event.detail.tabId));\ndocument.querySelector(".tab").click();\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Namespace application event names",
          explanation:
            "Groups event-type strings under shared constants to reduce collisions and spelling mistakes. Use an agreed prefix for related application messages.",
          note: "Colons are ordinary characters in an event type, not a built-in namespace or wildcard system. Each exact type still requires its own registration.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/Event/type",
          examples: [
            {
              label: "Use a namespaced login event",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n\n<script>\nconst APP_EVENTS = {\n  USER_LOGIN: "app:user:login", USER_LOGOUT: "app:user:logout",\n  DATA_LOADED: "app:data:loaded", ERROR: "app:error"\n};\nfunction onLogin(event) { console.log(event.detail.user.name); }\ndocument.addEventListener(APP_EVENTS.USER_LOGIN, onLogin);\nconst user = { name: "John" };\ndocument.dispatchEvent(new CustomEvent(APP_EVENTS.USER_LOGIN, { detail: { user } }));\ndocument.removeEventListener(APP_EVENTS.USER_LOGIN, onLogin);\n</script>',
                },
              ],
            },
            {
              label: "Match exact names rather than a prefix",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Advanced events example</title>\n<body>\n\n<script>\nconst APP_EVENTS = {\n  USER_LOGIN: "app:user:login", USER_LOGOUT: "app:user:logout",\n  DATA_LOADED: "app:data:loaded", ERROR: "app:error"\n};\nlet exact = 0, prefix = 0;\nfunction onExact() { exact++; } function onPrefix() { prefix++; }\ndocument.addEventListener(APP_EVENTS.DATA_LOADED, onExact);\ndocument.addEventListener("app:data", onPrefix);\ndocument.dispatchEvent(new CustomEvent(APP_EVENTS.DATA_LOADED));\nconsole.log(exact, prefix);\ndocument.removeEventListener(APP_EVENTS.DATA_LOADED, onExact); document.removeEventListener("app:data", onPrefix);\n</script>',
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
            "Retrieves a form through an ID or the document’s live form collection. Use named or indexed access when the form is already known.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form id="myForm" name="myForm"></form>\n<script>\nconst form = document.getElementById("myForm");\nconsole.log(document.forms["myForm"] === form, document.forms[0] === form);\n</script>',
                },
              ],
            },
            {
              label: "Observe the live forms collection",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form id="first"></form>\n<script>\nconst forms = document.forms;\ndocument.body.appendChild(document.createElement("form"));\nconsole.log(forms.length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "HTMLFormElement.elements",
          explanation:
            "Returns a live collection of associated form controls with named and indexed lookup. Use it to retrieve or iterate form controls.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form id="myForm"><input name="username" value="john"><input name="email" value="john@example.com"><button name="submit" value="save">Save</button></form>\n<script>\nconst form = document.querySelector("form");\nconsole.log(form.elements["username"].value, form.elements.email.value, form.elements["submit"].value, form.elements[0].name);\n</script>',
                },
              ],
            },
            {
              label: "Iterate associated controls including an external input",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form id="myForm"><input name="username" value="john"></form><input form="myForm" name="external" value="outside">\n<script>\nconst form = document.querySelector("form");\nfor (const element of form.elements) console.log(element.name, element.value);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Text input and textarea values",
          explanation:
            "Reads or sets the current text value of inputs and textareas. Use value for live form state rather than child markup.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input value="Original">\n<script>\nconst input = document.querySelector("input");\nconsole.log(input.value); input.value = "New value";\nconsole.log(input.value, input.getAttribute("value"));\n</script>',
                },
              ],
            },
            {
              label: "Update a textarea",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<textarea>Original text</textarea>\n<script>\nconst textarea = document.querySelector("textarea");\ntextarea.value = "New text";\nconsole.log(textarea.value, textarea.defaultValue);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Checkbox checked state",
          explanation:
            "Reads or sets a checkbox’s current boolean checked state. Use checked to inspect selection and value to inspect the submitted token.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input type="checkbox" value="yes">\n<script>\nconst checkbox = document.querySelector("input");\nconsole.log(checkbox.checked); checkbox.checked = true;\nconsole.log(checkbox.checked, checkbox.value);\n</script>',
                },
              ],
            },
            {
              label: "Distinguish a checked token from an omitted checkbox",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form><input type="checkbox" name="enabled" checked><input type="checkbox" name="other"></form>\n<script>\nconst data = new FormData(document.querySelector("form"));\nconsole.log(data.get("enabled"), data.has("other"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Radio group selection",
          explanation:
            "Reads a selected radio from same-named controls. Use the group’s value or find the checked member when an explicit element is needed.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form><input type="radio" name="color" value="red"><input type="radio" name="color" value="blue" checked></form>\n<script>\nconst radios = document.querySelector("form").elements["color"];\nconsole.log(Array.from(radios).find(radio => radio.checked)?.value, radios.value);\n</script>',
                },
              ],
            },
            {
              label: "Change a group selection",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form><input type="radio" name="color" value="red" checked><input type="radio" name="color" value="blue"></form>\n<script>\nconst radios = document.querySelector("form").elements["color"];\nradios.value = "blue";\nconsole.log(radios[0].checked, radios[1].checked);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Select value and selected options",
          explanation:
            "Reads the current option value, display text, index, and selected option element. Use value for data and option text for a displayed label.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<select><option value="a">Apple</option><option value="b" selected>Banana</option></select>\n<script>\nconst select = document.querySelector("select");\nconsole.log(select.value, select.options[select.selectedIndex].text, select.selectedOptions[0].value);\n</script>',
                },
              ],
            },
            {
              label: "Handle no selected option",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<select><option value="a">Apple</option></select>\n<script>\nconst select = document.querySelector("select"); select.selectedIndex = -1;\nconsole.log(select.value, select.selectedIndex, select.selectedOptions[0]?.text);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Multiple-select values",
          explanation:
            "Collects all selected options from a multi-select control. Use selectedOptions rather than value when every selected value is needed.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form><select name="tags" multiple><option value="js" selected>JavaScript</option><option value="css">CSS</option><option value="html" selected>HTML</option></select></form>\n<script>\nconst multiSelect = document.querySelector("form").elements["tags"];\nconsole.log(...Array.from(multiSelect.selectedOptions, option => option.value));\n</script>',
                },
              ],
            },
            {
              label: "Clear all selections",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<select multiple><option value="a" selected>A</option><option value="b" selected>B</option></select>\n<script>\nconst select = document.querySelector("select");\nfor (const option of select.options) option.selected = false;\nconsole.log(select.selectedOptions.length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "new FormData(form)",
          explanation:
            "Constructs a snapshot of a form’s successful named controls. Use it for submission data without manually serializing every control type.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form><input name="username" value="john"><input name="ignored" value="no" disabled><input value="unnamed"><input type="checkbox" name="off"></form>\n<script>\nconst data = new FormData(document.querySelector("form"));\nconsole.log(data.get("username"), data.has("ignored"), data.has("off"), [...data].length);\n</script>',
                },
              ],
            },
            {
              label: "Observe snapshot independence",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form><input name="username" value="john"></form>\n<script>\nconst form = document.querySelector("form"), data = new FormData(form);\nform.elements.username.value = "jane";\nconsole.log(data.get("username"), new FormData(form).get("username"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "FormData.get() and getAll()",
          explanation:
            "Returns the first value or all values for a field name. Use getAll for repeated fields such as checkbox groups and multi-selects.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form><input name="username" value="john"><input name="hobbies" value="reading"><input name="hobbies" value="coding"></form>\n<script>\nconst data = new FormData(document.querySelector("form"));\nconsole.log(data.get("username"), ...data.getAll("hobbies"));\n</script>',
                },
              ],
            },
            {
              label: "Read missing and repeated names",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n\n<script>\nconst data = new FormData(); data.append("tag", "a"); data.append("tag", "b");\nconsole.log(data.get("tag"), data.get("missing"), data.getAll("missing").length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "FormData.set()",
          explanation:
            "Replaces all entries with a field name by one supplied value. Use it to overwrite a field in submission data.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n\n<script>\nconst data = new FormData(); data.append("username", "first"); data.append("username", "second");\ndata.set("username", "newuser");\nconsole.log(...data.getAll("username"));\n</script>',
                },
              ],
            },
            {
              label: "Leave the input unchanged",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form><input name="username" value="john"></form>\n<script>\nconst form = document.querySelector("form"), data = new FormData(form);\ndata.set("username", "newuser");\nconsole.log(data.get("username"), form.elements.username.value);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "FormData.append() and file entries",
          explanation:
            "Adds another entry without discarding earlier entries of the same name. Use it to add files or repeated values.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n\n<script>\nconst data = new FormData(); data.append("tag", "a"); data.append("tag", "b");\nconsole.log(...data.getAll("tag"));\n</script>',
                },
              ],
            },
            {
              label: "Append a file from a defined input fixture",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input type="file">\n<script>\nconst fileInput = document.querySelector("input"), transfer = new DataTransfer();\ntransfer.items.add(new File(["Hello"], "hello.txt", { type: "text/plain" }));\nfileInput.files = transfer.files;\nconst data = new FormData();\nif (fileInput.files[0]) data.append("file", fileInput.files[0]);\nconsole.log(data.get("file").name, data.get("file").size);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "FormData.delete() and has()",
          explanation:
            "Removes every entry for a name or checks whether a name exists. Use them to filter optional submission fields.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n\n<script>\nconst data = new FormData(); data.append("temporary", "a"); data.append("temporary", "b");\ndata.delete("temporary");\nconsole.log(data.has("temporary"));\n</script>',
                },
              ],
            },
            {
              label: "Check an email field with an empty value",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n\n<script>\nconst data = new FormData(); data.set("email", "");\nif (data.has("email")) console.log(data.get("email"), data.has("missing"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Iterate and convert FormData",
          explanation:
            "Iterates name/value pairs or converts them into an object with Object.fromEntries. Use conversion only when its duplicate-name semantics match the application.",
          note: "Object.fromEntries keeps only the last value for repeated names and preserves File objects rather than JSON-serializing them. Use getAll when all repeated values matter.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/FormData",
          examples: [
            {
              label: "Iterate submission entries",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form><input name="username" value="john"><input name="email" value="john@example.com"></form>\n<script>\nconst formData = new FormData(document.querySelector("form"));\nfor (const [key, value] of formData) console.log(key, value);\n</script>',
                },
              ],
            },
            {
              label: "Observe repeated-name loss in object conversion",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n\n<script>\nconst data = new FormData(); data.append("tag", "first"); data.append("tag", "last");\nconst object = Object.fromEntries(data);\nconsole.log(object.tag, data.getAll("tag").length);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Submit a form with fetch and FormData",
          explanation:
            "Intercepts submission synchronously and sends a multipart form body with fetch. Use it when the page should handle the result instead of navigating.",
          note: "For the file-pair example, run node server.cjs with Node.js 22+ and open the printed loopback URL. Do not set Content-Type manually: the browser adds the multipart boundary. Cancel submission only when the application is intentionally taking responsibility for it.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/FormData",
          examples: [
            {
              label: "Submit multipart FormData to a local echo server",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form><input name="username" value="john"><button>Send</button></form>\n<script>\nconst form = document.querySelector("form");\nform.addEventListener("submit", async event => {\n  event.preventDefault();\n  try {\n    const response = await fetch("./submit", { method: "POST", body: new FormData(form) });\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    console.log((await response.json()).username);\n  } catch (error) { console.log(error.message); }\n});\nform.requestSubmit();\n</script>',
                },
                {
                  path: "server.cjs",
                  language: "javascript",
                  code: 'const http = require("node:http");\nconst fs = require("node:fs");\nconst { Readable } = require("node:stream");\nconst server = http.createServer(async (req, res) => {\n  try {\n    if (req.method === "POST" && req.url === "/submit") {\n      const request = new Request("http://localhost/submit", { method: "POST", headers: req.headers, body: Readable.toWeb(req), duplex: "half" });\n      const data = await request.formData();\n      res.writeHead(200, { "Content-Type": "application/json" });\n      res.end(JSON.stringify({ username: data.get("username") }));\n    } else if (req.method === "GET" && req.url === "/") {\n      res.writeHead(200, { "Content-Type": "text/html" });\n      res.end(fs.readFileSync(require("node:path").join(__dirname, "index.html")));\n    } else { res.writeHead(404); res.end(); }\n  } catch { res.writeHead(500); res.end("Server error"); }\n});\nserver.listen(0, "127.0.0.1", () => console.log(`http://127.0.0.1:${server.address().port}/`));',
                },
              ],
            },
            {
              label: "Validate before a custom submission operation",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form><input name="username" required value="john"><button>Send</button></form>\n<script>\nconst form = document.querySelector("form");\nfunction submitForm(data) { console.log("Submitted:", data.get("username")); }\nform.addEventListener("submit", event => {\n  event.preventDefault();\n  if (!form.checkValidity()) return;\n  submitForm(new FormData(form));\n});\nform.requestSubmit();\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Configure HTML validation constraints",
          explanation:
            "Sets native constraints such as required, pattern, minLength, and maxLength. Use browser validation for standard field rules.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input>\n<script>\nconst input = document.querySelector("input");\ninput.required = true; input.pattern = "[A-Za-z]{3,}"; input.minLength = 3; input.maxLength = 20;\nconsole.log(input.required, input.pattern, input.minLength, input.maxLength);\n</script>',
                },
              ],
            },
            {
              label: "Check a whole-value pattern",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input pattern="[A-Za-z]{3,}">\n<script>\nconst input = document.querySelector("input");\ninput.value = "123"; console.log(input.validity.patternMismatch);\ninput.value = "John"; console.log(input.checkValidity());\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "checkValidity()",
          explanation:
            "Checks native constraints and returns whether a control or form is valid. Use it before application-owned processing when needed.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input required>\n<script>\nconst input = document.querySelector("input");\nconsole.log(input.checkValidity(), input.validity.valueMissing);\n</script>',
                },
              ],
            },
            {
              label: "Check the complete form",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form><input required value="john"><input type="email" value="john@example.com"></form>\n<script>\nconsole.log(document.querySelector("form").checkValidity());\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "setCustomValidity()",
          explanation:
            "Sets or clears an application-defined validation failure. Use it to add a field-specific rule beyond native constraints.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input value="john">\n<script>\nconst input = document.querySelector("input");\ninput.setCustomValidity("Username already taken");\nconsole.log(input.checkValidity(), input.validity.customError, input.validationMessage);\n</script>',
                },
              ],
            },
            {
              label: "Clear a previous custom error",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input value="jane">\n<script>\nconst input = document.querySelector("input");\ninput.setCustomValidity("Taken"); input.setCustomValidity("");\nconsole.log(input.checkValidity(), input.validationMessage);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "ValidityState and validationMessage",
          explanation:
            "Inspects which constraint failed and the control’s current validation message. Use the flags to select field-specific feedback.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input required pattern="[A-Za-z]{3,}">\n<script>\nconst input = document.querySelector("input");\nconsole.log(input.validity.valueMissing, input.validationMessage.length > 0);\ninput.value = "12";\nconsole.log(input.validity.patternMismatch, input.validity.tooShort);\n</script>',
                },
              ],
            },
            {
              label: "Inspect custom and overall validity",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input>\n<script>\nconst input = document.querySelector("input");\ninput.setCustomValidity("Choose another name");\nconsole.log(input.validity.customError, input.validity.valid, input.validationMessage);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "form.reset()",
          explanation:
            "Restores form controls to their default state. Use it to discard current edits without removing the controls.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form><input name="username" value="john"><input name="enabled" type="checkbox" checked></form>\n<script>\nconst form = document.querySelector("form");\nform.elements.username.value = "jane"; form.elements.enabled.checked = false;\nform.reset();\nconsole.log(form.elements.username.value, form.elements.enabled.checked);\n</script>',
                },
              ],
            },
            {
              label: "Clear custom validity explicitly when resetting",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form><input name="username" value="john"></form>\n<script>\nconst form = document.querySelector("form"), input = form.elements.username;\ninput.setCustomValidity("Taken"); form.reset();\nconsole.log(input.validity.customError);\ninput.setCustomValidity(""); console.log(input.validity.customError);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "focus(), select(), and blur()",
          explanation:
            "Moves focus, selects text in a supported text control, or removes focus. Use them for deliberate input interaction.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input value="Hello">\n<script>\nconst input = document.querySelector("input");\ninput.focus(); input.select();\nconsole.log(document.activeElement === input, input.selectionStart, input.selectionEnd);\n</script>',
                },
              ],
            },
            {
              label: "Remove focus from a field",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input>\n<script>\nconst input = document.querySelector("input");\ninput.focus(); input.blur();\nconsole.log(document.activeElement === input);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Custom getFormValues helper",
          explanation:
            "Collects a defined application representation from controls instead of reproducing native submission exactly. Use it when booleans and selected-value arrays are desired.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form><input name="enabled" type="checkbox"><input name="color" type="radio" value="red"><input name="color" type="radio" value="blue" checked><select name="tags" multiple><option value="js" selected>JS</option><option value="css" selected>CSS</option></select></form>\n<script>\nfunction getFormValues(form) {\n  const data = Object.create(null);\n  const controls = Array.from(form.elements).filter(element => element.name && !element.matches(":disabled") && !["submit", "button", "reset", "fieldset"].includes(element.type));\n  const seen = new Set();\n  for (const element of controls) {\n    const name = element.name; if (seen.has(name)) continue; seen.add(name);\n    const group = controls.filter(control => control.name === name);\n    if (group.every(control => control.type === "checkbox")) data[name] = group.length === 1 ? element.checked : group.filter(control => control.checked).map(control => control.value);\n    else if (group.every(control => control.type === "radio")) data[name] = group.find(control => control.checked)?.value;\n    else if (group.length > 1) data[name] = group.map(control => control.value);\n    else if (element.type === "select-multiple") data[name] = Array.from(element.selectedOptions, option => option.value);\n    else if (element.type === "file") data[name] = Array.from(element.files);\n    else data[name] = element.value;\n  }\n  return data;\n}\nconst data = getFormValues(document.querySelector("form"));\nconsole.log(data.enabled, data.color, ...data.tags);\n</script>',
                },
              ],
            },
            {
              label: "Keep repeated names and omit disabled fields",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form><input name="tag" value="a"><input name="tag" value="b"><input name="skip" disabled value="no"><input name="hobby" type="checkbox" value="read" checked><input name="hobby" type="checkbox" value="code"></form>\n<script>\nfunction getFormValues(form) {\n  const data = Object.create(null);\n  const controls = Array.from(form.elements).filter(element => element.name && !element.matches(":disabled") && !["submit", "button", "reset", "fieldset"].includes(element.type));\n  const seen = new Set();\n  for (const element of controls) {\n    const name = element.name; if (seen.has(name)) continue; seen.add(name);\n    const group = controls.filter(control => control.name === name);\n    if (group.every(control => control.type === "checkbox")) data[name] = group.length === 1 ? element.checked : group.filter(control => control.checked).map(control => control.value);\n    else if (group.every(control => control.type === "radio")) data[name] = group.find(control => control.checked)?.value;\n    else if (group.length > 1) data[name] = group.map(control => control.value);\n    else if (element.type === "select-multiple") data[name] = Array.from(element.selectedOptions, option => option.value);\n    else if (element.type === "file") data[name] = Array.from(element.files);\n    else data[name] = element.value;\n  }\n  return data;\n}\nconst data = getFormValues(document.querySelector("form"));\nconsole.log(...data.tag, ...data.hobby, Object.hasOwn(data, "skip"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "input and change events",
          explanation:
            "Handles edits as they occur or when a control commits a changed value. Use input for immediate feedback and change for committed selections or edits.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input>\n<script>\nconst input = document.querySelector("input");\ninput.addEventListener("input", event => console.log("Current value:", event.target.value));\ninput.addEventListener("change", event => console.log("Final value:", event.target.value));\ninput.value = "John"; input.dispatchEvent(new Event("input", { bubbles: true }));\ninput.dispatchEvent(new Event("change", { bubbles: true }));\n</script>',
                },
              ],
            },
            {
              label: "Value assignment alone does not dispatch edits",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input>\n<script>\nconst input = document.querySelector("input"); let changes = 0;\ninput.addEventListener("input", () => changes++); input.addEventListener("change", () => changes++);\ninput.value = "Programmatic";\nconsole.log(changes);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "focus and blur events",
          explanation:
            "Handles a control gaining or losing focus. Use them for a local focus indicator or validation when the user leaves a field.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input>\n<script>\nconst input = document.querySelector("input");\ninput.addEventListener("focus", event => { event.target.classList.add("focused"); console.log("Focused", event.bubbles); });\ninput.addEventListener("blur", event => { event.target.classList.remove("focused"); console.log("Blurred", event.target.className); });\ninput.focus(); input.blur();\n</script>',
                },
              ],
            },
            {
              label: "Validate on blur with a defined helper",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input required>\n<script>\nconst input = document.querySelector("input");\nfunction validateField(field) { console.log(field.checkValidity()); }\ninput.addEventListener("blur", event => validateField(event.target));\ninput.focus(); input.blur();\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "focusin and focusout delegation",
          explanation:
            "Observes focus entering or leaving descendant controls through bubbling events. Use it for form-level focus handling.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form><input name="username"></form>\n<script>\nconst form = document.querySelector("form"), input = form.elements.username;\nform.addEventListener("focusin", event => console.log("Entered", event.target.name, event.bubbles));\nform.addEventListener("focusout", event => console.log("Left", event.target.name, event.bubbles));\ninput.focus(); input.blur();\n</script>',
                },
              ],
            },
            {
              label: "Delegate across two fields",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form><input name="a"><input name="b"></form>\n<script>\nconst form = document.querySelector("form");\nform.addEventListener("focusin", event => console.log(event.target.name));\nform.elements.a.focus(); form.elements.b.focus(); form.elements.b.blur();\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Text select and dropdown change events",
          explanation:
            "Reads selected text from selection offsets or a changed dropdown value. Use the select event for text selections and change for select controls.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input value="Hello World">\n<script>\nconst input = document.querySelector("input");\ninput.addEventListener("select", event => {\n  const field = event.target;\n  console.log("Selected:", field.value.substring(field.selectionStart, field.selectionEnd));\n}, { once: true });\ninput.focus(); input.setSelectionRange(0, 5); input.blur();\n</script>',
                },
              ],
            },
            {
              label: "Read a changed dropdown value",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<select><option value="a">A</option><option value="b">B</option></select>\n<script>\nconst select = document.querySelector("select");\nselect.addEventListener("change", event => console.log("Selected:", event.target.value));\nselect.value = "b"; select.dispatchEvent(new Event("change", { bubbles: true }));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "invalid event and custom error presentation",
          explanation:
            "Handles a failed native constraint check and supplies custom feedback. Use it when native validity rules should feed application-owned messaging.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input required aria-describedby="error"><p id="error"></p>\n<script>\nconst input = document.querySelector("input"), error = document.querySelector("#error");\ninput.addEventListener("invalid", event => { event.preventDefault(); error.textContent = event.target.validationMessage; });\nconsole.log(input.checkValidity(), error.textContent.length > 0);\n</script>',
                },
              ],
            },
            {
              label: "Capture invalid events at the form",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form><input name="username" required></form>\n<script>\nconst form = document.querySelector("form");\nform.addEventListener("invalid", event => { event.preventDefault(); console.log(event.target.name, event.bubbles); }, true);\nform.checkValidity();\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Real-time character counter",
          explanation:
            "Updates a counter when a textarea emits input. Use current value length and the configured maxLength for immediate feedback.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<textarea maxlength="20"></textarea><output></output>\n<script>\nconst textarea = document.querySelector("textarea"), counter = document.querySelector("output");\ntextarea.addEventListener("input", event => { counter.textContent = `${event.target.value.length}/${event.target.maxLength}`; });\ntextarea.value = "Hello"; textarea.dispatchEvent(new Event("input"));\nconsole.log(counter.textContent);\n</script>',
                },
              ],
            },
            {
              label: "Handle a textarea without a maximum",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<textarea></textarea><output></output>\n<script>\nconst textarea = document.querySelector("textarea"), counter = document.querySelector("output");\ntextarea.addEventListener("input", event => { const field = event.target; counter.textContent = field.maxLength < 0 ? String(field.value.length) : `${field.value.length}/${field.maxLength}`; });\ntextarea.value = "Hello"; textarea.dispatchEvent(new Event("input"));\nconsole.log(counter.textContent);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Live email validation",
          explanation:
            "Updates custom feedback while a user edits an email field. Use native email typeMismatch rather than an undefined format checker.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input type="email"><output></output>\n<script>\nconst email = document.querySelector("input"), error = document.querySelector("output");\nemail.addEventListener("input", event => {\n  const field = event.target; field.setCustomValidity("");\n  if (field.value && field.validity.typeMismatch) { field.setCustomValidity("Invalid email format"); error.textContent = "Invalid email format"; }\n  else error.textContent = "";\n});\nemail.value = "invalid"; email.dispatchEvent(new Event("input"));\nconsole.log(email.validity.customError, error.textContent);\n</script>',
                },
              ],
            },
            {
              label: "Clear an error after a valid edit",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input type="email"><output></output>\n<script>\nconst email = document.querySelector("input"), error = document.querySelector("output");\nemail.addEventListener("input", event => {\n  const field = event.target; field.setCustomValidity("");\n  if (field.value && field.validity.typeMismatch) { field.setCustomValidity("Invalid email format"); error.textContent = "Invalid email format"; }\n  else error.textContent = "";\n});\nemail.value = "invalid"; email.dispatchEvent(new Event("input"));\nemail.value = "john@example.com"; email.dispatchEvent(new Event("input"));\nconsole.log(email.validity.valid, error.textContent);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Debounced availability validation",
          explanation:
            "Waits for an input quiet period before checking a value. Use it to reduce repeated validation work while the user edits.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input>\n<script>\nconst username = document.querySelector("input");\nlet timeout;\nasync function checkUsernameAvailable(value) { return value !== "taken"; } // simulated lookup\nusername.addEventListener("input", event => {\n  clearTimeout(timeout); const value = event.target.value;\n  timeout = setTimeout(async () => {\n    const available = await checkUsernameAvailable(value);\n    if (username.value === value) console.log(value, available);\n  }, 10);\n});\nfor (const value of ["ta", "taken"]) { username.value = value; username.dispatchEvent(new Event("input")); }\n</script>',
                },
              ],
            },
            {
              label: "Cancel pending validation during teardown",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input>\n<script>\nconst username = document.querySelector("input");\nlet timeout;\nasync function checkUsernameAvailable(value) { return value !== "taken"; } // simulated lookup\nusername.addEventListener("input", event => {\n  clearTimeout(timeout); const value = event.target.value;\n  timeout = setTimeout(async () => {\n    const available = await checkUsernameAvailable(value);\n    if (username.value === value) console.log(value, available);\n  }, 10);\n});\nusername.value = "john"; username.dispatchEvent(new Event("input"));\nclearTimeout(timeout);\nsetTimeout(() => console.log("Validation canceled"), 20);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Password visibility toggle",
          explanation:
            "Switches a password input between obscured and visible text. Use a non-submit button with a label that reflects the next action.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input type="password" value="example"><button type="button" aria-pressed="false">Show</button>\n<script>\nconst passwordInput = document.querySelector("input"), toggleBtn = document.querySelector("button");\ntoggleBtn.addEventListener("click", () => {\n  const type = passwordInput.type === "password" ? "text" : "password";\n  passwordInput.type = type; toggleBtn.textContent = type === "password" ? "Show" : "Hide";\n  toggleBtn.setAttribute("aria-pressed", String(type === "text"));\n});\ntoggleBtn.click();\nconsole.log(passwordInput.type, passwordInput.value, toggleBtn.textContent, toggleBtn.getAttribute("aria-pressed"));\n</script>',
                },
              ],
            },
            {
              label: "Hide it again after a second click",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input type="password" value="example"><button type="button" aria-pressed="false">Show</button>\n<script>\nconst passwordInput = document.querySelector("input"), toggleBtn = document.querySelector("button");\ntoggleBtn.addEventListener("click", () => {\n  const type = passwordInput.type === "password" ? "text" : "password";\n  passwordInput.type = type; toggleBtn.textContent = type === "password" ? "Show" : "Hide";\n  toggleBtn.setAttribute("aria-pressed", String(type === "text"));\n});\ntoggleBtn.click(); toggleBtn.click();\nconsole.log(passwordInput.type, toggleBtn.textContent, toggleBtn.getAttribute("aria-pressed"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "File input change and File metadata",
          explanation:
            "Reads the file input’s FileList and each file’s name, size, and reported type. Use files rather than a path-like input value.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input type="file">\n<script>\nconst fileInput = document.querySelector("input");\nfileInput.addEventListener("change", event => { for (const file of event.target.files) console.log("File:", file.name, file.size, file.type); });\nconst transfer = new DataTransfer(); transfer.items.add(new File(["Hello"], "hello.txt", { type: "text/plain" }));\nfileInput.files = transfer.files; fileInput.dispatchEvent(new Event("change"));\n</script>',
                },
              ],
            },
            {
              label: "Handle an empty file list",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input type="file">\n<script>\nconst input = document.querySelector("input");\ninput.addEventListener("change", event => console.log(event.target.files.length));\ninput.dispatchEvent(new Event("change"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "FileReader.readAsDataURL() image previews",
          explanation:
            "Reads a selected file asynchronously into a data URL that an image can display. Use it for small client-side preview demonstrations.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input type="file"><img alt="Preview">\n<script>\nconst fileInput = document.querySelector("input"), preview = document.querySelector("img");\nfileInput.addEventListener("change", event => {\n  const file = event.target.files[0]; if (!file || !file.type.startsWith("image/")) return;\n  const reader = new FileReader();\n  reader.onload = () => { preview.src = reader.result; console.log(preview.src.startsWith("data:image/svg+xml;base64,")); };\n  reader.onerror = () => console.log("Preview failed");\n  reader.readAsDataURL(file);\n});\nconst transfer = new DataTransfer(); transfer.items.add(new File([\'<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>\'], "pixel.svg", { type: "image/svg+xml" }));\nfileInput.files = transfer.files; fileInput.dispatchEvent(new Event("change"));\n</script>',
                },
              ],
            },
            {
              label: "Skip a non-image file",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<input type="file"><img alt="Preview">\n<script>\nconst input = document.querySelector("input"), preview = document.querySelector("img");\ninput.addEventListener("change", event => {\n  const file = event.target.files[0];\n  if (!file || !file.type.startsWith("image/")) { console.log("No image selected"); return; }\n});\nconst transfer = new DataTransfer(); transfer.items.add(new File(["Hello"], "notes.txt", { type: "text/plain" }));\ninput.files = transfer.files; input.dispatchEvent(new Event("change"));\nconsole.log(preview.hasAttribute("src"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Cancelable form reset events",
          explanation:
            "Handles a reset request before controls are restored and can prevent it. Use it when discarding edits requires an application decision.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form><input name="username" value="john"></form>\n<script>\nconst form = document.querySelector("form");\nfunction confirmReset() { return false; }\nform.addEventListener("reset", event => { if (!confirmReset()) event.preventDefault(); });\nform.elements.username.value = "jane"; form.reset();\nconsole.log(form.elements.username.value);\n</script>',
                },
              ],
            },
            {
              label: "Allow reset and observe pre-reset state in the handler",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Forms example</title>\n<body>\n<form><input name="username" value="john"></form>\n<script>\nconst form = document.querySelector("form");\nform.addEventListener("reset", () => console.log("Before:", form.elements.username.value));\nform.elements.username.value = "jane"; form.reset();\nconsole.log("After:", form.elements.username.value);\n</script>',
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
            "Creates an asynchronous observer for geometric intersection changes. Use it to react to elements entering or leaving a viewport or ancestor root.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div class="target" id="target"></div>\n<script>\nconst element = document.querySelector("#target");\nconst observer = new IntersectionObserver(entries => {\n  for (const entry of entries) if (entry.isIntersecting) {\n    entry.target.classList.add("visible");\n    console.log(entry.target.id, entry.isIntersecting, entry.intersectionRatio, entry.target.className);\n    observer.disconnect();\n  }\n});\nobserver.observe(element);\n</script>',
                },
              ],
            },
            {
              label: "Receive an initial outside-root entry",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div class="root"><div id="target" class="target" style="margin-top:200px"></div></div>\n<script>\nconst root = document.querySelector(".root");\nconst observer = new IntersectionObserver(entries => { console.log(entries[0].isIntersecting, entries[0].intersectionRatio); observer.disconnect(); }, { root });\nobserver.observe(document.querySelector("#target"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "IntersectionObserver.observe()",
          explanation:
            "Starts tracking an element with an existing observer. Use one observer for multiple elements sharing the same options.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div class="target lazy" id="a"></div><div class="target lazy" id="b"></div>\n<script>\nconst seen = new Set();\nconst observer = new IntersectionObserver(entries => {\n  entries.forEach(entry => { if (entry.isIntersecting) seen.add(entry.target.id); });\n  if (seen.size === 2) { console.log(...[...seen].sort()); observer.disconnect(); }\n});\ndocument.querySelectorAll(".lazy").forEach(element => observer.observe(element));\n</script>',
                },
              ],
            },
            {
              label: "Observe the same target only once",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div class="target" id="target"></div>\n<script>\nconst target = document.querySelector("#target");\nconst observer = new IntersectionObserver(entries => { console.log(entries.length); observer.disconnect(); });\nobserver.observe(target); observer.observe(target);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "IntersectionObserver.unobserve()",
          explanation:
            "Stops tracking one target without removing other targets. Use it for one-time reveals or completed lazy-load targets.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div class="target" id="a"></div><div class="target" id="b"></div>\n<script>\nconst observer = new IntersectionObserver(entries => { console.log(...entries.map(entry => entry.target.id).sort()); observer.disconnect(); });\nconst a = document.querySelector("#a"), b = document.querySelector("#b");\nobserver.observe(a); observer.observe(b); observer.unobserve(a);\n</script>',
                },
              ],
            },
            {
              label: "Reveal once and stop tracking the target",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div class="target" id="target"></div>\n<script>\nconst observer = new IntersectionObserver((entries, currentObserver) => {\n  for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add("in-view"); currentObserver.unobserve(entry.target); console.log(entry.target.classList.contains("in-view")); }\n});\nobserver.observe(document.querySelector("#target"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "IntersectionObserver.disconnect()",
          explanation:
            "Stops tracking all targets associated with an observer. Use it when a component or page feature is disposed.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div class="target" id="target"></div>\n<script>\nconst observer = new IntersectionObserver(() => console.log("Not reached"));\nobserver.observe(document.querySelector("#target")); observer.disconnect();\nsetTimeout(() => console.log("Disconnected"), 30);\n</script>',
                },
              ],
            },
            {
              label: "Reuse an observer after disconnecting",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div class="target" id="target"></div>\n<script>\nconst observer = new IntersectionObserver(entries => { console.log(entries[0].isIntersecting); observer.disconnect(); });\nobserver.observe(document.querySelector("#target")); observer.disconnect();\nobserver.observe(document.querySelector("#target"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Intersection observer root and rootMargin",
          explanation:
            "Configures the reference viewport or ancestor and expands or shrinks its intersection area. Use rootMargin to start work before a target reaches the visible root.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div class="root"></div>\n<script>\nconst root = document.querySelector(".root");\nconst observer = new IntersectionObserver(() => {}, { root, rootMargin: "10px 20px", threshold: 0.5 });\nconsole.log(observer.root === root, observer.rootMargin, observer.thresholds[0]); observer.disconnect();\n</script>',
                },
              ],
            },
            {
              label: "Intersect within an expanded root margin",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div class="root"><div class="target" id="target" style="margin-top:120px"></div></div>\n<script>\nconst root = document.querySelector(".root");\nconst observer = new IntersectionObserver(entries => { console.log(entries[0].isIntersecting); observer.disconnect(); }, { root, rootMargin: "50px" });\nobserver.observe(document.querySelector("#target"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Intersection thresholds",
          explanation:
            "Requests notifications when intersection ratios cross configured boundaries. Use a threshold array for multiple progress points.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div class="root"><div id="target" style="width:100px;height:100px;margin-top:50px"></div></div>\n<script>\nconst root = document.querySelector(".root");\nconst observer = new IntersectionObserver(entries => {\n  const entry = entries[0];\n  console.log(entry.isIntersecting && entry.intersectionRatio >= 0.5, entry.intersectionRatio); observer.disconnect();\n}, { root, threshold: 0.5 });\nobserver.observe(document.querySelector("#target"));\n</script>',
                },
              ],
            },
            {
              label: "Cross several thresholds by scrolling a fixed root",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div class="root"><div id="target" style="width:100px;height:100px;margin-top:200px"></div></div>\n<script>\nconst root = document.querySelector(".root"); let stage = 0;\nconst observer = new IntersectionObserver(entries => {\n  console.log(entries[0].intersectionRatio);\n  if (stage++ === 0) root.scrollTop = 150;\n  else if (stage === 2) root.scrollTop = 200;\n  else observer.disconnect();\n}, { root, threshold: [0, 0.25, 0.5, 0.75, 1] });\nobserver.observe(document.querySelector("#target"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Lazy-load images with intersection",
          explanation:
            "Assigns an image source when the placeholder enters the observed area. Use it to defer image loading until near the relevant viewport region.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<img id="image" width="20" height="20" alt="Preview">\n<script>\nconst imageObserver = new IntersectionObserver(entries => {\n  for (const entry of entries) if (entry.isIntersecting) {\n    const img = entry.target;\n    img.addEventListener("load", () => { img.classList.add("loaded"); console.log(img.classList.contains("loaded"), img.naturalWidth); }, { once: true });\n    img.addEventListener("error", () => console.log("Image failed"), { once: true });\n    img.src = img.dataset.src; imageObserver.unobserve(img);\n  }\n});\nconst image = document.querySelector("img"); image.dataset.src = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221%22%20height%3D%221%22%2F%3E";\nimageObserver.observe(image);\n</script>',
                },
              ],
            },
            {
              label: "Keep a hidden-outside placeholder unloaded",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div style="height:2000px"></div><img width="20" height="20" alt="Later">\n<script>\nconst image = document.querySelector("img"); image.dataset.src = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221%22%20height%3D%221%22%2F%3E";\nconst observer = new IntersectionObserver(entries => { console.log(entries[0].isIntersecting, image.hasAttribute("src")); observer.disconnect(); });\nobserver.observe(image);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Infinite-scroll loading with a sentinel",
          explanation:
            "Observes a stable end marker to request the next page near the list’s end. Use a loading guard, an end condition, and renewed observation after work completes.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div class="root"><div id="sentinel" style="height:1px"></div></div>\n<script>\nconst root = document.querySelector(".root"), sentinel = document.querySelector("#sentinel");\nlet loading = false, page = 0;\nasync function loadMoreItems() {\n  if (loading) return; loading = true; observer.unobserve(sentinel);\n  try {\n    await new Promise(resolve => setTimeout(resolve, 5));\n    const item = document.createElement("div"); item.style.height = "20px"; item.textContent = `Page ${++page}`;\n    root.insertBefore(item, sentinel); console.log(item.textContent);\n    if (page < 2) observer.observe(sentinel); else observer.disconnect();\n  } catch (error) { console.log(error.message); observer.disconnect(); }\n  finally { loading = false; }\n}\nconst observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) loadMoreItems(); }, { root, rootMargin: "100px" });\nobserver.observe(sentinel);\n\n</script>',
                },
              ],
            },
            {
              label: "Handle a failed page load without an unhandled rejection",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div class="root"><div id="sentinel" style="height:1px"></div></div>\n<script>\nconst root = document.querySelector(".root"), sentinel = document.querySelector("#sentinel");\nconst observer = new IntersectionObserver(entries => {\n  if (!entries.some(entry => entry.isIntersecting)) return;\n  observer.unobserve(sentinel);\n  Promise.reject(new Error("Load failed")).catch(error => { console.log(error.message); observer.disconnect(); });\n}, { root });\nobserver.observe(sentinel);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Detect a sticky-header boundary",
          explanation:
            "Observes a small marker to toggle a header state as scrolling crosses a boundary. Use it to add a shadow or compact appearance while a header is pinned.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div class="root"><div class="header-sentinel" style="height:1px"></div><header style="position:sticky;top:0;height:20px">Header</header><div style="height:300px"></div></div>\n<script>\nconst root = document.querySelector(".root"), header = document.querySelector("header"), sentinel = document.querySelector(".header-sentinel");\nlet stage = 0;\nconst observer = new IntersectionObserver(entries => {\n  const entry = entries[0];\n  const pinned = !entry.isIntersecting && entry.boundingClientRect.bottom < entry.rootBounds.top;\n  header.classList.toggle("sticky", pinned); console.log(pinned);\n  if (stage++ === 0) root.scrollTop = 30;\n  else if (stage === 2) root.scrollTop = 0;\n  else observer.disconnect();\n}, { root, threshold: 0 });\nobserver.observe(sentinel);\n</script>',
                },
              ],
            },
            {
              label: "Do not classify a below-root sentinel as pinned",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div class="root"><header>Header</header><div style="height:200px"></div><div class="header-sentinel" style="height:1px"></div></div>\n<script>\nconst root = document.querySelector(".root"), header = document.querySelector("header"), sentinel = document.querySelector(".header-sentinel");\nconst observer = new IntersectionObserver(entries => {\n  const entry = entries[0];\n  console.log(!entry.isIntersecting && entry.boundingClientRect.bottom < entry.rootBounds.top); observer.disconnect();\n}, { root });\nobserver.observe(sentinel);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Start animation on intersection",
          explanation:
            "Keeps an existing CSS animation paused until its element reaches the desired intersection. Use it for one-time viewport reveals.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<style>@keyframes reveal{from{opacity:0}to{opacity:1}}.animate-on-scroll{width:20px;height:20px;animation:reveal 1s paused}</style><div class="animate-on-scroll"></div>\n<script>\nconst element = document.querySelector(".animate-on-scroll");\nconst observer = new IntersectionObserver(entries => {\n  for (const entry of entries) if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {\n    entry.target.style.animationPlayState = "running"; observer.unobserve(entry.target); console.log(getComputedStyle(entry.target).animationPlayState);\n  }\n}, { threshold: 0.1 });\nobserver.observe(element);\n</script>',
                },
              ],
            },
            {
              label: "Keep a nonintersecting animation paused",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<style>@keyframes reveal{from{opacity:0}to{opacity:1}}.animate-on-scroll{width:20px;height:20px;animation:reveal 1s paused}</style><div class="root"><div class="animate-on-scroll" style="margin-top:200px"></div></div>\n<script>\nconst root = document.querySelector(".root"), element = document.querySelector(".animate-on-scroll");\nconst observer = new IntersectionObserver(entries => { console.log(entries[0].isIntersecting, getComputedStyle(element).animationPlayState); observer.disconnect(); }, { root, threshold: 0.1 });\nobserver.observe(element);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Reusable LazyLoader component",
          explanation:
            "Encapsulates observer dispatch, type-specific initialization, and teardown. Use it when several lazy targets share one lifetime.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<img width="20" height="20" alt="Preview">\n<script>\nclass LazyLoader {\n  constructor() { this.observer = new IntersectionObserver(this.handleIntersection.bind(this), { rootMargin: "50px" }); }\n  handleIntersection(entries) { for (const entry of entries) if (entry.isIntersecting) this.loadElement(entry.target); }\n  loadElement(element) {\n    if (element.tagName === "IMG") element.src = element.dataset.src;\n    else if (element.classList.contains("video-container")) this.loadVideo(element);\n    this.observer.unobserve(element);\n  }\n  loadVideo(element) {\n    const video = document.createElement("video"); video.controls = true; video.preload = "none";\n    element.appendChild(video); console.log("Video initialized", video.controls);\n  }\n  observe(element) { this.observer.observe(element); }\n  disconnect() { this.observer.disconnect(); }\n}\nconst image = document.querySelector("img"), loader = new LazyLoader();\nimage.dataset.src = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221%22%20height%3D%221%22%2F%3E";\nimage.addEventListener("load", () => { console.log(image.naturalWidth); loader.disconnect(); }, { once: true });\nloader.observe(image);\n</script>',
                },
              ],
            },
            {
              label: "Initialize an intersecting video container",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div class="video-container" style="width:20px;height:20px"></div>\n<script>\nclass LazyLoader {\n  constructor() { this.observer = new IntersectionObserver(this.handleIntersection.bind(this), { rootMargin: "50px" }); }\n  handleIntersection(entries) { for (const entry of entries) if (entry.isIntersecting) this.loadElement(entry.target); }\n  loadElement(element) {\n    if (element.tagName === "IMG") element.src = element.dataset.src;\n    else if (element.classList.contains("video-container")) this.loadVideo(element);\n    this.observer.unobserve(element);\n  }\n  loadVideo(element) {\n    const video = document.createElement("video"); video.controls = true; video.preload = "none";\n    element.appendChild(video); console.log("Video initialized", video.controls);\n  }\n  observe(element) { this.observer.observe(element); }\n  disconnect() { this.observer.disconnect(); }\n}\nconst loader = new LazyLoader();\nloader.observe(document.querySelector(".video-container"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "new MutationObserver()",
          explanation:
            "Creates an observer that delivers batches of selected DOM mutations asynchronously. Use it to react to tree or attribute changes owned by another part of the application.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div id="target"></div>\n<script>\nconst target = document.querySelector("#target");\nconst observer = new MutationObserver(records => {\n  const record = records[0];\n  console.log(record.type, record.target.id, record.addedNodes.length, record.removedNodes.length, record.oldValue); observer.disconnect();\n});\nobserver.observe(target, { childList: true });\ntarget.appendChild(document.createElement("span"));\n</script>',
                },
              ],
            },
            {
              label: "Receive records after synchronous work",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div id="target"></div>\n<script>\nconst target = document.querySelector("#target");\nconst observer = new MutationObserver(() => { console.log("Observer callback"); observer.disconnect(); });\nobserver.observe(target, { childList: true }); target.append("text");\nconsole.log("Synchronous change done");\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "MutationObserver.observe() configuration",
          explanation:
            "Selects mutation kinds, subtree coverage, attribute filtering, and optional old values. Use the smallest observation scope and option set that fits the task.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div id="target" class="old"><p>Before</p></div>\n<script>\nconst target = document.querySelector("#target");\nconst observer = new MutationObserver(records => {\n  console.log(...records.map(record => record.type).sort());\n  console.log(records.find(record => record.type === "attributes").oldValue, records.find(record => record.type === "characterData").oldValue);\n  observer.disconnect();\n});\nobserver.observe(target, { childList: true, attributes: true, characterData: true, subtree: true, attributeOldValue: true, characterDataOldValue: true, attributeFilter: ["class", "style"] });\ntarget.className = "new"; target.firstElementChild.firstChild.data = "After"; target.appendChild(document.createElement("span"));\n</script>',
                },
              ],
            },
            {
              label: "Reject a configuration with no mutation kind",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div id="target"></div>\n<script>\nconst observer = new MutationObserver(() => {});\ntry { observer.observe(document.querySelector("#target"), {}); } catch (error) { console.log(error.name); }\nobserver.disconnect();\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Observe added and removed child nodes",
          explanation:
            "Uses childList records to inspect inserted and removed nodes. Use subtree when changes below the immediate target also matter.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div id="target"><span id="old">Old</span></div>\n<script>\nconst target = document.querySelector("#target");\nconst observer = new MutationObserver(records => {\n  for (const record of records) {\n    record.addedNodes.forEach(node => { if (node.nodeType === Node.ELEMENT_NODE) console.log("Added:", node.tagName); });\n    record.removedNodes.forEach(node => console.log("Removed:", node.nodeName));\n  }\n  observer.disconnect();\n});\nobserver.observe(target, { childList: true, subtree: true });\ntarget.appendChild(document.createElement("div")); target.querySelector("#old").remove();\n</script>',
                },
              ],
            },
            {
              label: "Observe a nested child insertion",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div id="target"><section></section></div>\n<script>\nconst target = document.querySelector("#target");\nconst observer = new MutationObserver(records => { console.log(records[0].target.tagName, records[0].addedNodes[0].nodeType); observer.disconnect(); });\nobserver.observe(target, { childList: true, subtree: true });\ntarget.querySelector("section").append("Nested text");\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Observe filtered attribute changes",
          explanation:
            "Tracks selected attribute updates and their previous values. Use attributeFilter to exclude unrelated attribute noise.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div id="target" class="old"></div>\n<script>\nconst target = document.querySelector("#target");\nconst observer = new MutationObserver(records => { console.log(records.length, records[0].attributeName, records[0].oldValue, target.getAttribute(records[0].attributeName)); observer.disconnect(); });\nobserver.observe(target, { attributes: true, attributeOldValue: true, attributeFilter: ["class", "data-status"] });\ntarget.setAttribute("title", "Ignored"); target.className = "new"; \n</script>',
                },
              ],
            },
            {
              label: "Distinguish old snapshots from the current new value",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div id="target"></div>\n<script>\nconst target = document.querySelector("#target");\nconst observer = new MutationObserver(records => {\n  records.forEach(record => console.log(record.oldValue, target.getAttribute(record.attributeName))); observer.disconnect();\n});\nobserver.observe(target, { attributes: true, attributeOldValue: true, attributeFilter: ["data-status"] });\ntarget.dataset.status = "one"; target.dataset.status = "two";\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Observe text-node character data",
          explanation:
            "Tracks edits to an existing Text node with characterData observation. Use it when changes to the node’s data are the event of interest.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<p id="target">Before</p>\n<script>\nconst textNode = document.querySelector("#target").firstChild;\nconst observer = new MutationObserver(records => { console.log(records[0].type, records[0].oldValue, records[0].target.textContent); observer.disconnect(); });\nobserver.observe(textNode, { characterData: true, characterDataOldValue: true });\ntextNode.data = "After";\n</script>',
                },
              ],
            },
            {
              label: "Replace text children through textContent",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<p id="target">Before</p>\n<script>\nconst target = document.querySelector("#target");\nconst observer = new MutationObserver(records => { console.log(records[0].type); observer.disconnect(); });\nobserver.observe(target, { childList: true, characterData: true, subtree: true });\ntarget.textContent = "After";\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Debounced editor autosave observation",
          explanation:
            "Watches editor content mutations and delays persistence until a quiet period. Use it when programmatic changes as well as editing must be observed.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div contenteditable="true">Start</div>\n<script>\nconst editor = document.querySelector("[contenteditable]");\nlet saveTimeout;\nfunction saveContent(html) { console.log("Saved:", html); } // replace with application persistence\nconst observer = new MutationObserver(() => {\n  clearTimeout(saveTimeout);\n  saveTimeout = setTimeout(() => { saveContent(editor.innerHTML); observer.disconnect(); }, 10);\n});\nobserver.observe(editor, { childList: true, characterData: true, subtree: true });\nfunction cleanup() { observer.disconnect(); clearTimeout(saveTimeout); }\neditor.textContent = "Draft"; editor.textContent = "Final";\n</script>',
                },
              ],
            },
            {
              label: "Cancel pending observation on teardown",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div contenteditable="true">Start</div>\n<script>\nconst editor = document.querySelector("[contenteditable]");\nlet saveTimeout;\nfunction saveContent(html) { console.log("Saved:", html); } // replace with application persistence\nconst observer = new MutationObserver(() => {\n  clearTimeout(saveTimeout);\n  saveTimeout = setTimeout(() => { saveContent(editor.innerHTML); observer.disconnect(); }, 10);\n});\nobserver.observe(editor, { childList: true, characterData: true, subtree: true });\nfunction cleanup() { observer.disconnect(); clearTimeout(saveTimeout); }\neditor.textContent = "Discarded"; cleanup();\nsetTimeout(() => console.log("Stopped without saving"), 20);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Initialize dynamically added components",
          explanation:
            "Inspects newly inserted elements and their descendants for components needing setup. Use it when a larger inserted subtree can contain several initializable nodes.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div id="container"></div>\n<script>\nconst container = document.querySelector("#container"), initialized = new WeakSet();\nfunction initializeComponent(element) {\n  if (initialized.has(element)) return; initialized.add(element);\n  element.dataset.initialized = "true";\n}\nfunction inspect(node) {\n  if (!(node instanceof Element)) return;\n  if (node.matches(".needs-init")) initializeComponent(node);\n  node.querySelectorAll(".needs-init").forEach(initializeComponent);\n}\nconst observer = new MutationObserver(records => {\n  records.forEach(record => record.addedNodes.forEach(inspect));\n  console.log(container.querySelectorAll("[data-initialized]").length); observer.disconnect();\n});\nobserver.observe(container, { childList: true, subtree: true });\nconst element = document.createElement("div"); element.className = "needs-init"; container.appendChild(element);\n</script>',
                },
              ],
            },
            {
              label: "Initialize matches inside an added wrapper",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div id="container"></div>\n<script>\nconst container = document.querySelector("#container"), initialized = new WeakSet();\nfunction initializeComponent(element) {\n  if (initialized.has(element)) return; initialized.add(element);\n  element.dataset.initialized = "true";\n}\nfunction inspect(node) {\n  if (!(node instanceof Element)) return;\n  if (node.matches(".needs-init")) initializeComponent(node);\n  node.querySelectorAll(".needs-init").forEach(initializeComponent);\n}\nconst observer = new MutationObserver(records => {\n  records.forEach(record => record.addedNodes.forEach(inspect));\n  console.log(container.querySelectorAll("[data-initialized]").length); observer.disconnect();\n});\nobserver.observe(container, { childList: true, subtree: true });\nconst wrapper = document.createElement("section");\nwrapper.innerHTML = \'<p class="needs-init">A</p><div><p class="needs-init">B</p></div>\';\ncontainer.appendChild(wrapper);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Batch mutation processing",
          explanation:
            "Collects relevant nodes across a delivered record batch before processing them. Use it to avoid redundant per-record application work.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div id="container"></div>\n<script>\nconst container = document.querySelector("#container");\nfunction processBatch(elements) { console.log(elements.length, ...elements.map(element => element.tagName)); }\nconst observer = new MutationObserver(records => {\n  const added = new Set();\n  records.forEach(record => record.addedNodes.forEach(node => { if (node.nodeType === 1) added.add(node); }));\n  if (added.size) processBatch([...added]); observer.disconnect();\n});\nobserver.observe(container, { childList: true });\ncontainer.appendChild(document.createElement("p")); container.appendChild(document.createElement("span"));\n</script>',
                },
              ],
            },
            {
              label: "Deduplicate a node added twice within the same batch",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div id="container"></div>\n<script>\nconst container = document.querySelector("#container");\nconst observer = new MutationObserver(records => {\n  const added = new Set(); records.forEach(record => record.addedNodes.forEach(node => { if (node.nodeType === 1 && container.contains(node)) added.add(node); }));\n  console.log(added.size); observer.disconnect();\n});\nobserver.observe(container, { childList: true });\nconst node = document.createElement("p"); container.appendChild(node); node.remove(); container.appendChild(node);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "MutationObserver.takeRecords()",
          explanation:
            "Returns queued undelivered records and empties the observer’s record queue. Use it when pending records should be processed synchronously before cleanup.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div id="target"></div>\n<script>\nconst target = document.querySelector("#target");\nconst observer = new MutationObserver(() => console.log("Not reached"));\nobserver.observe(target, { childList: true }); target.append("Text");\nconst records = observer.takeRecords();\nconsole.log(records.length, records[0].type, observer.takeRecords().length); observer.disconnect();\n</script>',
                },
              ],
            },
            {
              label: "Continue observing after taking records",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div id="target"></div>\n<script>\nconst target = document.querySelector("#target");\nconst observer = new MutationObserver(records => { console.log("Later:", records.length); observer.disconnect(); });\nobserver.observe(target, { childList: true });\ntarget.append("First"); console.log("Taken:", observer.takeRecords().length);\ntarget.append("Second");\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "MutationObserver.disconnect()",
          explanation:
            "Stops observation and discards pending undelivered records. Use it when observed components are disposed or observation is no longer needed.",
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
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div id="target"></div>\n<script>\nconst target = document.querySelector("#target");\nconst observer = new MutationObserver(() => console.log("Not reached"));\nobserver.observe(target, { childList: true }); target.append("Text"); observer.disconnect();\nconsole.log(observer.takeRecords().length);\n</script>',
                },
              ],
            },
            {
              label: "Reuse the instance after disconnect",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Modern DOM observer example</title>\n<style>body{margin:0}.root{width:100px;height:100px;overflow:hidden}.target{width:100px;height:20px}</style>\n<body>\n<div id="target"></div>\n<script>\nconst target = document.querySelector("#target");\nconst observer = new MutationObserver(records => { console.log(records[0].type); observer.disconnect(); });\nobserver.observe(target, { childList: true }); observer.disconnect();\nobserver.observe(target, { attributes: true }); target.setAttribute("data-state", "ready");\n</script>',
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
    head.append(node("span", example.label), copy);
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
