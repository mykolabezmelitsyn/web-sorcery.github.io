# JavaScript practice projects

Projects based on all seven available [JavaScript cheat sheets](docs/javascript-cheatsheets.html): General, DOM Manipulation, Async JavaScript, Array Methods, Fetch API, Regular Expressions, and String Methods. Each level contains eight projects, ordered to build on earlier skills. Axios is not included because its cheat sheet is not yet available.

Use JavaScript and the APIs covered in those references. Browser projects can use a small HTML/CSS shell; Node-specific work should run in Node.js. For network projects, use local JSON files, a local API, or a test endpoint you control. Authentication and uploads can use synthetic data. No deployment, database, or additional application framework is required. Check runtime support before choosing newer APIs such as iterator helpers or explicit resource management.

## Beginner

These projects have bounded requirements and can be completed using foundational language features and a small browser page.

### <span style="color:green">1. Personal expense summary</span>

**Context:** You want to understand where a week's spending went before moving the data into a larger budgeting tool.

**Produce:** A script that reads an array of expenses containing a label, category, and amount. Return the total, totals per category, the largest expense, and a formatted text report. Reject invalid amounts, preserve legitimate zero amounts, and provide a sensible report for an empty week. Use sample data with a known total so you can check your result.

**Cheat sheet concepts:** General — variables, conversion, objects, conditionals, functions, and errors; Array Methods — filter, map, reduce, and find; String Methods — template literals and padding.

### <span style="color:orange">2. Contact-name cleanup tool</span>

**Context:** A community organizer receives a short list of inconsistent contact names copied from different documents.

**Produce:** A tool that trims outer whitespace, collapses repeated internal whitespace, removes blank entries, and reports duplicates under a stated case-comparison rule. Show the original and cleaned lists side by side. Keep the display spelling of the first accepted contact instead of indiscriminately title-casing people's names.

**Cheat sheet concepts:** String Methods — trim, case conversion, split, replace, and join; Array Methods — filtering and searching; General — Set, arrays, and functions; DOM Manipulation — selection and textContent.

### 3. Event registration form

**Context:** A local club needs a browser form to collect a name, email address, attendance choice, and one or more workshop selections.

**Produce:** A form that validates required fields, displays a live name-length counter, and shows a submission summary without navigating away. Preserve all selected workshops and reset both the controls and summary on demand. Present the email check as an input-format check rather than proof that an address exists. No server submission is needed.

**Cheat sheet concepts:** DOM Manipulation — form values, FormData/getAll, native validation, input/submit/reset events, and safe text insertion; String Methods — trim and length; General — conditionals and objects.

### 4. Daily reading checklist

**Context:** You want a lightweight checklist for articles you plan to read today.

**Produce:** A page that adds, completes, and removes reading items and displays the remaining count. Give each item a stable identifier and handle clicks on nested button icons correctly. Use one list-level event listener so newly added items work immediately. Keep the first version in memory and prevent blank titles.

**Cheat sheet concepts:** DOM Manipulation — createElement, append, remove, closest, dataset, classList, and delegation; Array Methods — findIndex and filter; General — objects, closures, and control flow.

### 5. Product catalog filter

**Context:** A small shop wants customers to browse a fixed list of products before an online ordering system exists.

**Produce:** A catalog with a text search, category selector, in-stock toggle, and numeric price ordering. Render matching products and an explicit no-results message. Keep the source data unchanged, and ensure a product title containing angle brackets displays as text. Define whether search is case-sensitive.

**Cheat sheet concepts:** Array Methods — filter, some, map, and copying sorts; String Methods — includes and explicit case folding; DOM Manipulation — form events, fragments, and textContent.

### 6. File-name review report

**Context:** Before sharing a folder of documents, you need to identify unsupported extensions and overly long display names.

**Produce:** A report from an array of filenames showing the name, extension, whether it belongs to a small allowlist, and a shortened display label. State how dotfiles and extensionless names are treated. Include mixed-case extensions, multiple dots, and names such as photo.jpg.exe; shorten labels without changing the stored filenames.

**Cheat sheet concepts:** String Methods — lastIndexOf, slice, startsWith/endsWith, truncation, and case conversion; Array Methods — map and some; General — functions and branching.

### 7. Focus-session timer

**Context:** You want a short focus timer that can run repeatedly during a workday.

**Produce:** A page with Start, Pause, and Reset controls, a remaining-time display, and a completion message. Prevent repeated Start clicks from creating duplicate timers. Compute the display from elapsed time rather than assuming every timer callback fires exactly on schedule, and clear pending timers when the session resets.

**Cheat sheet concepts:** Async JavaScript — setTimeout/setInterval and cleanup; General — closures, arithmetic, and functions; String Methods — padStart and time formatting; DOM Manipulation — listeners and content updates.

### 8. Community announcement board

**Context:** A neighborhood group publishes announcements as a JSON file and wants a simple page that reads it.

**Produce:** A browser page that fetches a same-origin JSON file, checks the response, and renders announcement titles and dates as text. Show loading, empty, and error states, with a retry button. Test a missing file and malformed JSON in addition to the successful response. Serve the page over local HTTP.

**Cheat sheet concepts:** Fetch API — basic GET, response.ok, and response.json; Async JavaScript — async/await and try/catch/finally; DOM Manipulation — rendering and event handling; General — arrays and error properties.

## Intermediate

These projects combine several reference areas. Decide how to organize state, split modules, and define edge-case behavior, and record those choices in a short project note.

### 9. Persistent project task board

**Context:** A freelancer needs a task board that survives page reloads and supports a growing backlog.

**Produce:** A board with add/edit/delete actions, status filters, priority sorting, and move-up/move-down controls. Persist a JSON-compatible representation in localStorage and recover gracefully from malformed saved data. Preserve stable task identities and use delegated actions. Separate storage, data operations, and rendering into modules.

**Cheat sheet concepts:** General — modules, JSON, localStorage, copying, and error handling; Array Methods — searching, sorting, moving, and copying updates; DOM Manipulation — traversal, delegation, and node insertion.

### 10. Survey response analyzer

**Context:** An organizer has a small, explicitly unquoted CSV export and needs a summary of survey responses.

**Produce:** An importer for a documented format such as name,team,rating, with LF or CRLF lines. Validate the header, report invalid rows with line numbers, and calculate counts and average ratings by team. Export a readable summary. Explicitly reject quoted fields or embedded delimiters instead of claiming to support general CSV.

**Cheat sheet concepts:** String Methods — splitting lines, trim, join, and the unquoted CSV subset; Regular Expressions — simple format rules and table-driven cases; Array Methods — reduce, grouping, and numeric sorting; General — conversion and validation errors.

### 11. Search-result preview editor

**Context:** A content editor wants to preview titles, descriptions, URLs, and highlighted keywords before publishing an article.

**Produce:** A live preview with bounded title/description display lengths, an ASCII-style slug, word count, and literal keyword highlighting. Debounce expensive preview work, preserve zero/false values in template fields, and display editor text safely. Explain the limits of your slug and word-count conventions, including non-ASCII input.

**Cheat sheet concepts:** String Methods — truncation, slugify, wordCount, template replacement, and escaping; Regular Expressions — dynamic literal escaping and replacement callbacks; Async JavaScript — debouncing; DOM Manipulation — input events and safe rendering.

### 12. International contact directory

**Context:** A team directory contains names with accents, Turkish casing, and non-Latin letters.

**Produce:** A searchable directory that retains original names for display, normalizes text for a documented search policy, and sorts with an explicitly chosen locale and Intl.Collator. Compare canonical normalization with optional accent-insensitive search. Include a small diagnostic showing UTF-16 length versus code-point count for names containing emoji, without presenting either as a complete grapheme count.

**Cheat sheet concepts:** String Methods — normalize, locale-specific casing, localeCompare, Intl.Collator, codePointAt, and string iteration; Regular Expressions — Unicode properties; Array Methods — filtering and copying sorts.

### 13. Configurable equipment checkout model

**Context:** A makerspace wants reusable JavaScript models for borrowing different kinds of equipment.

**Produce:** A small equipment model with initialized instance state, controlled checkout/return operations, private internal state, and a readable availability getter. Add one specialized subclass that extends base behavior. Provide an event callback that remains correctly bound when detached, a collection lookup by ID, and custom errors for invalid transitions. Keep a small prototype-delegation version alongside it to compare shared behavior and independent state.

**Cheat sheet concepts:** General — classes, private fields, getters, extends/super, this, bind, prototypes, Object.create, Map, and custom errors; Array Methods — search and validation helpers.

### 14. Search-as-you-type reference browser

**Context:** A documentation page offers a search endpoint, but users often type faster than responses arrive.

**Produce:** A search UI with debounced input, encoded query parameters, loading/error/empty states, cancellation, and a latest-query-wins policy. Use a controlled endpoint with differently delayed responses to prove stale results cannot replace current ones. Clean up pending requests and listeners when the component is disposed. Avoid starting a request for blank input.

**Cheat sheet concepts:** Async JavaScript — debounce, async/await, AbortController, and cleanup; Fetch API — URLSearchParams, request cancellation, and response handling; DOM Manipulation — listeners and component updates.

### 15. Image gallery with incremental loading

**Context:** A portfolio contains enough images that loading and rendering every image immediately is wasteful.

**Produce:** A gallery that loads images on intersection and requests the next metadata page when a sentinel becomes visible. Prevent duplicate concurrent page requests and disconnect observers when the gallery is removed. Use MutationObserver to initialize externally inserted gallery cards exactly once, without reacting endlessly to your own initialization changes.

**Cheat sheet concepts:** DOM Manipulation — templates, fragments, IntersectionObserver, MutationObserver, dataset, and cleanup; Async JavaScript — promises and in-flight state; Fetch API — paginated GET requests.

### 16. Local log investigation tool

**Context:** A developer needs to inspect synthetic application logs to find repeated failures and extract useful fields.

**Produce:** A script or page that parses one documented log-line format, extracts timestamps and named fields, groups errors by category, and searches by literal terms. Report unmatched lines rather than silently discarding them. Include independent regex tests for valid, invalid, empty, and near-miss inputs, plus a first-match span display. Bound inputs and avoid ambiguous repeated quantifiers.

**Cheat sheet concepts:** Regular Expressions — named groups, anchors, flags, matchAll/exec, escaping, performance-conscious patterns, and debugging; String Methods — line splitting and formatting; Array Methods — grouping and counting; General — errors and modules.

## Advanced

These projects synthesize language design, data/text processing, browser behavior, and asynchronous or network work. Keep each implementation focused on the stated scenario. Document the important trade-offs and demonstrate success, failure, cancellation, and cleanup paths where they apply.

### 17. Resilient support-request workspace

**Context:** A support team needs a browser workspace for searching, reviewing, and updating requests while an API occasionally fails.

**Produce:** A modular interface with filtered/sorted request lists, a detail panel, editable forms, and a reusable CRUD client. Centralize request defaults and structured errors; add bounded retries only for eligible operations and a single shared token refresh for concurrent 401 responses. Preserve cancellation, prevent stale UI writes, and distinguish HTTP, network, parsing, and validation failures. Exercise behavior with synthetic credentials and controllable responses.

**Cheat sheet concepts:** General — modules, classes or factories, errors/causes, and immutable state; Array/String Methods — reporting, searching, and formatting; DOM Manipulation — delegated events and forms; Async JavaScript — deduplication, backoff, and abort; Fetch API — CRUD, headers, auth refresh, and error handling.

### 18. Offline field-notes reader

**Context:** A volunteer needs to read downloaded field notes during unreliable connectivity and clearly understand when displayed content is stale.

**Produce:** A reader with a scoped service worker, offline navigation fallback, application-level TTL caching, and ETag revalidation of note data. Show cached/stale status explicitly and retain the representation associated with a validator. Provide targeted cache invalidation and a cleanup action for the project's worker/cache. Test offline rejection separately from readable HTTP error responses; document what happens to pages already controlled after unregistering.

**Cheat sheet concepts:** Fetch API — cache modes, service workers, TTL caches, conditional requests, and response parsing; Async JavaScript — recovery and cleanup; General — Map, serialization, and modules; Array/String Methods — list organization and display formatting; DOM Manipulation — status UI and events.

### 19. Cancelable file-transfer dashboard

**Context:** A team shares large local test files and needs meaningful progress, cancellation, and recovery from interrupted downloads.

**Produce:** A file-selection/upload UI, sequential chunk-upload protocol with explicit finalization, and download controls backed by a local endpoint you control. Use XMLHttpRequest for upload progress and Fetch streams for download progress. Resume only when saved bytes, a strong ETag, and returned range metadata agree; restart on a changed representation. Clean up object URLs and listeners, reject inconsistent partial bodies, and never invent a percentage when the total is unknown.

**Cheat sheet concepts:** Fetch API — FormData, upload progress, chunking, streams, Range/If-Range, and object URLs; Async JavaScript — cancellation and sequencing; DOM Manipulation — files, forms, and progress UI; General — errors and binary data handling covered by the response APIs; String Methods — filenames and status formatting.

### 20. Streaming operations monitor

**Context:** An operations team receives a long JSON Lines response and needs to inspect events before the entire response finishes.

**Produce:** A browser monitor that incrementally decodes bytes, buffers partial lines, parses complete records, and handles a final line without a newline. Filter and group incoming events, highlight literal search terms safely, and bound the number of visible records. Batch expensive UI work, support Stop and Restart, and state your policy for malformed lines. Test split multibyte characters, truncated input, empty input, and cancellation during body consumption.

**Cheat sheet concepts:** Fetch API — streamed responses and incremental JSON lines; Async JavaScript — async iteration, cancellation, and event-loop responsiveness; Regular Expressions/String Methods — line processing, literal search, and escaping; Array Methods — grouping and bounded collections; DOM Manipulation — fragments, safe rendering, and delegated controls.

### 21. Resource-conscious batch report runner

**Context:** A Node-based internal tool must process many independent local records without exhausting resources or hiding partial failures.

**Produce:** A modular runner with bounded concurrency, input-order result tracking, an explicit fail-fast versus collect-results policy, and a human-readable report. Adapt one callback-based operation to promises, yield between CPU-heavy batches, and handle shutdown by stopping new work and releasing acquired resources. Use disposal APIs only in a supporting runtime. Include counters proving concurrency limits and a fixture proving cleanup on success, rejection, and cancellation.

**Cheat sheet concepts:** General — functions, closures, modules, errors, and this binding; Async JavaScript — callback adapters, promise combinators, worker queues, setImmediate, disposables, and graceful shutdown; Array Methods — transformations and aggregation; String Methods — aligned reports; Regular Expressions — bounded record-format checks.

### 22. Browser API diagnostics workbench

**Context:** A developer must explain why a browser integration behaves differently from a command-line request before changing application code.

**Produce:** A small diagnostic page and two controlled local origins with fixtures for CORS permissions, preflight, credentials, caching, and response types. Display request outcomes without leaking synthetic tokens into reports. Add reversible request/response/error hooks with a defined order, and use response cloning only before consumption. Save an exportable JSON report and demonstrate which failures are readable HTTP responses, opaque responses, or rejected requests. Document which conclusions need real server changes rather than client workarounds.

**Cheat sheet concepts:** Fetch API — modes, credentials, restricted/exposed headers, preflight, cache configuration, bodyUsed/clone, and interception; Async JavaScript — promises and error recovery; General — JSON, modules, and structured errors; DOM Manipulation — forms and status rendering; Array/String Methods — grouping and report formatting.

### 23. Editorial document-review workspace

**Context:** Editors need one place to review locally supplied text for formatting inconsistencies, search terms, links, and simple metadata before publishing.

**Produce:** A workspace with asynchronous file loading, debounced analysis, literal/regex search modes, match locations, and an exportable findings report. Keep user input as text, normalize only under a stated policy, preserve falsy metadata, and distinguish URL candidates from parsed HTTP URLs. Include Unicode and locale test cases, explicitly label any limited Markdown/HTML-shaped demonstration, and bound analysis work so an older result cannot replace a newer document. Use custom events between independently disposable UI components.

**Cheat sheet concepts:** String Methods — normalization, locale handling, templates, replacement, and Unicode counts; Regular Expressions — groups, flags, indices, state, escaping, and test tables; Array Methods — findings transformations and grouping; DOM Manipulation — FileReader, custom events, and safe updates; Async JavaScript — debounce, sequencing, and cleanup; General — modules and error handling.

### 24. Searchable activity explorer

**Context:** A small organization wants a focused dashboard combining paginated activity data, saved display preferences, and responsive exploration of a large result set.

**Produce:** An explorer with cancelable paginated reads, a concurrency limit for related detail requests, shared in-flight reads, and explicit cache invalidation. Offer locale-aware search/sort, grouped summaries, and a bounded rendered window with lazy enrichment. Store only JSON-compatible display preferences and recover from corrupt storage. Separate transport, state, transformations, and UI into modules; provide one disposal path for timers, listeners, observers, and requests. Demonstrate an empty dataset, partial request failure, rapid filter changes, and teardown during loading, and explain the freshness-versus-network-use trade-off.

**Cheat sheet concepts:** General — modules, closures/classes, Map/Set, JSON, and errors; Array Methods — grouping, copying updates, iteration, and aggregation; String Methods/Regular Expressions — normalization and safe search; DOM Manipulation — delegation, forms, and observers; Async JavaScript — concurrency, deduplication, and cancellation; Fetch API — pagination, response handling, and application caches.
