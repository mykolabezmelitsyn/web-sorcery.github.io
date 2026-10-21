# TypeScript Mastery Roadmap: Beginner to Expert

To become a **TypeScript expert**, you need to go beyond learning type annotations. You should understand how TypeScript's type system works, how to design reusable and type-safe code, and how to use TypeScript confidently in real-world applications.

Since you're already an experienced frontend developer working with HTML, CSS/SCSS, JavaScript, DOM interactions, animations, and forms, this learning path focuses on **practical frontend TypeScript first, followed by advanced type-system concepts**.

The roadmap is organized into **8 levels**, from beginner to expert.

## TypeScript mastery roadmap

| Stage | Levels | Roadmap progression |
| --- | --- | --- |
| Beginner | Levels 1–2 | 25% |
| Intermediate | Levels 3–4 | 50% |
| Advanced | Levels 5–6 | 75% |
| Expert | Levels 7–8 | 100% |

*The levels are learning stages, not an assessment of your current knowledge. The progression percentages represent the roadmap stages, not a measured skill level.*

## Level 1 — TypeScript fundamentals

**Stage:** Beginner

**Goal:** Understand TypeScript syntax and confidently write basic applications without relying on `any`.

### Topics to cover

- [ ] What TypeScript is and how it differs from JavaScript
- [ ] TypeScript compiler (`tsc`) and how `.ts` becomes `.js`
- [ ] Type annotations and type inference
- [ ] Primitive types: `string`, `number`, `boolean`, `null`, `undefined`
- [ ] Special types: `any`, `unknown`, `never`, `void`
- [ ] Arrays and tuples
- [ ] Object types and optional properties
- [ ] `readonly` properties and arrays
- [ ] Union and literal types
- [ ] Intersection types
- [ ] Type aliases vs. interfaces
- [ ] Function parameter types and return types
- [ ] Optional, default, and rest parameters
- [ ] Type assertions (`as`) and non-null assertions (`!`)
- [ ] Basic `tsconfig.json` configuration

**Practice project:** Build a typed to-do application with add, edit, delete, filter, and completion functionality.

## Level 2 — Type narrowing and browser APIs

**Stage:** Beginner → Intermediate

**Goal:** Use TypeScript confidently for the frontend work you already do.

### Topics to cover

- [ ] Type narrowing and control flow analysis
- [ ] `typeof`, `instanceof`, and `in` operators
- [ ] Equality and truthiness narrowing
- [ ] Custom type guards
- [ ] Discriminated unions
- [ ] Null and undefined handling
- [ ] Optional chaining (`?.`) and nullish coalescing (`??`)
- [ ] DOM element types: `HTMLElement`, `HTMLInputElement`, `HTMLFormElement`, etc.
- [ ] `querySelector<T>()` and `querySelectorAll<T>()`
- [ ] Event types: `Event`, `MouseEvent`, `KeyboardEvent`, `SubmitEvent`
- [ ] `event.target` vs. `event.currentTarget`
- [ ] DOM manipulation and event delegation
- [ ] Form validation and `FormData`
- [ ] Fetch API, Promises, `async`/`await`
- [ ] Error handling with `try/catch` and `unknown`

For example, instead of using assertions everywhere, learn how TypeScript can narrow a DOM element safely:

```ts
const input = document.querySelector("#email");

if (input instanceof HTMLInputElement) {
  input.addEventListener("input", () => {
    console.log(input.value);
  });
}
```

**Practice project:** Create a reusable form validation library using TypeScript.

## Level 3 — Generics and reusable type design

**Stage:** Intermediate

**Goal:** Learn to write reusable functions, components, and utilities that preserve type information automatically.

### Topics to cover

- [ ] Generic functions
- [ ] Generic interfaces and type aliases
- [ ] Generic constraints (`extends`)
- [ ] Multiple generic parameters
- [ ] Default generic types
- [ ] `keyof` operator
- [ ] `typeof` type operator
- [ ] Indexed access types (`T[K]`)
- [ ] `as const` assertions
- [ ] `satisfies` operator
- [ ] Function overloads
- [ ] Call signatures and construct signatures
- [ ] Type predicates (`value is Type`)
- [ ] Assertion functions (`asserts`)
- [ ] Exhaustive checking with `never`

### Built-in utility types

Learn how and when to use:

- [ ] `Partial<T>`
- [ ] `Required<T>`
- [ ] `Readonly<T>`
- [ ] `Pick<T, K>`
- [ ] `Omit<T, K>`
- [ ] `Record<K, V>`
- [ ] `Exclude<T, U>`
- [ ] `Extract<T, U>`
- [ ] `NonNullable<T>`
- [ ] `ReturnType<T>`
- [ ] `Parameters<T>`
- [ ] `Awaited<T>`

A particularly important generic pattern is:

```ts
function getProperty<T, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  return obj[key];
}

const user = {
  name: "John",
  age: 25
};

const name = getProperty(user, "name");
// Inferred type: string

const age = getProperty(user, "age");
// Inferred type: number
```

**Practice project:** Convert your existing vanilla JavaScript Tooltip library into a fully typed TypeScript library, with a generic-friendly public API, configuration options, callbacks, and type-safe methods.

This would be an especially valuable exercise given your previous work with reusable UI components.

## Level 4 — Object-oriented TypeScript and project architecture

**Stage:** Intermediate

**Goal:** Organize larger applications into maintainable, reusable, type-safe modules.

### Topics to cover

- [ ] Classes and constructors
- [ ] `public`, `private`, `protected`
- [ ] `readonly` class properties
- [ ] Getters and setters
- [ ] Inheritance and `super`
- [ ] Abstract classes
- [ ] `implements` and `override`
- [ ] Generic classes
- [ ] Structural typing
- [ ] ES modules: `import` and `export`
- [ ] Type-only imports and exports
- [ ] Declaration files (`.d.ts`)
- [ ] Third-party library types and `@types`
- [ ] Global type declarations and module augmentation
- [ ] Organizing types across a project

### Compiler and tooling

- [ ] `strict` and `strictNullChecks`
- [ ] `noUncheckedIndexedAccess`
- [ ] `exactOptionalPropertyTypes`
- [ ] `target`, `lib`, `module`, and `moduleResolution`
- [ ] `noEmit` vs. JavaScript output
- [ ] Source maps
- [ ] Vite with TypeScript
- [ ] ESLint with typescript-eslint
- [ ] Incremental migration from JavaScript using `allowJs`, `checkJs`, and JSDoc

**Practice project:** Build a reusable UI components library (tooltips, modals, accordions, dropdowns) using TypeScript classes and modules.

## Level 5 — Advanced type system

**Stage:** Advanced

**Goal:** Understand how types can be dynamically transformed, inferred, and composed.

These topics are what distinguish someone who uses TypeScript well from someone who deeply understands its type system.

### Topics to cover

- [ ] Conditional types (`T extends U ? X : Y`)
- [ ] Conditional type distribution
- [ ] Mapped types
- [ ] Mapped type modifiers (`+readonly`, `-?`, etc.)
- [ ] Key remapping with `as`
- [ ] Template literal types
- [ ] The `infer` keyword
- [ ] Recursive types
- [ ] Recursive conditional types
- [ ] Advanced generic constraints and inference
- [ ] Variance and assignability
- [ ] Nominal-like typing with branded types
- [ ] Combining mapped and conditional types
- [ ] Creating custom utility types
- [ ] Avoiding overly complex or expensive type-level computations

These concepts are covered in the official [TypeScript: Creating Types from Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html) documentation.

**Practice project:** Implement your own versions of `Partial`, `Pick`, `Omit`, `ReturnType`, and `Awaited`, then create a typed event-emitter utility.

## Level 6 — TypeScript in real-world applications

**Stage:** Advanced

**Goal:** Apply TypeScript effectively in production frontend applications, especially React.

### Topics to cover

- [ ] Typing external API responses
- [ ] Runtime validation using schemas (e.g., Zod)
- [ ] Understanding compile-time types vs. runtime values
- [ ] Typed error handling and result patterns
- [ ] Generics for API clients and reusable data functions
- [ ] Async application state modeling
- [ ] Type-safe configuration objects
- [ ] Working with third-party JavaScript libraries
- [ ] TypeScript with GSAP and browser animation APIs
- [ ] Testing TypeScript code with Vitest
- [ ] Mocking typed functions and services
- [ ] Type-aware linting

### React + TypeScript

Since you're planning to learn React, make this a major milestone.

- [ ] `.tsx` and JSX typing
- [ ] Component props and children
- [ ] Event handlers
- [ ] Typing `useState`, `useRef`, `useReducer`, and `useContext`
- [ ] Custom hooks
- [ ] Generic components
- [ ] Discriminated union props
- [ ] Context and state management
- [ ] React Router integration
- [ ] Next.js with TypeScript

**Practice project:** Build a React application with TypeScript, an external API, forms, filtering, reusable hooks, and automated tests.

## Level 7 — TypeScript library authoring

**Stage:** Expert

**Goal:** Design TypeScript libraries that other developers can install and use safely.

### Topics to cover

- [ ] Designing ergonomic public APIs
- [ ] Type inference across library boundaries
- [ ] Advanced generic API design
- [ ] Function overloads vs. union parameters
- [ ] Creating and publishing `.d.ts` files
- [ ] `declaration` and `declarationMap`
- [ ] Package `exports` and `types`
- [ ] ESM and CommonJS interoperability
- [ ] Type-safe npm package configuration
- [ ] Testing public types with tools such as `tsd` or `TSTyche`
- [ ] Writing declarations for untyped JavaScript libraries
- [ ] Backward-compatible API and type design
- [ ] TypeScript package documentation

The official [Declaration Files Handbook](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html) is particularly useful here.

**Practice project:** Publish your TypeScript Tooltip library as an npm package with generated types, documentation, usage examples, and tests.

## Level 8 — TypeScript internals and large-scale engineering

**Stage:** Expert

**Goal:** Understand why TypeScript behaves as it does, diagnose difficult type problems, and maintain large TypeScript codebases.

### Topics to cover

- [ ] Structural type compatibility in depth
- [ ] Assignability and excess property checking
- [ ] Soundness limitations of TypeScript
- [ ] Covariance, contravariance, and bivariance
- [ ] Type inference limitations
- [ ] Control flow analysis internals
- [ ] Compiler pipeline fundamentals
- [ ] TypeScript Compiler API
- [ ] Language Service API basics
- [ ] Advanced declaration-file design
- [ ] Debugging complex generic type errors
- [ ] Compiler performance analysis
- [ ] Project references and incremental builds
- [ ] TypeScript in monorepos
- [ ] Large-scale JavaScript-to-TypeScript migration
- [ ] TypeScript upgrades and compatibility management
- [ ] Keeping complex type-level code readable and maintainable

**Practice project:** Maintain a multi-package TypeScript monorepo with shared libraries, a frontend application, automated tests, and CI type checking.

---

## Recommended learning priorities for you

You don't need to master all eight levels before becoming productive with TypeScript.

Based on your frontend background and your goal of moving toward React, prioritize them like this:

| Learning area | Priority |
| --- | --- |
| Core types, inference, functions, interfaces | Essential now |
| Narrowing, DOM events, forms, browser APIs | Essential now |
| Generics, utility types, `keyof`, `satisfies` | Next |
| Classes, modules, tsconfig, tooling | Next |
| React + TypeScript | High |
| Conditional and mapped types | After practical experience |
| Building and publishing typed libraries | Later |
| Compiler internals and type-system theory | Expert specialization |

## Practical learning plan

### Phase 1 — Foundations (Weeks 1–3)

- [ ] Complete Level 1
- [ ] Practice DOM and events from Level 2
- [ ] Convert three small JavaScript components to TypeScript

### Phase 2 — Reusable TypeScript (Weeks 4–6)

- [ ] Complete Levels 2 and 3
- [ ] Practice generics and utility types
- [ ] Rewrite your Tooltip library in TypeScript

### Phase 3 — Application development (Weeks 7–10)

- [ ] Study Level 4 and practical parts of Level 6
- [ ] Learn Vite, strict tsconfig, linting and testing
- [ ] Build a React + TypeScript application

### Phase 4 — Advanced TypeScript (Weeks 11–16)

- [ ] Study Level 5
- [ ] Create custom utility types and typed abstractions
- [ ] Write declaration files and type tests

### Phase 5 — Long-term expertise (Ongoing)

- [ ] Study Levels 7 and 8
- [ ] Publish and maintain a typed library
- [ ] Practice debugging complex types in production-sized projects

*The first 16 weeks are a suggested structured learning period, assuming regular study and practice, not a guarantee of mastery. True expert-level skill develops through sustained experience solving real problems.*

## How to know you're becoming an expert

A strong TypeScript developer can do more than explain what `keyof` or `infer` means. They can take an unfamiliar JavaScript project, introduce TypeScript without breaking its behavior, model application states safely, design reusable abstractions, and understand why a complex type error occurs.

One especially important principle: **mastery is not about writing the most complicated types. It's about writing the simplest types that provide the guarantees your application actually needs.**

For your career path, focus on becoming highly confident with Levels 1–4 and the practical parts of Level 6 first. That combination will be far more valuable for frontend and React work than mastering recursive conditional types before building real applications.
