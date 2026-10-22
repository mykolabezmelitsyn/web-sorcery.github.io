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
            "This page shows how a JavaScript module finds a button in the page and responds to it. Three parts make that possible. ECMAScript defines the language rules. An engine runs the code. A runtime provides the surrounding tools, such as the browser's DOM (its representation of the page) or Node's filesystem APIs. Browser code cannot assume Node globals are available. Language syntax and runtime APIs have separate compatibility requirements; check both.\n\nScript loading affects when code can use the page. A classic script without defer pauses HTML parsing while it loads and runs. defer allows downloading during parsing, then runs scripts in document order after parsing ends. async runs a script when it is ready, without preserving that order. Modules have their own variable scope, use strict mode, and are deferred by default unless async is added. Serve modules through a local HTTP server. In this example, the module can find the button that appears before it in the HTML.",
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
            "This example shows how variables hold values, how objects can be shared, and how comparisons work. let creates a variable that can be reassigned within its block. const prevents reassignment; it does not prevent changing an object's contents. var belongs to the containing function and follows different initialization rules, so prefer let and const in new code. Primitive values are strings, numbers, booleans, null, undefined, bigints, and symbols. Objects have their own identity, and several variables can refer to the same object. JavaScript is dynamically typed: a variable can later hold a different type of value.\n\nConvert values explicitly when they enter your code, and usually use === for equality. == converts types before comparing. Object.is behaves differently from === for NaN and positive versus negative zero. The falsy values are false, 0, -0, 0n, an empty string, null, undefined, and NaN. Empty arrays and objects are truthy. Use parentheses to make the order of operations clear instead of relying on memory.",
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
            "Control flow decides which code runs and how often it repeats. Use if/else for decisions, switch for named alternatives, and a ternary expression for a short choice that produces a value. for, while, and do...while let you control repetition; do...while always runs its body at least once. for...of reads values from an iterable, an object that supports iteration. for...in lists enumerable string keys, including inherited keys, so it is usually unsuitable for arrays.\n\nUse Object.keys or Object.entries when you want an object's own properties. Strict mode rules out several error-prone behaviors, including creating a global variable by accidental assignment. Modules already use strict mode. Return early when that makes a decision clearer, rather than adding more nested blocks. Every loop should have an exit condition you can explain.",
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
            "Functions package work into values that code can store, pass, and call. A function declaration is initialized before execution reaches its written position within its scope. A function expression creates the function when that expression runs. Arrow functions use this from their surrounding code and have no arguments object of their own. They therefore cannot replace ordinary methods or constructors in every situation. Parameters are the names in the function definition; arguments are the values supplied by a call.\n\nA default parameter applies when its argument is undefined. A rest parameter collects additional arguments into an array. A function returns undefined unless it returns a value explicitly. A callback is a function passed to other code to call. A higher-order function accepts or returns functions. Anonymous function expressions have no explicit name. An immediately invoked function expression, or IIFE, runs as soon as it is defined. IIFEs remain useful, though modules now provide much of the variable isolation they once supplied.",
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
            "This example reads a small category tree and returns a flat list without changing the input. Keeping data transformations separate from other work makes them easier to test. A pure function always returns the same result for the same inputs and makes no observable changes elsewhere. A function that changes the DOM or shared data, or reads the current time, is impure. Such work is necessary; give it a clear place outside pure data logic.\n\nThe example uses recursion: a function calls itself to process a smaller part of the problem. Recursion needs a base case that stops further calls. It also needs a sensible depth limit because JavaScript's call stack is finite. Portable code should not assume tail-call optimization, an engine feature that can avoid retaining certain calls. For external data of arbitrary depth, an explicit stack and an iterative loop are safer.",
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
            "This example cleans product names, removes unavailable products, and calculates a total without rewriting the source array. String methods return new strings because strings cannot be changed in place. Template literals insert expression results into strings; they do not escape HTML. Number.isNaN and Number.isFinite test numeric values without first converting types, unlike their global counterparts. Math supplies numeric helpers. Number arithmetic uses floating-point values, so financial rounding needs an explicit policy suited to the domain.\n\nArray methods differ: some return transformed results, while others change the original array. Know which behavior you are using. Destructuring extracts values into variables. Spread makes shallow copies, so nested objects can remain shared. Rest collects the remaining entries. Object.entries and related methods expose object keys and values for processing.",
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
            "This configuration example handles missing values while preserving an intentional zero. Optional chaining stops an access or call when the value being accessed through is null or undefined. It does not validate the data returned. Nullish coalescing supplies a fallback only for null or undefined. Logical OR supplies a fallback for any falsy value, so it can unintentionally replace zero or an empty string.\n\nThe assignment forms ??=, ||=, and &&= use those same tests to decide whether to assign a new value. Use them only when changing the object or variable is intentional. Spread and destructuring defaults do not protect nested accesses or combine nested objects through a deep merge. The example also handles an optional callback before its result is used elsewhere.",
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
            "This example separates a stored date or number from the text shown to a user. Date represents an instant as a timestamp. Its displayed form depends on the locale and time zone. Parse well-defined ISO date input and choose the display time zone deliberately. Intl formatters produce localized numbers and dates. Their output is for presentation, not a general way to parse user input.\n\nJSON serialization has a different purpose: turning supported data into text and reading it back. JSON.parse can throw, and its result has not been checked against your application's expected structure. JSON.stringify does not preserve functions or undefined as ordinary object properties. BigInt needs a custom conversion or serialization throws. Date usually becomes an ISO string. For these reasons, serializing and parsing JSON is not a universal deep-copy method. Validate the parsed structure before using it as application data.",
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
            "This block explains how JavaScript finds a variable and when that variable can be read. Lexical scope means names are resolved from where code is written, not where a function is called. JavaScript searches the surrounding scopes. A closer declaration can hide, or shadow, an outer one. let and const belong to a block; var belongs to a function.\n\nBindings, the associations between names and values, exist before their declarations run. let and const remain uninitialized until their declaration executes. Reading them during this temporal dead zone, or TDZ, throws an error. A var binding instead reads as undefined before assignment. Each function call has an execution context that holds its environment, and nested calls are tracked on the call stack. Function declarations and function expressions are initialized differently. Explain hoisting through binding creation and initialization; source lines are not physically moved upward.",
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
            "A closure lets a function keep using variables from the code around its definition. This can preserve private state after the outer function has returned. It retains access to the variable binding, not a frozen copy of its earlier value. Later changes can therefore be visible to the function.\n\nThis matters for delayed callbacks. Several callbacks created around one var binding all see that binding's final value. A let loop creates a separate binding for each iteration. Closures can also retain large objects or DOM nodes removed from the page. Remove listeners and release unnecessary references when a feature ends. Garbage collection cannot know when you intended the component to stop existing.",
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
            "This example shows how a function receives this. For an ordinary function, the call determines its value. Calling an object method supplies that object as the receiver. Taking the method out of the object loses that receiver; a plain call in strict mode has undefined as this. call supplies a receiver and separate arguments. apply supplies a receiver and an argument list. bind creates another function with a fixed receiver.\n\nAn arrow function instead uses this from the code around its definition. call, apply, and bind cannot replace that captured value. Use an ordinary method when the receiver should vary, and an arrow when the surrounding this is what you want. Binding a listener creates a new function reference. Keep that reference if you will later remove the listener with removeEventListener.",
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
            "Array methods produce different kinds of results. map transforms elements, filter selects them, reduce combines them into one result, and find returns the first match. some asks whether at least one element passes a test; every asks whether all do. Choose the method that matches the result you need rather than putting every operation into reduce. flat removes nesting to a chosen depth. flatMap transforms elements and removes one level of nesting.\n\nsort changes the original array and compares values as strings by default. Supply a comparator for numeric ordering. toSorted, added in ES2023, returns a sorted copy. For older targets, use [...items].sort(comparator). Object.keys, Object.values, and Object.entries list an object's own enumerable string properties; enumerable means included in these listings. Object.fromEntries builds an object from entries. Avoid repeatedly scanning a large collection when building an index in one pass is clearer.",
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
            "This example shows what a copy shares and how property rules limit changes. Spread copies only the outer structure, so nested objects remain shared. structuredClone copies supported structured data, including cycles, but cannot clone functions or DOM nodes. It also does not preserve every custom class's behavior. Choose a copy or update strategy explicitly instead of assuming all data can be cloned.\n\nObject.freeze prevents changes to an object's own properties, but does not freeze nested objects. Object.seal prevents adding or removing properties while allowing values that remain writable to change. A property descriptor defines whether a property can be written, listed, or reconfigured, or defines getter/setter functions instead. A getter should not conceal expensive or surprising work. Computed property names use an expression to choose the key. Make ownership clear so callers know whether a change affects only their data or shared data.",
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
            "Map and Set store data under different rules from ordinary objects. Map accepts arbitrary keys and preserves insertion order. Set keeps unique values. Use Map when non-string keys or the identity of a key matters. Two objects with identical-looking contents are still different objects and different keys. Map and Set use SameValueZero equality for keys or values.\n\nWeakMap stores metadata and WeakSet tracks membership without, by themselves, keeping an object alive. They cannot list their entries and have no size property. Exposing that information would make behavior depend on unpredictable garbage-collection timing. Use other collections when you must list or persist entries. Weakly held metadata does not replace explicit cleanup of resources.",
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
            "Error handling gives a failure a useful place to be reported or recovered from. Throw Error objects or meaningful subclasses rather than strings. TypeError describes an invalid type. RangeError describes a value outside the supported range. A custom error class can name an application-specific failure and retain its underlying cause. Let an error travel through callers until code can recover, add useful context, or show a helpful message.\n\ntry/catch handles synchronous throws and rejections from promises that are awaited inside it. It does not catch errors from an arbitrary timer callback that runs later. Handle errors in that callback or convert the work into a promise. Use finally for cleanup, and avoid returning or throwing there in a way that replaces the original result. Validate inputs where they enter a part of the system. Read a stack trace from the failed operation back through the functions that called it.",
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
            "A regular expression, or RegExp, matches text using a pattern and flags. Character classes choose a character; quantifiers say how often it can repeat. Anchors restrict a match's position. Boundaries identify transitions such as a word edge. Capturing groups retain matched text; non-capturing groups organize alternatives without retaining a capture. Lookahead and lookbehind check nearby text without including it in the match. Check lookbehind support when targeting older browsers.\n\nChoose the matching operation for the result you need. test returns a boolean. exec returns a match with captures. String match, matchAll, and replace have different result structures. A global or sticky regex changes its lastIndex position, which can make repeated validation tests behave differently. Use a non-global pattern with clear limits for simple fields. A regex cannot prove an email address can receive mail. Avoid nested, ambiguous repetition when processing untrusted input without a size limit.",
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
            "This block builds a part of the page while keeping ownership of that part clear. The DOM represents a page as a tree of nodes. querySelector finds the first matching element. closest searches upward through ancestors. children and parentElement expose relationships. Creating a node and setting textContent inserts text. innerHTML instead parses markup, so do not give it untrusted strings. Attributes describe markup, while properties often describe current state; an input's value can differ from its value attribute. dataset exposes data-* values as strings.\n\nUse classList to change state classes and inline styles only for deliberate values. A template holds inactive markup that can be cloned. A DocumentFragment groups nodes before insertion. Build the intended subtree, then replace it once instead of repeatedly mixing page measurements and changes. Update only the region your component owns. Replacing another component's content can discard its listeners or focus.",
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
            "A component can have a clear lifecycle without using a framework. A mount function receives its root element and creates the listeners or observers it needs. It returns a handle for updating or cleaning up that work. An update method changes owned content. destroy stops external work and is safe to call more than once.\n\nInitialize new components where your code inserts them. Dynamic content does not require rescanning the entire document after every change. If another system controls insertion, use a MutationObserver limited to the relevant region. Keep listener function references for removal, or group listeners under an AbortController. Cleanup should leave unrelated markup and inline styles alone.",
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
            "Event delegation lets one listener on a stable ancestor handle actions from its children, including newly inserted children. It works by following event propagation: events pass through capture, target, and usually bubbling phases. currentTarget is the element whose listener is running. target is the event's originating target as exposed to that listener; a shadow boundary can change which target is exposed.\n\npreventDefault cancels a cancelable browser action. stopPropagation stops the event from travelling farther; it does not cancel the default action. A passive listener promises not to cancel that action, which is useful for scrolling input. once removes a listener after its first call. Use pointer events for mouse, pen, and touch input, click for activation, and keyboard/focus behavior for access without a pointer. To remove a listener, supply the same function and matching capture mode.",
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
            "CustomEvent lets a component send a named message with structured data in detail. It can be configured to bubble to ancestors. dispatchEvent calls listeners synchronously; it does not wait for promises they return. If a listener may veto an action, make the event cancelable and check the boolean returned by dispatchEvent. Document the event name and the structure of detail.\n\nAn event originating inside a shadow root needs composed: true to cross that boundary when crossing is part of its public contract. Keep local changes local rather than sending everything through document. A global event bus can hide which component owns a change and make cleanup harder. A callback can be simpler for direct communication between a parent and child.",
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
            "This form uses native validation and feedback that users can understand. Listen for submit on the form so submission through Enter works as well as clicking its button. Constraints such as required, type, and minLength catch common problems. setCustomValidity adds a custom rule; clear the previous custom message before checking an edited value. Associate each message with its input. Announce a concise result rather than every keystroke.\n\nFormData collects successful form controls. Use getAll to retrieve repeated names; file controls produce File objects. When sending FormData through Fetch, let the browser create the multipart boundaries rather than setting Content-Type manually. Client-side checks improve the experience, but the server must still validate the data and decide whether the user is allowed to submit it.",
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
            "Async validation must avoid showing an old result for a newer input. An availability check may finish after the user edits the field again. Abort the old request where possible, and check its identity before applying the result. A network failure does not mean the field is invalid. Debounce expensive checks, waiting for a pause in typing, rather than requesting the server on every keypress.\n\nFor submission, allow one active operation, disable the submit control, and restore it in finally. Do not automatically retry a payment or creation request without considering backend idempotency: whether repeating the request can avoid duplicating its effect. A multi-step form should validate its current step, show its heading and progress, and retain entered values. The helper accepts its transport function from the caller, so it can use a real Fetch implementation or a controlled test substitute.",
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
            "This example changes browser state through URLs, history, storage, and the clipboard. window, document, navigator, and location are browser APIs. URL and URLSearchParams parse and encode URL parts more reliably than manual string assembly. History pushState and replaceState update same-origin history without loading another page. popstate handles history traversal; the initial push does not itself trigger that event. Keep the URL and displayed state in agreement.\n\nlocalStorage keeps strings by origin across visits. sessionStorage keeps them for a tab session. Both can throw or be unavailable. Cookies follow separate request and security rules; JavaScript cannot read HttpOnly cookies. Stored client data does not prove authorization. Clipboard writes require a secure context and must satisfy browser permission and user-activation rules. Handle rejection with a usable fallback.",
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
            "Observers report changes so code does not have to keep checking for them. IntersectionObserver reports visibility crossings. ResizeObserver reports size changes. MutationObserver reports DOM changes. They deliver information asynchronously and serve different purposes. Observe only the relevant region and disconnect when the component ends. Avoid changing an observed size repeatedly from its own resize callback.\n\nChoose a scheduler for the work you need. requestAnimationFrame runs visual work before a repaint and supplies a timestamp; it is not guaranteed to run at 60 Hz. requestIdleCallback has limited browser support and is unsuitable for essential, immediate work. Check that it exists and use a timeout fallback for small background tasks. Cancel the specific scheduler you created during cleanup.",
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
            "A custom element packages behavior in a registered class. Its connected and disconnected callbacks manage work when the element enters or leaves the document. Shadow DOM keeps a subtree and its styles separate from surrounding markup; it is not a security sandbox. Native controls inside it still need accessible names and keyboard support. Communicate through public attributes, properties, and events rather than another component's internal structure.\n\nAn element can be removed and reinserted, so connection callbacks may run repeatedly. Do not recreate the same DOM or add duplicate listeners on every connection. Register each custom-element name only once. This counter retains its shadow tree between connections. Each connection creates a fresh AbortController to own the reattached listener.",
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
            "JavaScript can control animation in several ways. Toggling a CSS class can start a transition. The Web Animations API provides playback handles. requestAnimationFrame lets a custom renderer update each frame. Duration sets how long motion lasts, and easing describes how its progress changes over time. Moving a fixed number of pixels on every frame instead makes speed depend on the display's refresh rate.\n\nKeep application state separate from decorative animation progress, and keep a handle that can cancel the animation. Read page measurements together before making changes. Repeatedly alternating the two can trigger layout thrashing, unnecessary repeated layout work. Use transform and opacity when they produce the intended effect, but measure the actual rendering cost. Honor reduced-motion preferences and keep content useful when animation is disabled.",
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
            "GSAP coordinates animations and their cleanup. A tween changes properties over time. A timeline sequences several tweens under one playhead, the current position in the sequence. ScrollTrigger connects animation to viewport crossings or scroll progress. Register imported plugins and use matching core/plugin versions. The dedicated GSAP handbook covers these features in detail; this example focuses on owning their lifecycle in JavaScript.\n\nUse matchMedia to apply responsive and reduced-motion conditions. Revert it when the feature is destroyed. Essential content must remain visible when motion is off. Recalculate scroll effects after genuine layout changes, and avoid giving every element its own global scroll listener.",
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
            "This experiment prints synchronous messages first, then the promise reaction and queued microtask, then the timer. It shows that different kinds of work are scheduled differently. Within one agent, synchronous JavaScript runs to completion before another task can interrupt it. The call stack tracks the functions currently running. Timers schedule later tasks; they do not reserve an exact execution time.\n\nPromise reactions and queueMicrotask schedule microtasks. The browser processes a microtask checkpoint before moving to later work. Continuously adding microtasks can therefore delay rendering. Async APIs register work with the host runtime and resume later through callbacks or promise reactions. A Promise does not move expensive computation to another thread. Browsers may render between tasks, but a timer callback does not guarantee that a repaint has happened.",
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
            "This poller calls a supplied transport function, reports one result at a time, and returns a cleanup function. It can be explored without a real server. Named steps or promises make dependent work easier to follow than deeply nested callbacks. For repeated async work, setInterval can begin another operation before the previous one finishes. Scheduling a new timeout after completion avoids that overlap more clearly.\n\nGive timers an owner and cancel them when that owner ends. Also guard work that has already started. A timeout delay is a minimum scheduling delay, not a real-time guarantee. Use requestAnimationFrame for visual updates and workers for suitable CPU-heavy work.",
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
            "A promise represents work that will produce a value or a failure. It is pending until it becomes fulfilled or rejected; either final outcome is called settled. The executor passed to new Promise runs synchronously. Handlers reacting to its outcome run asynchronously. Resolving can adopt the outcome of another promise or thenable, an object with a then method. A resolved promise is therefore not necessarily fulfilled yet.\n\nReturn a value or promise from then to connect the next step. Throwing in a handler rejects the next promise in the chain. catch can recover by returning a value or pass failure on by throwing. finally normally preserves the outcome while performing cleanup; throwing or returning a rejection replaces that outcome. Do not add a new Promise wrapper around an API that already returns promises without a reason. Observe the returned chain so rejections do not go unhandled.",
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
            "Promise combinators combine several outcomes under different rules. Promise.all waits for every input to fulfill, but rejects on the first rejection it observes. It does not cancel the remaining work. allSettled reports every outcome. race follows the first input to settle, whether it fulfills or rejects. any follows the first fulfillment and rejects with AggregateError only if every input rejects.\n\nStart independent work before awaiting it to allow concurrent progress. Await operations sequentially when one depends on the previous result or order matters. Putting promises in an array does not limit how many operations run at once. You still own cancellation and request limits. A timeout made only with race stops waiting for the losing request; it does not stop that request from running.",
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
            "async and await make the order of dependent work easier to read. An async function always returns a promise. await pauses that function until the awaited value is resolved, allowing other work to proceed. It does not block the entire browser thread. However, synchronous computation before or after await can still block it. Use try/catch around awaited work where you can respond to a rejection.\n\nforEach does not wait for async callbacks. Use for...of when operations must run sequentially. Use map with Promise.all for independent operations, and set an explicit concurrency limit when their number grows. for await...of reads async iterables and can also await values from a synchronous iterable. Return or await the promise your caller needs to observe. Work started separately needs its own rejection handler.",
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
            "This helper loads JSON while preserving the caller's cancellation signal, enforcing a finite timeout, checking HTTP status, and cleaning up its listener after success or failure. AbortController supplies a signal that cooperating APIs such as Fetch can observe. It does not forcibly terminate arbitrary JavaScript. Distinguish cancellation from failure, and release timers in finally. Where possible, a timeout should abort the work rather than only stop waiting for it.\n\nA user interface also needs explicit loading, error, and success states. Track the request's identity so an old response cannot replace a newer result. Retry only suitable operations and limit the attempts. Consider increasing delays between attempts, the server's Retry-After guidance, whether repeating the operation is safe, and whether the user has canceled it.",
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
            "A Fetch request has separate network, HTTP, and data-reading checks. HTTP defines methods, headers, status codes, and response bodies. A REST-style API uses those rules to describe resources and operations. Fetch rejects when transport fails, but normally fulfills for HTTP responses such as 404 or 500. Check response.ok before using the result. JSON parsing is another async step that can fail. Even successfully parsed data needs its structure checked. Request and Response expose these parts of the exchange. Their bodies are streams that are generally consumed once.\n\nCORS is a browser-enforced rule configured by the server. mode:no-cors does not make a cross-origin response readable. Authentication establishes identity; authorization is the server's decision about what that identity may do. Client-side checks or invented headers cannot bypass either policy.",
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
            "This browser example demonstrates search races with a local fake transport, so it needs no server. Wait for a pause in input, abort the previous request, and track a generation number for each search. The number prevents an older result from being applied even if a server or adapter finishes despite cancellation. Render returned user data as text. For a real API, encode query parameters with URLSearchParams and treat pagination metadata as part of the response contract.\n\nReplace only searchProducts with your Fetch adapter. Validate both the returned items and next-page metadata. Define how changing a filter resets the page. If results are cached, include the query and user context in the key rather than mixing unrelated results.",
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
            "Use a streaming connection when the application needs ongoing updates. WebSocket supports messages in both directions. EventSource receives server-sent events, or SSE, in a one-way stream from server to browser. Both need a matching backend and explicit rules for authentication, reconnection, message validation, and cleanup. Neither replaces Fetch for every request.\n\nSSE usually reconnects automatically. Do not create another connection on each message or UI render. Native EventSource cannot add arbitrary request headers. Parse and validate WebSocket messages before changing application data. Close either connection when its owner ends. A string from a trusted connection is still not automatically safe to insert as HTML.",
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
      name: "OOP",
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
            "This example connects constructor functions and classes to JavaScript's prototype model. When an object lacks a property, lookup continues through its prototype chain until null. Calling a constructor function with new usually gives the instance that constructor's prototype object. Classes build on the same system. Instance methods normally live on the prototype; static methods live on the class constructor.\n\nEncapsulation protects rules that must remain true about an object's state. It does not require hiding every property. Private fields use # syntax and cannot be accessed through ordinary string keys. Getters and setters can provide controlled access to values. Inheritance and method overriding allow different objects to respond differently to a shared operation, called polymorphism. Composition is often clearer when several aspects of behavior vary independently.",
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
            "Functional composition connects small functions into a larger transformation. Functions are first-class values: they can be stored, passed, and returned. Higher-order functions accept or return other functions. Currying changes a multi-argument function into a sequence of single-argument functions. Partial application fixes some arguments without requiring that sequence.\n\nKeep transformations of application data pure, and place effects such as external changes at clear boundaries. Immutable updates avoid changing shared objects unexpectedly; they do not require copying every nested value in the application. Closures can hold local state when its owner is clear. Declarative code describes the desired transformation. Imperative code describes its steps. Choose whichever makes the particular task easier to understand.",
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
            "This repository example receives its storage behavior instead of depending on global state. A module exposes selected exports and keeps implementation details inside. A factory creates a configured object without requiring a class. Dependency injection means passing in collaborators, such as storage or network transport, rather than fixing them to one global implementation. A singleton shares one instance. Use it only when that lifetime is intentional; hidden shared state makes tests and independent component instances harder to manage.\n\nAn adapter translates one interface into another. A strategy supplies an interchangeable algorithm. A decorator wraps existing behavior with additional work. The example uses an injected storage adapter and strategy. Prefer direct composition until naming a pattern makes a recurring problem clearer.",
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
            "This small event bus lets code subscribe to messages and later unsubscribe. An observer subscribes directly to the thing it observes. Publish/subscribe, or Pub/Sub, places a channel between the sender and subscribers. Both reduce direct dependencies, but a global bus can also hide them. Return an unsubscribe function. State whether messages arrive synchronously, in order, and whether one listener's error affects delivery.\n\nA state store can combine subscriptions with a reducer-like function that computes updates. Keep one authoritative state instead of separate mutable copies across modules. In this example, emit runs synchronously and listener exceptions propagate. It reads a snapshot of listeners, making subscription changes during delivery predictable. Add more features only when requirements need them.",
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
            "ES modules split code into dependencies with explicit exports and their own variable scope. They support named exports and an optional default export. Static imports declare dependencies that are linked before the modules run. Imported bindings are live, read-only views of the exporting module's bindings. Module scope helps prevent accidental globals.\n\nDynamic import returns a promise for an object containing the module's exports. It can provide a point for lazy loading. A bundler may split dependencies into output files and remove unused exports, called tree shaking. Side effects and configuration limit that removal. Circular dependencies can read bindings before they are initialized. Extract shared contracts or reverse a dependency instead of relying on a fragile import order. Group modules by responsibility and make application startup explicit.",
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
            "This block distinguishes Node's two module systems. CommonJS uses require and module.exports. ES modules use import and export. A .cjs file is CommonJS, and a .mjs file is ESM. For .js files, package type and runtime rules determine the interpretation. Browser modules do not supply require by default.\n\nMixing the systems has limits. Names inferred from CommonJS exports do not have the same contract as real ESM live bindings. Rules for synchronous loading also vary by Node version. Prefer one source format and test every public format you advertise. Converting syntax alone does not determine the initial download size; splitting code into separately loaded files matters too.",
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
            "Package metadata, a lockfile, and build configuration make a project reproducible. package.json records scripts, dependencies, supported exports, and other package details. Semantic versioning describes compatibility intent; it does not guarantee an upgrade cannot break the application. Commit the lockfile and use npm ci in continuous integration, or CI, to reproduce its dependency choices. Keep runtime dependencies separate from build and test tools.\n\nVite provides a development server and production build pipeline. Parcel offers another integrated workflow. Rollup bundles code and is commonly used for libraries. Babel transforms selected syntax and may need additional runtime helpers or polyfills. Changing syntax does not supply missing Web APIs. Source maps connect generated output to original source. Vite-prefixed client environment variables are included in the delivered application, so never use them for secrets.",
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
            "Linting, formatting, tests, and CI answer different questions. ESLint checks configured code rules. Prettier applies consistent formatting. Neither proves that the application behaves correctly. Use compatible tools and provide the same checks locally and in CI. ESLint 9 normally uses flat configuration; older .eslintrc instructions describe a different setup.\n\nKeep Git changes focused, review their diffs, and run relevant tests before merging. CI can install locked dependencies, lint, test, and build the project. Deployment should use reviewed output and configuration for its environment. Review unsupported-browser or missing-API warnings deliberately. Do not assume a bundler has supplied every needed polyfill.",
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
            "This block separates data logic, external effects, and application startup so each part has a clear responsibility. A module should have a coherent reason to change. Put transformations, transport, state, rendering, and lifecycle management in suitable places rather than combining them all in a click handler. The design principles known as SOLID can help define those boundaries. DRY means avoiding repetition, but should not force unrelated work into one abstraction. KISS favors simple designs, and YAGNI means not building features before they are needed.\n\nComponents configured through options still need option validation and a clear public API. JSDoc documents those contracts and can support editor checks while the source remains JavaScript. Keep behavior tests in place during refactoring. Review ownership and error handling, and put URL/response assumptions in an explicit API adapter instead of spreading them through DOM code.",
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
            "Choose the smallest test boundary that can check the behavior you care about. A unit test checks a focused behavior. An integration test checks pieces working together. An end-to-end test drives the actual application. Arrange the inputs, perform the action, and assert an observable result. A regression test captures a real failure so it can be detected again. Test-driven development starts with a failing test to guide the implementation. Coverage shows code that tests have not visited; it does not prove the assertions or requirements are correct.\n\nA stub supplies controlled replies. A spy records calls. Use a mock when the interaction itself is what must be checked. Isolate state between tests, wait for async work, and test rejections. Check DOM events and network behavior at an appropriate level rather than mocking every dependency.",
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
            "Choose a test tool for the environment and behavior being tested. Vitest works naturally with Vite-style modules. Jest is another established runner with different configuration and mocking rules. Check compatibility rather than mixing their setup instructions. A simulated DOM suits focused unit tests. Layout, focus, rendering, and platform integration need a real browser.\n\nPlaywright controls browsers and provides assertions that retry. MSW intercepts network requests so a test can exercise the adapter that uses Fetch instead of replacing the adapter's internals. This example uses MSW 2's import convention; a newer major version may need different setup. Run the same tests in CI. Isolate test data, restore request handlers, and avoid relying on a public API being online.",
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
            "This end-to-end test checks the Chapter 28 dialog example served locally. It verifies user-visible state and behavior instead of sleeping for an assumed duration. Use accessible locators, which find elements through their user-facing roles and names, where possible. Supply predictable test data. Check keyboard interaction, focus return, errors, and cleanup as well as mouse interaction.\n\nBrowser tests can protect focus and accessible-name contracts, but do not replace a screen-reader review. Keep tests independent and run representative browsers and viewport sizes in CI. Before visual comparisons, wait for fonts and assets and put animations in a stable state.",
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
            "Debugging starts with evidence about where the program's behavior differs from expectations. In Chrome or Firefox DevTools, pause at a useful boundary. A conditional breakpoint pauses only for the input you want to investigate. Watch expressions show values without adding logs throughout the code. Read the call stack, async stack, and Network request details together. This helps distinguish incorrect state, outdated requests, bad data, and server errors.\n\nSource maps connect built output to the original source. The Performance panel shows long-running tasks and rendering work. Heap snapshots and allocation tools show objects retained in memory. To investigate listener leaks, repeat mounting and destruction and inspect which references keep objects alive. One rising memory graph is not enough. Reduce the problem to a small reproducible example and change one assumption at a time.",
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
            "This block measures the work that affects loading, rendering, and interaction. The critical rendering path includes fetching and parsing resources and preparing the first useful display. Layout calculates geometry. Paint creates pixels. Compositing combines layers. Reading geometry repeatedly after changing styles can force the browser to calculate layout synchronously. Group measurements before changes, avoid unnecessary rebuilding of large DOM trees, and reduce the animated scene when appropriate.\n\nLong tasks delay both input handling and rendering. Use the Performance API and browser traces to find the main cost before making tiny optimizations. Core Web Vitals include Largest Contentful Paint (LCP) for loading, Interaction to Next Paint (INP) for responsiveness, and Cumulative Layout Shift (CLS) for visual stability. Controlled lab measurements and real-user field measurements answer different questions. Lazy loading and dynamic imports can reduce initial work. Workers move suitable computation off the main thread; they do not eliminate that work.",
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
            "This block controls how often work runs and how long cached results remain useful. Debounce waits for a quiet period, which suits search input. Throttle limits call frequency, which suits repeated updates. Define whether each runs at the beginning or end of a period, and how it is cleaned up. Memoization stores a function's result by input. It can retain memory or return outdated data when inputs change or the cache key omits relevant context.\n\nA cache needs rules for its key, scope, freshness, size, and invalidation. Do not store user-specific results under a global key containing only the query. Garbage collection cannot reclaim entries still held by an unlimited cache. The debounce example exposes cancel for component cleanup. The throttle runs on the leading edge only, rather than scheduling an extra trailing call.",
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
            "This example displays markup-like input as literal text instead of executing it. Cross-site scripting, or XSS, occurs when attacker-controlled input is interpreted as executable content. Use textContent for plain text. Do not pass untrusted input to innerHTML as a general rendering method. If rich HTML is necessary, use a maintained sanitizer with rules suited to where the output will appear. Replacing text with a regex is not HTML sanitization. Validate URL schemes before assigning untrusted navigation destinations.\n\nContent Security Policy, or CSP, can restrict scripts and resource origins. It does not replace safe rendering. Prefer a deployed response-header policy with reviewed nonce or hash rules that identify which scripts are allowed, rather than copying a rule that allows arbitrary inline scripts. Client-side validation also does not replace server-side authorization or correct handling of output.",
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
            "Security rules must be enforced where the relevant authority exists. Authentication establishes who a user is. Authorization decides what that user may do and must be checked by the server for each operation. Same-origin policy and CORS restrict browser interactions; they are not authorization. Changes made through cookie-authenticated requests may need cross-site request forgery, or CSRF, protection. That can include server-validated tokens and suitable SameSite cookie policies. HTTPS protects data in transit, not the trustworthiness of every response.\n\nChoose token storage with its trade-offs in mind. Successful XSS can expose tokens readable by JavaScript. HttpOnly cookies need a server design that accounts for CSRF. Do not put secrets in client bundles. Review dependencies, lockfile changes, and security updates. Prototype pollution can occur when attacker-controlled keys are merged into ordinary objects. Use explicitly allowed fields, records with no prototype, or Map where appropriate.",
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
            "This example uses a native dialog and returns focus to the button that opened it. Start with native buttons, links, inputs, and dialogs rather than recreating them with ARIA. ARIA supplies accessibility meanings and states, not keyboard behavior. Keep aria-expanded, aria-selected, and aria-invalid aligned with actual visibility and interaction. Screen-reader announcements should report useful information concisely, not every animation frame.\n\nAn accessible dialog needs a name, sensible focus on opening, contained modal interaction, Escape handling, and focus restoration. Native dialog provides much of that foundation. Dynamic content and validation still need correct labels and relationships between controls and messages. Motion must also have a usable reduced-motion alternative.",
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
            "Accessibility testing checks whether a workflow is usable, not just whether a tool gives it a good score. Automated tools detect missing names, invalid relationships, and many contrast issues. They cannot prove the workflow makes sense. Alongside automation, manually test keyboard order, focus movement, visible focus, zoom and reflow, errors, and reduced motion. Review representative screen-reader behavior for complex widgets.\n\nKeep meaningful content available when scripts or motion fail. A disclosure's logical open state must control hidden and aria-expanded; its decorative animation cannot be the only signal. Associate form errors with their controls, and focus an appropriate error summary or invalid field. Add regression tests for the interactions you fix instead of only pursuing a tool's numeric score.",
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
            "Execution contexts explain how running JavaScript tracks its work and finds names. A context holds evaluation state and relationships between environments. A lexical environment resolves names through surrounding environments. A variable environment participates in handling declarations. Creating and initializing bindings explains hoisting and the temporal dead zone more accurately than imagining source lines moving. Closures retain access to the environments they use.\n\nWithin one agent, a job runs to completion before another job executes. The host runtime coordinates tasks, microtasks, rendering, and input/output. Node's event-loop phases differ from the browser's model. Engines may specialize execution or compile code to improve speed, but must preserve observable language behavior. Measure real workloads rather than designing around guesses about engine internals.",
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
            "This example distinguishes an object's own properties from inherited ones. Property lookup checks the object first, then its prototypes. Object.create selects a prototype when creating an object. Object.getPrototypeOf reads it, and Object.setPrototypeOf changes it. Frequent prototype changes can reduce clarity and interfere with optimization, so build the intended structure up front.\n\nProperty descriptors specify stored values or getter/setter behavior and whether properties are enumerable. Object.keys omits inherited, non-enumerable, and symbol keys. Reflect.ownKeys includes all own keys. Extensibility determines whether new properties can be added. Symbols provide unique keys and hooks into language protocols; they do not guarantee privacy. Use Object.hasOwn to check property ownership rather than trusting an object's possibly replaced hasOwnProperty method.",
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
            "A Proxy lets code intercept operations such as reading or writing a property. Reflect provides the corresponding default operations and helps retain the correct receiver, the object used as this for an operation. These tools can support validation, tracing, or virtual interfaces. They must still obey language invariants, rules that cannot be broken, especially for non-configurable properties. Private fields and built-ins with internal storage can also make simple forwarding fail.\n\nUse this kind of metaprogramming when it makes an explicit interface easier to use. Do not hide arbitrary work behind every property access. This example checks one assignment and forwards other operations with Reflect. It does not turn an arbitrary wrapped object into a complete reactive system or a security boundary.",
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
            "Iteration provides a way to read values one step at a time. An iterable exposes Symbol.iterator, which returns an iterator with a next method. Each result contains done and optionally value. An iterator is not automatically iterable; it must also provide the iterable protocol. A generator function creates an iterator and pauses at yield. yield* passes iteration to another iterable.\n\nAsync generators combine that pausing behavior with async values. Read them with for await...of. Receiving pages one at a time can avoid building one enormous array, but external input/output still needs cancellation and error handling. Map and Set define their ordering and key behavior. Engines choose their internal representation, so do not treat a particular hash-table design as a language guarantee.",
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
            "This example shows that binary storage and the way code reads it are separate. ArrayBuffer holds raw bytes. A typed array views those bytes as a particular numeric type. Several views can share one buffer. DataView reads and writes individual values with explicit endianness, the order of bytes within a value. This is useful for network or file formats whose byte order differs from the platform's usual layout.\n\nCheck lengths and offsets before reading external binary data. A typed array is not an ordinary Array. Converting a view, copying its buffer, and transferring its buffer are different operations. Transferring an ArrayBuffer to a worker detaches the sender's original storage. Shared storage instead needs a different set of rules for concurrent access.",
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
            "Garbage collection reclaims storage that can no longer be reached. The engine decides how and when that happens. Stack and heap are useful concepts, not guarantees about the physical location of every JavaScript value. A DOM node removed from the page can remain reachable through a closure, listener registry, or array. Strong references retain objects. Membership in a weak collection does not retain an object by itself.\n\nCorrect cleanup must be explicit. WeakRef and FinalizationRegistry do not guarantee when resource cleanup will run. Do not wait for a finalizer to remove a listener, close a socket, abort a request, or stop a rendering loop. Use destroy methods and finally blocks. To investigate leaks, repeat mounting and destruction, compare heap snapshots, and inspect the references retaining objects. A temporary memory increase alone does not prove a leak.",
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
            "This example sends work to a worker and receives its result through messages. Concurrency means several operations are in progress. Parallelism means some run at the same time. A worker has its own JavaScript environment and cannot access the DOM. postMessage normally copies data through structured cloning, so functions and DOM nodes cannot simply be sent. Transferring a buffer moves ownership instead of copying it and detaches it from the sender.\n\nWorkers cost time to start and exchange messages. Measure whether the computation is large enough to justify that cost. Attach handlers before sending work, validate message structures, handle errors, and terminate a short-lived worker when it finishes. You still need to track request identities and canceled UI state.",
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
            "SharedArrayBuffer lets several agents access the same bytes. In browsers, sharing normally needs a secure context and cross-origin isolation configured by response headers. Check both that the API exists and that crossOriginIsolated is true. Sending ordinary ArrayBuffer messages is often simpler.\n\nAtomics supplies synchronized operations on supported shared typed arrays. Several separate atomic operations do not automatically form one transaction. A race condition occurs when correctness depends on an uncontrolled ordering of operations. Do not block the browser's main thread with Atomics.wait. This example checks support before performing one atomic counter operation. A real shared-memory design needs documented coordination rules and tests where agents compete for the same data.",
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
            "This minimal router changes the displayed view through real links and a current heading, and returns a cleanup function. A single-page application, or SPA, updates views without a full document navigation. Its router maps URLs to view state and coordinates history, loading, cleanup, and focus. Hash routing is a useful small starting point. Path routing with pushState also needs a server fallback for direct URL requests and a popstate handler for history traversal.\n\nKeep route state, persistent application data, and temporary component state separate. Cancel old loads or ignore their results after navigation. Web Components can define view boundaries, but still need explicit ownership of resources. A route must remain usable without depending solely on an animation's completion.",
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
            "This example saves one small record in IndexedDB and shows success only after the write transaction completes. IndexedDB stores structured values through async requests grouped into transactions. Version upgrades create or change object stores. Other open connections can block an upgrade, so close old connections when they receive versionchange. One request succeeding does not by itself mean the write transaction has committed.\n\nChoose a schema and account for errors, storage quotas, unavailable storage, and boundaries between accounts or data sets. Persistent storage can be cleared, so provide useful empty and error states. This example does not provide cross-device synchronization or a backend strategy for resolving conflicting changes.",
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
            "This teaching service worker caches only the fixture's public index page and handles navigation in the same directory. A service worker runs separately from the page and can intercept requests within its scope. It must be registered in a secure context, such as HTTPS or localhost. The Cache API stores Request/Response pairs. It is separate from IndexedDB and the browser's normal HTTP cache. A progressive web app, or PWA, also needs suitable app metadata and a useful installed and offline experience. Installation behavior varies by browser.\n\nDefine how updates, cache invalidation, offline fallback, and account separation work. Do not cache arbitrary authenticated API responses under one shared page-shell key. This example is a small offline shell, not a complete system for offline synchronization or a production PWA.",
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
            "A public API tells library users which behavior they can rely on. Keep supported entry points, options, lifecycle methods, and errors small and well documented. Distinguish an omitted option from an explicit value, and reject invalid combinations. Plugins need a defined extension contract and cleanup owner. They should not accidentally gain access to change arbitrary private state.\n\nVersion changes communicate changes to that public contract. Package exports define supported entry points. Type declarations help TypeScript users even when the implementation is JavaScript. If you advertise both ESM and CommonJS, provide genuinely compatible outputs for both. Test supported environments and browser/Node boundaries. A browser-only component cannot assume DOM APIs exist in Node.",
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
            "Review the package users will receive, not only the source in your repository. Documentation should cover setup, a complete usage example, options, lifecycle, support policy, and errors. Test the public entry point in a clean consumer project rather than relying only on imports from source files. Benchmark representative work with warm-up and realistic inputs. Very small synthetic measurements can mostly reflect timing noise or engine optimization.\n\nInspect npm pack output for missing files, accidental secrets, and unsupported formats. Publish only after selecting the real package name, reviewing the registry artifact, and meeting your release process. These commands create a local tarball; they do not publish it. Keep changelogs and upgrade tests to support backward compatibility.",
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
            "This binary search finds a matching index, or returns -1, in a sorted numeric array. Its complexity describes how resource use grows as input grows, not its exact running time. Under the stated model, a scan is O(n), a full scan inside another full scan is O(n²), and binary search is O(log n). Space complexity also includes extra data structures and recursion depth. A method with better growth may not be worthwhile for a tiny fixed collection. Measure the actual application.\n\nDefine ordering and duplicate-handling rules for searching and sorting. Maps can index repeated lookups, but JavaScript guarantees neither one specific Map representation nor universal constant-time behavior. Favor readable transformations and a stable contract before making small speed optimizations.",
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
            "This example visits each reachable node in a small graph once, even when the graph contains a cycle. A stack processes the newest item first. A queue processes the oldest item first. Trees can be traversed recursively or with a loop. Graphs can lead back to nodes already visited, so track visited nodes when repeats are not wanted. Backtracking explores a choice, undoes it, and tries another. Limit the search space and validate inputs before exploring untrusted structures.\n\nCaching the result of a repeated subproblem can help, but needs clear keys and a lifetime policy. For breadth-first traversal, which works through a queue, use an array with an index pointing to the next item. This avoids repeatedly shifting the whole queue.",
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
            "This small Babel 7 plugin changes a deliberately named string marker and leaves unrelated strings alone. It works on an abstract syntax tree, or AST, a structured representation of parsed code. Parsers and transformations need to preserve behavior, scope, supported syntax, and, when relevant, comments and source maps. Babel plugins visit AST nodes. Use parsing and traversal APIs rather than broad regex replacements on source text. Test both the generated output and its behavior before transforming real code.\n\nV8 and SpiderMonkey implement JavaScript through evolving parsing, interpretation, compilation, optimization, and garbage-collection strategies. Just-in-time, or JIT, compilation can specialize frequently run code. The engine can abandon that optimization when its assumptions stop holding. Do not base application architecture on guesses about those internals. Use profiles and identify the engine and version when researching them.",
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
            "This block separates localized presentation, language proposals, and predictable resource cleanup. Intl supports locale-aware number and date formatting, string comparison, plural rules, and segmentation. Availability depends on the particular API and runtime data. Keep machine-readable values separate from localized output. Symbols and proxies can support metaprogramming, but should make a public interface clearer rather than more obscure.\n\nTC39 proposals move through stages, including Stage 2.7. Stage 4 means the language proposal is finished, not that every deployed browser supports it. Review target compatibility before using resource-management syntax such as using or await using and its disposal protocols. Explicit try/finally cleanup remains a portable way to release resources predictably. It does not depend on waiting for garbage collection.",
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
            "This Node example creates a temporary directory and removes it in finally. Node provides server and tooling APIs rather than a browser DOM. Learn its module, process, filesystem, event-loop, and input/output rules separately from browser APIs.\n\nWebAssembly is another boundary: compiled modules run through a JavaScript host interface. It can suit computation-heavy work or an existing compiled codebase. For a small calculation, copying data and crossing the boundary can cost more than the calculation itself. WebAssembly does not automatically speed up DOM work or make arbitrary assumptions about native code safe. A complete integration needs an actual compiled module and documented imports and exports. Naming an unspecified .wasm file is not a complete example.",
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
  window.JavaScriptApiNotes?.bind(handbook);
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
    const notes = window.JavaScriptApiNotes?.decorate(code, file);
    if (notes) parent.insertBefore(notes, pre);
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
    window.JavaScriptApiNotes?.close();
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
      const link = node("a", chapter.name);
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
        window.JavaScriptInlineFunctions?.highlight(article, lesson);
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
