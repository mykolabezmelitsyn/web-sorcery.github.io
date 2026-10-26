# TypeScript practice projects

Projects based on the [TypeScript Cheat Sheet](docs/typescript-cheatsheet.html), organized into eight Beginner, eight Intermediate, and eight Advanced projects. Within each level, projects progress from smaller contracts to broader integrations. They are independent unless their context explicitly suggests extending an earlier project.

Use a project-local TypeScript compiler, strict checking, and a runtime compatible with the chosen module format. Keep framework and package exercises in separate projects with their stated dependencies. Use the cheat sheet's compiler-version notes when choosing settings; do not copy removed or deprecated options into a new configuration. No deployment or database is required: local fixtures and in-memory implementations are sufficient.

For each project, demonstrate both useful runtime behavior and compiler rejection of invalid usage. Keep intentional type errors in separate checking fixtures or commented examples. Type annotations, assertions, declarations, and utility types do not validate external data or create runtime implementations. Solutions are intentionally omitted.

## Beginner

These projects use foundational types and explicit contracts with bounded, practical requirements.

### 1. Checked invoice calculator

**Context:** A freelancer wants a small invoice calculator whose inputs and output are clear to anyone maintaining it.

**Produce:** A new TypeScript project with local compiler installation, separate source/output folders, and check/build scripts. Model invoice lines with a description, unit price, and quantity; calculate a subtotal and optional discount using annotated functions. Reject invalid numeric inputs at runtime and format the result for display. Include an empty invoice and a zero-discount case.

**Cheat sheet concepts:** Install TypeScript; Basic Types — string, number, arrays, object annotations, and undefined; Function — parameter/return annotations and defaults; TSConfig Reference — strict, rootDir, outDir, noEmit, and noEmitOnError.

### 2. Club member directory

**Context:** A club needs consistent member records before importing them into a larger system.

**Produce:** A typed in-memory directory with readonly member IDs, required names, optional contact fields, and a member-label function. Add lookup behavior that explicitly handles absent results. Distinguish an omitted display name from an intentionally empty one, and show that attempting to replace an ID is rejected by checking.

**Cheat sheet concepts:** Basic Types — null/undefined and readonly properties; Interfaces & Classes — basic interfaces; Function — optional parameters; TSConfig Reference — strictNullChecks and noUncheckedIndexedAccess.

### 3. Appointment-slot planner

**Context:** A tutor needs to record appointment times and room coordinates without confusing positional values.

**Produce:** A planner using named tuples for start/end times, readonly coordinate tuples, and optional tuple positions for room labels. Add a helper accepting a labeled variable-length list of session durations. Destructure the tuples in formatting functions and reject reversed position types through the compiler.

**Cheat sheet concepts:** Basic Types — fixed, named, optional, rest, and readonly tuples; Function — destructured parameters and rest parameters; Interfaces & Classes — object contracts.

### 4. Equipment availability tracker

**Context:** A community workshop needs a small, clearly defined vocabulary for equipment states.

**Produce:** An in-memory tracker with available, checked-out, and maintenance states. Use a string enum for the first model and a const-object/value-union alternative for a second version. Provide status lookup by declared key, document which raw strings each version accepts, and reject unknown states. If numeric codes are exported, assign explicit stable values rather than relying on declaration order.

**Cheat sheet concepts:** Basic Types — numeric/string enums, enum keys, enum-as-type, and const-object alternatives; Type Operations — keyof, typeof, indexed access, and as const.

### 5. Reusable notification formatter

**Context:** A small team sends the same announcement in several styles and wants interchangeable formatter functions.

**Produce:** A formatter module with a reusable function type, optional recipient title, default options, and rest recipients. Accept a callback that receives the formatted text and whose return value is ignored. Provide two compatible implementations, and preserve an explicitly empty title instead of replacing it with a default.

**Cheat sheet concepts:** Function — declarations, arrows, type aliases, callbacks, optional/default/rest parameters, and destructured options; Basic Types — void and arrays; Modules & Namespaces — named exports/imports.

### 6. Validated preference importer

**Context:** A personal tool receives saved preferences that may come from an older version or an edited file.

**Produce:** A function accepting unknown input and returning a usable preferences object or a clear failure result. Check non-null object shape and field types before accessing values. Preserve legitimate false, zero, and empty-string values. Include malformed inputs and document why replacing checks with any, as, or a non-null assertion would not validate the data.

**Cheat sheet concepts:** Basic Types — unknown versus any; Advanced Types — typeof guards, truthiness limits, and custom object predicates; Type Operations — assertions versus runtime checks; Function — explicit return contracts.

### 7. Readonly route configuration

**Context:** A small application needs route names and paths that stay synchronized with its navigation configuration.

**Produce:** A fixed route list and configuration object whose literal values remain precise. Derive allowed route names and values rather than repeating unions by hand. Check the configuration against a broader shape with satisfies, and write a navigation-label helper accepting only known routes. Demonstrate readonly restrictions without claiming they freeze referenced nested objects at runtime.

**Cheat sheet concepts:** Basic Types — readonly arrays and const assertions; Type Operations — as const, satisfies, keyof/typeof, and array-element indexed access; Function — checked input contracts.

### 8. Reading-progress account

**Context:** A reader wants a reusable model for a book's current page and completion status.

**Produce:** A class with initialized fields, a readonly book identifier, a private current-page field, and controlled progress updates. Add a getter for completion and a setter for a nonblank display title. Keep two instances independent and ensure invalid page updates leave state unchanged. Use constructor parameter properties where they make initialization clearer.

**Cheat sheet concepts:** Interfaces & Classes — basic classes, access modifiers, initialization, parameter properties, getters/setters, and static members; Basic Types — readonly properties; TSConfig Reference — strictPropertyInitialization.

## Intermediate

These projects combine contracts, inference, and modules. Choose sensible boundaries and record the important decisions in a short project note.

### 9. Generic undo-history service

**Context:** Multiple editors in an application need the same history behavior for different kinds of values.

**Produce:** A generic history interface and implementing class with push, current, and undo operations. Define empty-history results explicitly, preserve element types, and expose readonly views where appropriate. Support a default type argument for callers with no inference source, plus a helper that swaps a typed pair of history snapshots without losing either type.

**Cheat sheet concepts:** Generics — functions, interfaces, classes, multiple/default type parameters, and inference; Basic Types — readonly arrays and tuples; Interfaces & Classes — implementing contracts and encapsulation.

### 10. Type-safe settings editor

**Context:** A desktop-style tool needs shared setting-access helpers without allowing misspelled keys or mismatched values.

**Produce:** Generic read/update helpers for a settings object. Constrain keys to actual properties and preserve the selected property's value type. Add a capability-based helper for values with length and a shallow settings-composition helper limited to non-conflicting plain-object fields. Define which settings callers may edit rather than accepting arbitrary strings.

**Cheat sheet concepts:** Generics — constraints, keyof/T[K], and generic rest parameters; Type Operations — typeof and indexed access; Advanced Types — Pick, Omit, and Readonly.

### 11. User-profile update pipeline

**Context:** An application has different contracts for editing a profile, displaying it publicly, and consuming a fully populated record.

**Produce:** Derive an editable patch, a small label view, a complete record, and a public view from one user model containing a private password field. Implement patch application and a public-object conversion that actually omits the sensitive field at runtime. Decide whether absent and explicitly undefined optional values mean different things.

**Cheat sheet concepts:** Advanced Types — Partial, Required, Pick, Omit, NonNullable, and Readonly; Type Operations — indexed access; TSConfig Reference — exactOptionalPropertyTypes and strictNullChecks.

### 12. Typed search-result workflow

**Context:** A user search can be idle, loading, successful, empty, or failed, and the UI should never read fields from the wrong state.

**Produce:** A discriminated state union and a renderer returning presentation text for every variant. Load results asynchronously from a local fixture function and validate unknown records before admitting them to the success state. Add an exhaustiveness check that reports a missing branch when a new state is introduced. Derive the loader's resolved result type where useful.

**Cheat sheet concepts:** Advanced Types — discriminated unions, predicates, never, Awaited, and ReturnType; Function — async functions; Basic Types — unknown; Type Operations — typeof with functions.

### 13. Compatible coordinate and selection APIs

**Context:** A layout tool must accept both older two-number coordinate calls and newer coordinate-object calls without weakening its public contract.

**Produce:** A point class with overloaded construction and movement methods. Add a standalone converter whose return type depends on its input type, plus a generic selection helper with predicate and ordinary-boolean callback overloads. Keep one implementation per operation, handle incomplete runtime input safely, and preserve precise caller-visible results.

**Cheat sheet concepts:** Function — function, method, constructor, complex, and generic overloads; Generics — inference; Advanced Types — type predicates and narrowing; Interfaces & Classes — initialization.

### 14. Notification-channel library

**Context:** A team sends notices through different channels and wants common behavior without forcing every channel to duplicate it.

**Produce:** An abstract channel with protected shared state and concrete email/in-app implementations. Override a description while preserving base behavior with super. Compose timestamp and activation capabilities using the cheat sheet's mixin pattern. Include a receiver-dependent callback exposed safely for detached use, and a callable counter object for per-channel delivery attempts.

**Cheat sheet concepts:** Interfaces & Classes — abstract classes, inheritance, protected members, overriding, mixins, and hybrid callable interfaces; Function — this parameters and callback contracts; TSConfig Reference — noImplicitThis and strictBindCallApply.

### 15. Typed theme and event vocabulary

**Context:** A design-system team wants color/size combinations and handler names to follow consistent conventions as its model grows.

**Produce:** Derive theme tokens from finite unions, generate event names such as onClick with template literal types, and implement a complete handler object. Build mapped optional, readonly, and nullable variants of a component model, along with a getter API and a string-field-only view. Keep type transformations distinct from runtime value conversion.

**Cheat sheet concepts:** Advanced Types — Record, mapped modifiers, key remapping/filtering, template literal types, and Uppercase/Lowercase/Capitalize/Uncapitalize; Type Operations — satisfies and keyof; Function — callback contracts.

### 16. Gradual migration of a legacy helper

**Context:** A team cannot rewrite an existing JavaScript utility package at once but wants checked consumers and a clear public entry point.

**Produce:** A small mixed JS/TS project with JSDoc-checked JavaScript, a typed consumer, explicit named/default exports, re-exports, and type-only imports. Add declarations for one genuinely implemented untyped local module. Separate your custom declarations from source, configure their inclusion deliberately, and make the emitted modules run under the chosen loader. Compare ordinary imports with a conditional dynamic import for an optional feature.

**Cheat sheet concepts:** Modules & Namespaces — imports/exports, dynamic imports, ambient declarations, custom typings, and typeRoots; TSConfig Reference — allowJs, checkJs, module/moduleResolution, esModuleInterop, declaration, and types; Interfaces & Classes — public contracts.

## Advanced

These projects synthesize modeling, runtime guarantees, reusable types, and build/tooling decisions. Keep implementations small enough to review, but include realistic invalid input and compatibility cases. Document trade-offs rather than hiding them with unchecked assertions.

### 17. Configurable form-contract package

**Context:** Several internal applications need consistent field configuration, update contracts, and validation results without duplicating model types.

**Produce:** A reusable package deriving editable fields, getter signatures, event names, and validation-result shapes from a model. Use conditional types and infer to derive array elements and function results, and document any distributive behavior over unions. Implement runtime validators for unknown input separately from these type transformations. Export declarations and a consumer fixture proving valid configurations infer useful types and invalid field/value combinations are rejected.

**Cheat sheet concepts:** Generics — constraints and inference; Type Operations — satisfies, keyof, typeof, and indexed access; Advanced Types — mapped/key-remapped/conditional types, infer, template literals, and utility types; Modules & Namespaces — public re-exports; TSConfig Reference — declaration and declarationMap.

### 18. Typed route-and-handler registry

**Context:** An internal application wants one source of truth for named routes, route metadata, and handler contracts while retaining lazy feature loading.

**Produce:** A const route registry checked with satisfies, derived route/segment unions using the cheat sheet's literal-pattern extraction, and a typed handler map. Separate route literals from untrusted runtime strings and validate the latter. Include dynamic loading of an optional route module, an exhaustive result-state renderer, and a public API exposing only intended members. Keep segment extraction within its documented simple-route grammar rather than claiming a general URL parser.

**Cheat sheet concepts:** Type Operations — const assertions, keyof/typeof, and indexed access; Advanced Types — ExtractRoute-style inference, Record, Extract/Exclude, template literal types, and never; Function — async contracts; Modules & Namespaces — dynamic imports and re-exports; TSConfig Reference — module resolution and type-only imports.

### 19. Audited service with standard decorators

**Context:** A team needs consistent logging and input-range checks around a few service methods while keeping method types and receiver behavior intact.

**Produce:** A typed service with unknown-input validation, domain interfaces, custom failure paths, and standard logging/validation decorators. Add a field-initializer constraint, a class-sealing decorator, and one instance-local caching decorator with an explicit cache policy. Demonstrate that later field assignments are not validated by an initializer-only decorator and that sealing a constructor/prototype does not seal instances. Keep legacy decorator/metadata behavior in a separate compatible fixture and explain the API difference.

**Cheat sheet concepts:** Decorators — method/class/field decorators, factories, and common uses; Interfaces & Classes — initialization, access modifiers, and methods; Advanced Types — guards and Parameters/ReturnType; TSConfig Reference — experimentalDecorators, emitDecoratorMetadata, and useDefineForClassFields.

### 20. Legacy integration boundary kit

**Context:** An application relies on a script-provided global API, an untyped local module, and library contracts that need application-specific fields.

**Produce:** A small integration package with ambient module declarations, a declared global namespace, and module/global augmentation organized in separate appropriate scopes. Supply actual local runtime providers and explicitly initialize augmented fields. Include a typed wrapper exposing a narrow contract, optional integration handling, and one triple-slash inclusion case. Add an Express middleware fixture with an optional augmented request field and a guarded consumer, using matching package typings.

**Cheat sheet concepts:** Modules & Namespaces — namespaces, global declarations, ambient modules, augmentation, triple-slash directives, @types, and custom declaration structure; Basic Types — unknown; Advanced Types — guards and optional contracts; TSConfig Reference — types, typeRoots, and strict checking.

### 21. Typed UI asset integration

**Context:** A small React/Vite UI package needs reusable components, CSS Modules, SVG components, and type-safe extension points without declarations that lie about runtime assets.

**Produce:** A focused component package using generic interfaces, derived props, discriminated display states, and typed callbacks. Integrate a real CSS Module and an SVG-to-component transform with matching declarations/import conventions. Handle potentially missing class-map keys, preserve ordinary SVG URL imports as a distinct contract, and demonstrate a consumer build. Keep checker aliases aligned with bundler aliases and separate type checking from bundler emit.

**Cheat sheet concepts:** Generics — reusable interfaces and constraints; Advanced Types — utility types and discriminated unions; Modules & Namespaces — CSS/SVG declarations and type-only exports; TSConfig Reference — React/Vite, jsx, paths, noEmit, and isolatedModules.

### 22. Referenceable multi-package workspace

**Context:** A growing application needs separately checked core models, a reusable library, and a Node consumer without losing reliable builds or useful editor navigation.

**Produce:** Three minimal projects connected with references and deliberate public entry points. Configure composite builds, incremental metadata locations, declarations/maps, and compatible runtime module settings. Include a small JavaScript migration fixture and inspect how rootDir/outDir, noEmitOnError, and declaration-only builds differ. Run a fresh build, an unchanged repeat build, and a build after a public API change; document the effect of editor source redirection and the limits of skipLibCheck.

**Cheat sheet concepts:** Modules & Namespaces — public contracts and re-exports; Generics/Advanced Types — shared reusable models; TSConfig Reference — composite, incremental, tsBuildInfoFile, declaration/map, emitDeclarationOnly, module resolution, allowJs/checkJs, and project-reference behavior.

### 23. Runtime-compatible library release candidate

**Context:** A library maintainer must produce consumable JavaScript and declarations while avoiding type settings that conceal loader or runtime incompatibilities.

**Produce:** A tiny library containing generic collection helpers, a callback API, a constant vocabulary, and a typed async result. Build compatible consumer fixtures for the selected package format and inspect source maps, helper imports, and declaration output. Document target/lib versus runtime capabilities, paths versus actual loader resolution, const-enum trade-offs, and why removed/deprecated options are omitted. Use isolated fixtures when comparing older iteration emit or enum behavior, with compiler versions recorded; include bigint and symbol values only under a supported contract and target.

**Cheat sheet concepts:** Basic Types — symbol, bigint, enums, and const objects; Function/Generics — reusable public APIs; Advanced Types — derived results; Modules & Namespaces — exports and package types; TSConfig Reference — target/lib, module interop, importHelpers, preserveConstEnums, source maps, isolatedModules, and current replacements for legacy settings.

### 24. Cross-application domain contract

**Context:** A team shares a booking domain between a Node service, a reusable package, and a small Next.js application, but each environment has different build ownership and runtime assumptions.

**Produce:** A shared typed booking model with readonly identifiers, editable patches, exhaustive lifecycle states, capability-constrained helpers, and runtime guards for imported unknown records. Expose the contract through type-only/public entry points and provide local in-memory adapters implementing a generic interface. Build minimal consumers for Node and Next.js, retaining framework-generated configuration and declarations. Demonstrate how a new lifecycle state propagates into compiler errors at missing cases, and record which guarantees are static, which are runtime checks, and which depend on the loader or framework. Add decorators only if their lifecycle and configuration serve a stated requirement.

**Cheat sheet concepts:** Basic Types/Interfaces & Classes — domain contracts and initialization; Function/Generics — adapter contracts and async results; Type Operations/Advanced Types — derived types, patches, guards, unions, and exhaustiveness; Modules & Namespaces — package boundaries and type-only exports; TSConfig Reference — Node, library, Next.js, strict checks, JSX, and declaration/build ownership.
