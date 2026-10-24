/* Add only categories supplied by the user, in image order. */
const handbook = {
  categories: [
    {
      name: "Install TypeScript",
      id: "install-typescript",
      intro:
        "Add the compiler as a project dependency, verify it, and initialize tsconfig.json.",
      methods: [
        {
          name: "Install TypeScript",
          explanation:
            "Install TypeScript locally as a development dependency so each project can use its own compiler version. Verify the installed compiler, then create tsconfig.json to configure the project.",
          note: "Requires Node.js and npm. npm init -y creates package.json using defaults; --save-dev records TypeScript in devDependencies. After installation, npx tsc runs the project’s compiler: --version prints its version, and --init writes tsconfig.json without overwriting an existing one. Generated options depend on the installed TypeScript version. Keep package-lock.json in version control to reproduce the dependency versions. Run each example independently in the indicated folder.",
          examples: [
            {
              label:
                "Quick reference — install and verify in a new, empty project folder",
              language: "bash",
              code: "# Requires Node.js and npm\nnpm init -y\nnpm install --save-dev typescript\nnpx tsc --version",
            },
            {
              label:
                "Detailed example — create a project and initialize its compiler configuration",
              language: "bash",
              code: "# Requires Node.js and npm; use a new folder name.\nmkdir typescript-practice\ncd typescript-practice\n\n# Create package.json and install the project-local compiler.\nnpm init -y\nnpm install --save-dev typescript\n\n# Verify the compiler and create tsconfig.json.\nnpx tsc --version\nnpx tsc --init\n\n# Open tsconfig.json in your editor to review the generated options.",
            },
          ],
          source: "https://www.typescriptlang.org/download/",
        },
      ],
    },
    {
      name: "Basic Types",
      id: "basic-types",
      intro: [
        "TypeScript basic types and annotations from both supplied images, in quick-reference order followed by the detailed topics. Arrays, tuples, enums, special types, and assertions are included as shown; not every item is a JavaScript primitive. Run snippets independently in .ts files with strict checking. Examples are checked with TypeScript 5.9.3, target ES2020, and the ES2020 and DOM libraries (for console). Use a compiler for the enum examples; erasable-syntax-only runners cannot execute them directly.",
        "Named constants with numeric or string values. The Primitive Types category contains a short introduction; this category follows all six detailed enum topics in your images. Run each snippet independently through a TypeScript compiler, not an erasable-syntax-only runner. Examples are checked with TypeScript 5.9.3, strict checking, target ES2020, and ES2020/DOM libraries. The const enum examples assume whole-program tsc compilation with isolatedModules and preserveConstEnums disabled.",
        "Typed array positions and compile-time controls on mutation, following the detailed topics in your images. Fixed tuples describe a known length; optional and rest positions expand the allowed shapes. readonly and as const do not guarantee runtime immutability. Run each snippet independently in a .ts file. Examples are checked with TypeScript 5.9.3, strict checking, target ES2020, and ES2020/DOM libraries.",
      ],
      methods: [
        {
          name: "string",
          explanation:
            "Represents text, including empty strings and template literals. Use the lowercase string annotation for text variables, parameters, and return values.",
          note: "Use string rather than the boxed String type. Strings are immutable: methods such as toUpperCase() return a new string. The examples use userName instead of the global browser name variable to work in standalone .ts files.",
          examples: [
            {
              label: "Quick reference — annotate a text value",
              language: "typescript",
              code: 'let userName: string = "John";\nconsole.log(userName); // "John"',
            },
            {
              label:
                "Practical example — format a greeting without changing the input",
              language: "typescript",
              code: 'function greet(name: string): string {\n  return `Hello, ${name.toUpperCase()}!`;\n}\n\nconst userName: string = "John";\nconsole.log(greet(userName)); // "Hello, JOHN!"\nconsole.log(userName);        // "John"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
        },
        {
          name: "number",
          explanation:
            "Represents JavaScript numbers, including integers and floating-point values. Use number for ordinary arithmetic such as ages, measurements, and totals.",
          note: "There are no separate int and float types. number includes NaN and Infinity, and integer precision is limited to Number.MAX_SAFE_INTEGER; bigint is covered separately for larger exact integers. Floating-point arithmetic can introduce rounding.",
          examples: [
            {
              label: "Quick reference — annotate an age",
              language: "typescript",
              code: "let age: number = 30;\nconsole.log(age + 1); // 31",
            },
            {
              label: "Practical example — calculate and format a total",
              language: "typescript",
              code: 'function total(price: number, quantity: number): number {\n  return price * quantity;\n}\n\nconst amount: number = total(12.5, 3);\nconsole.log(amount);            // 37.5\nconsole.log(amount.toFixed(2)); // "37.50" (a string)',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
        },
        {
          name: "boolean",
          explanation:
            "Represents true or false. Use boolean annotations for flags, checks, and function results that express a yes-or-no decision.",
          note: 'Use boolean rather than the boxed Boolean type. An annotation does not convert other values into booleans; for example, the string "false" is not the boolean false.',
          examples: [
            {
              label: "Quick reference — annotate a state flag",
              language: "typescript",
              code: "let isActive: boolean = true;\nconsole.log(isActive); // true",
            },
            {
              label: "Practical example — return a permission decision",
              language: "typescript",
              code: "function canEdit(isActive: boolean, isOwner: boolean): boolean {\n  return isActive && isOwner;\n}\n\nconsole.log(canEdit(true, true));  // true\nconsole.log(canEdit(true, false)); // false",
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
        },
        {
          name: "any",
          explanation:
            "Opts a value out of normal type checking, allowing unrestricted property access and calls. Use it sparingly when integrating code whose types cannot yet be described.",
          note: "any is a special TypeScript type, not a JavaScript primitive. It can hide mistakes and spread unchecked values to other variables; it performs no runtime validation. Prefer unknown when a value must be checked before use.",
          examples: [
            {
              label: "Quick reference — reassign an unchecked value",
              language: "typescript",
              code: 'let value: any = "anything";\nvalue = 30;\nconsole.log(value.toFixed(1)); // "30.0"; the compiler does not verify this call.',
            },
            {
              label:
                "Practical example — illustrate an unchecked legacy boundary",
              language: "typescript",
              code: 'function legacyLabel(value: any): string {\n  return value.label.toUpperCase();\n}\n\nconsole.log(legacyLabel({ label: "ready" })); // "READY"\n// Passing a missing or non-string label would throw at runtime.\n// TypeScript does not protect this boundary because value is any.',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
        },
        {
          name: "symbol",
          explanation:
            "Represents a unique identity value, often used as an object property key. Use symbols when keys with identical descriptions must remain distinct.",
          note: 'Symbol("id") creates a fresh symbol each time; its description is only a label. Symbol-keyed properties are skipped by Object.keys() and JSON.stringify(). Symbols require an ES2015-or-newer library and a runtime that supports them.',
          examples: [
            {
              label: "Quick reference — create and use a symbol key",
              language: "typescript",
              code: 'let id: symbol = Symbol("id");\nconst record = { [id]: "user-1" };\n\nconsole.log(record[id]); // "user-1"',
            },
            {
              label:
                "Practical example — distinguish symbols with the same description",
              language: "typescript",
              code: 'const first: symbol = Symbol("id");\nconst second: symbol = Symbol("id");\nconst record = { [first]: "private", label: "visible" };\n\nconsole.log(first === second);      // false\nconsole.log(Object.keys(record)); // ["label"]',
            },
          ],
          source: "https://www.typescriptlang.org/docs/handbook/symbols.html",
        },
        {
          name: "bigint",
          explanation:
            "Represents integers with arbitrary precision, unlike number’s limited exact-integer range. Use bigint for large integer identifiers, counters, or calculations that must stay exact.",
          note: "Use an ES2020-or-newer compilation target and a runtime with BigInt support; TypeScript does not downlevel bigint arithmetic. BigInt() accepts integer inputs, but a previously rounded number stays rounded. Do not mix bigint and number in arithmetic; division truncates toward zero, and JSON.stringify rejects bigint unless you convert or handle it explicitly.",
          examples: [
            {
              label:
                "Quick reference — create bigints with a constructor or literal",
              language: "typescript",
              code: "const big1: bigint = BigInt(100);\nconst big2: bigint = 100n;\n\nconsole.log(big1 === big2); // true\nconsole.log(big1 + big2);   // 200n",
            },
            {
              label:
                "Practical example — preserve an integer beyond number precision",
              language: "typescript",
              code: 'const id: bigint = BigInt("9007199254740993");\nconst nextId: bigint = id + 1n;\n\nconsole.log(nextId.toString()); // "9007199254740994"\nconsole.log(7n / 2n);           // 3n (integer division)\nconsole.log(JSON.stringify({ id: nextId.toString() }));\n// {"id":"9007199254740994"}',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#bigint",
        },
        {
          name: "Arrays",
          explanation:
            "Describes an ordered collection whose elements share a type. Use T[] or Array<T> when the number of items can vary.",
          note: "number[] and Array<number> are equivalent annotations. Arrays are mutable by default; push() changes the original array, while map() returns a new one. Ordinary indexing can produce undefined out of bounds; noUncheckedIndexedAccess makes that possibility visible in the indexed type.",
          examples: [
            {
              label: "Quick reference — use both array annotation forms",
              language: "typescript",
              code: 'let numbers: number[] = [1, 2, 3];\nlet names: Array<string> = ["Alice", "Bob"];\n\nconsole.log(numbers.length); // 3\nconsole.log(names.join(", ")); // "Alice, Bob"',
            },
            {
              label: "Practical example — mutate one array and derive another",
              language: "typescript",
              code: "const numbers: number[] = [1, 2, 3];\nnumbers.push(4);\nconst doubled: number[] = numbers.map((value) => value * 2);\n\nconsole.log(numbers); // [1, 2, 3, 4]\nconsole.log(doubled); // [2, 4, 6, 8]",
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays",
        },
        {
          name: "Tuples",
          explanation:
            "Describes an array with known types at particular positions and a known length unless optional or rest elements are specified. Use a tuple for a small ordered record, such as a label paired with a count.",
          note: "Tuples are ordinary arrays at runtime. A mutable tuple can still be extended through methods such as push(), so its annotation is not runtime length enforcement; use readonly when mutation should be rejected by the type checker.",
          examples: [
            {
              label: "Quick reference — annotate a two-position tuple",
              language: "typescript",
              code: 'let tuple: [string, number] = ["hello", 10];\nconst [label, count] = tuple;\n\nconsole.log(label); // "hello"\nconsole.log(count); // 10',
            },
            {
              label: "Practical example — return a typed pair from a function",
              language: "typescript",
              code: 'function wordCount(text: string): [string, number] {\n  return [text, text.length];\n}\n\nconst [word, count] = wordCount("hello");\nconsole.log(word);   // "hello"\nconsole.log(count); // 5',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types",
        },
        {
          name: "Enums",
          explanation:
            "Defines named constants that can also be used as a type. Use an enum when code benefits from a shared runtime group of named values.",
          note: "A regular enum generates JavaScript; it is not just a type annotation. Numeric members start at 0 and auto-increment unless initialized, and numeric enums have reverse mappings. String enums need explicit values and have no reverse mapping. Enums are not supported by TypeScript modes that only erase type syntax, such as erasableSyntaxOnly.",
          examples: [
            {
              label: "Quick reference — use an auto-numbered enum",
              language: "typescript",
              code: 'enum Color { Red, Green, Blue }\nlet color: Color = Color.Green;\n\nconsole.log(color);        // 1\nconsole.log(Color[color]); // "Green"',
            },
            {
              label:
                "Practical example — give enum members readable string values",
              language: "typescript",
              code: 'enum Color {\n  Red = "red",\n  Green = "green",\n  Blue = "blue"\n}\n\nfunction paint(color: Color): string {\n  return `Paint: ${color}`;\n}\n\nconsole.log(paint(Color.Green)); // "Paint: green"',
            },
          ],
          source: "https://www.typescriptlang.org/docs/handbook/enums.html",
        },
        {
          name: "null and undefined",
          explanation:
            "Represent two distinct missing-value states: null is commonly an intentional absence, while undefined commonly means no value was supplied. Use explicit annotations or unions when absence is part of the data model.",
          note: "With strictNullChecks enabled (included in strict), null and undefined are separate types and cannot be assigned to string or number without allowing them explicitly. The ?? operator supplies a fallback only for null or undefined, preserving values such as an empty string.",
          examples: [
            {
              label: "Quick reference — annotate the two missing values",
              language: "typescript",
              code: "let u: undefined = undefined;\nlet n: null = null;\nconsole.log(u, n); // undefined, null",
            },
            {
              label: "Practical example — handle an absent value explicitly",
              language: "typescript",
              code: 'function displayName(name: string | null | undefined): string {\n  return name ?? "Guest";\n}\n\nconsole.log(displayName(null));      // "Guest"\nconsole.log(displayName(undefined)); // "Guest"\nconsole.log(displayName(""));        // ""',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
        },
        {
          name: "void",
          explanation:
            "Describes a function whose return value is not intended to be used. Use it for logging, notifications, and other operations performed for their side effects.",
          note: "A function with no return statement evaluates to undefined in JavaScript. A callback typed as () => void may still return a value, but the caller must ignore that value; void does not mean that an operation has no side effects.",
          examples: [
            {
              label:
                "Quick reference — log a message without returning a result",
              language: "typescript",
              code: 'function log(message: string): void {\n  console.log(message);\n}\n\nlog("Saved"); // Prints "Saved"; no useful return value.',
            },
            {
              label:
                "Practical example — mutate an array through a void function",
              language: "typescript",
              code: 'const messages: string[] = [];\n\nfunction remember(message: string): void {\n  messages.push(message);\n}\n\nremember("Started");\nconsole.log(messages); // ["Started"]',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/functions.html#void",
        },
        {
          name: "never",
          explanation:
            "Describes a value that cannot occur, including the result of a function that never returns normally. Use it for functions that always throw or for reasoning about unreachable code.",
          note: "Unlike void, never promises that control does not return normally: the function must throw or run forever. Throwing still has runtime effects and can be caught by the caller; the examples catch their deliberate errors.",
          examples: [
            {
              label: "Quick reference — declare a function that always throws",
              language: "typescript",
              code: 'function error(message: string): never {\n  throw new Error(message);\n}\n\ntry {\n  error("Unable to continue");\n} catch (cause) {\n  console.log(cause instanceof Error); // true\n}',
            },
            {
              label: "Practical example — stop a missing-value branch",
              language: "typescript",
              code: 'function fail(message: string): never {\n  throw new Error(message);\n}\n\nfunction requireName(name: string | null): string {\n  if (name === null) {\n    return fail("Name is required"); // This branch never returns a value.\n  }\n  return name;\n}\n\nconsole.log(requireName("Ada")); // "Ada"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/functions.html#never",
        },
        {
          name: "object and object annotations",
          explanation:
            "The object type accepts non-primitive values without describing their fields. Use an object annotation with named properties when code needs to read or update those fields safely.",
          note: "object is not the same as Object or {}. Arrays and functions also satisfy object, but object alone does not expose a name property; a shape such as { name: string; age: number } does. These annotations do not validate external data at runtime.",
          examples: [
            {
              label: "Quick reference — distinguish object from a named shape",
              language: "typescript",
              code: 'let obj: object = { name: "John" };\nlet person: { name: string; age: number } = {\n  name: "John",\n  age: 30\n};\n\nconsole.log(Object.keys(obj)); // ["name"]\nconsole.log(person.name);      // "John"',
            },
            {
              label: "Practical example — accept and update a typed object",
              language: "typescript",
              code: 'function birthday(person: { name: string; age: number }): string {\n  person.age += 1; // Mutates the caller’s object.\n  return `${person.name} is ${person.age}`;\n}\n\nconst person = { name: "John", age: 30 };\nconsole.log(birthday(person)); // "John is 31"\nconsole.log(person.age);       // 31',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/functions.html#object",
        },
        {
          name: "unknown",
          explanation:
            "Accepts any value while requiring you to check its type before using type-specific operations. Use it for values whose shape is not yet trusted, rather than disabling checking with any.",
          note: "Assignment to unknown is unrestricted, but property access and calls require narrowing or an assertion. Narrowing with typeof performs a real runtime check; a type assertion does not.",
          examples: [
            {
              label: "Quick reference — hold values of different types",
              language: "typescript",
              code: 'let value: unknown = 4;\nvalue = "maybe a string";\nvalue = false;\n\nconsole.log(value); // false',
            },
            {
              label: "Practical example — narrow before using a string method",
              language: "typescript",
              code: 'function formatValue(value: unknown): string {\n  if (typeof value === "string") {\n    return value.toUpperCase();\n  }\n  return "Not a string";\n}\n\nconsole.log(formatValue("hello")); // "HELLO"\nconsole.log(formatValue(4));       // "Not a string"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown",
        },
        {
          name: "Type assertions",
          explanation:
            "Tell the compiler to treat an expression as a specified type when you have information it cannot infer. Use an assertion only when that information is already guaranteed elsewhere.",
          note: "Assertions are erased during compilation: they neither convert nor validate the value and can cause runtime failures when incorrect. Prefer runtime narrowing for untrusted data. Angle-bracket assertions work in .ts files but not .tsx; the as syntax works in both.",
          examples: [
            {
              label: "Quick reference — assert a string with as",
              language: "typescript",
              code: 'let someValue: unknown = "this is a string";\nlet strLength: number = (someValue as string).length;\n\nconsole.log(strLength); // 16',
            },
            {
              label:
                "Alternative syntax — use an angle-bracket assertion in a .ts file",
              language: "typescript",
              code: 'let someValue: unknown = "this is a string";\nlet strLength2: number = (<string>someValue).length;\n\nconsole.log(strLength2); // 16\n// In .tsx, use (someValue as string).length instead.',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions",
        },
        {
          name: "Const assertions",
          explanation:
            "Use as const to preserve literal types and infer readonly object properties or tuples. It is useful when fixed values should remain precise instead of widening to string or number.",
          note: "Available since TypeScript 3.4. This affects compile-time types, not runtime freezing; referenced mutable objects can still change. A let variable asserted as a literal can only be reassigned that same literal, and readonly tuples cannot be changed through that typed reference.",
          examples: [
            {
              label: "Quick reference — retain a string literal type",
              language: "typescript",
              code: 'let x = "hello" as const; // Type: "hello", not string.\n\nfunction greet(message: "hello"): void {\n  console.log(message);\n}\n\ngreet(x); // "hello"',
            },
            {
              label: "Practical example — preserve a readonly coordinate tuple",
              language: "typescript",
              code: 'const y = [10, 20] as const; // Type: readonly [10, 20].\n\nfunction describePoint(point: readonly [number, number]): string {\n  return `${point[0]}, ${point[1]}`;\n}\n\nconsole.log(describePoint(y)); // "10, 20"\n// y[0] = 30 would be a compile-time error; as const is not Object.freeze().',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions",
        },
        {
          name: "Numeric enums",
          explanation:
            "Define named numeric constants, starting at zero and auto-incrementing when no values are supplied. Use explicit initializers when the numbers form part of a persisted format or protocol.",
          note: "Regular numeric enums emit a runtime object with both name-to-value and value-to-name mappings. Reordering automatically numbered members changes their values; Object.keys() also includes reverse-mapping keys, so it is not a clean list of member names.",
          examples: [
            {
              label: "Quick reference — automatic numbering and reverse lookup",
              language: "typescript",
              code: 'enum Direction {\n  Up,    // 0\n  Down,  // 1\n  Left,  // 2\n  Right  // 3\n}\n\nconst dir: Direction = Direction.Up;\nconsole.log(dir);          // 0\nconsole.log(Direction[0]); // "Up"',
            },
            {
              label: "Practical example — choose a stable starting value",
              language: "typescript",
              code: "enum Direction {\n  Up = 1,\n  Down,  // 2\n  Left,  // 3\n  Right  // 4\n}\n\nconsole.log(Direction.Up);    // 1\nconsole.log(Direction.Right); // 4",
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/enums.html#numeric-enums",
        },
        {
          name: "String enums",
          explanation:
            "Associate enum members with explicit string values. Use them when logged, stored, or transmitted values should remain readable and independent of declaration order.",
          note: "String members need string constant initializers or references to other string enum members; they do not auto-increment or generate reverse mappings. Status is the runtime object and a type, while Status.Active is the member used as a value.",
          examples: [
            {
              label: "Quick reference — declare readable status values",
              language: "typescript",
              code: 'enum Status {\n  Active = "ACTIVE",\n  Inactive = "INACTIVE",\n  Pending = "PENDING"\n}\n\nconst s: Status = Status.Active;\nconsole.log(s); // "ACTIVE"',
            },
            {
              label:
                "Practical example — include an enum value in serialized data",
              language: "typescript",
              code: 'enum Status {\n  Active = "ACTIVE",\n  Inactive = "INACTIVE",\n  Pending = "PENDING"\n}\n\nconst response: { status: Status } = { status: Status.Pending };\nconsole.log(JSON.stringify(response)); // {"status":"PENDING"}\nconsole.log(Status.Inactive);          // "INACTIVE"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/enums.html#string-enums",
        },
        {
          name: "const enum",
          explanation:
            "Allows tsc to inline enum member values and omit the enum object under its normal whole-program emit settings. Use it for internal constants only when the build toolchain supports that compilation behavior.",
          note: "The examples assume isolatedModules: false and preserveConstEnums: false. preserveConstEnums: true retains an enum object; isolated-module and other single-file transforms may preserve local const enums instead of inlining them, and ambient const enum references are incompatible with isolatedModules. Avoid publishing ambient const enums to consumers with different builds or versions. Enums are rejected by erasableSyntaxOnly.",
          examples: [
            {
              label:
                "Quick reference — inline a string constant with normal tsc emit",
              language: "typescript",
              code: 'const enum HttpMethod {\n  GET = "GET",\n  POST = "POST",\n  PUT = "PUT",\n  DELETE = "DELETE"\n}\n\nconst method = HttpMethod.GET;\nconsole.log(method); // "GET"\n// Normal tsc output: const method = "GET" /* HttpMethod.GET */;\n// With the settings above, no HttpMethod object is emitted.',
            },
            {
              label:
                "Practical example — use an inlined value in request options",
              language: "typescript",
              code: 'const enum HttpMethod {\n  GET = "GET",\n  POST = "POST",\n  PUT = "PUT",\n  DELETE = "DELETE"\n}\n\nconst request: { method: HttpMethod; url: string } = {\n  method: HttpMethod.POST,\n  url: "/api/items"\n};\nconsole.log(request.method); // "POST"\n// This constructs options only; it does not send a request.',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/enums.html#const-enums",
        },
        {
          name: "Enum as a type",
          explanation:
            "Use an enum name as a parameter or property type to describe the allowed members. This makes a function’s intended inputs explicit and lets the compiler check its calls.",
          note: "The annotation is erased and does not validate external runtime values. The exhaustive switch below covers the declared Direction members; validate untrusted inputs separately before passing them to the function.",
          examples: [
            {
              label:
                "Quick reference — map direction members to coordinate changes",
              language: "typescript",
              code: "enum Direction {\n  Up,    // 0\n  Down,  // 1\n  Left,  // 2\n  Right  // 3\n}\n\nfunction move(direction: Direction): { x: number; y: number } {\n  switch (direction) {\n    case Direction.Up: return { x: 0, y: -1 };\n    case Direction.Down: return { x: 0, y: 1 };\n    case Direction.Left: return { x: -1, y: 0 };\n    case Direction.Right: return { x: 1, y: 0 };\n  }\n}\n\nconsole.log(move(Direction.Up));    // { x: 0, y: -1 }\nconsole.log(move(Direction.Right)); // { x: 1, y: 0 }",
            },
            {
              label:
                "Practical example — constrain a status property and parameter",
              language: "typescript",
              code: 'enum Status {\n  Active = "ACTIVE",\n  Inactive = "INACTIVE",\n  Pending = "PENDING"\n}\n\nconst task: { status: Status } = { status: Status.Pending };\n\nfunction updateStatus(status: Status): void {\n  task.status = status;\n}\n\nupdateStatus(Status.Active);\nconsole.log(task.status); // "ACTIVE"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/enums.html#union-enums-and-enum-member-types",
        },
        {
          name: "Enum keys as a type",
          explanation:
            'Use keyof typeof EnumName to form a union of the enum’s member names. Use this when code accepts names such as "Up" and then looks up their values in the runtime enum.',
          note: 'typeof refers to the enum object’s type, and keyof selects its named members. For this numeric enum the result is "Up" | "Down" | "Left" | "Right", not the numeric values or runtime reverse-mapping keys. This differs from calling JavaScript Object.keys().',
          examples: [
            {
              label: "Quick reference — derive a union of member names",
              language: "typescript",
              code: 'enum Direction {\n  Up,    // 0\n  Down,  // 1\n  Left,  // 2\n  Right  // 3\n}\n\ntype DirectionKey = keyof typeof Direction;\n// "Up" | "Down" | "Left" | "Right"\n\nconst key: DirectionKey = "Left";\nconsole.log(Direction[key]); // 2',
            },
            {
              label: "Practical example — resolve a checked enum name",
              language: "typescript",
              code: 'enum Direction {\n  Up,    // 0\n  Down,  // 1\n  Left,  // 2\n  Right  // 3\n}\n\ntype DirectionKey = keyof typeof Direction;\n\nfunction directionFromKey(key: DirectionKey): Direction {\n  return Direction[key];\n}\n\nconsole.log(directionFromKey("Right")); // 3\nconsole.log(directionFromKey("Down"));  // 1',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/enums.html#enums-at-compile-time",
        },
        {
          name: "Alternative: const object",
          explanation:
            "Use an ordinary object with as const to keep named values at runtime while deriving a literal union for type checking. Choose this pattern when plain JavaScript output and compatibility with type-stripping tools are useful.",
          note: 'The value union is typeof STATUS[keyof typeof STATUS]: "ACTIVE" | "INACTIVE". Unlike a string enum, the matching raw string is assignable to this union. as const adds compile-time readonly properties but does not freeze the runtime object or create reverse mappings.',
          examples: [
            {
              label: "Quick reference — derive a union from object values",
              language: "typescript",
              code: 'const STATUS = {\n  Active: "ACTIVE",\n  Inactive: "INACTIVE"\n} as const;\n\ntype StatusValue = typeof STATUS[keyof typeof STATUS];\n// "ACTIVE" | "INACTIVE"\n\nconst current: StatusValue = STATUS.Active;\nconsole.log(current); // "ACTIVE"',
            },
            {
              label:
                "Practical example — accept named values or matching literals",
              language: "typescript",
              code: 'const STATUS = {\n  Active: "ACTIVE",\n  Inactive: "INACTIVE"\n} as const;\n\ntype StatusValue = typeof STATUS[keyof typeof STATUS];\n\nfunction describeStatus(value: StatusValue): string {\n  return `Status: ${value}`;\n}\n\nconsole.log(describeStatus(STATUS.Active)); // "Status: ACTIVE"\nconsole.log(describeStatus("INACTIVE"));    // "Status: INACTIVE"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/enums.html#objects-vs-enums",
        },
        {
          name: "Tuples",
          explanation:
            "Describe ordered arrays with known types at each position. Use a fixed-size tuple for a coordinate or a small multi-value return whose positions have distinct meanings.",
          note: "A fixed tuple has a known length in the type system, but remains an ordinary array at runtime. const prevents reassigning the binding, not changing its elements; mutable tuples even expose methods such as push(), so the annotation is not runtime length enforcement.",
          examples: [
            {
              label:
                "Quick reference — annotate coordinates and a key/value pair",
              language: "typescript",
              code: 'const coord: [number, number] = [10, 20];\nconst entry: [string, number] = ["age", 30];\n\nconsole.log(coord[0], coord[1]); // 10, 20\nconsole.log(entry[0], entry[1]); // "age", 30',
            },
            {
              label: "Practical example — return a typed coordinate",
              language: "typescript",
              code: "function translate(\n  point: [number, number],\n  dx: number,\n  dy: number\n): [number, number] {\n  return [point[0] + dx, point[1] + dy];\n}\n\nconst coord: [number, number] = [10, 20];\nconsole.log(translate(coord, 5, -2)); // [15, 18]\nconsole.log(coord);                 // [10, 20] (unchanged)",
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types",
        },
        {
          name: "Destructuring tuples",
          explanation:
            "Extract tuple positions into local variables while retaining the type of each position. Use destructuring to make tuple-based code easier to read.",
          note: "Destructuring does not turn a tuple into an object with named properties. Primitive elements are copied into the bindings; object elements would still refer to the same objects.",
          examples: [
            {
              label: "Quick reference — infer the types of extracted positions",
              language: "typescript",
              code: 'const entry: [string, number] = ["age", 30];\nconst [key, value] = entry; // key: string; value: number\n\nconsole.log(key.toUpperCase()); // "AGE"\nconsole.log(value + 1);         // 31',
            },
            {
              label: "Practical example — destructure a function parameter",
              language: "typescript",
              code: 'function describeEntry([key, value]: [string, number]): string {\n  return `${key}: ${value}`;\n}\n\nconsole.log(describeEntry(["age", 30])); // "age: 30"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types",
        },
        {
          name: "Optional tuple elements",
          explanation:
            "Mark a tuple position with ? when callers may omit it. Use an optional trailing element when a pair sometimes needs only its first value.",
          note: "Reading an omitted position yields undefined, so handle it under strict null checking. Required positions cannot follow optional ones; the tuple length reflects the allowed alternatives (1 | 2 here).",
          examples: [
            {
              label: "Quick reference — allow an optional second position",
              language: "typescript",
              code: 'type FlexTuple = [string, number?];\nconst a: FlexTuple = ["hello"];\nconst b: FlexTuple = ["hello", 42];\n\nconsole.log(a.length, b.length); // 1, 2\nconsole.log(a[1]);              // undefined',
            },
            {
              label:
                "Practical example — provide a fallback for the missing value",
              language: "typescript",
              code: 'type FlexTuple = [string, number?];\n\nfunction describe([label, count]: FlexTuple): string {\n  return `${label}: ${count ?? 0}`;\n}\n\nconsole.log(describe(["hello"]));     // "hello: 0"\nconsole.log(describe(["hello", 42])); // "hello: 42"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-tuple-elements",
        },
        {
          name: "Rest tuple elements",
          explanation:
            "Use a rest element to allow a variable number of values of a particular type. Use it for a fixed prefix followed by a collection, such as a label followed by scores.",
          note: "Unlike a fixed tuple, a rest tuple can have many lengths: [string, ...number[]] accepts a label with zero or more scores. Destructuring the rest produces a new array, and its arbitrary indices may be undefined with noUncheckedIndexedAccess.",
          examples: [
            {
              label:
                "Quick reference — combine a required label with numeric values",
              language: "typescript",
              code: 'type StringAndNums = [string, ...number[]];\nconst data: StringAndNums = ["scores", 90, 85, 92];\nconst [label, ...scores] = data;\n\nconsole.log(label);  // "scores"\nconsole.log(scores); // [90, 85, 92]',
            },
            {
              label: "Practical example — summarize a variable-length tuple",
              language: "typescript",
              code: 'type StringAndNums = [string, ...number[]];\n\nfunction total([label, ...scores]: StringAndNums): string {\n  const sum = scores.reduce((result, score) => result + score, 0);\n  return `${label}: ${sum}`;\n}\n\nconsole.log(total(["scores", 90, 85, 92])); // "scores: 267"\nconsole.log(total(["scores"]));           // "scores: 0"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/objects.html#rest-elements-in-tuple-types",
        },
        {
          name: "Named tuples",
          explanation:
            "Add labels to tuple positions to document what each value represents. Use labels to improve editor hints for parameters and return values without changing their positional structure.",
          note: "Labeled tuple elements were introduced in TypeScript 4.0. Labels have no runtime effect and do not create properties such as range.start. The examples use NumberRange instead of Range to avoid a collision with the browser DOM Range type.",
          examples: [
            {
              label: "Quick reference — document the start and end positions",
              language: "typescript",
              code: "type NumberRange = [start: number, end: number];\nconst r: NumberRange = [0, 100];\n\nconsole.log(r[0], r[1]); // 0, 100",
            },
            {
              label: "Practical example — keep labels in a return type",
              language: "typescript",
              code: "type NumberRange = [start: number, end: number];\n\nfunction makeRange(start: number, width: number): NumberRange {\n  return [start, start + width];\n}\n\nconst [start, end] = makeRange(10, 25);\nconsole.log(start, end); // 10, 35",
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#labeled-tuple-elements",
        },
        {
          name: "Readonly tuples",
          explanation:
            "Prevent writes and mutating array methods through a tuple reference while preserving its positional types. Use readonly tuple parameters when a function only needs to read its input.",
          note: "The readonly tuple syntax requires TypeScript 3.4+. It does not freeze the underlying array or make referenced objects immutable. A mutable tuple can be passed to a readonly parameter, but a readonly tuple cannot be passed where mutation is required.",
          examples: [
            {
              label: "Quick reference — declare a read-only coordinate",
              language: "typescript",
              code: "const point: readonly [number, number] = [10, 20];\n\nconsole.log(point[0], point[1]); // 10, 20\n// point[0] = 5; // Compile-time error: readonly position.",
            },
            {
              label:
                "Practical example — accept either mutable or readonly input",
              language: "typescript",
              code: "function sumPoint(point: readonly [number, number]): number {\n  return point[0] + point[1];\n}\n\nconst mutable: [number, number] = [10, 20];\nconst fixed: readonly [number, number] = [3, 4];\nconsole.log(sumPoint(mutable)); // 30\nconsole.log(sumPoint(fixed));   // 7",
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-tuple-types",
        },
        {
          name: "Readonly arrays",
          explanation:
            "Expose an array without element assignment or mutating methods such as push(), pop(), or splice(). Use readonly T[] or ReadonlyArray<T> for collections that consumers should only read.",
          note: "The two annotation forms are equivalent. readonly controls access through this reference; it does not freeze the array or its elements. A let binding may be reassigned to another array, while a const binding cannot; a spread can create a separate mutable copy.",
          examples: [
            {
              label:
                "Quick reference — use both readonly array annotation forms",
              language: "typescript",
              code: 'const names: readonly string[] = ["Alice", "Bob"];\nconst sameNames: ReadonlyArray<string> = names;\n\nconsole.log(sameNames.join(", ")); // "Alice, Bob"\n// names.push("Charlie"); // Compile-time error: no push method.',
            },
            {
              label: "Practical example — reassign a binding and modify a copy",
              language: "typescript",
              code: 'let names: readonly string[] = ["Alice", "Bob"];\nnames = ["Carol"]; // Allowed: the let binding is reassigned.\nconst editable: string[] = [...names];\neditable.push("Dan");\n\nconsole.log(names);    // ["Carol"]\nconsole.log(editable); // ["Carol", "Dan"]',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/objects.html#the-readonlyarray-type",
        },
        {
          name: "Readonly object properties",
          explanation:
            "Mark a property readonly to reject assignment through that typed reference after initialization. Use it for identifiers or object members that a consumer should not replace.",
          note: "readonly is shallow: an object stored in a readonly property may still have mutable fields. It is a type-checking restriction, not runtime freezing, and other mutable aliases can still change the underlying data.",
          examples: [
            {
              label:
                "Quick reference — protect an identifier while allowing name updates",
              language: "typescript",
              code: 'interface User {\n  readonly id: string;\n  name: string;\n}\n\nconst user: User = { id: "1", name: "Alice" };\n// user.id = "2"; // Compile-time error: readonly property.\nuser.name = "Bob";\nconsole.log(user.id, user.name); // "1", "Bob"',
            },
            {
              label:
                "Practical example — distinguish a readonly reference from its contents",
              language: "typescript",
              code: 'interface User {\n  readonly settings: { theme: string };\n}\n\nconst user: User = { settings: { theme: "light" } };\nuser.settings.theme = "dark"; // Allowed: theme is not readonly.\n// user.settings = { theme: "light" }; // Error: cannot replace settings.\nconsole.log(user.settings.theme); // "dark"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/objects.html#readonly-properties",
        },
        {
          name: "as const",
          explanation:
            "Preserve literal values and infer readonly properties and tuples within a literal expression. Use it for configuration objects and fixed collections whose exact values should remain available to the type system.",
          note: "Available since TypeScript 3.4. Nested literals receive readonly types, but existing mutable objects referenced inside the expression keep their original mutability. as const does not recursively freeze runtime data, and a const binding by itself does not create these readonly types.",
          examples: [
            {
              label:
                "Quick reference — infer precise readonly configuration types",
              language: "typescript",
              code: 'const config = {\n  api: "https://api.example.com",\n  retries: 3,\n  methods: ["GET", "POST"]\n} as const;\n// api: "https://api.example.com"; retries: 3;\n// methods: readonly ["GET", "POST"]; all properties are readonly.\n\nconsole.log(config.retries); // 3\nconsole.log(config.methods); // ["GET", "POST"]',
            },
            {
              label:
                "Practical example — see the limit with a referenced mutable array",
              language: "typescript",
              code: 'const methods: string[] = ["GET"];\nconst config = { methods } as const;\n\nmethods.push("POST");\nconfig.methods.push("PUT"); // Allowed: this is the original mutable array.\n// config.methods = []; // Compile-time error: readonly property.\nconsole.log(config.methods); // ["GET", "POST", "PUT"]',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions",
        },
      ],
      methodCategories: [
        {
          id: "primitive-types",
          name: "Primitive Types",
        },
        {
          id: "primitive-types",
          name: "Primitive Types",
        },
        {
          id: "primitive-types",
          name: "Primitive Types",
        },
        {
          id: "primitive-types",
          name: "Primitive Types",
        },
        {
          id: "primitive-types",
          name: "Primitive Types",
        },
        {
          id: "primitive-types",
          name: "Primitive Types",
        },
        {
          id: "primitive-types",
          name: "Primitive Types",
        },
        {
          id: "primitive-types",
          name: "Primitive Types",
        },
        {
          id: "primitive-types",
          name: "Primitive Types",
        },
        {
          id: "primitive-types",
          name: "Primitive Types",
        },
        {
          id: "primitive-types",
          name: "Primitive Types",
        },
        {
          id: "primitive-types",
          name: "Primitive Types",
        },
        {
          id: "primitive-types",
          name: "Primitive Types",
        },
        {
          id: "primitive-types",
          name: "Primitive Types",
        },
        {
          id: "primitive-types",
          name: "Primitive Types",
        },
        {
          id: "primitive-types",
          name: "Primitive Types",
        },
        {
          id: "enums",
          name: "Enums",
        },
        {
          id: "enums",
          name: "Enums",
        },
        {
          id: "enums",
          name: "Enums",
        },
        {
          id: "enums",
          name: "Enums",
        },
        {
          id: "enums",
          name: "Enums",
        },
        {
          id: "enums",
          name: "Enums",
        },
        {
          id: "tuples-readonly",
          name: "Tuples & Readonly",
        },
        {
          id: "tuples-readonly",
          name: "Tuples & Readonly",
        },
        {
          id: "tuples-readonly",
          name: "Tuples & Readonly",
        },
        {
          id: "tuples-readonly",
          name: "Tuples & Readonly",
        },
        {
          id: "tuples-readonly",
          name: "Tuples & Readonly",
        },
        {
          id: "tuples-readonly",
          name: "Tuples & Readonly",
        },
        {
          id: "tuples-readonly",
          name: "Tuples & Readonly",
        },
        {
          id: "tuples-readonly",
          name: "Tuples & Readonly",
        },
        {
          id: "tuples-readonly",
          name: "Tuples & Readonly",
        },
      ],
    },
    {
      name: "Function",
      id: "function",
      intro: [
        "Type annotations for functions and their parameters, following the quick reference and detailed topics in your images. Run snippets independently in .ts files. Examples are checked with TypeScript 5.9.3, strict checking, target ES2020, and ES2020/DOM libraries. The runtime must support promises and generators; the async examples use local data rather than fetching from a server.",
        "Define multiple function signatures for different parameter types or argument forms. Topics follow the quick reference and detailed image in order; each set of overloads has one implementation. Run snippets independently in .ts files. Examples are checked with TypeScript 5.9.3, strict checking, target ES2020, and ES2020/DOM libraries.",
      ],
      methods: [
        {
          name: "Function declarations",
          explanation:
            "Annotate each parameter and the returned value to describe a named function’s contract. Use a declaration for reusable operations whose inputs and outputs should be explicit.",
          note: "Parameter annotations follow the parameter names; the return annotation follows the closing parenthesis. Return types can often be inferred, but an explicit annotation checks that the implementation meets the intended contract. Types do not validate runtime callers.",
          examples: [
            {
              label: "Quick reference — annotate an addition function",
              language: "typescript",
              code: "function add(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(add(2, 3)); // 5",
            },
            {
              label: "Practical example — check a reusable formatting contract",
              language: "typescript",
              code: 'function formatPrice(amount: number, currency: string): string {\n  return `${currency} ${amount.toFixed(2)}`;\n}\n\nconsole.log(formatPrice(12.5, "USD")); // "USD 12.50"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#functions",
        },
        {
          name: "Arrow functions",
          explanation:
            "Write a function expression with parameter annotations before => and an optional return annotation. Use arrows for short operations and callbacks, especially when they should retain the surrounding this binding.",
          note: "An expression body returns its expression; a block body needs an explicit return for a result. Arrow functions capture this lexically and cannot declare their own this parameter; they do not behave like receiver-bound object methods.",
          examples: [
            {
              label: "Quick reference — annotate a compact arrow function",
              language: "typescript",
              code: "const multiply = (a: number, b: number): number => a * b;\n\nconsole.log(multiply(3, 4)); // 12",
            },
            {
              label:
                "Practical example — return values from a block-bodied callback",
              language: "typescript",
              code: "const prices: number[] = [10, 20];\nconst withTax: number[] = prices.map((price: number): number => {\n  return price * 1.1;\n});\n\nconsole.log(withTax); // [11, 22]",
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#anonymous-functions",
        },
        {
          name: "Function type aliases",
          explanation:
            "Describe a callable value with a reusable type such as (a: number, b: number) => number. Use a function type to keep compatible implementations and function-taking APIs consistent.",
          note: "The => in a function type describes its return type; it does not create a function. Parameter types in an assigned implementation can be inferred from that context, and parameter names in the type are documentation rather than matching requirements.",
          examples: [
            {
              label: "Quick reference — assign a compatible implementation",
              language: "typescript",
              code: "type MathFn = (a: number, b: number) => number;\nconst subtract: MathFn = (a, b) => a - b;\n\nconsole.log(subtract(9, 4)); // 5",
            },
            {
              label: "Practical example — accept a reusable operation type",
              language: "typescript",
              code: "type MathFn = (a: number, b: number) => number;\n\nfunction calculate(a: number, b: number, operation: MathFn): number {\n  return operation(a, b);\n}\n\nconst multiply: MathFn = (a, b) => a * b;\nconsole.log(calculate(6, 7, multiply)); // 42",
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/functions.html#function-type-expressions",
        },
        {
          name: "Optional parameters",
          explanation:
            "Mark a parameter with ? to allow callers to omit it. Use an optional parameter when the implementation has a meaningful way to handle its absence.",
          note: "Under strict null checking, title?: string is read as string | undefined, and callers may also pass undefined explicitly. Optional parameters normally follow required ones. The quick reference uses truthiness, so an empty title also selects the fallback.",
          examples: [
            {
              label: "Quick reference — accept an optional title",
              language: "typescript",
              code: 'function greet(name: string, title?: string): string {\n  return title ? `${title} ${name}` : `Hello ${name}`;\n}\n\nconsole.log(greet("Ada"));        // "Hello Ada"\nconsole.log(greet("Ada", "Dr.")); // "Dr. Ada"',
            },
            {
              label:
                "Practical example — distinguish an absent value from an empty string",
              language: "typescript",
              code: 'function label(name: string, prefix?: string): string {\n  if (prefix === undefined) return `Hello ${name}`;\n  return `${prefix}${name}`;\n}\n\nconsole.log(label("Ada", undefined)); // "Hello Ada"\nconsole.log(label("Ada", ""));        // "Ada"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-parameters",
        },
        {
          name: "Default parameters",
          explanation:
            "Provide an initializer to supply a value when an argument is omitted or undefined. Use defaults when most callers should not need to specify the common case.",
          note: "The initializer runs when needed on each call; null and other explicit values do not trigger it. Inside the function, level is a string. With strict checking, the annotated string parameter rejects null even though JavaScript callers could still supply it.",
          examples: [
            {
              label: "Quick reference — default a logging level",
              language: "typescript",
              code: 'function log(message: string, level: string = "info"): void {\n  console.log(`[${level}] ${message}`);\n}\n\nlog("Saved");         // "[info] Saved"\nlog("Retry", "warn"); // "[warn] Retry"',
            },
            {
              label: "Practical example — trigger a default with undefined",
              language: "typescript",
              code: 'function log(message: string, level: string = "info"): void {\n  console.log(`[${level}] ${message}`);\n}\n\nlog("Saved", undefined); // "[info] Saved"\nlog("Saved", "");        // "[] Saved"; an empty string is not undefined.',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/functions.html#optional-parameters",
        },
        {
          name: "Rest parameters",
          explanation:
            "Collect a variable number of arguments into a typed array using ... in the last parameter position. Use rest parameters for operations such as summing numbers or formatting many values.",
          note: "A number[] annotation describes each collected argument, not one array argument. Rest parameters create a new array, can receive zero arguments, and must be last. The initial value in reduce() makes the empty sum return 0.",
          examples: [
            {
              label: "Quick reference — sum zero or more numbers",
              language: "typescript",
              code: "function sum(...numbers: number[]): number {\n  return numbers.reduce((a, b) => a + b, 0);\n}\n\nconsole.log(sum(1, 2, 3)); // 6\nconsole.log(sum());        // 0",
            },
            {
              label:
                "Practical example — spread an existing array into a rest parameter",
              language: "typescript",
              code: "function sum(...numbers: number[]): number {\n  return numbers.reduce((a, b) => a + b, 0);\n}\n\nconst scores: number[] = [90, 85, 92];\nconsole.log(sum(...scores)); // 267\nconsole.log(scores);         // [90, 85, 92] (unchanged)",
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/functions.html#rest-parameters-and-arguments",
        },
        {
          name: "this parameters",
          explanation:
            "Declare a special first parameter named this to specify the receiver a function expects. Use it for methods or callbacks that depend on the object through which they are called.",
          note: "The this parameter is erased and is not a runtime argument. Calling button.onClick() supplies the receiver; detaching the method loses it unless you bind or call it with the right object. Use a regular function or method, because arrow functions capture this from the surrounding scope.",
          examples: [
            {
              label: "Quick reference — type an object method’s receiver",
              language: "typescript",
              code: 'interface Button {\n  text: string;\n  onClick(this: Button): void;\n}\n\nconst button: Button = {\n  text: "Click me",\n  onClick() {\n    console.log(this.text);\n  }\n};\n\nbutton.onClick(); // "Click me"',
            },
            {
              label:
                "Practical example — preserve the receiver for a detached callback",
              language: "typescript",
              code: 'interface Button {\n  text: string;\n  onClick(this: Button): void;\n}\n\nconst button: Button = {\n  text: "Click me",\n  onClick() {\n    console.log(this.text);\n  }\n};\n\nconst click = button.onClick.bind(button);\nclick(); // "Click me"\n// bind() creates a new function that keeps button as its receiver.',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/functions.html#declaring-this-in-a-function",
        },
        {
          name: "Destructured parameters",
          explanation:
            "Extract named fields directly in a parameter list and annotate the whole object pattern. Use this to make functions that accept an options object concise and readable.",
          note: "Place the object type after the destructuring pattern; writing { x: number } inside the pattern would rename x rather than annotate it. A default object handles an omitted or undefined argument, not null.",
          examples: [
            {
              label: "Quick reference — annotate destructured coordinates",
              language: "typescript",
              code: 'function drawPoint({ x, y }: { x: number; y: number }): void {\n  console.log(`Point at ${x}, ${y}`);\n}\n\ndrawPoint({ x: 10, y: 20 }); // "Point at 10, 20"',
            },
            {
              label: "Practical example — supply a default parameter object",
              language: "typescript",
              code: 'function drawPoint(\n  { x, y }: { x: number; y: number } = { x: 0, y: 0 }\n): void {\n  console.log(`Point at ${x}, ${y}`);\n}\n\ndrawPoint();                 // "Point at 0, 0"\ndrawPoint({ x: 3, y: 4 });   // "Point at 3, 4"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/functions.html#parameter-destructuring",
        },
        {
          name: "Callback types",
          explanation:
            "Describe the parameters and return value of a function supplied to another function. Use callback types to document what data a consumer receives and whether its return value is used.",
          note: "A callback returning void has its return value ignored; it may still produce side effects. These examples invoke callbacks synchronously. A callback is not automatically awaited, so do not assume an async callback’s promise is handled by a void-returning API.",
          examples: [
            {
              label: "Quick reference — accept a callback for a string result",
              language: "typescript",
              code: 'function process(callback: (result: string) => void): void {\n  callback("Done");\n}\n\nprocess((result) => console.log(result)); // "Done"',
            },
            {
              label:
                "Practical example — collect results through a typed callback",
              language: "typescript",
              code: 'function process(callback: (result: string) => void): void {\n  callback("Done");\n}\n\nconst results: string[] = [];\nprocess((result) => {\n  results.push(result);\n});\nconsole.log(results); // ["Done"]',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/functions.html#function-type-expressions",
        },
        {
          name: "Async functions",
          explanation:
            "An async function returns a promise, so annotate its result as Promise<T>. Use async functions for operations whose completion or failure is consumed with await or promise handlers.",
          note: "Returning a string resolves the promise with that string; throwing rejects it. Handle failures with try/catch around await or a rejection handler. These examples use local data and make no network requests; the first .then() handler runs after synchronous code.",
          examples: [
            {
              label: "Quick reference — return and consume a promised string",
              language: "typescript",
              code: 'async function fetchData(): Promise<string> {\n  return "data";\n}\n\nfetchData().then(\n  (data) => console.log(data), // "data"\n  (error: unknown) => console.error(error)\n);',
            },
            {
              label: "Practical example — catch a rejected async result",
              language: "typescript",
              code: 'async function fetchData(available: boolean): Promise<string> {\n  if (!available) throw new Error("Data unavailable");\n  return "data";\n}\n\nasync function run(): Promise<void> {\n  try {\n    const data = await fetchData(false);\n    console.log(data);\n  } catch (error) {\n    console.log(error instanceof Error ? error.message : "Unknown failure");\n  }\n}\n\nvoid run(); // Prints "Data unavailable"; the rejection is handled inside run().',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#functions-which-return-promises",
        },
        {
          name: "Generator functions",
          explanation:
            "Use function* and yield to produce values lazily through a generator iterator. Annotate Generator<TYield, TReturn, TNext> when you want to specify yielded values, the final return value, and values accepted by next().",
          note: "Calling the function creates an iterator without executing its body; next() advances it to a yield or completion. The first next() argument is ignored. Generator<number, void, unknown> yields numbers, returns no useful final value, and accepts unknown inputs; typed generator parameters are supported from TypeScript 3.6.",
          examples: [
            {
              label: "Quick reference — iterate over lazily yielded numbers",
              language: "typescript",
              code: "function* generator(): Generator<number, void, unknown> {\n  yield 1;\n  yield 2;\n  yield 3;\n}\n\nconsole.log([...generator()]); // [1, 2, 3]",
            },
            {
              label:
                "Practical example — distinguish yielded, returned, and input types",
              language: "typescript",
              code: 'function* doubleInput(): Generator<number, string, number> {\n  const input: number = yield 1;\n  yield input * 2;\n  return "Done";\n}\n\nconst iterator = doubleInput();\nconsole.log(iterator.next());   // { value: 1, done: false }\nconsole.log(iterator.next(5));  // { value: 10, done: false }\nconsole.log(iterator.next());   // { value: "Done", done: true }',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-6.html#stricter-generators",
        },
        {
          name: "Function overloading",
          explanation:
            "Declare multiple call signatures before one implementation to relate particular argument types to particular result types. Use overloads when callers need more precise results than one broad union signature provides.",
          note: "Only the overload signatures are callable; the implementation signature must be compatible with them but is hidden from callers. TypeScript selects a matching signature at compile time; there is one runtime function, so its body must distinguish the cases. A string | number argument needs narrowing first when neither individual overload accepts the whole union. Prefer a union parameter when separate overloads add no useful distinction.",
          examples: [
            {
              label: "Quick reference — return a different type for each input",
              language: "typescript",
              code: 'function create(name: string): string;\nfunction create(age: number): number;\nfunction create(value: string | number): string | number {\n  if (typeof value === "string") {\n    return `Name: ${value}`;\n  }\n  return value * 2;\n}\n\nconst nameLabel: string = create("Ada");\nconst doubledAge: number = create(30);\nconsole.log(nameLabel);  // "Name: Ada"\nconsole.log(doubledAge); // 60',
            },
            {
              label:
                "Practical example — narrow a union before choosing an overload",
              language: "typescript",
              code: 'function create(name: string): string;\nfunction create(age: number): number;\nfunction create(value: string | number): string | number {\n  if (typeof value === "string") {\n    return `Name: ${value}`;\n  }\n  return value * 2;\n}\n\nfunction describe(value: string | number): string {\n  if (typeof value === "string") {\n    return create(value).toUpperCase();\n  }\n  return create(value).toFixed(0);\n}\n\nconsole.log(describe("Ada")); // "NAME: ADA"\nconsole.log(describe(30));    // "60"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads",
        },
        {
          name: "Method overloading in a class",
          explanation:
            "Give a class method multiple call signatures while keeping one method body. Use it when an operation supports distinct, related argument combinations, such as numeric addition or string concatenation.",
          note: "The image’s any-based implementation accepts unchecked operations internally, even though overloads reject mixed string/number calls for typed callers. The second example narrows union parameters and rejects mixed values at runtime; overload declarations alone do not generate that validation.",
          examples: [
            {
              label:
                "Quick reference — expose numeric and string method signatures",
              language: "typescript",
              code: 'class Calculator {\n  add(a: number, b: number): number;\n  add(a: string, b: string): string;\n  add(a: any, b: any): any {\n    return a + b;\n  }\n}\n\nconst calculator = new Calculator();\nconsole.log(calculator.add(2, 3));       // 5\nconsole.log(calculator.add("Type", "Script")); // "TypeScript"',
            },
            {
              label:
                "Practical example — check the implementation’s input combinations",
              language: "typescript",
              code: 'class Calculator {\n  add(a: number, b: number): number;\n  add(a: string, b: string): string;\n  add(a: string | number, b: string | number): string | number {\n    if (typeof a === "number" && typeof b === "number") return a + b;\n    if (typeof a === "string" && typeof b === "string") return a + b;\n    throw new TypeError("Both arguments must have the same supported type");\n  }\n}\n\nconst calculator = new Calculator();\nconsole.log(calculator.add(8, 4).toFixed(1)); // "12.0"\nconsole.log(calculator.add("a", "b").toUpperCase()); // "AB"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads",
        },
        {
          name: "Complex overloading",
          explanation:
            "Support different argument shapes or counts, such as a coordinate object or two numeric coordinates. Use overloads to make both forms convenient without allowing incomplete numeric calls.",
          note: "move(10) is rejected because the optional implementation parameter is not a public overload. In the quick reference, y! only suppresses the undefined check; it adds no runtime validation, and the object branch returns the original object. The second example checks the numeric branch and returns a copy for object input.",
          examples: [
            {
              label:
                "Quick reference — accept either coordinates or a coordinate object",
              language: "typescript",
              code: 'interface Coordinate {\n  x: number;\n  y: number;\n}\n\nfunction move(x: number, y: number): Coordinate;\nfunction move(coordinate: Coordinate): Coordinate;\nfunction move(xOrCoord: number | Coordinate, y?: number): Coordinate {\n  if (typeof xOrCoord === "object") {\n    return xOrCoord;\n  }\n  return { x: xOrCoord, y: y! };\n}\n\nconst initialCoord: Coordinate = { x: 0, y: 0 };\nconsole.log(move(10, 20));          // { x: 10, y: 20 }\nconsole.log(move(initialCoord) === initialCoord); // true (same object)',
            },
            {
              label:
                "Practical example — check a missing y and copy object input",
              language: "typescript",
              code: 'interface Coordinate {\n  x: number;\n  y: number;\n}\n\nfunction move(x: number, y: number): Coordinate;\nfunction move(coordinate: Coordinate): Coordinate;\nfunction move(xOrCoord: number | Coordinate, y?: number): Coordinate {\n  if (typeof xOrCoord === "object") return { ...xOrCoord };\n  if (y === undefined) throw new TypeError("y is required with numeric x");\n  return { x: xOrCoord, y };\n}\n\nconst initialCoord: Coordinate = { x: 0, y: 0 };\nconst result = move(initialCoord);\nresult.x = 5;\nconsole.log(initialCoord.x);  // 0 (the input is unchanged)\nconsole.log(move(3, 4)); // { x: 3, y: 4 }',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads",
        },
        {
          name: "Constructor overloading",
          explanation:
            "Declare alternative ways to construct the same class, followed by a single constructor implementation. Use it to accept a coordinate object or individual values while initializing the same instance fields.",
          note: "Constructor signatures have no return type annotation and share one runtime implementation. strictPropertyInitialization requires fields to be initialized along each normal construction path. The first example follows the image’s y! assertion; the second checks for a missing y explicitly. Overload annotations do not validate arbitrary external objects.",
          examples: [
            {
              label:
                "Quick reference — initialize a point using either overload",
              language: "typescript",
              code: 'interface Coordinate {\n  x: number;\n  y: number;\n}\n\nclass Point {\n  x: number;\n  y: number;\n\n  constructor(x: number, y: number);\n  constructor(coord: Coordinate);\n  constructor(xOrCoord: number | Coordinate, y?: number) {\n    if (typeof xOrCoord === "object") {\n      this.x = xOrCoord.x;\n      this.y = xOrCoord.y;\n    } else {\n      this.x = xOrCoord;\n      this.y = y!;\n    }\n  }\n}\n\nconst a = new Point(10, 20);\nconst b = new Point({ x: 3, y: 4 });\nconsole.log(a.x, a.y); // 10, 20\nconsole.log(b.x, b.y); // 3, 4',
            },
            {
              label:
                "Practical example — initialize safely and copy coordinate values",
              language: "typescript",
              code: 'interface Coordinate {\n  x: number;\n  y: number;\n}\n\nclass Point {\n  x: number;\n  y: number;\n\n  constructor(x: number, y: number);\n  constructor(coord: Coordinate);\n  constructor(xOrCoord: number | Coordinate, y?: number) {\n    if (typeof xOrCoord === "object") {\n      this.x = xOrCoord.x;\n      this.y = xOrCoord.y;\n    } else {\n      if (y === undefined) throw new TypeError("y is required with numeric x");\n      this.x = xOrCoord;\n      this.y = y;\n    }\n  }\n}\n\nconst source: Coordinate = { x: 10, y: 20 };\nconst point = new Point(source);\nsource.x = 99;\nconsole.log(point.x, point.y); // 10, 20 (copied numbers)',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/classes.html#constructors",
        },
        {
          name: "Generic function overloading",
          explanation:
            "Combine overloads with generic types so a predicate can narrow a result array while an ordinary boolean callback preserves its element type. Use this for reusable collection helpers that should retain useful type information.",
          note: "The narrowing signature uses a separate S extends T and returns S[]; the image’s value is T → T[] form cannot express a narrower subtype. Put the type-predicate signature before the broader boolean signature. A predicate annotation is a promise to the compiler, not a proof of its logic; the implementation filters into a new array without changing the input. An explicit boolean return below prevents inferred type-predicate narrowing.",
          examples: [
            {
              label:
                "Quick reference — narrow a mixed array with a type predicate",
              language: "typescript",
              code: 'function filter<T, S extends T>(\n  array: T[], predicate: (value: T) => value is S\n): S[];\nfunction filter<T>(array: T[], predicate: (value: T) => boolean): T[];\nfunction filter<T>(array: T[], predicate: (value: T) => boolean): T[] {\n  return array.filter(predicate);\n}\n\nconst values: (string | number)[] = [1, "two", 3];\nconst numbers = filter(values, (value): value is number => typeof value === "number");\n// numbers: number[]\nconsole.log(numbers.map((value) => value.toFixed(1))); // ["1.0", "3.0"]\nconsole.log(values); // [1, "two", 3] (unchanged)',
            },
            {
              label:
                "Practical example — a boolean callback keeps the original element type",
              language: "typescript",
              code: 'function filter<T, S extends T>(\n  array: T[], predicate: (value: T) => value is S\n): S[];\nfunction filter<T>(array: T[], predicate: (value: T) => boolean): T[];\nfunction filter<T>(array: T[], predicate: (value: T) => boolean): T[] {\n  return array.filter(predicate);\n}\n\nconst values: (string | number)[] = [1, "two", 3];\nconst result = filter(values, (value): boolean => typeof value === "string");\n// result: (string | number)[]; the explicit boolean signature does not narrow it.\nconsole.log(result); // ["two"]\nconsole.log(result.map((value) => String(value).toUpperCase())); // ["TWO"]',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates",
        },
      ],
      methodCategories: [
        {
          id: "function-types",
          name: "Function Types",
        },
        {
          id: "function-types",
          name: "Function Types",
        },
        {
          id: "function-types",
          name: "Function Types",
        },
        {
          id: "function-types",
          name: "Function Types",
        },
        {
          id: "function-types",
          name: "Function Types",
        },
        {
          id: "function-types",
          name: "Function Types",
        },
        {
          id: "function-types",
          name: "Function Types",
        },
        {
          id: "function-types",
          name: "Function Types",
        },
        {
          id: "function-types",
          name: "Function Types",
        },
        {
          id: "function-types",
          name: "Function Types",
        },
        {
          id: "function-types",
          name: "Function Types",
        },
        {
          id: "function-overloading",
          name: "Function Overloading",
        },
        {
          id: "function-overloading",
          name: "Function Overloading",
        },
        {
          id: "function-overloading",
          name: "Function Overloading",
        },
        {
          id: "function-overloading",
          name: "Function Overloading",
        },
        {
          id: "function-overloading",
          name: "Function Overloading",
        },
      ],
    },
    {
      name: "Interfaces & Classes",
      id: "interfaces-classes",
      intro: [
        "Define object shapes and contracts for type checking. Topics follow both supplied images in order; the multiple-extension topic includes a two-base example, and callable interfaces receive actual callable implementations. Run snippets independently in .ts files to avoid unintended declaration merging. Examples are checked with TypeScript 5.9.3, strict checking, noUncheckedIndexedAccess, exactOptionalPropertyTypes, target ES2020, and ES2020/DOM libraries.",
        "Object-oriented programming with TypeScript classes. Topics follow both supplied images in order, including field initialization and constructor parameter properties. Run snippets independently in .ts files. Examples are checked with TypeScript 5.9.3, strict checking (including strictPropertyInitialization), target ES2020, and ES2020/DOM libraries; parameter properties need compiler transformation rather than type stripping alone.",
        "Class inheritance and method overriding in TypeScript. Topics follow both images in order; mixins compose a single chain of subclasses. Run snippets independently in .ts files. Examples are checked with TypeScript 5.9.3, strict checking, noImplicitOverride, target ES2020, and ES2020/DOM libraries.",
      ],
      methods: [
        {
          name: "Basic interface",
          explanation:
            "Describe the properties an object must provide, including optional and readonly members. Use interfaces to give shared object shapes a readable name.",
          note: "Interfaces are erased and do not validate runtime data. Compatibility is structural: an object need not declare that it implements User. Fresh object literals receive excess-property checks; optional properties require absence handling, and readonly rejects assignment through this typed reference without freezing the object.",
          examples: [
            {
              label:
                "Quick reference — combine required, optional, and readonly properties",
              language: "typescript",
              code: 'interface User {\n  name: string;\n  age: number;\n  email?: string;      // Optional\n  readonly id: number;\n}\n\nconst user: User = { id: 1, name: "Alice", age: 30 };\nconsole.log(user.name);                 // "Alice"\nconsole.log(user.email ?? "No email"); // "No email"\n// user.id = 2; // Compile-time error: readonly property.',
            },
            {
              label:
                "Practical example — consume the object shape in a function",
              language: "typescript",
              code: 'interface User {\n  name: string;\n  age: number;\n  email?: string;      // Optional\n  readonly id: number;\n}\n\nfunction describeUser(user: User): string {\n  return `${user.name} (${user.age}): ${user.email ?? "No email"}`;\n}\n\nconsole.log(describeUser({\n  id: 2, name: "Bob", age: 25, email: "bob@example.com"\n})); // "Bob (25): bob@example.com"',
            },
          ],
          source: "https://www.typescriptlang.org/docs/handbook/2/objects.html",
        },
        {
          name: "Extending interfaces",
          explanation:
            "Use extends to build an interface from an existing shape and add members. Use it for specialized models such as an administrator who also has all user properties.",
          note: "An extension inherits required, optional, and readonly requirements. A derived property must remain compatible with its base declaration. This is a type relationship, not JavaScript prototype inheritance or automatic object construction.",
          examples: [
            {
              label: "Quick reference — add administrator fields to User",
              language: "typescript",
              code: 'interface User {\n  name: string;\n  age: number;\n  email?: string;      // Optional\n  readonly id: number;\n}\n\ninterface Admin extends User {\n  role: string;\n  permissions: string[];\n}\n\nconst admin: Admin = {\n  id: 1, name: "Alice", age: 30,\n  role: "admin", permissions: ["read", "write"]\n};\nconsole.log(admin.name, admin.role); // "Alice", "admin"',
            },
            {
              label:
                "Practical example — pass an extended object to a base-type API",
              language: "typescript",
              code: 'interface User {\n  name: string;\n  age: number;\n  email?: string;      // Optional\n  readonly id: number;\n}\n\ninterface Admin extends User {\n  role: string;\n  permissions: string[];\n}\n\nfunction userLabel(user: User): string {\n  return `${user.id}: ${user.name}`;\n}\n\nconst admin: Admin = {\n  id: 1, name: "Alice", age: 30,\n  role: "admin", permissions: ["read", "write"]\n};\nconsole.log(userLabel(admin));                  // "1: Alice"\nconsole.log(admin.permissions.includes("write")); // true',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/objects.html#extending-types",
        },
        {
          name: "Function in an interface",
          explanation:
            "Declare methods alongside data properties to describe an object’s behavior. Use this when consumers need to call an operation without depending on one concrete implementation.",
          note: "greet(): void describes a method whose return value is not used; it does not provide the method body. A method that reads this.name must keep the correct receiver when called or passed as a callback.",
          examples: [
            {
              label:
                "Quick reference — implement the declared method in an object",
              language: "typescript",
              code: 'interface Greetable {\n  name: string;\n  greet(): void;\n}\n\nconst greeter: Greetable = {\n  name: "Alice",\n  greet() { console.log(`Hello, ${this.name}`); }\n};\ngreeter.greet(); // "Hello, Alice"',
            },
            {
              label: "Practical example — accept any compatible greeter",
              language: "typescript",
              code: 'interface Greetable {\n  name: string;\n  greet(): void;\n}\n\nfunction welcome(person: Greetable): void {\n  person.greet();\n}\n\nwelcome({\n  name: "Bob",\n  greet() { console.log(`Welcome, ${this.name}!`); }\n}); // "Welcome, Bob!"',
            },
          ],
          source: "https://www.typescriptlang.org/docs/handbook/2/objects.html",
        },
        {
          name: "Index signatures",
          explanation:
            "Describe objects whose property names are not known ahead of time but whose values share a type. Use an index signature for a string-to-string dictionary or similar lookup object.",
          note: "Explicit string-named properties must also fit the declared value type. A signature does not create keys or guarantee that a lookup succeeds; noUncheckedIndexedAccess includes undefined for undeclared keys. These examples enable that option and handle missing values.",
          examples: [
            {
              label: "Quick reference — assign and read dictionary entries",
              language: "typescript",
              code: 'interface StringDictionary {\n  [key: string]: string;\n}\n\nconst messages: StringDictionary = { hello: "Hello" };\nmessages["goodbye"] = "Goodbye";\nconsole.log(messages["goodbye"]); // "Goodbye"\nconsole.log(messages["missing"] ?? "Not found"); // "Not found"',
            },
            {
              label: "Practical example — give dynamic lookups a fallback",
              language: "typescript",
              code: 'interface StringDictionary {\n  [key: string]: string;\n}\n\nfunction translate(dictionary: StringDictionary, key: string): string {\n  return dictionary[key] ?? key;\n}\n\nconst french: StringDictionary = { hello: "Bonjour" };\nconsole.log(translate(french, "hello")); // "Bonjour"\nconsole.log(translate(french, "bye"));   // "bye"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures",
        },
        {
          name: "Multiple interface extension",
          explanation:
            "List multiple bases after extends to combine their members in one interface. Use this to compose independent concerns such as appearance and position.",
          note: "The image’s Circle extends Shape example has one base; the second example demonstrates multiple bases explicitly. Inherited members must be compatible across bases, and every required member must be provided. No runtime inheritance or copying is generated.",
          examples: [
            {
              label:
                "Quick reference — start with the image’s single-base extension",
              language: "typescript",
              code: 'interface Shape {\n  color: string;\n}\n\ninterface Circle extends Shape {\n  radius: number;\n}\n\nconst circle: Circle = { color: "red", radius: 10 };\nconsole.log(circle.color, circle.radius); // "red", 10',
            },
            {
              label: "Practical example — combine appearance and position",
              language: "typescript",
              code: 'interface Shape { color: string; }\ninterface Positioned { x: number; y: number; }\ninterface Circle extends Shape, Positioned { radius: number; }\n\nconst circle: Circle = { color: "red", x: 5, y: 8, radius: 10 };\nconsole.log(circle.color); // "red"\nconsole.log(circle.x, circle.y, circle.radius); // 5, 8, 10',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/objects.html#extending-types",
        },
        {
          name: "Implementing interfaces",
          explanation:
            "Use implements to check that a class’s instances satisfy an interface. Use it when multiple classes should provide the same public contract.",
          note: "implements checks compatibility but does not supply fields, method bodies, or contextual parameter types for class implementations. It checks the instance side, not the constructor or static members. The class still needs its own initialization and annotations.",
          examples: [
            {
              label: "Quick reference — initialize the required circle members",
              language: "typescript",
              code: 'interface Shape {\n  color: string;\n}\n\ninterface Circle extends Shape {\n  radius: number;\n}\n\nclass CircleClass implements Circle {\n  color: string = "red";\n  radius: number = 10;\n}\n\nconst circle: Circle = new CircleClass();\nconsole.log(circle.color, circle.radius); // "red", 10',
            },
            {
              label: "Practical example — initialize a reusable implementation",
              language: "typescript",
              code: 'interface Shape {\n  color: string;\n}\n\ninterface Circle extends Shape {\n  radius: number;\n}\n\nclass CircleClass implements Circle {\n  color: string;\n  radius: number;\n\n  constructor(color: string, radius: number) {\n    this.color = color;\n    this.radius = radius;\n  }\n}\n\nfunction diameter(circle: Circle): number {\n  return circle.radius * 2;\n}\n\nconsole.log(diameter(new CircleClass("blue", 5))); // 10',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/classes.html#implements-clauses",
        },
        {
          name: "Hybrid interface (callable)",
          explanation:
            "Combine a call signature with properties and methods to describe a function object. Use this for callable helpers that also expose configuration or state-management operations.",
          note: "The interface does not make an ordinary object callable: the implementation must actually be a function. These examples attach all required members with Object.assign() rather than asserting that an incomplete function already satisfies Counter. reset() explicitly updates state; the type alone provides no behavior.",
          examples: [
            {
              label:
                "Quick reference — attach properties and a reset method to a function",
              language: "typescript",
              code: 'interface Counter {\n  (start: number): string;\n  interval: number;\n  reset(): void;\n}\n\nfunction getCounter(): Counter {\n  const counter: Counter = Object.assign(\n    (start: number): string => String(start),\n    { interval: 123, reset(): void { counter.interval = 0; } }\n  );\n  return counter;\n}\n\nconst counter = getCounter();\nconsole.log(counter(5));        // "5"\nconsole.log(counter.interval);  // 123\ncounter.reset();\nconsole.log(counter.interval);  // 0',
            },
            {
              label:
                "Practical example — keep independent state in each callable counter",
              language: "typescript",
              code: 'interface Counter {\n  (start: number): string;\n  interval: number;\n  reset(): void;\n}\n\nfunction getCounter(): Counter {\n  let current = 0;\n  const counter: Counter = Object.assign(\n    (start: number): string => {\n      current += start;\n      return String(current);\n    },\n    { interval: 123, reset(): void { current = 0; } }\n  );\n  return counter;\n}\n\nconst first = getCounter();\nconst second = getCounter();\nconsole.log(first(2), first(3)); // "2", "5"\nfirst.reset();\nconsole.log(first(1), second(4)); // "1", "4"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/interfaces.html#hybrid-types",
        },
        {
          name: "Interface merging",
          explanation:
            "Declarations of the same interface name in the same scope combine their members into one contract. Use declaration merging when a shared interface is intentionally open to additional declarations.",
          note: "The resulting Box requires height, width, and scale, including at uses written before the second declaration. Repeated non-method properties must have compatible identical types and modifiers; conflicting declarations are errors. There is no runtime merging, and separate module scopes do not merge automatically.",
          examples: [
            {
              label:
                "Quick reference — supply every member from both declarations",
              language: "typescript",
              code: "interface Box {\n  height: number;\n  width: number;\n}\n\ninterface Box {\n  scale: number; // Merged into the same interface.\n}\n\nconst box: Box = { height: 10, width: 20, scale: 2 };\nconsole.log(box.height, box.width, box.scale); // 10, 20, 2",
            },
            {
              label: "Practical example — consume the combined contract",
              language: "typescript",
              code: "interface Box {\n  height: number;\n  width: number;\n}\n\ninterface Box {\n  scale: number; // Merged into the same interface.\n}\n\nfunction scaledArea(box: Box): number {\n  return box.height * box.width * box.scale ** 2;\n}\n\nconsole.log(scaledArea({ height: 10, width: 20, scale: 2 })); // 800",
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-interfaces",
        },
        {
          name: "Generic interface",
          explanation:
            "Use a type parameter to connect the types of an interface’s properties, inputs, and outputs. Use Container<T> when one contract should work consistently with strings, numbers, or other chosen values.",
          note: "Choosing Container<number> fixes T to number across all three members; it does not convert or validate runtime values. The examples deliberately synchronize value, getValue(), and setValue(), but the interface alone cannot enforce those implementation semantics.",
          examples: [
            {
              label: "Quick reference — implement a number container",
              language: "typescript",
              code: "interface Container<T> {\n  value: T;\n  getValue(): T;\n  setValue(value: T): void;\n}\n\nconst counter: Container<number> = {\n  value: 0,\n  getValue() { return this.value; },\n  setValue(value: number) { this.value = value; }\n};\n\ncounter.setValue(42);\nconsole.log(counter.getValue()); // 42",
            },
            {
              label:
                "Practical example — create containers with inferred type arguments",
              language: "typescript",
              code: 'interface Container<T> {\n  value: T;\n  getValue(): T;\n  setValue(value: T): void;\n}\n\nfunction createContainer<T>(initial: T): Container<T> {\n  return {\n    value: initial,\n    getValue() { return this.value; },\n    setValue(value: T) { this.value = value; }\n  };\n}\n\nconst title = createContainer("Draft"); // Container<string>\ntitle.setValue("Published");\nconst count = createContainer(3);       // Container<number>\ncount.setValue(4);\nconsole.log(title.getValue(), count.getValue()); // "Published", 4',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-types",
        },
        {
          name: "Basic class",
          explanation:
            "Combine instance fields, initialization, and methods in a class. Use new to create independent instances that share the class’s behavior.",
          note: "Members are public by default. With strictPropertyInitialization enabled, required fields must be initialized on every normal constructor path or have an initializer. Methods that read this depend on their receiver; detaching a method does not bind it automatically.",
          examples: [
            {
              label:
                "Quick reference — initialize a person and call its method",
              language: "typescript",
              code: 'class Person {\n  name: string;\n  age: number;\n\n  constructor(name: string, age: number) {\n    this.name = name;\n    this.age = age;\n  }\n\n  greet(): string {\n    return `Hello, I\'m ${this.name}`;\n  }\n}\n\nconst person = new Person("Alice", 30);\nconsole.log(person.greet()); // "Hello, I\'m Alice"\nconsole.log(person.age);     // 30',
            },
            {
              label: "Practical example — keep separate instance state",
              language: "typescript",
              code: 'class Person {\n  name: string;\n  age: number;\n\n  constructor(name: string, age: number) {\n    this.name = name;\n    this.age = age;\n  }\n\n  greet(): string {\n    return `Hello, I\'m ${this.name}`;\n  }\n}\n\nconst alice = new Person("Alice", 30);\nconst bob = new Person("Bob", 25);\nalice.age += 1;\nconsole.log(alice.age, bob.age); // 31, 25\nconsole.log(bob.greet());        // "Hello, I\'m Bob"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/classes.html#class-members",
        },
        {
          name: "Access modifiers",
          explanation:
            "Control where members may be accessed: public everywhere, private inside the declaring class, and protected inside that class and its subclasses. Combine these with readonly to restrict assignment after initialization.",
          note: "TypeScript private and protected are compile-time checks, not JavaScript #private fields or runtime secrecy. readonly is also a type-level assignment restriction. The examples initialize department to fix the image’s strict-initialization error; Math.random() demonstrates id assignment but does not guarantee uniqueness.",
          examples: [
            {
              label:
                "Quick reference — read public state through a checked API",
              language: "typescript",
              code: 'class Employee {\n  public name: string;\n  private salary: number;\n  protected department: string = "General";\n  readonly id: number;\n\n  constructor(name: string, salary: number) {\n    this.name = name;\n    this.salary = salary;\n    this.id = Math.random();\n  }\n\n  getSalary(): number { return this.salary; }\n}\n\nconst employee = new Employee("Alice", 50000);\nconsole.log(employee.name, employee.getSalary()); // "Alice", 50000\nconsole.log(typeof employee.id);                 // "number"\n// employee.salary;       // Error: private.\n// employee.department;   // Error: protected.\n// employee.id = 1;       // Error: readonly.',
            },
            {
              label:
                "Practical example — read a protected member in a subclass",
              language: "typescript",
              code: 'class Employee {\n  public name: string;\n  private salary: number;\n  protected department: string = "General";\n  readonly id: number;\n\n  constructor(name: string, salary: number) {\n    this.name = name;\n    this.salary = salary;\n    this.id = Math.random();\n  }\n\n  getSalary(): number { return this.salary; }\n}\n\nclass Manager extends Employee {\n  describeDepartment(): string {\n    return `${this.name}: ${this.department}`;\n  }\n}\n\nconst manager = new Manager("Bob", 70000);\nconsole.log(manager.describeDepartment()); // "Bob: General"\nconsole.log(manager.getSalary());          // 70000',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/classes.html#member-visibility",
        },
        {
          name: "Property initialization and parameter properties",
          explanation:
            "Initialize fields in their declarations and use constructor parameter modifiers to declare and assign fields in one step. Use parameter properties when the constructor mainly stores its arguments.",
          note: "Initializers run for each new instance; age? permits an absent age. public email and private password create real instance properties, so private does not hide the stored argument at runtime. readonly created prevents replacing the Date reference, not mutating the Date itself. Parameter properties require a transform-capable compiler and are rejected by erasableSyntaxOnly.",
          examples: [
            {
              label:
                "Quick reference — combine field initializers and parameter properties",
              language: "typescript",
              code: 'class User {\n  name: string = "Anonymous";\n  age?: number;\n  readonly created = new Date();\n\n  constructor(\n    public email: string,\n    private password: string\n  ) {}\n\n  hasPassword(): boolean { return this.password.length > 0; }\n}\n\nconst user = new User("alice@example.com", "demo");\nconsole.log(user.name, user.age); // "Anonymous", undefined\nconsole.log(user.email);         // "alice@example.com"\nconsole.log(user.hasPassword()); // true',
            },
            {
              label:
                "Practical example — update mutable fields and inspect readonly limits",
              language: "typescript",
              code: 'class User {\n  name: string = "Anonymous";\n  age?: number;\n  readonly created = new Date();\n\n  constructor(\n    public email: string,\n    private password: string\n  ) {}\n\n  hasPassword(): boolean { return this.password.length > 0; }\n}\n\nconst user = new User("bob@example.com", "demo");\nuser.name = "Bob";\nuser.age = 25;\nuser.created.setUTCFullYear(2000); // Allowed: the Date object is mutable.\nconsole.log(user.name, user.age);       // "Bob", 25\nconsole.log(user.created.getUTCFullYear()); // 2000\n// user.created = new Date(); // Error: cannot replace a readonly field.',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties",
        },
        {
          name: "Getters and setters",
          explanation:
            "Expose property-style access while running code when values are read or assigned. Use a setter for validation and a getter for computed values such as a circle’s area.",
          note: "Read radius and area without parentheses; assignment invokes the radius setter. A getter without a setter is readonly to TypeScript callers. The image’s negative-value check throws before changing the radius, but does not reject NaN or Infinity; strengthen it if finite measurements are required. Accessors can have runtime side effects.",
          examples: [
            {
              label:
                "Quick reference — assign a radius and read a computed area",
              language: "typescript",
              code: 'class Circle {\n  private _radius: number = 0;\n\n  get radius(): number {\n    return this._radius;\n  }\n\n  set radius(value: number) {\n    if (value < 0) throw new Error("Invalid radius");\n    this._radius = value;\n  }\n\n  get area(): number {\n    return Math.PI * this._radius ** 2;\n  }\n}\n\nconst circle = new Circle();\ncircle.radius = 2;\nconsole.log(circle.radius);          // 2\nconsole.log(circle.area.toFixed(2)); // "12.57"',
            },
            {
              label:
                "Practical example — catch validation failure and keep the old value",
              language: "typescript",
              code: 'class Circle {\n  private _radius: number = 0;\n\n  get radius(): number {\n    return this._radius;\n  }\n\n  set radius(value: number) {\n    if (value < 0) throw new Error("Invalid radius");\n    this._radius = value;\n  }\n\n  get area(): number {\n    return Math.PI * this._radius ** 2;\n  }\n}\n\nconst circle = new Circle();\ncircle.radius = 3;\ntry {\n  circle.radius = -1;\n} catch (error) {\n  console.log(error instanceof Error ? error.message : "Unknown error");\n}\nconsole.log(circle.radius); // 3; prints "Invalid radius" before this.',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/classes.html#getters--setters",
        },
        {
          name: "Static members",
          explanation:
            "Store fields and methods on the class constructor rather than on individual instances. Use static members for shared configuration or operations that do not require per-instance state.",
          note: "Access them as MathUtil.PI and MathUtil.calculateArea(), not through new MathUtil(). Static fields are shared and mutable unless restricted; changing PI affects later calls. In the method, this is the constructor used for the call, so detaching the method loses that receiver unless bound.",
          examples: [
            {
              label:
                "Quick reference — call a utility without constructing an instance",
              language: "typescript",
              code: 'class MathUtil {\n  static PI = 3.14159;\n\n  static calculateArea(radius: number): number {\n    return this.PI * radius ** 2;\n  }\n}\n\nconsole.log(MathUtil.PI);                       // 3.14159\nconsole.log(MathUtil.calculateArea(2).toFixed(2)); // "12.57"',
            },
            {
              label:
                "Practical example — change shared configuration and restore it",
              language: "typescript",
              code: "class MathUtil {\n  static PI = 3.14159;\n\n  static calculateArea(radius: number): number {\n    return this.PI * radius ** 2;\n  }\n}\n\nconst original = MathUtil.PI;\ntry {\n  MathUtil.PI = 3;\n  console.log(MathUtil.calculateArea(2)); // 12\n} finally {\n  MathUtil.PI = original;\n}\nconsole.log(MathUtil.PI); // 3.14159",
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/classes.html#static-members",
        },
        {
          name: "Abstract classes",
          explanation:
            "Define a base class with shared implementations and required abstract members. Use it when subclasses should inherit working behavior while supplying their own concrete operations.",
          note: "TypeScript rejects constructing Animal directly and requires non-abstract subclasses to implement makeSound(). Abstract declarations are erased; they do not provide a runtime check or method body. The concrete move() method is inherited through normal JavaScript class inheritance.",
          examples: [
            {
              label:
                "Quick reference — implement a required method and inherit behavior",
              language: "typescript",
              code: 'abstract class Animal {\n  abstract makeSound(): void;\n\n  move(): void {\n    console.log("Moving...");\n  }\n}\n\nclass Dog extends Animal {\n  makeSound(): void {\n    console.log("Woof!");\n  }\n}\n\nconst dog = new Dog();\ndog.move();      // "Moving..."\ndog.makeSound(); // "Woof!"',
            },
            {
              label:
                "Practical example — accept a concrete instance through the base type",
              language: "typescript",
              code: 'abstract class Animal {\n  abstract makeSound(): void;\n\n  move(): void {\n    console.log("Moving...");\n  }\n}\n\nclass Dog extends Animal {\n  makeSound(): void {\n    console.log("Woof!");\n  }\n}\n\nfunction exercise(animal: Animal): void {\n  animal.move();\n  animal.makeSound();\n}\n\nexercise(new Dog()); // "Moving...", then "Woof!"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes-and-members",
        },
        {
          name: "Basic inheritance",
          explanation:
            "Use extends to create a subclass that inherits accessible members and adds specialized behavior. Use inheritance when a derived instance should also work through the base class’s contract.",
          note: "JavaScript classes have one direct superclass. A subclass without a constructor forwards construction arguments to the base; an explicit derived constructor must call super() before using this. An Animal reference can call Animal members but does not expose Dog-only methods such as bark().",
          examples: [
            {
              label: "Quick reference — inherit movement and add barking",
              language: "typescript",
              code: 'class Animal {\n  name: string;\n\n  constructor(name: string) {\n    this.name = name;\n  }\n\n  move(distance: number = 0): void {\n    console.log(`${this.name} moved ${distance}m`);\n  }\n}\n\nclass Dog extends Animal {\n  bark(): void {\n    console.log("Woof! Woof!");\n  }\n}\n\nconst dog = new Dog("Rex");\ndog.move(10); // "Rex moved 10m"\ndog.bark();   // "Woof! Woof!"',
            },
            {
              label: "Practical example — pass a subclass to a base-class API",
              language: "typescript",
              code: 'class Animal {\n  name: string;\n\n  constructor(name: string) {\n    this.name = name;\n  }\n\n  move(distance: number = 0): void {\n    console.log(`${this.name} moved ${distance}m`);\n  }\n}\n\nclass Dog extends Animal {\n  bark(): void {\n    console.log("Woof! Woof!");\n  }\n}\n\nfunction walk(animal: Animal): void {\n  animal.move(3);\n}\n\nconst dog = new Dog("Rex");\nwalk(dog); // "Rex moved 3m"\nconsole.log(dog instanceof Animal, dog instanceof Dog); // true, true',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/classes.html#extends-clauses",
        },
        {
          name: "Method overriding",
          explanation:
            "Replace inherited method behavior with a compatible subclass implementation. Use super.method() when the subclass should extend the base behavior rather than replace it entirely.",
          note: "The runtime instance chooses the method even when its variable is typed as the base class. override (TypeScript 4.3+) checks that a base member exists; noImplicitOverride requires the modifier and is not included in strict. The subclass must preserve valid base-class calls; here its optional distance still accepts omitted arguments, but the default becomes 5.",
          examples: [
            {
              label:
                "Quick reference — extend the base method with a subclass default",
              language: "typescript",
              code: 'class Animal {\n  name: string;\n\n  constructor(name: string) {\n    this.name = name;\n  }\n\n  move(distance: number = 0): void {\n    console.log(`${this.name} moved ${distance}m`);\n  }\n}\n\nclass Cat extends Animal {\n  override move(distance: number = 5): void {\n    console.log("Cat prowling...");\n    super.move(distance);\n  }\n}\n\nconst cat = new Cat("Milo");\ncat.move(); // "Cat prowling...", then "Milo moved 5m"',
            },
            {
              label:
                "Practical example — observe runtime dispatch through the base type",
              language: "typescript",
              code: 'class Animal {\n  name: string;\n\n  constructor(name: string) {\n    this.name = name;\n  }\n\n  move(distance: number = 0): void {\n    console.log(`${this.name} moved ${distance}m`);\n  }\n}\n\nclass Cat extends Animal {\n  override move(distance: number = 5): void {\n    console.log("Cat prowling...");\n    super.move(distance);\n  }\n}\n\nconst animal: Animal = new Cat("Milo");\nanimal.move();  // "Cat prowling...", then "Milo moved 5m"\nanimal.move(0); // "Cat prowling...", then "Milo moved 0m"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/classes.html#overriding-methods",
        },
        {
          name: "Protected members",
          explanation:
            "Expose a member to its declaring class and subclasses while preventing ordinary external access in checked TypeScript. Use protected when subclasses need shared state that consumers should access through public methods.",
          note: "Employee can access the inherited protected name, but another subclass cannot directly access Employee’s private department. The derived constructor initializes Person with super(name) before assigning its own field. protected and private are compile-time access checks, not runtime secrecy; protected access through arbitrary base-class instances also has additional type restrictions.",
          examples: [
            {
              label:
                "Quick reference — initialize the base and use protected state",
              language: "typescript",
              code: 'class Person {\n  protected name: string;\n\n  constructor(name: string) {\n    this.name = name;\n  }\n}\n\nclass Employee extends Person {\n  private department: string;\n\n  constructor(name: string, department: string) {\n    super(name);\n    this.department = department;\n  }\n\n  getDetails(): string {\n    return `${this.name} works in ${this.department}`;\n  }\n}\n\nconst employee = new Employee("Alice", "Engineering");\nconsole.log(employee.getDetails()); // "Alice works in Engineering"\n// employee.name; // Compile-time error: protected member.',
            },
            {
              label:
                "Practical example — update inherited protected state in a subclass",
              language: "typescript",
              code: 'class Person {\n  protected name: string;\n\n  constructor(name: string) {\n    this.name = name;\n  }\n}\n\nclass Employee extends Person {\n  private department: string;\n\n  constructor(name: string, department: string) {\n    super(name);\n    this.department = department;\n  }\n\n  getDetails(): string {\n    return `${this.name} works in ${this.department}`;\n  }\n}\n\nclass TeamLead extends Employee {\n  rename(name: string): void {\n    this.name = name;\n  }\n}\n\nconst lead = new TeamLead("Alice", "Engineering");\nlead.rename("Alicia");\nconsole.log(lead.getDetails()); // "Alicia works in Engineering"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/classes.html#protected",
        },
        {
          name: "Multiple inheritance with mixins",
          explanation:
            "Use functions that return subclasses to compose reusable capabilities around one base class. Use mixins when independent behaviors such as timestamps and activation should be combined without a rigid hierarchy.",
          note: "This creates a single inheritance chain, not multiple direct superclasses. Constructor’s any[] supports forwarding arbitrary base arguments; the returned type retains the base’s members. Each instance gets its own fields, and Date.now() records construction time rather than a unique identifier. Composition order matters when capabilities overlap; this class-expression mixin pattern should avoid declaring TypeScript private/protected members in the mixin itself.",
          examples: [
            {
              label:
                "Quick reference — compose timestamp and activation capabilities",
              language: "typescript",
              code: 'type Constructor<T = {}> = new (...args: any[]) => T;\n\nfunction Timestamped<T extends Constructor>(Base: T) {\n  return class extends Base {\n    timestamp = Date.now();\n  };\n}\n\nfunction Activatable<T extends Constructor>(Base: T) {\n  return class extends Base {\n    isActive = false;\n    activate(): void { this.isActive = true; }\n    deactivate(): void { this.isActive = false; }\n  };\n}\n\nclass User {\n  name: string = "";\n}\n\nclass SpecialUser extends Activatable(Timestamped(User)) {}\n\nconst user = new SpecialUser();\nuser.name = "Alice";\nuser.activate();\nconsole.log(user.name, user.isActive); // "Alice", true\nconsole.log(typeof user.timestamp);  // "number"\nuser.deactivate();\nconsole.log(user.isActive);          // false',
            },
            {
              label:
                "Practical example — preserve constructor arguments and independent state",
              language: "typescript",
              code: 'type Constructor<T = {}> = new (...args: any[]) => T;\n\nfunction Timestamped<T extends Constructor>(Base: T) {\n  return class extends Base {\n    timestamp = Date.now();\n  };\n}\n\nfunction Activatable<T extends Constructor>(Base: T) {\n  return class extends Base {\n    isActive = false;\n    activate(): void { this.isActive = true; }\n    deactivate(): void { this.isActive = false; }\n  };\n}\n\nclass User {\n  name: string;\n  constructor(name: string) { this.name = name; }\n}\n\nclass SpecialUser extends Activatable(Timestamped(User)) {}\n\nconst first = new SpecialUser("Alice");\nconst second = new SpecialUser("Bob");\nfirst.activate();\nconsole.log(first.name, second.name);          // "Alice", "Bob"\nconsole.log(first.isActive, second.isActive);  // true, false\nconsole.log(first instanceof User);            // true',
            },
          ],
          source: "https://www.typescriptlang.org/docs/handbook/mixins.html",
        },
      ],
      methodCategories: [
        {
          id: "interfaces",
          name: "Interfaces",
        },
        {
          id: "interfaces",
          name: "Interfaces",
        },
        {
          id: "interfaces",
          name: "Interfaces",
        },
        {
          id: "interfaces",
          name: "Interfaces",
        },
        {
          id: "interfaces",
          name: "Interfaces",
        },
        {
          id: "interfaces",
          name: "Interfaces",
        },
        {
          id: "interfaces",
          name: "Interfaces",
        },
        {
          id: "interfaces",
          name: "Interfaces",
        },
        {
          id: "interfaces",
          name: "Interfaces",
        },
        {
          id: "classes",
          name: "Classes",
        },
        {
          id: "classes",
          name: "Classes",
        },
        {
          id: "classes",
          name: "Classes",
        },
        {
          id: "classes",
          name: "Classes",
        },
        {
          id: "classes",
          name: "Classes",
        },
        {
          id: "classes",
          name: "Classes",
        },
        {
          id: "inheritance",
          name: "Inheritance",
        },
        {
          id: "inheritance",
          name: "Inheritance",
        },
        {
          id: "inheritance",
          name: "Inheritance",
        },
        {
          id: "inheritance",
          name: "Inheritance",
        },
      ],
    },
    {
      name: "Generics",
      id: "generics",
      intro: [
        "Create reusable functions that preserve relationships between types. Topics follow both images in order, with identity usage and inference grouped together. The property-access example uses constraints rather than an assertion; the rest-parameter merge is an advanced example with explicit limitations. Run snippets independently in .ts files. Examples are checked with TypeScript 5.9.3, strict checking, noUncheckedIndexedAccess, target ES2020, and ES2020/DOM libraries.",
        "Build flexible classes and interfaces with generic types, following both supplied images in order. The container contract and stack getter explicitly allow undefined when empty, and value is readonly through the contract. Run snippets independently in .ts files to avoid merging this Container interface with earlier examples. Examples are checked with TypeScript 5.9.3, strict checking, noUncheckedIndexedAccess, target ES2020, and ES2020/DOM libraries; Pair uses parameter-property transformation.",
      ],
      methods: [
        {
          name: "Generic functions and type inference",
          explanation:
            "Use a type parameter to relate a function’s input and output without discarding their types. Callers can supply a type argument explicitly or let TypeScript infer it from the value.",
          note: "T is a compile-time placeholder, not a runtime constructor or validator. Unlike any, it preserves the relationship between the argument and result. identity returns the original value, so object results retain the same reference; inference may preserve literal types rather than widening them.",
          examples: [
            {
              label:
                "Quick reference — use explicit and inferred type arguments",
              language: "typescript",
              code: 'function identity<T>(value: T): T {\n  return value;\n}\n\nconst num = identity<number>(42);\nconst str = identity<string>("hello");\nconst auto = identity(true); // Inferred from the boolean argument.\nconsole.log(num, str, auto); // 42, "hello", true',
            },
            {
              label:
                "Practical example — preserve an object’s shape and identity",
              language: "typescript",
              code: 'function identity<T>(value: T): T {\n  return value;\n}\n\nconst person = { name: "Alice", age: 30 };\nconst result = identity(person);\nconsole.log(result.name.toUpperCase()); // "ALICE"\nconsole.log(result === person);         // true\nresult.age += 1;\nconsole.log(person.age);                // 31 (same object)',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/generics.html",
        },
        {
          name: "Generics with arrays",
          explanation:
            "Connect an array’s element type to the result of an array helper. Use T | undefined when the operation may find no element, such as reading the first item of an empty array.",
          note: "The result must be checked or given a fallback before type-specific use. The image’s T[] parameter expects a mutable array; a readonly T[] parameter can accept both mutable and readonly arrays when the helper only reads them.",
          examples: [
            {
              label: "Quick reference — handle a possibly empty array",
              language: "typescript",
              code: 'function first<T>(array: T[]): T | undefined {\n  return array[0];\n}\n\nconsole.log(first([10, 20]));        // 10\nconsole.log(first<string>([]));     // undefined\nconsole.log(first<string>([]) ?? "Empty"); // "Empty"',
            },
            {
              label:
                "Practical example — accept a readonly input without mutating it",
              language: "typescript",
              code: 'function first<T>(array: readonly T[]): T | undefined {\n  return array[0];\n}\n\nconst names = ["Alice", "Bob"] as const;\nconst userName = first(names);\nif (userName !== undefined) {\n  console.log(userName.toUpperCase()); // "ALICE"\n}',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/generics.html#working-with-generic-type-variables",
        },
        {
          name: "Multiple type parameters",
          explanation:
            "Use separate type parameters when inputs can have independent types. Return a tuple such as [T, U] to preserve both positional types for consumers.",
          note: "T and U are inferred independently unless supplied explicitly. The returned tuple is a new mutable array; if either element is an object, that element still references the original object.",
          examples: [
            {
              label:
                "Quick reference — infer an ordered pair of different types",
              language: "typescript",
              code: 'function pair<T, U>(first: T, second: U): [T, U] {\n  return [first, second];\n}\n\nconst result = pair("age", 30);\nconst [key, value] = result; // string, number\nconsole.log(key.toUpperCase()); // "AGE"\nconsole.log(value.toFixed(0));  // "30"',
            },
            {
              label:
                "Practical example — choose both type arguments explicitly",
              language: "typescript",
              code: "function pair<T, U>(first: T, second: U): [T, U] {\n  return [first, second];\n}\n\nconst result = pair<number, boolean>(1, true);\nconsole.log(result[0], result[1]); // 1, true",
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/generics.html",
        },
        {
          name: "Generic arrow functions",
          explanation:
            "Place type parameters before an arrow function’s parameter list to create a generic function expression. Use this for reusable helpers written in expression form.",
          note: "Array.prototype.reverse() mutates and returns its input array. The first example keeps that behavior; the second copies the input before reversing. In .tsx, write <T,> to disambiguate a generic arrow from JSX; the second example uses that syntax, which also works in .ts.",
          examples: [
            {
              label: "Quick reference — reverse the original array in place",
              language: "typescript",
              code: "const reverse = <T>(array: T[]): T[] => {\n  return array.reverse();\n};\n\nconst values = [1, 2, 3];\nconst result = reverse(values);\nconsole.log(values);            // [3, 2, 1] (mutated)\nconsole.log(result === values); // true",
            },
            {
              label:
                "Practical example — return a reversed copy and accept readonly input",
              language: "typescript",
              code: "const reverse = <T,>(array: readonly T[]): T[] => {\n  return [...array].reverse();\n};\n\nconst values = [1, 2, 3] as const;\nconst result = reverse(values);\nconsole.log(result); // [3, 2, 1]\nconsole.log(values); // [1, 2, 3] (unchanged)",
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-types",
        },
        {
          name: "Generic constraints",
          explanation:
            "Use extends to limit a type parameter to values with the capabilities the implementation needs. A length constraint allows the function to read obj.length while accepting strings, arrays, and compatible objects.",
          note: "A constraint is a structural type requirement, not a runtime check or a conversion. getLength(123) is rejected because number has no length. This helper returns only number; if retaining T adds no value to an API, accepting { length: number } directly can be simpler.",
          examples: [
            {
              label: "Quick reference — accept values that provide length",
              language: "typescript",
              code: 'function getLength<T extends { length: number }>(obj: T): number {\n  return obj.length;\n}\n\nconsole.log(getLength("hello")); // 5\nconsole.log(getLength([1, 2, 3])); // 3\n// getLength(123); // Compile-time error: no length property.',
            },
            {
              label:
                "Practical example — accept a structurally compatible object",
              language: "typescript",
              code: 'function getLength<T extends { length: number }>(obj: T): number {\n  return obj.length;\n}\n\nconst batch = { length: 4, description: "Queued items" };\nconsole.log(getLength(batch)); // 4',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints",
        },
        {
          name: "Default type parameters",
          explanation:
            "Assign a default type argument with T = string for calls where no type can be inferred or supplied. Use defaults to keep generic APIs convenient without making every caller write type arguments.",
          note: "Inference and explicit type arguments take precedence over the default. In the image’s create(value: T), value is still required and usually provides T by inference. The second variation removes the input and returns T[] so the default has an observable role; a type default does not supply a runtime argument.",
          examples: [
            {
              label: "Quick reference — inference overrides the default type",
              language: "typescript",
              code: 'function create<T = string>(value: T): T {\n  return value;\n}\n\nconst text = create("hello");\nconst count = create(42); // Inferred number, not the default string.\nconsole.log(text, count); // "hello", 42\n// create(); // Error: the value argument is still required.',
            },
            {
              label:
                "Practical variation — use a default when there is no inference candidate",
              language: "typescript",
              code: 'function create<T = string>(): T[] {\n  return [];\n}\n\nconst words = create();        // string[] (default)\nconst ids = create<number>();  // number[] (explicit)\nwords.push("hello");\nids.push(42);\nconsole.log(words, ids); // ["hello"], [42]',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-parameter-defaults",
        },
        {
          name: "Generic property access (keyof and T[K])",
          explanation:
            "Constrain a property key to keyof T and return the corresponding indexed access type T[K]. Use this to write reusable getters that preserve the type of the chosen property.",
          note: "The image labels this a generic type assertion, but the function needs no assertion: the key constraint makes the access type-safe. Invalid keys are rejected, and optional properties retain undefined in their result type. Type annotations do not validate external objects; userName avoids the browser’s global name identifier.",
          examples: [
            {
              label:
                "Quick reference — infer a different result type for each key",
              language: "typescript",
              code: 'function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nconst person = { name: "Alice", age: 30 };\nconst userName = getProperty(person, "name"); // string\nconst age = getProperty(person, "age");      // number\nconsole.log(userName.toUpperCase()); // "ALICE"\nconsole.log(age.toFixed(0));          // "30"',
            },
            {
              label:
                "Practical example — preserve an optional property’s absence",
              language: "typescript",
              code: 'function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nconst person: { name: string; email?: string } = { name: "Alice" };\nconst email = getProperty(person, "email"); // string | undefined\nconsole.log(email ?? "No email"); // "No email"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/generics.html#using-type-parameters-in-generic-constraints",
        },
        {
          name: "Generic rest parameters",
          explanation:
            "Infer a tuple of object arguments and combine their element types into an intersection for the result. Use this specialized helper for shallow composition of plain objects with non-conflicting properties.",
          note: "T[number] forms a union of the tuple’s element types; the distributive conditional and contravariant function parameter infer the intersection. The nonempty tuple constraint avoids the image’s unhelpful empty-input case. Object.assign() copies enumerable own properties into a fresh object, keeps nested references, and lets later keys overwrite earlier ones. The intersection return type and broad library typing do not prove a safe merge: avoid conflicting keys and non-plain objects, which this signature does not reject.",
          examples: [
            {
              label: "Quick reference — combine distinct object properties",
              language: "typescript",
              code: 'type UnionToIntersection<U> =\n  (U extends any ? (k: U) => void : never) extends\n  ((k: infer I) => void) ? I : never;\n\nfunction merge<T extends [object, ...object[]]>(\n  ...objects: T\n): UnionToIntersection<T[number]> {\n  return Object.assign({}, ...objects);\n}\n\nconst result = merge({ name: "Alice" }, { age: 30 });\nconsole.log(result.name.toUpperCase()); // "ALICE"\nconsole.log(result.age.toFixed(0));     // "30"',
            },
            {
              label:
                "Practical example — observe shallow copying of nested state",
              language: "typescript",
              code: 'type UnionToIntersection<U> =\n  (U extends any ? (k: U) => void : never) extends\n  ((k: infer I) => void) ? I : never;\n\nfunction merge<T extends [object, ...object[]]>(\n  ...objects: T\n): UnionToIntersection<T[number]> {\n  return Object.assign({}, ...objects);\n}\n\nconst settings = { preferences: { theme: "light" } };\nconst result = merge({ id: 1 }, settings);\nresult.preferences.theme = "dark";\nconsole.log(settings.preferences.theme); // "dark" (shared nested object)\nconsole.log(result === settings);        // false (fresh outer object)',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types",
        },
        {
          name: "Generic class",
          explanation:
            "Use a class type parameter to keep stored values and instance methods consistent. A Box<number> accepts numbers, while a Box<string> exposes the same behavior for strings.",
          note: "Type arguments can be explicit or inferred from constructor arguments. They are erased: different Box<T> instances use the same runtime class, and private is a compile-time access restriction. Box stores the supplied reference rather than cloning objects.",
          examples: [
            {
              label:
                "Quick reference — create boxes with explicit element types",
              language: "typescript",
              code: 'class Box<T> {\n  private value: T;\n\n  constructor(value: T) {\n    this.value = value;\n  }\n\n  getValue(): T { return this.value; }\n  setValue(value: T): void { this.value = value; }\n}\n\nconst numberBox = new Box<number>(42);\nconst stringBox = new Box<string>("hello");\nnumberBox.setValue(43);\nconsole.log(numberBox.getValue(), stringBox.getValue()); // 43, "hello"\nconsole.log(numberBox.constructor === stringBox.constructor); // true',
            },
            {
              label:
                "Practical example — infer an object type and retain its reference",
              language: "typescript",
              code: 'class Box<T> {\n  private value: T;\n\n  constructor(value: T) {\n    this.value = value;\n  }\n\n  getValue(): T { return this.value; }\n  setValue(value: T): void { this.value = value; }\n}\n\nconst person = { name: "Alice" };\nconst personBox = new Box(person); // Box<{ name: string }>\npersonBox.getValue().name = "Alicia";\nconsole.log(person.name); // "Alicia" (same object)\npersonBox.setValue({ name: "Bob" });\nconsole.log(personBox.getValue().name, person.name); // "Bob", "Alicia"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-classes",
        },
        {
          name: "Generic interface",
          explanation:
            "Describe a reusable container contract whose readable value, inserted items, and removed results share one type parameter. Use this to accept different storage implementations through one interface.",
          note: "The category uses readonly value: T | undefined to match the stack’s getter and empty state; the image’s value: T would promise a value even when empty. readonly prevents assignment through the interface but does not stop add() or remove() from changing internal state. The interface does not prescribe ordering or capacity.",
          examples: [
            {
              label:
                "Quick reference — implement the contract with a numeric array",
              language: "typescript",
              code: "interface Container<T> {\n  readonly value: T | undefined;\n  add(item: T): void;\n  remove(): T | undefined;\n}\n\nconst items: number[] = [];\nconst container: Container<number> = {\n  get value() { return items[items.length - 1]; },\n  add(item: number) { items.push(item); },\n  remove() { return items.pop(); }\n};\n\nconsole.log(container.value); // undefined\ncontainer.add(42);\nconsole.log(container.value, container.remove()); // 42, 42",
            },
            {
              label:
                "Practical example — use a single-slot string implementation",
              language: "typescript",
              code: 'interface Container<T> {\n  readonly value: T | undefined;\n  add(item: T): void;\n  remove(): T | undefined;\n}\n\nlet current: string | undefined;\nconst container: Container<string> = {\n  get value() { return current; },\n  add(item: string) { current = item; },\n  remove() {\n    const result = current;\n    current = undefined;\n    return result;\n  }\n};\n\ncontainer.add("Alice");\ncontainer.add("Bob"); // This implementation replaces its one stored value.\nconsole.log(container.remove()); // "Bob"\nconsole.log(container.value);    // undefined',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-types",
        },
        {
          name: "Generic class with multiple types",
          explanation:
            "Use independent type parameters for values that need not share a type. Pair<T, U> preserves both types, and swap() returns a new Pair<U, T> with their positions reversed.",
          note: "The constructor’s public parameters are parameter properties and require a transform-capable compiler. swap() creates a new pair without mutating the original pair; object elements still share their original references.",
          examples: [
            {
              label: "Quick reference — swap values and their positional types",
              language: "typescript",
              code: 'class Pair<T, U> {\n  constructor(public first: T, public second: U) {}\n\n  swap(): Pair<U, T> {\n    return new Pair(this.second, this.first);\n  }\n}\n\nconst pair = new Pair<string, number>("age", 30);\nconst swapped = pair.swap(); // Pair<number, string>\nconsole.log(swapped.first.toFixed(0)); // "30"\nconsole.log(swapped.second.toUpperCase()); // "AGE"\nconsole.log(pair.first, pair.second); // "age", 30 (unchanged)',
            },
            {
              label:
                "Practical example — infer both types and observe shared object elements",
              language: "typescript",
              code: 'class Pair<T, U> {\n  constructor(public first: T, public second: U) {}\n\n  swap(): Pair<U, T> {\n    return new Pair(this.second, this.first);\n  }\n}\n\nconst person = { name: "Alice" };\nconst pair = new Pair(person, true);\nconst swapped = pair.swap();\nswapped.second.name = "Alicia";\nconsole.log(swapped.first, pair.first.name); // true, "Alicia"\nconsole.log(person.name); // "Alicia" (the element reference is shared)',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-classes",
        },
        {
          name: "Generic interface implementation",
          explanation:
            "Implement Container<T> with a class that keeps its own typed storage. Stack<T> uses last-in, first-out ordering: value reads the top, and remove() removes that same item.",
          note: "Both value and remove() return T | undefined because a stack can be empty; noUncheckedIndexedAccess exposes the image’s unsafe getter annotation. Reading value does not pop an item. implements checks the instance contract, while push() and pop() provide the actual mutating behavior.",
          examples: [
            {
              label:
                "Quick reference — push and remove values in last-in, first-out order",
              language: "typescript",
              code: "interface Container<T> {\n  readonly value: T | undefined;\n  add(item: T): void;\n  remove(): T | undefined;\n}\n\nclass Stack<T> implements Container<T> {\n  private items: T[] = [];\n\n  get value(): T | undefined {\n    return this.items[this.items.length - 1];\n  }\n\n  add(item: T): void { this.items.push(item); }\n  remove(): T | undefined { return this.items.pop(); }\n}\n\nconst stack = new Stack<number>();\nstack.add(10);\nstack.add(20);\nconsole.log(stack.value);    // 20 (still present)\nconsole.log(stack.remove()); // 20\nconsole.log(stack.remove()); // 10\nconsole.log(stack.remove()); // undefined",
            },
            {
              label:
                "Practical example — consume a stack through the interface",
              language: "typescript",
              code: 'interface Container<T> {\n  readonly value: T | undefined;\n  add(item: T): void;\n  remove(): T | undefined;\n}\n\nclass Stack<T> implements Container<T> {\n  private items: T[] = [];\n\n  get value(): T | undefined {\n    return this.items[this.items.length - 1];\n  }\n\n  add(item: T): void { this.items.push(item); }\n  remove(): T | undefined { return this.items.pop(); }\n}\n\nconst container: Container<string> = new Stack<string>();\ncontainer.add("hello");\nconst item = container.remove();\nif (item !== undefined) console.log(item.toUpperCase()); // "HELLO"\nconsole.log(container.value ?? "Empty"); // "Empty"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/classes.html#implements-clauses",
        },
        {
          name: "Generic constraints with interfaces",
          explanation:
            "Constrain a class type parameter with an interface to require capabilities from every stored item. Use Lengthwise when the class needs a numeric length property without fixing one concrete item type.",
          note: "The constraint is structural, so strings, arrays, and compatible objects can satisfy it. It does not create the property or perform runtime validation. Callers still choose the item type for each collection; a Collection<string> does not accept arrays merely because arrays also have length.",
          examples: [
            {
              label:
                "Quick reference — constrain a collection to length-bearing items",
              language: "typescript",
              code: 'interface Lengthwise { length: number; }\n\nclass Collection<T extends Lengthwise> {\n  private items: T[] = [];\n\n  add(item: T): void {\n    console.log(`Adding item with length ${item.length}`);\n    this.items.push(item);\n  }\n}\n\nconst words = new Collection<string>();\nwords.add("hello"); // "Adding item with length 5"\nwords.add("");      // "Adding item with length 0"',
            },
            {
              label:
                "Practical example — reuse the constraint with arrays and custom objects",
              language: "typescript",
              code: 'interface Lengthwise { length: number; }\n\nclass Collection<T extends Lengthwise> {\n  private items: T[] = [];\n\n  add(item: T): void {\n    console.log(`Adding item with length ${item.length}`);\n    this.items.push(item);\n  }\n}\n\nconst lists = new Collection<number[]>();\nlists.add([1, 2, 3]); // "Adding item with length 3"\nconst batches = new Collection<{ length: number; label: string }>();\nbatches.add({ length: 4, label: "Pending" }); // "Adding item with length 4"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints",
        },
        {
          name: "Generic static methods",
          explanation:
            "Declare type parameters on static methods so each call can infer its own element type without constructing an instance. Use these methods for collection helpers shared on the class itself.",
          note: "A static member cannot use an enclosing class’s instance type parameter; first<T> and last<T> each declare their own T. Empty arrays yield undefined, and returned object elements retain their references. These helpers only read the array; readonly parameters in the second example also accept readonly inputs.",
          examples: [
            {
              label:
                "Quick reference — infer result types independently for both methods",
              language: "typescript",
              code: 'class ArrayUtils {\n  static first<T>(array: T[]): T | undefined {\n    return array[0];\n  }\n\n  static last<T>(array: T[]): T | undefined {\n    return array[array.length - 1];\n  }\n}\n\nconsole.log(ArrayUtils.first([10, 20]));      // 10\nconsole.log(ArrayUtils.last([10, 20]));       // 20\nconsole.log(ArrayUtils.first(["Alice", "Bob"])); // "Alice"\nconsole.log(ArrayUtils.last(["Alice", "Bob"]));  // "Bob"',
            },
            {
              label:
                "Practical example — handle empty arrays and accept readonly inputs",
              language: "typescript",
              code: 'class ArrayUtils {\n  static first<T>(array: readonly T[]): T | undefined {\n    return array[0];\n  }\n\n  static last<T>(array: readonly T[]): T | undefined {\n    return array[array.length - 1];\n  }\n}\n\nconst names = ["Alice", "Bob"] as const;\nconsole.log(ArrayUtils.first(names)); // "Alice"\nconsole.log(ArrayUtils.last(names));  // "Bob"\nconsole.log(ArrayUtils.first<number>([])); // undefined\nconsole.log(ArrayUtils.last<number>([]) ?? 0); // 0',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/classes.html#type-parameters-in-static-members",
        },
      ],
      methodCategories: [
        {
          id: "generic-functions",
          name: "Generic Functions",
        },
        {
          id: "generic-functions",
          name: "Generic Functions",
        },
        {
          id: "generic-functions",
          name: "Generic Functions",
        },
        {
          id: "generic-functions",
          name: "Generic Functions",
        },
        {
          id: "generic-functions",
          name: "Generic Functions",
        },
        {
          id: "generic-functions",
          name: "Generic Functions",
        },
        {
          id: "generic-functions",
          name: "Generic Functions",
        },
        {
          id: "generic-functions",
          name: "Generic Functions",
        },
        {
          id: "generic-classes-interfaces",
          name: "Generic Classes & Interfaces",
        },
        {
          id: "generic-classes-interfaces",
          name: "Generic Classes & Interfaces",
        },
        {
          id: "generic-classes-interfaces",
          name: "Generic Classes & Interfaces",
        },
        {
          id: "generic-classes-interfaces",
          name: "Generic Classes & Interfaces",
        },
        {
          id: "generic-classes-interfaces",
          name: "Generic Classes & Interfaces",
        },
        {
          id: "generic-classes-interfaces",
          name: "Generic Classes & Interfaces",
        },
      ],
    },
    {
      name: "Type Operations",
      id: "type-operations",
      intro: [
        'Guide compiler knowledge, check compatibility, and preserve literal types. Topics follow the detailed image in order, ending with when to use each mechanism. satisfies is a conformance check, not an assertion; as const is a const assertion. Run snippets independently in .ts files; the DOM snippets create and remove their own elements and need a browser with a loaded body and no existing id="name". Examples are checked with TypeScript 5.9.3, strict checking, noUncheckedIndexedAccess, target ES2020, and ES2020/DOM libraries.',
        "Query types from existing values and access property types by key. Topics follow the detailed image in order and include the quick-reference forms. Run snippets independently in .ts files; repeated aliases such as User are intentionally local to each example. Examples are checked with TypeScript 5.9.3, strict checking, noUncheckedIndexedAccess, target ES2020, and ES2020/DOM libraries. Factory examples additionally need crypto.randomUUID() from a supporting runtime.",
      ],
      methods: [
        {
          name: "as — assert a type",
          explanation:
            "Ask the compiler to treat an expression as a specified type when you have information it cannot infer. Use an assertion only when an external guarantee already establishes that type.",
          note: "as is erased: it does not convert a value, check an element’s tag, or handle null. The first browser example creates its own input before asserting the lookup result; the second uses instanceof for an actual runtime check. Ordinary assertions require sufficiently overlapping types.",
          examples: [
            {
              label:
                "Quick reference — assert an input type after creating the input",
              language: "typescript",
              code: '// Browser example: create the markup this snippet depends on.\nconst field = document.createElement("input");\nfield.id = "name";\ndocument.body.append(field);\n\nconst input = document.getElementById("name") as HTMLInputElement;\ninput.value = "hello";\nconsole.log(input.value); // "hello"\nfield.remove();',
            },
            {
              label:
                "Practical alternative — narrow the element with a runtime check",
              language: "typescript",
              code: '// Browser example: create the markup this snippet depends on.\nconst field = document.createElement("input");\nfield.id = "name";\ndocument.body.append(field);\n\nconst el = document.getElementById("name");\nif (!(el instanceof HTMLInputElement)) {\n  throw new TypeError("Expected an input element");\n}\nel.value = "Alice";\nconsole.log(el.value); // "Alice"\nfield.remove();',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions",
        },
        {
          name: "Double assertion (as unknown as)",
          explanation:
            "Assert through unknown to bypass the normal overlap requirement between types. Treat this as an explicit escape hatch for exceptional interoperability cases, not a way to repair incompatible data.",
          note: "The intermediate unknown does not validate the target shape. Both assertions disappear at runtime, so the result is still the original value and operations permitted by the asserted type can fail. Prefer a runtime check for untrusted or incompatible data.",
          examples: [
            {
              label:
                "Quick reference — observe that a double assertion does not convert data",
              language: "typescript",
              code: 'type SpecificType = { label: string };\nconst someValue = 42;\nconst val = someValue as unknown as SpecificType;\n\nconsole.log(typeof val); // "number", despite the asserted object type.\nconsole.log(Object.is(val, someValue)); // true\nconsole.log(val.label); // undefined: the assertion created no property.',
            },
            {
              label:
                "Practical alternative — check a label before accessing it",
              language: "typescript",
              code: 'function readLabel(value: unknown): string {\n  if (typeof value === "object" && value !== null &&\n      "label" in value && typeof value.label === "string") {\n    return value.label.toUpperCase();\n  }\n  return "Invalid label";\n}\n\nconsole.log(readLabel(42));                 // "Invalid label"\nconsole.log(readLabel({ label: "ready" })); // "READY"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions",
        },
        {
          name: "Non-null assertion (!)",
          explanation:
            "Remove null and undefined from an expression’s apparent type without checking the value. Use it only when a separate guarantee already establishes that the value is present.",
          note: "! is erased and does not throw a helpful error or prove a more specific element type. A missing DOM lookup still returns null. Unlike a non-null assertion, an instanceof guard can check both existence and whether the element is an input.",
          examples: [
            {
              label:
                "Quick reference — assert existence after creating an element",
              language: "typescript",
              code: '// Browser example: create the markup this snippet depends on.\nconst field = document.createElement("input");\nfield.id = "name";\ndocument.body.append(field);\n\nconst el = document.getElementById("name")!; // HTMLElement, not HTMLInputElement.\nconsole.log(el.id); // "name"\nfield.remove();',
            },
            {
              label:
                "Practical alternative — handle an element with the wrong tag safely",
              language: "typescript",
              code: 'const field = document.createElement("div");\nfield.id = "name";\ndocument.body.append(field);\n\nconst el = document.getElementById("name");\nif (el instanceof HTMLInputElement) {\n  console.log(el.value);\n} else {\n  console.log("Not an input"); // A div exists, but it is not an input.\n}\nfield.remove();',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-",
        },
        {
          name: "satisfies",
          explanation:
            "Check that an expression is assignable to a target type without replacing its expression type with that target annotation. Use it for checked configuration objects that should retain useful property-specific types.",
          note: "Requires TypeScript 4.9+. This is compile-time checking, not runtime validation or freezing. Contextual typing can still influence inference; satisfies is not a blanket guarantee of literal types or zero widening. Here red remains number[] and green remains string, unlike a broad Record annotation that exposes a union for each lookup.",
          examples: [
            {
              label:
                "Quick reference — retain separate array and string property types",
              language: "typescript",
              code: 'const palette = {\n  red: [255, 0, 0],\n  green: "#00ff00",\n  blue: [0, 0, 255]\n} satisfies Record<string, string | number[]>;\n\nconsole.log(palette.green.toUpperCase()); // "#00FF00"\nconsole.log(palette.red.map((x) => x / 255)); // [1, 0, 0]',
            },
            {
              label:
                "Practical example — check a fixed set of configuration keys",
              language: "typescript",
              code: 'type Color = "red" | "green" | "blue";\nconst palette = {\n  red: [255, 0, 0],\n  green: "#00ff00",\n  blue: [0, 0, 255]\n} satisfies Record<Color, string | number[]>;\n\npalette.red.push(128); // Allowed: satisfies does not make arrays readonly.\nconsole.log(palette.red.length); // 4\n// Missing or misspelled color keys would be compile-time errors.',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator",
        },
        {
          name: "as const",
          explanation:
            "Preserve literal types and infer readonly properties and tuples within a literal expression. Use this for fixed routes and configuration values whose exact types should remain available.",
          note: "Requires TypeScript 3.4+. typeof ROUTES[number] forms a union of the tuple’s element types. Nested literals receive readonly types, but previously referenced mutable objects keep their mutability; as const does not freeze runtime data or validate an application-specific shape.",
          examples: [
            {
              label:
                "Quick reference — derive allowed route values from a readonly tuple",
              language: "typescript",
              code: 'const ROUTES = ["home", "about", "contact"] as const;\n// readonly ["home", "about", "contact"]\ntype Route = typeof ROUTES[number]; // "home" | "about" | "contact"\n\nfunction pathFor(route: Route): string {\n  return `/${route}`;\n}\n\nconsole.log(pathFor("about")); // "/about"',
            },
            {
              label:
                "Practical example — retain precise nested configuration types",
              language: "typescript",
              code: 'const CONFIG = {\n  env: "production",\n  port: 3000,\n  features: ["auth", "logs"]\n} as const;\n// readonly env: "production"; readonly port: 3000;\n// readonly features: readonly ["auth", "logs"]\n\nconsole.log(CONFIG.env, CONFIG.port); // "production", 3000\nconsole.log(CONFIG.features);         // ["auth", "logs"]\nconsole.log(Object.isFrozen(CONFIG)); // false; no runtime freeze occurred.',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions",
        },
        {
          name: "When to use each",
          explanation:
            "Use as for an externally established type, satisfies to check compatibility while retaining expression-specific typing, and as const for literal and readonly inference. Prefer runtime narrowing over as or ! when a value’s type or presence is uncertain.",
          note: "These mechanisms serve different purposes and can be combined: as const satisfies Shape preserves literal/readonly inference and checks a contract. None performs runtime validation; readonly inference is not a runtime immutability guarantee.",
          examples: [
            {
              label:
                "Practical choice — check a configuration that should stay mutable",
              language: "typescript",
              code: 'interface AppConfig {\n  env: string;\n  port: number;\n}\n\nconst config = { env: "production", port: 3000 } satisfies AppConfig;\nconfig.port = 3001;\nconsole.log(config.env.toUpperCase(), config.port); // "PRODUCTION", 3001',
            },
            {
              label:
                "Practical choice — combine literal precision with a checked contract",
              language: "typescript",
              code: 'interface AppConfig {\n  env: "production" | "development";\n  port: number;\n  features: readonly string[];\n}\n\nconst CONFIG = {\n  env: "production",\n  port: 3000,\n  features: ["auth", "logs"]\n} as const satisfies AppConfig;\n// Shape is checked; env remains "production" and features is a readonly tuple.\nconsole.log(CONFIG.env, CONFIG.features[0]); // "production", "auth"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator",
        },
        {
          name: "keyof — union of property keys",
          explanation:
            "Use keyof to derive the allowed property keys of an object type. Use the resulting union when a parameter or value must name an existing property.",
          note: "keyof operates on types and does not enumerate an object at runtime. For the finite User shapes below it yields string literals; other types can have number or symbol keys, and a string index signature can produce string | number.",
          examples: [
            {
              label: "Quick reference — derive keys from a simple object type",
              language: "typescript",
              code: 'type User = { name: string; age: number };\ntype UserKey = keyof User; // "name" | "age"\n\nconst key: UserKey = "name";\nconst user: User = { name: "Alice", age: 30 };\nconsole.log(user[key]); // "Alice"',
            },
            {
              label:
                "Practical example — include additional keys as the shape grows",
              language: "typescript",
              code: 'type User = { name: string; age: number; email: string };\ntype UserKey = keyof User; // "name" | "age" | "email"\n\nconst fields: UserKey[] = ["name", "email"];\nconsole.log(fields); // ["name", "email"]',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/keyof-types.html",
        },
        {
          name: "Type-safe property access with generics",
          explanation:
            "Constrain a generic key to keyof T and return T[K] to preserve the selected property’s type. Use this instead of a string key and an unchecked assertion.",
          note: "The key must be valid for the supplied object type. A union of keys produces a union of result types, and optional properties retain undefined. These are static guarantees, not runtime validation of external objects; userName avoids the browser’s global name identifier.",
          examples: [
            {
              label: "Quick reference — retain string and number result types",
              language: "typescript",
              code: 'function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nconst user = { name: "Alice", age: 30, email: "a@b.com" };\nconst userName = getProperty(user, "name"); // string\nconst age = getProperty(user, "age");      // number\nconsole.log(userName.toUpperCase(), age.toFixed(0)); // "ALICE", "30"\n// getProperty(user, "foo"); // Error: not a key of this object.',
            },
            {
              label:
                "Practical example — preserve absence for an optional property",
              language: "typescript",
              code: 'function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\n\nconst user: { name: string; email?: string } = { name: "Alice" };\nconst email = getProperty(user, "email"); // string | undefined\nconsole.log(email ?? "No email"); // "No email"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/generics.html#using-type-parameters-in-generic-constraints",
        },
        {
          name: "typeof — type from a value",
          explanation:
            "Use typeof in a type position to derive the static type of an existing value. Use it to keep related values aligned with an existing configuration or object shape.",
          note: 'Type-level typeof is erased; JavaScript typeof instead evaluates to a runtime string such as "object". A const object binding does not make its properties literal or readonly: the port and host below are inferred as number and string. A derived type does not clone or instantiate a value.',
          examples: [
            {
              label: "Quick reference — reuse an inferred configuration shape",
              language: "typescript",
              code: 'const config = { port: 3000, host: "localhost" };\ntype Config = typeof config; // { port: number; host: string }\n\nconst local: Config = { port: 8080, host: "127.0.0.1" };\nconsole.log(local.port, local.host); // 8080, "127.0.0.1"',
            },
            {
              label:
                "Practical example — distinguish a type query from runtime typeof",
              language: "typescript",
              code: 'const config = { port: 3000, host: "localhost", debug: true };\ntype Config = typeof config;\nconst next: Config = { ...config, debug: false };\n\nconsole.log(next.debug, config.debug); // false, true (separate outer objects)\nconsole.log(typeof config);           // "object" (runtime operator)',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/typeof-types.html",
        },
        {
          name: "Combining keyof and typeof",
          explanation:
            "Use keyof typeof value to derive allowed keys directly from a runtime value’s static shape. Use this when the object itself should be the source of truth for key names.",
          note: "typeof obtains the object type and keyof selects its keys; neither operation creates a runtime list. Indexing with different valid keys can yield different value types, so a union-key lookup may need narrowing or formatting.",
          examples: [
            {
              label: "Quick reference — select an existing configuration field",
              language: "typescript",
              code: 'const config = { port: 3000, host: "localhost", debug: true };\ntype ConfigKey = keyof typeof config; // "port" | "host" | "debug"\n\nconst key: ConfigKey = "port";\nconsole.log(config[key]); // 3000',
            },
            {
              label:
                "Practical example — format values selected by checked key names",
              language: "typescript",
              code: 'const config = { port: 3000, host: "localhost", debug: true };\ntype ConfigKey = keyof typeof config; // "port" | "host" | "debug"\n\nconst fields: ConfigKey[] = ["host", "debug"];\nconst values = fields.map((key) => String(config[key]));\nconsole.log(values); // ["localhost", "true"]',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/typeof-types.html",
        },
        {
          name: "typeof with functions",
          explanation:
            "Use typeof functionName to obtain a function’s type, then ReturnType to derive its result type. Use this when consumer types should follow a factory’s implementation automatically.",
          note: "The type query does not call the function; ReturnType<typeof createUser> is different from the function type itself. crypto.randomUUID() runs only when the factory is called and needs a supporting runtime; browsers require a secure context such as HTTPS or localhost. The snippets use the runtime Web Crypto API and log no unpredictable UUID value.",
          examples: [
            {
              label:
                "Quick reference — derive and consume a factory’s return shape",
              language: "typescript",
              code: 'function createUser(name: string, age: number) {\n  return { name, age, id: crypto.randomUUID() };\n}\n\ntype CreateUserReturn = ReturnType<typeof createUser>;\n// { name: string; age: number; id: string }\n\nconst user: CreateUserReturn = createUser("Alice", 30);\nconsole.log(user.name, user.age, typeof user.id); // "Alice", 30, "string"',
            },
            {
              label:
                "Practical example — show that type queries do not execute the factory",
              language: "typescript",
              code: 'let calls = 0;\nfunction createUser(name: string, age: number) {\n  calls += 1;\n  return { name, age, id: crypto.randomUUID() };\n}\n\ntype CreateUserReturn = ReturnType<typeof createUser>;\nconsole.log(calls); // 0; the type alias made no call.\nconst user: CreateUserReturn = createUser("Bob", 25);\nconsole.log(calls, user.name); // 1, "Bob"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype",
        },
        {
          name: "Indexed access types — T[K]",
          explanation:
            "Look up a property’s type using brackets in a type expression. Chain lookups to derive nested types without repeating their definitions.",
          note: 'User["age"] is a type query, not runtime property access. Keys must exist on the queried type; optional properties include undefined and may require handling before a further nested lookup. The examples use one User definition per snippet to avoid the image’s duplicate aliases.',
          examples: [
            {
              label:
                "Quick reference — look up top-level and nested property types",
              language: "typescript",
              code: 'type User = {\n  name: string;\n  age: number;\n  address: { city: string; zip: string };\n};\n\ntype Name = User["name"];             // string\ntype Age = User["age"];               // number\ntype City = User["address"]["city"];  // string\n\nconst userName: Name = "Alice";\nconst age: Age = 30;\nconst city: City = "Paris";\nconsole.log(userName, age, city); // "Alice", 30, "Paris"',
            },
            {
              label:
                "Practical example — reuse a nested field’s type in a function",
              language: "typescript",
              code: 'type User = {\n  name: string;\n  age: number;\n  address: { city: string; zip: string };\n};\n\ntype City = User["address"]["city"];\nfunction cityLabel(city: City): string {\n  return city.toUpperCase();\n}\n\nconsole.log(cityLabel("Paris")); // "PARIS"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html",
        },
        {
          name: "Union of multiple keys",
          explanation:
            "Index a type with a union of keys to get a union of the selected property types. Use it when a value can come from several known fields.",
          note: 'User["name" | "age"] means string | number, not an object containing both properties. Narrow the union before using methods specific to one member; the lookup does not retain which key produced a particular value.',
          examples: [
            {
              label: "Quick reference — allow either a name or an age",
              language: "typescript",
              code: 'type User = {\n  name: string;\n  age: number;\n  address: { city: string; zip: string };\n};\n\ntype NameOrAge = User["name" | "age"]; // string | number\nconst label: NameOrAge = "Alice";\nconst age: NameOrAge = 30;\nconsole.log(label, age); // "Alice", 30',
            },
            {
              label: "Practical example — narrow the selected value union",
              language: "typescript",
              code: 'type User = {\n  name: string;\n  age: number;\n  address: { city: string; zip: string };\n};\n\ntype NameOrAge = User["name" | "age"];\nfunction describe(value: NameOrAge): string {\n  return typeof value === "string" ? value.toUpperCase() : value.toFixed(0);\n}\n\nconsole.log(describe("Alice"), describe(30)); // "ALICE", "30"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html",
        },
        {
          name: "All property value types",
          explanation:
            "Use T[keyof T] to derive a union of every property value type in an object type. Use this to describe one value drawn from any of its fields.",
          note: "The union contains property types, not a runtime collection of values. Nested objects remain object types rather than being recursively flattened, and optional fields can add undefined. Duplicate member types collapse into one union member.",
          examples: [
            {
              label: "Quick reference — collect possible property value types",
              language: "typescript",
              code: 'type User = {\n  name: string;\n  age: number;\n  address: { city: string; zip: string };\n};\n\ntype UserValues = User[keyof User];\n// string | number | { city: string; zip: string }\n\nconst values: UserValues[] = ["Alice", 30, { city: "Paris", zip: "75000" }];\nconsole.log(values); // ["Alice", 30, { city: "Paris", zip: "75000" }]',
            },
            {
              label:
                "Practical example — handle the nested object as one union member",
              language: "typescript",
              code: 'type User = {\n  name: string;\n  age: number;\n  address: { city: string; zip: string };\n};\n\ntype UserValues = User[keyof User];\nfunction describe(value: UserValues): string {\n  if (typeof value === "object") return `${value.city} ${value.zip}`;\n  return String(value);\n}\n\nconsole.log(describe({ city: "Paris", zip: "75000" })); // "Paris 75000"\nconsole.log(describe(30)); // "30"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html",
        },
        {
          name: "Array element types",
          explanation:
            "Index an array or tuple type with number to obtain its element type. Combine it with typeof to derive element shapes from an existing array value.",
          note: "Names[number] describes the element type and does not read a particular index. For a tuple it forms a union of the positional types. A runtime array access can still return undefined out of bounds, which noUncheckedIndexedAccess models separately.",
          examples: [
            {
              label:
                "Quick reference — derive the element type from a string array",
              language: "typescript",
              code: 'type Names = string[];\ntype Name = Names[number]; // string\n\nconst userName: Name = "Alice";\nconsole.log(userName.toUpperCase()); // "ALICE"',
            },
            {
              label:
                "Practical example — derive an object element shape from a value",
              language: "typescript",
              code: 'const users = [{ name: "Alice", age: 30 }];\ntype User = (typeof users)[number]; // { name: string; age: number }\n\nconst next: User = { name: "Bob", age: 25 };\nconsole.log(next.name, next.age); // "Bob", 25',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html",
        },
        {
          name: "Combining indexed access with as const",
          explanation:
            "Preserve a tuple’s literal element types with as const, then index its type with number to derive the allowed values. Use this when one runtime list should also define a compile-time union.",
          note: "as const (TypeScript 3.4+) makes the inferred tuple readonly and prevents its string literals from widening to string. The union does not validate arbitrary runtime strings, and readonly inference does not freeze the array at runtime.",
          examples: [
            {
              label:
                "Quick reference — derive a role value from a literal tuple",
              language: "typescript",
              code: 'const ROLES = ["admin", "user", "guest"] as const;\ntype Role = (typeof ROLES)[number]; // "admin" | "user" | "guest"\n\nconst role: Role = "admin";\nconsole.log(role.toUpperCase()); // "ADMIN"',
            },
            {
              label:
                "Practical example — require a label for every derived role",
              language: "typescript",
              code: 'const ROLES = ["admin", "user", "guest"] as const;\ntype Role = (typeof ROLES)[number]; // "admin" | "user" | "guest"\n\nconst labels: Record<Role, string> = {\n  admin: "Administrator",\n  user: "Member",\n  guest: "Visitor"\n};\nconsole.log(ROLES.map((role) => labels[role]));\n// ["Administrator", "Member", "Visitor"]',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html",
        },
      ],
      methodCategories: [
        {
          id: "type-assertions",
          name: "Type Assertions (as, satisfies, as const)",
        },
        {
          id: "type-assertions",
          name: "Type Assertions (as, satisfies, as const)",
        },
        {
          id: "type-assertions",
          name: "Type Assertions (as, satisfies, as const)",
        },
        {
          id: "type-assertions",
          name: "Type Assertions (as, satisfies, as const)",
        },
        {
          id: "type-assertions",
          name: "Type Assertions (as, satisfies, as const)",
        },
        {
          id: "type-assertions",
          name: "Type Assertions (as, satisfies, as const)",
        },
        {
          id: "keyof-typeof-indexed-access",
          name: "keyof, typeof & Indexed Access",
        },
        {
          id: "keyof-typeof-indexed-access",
          name: "keyof, typeof & Indexed Access",
        },
        {
          id: "keyof-typeof-indexed-access",
          name: "keyof, typeof & Indexed Access",
        },
        {
          id: "keyof-typeof-indexed-access",
          name: "keyof, typeof & Indexed Access",
        },
        {
          id: "keyof-typeof-indexed-access",
          name: "keyof, typeof & Indexed Access",
        },
        {
          id: "keyof-typeof-indexed-access",
          name: "keyof, typeof & Indexed Access",
        },
        {
          id: "keyof-typeof-indexed-access",
          name: "keyof, typeof & Indexed Access",
        },
        {
          id: "keyof-typeof-indexed-access",
          name: "keyof, typeof & Indexed Access",
        },
        {
          id: "keyof-typeof-indexed-access",
          name: "keyof, typeof & Indexed Access",
        },
        {
          id: "keyof-typeof-indexed-access",
          name: "keyof, typeof & Indexed Access",
        },
      ],
    },
    {
      name: "Advanced Types",
      id: "advanced-types",
      intro: [
        "Built-in generic types for common type transformations. The six quick-reference utilities keep their supplied order, followed by the additional detailed-image utilities. Each snippet defines its own types and should be run independently in a .ts file. Examples are checked with TypeScript 5.9.3, strict checking, exactOptionalPropertyTypes, noUncheckedIndexedAccess, target ES2020, and ES2020/DOM libraries. Awaited requires TypeScript 4.5+ and the string utilities require 4.1+.",
        "Narrow types through runtime checks and control flow, following the detailed image in order. The custom predicate topic includes separate entries for isString and the corrected isUser guard. Run snippets independently in .ts files to keep repeated Shape, area, and helper declarations separate. Examples are checked with TypeScript 5.9.3, strict checking, noUncheckedIndexedAccess, target ES2020, and ES2020/DOM libraries. Property-value checks after in on unknown use TypeScript 4.9+ narrowing.",
        "Transform and construct types programmatically. Entries follow the detailed image in order, giving each named helper its own examples and including the quick-reference forms. Run snippets independently in .ts files. Examples are checked with TypeScript 5.9.3, strict checking, exactOptionalPropertyTypes, noUncheckedIndexedAccess, target ES2020, and ES2020/DOM libraries. Key remapping, template literals, and the recursive route pattern require TypeScript 4.1+.",
      ],
      methods: [
        {
          name: "Partial<T>",
          explanation:
            "Make every top-level property optional. Use Partial<User> to describe a patch containing only the fields a caller wants to update.",
          note: "Partial is shallow and does not supply missing values or validate a patch at runtime. It preserves other property modifiers. With exactOptionalPropertyTypes, optional means the property may be absent; explicit undefined is accepted only if its declared value type includes it.",
          examples: [
            {
              label: "Quick reference — describe a patch with only a name",
              language: "typescript",
              code: 'interface User {\n  id: string;\n  name: string;\n  email: string;\n  password: string;\n  age?: number;\n}\ntype PartialUser = Partial<User>;\nconst patch: PartialUser = { name: "Alicia" };\nconsole.log(patch.name); // "Alicia"',
            },
            {
              label:
                "Practical example — apply a patch by creating a new object",
              language: "typescript",
              code: 'interface User {\n  id: string;\n  name: string;\n  email: string;\n  password: string;\n  age?: number;\n}\nconst user: User = {\n  id: "1", name: "Alice", email: "alice@example.com", password: "demo"\n};\n\nfunction updateUser(user: User, changes: Partial<User>): User {\n  return { ...user, ...changes };\n}\nconst updated = updateUser(user, { name: "Alicia" });\nconsole.log(updated.name, user.name); // "Alicia", "Alice"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype",
        },
        {
          name: "Required<T>",
          explanation:
            "Remove optional modifiers from all top-level properties. Use Required<User> for code that requires age and every other user field to be present.",
          note: "Required is shallow: it changes the contract but does not fill fields or perform validation. The second example supplies the missing age at runtime. Optional-property and undefined behavior depends on the original declaration and compiler settings.",
          examples: [
            {
              label: "Quick reference — include the formerly optional age",
              language: "typescript",
              code: 'interface User {\n  id: string;\n  name: string;\n  email: string;\n  password: string;\n  age?: number;\n}\ntype RequiredUser = Required<User>;\nconst complete: RequiredUser = {\n  id: "1", name: "Alice", email: "alice@example.com", password: "demo", age: 30\n};\nconsole.log(complete.age); // 30',
            },
            {
              label:
                "Practical example — supply a default before returning a required shape",
              language: "typescript",
              code: 'interface User {\n  id: string;\n  name: string;\n  email: string;\n  password: string;\n  age?: number;\n}\nconst user: User = {\n  id: "1", name: "Alice", email: "alice@example.com", password: "demo"\n};\n\nfunction completeUser(user: User, defaultAge: number): Required<User> {\n  return { ...user, age: user.age ?? defaultAge };\n}\nconsole.log(completeUser(user, 18).age); // 18',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype",
        },
        {
          name: "Pick<T, K>",
          explanation:
            "Select a known set of properties while preserving their types and modifiers. Use Pick for smaller views or function inputs that need only part of a model.",
          note: "K must be a key or union of keys from T. Pick describes a type rather than projecting data: assigning a full object to that type does not remove extra runtime fields. Build a new object when the runtime result must contain only the selected fields.",
          examples: [
            {
              label: "Quick reference — select a name and email",
              language: "typescript",
              code: 'interface User {\n  id: string;\n  name: string;\n  email: string;\n  password: string;\n  age?: number;\n}\ntype Contact = Pick<User, "name" | "email">;\nconst contact: Contact = { name: "Alice", email: "alice@example.com" };\nconsole.log(contact.name, contact.email); // "Alice", "alice@example.com"',
            },
            {
              label:
                "Practical example — explicitly project a public user shape",
              language: "typescript",
              code: 'interface User {\n  id: string;\n  name: string;\n  email: string;\n  password: string;\n  age?: number;\n}\nconst user: User = {\n  id: "1", name: "Alice", email: "alice@example.com", password: "demo"\n};\n\ntype PublicUser = Pick<User, "id" | "name" | "email">;\nconst publicUser: PublicUser = { id: user.id, name: user.name, email: user.email };\nconsole.log(publicUser.id, publicUser.name); // "1", "Alice"\nconsole.log("password" in publicUser); // false (the object was projected)',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys",
        },
        {
          name: "Omit<T, K>",
          explanation:
            'Describe a shape without the named keys. Use Omit<User, "password"> for a contract whose consumers should not access a password property.',
          note: "Available since TypeScript 3.5. Omit does not delete properties or sanitize data; a narrower typed view can still reference an object containing the omitted field. The second example creates a separate object without that field. Use Pick to select an allowlist when appropriate.",
          examples: [
            {
              label:
                "Quick reference — observe that a type omission does not remove a field",
              language: "typescript",
              code: 'interface User {\n  id: string;\n  name: string;\n  email: string;\n  password: string;\n  age?: number;\n}\nconst user: User = {\n  id: "1", name: "Alice", email: "alice@example.com", password: "demo"\n};\n\ntype SafeUser = Omit<User, "password">;\nconst view: SafeUser = user;\nconsole.log(view.name); // "Alice"\nconsole.log("password" in view); // true: the runtime object is unchanged.',
            },
            {
              label:
                "Practical example — actually remove a property when building a result",
              language: "typescript",
              code: 'interface User {\n  id: string;\n  name: string;\n  email: string;\n  password: string;\n  age?: number;\n}\nconst user: User = {\n  id: "1", name: "Alice", email: "alice@example.com", password: "demo"\n};\n\nfunction withoutPassword(user: User): Omit<User, "password"> {\n  const { password: _password, ...safeUser } = user;\n  return safeUser;\n}\nconst safeUser = withoutPassword(user);\nconsole.log(safeUser.name); // "Alice"\nconsole.log("password" in safeUser); // false\nconsole.log("password" in user); // true (the input was not mutated)',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys",
        },
        {
          name: "Record<K, V>",
          explanation:
            "Build an object type whose keys are K and whose values are V. Use a finite key union for a complete lookup table, or string keys for an open dictionary.",
          note: "Record does not create entries. A finite union requires every named key, while Record<string, number> allows arbitrary string keys without guaranteeing their presence. noUncheckedIndexedAccess includes undefined for unchecked dictionary lookups.",
          examples: [
            {
              label: "Quick reference — define a numeric dictionary",
              language: "typescript",
              code: 'type Scores = Record<string, number>;\nconst scores: Scores = { Alice: 10, Bob: 20 };\nconsole.log(scores["Alice"]); // 10\nconsole.log(scores["Unknown"] ?? 0); // 0',
            },
            {
              label: "Practical example — require flags for every role",
              language: "typescript",
              code: 'type UserRoles = Record<"admin" | "user" | "guest", boolean>;\nconst roles: UserRoles = { admin: true, user: true, guest: false };\nconsole.log(roles.admin, roles.guest); // true, false',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type",
        },
        {
          name: "Readonly<T>",
          explanation:
            "Make top-level properties readonly through the resulting typed reference. Use Readonly<User> for an API that should read a user without assigning its fields.",
          note: "This is shallow compile-time protection, not Object.freeze(). Nested objects and other mutable references can still change, and Readonly does not clone the original value.",
          examples: [
            {
              label: "Quick reference — expose a user through a readonly view",
              language: "typescript",
              code: 'interface User {\n  id: string;\n  name: string;\n  email: string;\n  password: string;\n  age?: number;\n}\nconst user: User = {\n  id: "1", name: "Alice", email: "alice@example.com", password: "demo"\n};\n\ntype ReadonlyUser = Readonly<User>;\nconst view: ReadonlyUser = user;\nconsole.log(view.name); // "Alice"\n// view.name = "Bob"; // Compile-time error: readonly property.',
            },
            {
              label:
                "Practical example — see updates made through a mutable alias",
              language: "typescript",
              code: 'interface User {\n  id: string;\n  name: string;\n  email: string;\n  password: string;\n  age?: number;\n}\nconst user: User = {\n  id: "1", name: "Alice", email: "alice@example.com", password: "demo"\n};\n\nconst view: Readonly<User> = user;\nuser.name = "Bob";\nconsole.log(view.name); // "Bob" (the same object)\nconsole.log(Object.isFrozen(user)); // false',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype",
        },
        {
          name: "Exclude<T, U>",
          explanation:
            "Remove union members assignable to U from T. Use Exclude to narrow a set of alternatives rather than remove properties from an object.",
          note: "Exclude tests each union member as a whole and does not filter runtime values. For property removal use Omit. Structural matching allows excluding a discriminated union member by its distinguishing field.",
          examples: [
            {
              label: "Quick reference — exclude one literal from a union",
              language: "typescript",
              code: 'type T = "a" | "b" | "c";\ntype AB = Exclude<T, "c">; // "a" | "b"\nconst value: AB = "b";\nconsole.log(value); // "b"',
            },
            {
              label: "Practical example — exclude an error branch",
              language: "typescript",
              code: 'type Result =\n  | { kind: "ok"; value: number }\n  | { kind: "error"; message: string };\ntype Success = Exclude<Result, { kind: "error" }>;\nconst result: Success = { kind: "ok", value: 42 };\nconsole.log(result.value); // 42',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers",
        },
        {
          name: "Extract<T, U>",
          explanation:
            "Keep union members assignable to U. Use Extract when only the overlapping alternatives should remain available in a derived type.",
          note: "Extract operates on complete union members and does not inspect or filter runtime data. If no member matches, the result is never.",
          examples: [
            {
              label: "Quick reference — keep only the shared literal",
              language: "typescript",
              code: 'type T = "a" | "b" | "c";\ntype OnlyA = Extract<T, "a" | "d">; // "a"\nconst value: OnlyA = "a";\nconsole.log(value); // "a"',
            },
            {
              label:
                "Practical example — retain the text and numeric alternatives",
              language: "typescript",
              code: 'type Input = string | number | boolean;\ntype TextOrNumber = Extract<Input, string | number>;\nconst text: TextOrNumber = "ready";\nconst count: TextOrNumber = 42;\nconsole.log(text, count); // "ready", 42',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union",
        },
        {
          name: "NonNullable<T>",
          explanation:
            "Remove null and undefined from a type. Use it for a derived contract that requires a present value after a real check or other established guarantee.",
          note: "NonNullable does not check a value, supply a fallback, or make an unsafe assertion safe. With strict null checking, values must be narrowed before assignment to the resulting non-nullable type.",
          examples: [
            {
              label: "Quick reference — derive a present string type",
              language: "typescript",
              code: 'type MaybeString = NonNullable<string | null | undefined>; // string\nconst text: MaybeString = "hello";\nconsole.log(text.toUpperCase()); // "HELLO"',
            },
            {
              label:
                "Practical example — check presence before returning the narrowed type",
              language: "typescript",
              code: 'type PresentString = NonNullable<string | null | undefined>;\nfunction requireValue(value: string | null | undefined): PresentString {\n  if (value == null) throw new Error("Missing value");\n  return value;\n}\nconsole.log(requireValue("ready")); // "ready"\ntry {\n  requireValue(null);\n} catch (error) {\n  console.log(error instanceof Error ? error.message : "Unknown error");\n} // "Missing value"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype",
        },
        {
          name: "Parameters<T>",
          explanation:
            "Derive a tuple of a function type’s parameters. Use Parameters<typeof fn> to keep an argument tuple or wrapper aligned with an existing function.",
          note: "Optional and rest parameters retain their tuple structure. For overloaded functions, Parameters uses the last overload signature rather than combining every call form. The utility does not call the function or check runtime arguments.",
          examples: [
            {
              label: "Quick reference — construct a matching argument tuple",
              language: "typescript",
              code: 'function createUser(name: string, age: number) {\n  return { name, age };\n}\n\ntype Params = Parameters<typeof createUser>; // [name: string, age: number]\nconst args: Params = ["Alice", 30];\nconsole.log(createUser(...args)); // { name: "Alice", age: 30 }',
            },
            {
              label:
                "Practical example — reuse the parameter contract in a wrapper",
              language: "typescript",
              code: 'function createUser(name: string, age: number) {\n  return { name, age };\n}\n\nfunction createFromArgs(...args: Parameters<typeof createUser>) {\n  return createUser(...args);\n}\nconsole.log(createFromArgs("Bob", 25)); // { name: "Bob", age: 25 }',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype",
        },
        {
          name: "ReturnType<T>",
          explanation:
            "Derive the result type of a function type. Use ReturnType<typeof fn> when consumers should track a factory’s output without duplicating its object shape.",
          note: "ReturnType is a type query and does not execute the function. Overloaded functions use the last overload signature; async functions normally produce Promise<T>, so use Awaited if the resolved value type is needed.",
          examples: [
            {
              label: "Quick reference — derive a factory result",
              language: "typescript",
              code: 'function createUser(name: string, age: number) {\n  return { name, age };\n}\n\ntype Return = ReturnType<typeof createUser>; // { name: string; age: number }\nconst user: Return = createUser("Alice", 30);\nconsole.log(user.name, user.age); // "Alice", 30',
            },
            {
              label: "Practical example — type a consumer from the factory",
              language: "typescript",
              code: 'function createUser(name: string, age: number) {\n  return { name, age };\n}\n\nfunction labelUser(user: ReturnType<typeof createUser>): string {\n  return `${user.name} (${user.age})`;\n}\nconsole.log(labelUser(createUser("Bob", 25))); // "Bob (25)"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype",
        },
        {
          name: "Awaited<T>",
          explanation:
            "Model the resolved type of a promise-like value, recursively unwrapping nested promises. Use it with ReturnType for the data produced by an async API.",
          note: "Available since TypeScript 4.5. Awaited changes a type, not a runtime value: it neither starts asynchronous work nor waits for it. Real promises assimilate nested promises rather than exposing a permanently nested Promise<Promise<T>> result.",
          examples: [
            {
              label: "Quick reference — unwrap a nested promise type",
              language: "typescript",
              code: 'type Data = Awaited<Promise<Promise<string>>>; // string\nconst data: Data = "ready";\nconsole.log(data.toUpperCase()); // "READY"',
            },
            {
              label:
                "Practical example — await a result using its derived data type",
              language: "typescript",
              code: 'async function load(): Promise<string> { return "data"; }\ntype Data = Awaited<ReturnType<typeof load>>; // string\n\nasync function run(): Promise<void> {\n  const data: Data = await load();\n  console.log(data.toUpperCase()); // "DATA"\n}\nrun().catch((error: unknown) => console.error(error));',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype",
        },
        {
          name: "Uppercase<S>",
          explanation:
            "Transform a string literal type into its uppercase form. Use it to define allowed uppercase tokens such as method names.",
          note: "Requires TypeScript 4.1+. This is a compiler intrinsic, not a runtime string conversion. It distributes over literal unions and uses casing rules that are not locale-aware.",
          examples: [
            {
              label: "Quick reference — derive an uppercase literal",
              language: "typescript",
              code: 'type Upper = Uppercase<"hello">; // "HELLO"\nconst message: Upper = "HELLO";\nconsole.log(message); // "HELLO"',
            },
            {
              label: "Practical example — constrain an uppercase method token",
              language: "typescript",
              code: 'type Method = Uppercase<"get" | "post">; // "GET" | "POST"\nfunction describeMethod(method: Method): string {\n  return `${method} /items`;\n}\nconsole.log(describeMethod("GET")); // "GET /items"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#uppercasestringtype",
        },
        {
          name: "Lowercase<S>",
          explanation:
            "Transform a string literal type into its lowercase form. Use it to derive consistent lowercase keys from a known set of tokens.",
          note: "Requires TypeScript 4.1+. Lowercase affects types only and does not change an incoming string. Literal unions are transformed member by member using non-locale-aware casing.",
          examples: [
            {
              label: "Quick reference — derive a lowercase literal",
              language: "typescript",
              code: 'type Lower = Lowercase<"HELLO">; // "hello"\nconst message: Lower = "hello";\nconsole.log(message); // "hello"',
            },
            {
              label: "Practical example — derive lowercase state names",
              language: "typescript",
              code: 'type State = Lowercase<"OPEN" | "CLOSED">; // "open" | "closed"\nconst state: State = "open";\nconsole.log(state); // "open"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#lowercasestringtype",
        },
        {
          name: "Capitalize<S>",
          explanation:
            "Uppercase the first character of a string literal type while leaving the remaining characters unchanged. Use it for derived member names such as onClick.",
          note: "Requires TypeScript 4.1+. Capitalize is not title-casing for every word and has no runtime conversion effect. It can be combined with template literal types to build checked naming conventions.",
          examples: [
            {
              label: "Quick reference — capitalize a literal’s first character",
              language: "typescript",
              code: 'type Cap = Capitalize<"hello">; // "Hello"\nconst message: Cap = "Hello";\nconsole.log(message); // "Hello"',
            },
            {
              label:
                "Practical example — construct allowed event-handler names",
              language: "typescript",
              code: 'type EventName = `on${Capitalize<"click" | "change">}`;\n// "onClick" | "onChange"\nconst eventName: EventName = "onClick";\nconsole.log(eventName); // "onClick"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#capitalizestringtype",
        },
        {
          name: "Uncapitalize<S>",
          explanation:
            "Lowercase the first character of a string literal type while preserving the rest. Use it to derive field names from a known set of initial-capital names.",
          note: "Requires TypeScript 4.1+. Uncapitalize does not lowercase the entire string or modify runtime values. For example, FirstName becomes firstName rather than firstname.",
          examples: [
            {
              label: "Quick reference — lowercase a literal’s first character",
              language: "typescript",
              code: 'type Uncap = Uncapitalize<"Hello">; // "hello"\nconst message: Uncap = "hello";\nconsole.log(message); // "hello"',
            },
            {
              label: "Practical example — derive lower-initial field names",
              language: "typescript",
              code: 'type Field = Uncapitalize<"FirstName" | "LastName">;\n// "firstName" | "lastName"\nconst field: Field = "firstName";\nconsole.log(field); // "firstName"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/utility-types.html#uncapitalizestringtype",
        },
        {
          name: "typeof guards",
          explanation:
            "Use JavaScript typeof checks to narrow primitive alternatives inside control flow. Use this when a value may be a string or number and each needs different operations.",
          note: 'Unlike type-level typeof, these checks run at runtime. An early return lets TypeScript narrow the remaining path. typeof null is "object", and arrays also report "object", so that result alone is not a complete object-shape check.',
          examples: [
            {
              label:
                "Quick reference — narrow both branches of a primitive union",
              language: "typescript",
              code: 'function process(value: string | number): string {\n  if (typeof value === "string") {\n    return value.toUpperCase();\n  }\n  return value.toFixed(2);\n}\nconsole.log(process("hello")); // "HELLO"\nconsole.log(process(3));       // "3.00"',
            },
            {
              label:
                "Practical example — exclude null before accepting an object",
              language: "typescript",
              code: 'function describe(value: unknown): string {\n  if (value !== null && typeof value === "object") {\n    return "Non-null object";\n  }\n  return "Other";\n}\nconsole.log(describe(null)); // "Other"\nconsole.log(describe({}));   // "Non-null object"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#typeof-type-guards",
        },
        {
          name: "instanceof guards",
          explanation:
            "Check a value against a constructor’s prototype chain and narrow it to the corresponding instance type. Use this when handling class instances such as Error.",
          note: "instanceof checks instance identity rather than structural compatibility. Instances from a different realm can have different constructors and fail the check. A caught value is unknown under strict checking and need not be an Error.",
          examples: [
            {
              label:
                "Quick reference — distinguish Error instances from strings",
              language: "typescript",
              code: 'function handle(err: Error | string): string {\n  if (err instanceof Error) return err.message;\n  return err;\n}\nconsole.log(handle(new Error("Offline"))); // "Offline"\nconsole.log(handle("Stopped"));           // "Stopped"',
            },
            {
              label: "Practical example — handle an unknown thrown value",
              language: "typescript",
              code: 'function errorMessage(err: unknown): string {\n  if (err instanceof Error) return err.message;\n  return String(err);\n}\ntry {\n  throw "Stopped";\n} catch (err) {\n  console.log(errorMessage(err)); // "Stopped"\n}',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#instanceof-narrowing",
        },
        {
          name: "in operator guards",
          explanation:
            "Check whether an object has a property and use that information to narrow an object union. Use it to distinguish shapes such as a swimming fish and a flying bird.",
          note: "in includes inherited properties, not only own properties, and its right-hand side must be an object. Presence alone does not establish a property’s value type; optional properties can remain possible in both branches. Checking unknown property values after in uses TypeScript 4.9+ narrowing.",
          examples: [
            {
              label: "Quick reference — select a method from an object union",
              language: "typescript",
              code: 'type Fish = { swim: () => void };\ntype Bird = { fly: () => void };\nfunction move(animal: Fish | Bird): void {\n  if ("swim" in animal) animal.swim();\n  else animal.fly();\n}\nmove({ swim: () => console.log("Swimming") }); // "Swimming"\nmove({ fly: () => console.log("Flying") });   // "Flying"',
            },
            {
              label:
                "Practical example — check both email presence and its type",
              language: "typescript",
              code: 'function readEmail(user: unknown): string {\n  if (typeof user === "object" && user !== null &&\n      "email" in user && typeof user.email === "string") {\n    return user.email;\n  }\n  return "No email";\n}\nconsole.log(readEmail({ email: "alice@example.com" })); // "alice@example.com"\nconsole.log(readEmail({ email: 42 })); // "No email"\nconsole.log(readEmail(null));          // "No email"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-in-operator-narrowing",
        },
        {
          name: "Truthiness narrowing",
          explanation:
            "Use a condition such as if (value) to exclude falsy possibilities on the true branch. Use it only when skipping every falsy value matches the intended behavior.",
          note: 'Truthiness also excludes valid values such as "", 0, false, and NaN, not just null and undefined. The first example intentionally skips the empty string; an explicit null check in the second preserves it.',
          examples: [
            {
              label:
                "Quick reference — understand which string inputs are skipped",
              language: "typescript",
              code: 'function greet(name: string | null): void {\n  if (name) console.log(name.toUpperCase());\n}\ngreet("Alice"); // "ALICE"\ngreet("");      // No output: an empty string is falsy.\ngreet(null);    // No output.',
            },
            {
              label:
                "Practical alternative — preserve an empty string with an explicit check",
              language: "typescript",
              code: 'function greet(name: string | null): void {\n  if (name !== null) console.log(`[${name.toUpperCase()}]`);\n}\ngreet("");      // "[]"\ngreet("Alice"); // "[ALICE]"\ngreet(null);    // No output.',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#truthiness-narrowing",
        },
        {
          name: "Equality narrowing",
          explanation:
            "Use equality checks to refine the possible types of compared values. When two unions overlap only at string, equality establishes that both values are strings in that branch.",
          note: "=== avoids coercion when comparing the union values. An intentional value == null check handles both null and undefined; it does not discard empty strings or zero. Narrowing follows the checked control-flow path.",
          examples: [
            {
              label:
                "Quick reference — narrow equal values to their common type",
              language: "typescript",
              code: 'function compare(a: string | number, b: string | boolean): string {\n  if (a === b) return a.toUpperCase(); // Both are strings here.\n  return "Different";\n}\nconsole.log(compare("hello", "hello")); // "HELLO"\nconsole.log(compare(1, true));          // "Different"',
            },
            {
              label:
                "Practical example — exclude both null and undefined explicitly",
              language: "typescript",
              code: 'function present(value: string | null | undefined): string {\n  if (value == null) return "Missing";\n  return value.toUpperCase();\n}\nconsole.log(present(null));      // "Missing"\nconsole.log(present(undefined)); // "Missing"\nconsole.log(present(""));        // "" (preserved)',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#equality-narrowing",
        },
        {
          name: "Custom type predicate: isString",
          explanation:
            "Declare a boolean-returning guard with value is string so callers can reuse its narrowing behavior. Use it for repeated checks and filtering collections of unknown values.",
          note: "TypeScript trusts the declared predicate; its body must correctly establish the claimed type. An incorrect guard can allow runtime failures. This predicate checks the actual runtime primitive type rather than asserting it.",
          examples: [
            {
              label:
                "Quick reference — narrow an unknown input with a predicate",
              language: "typescript",
              code: 'function isString(value: unknown): value is string {\n  return typeof value === "string";\n}\n\nfunction printValue(value: unknown): void {\n  if (isString(value)) console.log(value.toUpperCase());\n}\nprintValue("hello"); // "HELLO"\nprintValue(42);      // No output.',
            },
            {
              label: "Practical example — filter a collection to string[]",
              language: "typescript",
              code: 'function isString(value: unknown): value is string {\n  return typeof value === "string";\n}\n\nconst values: unknown[] = ["hello", 42, null, "world"];\nconst strings = values.filter(isString); // string[]\nconsole.log(strings.map((value) => value.toUpperCase())); // ["HELLO", "WORLD"]',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates",
        },
        {
          name: "Custom object predicate: isUser",
          explanation:
            "Validate the properties needed to treat an unknown object as a user with a name and email string. Use the guard before reading or transforming those fields.",
          note: "The image checked only property presence, which cannot justify claiming string values. This version checks both types and rejects null. It accepts ordinary objects with matching properties (including inherited ones) and checks neither email format nor unrelated fields.",
          examples: [
            {
              label:
                "Quick reference — validate fields before processing input",
              language: "typescript",
              code: 'function isUser(obj: unknown): obj is { name: string; email: string } {\n  return (\n    typeof obj === "object" && obj !== null &&\n    "name" in obj && typeof obj.name === "string" &&\n    "email" in obj && typeof obj.email === "string"\n  );\n}\n\nfunction processInput(input: unknown): void {\n  if (isUser(input)) console.log(input.name.toUpperCase());\n  else console.log("Invalid user");\n}\nprocessInput({ name: "Alice", email: "a@b.com" }); // "ALICE"\nprocessInput({ name: 42, email: "a@b.com" });      // "Invalid user"',
            },
            {
              label:
                "Practical example — reject malformed entries while filtering",
              language: "typescript",
              code: 'function isUser(obj: unknown): obj is { name: string; email: string } {\n  return (\n    typeof obj === "object" && obj !== null &&\n    "name" in obj && typeof obj.name === "string" &&\n    "email" in obj && typeof obj.email === "string"\n  );\n}\n\nconst inputs: unknown[] = [\n  { name: "Alice", email: "a@b.com" },\n  { name: "Bob", email: 42 },\n  { name: "Missing email" },\n  null\n];\nconst users = inputs.filter(isUser);\nconsole.log(users.map((user) => user.name)); // ["Alice"]',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates",
        },
        {
          name: "Discriminated unions",
          explanation:
            "Give each union member a distinct literal tag and branch on that tag to expose its own fields. Use this for variants that share a common kind property but carry different data.",
          note: "Every member must use a compatible discriminant field with distinct literal values for reliable narrowing. Checking kind selects the member’s type but does not validate an arbitrary external object’s remaining properties. The switch and if forms below provide the same kind of refinement.",
          examples: [
            {
              label: "Quick reference — narrow variants in a switch",
              language: "typescript",
              code: 'type Shape =\n  | { kind: "circle"; radius: number }\n  | { kind: "square"; size: number };\n\nfunction area(shape: Shape): number {\n  switch (shape.kind) {\n    case "circle": return Math.PI * shape.radius ** 2;\n    case "square": return shape.size ** 2;\n  }\n}\nconsole.log(area({ kind: "circle", radius: 2 }).toFixed(2)); // "12.57"\nconsole.log(area({ kind: "square", size: 3 }));              // 9',
            },
            {
              label:
                "Practical example — access variant-specific fields in an if branch",
              language: "typescript",
              code: 'type Shape =\n  | { kind: "circle"; radius: number }\n  | { kind: "square"; size: number };\n\nfunction describe(shape: Shape): string {\n  if (shape.kind === "circle") return `Circle r=${shape.radius}`;\n  return `Square size=${shape.size}`;\n}\nconsole.log(describe({ kind: "circle", radius: 2 })); // "Circle r=2"\nconsole.log(describe({ kind: "square", size: 3 }));   // "Square size=3"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions",
        },
        {
          name: "Exhaustiveness checks with never",
          explanation:
            "Require the value remaining after all expected cases to have type never. Use an assertNever helper so adding an unhandled union member produces a compile-time error at the missing-case check.",
          note: "Once every variant is handled, no value should remain. If Shape gains a new kind, the remaining value is no longer assignable to never. assertNever also throws if unexpected runtime data reaches it, but it is not a full input validator.",
          examples: [
            {
              label: "Quick reference — require complete switch coverage",
              language: "typescript",
              code: 'type Shape =\n  | { kind: "circle"; radius: number }\n  | { kind: "square"; size: number };\n\nfunction assertNever(x: never): never {\n  throw new Error("Unexpected: " + x);\n}\n\nfunction area(shape: Shape): number {\n  switch (shape.kind) {\n    case "circle": return Math.PI * shape.radius ** 2;\n    case "square": return shape.size ** 2;\n    default: return assertNever(shape);\n  }\n}\nconsole.log(area({ kind: "square", size: 4 })); // 16\n// Adding a new Shape variant requires adding a case before assertNever().',
            },
            {
              label:
                "Practical example — check exhaustiveness after early returns",
              language: "typescript",
              code: 'type Shape =\n  | { kind: "circle"; radius: number }\n  | { kind: "square"; size: number };\n\nfunction assertNever(x: never): never {\n  throw new Error("Unexpected: " + x);\n}\n\nfunction describe(shape: Shape): string {\n  if (shape.kind === "circle") return `Circle r=${shape.radius}`;\n  if (shape.kind === "square") return `Square size=${shape.size}`;\n  return assertNever(shape);\n}\nconsole.log(describe({ kind: "circle", radius: 2 })); // "Circle r=2"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking",
        },
        {
          name: "Optional<T> — mapped properties",
          explanation:
            "Map over keyof T and add ? to make each property optional. Use this custom mapped type to understand how Partial<T> describes partial object shapes.",
          note: "K represents one key at a time, and T[K] preserves its value type. The transformation is shallow, preserves existing readonly modifiers, and creates no runtime defaults. exactOptionalPropertyTypes distinguishes a missing field from an explicitly undefined value.",
          examples: [
            {
              label: "Quick reference — make every field optional",
              language: "typescript",
              code: 'type Optional<T> = { [K in keyof T]?: T[K] };\n\ntype User = { name: string; age: number };\nconst patch: Optional<User> = { name: "Alice" };\nconsole.log(patch.name); // "Alice"',
            },
            {
              label:
                "Practical example — retain readonly while allowing omitted fields",
              language: "typescript",
              code: 'type Optional<T> = { [K in keyof T]?: T[K] };\n\ntype User = { readonly id: string; name: string };\nconst patch: Optional<User> = { id: "1" };\npatch.name = "Alice";\nconsole.log(patch.id, patch.name); // "1", "Alice"\n// patch.id = "2"; // Error: readonly is preserved.',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html",
        },
        {
          name: "ReadonlyAll<T> — mapped readonly modifiers",
          explanation:
            "Add readonly to each mapped property while retaining its value type. Use this to understand the mapped-type form of Readonly<T>.",
          note: "This protects assignments through the resulting type; it neither freezes nor clones runtime data. Object-property transformation is shallow, so nested mutable objects and other mutable aliases can still change.",
          examples: [
            {
              label: "Quick reference — derive a readonly object view",
              language: "typescript",
              code: 'type ReadonlyAll<T> = { readonly [K in keyof T]: T[K] };\n\ntype User = { name: string; age: number };\nconst user: ReadonlyAll<User> = { name: "Alice", age: 30 };\nconsole.log(user.name, user.age); // "Alice", 30\n// user.age = 31; // Error: readonly property.',
            },
            {
              label:
                "Practical example — observe the limits of shallow readonly",
              language: "typescript",
              code: 'type ReadonlyAll<T> = { readonly [K in keyof T]: T[K] };\n\ntype User = { profile: { name: string } };\nconst user: ReadonlyAll<User> = { profile: { name: "Alice" } };\nuser.profile.name = "Bob"; // Allowed: the nested name is not readonly.\nconsole.log(user.profile.name); // "Bob"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers",
        },
        {
          name: "Nullable<T> — mapped value transformations",
          explanation:
            "Add null to every mapped property’s value type. Use it when a known object shape should retain its fields but allow explicit empty values.",
          note: "Adding null does not make a required property optional and does not recursively change nested fields. Existing optional and readonly modifiers are retained. The type does not fill missing fields or check incoming data.",
          examples: [
            {
              label:
                "Quick reference — allow null while keeping fields required",
              language: "typescript",
              code: "type Nullable<T> = { [K in keyof T]: T[K] | null };\n\ntype User = { name: string; age: number };\nconst user: Nullable<User> = { name: null, age: 30 };\nconsole.log(user.name, user.age); // null, 30",
            },
            {
              label: "Practical example — handle nullable fields with defaults",
              language: "typescript",
              code: 'type Nullable<T> = { [K in keyof T]: T[K] | null };\n\ntype User = { name: string; age: number };\nfunction describe(user: Nullable<User>): string {\n  return `${user.name ?? "Anonymous"}: ${user.age ?? 0}`;\n}\nconsole.log(describe({ name: null, age: null })); // "Anonymous: 0"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html",
        },
        {
          name: "Getters<T> — key remapping with as",
          explanation:
            "Rename mapped keys with an as clause and template literal, producing a getter signature for each selected property. Use this to derive API shapes such as getName() and getAge() from a model.",
          note: "Key remapping and template literal types require TypeScript 4.1+. string & K keeps string keys suitable for Capitalize and drops number/symbol keys from this pattern. These signatures do not generate getter implementations; the examples supply real functions.",
          examples: [
            {
              label:
                "Quick reference — derive and implement named getter methods",
              language: "typescript",
              code: 'type Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];\n};\n\ntype User = { name: string; age: number };\ntype UserGetters = Getters<User>;\nconst getters: UserGetters = { getName: () => "Alice", getAge: () => 30 };\nconsole.log(getters.getName(), getters.getAge()); // "Alice", 30',
            },
            {
              label:
                "Practical example — return current data through generated signatures",
              language: "typescript",
              code: 'type Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];\n};\n\ntype User = { name: string; age: number };\nconst user: User = { name: "Alice", age: 30 };\nconst getters: Getters<User> = {\n  getName: () => user.name,\n  getAge: () => user.age\n};\nuser.age = 31;\nconsole.log(getters.getAge()); // 31 (the closure reads current state)',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as",
        },
        {
          name: "OnlyStrings<T> — filter mapped keys",
          explanation:
            "Remap a key to itself when its value type extends string, or to never to omit it. Use this to derive the string-valued subset of an object shape.",
          note: "The check applies to each whole property type; string | number does not extend string. Under strict null checking an optional string includes undefined and is also omitted by this exact pattern. Filtering types does not remove properties from runtime objects.",
          examples: [
            {
              label: "Quick reference — keep only string-valued properties",
              language: "typescript",
              code: 'type OnlyStrings<T> = {\n  [K in keyof T as T[K] extends string ? K : never]: T[K];\n};\n\ntype User = { name: string; age: number; email: string };\nconst contact: OnlyStrings<User> = { name: "Alice", email: "a@b.com" };\nconsole.log(contact.name, contact.email); // "Alice", "a@b.com"',
            },
            {
              label:
                "Practical example — see why optional and mixed properties are excluded",
              language: "typescript",
              code: 'type OnlyStrings<T> = {\n  [K in keyof T as T[K] extends string ? K : never]: T[K];\n};\n\ntype Model = { title?: string; status: "ready"; code: string | number; count: number };\ntype TextFields = OnlyStrings<Model>; // { status: "ready" }\nconst text: TextFields = { status: "ready" };\nconsole.log(text.status); // "ready"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as",
        },
        {
          name: "IsString<T> — conditional types",
          explanation:
            "Choose one type or another according to assignability with T extends U ? X : Y. Use this conditional type to compute whether a supplied type is assignable to string.",
          note: "This extends is a type-level assignability test, not class inheritance or runtime validation. A checked bare type parameter distributes over union members, so a mixed string/number union produces true | false rather than one combined answer.",
          examples: [
            {
              label: "Quick reference — compute literal boolean result types",
              language: "typescript",
              code: 'type IsString<T> = T extends string ? true : false;\n\ntype A = IsString<"hello">; // true\ntype B = IsString<42>;      // false\nconst a: A = true;\nconst b: B = false;\nconsole.log(a, b); // true, false',
            },
            {
              label:
                "Practical example — observe distribution over a mixed union",
              language: "typescript",
              code: "type IsString<T> = T extends string ? true : false;\n\ntype Mixed = IsString<string | number>; // true | false (boolean)\nconst yes: Mixed = true;\nconst no: Mixed = false;\nconsole.log(yes, no); // true, false",
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html",
        },
        {
          name: "ToArray<T> — distributive conditional types",
          explanation:
            "Apply a conditional type separately to each member of a union by checking a bare type parameter. Use this to produce a union of homogeneous array types rather than one array of union values.",
          note: "ToArray<string | number> is string[] | number[], so a mixed array is not accepted. Wrap both sides of extends in tuples to disable distribution, as in the variation. These types neither construct arrays nor inspect their runtime elements.",
          examples: [
            {
              label:
                "Quick reference — distribute the array transformation across a union",
              language: "typescript",
              code: 'type ToArray<T> = T extends any ? T[] : never;\n\ntype Result = ToArray<string | number>; // string[] | number[]\nconst words: Result = ["hello", "world"];\nconst numbers: Result = [1, 2];\nconsole.log(words, numbers); // ["hello", "world"], [1, 2]',
            },
            {
              label:
                "Practical variation — transform the whole union without distribution",
              language: "typescript",
              code: 'type ToArray<T> = [T] extends [any] ? T[] : never;\ntype Result = ToArray<string | number>; // (string | number)[]\nconst values: Result = ["hello", 42];\nconsole.log(values); // ["hello", 42]',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types",
        },
        {
          name: "ElementOf<T> — infer an array element",
          explanation:
            "Introduce an inferred type variable in a conditional pattern to extract an array’s element type. Use it to derive element types while returning never for nonmatching inputs.",
          note: "infer is available only in the extends pattern of a conditional type. The image’s mutable-array pattern does not match readonly arrays or tuples; the variation includes readonly to accept both. Extraction is type-level and does not read an array element.",
          examples: [
            {
              label:
                "Quick reference — extract the element type of a mutable array",
              language: "typescript",
              code: "type ElementOf<T> = T extends (infer E)[] ? E : never;\n\ntype Num = ElementOf<number[]>; // number\nconst value: Num = 42;\nconsole.log(value); // 42",
            },
            {
              label:
                "Practical variation — support readonly tuples and retain literal elements",
              language: "typescript",
              code: "type ElementOf<T> = T extends readonly (infer E)[] ? E : never;\nconst point = [10, 20] as const;\ntype Coordinate = ElementOf<typeof point>; // 10 | 20\nconst value: Coordinate = 20;\nconsole.log(value); // 20",
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types",
        },
        {
          name: "UnwrapPromise<T> — infer a promise value",
          explanation:
            "Extract the value type of one Promise layer, or retain the original type when it is not a Promise. Use this helper to understand conditional inference around asynchronous results.",
          note: "This helper unwraps exactly one layer and matches Promise, unlike the recursive promise-like behavior of Awaited. It does not wait for or execute anything. Real promise resolution assimilates nested promises; the nested example is a type illustration whose one-layer result is still Promise<string>.",
          examples: [
            {
              label: "Quick reference — extract a string from a promise type",
              language: "typescript",
              code: 'type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;\n\ntype Data = UnwrapPromise<Promise<string>>; // string\nconst data: Data = "hello";\nconsole.log(data.toUpperCase()); // "HELLO"',
            },
            {
              label:
                "Practical example — a single extraction leaves a nested promise type",
              language: "typescript",
              code: 'type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;\n\ntype Nested = UnwrapPromise<Promise<Promise<string>>>; // Promise<string>\nconst pending: Nested = Promise.resolve("data");\npending.then(\n  (value) => console.log(value.toUpperCase()), // "DATA"\n  (error: unknown) => console.error(error)\n);',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types",
        },
        {
          name: "MyReturnType<T> — infer a function result",
          explanation:
            "Match a callable type and infer the type after =>. Use this simplified helper to understand how conditional inference extracts function result types.",
          note: "This is not a complete replacement for the built-in ReturnType constraint: nonfunction inputs become never rather than being rejected as invalid type arguments. For overloaded functions, inference uses the last overload signature, not call-site overload resolution. The type does not call the function.",
          examples: [
            {
              label: "Quick reference — derive a factory’s result shape",
              language: "typescript",
              code: 'type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;\n\nfunction createUser(name: string, age: number) { return { name, age }; }\ntype UserResult = MyReturnType<typeof createUser>;\nconst user: UserResult = createUser("Alice", 30);\nconsole.log(user.name, user.age); // "Alice", 30',
            },
            {
              label: "Practical example — understand last-overload inference",
              language: "typescript",
              code: "type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;\n\nfunction parse(value: string): string;\nfunction parse(value: number): number;\nfunction parse(value: string | number): string | number { return value; }\n\ntype LastResult = MyReturnType<typeof parse>; // number\nconst result: LastResult = 42;\nconsole.log(result); // 42",
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types",
        },
        {
          name: "Template literal types — combine unions",
          explanation:
            "Interpolate literal unions in a type-level template to construct every string combination. Use this for checked naming conventions such as color-size class names.",
          note: "Template literal types require TypeScript 4.1+. The three colors and three sizes yield nine possible ClassName values. The type does not generate runtime strings; large cross-products can make compiler work expensive.",
          examples: [
            {
              label: "Quick reference — select a valid color-size combination",
              language: "typescript",
              code: 'type Color = "red" | "blue" | "green";\ntype Size = "sm" | "md" | "lg";\ntype ClassName = `${Color}-${Size}`;\n\nconst className: ClassName = "red-sm";\nconsole.log(className); // "red-sm"',
            },
            {
              label:
                "Practical example — construct a value from constrained inputs",
              language: "typescript",
              code: 'type Color = "red" | "blue" | "green";\ntype Size = "sm" | "md" | "lg";\ntype ClassName = `${Color}-${Size}`;\n\nfunction variant(color: Color, size: Size): ClassName {\n  return `${color}-${size}`;\n}\nconsole.log(variant("blue", "lg")); // "blue-lg"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html",
        },
        {
          name: "Template literal types — event names",
          explanation:
            "Combine a string prefix with Capitalize to derive event-handler names. Use this to keep names such as onClick and onFocus aligned with a small set of events.",
          note: "Capitalize is a compiler intrinsic introduced with TypeScript 4.1; it changes the type’s first character rather than converting runtime text. Derived names do not create functions, so the second example supplies implementations explicitly.",
          examples: [
            {
              label:
                "Quick reference — derive names from the quick-reference event union",
              language: "typescript",
              code: 'type EventName = `on${Capitalize<"click" | "focus">}`;\n// "onClick" | "onFocus"\nconst handler: EventName = "onClick";\nconsole.log(handler); // "onClick"',
            },
            {
              label:
                "Practical example — implement every name in the detailed event union",
              language: "typescript",
              code: 'type EventName = `on${Capitalize<"click" | "focus" | "blur">}`;\nconst handlers: Record<EventName, () => string> = {\n  onClick: () => "clicked",\n  onFocus: () => "focused",\n  onBlur: () => "blurred"\n};\nconsole.log(handlers.onBlur()); // "blurred"',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#intrinsic-string-manipulation-types",
        },
        {
          name: "ExtractRoute<T> — template pattern matching",
          explanation:
            "Match a slash-prefixed literal string and recursively infer its segments into a union. Use this specialized type to derive allowed segment names from simple known route literals.",
          note: "This is not a runtime URL parser: the union loses ordering and duplicate segments, and values must still be supplied or parsed at runtime. The exact pattern retains empty segments for root, repeated, or trailing slashes and does not remove queries or fragments. Non-slash-prefixed inputs produce never; very deep recursion can hit compiler limits.",
          examples: [
            {
              label:
                "Quick reference — extract a union from a known route literal",
              language: "typescript",
              code: 'type ExtractRoute<T> =\n  T extends `/${infer Segment}/${infer Rest}`\n    ? Segment | ExtractRoute<`/${Rest}`>\n    : T extends `/${infer Segment}`\n      ? Segment\n      : never;\n\ntype Segments = ExtractRoute<"/users/profile/settings">;\n// "users" | "profile" | "settings"\nconst segments: Segments[] = ["users", "profile", "settings"];\nconsole.log(segments); // ["users", "profile", "settings"]\n// This array was supplied explicitly; the type did not parse it at runtime.',
            },
            {
              label: "Practical example — understand the root-path edge case",
              language: "typescript",
              code: 'type ExtractRoute<T> =\n  T extends `/${infer Segment}/${infer Rest}`\n    ? Segment | ExtractRoute<`/${Rest}`>\n    : T extends `/${infer Segment}`\n      ? Segment\n      : never;\n\ntype Single = ExtractRoute<"/users">; // "users"\ntype Root = ExtractRoute<"/">;        // "" (empty segment)\nconst segment: Single = "users";\nconst root: Root = "";\nconsole.log(segment, root); // "users", ""',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html",
        },
      ],
      methodCategories: [
        {
          id: "utility-types",
          name: "Utility Types",
        },
        {
          id: "utility-types",
          name: "Utility Types",
        },
        {
          id: "utility-types",
          name: "Utility Types",
        },
        {
          id: "utility-types",
          name: "Utility Types",
        },
        {
          id: "utility-types",
          name: "Utility Types",
        },
        {
          id: "utility-types",
          name: "Utility Types",
        },
        {
          id: "utility-types",
          name: "Utility Types",
        },
        {
          id: "utility-types",
          name: "Utility Types",
        },
        {
          id: "utility-types",
          name: "Utility Types",
        },
        {
          id: "utility-types",
          name: "Utility Types",
        },
        {
          id: "utility-types",
          name: "Utility Types",
        },
        {
          id: "utility-types",
          name: "Utility Types",
        },
        {
          id: "utility-types",
          name: "Utility Types",
        },
        {
          id: "utility-types",
          name: "Utility Types",
        },
        {
          id: "utility-types",
          name: "Utility Types",
        },
        {
          id: "utility-types",
          name: "Utility Types",
        },
        {
          id: "type-guards-narrowing",
          name: "Type Guards & Narrowing",
        },
        {
          id: "type-guards-narrowing",
          name: "Type Guards & Narrowing",
        },
        {
          id: "type-guards-narrowing",
          name: "Type Guards & Narrowing",
        },
        {
          id: "type-guards-narrowing",
          name: "Type Guards & Narrowing",
        },
        {
          id: "type-guards-narrowing",
          name: "Type Guards & Narrowing",
        },
        {
          id: "type-guards-narrowing",
          name: "Type Guards & Narrowing",
        },
        {
          id: "type-guards-narrowing",
          name: "Type Guards & Narrowing",
        },
        {
          id: "type-guards-narrowing",
          name: "Type Guards & Narrowing",
        },
        {
          id: "type-guards-narrowing",
          name: "Type Guards & Narrowing",
        },
        {
          id: "mapped-conditional-template-literal-types",
          name: "Mapped, Conditional & Template Literal Types",
        },
        {
          id: "mapped-conditional-template-literal-types",
          name: "Mapped, Conditional & Template Literal Types",
        },
        {
          id: "mapped-conditional-template-literal-types",
          name: "Mapped, Conditional & Template Literal Types",
        },
        {
          id: "mapped-conditional-template-literal-types",
          name: "Mapped, Conditional & Template Literal Types",
        },
        {
          id: "mapped-conditional-template-literal-types",
          name: "Mapped, Conditional & Template Literal Types",
        },
        {
          id: "mapped-conditional-template-literal-types",
          name: "Mapped, Conditional & Template Literal Types",
        },
        {
          id: "mapped-conditional-template-literal-types",
          name: "Mapped, Conditional & Template Literal Types",
        },
        {
          id: "mapped-conditional-template-literal-types",
          name: "Mapped, Conditional & Template Literal Types",
        },
        {
          id: "mapped-conditional-template-literal-types",
          name: "Mapped, Conditional & Template Literal Types",
        },
        {
          id: "mapped-conditional-template-literal-types",
          name: "Mapped, Conditional & Template Literal Types",
        },
        {
          id: "mapped-conditional-template-literal-types",
          name: "Mapped, Conditional & Template Literal Types",
        },
        {
          id: "mapped-conditional-template-literal-types",
          name: "Mapped, Conditional & Template Literal Types",
        },
        {
          id: "mapped-conditional-template-literal-types",
          name: "Mapped, Conditional & Template Literal Types",
        },
      ],
    },
    {
      name: "Decorators",
      id: "decorators",
      intro:
        "Annotate or modify classes and their members using the standard decorator model supported since TypeScript 5.0. Topics follow the detailed image in order and include the quick-reference logging example. Keep experimentalDecorators false or omitted; true selects the incompatible legacy model. This mode does not support parameter decorators or legacy emitDecoratorMetadata. Compile each snippet independently with a transform-capable compiler using the configuration below; examples are checked with TypeScript 5.9.3. Do not paste raw decorator syntax directly into a browser script.",
      setup: [
        {
          label:
            "tsconfig.json — standard decorators (compile each example in a separate project)",
          language: "json",
          code: '{\n  "compilerOptions": {\n    "target": "ES2020",\n    "module": "CommonJS",\n    "lib": [\n      "ES2020",\n      "DOM",\n      "ESNext.Decorators"\n    ],\n    "strict": true,\n    "experimentalDecorators": false,\n    "emitDecoratorMetadata": false,\n    "useDefineForClassFields": true\n  }\n}',
        },
      ],
      methods: [
        {
          name: "Method decorator: log",
          explanation:
            "Wrap a method by returning a replacement function from a standard decorator. Use this to add logging while preserving the method’s receiver, argument types, and result type.",
          note: "The decorator is applied during class definition; its replacement runs on calls. An explicit this annotation fixes the quick-reference snippet under strict checking, and target.apply(this, args) preserves the receiver. The detailed wrapper logs a normal return, not a thrown exception or a promise’s eventual resolution; it returns the original result unchanged.",
          examples: [
            {
              label:
                "Quick reference — log method calls without changing their result",
              language: "typescript",
              code: 'function log<This, Args extends unknown[], Result>(\n  target: (this: This, ...args: Args) => Result,\n  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Result>\n) {\n  return function(this: This, ...args: Args): Result {\n    console.log(`Calling ${String(context.name)}`);\n    return target.apply(this, args);\n  };\n}\n\nclass Api {\n  @log\n  getUsers(): string[] { return []; }\n}\nconsole.log(new Api().getUsers()); // "Calling getUsers", then []',
            },
            {
              label:
                "Detailed example — log arguments and a synchronous result",
              language: "typescript",
              code: 'function log<This, Args extends unknown[], Result>(\n  target: (this: This, ...args: Args) => Result,\n  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Result>\n) {\n  return function(this: This, ...args: Args): Result {\n    console.log(`→ ${String(context.name)}(${args.join(", ")})`);\n    const result = target.apply(this, args);\n    console.log(`← ${String(context.name)} returned`, result);\n    return result;\n  };\n}\n\nclass MathService {\n  bias = 0;\n  @log\n  add(a: number, b: number): number { return this.bias + a + b; }\n}\nnew MathService().add(2, 3);\n// "→ add(2, 3)", then "← add returned", 5',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#decorators",
        },
        {
          name: "Class decorator: sealed",
          explanation:
            "Apply a decorator to a class constructor and use its context to schedule final setup. This example seals the constructor and prototype after class initialization completes.",
          note: "Class addInitializer callbacks run after static fields are initialized, avoiding premature sealing during decorator application. Object.seal prevents adding or removing properties on the sealed objects but does not freeze writable values, seal instances, or prohibit subclasses. The name sealed does not make a class final.",
          examples: [
            {
              label:
                "Quick reference — seal the class and prototype, not its instances",
              language: "typescript",
              code: "function sealed<T extends abstract new (...args: any[]) => object>(\n  _target: T, context: ClassDecoratorContext<T>\n): void {\n  context.addInitializer(function() {\n    Object.seal(this);\n    Object.seal(this.prototype);\n  });\n}\n\n@sealed\nclass BankAccount { balance = 0; }\n\nconst account = new BankAccount();\naccount.balance = 20;\nconsole.log(Object.isSealed(BankAccount));           // true\nconsole.log(Object.isSealed(BankAccount.prototype)); // true\nconsole.log(Object.isSealed(account), account.balance); // false, 20",
            },
            {
              label:
                "Practical example — initialize static fields and still allow inheritance",
              language: "typescript",
              code: 'function sealed<T extends abstract new (...args: any[]) => object>(\n  _target: T, context: ClassDecoratorContext<T>\n): void {\n  context.addInitializer(function() {\n    Object.seal(this);\n    Object.seal(this.prototype);\n  });\n}\n\n@sealed\nclass BankAccount {\n  static currency = "USD";\n  balance = 0;\n}\nclass PremiumAccount extends BankAccount { fee = 1; }\nconst account = new PremiumAccount();\nconsole.log(BankAccount.currency, account.fee); // "USD", 1\nconsole.log(Reflect.defineProperty(BankAccount.prototype, "extra", { value: 1 })); // false',
            },
          ],
          source:
            "https://github.com/tc39/proposal-decorators#adding-initialization-logic-with-addinitializer",
        },
        {
          name: "Field decorator: min",
          explanation:
            "Return a field initializer that checks or transforms the field’s initial value. Use it for validation of declared field initializers during instance construction.",
          note: "A field decorator receives undefined, not the field value; the returned function receives the initial value. It runs before constructor-body assignments, so the image’s uninitialized price followed by this.price = price would not validate that argument. These examples initialize price directly, reject non-finite values, and show that later assignments are not intercepted.",
          examples: [
            {
              label:
                "Quick reference — validate initialization and observe later-write limits",
              language: "typescript",
              code: "function min(minValue: number) {\n  return function<This>(\n    _target: undefined, context: ClassFieldDecoratorContext<This, number>\n  ) {\n    return function(this: This, initialValue: number): number {\n      if (!Number.isFinite(initialValue) || initialValue < minValue) {\n        throw new RangeError(`${String(context.name)} must be >= ${minValue}`);\n      }\n      return initialValue;\n    };\n  };\n}\n\nclass Product {\n  @min(0)\n  price = 10;\n}\nconst product = new Product();\nconsole.log(product.price); // 10\nproduct.price = -1;         // Allowed: this is a later assignment.\nconsole.log(product.price); // -1",
            },
            {
              label:
                "Practical example — reject an invalid initializer on construction",
              language: "typescript",
              code: 'function min(minValue: number) {\n  return function<This>(\n    _target: undefined, context: ClassFieldDecoratorContext<This, number>\n  ) {\n    return function(this: This, initialValue: number): number {\n      if (!Number.isFinite(initialValue) || initialValue < minValue) {\n        throw new RangeError(`${String(context.name)} must be >= ${minValue}`);\n      }\n      return initialValue;\n    };\n  };\n}\n\nclass Product {\n  @min(0)\n  price = -1;\n}\ntry {\n  new Product();\n} catch (error) {\n  console.log(error instanceof Error ? error.message : "Unknown error");\n} // "price must be >= 0"',
            },
          ],
          source: "https://github.com/tc39/proposal-decorators#class-fields",
        },
        {
          name: "Decorator factory: validate",
          explanation:
            "Call a factory to configure and return a decorator, then validate inputs in its replacement method. Use this to reuse a range rule across methods with different limits.",
          note: "Unlike the image’s placeholder, this implementation performs real checks on every call and throws before the original method runs. It is intentionally limited to methods taking one numeric argument, with finite values and inclusive min/max bounds. The factory runs during class setup; the returned wrapper performs per-call validation.",
          examples: [
            {
              label: "Quick reference — configure an inclusive numeric range",
              language: "typescript",
              code: "function validate(schema: { min?: number; max?: number }) {\n  return function<This, Result>(\n    target: (this: This, value: number) => Result,\n    context: ClassMethodDecoratorContext<This, (this: This, value: number) => Result>\n  ) {\n    return function(this: This, value: number): Result {\n      if (!Number.isFinite(value) ||\n          (schema.min !== undefined && value < schema.min) ||\n          (schema.max !== undefined && value > schema.max)) {\n        throw new RangeError(`${String(context.name)}: value out of range`);\n      }\n      return target.call(this, value);\n    };\n  };\n}\n\nclass MathService {\n  factor = 2;\n  @validate({ min: 0, max: 100 })\n  scale(value: number): number { return value * this.factor; }\n}\nconsole.log(new MathService().scale(50)); // 100",
            },
            {
              label:
                "Practical example — keep state unchanged when validation fails",
              language: "typescript",
              code: 'function validate(schema: { min?: number; max?: number }) {\n  return function<This, Result>(\n    target: (this: This, value: number) => Result,\n    context: ClassMethodDecoratorContext<This, (this: This, value: number) => Result>\n  ) {\n    return function(this: This, value: number): Result {\n      if (!Number.isFinite(value) ||\n          (schema.min !== undefined && value < schema.min) ||\n          (schema.max !== undefined && value > schema.max)) {\n        throw new RangeError(`${String(context.name)}: value out of range`);\n      }\n      return target.call(this, value);\n    };\n  };\n}\n\nclass RatingService {\n  rating = 0;\n  @validate({ min: 1, max: 5 })\n  setRating(value: number): void { this.rating = value; }\n}\nconst service = new RatingService();\nservice.setRating(3);\ntry {\n  service.setRating(0);\n} catch (error) {\n  console.log(error instanceof Error ? error.message : "Unknown error");\n} // "setRating: value out of range"\nconsole.log(service.rating); // 3',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#decorators",
        },
        {
          name: "Common use cases",
          explanation:
            "Decorators can centralize logging, caching, validation, access checks, and timing around class behavior. Use them when the repeated behavior stays understandable and its state, error handling, and lifetime are explicit.",
          note: "The numeric cache below is per instance and has no eviction policy; it assumes a result remains valid for a given argument. The timing wrapper measures synchronous execution only, and its permission flag is an illustrative check rather than a complete authorization system. Frameworks named in the image—NestJS, Angular, TypeORM, and MikroORM—have their own APIs and version-dependent decorator requirements; these standard-mode examples are standalone, not framework adapters.",
          examples: [
            {
              label:
                "Practical example — cache a numeric result separately for each instance",
              language: "typescript",
              code: "function cached<This extends object>(\n  target: (this: This, value: number) => number,\n  _context: ClassMethodDecoratorContext<This, (this: This, value: number) => number>\n) {\n  const cache = new WeakMap<This, Map<number, number>>();\n  return function(this: This, value: number): number {\n    let entries = cache.get(this);\n    if (!entries) { entries = new Map(); cache.set(this, entries); }\n    if (entries.has(value)) return entries.get(value)!;\n    const result = target.call(this, value);\n    entries.set(value, result);\n    return result;\n  };\n}\nclass MathService {\n  calls = 0;\n  @cached\n  square(value: number): number { this.calls += 1; return value ** 2; }\n}\nconst service = new MathService();\nconsole.log(service.square(3), service.square(3), service.calls); // 9, 9, 1",
            },
            {
              label:
                "Practical example — gate a call and time synchronous execution",
              language: "typescript",
              code: 'function checked<This extends { allowed: boolean }, Args extends unknown[], Result>(\n  target: (this: This, ...args: Args) => Result,\n  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Result>\n) {\n  return function(this: This, ...args: Args): Result {\n    if (!this.allowed) throw new Error("Access denied");\n    const start = performance.now();\n    try { return target.apply(this, args); }\n    finally { console.log(`${String(context.name)} elapsed ms`, performance.now() - start); }\n  };\n}\nclass Api {\n  allowed = true;\n  @checked\n  getUsers(): string[] { return ["Alice"]; }\n}\nconst api = new Api();\nconsole.log(api.getUsers()); // Logs elapsed milliseconds, then ["Alice"].\napi.allowed = false;\ntry { api.getUsers(); }\ncatch (error) { console.log(error instanceof Error ? error.message : "Unknown error"); }\n// "Access denied"; the target is not invoked.',
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#decorators",
        },
      ],
    },
    {
      name: "Modules & Namespaces",
      id: "modules-namespaces",
      contexts: {
        "imports-exports": {
          intro:
            "ES module syntax for importing and exporting code. Entries follow the quick reference, then the additional detailed topics. Each of the two examples per entry is a separate project: copy its labeled files plus the shared setup, then follow its run instructions. The .js specifiers in TypeScript source deliberately name the emitted ESM files and resolve to .ts during checking. Node examples are checked with TypeScript 5.9.3 and Node.js 22.23.3; JSON attributes need a supporting runtime. CSS and Window examples are explicitly labeled for a bundler or browser. Do not combine the example folders or reuse the earlier CommonJS decorator configuration.",
          setup: [
            {
              label:
                "Shared package.json — use unless an example supplies its own",
              language: "json",
              code: '{\n  "type": "module",\n  "devDependencies": {\n    "typescript": "5.9.3"\n  }\n}',
            },
            {
              label: "Shared tsconfig.json — copy into each example folder",
              language: "json",
              code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "NodeNext",\n    "moduleResolution": "NodeNext",\n    "lib": [\n      "ES2022",\n      "DOM"\n    ],\n    "strict": true,\n    "exactOptionalPropertyTypes": true,\n    "noUncheckedIndexedAccess": true,\n    "noUncheckedSideEffectImports": true,\n    "verbatimModuleSyntax": true,\n    "resolveJsonModule": true,\n    "esModuleInterop": true,\n    "rootDir": ".",\n    "outDir": "dist"\n  },\n  "include": [\n    "**/*.ts"\n  ],\n  "exclude": [\n    "dist",\n    "node_modules"\n  ]\n}',
            },
            {
              label:
                "Run a Node example after copying its files and the shared configuration",
              language: "bash",
              code: "npm install\nnpx tsc\nnode dist/main.js",
            },
          ],
        },
        "declaration-files": {
          intro:
            "Type declarations for JavaScript libraries and modules. Topics follow both images in order; CSS and SVG receive separate entries because their declarations require different runtime loaders. Each scenario is a separate project: copy its files and shared setup unless it supplies replacements. Node examples are checked with TypeScript 5.9.3 and Node.js 22.23.3. allowJs copies the provided JavaScript runtime fixtures; checkJs is disabled because this category teaches their external declarations. The base types: [] disables automatic @types inclusion so explicit type dependencies remain visible; typeRoots examples configure package inclusion separately. Browser examples have their own build instructions and version-pinned dependencies. Declarations describe behavior; they do not supply it.",
          setup: [
            {
              label:
                "Shared package.json — use unless the example supplies its own",
              language: "json",
              code: '{\n  "type": "module",\n  "scripts": {\n    "check": "tsc --noEmit",\n    "build": "tsc",\n    "start": "node dist/main.js"\n  },\n  "devDependencies": {\n    "typescript": "5.9.3"\n  }\n}',
            },
            {
              label:
                "Shared tsconfig.json — copy unless the example supplies its own",
              language: "json",
              code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "NodeNext",\n    "moduleResolution": "NodeNext",\n    "lib": [\n      "ES2022",\n      "DOM"\n    ],\n    "strict": true,\n    "exactOptionalPropertyTypes": true,\n    "noUncheckedIndexedAccess": true,\n    "noUncheckedSideEffectImports": true,\n    "verbatimModuleSyntax": true,\n    "esModuleInterop": true,\n    "allowJs": true,\n    "checkJs": false,\n    "types": [],\n    "rootDir": "src",\n    "outDir": "dist"\n  },\n  "include": [\n    "src/**/*",\n    "types/**/*.d.ts"\n  ],\n  "exclude": [\n    "dist",\n    "node_modules"\n  ]\n}',
            },
            {
              label:
                "Run a Node example in its own folder after copying all labeled files",
              language: "bash",
              code: "npm install\nnpm run check\nnpm run build\nnpm start",
            },
          ],
        },
      },
      methods: [
        {
          name: "Named exports",
          explanation:
            "Export declarations by name so other modules can import the values or types they need. Use named exports for modules with several public members.",
          note: "Constants, functions, and classes can exist at runtime; interfaces and type aliases are erased. The examples use import type (including inline type specifiers) for type-only bindings under verbatimModuleSyntax. fetchData returns local data here and makes no request to the illustrative API_URL.",
          examples: [
            {
              label:
                "Quick reference — export values, a class, and object types",
              files: [
                {
                  path: "api.ts",
                  language: "typescript",
                  code: 'export const API_URL = "https://api.example.com";\nexport function fetchData(): string[] { return ["Alice"]; }\nexport class User { constructor(public name: string) {} }\nexport type UserType = { name: string };\nexport interface UserInterface { name: string; }',
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import { API_URL, fetchData, User, type UserType, type UserInterface } from "./api.js";\nconst user: UserType = new User("Alice");\nconst view: UserInterface = user;\nconsole.log(API_URL, fetchData(), view.name);\n// "https://api.example.com", ["Alice"], "Alice"',
                },
              ],
            },
            {
              label:
                "Practical example — declare members first, then export a public list",
              files: [
                {
                  path: "api.ts",
                  language: "typescript",
                  code: 'const API_URL = "https://api.example.com";\nfunction fetchData(): string[] { return ["Bob"]; }\ntype UserType = { name: string };\nexport { API_URL, fetchData };\nexport type { UserType };',
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import { fetchData } from "./api.js";\nimport type { UserType } from "./api.js";\nconst user: UserType = { name: "Bob" };\nconsole.log(fetchData(), user.name); // ["Bob"], "Bob"',
                },
              ],
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/modules/reference.html",
        },
        {
          name: "Default export",
          explanation:
            "Export one primary value under the module’s default export name. Use it when a module has one main class or function.",
          note: "A module has at most one default export but may also have named exports. A default import can choose its local name; that does not rename the original declaration or create a named export.",
          examples: [
            {
              label: "Quick reference — export a primary application class",
              files: [
                {
                  path: "App.ts",
                  language: "typescript",
                  code: 'export default class App { name = "Demo"; }',
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import App from "./App.js";\nconsole.log(new App().name); // "Demo"',
                },
              ],
            },
            {
              label:
                "Practical example — export an existing function as the default",
              files: [
                {
                  path: "format.ts",
                  language: "typescript",
                  code: "function format(name: string): string { return `Hi ${name}`; }\nexport default format;",
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import greet from "./format.js";\nconsole.log(greet("Alice")); // "Hi Alice"',
                },
              ],
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/modules/reference.html",
        },
        {
          name: "Named imports",
          explanation:
            "Import specific named exports with braces. Use as to give an imported member a different local name without changing its exported name.",
          note: "Static imports are top-level module syntax. Imported value bindings are live views of their exports and cannot be reassigned by the importing module; they are not copied snapshots.",
          examples: [
            {
              label:
                "Quick reference — select named values and alias a function",
              files: [
                {
                  path: "api.ts",
                  language: "typescript",
                  code: 'export const API_URL = "https://api.example.com";\nexport function fetchData(): string[] { return ["Alice"]; }',
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import { API_URL, fetchData as loadData } from "./api.js";\nconsole.log(API_URL, loadData()); // "https://api.example.com", ["Alice"]',
                },
              ],
            },
            {
              label: "Practical example — observe a live imported binding",
              files: [
                {
                  path: "counter.ts",
                  language: "typescript",
                  code: "export let count = 0;\nexport function increment(): void { count += 1; }",
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import { count, increment } from "./counter.js";\nconsole.log(count); // 0\nincrement();\nconsole.log(count); // 1',
                },
              ],
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/modules/reference.html",
        },
        {
          name: "Default imports",
          explanation:
            "Import a module’s default export without braces. Use any suitable local identifier for that default binding.",
          note: "Default and named import syntax refer to different exports; import { App } is not equivalent to import App. Package interop can depend on the loader and compiler settings; the local examples use native ESM exports.",
          examples: [
            {
              label:
                "Quick reference — choose a local name for a default class",
              files: [
                {
                  path: "App.ts",
                  language: "typescript",
                  code: 'export default class App { title = "Handbook"; }',
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import Application from "./App.js";\nconsole.log(new Application().title); // "Handbook"',
                },
              ],
            },
            {
              label:
                "Practical example — import only the default from a mixed-export module",
              files: [
                {
                  path: "format.ts",
                  language: "typescript",
                  code: 'export const VERSION = "1.0";\nexport default function format(name: string): string { return `Hello ${name}`; }',
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import formatName from "./format.js";\nconsole.log(formatName("Ada")); // "Hello Ada"',
                },
              ],
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/modules/reference.html",
        },
        {
          name: "Namespace imports",
          explanation:
            "Collect a module’s exports under one namespace object with import * as Name. Use this when grouping a small related set of exported operations makes call sites clearer.",
          note: "Access named exports as Utils.name; a default export, if present, is available as Utils.default. Module namespace properties are read-only views of exports, and importing a namespace is not the same as loading a separate copy of the module.",
          examples: [
            {
              label: "Quick reference — group related utility exports",
              files: [
                {
                  path: "utils.ts",
                  language: "typescript",
                  code: 'export function double(value: number): number { return value * 2; }\nexport const label = "Utilities";',
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import * as Utils from "./utils.js";\nconsole.log(Utils.label, Utils.double(4)); // "Utilities", 8',
                },
              ],
            },
            {
              label:
                "Practical example — access a default export through a namespace",
              files: [
                {
                  path: "utils.ts",
                  language: "typescript",
                  code: 'export const version = 1;\nexport default function greet(): string { return "Hello"; }',
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import * as Utils from "./utils.js";\nconsole.log(Utils.default(), Utils.version); // "Hello", 1',
                },
              ],
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/modules/reference.html",
        },
        {
          name: "Combined imports",
          explanation:
            "Import a default export and named exports in one declaration. Use this when one module exposes both a primary value and related helpers.",
          note: "The first example uses only local modules. The second preserves the image’s React import syntax and pins React 19.2.0 as a repeatable example, not a latest-version claim. It checks the imported bindings without calling Hooks; useState and useEffect must be called from React components or custom Hooks.",
          examples: [
            {
              label:
                "Quick reference — combine a default class with named helpers",
              files: [
                {
                  path: "App.ts",
                  language: "typescript",
                  code: 'export default class App { name = "Demo"; }\nexport const VERSION = "1.0";\nexport function start(app: App): string { return app.name; }',
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import App, { VERSION, start } from "./App.js";\nconsole.log(start(new App()), VERSION); // "Demo", "1.0"',
                },
              ],
            },
            {
              label:
                "Package example — combine React’s default and named bindings",
              files: [
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "type": "module",\n  "dependencies": {\n    "react": "19.2.0"\n  },\n  "devDependencies": {\n    "typescript": "5.9.3",\n    "@types/react": "^19.2.0"\n  }\n}',
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import React, { useState, useEffect } from "react";\nconsole.log(typeof React.createElement, typeof useState, typeof useEffect);\n// "function", "function", "function"',
                },
              ],
              note: "Use this package.json instead of the shared package file, then run npm install before compiling.",
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/modules/reference.html",
        },
        {
          name: "Re-exports",
          explanation:
            "Forward exports from other modules to define a public entry point. Use explicit re-exports, aliases, export *, or export * as to expose the intended module API.",
          note: "export * does not forward a default export, and conflicting star-export names need explicit resolution. Re-exported types still need type-only imports at the consumer. A barrel can introduce dependency cycles, so keep its dependency direction clear.",
          examples: [
            {
              label: "Quick reference — re-export a class and an aliased class",
              files: [
                {
                  path: "user.ts",
                  language: "typescript",
                  code: "export class User { constructor(public name: string) {} }",
                },
                {
                  path: "admin.ts",
                  language: "typescript",
                  code: 'import { User } from "./user.js";\nexport class Admin extends User { role = "admin"; }',
                },
                {
                  path: "index.ts",
                  language: "typescript",
                  code: 'export { User } from "./user.js";\nexport { Admin as AdminUser } from "./admin.js";',
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import { User, AdminUser } from "./index.js";\nconsole.log(new User("Alice").name, new AdminUser("Bob").role); // "Alice", "admin"',
                },
              ],
            },
            {
              label:
                "Practical example — forward members and a helper namespace",
              files: [
                {
                  path: "types.ts",
                  language: "typescript",
                  code: "export interface Config { debug: boolean; }\nexport const VERSION = 1;",
                },
                {
                  path: "helpers.ts",
                  language: "typescript",
                  code: "export function double(value: number): number { return value * 2; }",
                },
                {
                  path: "index.ts",
                  language: "typescript",
                  code: 'export * from "./types.js";\nexport * as helpers from "./helpers.js";',
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import { VERSION, helpers, type Config } from "./index.js";\nconst config: Config = { debug: true };\nconsole.log(VERSION, helpers.double(4), config.debug); // 1, 8, true',
                },
              ],
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/modules/reference.html",
        },
        {
          name: "Type-only imports and exports",
          explanation:
            "Use import type and export type for declarations needed only during checking. Use them to keep interfaces and aliases out of runtime imports and make dependencies explicit.",
          note: "Type-only imports and exports are erased and do not evaluate the referenced module. With verbatimModuleSyntax (TypeScript 5.0+), explicit type modifiers make that distinction predictable. If initialization side effects are required, import the module separately as a value/side-effect dependency.",
          examples: [
            {
              label:
                "Quick reference — use a type without evaluating its module",
              files: [
                {
                  path: "config.ts",
                  language: "typescript",
                  code: 'export interface Config { debug: boolean; }\nconsole.log("config evaluated");',
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import type { Config } from "./config.js";\nconst config: Config = { debug: true };\nconsole.log(config.debug); // true; "config evaluated" is not logged',
                },
              ],
            },
            {
              label:
                "Practical example — re-export only a type through an entry point",
              files: [
                {
                  path: "config.ts",
                  language: "typescript",
                  code: 'export interface Config { debug: boolean; }\nconsole.log("config evaluated");',
                },
                {
                  path: "public.ts",
                  language: "typescript",
                  code: 'export type { Config } from "./config.js";',
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import type { Config } from "./public.js";\nconst config: Config = { debug: false };\nconsole.log(config.debug); // false; neither module is evaluated',
                },
              ],
            },
          ],
          source:
            "https://www.typescriptlang.org/tsconfig/verbatimModuleSyntax.html",
        },
        {
          name: "Dynamic imports",
          explanation:
            "Use import() to load a module asynchronously and receive its namespace object. Use this for conditional dependencies or loading code only when it is needed.",
          note: "import() returns a promise and can reject; use await with appropriate error handling or a rejection handler. Native ESM caches evaluated modules by identity. Bundlers may create separate chunks, but the syntax alone does not guarantee a particular bundling strategy. Top-level await needs a compatible ESM target and runtime.",
          examples: [
            {
              label: "Quick reference — await a module namespace at top level",
              files: [
                {
                  path: "module.ts",
                  language: "typescript",
                  code: "export const answer = 42;",
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'const module = await import("./module.js");\nconsole.log(module.answer); // 42\nexport {};',
                },
              ],
            },
            {
              label:
                "Practical example — handle a dynamic import with promise callbacks",
              files: [
                {
                  path: "heavy-module.ts",
                  language: "typescript",
                  code: 'export function doSomething(): void { console.log("Heavy module ready"); }',
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import("./heavy-module.js")\n  .then((mod) => { mod.doSomething(); })\n  .catch((error: unknown) => console.error(error));\nexport {};',
                },
              ],
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/modules/reference.html",
        },
        {
          name: "Import attributes (JSON)",
          explanation:
            'Attach with { type: "json" } to tell a supporting loader that a dependency is a JSON module. Use the default export to consume the parsed JSON data.',
          note: "Import-attribute syntax is supported by TypeScript 5.3+ and still requires runtime support. These examples use Node ESM, resolveJsonModule, and Node.js 22.23.3; a JSON type declaration alone does not configure a loader. JSON modules expose their data as a default export, and runtime validation of external content remains separate.",
          examples: [
            {
              label: "Quick reference — import JSON with a static attribute",
              files: [
                {
                  path: "data.json",
                  language: "json",
                  code: '{"name":"Alice","count":3}',
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import data from "./data.json" with { type: "json" };\nconsole.log(data.name, data.count); // "Alice", 3',
                },
              ],
            },
            {
              label:
                "Practical example — pass attributes to a dynamic JSON import",
              files: [
                {
                  path: "data.json",
                  language: "json",
                  code: '{"name":"Bob","count":4}',
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'const { default: data } = await import("./data.json", { with: { type: "json" } });\nconsole.log(data.name, data.count); // "Bob", 4\nexport {};',
                },
              ],
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-3.html#import-attributes",
        },
        {
          name: "Side-effect imports",
          explanation:
            "Import a module without binding exports so its initialization runs. Use this for intentional startup registration, polyfills, or assets handled by a configured bundler.",
          note: "Native ESM evaluates the same resolved module once, even if imported twice. A bare CSS import is not supported by the Node setup; the second example uses esbuild plus an HTML stylesheet link. The wildcard declaration permits CSS type checking but does not prove a file exists or install a CSS loader. noUncheckedSideEffectImports (TypeScript 5.6+) catches unresolved imports not covered by such declarations.",
          examples: [
            {
              label: "Quick reference — evaluate an initialization module once",
              files: [
                {
                  path: "polyfills.ts",
                  language: "typescript",
                  code: '// Illustrates startup evaluation; no built-in prototypes are changed.\nconsole.log("Startup module evaluated");\nexport {};',
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import "./polyfills.js";\nimport "./polyfills.js";\nconsole.log("Main ready");\n// "Startup module evaluated", then "Main ready"',
                },
              ],
            },
            {
              label: "Bundler/browser example — import and load a stylesheet",
              files: [
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "type": "module",\n  "scripts": {\n    "build": "esbuild main.ts --bundle --format=esm --outdir=dist",\n    "check": "tsc --noEmit"\n  },\n  "devDependencies": {\n    "typescript": "5.9.3",\n    "esbuild": "0.28.2"\n  }\n}',
                },
                {
                  path: "globals.d.ts",
                  language: "typescript",
                  code: 'declare module "*.css" {}',
                },
                {
                  path: "styles.css",
                  language: "css",
                  code: ".notice { color: rgb(255, 0, 0); }",
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import "./styles.css";\nconst message = document.createElement("p");\nmessage.className = "notice";\nmessage.textContent = "Styled";\ndocument.body.append(message);',
                },
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<html lang="en">\n<meta charset="utf-8">\n<title>CSS module import</title>\n<link rel="stylesheet" href="./dist/main.css">\n<body>\n<script type="module" src="./dist/main.js"></script>\n</body>\n</html>',
                },
              ],
              note: "Use this package.json, run npm install, npm run check, then npm run build. Serve this folder over HTTP and open index.html. esbuild emits main.js and main.css; this example is not run with node dist/main.js.",
            },
          ],
          source:
            "https://www.typescriptlang.org/tsconfig/noUncheckedSideEffectImports.html",
        },
        {
          name: "Module augmentation",
          explanation:
            "Merge additional members into an existing named declaration exported by a module. Use augmentation when extending a known contract and supply any required runtime implementation separately.",
          note: "The augmentation file must itself be a module (use an import or export), and the specifier must resolve to the existing module. This merges existing declarations rather than creating a replacement module. Default exports cannot be augmented by name, and declaring a member does not install a runtime property or method.",
          examples: [
            {
              label: "Quick reference — extend an existing exported interface",
              files: [
                {
                  path: "existing-module.ts",
                  language: "typescript",
                  code: "export interface ExistingInterface { name: string; }",
                },
                {
                  path: "augmentation.ts",
                  language: "typescript",
                  code: 'import "./existing-module.js";\ndeclare module "./existing-module.js" {\n  interface ExistingInterface { newProperty: string; }\n}',
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import "./augmentation.js";\nimport type { ExistingInterface } from "./existing-module.js";\nconst value: ExistingInterface = { name: "Alice", newProperty: "ready" };\nconsole.log(value.name, value.newProperty); // "Alice", "ready"',
                },
              ],
            },
            {
              label:
                "Practical example — pair a merged method contract with a runtime patch",
              files: [
                {
                  path: "existing-module.ts",
                  language: "typescript",
                  code: "export class User { constructor(public name: string) {} }",
                },
                {
                  path: "augmentation.ts",
                  language: "typescript",
                  code: 'import { User } from "./existing-module.js";\ndeclare module "./existing-module.js" {\n  interface User { greet(): string; }\n}\nUser.prototype.greet = function(this: User): string { return `Hello ${this.name}`; };',
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import "./augmentation.js";\nimport { User } from "./existing-module.js";\nconsole.log(new User("Alice").greet()); // "Hello Alice"',
                },
              ],
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation",
        },
        {
          name: "Global augmentation",
          explanation:
            "Use declare global inside a module to extend existing global declarations such as Window. Use it to type a global integration while keeping the declaration file in module scope.",
          note: "The declaration affects type checking but creates no runtime property. A module with actual initialization must be imported, or the application must assign the value elsewhere. These browser examples explicitly set their values; Node has no window global. Optional declarations should be checked before use.",
          examples: [
            {
              label:
                "Browser example — import both the declaration and initialization",
              files: [
                {
                  path: "globals.ts",
                  language: "typescript",
                  code: 'export {};\ndeclare global {\n  interface Window { myGlobal: string; }\n}\nwindow.myGlobal = "hello";',
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'import "./globals.js";\nconsole.log(window.myGlobal.toUpperCase()); // "HELLO"',
                },
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<html lang="en">\n<meta charset="utf-8">\n<title>Global augmentation</title>\n<body>\n<script type="module" src="./dist/main.js"></script>\n</body>\n</html>',
                },
              ],
              note: "Compile with the shared setup, serve the folder over HTTP, and open index.html instead of running its main.js in Node.",
            },
            {
              label:
                "Browser example — declare an optional global and initialize it explicitly",
              files: [
                {
                  path: "globals.d.ts",
                  language: "typescript",
                  code: "export {};\ndeclare global {\n  interface Window { appConfig?: { apiUrl: string }; }\n}",
                },
                {
                  path: "main.ts",
                  language: "typescript",
                  code: 'console.log(window.appConfig?.apiUrl ?? "Not configured"); // "Not configured"\nwindow.appConfig = { apiUrl: "/api" };\nconsole.log(window.appConfig.apiUrl); // "/api"',
                },
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<html lang="en">\n<meta charset="utf-8">\n<title>Global augmentation</title>\n<body>\n<script type="module" src="./dist/main.js"></script>\n</body>\n</html>',
                },
              ],
              note: "The .d.ts file is included by tsconfig.json but emits no JavaScript. Compile and open index.html through an HTTP server; main.ts provides the actual assignment.",
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/declaration-merging.html#global-augmentation",
        },
        {
          name: "Ambient module declarations",
          explanation:
            "Use declare module in a script-style .d.ts file to describe an untyped package’s public exports. Use it when the JavaScript implementation exists but compatible declarations are unavailable.",
          note: "Declarations emit no implementation, install no package, and must match the runtime API. Keep this ambient-declaration file free of top-level imports/exports; those would change a module declaration into augmentation. These examples include a real local JavaScript package so the declared imports can actually run.",
          examples: [
            {
              label:
                "Quick reference — describe named exports of a local untyped package",
              files: [
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "type": "module",\n  "scripts": {\n    "check": "tsc --noEmit",\n    "build": "tsc",\n    "start": "node dist/main.js"\n  },\n  "dependencies": {\n    "untyped-module": "file:./vendor/untyped-module"\n  },\n  "devDependencies": {\n    "typescript": "5.9.3"\n  }\n}',
                },
                {
                  path: "vendor/untyped-module/package.json",
                  language: "json",
                  code: '{\n  "name": "untyped-module",\n  "version": "1.0.0",\n  "type": "module",\n  "exports": "./index.js"\n}',
                },
                {
                  path: "vendor/untyped-module/index.js",
                  language: "javascript",
                  code: 'export function doSomething() { console.log("Working"); }\nexport const value = "ready";',
                },
                {
                  path: "types/modules.d.ts",
                  language: "typescript",
                  code: 'declare module "untyped-module" {\n  export function doSomething(): void;\n  export const value: string;\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import { doSomething, value } from "untyped-module";\ndoSomething(); // "Working"\nconsole.log(value.toUpperCase()); // "READY"',
                },
              ],
            },
            {
              label:
                "Practical example — describe a default factory and its options",
              files: [
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "type": "module",\n  "scripts": {\n    "check": "tsc --noEmit",\n    "build": "tsc",\n    "start": "node dist/main.js"\n  },\n  "dependencies": {\n    "untyped-module": "file:./vendor/untyped-module"\n  },\n  "devDependencies": {\n    "typescript": "5.9.3"\n  }\n}',
                },
                {
                  path: "vendor/untyped-module/package.json",
                  language: "json",
                  code: '{\n  "name": "untyped-module",\n  "version": "1.0.0",\n  "type": "module",\n  "exports": "./index.js"\n}',
                },
                {
                  path: "vendor/untyped-module/index.js",
                  language: "javascript",
                  code: 'export default function create(options) { return options.debug ? "debug" : "normal"; }',
                },
                {
                  path: "types/modules.d.ts",
                  language: "typescript",
                  code: 'declare module "untyped-module" {\n  export interface Options { debug?: boolean; }\n  export default function create(options: Options): string;\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import create from "untyped-module";\nimport type { Options } from "untyped-module";\nconst options: Options = { debug: true };\nconsole.log(create(options)); // "debug"',
                },
              ],
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/modules/reference.html#ambient-modules",
        },
        {
          name: "Global declarations",
          explanation:
            "Declare names supplied by a script or host so TypeScript can check uses of those globals. Use ambient globals only when the runtime really provides a global API.",
          note: "A script-style .d.ts file contributes global declarations without generating JavaScript. The first example imports a JavaScript provider before using them; the second shows that declarations alone create no runtime values. The analytics provider only logs locally and sends no events.",
          examples: [
            {
              label: "Quick reference — load a provider for declared globals",
              files: [
                {
                  path: "types/global.d.ts",
                  language: "typescript",
                  code: "declare const VERSION: string;\ndeclare function analyticsTrack(event: string): void;",
                },
                {
                  path: "src/runtime.js",
                  language: "javascript",
                  code: 'Reflect.set(globalThis, "VERSION", "1.0");\nReflect.set(globalThis, "analyticsTrack", (event) => console.log("Tracked", event));',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import "./runtime.js";\nconsole.log(VERSION); // "1.0"\nanalyticsTrack("page_view"); // "Tracked", "page_view"',
                },
              ],
            },
            {
              label:
                "Practical example — handle a declared API that was not loaded",
              files: [
                {
                  path: "types/global.d.ts",
                  language: "typescript",
                  code: "declare const VERSION: string;\ndeclare function analyticsTrack(event: string): void;",
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'console.log(typeof VERSION); // "undefined": declaration did not create it.\nif (typeof analyticsTrack === "function") analyticsTrack("page_view");\nelse console.log("Analytics not loaded"); // "Analytics not loaded"\nexport {};',
                },
              ],
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-d-ts.html",
        },
        {
          name: "CSS module declarations",
          explanation:
            "Describe a CSS Modules import as a map from source class names to generated class names. Use this declaration only with a toolchain that actually exports that mapping.",
          note: "The image’s default class map describes CSS Modules, not every plain CSS import; the narrower *.module.css pattern makes that distinction explicit. esbuild supplies the runtime transformation here. An index signature does not verify class names or file existence, and noUncheckedIndexedAccess makes unknown keys possibly undefined.",
          examples: [
            {
              label:
                "Bundler/browser example — type and render a CSS Module class",
              files: [
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "type": "module",\n  "scripts": {\n    "check": "tsc --noEmit",\n    "build": "esbuild src/main.ts --bundle --format=esm --outdir=dist"\n  },\n  "devDependencies": {\n    "typescript": "5.9.3",\n    "esbuild": "0.28.2"\n  }\n}',
                },
                {
                  path: "types/modules.d.ts",
                  language: "typescript",
                  code: 'declare module "*.module.css" {\n  const content: { readonly [className: string]: string };\n  export default content;\n}',
                },
                {
                  path: "src/styles.module.css",
                  language: "css",
                  code: ".notice { color: rgb(255, 0, 0); }",
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import styles from "./styles.module.css";\nconst message = document.createElement("p");\nmessage.className = styles["notice"] ?? "";\nmessage.textContent = "Styled";\ndocument.body.append(message);',
                },
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<html lang="en">\n<meta charset="utf-8">\n<title>Typed CSS Module</title>\n<link rel="stylesheet" href="./dist/main.css">\n<body>\n<script type="module" src="./dist/main.js"></script>\n</body>\n</html>',
                },
              ],
              note: "Run npm install, npm run check, then npm run build. Serve the folder over HTTP and open index.html; do not run this browser entry in Node.",
            },
            {
              label: "Bundler/browser example — handle a missing class-map key",
              files: [
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "type": "module",\n  "scripts": {\n    "check": "tsc --noEmit",\n    "build": "esbuild src/main.ts --bundle --format=esm --outdir=dist"\n  },\n  "devDependencies": {\n    "typescript": "5.9.3",\n    "esbuild": "0.28.2"\n  }\n}',
                },
                {
                  path: "types/modules.d.ts",
                  language: "typescript",
                  code: 'declare module "*.module.css" {\n  const content: { readonly [className: string]: string };\n  export default content;\n}',
                },
                {
                  path: "src/styles.module.css",
                  language: "css",
                  code: ".notice { color: rgb(0, 0, 255); }",
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import styles from "./styles.module.css";\nfunction classFor(name: string): string { return styles[name] ?? ""; }\nconst message = document.createElement("p");\nmessage.className = classFor("notice");\nmessage.textContent = "Blue";\ndocument.body.append(message);\nconsole.log(classFor("missing")); // ""',
                },
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<html lang="en">\n<meta charset="utf-8">\n<title>Typed CSS Module</title>\n<link rel="stylesheet" href="./dist/main.css">\n<body>\n<script type="module" src="./dist/main.js"></script>\n</body>\n</html>',
                },
              ],
              note: "Build with esbuild using the provided package scripts and open index.html through an HTTP server.",
            },
          ],
          source: "https://esbuild.github.io/content-types/#css-modules",
        },
        {
          name: "SVG component declarations",
          explanation:
            "Describe an SVG import as a React component only when an SVG-to-component transform provides one. Use a loader-specific import pattern so ordinary SVG URL imports keep their own meaning.",
          note: "The image’s *.svg → React.FC contract is not universal. These examples use vite-plugin-svgr 4.3.0 with *.svg?react, React 19.2.0, and Vite 6.1.0 as pinned test fixtures. The declaration supplies checking, while the plugin performs the transformation. Imports inside an ambient module keep the containing file script-scoped.",
          examples: [
            {
              label:
                "Bundler/browser example — declare the configured SVG component shape",
              files: [
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "type": "module",\n  "scripts": {\n    "check": "tsc --noEmit",\n    "build": "vite build"\n  },\n  "dependencies": {\n    "react": "19.2.0",\n    "react-dom": "19.2.0"\n  },\n  "devDependencies": {\n    "typescript": "5.9.3",\n    "@types/react": "19.2.0",\n    "@types/react-dom": "19.2.0",\n    "@types/node": "22.18.6",\n    "vite": "6.1.0",\n    "vite-plugin-svgr": "4.3.0"\n  }\n}',
                },
                {
                  path: "vite.config.ts",
                  language: "typescript",
                  code: 'import { defineConfig } from "vite";\nimport svgr from "vite-plugin-svgr";\nexport default defineConfig({ base: "./", plugins: [svgr()] });',
                },
                {
                  path: "types/modules.d.ts",
                  language: "typescript",
                  code: 'declare module "*.svg?react" {\n  import type { FC, SVGProps } from "react";\n  const content: FC<SVGProps<SVGSVGElement>>;\n  export default content;\n}',
                },
                {
                  path: "src/logo.svg",
                  language: "html",
                  code: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2 2h20v20H2z" /></svg>',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import React from "react";\nimport { createRoot } from "react-dom/client";\nimport Logo from "./logo.svg?react";\nconst root = document.getElementById("root");\nif (!root) throw new Error("Missing root");\ncreateRoot(root).render(React.createElement(Logo, { width: 24, height: 24, "aria-label": "Logo" }));',
                },
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<html lang="en">\n<meta charset="utf-8">\n<title>Typed SVG component</title>\n<body>\n<div id="root"></div>\n<script type="module" src="/src/main.ts"></script>\n</body>\n</html>',
                },
              ],
              note: "Run npm install, npm run check, and npm run build. Serve dist over HTTP and open its index.html.",
            },
            {
              label:
                "Bundler/browser example — use the plugin’s declarations and title support",
              files: [
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "type": "module",\n  "scripts": {\n    "check": "tsc --noEmit",\n    "build": "vite build"\n  },\n  "dependencies": {\n    "react": "19.2.0",\n    "react-dom": "19.2.0"\n  },\n  "devDependencies": {\n    "typescript": "5.9.3",\n    "@types/react": "19.2.0",\n    "@types/react-dom": "19.2.0",\n    "@types/node": "22.18.6",\n    "vite": "6.1.0",\n    "vite-plugin-svgr": "4.3.0"\n  }\n}',
                },
                {
                  path: "vite.config.ts",
                  language: "typescript",
                  code: 'import { defineConfig } from "vite";\nimport svgr from "vite-plugin-svgr";\nexport default defineConfig({ base: "./", plugins: [svgr({ svgrOptions: { titleProp: true } })] });',
                },
                {
                  path: "types/svg.d.ts",
                  language: "typescript",
                  code: '/// <reference types="vite-plugin-svgr/client" />',
                },
                {
                  path: "src/logo.svg",
                  language: "html",
                  code: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2 2h20v20H2z" /></svg>',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import React from "react";\nimport { createRoot } from "react-dom/client";\nimport Logo from "./logo.svg?react";\nconst root = document.getElementById("root");\nif (!root) throw new Error("Missing root");\ncreateRoot(root).render(React.createElement(Logo, { width: 32, title: "Favorite" }));',
                },
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<html lang="en">\n<meta charset="utf-8">\n<title>Typed SVG component</title>\n<body>\n<div id="root"></div>\n<script type="module" src="/src/main.ts"></script>\n</body>\n</html>',
                },
              ],
              note: "The reference loads the plugin’s bundled declarations, not its runtime. The matching Vite plugin and titleProp option remain necessary; build and serve dist.",
            },
          ],
          source: "https://github.com/pd4d10/vite-plugin-svgr",
        },
        {
          name: "Namespace declarations",
          explanation:
            "Use declare namespace to describe a library exposed as one global object containing types, functions, and classes. Use this for a script-provided API rather than a native ESM namespace import.",
          note: "The declaration does not construct MyLib or implement its members. The included JavaScript provider demonstrates the runtime contract locally: connect() returns a promise and logs, but opens no network connection. Keep the ambient namespace in a script-style .d.ts file.",
          examples: [
            {
              label:
                "Quick reference — consume declared options, initialization, and a client",
              files: [
                {
                  path: "types/mylib.d.ts",
                  language: "typescript",
                  code: "declare namespace MyLib {\n  interface Options { debug?: boolean; }\n  function init(options: Options): void;\n  class Client {\n    constructor(url: string);\n    connect(): Promise<void>;\n  }\n}",
                },
                {
                  path: "src/runtime.js",
                  language: "javascript",
                  code: 'Reflect.set(globalThis, "MyLib", {\n  init(options) { console.log("Debug", options.debug ?? false); },\n  Client: class {\n    constructor(url) { this.url = url; }\n    async connect() { console.log("Demo connection", this.url); }\n  }\n});',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import "./runtime.js";\nconst options: MyLib.Options = { debug: true };\nMyLib.init(options); // "Debug", true\nawait new MyLib.Client("/api").connect(); // "Demo connection", "/api"',
                },
              ],
            },
            {
              label: "Practical example — reuse namespaced types in a function",
              files: [
                {
                  path: "types/mylib.d.ts",
                  language: "typescript",
                  code: "declare namespace MyLib {\n  interface Options { debug?: boolean; }\n  function init(options: Options): void;\n  class Client {\n    constructor(url: string);\n    connect(): Promise<void>;\n  }\n}",
                },
                {
                  path: "src/runtime.js",
                  language: "javascript",
                  code: 'Reflect.set(globalThis, "MyLib", {\n  init(options) { console.log("Debug", options.debug ?? false); },\n  Client: class {\n    constructor(url) { this.url = url; }\n    async connect() { console.log("Demo connection", this.url); }\n  }\n});',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import "./runtime.js";\nasync function start(options: MyLib.Options): Promise<void> {\n  MyLib.init(options);\n  await new MyLib.Client("/local").connect();\n}\nawait start({}); // "Debug", false; then "Demo connection", "/local"',
                },
              ],
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-d-ts.html",
        },
        {
          name: "Triple-slash directives",
          explanation:
            "Use reference path, types, or lib directives to explicitly include declarations or built-in library definitions. Use them at a file’s beginning when imports or project-level configuration are not the right expression of that dependency.",
          note: "path names a declaration file; types names an installed type package; lib names a TypeScript built-in library. None loads runtime JavaScript, installs packages, or polyfills APIs. Keep directives before statements and declarations. The examples isolate each form instead of relying on declarations already included elsewhere.",
          examples: [
            {
              label:
                "Reference path — include a declaration outside the source glob",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "NodeNext",\n    "moduleResolution": "NodeNext",\n    "lib": [\n      "ES2022",\n      "DOM"\n    ],\n    "strict": true,\n    "exactOptionalPropertyTypes": true,\n    "noUncheckedIndexedAccess": true,\n    "noUncheckedSideEffectImports": true,\n    "verbatimModuleSyntax": true,\n    "esModuleInterop": true,\n    "allowJs": true,\n    "checkJs": false,\n    "types": [],\n    "rootDir": "src",\n    "outDir": "dist"\n  },\n  "include": [\n    "src/**/*"\n  ],\n  "exclude": [\n    "dist",\n    "node_modules"\n  ]\n}',
                },
                {
                  path: "types/global.d.ts",
                  language: "typescript",
                  code: "declare const APP_NAME: string;",
                },
                {
                  path: "src/runtime.js",
                  language: "javascript",
                  code: 'Reflect.set(globalThis, "APP_NAME", "Handbook");',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: '/// <reference path="../types/global.d.ts" />\nimport "./runtime.js";\nconsole.log(APP_NAME); // "Handbook"',
                },
              ],
            },
            {
              label: "Reference types — opt into installed Node declarations",
              files: [
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "type": "module",\n  "scripts": {\n    "check": "tsc --noEmit",\n    "build": "tsc",\n    "start": "node dist/main.js"\n  },\n  "devDependencies": {\n    "typescript": "5.9.3",\n    "@types/node": "22.18.6"\n  }\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: '/// <reference types="node" />\nimport { basename } from "node:path";\nconsole.log(basename("/tmp/report.txt")); // "report.txt"\nconsole.log(typeof process.versions.node); // "string"',
                },
              ],
            },
            {
              label: "Reference lib — add built-in ES2020 declarations",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "NodeNext",\n    "moduleResolution": "NodeNext",\n    "lib": [\n      "ES5",\n      "DOM"\n    ],\n    "strict": true,\n    "exactOptionalPropertyTypes": true,\n    "noUncheckedIndexedAccess": true,\n    "noUncheckedSideEffectImports": true,\n    "verbatimModuleSyntax": true,\n    "esModuleInterop": true,\n    "allowJs": true,\n    "checkJs": false,\n    "types": [],\n    "rootDir": "src",\n    "outDir": "dist"\n  },\n  "include": [\n    "src/**/*",\n    "types/**/*.d.ts"\n  ],\n  "exclude": [\n    "dist",\n    "node_modules"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: '/// <reference lib="es2020" />\nconst value = BigInt(100);\nconsole.log((value + 1n).toString()); // "101"\nexport {};',
                },
              ],
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html",
        },
        {
          name: "Extending existing modules",
          explanation:
            "Augment an existing exported declaration rather than declaring a new replacement module. Use this to add application-specific fields to a library’s types while providing their runtime values separately.",
          note: "Express handler request types originate in express-serve-static-core, so this example augments that Request interface instead of only express.Request. The import makes the declaration file a module augmentation. user remains optional; declarations do not perform authentication or attach it. The HTTP demo assigns a local example user and closes its server.",
          examples: [
            {
              label:
                "Package example — attach and read a typed field in real Express middleware",
              files: [
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "type": "module",\n  "scripts": {\n    "check": "tsc --noEmit",\n    "build": "tsc",\n    "start": "node dist/main.js"\n  },\n  "dependencies": {\n    "express": "5.1.0"\n  },\n  "devDependencies": {\n    "typescript": "5.9.3",\n    "@types/express": "5.0.3",\n    "@types/node": "22.18.6"\n  }\n}',
                },
                {
                  path: "types/express.d.ts",
                  language: "typescript",
                  code: 'import "express-serve-static-core";\ndeclare module "express-serve-static-core" {\n  interface Request { user?: { id: string; name: string }; }\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import express from "express";\nconst app = express();\napp.use((req, _res, next) => {\n  req.user = { id: "1", name: "Alice" }; // Demo data, not authentication.\n  next();\n});\napp.get("/me", (req, res) => res.json({ name: req.user?.name ?? "Guest" }));\nconst server = app.listen(0, "127.0.0.1");\nawait new Promise<void>((resolve, reject) => {\n  server.once("listening", resolve);\n  server.once("error", reject);\n});\nconst address = server.address();\nif (!address || typeof address === "string") throw new Error("No TCP address");\ntry {\n  const response = await fetch(`http://127.0.0.1:${address.port}/me`);\n  console.log(await response.json()); // { name: "Alice" }\n} finally {\n  await new Promise<void>((resolve, reject) => {\n    server.close((error) => error ? reject(error) : resolve());\n  });\n}',
                },
              ],
            },
            {
              label:
                "Practical example — handle the augmented field as optional",
              files: [
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "type": "module",\n  "scripts": {\n    "check": "tsc --noEmit",\n    "build": "tsc",\n    "start": "node dist/main.js"\n  },\n  "dependencies": {\n    "express": "5.1.0"\n  },\n  "devDependencies": {\n    "typescript": "5.9.3",\n    "@types/express": "5.0.3",\n    "@types/node": "22.18.6"\n  }\n}',
                },
                {
                  path: "types/express.d.ts",
                  language: "typescript",
                  code: 'import "express-serve-static-core";\ndeclare module "express-serve-static-core" {\n  interface Request { user?: { id: string; name: string }; }\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import type { Request } from "express";\nfunction displayName(req: Pick<Request, "user">): string {\n  return req.user?.name ?? "Guest";\n}\nconsole.log(displayName({})); // "Guest"\nconsole.log(displayName({ user: { id: "2", name: "Bob" } })); // "Bob"',
                },
              ],
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation",
        },
        {
          name: "Package typings (@types)",
          explanation:
            "Install a matching @types package when a library does not ship its own declarations. Use the JavaScript package for runtime code and its declarations for editor assistance and checking.",
          note: "@types/lodash supplies types, not the lodash implementation. Prefer a library’s bundled declarations when present and keep declaration versions compatible with the runtime package. These examples pin versions for repeatable practice; the default import uses the shared NodeNext/esModuleInterop configuration.",
          examples: [
            {
              label: "Quick reference — use Lodash with installed declarations",
              files: [
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "type": "module",\n  "scripts": {\n    "check": "tsc --noEmit",\n    "build": "tsc",\n    "start": "node dist/main.js"\n  },\n  "dependencies": {\n    "lodash": "4.17.21"\n  },\n  "devDependencies": {\n    "typescript": "5.9.3",\n    "@types/lodash": "4.17.20"\n  }\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import _ from "lodash";\nconsole.log(_.chunk([1, 2, 3], 2)); // [[1, 2], [3]]',
                },
              ],
            },
            {
              label: "Practical example — infer the values in a grouped result",
              files: [
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "type": "module",\n  "scripts": {\n    "check": "tsc --noEmit",\n    "build": "tsc",\n    "start": "node dist/main.js"\n  },\n  "dependencies": {\n    "lodash": "4.17.21"\n  },\n  "devDependencies": {\n    "typescript": "5.9.3",\n    "@types/lodash": "4.17.20"\n  }\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import _ from "lodash";\nconst grouped = _.groupBy(["one", "two", "three"], (word) => word.length);\nconsole.log(grouped); // { "3": ["one", "two"], "5": ["three"] }',
                },
              ],
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/declaration-files/consumption.html",
        },
        {
          name: "Custom typings structure",
          explanation:
            "Keep custom declarations in a types folder and include a deliberate entry point or declaration glob. Use this to separate ambient globals, untyped modules, and exported application types.",
          note: "A folder name alone does not make declarations visible. The first example uses files plus reference paths; the second reaches a module-scoped declaration entry through import type. The .d.ts files emit no JavaScript, so runtime providers are still loaded explicitly.",
          examples: [
            {
              label:
                "Project layout — collect global and module declarations through an index",
              files: [
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "type": "module",\n  "scripts": {\n    "check": "tsc --noEmit",\n    "build": "tsc",\n    "start": "node dist/main.js"\n  },\n  "dependencies": {\n    "labels": "file:./vendor/labels"\n  },\n  "devDependencies": {\n    "typescript": "5.9.3"\n  }\n}',
                },
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "NodeNext",\n    "moduleResolution": "NodeNext",\n    "lib": [\n      "ES2022",\n      "DOM"\n    ],\n    "strict": true,\n    "exactOptionalPropertyTypes": true,\n    "noUncheckedIndexedAccess": true,\n    "noUncheckedSideEffectImports": true,\n    "verbatimModuleSyntax": true,\n    "esModuleInterop": true,\n    "allowJs": true,\n    "checkJs": false,\n    "types": [],\n    "rootDir": "src",\n    "outDir": "dist"\n  },\n  "include": [\n    "src/**/*"\n  ],\n  "exclude": [\n    "dist",\n    "node_modules"\n  ],\n  "files": [\n    "types/index.d.ts"\n  ]\n}',
                },
                {
                  path: "vendor/labels/package.json",
                  language: "json",
                  code: '{\n  "name": "labels",\n  "version": "1.0.0",\n  "type": "module",\n  "exports": "./index.js"\n}',
                },
                {
                  path: "vendor/labels/index.js",
                  language: "javascript",
                  code: "export function label(value) { return `Label: ${value}`; }",
                },
                {
                  path: "types/global.d.ts",
                  language: "typescript",
                  code: "declare const APP_TITLE: string;",
                },
                {
                  path: "types/modules.d.ts",
                  language: "typescript",
                  code: 'declare module "labels" { export function label(value: string): string; }',
                },
                {
                  path: "types/index.d.ts",
                  language: "typescript",
                  code: '/// <reference path="./global.d.ts" />\n/// <reference path="./modules.d.ts" />',
                },
                {
                  path: "src/runtime.js",
                  language: "javascript",
                  code: 'Reflect.set(globalThis, "APP_TITLE", "Handbook");',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import "./runtime.js";\nimport { label } from "labels";\nconsole.log(label(APP_TITLE)); // "Label: Handbook"',
                },
              ],
            },
            {
              label:
                "Project layout — export an application type from a declaration entry",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "NodeNext",\n    "moduleResolution": "NodeNext",\n    "lib": [\n      "ES2022",\n      "DOM"\n    ],\n    "strict": true,\n    "exactOptionalPropertyTypes": true,\n    "noUncheckedIndexedAccess": true,\n    "noUncheckedSideEffectImports": true,\n    "verbatimModuleSyntax": true,\n    "esModuleInterop": true,\n    "allowJs": true,\n    "checkJs": false,\n    "types": [],\n    "rootDir": "src",\n    "outDir": "dist"\n  },\n  "include": [\n    "src/**/*"\n  ],\n  "exclude": [\n    "dist",\n    "node_modules"\n  ]\n}',
                },
                {
                  path: "types/global.d.ts",
                  language: "typescript",
                  code: "export {};\ndeclare global { var APP_TITLE: string; }",
                },
                {
                  path: "types/index.d.ts",
                  language: "typescript",
                  code: 'import "./global.js";\nexport interface AppConfig { debug: boolean; }',
                },
                {
                  path: "src/runtime.js",
                  language: "javascript",
                  code: 'Reflect.set(globalThis, "APP_TITLE", "Handbook");',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import "./runtime.js";\nimport type { AppConfig } from "../types/index.js";\nconst config: AppConfig = { debug: true };\nconsole.log(APP_TITLE, config.debug); // "Handbook", true',
                },
              ],
            },
          ],
          source:
            "https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html",
        },
        {
          name: "tsconfig.json typeRoots",
          explanation:
            "Configure folders containing ambient type packages to control automatic package inclusion. Use typeRoots only when the project needs an explicit ambient-package search layout.",
          note: "Each custom package normally has a subfolder entry such as types/project/index.d.ts; flat types/global.d.ts files should instead be included through include, files, or references. Specifying typeRoots replaces the default root list, so include node_modules/@types when needed. This does not configure runtime imports or exclude declarations brought in by explicit imports and references; types can further select package names.",
          examples: [
            {
              label:
                "Package layout — discover a custom ambient package automatically",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "NodeNext",\n    "moduleResolution": "NodeNext",\n    "lib": [\n      "ES2022",\n      "DOM"\n    ],\n    "strict": true,\n    "exactOptionalPropertyTypes": true,\n    "noUncheckedIndexedAccess": true,\n    "noUncheckedSideEffectImports": true,\n    "verbatimModuleSyntax": true,\n    "esModuleInterop": true,\n    "allowJs": true,\n    "checkJs": false,\n    "rootDir": "src",\n    "outDir": "dist",\n    "typeRoots": [\n      "./types",\n      "./node_modules/@types"\n    ]\n  },\n  "include": [\n    "src/**/*"\n  ],\n  "exclude": [\n    "dist",\n    "node_modules"\n  ]\n}',
                },
                {
                  path: "types/project/index.d.ts",
                  language: "typescript",
                  code: "declare const BUILD_ID: string;",
                },
                {
                  path: "src/runtime.js",
                  language: "javascript",
                  code: 'Reflect.set(globalThis, "BUILD_ID", "demo");',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import "./runtime.js";\nconsole.log(BUILD_ID); // "demo"',
                },
              ],
            },
            {
              label:
                "Package layout — explicitly select custom and Node ambient packages",
              files: [
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "type": "module",\n  "scripts": {\n    "check": "tsc --noEmit",\n    "build": "tsc",\n    "start": "node dist/main.js"\n  },\n  "devDependencies": {\n    "typescript": "5.9.3",\n    "@types/node": "22.18.6"\n  }\n}',
                },
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "NodeNext",\n    "moduleResolution": "NodeNext",\n    "lib": [\n      "ES2022",\n      "DOM"\n    ],\n    "strict": true,\n    "exactOptionalPropertyTypes": true,\n    "noUncheckedIndexedAccess": true,\n    "noUncheckedSideEffectImports": true,\n    "verbatimModuleSyntax": true,\n    "esModuleInterop": true,\n    "allowJs": true,\n    "checkJs": false,\n    "types": [\n      "project",\n      "node"\n    ],\n    "rootDir": "src",\n    "outDir": "dist",\n    "typeRoots": [\n      "./types",\n      "./node_modules/@types"\n    ]\n  },\n  "include": [\n    "src/**/*"\n  ],\n  "exclude": [\n    "dist",\n    "node_modules"\n  ]\n}',
                },
                {
                  path: "types/project/index.d.ts",
                  language: "typescript",
                  code: "declare namespace Build { const version: string; }",
                },
                {
                  path: "src/runtime.js",
                  language: "javascript",
                  code: 'Reflect.set(globalThis, "Build", { version: "1.0" });',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import "./runtime.js";\nconsole.log(Build.version, typeof process.versions.node); // "1.0", "string"',
                },
              ],
            },
          ],
          source: "https://www.typescriptlang.org/tsconfig/typeRoots.html",
        },
      ],
      methodCategories: [
        {
          id: "imports-exports",
          name: "Imports & Exports",
        },
        {
          id: "imports-exports",
          name: "Imports & Exports",
        },
        {
          id: "imports-exports",
          name: "Imports & Exports",
        },
        {
          id: "imports-exports",
          name: "Imports & Exports",
        },
        {
          id: "imports-exports",
          name: "Imports & Exports",
        },
        {
          id: "imports-exports",
          name: "Imports & Exports",
        },
        {
          id: "imports-exports",
          name: "Imports & Exports",
        },
        {
          id: "imports-exports",
          name: "Imports & Exports",
        },
        {
          id: "imports-exports",
          name: "Imports & Exports",
        },
        {
          id: "imports-exports",
          name: "Imports & Exports",
        },
        {
          id: "imports-exports",
          name: "Imports & Exports",
        },
        {
          id: "imports-exports",
          name: "Imports & Exports",
        },
        {
          id: "imports-exports",
          name: "Imports & Exports",
        },
        {
          id: "declaration-files",
          name: "Declaration Files",
        },
        {
          id: "declaration-files",
          name: "Declaration Files",
        },
        {
          id: "declaration-files",
          name: "Declaration Files",
        },
        {
          id: "declaration-files",
          name: "Declaration Files",
        },
        {
          id: "declaration-files",
          name: "Declaration Files",
        },
        {
          id: "declaration-files",
          name: "Declaration Files",
        },
        {
          id: "declaration-files",
          name: "Declaration Files",
        },
        {
          id: "declaration-files",
          name: "Declaration Files",
        },
        {
          id: "declaration-files",
          name: "Declaration Files",
        },
        {
          id: "declaration-files",
          name: "Declaration Files",
        },
      ],
    },
    {
      name: "TSConfig Reference",
      id: "compiler-options-reference",
      intro:
        "Options and project configurations from all five images. Repeated options are explained once, at first appearance. Values and compilable fixtures are pinned to TypeScript 5.9.3, not presented as an exhaustive list for future versions. Each project example runs independently in an empty folder; add the shown files alongside the shared package.json. Configuration-only framework examples state their existing-project prerequisites. The removed preserveValueImports option is shown through its supported replacement. TypeScript 6.0 migration: the official release notes deprecate ES5 emit, downlevelIteration, legacy node10 resolution, baseUrl, outFile, and older module formats. Those fixtures intentionally document the pinned 5.x behavior; prefer NodeNext or a bundler for new projects. Boolean flags accept true or false; defaults and implied values depend on the pinned compiler and other options. Install shared dependencies before creating the fixture files.",
      setup: [
        {
          label:
            "Shared package.json — install once in each independent example folder",
          language: "json",
          code: '{\n  "private": true,\n  "devDependencies": { "typescript": "5.9.3" },\n  "dependencies": { "tslib": "2.8.1" },\n  "scripts": { "check": "tsc -p tsconfig.json --noEmit", "build": "tsc -p tsconfig.json" }\n}',
        },
        {
          label:
            "Install and compile — configurations do not provide polyfills or runtime globals",
          language: "bash",
          code: "npm install\nnpm run build\n# Inspect dist/; noEmit examples intentionally write no JS.\n# Browser/worker examples require the corresponding host.\n# Checker-only aliases are not executable Node configurations.",
        },
      ],
      methods: [
        {
          name: "target",
          explanation:
            "Selects the JavaScript syntax level of emitted files. Match the runtimes that will execute your output.",
          note: "Values include ES5, ES2015 (alias ES6), ES2020, ES2022, ES2023, and ESNext in the tested 5.9 compiler. ESNext moves with compiler releases; target does not install missing runtime APIs. The image’s TS 7 minimum-target claim is not a rule for this pinned compiler. ES5 is deprecated in TypeScript 6.0; choose a modern target for new projects.",
          source: "https://www.typescriptlang.org/tsconfig/target.html",
          examples: [
            {
              label: "Lower optional chaining for an ES2020-era baseline",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2019",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src"\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'export const city = ({ address: { city: "Kyiv" } } as { address?: { city: string } }).address?.city ?? "Unknown";',
                },
              ],
            },
            {
              label: "Keep modern class field syntax",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src"\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export class Counter { count = 0; }",
                },
              ],
            },
          ],
        },
        {
          name: "module",
          explanation:
            "Chooses emitted module syntax and influences module checking. Pair the module format with the runtime or bundler that loads it.",
          note: "Use NodeNext/NodeNext for Node ESM projects and ESNext/bundler for bundler pipelines. CommonJS plus bundler, as combined in the quick-reference image, is invalid.",
          source: "https://www.typescriptlang.org/tsconfig/module.html",
          examples: [
            {
              label: "Emit require-compatible exports",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src"\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const greet = (name: string) => `Hi, ${name}`;",
                },
              ],
            },
            {
              label: "Node ESM with explicit package type",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "NodeNext",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "moduleResolution": "NodeNext"\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const answer = 42;",
                },
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "private": true,\n  "type": "module",\n  "devDependencies": {\n    "typescript": "5.9.3"\n  },\n  "dependencies": {\n    "tslib": "2.8.1"\n  }\n}',
                },
              ],
            },
          ],
        },
        {
          name: "lib",
          explanation:
            "Chooses ambient declarations for standard APIs and host environments. Include only environments the application actually uses.",
          note: "Declarations do not polyfill APIs. DOM.Iterable adds iteration to DOM collections; WebWorker describes workers; ScriptHost describes Windows Script Host. Avoid combining DOM and WebWorker indiscriminately.",
          source: "https://www.typescriptlang.org/tsconfig/lib.html",
          examples: [
            {
              label: "Browser APIs",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "lib": [\n      "ES2022",\n      "DOM",\n      "DOM.Iterable"\n    ]\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'export const links = [...document.querySelectorAll("a")].map(a => a.href);',
                },
              ],
            },
            {
              label: "Worker APIs",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "lib": [\n      "ES2022",\n      "WebWorker"\n    ]\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'self.addEventListener("message", () => { console.log("worker message"); });\nexport {};',
                },
              ],
            },
          ],
        },
        {
          name: "strict",
          explanation:
            "Enables the compiler’s family of strict type checks. Use it as a project baseline and review errors when upgrading the compiler.",
          note: "The family also contains checks absent from the image; the listed suboptions below explain individual controls. It does not enable every diagnostic option, such as unused-variable checks.",
          source: "https://www.typescriptlang.org/tsconfig/strict.html",
          examples: [
            {
              label: "Strict object contract",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src"\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export function greet(user: { name: string }) { return user.name.toUpperCase(); }",
                },
              ],
            },
            {
              label: "Require an explicit check for optional values",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src"\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export function length(text?: string) { return text?.length ?? 0; }",
                },
              ],
            },
          ],
        },
        {
          name: "noImplicitAny",
          explanation:
            "Reports parameters and expressions that would otherwise acquire an implicit any type. Add a useful annotation or allow inference from context.",
          note: "Explicit any remains permitted; this flag does not ban all uses of any.",
          source: "https://www.typescriptlang.org/tsconfig/noImplicitAny.html",
          examples: [
            {
              label: "Annotate a function parameter",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "noImplicitAny": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export function double(value: number) { return value * 2; }",
                },
              ],
            },
            {
              label: "Infer a callback from its array",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "noImplicitAny": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const doubled = [1, 2].map(value => value * 2);",
                },
              ],
            },
          ],
        },
        {
          name: "strictNullChecks",
          explanation:
            "Keeps null and undefined distinct from ordinary values. Check a potentially missing result before accessing it.",
          note: "Required by strictPropertyInitialization and exactOptionalPropertyTypes.",
          source:
            "https://www.typescriptlang.org/tsconfig/strictNullChecks.html",
          examples: [
            {
              label: "Guard a search result",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "strictNullChecks": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'const user = [{ name: "Alice" }].find(user => user.name === "Alice");\nexport const name = user?.name ?? "Guest";',
                },
              ],
            },
            {
              label: "Narrow an explicit null union",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "strictNullChecks": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'export function upper(value: string | null) { return value === null ? "" : value.toUpperCase(); }',
                },
              ],
            },
          ],
        },
        {
          name: "moduleResolution",
          explanation:
            "Controls how module specifiers are matched to files and package exports. Select the algorithm used by the actual loader.",
          note: "bundler requires a compatible module setting (ESNext here). node16/nodenext model Node package rules; node/node10 is a legacy algorithm in 5.9, not a general recommendation. Future removal claims are version-specific. TypeScript 6.0 deprecates node10; use NodeNext for direct Node execution.",
          source:
            "https://www.typescriptlang.org/tsconfig/moduleResolution.html",
          examples: [
            {
              label: "Bundler accepts extensionless local imports",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "ESNext",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "moduleResolution": "Bundler",\n    "noEmit": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import { value } from "./value";\nexport { value };',
                },
                {
                  path: "src/value.ts",
                  language: "typescript",
                  code: "export const value = 42;",
                },
              ],
            },
            {
              label: "Node ESM uses emitted .js extension",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "NodeNext",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "moduleResolution": "NodeNext"\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import { value } from "./value.js";\nexport { value };',
                },
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "private": true,\n  "type": "module",\n  "devDependencies": {\n    "typescript": "5.9.3"\n  },\n  "dependencies": {\n    "tslib": "2.8.1"\n  }\n}',
                },
                {
                  path: "src/value.ts",
                  language: "typescript",
                  code: "export const value = 42;",
                },
              ],
            },
          ],
        },
        {
          name: "esModuleInterop",
          explanation:
            "Adds emit helpers for interoperating with CommonJS default and namespace imports. Use it when TypeScript emits CommonJS wrappers.",
          note: "Also enables allowSyntheticDefaultImports for type checking. Native ESM and bundlers supply their own interop behavior.",
          source:
            "https://www.typescriptlang.org/tsconfig/esModuleInterop.html",
          examples: [
            {
              label: "Default import of a CommonJS function",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "esModuleInterop": true,\n    "allowJs": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import greet from "./greet.cjs";\nexport const message = greet("Alice");',
                },
                {
                  path: "src/greet.cjs",
                  language: "javascript",
                  code: 'module.exports = function greet(name) { return "Hi, " + name; };',
                },
                {
                  path: "src/greet.d.cts",
                  language: "typescript",
                  code: "declare function greet(name: string): string;\nexport = greet;",
                },
              ],
            },
            {
              label: "Namespace import of a CommonJS object",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "esModuleInterop": true,\n    "allowJs": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import * as settings from "./settings.cjs";\nexport const port = settings.port;',
                },
                {
                  path: "src/settings.cjs",
                  language: "javascript",
                  code: "exports.port = 3000;",
                },
                {
                  path: "src/settings.d.cts",
                  language: "typescript",
                  code: "export const port: number;",
                },
              ],
            },
          ],
        },
        {
          name: "resolveJsonModule",
          explanation:
            "Lets imports of JSON files receive types inferred from their contents. Configure the runtime or bundler to load the same JSON format.",
          note: "Node ESM may require import attributes. These examples use CommonJS emit so Node can require JSON.",
          source:
            "https://www.typescriptlang.org/tsconfig/resolveJsonModule.html",
          examples: [
            {
              label: "Read JSON configuration",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "resolveJsonModule": true,\n    "esModuleInterop": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import config from "./config.json";\nexport const port: number = config.port;',
                },
                {
                  path: "src/config.json",
                  language: "json",
                  code: '{"port":3000}',
                },
              ],
            },
            {
              label: "Infer JSON arrays",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "resolveJsonModule": true,\n    "esModuleInterop": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import roles from "./roles.json";\nexport const names = roles.map(role => role.toUpperCase());',
                },
                {
                  path: "src/roles.json",
                  language: "json",
                  code: '["admin","user"]',
                },
              ],
            },
          ],
        },
        {
          name: "outDir",
          explanation:
            "Places emitted files under a separate output directory. Use it to keep build output away from source files.",
          note: "The relative layout under rootDir is preserved; clean stale output separately when deleting or moving source files.",
          source: "https://www.typescriptlang.org/tsconfig/outDir.html",
          examples: [
            {
              label: "Default distribution folder",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src"\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const value = 42;",
                },
              ],
            },
            {
              label: "Separate server output folder",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "build/server",\n    "rootDir": "src"\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'export const service = "api";',
                },
              ],
            },
          ],
        },
        {
          name: "rootDir",
          explanation:
            "Sets the directory used to calculate emitted relative paths. Keep all emitted source files beneath it.",
          note: "It does not select input files; include/files and imports do that. Declaration files outside rootDir can still supply types.",
          source: "https://www.typescriptlang.org/tsconfig/rootDir.html",
          examples: [
            {
              label: "Emit src/main.ts as dist/main.js",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src"\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const value = 42;",
                },
              ],
            },
            {
              label: "Preserve src within output",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "."\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const value = 42;",
                },
              ],
            },
          ],
        },
        {
          name: "sourceMap",
          explanation:
            "Emits external .js.map files so debuggers can relate JavaScript to TypeScript. Serve maps with output when source debugging is desired.",
          note: "Maps can expose source paths; decide deliberately whether to publish them.",
          source: "https://www.typescriptlang.org/tsconfig/sourceMap.html",
          examples: [
            {
              label: "External source map",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "sourceMap": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const square = (n: number) => n * n;",
                },
              ],
            },
            {
              label: "Embed source text in an external map",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "sourceMap": true,\n    "inlineSources": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const cube = (n: number) => n ** 3;",
                },
              ],
            },
          ],
        },
        {
          name: "declaration",
          explanation:
            "Emits .d.ts descriptions of exported APIs. Enable it when consumers need to type-check against built code.",
          note: "Declarations describe runtime code; they do not implement or package it.",
          source: "https://www.typescriptlang.org/tsconfig/declaration.html",
          examples: [
            {
              label: "Publish a function signature",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "declaration": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export function greet(name: string) { return `Hi, ${name}`; }",
                },
              ],
            },
            {
              label: "Publish an interface and implementation",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "declaration": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'export interface User { name: string }\nexport const user: User = { name: "Alice" };',
                },
              ],
            },
          ],
        },
        {
          name: "allowJs",
          explanation:
            "Includes JavaScript source files in a TypeScript program. Use it for a gradual migration or declaration generation from JavaScript.",
          note: "Keep outDir separate from input files to avoid overwriting JavaScript sources.",
          source: "https://www.typescriptlang.org/tsconfig/allowJs.html",
          examples: [
            {
              label: "Compile an existing JS module",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "allowJs": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.js",
                  language: "javascript",
                  code: "export const answer = 42;",
                },
              ],
            },
            {
              label: "Generate declarations from JSDoc",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "allowJs": true,\n    "declaration": true,\n    "emitDeclarationOnly": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.js",
                  language: "javascript",
                  code: "/** @param {string} name */\nexport function greet(name) { return `Hi, ${name}`; }",
                },
              ],
            },
          ],
        },
        {
          name: "checkJs",
          explanation:
            "Reports type errors in JavaScript files using inference and JSDoc. Enable it for a project-wide JavaScript checking policy.",
          note: "Requires allowJs for included .js files. Individual files can also opt in with // @ts-check.",
          source: "https://www.typescriptlang.org/tsconfig/checkJs.html",
          examples: [
            {
              label: "Check JSDoc parameters",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "allowJs": true,\n    "checkJs": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.js",
                  language: "javascript",
                  code: "/** @param {number} n */\nexport function double(n) { return n * 2; }",
                },
              ],
            },
            {
              label: "Check a JSDoc object",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "allowJs": true,\n    "checkJs": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.js",
                  language: "javascript",
                  code: "/** @type {{port: number}} */\nexport const config = { port: 3000 };",
                },
              ],
            },
          ],
        },
        {
          name: "skipLibCheck",
          explanation:
            "Skips full checking of declaration-file bodies to reduce checking work. Use it deliberately when dependency declaration checks are expensive.",
          note: "It does not remove declarations, disable checking your application, or guarantee that inconsistent dependency types are safe.",
          source: "https://www.typescriptlang.org/tsconfig/skipLibCheck.html",
          examples: [
            {
              label: "Faster application checks",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "skipLibCheck": true,\n    "noEmit": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const answer: number = 42;",
                },
              ],
            },
            {
              label: "Check declarations in a package build",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "skipLibCheck": false,\n    "declaration": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export interface Options { debug?: boolean }",
                },
              ],
            },
          ],
        },
        {
          name: "forceConsistentCasingInFileNames",
          explanation:
            "Reports inconsistent casing of file references. Keep imports identical to filenames for portability across filesystems.",
          note: "Filesystem behavior still matters; use the same capitalization even when developing on a case-insensitive volume.",
          source:
            "https://www.typescriptlang.org/tsconfig/forceConsistentCasingInFileNames.html",
          examples: [
            {
              label: "Match a capitalized filename",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "forceConsistentCasingInFileNames": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import { value } from "./Value";\nexport { value };',
                },
                {
                  path: "src/Value.ts",
                  language: "typescript",
                  code: "export const value = 42;",
                },
              ],
            },
            {
              label: "Match a lowercase filename",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "forceConsistentCasingInFileNames": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import { value } from "./value";\nexport { value };',
                },
                {
                  path: "src/value.ts",
                  language: "typescript",
                  code: "export const value = 7;",
                },
              ],
            },
          ],
        },
        {
          name: "strictFunctionTypes",
          explanation:
            "Checks function-typed parameter compatibility more carefully during assignment. Use it to reject callbacks that accept fewer input cases than their callers can send.",
          note: "Method and constructor declarations have a compatibility exception; prefer function-valued properties when this distinction matters.",
          source:
            "https://www.typescriptlang.org/tsconfig/strictFunctionTypes.html",
          examples: [
            {
              label: "Callback accepts every promised input",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "strictFunctionTypes": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const format: (value: string | number) => string = value => String(value);",
                },
              ],
            },
            {
              label: "Function-valued property contract",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "strictFunctionTypes": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const handler: { run: (value: string | number) => string } = { run: value => String(value) };",
                },
              ],
            },
          ],
        },
        {
          name: "strictBindCallApply",
          explanation:
            "Checks argument lists passed through bind, call, and apply. Use it when functions are invoked indirectly.",
          note: "Enabled by strict unless explicitly overridden.",
          source:
            "https://www.typescriptlang.org/tsconfig/strictBindCallApply.html",
          examples: [
            {
              label: "Typed call arguments",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "strictBindCallApply": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'function greet(name: string) { return name.toUpperCase(); }\nexport const result = greet.call(undefined, "Alice");',
                },
              ],
            },
            {
              label: "Typed bound arguments",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "strictBindCallApply": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "function add(a: number, b: number) { return a + b; }\nexport const addTwo = add.bind(undefined, 2);\nexport const result = addTwo(3);",
                },
              ],
            },
          ],
        },
        {
          name: "strictPropertyInitialization",
          explanation:
            "Checks that required instance fields are initialized. Use field initializers or assignments in the constructor.",
          note: "Requires strictNullChecks. A definite-assignment assertion (!) bypasses this proof and should be reserved for externally guaranteed initialization.",
          source:
            "https://www.typescriptlang.org/tsconfig/strictPropertyInitialization.html",
          examples: [
            {
              label: "Initialize in the constructor",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "strictPropertyInitialization": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export class User { name: string; constructor(name: string) { this.name = name; } }",
                },
              ],
            },
            {
              label: "Use an initializer or an optional field",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "strictPropertyInitialization": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'export class Profile { name = "Guest"; age?: number; }',
                },
              ],
            },
          ],
        },
        {
          name: "noImplicitThis",
          explanation:
            "Reports this expressions whose type would otherwise be implicit any. Annotate standalone functions or use lexical this.",
          note: "An explicit this parameter is erased; it constrains valid calls without becoming a runtime argument.",
          source: "https://www.typescriptlang.org/tsconfig/noImplicitThis.html",
          examples: [
            {
              label: "Declare a receiver contract",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "noImplicitThis": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export function title(this: { name: string }) { return this.name.toUpperCase(); }",
                },
              ],
            },
            {
              label: "Capture the class receiver with an arrow",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "noImplicitThis": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export class Counter { count = 0; increment = () => ++this.count; }",
                },
              ],
            },
          ],
        },
        {
          name: "alwaysStrict",
          explanation:
            "Parses files under strict-mode rules and emits a strict directive where appropriate. Use it for consistent JavaScript semantics.",
          note: "ES modules are already strict. This flag concerns JavaScript strict mode, not the entire TypeScript strict family.",
          source: "https://www.typescriptlang.org/tsconfig/alwaysStrict.html",
          examples: [
            {
              label: "Strict CommonJS output",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "alwaysStrict": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export function identity(value: string) { return value; }",
                },
              ],
            },
            {
              label: "Native ESM is inherently strict",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "ESNext",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "alwaysStrict": true,\n    "moduleResolution": "Bundler"\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const answer = 42;",
                },
              ],
            },
          ],
        },
        {
          name: "noUnusedLocals",
          explanation:
            "Reports unused local bindings, including unused module-level locals. Use it to catch abandoned code.",
          note: "Exported bindings form a public API and are not treated as unused just because this file does not read them.",
          source: "https://www.typescriptlang.org/tsconfig/noUnusedLocals.html",
          examples: [
            {
              label: "Use a local intermediate",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "noUnusedLocals": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "const base = 20;\nexport const answer = base + 22;",
                },
              ],
            },
            {
              label: "Export an intentionally public function",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "noUnusedLocals": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'export function greet() { return "Hello"; }',
                },
              ],
            },
          ],
        },
        {
          name: "noUnusedParameters",
          explanation:
            "Reports unused function parameters. Use it to keep signatures intentional.",
          note: "Parameters prefixed with an underscore are exempt, which helps implement required callback signatures.",
          source:
            "https://www.typescriptlang.org/tsconfig/noUnusedParameters.html",
          examples: [
            {
              label: "Use every parameter",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "noUnusedParameters": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export function add(a: number, b: number) { return a + b; }",
                },
              ],
            },
            {
              label: "Mark a required but unused callback parameter",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "noUnusedParameters": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'export const positions = ["a", "b"].map((_value, index) => index);',
                },
              ],
            },
          ],
        },
        {
          name: "noImplicitReturns",
          explanation:
            "Reports functions with value-returning paths that do not return on every path. Give each meaningful branch a result.",
          note: "It does not require every void function to return a value.",
          source:
            "https://www.typescriptlang.org/tsconfig/noImplicitReturns.html",
          examples: [
            {
              label: "Return from both branches",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "noImplicitReturns": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'export function label(active: boolean) { if (active) return "On"; return "Off"; }',
                },
              ],
            },
            {
              label: "Use an expression for total coverage",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "noImplicitReturns": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'export const sign = (n: number) => n < 0 ? "negative" : "nonnegative";',
                },
              ],
            },
          ],
        },
        {
          name: "noFallthroughCasesInSwitch",
          explanation:
            "Reports nonempty switch cases that fall into the next case. End those cases deliberately.",
          note: "Empty case labels can still be grouped.",
          source:
            "https://www.typescriptlang.org/tsconfig/noFallthroughCasesInSwitch.html",
          examples: [
            {
              label: "End each nonempty case",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "noFallthroughCasesInSwitch": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'export function label(n: number) { switch (n) { case 1: return "one"; default: return "other"; } }',
                },
              ],
            },
            {
              label: "Group empty case labels",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "noFallthroughCasesInSwitch": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export function isSmall(n: number) { switch (n) { case 1: case 2: return true; default: return false; } }",
                },
              ],
            },
          ],
        },
        {
          name: "noUncheckedIndexedAccess",
          explanation:
            "Adds undefined to values read through unchecked array indices and index signatures. Narrow or provide a fallback before use.",
          note: "Known required properties keep their declared types.",
          source:
            "https://www.typescriptlang.org/tsconfig/noUncheckedIndexedAccess.html",
          examples: [
            {
              label: "Handle a missing array item",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "noUncheckedIndexedAccess": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'export const first = ["Alice"][0]?.toUpperCase() ?? "Guest";',
                },
              ],
            },
            {
              label: "Handle an unknown dictionary key",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "noUncheckedIndexedAccess": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'const scores: Record<string, number> = { alice: 10 };\nexport const score = scores["bob"] ?? 0;',
                },
              ],
            },
          ],
        },
        {
          name: "exactOptionalPropertyTypes",
          explanation:
            "Distinguishes an absent optional property from one explicitly set to undefined. Add undefined to the property type when that is part of the contract.",
          note: "Requires strictNullChecks; reading an optional property can still produce undefined.",
          source:
            "https://www.typescriptlang.org/tsconfig/exactOptionalPropertyTypes.html",
          examples: [
            {
              label: "Omit an optional field",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "exactOptionalPropertyTypes": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const user: { name?: string } = {};",
                },
              ],
            },
            {
              label: "Explicitly permit an undefined value",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "exactOptionalPropertyTypes": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const user: { name?: string | undefined } = { name: undefined };",
                },
              ],
            },
          ],
        },
        {
          name: "baseUrl",
          explanation:
            "Sets a base directory for bare-specifier lookup. Use it only when that lookup agrees with the runtime or bundler.",
          note: "Not required for paths since TypeScript 4.1. It never rewrites emitted specifiers; paths are usually clearer for application aliases. These are checker-only examples. Legacy 5.x example: this setting is deprecated in TypeScript 6.0. See its release notes before upgrading.",
          source:
            "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html",
          examples: [
            {
              label: "Resolve a bare source name",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "baseUrl": "./src",\n    "noEmit": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import { value } from "value";\nexport { value };',
                },
                {
                  path: "src/value.ts",
                  language: "typescript",
                  code: "export const value = 42;",
                },
              ],
            },
            {
              label: "Resolve from project root",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "baseUrl": ".",\n    "noEmit": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import { value } from "src/value";\nexport { value };',
                },
                {
                  path: "src/value.ts",
                  language: "typescript",
                  code: "export const value = 7;",
                },
              ],
            },
          ],
        },
        {
          name: "paths",
          explanation:
            "Maps import patterns to candidate source locations for type checking. Mirror the aliases in the runtime or bundler.",
          note: "paths does not rewrite imports or configure a loader. Without baseUrl, paths are relative to the tsconfig file. The # pattern below is a checker alias, not a substitute for Node package imports.",
          source: "https://www.typescriptlang.org/tsconfig/paths.html",
          examples: [
            {
              label: "Map @/ to src/",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "paths": {\n      "@/*": [\n        "./src/*"\n      ]\n    },\n    "noEmit": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import { value } from "@/value";\nexport { value };',
                },
                {
                  path: "src/value.ts",
                  language: "typescript",
                  code: "export const value = 42;",
                },
              ],
            },
            {
              label: "Map ~/ and #/ to application folders",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "paths": {\n      "~/*": [\n        "./src/app/*"\n      ],\n      "#/*": [\n        "./src/lib/*"\n      ]\n    },\n    "noEmit": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import { title } from "~/title";\nimport { value } from "#/value";\nexport { title, value };',
                },
                {
                  path: "src/app/title.ts",
                  language: "typescript",
                  code: 'export const title = "Demo";',
                },
                {
                  path: "src/lib/value.ts",
                  language: "typescript",
                  code: "export const value = 42;",
                },
              ],
            },
          ],
        },
        {
          name: "rootDirs",
          explanation:
            "Treats several directories as one virtual tree for relative module lookup. Use it for generated files alongside handwritten files.",
          note: "This affects resolution only; it neither merges directories on disk nor fixes runtime relative paths.",
          source: "https://www.typescriptlang.org/tsconfig/rootDirs.html",
          examples: [
            {
              label: "Find a generated sibling",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": ".",\n    "rootDirs": [\n      "src",\n      "generated"\n    ],\n    "noEmit": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import { value } from "./value";\nexport { value };',
                },
                {
                  path: "generated/value.ts",
                  language: "typescript",
                  code: "export const value = 42;",
                },
              ],
            },
            {
              label: "Find generated nested content",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": ".",\n    "rootDirs": [\n      "src",\n      "generated"\n    ],\n    "noEmit": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import { title } from "./views/title";\nexport { title };',
                },
                {
                  path: "generated/views/title.ts",
                  language: "typescript",
                  code: 'export const title = "Demo";',
                },
              ],
            },
          ],
        },
        {
          name: "typeRoots",
          explanation:
            "Limits automatic ambient type-package discovery to specified folders. Use package-shaped subdirectories under each root.",
          note: "When overridden, default node_modules/@types roots are not automatically retained. Imported packages can still bring their own types.",
          source: "https://www.typescriptlang.org/tsconfig/typeRoots.html",
          examples: [
            {
              label: "Load a local ambient package",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "outDir": "dist",\n    "rootDir": "src",\n    "typeRoots": [\n      "./types"\n    ]\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const name = APP_NAME;",
                },
                {
                  path: "types/project/index.d.ts",
                  language: "typescript",
                  code: "declare const APP_NAME: string;",
                },
              ],
            },
            {
              label: "Keep local and installed ambient roots",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "outDir": "dist",\n    "rootDir": "src",\n    "typeRoots": [\n      "./types",\n      "./node_modules/@types"\n    ]\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const id = BUILD_ID;",
                },
                {
                  path: "types/project/index.d.ts",
                  language: "typescript",
                  code: "declare const BUILD_ID: number;",
                },
              ],
            },
          ],
        },
        {
          name: "types",
          explanation:
            "Selects ambient type packages to include globally. Use an explicit list to keep unrelated globals out of the project.",
          note: "types: [] disables automatic ambient package inclusion, not types obtained from imports or explicit declarations.",
          source: "https://www.typescriptlang.org/tsconfig/types.html",
          examples: [
            {
              label: "No automatic ambient globals",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src"\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const value = 42;",
                },
              ],
            },
            {
              label: "Select one local ambient package",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [\n      "project"\n    ],\n    "outDir": "dist",\n    "rootDir": "src",\n    "typeRoots": [\n      "./types"\n    ]\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const name = APP_NAME;",
                },
                {
                  path: "types/project/index.d.ts",
                  language: "typescript",
                  code: "declare const APP_NAME: string;",
                },
              ],
            },
          ],
        },
        {
          name: "allowSyntheticDefaultImports",
          explanation:
            "Permits default-import syntax when the underlying module has no declared default export. Use it only with a loader that implements the expected interop.",
          note: "This flag changes checking, not JavaScript emit. The first example is checker-only; the second also enables emit helpers.",
          source:
            "https://www.typescriptlang.org/tsconfig/allowSyntheticDefaultImports.html",
          examples: [
            {
              label: "Let a bundler handle CommonJS interop",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "ESNext",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "moduleResolution": "Bundler",\n    "allowSyntheticDefaultImports": true,\n    "noEmit": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import greet from "./greet.cjs";\nexport const message = greet("Alice");',
                },
                {
                  path: "src/greet.cjs",
                  language: "javascript",
                  code: 'module.exports = function greet(name) { return "Hi, " + name; };',
                },
                {
                  path: "src/greet.d.cts",
                  language: "typescript",
                  code: "declare function greet(name: string): string;\nexport = greet;",
                },
              ],
            },
            {
              label: "Pair synthetic imports with CommonJS helpers",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "allowSyntheticDefaultImports": true,\n    "esModuleInterop": true,\n    "allowJs": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import greet from "./greet.cjs";\nexport const message = greet("Bob");',
                },
                {
                  path: "src/greet.cjs",
                  language: "javascript",
                  code: 'module.exports = function greet(name) { return "Hi, " + name; };',
                },
                {
                  path: "src/greet.d.cts",
                  language: "typescript",
                  code: "declare function greet(name: string): string;\nexport = greet;",
                },
              ],
            },
          ],
        },
        {
          name: "outFile",
          explanation:
            "Concatenates supported script or AMD/System output into one file. Use a bundler for modern ESM/CommonJS applications.",
          note: "Only module none, AMD, or System is compatible; outFile is not a general-purpose dependency bundler. Legacy 5.x example: this setting is deprecated in TypeScript 6.0. See its release notes before upgrading.",
          source:
            "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html",
          examples: [
            {
              label: "Combine global scripts",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "None",\n    "strict": true,\n    "types": [],\n    "rootDir": "src",\n    "outFile": "dist/bundle.js"\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "const answer: number = 42;",
                },
              ],
            },
            {
              label: "Bundle AMD module definitions",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "AMD",\n    "strict": true,\n    "types": [],\n    "rootDir": "src",\n    "outFile": "dist/amd.js"\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const answer = 42;",
                },
              ],
            },
          ],
        },
        {
          name: "declarationMap",
          explanation:
            "Creates maps linking emitted declarations back to source. Use it to support editor navigation for library consumers.",
          note: "Requires declaration or composite; distribute source files if the maps refer to them.",
          source: "https://www.typescriptlang.org/tsconfig/declarationMap.html",
          examples: [
            {
              label: "Declarations with source navigation",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "declaration": true,\n    "declarationMap": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export function double(n: number) { return n * 2; }",
                },
              ],
            },
            {
              label: "Declaration-only mapped API",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "declaration": true,\n    "declarationMap": true,\n    "emitDeclarationOnly": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export interface User { name: string }",
                },
              ],
            },
          ],
        },
        {
          name: "emitDeclarationOnly",
          explanation:
            "Writes type declarations without JavaScript output. Use it when another tool emits executable code.",
          note: "Requires declaration or composite; do not set noEmit at the same time if you want declaration files.",
          source:
            "https://www.typescriptlang.org/tsconfig/emitDeclarationOnly.html",
          examples: [
            {
              label: "Types for a bundler-built library",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "declaration": true,\n    "emitDeclarationOnly": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const answer = 42;",
                },
              ],
            },
            {
              label: "Types inferred from JS",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "declaration": true,\n    "emitDeclarationOnly": true,\n    "allowJs": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const answer = 42;",
                },
              ],
            },
          ],
        },
        {
          name: "inlineSourceMap",
          explanation:
            "Embeds the JavaScript source map as a data URL in the emitted file. Use it when a separate map file is inconvenient.",
          note: "Mutually exclusive with sourceMap. inlineSources can additionally embed the source text.",
          source:
            "https://www.typescriptlang.org/tsconfig/inlineSourceMap.html",
          examples: [
            {
              label: "Inline the map",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "inlineSourceMap": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const answer = 42;",
                },
              ],
            },
            {
              label: "Inline map and original source",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "inlineSourceMap": true,\n    "inlineSources": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'export const greeting = "Hello";',
                },
              ],
            },
          ],
        },
        {
          name: "inlineSources",
          explanation:
            "Includes original source text in source maps. Use it when a debugger cannot fetch the original files.",
          note: "Requires sourceMap or inlineSourceMap. Consider source disclosure before publishing.",
          source: "https://www.typescriptlang.org/tsconfig/inlineSources.html",
          examples: [
            {
              label: "Source text inside an external map",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "sourceMap": true,\n    "inlineSources": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const answer = 42;",
                },
              ],
            },
            {
              label: "Source text inside an inline map",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "inlineSourceMap": true,\n    "inlineSources": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'export const title = "Demo";',
                },
              ],
            },
          ],
        },
        {
          name: "removeComments",
          explanation:
            "Removes most source comments from emitted JavaScript. Use it to reduce output clutter when a bundler does not already handle this.",
          note: "Some specially handled comments may remain; do not use this as a licensing or secret-removal mechanism.",
          source: "https://www.typescriptlang.org/tsconfig/removeComments.html",
          examples: [
            {
              label: "Remove explanatory source comments",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "removeComments": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "// Internal explanation.\nexport const answer = 42;",
                },
              ],
            },
            {
              label: "Retain comments for readable output",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "removeComments": false\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "// Public explanation.\nexport const answer = 42;",
                },
              ],
            },
          ],
        },
        {
          name: "noEmit",
          explanation:
            "Runs the compiler without writing JavaScript, declarations, or maps. Use it when a bundler owns output generation.",
          note: "Type checking can still report errors. Build metadata may still be written when incremental is enabled.",
          source: "https://www.typescriptlang.org/tsconfig/noEmit.html",
          examples: [
            {
              label: "Check source only",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "noEmit": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const answer: number = 42;",
                },
              ],
            },
            {
              label: "Check a bundler project",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "ESNext",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "noEmit": true,\n    "moduleResolution": "Bundler"\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'export const title = "Demo";',
                },
              ],
            },
          ],
        },
        {
          name: "noEmitOnError",
          explanation:
            "Prevents output when compilation reports errors. Use it to avoid producing a build that failed checking.",
          note: "The default is false; existing output is not deleted. Both examples are error-free and therefore emit.",
          source: "https://www.typescriptlang.org/tsconfig/noEmitOnError.html",
          examples: [
            {
              label: "Gate an application build",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "noEmitOnError": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const answer: number = 42;",
                },
              ],
            },
            {
              label: "Gate library declaration emit",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "noEmitOnError": true,\n    "declaration": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export function greet(name: string) { return name; }",
                },
              ],
            },
          ],
        },
        {
          name: "preserveConstEnums",
          explanation:
            "Keeps runtime enum objects for const enum declarations. Use it when runtime enum objects must be retained.",
          note: "Member uses can still be inlined. Publishing ambient const enums introduces consumer compatibility issues.",
          source:
            "https://www.typescriptlang.org/tsconfig/preserveConstEnums.html",
          examples: [
            {
              label: "Keep the enum object",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "preserveConstEnums": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const enum Status { Ready, Done }\nexport const current = Status.Ready;",
                },
              ],
            },
            {
              label: "Erase the enum object",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "preserveConstEnums": false\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const enum Status { Ready, Done }\nexport const current = Status.Done;",
                },
              ],
            },
          ],
        },
        {
          name: "importHelpers",
          explanation:
            "Imports reusable downlevel helpers from tslib rather than duplicating them per module. Use it for a compiled package with repeated helper needs.",
          note: "Install tslib as a runtime dependency. Helpers are only imported when the selected transform requires them; these examples use an already available __assign export.",
          source: "https://www.typescriptlang.org/tsconfig/importHelpers.html",
          examples: [
            {
              label: "Import the object-spread helper",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES5",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "lib": [\n      "ES2015",\n      "DOM"\n    ],\n    "importHelpers": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "const source = { answer: 42 };\nexport const copy = { ...source };",
                },
              ],
            },
            {
              label: "Inline helpers without tslib",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES5",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "lib": [\n      "ES2015",\n      "DOM"\n    ],\n    "importHelpers": false\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "const source = { answer: 42 };\nexport const copy = { ...source };",
                },
              ],
            },
          ],
        },
        {
          name: "downlevelIteration",
          explanation:
            "Uses iterator-aware helpers for iteration when targeting older JavaScript. Use it when strings or custom iterables need iterator semantics.",
          note: "The runtime needs Symbol.iterator or a suitable polyfill for iterator behavior. It does not add those APIs. Legacy 5.x example: this setting is deprecated in TypeScript 6.0. See its release notes before upgrading.",
          source:
            "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html",
          examples: [
            {
              label: "Iterate Unicode code points with an ES5 target",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES5",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "lib": [\n      "ES2015",\n      "DOM"\n    ],\n    "downlevelIteration": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'export const letters = [..."A😀"];',
                },
              ],
            },
            {
              label: "Iterate a Set with an ES5 target",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES5",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "lib": [\n      "ES2015",\n      "DOM"\n    ],\n    "downlevelIteration": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const values = [...new Set([1, 1, 2])];",
                },
              ],
            },
          ],
        },
        {
          name: "preserveValueImports",
          explanation:
            "Legacy option for retaining value imports; removed from usable configuration in TypeScript 5.5. Migrate to verbatimModuleSyntax.",
          note: "The examples show the replacement rather than an invalid preserveValueImports setting. With verbatimModuleSyntax, use explicit type imports and compatible ESM module settings.",
          source:
            "https://www.typescriptlang.org/tsconfig/preserveValueImports.html",
          examples: [
            {
              label: "Keep an explicit value import",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "ESNext",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "moduleResolution": "Bundler",\n    "verbatimModuleSyntax": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import { value } from "./value.js";\nexport const answer = value;',
                },
                {
                  path: "src/value.ts",
                  language: "typescript",
                  code: "export const value = 42;",
                },
              ],
            },
            {
              label: "Erase an explicitly type-only import",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "ESNext",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "moduleResolution": "Bundler",\n    "verbatimModuleSyntax": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import type { User } from "./user.js";\nexport const user: User = { name: "Alice" };',
                },
                {
                  path: "src/user.ts",
                  language: "typescript",
                  code: "export interface User { name: string }",
                },
              ],
            },
          ],
        },
        {
          name: "incremental",
          explanation:
            "Stores compiler build information for reuse across runs. Use it to speed repeated project checks or builds.",
          note: "Run the same command again to reuse metadata; deleting the cache is safe. Cache compatibility follows the compiler version.",
          source: "https://www.typescriptlang.org/tsconfig/incremental.html",
          examples: [
            {
              label: "Cache a build",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "incremental": true,\n    "tsBuildInfoFile": ".cache/build.tsbuildinfo"\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const answer = 42;",
                },
              ],
            },
            {
              label: "Cache type checking",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "incremental": true,\n    "noEmit": true,\n    "tsBuildInfoFile": ".cache/check.tsbuildinfo"\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'export const title = "Demo";',
                },
              ],
            },
          ],
        },
        {
          name: "tsBuildInfoFile",
          explanation:
            "Chooses where incremental or composite build metadata is stored. Use distinct files for independently configured builds.",
          note: "It controls cache location, not JavaScript output. Enable incremental or composite.",
          source:
            "https://www.typescriptlang.org/tsconfig/tsBuildInfoFile.html",
          examples: [
            {
              label: "Application cache location",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "incremental": true,\n    "tsBuildInfoFile": ".cache/app.tsbuildinfo"\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const answer = 42;",
                },
              ],
            },
            {
              label: "Library cache location",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "composite": true,\n    "tsBuildInfoFile": ".cache/library.tsbuildinfo"\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'export const title = "Demo";',
                },
              ],
            },
          ],
        },
        {
          name: "composite",
          explanation:
            "Makes a project suitable for references and enforces a complete input boundary. Use it for independently built packages.",
          note: "Implies incremental behavior and declaration generation. Every implementation file must be listed or matched by include.",
          source: "https://www.typescriptlang.org/tsconfig/composite.html",
          examples: [
            {
              label: "Build a referenceable package",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "composite": true,\n    "declaration": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const answer = 42;",
                },
              ],
            },
            {
              label: "Include every implementation file in a composite package",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "composite": true,\n    "declaration": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'export { value } from "./value";',
                },
                {
                  path: "src/value.ts",
                  language: "typescript",
                  code: "export const value = 42;",
                },
              ],
            },
          ],
        },
        {
          name: "disableSourceOfProjectReferenceRedirect",
          explanation:
            "Makes the editor prefer referenced declaration output instead of redirecting to referenced source. Use it when source redirection is too costly in a large workspace.",
          note: "Relevant to project-reference editor behavior, not a general speed switch. The examples provide a referenced package; run npx tsc -b tsconfig.json.",
          source:
            "https://www.typescriptlang.org/tsconfig/disableSourceOfProjectReferenceRedirect.html",
          examples: [
            {
              label: "Prefer built referenced declarations",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "disableSourceOfProjectReferenceRedirect": true\n  },\n  "include": [\n    "src/**/*"\n  ],\n  "references": [\n    {\n      "path": "./lib"\n    }\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import { value } from "../lib";\nexport { value };',
                },
                {
                  path: "lib/tsconfig.json",
                  language: "json",
                  code: '{"compilerOptions":{"composite":true,"strict":true,"types":[]},"files":["index.ts"]}',
                },
                {
                  path: "lib/index.ts",
                  language: "typescript",
                  code: "export const value = 42;",
                },
              ],
            },
            {
              label: "Allow editor source redirection",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "disableSourceOfProjectReferenceRedirect": false\n  },\n  "include": [\n    "src/**/*"\n  ],\n  "references": [\n    {\n      "path": "./lib"\n    }\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'import { value } from "../lib";\nexport { value };',
                },
                {
                  path: "lib/tsconfig.json",
                  language: "json",
                  code: '{"compilerOptions":{"composite":true,"strict":true,"types":[]},"files":["index.ts"]}',
                },
                {
                  path: "lib/index.ts",
                  language: "typescript",
                  code: "export const value = 7;",
                },
              ],
            },
          ],
        },
        {
          name: "maxNodeModuleJsDepth",
          explanation:
            "Controls how far checking can follow JavaScript implementations in node_modules when allowJs is enabled. Increase it only when dependency source inference is needed.",
          note: "Prefer package declarations when available. A larger depth can increase work and diagnostics.",
          source:
            "https://www.typescriptlang.org/tsconfig/maxNodeModuleJsDepth.html",
          examples: [
            {
              label: "Do not infer dependency JavaScript deeply",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "allowJs": true,\n    "maxNodeModuleJsDepth": 0\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.js",
                  language: "javascript",
                  code: "export const answer = 42;",
                },
              ],
            },
            {
              label: "Follow one level of dependency JavaScript",
              note: "After installing the shared dependencies, create the shown node_modules/local-double fixture to simulate an installed untyped package. Run npx tsc -p tsconfig.json; depth 1 makes its JSDoc signature available.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "allowJs": true,\n    "maxNodeModuleJsDepth": 1\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.js",
                  language: "javascript",
                  code: 'import { double } from "local-double";\nexport const answer = double(21);',
                },
                {
                  path: "node_modules/local-double/package.json",
                  language: "json",
                  code: '{"name":"local-double","version":"1.0.0","main":"index.js"}',
                },
                {
                  path: "node_modules/local-double/index.js",
                  language: "javascript",
                  code: "/** @param {number} value */\nexports.double = function (value) { return value * 2; };",
                },
              ],
            },
          ],
        },
        {
          name: "jsx",
          explanation:
            "Chooses whether JSX is preserved or transformed, and which runtime receives it. Match the mode to the application framework.",
          note: "preserve leaves JSX in .jsx files; react uses React.createElement; react-jsx and react-jsxdev use automatic runtime imports; react-native preserves JSX with .js output. Automatic modes need a compatible JSX runtime package.",
          source: "https://www.typescriptlang.org/tsconfig/jsx.html",
          examples: [
            {
              label: "Preserve JSX for a later transform",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "ESNext",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "moduleResolution": "Bundler",\n    "jsx": "preserve",\n    "noEmit": false\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.tsx",
                  language: "tsx",
                  code: "declare namespace JSX { interface IntrinsicElements { div: { children?: string } } }\nconst view = <div>Hello</div>;",
                },
              ],
            },
            {
              label: "Classic factory with an explicit local runtime",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "ESNext",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "moduleResolution": "Bundler",\n    "jsx": "react",\n    "noEmit": false\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.tsx",
                  language: "tsx",
                  code: "const React = { createElement: (tag: string, props: unknown, ...children: unknown[]) => ({ tag, props, children }) };\ndeclare namespace JSX { interface IntrinsicElements { div: { children?: string } } }\nconst view = <div>Hello</div>;",
                },
              ],
            },
          ],
        },
        {
          name: "experimentalDecorators",
          explanation:
            "Enables the legacy decorator model used by some frameworks. Use it only for code written for that model.",
          note: "Modern standard decorators in TypeScript 5+ use a different API and do not require this flag. Do not interchange the two signatures.",
          source:
            "https://www.typescriptlang.org/tsconfig/experimentalDecorators.html",
          examples: [
            {
              label: "Legacy class decorator",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "experimentalDecorators": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "function sealed(target: Function) { Object.seal(target); }\n@sealed\nexport class Service {}",
                },
              ],
            },
            {
              label: "Legacy method decorator",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "experimentalDecorators": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "function enumerable(_target: object, _key: string, descriptor: PropertyDescriptor) { descriptor.enumerable = false; }\nexport class Service { @enumerable run() { return 42; } }",
                },
              ],
            },
          ],
        },
        {
          name: "emitDecoratorMetadata",
          explanation:
            "Emits design-type metadata for legacy decorated declarations. Enable it when a legacy framework needs runtime type metadata.",
          note: "Requires experimentalDecorators; emitted metadata needs a compatible runtime such as reflect-metadata to be consumed. Interfaces and generics do not become full runtime schemas.",
          source:
            "https://www.typescriptlang.org/tsconfig/emitDecoratorMetadata.html",
          examples: [
            {
              label: "Emit legacy method metadata",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "experimentalDecorators": true,\n    "emitDecoratorMetadata": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "function mark(_target: object, _key: string, _descriptor: PropertyDescriptor) {}\nexport class Service { @mark run(value: string): number { return value.length; } }",
                },
              ],
            },
            {
              label: "Keep legacy decorators without metadata",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "experimentalDecorators": true,\n    "emitDecoratorMetadata": false\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "function mark(target: Function) {}\n@mark\nexport class Service {}",
                },
              ],
            },
          ],
        },
        {
          name: "useDefineForClassFields",
          explanation:
            "Uses JavaScript class-field definition semantics rather than assignment semantics. Match it to the desired runtime behavior.",
          note: "Definition semantics can differ from assignments around inherited setters. This changes runtime behavior, not only type checking.",
          source:
            "https://www.typescriptlang.org/tsconfig/useDefineForClassFields.html",
          examples: [
            {
              label: "Define public fields",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "useDefineForClassFields": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export class Counter { count = 0; }",
                },
              ],
            },
            {
              label: "Use legacy assignment emit",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "useDefineForClassFields": false\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export class Counter { count = 0; }",
                },
              ],
            },
          ],
        },
        {
          name: "isolatedModules",
          explanation:
            "Reports constructs that cannot be safely transformed one file at a time. Enable it for pipelines that compile files independently.",
          note: "It does not perform a bundler build or replace full type checking; type-only exports must be explicit.",
          source:
            "https://www.typescriptlang.org/tsconfig/isolatedModules.html",
          examples: [
            {
              label: "Export a type explicitly",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "isolatedModules": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: 'export type { User } from "./user";',
                },
                {
                  path: "src/user.ts",
                  language: "typescript",
                  code: "export interface User { name: string }",
                },
              ],
            },
            {
              label: "Keep runtime exports separate",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "isolatedModules": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const answer = 42;\nexport type Answer = number;",
                },
              ],
            },
          ],
        },
        {
          name: "React app (Vite)",
          explanation:
            "Checks browser source while Vite handles bundling and JSX output. Start from the template generated by the installed Vite version.",
          note: "These are configurations for an existing Vite React TypeScript app, not complete app scaffolds. Install dependencies from that template; run npx tsc -p tsconfig.json and npm run build. The image’s CRA label is historical. paths aliases must also be configured in Vite.",
          source:
            "https://www.typescriptlang.org/docs/handbook/modules/guides/choosing-compiler-options.html",
          examples: [
            {
              label: "Browser application checking",
              language: "json",
              code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "lib": [\n      "ES2022",\n      "DOM",\n      "DOM.Iterable"\n    ],\n    "module": "ESNext",\n    "moduleResolution": "Bundler",\n    "jsx": "react-jsx",\n    "strict": true,\n    "noEmit": true,\n    "isolatedModules": true,\n    "esModuleInterop": true,\n    "resolveJsonModule": true,\n    "forceConsistentCasingInFileNames": true\n  },\n  "include": [\n    "src"\n  ]\n}',
            },
            {
              label: "Add a checker alias (also configure Vite resolve.alias)",
              language: "json",
              code: '{\n  "extends": "./tsconfig.json",\n  "compilerOptions": {\n    "paths": {\n      "@/*": [\n        "./src/*"\n      ]\n    }\n  }\n}',
            },
          ],
        },
        {
          name: "Node.js backend",
          explanation:
            "Emits code using Node-aware module rules. Make package.json and the deployment Node version agree with the configuration.",
          note: 'Install TypeScript and @types/node for the runtime version in use. These complete minimal projects use no Node-only APIs and therefore need no ambient Node packages; add types: ["node"] when using them. Node supports both CommonJS and ESM.',
          source:
            "https://www.typescriptlang.org/docs/handbook/modules/guides/choosing-compiler-options.html",
          examples: [
            {
              label: "CommonJS backend package",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "NodeNext",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "moduleResolution": "NodeNext",\n    "lib": [\n      "ES2022"\n    ],\n    "declaration": true,\n    "declarationMap": true,\n    "sourceMap": true,\n    "incremental": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const port = 3000;",
                },
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "private": true,\n  "type": "commonjs",\n  "devDependencies": {\n    "typescript": "5.9.3"\n  },\n  "dependencies": {\n    "tslib": "2.8.1"\n  }\n}',
                },
              ],
            },
            {
              label: "ESM backend package",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "NodeNext",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "moduleResolution": "NodeNext",\n    "lib": [\n      "ES2022"\n    ],\n    "declaration": true,\n    "sourceMap": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export const port = 3000;",
                },
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "private": true,\n  "type": "module",\n  "devDependencies": {\n    "typescript": "5.9.3"\n  },\n  "dependencies": {\n    "tslib": "2.8.1"\n  }\n}',
                },
              ],
            },
          ],
        },
        {
          name: "Library/package",
          explanation:
            "Builds reusable JavaScript and declarations with a clearly defined module format. Choose a package format supported by consumers.",
          note: "composite is useful for project references, not mandatory for every library. A production package also needs exports/types metadata and an explicit compatibility policy.",
          source:
            "https://www.typescriptlang.org/docs/handbook/modules/guides/choosing-compiler-options.html",
          examples: [
            {
              label: "Node ESM library",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2020",\n    "module": "NodeNext",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "moduleResolution": "NodeNext",\n    "lib": [\n      "ES2020"\n    ],\n    "declaration": true,\n    "declarationMap": true,\n    "sourceMap": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export function double(value: number) { return value * 2; }",
                },
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "private": true,\n  "type": "module",\n  "exports": "./dist/main.js",\n  "types": "./dist/main.d.ts",\n  "devDependencies": {\n    "typescript": "5.9.3"\n  },\n  "dependencies": {\n    "tslib": "2.8.1"\n  }\n}',
                },
              ],
            },
            {
              label: "CommonJS library",
              note: "Run npx tsc -p tsconfig.json; emitted files go into dist unless this configuration disables emit.",
              files: [
                {
                  path: "tsconfig.json",
                  language: "json",
                  code: '{\n  "compilerOptions": {\n    "target": "ES2020",\n    "module": "CommonJS",\n    "strict": true,\n    "types": [],\n    "outDir": "dist",\n    "rootDir": "src",\n    "lib": [\n      "ES2020"\n    ],\n    "declaration": true,\n    "declarationMap": true\n  },\n  "include": [\n    "src/**/*"\n  ]\n}',
                },
                {
                  path: "src/main.ts",
                  language: "typescript",
                  code: "export function double(value: number) { return value * 2; }",
                },
                {
                  path: "package.json",
                  language: "json",
                  code: '{\n  "private": true,\n  "type": "commonjs",\n  "main": "./dist/main.js",\n  "types": "./dist/main.d.ts",\n  "devDependencies": {\n    "typescript": "5.9.3"\n  },\n  "dependencies": {\n    "tslib": "2.8.1"\n  }\n}',
                },
              ],
            },
          ],
        },
        {
          name: "Next.js",
          explanation:
            "Uses the framework’s TypeScript integration, generated route types, and JSX pipeline. Let the installed Next.js version generate its initial configuration.",
          note: "Run these commands in separate new folders. Next.js generates and updates tsconfig.json and next-env.d.ts; keep its plugin and generated-type includes. The language-service plugin is not a tsc transform. Follow the installed version’s JSX recommendation rather than freezing the image’s jsx: preserve setting.",
          source: "https://nextjs.org/docs/app/api-reference/config/typescript",
          examples: [
            {
              label: "Create an App Router TypeScript application",
              language: "bash",
              code: "npx create-next-app@latest compiler-next-app --typescript --app --eslint --use-npm\ncd compiler-next-app\nnpm run build",
            },
            {
              label: "Check generated configuration in an existing Next.js app",
              note: "After Next.js generates tsconfig.json and next-env.d.ts, retain its includes and compiler options. Its editor plugin belongs inside compilerOptions.plugins. This shell script inspects the generated JSONC with the installed TypeScript parser, then runs the existing build script.",
              files: [
                {
                  path: "inspect-next-config.cjs",
                  language: "javascript",
                  code: 'const ts = require("typescript");\nconst result = ts.readConfigFile("tsconfig.json", ts.sys.readFile);\nif (result.error) throw new Error(ts.flattenDiagnosticMessageText(result.error.messageText, "\\n"));\nconst plugins = result.config.compilerOptions?.plugins ?? [];\nconsole.log(plugins.some(plugin => plugin.name === "next")); // true for the generated config',
                },
                {
                  path: "commands.sh",
                  language: "bash",
                  code: "# In an existing configured Next.js TypeScript app:\nnode inspect-next-config.cjs\nnpm run build",
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
      "language-" + (example.language || "typescript"),
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
          "typescript-cheatsheet:" +
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
                language: file.language || "typescript",
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
