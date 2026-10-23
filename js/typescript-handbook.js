/* Topics and order follow typescript-mastery-roadmap.md. Examples are independent. */
const levels = [
  {
    number: 1,
    name: "Level 1 — TypeScript fundamentals",
    stage: "Beginner",
    goal: "Understand TypeScript syntax and confidently write basic applications without relying on `any`.",
    projectBrief:
      "Build a typed to-do application with add, edit, delete, filter, and completion functionality.",
    inventory: [
      {
        name: "What TypeScript is and how it differs from JavaScript",
        group: "Topics to cover",
      },
      {
        name: "TypeScript compiler (`tsc`) and how `.ts` becomes `.js`",
        group: "Topics to cover",
      },
      {
        name: "Type annotations and type inference",
        group: "Topics to cover",
      },
      {
        name: "Primitive types: `string`, `number`, `boolean`, `null`, `undefined`",
        group: "Topics to cover",
      },
      {
        name: "Special types: `any`, `unknown`, `never`, `void`",
        group: "Topics to cover",
      },
      {
        name: "Arrays and tuples",
        group: "Topics to cover",
      },
      {
        name: "Object types and optional properties",
        group: "Topics to cover",
      },
      {
        name: "`readonly` properties and arrays",
        group: "Topics to cover",
      },
      {
        name: "Union and literal types",
        group: "Topics to cover",
      },
      {
        name: "Intersection types",
        group: "Topics to cover",
      },
      {
        name: "Type aliases vs. interfaces",
        group: "Topics to cover",
      },
      {
        name: "Function parameter types and return types",
        group: "Topics to cover",
      },
      {
        name: "Optional, default, and rest parameters",
        group: "Topics to cover",
      },
      {
        name: "Type assertions (`as`) and non-null assertions (`!`)",
        group: "Topics to cover",
      },
      {
        name: "Basic `tsconfig.json` configuration",
        group: "Topics to cover",
      },
    ],
    lessons: [
      {
        name: "What TypeScript is and how it differs from JavaScript",
        group: "Topics to cover",
        explanation:
          "TypeScript checks how you use JavaScript values before the code runs. You describe the values that functions and objects expect, and the checker reports uses that do not match. These descriptions also help your editor suggest code, navigate definitions, and rename things safely.\n\nType annotations disappear from the generated JavaScript. You still need to understand JavaScript, test behavior, and validate outside input. Here the function expects numbers: 19.5 multiplied by 2 returns 39. Uncommenting the last line lets the checker flag a string argument. The generated JavaScript still needs suitable number inputs.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/basic-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'function total(price: number, quantity: number): number {\n  return price * quantity;\n}\nconsole.log(total(19.5, 2)); // 39\n// total("19.5", 2); // Error: string is not assignable to number.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "TypeScript compiler (`tsc`) and how `.ts` becomes `.js`",
        group: "Topics to cover",
        explanation:
          "The TypeScript compiler, tsc, checks your code and can produce JavaScript from .ts files. Browsers run the generated JavaScript, without its type annotations. Checking types and translating code are separate jobs: a tool that removes annotations does not necessarily check for errors.\n\nInstall the compiler in the project and keep its version in the lockfile so checks are repeatable. Run checking before shipping. This example supplies compiler options directly, so it works without a tsconfig file. The generated function no longer contains name: string. TypeScript 5.9.3 is used here as a reproducible reference, not as a claim about the latest release.",
        source:
          "https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "commands.sh",
            code: "npm init -y\nnpm pkg set type=module\nnpm install --save-dev typescript@5.9.3\nnpx tsc greeting.ts --strict --target ES2022 --module ESNext --outDir dist\nnode dist/greeting.js",
            language: "shell",
            check: true,
          },
          {
            name: "greeting.ts",
            code: 'function greet(name: string): string { return `Hello, ${name}`; }\nconsole.log(greet("Mira")); // Hello, Mira',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Type annotations and type inference",
        group: "Topics to cover",
        explanation:
          "A type annotation states the kind of value a variable holds. Write it after the name, separated by a colon. Type inference means the checker works out a type from the starting value or surrounding code, so you do not always need an annotation.\n\nUse lowercase string, number, and boolean for primitive values. String and Number name wrapper types. A variable declared with let score = 10 gets the type number because its value can change. A primitive declared with const can keep a specific literal type, such as \"ready\". const prevents reassignment; it does not make an object's contents immutable. The example allows a numeric increment and rejects assigning text.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'let score = 10; // inferred number\nscore += 5;\nconst label: string = "Points";\nconst ready: boolean = true;\nconst state = "ready"; // literal type "ready"\nconsole.log(label, score, ready, state); // Points 15 true ready\n// score = "fifteen"; // Error.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Primitive types: `string`, `number`, `boolean`, `null`, `undefined`",
        group: "Topics to cover",
        explanation:
          "Primitive types describe basic values such as strings, numbers, and booleans. Use their lowercase names. With strictNullChecks enabled, null and undefined are separate types. Include them explicitly when a value may be missing.\n\nnumber covers integers and fractions, but does not guarantee a finite value. Use a union when absence has meaning. Here a missing score differs from zero, and the username can be assigned later. A type declaration does not supply a default value or validate arbitrary input.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'let username: string | undefined;\nconst score: number | null = 0;\nconst active: boolean = true;\nusername = "Mira";\nconsole.log(username.toUpperCase(), score ?? "Not scored", active); // MIRA 0 true\n// const missing: string = null; // Error under strictNullChecks.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Special types: `any`, `unknown`, `never`, `void`",
        group: "Topics to cover",
        explanation:
          "any turns off useful type checking for a value. unknown accepts any value but requires a check before you use it as a specific type. Use unknown for outside input and concrete types inside the application. Do not use any merely to hide an unexplained error.\n\nvoid describes a function whose return value is ignored. never describes a value that cannot occur, including the result of a function that never returns normally. The examples check an unknown value before calling a string method, log a message without returning a useful value, and throw on a path that cannot return normally.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'function logValue(value: unknown): void {\n  if (typeof value === "string") console.log(value.toUpperCase());\n  else console.log("Not a string");\n}\nfunction fail(message: string): never { throw new Error(message); }\nlogValue("ready"); // READY\n// const unchecked: any = 42; unchecked.missing(); // Compiles, but would fail.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Arrays and tuples",
        group: "Topics to cover",
        explanation:
          "An array holds a sequence of values with a shared element type. number[] and Array<number> both describe number arrays. A tuple describes specific positions: [number, string] requires a number first and a string second.\n\nTuples are still arrays at runtime. A readonly tuple prevents writes through that reference; it does not validate outside data. In the example, map infers that each price is a number. Destructuring the tuple keeps the id typed as number and the title typed as string.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'const prices: number[] = [10, 20];\nconst labels = prices.map(price => `$${price.toFixed(2)}`);\nconst result: readonly [id: number, title: string] = [1, "Book"];\nconst [id, title] = result;\nconsole.log(labels, id, title.toUpperCase());',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Object types and optional properties",
        group: "Topics to cover",
        explanation:
          "An object type describes the properties a value must have. A question mark marks an optional property. Reading an optional property can produce undefined, so handle that possibility.\n\nThis description does not create an object or validate a server response. TypeScript generally checks an object's shape: an existing value may have extra fields if the required fields fit. Fresh object literals receive extra-property checks that help catch typos. The example uses ?? to provide display text when the optional nickname is missing.",
        source: "https://www.typescriptlang.org/docs/handbook/2/objects.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type Profile = {\n  id: number;\n  name: string;\n  nickname?: string;\n};\nconst profile: Profile = { id: 1, name: "Mira" };\nfunction displayName(person: Profile): string {\n  return person.nickname ?? person.name;\n}\nconsole.log(displayName(profile)); // Mira',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`readonly` properties and arrays",
        group: "Topics to cover",
        explanation:
          "readonly prevents changes through a particular type. A readonly array has no mutating methods such as push. Use it for an input that your function should read without promising to change it.\n\nThis is a checking rule, not a runtime freeze. Another reference may still change the same data. It is also shallow: a readonly object property cannot be replaced, but an array stored there can remain mutable. The sum function only reads its input. The cart example cannot replace items through its readonly property, but can still push into the array.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-properties",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'function sum(values: readonly number[]): number {\n  return values.reduce((total, value) => total + value, 0);\n}\nconst cart: { readonly items: string[] } = { items: ["Book"] };\ncart.items.push("Pen"); // Allowed: the array itself is mutable.\nconsole.log(sum([10, 20]), cart.items.length); // 30 2\n// cart.items = []; // Error: readonly property.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Union and literal types",
        group: "Topics to cover",
        explanation:
          "A union allows one of several types. A literal type restricts a value to a specific choice, such as \"draft\" or \"published\". Before checking which union member you have, you can only use operations supported by every possible member.\n\nThe example accepts an id that is a number or a string. Both support toString, but only a number supports toFixed. The typeof check makes that numeric operation safe. Declaring a union does not convert the value.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type PublicationState = "draft" | "published";\nfunction formatId(id: string | number): string {\n  if (typeof id === "number") return id.toFixed(0);\n  return id.toUpperCase();\n}\nconst state: PublicationState = "draft";\nconsole.log(formatId(42), formatId("u1"), state); // 42 U1 draft',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Intersection types",
        group: "Topics to cover",
        explanation:
          "An intersection requires a value to satisfy all the types joined by &. It is useful for combining object requirements, such as an identified record and timestamp fields.\n\nAn intersection does not merge objects at runtime. You must construct a value with all the required fields. Conflicting requirements for the same property can produce never, meaning no value can satisfy them. The example combines compatible fields and supplies each one.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type Identified = { id: string };\ntype Timestamped = { createdAt: Date };\ntype StoredItem = Identified & Timestamped;\nconst item: StoredItem = { id: "item-1", createdAt: new Date("2026-01-01") };\nconsole.log(item.id, item.createdAt.getUTCFullYear()); // item-1 2026\n// type Impossible = { id: string } & { id: number }; // id becomes never.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Type aliases vs. interfaces",
        group: "Topics to cover",
        explanation:
          "Type aliases and interfaces both give names to object shapes. An interface can extend compatible object types, and declarations with the same interface name can merge. A type alias can also name primitives, unions, tuples, and computed types, but cannot be reopened in that way.\n\nChoose according to the shape you need and the project's conventions. Neither changes runtime behavior. The example extends an identity interface into a user shape, uses an alias for a status union, and shows an equivalent object alias.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'interface Identified { id: string }\ninterface User extends Identified { name: string }\ntype UserShape = { id: string; name: string };\ntype Status = "active" | "paused";\nconst user: User = { id: "u1", name: "Mira" };\nconst copy: UserShape = user; // Compatible shape.\nconst status: Status = "active";\nconsole.log(copy.name, status); // Mira active',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Function parameter types and return types",
        group: "Topics to cover",
        explanation:
          "Function annotations describe accepted arguments and returned values. Put each parameter's type after its name and the return type after the closing parenthesis. The checker then checks calls and results against that contract.\n\nIt can often infer the return type. An explicit return type is useful at a public boundary because an unintended change is reported at the function. Both invoice examples return a number, including the arrow function form. A numeric string still needs parsing; an annotation does not convert it.",
        source: "https://www.typescriptlang.org/docs/handbook/2/functions.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'function invoiceTotal(price: number, quantity: number): number {\n  return price * quantity;\n}\nconst addTax = (amount: number, rate: number): number => amount * (1 + rate);\nconst subtotal = invoiceTotal(20, 3);\nconsole.log(addTax(subtotal, 0.2)); // 72\n// invoiceTotal("20", 3); // Error, not automatic conversion.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Optional, default, and rest parameters",
        group: "Topics to cover",
        explanation:
          "An optional parameter may be omitted and can be undefined inside the function. A default supplies a value when the argument is omitted or is undefined. A rest parameter collects remaining arguments into an array and must be last.\n\nThese choices describe what callers may leave out. Do not mark a callback parameter optional merely because a callback can ignore it. The example combines default formatting settings with a rest parameter for any number of scores.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-parameters",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'function summarize(label = "Total", ...scores: number[]): string {\n  return `${label}: ${scores.reduce((sum, score) => sum + score, 0)}`;\n}\nfunction greet(name?: string): string { return `Hi, ${name ?? "guest"}`; }\nconsole.log(summarize(undefined, 10, 20)); // Total: 30\nconsole.log(greet()); // Hi, guest',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Type assertions (`as`) and non-null assertions (`!`)",
        group: "Topics to cover",
        explanation:
          "as tells the checker to trust a type assertion; it does not convert or validate a value. The non-null assertion, !, removes null and undefined from the checked type without adding a runtime check. Both can hide failures.\n\nPrefer checking the value when possible. The example verifies the selected element with instanceof before reading value. The commented assertions would compile even if the element were missing or had the wrong tag. Reserve assertions for cases where you can justify the assumption, as later examples discuss.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions",
        environment: "browser",
        requires: "Browser DOM; compile with the Level 1 setup",
        files: [
          {
            name: "index.ts",
            code: '// HTML: <input id="email" type="email">\nconst element = document.querySelector("#email");\nif (element instanceof HTMLInputElement) {\n  console.log(element.value);\n}\n// const input = document.querySelector("#email") as HTMLInputElement;\n// input!.value; // Neither assertion creates or validates an input element.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Basic `tsconfig.json` configuration",
        group: "Topics to cover",
        explanation:
          "tsconfig.json defines which files belong to a TypeScript project and how checking and output work. strict enables a group of checks. target controls generated syntax. lib supplies descriptions of available APIs; including DOM descriptions does not create browser APIs in Node.\n\nThis learning configuration assumes a browser app built by a bundler. noEmit leaves output to Vite and uses tsc for checking. rootDir concerns file layout when emitting output. moduleDetection keeps lesson files' top-level names separate. Run npx tsc -p . to use this configuration: supplying source filenames directly on the command line bypasses it.",
        source: "https://www.typescriptlang.org/tsconfig/",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "tsconfig.json",
            code: '{\n  "compilerOptions": {\n    "target": "ES2022", "lib": ["ES2022", "DOM", "DOM.Iterable"],\n    "module": "ESNext", "moduleResolution": "bundler",\n    "moduleDetection": "force", "rootDir": "src",\n    "strict": true, "noEmit": true\n  },\n  "include": ["src"]\n}',
            language: "json",
            check: true,
          },
          {
            name: "src/main.ts",
            code: 'const message: string = "The checker is ready";\nconsole.log(message);',
            language: "ts",
            check: true,
          },
        ],
      },
    ],
    project: {
      title: "Typed todo application",
      steps: [
        "Start with the Level 1 browser configuration and a Vite vanilla TypeScript project. Put the controls below in index.html and the TypeScript in src/main.ts.",
        "Keep Todo[] as the source of truth. Derive the visible list from the filter instead of removing hidden items from state.",
        "Add persistence only after add, edit, delete, completion, and filtering work; treat parsed storage as unknown.",
      ],
      acceptance: [
        "Empty titles are rejected; adding and editing preserve the id.",
        "Each task can be completed, deleted, and found through all three filters.",
        "User text is rendered with textContent; strict checking passes.",
      ],
      files: [
        {
          name: "index.html",
          code: '<form id="add"><label>Task <input id="title" required></label><button>Add</button></form>\n<label>Show <select id="filter"><option value="all">All</option><option value="active">Active</option><option value="done">Done</option></select></label>\n<ul id="tasks"></ul>\n<script type="module" src="/src/main.ts"></script>',
          language: "html",
          check: true,
        },
        {
          name: "src/main.ts",
          code: 'type Todo = { id: string; title: string; done: boolean };\ntype Filter = "all" | "active" | "done";\nlet todos: Todo[] = [];\nlet filter: Filter = "all";\nconst form = document.querySelector("#add");\nconst title = document.querySelector("#title");\nconst select = document.querySelector("#filter");\nconst list = document.querySelector("#tasks");\nif (!(form instanceof HTMLFormElement) || !(title instanceof HTMLInputElement)\n  || !(select instanceof HTMLSelectElement) || !(list instanceof HTMLUListElement)) {\n  throw new Error("Missing todo controls");\n}\nconst taskList = list;\nfunction render(): void {\n  taskList.replaceChildren();\n  for (const todo of todos.filter(t => filter === "all" || t.done === (filter === "done"))) {\n    const row = document.createElement("li");\n    const label = document.createElement("label");\n    const toggle = document.createElement("input");\n    toggle.type = "checkbox"; toggle.checked = todo.done;\n    toggle.addEventListener("change", () => { todo.done = toggle.checked; render(); });\n    label.append(toggle, document.createTextNode(todo.title));\n    const edit = document.createElement("button"); edit.textContent = "Edit";\n    edit.addEventListener("click", () => {\n      const next = window.prompt("Task title", todo.title)?.trim();\n      if (next) { todo.title = next; render(); }\n    });\n    const remove = document.createElement("button"); remove.textContent = "Delete";\n    remove.addEventListener("click", () => {\n      todos = todos.filter(t => t.id !== todo.id); render();\n    });\n    row.append(label, edit, remove); taskList.append(row);\n  }\n}\nform.addEventListener("submit", event => {\n  event.preventDefault();\n  const text = title.value.trim();\n  if (!text) return;\n  todos.push({ id: crypto.randomUUID(), title: text, done: false });\n  title.value = ""; render(); title.focus();\n});\nselect.addEventListener("change", () => {\n  const value = select.value;\n  if (value === "all" || value === "active" || value === "done") { filter = value; render(); }\n});\nrender();',
          language: "ts",
          check: true,
        },
      ],
    },
  },
  {
    number: 2,
    name: "Level 2 — Type narrowing and browser APIs",
    stage: "Beginner → Intermediate",
    goal: "Use TypeScript confidently for the frontend work you already do.",
    projectBrief: "Create a reusable form validation library using TypeScript.",
    inventory: [
      {
        name: "Type narrowing and control flow analysis",
        group: "Topics to cover",
      },
      {
        name: "`typeof`, `instanceof`, and `in` operators",
        group: "Topics to cover",
      },
      {
        name: "Equality and truthiness narrowing",
        group: "Topics to cover",
      },
      {
        name: "Custom type guards",
        group: "Topics to cover",
      },
      {
        name: "Discriminated unions",
        group: "Topics to cover",
      },
      {
        name: "Null and undefined handling",
        group: "Topics to cover",
      },
      {
        name: "Optional chaining (`?.`) and nullish coalescing (`??`)",
        group: "Topics to cover",
      },
      {
        name: "DOM element types: `HTMLElement`, `HTMLInputElement`, `HTMLFormElement`, etc.",
        group: "Topics to cover",
      },
      {
        name: "`querySelector<T>()` and `querySelectorAll<T>()`",
        group: "Topics to cover",
      },
      {
        name: "Event types: `Event`, `MouseEvent`, `KeyboardEvent`, `SubmitEvent`",
        group: "Topics to cover",
      },
      {
        name: "`event.target` vs. `event.currentTarget`",
        group: "Topics to cover",
      },
      {
        name: "DOM manipulation and event delegation",
        group: "Topics to cover",
      },
      {
        name: "Form validation and `FormData`",
        group: "Topics to cover",
      },
      {
        name: "Fetch API, Promises, `async`/`await`",
        group: "Topics to cover",
      },
      {
        name: "Error handling with `try/catch` and `unknown`",
        group: "Topics to cover",
      },
    ],
    lessons: [
      {
        name: "Type narrowing and control flow analysis",
        group: "Topics to cover",
        explanation:
          "Narrowing means using evidence from the code to reduce the types a value can have at a particular point. The checker follows branches, assignments, and returns. A variable's declared type still controls future assignments; its narrowed type describes what is possible here.\n\nKeep checks near the code that needs them. This function returns early for null, then uses typeof to distinguish numbers from strings without an assertion. For work in a later callback, capture a stable local value rather than assuming mutable state stays unchanged.",
        source: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'function format(value: string | number | null): string {\n  if (value === null) return "Missing";\n  if (typeof value === "number") return value.toFixed(2);\n  return value.toUpperCase();\n}\nconsole.log(format(12), format(null)); // 12.00 Missing',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`typeof`, `instanceof`, and `in` operators",
        group: "Topics to cover",
        explanation:
          "typeof checks a primitive value's category. instanceof checks its relationship to a runtime constructor. in checks whether a property exists. These JavaScript operations also give the checker evidence for narrowing.\n\nRemember that typeof null is \"object\", so check for null before treating an object as usable. Interfaces disappear during compilation and cannot be checked with instanceof. The examples use actual class instances and property checks to distinguish error shapes.",
        source: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'function describe(value: string | Date | { error: string }): string {\n  if (typeof value === "string") return value.toUpperCase();\n  if (value instanceof Date) return value.toISOString();\n  if ("error" in value) return value.error;\n  return "Unreachable";\n}\nconsole.log(describe({ error: "Try again" }));',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Equality and truthiness narrowing",
        group: "Topics to cover",
        explanation:
          "Equality checks can distinguish exact alternatives. Truthiness checks also remove falsy values, including an empty string and zero. That makes a truthiness check different from a check for a missing value.\n\nCompare explicitly with null or undefined when empty text or zero is meaningful. The first example preserves an empty string. The second preserves zero while filtering numeric input. Choose the check that matches the values you intend to keep.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#truthiness-narrowing",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'function title(value: string | null): string {\n  return value === null ? "Untitled" : value;\n}\nfunction scoreLabel(value: number | undefined): string {\n  return value === undefined ? "Not scored" : String(value);\n}\nconsole.log(title(""), scoreLabel(0)); // "" and "0"',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Custom type guards",
        group: "Topics to cover",
        explanation:
          "A custom type guard combines a runtime check with a predicate return type, such as value is User. When it returns true, the checker treats the value as that type. It trusts this promise, so an incomplete check can make later code unsafe.\n\nFor a union, returning false can also exclude the promised type. A guard that checks for a positive number must not claim to identify every number. Keep guards small and check the full shape they promise. The User guard checks the required fields, allowing filter to produce a User array.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type User = { id: string; name: string };\nfunction isUser(value: unknown): value is User {\n  return typeof value === "object" && value !== null\n    && "id" in value && typeof value.id === "string"\n    && "name" in value && typeof value.name === "string";\n}\nconst values: unknown[] = [{ id: "u1", name: "Mira" }, { name: 42 }, null];\nconst users = values.filter(isUser); // User[]\nconsole.log(users.map(user => user.name)); // ["Mira"]',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Discriminated unions",
        group: "Topics to cover",
        explanation:
          "A discriminated union represents alternatives with a shared property whose literal value identifies each case. Checking that property narrows the whole object, making the fields for that case available.\n\nThis models valid combinations more clearly than unrelated optional fields. The example gives successful results data and failed results an error message. A switch handles each case. Adding an idle case means updating the function to keep its promised string return under strict checking.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type Result =\n  | { status: "success"; data: string[] }\n  | { status: "error"; message: string };\nfunction render(result: Result): string {\n  switch (result.status) {\n    case "success": return result.data.join(", ");\n    case "error": return `Error: ${result.message}`;\n  }\n}\nconsole.log(render({ status: "success", data: ["Book", "Pen"] })); // Book, Pen',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Null and undefined handling",
        group: "Topics to cover",
        explanation:
          "With strict null checking, possible absence is part of a value's type. querySelector can return null, find can return undefined, and optional properties may be missing. Decide whether absence is normal, needs a fallback, or indicates invalid setup.\n\nA guard or early return supplies evidence before use. Throw when a required setup condition is missing. An assertion with ! only hides the possibility from the checker. This binding helper reports a missing required control instead of continuing with an invalid assumption.",
        source: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
        environment: "browser",
        requires: "Browser DOM; compile with the Level 1 setup",
        files: [
          {
            name: "index.ts",
            code: 'function bindSave(): void {\n  const button = document.querySelector("#save");\n  if (!(button instanceof HTMLButtonElement)) {\n    throw new Error("Expected a button with id=save");\n  }\n  button.addEventListener("click", () => console.log("Saved"));\n}\n// Call bindSave() after rendering <button id="save">Save</button>.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Optional chaining (`?.`) and nullish coalescing (`??`)",
        group: "Topics to cover",
        explanation:
          "Optional chaining, ?., stops access when its receiver is null or undefined. The nullish coalescing operator, ??, supplies a fallback only for those two values. It preserves valid values such as zero, false, and an empty string.\n\nNeither checks the shape of a non-null value. Use them with an appropriate type describing optional relationships. The example safely reads an optional profile and nickname while keeping a count of zero.",
        source:
          "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type User = { profile?: { nickname?: string }; visits?: number };\nfunction label(user: User): string {\n  const nickname = user.profile?.nickname ?? "Guest";\n  const visits = user.visits ?? 0;\n  return `${nickname}: ${visits}`;\n}\nconsole.log(label({ visits: 0 })); // Guest: 0',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "DOM element types: `HTMLElement`, `HTMLInputElement`, `HTMLFormElement`, etc.",
        group: "Topics to cover",
        explanation:
          "DOM types describe different browser elements. HTMLElement provides common HTML features. HTMLInputElement adds fields such as value and checked. HTMLFormElement describes form features, while SVGElement belongs to a separate element family.\n\nA selector's text does not prove which element exists at runtime. Use instanceof when the markup may vary. This helper checks that the selected node is a real input before reading its value.",
        source:
          "https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement",
        environment: "browser",
        requires: "Browser DOM; compile with the Level 1 setup",
        files: [
          {
            name: "index.ts",
            code: 'function requireInput(selector: string): HTMLInputElement {\n  const element = document.querySelector(selector);\n  if (!(element instanceof HTMLInputElement)) throw new Error(`Missing input: ${selector}`);\n  return element;\n}\n// HTML: <input id="email" type="email">\n// const email = requireInput("#email"); console.log(email.value);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`querySelector<T>()` and `querySelectorAll<T>()`",
        group: "Topics to cover",
        explanation:
          "The type parameter in querySelector<T> or querySelectorAll<T> states the element type you expect. It does not check the selected elements at runtime. A wrong selector can therefore give a misleading type. querySelector can still return null.\n\nA typed selector can suit markup you control. Use runtime checks when you have less control. querySelectorAll returns a NodeList, not an array; Array.from converts it when you need an array. The example verifies that the selected elements are inputs.",
        source:
          "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector",
        environment: "browser",
        requires: "Browser DOM; compile with the Level 1 setup",
        files: [
          {
            name: "index.ts",
            code: '// Controlled markup can use document.querySelector<HTMLInputElement>("#email").\nconst candidates = document.querySelectorAll("input[data-trim]");\nfor (const element of candidates) {\n  if (element instanceof HTMLInputElement) element.value = element.value.trim();\n}\nconst button = document.querySelector<HTMLButtonElement>("button.save");\nbutton?.addEventListener("click", () => console.log("Save"));',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Event types: `Event`, `MouseEvent`, `KeyboardEvent`, `SubmitEvent`",
        group: "Topics to cover",
        explanation:
          "Event is the base DOM event type. More specific types expose additional information: MouseEvent has coordinates, KeyboardEvent has keys, and SubmitEvent has a submitter. These are native browser types, not the React event wrappers introduced at Level 6.\n\naddEventListener can infer an event type from the event name and listening object. Keep that inference instead of unnecessarily widening the parameter to Event. The examples read key and clientX from appropriately typed events.",
        source: "https://developer.mozilla.org/en-US/docs/Web/API/Event",
        environment: "browser",
        requires: "Browser DOM; compile with the Level 1 setup",
        files: [
          {
            name: "index.ts",
            code: 'const button = document.createElement("button");\nbutton.textContent = "Activate";\nbutton.addEventListener("click", event => console.log(event.clientX)); // MouseEvent\nbutton.addEventListener("keydown", event => { // KeyboardEvent\n  if (event.key === "Escape") button.blur();\n});\nconst form = document.createElement("form");\nform.addEventListener("submit", (event: SubmitEvent) => event.preventDefault());',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`event.target` vs. `event.currentTarget`",
        group: "Topics to cover",
        explanation:
          "An event's target is where it originated, which may be a nested child. currentTarget is the object whose listener is running. Native event types describe these broadly, and currentTarget is meaningful during event dispatch.\n\nFor a direct listener, you can use the known element captured by the function. For delegation, check target and find the relevant ancestor with closest. In the example, clicking a span inside a button still finds and updates the intended button without an unchecked assertion.",
        source:
          "https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget",
        environment: "browser",
        requires: "Browser DOM; compile with the Level 1 setup",
        files: [
          {
            name: "index.ts",
            code: 'const button = document.createElement("button");\nbutton.innerHTML = "<span>Save</span>"; // Fixed trusted markup only.\nbutton.addEventListener("click", event => {\n  console.log(event.target, event.currentTarget);\n  button.disabled = true; // Known element, no event-target assertion.\n});\ndocument.body.append(button);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "DOM manipulation and event delegation",
        group: "Topics to cover",
        explanation:
          "Event delegation uses one listener on a parent to handle events from its children. Check that target is an Element, find the relevant ancestor with closest, and confirm it belongs to the intended component. This also handles children added later without attaching new listeners.\n\nThe example removes items only for matching buttons inside the list. It checks the action attribute and the element's runtime capabilities. Use textContent for user-provided strings instead of inserting them as HTML.",
        source:
          "https://developer.mozilla.org/en-US/docs/Web/API/Element/closest",
        environment: "browser",
        requires: "Browser DOM; compile with the Level 1 setup",
        files: [
          {
            name: "index.ts",
            code: 'const list = document.createElement("ul");\nlist.innerHTML = \'<li>Book <button type="button" data-remove>Remove</button></li>\';\nlist.addEventListener("click", event => {\n  if (!(event.target instanceof Element)) return;\n  const button = event.target.closest("button[data-remove]");\n  if (!(button instanceof HTMLButtonElement) || !list.contains(button)) return;\n  button.closest("li")?.remove();\n});\ndocument.body.append(list);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Form validation and `FormData`",
        group: "Topics to cover",
        explanation:
          "FormData values can be strings or Files, and a missing field returns null. Check the value before trimming or parsing it. A type annotation on a form model does not validate submitted data.\n\nCombine native form constraints with checks for your application's rules. This example rejects missing or non-string email input, checks validity, and then normalizes the value. Useful feedback must be tied to the input; rendering accessible messages and managing focus remain the component's responsibility.",
        source: "https://developer.mozilla.org/en-US/docs/Web/API/FormData/get",
        environment: "browser",
        requires: "Browser DOM; compile with the Level 1 setup",
        files: [
          {
            name: "index.ts",
            code: 'function readEmail(form: HTMLFormElement): string {\n  if (!form.reportValidity()) throw new Error("Complete the required fields");\n  const value = new FormData(form).get("email");\n  if (typeof value !== "string" || !value.trim()) throw new Error("Email is required");\n  return value.trim().toLowerCase();\n}\n// Markup: <form><input name="email" type="email" required></form>\n// Bind submit, preventDefault(), then call readEmail(form).',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Fetch API, Promises, `async`/`await`",
        group: "Topics to cover",
        explanation:
          "fetch returns a promise, and async functions use await to read resolved values. An HTTP error response does not itself reject fetch, so check response.ok separately. Treat parsed JSON as unknown until its shape has been checked.\n\nThis loader checks a small response shape before reading the name. It accepts an AbortSignal so the caller can cancel work when leaving. Defining the function does not send a request; calling it requires a real endpoint.",
        source:
          "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
        environment: "browser",
        requires: "Browser DOM; compile with the Level 1 setup",
        files: [
          {
            name: "index.ts",
            code: 'async function loadName(url: string, signal?: AbortSignal): Promise<string> {\n  const response = await fetch(url, { signal });\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  const data: unknown = await response.json();\n  if (typeof data !== "object" || data === null\n      || !("name" in data) || typeof data.name !== "string") {\n    throw new Error("Invalid response shape");\n  }\n  return data.name;\n}',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Error handling with `try/catch` and `unknown`",
        group: "Topics to cover",
        explanation:
          "JavaScript can throw any value. Under strict checking, a catch variable is unknown, so check it before reading properties such as message. Decide which failures you can recover from rather than silently treating every failure as success or losing useful context.\n\nThe helper turns a caught value into a readable message, and the try/catch makes handling explicit. Treat cancellation separately when it is an expected part of the operation's lifecycle.",
        source:
          "https://www.typescriptlang.org/tsconfig/#useUnknownInCatchVariables",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: "function errorMessage(error: unknown): string {\n  return error instanceof Error ? error.message : String(error);\n}\nfunction parseJson(text: string): unknown {\n  try { return JSON.parse(text) as unknown; }\n  catch (error) { throw new Error(`Invalid JSON: ${errorMessage(error)}`); }\n}\nconsole.log(parseJson('{\"ready\":true}'));",
            language: "ts",
            check: true,
          },
        ],
      },
    ],
    project: {
      title: "Reusable form validator",
      steps: [
        "Keep validation independent of the DOM. A rule returns an error message or undefined, and each field has a typed value.",
        "Use the generic helper below for different value types. Then create a form adapter that reads inputs, displays messages, and focuses the first invalid field.",
        "Distinguish synchronous checks from asynchronous server checks; avoid claiming that a client check guarantees uniqueness.",
      ],
      acceptance: [
        "Two forms can reuse the same rules without shared mutable state.",
        "Empty, malformed, and valid inputs have explicit tests.",
        "Messages are associated with their input using aria-describedby; submit succeeds only when all fields pass.",
      ],
      files: [
        {
          name: "validator.ts",
          code: 'type Rule<T> = (value: T) => string | undefined;\ntype Validation = { valid: true } | { valid: false; errors: string[] };\nfunction validate<T>(value: T, rules: readonly Rule<T>[]): Validation {\n  const errors = rules.map(rule => rule(value)).filter((x): x is string => x !== undefined);\n  return errors.length ? { valid: false, errors } : { valid: true };\n}\nconst required: Rule<string> = value => value.trim() ? undefined : "Required";\nconst minLength = (min: number): Rule<string> => value =>\n  value.length >= min ? undefined : `Use at least ${min} characters`;\nconst positive: Rule<number> = value => value > 0 ? undefined : "Must be positive";\nconsole.log(validate("Mira", [required, minLength(3)])); // { valid: true }\nconsole.log(validate(0, [positive])); // { valid: false, errors: [...] }',
          language: "ts",
          check: true,
        },
      ],
    },
  },
  {
    number: 3,
    name: "Level 3 — Generics and reusable type design",
    stage: "Intermediate",
    goal: "Learn to write reusable functions, components, and utilities that preserve type information automatically.",
    projectBrief:
      "Convert your existing vanilla JavaScript Tooltip library into a fully typed TypeScript library, with a generic-friendly public API, configuration options, callbacks, and type-safe methods.",
    inventory: [
      {
        name: "Generic functions",
        group: "Topics to cover",
      },
      {
        name: "Generic interfaces and type aliases",
        group: "Topics to cover",
      },
      {
        name: "Generic constraints (`extends`)",
        group: "Topics to cover",
      },
      {
        name: "Multiple generic parameters",
        group: "Topics to cover",
      },
      {
        name: "Default generic types",
        group: "Topics to cover",
      },
      {
        name: "`keyof` operator",
        group: "Topics to cover",
      },
      {
        name: "`typeof` type operator",
        group: "Topics to cover",
      },
      {
        name: "Indexed access types (`T[K]`)",
        group: "Topics to cover",
      },
      {
        name: "`as const` assertions",
        group: "Topics to cover",
      },
      {
        name: "`satisfies` operator",
        group: "Topics to cover",
      },
      {
        name: "Function overloads",
        group: "Topics to cover",
      },
      {
        name: "Call signatures and construct signatures",
        group: "Topics to cover",
      },
      {
        name: "Type predicates (`value is Type`)",
        group: "Topics to cover",
      },
      {
        name: "Assertion functions (`asserts`)",
        group: "Topics to cover",
      },
      {
        name: "Exhaustive checking with `never`",
        group: "Topics to cover",
      },
      {
        name: "`Partial<T>`",
        group: "Built-in utility types",
      },
      {
        name: "`Required<T>`",
        group: "Built-in utility types",
      },
      {
        name: "`Readonly<T>`",
        group: "Built-in utility types",
      },
      {
        name: "`Pick<T, K>`",
        group: "Built-in utility types",
      },
      {
        name: "`Omit<T, K>`",
        group: "Built-in utility types",
      },
      {
        name: "`Record<K, V>`",
        group: "Built-in utility types",
      },
      {
        name: "`Exclude<T, U>`",
        group: "Built-in utility types",
      },
      {
        name: "`Extract<T, U>`",
        group: "Built-in utility types",
      },
      {
        name: "`NonNullable<T>`",
        group: "Built-in utility types",
      },
      {
        name: "`ReturnType<T>`",
        group: "Built-in utility types",
      },
      {
        name: "`Parameters<T>`",
        group: "Built-in utility types",
      },
      {
        name: "`Awaited<T>`",
        group: "Built-in utility types",
      },
    ],
    lessons: [
      {
        name: "Generic functions",
        group: "Topics to cover",
        explanation:
          "A generic function uses a type parameter to preserve a relationship between its inputs and output. The type is selected or inferred when you call the function. Using any would lose that relationship.\n\nA constraint such as T extends { id: string } states what the function needs while preserving extra fields. The examples keep the first element's actual type, including undefined for an empty array, and accept different object shapes that have a string id.",
        source: "https://www.typescriptlang.org/docs/handbook/2/generics.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'function first<T>(values: readonly T[]): T | undefined {\n  return values[0];\n}\nfunction identify<T extends { id: string }>(value: T): string {\n  return value.id;\n}\nconst name = first(["Mira", "Alex"]); // string | undefined\nconst score = first<number>([10, 20]); // explicit type argument\nconsole.log(name?.toUpperCase(), score, identify({ id: "u1", age: 28 }));',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Generic interfaces and type aliases",
        group: "Topics to cover",
        explanation:
          "Generic interfaces and aliases describe reusable shapes whose parts are connected by a type parameter. Supplying that parameter does not create data, fetch it, or validate it.\n\nApiResponse<T> describes a response whose payload has already been checked. Nullable<T> allows absence. A response containing a number keeps that payload type and cannot be used as though it contained a user.",
        source: "https://www.typescriptlang.org/docs/handbook/2/generics.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'interface ApiResponse<T> { data: T; requestId: string }\ntype Nullable<T> = T | null;\ntype User = { id: string; name: string };\nconst response: ApiResponse<User> = { data: { id: "u1", name: "Mira" }, requestId: "r1" };\nconst selected: Nullable<User> = response.data;\nconsole.log(selected.name);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Generic constraints (`extends`)",
        group: "Topics to cover",
        explanation:
          "A generic constraint states which capabilities an input must provide. T extends a required shape lets the implementation use those fields while retaining the caller's additional fields. An unconstrained T does not justify reading id.\n\nAsk for the smallest shape the function needs. Requiring a string id allows users, products, and other models to share this helper. Its result keeps the original input type.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'function withLog<T extends { id: string }>(value: T): T {\n  console.log(`Record ${value.id}`);\n  return value;\n}\nconst product = withLog({ id: "p1", price: 20 });\nconsole.log(product.price); // Still number.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Multiple generic parameters",
        group: "Topics to cover",
        explanation:
          "Multiple type parameters keep separate types connected without merging them into one broad union. Each parameter should represent a useful relationship rather than add complexity on its own.\n\nThis mapping helper connects the input element type, the callback parameter, and the output element type. The checker infers that mapping numbers to labels produces string[], without an assertion.",
        source: "https://www.typescriptlang.org/docs/handbook/2/generics.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: "function mapValues<Input, Output>(values: readonly Input[], map: (value: Input) => Output): Output[] {\n  return values.map(map);\n}\nconst labels = mapValues([10, 20], value => `$${value}`); // string[]\nconsole.log(labels);",
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Default generic types",
        group: "Topics to cover",
        explanation:
          "A generic default supplies a type when the caller neither provides one nor gives enough information to infer it. The default must satisfy any constraint. Required type parameters come before parameters with defaults.\n\nUse defaults for a documented common case, not to disguise unvalidated input. Page defaults to text items but can describe another model when a type is supplied. Document this choice as part of the API's ordinary behavior.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-parameter-defaults",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type Page<T = string> = { items: T[]; nextCursor: string | null };\nconst names: Page = { items: ["Mira"], nextCursor: null };\nconst ids: Page<number> = { items: [1, 2], nextCursor: "p2" };\nconsole.log(names.items, ids.items);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`keyof` operator",
        group: "Topics to cover",
        explanation:
          "keyof produces a union of a type's property keys. For an object with id and name, that union is \"id\" | \"name\". It is a type operation, not a function that lists keys at runtime.\n\nUse it to keep accepted key arguments aligned with a model as the model changes. A string index signature usually produces string | number because numeric property access can refer to string keys. The example accepts known keys and rejects a typo.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/keyof-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type User = { id: string; name: string };\ntype UserKey = keyof User; // "id" | "name"\nfunction printField(user: User, key: UserKey): void {\n  console.log(user[key]);\n}\nprintField({ id: "u1", name: "Mira" }, "name"); // Mira\n// printField({ id: "u1", name: "Mira" }, "email"); // Error.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`typeof` type operator",
        group: "Topics to cover",
        explanation:
          "typeof in a type expression captures the type of an existing value. This helps reuse the shape of a function or configuration without copying it. Runtime typeof instead returns a category string.\n\nThe captured type reflects what was inferred. It does not automatically preserve every literal: a mutable theme property usually becomes string. The example contrasts the type query with the runtime operation and checks another object against the captured shape.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/typeof-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'const defaults = { theme: "dark", compact: false };\ntype Settings = typeof defaults; // { theme: string; compact: boolean }\nconst custom: Settings = { theme: "light", compact: true };\nconst runtimeCategory = typeof custom; // "object" at runtime\nconsole.log(custom.theme, runtimeCategory); // light object',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Indexed access types (`T[K]`)",
        group: "Topics to cover",
        explanation:
          "An indexed access type, T[K], reads a property's type from another type. Constrain K to keyof T so the key belongs to that object. This connects a lookup's return type to the particular key supplied.\n\nIn getProperty, looking up name returns a string and age returns a number. A misspelled key is rejected. An unconstrained string key could not provide the same guarantee.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {\n  return object[key];\n}\nconst user = { name: "Mira", age: 28 };\nconst name = getProperty(user, "name"); // string\nconst age = getProperty(user, "age"); // number\nconsole.log(name.toUpperCase(), age.toFixed(0));\n// getProperty(user, "email"); // Error.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`as const` assertions",
        group: "Topics to cover",
        explanation:
          "as const preserves literal values and gives literal object properties and tuple positions readonly types. It does not freeze the value at runtime or recover precision already lost through a separately widened variable.\n\nThe example derives a union from the object's values instead of repeating the same strings in another declaration. Each permitted mode stays tied to its defined value.",
        source:
          "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'const modes = { Light: "light", Dark: "dark" } as const;\ntype Mode = typeof modes[keyof typeof modes]; // "light" | "dark"\nconst selected: Mode = modes.Dark;\nconst sizes = [12, 16, 24] as const; // readonly tuple\nconsole.log(selected, sizes[1]);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`satisfies` operator",
        group: "Topics to cover",
        explanation:
          "satisfies checks that a value fits a type while retaining its useful inferred shape. Unlike an as assertion, it checks compatibility rather than asking the checker to trust you. It is available in TypeScript 4.9 and later.\n\nThe target type can still influence inference, so satisfies does not preserve every literal in every context. Add as const when that is the intended contract. The example checks keys and value choices while keeping green as a string, allowing string methods without a union guard.",
        source:
          "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type Channel = "green" | "blue";\ntype RGB = [number, number, number];\nconst palette = {\n  green: "#16a34a",\n  blue: [37, 99, 235]\n} satisfies Record<Channel, string | RGB>;\nconsole.log(palette.green.toUpperCase()); // #16A34A\nconst config = { mode: "dark" } as const satisfies { mode: "dark" | "light" };',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Function overloads",
        group: "Topics to cover",
        explanation:
          "Overloads describe distinct ways to call a function when the argument form determines its result type. Write the public overload signatures before the broader implementation. Callers can use only the public signatures.\n\nUse a union parameter instead when alternatives return the same shape. Here a string produces string[] and an array produces string, so overloads express a useful relationship. To accept a union-typed variable, the public signatures must also include a matching union overload.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'function convert(value: string): string[];\nfunction convert(value: string[]): string;\nfunction convert(value: string | string[]): string | string[] {\n  return typeof value === "string" ? value.split(",") : value.join(",");\n}\nconst parts = convert("a,b"); // string[]\nconst text = convert(["a", "b"]); // string\nconsole.log(parts.length, text.toUpperCase()); // 2 A,B',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Call signatures and construct signatures",
        group: "Topics to cover",
        explanation:
          "A call signature describes a value that can be called like a function. A construct signature uses new to describe a value that creates instances. An interface can combine a call signature with properties to describe a function that carries metadata.\n\nThe formatter is callable and has a label. UserConstructor describes constructor arguments and the resulting instance; assigning a class checks its constructor side. These types do not turn an arbitrary object into a function or class.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'interface Formatter { (value: number): string; label: string }\nconst format: Formatter = Object.assign((value: number) => value.toFixed(2), { label: "Price" });\ninterface UserConstructor { new (name: string): { name: string } }\nclass User { constructor(public name: string) {} }\nconst Constructor: UserConstructor = User;\nconsole.log(format(12), new Constructor("Mira").name);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Type predicates (`value is Type`)",
        group: "Topics to cover",
        explanation:
          "A predicate return type, such as value is User, lets a runtime guard narrow a value when it returns true. The checker trusts that promise. If the implementation checks too little, later code may be unsafe.\n\nA false result can also remove the promised type from a union. A check for positive numbers must not claim to recognize all numbers. Make the guard small and check the whole shape it promises. This User guard checks the required fields so filter can return a User array.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type User = { id: string; name: string };\nfunction isUser(value: unknown): value is User {\n  return typeof value === "object" && value !== null\n    && "id" in value && typeof value.id === "string"\n    && "name" in value && typeof value.name === "string";\n}\nconst values: unknown[] = [{ id: "u1", name: "Mira" }, { name: 42 }, null];\nconst users = values.filter(isUser); // User[]\nconsole.log(users.map(user => user.name)); // ["Mira"]',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Assertion functions (`asserts`)",
        group: "Topics to cover",
        explanation:
          "An assertion function establishes a fact for the code that follows a successful call. Its asserts return annotation tells the checker which fact is established. The function must throw when that fact is not true; it does not convert the input.\n\nAn incorrect implementation can lie to the checker. Use an assertion for a required condition and a predicate when you want a choice between branches. Here the check establishes a string before the email formatter trims and lowercases it. Numeric input throws before those methods run.",
        source:
          "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'function assertString(value: unknown): asserts value is string {\n  if (typeof value !== "string") throw new Error("Expected a string");\n}\nfunction normalizeEmail(value: unknown): string {\n  assertString(value);\n  return value.trim().toLowerCase();\n}\nconsole.log(normalizeEmail(" MIRA@EXAMPLE.COM ")); // mira@example.com',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Exhaustive checking with `never`",
        group: "Topics to cover",
        explanation:
          "never describes a value that cannot occur. A function that always throws or never finishes can return never. A void function, by comparison, may return normally without a useful result.\n\nAfter every case of a union has been handled, the remaining value can narrow to never. The helper accepts only that impossible remainder. The direction example handles two cases; adding a third without handling it makes the assertNever call fail checking.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'function assertNever(value: never): never {\n  throw new Error(`Unexpected value: ${String(value)}`);\n}\ntype Direction = "left" | "right";\nfunction offset(direction: Direction): number {\n  switch (direction) {\n    case "left": return -1;\n    case "right": return 1;\n    default: return assertNever(direction);\n  }\n}\nconsole.log(offset("left")); // -1',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`Partial<T>`",
        group: "Built-in utility types",
        explanation:
          "Partial<T> makes every top-level property optional. It is useful for patches, but does not supply missing values. Decide whether an omitted property differs from one explicitly set to undefined; exactOptionalPropertyTypes makes that distinction clearer.",
        source:
          "https://www.typescriptlang.org/docs/handbook/utility-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type Settings = { theme: string; compact: boolean };\nfunction patch(current: Settings, changes: Partial<Settings>): Settings {\n  return { ...current, ...changes };\n}\nconsole.log(patch({ theme: "dark", compact: false }, { compact: true }));',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`Required<T>`",
        group: "Built-in utility types",
        explanation:
          "Required<T> removes optional markers from top-level properties. It does not fill defaults or validate input, and it does not make nested properties required. The configuration helper must construct an actual object containing the required values.",
        source:
          "https://www.typescriptlang.org/docs/handbook/utility-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type Options = { theme?: string; compact?: boolean };\nfunction defaults(options: Options): Required<Options> {\n  return { theme: options.theme ?? "dark", compact: options.compact ?? false };\n}\nconsole.log(defaults({}));',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`Readonly<T>`",
        group: "Built-in utility types",
        explanation:
          "Readonly<T> makes top-level properties readonly through that type. Consumers can inspect them but cannot replace them. It does not freeze the object at runtime or make nested data immutable.",
        source:
          "https://www.typescriptlang.org/docs/handbook/utility-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type Config = { theme: string; nested: { compact: boolean } };\nconst config: Readonly<Config> = { theme: "dark", nested: { compact: false } };\nconfig.nested.compact = true; // Shallow restriction.\n// config.theme = "light"; // Error.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`Pick<T, K>`",
        group: "Built-in utility types",
        explanation:
          "Pick<T, K> selects named properties while preserving their types and modifiers. It changes the type description, not the runtime object. To keep private fields out of serialized output, construct the public object explicitly.",
        source:
          "https://www.typescriptlang.org/docs/handbook/utility-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type User = { id: string; name: string; passwordHash: string };\ntype PublicUser = Pick<User, "id" | "name">;\nfunction publicUser(user: User): PublicUser { return { id: user.id, name: user.name }; }\nconsole.log(publicUser({ id: "u1", name: "Mira", passwordHash: "example" }));',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`Omit<T, K>`",
        group: "Built-in utility types",
        explanation:
          "Omit<T, K> describes a type without the selected keys. It can separate creation input from stored data with server-owned fields. It does not delete or sanitize properties on a runtime object.",
        source:
          "https://www.typescriptlang.org/docs/handbook/utility-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type User = { id: string; name: string; createdAt: Date };\ntype NewUser = Omit<User, "id" | "createdAt">;\nconst draft: NewUser = { name: "Mira" };\nconsole.log(draft.name);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`Record<K, V>`",
        group: "Built-in utility types",
        explanation:
          "Record<K, V> maps keys to a value type. A finite key union requires an entry for every key. An open string dictionary can still have missing entries; include undefined in its value type or use noUncheckedIndexedAccess when reading arbitrary keys.",
        source:
          "https://www.typescriptlang.org/docs/handbook/utility-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type Status = "idle" | "saving" | "done";\nconst labels: Record<Status, string> = { idle: "Ready", saving: "Saving", done: "Saved" };\nconst cache: Record<string, number | undefined> = {};\nconsole.log(labels.saving, cache["missing"] ?? 0);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`Exclude<T, U>`",
        group: "Built-in utility types",
        explanation:
          "Exclude<T, U> removes union members assignable to U. It does not remove properties from inside an object. The example derives the non-idle cases without repeating the other members.",
        source:
          "https://www.typescriptlang.org/docs/handbook/utility-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type Status = "idle" | "saving" | "done";\ntype ActiveStatus = Exclude<Status, "idle">; // "saving" | "done"\nconst status: ActiveStatus = "saving";\nconsole.log(status);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`Extract<T, U>`",
        group: "Built-in utility types",
        explanation:
          "Extract<T, U> keeps union members assignable to U. It can select cases from a discriminated union using a matching structural condition, without listing every other field on those cases.",
        source:
          "https://www.typescriptlang.org/docs/handbook/utility-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type Result = { kind: "ok"; value: number } | { kind: "error"; message: string };\ntype Success = Extract<Result, { kind: "ok" }>;\nconst result: Success = { kind: "ok", value: 42 };\nconsole.log(result.value);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`NonNullable<T>`",
        group: "Built-in utility types",
        explanation:
          "NonNullable<T> removes null and undefined from a type. It does not inspect or change a runtime value. You still need a guard to establish that an actual value fits the resulting type.",
        source:
          "https://www.typescriptlang.org/docs/handbook/utility-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type MaybeName = string | null | undefined;\ntype Name = NonNullable<MaybeName>; // string\nfunction requireName(value: MaybeName): Name {\n  if (value == null) throw new Error("Missing name");\n  return value;\n}\nconsole.log(requireName("Mira"));',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`ReturnType<T>`",
        group: "Built-in utility types",
        explanation:
          "ReturnType<T> extracts a function type's result type without executing it. Use typeof first when starting from a function value. For overloaded functions, it usually reflects the last signature rather than the result of a particular call.",
        source:
          "https://www.typescriptlang.org/docs/handbook/utility-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'function createUser(name: string) { return { id: "u1", name }; }\ntype User = ReturnType<typeof createUser>;\nconst user: User = createUser("Mira");\nconsole.log(user.name);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`Parameters<T>`",
        group: "Built-in utility types",
        explanation:
          "Parameters<T> extracts a function's arguments as a tuple, including optional and rest parameters. A forwarding helper can use that tuple to stay aligned with the original function without copying its parameter list.",
        source:
          "https://www.typescriptlang.org/docs/handbook/utility-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'function greet(name: string, prefix = "Hello"): string { return `${prefix}, ${name}`; }\ntype Args = Parameters<typeof greet>;\nconst args: Args = ["Mira", "Hi"];\nconsole.log(greet(...args)); // Hi, Mira',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`Awaited<T>`",
        group: "Built-in utility types",
        explanation:
          "Awaited<T> describes the resolved value of a promise or thenable, unwrapping nested layers. Plain values stay unchanged. Combine it with ReturnType to describe an async function's resolved result. Available since TypeScript 4.5, it performs no asynchronous work itself.",
        source:
          "https://www.typescriptlang.org/docs/handbook/utility-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'async function loadUser() { return { id: "u1", name: "Mira" }; }\ntype User = Awaited<ReturnType<typeof loadUser>>;\nconst user: User = { id: "u2", name: "Alex" };\nvoid loadUser().then(result => console.log(result.name, user.name));',
            language: "ts",
            check: true,
          },
        ],
      },
    ],
    project: {
      title: "Typed Tooltip component",
      steps: [
        "Design the options and public methods before implementing visual behavior. The generic parameter describes application data; callbacks receive that same data type.",
        "The text-only starter below uses the browser’s native title presentation. It deliberately delegates rendering to the browser: it is not a custom, consistently accessible tooltip implementation.",
        'For the completed component, add an actual role="tooltip" element, an aria-describedby relationship, focus/hover opening, Escape closing, and cleanup. Do not put interactive controls in a tooltip.',
      ],
      acceptance: [
        "Configuration, callbacks, update, and destroy keep the same data type.",
        "The completed custom tooltip works with keyboard focus and pointer hover and can be dismissed with Escape.",
        "Destroy removes listeners and owned DOM and restores attributes; repeatedly mounting does not duplicate effects.",
      ],
      files: [
        {
          name: "Tooltip.ts",
          code: 'export type TooltipOptions<T> = {\n  data: T;\n  text: (data: T) => string;\n  onUpdate?: (data: T) => void;\n};\nexport class Tooltip<T> {\n  private data: T;\n  private original: string | null;\n  private destroyed = false;\n  constructor(private target: HTMLElement, private options: TooltipOptions<T>) {\n    this.data = options.data;\n    this.original = target.getAttribute("title");\n    this.render();\n  }\n  private render(): void { this.target.title = this.options.text(this.data); }\n  update(data: T): void {\n    if (this.destroyed) throw new Error("Tooltip was destroyed");\n    this.data = data; this.render(); this.options.onUpdate?.(data);\n  }\n  destroy(): void {\n    if (this.destroyed) return;\n    this.destroyed = true;\n    if (this.original === null) this.target.removeAttribute("title");\n    else this.target.setAttribute("title", this.original);\n  }\n}\n// Browser use:\n// const tip = new Tooltip(button, { data: { count: 1 }, text: d => `${d.count} items` });\n// tip.update({ count: 2 }); tip.destroy();',
          language: "ts",
          check: true,
        },
      ],
    },
  },
  {
    number: 4,
    name: "Level 4 — Object-oriented TypeScript and project architecture",
    stage: "Intermediate",
    goal: "Organize larger applications into maintainable, reusable, type-safe modules.",
    projectBrief:
      "Build a reusable UI components library (tooltips, modals, accordions, dropdowns) using TypeScript classes and modules.",
    inventory: [
      {
        name: "Classes and constructors",
        group: "Topics to cover",
      },
      {
        name: "`public`, `private`, `protected`",
        group: "Topics to cover",
      },
      {
        name: "`readonly` class properties",
        group: "Topics to cover",
      },
      {
        name: "Getters and setters",
        group: "Topics to cover",
      },
      {
        name: "Inheritance and `super`",
        group: "Topics to cover",
      },
      {
        name: "Abstract classes",
        group: "Topics to cover",
      },
      {
        name: "`implements` and `override`",
        group: "Topics to cover",
      },
      {
        name: "Generic classes",
        group: "Topics to cover",
      },
      {
        name: "Structural typing",
        group: "Topics to cover",
      },
      {
        name: "ES modules: `import` and `export`",
        group: "Topics to cover",
      },
      {
        name: "Type-only imports and exports",
        group: "Topics to cover",
      },
      {
        name: "Declaration files (`.d.ts`)",
        group: "Topics to cover",
      },
      {
        name: "Third-party library types and `@types`",
        group: "Topics to cover",
      },
      {
        name: "Global type declarations and module augmentation",
        group: "Topics to cover",
      },
      {
        name: "Organizing types across a project",
        group: "Topics to cover",
      },
      {
        name: "`strict` and `strictNullChecks`",
        group: "Compiler and tooling",
      },
      {
        name: "`noUncheckedIndexedAccess`",
        group: "Compiler and tooling",
      },
      {
        name: "`exactOptionalPropertyTypes`",
        group: "Compiler and tooling",
      },
      {
        name: "`target`, `lib`, `module`, and `moduleResolution`",
        group: "Compiler and tooling",
      },
      {
        name: "`noEmit` vs. JavaScript output",
        group: "Compiler and tooling",
      },
      {
        name: "Source maps",
        group: "Compiler and tooling",
      },
      {
        name: "Vite with TypeScript",
        group: "Compiler and tooling",
      },
      {
        name: "ESLint with typescript-eslint",
        group: "Compiler and tooling",
      },
      {
        name: "Incremental migration from JavaScript using `allowJs`, `checkJs`, and JSDoc",
        group: "Compiler and tooling",
      },
    ],
    lessons: [
      {
        name: "Classes and constructors",
        group: "Topics to cover",
        explanation:
          "A class defines instance data and behavior. With strictPropertyInitialization, required fields must be initialized where declared or in the constructor. Mark a field optional when absence is valid rather than hiding it with !.\n\nConstructor parameters marked public, private, protected, or readonly also declare and initialize properties. public is the default visibility; protected permits subclass access, while private restricts access during checking. A # field provides runtime privacy. readonly allows initialization but prevents later reassignment through that contract. The example initializes its required data and leaves the nickname optional.",
        source: "https://www.typescriptlang.org/docs/handbook/2/classes.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'class User {\n  readonly createdAt = new Date();\n  nickname?: string;\n  #visits = 0;\n  constructor(public name: string) {}\n  visit(): number { return ++this.#visits; }\n  displayName(): string { return this.nickname ?? this.name; }\n}\nconst user = new User("Mira");\nconsole.log(user.displayName(), user.visit()); // Mira 1',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`public`, `private`, `protected`",
        group: "Topics to cover",
        explanation:
          "Visibility controls where class members may be used. public members are available by default. protected members are available within the class and its subclasses. private restricts access during type checking; # fields enforce privacy at runtime.\n\nUse visibility to express ownership without adding unnecessary getters. The subclass can read the protected name, while outside callers cannot access the private token through its type. These restrictions do not validate constructor input.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/classes.html#member-visibility",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'class Account {\n  private token: string;\n  protected name: string;\n  constructor(name: string, token: string) { this.name = name; this.token = token; }\n  public matches(token: string): boolean { return token === this.token; }\n}\nclass Member extends Account { label(): string { return this.name; } }\nconsole.log(new Member("Mira", "example").label());',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`readonly` class properties",
        group: "Topics to cover",
        explanation:
          "A readonly class property can be initialized at its declaration or in the constructor, then cannot be reassigned through that contract. The rule is checked by TypeScript; it does not freeze an object or make nested values readonly.\n\nParameter properties provide a compact form when they keep the API clear. This example gives an instance a stable id while allowing its name to change.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/classes.html#readonly",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'class User {\n  constructor(public readonly id: string, public name: string) {}\n  rename(name: string): void { this.name = name; }\n}\nconst user = new User("u1", "Mira");\nuser.rename("Mira Chen");\nconsole.log(user.id, user.name);\n// user.id = "u2"; // Error.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Getters and setters",
        group: "Topics to cover",
        explanation:
          "Getters run code when a property is read; setters run code when it is assigned. They are useful for computed values or normalization, but property access should not hide surprising expensive work. A setter can accept a broader type than its getter returns.\n\nHere the setter converts and checks the input, rejecting values that are not finite and nonnegative. The getter always returns a number, so consumers do not need to parse the stored value.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/classes.html#getters--setters",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'class Ruler {\n  #size = 0;\n  get size(): number { return this.#size; }\n  set size(value: number | string) {\n    const parsed = Number(value);\n    if (!Number.isFinite(parsed) || parsed < 0) throw new Error("Invalid size");\n    this.#size = parsed;\n  }\n}\nconst ruler = new Ruler(); ruler.size = "24"; console.log(ruler.size); // 24',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Inheritance and `super`",
        group: "Topics to cover",
        explanation:
          "extends lets a class reuse one base class's behavior. A derived constructor must call super before using this. A call to super.method uses the base implementation.\n\nChoose composition when an object uses a capability rather than represents a subtype. The example subclasses reuse the base name and extend the greeting. Overrides must remain compatible so code written for the base class still works.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/classes.html#class-heritage",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'class Person {\n  constructor(public name: string) {}\n  greet(): string { return `Hello, ${this.name}`; }\n}\nclass Member extends Person {\n  constructor(name: string, public role: string) { super(name); }\n  override greet(): string { return `${super.greet()} (${this.role})`; }\n}\nconsole.log(new Member("Mira", "editor").greet());',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Abstract classes",
        group: "Topics to cover",
        explanation:
          "An abstract class cannot be instantiated directly. It can share implemented members while requiring subclasses to provide abstract members. Use it when a stable extension point makes that shared structure useful.\n\nHere render relies on an abstract label, so every concrete subclass must supply it. Declaring an abstract class does not register subclasses or create a runtime factory.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes-and-members",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'abstract class Control {\n  abstract label(): string;\n  renderText(): string { return `[${this.label()}]`; }\n}\nclass SaveButton extends Control { label(): string { return "Save"; } }\nconsole.log(new SaveButton().renderText()); // [Save]',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`implements` and `override`",
        group: "Topics to cover",
        explanation:
          "implements checks that a class's instances satisfy an interface. It does not copy behavior into the class or infer every parameter type. override explicitly marks a member that replaces an inherited member. noImplicitOverride reports overrides that omit this marker.\n\nIf a base member is renamed, the marker helps reveal a mismatched subclass during refactoring. The example implements a lifecycle contract and deliberately overrides destroy.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/classes.html#implements-clauses",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'interface Disposable { destroy(): void }\nclass Base implements Disposable { destroy(): void { console.log("Base cleanup"); } }\nclass Widget extends Base {\n  override destroy(): void { console.log("Widget cleanup"); super.destroy(); }\n}\nnew Widget().destroy();',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Generic classes",
        group: "Topics to cover",
        explanation:
          "A generic class connects its instance fields and methods with a type parameter. The caller supplies that type when constructing the class, or the checker infers it from constructor arguments. This avoids duplicating a class or losing checks with any.\n\nStatic members belong to the shared constructor, so they cannot use the instance's type parameter as separate per-type storage. The example stores typed items in an instance array, checks additions, and allows a lookup to be missing.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-classes",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'class Repository<T extends { id: string }> {\n  private items: T[] = [];\n  add(item: T): void { this.items.push(item); }\n  find(id: string): T | undefined {\n    return this.items.find(item => item.id === id);\n  }\n}\ntype Product = { id: string; price: number };\nconst products = new Repository<Product>();\nproducts.add({ id: "book", price: 20 });\nconsole.log(products.find("book")?.price); // 20',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Structural typing",
        group: "Topics to cover",
        explanation:
          "TypeScript usually compares object shapes rather than requiring an explicit interface declaration. An existing object with extra fields is compatible when its required members fit. Fresh object literals receive additional checks for unexpected properties.\n\nThis formatter only needs a name, so it accepts a richer user object. Shape compatibility does not validate arbitrary runtime input; outside data still needs checking.",
        source:
          "https://www.typescriptlang.org/docs/handbook/type-compatibility.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'interface Named { name: string }\nfunction label(value: Named): string { return value.name; }\nconst user = { name: "Mira", role: "editor" };\nconsole.log(label(user)); // Mira\n// label({ name: "Mira", typo: true }); // Fresh-literal excess-property error.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "ES modules: `import` and `export`",
        group: "Topics to cover",
        explanation:
          "ES modules use export and import to define file boundaries. TypeScript checks these relationships, but the runtime or bundler must resolve the generated imports. Checking does not bundle files or rewrite every module specifier.\n\nThe two-file example uses a .js import that TypeScript resolves to the .ts source and preserves in output. A bundler can process the source directly. Running the emitted ESM directly in Node requires matching module settings and package metadata.",
        source: "https://www.typescriptlang.org/docs/handbook/2/modules.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "format.ts",
            code: "export function price(value: number): string { return `$${value.toFixed(2)}`; }",
            language: "ts",
            check: true,
          },
          {
            name: "index.ts",
            code: 'import { price } from "./format.js";\nconsole.log(price(12)); // $12.00',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Type-only imports and exports",
        group: "Topics to cover",
        explanation:
          "Type-only imports and exports identify declarations needed for checking rather than runtime execution. Interfaces and aliases disappear from output. A class needs a normal import when used with new or instanceof; it can be imported as a type when only its shape is needed.\n\nWith verbatimModuleSyntax, these choices control what remains in output. They also avoid unintended runtime dependencies and help tools that translate files independently. This example exports and imports a shape as a type, then creates the actual object separately.",
        source: "https://www.typescriptlang.org/docs/handbook/2/modules.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "models.ts",
            code: "export interface User { id: string; name: string }",
            language: "ts",
            check: true,
          },
          {
            name: "index.ts",
            code: 'import type { User } from "./models.js";\nexport type { User } from "./models.js";\nconst user: User = { id: "u1", name: "Mira" };\nconsole.log(user.name);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Declaration files (`.d.ts`)",
        group: "Topics to cover",
        explanation:
          "A .d.ts file describes JavaScript implemented elsewhere. It contains type declarations, not executable implementations, and cannot supply missing runtime code. Keep descriptions small, accurate, and included in the checked project.\n\nThis example describes an optional vendor value on the browser's global object. The consumer still checks whether it exists. export {} makes the declaration file a module so declare global can extend Window.",
        source:
          "https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html",
        environment: "browser",
        requires: "Browser DOM; compile with the Level 1 setup",
        files: [
          {
            name: "vendor.d.ts",
            code: "export {};\ndeclare global { interface Window { vendorVersion?: string } }",
            language: "ts",
            check: true,
          },
          {
            name: "index.ts",
            code: 'console.log(window.vendorVersion ?? "Vendor not loaded");',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Third-party library types and `@types`",
        group: "Topics to cover",
        explanation:
          "Check whether a dependency includes its own types before installing a separate type package. Otherwise, look for a maintained @types package matching the supported major version. Do not add unrelated declarations merely to stop errors.\n\nGSAP includes declarations. React commonly uses @types/react and @types/react-dom. These descriptions do not install or validate runtime behavior. Keep versions locked and rerun the checker after updates.",
        source:
          "https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "commands.sh",
            code: "npm install gsap\nnpm install react react-dom\nnpm install --save-dev @types/react @types/react-dom\n# Check bundled package declarations before looking for @types/gsap.",
            language: "shell",
            check: true,
          },
        ],
      },
      {
        name: "Global type declarations and module augmentation",
        group: "Topics to cover",
        explanation:
          "Use declare global to describe genuine globals, and module augmentation to extend declarations that an existing module allows to be extended. The module specifier must match. Neither technique creates runtime values, so do not use it to invent behavior or make ordinary models global.\n\nThe example extends local Settings with an optional debug setting at the type level. Such declarations can affect every file in the project; document their purpose and scope.",
        source:
          "https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "settings.ts",
            code: "export interface Settings { theme: string }",
            language: "ts",
            check: true,
          },
          {
            name: "augment.ts",
            code: 'import "./settings.js";\ndeclare module "./settings.js" { interface Settings { debug?: boolean } }',
            language: "ts",
            check: true,
          },
          {
            name: "index.ts",
            code: 'import "./augment.js";\nimport type { Settings } from "./settings.js";\nconst settings: Settings = { theme: "dark", debug: true };\nconsole.log(settings.debug);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Organizing types across a project",
        group: "Topics to cover",
        explanation:
          "Keep types near the feature or API that owns their meaning. Export a small public surface instead of placing every model in one global types.ts file. Raw server data and internal domain models may need different types when they offer different guarantees.\n\nType-only imports can share contracts without introducing circular runtime dependencies. The user feature example keeps its behavior and public API together. There is no need to duplicate every inferred local type.",
        source: "https://www.typescriptlang.org/docs/handbook/2/modules.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "user/model.ts",
            code: "export interface User { id: string; name: string }",
            language: "ts",
            check: true,
          },
          {
            name: "user/label.ts",
            code: 'import type { User } from "./model.js";\nexport function userLabel(user: User): string { return user.name; }',
            language: "ts",
            check: true,
          },
          {
            name: "user/index.ts",
            code: 'export type { User } from "./model.js";\nexport { userLabel } from "./label.js";',
            language: "ts",
            check: true,
          },
          {
            name: "index.ts",
            code: 'import { userLabel } from "./user/index.js";\nconsole.log(userLabel({ id: "u1", name: "Mira" }));',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`strict` and `strictNullChecks`",
        group: "Compiler and tooling",
        explanation:
          "strict enables a family of checks, including strictNullChecks, noImplicitAny, and strictPropertyInitialization. These checks expose missing values and unsupported assumptions. Turning them off does not make those runtime situations disappear.\n\nStart new projects with strict checking. For a migration, tighten a controlled part of the project and address diagnostics rather than adding assertions everywhere. The example branches before using a possibly missing array value.",
        source: "https://www.typescriptlang.org/tsconfig/#strict",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'const names = ["Mira", "Alex"];\nconst selected = names.find(name => name.startsWith("Z"));\nif (selected === undefined) console.log("No match");\nelse console.log(selected.toUpperCase());',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`noUncheckedIndexedAccess`",
        group: "Compiler and tooling",
        explanation:
          "noUncheckedIndexedAccess adds undefined when reading an unchecked array position or an open dictionary key. Known required properties and tuple positions can remain precise.\n\nCheck the lookup or provide a suitable fallback. Use ! only when a real invariant justifies it. You can also explicitly include undefined in a dictionary's value type, even when this option is disabled.",
        source:
          "https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'const counts: Record<string, number | undefined> = { visits: 3 };\nconst next = (counts["likes"] ?? 0) + 1;\nconsole.log(next); // 1\n// Enable compilerOptions.noUncheckedIndexedAccess for automatic lookup protection.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`exactOptionalPropertyTypes`",
        group: "Compiler and tooling",
        explanation:
          "exactOptionalPropertyTypes distinguishes a missing property from a property explicitly assigned undefined. To allow that assignment, include undefined in the property's type. Reading an optional property can still produce undefined.\n\nThis matters for patches, object spreads, and property-existence checks. Omitting a theme can mean leaving it unchanged, while supplying it means replacing it. The example contrasts an ordinary optional property with a contract that explicitly permits undefined.",
        source:
          "https://www.typescriptlang.org/tsconfig/#exactOptionalPropertyTypes",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type Patch = { theme?: string };\nconst omitted: Patch = {};\nconst provided: Patch = { theme: "dark" };\n// With exactOptionalPropertyTypes: { theme: undefined } does not satisfy Patch.\ntype ExplicitClear = { theme?: string | undefined };\nconst clear: ExplicitClear = { theme: undefined };\nconsole.log(omitted, provided, clear);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "`target`, `lib`, `module`, and `moduleResolution`",
        group: "Compiler and tooling",
        explanation:
          "target controls generated syntax, lib describes assumed APIs, module controls the import/output model, and moduleResolution controls how the checker finds imports. Set them for the environment that will actually run or bundle the code. They do not add missing APIs or polyfills.\n\nAn ESNext/bundler browser setup and a NodeNext setup for direct Node ESM are alternatives. The latter needs appropriate .js import specifiers. Do not combine settings from the two examples without accounting for their different hosts.",
        source:
          "https://www.typescriptlang.org/docs/handbook/modules/guides/choosing-compiler-options.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "browser-options.json",
            code: '{"compilerOptions":{"target":"ES2022","lib":["ES2022","DOM","DOM.Iterable"],"module":"ESNext","moduleResolution":"bundler","strict":true,"noEmit":true}}',
            language: "json",
            check: true,
          },
          {
            name: "node-options.json",
            code: '{"compilerOptions":{"target":"ES2022","lib":["ES2022"],"module":"NodeNext","moduleResolution":"NodeNext","strict":true,"rootDir":"src","outDir":"dist","types":["node"]}}',
            language: "json",
            check: true,
          },
        ],
      },
      {
        name: "`noEmit` vs. JavaScript output",
        group: "Compiler and tooling",
        explanation:
          "noEmit makes tsc check without generating files, which suits a project whose bundler produces output. When tsc does emit, rootDir, outDir, and module define the output layout and format. noEmitOnError controls whether errors prevent emission; decide how the build rejects invalid output.\n\nChecking, building, and running are separate tasks. A successful Vite build does not prove that the TypeScript checker passed. Keep the appropriate commands explicit.",
        source: "https://www.typescriptlang.org/tsconfig/#noEmit",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "commands.sh",
            code: "npx tsc -p tsconfig.json --noEmit\n# If this project uses tsc for output:\nnpx tsc -p tsconfig.json --noEmit false --noEmitOnError --outDir dist\n# Execute the appropriate emitted entry point only after a successful build.",
            language: "shell",
            check: true,
          },
        ],
      },
      {
        name: "Source maps",
        group: "Compiler and tooling",
        explanation:
          "Source maps connect locations in generated JavaScript to the original TypeScript, allowing a debugger to show the source you wrote. Enable sourceMap for tsc output and keep the JavaScript and its maps in the expected deployed layout.\n\nMaps do not change behavior or catch errors. Decide whether deployed sources should be exposed and check the paths they reference. Declaration maps serve editor navigation for types, a different purpose covered at Level 7.",
        source: "https://www.typescriptlang.org/tsconfig/#sourceMap",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "tsconfig.json",
            code: '{"compilerOptions":{"target":"ES2022","module":"ESNext","moduleResolution":"bundler","strict":true,"rootDir":"src","outDir":"dist","sourceMap":true,"noEmitOnError":true},"include":["src"]}',
            language: "json",
            check: true,
          },
          {
            name: "src/main.ts",
            code: "function total(price: number, quantity: number): number { return price * quantity; }\nconsole.log(total(12, 3)); // Set a debugger breakpoint here.",
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Vite with TypeScript",
        group: "Compiler and tooling",
        explanation:
          "Vite serves and bundles TypeScript by translating it, without performing full type checking. Run tsc --noEmit during development or CI alongside the build. Follow the template's runtime requirements, including its supported Node version.\n\nUse vanilla-ts for the first practice project and react-ts for the React milestone. These commands create a new practice project; they are not instructions to replace an unrelated existing app.",
        source: "https://vite.dev/guide/features.html#typescript",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "commands.sh",
            code: "npm create vite@latest typed-ui -- --template vanilla-ts\ncd typed-ui\nnpm install\nnpm run dev\n# Keep checking explicit:\nnpx tsc --noEmit\n# Build with a script equivalent to: tsc --noEmit && vite build",
            language: "shell",
            check: true,
          },
        ],
      },
      {
        name: "ESLint with typescript-eslint",
        group: "Compiler and tooling",
        explanation:
          "ESLint checks code-quality rules, while TypeScript checks type relationships. typescript-eslint lets ESLint understand TypeScript syntax. Start with supported flat configuration and compatible tool versions; rules needing type information are introduced at Level 6.\n\nThis example uses the version 8 configuration style. ESLint executes its configuration separately from the application's TypeScript source. Keep that distinction when choosing files and settings.",
        source: "https://typescript-eslint.io/getting-started/",
        environment: "tooling",
        requires:
          "ESLint flat config + typescript-eslint v8; supported TypeScript version",
        files: [
          {
            name: "eslint.config.mjs",
            code: 'import js from "@eslint/js";\nimport tseslint from "typescript-eslint";\nexport default tseslint.config(\n  { ignores: ["dist/**"] },\n  js.configs.recommended,\n  ...tseslint.configs.recommended\n);',
            language: "js",
            check: true,
          },
          {
            name: "commands.sh",
            code: "npm install --save-dev eslint @eslint/js typescript-eslint\nnpx eslint src",
            language: "shell",
            check: true,
          },
        ],
      },
      {
        name: "Incremental migration from JavaScript using `allowJs`, `checkJs`, and JSDoc",
        group: "Compiler and tooling",
        explanation:
          "allowJs includes JavaScript in a TypeScript project, and checkJs reports errors in those JavaScript files. JSDoc comments can describe contracts without renaming every file. Begin with feature boundaries and behavior tests rather than converting the whole codebase at once.\n\nMigrate a manageable part, then tighten its checks. Keep generated output separate from input so it cannot overwrite sources. This helper remains JavaScript while JSDoc makes its contract checkable.",
        source:
          "https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "price.js",
            code: '// @ts-check\n/** @param {number} amount @returns {string} */\nexport function price(amount) { return `$${amount.toFixed(2)}`; }\nconsole.log(price(12));\n// price("12"); // Error with checkJs or @ts-check.',
            language: "js",
            check: true,
          },
          {
            name: "migration-options.json",
            code: '{"compilerOptions":{"allowJs":true,"checkJs":true,"noEmit":true,"strict":true}}',
            language: "json",
            check: true,
          },
        ],
      },
    ],
    project: {
      title: "Small UI components library",
      steps: [
        "Put Tooltip, Modal, Accordion, and Dropdown in separate modules with explicit options and a common destroy contract. Export the public entry points from src/index.ts.",
        "Use native dialog for the modal and details/summary for a basic accordion before building custom keyboard behavior. Choose whether the dropdown is a navigation disclosure or an ARIA menu: they have different interaction contracts.",
        "Use the registry below to give the page one cleanup entry point. Extend components through composition rather than a deep inheritance tree.",
      ],
      acceptance: [
        "All four components have typed constructors/options and isolated DOM ownership.",
        "Modal focus is managed; Escape and keyboard interaction work; opening and closing do not leak listeners.",
        "A consumer imports only the public entry point; destroy can be called twice safely.",
      ],
      files: [
        {
          name: "components.ts",
          code: 'export interface Disposable { destroy(): void }\nexport class ComponentRegistry implements Disposable {\n  private components = new Set<Disposable>();\n  register<T extends Disposable>(component: T): T {\n    this.components.add(component); return component;\n  }\n  destroy(): void {\n    for (const component of this.components) component.destroy();\n    this.components.clear();\n  }\n}\nexport function createAccordion(details: HTMLDetailsElement): Disposable {\n  const originallyOpen = details.open;\n  return { destroy() { details.open = originallyOpen; } };\n}\n// const registry = new ComponentRegistry();\n// registry.register(createAccordion(document.querySelector("details")!));\n// registry.destroy(); // At the page lifecycle boundary.',
          language: "ts",
          check: true,
        },
      ],
    },
  },
  {
    number: 5,
    name: "Level 5 — Advanced type system",
    stage: "Advanced",
    goal: "Understand how types can be dynamically transformed, inferred, and composed.",
    projectBrief:
      "Implement your own versions of `Partial`, `Pick`, `Omit`, `ReturnType`, and `Awaited`, then create a typed event-emitter utility.",
    inventory: [
      {
        name: "Conditional types (`T extends U ? X : Y`)",
        group: "Topics to cover",
      },
      {
        name: "Conditional type distribution",
        group: "Topics to cover",
      },
      {
        name: "Mapped types",
        group: "Topics to cover",
      },
      {
        name: "Mapped type modifiers (`+readonly`, `-?`, etc.)",
        group: "Topics to cover",
      },
      {
        name: "Key remapping with `as`",
        group: "Topics to cover",
      },
      {
        name: "Template literal types",
        group: "Topics to cover",
      },
      {
        name: "The `infer` keyword",
        group: "Topics to cover",
      },
      {
        name: "Recursive types",
        group: "Topics to cover",
      },
      {
        name: "Recursive conditional types",
        group: "Topics to cover",
      },
      {
        name: "Advanced generic constraints and inference",
        group: "Topics to cover",
      },
      {
        name: "Variance and assignability",
        group: "Topics to cover",
      },
      {
        name: "Nominal-like typing with branded types",
        group: "Topics to cover",
      },
      {
        name: "Combining mapped and conditional types",
        group: "Topics to cover",
      },
      {
        name: "Creating custom utility types",
        group: "Topics to cover",
      },
      {
        name: "Avoiding overly complex or expensive type-level computations",
        group: "Topics to cover",
      },
    ],
    lessons: [
      {
        name: "Conditional types (`T extends U ? X : Y`)",
        group: "Topics to cover",
        explanation:
          "A conditional type chooses one type or another based on whether a type is assignable to another. Its form, T extends U ? X : Y, is a type-level choice, not a runtime if statement. It is useful when a generic's output shape depends on its input type.\n\nKeep that relationship clear and try concrete cases in the editor. This helper extracts the payload type from a shape with the expected property and produces never otherwise. It does not inspect an object or validate an HTTP response.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type PayloadOf<T> = T extends { payload: unknown } ? T["payload"] : never;\ntype Payload = PayloadOf<{ payload: { id: string } }>; // { id: string }\ntype Missing = PayloadOf<{ error: string }>; // never\nconst payload: Payload = { id: "u1" };\nconsole.log(payload.id);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Conditional type distribution",
        group: "Topics to cover",
        explanation:
          "A conditional type checks union members separately when its checked side is a type parameter used on its own. This is called distribution. The results are combined into a union, where never contributes no remaining member. Wrap the checked types in tuples to test the union as a whole instead.\n\nThis explains why filters such as Exclude work member by member. The first helper asks which members are strings. The second asks whether every possible member is a string.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type KeepString<T> = T extends string ? T : never;\ntype WholeIsString<T> = [T] extends [string] ? true : false;\ntype Text = KeepString<"ready" | 42 | "done">; // "ready" | "done"\ntype Mixed = WholeIsString<string | number>; // false\nconst text: Text = "ready";\nconst mixed: Mixed = false;\nconsole.log(text, mixed);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Mapped types",
        group: "Topics to cover",
        explanation:
          "A mapped type builds an object type by visiting its property keys. It can read each original property's type with T[K]. Modifiers such as readonly, -readonly, ?, and -? add or remove write restrictions and optional markers.\n\nMany built-in utilities use this pattern. It changes a type description, not a runtime object. Here each settings field becomes a callback accepting that field's value type: compact receives a boolean, and theme receives a string.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type Listeners<T> = { [K in keyof T]: (value: T[K]) => void };\ntype Mutable<T> = { -readonly [K in keyof T]: T[K] };\ntype Settings = { theme: string; compact: boolean };\nconst listeners: Listeners<Settings> = {\n  theme: value => console.log(value.toUpperCase()),\n  compact: value => console.log(value ? "Compact" : "Spacious")\n};\nlisteners.compact(true); // Compact',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Mapped type modifiers (`+readonly`, `-?`, etc.)",
        group: "Topics to cover",
        explanation:
          "Mapped type modifiers change whether properties are optional or writable. readonly and +readonly add the readonly restriction; -readonly removes it. ? makes a property optional, and -? removes that marker. These changes affect only the current level unless the type explicitly repeats them for nested data.\n\nThe example derives editable, required settings from a readonly shape with optional properties. It does not supply missing values. The actual object must still contain every required field.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type EditableRequired<T> = { -readonly [K in keyof T]-?: T[K] };\ntype Draft = { readonly name?: string; readonly active?: boolean };\nconst complete: EditableRequired<Draft> = { name: "Mira", active: true };\ncomplete.name = "Alex";\nconsole.log(complete);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Key remapping with `as`",
        group: "Topics to cover",
        explanation:
          "Key remapping uses as in a mapped type to choose each output property's name. It can rename keys, build names from templates, or remove a key by mapping it to never. String-only transformations need keys explicitly restricted to strings.\n\nUse this for small derived APIs when it keeps the public contract clear. Here each model property gets a getter signature. The runtime object still needs an implementation for every getter.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] };\ntype User = { name: string; age: number };\nconst getters: Getters<User> = { getName: () => "Mira", getAge: () => 28 };\nconsole.log(getters.getName(), getters.getAge());',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Template literal types",
        group: "Topics to cover",
        explanation:
          "Template literal types build string types from other literal types. A union inside a placeholder produces the possible combinations. This can describe event names, translation keys, or small naming conventions without keeping duplicate lists.\n\nThey do not generate strings or validate runtime text. Combinations can grow quickly; explicit generated types may be clearer for large schemas. This example derives four allowed event names and creates a handler accepting only those names.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type Entity = "user" | "order";\ntype Action = "created" | "deleted";\ntype EventName = `${Entity}:${Action}`;\n// "user:created" | "user:deleted" | "order:created" | "order:deleted"\nfunction listen(event: EventName): void { console.log(`Listening to ${event}`); }\nlisten("user:created");\n// listen("invoice:created"); // Error: not part of the derived union.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "The `infer` keyword",
        group: "Topics to cover",
        explanation:
          "infer introduces a temporary type variable when a conditional type matches a structure. The variable captures part of that structure and is available in the conditional's true result. Callers do not need to provide the captured type separately.\n\nElementOf matches a readonly array and extracts its item type; for a non-array, it keeps the original type. Fulfilled extracts one layer of a Promise result. The built-in Awaited handles recursive unwrapping, unlike this intentionally limited promise helper.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type ElementOf<T> = T extends readonly (infer Item)[] ? Item : T;\ntype Fulfilled<T> = T extends Promise<infer Value> ? Value : T;\ntype Item = ElementOf<readonly string[]>; // string\ntype Data = Fulfilled<Promise<{ id: number }>>; // { id: number }\nconst item: Item = "Book";\nconst data: Data = { id: 1 };\nconsole.log(item, data.id);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Recursive types",
        group: "Topics to cover",
        explanation:
          "A recursive type refers to itself, allowing it to describe data with an unfixed depth, such as a tree. The type describes allowed shapes. It does not prevent runtime cycles or limit how deeply an algorithm recurses.\n\nGive recursive code a clear stopping condition. Consider an iterative traversal for very deep data. Here traversal stops when a folder has no children and collects the folder labels. External JSON still needs validation before it can be treated as a Folder.",
        source: "https://www.typescriptlang.org/docs/handbook/2/objects.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type Folder = { name: string; children: Folder[] };\nfunction names(folder: Folder): string[] {\n  return [folder.name, ...folder.children.flatMap(names)];\n}\nconst root: Folder = { name: "src", children: [{ name: "ui", children: [] }] };\nconsole.log(names(root)); // ["src", "ui"]',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Recursive conditional types",
        group: "Topics to cover",
        explanation:
          "A recursive conditional type repeats a type transformation until a stopping case matches. For nested arrays, infer extracts one level and recursion handles the next. This happens only during checking; it does not flatten an actual array.\n\nThe compiler limits how deeply it can expand types, and unions can grow quickly. Measure before applying unbounded helpers to huge arbitrary schemas. This helper has one specific job and stops when it reaches a non-array type.",
        source:
          "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: "type DeepItem<T> = T extends readonly (infer Item)[] ? DeepItem<Item> : T;\ntype Value = DeepItem<readonly number[][][]>; // number\nconst value: Value = 42;\nconsole.log(value);",
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Advanced generic constraints and inference",
        group: "Topics to cover",
        explanation:
          "A generic constraint should describe what the implementation needs, while inference should retain useful details from the caller. An unnecessary result annotation can lose those details. const type parameters, available since TypeScript 5.0, favor literal-like inference for inline arguments.\n\nUse constraints that accept readonly values when inferring readonly tuples. A const type parameter cannot recover literals already widened in a separate variable. This route helper preserves inline route values and uses them to derive the allowed route union.",
        source:
          "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#const-type-parameters",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'function defineRoutes<const T extends readonly string[]>(routes: T): T { return routes; }\nconst routes = defineRoutes(["/", "/settings"]);\ntype Route = typeof routes[number]; // "/" | "/settings"\nconst current: Route = "/settings";\nconst broad = ["/", "/settings"]; // string[]\nconst stillBroad = defineRoutes(broad); // string[]\nconsole.log(current, stillBroad.length);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Variance and assignability",
        group: "Topics to cover",
        explanation:
          "Variance describes how changing a type argument affects compatibility between generic types. A producer that only returns T can be covariant: a Dog producer can serve where an Animal producer is needed. A consumer accepting T must be contravariant under strict function checking: a function limited to Dogs cannot accept every Animal.\n\nJudge compatibility by the permitted operations, not the generic's name. A container that both reads and writes may need stronger constraints. Method signatures have a historical bivariance exception, covered at Level 8.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/generics.html#variance-annotations",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type Animal = { name: string };\ntype Dog = Animal & { bark(): void };\ntype Producer<T> = () => T;\ntype Consumer<T> = (value: T) => void;\nconst dog: Producer<Dog> = () => ({ name: "Scout", bark() {} });\nconst animal: Producer<Animal> = dog; // Safe: every Dog is an Animal.\nconst consumeAnimal: Consumer<Animal> = value => console.log(value.name);\nconst consumeDog: Consumer<Dog> = consumeAnimal; // Can handle any Dog.\nconsumeDog(dog());',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Nominal-like typing with branded types",
        group: "Topics to cover",
        explanation:
          "A branded type distinguishes values that otherwise have the same shape. Ordinary string aliases are interchangeable in TypeScript. Adding a distinguishing type-level property can prevent mixing a UserId with an OrderId, even though both remain strings at runtime.\n\nCreate branded values at a trusted boundary after validation. A narrow as assertion inside that constructor records the guarantee established by the runtime check. Brands disappear during compilation, can be bypassed with assertions, and must be established again after deserialization. This constructor checks the user-id format before applying its brand.",
        source:
          "https://www.typescriptlang.org/play/typescript/language-extensions/nominal-typing.ts.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'declare const userIdBrand: unique symbol;\ntype UserId = string & { readonly [userIdBrand]: "UserId" };\nfunction parseUserId(value: string): UserId {\n  if (!/^u_[0-9]+$/.test(value)) throw new Error("Invalid user id");\n  return value as UserId;\n}\nfunction findUser(id: UserId): string { return `Looking up ${id}`; }\nconsole.log(findUser(parseUserId("u_42"))); // Looking up u_42\n// findUser("u_42"); // Error: an ordinary string is not branded.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Combining mapped and conditional types",
        group: "Topics to cover",
        explanation:
          "Mapped and conditional types can select properties by visiting each key and checking its value type. Mapping a key to never removes that key. Giving a property the value type never does not remove it.\n\nGive each helper one named transformation and make its matching rule clear. This helper keeps required string-valued fields. An optional string includes undefined, so it would not match unless you deliberately adjusted the condition with NonNullable.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type StringFields<T> = { [K in keyof T as T[K] extends string ? K : never]: T[K] };\ntype Model = { name: string; age: number; title?: string };\nconst text: StringFields<Model> = { name: "Mira" };\nconsole.log(text.name);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Creating custom utility types",
        group: "Topics to cover",
        explanation:
          "A custom utility type should express a real contract that the standard utilities do not already cover. Name its guarantee and check small examples that must pass and fail. Do not claim that it checks nested data or exact shapes unless it actually does.\n\nThis helper makes selected properties required and leaves the others unchanged. It combines Pick, Required, and Omit rather than rebuilding them. The actual resulting object must provide the required id.",
        source:
          "https://www.typescriptlang.org/docs/handbook/utility-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type RequireKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;\ntype Draft = { id?: string; name?: string; active?: boolean };\nconst identified: RequireKeys<Draft, "id"> = { id: "u1" };\nconsole.log(identified.id.toUpperCase());\n// const invalid: RequireKeys<Draft, "id"> = {}; // Error.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Avoiding overly complex or expensive type-level computations",
        group: "Topics to cover",
        explanation:
          "Repeated union distribution and large template unions can make checking expensive even when the runtime code is small. Prefer named intermediate types, bounded recursion, and concrete public models when a general abstraction adds little value. Difficult types also cost time to maintain.\n\nMeasure a slow project before rewriting it. extendedDiagnostics reports totals, and a trace can help identify expensive type expansions. This example uses a finite public shape instead of computing every possible nested path. Added complexity should provide a specific safety benefit.",
        source: "https://github.com/microsoft/TypeScript/wiki/Performance",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type UserSummary = { id: string; name: string };\nfunction summarize(value: UserSummary): string { return `${value.id}: ${value.name}`; }\nconsole.log(summarize({ id: "u1", name: "Mira" }));\n// Diagnose a real project with:\n// npx tsc --noEmit --extendedDiagnostics\n// npx tsc --noEmit --generateTrace .trace',
            language: "ts",
            check: true,
          },
        ],
      },
    ],
    project: {
      title: "Utility types and typed event emitter",
      steps: [
        "Implement MyPartial, MyPick, MyOmit, MyReturnType, and MyAwaited without delegating to their built-in equivalents. Compare valid and invalid calls with TypeScript’s standard types.",
        "Use the typed emitter below to connect event names to payloads, then add once() and tests for unsubscribing during emission.",
        "Explain conditional distribution, recursion limits, and why a runtime value still needs validation. This starter handles one payload argument per event.",
      ],
      acceptance: [
        "Wrong keys and event payloads fail compile-time tests.",
        "Listeners can unsubscribe; separate emitter instances do not share state.",
        "Utility examples include optional properties, unions, and nested promises; document deliberate simplifications.",
      ],
      files: [
        {
          name: "utilities.ts",
          code: 'type MyPartial<T> = { [K in keyof T]?: T[K] };\ntype MyPick<T, K extends keyof T> = { [P in K]: T[P] };\ntype MyOmit<T, K extends PropertyKey> = { [P in keyof T as P extends K ? never : P]: T[P] };\ntype MyReturnType<T extends (...args: any[]) => any> =\n  T extends (...args: any[]) => infer R ? R : never;\n// Simplified PromiseLike recursion; compare the full built-in Awaited contract.\ntype MyAwaited<T> = T extends PromiseLike<infer U> ? MyAwaited<U> : T;\ntype User = { id: string; name: string };\nconst draft: MyPartial<User> = { name: "Mira" };\nconst id: MyPick<User, "id"> = { id: "u1" };\nconst name: MyOmit<User, "id"> = { name: "Mira" };\nconst total: MyReturnType<() => number> = 2;\nconst resolved: MyAwaited<Promise<Promise<string>>> = "ready";\nconsole.log(draft, id, name, total, resolved);',
          language: "ts",
          check: true,
        },
        {
          name: "emitter.ts",
          code: 'export class Emitter<Events extends object> {\n  private listeners: { [K in keyof Events]?: Set<(value: Events[K]) => void> } = {};\n  on<K extends keyof Events>(name: K, listener: (value: Events[K]) => void): () => void {\n    const group = this.listeners[name] ??= new Set<(value: Events[K]) => void>();\n    group.add(listener);\n    return () => { group.delete(listener); };\n  }\n  emit<K extends keyof Events>(name: K, value: Events[K]): void {\n    for (const listener of [...(this.listeners[name] ?? [])]) listener(value);\n  }\n}\nconst events = new Emitter<{ saved: { id: string }; failed: Error }>();\nconst off = events.on("saved", value => console.log(value.id));\nevents.emit("saved", { id: "u1" }); off();\n// events.emit("saved", { id: 1 }); // Error: id must be a string.',
          language: "ts",
          check: true,
        },
      ],
    },
  },
  {
    number: 6,
    name: "Level 6 — TypeScript in real-world applications",
    stage: "Advanced",
    goal: "Apply TypeScript effectively in production frontend applications, especially React.",
    projectBrief:
      "Build a React application with TypeScript, an external API, forms, filtering, reusable hooks, and automated tests.",
    inventory: [
      {
        name: "Typing external API responses",
        group: "Topics to cover",
      },
      {
        name: "Runtime validation using schemas (e.g., Zod)",
        group: "Topics to cover",
      },
      {
        name: "Understanding compile-time types vs. runtime values",
        group: "Topics to cover",
      },
      {
        name: "Typed error handling and result patterns",
        group: "Topics to cover",
      },
      {
        name: "Generics for API clients and reusable data functions",
        group: "Topics to cover",
      },
      {
        name: "Async application state modeling",
        group: "Topics to cover",
      },
      {
        name: "Type-safe configuration objects",
        group: "Topics to cover",
      },
      {
        name: "Working with third-party JavaScript libraries",
        group: "Topics to cover",
      },
      {
        name: "TypeScript with GSAP and browser animation APIs",
        group: "Topics to cover",
      },
      {
        name: "Testing TypeScript code with Vitest",
        group: "Topics to cover",
      },
      {
        name: "Mocking typed functions and services",
        group: "Topics to cover",
      },
      {
        name: "Type-aware linting",
        group: "Topics to cover",
      },
      {
        name: "`.tsx` and JSX typing",
        group: "React + TypeScript",
      },
      {
        name: "Component props and children",
        group: "React + TypeScript",
      },
      {
        name: "Event handlers",
        group: "React + TypeScript",
      },
      {
        name: "Typing `useState`, `useRef`, `useReducer`, and `useContext`",
        group: "React + TypeScript",
      },
      {
        name: "Custom hooks",
        group: "React + TypeScript",
      },
      {
        name: "Generic components",
        group: "React + TypeScript",
      },
      {
        name: "Discriminated union props",
        group: "React + TypeScript",
      },
      {
        name: "Context and state management",
        group: "React + TypeScript",
      },
      {
        name: "React Router integration",
        group: "React + TypeScript",
      },
      {
        name: "Next.js with TypeScript",
        group: "React + TypeScript",
      },
    ],
    lessons: [
      {
        name: "Typing external API responses",
        group: "Topics to cover",
        explanation:
          "A response type describes the data your application expects, not what the server actually sent. Treat JSON as unknown until a parser or schema checks its shape. Check the HTTP status separately from the payload.\n\nHere parseUser must succeed before the value can be trusted as a User. Keep transport data separate from internal models when the internal form adds guarantees or transforms fields. The example checks a small response instead of trusting a generic assertion on response.json.",
        source: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type User = { id: string; name: string };\nfunction parseUser(value: unknown): User {\n  if (typeof value !== "object" || value === null\n      || !("id" in value) || typeof value.id !== "string"\n      || !("name" in value) || typeof value.name !== "string") {\n    throw new Error("Invalid user response");\n  }\n  return { id: value.id, name: value.name };\n}\nconsole.log(parseUser({ id: "u1", name: "Mira" }));',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Runtime validation using schemas (e.g., Zod)",
        group: "Topics to cover",
        explanation:
          "A runtime schema checks actual data and can supply a matching TypeScript output type. This keeps the model and validation aligned. In Zod 4, safeParse returns distinguishable success and failure cases, while parse throws for invalid input. Async refinements need the async parsing methods.\n\nValidate where data enters the application instead of repeatedly asserting types inside it. Decide how errors will become useful UI feedback. This example accepts a valid user and rejects a numeric name. Zod is a separate dependency, not part of TypeScript.",
        source: "https://zod.dev/basics",
        environment: "zod",
        requires: "zod@4; strict TypeScript",
        files: [
          {
            name: "index.ts",
            code: 'import * as z from "zod";\nconst UserSchema = z.object({ id: z.string(), name: z.string().min(1) });\ntype User = z.infer<typeof UserSchema>;\nconst result = UserSchema.safeParse({ id: "u1", name: "Mira" });\nif (result.success) {\n  const user: User = result.data;\n  console.log(user.name);\n} else console.error(result.error.issues);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Understanding compile-time types vs. runtime values",
        group: "Topics to cover",
        explanation:
          "Types and interfaces usually disappear when TypeScript is compiled. Functions, classes, and schema objects remain as runtime values. An interface cannot be used with instanceof, and a type alias cannot validate JSON.\n\nChoose a real check for the job: a constructor check, a predicate, or a schema parser. Here the User alias describes the value for callers, while the function performs the runtime check. Both roles matter when accepting outside data.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/basic-types.html#erased-types",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type User = { name: string };\nfunction isUser(value: unknown): value is User {\n  return typeof value === "object" && value !== null\n    && "name" in value && typeof value.name === "string";\n}\nconst input: unknown = { name: "Mira" };\nif (isUser(input)) console.log(input.name.toUpperCase());\n// input instanceof User; // Invalid: User is not a runtime constructor.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Typed error handling and result patterns",
        group: "Topics to cover",
        explanation:
          "A result union represents expected failures as data. A shared identifying property makes callers check the case before reading the successful value. Unexpected bugs can still throw and need handling at an appropriate boundary.\n\nMake error cases specific enough to support recovery. This parser distinguishes invalid numeric input from success rather than treating an error message as a number. A production API can add transport, validation, or authorization cases when needed.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type Result<T> = { ok: true; value: T } | { ok: false; error: "invalid-number" };\nfunction parseAmount(text: string): Result<number> {\n  const value = Number(text);\n  return text.trim() && Number.isFinite(value)\n    ? { ok: true, value } : { ok: false, error: "invalid-number" };\n}\nconst result = parseAmount("12");\nconsole.log(result.ok ? result.value.toFixed(2) : result.error);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Generics for API clients and reusable data functions",
        group: "Topics to cover",
        explanation:
          "A generic API helper should preserve a guarantee established by a parser. A caller's type argument alone cannot make response data trustworthy. Accept a parser that checks unknown input before returning T.\n\nKeep HTTP handling and cancellation in the transport helper, and domain checks in the parser. This function sends no request until called. Its result type comes from the parser, keeping the runtime check connected to the static type.",
        source: "https://www.typescriptlang.org/docs/handbook/2/generics.html",
        environment: "browser",
        requires: "Browser DOM; compile with the Level 1 setup",
        files: [
          {
            name: "index.ts",
            code: 'async function getJson<T>(url: string, parse: (data: unknown) => T, signal?: AbortSignal): Promise<T> {\n  const response = await fetch(url, { signal });\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  const data: unknown = await response.json();\n  return parse(data);\n}\nconst parseName = (data: unknown): string => {\n  if (typeof data !== "string") throw new Error("Expected a name");\n  return data;\n};\n// const name = await getJson("/api/name", parseName, controller.signal);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Async application state modeling",
        group: "Topics to cover",
        explanation:
          "Represent async state as separate, mutually exclusive cases. This avoids combinations of booleans and optional fields that can contradict each other. A discriminated union can require data in the success case and an error in the failure case.\n\nCancellation and stale requests still need lifecycle decisions; types alone do not manage them. This renderer cannot read data outside success because the other cases do not contain that property. The same contract is useful in reducers and React hooks.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type LoadState<T> =\n  | { status: "idle" }\n  | { status: "loading" }\n  | { status: "success"; data: T }\n  | { status: "error"; message: string };\nfunction label(state: LoadState<string[]>): string {\n  switch (state.status) {\n    case "idle": return "Choose a list";\n    case "loading": return "Loading";\n    case "success": return state.data.join(", ");\n    case "error": return state.message;\n  }\n}\nconsole.log(label({ status: "success", data: ["Book"] }));',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Type-safe configuration objects",
        group: "Topics to cover",
        explanation:
          "satisfies checks a configuration against a contract while retaining useful inference. Add as const where you need readonly literal choices. Neither operation validates configuration loaded dynamically from a file or server.\n\nA finite key union lets the checker report missing required options. This example requires both feature configurations and preserves their literal modes. An extra or misspelled key in the fresh object is reported rather than accepted as an arbitrary dictionary entry.",
        source:
          "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type Feature = "tooltip" | "dialog";\ntype Config = { enabled: boolean; mode: "auto" | "manual" };\nconst features = {\n  tooltip: { enabled: true, mode: "auto" },\n  dialog: { enabled: true, mode: "manual" }\n} as const satisfies Record<Feature, Config>;\nconsole.log(features.tooltip.mode); // "auto"',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Working with third-party JavaScript libraries",
        group: "Topics to cover",
        explanation:
          "Keep an untyped dependency's uncertainty at its boundary instead of spreading any through the app. Describe the small part of its API you use, verify the runtime behavior, and use an adapter when it helps isolate dependency-specific details.\n\nDeclarations must match the existing JavaScript. This example shows both local vendor files so the description can be compared with the implementation. For a remote package, first check for bundled types or a maintained @types package before writing declarations yourself.",
        source:
          "https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "vendor.js",
            code: "export function normalizeLabel(value) { return String(value).trim(); }",
            language: "js",
            check: false,
          },
          {
            name: "vendor.d.ts",
            code: "export function normalizeLabel(value: string): string;",
            language: "ts",
            check: true,
          },
          {
            name: "index.ts",
            code: 'import { normalizeLabel } from "./vendor.js";\nconsole.log(normalizeLabel(" Mira "));',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "TypeScript with GSAP and browser animation APIs",
        group: "Topics to cover",
        explanation:
          "GSAP includes declarations for tweens and contexts. Native browser animation APIs are described by lib.dom. Let inference describe animation instances and keep the handles needed for cleanup. Types do not prove that a selector finds an element or that an animation is accessible.\n\nUse runtime element checks, reduced-motion handling, and explicit teardown. This helper returns a destroy function for a GSAP context or native Animation. Cancelling a native animation can reject its finished promise, so handle that rejection if you observe the promise.",
        source: "https://gsap.com/docs/v3/Installation/",
        environment: "gsap",
        requires: "GSAP 3.11+; DOM declarations; browser runtime",
        files: [
          {
            name: "index.ts",
            code: 'import { gsap } from "gsap";\nexport function mountMotion(element: HTMLElement): () => void {\n  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};\n  const context = gsap.context(() => {\n    gsap.from(element, { y: 16, opacity: 0, duration: 0.4 });\n  }, element);\n  return () => context.revert();\n}\nexport function nativeFade(element: HTMLElement): () => void {\n  const animation = element.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 });\n  void animation.finished.catch(() => {}); // Cancellation is expected during teardown.\n  return () => animation.cancel();\n}',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Testing TypeScript code with Vitest",
        group: "Topics to cover",
        explanation:
          "Runtime tests check behavior, while the type checker checks static contracts. Vitest can run TypeScript tests, but passing them does not replace tsc --noEmit. Run both in CI.\n\nFocus tests on real behavior, especially parsing and state changes. This example checks a small conversion and rejection of an invalid value. The function and its test live in separate files, as they would across a normal project boundary.",
        source: "https://vitest.dev/guide/",
        environment: "vitest",
        requires: "Vitest 4; separate strict type checking",
        files: [
          {
            name: "parse.ts",
            code: 'export function parseCount(text: string): number {\n  const value = Number(text);\n  if (!text.trim() || !Number.isInteger(value) || value < 0) throw new Error("Invalid count");\n  return value;\n}',
            language: "ts",
            check: true,
          },
          {
            name: "parse.test.ts",
            code: 'import { expect, test } from "vitest";\nimport { parseCount } from "./parse.js";\ntest("parses and validates a count", () => {\n  expect(parseCount("12")).toBe(12);\n  expect(() => parseCount("nope")).toThrow("Invalid count");\n});',
            language: "ts",
            check: true,
          },
          {
            name: "commands.sh",
            code: "npm install --save-dev vitest\nnpx tsc --noEmit\nnpx vitest run",
            language: "shell",
            check: true,
          },
        ],
      },
      {
        name: "Mocking typed functions and services",
        group: "Topics to cover",
        explanation:
          "A typed mock lets a test control a service's response while preserving its function signature. Mock a boundary your code owns rather than every internal function. Checking behavior from a realistic response is usually more useful than only checking that a mock was called.\n\nThis example supplies a predictable async user lookup and checks the resolved model. The mock's generic signature rejects incompatible resolved values during type checking. The runtime test checks the returned data.",
        source: "https://vitest.dev/guide/mocking/functions",
        environment: "vitest",
        requires: "Vitest 4; save as a *.test.ts file",
        files: [
          {
            name: "service.test.ts",
            code: 'import { expect, test, vi } from "vitest";\ntype User = { id: string; name: string };\ntest("loads a user through a typed service", async () => {\n  const load = vi.fn<(id: string) => Promise<User>>();\n  load.mockResolvedValue({ id: "u1", name: "Mira" });\n  const user = await load("u1");\n  expect(user.name).toBe("Mira");\n  expect(load).toHaveBeenCalledWith("u1");\n});',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Type-aware linting",
        group: "Topics to cover",
        explanation:
          "Type-aware lint rules use the checker's information to find problems such as unhandled promises and unsafe uses of any. They need project configuration and cost more than syntax-only rules. Choose rules for real failure cases and keep tool versions compatible.\n\nIn typescript-eslint v8, projectService obtains type information for files included in a project. This flat configuration targets TypeScript sources. Leave eslint.config.mjs outside that pattern unless you configure it deliberately too. Await, return, or catch a promise, or explicitly document why it is being ignored.",
        source: "https://typescript-eslint.io/getting-started/typed-linting/",
        environment: "tooling",
        requires:
          "typescript-eslint v8; ESLint flat config; project includes src files; modern Node ESM",
        files: [
          {
            name: "eslint.config.mjs",
            code: 'import tseslint from "typescript-eslint";\nexport default tseslint.config({\n  files: ["src/**/*.{ts,tsx}"],\n  extends: [...tseslint.configs.recommendedTypeChecked],\n  languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } }\n});',
            language: "js",
            check: true,
          },
        ],
      },
      {
        name: "`.tsx` and JSX typing",
        group: "React + TypeScript",
        explanation:
          "Use .tsx for files containing JSX so TypeScript parses tags as expressions. React's type packages describe elements, props, and hooks. Set jsx to match your build tool: Vite React commonly uses react-jsx, while a framework may preserve JSX for its own transform.\n\nA React element description differs from the native DOM instance rendered from it. This component returns JSX; a ref to its input would hold an HTMLInputElement. Install matching react, react-dom, and their @types packages.",
        source: "https://react.dev/learn/typescript",
        environment: "react",
        requires:
          "React 19 + react-dom + matching @types packages; JSX enabled",
        files: [
          {
            name: "App.tsx",
            code: "export default function App() {\n  return <main><h1>Typed React</h1><p>JSX describes what to render.</p></main>;\n}",
            language: "tsx",
            check: true,
          },
        ],
      },
      {
        name: "Component props and children",
        group: "React + TypeScript",
        explanation:
          "Props describe a component's public inputs. Declare children explicitly when the component accepts them. ReactNode covers values React can render; a function used as a child needs a separate call signature. A destructuring default can supply an optional prop's value.\n\nKeep props focused on what consumers need. This panel requires a title and renderable children, with an optional compact setting. Another component can use it without assertions.",
        source: "https://react.dev/learn/typescript",
        environment: "react",
        requires:
          "React 19 + react-dom + matching @types packages; JSX enabled",
        files: [
          {
            name: "Panel.tsx",
            code: 'import type { ReactNode } from "react";\ntype PanelProps = { title: string; children: ReactNode; compact?: boolean };\nexport function Panel({ title, children, compact = false }: PanelProps) {\n  return <section data-compact={compact}><h2>{title}</h2>{children}</section>;\n}\nexport default function App() { return <Panel title="Profile"><p>Mira</p></Panel>; }',
            language: "tsx",
            check: true,
          },
        ],
      },
      {
        name: "Event handlers",
        group: "React + TypeScript",
        explanation:
          "React handlers use React's event wrappers, rather than the native KeyboardEvent or MouseEvent types from lib.dom. Inline handlers often receive the right type through inference. For a named handler, import an appropriate React handler or event type.\n\ncurrentTarget has the type of the element whose handler is running, making it useful for reading an input's value. target can be a nested element that originated the event. Here the handler keeps a controlled text field synchronized with state.",
        source: "https://react.dev/learn/typescript#typing-dom-events",
        environment: "react",
        requires:
          "React 19 + react-dom + matching @types packages; JSX enabled",
        files: [
          {
            name: "Search.tsx",
            code: 'import { useState } from "react";\nimport type { ChangeEventHandler } from "react";\nexport default function Search() {\n  const [query, setQuery] = useState("");\n  const onChange: ChangeEventHandler<HTMLInputElement> = event => setQuery(event.currentTarget.value);\n  return <label>Search <input value={query} onChange={onChange} /></label>;\n}',
            language: "tsx",
            check: true,
          },
        ],
      },
      {
        name: "Typing `useState`, `useRef`, `useReducer`, and `useContext`",
        group: "React + TypeScript",
        explanation:
          "Hooks can infer simple state from its initial value. Supply a type argument when that value does not include later possibilities. A DOM ref often starts as null. For useReducer, a discriminated union describes actions; for nullable context, check the value when consuming it.\n\nThis example combines all four hooks. The reducer keeps arithmetic together, the ref focuses an input, and context supplies a typed user name. In a real app, place providers deliberately rather than creating context for every local variable.",
        source: "https://react.dev/learn/typescript",
        environment: "react",
        requires:
          "React 19 + react-dom + matching @types packages; JSX enabled",
        files: [
          {
            name: "Hooks.tsx",
            code: 'import { createContext, useContext, useReducer, useRef, useState } from "react";\nconst UserContext = createContext<{ name: string } | null>(null);\ntype Action = { type: "add"; amount: number } | { type: "reset" };\nfunction reducer(count: number, action: Action): number {\n  return action.type === "reset" ? 0 : count + action.amount;\n}\nfunction Editor() {\n  const user = useContext(UserContext);\n  if (!user) throw new Error("Missing UserContext provider");\n  return <p>{user.name}</p>;\n}\nexport default function App() {\n  const [name, setName] = useState<string | null>(null);\n  const input = useRef<HTMLInputElement>(null);\n  const [count, dispatch] = useReducer(reducer, 0);\n  return <UserContext.Provider value={{ name: name ?? "Guest" }}>\n    <input ref={input} onChange={event => setName(event.currentTarget.value)} />\n    <button onClick={() => input.current?.focus()}>Focus input</button>\n    <button onClick={() => dispatch({ type: "add", amount: 1 })}>Count {count}</button>\n    <Editor />\n  </UserContext.Provider>;\n}',
            language: "tsx",
            check: true,
          },
        ],
      },
      {
        name: "Custom hooks",
        group: "React + TypeScript",
        explanation:
          "A custom hook packages reusable stateful behavior. It follows the same lifecycle and dependency rules as built-in hooks. Keep its result type meaningful instead of returning any, and clean up timers, subscriptions, or other ongoing work.\n\nThis generic debounce hook delays updates while preserving the input type. It cancels the timeout when the value or delay changes and when the component unmounts. It does not validate the value or determine whether delaying that interaction gives a good user experience.",
        source: "https://react.dev/learn/reusing-logic-with-custom-hooks",
        environment: "react",
        requires:
          "React 19 + react-dom + matching @types packages; JSX enabled",
        files: [
          {
            name: "useDebounced.tsx",
            code: 'import { useEffect, useState } from "react";\nexport function useDebounced<T>(value: T, delay = 250): T {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const timer = window.setTimeout(() => setDebounced(value), delay);\n    return () => window.clearTimeout(timer);\n  }, [value, delay]);\n  return debounced;\n}',
            language: "tsx",
            check: true,
          },
        ],
      },
      {
        name: "Generic components",
        group: "React + TypeScript",
        explanation:
          "A generic component connects each item's type to its callbacks without requiring all consumers to share one broad model. Let the props infer T where possible. Require a stable key for changing collections instead of using array positions.\n\nA function declaration avoids ambiguity between generics and JSX in TSX; an arrow form often needs <T,>. This list gives renderItem the actual input item type. It describes React props and does not validate an outside dataset at runtime.",
        source: "https://react.dev/learn/typescript",
        environment: "react",
        requires:
          "React 19 + react-dom + matching @types packages; JSX enabled",
        files: [
          {
            name: "List.tsx",
            code: 'import type { Key, ReactNode } from "react";\ntype ListProps<T> = { items: readonly T[]; keyOf: (item: T) => Key; renderItem: (item: T) => ReactNode };\nexport function List<T>({ items, keyOf, renderItem }: ListProps<T>) {\n  return <ul>{items.map(item => <li key={keyOf(item)}>{renderItem(item)}</li>)}</ul>;\n}\nexport default function App() {\n  return <List items={[{ id: "u1", name: "Mira" }]} keyOf={user => user.id} renderItem={user => user.name} />;\n}',
            language: "tsx",
            check: true,
          },
        ],
      },
      {
        name: "Discriminated union props",
        group: "React + TypeScript",
        explanation:
          "A discriminated prop union describes allowed combinations of inputs. It can distinguish a parent-controlled value from locally owned state, or a link from a button. The checker can then reject incompatible combinations.\n\nAlways call hooks unconditionally, even when props select different behavior. This component creates local state on every render but uses it only in the local case. The controlled case requires onChange; the local case handles its own update.",
        source: "https://react.dev/learn/typescript",
        environment: "react",
        requires:
          "React 19 + react-dom + matching @types packages; JSX enabled",
        files: [
          {
            name: "Toggle.tsx",
            code: 'import { useState } from "react";\ntype Props =\n  | { mode: "controlled"; value: boolean; onChange: (value: boolean) => void }\n  | { mode: "local"; initial?: boolean };\nexport function Toggle(props: Props) {\n  const [local, setLocal] = useState(props.mode === "local" ? props.initial ?? false : false);\n  const checked = props.mode === "controlled" ? props.value : local;\n  const change = (value: boolean) => {\n    if (props.mode === "controlled") props.onChange(value);\n    else setLocal(value);\n  };\n  return <input type="checkbox" checked={checked} onChange={event => change(event.currentTarget.checked)} />;\n}',
            language: "tsx",
            check: true,
          },
        ],
      },
      {
        name: "Context and state management",
        group: "React + TypeScript",
        explanation:
          "Context passes a typed value through a provider. It does not decide who owns state or automatically prevent unnecessary rerenders. Keep local state local; use a reducer or focused store when shared transitions become complex.\n\nA small consumer hook can check that a required provider exists. Throwing for a missing provider exposes the setup problem instead of hiding null with an assertion or supplying a misleading default. This provider owns one theme value and exposes only the operations its consumers need.",
        source: "https://react.dev/learn/scaling-up-with-reducer-and-context",
        environment: "react",
        requires:
          "React 19 + react-dom + matching @types packages; JSX enabled",
        files: [
          {
            name: "Theme.tsx",
            code: 'import { createContext, useContext, useState } from "react";\nimport type { ReactNode } from "react";\ntype Theme = "light" | "dark";\ntype ThemeState = { theme: Theme; setTheme: (theme: Theme) => void };\nconst ThemeContext = createContext<ThemeState | null>(null);\nexport function ThemeProvider({ children }: { children: ReactNode }) {\n  const [theme, setTheme] = useState<Theme>("light");\n  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;\n}\nexport function useTheme(): ThemeState {\n  const value = useContext(ThemeContext);\n  if (!value) throw new Error("ThemeProvider is required");\n  return value;\n}',
            language: "tsx",
            check: true,
          },
        ],
      },
      {
        name: "React Router integration",
        group: "React + TypeScript",
        explanation:
          "Route parameters are URL input and need runtime validation even when their names are typed. React Router's declarative routing, data routers, and framework route modules use different setups. Follow the setup for the approach you choose.\n\nThis example uses React Router 7's declarative API from react-router. It handles a missing parameter before using it. Parse and validate numeric identifiers rather than asserting that a URL string is a number. Install the version matching the documentation you follow.",
        source: "https://reactrouter.com/7.18.4/start/declarative/installation",
        environment: "router",
        requires:
          "React + React Router 7 declarative mode; browser history fallback in hosting",
        files: [
          {
            name: "App.tsx",
            code: 'import { BrowserRouter, Link, Route, Routes, useParams } from "react-router";\nfunction UserPage() {\n  const { userId } = useParams<{ userId: string }>();\n  return <h1>{userId ? `User ${userId}` : "Missing user id"}</h1>;\n}\nexport default function App() {\n  return <BrowserRouter><Link to="/users/u1">Mira</Link>\n    <Routes><Route path="/users/:userId" element={<UserPage />} /></Routes>\n  </BrowserRouter>;\n}',
            language: "tsx",
            check: true,
          },
        ],
      },
      {
        name: "Next.js with TypeScript",
        group: "React + TypeScript",
        explanation:
          "Next.js adds its own routing and server/client model to TypeScript. Keep server-only work out of client bundles and put interactive hooks behind a client boundary. Follow the generated types for the installed Next.js version. Types do not validate request input.\n\nThis App Router example uses the asynchronous params convention of modern Next.js, including Next 16. The route awaits its parameter before rendering. It belongs in a Next project, not a plain Vite client app. Run the framework's build and type checks alongside tests, and check the version before copying older synchronous-params examples.",
        source: "https://nextjs.org/docs/app/api-reference/config/typescript",
        environment: "next",
        requires:
          "Next.js 16 App Router project; framework-generated route types/build",
        files: [
          {
            name: "app/users/[userId]/page.tsx",
            code: "// Next.js App Router server component; params is a Promise in this version family.\nexport default async function UserPage({ params }: { params: Promise<{ userId: string }> }) {\n  const { userId } = await params;\n  return <main><h1>User {userId}</h1></main>;\n}",
            language: "tsx",
            check: true,
          },
        ],
      },
    ],
    project: {
      title: "Production React application",
      steps: [
        "Create a React 19 TypeScript app with a pinned toolchain. Use the Level 6 validated API boundary and discriminated loading/success/error state.",
        "Build an accessible form, filter the validated results, and extract request handling into a hook with AbortController cleanup. Use the reducer below as a small, testable state unit.",
        "Test schema failures, network errors, loading, empty results, validation, filtering, and unmount cancellation. Add router pages and context only when the app needs them.",
      ],
      acceptance: [
        "API JSON is validated at runtime before rendering; failed HTTP responses are handled.",
        "Forms, hooks, API data, and reusable components have explicit contracts.",
        "Runtime tests and type checking run in CI; the UI exposes loading and errors accessibly.",
      ],
      files: [
        {
          name: "filter.ts",
          code: 'export type Item = { id: string; title: string };\nexport type State = { query: string; items: Item[] };\nexport type Action = { type: "query"; value: string } | { type: "loaded"; items: Item[] };\nexport function reducer(state: State, action: Action): State {\n  switch (action.type) {\n    case "query": return { ...state, query: action.value };\n    case "loaded": return { ...state, items: action.items };\n  }\n}\nexport function visibleItems(state: State): Item[] {\n  return state.items.filter(item => item.title.toLowerCase().includes(state.query.toLowerCase()));\n}',
          language: "ts",
          check: true,
        },
        {
          name: "filter.test.ts",
          code: 'import { expect, test } from "vitest";\nimport { reducer, visibleItems } from "./filter.js";\ntest("filters without losing the original items", () => {\n  const initial = { query: "", items: [{ id: "1", title: "Book" }, { id: "2", title: "Pen" }] };\n  const next = reducer(initial, { type: "query", value: "BOO" });\n  expect(visibleItems(next)).toEqual([{ id: "1", title: "Book" }]);\n  expect(next.items).toHaveLength(2);\n});',
          language: "ts",
          check: true,
        },
      ],
    },
  },
  {
    number: 7,
    name: "Level 7 — TypeScript library authoring",
    stage: "Expert",
    goal: "Design TypeScript libraries that other developers can install and use safely.",
    projectBrief:
      "Publish your TypeScript Tooltip library as an npm package with generated types, documentation, usage examples, and tests.",
    inventory: [
      {
        name: "Designing ergonomic public APIs",
        group: "Topics to cover",
      },
      {
        name: "Type inference across library boundaries",
        group: "Topics to cover",
      },
      {
        name: "Advanced generic API design",
        group: "Topics to cover",
      },
      {
        name: "Function overloads vs. union parameters",
        group: "Topics to cover",
      },
      {
        name: "Creating and publishing `.d.ts` files",
        group: "Topics to cover",
      },
      {
        name: "`declaration` and `declarationMap`",
        group: "Topics to cover",
      },
      {
        name: "Package `exports` and `types`",
        group: "Topics to cover",
      },
      {
        name: "ESM and CommonJS interoperability",
        group: "Topics to cover",
      },
      {
        name: "Type-safe npm package configuration",
        group: "Topics to cover",
      },
      {
        name: "Testing public types with tools such as `tsd` or `TSTyche`",
        group: "Topics to cover",
      },
      {
        name: "Writing declarations for untyped JavaScript libraries",
        group: "Topics to cover",
      },
      {
        name: "Backward-compatible API and type design",
        group: "Topics to cover",
      },
      {
        name: "TypeScript package documentation",
        group: "Topics to cover",
      },
    ],
    lessons: [
      {
        name: "Designing ergonomic public APIs",
        group: "Topics to cover",
        explanation:
          "An approachable public API makes ordinary calls easy and unsafe calls difficult. Prefer a small options object, clear defaults, and named exported models to positional arguments that callers can swap accidentally. Keep implementation-only types and unnecessary DOM details private.\n\nDocument how long an object remains usable, how it is cleaned up, and how failures behave. This minimal factory returns a stable handle with one operation. A real tooltip also needs focus and hover behavior, positioning, and accessible relationships. Consumers should not need to manipulate its internal nodes.",
        source:
          "https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html",
        environment: "browser",
        requires: "Browser DOM; compile with the Level 1 setup",
        files: [
          {
            name: "index.ts",
            code: 'export interface TooltipOptions { text: string; delay?: number }\nexport interface TooltipHandle { destroy(): void }\nexport function attachTooltip(target: HTMLElement, options: TooltipOptions): TooltipHandle {\n  const previous = target.getAttribute("title");\n  target.setAttribute("title", options.text); // Minimal native-tooltip implementation.\n  return { destroy() {\n    if (previous === null) target.removeAttribute("title");\n    else target.setAttribute("title", previous);\n  } };\n}',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Type inference across library boundaries",
        group: "Topics to cover",
        explanation:
          "A library's inference must work through its generated declarations, not just inside its source repository. Keep useful generic relationships in exported signatures. Avoid a wider result annotation that discards details callers need.\n\nBuild the package, inspect its .d.ts output, and compile a consumer against the packed package. Importing local source can hide packaging errors. This helper's declaration preserves the relationship between the input element type and its possibly missing result without exposing implementation details.",
        source:
          "https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'export function first<T>(values: readonly T[]): T | undefined { return values[0]; }\n// The emitted .d.ts retains: first<T>(values: readonly T[]): T | undefined;\nconst result = first([{ id: "u1", name: "Mira" }]);\nconsole.log(result?.name.toUpperCase());',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Advanced generic API design",
        group: "Topics to cover",
        explanation:
          "Use advanced generics to express relationships callers actually need. A useful API infers obvious arguments, restricts keys, and rejects mismatched values without requiring callers to understand its implementation types.\n\nBe clear about who can mutate data. This store keeps its object inside a closure and exposes get and set methods whose value types follow the chosen key. The caller supplies a model with a theme union, so setting light later is valid. An intentionally narrower literal model would reject that change.",
        source: "https://www.typescriptlang.org/docs/handbook/2/generics.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'export function createStore<T extends object>(initial: T) {\n  const state = { ...initial };\n  return {\n    get<K extends keyof T>(key: K): T[K] { return state[key]; },\n    set<K extends keyof T>(key: K, value: T[K]): void { state[key] = value; }\n  };\n}\nconst store = createStore<{ theme: "dark" | "light"; compact: boolean }>({ theme: "dark", compact: false });\nstore.set("theme", "light");\nconsole.log(store.get("theme"));\n// store.set("compact", "yes"); // Error.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Function overloads vs. union parameters",
        group: "Topics to cover",
        explanation:
          "Use a union parameter when all accepted alternatives produce the same result shape. Use overloads when distinct argument patterns imply different result types or numbers of arguments. Too many overloads can complicate maintenance and inference.\n\nThe implementation signature is not another public overload. Supporting a union-typed argument requires a matching public signature. The formatter needs no overload because both forms return a string. The separate lookup shows a relationship where overloads are useful.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/functions.html#writing-good-overloads",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'export function label(value: string | number): string { return String(value); }\nexport function convert(value: string): string[];\nexport function convert(value: string[]): string;\nexport function convert(value: string | string[]): string | string[] {\n  return typeof value === "string" ? value.split(",") : value.join(",");\n}\nconsole.log(label(42), convert("a,b"));',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Creating and publishing `.d.ts` files",
        group: "Topics to cover",
        explanation:
          "Generate .d.ts declarations from checked source when possible, rather than maintaining a second public API by hand. Include them in the published package and point its type entry to them. Declarations describe code; they do not execute it.\n\nBuild first, inspect the package contents, and test a consumer. A package can work through a monorepo source path yet fail after publishing because output files or exports are missing. These commands generate files locally and inspect a dry run. They do not publish the package.",
        source:
          "https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "commands.sh",
            code: "npx tsc -p tsconfig.build.json --declaration --emitDeclarationOnly false\nnpm pack --dry-run\n# Inspect generated .d.ts and the included JavaScript before publishing.",
            language: "shell",
            check: true,
          },
        ],
      },
      {
        name: "`declaration` and `declarationMap`",
        group: "Topics to cover",
        explanation:
          "declaration generates type descriptions. declarationMap connects those descriptions to source files for editor navigation. sourceMap has a separate role: connecting running JavaScript to TypeScript for debugging.\n\nChoose whether to ship sources and maps based on the navigation experience you want. Set output paths explicitly and test the packaged layout. This configuration builds ESM JavaScript, declarations, and declaration maps from one public entry point.",
        source: "https://www.typescriptlang.org/tsconfig/#declarationMap",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "package.json",
            code: '{"type":"module"}',
            language: "json",
            check: true,
          },
          {
            name: "tsconfig.build.json",
            code: '{"compilerOptions":{"target":"ES2022","module":"NodeNext","moduleResolution":"NodeNext","strict":true,"rootDir":"src","outDir":"dist","declaration":true,"declarationMap":true,"noEmitOnError":true},"include":["src"]}',
            language: "json",
            check: true,
          },
          {
            name: "src/index.ts",
            code: "export function greet(name: string): string { return `Hello, ${name}`; }",
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Package `exports` and `types`",
        group: "Topics to cover",
        explanation:
          "Package exports define the entry points consumers can resolve. types identifies declarations, while a runtime entry must point to actual JavaScript. The declarations' module interpretation must match the output format. A filename alone does not make a package support both ESM and CommonJS.\n\nThis sketch is ESM-only. The types condition comes before import, and the top-level types field supports tools that read it. files limits what is packed. Test the tarball in an independent consumer rather than relying on source aliases.",
        source:
          "https://www.typescriptlang.org/docs/handbook/modules/reference.html#packagejson-exports",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "package.json",
            code: '{\n  "name": "@study/tooltip", "version": "0.1.0", "type": "module",\n  "types": "./dist/index.d.ts",\n  "exports": { ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" } },\n  "files": ["dist"]\n}',
            language: "json",
            check: true,
          },
        ],
      },
      {
        name: "ESM and CommonJS interoperability",
        group: "Topics to cover",
        explanation:
          "ESM and CommonJS differ in how code is evaluated and how imports and exports behave. With NodeNext, checking follows package metadata and extensions. .mts/.mjs explicitly select ESM, while .cts/.cjs select CommonJS. A bundler may handle interoperability differently from Node running directly.\n\nPrefer one documented format unless both are needed. Supporting both requires separate runtime entries and declarations interpreted correctly for each. Changing exports does not generate those files. This example shows explicit source formats, not a complete dual-format package build.",
        source:
          "https://www.typescriptlang.org/docs/handbook/modules/appendices/esm-cjs-interop.html",
        environment: "node-format",
        requires: "Node.js; TypeScript NodeNext configuration for .mts/.cts",
        files: [
          {
            name: "esm.mts",
            code: 'export const format = "esm";',
            language: "ts",
            check: true,
          },
          {
            name: "common.cts",
            code: 'const api = { format: "commonjs" };\nexport = api;',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Type-safe npm package configuration",
        group: "Topics to cover",
        explanation:
          "npm, Node, bundlers, and type resolvers all read package.json. TypeScript does not automatically prove that its referenced output files exist or its exports form a usable package. Check the installed artifact as well as the source configuration.\n\nChoose peer, runtime, and development dependencies deliberately. Include generated output and check a consumer with supported module settings. These commands inspect metadata and the tarball before release. A dry run is a review step, not publication.",
        source:
          "https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "commands.sh",
            code: "npm pkg get name version type types exports files\nnpm pack --dry-run\n# Then create a consumer fixture and install the local .tgz from npm pack.\n# Run that consumer's type check and a runtime import smoke test.",
            language: "shell",
            check: true,
          },
        ],
      },
      {
        name: "Testing public types with tools such as `tsd` or `TSTyche`",
        group: "Topics to cover",
        explanation:
          "Public type tests check inferred types and calls that should be rejected. Tools such as tsd and TSTyche can express these expectations, which ordinary runtime tests cannot. Test the package's public declarations rather than private source paths.\n\nThis tsd fixture checks a result type and a deliberately invalid call. It belongs in a built package with a working types entry. expectError has meaning to tsd; it does not make that expression safe in an ordinary application.",
        source: "https://github.com/tsdjs/tsd",
        environment: "type-test",
        requires: "tsd; built package exporting greet(name: string): string",
        files: [
          {
            name: "index.test-d.ts",
            code: 'import { expectError, expectType } from "tsd";\nimport { greet } from ".";\nexpectType<string>(greet("Mira"));\nexpectError(greet(42));',
            language: "ts",
            check: false,
          },
          {
            name: "commands.sh",
            code: "npm install --save-dev tsd\n# Build the package and confirm package.json.types points to its declarations.\nnpx tsd",
            language: "shell",
            check: true,
          },
        ],
      },
      {
        name: "Writing declarations for untyped JavaScript libraries",
        group: "Topics to cover",
        explanation:
          "A declaration for JavaScript must match its real parameters, return values, optional inputs, and module shape. A blanket declare module that makes exports any hides errors without providing useful checks. Do not invent exports to satisfy the consuming code.\n\nA sibling .d.ts can describe a small local library. For a published dependency, follow its actual module shape and test a consumer. Here the declaration can be compared directly with the visible implementation.",
        source:
          "https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "join.js",
            code: 'export function joinLabel(parts) { return parts.join(" / "); }',
            language: "js",
            check: false,
          },
          {
            name: "join.d.ts",
            code: "export function joinLabel(parts: readonly string[]): string;",
            language: "ts",
            check: true,
          },
          {
            name: "index.ts",
            code: 'import { joinLabel } from "./join.js";\nconsole.log(joinLabel(["Library", "Types"]));',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Backward-compatible API and type design",
        group: "Topics to cover",
        explanation:
          "Types are part of a public API. Restricting an accepted input, changing inference, requiring a previously optional field, or adding a union case handled exhaustively can break consumers even when runtime behavior seems compatible.\n\nReview releases with consumer fixtures and public type tests. Prefer adding an option with a documented default to silently changing an existing parameter's meaning. Preserve supported calls deliberately and treat a meaningful contract break as a versioning decision.",
        source:
          "https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'export interface FormatOptions { uppercase?: boolean }\nexport function formatLabel(value: string, options: FormatOptions = {}): string {\n  return options.uppercase ? value.toUpperCase() : value;\n}\nconsole.log(formatLabel("Mira")); // Existing call remains supported.\nconsole.log(formatLabel("Mira", { uppercase: true }));',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "TypeScript package documentation",
        group: "Topics to cover",
        explanation:
          "Package documentation should explain installation, runtime requirements, ownership and cleanup, errors, supported compiler versions, and the public import path. Check examples against the published declarations. They should not depend on private source files.\n\nExplain what a generic parameter connects, rather than merely naming its letter. Start with the simplest useful call, then show variations. This consumer uses only exported contracts, showing the callback's inferred model and an explicit destroy step.",
        source:
          "https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'export interface TooltipOptions<T> { data: T; label: (data: T) => string }\nexport function tooltipText<T>(options: TooltipOptions<T>): string { return options.label(options.data); }\nconsole.log(tooltipText({ data: { name: "Mira" }, label: user => user.name }));\n// Package docs should separately show the actual DOM tooltip\'s attach/destroy lifecycle.',
            language: "ts",
            check: true,
          },
        ],
      },
    ],
    project: {
      title: "Package and release the Tooltip library",
      steps: [
        "Bring the completed Tooltip.ts from Level 3 into src/Tooltip.ts. The package skeleton below emits ESM JavaScript and declarations; replace the example package name with one you own.",
        "Add README setup, accessible usage, methods, cleanup, supported runtimes, version compatibility, and examples. Add runtime DOM tests and public type tests from Level 7.",
        "Build, inspect npm pack --dry-run, install the tarball into a separate consumer, and verify both JS and TS imports. Publish only after reviewing the actual package and account permissions.",
      ],
      acceptance: [
        "The tarball contains dist JavaScript, declarations, README, and license; no secrets or development artifacts.",
        "A clean ESM consumer resolves exports and types; unsupported CommonJS usage is documented.",
        "Examples and tests cover options, callbacks, update, destroy, and incompatible payloads.",
      ],
      files: [
        {
          name: "package.json",
          code: '{\n  "name": "@your-scope/typed-tooltip", "version": "0.1.0", "type": "module",\n  "files": ["dist"], "types": "./dist/index.d.ts",\n  "exports": { ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" } },\n  "scripts": { "build": "tsc -p tsconfig.build.json", "prepack": "npm run build" },\n  "devDependencies": { "typescript": "5.9.3" }\n}',
          language: "json",
          check: true,
        },
        {
          name: "tsconfig.build.json",
          code: '{\n  "compilerOptions": {\n    "target": "ES2022", "module": "NodeNext", "moduleResolution": "NodeNext",\n    "lib": ["ES2022", "DOM"], "strict": true, "declaration": true,\n    "declarationMap": true, "sourceMap": true, "rootDir": "src", "outDir": "dist"\n  },\n  "include": ["src"]\n}',
          language: "json",
          check: true,
        },
        {
          name: "src/index.ts",
          code: '// Copy the Level 3 Tooltip.ts into src/Tooltip.ts before building.\nexport { Tooltip } from "./Tooltip.js";\nexport type { TooltipOptions } from "./Tooltip.js";',
          language: "ts",
          check: true,
        },
        {
          name: "commands.sh",
          code: "npm install\nnpm run build\nnpm pack --dry-run\nnpm pack\n# Install the generated .tgz into a separate test app and run its checks.\n# Publishing is a separate, deliberate release action.",
          language: "shell",
          check: true,
        },
      ],
    },
  },
  {
    number: 8,
    name: "Level 8 — TypeScript internals and large-scale engineering",
    stage: "Expert",
    goal: "Understand why TypeScript behaves as it does, diagnose difficult type problems, and maintain large TypeScript codebases.",
    projectBrief:
      "Maintain a multi-package TypeScript monorepo with shared libraries, a frontend application, automated tests, and CI type checking.",
    inventory: [
      {
        name: "Structural type compatibility in depth",
        group: "Topics to cover",
      },
      {
        name: "Assignability and excess property checking",
        group: "Topics to cover",
      },
      {
        name: "Soundness limitations of TypeScript",
        group: "Topics to cover",
      },
      {
        name: "Covariance, contravariance, and bivariance",
        group: "Topics to cover",
      },
      {
        name: "Type inference limitations",
        group: "Topics to cover",
      },
      {
        name: "Control flow analysis internals",
        group: "Topics to cover",
      },
      {
        name: "Compiler pipeline fundamentals",
        group: "Topics to cover",
      },
      {
        name: "TypeScript Compiler API",
        group: "Topics to cover",
      },
      {
        name: "Language Service API basics",
        group: "Topics to cover",
      },
      {
        name: "Advanced declaration-file design",
        group: "Topics to cover",
      },
      {
        name: "Debugging complex generic type errors",
        group: "Topics to cover",
      },
      {
        name: "Compiler performance analysis",
        group: "Topics to cover",
      },
      {
        name: "Project references and incremental builds",
        group: "Topics to cover",
      },
      {
        name: "TypeScript in monorepos",
        group: "Topics to cover",
      },
      {
        name: "Large-scale JavaScript-to-TypeScript migration",
        group: "Topics to cover",
      },
      {
        name: "TypeScript upgrades and compatibility management",
        group: "Topics to cover",
      },
      {
        name: "Keeping complex type-level code readable and maintainable",
        group: "Topics to cover",
      },
    ],
    lessons: [
      {
        name: "Structural type compatibility in depth",
        group: "Topics to cover",
        explanation:
          "Structural compatibility compares the members needed for an operation. Extra fields usually do not prevent assignment. Private and protected class members can also require a shared declaration origin, making otherwise similar shapes incompatible. Function compatibility adds rules for parameters and results.\n\nFocus on what consumers are allowed to do, rather than treating types as exact object records. This readonly view accepts a richer object, and the function uses only its declared name field. Runtime validation and policies for exact keys are separate concerns.",
        source:
          "https://www.typescriptlang.org/docs/handbook/type-compatibility.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type Named = { readonly name: string };\nfunction greeting(value: Named): string { return `Hello, ${value.name}`; }\nconst employee = { name: "Mira", role: "editor", id: "u1" };\nconst view: Named = employee;\nconsole.log(greeting(view));',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Assignability and excess property checking",
        group: "Topics to cover",
        explanation:
          "Excess property checking reports unexpected keys on fresh object literals in certain contexts. It does not guarantee that every object has exactly the declared keys. An existing variable is usually compatible when it has the required members. Assertions can bypass the extra checks.\n\nUse satisfies to check a fresh configuration while preserving inference. Use runtime validation when outside data must have exact keys. The example contrasts a richer existing object with a checked literal. Moving an object through an intermediate variable does not remove its runtime properties.",
        source:
          "https://www.typescriptlang.org/docs/handbook/type-compatibility.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type Config = { theme: string };\nconst rich = { theme: "dark", debug: true };\nconst view: Config = rich; // Assignable; debug still exists at runtime.\nconst checked = { theme: "light" } satisfies Config;\n// const typo = { theme: "dark", debgu: true } satisfies Config; // Error.\nconsole.log(view.theme, checked.theme);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Soundness limitations of TypeScript",
        group: "Topics to cover",
        explanation:
          "TypeScript allows some programs it cannot prove safe to support common JavaScript patterns. This is a limitation of soundness: passing its checks is not proof of runtime safety. any, assertions, mutable references to shared data, unchecked lookups, and some function rules can weaken guarantees.\n\nPrefer readonly inputs, check outside values, and keep unsafe assumptions local. This example gives a string array a wider mutable view that can insert a number into the same storage. It demonstrates the limitation without calling a string method on that number.",
        source:
          "https://www.typescriptlang.org/docs/handbook/type-compatibility.html#a-note-on-soundness",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'const strings: string[] = ["hello"];\nconst wider: (string | number)[] = strings;\nwider.push(42); // Allowed through the wider alias.\nconsole.log(typeof strings[1]); // "number", despite the original element annotation.\nfunction inspect(values: readonly string[]): void { console.log(values.length); }\ninspect(strings); // Readonly prevents mutation through this parameter, not other aliases.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Covariance, contravariance, and bivariance",
        group: "Topics to cover",
        explanation:
          "Covariance allows a producer of a more specific type to replace a producer of a broader type. Contravariance reverses this relationship for input parameters. Bivariance permits either direction. For compatibility, TypeScript retains a method-signature exception even with strictFunctionTypes enabled.\n\nUse function-valued properties when strict callback parameter checks matter. The method exception cannot make an unsafe callback safe. The example comments out the dangerous direction; the safe consumer accepts every Dog it can receive.",
        source:
          "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-6.html#strict-function-types",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: "type Animal = { name: string };\ntype Dog = Animal & { bark(): void };\ntype Consumer<T> = (value: T) => void;\nconst allAnimals: Consumer<Animal> = value => console.log(value.name);\nconst dogs: Consumer<Dog> = allAnimals; // Safe contravariant assignment.\nconst onlyDogs: Consumer<Dog> = value => value.bark();\n// const unsafe: Consumer<Animal> = onlyDogs; // Error with strictFunctionTypes.\ninterface MethodConsumer<T> { consume(value: T): void } // Bivariant method parameters.",
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Type inference limitations",
        group: "Topics to cover",
        explanation:
          "Inference uses available evidence, not your intent. A generic with no informative input may infer unknown. Initializers can widen literals, and a conditional relationship obvious to a caller may be harder for the checker to establish inside the implementation.\n\nImprove the contract or split the function before adding broad casts. An explicit type argument is reasonable when the initial value is deliberately absent and cannot describe future values. This helper preserves the value type after the caller supplies that missing information.",
        source: "https://www.typescriptlang.org/docs/handbook/2/generics.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'function createCell<T>(initial: T | null) {\n  let value = initial;\n  return { get: (): T | null => value, set: (next: T): void => { value = next; } };\n}\nconst selected = createCell<{ id: string }>(null);\nselected.set({ id: "u1" });\nconsole.log(selected.get()?.id);',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Control flow analysis internals",
        group: "Topics to cover",
        explanation:
          "Control flow analysis tracks assignments and evidence from branches. It does not fully simulate every callback or side effect. A narrowed field can become invalid if other code changes the underlying object. Think carefully about closures and work that crosses await boundaries.\n\nCapture a stable local value when you need to retain a checked value. Recheck shared mutable state after operations that may change it. Here a primitive string is captured before another function clears its original field. Compiler internals vary by version, so rely on observable contracts rather than private implementation symbols.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#control-flow-analysis",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'const state: { name: string | null } = { name: "Mira" };\nfunction clear(): void { state.name = null; }\nif (state.name !== null) {\n  const snapshot = state.name; // A stable string value.\n  clear();\n  console.log(snapshot.toUpperCase());\n}',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Compiler pipeline fundamentals",
        group: "Topics to cover",
        explanation:
          "The classic compiler parses source into an abstract syntax tree, a structured representation of the code. It then links names to symbols, checks type relationships, and optionally generates output. Parsing alone does not check a whole program's meaning. Changing syntax does not automatically preserve types or behavior.\n\nThis Node script uses the classic TypeScript 5.9.3 JavaScript compiler package to print variable declaration names. It creates no project and does not establish that the parsed source type-checks. New implementations or major versions may use different entry points. Pin and test compiler-API tooling.",
        source:
          "https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API",
        environment: "compiler",
        requires:
          "Classic JavaScript Compiler API: typescript@5.9.3; Node ESM; run node parse.mjs",
        files: [
          {
            name: "parse.mjs",
            code: 'import ts from "typescript";\nconst source = ts.createSourceFile("sample.ts", "const count: number = 1;", ts.ScriptTarget.Latest, true);\nfunction visit(node) {\n  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) console.log(node.name.text);\n  ts.forEachChild(node, visit);\n}\nvisit(source); // count',
            language: "js",
            check: true,
          },
        ],
      },
      {
        name: "TypeScript Compiler API",
        group: "Topics to cover",
        explanation:
          "A Program represents a compiler project. Its TypeChecker answers questions about the project's nodes, symbols, and types. Use these public APIs instead of private checker internals. For a real project, read and parse tsconfig so the tool uses the build's options.\n\nThis pinned classic-API example creates a small program and inspects a variable's inferred type. Run it from the shown project directory. getPreEmitDiagnostics checks for errors before output. The example inspects code without emitting files.",
        source:
          "https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API",
        environment: "compiler",
        requires:
          "typescript@5.9.3 classic Compiler API; Node ESM; run node inspect.mjs from project root",
        files: [
          {
            name: "src/example.ts",
            code: "export const count = 1;",
            language: "ts",
            check: true,
          },
          {
            name: "inspect.mjs",
            code: 'import ts from "typescript";\nconst program = ts.createProgram(["src/example.ts"], { strict: true, target: ts.ScriptTarget.ES2022, noEmit: true, types: [] });\nconst checker = program.getTypeChecker();\nconst source = program.getSourceFile("src/example.ts");\nif (!source) throw new Error("Source file not found");\nfunction visit(node) {\n  if (ts.isVariableDeclaration(node)) console.log(checker.typeToString(checker.getTypeAtLocation(node.name)));\n  ts.forEachChild(node, visit);\n}\nvisit(source); // 1\nif (ts.getPreEmitDiagnostics(program).length) throw new Error("Project has diagnostics");',
            language: "js",
            check: true,
          },
        ],
      },
      {
        name: "Language Service API basics",
        group: "Topics to cover",
        explanation:
          "A language service keeps project state for editor features such as completions, quick info, and definitions. Its host supplies filenames, versions, source snapshots, and environment details. When content changes, update script versions so cached answers can be refreshed.\n\nThis small classic-API example serves one virtual file and requests quick info for a numeric constant. noLib keeps the demonstration isolated. A real editor host also needs standard libraries, module resolution, and actual project settings. This host is not a production language server.",
        source:
          "https://github.com/microsoft/TypeScript/wiki/Using-the-Language-Service-API",
        environment: "compiler",
        requires: "typescript@5.9.3 classic Language Service API; Node ESM",
        files: [
          {
            name: "language-service.mjs",
            code: 'import ts from "typescript";\nconst fileName = "/virtual/example.ts";\nconst text = "const count = 1; count;";\nconst host = {\n  getCompilationSettings: () => ({ noLib: true, noEmit: true }),\n  getScriptFileNames: () => [fileName],\n  getScriptVersion: () => "1",\n  getScriptSnapshot: name => name === fileName ? ts.ScriptSnapshot.fromString(text) : undefined,\n  getCurrentDirectory: () => "/virtual",\n  getDefaultLibFileName: () => "lib.d.ts",\n  fileExists: name => name === fileName,\n  readFile: name => name === fileName ? text : undefined\n};\nconst service = ts.createLanguageService(host);\nconst info = service.getQuickInfoAtPosition(fileName, text.lastIndexOf("count"));\nconsole.log(ts.displayPartsToString(info?.displayParts)); // const count: 1\nservice.dispose();',
            language: "js",
            check: true,
          },
        ],
      },
      {
        name: "Advanced declaration-file design",
        group: "Topics to cover",
        explanation:
          "Advanced declarations describe an existing package's real behavior: whether values can be called or constructed, which overloads exist, and what namespaces or extensions it supports. Choose a module template that matches the implementation and test consumers using supported resolution settings.\n\nDo not make exports generic or optional just because behavior is uncertain. This example describes a callable value with metadata, a common JavaScript pattern. Its runtime implementation is shown for comparison. Default and named exports must match the actual module.",
        source:
          "https://www.typescriptlang.org/docs/handbook/declaration-files/library-structures.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "formatter.js",
            code: 'export const format = Object.assign(value => value.toFixed(2), { label: "Price" });',
            language: "js",
            check: false,
          },
          {
            name: "formatter.d.ts",
            code: "export interface Formatter { (value: number): string; label: string }\nexport const format: Formatter;",
            language: "ts",
            check: true,
          },
          {
            name: "index.ts",
            code: 'import { format } from "./formatter.js";\nconsole.log(format.label, format(12));',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Debugging complex generic type errors",
        group: "Topics to cover",
        explanation:
          "Read a complex type error from the mismatched boundary inward. First compare the expected and actual types, then find the smallest differing property or parameter. Break deeply composed expressions into named intermediate types and small concrete examples.\n\nUse satisfies to inspect an object's compatibility without a misleading annotation. Reserve @ts-expect-error for deliberately invalid type tests. Do not hide a confusing generic error by changing its entire return type to any. This small reproduction exposes the missing field.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/types-from-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type Model = { id: string; options: { compact: boolean } };\nconst candidate = { id: "u1", options: { compact: true } } satisfies Model;\ntype Options = Model["options"];\nconst options: Options = candidate.options;\nconsole.log(options.compact);\n// Reproduce the real failure here before adding surrounding generic machinery.',
            language: "ts",
            check: true,
          },
        ],
      },
      {
        name: "Compiler performance analysis",
        group: "Topics to cover",
        explanation:
          "Checking speed depends on project scope, duplicated dependency types, large inferred declarations, growing unions, and recursive type expansion. Measure before changing code or suppressing errors. extendedDiagnostics gives an overview; traces provide more detail.\n\nGenerate traces separately from normal builds and compare equivalent runs. Focus on the expensive boundary. Restrict include patterns, avoid duplicate sources, and name reusable types before adding more elaborate type computations. skipLibCheck is a tradeoff; it does not prove that dependency declarations agree.",
        source: "https://github.com/microsoft/TypeScript/wiki/Performance",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "commands.sh",
            code: "npx tsc -p tsconfig.json --noEmit --extendedDiagnostics\nnpx tsc -p tsconfig.json --noEmit --generateTrace .trace\n# Compare the same command before/after one focused change.",
            language: "shell",
            check: true,
          },
        ],
      },
      {
        name: "Project references and incremental builds",
        group: "Topics to cover",
        explanation:
          "Project references divide a large build into declared dependencies. Referenced projects use composite and generate declarations for dependent projects to consume. tsc -b builds them in order and reuses up-to-date work. Incremental metadata speeds repeat builds but does not replace clean CI checks.\n\nSet rootDir and outDir explicitly. Avoid importing another package's private source tree. This solution configuration sketches the build order; the workspace exercise supplies the package configurations. A frontend check with noEmit and a library build that emits declarations serve different purposes.",
        source:
          "https://www.typescriptlang.org/docs/handbook/project-references.html",
        environment: "workspace",
        requires: "Multi-project workspace; referenced composite configs",
        files: [
          {
            name: "tsconfig.solution.json",
            code: '{\n  "files": [],\n  "references": [{ "path": "packages/core" }, { "path": "apps/demo" }]\n}',
            language: "json",
            check: true,
          },
          {
            name: "commands.sh",
            code: "npx tsc -b tsconfig.solution.json\nnpx tsc -b tsconfig.solution.json --clean\n# Each referenced directory needs its own composite build configuration.",
            language: "shell",
            check: true,
          },
        ],
      },
      {
        name: "TypeScript in monorepos",
        group: "Topics to cover",
        explanation:
          "A monorepo contains multiple packages in one repository. Give each package a public entry point, explicit dependencies, compiler settings, and build/check commands instead of treating it as one unrestricted program. Workspaces link local packages, and exports controls their exposed entry points.\n\npaths aliases do not load modules at runtime or rewrite generated import specifiers. In npm workspaces, a local package's version can satisfy a normal dependency range. This metadata sketch declares the shared package explicitly. The final practice project adds builds, consumers, tests, and CI.",
        source:
          "https://www.typescriptlang.org/docs/handbook/project-references.html",
        environment: "workspace",
        requires:
          "npm workspaces; @study/core local package with public exports",
        files: [
          {
            name: "package.json",
            code: '{"name":"typed-workspace","private":true,"workspaces":["packages/*","apps/*"],"scripts":{"build":"tsc -b","check":"tsc -b --pretty false"},"devDependencies":{"typescript":"5.9.3"}}',
            language: "json",
            check: true,
          },
          {
            name: "apps/demo/package.json",
            code: '{"name":"@study/demo","private":true,"type":"module","dependencies":{"@study/core":"*"}}',
            language: "json",
            check: true,
          },
        ],
      },
      {
        name: "Large-scale JavaScript-to-TypeScript migration",
        group: "Topics to cover",
        explanation:
          "Migrate JavaScript along stable boundaries while preserving behavior with tests. Use allowJs, checkJs, and JSDoc where renaming is costly, then convert small independent utilities and public contracts. Treat outside data as unknown rather than passing broad any types into newly checked code.\n\nTrack unchecked boundaries, assign ownership, and tighten checks in manageable projects. Avoid combining a large behavior rewrite with a syntax migration unless both can be reviewed and validated. This plan keeps type checks separate from behavior checks.",
        source:
          "https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "migration-plan.txt",
            code: "1. Capture current runtime behavior with focused tests.\n2. Add a noEmit check for a small allowJs/checkJs project.\n3. Type external boundaries and convert leaf utilities.\n4. Convert UI components one feature at a time; preserve DOM behavior.\n5. Tighten strictness, remove justified temporary suppressions, and check CI.",
            language: "text",
            check: true,
          },
        ],
      },
      {
        name: "TypeScript upgrades and compatibility management",
        group: "Topics to cover",
        explanation:
          "Compiler and declaration updates can change inference and diagnostics without changing runtime code. Use a lockfile, choose supported compiler ranges, read release notes, and test the package consumers you claim to support.\n\nUpdate the compiler and related tools deliberately rather than suppressing new errors globally. Compiler-API tools may need a different entry point after an implementation change; this guide explicitly pins its classic examples for that reason. These commands compare a known compiler with a candidate without changing the repository's dependency manifest.",
        source:
          "https://www.typescriptlang.org/docs/handbook/release-notes/overview.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "commands.sh",
            code: "npx --package typescript@5.9.3 tsc --version\nnpx --package typescript@5.9.3 tsc -p tsconfig.json --noEmit\n# In a disposable branch/fixture, replace 5.9.3 with the candidate version.\n# Run app builds, runtime tests, public type tests, and consumer fixtures.",
            language: "shell",
            check: true,
          },
        ],
      },
      {
        name: "Keeping complex type-level code readable and maintainable",
        group: "Topics to cover",
        explanation:
          "Choose the smallest type that expresses a guarantee the application needs. Name intermediate steps, document assumptions and union distribution, and provide examples that should pass and fail. A small domain contract can be more useful than a clever universal type.\n\nKnowing when to avoid abstraction is part of expertise. This helper performs one named transformation: creating an editable draft while retaining an id. It is easier to explain and test than an unbounded deep utility with unrelated options.",
        source:
          "https://www.typescriptlang.org/docs/handbook/2/types-from-types.html",
        environment: "core",
        requires: "Independent TypeScript file; strict ES2022 setup",
        files: [
          {
            name: "index.ts",
            code: 'type DraftWithId<T extends { id: string }> = Pick<T, "id"> & Partial<Omit<T, "id">>;\ntype User = { id: string; name: string; active: boolean };\nconst draft: DraftWithId<User> = { id: "u1", name: "Mira" };\nconsole.log(draft);\n// const invalid: DraftWithId<User> = {}; // Error: id is required.',
            language: "ts",
            check: true,
          },
        ],
      },
    ],
    project: {
      title: "TypeScript monorepo",
      steps: [
        "Create a private npm-workspaces root with packages/core and apps/web. Give each package a composite tsconfig, an explicit dependency on shared code, and declarations.",
        "Use root project references to build core before the app. Start with the minimal shared contract below, then add your React app and a second reusable library.",
        "Commit the lockfile, run npm ci in CI, build with tsc -b, and run runtime/type tests for each package. Upgrade the compiler across the workspace together and measure build time.",
      ],
      acceptance: [
        "A clean install and tsc -b build succeed; the app imports the public shared package entry point.",
        "Changing a shared type rechecks consumers and catches incompatible usage.",
        "CI checks declarations, app builds, runtime tests, and public type tests without relying on stale dist files.",
      ],
      files: [
        {
          name: "packages/core/src/index.ts",
          code: 'export type User = { id: string; name: string };\nexport function displayName(user: User): string { return user.name.trim() || "Anonymous"; }',
          language: "ts",
          check: true,
        },
        {
          name: "apps/web/src/main.ts",
          code: '// Workspace dependency: "@study/core": "0.1.0".\n// Resolve through its package exports after the core project is built.\nimport { displayName, type User } from "@study/core";\nconst user: User = { id: "u1", name: "Mira" };\nconsole.log(displayName(user));',
          language: "ts",
          check: true,
        },
        {
          name: "workspace-layout.txt",
          code: 'package.json              private:true; workspaces:["packages/*", "apps/*"]\ntsconfig.json             files:[]; references:[{path:"packages/core"},{path:"apps/web"}]\npackages/core/package.json name:@study/core; version:0.1.0; type:module\n                          exports: {".": {"types":"./dist/index.d.ts", "import":"./dist/index.js"}}\npackages/core/tsconfig.json composite:true; strict:true; module:NodeNext;\n                           rootDir:src; outDir:dist; target:ES2022; include:["src"]\napps/web/package.json      private:true; type:module; dependencies:{"@study/core":"0.1.0"}\napps/web/tsconfig.json     same compiler options; references:[{path:"../../packages/core"}]\n# Expand these annotations into JSON files. npm install links the workspace packages.\n# Root devDependency: typescript@5.9.3. Commit the generated package-lock.json.',
          language: "text",
          check: true,
        },
      ],
    },
  },
];
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
  function project(level) {
    const data = level.project;
    const details = node("details", undefined, "project");
    details.id = "project-" + level.number;
    details.append(node("summary", "Practice project — " + data.title));
    paragraphs(details, level.projectBrief);
    details.append(
      node(
        "p",
        "Starter and completion plan: adapt these files alongside the level’s lessons; the checklist describes the complete project.",
      ),
    );
    const steps = node("ol");
    for (const text of data.steps) steps.append(node("li", text));
    details.append(steps, node("h4", "Acceptance checks"));
    const checks = node("ul");
    for (const text of data.acceptance) checks.append(node("li", text));
    details.append(checks);
    for (const file of data.files) example(details, file);
    return details;
  }
  function render() {
    const query = search.value.trim().toLowerCase();
    const stage = track.value;
    const fragment = document.createDocumentFragment();
    const menu = document.createDocumentFragment();
    let shown = 0;
    for (const level of levels) {
      const filterStage = ["Beginner", "Intermediate", "Advanced", "Expert"][
        Math.floor((level.number - 1) / 2)
      ];
      if (stage !== "all" && filterStage !== stage) continue;
      const matches = level.lessons.filter(
        (lesson) =>
          !query ||
          [
            level.name,
            lesson.name,
            lesson.group,
            lesson.explanation,
            ...lesson.files.map((file) => file.code),
          ]
            .join(" ")
            .toLowerCase()
            .includes(query),
      );
      const projectMatch =
        !query ||
        JSON.stringify(level.project).toLowerCase().includes(query) ||
        level.projectBrief.toLowerCase().includes(query);
      if (!matches.length && !projectMatch) continue;
      shown += matches.length;
      const section = node("section");
      section.id = "level-" + level.number;
      const link = node("a", level.name.replace(/^Level \d+ — /, ""));
      link.href = "#" + section.id;
      menu.append(link);
      section.append(
        node("span", level.stage, "stage"),
        node("h2", level.name),
        node("p", level.goal, "goal"),
      );
      let group;
      for (const lesson of matches) {
        if (lesson.group !== group) {
          group = lesson.group;
          section.append(node("h3", group, "group-heading"));
        }
        const article = node("article", undefined, "entry");
        article.append(node("h4", lesson.name.replace(/`/g, "")));
        paragraphs(article, lesson.explanation);
        article.append(node("p", "Setup: " + lesson.requires, "requirements"));
        for (const file of lesson.files) example(article, file);
        const source = node("a", "Documentation ↗", "source");
        source.href = lesson.source;
        source.target = "_blank";
        source.rel = "noopener noreferrer";
        article.append(source);
        section.append(article);
      }
      if (projectMatch) section.append(project(level));
      fragment.append(section);
    }
    if (!fragment.childNodes.length)
      fragment.append(
        node(
          "p",
          "No matching topics. Try another term or reset the filters.",
          "empty",
        ),
      );
    content.replaceChildren(fragment);
    nav.replaceChildren(menu);
    count.textContent = shown + " of 148 topics";
  }
  search.addEventListener("input", render);
  track.addEventListener("change", render);
  document.querySelector("#reset").addEventListener("click", () => {
    search.value = "";
    track.value = "all";
    render();
    search.focus();
  });
  render();
  // Initial deep links are resolved after the data has rendered.
  const target = document.getElementById(location.hash.slice(1));
  if (target) {
    if (target instanceof HTMLDetailsElement) target.open = true;
    requestAnimationFrame(() => target.scrollIntoView());
  }
})();
