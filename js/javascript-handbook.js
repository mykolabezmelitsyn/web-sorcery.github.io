/* Topic inventory and sequence follow javascript-mastery-roadmap.md. */
const handbook = {
  levels: [
    {
      number: 1,
      name: "JavaScript Fundamentals (Revision)",
      checkpoint:
        "You should be comfortable transforming complex arrays and objects, writing reusable functions, and choosing the appropriate methods without relying on tutorials.",
      chapters: [1, 2, 3],
    },
    {
      number: 2,
      name: "Core JavaScript (Intermediate)",
      checkpoint:
        "Build a small reusable utility library for filtering data, validating inputs, formatting values, and handling errors.",
      chapters: [4, 5, 6, 7],
    },
    {
      number: 3,
      name: "DOM Manipulation and Browser JavaScript",
      checkpoint:
        "Build an accessible UI component library containing a modal, tooltip, accordion, tabs, dropdown, and carousel, without using React or another UI framework.",
      chapters: [8, 9, 10, 11, 12],
    },
    {
      number: 4,
      name: "Asynchronous JavaScript",
      checkpoint:
        "Build a data-driven application that communicates with an API, handles loading and errors, supports filtering/search, and cancels outdated requests.",
      chapters: [13, 14, 15, 16],
    },
    {
      number: 5,
      name: "Object-Oriented and Functional Programming",
      checkpoint:
        "Refactor your vanilla JavaScript tooltip library into a reusable class-based package with configuration options, public methods, lifecycle management, and minimal coupling.",
      chapters: [17, 18, 19],
    },
    {
      number: 6,
      name: "Modern JavaScript Architecture and Tooling",
      checkpoint:
        "Create and publish a small JavaScript library with a clean public API, documentation, automated tests, and a production build.",
      chapters: [20, 21, 22],
    },
    {
      number: 7,
      name: "Testing and Debugging",
      checkpoint:
        "Achieve reliable automated test coverage for your JavaScript component library, including keyboard interaction, edge cases, and asynchronous behavior.",
      chapters: [23, 24, 25],
    },
    {
      number: 8,
      name: "Performance, Security, and Accessibility",
      checkpoint:
        "Audit a real website or one of your projects for performance, accessibility, and security issues, then implement and measure improvements.",
      chapters: [26, 27, 28],
    },
    {
      number: 9,
      name: "Advanced JavaScript Internals",
      checkpoint:
        "Be able to explain why a piece of JavaScript behaves the way it does, diagnose subtle bugs, and choose efficient implementations based on actual measurements.",
      chapters: [29, 30, 31, 32, 33],
    },
    {
      number: 10,
      name: "Expert-Level JavaScript Engineering",
      checkpoint:
        "Take an unfamiliar requirement, design and implement a solution, test and measure it, and explain the technical tradeoffs.",
      chapters: [34, 35, 36, 37],
    },
  ],
  chapters: [
    {
      number: 1,
      name: "JavaScript Basics",
      level: 1,
      topics: [
        "What JavaScript is and how it works",
        "JavaScript engines and runtime environments",
        "ECMAScript and JavaScript versions",
        'Adding JavaScript to HTML (`script`, `defer`, `async`, `type="module"`)',
        "Variables: `var`, `let`, `const`",
        "Primitive and reference values",
        "Data types: `string`, `number`, `boolean`, `null`, `undefined`, `bigint`, `symbol`, `object`",
        "Dynamic typing and type coercion",
        "Truthy and falsy values",
        "Operators and operator precedence",
        "Equality: `==`, `===`, `Object.is()`",
        "Conditional statements and ternary operators",
        "Loops: `for`, `while`, `do...while`, `for...of`, `for...in`",
        "Strict mode",
      ],
      lessons: [
        {
          name: "Language, runtime, and script loading",
          explanation:
            "ECMAScript defines the language; an engine executes it, while a runtime supplies APIs such as the browser DOM or Node’s filesystem. A browser script cannot assume Node globals exist. Modern syntax and platform APIs have separate compatibility requirements, so check both.\n\nA classic script without defer blocks HTML parsing while it loads and runs. defer downloads alongside parsing, then executes in document order after parsing. async runs when ready, without that ordering guarantee. Modules have their own scope, are strict, and are deferred by default unless async is added. Use a local HTTP server for modules. This small page demonstrates why a module can safely find the preceding button.",
          files: [
            {
              name: "index.html",
              code: '<button id="greet">Greet</button><output id="result"></output>\n<script type="module">\n  const button = document.querySelector("#greet");\n  button.addEventListener("click", () => {\n    document.querySelector("#result").textContent = "Hello, JavaScript";\n  });\n</script>',
              language: "html",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script",
          kind: "browser",
          requires:
            "Browser; serve the independent HTML example over localhost",
          note: "",
        },
        {
          name: "Values, bindings, coercion, and equality",
          explanation:
            "let is a reassignable block-scoped binding; const prevents rebinding, not mutation of an object. var is function-scoped and has different hoisting rules, so prefer let/const in new code. Primitive values include string, number, boolean, null, undefined, bigint, and symbol; objects have identity and can be shared through references. JavaScript is dynamically typed: a binding’s value can change type.\n\nUse explicit conversion at boundaries and usually compare with ===. == coerces; Object.is differs from === for NaN and signed zero. Falsy values include false, 0, -0, 0n, empty string, null, undefined, and NaN. An empty array/object is truthy. Check precedence with parentheses rather than relying on memory.",
          files: [
            {
              name: "example.mjs",
              code: 'const product = { price: 20 };\nconst alias = product;\nalias.price = 25; // Both bindings refer to the same object.\nlet quantity = Number("2");\nconst total = product.price * quantity;\nconsole.log(typeof total, total, Boolean([])); // number, 50, true\nconsole.log("2" == 2, "2" === 2); // true, false\nconsole.log(Object.is(NaN, NaN), Object.is(0, -0)); // true, false\nconsole.log(10n + 2n, typeof Symbol("id")); // 12n, symbol',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
        {
          name: "Choose control flow that expresses intent",
          explanation:
            "Use if/else for decisions, switch for named alternatives, and a ternary for a short value-producing choice. for/while/do...while support explicit loop control; do...while runs its body at least once. for...of iterates values from an iterable. for...in enumerates enumerable string keys, including inherited ones, so it is usually the wrong choice for arrays.\n\nUse Object.keys or Object.entries when you want own object properties. Strict mode removes several error-prone behaviors, such as accidentally creating a global through assignment. Modules are automatically strict. Prefer early returns to unnecessary nesting, and give loops an exit condition you can explain.",
          files: [
            {
              name: "example.mjs",
              code: 'const stock = [\n  { name: "Book", count: 2 },\n  { name: "Pen", count: 0 }\n];\nfor (const item of stock) {\n  const label = item.count > 0 ? "available" : "sold out";\n  console.log(`${item.name}: ${label}`);\n}\nlet attempts = 0;\ndo {\n  attempts += 1;\n} while (attempts < 2);\nfor (const [key, value] of Object.entries({ attempts }))\n  console.log(key, value);\nfunction canBuy(count) {\n  if (!Number.isInteger(count) || count < 0) return false;\n  return count > 0;\n}\nconsole.log(canBuy(2)); // true',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
      ],
      checkpoint:
        "Explain which scripts block parsing and predict whether a DOM query can find a later element.",
      specialization: false,
    },
    {
      number: 2,
      name: "Functions",
      level: 1,
      topics: [
        "Function declarations vs expressions",
        "Arrow functions",
        "Parameters and arguments",
        "Default parameters",
        "Rest parameters",
        "Return values",
        "Callback functions",
        "Higher-order functions",
        "Anonymous functions",
        "Immediately Invoked Function Expressions (IIFE)",
        "Pure vs impure functions",
        "Recursion",
      ],
      lessons: [
        {
          name: "Functions are values with different call behavior",
          explanation:
            "A function declaration is initialized before its source position is reached within its scope. A function expression is created when that expression runs. Arrow functions are concise expressions with lexical this and no own arguments; they are not interchangeable with ordinary methods or constructors. Parameters name inputs; arguments are actual supplied values.\n\nDefault parameters apply when an argument is undefined, while rest collects additional arguments into an array. A function returns undefined unless it returns a value. A callback is passed for another function to call; a higher-order function accepts or returns functions. Anonymous expressions and immediately invoked function expressions (IIFEs) are useful patterns, though modules now provide much of the isolation once supplied by IIFEs.",
          files: [
            {
              name: "example.mjs",
              code: 'console.log(sum(2, 3)); // 5; declaration is available earlier.\nfunction sum(a, b) {\n  return a + b;\n}\nconst multiply = function (a, b = 1) {\n  return a * b;\n};\nconst totals = (...values) => values.reduce(sum, 0);\nfunction apply(value, transform) {\n  return transform(value);\n}\nconsole.log(\n  multiply(4),\n  totals(1, 2, 3),\n  apply(5, value => value * 2)\n);\nconst settings = (() => {\n  const currency = "USD";\n  return { currency };\n})();\nconsole.log(settings.currency);',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
        {
          name: "Purity, recursion, and reusable boundaries",
          explanation:
            "A pure function returns the same result for the same inputs and has no observable side effects. A function that writes the DOM, mutates shared state, or reads the current time is impure; those operations are necessary, but isolating them makes data logic easier to test.\n\nRecursion solves a problem by calling the same function on a smaller part. Supply a base case and consider maximum depth; JavaScript stacks are finite and portable code should not assume tail-call optimization. The example flattens a small category tree without mutating its input. An iterative stack is safer for arbitrarily deep external data.",
          files: [
            {
              name: "example.mjs",
              code: 'function collectNames(nodes) {\n  return nodes.flatMap(node => [\n    node.name,\n    ...collectNames(node.children ?? [])\n  ]);\n}\nconst tree = [{ name: "Books", children: [{ name: "Fiction" }] }];\nconsole.log(collectNames(tree)); // ["Books", "Fiction"]\nfunction addTax(price, rate) {\n  return price * (1 + rate);\n}\nconsole.log(addTax(100, 0.2)); // 120\n// Keep I/O at the boundary rather than inside addTax.',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
      ],
      checkpoint:
        "Write one pure transformation and one effectful adapter; explain why an arrow cannot replace every method.",
      specialization: false,
    },
    {
      number: 3,
      name: "Working with Data",
      level: 1,
      topics: [
        "Strings and string methods",
        "Template literals",
        "Numbers, `Math`, `NaN`, `Infinity`",
        "Arrays and array methods",
        "Objects and object methods",
        "Destructuring arrays and objects",
        "Spread and rest syntax",
        "Optional chaining (`?.`)",
        "Nullish coalescing (`??`)",
        "Logical assignment operators (`??=`, `||=`, `&&=`)",
        "`Date` and `Intl`",
        "JSON serialization and parsing",
      ],
      lessons: [
        {
          name: "Transform strings, arrays, and objects deliberately",
          explanation:
            "Strings are immutable; methods return new strings. Template literals interpolate expressions, but are not HTML escaping. Number.isNaN and Number.isFinite test numeric values without the coercion of their global counterparts. Math provides numeric helpers; number arithmetic is floating-point, so financial rounding needs a deliberate domain policy.\n\nArray methods can transform values or mutate the original; learn which kind you are using. Destructuring extracts values, spread constructs shallow copies, and rest collects remaining entries. Object methods such as entries expose key/value pairs. The example normalizes product names, filters unavailable records, and calculates a total without rewriting the source array.",
          files: [
            {
              name: "example.mjs",
              code: 'const products = [\n  { id: "p1", name: "  BOOK  ", price: 12, stock: 2 },\n  { id: "p2", name: "Pen", price: 3, stock: 0 }\n];\nconst available = products\n  .filter(({ stock }) => stock > 0)\n  .map(({ name, ...rest }) => ({\n    ...rest,\n    name: name.trim().toLowerCase()\n  }));\nconst total = available.reduce((sum, item) => sum + item.price, 0);\nconsole.log(available[0].name, total, Number.isFinite(total)); // book, 12, true\nconsole.log(Number.isNaN(Number("not a number")), Math.max(0, -3)); // true, 0',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
        {
          name: "Handle absence without treating zero as missing",
          explanation:
            "Optional chaining stops a property access or call when the receiver is null/undefined; it does not validate the resulting data. Nullish coalescing supplies a fallback only for null/undefined. Logical OR supplies one for any falsy value, which can accidentally replace zero or an empty string.\n\nThe logical assignments ??=, ||=, and &&= assign conditionally using those respective tests. Use them when mutation is intentional. Spread and destructuring defaults do not make nested values safe or perform a deep merge. This configuration example preserves an intentional zero and validates an optional callback before using its result elsewhere.",
          files: [
            {
              name: "example.mjs",
              code: 'const options = { retries: 0, label: "", enabled: true };\noptions.retries ??= 3; // Keep 0.\noptions.label ||= "Default"; // Replace an empty label intentionally.\noptions.enabled &&= false;\nconst city = options.user?.address?.city ?? "Unknown";\nconst result = options.onReady?.(); // Undefined when no callback was supplied.\nconsole.log(options.retries, options.label, options.enabled, city, result);',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
        {
          name: "Dates, localization, and JSON are separate contracts",
          explanation:
            "Date stores an instant as a timestamp; presentation depends on locale and time zone. Parse well-defined ISO input and choose a display time zone deliberately. Intl formatters localize numbers and dates; localized display strings are not a general-purpose input parser.\n\nJSON.parse can throw and returns unvalidated data. JSON.stringify omits or changes some JavaScript values: functions/undefined are not preserved as ordinary object properties, BigInt throws without a custom conversion, and Date is usually serialized as an ISO string. JSON round-tripping is therefore not a universal deep clone. Validate the parsed structure before treating it as domain data.",
          files: [
            {
              name: "example.mjs",
              code: 'const instant = new Date("2026-01-15T12:00:00Z");\nconst date = new Intl.DateTimeFormat("en-GB", {\n  dateStyle: "medium",\n  timeZone: "UTC"\n});\nconst money = new Intl.NumberFormat("en-US", {\n  style: "currency",\n  currency: "USD"\n});\nconsole.log(date.format(instant), money.format(12.5));\nconst text = JSON.stringify({ when: instant, amount: 12.5 });\nconst data = JSON.parse(text);\nif (typeof data.amount !== "number" || !Number.isFinite(data.amount))\n  throw new TypeError("Invalid amount");\nconsole.log(typeof data.when, data.amount); // string, 12.5',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
      ],
      checkpoint:
        "Normalize and total a nested product response without mutating its source; preserve intentional zero values.",
      specialization: false,
    },
    {
      number: 4,
      name: "Scope, Closures, and Execution Context",
      level: 2,
      topics: [
        "Global, function, and block scope",
        "Lexical scoping",
        "Scope chain",
        "Variable shadowing",
        "Hoisting",
        "Temporal Dead Zone (TDZ)",
        "Execution context",
        "Call stack",
        "Closures and practical applications",
        "Common closure-related mistakes",
        "Garbage collection and closures",
        "The `this` keyword",
        "`call()`, `apply()`, `bind()`",
        "Arrow functions and lexical `this`",
      ],
      lessons: [
        {
          name: "Scope, hoisting, and the temporal dead zone",
          explanation:
            "Lexical scope follows where code is written, not where a function is called. A name is resolved through the surrounding scope chain; a closer declaration shadows an outer one. let/const have block scope, while var has function scope. Their bindings exist before the declaration executes, but let/const remain uninitialized in the temporal dead zone (TDZ). Access then throws; var reads as undefined before assignment.\n\nAn execution context holds the environment for a call, and nested calls use a call stack. Function declarations are initialized differently from function expressions. Instead of saying code is physically moved upward, reason about when each binding is created and initialized.",
          files: [
            {
              name: "example.mjs",
              code: 'const label = "outer";\nfunction inspect() {\n  console.log(value); // undefined\n  var value = 2;\n  if (true) {\n    const label = "inner";\n    console.log(label); // inner\n  }\n  console.log(label, value); // outer, 2\n  // console.log(later); // ReferenceError: TDZ\n  const later = 3;\n  return later;\n}\nconsole.log(inspect()); // 3',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#variable_hoisting",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
        {
          name: "Closures retain bindings, not frozen snapshots",
          explanation:
            "A closure is a function plus access to its surrounding lexical environment. It can keep private state alive after the outer function returns. That state is a binding, so later changes can be observed; it is not automatically a copy of an earlier value.\n\nA common mistake uses one var binding for several delayed callbacks, so every callback sees its final value. A let loop creates a per-iteration binding. Closures can also keep large objects or detached DOM reachable. Release listeners and unnecessary references when a feature ends; garbage collection cannot infer your intended component lifecycle.",
          files: [
            {
              name: "example.mjs",
              code: "function createCounter(start = 0) {\n  let value = start;\n  return { increment: () => ++value, read: () => value };\n}\nconst counter = createCounter(2);\nconsole.log(counter.increment(), counter.read()); // 3, 3\nconst callbacks = [];\nfor (let index = 0; index < 3; index++) callbacks.push(() => index);\nconsole.log(callbacks.map(callback => callback())); // [0, 1, 2]",
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
        {
          name: "this follows the call form; arrows capture it",
          explanation:
            "For an ordinary function, this depends on how it is called. An object method call supplies the receiver; an extracted method loses that receiver, and a plain strict-mode call has undefined this. call supplies this and separate arguments, apply supplies this and an argument list, and bind returns a function with a bound receiver.\n\nAn arrow has no own this and closes over the surrounding value, so call/apply/bind cannot replace it. Use ordinary methods when the receiver should vary, and arrows when lexical capture is the intent. A bound listener is a new function reference: retain it if you need removeEventListener later.",
          files: [
            {
              name: "example.mjs",
              code: "const cart = {\n  subtotal: 20,\n  total(tax = 0) {\n    return this.subtotal * (1 + tax);\n  }\n};\nconst other = { subtotal: 40 };\nconsole.log(cart.total(0.1), cart.total.call(other, 0.1)); // 22, 44\nconsole.log(cart.total.apply(other, [0.2])); // 48\nconst total = cart.total.bind(cart);\nconsole.log(total(0.2)); // 24\nfunction makeReader() {\n  return () => this.subtotal;\n}\nconst reader = makeReader.call(cart);\nconsole.log(reader.call(other)); // 20; lexical this remains cart.",
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
      ],
      checkpoint:
        "Predict a closure and this-binding example before running it; identify when each binding is initialized.",
      specialization: false,
    },
    {
      number: 5,
      name: "Advanced Arrays and Objects",
      level: 2,
      topics: [
        "`map()`, `filter()`, `reduce()`, `find()`, `some()`, `every()`",
        "`flat()`, `flatMap()`, `sort()`, `toSorted()`",
        "`Object.keys()`, `Object.values()`, `Object.entries()`",
        "`Object.fromEntries()`",
        "Shallow vs deep copies",
        "`structuredClone()`",
        "Object references and mutations",
        "Immutability",
        "`Object.freeze()` and `Object.seal()`",
        "Property descriptors",
        "Getters and setters",
        "Computed property names",
        "`Map`, `Set`, `WeakMap`, `WeakSet`",
      ],
      lessons: [
        {
          name: "Array pipelines and non-mutating sorting",
          explanation:
            "map transforms, filter selects, reduce accumulates, find returns the first match, and some/every ask whether at least one/all values pass. They are alternatives chosen by the result you need, not a requirement to put every operation into reduce. flat removes nesting to a chosen depth; flatMap maps and flattens one level.\n\nArray sort mutates and compares strings by default; give numeric data a comparator. toSorted, standardized in ES2023, returns a sorted copy; for older targets use [...items].sort(comparator). Object.keys/values/entries enumerate own enumerable string properties, and fromEntries rebuilds an object. Avoid repeatedly rescanning large collections when one indexed pass is clearer.",
          files: [
            {
              name: "example.mjs",
              code: 'const orders = [\n  { id: "a", prices: [12, 3] },\n  { id: "b", prices: [5] }\n];\nconst prices = orders.flatMap(order => order.prices);\nconst sorted = prices.toSorted((a, b) => a - b);\nconst total = prices.reduce((sum, price) => sum + price, 0);\nconst lookup = Object.fromEntries(orders.map(order => [order.id, order]));\nconsole.log(\n  sorted,\n  total,\n  prices.some(price => price > 10),\n  prices.every(price => price > 0)\n);\nconsole.log(lookup.a.id, Object.keys(lookup));',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "toSorted is ES2023; use a copied-array sort when supporting older engines.",
        },
        {
          name: "Copies, descriptors, and controlled mutation",
          explanation:
            "A spread copy is shallow: nested objects remain shared. structuredClone copies supported structured data and cycles, but cannot clone functions or DOM nodes and does not preserve every custom class contract. Choose an explicit copy/update strategy rather than assuming all data can be cloned.\n\nfreeze prevents changes to own properties but is shallow; seal prevents adding/removing properties while retaining writable values. Descriptors define writable, enumerable, and configurable behavior, or a getter/setter pair. Getters should not hide expensive or surprising work. Computed property names use an expression as the key. Model ownership so code can tell whether a change is local or shared.",
          files: [
            {
              name: "example.mjs",
              code: 'const original = { meta: { stock: 2 }, tags: ["book"] };\nconst shallow = { ...original };\nshallow.meta.stock = 3; // Also changes original.meta.stock.\nconst deep = structuredClone(original);\ndeep.meta.stock = 9;\nconst key = "price";\nconst product = {\n  [key]: 12,\n  get label() {\n    return `$${this.price}`;\n  }\n};\nObject.defineProperty(product, "id", { value: "p1", enumerable: false });\nconsole.log(\n  original.meta.stock,\n  deep.meta.stock,\n  product.label,\n  Object.keys(product)\n);\nconst fixed = Object.freeze({ enabled: true });\nconst sealed = Object.seal({ count: 0 });\nsealed.count++;\nconsole.log(fixed.enabled, sealed.count);',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
        {
          name: "Choose keyed and weak collections by ownership",
          explanation:
            "Map accepts arbitrary keys and preserves insertion order; Set stores unique values. Object keys have a different contract, so use a Map when key identity or non-string keys matter. Object equality is identity: two equal-looking objects are still distinct keys. These collections use SameValueZero equality for their keys/values.\n\nWeakMap and WeakSet are useful for metadata or membership that should not keep an object alive by themselves. They are not enumerable and provide no size, because exposing garbage-collection timing would make behavior unreliable. Do not use them when your application must list or persist entries; use explicit cleanup for resources even when metadata is weakly keyed.",
          files: [
            {
              name: "example.mjs",
              code: 'const elementLike = {};\nconst metadata = new WeakMap();\nmetadata.set(elementLike, { initialized: true });\nconst selected = new Set(["a", "a", "b"]);\nconst totals = new Map([\n  ["a", 10],\n  ["b", 20]\n]);\nconsole.log(\n  [...selected],\n  totals.get("a"),\n  metadata.get(elementLike).initialized\n);\nconst visited = new WeakSet();\nvisited.add(elementLike);\nconsole.log(visited.has(elementLike));',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
      ],
      checkpoint:
        "Choose between a copied array, structuredClone, Map, Set, and weak metadata for a concrete requirement.",
      specialization: false,
    },
    {
      number: 6,
      name: "Error Handling",
      level: 2,
      topics: [
        "Error types: `Error`, `TypeError`, `RangeError`, etc.",
        "`try...catch...finally`",
        "Throwing custom errors",
        "Creating custom Error classes",
        "Error propagation",
        "Handling errors in callbacks and promises",
        "Error handling with `async/await`",
        "Defensive programming",
        "Input validation",
        "Debugging stack traces",
      ],
      lessons: [
        {
          name: "Errors need a useful boundary and a recovery policy",
          explanation:
            "Throw Error objects or meaningful subclasses, not bare strings. TypeError is useful for an invalid type; RangeError for a value outside a supported range. A custom class can carry a domain-specific name and an underlying cause. Let an error propagate until a boundary can recover, report context, or show a useful message.\n\ntry/catch handles synchronous throws and awaited promise rejections, not an arbitrary later timer callback. Handle a callback’s own errors or convert it to a promise. finally runs for cleanup and should not accidentally return or throw over the original result. Validate inputs at boundaries, and read stack traces from the failing operation back through its callers.",
          files: [
            {
              name: "example.mjs",
              code: 'class PriceError extends Error {\n  constructor(message, cause) {\n    super(message, { cause });\n    this.name = "PriceError";\n  }\n}\nfunction parsePrice(text) {\n  if (typeof text !== "string" || text.trim() === "")\n    throw new TypeError("Price text required");\n  const value = Number(text);\n  if (!Number.isFinite(value) || value < 0)\n    throw new RangeError("Price must be finite and nonnegative");\n  return value;\n}\ntry {\n  parsePrice("-2");\n} catch (cause) {\n  const error = new PriceError("Could not read product price", cause);\n  console.log(error.name, error.cause.name); // PriceError, RangeError\n} finally {\n  console.log("Cleanup boundary finished");\n}',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
      ],
      checkpoint:
        "Test an invalid input, a rejected async call, and a cleanup path without losing the original error.",
      specialization: false,
    },
    {
      number: 7,
      name: "Regular Expressions",
      level: 2,
      topics: [
        "RegExp syntax",
        "Character classes and quantifiers",
        "Anchors and boundaries",
        "Capturing and non-capturing groups",
        "Lookahead and lookbehind",
        "Flags",
        "`test()`, `exec()`, `match()`, `matchAll()`, `replace()`",
        "Practical form-validation patterns",
        "Common regex performance pitfalls",
      ],
      lessons: [
        {
          name: "Build readable patterns, then inspect matches",
          explanation:
            "A RegExp combines a pattern with flags. Character classes select a character, quantifiers repeat it, anchors constrain position, and boundaries describe transitions such as a word edge. Capturing groups save text; non-capturing groups only group alternatives. Lookahead/lookbehind assert nearby content without consuming it. Check lookbehind support for older target browsers.\n\ntest returns a boolean, exec returns a match with captures, and string match/matchAll/replace expose different result shapes. A global or sticky regex has mutable lastIndex, so repeated test calls can surprise validation code. Use a bounded, non-global pattern for simple field checks; regex cannot prove an email address is deliverable. Avoid nested ambiguous repetition on untrusted, unbounded input.",
          files: [
            {
              name: "example.mjs",
              code: 'const code = /^[A-Z]{2}-\\d{3}$/;\nconsole.log(code.test("AB-123"), code.test("wrong")); // true, false\nconst text = "Book:12 Pen:3";\nconst entries = [...text.matchAll(/(?<name>[A-Za-z]+):(?<price>\\d+)/g)].map(\n  match => [match.groups.name, Number(match.groups.price)]\n);\nconsole.log(Object.fromEntries(entries)); // { Book: 12, Pen: 3 }\nconsole.log("size: 12px".replace(/(\\d+)(?:px)/, "$1 pixels"));\nconsole.log(/\\bbook\\b/i.exec("A BOOK!"), "AB-123".match(/[A-Z]+/));\n// Assertions: /\\d+(?=px)/ and /(?<=USD )\\d+/; neither consumes its context.',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
      ],
      checkpoint:
        "Write a bounded field pattern, extract captures, and explain why global test() can be stateful.",
      specialization: false,
    },
    {
      number: 8,
      name: "DOM Manipulation",
      level: 3,
      topics: [
        "DOM tree and node relationships",
        "Selecting and traversing elements",
        "Creating, inserting, replacing, and removing elements",
        "Attributes, properties, and `dataset`",
        "`classList` and inline styles",
        "`textContent` vs `innerHTML`",
        "`DocumentFragment`",
        "`template` elements",
        "DOM performance considerations",
        "Working with dynamic content",
        "Component initialization and cleanup",
      ],
      lessons: [
        {
          name: "Build dynamic content with explicit DOM ownership",
          explanation:
            "The DOM is a tree of nodes. querySelector finds the first matching element; closest walks toward ancestors; children and parentElement expose relationships. Creating a node and assigning textContent treats input as text, whereas innerHTML parses markup and must not receive untrusted strings. Attributes describe markup, while properties often represent live state; an input’s value can differ from its value attribute. dataset exposes data-* strings.\n\nUse classList for state classes and styles for deliberate inline values. template stores inert markup to clone; DocumentFragment groups construction before insertion. Build the desired subtree, then replace it once rather than repeatedly mixing DOM reads and writes. Re-render only the owned region so you do not discard another component’s listeners or focus.",
          files: [
            {
              name: "index.html",
              code: '<template id="row"\n  ><li><span></span><button type="button">Remove</button></li></template\n>\n<ul id="products"></ul>\n<script type="module">\n  const list = document.querySelector("#products");\n  const template = document.querySelector("#row");\n  function render(products) {\n    const fragment = document.createDocumentFragment();\n    for (const product of products) {\n      const row = template.content.firstElementChild.cloneNode(true);\n      row.dataset.id = product.id;\n      row.querySelector("span").textContent = product.name;\n      row.classList.toggle("unavailable", !product.stock);\n      fragment.append(row);\n    }\n    list.replaceChildren(fragment);\n  }\n  render([{ id: "p1", name: "<Book>", stock: 2 }]);\n</script>',
              language: "html",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction",
          kind: "browser",
          requires:
            "Browser; serve the independent HTML example over localhost",
          note: "",
        },
        {
          name: "Mount, update, and destroy a component",
          explanation:
            "A mount function receives its root, creates listeners or observers, and returns a cleanup handle. An update method changes owned content; destroy removes external work and is safe to call more than once. This contract is useful even without a framework.\n\nDynamic content is not a reason to scan the entire document after every mutation. Initialize new components at the code boundary that inserts them, or use a narrowly scoped MutationObserver only when insertion is outside your control. Retain function references for listener removal, or group listeners under an AbortController. Avoid deleting unrelated inline styles or markup during cleanup.",
          files: [
            {
              name: "index.html",
              code: '<section id="counter">\n  <button type="button">Increment</button><output>0</output>\n</section>\n<button id="destroy" type="button">Destroy counter</button>\n<script type="module">\n  function mountCounter(root) {\n    const controller = new AbortController();\n    const output = root.querySelector("output");\n    let value = 0;\n    root.querySelector("button").addEventListener(\n      "click",\n      () => {\n        output.textContent = String(++value);\n      },\n      { signal: controller.signal }\n    );\n    return {\n      destroy() {\n        controller.abort();\n      }\n    };\n  }\n  const counter = mountCounter(document.querySelector("#counter"));\n  document.querySelector("#destroy").onclick = () => counter.destroy();\n</script>',
              language: "html",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
          kind: "browser",
          requires:
            "Browser; serve the independent HTML example over localhost",
          note: "",
        },
      ],
      checkpoint:
        "Render dynamic rows as text and mount/destroy the same component repeatedly without duplicate handlers.",
      specialization: false,
    },
    {
      number: 9,
      name: "Browser Events",
      level: 3,
      topics: [
        "`addEventListener()` and `removeEventListener()`",
        "Event objects",
        "Bubbling and capturing",
        "Event delegation",
        "`event.target` vs `event.currentTarget`",
        "`preventDefault()` and `stopPropagation()`",
        "Passive and once-only listeners",
        "Pointer, mouse, keyboard, touch, and focus events",
        "Custom events and `dispatchEvent()`",
        "Event listener lifecycle",
        "Event delegation for dynamically created elements",
      ],
      lessons: [
        {
          name: "Event propagation and delegation",
          explanation:
            "Events travel through capture, target, and usually bubble phases. currentTarget is the element whose listener is running; target is the originating target as exposed to that listener, which can be retargeted across shadow boundaries. Delegation listens at a stable ancestor and finds an actionable descendant, so newly inserted children work too.\n\npreventDefault cancels a cancelable browser action; stopPropagation stops traversal, not the default action. A passive listener promises not to cancel that action, useful for scrolling input. once removes a listener after its first call. Prefer pointer events for shared mouse/pen/touch input, click for activation, and focus/keyboard behavior for non-pointer access. Removing listeners requires the same function and matching capture mode.",
          files: [
            {
              name: "index.html",
              code: '<ul id="tasks">\n  <li>\n    <button data-action="remove" type="button">\n      <span>Remove task</span>\n    </button>\n  </li>\n</ul>\n<button id="add" type="button">Add task</button>\n<script type="module">\n  const list = document.querySelector("#tasks");\n  const owner = new AbortController();\n  list.addEventListener(\n    "click",\n    event => {\n      if (!(event.target instanceof Element)) return;\n      const button = event.target.closest(\'[data-action="remove"]\');\n      if (!button || !list.contains(button)) return;\n      button.closest("li").remove();\n    },\n    { signal: owner.signal }\n  );\n  document.querySelector("#add").onclick = () => {\n    const row = document.createElement("li");\n    const button = document.createElement("button");\n    button.type = "button";\n    button.dataset.action = "remove";\n    button.textContent = "Remove new task";\n    row.append(button);\n    list.append(row);\n  };\n  // Component cleanup: owner.abort(); clear the separately owned add-button handler too.\n</script>',
              language: "html",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
          kind: "browser",
          requires:
            "Browser; serve the independent HTML example over localhost",
          note: "",
        },
        {
          name: "Custom events connect components without global coupling",
          explanation:
            "CustomEvent carries structured detail and can opt into bubbling. dispatchEvent runs listeners synchronously; it does not wait for a returned promise. If listeners can veto an action, mark the event cancelable and inspect dispatchEvent’s boolean result. Use explicit naming and document the detail shape.\n\nA shadow-root event needs composed: true to cross that boundary when that is part of the public contract. Avoid putting every local change onto document: broad event buses obscure ownership and make cleanup harder. For a direct parent-child relationship, a callback may be simpler than an event channel.",
          files: [
            {
              name: "index.html",
              code: '<section id="picker"><button type="button">Select book</button></section>\n<p id="choice" role="status">No selection</p>\n<script type="module">\n  const picker = document.querySelector("#picker");\n  picker.addEventListener("product:select", event => {\n    document.querySelector("#choice").textContent =\n      `Selected ${event.detail.id}`;\n  });\n  picker.querySelector("button").onclick = () => {\n    picker.dispatchEvent(\n      new CustomEvent("product:select", {\n        detail: { id: "p1" },\n        bubbles: true,\n        composed: true\n      })\n    );\n  };\n</script>',
              language: "html",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent",
          kind: "browser",
          requires:
            "Browser; serve the independent HTML example over localhost",
          note: "",
        },
      ],
      checkpoint:
        "Use nested button content with delegation, then insert another row and confirm it behaves identically.",
      specialization: false,
    },
    {
      number: 10,
      name: "Forms and Validation",
      level: 3,
      topics: [
        "Form handling and submission",
        "`FormData`",
        "Native HTML validation API",
        "Custom validation",
        "Real-time validation",
        "Asynchronous validation",
        "Managing form state",
        "Accessibility and error messaging",
        "Multi-step forms",
        "File uploads",
        "Preventing duplicate submissions",
      ],
      lessons: [
        {
          name: "Native validation, FormData, and accessible feedback",
          explanation:
            "Listen to submit on the form rather than only click on its button, so Enter-key submission works. Native constraints such as required, type, and minLength catch common errors; setCustomValidity adds a custom rule. Clear the old custom message before checking a changed value. Associate messages with the relevant input and announce a concise result rather than every keystroke.\n\nFormData collects successful form controls, with repeated names preserved through getAll. File values are File objects. When sending FormData with Fetch, let the browser set multipart boundaries instead of manually setting Content-Type. A client check improves UX; the server must still validate and authorize the submission.",
          files: [
            {
              name: "index.html",
              code: '<form id="profile">\n  <label\n    >Name\n    <input\n      name="name"\n      required\n      minlength="2"\n      aria-describedby="name-error" /></label\n  ><span id="name-error"></span\n  ><label>Attachment <input name="file" type="file" /></label\n  ><button>Save</button>\n</form>\n<p id="status" role="status"></p>\n<script type="module">\n  const form = document.querySelector("#profile");\n  const name = form.elements.namedItem("name");\n  const error = document.querySelector("#name-error");\n  name.addEventListener("input", () => {\n    name.setCustomValidity("");\n    if (name.value.trim().length < 2)\n      name.setCustomValidity("Use at least two non-space characters.");\n    error.textContent = name.validationMessage;\n    name.setAttribute("aria-invalid", String(!name.validity.valid));\n  });\n  form.addEventListener("submit", event => {\n    event.preventDefault();\n    if (!form.reportValidity()) return;\n    const data = new FormData(form);\n    document.querySelector("#status").textContent =\n      `Ready to save ${data.get("name").trim()}`;\n  });\n</script>',
              language: "html",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation",
          kind: "browser",
          requires:
            "Browser; serve the independent HTML example over localhost",
          note: "",
        },
        {
          name: "Async validation and duplicate submission need a race policy",
          explanation:
            "An availability check can finish after a newer value has been entered. Abort the old request where possible and use a request identity check before committing its result. Network failure is not the same as an invalid field. Debounce expensive validation, and avoid making every keypress a server request.\n\nFor submission, keep one in-flight operation, disable the submit control, and restore it in finally. Do not blindly retry a payment or creation request: backend idempotency matters. A multi-step form should validate the current step, expose its heading and progress, and retain entered values. The helper below is transport-independent so a real Fetch implementation or test stub can be injected.",
          files: [
            {
              name: "submission.js",
              code: 'export function createSubmission(save) {\n  let pending = false;\n  return async function submit(data) {\n    if (pending) return { status: "busy" };\n    pending = true;\n    try {\n      return { status: "saved", value: await save(data) };\n    } catch (error) {\n      return { status: "error", error };\n    } finally {\n      pending = false;\n    }\n  };\n}\n// In the form adapter, set button.disabled while awaiting this helper.\n// save can use fetch(url, { method: "POST", body: new FormData(form), signal }).',
              language: "js",
            },
          ],
          source: "https://developer.mozilla.org/en-US/docs/Web/API/FormData",
          kind: "module",
          requires: "Multi-file browser/Vite ES modules; serve over localhost",
          note: "",
        },
      ],
      checkpoint:
        "Submit with Enter, trigger an invalid field, and verify that async results cannot overwrite a newer value.",
      specialization: false,
    },
    {
      number: 11,
      name: "Browser APIs",
      level: 3,
      topics: [
        "`window`, `document`, `navigator`, `location`",
        "`localStorage` and `sessionStorage`",
        "Cookies",
        "URL and URLSearchParams",
        "History API",
        "Clipboard API",
        "Intersection Observer",
        "Resize Observer",
        "Mutation Observer",
        "Web Animations API",
        "`requestAnimationFrame()`",
        "`requestIdleCallback()` and its availability limitations",
        "Web Components and Custom Elements",
        "Shadow DOM",
      ],
      lessons: [
        {
          name: "Browser state, URLs, storage, and clipboard",
          explanation:
            "window, document, navigator, and location belong to the browser runtime. URL and URLSearchParams parse and encode URL components more reliably than string concatenation. History pushState/replaceState update same-origin history without loading a page; popstate handles traversal, not the initial push itself. Keep URL state and displayed state synchronized.\n\nlocalStorage persists strings by origin, sessionStorage is scoped to a tab session, and either can throw or be unavailable. Cookies have separate request and security behavior; HttpOnly cookies cannot be read by JavaScript. Do not treat client storage as authorization. Clipboard writes require a secure context and browser permission/user-activation conditions; handle rejection with a usable fallback.",
          files: [
            {
              name: "index.html",
              code: '<button id="remember" type="button">Remember filter</button\n><button id="copy" type="button">Copy link</button>\n<p id="status" role="status"></p>\n<script type="module">\n  const status = document.querySelector("#status");\n  const url = new URL(location.href);\n  url.searchParams.set("category", "books & art");\n  document.querySelector("#remember").onclick = () => {\n    history.replaceState(null, "", url);\n    try {\n      localStorage.setItem("catalog:category", "books & art");\n      status.textContent = "Saved";\n    } catch {\n      status.textContent = "Filter applied; storage unavailable";\n    }\n  };\n  document.querySelector("#copy").onclick = async () => {\n    try {\n      await navigator.clipboard.writeText(url.href);\n      status.textContent = "Link copied";\n    } catch {\n      status.textContent = `Copy this link: ${url.href}`;\n    }\n  };\n</script>',
              language: "html",
            },
          ],
          source: "https://developer.mozilla.org/en-US/docs/Web/API/URL",
          kind: "browser",
          requires:
            "Browser; serve the independent HTML example over localhost",
          note: "",
        },
        {
          name: "Observers and schedulers replace unnecessary polling",
          explanation:
            "IntersectionObserver reports visibility crossings, ResizeObserver reports size changes, and MutationObserver reports DOM mutations. They are asynchronous observation tools with different purposes, not interchangeable ways to run an infinite loop. Observe the smallest relevant root and disconnect on destruction. Avoid a resize callback that repeatedly changes the size it observes.\n\nrequestAnimationFrame schedules visual work before a repaint and provides a timestamp; its rate is not guaranteed to be 60 Hz. requestIdleCallback has limited availability and is unsuitable for essential immediate work. Feature-detect it and provide a timeout-based fallback for small background tasks. Cancel whichever scheduling mechanism you created.",
          files: [
            {
              name: "index.html",
              code: '<div id="card">Resize the window; this element is observed.</div>\n<button id="stop" type="button">Stop observing</button\n><output id="size"></output>\n<style>\n  #card {\n    width: 80%;\n    padding: 20px;\n    border: 1px solid #2563eb;\n  }\n</style>\n<script type="module">\n  const card = document.querySelector("#card");\n  const resize = new ResizeObserver(entries => {\n    document.querySelector("#size").textContent =\n      `${Math.round(entries[0].contentRect.width)}px`;\n  });\n  resize.observe(card);\n  const visible = new IntersectionObserver(entries => {\n    card.classList.toggle("visible", entries[0].isIntersecting);\n  });\n  visible.observe(card);\n  const mutation = new MutationObserver(records =>\n    console.log("DOM changes", records.length)\n  );\n  mutation.observe(card, { childList: true });\n  const idle = "requestIdleCallback" in window;\n  const work = () => console.log("Small background task");\n  const handle = idle\n    ? requestIdleCallback(work, { timeout: 1000 })\n    : setTimeout(work, 0);\n  document.querySelector("#stop").onclick = () => {\n    resize.disconnect();\n    visible.disconnect();\n    mutation.disconnect();\n    if (idle) cancelIdleCallback(handle);\n    else clearTimeout(handle);\n  };\n</script>',
              language: "html",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback",
          kind: "browser",
          requires:
            "Browser; serve the independent HTML example over localhost",
          note: "requestIdleCallback is not universally available; the example includes a feature-detected fallback.",
        },
        {
          name: "Custom elements and Shadow DOM have explicit lifecycle hooks",
          explanation:
            "A custom element is a registered class with connected/disconnected lifecycle callbacks. Shadow DOM encapsulates a subtree and styles; it is not a security sandbox. Native controls inside the shadow tree still need accessible names and keyboard behavior. Use public attributes/properties/events rather than reaching into another component’s implementation.\n\nConnection can happen repeatedly when an element is removed and reinserted. Avoid duplicating DOM or listeners each time. Register a custom-element name only once. This small counter keeps its shadow tree between connections and reattaches a listener under a fresh AbortController each time it is connected.",
          files: [
            {
              name: "index.html",
              code: '<study-counter></study-counter>\n<script type="module">\n  class StudyCounter extends HTMLElement {\n    #value = 0;\n    #owner;\n    constructor() {\n      super();\n      const root = this.attachShadow({ mode: "open" });\n      const button = document.createElement("button");\n      button.type = "button";\n      button.textContent = "Count: 0";\n      root.append(button);\n    }\n    connectedCallback() {\n      this.#owner?.abort();\n      this.#owner = new AbortController();\n      const button = this.shadowRoot.querySelector("button");\n      button.addEventListener(\n        "click",\n        () => {\n          button.textContent = `Count: ${++this.#value}`;\n        },\n        { signal: this.#owner.signal }\n      );\n    }\n    disconnectedCallback() {\n      this.#owner?.abort();\n    }\n  }\n  if (!customElements.get("study-counter"))\n    customElements.define("study-counter", StudyCounter);\n</script>',
              language: "html",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Web_components",
          kind: "browser",
          requires:
            "Browser; serve the independent HTML example over localhost",
          note: "",
        },
      ],
      checkpoint:
        "Exercise storage failure and observer cleanup; reconnect a custom element without duplicating its listener.",
      specialization: false,
    },
    {
      number: 12,
      name: "Animations and Interactivity",
      level: 3,
      topics: [
        "CSS animations controlled by JavaScript",
        "`requestAnimationFrame()`",
        "Animation timing and easing",
        "GSAP fundamentals and timelines",
        "ScrollTrigger",
        "Scroll-based interactions",
        "Managing animation state",
        "Cleaning up animations",
        "Avoiding layout thrashing",
        "Animation performance",
        "Respecting `prefers-reduced-motion`",
      ],
      lessons: [
        {
          name: "Use CSS, WAAPI, and frame timing according to the job",
          explanation:
            "JavaScript can toggle a CSS class to start a transition, use the Web Animations API for explicit playback handles, or use requestAnimationFrame for a custom renderer. An animation’s duration and easing describe progress over time; incrementing a fixed number of pixels per frame makes speed depend on refresh rate.\n\nKeep application state separate from decorative progress and retain a cancellation handle. Batch measurements before writes to avoid layout thrashing. Use transform/opacity when their visual behavior is sufficient, but measure actual rendering costs. Respect reduced motion and keep content useful with animations disabled.",
          files: [
            {
              name: "index.html",
              code: '<button id="move" type="button">Move</button>\n<div id="box" aria-hidden="true"></div>\n<style>\n  #box {\n    width: 64px;\n    height: 64px;\n    background: #2563eb;\n    margin: 20px;\n  }\n</style>\n<script type="module">\n  const box = document.querySelector("#box");\n  let animation;\n  document.querySelector("#move").onclick = () => {\n    animation?.cancel();\n    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {\n      box.style.transform = "translateX(100px)";\n      return;\n    }\n    animation = box.animate(\n      [{ transform: "translateX(0)" }, { transform: "translateX(100px)" }],\n      { duration: 350, easing: "ease-out", fill: "forwards" }\n    );\n    void animation.finished.catch(() => {}); // Cancellation is an expected outcome.\n  };\n  // Teardown: animation?.cancel(); remove the owned event handler.\n</script>',
              language: "html",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API",
          kind: "browser",
          requires:
            "Browser; serve the independent HTML example over localhost",
          note: "",
        },
        {
          name: "GSAP adds coordination, scroll integration, and scoped cleanup",
          explanation:
            "A GSAP tween animates properties; a timeline sequences several tweens around one playhead. ScrollTrigger maps viewport crossings or scroll progress to animation. Register imported plugins and keep core/plugin versions aligned. The dedicated GSAP handbook develops these concepts in much greater depth; here the important JavaScript skill is lifecycle ownership.\n\nUse matchMedia for responsive/reduced-motion conditions and revert it when a feature is destroyed. Scroll-triggered effects should not hide essential content when motion is off. Recalculate after genuine layout changes, and avoid creating new global scroll listeners for every element.",
          files: [
            {
              name: "mount-reveal.js",
              code: 'import { gsap } from "gsap";\nimport { ScrollTrigger } from "gsap/ScrollTrigger";\ngsap.registerPlugin(ScrollTrigger);\nexport function mountReveal(root) {\n  const media = gsap.matchMedia();\n  media.add("(prefers-reduced-motion: no-preference)", () => {\n    gsap\n      .timeline({\n        scrollTrigger: { trigger: root, start: "top 85%", once: true }\n      })\n      .from(root.querySelectorAll("h2, p"), {\n        y: 16,\n        opacity: 0,\n        duration: 0.5,\n        stagger: 0.08\n      });\n  });\n  return () => media.revert();\n}',
              language: "js",
            },
          ],
          source: "https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/",
          kind: "integration",
          requires:
            "Vite/browser module; gsap@3.15.0; supply a section containing h2/p; context/matchMedia require GSAP 3.11+",
          note: "",
        },
      ],
      checkpoint:
        "Disable motion and cancel an in-flight animation; content and controls must remain useful.",
      specialization: false,
    },
    {
      number: 13,
      name: "Asynchronous Programming Fundamentals",
      level: 4,
      topics: [
        "Synchronous vs asynchronous execution",
        "Callbacks",
        "Callback nesting",
        "Timers: `setTimeout()`, `setInterval()`",
        "Event loop",
        "Call stack",
        "Task queue",
        "Microtask queue",
        "Task vs microtask execution order",
        "Browser rendering and scheduling",
        "Blocking vs non-blocking operations",
      ],
      lessons: [
        {
          name: "Tasks, microtasks, and rendering are different queues",
          explanation:
            "Synchronous code on an agent runs to completion before another task can interrupt it. Timers schedule later tasks, not exact execution appointments. Promise reactions and queueMicrotask schedule microtasks; the browser drains a microtask checkpoint before moving on to later work, which can delay rendering if that queue is continuously refilled.\n\nA call stack tracks currently executing functions. Asynchronous APIs register work with the host and resume through callbacks or promise reactions later; a Promise does not move expensive CPU work onto another thread. Browsers may render between tasks, but a timer callback is not a guaranteed repaint boundary. This experiment prints the synchronous lines, then the promise and queued microtask, then the timer.",
          files: [
            {
              name: "example.mjs",
              code: 'console.log("A");\nsetTimeout(() => console.log("timer"), 0);\nPromise.resolve().then(() => console.log("promise"));\nqueueMicrotask(() => console.log("microtask"));\nconsole.log("B");\n// A, B, promise, microtask, timer (this independent example).',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
        {
          name: "Timers need a lifetime and a non-overlap policy",
          explanation:
            "Nested callbacks make dependencies hard to see; separate named steps or use promises instead of growing a pyramid. setInterval can start another asynchronous operation before the previous one finishes. A recursive timeout scheduled after completion is clearer for non-overlapping polling.\n\nCancel timers when their owner ends, and guard work that was already in flight. A timeout delay is a lower scheduling bound, not real-time timing. Use requestAnimationFrame for visual updates and workers for appropriate CPU-heavy work. The poller below takes a transport function, reports one result at a time, and exposes cleanup without requiring a real server.",
          files: [
            {
              name: "poller.js",
              code: "export function startPolling(load, onResult, onError, delay = 1000) {\n  let active = true;\n  let timer;\n  const controller = new AbortController();\n  async function tick() {\n    try {\n      const value = await load(controller.signal);\n      if (active) onResult(value);\n    } catch (error) {\n      if (active) onError(error);\n    } finally {\n      if (active) timer = setTimeout(tick, delay);\n    }\n  }\n  void tick();\n  return () => {\n    active = false;\n    clearTimeout(timer);\n    controller.abort();\n  };\n}",
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval",
          kind: "module",
          requires: "Multi-file browser/Vite ES modules; serve over localhost",
          note: "",
        },
      ],
      checkpoint:
        "Predict task/microtask order, then show why a long synchronous loop still blocks the browser.",
      specialization: false,
    },
    {
      number: 14,
      name: "Promises",
      level: 4,
      topics: [
        "Creating Promises",
        "Promise states",
        "`resolve()` and `reject()`",
        "`.then()`, `.catch()`, `.finally()`",
        "Promise chaining",
        "Error propagation",
        "`Promise.all()`",
        "`Promise.allSettled()`",
        "`Promise.race()`",
        "`Promise.any()`",
        "Sequential vs parallel asynchronous tasks",
        "Common Promise mistakes",
        "Unhandled rejections",
      ],
      lessons: [
        {
          name: "Promises represent eventual outcomes and propagate errors",
          explanation:
            "A promise is pending, fulfilled, or rejected; settled means either fulfilled or rejected. Its executor runs synchronously, but reactions run asynchronously. Resolve can adopt another promise/thenable, so resolved is not always the same as already fulfilled. Return a value or promise from then to connect the chain.\n\nA throw in a handler becomes a rejection for the next link. catch can recover by returning a value or propagate by throwing. finally is for cleanup and normally preserves the result unless it throws or returns a rejection. Do not wrap an already promise-based API in a new Promise unnecessarily. Observe the returned chain to prevent unhandled rejections.",
          files: [
            {
              name: "example.mjs",
              code: 'const read = new Promise((resolve, reject) => {\n  const text = "12";\n  const value = Number(text);\n  if (Number.isFinite(value)) resolve(value);\n  else reject(new TypeError("Invalid number"));\n});\nconst result = await read\n  .then(value => value * 2)\n  .then(value => {\n    if (value < 0) throw new RangeError("Negative");\n    return value;\n  })\n  .catch(error => {\n    console.log(error.message);\n    return 0;\n  })\n  .finally(() => console.log("finished"));\nconsole.log(result); // 24',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
        {
          name: "Choose the promise combinator by its failure contract",
          explanation:
            "Promise.all waits for every fulfillment but rejects on the first observed rejection; it does not cancel the remaining work. allSettled reports every outcome. race settles with the first settled input, including a rejection. any fulfills with the first fulfillment and rejects with AggregateError only when all inputs reject.\n\nStart independent work before awaiting it to run concurrently. Sequential awaits are appropriate when the next operation depends on the previous result or ordering is required. Creating an array of promises does not impose a concurrency limit. Cancellation and request budgets remain your responsibility; a timeout implemented with race alone leaves the losing request running.",
          files: [
            {
              name: "example.mjs",
              code: 'const values = [Promise.resolve(2), Promise.resolve(3)];\nconsole.log(await Promise.all(values)); // [2, 3]\nconst outcomes = await Promise.allSettled([\n  Promise.resolve("ok"),\n  Promise.reject(new Error("no"))\n]);\nconsole.log(outcomes.map(outcome => outcome.status)); // fulfilled, rejected\nconsole.log(\n  await Promise.any([\n    Promise.reject(new Error("offline")),\n    Promise.resolve("backup")\n  ])\n);\nconsole.log(\n  await Promise.race([Promise.resolve("first"), Promise.resolve("second")])\n);',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
      ],
      checkpoint:
        "Compare all/allSettled/race/any on fulfillment and rejection; explain why none cancels the losers.",
      specialization: false,
    },
    {
      number: 15,
      name: "Async / Await",
      level: 4,
      topics: [
        "Async functions",
        "Awaiting Promise results",
        "Sequential vs concurrent execution",
        "Error handling",
        "Async callbacks and loops",
        "Async iteration (`for await...of`)",
        "Promise return behavior",
        "Cancellation with `AbortController`",
        "Managing loading and error states",
        "Retries and timeout strategies",
      ],
      lessons: [
        {
          name: "async/await makes dependencies readable, not automatically concurrent",
          explanation:
            "An async function always returns a promise. await suspends that function until a value is resolved, while other work can proceed. It does not block the whole browser thread, but synchronous CPU work before or after it still can. try/catch handles an awaited rejection at the boundary where you can respond.\n\nforEach does not await an async callback. Use for...of for sequential async work or map plus Promise.all for independent work, with an explicit concurrency limit when volume grows. for await...of consumes async iterables and can also await values from a synchronous iterable. Return or await the promise your caller must observe; a detached operation needs its own rejection handler.",
          files: [
            {
              name: "example.mjs",
              code: 'const load = async id => ({ id, title: `Item ${id}` });\nconst ids = [1, 2, 3];\nconst concurrent = await Promise.all(ids.map(id => load(id)));\nconst sequential = [];\nfor (const id of ids) sequential.push(await load(id));\nasync function* pages() {\n  yield [1, 2];\n  yield [3];\n}\nfor await (const page of pages()) console.log("Page", page);\nconsole.log(concurrent.length, sequential.length); // 3, 3',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
        {
          name: "Cancellation, timeout, and latest-result state",
          explanation:
            "AbortController is a cancellation signal that cooperating APIs such as Fetch observe. It does not terminate arbitrary JavaScript. Always distinguish cancellation from a real failure and release timers in finally. A timeout policy should actually abort the operation when possible, not merely stop waiting.\n\nFor a UI, track loading/error/success and a request identity so stale work cannot overwrite newer results. Retry only bounded, appropriate operations; use backoff and consider server Retry-After, idempotency, and user cancellation. The helper below preserves a caller signal, has a finite timeout, checks HTTP status, and cleans up its listener even after failure.",
          files: [
            {
              name: "fetch-json.js",
              code: 'export async function fetchJson(url, { signal, timeoutMs = 5000 } = {}) {\n  const controller = new AbortController();\n  const abort = () => controller.abort(signal.reason);\n  if (signal?.aborted) abort();\n  else signal?.addEventListener("abort", abort, { once: true });\n  const timer = setTimeout(\n    () => controller.abort(new DOMException("Timed out", "TimeoutError")),\n    timeoutMs\n  );\n  try {\n    const response = await fetch(url, { signal: controller.signal });\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    return await response.json();\n  } finally {\n    clearTimeout(timer);\n    signal?.removeEventListener("abort", abort);\n  }\n}',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
          kind: "module",
          requires: "Multi-file browser/Vite ES modules; serve over localhost",
          note: "",
        },
      ],
      checkpoint:
        "Run independent work concurrently, then cancel a stale request and confirm its timer/listener cleanup.",
      specialization: false,
    },
    {
      number: 16,
      name: "Network Communication",
      level: 4,
      topics: [
        "HTTP fundamentals",
        "REST APIs",
        "Fetch API",
        "Request and response objects",
        "Request headers and HTTP methods",
        "Status codes and checking `response.ok`",
        "JSON data handling",
        "Authentication concepts",
        "CORS",
        "Pagination",
        "Debounced searches",
        "Request cancellation",
        "WebSockets",
        "Server-Sent Events (SSE)",
      ],
      lessons: [
        {
          name: "HTTP and Fetch have two separate failure boundaries",
          explanation:
            "HTTP defines methods, headers, status codes, and response bodies; a REST-style API maps resources and operations onto those contracts. Fetch rejects for transport failures, but a 404/500 response still normally fulfills, so check response.ok. Parsing JSON is another fallible asynchronous step, and the result still needs shape validation. Request/Response objects expose those contracts; bodies are streams that are generally consumed once.\n\nCORS is enforced by the browser and configured by the server. mode:no-cors does not unlock a readable cross-origin response. Authentication proves identity; authorization is the server’s decision about permitted operations. Do not invent headers or client-side checks to bypass either policy.",
          files: [
            {
              name: "example.mjs",
              code: 'const request = new Request(\n  "data:application/json,%7B%22items%22%3A%5B%7B%22id%22%3A%22p1%22%7D%5D%7D",\n  {\n    method: "GET",\n    headers: { Accept: "application/json" }\n  }\n);\nconst response = await fetch(request);\nif (!response.ok) throw new Error(`HTTP ${response.status}`);\nconst data = await response.json();\nif (\n  !Array.isArray(data.items) ||\n  !data.items.every(item => item && typeof item.id === "string")\n) {\n  throw new TypeError("Unexpected item response");\n}\nconsole.log(data.items[0].id); // p1',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
        {
          name: "Search and pagination must not commit outdated responses",
          explanation:
            "Encode query parameters with URLSearchParams and treat pagination metadata as part of the API contract. Debounce user input, abort the old request, and use a generation number so a server/adapter that finishes despite cancellation cannot commit stale data. Render user data as text.\n\nThis complete browser fixture uses a local fake transport so the race behavior can be explored without a server. Replace only searchProducts with your real Fetch adapter. A real paginated API should validate items and next-page metadata and define how filter changes reset the page; do not combine results from different queries or users in one cache key.",
          files: [
            {
              name: "index.html",
              code: '<label>Search products <input id="search" /></label>\n<p id="status" role="status"></p>\n<ul id="results"></ul>\n<script type="module">\n  const input = document.querySelector("#search");\n  const status = document.querySelector("#status");\n  const list = document.querySelector("#results");\n  const products = [\n    { id: "1", name: "Book" },\n    { id: "2", name: "Pen" }\n  ];\n  async function searchProducts(query, signal) {\n    signal.throwIfAborted();\n    return products.filter(item =>\n      item.name.toLowerCase().includes(query.toLowerCase())\n    );\n  }\n  let timer;\n  let request;\n  let generation = 0;\n  input.addEventListener("input", () => {\n    clearTimeout(timer);\n    request?.abort();\n    const mine = ++generation;\n    timer = setTimeout(async () => {\n      request = new AbortController();\n      status.textContent = "Loading";\n      try {\n        const items = await searchProducts(\n          input.value.trim(),\n          request.signal\n        );\n        if (mine !== generation) return;\n        list.replaceChildren(\n          ...items.map(item => {\n            const row = document.createElement("li");\n            row.textContent = item.name;\n            return row;\n          })\n        );\n        status.textContent = `${items.length} results`;\n      } catch (error) {\n        if (mine === generation && error.name !== "AbortError")\n          status.textContent = "Search unavailable";\n      }\n    }, 150);\n  });\n  // Teardown: clearTimeout(timer); request?.abort(); remove the input listener.\n</script>',
              language: "html",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          kind: "browser",
          requires:
            "Browser; serve the independent HTML example over localhost",
          note: "",
        },
        {
          name: "Choose WebSocket or SSE when updates are a stream",
          explanation:
            "WebSocket provides a bidirectional connection, while EventSource consumes server-sent events over a one-way server-to-browser stream. Both require a matching backend and explicit authentication, reconnection, message validation, and ownership policies. They do not replace ordinary Fetch for every request.\n\nSSE usually reconnects automatically; avoid creating an additional connection on every message or UI render. Native EventSource cannot add arbitrary request headers. WebSocket messages must be parsed and validated before updating domain state. Close either connection when its owner ends, and never assume every string from a trusted connection is safe HTML.",
          files: [
            {
              name: "live-events.js",
              code: 'export function subscribe(url, onValue, onError) {\n  const source = new EventSource(url);\n  const message = event => {\n    try {\n      const value = JSON.parse(event.data);\n      if (!value || typeof value.count !== "number")\n        throw new TypeError("Invalid count");\n      onValue(value.count);\n    } catch (error) {\n      onError(error);\n    }\n  };\n  source.addEventListener("message", message);\n  source.addEventListener("error", onError);\n  return () => source.close();\n}\n// SSE endpoint must return text/event-stream; no connection is opened until called.\n// WebSocket alternative: const socket = new WebSocket(url);\n// socket.addEventListener("message", handler); dispose with socket.close().',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events",
          kind: "integration",
          requires:
            "Browser module plus a real SSE endpoint; helper is not invoked by the example",
          note: "",
        },
      ],
      checkpoint:
        "Validate response shape, force a failed status, and prevent a slow old search from replacing a newer result.",
      specialization: false,
    },
    {
      number: 17,
      name: "Object-Oriented Programming (OOP)",
      level: 5,
      topics: [
        "Constructor functions",
        "Prototype chain",
        "Prototypal inheritance",
        "Classes",
        "Constructors",
        "Instance and static methods",
        "Private fields",
        "Getters and setters",
        "Class inheritance",
        "Method overriding",
        "Encapsulation",
        "Polymorphism",
        "Composition vs inheritance",
      ],
      lessons: [
        {
          name: "Prototypes explain both constructor functions and classes",
          explanation:
            "An object delegates missing-property lookup to its prototype, continuing until null. A constructor function called with new creates an instance whose prototype is usually the constructor’s prototype object. Class syntax builds on that model; it does not introduce a separate inheritance system. Instance methods normally live on the prototype, while static methods live on the class constructor.\n\nUse encapsulation to protect invariants, not simply to hide every property. Private fields use # syntax and cannot be accessed as ordinary string keys. Getters/setters can expose controlled values. Inheritance and overriding enable polymorphism, but composition is often clearer when behavior varies along several independent dimensions.",
          files: [
            {
              name: "example.mjs",
              code: 'function LegacyLabel(text) {\n  this.text = text;\n}\nLegacyLabel.prototype.read = function () {\n  return this.text;\n};\nconsole.log(new LegacyLabel("Legacy").read());\nclass Counter {\n  #value = 0;\n  constructor(start = 0) {\n    this.value = start;\n  }\n  get value() {\n    return this.#value;\n  }\n  set value(next) {\n    if (!Number.isInteger(next) || next < 0)\n      throw new RangeError("Nonnegative integer required");\n    this.#value = next;\n  }\n  increment() {\n    this.#value++;\n    return this.#value;\n  }\n  static from(value) {\n    return new Counter(value);\n  }\n}\nclass StepCounter extends Counter {\n  increment() {\n    super.increment();\n    return super.increment();\n  }\n}\nfor (const counter of [Counter.from(1), new StepCounter(1)])\n  console.log(counter.increment()); // 2, 3',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
      ],
      checkpoint:
        "Explain prototype lookup and override one method while preserving an invariant in a private field.",
      specialization: false,
    },
    {
      number: 18,
      name: "Functional Programming",
      level: 5,
      topics: [
        "Pure functions",
        "Immutability",
        "First-class functions",
        "Higher-order functions",
        "Function composition",
        "Currying",
        "Partial application",
        "Closures as state containers",
        "Declarative vs imperative programming",
        "Avoiding shared mutable state",
        "Functional data transformations",
      ],
      lessons: [
        {
          name: "Functional composition keeps transformations testable",
          explanation:
            "First-class functions can be stored, passed, and returned. Higher-order functions build on that ability. Composition connects small functions; currying turns a multi-argument function into a chain of single-argument functions, while partial application fixes some arguments without requiring that shape.\n\nPrefer pure transformations for domain data, with effects at boundaries. Immutable updates reduce surprises from shared references; they do not require deep-cloning the entire application for every change. Closures can contain local state when that state has a clear owner. Declarative code describes the desired transformation, while imperative code describes steps; choose the form that is easier to understand rather than treating either as universally superior.",
          files: [
            {
              name: "example.mjs",
              code: 'const pipe =\n  (...steps) =>\n  value =>\n    steps.reduce((result, step) => step(result), value);\nconst trim = text => text.trim();\nconst lower = text => text.toLowerCase();\nconst normalize = pipe(trim, lower);\nconst multiply = factor => value => factor * value; // Curried.\nconst applyDiscount = multiply(0.9); // Partially applied for this domain.\nconst products = [{ id: "a", name: " BOOK ", price: 20 }];\nconst updated = products.map(item => ({\n  ...item,\n  name: normalize(item.name),\n  price: applyDiscount(item.price)\n}));\nconsole.log(updated[0], products[0].price); // New record; original price remains 20.',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
      ],
      checkpoint:
        "Compose a pure data pipeline and identify its effect boundary and remaining shared references.",
      specialization: false,
    },
    {
      number: 19,
      name: "Design Patterns",
      level: 5,
      topics: [
        "Module Pattern",
        "Factory Pattern",
        "Singleton Pattern",
        "Observer Pattern",
        "Pub/Sub Pattern",
        "Strategy Pattern",
        "Adapter Pattern",
        "Decorator Pattern",
        "Dependency Injection",
        "Composition patterns",
        "State management patterns",
      ],
      lessons: [
        {
          name: "Factories, modules, and dependency injection",
          explanation:
            "A module hides implementation behind exports. A factory returns a configured object without requiring a class. Dependency injection supplies collaborators such as storage or transport rather than importing a fixed global implementation. A singleton shares one instance, which is useful only when that shared lifetime is intended; hidden singleton state often makes tests and multi-instance components harder.\n\nAn adapter translates one interface into another, a strategy selects an interchangeable algorithm, and a decorator wraps behavior with additional work. Prefer direct composition until a named pattern actually clarifies a recurring problem. The repository below uses an injected storage adapter and strategy without global state.",
          files: [
            {
              name: "example.mjs",
              code: 'function createRepository(storage, key, encode = JSON.stringify) {\n  return {\n    save(value) {\n      storage.setItem(key, encode(value));\n    },\n    read() {\n      const text = storage.getItem(key);\n      return text === null ? null : JSON.parse(text);\n    }\n  };\n}\nconst values = new Map();\nconst memoryStorage = {\n  // Adapter to the Storage-shaped interface.\n  setItem: (key, value) => values.set(key, value),\n  getItem: key => values.get(key) ?? null\n};\nconst repository = createRepository(memoryStorage, "cart");\nrepository.save({ items: ["book"] });\nconsole.log(repository.read().items);',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
        {
          name: "Observer, Pub/Sub, and explicit state ownership",
          explanation:
            "An observer subscribes directly to a subject; Pub/Sub introduces a channel between publishers and subscribers. Both can decouple components, but a global bus can also hide dependencies. Return an unsubscribe function and document whether delivery is synchronous, ordered, and isolated from listener errors.\n\nA state store can combine a reducer-like update function with subscription. Keep one authoritative state instead of several mutable copies in unrelated modules. This bus is intentionally small: emit is synchronous, exceptions propagate, and a snapshot of listeners makes subscription changes during delivery predictable. Add complexity only when real requirements demand it.",
          files: [
            {
              name: "example.mjs",
              code: 'function createBus() {\n  const groups = new Map();\n  return {\n    on(name, listener) {\n      const listeners = groups.get(name) ?? new Set();\n      groups.set(name, listeners);\n      listeners.add(listener);\n      return () => {\n        listeners.delete(listener);\n        if (!listeners.size) groups.delete(name);\n      };\n    },\n    emit(name, value) {\n      for (const listener of [...(groups.get(name) ?? [])]) listener(value);\n    }\n  };\n}\nconst bus = createBus();\nconst off = bus.on("cart:changed", value => console.log(value.count));\nbus.emit("cart:changed", { count: 2 });\noff();\nbus.emit("cart:changed", { count: 3 }); // No listener remains.',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
      ],
      checkpoint:
        "Inject a fake transport/storage and unsubscribe an observer; justify the pattern instead of naming it only.",
      specialization: false,
    },
    {
      number: 20,
      name: "JavaScript Modules",
      level: 6,
      topics: [
        "ES Modules (ESM)",
        "Named and default exports",
        "Static imports",
        "Dynamic imports (`import()`)",
        "Module scope",
        "Module loading and evaluation",
        "Circular dependencies",
        "CommonJS vs ES Modules",
        "Code splitting",
        "Tree shaking",
        "Module organization",
      ],
      lessons: [
        {
          name: "ES modules have scope, live bindings, and an evaluation graph",
          explanation:
            "ES modules expose named exports and optionally a default export. Static imports declare dependencies that are linked before evaluation; imported bindings are live, read-only views of the exporting module’s bindings. Module scope prevents accidental global variables.\n\nDynamic import returns a promise for a module namespace and can create a lazy-loading boundary. A bundler may split that graph into files and tree-shake unused exports, subject to side effects and configuration. Circular dependencies can observe uninitialized bindings during evaluation; extract shared contracts or invert a dependency rather than relying on a fragile import order. Organize by responsibility and keep application startup explicit.",
          files: [
            {
              name: "prices.mjs",
              code: 'export const currency = "USD";\nexport function total(items) {\n  return items.reduce((sum, item) => sum + item.price, 0);\n}\nexport default function format(value) {\n  return new Intl.NumberFormat("en-US", {\n    style: "currency",\n    currency\n  }).format(value);\n}',
              language: "js",
            },
            {
              name: "main.mjs",
              code: 'import format, { total } from "./prices.mjs";\nconst amount = total([{ price: 12 }, { price: 3 }]);\nconsole.log(format(amount)); // $15.00\nconst lazy = await import("./details.mjs");\nconsole.log(lazy.describe(amount));',
              language: "js",
            },
            {
              name: "details.mjs",
              code: "export function describe(amount) {\n  return `Amount: ${amount}`;\n}",
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
          kind: "module",
          requires:
            "Three independent .mjs files in one directory; node main.mjs or a browser module entry",
          note: "",
        },
        {
          name: "CommonJS and ESM interoperability is runtime-specific",
          explanation:
            "Node supports CommonJS and ES modules with different loading and export conventions. .cjs is CommonJS; .mjs is ESM. For .js, package type and runtime rules matter. CommonJS uses require/module.exports, while ESM uses import/export. Browser modules do not provide require by default.\n\nInteroperability has edge cases: named exports inferred from CommonJS are not the same contract as real ESM live bindings, and synchronous loading rules differ by Node version. Prefer one authored format and test every public format you claim to ship. Code splitting, not just syntax conversion, determines what a user downloads initially.",
          files: [
            {
              name: "legacy.cjs",
              code: "module.exports = {\n  add(a, b) {\n    return a + b;\n  }\n};",
              language: "js",
            },
            {
              name: "main.mjs",
              code: 'import legacy from "./legacy.cjs";\nconsole.log(legacy.add(2, 3)); // 5; Node importing a CommonJS module.',
              language: "js",
            },
          ],
          source: "https://nodejs.org/api/esm.html",
          kind: "node",
          requires:
            "Node.js 22+; save both files and run node main.mjs; not a browser require() example",
          note: "",
        },
      ],
      checkpoint:
        "Run a multi-file module graph and explain one cycle hazard and one ESM/CommonJS boundary.",
      specialization: false,
    },
    {
      number: 21,
      name: "Tooling and Build Systems",
      level: 6,
      topics: [
        "npm and package management",
        "`package.json`",
        "Dependency management",
        "Semantic versioning",
        "Vite",
        "Parcel",
        "Rollup and bundling concepts",
        "Babel and transpilation",
        "Browser compatibility",
        "Source maps",
        "Environment variables",
        "ESLint",
        "Prettier",
        "Git workflows",
        "CI/CD fundamentals",
      ],
      lessons: [
        {
          name: "Package management and builds are reproducible inputs",
          explanation:
            "package.json records scripts, dependencies, exports, and package metadata. Semantic versioning expresses compatibility intent, not a guarantee that an upgrade cannot break your app. Commit a lockfile and use npm ci in CI to reproduce it. Keep runtime dependencies separate from build/test tools.\n\nVite offers a development server and production pipeline; Parcel offers another integrated workflow; Rollup is a bundler commonly used for libraries. Babel transforms selected syntax and may need separate runtime helpers or polyfills. Syntax transpilation does not create missing Web APIs. Source maps connect output to source. Vite-prefixed client environment variables are exposed in the delivered application, so never put secrets in them.",
          files: [
            {
              name: "commands.sh",
              code: "npm create vite@latest js-study -- --template vanilla\ncd js-study\nnpm install\nnpm run dev\nnpm run build\nnpm run preview\n# Commit package.json and package-lock.json.\n# In CI, use npm ci, then the project's lint/test/build scripts.",
              language: "shell",
            },
            {
              name: "src/main.js",
              code: 'const label = import.meta.env.VITE_PUBLIC_LABEL ?? "Study app";\ndocument.querySelector("#app").textContent = label;\n// VITE_* values are public build inputs, not a place for API secrets.',
              language: "js",
            },
          ],
          source: "https://vite.dev/guide/",
          kind: "integration",
          requires:
            "Current Vite vanilla scaffold; use the Node version supported by that selected Vite release; src/main.js runs only in Vite",
          note: "",
        },
        {
          name: "Linting, formatting, Git, and CI serve different checks",
          explanation:
            "ESLint checks selected code rules; Prettier formats source consistently. Neither proves application behavior. Use a compatible toolchain and make the same checks runnable locally and in CI. For ESLint 9, flat configuration is the normal setup; older .eslintrc tutorials use a different system.\n\nUse small Git changes, review diffs, and run relevant tests before merging. CI can install from the lockfile, lint, test, and build; deployment should consume reviewed output and environment-specific configuration. Treat warnings about unsupported browsers or missing APIs as engineering decisions, not a reason to assume the bundler has polyfilled everything.",
          files: [
            {
              name: "eslint.config.mjs",
              code: 'import js from "@eslint/js";\nimport globals from "globals";\nexport default [\n  { ignores: ["dist/**"] },\n  js.configs.recommended,\n  {\n    files: ["src/**/*.js"],\n    languageOptions: {\n      ecmaVersion: "latest",\n      sourceType: "module",\n      globals: globals.browser\n    }\n  }\n];',
              language: "js",
            },
            {
              name: "commands.sh",
              code: "# ESLint 9 flat-config example; install compatible major versions together.\nnpm install --save-dev eslint@9 @eslint/js@9 globals@16 prettier@3\nnpx eslint src\nnpx prettier --check .\n# Define project scripts so CI can run:\n# npm ci && npm run lint && npm test && npm run build",
              language: "shell",
            },
          ],
          source:
            "https://eslint.org/docs/latest/use/configure/configuration-files",
          kind: "integration",
          requires:
            "ESLint 9 + @eslint/js 9 + globals 16; Prettier 3; existing source tree",
          note: "",
        },
      ],
      checkpoint:
        "Perform a clean install, lint, test, and build; identify which client environment variables are public.",
      specialization: false,
    },
    {
      number: 22,
      name: "Code Architecture and Maintainability",
      level: 6,
      topics: [
        "Separation of concerns",
        "Modular application structure",
        "Single Responsibility Principle",
        "SOLID principles in JavaScript",
        "DRY, KISS, YAGNI",
        "Dependency management",
        "State management",
        "Component-based architecture",
        "Reusable utilities and UI components",
        "Configuration-driven components",
        "Error-handling strategies",
        "API abstraction layers",
        "JSDoc documentation",
        "Refactoring techniques",
        "Code reviews",
      ],
      lessons: [
        {
          name: "Separate domain logic, effects, and application startup",
          explanation:
            "Single responsibility means a module has a coherent reason to change. Separate data transformations, transport, state, rendering, and component lifecycle instead of placing every operation in a click handler. SOLID principles can guide boundaries, but DRY should not force unrelated things into one abstraction; KISS and YAGNI favor the simplest design that meets current requirements.\n\nConfiguration-driven components still need validated options and a clear public API. JSDoc explains contracts and can support editor checking without converting source to TypeScript. Refactor with behavior tests in place, review ownership and error boundaries, and prefer an explicit API adapter over scattering URL/response assumptions through the DOM layer.",
          files: [
            {
              name: "catalog.js",
              code: '/**\n * Select a view without mutating source records.\n * @param {{name: string, price: number}[]} products\n * @param {{query?: string, maxPrice?: number}} options\n * @returns {{name: string, price: number}[]}\n */\nexport function selectProducts(\n  products,\n  { query = "", maxPrice = Infinity } = {}\n) {\n  const normalized = query.trim().toLowerCase();\n  return products.filter(\n    product =>\n      product.price <= maxPrice &&\n      product.name.toLowerCase().includes(normalized)\n  );\n}\n// api.js validates responses; store.js owns state; view.js renders text;\n// main.js wires them together and returns a destroy function.',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
          kind: "module",
          requires: "Multi-file browser/Vite ES modules; serve over localhost",
          note: "",
        },
      ],
      checkpoint:
        "Refactor one event handler into domain, API, state, and view responsibilities without changing behavior.",
      specialization: false,
    },
    {
      number: 23,
      name: "Automated Testing",
      level: 7,
      topics: [
        "Why testing matters",
        "Unit testing",
        "Integration testing",
        "End-to-end (E2E) testing",
        "Test assertions",
        "Test structure: Arrange, Act, Assert",
        "Test doubles: mocks, stubs, spies",
        "Testing asynchronous code",
        "Testing DOM interactions",
        "Testing browser events",
        "Testing API requests",
        "Test isolation",
        "Code coverage",
        "Test-driven development (TDD)",
        "Regression testing",
      ],
      lessons: [
        {
          name: "Test contracts at the narrowest useful boundary",
          explanation:
            "A unit test checks a focused behavior, an integration test checks collaborating pieces, and an end-to-end test drives a real application. Arrange inputs, act, then assert observable outcomes. A regression test captures a real failure mode; test-driven development uses an initially failing test to guide an implementation. Coverage can reveal unvisited code but cannot prove useful assertions or correct requirements.\n\nUse stubs for controlled replies, spies to observe calls, and mocks when interaction itself is the contract. Isolate state between tests, await asynchronous work, and test rejection paths. Test DOM events and network boundaries at an appropriate layer rather than replacing every dependency with a mock.",
          files: [
            {
              name: "price.js",
              code: 'export function discount(price, rate) {\n  if (\n    !Number.isFinite(price) ||\n    price < 0 ||\n    rate < 0 ||\n    rate > 1 ||\n    !Number.isFinite(rate)\n  )\n    throw new RangeError("Invalid discount input");\n  return price * (1 - rate);\n}',
              language: "js",
            },
            {
              name: "price.test.js",
              code: 'import { expect, test } from "vitest";\nimport { discount } from "./price.js";\ntest("discounts without changing the input value", () => {\n  const price = 100; // Arrange.\n  const result = discount(price, 0.2); // Act.\n  expect(result).toBe(80);\n  expect(price).toBe(100); // Assert.\n});\ntest("rejects an invalid rate", () => {\n  expect(() => discount(100, 2)).toThrow(RangeError);\n});',
              language: "js",
            },
          ],
          source: "https://vitest.dev/guide/",
          kind: "test",
          requires: "Vitest 4; run npx vitest run in this fixture directory",
          note: "",
        },
      ],
      checkpoint:
        "Add a regression test for an invalid input and an asynchronous rejection, with isolated state.",
      specialization: false,
    },
    {
      number: 24,
      name: "Testing Tools",
      level: 7,
      topics: [
        "Vitest",
        "Jest",
        "Playwright",
        "Browser-based DOM testing",
        "Mock Service Worker (MSW)",
        "Automated testing in CI",
      ],
      lessons: [
        {
          name: "Choose tools by the environment being tested",
          explanation:
            "Vitest integrates naturally with Vite-style modules; Jest provides another mature test runner with its own configuration and mocking behavior. Do not mix their setup instructions without checking compatibility. A simulated DOM is useful for focused unit tests, while a real browser is needed for layout, focus, rendering, and platform integration.\n\nPlaywright drives browsers and offers retrying assertions. MSW intercepts network requests at the network layer so tests exercise the Fetch-using adapter rather than replacing its internals. The example is explicitly pinned to MSW 2’s import convention; newer major versions may change setup. Run the same tests in CI with isolated fixtures, restored handlers, and no dependence on a public API being online.",
          files: [
            {
              name: "api.test.js",
              code: 'import { afterAll, afterEach, beforeAll, expect, test } from "vitest";\nimport { http, HttpResponse } from "msw";\nimport { setupServer } from "msw/node";\nconst server = setupServer(\n  http.get("https://api.example.test/products", () =>\n    HttpResponse.json({ items: [] })\n  )\n);\nbeforeAll(() => server.listen({ onUnhandledRequest: "error" }));\nafterEach(() => server.resetHandlers());\nafterAll(() => server.close());\ntest("handles an empty catalog response", async () => {\n  const response = await fetch("https://api.example.test/products");\n  expect(response.ok).toBe(true);\n  expect(await response.json()).toEqual({ items: [] });\n});',
              language: "js",
            },
            {
              name: "commands.sh",
              code: "# This fixture uses the MSW 2 API, not an unspecified latest major.\nnpm install --save-dev vitest@4 msw@2\nnpx vitest run",
              language: "shell",
            },
          ],
          source: "https://mswjs.io/docs/getting-started",
          kind: "test",
          requires:
            "Node test fixture; Vitest 4 + MSW 2; this tests HTTP interception rather than a real backend",
          note: "",
        },
        {
          name: "Browser tests exercise keyboard and real component state",
          explanation:
            "An end-to-end test should assert state and behavior rather than sleep for an assumed duration. Use accessible locators when possible and supply deterministic data. Test keyboard interaction, focus return, errors, and cleanup alongside the ordinary mouse path.\n\nThe fixture below targets the dialog example in Chapter 28 served locally. Browser tests cannot replace a screen-reader review, but they can protect focus and accessible-name contracts. Keep tests isolated and include representative browsers and viewport sizes in CI. Visual checks should wait for fonts/assets and use stable animation states.",
          files: [
            {
              name: "dialog.spec.js",
              code: 'import { test, expect } from "@playwright/test";\ntest("dialog closes with Escape and restores focus", async ({ page }) => {\n  await page.goto("http://localhost:4173/dialog.html");\n  const open = page.getByRole("button", {\n    name: "Open details",\n    exact: true\n  });\n  await open.click();\n  await expect(page.getByRole("dialog", { name: "Details" })).toBeVisible();\n  await page.keyboard.press("Escape");\n  await expect(page.getByRole("dialog")).toBeHidden();\n  await expect(open).toBeFocused();\n});',
              language: "js",
            },
          ],
          source: "https://playwright.dev/docs/writing-tests",
          kind: "test",
          requires:
            "Playwright Test + installed browsers; serve Chapter 28 dialog as localhost:4173/dialog.html",
          note: "",
        },
      ],
      checkpoint:
        "Run a real-browser focus test and compare it with a unit-level mock of the same boundary.",
      specialization: false,
    },
    {
      number: 25,
      name: "Debugging",
      level: 7,
      topics: [
        "Chrome and Firefox DevTools",
        "Breakpoints",
        "Conditional breakpoints",
        "Call stack inspection",
        "Watch expressions",
        "Debugging asynchronous code",
        "Network debugging",
        "Performance profiling",
        "Memory profiling",
        "Source maps",
        "Diagnosing event listener leaks",
      ],
      lessons: [
        {
          name: "Debug evidence before editing the code",
          explanation:
            "Use Chrome or Firefox DevTools to pause at a meaningful boundary. A conditional breakpoint isolates the failing input; watch expressions inspect values without adding logging everywhere. Read the stack, async stack, and Network request details together to distinguish state bugs, stale requests, bad data, and backend errors.\n\nSource maps connect bundled output to source. The Performance panel explains long tasks and rendering work; heap snapshots and allocation tools expose retained objects. For listener leaks, reproduce mount/destroy several times and inspect retainers, not just one rising memory graph. Capture a small reproducible case and change one assumption at a time.",
          files: [
            {
              name: "debugging-checklist.txt",
              code: "1. Write the smallest input and action sequence that reproduces the failure.\n2. Pause at the boundary; inspect current state, arguments, and call stack.\n3. For async issues, inspect request timing, cancellation, response shape, and commit identity.\n4. For slowness, record a Performance trace on a representative device.\n5. For leaks, repeat mount/destroy and compare heap snapshots and retaining paths.\n6. Fix the cause, add a regression assertion, and verify the original reproduction.",
              language: "text",
            },
          ],
          source: "https://developer.chrome.com/docs/devtools/javascript/",
          kind: "integration",
          requires:
            "Chrome or Firefox DevTools; a reproducible application or example",
          note: "",
        },
      ],
      checkpoint:
        "Reproduce a bug with a breakpoint, then collect the trace or retaining path needed to explain its cause.",
      specialization: false,
    },
    {
      number: 26,
      name: "JavaScript Performance",
      level: 8,
      topics: [
        "Critical rendering path",
        "Reflow/layout and repaint",
        "DOM manipulation costs",
        "Layout thrashing",
        "Debouncing",
        "Throttling",
        "Memoization",
        "Lazy loading",
        "Code splitting",
        "Memory leaks",
        "Garbage collection behavior",
        "Long tasks",
        "Main thread blocking",
        "Web Workers",
        "Performance API",
        "Browser Performance panel",
        "Core Web Vitals",
        "Rendering and animation optimization",
      ],
      lessons: [
        {
          name: "Measure main-thread and rendering costs",
          explanation:
            "The critical rendering path includes fetching/parsing resources and preparing the first useful rendering. Layout determines geometry; paint produces pixels; compositing combines layers. Repeatedly reading geometry after style writes can force synchronous layout. Batch reads before writes, avoid rebuilding large DOM trees unnecessarily, and animate a smaller scene when appropriate.\n\nLong tasks delay input and rendering. Use the Performance API and browser traces to find the real cost before micro-optimizing. Core Web Vitals currently include LCP for loading, INP for responsiveness, and CLS for visual stability; lab and field measurements serve different purposes. Lazy loading and dynamic imports can reduce initial work, while workers move suitable computation off the main thread rather than making it disappear.",
          files: [
            {
              name: "index.html",
              code: '<button id="measure" type="button">Measure data processing</button\n><output id="timing"></output>\n<script type="module">\n  document.querySelector("#measure").onclick = () => {\n    performance.mark("catalog:start");\n    const values = Array.from({ length: 1000 }, (_, index) => index);\n    const total = values\n      .filter(value => value % 2 === 0)\n      .reduce((sum, value) => sum + value, 0);\n    performance.mark("catalog:end");\n    const measure = performance.measure(\n      "catalog:process",\n      "catalog:start",\n      "catalog:end"\n    );\n    document.querySelector("#timing").textContent =\n      `${total}; ${measure.duration.toFixed(2)} ms`;\n    performance.clearMarks("catalog:start");\n    performance.clearMarks("catalog:end");\n    performance.clearMeasures("catalog:process");\n  };\n</script>',
              language: "html",
            },
          ],
          source: "https://web.dev/articles/vitals",
          kind: "browser",
          requires:
            "Browser; serve the independent HTML example over localhost",
          note: "",
        },
        {
          name: "Debounce, throttle, and cache with explicit limits",
          explanation:
            "Debounce waits for a quiet period, useful for search. Throttle limits call frequency, useful for repeated updates. Both need a documented leading/trailing policy and cleanup. Memoization caches a function’s result by input; it can retain memory or return stale data if inputs are mutable or a key omits important context.\n\nA cache should define key, scope, freshness, size, and invalidation. Do not cache user-specific data under a global query-only key. Garbage collection cannot reclaim entries that remain strongly reachable through an unbounded cache. The debounce below exposes cancel for component teardown; the throttle is explicitly leading-only.",
          files: [
            {
              name: "rate-limit.mjs",
              code: 'export function debounce(fn, delay) {\n  let timer;\n  function wrapped(...args) {\n    const receiver = this;\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(receiver, args), delay);\n  }\n  wrapped.cancel = () => clearTimeout(timer);\n  return wrapped;\n}\nexport function throttle(fn, delay) {\n  let last = -Infinity;\n  return function (...args) {\n    const now = performance.now();\n    if (now - last >= delay) {\n      last = now;\n      return fn.apply(this, args);\n    }\n  };\n}\n// A bounded cache example: evict the oldest key before exceeding a size limit.\nexport function putBounded(cache, key, value, limit = 20) {\n  if (!Number.isInteger(limit) || limit < 1)\n    throw new RangeError("Positive limit required");\n  cache.delete(key);\n  cache.set(key, value);\n  while (cache.size > limit) cache.delete(cache.keys().next().value);\n}',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Performance",
          kind: "module",
          requires: "Multi-file browser/Vite ES modules; serve over localhost",
          note: "",
        },
      ],
      checkpoint:
        "Measure a representative operation, bound a cache, and identify a rendering or input-latency bottleneck.",
      specialization: false,
    },
    {
      number: 27,
      name: "Security",
      level: 8,
      topics: [
        "Cross-Site Scripting (XSS)",
        "HTML sanitization",
        "Content Security Policy (CSP)",
        "Cross-Site Request Forgery (CSRF)",
        "CORS and Same-Origin Policy",
        "Safe DOM manipulation",
        "Secure API communication",
        "Authentication vs authorization",
        "Token storage considerations",
        "Dependency security",
        "Prototype pollution",
      ],
      lessons: [
        {
          name: "Keep data out of executable HTML",
          explanation:
            "XSS occurs when attacker-controlled input is interpreted as executable content. textContent is appropriate for plain text; innerHTML is not a general rendering API for untrusted input. If rich HTML is required, use a maintained sanitizer with a policy appropriate to your output context. A regex replacement is not an HTML sanitizer. Validate URL schemes before assigning untrusted navigation targets.\n\nCSP can restrict script execution and resource origins, but does not replace safe rendering. Prefer a deployed header policy with reviewed nonce/hash handling rather than copying a universal inline-script exception. The example treats markup-like input as a literal string. Client-side validation is not a substitute for server-side authorization or output handling.",
          files: [
            {
              name: "index.html",
              code: '<label\n  >Preview text <input id="text" value="&lt;b&gt;Book&lt;/b&gt;"\n/></label>\n<p id="preview"></p>\n<script type="module">\n  const input = document.querySelector("#text");\n  const preview = document.querySelector("#preview");\n  const update = () => {\n    preview.textContent = input.value;\n  };\n  input.addEventListener("input", update);\n  update();\n  function safeNavigation(raw) {\n    const url = new URL(raw, location.href);\n    if (!["http:", "https:"].includes(url.protocol))\n      throw new TypeError("Unsupported navigation protocol");\n    return url.href;\n  }\n  console.log(safeNavigation("/catalog"));\n</script>',
              language: "html",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS",
          kind: "browser",
          requires:
            "Browser; serve the independent HTML example over localhost",
          note: "",
        },
        {
          name: "Security boundaries extend beyond rendering",
          explanation:
            "Authentication establishes identity; authorization must be enforced by the server for each operation. Same-origin policy and CORS restrict browser interactions but do not provide authorization. Cookie-authenticated mutations may require CSRF protection such as server-validated tokens and appropriate SameSite policies. HTTPS protects transport; it does not make every response trustworthy.\n\nToken storage has tradeoffs: JavaScript-readable tokens are exposed to successful XSS, while HttpOnly cookies need a CSRF-aware server design. Keep secrets out of client bundles. Review dependencies, lockfile changes, and security updates. Prototype pollution can arise from merging attacker-controlled keys into ordinary objects; prefer explicit allowed fields, null-prototype records, or Map where appropriate.",
          files: [
            {
              name: "example.mjs",
              code: 'function readPreferences(input) {\n  if (!input || typeof input !== "object" || Array.isArray(input))\n    throw new TypeError("Object required");\n  const result = Object.create(null);\n  if (\n    Object.hasOwn(input, "theme") &&\n    ["light", "dark"].includes(input.theme)\n  )\n    result.theme = input.theme;\n  if (\n    Object.hasOwn(input, "pageSize") &&\n    Number.isInteger(input.pageSize) &&\n    input.pageSize >= 1 &&\n    input.pageSize <= 100\n  )\n    result.pageSize = input.pageSize;\n  return result;\n}\nconst input = JSON.parse(\'{"theme":"dark","__proto__":{"polluted":true}}\');\nconst preferences = readPreferences(input);\nconsole.log(\n  preferences.theme,\n  Object.getPrototypeOf(preferences),\n  {}.polluted\n); // dark, null, undefined',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/Prototype_pollution",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
      ],
      checkpoint:
        "Render hostile-looking text literally and reject unapproved configuration keys without a broad merge.",
      specialization: false,
    },
    {
      number: 28,
      name: "Accessibility with JavaScript",
      level: 8,
      topics: [
        "Semantic HTML before ARIA",
        "Keyboard navigation",
        "Focus management",
        "Accessible dialogs",
        "Screen reader announcements",
        "ARIA states and properties",
        "Dynamic content accessibility",
        "Accessible validation",
        "Motion accessibility",
        "Testing with accessibility tools",
      ],
      lessons: [
        {
          name: "Semantic controls and focus are part of component state",
          explanation:
            "Use native buttons, links, inputs, and dialogs before recreating them with ARIA. ARIA describes semantics and state; it does not add keyboard behavior. Keep aria-expanded/selected/invalid synchronized with actual visibility and interaction. Screen-reader announcements should be concise and purposeful, not a running log of every animation frame.\n\nAn accessible dialog needs a name, focus entry, contained modal interaction, Escape handling, and focus restoration. Native dialog provides much of that foundation. The example uses it directly and returns focus to the opener. Dynamic content and validation still need appropriate labels and message relationships, and motion must have a usable reduced-motion path.",
          files: [
            {
              name: "index.html",
              code: '<button id="open" type="button">Open details</button>\n<dialog aria-labelledby="dialog-title">\n  <h2 id="dialog-title">Details</h2>\n  <p>Use Tab and Escape to explore.</p>\n  <form method="dialog"><button autofocus>Close</button></form>\n</dialog>\n<script type="module">\n  const opener = document.querySelector("#open");\n  const dialog = document.querySelector("dialog");\n  opener.addEventListener("click", () => dialog.showModal());\n  dialog.addEventListener("close", () => opener.focus());\n</script>',
              language: "html",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement",
          kind: "browser",
          requires:
            "Browser; serve the independent HTML example over localhost",
          note: "",
        },
        {
          name: "Test accessibility as interaction, not just a score",
          explanation:
            "Automated tools can find missing names, invalid relationships, and many contrast problems, but cannot prove that a workflow makes sense. Test keyboard order, focus movement, visible focus, zoom/reflow, errors, and reduced motion manually alongside automated checks. Review representative screen-reader behavior when building complex widgets.\n\nKeep meaningful content available when script or motion fails. For a disclosure, logical open state controls hidden and aria-expanded; a decorative transition must not become the only signal. For forms, associate errors with controls and focus an appropriate summary or invalid field. Add regression tests for the interactions you fixed rather than only chasing a tool’s numeric score.",
          files: [
            {
              name: "accessibility-checklist.txt",
              code: "1. Use every action with keyboard alone; confirm visible focus and a sensible order.\n2. Open/close overlays; verify focus entry, Escape, background interaction, and focus return.\n3. Trigger validation errors; check labels, descriptions, and understandable announcements.\n4. Check zoom, narrow layouts, touch targets, and no horizontal content loss.\n5. Enable reduced motion; essential information and actions must remain available.\n6. Run an accessibility scanner, then review the workflow with assistive technology.\n7. Automate the behavioral contracts that should not regress.",
              language: "text",
            },
          ],
          source: "https://www.w3.org/WAI/ARIA/apg/",
          kind: "integration",
          requires:
            "A real browser and representative assistive-technology testing; checklist, not an automated certification",
          note: "",
        },
      ],
      checkpoint:
        "Complete a dialog and form workflow with keyboard alone, including focus return and clear errors.",
      specialization: false,
    },
    {
      number: 29,
      name: "JavaScript Execution Model",
      level: 9,
      topics: [
        "Execution contexts",
        "Lexical environments",
        "Variable environments",
        "Call stack behavior",
        "Hoisting internals",
        "Closures under the hood",
        "Event loop internals",
        "Tasks and microtasks",
        "Run-to-completion behavior",
        "JavaScript engine optimization concepts",
      ],
      lessons: [
        {
          name: "Execution contexts are a reasoning model, not a source-code rewrite",
          explanation:
            "A running execution context tracks evaluation state and environment relationships. Lexical environments resolve names through outer environments; variable environments participate in declaration handling. Binding creation and initialization explain hoisting and the TDZ more accurately than imagining lines being moved. Closures retain access to the environments they use.\n\nWithin one agent, each job runs to completion before another job executes. The host integrates tasks, microtasks, rendering, and I/O; Node’s event-loop phases are not identical to the browser’s model. Engines optimize execution with techniques such as specialization and compiled code, but the observable language semantics must remain intact. Measure real workloads rather than writing code around guessed engine internals.",
          files: [
            {
              name: "example.mjs",
              code: 'let value = "outer";\nfunction makeReader() {\n  const local = "captured";\n  return () => `${local}:${value}`;\n}\nconst read = makeReader();\nPromise.resolve().then(() => console.log("microtask", read()));\nvalue = "updated";\nconsole.log("sync", read());\n// sync captured:updated, then microtask captured:updated.\n// The closure observes the binding\'s current value, not an old snapshot.',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
      ],
      checkpoint:
        "Explain an execution-order puzzle using environments and jobs rather than imagined source-code movement.",
      specialization: false,
    },
    {
      number: 30,
      name: "Prototypes and Object Internals",
      level: 9,
      topics: [
        "Prototype chain",
        "Property lookup",
        "`Object.create()`",
        "`Object.getPrototypeOf()`",
        "`Object.setPrototypeOf()`",
        "Property descriptors",
        "Enumerable and non-enumerable properties",
        "Object extensibility",
        "Symbols",
        "`Proxy`",
        "`Reflect`",
        "Metaprogramming",
      ],
      lessons: [
        {
          name: "Descriptors and lookup distinguish own from inherited state",
          explanation:
            "Property lookup checks own properties, then prototypes. Object.create selects a prototype directly, getPrototypeOf inspects it, and setPrototypeOf changes it; frequent prototype mutation can harm clarity and optimization, so construct the intended shape up front. Descriptors define data/accessor behavior and enumerability. Object.keys excludes inherited, non-enumerable, and symbol keys; Reflect.ownKeys includes all own keys.\n\nAn object’s extensibility controls whether new properties can be added. Symbols provide unique property keys and protocol hooks, not universal privacy. Use Object.hasOwn for an ownership question rather than trusting an object’s possibly overwritten hasOwnProperty method.",
          files: [
            {
              name: "example.mjs",
              code: 'const base = { kind: "product" };\nconst item = Object.create(base);\nObject.defineProperty(item, "id", { value: "p1", enumerable: false });\nitem.name = "Book";\nconst tag = Symbol("tag");\nitem[tag] = "metadata";\nconsole.log(item.kind, Object.hasOwn(item, "kind")); // product, false\nconsole.log(Object.keys(item), Reflect.ownKeys(item));\nconsole.log(Object.getPrototypeOf(item) === base); // true\nObject.preventExtensions(item);\nconsole.log(Object.isExtensible(item)); // false',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
        {
          name: "Proxy and Reflect intercept operations without replacing invariants",
          explanation:
            "A Proxy intercepts operations such as property reads/writes; Reflect exposes the corresponding default operations and helps preserve receiver semantics. They are useful for validation, instrumentation, or virtual interfaces, but a proxy must respect language invariants, especially for non-configurable properties. Private fields and built-in internal slots can also make naive forwarding fail.\n\nMetaprogramming should make an explicit abstraction easier to use, not hide arbitrary work behind every property access. The example validates one assignment and forwards everything else with Reflect. It does not claim that wrapping any object creates a complete reactive system or security boundary.",
          files: [
            {
              name: "example.mjs",
              code: 'const target = { count: 0 };\nconst counter = new Proxy(target, {\n  set(object, key, value, receiver) {\n    if (key === "count" && (!Number.isInteger(value) || value < 0))\n      throw new RangeError("Invalid count");\n    return Reflect.set(object, key, value, receiver);\n  },\n  get(object, key, receiver) {\n    return Reflect.get(object, key, receiver);\n  }\n});\ncounter.count = 2;\nconsole.log(counter.count, target.count); // 2, 2\ntry {\n  counter.count = -1;\n} catch (error) {\n  console.log(error.name);\n}',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
      ],
      checkpoint:
        "Inspect own/inherited/symbol properties and explain what a Proxy must preserve.",
      specialization: false,
    },
    {
      number: 31,
      name: "Iteration and Advanced Data Structures",
      level: 9,
      topics: [
        "Iteration protocols",
        "Iterables vs iterators",
        "Custom iterators",
        "Generator functions",
        "`yield` and `yield*`",
        "Async generators",
        "`Map` and `Set` internals",
        "Typed Arrays",
        "`ArrayBuffer`",
        "`DataView`",
        "Binary data processing",
      ],
      lessons: [
        {
          name: "Iterables supply iterators; generators simplify the protocol",
          explanation:
            "An iterable exposes Symbol.iterator, which returns an iterator with next. Each result has done and optionally value. An iterator is not automatically iterable unless it also provides that protocol. Generator functions create iterator objects and pause at yield; yield* delegates to another iterable.\n\nAsync generators combine suspension with asynchronous values and are consumed with for await...of. A stream of pages can avoid building one huge array, but you still need cancellation and error handling at the external I/O boundary. Map/Set specify ordering and key behavior; their exact internal representation is engine-specific, so do not claim a particular hash-table implementation as a language guarantee.",
          files: [
            {
              name: "example.mjs",
              code: 'function* range(start, end) {\n  for (let value = start; value < end; value++) yield value;\n}\nfunction* combined() {\n  yield "start";\n  yield* range(1, 4);\n}\nconsole.log([...combined()]); // ["start", 1, 2, 3]\nconst iterable = {\n  [Symbol.iterator]() {\n    let value = 0;\n    return {\n      next: () =>\n        value < 2 ? { value: value++, done: false } : { done: true }\n    };\n  }\n};\nconsole.log([...iterable]); // [0, 1]\nasync function* batches() {\n  yield await Promise.resolve([1, 2]);\n  yield [3];\n}\nfor await (const batch of batches()) console.log(batch);',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
        {
          name: "Binary data separates storage from interpretation",
          explanation:
            "ArrayBuffer owns raw bytes. Typed arrays interpret a view of those bytes as a particular numeric type; several views can share the same buffer. DataView reads/writes individual values with explicit endianness, useful for network/file formats whose layout is not the platform’s natural layout.\n\nCheck byte lengths and offsets before parsing external binary data. A typed array is not an ordinary Array, and converting a view is different from copying or transferring its buffer. Transferring an ArrayBuffer to a worker detaches the original storage; shared storage uses a different concurrency contract.",
          files: [
            {
              name: "example.mjs",
              code: "const buffer = new ArrayBuffer(4);\nconst view = new DataView(buffer);\nview.setUint16(0, 0x1234, true); // Little-endian.\nview.setUint16(2, 0x5678, false); // Big-endian.\nconsole.log([...new Uint8Array(buffer)]); // [52, 18, 86, 120]\nconsole.log(view.getUint16(0, true)); // 4660\nconst copy = new Uint8Array(buffer).slice();\ncopy[0] = 0;\nconsole.log(new Uint8Array(buffer)[0]); // 52; slice made a copy.",
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Typed_arrays",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
      ],
      checkpoint:
        "Implement an iterable and decode a binary field with a stated endianness and bounds policy.",
      specialization: false,
    },
    {
      number: 32,
      name: "Memory Management",
      level: 9,
      topics: [
        "Stack vs heap (conceptual distinction)",
        "Object lifetime",
        "Garbage collection",
        "Reachability",
        "Strong and weak references",
        "`WeakMap` and `WeakSet`",
        "Memory leaks",
        "Detached DOM nodes",
        "Retained event listeners",
        "Memory profiling",
        "Finalization and resource cleanup concepts",
      ],
      lessons: [
        {
          name: "Reachability determines lifetime; cleanup determines correctness",
          explanation:
            "Stack versus heap is a useful conceptual distinction, not a promise about the physical location of every JavaScript value. Garbage collection reclaims unreachable storage according to implementation decisions. A detached DOM node is still retained if a live closure, listener registry, or array keeps a path to it. Strong references retain objects; weak collection membership does not do so by itself.\n\nWeakRef and FinalizationRegistry do not provide deterministic resource cleanup. Do not wait for a finalizer to remove a listener, close a socket, abort a request, or release a rendering loop. Use explicit destroy/finally contracts. Compare heap snapshots and retaining paths after repeated mount/destroy to diagnose leaks rather than assuming a temporary memory rise is proof.",
          files: [
            {
              name: "index.html",
              code: '<section id="feature"><button type="button">Action</button></section>\n<button id="destroy" type="button">Destroy feature</button>\n<script type="module">\n  function mount(root) {\n    const owner = new AbortController();\n    const update = () => {\n      root.dataset.width = String(innerWidth);\n    };\n    window.addEventListener("resize", update, { signal: owner.signal });\n    const timer = setInterval(() => {\n      root.dataset.alive = "true";\n    }, 1000);\n    return () => {\n      owner.abort();\n      clearInterval(timer);\n      root.remove();\n    };\n  }\n  const destroy = mount(document.querySelector("#feature"));\n  document\n    .querySelector("#destroy")\n    .addEventListener("click", destroy, { once: true });\n</script>',
              language: "html",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management",
          kind: "browser",
          requires:
            "Browser; serve the independent HTML example over localhost",
          note: "",
        },
      ],
      checkpoint:
        "Find the retaining path for a detached node and replace finalizer-dependent work with explicit cleanup.",
      specialization: false,
    },
    {
      number: 33,
      name: "Concurrency and Parallelism",
      level: 9,
      topics: [
        "Concurrency vs parallelism",
        "Event loop scheduling",
        "Web Workers",
        "Worker communication",
        "Structured cloning",
        "Transferable objects",
        "SharedArrayBuffer",
        "Atomics",
        "Race conditions",
        "Coordinating asynchronous tasks",
      ],
      lessons: [
        {
          name: "Workers provide parallel execution through messages",
          explanation:
            "Concurrency means several operations are in progress; parallelism means some actually execute at the same time. A worker has its own JavaScript environment and no DOM access. postMessage normally uses structured cloning, so functions and DOM nodes cannot simply be sent. Transfer a buffer when ownership should move rather than copy; the sender’s buffer becomes detached.\n\nWorkers have startup and communication costs, so measure whether the computation justifies them. Attach handlers before sending work, validate message shapes, handle errors, and terminate a short-lived worker when done. A worker does not remove the need to coordinate request identities or canceled UI state.",
          files: [
            {
              name: "index.html",
              code: '<button id="run" type="button">Compute in worker</button\n><output id="result"></output>\n<script type="module" src="./main.js"></script>',
              language: "html",
            },
            {
              name: "main.js",
              code: 'let worker;\ndocument.querySelector("#run").onclick = () => {\n  worker?.terminate();\n  worker = new Worker(new URL("./worker.js", import.meta.url), {\n    type: "module"\n  });\n  const current = worker;\n  current.onmessage = event => {\n    if (current !== worker) return;\n    document.querySelector("#result").textContent =\n      `Total: ${event.data.total}`;\n    current.terminate();\n    worker = null;\n  };\n  current.onerror = () => {\n    if (current === worker) {\n      document.querySelector("#result").textContent = "Worker failed";\n      current.terminate();\n      worker = null;\n    }\n  };\n  const values = new Uint32Array([2, 3, 5]);\n  current.postMessage({ buffer: values.buffer }, [values.buffer]);\n  console.log(values.buffer.byteLength); // 0: transferred ownership.\n};\n// Component teardown: worker?.terminate(); remove the owned click handler.',
              language: "js",
            },
            {
              name: "worker.js",
              code: "self.onmessage = event => {\n  const values = new Uint32Array(event.data.buffer);\n  const total = values.reduce((sum, value) => sum + value, 0);\n  self.postMessage({ total });\n};",
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers",
          kind: "browser",
          requires:
            "Three files served from one same-origin localhost directory; module-worker support",
          note: "",
        },
        {
          name: "Shared memory requires isolation and an atomic protocol",
          explanation:
            "SharedArrayBuffer permits several agents to access the same bytes. In browsers, sharing normally requires a secure context and cross-origin isolation configured through response headers. Feature-detect both availability and crossOriginIsolated; ordinary ArrayBuffer messages are often simpler.\n\nAtomics provides synchronized operations on supported shared typed arrays. It does not automatically make a sequence of separate operations one transaction. Race conditions appear when correctness depends on an uncontrolled interleaving. Do not block the browser main thread with Atomics.wait. The example shows one atomic counter operation under a capability guard; a real shared-memory design must document its protocol and test contention.",
          files: [
            {
              name: "index.html",
              code: '<output id="shared"></output>\n<script type="module">\n  const output = document.querySelector("#shared");\n  if (crossOriginIsolated && typeof SharedArrayBuffer === "function") {\n    const buffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT);\n    const counter = new Int32Array(buffer);\n    Atomics.add(counter, 0, 1);\n    output.textContent = `Atomic count: ${Atomics.load(counter, 0)}`;\n    // Pass the shared buffer to a worker without a transfer list.\n  } else {\n    output.textContent =\n      "Use ordinary worker messages; shared memory is unavailable here.";\n  }\n</script>',
              language: "html",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer",
          kind: "browser",
          requires:
            "Browser; serve the independent HTML example over localhost",
          note: "Shared memory is an advanced specialization requiring an isolation policy; this page also demonstrates the non-isolated fallback.",
        },
      ],
      checkpoint:
        "Transfer a buffer to a worker and explain why shared memory requires a different race protocol.",
      specialization: false,
    },
    {
      number: 34,
      name: "Advanced Browser Architecture",
      level: 10,
      topics: [
        "Client-side routing",
        "SPA architecture",
        "Browser rendering lifecycle",
        "State synchronization",
        "Web Components architecture",
        "Service Workers",
        "Offline-first applications",
        "IndexedDB",
        "Cache API",
        "Progressive Web Apps (PWA)",
        "Complex UI state management",
      ],
      lessons: [
        {
          name: "Routing and state synchronization need a single owner",
          explanation:
            "A SPA updates views without a full document navigation. A router maps a URL to view state and coordinates history, loading, cleanup, and focus. Hash routing is a useful small starting point; path routing with pushState also needs a server fallback for direct requests and a popstate handler for traversal.\n\nSeparate route state, persistent domain state, and temporary component state. Cancel or ignore old loads when the route changes. Web Components can form the view boundary, but their lifecycle still needs explicit resource ownership. Do not make animation completion the only way a route can become usable. This minimal router uses real links and a live heading, and it returns a cleanup function.",
          files: [
            {
              name: "index.html",
              code: '<nav aria-label="Views">\n  <a href="#tasks">Tasks</a> <a href="#settings">Settings</a>\n</nav>\n<main id="view"></main>\n<script type="module">\n  function mountRouter(root) {\n    const routes = new Map([\n      ["tasks", "Task manager"],\n      ["settings", "Settings"]\n    ]);\n    function render() {\n      const route = location.hash.slice(1) || "tasks";\n      const heading = document.createElement("h1");\n      heading.textContent = routes.get(route) ?? "Page not found";\n      heading.tabIndex = -1;\n      root.replaceChildren(heading);\n      document.title = heading.textContent;\n      heading.focus();\n    }\n    window.addEventListener("hashchange", render);\n    render();\n    return () => window.removeEventListener("hashchange", render);\n  }\n  const destroy = mountRouter(document.querySelector("#view"));\n  // Call destroy before replacing this application shell.\n</script>',
              language: "html",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/History_API",
          kind: "browser",
          requires:
            "Browser; serve the independent HTML example over localhost",
          note: "",
        },
        {
          name: "IndexedDB is transactional storage, not a synchronous object",
          explanation:
            "IndexedDB stores structured values through asynchronous requests and transactions. Version upgrades create or change stores; existing open connections can block an upgrade, so respond to versionchange by closing old connections. Request success alone is not a guarantee that a write transaction has committed.\n\nChoose a schema and handle errors, quota/storage availability, and account/data boundaries. Persistent storage may be cleared, so plan a useful empty/error state. The example writes one small record and waits for transaction completion before showing success. It does not promise cross-device synchronization or a backend conflict-resolution strategy.",
          files: [
            {
              name: "index.html",
              code: '<button id="save" type="button">Save draft locally</button\n><output id="status"></output>\n<script type="module">\n  function openDatabase() {\n    return new Promise((resolve, reject) => {\n      const request = indexedDB.open("js-study", 1);\n      request.onupgradeneeded = () => {\n        if (!request.result.objectStoreNames.contains("drafts"))\n          request.result.createObjectStore("drafts", { keyPath: "id" });\n      };\n      request.onerror = () => reject(request.error);\n      request.onsuccess = () => {\n        const db = request.result;\n        db.onversionchange = () => db.close();\n        resolve(db);\n      };\n    });\n  }\n  function saveDraft(db, value) {\n    return new Promise((resolve, reject) => {\n      const transaction = db.transaction("drafts", "readwrite");\n      transaction.objectStore("drafts").put(value);\n      transaction.oncomplete = () => resolve();\n      transaction.onabort = () =>\n        reject(transaction.error ?? new Error("Transaction aborted"));\n    });\n  }\n  document.querySelector("#save").onclick = async () => {\n    let db;\n    try {\n      db = await openDatabase();\n      await saveDraft(db, { id: "draft-1", title: "Study JavaScript" });\n      document.querySelector("#status").textContent = "Saved locally";\n    } catch {\n      document.querySelector("#status").textContent =\n        "Local storage unavailable";\n    } finally {\n      db?.close();\n    }\n  };\n</script>',
              language: "html",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB",
          kind: "browser",
          requires:
            "Browser; serve the independent HTML example over localhost",
          note: "",
        },
        {
          name: "Offline-first caching must have a narrow, versioned policy",
          explanation:
            "A service worker runs separately from a page and can intercept requests within its scope. Registration requires a secure context such as HTTPS or localhost. The Cache API stores Request/Response pairs; it is not the same as IndexedDB or the browser’s normal HTTP cache. A PWA also needs appropriate app metadata and a useful installed/offline experience, with browser-specific install behavior.\n\nDefine update, cache invalidation, offline fallback, and account boundaries. Do not cache arbitrary authenticated API responses under a shared shell key. This teaching worker caches only this fixture’s public index page and handles only same-directory navigation. It is a small offline shell, not a complete offline-sync or production PWA architecture.",
          files: [
            {
              name: "index.html",
              code: '<h1>Offline study shell</h1>\n<p id="status">Registering local offline shell…</p>\n<script type="module">\n  if ("serviceWorker" in navigator) {\n    try {\n      await navigator.serviceWorker.register("./service-worker.js");\n      await navigator.serviceWorker.ready;\n      document.querySelector("#status").textContent =\n        "Offline shell ready; reload once before testing offline.";\n    } catch {\n      document.querySelector("#status").textContent =\n        "Offline setup unavailable.";\n    }\n  }\n</script>',
              language: "html",
            },
            {
              name: "service-worker.js",
              code: 'const CACHE = "js-study-shell-v1";\nconst INDEX = new URL("./index.html", self.location.href).href;\nconst SCOPE = new URL("./", self.location.href).href;\nself.addEventListener("install", event => {\n  event.waitUntil(caches.open(CACHE).then(cache => cache.add(INDEX)));\n});\nself.addEventListener("activate", event => {\n  event.waitUntil(\n    caches\n      .keys()\n      .then(keys =>\n        Promise.all(\n          keys\n            .filter(key => key.startsWith("js-study-shell-") && key !== CACHE)\n            .map(key => caches.delete(key))\n        )\n      )\n  );\n});\nself.addEventListener("fetch", event => {\n  if (\n    event.request.method !== "GET" ||\n    event.request.mode !== "navigate" ||\n    !event.request.url.startsWith(SCOPE)\n  )\n    return;\n  event.respondWith(\n    fetch(event.request).catch(async () => {\n      const cached = await (await caches.open(CACHE)).match(INDEX);\n      return (\n        cached ??\n        new Response("Offline", {\n          status: 503,\n          headers: { "Content-Type": "text/plain" }\n        })\n      );\n    })\n  );\n});',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers",
          kind: "browser",
          requires:
            "Serve both fixture files from their own localhost/HTTPS directory; registration changes that fixture’s service-worker scope; unregister after experimentation",
          note: "",
        },
      ],
      checkpoint:
        "Navigate a view, save a draft transactionally, and test a deliberately narrow offline fallback.",
      specialization: false,
    },
    {
      number: 35,
      name: "JavaScript Library Development",
      level: 10,
      topics: [
        "Designing public APIs",
        "Extensible configuration systems",
        "Plugin architecture",
        "Versioning and backward compatibility",
        "Package exports",
        "ESM and CommonJS interoperability",
        "TypeScript declarations",
        "Browser support strategies",
        "Publishing npm packages",
        "Documentation",
        "Testing across environments",
        "Performance benchmarking",
      ],
      lessons: [
        {
          name: "A public API is a compatibility promise",
          explanation:
            "A library’s consumers should depend on a small stable entry point, documented options, lifecycle methods, and error behavior. Configuration should distinguish omitted fields from explicit values and reject invalid combinations. A plugin architecture needs an explicit extension contract and cleanup responsibility; it should not let plugins mutate arbitrary private state by accident.\n\nVersioning communicates public changes. Package exports constrain supported entry points; declarations help TypeScript consumers even when the implementation is JavaScript. ESM and CommonJS need actual compatible outputs if both are advertised. Test browser/Node boundaries and support targets; a browser-only component must not pretend that DOM APIs exist in Node.",
          files: [
            {
              name: "src/index.js",
              code: 'export function createFormatter({ locale = "en-US", currency = "USD" } = {}) {\n  const formatter = new Intl.NumberFormat(locale, {\n    style: "currency",\n    currency\n  });\n  return Object.freeze({\n    format(value) {\n      if (!Number.isFinite(value))\n        throw new TypeError("Finite amount required");\n      return formatter.format(value);\n    }\n  });\n}',
              language: "js",
            },
            {
              name: "src/index.d.ts",
              code: "export interface FormatterOptions {\n  locale?: string;\n  currency?: string;\n}\nexport declare function createFormatter(\n  options?: FormatterOptions\n): Readonly<{ format(value: number): string }>;",
              language: "ts",
            },
            {
              name: "package.json",
              code: '{\n  "name": "@your-scope/study-formatter",\n  "version": "0.1.0",\n  "type": "module",\n  "files": ["src"],\n  "exports": {\n    ".": { "types": "./src/index.d.ts", "import": "./src/index.js" }\n  },\n  "types": "./src/index.d.ts"\n}',
              language: "json",
            },
          ],
          source: "https://nodejs.org/api/packages.html",
          kind: "module",
          requires:
            "JavaScript ESM package with a companion .d.ts declaration; package name is a placeholder you must replace",
          note: "This skeleton advertises ESM only. Add and test a real CommonJS build before advertising a require condition.",
        },
        {
          name: "Review the artifact before any release",
          explanation:
            "Documentation should explain setup, a complete usage example, options, lifecycle, support policy, and error behavior. Test the public entry point in a clean consumer rather than only source-relative imports. Benchmark representative work with warm-up and realistic inputs; tiny synthetic timings can be dominated by measurement noise or engine optimization.\n\nInspect npm pack output for missing files, accidental secrets, and unsupported formats. Publish only after choosing the real package name, reviewing the registry artifact, and satisfying your release process. The commands below create a local tarball; they intentionally do not publish anything. Maintain changelogs and upgrade tests for backward compatibility.",
          files: [
            {
              name: "commands.sh",
              code: "# In the library directory, after its tests pass:\nnpm pack --dry-run\nnpm pack\n# Install the generated .tgz in a separate consumer project, then run its checks.\n# Test only the import/require formats and environments actually advertised.\n# Publishing is a separate deliberate release action.",
              language: "shell",
            },
          ],
          source: "https://docs.npmjs.com/cli/commands/npm-pack",
          kind: "integration",
          requires:
            "npm library fixture; local packaging commands only; no registry publication is performed",
          note: "",
        },
      ],
      checkpoint:
        "Inspect the tarball and test a clean consumer using only the formats advertised by exports.",
      specialization: false,
    },
    {
      number: 36,
      name: "Algorithms and Problem Solving",
      level: 10,
      topics: [
        "Time and space complexity",
        "Big O notation",
        "Searching and sorting",
        "Recursion and backtracking",
        "Stacks and queues",
        "Hash maps",
        "Trees",
        "Graphs (fundamentals)",
        "Caching strategies",
        "Data transformation algorithms",
        "Practical problem-solving patterns",
      ],
      lessons: [
        {
          name: "Complexity describes growth, not an exact stopwatch time",
          explanation:
            "Big O describes how resource use grows with input size under a stated model. A scan is O(n), a nested full scan is O(n²), and binary search on sorted data is O(log n). Space complexity includes auxiliary structures and recursion depth. A faster asymptotic method may not be worthwhile for a tiny fixed collection; measure the actual application.\n\nSearching/sorting need explicit ordering and duplicate policies. Hash maps are useful for indexing repeated lookups, but JavaScript does not promise one particular Map representation or a universal constant-time implementation. Prefer readable data transformation and a stable contract before micro-optimizing. This binary search returns a matching index or -1 for a sorted numeric array.",
          files: [
            {
              name: "example.mjs",
              code: 'function binarySearch(sorted, target) {\n  let low = 0;\n  let high = sorted.length - 1;\n  while (low <= high) {\n    const middle = low + Math.floor((high - low) / 2);\n    if (sorted[middle] === target) return middle;\n    if (sorted[middle] < target) low = middle + 1;\n    else high = middle - 1;\n  }\n  return -1;\n}\nconsole.log(binarySearch([2, 4, 7, 9], 7), binarySearch([2, 4, 7, 9], 3)); // 2, -1\nconst indexed = new Map(\n  [\n    { id: "a", value: 2 },\n    { id: "b", value: 4 }\n  ].map(item => [item.id, item])\n);\nconsole.log(indexed.get("b").value); // 4; avoid repeatedly scanning for the same key.',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
        {
          name: "Stacks, queues, trees, graphs, and backtracking",
          explanation:
            "A stack is last-in-first-out; a queue is first-in-first-out. Tree traversal can be recursive or iterative. Graphs may contain cycles, so track visited nodes where repeated traversal is not intended. Backtracking explores choices and undoes them before trying another branch; bound the search space and validate inputs before exploring untrusted structures.\n\nCaching repeats of the same subproblem can help, but its keys and lifetime still need a policy. For breadth-first traversal, use an array with a head index rather than repeatedly shifting the whole queue. The example traverses a small graph and returns each reachable node once, including when the graph contains a cycle.",
          files: [
            {
              name: "example.mjs",
              code: 'function breadthFirst(graph, start) {\n  const queue = [start];\n  const visited = new Set([start]);\n  const result = [];\n  for (let head = 0; head < queue.length; head++) {\n    const node = queue[head];\n    result.push(node);\n    for (const next of graph.get(node) ?? []) {\n      if (!visited.has(next)) {\n        visited.add(next);\n        queue.push(next);\n      }\n    }\n  }\n  return result;\n}\nconst graph = new Map([\n  ["a", ["b", "c"]],\n  ["b", ["a", "d"]],\n  ["c", ["d"]],\n  ["d", []]\n]);\nconsole.log(breadthFirst(graph, "a")); // a, b, c, d\n// Tree depth-first variant: push children onto an explicit stack, or recurse with a depth bound.',
              language: "js",
            },
          ],
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "",
        },
      ],
      checkpoint:
        "Choose a traversal/search strategy, state its assumptions, and test empty input and cycles.",
      specialization: false,
    },
    {
      number: 37,
      name: "Advanced Optional Topics",
      level: 10,
      topics: [
        "JavaScript engine architecture (V8, SpiderMonkey)",
        "JIT compilation and optimizations",
        "Abstract Syntax Trees (AST)",
        "Writing parsers and transforms",
        "Babel plugins",
        "Advanced metaprogramming",
        "Internationalization with `Intl`",
        "TC39 proposals and the standardization process",
        "Resource management and disposal patterns",
        "WebAssembly integration",
        "Node.js runtime fundamentals",
      ],
      lessons: [
        {
          name: "Optional: engines, ASTs, and transforms",
          explanation:
            "V8 and SpiderMonkey implement the language through evolving parsing, interpretation, compilation, optimization, and garbage-collection strategies. JIT specialization can improve hot code and deoptimize when assumptions fail, but guessed engine folklore is a weak basis for application architecture. Use profiles and an explicit engine/version when researching internals.\n\nAn AST represents parsed syntax. Parsers and transforms must preserve semantics, scope, comments/source maps when relevant, and the syntax version they support. Babel plugins visit AST nodes; use parser/traversal APIs rather than editing source with broad regexes. This tiny Babel 7 plugin changes a deliberately named string marker, leaving unrelated strings alone. Test transformed output and behavior before using such a tool on real code.",
          files: [
            {
              name: "plugin.mjs",
              code: 'export default function studyMarkerPlugin() {\n  return {\n    visitor: {\n      StringLiteral(path) {\n        if (path.node.value === "__STUDY_LABEL__")\n          path.node.value = "JavaScript study";\n      }\n    }\n  };\n}',
              language: "js",
            },
            {
              name: "transform.mjs",
              code: 'import { transformSync } from "@babel/core";\nimport plugin from "./plugin.mjs";\nconst output = transformSync(\'const label = "__STUDY_LABEL__";\', {\n  plugins: [plugin],\n  configFile: false,\n  babelrc: false\n});\nconsole.log(output.code);',
              language: "js",
            },
          ],
          source: "https://babeljs.io/docs/plugins",
          kind: "integration",
          requires:
            "Optional authoring-tool fixture; @babel/core 7; run node transform.mjs; not required for ordinary frontend work",
          note: "",
        },
        {
          name: "Optional: internationalization, proposals, and disposal",
          explanation:
            "Intl can handle locale-aware number/date formatting, collation, plural rules, and segmentation; availability depends on the API and runtime data. Keep machine-readable values separate from localized presentation. Metaprogramming through symbols/proxies is useful only when it clarifies a public abstraction.\n\nTC39 proposals progress through stages, including Stage 2.7; Stage 4 indicates a finished language proposal, not immediate support in every deployed browser. Resource-management syntax such as using/await using and disposal protocols needs a target-compatibility review. Deterministic explicit cleanup with try/finally remains a portable pattern; it is unrelated to waiting for garbage collection.",
          files: [
            {
              name: "example.mjs",
              code: 'const names = ["Zoe", "Álvaro", "Ana"];\nconst collator = new Intl.Collator("es", { sensitivity: "base" });\nconsole.log(names.toSorted(collator.compare));\nconst plural = new Intl.PluralRules("en");\nconst label = count =>\n  `${count} ${plural.select(count) === "one" ? "item" : "items"}`;\nconsole.log(label(1), label(2));\nfunction withResource(create, use) {\n  const resource = create();\n  try {\n    return use(resource);\n  } finally {\n    resource.close();\n  }\n}\nwithResource(\n  () => ({ close: () => console.log("closed") }),\n  () => console.log("used")\n);',
              language: "js",
            },
          ],
          source: "https://tc39.es/process-document/",
          kind: "core",
          requires:
            "Independent ES module; modern browser module or Node.js 22+",
          note: "using/await using are discussed as version-sensitive resource-management syntax; the runnable example uses ordinary try/finally.",
        },
        {
          name: "Optional: WebAssembly and Node are different runtime boundaries",
          explanation:
            "WebAssembly runs compiled modules through a JavaScript host interface. It can suit compute-heavy code or an existing compiled codebase, but copying data and crossing the boundary can dominate a small calculation. It does not automatically accelerate DOM work or make native code safe to call with arbitrary assumptions.\n\nNode supplies server/tooling APIs rather than a browser DOM. Learn its module, process, filesystem, event-loop, and I/O contracts separately from browser APIs. This Node example creates and removes a temporary directory in a finally block. A WebAssembly integration requires an actual compiled module and documented imports/exports; do not treat an unspecified .wasm file as a complete example.",
          files: [
            {
              name: "temporary-file.mjs",
              code: 'import { mkdtemp, writeFile, readFile, rm } from "node:fs/promises";\nimport { tmpdir } from "node:os";\nimport { join } from "node:path";\nconst directory = await mkdtemp(join(tmpdir(), "js-study-"));\ntry {\n  const file = join(directory, "note.txt");\n  await writeFile(file, "Study JavaScript", "utf8");\n  console.log(await readFile(file, "utf8"));\n} finally {\n  await rm(directory, { recursive: true, force: true });\n}',
              language: "js",
            },
          ],
          source: "https://nodejs.org/api/fs.html",
          kind: "node",
          requires:
            "Optional Node.js 22+ fixture; creates and removes only its own newly created OS temporary directory",
          note: "",
        },
      ],
      checkpoint:
        "Choose one specialization, define its runtime/version boundary, and keep the ordinary frontend path simple.",
      specialization: true,
    },
  ],
  projects: [
    {
      number: 1,
      name: "Vanilla JavaScript UI Component Library",
      brief:
        "Build tooltips, modals, tabs, accordions, and dropdowns. Focus on DOM manipulation, events, accessibility, classes, configuration, and cleanup.",
      levels: "Levels 2–3, then 5–8",
      steps: [
        "Start with semantic HTML contracts for tooltips, modals, tabs, accordions, and dropdowns; add the carousel from the Level 3 checkpoint after those work.",
        "Use one root and one lifecycle owner per component. Implement configuration, public methods, events/callbacks, and idempotent destroy.",
        "Use the Tooltip starter below as one worked component. Build the other components with their distinct keyboard/focus patterns rather than copying tooltip semantics.",
        "Add unit tests for state and browser tests for focus, rapid input, two simultaneous instances, and destroy/remount.",
      ],
      acceptance: [
        "All components work with keyboard and touch; modal focus is contained and returned; tooltip content is noninteractive, remains visible when hovered, and is dismissed with Escape.",
        "Updates treat user text as text, and disabled/reduced motion does not hide necessary content.",
        "Destroy removes owned DOM/listeners and repeated mounting does not duplicate behavior.",
      ],
      files: [
        {
          name: "Tooltip.js",
          code: 'export class Tooltip {\n  #target;\n  #tip;\n  #owner = new AbortController();\n  #hover = false;\n  #focus = false;\n  #dismissed = false;\n  #destroyed = false;\n  #hideTimer;\n  constructor(target, { text = "" } = {}) {\n    if (!(target instanceof HTMLElement) || typeof text !== "string")\n      throw new TypeError("Element and text required");\n    this.#target = target;\n    this.#tip = document.createElement("div");\n    this.#tip.id = `tip-${crypto.randomUUID()}`;\n    this.#tip.className = "study-tooltip";\n    this.#tip.setAttribute("role", "tooltip");\n    this.#tip.hidden = true;\n    this.#tip.textContent = text;\n    document.body.append(this.#tip);\n    const ids =\n      target.getAttribute("aria-describedby")?.split(/\\s+/).filter(Boolean) ??\n      [];\n    target.setAttribute("aria-describedby", [...ids, this.#tip.id].join(" "));\n    const listen = (name, fn) =>\n      target.addEventListener(name, fn, { signal: this.#owner.signal });\n    listen("pointerenter", () => {\n      this.#hover = true;\n      this.#dismissed = false;\n      this.#sync();\n    });\n    listen("pointerleave", () => {\n      this.#hover = false;\n      this.#deferSync();\n    });\n    listen("focus", () => {\n      this.#focus = true;\n      this.#dismissed = false;\n      this.#sync();\n    });\n    listen("blur", () => {\n      this.#focus = false;\n      this.#sync();\n    });\n    listen("keydown", event => {\n      if (event.key === "Escape") this.hide();\n    });\n    this.#tip.addEventListener(\n      "pointerenter",\n      () => {\n        this.#hover = true;\n        this.#dismissed = false;\n        this.#sync();\n      },\n      { signal: this.#owner.signal }\n    );\n    this.#tip.addEventListener(\n      "pointerleave",\n      () => {\n        this.#hover = false;\n        this.#deferSync();\n      },\n      { signal: this.#owner.signal }\n    );\n    window.addEventListener("resize", () => this.#position(), {\n      signal: this.#owner.signal\n    });\n    window.addEventListener("scroll", () => this.#position(), {\n      capture: true,\n      signal: this.#owner.signal\n    });\n  }\n  #deferSync() {\n    clearTimeout(this.#hideTimer);\n    this.#hideTimer = setTimeout(() => this.#sync(), 100);\n  }\n  #sync() {\n    clearTimeout(this.#hideTimer);\n    if (!this.#dismissed && (this.#hover || this.#focus)) this.show();\n    else this.#tip.hidden = true;\n  }\n  #position() {\n    if (this.#tip.hidden || this.#destroyed) return;\n    const rect = this.#target.getBoundingClientRect();\n    const left = Math.max(\n      8,\n      Math.min(rect.left, innerWidth - this.#tip.offsetWidth - 8)\n    );\n    this.#tip.style.left = `${left + scrollX}px`;\n    this.#tip.style.top = `${rect.bottom + scrollY + 8}px`;\n  }\n  show() {\n    if (this.#destroyed) return;\n    this.#dismissed = false;\n    this.#tip.hidden = false;\n    this.#position();\n  }\n  hide() {\n    this.#dismissed = true;\n    this.#tip.hidden = true;\n  }\n  update(text) {\n    if (typeof text !== "string") throw new TypeError("Text required");\n    if (!this.#destroyed) {\n      this.#tip.textContent = text;\n      this.#position();\n    }\n  }\n  destroy() {\n    if (this.#destroyed) return;\n    this.#destroyed = true;\n    this.#owner.abort();\n    clearTimeout(this.#hideTimer);\n    const ids = (this.#target.getAttribute("aria-describedby") ?? "")\n      .split(/\\s+/)\n      .filter(id => id && id !== this.#tip.id);\n    if (ids.length)\n      this.#target.setAttribute("aria-describedby", ids.join(" "));\n    else this.#target.removeAttribute("aria-describedby");\n    this.#tip.remove();\n  }\n}',
          language: "js",
        },
        {
          name: "index.html",
          code: '<button id="help" type="button">Shipping details</button>\n<button id="destroy" type="button">Destroy tooltip</button>\n<style>\n  .study-tooltip {\n    position: absolute;\n    max-width: min(260px, calc(100vw - 16px));\n    padding: 8px 12px;\n    background: #17212d;\n    color: white;\n    border-radius: 6px;\n  }\n</style>\n<script type="module">\n  import { Tooltip } from "./Tooltip.js";\n  const tip = new Tooltip(document.querySelector("#help"), {\n    text: "Standard delivery takes 3–5 days."\n  });\n  document.querySelector("#destroy").onclick = () => tip.destroy();\n</script>',
          language: "html",
        },
      ],
      kind: "browser",
    },
    {
      number: 2,
      name: "E-commerce Product Filtering System",
      brief:
        "Implement sorting, filters, product search, pagination, and cart state. Practice array methods, data transformation, state management, and architecture.",
      levels: "Levels 1–2, 4–6",
      steps: [
        "Model product data, selected filters, sort mode, search query, page, and cart as explicit state.",
        "Use a pure selector to derive the visible page; reset page when query/filter changes. Keep the cart keyed by stable product ids.",
        "Render safe text and accessible controls. If data becomes remote, reuse the cancellation and response-validation boundaries from Level 4.",
        "Test empty results, invalid page input, ties in sorting, repeated cart actions, and URL/state synchronization.",
      ],
      acceptance: [
        "Search, filters, sorting, and pagination compose without mutating the original product data.",
        "Cart quantities and totals remain consistent under repeated input; empty/loading/error states are visible.",
        "Filter state survives intentional URL navigation, and keyboard operation works without a framework.",
      ],
      files: [
        {
          name: "catalog.mjs",
          code: 'export function selectCatalog(\n  products,\n  { query = "", maxPrice = Infinity, page = 1, pageSize = 10 } = {}\n) {\n  if (!Number.isInteger(pageSize) || pageSize < 1)\n    throw new RangeError("Positive page size required");\n  if (!Number.isInteger(page) || page < 1)\n    throw new RangeError("Positive page required");\n  const normalized = query.trim().toLowerCase();\n  const matches = products\n    .filter(\n      item =>\n        item.price <= maxPrice && item.name.toLowerCase().includes(normalized)\n    )\n    .toSorted((a, b) => a.price - b.price || a.id.localeCompare(b.id));\n  const pages = Math.max(1, Math.ceil(matches.length / pageSize));\n  const current = Math.min(page, pages);\n  return {\n    items: matches.slice((current - 1) * pageSize, current * pageSize),\n    total: matches.length,\n    page: current,\n    pages\n  };\n}',
          language: "js",
        },
      ],
      kind: "module",
    },
    {
      number: 3,
      name: "API-Powered Dashboard",
      brief:
        "Use Fetch, async/await, error handling, request cancellation, loading states, data caching, and testing.",
      levels: "Levels 4, 6–8",
      steps: [
        "Write and validate the API adapter first; the controller below receives load(query, signal) instead of owning hard-coded networking.",
        "Drive loading/error/success/empty views from controller state. Cache only with a deliberate per-user key/freshness policy.",
        "Add debounced search and filters; abort old requests and reject stale commits with an operation id.",
        "Use controlled promise/network fixtures for out-of-order success, error, cancellation, timeout, and destroy while loading.",
      ],
      acceptance: [
        "A slow old request cannot replace a newer result, even when the transport ignores its abort signal.",
        "HTTP failures, malformed JSON/domain data, empty results, and retryable errors have distinct tested paths.",
        "Destroy prevents later callbacks from updating removed views and cleans pending request/timer ownership.",
      ],
      files: [
        {
          name: "dashboard.mjs",
          code: 'export function createDashboard(load, onState) {\n  let generation = 0;\n  let request;\n  let destroyed = false;\n  return {\n    async refresh(query) {\n      if (destroyed) return;\n      request?.abort();\n      request = new AbortController();\n      const mine = ++generation;\n      onState({ status: "loading" });\n      try {\n        const items = await load(query, request.signal);\n        if (!destroyed && mine === generation)\n          onState({ status: "success", items });\n      } catch (error) {\n        if (!destroyed && mine === generation && !request.signal.aborted)\n          onState({ status: "error", error });\n      }\n    },\n    destroy() {\n      destroyed = true;\n      generation++;\n      request?.abort();\n    }\n  };\n}',
          language: "js",
        },
        {
          name: "dashboard.test.mjs",
          code: 'import { test } from "node:test";\nimport assert from "node:assert/strict";\nimport { createDashboard } from "./dashboard.mjs";\ntest("latest response wins even if old work ignores cancellation", async () => {\n  const pending = new Map();\n  const states = [];\n  const controller = createDashboard(\n    query => new Promise(resolve => pending.set(query, resolve)),\n    state => states.push(state)\n  );\n  const old = controller.refresh("old");\n  const latest = controller.refresh("new");\n  pending.get("new")(["new"]);\n  await latest;\n  pending.get("old")(["old"]);\n  await old;\n  assert.deepEqual(states.at(-1), { status: "success", items: ["new"] });\n  assert.equal(states.filter(state => state.status === "success").length, 1);\n  controller.destroy();\n});\ntest("destroy prevents a late result from committing", async () => {\n  let resolve;\n  const states = [];\n  const controller = createDashboard(\n    () =>\n      new Promise(done => {\n        resolve = done;\n      }),\n    state => states.push(state)\n  );\n  const request = controller.refresh("query");\n  controller.destroy();\n  resolve(["late"]);\n  await request;\n  assert.equal(states.at(-1).status, "loading");\n});',
          language: "js",
        },
      ],
      kind: "node",
    },
    {
      number: 4,
      name: "GSAP Interactive Website",
      brief:
        "Create scroll animations, transitions, interactive sections, and responsive motion. Focus on animation performance and lifecycle management.",
      levels: "Levels 3–4, 6, 8",
      steps: [
        "Build a readable static page, then identify the transitions and scroll scenes that support its content.",
        "Use the scoped mountReveal helper from Chapter 12 and the GSAP handbook for timeline/ScrollTrigger details.",
        "Expose initialize/refresh/destroy boundaries, respect reduced motion, and refresh after content geometry settles.",
        "Profile representative mobile conditions and test rapid input, live breakpoints, route changes, and remounts.",
      ],
      acceptance: [
        "Every content section and action works with motion disabled; keyboard/focus behavior is preserved.",
        "No duplicate ScrollTriggers or retained listeners remain after repeated mount/destroy.",
        "Animations have measured rendering costs and do not cause avoidable layout shifts.",
      ],
      files: [
        {
          name: "motion-page.js",
          code: 'import { mountReveal } from "./mount-reveal.js"; // Copy Chapter 12\'s helper.\nexport function mountPage(root) {\n  const destroyers = [...root.querySelectorAll(".reveal")].map(mountReveal);\n  return () => {\n    for (const destroy of destroyers) destroy();\n  };\n}\n// Each .reveal section contains a heading and paragraph, visible in baseline CSS.\n// The application/router owns when mountPage runs and when its cleanup is called.',
          language: "js",
        },
      ],
      kind: "integration",
    },
    {
      number: 5,
      name: "Vanilla JavaScript SPA",
      brief:
        "Build a task manager with routing, persistent state, reusable modules, API integration, and automated tests.",
      levels: "Levels 3–4, 6–10",
      steps: [
        "Use the Chapter 34 routing shell, then add task-list, detail, and settings views through explicit modules.",
        "Implement the store below with an injected storage adapter; keep an in-memory fallback when persistence is unavailable.",
        "Add a validated API adapter and define the server/local conflict policy rather than silently treating local state as authoritative.",
        "Automate route/back navigation, persistence failures, request cancellation, keyboard focus, and clean view replacement.",
      ],
      acceptance: [
        "Direct supported routes and browser history produce the correct view and focus target.",
        "Malformed storage is rejected safely; UI works in memory when storage is blocked.",
        "Tasks, API responses, and async view state remain consistent; each removed view releases its owned work.",
      ],
      files: [
        {
          name: "task-store.mjs",
          code: 'export function createTaskStore(storage, onStorageError = () => {}) {\n  const key = "js-study:tasks";\n  let tasks = [];\n  const valid = item =>\n    item &&\n    typeof item.id === "string" &&\n    typeof item.title === "string" &&\n    typeof item.done === "boolean";\n  try {\n    const saved = JSON.parse(storage.getItem(key) ?? "[]");\n    if (Array.isArray(saved) && saved.every(valid)) tasks = saved;\n  } catch (error) {\n    onStorageError(error);\n  }\n  const listeners = new Set();\n  const snapshot = () => tasks.map(task => ({ ...task }));\n  function commit(next) {\n    tasks = next;\n    try {\n      storage.setItem(key, JSON.stringify(tasks));\n    } catch (error) {\n      onStorageError(error);\n    }\n    for (const listener of listeners) listener(snapshot());\n  }\n  return {\n    read: snapshot,\n    add(task) {\n      if (!valid(task) || tasks.some(item => item.id === task.id))\n        throw new TypeError("Valid unique task required");\n      commit([...tasks, { ...task }]);\n    },\n    setDone(id, done) {\n      if (typeof done !== "boolean") throw new TypeError("Boolean required");\n      commit(tasks.map(task => (task.id === id ? { ...task, done } : task)));\n    },\n    subscribe(listener) {\n      listeners.add(listener);\n      return () => listeners.delete(listener);\n    },\n    destroy() {\n      listeners.clear();\n    }\n  };\n}',
          language: "js",
        },
      ],
      kind: "module",
    },
  ],
  priorities: [
    [
      "1 — Highest",
      "Closures, `this`, objects, array methods",
      "Strengthen core JS knowledge",
    ],
    [
      "2 — Highest",
      "DOM, events, browser APIs",
      "Directly useful in your daily front-end work",
    ],
    [
      "3 — Highest",
      "Promises, async/await, Fetch, event loop",
      "Essential for modern asynchronous applications",
    ],
    [
      "4 — High",
      "Classes, prototypes, modules, architecture",
      "Build reusable libraries and maintainable components",
    ],
    [
      "5 — High",
      "Testing, debugging, performance",
      "Develop production-level engineering skills",
    ],
    [
      "6 — High",
      "TypeScript and React integration",
      "Support your transition to modern front-end development",
    ],
    [
      "7 — Medium",
      "Advanced internals, algorithms, metaprogramming",
      "Develop deeper language expertise",
    ],
    [
      "8 — Optional",
      "Engine internals, ASTs, binary data",
      "Pursue specialized JavaScript knowledge",
    ],
  ],
  skills: [
    [
      "JavaScript fundamentals",
      "Types, functions, arrays, objects, operators",
      "To revise / Learning / Comfortable",
    ],
    [
      "Scope and closures",
      "Execution contexts, hoisting, `this`, closures",
      "To revise / Learning / Comfortable",
    ],
    [
      "DOM and browser APIs",
      "Elements, events, forms, observers, animations",
      "To revise / Learning / Comfortable",
    ],
    [
      "Asynchronous JavaScript",
      "Promises, async/await, Fetch, event loop",
      "To revise / Learning / Comfortable",
    ],
    [
      "OOP and functional programming",
      "Prototypes, classes, composition, patterns",
      "To revise / Learning / Comfortable",
    ],
    [
      "Modules and architecture",
      "ESM, bundlers, component and library design",
      "To revise / Learning / Comfortable",
    ],
    [
      "Testing and debugging",
      "Unit tests, integration tests, DevTools",
      "To revise / Learning / Comfortable",
    ],
    [
      "Performance and security",
      "Rendering, memory, XSS, accessibility",
      "To revise / Learning / Comfortable",
    ],
    [
      "Advanced internals",
      "Iterators, generators, Proxy, engine concepts",
      "To revise / Learning / Comfortable",
    ],
    [
      "Expert engineering",
      "Package design, SPA architecture, algorithms",
      "To revise / Learning / Comfortable",
    ],
  ],
};
(() => {
  const content = document.querySelector("#content");
  const nav = document.querySelector("#nav");
  const search = document.querySelector("#search");
  const track = document.querySelector("#track");
  const count = document.querySelector("#count");
  function node(tag, text, className) {
    const element = document.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
  }
  function paragraphs(parent, text) {
    for (const paragraph of text.split(/\n\n/))
      parent.append(node("p", paragraph));
  }
  function example(parent, file) {
    const head = node("div", undefined, "example-head");
    head.append(node("span", file.name));
    const button = node("button", "Copy");
    button.type = "button";
    button.setAttribute("aria-label", "Copy " + file.name);
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(file.code);
        button.textContent = "Copied!";
      } catch {
        button.textContent = "Select code to copy";
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(code);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      window.setTimeout(() => {
        button.textContent = "Copy";
      }, 1800);
    });
    head.append(button);
    const pre = node("pre");
    pre.tabIndex = 0;
    pre.setAttribute("aria-label", file.name + " example");
    const code = node("code", file.code);
    code.className = "language-" + file.language;
    pre.append(code);
    parent.append(head, pre);
    window.HandbookHighlight?.highlight(code);
  }
  const projects = document.querySelector("#projects");
  const totalLessons = handbook.chapters.reduce(
    (sum, chapter) => sum + chapter.lessons.length,
    0,
  );
  const plain = (text) => text.replace(/`/g, "");
  function projectPanel(project) {
    const details = node("details", undefined, "project");
    details.id = "project-" + project.number;
    details.append(node("summary", project.number + ". " + project.name));
    paragraphs(details, project.brief);
    details.append(
      node("p", "Suggested path: " + project.levels, "requirements"),
    );
    const steps = node("ol");
    for (const step of project.steps) steps.append(node("li", step));
    details.append(
      node("h3", "Build plan"),
      steps,
      node("h3", "Acceptance checks"),
    );
    const checks = node("ul");
    for (const check of project.acceptance) checks.append(node("li", check));
    details.append(checks, node("h3", "Focused starter"));
    const setup = {
      browser: "Serve the shown files together in one localhost directory.",
      module:
        "Independent JavaScript modules; supply the described UI or storage adapter.",
      node: "Node.js 22+; run node --test dashboard.test.mjs.",
      integration:
        "Vite + gsap@3.15.0; copy Chapter 12’s mount-reveal helper before importing this starter.",
    };
    details.append(node("p", setup[project.kind], "requirements"));
    for (const file of project.files) example(details, file);
    return details;
  }
  function render() {
    const query = search.value.trim().toLowerCase();
    const fragment = document.createDocumentFragment();
    const menu = document.createDocumentFragment();
    let shown = 0;
    let menuLevel;
    for (const chapter of handbook.chapters) {
      if (track.value !== "all" && Number(track.value) !== chapter.level)
        continue;
      const level = handbook.levels[chapter.level - 1];
      const chapterMatch =
        query &&
        [chapter.name, ...chapter.topics]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const lessons = chapter.lessons.filter(
        (lesson) =>
          !query ||
          chapterMatch ||
          [
            lesson.name,
            lesson.explanation,
            lesson.requires,
            ...lesson.files.map((file) => file.code),
          ]
            .join(" ")
            .toLowerCase()
            .includes(query),
      );
      if (!lessons.length) continue;
      const section = node("section");
      section.id = "chapter-" + chapter.number;
      if (menuLevel !== chapter.level) {
        menuLevel = chapter.level;
        menu.append(node("div", "Level " + chapter.level, "nav-stage"));
      }
      const link = node("a", chapter.number + ". " + chapter.name);
      link.href = "#" + section.id;
      menu.append(link);
      section.append(
        node(
          "span",
          "Level " +
            chapter.level +
            (chapter.specialization ? " · Optional specialization" : ""),
          "stage",
        ),
        node("h2", chapter.number + ". " + chapter.name),
      );
      const coverage = node("details", undefined, "roadmap-topics");
      coverage.append(
        node(
          "summary",
          "Roadmap coverage — " + chapter.topics.length + " topics",
        ),
      );
      const topics = node("ul");
      for (const topic of chapter.topics)
        topics.append(node("li", plain(topic)));
      coverage.append(topics);
      section.append(coverage);
      for (const lesson of lessons) {
        const article = node("article", undefined, "entry");
        article.append(node("h3", lesson.name));
        paragraphs(article, lesson.explanation);
        article.append(node("p", "Setup: " + lesson.requires, "requirements"));
        if (lesson.note) article.append(node("p", lesson.note, "tip"));
        for (const file of lesson.files) example(article, file);
        const source = node("a", "Documentation ↗", "source");
        source.href = lesson.source;
        source.target = "_blank";
        source.rel = "noopener noreferrer";
        article.append(source);
        section.append(article);
      }
      shown += lessons.length;
      const checkpoint = node("div", undefined, "checkpoint");
      checkpoint.append(
        node("strong", "Try it before moving on"),
        node("p", chapter.checkpoint),
      );
      section.append(checkpoint);
      if (chapter.number === level.chapters.at(-1)) {
        const end = node("div", undefined, "checkpoint level-checkpoint");
        end.append(
          node("strong", "Level " + level.number + " checkpoint"),
          node("p", level.checkpoint),
        );
        section.append(end);
      }
      fragment.append(section);
    }
    if (!fragment.childNodes.length)
      fragment.append(
        node(
          "p",
          "No matching lessons. Try another term or reset the filters.",
          "empty",
        ),
      );
    content.replaceChildren(fragment);
    nav.replaceChildren(menu);
    count.textContent = shown + " of " + totalLessons + " lessons";
    const projectFragment = document.createDocumentFragment();
    const matches = handbook.projects.filter(
      (project) =>
        !query || JSON.stringify(project).toLowerCase().includes(query),
    );
    if (matches.length)
      projectFragment.append(
        node("h2", "Practical projects to build along the way"),
      );
    for (const project of matches)
      projectFragment.append(projectPanel(project));
    projects.replaceChildren(projectFragment);
  }
  function setupAssessment() {
    const key = "javascript-handbook:assessment:v1";
    const allowed = ["", "To revise", "Learning", "Comfortable"];
    const status = document.querySelector("#assessment-status");
    const rows = document.querySelector("#assessment-rows");
    let saved = [];
    try {
      const parsed = JSON.parse(localStorage.getItem(key) ?? "[]");
      if (Array.isArray(parsed)) saved = parsed;
    } catch {
      status.textContent =
        "Storage is unavailable; you can still assess your skills in this session.";
    }
    const selects = [];
    handbook.skills.forEach(([skill, includes], index) => {
      const row = node("tr");
      const title = node("th", skill);
      title.scope = "row";
      const cell = node("td");
      const select = node("select");
      select.setAttribute("aria-label", "Your status for " + skill);
      for (const value of allowed) {
        const option = node("option", value || "Choose status");
        option.value = value;
        select.append(option);
      }
      select.value = allowed.includes(saved[index]) ? saved[index] : "";
      select.addEventListener("change", () => {
        try {
          localStorage.setItem(
            key,
            JSON.stringify(selects.map((input) => input.value)),
          );
          status.textContent = "Assessment saved in this browser.";
        } catch {
          status.textContent =
            "Selection updated; browser storage is unavailable.";
        }
      });
      selects.push(select);
      cell.append(select);
      row.append(title, node("td", plain(includes)), cell);
      rows.append(row);
    });
    document
      .querySelector("#clear-assessment")
      .addEventListener("click", () => {
        for (const select of selects) select.value = "";
        try {
          localStorage.removeItem(key);
          status.textContent = "Assessment cleared.";
        } catch {
          status.textContent =
            "Assessment cleared for this session; browser storage is unavailable.";
        }
      });
  }
  search.addEventListener("input", render);
  track.addEventListener("change", render);
  document.querySelector("#reset").addEventListener("click", () => {
    search.value = "";
    track.value = "all";
    render();
    search.focus();
  });
  setupAssessment();
  render();
  const target = document.getElementById(location.hash.slice(1));
  if (target) {
    if (target instanceof HTMLDetailsElement) target.open = true;
    requestAnimationFrame(() => target.scrollIntoView());
  }
})();
