# TypeScript: From Beginner to Advanced

*A self-paced curriculum with explanations, goals, practice tasks, expected results and acceptance criteria for every topic.*

---

## How to Use This Curriculum

TypeScript is JavaScript with a static type system added on top. This curriculum teaches the **type system and the TypeScript tooling**; it assumes you already know JavaScript itself — variables, functions, arrays, objects, classes, modules, promises and `async`/`await`. If you don't, work through a JavaScript course first (for example the companion *JavaScript: From Beginner to Advanced* curriculum), then come back.

The curriculum has three levels. Each level builds on the one before it, and each topic builds on the topics before it. Work through them in order the first time; afterwards, use the table of contents as a reference.

Every topic follows the same structure:

| Section | What it gives you |
|---|---|
| **Goal** | What you will be able to do when you finish the topic. |
| **Explanation** | The concept, taught from scratch, with examples that type-check and run. |
| **Practice task** | A hands-on exercise that applies the concept. |
| **Expected result** | Exactly what a correct solution prints, or how it type-checks, so you can verify your work. |
| **Acceptance criteria** | A checklist. Tick every box before moving on. |
| **Reference solution** | One correct solution, hidden in a collapsible block. Try the task first. |

Each level ends with a **milestone project** that combines its topics.

### Conventions used in the examples

The examples use three kinds of comments:

```ts
const greeting = "Hello";
//    ^? const greeting: "Hello"

// @ts-expect-error -- Type 'number' is not assignable to type 'string'.
const label: string = 42;

console.log(greeting.toUpperCase()); // → HELLO
```

- `// ^? ...` shows what your editor displays when you **hover** over the code the caret `^` points at (the line above). This is how you "see" the types TypeScript infers.
- `// @ts-expect-error -- message` marks the next line as an **intentional type error**, and the text after `--` is (the start of) the compiler's error message. `@ts-expect-error` is a real TypeScript directive: it makes the file compile, and it becomes an error itself if the next line is actually fine. Delete the directive to see the red squiggle in your editor.
- `// → value` shows what the line prints when the program runs, as Node.js prints it.

TypeScript 7 displays the members of a union in a stable, sorted order — for example a hover may show `"danger" | "primary"` for a type you wrote as `"primary" | "danger"`. The order has no meaning; older TypeScript versions may show a different order.

Every example in this curriculum was checked with the **TypeScript 7.0** compiler using the recommended configuration below, then run with **Node.js** to confirm the printed output. Code blocks that start with `// file: name.ts` belong together: save them as separate files in one folder.

### Recommended setup

You need a current LTS release of **Node.js** (22.18 or newer) and a code editor with TypeScript support (Visual Studio Code works out of the box). Create a folder for your exercises containing these two files:

`package.json`:

```json
{
  "type": "module",
  "private": true
}
```

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "es2025",
    "module": "nodenext",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "erasableSyntaxOnly": true,
    "verbatimModuleSyntax": true,
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "moduleDetection": "force",
    "types": ["node"],
    "skipLibCheck": true
  }
}
```

Then install the tools into the folder:

```bash
npm install --save-dev typescript @types/node
```

Topic 1.1 explains what each part does. With this setup you:

- **type-check** all your files with `npx tsc` (it reports errors and produces no output files), and
- **run** a file with `node file.ts` — Node.js removes the type annotations and runs the remaining JavaScript.

A few examples use TypeScript features that Node.js cannot run directly; they start with a comment saying **"Requires compilation with tsc"**, and the topic explains how to compile them.

---

## Table of Contents

**Level 1 — Beginner**

- [1.1 What TypeScript Is and How to Run It](#11-what-typescript-is-and-how-to-run-it)
- [1.2 Basic Types and Type Inference](#12-basic-types-and-type-inference)
- [1.3 Arrays and Tuples](#13-arrays-and-tuples)
- [1.4 Object Types](#14-object-types)
- [1.5 Functions](#15-functions)
- [1.6 Union Types and Narrowing](#16-union-types-and-narrowing)
- [1.7 Type Aliases and Interfaces](#17-type-aliases-and-interfaces)
- [1.8 Literal Types, `as const` and Enums](#18-literal-types-as-const-and-enums)
- [1.9 Type Assertions, Non-Null Assertions and `satisfies`](#19-type-assertions-non-null-assertions-and-satisfies)
- [Beginner Milestone Project: Typed Order Report](#beginner-milestone-project-typed-order-report)

**Level 2 — Intermediate**

- [2.1 Discriminated Unions and Advanced Narrowing](#21-discriminated-unions-and-advanced-narrowing)
- [2.2 Generics](#22-generics)
- [2.3 Classes in TypeScript](#23-classes-in-typescript)
- [2.4 `keyof`, `typeof` and Indexed Access Types](#24-keyof-typeof-and-indexed-access-types)
- [2.5 Utility Types](#25-utility-types)
- [2.6 Typing Asynchronous Code](#26-typing-asynchronous-code)
- [2.7 Error Handling with Types](#27-error-handling-with-types)
- [2.8 Modules and Declaration Files](#28-modules-and-declaration-files)
- [2.9 TypeScript and the DOM](#29-typescript-and-the-dom)
- [Intermediate Milestone Project: Type-Safe State Store](#intermediate-milestone-project-type-safe-state-store)

**Level 3 — Advanced**

- [3.1 Conditional Types and `infer`](#31-conditional-types-and-infer)
- [3.2 Mapped Types and Key Remapping](#32-mapped-types-and-key-remapping)
- [3.3 Template Literal Types](#33-template-literal-types)
- [3.4 Recursive Types](#34-recursive-types)
- [3.5 Type Compatibility, Variance and Branded Types](#35-type-compatibility-variance-and-branded-types)
- [3.6 Advanced Generics and Inference](#36-advanced-generics-and-inference)
- [3.7 Decorators and Resource Management with `using`](#37-decorators-and-resource-management-with-using)
- [3.8 Runtime Validation with Inferred Types](#38-runtime-validation-with-inferred-types)
- [3.9 Configuration, Strictness and Scaling Up](#39-configuration-strictness-and-scaling-up)
- [3.10 Modern TypeScript: 5.0 to 7.0](#310-modern-typescript-50-to-70)
- [Advanced Milestone Project: Type-Safe Event Bus and Router](#advanced-milestone-project-type-safe-event-bus-and-router)

- [Appendix: Where to Go Next](#appendix-where-to-go-next)

---
# Level 1 — Beginner

This level introduces the TypeScript toolchain and the everyday parts of the type system: annotations, inference, arrays, tuples, object types, functions, unions, aliases, interfaces and literal types. By the end you will be able to add accurate types to ordinary JavaScript programs and understand every error the compiler reports about them.

---

## 1.1 What TypeScript Is and How to Run It

**Goal:** Explain what TypeScript adds to JavaScript, set up a project, type-check it with `tsc`, run TypeScript files with Node.js, and read compiler errors.

### Explanation

**TypeScript is JavaScript plus types.** Every JavaScript program is (almost) a valid TypeScript program. TypeScript adds a syntax for describing the *types* of values — "this parameter is a number", "this object has a `name` string" — and a **type checker** that reads your code and reports places where values are used in ways that don't fit their types, *before* the program runs.

```ts
function area(width: number, height: number): number {
  return width * height;
}

console.log(area(3, 4)); // → 12

// @ts-expect-error -- Argument of type 'string' is not assignable to parameter of type 'number'.
console.log(area("3", 4)); // → 12
```

`: number` after a parameter or after the parameter list is a **type annotation**. The second call is a mistake that JavaScript would silently accept (`"3" * 4` happens to be `12`, but `"3" + 4` would have been `"34"`). TypeScript reports it immediately — in your editor, as you type.

Notice that the bad call still **ran** and printed `12`. This illustrates the single most important fact about TypeScript:

> **Types exist only at compile time.** They are erased before the code runs. TypeScript never changes what your program does at run time and never inserts runtime checks.

This has consequences you will meet throughout the curriculum: you cannot check a type at run time (`if (x is User)` doesn't exist), and data from outside your program (user input, JSON, network responses) is not automatically validated — you must check it yourself (2.6, 3.8).

**Why use it?** Types catch a large class of bugs early (typos in property names, `undefined` values, wrong argument order), make editors far smarter (accurate autocompletion, go-to-definition, safe renames), and serve as documentation that can't go out of date. That is why most large JavaScript projects today are written in TypeScript.

**The tools**

1. **`tsc`**, the TypeScript compiler, from the `typescript` npm package. TypeScript 7 is a native (Go) rewrite of the compiler that is around ten times faster than earlier versions; the language is the same. `tsc` can do two jobs: **type-check** your code, and optionally **emit** JavaScript files with the types removed.
2. **Your editor.** VS Code (and most other editors) run the TypeScript language service in the background, showing errors as red squiggles and types on hover.
3. **A runtime.** Node.js 22.18+ can run `.ts` files directly using **type stripping**: it deletes the type annotations and runs what is left. It does **not** type-check. Other options are Deno and Bun (which also run TypeScript directly), `tsx` (a popular Node.js wrapper), and bundlers such as Vite for browser code.

The usual workflow is therefore: **the editor and `tsc` check the types; the runtime runs the code.**

**The recommended `tsconfig.json`** from the introduction configures the compiler. Here is what each option does:

| Option | Meaning |
|---|---|
| `"target": "es2025"` | Which JavaScript version your code targets (and which built-in APIs TypeScript knows about). |
| `"module": "nodenext"` | Follow Node.js's module rules (ES modules, because `package.json` has `"type": "module"`). |
| `"strict": true` | Turn on all strict checks, e.g. `null`/`undefined` checking and no implicit `any`. Always use it. (It is the default since TypeScript 6.) |
| `"noUncheckedIndexedAccess": true` | Reading `array[i]` or `record[key]` gives `T \| undefined`, because the index might not exist (1.3). |
| `"erasableSyntaxOnly": true` | Reject the few TypeScript features that are not just removable annotations (enums, namespaces, parameter properties), because Node.js type stripping can't run them (1.8, 2.3). |
| `"verbatimModuleSyntax": true` | Require `import type` for imports used only as types, so stripping imports is predictable (2.8). |
| `"allowImportingTsExtensions": true` | Allow `import ... from "./file.ts"` (Node.js requires the real file extension). |
| `"noEmit": true` | Only check; don't produce `.js` files (Node.js runs the `.ts` files itself). |
| `"moduleDetection": "force"` | Treat every file as a separate module, so top-level names in different exercise files don't clash. |
| `"types": ["node"]` | Load the type definitions for Node.js's built-in APIs (`process`, `node:fs`, …) from `@types/node`. |
| `"skipLibCheck": true` | Don't type-check the internals of installed `.d.ts` files (faster, avoids errors in third-party types). |

Generate a commented starting point for other projects with `npx tsc --init`.

**Type-checking.** Run `npx tsc` in the project folder. With no errors, it prints nothing. With errors, it prints each one with its file, line and column, an error code, and a message:

```text
hello.ts:7:23 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

7 console.log(area("3", 4));
                        ~~~

Found 1 error in hello.ts:7
```

Run `npx tsc --watch` to re-check automatically on every save.

**Reading errors.** Messages follow patterns you will quickly learn: "Type 'X' is not assignable to type 'Y'" means you put an `X` where a `Y` was required. Long messages are nested: read the first line for *what* is wrong and the indented lines for *why*. The `TS2345`-style code can be searched online.

**Running.** `node hello.ts` strips the types and runs the file. Remember: it runs even if the types are wrong, so check with `tsc` (or watch your editor) first. A common script in `package.json` is `"check": "tsc"`.

**Compiling to JavaScript.** Sometimes you need real `.js` files: to publish a library, to use non-erasable features, or to support older runtimes. Create a second config, `tsconfig.build.json`, that inherits the first and turns emitting on:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": false,
    "erasableSyntaxOnly": false,
    "rewriteRelativeImportExtensions": true,
    "outDir": "dist"
  }
}
```

Then run `npx tsc -p tsconfig.build.json` and execute the output, e.g. `node dist/hello.js`. (`rewriteRelativeImportExtensions` turns `./file.ts` imports into `./file.js` in the output.) Examples that need this start with the comment *"Requires compilation with tsc"*.

### Practice task

1. Create the project folder with `package.json` and `tsconfig.json` from the introduction, and install `typescript` and `@types/node`.
2. Create `hello.ts` containing a function `greet(name: string, times: number): string` that returns `"Hello, <name>!"` repeated `times` times, separated by spaces.
3. Add a call `console.log(greet(3, "Ada"));` (arguments in the wrong order). Run `npx tsc` and read the error. Then run `node hello.ts` anyway and observe what happens.
4. Fix the call to `greet("Ada", 3)` and add `console.log(greet("TypeScript", 1));`.
5. Run `npx tsc` again (it should print nothing) and run the file.

### Expected result

In step 3, `npx tsc` reports an error like:

```text
hello.ts:5:19 - error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
```

(and a second one for `"Ada"` not being a `number`). `node hello.ts` still runs, because nothing checks types at run time: it prints an **empty line**, since `Array.from({ length: "Ada" })` creates an empty array. A silent wrong result like this is exactly the kind of bug TypeScript exists to catch.

After the fix, `npx tsc` prints nothing and `node hello.ts` prints:

```text
Hello, Ada! Hello, Ada! Hello, Ada!
Hello, TypeScript!
```

### Acceptance criteria

- [ ] `npx tsc --version` prints a version (7.x or newer).
- [ ] You saw the TS2345 error for the wrong argument order and can explain the message.
- [ ] You observed that Node.js ran the incorrect code anyway, and can explain why.
- [ ] The final `hello.ts` passes `npx tsc` with no output and prints the two expected lines.
- [ ] You can explain the difference between type-checking (`tsc`) and running (`node file.ts`).
- [ ] You can explain what `strict` and `noUncheckedIndexedAccess` do in one sentence each.

<details>
<summary>Reference solution</summary>

```ts
function greet(name: string, times: number): string {
  return Array.from({ length: times }, () => `Hello, ${name}!`).join(" ");
}

console.log(greet("Ada", 3)); // → Hello, Ada! Hello, Ada! Hello, Ada!
console.log(greet("TypeScript", 1)); // → Hello, TypeScript!
```

</details>

---

## 1.2 Basic Types and Type Inference

**Goal:** Annotate variables with primitive types, rely on inference where it is accurate, understand literal types and widening, and choose correctly between `any`, `unknown`, `null` and `undefined`.

### Explanation

**Annotations.** Write `: Type` after a variable name to declare its type. The primitive types are written in lower case, matching `typeof`:

```ts
const title: string = "TypeScript";
const version: number = 7;
const isStable: boolean = true;
const huge: bigint = 9_007_199_254_740_993n;
const id: symbol = Symbol("id");
const nothing: null = null;
const notSet: undefined = undefined;

console.log(typeof title, typeof version, typeof huge); // → string number bigint
```

(Don't use `String`, `Number` or `Boolean` with capital letters as types; those refer to wrapper objects.)

**Inference.** You rarely need annotations on variables, because TypeScript **infers** the type from the initial value:

```ts
let count = 10;
//  ^? let count: number

// @ts-expect-error -- Type 'string' is not assignable to type 'number'.
count = "eleven";

count = 11; // fine
console.log(count); // → 11
```

The inferred type is fixed: `count` is a `number` forever.

**Literal types and widening.** A `const` can never change, so TypeScript infers the most precise type possible — the **literal type** of that exact value. A `let` can be reassigned, so its type is **widened** to the general type:

```ts
const direction = "north";
//    ^? const direction: "north"

let heading = "north";
//  ^? let heading: string

const answer = 42;
//    ^? const answer: 42
```

`"north"` here is a type with exactly one value. Literal types become very useful when combined into unions (1.6).

**When to annotate.** A good rule: let TypeScript infer local variables, but always annotate **function parameters** (they can't be inferred) and consider annotating **function return types** and exported values (they document your intent and catch mistakes inside the function). Annotate a variable when it starts empty or must accept more than its initial value:

```ts
let lastError: string | null = null; // will hold a string later
lastError = "Disk full";
console.log(lastError); // → Disk full
```

**`any`: switching the checker off.** A value of type `any` can be used in any way, and TypeScript checks nothing about it. Errors are only discovered at run time — exactly what TypeScript is supposed to prevent:

```ts
const loose: any = "some text";
const shout = loose.toUpperCase(); // fine
const result = loose * 3;          // also "fine": NaN at run time
console.log(shout, result);        // → SOME TEXT NaN
```

`any` spreads: anything derived from it is also `any`. Treat it as an escape hatch for rare cases, not a tool. In strict mode, TypeScript refuses to *silently* assume `any`:

```ts
// @ts-expect-error -- Parameter 'value' implicitly has an 'any' type.
function double(value) {
  return value * 2;
}
console.log(double(4)); // → 8
```

**`unknown`: the safe "could be anything".** A value of type `unknown` can hold anything, but you may not *use* it until you have checked what it is. This is the right type for data whose shape you don't know yet:

```ts
function shout(value: unknown): string {
  // @ts-expect-error -- 'value' is of type 'unknown'.
  return value.toUpperCase(); // rejected: value might not be a string
}

function describe(value: unknown): string {
  if (typeof value === "string") {
    return `a string of length ${value.length}`; // inside this branch, value is a string
  }
  if (typeof value === "number") {
    return `the number ${value.toFixed(1)}`;
  }
  return "something else";
}

console.log(describe("hello")); // → a string of length 5
console.log(describe(3.14159)); // → the number 3.1
console.log(describe([1, 2]));  // → something else
```

The checking with `typeof` is called **narrowing**; 1.6 covers it in depth.

**`null` and `undefined`.** With `strict` on, `null` and `undefined` are separate types and are *not* allowed in other types unless you say so. This catches the most common JavaScript crash, "cannot read properties of undefined":

```ts
// @ts-expect-error -- Type 'null' is not assignable to type 'string'.
const nickname: string = null;

let middleName: string | undefined;
console.log(middleName?.toUpperCase() ?? "(none)"); // → (none)
```

**`never`** is the type with no values at all — used for code that can't happen, such as a function that always throws (1.5) or an impossible branch (2.1).

**Type summary**

| Type | Values |
|---|---|
| `string`, `number`, `boolean`, `bigint`, `symbol` | values of that primitive kind |
| `"north"`, `42`, `true` | exactly that one value (literal types) |
| `null`, `undefined` | only that value |
| `unknown` | anything; must be narrowed before use |
| `any` | anything; checking disabled (avoid) |
| `never` | nothing |

### Practice task

Write `values.ts` containing a function `formatValue(value: unknown): string` that returns:

- for strings: the string in double quotes, e.g. `"hi"`;
- for numbers: the number with 2 decimal places;
- for booleans: `yes` or `no`;
- for `null`: `null`, and for `undefined`: `undefined`;
- for anything else: `[object]`.

Also declare (choosing between annotation and inference sensibly):

- a constant `appName` with the value `"Typer"` and check (by hovering) that its type is the literal `"Typer"`;
- a variable `retries` starting at `0` that you later set to `3`;
- a variable `selectedId` that starts as `null` and later holds the string `"a1"`.

Print `formatValue` for `"hi"`, `2.5`, `true`, `null`, `undefined` and `{}`, then print `appName`, `retries` and `selectedId` on one line.

### Expected result

`npx tsc` reports no errors and the file contains no `any` and no `@ts-expect-error`. Running it prints:

```text
"hi"
2.50
yes
null
undefined
[object]
Typer 3 a1
```

### Acceptance criteria

- [ ] `formatValue` takes `unknown` (not `any`) and narrows with `typeof` and `===` before using the value.
- [ ] The return type `string` is annotated.
- [ ] `appName` is inferred as `"Typer"` (no annotation needed).
- [ ] `retries` is inferred as `number`; `selectedId` is annotated as `string | null`.
- [ ] No `any`, no `@ts-expect-error`, no type errors.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
function formatValue(value: unknown): string {
  if (typeof value === "string") return `"${value}"`;
  if (typeof value === "number") return value.toFixed(2);
  if (typeof value === "boolean") return value ? "yes" : "no";
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  return "[object]";
}

const appName = "Typer";
//    ^? const appName: "Typer"

let retries = 0;
retries = 3;

let selectedId: string | null = null;
selectedId = "a1";

for (const v of ["hi", 2.5, true, null, undefined, {}]) {
  console.log(formatValue(v));
}
console.log(appName, retries, selectedId); // → Typer 3 a1
```

</details>

---

## 1.3 Arrays and Tuples

**Goal:** Type arrays and read-only arrays, handle possibly-missing elements safely, and use tuples for fixed-length, position-based data.

### Explanation

**Array types** are written `Type[]` or, equivalently, `Array<Type>` (the `<...>` syntax is a *generic*, explained in 2.2):

```ts
const scores: number[] = [90, 85, 77];
const names: Array<string> = ["Ana", "Ben"];

const inferred = [1, 2, 3];
//    ^? const inferred: number[]

const mixed = [1, "two", true];
//    ^? const mixed: (string | number | boolean)[]

console.log(scores.length, names.join(" & ")); // → 3 Ana & Ben

// @ts-expect-error -- Argument of type 'string' is not assignable to parameter of type 'number'.
scores.push("100");
```

Parentheses matter: `(string | number)[]` is an array whose items may be strings or numbers; `string | number[]` is either a string or an array of numbers.

**Empty arrays need an annotation**, otherwise TypeScript cannot know what will go in them:

```ts
const queue: string[] = [];
queue.push("first");
console.log(queue); // → [ 'first' ]
```

**Reading elements: `noUncheckedIndexedAccess`.** An index might be out of range, and JavaScript then returns `undefined`. With the recommended config, TypeScript reflects this, forcing you to handle it:

```ts
const temperatures = [21.5, 23.1, 19.8];

const first = temperatures[0];
//    ^? const first: number | undefined

// @ts-expect-error -- 'first' is possibly 'undefined'.
console.log(first.toFixed(0));

if (first !== undefined) {
  console.log(first.toFixed(0)); // → 22
}
console.log(temperatures[10]?.toFixed(0) ?? "no reading"); // → no reading

// Loops and array methods give you defined values directly:
for (const t of temperatures) {
  console.log(t.toFixed(0));
}
// → 22
// → 23
// → 20
```

Prefer `for...of`, `map`, `filter` and friends over index loops; then the question of missing elements doesn't arise.

**Read-only arrays.** `readonly Type[]` (or `ReadonlyArray<Type>`) removes all mutating methods. Use it for parameters your function only reads — it documents the promise and lets callers pass read-only arrays:

```ts
function average(values: readonly number[]): number {
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function addPlaceholder(values: readonly number[]): void {
  // @ts-expect-error -- Property 'push' does not exist on type 'readonly number[]'.
  values.push(0);
}

console.log(average([2, 4, 9])); // → 5
```

`readonly` is purely a compile-time check; at run time it is an ordinary array (use `Object.freeze` for runtime protection).

**Tuples** are arrays with a fixed length where each position has its own type. They suit small groups of values identified by position, such as coordinates or a key–value pair:

```ts
type Point = [x: number, y: number];        // labels are optional documentation
type Entry = [key: string, value: number];
type Version = [major: number, minor: number, patch?: number]; // optional element
type Command = [name: string, ...args: string[]];               // rest element

const origin: Point = [0, 0];
const v: Version = [7, 0];
const cmd: Command = ["git", "commit", "-m", "msg"];

const [x, y] = origin; // destructuring gives each position its own type
//        ^? const y: number

// @ts-expect-error -- Type '[number, number, number]' is not assignable to type 'Point'.
const bad: Point = [1, 2, 3];

const entries: Entry[] = [["apples", 3], ["pears", 5]];
for (const [fruit, count] of entries) {
  console.log(`${fruit}: ${count}`);
}
// → apples: 3
// → pears: 5
console.log(x + y, v.length, cmd.slice(1).join(" ")); // → 0 2 commit -m msg
```

Fixed positions of a tuple are known to exist, so `origin[0]` is `number`, not `number | undefined`.

**Tuples as return values** let a function return several values without inventing an object type:

```ts
function minMax(values: readonly number[]): [min: number, max: number] {
  return [Math.min(...values), Math.max(...values)];
}
const [low, high] = minMax([4, 9, 1]);
console.log(low, high); // → 1 9
```

TypeScript only infers a tuple when told to: a returned `[a, b]` literal is inferred as an array `number[]` unless the return type is annotated, or you use `as const` (1.8). If a group of values has more than two or three members, prefer an object with named properties.

### Practice task

Write `grid.ts`.

1. Define `type Cell = [row: number, col: number]`.
2. Write `neighbours(cell: Cell, size: number): Cell[]` returning the up/down/left/right neighbours that lie inside a `size × size` grid (rows and columns `0` to `size - 1`), in the order up, down, left, right.
3. Write `stats(values: readonly number[]): [min: number, max: number, mean: number] | undefined` that returns `undefined` for an empty array.
4. Write `firstLong(words: readonly string[], minLength: number): string` that returns the first word with at least `minLength` characters, or `"(none)"`. Use an index-based `for` loop (to practise handling `string | undefined` from indexing).

Print:

- the neighbours of `[0, 0]` and of `[1, 1]` in a 3×3 grid;
- `stats([3, 9, 6])` and `stats([])`;
- `firstLong(["a", "tuple", "typescript"], 6)` and `firstLong([], 2)`.

### Expected result

No type errors, and the output:

```text
[ [ 1, 0 ], [ 0, 1 ] ]
[ [ 0, 1 ], [ 2, 1 ], [ 1, 0 ], [ 1, 2 ] ]
[ 3, 9, 6 ]
undefined
typescript
(none)
```

### Acceptance criteria

- [ ] `Cell` and the `stats` return type are labelled tuples.
- [ ] Parameters that are only read are typed `readonly`.
- [ ] `firstLong` handles the `string | undefined` element type without using `!` or `as`.
- [ ] `stats` returns `undefined` for empty input and its return type says so.
- [ ] `npx tsc` passes; output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
type Cell = [row: number, col: number];

function neighbours([row, col]: Cell, size: number): Cell[] {
  const candidates: Cell[] = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ];
  return candidates.filter(([r, c]) => r >= 0 && r < size && c >= 0 && c < size);
}

function stats(values: readonly number[]): [min: number, max: number, mean: number] | undefined {
  if (values.length === 0) return undefined;
  const sum = values.reduce((a, b) => a + b, 0);
  return [Math.min(...values), Math.max(...values), sum / values.length];
}

function firstLong(words: readonly string[], minLength: number): string {
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word !== undefined && word.length >= minLength) {
      return word;
    }
  }
  return "(none)";
}

console.log(neighbours([0, 0], 3)); // → [ [ 1, 0 ], [ 0, 1 ] ]
console.log(neighbours([1, 1], 3)); // → [ [ 0, 1 ], [ 2, 1 ], [ 1, 0 ], [ 1, 2 ] ]
console.log(stats([3, 9, 6]));      // → [ 3, 9, 6 ]
console.log(stats([]));             // → undefined
console.log(firstLong(["a", "tuple", "typescript"], 6)); // → typescript
console.log(firstLong([], 2));      // → (none)
```

</details>

---

## 1.4 Object Types

**Goal:** Describe the shape of objects with object types, optional and read-only properties, and index signatures; and understand structural typing and excess property checks.

### Explanation

**Object types** list property names and their types, separated by `;` or `,`:

```ts
const user: { name: string; age: number } = { name: "Ana", age: 34 };

// @ts-expect-error -- Property 'age' is missing in type '{ name: string; }' but required in type '{ name: string; age: number; }'.
const incomplete: { name: string; age: number } = { name: "Ben" };

console.log(user.name.toUpperCase()); // → ANA
```

Writing a long type inline everywhere quickly gets repetitive, so you normally give it a name with `type` (or `interface`, 1.7):

```ts
type Product = {
  id: number;
  name: string;
  price: number;
  description?: string;   // optional: may be missing
  readonly sku: string;   // cannot be reassigned after creation
};

const lamp: Product = { id: 1, name: "Lamp", price: 45, sku: "LMP-01" };

lamp.price = 39; // fine
// @ts-expect-error -- Cannot assign to 'sku' because it is a read-only property.
lamp.sku = "X";

const desc = lamp.description;
//    ^? const desc: string | undefined

console.log(lamp.description?.length ?? 0, lamp.price); // → 0 39
```

- An **optional** property (`?`) may be absent; reading it gives `Type | undefined`, so you must handle `undefined`.
- A **`readonly`** property can't be assigned after the object is created (compile-time only, and shallow: the *contents* of a readonly array property can still change unless the array is `readonly` too).

**Nested objects** are written inline or by referring to other named types:

```ts
type Address = { city: string; zip: string };
type Customer = { name: string; address: Address; tags: string[] };

const c: Customer = { name: "Lin", address: { city: "Porto", zip: "4000-001" }, tags: [] };
console.log(c.address.city); // → Porto
```

**Structural typing.** TypeScript compares types by their **shape**, not by their name. Any value with at least the required properties fits — it doesn't need to be declared as that type:

```ts
type Named = { name: string };

function greet(thing: Named): string {
  return `Hello, ${thing.name}`;
}

const dog = { name: "Rex", breed: "collie" }; // never declared as Named
console.log(greet(dog)); // → Hello, Rex
```

This matches how JavaScript code is actually written ("if it has a `name`, it can be greeted") and is sometimes called *duck typing*.

**Excess property checks.** There is one exception to "extra properties are fine": when you write an object literal *directly* where a type is expected, TypeScript flags unknown properties, because they are almost always typos:

```ts
type Options = { color: string; size?: number };

// @ts-expect-error -- Object literal may only specify known properties
const opts: Options = { color: "red", colour: "blue" };

const fromElsewhere = { color: "red", colour: "blue" };
const accepted: Options = fromElsewhere; // no error: not a fresh object literal
console.log(accepted); // → { color: 'red', colour: 'blue' }
```

TypeScript's message for the first error even suggests the fix: *"Did you mean to write 'color'?"*. A related rule applies to **weak types** — types whose properties are *all* optional: assigning a value that shares *none* of their properties is an error even when it isn't a fresh literal, because it is almost certainly a mistake.

**Index signatures** describe objects used as dictionaries, where the keys aren't known in advance:

```ts
type Stock = { [productName: string]: number };

const stock: Stock = { apples: 12, pears: 0 };
stock.plums = 7; // any string key is allowed

const apples = stock["apples"];
//    ^? const apples: number | undefined

console.log((stock["kiwis"] ?? 0) + 1); // → 1
```

With `noUncheckedIndexedAccess`, reading a key gives `number | undefined`, because the key might not exist. (`Record<string, number>` is a shorter way to write this type; see 2.5. For dictionaries that change a lot, a `Map<string, number>` is often better.)

**`object` and `{}`.** The type `object` means "any non-primitive". The empty object type `{}` surprisingly means "any value except `null` and `undefined`" — avoid it; use `unknown`, `object` or a precise type.

### Practice task

Write `books.ts`.

1. Define a type `Book` with: `isbn` (read-only string), `title` (string), `authors` (array of strings), `year` (number), and optional `subtitle` (string).
2. Define a type `Library` with a `name` (string) and `copies`: a dictionary from ISBN to number of copies.
3. Write `fullTitle(book: Book): string` returning `"Title: Subtitle"` or just `"Title"`.
4. Write `describe(book: Book, library: Library): string` returning `"<full title> (<year>) by <authors joined with ' & '> — <n> copies"`, where `n` is `0` if the ISBN isn't in `copies`.
5. Write `addCopies(library: Library, isbn: string, count: number): void` that adds to the count (starting from 0).
6. Show structural typing: pass an object with an **extra** `publisher` property (stored in a variable first) to `fullTitle`.

Use these books and library:

```ts
const books: Book[] = [
  { isbn: "978-0", title: "Refactoring", subtitle: "Improving the Design of Existing Code", authors: ["Martin Fowler"], year: 2018 },
  { isbn: "978-1", title: "Design Patterns", authors: ["Gamma", "Helm", "Johnson", "Vlissides"], year: 1994 },
];
const library: Library = { name: "City", copies: { "978-0": 2 } };
```

Print `describe` for both books, call `addCopies(library, "978-1", 3)` twice, print `describe` for the second book again, then print `fullTitle` of the object with the extra property `{ isbn: "x", title: "Clean Code", authors: ["Robert C. Martin"], year: 2008, publisher: "Prentice Hall" }`.

### Expected result

No type errors, and:

```text
Refactoring: Improving the Design of Existing Code (2018) by Martin Fowler — 2 copies
Design Patterns (1994) by Gamma & Helm & Johnson & Vlissides — 0 copies
Design Patterns (1994) by Gamma & Helm & Johnson & Vlissides — 6 copies
Clean Code
```

Additionally, writing `books[0].isbn = "new"` or putting `publisher` directly into an object literal typed as `Book` must produce type errors (try them, then remove them).

### Acceptance criteria

- [ ] `isbn` is `readonly` and `subtitle` is optional.
- [ ] `copies` uses an index signature (or `Record<string, number>`).
- [ ] Missing dictionary entries and the optional subtitle are handled without `!` or `as`.
- [ ] You can explain why passing the variable with `publisher` is allowed while a literal with `publisher` is not.
- [ ] `npx tsc` passes; output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
type Book = {
  readonly isbn: string;
  title: string;
  authors: string[];
  year: number;
  subtitle?: string;
};

type Library = {
  name: string;
  copies: { [isbn: string]: number };
};

function fullTitle(book: Book): string {
  return book.subtitle ? `${book.title}: ${book.subtitle}` : book.title;
}

function describe(book: Book, library: Library): string {
  const count = library.copies[book.isbn] ?? 0;
  return `${fullTitle(book)} (${book.year}) by ${book.authors.join(" & ")} — ${count} copies`;
}

function addCopies(library: Library, isbn: string, count: number): void {
  library.copies[isbn] = (library.copies[isbn] ?? 0) + count;
}

const books: Book[] = [
  { isbn: "978-0", title: "Refactoring", subtitle: "Improving the Design of Existing Code", authors: ["Martin Fowler"], year: 2018 },
  { isbn: "978-1", title: "Design Patterns", authors: ["Gamma", "Helm", "Johnson", "Vlissides"], year: 1994 },
];
const library: Library = { name: "City", copies: { "978-0": 2 } };

for (const book of books) {
  console.log(describe(book, library));
}
addCopies(library, "978-1", 3);
addCopies(library, "978-1", 3);
const [, designPatterns] = books; // Book | undefined, because the array could be shorter
if (designPatterns) {
  console.log(describe(designPatterns, library));
}

const withPublisher = { isbn: "x", title: "Clean Code", authors: ["Robert C. Martin"], year: 2008, publisher: "Prentice Hall" };
console.log(fullTitle(withPublisher));
```

Because `books` is a `Book[]` (not a tuple), TypeScript can't know it has a second element, so destructuring gives `Book | undefined` and the `if` handles it — no `!` needed.

</details>

---

## 1.5 Functions

**Goal:** Type function parameters and return values, use optional, default and rest parameters, write function types for callbacks, and use `void`, `never` and overloads appropriately.

### Explanation

**Parameters and return types.** Parameters must be annotated (TypeScript can't guess them). The return type is inferred from the `return` statements, but annotating it is good practice for anything non-trivial: it documents intent, and mistakes are reported inside the function rather than at every caller.

```ts
function add(a: number, b: number): number {
  return a + b;
}
const product = (a: number, b: number) => a * b;
//    ^? const product: (a: number, b: number) => number

function percentage(part: number, whole: number): string {
  // @ts-expect-error -- Type 'number' is not assignable to type 'string'.
  return (part / whole) * 100;
}

console.log(add(2, 3), product(2, 3)); // → 5 6
```

**Calls are checked** for the number and types of arguments:

```ts
function repeat(text: string, times: number): string {
  return text.repeat(times);
}

// @ts-expect-error -- Expected 2 arguments, but got 1.
repeat("ha");

console.log(repeat("ha", 3)); // → hahaha
```

**Optional, default and rest parameters**

```ts
function formatName(first: string, last?: string): string {
  // last is string | undefined here
  return last ? `${last}, ${first}` : first;
}

function withTax(amount: number, rate = 0.23): number {
  // rate is inferred as number from the default
  return amount * (1 + rate);
}

function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(formatName("Ada"), formatName("Ada", "Lovelace")); // → Ada Lovelace, Ada
console.log(withTax(100).toFixed(2), withTax(100, 0.06).toFixed(2)); // → 123.00 106.00
console.log(sum(), sum(1, 2, 3)); // → 0 6
```

Optional parameters must come after required ones.

**Destructured parameters** are typed with an object type after the pattern (not inside it):

```ts
type ButtonOptions = { label: string; size?: "small" | "large"; disabled?: boolean };

function renderButton({ label, size = "small", disabled = false }: ButtonOptions): string {
  return `[${label}${disabled ? " (disabled)" : ""}] ${size}`;
}
console.log(renderButton({ label: "Save" })); // → [Save] small
```

(Writing `{ label: string }` *inside* the destructuring pattern would rename `label` to a variable called `string`!)

**Function types.** To describe a function as a value — for callbacks or variables — use a **function type expression**: `(param: Type) => ReturnType`.

```ts
type NumberTransform = (value: number) => number;

function applyAll(values: readonly number[], transform: NumberTransform): number[] {
  return values.map(transform);
}

const square: NumberTransform = (n) => n * n; // n is inferred from the type: "contextual typing"
console.log(applyAll([1, 2, 3], square));      // → [ 1, 4, 9 ]
console.log(applyAll([1, 2, 3], (n) => n + 10)); // → [ 11, 12, 13 ]
```

Callbacks passed inline get their parameter types from context, so `(n) => n + 10` needs no annotations.

**`void`** is the return type of functions that don't return a value. As a *callback* type, `() => void` means "I will ignore whatever you return", so functions that do return something are still accepted:

```ts
function logAll(items: string[], log: (item: string) => void): void {
  for (const item of items) log(item);
}

const collected: string[] = [];
logAll(["a", "b"], (item) => collected.push(item)); // push returns a number; that's fine
console.log(collected); // → [ 'a', 'b' ]
```

**`never`** is the return type of a function that never returns normally — it always throws or loops forever. TypeScript uses this to understand control flow:

```ts
function fail(message: string): never {
  throw new Error(message);
}

function parsePort(text: string): number {
  const port = Number(text);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    fail(`Invalid port: ${text}`);
  }
  return port; // TypeScript knows we only get here if fail() wasn't called
}

console.log(parsePort("8080")); // → 8080
try {
  parsePort("http");
} catch (error) {
  console.log((error as Error).message); // → Invalid port: http
}
```

(`error as Error` is a *type assertion*, 1.9; catching errors safely is covered in 2.7.)

**Overloads** describe a function that accepts several distinct argument patterns, with a different return type for each. Write the *overload signatures* first, then one *implementation* that handles all of them (the implementation signature is not visible to callers):

```ts
function toArray(value: string): string[];
function toArray(value: number, length: number): number[];
function toArray(value: string | number, length = 1): string[] | number[] {
  return typeof value === "string" ? value.split("") : Array.from({ length }, () => value);
}

const letters = toArray("abc");
//    ^? const letters: string[]
const zeros = toArray(0, 3);
//    ^? const zeros: number[]
console.log(letters, zeros); // → [ 'a', 'b', 'c' ] [ 0, 0, 0 ]
```

Use overloads sparingly; a union parameter or a generic (2.2) is usually simpler.

### Practice task

Write `pricing.ts` with:

1. `type Discount = (price: number) => number;`
2. `percentOff(percent: number): Discount` — returns a function that takes a price and returns it reduced by `percent` %.
3. `fixedOff(amount: number): Discount` — returns a function that subtracts `amount` but never goes below `0`.
4. `finalPrice(price: number, ...discounts: Discount[]): number` — applies all discounts in order and rounds to 2 decimals (return a number).
5. `formatPrice(price: number, currency = "EUR", options?: { showSign?: boolean }): string` — returns e.g. `"12.50 EUR"`, or `"+12.50 EUR"` when `showSign` is true.
6. `assertPositive(value: number, name: string): void` that throws `Error("<name> must be positive")` via a helper `fail(message: string): never`.

Print:

- `formatPrice(finalPrice(100, percentOff(10), fixedOff(5)))`
- `formatPrice(finalPrice(20, fixedOff(30)))`
- `formatPrice(finalPrice(59.99), "USD", { showSign: true })`
- the message caught from `assertPositive(-1, "quantity")`.

### Expected result

No type errors, and:

```text
85.00 EUR
0.00 EUR
+59.99 USD
quantity must be positive
```

### Acceptance criteria

- [ ] All parameters and all return types are annotated (except inline arrow callbacks, which use contextual typing).
- [ ] `percentOff` and `fixedOff` return values of the `Discount` function type.
- [ ] `finalPrice` uses a rest parameter; `formatPrice` uses a default parameter and an optional object parameter.
- [ ] `fail` returns `never`.
- [ ] `npx tsc` passes; output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
type Discount = (price: number) => number;

function percentOff(percent: number): Discount {
  return (price) => price * (1 - percent / 100);
}

function fixedOff(amount: number): Discount {
  return (price) => Math.max(0, price - amount);
}

function finalPrice(price: number, ...discounts: Discount[]): number {
  const discounted = discounts.reduce((current, discount) => discount(current), price);
  return Math.round(discounted * 100) / 100;
}

function formatPrice(price: number, currency = "EUR", options?: { showSign?: boolean }): string {
  const sign = options?.showSign ? "+" : "";
  return `${sign}${price.toFixed(2)} ${currency}`;
}

function fail(message: string): never {
  throw new Error(message);
}

function assertPositive(value: number, name: string): void {
  if (value <= 0) fail(`${name} must be positive`);
}

console.log(formatPrice(finalPrice(100, percentOff(10), fixedOff(5)))); // → 85.00 EUR
console.log(formatPrice(finalPrice(20, fixedOff(30))));                // → 0.00 EUR
console.log(formatPrice(finalPrice(59.99), "USD", { showSign: true })); // → +59.99 USD
try {
  assertPositive(-1, "quantity");
} catch (error) {
  if (error instanceof Error) console.log(error.message); // → quantity must be positive
}
```

</details>

---

## 1.6 Union Types and Narrowing

**Goal:** Combine types with unions, use literal unions to restrict values, and narrow unions safely with `typeof`, truthiness, equality, `in`, `Array.isArray` and `instanceof`.

### Explanation

A **union type** `A | B` means "a value of type `A` *or* of type `B`":

```ts
function formatId(id: string | number): string {
  return `#${id}`;
}
console.log(formatId(42), formatId("a7")); // → #42 #a7
```

**You may only use what all members have in common.** Without further checks, TypeScript only allows operations valid for *every* member of the union:

```ts
function shout(value: string | number): string {
  // @ts-expect-error -- Property 'toUpperCase' does not exist on type 'string | number'.
  return value.toUpperCase();
}
```

**Narrowing.** Inside a check such as `typeof value === "string"`, TypeScript knows which member you have, and narrows the type accordingly. This **control-flow analysis** follows `if`, `else`, `return`, `switch`, `&&`, `||`, ternaries and more:

```ts
function shout(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
    //     ^? (parameter) value: string
  }
  return value.toFixed(1);
  //     ^? (parameter) value: number
}
console.log(shout("hi"), shout(2)); // → HI 2.0
```

After the `return` inside the `if`, the rest of the function only runs for numbers, so TypeScript narrows `value` to `number` there.

**Narrowing techniques**

| Check | Narrows |
|---|---|
| `typeof x === "string"` (also `"number"`, `"boolean"`, `"bigint"`, `"symbol"`, `"undefined"`, `"function"`, `"object"`) | primitives and functions |
| `if (x)` / `if (!x)` (truthiness) | removes `null`, `undefined` (and `""`, `0`, `false` — careful!) |
| `x === null`, `x !== undefined`, `x === "admin"` | by equality with a specific value |
| `"swim" in x` | object types by property presence |
| `Array.isArray(x)` | arrays |
| `x instanceof Date` | class instances |

```ts
type Fish = { swim: () => string };
type Bird = { fly: () => string };

function move(animal: Fish | Bird): string {
  if ("swim" in animal) {
    return animal.swim(); // animal: Fish
  }
  return animal.fly();    // animal: Bird
}

function total(input: number | number[]): number {
  return Array.isArray(input) ? input.reduce((a, b) => a + b, 0) : input;
}

function age(born: Date | string): number {
  const date = born instanceof Date ? born : new Date(born);
  return 2026 - date.getUTCFullYear();
}

console.log(move({ fly: () => "flap" }), total([1, 2, 3]), total(4), age("1990-05-01")); // → flap 6 4 36
```

**Nullable values.** `T | null` and `T | undefined` are just unions, narrowed the same way. Optional chaining and nullish coalescing work naturally:

```ts
function initials(name: string | null | undefined): string {
  if (name == null) return "?"; // == null catches both null and undefined
  return name
    .split(" ")
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
console.log(initials("grace brewster hopper"), initials(null)); // → GBH ?
```

Be careful with truthiness on values where `0` or `""` are valid: `if (count)` treats `0` as "missing". Prefer explicit checks such as `count !== undefined`.

**Literal unions** restrict a value to a fixed set of options — a lightweight, type-safe alternative to "magic strings":

```ts
type Size = "small" | "medium" | "large";

function price(size: Size): number {
  switch (size) {
    case "small":
      return 2;
    case "medium":
      return 3;
    case "large":
      return 4;
  }
}

console.log(price("medium")); // → 3
// @ts-expect-error -- Argument of type '"huge"' is not assignable to parameter of type 'Size'.
price("huge");
```

Editors autocomplete the allowed values, and TypeScript knows the `switch` above handles every case, so no "missing return" error appears. (2.1 shows how to make that completeness check explicit.)

**Assigning to unions.** A value of a narrower type can always be assigned to a wider union (`"small"` to `Size`, `string` to `string | number`), but not the other way round without narrowing.

### Practice task

Write `units.ts`.

1. Define `type Unit = "mm" | "cm" | "m" | "km"`.
2. Write `toMeters(value: number, unit: Unit): number` with a `switch`.
3. Write `parseLength(input: string | number): number | null` that accepts either a number (meaning metres) or a string like `"12.5 cm"` (number, a space, a unit). Return `null` for invalid strings. Use a type guard on the unit part: write `isUnit(text: string): text is Unit` as `["mm", "cm", "m", "km"].includes(text)` — you will learn exactly how `text is Unit` works in 2.1; for now, notice how it narrows.
4. Write `describeLength(input: string | number | null | undefined): string` that returns `"no value"` for `null`/`undefined`, `"invalid"` when parsing fails, and otherwise the length in metres with 3 decimals followed by ` m`.

Print `describeLength` for: `"250 cm"`, `1.5`, `"3 km"`, `"12 inches"`, `"abc m"`, `null`, `undefined`, and `0`.

### Expected result

No type errors, and:

```text
2.500 m
1.500 m
3000.000 m
invalid
invalid
no value
no value
0.000 m
```

### Acceptance criteria

- [ ] `Unit` is a union of string literals, and `toMeters` handles each in a `switch` with no `default` needed.
- [ ] `parseLength` narrows `string | number` with `typeof`.
- [ ] `describeLength` treats `0` as a valid value (not "no value").
- [ ] No `any` and no type assertions (`as`).
- [ ] `npx tsc` passes; output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
type Unit = "mm" | "cm" | "m" | "km";

function toMeters(value: number, unit: Unit): number {
  switch (unit) {
    case "mm":
      return value / 1000;
    case "cm":
      return value / 100;
    case "m":
      return value;
    case "km":
      return value * 1000;
  }
}

function isUnit(text: string): text is Unit {
  return ["mm", "cm", "m", "km"].includes(text);
}

function parseLength(input: string | number): number | null {
  if (typeof input === "number") return input;
  const [amountText, unitText] = input.trim().split(" ");
  const amount = Number(amountText);
  if (unitText === undefined || !isUnit(unitText) || amountText === "" || Number.isNaN(amount)) {
    return null;
  }
  return toMeters(amount, unitText);
}

function describeLength(input: string | number | null | undefined): string {
  if (input === null || input === undefined) return "no value";
  const meters = parseLength(input);
  if (meters === null) return "invalid";
  return `${meters.toFixed(3)} m`;
}

for (const input of ["250 cm", 1.5, "3 km", "12 inches", "abc m", null, undefined, 0]) {
  console.log(describeLength(input));
}
```

</details>

---

## 1.7 Type Aliases and Interfaces

**Goal:** Name types with `type` and `interface`, extend and combine them with `extends` and intersections, and know when to use which.

### Explanation

**Type aliases** give a name to *any* type — object types, unions, tuples, functions, primitives:

```ts
type ID = string | number;
type Point = { x: number; y: number };
type Pair<T> = [T, T]; // aliases can take type parameters (2.2)
type Callback = (error: Error | null) => void;

const p: Point = { x: 1, y: 2 };
//    ^? const p: Point
const ids: Pair<ID> = [1, "b"];
console.log(p, ids); // → { x: 1, y: 2 } [ 1, 'b' ]
```

An alias is just a name; it doesn't create a new, distinct type (two aliases with the same structure are interchangeable).

**Interfaces** are an alternative way to name **object types**:

```ts
interface User {
  id: number;
  name: string;
  email?: string;
  greet(): string;  // method signature
}

const ada: User = {
  id: 1,
  name: "Ada",
  greet() {
    return `Hi, I'm ${this.name}`;
  },
};
console.log(ada.greet()); // → Hi, I'm Ada
```

**Extending.** Interfaces can extend one or more other interfaces (or object type aliases):

```ts
interface Animal {
  name: string;
}
interface Pet extends Animal {
  owner: string;
}
interface ServiceDog extends Pet {
  role: "guide" | "therapy";
}

const buddy: ServiceDog = { name: "Buddy", owner: "Sam", role: "guide" };
console.log(`${buddy.name} (${buddy.role}) belongs to ${buddy.owner}`); // → Buddy (guide) belongs to Sam
```

**Intersections** (`A & B`) combine types with `type`: the result has all properties of both.

```ts
type Timestamped = { createdAt: Date; updatedAt: Date };
type Note = { title: string; body: string };
type SavedNote = Note & Timestamped & { id: number };

const note: SavedNote = {
  id: 1,
  title: "Plan",
  body: "Learn TypeScript",
  createdAt: new Date(Date.UTC(2026, 0, 1)),
  updatedAt: new Date(Date.UTC(2026, 0, 2)),
};
console.log(note.title, note.updatedAt.toISOString().slice(0, 10)); // → Plan 2026-01-02
```

**Implementing interfaces in classes.** A class can promise to satisfy an interface with `implements`; TypeScript checks it does (more in 2.3):

```ts
// Requires compilation with tsc (parameter properties are not erasable syntax)
interface Shape {
  area(): number;
}

class Square implements Shape {
  constructor(public readonly side: number) {}
  area(): number {
    return this.side ** 2;
  }
}

console.log(new Square(3).area()); // → 9
```

The `public readonly side` in the constructor is a *parameter property* — a TypeScript-only shorthand that Node.js can't strip, so that example needs compiling with `tsc` (see 1.1); 2.3 covers parameter properties in detail. Here is the same class in the style used throughout this curriculum:

```ts
interface Shape {
  area(): number;
}

class Square implements Shape {
  readonly side: number;
  constructor(side: number) {
    this.side = side;
  }
  area(): number {
    return this.side ** 2;
  }
}

const shapes: Shape[] = [new Square(2), { area: () => 3.5 }]; // any object with area() is a Shape
console.log(shapes.map((s) => s.area())); // → [ 4, 3.5 ]
```

**Declaration merging.** Declaring the same interface name twice *merges* the declarations. This is how libraries let you add properties to existing types (for example, adding a custom property to a framework's `Request` type, see 2.8). Type aliases can't be merged — declaring the same alias twice is an error.

```ts
interface Settings {
  theme: string;
}
interface Settings {
  fontSize: number;
}
const settings: Settings = { theme: "dark", fontSize: 14 }; // needs both
console.log(Object.keys(settings)); // → [ 'theme', 'fontSize' ]
```

**`type` or `interface`?**

| | `interface` | `type` |
|---|---|---|
| Object shapes | ✓ | ✓ |
| Unions, tuples, primitives, function types, mapped/conditional types | ✗ | ✓ |
| `extends` | ✓ (and reports conflicts clearly) | via `&` intersections |
| Declaration merging | ✓ | ✗ |

Both are fine for object shapes, and teams pick a convention. A common one: **use `interface` for object shapes (especially public APIs that others may extend), and `type` for everything else.** For large hierarchies, `interface extends` is also slightly faster for the compiler than intersections.

### Practice task

Write `staff.ts` modelling employees.

1. `type EmployeeId = \`E${number}\`` is a *template literal type* (3.3) meaning "the letter E followed by a number", e.g. `"E42"`. Use it as is.
2. `type Shift = "morning" | "evening" | "night"`.
3. `interface Person { name: string; email?: string }`.
4. `interface Employee extends Person { id: EmployeeId; shifts: Shift[]; hourlyRate: number }`.
5. `interface Manager extends Employee { reports: Employee[] }`.
6. `type Audited = { lastReviewed: string }` and `type AuditedEmployee = Employee & Audited`.
7. Write `weeklyPay(e: Employee, hoursPerShift = 8): number` where night shifts pay 1.5× the rate.
8. Write `teamCost(m: Manager): number` = the manager's weekly pay plus each report's weekly pay.
9. Write `contact(p: Person): string` returning the email or `"<name> (no email)"`.

Create two employees and a manager (with both employees as reports), plus one `AuditedEmployee`. Print the team cost, the contact line for each of the three people (manager first), and the audited employee's `lastReviewed`.

Use: Ana `E1`, shifts `["morning", "night"]`, rate 20, email `ana@example.com`; Ben `E2`, shifts `["evening"]`, rate 18; manager Cleo `E3`, shifts `["morning"]`, rate 30, email `cleo@example.com`; the audited employee is Ben's data plus `lastReviewed: "2026-09-01"`.

### Expected result

No type errors, and:

```text
Team cost: 784
cleo@example.com
ana@example.com
Ben (no email)
Reviewed: 2026-09-01
```

(Ana: 8×20 + 8×20×1.5 = 400; Ben: 8×18 = 144; Cleo: 8×30 = 240; total 784.)

Also verify that `id: "X1"` is rejected by the type checker.

### Acceptance criteria

- [ ] `Employee` and `Manager` use `interface ... extends`.
- [ ] `AuditedEmployee` uses an intersection.
- [ ] `Shift` is a literal union; `weeklyPay` uses it to detect night shifts.
- [ ] `Manager` can be passed wherever an `Employee` or `Person` is expected.
- [ ] `npx tsc` passes; output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
type EmployeeId = `E${number}`;
type Shift = "morning" | "evening" | "night";

interface Person {
  name: string;
  email?: string;
}

interface Employee extends Person {
  id: EmployeeId;
  shifts: Shift[];
  hourlyRate: number;
}

interface Manager extends Employee {
  reports: Employee[];
}

type Audited = { lastReviewed: string };
type AuditedEmployee = Employee & Audited;

function weeklyPay(e: Employee, hoursPerShift = 8): number {
  return e.shifts.reduce(
    (total, shift) => total + hoursPerShift * e.hourlyRate * (shift === "night" ? 1.5 : 1),
    0
  );
}

function teamCost(m: Manager): number {
  return m.reports.reduce((total, r) => total + weeklyPay(r), weeklyPay(m));
}

function contact(p: Person): string {
  return p.email ?? `${p.name} (no email)`;
}

const ana: Employee = { id: "E1", name: "Ana", email: "ana@example.com", shifts: ["morning", "night"], hourlyRate: 20 };
const ben: Employee = { id: "E2", name: "Ben", shifts: ["evening"], hourlyRate: 18 };
const cleo: Manager = {
  id: "E3",
  name: "Cleo",
  email: "cleo@example.com",
  shifts: ["morning"],
  hourlyRate: 30,
  reports: [ana, ben],
};
const audited: AuditedEmployee = { ...ben, lastReviewed: "2026-09-01" };

console.log(`Team cost: ${teamCost(cleo)}`); // → Team cost: 784
for (const person of [cleo, ana, ben]) {
  console.log(contact(person));
}
console.log(`Reviewed: ${audited.lastReviewed}`); // → Reviewed: 2026-09-01

// @ts-expect-error -- Type '"X1"' is not assignable to type '`E${number}`'.
const wrongId: EmployeeId = "X1";
```

</details>

---

## 1.8 Literal Types, `as const` and Enums

**Goal:** Use `as const` to keep values precise, derive union types from constant objects and arrays, and understand TypeScript enums and their trade-offs.

### Explanation

**`as const`** tells TypeScript to infer the narrowest possible type for an expression: literal types instead of `string`/`number`, `readonly` properties, and tuples instead of arrays.

```ts
const config = { mode: "dark", retries: 3 };
//    ^? const config: { mode: string; retries: number; }

const frozenConfig = { mode: "dark", retries: 3 } as const;
//    ^? const frozenConfig: { readonly mode: "dark"; readonly retries: 3; }

const sizes = ["S", "M", "L"] as const;
//    ^? const sizes: readonly ["S", "M", "L"]

console.log(frozenConfig.mode, sizes.length); // → dark 3
```

Like all types, `as const` is compile-time only; it does not freeze anything at run time (combine with `Object.freeze` if you need that).

**Deriving types from values.** Instead of writing a union by hand *and* a list of values (which can drift apart), write the values once and derive the type with `typeof` (the type of a value) and indexed access (2.4):

```ts
const SIZES = ["S", "M", "L", "XL"] as const;
type Size = (typeof SIZES)[number]; // "the type of any element"
//   ^? type Size = "L" | "M" | "S" | "XL"

function isSize(value: string): value is Size {
  return (SIZES as readonly string[]).includes(value);
}

console.log(SIZES.filter((s) => s !== "XL").join("/"), isSize("M"), isSize("XXL")); // → S/M/L true false
```

You now have both a runtime list (for menus, validation, loops) and a compile-time type, from one source of truth.

**Constant objects as enums.** The same idea gives you named constants:

```ts
const Status = {
  Active: "active",
  Suspended: "suspended",
  Deleted: "deleted",
} as const;

type Status = (typeof Status)[keyof typeof Status];
//   ^? type Status = "active" | "deleted" | "suspended"

function label(status: Status): string {
  return status === Status.Active ? "✓ active" : `✗ ${status}`;
}

console.log(label(Status.Active), label("deleted")); // → ✓ active ✗ deleted
console.log(Object.values(Status)); // → [ 'active', 'suspended', 'deleted' ]
```

(Using the same name for the value `Status` and the type `Status` is allowed and common, because values and types live in separate namespaces.)

**Enums.** TypeScript also has a dedicated `enum` keyword:

```ts
// Requires compilation with tsc (enums are not erasable syntax)
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right, // 3
}

enum LogLevel {
  Debug = "DEBUG",
  Info = "INFO",
  Error = "ERROR",
}

function move(direction: Direction): string {
  return `moving ${Direction[direction]}`; // numeric enums have a reverse mapping
}

console.log(Direction.Left);   // → 2
console.log(move(Direction.Up)); // → moving Up
console.log(LogLevel.Error);   // → ERROR
// @ts-expect-error -- Argument of type '"INFO"' is not assignable to parameter of type 'LogLevel'.
[LogLevel.Info].includes("INFO");
```

Enums are one of the few TypeScript features that **generate runtime code** (an object holding the values), so they cannot simply be erased. Consequences:

- Node.js type stripping refuses to run them, and the recommended `erasableSyntaxOnly` option reports them as errors. To use them you must compile with `tsc` (see 1.1) or a bundler.
- Numeric enums accept any number in some situations and have a confusing reverse mapping.
- String enums are *nominal*: the plain string `"INFO"` is not assignable to `LogLevel`, which surprises many people.
- `const enum` is inlined at compile time but breaks under tools that compile one file at a time.

For these reasons, much modern TypeScript code prefers **literal unions** (1.6) or **`as const` objects**, which are plain JavaScript plus erasable types. You will still meet enums in existing code bases, so you need to recognise them.

### Practice task

Write `http.ts`.

1. Create a constant object `HttpStatus` with `as const`: `Ok: 200`, `Created: 201`, `BadRequest: 400`, `NotFound: 404`, `ServerError: 500`.
2. Derive `type HttpStatus` (the union of the numeric values) and `type HttpStatusName` (the union of the keys).
3. Create `METHODS = ["GET", "POST", "PUT", "DELETE"] as const` and derive `type Method`.
4. Write `statusName(code: HttpStatus): HttpStatusName` that finds the key for a code (use `Object.entries` and a loop or `find`; you may need a check to satisfy the compiler).
5. Write `isMethod(value: string): value is Method`.
6. Write `describeRequest(method: string, code: HttpStatus): string` returning `"<METHOD> → <code> <Name>"` for valid methods (case-insensitive input) and `"Unsupported method: <method>"` otherwise.
7. Write `isError(code: HttpStatus): boolean` for codes ≥ 400.

Print `describeRequest` for `("get", HttpStatus.Ok)`, `("POST", HttpStatus.Created)`, `("patch", HttpStatus.BadRequest)`, `("delete", HttpStatus.NotFound)`; then print the codes that are errors (from `Object.values(HttpStatus)`), joined with commas.

### Expected result

No type errors, the file contains no `enum`, and:

```text
GET → 200 Ok
POST → 201 Created
Unsupported method: patch
DELETE → 404 NotFound
400,404,500
```

Hovering `HttpStatus` (the type) shows `200 | 201 | 400 | 404 | 500`.

### Acceptance criteria

- [ ] Each union type is derived from its constant with `typeof` (no hand-written duplicate lists).
- [ ] `statusName` returns the precise `HttpStatusName` type.
- [ ] `describeRequest("GET", 302)` and `const s: HttpStatus = 302` are type errors.
- [ ] No `enum` and no `any`.
- [ ] `npx tsc` passes; output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
const HttpStatus = {
  Ok: 200,
  Created: 201,
  BadRequest: 400,
  NotFound: 404,
  ServerError: 500,
} as const;

type HttpStatus = (typeof HttpStatus)[keyof typeof HttpStatus];
//   ^? type HttpStatus = 200 | 201 | 400 | 404 | 500
type HttpStatusName = keyof typeof HttpStatus;

const METHODS = ["GET", "POST", "PUT", "DELETE"] as const;
type Method = (typeof METHODS)[number];

function statusName(code: HttpStatus): HttpStatusName {
  for (const name of Object.keys(HttpStatus) as HttpStatusName[]) {
    if (HttpStatus[name] === code) return name;
  }
  throw new Error(`Unknown status ${code}`);
}

function isMethod(value: string): value is Method {
  return (METHODS as readonly string[]).includes(value);
}

function describeRequest(method: string, code: HttpStatus): string {
  const upper = method.toUpperCase();
  if (!isMethod(upper)) return `Unsupported method: ${method}`;
  return `${upper} → ${code} ${statusName(code)}`;
}

const isError = (code: HttpStatus): boolean => code >= 400;

console.log(describeRequest("get", HttpStatus.Ok));            // → GET → 200 Ok
console.log(describeRequest("POST", HttpStatus.Created));      // → POST → 201 Created
console.log(describeRequest("patch", HttpStatus.BadRequest));  // → Unsupported method: patch
console.log(describeRequest("delete", HttpStatus.NotFound));   // → DELETE → 404 NotFound
console.log(Object.values(HttpStatus).filter(isError).join(",")); // → 400,404,500

// @ts-expect-error -- Type '302' is not assignable to type 'HttpStatus'.
const redirect: HttpStatus = 302;
```

`Object.keys` is typed as returning `string[]` (because objects may have extra properties at run time — structural typing), so the `as HttpStatusName[]` assertion tells TypeScript we know the exact keys of this constant object. Assertions are the next topic.

</details>

---

## 1.9 Type Assertions, Non-Null Assertions and `satisfies`

**Goal:** Use `as`, `!` and `satisfies` correctly, understand what each does (and doesn't) guarantee, and prefer the safe option.

### Explanation

**Type assertions (`value as Type`)** tell the compiler "trust me, this value has this type". They are needed when you know more than TypeScript can infer — but they perform **no runtime check**. If you are wrong, the program fails later, somewhere else.

```ts
const raw: unknown = JSON.parse('{"name":"Ana","age":34}');

type Person = { name: string; age: number };
const person = raw as Person; // no check happens!
console.log(person.name.toUpperCase()); // → ANA

const wrong = JSON.parse('{"title":"oops"}') as Person;
console.log(wrong.name); // → undefined (the type lied)
```

`JSON.parse` returns `any`; assigning it to `unknown` first, then validating (2.6, 3.8), is the safe approach. Use assertions only after you have actually checked the data, or for facts the compiler can't know (like which DOM element an ID refers to, 2.9).

**Assertions must be plausible.** TypeScript only allows assertions between types that overlap; asserting a `string` is a `number` is rejected. The "double assertion" via `unknown` forces it — a strong code smell:

```ts
const text = "42";
// @ts-expect-error -- Conversion of type 'string' to type 'number' may be a mistake
const n1 = text as number;
const n2 = text as unknown as number; // compiles, but n2 is really a string
console.log(typeof n2); // → string
```

**The non-null assertion operator (`!`)** removes `null` and `undefined` from a type: `value!` means "trust me, this is not null or undefined". It is equally unchecked:

```ts
const scores = [10, 20, 30];
const firstScore = scores[0]!; // we can see the array is not empty
//    ^? const firstScore: number

const map = new Map([["a", 1]]);
console.log(firstScore + map.get("a")!); // → 11
```

Prefer real checks (`if (x !== undefined)`, `??`, optional chaining) or restructuring code so the compiler can see the guarantee. Reserve `!` for cases that are obviously safe to a reader.

**Definite assignment (`let x!: Type`)** says a variable will be assigned before use even though TypeScript can't see it (e.g. assigned in a callback). Use rarely.

**`satisfies`** checks that a value *matches* a type **without changing** the value's inferred type. This gives you validation *and* precise types:

```ts
type Theme = Record<string, string | [number, number, number]>;

// With an annotation, the precise information is lost:
const annotated: Theme = { primary: "#ff6600", accent: [0, 128, 255] };
// @ts-expect-error -- Property 'toUpperCase' does not exist on type 'string | [number, number, number]'.
annotated.primary.toUpperCase();

// With satisfies, the value is checked against Theme but keeps its own precise type:
const palette = {
  primary: "#ff6600",
  accent: [0, 128, 255],
} satisfies Theme;

console.log(palette.primary.toUpperCase()); // → #FF6600
console.log(palette.accent.map((c) => c / 255).map((c) => c.toFixed(2)).join(",")); // → 0.00,0.50,1.00

const broken = {
  // @ts-expect-error -- Type 'number' is not assignable to type 'string | [number, number, number]'.
  primary: 255,
} satisfies Theme;
```

`satisfies` also catches typos in keys when the target type has fixed keys, and combines well with `as const`:

```ts
type Route = { path: string; auth: boolean };

const routes = {
  home: { path: "/", auth: false },
  settings: { path: "/settings", auth: true },
} as const satisfies Record<string, Route>;

type RouteName = keyof typeof routes;
//   ^? type RouteName = "home" | "settings"

console.log(routes.settings.path); // → /settings
```

**Choosing**

| You want to… | Use |
|---|---|
| declare what a variable may hold | an annotation `const x: T = …` |
| check a value against a type but keep its precise inferred type | `satisfies T` |
| override the compiler because you verified something it can't see | `as T` (sparingly) |
| say "definitely not null/undefined" after an obvious check | `!` (sparingly) |

### Practice task

Write `theme.ts`.

1. Define `type Color = \`#${string}\`` (a string starting with `#`) and `type ThemeConfig = { colors: Record<string, Color>; spacing: Record<string, number>; font: string }`.
2. Create `theme` using `as const satisfies ThemeConfig` with colors `primary: "#3366ff"` and `danger: "#e53935"`, spacing `sm: 4` and `lg: 16`, and font `"Inter"`.
3. Derive `type ColorName = keyof typeof theme.colors` and `type SpacingName = keyof typeof theme.spacing`.
4. Write `color(name: ColorName): Color` and `space(name: SpacingName, multiplier = 1): string` returning e.g. `"32px"`.
5. Write `parseTheme(json: string): ThemeConfig` that parses JSON, performs a **minimal real check** (the result is an object with a `font` string, `colors` object and `spacing` object) and only then uses `as ThemeConfig`; it throws `Error("Invalid theme")` otherwise.

Print `color("danger")`, `space("lg", 2)`, the font in upper case, the result of parsing `'{"colors":{},"spacing":{},"font":"Mono"}'` (print `.font`), and the error message from parsing `'{"font": 12}'`.

Also add (with `@ts-expect-error` comments so the file still compiles) one line showing that `color("warning")` is rejected and one showing that a color value `"red"` would be rejected by `satisfies`.

### Expected result

`npx tsc` passes (the two `@ts-expect-error` lines are genuine errors), and:

```text
#e53935
32px
INTER
Mono
Invalid theme
```

Hovering `ColorName` shows `"danger" | "primary"`.

### Acceptance criteria

- [ ] `theme` uses `as const satisfies ThemeConfig` (not an annotation), so `ColorName` is a precise union.
- [ ] `parseTheme` checks the parsed value before asserting, and never uses `as unknown as`.
- [ ] No `!` assertions are needed anywhere.
- [ ] Both `@ts-expect-error` lines correspond to real errors (removing a directive makes `tsc` fail).
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
type Color = `#${string}`;
type ThemeConfig = {
  colors: Record<string, Color>;
  spacing: Record<string, number>;
  font: string;
};

const theme = {
  colors: { primary: "#3366ff", danger: "#e53935" },
  spacing: { sm: 4, lg: 16 },
  font: "Inter",
} as const satisfies ThemeConfig;

type ColorName = keyof typeof theme.colors;
//   ^? type ColorName = "danger" | "primary"
type SpacingName = keyof typeof theme.spacing;

function color(name: ColorName): Color {
  return theme.colors[name];
}

function space(name: SpacingName, multiplier = 1): string {
  return `${theme.spacing[name] * multiplier}px`;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseTheme(json: string): ThemeConfig {
  const data: unknown = JSON.parse(json);
  if (isObject(data) && typeof data.font === "string" && isObject(data.colors) && isObject(data.spacing)) {
    return data as ThemeConfig; // checked enough for this exercise
  }
  throw new Error("Invalid theme");
}

console.log(color("danger"));            // → #e53935
console.log(space("lg", 2));             // → 32px
console.log(theme.font.toUpperCase());   // → INTER
console.log(parseTheme('{"colors":{},"spacing":{},"font":"Mono"}').font); // → Mono
try {
  parseTheme('{"font": 12}');
} catch (error) {
  if (error instanceof Error) console.log(error.message); // → Invalid theme
}

// @ts-expect-error -- Argument of type '"warning"' is not assignable to parameter of type '"danger" | "primary"'.
color("warning");

const badTheme = {
  // @ts-expect-error -- Type '"red"' is not assignable to type '`#${string}`'.
  colors: { primary: "red" },
  spacing: {},
  font: "x",
} satisfies ThemeConfig;
```

A real application would validate every color and spacing value too; 3.8 shows how to do that systematically.

</details>

---

## Beginner Milestone Project: Typed Order Report

**Goal:** Combine primitive and literal types, arrays, tuples, object types, interfaces, unions, narrowing, functions, `as const` and `satisfies` in one fully typed program.

### Task

Write `orders.ts` that produces a report for an online shop.

**Types**

- `const CURRENCIES = ["EUR", "USD"] as const;` and `type Currency` derived from it.
- `type OrderStatus = "pending" | "paid" | "shipped" | "cancelled"`.
- `type LineItem = [sku: string, quantity: number, unitPrice: number]` (a labelled tuple).
- `type Coupon = { kind: "percent"; value: number } | { kind: "fixed"; value: number }` — a union of object types; narrow on `kind` with `if`/`switch`.
- `interface Order { id: number; customer: string; currency: Currency; status: OrderStatus; items: LineItem[]; coupon?: Coupon }`.

**Data** (copy exactly):

```ts
const orders: Order[] = [
  { id: 1, customer: "Ana", currency: "EUR", status: "paid", items: [["pen", 3, 1.5], ["pad", 2, 4]] },
  { id: 2, customer: "Ben", currency: "USD", status: "shipped", items: [["bag", 1, 40]], coupon: { kind: "percent", value: 25 } },
  { id: 3, customer: "Cy", currency: "EUR", status: "cancelled", items: [["pen", 10, 1.5]] },
  { id: 4, customer: "Ana", currency: "EUR", status: "pending", items: [["ink", 4, 3.25]], coupon: { kind: "fixed", value: 20 } },
];
```

**Functions** (annotate parameters and return types):

1. `subtotal(items: readonly LineItem[]): number`
2. `applyCoupon(amount: number, coupon?: Coupon): number` — percent reduces by `value` %; fixed subtracts `value` but never below 0.
3. `orderTotal(order: Order): number`
4. `formatMoney(amount: number, currency: Currency): string` — e.g. `"7.50 EUR"`.
5. `statusIcon(status: OrderStatus): string` — `pending` → `…`, `paid` → `✓`, `shipped` → `→`, `cancelled` → `✗`, using a `switch` with no `default`.
6. `revenueByCurrency(orders: readonly Order[]): Record<Currency, number>` — sums totals of orders that are not cancelled; every currency must be present (start from an object created with `satisfies Record<Currency, number>`).
7. `report(orders: readonly Order[]): string[]` — one line per order: `#<id> <icon> <customer padded to 4> <total>`, then `Revenue: <EUR total> | <USD total>`.

Print each line of `report(orders)`.

### Expected result

`npx tsc` reports no errors, there are no `any` types, and the output is:

```text
#1 ✓ Ana  12.50 EUR
#2 → Ben  30.00 USD
#3 ✗ Cy   15.00 EUR
#4 … Ana  0.00 EUR
Revenue: 12.50 EUR | 30.00 USD
```

### Acceptance criteria

- [ ] `Currency` is derived from `CURRENCIES`; `LineItem` is a labelled tuple; `Coupon` is a union narrowed on `kind`.
- [ ] `statusIcon` has no `default` branch, and adding a new status to `OrderStatus` would cause a type error in it (try adding `"refunded"`).
- [ ] `revenueByCurrency` returns an object with a key for every currency, typed `Record<Currency, number>`.
- [ ] Read-only parameters are typed `readonly`.
- [ ] No `any`, no `!`, no `as` (except `as const`).
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
const CURRENCIES = ["EUR", "USD"] as const;
type Currency = (typeof CURRENCIES)[number];

type OrderStatus = "pending" | "paid" | "shipped" | "cancelled";
type LineItem = [sku: string, quantity: number, unitPrice: number];
type Coupon = { kind: "percent"; value: number } | { kind: "fixed"; value: number };

interface Order {
  id: number;
  customer: string;
  currency: Currency;
  status: OrderStatus;
  items: LineItem[];
  coupon?: Coupon;
}

const orders: Order[] = [
  { id: 1, customer: "Ana", currency: "EUR", status: "paid", items: [["pen", 3, 1.5], ["pad", 2, 4]] },
  { id: 2, customer: "Ben", currency: "USD", status: "shipped", items: [["bag", 1, 40]], coupon: { kind: "percent", value: 25 } },
  { id: 3, customer: "Cy", currency: "EUR", status: "cancelled", items: [["pen", 10, 1.5]] },
  { id: 4, customer: "Ana", currency: "EUR", status: "pending", items: [["ink", 4, 3.25]], coupon: { kind: "fixed", value: 20 } },
];

function subtotal(items: readonly LineItem[]): number {
  return items.reduce((sum, [, quantity, unitPrice]) => sum + quantity * unitPrice, 0);
}

function applyCoupon(amount: number, coupon?: Coupon): number {
  if (coupon === undefined) return amount;
  switch (coupon.kind) {
    case "percent":
      return amount * (1 - coupon.value / 100);
    case "fixed":
      return Math.max(0, amount - coupon.value);
  }
}

function orderTotal(order: Order): number {
  return applyCoupon(subtotal(order.items), order.coupon);
}

function formatMoney(amount: number, currency: Currency): string {
  return `${amount.toFixed(2)} ${currency}`;
}

function statusIcon(status: OrderStatus): string {
  switch (status) {
    case "pending":
      return "…";
    case "paid":
      return "✓";
    case "shipped":
      return "→";
    case "cancelled":
      return "✗";
  }
}

function revenueByCurrency(orders: readonly Order[]): Record<Currency, number> {
  const totals = { EUR: 0, USD: 0 } satisfies Record<Currency, number>;
  for (const order of orders) {
    if (order.status !== "cancelled") {
      totals[order.currency] += orderTotal(order);
    }
  }
  return totals;
}

function report(orders: readonly Order[]): string[] {
  const lines = orders.map(
    (o) => `#${o.id} ${statusIcon(o.status)} ${o.customer.padEnd(4)} ${formatMoney(orderTotal(o), o.currency)}`
  );
  const revenue = revenueByCurrency(orders);
  lines.push(`Revenue: ${formatMoney(revenue.EUR, "EUR")} | ${formatMoney(revenue.USD, "USD")}`);
  return lines;
}

for (const line of report(orders)) {
  console.log(line);
}
```

</details>

---
# Level 2 — Intermediate

This level covers the tools you need for real applications: discriminated unions and exhaustive checks, generics, classes, type operators (`keyof`, `typeof`, indexed access), the built-in utility types, asynchronous code, typed error handling, modules and declaration files, and the DOM. You should be comfortable with every Beginner topic before starting.

---

## 2.1 Discriminated Unions and Advanced Narrowing

**Goal:** Model alternatives with discriminated unions, make `switch` statements provably exhaustive, write your own type guards and assertion functions, and understand how far narrowing reaches.

### Explanation

**Discriminated (tagged) unions.** When each member of a union of object types has a common property with a different *literal* type — the **discriminant** — checking that property narrows the whole object:

```ts
type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Triangle = { kind: "triangle"; base: number; height: number };
type Shape = Circle | Rectangle | Triangle;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2; // shape: Circle
    case "rectangle":
      return shape.width * shape.height;  // shape: Rectangle
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}

const shapes: Shape[] = [
  { kind: "circle", radius: 1 },
  { kind: "rectangle", width: 2, height: 3 },
  { kind: "triangle", base: 4, height: 5 },
];
console.log(shapes.map((s) => area(s).toFixed(2)).join(" ")); // → 3.14 6.00 10.00
```

Discriminated unions are *the* idiomatic way to model "one of several shapes of data" in TypeScript: API responses (`{ status: "ok", data } | { status: "error", message }`), events, actions, states of a UI (`loading | loaded | failed`). They make invalid combinations impossible to represent: a `Circle` can't accidentally have a `width`.

**Exhaustiveness checking.** When you add a new member to a union, you want the compiler to point at every `switch` that doesn't handle it yet. The trick is the `never` type: after all cases are handled, the narrowed value has type `never`, and passing it to a function that only accepts `never` compiles. If a case is missing, the leftover member is not assignable to `never` and you get an error *at that line*:

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number }
  | { kind: "hexagon"; side: number };

function assertNever(value: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
}

function perimeter(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return 2 * Math.PI * shape.radius;
    case "square":
      return 4 * shape.side;
    default:
      // @ts-expect-error -- Argument of type '{ kind: "hexagon"; side: number; }' is not assignable to parameter of type 'never'.
      return assertNever(shape); // forgot "hexagon": compile error here
  }
}

console.log(perimeter({ kind: "square", side: 2 })); // → 8
try {
  perimeter({ kind: "hexagon", side: 1 });
} catch (error) {
  if (error instanceof Error) console.log(error.message); // → Unhandled case: {"kind":"hexagon","side":1}
}
```

`assertNever` also protects you at run time if invalid data sneaks in from outside.

**User-defined type guards.** A function whose return type is `value is Type` is a **type predicate**: when it returns `true`, TypeScript narrows the argument to `Type`. Use them to name a check and reuse it:

```ts
type Fish = { name: string; swim(): string };
type Bird = { name: string; fly(): string };

function isFish(animal: Fish | Bird): animal is Fish {
  return "swim" in animal;
}

const pets: (Fish | Bird)[] = [
  { name: "Nemo", swim: () => "splash" },
  { name: "Tweety", fly: () => "flap" },
];

for (const pet of pets) {
  console.log(isFish(pet) ? pet.swim() : pet.fly());
}
// → splash
// → flap

const fishOnly = pets.filter(isFish);
//    ^? const fishOnly: Fish[]
console.log(fishOnly.map((f) => f.name)); // → [ 'Nemo' ]
```

TypeScript trusts the predicate completely; if the body is wrong, the narrowing is wrong. Keep guard bodies simple and test them.

**Inferred type predicates.** Since TypeScript 5.5, simple arrow functions such as `x => x !== null` are automatically inferred as type predicates, so `filter` narrows without extra work:

```ts
const raw = [3, null, 7, undefined, 1];
const numbers = raw.filter((n) => n != null);
//    ^? const numbers: number[]
console.log(numbers.reduce((a, b) => a + b, 0)); // → 11
```

**Assertion functions.** A function declared with `asserts value is Type` (or `asserts condition`) throws if the check fails; after the call, TypeScript treats the check as true for the rest of the scope. They are convenient for validating input at the top of a function:

```ts
function assertIsString(value: unknown, name: string): asserts value is string {
  if (typeof value !== "string") {
    throw new TypeError(`${name} must be a string, got ${typeof value}`);
  }
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function createUser(input: { name: unknown; age: unknown }) {
  assertIsString(input.name, "name");
  assert(typeof input.age === "number" && input.age >= 0, "age must be a non-negative number");
  return { name: input.name.trim(), age: input.age }; // both narrowed
}

console.log(createUser({ name: " Ana ", age: 34 })); // → { name: 'Ana', age: 34 }
try {
  createUser({ name: 42, age: 1 });
} catch (error) {
  if (error instanceof Error) console.log(error.message); // → name must be a string, got number
}
```

**Where narrowing stops.** Narrowing is based on control flow within a function. Two common surprises:

- Narrowing of a mutable `let` variable or an object property can be "forgotten" inside callbacks, because the callback might run after the value changed. Copy the narrowed value into a `const` first.
- Narrowing one variable doesn't narrow a *different* variable that happens to be related; destructure from the discriminated object *after* narrowing, or narrow on the object itself.

```ts
type Loaded = { state: "loaded"; items: string[] };
type Failed = { state: "failed"; error: string };

function render(result: Loaded | Failed): string {
  if (result.state === "failed") {
    return `Error: ${result.error}`;
  }
  const { items } = result; // destructure after narrowing
  return items.map((item) => `- ${item}`).join("\n");
}

console.log(render({ state: "loaded", items: ["a", "b"] }));
// → - a
// → - b
console.log(render({ state: "failed", error: "timeout" })); // → Error: timeout
```

### Practice task

Write `payments.ts`.

1. Define a discriminated union `Payment` with discriminant `method`:
    - `{ method: "card"; amount: number; cardLast4: string }`
    - `{ method: "paypal"; amount: number; email: string }`
    - `{ method: "transfer"; amount: number; iban: string; instant: boolean }`
2. Write `fee(payment: Payment): number`: card 2.9% + 0.30; paypal 3.4%; transfer 0, or 1.00 if `instant`. Use a `switch` with an exhaustive `default` that calls `assertNever`.
3. Write `describe(payment: Payment): string` returning e.g. `"card •••• 4242: 100.00 (fee 3.20)"`, `"paypal ana@example.com: …"`, `"transfer DE89…3000 (instant): …"` (IBAN shortened to its first 4 and last 4 characters; `(instant)` only when instant).
4. Write a type guard `isPayment(value: unknown): value is Payment` that checks the object, a valid `method`, a numeric `amount`, and the method-specific field (`cardLast4`, `email` or `iban` + boolean `instant`).
5. Write `assertValidAmount(amount: number): void` that throws `RangeError("Amount must be positive")` unless `amount > 0`, and call it at the start of `describe`.

Run with this input and print `describe(...)` for each valid item and `invalid` for the rest, catching errors and printing their messages:

```ts
const inputs: unknown[] = [
  { method: "card", amount: 100, cardLast4: "4242" },
  { method: "paypal", amount: 50, email: "ana@example.com" },
  { method: "transfer", amount: 1200, iban: "DE89370400440532013000", instant: true },
  { method: "transfer", amount: 10, iban: "PT50000201231234567890154", instant: false },
  { method: "cash", amount: 5 },
  { method: "card", amount: -3, cardLast4: "1111" },
  "card",
];
```

### Expected result

No type errors, and:

```text
card •••• 4242: 100.00 (fee 3.20)
paypal ana@example.com: 50.00 (fee 1.70)
transfer DE89…3000 (instant): 1200.00 (fee 1.00)
transfer PT50…0154: 10.00 (fee 0.00)
invalid
Amount must be positive
invalid
```

Adding a fourth payment method to the union (e.g. `{ method: "crypto"; amount: number; wallet: string }`) must produce a compile error in `fee` (try it).

### Acceptance criteria

- [ ] `Payment` is a discriminated union and every function narrows on `method`.
- [ ] `fee` ends with an exhaustive `default` using `assertNever(payment)` (a function taking `never`).
- [ ] `isPayment` takes `unknown`, returns `value is Payment`, and contains no `as` assertions except possibly to index the object after checking it is non-null.
- [ ] `assertValidAmount` throws for non-positive amounts, and the invalid amount is reported, not silently accepted.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
type Payment =
  | { method: "card"; amount: number; cardLast4: string }
  | { method: "paypal"; amount: number; email: string }
  | { method: "transfer"; amount: number; iban: string; instant: boolean };

function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
}

function fee(payment: Payment): number {
  switch (payment.method) {
    case "card":
      return payment.amount * 0.029 + 0.3;
    case "paypal":
      return payment.amount * 0.034;
    case "transfer":
      return payment.instant ? 1 : 0;
    default:
      return assertNever(payment);
  }
}

function assertValidAmount(amount: number): void {
  if (!(amount > 0)) throw new RangeError("Amount must be positive");
}

function label(payment: Payment): string {
  switch (payment.method) {
    case "card":
      return `card •••• ${payment.cardLast4}`;
    case "paypal":
      return `paypal ${payment.email}`;
    case "transfer": {
      const short = `${payment.iban.slice(0, 4)}…${payment.iban.slice(-4)}`;
      return `transfer ${short}${payment.instant ? " (instant)" : ""}`;
    }
  }
}

function describe(payment: Payment): string {
  assertValidAmount(payment.amount);
  return `${label(payment)}: ${payment.amount.toFixed(2)} (fee ${fee(payment).toFixed(2)})`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isPayment(value: unknown): value is Payment {
  if (!isRecord(value) || typeof value.amount !== "number") return false;
  switch (value.method) {
    case "card":
      return typeof value.cardLast4 === "string";
    case "paypal":
      return typeof value.email === "string";
    case "transfer":
      return typeof value.iban === "string" && typeof value.instant === "boolean";
    default:
      return false;
  }
}

const inputs: unknown[] = [
  { method: "card", amount: 100, cardLast4: "4242" },
  { method: "paypal", amount: 50, email: "ana@example.com" },
  { method: "transfer", amount: 1200, iban: "DE89370400440532013000", instant: true },
  { method: "transfer", amount: 10, iban: "PT50000201231234567890154", instant: false },
  { method: "cash", amount: 5 },
  { method: "card", amount: -3, cardLast4: "1111" },
  "card",
];

for (const input of inputs) {
  if (!isPayment(input)) {
    console.log("invalid");
    continue;
  }
  try {
    console.log(describe(input));
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}
```

`isPayment` is the boundary between untrusted data (`unknown`) and the typed world: after it returns `true`, every later function can rely on the `Payment` type.

</details>

---

## 2.2 Generics

**Goal:** Write generic functions, types and interfaces that work for many types while preserving type information; constrain type parameters; and know when generics are (and aren't) the right tool.

### Explanation

Suppose you want a function that returns the first element of any array. Using `unknown[]` loses information — the caller gets `unknown` back. A **generic** function has a **type parameter** (conventionally `T`) that stands for "whatever type the caller uses", linking the input type to the output type:

```ts
function firstUnknown(items: readonly unknown[]): unknown {
  return items[0];
}
const lost = firstUnknown([1, 2, 3]);
//    ^? const lost: unknown

function first<T>(items: readonly T[]): T | undefined {
  return items[0];
}
const n = first([1, 2, 3]);
//    ^? const n: number | undefined
const s = first(["a", "b"]);
//    ^? const s: string | undefined

console.log(n, s); // → 1 a
```

TypeScript **infers** `T` from the arguments, so callers rarely write type arguments. You can supply them explicitly when inference has nothing to go on, e.g. `first<string>([])`, or `new Set<number>()`.

**Several type parameters** relate several values:

```ts
function mapValues<T, U>(items: readonly T[], fn: (item: T) => U): U[] {
  const result: U[] = [];
  for (const item of items) result.push(fn(item));
  return result;
}

const lengths = mapValues(["apple", "kiwi"], (word) => word.length);
//    ^? const lengths: number[]

function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}
const p = pair("age", 34);
//    ^? const p: [string, number]

console.log(lengths, p); // → [ 5, 4 ] [ 'age', 34 ]
```

**Constraints** (`T extends Something`) say which types are allowed, and give the function access to the members of the constraint:

```ts
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

console.log(longest("apple", "fig"));    // → apple
console.log(longest([1, 2], [1, 2, 3])); // → [ 1, 2, 3 ]
// @ts-expect-error -- Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
longest(10, 20);
```

Note that the return type is `T`, not `{ length: number }`, so `longest("apple", "fig")` still returns a `string` with all string methods.

**`keyof` constraints** connect an object and the names of its properties (`keyof` and `T[K]` are explained fully in 2.4):

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const book = { title: "Dune", year: 1965 };
const year = getProperty(book, "year");
//    ^? const year: number

// @ts-expect-error -- Argument of type '"author"' is not assignable to parameter of type '"title" | "year"'.
getProperty(book, "author");

console.log(year); // → 1965
```

**Generic types and interfaces** take type parameters too:

```ts
interface ApiResponse<T> {
  status: number;
  data: T;
  receivedAt: string;
}

type Pair<T> = [first: T, second: T];
type Nullable<T> = T | null;

const response: ApiResponse<{ id: number; name: string }[]> = {
  status: 200,
  data: [{ id: 1, name: "Ana" }],
  receivedAt: "2026-10-27T10:00:00Z",
};

const range: Pair<number> = [1, 10];
const maybe: Nullable<string> = null;
console.log(response.data[0]?.name, range[1], maybe); // → Ana 10 null
```

You have already used built-in generic types: `Array<T>`, `ReadonlyArray<T>`, `Promise<T>`, `Map<K, V>`, `Set<T>`, `Record<K, V>`.

**Default type parameters** apply when a type argument is not given and can't be inferred:

```ts
interface Paginated<T, Meta = { page: number; total: number }> {
  items: T[];
  meta: Meta;
}

const page: Paginated<string> = { items: ["a"], meta: { page: 1, total: 1 } };
console.log(page.meta.total); // → 1
```

**Generic factories** return objects whose methods share the type parameter:

```ts
function createQueue<T>() {
  const items: T[] = [];
  return {
    enqueue(item: T): void {
      items.push(item);
    },
    dequeue(): T | undefined {
      return items.shift();
    },
    get size(): number {
      return items.length;
    },
  };
}

const jobs = createQueue<{ id: number }>(); // T can't be inferred from no arguments, so we pass it
jobs.enqueue({ id: 1 });
jobs.enqueue({ id: 2 });
// @ts-expect-error -- Argument of type 'string' is not assignable to parameter of type '{ id: number; }'.
jobs.enqueue("three");
console.log(jobs.dequeue()?.id, jobs.size); // → 1 2
```

(The two jobs plus the rejected string — which still ran, because types are erased — explain why `size` is 2 after one `dequeue`.)

**When not to use generics.** A type parameter should *relate* things — typically appearing at least twice (in two parameters, or a parameter and the return type). `function log<T>(value: T): void` gains nothing over `function log(value: unknown): void`. Overly clever generics make code hard to read; prefer the simplest signature that keeps the information callers need.

### Practice task

Write `collections.ts` with these generic functions (no `any`):

1. `last<T>(items: readonly T[]): T | undefined`.
2. `pluck<T, K extends keyof T>(items: readonly T[], key: K): T[K][]`.
3. `groupBy<T, K extends PropertyKey>(items: readonly T[], keyFn: (item: T) => K): Partial<Record<K, T[]>>`. (`PropertyKey` is the built-in type `string | number | symbol`; `Partial<Record<K, T[]>>` means "an object that may have a `T[]` for each key `K`" — see 2.5.)
4. `merge<A extends object, B extends object>(a: A, b: B): A & B`.
5. `createStack<T>()` returning `{ push(item: T): void; pop(): T | undefined; peek(): T | undefined; readonly size: number }`.

Use this data:

```ts
type Movie = { title: string; year: number; genre: "drama" | "comedy" | "sci-fi" };
const movies: Movie[] = [
  { title: "Arrival", year: 2016, genre: "sci-fi" },
  { title: "Amélie", year: 2001, genre: "comedy" },
  { title: "Dune", year: 2021, genre: "sci-fi" },
];
```

Print: `last(movies)?.title`; `pluck(movies, "year")`; the titles in the `"sci-fi"` group from `groupBy(movies, (m) => m.genre)`; `merge({ id: 1 }, { name: "Ana" })`; and, using a stack of numbers, push 1, 2, 3, pop once, then print `peek()` and `size`.

### Expected result

No type errors, and:

```text
Dune
[ 2016, 2001, 2021 ]
[ 'Arrival', 'Dune' ]
{ id: 1, name: 'Ana' }
2 2
```

Also confirm by hovering: `pluck(movies, "genre")` has type `("comedy" | "drama" | "sci-fi")[]`, and `pluck(movies, "rating")` is a compile error.

### Acceptance criteria

- [ ] Every function is generic and returns precise types (no `unknown` or `any` in results).
- [ ] `pluck` uses `K extends keyof T` and returns `T[K][]`.
- [ ] `groupBy`'s keys are inferred from the callback (hover the result: its keys are the genre literals).
- [ ] `createStack<number>()` rejects `push("x")`.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
function last<T>(items: readonly T[]): T | undefined {
  return items.at(-1);
}

function pluck<T, K extends keyof T>(items: readonly T[], key: K): T[K][] {
  return items.map((item) => item[key]);
}

function groupBy<T, K extends PropertyKey>(items: readonly T[], keyFn: (item: T) => K): Partial<Record<K, T[]>> {
  const groups: Partial<Record<K, T[]>> = {};
  for (const item of items) {
    const key = keyFn(item);
    const group = groups[key] ?? [];
    group.push(item);
    groups[key] = group;
  }
  return groups;
}

function merge<A extends object, B extends object>(a: A, b: B): A & B {
  return { ...a, ...b };
}

function createStack<T>() {
  const items: T[] = [];
  return {
    push(item: T): void {
      items.push(item);
    },
    pop(): T | undefined {
      return items.pop();
    },
    peek(): T | undefined {
      return items.at(-1);
    },
    get size(): number {
      return items.length;
    },
  };
}

type Movie = { title: string; year: number; genre: "drama" | "comedy" | "sci-fi" };
const movies: Movie[] = [
  { title: "Arrival", year: 2016, genre: "sci-fi" },
  { title: "Amélie", year: 2001, genre: "comedy" },
  { title: "Dune", year: 2021, genre: "sci-fi" },
];

console.log(last(movies)?.title);       // → Dune
console.log(pluck(movies, "year"));     // → [ 2016, 2001, 2021 ]
const genres = pluck(movies, "genre");
//    ^? const genres: ("comedy" | "drama" | "sci-fi")[]
const byGenre = groupBy(movies, (m) => m.genre);
console.log(byGenre["sci-fi"]?.map((m) => m.title)); // → [ 'Arrival', 'Dune' ]
console.log(merge({ id: 1 }, { name: "Ana" }));      // → { id: 1, name: 'Ana' }

const stack = createStack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
stack.pop();
console.log(stack.peek(), stack.size); // → 2 2

// @ts-expect-error -- Argument of type '"rating"' is not assignable to parameter of type 'keyof Movie'.
pluck(movies, "rating");
```

</details>

---

## 2.3 Classes in TypeScript

**Goal:** Declare class properties with types, use access modifiers and `readonly`, write abstract classes and interfaces for classes, mark overrides, write generic classes, and know which class features are erasable.

### Explanation

TypeScript classes are JavaScript classes plus type annotations and a few compile-time modifiers.

**Property declarations.** Every instance property must be declared with its type in the class body. With `strict`, TypeScript checks that each one is initialised (by an initialiser or in the constructor):

```ts
class Counter {
  count = 0;              // type inferred as number
  label: string;          // declared, assigned in the constructor
  // @ts-expect-error -- Property 'step' has no initializer and is not definitely assigned in the constructor.
  step: number;

  constructor(label: string) {
    this.label = label;
  }

  increment(): number {
    this.count += 1;
    return this.count;
  }
}

const c = new Counter("clicks");
c.increment();
console.log(c.label, c.increment()); // → clicks 2
```

**Access modifiers** control where members can be used — at **compile time** only:

| Modifier | Accessible from |
|---|---|
| `public` (default) | anywhere |
| `protected` | the class and its subclasses |
| `private` | only inside the class |

JavaScript's own `#private` fields (see the JavaScript curriculum) are enforced at **run time** too. Prefer `#private` for real encapsulation; you'll still see `private` in a lot of code. `readonly` prevents reassignment after construction.

```ts
class BankAccount {
  readonly owner: string;
  protected balance = 0;
  #pin: string;             // truly private, also at run time
  private auditLog: string[] = [];

  constructor(owner: string, pin: string) {
    this.owner = owner;
    this.#pin = pin;
  }

  deposit(amount: number): void {
    this.balance += amount;
    this.auditLog.push(`+${amount}`);
  }

  checkPin(pin: string): boolean {
    return pin === this.#pin;
  }
}

const acct = new BankAccount("Ana", "1234");
acct.deposit(50);
// @ts-expect-error -- Property 'balance' is protected and only accessible within class 'BankAccount' and its subclasses.
console.log(acct.balance);
// @ts-expect-error -- Cannot assign to 'owner' because it is a read-only property.
acct.owner = "Eve";
console.log(acct.checkPin("1234"), Object.keys(acct)); // → true [ 'owner', 'balance', 'auditLog' ]
```

Notice the last line: `private` and `protected` properties are ordinary properties at run time (and the earlier lines with errors actually ran: one printed `50`, one reassigned `owner`). Only `#pin` is invisible.

**Parameter properties** are a TypeScript shorthand that declares and assigns a property from a constructor parameter in one go. Because they generate code (`this.x = x`), they are **not erasable**: Node.js type stripping and `erasableSyntaxOnly` reject them. You will see them often in existing code:

```ts
// Requires compilation with tsc (parameter properties are not erasable syntax)
class Point {
  constructor(
    public readonly x: number,
    public readonly y: number,
    private label = "point",
  ) {}

  toString(): string {
    return `${this.label}(${this.x}, ${this.y})`;
  }
}

console.log(String(new Point(1, 2))); // → point(1, 2)
```

**Implementing interfaces.** `implements` checks that a class provides everything an interface requires. It does not change the class's type or add anything at run time; a class can implement several interfaces:

```ts
interface Serializable {
  serialize(): string;
}
interface Identified {
  readonly id: string;
}

class Tag implements Serializable, Identified {
  readonly id: string;
  name: string;
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
  serialize(): string {
    return JSON.stringify({ id: this.id, name: this.name });
  }
}

const items: Serializable[] = [new Tag("t1", "urgent")];
console.log(items.map((i) => i.serialize())); // → [ '{"id":"t1","name":"urgent"}' ]
```

**Abstract classes** can't be instantiated; they provide shared code and declare `abstract` members that subclasses must implement. **`override`** marks methods that replace a parent method; with the `noImplicitOverride` option, forgetting it (or misspelling the parent method name) is an error:

```ts
abstract class Report {
  protected title = "Report";

  abstract rows(): string[];

  render(): string {
    return [this.header(), ...this.rows()].join("\n");
  }

  protected header(): string {
    return `== ${this.title} ==`;
  }
}

class SalesReport extends Report {
  rows(): string[] {
    return ["Q1: 100", "Q2: 140"];
  }
  protected override header(): string {
    return `${super.header()} (sales)`;
  }
}

// @ts-expect-error -- Cannot create an instance of an abstract class.
new Report();

console.log(new SalesReport().render());
// → == Report == (sales)
// → Q1: 100
// → Q2: 140
```

(`abstract`, `override`, access modifiers and `implements` are all erasable: they disappear entirely when types are stripped. The `new Report()` line, however, still runs — abstract classes are only abstract at compile time — and simply creates an object.)

**Generic classes**

```ts
class TypedEventLog<T extends { type: string }> {
  #entries: T[] = [];

  record(entry: T): this {
    this.#entries.push(entry);
    return this; // returning `this` enables chaining, and keeps the subclass type
  }

  ofType<K extends T["type"]>(type: K): Extract<T, { type: K }>[] {
    return this.#entries.filter((e): e is Extract<T, { type: K }> => e.type === type);
  }
}

type AppEvent = { type: "login"; user: string } | { type: "error"; message: string };

const log = new TypedEventLog<AppEvent>()
  .record({ type: "login", user: "ana" })
  .record({ type: "error", message: "disk full" })
  .record({ type: "login", user: "ben" });

console.log(log.ofType("login").map((e) => e.user)); // → [ 'ana', 'ben' ]
```

(`Extract` is a utility type from 2.5: "the members of `T` assignable to `{ type: K }`".)

**Classes as types.** A class declaration creates both a value (the constructor) and a type (the instance shape). `typeof ClassName` is the type of the constructor itself, and `new (...args: any[]) => T` describes "anything constructible":

```ts
class Dog {
  speak(): string {
    return "woof";
  }
}

function create<T>(Ctor: new () => T): T {
  return new Ctor();
}

const d: Dog = create(Dog);
const DogClass: typeof Dog = Dog;
console.log(d.speak(), new DogClass().speak()); // → woof woof
```

Because typing is structural, any object with a `speak(): string` method is assignable to `Dog` — classes don't create nominal types (unless they have `private`/`#private` members).

### Practice task

Write `accounts.ts`.

1. `abstract class Account` with:
    - `readonly id: string`, a `protected` balance (`#` is also acceptable for the history), and a private-style transaction history (array of strings) using a `#` field;
    - `deposit(amount: number): this` and `withdraw(amount: number): this` (throw `RangeError("Insufficient funds")` if it would go below `this.overdraftLimit()`'s negative value; both record history like `"+100"` / `"-30"`);
    - an `abstract monthlyFee(): number` and a `protected overdraftLimit(): number` returning `0`;
    - `endOfMonth(): void` that withdraws the monthly fee if positive (bypassing the overdraft check is not needed);
    - `get history(): readonly string[]` and `get currentBalance(): number`.
2. `class CheckingAccount extends Account`: fee `5`, `override` overdraft limit `100`.
3. `class SavingsAccount extends Account`: fee `0`, and a method `addInterest(ratePercent: number): this` that deposits the interest, rounded to cents.
4. `class Registry<T extends { readonly id: string }>` with `add(item: T): void` (throw if the id exists), `get(id: string): T | undefined`, and `all(): T[]`.

Run:

```ts
const registry = new Registry<Account>();
registry.add(new CheckingAccount("chk-1").deposit(50).withdraw(120));
registry.add(new SavingsAccount("sav-1").deposit(1000).addInterest(2.5));
for (const account of registry.all()) account.endOfMonth();

for (const account of registry.all()) {
  console.log(account.id, account.currentBalance, account.history.join(" "));
}
try {
  registry.get("sav-1")?.withdraw(5000);
} catch (error) {
  if (error instanceof Error) console.log(error.message);
}
try {
  registry.add(new SavingsAccount("sav-1"));
} catch (error) {
  if (error instanceof Error) console.log(error.message);
}
```

### Expected result

No type errors (with `noImplicitOverride` turned on as well, if you want to try it), and:

```text
chk-1 -75 +50 -120 -5
sav-1 1025 +1000 +25
Insufficient funds
Duplicate id: sav-1
```

### Acceptance criteria

- [ ] `Account` is abstract, `new Account(...)` is a type error, and subclasses implement `monthlyFee`.
- [ ] Overriding methods use the `override` keyword.
- [ ] `deposit`/`withdraw`/`addInterest` return `this`, so `new SavingsAccount(...).deposit(...).addInterest(...)` type-checks (it wouldn't if they returned `Account`).
- [ ] The history is a `#` private field exposed only through a `readonly string[]` getter.
- [ ] `Registry` is generic with a constraint and works for any type with a readonly `id`.
- [ ] No parameter properties (the file runs with `node accounts.ts`).
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
abstract class Account {
  readonly id: string;
  protected balance = 0;
  #history: string[] = [];

  constructor(id: string) {
    this.id = id;
  }

  abstract monthlyFee(): number;

  protected overdraftLimit(): number {
    return 0;
  }

  deposit(amount: number): this {
    this.balance += amount;
    this.#history.push(`+${amount}`);
    return this;
  }

  withdraw(amount: number): this {
    if (this.balance - amount < -this.overdraftLimit()) {
      throw new RangeError("Insufficient funds");
    }
    this.balance -= amount;
    this.#history.push(`-${amount}`);
    return this;
  }

  endOfMonth(): void {
    const fee = this.monthlyFee();
    if (fee > 0) {
      this.balance -= fee;
      this.#history.push(`-${fee}`);
    }
  }

  get history(): readonly string[] {
    return this.#history;
  }

  get currentBalance(): number {
    return this.balance;
  }
}

class CheckingAccount extends Account {
  monthlyFee(): number {
    return 5;
  }
  protected override overdraftLimit(): number {
    return 100;
  }
}

class SavingsAccount extends Account {
  monthlyFee(): number {
    return 0;
  }
  addInterest(ratePercent: number): this {
    const interest = Math.round(this.balance * ratePercent) / 100;
    return this.deposit(interest);
  }
}

class Registry<T extends { readonly id: string }> {
  #items = new Map<string, T>();

  add(item: T): void {
    if (this.#items.has(item.id)) throw new Error(`Duplicate id: ${item.id}`);
    this.#items.set(item.id, item);
  }

  get(id: string): T | undefined {
    return this.#items.get(id);
  }

  all(): T[] {
    return [...this.#items.values()];
  }
}

const registry = new Registry<Account>();
registry.add(new CheckingAccount("chk-1").deposit(50).withdraw(120));
registry.add(new SavingsAccount("sav-1").deposit(1000).addInterest(2.5));
for (const account of registry.all()) account.endOfMonth();

for (const account of registry.all()) {
  console.log(account.id, account.currentBalance, account.history.join(" "));
}
// → chk-1 -75 +50 -120 -5
// → sav-1 1025 +1000 +25
try {
  registry.get("sav-1")?.withdraw(5000);
} catch (error) {
  if (error instanceof Error) console.log(error.message); // → Insufficient funds
}
try {
  registry.add(new SavingsAccount("sav-1"));
} catch (error) {
  if (error instanceof Error) console.log(error.message); // → Duplicate id: sav-1
}
```

`monthlyFee` implementations don't need `override` because they implement an *abstract* member; `noImplicitOverride` only requires `override` when replacing a concrete parent method.

</details>

---

## 2.4 `keyof`, `typeof` and Indexed Access Types

**Goal:** Compute types from other types and from values with `keyof`, `typeof` and indexed access (`T[K]`), and use them to write functions that stay in sync with your data.

### Explanation

These three **type operators** let you derive new types instead of writing them by hand — so when the original changes, everything derived from it updates automatically.

**`keyof T`** is the union of the property names of `T`:

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

type UserKey = keyof User; // "id" | "name" | "email"

const key: UserKey = "email";
// @ts-expect-error -- Type '"age"' is not assignable to type 'keyof User'.
const bad: UserKey = "age";

console.log(key); // → email
```

For a type with an index signature, `keyof` gives the index type: `keyof { [k: string]: number }` is `string | number` (because JavaScript converts numeric keys to strings).

**`typeof value`** (in a *type* position) gives the type of a variable or property — it bridges from the world of values to the world of types. (In an expression, `typeof` is still JavaScript's runtime operator.)

```ts
const defaults = { theme: "light", fontSize: 14, showSidebar: true };

type Settings = typeof defaults;
//   ^? type Settings = { theme: string; fontSize: number; showSidebar: boolean; }

function createUser(name: string) {
  return { id: Math.floor(Math.random() * 1000), name, createdAt: new Date() };
}
type CreatedUser = ReturnType<typeof createUser>; // ReturnType is a utility type (2.5)
//   ^? type CreatedUser = { id: number; name: string; createdAt: Date; }

const s: Settings = { ...defaults, fontSize: 16 };
console.log(s.fontSize, typeof defaults); // → 16 object
```

**Indexed access types** `T[K]` look up the type of a property, like accessing a property on a value:

```ts
type Order = {
  id: number;
  customer: { name: string; address: { city: string } };
  items: { sku: string; qty: number }[];
  status: "open" | "shipped";
};

type Customer = Order["customer"];
type City = Order["customer"]["address"]["city"];
//   ^? type City = string
type Item = Order["items"][number]; // [number] = "type of any array element"
//   ^? type Item = { sku: string; qty: number; }
type IdOrStatus = Order["id" | "status"];
//   ^? type IdOrStatus = number | "open" | "shipped"

const item: Item = { sku: "pen", qty: 2 };
const who: Customer = { name: "Ana", address: { city: "Lisbon" } };
console.log(item.qty, who.address.city); // → 2 Lisbon
```

**Putting them together.** The combination `T[keyof T]` gives the union of all property *value* types, and `keyof typeof obj` gives the keys of a constant object (you used both in 1.8):

```ts
const ROLES = { admin: 3, editor: 2, viewer: 1 } as const;

type Role = keyof typeof ROLES;
//   ^? type Role = "admin" | "editor" | "viewer"
type Level = (typeof ROLES)[Role];
//   ^? type Level = 1 | 2 | 3

function canEdit(role: Role): boolean {
  return ROLES[role] >= ROLES.editor;
}
console.log(canEdit("viewer"), canEdit("admin")); // → false true
```

**Type-safe property updates.** A very common pattern is a function that takes a key *and* a value that must match that key's type:

```ts
interface Preferences {
  theme: "light" | "dark";
  fontSize: number;
  notifications: boolean;
}

function update<K extends keyof Preferences>(prefs: Preferences, key: K, value: Preferences[K]): Preferences {
  return { ...prefs, [key]: value };
}

let prefs: Preferences = { theme: "light", fontSize: 14, notifications: true };
prefs = update(prefs, "theme", "dark");
prefs = update(prefs, "fontSize", 18);
// @ts-expect-error -- Argument of type 'string' is not assignable to parameter of type 'number'.
update(prefs, "fontSize", "huge");

console.log(prefs); // → { theme: 'dark', fontSize: 18, notifications: true }
```

**A gotcha: `Object.keys` returns `string[]`.** Because of structural typing, an object typed `Preferences` might really have *extra* properties at run time, so TypeScript can't promise that `Object.keys(prefs)` only contains `keyof Preferences`. When you know the object has exactly its declared keys (e.g. you created it), you can assert, or iterate over a separate list of keys:

```ts
const sizes = { small: 10, medium: 14, large: 18 };

for (const key of Object.keys(sizes)) {
  // @ts-expect-error -- Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ small: number; medium: number; large: number; }'.
  console.log(sizes[key]);
}
// → 10
// → 14
// → 18

for (const [name, px] of Object.entries(sizes)) {
  console.log(`${name}=${px}`); // entries keeps value types: px is number
}
// → small=10
// → medium=14
// → large=18
```

### Practice task

Write `form.ts` for a sign-up form.

1. Start from a value: `const initialForm = { username: "", age: 18, newsletter: false, plan: "free" as "free" | "pro" };` and derive `type Form = typeof initialForm`.
2. Derive `type Field = keyof Form`.
3. Create `const labels: Record<Field, string>` with a human-readable label for every field (leaving one out must be a compile error).
4. Write `setField<K extends Field>(form: Form, field: K, value: Form[K]): Form` (immutable update).
5. Write `getField<K extends Field>(form: Form, field: K): Form[K]`.
6. Write `describeForm(form: Form): string[]` returning `"<Label>: <value>"` for every field, in the order of `labels`. Iterate over `Object.entries(labels)` and use `getField` (you will need to tell TypeScript that each key is a `Field` — do it with a small, justified assertion).

Then: set `username` to `"ana"`, `plan` to `"pro"`, `age` to `30`, and print each line of `describeForm`.

### Expected result

No type errors, and:

```text
Username: ana
Age: 30
Subscribe to newsletter: false
Plan: pro
```

`setField(form, "plan", "enterprise")` and `setField(form, "age", "30")` must be compile errors, and removing the `plan` entry from `labels` must be a compile error.

### Acceptance criteria

- [ ] `Form` and `Field` are derived with `typeof` and `keyof`; no hand-written duplicate field list.
- [ ] `labels` is typed so every field must have a label.
- [ ] `setField` uses `K extends Field` and `Form[K]` to tie the value type to the field.
- [ ] The only assertion is the key cast in `describeForm`, with a comment justifying it.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
const initialForm = { username: "", age: 18, newsletter: false, plan: "free" as "free" | "pro" };

type Form = typeof initialForm;
type Field = keyof Form;

const labels: Record<Field, string> = {
  username: "Username",
  age: "Age",
  newsletter: "Subscribe to newsletter",
  plan: "Plan",
};

function setField<K extends Field>(form: Form, field: K, value: Form[K]): Form {
  return { ...form, [field]: value };
}

function getField<K extends Field>(form: Form, field: K): Form[K] {
  return form[field];
}

function describeForm(form: Form): string[] {
  return Object.entries(labels).map(([field, label]) => {
    // Safe: labels is a constant object we created with exactly the keys of Form.
    const value = getField(form, field as Field);
    return `${label}: ${value}`;
  });
}

let form = initialForm;
form = setField(form, "username", "ana");
form = setField(form, "plan", "pro");
form = setField(form, "age", 30);

for (const line of describeForm(form)) {
  console.log(line);
}
// → Username: ana
// → Age: 30
// → Subscribe to newsletter: false
// → Plan: pro

// @ts-expect-error -- Argument of type '"enterprise"' is not assignable to parameter of type '"free" | "pro"'.
setField(form, "plan", "enterprise");
// @ts-expect-error -- Argument of type 'string' is not assignable to parameter of type 'number'.
setField(form, "age", "30");
```

</details>

---

## 2.5 Utility Types

**Goal:** Transform existing types with TypeScript's built-in utility types instead of duplicating them, and know which utility to reach for.

### Explanation

TypeScript ships with generic **utility types** that derive new types from existing ones. They are written in TypeScript itself using the features you'll learn in Level 3, but you can use them right away.

Throughout this topic:

```ts
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  bio?: string;
}

// Partial<T>: every property optional — e.g. for update payloads
type UserPatch = Partial<User>;
const patch: UserPatch = { bio: "Hello" };

// Required<T>: every property required
type CompleteUser = Required<User>;
// @ts-expect-error -- Property 'bio' is missing in type
const incomplete: CompleteUser = { id: 1, name: "A", email: "a@x.io", role: "viewer" };

// Readonly<T>: every property read-only
const frozen: Readonly<User> = { id: 1, name: "Ana", email: "ana@x.io", role: "admin" };
// @ts-expect-error -- Cannot assign to 'name' because it is a read-only property.
frozen.name = "Eve";

// Pick<T, Keys> and Omit<T, Keys>: keep or remove some properties
type UserPreview = Pick<User, "id" | "name">;
type NewUser = Omit<User, "id">; // e.g. data sent before the server assigns an id
const preview: UserPreview = { id: 1, name: "Ana" };
const draft: NewUser = { name: "Ben", email: "ben@x.io", role: "viewer" };

console.log(patch, preview.name, draft.role); // → { bio: 'Hello' } Ana viewer
```

**Record\<Keys, Value\>** builds an object type with the given keys, each holding `Value`. With a union of literal keys it is exhaustive; with `string` keys it is a dictionary:

```ts
type Role = "admin" | "editor" | "viewer";

const permissions: Record<Role, string[]> = {
  admin: ["read", "write", "delete"],
  editor: ["read", "write"],
  viewer: ["read"],
};

const wordCounts: Record<string, number> = {};
for (const word of "a rose is a rose".split(" ")) {
  wordCounts[word] = (wordCounts[word] ?? 0) + 1;
}
console.log(permissions.editor.length, wordCounts); // → 2 { a: 2, rose: 2, is: 1 }
```

**Union utilities** filter union members:

```ts
type Event = "click" | "keydown" | "keyup" | "scroll";

type KeyEvent = Extract<Event, `key${string}`>; // keep members assignable to the second type
//   ^? type KeyEvent = "keydown" | "keyup"
type NonKeyEvent = Exclude<Event, `key${string}`>; // remove them
//   ^? type NonKeyEvent = "click" | "scroll"
type Present = NonNullable<string | null | undefined>; // remove null and undefined
//   ^? type Present = string

const e: KeyEvent = "keyup";
console.log(e); // → keyup
```

**Function and class utilities** read types *out of* functions and classes, so you never have to repeat them:

```ts
function createSession(userId: number, ttlSeconds = 3600) {
  return { userId, token: `tok_${userId}`, expiresIn: ttlSeconds };
}

type Session = ReturnType<typeof createSession>;
//   ^? type Session = { userId: number; token: string; expiresIn: number; }
type SessionArgs = Parameters<typeof createSession>;
//   ^? type SessionArgs = [userId: number, ttlSeconds?: number | undefined]

async function loadUser(id: number) {
  return { id, name: "Ana" };
}
type LoadedUser = Awaited<ReturnType<typeof loadUser>>; // unwrap the Promise
//   ^? type LoadedUser = { id: number; name: string; }

class Logger {
  prefix: string;
  constructor(prefix: string) {
    this.prefix = prefix;
  }
}
type LoggerArgs = ConstructorParameters<typeof Logger>;
//   ^? type LoggerArgs = [prefix: string]
type LoggerInstance = InstanceType<typeof Logger>;
//   ^? type LoggerInstance = Logger

const args: SessionArgs = [7];
const session: Session = createSession(...args);
console.log(session.token); // → tok_7
```

**Composing utilities.** Utilities nest naturally. A common real-world set for a CRUD API:

```ts
interface Article {
  id: string;
  title: string;
  body: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

type ServerFields = "id" | "createdAt" | "updatedAt";
type CreateArticle = Omit<Article, ServerFields>;
type UpdateArticle = Partial<CreateArticle> & Pick<Article, "id">; // id required, rest optional
type ArticleSummary = Pick<Article, "id" | "title"> & { tagCount: number };

const update: UpdateArticle = { id: "a1", title: "New title" };
const summary: ArticleSummary = { id: "a1", title: "New title", tagCount: 0 };
console.log(update, summary.tagCount); // → { id: 'a1', title: 'New title' } 0
```

**Quick reference**

| Utility | Result |
|---|---|
| `Partial<T>` / `Required<T>` / `Readonly<T>` | all properties optional / required / read-only |
| `Pick<T, K>` / `Omit<T, K>` | only / all except the keys `K` |
| `Record<K, V>` | object with keys `K` and values `V` |
| `Exclude<U, X>` / `Extract<U, X>` | union members not assignable / assignable to `X` |
| `NonNullable<T>` | `T` without `null` and `undefined` |
| `ReturnType<F>` / `Parameters<F>` | a function's return type / parameter tuple |
| `Awaited<T>` | the value a promise resolves to (recursively) |
| `ConstructorParameters<C>` / `InstanceType<C>` | a class's constructor parameters / instance type |
| `NoInfer<T>` | blocks inference from a position (3.6) |
| `Uppercase<S>`, `Lowercase<S>`, `Capitalize<S>`, `Uncapitalize<S>` | string literal case transforms (3.3) |

`Omit` doesn't check that the keys you omit exist (`Omit<User, "nmae">` silently omits nothing). When that matters, write a stricter version — you'll be able to after 3.1.

### Practice task

Write `api-types.ts` for a blog API. Start from:

```ts
interface Post {
  id: number;
  title: string;
  body: string;
  status: "draft" | "published" | "archived";
  authorId: number;
  publishedAt: string | null;
}
```

Using only utility types and the `Post` interface, define:

1. `NewPost` — what a client sends to create a post: everything except `id`, `status` and `publishedAt`.
2. `PostUpdate` — `id` required, and any of `title`, `body`, `status` optional (other fields not allowed).
3. `PostCard` — `id` and `title` only.
4. `VisibleStatus` — the statuses except `"archived"`.
5. `PostsByStatus` — an object with a `Post[]` for every status.

Then implement:

- `createPost(input: NewPost, id: number): Post` (status `"draft"`, `publishedAt: null`);
- `applyUpdate(post: Post, update: PostUpdate): Post` — throw `Error("Id mismatch")` if the ids differ; if the status becomes `"published"` and `publishedAt` is `null`, set it to `"2026-10-27"`;
- `toCard(post: Post): PostCard`;
- `groupByStatus(posts: readonly Post[]): PostsByStatus`;
- `isVisible(status: Post["status"]): status is VisibleStatus`.

Also define `type CreatePostResult = ReturnType<typeof createPost>` and check by hovering that it is `Post`.

Run: create posts 1 ("Hello", body "First") and 2 ("Types", body "Second") by author 7; publish post 2 with an update; print `toCard` for both; print the number of posts per status as `draft=1 published=1 archived=0`; print `isVisible` for `"archived"`; and print the error from applying an update with `id: 99` to post 1.

### Expected result

No type errors, and:

```text
{ id: 1, title: 'Hello' }
{ id: 2, title: 'Types' }
draft=1 published=1 archived=0
2026-10-27
false
Id mismatch
```

(The fourth line is post 2's `publishedAt`.) Additionally, `applyUpdate(post, { id: 1, authorId: 3 })` must be a compile error.

### Acceptance criteria

- [ ] All five derived types are built from `Post` with utility types (`Omit`, `Partial`, `Pick`, `Exclude`, `Record`, intersections) and contain no hand-copied property lists.
- [ ] `PostsByStatus` requires every status key (`Record<Post["status"], Post[]>`).
- [ ] `isVisible` is a type guard returning `status is VisibleStatus`.
- [ ] Changing `Post` (e.g. adding a status) automatically updates the derived types.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
interface Post {
  id: number;
  title: string;
  body: string;
  status: "draft" | "published" | "archived";
  authorId: number;
  publishedAt: string | null;
}

type NewPost = Omit<Post, "id" | "status" | "publishedAt">;
type PostUpdate = Pick<Post, "id"> & Partial<Pick<Post, "title" | "body" | "status">>;
type PostCard = Pick<Post, "id" | "title">;
type VisibleStatus = Exclude<Post["status"], "archived">;
type PostsByStatus = Record<Post["status"], Post[]>;

function createPost(input: NewPost, id: number): Post {
  return { ...input, id, status: "draft", publishedAt: null };
}
type CreatePostResult = ReturnType<typeof createPost>;
//   ^? type CreatePostResult = Post

function applyUpdate(post: Post, update: PostUpdate): Post {
  if (update.id !== post.id) throw new Error("Id mismatch");
  const next: Post = { ...post, ...update };
  if (next.status === "published" && next.publishedAt === null) {
    next.publishedAt = "2026-10-27";
  }
  return next;
}

function toCard({ id, title }: Post): PostCard {
  return { id, title };
}

function groupByStatus(posts: readonly Post[]): PostsByStatus {
  const groups: PostsByStatus = { draft: [], published: [], archived: [] };
  for (const post of posts) groups[post.status].push(post);
  return groups;
}

function isVisible(status: Post["status"]): status is VisibleStatus {
  return status !== "archived";
}

const first = createPost({ title: "Hello", body: "First", authorId: 7 }, 1);
const second = applyUpdate(createPost({ title: "Types", body: "Second", authorId: 7 }, 2), { id: 2, status: "published" });

console.log(toCard(first));  // → { id: 1, title: 'Hello' }
console.log(toCard(second)); // → { id: 2, title: 'Types' }
const groups = groupByStatus([first, second]);
console.log(Object.entries(groups).map(([status, list]) => `${status}=${list.length}`).join(" ")); // → draft=1 published=1 archived=0
console.log(second.publishedAt); // → 2026-10-27
console.log(isVisible("archived")); // → false
try {
  applyUpdate(first, { id: 99 });
} catch (error) {
  if (error instanceof Error) console.log(error.message); // → Id mismatch
}

// @ts-expect-error -- Object literal may only specify known properties
applyUpdate(first, { id: 1, authorId: 3 });
```

</details>

---
## 2.6 Typing Asynchronous Code

**Goal:** Type promises and `async` functions, combine concurrent operations without losing type information, and treat data from outside your program as `unknown` until it is validated.

### Explanation

**`Promise<T>`** is the type of a promise that fulfils with a `T`. An `async` function always returns a promise, so its declared return type must be `Promise<...>`:

```ts
interface User {
  id: number;
  name: string;
}

async function loadUser(id: number): Promise<User> {
  return { id, name: id === 1 ? "Ana" : "Ben" }; // returning a User fulfils the Promise<User>
}

const pending = loadUser(1);
//    ^? const pending: Promise<User>
const user = await pending; // top-level await: allowed in ES modules
//    ^? const user: User

// @ts-expect-error -- Type 'string' is not assignable to type 'number'.
async function broken(): Promise<number> { return "1"; }

console.log(user.name); // → Ana
```

Forgetting `await` is a classic bug that TypeScript usually catches, because a `Promise<User>` doesn't have a `name`:

```ts
interface User {
  id: number;
  name: string;
}
async function loadUser(id: number): Promise<User> {
  return { id, name: "Ana" };
}

async function greet(): Promise<string> {
  const user = loadUser(1); // oops, no await
  // @ts-expect-error -- Property 'name' does not exist on type 'Promise<User>'.
  return `Hello, ${user.name}`;
}

console.log(await greet()); // → Hello, undefined
```

**Creating promises.** `new Promise<T>(...)` needs the type argument when TypeScript can't infer it from `resolve` calls:

```ts
function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const answer = await delay(10, 42);
//    ^? const answer: number
await sleep(5);
console.log(answer); // → 42
```

**Concurrency keeps precise types.** `Promise.all` with an array literal returns a *tuple* of the individual result types; `Promise.allSettled` returns `PromiseSettledResult<T>` objects that you narrow on `status`:

```ts
const delay = <T>(ms: number, value: T) => new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));

const [count, names, ok] = await Promise.all([delay(10, 3), delay(5, ["a", "b"]), delay(1, true)]);
//            ^? const names: string[]
console.log(count, names, ok); // → 3 [ 'a', 'b' ] true

const results = await Promise.allSettled([delay(5, "fast"), Promise.reject(new Error("boom"))]);
for (const result of results) {
  if (result.status === "fulfilled") {
    console.log("value:", result.value);
  } else {
    console.log("reason:", result.reason instanceof Error ? result.reason.message : result.reason);
  }
}
// → value: fast
// → reason: boom
```

Rejection reasons are typed `any` (anything can be thrown), so check them with `instanceof` as above.

**Data from outside is `unknown`.** `fetch`'s `response.json()` and `JSON.parse` are typed as returning `any`, which silently turns off checking for everything derived from them. Assign them to `unknown` and validate before use — the type system can't know what a server actually sent:

```ts
interface Todo {
  id: number;
  title: string;
  done: boolean;
}

function isTodo(value: unknown): value is Todo {
  return (
    typeof value === "object" && value !== null &&
    "id" in value && typeof value.id === "number" &&
    "title" in value && typeof value.title === "string" &&
    "done" in value && typeof value.done === "boolean"
  );
}

async function parseTodos(json: string): Promise<Todo[]> {
  const data: unknown = JSON.parse(json); // pretend this came from response.json()
  if (!Array.isArray(data) || !data.every(isTodo)) {
    throw new TypeError("Unexpected response shape");
  }
  return data; // narrowed to Todo[] by the checks
}

console.log((await parseTodos('[{"id":1,"title":"Learn TS","done":false}]'))[0]?.title); // → Learn TS
await parseTodos('[{"id":"1"}]').catch((error: unknown) => {
  if (error instanceof Error) console.log(error.message); // → Unexpected response shape
});
```

(`"id" in value` narrows `value` to an object known to have an `id` property, so `value.id` can then be checked — TypeScript 4.9+.)

**A typed fetch helper.** A generic helper that takes a validation function keeps every call site type-safe:

```ts
async function getJson<T>(url: string, isT: (data: unknown) => data is T): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data: unknown = await response.json();
  if (!isT(data)) throw new TypeError(`Unexpected response from ${url}`);
  return data;
}

const todo = await getJson("https://jsonplaceholder.typicode.com/todos/1", isTodo); // Todo
```

Writing guards by hand is tedious for large shapes; 3.8 shows how schema libraries derive both the validator and the type from one definition.

**Async iteration** is typed with `AsyncGenerator<T>` (or `AsyncIterable<T>`):

```ts
async function* countdown(from: number): AsyncGenerator<number> {
  for (let i = from; i > 0; i--) {
    await new Promise((resolve) => setTimeout(resolve, 5));
    yield i;
  }
}

const seen: number[] = [];
for await (const n of countdown(3)) seen.push(n);
console.log(seen); // → [ 3, 2, 1 ]
```

**Floating promises.** Calling an async function without `await`, `.then` or `.catch` loses its errors. TypeScript doesn't flag this by itself; the linter rule `@typescript-eslint/no-floating-promises` does, and is worth enabling.

### Practice task

Write `dashboard.ts`. You are given a fake server that returns `unknown` data after a delay:

```ts
const db: Record<string, unknown> = {
  "/users/1": { id: 1, name: "Ana", email: "ana@example.com" },
  "/users/2": { id: 2, name: "Ben" },
  "/users/1/posts": [{ id: 10, title: "Hello" }, { id: 11, title: "Types" }],
  "/broken": { id: "x" },
};

function fakeFetch(path: string, ms = 10): Promise<unknown> {
  return new Promise((resolve, reject) => {
    setTimeout(() => (path in db ? resolve(db[path]) : reject(new Error(`404 ${path}`))), ms);
  });
}
```

1. Define `interface User { id: number; name: string; email?: string }` and `interface Post { id: number; title: string }`, plus guards `isUser` and `isPostList`.
2. Write `getJson<T>(path: string, guard: (data: unknown) => data is T): Promise<T>` that rejects with `TypeError("Invalid data at <path>")` when the guard fails.
3. Write `withTimeout<T>(promise: Promise<T>, ms: number): Promise<T>` that rejects with `Error("Timeout after <ms>ms")`.
4. Write `async function loadDashboard(userId: number): Promise<{ user: User; posts: Post[] }>` that loads the user and their posts **in parallel**.
5. Write `async function loadMany(ids: number[]): Promise<string[]>` that loads several users with `Promise.allSettled` and returns, for each id in order, the user's name or `"error: <message>"`.

In `main`, print: the user's name and post titles from `loadDashboard(1)`; the result of `loadMany([1, 3, 2])`; the error message from `getJson("/broken", isUser)`; and the error message from `withTimeout(fakeFetch("/users/1", 100), 20)`.

### Expected result

No type errors, no `any`, and:

```text
Ana: Hello, Types
[ 'Ana', 'error: 404 /users/3', 'Ben' ]
Invalid data at /broken
Timeout after 20ms
```

### Acceptance criteria

- [ ] `fakeFetch` results are only used after passing a type guard.
- [ ] `getJson` and `withTimeout` are generic and return `Promise<T>`.
- [ ] `loadDashboard` uses `Promise.all` and destructures the typed tuple.
- [ ] `loadMany` narrows `PromiseSettledResult` on `status` and preserves input order.
- [ ] Every caught error is typed `unknown` and narrowed before use.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
const db: Record<string, unknown> = {
  "/users/1": { id: 1, name: "Ana", email: "ana@example.com" },
  "/users/2": { id: 2, name: "Ben" },
  "/users/1/posts": [{ id: 10, title: "Hello" }, { id: 11, title: "Types" }],
  "/broken": { id: "x" },
};

function fakeFetch(path: string, ms = 10): Promise<unknown> {
  return new Promise((resolve, reject) => {
    setTimeout(() => (path in db ? resolve(db[path]) : reject(new Error(`404 ${path}`))), ms);
  });
}

interface User {
  id: number;
  name: string;
  email?: string;
}
interface Post {
  id: number;
  title: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isUser(value: unknown): value is User {
  return (
    isRecord(value) &&
    typeof value.id === "number" &&
    typeof value.name === "string" &&
    (value.email === undefined || typeof value.email === "string")
  );
}

function isPost(value: unknown): value is Post {
  return isRecord(value) && typeof value.id === "number" && typeof value.title === "string";
}

function isPostList(value: unknown): value is Post[] {
  return Array.isArray(value) && value.every(isPost);
}

async function getJson<T>(path: string, guard: (data: unknown) => data is T): Promise<T> {
  const data = await fakeFetch(path);
  if (!guard(data)) throw new TypeError(`Invalid data at ${path}`);
  return data;
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]);
}

async function loadDashboard(userId: number): Promise<{ user: User; posts: Post[] }> {
  const [user, posts] = await Promise.all([
    getJson(`/users/${userId}`, isUser),
    getJson(`/users/${userId}/posts`, isPostList),
  ]);
  return { user, posts };
}

async function loadMany(ids: number[]): Promise<string[]> {
  const results = await Promise.allSettled(ids.map((id) => getJson(`/users/${id}`, isUser)));
  return results.map((r) =>
    r.status === "fulfilled" ? r.value.name : `error: ${r.reason instanceof Error ? r.reason.message : String(r.reason)}`
  );
}

function message(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

async function main(): Promise<void> {
  const { user, posts } = await loadDashboard(1);
  console.log(`${user.name}: ${posts.map((p) => p.title).join(", ")}`); // → Ana: Hello, Types
  console.log(await loadMany([1, 3, 2])); // → [ 'Ana', 'error: 404 /users/3', 'Ben' ]

  try {
    await getJson("/broken", isUser);
  } catch (error) {
    console.log(message(error)); // → Invalid data at /broken
  }
  try {
    await withTimeout(fakeFetch("/users/1", 100), 20);
  } catch (error) {
    console.log(message(error)); // → Timeout after 20ms
  }
}

await main();
```

`new Promise<never>` types the timeout promise as one that never fulfils, so `Promise.race([promise, timeout])` keeps the type `Promise<T>`.

</details>

---

## 2.7 Error Handling with Types

**Goal:** Handle `unknown` errors safely, design typed custom errors, and use discriminated-union result types to make failure cases visible in function signatures.

### Explanation

**Caught values are `unknown`.** JavaScript can `throw` anything — strings, numbers, objects — so with `strict` (which includes `useUnknownInCatchVariables`), the variable in `catch` has type `unknown`:

```ts
try {
  JSON.parse("{ invalid");
} catch (error) {
  error;
//^? var error: unknown

  // @ts-expect-error -- 'error' is of type 'unknown'.
  console.log(error.message);

  if (error instanceof SyntaxError) {
    console.log("bad JSON:", error.name); // → bad JSON: SyntaxError
  }
}
```

(The line with the error still runs — and prints the real message — because the value happens to be an `Error`. If something else had been thrown, it would have printed `undefined` or crashed. That uncertainty is exactly what `unknown` makes you handle.)

A small helper covers the common "I just need a message" case:

```ts
function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return JSON.stringify(error) ?? String(error);
}

for (const thrown of [new RangeError("out of range"), "plain string", { code: 42 }, undefined]) {
  try {
    throw thrown;
  } catch (error) {
    console.log(errorMessage(error));
  }
}
// → out of range
// → plain string
// → {"code":42}
// → undefined
```

**Typed custom errors.** Subclass `Error` to carry structured information, and narrow with `instanceof`:

```ts
class HttpError extends Error {
  override name = "HttpError";
  readonly status: number;
  constructor(status: number, message: string, options?: ErrorOptions) {
    super(message, options);
    this.status = status;
  }
  get isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }
}

class ValidationError extends Error {
  override name = "ValidationError";
  readonly fields: Record<string, string>;
  constructor(fields: Record<string, string>) {
    super(`Invalid fields: ${Object.keys(fields).join(", ")}`);
    this.fields = fields;
  }
}

function handle(error: unknown): string {
  if (error instanceof ValidationError) return `fix ${Object.keys(error.fields).length} field(s)`;
  if (error instanceof HttpError) return error.isClientError ? `client error ${error.status}` : "server error";
  return "unexpected";
}

console.log(handle(new ValidationError({ email: "required", age: "too low" }))); // → fix 2 field(s)
console.log(handle(new HttpError(404, "Not found")));                             // → client error 404
console.log(handle(new HttpError(503, "Unavailable", { cause: new Error("db down") }))); // → server error
console.log(handle("?"));                                                         // → unexpected
```

`ErrorOptions` is the built-in type for the `{ cause }` options object. `override name = ...` replaces the inherited `name` property.

**What signatures don't say.** A function's type says nothing about what it throws: `parseConfig(text: string): Config` might throw for many reasons, and callers can forget to catch. When failure is an *expected* outcome — invalid user input, "not found", a business rule — consider returning it instead, as a **result type**:

```ts
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

const ok = <T>(value: T): Result<T, never> => ({ ok: true, value });
const err = <E>(error: E): Result<never, E> => ({ ok: false, error });

type AgeError =
  | { kind: "not-a-number"; input: string }
  | { kind: "out-of-range"; value: number };

function parseAge(input: string): Result<number, AgeError> {
  const value = Number(input);
  if (input.trim() === "" || Number.isNaN(value)) return err({ kind: "not-a-number", input });
  if (value < 0 || value > 150) return err({ kind: "out-of-range", value });
  return ok(value);
}

function explain(error: AgeError): string {
  switch (error.kind) {
    case "not-a-number":
      return `"${error.input}" is not a number`;
    case "out-of-range":
      return `${error.value} is not a plausible age`;
  }
}

for (const input of ["42", "abc", "200"]) {
  const result = parseAge(input);
  console.log(result.ok ? `age ${result.value}` : explain(result.error));
}
// → age 42
// → "abc" is not a number
// → 200 is not a plausible age
```

The signature now *documents* every way the function can fail, the caller must check `ok` before touching `value`, and adding a new error kind produces compile errors wherever errors are explained.

**Guidelines**

- Throw for **bugs and unexpected failures** (broken invariants, programming errors, unavailable infrastructure). Let them propagate to a top-level handler.
- Return a result type for **expected, recoverable outcomes** the caller should handle.
- Never `throw` non-`Error` values; only `Error` objects have stack traces.
- Narrow caught errors before using them; rethrow what you can't handle.

### Practice task

Write `config.ts` that parses `KEY=VALUE` configuration text into a typed config **without throwing**.

1. `interface Config { port: number; host: string; debug: boolean }`.
2. `type ConfigError = { kind: "syntax"; line: number; text: string } | { kind: "missing"; key: keyof Config } | { kind: "invalid"; key: keyof Config; value: string }`.
3. `type Result<T, E>` with `ok`/`err` helpers as above.
4. `parseConfig(text: string): Result<Config, ConfigError[]>` that:
    - ignores blank lines and lines starting with `#`;
    - reports a `syntax` error (with 1-based line number) for lines without `=`;
    - requires `PORT` (integer 1–65535), `HOST` (non-empty) and `DEBUG` (`true` or `false`), reporting `missing` or `invalid` errors;
    - collects **all** errors instead of stopping at the first.
5. `formatError(error: ConfigError): string` with an exhaustive `switch`.
6. `tryCatch<T>(fn: () => T): Result<T, Error>` that converts thrown values into an `Error` result (wrap non-`Error` values with `new Error(String(value))`).

Print the outcome for the two texts below (each error on its own line), then use `tryCatch` to print `ok` or the message for `() => JSON.parse("[1,2]")` and `() => JSON.parse("{")` (print only `error: SyntaxError` for the latter, using `error.name`).

```ts
const good = `# server
PORT=8080
HOST=localhost
DEBUG=false`;

const bad = `PORT=99999
HOST=
oops
DEBUG=maybe`;
```

### Expected result

No type errors, no `throw` in `parseConfig`, and:

```text
OK localhost:8080 debug=false
line 3: cannot parse "oops"
PORT: invalid value "99999"
HOST: invalid value ""
DEBUG: invalid value "maybe"
ok [ 1, 2 ]
error: SyntaxError
```

(For the bad text, syntax errors come first, then key errors in the order `PORT`, `HOST`, `DEBUG`.)

### Acceptance criteria

- [ ] `parseConfig`'s return type lists every failure mode; it never throws.
- [ ] `ConfigError` is a discriminated union and `formatError` is exhaustive.
- [ ] `keyof Config` is used for the error keys, so a typo in a key name is a compile error.
- [ ] `tryCatch` handles non-`Error` thrown values.
- [ ] Callers can only reach `.value` after checking `ok`.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
interface Config {
  port: number;
  host: string;
  debug: boolean;
}

type ConfigError =
  | { kind: "syntax"; line: number; text: string }
  | { kind: "missing"; key: keyof Config }
  | { kind: "invalid"; key: keyof Config; value: string };

type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };
const ok = <T>(value: T): Result<T, never> => ({ ok: true, value });
const err = <E>(error: E): Result<never, E> => ({ ok: false, error });

function parseConfig(text: string): Result<Config, ConfigError[]> {
  const errors: ConfigError[] = [];
  const raw = new Map<string, string>();

  text.split("\n").forEach((rawLine, index) => {
    const line = rawLine.trim();
    if (line === "" || line.startsWith("#")) return;
    const eq = line.indexOf("=");
    if (eq === -1) {
      errors.push({ kind: "syntax", line: index + 1, text: line });
      return;
    }
    raw.set(line.slice(0, eq).trim().toUpperCase(), line.slice(eq + 1).trim());
  });

  const portText = raw.get("PORT");
  const port = Number(portText);
  if (portText === undefined) errors.push({ kind: "missing", key: "port" });
  else if (!Number.isInteger(port) || port < 1 || port > 65535) errors.push({ kind: "invalid", key: "port", value: portText });

  const host = raw.get("HOST");
  if (host === undefined) errors.push({ kind: "missing", key: "host" });
  else if (host === "") errors.push({ kind: "invalid", key: "host", value: host });

  const debugText = raw.get("DEBUG");
  if (debugText === undefined) errors.push({ kind: "missing", key: "debug" });
  else if (debugText !== "true" && debugText !== "false") errors.push({ kind: "invalid", key: "debug", value: debugText });

  if (errors.length > 0 || host === undefined) return err(errors);
  return ok({ port, host, debug: debugText === "true" });
}

function formatError(error: ConfigError): string {
  switch (error.kind) {
    case "syntax":
      return `line ${error.line}: cannot parse "${error.text}"`;
    case "missing":
      return `${error.key.toUpperCase()}: missing`;
    case "invalid":
      return `${error.key.toUpperCase()}: invalid value "${error.value}"`;
  }
}

function tryCatch<T>(fn: () => T): Result<T, Error> {
  try {
    return ok(fn());
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}

const good = `# server
PORT=8080
HOST=localhost
DEBUG=false`;

const bad = `PORT=99999
HOST=
oops
DEBUG=maybe`;

for (const text of [good, bad]) {
  const result = parseConfig(text);
  if (result.ok) {
    const { host, port, debug } = result.value;
    console.log(`OK ${host}:${port} debug=${debug}`);
  } else {
    for (const error of result.error) console.log(formatError(error));
  }
}

for (const fn of [() => JSON.parse("[1,2]") as unknown, () => JSON.parse("{") as unknown]) {
  const result = tryCatch(fn);
  if (result.ok) console.log("ok", result.value);
  else console.log(`error: ${result.error.name}`);
}
```

`host === undefined` in the final check is redundant at run time (a missing host already produced an error) but lets TypeScript know `host` is a `string` when building the `Config`.

</details>

---

## 2.8 Modules and Declaration Files

**Goal:** Organise TypeScript code into ES modules, import and export types correctly, describe JavaScript code with declaration files, and extend existing types through global and module augmentation.

### Explanation

**Modules work exactly as in JavaScript**, with the addition that you can export and import types. With the recommended setup (Node.js, `"type": "module"`), relative imports include the real `.ts` extension:

```ts
// file: geometry.ts
export interface Point {
  x: number;
  y: number;
}

export type Shape = { kind: "circle"; center: Point; radius: number } | { kind: "polygon"; points: Point[] };

export const ORIGIN: Point = { x: 0, y: 0 };

export function distance(a: Point, b: Point): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}
```

```ts
// file: main.ts
import { ORIGIN, distance } from "./geometry.ts";
import type { Point, Shape } from "./geometry.ts"; // type-only import: erased completely

const p: Point = { x: 3, y: 4 };
const shapes: Shape[] = [{ kind: "circle", center: p, radius: 1 }];

console.log(distance(ORIGIN, p), shapes.length); // → 5 1
```

**Type-only imports and exports.** `import type { X }` (or the inline form `import { type X, y }`) says "this import is only used as a type", so it is removed when types are stripped. With `verbatimModuleSyntax` (recommended config), TypeScript *requires* this for type-only imports, because a type-stripping runtime simply deletes `import type` lines and keeps all others: writing `import { Point } from "./geometry.ts"` would leave an import of a name that doesn't exist at run time. The error you get is *"'Point' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled."* Similarly, re-export types with `export type { Point } from "./geometry.ts"`.

**Import paths and bundlers.** The `.ts` extension in imports is what Node.js needs to find the file. If you use a bundler (Vite, esbuild, webpack), set `"moduleResolution": "bundler"` instead, and extensions become optional. If you compile with `tsc`, `rewriteRelativeImportExtensions` turns `.ts` into `.js` in the output (1.1).

**Declaration files (`.d.ts`)** contain only types — no implementations. They describe code written in JavaScript (or compiled from TypeScript) so that TypeScript users get type checking and autocompletion. When you import `./stats.js`, TypeScript looks for a `./stats.d.ts` next to it:

```js
// file: stats.js
// Plain JavaScript — perhaps legacy code, or a library without types.
export function mean(values) {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function describe(values, options = {}) {
  const digits = options.digits ?? 2;
  return `n=${values.length} mean=${mean(values).toFixed(digits)}`;
}

export const VERSION = "1.4.0";
```

```ts
// file: stats.d.ts
export declare function mean(values: readonly number[]): number;

export interface DescribeOptions {
  /** Number of decimal places (default 2). */
  digits?: number;
}
export declare function describe(values: readonly number[], options?: DescribeOptions): string;

export declare const VERSION: string;
```

```ts
// file: main.ts
import { describe, mean, VERSION } from "./stats.js"; // types come from stats.d.ts

console.log(mean([1, 2, 3, 4])); // → 2.5
console.log(describe([1, 2, 4], { digits: 1 })); // → n=3 mean=2.3
console.log(`stats v${VERSION}`); // → stats v1.4.0
// @ts-expect-error -- Argument of type 'string' is not assignable to parameter of type 'readonly number[]'.
const wrongCall = () => mean("123"); // never called: it would crash at run time
```

The keyword `declare` means "this exists at run time, defined elsewhere; here is its type". Doc comments (`/** ... */`) in declaration files appear in editor tooltips.

**Where types for libraries come from**

1. Many npm packages ship their own `.d.ts` files (TypeScript finds them via the package's `types`/`exports` fields).
2. For packages without types, the community maintains **DefinitelyTyped**: install `@types/<package>` (for example `@types/node`, which you already use).
3. Otherwise, write a declaration yourself. The quickest escape hatch, `declare module "untyped-lib";` in a `.d.ts` file, types the whole module as `any` — better than nothing, but write real declarations for the parts you use.

Note that since TypeScript 6, the `types` compiler option defaults to `[]`, so global type packages such as `@types/node` must be listed explicitly (as in the recommended config); packages you `import` are still found automatically.

**Generating declarations.** When you publish a TypeScript library, compile with `"declaration": true` to emit `.d.ts` files alongside the JavaScript. The `isolatedDeclarations` option requires explicit types on exports so declarations can be generated quickly by other tools, file by file.

**Global augmentation.** Inside a module, `declare global { ... }` adds to the global scope. A common real-world use is typing environment variables, which `@types/node` declares as an open interface you can extend (interfaces merge, 1.7):

```ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_MODE?: "development" | "production";
      PORT?: string;
    }
  }
  var appStartedAt: Date; // a global variable (must be declared with var)
}

globalThis.appStartedAt = new Date(Date.UTC(2026, 9, 27));

const mode = process.env.APP_MODE ?? "development";
//    ^? const mode: "development" | "production"

console.log(appStartedAt.getUTCFullYear(), mode); // → 2026 development

// @ts-expect-error -- Type '"staging"' is not assignable to type '"development" | "production" | undefined'.
process.env.APP_MODE = "staging";
```

The `namespace` keyword inside `declare global` is fine: it is a pure type declaration (ambient), so it is erasable. Non-ambient namespaces containing code are not erasable; use modules instead.

**Module augmentation** adds to the types of an existing module (for example to add a property to a library's `Request` interface):

```ts
// in a .d.ts or .ts file
import "express";
declare module "express" {
  interface Request {
    user?: { id: string; roles: string[] };
  }
}
```

### Practice task

Build a small temperature library across four files.

1. `units.ts` — exports `type Unit = "C" | "F" | "K"`, `interface Reading { value: number; unit: Unit; at: string }`, and a function `convert(value: number, from: Unit, to: Unit): number`.
2. `legacy-format.js` — **plain JavaScript** (no types) exporting `formatNumber(value, digits)` that returns `value.toFixed(digits)` and a constant `DEGREE = "°"`.
3. `legacy-format.d.ts` — declarations for the JavaScript module, with a doc comment on `formatNumber`.
4. `main.ts` — imports values from `units.ts` and `legacy-format.js`, imports `Unit` and `Reading` **as types**, declares a global `APP_NAME: string` with `declare global` and sets it, and prints:
    - `APP_NAME`;
    - each of these readings converted to Celsius and formatted with one decimal and the degree sign, e.g. `21.5°C @ 2026-10-27T08:00`:
      `{ value: 70.7, unit: "F", at: "2026-10-27T08:00" }`, `{ value: 295.15, unit: "K", at: "2026-10-27T09:00" }`, `{ value: 19, unit: "C", at: "2026-10-27T10:00" }`;
    - `convert(100, "C", "F")`.

### Expected result

`npx tsc` passes (it checks the `.js` file's usage through the `.d.ts`), `node main.ts` runs, and prints:

```text
Weather Station
21.5°C @ 2026-10-27T08:00
22.0°C @ 2026-10-27T09:00
19.0°C @ 2026-10-27T10:00
212
```

### Acceptance criteria

- [ ] `main.ts` uses `import type` (or inline `type`) for `Unit` and `Reading`, and the file works with `verbatimModuleSyntax`.
- [ ] `legacy-format.js` contains no TypeScript syntax; its types live in `legacy-format.d.ts` using `declare`.
- [ ] Calling `formatNumber("1", 2)` from `main.ts` would be a type error.
- [ ] The global is declared with `declare global` and used without errors.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
// file: units.ts
export type Unit = "C" | "F" | "K";

export interface Reading {
  value: number;
  unit: Unit;
  at: string;
}

function toCelsius(value: number, unit: Unit): number {
  switch (unit) {
    case "C":
      return value;
    case "F":
      return ((value - 32) * 5) / 9;
    case "K":
      return value - 273.15;
  }
}

function fromCelsius(value: number, unit: Unit): number {
  switch (unit) {
    case "C":
      return value;
    case "F":
      return (value * 9) / 5 + 32;
    case "K":
      return value + 273.15;
  }
}

export function convert(value: number, from: Unit, to: Unit): number {
  return fromCelsius(toCelsius(value, from), to);
}
```

```js
// file: legacy-format.js
export function formatNumber(value, digits) {
  return value.toFixed(digits);
}

export const DEGREE = "°";
```

```ts
// file: legacy-format.d.ts
/** Formats a number with a fixed number of decimal places. */
export declare function formatNumber(value: number, digits: number): string;
export declare const DEGREE: string;
```

```ts
// file: main.ts
import { convert } from "./units.ts";
import type { Reading, Unit } from "./units.ts";
import { DEGREE, formatNumber } from "./legacy-format.js";

declare global {
  var APP_NAME: string;
}
globalThis.APP_NAME = "Weather Station";

const readings: Reading[] = [
  { value: 70.7, unit: "F", at: "2026-10-27T08:00" },
  { value: 295.15, unit: "K", at: "2026-10-27T09:00" },
  { value: 19, unit: "C", at: "2026-10-27T10:00" },
];

const target: Unit = "C";

console.log(APP_NAME); // → Weather Station
for (const r of readings) {
  console.log(`${formatNumber(convert(r.value, r.unit, target), 1)}${DEGREE}${target} @ ${r.at}`);
}
console.log(convert(100, "C", "F")); // → 212
```

</details>

---

## 2.9 TypeScript and the DOM

**Goal:** Use TypeScript's DOM types to query elements, handle `null`, type events and event targets, and build a small browser app compiled with `tsc`.

### Explanation

**Enabling DOM types.** The DOM API (`document`, `HTMLElement`, `MouseEvent`, …) is described by TypeScript's built-in `dom` library. Node.js projects don't include it; browser projects add it to `lib`. A minimal setup for compiling browser code with `tsc` is a separate config file, `tsconfig.browser.json`:

```json
{
  "compilerOptions": {
    "target": "es2025",
    "module": "esnext",
    "moduleResolution": "bundler",
    "lib": ["es2025", "dom"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "skipLibCheck": true
  },
  "include": ["main.ts"]
}
```

Run `npx tsc -p tsconfig.browser.json` to produce `main.js` next to `main.ts`, and load it from your HTML with `<script type="module" src="./main.js"></script>`. Serve the folder over HTTP (for example `npx serve .`), because browsers don't load modules from `file://` pages. In real projects a tool such as **Vite** compiles TypeScript on the fly and is the usual choice.

**Querying elements returns a union with `null`**, because the element might not exist. The return type depends on what TypeScript can tell from the argument:

```html
<!-- file: index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>DOM types</title>
  </head>
  <body>
    <h1 id="title">Hello</h1>
    <input id="name" value="Ada">
    <ul id="list"></ul>
    <button id="add">Add</button>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```

```ts
// file: main.ts
const heading = document.querySelector("h1"); // tag name: precise element type
//    ^? const heading: HTMLHeadingElement | null

const byId = document.getElementById("name"); // ids could be any element
//    ^? const byId: HTMLElement | null

const nameInput = document.querySelector<HTMLInputElement>("#name"); // you state the type (unchecked!)
//    ^? const nameInput: HTMLInputElement | null

// @ts-expect-error -- 'heading' is possibly 'null'.
heading.textContent = "TypeScript";

if (heading) heading.textContent = "Hello, TypeScript"; // narrowed

// A small helper that checks at run time and fails loudly if the page doesn't match the code:
function $<T extends Element>(selector: string, type: new () => T): T {
  const element = document.querySelector(selector);
  if (!(element instanceof type)) {
    throw new Error(`Expected ${type.name} for "${selector}"`);
  }
  return element;
}

const list = $("#list", HTMLUListElement);
const addButton = $("#add", HTMLButtonElement);
const input = $("#name", HTMLInputElement);

const item = document.createElement("li"); // createElement knows the tag type
//    ^? const item: HTMLLIElement
item.textContent = input.value;
list.append(item);

console.log(heading?.textContent, nameInput?.value, list.children.length); // → Hello, TypeScript Ada 1
console.log(addButton.disabled); // → false
```

The generic form `querySelector<HTMLInputElement>(...)` is only an assertion: TypeScript believes you, but nothing checks it. The `$` helper above checks with `instanceof` and gives an accurate type — a good habit for code that depends on specific elements existing.

**Events.** `addEventListener` is typed by event name: `"click"` gives a `MouseEvent`, `"keydown"` a `KeyboardEvent`, `"submit"` a `SubmitEvent`, `"input"` an `Event`. But `event.target` is typed `EventTarget | null` — it could be any node — so narrow it before using element-specific properties:

```html
<!-- file: index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Event types</title>
  </head>
  <body>
    <input id="search">
    <ul id="items"><li data-id="1"><button>Remove</button> One</li><li data-id="2"><button>Remove</button> Two</li></ul>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```

```ts
// file: main.ts
const search = document.querySelector<HTMLInputElement>("#search");
const items = document.querySelector<HTMLUListElement>("#items");
if (!search || !items) throw new Error("Missing elements");

search.addEventListener("keydown", (event) => {
  // event is KeyboardEvent, inferred from the event name
  if (event.key === "Escape") search.value = "";
});

search.addEventListener("input", (event) => {
  // @ts-expect-error -- 'event.target' is possibly 'null'.
  event.target.value;

  if (event.target instanceof HTMLInputElement) {
    console.log(`searching for "${event.target.value}"`);
  }
});

items.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const button = target.closest("button");
  const li = button?.closest("li");
  if (li) {
    console.log(`removing item ${li.dataset.id ?? "?"}`); // dataset values are string | undefined
    li.remove();
  }
});

// Simulate user actions so the console shows output:
search.value = "typescript";
search.dispatchEvent(new Event("input"));
items.querySelector("button")?.click();
console.log(items.children.length);
// → searching for "typescript"
// → removing item 1
// → 1
```

**Custom events** can be typed with `CustomEvent<Detail>`. To make `addEventListener("cart:add", …)` know the detail type, augment the event map interface (global augmentation from 2.8):

```ts
declare global {
  interface DocumentEventMap {
    "cart:add": CustomEvent<{ productId: number; quantity: number }>;
  }
}

document.addEventListener("cart:add", (event) => {
  console.log(event.detail.productId); // typed!
});
document.dispatchEvent(new CustomEvent("cart:add", { detail: { productId: 3, quantity: 1 } }));
```

**Forms.** Read values from the specific element types (`HTMLInputElement.value` is always a `string`; `valueAsNumber` is a number; `checked` is a boolean), or use `new FormData(form)`, whose `get()` returns `FormDataEntryValue | null` (a `string` or a `File`), which you narrow with `typeof`.

### Practice task

Build a typed **contact form** page (`index.html` + `main.ts`, compiled with `tsconfig.browser.json`).

The HTML (use exactly these ids and names) contains a `<form id="contact">` with an `<input name="name">`, an `<input name="email" type="email">`, an `<input name="age" type="number">`, a `<select name="topic">` with options `support`, `sales`, `other`, and a submit button; a `<ul id="errors"></ul>`; and a `<ul id="messages"></ul>`.

In `main.ts`:

1. Define `type Topic = "support" | "sales" | "other"` and `interface ContactMessage { name: string; email: string; age: number; topic: Topic }`.
2. Write the `$` helper from the explanation and use it to get the form and lists.
3. Write `readForm(form: HTMLFormElement): { name: string; email: string; age: string; topic: string }` using `FormData` (narrow each value to `string`, defaulting to `""`).
4. Write `validate(raw): Result<ContactMessage, string[]>` (a result type as in 2.7): name required; email must contain `@`; age must be an integer from 1 to 120; topic must be one of the topics (use a type guard).
5. On submit: prevent the default, clear `#errors`, and either list each error as an `<li>` in `#errors`, or append `"<name> <email> (<age>) — <topic>"` as an `<li>` to `#messages` and reset the form.

### Expected result

`npx tsc -p tsconfig.browser.json` reports no errors and produces `main.js`. In the browser:

1. Submitting the empty form shows three errors: `Name is required`, `Email is invalid`, `Age must be between 1 and 120` (the topic defaults to `support`, which is valid), and no message is added.
2. Filling in `Ana`, `ana@example.com`, `34`, topic `sales` and submitting clears the errors, adds the message `Ana ana@example.com (34) — sales`, and resets the form.
3. Entering age `200` (with valid name and email) shows only `Age must be between 1 and 120`.

### Acceptance criteria

- [ ] All element lookups go through the runtime-checked `$` helper or are null-checked; no `!` assertions.
- [ ] `FormData` values are narrowed with `typeof value === "string"`.
- [ ] `validate` returns a discriminated-union result; the topic is checked with a type guard, not an assertion.
- [ ] The submit handler's `event` parameter is inferred as `SubmitEvent` (no annotation needed).
- [ ] All three expected scenarios behave as described.

<details>
<summary>Reference solution</summary>

```html
<!-- file: index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Contact form</title>
    <style>
      #errors li { color: crimson; }
    </style>
  </head>
  <body>
    <form id="contact">
      <input name="name" placeholder="Name">
      <input name="email" type="email" placeholder="Email">
      <input name="age" type="number" placeholder="Age">
      <select name="topic">
        <option value="support">Support</option>
        <option value="sales">Sales</option>
        <option value="other">Other</option>
      </select>
      <button>Send</button>
    </form>
    <ul id="errors"></ul>
    <ul id="messages"></ul>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```

```ts
// file: main.ts
type Topic = "support" | "sales" | "other";

interface ContactMessage {
  name: string;
  email: string;
  age: number;
  topic: Topic;
}

type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };
type RawForm = { name: string; email: string; age: string; topic: string };

const TOPICS: readonly string[] = ["support", "sales", "other"] satisfies Topic[];

function isTopic(value: string): value is Topic {
  return TOPICS.includes(value);
}

function $<T extends Element>(selector: string, type: new () => T): T {
  const element = document.querySelector(selector);
  if (!(element instanceof type)) throw new Error(`Expected ${type.name} for "${selector}"`);
  return element;
}

function readForm(form: HTMLFormElement): RawForm {
  const data = new FormData(form);
  const text = (key: keyof RawForm): string => {
    const value = data.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  return { name: text("name"), email: text("email"), age: text("age"), topic: text("topic") };
}

function validate(raw: RawForm): Result<ContactMessage, string[]> {
  const errors: string[] = [];
  if (raw.name === "") errors.push("Name is required");
  if (!raw.email.includes("@")) errors.push("Email is invalid");
  const age = Number(raw.age);
  if (raw.age === "" || !Number.isInteger(age) || age < 1 || age > 120) {
    errors.push("Age must be between 1 and 120");
  }
  if (!isTopic(raw.topic)) errors.push("Topic is invalid");

  if (errors.length > 0 || !isTopic(raw.topic)) return { ok: false, error: errors };
  return { ok: true, value: { name: raw.name, email: raw.email, age, topic: raw.topic } };
}

const form = $("#contact", HTMLFormElement);
const errorList = $("#errors", HTMLUListElement);
const messageList = $("#messages", HTMLUListElement);

function listItem(text: string): HTMLLIElement {
  const li = document.createElement("li");
  li.textContent = text;
  return li;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  errorList.replaceChildren();

  const result = validate(readForm(form));
  if (!result.ok) {
    errorList.append(...result.error.map(listItem));
    return;
  }
  const { name, email, age, topic } = result.value;
  messageList.append(listItem(`${name} ${email} (${age}) — ${topic}`));
  form.reset();
});
```

</details>

---

## Intermediate Milestone Project: Type-Safe State Store

**Goal:** Combine discriminated unions, exhaustive checks, generics, utility types, `keyof`/indexed access types, classes or closures, and result types into a small Redux-style state management library.

### Task

Write `store.ts` containing a generic store and a to-do application built on it.

**The library**

1. `type Listener<S> = (state: S, previous: S) => void`.
2. `interface Store<S, A extends { type: string }> { getState(): S; dispatch(action: A): void; subscribe(listener: Listener<S>): () => void }`.
3. `function createStore<S, A extends { type: string }>(reducer: (state: S, action: A) => S, initial: S): Store<S, A>` — `dispatch` computes the new state and notifies listeners only if the state object changed (`!==`); `subscribe` returns an unsubscribe function.
4. A helper type `ActionOf<A extends { type: string }, T extends A["type"]> = Extract<A, { type: T }>`.

**The application**

5. `interface Todo { readonly id: number; readonly title: string; readonly done: boolean }`, `type Filter = "all" | "active" | "done"`, and `interface TodoState { readonly todos: readonly Todo[]; readonly filter: Filter; readonly nextId: number }`.
6. A discriminated union `TodoAction` with actions `"todo/added"` (`title`), `"todo/toggled"` (`id`), `"todo/removed"` (`id`), `"todo/cleared-done"` (no payload) and `"filter/changed"` (`filter`).
7. Action creators in an object `actions` whose return types are the precise action members (use `ActionOf`), e.g. `actions.add("x")` has type `ActionOf<TodoAction, "todo/added">`.
8. A pure, immutable `todoReducer(state, action)` with an exhaustive `switch` (`assertNever`). Adding a todo with a blank title returns the **same** state object (so no listeners fire).
9. A selector `visibleTodos(state: TodoState): readonly Todo[]` and `summary(state: TodoState): string` returning `"<active> active, <done> done (filter: <filter>)"`.

**Demo:** create the store, subscribe a listener that logs `summary(state)` after every change, then dispatch: add "Learn generics", add "Write tests", add "   " (ignored), toggle 1, change filter to `"active"`, then unsubscribe and dispatch remove 2. Finally print the titles of the visible todos (from the final state) and the full todo count.

### Expected result

No type errors, no `any`, and:

```text
1 active, 0 done (filter: all)
2 active, 0 done (filter: all)
1 active, 1 done (filter: all)
1 active, 1 done (filter: active)
visible: []
total: 1
```

The "remove 2" happens after unsubscribing, so it logs nothing; it removes "Write tests", the only active todo, so the active filter shows no titles, and one todo (the done one) remains.

### Acceptance criteria

- [ ] `createStore` is generic and knows nothing about to-dos.
- [ ] `dispatch` rejects actions that are not part of `TodoAction` (e.g. `{ type: "todo/renamed" }` is a compile error).
- [ ] The reducer never mutates state (all state types are `readonly`) and has an exhaustive `switch`.
- [ ] Action creators return precise action types via `ActionOf`.
- [ ] Blank titles don't produce a new state, so no listener runs.
- [ ] Unsubscribing stops notifications.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
// ---------- library ----------
type Listener<S> = (state: S, previous: S) => void;

interface Store<S, A extends { type: string }> {
  getState(): S;
  dispatch(action: A): void;
  subscribe(listener: Listener<S>): () => void;
}

type ActionOf<A extends { type: string }, T extends A["type"]> = Extract<A, { type: T }>;

function createStore<S, A extends { type: string }>(reducer: (state: S, action: A) => S, initial: S): Store<S, A> {
  let state = initial;
  const listeners = new Set<Listener<S>>();
  return {
    getState: () => state,
    dispatch(action) {
      const previous = state;
      state = reducer(state, action);
      if (state !== previous) {
        for (const listener of listeners) listener(state, previous);
      }
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

function assertNever(value: never): never {
  throw new Error(`Unhandled action: ${JSON.stringify(value)}`);
}

// ---------- application ----------
interface Todo {
  readonly id: number;
  readonly title: string;
  readonly done: boolean;
}
type Filter = "all" | "active" | "done";
interface TodoState {
  readonly todos: readonly Todo[];
  readonly filter: Filter;
  readonly nextId: number;
}

type TodoAction =
  | { type: "todo/added"; title: string }
  | { type: "todo/toggled"; id: number }
  | { type: "todo/removed"; id: number }
  | { type: "todo/cleared-done" }
  | { type: "filter/changed"; filter: Filter };

const actions = {
  add: (title: string): ActionOf<TodoAction, "todo/added"> => ({ type: "todo/added", title }),
  toggle: (id: number): ActionOf<TodoAction, "todo/toggled"> => ({ type: "todo/toggled", id }),
  remove: (id: number): ActionOf<TodoAction, "todo/removed"> => ({ type: "todo/removed", id }),
  clearDone: (): ActionOf<TodoAction, "todo/cleared-done"> => ({ type: "todo/cleared-done" }),
  setFilter: (filter: Filter): ActionOf<TodoAction, "filter/changed"> => ({ type: "filter/changed", filter }),
};

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "todo/added": {
      const title = action.title.trim();
      if (title === "") return state;
      return {
        ...state,
        todos: [...state.todos, { id: state.nextId, title, done: false }],
        nextId: state.nextId + 1,
      };
    }
    case "todo/toggled":
      return {
        ...state,
        todos: state.todos.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t)),
      };
    case "todo/removed":
      return { ...state, todos: state.todos.filter((t) => t.id !== action.id) };
    case "todo/cleared-done":
      return { ...state, todos: state.todos.filter((t) => !t.done) };
    case "filter/changed":
      return state.filter === action.filter ? state : { ...state, filter: action.filter };
    default:
      return assertNever(action);
  }
}

function visibleTodos(state: TodoState): readonly Todo[] {
  switch (state.filter) {
    case "all":
      return state.todos;
    case "active":
      return state.todos.filter((t) => !t.done);
    case "done":
      return state.todos.filter((t) => t.done);
  }
}

function summary(state: TodoState): string {
  const done = state.todos.filter((t) => t.done).length;
  return `${state.todos.length - done} active, ${done} done (filter: ${state.filter})`;
}

// ---------- demo ----------
const store = createStore(todoReducer, { todos: [], filter: "all", nextId: 1 });
const unsubscribe = store.subscribe((state) => console.log(summary(state)));

store.dispatch(actions.add("Learn generics"));
store.dispatch(actions.add("Write tests"));
store.dispatch(actions.add("   "));
store.dispatch(actions.toggle(1));
store.dispatch(actions.setFilter("active"));
unsubscribe();
store.dispatch(actions.remove(2));

const final = store.getState();
console.log("visible:", visibleTodos(final).map((t) => t.title));
console.log(`total: ${final.todos.length}`);

function invalidUsage(): void {
  // @ts-expect-error -- Type '"todo/renamed"' is not assignable to type
  store.dispatch({ type: "todo/renamed" });
}
```

</details>

---
# Level 3 — Advanced

This level treats the type system as a small programming language of its own: conditional types, mapped types, template literal types and recursion let you compute types from other types. It then covers type compatibility and variance, advanced inference, decorators and resource management, runtime validation, configuration at scale, and the evolution of TypeScript up to version 7. You should be comfortable with every Intermediate topic before starting.

---

## 3.1 Conditional Types and `infer`

**Goal:** Write conditional types, understand how they distribute over unions, extract types with `infer`, and test type-level code at compile time.

### Explanation

A **conditional type** chooses between two types based on an assignability test, like a ternary operator for types:

```ts
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">;
//   ^? type A = true
type B = IsString<42>;
//   ^? type B = false

// A practical one: what does an API call return for each resource?
type ResponseFor<R extends "user" | "users"> = R extends "user" ? { id: number } : { id: number }[];
type One = ResponseFor<"user">;
//   ^? type One = { id: number; }

const many: ResponseFor<"users"> = [{ id: 1 }, { id: 2 }];
console.log(many.length); // → 2
```

`T extends U ? X : Y` reads: "if `T` is assignable to `U`, then `X`, otherwise `Y`". Conditional types are mostly useful with generic parameters — that's how utility types like `NonNullable`, `ReturnType` and `Awaited` are built.

**Distribution over unions.** When the checked type is a *naked* type parameter and you pass a union, the conditional is applied to each member separately and the results are joined:

```ts
type ToArray<T> = T extends unknown ? T[] : never;
type Distributed = ToArray<string | number>;
//   ^? type Distributed = string[] | number[]

// Wrapping both sides in [ ] turns distribution off:
type ToArrayWhole<T> = [T] extends [unknown] ? T[] : never;
type Whole = ToArrayWhole<string | number>;
//   ^? type Whole = (string | number)[]

// Distribution + never filters unions. This is exactly how Exclude is defined:
type MyExclude<T, U> = T extends U ? never : T;
type Shapes = MyExclude<"circle" | "square" | "line", "line">;
//   ^? type Shapes = "circle" | "square"

const shapes: Shapes[] = ["circle", "square"];
console.log(shapes); // → [ 'circle', 'square' ]
```

`never` disappears from unions (`A | never` is `A`), so returning `never` from a distributed conditional removes that member.

**`infer`: extracting types.** Inside the `extends` clause, `infer X` declares a type variable that TypeScript fills in by matching — like destructuring for types:

```ts
type ElementType<T> = T extends readonly (infer E)[] ? E : never;
type E1 = ElementType<string[]>;
//   ^? type E1 = string

type MyReturnType<F> = F extends (...args: any[]) => infer R ? R : never;
type R1 = MyReturnType<(x: number) => boolean>;
//   ^? type R1 = boolean

type FirstParam<F> = F extends (first: infer P, ...rest: any[]) => any ? P : never;
type P1 = FirstParam<(id: string, verbose: boolean) => void>;
//   ^? type P1 = string

type Head<T extends readonly unknown[]> = T extends readonly [infer H, ...unknown[]] ? H : undefined;
type H1 = Head<[1, 2, 3]>;
//   ^? type H1 = 1
type H2 = Head<[]>;
//   ^? type H2 = undefined

// infer can be constrained: only match when the inferred type is a string
type NumericKeyToString<T> = T extends `${infer N extends number}` ? N : never;
type N1 = NumericKeyToString<"42">;
//   ^? type N1 = 42

console.log("type-level only"); // → type-level only
```

(`any` in `(...args: any[]) => ...` is idiomatic in constraints: it means "any function", and never leaks into results.)

**Recursive conditional types** can unwrap layers, like the built-in `Awaited`:

```ts
type UnwrapPromise<T> = T extends PromiseLike<infer V> ? UnwrapPromise<V> : T;
type Deep = UnwrapPromise<Promise<Promise<string[]>>>;
//   ^? type Deep = string[]

async function load(): Promise<Promise<number>> {
  return 7;
}
const value: UnwrapPromise<ReturnType<typeof load>> = await load();
console.log(value); // → 7
```

**Testing types.** Type-level code needs tests too. A common pair of helpers fails to compile when two types differ:

```ts
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false;
type Expect<T extends true> = T;

type ElementType<T> = T extends readonly (infer E)[] ? E : never;

type Tests = [
  Expect<Equal<ElementType<number[]>, number>>,
  Expect<Equal<ElementType<readonly ("a" | "b")[]>, "a" | "b">>,
  // @ts-expect-error -- Type 'false' does not satisfy the constraint 'true'.
  Expect<Equal<ElementType<string[]>, number>>,
];

console.log("type tests compiled"); // → type tests compiled
```

`Equal` is a well-known trick that compares types *exactly* (a plain `A extends B` check would treat `any` and many near-identical types as equal). Libraries such as `expect-type` and Vitest's `expectTypeOf` package the same idea.

**Conditional return types.** A function's return type can depend on its argument type:

```ts
function parse<T extends "number" | "boolean">(text: string, as: T): T extends "number" ? number : boolean {
  const result = as === "number" ? Number(text) : text === "true";
  return result as T extends "number" ? number : boolean; // TypeScript can't verify this branch-by-branch
}

const n = parse("42", "number");
//    ^? const n: number
const b = parse("true", "boolean");
//    ^? const b: boolean
console.log(n + 1, !b); // → 43 false
```

TypeScript can't check that the implementation returns the right branch, so an assertion is needed inside; overloads (1.5) are often the clearer alternative. Use conditional types mostly in *type definitions*, not in hand-written function bodies.

### Practice task

Write `type-tools.ts` containing type-level utilities and compile-time tests. Implement (without using the built-in equivalents):

1. `MyNonNullable<T>` — removes `null` and `undefined`.
2. `MyAwaited<T>` — unwraps nested promises.
3. `MyParameters<F>` — the parameter tuple of a function type.
4. `Last<T extends readonly unknown[]>` — the last element type of a tuple (`never` for `[]`).
5. `IsNever<T>` — `true` only for `never` (hint: distribution makes the naive version wrong; wrap in `[ ]`).
6. `If<C extends boolean, Then, Else>`.
7. `ArrayOf<T>` — distributes: `ArrayOf<string | number>` is `string[] | number[]`.
8. `PromiseValue<T>` — the value type of a promise, or `T` itself if it's not a promise (one level only).

Write a `Tests` tuple using `Equal`/`Expect` with at least two passing tests per utility, plus one `@ts-expect-error` test demonstrating a mismatch. Finally, write a runtime function `lastItem<T extends readonly unknown[]>(items: T): Last<T>` (an assertion inside is acceptable) and print `lastItem([1, "two", true] as const)` and `lastItem(["only"] as const)`.

### Expected result

`npx tsc` passes (every `Expect` holds; the `@ts-expect-error` test is a genuine failure), hovering `lastItem([1, "two", true] as const)` shows `true`, and the program prints:

```text
true
only
```

### Acceptance criteria

- [ ] No built-in utility types are used in the implementations.
- [ ] `IsNever<never>` is `true` and `IsNever<string>` is `false` (with tests).
- [ ] `MyAwaited<Promise<Promise<number>>>` is `number` (with a test).
- [ ] `ArrayOf` distributes; you can explain how to make it not distribute.
- [ ] There are at least 16 passing type tests and one intentional failing test under `@ts-expect-error`.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false;
type Expect<T extends true> = T;

type MyNonNullable<T> = T extends null | undefined ? never : T;
type MyAwaited<T> = T extends PromiseLike<infer V> ? MyAwaited<V> : T;
type MyParameters<F> = F extends (...args: infer P) => any ? P : never;
type Last<T extends readonly unknown[]> = T extends readonly [...unknown[], infer L] ? L : never;
type IsNever<T> = [T] extends [never] ? true : false;
type If<C extends boolean, Then, Else> = C extends true ? Then : Else;
type ArrayOf<T> = T extends unknown ? T[] : never;
type PromiseValue<T> = T extends Promise<infer V> ? V : T;

type Tests = [
  Expect<Equal<MyNonNullable<string | null | undefined>, string>>,
  Expect<Equal<MyNonNullable<null>, never>>,
  Expect<Equal<MyAwaited<Promise<Promise<number>>>, number>>,
  Expect<Equal<MyAwaited<boolean>, boolean>>,
  Expect<Equal<MyParameters<(a: string, b?: number) => void>, [a: string, b?: number]>>,
  Expect<Equal<MyParameters<() => void>, []>>,
  Expect<Equal<Last<[1, 2, 3]>, 3>>,
  Expect<Equal<Last<[]>, never>>,
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<string>, false>>,
  Expect<Equal<If<true, "yes", "no">, "yes">>,
  Expect<Equal<If<false, "yes", "no">, "no">>,
  Expect<Equal<ArrayOf<string | number>, string[] | number[]>>,
  Expect<Equal<ArrayOf<boolean>, false[] | true[]>>,
  Expect<Equal<PromiseValue<Promise<string>>, string>>,
  Expect<Equal<PromiseValue<Promise<Promise<1>>>, Promise<1>>>,
  Expect<Equal<PromiseValue<number>, number>>,
  // @ts-expect-error -- Type 'false' does not satisfy the constraint 'true'.
  Expect<Equal<ArrayOf<string | number>, (string | number)[]>>,
];

function lastItem<T extends readonly unknown[]>(items: T): Last<T> {
  return items[items.length - 1] as Last<T>;
}

const x = lastItem([1, "two", true] as const);
//    ^? const x: true
console.log(x);                             // → true
console.log(lastItem(["only"] as const));   // → only
```

`ArrayOf<boolean>` is `false[] | true[]` because `boolean` is itself the union `true | false`, and the conditional distributes over it.

</details>

---

## 3.2 Mapped Types and Key Remapping

**Goal:** Transform every property of a type with mapped types, add or remove `readonly` and `?` modifiers, rename and filter keys with `as`, and type the runtime functions that produce such objects.

### Explanation

A **mapped type** builds an object type by iterating over a union of keys — a `for...of` loop for types:

```ts
type Flags<Keys extends string> = { [K in Keys]: boolean };

type Features = Flags<"darkMode" | "beta" | "analytics">;
//   ^? type Features = { analytics: boolean; beta: boolean; darkMode: boolean; }

const features: Features = { darkMode: true, beta: false, analytics: true };
console.log(Object.values(features).filter(Boolean).length); // → 2
```

**Mapping over another type's keys** with `keyof T` is called a *homomorphic* mapped type. `T[K]` gives each property's original type, and the original `readonly`/optional modifiers are preserved:

```ts
interface User {
  readonly id: number;
  name: string;
  email?: string;
}

type Nullable<T> = { [K in keyof T]: T[K] | null };
type NullableUser = Nullable<User>;
//   ^? type NullableUser = { readonly id: number | null; name: string | null; email?: string | null | undefined; }

const anonymous: NullableUser = { id: null, name: null };
console.log(anonymous); // → { id: null, name: null }
```

**Modifiers.** Prefix `readonly` or `?` with `+` (add, the default) or `-` (remove). This is how `Partial`, `Required` and `Readonly` are implemented, and how you write their missing sibling, `Mutable`:

```ts
type MyPartial<T> = { [K in keyof T]?: T[K] };
type MyRequired<T> = { [K in keyof T]-?: T[K] };
type Mutable<T> = { -readonly [K in keyof T]: T[K] };

interface Settings {
  readonly theme: "light" | "dark";
  readonly fontSize?: number;
}

type EditableSettings = Mutable<MyRequired<Settings>>;
//   ^? type EditableSettings = { theme: "light" | "dark"; fontSize: number; }

const draft: EditableSettings = { theme: "light", fontSize: 14 };
draft.theme = "dark"; // allowed: readonly removed
console.log(draft); // → { theme: 'dark', fontSize: 14 }
```

**Key remapping with `as`.** The `as` clause renames keys; mapping a key to `never` removes it. Combined with template literal types (3.3) this generates whole APIs:

```ts
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type Person = { name: string; age: number };
type PersonGetters = Getters<Person>;
//   ^? type PersonGetters = { getAge: () => number; getName: () => string; }

// Filter keys by the type of their values:
type PickByValue<T, V> = { [K in keyof T as T[K] extends V ? K : never]: T[K] };

type Product = { id: number; title: string; price: number; tags: string[] };
type NumericFields = PickByValue<Product, number>;
//   ^? type NumericFields = { id: number; price: number; }

function createGetters<T extends object>(obj: T): Getters<T> {
  const result: Record<string, () => unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[`get${key[0]?.toUpperCase() ?? ""}${key.slice(1)}`] = () => value;
  }
  return result as Getters<T>; // the runtime construction matches the mapped type
}

const getters = createGetters({ name: "Ada", age: 36 });
console.log(getters.getName(), getters.getAge()); // → Ada 36
```

`string & K` is needed because `keyof T` may include `number` and `symbol` keys, while `Capitalize` only accepts strings.

**Mapping a union to an object, then indexing it** is a powerful pattern for turning a union into another union (sometimes called an *immediately indexed mapped type*):

```ts
type Events = {
  click: { x: number; y: number };
  keypress: { key: string };
  scroll: { offset: number };
};

// A discriminated union of all events, generated from the map:
type AnyEvent = { [K in keyof Events]: { type: K } & Events[K] }[keyof Events];

function describe(event: AnyEvent): string {
  switch (event.type) {
    case "click":
      return `click at ${event.x},${event.y}`;
    case "keypress":
      return `key ${event.key}`;
    case "scroll":
      return `scroll to ${event.offset}`;
  }
}

console.log(describe({ type: "keypress", key: "Enter" })); // → key Enter
```

**Mapped types over arrays and tuples** produce arrays and tuples:

```ts
type Boxed<T> = { [K in keyof T]: { value: T[K] } };
type BoxedTuple = Boxed<[string, number]>;
//   ^? type BoxedTuple = [{ value: string; }, { value: number; }]

const boxes: BoxedTuple = [{ value: "a" }, { value: 1 }];
console.log(boxes.length); // → 2
```

### Practice task

Write `form-state.ts`. Given a values type such as

```ts
interface SignupValues {
  username: string;
  age: number;
  newsletter: boolean;
}
```

1. Define `FieldState<V> = { value: V; error: string | null; touched: boolean }` and the mapped type `FormState<T> = { [K in keyof T]: FieldState<T[K]> }`.
2. Define `Validators<T>` — an object with an **optional** validator per field: `(value: T[K]) => string | null`.
3. Define `ChangeHandlers<T>` with key remapping: for each field `foo`, a method `onFooChange(value: T[foo]) => void`.
4. Define `ErrorsOnly<T>` — the fields' error messages: `{ [K in keyof T]?: string }`.
5. Implement `createForm<T extends object>(initial: T, validators: Validators<T>)` returning `{ state: FormState<T>; handlers: ChangeHandlers<T>; errors(): ErrorsOnly<T>; values(): T }`. Each handler sets the value, marks the field touched, and runs its validator. (Inside the implementation, building the remapped handler names requires an assertion; keep it in one place.)

Demonstrate with `SignupValues`, initial `{ username: "", age: 0, newsletter: false }`, validators for `username` (at least 3 characters → `"Too short"`) and `age` (≥ 13 → `"Must be 13+"`), then call `onUsernameChange("al")`, `onAgeChange(30)`, `onNewsletterChange(true)` and print `errors()`, then `onUsernameChange("alice")` and print `errors()` and `values()`, and finally print `state.age.touched`.

### Expected result

No type errors, and:

```text
{ username: 'Too short' }
{}
{ username: 'alice', age: 30, newsletter: true }
true
```

Also, `handlers.onAgeChange("30")` and `handlers.onEmailChange("x")` must be compile errors.

### Acceptance criteria

- [ ] `FormState`, `Validators`, `ChangeHandlers` and `ErrorsOnly` are mapped types over `keyof T`.
- [ ] `ChangeHandlers` uses `as` with a template literal and `Capitalize`.
- [ ] Each handler's parameter type matches its field's value type.
- [ ] Assertions in `createForm` are limited to building the dynamically named handlers.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
type FieldState<V> = { value: V; error: string | null; touched: boolean };
type FormState<T> = { [K in keyof T]: FieldState<T[K]> };
type Validators<T> = { [K in keyof T]?: (value: T[K]) => string | null };
type ChangeHandlers<T> = {
  [K in keyof T as `on${Capitalize<string & K>}Change`]: (value: T[K]) => void;
};
type ErrorsOnly<T> = { [K in keyof T]?: string };

function createForm<T extends object>(initial: T, validators: Validators<T>) {
  const state = {} as FormState<T>;
  const keys = Object.keys(initial) as (keyof T & string)[];
  for (const key of keys) {
    state[key] = { value: initial[key], error: null, touched: false };
  }

  const handlers: Record<string, (value: never) => void> = {};
  for (const key of keys) {
    const name = `on${key.charAt(0).toUpperCase()}${key.slice(1)}Change`;
    handlers[name] = (value: T[typeof key]) => {
      const field = state[key];
      field.value = value;
      field.touched = true;
      field.error = validators[key]?.(value) ?? null;
    };
  }

  return {
    state,
    handlers: handlers as unknown as ChangeHandlers<T>,
    errors(): ErrorsOnly<T> {
      const result: ErrorsOnly<T> = {};
      for (const key of keys) {
        const error = state[key].error;
        if (error !== null) result[key] = error;
      }
      return result;
    },
    values(): T {
      const result = { ...initial };
      for (const key of keys) result[key] = state[key].value;
      return result;
    },
  };
}

interface SignupValues {
  username: string;
  age: number;
  newsletter: boolean;
}

const form = createForm<SignupValues>(
  { username: "", age: 0, newsletter: false },
  {
    username: (v) => (v.length >= 3 ? null : "Too short"),
    age: (v) => (v >= 13 ? null : "Must be 13+"),
  }
);

form.handlers.onUsernameChange("al");
form.handlers.onAgeChange(30);
form.handlers.onNewsletterChange(true);
console.log(form.errors()); // → { username: 'Too short' }
form.handlers.onUsernameChange("alice");
console.log(form.errors()); // → {}
console.log(form.values()); // → { username: 'alice', age: 30, newsletter: true }
console.log(form.state.age.touched); // → true

function invalidUsage(): void {
  // @ts-expect-error -- Argument of type 'string' is not assignable to parameter of type 'number'.
  form.handlers.onAgeChange("30");
  // @ts-expect-error -- Property 'onEmailChange' does not exist
  form.handlers.onEmailChange("x");
}
```

The single `as unknown as ChangeHandlers<T>` is the honest admission that TypeScript can't follow string-built property names; everything around it is fully typed.

</details>

---

## 3.3 Template Literal Types

**Goal:** Build and parse string literal types with template literal types, use the intrinsic string manipulation types, and apply them to type-safe event names, CSS values and URL parameters.

### Explanation

**Template literal types** use the same backtick syntax as JavaScript template strings, but at the type level:

```ts
type Greeting = `Hello, ${string}`;
const g: Greeting = "Hello, world";
// @ts-expect-error -- Type '"Hi, world"' is not assignable to type '`Hello, ${string}`'.
const bad: Greeting = "Hi, world";

type CssLength = `${number}${"px" | "rem" | "%"}`;
const width: CssLength = "12.5rem";

console.log(g, width); // → Hello, world 12.5rem
```

**Unions multiply.** Interpolating unions produces every combination:

```ts
type Size = "sm" | "md" | "lg";
type Color = "red" | "blue";
type ButtonClass = `btn-${Size}-${Color}`;
//   ^? type ButtonClass = "btn-lg-blue" | "btn-lg-red" | "btn-md-blue" | "btn-md-red" | "btn-sm-blue" | "btn-sm-red"

const cls: ButtonClass = "btn-md-red";
console.log(cls); // → btn-md-red
```

(Large unions multiplied together can explode in size; TypeScript limits a union to 100,000 members.)

**Intrinsic string types** transform literal types: `Uppercase<S>`, `Lowercase<S>`, `Capitalize<S>`, `Uncapitalize<S>`:

```ts
type EventName = "click" | "focus";
type HandlerName = `on${Capitalize<EventName>}`;
//   ^? type HandlerName = "onClick" | "onFocus"
type Env = Uppercase<"dev" | "prod">;
//   ^? type Env = "DEV" | "PROD"

const handler: HandlerName = "onFocus";
console.log(handler); // → onFocus
```

**Parsing strings with `infer`.** In a conditional type, a template literal pattern with `infer` extracts parts of a string type:

```ts
type Trim<S extends string> = S extends ` ${infer R}` | `${infer R} ` ? Trim<R> : S;
type T1 = Trim<"  hi  ">;
//   ^? type T1 = "hi"

type Split<S extends string, D extends string> =
  S extends `${infer Head}${D}${infer Tail}` ? [Head, ...Split<Tail, D>] : [S];
type Parts = Split<"a.b.c", ".">;
//   ^? type Parts = ["a", "b", "c"]

// Extract ":param" names from a route pattern
type RouteParams<Path extends string> =
  Path extends `${string}:${infer Param}/${infer Rest}`
    ? Param | RouteParams<`/${Rest}`>
    : Path extends `${string}:${infer Param}`
      ? Param
      : never;

type UserPostParams = RouteParams<"/users/:userId/posts/:postId">;
//   ^? type UserPostParams = "postId" | "userId"

console.log("parsed at compile time"); // → parsed at compile time
```

Each `infer` matches as little as possible from the left, which is why `Split` finds the first separator.

**Type-safe string APIs.** Combined with generics, template literal types let functions validate string arguments and compute result types from them:

```ts
type RouteParams<Path extends string> =
  Path extends `${string}:${infer Param}/${infer Rest}`
    ? Param | RouteParams<`/${Rest}`>
    : Path extends `${string}:${infer Param}`
      ? Param
      : never;

function buildPath<Path extends string>(path: Path, params: Record<RouteParams<Path>, string | number>): string {
  return path.replace(/:(\w+)/g, (_, name: string) => {
    const value: unknown = (params as Record<string, unknown>)[name];
    return encodeURIComponent(String(value));
  });
}

console.log(buildPath("/users/:userId/posts/:postId", { userId: 7, postId: "intro" })); // → /users/7/posts/intro
// @ts-expect-error -- Property 'postId' is missing
buildPath("/users/:userId/posts/:postId", { userId: 7 });
```

That last call is a compile error, and the editor autocompletes `userId` and `postId` as you type the object.

**Typed event names**

```ts
type Entity = "user" | "order";
type Action = "created" | "deleted";
type DomainEvent = `${Entity}:${Action}`;

function on(event: DomainEvent, handler: () => void): void {
  handler();
}
on("order:created", () => console.log("order created!")); // → order created!
// @ts-expect-error -- Argument of type '"order:shipped"' is not assignable to parameter of type
on("order:shipped", () => {});
```

**Unicode note (TypeScript 7).** When inferring from string literal types, TypeScript 7 treats a Unicode code point (such as an emoji) as a single unit, so `"😀abc"` splits into `"😀"` and `"abc"` rather than into two halves of a surrogate pair. Older versions split by UTF-16 code units.

### Practice task

Write `css.ts`.

1. `type Unit = "px" | "rem" | "em" | "%"` and `type Length = \`${number}${Unit}\`` plus `"0"` and `"auto"`.
2. `type Side = "top" | "right" | "bottom" | "left"` and `type MarginProperty = "margin" | \`margin-${Side}\``.
3. `type CamelCase<S extends string>` that converts kebab-case to camelCase (`"margin-top"` → `"marginTop"`), recursively, using `infer` and `Capitalize`.
4. `type StyleObject = { [P in MarginProperty as CamelCase<P>]?: Length }` (a mapped type with key remapping).
5. `parseLength(value: Length): { amount: number; unit: Unit | null }` — `"0"` and `"auto"` return `{ amount: 0, unit: null }`.
6. `toCss(style: StyleObject): string` — converts back to kebab-case declarations joined with `; `, e.g. `"margin-top: 1rem; margin-left: 8px"`.

Print `toCss({ marginTop: "1rem", marginLeft: "8px" })`, `parseLength("12.5%")`, `parseLength("auto")`, and show (with `@ts-expect-error`) that `{ marginTop: "12pt" }` and `{ paddingTop: "1px" }` are rejected.

### Expected result

No type errors; hovering `StyleObject` lists `margin`, `marginTop`, `marginRight`, `marginBottom`, `marginLeft`; and:

```text
margin-top: 1rem; margin-left: 8px
{ amount: 12.5, unit: '%' }
{ amount: 0, unit: null }
```

### Acceptance criteria

- [ ] `Length`, `MarginProperty` and `StyleObject` are built from template literal and mapped types, not written out by hand.
- [ ] `CamelCase` is recursive (`CamelCase<"a-b-c">` is `"aBC"`), with a compile-time test.
- [ ] `parseLength` returns a `Unit` (not just `string`) for the unit, using a type guard.
- [ ] The two invalid style objects are compile errors.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
type Unit = "px" | "rem" | "em" | "%";
type Length = `${number}${Unit}` | "0" | "auto";
type Side = "top" | "right" | "bottom" | "left";
type MarginProperty = "margin" | `margin-${Side}`;

type CamelCase<S extends string> = S extends `${infer Head}-${infer Tail}`
  ? `${Head}${Capitalize<CamelCase<Tail>>}`
  : S;

type StyleObject = { [P in MarginProperty as CamelCase<P>]?: Length };

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false;
type Expect<T extends true> = T;
type Tests = [
  Expect<Equal<CamelCase<"margin-top">, "marginTop">>,
  Expect<Equal<CamelCase<"a-b-c">, "aBC">>,
  Expect<Equal<keyof StyleObject, "margin" | "marginTop" | "marginRight" | "marginBottom" | "marginLeft">>,
];

const UNITS = ["px", "rem", "em", "%"] as const;
function isUnit(value: string): value is Unit {
  return (UNITS as readonly string[]).includes(value);
}

function parseLength(value: Length): { amount: number; unit: Unit | null } {
  if (value === "0" || value === "auto") return { amount: 0, unit: null };
  const match = /^(-?[\d.]+)(.*)$/.exec(value);
  const unit = match?.[2] ?? "";
  return { amount: Number(match?.[1]), unit: isUnit(unit) ? unit : null };
}

function toKebab(name: string): string {
  return name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
}

function toCss(style: StyleObject): string {
  return Object.entries(style)
    .map(([prop, value]) => `${toKebab(prop)}: ${value}`)
    .join("; ");
}

console.log(toCss({ marginTop: "1rem", marginLeft: "8px" })); // → margin-top: 1rem; margin-left: 8px
console.log(parseLength("12.5%")); // → { amount: 12.5, unit: '%' }
console.log(parseLength("auto"));  // → { amount: 0, unit: null }

// @ts-expect-error -- Type '"12pt"' is not assignable to type 'Length | undefined'.
const points: StyleObject = { marginTop: "12pt" };
// @ts-expect-error -- Object literal may only specify known properties
const padding: StyleObject = { paddingTop: "1px" };
```

</details>

---

## 3.4 Recursive Types

**Goal:** Describe self-similar data (JSON, trees, nested configuration) with recursive types, write recursive type transformations such as `DeepReadonly` and dot-separated paths, and stay within the compiler's limits.

### Explanation

A type can refer to itself, which is how you describe data of unbounded depth:

```ts
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const config: Json = { name: "app", ports: [80, 443], nested: { debug: true, tags: null } };

// @ts-expect-error -- Type '{ callback: () => void; }' is not assignable to type 'Json'.
const notJson: Json = { callback: () => {} };

interface TreeNode<T> {
  value: T;
  children: TreeNode<T>[];
}

function depth<T>(node: TreeNode<T>): number {
  return 1 + Math.max(0, ...node.children.map(depth));
}

const tree: TreeNode<string> = {
  value: "root",
  children: [{ value: "a", children: [{ value: "a1", children: [] }] }, { value: "b", children: [] }],
};
console.log(depth(tree), JSON.stringify(config).length); // → 3 67
```

`Json` is the honest type for `JSON.parse` results (still better narrowed to a specific shape before use), and it rejects functions, `undefined`, `Date` and other values that don't survive serialisation.

**Recursive transformations** apply a mapped or conditional type at every level:

```ts
type DeepReadonly<T> = T extends (...args: any[]) => any
  ? T // leave functions alone
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;

interface AppConfig {
  server: { host: string; ports: number[] };
  features: { beta: boolean };
}

function deepFreeze<T extends object>(obj: T): DeepReadonly<T> {
  for (const value of Object.values(obj)) {
    if (typeof value === "object" && value !== null) deepFreeze(value);
  }
  return Object.freeze(obj) as DeepReadonly<T>;
}

const frozen = deepFreeze<AppConfig>({ server: { host: "localhost", ports: [80] }, features: { beta: false } });
const overrides: DeepPartial<AppConfig> = { features: { beta: true } }; // nested parts optional
console.log(frozen.server.host, overrides.features?.beta); // → localhost true

function invalidUsage(): void {
  // @ts-expect-error -- Cannot assign to 'host' because it is a read-only property.
  frozen.server.host = "example.com";
  // @ts-expect-error -- Property 'push' does not exist on type 'readonly number[]'.
  frozen.server.ports.push(443);
}
```

Here the type matches reality: the object is frozen at run time too, so those two statements would also throw a `TypeError` if `invalidUsage` were ever called. (Wrapping intentional errors in a function that is never called is a handy way to keep examples runnable.)

**Paths into nested objects.** A recursive template literal type can list every dot-separated path of an object, and another can look up the value type at a path — the basis of type-safe `get(obj, "a.b.c")` helpers, form libraries and i18n keys:

```ts
type Paths<T> = T extends object
  ? { [K in keyof T & string]: T[K] extends object ? K | `${K}.${Paths<T[K]>}` : K }[keyof T & string]
  : never;

type PathValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? PathValue<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;

const settings = {
  user: { name: "Ada", address: { city: "London" } },
  theme: "dark",
};

type SettingsPath = Paths<typeof settings>;
//   ^? type SettingsPath = "theme" | "user" | "user.address" | "user.address.city" | "user.name"

function get<T, P extends Paths<T> & string>(obj: T, path: P): PathValue<T, P> {
  let current: unknown = obj;
  for (const key of path.split(".")) {
    current = (current as Record<string, unknown>)[key];
  }
  return current as PathValue<T, P>;
}

const city = get(settings, "user.address.city");
//    ^? const city: string
console.log(city, get(settings, "user").name); // → London Ada
// @ts-expect-error -- Argument of type '"user.email"' is not assignable to parameter of type
get(settings, "user.email");
```

**Limits.** Recursive types are expanded by the compiler, so:

- TypeScript stops instantiating after a recursion depth of about 100 (1,000 for conditional types written in *tail-recursive* form, where the recursive call is the entire result of a branch), reporting *"Type instantiation is excessively deep and possibly infinite"*.
- Recursive types over large objects can slow down type-checking and editor responsiveness. Prefer simple, explicit types for hot paths; use recursion where it clearly pays off.
- Arrays inside objects need care in path types (indices); real libraries handle these cases explicitly.

### Practice task

Write `deep.ts`.

1. Define `DeepPartial<T>` that treats arrays as whole values (an array property is optional, but its items are not made partial) and leaves functions alone.
2. Write `deepMerge<T extends object>(base: T, patch: DeepPartial<T>): T` that recursively merges plain objects, replaces arrays and primitives, and skips `undefined` values in the patch. It must not mutate `base`.
3. Define `Paths<T>` and `PathValue<T, P>` as in the explanation, and write `set<T, P extends Paths<T>>(obj: T, path: P, value: PathValue<T, P>): T` that returns an updated **copy**.
4. Write `countLeaves(value: Json): number` (using the `Json` type from the explanation) that counts the primitive values in a JSON structure.

Use:

```ts
const defaults = {
  server: { host: "localhost", port: 8080, tls: { enabled: false, cert: "" } },
  log: { level: "info" as "debug" | "info" | "error", targets: ["stdout"] },
};
```

Print: the result of `deepMerge(defaults, { server: { port: 443, tls: { enabled: true } }, log: { targets: ["file"] } })`; then `set(defaults, "log.level", "debug").log.level`; then `defaults.log.level` (unchanged); then `countLeaves(defaults)`.

### Expected result

No type errors, and:

```text
{
  server: { host: 'localhost', port: 443, tls: { enabled: true, cert: '' } },
  log: { level: 'info', targets: [ 'file' ] }
}
debug
info
6
```

`set(defaults, "log.level", "verbose")` and `deepMerge(defaults, { server: { port: "443" } })` must be compile errors.

### Acceptance criteria

- [ ] `DeepPartial` keeps arrays whole; `deepMerge` replaces arrays rather than merging them.
- [ ] Neither `deepMerge` nor `set` mutates its input.
- [ ] `set`'s `value` parameter type depends on the path.
- [ ] `countLeaves` recurses over arrays and objects (6 leaves: host, port, enabled, cert, level, "stdout").
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

type DeepPartial<T> = T extends readonly unknown[]
  ? T
  : T extends (...args: any[]) => any
    ? T
    : T extends object
      ? { [K in keyof T]?: DeepPartial<T[K]> }
      : T;

type Paths<T> = T extends readonly unknown[]
  ? never
  : T extends object
    ? { [K in keyof T & string]: T[K] extends object ? K | `${K}.${Paths<T[K]>}` : K }[keyof T & string]
    : never;

type PathValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? PathValue<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge<T extends object>(base: T, patch: DeepPartial<T>): T {
  const result = { ...base } as Record<string, unknown>;
  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined) continue;
    const current = result[key];
    result[key] = isPlainObject(current) && isPlainObject(value) ? deepMerge(current, value) : value;
  }
  return result as T;
}

function set<T, P extends Paths<T>>(obj: T, path: P, value: PathValue<T, P>): T {
  const [head, ...rest] = (path as string).split(".");
  const source = obj as Record<string, unknown>;
  if (head === undefined) return obj;
  const next = rest.length === 0 ? value : set(source[head], rest.join(".") as never, value as never);
  return { ...source, [head]: next } as T;
}

function countLeaves(value: Json): number {
  if (Array.isArray(value)) return value.reduce((sum: number, item) => sum + countLeaves(item), 0);
  if (value !== null && typeof value === "object") {
    return Object.values(value).reduce((sum: number, item) => sum + countLeaves(item), 0);
  }
  return 1;
}

const defaults = {
  server: { host: "localhost", port: 8080, tls: { enabled: false, cert: "" } },
  log: { level: "info" as "debug" | "info" | "error", targets: ["stdout"] },
};

console.log(deepMerge(defaults, { server: { port: 443, tls: { enabled: true } }, log: { targets: ["file"] } }));
console.log(set(defaults, "log.level", "debug").log.level); // → debug
console.log(defaults.log.level);                           // → info
console.log(countLeaves(defaults));                        // → 6

function invalidUsage(): void {
  // @ts-expect-error -- Argument of type '"verbose"' is not assignable to parameter of type
  set(defaults, "log.level", "verbose");
  // @ts-expect-error -- Type 'string' is not assignable to type 'number'.
  deepMerge(defaults, { server: { port: "443" } });
}
```

Inside `set`, the recursive call works on values whose types TypeScript can't relate to `T` any more, so it uses `never` assertions to opt out locally; the public signature remains fully typed. This "precise outside, loose inside" structure is typical of type-level utilities.

</details>

---

## 3.5 Type Compatibility, Variance and Branded Types

**Goal:** Predict when one type is assignable to another, understand variance and the deliberate unsound spots in TypeScript, and use branded types to distinguish values that share a structure.

### Explanation

**Assignability is structural.** `A` is assignable to `B` when `A` has at least everything `B` requires. Names don't matter (1.4). The **top types** `unknown` and `any` accept everything; the **bottom type** `never` is assignable to everything and accepts nothing.

```ts
const anything: unknown = 42;          // everything is assignable to unknown
// @ts-expect-error -- Type 'unknown' is not assignable to type 'number'.
const n: number = anything;            // but unknown isn't assignable to other types

function fail(): never {
  throw new Error("never returns");
}
const lazy: () => string = fail;       // never is assignable to everything

console.log(typeof anything, typeof lazy); // → number function
```

**Functions: fewer parameters are fine.** A function that ignores some arguments can be used where more arguments are passed — that's why `[1, 2].map((x) => x * 2)` works even though `map` passes three arguments:

```ts
type Handler = (value: string, index: number) => void;
const simple: Handler = (value) => console.log(value); // OK: ignores index
simple("hi", 0); // → hi
```

**Variance** describes how assignability of a generic type follows its type argument:

- **Covariant** (`out`): `Box<Dog>` is assignable to `Box<Animal>` when `Dog` is assignable to `Animal`. Read-only positions (return types, readonly properties) are covariant.
- **Contravariant** (`in`): the reverse direction. Function *parameters* are contravariant: a function that handles any `Animal` can stand in for one that only needs to handle `Dog`s, but not the other way round.
- **Invariant**: both directions required (a type used for both reading and writing).

```ts
interface Animal { name: string }
interface Dog extends Animal { bark(): string }

let handleAnimal = (a: Animal): string => a.name;
let handleDog = (d: Dog): string => d.bark();

handleDog = handleAnimal; // OK: an Animal handler can handle Dogs
// @ts-expect-error -- Type '(d: Dog) => string' is not assignable to type '(a: Animal) => string'.
handleAnimal = handleDog; // a Dog handler can't handle every Animal

console.log(handleDog({ name: "Rex", bark: () => "woof" })); // → Rex
```

**Known unsound spots.** TypeScript deliberately trades a little soundness for convenience in a few places:

1. **Arrays are covariant even though they are mutable**, so this compiles and is wrong:

    ```ts
    interface Animal { name: string }
    interface Dog extends Animal { bark(): string }

    const dogs: Dog[] = [{ name: "Rex", bark: () => "woof" }];
    const animals: Animal[] = dogs;   // allowed (covariance)
    animals.push({ name: "Tom" });    // a "cat" sneaks into the dog array
    console.log(dogs.length, typeof dogs[1]?.bark); // → 2 undefined
    ```

   Using `readonly Dog[]` for parameters avoids the problem: a read-only array can't have the cat pushed into it.

2. **Method parameters are checked bivariantly.** With `strictFunctionTypes` (part of `strict`), parameters of *function-type properties* are checked contravariantly, but parameters of *methods* (written with method syntax) are not — for compatibility with existing code such as DOM event handler interfaces:

    ```ts
    interface Animal { name: string }
    interface Dog extends Animal { bark(): string }

    interface MethodStyle { handle(a: Animal): void }       // method syntax: bivariant
    interface PropertyStyle { handle: (a: Animal) => void } // property syntax: contravariant

    const dogOnly = { handle: (d: Dog) => console.log(d.bark()) };

    const m: MethodStyle = dogOnly; // compiles, but unsafe!
    // @ts-expect-error -- Type '(d: Dog) => void' is not assignable to type '(a: Animal) => void'.
    const p: PropertyStyle = dogOnly;

    try {
      m.handle({ name: "Tom" });
    } catch (error) {
      console.log(error instanceof TypeError); // → true (d.bark is not a function)
    }
    ```

   Prefer property syntax (`handle: (a: Animal) => void`) in your own interfaces when you want the stricter check.

3. **`any`** switches checking off in both directions, and type assertions do whatever you tell them.

**Variance annotations.** For generic types, you may declare variance explicitly with `in` and `out` on type parameters. TypeScript then checks the declaration and can compare instantiations faster:

```ts
interface Producer<out T> {
  get(): T;
}
interface Consumer<in T> {
  accept(value: T): void;
}

const stringProducer: Producer<string> = { get: () => "text" };
const p: Producer<string | number> = stringProducer; // covariant: OK

const anyConsumer: Consumer<string | number> = { accept: (v) => console.log(`got ${v}`) };
const c: Consumer<string> = anyConsumer; // contravariant: OK
c.accept(stringProducer.get()); // → got text
console.log(p.get()); // → text
```

**Branded (nominal) types.** Structural typing means `type UserId = string` and `type OrderId = string` are interchangeable — easy to mix up. A **brand** adds a phantom property that exists only in the type system, so the types become incompatible:

```ts
declare const brand: unique symbol;
type Brand<T, Name extends string> = T & { readonly [brand]: Name };

type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;

// "Smart constructors" are the only places that create branded values:
function userId(raw: string): UserId {
  if (!/^u_\d+$/.test(raw)) throw new Error(`Invalid user id: ${raw}`);
  return raw as UserId;
}
function orderId(raw: string): OrderId {
  if (!/^o_\d+$/.test(raw)) throw new Error(`Invalid order id: ${raw}`);
  return raw as OrderId;
}

function cancelOrder(order: OrderId, by: UserId): string {
  return `${order} cancelled by ${by}`;
}

const u = userId("u_7");
const o = orderId("o_42");
console.log(cancelOrder(o, u)); // → o_42 cancelled by u_7
console.log(u.toUpperCase());   // → U_7 (still a string for everything else)

// @ts-expect-error -- Argument of type 'UserId' is not assignable to parameter of type 'OrderId'.
cancelOrder(u, o);
// @ts-expect-error -- Argument of type 'string' is not assignable to parameter of type 'OrderId'.
cancelOrder("o_1", u);
```

`declare const brand: unique symbol` creates a symbol type that exists only at compile time; `unique symbol` types are distinct from every other symbol, so the brand can't be forged by accident. Brands are erased completely — a `UserId` is a plain string at run time. Use them for IDs, validated values (`Email`, `NonEmptyString`), and units (`Meters`, `Cents`).

### Practice task

Write `money.ts` using branded types to prevent currency and unit mistakes.

1. Using the `Brand` helper, define `type Cents<C extends "EUR" | "USD"> = Brand<number, \`Cents<${C}>\`>` — integer amounts in cents, branded per currency.
2. Write smart constructors `eur(amount: number): Cents<"EUR">` and `usd(amount: number): Cents<"USD">` that take a decimal amount (e.g. `12.34`), convert to integer cents (round), and throw `RangeError` for negative or non-finite values.
3. Write generic `add` and `multiply<C extends Currency>(a: Cents<C>, factor: number): Cents<C>` (round to integer cents). For `add`, the naive signature `add<C>(a: Cents<C>, b: Cents<C>)` is not enough: given a euro and a dollar amount, TypeScript would happily infer `C = "EUR" | "USD"` from both arguments. Declare it as `add<C extends Currency>(a: Cents<C>, b: Cents<NoInfer<C>>): Cents<C>` — the built-in `NoInfer` (3.6) tells TypeScript to infer `C` from `a` only, and then *check* `b` against it.
4. Write `convert(amount: Cents<"EUR">, rate: number): Cents<"USD">`.
5. Write `format<C extends Currency>(amount: Cents<C>, currency: NoInfer<C>): string` returning e.g. `"12.34 EUR"`.
6. Fix the unsound interface below by changing *only its syntax* so that assigning `strictHandler` becomes a compile error, then keep the assignment under `@ts-expect-error`:

```ts
interface PriceListener {
  onChange(price: Cents<"EUR" | "USD">): void;
}
const strictHandler = { onChange: (price: Cents<"EUR">) => console.log(price) };
const listener: PriceListener = strictHandler; // currently compiles!
```

Print `format(add(eur(10.5), eur(2.25)), "EUR")`, `format(multiply(usd(19.99), 3), "USD")`, `format(convert(eur(100), 1.0825), "USD")`, and the error message from `eur(-1)`.

### Expected result

No type errors, and:

```text
12.75 EUR
59.97 USD
108.25 USD
Amount must be a non-negative finite number
```

`add(eur(1), usd(1))`, `add(eur(1), 100)` and `format(eur(1), "USD")` must all be compile errors (show them with `@ts-expect-error`).

### Acceptance criteria

- [ ] Amounts are branded per currency; a raw `number` is never accepted where `Cents<…>` is required.
- [ ] Branded values are created only in the smart constructors and the small arithmetic helpers (the only places with `as`).
- [ ] `add` and `multiply` are generic and preserve the currency; `add` and `format` use `NoInfer` so mixed currencies are rejected.
- [ ] `PriceListener` uses property syntax so its parameter is checked contravariantly.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
declare const brand: unique symbol;
type Brand<T, Name extends string> = T & { readonly [brand]: Name };

type Currency = "EUR" | "USD";
type Cents<C extends Currency> = Brand<number, `Cents<${C}>`>;

function toCents(amount: number): number {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new RangeError("Amount must be a non-negative finite number");
  }
  return Math.round(amount * 100);
}

const eur = (amount: number): Cents<"EUR"> => toCents(amount) as Cents<"EUR">;
const usd = (amount: number): Cents<"USD"> => toCents(amount) as Cents<"USD">;

function add<C extends Currency>(a: Cents<C>, b: Cents<NoInfer<C>>): Cents<C> {
  return (a + b) as Cents<C>;
}

function multiply<C extends Currency>(a: Cents<C>, factor: number): Cents<C> {
  return Math.round(a * factor) as Cents<C>;
}

function convert(amount: Cents<"EUR">, rate: number): Cents<"USD"> {
  return Math.round(amount * rate) as Cents<"USD">;
}

function format<C extends Currency>(amount: Cents<C>, currency: NoInfer<C>): string {
  return `${(amount / 100).toFixed(2)} ${currency}`;
}

interface PriceListener {
  onChange: (price: Cents<"EUR"> | Cents<"USD">) => void;
}
const strictHandler = { onChange: (price: Cents<"EUR">) => console.log(price) };
// @ts-expect-error -- is not assignable to type 'PriceListener'.
const listener: PriceListener = strictHandler;

console.log(format(add(eur(10.5), eur(2.25)), "EUR"));       // → 12.75 EUR
console.log(format(multiply(usd(19.99), 3), "USD"));         // → 59.97 USD
console.log(format(convert(eur(100), 1.0825), "USD"));       // → 108.25 USD
try {
  eur(-1);
} catch (error) {
  if (error instanceof Error) console.log(error.message);    // → Amount must be a non-negative finite number
}

function invalidUsage(): void {
  // @ts-expect-error -- Argument of type 'Cents<"USD">' is not assignable to parameter of type 'Cents<"EUR">'.
  add(eur(1), usd(1));
  // @ts-expect-error -- Argument of type 'number' is not assignable to parameter of type 'Cents<"EUR">'.
  add(eur(1), 100);
  // @ts-expect-error -- Argument of type '"USD"' is not assignable to parameter of type '"EUR"'.
  format(eur(1), "USD");
}
```

The arithmetic helpers also contain `as` assertions, because the result of `a + b` is a plain `number`: re-branding after arithmetic you have verified is part of the brand's "trusted kernel". Keep that kernel small.

</details>

---
## 3.6 Advanced Generics and Inference

**Goal:** Control how TypeScript infers type arguments with `const` type parameters and `NoInfer`, type variadic functions with variadic tuple types, and encode state in types with generic builders.

### Explanation

**`const` type parameters.** By default, inference widens literals: an array argument `["/", "/about"]` is inferred as `string[]`. Adding `const` before a type parameter asks TypeScript to infer as if the argument were written with `as const` — without the caller having to remember it:

```ts
function routesLoose<T extends readonly string[]>(paths: T): T {
  return paths;
}
function routes<const T extends readonly string[]>(paths: T): T {
  return paths;
}

const loose = routesLoose(["/", "/about"]);
//    ^? const loose: string[]
const precise = routes(["/", "/about"]);
//    ^? const precise: readonly ["/", "/about"]

type Route = (typeof precise)[number];
//   ^? type Route = "/" | "/about"
console.log(precise.length); // → 2
```

(The constraint should be a `readonly` array type; otherwise the `const` inference can fall back to a mutable, wider type.)

**`NoInfer<T>`.** When a type parameter appears in several places, TypeScript gathers inference candidates from all of them. Sometimes one position should only be *checked*, not used for inference. `NoInfer<T>` marks such positions:

```ts
function createMachine<S extends string>(states: S[], initial: NoInfer<S>): { states: S[]; current: S } {
  return { states, current: initial };
}

const light = createMachine(["red", "yellow", "green"], "red");
//    ^? const light: { states: ("green" | "red" | "yellow")[]; current: "green" | "red" | "yellow"; }

// @ts-expect-error -- Argument of type '"blue"' is not assignable to parameter of type '"green" | "red" | "yellow"'.
createMachine(["red", "yellow", "green"], "blue");

console.log(light.current); // → red
```

Without `NoInfer`, the second call would succeed: TypeScript would infer `S` as `"red" | "yellow" | "green" | "blue"` from both arguments. You used the same trick for currencies in 3.5.

**Variadic tuple types.** A spread in a tuple type can be generic (`[...T]`), which lets you type functions that combine or forward argument lists:

```ts
function concat<A extends unknown[], B extends unknown[]>(a: [...A], b: [...B]): [...A, ...B] {
  return [...a, ...b];
}
const joined = concat([1, "two"], [true]);
//    ^? const joined: [number, string, boolean]

// Partial application: fix the first arguments of a function, return a function taking the rest
function partial<Head extends unknown[], Tail extends unknown[], R>(
  fn: (...args: [...Head, ...Tail]) => R,
  ...head: Head
): (...tail: Tail) => R {
  return (...tail) => fn(...head, ...tail);
}

function greet(greeting: string, name: string, punctuation: "!" | "?"): string {
  return `${greeting}, ${name}${punctuation}`;
}

const hello = partial(greet, "Hello");
//    ^? const hello: (name: string, punctuation: "!" | "?") => string

console.log(joined, hello("Ada", "!")); // → [ 1, 'two', true ] Hello, Ada!
// @ts-expect-error -- Argument of type '"."' is not assignable to parameter of type '"!" | "?"'.
hello("Ada", ".");
```

Note how the parameter *names* of `greet` survive into `hello`'s type: labelled tuple elements carry them along.

**Inference through higher-order functions.** TypeScript can infer generic functions passed to generic functions, so composition keeps types precise:

```ts
function pipe<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C {
  return (a) => g(f(a));
}

const lengthOfTrimmed = pipe((s: string) => s.trim(), (s) => s.length);
//    ^? const lengthOfTrimmed: (a: string) => number
console.log(lengthOfTrimmed("  hi  ")); // → 2
```

Libraries type `pipe` for any number of functions with a list of overloads (one per arity) or recursive conditional types.

**Type-state builders.** Generic parameters can track *which steps have been done*, so invalid sequences don't compile. Here `select` accumulates the selected column names in a type parameter, and `run` returns rows with exactly those columns:

```ts
interface Row {
  id: number;
  name: string;
  email: string;
  age: number;
}

class Query<T, Selected extends keyof T = never> {
  #columns: (keyof T)[];
  #rows: readonly T[];

  constructor(rows: readonly T[], columns: (keyof T)[] = []) {
    this.#rows = rows;
    this.#columns = columns;
  }

  select<K extends keyof T>(...columns: K[]): Query<T, Selected | K> {
    return new Query<T, Selected | K>(this.#rows, [...this.#columns, ...columns]);
  }

  run(): Pick<T, Selected>[] {
    return this.#rows.map((row) => {
      const picked: Partial<T> = {};
      for (const column of this.#columns) picked[column] = row[column];
      return picked as Pick<T, Selected>;
    });
  }
}

const people: Row[] = [{ id: 1, name: "Ana", email: "ana@x.io", age: 34 }];
const result = new Query(people).select("id").select("name").run();
//    ^? const result: Pick<Row, "id" | "name">[]

console.log(result); // → [ { id: 1, name: 'Ana' } ]
// @ts-expect-error -- Property 'email' does not exist on type 'Pick<Row, "id" | "name">'.
result[0]?.email;
```

**Avoid "return-only" generics.** A signature like `function parse<T>(json: string): T` lets the caller pick *any* `T` with no check at all — it is an assertion in disguise. Prefer returning `unknown` and validating (3.8), or accept a validator that ties `T` to real checks.

### Practice task

Write `generics.ts`.

1. `tuple<const T extends readonly unknown[]>(...items: T): T` — returns its arguments as a precisely typed read-only tuple. Hover `tuple("a", 1, true)` to confirm `readonly ["a", 1, true]`.
2. `withDefault<T>(values: readonly T[], fallback: NoInfer<T>): T` — returns the first value or the fallback; check that `withDefault(["a", "b"] as const, "z")` is a compile error while `withDefault(["a", "b"] as const, "b")` is fine.
3. `partial` (as in the explanation), and use it to create `add10 = partial(add3, 10)` from `add3(a: number, b: number, c: number)`.
4. A type-state `RequestBuilder<HasMethod extends boolean, HasUrl extends boolean>` with:
    - `method(m: "GET" | "POST"): RequestBuilder<true, HasUrl>`
    - `url(u: string): RequestBuilder<HasMethod, true>`
    - `header(name: string, value: string): RequestBuilder<HasMethod, HasUrl>`
    - `build(this: RequestBuilder<true, true>): { method: "GET" | "POST"; url: string; headers: Record<string, string> }` — a **`this` parameter** makes `build` callable only when both required steps are done.
    - a function `request()` that starts with `RequestBuilder<false, false>`.

Print `tuple("a", 1, true)`, `withDefault<number>([], 0)`, `add10(1, 2)`, and the result of `request().url("/api").header("Accept", "json").method("POST").build()`. Show with `@ts-expect-error` that `request().url("/api").build()` doesn't compile.

### Expected result

No type errors, and:

```text
[ 'a', 1, true ]
0
13
{ method: 'POST', url: '/api', headers: { Accept: 'json' } }
```

### Acceptance criteria

- [ ] `tuple` uses a `const` type parameter; callers don't write `as const`.
- [ ] `withDefault` uses `NoInfer` so the fallback is checked, not used for inference.
- [ ] `partial`'s result type keeps the remaining parameter names and types.
- [ ] `build` is unavailable (compile error) until both `method` and `url` were called, in either order.
- [ ] The builder is immutable (each step returns a new builder) or clearly documented if not.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
function tuple<const T extends readonly unknown[]>(...items: T): T {
  return items;
}

function withDefault<T>(values: readonly T[], fallback: NoInfer<T>): T {
  return values[0] ?? fallback;
}

function partial<Head extends unknown[], Tail extends unknown[], R>(
  fn: (...args: [...Head, ...Tail]) => R,
  ...head: Head
): (...tail: Tail) => R {
  return (...tail) => fn(...head, ...tail);
}

type Method = "GET" | "POST";
type BuiltRequest = { method: Method; url: string; headers: Record<string, string> };

class RequestBuilder<HasMethod extends boolean, HasUrl extends boolean> {
  // A type-only property that records the state; `declare` means it emits no code.
  declare private readonly state: { method: HasMethod; url: HasUrl };
  readonly #method: Method | undefined;
  readonly #url: string | undefined;
  readonly #headers: Record<string, string>;

  constructor(method?: Method, url?: string, headers: Record<string, string> = {}) {
    this.#method = method;
    this.#url = url;
    this.#headers = headers;
  }

  method(m: Method): RequestBuilder<true, HasUrl> {
    return new RequestBuilder(m, this.#url, this.#headers);
  }

  url(u: string): RequestBuilder<HasMethod, true> {
    return new RequestBuilder(this.#method, u, this.#headers);
  }

  header(name: string, value: string): RequestBuilder<HasMethod, HasUrl> {
    return new RequestBuilder(this.#method, this.#url, { ...this.#headers, [name]: value });
  }

  build(this: RequestBuilder<true, true>): BuiltRequest {
    if (this.#method === undefined || this.#url === undefined) throw new Error("unreachable");
    return { method: this.#method, url: this.#url, headers: this.#headers };
  }
}

const request = (): RequestBuilder<false, false> => new RequestBuilder();

const t = tuple("a", 1, true);
//    ^? const t: readonly ["a", 1, true]
console.log(t); // → [ 'a', 1, true ]
console.log(withDefault<number>([], 0)); // → 0 (an empty array gives nothing to infer T from)

const add3 = (a: number, b: number, c: number): number => a + b + c;
const add10 = partial(add3, 10);
console.log(add10(1, 2)); // → 13

console.log(request().url("/api").header("Accept", "json").method("POST").build());
// → { method: 'POST', url: '/api', headers: { Accept: 'json' } }

function invalidUsage(): void {
  // @ts-expect-error -- Argument of type '"z"' is not assignable to parameter of type '"a" | "b"'.
  withDefault(["a", "b"] as const, "z");
  // @ts-expect-error -- The 'this' context of type 'RequestBuilder<false, true>' is not assignable to method's 'this' of type 'RequestBuilder<true, true>'.
  request().url("/api").build();
}
```

Because typing is structural, type parameters only matter if they appear in the type's *structure*. Without the `declare`d `state` property, `RequestBuilder<false, true>` and `RequestBuilder<true, true>` would have identical members and TypeScript would consider them interchangeable — the `this` parameter of `build` would then accept any builder. The `declare` field exists only in the type system (it emits no JavaScript), so it is allowed with `erasableSyntaxOnly`.

</details>

---

## 3.7 Decorators and Resource Management with `using`

**Goal:** Write and apply standard (ECMAScript) decorators with correctly typed contexts, recognise legacy experimental decorators, and manage resources deterministically with `using`, `await using` and `DisposableStack`.

### Explanation

**Decorators** are functions that modify classes and class members declaratively, written `@decorator` before the declaration. TypeScript 5.0+ implements the standard ECMAScript decorators proposal. JavaScript engines don't run decorators natively yet, so code using them must be **compiled by `tsc`** (or a bundler), which rewrites them into ordinary function calls (1.1).

A **method decorator** receives the original method and a *context* object, and may return a replacement method:

```ts
// Requires compilation with tsc (decorators are not yet supported natively by JavaScript engines)
function logged<This, Args extends unknown[], Return>(
  target: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
) {
  const name = String(context.name);
  return function (this: This, ...args: Args): Return {
    console.log(`→ ${name}(${args.join(", ")})`);
    const result = target.call(this, ...args);
    console.log(`← ${name} = ${String(result)}`);
    return result;
  };
}

// A decorator factory: a function that returns a decorator, so it can take options
function bound<This, Value extends (this: This, ...args: any) => any>(
  _target: Value,
  context: ClassMethodDecoratorContext<This, Value>,
) {
  context.addInitializer(function () {
    const self = this as Record<PropertyKey, unknown>;
    const method = self[context.name];
    if (typeof method === "function") self[context.name] = method.bind(this);
  });
}

class Calculator {
  factor = 2;

  @logged
  multiply(a: number, b: number): number {
    return a * b * this.factor;
  }

  @bound
  double(n: number): number {
    return n * this.factor;
  }
}

const calc = new Calculator();
calc.multiply(3, 4);
// → → multiply(3, 4)
// → ← multiply = 24
const detached = calc.double; // safe to pass around: `this` is bound
console.log([1, 2, 3].map(detached)); // → [ 2, 4, 6 ]
```

**Decorator kinds and their context types**

| Decorated | Context type | May return |
|---|---|---|
| class | `ClassDecoratorContext` | a replacement class |
| method | `ClassMethodDecoratorContext` | a replacement method |
| getter / setter | `ClassGetterDecoratorContext` / `ClassSetterDecoratorContext` | a replacement accessor |
| field | `ClassFieldDecoratorContext` | an initializer function transforming the initial value |
| `accessor` field | `ClassAccessorDecoratorContext` | `{ get, set, init }` replacements |

Every context has `name`, `kind`, `static`, `private` and `addInitializer`. The `accessor` keyword (an auto-accessor) creates a getter/setter pair backed by a private field, which is ideal for validation:

```ts
// Requires compilation with tsc (decorators are not yet supported natively by JavaScript engines)
function clamp(min: number, max: number) {
  return function <This>(
    _target: ClassAccessorDecoratorTarget<This, number>,
    _context: ClassAccessorDecoratorContext<This, number>,
  ): ClassAccessorDecoratorResult<This, number> {
    const limit = (v: number) => Math.min(max, Math.max(min, v));
    return {
      init: (value) => limit(value),
      set(value) {
        _target.set.call(this, limit(value));
      },
    };
  };
}

function registered<T extends abstract new (...args: never[]) => unknown>(target: T, context: ClassDecoratorContext<T>) {
  console.log(`registered class ${String(context.name)}`);
}

@registered
class Speaker {
  @clamp(0, 100) accessor volume = 150;
}
// → registered class Speaker

const speaker = new Speaker();
console.log(speaker.volume); // → 100
speaker.volume = -20;
console.log(speaker.volume); // → 0
```

**Legacy decorators.** Before the standard existed, TypeScript had its own decorator implementation, enabled with `"experimentalDecorators": true` (often with `emitDecoratorMetadata`). Frameworks such as Angular and NestJS were built on it, and you will see it in their code. It has different function signatures (`(target, propertyKey, descriptor)`) and supports parameter decorators, which the standard does not. Don't mix the two; for new code without such a framework, use standard decorators.

**Resource management with `using`.** Resources such as files, database connections, locks and subscriptions must be released even if an error occurs. `try...finally` works but is verbose and easy to forget. The **explicit resource management** feature (supported by TypeScript 5.2+ and by Node.js 24+ natively) adds `using` declarations: when the enclosing block ends — normally or by an exception — the value's `[Symbol.dispose]()` method is called automatically, in reverse order of declaration.

```ts
// Requires Node.js 24+
// With {"lib": ["es2025", "esnext.disposable"]} in tsconfig.json
class TempFile implements Disposable {
  readonly name: string;
  constructor(name: string) {
    this.name = name;
    console.log(`open ${name}`);
  }
  [Symbol.dispose](): void {
    console.log(`delete ${this.name}`);
  }
}

function processFiles(fail: boolean): void {
  using a = new TempFile("a.tmp");
  using b = new TempFile("b.tmp");
  if (fail) throw new Error("processing failed");
  console.log(`working with ${a.name} and ${b.name}`);
} // b is disposed, then a — even when an error was thrown

processFiles(false);
try {
  processFiles(true);
} catch (error) {
  if (error instanceof Error) console.log(error.message);
}
// → open a.tmp
// → open b.tmp
// → working with a.tmp and b.tmp
// → delete b.tmp
// → delete a.tmp
// → open a.tmp
// → open b.tmp
// → delete b.tmp
// → delete a.tmp
// → processing failed
```

- `Disposable` is the interface with `[Symbol.dispose](): void`; `AsyncDisposable` has `[Symbol.asyncDispose](): Promise<void>` and is used with **`await using`** inside async functions or modules.
- **`DisposableStack`** / `AsyncDisposableStack` collect several cleanups (including plain callbacks via `defer`) and dispose them together — useful when resources are acquired conditionally or in a loop.
- To compile `using` for older runtimes, `tsc` can downlevel it (with an older `target`); with type stripping you need a runtime that supports it, and the types require `"esnext.disposable"` (or `"esnext"`) in `lib`.

```ts
// Requires Node.js 24+
// With {"lib": ["es2025", "esnext.disposable"]} in tsconfig.json
async function withConnection(): Promise<void> {
  await using connection = {
    async [Symbol.asyncDispose]() {
      await new Promise((resolve) => setTimeout(resolve, 5));
      console.log("connection closed");
    },
  };
  using stack = new DisposableStack();
  stack.defer(() => console.log("cache flushed"));
  stack.defer(() => console.log("lock released"));
  console.log("querying");
}

await withConnection();
// → querying
// → lock released
// → cache flushed
// → connection closed
```

### Practice task

Write two files.

**`decorators.ts`** (compile with `tsc`):

1. A method decorator factory `retry(times: number)` that re-invokes an `async` method up to `times` additional times when it rejects, logging `retry <n> for <method>` before each retry.
2. A method decorator `timed` that logs `<method> took <ms>ms` — round to the nearest **100 ms** so the output is stable.
3. An accessor decorator factory `validate(predicate: (v: string) => boolean, message: string)` that throws `TypeError(message)` when an invalid value is assigned (including the initial value).
4. Apply them to a class `Client` with `@validate((v) => v.startsWith("https://"), "Insecure URL") accessor baseUrl = "https://api.example.com";` and a method `@retry(2) @timed async fetchData(): Promise<string>` that fails on its first two calls (use an instance counter) and waits 100 ms before resolving `"data"` on the third.

Demonstrate: call `fetchData()` and print the result; then try to set `baseUrl = "http://insecure"` and print the error message.

**`resources.ts`** (Node.js 24+): write a function `openLock(name: string): Disposable` that logs `lock <name>` and, on dispose, `unlock <name>`. In `transfer()`, acquire locks `"from"` and `"to"` with `using`, log `transferring`, and return. Call it and log `done`.

### Expected result

`decorators.ts` (after compiling) prints — the order of decorators matters; `@timed` is applied first, so it measures each attempt:

```text
fetchData took 0ms
retry 1 for fetchData
fetchData took 0ms
retry 2 for fetchData
fetchData took 100ms
data
Insecure URL
```

`resources.ts` prints:

```text
lock from
lock to
transferring
unlock to
unlock from
done
```

### Acceptance criteria

- [ ] Decorators use the standard signatures with `ClassMethodDecoratorContext` / `ClassAccessorDecoratorContext` (no `experimentalDecorators`).
- [ ] Decorators are generic over `This` and the method/value types, without `any`.
- [ ] `retry` and `timed` preserve the method's arguments and return type.
- [ ] The `validate` decorator also checks the initial value (`init`).
- [ ] Locks are released in reverse order by `using`, without `try...finally`.
- [ ] Both outputs match exactly.

<details>
<summary>Reference solution</summary>

```ts
// Requires compilation with tsc (decorators are not yet supported natively by JavaScript engines)
type AsyncMethod<This, Args extends unknown[], R> = (this: This, ...args: Args) => Promise<R>;

function retry(times: number) {
  return function <This, Args extends unknown[], R>(
    target: AsyncMethod<This, Args, R>,
    context: ClassMethodDecoratorContext<This, AsyncMethod<This, Args, R>>,
  ): AsyncMethod<This, Args, R> {
    return async function (this: This, ...args: Args): Promise<R> {
      for (let attempt = 0; ; attempt++) {
        try {
          return await target.call(this, ...args);
        } catch (error) {
          if (attempt >= times) throw error;
          console.log(`retry ${attempt + 1} for ${String(context.name)}`);
        }
      }
    };
  };
}

function timed<This, Args extends unknown[], R>(
  target: AsyncMethod<This, Args, R>,
  context: ClassMethodDecoratorContext<This, AsyncMethod<This, Args, R>>,
): AsyncMethod<This, Args, R> {
  return async function (this: This, ...args: Args): Promise<R> {
    const start = performance.now();
    try {
      return await target.call(this, ...args);
    } finally {
      const ms = Math.round((performance.now() - start) / 100) * 100;
      console.log(`${String(context.name)} took ${ms}ms`);
    }
  };
}

function validate(predicate: (v: string) => boolean, message: string) {
  return function <This>(
    target: ClassAccessorDecoratorTarget<This, string>,
    _context: ClassAccessorDecoratorContext<This, string>,
  ): ClassAccessorDecoratorResult<This, string> {
    const check = (value: string): string => {
      if (!predicate(value)) throw new TypeError(message);
      return value;
    };
    return {
      init: check,
      set(value) {
        target.set.call(this, check(value));
      },
    };
  };
}

class Client {
  @validate((v) => v.startsWith("https://"), "Insecure URL")
  accessor baseUrl = "https://api.example.com";

  #calls = 0;

  @retry(2)
  @timed
  async fetchData(): Promise<string> {
    this.#calls++;
    if (this.#calls < 3) throw new Error(`attempt ${this.#calls} failed`);
    await new Promise((resolve) => setTimeout(resolve, 100));
    return "data";
  }
}

const client = new Client();
console.log(await client.fetchData());
try {
  client.baseUrl = "http://insecure";
} catch (error) {
  if (error instanceof Error) console.log(error.message);
}
// → fetchData took 0ms
// → retry 1 for fetchData
// → fetchData took 0ms
// → retry 2 for fetchData
// → fetchData took 100ms
// → data
// → Insecure URL
```

```ts
// Requires Node.js 24+
function openLock(name: string): Disposable {
  console.log(`lock ${name}`);
  return {
    [Symbol.dispose]() {
      console.log(`unlock ${name}`);
    },
  };
}

function transfer(): void {
  using from = openLock("from");
  using to = openLock("to");
  console.log("transferring");
}

transfer();
console.log("done");
// → lock from
// → lock to
// → transferring
// → unlock to
// → unlock from
// → done
```

Decorators are applied bottom-up: `@timed` wraps the original method first, then `@retry` wraps the timed version, so each attempt is timed separately.

</details>

---

## 3.8 Runtime Validation with Inferred Types

**Goal:** Close the gap between compile-time types and runtime data by building a small schema library whose validators *infer* their TypeScript types, and understand how libraries such as Zod and Valibot work.

### Explanation

Types are erased at run time (1.1), so data from outside — HTTP requests and responses, files, environment variables, `localStorage`, message queues — must be **validated**. Writing type guards by hand (2.6) works, but you then maintain two things that must agree: the `interface` and the guard. **Schema libraries** solve this by making the validator the single source of truth and *deriving* the type from it.

Here is a complete miniature version, using techniques from this level (generics, conditional types with `infer`, mapped types, `const` type parameters, result types):

```ts
type Issue = { path: string; message: string };
type Result<T> = { ok: true; value: T } | { ok: false; issues: Issue[] };

interface Schema<T> {
  parse(input: unknown, path?: string): Result<T>;
}

type Infer<S> = S extends Schema<infer T> ? T : never;

const ok = <T>(value: T): Result<T> => ({ ok: true, value });
const fail = (path: string, message: string): Result<never> => ({ ok: false, issues: [{ path, message }] });

const s = {
  string: (): Schema<string> => ({
    parse: (input, path = "$") => (typeof input === "string" ? ok(input) : fail(path, "expected string")),
  }),

  number: (): Schema<number> => ({
    parse: (input, path = "$") =>
      typeof input === "number" && Number.isFinite(input) ? ok(input) : fail(path, "expected number"),
  }),

  literal: <const L extends string | number | boolean>(literal: L): Schema<L> => ({
    parse: (input, path = "$") => (input === literal ? ok(literal) : fail(path, `expected ${JSON.stringify(literal)}`)),
  }),

  optional: <T>(inner: Schema<T>): Schema<T | undefined> => ({
    parse: (input, path = "$") => (input === undefined ? ok(undefined) : inner.parse(input, path)),
  }),

  array: <T>(item: Schema<T>): Schema<T[]> => ({
    parse(input, path = "$") {
      if (!Array.isArray(input)) return fail(path, "expected array");
      const values: T[] = [];
      const issues: Issue[] = [];
      input.forEach((element: unknown, i) => {
        const r = item.parse(element, `${path}[${i}]`);
        if (r.ok) values.push(r.value);
        else issues.push(...r.issues);
      });
      return issues.length ? { ok: false, issues } : ok(values);
    },
  }),

  object: <Shape extends Record<string, Schema<unknown>>>(shape: Shape): Schema<{ [K in keyof Shape]: Infer<Shape[K]> }> => ({
    parse(input, path = "$") {
      if (typeof input !== "object" || input === null || Array.isArray(input)) return fail(path, "expected object");
      const record = input as Record<string, unknown>;
      const value: Record<string, unknown> = {};
      const issues: Issue[] = [];
      for (const [key, schema] of Object.entries(shape)) {
        const r = schema.parse(record[key], `${path}.${key}`);
        if (r.ok) value[key] = r.value;
        else issues.push(...r.issues);
      }
      return issues.length ? { ok: false, issues } : ok(value as { [K in keyof Shape]: Infer<Shape[K]> });
    },
  }),
};

// One definition...
const UserSchema = s.object({
  id: s.number(),
  name: s.string(),
  role: s.literal("admin"),
  tags: s.array(s.string()),
  nickname: s.optional(s.string()),
});

// ...gives you the type:
type User = Infer<typeof UserSchema>;
//   ^? type User = { id: number; name: string; role: "admin"; tags: string[]; nickname: string | undefined; }

// ...and the validator:
const good = UserSchema.parse(JSON.parse('{"id":1,"name":"Ana","role":"admin","tags":["ts"]}'));
if (good.ok) console.log(good.value.name, good.value.tags); // → Ana [ 'ts' ]

const bad = UserSchema.parse({ id: "1", name: "Ben", role: "user", tags: ["a", 2] });
if (!bad.ok) {
  for (const issue of bad.issues) console.log(`${issue.path}: ${issue.message}`);
}
// → $.id: expected number
// → $.role: expected "admin"
// → $.tags[1]: expected string
```

How the inference works:

1. Each schema constructor returns a `Schema<T>` with a specific `T` (`s.string()` → `Schema<string>`, `s.literal("admin")` → `Schema<"admin">` thanks to the `const` type parameter).
2. `s.object` receives the shape object; its type parameter `Shape` captures every property's schema type.
3. The mapped type `{ [K in keyof Shape]: Infer<Shape[K]> }` turns each `Schema<X>` back into `X` via the conditional type `Infer`, which uses `infer`.
4. Inside the implementation, a few assertions build the object; the *public* types are exact.

Our version makes optional properties `nickname: string | undefined` (a required key whose value may be `undefined`); real libraries also make the key itself optional (`nickname?: string`), using an extra mapped type that splits optional and required keys.

**In practice, use a library.** Mature options include **Zod**, **Valibot** (small bundle size), **ArkType** and **TypeBox** (JSON-Schema compatible). Many implement the shared *Standard Schema* interface, so frameworks can accept any of them. A Zod version of the schema above looks almost identical:

```ts
import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  role: z.literal("admin"),
  tags: z.array(z.string()),
  nickname: z.string().optional(),
});
type User = z.infer<typeof UserSchema>;

const result = UserSchema.safeParse(data); // { success: true, data } | { success: false, error }
```

**Where to validate:** at every *boundary* where untyped data enters your program — request handlers, API clients, config loading, `JSON.parse` of stored data, message consumers. After validation, the rest of your code can trust the types completely.

### Practice task

Extend the mini schema library from the explanation (copy it into `schema.ts`):

1. `s.boolean()`.
2. `s.enumOf<const T extends readonly string[]>(values: T): Schema<T[number]>` — accepts only one of the given strings; the issue message is `expected one of a|b|c`.
3. `s.union<A, B>(a: Schema<A>, b: Schema<B>): Schema<A | B>` — tries `a`, then `b`; on failure returns `b`'s issues.
4. A `refine<T>(schema: Schema<T>, check: (value: T) => boolean, message: string): Schema<T>` combinator for extra rules.
5. A helper `parseOrThrow<T>(schema: Schema<T>, input: unknown): T` that throws an `Error` whose message lists all issues as `path: message`, joined with `; `.

Define:

```ts
const OrderSchema = s.object({
  id: refine(s.number(), (n) => Number.isInteger(n) && n > 0, "expected positive integer"),
  status: s.enumOf(["pending", "paid", "shipped"]),
  express: s.boolean(),
  coupon: s.union(s.string(), s.literal(false)),
  items: s.array(s.object({ sku: s.string(), qty: refine(s.number(), (n) => n >= 1, "expected at least 1") })),
});
type Order = Infer<typeof OrderSchema>;
```

Parse this JSON array (each element separately) and print `OK #<id> <status> <item count> item(s)` or `ERROR <message>`:

```ts
const payloads = `[
  {"id": 1, "status": "paid", "express": false, "coupon": false, "items": [{"sku": "pen", "qty": 2}]},
  {"id": -4, "status": "lost", "express": "no", "coupon": 10, "items": [{"sku": "pad", "qty": 0}]}
]`;
```

### Expected result

No type errors; hovering `Order` shows `status: "paid" | "pending" | "shipped"`, `coupon: string | false` and `items: { sku: string; qty: number; }[]`; and:

```text
OK #1 paid 1 item(s)
ERROR $.id: expected positive integer; $.status: expected one of pending|paid|shipped; $.express: expected boolean; $.coupon: expected false; $.items[0].qty: expected at least 1
```

### Acceptance criteria

- [ ] `Order` is never written by hand; it is inferred with `Infer`.
- [ ] `enumOf` uses a `const` type parameter so the result is a union of literals.
- [ ] `union` and `refine` are generic and keep precise types.
- [ ] All issues are collected (not just the first), with correct paths.
- [ ] The parsed payload is `unknown` until validated; no `any` anywhere.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
type Issue = { path: string; message: string };
type Result<T> = { ok: true; value: T } | { ok: false; issues: Issue[] };
interface Schema<T> {
  parse(input: unknown, path?: string): Result<T>;
}
type Infer<S> = S extends Schema<infer T> ? T : never;

const ok = <T>(value: T): Result<T> => ({ ok: true, value });
const fail = (path: string, message: string): Result<never> => ({ ok: false, issues: [{ path, message }] });

const s = {
  string: (): Schema<string> => ({
    parse: (input, path = "$") => (typeof input === "string" ? ok(input) : fail(path, "expected string")),
  }),
  number: (): Schema<number> => ({
    parse: (input, path = "$") =>
      typeof input === "number" && Number.isFinite(input) ? ok(input) : fail(path, "expected number"),
  }),
  boolean: (): Schema<boolean> => ({
    parse: (input, path = "$") => (typeof input === "boolean" ? ok(input) : fail(path, "expected boolean")),
  }),
  literal: <const L extends string | number | boolean>(literal: L): Schema<L> => ({
    parse: (input, path = "$") => (input === literal ? ok(literal) : fail(path, `expected ${JSON.stringify(literal)}`)),
  }),
  enumOf: <const T extends readonly string[]>(values: T): Schema<T[number]> => ({
    parse(input, path = "$") {
      const match = values.find((v) => v === input);
      return match !== undefined ? ok(match) : fail(path, `expected one of ${values.join("|")}`);
    },
  }),
  union: <A, B>(a: Schema<A>, b: Schema<B>): Schema<A | B> => ({
    parse(input, path = "$") {
      const first = a.parse(input, path);
      return first.ok ? first : b.parse(input, path);
    },
  }),
  array: <T>(item: Schema<T>): Schema<T[]> => ({
    parse(input, path = "$") {
      if (!Array.isArray(input)) return fail(path, "expected array");
      const values: T[] = [];
      const issues: Issue[] = [];
      input.forEach((element: unknown, i) => {
        const r = item.parse(element, `${path}[${i}]`);
        if (r.ok) values.push(r.value);
        else issues.push(...r.issues);
      });
      return issues.length ? { ok: false, issues } : ok(values);
    },
  }),
  object: <Shape extends Record<string, Schema<unknown>>>(shape: Shape): Schema<{ [K in keyof Shape]: Infer<Shape[K]> }> => ({
    parse(input, path = "$") {
      if (typeof input !== "object" || input === null || Array.isArray(input)) return fail(path, "expected object");
      const record = input as Record<string, unknown>;
      const value: Record<string, unknown> = {};
      const issues: Issue[] = [];
      for (const [key, schema] of Object.entries(shape)) {
        const r = schema.parse(record[key], `${path}.${key}`);
        if (r.ok) value[key] = r.value;
        else issues.push(...r.issues);
      }
      return issues.length ? { ok: false, issues } : ok(value as { [K in keyof Shape]: Infer<Shape[K]> });
    },
  }),
};

function refine<T>(schema: Schema<T>, check: (value: T) => boolean, message: string): Schema<T> {
  return {
    parse(input, path = "$") {
      const r = schema.parse(input, path);
      if (!r.ok) return r;
      return check(r.value) ? r : fail(path, message);
    },
  };
}

function parseOrThrow<T>(schema: Schema<T>, input: unknown): T {
  const r = schema.parse(input);
  if (r.ok) return r.value;
  throw new Error(r.issues.map((i) => `${i.path}: ${i.message}`).join("; "));
}

const OrderSchema = s.object({
  id: refine(s.number(), (n) => Number.isInteger(n) && n > 0, "expected positive integer"),
  status: s.enumOf(["pending", "paid", "shipped"]),
  express: s.boolean(),
  coupon: s.union(s.string(), s.literal(false)),
  items: s.array(s.object({ sku: s.string(), qty: refine(s.number(), (n) => n >= 1, "expected at least 1") })),
});
type Order = Infer<typeof OrderSchema>;
//   ^? type Order = { id: number; status: "paid" | "pending" | "shipped"; express: boolean; coupon: string | false; items: { sku: string; qty: number; }[]; }

const payloads = `[
  {"id": 1, "status": "paid", "express": false, "coupon": false, "items": [{"sku": "pen", "qty": 2}]},
  {"id": -4, "status": "lost", "express": "no", "coupon": 10, "items": [{"sku": "pad", "qty": 0}]}
]`;

const parsed: unknown = JSON.parse(payloads);
for (const payload of Array.isArray(parsed) ? parsed : []) {
  try {
    const order: Order = parseOrThrow(OrderSchema, payload);
    console.log(`OK #${order.id} ${order.status} ${order.items.length} item(s)`);
  } catch (error) {
    if (error instanceof Error) console.log(`ERROR ${error.message}`);
  }
}
```

`union` reports only the second schema's issues on failure, which is why `coupon` says `expected false`; real libraries report the issues of every branch.

</details>

---

## 3.9 Configuration, Strictness and Scaling Up

**Goal:** Choose compiler options deliberately, use the extra strictness flags beyond `strict`, structure large code bases with project references, keep type-checking fast, test types, and migrate JavaScript projects to TypeScript gradually.

### Explanation

**What `strict` includes.** `"strict": true` (the default since TypeScript 6) enables a family of checks: `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, `strictBuiltinIteratorReturn`, `noImplicitThis`, `useUnknownInCatchVariables` and `alwaysStrict`. Never turn it off in new code.

**Extra strictness flags** catch more bugs and are worth enabling in new projects:

| Flag | Catches |
|---|---|
| `noUncheckedIndexedAccess` | unchecked `array[i]` / `record[key]` reads (already in our config) |
| `exactOptionalPropertyTypes` | assigning `undefined` explicitly to an optional property (`x?: T` means "missing or `T`", not "`T \| undefined`") |
| `noImplicitOverride` | overriding a base method without the `override` keyword |
| `noImplicitReturns` | functions where some code paths don't `return` |
| `noFallthroughCasesInSwitch` | non-empty `case` blocks that fall through without `break`/`return` |
| `noPropertyAccessFromIndexSignature` | `obj.key` on index signatures (forces `obj["key"]`, making dynamic access visible) |
| `noUnusedLocals`, `noUnusedParameters` | dead code (often left to a linter instead) |

Examples of what they report:

```ts
// With {"exactOptionalPropertyTypes": true} in tsconfig.json
interface Options {
  title?: string;
}

const a: Options = {};               // fine: property missing
// @ts-expect-error -- Type 'undefined' is not assignable to type 'string'.
const b: Options = { title: undefined };

console.log("title" in a); // → false
```

This distinction matters because `"title" in options` and `Object.keys(options)` behave differently for a missing property and a property set to `undefined`.

```ts
// With {"noImplicitReturns": true, "noFallthroughCasesInSwitch": true, "noPropertyAccessFromIndexSignature": true} in tsconfig.json
type Level = "low" | "high" | "critical";

// @ts-expect-error -- Not all code paths return a value.
function color(level: Level): string | undefined {
  if (level === "low") return "green";
  if (level === "high") return "orange";
}

function score(level: Level): number {
  let points = 0;
  switch (level) {
    // @ts-expect-error -- Fallthrough case in switch.
    case "critical":
      points += 10;
    case "high":
      points += 5;
      break;
    case "low":
      points += 1;
  }
  return points;
}

const env: Record<string, string> = { MODE: "dev" };
// @ts-expect-error -- Property 'MODE' comes from an index signature, so it must be accessed with ['MODE'].
console.log(env.MODE);
console.log(env["MODE"], color("low"), score("critical")); // → dev green 15
```

**Module and runtime settings** depend on where the code runs:

| Situation | Typical settings |
|---|---|
| Node.js, running `.ts` directly | `module: "nodenext"`, `erasableSyntaxOnly`, `verbatimModuleSyntax`, `allowImportingTsExtensions`, `noEmit` (our config) |
| Node.js library compiled with `tsc` | `module: "nodenext"`, `declaration: true`, `outDir`, `rewriteRelativeImportExtensions` |
| Browser app with a bundler (Vite etc.) | `module: "esnext"`, `moduleResolution: "bundler"`, `lib: ["es2025", "dom"]`, `noEmit` (the bundler emits) |
| Code compiled file by file by other tools (esbuild, SWC, Babel) | `isolatedModules: true` (implied by `verbatimModuleSyntax`) |

TypeScript 6 changed defaults (`strict: true`, `module: "esnext"`, `target` = latest, `types: []`) and deprecated old options; **TypeScript 7 removed** `target: "es5"`, `moduleResolution: "node"`/`"node10"`/`"classic"`, `module: "amd"`/`"umd"`/`"systemjs"`/`"none"`, `baseUrl`, `outFile`, and `esModuleInterop: false`. Old configs using these must be updated (3.10).

**Project references** split a large code base into separately compiled projects (for example `packages/core`, `packages/web`, `packages/server`) with explicit dependencies:

```json
{
  "files": [],
  "references": [{ "path": "./packages/core" }, { "path": "./packages/web" }]
}
```

Each referenced project has `"composite": true` and its own `tsconfig.json`. `tsc --build` (`tsc -b`) then builds projects in dependency order and only rebuilds what changed. TypeScript 7 builds independent projects in parallel (`--builders`) and type-checks with multiple threads (`--checkers`, default 4).

**Keeping type-checking fast**

- Measure first: `tsc --extendedDiagnostics` prints time and memory per phase; `tsc --generateTrace <dir>` shows which files and types are slow.
- Prefer `interface extends` over long intersections of object types.
- Give exported functions explicit return types (also required by `isolatedDeclarations`), so the compiler doesn't re-infer them across files.
- Avoid enormous unions (thousands of members) and deeply recursive types in hot paths.
- Keep `skipLibCheck: true`.
- With TypeScript 7's native compiler, most projects check around ten times faster than before; if you still need the JavaScript-based compiler API (some editor plugins and tools do), TypeScript 6 remains available as `@typescript/typescript6`.

**Testing types.** Type-level code (3.1–3.4) and public API signatures deserve tests. Options: the `Equal`/`Expect` helpers from 3.1 compiled with `tsc`; `@ts-expect-error` lines asserting that misuse fails; the `expect-type` library; or Vitest's `expectTypeOf(value).toEqualTypeOf<...>()`. Prefer `@ts-expect-error` over `@ts-ignore`: the former fails when the error disappears, so stale suppressions get noticed.

**Migrating JavaScript to TypeScript** works best gradually:

1. Add a `tsconfig.json` with `"allowJs": true` (and initially `"strict": false` if needed), so `.js` and `.ts` files coexist.
2. Optionally enable `"checkJs": true` to type-check JavaScript files using inference and **JSDoc** annotations — useful even if you never rename files:

        ```js
   // @ts-check
   /** @param {number[]} values @returns {number} */
   export function average(values) {
   return values.reduce((a, b) => a + b, 0) / values.length;
   }
    ```

3. Rename files to `.ts` one module at a time, starting from the leaves of the dependency graph (utilities first), adding types as you go.
4. Turn on `strict` (possibly flag by flag), then the extra flags above.

### Practice task

The following code compiles with the recommended configuration but hides several bugs. Save it as `strictness.ts`, then add these options to `tsconfig.json`: `exactOptionalPropertyTypes`, `noImplicitOverride`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noPropertyAccessFromIndexSignature`. Fix every reported error **by fixing the code**, not by removing flags or adding assertions, so that the program prints the expected output.

```ts
interface User {
  name: string;
  nickname?: string;
}

class Greeter {
  greet(user: User): string {
    return `Hello, ${user.nickname ?? user.name}`;
  }
}

class LoudGreeter extends Greeter {
  greet(user: User): string {
    return super.greet(user).toUpperCase() + "!";
  }
}

function priority(tag: "bug" | "feature" | "chore"): number {
  let score = 0;
  switch (tag) {
    case "bug":
      score += 2;
    case "feature":
      score += 1;
      break;
    case "chore":
      score += 0;
  }
  return score;
}

function label(n: number): string | undefined {
  if (n > 1) return "urgent";
  if (n === 1) return "normal";
}

const counts: Record<string, number> = { open: 3, closed: 5 };
function clearNickname(user: User): User {
  return { ...user, nickname: undefined };
}

const ana = clearNickname({ name: "Ana", nickname: "Nana" });
console.log(new LoudGreeter().greet(ana));
console.log(label(priority("bug")), label(priority("feature")), label(priority("chore")));
console.log((counts.open ?? 0) + (counts.closed ?? 0));
console.log(Object.keys(ana));
```

Run it first. It prints `HELLO, ANA!`, `urgent normal undefined`, `8` and `[ 'name', 'nickname' ]`. The last two lines reveal the bugs: a `chore` gets no label, and the "cleared" user still has a `nickname` key. The intended fixes after enabling the flags:

- `clearNickname` must *omit* `nickname` instead of setting it to `undefined`;
- `LoudGreeter.greet` needs `override`;
- the `"bug"` case must not fall through — a bug scores exactly 2;
- `label` must return a `string` on every path (`"low"` for 0);
- `counts.open` must use bracket access, handling a possibly missing key.

### Expected result

With all five flags enabled, `npx tsc` reports no errors, and the program prints:

```text
HELLO, ANA!
urgent normal low
8
[ 'name' ]
```

### Acceptance criteria

- [ ] All five flags are enabled and the file compiles with no `@ts-expect-error`, `as` or `!`.
- [ ] `clearNickname` returns an object without a `nickname` key (`Object.keys` shows only `name`).
- [ ] `priority("bug")` returns 2 (no fall-through).
- [ ] `label` handles every input and its return type is `string`.
- [ ] Index-signature properties are accessed with brackets and missing keys are handled.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
// With {"exactOptionalPropertyTypes": true, "noImplicitOverride": true, "noImplicitReturns": true, "noFallthroughCasesInSwitch": true, "noPropertyAccessFromIndexSignature": true} in tsconfig.json
interface User {
  name: string;
  nickname?: string;
}

class Greeter {
  greet(user: User): string {
    return `Hello, ${user.nickname ?? user.name}`;
  }
}

class LoudGreeter extends Greeter {
  override greet(user: User): string {
    return super.greet(user).toUpperCase() + "!";
  }
}

function priority(tag: "bug" | "feature" | "chore"): number {
  switch (tag) {
    case "bug":
      return 2;
    case "feature":
      return 1;
    case "chore":
      return 0;
  }
}

function label(n: number): string {
  if (n > 1) return "urgent";
  if (n === 1) return "normal";
  return "low";
}

const counts: Record<string, number> = { open: 3, closed: 5 };

function clearNickname(user: User): User {
  const { nickname: _removed, ...rest } = user;
  return rest;
}

const ana = clearNickname({ name: "Ana", nickname: "Nana" });
console.log(new LoudGreeter().greet(ana)); // → HELLO, ANA!
console.log(label(priority("bug")), label(priority("feature")), label(priority("chore"))); // → urgent normal low
console.log((counts["open"] ?? 0) + (counts["closed"] ?? 0)); // → 8
console.log(Object.keys(ana)); // → [ 'name' ]
```

</details>

---

## 3.10 Modern TypeScript: 5.0 to 7.0

**Goal:** Know what each recent TypeScript release added, use the newer checks and features confidently, and modernise legacy TypeScript code and configuration.

### Explanation

TypeScript releases a new minor version roughly every three months. Since 5.0, the project has also prepared and shipped the **native compiler**: TypeScript 6.0 (March 2026) was the last JavaScript-based release, changing defaults and deprecating legacy options; **TypeScript 7.0** (July 2026) is the Go-based compiler, roughly ten times faster, with those deprecated options removed. Read the release notes on the [TypeScript blog](https://devblogs.microsoft.com/typescript/) when you upgrade.

**Feature map** (✱ = covered earlier in this curriculum)

| Version | Highlights |
|---|---|
| **5.0** | standard decorators ✱, `const` type parameters ✱, `moduleResolution: "bundler"` ✱, `verbatimModuleSyntax` ✱, `export type *` |
| **5.1** | functions returning `undefined` need no `return`, unrelated types for getters and setters |
| **5.2** | `using` / `await using` ✱, decorator metadata |
| **5.3** | import attributes (`with { type: "json" }`), `switch (true)` narrowing |
| **5.4** | narrowing preserved in closures after the last assignment, `NoInfer` ✱, `Object.groupBy` types |
| **5.5** | inferred type predicates ✱, narrowing of constant indexed access (`obj[key]`), regular expression syntax checking, `isolatedDeclarations` ✱ |
| **5.6** | errors for always-truthy/always-nullish checks, iterator helper types, `noUncheckedSideEffectImports` |
| **5.7** | errors for never-initialised variables, `rewriteRelativeImportExtensions` ✱, `target`/`lib` `es2024` |
| **5.8** | `erasableSyntaxOnly` ✱, `require()` of ES modules under `nodenext`, checks for each branch of conditional `return` expressions |
| **5.9** | `import defer`, `module: "node20"`, a minimal `tsc --init`, expandable hovers |
| **6.0** | new defaults (`strict`, `module: "esnext"`, `target: "es2025"`, `types: []`), deprecations, `stableTypeOrdering`, Temporal and `RegExp.escape` types |
| **7.0** | native (Go) compiler and language server, parallel checking and builds, removal of deprecated options, stable union ordering |

Examples of newer checks and narrowing you may not have met yet:

```ts
// 5.3: switch (true) narrows like an if/else chain
function describe(value: string | number | boolean): string {
  switch (true) {
    case typeof value === "string":
      return `string of ${value.length}`;
    case typeof value === "number":
      return value.toFixed(1);
    default:
      return value ? "yes" : "no";
  }
}

// 5.4: narrowing survives into closures created after the last assignment
function makeGreeter(name: string | undefined) {
  if (name === undefined) name = "anonymous";
  return () => name.toUpperCase(); // name: string here (before 5.4: string | undefined)
}

// 5.5: narrowing on obj[key] when key is a constant
function lookup(record: Record<string, number | undefined>, key: string): number {
  if (typeof record[key] === "number") return record[key] * 2;
  return 0;
}

// 5.6: conditions that are always truthy are errors
function checkPattern(input: string): boolean {
  // @ts-expect-error -- This kind of expression is always truthy.
  if (/^\d+$/) {
    return true;
  }
  return /^\d+$/.test(input);
}

// 5.7: reading a variable that is never assigned is an error
function report(): string {
  let total: number;
  // @ts-expect-error -- Variable 'total' is used before being assigned.
  return `total: ${total}`;
}

console.log(describe("abc"), describe(2), describe(false)); // → string of 3 2.0 no
console.log(makeGreeter(undefined)(), lookup({ a: 21 }, "a")); // → ANONYMOUS 42
```

TypeScript 5.5 also checks the syntax of regular expression *literals*: a typo such as `/(?<year>\d{4})-\k<yeer>/` is reported at compile time (*"There is no capturing group named 'yeer' in this regular expression"*) instead of throwing a `SyntaxError` when the module loads. (That's also why it can't appear in a runnable example: an invalid regex literal stops the whole file from loading.)

**Modernising legacy TypeScript.** Code written for older TypeScript versions often uses constructs that are now discouraged or unavailable:

| Legacy | Modern replacement |
|---|---|
| `namespace App { export const x = 1; }` (code inside namespaces) | ES modules |
| `module Foo { }` (namespace declared with `module`) | `namespace Foo { }` — the `module` keyword form is an error in 7.0 |
| `enum Color { Red }` | a literal union or an `as const` object (1.8) |
| `<User>data` angle-bracket assertions | `data as User` (works in `.tsx` files too) — or better, validation |
| `constructor(private x: number)` parameter properties | explicit field declarations (when using type stripping) |
| `import x = require("x")` | `import x from "x"` / `import * as x from "x"` |
| `catch (e: any)` | `catch (e)` with `unknown` and narrowing (2.7) |
| `"target": "es5"`, `"moduleResolution": "node"`, `"baseUrl"`, `"esModuleInterop": false`, `"outFile"` | removed in 7.0: use `es2025`, `nodenext`/`bundler`, relative `paths`, the default interop, and a bundler |

### Practice task

Modernise this legacy TypeScript program. It compiles with `tsc` today (it needs compilation because of the namespace, enum and parameter properties), but uses every legacy pattern in the table:

```ts
// Requires compilation with tsc (namespaces with code, enums and parameter properties are not erasable)
namespace Shop {
  export enum Category {
    Food,
    Tools,
  }

  export class Product {
    constructor(public name: string, public price: number, private category: Category) {}

    describe(): string {
      return this.name + " (" + Category[this.category] + "): " + this.price.toFixed(2);
    }

    isFood(): boolean {
      return this.category === Category.Food;
    }
  }

  export function parse(json: string): Product[] {
    const data = <{ name: string; price: number; category: number }[]>JSON.parse(json);
    return data.map((d) => new Product(d.name, d.price, d.category));
  }
}

try {
  const products = Shop.parse('[{"name":"Apple","price":0.5,"category":0},{"name":"Hammer","price":12,"category":1}]');
  for (const p of products) console.log(p.describe());
  console.log(products.filter((p) => p.isFood()).length);
  Shop.parse("not json");
} catch (e: any) {
  console.log("Failed: " + e.name);
}
```

Rewrite it so that it runs with `node shop.ts` under the recommended configuration (with `erasableSyntaxOnly`):

- replace the namespace with plain module-level declarations;
- replace the enum with an `as const` object `Category` and a derived `type Category`, keeping the same printed names;
- replace parameter properties with explicit fields (use `#category` for the private one);
- replace the angle-bracket assertion with real validation that throws `TypeError("Invalid product data")`, using a type guard;
- use template literals and a `catch` without `any`.

### Expected result

The original (compiled with `tsc`) and your version (run with `node shop.ts`) both print:

```text
Apple (Food): 0.50
Hammer (Tools): 12.00
1
Failed: SyntaxError
```

### Acceptance criteria

- [ ] No `namespace`, `enum`, parameter properties, angle-bracket assertions or `any`.
- [ ] The file passes `npx tsc` with `erasableSyntaxOnly` and runs with `node shop.ts`.
- [ ] `Category` is both a runtime object and a type derived from it; the printed category names are unchanged.
- [ ] `parse` validates its input with a type guard instead of asserting.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
const Category = { Food: "Food", Tools: "Tools" } as const;
type Category = (typeof Category)[keyof typeof Category];

const CATEGORY_BY_CODE: readonly Category[] = [Category.Food, Category.Tools];

class Product {
  name: string;
  price: number;
  #category: Category;

  constructor(name: string, price: number, category: Category) {
    this.name = name;
    this.price = price;
    this.#category = category;
  }

  describe(): string {
    return `${this.name} (${this.#category}): ${this.price.toFixed(2)}`;
  }

  isFood(): boolean {
    return this.#category === Category.Food;
  }
}

type ProductData = { name: string; price: number; category: number };

function isProductData(value: unknown): value is ProductData {
  return (
    typeof value === "object" && value !== null &&
    "name" in value && typeof value.name === "string" &&
    "price" in value && typeof value.price === "number" &&
    "category" in value && typeof value.category === "number"
  );
}

function parse(json: string): Product[] {
  const data: unknown = JSON.parse(json);
  if (!Array.isArray(data) || !data.every(isProductData)) {
    throw new TypeError("Invalid product data");
  }
  return data.map((d) => {
    const category = CATEGORY_BY_CODE[d.category];
    if (category === undefined) throw new TypeError("Invalid product data");
    return new Product(d.name, d.price, category);
  });
}

try {
  const products = parse('[{"name":"Apple","price":0.5,"category":0},{"name":"Hammer","price":12,"category":1}]');
  for (const p of products) console.log(p.describe());
  console.log(products.filter((p) => p.isFood()).length);
  parse("not json");
} catch (error) {
  if (error instanceof Error) console.log(`Failed: ${error.name}`);
}
// → Apple (Food): 0.50
// → Hammer (Tools): 12.00
// → 1
// → Failed: SyntaxError
```

</details>

---

## Advanced Milestone Project: Type-Safe Event Bus and Router

**Goal:** Design a small library whose public API is fully type-safe, using generics, mapped and conditional types, template literal types with `infer`, `const` type parameters, discriminated unions, variadic tuples and private class fields.

### Task

Write `app.ts` containing two pieces of infrastructure and a demo that connects them.

**1. `EventBus<Events>`** — a class generic over an *event map* such as `{ ready: undefined; navigate: RouteMatch; notFound: { url: string } }`:

- `on<K extends keyof Events>(name: K, handler: (payload: Events[K]) => void): () => void` — returns an unsubscribe function.
- `once<K extends keyof Events>(name: K, handler: (payload: Events[K]) => void): void`.
- `emit<K extends keyof Events>(name: K, ...args: Events[K] extends undefined ? [] : [payload: Events[K]]): void` — events whose payload type is `undefined` are emitted **without** an argument; all others require exactly the right payload.
- Handlers are stored in a private `Map`.

**2. `createRouter(routes)`** — takes a constant object mapping route names to path patterns (use a `const` type parameter), e.g.

```ts
const router = createRouter({
  home: "/",
  user: "/users/:id",
  post: "/users/:userId/posts/:postId",
});
```

and returns:

- `href(name, ...params)` — the params argument is required, with exactly the right keys (values `string | number`), only when the route has parameters; e.g. `href("home")`, `href("post", { userId: 1, postId: "a" })`.
- `match(url: string): RouteMatch | null` — where `RouteMatch` is a **discriminated union** generated from the routes: `{ name: "home"; params: {} } | { name: "user"; params: { id: string } } | …`. Export the type through a helper, e.g. `type MatchOf<R> = …`.

**3. Demo:** create a bus with events `ready: undefined`, `navigate: MatchOf<typeof routes>` and `notFound: { url: string }`. Subscribe a `navigate` handler that `switch`es on `match.name` (exhaustively) and logs a description; a `notFound` handler; and a `once` handler for `ready`. Then:

- emit `ready` twice;
- for each of the URLs `href("home")`, `href("user", { id: 42 })`, `href("post", { userId: 7, postId: "intro" })` and `"/settings"`, match it and emit `navigate` or `notFound`;
- unsubscribe the `navigate` handler and navigate to `href("user", { id: 1 })` again (nothing should be logged).

### Expected result

No type errors, no `any`, and:

```text
app ready
home page
user 42
post intro by user 7
404: /settings
```

The following must all be compile errors (show them with `@ts-expect-error`):

- `bus.emit("ready", 1)`;
- `bus.emit("notFound")`;
- `router.href("user")`;
- `router.href("post", { userId: 1 })`;
- `router.href("contact")`;
- inside the `navigate` handler, reading `match.params.id` without first checking `match.name`.

### Acceptance criteria

- [ ] `EventBus` is generic over the event map, and payload types follow from the event name in `on`, `once` and `emit`.
- [ ] `emit` uses a conditional rest-parameter tuple so payload-less events take no argument.
- [ ] Route parameter names are extracted from the path strings with template literal types and `infer`.
- [ ] `RouteMatch` is generated from the routes object with a mapped type indexed by its keys — no hand-written route types.
- [ ] The `navigate` handler's `switch` is exhaustive (adding a route makes it fail to compile until handled).
- [ ] All listed misuse cases are compile errors.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```ts
// ---------- event bus ----------
type Handler<P> = (payload: P) => void;

class EventBus<Events extends Record<string, unknown>> {
  #handlers = new Map<keyof Events, Set<Handler<never>>>();

  on<K extends keyof Events>(name: K, handler: Handler<Events[K]>): () => void {
    const set = this.#handlers.get(name) ?? new Set<Handler<never>>();
    set.add(handler);
    this.#handlers.set(name, set);
    return () => {
      set.delete(handler);
    };
  }

  once<K extends keyof Events>(name: K, handler: Handler<Events[K]>): void {
    const off = this.on(name, (payload) => {
      off();
      handler(payload);
    });
  }

  emit<K extends keyof Events>(name: K, ...args: Events[K] extends undefined ? [] : [payload: Events[K]]): void {
    const payload = args[0] as Events[K];
    for (const handler of [...(this.#handlers.get(name) ?? [])]) {
      (handler as Handler<Events[K]>)(payload);
    }
  }
}

// ---------- router ----------
type ParamNames<Path extends string> =
  Path extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ParamNames<`/${Rest}`>
    : Path extends `${string}:${infer Param}`
      ? Param
      : never;

type ParamsOf<Path extends string> = { [K in ParamNames<Path>]: string };

type MatchOf<R extends Record<string, string>> = {
  [N in keyof R & string]: { name: N; params: ParamsOf<R[N]> };
}[keyof R & string];

type HrefArgs<Path extends string> = [ParamNames<Path>] extends [never]
  ? []
  : [params: Record<ParamNames<Path>, string | number>];

function createRouter<const R extends Record<string, string>>(routes: R) {
  const compiled = Object.entries(routes).map(([name, path]) => {
    const keys: string[] = [];
    const source = path.replace(/:(\w+)/g, (_, key: string) => {
      keys.push(key);
      return "([^/]+)";
    });
    return { name, keys, regex: new RegExp(`^${source}$`) };
  });

  return {
    href<N extends keyof R & string>(name: N, ...args: HrefArgs<R[N]>): string {
      const params: Record<string, string | number> = args[0] ?? {};
      const path = routes[name];
      if (path === undefined) throw new Error(`Unknown route: ${name}`);
      return path.replace(/:(\w+)/g, (_, key: string) => encodeURIComponent(String(params[key])));
    },

    match(url: string): MatchOf<R> | null {
      for (const route of compiled) {
        const result = route.regex.exec(url);
        if (result) {
          const params: Record<string, string> = {};
          route.keys.forEach((key, i) => {
            params[key] = decodeURIComponent(result[i + 1] ?? "");
          });
          return { name: route.name, params } as MatchOf<R>;
        }
      }
      return null;
    },
  };
}

// ---------- demo ----------
const routes = {
  home: "/",
  user: "/users/:id",
  post: "/users/:userId/posts/:postId",
} as const;

const router = createRouter(routes);
type RouteMatch = MatchOf<typeof routes>;

type AppEvents = {
  ready: undefined;
  navigate: RouteMatch;
  notFound: { url: string };
};

const bus = new EventBus<AppEvents>();

function assertNever(value: never): never {
  throw new Error(`Unhandled route: ${JSON.stringify(value)}`);
}

const offNavigate = bus.on("navigate", (match) => {
  switch (match.name) {
    case "home":
      console.log("home page");
      break;
    case "user":
      console.log(`user ${match.params.id}`);
      break;
    case "post":
      console.log(`post ${match.params.postId} by user ${match.params.userId}`);
      break;
    default:
      assertNever(match);
  }
});
bus.on("notFound", ({ url }) => console.log(`404: ${url}`));
bus.once("ready", () => console.log("app ready"));

bus.emit("ready");
bus.emit("ready");

function navigate(url: string): void {
  const match = router.match(url);
  if (match) bus.emit("navigate", match);
  else bus.emit("notFound", { url });
}

for (const url of [
  router.href("home"),
  router.href("user", { id: 42 }),
  router.href("post", { userId: 7, postId: "intro" }),
  "/settings",
]) {
  navigate(url);
}

offNavigate();
navigate(router.href("user", { id: 1 }));
// → app ready
// → home page
// → user 42
// → post intro by user 7
// → 404: /settings

function invalidUsage(): void {
  // @ts-expect-error -- Expected 1 arguments, but got 2.
  bus.emit("ready", 1);
  // @ts-expect-error -- Expected 2 arguments, but got 1.
  bus.emit("notFound");
  // @ts-expect-error -- Expected 2 arguments, but got 1.
  router.href("user");
  // @ts-expect-error -- Property 'postId' is missing
  router.href("post", { userId: 1 });
  // @ts-expect-error -- Expected 2 arguments, but got 1.
  router.href("contact"); // unknown route: TypeScript falls back to the constraint and reports the arity
  bus.on("navigate", (match) => {
    // @ts-expect-error -- Property 'id' does not exist on type
    console.log(match.params.id);
  });
}
```

Notice where the assertions are: one in `emit` (connecting the stored handlers to the event's payload type) and one in `match` (asserting that the runtime route table matches the generated union). Everything a *user* of the library touches is checked by the compiler.

</details>

---

## Appendix: Where to Go Next

You now know the TypeScript type system from basic annotations to type-level programming. Natural next steps:

- **Reference:** the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) and the [TSConfig reference](https://www.typescriptlang.org/tsconfig/) are the official documentation. The [TypeScript Playground](https://www.typescriptlang.org/play) lets you experiment with types and see hovers and emitted JavaScript in the browser.
- **Release notes:** follow the [TypeScript blog](https://devblogs.microsoft.com/typescript/) to keep up with each version.
- **Type challenges:** the [type-challenges](https://github.com/type-challenges/type-challenges) repository has hundreds of graded type-level exercises in the style of 3.1–3.4.
- **Linting:** [typescript-eslint](https://typescript-eslint.io/) adds type-aware lint rules (floating promises, unsafe `any` usage, unnecessary conditions).
- **Validation:** learn one schema library well — Zod, Valibot or ArkType (3.8).
- **Frameworks:** React with TypeScript (component props and hooks), Vue, Angular, Svelte, and full-stack frameworks such as Next.js, Nuxt and SvelteKit all use TypeScript as a first-class language. On the server, try Fastify, Hono or NestJS.
- **Library authoring:** publishing packages with correct `exports`, declaration files, and dual browser/Node support is a skill of its own; tools like `tsdown` and `publint` help.
- **Deeper reading:** *Effective TypeScript* (Dan Vanderkam) and *Programming TypeScript* (Boris Cherny).

Above all, **build things in TypeScript**. Take a JavaScript project you wrote, convert it module by module (3.9), and turn on every strict flag.