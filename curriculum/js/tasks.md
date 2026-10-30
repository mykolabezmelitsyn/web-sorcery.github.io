# JavaScript: From Beginner to Advanced

*A self-paced curriculum with explanations, goals, practice tasks, expected results and acceptance criteria for every topic.*

---

## How to Use This Curriculum

The curriculum has three levels. Each level builds on the one before it, and each topic inside a level builds on the topics before it. Work through them in order the first time; afterwards, use the table of contents as a reference.

Every topic follows the same structure:

| Section | What it gives you |
|---|---|
| **Goal** | What you will be able to do when you finish the topic. |
| **Explanation** | The concept, taught from scratch, with runnable examples. |
| **Practice task** | A hands-on exercise that applies the concept. |
| **Expected result** | Exactly what a correct solution prints or does, so you can check your work. |
| **Acceptance criteria** | A checklist. Tick every box before moving on. |
| **Reference solution** | One correct solution, hidden in a collapsible block. Try the task first. |

Each level ends with a **milestone project** that combines its topics.

### Conventions used in the examples

- `// → value` after a line shows what that line prints. Output is shown the way **Node.js** prints it (for example, arrays appear as `[ 1, 2, 3 ]`). Browser consoles show the same values, sometimes with interactive formatting.
- Code blocks marked `js` are complete programs. Copy one into a file such as `example.js` and run `node example.js`, or paste it into a browser's developer console.
- Code blocks that use `import`/`export` or top-level `await` are **ES modules**: save them with the `.mjs` extension (for example `example.mjs`) and run them with `node example.mjs`.
- Code blocks marked `html` are complete web pages. Save them as `page.html` and open the file in a browser.
- Examples were written for, and tested on, **Node.js 22 LTS or newer** and current versions of Chrome, Firefox, Safari and Edge. A few ES2025 features in Topic 3.10 need **Node.js 24+**; they are labelled where they appear.

---

## Table of Contents

**Level 1 — Beginner**

- [1.1 Running JavaScript](#11-running-javascript)
- [1.2 Variables and Constants](#12-variables-and-constants)
- [1.3 Data Types](#13-data-types)
- [1.4 Operators](#14-operators)
- [1.5 Type Conversion and Equality](#15-type-conversion-and-equality)
- [1.6 Strings](#16-strings)
- [1.7 Conditionals](#17-conditionals)
- [1.8 Loops](#18-loops)
- [1.9 Functions](#19-functions)
- [1.10 Arrays](#110-arrays)
- [1.11 Objects](#111-objects)
- [Beginner Milestone Project: Gradebook Report](#beginner-milestone-project-gradebook-report)

**Level 2 — Intermediate**

- [2.1 Scope and Hoisting](#21-scope-and-hoisting)
- [2.2 Closures](#22-closures)
- [2.3 Higher-Order Functions and Array Methods](#23-higher-order-functions-and-array-methods)
- [2.4 Destructuring, Spread and Rest](#24-destructuring-spread-and-rest)
- [2.5 Advanced Strings and Regular Expressions](#25-advanced-strings-and-regular-expressions)
- [2.6 The `this` Keyword](#26-the-this-keyword)
- [2.7 Classes](#27-classes)
- [2.8 Error Handling](#28-error-handling)
- [2.9 Modules](#29-modules)
- [2.10 The DOM](#210-the-dom)
- [2.11 Events](#211-events)
- [2.12 Asynchronous JavaScript and Callbacks](#212-asynchronous-javascript-and-callbacks)
- [2.13 Promises](#213-promises)
- [2.14 async/await](#214-asyncawait)
- [2.15 JSON and the Fetch API](#215-json-and-the-fetch-api)
- [Intermediate Milestone Project: Searchable Book List](#intermediate-milestone-project-searchable-book-list)

**Level 3 — Advanced**

- [3.1 Prototypes and Inheritance](#31-prototypes-and-inheritance)
- [3.2 Property Descriptors, Getters and Immutability](#32-property-descriptors-getters-and-immutability)
- [3.3 Symbols and the Iteration Protocols](#33-symbols-and-the-iteration-protocols)
- [3.4 Generators](#34-generators)
- [3.5 Map, Set, WeakMap and WeakSet](#35-map-set-weakmap-and-weakset)
- [3.6 Proxy and Reflect](#36-proxy-and-reflect)
- [3.7 The Event Loop in Depth](#37-the-event-loop-in-depth)
- [3.8 Memory Management](#38-memory-management)
- [3.9 Performance](#39-performance)
- [3.10 Modern JavaScript: ES2015 to ES2025](#310-modern-javascript-es2015-to-es2025)
- [Advanced Milestone Project: Task Queue Library](#advanced-milestone-project-task-queue-library)

- [Appendix: Where to Go Next](#appendix-where-to-go-next)

---
# Level 1 — Beginner

This level assumes no programming experience. By the end you will be able to write small programs that store data, make decisions, repeat work, and organise code into functions, arrays and objects.

---

## 1.1 Running JavaScript

**Goal:** Run JavaScript code in Node.js and in a web browser, and print values with `console.log`.

### Explanation

JavaScript is a programming language. A **program** is a list of instructions, called **statements**, that the computer carries out from top to bottom. JavaScript programs need an **engine** to run them. Two environments contain one:

1. **Web browsers** (Chrome, Firefox, Safari, Edge). Every browser has a JavaScript engine, because JavaScript is the language that makes web pages interactive.
2. **Node.js**, a program you install on your computer that runs JavaScript outside the browser. It is used for servers, command-line tools and build tools. Download the "LTS" version from [nodejs.org](https://nodejs.org).

The most important tool while learning is `console.log(...)`. It prints whatever you put between the parentheses:

```js
console.log("Hello, world!"); // → Hello, world!
console.log(2 + 3);           // → 5
```

A few rules of the language you can see already:

- Text is written inside quotes: `"Hello"` or `'Hello'`. Text is called a **string**.
- Statements end with a semicolon `;`. JavaScript can often insert missing semicolons automatically, but writing them yourself avoids rare surprises.
- Anything after `//` on a line is a **comment**. The engine ignores it. Comments spanning several lines go between `/*` and `*/`.

```js
// This is a single-line comment.
/*
  This is a
  multi-line comment.
*/
console.log("Comments are ignored"); // → Comments are ignored
```

**Running code in Node.js.** Save the code in a file called `hello.js`, open a terminal in that folder and run:

```bash
node hello.js
```

**Running code in a browser.** Create an HTML file. The `<script>` element holds JavaScript, and its output appears in the browser's developer console (open it with F12, or Cmd+Option+J on a Mac, and choose the *Console* tab).

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My first script</title>
  </head>
  <body>
    <h1>Open the developer console</h1>
    <script>
      console.log("Hello from the browser!");
    </script>
  </body>
</html>
```

You can also type JavaScript straight into the browser console, or into Node's interactive mode (run `node` with no file name; type `.exit` to leave). This is called a **REPL** (Read–Eval–Print Loop) and is handy for quick experiments.

When something goes wrong, the engine prints an **error message** with the file name and line number. Read it carefully: it almost always tells you what went wrong and where.

### Practice task

Create a file `intro.js` that prints three lines: your name, the result of `7 * 6`, and the sentence `JavaScript is running!`. Add a comment above each line explaining what it does. Run the file with Node.js, then copy the same code into a `<script>` element in an HTML page and check the browser console.

### Expected result

Running `node intro.js` prints exactly three lines (your name will differ):

```text
Ada
42
JavaScript is running!
```

The browser console shows the same three lines when the HTML page is opened.

### Acceptance criteria

- [ ] Node.js is installed and `node --version` prints a version number.
- [ ] `intro.js` runs with `node intro.js` without errors.
- [ ] The output contains the three lines in the right order.
- [ ] Each line of code has a comment above it.
- [ ] The same code runs in a browser page and appears in the developer console.
- [ ] You can explain what `console.log` does and what a comment is.

<details>
<summary>Reference solution</summary>

```js
// Print my name
console.log("Ada");
// Print the result of a multiplication
console.log(7 * 6);
// Print a confirmation message
console.log("JavaScript is running!");
```

</details>

---

## 1.2 Variables and Constants

**Goal:** Store values in named variables using `let` and `const`, update them, and choose good names.

### Explanation

A **variable** is a named box that holds a value. You create (declare) a variable with a keyword, a name, and usually an initial value:

```js
let score = 10;
const playerName = "Mia";

console.log(score);      // → 10
console.log(playerName); // → Mia
```

The `=` sign means **assignment**: "put the value on the right into the variable on the left". It does not mean "is equal to".

**`let` versus `const`:**

- `let` declares a variable you can **reassign** later.
- `const` declares a **constant**: once it has a value, you cannot assign it a different one. It must be given a value immediately.

```js
let lives = 3;
lives = 2;            // fine: let can be reassigned
lives = lives - 1;    // read the current value, subtract 1, store the result
console.log(lives);   // → 1

const maxLives = 3;
// maxLives = 5;      // TypeError: Assignment to constant variable.
console.log(maxLives); // → 3
```

**Rule of thumb:** use `const` by default. Switch to `let` only when you know the value has to change. This makes code easier to read, because a reader knows a `const` will never point to something else.

**`var`.** Older code uses a third keyword, `var`. It has confusing rules (covered in [2.1 Scope and Hoisting](#21-scope-and-hoisting)), so modern code does not use it. Recognise it, but write `let` and `const`.

**Declaring without a value.** A `let` variable declared without a value holds the special value `undefined` until something is assigned:

```js
let city;
console.log(city); // → undefined
city = "Lisbon";
console.log(city); // → Lisbon
```

**Naming rules.** A name may contain letters, digits, `_` and `$`, but cannot start with a digit, and cannot be a reserved word such as `let`, `if` or `class`. Names are **case-sensitive**: `score` and `Score` are different variables.

**Naming conventions** (not enforced, but followed by almost all JavaScript code):

- `camelCase` for variables and functions: `totalPrice`, `userAge`.
- `UPPER_SNAKE_CASE` for fixed configuration values known before the program runs: `MAX_RETRIES`.
- Descriptive names: `daysUntilDeadline` is better than `d`.

You can declare a variable only once in the same block. Declaring `let score` twice is a `SyntaxError`.

### Practice task

Write `wallet.js`. Declare a constant `ownerName` and a variable `balance` starting at `100`. Then simulate three events by reassigning `balance`: spend `30`, receive `45`, spend `12.5`. After each event, print a line in the form `Balance: <value>`. Finally print `<ownerName> has <balance> left`.

### Expected result

```text
Balance: 70
Balance: 115
Balance: 102.5
Sam has 102.5 left
```

(The name in the last line matches whatever `ownerName` holds.)

### Acceptance criteria

- [ ] `ownerName` is declared with `const`; `balance` is declared with `let`.
- [ ] `balance` is updated by reading its current value (for example `balance = balance - 30`), not by hard-coding the new totals.
- [ ] All four lines print exactly as shown.
- [ ] Trying to reassign `ownerName` produces a `TypeError` (try it, then remove the line).
- [ ] Variable names use camelCase.

<details>
<summary>Reference solution</summary>

```js
const ownerName = "Sam";
let balance = 100;

balance = balance - 30;
console.log("Balance: " + balance); // → Balance: 70

balance = balance + 45;
console.log("Balance: " + balance); // → Balance: 115

balance = balance - 12.5;
console.log("Balance: " + balance); // → Balance: 102.5

console.log(ownerName + " has " + balance + " left"); // → Sam has 102.5 left
```

</details>

---

## 1.3 Data Types

**Goal:** Identify JavaScript's data types, check a value's type with `typeof`, and understand the special values `undefined`, `null` and `NaN`.

### Explanation

Every value in JavaScript has a **type**. There are eight types. Seven are **primitive** (simple, unchangeable values) and one is **object**.

| Type | Example values | Used for |
|---|---|---|
| `number` | `42`, `3.14`, `-7`, `Infinity`, `NaN` | All ordinary numbers, whole or fractional |
| `bigint` | `9007199254740993n` | Whole numbers too large for `number` |
| `string` | `"hello"`, `'a'`, `` `hi` `` | Text |
| `boolean` | `true`, `false` | Yes/no answers |
| `undefined` | `undefined` | "No value has been assigned" |
| `null` | `null` | "Intentionally empty" |
| `symbol` | `Symbol("id")` | Unique identifiers (see 3.3) |
| `object` | `{ name: "Mia" }`, `[1, 2]`, functions | Collections and more complex structures |

The `typeof` operator returns a string naming a value's type:

```js
console.log(typeof 42);          // → number
console.log(typeof 3.14);        // → number
console.log(typeof 10n);         // → bigint
console.log(typeof "hi");        // → string
console.log(typeof true);        // → boolean
console.log(typeof undefined);   // → undefined
console.log(typeof Symbol("x")); // → symbol
console.log(typeof { a: 1 });    // → object
console.log(typeof [1, 2]);      // → object
console.log(typeof null);        // → object
console.log(typeof function () {}); // → function
```

Two results deserve attention:

- `typeof null` is `"object"`. This is a famous bug from the first version of JavaScript that can never be fixed without breaking old websites. To check for `null`, compare directly: `value === null`.
- Functions report `"function"`, even though they are technically objects. Arrays report `"object"`; use `Array.isArray(value)` to detect them.

**Numbers.** JavaScript has a single `number` type for both whole and decimal numbers. It is stored in a 64-bit binary floating-point format, which cannot represent some decimal fractions exactly:

```js
console.log(0.1 + 0.2);                 // → 0.30000000000000004
console.log((0.1 + 0.2).toFixed(2));    // → 0.30
console.log(Number.MAX_SAFE_INTEGER);   // → 9007199254740991
console.log(1 / 0);                     // → Infinity
```

For money, a common practice is to calculate in whole cents (`1999` instead of `19.99`).

**`NaN`** means "Not a Number". It appears when a numeric calculation has no meaningful result. Oddly, its type is `number`, and it is not equal to anything, not even itself. Use `Number.isNaN` to test for it:

```js
const result = 0 / 0;
console.log(result);               // → NaN
console.log(typeof result);        // → number
console.log(result === result);    // → false
console.log(Number.isNaN(result)); // → true
```

**BigInt** handles integers beyond `Number.MAX_SAFE_INTEGER` exactly. Write an `n` after the digits. You cannot mix `bigint` and `number` in arithmetic without converting:

```js
const big = 9007199254740991n + 2n;
console.log(big);          // → 9007199254740993n
console.log(big * 2n);     // → 18014398509481986n
console.log(Number(5n) + 1); // → 6
```

**Booleans** are the answers to yes/no questions. Comparisons produce them:

```js
console.log(5 > 3);  // → true
console.log(5 < 3);  // → false
```

**`undefined` vs `null`.** Both mean "no value", but by convention:

- `undefined` is what JavaScript gives you automatically: a declared variable with no value, a missing object property, a function that returns nothing.
- `null` is what *you* assign deliberately to say "this is empty on purpose".

```js
let middleName;
console.log(middleName); // → undefined

let selectedItem = null; // nothing selected yet, on purpose
console.log(selectedItem); // → null
```

**Primitives are immutable.** You cannot change a primitive value itself; you can only make a variable hold a different value. For example, string methods return *new* strings; they never modify the original. Objects, by contrast, can be modified (Topic 1.11).

### Practice task

Write `types.js`. Create an array of values to inspect:

```js
const values = [42, "42", true, null, undefined, 7n, NaN, [1, 2], { a: 1 }];
```

You don't need a loop yet (loops come in Topic 1.8): write one `console.log` per value that prints the value's type using `typeof`. Then add special-case checks that print:

1. whether `values[3]` is `null` (use `===`),
2. whether `values[6]` is `NaN` (use `Number.isNaN`),
3. whether `values[7]` is an array (use `Array.isArray`).

(`values[3]` means "the item at position 3, counting from 0". Arrays are covered in Topic 1.10.)

### Expected result

```text
number
string
boolean
object
undefined
bigint
number
object
object
true
true
true
```

### Acceptance criteria

- [ ] All nine `typeof` lines print the values shown, in order.
- [ ] The `null` check uses `=== null`, not `typeof`.
- [ ] The `NaN` check uses `Number.isNaN`, not `===`.
- [ ] The array check uses `Array.isArray`.
- [ ] You can explain why `typeof null` is `"object"` and why `NaN === NaN` is `false`.
- [ ] You can explain the conventional difference between `undefined` and `null`.

<details>
<summary>Reference solution</summary>

```js
const values = [42, "42", true, null, undefined, 7n, NaN, [1, 2], { a: 1 }];

console.log(typeof values[0]); // → number
console.log(typeof values[1]); // → string
console.log(typeof values[2]); // → boolean
console.log(typeof values[3]); // → object
console.log(typeof values[4]); // → undefined
console.log(typeof values[5]); // → bigint
console.log(typeof values[6]); // → number
console.log(typeof values[7]); // → object
console.log(typeof values[8]); // → object

console.log(values[3] === null);         // → true
console.log(Number.isNaN(values[6]));    // → true
console.log(Array.isArray(values[7]));   // → true
```

</details>

---

## 1.4 Operators

**Goal:** Use arithmetic, assignment, comparison and logical operators, and predict the result of expressions that combine them.

### Explanation

An **operator** combines values (called **operands**) to produce a new value. A piece of code that produces a value is an **expression**: `2 + 3` is an expression whose value is `5`.

**Arithmetic operators**

| Operator | Meaning | Example | Result |
|---|---|---|---|
| `+` | addition | `7 + 2` | `9` |
| `-` | subtraction | `7 - 2` | `5` |
| `*` | multiplication | `7 * 2` | `14` |
| `/` | division | `7 / 2` | `3.5` |
| `%` | remainder | `7 % 2` | `1` |
| `**` | exponent | `7 ** 2` | `49` |

```js
console.log(7 / 2);   // → 3.5
console.log(7 % 2);   // → 1   (7 = 2 * 3 + 1)
console.log(2 ** 10); // → 1024
console.log(-7 % 3);  // → -1  (the result has the sign of the left operand)
```

The remainder operator is useful for checking divisibility: `n % 2 === 0` is `true` exactly when `n` is even.

**Precedence.** As in maths, `*`, `/` and `%` are evaluated before `+` and `-`, and `**` before those. Parentheses override the order:

```js
console.log(2 + 3 * 4);   // → 14
console.log((2 + 3) * 4); // → 20
```

When in doubt, add parentheses; they make your intent clear to readers too.

**String concatenation.** If either side of `+` is a string, `+` joins text instead of adding numbers:

```js
console.log("Hello, " + "Ada"); // → Hello, Ada
console.log("Score: " + 10);    // → Score: 10
console.log(1 + 2 + "3");       // → 33  (1 + 2 = 3, then 3 + "3" = "33")
console.log("1" + 2 + 3);       // → 123
```

**Assignment operators** combine an operation with assignment:

```js
let x = 10;
x += 5;  // x = x + 5
x -= 3;  // x = x - 3
x *= 2;  // x = x * 2
x /= 4;  // x = x / 4
x **= 2; // x = x ** 2
console.log(x); // → 36
```

**Increment and decrement.** `x++` adds 1 and `x--` subtracts 1. When used inside a larger expression, the position matters: `x++` (postfix) gives the *old* value, `++x` (prefix) gives the *new* value. To avoid confusion, use them as standalone statements.

```js
let count = 5;
count++;
console.log(count); // → 6
console.log(count++); // → 6  (prints old value, then count becomes 7)
console.log(++count); // → 8  (increments to 8, then prints)
```

**Comparison operators** produce booleans:

| Operator | Meaning |
|---|---|
| `===` | strictly equal (same type **and** same value) |
| `!==` | strictly not equal |
| `>` `<` `>=` `<=` | greater than, less than, and so on |
| `==` `!=` | loosely equal / not equal (converts types first; avoid — see 1.5) |

```js
console.log(5 === 5);    // → true
console.log(5 === "5");  // → false (different types)
console.log(5 !== 8);    // → true
console.log(10 >= 10);   // → true
console.log("apple" < "banana"); // → true (strings compare alphabetically by character code)
```

**Logical operators** combine booleans:

- `&&` (AND): `true` only if both sides are true.
- `||` (OR): `true` if at least one side is true.
- `!` (NOT): flips a boolean.

```js
const age = 25;
const hasTicket = true;
console.log(age >= 18 && hasTicket); // → true
console.log(age < 13 || age > 65);   // → false
console.log(!hasTicket);             // → false
```

`&&` and `||` **short-circuit**: they stop evaluating as soon as the answer is known, and they return one of their operands, not necessarily a boolean. `a || b` returns `a` if `a` is "truthy" (see 1.5), otherwise `b`. `a && b` returns `a` if `a` is "falsy", otherwise `b`.

```js
console.log("" || "default");   // → default
console.log("Ada" || "default"); // → Ada
console.log(0 && "never seen");  // → 0
```

**Nullish coalescing `??`** returns the right side only when the left side is `null` or `undefined`. Unlike `||`, it keeps legitimate values like `0` and `""`:

```js
const volumeSetting = 0;
console.log(volumeSetting || 50); // → 50  (wrong: 0 was a real setting)
console.log(volumeSetting ?? 50); // → 0   (right)
console.log(undefined ?? 50);     // → 50
```

**Logical assignment** (`||=`, `&&=`, `??=`) assigns only when the condition holds:

```js
let username = null;
username ??= "guest";   // assign only if username is null/undefined
console.log(username);  // → guest
```

**The conditional (ternary) operator** `condition ? valueIfTrue : valueIfFalse` chooses between two values:

```js
const temperature = 30;
const message = temperature > 25 ? "hot" : "mild";
console.log(message); // → hot
```

### Practice task

Write `calculator.js`. Given `const a = 17;` and `const b = 5;`, print:

1. the sum, difference, product, quotient and remainder of `a` and `b`, one per line, in the format `17 + 5 = 22`;
2. `a` to the power of 2;
3. whether `a` is even (`true`/`false`) using `%`;
4. whether `a` is between 10 and 20 inclusive, using `&&`;
5. the text `"big"` if `a * b` is greater than 50, otherwise `"small"`, using the ternary operator;
6. the value of `const discount = 0;` combined with `?? 10` and then with `|| 10`, to see the difference.

### Expected result

```text
17 + 5 = 22
17 - 5 = 12
17 * 5 = 85
17 / 5 = 3.4
17 % 5 = 2
289
false
true
big
0
10
```

### Acceptance criteria

- [ ] All eleven lines match exactly.
- [ ] No result is hard-coded; every value is computed from `a`, `b` or `discount`.
- [ ] The evenness check uses `%` and `===`.
- [ ] The range check uses `&&` with `>=` and `<=`.
- [ ] You can explain why `discount ?? 10` gives `0` but `discount || 10` gives `10`.
- [ ] You can predict the output of `"2" + 2 * 2` before running it (answer: `"24"`).

<details>
<summary>Reference solution</summary>

```js
const a = 17;
const b = 5;

console.log(a + " + " + b + " = " + (a + b)); // → 17 + 5 = 22
console.log(a + " - " + b + " = " + (a - b)); // → 17 - 5 = 12
console.log(a + " * " + b + " = " + (a * b)); // → 17 * 5 = 85
console.log(a + " / " + b + " = " + (a / b)); // → 17 / 5 = 3.4
console.log(a + " % " + b + " = " + (a % b)); // → 17 % 5 = 2

console.log(a ** 2);                  // → 289
console.log(a % 2 === 0);             // → false
console.log(a >= 10 && a <= 20);      // → true
console.log(a * b > 50 ? "big" : "small"); // → big

const discount = 0;
console.log(discount ?? 10); // → 0
console.log(discount || 10); // → 10
```

Note the parentheses around `(a + b)`: without them, `"... = " + a + b` would join the digits as text and produce `"175"`.

</details>

---

## 1.5 Type Conversion and Equality

**Goal:** Convert values between types explicitly, predict implicit conversions, know which values are truthy and falsy, and choose `===` over `==`.

### Explanation

JavaScript converts values from one type to another in two ways:

- **Explicit conversion**: you call a function such as `Number(...)` or `String(...)`.
- **Implicit conversion (coercion)**: an operator converts values automatically, such as `"5" * 2`.

**Converting to a number**

```js
console.log(Number("42"));     // → 42
console.log(Number("3.5"));    // → 3.5
console.log(Number(""));       // → 0
console.log(Number("  7  ")); // → 7   (surrounding spaces ignored)
console.log(Number("12px"));   // → NaN (the whole string must be numeric)
console.log(Number(true));     // → 1
console.log(Number(null));     // → 0
console.log(Number(undefined)); // → NaN
```

`parseInt` and `parseFloat` read a number from the *start* of a string and stop at the first invalid character. Always pass the radix (base) `10` to `parseInt`:

```js
console.log(parseInt("12px", 10));   // → 12
console.log(parseFloat("3.75kg"));   // → 3.75
console.log(parseInt("abc", 10));    // → NaN
```

**Converting to a string**

```js
console.log(String(42));        // → 42
console.log(String(null));      // → null
console.log((255).toString(16)); // → ff  (base 16)
console.log(typeof String(42));  // → string
```

**Converting to a boolean: truthy and falsy.** Whenever JavaScript needs a boolean (in an `if`, or with `!`, `&&`, `||`), it converts the value. Exactly these values become `false`; they are called **falsy**:

`false`, `0`, `-0`, `0n`, `""` (empty string), `null`, `undefined`, `NaN`

**Every other value is truthy**, including `"0"`, `"false"`, `" "` (a space), `[]` (empty array) and `{}` (empty object).

```js
console.log(Boolean(0));        // → false
console.log(Boolean(""));       // → false
console.log(Boolean("0"));      // → true
console.log(Boolean([]));       // → true
console.log(Boolean({}));       // → true
console.log(!!"hello");         // → true  (double NOT is a common shorthand for Boolean())
```

**Implicit conversion with operators.** `+` prefers strings (if either side is a string, it concatenates). The other arithmetic operators always convert to numbers:

```js
console.log("5" + 2);  // → 52
console.log("5" - 2);  // → 3
console.log("5" * "2"); // → 10
console.log(+"8");     // → 8   (unary plus converts to number)
console.log(true + 1); // → 2
```

**Equality: `===` vs `==`.**

- `===` (strict equality) compares **without** conversion. Different types are never equal.
- `==` (loose equality) **converts** the values first using a complicated set of rules.

```js
console.log(0 === "0");          // → false
console.log(0 == "0");           // → true
console.log(0 == "");            // → true
console.log("0" == "");          // → false  (so == is not even transitive!)
console.log(null == undefined);  // → true
console.log(null === undefined); // → false
```

Because `==` produces surprises like these, **always use `===` and `!==`**. The single accepted exception in some codebases is `value == null`, which is a shortcut for "`value` is `null` or `undefined`". Writing `value === null || value === undefined` is clearer for beginners.

**Comparing objects.** `===` on objects (including arrays) checks whether both sides are the *same object in memory*, not whether they look alike:

```js
const listA = [1, 2];
const listB = [1, 2];
const listC = listA;
console.log(listA === listB); // → false (two different arrays)
console.log(listA === listC); // → true  (same array)
```

**`Object.is`** is like `===` but treats `NaN` as equal to itself and distinguishes `0` from `-0`. You will rarely need it.

```js
console.log(Object.is(NaN, NaN)); // → true
console.log(Object.is(0, -0));    // → false
```

### Practice task

Write `convert.js` that processes form-like input stored as strings:

```js
const ageInput = "29";
const heightInput = "1.82m";
const quantityInput = "";
const nicknameInput = "0";
```

Print:

1. `ageInput` converted with `Number`, then that number plus 1;
2. `heightInput` converted with `Number` (observe the result) and with `parseFloat`;
3. `quantityInput` converted with `Number` — then decide on a safer approach: print `"missing"` if the input string is empty, otherwise the number (use a ternary);
4. whether `nicknameInput` is truthy (use `Boolean`);
5. the results of `ageInput == 29` and `ageInput === 29`.

### Expected result

```text
29
30
NaN
1.82
0
missing
true
true
false
```

### Acceptance criteria

- [ ] All nine lines match exactly.
- [ ] Explicit conversion functions (`Number`, `parseFloat`, `Boolean`) are used, not tricks like `*1`.
- [ ] The `"missing"` line is produced by checking `quantityInput === ""`.
- [ ] You can list all eight falsy values from memory.
- [ ] You can explain why `Number("")` returning `0` is dangerous for form input.
- [ ] Your own code uses `===`/`!==` everywhere except where you deliberately demonstrate `==`.

<details>
<summary>Reference solution</summary>

```js
const ageInput = "29";
const heightInput = "1.82m";
const quantityInput = "";
const nicknameInput = "0";

const age = Number(ageInput);
console.log(age);     // → 29
console.log(age + 1); // → 30

console.log(Number(heightInput));     // → NaN
console.log(parseFloat(heightInput)); // → 1.82

console.log(Number(quantityInput)); // → 0
console.log(quantityInput === "" ? "missing" : Number(quantityInput)); // → missing

console.log(Boolean(nicknameInput)); // → true

console.log(ageInput == 29);  // → true
console.log(ageInput === 29); // → false
```

</details>

---

## 1.6 Strings

**Goal:** Create strings with all three quote styles, build text with template literals, and use common string properties and methods.

### Explanation

A **string** is a sequence of characters. There are three ways to write one:

```js
const single = 'single quotes';
const double = "double quotes";
const backtick = `backticks`;
console.log(single, double, backtick); // → single quotes double quotes backticks
```

(`console.log` with several arguments prints them separated by spaces.)

Single and double quotes behave identically; pick one style and stay consistent. **Backticks** create **template literals**, which have two extra powers:

1. **Interpolation**: `${expression}` inserts the value of any expression.
2. **Multi-line text**: line breaks are kept.

```js
const item = "coffee";
const price = 3.5;
const qty = 2;
console.log(`${qty} x ${item} = ${(price * qty).toFixed(2)} EUR`); // → 2 x coffee = 7.00 EUR

const poem = `Roses are red,
Code is too.`;
console.log(poem);
// → Roses are red,
// → Code is too.
```

Template literals are much more readable than joining pieces with `+`, so prefer them whenever you mix text and values.

**Escape sequences** put special characters into strings with a backslash: `\n` (new line), `\t` (tab), `\\` (backslash), `\"` and `\'` (quotes).

```js
console.log("Line 1\nLine 2");
// → Line 1
// → Line 2
console.log('It\'s escaped'); // → It's escaped
```

**Length and characters.** `length` gives the number of characters (strictly, UTF-16 code units — see 2.5). Characters are numbered from **0**. Read one with square brackets or `at()`, which also accepts negative positions counted from the end:

```js
const word = "JavaScript";
console.log(word.length); // → 10
console.log(word[0]);     // → J
console.log(word[4]);     // → S
console.log(word.at(-1)); // → t
console.log(word[99]);    // → undefined
```

**Strings are immutable.** `word[0] = "j"` silently does nothing. Methods never change the original; they **return a new string**:

```js
const shout = "hello";
const louder = shout.toUpperCase();
console.log(shout);  // → hello
console.log(louder); // → HELLO
```

**Common methods**

| Method | What it returns |
|---|---|
| `toUpperCase()`, `toLowerCase()` | the string in a different case |
| `trim()`, `trimStart()`, `trimEnd()` | the string without surrounding whitespace |
| `includes(text)` | `true` if `text` appears anywhere |
| `startsWith(text)`, `endsWith(text)` | `true` if the string begins/ends with `text` |
| `indexOf(text)` | position of the first match, or `-1` |
| `slice(start, end)` | the part from `start` up to (not including) `end`; negatives count from the end |
| `replace(a, b)`, `replaceAll(a, b)` | the string with the first / every `a` replaced by `b` |
| `split(separator)` | an **array** of pieces |
| `padStart(n, ch)`, `padEnd(n, ch)` | the string padded to length `n` |
| `repeat(n)` | the string repeated `n` times |

```js
const raw = "   Learn JavaScript Today   ";
const text = raw.trim();
console.log(text);                       // → Learn JavaScript Today
console.log(text.includes("Script"));    // → true
console.log(text.startsWith("Learn"));   // → true
console.log(text.indexOf("Java"));       // → 6
console.log(text.slice(6, 16));          // → JavaScript
console.log(text.slice(-5));             // → Today
console.log(text.replace("Today", "Now")); // → Learn JavaScript Now
console.log("a-b-c".replaceAll("-", "+"));  // → a+b+c
console.log(text.split(" "));            // → [ 'Learn', 'JavaScript', 'Today' ]
console.log("7".padStart(3, "0"));       // → 007
console.log("=".repeat(10));             // → ==========
```

Methods can be **chained**, because each returns a string you can call another method on:

```js
const input = "  HeLLo WoRLD ";
console.log(input.trim().toLowerCase().replace("world", "there")); // → hello there
```

**Comparing strings** with `<` and `>` compares character codes, so uppercase letters come before lowercase ones (`"Z" < "a"` is `true`). For human-friendly alphabetical comparison use `localeCompare` (see 2.3).

### Practice task

Write `username.js`. Given

```js
const fullName = "  ada LOVELACE ";
const birthYear = 1815;
```

produce and print:

1. the cleaned name in "Title Case": `Ada Lovelace` (trim, split into first and last name, upper-case the first letter of each and lower-case the rest);
2. a username: the lowercase first name, a dot, the lowercase last name, and the last two digits of the birth year: `ada.lovelace15`;
3. the length of the username;
4. a greeting built with a template literal: `Welcome, Ada! Your username is ada.lovelace15.`;
5. the username padded on the right with `.` to 20 characters, followed by `|`.

### Expected result

```text
Ada Lovelace
ada.lovelace15
14
Welcome, Ada! Your username is ada.lovelace15.
ada.lovelace15......|
```

### Acceptance criteria

- [ ] All five lines match exactly.
- [ ] `fullName` itself is never modified (strings are immutable — you create new ones).
- [ ] Title Case uses `slice` (or `at`/`[0]`) plus `toUpperCase`/`toLowerCase`, not hard-coded text.
- [ ] The two digits come from `String(birthYear).slice(-2)` or equivalent.
- [ ] The greeting uses a template literal with `${}`.
- [ ] The code would still work for `"  grace HOPPER "` and `1906` (try it: `Grace Hopper`, `grace.hopper06`).

<details>
<summary>Reference solution</summary>

```js
const fullName = "  ada LOVELACE ";
const birthYear = 1815;

const parts = fullName.trim().split(" ");
const first = parts[0].toLowerCase();
const last = parts[1].toLowerCase();

const titleFirst = first[0].toUpperCase() + first.slice(1);
const titleLast = last[0].toUpperCase() + last.slice(1);
console.log(`${titleFirst} ${titleLast}`); // → Ada Lovelace

const username = `${first}.${last}${String(birthYear).slice(-2)}`;
console.log(username);        // → ada.lovelace15
console.log(username.length); // → 14

console.log(`Welcome, ${titleFirst}! Your username is ${username}.`); // → Welcome, Ada! Your username is ada.lovelace15.
console.log(username.padEnd(20, ".") + "|"); // → ada.lovelace15......|
```

</details>

---

## 1.7 Conditionals

**Goal:** Make decisions with `if`, `else if`, `else`, `switch` and the ternary operator, and write readable conditions using early returns and guard clauses.

### Explanation

Programs often need to do different things depending on data. A **conditional statement** runs a block of code only when a condition is truthy.

**`if` / `else if` / `else`**

```js
const hour = 14;

if (hour < 12) {
  console.log("Good morning");
} else if (hour < 18) {
  console.log("Good afternoon");
} else {
  console.log("Good evening");
}
// → Good afternoon
```

How it works: the conditions are checked from top to bottom. The **first** truthy one runs its block, and the rest are skipped. `else` runs if none matched. Both `else if` and `else` are optional.

A **block** is the code between `{` and `}`. Always use braces, even for one-line blocks; omitting them is legal but a common source of bugs.

**Combining conditions** uses the logical operators from 1.4:

```js
const age = 16;
const withParent = true;

if (age >= 18 || (age >= 13 && withParent)) {
  console.log("Entry allowed");
} else {
  console.log("Entry denied");
}
// → Entry allowed
```

**Truthiness in conditions.** Because `if` converts its condition to a boolean, you can test whether a string is non-empty directly. Be careful with numbers: `0` is falsy.

```js
const nickname = "";
if (nickname) {
  console.log(`Hi, ${nickname}`);
} else {
  console.log("Hi, anonymous"); // → Hi, anonymous
}

const itemsInCart = 0;
if (itemsInCart !== 0) {   // explicit, because 0 is a valid count
  console.log("Checkout available");
} else {
  console.log("Cart is empty"); // → Cart is empty
}
```

**`switch`** compares one value against several cases using `===`. Each case needs a `break`; without it, execution "falls through" into the next case. `default` handles anything unmatched.

```js
const day = "sat";

switch (day) {
  case "sat":
  case "sun":
    console.log("Weekend"); // "sat" falls through to share this block
    break;
  case "fri":
    console.log("Almost weekend");
    break;
  default:
    console.log("Weekday");
}
// → Weekend
```

Use `switch` when you compare one value against many fixed options; use `if` for ranges or complex conditions.

**The ternary operator** (from 1.4) is for choosing between two *values*, not for running statements:

```js
const stock = 3;
const label = stock > 0 ? `${stock} in stock` : "Sold out";
console.log(label); // → 3 in stock
```

Avoid nesting ternaries; they quickly become unreadable. Use `if` instead.

**Lookup objects as an alternative.** When a `switch` only maps inputs to outputs, an object is shorter (objects are explained in 1.11):

```js
const statusText = { 200: "OK", 404: "Not Found", 500: "Server Error" };
const code = 404;
console.log(statusText[code] ?? "Unknown"); // → Not Found
```

**Guard clauses.** Deeply nested `if` statements are hard to read. Inside functions (1.9) you can handle the special cases first and exit early, leaving the main logic un-nested. You will see this pattern throughout the curriculum.

### Practice task

Write `shipping.js`. Given an order

```js
const orderTotal = 72.5;   // in EUR
const country = "PT";      // ISO country code
const isMember = false;
```

compute the shipping cost using these rules, in this order:

1. If `orderTotal` is `0` or less, print `Invalid order` and do nothing else.
2. Members always get free shipping.
3. Otherwise, the base cost depends on the country (use `switch`): `"PT"` and `"ES"` → 4.99; `"FR"` and `"DE"` → 7.99; anything else → 14.99.
4. Orders of 100 EUR or more get the base cost halved.

Print `Shipping: <cost> EUR` with the cost to 2 decimal places, then print `Total: <total> EUR` (order + shipping, 2 decimals). Test with at least these combinations: the values above; `orderTotal = 120, country = "DE"`; `isMember = true`; `country = "US"`; `orderTotal = 0`.

### Expected result

With the given values (`72.5`, `"PT"`, `false`):

```text
Shipping: 4.99 EUR
Total: 77.49 EUR
```

With `orderTotal = 120`, `country = "DE"`, `isMember = false`: `Shipping: 4.00 EUR` and `Total: 124.00 EUR` (7.99 / 2 = 3.995, which `toFixed(2)` rounds to `4.00`).
With `isMember = true` (any country): `Shipping: 0.00 EUR` and `Total: 72.50 EUR`.
With `country = "US"`: `Shipping: 14.99 EUR` and `Total: 87.49 EUR`.
With `orderTotal = 0`: only `Invalid order`.

### Acceptance criteria

- [ ] The country rule is implemented with `switch`, including fall-through for countries sharing a price, and a `default`.
- [ ] The invalid-order check comes first and prevents any further output.
- [ ] Every test combination prints the expected result.
- [ ] Amounts are printed with `toFixed(2)`.
- [ ] Every `if`/`else` block uses braces.
- [ ] There is no nested ternary.

<details>
<summary>Reference solution</summary>

```js
const orderTotal = 72.5;
const country = "PT";
const isMember = false;

if (orderTotal <= 0) {
  console.log("Invalid order");
} else {
  let shipping;

  if (isMember) {
    shipping = 0;
  } else {
    switch (country) {
      case "PT":
      case "ES":
        shipping = 4.99;
        break;
      case "FR":
      case "DE":
        shipping = 7.99;
        break;
      default:
        shipping = 14.99;
    }

    if (orderTotal >= 100) {
      shipping = shipping / 2;
    }
  }

  console.log(`Shipping: ${shipping.toFixed(2)} EUR`); // → Shipping: 4.99 EUR
  console.log(`Total: ${(orderTotal + shipping).toFixed(2)} EUR`); // → Total: 77.49 EUR
}
```

</details>

---

## 1.8 Loops

**Goal:** Repeat work with `for`, `while`, `do...while` and `for...of`, control loops with `break` and `continue`, and avoid infinite loops.

### Explanation

A **loop** runs a block of code repeatedly. Each run is called an **iteration**.

**The `for` loop** is used when you know how many times to repeat. It has three parts in parentheses, separated by semicolons:

```js
for (let i = 1; i <= 5; i++) {
  console.log(`Iteration ${i}`);
}
// → Iteration 1
// → Iteration 2
// → Iteration 3
// → Iteration 4
// → Iteration 5
```

1. **Initialisation** `let i = 1` runs once before the loop starts.
2. **Condition** `i <= 5` is checked before each iteration; the loop stops when it is falsy.
3. **Update** `i++` runs after each iteration.

The variable `i` exists only inside the loop.

**Accumulating a result** is the most common loop pattern: start with an initial value and update it on every iteration.

```js
let sum = 0;
for (let n = 1; n <= 100; n++) {
  sum += n;
}
console.log(sum); // → 5050
```

**The `while` loop** repeats as long as its condition is truthy. Use it when you do not know in advance how many iterations you need:

```js
let balance = 1000;
let years = 0;
while (balance < 2000) {
  balance *= 1.07; // 7% growth per year
  years++;
}
console.log(`Doubled after ${years} years`); // → Doubled after 11 years
```

**`do...while`** is like `while`, but checks the condition *after* the block, so the block always runs at least once:

```js
let attempts = 0;
do {
  attempts++;
  console.log(`Attempt ${attempts}`);
} while (attempts < 2);
// → Attempt 1
// → Attempt 2
```

**`for...of`** loops over the items of anything **iterable**: strings, arrays, and other collections you will meet later. It is the simplest way to visit every item:

```js
for (const letter of "abc") {
  console.log(letter);
}
// → a
// → b
// → c

const colours = ["red", "green", "blue"];
for (const colour of colours) {
  console.log(colour.toUpperCase());
}
// → RED
// → GREEN
// → BLUE
```

Note the `const`: each iteration gets a fresh variable, so `const` works here (unlike a classic `for` loop's counter, which is reassigned).

**`for...in`** loops over the property *names* of an object (covered in 1.11). Do not use it on arrays — use `for...of`.

**`break` and `continue`**

- `break` exits the loop immediately.
- `continue` skips the rest of the current iteration and moves to the next.

```js
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue; // skip even numbers
  }
  if (i > 7) {
    break;    // stop entirely after 7
  }
  console.log(i);
}
// → 1
// → 3
// → 5
// → 7
```

**Nested loops** put one loop inside another. The inner loop completes all its iterations for each iteration of the outer loop:

```js
for (let row = 1; row <= 3; row++) {
  let line = "";
  for (let col = 1; col <= 3; col++) {
    line += `${row * col}\t`;
  }
  console.log(line.trimEnd());
}
// → 1	2	3
// → 2	4	6
// → 3	6	9
```

**Infinite loops.** If the condition never becomes falsy, the loop runs forever and freezes your program (or browser tab). Always make sure something inside the loop moves it toward ending. If it happens in Node.js, press Ctrl+C to stop it.

### Practice task

Write `fizzbuzz.js` — a classic interview exercise. For each number from 1 to 20:

- print `FizzBuzz` if it is divisible by both 3 and 5,
- otherwise `Fizz` if divisible by 3,
- otherwise `Buzz` if divisible by 5,
- otherwise the number itself.

Then, as a second part, use a `while` loop to find the **smallest** number greater than 1000 that is divisible by 7, 11 and 13 at the same time, and print it.

### Expected result

Twenty-one lines: twenty from the first part, then `1001` from the second part (since 7 × 11 × 13 = 1001).

```text
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
16
17
Fizz
19
Buzz
1001
```

### Acceptance criteria

- [ ] Part one uses a `for` loop from 1 to 20.
- [ ] The `FizzBuzz` check comes before the `Fizz` and `Buzz` checks (explain why the order matters).
- [ ] Part two uses a `while` loop and stops as soon as the number is found.
- [ ] The output matches exactly: 21 lines in total.
- [ ] No loop can run forever.

<details>
<summary>Reference solution</summary>

```js
for (let i = 1; i <= 20; i++) {
  if (i % 15 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}

let candidate = 1001;
while (!(candidate % 7 === 0 && candidate % 11 === 0 && candidate % 13 === 0)) {
  candidate++;
}
console.log(candidate); // → 1001
```

The check for 15 (both 3 and 5) must come first: if `Fizz` were checked first, 15 would print `Fizz` and the `else if` chain would never reach `FizzBuzz`.

</details>

---

## 1.9 Functions

**Goal:** Define and call functions using declarations, expressions and arrow syntax; pass arguments with default values; return results; and split a problem into small reusable functions.

### Explanation

A **function** is a named, reusable block of code. You **define** it once and **call** (invoke) it as many times as you like. Functions are the main way to organise programs.

**Function declaration**

```js
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Ada"));   // → Hello, Ada!
console.log(greet("Linus")); // → Hello, Linus!
```

- `name` is a **parameter**: a variable that receives a value when the function is called.
- `"Ada"` is an **argument**: the actual value passed in.
- `return` sends a value back to the caller and **ends** the function immediately.

A function without a `return` (or with a bare `return;`) returns `undefined`.

```js
function logTwice(message) {
  console.log(message);
  console.log(message);
}
const result = logTwice("hi");
// → hi
// → hi
console.log(result); // → undefined
```

**Printing vs returning.** Beginners often confuse these. `console.log` shows a value to a human; `return` hands a value to the rest of the program so it can be used in further calculations. Most functions should *return* values and let the caller decide what to print.

**Multiple parameters and default values**

```js
function price(amount, taxRate = 0.23) {
  return amount * (1 + taxRate);
}
console.log(price(100));       // → 123
console.log(price(100, 0.06)); // → 106
```

If an argument is missing (or explicitly `undefined`), the parameter gets its default value. Without a default it would be `undefined`.

**Function expressions** store a function in a variable:

```js
const square = function (n) {
  return n * n;
};
console.log(square(9)); // → 81
```

**Arrow functions** are a shorter syntax for function expressions:

```js
const cube = (n) => {
  return n * n * n;
};

// If the body is a single expression, drop the braces and `return`:
const double = (n) => n * 2;

// With no parameters, use empty parentheses:
const rollDie = () => Math.floor(Math.random() * 6) + 1;

console.log(cube(3));   // → 27
console.log(double(21)); // → 42
console.log(rollDie() >= 1); // → true
```

(`Math.random()` returns a decimal from 0 up to, but not including, 1; `Math.floor` rounds down. So `rollDie` returns a whole number from 1 to 6.)

Arrow functions differ from regular functions in how they treat `this` (see 2.6). For now, use declarations for named top-level functions and arrows for short helper functions.

**Hoisting of declarations.** Function *declarations* can be called before the line where they are written, because JavaScript processes them first. Function *expressions* and arrows stored in `const` cannot (2.1 explains why).

```js
console.log(add(2, 3)); // → 5
function add(a, b) {
  return a + b;
}
```

**Functions are values.** A function can be stored in a variable, passed as an argument to another function, or returned from a function. A function passed as an argument is called a **callback**:

```js
function applyTwice(fn, value) {
  return fn(fn(value));
}
console.log(applyTwice((x) => x + 10, 5)); // → 25
```

This idea is the foundation of Topics 2.2 and 2.3.

**Early return (guard clauses).** Exit early for special cases so the main logic is not nested:

```js
function divide(a, b) {
  if (b === 0) {
    return null; // guard clause
  }
  return a / b;
}
console.log(divide(10, 4)); // → 2.5
console.log(divide(1, 0));  // → null
```

**Good function design**

- A function should do **one thing**, and its name should say what (`calculateTax`, `isValidEmail`, `formatDate`). Functions returning booleans often start with `is`, `has` or `can`.
- Prefer **pure functions**: their result depends only on their arguments, and they don't change anything outside themselves. They are easy to test and reason about.

### Practice task

Write `temperature.js` with these functions:

1. `celsiusToFahrenheit(c)` returns `c * 9 / 5 + 32`.
2. `fahrenheitToCelsius(f)` returns `(f - 32) * 5 / 9`.
3. `describe(c)` returns `"freezing"` if `c <= 0`, `"cold"` if below 15, `"mild"` if below 25, and `"hot"` otherwise. Use guard-clause style (early `return`s) instead of `else`.
4. `formatReading(c, unit = "C")` returns a string such as `"21.0°C (mild)"` or, when `unit` is `"F"`, `"69.8°F (mild)"`. It must reuse the other functions, and show one decimal place.

Print the results of:
`celsiusToFahrenheit(100)`, `fahrenheitToCelsius(212)`, `describe(-3)`, `describe(30)`, `formatReading(21)`, `formatReading(21, "F")`, `formatReading(8)`.

### Expected result

```text
212
100
freezing
hot
21.0°C (mild)
69.8°F (mild)
8.0°C (cold)
```

### Acceptance criteria

- [ ] Four separate functions exist, each with a descriptive name.
- [ ] All functions **return** values; only the calling code uses `console.log`.
- [ ] `describe` uses early returns with no `else`.
- [ ] `formatReading` has a default parameter and calls both `celsiusToFahrenheit` and `describe` instead of duplicating their logic.
- [ ] At least one function is written as an arrow function.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```js
const celsiusToFahrenheit = (c) => c * 9 / 5 + 32;
const fahrenheitToCelsius = (f) => (f - 32) * 5 / 9;

function describe(c) {
  if (c <= 0) return "freezing";
  if (c < 15) return "cold";
  if (c < 25) return "mild";
  return "hot";
}

function formatReading(c, unit = "C") {
  const value = unit === "F" ? celsiusToFahrenheit(c) : c;
  return `${value.toFixed(1)}°${unit} (${describe(c)})`;
}

console.log(celsiusToFahrenheit(100)); // → 212
console.log(fahrenheitToCelsius(212)); // → 100
console.log(describe(-3));             // → freezing
console.log(describe(30));             // → hot
console.log(formatReading(21));        // → 21.0°C (mild)
console.log(formatReading(21, "F"));   // → 69.8°F (mild)
console.log(formatReading(8));         // → 8.0°C (cold)
```

(A one-statement `if` without braces, as in `describe`, is a widely accepted exception when the statement is a `return` on the same line.)

</details>

---

## 1.10 Arrays

**Goal:** Create arrays, read and change their items, add and remove items, loop over them, and use the most common built-in array methods.

### Explanation

An **array** is an ordered list of values. Write it with square brackets, items separated by commas. Items can be of any type, but usually all items in one array are the same kind of thing.

```js
const fruits = ["apple", "banana", "cherry"];
console.log(fruits);        // → [ 'apple', 'banana', 'cherry' ]
console.log(fruits.length); // → 3
```

**Indexes.** Each item has a position, its **index**, starting at **0**. The last index is always `length - 1`.

```js
const fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]);       // → apple
console.log(fruits[2]);       // → cherry
console.log(fruits.at(-1));   // → cherry (negative indexes count from the end)
console.log(fruits[5]);       // → undefined (no error!)

fruits[1] = "blueberry";      // replace an item
console.log(fruits);          // → [ 'apple', 'blueberry', 'cherry' ]
```

**`const` arrays can still change.** `const` stops the *variable* from being reassigned to a different array; it does not freeze the array's contents. `fruits.push("kiwi")` is allowed, `fruits = []` is not.

**Adding and removing items**

| Method | Effect | Returns |
|---|---|---|
| `push(x)` | adds `x` to the end | new length |
| `pop()` | removes the last item | the removed item |
| `unshift(x)` | adds `x` to the start | new length |
| `shift()` | removes the first item | the removed item |
| `splice(i, n, ...items)` | removes `n` items at index `i` and optionally inserts `items` | array of removed items |

```js
const queue = ["a", "b"];
queue.push("c");
console.log(queue);           // → [ 'a', 'b', 'c' ]
console.log(queue.pop());     // → c
queue.unshift("z");
console.log(queue);           // → [ 'z', 'a', 'b' ]
console.log(queue.shift());   // → z
queue.splice(1, 0, "x", "y"); // at index 1, remove 0 items, insert "x" and "y"
console.log(queue);           // → [ 'a', 'x', 'y', 'b' ]
queue.splice(1, 2);           // at index 1, remove 2 items
console.log(queue);           // → [ 'a', 'b' ]
```

These methods **mutate** (change) the original array.

**Non-mutating methods** return something new and leave the original alone:

```js
const nums = [5, 1, 4, 2, 3];
console.log(nums.includes(4));    // → true
console.log(nums.indexOf(2));     // → 3
console.log(nums.indexOf(99));    // → -1
console.log(nums.slice(1, 3));    // → [ 1, 4 ]   (from index 1 up to, not including, 3)
console.log(nums.concat([6]));    // → [ 5, 1, 4, 2, 3, 6 ]
console.log(nums.join(" | "));    // → 5 | 1 | 4 | 2 | 3
console.log(nums);                // → [ 5, 1, 4, 2, 3 ] (unchanged)
```

**Looping over arrays.** Use `for...of` when you only need the items, a classic `for` loop when you need the index, or `entries()` for both:

```js
const scores = [80, 95, 72];

let total = 0;
for (const score of scores) {
  total += score;
}
console.log(total / scores.length); // → 82.33333333333333

for (let i = 0; i < scores.length; i++) {
  console.log(`#${i + 1}: ${scores[i]}`);
}
// → #1: 80
// → #2: 95
// → #3: 72

for (const [index, score] of scores.entries()) {
  console.log(index, score);
}
// → 0 80
// → 1 95
// → 2 72
```

(The `[index, score]` syntax is *destructuring*, covered fully in 2.4.)

**Sorting.** `sort()` mutates the array and, by default, sorts items **as strings** — which gives wrong results for numbers. Pass a **compare function** that returns a negative number if `a` should come first, positive if `b` should come first, or `0` if equal:

```js
const values = [10, 9, 100, 1];
console.log([...values].sort());                // → [ 1, 10, 100, 9 ]  (string order!)
console.log([...values].sort((a, b) => a - b)); // → [ 1, 9, 10, 100 ]
console.log([...values].sort((a, b) => b - a)); // → [ 100, 10, 9, 1 ]
console.log(values.toSorted((a, b) => a - b));  // → [ 1, 9, 10, 100 ]
console.log(values);                            // → [ 10, 9, 100, 1 ]
```

`[...values]` makes a copy first (the spread syntax, 2.4), so the original is not changed. The newer `toSorted()` does the same in one step; similarly `toReversed()` and `with(index, value)` are non-mutating versions of `reverse()` and index assignment.

**Arrays of arrays** (nested arrays) represent grids or tables:

```js
const grid = [
  [1, 2, 3],
  [4, 5, 6],
];
console.log(grid[1][2]); // → 6 (row 1, column 2)
```

**Copying vs referencing.** Assigning an array to another variable does **not** copy it; both names refer to the same array:

```js
const original = [1, 2, 3];
const alias = original;
alias.push(4);
console.log(original); // → [ 1, 2, 3, 4 ]

const copy = [...original];
copy.push(5);
console.log(original); // → [ 1, 2, 3, 4 ]
console.log(copy);     // → [ 1, 2, 3, 4, 5 ]
```

### Practice task

Write `playlist.js`. Start with

```js
const playlist = ["Intro", "Blue", "Echoes", "Drift"];
```

Then, in order:

1. Add `"Finale"` to the end and `"Overture"` to the start.
2. Replace `"Echoes"` with `"Echoes (Live)"` by finding its index with `indexOf`.
3. Remove `"Blue"` using `indexOf` and `splice`.
4. Print the playlist joined with `" -> "`.
5. Print each track numbered from 1, in the format `1. Overture`.
6. Write a function `longestTitle(tracks)` that returns the longest title (use a loop, not sorting), and print its result.
7. Print an alphabetically sorted **copy** (use `toSorted()`), then print the original to show it is unchanged.

### Expected result

```text
Overture -> Intro -> Echoes (Live) -> Drift -> Finale
1. Overture
2. Intro
3. Echoes (Live)
4. Drift
5. Finale
Echoes (Live)
[ 'Drift', 'Echoes (Live)', 'Finale', 'Intro', 'Overture' ]
[ 'Overture', 'Intro', 'Echoes (Live)', 'Drift', 'Finale' ]
```

### Acceptance criteria

- [ ] `push`, `unshift`, `indexOf` and `splice` are each used at least once.
- [ ] Track numbers start at 1, although indexes start at 0.
- [ ] `longestTitle` is a function that works for any array of strings and returns (not prints) its result.
- [ ] The sorted list is a copy; the final line proves the original order is intact.
- [ ] Output matches exactly.
- [ ] You can explain why `[10, 9, 100, 1].sort()` gives a surprising result.

<details>
<summary>Reference solution</summary>

```js
const playlist = ["Intro", "Blue", "Echoes", "Drift"];

playlist.push("Finale");
playlist.unshift("Overture");

const echoesIndex = playlist.indexOf("Echoes");
playlist[echoesIndex] = "Echoes (Live)";

playlist.splice(playlist.indexOf("Blue"), 1);

console.log(playlist.join(" -> ")); // → Overture -> Intro -> Echoes (Live) -> Drift -> Finale

for (let i = 0; i < playlist.length; i++) {
  console.log(`${i + 1}. ${playlist[i]}`);
}

function longestTitle(tracks) {
  let longest = "";
  for (const track of tracks) {
    if (track.length > longest.length) {
      longest = track;
    }
  }
  return longest;
}
console.log(longestTitle(playlist)); // → Echoes (Live)

console.log(playlist.toSorted()); // → [ 'Drift', 'Echoes (Live)', 'Finale', 'Intro', 'Overture' ]
console.log(playlist);            // → [ 'Overture', 'Intro', 'Echoes (Live)', 'Drift', 'Finale' ]
```

</details>

---

## 1.11 Objects

**Goal:** Model real-world things as objects with properties and methods; read, add, update and delete properties; loop over objects; and work with arrays of objects.

### Explanation

An **object** groups related values under names. Each entry is a **property**: a **key** (name) and a **value**.

```js
const book = {
  title: "Dune",
  author: "Frank Herbert",
  year: 1965,
  available: true,
};
console.log(book.title); // → Dune
console.log(book);
// → { title: 'Dune', author: 'Frank Herbert', year: 1965, available: true }
```

The trailing comma after the last property is allowed and makes adding new lines easier.

**Reading properties.** Use **dot notation** (`book.title`) when you know the name in advance. Use **bracket notation** (`book["title"]`) when the name is stored in a variable or is not a valid identifier:

```js
const book = { title: "Dune", "page count": 412 };
const field = "title";
console.log(book[field]);        // → Dune
console.log(book["page count"]); // → 412
console.log(book.isbn);          // → undefined (missing properties are undefined)
```

**Adding, updating and deleting**

```js
const user = { name: "Kai" };
user.email = "kai@example.com"; // add
user.name = "Kai Tanaka";        // update
delete user.email;               // delete
console.log(user);               // → { name: 'Kai Tanaka' }
```

As with arrays, `const` prevents reassigning `user` but not changing its properties.

**Checking whether a property exists.** A property might exist with the value `undefined`, so checking the value is not always enough. Use `Object.hasOwn` (or the `in` operator):

```js
const settings = { theme: "dark", fontSize: undefined };
console.log(Object.hasOwn(settings, "theme"));    // → true
console.log(Object.hasOwn(settings, "fontSize")); // → true
console.log(Object.hasOwn(settings, "language")); // → false
console.log("theme" in settings);                 // → true
```

**Optional chaining `?.`** safely reads nested properties: if the part before `?.` is `null` or `undefined`, the whole expression returns `undefined` instead of throwing an error.

```js
const order = { customer: { address: { city: "Porto" } } };
const emptyOrder = {};
console.log(order.customer?.address?.city);      // → Porto
console.log(emptyOrder.customer?.address?.city); // → undefined
// emptyOrder.customer.address.city would throw a TypeError
```

**Shorthand properties.** When a variable has the same name as the property, write it once:

```js
const name = "Lena";
const age = 31;
const person = { name, age }; // same as { name: name, age: age }
console.log(person); // → { name: 'Lena', age: 31 }
```

**Computed keys** use an expression in brackets as the key:

```js
const key = "score";
const record = { [key]: 99, [`${key}Date`]: "2026-01-15" };
console.log(record); // → { score: 99, scoreDate: '2026-01-15' }
```

**Methods** are functions stored as properties. Inside a method, `this` refers to the object the method was called on (2.6 covers `this` in depth):

```js
const counter = {
  count: 0,
  increment() {         // method shorthand
    this.count++;
    return this.count;
  },
};
counter.increment();
console.log(counter.increment()); // → 2
```

**Looping over objects.** `Object.keys`, `Object.values` and `Object.entries` return arrays you can loop over with `for...of`:

```js
const stock = { apples: 12, pears: 0, plums: 7 };

console.log(Object.keys(stock));   // → [ 'apples', 'pears', 'plums' ]
console.log(Object.values(stock)); // → [ 12, 0, 7 ]

for (const [fruit, count] of Object.entries(stock)) {
  console.log(`${fruit}: ${count}`);
}
// → apples: 12
// → pears: 0
// → plums: 7
```

`for...in` also visits keys, but it includes inherited properties too (see 3.1), so `Object.keys`/`entries` is the safer default.

**Objects are references.** Like arrays, assigning an object to another variable shares it rather than copying it. To make a shallow copy, use spread syntax (2.4) or `structuredClone` for a deep copy:

```js
const original = { name: "Ada", tags: ["math"] };
const shallow = { ...original };
const deep = structuredClone(original);

shallow.name = "Grace";
shallow.tags.push("code");  // tags array is still shared with original!
deep.tags.push("poetry");

console.log(original); // → { name: 'Ada', tags: [ 'math', 'code' ] }
console.log(deep);     // → { name: 'Ada', tags: [ 'math', 'poetry' ] }
```

**Arrays of objects** are how most real data looks (a list of users, products, messages):

```js
const products = [
  { name: "Pen", price: 1.5 },
  { name: "Notebook", price: 4 },
  { name: "Bag", price: 25 },
];

let cheapest = products[0];
for (const product of products) {
  if (product.price < cheapest.price) {
    cheapest = product;
  }
}
console.log(cheapest.name); // → Pen
```

### Practice task

Write `library.js` modelling a small library:

```js
const library = {
  name: "City Library",
  books: [
    { title: "Dune", author: "Frank Herbert", year: 1965, available: true },
    { title: "Neuromancer", author: "William Gibson", year: 1984, available: false },
    { title: "Kindred", author: "Octavia E. Butler", year: 1979, available: true },
  ],
};
```

Add these **methods** to the `library` object (inside the literal), each using `this.books`:

1. `addBook(title, author, year)` — adds a new available book (use shorthand properties) and returns the new number of books.
2. `findByTitle(title)` — returns the matching book object, or `null` if not found.
3. `checkOut(title)` — if the book exists and is available, marks it unavailable and returns `true`; otherwise returns `false`.
4. `availableTitles()` — returns an array of the titles of available books.

Then run:

```js
console.log(library.addBook("Parable of the Sower", "Octavia E. Butler", 1993));
console.log(library.findByTitle("Kindred")?.author);
console.log(library.findByTitle("Missing")?.author);
console.log(library.checkOut("Dune"));
console.log(library.checkOut("Dune"));
console.log(library.checkOut("Missing"));
console.log(library.availableTitles());
```

Finally, loop over the entries of `library.findByTitle("Kindred")` and print each as `key: value`.

### Expected result

```text
4
Octavia E. Butler
undefined
true
false
false
[ 'Kindred', 'Parable of the Sower' ]
title: Kindred
author: Octavia E. Butler
year: 1979
available: true
```

### Acceptance criteria

- [ ] All four methods are defined inside the object literal using method shorthand and access data through `this`.
- [ ] `addBook` uses shorthand properties `{ title, author, year, available: true }`.
- [ ] `findByTitle` returns `null` (not `undefined`) when nothing matches.
- [ ] `checkOut` refuses to check out a book that is already out.
- [ ] Optional chaining prevents a crash when the title is missing.
- [ ] The last part uses `Object.entries` with `for...of`.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```js
const library = {
  name: "City Library",
  books: [
    { title: "Dune", author: "Frank Herbert", year: 1965, available: true },
    { title: "Neuromancer", author: "William Gibson", year: 1984, available: false },
    { title: "Kindred", author: "Octavia E. Butler", year: 1979, available: true },
  ],

  addBook(title, author, year) {
    this.books.push({ title, author, year, available: true });
    return this.books.length;
  },

  findByTitle(title) {
    for (const book of this.books) {
      if (book.title === title) {
        return book;
      }
    }
    return null;
  },

  checkOut(title) {
    const book = this.findByTitle(title);
    if (book === null || !book.available) {
      return false;
    }
    book.available = false;
    return true;
  },

  availableTitles() {
    const titles = [];
    for (const book of this.books) {
      if (book.available) {
        titles.push(book.title);
      }
    }
    return titles;
  },
};

console.log(library.addBook("Parable of the Sower", "Octavia E. Butler", 1993)); // → 4
console.log(library.findByTitle("Kindred")?.author); // → Octavia E. Butler
console.log(library.findByTitle("Missing")?.author); // → undefined
console.log(library.checkOut("Dune"));    // → true
console.log(library.checkOut("Dune"));    // → false
console.log(library.checkOut("Missing")); // → false
console.log(library.availableTitles());   // → [ 'Kindred', 'Parable of the Sower' ]

for (const [key, value] of Object.entries(library.findByTitle("Kindred"))) {
  console.log(`${key}: ${value}`);
}
// → title: Kindred
// → author: Octavia E. Butler
// → year: 1979
// → available: true
```

</details>

---

## Beginner Milestone Project: Gradebook Report

**Goal:** Combine variables, types, operators, strings, conditionals, loops, functions, arrays and objects into one complete program.

### Task

Write `gradebook.js`. You are given student data:

```js
const students = [
  { name: "Ana", scores: [88, 92, 79] },
  { name: "Ben", scores: [65, 70, 58] },
  { name: "Chloé", scores: [95, 98, 100] },
  { name: "Dev", scores: [] },
];
```

Write these functions:

1. `average(numbers)` — returns the mean of an array of numbers, or `null` for an empty array.
2. `letterGrade(avg)` — returns `"A"` (90+), `"B"` (80+), `"C"` (70+), `"D"` (60+), `"F"` (below 60), or `"N/A"` when `avg` is `null`.
3. `formatRow(name, avg, grade)` — returns a line with the name left-aligned in 8 characters, the average right-aligned in 6 characters with one decimal (or `-` if `null`), two spaces, then the grade.
4. `report(students)` — returns an array of lines: a header `Name       Avg  Grade`, a separator of 21 `-` characters, one row per student, another separator, and a final line `Class average: <x>` computed from the averages of students who have scores (one decimal place).

Print each line of `report(students)`.

### Expected result

```text
Name       Avg  Grade
---------------------
Ana       86.3  B
Ben       64.3  D
Chloé     97.7  A
Dev          -  N/A
---------------------
Class average: 82.8
```

### Acceptance criteria

- [ ] All four functions exist, are pure (they return values and do not print), and are each used.
- [ ] Students without scores are handled without errors and excluded from the class average.
- [ ] Alignment uses `padEnd`/`padStart` rather than hard-coded spaces per student.
- [ ] Output matches exactly, character for character.
- [ ] Adding a fifth student to the array requires no other code changes.

<details>
<summary>Reference solution</summary>

```js
const students = [
  { name: "Ana", scores: [88, 92, 79] },
  { name: "Ben", scores: [65, 70, 58] },
  { name: "Chloé", scores: [95, 98, 100] },
  { name: "Dev", scores: [] },
];

function average(numbers) {
  if (numbers.length === 0) return null;
  let sum = 0;
  for (const n of numbers) {
    sum += n;
  }
  return sum / numbers.length;
}

function letterGrade(avg) {
  if (avg === null) return "N/A";
  if (avg >= 90) return "A";
  if (avg >= 80) return "B";
  if (avg >= 70) return "C";
  if (avg >= 60) return "D";
  return "F";
}

function formatRow(name, avg, grade) {
  const avgText = avg === null ? "-" : avg.toFixed(1);
  return `${name.padEnd(8)}${avgText.padStart(6)}  ${grade}`;
}

function report(students) {
  const separator = "-".repeat(21);
  const lines = ["Name       Avg  Grade", separator];
  const averages = [];

  for (const student of students) {
    const avg = average(student.scores);
    if (avg !== null) {
      averages.push(avg);
    }
    lines.push(formatRow(student.name, avg, letterGrade(avg)));
  }

  lines.push(separator);
  lines.push(`Class average: ${average(averages).toFixed(1)}`);
  return lines;
}

for (const line of report(students)) {
  console.log(line);
}
```

</details>

---
# Level 2 — Intermediate

This level explains *how* JavaScript works under the surface — scope, closures, `this`, and the asynchronous event model — and introduces the tools used in every real project: array methods, classes, error handling, modules, the DOM, events, promises and `fetch`. You should be comfortable with every Beginner topic before starting.

---

## 2.1 Scope and Hoisting

**Goal:** Predict where a variable can be accessed, explain the difference between `var`, `let` and `const` scoping, describe hoisting and the temporal dead zone, and enable strict mode.

### Explanation

**Scope** is the region of code where a variable can be used. JavaScript has three main kinds:

1. **Global scope** — variables declared outside any function or block are visible everywhere.
2. **Function scope** — variables declared inside a function are visible only inside it.
3. **Block scope** — variables declared with `let` or `const` inside `{ ... }` (an `if`, a loop, or a bare block) are visible only inside that block.

```js
const appName = "Notes"; // global

function open() {
  const file = "todo.txt"; // function scope
  if (file) {
    const opened = true;   // block scope
    console.log(appName, file, opened); // → Notes todo.txt true
  }
  console.log(typeof opened); // → undefined (not visible outside the if block)
}
open();
console.log(typeof file); // → undefined (not visible outside the function)
```

**Lexical scope and the scope chain.** "Lexical" means scope is determined by where code is *written*, not where it is called. When a variable is used, JavaScript looks in the current scope; if not found, it looks in the enclosing scope, then the next one out, up to the global scope. This sequence is the **scope chain**. If the name is not found anywhere, a `ReferenceError` is thrown.

```js
const level = "global";

function outer() {
  const level = "outer";
  function inner() {
    console.log(level); // found in outer's scope
  }
  return inner;
}

outer()(); // → outer
```

When an inner scope declares a variable with the same name as an outer one, the inner one **shadows** the outer one inside that scope, as `level` does above.

**`var` is function-scoped, not block-scoped.** This is the main reason modern code avoids it:

```js
if (true) {
  var leaky = "I escape blocks";
  let contained = "I stay inside";
}
console.log(leaky);             // → I escape blocks
console.log(typeof contained);  // → undefined
```

**Hoisting.** Before running a scope, JavaScript registers all declarations in it. This is called **hoisting**, and it behaves differently for each kind of declaration:

| Declaration | Hoisted? | Value before the declaration line |
|---|---|---|
| `function name() {}` | yes, with its body | the whole function (callable) |
| `var x` | yes | `undefined` |
| `let x` / `const x` / `class X` | yes, but uninitialised | accessing it throws `ReferenceError` |

```js
console.log(hoistedVar); // → undefined
var hoistedVar = "now set";
console.log(hoistedVar); // → now set

try {
  console.log(notYet);
} catch (error) {
  console.log(`${error.name}: ${error.message}`); // → ReferenceError: Cannot access 'notYet' before initialization
}
let notYet = 1;
```

The period between the start of the scope and the `let`/`const` line is called the **temporal dead zone (TDZ)**. The TDZ is a feature: it turns "used before set" bugs into immediate errors instead of silent `undefined`s.

**The classic `var` loop bug.** With `var`, there is a single `i` shared by every iteration. With `let`, each iteration gets its own copy:

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i), 0);
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let:", j), 0);
}
// → var: 3
// → var: 3
// → var: 3
// → let: 0
// → let: 1
// → let: 2
```

`setTimeout(fn, 0)` runs `fn` later, after the loop has finished (2.12 explains why). By then the single `var i` is `3`.

**Strict mode.** Writing `"use strict";` as the first statement of a file or function turns on **strict mode**, which turns several silent mistakes into errors. The most important: assigning to an undeclared variable throws instead of silently creating a global.

```js
"use strict";

try {
  undeclaredTotal = 5; // typo or missing let
} catch (error) {
  console.log(error.message); // → undeclaredTotal is not defined
}
```

**ES modules (2.9) and class bodies are always in strict mode**, so in modern code you rarely write the directive yourself.

**Best practices**

- Use `const` by default, `let` when needed, never `var`.
- Declare variables in the smallest scope that needs them.
- Declare before use; don't rely on hoisting except for function declarations.

### Practice task

**Part 1 — predict.** Without running it, write down what this program prints. Then run it and compare.

```js
var x = "global x";
let y = "global y";

function show() {
  console.log(x);
  var x = "local x";
  console.log(x);
  if (true) {
    let y = "block y";
    console.log(y);
  }
  console.log(y);
}

show();
console.log(x);
```

**Part 2 — fix.** This function is supposed to create three greeting functions, but every one of them says `Button 4`. Explain why, then fix it with the smallest possible change, and print the result of calling each function.

```js
function makeButtons() {
  var handlers = [];
  for (var i = 1; i <= 3; i++) {
    handlers.push(function () {
      return "Button " + i;
    });
  }
  return handlers;
}

for (const handler of makeButtons()) {
  console.log(handler());
}
```

### Expected result

Part 1 prints:

```text
undefined
local x
block y
global y
global x
```

The first line is `undefined` (not `global x`) because the local `var x` is hoisted to the top of `show`, shadowing the global `x` before it is assigned.

Part 2, after the fix, prints:

```text
Button 1
Button 2
Button 3
```

### Acceptance criteria

- [ ] Your written prediction for Part 1 matches the real output, or you can explain each line you got wrong.
- [ ] You can explain why line 1 of Part 1 is `undefined`.
- [ ] Part 2 is fixed by changing `var i` to `let i` (one keyword) and you can explain why that works.
- [ ] You can define global, function and block scope and name which keywords create block-scoped variables.
- [ ] You can explain what the temporal dead zone is and which error it produces.

<details>
<summary>Reference solution (Part 2)</summary>

```js
function makeButtons() {
  const handlers = [];
  for (let i = 1; i <= 3; i++) { // let: a new i for every iteration
    handlers.push(function () {
      return "Button " + i;
    });
  }
  return handlers;
}

for (const handler of makeButtons()) {
  console.log(handler());
}
// → Button 1
// → Button 2
// → Button 3
```

With `var`, all three functions share one `i`, which is `4` when the loop ends. With `let`, each iteration has its own `i` that the function remembers (this "remembering" is a closure — the next topic).

</details>

---

## 2.2 Closures

**Goal:** Explain what a closure is, and use closures to create private state, function factories, and utilities such as `once` and `memoize`.

### Explanation

A **closure** is a function together with the variables from the scope in which it was created. Because scope is lexical (2.1), an inner function can use variables from its outer function — and it **keeps access to them even after the outer function has returned**.

```js
function makeGreeter(greeting) {
  return function (name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = makeGreeter("Hello");
const sayHola = makeGreeter("Hola");
console.log(sayHello("Ada")); // → Hello, Ada!
console.log(sayHola("Ada"));  // → Hola, Ada!
```

`makeGreeter` finished running long ago, yet each returned function still knows its own `greeting`. Each call to `makeGreeter` creates a fresh scope, so the two functions do not share state.

**Private state.** Closures are JavaScript's original way to hide data. Nothing outside the factory can touch `count` except through the functions it returns:

```js
function makeCounter() {
  let count = 0;
  return {
    increment() {
      count++;
      return count;
    },
    reset() {
      count = 0;
    },
  };
}

const a = makeCounter();
const b = makeCounter();
a.increment();
a.increment();
console.log(a.increment()); // → 3
console.log(b.increment()); // → 1
console.log(a.count);       // → undefined (count is private)
```

**Closures capture variables, not values.** The inner function sees the variable's *current* value at the moment it runs:

```js
let mood = "happy";
const report = () => `I feel ${mood}`;
mood = "curious";
console.log(report()); // → I feel curious
```

This is why `var` in loops (2.1) produced `Button 4`: all functions captured the same variable.

**Function factories** generate specialised functions:

```js
const makeMultiplier = (factor) => (n) => n * factor;
const double = makeMultiplier(2);
const triple = makeMultiplier(3);
console.log(double(5), triple(5)); // → 10 15
```

**`once`** — a wrapper that lets a function run only the first time:

```js
function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}

const initialise = once(() => {
  console.log("Initialising...");
  return "ready";
});
console.log(initialise()); // → Initialising...
                           // → ready
console.log(initialise()); // → ready
```

(`...args` collects all arguments into an array and `fn(...args)` passes them on; this rest/spread syntax is covered in 2.4.)

**`memoize`** — caches results of an expensive pure function so repeated calls are instant:

```js
function memoize(fn) {
  const cache = {};
  return function (n) {
    if (n in cache) {
      return cache[n];
    }
    const result = fn(n);
    cache[n] = result;
    return result;
  };
}

let calls = 0;
const slowSquare = (n) => {
  calls++;
  return n * n;
};
const fastSquare = memoize(slowSquare);
fastSquare(12);
fastSquare(12);
fastSquare(12);
console.log(fastSquare(12), "computed", calls, "time(s)"); // → 144 computed 1 time(s)
```

(A plain object works as a cache for number or string arguments; 3.5 introduces `Map`, which is better for general keys.)

**Closures and memory.** A closure keeps its captured variables alive as long as the function itself is reachable. This is usually what you want, but holding large data in a long-lived closure can waste memory — see 3.8.

### Practice task

Write `account.js` with a factory function `createAccount(owner, initialBalance = 0)` that returns an object with these methods, keeping `balance` and a `history` array private:

- `deposit(amount)` — adds to the balance, records `"deposit <amount>"` in the history, and returns the new balance. Throws nothing for now; if `amount` is not positive, return the balance unchanged and record nothing.
- `withdraw(amount)` — if `amount` is positive and not more than the balance, subtracts it, records `"withdraw <amount>"` and returns the new balance; otherwise records `"failed withdraw <amount>"` and returns the unchanged balance.
- `getBalance()` — returns the balance.
- `getHistory()` — returns a **copy** of the history array, so callers cannot modify the real one.

Run this script:

```js
const acc = createAccount("Rui", 50);
console.log(acc.deposit(25));
console.log(acc.withdraw(100));
console.log(acc.withdraw(30));
console.log(acc.deposit(-5));
console.log(acc.getBalance());
const h = acc.getHistory();
h.push("hacked");
console.log(acc.getHistory());
console.log(acc.balance);

const other = createAccount("Mei");
console.log(other.getBalance());
```

### Expected result

```text
75
75
45
45
45
[ 'deposit 25', 'failed withdraw 100', 'withdraw 30' ]
undefined
0
```

### Acceptance criteria

- [ ] `balance` and `history` are local variables inside `createAccount`, not properties of the returned object.
- [ ] `acc.balance` is `undefined`; the balance can only change through `deposit`/`withdraw`.
- [ ] Pushing to the array returned by `getHistory()` does not affect the account's history.
- [ ] Two accounts created by the factory do not share state.
- [ ] The default parameter makes `createAccount("Mei")` start at `0`.
- [ ] Output matches exactly.
- [ ] You can explain, in one or two sentences, what a closure is.

<details>
<summary>Reference solution</summary>

```js
function createAccount(owner, initialBalance = 0) {
  let balance = initialBalance;
  const history = [];

  return {
    owner,
    deposit(amount) {
      if (amount <= 0) return balance;
      balance += amount;
      history.push(`deposit ${amount}`);
      return balance;
    },
    withdraw(amount) {
      if (amount <= 0 || amount > balance) {
        history.push(`failed withdraw ${amount}`);
        return balance;
      }
      balance -= amount;
      history.push(`withdraw ${amount}`);
      return balance;
    },
    getBalance() {
      return balance;
    },
    getHistory() {
      return [...history];
    },
  };
}

const acc = createAccount("Rui", 50);
console.log(acc.deposit(25));   // → 75
console.log(acc.withdraw(100)); // → 75
console.log(acc.withdraw(30));  // → 45
console.log(acc.deposit(-5));   // → 45
console.log(acc.getBalance());  // → 45
const h = acc.getHistory();
h.push("hacked");
console.log(acc.getHistory());  // → [ 'deposit 25', 'failed withdraw 100', 'withdraw 30' ]
console.log(acc.balance);       // → undefined

const other = createAccount("Mei");
console.log(other.getBalance()); // → 0
```

</details>

---

## 2.3 Higher-Order Functions and Array Methods

**Goal:** Transform, filter, search and summarise arrays with `map`, `filter`, `reduce`, `find`, `some`, `every`, `sort`, `flatMap` and related methods, and chain them into readable data pipelines.

### Explanation

A **higher-order function** is a function that takes a function as an argument or returns one. You have already written some (`applyTwice`, `once`, `memoize`). Arrays come with many built-in higher-order methods. Each one takes a **callback**, calls it for every item with `(item, index, array)`, and uses the callback's return value.

Throughout this topic we use this data:

```js
const products = [
  { name: "Laptop", category: "tech", price: 1200, inStock: true },
  { name: "Mouse", category: "tech", price: 25, inStock: false },
  { name: "Desk", category: "furniture", price: 300, inStock: true },
  { name: "Lamp", category: "furniture", price: 45, inStock: true },
];

// forEach: run a side effect for each item (returns undefined)
products.forEach((p, i) => console.log(`${i}: ${p.name}`));
// → 0: Laptop
// → 1: Mouse
// → 2: Desk
// → 3: Lamp

// map: transform each item -> new array of the same length
const names = products.map((p) => p.name);
console.log(names); // → [ 'Laptop', 'Mouse', 'Desk', 'Lamp' ]

// filter: keep items where the callback returns truthy
const available = products.filter((p) => p.inStock);
console.log(available.length); // → 3

// find / findIndex: the first match (or undefined / -1)
console.log(products.find((p) => p.price < 50).name); // → Mouse
console.log(products.findIndex((p) => p.name === "Desk")); // → 2

// findLast / findLastIndex: search from the end
console.log(products.findLast((p) => p.price < 50).name); // → Lamp

// some / every: does any / do all items pass?
console.log(products.some((p) => p.price > 1000)); // → true
console.log(products.every((p) => p.inStock));     // → false
```

**`reduce`** combines all items into a single value. Its callback receives an **accumulator** (the result so far) and the current item; the second argument to `reduce` is the starting accumulator:

```js
const products = [
  { name: "Laptop", category: "tech", price: 1200 },
  { name: "Mouse", category: "tech", price: 25 },
  { name: "Desk", category: "furniture", price: 300 },
];

const total = products.reduce((sum, p) => sum + p.price, 0);
console.log(total); // → 1525

// reduce can build any shape, e.g. an object of totals per category
const byCategory = products.reduce((acc, p) => {
  acc[p.category] = (acc[p.category] ?? 0) + p.price;
  return acc;
}, {});
console.log(byCategory); // → { tech: 1225, furniture: 300 }
```

Always pass the initial value; without it, `reduce` uses the first item as the start and throws on an empty array.

**Chaining.** Because `map` and `filter` return arrays, you can chain calls into a readable pipeline:

```js
const products = [
  { name: "Laptop", price: 1200, inStock: true },
  { name: "Mouse", price: 25, inStock: false },
  { name: "Desk", price: 300, inStock: true },
  { name: "Lamp", price: 45, inStock: true },
];

const affordableNames = products
  .filter((p) => p.inStock)
  .filter((p) => p.price < 500)
  .map((p) => `${p.name} (${p.price} EUR)`);
console.log(affordableNames); // → [ 'Desk (300 EUR)', 'Lamp (45 EUR)' ]
```

**Sorting objects and strings.** `sort` takes a compare function (1.10). For text, use `localeCompare`, which handles accents and case the way humans expect:

```js
const people = [
  { name: "Zoë", age: 31 },
  { name: "adam", age: 25 },
  { name: "Émile", age: 25 },
];

const byAgeThenName = people.toSorted(
  (a, b) => a.age - b.age || a.name.localeCompare(b.name)
);
console.log(byAgeThenName.map((p) => p.name)); // → [ 'adam', 'Émile', 'Zoë' ]
```

(`a.age - b.age || ...` means "sort by age; if ages are equal (difference `0`, which is falsy), sort by name".)

**Flattening.** `flat()` removes one level of nesting; `flatMap()` maps and then flattens one level — useful when each item produces several results:

```js
console.log([[1, 2], [3], [4, [5]]].flat()); // → [ 1, 2, 3, 4, [ 5 ] ]

const sentences = ["hello world", "good morning"];
console.log(sentences.flatMap((s) => s.split(" "))); // → [ 'hello', 'world', 'good', 'morning' ]
```

**Creating arrays.** `Array.from` builds an array from anything iterable or array-like, with an optional mapping function:

```js
console.log(Array.from({ length: 5 }, (_, i) => i * i)); // → [ 0, 1, 4, 9, 16 ]
console.log(Array.from("abc"));                          // → [ 'a', 'b', 'c' ]
```

(By convention, `_` names a parameter you don't use.)

**Grouping.** `Object.groupBy(items, callback)` (ES2024) groups items into an object keyed by the callback's return value. The result has no prototype (3.1), which Node shows as `[Object: null prototype]`:

```js
const words = ["apple", "avocado", "banana", "blueberry", "cherry"];
const byLetter = Object.groupBy(words, (w) => w[0]);
console.log(byLetter.a); // → [ 'apple', 'avocado' ]
console.log(Object.keys(byLetter)); // → [ 'a', 'b', 'c' ]
```

**Choosing a method**

| You want… | Use |
|---|---|
| a new array with each item transformed | `map` |
| a subset of the items | `filter` |
| the first matching item | `find` |
| a yes/no answer about the items | `some` / `every` |
| one value computed from all items | `reduce` |
| to do something for each item, without a result | `for...of` or `forEach` |

`forEach` cannot be stopped early; use `for...of` with `break`, or `some`/`find`, when you need to stop.

### Practice task

Write `sales.js` that analyses these orders:

```js
const orders = [
  { id: 1, customer: "Ana", items: [{ sku: "pen", qty: 3, price: 1.5 }, { sku: "pad", qty: 1, price: 4 }], status: "paid" },
  { id: 2, customer: "Ben", items: [{ sku: "bag", qty: 1, price: 25 }], status: "cancelled" },
  { id: 3, customer: "Ana", items: [{ sku: "pen", qty: 10, price: 1.5 }], status: "paid" },
  { id: 4, customer: "Cleo", items: [{ sku: "pad", qty: 2, price: 4 }, { sku: "bag", qty: 1, price: 25 }], status: "paid" },
];
```

Using array methods only (no `for` loops), compute and print:

1. `orderTotal(order)` — a helper using `reduce` that returns `qty * price` summed over items. Print the totals of all orders as an array.
2. The revenue from **paid** orders only.
3. Revenue per customer from paid orders, as an object.
4. The IDs of paid orders worth more than 10.
5. Total quantity sold per SKU across paid orders (use `flatMap` to get all items, then `reduce`).
6. Whether every order has at least one item, and whether any order is cancelled.
7. The customer names sorted alphabetically without duplicates. (Hint: `filter((name, i, arr) => arr.indexOf(name) === i)` keeps only the first occurrence.)

### Expected result

```text
[ 8.5, 25, 15, 33 ]
56.5
{ Ana: 23.5, Cleo: 33 }
[ 3, 4 ]
{ pen: 13, pad: 3, bag: 1 }
true
true
[ 'Ana', 'Ben', 'Cleo' ]
```

### Acceptance criteria

- [ ] No `for`, `while` or `for...of` loops are used.
- [ ] `orderTotal` is a separate, reusable function built with `reduce`.
- [ ] Every `reduce` call has an explicit initial value.
- [ ] The paid-orders filter is written once and reused (store it in a variable).
- [ ] Item 5 uses `flatMap`.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```js
const orders = [
  { id: 1, customer: "Ana", items: [{ sku: "pen", qty: 3, price: 1.5 }, { sku: "pad", qty: 1, price: 4 }], status: "paid" },
  { id: 2, customer: "Ben", items: [{ sku: "bag", qty: 1, price: 25 }], status: "cancelled" },
  { id: 3, customer: "Ana", items: [{ sku: "pen", qty: 10, price: 1.5 }], status: "paid" },
  { id: 4, customer: "Cleo", items: [{ sku: "pad", qty: 2, price: 4 }, { sku: "bag", qty: 1, price: 25 }], status: "paid" },
];

const orderTotal = (order) =>
  order.items.reduce((sum, item) => sum + item.qty * item.price, 0);

console.log(orders.map(orderTotal)); // → [ 8.5, 25, 15, 33 ]

const paid = orders.filter((o) => o.status === "paid");

console.log(paid.reduce((sum, o) => sum + orderTotal(o), 0)); // → 56.5

const perCustomer = paid.reduce((acc, o) => {
  acc[o.customer] = (acc[o.customer] ?? 0) + orderTotal(o);
  return acc;
}, {});
console.log(perCustomer); // → { Ana: 23.5, Cleo: 33 }

console.log(paid.filter((o) => orderTotal(o) > 10).map((o) => o.id)); // → [ 3, 4 ]

const qtyBySku = paid
  .flatMap((o) => o.items)
  .reduce((acc, item) => {
    acc[item.sku] = (acc[item.sku] ?? 0) + item.qty;
    return acc;
  }, {});
console.log(qtyBySku); // → { pen: 13, pad: 3, bag: 1 }

console.log(orders.every((o) => o.items.length > 0));      // → true
console.log(orders.some((o) => o.status === "cancelled")); // → true

const customers = orders
  .map((o) => o.customer)
  .filter((name, i, arr) => arr.indexOf(name) === i)
  .toSorted((a, b) => a.localeCompare(b));
console.log(customers); // → [ 'Ana', 'Ben', 'Cleo' ]
```

</details>

---

## 2.4 Destructuring, Spread and Rest

**Goal:** Unpack values from arrays and objects with destructuring, gather values with rest syntax, expand them with spread syntax, and update data immutably.

### Explanation

**Array destructuring** assigns array items to variables by position:

```js
const rgb = [255, 128, 0];
const [red, green, blue] = rgb;
console.log(red, green, blue); // → 255 128 0

const [first, , third] = ["a", "b", "c"]; // skip with an empty slot
console.log(first, third); // → a c

const [x = 1, y = 2] = [10]; // default values for missing items
console.log(x, y); // → 10 2

let left = "L";
let right = "R";
[left, right] = [right, left]; // swap without a temporary variable
console.log(left, right); // → R L
```

**Object destructuring** assigns properties to variables by name. You can rename, give defaults, and reach into nested objects:

```js
const user = {
  id: 7,
  name: "Noor",
  address: { city: "Cairo", zip: "11511" },
};

const { name, id } = user;
console.log(name, id); // → Noor 7

const { name: fullName, role = "member" } = user; // rename + default
console.log(fullName, role); // → Noor member

const { address: { city } } = user; // nested
console.log(city); // → Cairo
```

**Destructuring parameters** is extremely common. It documents which properties a function uses and allows named, optional arguments in any order:

```js
function createButton({ label, size = "medium", disabled = false } = {}) {
  return `<button class="${size}"${disabled ? " disabled" : ""}>${label}</button>`;
}
console.log(createButton({ label: "Save" }));
// → <button class="medium">Save</button>
console.log(createButton({ label: "Delete", disabled: true, size: "small" }));
// → <button class="small" disabled>Delete</button>
```

The `= {}` at the end makes calling `createButton()` with no argument safe.

**Rest syntax (`...`) gathers** the remaining items into a new array or object:

```js
const [winner, ...others] = ["Gold", "Silver", "Bronze"];
console.log(winner); // → Gold
console.log(others); // → [ 'Silver', 'Bronze' ]

const { password, ...publicProfile } = { user: "kim", password: "s3cret", age: 30 };
console.log(publicProfile); // → { user: 'kim', age: 30 }

// Rest parameters: any number of arguments, as a real array
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4)); // → 10
```

A rest element must be last.

**Spread syntax (`...`) expands** an iterable into individual items, or an object into its properties. Same three dots, opposite job: rest collects, spread spreads.

```js
const weekdays = ["Mon", "Tue"];
const weekend = ["Sat", "Sun"];
const days = [...weekdays, "Wed", ...weekend];
console.log(days); // → [ 'Mon', 'Tue', 'Wed', 'Sat', 'Sun' ]

const nums = [5, 9, 2];
console.log(Math.max(...nums)); // → 9 (spread into function arguments)

const defaults = { theme: "light", fontSize: 14 };
const userPrefs = { fontSize: 18 };
const settings = { ...defaults, ...userPrefs }; // later properties win
console.log(settings); // → { theme: 'light', fontSize: 18 }
```

**Immutable updates.** Instead of changing objects in place, many programs (and frameworks such as React) create updated copies. Spread makes this concise:

```js
const state = {
  user: { name: "Lu", points: 10 },
  tags: ["new"],
};

const next = {
  ...state,
  user: { ...state.user, points: state.user.points + 5 },
  tags: [...state.tags, "active"],
};

console.log(state.user.points, next.user.points); // → 10 15
console.log(state.tags, next.tags); // → [ 'new' ] [ 'new', 'active' ]
console.log(state.user === next.user); // → false
```

Spread copies are **shallow**: nested objects you don't explicitly spread are still shared. Use `structuredClone` (1.11) when you need a full deep copy.

### Practice task

Write `events.js`.

1. Write `formatEvent(event)` that uses **parameter destructuring** to read `title`, nested `date: { day, month }`, `location` (default `"Online"`) and collects all other properties into `extras` with rest syntax. It returns a string like `"Meetup — 12/5 @ Online (+2 more fields)"` where the number is the count of keys in `extras`.
2. Write `addAttendee(event, name)` that returns a **new** event with `name` appended to `attendees` (start from an empty list if `attendees` is missing), leaving the original untouched.
3. Write `mergeConfig(...configs)` that merges any number of config objects left to right using spread and `reduce`.

Run:

```js
const meetup = { title: "Meetup", date: { day: 12, month: 5 }, host: "Ivo", capacity: 40 };
console.log(formatEvent(meetup));
console.log(formatEvent({ title: "Gala", date: { day: 1, month: 12 }, location: "Hall A" }));

const updated = addAttendee(addAttendee(meetup, "Ana"), "Ben");
console.log(updated.attendees);
console.log(meetup.attendees);

console.log(mergeConfig({ a: 1, b: 1 }, { b: 2 }, { c: 3 }, { a: 0 }));
console.log(mergeConfig());
```

### Expected result

```text
Meetup — 12/5 @ Online (+2 more fields)
Gala — 1/12 @ Hall A (+0 more fields)
[ 'Ana', 'Ben' ]
undefined
{ a: 0, b: 2, c: 3 }
{}
```

### Acceptance criteria

- [ ] `formatEvent` destructures in its parameter list, including the nested `date`, a default, and a rest element.
- [ ] `addAttendee` never mutates its input (`meetup.attendees` stays `undefined`).
- [ ] `addAttendee` handles a missing `attendees` list with `??` or a default.
- [ ] `mergeConfig` uses a rest parameter and works with zero arguments.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```js
function formatEvent({ title, date: { day, month }, location = "Online", ...extras }) {
  return `${title} — ${day}/${month} @ ${location} (+${Object.keys(extras).length} more fields)`;
}

function addAttendee(event, name) {
  return { ...event, attendees: [...(event.attendees ?? []), name] };
}

function mergeConfig(...configs) {
  return configs.reduce((merged, config) => ({ ...merged, ...config }), {});
}

const meetup = { title: "Meetup", date: { day: 12, month: 5 }, host: "Ivo", capacity: 40 };
console.log(formatEvent(meetup)); // → Meetup — 12/5 @ Online (+2 more fields)
console.log(formatEvent({ title: "Gala", date: { day: 1, month: 12 }, location: "Hall A" })); // → Gala — 1/12 @ Hall A (+0 more fields)

const updated = addAttendee(addAttendee(meetup, "Ana"), "Ben");
console.log(updated.attendees); // → [ 'Ana', 'Ben' ]
console.log(meetup.attendees);  // → undefined

console.log(mergeConfig({ a: 1, b: 1 }, { b: 2 }, { c: 3 }, { a: 0 })); // → { a: 0, b: 2, c: 3 }
console.log(mergeConfig()); // → {}
```

Note that `({ ...merged, ...config })` is wrapped in parentheses: an arrow function body starting with `{` would otherwise be read as a block, not an object.

</details>

---

## 2.5 Advanced Strings and Regular Expressions

**Goal:** Handle Unicode text correctly, format numbers and dates for a locale with `Intl`, and search, validate, extract and replace text with regular expressions.

### Explanation

**Unicode and string length.** JavaScript strings are sequences of UTF-16 *code units*. Most characters use one, but emoji and many rarer characters use two (a "surrogate pair"), and some visible characters combine several code points. So `length` does not always equal "number of characters you see":

```js
const thumbs = "👍";
console.log(thumbs.length);      // → 2  (two UTF-16 code units)
console.log([...thumbs].length); // → 1  (spread iterates by code point)

const family = "👨‍👩‍👧"; // three people joined by invisible "zero width joiner" characters
console.log([...family].length); // → 5
const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
console.log([...segmenter.segment(family)].length); // → 1 (what a human would count)
```

Use `[...str]` to iterate code points, and `Intl.Segmenter` when you need user-perceived characters (for example, to limit a username's visible length).

**Locale-aware formatting with `Intl`.** Don't hand-build number or date formats; the built-in `Intl` API knows the conventions of every locale:

```js
const amount = 1234567.891;
console.log(new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount));
// → $1,234,567.89
console.log(new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(amount));
// → 1.234.567,89 €
console.log(new Intl.NumberFormat("en", { style: "percent" }).format(0.256)); // → 26%

const launch = new Date(Date.UTC(2026, 0, 15, 9, 30)); // months are 0-based: 0 = January
console.log(new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" }).format(launch));
// → 15 January 2026
console.log(new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }).format(launch));
// → Jan 15, 2026, 9:30 AM
```

Always pass a `timeZone` when the output must be the same on every machine; otherwise the user's local time zone is used.

**Tagged templates.** A function placed before a template literal receives the literal's text pieces and the interpolated values separately, so it can process them — for example to escape or highlight values:

```js
function highlight(strings, ...values) {
  return strings.reduce(
    (result, text, i) => result + text + (i < values.length ? `[${values[i]}]` : ""),
    ""
  );
}
const item = "tea";
const price = 2.5;
console.log(highlight`One ${item} costs ${price} EUR`); // → One [tea] costs [2.5] EUR
```

**Regular expressions** (regex) are patterns for matching text. Write them between slashes, with optional **flags** after the closing slash:

```js
const pattern = /cat/i; // i = case-insensitive
console.log(pattern.test("Concatenate")); // → true
console.log(pattern.test("CAT"));         // → true
console.log(/^cat$/.test("cats"));        // → false
```

**Core syntax**

| Pattern | Matches |
|---|---|
| `abc` | the literal text "abc" |
| `.` | any character except a line break |
| `\d` `\w` `\s` | a digit; a word character (`[A-Za-z0-9_]`); whitespace |
| `\D` `\W` `\S` | the opposites of the above |
| `[aeiou]` `[a-z]` `[^0-9]` | one character from a set; a range; NOT in the set |
| `^` `$` | start / end of the string (or line, with the `m` flag) |
| `\b` | a word boundary |
| `*` `+` `?` | 0 or more; 1 or more; 0 or 1 (optional) |
| `{3}` `{2,4}` `{2,}` | exactly 3; 2 to 4; 2 or more |
| `(...)` | a capturing group |
| `(?<name>...)` | a named capturing group |
| `(?:...)` | a non-capturing group |
| `a\|b` | `a` or `b` |
| `(?=...)` `(?!...)` | lookahead: followed / not followed by |
| `\.` `\(` `\\` | escaped special characters |

Quantifiers are **greedy** (match as much as possible); add `?` to make them lazy: `.*?`.

**Flags:** `g` (global: all matches), `i` (ignore case), `m` (multiline `^`/`$`), `s` (`.` also matches line breaks), `u` (full Unicode), `v` (Unicode sets, a stricter upgrade of `u`), `y` (sticky), `d` (match indices).

**Using regexes**

```js
const text = "Order #1042 shipped on 2026-03-14; order #1043 pending.";

// test: does it match?
console.log(/#\d+/.test(text)); // → true

// match without g: first match plus groups
const date = text.match(/(\d{4})-(\d{2})-(\d{2})/);
console.log(date[0], date[1]); // → 2026-03-14 2026

// named groups are easier to read
const { groups } = text.match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/);
console.log(groups.day, groups.month); // → 14 03

// match with g: all matched strings
console.log(text.match(/#\d+/g)); // → [ '#1042', '#1043' ]

// matchAll (requires g): every match with its groups
for (const m of text.matchAll(/#(?<id>\d+)/g)) {
  console.log(m.groups.id, "at index", m.index);
}
// → 1042 at index 6
// → 1043 at index 41

// replace: $<name> or $1 refer to groups
console.log("2026-03-14".replace(/(?<y>\d+)-(?<m>\d+)-(?<d>\d+)/, "$<d>/$<m>/$<y>")); // → 14/03/2026

// replace with a function for computed replacements
console.log("price: 10 EUR, tax: 2 EUR".replace(/\d+/g, (n) => String(Number(n) * 2))); // → price: 20 EUR, tax: 4 EUR

// split on a pattern
console.log("a, b;c  d".split(/[,;\s]+/)); // → [ 'a', 'b', 'c', 'd' ]
```

**Validation** usually anchors the pattern with `^` and `$` so the *whole* string must match:

```js
const isPostcode = (s) => /^\d{4}-\d{3}$/.test(s); // Portuguese postcode, e.g. 1000-001
console.log(isPostcode("1000-001"));      // → true
console.log(isPostcode("my 1000-001"));   // → false

// Lookaheads: at least 8 chars, containing a digit and an uppercase letter
const strong = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
console.log(strong.test("password1"));    // → false
console.log(strong.test("Password1"));    // → true
```

**Pitfalls**

- A regex with the `g` or `y` flag remembers `lastIndex` between `test()`/`exec()` calls. Reusing one global regex for `test` on several strings gives alternating results. Don't use `g` with `test`.
- To build a regex from user input, escape special characters first (ES2025 adds `RegExp.escape`, see 3.10), or match with string methods instead.
- Regexes are great for well-defined formats. Don't try to parse HTML or fully validate email addresses with them; use a parser or a simple sanity check.

### Practice task

Write `logs.js` that parses server log lines of the form `YYYY-MM-DD HH:MM:SS [LEVEL] module: message`:

```js
const log = `2026-03-14 09:21:07 [INFO] auth: User ana@example.com logged in
2026-03-14 09:22:15 [ERROR] db: Connection refused (code=ECONNREFUSED)
this line is corrupted
2026-03-14 09:25:00 [WARN] auth: Too many attempts for ben@example.org
2026-03-14 09:30:42 [ERROR] api: Timeout after 3000ms`;
```

1. Write `parseLine(line)` that uses **one regex with named groups** to return `{ date, time, level, module, message }`, or `null` if the line does not match.
2. Parse all lines (split on line breaks), drop the `null`s, and print the number of valid entries.
3. Print the count of entries per level as an object.
4. Print the messages of `ERROR` entries.
5. Write `maskEmails(text)` that replaces every email address with its first character, `***`, and the domain, e.g. `a***@example.com`. Print every message with emails masked.

### Expected result

```text
4
{ INFO: 1, ERROR: 2, WARN: 1 }
[ 'Connection refused (code=ECONNREFUSED)', 'Timeout after 3000ms' ]
User a***@example.com logged in
Connection refused (code=ECONNREFUSED)
Too many attempts for b***@example.org
Timeout after 3000ms
```

### Acceptance criteria

- [ ] `parseLine` uses a single anchored regex (`^...$`) with five named groups.
- [ ] Corrupted lines return `null` and are excluded without crashing.
- [ ] The level counts are computed with `reduce` or a loop over parsed entries, not hard-coded.
- [ ] `maskEmails` uses `replace` with the `g` flag and either `$<name>` references or a replacer function.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```js
const log = `2026-03-14 09:21:07 [INFO] auth: User ana@example.com logged in
2026-03-14 09:22:15 [ERROR] db: Connection refused (code=ECONNREFUSED)
this line is corrupted
2026-03-14 09:25:00 [WARN] auth: Too many attempts for ben@example.org
2026-03-14 09:30:42 [ERROR] api: Timeout after 3000ms`;

const LINE =
  /^(?<date>\d{4}-\d{2}-\d{2}) (?<time>\d{2}:\d{2}:\d{2}) \[(?<level>[A-Z]+)\] (?<module>\w+): (?<message>.*)$/;

function parseLine(line) {
  const match = line.match(LINE);
  return match ? { ...match.groups } : null;
}

const entries = log.split("\n").map(parseLine).filter((e) => e !== null);
console.log(entries.length); // → 4

const perLevel = entries.reduce((acc, e) => {
  acc[e.level] = (acc[e.level] ?? 0) + 1;
  return acc;
}, {});
console.log(perLevel); // → { INFO: 1, ERROR: 2, WARN: 1 }

console.log(entries.filter((e) => e.level === "ERROR").map((e) => e.message));
// → [ 'Connection refused (code=ECONNREFUSED)', 'Timeout after 3000ms' ]

const maskEmails = (text) =>
  text.replace(/\b(?<first>[\w.+-])[\w.+-]*@(?<domain>[\w-]+(?:\.[\w-]+)+)/g, "$<first>***@$<domain>");

for (const e of entries) {
  console.log(maskEmails(e.message));
}
// → User a***@example.com logged in
// → Connection refused (code=ECONNREFUSED)
// → Too many attempts for b***@example.org
// → Timeout after 3000ms
```

`{ ...match.groups }` copies the groups into an ordinary object (`match.groups` has a null prototype).

</details>

---

## 2.6 The `this` Keyword

**Goal:** Predict the value of `this` in any function call, fix "lost `this`" bugs, and use `call`, `apply`, `bind` and arrow functions deliberately.

### Explanation

`this` is a special variable available inside functions. Unlike other variables, its value is **not** decided by where the function is written but, for regular functions, by **how the function is called**. Learn these rules in order:

| How the function is called | `this` is… |
|---|---|
| `obj.method()` — called as a property of an object | `obj` |
| `fn()` — called on its own | `undefined` in strict mode (the global object in old sloppy-mode scripts) |
| `fn.call(x, ...)`, `fn.apply(x, [...])`, `fn.bind(x)` | `x` |
| `new Fn()` — called as a constructor | the newly created object (2.7) |
| an **arrow function** | not its own: it uses `this` from the surrounding code |

**Method calls**

```js
"use strict";

const user = {
  name: "Ada",
  greet() {
    return `Hi, I'm ${this.name}`;
  },
};
console.log(user.greet()); // → Hi, I'm Ada
```

**Losing `this`.** If you take the method out of the object and call it on its own, there is no object before the dot, so `this` is `undefined`:

```js
"use strict";

const user = {
  name: "Ada",
  greet() {
    return `Hi, I'm ${this.name}`;
  },
};

const greet = user.greet; // just the function, detached from user
try {
  greet();
} catch (error) {
  console.log(error.constructor.name); // → TypeError (reading .name of undefined)
}
```

This happens implicitly whenever you pass a method as a callback, for example `setTimeout(user.greet, 100)` or `button.addEventListener("click", user.greet)`.

**`call`, `apply` and `bind`** set `this` explicitly:

```js
"use strict";

function introduce(greeting, punctuation) {
  return `${greeting}, I'm ${this.name}${punctuation}`;
}
const ada = { name: "Ada" };
const alan = { name: "Alan" };

console.log(introduce.call(ada, "Hello", "!"));    // → Hello, I'm Ada!
console.log(introduce.apply(alan, ["Hi", "."]));   // → Hi, I'm Alan.

const adaIntro = introduce.bind(ada, "Hey"); // returns a new function with this fixed
console.log(adaIntro("?")); // → Hey, I'm Ada?
```

- `call(thisArg, arg1, arg2, ...)` calls immediately.
- `apply(thisArg, [args])` calls immediately with arguments as an array.
- `bind(thisArg, ...args)` does **not** call; it returns a new function whose `this` (and optionally leading arguments) are permanently fixed. Use it to pass methods as callbacks safely.

**Arrow functions have no `this` of their own.** They use the `this` of the code around them. That makes them ideal for callbacks *inside* methods:

```js
const timer = {
  seconds: 0,
  start() {
    // the arrow function uses start()'s this, which is timer
    setTimeout(() => {
      this.seconds++;
      console.log(`Elapsed: ${this.seconds}s`);
    }, 10);
  },
};
timer.start(); // → Elapsed: 1s
```

With a regular `function` callback there, `this` would not be `timer`, and the code would fail.

**…which also makes them wrong as methods:**

```js
const counter = {
  count: 5,
  regular() {
    return this.count;
  },
  arrow: () => this?.count, // this comes from the surrounding module, not counter
};
console.log(counter.regular()); // → 5
console.log(counter.arrow());   // → undefined
```

**Rules of thumb**

- Use method shorthand (`name() {}`) for object methods.
- Use arrow functions for callbacks *inside* methods.
- When passing a method elsewhere, pass `obj.method.bind(obj)` or a wrapper `() => obj.method()`.

### Practice task

The following `stopwatch` object is broken. Fix it so the script prints the expected output.

```js
"use strict";

const stopwatch = {
  label: "Lap",
  laps: [],
  addLap(time) {
    this.laps.push(time);
    return this; // returning this allows chaining: sw.addLap(1).addLap(2)
  },
  report() {
    return this.laps.map(function (time, i) {
      return `${this.label} ${i + 1}: ${time}s`;
    });
  },
  best() {
    return Math.min(...this.laps);
  },
};

stopwatch.addLap(32.1).addLap(30.4);

const record = stopwatch.addLap;
record(31.0); // should add a third lap

console.log(stopwatch.report());
console.log(stopwatch.best());

function describe(prefix) {
  return `${prefix}: ${this.laps.length} laps, best ${this.best()}s`;
}
// print the result of describe("Summary") with this = stopwatch
```

Requirements: fix `report` with an arrow function; fix `record` with `bind` (change only the line that creates `record`); call `describe` using `call`.

### Expected result

```text
[ 'Lap 1: 32.1s', 'Lap 2: 30.4s', 'Lap 3: 31s' ]
30.4
Summary: 3 laps, best 30.4s
```

### Acceptance criteria

- [ ] `report` uses an arrow callback so `this.label` works.
- [ ] `record` is created with `stopwatch.addLap.bind(stopwatch)`.
- [ ] `describe` is not added to the object; it is invoked with `describe.call(stopwatch, "Summary")`.
- [ ] The file keeps `"use strict"` and runs without errors.
- [ ] You can explain why the original `record(31.0)` failed and why `this` was undefined in the original `map` callback.

<details>
<summary>Reference solution</summary>

```js
"use strict";

const stopwatch = {
  label: "Lap",
  laps: [],
  addLap(time) {
    this.laps.push(time);
    return this;
  },
  report() {
    return this.laps.map((time, i) => `${this.label} ${i + 1}: ${time}s`);
  },
  best() {
    return Math.min(...this.laps);
  },
};

stopwatch.addLap(32.1).addLap(30.4);

const record = stopwatch.addLap.bind(stopwatch);
record(31.0);

console.log(stopwatch.report()); // → [ 'Lap 1: 32.1s', 'Lap 2: 30.4s', 'Lap 3: 31s' ]
console.log(stopwatch.best());   // → 30.4

function describe(prefix) {
  return `${prefix}: ${this.laps.length} laps, best ${this.best()}s`;
}
console.log(describe.call(stopwatch, "Summary")); // → Summary: 3 laps, best 30.4s
```

</details>

---

## 2.7 Classes

**Goal:** Define classes with constructors, methods, getters/setters, static members and truly private fields, and build class hierarchies with `extends` and `super`.

### Explanation

A **class** is a blueprint for creating many objects with the same shape and behaviour. Each object created from a class is an **instance**.

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceTo(other) {
    return Math.hypot(other.x - this.x, other.y - this.y);
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

const a = new Point(0, 0);
const b = new Point(3, 4);
console.log(a.distanceTo(b)); // → 5
console.log(`From ${a} to ${b}`); // → From (0, 0) to (3, 4)
console.log(b instanceof Point); // → true
```

- `new Point(0, 0)` creates an empty object, runs `constructor` with `this` set to it, and returns it.
- Methods defined in the class body are shared by all instances (3.1 explains how).
- Defining `toString` controls how the object is converted to a string, such as inside a template literal.
- Class bodies always run in strict mode.

**Class fields** declare instance properties directly in the body. **Private fields** start with `#` and are inaccessible from outside the class — a hard guarantee enforced by the language:

```js
class BankAccount {
  owner;            // public field
  #balance = 0;     // private field
  static #count = 0; // private static field

  constructor(owner, deposit = 0) {
    this.owner = owner;
    this.#balance = deposit;
    BankAccount.#count++;
  }

  get balance() {   // getter: read like a property
    return this.#balance;
  }

  deposit(amount) {
    this.#validate(amount);
    this.#balance += amount;
    return this;
  }

  #validate(amount) { // private method
    if (amount <= 0) throw new RangeError("Amount must be positive");
  }

  static get count() { // static: belongs to the class, not instances
    return BankAccount.#count;
  }
}

const acc = new BankAccount("Lin", 100);
acc.deposit(50);
console.log(acc.balance);       // → 150
console.log(acc.owner);         // → Lin
console.log(BankAccount.count); // → 1
console.log(Object.keys(acc));  // → [ 'owner' ] (private fields are invisible)
// acc.#balance would be a SyntaxError outside the class
```

**Getters and setters** look like properties but run code. A setter can validate:

```js
class Temperature {
  #celsius = 0;

  get fahrenheit() {
    return this.#celsius * 9 / 5 + 32;
  }

  set fahrenheit(value) {
    this.#celsius = (value - 32) * 5 / 9;
  }

  get celsius() {
    return this.#celsius;
  }
}

const t = new Temperature();
t.fahrenheit = 212;          // calls the setter
console.log(t.celsius);      // → 100
console.log(t.fahrenheit);   // → 212
```

**Static members** belong to the class itself. They are often used for factory methods and constants:

```js
class Color {
  static WHITE = new Color(255, 255, 255);

  constructor(r, g, b) {
    Object.assign(this, { r, g, b });
  }

  static fromHex(hex) {
    const [r, g, b] = hex.match(/\w\w/g).map((pair) => parseInt(pair, 16));
    return new Color(r, g, b);
  }
}

console.log(Color.fromHex("#ff8000")); // → Color { r: 255, g: 128, b: 0 }
console.log(Color.WHITE.r);            // → 255
```

**Inheritance.** `extends` creates a subclass that inherits all methods of the parent. In the subclass constructor, you must call `super(...)` (the parent constructor) before using `this`. `super.method()` calls the parent's version of an overridden method:

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  speak() {
    return `${super.speak()}: Woof!`;
  }
}

const rex = new Dog("Rex", "collie");
console.log(rex.speak());            // → Rex makes a sound: Woof!
console.log(rex instanceof Dog);     // → true
console.log(rex instanceof Animal);  // → true
```

**Design advice.** Keep hierarchies shallow — one or two levels. When objects merely *use* other objects ("an Order *has* Items"), store them as properties (composition) instead of inheriting.

### Practice task

Write `inventory.js`.

1. Class `Product` with a constructor `(name, price, stock = 0)`, a **private** `#stock` field, a getter `stock`, a method `sell(qty)` that throws `RangeError("Insufficient stock for <name>")` if `qty` exceeds stock and otherwise reduces stock and returns the sale value (`qty * price`), a method `restock(qty)`, and a `toString()` returning `"<name> — <price> EUR (<stock> in stock)"` with the price to 2 decimals.
2. Subclass `PerishableProduct` with an extra constructor parameter `expiresOn` (a `"YYYY-MM-DD"` string). Add `isExpired(today)` (compare the strings — ISO dates sort correctly as text). Override `sell(qty, today)` so it throws `Error("<name> has expired")` if expired, otherwise delegates to `super.sell(qty)`. Override `toString()` to append ` [expires <date>]`.
3. A static method `Product.totalValue(products)` returning the sum of `price * stock`.

Run:

```js
const pen = new Product("Pen", 1.2, 100);
const milk = new PerishableProduct("Milk", 0.99, 20, "2026-11-01");

console.log(String(pen));
console.log(String(milk));
console.log(pen.sell(10));
console.log(milk.sell(5, "2026-10-27").toFixed(2));
try {
  milk.sell(1, "2026-11-02");
} catch (e) {
  console.log(e.message);
}
try {
  pen.sell(500);
} catch (e) {
  console.log(`${e.name}: ${e.message}`);
}
pen.restock(10);
console.log(pen.stock);
console.log(Product.totalValue([pen, milk]).toFixed(2));
console.log(milk instanceof Product, Object.keys(pen));
```

### Expected result

```text
Pen — 1.20 EUR (100 in stock)
Milk — 0.99 EUR (20 in stock) [expires 2026-11-01]
12
4.95
Milk has expired
RangeError: Insufficient stock for Pen
100
134.85
true [ 'name', 'price' ]
```

### Acceptance criteria

- [ ] Stock is stored in a `#private` field; `Object.keys(pen)` does not include it.
- [ ] `stock` is a getter, so `pen.stock` works but `pen.stock = 5` does not change it.
- [ ] `PerishableProduct` calls `super(...)` in its constructor and `super.sell`/`super.toString` in its overrides.
- [ ] `totalValue` is `static` and is called on the class, not an instance.
- [ ] The correct error types and messages are thrown.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```js
class Product {
  #stock;

  constructor(name, price, stock = 0) {
    this.name = name;
    this.price = price;
    this.#stock = stock;
  }

  get stock() {
    return this.#stock;
  }

  sell(qty) {
    if (qty > this.#stock) {
      throw new RangeError(`Insufficient stock for ${this.name}`);
    }
    this.#stock -= qty;
    return qty * this.price;
  }

  restock(qty) {
    this.#stock += qty;
  }

  toString() {
    return `${this.name} — ${this.price.toFixed(2)} EUR (${this.#stock} in stock)`;
  }

  static totalValue(products) {
    return products.reduce((sum, p) => sum + p.price * p.stock, 0);
  }
}

class PerishableProduct extends Product {
  constructor(name, price, stock, expiresOn) {
    super(name, price, stock);
    this.expiresOn = expiresOn;
  }

  isExpired(today) {
    return today > this.expiresOn;
  }

  sell(qty, today) {
    if (this.isExpired(today)) {
      throw new Error(`${this.name} has expired`);
    }
    return super.sell(qty);
  }

  toString() {
    return `${super.toString()} [expires ${this.expiresOn}]`;
  }
}

const pen = new Product("Pen", 1.2, 100);
const milk = new PerishableProduct("Milk", 0.99, 20, "2026-11-01");

console.log(String(pen));  // → Pen — 1.20 EUR (100 in stock)
console.log(String(milk)); // → Milk — 0.99 EUR (20 in stock) [expires 2026-11-01]
console.log(pen.sell(10)); // → 12
console.log(milk.sell(5, "2026-10-27").toFixed(2)); // → 4.95
try {
  milk.sell(1, "2026-11-02");
} catch (e) {
  console.log(e.message); // → Milk has expired
}
try {
  pen.sell(500);
} catch (e) {
  console.log(`${e.name}: ${e.message}`); // → RangeError: Insufficient stock for Pen
}
pen.restock(10);
console.log(pen.stock); // → 100
console.log(Product.totalValue([pen, milk]).toFixed(2)); // → 134.85
console.log(milk instanceof Product, Object.keys(pen)); // → true [ 'name', 'price' ]
```

</details>

---

## 2.8 Error Handling

**Goal:** Throw and catch errors, use the built-in error types, write custom error classes, chain errors with `cause`, and use `finally` for cleanup.

### Explanation

When something goes wrong at run time, JavaScript **throws an error**. If nothing catches it, the program stops (in Node.js) or the current script stops (in a browser) and the error is printed.

**`try...catch...finally`**

```js
function parseAge(text) {
  const age = Number(text);
  if (!Number.isInteger(age) || age < 0) {
    throw new RangeError(`Invalid age: "${text}"`);
  }
  return age;
}

for (const input of ["42", "-3", "abc"]) {
  try {
    console.log("Parsed", parseAge(input));
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
  } finally {
    console.log("checked", input);
  }
}
// → Parsed 42
// → checked 42
// → RangeError: Invalid age: "-3"
// → checked -3
// → RangeError: Invalid age: "abc"
// → checked abc
```

- Code in `try` runs until an error is thrown.
- `catch (error)` runs only if an error was thrown; `error` holds the thrown value.
- `finally` always runs — after success, after an error, even after a `return` — so it is the place for cleanup (closing files, hiding a loading spinner).
- The `(error)` binding is optional: `catch { ... }` is valid when you don't need the error.

**The `Error` object** has a `name`, a `message`, and a `stack` (a text trace of where it was created, useful for debugging). Built-in subtypes signal different problems:

| Type | Thrown when… |
|---|---|
| `TypeError` | a value is the wrong type, e.g. calling a non-function or reading a property of `undefined` |
| `RangeError` | a number is out of an allowed range |
| `ReferenceError` | an undeclared variable is used |
| `SyntaxError` | code (or `JSON.parse` input) cannot be parsed |
| `URIError`, `EvalError` | rare |
| `AggregateError` | several errors at once (see `Promise.any`, 2.13) |

```js
try {
  const user = null;
  user.name;
} catch (error) {
  console.log(error instanceof TypeError); // → true
  console.log(error.message); // → Cannot read properties of null (reading 'name')
}

try {
  JSON.parse("{ not json }");
} catch (error) {
  console.log(error.name); // → SyntaxError
}
```

(Exact messages differ between engines; the one above is from V8, used by Node.js and Chrome. Don't write code that depends on message text from built-in errors.)

**Always throw `Error` objects**, not strings: `throw new Error("...")`. Only error objects carry a stack trace and work with `instanceof`.

**Custom error classes** make errors easy to recognise and can carry extra data:

```js
class ValidationError extends Error {
  constructor(field, message, options) {
    super(message, options);
    this.name = "ValidationError";
    this.field = field;
  }
}

try {
  throw new ValidationError("email", "Email is required");
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`Field "${error.field}": ${error.message}`); // → Field "email": Email is required
  } else {
    throw error; // not ours: rethrow
  }
}
```

**Only catch what you can handle.** A `catch` block that silently swallows every error hides bugs. Check the type, handle the expected cases, and **rethrow** the rest.

**Error chaining with `cause`.** When you catch a low-level error and throw a higher-level one, pass the original as `cause` so no information is lost:

```js
function loadSettings(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error("Settings file is corrupted", { cause: error });
  }
}

try {
  loadSettings("{ broken");
} catch (error) {
  console.log(error.message);    // → Settings file is corrupted
  console.log(error.cause.name); // → SyntaxError
}
```

**`finally` and `return`.** `finally` runs even when `try` returns:

```js
function withCleanup() {
  try {
    return "result";
  } finally {
    console.log("cleanup runs first");
  }
}
console.log(withCleanup());
// → cleanup runs first
// → result
```

**Errors versus expected outcomes.** Use exceptions for *exceptional* situations (invalid input that should never happen, broken invariants, failed I/O). For ordinary outcomes like "not found", returning `null` or a result object is often simpler.

**Global safety nets.** Unhandled errors can be observed with `window.addEventListener("error", ...)` in browsers or `process.on("uncaughtException", ...)` in Node.js, for logging. They are a last resort, not a replacement for local handling. Asynchronous errors are covered in 2.13 and 2.14.

### Practice task

Write `users.js` to import user records from JSON strings.

1. Create `class ValidationError extends Error` with a `field` property (as above).
2. Write `parseUser(json)` that:
    - parses the JSON; if parsing fails, throws `new Error("Malformed JSON", { cause })` with the original error as `cause`;
    - throws `ValidationError("name", "Name is required")` if `name` is missing or empty after trimming;
    - throws `ValidationError("age", "Age must be an integer between 0 and 150")` if `age` is not an integer in that range;
    - returns `{ name, age }` with the name trimmed.
3. Write `importUsers(jsonList)` that returns `{ imported: [...], errors: [...] }`. Each error entry is a string: `"#<index>: <field>: <message>"` for validation errors, or `"#<index>: <message> (<cause name>)"` for malformed JSON. Any other kind of error must be **rethrown**.

Run:

```js
const result = importUsers([
  '{"name": " Ana ", "age": 34}',
  '{"name": "", "age": 20}',
  '{"name": "Bo", "age": 200}',
  "{ oops",
  '{"name": "Cy", "age": 0}',
]);
console.log(result.imported);
for (const message of result.errors) console.log(message);
```

### Expected result

```text
[ { name: 'Ana', age: 34 }, { name: 'Cy', age: 0 } ]
#1: name: Name is required
#2: age: Age must be an integer between 0 and 150
#3: Malformed JSON (SyntaxError)
```

### Acceptance criteria

- [ ] `ValidationError` extends `Error`, sets `name`, and stores `field`.
- [ ] The JSON error is wrapped with `{ cause }` rather than discarded.
- [ ] `importUsers` distinguishes errors with `instanceof`, and rethrows unknown ones (test this by temporarily throwing `new TypeError("boom")` inside `parseUser`).
- [ ] An age of `0` is accepted (no truthiness bug).
- [ ] One bad record never stops the others from being imported.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```js
class ValidationError extends Error {
  constructor(field, message, options) {
    super(message, options);
    this.name = "ValidationError";
    this.field = field;
  }
}

function parseUser(json) {
  let data;
  try {
    data = JSON.parse(json);
  } catch (cause) {
    throw new Error("Malformed JSON", { cause });
  }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  if (name === "") {
    throw new ValidationError("name", "Name is required");
  }
  if (!Number.isInteger(data.age) || data.age < 0 || data.age > 150) {
    throw new ValidationError("age", "Age must be an integer between 0 and 150");
  }
  return { name, age: data.age };
}

function importUsers(jsonList) {
  const imported = [];
  const errors = [];

  jsonList.forEach((json, index) => {
    try {
      imported.push(parseUser(json));
    } catch (error) {
      if (error instanceof ValidationError) {
        errors.push(`#${index}: ${error.field}: ${error.message}`);
      } else if (error.cause instanceof SyntaxError) {
        errors.push(`#${index}: ${error.message} (${error.cause.name})`);
      } else {
        throw error;
      }
    }
  });

  return { imported, errors };
}

const result = importUsers([
  '{"name": " Ana ", "age": 34}',
  '{"name": "", "age": 20}',
  '{"name": "Bo", "age": 200}',
  "{ oops",
  '{"name": "Cy", "age": 0}',
]);
console.log(result.imported); // → [ { name: 'Ana', age: 34 }, { name: 'Cy', age: 0 } ]
for (const message of result.errors) console.log(message);
// → #1: name: Name is required
// → #2: age: Age must be an integer between 0 and 150
// → #3: Malformed JSON (SyntaxError)
```

</details>

---
## 2.9 Modules

**Goal:** Split a program into ES modules with named and default exports, import them in all the common forms, load modules dynamically, and run modules in Node.js and the browser.

### Explanation

As programs grow, keeping everything in one file becomes unmanageable. A **module** is a file with its own scope: nothing inside it is visible to other files unless it is **exported**, and other files must **import** what they need. This makes dependencies explicit and prevents name clashes.

JavaScript's standard module system is **ES modules** (ESM). Key facts:

- Each module has its own top-level scope — top-level variables are not globals.
- Modules always run in strict mode.
- A module is evaluated **once**, the first time it is imported; every importer shares the same instance.
- Imports are **live bindings**: if the exporting module changes an exported `let`, importers see the new value.
- `import` declarations are hoisted and resolved before the module runs.
- Top-level `await` is allowed.

**Running modules in Node.js.** Use the `.mjs` extension, or add `"type": "module"` to your project's `package.json` to make `.js` files modules. Relative imports must include the file extension.

**Named exports** — any number per module:

```js
// file: geometry.mjs
export const PI = 3.141592653589793;

export function circleArea(radius) {
  return PI * radius ** 2;
}

function square(n) {
  return n * n;
}
function cube(n) {
  return n * n * n;
}
export { square, cube as volumeOfCube }; // export a list, optionally renamed

// default export — at most one per module
export default function describeCircle(radius) {
  return `A circle of radius ${radius} has area ${circleArea(radius).toFixed(2)}`;
}
```

**Importing** — every common form:

```js
// file: main.mjs
import describeCircle, { circleArea, PI as pi } from "./geometry.mjs"; // default + named (renamed)
import * as geometry from "./geometry.mjs"; // namespace object with every export

console.log(describeCircle(2));            // → A circle of radius 2 has area 12.57
console.log(circleArea(1) === pi);         // → true
console.log(geometry.volumeOfCube(3));     // → 27
console.log(typeof geometry.default);      // → function
console.log(Object.keys(geometry));        // → [ 'PI', 'circleArea', 'default', 'square', 'volumeOfCube' ]

// dynamic import: loads on demand and returns a promise (here awaited at top level)
const { square } = await import("./geometry.mjs");
console.log(square(9)); // → 81
```

Save both files in the same folder and run `node main.mjs`.

**Named vs default exports.** Named exports must be imported with their exact names (or explicitly renamed), which keeps names consistent across a codebase and helps editors auto-import. Many teams therefore prefer named exports everywhere and use default exports only when a module has a single obvious main thing.

**Re-exporting** lets one "barrel" file collect the public API of several modules:

```js
// index.mjs
export { circleArea, PI } from "./geometry.mjs";
export * from "./strings.mjs";
export { default as describeCircle } from "./geometry.mjs";
```

**Live bindings and shared instances**

```js
// file: counter.mjs
export let count = 0;
export function increment() {
  count++;
}
```

```js
// file: main.mjs
import { count, increment } from "./counter.mjs";

console.log(count); // → 0
increment();
increment();
console.log(count); // → 2 (the imported binding is live)
// count = 10; would be a TypeError: imports are read-only for the importer
```

**Dynamic `import()`** loads a module only when it is needed — useful for rarely used features or large libraries. It returns a promise of the module's namespace object (promises and `await` are explained in 2.13–2.14).

**`import.meta`** holds information about the current module. `import.meta.url` is the module's URL; in Node.js, `import.meta.dirname` and `import.meta.filename` give its folder and path.

**Modules in the browser.** Load the entry module with `type="module"`. Module scripts are deferred automatically (they run after the HTML is parsed), and imports use URLs, so the extension is required:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Modules in the browser</title>
    <script type="module" src="./main.mjs"></script>
  </head>
  <body>
    <p>Open the console.</p>
  </body>
</html>
```

Browsers refuse to load modules from `file://` pages for security reasons, so serve the folder over HTTP, for example with `npx serve .` or `python3 -m http.server`, then open the printed `http://localhost` address.

**CommonJS.** Node.js also supports its older module system, which you will meet in existing code and tutorials. It uses `require` and `module.exports`, loads synchronously, and is the default for `.js` files without `"type": "module"` (or for `.cjs` files):

```js
// file: greet.cjs
function greet(name) {
  return `Hello, ${name}`;
}
module.exports = { greet };
```

```js
// file: main.cjs
const { greet } = require("./greet.cjs");
console.log(greet("CommonJS")); // → Hello, CommonJS
```

Prefer ES modules for new code: they work in browsers and Node.js alike and are the language standard.

### Practice task

Create a small utility library across four files in one folder:

1. `strings.mjs` exports named functions `capitalize(text)` (first letter upper case, rest unchanged) and `slugify(text)` (lower case, trimmed, runs of non-alphanumeric characters replaced by a single `-`, no leading or trailing `-`).
2. `numbers.mjs` exports `clamp(value, min, max)` and a **default** export `round(value, decimals = 0)` that returns a number (not a string).
3. `index.mjs` re-exports everything public from both files, exposing the default `round` as a named export `round`.
4. `main.mjs` imports `capitalize` and `slugify` by name from `index.mjs`, imports the whole `numbers.mjs` as a namespace `num`, and lazily loads `index.mjs` with dynamic `import()` to call `round`.

`main.mjs` should print:

1. `capitalize("hello modules")`
2. `slugify("  Hello, World! ES Modules 101 ")`
3. `num.clamp(150, 0, 100)` and `num.clamp(-5, 0, 100)` on one line
4. `num.default(3.14159, 2)`
5. the result of `round(2.5)` obtained via dynamic import

### Expected result

```text
Hello modules
hello-world-es-modules-101
100 0
3.14
3
```

### Acceptance criteria

- [ ] Four separate `.mjs` files exist, and `node main.mjs` runs without errors.
- [ ] `strings.mjs` uses only named exports; `numbers.mjs` has a default export.
- [ ] `index.mjs` contains only re-export statements (`export ... from`).
- [ ] `main.mjs` uses a named import, a namespace import, and a dynamic `import()`.
- [ ] `round` returns a number (`typeof` is `"number"`).
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```js
// file: strings.mjs
export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
```

```js
// file: numbers.mjs
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function round(value, decimals = 0) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
```

```js
// file: index.mjs
export * from "./strings.mjs";
export { clamp, default as round } from "./numbers.mjs";
```

```js
// file: main.mjs
import { capitalize, slugify } from "./index.mjs";
import * as num from "./numbers.mjs";

console.log(capitalize("hello modules")); // → Hello modules
console.log(slugify("  Hello, World! ES Modules 101 ")); // → hello-world-es-modules-101
console.log(num.clamp(150, 0, 100), num.clamp(-5, 0, 100)); // → 100 0
console.log(num.default(3.14159, 2)); // → 3.14

const { round } = await import("./index.mjs");
console.log(round(2.5)); // → 3
```

</details>

---

## 2.10 The DOM

**Goal:** Select, read, create, modify and remove elements on a web page using the Document Object Model, safely and efficiently.

### Explanation

When a browser loads an HTML page, it builds a tree of objects representing it: the **Document Object Model (DOM)**. Every element, attribute and piece of text is a **node** in this tree. JavaScript can read and change the tree, and the browser immediately updates what is displayed. The DOM is a browser feature; it does not exist in Node.js.

```text
document
└── html
    ├── head
    │   └── title
    └── body
        ├── h1
        └── ul#menu
            ├── li
            └── li
```

The global `document` object is the entry point.

**Selecting elements**

| Method | Returns |
|---|---|
| `document.querySelector(css)` | the first element matching a CSS selector, or `null` |
| `document.querySelectorAll(css)` | a static `NodeList` of all matches (iterable with `for...of`) |
| `document.getElementById(id)` | the element with that `id`, or `null` |
| `element.closest(css)` | the nearest ancestor (or itself) matching the selector |

You can also call `querySelector`/`querySelectorAll` on any element to search only inside it.

**Reading and changing content**

- `element.textContent` — the text inside, as plain text. Setting it is **safe**: any HTML in the string is displayed literally.
- `element.innerHTML` — the HTML inside, as a string. Setting it parses the string as HTML. **Never** set `innerHTML` with text that came from users or other untrusted sources: it lets attackers inject scripts (a *cross-site scripting*, or XSS, attack).

**Attributes, classes, data and styles**

- `element.id`, `element.href`, `input.value`, `input.checked`… — common attributes are available as properties.
- `getAttribute(name)`, `setAttribute(name, value)`, `removeAttribute(name)`, `hasAttribute(name)` work for any attribute.
- `element.classList.add/remove/toggle/contains("name")` manages CSS classes. Prefer changing classes over setting inline styles, so the visual design stays in CSS.
- `element.dataset.userId` reads/writes the `data-user-id` attribute (custom data stored on elements).
- `element.style.color = "red"` sets an inline style (CSS property names become camelCase: `backgroundColor`).

**Creating, inserting and removing**

- `document.createElement("li")` creates a new element (not yet on the page).
- `parent.append(...nodes)` / `prepend(...)` add children at the end / start (strings are added as text).
- `element.before(...)`, `element.after(...)`, `element.replaceWith(...)` insert around an element.
- `element.remove()` removes it.
- A `DocumentFragment` (`document.createDocumentFragment()`) collects many new nodes off-page so you can insert them in a single operation.

**Traversing**: `parent.children` (child elements), `element.parentElement`, `nextElementSibling`, `previousElementSibling`, `firstElementChild`.

This page demonstrates all of it. Save it as `dom.html`, open it, and look at both the page and the console:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>DOM basics</title>
    <style>
      .highlight { background: yellow; }
      .done { text-decoration: line-through; color: gray; }
    </style>
  </head>
  <body>
    <h1 id="title">Shopping list</h1>
    <ul id="list">
      <li data-id="1">Bread</li>
      <li data-id="2" class="done">Milk</li>
    </ul>
    <p class="note">Edit me</p>

    <script>
      // Select
      const title = document.getElementById("title");
      const list = document.querySelector("#list");
      const items = list.querySelectorAll("li");
      console.log(title.textContent);  // → Shopping list
      console.log(items.length);       // → 2

      // Read and change text, classes and data attributes
      title.textContent = "My shopping list";
      const milk = list.querySelector('[data-id="2"]');
      console.log(milk.classList.contains("done")); // → true
      milk.classList.toggle("done");
      console.log(milk.classList.contains("done")); // → false
      console.log(milk.dataset.id);   // → 2

      // Create and insert efficiently
      const fragment = document.createDocumentFragment();
      for (const [id, name] of [[3, "Eggs"], [4, "Apples"]]) {
        const li = document.createElement("li");
        li.dataset.id = id;
        li.textContent = name;
        fragment.append(li);
      }
      list.append(fragment);
      console.log(list.children.length); // → 4

      // Safe vs unsafe text
      const note = document.querySelector(".note");
      note.textContent = "<b>not bold</b>"; // shown literally: safe
      console.log(note.children.length);    // → 0 (no <b> element was created)

      // Attributes and styles
      list.setAttribute("aria-label", "Groceries");
      console.log(list.getAttribute("aria-label")); // → Groceries
      list.firstElementChild.classList.add("highlight");
      title.style.fontFamily = "sans-serif";

      // Traverse and remove
      const bread = list.firstElementChild;
      console.log(bread.nextElementSibling.textContent); // → Milk
      bread.remove();
      console.log([...list.children].map((li) => li.textContent).join(", ")); // → Milk, Eggs, Apples
    </script>
  </body>
</html>
```

**Where to put scripts.** A script can only find elements that have already been parsed. Either place the `<script>` at the end of `<body>` (as above), add the `defer` attribute to a `<script src="...">` in the `<head>`, or use `type="module"` (which defers automatically).

**Performance basics.** Reading layout properties (like `offsetHeight`) right after writing styles forces the browser to recalculate layout. When making many changes, build nodes off-page (with a fragment) and insert them once, and change classes rather than many individual style properties.

### Practice task

Create `products.html`. In its script, start with this data:

```js
const products = [
  { id: 1, name: "Notebook", price: 4.5, stock: 12 },
  { id: 2, name: "Pens <b>x10</b>", price: 3, stock: 0 },
  { id: 3, name: "Backpack", price: 39.9, stock: 3 },
];
```

The page's HTML contains only `<h1>Products</h1>`, an empty `<ul id="product-list"></ul>`, and an empty `<p id="summary"></p>`. Write a function `renderProducts(list)` that:

1. clears the list, then adds one `<li>` per product, inserted with a single `append` of a `DocumentFragment`;
2. sets each `<li>`'s text to `"<name> — <price> EUR"` with the price to 2 decimals, and its `data-id` attribute to the product's id;
3. adds the class `out-of-stock` to products with `stock === 0`, and appends a `<span class="badge">Sold out</span>` inside them;
4. writes `"3 products, 1 sold out"` (computed) into `#summary`.

Product names must be displayed exactly as written — including the literal text `<b>x10</b>` — without creating a `<b>` element.

### Expected result

The page shows a list of three items:

```text
Notebook — 4.50 EUR
Pens <b>x10</b> — 3.00 EUR Sold out
Backpack — 39.90 EUR
```

The second item is visibly styled as sold out (for example greyed out via your CSS for `.out-of-stock`), the text `<b>x10</b>` is shown literally, and the paragraph below reads `3 products, 1 sold out`. In the developer tools' Elements panel, each `<li>` has a `data-id` attribute (`1`, `2`, `3`), only the second `<li>` has the `out-of-stock` class, and there is no `<b>` element anywhere in the list.

### Acceptance criteria

- [ ] `renderProducts` can be called again with a different array and correctly replaces the list (no duplicates).
- [ ] All product text is set with `textContent` or `append(string)`, never `innerHTML`.
- [ ] Elements are inserted via one `DocumentFragment`.
- [ ] `data-id` is set via `dataset` and classes via `classList`.
- [ ] The summary numbers are computed from the data.
- [ ] The page matches the expected result, and the console shows no errors.

<details>
<summary>Reference solution</summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Products</title>
    <style>
      .out-of-stock { color: gray; }
      .badge { margin-left: 0.5em; font-size: 0.8em; background: #eee; padding: 0 0.4em; }
    </style>
  </head>
  <body>
    <h1>Products</h1>
    <ul id="product-list"></ul>
    <p id="summary"></p>

    <script>
      const products = [
        { id: 1, name: "Notebook", price: 4.5, stock: 12 },
        { id: 2, name: "Pens <b>x10</b>", price: 3, stock: 0 },
        { id: 3, name: "Backpack", price: 39.9, stock: 3 },
      ];

      function renderProducts(list) {
        const ul = document.getElementById("product-list");
        const fragment = document.createDocumentFragment();

        for (const product of list) {
          const li = document.createElement("li");
          li.dataset.id = product.id;
          li.textContent = `${product.name} — ${product.price.toFixed(2)} EUR`;

          if (product.stock === 0) {
            li.classList.add("out-of-stock");
            const badge = document.createElement("span");
            badge.className = "badge";
            badge.textContent = "Sold out";
            li.append(" ", badge);
          }
          fragment.append(li);
        }

        ul.replaceChildren(); // remove all existing children
        ul.append(fragment);

        const soldOut = list.filter((p) => p.stock === 0).length;
        document.getElementById("summary").textContent =
          `${list.length} products, ${soldOut} sold out`;
      }

      renderProducts(products);
    </script>
  </body>
</html>
```

</details>

---

## 2.11 Events

**Goal:** Respond to user actions with event listeners, use the event object, understand bubbling, and apply event delegation to handle dynamic content efficiently.

### Explanation

An **event** is a signal that something happened: a click, a key press, a form submission, the page finishing loading. You react by registering a **listener** (a callback) on an element:

```js
button.addEventListener("click", (event) => {
  console.log("Clicked!", event.target);
});
```

**Common events**

| Category | Events |
|---|---|
| Mouse / pointer | `click`, `dblclick`, `pointerdown`, `pointerup`, `pointermove`, `mouseenter`, `mouseleave` |
| Keyboard | `keydown`, `keyup` |
| Forms | `submit`, `input` (on every change), `change` (when committed), `focus`, `blur` |
| Document / window | `DOMContentLoaded`, `load`, `resize`, `scroll` |

**The event object** is passed to the listener. Useful members:

- `event.type` — the event name.
- `event.target` — the element where the event originated (e.g. the exact element clicked).
- `event.currentTarget` — the element whose listener is running.
- `event.key` — the key pressed, for keyboard events (`"Enter"`, `"Escape"`, `"a"`).
- `event.preventDefault()` — cancels the browser's default action (following a link, submitting a form and reloading the page).
- `event.stopPropagation()` — stops the event bubbling further (use sparingly).

**Bubbling.** After an event fires on the target element, it **bubbles** up through each ancestor to `document`, triggering their listeners too. (Before that is a *capturing* phase from the top down, which listeners can opt into with `{ capture: true }`; you rarely need it.)

**Event delegation** uses bubbling: instead of attaching a listener to every item, attach one to a common parent and use `event.target.closest(...)` to find which item was involved. This uses less memory and automatically works for items added later.

**Listener options and removal**

- `addEventListener(type, fn, { once: true })` removes the listener after its first call.
- `removeEventListener(type, fn)` needs the *same function reference* that was added, so use a named function, not an inline arrow.
- `AbortController` can remove many listeners at once: pass `{ signal: controller.signal }` and later call `controller.abort()`.

**Custom events** let your own components communicate: `element.dispatchEvent(new CustomEvent("cart:add", { detail: { id: 3 }, bubbles: true }))`.

This page demonstrates each technique. Click around and watch the console:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Events demo</title>
  </head>
  <body>
    <button id="counter">Clicked 0 times</button>

    <ul id="colors">
      <li><button data-color="red">Red</button></li>
      <li><button data-color="green">Green</button></li>
    </ul>

    <form id="signup">
      <input name="email" type="email" placeholder="Email">
      <button>Sign up</button>
    </form>
    <p id="status"></p>

    <script>
      // 1. A simple click listener with state
      const counter = document.getElementById("counter");
      let clicks = 0;
      counter.addEventListener("click", () => {
        clicks++;
        counter.textContent = `Clicked ${clicks} times`;
      });

      // 2. Delegation: one listener on the <ul> handles every button, even future ones
      const colors = document.getElementById("colors");
      colors.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-color]");
        if (!button) return; // click was not on a colour button
        document.body.style.background = button.dataset.color;
        console.log("target:", button.dataset.color, "| currentTarget:", event.currentTarget.id);
      });
      const blue = document.createElement("li");
      blue.innerHTML = '<button data-color="blue">Blue</button>'; // fixed markup, not user input
      colors.append(blue); // works without adding a new listener

      // 3. Forms: prevent the page reload and read the values
      const form = document.getElementById("signup");
      const status = document.getElementById("status");
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(form);
        status.textContent = `Thanks, ${data.get("email") || "anonymous"}!`;
      });

      // 4. Keyboard: Escape clears the email field
      form.elements.email.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          event.currentTarget.value = "";
        }
      });

      // 5. A once-only listener and a custom event
      document.addEventListener("app:ready", (event) => {
        console.log("ready at", event.detail.time);
      }, { once: true });
      document.dispatchEvent(new CustomEvent("app:ready", { detail: { time: "now" } }));
      document.dispatchEvent(new CustomEvent("app:ready", { detail: { time: "again" } })); // ignored

      // Simulate interactions so the console shows output immediately
      counter.click();
      colors.querySelector('[data-color="blue"]').click();
      // → ready at now
      // → target: blue | currentTarget: colors
    </script>
  </body>
</html>
```

**`input` vs `change`.** `input` fires on every keystroke in a text field; `change` fires when the user commits the value (on blur, or immediately for checkboxes and selects). Use `input` for live search.

**Performance.** Events like `scroll`, `resize`, `pointermove` and `input` can fire dozens of times per second. Keep their listeners cheap, or limit how often the work runs with *debounce* or *throttle* (3.9). For scroll and touch listeners that never call `preventDefault`, pass `{ passive: true }`.

### Practice task

Build `todo.html`, a to-do list with:

- a form `#todo-form` containing a text input named `title` and an "Add" button;
- a list `<ul id="todos">`;
- a paragraph `<p id="count">`.

Behaviour:

1. Submitting the form (button or Enter) adds a to-do with the trimmed title, clears and refocuses the input, and does **not** reload the page. Empty or whitespace-only titles are ignored.
2. Each to-do is an `<li>` containing a `<span class="title">` with the text and a `<button class="delete">✕</button>`.
3. Clicking a to-do's title toggles the class `done` on its `<li>`.
4. Clicking the delete button removes that `<li>`.
5. Pressing Escape in the input clears it.
6. `#count` always shows `"<n> left"` where `n` is the number of to-dos without the `done` class (`"0 left"` initially).
7. Use **one** click listener on `#todos` (event delegation) for both toggling and deleting.

### Expected result

Starting from an empty page showing `0 left`:

1. Type `Buy milk`, press Enter → the list shows `Buy milk ✕`, the input is empty, the page did not reload, count shows `1 left`.
2. Add `Walk dog` and then `   ` (spaces only) → only `Walk dog` is added; count `2 left`.
3. Click `Buy milk` → it gets the `done` class (styled, e.g., struck through); count `1 left`. Click it again → not done; `2 left`.
4. Click `✕` next to `Walk dog` → it disappears; count `1 left`.
5. Type something, press Escape → the input is cleared, nothing is added.

### Acceptance criteria

- [ ] `event.preventDefault()` stops the form from reloading the page.
- [ ] Titles are inserted with `textContent` (typing `<i>x</i>` shows the literal text).
- [ ] Exactly one click listener is registered on `#todos`, and it uses `event.target.closest(...)`.
- [ ] To-dos added after page load can be toggled and deleted without additional listeners.
- [ ] The count is updated after every add, toggle and delete by a single `updateCount()` function.
- [ ] Every step in the expected result behaves as described.

<details>
<summary>Reference solution</summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Todo</title>
    <style>
      #todos li.done .title { text-decoration: line-through; color: gray; }
      #todos .title { cursor: pointer; }
      #todos .delete { margin-left: 0.5em; }
    </style>
  </head>
  <body>
    <form id="todo-form">
      <input name="title" placeholder="What needs doing?" autocomplete="off">
      <button>Add</button>
    </form>
    <ul id="todos"></ul>
    <p id="count"></p>

    <script>
      const form = document.getElementById("todo-form");
      const input = form.elements.title;
      const list = document.getElementById("todos");
      const count = document.getElementById("count");

      function updateCount() {
        const left = list.querySelectorAll("li:not(.done)").length;
        count.textContent = `${left} left`;
      }

      function createTodo(title) {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.className = "title";
        span.textContent = title;
        const del = document.createElement("button");
        del.className = "delete";
        del.type = "button";
        del.textContent = "✕";
        li.append(span, del);
        return li;
      }

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = input.value.trim();
        if (title === "") return;
        list.append(createTodo(title));
        input.value = "";
        input.focus();
        updateCount();
      });

      input.addEventListener("keydown", (event) => {
        if (event.key === "Escape") input.value = "";
      });

      list.addEventListener("click", (event) => {
        const li = event.target.closest("li");
        if (!li) return;
        if (event.target.closest(".delete")) {
          li.remove();
        } else if (event.target.closest(".title")) {
          li.classList.toggle("done");
        }
        updateCount();
      });

      updateCount();
    </script>
  </body>
</html>
```

The delete button has `type="button"` so it can never submit a form by accident.

</details>

---

## 2.12 Asynchronous JavaScript and Callbacks

**Goal:** Explain why JavaScript is asynchronous, schedule work with timers, write and use callback-based APIs including Node's error-first convention, and recognise "callback hell".

### Explanation

JavaScript runs your code on a **single thread**: it does one thing at a time. If a task takes a long time — waiting for a network response, a file, or a timer — and JavaScript simply waited, the whole page would freeze, and a server could not handle other requests.

Instead, slow operations are **asynchronous**: you start the operation, provide a function to run when it finishes, and JavaScript immediately continues with the next line. When the operation completes, the environment (browser or Node.js) queues your function, and the **event loop** runs it once the current code has finished.

```text
 Your code runs to completion ──► event loop checks queue ──► runs next queued callback ──► ...
          │                                   ▲
          └── starts timer / request ──► environment waits ──► puts callback in queue
```

(3.7 refines this picture with microtasks.)

**Timers**

```js
console.log("1: start");

setTimeout(() => {
  console.log("3: timeout finished");
}, 100);

console.log("2: end of script");
// → 1: start
// → 2: end of script
// → 3: timeout finished
```

The delay is a **minimum**, not a guarantee: the callback runs only once the thread is free. Even `setTimeout(fn, 0)` runs after the current code finishes.

`setInterval(fn, ms)` repeats; `clearTimeout(id)` and `clearInterval(id)` cancel using the ID the timer function returned:

```js
let ticks = 0;
const id = setInterval(() => {
  ticks++;
  console.log(`tick ${ticks}`);
  if (ticks === 3) {
    clearInterval(id);
    console.log("stopped");
  }
}, 50);
// → tick 1
// → tick 2
// → tick 3
// → stopped
```

**Callbacks.** A function that you pass to an asynchronous operation, to be called when it finishes, is a callback. Here is a simulated slow operation built on `setTimeout`:

```js
function fetchUser(id, callback) {
  setTimeout(() => {
    callback({ id, name: `User ${id}` });
  }, 50);
}

fetchUser(7, (user) => {
  console.log("Got", user.name); // → Got User 7
});
console.log("Request sent");     // printed first
// (Output order: "Request sent", then "Got User 7")
```

Because the result arrives later, it **cannot be returned**; it can only be passed to the callback. Any code that needs the result must be inside (or called from) the callback.

**Error-first callbacks.** Node.js's classic convention: the callback's first parameter is an error (or `null` on success), the rest are results. Always check the error first:

```js
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");

const file = path.join(os.tmpdir(), "callback-demo.txt");
fs.writeFileSync(file, "hello from a file");

fs.readFile(file, "utf8", (error, contents) => {
  if (error) {
    console.log("Read failed:", error.code);
    return;
  }
  console.log("Contents:", contents); // → Contents: hello from a file

  // Only after the first read finishes, try a file that does not exist:
  fs.readFile(path.join(os.tmpdir(), "does-not-exist.txt"), "utf8", (error, contents) => {
    if (error) {
      console.log("Read failed:", error.code); // → Read failed: ENOENT
      return;
    }
    console.log(contents);
  });
});
```

Notice that the second read had to go *inside* the first callback to make sure it runs afterwards. That is the start of the next problem.

**Callback hell.** When each step depends on the previous one, callbacks nest deeper and deeper, error handling is repeated at every level, and the code drifts rightwards:

```js
getUser(1, (err, user) => {
  if (err) return handle(err);
  getOrders(user.id, (err, orders) => {
    if (err) return handle(err);
    getInvoice(orders[0].id, (err, invoice) => {
      if (err) return handle(err);
      sendEmail(user.email, invoice, (err) => {
        if (err) return handle(err);
        console.log("done");
      });
    });
  });
});
```

This structure is hard to read, hard to change, and easy to get wrong (forgetting a `return`, or calling a callback twice). **Promises** (2.13) and **async/await** (2.14) solve these problems, and modern APIs use them. You still need callbacks for event listeners, timers, and array methods — and to understand older code.

### Practice task

Write `kitchen.js`. A kitchen prepares dishes with a callback API:

```js
function cook(dish, minutes, callback) {
  setTimeout(() => {
    if (minutes > 30) {
      callback(new Error(`${dish} takes too long`));
    } else {
      callback(null, `${dish} ready`);
    }
  }, minutes * 10); // 1 simulated minute = 10 ms
}
```

1. Using nested callbacks, cook `"Soup"` (10), then `"Pasta"` (20), then `"Cake"` (15) **in sequence**, printing each result as it arrives, then `All courses served`.
2. Write a reusable `runInSequence(steps, done)` where `steps` is an array of `[dish, minutes]` pairs. It cooks them one after another, collects the results, and finally calls `done(null, results)` — or calls `done(error)` as soon as any step fails, skipping the remaining steps. Implement it **without** nesting, using a recursive inner function `next(index)`.
3. After part 1 finishes, call `runInSequence` with `[["Bread", 5], ["Roast", 45], ["Salad", 5]]` and print either the error message prefixed with `Failed: ` or the results.
4. Print `Kitchen open` synchronously at the very end of the file to show that it appears first.

### Expected result

```text
Kitchen open
Soup ready
Pasta ready
Cake ready
All courses served
Failed: Roast takes too long
```

`Salad` is never cooked.

### Acceptance criteria

- [ ] Part 1 uses nested error-first callbacks and checks the error at each level.
- [ ] `runInSequence` works for any number of steps, including zero (it calls `done(null, [])`).
- [ ] `runInSequence` stops at the first error and calls `done` exactly once.
- [ ] `Kitchen open` is printed first even though it is the last line of the file.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```js
function cook(dish, minutes, callback) {
  setTimeout(() => {
    if (minutes > 30) {
      callback(new Error(`${dish} takes too long`));
    } else {
      callback(null, `${dish} ready`);
    }
  }, minutes * 10);
}

function runInSequence(steps, done) {
  const results = [];

  function next(index) {
    if (index === steps.length) {
      done(null, results);
      return;
    }
    const [dish, minutes] = steps[index];
    cook(dish, minutes, (error, result) => {
      if (error) {
        done(error);
        return;
      }
      results.push(result);
      next(index + 1);
    });
  }

  next(0);
}

cook("Soup", 10, (err, soup) => {
  if (err) return console.log(err.message);
  console.log(soup);
  cook("Pasta", 20, (err, pasta) => {
    if (err) return console.log(err.message);
    console.log(pasta);
    cook("Cake", 15, (err, cake) => {
      if (err) return console.log(err.message);
      console.log(cake);
      console.log("All courses served");

      runInSequence([["Bread", 5], ["Roast", 45], ["Salad", 5]], (error, results) => {
        if (error) {
          console.log(`Failed: ${error.message}`);
        } else {
          console.log(results);
        }
      });
    });
  });
});

console.log("Kitchen open");
```

</details>

---

## 2.13 Promises

**Goal:** Create and consume promises, chain them, handle errors with `catch` and `finally`, convert callback APIs to promises, and coordinate several operations with `Promise.all`, `allSettled`, `race` and `any`.

### Explanation

A **promise** is an object representing a value that will be available later (or an error explaining why it won't). A promise is always in one of three states:

- **pending** — the operation hasn't finished yet;
- **fulfilled** — it succeeded, with a value;
- **rejected** — it failed, with a reason (usually an `Error`).

Once fulfilled or rejected ("settled"), a promise never changes again.

**Creating a promise.** The `Promise` constructor takes an *executor* function that receives `resolve` and `reject` functions:

```js
function delay(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

function checkStock(item, available) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (available > 0) {
        resolve(`${item}: ${available} left`);
      } else {
        reject(new Error(`${item} is out of stock`));
      }
    }, 20);
  });
}

delay(30, "delayed hello").then((value) => console.log(value));
checkStock("Pen", 4).then((msg) => console.log(msg));
checkStock("Ink", 0).catch((error) => console.log("Error:", error.message));
// → Pen: 4 left
// → Error: Ink is out of stock
// → delayed hello
```

**Consuming a promise**

- `.then(onFulfilled)` runs when the promise fulfils.
- `.catch(onRejected)` runs when it rejects.
- `.finally(onSettled)` runs either way (for cleanup), receiving no value.

**Chaining.** `.then` always returns a **new promise**, which resolves to whatever the callback returns. If the callback returns a promise, the chain waits for it. This flattens callback hell into a straight line:

```js
const delay = (ms, value) => new Promise((resolve) => setTimeout(() => resolve(value), ms));

const getUser = (id) => delay(20, { id, name: "Ana" });
const getOrders = (user) => delay(20, [{ id: 101, total: 40 }, { id: 102, total: 15 }]);

getUser(1)
  .then((user) => {
    console.log("user:", user.name);
    return getOrders(user); // returning a promise: the next then waits for it
  })
  .then((orders) => orders.reduce((sum, o) => sum + o.total, 0)) // returning a plain value
  .then((total) => console.log("total:", total))
  .catch((error) => console.log("Something failed:", error.message))
  .finally(() => console.log("done"));
// → user: Ana
// → total: 55
// → done
```

**Error propagation.** If any step throws or returns a rejected promise, the following `.then` callbacks are skipped until a `.catch` is found — just like `try...catch` for synchronous code. A `.catch` that returns normally *recovers*: the chain continues fulfilled.

```js
Promise.resolve(10)
  .then((n) => {
    throw new Error(`cannot use ${n}`);
  })
  .then(() => console.log("skipped"))
  .catch((error) => {
    console.log("caught:", error.message);
    return 0; // recover with a fallback
  })
  .then((value) => console.log("continuing with", value));
// → caught: cannot use 10
// → continuing with 0
```

**Always handle rejections.** A rejected promise without a handler triggers an "unhandled rejection" warning in browsers and, by default, **crashes** Node.js. Every chain should end in a `.catch` (or be awaited inside `try...catch`, 2.14).

**`Promise.resolve(value)` / `Promise.reject(error)`** create already-settled promises.

**Promisifying callback APIs.** Wrap an error-first callback API in a promise once, then use it everywhere:

```js
function cook(dish, callback) {
  setTimeout(() => callback(null, `${dish} ready`), 10);
}

function cookAsync(dish) {
  return new Promise((resolve, reject) => {
    cook(dish, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}

cookAsync("Soup").then(console.log); // → Soup ready
```

Node.js provides `util.promisify` for this, and most Node APIs already have promise versions (`require("node:fs/promises")`).

**Running several promises: the combinators**

| Combinator | Resolves when… | Rejects when… |
|---|---|---|
| `Promise.all(ps)` | all fulfil → array of values (in input order) | the first one rejects |
| `Promise.allSettled(ps)` | all settle → array of `{ status, value / reason }` | never |
| `Promise.race(ps)` | the first one settles (fulfilled or rejected) | the first one settles with a rejection |
| `Promise.any(ps)` | the first one fulfils | all reject → `AggregateError` |

```js
const delay = (ms, value) => new Promise((resolve) => setTimeout(() => resolve(value), ms));
const fail = (ms, message) =>
  new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms));

Promise.all([delay(30, "a"), delay(10, "b"), delay(20, "c")])
  .then((values) => console.log("all:", values));

Promise.allSettled([delay(10, "ok"), fail(10, "nope")])
  .then((results) => console.log("allSettled:", results.map((r) => r.status)));

Promise.race([delay(50, "slow"), delay(5, "fast")])
  .then((v) => console.log("race:", v));

Promise.any([fail(5, "x"), delay(15, "first success")])
  .then((v) => console.log("any:", v));

Promise.all([delay(10, 1), fail(5, "one failed")])
  .catch((e) => console.log("all rejected:", e.message));

// Printed in order of completion, not in order of the code:
// → race: fast
// → all rejected: one failed
// → allSettled: [ 'fulfilled', 'rejected' ]
// → any: first success
// → all: [ 'a', 'b', 'c' ]
```

Notice that `Promise.all` returns `[ 'a', 'b', 'c' ]` in *input* order, even though `'b'` finished first.

Promises started together run **concurrently**; `Promise.all` just waits for them. This is how you make independent requests in parallel.

**`Promise.withResolvers()`** (ES2024) returns `{ promise, resolve, reject }`, handy when the code that settles the promise lives outside the executor:

```js
const { promise, resolve } = Promise.withResolvers();
setTimeout(() => resolve("resolved from outside"), 10);
promise.then(console.log); // → resolved from outside
```

**Promise callbacks are always asynchronous.** Even for an already-resolved promise, `.then` callbacks run after the current code finishes (as *microtasks*, 3.7):

```js
Promise.resolve().then(() => console.log("then callback"));
console.log("synchronous code");
// → synchronous code
// → then callback
```

### Practice task

Write `users-promise.js`. You are given a callback-based "database":

```js
const db = { 1: { id: 1, name: "Ana" }, 2: { id: 2, name: "Ben" }, 3: { id: 3, name: "Cy" } };

function findUser(id, callback) {
  setTimeout(() => {
    if (db[id]) callback(null, db[id]);
    else callback(new Error(`User ${id} not found`));
  }, id * 10);
}
```

1. Write `findUserAsync(id)` that wraps `findUser` in a promise.
2. Write `timeout(ms)` that returns a promise rejecting with `Error("Timed out after <ms>ms")` after `ms` milliseconds.
3. Using `Promise.all`, load users 1, 2 and 3 in parallel and print their names joined with `, `.
4. Using `Promise.allSettled`, load users 1, 4 and 2 and print one line per result: the name for fulfilled ones, `Error: <message>` for rejected ones.
5. Using `Promise.race` with `timeout`, load user 3 with a 100 ms limit (succeeds), then user 3 with a 20 ms limit (times out), printing the name or the error message.
6. Run steps 3–5 **one after another** by chaining (step 4 starts only after step 3 finishes, and so on), and print `All checks complete` at the end using `finally`.

### Expected result

```text
Ana, Ben, Cy
Ana
Error: User 4 not found
Ben
Cy
Timed out after 20ms
All checks complete
```

### Acceptance criteria

- [ ] `findUserAsync` rejects with the original `Error` from the callback.
- [ ] Step 3 runs the three lookups concurrently (they start at the same time).
- [ ] Step 4 prints results in input order regardless of completion order.
- [ ] Each step returns its promise from a `.then` callback so the steps run in sequence.
- [ ] No rejection is left unhandled (the program exits cleanly with code 0).
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```js
const db = { 1: { id: 1, name: "Ana" }, 2: { id: 2, name: "Ben" }, 3: { id: 3, name: "Cy" } };

function findUser(id, callback) {
  setTimeout(() => {
    if (db[id]) callback(null, db[id]);
    else callback(new Error(`User ${id} not found`));
  }, id * 10);
}

function findUserAsync(id) {
  return new Promise((resolve, reject) => {
    findUser(id, (error, user) => (error ? reject(error) : resolve(user)));
  });
}

function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms);
  });
}

function withLimit(id, ms) {
  return Promise.race([findUserAsync(id), timeout(ms)])
    .then((user) => console.log(user.name))
    .catch((error) => console.log(error.message));
}

Promise.all([1, 2, 3].map(findUserAsync))
  .then((users) => console.log(users.map((u) => u.name).join(", ")))
  .then(() => Promise.allSettled([1, 4, 2].map(findUserAsync)))
  .then((results) => {
    for (const r of results) {
      console.log(r.status === "fulfilled" ? r.value.name : `Error: ${r.reason.message}`);
    }
  })
  .then(() => withLimit(3, 100))
  .then(() => withLimit(3, 20))
  .catch((error) => console.log("Unexpected:", error.message))
  .finally(() => console.log("All checks complete"));
```

Note that the losing timer in `Promise.race` keeps running until it fires; its later rejection is ignored because the race has already settled. (In production code you would also cancel it — see `AbortController` in 2.14.)

</details>

---

## 2.14 async/await

**Goal:** Write asynchronous code that reads like synchronous code with `async` functions and `await`, handle errors with `try...catch`, choose between sequential and parallel execution, and cancel work with `AbortController`.

### Explanation

`async` and `await` are syntax built on top of promises that removes most `.then` chains.

- An **`async` function** always returns a promise. Returning a value fulfils it; throwing rejects it.
- Inside an `async` function, **`await promise`** pauses *that function* until the promise settles, then gives the fulfilled value — or throws the rejection reason. Other code keeps running in the meantime; nothing is blocked.

```js
const delay = (ms, value) => new Promise((resolve) => setTimeout(() => resolve(value), ms));

async function getGreeting() {
  const name = await delay(20, "Ana");      // waits ~20ms
  const punctuation = await delay(10, "!"); // then ~10ms more
  return `Hello, ${name}${punctuation}`;
}

const promise = getGreeting();
console.log(promise instanceof Promise);    // → true (printed immediately)
promise.then((text) => console.log(text));  // → Hello, Ana! (printed ~30ms later)
```

**Error handling** uses ordinary `try...catch...finally`:

```js
const fail = (ms, message) =>
  new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms));

async function load() {
  try {
    await fail(10, "Network down");
    console.log("never printed");
  } catch (error) {
    console.log("Caught:", error.message); // → Caught: Network down
    return "fallback data";
  } finally {
    console.log("hide spinner");           // → hide spinner
  }
}

load().then((result) => console.log(result)); // → fallback data
```

**Top-level `await`.** In ES modules (2.9) you can use `await` outside any function, which is convenient for scripts:

```js
// save as top-level.mjs
const delay = (ms, value) => new Promise((resolve) => setTimeout(() => resolve(value), ms));
const value = await delay(10, 42);
console.log(value); // → 42
```

**Sequential vs parallel.** Each `await` waits before moving on. When operations don't depend on each other, start them all first and await them together with `Promise.all`:

```js
const delay = (ms, value) => new Promise((resolve) => setTimeout(() => resolve(value), ms));

async function sequential() {
  const a = await delay(100, "a"); // 100ms
  const b = await delay(100, "b"); // then another 100ms
  return [a, b];                   // ~200ms total
}

async function parallel() {
  const [a, b] = await Promise.all([delay(100, "a"), delay(100, "b")]);
  return [a, b];                   // ~100ms total
}

async function compare() {
  let start = performance.now();
  await sequential();
  const seqTime = performance.now() - start;

  start = performance.now();
  await parallel();
  const parTime = performance.now() - start;

  console.log(`sequential ≈ ${Math.round(seqTime / 100) * 100}ms`); // → sequential ≈ 200ms
  console.log(`parallel ≈ ${Math.round(parTime / 100) * 100}ms`);   // → parallel ≈ 100ms
}
compare();
```

**Common mistake: `await` inside `forEach`.** `forEach` ignores the promises its callback returns, so it does not wait. Use `for...of` for sequential processing or `map` + `Promise.all` for parallel:

```js
const delay = (ms, value) => new Promise((resolve) => setTimeout(() => resolve(value), ms));
const ids = [3, 1, 2];

async function demo() {
  const results = [];
  ids.forEach(async (id) => {
    results.push(await delay(id * 10, id));
  });
  console.log("forEach:", results); // → forEach: [] (nothing awaited yet!)

  const sequentialResults = [];
  for (const id of ids) {
    sequentialResults.push(await delay(id * 10, id));
  }
  console.log("for...of:", sequentialResults); // → for...of: [ 3, 1, 2 ]

  const parallelResults = await Promise.all(ids.map((id) => delay(id * 10, id)));
  console.log("Promise.all:", parallelResults); // → Promise.all: [ 3, 1, 2 ]
}
demo();
```

**Other pitfalls**

- Forgetting `await` gives you a promise instead of a value (`console.log(data)` prints `Promise { <pending> }`).
- An `async` function called without `await` or `.catch` can produce an unhandled rejection.
- `await` only works inside `async` functions (or at the top level of modules).

**Cancellation with `AbortController`.** Many APIs (including `fetch`, 2.15, and `addEventListener`) accept an `AbortSignal`. Calling `controller.abort()` cancels the work, and awaiting it throws an error named `AbortError`. `AbortSignal.timeout(ms)` creates a signal that aborts automatically:

```js
function cancellableDelay(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal.aborted) return reject(signal.reason);
    const id = setTimeout(resolve, ms, "finished");
    signal.addEventListener("abort", () => {
      clearTimeout(id);
      reject(signal.reason);
    }, { once: true });
  });
}

async function main() {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 20);
  try {
    await cancellableDelay(1000, controller.signal);
  } catch (error) {
    console.log("Cancelled:", error.name); // → Cancelled: AbortError
  }

  try {
    await cancellableDelay(1000, AbortSignal.timeout(30));
  } catch (error) {
    console.log("Gave up:", error.name); // → Gave up: TimeoutError
  }
}
main();
```

**Async iteration.** `for await...of` loops over async iterables (such as streams) and arrays of promises, awaiting each item in turn. 3.4 shows how to create async iterables with async generators.

### Practice task

Write `retry.js` containing two reusable utilities and a demonstration.

1. `sleep(ms)` — resolves after `ms` milliseconds.
2. `retry(fn, { attempts = 3, baseDelay = 10, onRetry } = {})` — calls the async function `fn`; if it throws, waits `baseDelay * 2 ** (attemptNumber - 1)` ms (exponential backoff: 10, 20, 40…) and tries again, up to `attempts` total tries. Before each wait it calls `onRetry?.(error, attemptNumber, waitMs)`. If every attempt fails, it throws `new Error("All <n> attempts failed", { cause: lastError })`.
3. A flaky function created by `makeFlaky(failures)` that throws `Error("Temporary failure <k>")` on its first `failures` calls and then returns `"Success on call <k>"`.

Demonstrate with an `async function main()`:

- `retry(makeFlaky(2), { onRetry: log })` where `log` prints `Retry #<attempt> after <wait>ms: <message>`, then print the result;
- `retry(makeFlaky(5), { attempts: 3, onRetry: log })` inside `try...catch`, printing the error message and the cause's message;
- finally, run **three** `retry(makeFlaky(1))` calls in parallel with `Promise.all` and print the array of results.

### Expected result

```text
Retry #1 after 10ms: Temporary failure 1
Retry #2 after 20ms: Temporary failure 2
Success on call 3
Retry #1 after 10ms: Temporary failure 1
Retry #2 after 20ms: Temporary failure 2
All 3 attempts failed
Cause: Temporary failure 3
[ 'Success on call 2', 'Success on call 2', 'Success on call 2' ]
```

Note that no wait happens after the final failed attempt.

### Acceptance criteria

- [ ] `retry` uses `await` in a loop with `try...catch`, not recursion-by-callback.
- [ ] The waits follow 10, 20, 40… ms and there is no wait after the last attempt.
- [ ] `onRetry` is optional (calling `retry(fn)` without options works), using optional call `?.()`.
- [ ] The final error carries the last failure as `cause`.
- [ ] Each `makeFlaky` result has its own call counter (closure), so the three parallel runs don't interfere.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```js
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function retry(fn, { attempts = 3, baseDelay = 10, onRetry } = {}) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        const wait = baseDelay * 2 ** (attempt - 1);
        onRetry?.(error, attempt, wait);
        await sleep(wait);
      }
    }
  }
  throw new Error(`All ${attempts} attempts failed`, { cause: lastError });
}

function makeFlaky(failures) {
  let calls = 0;
  return async function () {
    calls++;
    if (calls <= failures) {
      throw new Error(`Temporary failure ${calls}`);
    }
    return `Success on call ${calls}`;
  };
}

const log = (error, attempt, wait) =>
  console.log(`Retry #${attempt} after ${wait}ms: ${error.message}`);

async function main() {
  console.log(await retry(makeFlaky(2), { onRetry: log }));

  try {
    await retry(makeFlaky(5), { attempts: 3, onRetry: log });
  } catch (error) {
    console.log(error.message);
    console.log(`Cause: ${error.cause.message}`);
  }

  const results = await Promise.all([
    retry(makeFlaky(1)),
    retry(makeFlaky(1)),
    retry(makeFlaky(1)),
  ]);
  console.log(results);
}

main();
```

`return await fn()` (rather than `return fn()`) matters here: without `await`, a rejection would escape the `try` block instead of being caught.

</details>

---

## 2.15 JSON and the Fetch API

**Goal:** Convert data to and from JSON correctly, make HTTP requests with `fetch`, check responses, send JSON to a server, and handle network and HTTP errors.

### Explanation

**JSON** (JavaScript Object Notation) is the standard text format for exchanging data between programs. It looks like JavaScript object literals with stricter rules: keys and strings must use double quotes, and only these values are allowed: objects, arrays, strings, numbers, `true`, `false` and `null`.

```js
const order = {
  id: 42,
  customer: "Ana",
  items: [{ sku: "pen", qty: 2 }],
  paid: false,
  note: undefined,          // undefined properties are dropped
  createdAt: new Date(Date.UTC(2026, 9, 27)), // Dates become ISO strings
  total() { return 9; },    // functions are dropped
};

const text = JSON.stringify(order);
console.log(text);
// → {"id":42,"customer":"Ana","items":[{"sku":"pen","qty":2}],"paid":false,"createdAt":"2026-10-27T00:00:00.000Z"}

const back = JSON.parse(text);
console.log(back.items[0].qty);     // → 2
console.log(typeof back.createdAt); // → string (not a Date any more)
```

**Pretty-printing and filtering.** `JSON.stringify(value, replacer, indent)`: the replacer can be an array of keys to keep (or a function), and `indent` adds line breaks and spaces:

```js
const user = { name: "Ana", password: "s3cret", roles: ["admin"] };
console.log(JSON.stringify(user, ["name", "roles"], 2));
// → {
// →   "name": "Ana",
// →   "roles": [
// →     "admin"
// →   ]
// → }
```

**Reviving values.** `JSON.parse(text, reviver)` can transform values while parsing, for example to turn ISO date strings back into `Date` objects:

```js
const json = '{"title":"Launch","at":"2026-01-15T09:30:00.000Z"}';
const event = JSON.parse(json, (key, value) =>
  key === "at" ? new Date(value) : value
);
console.log(event.at instanceof Date);  // → true
console.log(event.at.getUTCHours());    // → 9
```

`JSON.parse` throws a `SyntaxError` on invalid input — always wrap it in `try...catch` when the text comes from outside your program (2.8).

**`fetch`** sends HTTP requests. It is built into browsers and Node.js (18+), and returns a promise of a `Response`:

```js
async function getTodo(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }
  return response.json(); // parse the body as JSON (also returns a promise)
}

getTodo(1)
  .then((todo) => console.log("Todo:", todo.title, "| completed:", todo.completed))
  .catch((error) => console.log("Request failed:", error.message));
```

([JSONPlaceholder](https://jsonplaceholder.typicode.com) is a free fake API for learning; the exact title printed depends on its data.)

Two kinds of failure behave differently — this surprises most beginners:

1. **Network errors** (offline, DNS failure, CORS blocked, aborted) make the `fetch` promise **reject**.
2. **HTTP error statuses** (404, 500…) do **not** reject. The promise fulfils with a response whose `ok` is `false`. You must check `response.ok` (true for statuses 200–299) or `response.status` yourself.

**Reading the body** — call exactly one of these (each returns a promise; the body can only be read once): `response.json()`, `response.text()`, `response.blob()`, `response.arrayBuffer()`, `response.formData()`.

**Sending data.** Pass an options object with the method, headers and body. To send JSON, stringify it and set the `Content-Type` header:

```js
const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Hello", body: "First post", userId: 1 }),
  signal: AbortSignal.timeout(5000), // give up after 5 seconds
});
console.log(response.status); // 201 (Created)
const created = await response.json();
```

**Query strings.** Build URLs with `URL` and `URLSearchParams` instead of string concatenation, so values are encoded correctly:

```js
const url = new URL("https://api.example.com/search");
url.searchParams.set("q", "café & crêpes");
url.searchParams.set("page", 2);
console.log(url.href); // → https://api.example.com/search?q=caf%C3%A9+%26+cr%C3%AApes&page=2
```

**CORS.** In browsers, a page may only read responses from *other* origins (domains) if that server allows it with CORS headers. A "CORS error" in the console is a server configuration matter, not a bug in your `fetch` call.

**A reusable request helper.** Real applications wrap `fetch` once, so every request checks status, parses JSON and reports errors consistently. The practice task builds one.

### Practice task

Write `notes-client.mjs` (an ES module) that runs a tiny local HTTP server *and* a client in the same file, so it works offline. The server code is given:

```js
import http from "node:http";

const notes = [{ id: 1, text: "Learn fetch" }];

const server = http.createServer(async (req, res) => {
  const send = (status, data) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  };
  if (req.method === "GET" && req.url === "/notes") return send(200, notes);
  if (req.method === "POST" && req.url === "/notes") {
    let body = "";
    for await (const chunk of req) body += chunk;
    let note;
    try {
      note = JSON.parse(body);
    } catch {
      return send(400, { error: "Invalid JSON" });
    }
    if (typeof note.text !== "string" || note.text.trim() === "") {
      return send(422, { error: "Text is required" });
    }
    const created = { id: notes.length + 1, text: note.text.trim() };
    notes.push(created);
    return send(201, created);
  }
  send(404, { error: "Not found" });
});

await new Promise((resolve) => server.listen(0, resolve)); // 0 = any free port
const BASE = `http://localhost:${server.address().port}`;
```

Below it, write:

1. `class HttpError extends Error` with a `status` property.
2. `async function api(path, { method = "GET", data } = {})` that calls `fetch(BASE + path)`, sends `data` as JSON when given (with the right header), parses the JSON response body, and throws `HttpError` with the server's `error` message and status when `response.ok` is false.
3. A sequence that:
    - creates a note `"Buy coffee"` and prints `Created #<id>: <text>`;
    - tries to create a note with text `"   "` and prints `Error <status>: <message>`;
    - requests `/missing` and prints `Error <status>: <message>`;
    - lists all notes and prints them as `<id>. <text>` lines;
    - prints the notes as pretty JSON with 2-space indentation, keeping only the `text` keys;
    - closes the server in a `finally` block so the process exits.

### Expected result

```text
Created #2: Buy coffee
Error 422: Text is required
Error 404: Not found
1. Learn fetch
2. Buy coffee
[
  {
    "text": "Learn fetch"
  },
  {
    "text": "Buy coffee"
  }
]
```

The process then exits by itself (because the server was closed).

### Acceptance criteria

- [ ] `api` checks `response.ok` and throws a custom `HttpError` carrying the status code.
- [ ] Request bodies are created with `JSON.stringify` and sent with a `Content-Type: application/json` header.
- [ ] Error cases are handled with `try...catch` around `await`, using `instanceof HttpError`.
- [ ] The JSON output uses `JSON.stringify` with a replacer array and indentation.
- [ ] `server.close()` is called in `finally`, and the script exits without pressing Ctrl+C.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```js
import http from "node:http";

const notes = [{ id: 1, text: "Learn fetch" }];

const server = http.createServer(async (req, res) => {
  const send = (status, data) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  };
  if (req.method === "GET" && req.url === "/notes") return send(200, notes);
  if (req.method === "POST" && req.url === "/notes") {
    let body = "";
    for await (const chunk of req) body += chunk;
    let note;
    try {
      note = JSON.parse(body);
    } catch {
      return send(400, { error: "Invalid JSON" });
    }
    if (typeof note.text !== "string" || note.text.trim() === "") {
      return send(422, { error: "Text is required" });
    }
    const created = { id: notes.length + 1, text: note.text.trim() };
    notes.push(created);
    return send(201, created);
  }
  send(404, { error: "Not found" });
});

await new Promise((resolve) => server.listen(0, resolve));
const BASE = `http://localhost:${server.address().port}`;

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

async function api(path, { method = "GET", data } = {}) {
  const options = { method };
  if (data !== undefined) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(data);
  }
  const response = await fetch(BASE + path, options);
  const body = await response.json();
  if (!response.ok) {
    throw new HttpError(response.status, body.error ?? response.statusText);
  }
  return body;
}

async function attempt(path, options) {
  try {
    return await api(path, options);
  } catch (error) {
    if (error instanceof HttpError) {
      console.log(`Error ${error.status}: ${error.message}`);
      return null;
    }
    throw error;
  }
}

try {
  const created = await api("/notes", { method: "POST", data: { text: "Buy coffee" } });
  console.log(`Created #${created.id}: ${created.text}`);

  await attempt("/notes", { method: "POST", data: { text: "   " } });
  await attempt("/missing");

  const all = await api("/notes");
  for (const note of all) {
    console.log(`${note.id}. ${note.text}`);
  }
  console.log(JSON.stringify(all, ["text"], 2));
} finally {
  server.close();
}
```

</details>

---

## Intermediate Milestone Project: Searchable Book List

**Goal:** Combine the DOM, events, closures, array methods, destructuring, error handling and async/await in one interactive page.

### Task

Build `books.html`, a page that loads books from a (simulated) API and lets the user search and sort them.

1. Use this simulated API in your script. It returns a promise and fails if `shouldFail` is true:

```js
function fetchBooks({ shouldFail = false } = {}) {
  const books = [
    { id: 1, title: "Eloquent JavaScript", author: "Marijn Haverbeke", year: 2018 },
    { id: 2, title: "You Don't Know JS Yet", author: "Kyle Simpson", year: 2020 },
    { id: 3, title: "JavaScript: The Good Parts", author: "Douglas Crockford", year: 2008 },
    { id: 4, title: "Refactoring", author: "Martin Fowler", year: 2018 },
  ];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldFail ? reject(new Error("Server unavailable")) : resolve(books);
    }, 100);
  });
}
```

2. The page has: a search input `#search`, a `<select id="sort">` with options `title` (default), `year`, and `author`, a list `<ul id="results">`, a status paragraph `#status`, and a "Reload" button `#reload` that is **hidden** unless loading failed.
3. While loading, `#status` shows `Loading…` and the search input is disabled.
4. After loading, render each book as `<li>` with text `"<title> — <author> (<year>)"`. `#status` shows `Showing <n> of <total> books`.
5. Typing in the search box filters (case-insensitive, matching title **or** author) as the user types; the select re-sorts (year sorts newest first; title and author sort alphabetically with `localeCompare`).
6. When nothing matches, the list is empty and `#status` shows `No books match "<query>"`.
7. If loading fails, `#status` shows `Error: <message>` and the Reload button appears. To test this, load with `{ shouldFail: true }` the first time; clicking Reload loads normally.
8. Keep application state (`books`, `query`, `sortBy`) in one closure-scoped object and derive the visible list from it in a single `render()` function.

### Expected result

1. On page load: `Loading…`, disabled search, then after ~100 ms: `Error: Server unavailable` and a visible Reload button.
2. Click Reload: `Loading…` again, then the list of 4 books sorted by title:

```text
Eloquent JavaScript — Marijn Haverbeke (2018)
JavaScript: The Good Parts — Douglas Crockford (2008)
Refactoring — Martin Fowler (2018)
You Don't Know JS Yet — Kyle Simpson (2020)
```

and `Showing 4 of 4 books`; the Reload button is hidden and the search box is enabled.
3. Type `java` → 2 books (`Eloquent JavaScript`, `JavaScript: The Good Parts`), `Showing 2 of 4 books`.
4. Change sort to `year` while `java` is still typed → `Eloquent JavaScript` (2018) first, then `The Good Parts` (2008).
5. Type `fowler` → only `Refactoring`. Type `zzz` → empty list, `No books match "zzz"`.

### Acceptance criteria

- [ ] All rendering goes through one `render()` function that reads the state object.
- [ ] Loading uses `async`/`await` with `try...catch...finally` (the input is re-enabled in `finally`).
- [ ] Search uses the `input` event; sort uses the `change` event.
- [ ] Book text is inserted with `textContent`.
- [ ] Sorting never mutates the original `books` array (use `toSorted` or a copy).
- [ ] Every step of the expected result behaves as described and the console shows no errors.

<details>
<summary>Reference solution</summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Book search</title>
    <style>
      body { font-family: system-ui, sans-serif; max-width: 40rem; margin: 2rem auto; padding: 0 1rem; }
      [hidden] { display: none; }
    </style>
  </head>
  <body>
    <h1>Books</h1>
    <input id="search" type="search" placeholder="Search title or author">
    <select id="sort">
      <option value="title">Title</option>
      <option value="year">Year (newest)</option>
      <option value="author">Author</option>
    </select>
    <p id="status"></p>
    <button id="reload" hidden>Reload</button>
    <ul id="results"></ul>

    <script>
      function fetchBooks({ shouldFail = false } = {}) {
        const books = [
          { id: 1, title: "Eloquent JavaScript", author: "Marijn Haverbeke", year: 2018 },
          { id: 2, title: "You Don't Know JS Yet", author: "Kyle Simpson", year: 2020 },
          { id: 3, title: "JavaScript: The Good Parts", author: "Douglas Crockford", year: 2008 },
          { id: 4, title: "Refactoring", author: "Martin Fowler", year: 2018 },
        ];
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            shouldFail ? reject(new Error("Server unavailable")) : resolve(books);
          }, 100);
        });
      }

      function createApp() {
        const state = { books: [], query: "", sortBy: "title", error: null, loading: false };

        const search = document.getElementById("search");
        const sort = document.getElementById("sort");
        const results = document.getElementById("results");
        const status = document.getElementById("status");
        const reload = document.getElementById("reload");

        const comparators = {
          title: (a, b) => a.title.localeCompare(b.title),
          author: (a, b) => a.author.localeCompare(b.author),
          year: (a, b) => b.year - a.year,
        };

        function visibleBooks() {
          const q = state.query.trim().toLowerCase();
          return state.books
            .filter(({ title, author }) =>
              title.toLowerCase().includes(q) || author.toLowerCase().includes(q))
            .toSorted(comparators[state.sortBy]);
        }

        function render() {
          search.disabled = state.loading;
          reload.hidden = state.error === null;
          results.replaceChildren();

          if (state.loading) {
            status.textContent = "Loading…";
            return;
          }
          if (state.error) {
            status.textContent = `Error: ${state.error.message}`;
            return;
          }

          const books = visibleBooks();
          const fragment = document.createDocumentFragment();
          for (const { title, author, year } of books) {
            const li = document.createElement("li");
            li.textContent = `${title} — ${author} (${year})`;
            fragment.append(li);
          }
          results.append(fragment);

          status.textContent = books.length === 0
            ? `No books match "${state.query}"`
            : `Showing ${books.length} of ${state.books.length} books`;
        }

        async function load(options) {
          state.loading = true;
          state.error = null;
          render();
          try {
            state.books = await fetchBooks(options);
          } catch (error) {
            state.error = error;
          } finally {
            state.loading = false;
            render();
          }
        }

        search.addEventListener("input", () => {
          state.query = search.value;
          render();
        });
        sort.addEventListener("change", () => {
          state.sortBy = sort.value;
          render();
        });
        reload.addEventListener("click", () => load());

        return { load };
      }

      createApp().load({ shouldFail: true });
    </script>
  </body>
</html>
```

</details>

---
# Level 3 — Advanced

This level looks at the machinery underneath everyday JavaScript — prototypes, property descriptors, symbols and the iteration protocols, generators, proxies, the event loop, memory and performance — and finishes with a tour of modern language features. You should be comfortable with every Intermediate topic before starting.

---

## 3.1 Prototypes and Inheritance

**Goal:** Explain the prototype chain, create objects with explicit prototypes, understand what `new` and `class` do under the hood, and reason about own versus inherited properties.

### Explanation

Every JavaScript object has a hidden link to another object called its **prototype** (internally `[[Prototype]]`). When you read a property that the object doesn't have itself, JavaScript looks it up on the prototype, then on the prototype's prototype, and so on, until the chain ends at `null`. This sequence is the **prototype chain**, and it is how JavaScript implements inheritance.

```text
rabbit ──[[Prototype]]──► animal ──[[Prototype]]──► Object.prototype ──► null
{ jumps }                 { eats, describe }        { toString, hasOwnProperty, ... }
```

**Creating objects with a chosen prototype.** `Object.create(proto)` makes a new empty object whose prototype is `proto`:

```js
const animal = {
  eats: true,
  describe() {
    return `eats: ${this.eats}, jumps: ${this.jumps}`;
  },
};

const rabbit = Object.create(animal);
rabbit.jumps = true;

console.log(rabbit.eats);                               // → true (inherited)
console.log(rabbit.describe());                         // → eats: true, jumps: true
console.log(Object.getPrototypeOf(rabbit) === animal);  // → true
console.log(Object.hasOwn(rabbit, "eats"));             // → false (not its own)
console.log("eats" in rabbit);                          // → true  (in checks the chain)
console.log(Object.keys(rabbit));                       // → [ 'jumps' ] (own enumerable keys only)

const inherited = [];
for (const key in rabbit) inherited.push(key);          // for...in walks the chain
console.log(inherited);                                 // → [ 'jumps', 'eats', 'describe' ]
```

Note that inside `describe`, `this` is `rabbit` (the object before the dot), even though the method lives on `animal`. Methods are shared; data is per object.

**Writing never goes up the chain.** Assigning a property always creates or changes an *own* property, which then **shadows** the inherited one:

```js
const animal = { eats: true };
const rabbit = Object.create(animal);
rabbit.eats = false;
console.log(rabbit.eats, animal.eats); // → false true
```

**The end of the chain.** Plain object literals have `Object.prototype` as their prototype, which is where methods such as `toString` and `hasOwnProperty` come from. Its prototype is `null`. Arrays have `Array.prototype` (with `map`, `push`, …), which in turn links to `Object.prototype`:

```js
const list = [1, 2];
console.log(Object.getPrototypeOf(list) === Array.prototype);                  // → true
console.log(Object.getPrototypeOf(Array.prototype) === Object.prototype);      // → true
console.log(Object.getPrototypeOf(Object.prototype));                          // → null
```

**Objects with no prototype.** `Object.create(null)` creates a "bare" object with no inherited properties at all. It is a safe dictionary when keys come from users (there is no inherited `toString` or `__proto__` to collide with):

```js
const normal = {};
const bare = Object.create(null);
console.log("toString" in normal); // → true
console.log("toString" in bare);   // → false
```

(For general-purpose dictionaries, `Map` (3.5) is usually better still.)

**Constructor functions and `new`.** Before classes existed, objects were created by calling an ordinary function with `new`. Every function has a `prototype` property; `new` uses it as the prototype of the objects it creates:

```js
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  return `Hi, I'm ${this.name}`;
};

const ada = new Person("Ada");
console.log(ada.greet());                                     // → Hi, I'm Ada
console.log(Object.getPrototypeOf(ada) === Person.prototype); // → true
console.log(ada.constructor === Person);                      // → true (inherited from Person.prototype)
console.log(ada instanceof Person);                           // → true
```

`new Person("Ada")` does four things:

1. creates a new empty object;
2. sets its prototype to `Person.prototype`;
3. calls `Person` with `this` set to the new object;
4. returns the new object (unless the function explicitly returns a different object).

**Classes are built on the same mechanism.** A `class` is a function; its methods are placed on `ClassName.prototype`; `extends` links the prototypes:

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound`;
  }
}
class Dog extends Animal {
  speak() {
    return `${this.name} barks`;
  }
}

const rex = new Dog("Rex");
console.log(typeof Animal);                                     // → function
console.log(Object.getOwnPropertyNames(Animal.prototype));      // → [ 'constructor', 'speak' ]
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype); // → true
console.log(Object.hasOwn(rex, "speak"));                       // → false (shared via prototype)
```

`instanceof` simply checks whether `Constructor.prototype` appears anywhere in the object's prototype chain.

**Inheritance with constructor functions** (you will see this in older code) links the prototypes manually:

```js
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  return `Hi, I'm ${this.name}`;
};

function Student(name, school) {
  Person.call(this, name); // run the parent constructor on this object
  this.school = school;
}
Object.setPrototypeOf(Student.prototype, Person.prototype); // Student.prototype → Person.prototype
Student.prototype.study = function () {
  return `${this.name} studies at ${this.school}`;
};

const kim = new Student("Kim", "MIT");
console.log(kim.greet());              // → Hi, I'm Kim
console.log(kim.study());              // → Kim studies at MIT
console.log(kim instanceof Person);    // → true
```

**Guidelines**

- Use `class` syntax for new code; understanding prototypes explains how it behaves.
- Never modify built-in prototypes (`Array.prototype.myHelper = ...`). It can clash with future language features and with other libraries.
- Avoid `__proto__`; use `Object.getPrototypeOf` / `Object.setPrototypeOf` / `Object.create`. Changing the prototype of an existing object is slow in modern engines; set it at creation time.
- When merging untrusted JSON into objects, beware of keys like `"__proto__"` (*prototype pollution*); use `Object.create(null)`, `Map`, or validate keys.

### Practice task

Write `prototypes.js` implementing, without using `class`:

1. `myNew(Constructor, ...args)` — reproduces the four steps of `new` described above, including the rule that if the constructor returns an object, that object is the result.
2. `isInstanceOf(obj, Constructor)` — reproduces `instanceof` by walking the chain with `Object.getPrototypeOf`.
3. A prototype-delegation hierarchy using `Object.create` only (no constructor functions): an object `shape` with a method `describe()` returning `"<name> with area <area to 2 decimals>"` (where `name` and `area()` come from the objects inheriting from it), a `circle` prototype created from `shape` with `area()` using `this.r`, and an instance created with `Object.create(circle)` plus `Object.assign(instance, { name: "circle", r: 2 })`.
4. `chainOf(obj)` — returns an array describing the chain: for each prototype, use `proto.constructor?.name` if it has an own `constructor` property, otherwise `"(anonymous)"`; stop at `null`.

Run:

```js
function Car(make) {
  this.make = make;
}
Car.prototype.honk = function () {
  return `${this.make}: beep`;
};
function Weird() {
  this.ignored = true;
  return { replaced: true };
}

const car = myNew(Car, "Fiat");
console.log(car.honk());
console.log(isInstanceOf(car, Car), isInstanceOf(car, Object), isInstanceOf(car, Array));
console.log(myNew(Weird));

const c = Object.assign(Object.create(circle), { name: "circle", r: 2 });
console.log(c.describe());
console.log(chainOf(car));
console.log(chainOf(c));
console.log(chainOf([]));
```

### Expected result

```text
Fiat: beep
true true false
{ replaced: true }
circle with area 12.57
[ 'Car', 'Object' ]
[ '(anonymous)', '(anonymous)', 'Object' ]
[ 'Array', 'Object' ]
```

### Acceptance criteria

- [ ] `myNew` uses `Object.create(Constructor.prototype)` and `Constructor.apply`/`call`, and handles constructors that return objects.
- [ ] `isInstanceOf` loops with `Object.getPrototypeOf` until `null` and does not use `instanceof`.
- [ ] The shape hierarchy uses only `Object.create` and object literals — no `function` constructors or `class`.
- [ ] `chainOf` correctly distinguishes prototypes that own a `constructor` property.
- [ ] Output matches exactly.
- [ ] You can draw the prototype chain of `c` on paper.

<details>
<summary>Reference solution</summary>

```js
function myNew(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype);
  const result = Constructor.apply(obj, args);
  const isObject = result !== null && (typeof result === "object" || typeof result === "function");
  return isObject ? result : obj;
}

function isInstanceOf(obj, Constructor) {
  let proto = Object.getPrototypeOf(obj);
  while (proto !== null) {
    if (proto === Constructor.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

const shape = {
  describe() {
    return `${this.name} with area ${this.area().toFixed(2)}`;
  },
};

const circle = Object.create(shape);
circle.area = function () {
  return Math.PI * this.r ** 2;
};

function chainOf(obj) {
  const names = [];
  let proto = Object.getPrototypeOf(obj);
  while (proto !== null) {
    names.push(Object.hasOwn(proto, "constructor") ? proto.constructor.name : "(anonymous)");
    proto = Object.getPrototypeOf(proto);
  }
  return names;
}

function Car(make) {
  this.make = make;
}
Car.prototype.honk = function () {
  return `${this.make}: beep`;
};
function Weird() {
  this.ignored = true;
  return { replaced: true };
}

const car = myNew(Car, "Fiat");
console.log(car.honk()); // → Fiat: beep
console.log(isInstanceOf(car, Car), isInstanceOf(car, Object), isInstanceOf(car, Array)); // → true true false
console.log(myNew(Weird)); // → { replaced: true }

const c = Object.assign(Object.create(circle), { name: "circle", r: 2 });
console.log(c.describe()); // → circle with area 12.57
console.log(chainOf(car)); // → [ 'Car', 'Object' ]
console.log(chainOf(c));   // → [ '(anonymous)', '(anonymous)', 'Object' ]
console.log(chainOf([]));  // → [ 'Array', 'Object' ]
```

</details>

---

## 3.2 Property Descriptors, Getters and Immutability

**Goal:** Inspect and define properties with full control over writability, enumerability and configurability; define accessors; and make objects immutable with `freeze`, `seal` and a deep-freeze function.

### Explanation

Every property has hidden **attributes**, described by a **property descriptor**:

| Attribute | Meaning | Default for `obj.x = 1` | Default for `defineProperty` |
|---|---|---|---|
| `value` | the stored value | — | `undefined` |
| `writable` | can the value be changed? | `true` | `false` |
| `enumerable` | does it show up in `Object.keys`, `for...in`, spread, JSON? | `true` | `false` |
| `configurable` | can it be deleted or have its attributes changed? | `true` | `false` |
| `get` / `set` | accessor functions (instead of `value`/`writable`) | — | `undefined` |

```js
"use strict";

const product = { name: "Lamp" };
console.log(Object.getOwnPropertyDescriptor(product, "name"));
// → { value: 'Lamp', writable: true, enumerable: true, configurable: true }

Object.defineProperty(product, "id", { value: 42 }); // all flags default to false
console.log(Object.getOwnPropertyDescriptor(product, "id"));
// → { value: 42, writable: false, enumerable: false, configurable: false }

console.log(product.id);           // → 42
console.log(Object.keys(product)); // → [ 'name' ] (id is not enumerable)
console.log(JSON.stringify(product)); // → {"name":"Lamp"}

try {
  product.id = 7; // read-only: throws in strict mode (silently ignored otherwise)
} catch (error) {
  console.log(error.name); // → TypeError
}
try {
  delete product.id; // non-configurable: cannot be deleted
} catch (error) {
  console.log(error.name); // → TypeError
}
```

**Accessor properties** have `get` and/or `set` functions instead of a value. This is what the `get`/`set` syntax in object literals and classes creates:

```js
const user = { first: "Grace", last: "Hopper" };
Object.defineProperty(user, "fullName", {
  get() {
    return `${this.first} ${this.last}`;
  },
  set(value) {
    [this.first, this.last] = value.split(" ");
  },
  enumerable: true,
  configurable: true,
});

console.log(user.fullName); // → Grace Hopper
user.fullName = "Ada Lovelace";
console.log(user.first);    // → Ada
```

**Copying accessors.** Spread and `Object.assign` *call* getters and copy the resulting values. To copy properties together with their descriptors, use `Object.getOwnPropertyDescriptors` with `Object.defineProperties` (or `Object.create`):

```js
const source = {
  base: 10,
  get double() {
    return this.base * 2;
  },
};

const flat = { ...source };
const exact = Object.defineProperties({}, Object.getOwnPropertyDescriptors(source));

source.base = 50;
flat.base = 50;
exact.base = 50;
console.log(flat.double);  // → 20 (a plain value, frozen at copy time)
console.log(exact.double); // → 100 (still a live getter)
```

**Locking objects.** Three levels of protection, from weakest to strongest:

| Function | Add properties | Delete properties | Change values |
|---|---|---|---|
| `Object.preventExtensions(obj)` | no | yes | yes |
| `Object.seal(obj)` | no | no | yes |
| `Object.freeze(obj)` | no | no | no |

Check with `Object.isExtensible`, `Object.isSealed`, `Object.isFrozen`.

```js
"use strict";

const config = Object.freeze({ api: "https://api.example.com", retries: 3, flags: { beta: false } });

try {
  config.retries = 10;
} catch (error) {
  console.log("blocked:", error.name); // → blocked: TypeError
}

config.flags.beta = true;   // freeze is SHALLOW: nested objects are still mutable
console.log(config.flags.beta);          // → true
console.log(Object.isFrozen(config));     // → true
console.log(Object.isFrozen(config.flags)); // → false
```

**Deep freezing** applies `freeze` recursively:

```js
function deepFreeze(obj) {
  for (const value of Object.values(obj)) {
    if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  }
  return Object.freeze(obj);
}

const settings = deepFreeze({ theme: { colors: ["red", "blue"] } });
console.log(Object.isFrozen(settings.theme.colors)); // → true
```

**When to use these tools**

- `const` protects a *binding*; `Object.freeze` protects an *object*. They solve different problems.
- Freeze shared configuration and constants so accidental writes fail loudly (in strict mode).
- Non-enumerable properties are useful for metadata that should not appear in loops or JSON.
- Freezing has no meaningful runtime cost in modern engines, but deep-freezing very large structures takes time proportional to their size.

### Practice task

Write `settings.js` (in strict mode) with a function `createSettings(values)` that returns a settings object where:

1. all properties from `values` are copied (including nested objects) and the result is **deep-frozen**;
2. a **non-enumerable**, read-only property `createdBy` with the value `"settings-v1"` is added (before freezing);
3. an enumerable getter `summary` returns `"<n> top-level settings"` where `n` counts the enumerable own keys excluding `summary` itself;
4. the original `values` object is not frozen or modified (copy with `structuredClone` first).

Then run:

```js
const input = { theme: "dark", editor: { tabSize: 2, rulers: [80, 120] } };
const s = createSettings(input);

console.log(s.summary);
console.log(Object.keys(s));
console.log(s.createdBy);
console.log(JSON.stringify(s));

for (const attempt of [
  () => { s.theme = "light"; },
  () => { s.editor.tabSize = 4; },
  () => { s.editor.rulers.push(100); },
  () => { delete s.createdBy; },
]) {
  try {
    attempt();
    console.log("allowed");
  } catch (error) {
    console.log("blocked");
  }
}

input.editor.tabSize = 8;
console.log(input.editor.tabSize, s.editor.tabSize, Object.isFrozen(input));
```

### Expected result

```text
2 top-level settings
[ 'theme', 'editor', 'summary' ]
settings-v1
{"theme":"dark","editor":{"tabSize":2,"rulers":[80,120]},"summary":"2 top-level settings"}
blocked
blocked
blocked
blocked
8 2 false
```

### Acceptance criteria

- [ ] The file starts with `"use strict"` so blocked writes throw `TypeError`.
- [ ] `createdBy` is defined with `Object.defineProperty` and does not appear in `Object.keys` or JSON.
- [ ] `summary` is an accessor property (check with `Object.getOwnPropertyDescriptor(s, "summary").get`).
- [ ] Nested objects and arrays are frozen too.
- [ ] The input object remains mutable and unaffected.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```js
"use strict";

function deepFreeze(obj) {
  for (const value of Object.values(obj)) {
    if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
      deepFreeze(value);
    }
  }
  return Object.freeze(obj);
}

function createSettings(values) {
  const settings = structuredClone(values);

  Object.defineProperty(settings, "createdBy", { value: "settings-v1" });

  Object.defineProperty(settings, "summary", {
    get() {
      const count = Object.keys(this).filter((key) => key !== "summary").length;
      return `${count} top-level settings`;
    },
    enumerable: true,
  });

  return deepFreeze(settings);
}

const input = { theme: "dark", editor: { tabSize: 2, rulers: [80, 120] } };
const s = createSettings(input);

console.log(s.summary);           // → 2 top-level settings
console.log(Object.keys(s));      // → [ 'theme', 'editor', 'summary' ]
console.log(s.createdBy);         // → settings-v1
console.log(JSON.stringify(s));   // → {"theme":"dark","editor":{"tabSize":2,"rulers":[80,120]},"summary":"2 top-level settings"}

for (const attempt of [
  () => { s.theme = "light"; },
  () => { s.editor.tabSize = 4; },
  () => { s.editor.rulers.push(100); },
  () => { delete s.createdBy; },
]) {
  try {
    attempt();
    console.log("allowed");
  } catch (error) {
    console.log("blocked");
  }
}
// → blocked
// → blocked
// → blocked
// → blocked

input.editor.tabSize = 8;
console.log(input.editor.tabSize, s.editor.tabSize, Object.isFrozen(input)); // → 8 2 false
```

Note that `deepFreeze` calls `Object.values`, which reads the `summary` getter. The getter returns a string — a primitive — so `deepFreeze` simply skips it.

</details>

---

## 3.3 Symbols and the Iteration Protocols

**Goal:** Use symbols as unique property keys, customise built-in behaviour with well-known symbols, and make your own objects iterable by implementing the iterator protocol.

### Explanation

**Symbols** are a primitive type whose values are guaranteed unique. `Symbol("description")` creates a new symbol; the description is only a label for debugging.

```js
const id1 = Symbol("id");
const id2 = Symbol("id");
console.log(id1 === id2);       // → false (every symbol is unique)
console.log(id1.description);   // → id
console.log(typeof id1);        // → symbol
```

**Symbols as property keys** never clash with string keys or with other code's symbols. They are skipped by `Object.keys`, `for...in` and `JSON.stringify`, which makes them good for metadata that shouldn't interfere with normal data:

```js
const meta = Symbol("meta");
const record = { name: "Ana", [meta]: { source: "import" } };

console.log(Object.keys(record));                  // → [ 'name' ]
console.log(JSON.stringify(record));               // → {"name":"Ana"}
console.log(record[meta].source);                  // → import
console.log(Object.getOwnPropertySymbols(record)); // → [ Symbol(meta) ]
```

(They are hidden from casual iteration, not truly private — use `#private` fields for privacy.)

**Global symbols.** `Symbol.for("key")` returns the same symbol everywhere in the program (even across modules and iframes) for the same key: `Symbol.for("app.id") === Symbol.for("app.id")` is `true`.

**Well-known symbols** are built-in symbols that let your objects hook into language features:

| Symbol | Lets you customise |
|---|---|
| `Symbol.iterator` | how `for...of`, spread and destructuring iterate the object |
| `Symbol.asyncIterator` | how `for await...of` iterates it (3.4) |
| `Symbol.toPrimitive` | conversion to number/string |
| `Symbol.toStringTag` | the tag in `Object.prototype.toString` output |
| `Symbol.hasInstance` | the result of `instanceof` |

```js
class Money {
  constructor(amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }
  [Symbol.toPrimitive](hint) {
    // hint is "number", "string" or "default"
    return hint === "number" ? this.amount : `${this.amount.toFixed(2)} ${this.currency}`;
  }
  get [Symbol.toStringTag]() {
    return "Money";
  }
}

const price = new Money(9.5, "EUR");
console.log(`${price}`);       // → 9.50 EUR
console.log(+price * 2);       // → 19
console.log(price > 5);        // → true (comparison uses the number hint)
console.log(Object.prototype.toString.call(price)); // → [object Money]
```

**The iteration protocols** are what make `for...of`, spread (`...`), destructuring, `Array.from`, `Promise.all`, `new Map(...)` and more work. There are two parts:

- An **iterator** is an object with a `next()` method that returns `{ value, done }` objects. When `done` is `true`, iteration is over.
- An **iterable** is an object with a `[Symbol.iterator]()` method that returns a fresh iterator.

You can drive an iterator by hand to see the protocol:

```js
const letters = ["a", "b"];
const iterator = letters[Symbol.iterator]();
console.log(iterator.next()); // → { value: 'a', done: false }
console.log(iterator.next()); // → { value: 'b', done: false }
console.log(iterator.next()); // → { value: undefined, done: true }
```

**Making your own iterable.** Implement `[Symbol.iterator]` returning an object with `next()`:

```js
class Range {
  constructor(start, end, step = 1) {
    this.start = start;
    this.end = end;
    this.step = step;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const { end, step } = this;
    return {
      next() {
        if (current > end) {
          return { value: undefined, done: true };
        }
        const value = current;
        current += step;
        return { value, done: false };
      },
      [Symbol.iterator]() {
        return this; // iterators are conventionally iterable themselves
      },
    };
  }
}

const range = new Range(1, 10, 3);
for (const n of range) {
  console.log(n);
}
// → 1
// → 4
// → 7
// → 10
console.log([...range]);              // → [ 1, 4, 7, 10 ]
const [first, second] = range;
console.log(first, second);           // → 1 4
console.log(Math.max(...range));      // → 10
```

Because `[Symbol.iterator]()` returns a *new* iterator each time, the same `Range` can be iterated any number of times.

**Early exit and cleanup.** If a loop stops early (`break`, `return`, a thrown error, or destructuring that needs only some values), JavaScript calls the iterator's optional `return()` method. Use it to release resources:

```js
const tracked = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => ({ value: i++, done: false }), // infinite
      return: () => {
        console.log("cleanup called");
        return { done: true };
      },
    };
  },
};

for (const n of tracked) {
  if (n === 2) break;
}
// → cleanup called
```

**Iterables are lazy.** An iterator computes each value only when `next()` is called, which lets you represent infinite or very large sequences without storing them. Writing iterators by hand is verbose; **generators** (3.4) make it much easier.

### Practice task

Write `linked-list.js` with a class `LinkedList` that stores values in nodes `{ value, next }`:

1. `append(value)` adds to the end and returns `this` (for chaining); a `size` getter returns the number of nodes.
2. `[Symbol.iterator]()` implemented **by hand** (an object with `next()`, no generators) yielding values from head to tail. It must also implement `return()` that logs `iteration stopped early`.
3. `[Symbol.toPrimitive](hint)`: for `"number"`, return the size; otherwise return the values joined with `" -> "`, or `"(empty)"`.
4. A `get [Symbol.toStringTag]()` returning `"LinkedList"`.
5. A static method `LinkedList.from(iterable)` that builds a list from any iterable.

Run:

```js
const list = new LinkedList().append("a").append("b").append("c");
console.log(`${list}`);
console.log(+list);
console.log([...list]);
const [head, ...rest] = list;
console.log(head, rest);
for (const v of list) {
  if (v === "b") break;
}
console.log(Object.prototype.toString.call(list));
console.log(String(LinkedList.from(new Set([1, 2, 2, 3]))));
console.log(String(LinkedList.from("")));
console.log(Array.from(list, (v) => v.toUpperCase()));
```

### Expected result

```text
a -> b -> c
3
[ 'a', 'b', 'c' ]
a [ 'b', 'c' ]
iteration stopped early
[object LinkedList]
1 -> 2 -> 3
(empty)
[ 'A', 'B', 'C' ]
```

### Acceptance criteria

- [ ] `[Symbol.iterator]` returns a new iterator object with `next()` and `return()`; no `function*` is used.
- [ ] Iterating the same list twice works.
- [ ] `return()` is called only when the loop exits early (not after normal completion, and not by rest destructuring, which consumes everything).
- [ ] `LinkedList.from` accepts any iterable (arrays, strings, sets…).
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```js
class LinkedList {
  #head = null;
  #tail = null;
  #size = 0;

  static from(iterable) {
    const list = new LinkedList();
    for (const value of iterable) list.append(value);
    return list;
  }

  append(value) {
    const node = { value, next: null };
    if (this.#tail) {
      this.#tail.next = node;
    } else {
      this.#head = node;
    }
    this.#tail = node;
    this.#size++;
    return this;
  }

  get size() {
    return this.#size;
  }

  [Symbol.iterator]() {
    let node = this.#head;
    return {
      next() {
        if (node === null) return { value: undefined, done: true };
        const value = node.value;
        node = node.next;
        return { value, done: false };
      },
      return() {
        console.log("iteration stopped early");
        return { value: undefined, done: true };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  }

  [Symbol.toPrimitive](hint) {
    if (hint === "number") return this.#size;
    return this.#size === 0 ? "(empty)" : [...this].join(" -> ");
  }

  get [Symbol.toStringTag]() {
    return "LinkedList";
  }
}

const list = new LinkedList().append("a").append("b").append("c");
console.log(`${list}`);    // → a -> b -> c
console.log(+list);        // → 3
console.log([...list]);    // → [ 'a', 'b', 'c' ]
const [head, ...rest] = list;
console.log(head, rest);   // → a [ 'b', 'c' ]
for (const v of list) {
  if (v === "b") break;    // → iteration stopped early
}
console.log(Object.prototype.toString.call(list)); // → [object LinkedList]
console.log(String(LinkedList.from(new Set([1, 2, 2, 3])))); // → 1 -> 2 -> 3
console.log(String(LinkedList.from("")));          // → (empty)
console.log(Array.from(list, (v) => v.toUpperCase())); // → [ 'A', 'B', 'C' ]
```

</details>

---

## 3.4 Generators

**Goal:** Write generator functions to produce lazy and infinite sequences, compose them, delegate with `yield*`, communicate with a running generator, and process asynchronous streams with async generators and `for await...of`.

### Explanation

A **generator function** (written `function*`) can pause and resume. Calling it does not run its body; it returns a **generator object**, which is both an iterator and an iterable (3.3). Each call to `next()` runs the body until the next `yield`, which pauses the function and hands out a value.

```js
function* threeSteps() {
  console.log("  (starting)");
  yield "first";
  console.log("  (resumed)");
  yield "second";
  return "done";
}

const gen = threeSteps();
console.log("created");
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
// → created
// →   (starting)
// → { value: 'first', done: false }
// →   (resumed)
// → { value: 'second', done: false }
// → { value: 'done', done: true }
// → { value: undefined, done: true }
```

Note that `for...of` and spread ignore the `return` value (the value with `done: true`).

**Generators make iterables easy.** The `Range` iterator from 3.3 shrinks to a few lines:

```js
class Range {
  constructor(start, end, step = 1) {
    Object.assign(this, { start, end, step });
  }
  *[Symbol.iterator]() {
    for (let n = this.start; n <= this.end; n += this.step) {
      yield n;
    }
  }
}
console.log([...new Range(0, 20, 5)]); // → [ 0, 5, 10, 15, 20 ]
```

**Lazy and infinite sequences.** Values are produced only on demand, so a generator can describe an infinite sequence safely, as long as the consumer stops:

```js
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

function* take(iterable, count) {
  if (count <= 0) return;
  for (const value of iterable) {
    yield value;
    if (--count === 0) return;
  }
}

console.log([...take(fibonacci(), 10)].join(", ")); // → 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
```

**Delegation with `yield*`** yields every value from another iterable or generator — perfect for recursive structures:

```js
const tree = {
  name: "root",
  children: [
    { name: "a", children: [{ name: "a1", children: [] }] },
    { name: "b", children: [] },
  ],
};

function* walk(node, depth = 0) {
  yield `${"  ".repeat(depth)}${node.name}`;
  for (const child of node.children) {
    yield* walk(child, depth + 1);
  }
}

for (const line of walk(tree)) console.log(line);
// → root
// →   a
// →     a1
// →   b
```

**Two-way communication.** The value passed to `next(value)` becomes the result of the `yield` expression where the generator paused. (The first `next()` just starts the generator, so its argument is ignored.)

```js
function* runningAverage() {
  let total = 0;
  let count = 0;
  let average = null;
  while (true) {
    const value = yield average;
    total += value;
    count++;
    average = total / count;
  }
}

const avg = runningAverage();
avg.next(); // start: runs up to the first yield
console.log(avg.next(10).value); // → 10
console.log(avg.next(20).value); // → 15
console.log(avg.next(60).value); // → 30
```

**Stopping a generator.** `gen.return(value)` finishes it as if a `return` statement ran at the paused `yield`; `gen.throw(error)` throws the error there. Either way, `finally` blocks inside the generator run, which makes them ideal for cleanup — and `for...of` calls `return()` automatically when you `break`:

```js
function* resource() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } finally {
    console.log("resource released");
  }
}

for (const value of resource()) {
  console.log(value);
  if (value === 2) break;
}
// → 1
// → 2
// → resource released
```

**Async generators** (`async function*`) can `await` inside and produce values asynchronously. Consume them with **`for await...of`**. They are a natural fit for paginated APIs, streams, and polling:

```js
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulated API: returns one page of items at a time
async function fetchPage(page) {
  await sleep(10);
  const pages = { 1: ["a", "b"], 2: ["c", "d"], 3: ["e"] };
  return { items: pages[page], nextPage: page < 3 ? page + 1 : null };
}

async function* allItems() {
  let page = 1;
  while (page !== null) {
    const { items, nextPage } = await fetchPage(page);
    yield* items; // yield each item of the page
    page = nextPage;
  }
}

async function main() {
  const collected = [];
  for await (const item of allItems()) {
    collected.push(item);
  }
  console.log(collected); // → [ 'a', 'b', 'c', 'd', 'e' ]
}
main();
```

The consumer simply loops; all the paging logic lives in one place.

### Practice task

Write `lazy.js` containing small, composable generator utilities:

1. `naturals(start = 1)` — infinite generator `start, start+1, …`.
2. `map(iterable, fn)`, `filter(iterable, predicate)`, `take(iterable, n)` — lazy generator versions (each must accept *any* iterable).
3. `chunk(iterable, size)` — yields arrays of `size` items (the last may be shorter).
4. `pipe(source, ...steps)` — applies functions left to right: `pipe(x, f, g)` = `g(f(x))`.

Then print:

- the first 5 squares of odd numbers, using `pipe(naturals(), (it) => filter(it, odd), (it) => map(it, square), (it) => take(it, 5))` spread into an array;
- how many times `square` was called (it must be 5 — proof of laziness);
- the numbers 1–7 in chunks of 3;
- for the async part: an `async function* ticker(count, ms)` yielding `"tick 1"`, `"tick 2"`, … every `ms` milliseconds; consume it with `for await` and print each tick.

### Expected result

```text
[ 1, 9, 25, 49, 81 ]
square called 5 times
[ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7 ] ]
tick 1
tick 2
tick 3
```

### Acceptance criteria

- [ ] Every utility is a generator (`function*`) and works on arrays, strings, sets and other generators.
- [ ] Nothing is computed beyond what is consumed (`square` runs exactly 5 times).
- [ ] `take` stops pulling from the source as soon as it has `n` items, so it works on infinite sources.
- [ ] `chunk` yields the final partial chunk.
- [ ] `ticker` is an `async function*` and is consumed with `for await...of`.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```js
function* naturals(start = 1) {
  for (let n = start; ; n++) yield n;
}

function* map(iterable, fn) {
  for (const value of iterable) yield fn(value);
}

function* filter(iterable, predicate) {
  for (const value of iterable) {
    if (predicate(value)) yield value;
  }
}

function* take(iterable, n) {
  if (n <= 0) return;
  for (const value of iterable) {
    yield value;
    if (--n === 0) return;
  }
}

function* chunk(iterable, size) {
  let current = [];
  for (const value of iterable) {
    current.push(value);
    if (current.length === size) {
      yield current;
      current = [];
    }
  }
  if (current.length > 0) yield current;
}

const pipe = (source, ...steps) => steps.reduce((acc, step) => step(acc), source);

let squareCalls = 0;
const square = (n) => {
  squareCalls++;
  return n * n;
};
const odd = (n) => n % 2 === 1;

const result = pipe(
  naturals(),
  (it) => filter(it, odd),
  (it) => map(it, square),
  (it) => take(it, 5)
);
console.log([...result]); // → [ 1, 9, 25, 49, 81 ]
console.log(`square called ${squareCalls} times`); // → square called 5 times

console.log([...chunk(take(naturals(), 7), 3)]); // → [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7 ] ]

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function* ticker(count, ms) {
  for (let i = 1; i <= count; i++) {
    await sleep(ms);
    yield `tick ${i}`;
  }
}

async function main() {
  for await (const tick of ticker(3, 20)) {
    console.log(tick);
  }
}
main();
// → tick 1
// → tick 2
// → tick 3
```

</details>

---

## 3.5 Map, Set, WeakMap and WeakSet

**Goal:** Choose the right keyed collection, use `Map` and `Set` with their full APIs including the ES2025 set operations, and use weak collections to associate data with objects without causing memory leaks.

### Explanation

**`Map`** stores key–value pairs, like an object, but:

- keys can be **any value** — objects, functions, `NaN` — not just strings and symbols;
- it remembers **insertion order** and is directly iterable;
- it has a `size` property and no inherited keys to collide with;
- it is optimised for frequent additions and deletions.

```js
const visits = new Map();
const homePage = { path: "/" };

visits.set(homePage, 1);                  // object as key
visits.set("/about", 3);
visits.set("/about", visits.get("/about") + 1);

console.log(visits.get(homePage));        // → 1
console.log(visits.get("/about"));        // → 4
console.log(visits.has("/contact"));      // → false
console.log(visits.size);                 // → 2

for (const [page, count] of visits) {
  console.log(typeof page === "string" ? page : page.path, count);
}
// → / 1
// → /about 4

visits.delete(homePage);
console.log([...visits.keys()]);          // → [ '/about' ]

// Converting between objects and maps
const prices = new Map(Object.entries({ apple: 1.2, pear: 0.9 }));
console.log(prices);                      // → Map(2) { 'apple' => 1.2, 'pear' => 0.9 }
console.log(Object.fromEntries(prices));  // → { apple: 1.2, pear: 0.9 }
```

**Object or Map?** Use an object for a *record* with a fixed, known set of fields (`{ name, age }`) and for JSON. Use a `Map` for a *dictionary* whose keys are data (user IDs, words, DOM nodes), especially when keys are added and removed at run time.

**`Map.groupBy`** (ES2024) groups items into a `Map`, so keys can be any value:

```js
const people = [{ name: "Ana", age: 17 }, { name: "Ben", age: 34 }, { name: "Cy", age: 15 }];
const byAdult = Map.groupBy(people, (p) => p.age >= 18);
console.log(byAdult.get(false).map((p) => p.name)); // → [ 'Ana', 'Cy' ]
```

**`Set`** stores **unique** values (compared like `===`, except `NaN` equals `NaN`), in insertion order:

```js
const tags = new Set(["js", "web", "js", "node"]);
console.log(tags);            // → Set(3) { 'js', 'web', 'node' }
console.log(tags.size);       // → 3
console.log(tags.has("web")); // → true
tags.add("css").delete("node");
console.log([...tags]);       // → [ 'js', 'web', 'css' ]

const unique = [...new Set([3, 1, 3, 2, 1])]; // the idiomatic way to remove duplicates
console.log(unique);          // → [ 3, 1, 2 ]
```

`set.has(x)` is fast (roughly constant time) regardless of size, whereas `array.includes(x)` checks items one by one. Converting a large array to a `Set` before many lookups is a classic performance win (3.9).

**Set operations (ES2025).** Sets have methods for the operations from mathematics. They return new sets (or booleans) and accept any set-like argument:

```js
const frontend = new Set(["html", "css", "js"]);
const backend = new Set(["js", "sql", "node"]);

console.log(frontend.union(backend));               // → Set(5) { 'html', 'css', 'js', 'sql', 'node' }
console.log(frontend.intersection(backend));        // → Set(1) { 'js' }
console.log(frontend.difference(backend));          // → Set(2) { 'html', 'css' }
console.log(frontend.symmetricDifference(backend)); // → Set(4) { 'html', 'css', 'sql', 'node' }
console.log(new Set(["js"]).isSubsetOf(frontend));  // → true
console.log(frontend.isDisjointFrom(new Set(["go"]))); // → true
```

(These are supported in Node.js 22+ and all current browsers.)

**Weak collections.** `WeakMap` and `WeakSet` hold their keys **weakly**: if nothing else in the program references a key object, the garbage collector may delete it — and its entry — automatically. Consequences:

- keys must be objects (or non-registered symbols), not primitives;
- they are not iterable and have no `size` (their contents can change at any time);
- they are ideal for attaching data to objects you don't own, without preventing those objects from being freed.

```js
// Cache computed results per object without leaking memory
const cache = new WeakMap();

function expensiveStats(data) {
  if (cache.has(data)) return cache.get(data);
  const stats = { sum: data.values.reduce((a, b) => a + b, 0) };
  cache.set(data, stats);
  return stats;
}

let dataset = { values: [1, 2, 3] };
console.log(expensiveStats(dataset).sum);              // → 6
console.log(expensiveStats(dataset) === expensiveStats(dataset)); // → true (cached)
dataset = null; // the dataset and its cache entry can now be garbage-collected
```

```js
// WeakSet: mark objects without modifying them
const processed = new WeakSet();
const job = { id: 1 };
processed.add(job);
console.log(processed.has(job));      // → true
console.log(processed.has({ id: 1 })); // → false (a different object)
```

**`WeakRef` and `FinalizationRegistry`** (ES2021) give lower-level access to weak references and cleanup callbacks. Garbage collection timing is unpredictable, so these are for rare, advanced cases such as caches of large resources; prefer `WeakMap` when it fits.

### Practice task

Write `collections.js`.

1. **LRU cache.** Implement `class LRUCache` with a `capacity`, using a single `Map` (which preserves insertion order). `get(key)` returns the value (or `undefined`) and marks the key as most recently used; `set(key, value)` inserts/updates and marks it most recent, evicting the **least** recently used entry when over capacity. Add a `keys()` method returning the keys from least to most recently used.
2. **Word frequency.** Write `topWords(text, n)` that lower-cases the text, extracts words with `/[a-z']+/g`, counts them in a `Map`, and returns the `n` most frequent as `[word, count]` pairs (ties broken alphabetically).
3. **Skill matching.** Given a set of required skills and a list of candidates with skill sets, print for each candidate the matched skills (intersection) and missing skills (difference), and whether they qualify (`isSupersetOf`).

Run:

```js
const lru = new LRUCache(2);
lru.set("a", 1).set("b", 2);
lru.get("a");
lru.set("c", 3);
console.log(lru.keys(), lru.get("b"), lru.get("c"));

console.log(topWords("The cat and the hat. The cat sat; a cat? THE END", 3));

const required = new Set(["js", "css", "git"]);
const candidates = [
  { name: "Ana", skills: new Set(["js", "css", "git", "sql"]) },
  { name: "Ben", skills: new Set(["js", "python"]) },
];
for (const { name, skills } of candidates) {
  console.log(name, [...skills.intersection(required)], [...required.difference(skills)], skills.isSupersetOf(required));
}
```

### Expected result

```text
[ 'a', 'c' ] undefined 3
[ [ 'the', 4 ], [ 'cat', 3 ], [ 'a', 1 ] ]
Ana [ 'js', 'css', 'git' ] [] true
Ben [ 'js' ] [ 'css', 'git' ] false
```

Note that after `lru.get("c")`, `c` becomes most recently used, but `keys()` was evaluated before that call in the same `console.log` — arguments are evaluated left to right.

### Acceptance criteria

- [ ] `LRUCache` uses one `Map`; `get` re-inserts the key (delete then set) to mark it recent; eviction uses `map.keys().next().value`.
- [ ] `set` returns `this` so calls can be chained.
- [ ] `topWords` counts with a `Map` and sorts by count descending, then word ascending.
- [ ] Skill matching uses the ES2025 `Set` methods rather than manual loops.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```js
class LRUCache {
  #map = new Map();

  constructor(capacity) {
    this.capacity = capacity;
  }

  get(key) {
    if (!this.#map.has(key)) return undefined;
    const value = this.#map.get(key);
    this.#map.delete(key);
    this.#map.set(key, value); // move to the "most recent" end
    return value;
  }

  set(key, value) {
    this.#map.delete(key);
    this.#map.set(key, value);
    if (this.#map.size > this.capacity) {
      const oldest = this.#map.keys().next().value;
      this.#map.delete(oldest);
    }
    return this;
  }

  keys() {
    return [...this.#map.keys()];
  }
}

function topWords(text, n) {
  const counts = new Map();
  for (const word of text.toLowerCase().match(/[a-z']+/g) ?? []) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return [...counts]
    .sort(([wordA, countA], [wordB, countB]) => countB - countA || wordA.localeCompare(wordB))
    .slice(0, n);
}

const lru = new LRUCache(2);
lru.set("a", 1).set("b", 2);
lru.get("a");
lru.set("c", 3);
console.log(lru.keys(), lru.get("b"), lru.get("c")); // → [ 'a', 'c' ] undefined 3

console.log(topWords("The cat and the hat. The cat sat; a cat? THE END", 3));
// → [ [ 'the', 4 ], [ 'cat', 3 ], [ 'a', 1 ] ]

const required = new Set(["js", "css", "git"]);
const candidates = [
  { name: "Ana", skills: new Set(["js", "css", "git", "sql"]) },
  { name: "Ben", skills: new Set(["js", "python"]) },
];
for (const { name, skills } of candidates) {
  console.log(name, [...skills.intersection(required)], [...required.difference(skills)], skills.isSupersetOf(required));
}
// → Ana [ 'js', 'css', 'git' ] [] true
// → Ben [ 'js' ] [ 'css', 'git' ] false
```

</details>

---
## 3.6 Proxy and Reflect

**Goal:** Intercept fundamental object operations with `Proxy` traps, forward default behaviour with `Reflect`, and build validation, defaults and change-tracking on top of them — while knowing the costs and limitations.

### Explanation

A **`Proxy`** wraps a **target** object and lets a **handler** intercept operations on it — reading, writing, deleting, checking `in`, listing keys, calling. Each intercepting function is called a **trap**. Operations without a trap pass straight through to the target.

```js
const target = { name: "Ada" };

const logged = new Proxy(target, {
  get(obj, prop, receiver) {
    console.log(`get ${String(prop)}`);
    return Reflect.get(obj, prop, receiver);
  },
  set(obj, prop, value, receiver) {
    console.log(`set ${String(prop)} = ${value}`);
    return Reflect.set(obj, prop, value, receiver);
  },
});

const n = logged.name;  // → get name
logged.age = 36;        // → set age = 36
console.log(target.age); // → 36 (the change reached the target)
console.log(n);          // → Ada
```

**Common traps**

| Trap | Intercepts |
|---|---|
| `get(target, prop, receiver)` | `proxy.x`, `proxy[x]` |
| `set(target, prop, value, receiver)` | `proxy.x = v` — must return `true` on success |
| `has(target, prop)` | `prop in proxy` |
| `deleteProperty(target, prop)` | `delete proxy.x` |
| `ownKeys(target)` | `Object.keys`, `for...in`, `Reflect.ownKeys` |
| `apply(target, thisArg, args)` | calling a proxied **function** |
| `construct(target, args)` | `new proxy()` |

**`Reflect`** is a built-in object with one method per trap (`Reflect.get`, `Reflect.set`, `Reflect.has`, `Reflect.deleteProperty`, `Reflect.ownKeys`, `Reflect.apply`, …) that performs the *default* behaviour. Inside traps, forward to `Reflect` instead of re-implementing the operation; passing `receiver` along keeps getters and inheritance working correctly. `Reflect` methods also return booleans instead of throwing, which is convenient on its own.

**Validation**

```js
"use strict";

function typed(schema) {
  return new Proxy({}, {
    set(obj, prop, value) {
      const expected = schema[prop];
      if (!expected) {
        throw new TypeError(`Unknown property "${prop}"`);
      }
      if (typeof value !== expected) {
        throw new TypeError(`${prop} must be a ${expected}`);
      }
      return Reflect.set(obj, prop, value);
    },
  });
}

const person = typed({ name: "string", age: "number" });
person.name = "Lin";
for (const action of [() => { person.age = "old"; }, () => { person.email = "x"; }]) {
  try {
    action();
  } catch (error) {
    console.log(error.message);
  }
}
// → age must be a number
// → Unknown property "email"
console.log(person.name); // → Lin
```

**Default values and computed properties.** A `get` trap can supply values for missing properties — here, negative array indexes:

```js
function withNegativeIndexes(array) {
  return new Proxy(array, {
    get(target, prop, receiver) {
      if (typeof prop === "string" && /^-\d+$/.test(prop)) {
        prop = String(target.length + Number(prop));
      }
      return Reflect.get(target, prop, receiver);
    },
  });
}

const letters = withNegativeIndexes(["a", "b", "c"]);
console.log(letters[-1], letters[-3], letters[0]); // → c a a
console.log(letters.length);                       // → 3 (other operations still work)
```

(Property keys reaching a trap are always strings or symbols, even when you write a number.)

**The `has` trap** customises `in`:

```js
const workingHours = new Proxy({}, {
  has(_, hour) {
    return Number(hour) >= 9 && Number(hour) < 17;
  },
});
console.log(10 in workingHours, 20 in workingHours); // → true false
```

**Function proxies** with `apply` can add logging, timing or caching around any function without changing it:

```js
function traced(fn) {
  return new Proxy(fn, {
    apply(target, thisArg, args) {
      const result = Reflect.apply(target, thisArg, args);
      console.log(`${target.name}(${args.join(", ")}) = ${result}`);
      return result;
    },
  });
}

const add = traced(function add(a, b) {
  return a + b;
});
add(2, 3); // → add(2, 3) = 5
```

**Revocable proxies.** `Proxy.revocable(target, handler)` returns `{ proxy, revoke }`; after `revoke()`, every operation on the proxy throws a `TypeError`. Useful for handing out temporary access.

**Limitations and costs**

- A proxy is a different object: `proxy !== target`.
- Objects with internal slots — `Map`, `Set`, `Date`, and class instances with `#private` fields — don't work transparently through a proxy, because their methods check the real object (e.g. `new Proxy(new Map(), {}).get("x")` throws a `TypeError`).
- Every trapped operation runs extra code. Proxies are fine for configuration, validation, developer tooling and reactive UI state (Vue's reactivity system is built on them), but avoid them in hot loops.
- Traps must respect certain *invariants* (for example, a `get` trap can't report a different value for a non-writable, non-configurable property); violating them throws.

### Practice task

Write `model.js` with a function `createModel(schema, initial, onChange)` that returns a proxy implementing a small validated, observable data model.

- `schema` maps property names to type names, e.g. `{ title: "string", done: "boolean", priority: "number" }`.
- Setting a property not in the schema throws `TypeError("Unknown property: <prop>")`.
- Setting a value of the wrong type throws `TypeError("<prop> must be <type>")`.
- Setting a property to the value it already has does nothing (no `onChange` call).
- Successful changes call `onChange(prop, oldValue, newValue)` **after** the value is stored.
- Deleting any property throws `TypeError("Cannot delete <prop>")`.
- Reading a property that is in the schema but not set returns `null` (not `undefined`).
- `Object.keys(model)` returns only the properties that have been set (no trap needed — explain why).
- The `initial` values are validated the same way, but without calling `onChange`.

Run (in strict mode):

```js
const log = [];
const todo = createModel(
  { title: "string", done: "boolean", priority: "number" },
  { title: "Write docs" },
  (prop, from, to) => log.push(`${prop}: ${from} -> ${to}`)
);

todo.done = false;
todo.done = true;
todo.done = true;
todo.priority = 2;
for (const action of [
  () => { todo.priority = "high"; },
  () => { todo.owner = "me"; },
  () => { delete todo.title; },
]) {
  try {
    action();
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
  }
}
for (const entry of log) console.log(entry);
console.log(todo.title, todo.done, todo.priority);
console.log(Object.keys(todo));
console.log(createModel({ n: "number" }, {}, () => {}).n);
try {
  createModel({ n: "number" }, { n: "1" }, () => {});
} catch (error) {
  console.log(error.message);
}
```

### Expected result

```text
TypeError: priority must be number
TypeError: Unknown property: owner
TypeError: Cannot delete title
done: undefined -> false
done: false -> true
priority: undefined -> 2
Write docs true 2
[ 'title', 'done', 'priority' ]
null
n must be number
```

### Acceptance criteria

- [ ] The proxy uses `get`, `set` and `deleteProperty` traps and forwards to `Reflect` for the default behaviour.
- [ ] `set` returns `true` after a successful write.
- [ ] Unchanged values don't trigger `onChange`.
- [ ] Initial values are validated by the same code path, without notifications.
- [ ] Reading an unset schema property returns `null`; reading an unknown property returns `undefined`.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```js
"use strict";

function createModel(schema, initial, onChange) {
  const data = {};

  function validate(prop, value) {
    if (!Object.hasOwn(schema, prop)) {
      throw new TypeError(`Unknown property: ${String(prop)}`);
    }
    if (typeof value !== schema[prop]) {
      throw new TypeError(`${String(prop)} must be ${schema[prop]}`);
    }
  }

  for (const [prop, value] of Object.entries(initial)) {
    validate(prop, value);
    data[prop] = value;
  }

  return new Proxy(data, {
    get(target, prop, receiver) {
      if (typeof prop === "string" && Object.hasOwn(schema, prop) && !Object.hasOwn(target, prop)) {
        return null;
      }
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      validate(prop, value);
      const old = target[prop];
      if (Object.is(old, value)) return true;
      Reflect.set(target, prop, value, receiver);
      onChange(prop, old, value);
      return true;
    },
    deleteProperty(_, prop) {
      throw new TypeError(`Cannot delete ${String(prop)}`);
    },
  });
}

const log = [];
const todo = createModel(
  { title: "string", done: "boolean", priority: "number" },
  { title: "Write docs" },
  (prop, from, to) => log.push(`${prop}: ${from} -> ${to}`)
);

todo.done = false;
todo.done = true;
todo.done = true;
todo.priority = 2;
for (const action of [
  () => { todo.priority = "high"; },
  () => { todo.owner = "me"; },
  () => { delete todo.title; },
]) {
  try {
    action();
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
  }
}
// → TypeError: priority must be number
// → TypeError: Unknown property: owner
// → TypeError: Cannot delete title
for (const entry of log) console.log(entry);
// → done: undefined -> false
// → done: false -> true
// → priority: undefined -> 2
console.log(todo.title, todo.done, todo.priority); // → Write docs true 2
console.log(Object.keys(todo)); // → [ 'title', 'done', 'priority' ]
console.log(createModel({ n: "number" }, {}, () => {}).n); // → null
try {
  createModel({ n: "number" }, { n: "1" }, () => {});
} catch (error) {
  console.log(error.message); // → n must be number
}
```

`Object.keys` works without an `ownKeys` trap because operations without a trap are forwarded to the target, which only holds the properties that were actually set.

</details>

---

## 3.7 The Event Loop in Depth

**Goal:** Predict the exact execution order of synchronous code, microtasks (promises, `await`, `queueMicrotask`) and tasks (timers, I/O, events); explain how long-running code blocks the page; and split heavy work into chunks.

### Explanation

Topic 2.12 described the event loop in simple terms. Here is the fuller model used by browsers and Node.js:

```text
┌──────────────────────────────┐
│ 1. Run one TASK to completion │  (the initial script, a timer callback, an event handler, an I/O callback)
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────────────────────┐
│ 2. Run ALL MICROTASKS, including any queued   │  (promise reactions, code after await,
│    while running them, until the queue empties │   queueMicrotask callbacks)
└──────────────┬───────────────────────────────┘
               ▼
┌──────────────────────────────┐
│ 3. (Browser) render if needed │  requestAnimationFrame callbacks → style → layout → paint
└──────────────┬───────────────┘
               └──────────► back to 1
```

Key consequences:

- **Synchronous code always finishes first.** Nothing interrupts a running function.
- **Microtasks run before the next task.** A resolved promise's `.then` callback runs before a `setTimeout(..., 0)` callback queued earlier.
- **`await` splits a function.** Code after `await` runs later as a microtask, even if the awaited value is not a promise.
- Microtasks queued by microtasks run in the same round, so an endless chain of microtasks starves timers, events and rendering.

**Predicting the order**

```js
console.log("A: script start");

setTimeout(() => console.log("H: timeout"), 0);

Promise.resolve()
  .then(() => console.log("D: then 1"))
  .then(() => console.log("G: then 2"));

queueMicrotask(() => console.log("E: queueMicrotask"));

(async () => {
  console.log("B: async function body (synchronous part)");
  await null;
  console.log("F: after await");
})();

console.log("C: script end");
// → A: script start
// → B: async function body (synchronous part)
// → C: script end
// → D: then 1
// → E: queueMicrotask
// → F: after await
// → G: then 2
// → H: timeout
```

Walkthrough: `A`, `B` and `C` are synchronous. The script task ends; the microtask queue holds, in order, `then 1`, the `queueMicrotask` callback and the continuation after `await`. Running `then 1` queues `then 2` at the back. Only when all microtasks are done does the timer task run.

**Node.js extras.** Node adds two more queues:

- `process.nextTick(fn)` callbacks run before promise microtasks.
- `setImmediate(fn)` runs in a separate phase after I/O polling. Relative to `setTimeout(fn, 0)` its order is not guaranteed in the main script, but inside an I/O callback `setImmediate` always runs first.

```js
// Save as a CommonJS .js file (in ES modules, the promise may run before nextTick)
Promise.resolve().then(() => console.log("promise microtask"));
process.nextTick(() => console.log("nextTick"));
console.log("sync");
// → sync
// → nextTick
// → promise microtask
```

**Blocking.** Because everything shares one thread, a long synchronous computation delays *every* timer, event handler and (in browsers) screen update:

```js
const start = Date.now();
setTimeout(() => {
  const waited = Date.now() - start;
  console.log(waited >= 200 ? "timer delayed by blocking code" : "timer on time");
}, 10);

while (Date.now() - start < 200) {
  // busy-wait 200 ms: nothing else can run
}
console.log("blocking loop finished");
// → blocking loop finished
// → timer delayed by blocking code
```

In a browser, this freezes clicks, typing and animations. Browsers flag tasks over 50 ms as **long tasks**.

**Splitting heavy work.** Process large jobs in chunks and yield to the event loop between them, so other tasks (input, rendering, timers) get a turn. Yielding with `setTimeout` schedules a new *task*; yielding with a resolved promise does **not** help, because microtasks run before anything else:

```js
const yieldToEventLoop = () => new Promise((resolve) => setTimeout(resolve, 0));

async function sumInChunks(count, chunkSize) {
  let total = 0;
  for (let i = 1; i <= count; i++) {
    total += i;
    if (i % chunkSize === 0) {
      await yieldToEventLoop(); // let other tasks run
    }
  }
  return total;
}

setTimeout(() => console.log("other work got a turn"), 0);
sumInChunks(1_000_000, 250_000).then((total) => console.log("total", total));
// → other work got a turn
// → total 500000500000
```

Browsers also offer `scheduler.yield()` (in Chromium-based browsers) and `requestIdleCallback` for this; for truly heavy computation, move it to a **Web Worker** / `worker_threads` (3.9).

**`requestAnimationFrame(callback)`** (browsers only) runs the callback just before the next repaint, about 60 times per second. Use it for visual updates and animations rather than `setInterval`.

### Practice task

**Part 1 — predict.** Write down the output of this program before running it:

```js
console.log("1");
setTimeout(() => {
  console.log("2");
  Promise.resolve().then(() => console.log("3"));
}, 0);
setTimeout(() => console.log("4"), 0);
Promise.resolve().then(() => {
  console.log("5");
  setTimeout(() => console.log("6"), 0);
  queueMicrotask(() => console.log("7"));
});
(async () => {
  console.log("8");
  await undefined;
  console.log("9");
})();
console.log("10");
```

**Part 2 — implement.** Write `processInChunks(items, fn, chunkSize)`: an `async` function that calls `fn(item)` for every item, yields to the event loop with `setTimeout` after each chunk, logs `chunk <first>-<last>` after each chunk (using the items' values), and returns the number of processed items. Demonstrate it on the numbers 1–9 with chunk size 3, with a heartbeat `setTimeout(() => console.log("heartbeat"), 0)` scheduled just before the call, and print `processed <n>` at the end.

### Expected result

Part 1:

```text
1
8
10
5
9
7
2
3
4
6
```

Part 2:

```text
chunk 1-3
heartbeat
chunk 4-6
chunk 7-9
processed 9
```

Part 2 shows that the heartbeat (a separate task) ran between chunks instead of waiting for all processing to finish.

### Acceptance criteria

- [ ] Your written prediction for Part 1 matches, or you can explain each difference using the task/microtask model.
- [ ] You can explain why `7` prints before `2` and why `3` prints before `4`.
- [ ] `processInChunks` yields with `setTimeout`, not with `Promise.resolve()` (try both and explain the difference).
- [ ] `processInChunks` handles a final partial chunk (try 10 items).
- [ ] Part 2 output matches exactly.

<details>
<summary>Reference solution (Part 2)</summary>

```js
const yieldToEventLoop = () => new Promise((resolve) => setTimeout(resolve, 0));

async function processInChunks(items, fn, chunkSize) {
  for (let start = 0; start < items.length; start += chunkSize) {
    const chunk = items.slice(start, start + chunkSize);
    chunk.forEach(fn);
    console.log(`chunk ${chunk[0]}-${chunk.at(-1)}`);
    await yieldToEventLoop();
  }
  return items.length;
}

const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
let sum = 0;

setTimeout(() => console.log("heartbeat"), 0);
processInChunks(numbers, (n) => { sum += n; }, 3)
  .then((count) => console.log(`processed ${count}`));
// → chunk 1-3
// → heartbeat
// → chunk 4-6
// → chunk 7-9
// → processed 9
```

With `Promise.resolve()` instead of `setTimeout`, all three chunks would print before `heartbeat`, because the continuation after each `await` is a microtask that runs before any timer.

</details>

---

## 3.8 Memory Management

**Goal:** Explain how JavaScript allocates and frees memory, recognise the common causes of memory leaks, fix them, and use tools to investigate memory usage.

### Explanation

JavaScript manages memory automatically. When you create objects, arrays, strings or functions, the engine **allocates** memory for them. A **garbage collector** (GC) periodically frees memory that the program can no longer use.

**Reachability.** Modern engines decide what to free by *reachability*. Starting from **roots** — global variables, the variables of currently running functions, and other internal references — the collector follows every reference. Anything it can reach is kept; everything else is garbage. (This "mark-and-sweep" approach correctly handles cycles: two objects referencing only each other are freed once nothing reachable points at them.)

```js
let user = { name: "Ana", profile: { bio: "..." } };
let alias = user;   // two references to the same object

user = null;        // the object is still reachable through alias
alias = null;       // now unreachable: eligible for garbage collection
console.log(user, alias); // → null null
```

You cannot force or predict *when* collection happens; you control only *what stays reachable*.

**Stack and heap.** Primitive values in local variables and call information live on the **stack**, which is freed automatically when functions return. Objects live on the **heap**, managed by the GC. Engines like V8 use a *generational* heap: most objects die young, so new objects are collected frequently and cheaply, while long-lived ones are moved to an "old generation" collected less often.

**A memory leak** in a garbage-collected language is memory that is *still reachable but no longer needed*. The usual culprits:

| Cause | Example | Fix |
|---|---|---|
| Unbounded collections | a cache `Map` that only grows | limit its size (LRU, 3.5), expire entries, or use `WeakMap` |
| Forgotten listeners | `emitter.on(...)` / `addEventListener` for every new component, never removed | remove listeners in a `dispose`/cleanup method, use `{ once: true }` or an `AbortSignal` |
| Forgotten timers | `setInterval` that is never cleared keeps its callback and everything it references alive | `clearInterval` on cleanup |
| Closures holding big data | a small callback that captures a huge array it doesn't need | copy just the needed values into the closure |
| Detached DOM nodes | removed elements still referenced from JavaScript (e.g. in an array or `Map`) | drop references, or key metadata by element in a `WeakMap` |
| Accidental globals | assigning to an undeclared variable in sloppy mode | use strict mode / modules |

**Closures capturing more than needed**

```js
function makeReporter(bigData) {
  // BAD: the returned function keeps all of bigData alive
  // return () => `items: ${bigData.length}`;

  // GOOD: capture only what is needed
  const count = bigData.length;
  return () => `items: ${count}`;
}
const report = makeReporter(new Array(1_000_000).fill("x"));
console.log(report()); // → items: 1000000
```

**Listeners and timers.** Every registered listener keeps its callback (and its closure) alive as long as the emitter lives. Pair every subscription with an unsubscription:

```js
const { EventEmitter } = require("node:events");

const feed = new EventEmitter();

class Widget {
  #onData = (value) => {
    this.last = value;
  };
  #timer;

  constructor() {
    feed.on("data", this.#onData);
    this.#timer = setInterval(() => {}, 1000);
  }

  dispose() {
    feed.off("data", this.#onData); // same function reference as in on()
    clearInterval(this.#timer);
  }
}

const widgets = Array.from({ length: 5 }, () => new Widget());
console.log(feed.listenerCount("data")); // → 5
widgets.forEach((w) => w.dispose());
console.log(feed.listenerCount("data")); // → 0
// The process exits normally: no intervals are left running.
```

Node.js warns (`MaxListenersExceededWarning`) when more than 10 listeners are added for one event — often a sign of this exact leak. In the browser, the equivalent is `addEventListener` with an `AbortController`:

```js
const controller = new AbortController();
window.addEventListener("resize", onResize, { signal: controller.signal });
document.addEventListener("keydown", onKey, { signal: controller.signal });
// later, one call removes both:
controller.abort();
```

**Measuring memory**

- **Node.js:** `process.memoryUsage()` returns `heapUsed`, `heapTotal`, `rss` (total process memory) and more, in bytes. Run `node --inspect script.js` and open `chrome://inspect` to use Chrome DevTools on a Node process. Starting Node with `--expose-gc` adds a global `gc()` function for experiments (not for production).
- **Browsers:** DevTools → **Memory** panel. Take a *heap snapshot*, perform an action several times, take another, and compare: objects whose count keeps growing are leak candidates. The *Detached elements* view finds removed DOM nodes that are still referenced.

```js
const formatMB = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;
const before = process.memoryUsage().heapUsed;
const big = Array.from({ length: 1_000_000 }, (_, i) => ({ id: i }));
const after = process.memoryUsage().heapUsed;
console.log(`allocated about ${formatMB(after - before)} for ${big.length} objects`);
```

(The number printed varies between machines and runs; on 64-bit Node.js it is typically several tens of MB.)

**Weak references** (3.5) let you associate data with objects without keeping them alive: `WeakMap`, `WeakSet`, and for advanced cases `WeakRef` and `FinalizationRegistry`.

**Good habits**

- Give every long-lived subscription, timer and cache an owner responsible for cleaning it up.
- Bound every cache.
- Don't keep references "just in case"; let objects become unreachable.
- When investigating, measure: guesses about memory are often wrong.

### Practice task

The following code leaks: every `PriceTracker` subscribes to a shared feed, starts an interval and stores every price forever. Creating and discarding trackers (as a UI does when components mount and unmount) accumulates listeners, intervals and data, and the process **never exits** because of the intervals.

```js
const { EventEmitter } = require("node:events");
const feed = new EventEmitter();
feed.setMaxListeners(0); // silence the warning for this experiment

class PriceTracker {
  constructor(symbol) {
    this.symbol = symbol;
    this.history = [];
    feed.on("price", (price) => this.history.push(price));
    setInterval(() => this.report(), 1000);
  }
  report() {
    return `${this.symbol}: ${this.history.at(-1)}`;
  }
}
```

Rewrite `PriceTracker` so that:

1. It accepts a `maxHistory` option (default `5`) and keeps only the last `maxHistory` prices.
2. It has a `dispose()` method that removes its feed listener and clears its interval. Calling `dispose()` twice is safe.
3. The listener is stored so that the exact same function can be removed.

Then write a script that:

- creates 1,000 trackers and prints the listener count;
- emits 100 prices (`1` to `100`) on the feed;
- prints the history length and contents of the first tracker;
- disposes every tracker (and the first one a second time) and prints the listener count again;
- prints `done` — and the process must then **exit on its own**.

### Expected result

```text
listeners while active: 1000
history length: 5
last prices: [ 96, 97, 98, 99, 100 ]
listeners after dispose: 0
done
```

The script terminates immediately after printing `done`, with no need for Ctrl+C.

### Acceptance criteria

- [ ] The listener is a stored function (e.g. a private arrow-function field) passed to both `on` and `off`.
- [ ] The interval ID is stored and cleared in `dispose`.
- [ ] History never exceeds `maxHistory` entries.
- [ ] `dispose()` is idempotent (a second call does nothing and throws nothing).
- [ ] The process exits by itself after `done` (proof that no intervals remain).
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```js
const { EventEmitter } = require("node:events");
const feed = new EventEmitter();
feed.setMaxListeners(0);

class PriceTracker {
  #onPrice;
  #interval;
  #disposed = false;

  constructor(symbol, { maxHistory = 5 } = {}) {
    this.symbol = symbol;
    this.history = [];
    this.#onPrice = (price) => {
      this.history.push(price);
      if (this.history.length > maxHistory) {
        this.history.shift();
      }
    };
    feed.on("price", this.#onPrice);
    this.#interval = setInterval(() => this.report(), 1000);
  }

  report() {
    return `${this.symbol}: ${this.history.at(-1)}`;
  }

  dispose() {
    if (this.#disposed) return;
    this.#disposed = true;
    feed.off("price", this.#onPrice);
    clearInterval(this.#interval);
  }
}

const trackers = Array.from({ length: 1000 }, (_, i) => new PriceTracker(`SYM${i}`));
console.log(`listeners while active: ${feed.listenerCount("price")}`); // → listeners while active: 1000

for (let price = 1; price <= 100; price++) {
  feed.emit("price", price);
}
console.log(`history length: ${trackers[0].history.length}`); // → history length: 5
console.log("last prices:", trackers[0].history);              // → last prices: [ 96, 97, 98, 99, 100 ]

trackers.forEach((t) => t.dispose());
trackers[0].dispose();
console.log(`listeners after dispose: ${feed.listenerCount("price")}`); // → listeners after dispose: 0
console.log("done"); // → done
```

</details>

---

## 3.9 Performance

**Goal:** Measure before optimising, improve algorithmic complexity with the right data structures, control expensive event handlers with debounce and throttle, keep the main thread responsive, and move CPU-heavy work to workers.

### Explanation

**Measure first.** Intuition about performance is often wrong. Find the actual bottleneck before changing code:

- `performance.now()` returns a high-resolution timestamp in milliseconds (browsers and Node.js).
- `console.time(label)` / `console.timeEnd(label)` print the elapsed time.
- Browser DevTools' **Performance** panel and Node's `--cpu-prof` flag (or `--inspect` with DevTools) show where time is spent.
- For decisions, measure realistic data sizes several times; first runs are slower while the engine's JIT compiler warms up.

```js
function timeIt(label, fn) {
  const start = performance.now();
  const result = fn();
  const ms = performance.now() - start;
  console.log(`${label}: ${ms.toFixed(1)} ms`);
  return result;
}

timeIt("sum 10 million", () => {
  let sum = 0;
  for (let i = 0; i < 10_000_000; i++) sum += i;
  return sum;
});
// prints e.g. "sum 10 million: 8.3 ms" (varies by machine)
```

**Algorithmic complexity matters most.** *Big-O notation* describes how work grows with input size `n`. Replacing an O(n²) algorithm with O(n) beats any micro-optimisation once data grows:

| Operation | Cost |
|---|---|
| `array[i]`, `map.get(k)`, `set.has(v)`, `obj.key` | O(1) — constant |
| `array.includes(v)`, `indexOf`, `find` | O(n) — scans the array |
| `array.sort()` | O(n log n) |
| a loop containing `includes` on another array | O(n × m) |
| `array.shift()` / `unshift()` on large arrays | O(n) — every item moves |

```js
const a = Array.from({ length: 20_000 }, (_, i) => i * 2);
const b = Array.from({ length: 20_000 }, (_, i) => i * 3);

// O(n × m): includes scans b for every item of a
let t = performance.now();
const slow = a.filter((x) => b.includes(x));
const slowMs = performance.now() - t;

// O(n + m): build a Set once, then constant-time lookups
t = performance.now();
const bSet = new Set(b);
const fast = a.filter((x) => bSet.has(x));
const fastMs = performance.now() - t;

console.log(slow.length === fast.length);  // → true
console.log(fastMs * 10 < slowMs);         // → true (typically 100x+ faster)
```

**Avoid repeated work**

- Hoist invariant computations out of loops (compute `items.length`, regexes, lookup tables once).
- Cache results of expensive pure functions (`memoize`, 2.2).
- Build large strings with an array and `join`, or template literals — and don't repeatedly re-render the DOM inside loops (2.10).

**Debounce and throttle** limit how often a function runs in response to rapid events (typing, scrolling, resizing):

- **Debounce:** wait until events *stop* for `ms` milliseconds, then run once with the latest arguments. Use for search-as-you-type and auto-save.
- **Throttle:** run at most once every `ms` milliseconds. Use for scroll position tracking, resize handling and rate-limited actions.

```js
function debounce(fn, ms) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

const search = debounce((query) => console.log(`searching for "${query}"`), 50);
search("j");
search("ja");
search("jav"); // only this call runs, 50ms after the last keystroke
// → searching for "jav"
```

**Keep the main thread free** (browsers): batch DOM reads and writes (read all measurements first, then write all changes) to avoid repeated layout recalculation; animate with CSS `transform`/`opacity` and `requestAnimationFrame`; mark scroll/touch listeners `{ passive: true }`; and split long tasks (3.7).

**Load less code.** Use dynamic `import()` (2.9) to load features only when needed, and let bundlers remove unused code ("tree-shaking"), which works best with ES modules.

**Workers for CPU-heavy work.** Code in a **worker** runs on a separate thread, so heavy computation doesn't block the main thread. Workers communicate by message passing (`postMessage`); they don't share variables. Browsers have **Web Workers** (`new Worker("worker.js", { type: "module" })`); Node.js has `worker_threads`:

```js
// Save as worker-demo.js (CommonJS) and run with node
const { Worker, isMainThread, parentPort, workerData } = require("node:worker_threads");

function fib(n) {
  return n < 2 ? n : fib(n - 1) + fib(n - 2); // deliberately slow
}

if (isMainThread) {
  const worker = new Worker(__filename, { workerData: 32 }); // run this same file in a worker
  worker.once("message", (result) => console.log(`fib(32) = ${result}`));
  console.log("main thread is free while the worker computes");
} else {
  parentPort.postMessage(fib(workerData));
}
// → main thread is free while the worker computes
// → fib(32) = 2178309
```

**Engine-friendly code.** JavaScript engines optimise code that behaves predictably. Helpful habits (without obsessing):

- Create objects with the same properties in the same order (e.g. initialise all fields in the constructor), so they share an internal "shape".
- Avoid `delete` on hot objects; set the property to `undefined` or use a `Map`.
- Keep arrays homogeneous (all numbers, or all objects of one shape) and avoid holes (`new Array(1000)` followed by sparse writes).
- Don't micro-optimise without measurements; clarity is usually worth more than a few microseconds.

### Practice task

Write `perf.js` with three parts.

1. **Complexity.** `findDuplicatesSlow(list)` returns the values that appear more than once (each reported once, in order of first repetition), using nested loops / `indexOf`. Write `findDuplicatesFast(list)` that does the same in O(n) with a `Set` (or `Map`). Generate 20,000 numbers with `const data = Array.from({ length: 20_000 }, (_, i) => (i * 7919) % 15_000);`, verify both functions return identical results, and print whether the fast version is at least 10× faster.
2. **Debounce.** Implement `debounce(fn, ms)`. Simulate keystrokes `"r"`, `"re"`, `"rea"` at 0, 10 and 20 ms and `"react"` at 200 ms (use `setTimeout` to schedule them), with a debounce delay of 50 ms. Print each search that actually runs.
3. **Throttle.** Implement `throttle(fn, ms)` that runs on the *leading* edge and ignores calls until `ms` has passed. Simulate scroll events at 0, 10, 20, 150 and 160 ms with a 100 ms throttle (start this part after part 2 finishes), and print each handled event.

### Expected result

```text
same result: true
fast version at least 10x faster: true
duplicates found: 5000
search: rea
search: react
scroll handled: 1
scroll handled: 4
```

### Acceptance criteria

- [ ] `findDuplicatesFast` is O(n): one pass with `Set`/`Map` lookups, no `includes`/`indexOf` inside loops.
- [ ] Both duplicate finders return identical arrays (compare with `JSON.stringify` or element by element).
- [ ] Timing uses `performance.now()`.
- [ ] `debounce` keeps a single timer per debounced function and passes the latest arguments.
- [ ] `throttle` is a leading-edge throttle that compares the current time with the time of the last accepted call.
- [ ] Output matches exactly.

<details>
<summary>Reference solution</summary>

```js
function findDuplicatesSlow(list) {
  const result = [];
  for (let i = 0; i < list.length; i++) {
    const value = list[i];
    if (list.indexOf(value) < i && !result.includes(value)) {
      result.push(value);
    }
  }
  return result;
}

function findDuplicatesFast(list) {
  const seen = new Set();
  const reported = new Set();
  const result = [];
  for (const value of list) {
    if (seen.has(value)) {
      if (!reported.has(value)) {
        reported.add(value);
        result.push(value);
      }
    } else {
      seen.add(value);
    }
  }
  return result;
}

const data = Array.from({ length: 20_000 }, (_, i) => (i * 7919) % 15_000);

let start = performance.now();
const slow = findDuplicatesSlow(data);
const slowMs = performance.now() - start;

start = performance.now();
const fast = findDuplicatesFast(data);
const fastMs = performance.now() - start;

console.log(`same result: ${JSON.stringify(slow) === JSON.stringify(fast)}`); // → same result: true
console.log(`fast version at least 10x faster: ${fastMs * 10 <= slowMs}`);    // → fast version at least 10x faster: true
console.log(`duplicates found: ${fast.length}`);                              // → duplicates found: 5000

function debounce(fn, ms) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

function throttle(fn, ms) {
  let last = -Infinity;
  return function (...args) {
    const now = performance.now();
    if (now - last >= ms) {
      last = now;
      fn.apply(this, args);
    }
  };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const search = debounce((q) => console.log(`search: ${q}`), 50);
  [[0, "r"], [10, "re"], [20, "rea"], [200, "react"]].forEach(([at, q]) => setTimeout(() => search(q), at));
  await sleep(300);
  // → search: rea
  // → search: react

  const onScroll = throttle((n) => console.log(`scroll handled: ${n}`), 100);
  [[0, 1], [10, 2], [20, 3], [150, 4], [160, 5]].forEach(([at, n]) => setTimeout(() => onScroll(n), at));
  await sleep(250);
  // → scroll handled: 1
  // → scroll handled: 4
}
main();
```

</details>

---

## 3.10 Modern JavaScript: ES2015 to ES2025

**Goal:** Know which features each edition of the language added, recognise and use the most important post-2015 features, and modernise legacy code.

### Explanation

JavaScript is standardised as **ECMAScript** by the committee **TC39**. Since ES2015 (also called ES6), a new edition is published every June containing every proposal that reached *stage 4* (finished) during the year. Engines usually ship features before the edition is published, so "supported in all current browsers and Node.js LTS" is a more practical question than the edition year. Check support on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript) or [caniuse.com](https://caniuse.com).

**Feature map** (✱ = covered earlier in this curriculum)

| Edition | Headline features |
|---|---|
| **ES2015** | `let`/`const` ✱, arrow functions ✱, classes ✱, template literals ✱, destructuring ✱, default/rest/spread ✱, modules ✱, promises ✱, `Map`/`Set`/`WeakMap`/`WeakSet` ✱, symbols ✱, iterators and `for...of` ✱, generators ✱, `Proxy`/`Reflect` ✱, `Object.assign` ✱ |
| **ES2016** | `Array.prototype.includes` ✱, exponent operator `**` ✱ |
| **ES2017** | `async`/`await` ✱, `Object.values`/`entries` ✱, `padStart`/`padEnd` ✱, `Object.getOwnPropertyDescriptors` ✱, trailing commas in parameter lists |
| **ES2018** | object rest/spread ✱, async iteration (`for await`) ✱, `Promise.prototype.finally` ✱, regex named groups ✱, lookbehind, `s` flag |
| **ES2019** | `flat`/`flatMap` ✱, `Object.fromEntries` ✱, `trimStart`/`trimEnd` ✱, optional catch binding ✱, stable `sort` |
| **ES2020** | optional chaining `?.` ✱, nullish coalescing `??` ✱, `BigInt` ✱, `Promise.allSettled` ✱, `globalThis`, `matchAll` ✱, dynamic `import()` ✱ |
| **ES2021** | `replaceAll` ✱, `Promise.any` ✱, logical assignment `??=` `||=` `&&=` ✱, numeric separators `1_000_000` ✱, `WeakRef`/`FinalizationRegistry` ✱ |
| **ES2022** | class fields, `#private` members and `static` blocks ✱, `#x in obj`, top-level `await` ✱, `.at()` ✱, `Object.hasOwn` ✱, error `cause` ✱, regex `d` flag |
| **ES2023** | `findLast`/`findLastIndex` ✱, change-array-by-copy (`toSorted` ✱, `toReversed`, `toSpliced`, `with`), hashbang `#!` support, symbols as `WeakMap` keys |
| **ES2024** | `Object.groupBy`/`Map.groupBy` ✱, `Promise.withResolvers` ✱, regex `v` flag, `isWellFormed`/`toWellFormed`, resizable `ArrayBuffer`, `Atomics.waitAsync` |
| **ES2025** | iterator helpers, `Set` methods ✱, `Promise.try`, `RegExp.escape`, JSON modules and import attributes, regex modifiers, duplicate named capture groups, `Float16Array` |

The examples below demonstrate features not yet shown in earlier topics.

**ES2018–ES2022 odds and ends**

```js
// Lookbehind (ES2018): match digits preceded by "$", without including "$"
console.log("cost: $42, tax: $7".match(/(?<=\$)\d+/g)); // → [ '42', '7' ]

// The s ("dotAll") flag (ES2018): . also matches line breaks
console.log(/start.end/s.test("start\nend"));           // → true

// globalThis (ES2020): the global object in every environment
console.log(typeof globalThis.setTimeout);              // → function

// Static initialisation blocks and #x in obj (ES2022)
class Config {
  static defaults;
  #secret = 1;
  static {
    Config.defaults = Object.freeze({ retries: 3 });
  }
  static isConfig(obj) {
    return #secret in obj; // brand check: does obj have this class's private field?
  }
}
console.log(Config.defaults.retries);                   // → 3
console.log(Config.isConfig(new Config()), Config.isConfig({})); // → true false

// Match indices with the d flag (ES2022)
const m = /(?<word>world)/d.exec("hello world");
console.log(m.indices.groups.word);                     // → [ 6, 11 ]
```

**ES2023–ES2024: change array by copy, well-formed strings**

```js
const original = [3, 1, 2];
console.log(original.toReversed());       // → [ 2, 1, 3 ]
console.log(original.toSpliced(1, 1, 9)); // → [ 3, 9, 2 ]
console.log(original.with(0, 0));         // → [ 0, 1, 2 ]
console.log(original);                    // → [ 3, 1, 2 ] (unchanged)

// A lone surrogate is malformed UTF-16 (e.g. half an emoji)
const broken = "ok\uD83D";
console.log(broken.isWellFormed());       // → false
console.log(broken.toWellFormed());       // → ok�
```

**ES2025: iterator helpers.** Iterators now have lazy `map`, `filter`, `take`, `drop`, `flatMap`, plus `reduce`, `toArray`, `forEach`, `some`, `every` and `find` — like array methods, but for any iterator, including infinite generators. `Iterator.from(...)` wraps any iterable:

```js
function* naturals() {
  let n = 1;
  while (true) yield n++;
}

const firstOddSquares = naturals()
  .filter((n) => n % 2 === 1)
  .map((n) => n * n)
  .take(4)
  .toArray();
console.log(firstOddSquares); // → [ 1, 9, 25, 49 ]

const words = new Map([["a", "apple"], ["b", "banana"]]).values();
console.log(words.map((w) => w.toUpperCase()).toArray()); // → [ 'APPLE', 'BANANA' ]

console.log(Iterator.from("hello").drop(1).take(3).toArray().join("")); // → ell
```

(Iterator helpers are available in Node.js 22+ and current browsers.)

**ES2025: features requiring Node.js 24+** (and current browsers):

```js
// Requires Node.js 24+

// RegExp.escape: safely build a regex from user input
const userInput = "1+1=2?";
const pattern = new RegExp(`^${RegExp.escape(userInput)}$`);
console.log(pattern.test("1+1=2?"), pattern.test("11=2")); // → true false

// Regex modifiers: case-insensitive for part of a pattern only
console.log(/^(?i:hello) World$/.test("HELLO World")); // → true
console.log(/^(?i:hello) World$/.test("HELLO WORLD")); // → false

// Duplicate named groups in different alternatives
const dateRe = /(?<year>\d{4})-\d{2}|\d{2}\/(?<year>\d{4})/;
console.log("2026-10".match(dateRe).groups.year, "10/2026".match(dateRe).groups.year); // → 2026 2026

// Float16Array and Math.f16round for half-precision numbers (graphics, ML)
console.log(Math.f16round(1.337)); // → 1.3369140625

// Promise.try: run a function that may throw synchronously or return a promise,
// and always get a promise back (the catch runs asynchronously, so it prints last)
Promise.try(() => JSON.parse("{ bad json"))
  .catch((error) => console.log("caught:", error.name)); // → caught: SyntaxError
```

**ES2025: JSON modules.** Import attributes tell the runtime how to interpret a module; JSON modules use them to import data files directly (works in Node.js 22+ and current browsers):

```js
// config.json contains: { "port": 8080 }
import config from "./config.json" with { type: "json" };
console.log(config.port); // 8080
```

**Staying current.** Follow the [TC39 proposals repository](https://github.com/tc39/proposals) for what is coming next; proposals at stage 3 are generally safe to learn and often already shipped in engines. When you need to support older environments, tools like Babel or TypeScript can *transpile* modern syntax, and *polyfills* (such as core-js) add missing built-ins.

### Practice task

Modernise this legacy ES5-style code without changing its output. It uses `var`, `function` constructors and prototypes, string concatenation, manual loops, `arguments`, and `||` defaults.

```js
var inventory = [
  { name: "apple", type: "fruit", qty: 5, meta: { origin: "PT" } },
  { name: "carrot", type: "vegetable", qty: 0 },
  { name: "banana", type: "fruit", qty: 12, meta: { origin: "EC" } },
  { name: "leek", type: "vegetable", qty: 3, meta: null },
];

function Report(title, items) {
  this.title = title || "Untitled";
  this.items = items;
}

Report.prototype.inStock = function () {
  var result = [];
  for (var i = 0; i < this.items.length; i++) {
    if (this.items[i].qty > 0) result.push(this.items[i]);
  }
  return result;
};

Report.prototype.byType = function () {
  var groups = {};
  for (var i = 0; i < this.items.length; i++) {
    var item = this.items[i];
    if (!groups[item.type]) groups[item.type] = [];
    groups[item.type].push(item.name);
  }
  return groups;
};

Report.prototype.origins = function () {
  var self = this;
  return this.items.map(function (item) {
    var origin = item.meta && item.meta.origin ? item.meta.origin : "unknown";
    return item.name + " (" + origin + ")";
  });
};

function sumAll() {
  var total = 0;
  for (var i = 0; i < arguments.length; i++) total += arguments[i];
  return total;
}

var report = new Report("", inventory);
console.log(report.title);
console.log(report.inStock().length + " of " + report.items.length + " items in stock");
console.log(JSON.stringify(report.byType()));
console.log(report.origins().join(", "));
console.log(sumAll.apply(null, inventory.map(function (i) { return i.qty; })));
var sorted = inventory.slice().sort(function (a, b) { return b.qty - a.qty; });
console.log(sorted[0].name + ", original first: " + inventory[0].name);
```

Your version must use: `const`/`let` only; a `class` with a default parameter (keep the "empty title becomes Untitled" behaviour — think about whether `??` or `||` is right); arrow functions; template literals; `filter`; `Object.groupBy`; optional chaining with `??`; a rest parameter instead of `arguments`; spread instead of `apply`; and `toSorted` instead of `slice().sort()`.

### Expected result

Both the original and your modernised version print exactly:

```text
Untitled
3 of 4 items in stock
{"fruit":["apple","banana"],"vegetable":["carrot","leek"]}
apple (PT), carrot (unknown), banana (EC), leek (unknown)
20
banana, original first: apple
```

### Acceptance criteria

- [ ] No `var`, `function` constructor, `.prototype`, `arguments`, `apply`, `self = this` or string concatenation with `+` remains.
- [ ] All listed modern features are used.
- [ ] The empty-string title still becomes `"Untitled"` (and you can explain why `??` would change the behaviour).
- [ ] `byType` serialises to the same JSON (note how `Object.groupBy` returns arrays of items, so you must map them to names).
- [ ] Output is identical to the original's.

<details>
<summary>Reference solution</summary>

```js
const inventory = [
  { name: "apple", type: "fruit", qty: 5, meta: { origin: "PT" } },
  { name: "carrot", type: "vegetable", qty: 0 },
  { name: "banana", type: "fruit", qty: 12, meta: { origin: "EC" } },
  { name: "leek", type: "vegetable", qty: 3, meta: null },
];

class Report {
  constructor(title = "", items = []) {
    this.title = title || "Untitled"; // || on purpose: "" must also become "Untitled"
    this.items = items;
  }

  inStock() {
    return this.items.filter(({ qty }) => qty > 0);
  }

  byType() {
    const groups = Object.groupBy(this.items, ({ type }) => type);
    return Object.fromEntries(
      Object.entries(groups).map(([type, items]) => [type, items.map(({ name }) => name)])
    );
  }

  origins() {
    return this.items.map(({ name, meta }) => `${name} (${meta?.origin ?? "unknown"})`);
  }
}

const sumAll = (...numbers) => numbers.reduce((total, n) => total + n, 0);

const report = new Report("", inventory);
console.log(report.title); // → Untitled
console.log(`${report.inStock().length} of ${report.items.length} items in stock`); // → 3 of 4 items in stock
console.log(JSON.stringify(report.byType())); // → {"fruit":["apple","banana"],"vegetable":["carrot","leek"]}
console.log(report.origins().join(", ")); // → apple (PT), carrot (unknown), banana (EC), leek (unknown)
console.log(sumAll(...inventory.map(({ qty }) => qty))); // → 20
const sorted = inventory.toSorted((a, b) => b.qty - a.qty);
console.log(`${sorted[0].name}, original first: ${inventory[0].name}`); // → banana, original first: apple
```

`title ?? "Untitled"` would keep the empty string `""`, because `??` only replaces `null` and `undefined`; the original `||` also replaces other falsy values.

</details>

---

## Advanced Milestone Project: Task Queue Library

**Goal:** Design and implement a small, reusable asynchronous library that combines classes with private state, events, promises, `async`/`await`, cancellation, priorities and careful error handling.

### Task

Write `task-queue.mjs` exporting a class `TaskQueue` that runs asynchronous tasks with a concurrency limit.

**API**

- `new TaskQueue({ concurrency = 1 } = {})` — `concurrency` must be a positive integer, otherwise throw `RangeError`.
- `queue.add(task, { name, priority = 0, signal } = {})` — `task` is an async function receiving `{ signal }`. Returns a promise that settles with the task's result or error.
    - Tasks with higher `priority` start first; equal priorities start in the order they were added.
    - If `signal` is already aborted, the returned promise rejects immediately with `signal.reason`. If it is aborted while the task is waiting in the queue, the task is removed and the promise rejects with `signal.reason`. (Aborts after the task has started are up to the task, which receives the signal.)
- `queue.onIdle()` — returns a promise that resolves when no tasks are running or waiting (immediately if already idle).
- `queue.stats` — a getter returning `{ pending, running, completed, failed, cancelled }`.
- `TaskQueue` extends `EventTarget` and dispatches `CustomEvent`s: `"start"` and `"end"` with `detail: { name }`, the latter also with `ok` (boolean).

Internal state (the waiting list, counters, idle resolvers) must be private (`#`).

Then write `demo.mjs` that runs this scenario with `concurrency: 2`:

| Task | Duration | Priority | Notes |
|---|---|---|---|
| A | 50 ms | 0 | |
| B | 30 ms | 0 | |
| C | 20 ms | 0 | |
| D | 10 ms | 5 | added after C, but should start before C |
| E | 10 ms | 0 | cancelled with an `AbortController` right after adding |
| F | 5 ms | 0 | throws `Error("F failed")` |

Each task returns its name in lower case. Log every `start` and `end` event, log the cancellation and failure from the promises, wait for `onIdle()`, then print the results of `Promise.allSettled` for all six and the final stats.

### Expected result

```text
start A
start B
cancelled E: This operation was aborted
end B ok
start D
end D ok
start C
end A ok
start F
end F failed
failed F: F failed
end C ok
results: a, b, c, d, (rejected), (rejected)
stats: { pending: 0, running: 0, completed: 4, failed: 1, cancelled: 1 }
```

### Acceptance criteria

- [ ] Never more than `concurrency` tasks run at once (verify by tracking the maximum in the demo).
- [ ] Priorities and FIFO order within a priority are respected (D before C; C before F).
- [ ] Cancelled waiting tasks never start, and their promises reject with the signal's reason.
- [ ] A failing task rejects only its own promise; the queue keeps processing.
- [ ] `onIdle()` resolves only after the last task finishes; calling it on an idle queue resolves immediately.
- [ ] No internal state is accessible from outside the class.
- [ ] Invalid `concurrency` (e.g. `0`, `1.5`) throws `RangeError`.
- [ ] `node demo.mjs` prints exactly the expected output and exits.

<details>
<summary>Reference solution</summary>

```js
// file: task-queue.mjs
export class TaskQueue extends EventTarget {
  #concurrency;
  #waiting = [];
  #running = 0;
  #sequence = 0;
  #counts = { completed: 0, failed: 0, cancelled: 0 };
  #idleResolvers = [];

  constructor({ concurrency = 1 } = {}) {
    super();
    if (!Number.isInteger(concurrency) || concurrency < 1) {
      throw new RangeError("concurrency must be a positive integer");
    }
    this.#concurrency = concurrency;
  }

  get stats() {
    return { pending: this.#waiting.length, running: this.#running, ...this.#counts };
  }

  add(task, { name = `task-${this.#sequence + 1}`, priority = 0, signal } = {}) {
    if (signal?.aborted) {
      this.#counts.cancelled++;
      return Promise.reject(signal.reason);
    }

    const { promise, resolve, reject } = Promise.withResolvers();
    const entry = { task, name, priority, signal, resolve, reject, seq: this.#sequence++ };

    if (signal) {
      entry.onAbort = () => {
        const index = this.#waiting.indexOf(entry);
        if (index !== -1) {
          this.#waiting.splice(index, 1);
          this.#counts.cancelled++;
          reject(signal.reason);
          this.#checkIdle();
        }
      };
      signal.addEventListener("abort", entry.onAbort, { once: true });
    }

    this.#insert(entry);
    this.#pump();
    return promise;
  }

  onIdle() {
    if (this.#isIdle()) return Promise.resolve();
    const { promise, resolve } = Promise.withResolvers();
    this.#idleResolvers.push(resolve);
    return promise;
  }

  #insert(entry) {
    // keep #waiting sorted: higher priority first, then lower sequence number
    const index = this.#waiting.findIndex(
      (other) => other.priority < entry.priority ||
        (other.priority === entry.priority && other.seq > entry.seq)
    );
    if (index === -1) this.#waiting.push(entry);
    else this.#waiting.splice(index, 0, entry);
  }

  #pump() {
    while (this.#running < this.#concurrency && this.#waiting.length > 0) {
      this.#run(this.#waiting.shift());
    }
  }

  async #run(entry) {
    entry.signal?.removeEventListener("abort", entry.onAbort);
    this.#running++;
    this.dispatchEvent(new CustomEvent("start", { detail: { name: entry.name } }));
    try {
      const result = await entry.task({ signal: entry.signal });
      this.#counts.completed++;
      this.dispatchEvent(new CustomEvent("end", { detail: { name: entry.name, ok: true } }));
      entry.resolve(result);
    } catch (error) {
      this.#counts.failed++;
      this.dispatchEvent(new CustomEvent("end", { detail: { name: entry.name, ok: false } }));
      entry.reject(error);
    } finally {
      this.#running--;
      this.#pump();
      this.#checkIdle();
    }
  }

  #isIdle() {
    return this.#running === 0 && this.#waiting.length === 0;
  }

  #checkIdle() {
    if (this.#isIdle()) {
      for (const resolve of this.#idleResolvers.splice(0)) resolve();
    }
  }
}
```

```js
// file: demo.mjs
import { TaskQueue } from "./task-queue.mjs";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const queue = new TaskQueue({ concurrency: 2 });

let maxRunning = 0;
queue.addEventListener("start", (event) => {
  maxRunning = Math.max(maxRunning, queue.stats.running);
  console.log(`start ${event.detail.name}`);
});
queue.addEventListener("end", (event) => {
  console.log(`end ${event.detail.name} ${event.detail.ok ? "ok" : "failed"}`);
});

function job(name, ms, { priority = 0, signal, fail = false } = {}) {
  return queue.add(async () => {
    await sleep(ms);
    if (fail) throw new Error(`${name} failed`);
    return name.toLowerCase();
  }, { name, priority, signal });
}

const controller = new AbortController();
const promises = [
  job("A", 50),
  job("B", 30),
  job("C", 20),
  job("D", 10, { priority: 5 }),
  job("E", 10, { signal: controller.signal }),
  job("F", 5, { fail: true }),
];
controller.abort();

promises[4].catch((error) => console.log(`cancelled E: ${error.message}`));
promises[5].catch((error) => console.log(`failed F: ${error.message}`));

await queue.onIdle();
const settled = await Promise.allSettled(promises);
const results = settled.map((r) => (r.status === "fulfilled" ? r.value : "(rejected)"));
console.log(`results: ${results.join(", ")}`);
console.log("stats:", queue.stats);
if (maxRunning > 2) console.log("concurrency limit violated!");
```

</details>

---

## Appendix: Where to Go Next

You now have a complete foundation in the JavaScript language. Natural next steps:

- **Reference:** [MDN Web Docs — JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) is the most reliable day-to-day reference for the language and browser APIs. [javascript.info](https://javascript.info) is an excellent free tutorial that goes deeper on many topics here.
- **Testing:** learn to write automated tests with Node's built-in `node:test` module, or with Vitest or Jest. Turn this curriculum's acceptance criteria into tests as practice.
- **TypeScript:** adds static types on top of JavaScript and is now standard in many teams. Everything in this curriculum still applies.
- **Tooling:** npm and `package.json`, a linter (ESLint), a formatter (Prettier), and a bundler/dev server (Vite).
- **Frontend frameworks:** React, Vue, Svelte, Angular, or Solid. Each relies heavily on the closures, modules, immutable updates, events and async patterns you have learned.
- **Backend:** Node.js frameworks such as Express, Fastify or Hono; databases; authentication; and HTTP APIs.
- **Deeper reading:** *Eloquent JavaScript* (Marijn Haverbeke) and the *You Don't Know JS Yet* series (Kyle Simpson), both available free online.
- **The language itself:** the [ECMAScript specification](https://tc39.es/ecma262/) and the [TC39 proposals](https://github.com/tc39/proposals) show where JavaScript is heading.

Above all, **build things**. Pick a small project you would actually use — a budget tracker, a game, a command-line tool, a browser extension — and finish it.