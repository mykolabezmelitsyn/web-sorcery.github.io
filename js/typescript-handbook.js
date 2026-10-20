const topics = [
  [
    "1. Setup",
    [
      {
        name: "Why Use TypeScript",
        syntax: "JavaScript + static types → checked code → JavaScript",
        explanation:
          "TypeScript adds a checker to JavaScript: it describes which values your functions and objects expect and reports incompatible uses before you run them. Editors use the same information for completions, navigation, and safer renaming. You still need ordinary JavaScript knowledge, runtime tests, and input validation.\n\nAnnotations disappear when TypeScript is compiled. The function below only accepts numbers during checking; its emitted JavaScript still needs real numeric arguments. Multiplying 19.5 by 2 produces 39. Uncomment the last line to see the compiler catch a string argument.",
        code: 'function total(price: number, quantity: number): number {\n  return price * quantity;\n}\nconsole.log(total(19.5, 2)); // 39\n// total("19.5", 2); // Error: string is not assignable to number.',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/basic-types.html",
        kind: "typescript",
      },
      {
        name: "How To Initialize A TypeScript Project",
        syntax: "npm install --save-dev typescript · npx tsc --init",
        explanation:
          "Install Node.js and npm first. Then create a project directory, initialize its package metadata, and install TypeScript locally so the project controls its compiler dependency. npx tsc --init creates tsconfig.json; replace its contents with the small configuration in the next topic before checking your first file.\n\nCreate src/main.ts with the function shown under “Why Use TypeScript.” npx tsc --noEmit checks the project; it does not execute the code. The emit command below writes JavaScript to dist, and Node runs that output. Commit your package lockfile so collaborators install the same compiler version.",
        code: "mkdir typescript-course\ncd typescript-course\nnpm init -y\nnpm pkg set type=module\nnpm install --save-dev typescript\nnpx tsc --init\nmkdir src\n# Create src/main.ts and use the tsconfig.json in the next topic.\nnpx tsc --noEmit\nnpx tsc --noEmit false --outDir dist\nnode dist/main.js",
        source:
          "https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html",
        kind: "shell",
      },
      {
        name: "Understanding The TSConfig",
        syntax: "compilerOptions · include · target · module · strict",
        explanation:
          "tsconfig.json defines the project’s files and compiler behavior. strict enables a family of checks, including explicit handling of null and undefined. target controls emitted JavaScript syntax; lib describes the runtime APIs that the checker assumes exist. A library declaration does not install or polyfill those APIs.\n\nThis learning setup checks ES2022 JavaScript with browser API declarations. rootDir makes the source-to-output folder mapping explicit. noEmit separates checking from running, and moduleDetection isolates each file’s top-level names. ESNext plus bundler is appropriate when a bundler handles imports; it is not a universal Node configuration. Use npx tsc -p . to read this config; passing an individual file to tsc bypasses project configuration.",
        code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "lib": [\n      "ES2022",\n      "DOM"\n    ],\n    "module": "ESNext",\n    "moduleResolution": "bundler",\n    "moduleDetection": "force",\n    "strict": true,\n    "noEmit": true,\n    "rootDir": "./src"\n  },\n  "include": [\n    "src/**/*.ts"\n  ]\n}',
        source: "https://www.typescriptlang.org/tsconfig/",
        kind: "json",
      },
    ],
  ],
  [
    "2. Basic Types",
    [
      {
        name: "Assigning Types And Type Inference",
        syntax: "let value: Type = initialValue",
        explanation:
          'An annotation follows a name after a colon. Type inference lets the checker work out a type from the initializer or surrounding code. Use lowercase string, number, and boolean for primitive values; String and Number describe wrapper objects instead.\n\nA let variable can change, so let score = 10 gets the general type number. A const primitive can retain a literal type such as "ready". const prevents reassignment of the binding; it does not make an object’s properties immutable. In the example, the increment is valid but assigning text to score is not.',
        code: 'let score = 10; // inferred number\nscore += 5;\nconst label: string = "Points";\nconst ready: boolean = true;\nconst state = "ready"; // literal type "ready"\nconsole.log(label, score, ready, state); // Points 15 true ready\n// score = "fifteen"; // Error.',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
        kind: "typescript",
      },
      {
        name: "Array Type",
        syntax: "T[] · Array<T>",
        explanation:
          "An array type describes its elements, rather than a fixed length. number[] and Array<number> mean the same thing. Methods such as map infer callback parameter types from that element type. Give an empty array an explicit type when its intended contents are not clear.\n\nA lookup can miss at runtime. noUncheckedIndexedAccess, introduced in the final chapter, makes the checker include undefined for ordinary array indexing. The example uses optional chaining and a fallback to handle an empty list even without that flag. A tuple, covered later, describes known positions.",
        code: 'const prices: number[] = [10, 25, 40];\nconst labels: Array<string> = prices.map(price => `$${price}`);\nconst names: string[] = [];\nnames.push("Mira");\nconsole.log(labels.join(", ")); // $10, $25, $40\nconsole.log(names[0]?.toUpperCase() ?? "No names"); // MIRA\n// prices.push("free"); // Error.',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays",
        kind: "typescript",
      },
      {
        name: "Any Type",
        syntax: "any disables checking for that value",
        explanation:
          "any is an escape hatch: you can call it, access arbitrary properties, or assign it to other types without the usual checks. Those unchecked assumptions can spread. strict rejects many implicit any values, but it does not ban an explicit any annotation.\n\nThe unsafe function compiles even though it assumes a method that might not exist. It is deliberately not called. Prefer a concrete type for trusted values and unknown for external values that still need checking; unknown gets its own lesson in chapter 7. Keep unavoidable any at a small, documented boundary rather than throughout an application.",
        code: 'function unsafeLabel(value: any): string {\n  return value.name.toUpperCase(); // The checker cannot verify this.\n}\n// unsafeLabel({ name: 42 }); // Would throw at runtime.\n\nfunction safeLabel(value: { name: string }): string {\n  return value.name.toUpperCase();\n}\nconsole.log(safeLabel({ name: "Mira" })); // MIRA',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any",
        kind: "typescript",
      },
      {
        name: "Object Basics",
        syntax: "{ required: T; optional?: U }",
        explanation:
          "Object types describe required and optional properties. The ? marker allows a property to be absent, so reading it may produce undefined. A type describes the shape your code relies on; it does not create an object or validate data received from a server.\n\nTypeScript usually checks compatibility structurally: an existing object with the necessary fields can fit even if it has more fields. Fresh object literals get additional excess-property checks that catch common misspellings. In this example, the nickname is optional, and nullish coalescing supplies a display fallback.",
        code: 'type Profile = {\n  id: number;\n  name: string;\n  nickname?: string;\n};\nconst profile: Profile = { id: 1, name: "Mira" };\nfunction displayName(person: Profile): string {\n  return person.nickname ?? person.name;\n}\nconsole.log(displayName(profile)); // Mira',
        source: "https://www.typescriptlang.org/docs/handbook/2/objects.html",
        kind: "typescript",
      },
      {
        name: "Types Vs Interfaces",
        syntax: "type Alias = ... · interface Shape { ... }",
        explanation:
          "Both type aliases and interfaces can name object shapes. An interface can extend compatible object shapes and can merge with another interface declaration of the same name. A type alias can also name a primitive, union, tuple, or computed type, and cannot be reopened by declaring it again.\n\nChoose based on the shape you need and your project’s conventions. Neither form changes runtime behavior. Here an interface describes a reusable identity and extends it for a user, while aliases describe a status union and an object with equivalent fields.",
        code: 'interface Identified { id: string }\ninterface User extends Identified { name: string }\ntype UserShape = { id: string; name: string };\ntype Status = "active" | "paused";\nconst user: User = { id: "u1", name: "Mira" };\nconst copy: UserShape = user; // Compatible shape.\nconst status: Status = "active";\nconsole.log(copy.name, status); // Mira active',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces",
        kind: "typescript",
      },
    ],
  ],
  [
    "3. Function Types",
    [
      {
        name: "Defining Functions",
        syntax: "function name(parameter: T): ReturnType { ... }",
        explanation:
          "Annotate a parameter after its name and a return type after the closing parenthesis. The checker verifies calls and the returned values against that contract. A return type can often be inferred; an explicit one is useful at public boundaries or when you want changes to produce a clear error.\n\nThe example calculates an invoice amount and returns a number. The arrow function demonstrates the same contract in expression form. Types do not convert arguments: a string that looks numeric still needs deliberate parsing before it can satisfy a number parameter.",
        code: 'function invoiceTotal(price: number, quantity: number): number {\n  return price * quantity;\n}\nconst addTax = (amount: number, rate: number): number => amount * (1 + rate);\nconst subtotal = invoiceTotal(20, 3);\nconsole.log(addTax(subtotal, 0.2)); // 72\n// invoiceTotal("20", 3); // Error, not automatic conversion.',
        source: "https://www.typescriptlang.org/docs/handbook/2/functions.html",
        kind: "typescript",
      },
      {
        name: "Void Type",
        syntax: "(value: T) => void",
        explanation:
          "void says that callers should not use a function’s return value. It is common for logging, event handlers, and callbacks whose purpose is a side effect. An explicitly declared function returning void cannot directly return a meaningful value.\n\nThere is a useful callback distinction: a function returning a value can be assigned to a () => void contract because its caller promises to ignore that value. Array.push returns a number, yet it is valid inside forEach. void does not mean never: a void function can finish normally; a never function cannot.",
        code: 'function logMessage(message: string): void {\n  console.log(message);\n}\nconst numbers: number[] = [];\n[1, 2, 3].forEach(value => numbers.push(value));\nconst notify: () => void = () => 42; // Result is ignored by this contract.\nnotify();\nlogMessage(numbers.join(", ")); // 1, 2, 3',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/functions.html#return-type-void",
        kind: "typescript",
      },
      {
        name: "Optional Parameters",
        syntax: "parameter?: T · parameter: T = defaultValue",
        explanation:
          "A parameter with ? can be omitted, and its value inside the function includes undefined. A default initializer supplies a value when an argument is omitted or explicitly undefined. Required parameters generally come before optional ones.\n\nOnly mark a callback parameter optional if the function invoking that callback may actually omit it. It does not mean the callback’s author is allowed to ignore it—JavaScript already permits that. The greeting below handles absence explicitly and the price formatter uses a default.",
        code: 'function greet(name?: string): string {\n  return `Hello, ${name ?? "guest"}`;\n}\nfunction formatPrice(amount: number, currency = "USD"): string {\n  return `${currency} ${amount.toFixed(2)}`;\n}\nconsole.log(greet()); // Hello, guest\nconsole.log(formatPrice(12)); // USD 12.00\nconsole.log(formatPrice(12, "EUR")); // EUR 12.00',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-parameters",
        kind: "typescript",
      },
      {
        name: "Destructured And Rest Parameters",
        syntax: "function f({ key }: Shape, ...rest: T[])",
        explanation:
          "For a destructured parameter, annotate the whole object pattern after its closing brace. A colon inside { name: localName } renames a variable; it is not a type annotation. Destructuring can also give individual properties defaults.\n\nA rest parameter collects remaining arguments into an array and must be last. The example takes a cart’s label and optional discount from one object, then any number of prices. An empty price list works because reduce starts with zero. The function returns a description of the discounted total.",
        code: 'type CartOptions = { label: string; discount?: number };\nfunction cartTotal(\n  { label, discount = 0 }: CartOptions,\n  ...prices: number[]\n): string {\n  const subtotal = prices.reduce((sum, price) => sum + price, 0);\n  return `${label}: ${(subtotal * (1 - discount)).toFixed(2)}`;\n}\nconsole.log(cartTotal({ label: "Books", discount: 0.1 }, 20, 30)); // Books: 45.00',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/functions.html#parameter-destructuring",
        kind: "typescript",
      },
      {
        name: "Typing Variables As Functions",
        syntax: "type FunctionName = (parameter: T) => R",
        explanation:
          "A function type describes a value that can be called. Give the variable a function type to accept interchangeable implementations while keeping their inputs and outputs consistent. Parameter names inside the type help readers but do not need to match the implementation’s local names.\n\nThe annotation supplies contextual types, so value in upper is inferred as string. A higher-order function can accept the same contract as a parameter. Here formatAll applies the provided formatter to each input string, and the checker ensures the callback returns text.",
        code: 'type Formatter = (input: string) => string;\nconst upper: Formatter = value => value.toUpperCase();\nfunction formatAll(values: string[], format: Formatter): string[] {\n  return values.map(format);\n}\nconsole.log(formatAll(["mira", "alex"], upper)); // ["MIRA", "ALEX"]\n// const invalid: Formatter = value => value.length; // Error: number result.',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/functions.html#function-type-expressions",
        kind: "typescript",
      },
    ],
  ],
  [
    "4. Type Modifiers",
    [
      {
        name: "Unions",
        syntax: "A | B",
        explanation:
          'A union accepts any one of its member types. Before narrowing, you may only perform operations that are valid for every member. Literal unions such as "draft" | "published" are useful when a value must come from a known set.\n\nThis function accepts a numeric or textual identifier. Both support toString, but only a number supports toFixed; the typeof branch makes that distinction safe. A union describes alternatives and does not convert one alternative into another.',
        code: 'type PublicationState = "draft" | "published";\nfunction formatId(id: string | number): string {\n  if (typeof id === "number") return id.toFixed(0);\n  return id.toUpperCase();\n}\nconst state: PublicationState = "draft";\nconsole.log(formatId(42), formatId("u1"), state); // 42 U1 draft',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types",
        kind: "typescript",
      },
      {
        name: "Intersections",
        syntax: "A & B",
        explanation:
          "An intersection requires a value to satisfy every constituent type at once. It is often useful for combining object capabilities: an identified record plus timestamps, for example. It does not merge or copy runtime objects; you still construct the actual value yourself.\n\nIf two constituent types require incompatible types for the same property, that property can become never, making the intersection impossible to satisfy. Prefer composing compatible shapes. The example combines independent properties into one stored item and supplies both when creating it.",
        code: 'type Identified = { id: string };\ntype Timestamped = { createdAt: Date };\ntype StoredItem = Identified & Timestamped;\nconst item: StoredItem = { id: "item-1", createdAt: new Date("2026-01-01") };\nconsole.log(item.id, item.createdAt.getUTCFullYear()); // item-1 2026\n// type Impossible = { id: string } & { id: number }; // id becomes never.',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types",
        kind: "typescript",
      },
      {
        name: "readonly",
        syntax: "readonly property: T · readonly T[]",
        explanation:
          "readonly prevents writes through a particular type. A readonly array disallows mutating methods such as push and permits functions to accept arrays without promising to change them. The original data is not frozen at runtime, and aliases may still be able to mutate it.\n\nProperty readonly is shallow: it prevents replacing that property, not automatically changing everything reachable through it. In this example the sum function only reads its input. The cart cannot have its items property reassigned through its declared type, but its mutable array can still receive another item.",
        code: 'function sum(values: readonly number[]): number {\n  return values.reduce((total, value) => total + value, 0);\n}\nconst cart: { readonly items: string[] } = { items: ["Book"] };\ncart.items.push("Pen"); // Allowed: the array itself is mutable.\nconsole.log(sum([10, 20]), cart.items.length); // 30 2\n// cart.items = []; // Error: readonly property.',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-properties",
        kind: "typescript",
      },
      {
        name: "keyof",
        syntax: "keyof T",
        explanation:
          'keyof turns the known keys of a type into a union. For an object with id and name properties, keyof produces "id" | "name". It is a type operation, not a function that lists an object’s keys at runtime.\n\nUse it to keep key parameters aligned with a model as the model changes. Index signatures can broaden the result: a string index signature typically yields string | number because numeric JavaScript property access can address string keys. The example rejects a misspelled field and accepts either known property.',
        code: 'type User = { id: string; name: string };\ntype UserKey = keyof User; // "id" | "name"\nfunction printField(user: User, key: UserKey): void {\n  console.log(user[key]);\n}\nprintField({ id: "u1", name: "Mira" }, "name"); // Mira\n// printField({ id: "u1", name: "Mira" }, "email"); // Error.',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/keyof-types.html",
        kind: "typescript",
      },
      {
        name: "typeof",
        syntax: "type Name = typeof existingValue",
        explanation:
          "In a type position, typeof captures the type of an existing value. It lets a configuration object or a function become the source of a type instead of maintaining a duplicate definition. This is different from JavaScript’s runtime typeof expression, which produces a category string.\n\nThe type query reflects the existing inferred type. It does not automatically preserve all literal property values; an ordinary mutable object’s theme property is usually string. The example creates another object with the same shape and contrasts a type query with a runtime check.",
        code: 'const defaults = { theme: "dark", compact: false };\ntype Settings = typeof defaults; // { theme: string; compact: boolean }\nconst custom: Settings = { theme: "light", compact: true };\nconst runtimeCategory = typeof custom; // "object" at runtime\nconsole.log(custom.theme, runtimeCategory); // light object',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/typeof-types.html",
        kind: "typescript",
      },
      {
        name: "Index Types",
        syntax: "T[K] · T[number] · { [key: string]: Value }",
        explanation:
          'Indexed access extracts a property type: User["name"] is the type of name, and an array type indexed with number yields its element type. Indexing with keyof can extract a union of all property values.\n\nAn index signature is related syntax for dictionary-like objects with open-ended keys. Unlike indexed access, it describes the allowed entries rather than extracting a member. Explicit properties must fit its value type. The example extracts a name type and an array element type and models a dictionary whose arbitrary keys may be absent.',
        code: 'type User = { name: string; age: number };\ntype Name = User["name"]; // string\ntype Row = User[][number]; // User\ntype FieldValue = User[keyof User]; // string | number\nconst user: Row = { name: "Mira", age: 28 };\nconst name: Name = user.name;\nconst visits: { [userId: string]: number | undefined } = { u1: 3 };\nconsole.log(name.toUpperCase(), visits["missing"] ?? 0); // MIRA 0',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html",
        kind: "typescript",
      },
    ],
  ],
  [
    "5. Advanced Types",
    [
      {
        name: "As Const And Enums",
        syntax: "expression as const · enum Name { ... }",
        explanation:
          "as const preserves literal values in a literal expression and makes its object properties or tuple positions readonly in the inferred type. It does not freeze the value at runtime. An object used this way can also provide a union of its values through typeof and indexed access.\n\nA regular enum creates a runtime value as well as a type. String enums give explicit names and values; numeric enums also generate reverse mappings. Choose according to how the API will be consumed. This example shows an object-derived status union beside a string enum with a similar purpose.",
        code: 'const Status = { Draft: "draft", Published: "published" } as const;\ntype StatusValue = typeof Status[keyof typeof Status];\nconst current: StatusValue = Status.Draft;\nenum Direction { Up = "up", Down = "down" }\nconst direction: Direction = Direction.Up;\nconsole.log(current, direction); // draft up\n// Status.Draft = "editing"; // Error: readonly literal property.',
        source: "https://www.typescriptlang.org/docs/handbook/enums.html",
        kind: "typescript",
      },
      {
        name: "Tuples",
        syntax: "[first: A, second: B] · readonly [A, B]",
        explanation:
          "A tuple is an array type with known positions and, often, a known length. Labels document what each position means without creating named properties at runtime. Tuple destructuring gives each variable its corresponding type, unlike an ordinary mixed array where each read may be a union.\n\nUse optional and rest tuple elements for variable-length structured arguments, and readonly tuples for fixed data that callers should only read. A tuple type alone is not runtime validation. Here a coordinate has two numeric positions, and a lookup returns an identifier paired with a name.",
        code: 'const point: readonly [x: number, y: number] = [3, 4];\nfunction findUser(): [id: number, name: string] {\n  return [1, "Mira"];\n}\nconst [id, name] = findUser();\nconsole.log(point[0], id, name.toUpperCase()); // 3 1 MIRA\n// const invalid: [number, string] = ["Mira", 1]; // Error.',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types",
        kind: "typescript",
      },
      {
        name: "Generics",
        syntax: "function name<T>(value: T): T · T extends Constraint",
        explanation:
          "A generic type parameter represents a type chosen at a call or instantiation. Its main job is to preserve a relationship between values: the element type going into a container can be the element type coming out. Using any would discard that relationship.\n\nA constraint such as T extends { id: string } says which capabilities the implementation may rely on. Inference often supplies T automatically. Here first preserves the array element type while acknowledging an empty array, and identify accepts different object shapes as long as each includes an id.",
        code: 'function first<T>(values: readonly T[]): T | undefined {\n  return values[0];\n}\nfunction identify<T extends { id: string }>(value: T): string {\n  return value.id;\n}\nconst name = first(["Mira", "Alex"]); // string | undefined\nconst score = first<number>([10, 20]); // explicit type argument\nconsole.log(name?.toUpperCase(), score, identify({ id: "u1", age: 28 }));',
        source: "https://www.typescriptlang.org/docs/handbook/2/generics.html",
        kind: "typescript",
      },
      {
        name: "Async Functions",
        syntax: "async function name(): Promise<Result>",
        explanation:
          "An async function always returns a Promise: returning a plain value fulfills that promise, and throwing rejects it. The type argument describes the fulfilled value, not the error. await unwraps the promise inside an async function.\n\nMarking an API response as Promise<User> does not validate JSON; validate external data before claiming that shape. This example uses an in-memory lookup so it runs without a server. It awaits a user, displays their name, and catches a missing-record error with an unknown-safe check.",
        code: 'type User = { id: string; name: string };\nasync function loadUser(id: string): Promise<User> {\n  if (id !== "u1") throw new Error("User not found");\n  return { id, name: "Mira" };\n}\nasync function showUser(): Promise<void> {\n  try {\n    const user = await loadUser("u1");\n    console.log(user.name); // Mira\n  } catch (error) {\n    console.error(error instanceof Error ? error.message : "Unknown failure");\n  }\n}\nvoid showUser();',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#functions-which-return-promises",
        kind: "typescript",
      },
    ],
  ],
  [
    "6. Built In Types",
    [
      {
        name: "Pick And Omit",
        syntax: "Pick<T, Keys> · Omit<T, Keys>",
        explanation:
          "Pick selects properties by key, while Omit removes keys from an object type. Use them when one model provides the source shape for several related views or function inputs. Both preserve the selected properties’ types and modifiers.\n\nThese utilities do not remove fields from a real object. Assigning an existing User to a public view type still refers to the same full object; explicitly construct a public object before serializing sensitive data. The example builds that object so the password hash is absent at runtime, not merely hidden from the type checker.",
        code: 'interface User { id: string; name: string; passwordHash: string }\ntype PublicUser = Pick<User, "id" | "name">;\ntype NewUser = Omit<User, "id">;\nfunction toPublic(user: User): PublicUser {\n  return { id: user.id, name: user.name };\n}\nconst draft: NewUser = { name: "Mira", passwordHash: "example-only" };\nconsole.log(toPublic({ id: "u1", ...draft })); // { id: "u1", name: "Mira" }',
        source:
          "https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys",
        kind: "typescript",
      },
      {
        name: "Partial And Required",
        syntax: "Partial<T> · Required<T>",
        explanation:
          "Partial makes every top-level property optional, which is useful for a patch. Required removes optional markers from the top-level shape. Neither transforms nested objects recursively, supplies missing defaults, nor validates data at runtime.\n\nA patch function needs to decide how omitted properties differ from explicitly provided values. The example merges a small patch into an existing settings object. Separately, applyDefaults creates the values required by Required rather than asserting that optional input already contains them. exactOptionalPropertyTypes, covered later, makes absence versus explicit undefined more precise.",
        code: 'interface Settings { theme: string; compact: boolean }\nfunction patchSettings(current: Settings, patch: Partial<Settings>): Settings {\n  return { ...current, ...patch };\n}\ninterface Options { theme?: string; compact?: boolean }\nfunction applyDefaults(input: Options): Required<Options> {\n  return { theme: input.theme ?? "dark", compact: input.compact ?? false };\n}\nconsole.log(patchSettings({ theme: "dark", compact: false }, { compact: true }));\nconsole.log(applyDefaults({})); // { theme: "dark", compact: false }',
        source:
          "https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype",
        kind: "typescript",
      },
      {
        name: "ReturnType And Parameters",
        syntax: "ReturnType<typeof fn> · Parameters<typeof fn>",
        explanation:
          "ReturnType extracts a function type’s result. Parameters extracts its parameter list as a tuple, preserving optional and rest positions. Use typeof when starting from a function value: the utilities accept a type, not the value itself.\n\nThese helpers keep related code aligned when a function changes. They do not invoke the function. For an overloaded function, extraction generally uses the last overload signature rather than resolving a specific call. Here the extracted tuple can be spread into createUser, and the resulting object matches the derived result type.",
        code: 'function createUser(name: string, active = true) {\n  return { name, active };\n}\ntype CreateUserArgs = Parameters<typeof createUser>;\ntype CreatedUser = ReturnType<typeof createUser>;\nconst args: CreateUserArgs = ["Mira", false];\nconst user: CreatedUser = createUser(...args);\nconsole.log(user); // { name: "Mira", active: false }',
        source:
          "https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype",
        kind: "typescript",
      },
      {
        name: "Record",
        syntax: "Record<Keys, Value>",
        explanation:
          "Record describes an object mapping a set of keys to one value type. With a finite literal union of keys, all members are required. It is useful for lookup tables where adding a new state should force you to provide its display label.\n\nRecord<string, Value> describes an open-ended dictionary and does not guarantee every possible key exists at runtime. Include undefined in its value type or enable noUncheckedIndexedAccess for honest arbitrary lookups. The finite table below covers exactly the states used by the function.",
        code: 'type State = "idle" | "saving" | "done";\nconst labels: Record<State, string> = {\n  idle: "Ready",\n  saving: "Saving…",\n  done: "Saved"\n};\nfunction stateLabel(state: State): string { return labels[state]; }\nconsole.log(stateLabel("saving")); // Saving…',
        source:
          "https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type",
        kind: "typescript",
      },
      {
        name: "Readonly",
        syntax: "Readonly<T>",
        explanation:
          "Readonly makes the top-level properties of an object type readonly. It is useful for APIs that promise to inspect a settings object without reassigning its fields. The lowercase readonly modifier from chapter 4 applies to an individual property or array; Readonly applies a transformation across a type.\n\nThis utility is shallow and erased at runtime. Nested mutable objects remain mutable, and another reference may still modify the original. The example shows both the assignment restriction and the important nested-object limitation.",
        code: 'interface Preferences { theme: string; nested: { compact: boolean } }\nconst preferences: Readonly<Preferences> = {\n  theme: "dark", nested: { compact: false }\n};\n// preferences.theme = "light"; // Error: top-level readonly.\npreferences.nested.compact = true; // Allowed: shallow restriction.\nconsole.log(preferences.nested.compact); // true',
        source:
          "https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype",
        kind: "typescript",
      },
      {
        name: "Awaited",
        syntax: "Awaited<T>",
        explanation:
          "Awaited models the type produced by awaiting a value, recursively unwrapping promises and compatible thenables. It also preserves plain values and distributes across union alternatives. It is available in TypeScript 4.5+.\n\nCombine it with ReturnType to describe the resolved result of an async function. ReturnType alone still includes the Promise wrapper. In this example User is the resolved object type and Result is string | number. These aliases perform no asynchronous work themselves; the call and then handler do that at runtime.",
        code: 'async function getUser() { return { id: "u1", name: "Mira" }; }\ntype PendingUser = ReturnType<typeof getUser>; // Promise<{ id: string; name: string }>\ntype User = Awaited<PendingUser>; // { id: string; name: string }\ntype Result = Awaited<string | Promise<number>>; // string | number\nconst local: User = { id: "u2", name: "Alex" };\nconst result: Result = 42;\nvoid getUser().then(user => console.log(user.name, local.name, result));',
        source:
          "https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype",
        kind: "typescript",
      },
    ],
  ],
  [
    "7. Type Narrowing",
    [
      {
        name: "Basic Type Guards",
        syntax: "typeof · instanceof · in · Array.isArray · null checks",
        explanation:
          'A type guard is a runtime check that lets TypeScript narrow a value in a branch. typeof is useful for primitives, instanceof for class instances, and Array.isArray for arrays. Use in only after establishing that a value is an object.\n\nJavaScript reports typeof null as "object", so check null separately. Truthiness also removes empty strings and zero; explicit null checks preserve those valid values. The function below handles null, dates, arrays, and strings before calling the operations specific to each one.',
        code: 'function describe(value: string | string[] | Date | null): string {\n  if (value === null) return "Missing";\n  if (value instanceof Date) return value.toISOString();\n  if (Array.isArray(value)) return value.join(", ");\n  return value.toUpperCase(); // Only string remains.\n}\nconsole.log(describe(["web", "types"])); // web, types\nconsole.log(describe("")); // Empty string stays valid.',
        source: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
        kind: "typescript",
      },
      {
        name: "Never Type",
        syntax: "never = no possible value",
        explanation:
          "never represents an impossible value. A function that always throws or never finishes can return never. In control flow, a value narrowed past every possible union member becomes never. It differs from void: a void function may return normally, while a never function cannot.\n\nUse this for exhaustiveness checks: a helper accepts only never, so passing an unhandled variant to it produces an error. This example checks the current two directions. Adding another direction without adding a matching case makes the assertNever call fail during checking.",
        code: 'function assertNever(value: never): never {\n  throw new Error(`Unexpected value: ${String(value)}`);\n}\ntype Direction = "left" | "right";\nfunction offset(direction: Direction): number {\n  switch (direction) {\n    case "left": return -1;\n    case "right": return 1;\n    default: return assertNever(direction);\n  }\n}\nconsole.log(offset("left")); // -1',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type",
        kind: "typescript",
      },
      {
        name: "Unknown Type",
        syntax: "unknown requires evidence before use",
        explanation:
          "unknown can hold any value, but it does not let you use arbitrary properties or call methods until you narrow it. It is a useful boundary type for parsed JSON, caught errors, and data from outside your program. any skips these checks instead.\n\nA type annotation alone does not validate JSON. The example stores parsed data as unknown, then verifies the object, its non-nullness, and a property’s type before using it. Invalid input produces a controlled error rather than a misleading cast. JSON.parse can also throw for malformed syntax; a caller can handle that failure.",
        code: 'function readName(json: string): string {\n  const value: unknown = JSON.parse(json);\n  if (typeof value === "object" && value !== null\n      && "name" in value && typeof value.name === "string") {\n    return value.name.toUpperCase();\n  }\n  throw new Error("Expected an object with a string name");\n}\nconsole.log(readName(\'{"name":"Mira"}\')); // MIRA',
        source:
          "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type",
        kind: "typescript",
      },
      {
        name: "As Casting",
        syntax: "value as Type",
        explanation:
          "An as assertion tells the checker to treat a value as a compatible type. It does not convert the value or insert a runtime check. Use it only when you have evidence the checker cannot express, and keep that assertion close to the evidence.\n\nThe example demonstrates a common mistake without executing it: asserting parsed data as User would still leave a numeric name unchanged at runtime. A real conversion uses String(42), which produces a string. For DOM access or untrusted input, prefer a runtime guard whenever the assumption can fail.",
        code: 'type User = { name: string };\nconst raw: unknown = { name: 42 };\nconst claimed = raw as User; // No runtime validation.\nconsole.log(typeof claimed.name); // "number", despite the asserted type.\n// claimed.name.toUpperCase(); // Would throw.\nconst converted = String(42); // Actual runtime conversion.\nconsole.log(converted.toUpperCase()); // "42"',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions",
        kind: "typescript",
      },
      {
        name: "Satisfies",
        syntax: "expression satisfies Constraint",
        explanation:
          "satisfies checks that an expression fits a target type while retaining its resulting inferred shape. Unlike an as assertion, it reports incompatibility instead of asking the checker to accept your claim. It is available in TypeScript 4.9+.\n\nThe target can contextually influence inference, so satisfies is not a universal “preserve every literal” switch; add as const when readonly literal preservation is intended. In this example the checker verifies the permitted keys and value alternatives while keeping green known as a string, so string methods work without a union guard.",
        code: 'type Channel = "green" | "blue";\ntype RGB = [number, number, number];\nconst palette = {\n  green: "#16a34a",\n  blue: [37, 99, 235]\n} satisfies Record<Channel, string | RGB>;\nconsole.log(palette.green.toUpperCase()); // #16A34A\nconst config = { mode: "dark" } as const satisfies { mode: "dark" | "light" };',
        source:
          "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator",
        kind: "typescript",
      },
      {
        name: "Discriminated Union",
        syntax: '{ kind: "a"; ... } | { kind: "b"; ... }',
        explanation:
          "A discriminated union gives every variant a shared property with a distinct literal value. Checking that property narrows the whole object, making the other fields available only in the appropriate branch. This represents valid combinations more clearly than one object with many unrelated optional fields.\n\nHere a successful result always contains data, and a failed result always contains an error message. A switch selects the right shape. Adding an idle state would require handling it before this function could return a string on every path under strict checking.",
        code: 'type Result =\n  | { status: "success"; data: string[] }\n  | { status: "error"; message: string };\nfunction render(result: Result): string {\n  switch (result.status) {\n    case "success": return result.data.join(", ");\n    case "error": return `Error: ${result.message}`;\n  }\n}\nconsole.log(render({ status: "success", data: ["Book", "Pen"] })); // Book, Pen',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions",
        kind: "typescript",
      },
      {
        name: "Function Overloads",
        syntax: "multiple call signatures + one compatible implementation",
        explanation:
          "Overloads describe different ways to call one function, often linking a particular input type to a particular output type. Write the overload signatures first, followed by one implementation broad enough to handle them. Callers only see the overloads, not an additional implementation signature.\n\nPrefer a union parameter when all alternatives return the same kind of result. The example justifies overloads because a string input produces a string array while an array input produces a string. A variable typed as the union of both inputs needs an explicit union overload if you want that call to be public too.",
        code: 'function convert(value: string): string[];\nfunction convert(value: string[]): string;\nfunction convert(value: string | string[]): string | string[] {\n  return typeof value === "string" ? value.split(",") : value.join(",");\n}\nconst parts = convert("a,b"); // string[]\nconst text = convert(["a", "b"]); // string\nconsole.log(parts.length, text.toUpperCase()); // 2 A,B',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads",
        kind: "typescript",
      },
      {
        name: "Type Predicate Function",
        syntax: "function isT(value: unknown): value is T",
        explanation:
          "A predicate function packages reusable runtime checks into a return type that tells TypeScript how to narrow. A true result claims the value is T; the checker trusts your implementation, so checking too little can make later code unsafe.\n\nFor a union input, a false result also narrows away the claimed type. Avoid predicates whose condition is merely a subset of that type, such as “is a positive number” while promising only “is number.” This example checks the full small shape it promises, then uses the guard in filter to produce a User array.",
        code: 'type User = { id: string; name: string };\nfunction isUser(value: unknown): value is User {\n  return typeof value === "object" && value !== null\n    && "id" in value && typeof value.id === "string"\n    && "name" in value && typeof value.name === "string";\n}\nconst values: unknown[] = [{ id: "u1", name: "Mira" }, { name: 42 }, null];\nconst users = values.filter(isUser); // User[]\nconsole.log(users.map(user => user.name)); // ["Mira"]',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates",
        kind: "typescript",
      },
      {
        name: "Assertion Function",
        syntax: "function assertT(value: unknown): asserts value is T",
        explanation:
          "An assertion function either throws or establishes a fact for the rest of the current scope. Its asserts return annotation tells the checker what to assume after a normal return. It does not return a converted value, and a broken assertion implementation can lie just like a broken predicate.\n\nUse an assertion for a required precondition, and a predicate when you want to branch on validity. This function verifies a string before an email formatter trims and lowercases it. A numeric argument would cause the assertion to throw before string methods run.",
        code: 'function assertString(value: unknown): asserts value is string {\n  if (typeof value !== "string") throw new Error("Expected a string");\n}\nfunction normalizeEmail(value: unknown): string {\n  assertString(value);\n  return value.trim().toLowerCase();\n}\nconsole.log(normalizeEmail(" MIRA@EXAMPLE.COM ")); // mira@example.com',
        source:
          "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions",
        kind: "typescript",
      },
      {
        name: "Loose Autocomplete",
        syntax: "KnownLiterals | (string & {})",
        explanation:
          'Sometimes an API accepts any string but should still suggest familiar values in an editor. A union such as "small" | "large" | string normally collapses to string. The intersection string & {} can retain a separate open-ended alternative while keeping known literals visible to completion tools.\n\nThis is an editor-oriented workaround, not a closed set, runtime validation, or a guarantee about every editor version. The {} type here excludes nullish values under strict checking; the intersection still accepts arbitrary strings. Use a plain literal union when unknown values should actually be rejected.',
        code: 'type Size = "small" | "medium" | "large" | (string & {});\nfunction describeSize(size: Size): string { return `Size: ${size}`; }\nconsole.log(describeSize("small")); // Suggested known value.\nconsole.log(describeSize("18rem")); // Arbitrary string is also accepted.\n// Hover Size and try editor completion inside describeSize("").',
        source: "https://github.com/microsoft/TypeScript/issues/29729",
        kind: "typescript",
      },
      {
        name: "Const Generics",
        syntax: "function name<const T extends Constraint>(value: T): T",
        explanation:
          "A const type parameter asks inference to prefer literal-like information for arguments written at the call site. Available in TypeScript 5.0+, it helps library helpers retain exact names or tuple positions without asking every caller to add as const.\n\nUse a readonly-compatible constraint when inference may produce a readonly tuple. A const parameter does not freeze data and cannot recover literals already widened in a separate variable. Here the inline route list keeps its exact tuple type; an existing string array stays broad.",
        code: 'function defineRoutes<const T extends readonly string[]>(routes: T): T {\n  return routes;\n}\nconst routes = defineRoutes(["/", "/settings"]);\n// readonly ["/", "/settings"]\ntype Route = typeof routes[number]; // "/" | "/settings"\nconst current: Route = "/settings";\nconst existing = ["/", "/settings"]; // string[] already widened\nconst broad = defineRoutes(existing); // string[]\nconsole.log(current, broad.length);',
        source:
          "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#const-type-parameters",
        kind: "typescript",
      },
      {
        name: "Branded Types",
        syntax: "BaseType & { readonly [brand]: Label }",
        explanation:
          "TypeScript normally compares shapes, so two string aliases remain interchangeable. A brand adds a distinguishing type-level property to prevent accidental mixing, for example a UserId and an OrderId that are both represented by strings at runtime.\n\nCreate a brand only at a trusted boundary after the required validation. A narrow as assertion inside that constructor is the controlled point where runtime evidence becomes a static claim. Brands are erased, can be bypassed with assertions, and must be re-established after deserializing data. This constructor validates a user-id format before branding it.",
        code: 'declare const userIdBrand: unique symbol;\ntype UserId = string & { readonly [userIdBrand]: "UserId" };\nfunction parseUserId(value: string): UserId {\n  if (!/^u_[0-9]+$/.test(value)) throw new Error("Invalid user id");\n  return value as UserId;\n}\nfunction findUser(id: UserId): string { return `Looking up ${id}`; }\nconsole.log(findUser(parseUserId("u_42"))); // Looking up u_42\n// findUser("u_42"); // Error: an ordinary string is not branded.',
        source:
          "https://www.typescriptlang.org/play/typescript/language-extensions/nominal-typing.ts.html",
        kind: "typescript",
      },
    ],
  ],
  [
    "8. Type Programming",
    [
      {
        name: "Conditional Types",
        syntax: "T extends U ? Yes : No",
        explanation:
          "A conditional type chooses one result type based on whether another type is assignable to a constraint. This is type-level logic; no runtime if statement is emitted. It becomes useful with generics that can be applied to many inputs.\n\nWhen the checked side is a naked type parameter, a union is handled member by member. Returning never filters a member out. Wrapping both sides in tuples disables that distributive behavior when you want to test the union as a whole. The examples distinguish a member-wise test from an all-members test.",
        code: 'type KeepString<T> = T extends string ? T : never;\ntype Text = KeepString<"ready" | 42 | "done">; // "ready" | "done"\ntype IsEntirelyString<T> = [T] extends [string] ? true : false;\ntype Mixed = IsEntirelyString<string | number>; // false\nconst text: Text = "ready";\nconst allStrings: Mixed = false;\nconsole.log(text, allStrings);',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html",
        kind: "typescript",
      },
      {
        name: "infer",
        syntax: "T extends Pattern<infer Part> ? Part : Fallback",
        explanation:
          "infer declares a temporary type variable while matching the true side of a conditional type. It extracts part of a structure instead of making callers provide that information separately. The extracted name is available in the conditional’s true result.\n\nHere ElementOf matches a readonly array and extracts its item type, while Fulfilled matches a Promise and extracts one layer of its result. ElementOf falls back to the original input for a non-array. A recursive built-in such as Awaited goes further than this deliberately small one-layer promise helper.",
        code: 'type ElementOf<T> = T extends readonly (infer Item)[] ? Item : T;\ntype Fulfilled<T> = T extends Promise<infer Value> ? Value : T;\ntype Item = ElementOf<readonly string[]>; // string\ntype Data = Fulfilled<Promise<{ id: number }>>; // { id: number }\nconst item: Item = "Book";\nconst data: Data = { id: 1 };\nconsole.log(item, data.id);',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types",
        kind: "typescript",
      },
      {
        name: "Conditional Types and infer Exercises",
        syntax: "Extract an element · extract a result · control distribution",
        explanation:
          "Practice before opening the solution. Exercise 1: implement ArrayItem<T> so arrays, including readonly tuples, yield their element type and non-arrays yield never. Exercise 2: implement PromiseValue<T> to unwrap one Promise layer and leave other types unchanged.\n\nExercise 3: implement AllStrings<T> to return true only if the entire input type is assignable to string. It should give false for string | number, rather than true | false. Replace the never placeholders and use the example assignments to check your answers. The solution explains the matching patterns and the tuple wrapper.",
        code: 'type ArrayItem<T> = never; // TODO\ntype PromiseValue<T> = never; // TODO\ntype AllStrings<T> = never; // TODO\n\n// Uncomment after implementing the types:\n// const item: ArrayItem<readonly ["a", "b"]> = "a";\n// const result: PromiseValue<Promise<number>> = 42;\n// const unchanged: PromiseValue<string> = "ready";\n// const mixed: AllStrings<string | number> = false;\n// const valid: AllStrings<"a" | "b"> = true;',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html",
        kind: "typescript",
        solution:
          '// Match both mutable and readonly arrays, then extract the element.\ntype ArrayItem<T> = T extends readonly (infer Item)[] ? Item : never;\n// Unwrap exactly one Promise layer.\ntype PromiseValue<T> = T extends Promise<infer Value> ? Value : T;\n// A tuple wrapper prevents member-wise distribution over a union.\ntype AllStrings<T> = [T] extends [string] ? true : false;\n\nconst item: ArrayItem<readonly ["a", "b"]> = "a";\nconst result: PromiseValue<Promise<number>> = 42;\nconst unchanged: PromiseValue<string> = "ready";\nconst mixed: AllStrings<string | number> = false;\nconst valid: AllStrings<"a" | "b"> = true;\n// const invalid: ArrayItem<number> = 1; // Error: result is never.',
      },
      {
        name: "Template Literals",
        syntax: "`${LiteralA}_${LiteralB}`",
        explanation:
          "Template literal types form string types from other literal types. If a placeholder contains a union, the resulting type includes its combinations. Use this to describe event names, translation keys, or other small string conventions without maintaining parallel lists.\n\nThey do not generate strings or validate arbitrary runtime text. Union combinations can also grow quickly; large generated schemas may be clearer as explicit generated types. The example derives four permitted event names and builds a handler that only accepts those names.",
        code: 'type Entity = "user" | "order";\ntype Action = "created" | "deleted";\ntype EventName = `${Entity}:${Action}`;\n// "user:created" | "user:deleted" | "order:created" | "order:deleted"\nfunction listen(event: EventName): void { console.log(`Listening to ${event}`); }\nlisten("user:created");\n// listen("invoice:created"); // Error: not part of the derived union.',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html",
        kind: "typescript",
      },
      {
        name: "Mapped Types",
        syntax: "{ [K in keyof T]: NewPropertyType }",
        explanation:
          "A mapped type visits property keys and builds a new object type. Each output property can refer to the corresponding original type through T[K]. Modifiers such as readonly, -readonly, ?, and -? add or remove mutability and optionality restrictions.\n\nThis is the idea behind many built-in utilities. It changes a type description, not the object at runtime. In the example, every settings field becomes a callback that accepts that field’s own value type, so the compact handler receives a boolean and the theme handler receives a string.",
        code: 'type Listeners<T> = { [K in keyof T]: (value: T[K]) => void };\ntype Mutable<T> = { -readonly [K in keyof T]: T[K] };\ntype Settings = { theme: string; compact: boolean };\nconst listeners: Listeners<Settings> = {\n  theme: value => console.log(value.toUpperCase()),\n  compact: value => console.log(value ? "Compact" : "Spacious")\n};\nlisteners.compact(true); // Compact',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html",
        kind: "typescript",
      },
      {
        name: "Recursive Types",
        syntax: "type Tree = { children: Tree[] }",
        explanation:
          "A recursive type refers to itself to describe nested data such as a folder tree. A recursive conditional type can repeatedly unwrap a structure until it reaches a base case. The base case is essential: without it, a transformation may never settle.\n\nKeep recursive transformations small and use them only when the data model needs them. The checker has limits on deeply expanded types, and a type declaration does not protect runtime recursion from cycles. This example totals an acyclic tree and separately derives the leaf type of a nested array.",
        code: "type Tree = { value: number; children: Tree[] };\nfunction total(tree: Tree): number {\n  return tree.value + tree.children.reduce((sum, child) => sum + total(child), 0);\n}\nconst tree: Tree = { value: 2, children: [{ value: 3, children: [] }] };\nconsole.log(total(tree)); // 5\n\ntype DeepItem<T> = T extends readonly (infer Item)[] ? DeepItem<Item> : T;\ntype Leaf = DeepItem<number[][][]>; // number\nconst leaf: Leaf = 42;",
        source:
          "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types",
        kind: "typescript",
      },
    ],
  ],
  [
    "9. Object Oriented Programming",
    [
      {
        name: "Defining Properties",
        syntax: "class Name { field: Type; constructor(...) { ... } }",
        explanation:
          "Class fields describe instance state. Under strictPropertyInitialization, initialize required fields at declaration or in the constructor. Optional fields may be absent. A constructor parameter marked public, private, protected, or readonly can also declare and initialize a property.\n\npublic is the default visibility. protected allows subclass access; TypeScript private is a checker restriction, while JavaScript #private enforces runtime privacy. readonly fields can be initialized but not reassigned through the class contract. The example uses a parameter property, an initialized field, and an optional nickname without hiding missing initialization behind !.",
        code: 'class User {\n  readonly createdAt = new Date();\n  nickname?: string;\n  #visits = 0;\n  constructor(public name: string) {}\n  visit(): number { return ++this.#visits; }\n  displayName(): string { return this.nickname ?? this.name; }\n}\nconst user = new User("Mira");\nconsole.log(user.displayName(), user.visit()); // Mira 1',
        source: "https://www.typescriptlang.org/docs/handbook/2/classes.html",
        kind: "typescript",
      },
      {
        name: "Implements and Abstract Classes",
        syntax: "class X implements Contract · abstract class Base",
        explanation:
          "implements checks that a class’s instance shape fulfills an interface. It does not copy code or automatically annotate method parameters. extends inherits implementation from a base class, and a derived constructor must call super before using this.\n\nAn abstract class cannot be directly instantiated. It may mix working methods with abstract members that concrete subclasses must implement. Here the interface supplies a naming contract, the abstract base reuses a greeting, and the concrete subclass provides the name calculation. Each mechanism has a distinct job.",
        code: 'interface Named { getName(): string }\nabstract class Person implements Named {\n  abstract getName(): string;\n  greet(): string { return `Hello, ${this.getName()}`; }\n}\nclass Member extends Person {\n  constructor(private name: string) { super(); }\n  getName(): string { return this.name; }\n}\nconsole.log(new Member("Mira").greet()); // Hello, Mira\n// new Person(); // Error: abstract class.',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes-and-members",
        kind: "typescript",
      },
      {
        name: "Generic Classes",
        syntax: "class Container<T> { value: T }",
        explanation:
          "A generic class connects its instance fields and methods through a type parameter. Choose that parameter when creating an instance, or let the constructor infer it from its arguments. This avoids a separate class for each stored value type without losing checking.\n\nA class’s static members belong to the shared constructor, so they cannot use the instance’s T as if each instance had separate static storage. The example keeps values in an instance array, accepts only its element type in add, and acknowledges that a lookup may miss.",
        code: 'class Repository<T extends { id: string }> {\n  private items: T[] = [];\n  add(item: T): void { this.items.push(item); }\n  find(id: string): T | undefined {\n    return this.items.find(item => item.id === id);\n  }\n}\ntype Product = { id: string; price: number };\nconst products = new Repository<Product>();\nproducts.add({ id: "book", price: 20 });\nconsole.log(products.find("book")?.price); // 20',
        source:
          "https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-classes",
        kind: "typescript",
      },
      {
        name: "InstanceType and ConstructorParameters",
        syntax:
          "InstanceType<typeof Class> · ConstructorParameters<typeof Class>",
        explanation:
          "A class name in a type position normally describes an instance. typeof Class describes its constructor value, including the new signature and static members. InstanceType extracts the instance produced by a constructor type; ConstructorParameters extracts its argument tuple.\n\nThese utilities are useful when a helper receives a constructor or a factory needs to stay synchronized with its constructor’s arguments. They do not instantiate anything themselves. In this example the tuple preserves the optional pages argument, and spreading it into new creates an actual Book instance.",
        code: 'class Book {\n  constructor(public title: string, public pages = 100) {}\n}\ntype BookArgs = ConstructorParameters<typeof Book>; // [title: string, pages?: number]\ntype BookInstance = InstanceType<typeof Book>; // Book\nconst args: BookArgs = ["TypeScript Notes", 240];\nconst book: BookInstance = new Book(...args);\nconsole.log(book.title, book.pages); // TypeScript Notes 240',
        source:
          "https://www.typescriptlang.org/docs/handbook/utility-types.html#constructorparameterstype",
        kind: "typescript",
      },
    ],
  ],
  [
    "10. Real World TypeScript",
    [
      {
        name: "Debugging",
        syntax: "tsc --noEmit · editor hovers · source maps · @ts-expect-error",
        explanation:
          "Start with the first useful diagnostic, hover the involved values, and reduce the problem to a small example. Read the expected type and the actual type separately. Avoid hiding an unexplained error with any or an assertion; fix the assumption or narrow the value.\n\nFor runtime debugging of emitted JavaScript, enable sourceMap and use a debugger that reads the maps. npx tsc --showConfig explains effective configuration; --traceResolution helps diagnose imports. @ts-expect-error can document an intentionally invalid type test and reports an error if that line stops failing. The example distinguishes text input from the numeric value a calculation requires.",
        code: 'function double(value: number): number { return value * 2; }\nconst input = "21";\n// double(input); // Diagnostic: string is not assignable to number.\nconst parsed = Number(input);\nif (!Number.isFinite(parsed)) throw new Error("Expected numeric input");\nconsole.log(double(parsed)); // 42\n\n// Type test only: this line is deliberately invalid.\n// @ts-expect-error - demonstrate the rejected call; do not execute this test.\nconst check: number = "not a number";',
        source: "https://www.typescriptlang.org/tsconfig/#sourceMap",
        kind: "typescript",
      },
      {
        name: "Importing Types",
        syntax: 'import type { Model } from "./models" · export type { Model }',
        explanation:
          "Use import type and export type for declarations used only by the checker. They disappear from JavaScript output, so do not use a type-only import as a constructor or other runtime value. A class needed with new must be imported normally.\n\nverbatimModuleSyntax helps make the distinction explicit. Module paths must match the runtime or bundler: this example uses the bundler setup from chapter 1. Node ESM projects typically use NodeNext and appropriate extensions instead. The example consists of two separate files; create both files rather than pasting them into one.",
        code: '// models.ts\nexport interface User { id: string; name: string }\nexport const defaultName = "Guest";\n\n// main.ts — a separate file\nimport type { User } from "./models";\nimport { defaultName } from "./models";\nconst user: User = { id: "u1", name: defaultName };\nconsole.log(user.name); // Guest',
        source: "https://www.typescriptlang.org/docs/handbook/2/modules.html",
        kind: "typescript",
      },
      {
        name: "Declaration Files",
        syntax: ".d.ts describes an existing runtime API",
        explanation:
          "A declaration file tells TypeScript about JavaScript that exists elsewhere. It contains type declarations, not the implementation. Installing declarations alone cannot make an import work at runtime. Many libraries bundle types; otherwise use the matching @types package or write a small, accurate declaration for a known API.\n\nThis two-file example describes an existing browser global installed by a vendor script. The exported empty declaration makes the .d.ts file a module, and declare global augments Window. The consumer handles the global being absent. Include the declaration file in the project, and load the real vendor script if you need its behavior.",
        code: '// vendor.d.ts\nexport {};\ndeclare global {\n  interface Window {\n    appVersion?: string;\n  }\n}\n\n// main.ts — a separate file; the vendor script may set window.appVersion.\nconsole.log(window.appVersion ?? "Vendor script not loaded");',
        source:
          "https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html",
        kind: "typescript",
      },
      {
        name: "Advanced TSConfig Options",
        syntax:
          "strict · noUncheckedIndexedAccess · exactOptionalPropertyTypes · moduleResolution",
        explanation:
          "Add options to address real failure modes. noUncheckedIndexedAccess includes undefined in unchecked lookups; exactOptionalPropertyTypes distinguishes an absent optional property from assigning undefined unless it is explicitly permitted. noImplicitOverride marks intentional overrides, and verbatimModuleSyntax keeps type-only imports explicit. isolatedModules checks compatibility with tools that transpile files independently.\n\nChoose module and moduleResolution for the actual runtime: ESNext/bundler for a bundled app, or matching NodeNext settings for Node ESM. paths influences resolution but does not rewrite runtime import strings. This config extends the starter, tightens checking, and includes declarations. For a library, use a separate emit configuration with noEmit: false and declaration: true; for debugging emitted JavaScript, enable sourceMap.",
        code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "lib": [\n      "ES2022",\n      "DOM"\n    ],\n    "module": "ESNext",\n    "moduleResolution": "bundler",\n    "moduleDetection": "force",\n    "strict": true,\n    "noUncheckedIndexedAccess": true,\n    "exactOptionalPropertyTypes": true,\n    "noImplicitOverride": true,\n    "verbatimModuleSyntax": true,\n    "isolatedModules": true,\n    "noEmit": true,\n    "rootDir": "./src"\n  },\n  "include": [\n    "src/**/*.ts",\n    "src/**/*.d.ts"\n  ]\n}',
        source: "https://www.typescriptlang.org/tsconfig/",
        kind: "json",
      },
    ],
  ],
];
const chapterIntros = {
  "1. Setup":
    "Start by learning what the checker does, then create a small project. Once the compiler can check a file, the rest of the course builds on that feedback loop.",
  "2. Basic Types":
    "Describe individual values, arrays, and object shapes. Use inference for obvious local values and annotations where a clear contract helps the reader or checker.",
  "3. Function Types":
    "Treat a function as a contract between callers and its implementation: which arguments it accepts, which may be omitted, and what it returns.",
  "4. Type Modifiers":
    "Build on basic shapes: combine types, restrict assignment, and derive keys or property types from information you already have.",
  "5. Advanced Types":
    "Move from individual shapes to reusable relationships. These topics preserve literal information, describe fixed positions, and connect input types to output types.",
  "6. Built In Types":
    "Reuse the standard utility types to transform models without copying their fields. These operations affect types, not runtime data or validation.",
  "7. Type Narrowing":
    "Start with a broad type and establish what a value really is before using it. The later lessons in this chapter show useful API patterns and explain which claims the checker must trust.",
  "8. Type Programming":
    "Use generics and type operators as small programs that derive other types. Read these examples in the editor: many results exist only as types and produce no JavaScript.",
  "9. Object Oriented Programming":
    "Apply familiar type contracts to class instances, constructors, and reusable class implementations. Separate instance behavior from static constructor values.",
  "10. Real World TypeScript":
    "Finish by applying the checker in a real project: investigate diagnostics, keep module boundaries clear, describe existing JavaScript, and choose compiler settings deliberately.",
};
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

function codeExample(code, name, label = "TypeScript example") {
  const container = document.createElement("div");
  const head = document.createElement("div");
  head.className = "example-head";
  const title = document.createElement("span");
  title.textContent = label;
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Copy code";
  button.setAttribute(
    "aria-label",
    "Copy " + label.toLowerCase() + " for " + name,
  );
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(code);
      button.textContent = "Copied!";
      setTimeout(() => {
        button.textContent = "Copy code";
      }, 1400);
    } catch {
      button.textContent = "Copy unavailable";
    }
  });
  head.append(title, button);
  const pre = document.createElement("pre");
  const element = document.createElement("code");
  element.textContent = code;
  pre.append(element);
  container.append(head, pre);
  return container;
}

function render() {
  const query = search.value.trim().toLowerCase();
  nav.replaceChildren();
  content.replaceChildren();
  let total = 0;
  for (const [chapter, lessons] of topics) {
    const matches = lessons.filter((lesson) =>
      [
        chapter,
        lesson.name,
        lesson.syntax,
        lesson.explanation,
        lesson.code,
        lesson.solution ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
    if (!matches.length) continue;
    const id = slug(chapter);
    const link = document.createElement("a");
    link.href = "#" + id;
    link.textContent = chapter + " (" + matches.length + ")";
    nav.append(link);
    const section = document.createElement("section");
    section.id = id;
    const heading = document.createElement("h2");
    heading.textContent = chapter;
    const intro = document.createElement("p");
    intro.className = "chapter-intro";
    intro.textContent = chapterIntros[chapter];
    section.append(heading, intro);
    for (const lesson of matches) {
      total++;
      const article = document.createElement("article");
      article.className = "entry";
      article.id = "lesson-" + slug(lesson.name);
      const title = document.createElement("h3");
      title.textContent = lesson.name;
      article.append(title);
      for (const paragraph of lesson.explanation.split("\n\n")) {
        const text = document.createElement("p");
        text.textContent = paragraph;
        article.append(text);
      }
      const syntax = document.createElement("p");
      syntax.className = "syntax-summary";
      const code = document.createElement("code");
      code.textContent = lesson.syntax;
      syntax.append(code);
      article.append(syntax);
      const labels = {
        typescript: "TypeScript example",
        shell: "Terminal commands",
        json: "tsconfig.json",
      };
      article.append(
        codeExample(lesson.code, lesson.name, labels[lesson.kind]),
      );
      if (lesson.solution) {
        const details = document.createElement("details");
        details.className = "exercise-solution";
        const summary = document.createElement("summary");
        summary.textContent = "Reveal solutions and explanations";
        details.append(
          summary,
          codeExample(lesson.solution, lesson.name, "Exercise solutions"),
        );
        article.append(details);
      }
      const reference = document.createElement("a");
      reference.className = "entry-reference";
      reference.href = lesson.source;
      reference.target = "_blank";
      reference.rel = "noopener noreferrer";
      reference.textContent = "TypeScript reference ↗";
      reference.setAttribute(
        "aria-label",
        "TypeScript reference for " + lesson.name,
      );
      article.append(reference);
      section.append(article);
    }
    content.append(section);
  }
  count.textContent = total + " of 55 topics";
  if (!total) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent =
      "No matching topics. Try a topic name, type operator, or example.";
    content.append(empty);
  }
}
search.addEventListener("input", render);
render();
