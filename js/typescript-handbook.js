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
          "TypeScript adds a checker to JavaScript: it describes which values your functions and objects expect and reports incompatible uses before you run them. Editors use the same information for completions, navigation, and safer renaming. You still need ordinary JavaScript knowledge, runtime tests, and input validation.\n\nAnnotations disappear when TypeScript is compiled. The function below only accepts numbers during checking; its emitted JavaScript still needs real numeric arguments. Multiplying 19.5 by 2 produces 39. Uncomment the last line to see the compiler catch a string argument.",
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
          "tsc checks TypeScript and, when configured to emit, writes JavaScript. Browsers execute the JavaScript output, not type annotations. Checking and transpiling are separate jobs: a tool can remove types without finding type errors.\n\nInstall a local compiler, keep its lockfile, and run the checker before shipping. This small example uses explicit command-line options so it works before a tsconfig exists. The emitted file has no name: string annotation. The guide uses TypeScript 5.9.3 as a reproducible reference compiler, not a claim that it is the newest release.",
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
          'An annotation follows a name after a colon. Type inference lets the checker work out a type from the initializer or surrounding code. Use lowercase string, number, and boolean for primitive values; String and Number describe wrapper objects instead.\n\nA let variable can change, so let score = 10 gets the general type number. A const primitive can retain a literal type such as "ready". const prevents reassignment of the binding; it does not make an object’s properties immutable. In the example, the increment is valid but assigning text to score is not.',
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
          "Use lowercase string, number, and boolean for ordinary primitive values. null and undefined are separate types under strictNullChecks: a variable must explicitly allow a missing value before you assign one. number includes integers and fractional values; it does not guarantee finiteness.\n\nChoose an explicit union when absence is meaningful. The example treats a missing score differently from zero and initializes a user name later. Types describe allowed values; they do not supply defaults or validate arbitrary input.",
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
          "These four types solve different problems. any skips checking; unknown accepts any input but requires evidence before use. void describes an ignored return value. never describes a value that cannot exist, including the result of a function that never returns normally.\n\nPrefer unknown at external boundaries and concrete types inside your code. Avoid using any to silence an unexplained error. This example narrows unknown before calling a string method, logs without returning data, and defines a failure path that always throws.",
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
          "An array describes repeated values of an element type; a tuple describes specific positions. Use number[] or Array<number> for an open-ended numeric list, and [number, string] when the first and second positions have distinct meanings.\n\nA tuple is still an array at runtime. A readonly tuple prevents writes through that reference but does not validate external data. Destructuring a tuple preserves its positional types. Here map infers price as number, while the result tuple gives id a number type and title a string type.",
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
          "Object types describe required and optional properties. The ? marker allows a property to be absent, so reading it may produce undefined. A type describes the shape your code relies on; it does not create an object or validate data received from a server.\n\nTypeScript usually checks compatibility structurally: an existing object with the necessary fields can fit even if it has more fields. Fresh object literals get additional excess-property checks that catch common misspellings. In this example, the nickname is optional, and nullish coalescing supplies a display fallback.",
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
          "readonly prevents writes through a particular type. A readonly array disallows mutating methods such as push and permits functions to accept arrays without promising to change them. The original data is not frozen at runtime, and aliases may still be able to mutate it.\n\nProperty readonly is shallow: it prevents replacing that property, not automatically changing everything reachable through it. In this example the sum function only reads its input. The cart cannot have its items property reassigned through its declared type, but its mutable array can still receive another item.",
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
          'A union accepts any one of its member types. Before narrowing, you may only perform operations that are valid for every member. Literal unions such as "draft" | "published" are useful when a value must come from a known set.\n\nThis function accepts a numeric or textual identifier. Both support toString, but only a number supports toFixed; the typeof branch makes that distinction safe. A union describes alternatives and does not convert one alternative into another.',
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
          "An intersection requires a value to satisfy every constituent type at once. It is often useful for combining object capabilities: an identified record plus timestamps, for example. It does not merge or copy runtime objects; you still construct the actual value yourself.\n\nIf two constituent types require incompatible types for the same property, that property can become never, making the intersection impossible to satisfy. Prefer composing compatible shapes. The example combines independent properties into one stored item and supplies both when creating it.",
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
          "Both type aliases and interfaces can name object shapes. An interface can extend compatible object shapes and can merge with another interface declaration of the same name. A type alias can also name a primitive, union, tuple, or computed type, and cannot be reopened by declaring it again.\n\nChoose based on the shape you need and your project’s conventions. Neither form changes runtime behavior. Here an interface describes a reusable identity and extends it for a user, while aliases describe a status union and an object with equivalent fields.",
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
          "Annotate a parameter after its name and a return type after the closing parenthesis. The checker verifies calls and the returned values against that contract. A return type can often be inferred; an explicit one is useful at public boundaries or when you want changes to produce a clear error.\n\nThe example calculates an invoice amount and returns a number. The arrow function demonstrates the same contract in expression form. Types do not convert arguments: a string that looks numeric still needs deliberate parsing before it can satisfy a number parameter.",
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
          "An optional parameter includes undefined inside the implementation. A default is used when the argument is omitted or explicitly undefined. A rest parameter gathers remaining arguments into an array and must be last.\n\nDesign the contract around what a caller may actually omit; do not make a callback argument optional merely because a callback author can ignore it. This function accepts optional formatting settings through a default and any number of numeric scores.",
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
          "as tells the checker to trust your asserted type; it neither converts nor validates a value. A non-null assertion ! removes null and undefined from the checker’s view without inserting a runtime guard. Both can hide real failures.\n\nPrefer runtime checks when an assumption can fail. Here a selector is narrowed with instanceof before reading value. The commented assertion alternatives would compile even if the element were absent or had the wrong tag. Later levels show justified assertions at controlled boundaries.",
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
          "tsconfig.json defines project files and checker/output settings. strict enables a family of checks; target chooses emitted syntax and lib declares assumed runtime APIs. DOM declarations do not make browser objects exist in Node.\n\nThis is a browser/bundler learning configuration. noEmit makes tsc a checker; Vite or another tool can handle output later. rootDir keeps an explicit source layout if you enable emission. moduleDetection isolates top-level names in independent lessons. Run npx tsc -p . to use the config; passing file arguments bypasses it.",
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
          "Control flow analysis follows your branches, assignments, and early returns to refine a value’s type at each location. The declared type remains the set of values that may be assigned later; the narrowed type describes what is possible here.\n\nKeep the checks close to the use. In the example, returning early removes null, and the remaining typeof branch separates numbers from strings. No assertion is needed. When a callback may run later, preserve a narrowed value in a stable local variable rather than assuming mutable state cannot change.",
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
          'typeof works well for primitive categories; instanceof checks a runtime constructor relationship; in tests whether a property exists on an object. Remember that typeof null is "object", so exclude null before object checks.\n\nThese are actual JavaScript checks that also provide checker evidence. They cannot test an interface by name because interfaces disappear. This example handles class instances and an error-shaped object using the appropriate runtime operations.',
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
          "Equality checks can rule out precise alternatives; truthiness checks exclude every falsy value, including empty strings and zero. A value being truthy is not the same as being present.\n\nUse explicit null/undefined checks when zero or empty text is meaningful. The first function preserves an empty input rather than replacing it. The second keeps zero as a valid score. This distinction matters in forms, numeric inputs, and filters.",
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
          "A predicate function packages reusable runtime checks into a return type that tells TypeScript how to narrow. A true result claims the value is T; the checker trusts your implementation, so checking too little can make later code unsafe.\n\nFor a union input, a false result also narrows away the claimed type. Avoid predicates whose condition is merely a subset of that type, such as “is a positive number” while promising only “is number.” This example checks the full small shape it promises, then uses the guard in filter to produce a User array.",
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
          "A discriminated union gives every variant a shared property with a distinct literal value. Checking that property narrows the whole object, making the other fields available only in the appropriate branch. This represents valid combinations more clearly than one object with many unrelated optional fields.\n\nHere a successful result always contains data, and a failed result always contains an error message. A switch selects the right shape. Adding an idle state would require handling it before this function could return a string on every path under strict checking.",
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
          "Strict null checking makes absence visible in types. querySelector may return null, find may return undefined, and an optional property may be missing. Decide what each absence means: a normal empty state, a fallback, or an invalid setup.\n\nA guard or early return supplies evidence. Throwing is appropriate when a required element is a genuine programming precondition; silently asserting ! only hides the possibility. This event-binding function reports a missing required control clearly.",
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
          "Optional chaining stops a property access or call only when the receiver is null or undefined. Nullish coalescing supplies a fallback only for those two values, preserving zero, false, and empty strings.\n\nNeither operator validates that a non-null value has the expected shape. They are useful after your type already describes a valid optional relationship. Here an optional profile may lack a nickname, and zero remains a valid count.",
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
          "DOM interfaces describe capabilities of actual elements. HTMLElement provides shared HTML behavior; HTMLInputElement adds value and checked, while HTMLFormElement exposes form methods. SVGElement is a separate branch.\n\nA selector string is not proof that an element has those capabilities. Use instanceof to validate a runtime node when markup can vary. This helper returns a real input only after checking its tag-specific class, making downstream value access safe.",
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
          "querySelector<T> and querySelectorAll<T> let you specify an expected element type. The generic argument does not check the DOM; a wrong selector can still produce a different element at runtime. querySelector always needs a null check even with a type argument.\n\nUse typed queries for tightly controlled markup and runtime instanceof guards at less controlled boundaries. querySelectorAll gives a NodeList, not an array; Array.from can convert it when you need array operations. This example safely checks every selected input before using it.",
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
          "Browser events have a common Event base and specialized interfaces for specific data. MouseEvent provides pointer coordinates, KeyboardEvent provides key information, and SubmitEvent provides submitter. These are native DOM types; React’s event wrappers are introduced at Level 6.\n\naddEventListener often infers the event type from a known event name and target. Keep that inference rather than widening everything to Event. Here the keyboard handler can read key, while the click handler can read clientX.",
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
          "target is where the event originated, which can be a child inside your control. currentTarget is the element whose listener is currently executing. Both are broadly typed in the native Event contract, and currentTarget is only meaningful during dispatch.\n\nFor direct binding, capturing the known element is often simpler than asserting either property. For delegation, inspect target and find the relevant ancestor. The example handles clicks on a nested span while updating the actual button.",
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
          "Event delegation puts one listener on a stable parent and finds the matching child action. Narrow target to Element before calling closest, then confirm the matched control belongs to this component. This supports dynamically added children without adding listeners to each one.\n\nUse textContent for user-provided strings rather than building HTML from them. This list safely removes only buttons inside its own root. A data attribute communicates the action, while the element’s runtime class supplies the capability check.",
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
          "FormData entries are strings or File objects, and a missing field returns null. Check the runtime value before trimming or parsing it. Type annotations on a desired form model do not validate submitted data.\n\nCombine native constraint validation with domain checks, and keep feedback associated with the input. This example refuses an absent or non-string email, uses the form’s built-in validity rules, and only then prepares normalized data. Rendering, focus placement, and accessible messages remain part of the component’s behavior.",
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
          "fetch resolves for many HTTP error responses, so inspect response.ok before reading data. await unwraps promises inside an async function. Parsed JSON should enter your code as unknown, then be checked before you claim a model type.\n\nAccept an AbortSignal when the caller may leave the view before a request finishes. This loader validates its small response shape and returns a checked name. It needs a real endpoint providing that shape; the function definition itself does not send a request.",
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
          "JavaScript can throw any value, not only Error instances. Under strict checking, a catch variable is unknown. Narrow it before accessing message or other fields, and decide which failures the caller can recover from.\n\nDo not silently turn every failure into success or lose the original context. This helper turns an arbitrary caught value into a readable message while keeping the try/catch boundary explicit. Cancellation can be handled separately when it is an expected lifecycle event.",
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
          "A generic type parameter represents a type chosen at a call or instantiation. Its main job is to preserve a relationship between values: the element type going into a container can be the element type coming out. Using any would discard that relationship.\n\nA constraint such as T extends { id: string } says which capabilities the implementation may rely on. Inference often supplies T automatically. Here first preserves the array element type while acknowledging an empty array, and identify accepts different object shapes as long as each includes an id.",
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
          "Generic interfaces and aliases describe reusable shapes with a relationship between their fields. Supply a concrete type argument when using them. They do not create data, make requests, or validate what arrives at runtime.\n\nHere ApiResponse<T> wraps any already-validated payload, and Nullable<T> adds an explicit absent case. A number response cannot accidentally be consumed as a user response because the type argument preserves the payload’s shape.",
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
          "A generic constraint specifies the capabilities an implementation may use. T extends Shape accepts compatible shapes while preserving their additional fields. Without a constraint, treating a generic value as if it had an id would be an unjustified assumption.\n\nUse the smallest required shape. This function needs only a string id, so callers can pass products, users, or other records without losing the type of the original object returned by the helper.",
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
          "Use multiple parameters when separate types must remain related rather than collapsed into a broad union. Each parameter should capture meaningful information; adding generics that do not connect inputs and outputs usually just makes an API harder to read.\n\nThe example maps an input element type to a distinct output element type. Inference chooses both from the array and callback, so converting numbers into labels returns string[] without a manual assertion.",
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
          "A default supplies a type argument when one is not explicitly provided or inferred. It is useful for common cases but should not disguise the type of unvalidated data. A default must satisfy any constraint on that parameter.\n\nThis Page type defaults to text items while still accepting a different model. Required type parameters must precede optional ones. Choose defaults that match an API’s ordinary behavior and document them as part of its contract.",
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
          'keyof turns the known keys of a type into a union. For an object with id and name properties, keyof produces "id" | "name". It is a type operation, not a function that lists an object’s keys at runtime.\n\nUse it to keep key parameters aligned with a model as the model changes. Index signatures can broaden the result: a string index signature typically yields string | number because numeric JavaScript property access can address string keys. The example rejects a misspelled field and accepts either known property.',
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
          "In a type position, typeof captures the type of an existing value. It lets a configuration object or a function become the source of a type instead of maintaining a duplicate definition. This is different from JavaScript’s runtime typeof expression, which produces a category string.\n\nThe type query reflects the existing inferred type. It does not automatically preserve all literal property values; an ordinary mutable object’s theme property is usually string. The example creates another object with the same shape and contrasts a type query with a runtime check.",
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
          "Indexed access uses a key type to extract the corresponding property type. Connect it to a constrained key parameter to preserve the exact return type of a lookup. This is the getProperty pattern emphasized in the roadmap.\n\nThe implementation uses the same key K that selected T[K], so the checker can follow the relationship. A name lookup returns string, an age lookup returns number, and a misspelled key is rejected. An unconstrained string key would not provide that guarantee.",
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
          "as const preserves literal values in an expression and makes literal object fields or tuple positions readonly in the inferred type. It does not deep-freeze an existing object at runtime and cannot recover precision already widened elsewhere.\n\nAn object can become the source for a union of its values. This avoids repeating string spellings in multiple type declarations. The example derives the accepted mode from the object instead of maintaining a second list.",
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
          "satisfies checks that an expression fits a target type while retaining its resulting inferred shape. Unlike an as assertion, it reports incompatibility instead of asking the checker to accept your claim. It is available in TypeScript 4.9+.\n\nThe target can contextually influence inference, so satisfies is not a universal “preserve every literal” switch; add as const when readonly literal preservation is intended. In this example the checker verifies the permitted keys and value alternatives while keeping green known as a string, so string methods work without a union guard.",
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
          "Overloads describe different ways to call one function, often linking a particular input type to a particular output type. Write the overload signatures first, followed by one implementation broad enough to handle them. Callers only see the overloads, not an additional implementation signature.\n\nPrefer a union parameter when all alternatives return the same kind of result. The example justifies overloads because a string input produces a string array while an array input produces a string. A variable typed as the union of both inputs needs an explicit union overload if you want that call to be public too.",
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
          "A call signature describes something usable with parentheses; a construct signature describes something usable with new. A JavaScript function may also have properties, and an interface can express that combination. These signatures describe capabilities rather than implementing them.\n\nThe formatter below is callable and has a label. UserConstructor describes a constructor’s parameter and result shape; assigning a class value checks its constructor side. Neither signature turns an arbitrary object into a function or class.",
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
          "A predicate function packages reusable runtime checks into a return type that tells TypeScript how to narrow. A true result claims the value is T; the checker trusts your implementation, so checking too little can make later code unsafe.\n\nFor a union input, a false result also narrows away the claimed type. Avoid predicates whose condition is merely a subset of that type, such as “is a positive number” while promising only “is number.” This example checks the full small shape it promises, then uses the guard in filter to produce a User array.",
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
          "An assertion function either throws or establishes a fact for the rest of the current scope. Its asserts return annotation tells the checker what to assume after a normal return. It does not return a converted value, and a broken assertion implementation can lie just like a broken predicate.\n\nUse an assertion for a required precondition, and a predicate when you want to branch on validity. This function verifies a string before an email formatter trims and lowercases it. A numeric argument would cause the assertion to throw before string methods run.",
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
          "never represents an impossible value. A function that always throws or never finishes can return never. In control flow, a value narrowed past every possible union member becomes never. It differs from void: a void function may return normally, while a never function cannot.\n\nUse this for exhaustiveness checks: a helper accepts only never, so passing an unhandled variant to it produces an error. This example checks the current two directions. Adding another direction without adding a matching case makes the assertNever call fail during checking.",
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
          "Partial makes every top-level property optional. Use it for patches, not as a claim that missing values were filled in. Decide how an omitted field differs from an explicitly provided undefined; exactOptionalPropertyTypes makes that distinction more visible.",
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
          "Required removes optional property markers from a shape. It does not fill defaults or validate an optional input. Construct the actual required object deliberately, as this configuration helper does. The operation is shallow rather than recursive.",
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
          "Readonly makes top-level properties readonly through this view. It does not freeze runtime data or make nested mutable objects immutable. Use it when a consumer should inspect an object without replacing its fields.",
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
          "Pick selects known keys while preserving their property types and modifiers. It describes a view of a type; it does not remove other fields from an existing runtime object. Explicitly construct a public object before serializing sensitive data.",
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
          "Omit builds an object type without selected keys. It is convenient when a creation input resembles a stored model except for server-owned fields. Like Pick, it does not delete runtime properties and should not be used as a sanitization operation.",
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
          "Record maps a key type to a value type. A finite literal union requires every listed key. An open-ended string dictionary may miss at runtime, so use undefined in the value type or enable noUncheckedIndexedAccess for arbitrary reads.",
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
          "Exclude removes union members assignable to another type. It filters alternatives, not properties inside each object member. This derives a non-idle state without repeating its remaining alternatives.",
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
          "Extract keeps union members assignable to a constraint. It is useful for selecting variants from a discriminated union. A structural constraint can match the variants you want without naming every other property.",
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
          "NonNullable removes null and undefined from a union type. The type operation does not inspect or change a value. Use a runtime guard to establish that a particular value actually fits the resulting type.",
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
          "ReturnType extracts a function type’s result. Apply typeof to a function value first. It does not execute the function; with overloads, extraction generally reflects the last overload signature rather than resolving a specific invocation.",
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
          "Parameters extracts a function type’s argument list as a tuple, including optional and rest positions. This keeps forwarding helpers synchronized with a function signature without copying the parameter types.",
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
          "Awaited models recursive promise/thenable unwrapping and leaves plain values intact. Use it with ReturnType to describe the resolved value of an async function. Available since TypeScript 4.5; it performs no asynchronous work itself.",
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
          "Class fields describe instance state. Under strictPropertyInitialization, initialize required fields at declaration or in the constructor. Optional fields may be absent. A constructor parameter marked public, private, protected, or readonly can also declare and initialize a property.\n\npublic is the default visibility. protected allows subclass access; TypeScript private is a checker restriction, while JavaScript #private enforces runtime privacy. readonly fields can be initialized but not reassigned through the class contract. The example uses a parameter property, an initialized field, and an optional nickname without hiding missing initialization behind !.",
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
          "public is the default visibility; protected permits the class and subclasses to access a member; private restricts access through TypeScript’s checker. JavaScript #private fields enforce runtime privacy, unlike the private keyword.\n\nUse access modifiers to express ownership rather than putting all state behind unnecessary getters. Here a subclass can use the shared protected name, but callers cannot access the private token. None of these modifiers validates constructor input.",
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
          "A readonly class property may be initialized in its declaration or constructor, then cannot be reassigned through the class contract. It remains a type-level restriction, not a runtime freeze, and is shallow for object-valued fields.\n\nConstructor parameter properties provide compact initialization when that makes the public API clearer. This instance keeps a stable id while allowing its mutable display name to change.",
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
          "Accessors look like properties to callers but execute methods on read or write. Use them when a property needs normalization or a computed result, not to hide expensive surprising side effects. A setter may accept a broader input than the getter returns.\n\nThis setter checks and converts input before storing a finite nonnegative size. The getter consistently returns a number, so later consumers do not repeat parsing logic.",
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
          "extends inherits behavior from one base class. A derived constructor must call super before accessing this; super.method() invokes a base implementation. Prefer composition when the relationship is “uses a capability” rather than a stable subtype relationship.\n\nThis subclass reuses the base name initialization and greeting, then extends the result. Keep overrides compatible with the base method so callers using the base type continue to work.",
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
          "An abstract class cannot be instantiated directly. It can share working implementation while leaving some members for concrete subclasses to supply. Use an abstract base only when shared implementation and a stable extension contract are useful.\n\nThe render method below depends on an abstract label that each concrete control implements. The checker ensures a non-abstract subclass supplies that member. No runtime registration or factory is implied by the declaration.",
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
          "implements checks a class’s instance shape against a contract; it does not copy behavior or infer every method parameter. override marks an intentional replacement of a base member. Enable noImplicitOverride so a forgotten override marker becomes a diagnostic.\n\nUse these checks to protect refactoring. Renaming a base member should reveal derived code that no longer overrides it. This class fulfills a lifecycle interface and deliberately replaces the base destroy behavior.",
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
          "A generic class connects its instance fields and methods through a type parameter. Choose that parameter when creating an instance, or let the constructor infer it from its arguments. This avoids a separate class for each stored value type without losing checking.\n\nA class’s static members belong to the shared constructor, so they cannot use the instance’s T as if each instance had separate static storage. The example keeps values in an instance array, accepts only its element type in add, and acknowledges that a lookup may miss.",
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
          "TypeScript usually checks whether required members are present, not whether a value explicitly named an interface. That is structural typing. An existing object with extra properties can fit a narrower contract; fresh object literals get extra checks to catch likely mistakes.\n\nDesign functions around the capabilities they use. This formatter needs only a name and accepts a richer user object. Structural typing is not a promise that arbitrary runtime input is valid; external data still requires validation.",
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
          "Modules give each file an explicit boundary. Export the values consumers need, and import them where used. A browser or runtime must resolve the emitted imports; TypeScript checking alone does not bundle dependencies or rewrite all specifiers.\n\nThis two-file example uses .js specifiers that TypeScript resolves to local .ts sources while preserving runtime-friendly output. A bundler can process it; direct Node ESM output needs a matching module configuration and package type.",
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
          "Type-only imports and exports are erased. Use them for interfaces, aliases, and classes used solely as types. Import a class normally if you need new or instanceof at runtime. verbatimModuleSyntax makes these choices visible in emitted code.\n\nSeparating type and value usage avoids accidental runtime dependencies and works well with independent-file transpilers. This example exports a shape, imports it only for checking, and constructs an actual object in the consumer.",
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
          "A declaration file describes JavaScript that exists elsewhere. It provides types without providing the implementation. Loading declarations alone cannot make an unavailable package or global work at runtime.\n\nKeep declarations small and accurate, and include them in the checker’s project. This .d.ts describes an optional global supplied by a vendor browser script; the consumer handles its absence. export {} makes the declaration file a module so declare global can augment Window deliberately.",
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
          "First check whether a dependency includes its own declarations. If it does, use the package’s types. Otherwise install its matching @types package when one exists. Match supported major versions rather than adding an unrelated declaration package to hide errors.\n\nGSAP includes declarations; React commonly uses @types/react and @types/react-dom. These types do not install or validate runtime behavior. Keep the project’s lockfile and run the checker after dependency updates.",
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
          "Use declare global for a genuinely global API and module augmentation to extend an existing module’s extensible declarations. Augmentation must match the real module specifier and cannot invent runtime behavior. Avoid broad globals for ordinary application models.\n\nThis example augments an existing local Settings interface with an optional debug field. The implementation is still ordinary JavaScript; augmentation only changes what consumers can describe. Keep ambient changes documented because they affect every file in the project.",
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
          "Put a type near the feature or API that owns its meaning. Export small public contracts from a deliberate entry point instead of turning one global types.ts into a dependency hub. Keep domain types distinct from raw server responses when their guarantees differ.\n\nUse type-only imports for shared contracts and avoid circular runtime dependencies. This layout keeps user behavior in its feature and exposes one intentionally small public surface. A type alias is not an excuse to duplicate every inferred local type.",
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
          "strict enables a family of checks, including strictNullChecks, noImplicitAny, and strictPropertyInitialization. strictNullChecks distinguishes nullish values from ordinary values and forces you to handle missing data. Turning it off removes useful evidence rather than fixing the underlying absence.\n\nEnable strict at the start of a new project. During a migration, adopt it in a controlled slice and address diagnostics rather than adding blanket assertions. Here an explicit branch handles a possibly missing array result.",
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
          "noUncheckedIndexedAccess adds undefined to unchecked array and open-ended dictionary lookups. It addresses a common mismatch between a declared element type and a missing key at runtime. Fixed tuple positions and known required properties can still be precise.\n\nCheck the lookup or supply a meaningful fallback. Do not erase the diagnostic with ! unless another invariant really proves presence. This dictionary models absence explicitly even if the option is disabled, making the boundary honest across configurations.",
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
          "exactOptionalPropertyTypes distinguishes an absent optional field from an explicitly assigned undefined unless undefined is part of the property’s declared type. Reading an optional field still may produce undefined.\n\nThis matters for patch APIs, spreads, and property-existence checks. An omitted theme can mean “leave unchanged,” while an explicit value can mean “replace.” The example shows both the ordinary optional property and a separate contract that intentionally permits undefined.",
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
          "target chooses JavaScript syntax level; lib declares available runtime APIs. module describes the emitted/import model, and moduleResolution tells the checker how imports are found. They must fit the actual host. No configuration polyfills missing browser features.\n\nUse ESNext/bundler for a bundler-owned app, or matching NodeNext settings for direct Node ESM. Keep .js specifiers where direct emitted Node imports require them. These are alternatives for different hosts, not a pair of configs to merge blindly.",
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
          "noEmit turns tsc into a checker without writing JavaScript. That is useful when a bundler handles output. When tsc owns emission, configure rootDir, outDir, module settings, and noEmitOnError so output is placed deliberately and invalid builds are not treated as success.\n\nChecking, building, and executing are separate commands. This script sequence makes that distinction explicit. A successful Vite transform alone is not evidence that the type checker passed.",
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
          "Source maps connect emitted JavaScript locations to their original TypeScript source for a debugger. Enable sourceMap when tsc emits code, then use a browser or Node debugger that reads those maps. Declaration maps solve a different library-navigation problem covered at Level 7.\n\nMaps do not change runtime semantics or catch errors themselves. Check deployment policy before publishing original sources, and ensure paths match deployed assets. This output config writes JavaScript maps alongside its emitted files.",
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
          "Vite serves and bundles TypeScript, but its transforms do not replace full-project type checking. Run tsc --noEmit separately, ideally as part of the build script and CI. Use the template’s configuration as a starting point and keep its runtime requirements in mind.\n\nStart with vanilla-ts for browser components and react-ts when reaching the React milestone. The commands create a new practice app; they are not instructions to run inside an unrelated existing repository. Use a Node version supported by the installed Vite release.",
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
          "ESLint reports code-quality and policy issues; TypeScript checks type relationships. typescript-eslint supplies TypeScript parsing and rules. Start with its supported flat configuration, then add type-aware rules at Level 6 when the project can provide type information.\n\nKeep compiler, ESLint, and plugin versions compatible. This configuration uses the typescript-eslint v8 flat-config style. It is a separate file executed by ESLint, not a TypeScript source example to paste into your application.",
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
          "allowJs includes JavaScript in a TypeScript project; checkJs asks the checker to report errors in those files. JSDoc can describe contracts without renaming every file immediately. Migrate feature boundaries and tests before trying to convert an entire codebase at once.\n\nStart with a small checked slice and gradually tighten guarantees. Keep output separate from input if you emit JavaScript so you do not overwrite source files. This .js helper gets useful checking through JSDoc while remaining ordinary JavaScript.",
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
          "A conditional type selects a result according to assignability. T extends U ? X : Y is type-level branching, not a runtime if statement. It is especially useful when a generic’s output shape depends on the input type.\n\nKeep the relationship visible and test concrete cases in the editor. This helper extracts a payload only from values with the expected property and yields never otherwise. It does not inspect an actual object or validate an HTTP response.",
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
          "A conditional type distributes over a union when the checked side is a naked type parameter. It evaluates each member separately and combines the results; never disappears from a resulting union. Wrap the checked types in tuples when the entire union should be tested together.\n\nThis is why filters such as Exclude work member by member. The two helpers below deliberately answer different questions: which members are strings, and whether every possible member is a string.",
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
          "A mapped type visits property keys and builds a new object type. Each output property can refer to the corresponding original type through T[K]. Modifiers such as readonly, -readonly, ?, and -? add or remove mutability and optionality restrictions.\n\nThis is the idea behind many built-in utilities. It changes a type description, not the object at runtime. In the example, every settings field becomes a callback that accepts that field’s own value type, so the compact handler receives a boolean and the theme handler receives a string.",
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
          "Mapped type modifiers transform optionality or mutability while visiting properties. readonly or +readonly adds readonly; -readonly removes it. ? adds optionality and -? removes its marker. These operations remain shallow unless you deliberately recurse.\n\nThe example derives editable, required settings from a read-only optional input shape. It does not fill missing values automatically: the actual object must still provide every required field.",
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
          "Key remapping changes the output key in a mapped type using as. You can rename keys, produce template-based names, or remove keys by remapping them to never. Be explicit about string keys when applying string-only intrinsic transformations.\n\nUse this for small derived APIs rather than a clever substitute for a clear public contract. Here each model property gets a corresponding getter signature; the runtime object still needs real getter implementations.",
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
          "Template literal types form string types from other literal types. If a placeholder contains a union, the resulting type includes its combinations. Use this to describe event names, translation keys, or other small string conventions without maintaining parallel lists.\n\nThey do not generate strings or validate arbitrary runtime text. Union combinations can also grow quickly; large generated schemas may be clearer as explicit generated types. The example derives four permitted event names and builds a handler that only accepts those names.",
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
          "infer declares a temporary type variable while matching the true side of a conditional type. It extracts part of a structure instead of making callers provide that information separately. The extracted name is available in the conditional’s true result.\n\nHere ElementOf matches a readonly array and extracts its item type, while Fulfilled matches a Promise and extracts one layer of its result. ElementOf falls back to the original input for a non-array. A recursive built-in such as Awaited goes further than this deliberately small one-layer promise helper.",
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
          "A recursive type refers to itself to describe nested data. Use it for trees and other structures whose depth is not fixed. The declaration describes valid shapes; it does not prevent cycles or bound recursion at runtime.\n\nGive a recursive algorithm an obvious base case and consider iterative traversal for very deep input. This folder tree ends when children is empty, and a small traversal collects its labels. External JSON still requires validation before being treated as a Folder.",
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
          "A recursive conditional type repeatedly transforms a type until a base case matches. For nested arrays, infer can extract one level and recursion can process the next. This exists only in the checker; it does not flatten an actual array.\n\nCompiler instantiation depth and union growth impose practical limits. Do not apply unbounded recursive helpers to enormous arbitrary schemas without measuring. The helper below has one focused job and a clear non-array base case.",
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
          "Constraints should express what the implementation uses, while inference should preserve useful caller information. Avoid widening a result with an unnecessary annotation. const type parameters, available in TypeScript 5.0+, favor literal-like inference for inline arguments.\n\nUse readonly-compatible constraints for inferred readonly tuples. A const parameter cannot recover literal information already widened in a separate variable. This small route-definition helper preserves its inline values and derives the permitted route union.",
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
          "Variance describes how a generic relationship behaves when one argument type is more specific than another. A producer that only returns T can be covariant; a consumer accepting T must be contravariant under strict function checking. A read/write container often needs stronger constraints.\n\nReason about permitted operations, not just the generic’s name. A producer of Dog can satisfy a request for Animal; a consumer restricted to Dog cannot safely accept every Animal. Method signatures have a historical bivariance exception, discussed at Level 8.",
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
          "TypeScript normally compares shapes, so two string aliases remain interchangeable. A brand adds a distinguishing type-level property to prevent accidental mixing, for example a UserId and an OrderId that are both represented by strings at runtime.\n\nCreate a brand only at a trusted boundary after the required validation. A narrow as assertion inside that constructor is the controlled point where runtime evidence becomes a static claim. Brands are erased, can be bypassed with assertions, and must be re-established after deserializing data. This constructor validates a user-id format before branding it.",
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
          "Mapped and conditional types can work together: visit each key, inspect its value type, and keep or transform selected properties. Key remapping to never removes a key, unlike assigning a property the value type never.\n\nKeep one transformation per named helper and make the matching rule explicit. This helper selects only required string-valued fields. An optional string would include undefined and would not match the same condition without a deliberate NonNullable adjustment.",
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
          "Write custom utilities only when a standard utility does not express your real contract. Name the intended guarantee and use small examples that should compile and examples that must fail. Avoid claiming a deep or exact guarantee that the implementation does not provide.\n\nThis helper makes a selected subset required without changing the other properties. It composes Pick, Required, and Omit instead of rebuilding those operations. The resulting object must actually provide the required id.",
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
          "Recursive distribution and large template unions can grow much faster than the runtime code suggests. Prefer named intermediate types, bounded recursion, and concrete public models when a universal abstraction buys little. A hard-to-read type is a maintenance cost even when it compiles.\n\nMeasure a slow project before rewriting everything: extendedDiagnostics provides totals, and a trace can identify expensive instantiations. This example deliberately uses a finite public shape instead of deriving every possible nested path. Complexity should pay for a concrete safety benefit.",
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
          "A response type describes what your application expects; it is not evidence that a server sent that data. Treat JSON as unknown until a parser or schema establishes its shape. Check HTTP status separately from payload validity.\n\nThe User type below becomes trustworthy only after parseUser succeeds. Keep transport data and internal models separate when the internal model adds guarantees or transformed fields. The example validates one small response without relying on an unsafe generic response.json assertion.",
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
          "A runtime schema checks actual data and can derive its TypeScript output type, keeping validation and the model aligned. Zod 4 safeParse returns a discriminated success/failure result; parse throws on invalid input. Async refinements require the async parsing variants.\n\nValidate at boundaries rather than repeatedly asserting inside the app. Decide how validation errors become useful UI feedback. This example accepts one valid user and rejects a numeric name. The dependency is not part of TypeScript itself.",
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
          "Types and interfaces usually disappear during compilation. Runtime values such as functions, classes, and schema objects remain. You cannot use an interface with instanceof or expect a type alias to validate JSON.\n\nChoose the appropriate runtime evidence: a constructor check, a predicate, or a schema parser. In this example the User alias helps callers, while the actual function performs the runtime check. Keeping these roles separate prevents false confidence at an external boundary.",
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
          "Expected failures can be modeled as data instead of thrown exceptions. A result union forces the caller to inspect a discriminant before accessing the successful value. Unexpected bugs may still throw and should be handled at an appropriate boundary.\n\nKeep error variants meaningful enough for recovery. This parser distinguishes invalid numeric input from a successful result and never pretends that an error message is a number. A production API can add transport, validation, or authorization variants as needed.",
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
          "A generic API helper should preserve a guarantee supplied by a parser, not invent a trusted response type from a caller’s type argument. Accept a function that turns unknown input into T only after validation.\n\nKeep cancellation and HTTP handling in the transport layer and domain validation in the parser. This fetch helper does not send a request until called. Its return type is connected to the parser’s result, so the runtime check and static type stay together.",
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
          "Model asynchronous state as mutually exclusive cases instead of a group of booleans and optional fields that can contradict each other. A discriminated union can make success always carry data and failure always carry an error.\n\nHandle stale requests and cancellation as lifecycle decisions as well as type decisions. The renderer below cannot read data before success because that property is not available in the other branches. This is a useful contract for reducers and React hooks.",
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
          "satisfies checks a configuration against a contract without replacing its useful inferred shape. as const can preserve readonly literal choices where needed. Neither validates a configuration read dynamically from a server or file.\n\nUse a finite key union when missing options should be detected. The example requires both feature configurations and preserves literal modes. An extra or misspelled fresh key becomes a diagnostic instead of silently entering a loose dictionary.",
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
          "An untyped dependency is a boundary, not a reason to spread any across the application. Describe the small surface you actually use, verify its runtime behavior, and hide dependency-specific details behind an adapter when useful.\n\nA declaration for existing JavaScript must match the implementation. This local vendor example shows both files so the contract can be checked against real behavior. For remote packages, first look for bundled types or a maintained @types package before writing your own.",
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
          "GSAP ships TypeScript declarations for its tweens and contexts; browser animation APIs already appear in lib.dom declarations. Let inference describe tween instances and retain cleanup handles. Types do not ensure a selector matches an element or that an animation is accessible.\n\nUse runtime DOM guards, reduced-motion handling, and explicit teardown. This helper returns a destroy function for either a GSAP context or a native Animation. Cancelled native animations can reject finished, so handle that promise when you observe it.",
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
          "Runtime tests verify behavior; the type checker verifies static contracts. Vitest can execute TypeScript tests, but passing runtime tests does not replace tsc --noEmit. Keep both commands in CI.\n\nUse focused examples around actual behavior, especially parsing and state transitions. This test checks a small conversion and a rejected invalid value. The function and test are in separate files to model an ordinary project boundary.",
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
          "A typed mock preserves the service signature while controlling its responses. Mock at the boundary your code owns instead of replacing every internal function. An assertion that a mock was called is usually less useful than checking the behavior produced by a realistic response.\n\nThis example supplies a predictable async user lookup and checks its resolved model. The mock’s generic call signature rejects incompatible resolved values during checking, while the runtime test verifies the returned data.",
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
          "Type-aware lint rules can detect problems such as ignored promises or unsafe any flows using the checker’s type information. They require a configured project and cost more than syntax-only linting. Use rules that address real failure modes and keep tool versions compatible.\n\nWith typescript-eslint v8, projectService can obtain project information for included files. This flat configuration targets TypeScript sources. Keep eslint.config.mjs outside that glob unless you intentionally configure it too. A resolved promise should be awaited, returned, caught, or explicitly documented as intentionally ignored.",
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
          "Files containing JSX use .tsx so TypeScript parses tags as expressions. React’s type packages describe elements, props, and hooks; configure jsx for your build tool. A Vite React project typically uses react-jsx, while a framework may preserve JSX for its own transform.\n\nDo not confuse the native DOM element instance with a React element description. This component returns JSX; a ref to its rendered input would instead hold an HTMLInputElement. Install matching react/react-dom and @types packages.",
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
          "Props form a component’s public contract. Type children explicitly when the component accepts them; ReactNode covers values React can render, while a function child needs its own call signature. An optional prop can have a destructuring default.\n\nKeep the contract small rather than exposing every implementation detail. This panel requires a title and renderable children, with an optional compact setting. It can be used from another component without manual assertions.",
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
          "React event handlers use React’s typed event wrappers, not the native KeyboardEvent or MouseEvent types from lib.dom. An inline handler often gets the correct type automatically. For a named handler, import the appropriate handler type or event type.\n\ncurrentTarget is typed as the element whose handler is running, making it a useful place to read an input value. Do not assume target is the same element when nested content can originate an event. This component keeps a controlled text field synchronized with state.",
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
          "Let hooks infer simple initial state, and supply a type argument when the initial value omits later alternatives. A DOM ref commonly starts as null. useReducer benefits from a discriminated action union, while a nullable context needs a guard at the consuming boundary.\n\nThis complete example demonstrates all four hooks. The reducer keeps arithmetic in one place, the ref focuses an input, and the context carries a typed user name. A real application should place providers deliberately rather than adding context for every local variable.",
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
          "A custom hook packages reusable stateful behavior, with the same lifecycle and dependency rules as built-in hooks. Preserve its result type instead of returning any, and clean up work such as timers or subscriptions.\n\nThis generic debounce hook preserves the input type while delaying updates. Its timeout is cancelled when the input or delay changes and on unmount. It does not validate a value or decide whether delaying a particular interaction is good UX.",
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
          "A generic component connects item types to callbacks without forcing every consumer to use one broad base model. Let props infer T where possible, and require a stable key rather than using array positions for changing collections.\n\nA function declaration avoids the generic-arrow ambiguity in TSX; an arrow form often needs <T,>. This list keeps renderItem’s item typed to the actual input data. It describes React props, not a runtime validator for an external dataset.",
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
          "A discriminated prop union describes permitted combinations. It can distinguish controlled state supplied by a parent from local state owned by the component, or a link variant from a button variant. Invalid combinations then become checker errors.\n\nKeep hooks unconditional even when props select behavior. This component always creates local state but only uses it in the local branch. The controlled branch requires onChange; the local branch manages its own update.",
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
          "Context distributes a typed value through a provider; it does not automatically solve state ownership or prevent needless rerenders. Keep local state local, and use a reducer or a focused store when transitions are shared and complex.\n\nA small consumer hook can enforce a required provider. Throwing on a missing provider is clearer than inventing a misleading default or asserting away null. The provider below owns one theme value and exposes only the operations consumers need.",
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
          "Route parameters come from a URL and need runtime validation even when their names are typed. Declarative routing, data routers, and framework route modules have different integration patterns; do not mix their setup instructions.\n\nThis example uses React Router 7’s declarative API from react-router. A parameter can be missing, so the page handles that case before using it. Parse and validate numeric identifiers rather than asserting that a URL string is a number. Install the version whose documentation you follow.",
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
          "Next.js combines TypeScript with a specific server/client and routing model. Keep server-only work out of client bundles, use a client boundary for interactive hooks, and follow the installed Next.js version’s generated types. Types still do not validate request input.\n\nThis App Router example follows the asynchronous params convention used by modern Next.js, including Next 16. The route file awaits its parameter before rendering. It belongs in a Next project, not in a plain Vite client app. Run the framework’s build/type checks as well as your tests, and avoid copying older synchronous-params tutorials blindly.",
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
          "An ergonomic API makes the ordinary call easy and the unsafe call hard. Prefer a small options object, understandable defaults, and named exported models over positional arguments that are easy to swap. Avoid exposing implementation-only types or DOM details consumers do not need.\n\nDocument lifetime and failure behavior as part of the contract. This minimal factory returns a stable handle with one operation. A real tooltip also needs focus/hover behavior, positioning, and accessible relationships; the public handle should not require consumers to manipulate internal nodes.",
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
          "Inference should survive the emitted declaration boundary, not merely work inside the source repository. Keep meaningful generic parameters in exported signatures and avoid annotating a result with a wider type than callers need.\n\nBuild the package, inspect its .d.ts, and compile a consumer against the packed output. A local source import can hide packaging mistakes. This generic helper’s declaration preserves the relation between input element type and possible result without exposing implementation details.",
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
          "Advanced generics are useful when they express real relationships consumers need. An API should infer obvious arguments, constrain keys, and reject mismatched values without requiring callers to write its implementation types.\n\nKeep mutation ownership clear. This store exposes key-aware get/set methods while its internal object remains private to the closure. The caller supplies a model with a real theme union so setting light later is valid; an over-narrow literal model would intentionally reject it.",
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
          "Use a union parameter when callers can supply any alternative and the result shape is the same. Use overloads when distinct argument patterns genuinely imply distinct result types or arities. Too many overloads can make maintenance and inference harder.\n\nThe implementation signature is not an extra public overload. A union-typed argument needs a matching public signature if you intend to support it. This formatter needs no overload because both input forms produce a string; the separate lookup demonstrates a meaningful overload relationship.",
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
          "Generate declarations from checked sources instead of maintaining a parallel public API by hand when possible. Include the generated .d.ts files in the published tarball and point the package’s type entry at them. Declaration files are not executable implementations.\n\nBuild first, inspect the package contents, and test a consumer. A package that works from a monorepo source path may fail after publishing if dist files or exports are missing. These commands perform local generation and a dry-run inspection; they do not publish anything.",
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
          "declaration emits type descriptions; declarationMap maps those descriptions back to source for editor navigation. They are different from sourceMap, which relates runtime JavaScript to TypeScript during debugging.\n\nChoose whether to include sources or maps according to the package’s navigation goals. Make output paths explicit and test the published layout. This build configuration produces ESM JavaScript, declarations, and declaration maps from one public entry point.",
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
          "Package exports define which entry points consumers can resolve. types locates declarations, while the runtime entry must locate actual JavaScript. Keep the declaration’s module interpretation aligned with the emitted format; a filename alone does not make the package dual ESM/CommonJS.\n\nThis is an ESM-only package sketch. types appears before the runtime import condition, and the top-level types supports appropriate tools reading that field. files restricts the packed output. Test the tarball from an independent consumer rather than relying on source aliases.",
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
          "ESM and CommonJS differ in evaluation and import/export behavior, not just extension spelling. NodeNext checking follows package metadata and extensions; .mts/.mjs and .cts/.cjs explicitly select formats. A bundler’s interop can differ from direct Node execution.\n\nPrefer a clearly documented single format unless dual output is a real requirement. Dual packages need separate runtime entries and correctly interpreted declarations for each format; changing exports alone cannot generate them. This pair demonstrates explicit source formats without claiming to be a complete dual-package build.",
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
          "package.json is configuration consumed by npm, Node, bundlers, and type resolvers. TypeScript does not automatically prove that every referenced output file exists or that exports describes a usable package. Validate the installed artifact, not just the source configuration.\n\nKeep peer/runtime/dev dependencies intentional, include generated files, and run a consumer check with supported module settings. A dry run is a review step, not a publication. The commands below inspect metadata and the tarball before any release action.",
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
          "Public type tests check inferred results and rejected calls as part of the package contract. tsd or TSTyche can express expectations that ordinary runtime tests cannot. Run them against the package’s public declarations, not private implementation paths.\n\nHere a small tsd fixture checks the output type and an intentionally invalid call. It belongs in a built package whose types entry resolves correctly. expectError is interpreted by tsd; it is not a directive that makes the expression safe in an ordinary application.",
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
          "Describe the real JavaScript API with accurate parameters, returns, optionality, and module shape. A blanket declare module declaration that turns every export into any stops errors without providing useful safety. Avoid inventing runtime exports merely to satisfy a consumer.\n\nFor a small local library, a sibling .d.ts can describe the existing implementation. For a published package, follow the actual package’s module shape and test a consumer. This declaration matches the visible JavaScript rather than an imagined interface.",
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
          "Types are part of the public API. Narrowing an accepted input, changing inference, making an optional field required, or adding a new union variant consumed exhaustively can break callers even when JavaScript behavior appears compatible.\n\nUse consumer fixtures and public type tests when reviewing releases. Add an option with a documented default rather than silently redefining an existing parameter. Keep old supported calls working deliberately, and treat a meaningful contract break as a versioning decision.",
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
          "Document installation, runtime requirements, ownership/cleanup, errors, supported compiler versions, and the public import path. Examples should be checked against the published declarations and should not rely on private source files.\n\nA generic parameter needs an explanation of its relationship, not just its letter. Provide the simplest useful call first, then controlled variations. This consumer example uses only exported contracts, showing a callback’s inferred model and an explicit destroy step.",
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
          "Structural compatibility compares the members required for an operation. Extra members do not normally prevent assignment, but private/protected class members can carry origin requirements that make otherwise similar shapes incompatible. Function relationships add parameter and result rules.\n\nThink about the permitted consumer operations rather than treating types as exact object records. This read-only view accepts a richer object, and the function deliberately relies only on its declared name capability. External validation and exact-property policies are separate concerns.",
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
          "Excess property checking applies to fresh object literals in selected contexts; it is not a universal exact-object guarantee. Assignability from an existing variable usually asks whether the required members exist. Assertions can bypass those helpful diagnostics.\n\nUse satisfies to check a fresh configuration while preserving inference, and use runtime validation when exact external keys matter. This example contrasts a rich existing object with a checked literal. Reassigning through an intermediate variable does not sanitize the runtime object.",
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
          "TypeScript deliberately accepts some programs it cannot prove safe, trading complete soundness for compatibility with JavaScript patterns. any, assertions, mutable aliases, unchecked lookups, and some function rules can bypass guarantees. Passing the checker is not a runtime proof.\n\nPrefer readonly inputs, narrow external values, and keep unsafe assumptions local. This example shows mutable-array aliasing: a wider view can insert a number into storage originally viewed as strings. It demonstrates the limitation without calling a string method on the inserted value.",
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
          "Covariance lets a producer of a subtype stand in for a producer of a base type. Contravariance reverses the relationship for consumer parameters. Bivariance permits either parameter direction; TypeScript retains a method-signature exception even under strictFunctionTypes for compatibility.\n\nUse function-valued properties when strict callback parameter checking is important. Do not rely on the method exception to make an unsafe callback safe. The example marks the dangerous direction as a commented failure, while the safe consumer direction handles every Dog it may receive.",
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
          "Inference works from available evidence, not intent. A generic with no informative input may infer unknown; an initializer can widen literals; a generic conditional return relationship may be clearer to the caller than to the implementation checker.\n\nImprove the contract or split a function before reaching for broad casts. An explicit type argument is reasonable when the initial value is intentionally absent and cannot supply the future type. This helper preserves the value type once the caller provides that missing information.",
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
          "The checker’s control flow model follows assignments and branch evidence, but it is not a full symbolic execution of every callback or side effect. A refinement on mutable data can become stale when external code changes that data. Await boundaries and closures deserve deliberate reasoning.\n\nUse a stable local snapshot for work that must retain a checked value, and re-check mutable shared state after operations that may invalidate it. This example captures a primitive string before calling code that clears the original field. Compiler internals are version-dependent; rely on observable contracts rather than private implementation symbols.",
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
          "The classic compiler parses source text into an abstract syntax tree, binds names to symbols, checks type relationships, and optionally emits output. Parsing a file does not by itself perform whole-program semantic checking. Transforming syntax is not equivalent to preserving a program’s types or behavior.\n\nThis Node script uses the classic TypeScript 5.9.3 JavaScript compiler package and prints variable declaration names from a parsed file. It creates no project and makes no claim that the source type-checks. New compiler implementations and major versions may expose different entry points; keep API tooling pinned and tested.",
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
          "A Program represents a compiler project; a TypeChecker answers semantic questions about its nodes, symbols, and types. Use public APIs rather than importing private checker internals. For a real project, read and parse its tsconfig so your tool uses the same options as the build.\n\nThis pinned classic-API example creates a small program and asks for a variable’s inferred type. Run it from the shown project directory. getPreEmitDiagnostics checks errors before output; the example avoids emitting files because its job is inspection.",
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
          "A language service maintains editor-oriented project state and answers questions such as completions, quick info, and definitions. Its host supplies filenames, versions, snapshots, and environment information. Update script versions when content changes so cached results can be invalidated.\n\nThis deliberately small classic-API example serves one virtual file and asks for quick info about a numeric constant. It uses noLib for an isolated demonstration; a real editor host must also provide standard libraries, module resolution, and actual project settings. Do not treat this tiny host as a production language server.",
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
          "Advanced declarations need to express the real call/construct shape, overloads, namespaces, or augmentation surface of an existing JavaScript package. Choose the matching module template and verify it with consumers using supported resolution modes.\n\nDo not make every export generic or optional to accommodate uncertain behavior. This example describes a callable value that also carries metadata, a common JavaScript pattern. The runtime implementation is shown so the declaration can be compared to actual behavior; default/named exports must match.",
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
          "Read a complex diagnostic from the mismatched boundary inward: expected type, actual type, then the smallest property or parameter that differs. Replace a deep composed expression with named intermediate aliases and minimal concrete examples.\n\nUse satisfies to inspect an object without forcing it into a misleading annotation, and use @ts-expect-error only for a deliberately invalid type test. Avoid fixing a confusing generic by converting the entire return type to any. This small reproduction makes the missing field visible.",
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
          "Compiler performance is affected by project scope, duplicate dependency types, large inferred declarations, union growth, and recursive instantiations. Measure before changing code or suppressing diagnostics. extendedDiagnostics gives a useful overview; traces expose more detailed work.\n\nKeep trace generation separate from normal builds, compare like-for-like runs, and focus on the actual expensive boundary. Narrow include patterns, avoid accidental source duplication, and name reusable types before adding more elaborate type-level algorithms. skipLibCheck is a tradeoff, not proof that dependency types agree.",
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
          "Project references split a large build into explicit dependencies. Referenced projects use composite and produce declarations so dependents can build against their public output. tsc -b orders builds and reuses up-to-date work. Incremental metadata improves repeated builds but does not replace clean CI checks.\n\nKeep rootDir/outDir explicit and avoid importing another package’s private source tree. This solution config sketches an ordered build; the complete workspace exercise below supplies the package configs. A frontend noEmit check and a declaration-emitting library build have different jobs.",
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
          "A monorepo is multiple packages in one repository, not one giant program with unrestricted cross-imports. Give each package a public entry, clear dependencies, its own compiler settings, and a deliberate build/check command. Workspaces link local packages; exports controls their surface.\n\nDo not rely on paths aliases as a runtime module loader: they do not rewrite emitted specifiers. For npm workspaces, a local package version can satisfy an ordinary dependency range. This metadata sketch keeps a shared package explicit; the final practice project adds builds, consumers, tests, and CI.",
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
          "Migrate by stable boundaries while keeping runtime behavior covered by tests. Start with allowJs/checkJs and JSDoc where renaming is expensive, then convert leaf utilities and public contracts. Treat external data as unknown rather than exporting broad any into newly typed code.\n\nTrack remaining unchecked boundaries, make ownership explicit, and tighten strictness in manageable projects. Do not combine a large behavioral rewrite with a syntax-only migration unless you can review and validate both. This plan keeps type checking and behavior checks independent.",
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
          "Compiler and declaration upgrades can change inference and diagnostics without changing runtime code. Use a lockfile, choose supported compiler ranges, read release notes, and test the actual package consumers you claim to support.\n\nUpgrade the compiler and dependent tooling deliberately rather than suppressing new errors globally. For compiler-API tooling, an implementation change can require a different entry point; the pinned classic examples in this guide are intentionally explicit. The commands compare a known compiler and a candidate without changing the repository’s dependency manifest.",
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
          "Prefer the smallest type that expresses a guarantee the application uses. Name intermediate steps, document assumptions and distribution behavior, and give helpers examples that should pass and should fail. A clever universal type can be less valuable than a small clear domain contract.\n\nExpertise includes knowing when not to abstract. This helper has one named transformation and a direct use case: constructing an editable draft while keeping an id. It is easier to explain and test than an unbounded deep utility with many unrelated options.",
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
