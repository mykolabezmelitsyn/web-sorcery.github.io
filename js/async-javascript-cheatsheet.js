/* Add only Async JavaScript categories supplied by the user, in image order. */
const handbook = {
  categories: [
    {
      name: "Callbacks",
      id: "callbacks",
      intro:
        "Basic Callbacks → Callback Hell and solutions. Run each example independently. Timer and database demonstrations are simulated and state their behavior; Node.js file and third-party library examples include complete files and prerequisites.",
      methods: [
        {
          name: "Basic asynchronous callbacks",
          explanation:
            "Passes a function to be invoked after an operation completes. Use the callback to consume results that are not available when the function returns.",
          note: "A callback is not inherently asynchronous; these examples use timers to schedule it later. A zero-millisecond delay schedules a future task rather than running immediately.",
          source:
            "https://developer.mozilla.org/en-US/docs/Glossary/Callback_function",
          examples: [
            {
              label: "Deliver a result later",
              language: "javascript",
              code: 'function getData(callback) {\n  setTimeout(() => callback("Data loaded"), 0);\n}\ngetData(result => console.log(result));\nconsole.log("Waiting"); // "Waiting", then "Data loaded"',
            },
            {
              label: "Pass a user record to a callback",
              language: "javascript",
              code: 'function fetchUser(id, callback) {\n  setTimeout(() => callback({ id, name: "John Doe" }), 0);\n}\nfetchUser(123, user => console.log("User fetched:", user.id, user.name));\n// "User fetched:", 123, "John Doe"',
            },
          ],
        },
        {
          name: "Error-first callbacks with fs.readFile()",
          explanation:
            "Reports an error as the first callback argument and a successful result as the next argument. Use this convention with Node.js callback APIs.",
          note: "Save each file set in its own folder and run node main.cjs. UTF-8 encoding returns text instead of a Buffer; return after handling the error to avoid processing missing data.",
          source:
            "https://nodejs.org/api/fs.html#fsreadfilepath-options-callback",
          examples: [
            {
              label: "Read a real UTF-8 file",
              files: [
                {
                  path: "message.txt",
                  language: "none",
                  code: "Data loaded",
                },
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const fs = require("node:fs");\nfunction readFile(path, callback) {\n  fs.readFile(path, "utf8", (error, data) => {\n    if (error) return callback(error, null);\n    callback(null, data);\n  });\n}\nreadFile(require("node:path").join(__dirname, "message.txt"), (error, data) => {\n  if (error) return console.log(error.code);\n  console.log(data); // "Data loaded"\n});',
                },
              ],
            },
            {
              label: "Handle an actual missing-file error",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const fs = require("node:fs");\nconst path = require("node:path");\nconst missing = path.join(__dirname, "missing-" + require("node:crypto").randomUUID() + ".txt");\nfs.readFile(missing, "utf8", (error, data) => {\n  if (error) return console.log(error.code); // "ENOENT"\n  console.log(data);\n});',
                },
              ],
            },
          ],
        },
        {
          name: "Error-first database callback adapters",
          explanation:
            "Forwards a database-style API result through a consistent error-first callback. Use early returns to keep the success and failure paths separate.",
          note: "The database objects below are explicitly simulated asynchronous APIs, so no server or credentials are required. A real database query API may differ.",
          source:
            "https://developer.mozilla.org/en-US/docs/Glossary/Callback_function",
          examples: [
            {
              label: "Forward successful results",
              language: "javascript",
              code: 'function readDatabase(db, query, callback) {\n  db.query(query, (error, results) => {\n    if (error) return callback(error, null);\n    callback(null, results);\n  });\n}\nconst db = { query(sql, callback) {\n  setTimeout(() => callback(null, [{ name: "John" }]), 0);\n} };\nreadDatabase(db, "SELECT name FROM users", (error, data) => {\n  if (error) return console.log(error.message);\n  console.log("Results:", data[0].name);\n});',
            },
            {
              label: "Forward an error without processing data",
              language: "javascript",
              code: 'function readDatabase(db, query, callback) {\n  db.query(query, (error, results) => {\n    if (error) return callback(error, null);\n    callback(null, results);\n  });\n}\nconst db = { query(sql, callback) {\n  setTimeout(() => callback(new Error("Database unavailable")), 0);\n} };\nreadDatabase(db, "SELECT name FROM users", (error, data) => {\n  if (error) return console.log(error.message, data);\n  console.log(data.length);\n});',
            },
          ],
        },
        {
          name: "Register event callbacks with on()",
          explanation:
            "Stores callbacks under an event name so they can respond to later emissions. Use multiple registrations when several consumers need the same event.",
          note: "This is a small custom emitter using Map to avoid collisions with inherited object keys. It is not Node.js EventEmitter and does not implement its special error-event behavior, removal methods, or other features.",
          source:
            "https://developer.mozilla.org/en-US/docs/Glossary/Callback_function",
          examples: [
            {
              label: "Register multiple callbacks for one event",
              language: "javascript",
              code: 'class EventEmitter {\n  constructor() { this.events = new Map(); }\n  on(event, callback) {\n    if (!this.events.has(event)) this.events.set(event, []);\n    this.events.get(event).push(callback);\n  }\n  emit(event, data) {\n    for (const callback of [...(this.events.get(event) ?? [])]) callback(data);\n  }\n}\nconst emitter = new EventEmitter();\nemitter.on("data", value => console.log("First:", value));\nemitter.on("data", value => console.log("Second:", value));\nemitter.emit("data", "Hello");',
            },
            {
              label: "Keep registrations separate by event",
              language: "javascript",
              code: 'class EventEmitter {\n  constructor() { this.events = new Map(); }\n  on(event, callback) {\n    if (!this.events.has(event)) this.events.set(event, []);\n    this.events.get(event).push(callback);\n  }\n  emit(event, data) {\n    for (const callback of [...(this.events.get(event) ?? [])]) callback(data);\n  }\n}\nconst emitter = new EventEmitter();\nemitter.on("data", value => console.log("Received:", value.message));\nemitter.on("error", error => console.log("Error:", error.message));\nemitter.emit("data", { message: "Hello" });',
            },
          ],
        },
        {
          name: "Dispatch event callbacks with emit()",
          explanation:
            "Invokes registered callbacks with an event payload. Use it to publish data to interested consumers.",
          note: "This custom emitter calls listeners synchronously in registration order, unlike a timer callback. An exception from a listener propagates and stops the remaining calls.",
          source:
            "https://developer.mozilla.org/en-US/docs/Glossary/Callback_function",
          examples: [
            {
              label: "Observe synchronous listener order",
              language: "javascript",
              code: 'class EventEmitter {\n  constructor() { this.events = new Map(); }\n  on(event, callback) {\n    if (!this.events.has(event)) this.events.set(event, []);\n    this.events.get(event).push(callback);\n  }\n  emit(event, data) {\n    for (const callback of [...(this.events.get(event) ?? [])]) callback(data);\n  }\n}\nconst emitter = new EventEmitter();\nemitter.on("data", data => console.log(data));\nconsole.log("Before");\nemitter.emit("data", "Received");\nconsole.log("After");',
            },
            {
              label: "Ignore an unregistered event",
              language: "javascript",
              code: 'class EventEmitter {\n  constructor() { this.events = new Map(); }\n  on(event, callback) {\n    if (!this.events.has(event)) this.events.set(event, []);\n    this.events.get(event).push(callback);\n  }\n  emit(event, data) {\n    for (const callback of [...(this.events.get(event) ?? [])]) callback(data);\n  }\n}\nconst emitter = new EventEmitter();\nemitter.emit("missing", "ignored");\nconsole.log("Completed");',
            },
          ],
        },
        {
          name: "Callback hell and nested dependencies",
          explanation:
            "Nests callbacks when each asynchronous result is needed by the next step. Use the pattern to recognize how sequencing and repeated error checks can become difficult to maintain.",
          note: "Each helper is defined and asynchronous. The empty-orders guard avoids treating missing data as a valid first order; later entries flatten the same kind of workflow.",
          source:
            "https://developer.mozilla.org/en-US/docs/Glossary/Callback_function",
          examples: [
            {
              label: "Follow four dependent asynchronous steps",
              language: "javascript",
              code: '// Simulated asynchronous APIs; no network or database is used.\nfunction getUserData(id, callback) { setTimeout(() => callback(null, { id }), 0); }\nfunction getOrders(userId, callback) { setTimeout(() => callback(null, [{ id: userId + 1 }]), 0); }\nfunction getOrderDetails(orderId, callback) { setTimeout(() => callback(null, { shippingId: orderId + 1 }), 0); }\nfunction getShippingInfo(shippingId, callback) { setTimeout(() => callback(null, { id: shippingId, status: "shipped" }), 0); }\nfunction handleError(error) { console.log(error.message); }\ngetUserData(123, (error, user) => {\n  if (error) return handleError(error);\n  getOrders(user.id, (error, orders) => {\n    if (error) return handleError(error);\n    if (!orders.length) return handleError(new Error("No orders"));\n    getOrderDetails(orders[0].id, (error, details) => {\n      if (error) return handleError(error);\n      getShippingInfo(details.shippingId, (error, shipping) => {\n        if (error) return handleError(error);\n        console.log(user.id, orders[0].id, shipping.id, shipping.status);\n      });\n    });\n  });\n});',
            },
            {
              label: "Stop a nested workflow on failure",
              language: "javascript",
              code: 'function getUserData(id, callback) { setTimeout(() => callback(null, { id }), 0); }\nfunction getOrders(id, callback) { setTimeout(() => callback(new Error("Orders unavailable")), 0); }\ngetUserData(123, (error, user) => {\n  if (error) return console.log(error.message);\n  getOrders(user.id, (error, orders) => {\n    if (error) return console.log(error.message);\n    console.log(orders.length); // not reached\n  });\n});',
            },
          ],
        },
        {
          name: "Flatten callbacks with named functions",
          explanation:
            "Moves each workflow stage into a named handler and uses one final error-first callback. Use it to reduce indentation while keeping callback-based APIs.",
          note: "The closure preserves previous results for the final callback. Each operation is assumed to invoke its callback exactly once; return after forwarding an error.",
          source:
            "https://developer.mozilla.org/en-US/docs/Glossary/Callback_function",
          examples: [
            {
              label: "Preserve all dependent results",
              language: "javascript",
              code: '// Simulated asynchronous APIs; no network or database is used.\nfunction getUserData(id, callback) { setTimeout(() => callback(null, { id }), 0); }\nfunction getOrders(userId, callback) { setTimeout(() => callback(null, [{ id: userId + 1 }]), 0); }\nfunction getOrderDetails(orderId, callback) { setTimeout(() => callback(null, { shippingId: orderId + 1 }), 0); }\nfunction getShippingInfo(shippingId, callback) { setTimeout(() => callback(null, { id: shippingId, status: "shipped" }), 0); }\nfunction handleUserData(userId, finalCallback) {\n  let user, orders, details;\n  getUserData(userId, handleUser);\n  function handleUser(error, value) {\n    if (error) return finalCallback(error);\n    user = value;\n    getOrders(user.id, handleOrders);\n  }\n  function handleOrders(error, value) {\n    if (error) return finalCallback(error);\n    orders = value;\n    if (!orders.length) return finalCallback(new Error("No orders"));\n    getOrderDetails(orders[0].id, handleDetails);\n  }\n  function handleDetails(error, value) {\n    if (error) return finalCallback(error);\n    details = value;\n    getShippingInfo(details.shippingId, handleShipping);\n  }\n  function handleShipping(error, shipping) {\n    if (error) return finalCallback(error);\n    finalCallback(null, { user, orders, details, shipping });\n  }\n}\nhandleUserData(123, (error, result) => {\n  if (error) return console.log(error.message);\n  console.log(result.user.id, result.orders[0].id, result.details.shippingId, result.shipping.status);\n});',
            },
            {
              label: "Forward an error through a named handler",
              language: "javascript",
              code: 'function getUserData(id, callback) { setTimeout(() => callback(new Error("User unavailable")), 0); }\nfunction handleUserData(id, finalCallback) {\n  getUserData(id, handleUser);\n  function handleUser(error, user) {\n    if (error) return finalCallback(error);\n    finalCallback(null, user);\n  }\n}\nhandleUserData(123, (error, user) => {\n  if (error) return console.log(error.message);\n  console.log(user.id);\n});',
            },
          ],
        },
        {
          name: "async.waterfall()",
          explanation:
            "Runs callback tasks in series, passing each task’s result arguments to the next task. Use it to organize an existing callback workflow with the third-party Async library.",
          note: "In a separate example folder, run npm install async@3.2.6, save main.cjs, then run node main.cjs. The async package is separate from the async function keyword. A task error stops the workflow and reaches the final callback; call each task callback exactly once.",
          source: "https://caolan.github.io/async/v3/docs.html#waterfall",
          examples: [
            {
              label: "Carry all results through a waterfall",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const async = require("async");\n// Simulated asynchronous APIs; no network or database is used.\nfunction getUserData(id, callback) { setTimeout(() => callback(null, { id }), 0); }\nfunction getOrders(userId, callback) { setTimeout(() => callback(null, [{ id: userId + 1 }]), 0); }\nfunction getOrderDetails(orderId, callback) { setTimeout(() => callback(null, { shippingId: orderId + 1 }), 0); }\nfunction getShippingInfo(shippingId, callback) { setTimeout(() => callback(null, { id: shippingId, status: "shipped" }), 0); }\nasync.waterfall([\n  callback => getUserData(123, callback),\n  (user, callback) => getOrders(user.id, (error, orders) => {\n    if (error) return callback(error);\n    if (!orders.length) return callback(new Error("No orders"));\n    callback(null, user, orders);\n  }),\n  (user, orders, callback) => getOrderDetails(orders[0].id, (error, details) => {\n    if (error) return callback(error);\n    callback(null, user, orders, details);\n  }),\n  (user, orders, details, callback) => getShippingInfo(details.shippingId, (error, shipping) => {\n    if (error) return callback(error);\n    callback(null, { user, orders, details, shipping });\n  })\n], (error, result) => {\n  if (error) return console.log(error.message);\n  console.log(result.user.id, result.orders[0].id, result.details.shippingId, result.shipping.status);\n});',
                },
              ],
            },
            {
              label: "Stop before later tasks when a task fails",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const async = require("async");\nasync.waterfall([\n  callback => setTimeout(() => callback(null, "user"), 0),\n  (user, callback) => setTimeout(() => callback(new Error("Orders unavailable")), 0),\n  (orders, callback) => { console.log("Not reached"); callback(null, orders); }\n], (error, result) => {\n  if (error) return console.log(error.message);\n  console.log(result);\n});',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Timers & Event Loop",
      id: "timers-event-loop",
      intro:
        "Timer Functions → Event Loop. Run snippets independently. Short delays keep demonstrations quick; all intervals and recursive schedules stop. Node.js file examples specify their format, and React cleanup examples state their dependencies. Timing thresholds are not exact deadlines.",
      methods: [
        {
          name: "setTimeout()",
          explanation:
            "Schedules a callback once after a delay threshold. Use it to defer work or pass callback arguments for later execution.",
          note: "Delays are in milliseconds and are not exact execution deadlines. A zero delay still runs later; browsers return numeric IDs and Node.js returns Timeout objects.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout",
          examples: [
            {
              label: "Defer a one-time callback",
              language: "javascript",
              code: 'setTimeout(() => console.log("Timer fired"), 20);\nconsole.log("Scheduled"); // "Scheduled", then "Timer fired"',
            },
            {
              label: "Pass arguments to the callback",
              language: "javascript",
              code: 'setTimeout((name, age) => {\n  console.log(`${name} is ${age} years old`);\n}, 10, "Alice", 30);',
            },
          ],
        },
        {
          name: "setInterval()",
          explanation:
            "Schedules repeated callback execution using a delay threshold. Use it for simple periodic work with a defined stopping condition.",
          note: "Intervals can be delayed by other work and are not precise clocks. Async callbacks can start overlapping operations because the interval does not await their promises.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval",
          examples: [
            {
              label: "Stop after five iterations",
              language: "javascript",
              code: "let counter = 0;\nconst intervalId = setInterval(() => {\n  console.log(`Count: ${++counter}`);\n  if (counter >= 5) clearInterval(intervalId);\n}, 10);",
            },
            {
              label: "Pass an argument to repeated callbacks",
              language: "javascript",
              code: 'let count = 0;\nconst id = setInterval(label => {\n  console.log(label, ++count);\n  if (count === 2) clearInterval(id);\n}, 10, "Tick");',
            },
          ],
        },
        {
          name: "clearTimeout()",
          explanation:
            "Cancels a pending timeout through its returned handle. Use it when delayed work becomes unnecessary.",
          note: "Cancellation cannot undo a callback that has already started executing. Retain the matching handle rather than assuming its type.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Window/clearTimeout",
          examples: [
            {
              label: "Cancel before execution",
              language: "javascript",
              code: 'const id = setTimeout(() => console.log("Not reached"), 20);\nclearTimeout(id);\nsetTimeout(() => console.log("Canceled"), 30);',
            },
            {
              label: "Replace an obsolete timeout",
              language: "javascript",
              code: 'let id = setTimeout(() => console.log("Old result"), 20);\nclearTimeout(id);\nid = setTimeout(() => console.log("New result"), 10);',
            },
          ],
        },
        {
          name: "clearInterval()",
          explanation:
            "Stops future repetitions of an interval. Use it during cleanup or when a periodic task reaches its goal.",
          note: "Clearing an interval does not cancel work or promises already launched by a callback.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Window/clearInterval",
          examples: [
            {
              label: "Stop from inside the callback",
              language: "javascript",
              code: "let count = 0;\nconst id = setInterval(() => {\n  console.log(++count);\n  clearInterval(id);\n}, 10);",
            },
            {
              label: "Cancel before any repetition",
              language: "javascript",
              code: 'const id = setInterval(() => console.log("Not reached"), 10);\nclearInterval(id);\nsetTimeout(() => console.log("Stopped"), 20);',
            },
          ],
        },
        {
          name: "setImmediate()",
          explanation:
            "Schedules a Node.js callback for the event loop’s check phase after poll. Use it to yield between chunks of work.",
          note: "Node.js only. It is not a guarantee that every I/O operation has finished. Top-level ordering against setTimeout(0) is not guaranteed; scheduling both inside an I/O callback provides a useful ordering guarantee.",
          source:
            "https://nodejs.org/api/timers.html#setimmediatecallback-args",
          examples: [
            {
              label: "Yield after synchronous work",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'setImmediate(() => console.log("Immediate"));\nconsole.log("Synchronous");',
                },
              ],
            },
            {
              label: "Compare scheduling inside an actual I/O callback",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const fs = require("node:fs");\nfs.readFile(__filename, error => {\n  if (error) throw error;\n  setTimeout(() => console.log("Timeout"), 0);\n  setImmediate(() => console.log("Immediate"));\n});\n// "Immediate", then "Timeout"',
                },
              ],
            },
          ],
        },
        {
          name: "Recursive setTimeout()",
          explanation:
            "Schedules the next iteration from the current callback. Use it for changing delays or to wait for asynchronous work before scheduling again.",
          note: "The next delay starts when it is scheduled, so work duration affects the total cadence. Every demonstration has a finite stopping condition.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout",
          examples: [
            {
              label: "Increase the delay between iterations",
              language: "javascript",
              code: "function recursiveTimeout(count = 0) {\n  console.log(`Iteration: ${count}`);\n  if (count < 3) setTimeout(() => recursiveTimeout(count + 1), 10 * (count + 1));\n}\nrecursiveTimeout();",
            },
            {
              label: "Schedule only after async work completes",
              language: "javascript",
              code: 'let count = 0;\nasync function poll() {\n  await new Promise(resolve => setTimeout(resolve, 5));\n  console.log("Completed", ++count);\n  if (count < 2) setTimeout(poll, 10);\n}\npoll();',
            },
          ],
        },
        {
          name: "process.nextTick() versus setImmediate()",
          explanation:
            "Queues Node.js work to run before the event loop continues, rather than in the check phase. Use the distinction to understand callback ordering in existing Node.js code.",
          note: "process.nextTick has a separate queue and is not an event-loop phase. Recursive nextTick scheduling can starve I/O. Top-level CommonJS and ES modules differ relative to promise microtasks; these examples specify the file format.",
          source:
            "https://nodejs.org/en/learn/asynchronous-work/understanding-processnexttick",
          examples: [
            {
              label: "Observe top-level CommonJS order",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'setImmediate(() => console.log("Immediate"));\nprocess.nextTick(() => console.log("Next tick"));\nconsole.log("Synchronous");',
                },
              ],
            },
            {
              label: "Observe top-level ES module microtask order",
              files: [
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'process.nextTick(() => console.log("Next tick"));\nPromise.resolve().then(() => console.log("Promise"));\nconsole.log("Synchronous");\n// ES module evaluation already runs in a microtask.',
                },
              ],
            },
          ],
        },
        {
          name: "Component timer cleanup with useEffect()",
          explanation:
            "Creates a timer during a React Effect and cancels it from the returned cleanup function. Use cleanup when unmounting or replacing an Effect.",
          note: "These complete Node.js demos use actual React with a jsdom document. In a separate folder run npm install react@19 react-dom@19 jsdom@26, save main.cjs, and run node main.cjs. In browser React apps, use the same Effect body in your component. Strict Mode may run an extra development setup/cleanup cycle.",
          source: "https://react.dev/reference/react/useEffect",
          examples: [
            {
              label: "Cancel a timeout when the component unmounts",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const React = require("react");\nconst { createRoot } = require("react-dom/client");\nconst { flushSync } = require("react-dom");\nconst { JSDOM } = require("jsdom");\nconst dom = new JSDOM(\'<div id="root"></div>\');\nglobalThis.window = dom.window;\nglobalThis.document = dom.window.document;\nfunction Component() {\n  React.useEffect(() => {\n    const timer = setTimeout(() => console.log("Not reached"), 30);\n    return () => clearTimeout(timer);\n  }, []);\n  return null;\n}\nconst root = createRoot(document.querySelector("#root"));\nflushSync(() => root.render(React.createElement(Component)));\nflushSync(() => root.unmount());\nsetTimeout(() => { console.log("Unmounted safely"); dom.window.close(); }, 50);',
                },
              ],
            },
            {
              label: "Run a mounted component timer and then clean up",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const React = require("react");\nconst { createRoot } = require("react-dom/client");\nconst { flushSync } = require("react-dom");\nconst { JSDOM } = require("jsdom");\nconst dom = new JSDOM(\'<div id="root"></div>\');\nglobalThis.window = dom.window;\nglobalThis.document = dom.window.document;\nfunction Component() {\n  React.useEffect(() => {\n    const timer = setTimeout(() => console.log("Component timer"), 10);\n    return () => clearTimeout(timer);\n  }, []);\n  return null;\n}\nconst root = createRoot(document.querySelector("#root"));\nflushSync(() => root.render(React.createElement(Component)));\nsetTimeout(() => { root.unmount(); dom.window.close(); }, 30);',
                },
              ],
            },
          ],
        },
        {
          name: "Debouncing with timers",
          explanation:
            "Resets a timeout on each call so only the last call in a burst executes after a quiet period. Use it for delayed searches or input processing.",
          note: "This trailing-edge implementation preserves the last call’s arguments and receiver. It does not expose a cancellation API or immediately return the delayed result.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout",
          examples: [
            {
              label: "Keep only the last rapid call",
              language: "javascript",
              code: 'function debounce(func, delay) {\n  let timeoutId;\n  return function (...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => func.apply(this, args), delay);\n  };\n}\nconst search = debounce(query => console.log(query), 10);\nsearch("J"); search("Ja"); search("JavaScript");',
            },
            {
              label: "Preserve the calling object",
              language: "javascript",
              code: 'function debounce(func, delay) {\n  let timeoutId;\n  return function (...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => func.apply(this, args), delay);\n  };\n}\nconst input = { prefix: "Search:", run: debounce(function (query) {\n  console.log(this.prefix, query);\n}, 10) };\ninput.run("JavaScript");',
            },
          ],
        },
        {
          name: "Throttling with timers",
          explanation:
            "Runs the first call immediately and ignores additional calls during a timer-controlled window. Use it to limit repeated event handling.",
          note: "This is leading-edge only: dropped calls are not replayed. The guard is set before invoking user code to prevent synchronous re-entry from bypassing the limit; timer delays can extend the window.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout",
          examples: [
            {
              label: "Drop calls within the current window",
              language: "javascript",
              code: 'function throttle(func, limit) {\n  let inThrottle = false;\n  return function (...args) {\n    if (inThrottle) return;\n    inThrottle = true;\n    setTimeout(() => { inThrottle = false; }, limit);\n    return func.apply(this, args);\n  };\n}\nconst update = throttle(value => console.log(value), 20);\nupdate("first"); update("dropped");\nsetTimeout(() => update("later"), 40);',
            },
            {
              label: "Preserve this and arguments",
              language: "javascript",
              code: 'function throttle(func, limit) {\n  let inThrottle = false;\n  return function (...args) {\n    if (inThrottle) return;\n    inThrottle = true;\n    setTimeout(() => { inThrottle = false; }, limit);\n    return func.apply(this, args);\n  };\n}\nconst view = { name: "View", update: throttle(function (value) {\n  console.log(this.name, value);\n}, 10) };\nview.update(1); view.update(2);',
            },
          ],
        },
        {
          name: "Event loop execution order",
          explanation:
            "Runs synchronous code before promise reactions and timer tasks. Use small ordering examples to reason about deferred callbacks.",
          note: "Promises queue microtasks after settlement. Timers schedule tasks after their delay becomes eligible; these examples avoid comparing Node.js timers against setImmediate at top level.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model",
          examples: [
            {
              label: "Compare synchronous code, a promise, and a timer",
              language: "javascript",
              code: 'console.log("1");\nsetTimeout(() => console.log("2"), 0);\nPromise.resolve().then(() => console.log("3"));\nconsole.log("4"); // 1, 4, 3, 2',
            },
            {
              label: "Drain a chained promise before timer callbacks",
              language: "javascript",
              code: 'console.log("Start");\nsetTimeout(() => console.log("Timeout 1"), 0);\nPromise.resolve().then(() => {\n  console.log("Promise 1");\n  return Promise.resolve();\n}).then(() => console.log("Promise 2"));\nsetTimeout(() => console.log("Timeout 2"), 0);\nconsole.log("End");',
            },
          ],
        },
        {
          name: "Microtasks and queueMicrotask()",
          explanation:
            "Schedules a callback in the microtask queue drained before the next task. Use it to defer a small operation until the current stack finishes.",
          note: "Promise reactions and queueMicrotask share microtask ordering; Node.js nextTick uses a separate queue. Repeatedly scheduling microtasks can delay timers and rendering rather than yield to them.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask",
          examples: [
            {
              label: "Preserve microtask enqueue order",
              language: "javascript",
              code: 'Promise.resolve().then(() => console.log("Promise microtask"));\nqueueMicrotask(() => console.log("Queued microtask"));\nsetTimeout(() => console.log("Timer task"), 0);\nconsole.log("Synchronous");',
            },
            {
              label: "Compare Node.js queues in CommonJS",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'Promise.resolve().then(() => console.log("Promise"));\nqueueMicrotask(() => console.log("Microtask"));\nprocess.nextTick(() => console.log("Next tick"));\nconsole.log("Synchronous");',
                },
              ],
            },
          ],
        },
        {
          name: "Node.js event loop phases",
          explanation:
            "Organizes I/O and scheduled callbacks into host-managed phases. Use the phase model to distinguish poll I/O from check callbacks and eligible timers.",
          note: "Pending callbacks, internal idle/prepare, poll, check, close callbacks, and timers are distinct. Since Node.js 20/libuv 1.45, timers run after poll during iterations, with an initial compatibility timer pass. Promise and nextTick queues are not phases.",
          source:
            "https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick",
          examples: [
            {
              label: "Observe I/O, a microtask, and the check phase",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'require("node:fs").readFile(__filename, error => {\n  if (error) throw error;\n  console.log("Poll I/O callback");\n  queueMicrotask(() => console.log("Microtask after callback"));\n  setImmediate(() => console.log("Check phase"));\n});',
                },
              ],
            },
            {
              label: "Observe a close event without assuming every phase order",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const { PassThrough } = require("node:stream");\nconst stream = new PassThrough();\nstream.on("close", () => console.log("Closed"));\nstream.destroy();\nconsole.log("Destroy requested");\n// A stream close event alone does not identify a universal close-phase order.',
                },
              ],
            },
          ],
        },
        {
          name: "Blocking the event loop",
          explanation:
            "Keeps the current JavaScript thread busy until synchronous work finishes. Use this bounded demonstration to see why a timer cannot interrupt a running callback.",
          note: "The examples intentionally block for about 10 ms rather than the screenshot’s five seconds. Real CPU-heavy work should be chunked or moved to another worker; timer eligibility does not preempt JavaScript.",
          source:
            "https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop",
          examples: [
            {
              label: "Delay a ready timer with a busy loop",
              language: "javascript",
              code: 'setTimeout(() => console.log("Timer"), 0);\nconst start = Date.now();\nwhile (Date.now() - start < 10) {}\nconsole.log("Synchronous work done");',
            },
            {
              label: "Delay promise microtasks until the stack finishes",
              language: "javascript",
              code: 'Promise.resolve().then(() => console.log("Microtask"));\nconst start = Date.now();\nwhile (Date.now() - start < 10) {}\nconsole.log("Loop ended");',
            },
          ],
        },
        {
          name: "Chunk work with setImmediate()",
          explanation:
            "Processes a bounded amount of work per callback and schedules the remainder for later. Use it in Node.js to let the event loop service other work between chunks.",
          note: "The first chunk runs synchronously, and completion may be synchronous for small or empty inputs. Chunk size must reflect actual work cost; this pattern does not move work to another thread.",
          source:
            "https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop",
          examples: [
            {
              label: "Process several chunks",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'function processLargeArray(array, done) {\n  const chunkSize = 2;\n  let index = 0, total = 0;\n  function processChunk() {\n    const end = Math.min(index + chunkSize, array.length);\n    for (; index < end; index++) total += array[index];\n    if (index < array.length) setImmediate(processChunk);\n    else done(total);\n  }\n  processChunk();\n}\nprocessLargeArray([1, 2, 3, 4, 5], total => console.log("Total:", total));\nconsole.log("First chunk finished");',
                },
              ],
            },
            {
              label: "Handle an empty input",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'function processLargeArray(array, done) {\n  const chunkSize = 2;\n  let index = 0, total = 0;\n  function processChunk() {\n    const end = Math.min(index + chunkSize, array.length);\n    for (; index < end; index++) total += array[index];\n    if (index < array.length) setImmediate(processChunk);\n    else done(total);\n  }\n  processChunk();\n}\nprocessLargeArray([], total => console.log("Total:", total));',
                },
              ],
            },
          ],
        },
        {
          name: "Async iteration with explicit event-loop yields",
          explanation:
            "Awaits a host-scheduled callback between batches in an async generator. Use it when producing many values should periodically return control to the event loop.",
          note: "Node.js only because this example uses setImmediate. Merely marking a function async or awaiting an already-settled promise does not guarantee a yield to I/O; the consumer’s own work can still block.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of",
          examples: [
            {
              label: "Consume a finite yielding generator",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: "async function* generateNumbers(limit) {\n  for (let i = 0; i < limit; i++) {\n    if (i % 2 === 0) await new Promise(resolve => setImmediate(resolve));\n    yield i;\n  }\n}\n(async () => {\n  for await (const value of generateNumbers(5)) console.log(value);\n})();",
                },
              ],
            },
            {
              label: "Stop consumption early",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: "async function* generateNumbers(limit) {\n  for (let i = 0; i < limit; i++) {\n    if (i % 2 === 0) await new Promise(resolve => setImmediate(resolve));\n    yield i;\n  }\n}\n(async () => {\n  for await (const value of generateNumbers(10)) {\n    console.log(value);\n    if (value === 2) break;\n  }\n})();",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Promises",
      id: "promises",
      intro:
        "Creating Promises → Promise Combinators → bounded parallel tasks and batch processing. Run examples independently. Success and failure cases use deterministic inputs; fetch examples use self-contained data URLs. Node.js file sets state their format. Combinators coordinate work but do not automatically cancel losing or outstanding operations.",
      methods: [
        {
          name: "new Promise()",
          explanation:
            "Creates a promise whose executor can resolve a result or reject a failure. Use it to bridge a callback-based operation that does not already return a promise.",
          note: "The executor runs synchronously, while attached reactions run later as microtasks. Resolve adopts another promise or thenable; subsequent resolve/reject calls cannot replace the first resolution. Use deterministic inputs instead of random success for reproducible examples.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise",
          examples: [
            {
              label: "Resolve after an asynchronous operation",
              language: "javascript",
              code: 'const promise = new Promise(resolve => {\n  setTimeout(() => resolve("Data loaded"), 10);\n});\npromise.then(value => console.log(value));',
            },
            {
              label: "Reject through an explicit failure branch",
              language: "javascript",
              code: 'function load(success) {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      if (success) resolve("Success");\n      else reject(new Error("Failed"));\n    }, 10);\n  });\n}\nload(false).catch(error => console.log(error.message));',
            },
          ],
        },
        {
          name: "Promise.prototype.then()",
          explanation:
            "Registers fulfillment or rejection handlers and returns a new promise for the handler’s result. Return a value or promise to pass work to the next chain step.",
          note: "A thrown handler error rejects the returned promise. Returning a promise makes the chain wait for it; omitting return does not.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then",
          examples: [
            {
              label: "Transform a fulfilled value",
              language: "javascript",
              code: 'Promise.resolve("Success")\n  .then(result => { console.log("Success:", result); return result.toUpperCase(); })\n  .then(result => console.log("Uppercase:", result));',
            },
            {
              label: "Return asynchronous work to the chain",
              language: "javascript",
              code: "Promise.resolve(2)\n  .then(value => new Promise(resolve => setTimeout(() => resolve(value * 3), 10)))\n  .then(value => console.log(value)); // 6",
            },
          ],
        },
        {
          name: "Promise.prototype.catch()",
          explanation:
            "Registers a rejection handler and returns a new promise for its result. Use it to recover or propagate failures from earlier chain steps.",
          note: "Returning normally recovers fulfillment; throwing keeps the chain rejected. Attach a handler to every final chain that can reject.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch",
          examples: [
            {
              label: "Catch a thrown handler error",
              language: "javascript",
              code: 'Promise.resolve("value")\n  .then(() => { throw new Error("Processing failed"); })\n  .catch(error => console.log(error.message));',
            },
            {
              label: "Recover with a fallback",
              language: "javascript",
              code: 'Promise.reject(new Error("Unavailable"))\n  .catch(() => "fallback")\n  .then(value => console.log(value));',
            },
          ],
        },
        {
          name: "Promise.prototype.finally()",
          explanation:
            "Runs a settlement handler without receiving the result or rejection reason. Use it for cleanup shared by fulfilled and rejected paths.",
          note: "A normal return preserves the prior outcome. A thrown error or rejected returned promise replaces it; a returned promise delays downstream settlement. It runs on settlement, so a permanently pending promise never reaches finally.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally",
          examples: [
            {
              label: "Clean up a consumed promise",
              language: "javascript",
              code: 'Promise.resolve("value")\n  .then(value => console.log(value))\n  .catch(error => console.log(error.message))\n  .finally(() => console.log("Done"));',
            },
            {
              label: "Preserve rejection through cleanup",
              language: "javascript",
              code: 'Promise.reject(new Error("Failed"))\n  .finally(() => console.log("Cleanup"))\n  .catch(error => console.log(error.message));',
            },
          ],
        },
        {
          name: "Convert file callbacks to promises",
          explanation:
            "Wraps an error-first file-read callback in a promise. Use resolve for file content and reject for the original filesystem error.",
          note: "Node.js only: save each file set in its own folder and run node main.cjs. Existing promise APIs need no additional Promise constructor.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
          examples: [
            {
              label: "Read a real text file",
              files: [
                {
                  path: "file.txt",
                  language: "none",
                  code: "File content",
                },
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const fs = require("node:fs");\nfunction readFilePromise(path) {\n  return new Promise((resolve, reject) => {\n    fs.readFile(path, "utf8", (error, data) => {\n      if (error) reject(error);\n      else resolve(data);\n    });\n  });\n}\nreadFilePromise(require("node:path").join(__dirname, "file.txt"))\n  .then(content => console.log(content))\n  .catch(error => console.log(error.code));',
                },
              ],
            },
            {
              label: "Handle a missing file",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const fs = require("node:fs");\nfunction readFilePromise(path) {\n  return new Promise((resolve, reject) => {\n    fs.readFile(path, "utf8", (error, data) => {\n      if (error) reject(error);\n      else resolve(data);\n    });\n  });\n}\nconst path = require("node:path").join(__dirname, require("node:crypto").randomUUID() + ".txt");\nreadFilePromise(path).catch(error => console.log("Read error:", error.code));',
                },
              ],
            },
          ],
        },
        {
          name: "Generic promisify utility",
          explanation:
            "Converts an error-first callback function into a function returning a promise. Use it when adapting an API with a known callback convention.",
          note: "This custom utility preserves the calling receiver and resolves multiple success values as an array. It assumes one final error-first callback; repeated events or differently shaped callbacks require a different adapter. It is separate from Node.js util.promisify.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
          examples: [
            {
              label: "Adapt a callback and preserve this",
              language: "javascript",
              code: "function promisify(fn) {\n  return function (...args) {\n    return new Promise((resolve, reject) => {\n      fn.call(this, ...args, (error, ...results) => {\n        if (error) reject(error);\n        else resolve(results.length === 1 ? results[0] : results);\n      });\n    });\n  };\n}\nconst service = { base: 10, add(value, callback) {\n  setTimeout(() => callback(null, this.base + value), 10);\n} };\nservice.addAsync = promisify(service.add);\nservice.addAsync(5).then(value => console.log(value));",
            },
            {
              label: "Collect multiple results and propagate an error",
              language: "javascript",
              code: 'function promisify(fn) {\n  return function (...args) {\n    return new Promise((resolve, reject) => {\n      fn.call(this, ...args, (error, ...results) => {\n        if (error) reject(error);\n        else resolve(results.length === 1 ? results[0] : results);\n      });\n    });\n  };\n}\nfunction lookup(ok, callback) {\n  setTimeout(() => ok ? callback(null, "Alice", 30) : callback(new Error("Not found")), 10);\n}\nconst lookupAsync = promisify(lookup);\nlookupAsync(true).then(values => console.log(...values));\nlookupAsync(false).catch(error => console.log(error.message));',
            },
          ],
        },
        {
          name: "Node.js util.promisify()",
          explanation:
            "Uses Node.js’s built-in adapter for functions ending with a conventional error-first callback. Use it instead of a custom wrapper when the API fits that convention.",
          note: "Save main.cjs and run node main.cjs. The usual adapter resolves the first success value; APIs may define a custom promisifier. Bind methods that require a receiver.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
          examples: [
            {
              label: "Promisify an actual file read",
              files: [
                {
                  path: "file.txt",
                  language: "none",
                  code: "Hello from file",
                },
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const fs = require("node:fs");\nconst { promisify } = require("node:util");\nconst readFileAsync = promisify(fs.readFile);\nreadFileAsync(require("node:path").join(__dirname, "file.txt"), "utf8")\n  .then(content => console.log(content))\n  .catch(error => console.log(error.code));',
                },
              ],
            },
            {
              label: "Bind a receiver-dependent method",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const { promisify } = require("node:util");\nconst service = { value: 42, read(callback) { callback(null, this.value); } };\nconst readAsync = promisify(service.read.bind(service));\nreadAsync().then(value => console.log(value));',
                },
              ],
            },
          ],
        },
        {
          name: "Promise-based delay()",
          explanation:
            "Resolves a promise after a timer delay so an async workflow can await it. Use it to pause sequencing without blocking the JavaScript thread.",
          note: "A delay does not guarantee an exact execution time or cancel other operations. The examples use short delays and invoke their async functions.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
          examples: [
            {
              label: "Await a delay between steps",
              language: "javascript",
              code: 'function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }\nasync function slowOperation() {\n  console.log("Starting...");\n  await delay(10);\n  console.log("Done");\n}\nslowOperation().catch(error => console.log(error.message));',
            },
            {
              label: "Resolve a value after a delay",
              language: "javascript",
              code: 'function delay(ms, value) { return new Promise(resolve => setTimeout(resolve, ms, value)); }\ndelay(10, "ready").then(value => console.log(value));',
            },
          ],
        },
        {
          name: "Promise.resolve()",
          explanation:
            "Returns a promise resolved with a value or adopting a promise-like value. Use it to normalize values into promise chains.",
          note: "Passing a promise from the same constructor usually returns that promise itself. Its then handlers still run asynchronously.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve",
          examples: [
            {
              label: "Resolve an immediate value",
              language: "javascript",
              code: 'Promise.resolve("Immediate value").then(value => console.log(value));\nconsole.log("Synchronous");',
            },
            {
              label: "Adopt another promise",
              language: "javascript",
              code: "const original = Promise.resolve(42);\nconsole.log(Promise.resolve(original) === original);\nPromise.resolve(original).then(value => console.log(value));",
            },
          ],
        },
        {
          name: "Promise.reject()",
          explanation:
            "Creates a rejected promise with the supplied reason. Use it to represent an immediate failure in a promise-based API.",
          note: "Attach a rejection handler promptly to avoid an unhandled rejection. Prefer Error objects for useful diagnostics.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject",
          examples: [
            {
              label: "Handle an immediate rejection",
              language: "javascript",
              code: 'Promise.reject(new Error("Immediate error"))\n  .catch(error => console.log(error.message));',
            },
            {
              label: "Return a validation failure as a rejection",
              language: "javascript",
              code: 'function load(id) {\n  if (!id) return Promise.reject(new Error("Missing id"));\n  return Promise.resolve(id);\n}\nload(0).catch(error => console.log(error.message));',
            },
          ],
        },
        {
          name: "Wrap synchronous code in a promise",
          explanation:
            "Exposes synchronous work through a promise-returning interface. Use it for API consistency rather than expecting background execution.",
          note: "The Promise executor is synchronous, and a synchronous throw inside it becomes a rejection. Wrapping CPU-heavy work does not prevent blocking; throws in later timer callbacks need their own handling.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise",
          examples: [
            {
              label: "Resolve or reject a calculation",
              language: "javascript",
              code: 'function calculateAsync(x, y) {\n  return new Promise((resolve, reject) => {\n    const result = x / y;\n    if (!Number.isFinite(result)) reject(new Error("Invalid calculation"));\n    else resolve(result);\n  });\n}\ncalculateAsync(6, 2).then(value => console.log(value));\ncalculateAsync(1, 0).catch(error => console.log(error.message));',
            },
            {
              label: "Convert an executor throw into rejection",
              language: "javascript",
              code: 'const promise = new Promise(() => { throw new Error("Executor failed"); });\nconsole.log("Executor already ran");\npromise.catch(error => console.log(error.message));',
            },
          ],
        },
        {
          name: "Promise.all()",
          explanation:
            "Fulfills with input-ordered results after every input fulfills, or rejects when one input rejects. Use it for independent operations whose results are all required.",
          note: "Calling async operations starts them; the combinator coordinates their promises. Rejection does not cancel other work. Fetch rejects on network failure, not HTTP error statuses, so check response.ok and include body parsing in each operation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all",
          examples: [
            {
              label: "Fetch and parse three self-contained responses",
              language: "javascript",
              code: 'const urls = [\n  "data:application/json,%7B%22name%22%3A%22Alice%22%7D",\n  "data:application/json,%5B1%2C2%5D",\n  "data:application/json,%5B3%5D"\n];\nPromise.all(urls.map(async url => {\n  const response = await fetch(url);\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  return response.json();\n})).then(([user, posts, comments]) => console.log(user.name, posts.length, comments.length))\n  .catch(error => console.log(error.message));',
            },
            {
              label: "Reject when one required result fails",
              language: "javascript",
              code: 'Promise.all([Promise.resolve("ok"), Promise.reject(new Error("One request failed"))])\n  .catch(error => console.log(error.message));',
            },
          ],
        },
        {
          name: "Promise.race()",
          explanation:
            "Settles with the first input to fulfill or reject. Use it to select the first settled outcome or impose a separate waiting deadline.",
          note: "It does not cancel losing operations, and an empty input stays pending. A timeout race alone does not abort fetch; clear unused timers and use explicit cancellation if the operation supports it.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race",
          examples: [
            {
              label: "Use the first fulfillment",
              language: "javascript",
              code: 'const fast = new Promise(resolve => setTimeout(resolve, 5, "fast"));\nconst slow = new Promise(resolve => setTimeout(resolve, 15, "slow"));\nPromise.race([slow, fast]).then(value => console.log(value));',
            },
            {
              label: "Handle a rejection that settles first",
              language: "javascript",
              code: 'const failed = Promise.reject(new Error("Failed first"));\nconst later = new Promise(resolve => setTimeout(resolve, 10, "later"));\nPromise.race([later, failed]).catch(error => console.log(error.message));',
            },
            {
              label: "Clear a deadline timer after a self-contained fetch",
              language: "javascript",
              code: 'async function load() {\n  let timeoutId;\n  const timeout = new Promise((_, reject) => {\n    timeoutId = setTimeout(() => reject(new Error("Timeout")), 1000);\n  });\n  try {\n    const request = fetch("data:application/json,%7B%22ok%22%3Atrue%7D").then(response => {\n      if (!response.ok) throw new Error(`HTTP ${response.status}`);\n      return response.json();\n    });\n    const data = await Promise.race([request, timeout]);\n    console.log(data.ok);\n  } finally { clearTimeout(timeoutId); }\n}\nload().catch(error => console.log(error.message));',
            },
          ],
        },
        {
          name: "Promise.allSettled()",
          explanation:
            "Waits for all inputs and reports a status plus a value or reason for each. Use it when partial success is useful.",
          note: "Results retain input order. Branch on status instead of value || reason, which incorrectly treats valid falsy values as absent.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled",
          examples: [
            {
              label: "Report success and failure explicitly",
              language: "javascript",
              code: 'Promise.allSettled([Promise.resolve(0), Promise.reject(new Error("Failed"))])\n  .then(results => {\n    for (const result of results) {\n      if (result.status === "fulfilled") console.log(result.status, result.value);\n      else console.log(result.status, result.reason.message);\n    }\n  });',
            },
            {
              label: "Keep every falsy fulfilled value",
              language: "javascript",
              code: 'Promise.allSettled([Promise.resolve(false), Promise.resolve("")])\n  .then(results => console.log(...results.map(result => result.value)));',
            },
          ],
        },
        {
          name: "Promise.any()",
          explanation:
            "Fulfills with the first fulfilled input and ignores earlier rejections while waiting. Use it when any successful source is sufficient.",
          note: "If all inputs reject, including an empty input, it rejects with AggregateError. Its errors list follows input order; losing operations continue unless explicitly canceled.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any",
          examples: [
            {
              label: "Accept a successful source after an earlier failure",
              language: "javascript",
              code: 'Promise.any([\n  Promise.reject(new Error("Mirror failed")),\n  new Promise(resolve => setTimeout(resolve, 10, "File loaded"))\n]).then(value => console.log(value)).catch(error => console.log(error.name));',
            },
            {
              label: "Inspect total failure",
              language: "javascript",
              code: 'Promise.any([Promise.reject(new Error("First failed")), Promise.reject(new Error("Second failed"))])\n  .catch(error => console.log(error.name, ...error.errors.map(item => item.message)));',
            },
          ],
        },
        {
          name: "Parallel tasks with a concurrency limit",
          explanation:
            "Runs a bounded number of task functions while preserving input order in the returned results. Use it to limit active requests without creating every request upfront.",
          note: "This custom worker-pool helper validates its limit and stops launching tasks after an observed error. Already-started tasks continue; Promise.all observes every worker rejection. Pass functions that start work, not already-started promises.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
          examples: [
            {
              label: "Verify the limit and preserve result order",
              language: "javascript",
              code: 'async function parallelLimit(tasks, limit) {\n  if (!Number.isInteger(limit) || limit < 1) throw new RangeError("limit must be a positive integer");\n  const results = new Array(tasks.length);\n  let next = 0, stopped = false;\n  async function worker() {\n    while (!stopped && next < tasks.length) {\n      const index = next++;\n      try { results[index] = await tasks[index](); }\n      catch (error) { stopped = true; throw error; }\n    }\n  }\n  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, () => worker()));\n  return results;\n}\nlet active = 0, maximum = 0;\nconst tasks = [30, 10, 5, 5].map((ms, index) => async () => {\n  maximum = Math.max(maximum, ++active);\n  await new Promise(resolve => setTimeout(resolve, ms));\n  active--;\n  return index;\n});\nparallelLimit(tasks, 2).then(results => console.log(...results, maximum))\n  .catch(error => console.log(error.message)); // 0, 1, 2, 3, 2',
            },
            {
              label: "Reject a task and stop scheduling further tasks",
              language: "javascript",
              code: 'async function parallelLimit(tasks, limit) {\n  if (!Number.isInteger(limit) || limit < 1) throw new RangeError("limit must be a positive integer");\n  const results = new Array(tasks.length);\n  let next = 0, stopped = false;\n  async function worker() {\n    while (!stopped && next < tasks.length) {\n      const index = next++;\n      try { results[index] = await tasks[index](); }\n      catch (error) { stopped = true; throw error; }\n    }\n  }\n  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, () => worker()));\n  return results;\n}\nlet started = 0;\nconst tasks = [\n  () => { started++; throw new Error("Task failed"); },\n  () => { started++; return "Not started"; }\n];\nparallelLimit(tasks, 1).catch(error => console.log(error.message, started));',
            },
            {
              label: "Validate the limit and handle no tasks",
              language: "javascript",
              code: 'async function parallelLimit(tasks, limit) {\n  if (!Number.isInteger(limit) || limit < 1) throw new RangeError("limit must be a positive integer");\n  const results = new Array(tasks.length);\n  let next = 0, stopped = false;\n  async function worker() {\n    while (!stopped && next < tasks.length) {\n      const index = next++;\n      try { results[index] = await tasks[index](); }\n      catch (error) { stopped = true; throw error; }\n    }\n  }\n  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, () => worker()));\n  return results;\n}\n(async () => {\n  console.log((await parallelLimit([], 2)).length);\n  try { await parallelLimit([], 0); } catch (error) { console.log(error.name); }\n})();',
            },
          ],
        },
        {
          name: "Batch processing with Promise.all()",
          explanation:
            "Processes one fixed-size batch at a time while running each batch’s items concurrently. Use it when work should advance in groups rather than continuously refill a worker pool.",
          note: "This custom helper validates batch size and preserves input order. A failure prevents later batches from starting but does not cancel other work in the current batch. Starting processors in promise reactions converts synchronous throws to rejections.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
          examples: [
            {
              label: "Process complete and partial batches",
              language: "javascript",
              code: 'async function batchProcess(items, batchSize, processor) {\n  if (!Number.isInteger(batchSize) || batchSize < 1) throw new RangeError("batchSize must be a positive integer");\n  const results = [];\n  for (let i = 0; i < items.length; i += batchSize) {\n    const batch = items.slice(i, i + batchSize);\n    const batchResults = await Promise.all(batch.map(item => Promise.resolve().then(() => processor(item))));\n    results.push(...batchResults);\n  }\n  return results;\n}\nbatchProcess([1, 2, 3, 4, 5], 2, async item => {\n  await new Promise(resolve => setTimeout(resolve, 5));\n  return item * 2;\n}).then(results => console.log(...results));',
            },
            {
              label: "Stop before the next batch on failure",
              language: "javascript",
              code: 'async function batchProcess(items, batchSize, processor) {\n  if (!Number.isInteger(batchSize) || batchSize < 1) throw new RangeError("batchSize must be a positive integer");\n  const results = [];\n  for (let i = 0; i < items.length; i += batchSize) {\n    const batch = items.slice(i, i + batchSize);\n    const batchResults = await Promise.all(batch.map(item => Promise.resolve().then(() => processor(item))));\n    results.push(...batchResults);\n  }\n  return results;\n}\nconst started = [];\nbatchProcess([1, 2, 3, 4], 2, item => {\n  started.push(item);\n  if (item === 2) throw new Error("Batch failed");\n  return item;\n}).catch(error => console.log(error.message, ...started));',
            },
          ],
        },
      ],
    },
    {
      name: "Async/Await",
      id: "async-await",
      intro:
        "Basic Async/Await → Advanced Async Patterns → explicit resource management and Promise.withResolvers. Run examples independently. Fetch uses self-contained data URLs; databases, locks, and transactions are labeled simulations. Native using/await using examples require a supporting runtime and were tested with Node.js 26; older runtimes may reject the syntax before execution.",
      methods: [
        {
          name: "Async function declarations",
          explanation:
            "Declares a function that returns a promise and can await asynchronous results. Use it to express an asynchronous workflow as ordered statements.",
          note: "await pauses the async function, not the whole thread. The examples fetch self-contained data URLs and check HTTP status before parsing.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
          examples: [
            {
              label: "Fetch, parse, and return data",
              language: "javascript",
              code: 'async function fetchUser(id) {\n  const response = await fetch("data:application/json,%7B%22id%22%3A123%2C%22name%22%3A%22John%22%7D");\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  const user = await response.json();\n  return { ...user, id };\n}\nfetchUser(123).then(user => console.log(user.id, user.name)).catch(error => console.log(error.message));',
            },
            {
              label: "Return a value through a promise",
              language: "javascript",
              code: 'async function getData() { return "ready"; }\nconst result = getData();\nconsole.log(result instanceof Promise);\nresult.then(value => console.log(value));',
            },
          ],
        },
        {
          name: "Async function expressions",
          explanation:
            "Assigns an async function expression to a variable. Use it when a function is defined as a value rather than a declaration.",
          note: "The database object here is a defined in-memory simulation. A thrown error becomes a rejected promise.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function",
          examples: [
            {
              label: "Await a simulated product lookup",
              language: "javascript",
              code: 'const db = { products: { async findById(id) { return { id, name: "Book" }; } } };\nconst getProduct = async function (id) { return await db.products.findById(id); };\ngetProduct(7).then(product => console.log(product.id, product.name));',
            },
            {
              label: "Propagate a failure to the caller",
              language: "javascript",
              code: 'const getProduct = async function () { throw new Error("Product unavailable"); };\ngetProduct().catch(error => console.log(error.message));',
            },
          ],
        },
        {
          name: "Async arrow functions",
          explanation:
            "Creates a concise async function with lexical this. Use it for short promise-returning callbacks or operations.",
          note: "An async arrow returns a promise even when its expression produces an immediate value.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions",
          examples: [
            {
              label: "Await a simulated delete operation",
              language: "javascript",
              code: 'const db = { items: { async delete(id) { return id; } } };\nconst deleteItem = async id => {\n  await db.items.delete(id);\n  console.log("Deleted", id);\n};\ndeleteItem(7).catch(error => console.log(error.message));',
            },
            {
              label: "Return a transformed value",
              language: "javascript",
              code: "const double = async value => value * 2;\ndouble(3).then(value => console.log(value));",
            },
          ],
        },
        {
          name: "Async class methods",
          explanation:
            "Defines promise-returning methods that can await instance operations. Use them to sequence service responsibilities while retaining the instance receiver.",
          note: "The services are explicit simulations. Creating a user and sending email are separate operations; a later email failure does not automatically undo a completed database write.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
          examples: [
            {
              label: "Create a user and await the welcome email",
              language: "javascript",
              code: 'const db = { users: { async create(data) { return { id: 1, ...data }; } } };\nconst emailService = { async send(message) { console.log("Sent:", message.to, message.subject); } };\nclass UserService {\n  async createUser(data) {\n    const user = await db.users.create(data);\n    await this.sendWelcomeEmail(user);\n    return user;\n  }\n  async sendWelcomeEmail(user) { await emailService.send({ to: user.email, subject: "Welcome!" }); }\n}\nnew UserService().createUser({ email: "john@example.com" })\n  .then(user => console.log(user.id));',
            },
            {
              label: "Propagate a failed service method",
              language: "javascript",
              code: 'class UserService {\n  async createUser() { await this.sendWelcomeEmail(); }\n  async sendWelcomeEmail() { throw new Error("Email failed"); }\n}\nnew UserService().createUser().catch(error => console.log(error.message));',
            },
          ],
        },
        {
          name: "Async try/catch/finally",
          explanation:
            "Handles rejected awaited operations and runs cleanup on settlement. Use it to report, recover from, or rethrow request and parsing failures.",
          note: "Returning await inside try keeps response-body rejection within this catch/finally scope. HTTP failures require an explicit response.ok check; finally can mask a prior result if it throws or returns.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
          examples: [
            {
              label: "Complete a successful fetch",
              language: "javascript",
              code: 'async function robustFetch(url) {\n  try {\n    const response = await fetch(url);\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    return await response.json();\n  } catch (error) {\n    console.log("Fetch failed:", error.name);\n    throw error;\n  } finally { console.log("Fetch attempt completed"); }\n}\nrobustFetch("data:application/json,%7B%22id%22%3A123%2C%22name%22%3A%22John%22%7D").then(user => console.log(user.name)).catch(error => console.log(error.name));',
            },
            {
              label: "Catch and rethrow malformed JSON",
              language: "javascript",
              code: 'async function robustFetch(url) {\n  try {\n    const response = await fetch(url);\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    return await response.json();\n  } catch (error) {\n    console.log("Fetch failed:", error.name);\n    throw error;\n  } finally { console.log("Fetch attempt completed"); }\n}\nrobustFetch("data:application/json,invalid").catch(error => console.log("Caller:", error.name));',
            },
          ],
        },
        {
          name: "Sequential versus parallel await",
          explanation:
            "Starts dependent work sequentially or starts independent operations together and awaits their combined result. Use Promise.all when operations can overlap safely.",
          note: "Sequential waits add their durations; independent operations can overlap, but timing is not an exact guarantee. Promise.all does not cancel outstanding work on rejection.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
          examples: [
            {
              label: "Start each operation after the previous result",
              language: "javascript",
              code: 'function work(value) {\n  console.log("Start", value);\n  return new Promise(resolve => setTimeout(() => { console.log("End", value); resolve(value); }, 10));\n}\n(async () => {\n  const a = await work("A");\n  const b = await work("B");\n  console.log(a, b);\n})().catch(error => console.log(error.message));',
            },
            {
              label: "Start independent operations together",
              language: "javascript",
              code: 'function work(value) {\n  console.log("Start", value);\n  return new Promise(resolve => setTimeout(() => { console.log("End", value); resolve(value); }, 10));\n}\n(async () => {\n  const [a, b] = await Promise.all([work("A"), work("B")]);\n  console.log(a, b);\n})().catch(error => console.log(error.message));',
            },
          ],
        },
        {
          name: "Start operations now and await results later",
          explanation:
            "Stores promises for independent operations and awaits them as a group after starting them. Use it to overlap work without losing rejection handling.",
          note: "Attach combined handling immediately. Awaiting independently started promises one by one can leave a later promise temporarily unhandled if it rejects before the earlier one settles.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
          examples: [
            {
              label: "Start requests before joining their results",
              language: "javascript",
              code: 'async function fetchUser() { return { name: "John" }; }\nasync function fetchPosts() { return [1, 2]; }\nasync function fetchComments() { return [3]; }\nasync function optimizedParallel() {\n  const userPromise = fetchUser();\n  const postsPromise = fetchPosts();\n  const commentsPromise = fetchComments();\n  const [user, posts, comments] = await Promise.all([userPromise, postsPromise, commentsPromise]);\n  return { user, posts, comments };\n}\noptimizedParallel().then(({ user, posts, comments }) => console.log(user.name, posts.length, comments.length));',
            },
            {
              label:
                "Observe an early failure while another operation is pending",
              language: "javascript",
              code: '(async () => {\n  const slow = new Promise(resolve => setTimeout(resolve, 10, "slow"));\n  const failed = Promise.reject(new Error("Failed early"));\n  try { await Promise.all([slow, failed]); } catch (error) { console.log(error.message); }\n})();',
            },
          ],
        },
        {
          name: "Conditional async operations and caching",
          explanation:
            "Skips a fetch when a cache lookup is allowed and a value exists. Use it to choose between cached data and fresh asynchronous work.",
          note: "Check cache membership instead of truthiness so valid values such as zero are retained. Cache policy, expiry, and invalidation remain application decisions.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
          examples: [
            {
              label: "Reuse a valid falsy cached value",
              language: "javascript",
              code: 'const cache = new Map();\nasync function conditionalFetch(useCache) {\n  if (useCache && cache.has("data")) return cache.get("data");\n  const response = await fetch("data:application/json,0");\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  const fresh = await response.json();\n  cache.set("data", fresh);\n  return fresh;\n}\ncache.set("data", false);\nconditionalFetch(true).then(value => console.log(value));',
            },
            {
              label: "Bypass cached data and store parsed fresh data",
              language: "javascript",
              code: 'const cache = new Map();\nasync function conditionalFetch(useCache) {\n  if (useCache && cache.has("data")) return cache.get("data");\n  const response = await fetch("data:application/json,0");\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  const fresh = await response.json();\n  cache.set("data", fresh);\n  return fresh;\n}\ncache.set("data", false);\nconditionalFetch(false).then(value => console.log(value, cache.get("data")));',
            },
          ],
        },
        {
          name: "Top-level await in modules",
          explanation:
            "Awaits initialization directly in an ES module. Use it when a module must finish asynchronous setup before dependent modules proceed.",
          note: "Save main.mjs and run node main.mjs. Top-level await is ES2022 module syntax and is not available at the top level of a classic script or CommonJS file.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await",
          examples: [
            {
              label: "Load a self-contained configuration",
              files: [
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'const response = await fetch("data:application/json,%7B%22theme%22%3A%22dark%22%7D");\nif (!response.ok) throw new Error(`HTTP ${response.status}`);\nconst config = await response.json();\nconsole.log("Config loaded:", config.theme);',
                },
              ],
            },
            {
              label: "Handle initialization failure at module scope",
              files: [
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'try {\n  const response = await fetch("data:application/json,invalid");\n  await response.json();\n} catch (error) { console.log(error.name); }',
                },
              ],
            },
          ],
        },
        {
          name: "Async iterators and paginated generators",
          explanation:
            "Produces asynchronous page results that consumers request through for await...of. Use an async generator to fetch pages lazily instead of loading every page upfront.",
          note: "The finite data-URL page list stands in for numbered HTTP endpoints. Each page is parsed and status-checked; stopping the consumer prevents future pages from being requested.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function*",
          examples: [
            {
              label: "Process every item in each page",
              language: "javascript",
              code: 'async function* paginatedFetch(urls) {\n  for (const url of urls) {\n    const response = await fetch(url);\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    const data = await response.json();\n    yield data.items;\n    if (!data.hasNext) return;\n  }\n}\nconst pages = [\n  "data:application/json,%7B%22items%22%3A%5B1%2C2%5D%2C%22hasNext%22%3Atrue%7D",\n  "data:application/json,%7B%22items%22%3A%5B3%5D%2C%22hasNext%22%3Afalse%7D"\n];\n(async () => {\n  for await (const items of paginatedFetch(pages)) {\n    for (const item of items) console.log("Processing:", item);\n  }\n})().catch(error => console.log(error.message));',
            },
            {
              label: "Stop after the first page",
              language: "javascript",
              code: 'async function* paginatedFetch(urls) {\n  for (const url of urls) {\n    const response = await fetch(url);\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    const data = await response.json();\n    yield data.items;\n    if (!data.hasNext) return;\n  }\n}\nconst pages = [\n  "data:application/json,%7B%22items%22%3A%5B1%2C2%5D%2C%22hasNext%22%3Atrue%7D",\n  "data:application/json,%7B%22items%22%3A%5B3%5D%2C%22hasNext%22%3Afalse%7D"\n];\n(async () => {\n  for await (const items of paginatedFetch(pages)) { console.log(...items); break; }\n})().catch(error => console.log(error.message));',
            },
          ],
        },
        {
          name: "Retry an async operation",
          explanation:
            "Retries a failed promise-returning operation after a delay. Use it for transient failures where repeating the operation is appropriate.",
          note: "retries counts additional attempts: retries = 3 allows four attempts total. This minimal helper retries every error; production policies should select retryable failures and avoid repeating non-idempotent effects unintentionally.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
          examples: [
            {
              label: "Succeed on a later attempt",
              language: "javascript",
              code: 'async function retry(fn, retries = 3, delayMs = 10) {\n  if (!Number.isInteger(retries) || retries < 0) throw new RangeError("Invalid retries");\n  for (let attempt = 0; ; attempt++) {\n    try { return await fn(); }\n    catch (error) {\n      if (attempt === retries) throw error;\n      await new Promise(resolve => setTimeout(resolve, delayMs));\n    }\n  }\n}\nlet attempts = 0;\nretry(() => { if (++attempts < 3) throw new Error("Temporary"); return "ok"; }, 2)\n  .then(value => console.log(value, attempts));',
            },
            {
              label: "Propagate the final failure",
              language: "javascript",
              code: 'async function retry(fn, retries = 3, delayMs = 10) {\n  if (!Number.isInteger(retries) || retries < 0) throw new RangeError("Invalid retries");\n  for (let attempt = 0; ; attempt++) {\n    try { return await fn(); }\n    catch (error) {\n      if (attempt === retries) throw error;\n      await new Promise(resolve => setTimeout(resolve, delayMs));\n    }\n  }\n}\nlet attempts = 0;\nretry(() => { attempts++; throw new Error("Still failing"); }, 1)\n  .catch(error => console.log(error.message, attempts));',
            },
          ],
        },
        {
          name: "Retry with exponential backoff",
          explanation:
            "Increases the wait after each failure before retrying. Use backoff to reduce repeated pressure on a temporarily failing service.",
          note: "Retries are additional attempts. For HTTP requests, explicitly reject unacceptable statuses because fetch does not reject on HTTP errors. Real service policies often also cap attempts and add jitter.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
          examples: [
            {
              label: "Increase waits before recovery",
              language: "javascript",
              code: 'async function retryWithBackoff(fn, retries = 3, delayMs = 10, factor = 2) {\n  if (!Number.isInteger(retries) || retries < 0 || !Number.isFinite(delayMs) || delayMs < 0 || !Number.isFinite(factor) || factor < 1) throw new RangeError("Invalid retry options");\n  let wait = delayMs;\n  for (let attempt = 0; ; attempt++) {\n    try { return await fn(); }\n    catch (error) {\n      if (attempt === retries) throw error;\n      console.log(`Retry in ${wait}ms`);\n      await new Promise(resolve => setTimeout(resolve, wait));\n      wait = Math.min(wait * factor, 2147483647);\n    }\n  }\n}\nlet attempts = 0;\nretryWithBackoff(() => { if (++attempts < 3) throw new Error("Temporary"); return "ok"; }, 2, 5, 2)\n  .then(value => console.log(value, attempts));',
            },
            {
              label: "Do not retry when no retries remain",
              language: "javascript",
              code: 'async function retryWithBackoff(fn, retries = 3, delayMs = 10, factor = 2) {\n  if (!Number.isInteger(retries) || retries < 0 || !Number.isFinite(delayMs) || delayMs < 0 || !Number.isFinite(factor) || factor < 1) throw new RangeError("Invalid retry options");\n  let wait = delayMs;\n  for (let attempt = 0; ; attempt++) {\n    try { return await fn(); }\n    catch (error) {\n      if (attempt === retries) throw error;\n      console.log(`Retry in ${wait}ms`);\n      await new Promise(resolve => setTimeout(resolve, wait));\n      wait = Math.min(wait * factor, 2147483647);\n    }\n  }\n}\nretryWithBackoff(() => { throw new Error("Failed"); }, 0)\n  .catch(error => console.log(error.message));',
            },
          ],
        },
        {
          name: "AsyncQueue with a concurrency limit",
          explanation:
            "Queues task functions and starts them while capacity is available. Use it for a stream of work that should share a fixed concurrency cap.",
          note: "Each add returns a promise that the caller must handle. Synchronous throws become rejections and capacity is released on either outcome; this implementation continues queued work after a task fails.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
          examples: [
            {
              label: "Limit active tasks and retain submitted result order",
              language: "javascript",
              code: 'class AsyncQueue {\n  constructor(concurrency = 2) {\n    if (!Number.isInteger(concurrency) || concurrency < 1) throw new RangeError("Invalid concurrency");\n    this.concurrency = concurrency; this.running = 0; this.queue = [];\n  }\n  add(task) {\n    return new Promise((resolve, reject) => {\n      this.queue.push({ task, resolve, reject });\n      this.process();\n    });\n  }\n  process() {\n    while (this.running < this.concurrency && this.queue.length) {\n      const { task, resolve, reject } = this.queue.shift();\n      this.running++;\n      Promise.resolve().then(task).then(\n        value => { this.running--; resolve(value); this.process(); },\n        error => { this.running--; reject(error); this.process(); }\n      );\n    }\n  }\n}\nlet active = 0, maximum = 0;\nconst queue = new AsyncQueue(2);\nconst pending = [0, 1, 2, 3].map(i => queue.add(async () => {\n  maximum = Math.max(maximum, ++active);\n  await new Promise(resolve => setTimeout(resolve, 10));\n  active--; return i;\n}));\nPromise.all(pending).then(values => console.log(...values, maximum, queue.running));',
            },
            {
              label: "Continue after a rejected task",
              language: "javascript",
              code: 'class AsyncQueue {\n  constructor(concurrency = 2) {\n    if (!Number.isInteger(concurrency) || concurrency < 1) throw new RangeError("Invalid concurrency");\n    this.concurrency = concurrency; this.running = 0; this.queue = [];\n  }\n  add(task) {\n    return new Promise((resolve, reject) => {\n      this.queue.push({ task, resolve, reject });\n      this.process();\n    });\n  }\n  process() {\n    while (this.running < this.concurrency && this.queue.length) {\n      const { task, resolve, reject } = this.queue.shift();\n      this.running++;\n      Promise.resolve().then(task).then(\n        value => { this.running--; resolve(value); this.process(); },\n        error => { this.running--; reject(error); this.process(); }\n      );\n    }\n  }\n}\nconst queue = new AsyncQueue(1);\nconst first = queue.add(() => { throw new Error("Task failed"); });\nconst second = queue.add(() => "next");\nPromise.allSettled([first, second]).then(([a, b]) => console.log(a.reason.message, b.value, queue.running));',
            },
            {
              label: "Reject invalid concurrency",
              language: "javascript",
              code: 'class AsyncQueue {\n  constructor(concurrency = 2) {\n    if (!Number.isInteger(concurrency) || concurrency < 1) throw new RangeError("Invalid concurrency");\n    this.concurrency = concurrency; this.running = 0; this.queue = [];\n  }\n  add(task) {\n    return new Promise((resolve, reject) => {\n      this.queue.push({ task, resolve, reject });\n      this.process();\n    });\n  }\n  process() {\n    while (this.running < this.concurrency && this.queue.length) {\n      const { task, resolve, reject } = this.queue.shift();\n      this.running++;\n      Promise.resolve().then(task).then(\n        value => { this.running--; resolve(value); this.process(); },\n        error => { this.running--; reject(error); this.process(); }\n      );\n    }\n  }\n}\ntry { new AsyncQueue(0); } catch (error) { console.log(error.name); }',
            },
          ],
        },
        {
          name: "Memoize async functions",
          explanation:
            "Caches pending and fulfilled results so repeated calls share one operation. Use it for stable lookups with reusable results.",
          note: "This custom helper separates receivers, preserves this, and evicts failures. Keys use JSON.stringify: restrict arguments to a documented JSON-safe domain without ambiguous values or cycles. The cache has no expiry and retains receivers/results; it is not suitable for unbounded keys.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
          examples: [
            {
              label: "Share an in-flight request",
              language: "javascript",
              code: "function memoizeAsync(fn) {\n  const caches = new Map();\n  return function (...args) {\n    if (!caches.has(this)) caches.set(this, new Map());\n    const cache = caches.get(this), key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const promise = Promise.resolve().then(() => fn.apply(this, args)).catch(error => {\n      cache.delete(key); throw error;\n    });\n    cache.set(key, promise);\n    return promise;\n  };\n}\nlet calls = 0;\nconst fetchUserMemo = memoizeAsync(async id => { calls++; await new Promise(r => setTimeout(r, 5)); return { id }; });\nconst first = fetchUserMemo(123), second = fetchUserMemo(123);\nconsole.log(first === second);\nPromise.all([first, second]).then(([a, b]) => console.log(a.id, a === b, calls));",
            },
            {
              label: "Evict a rejected result and retry",
              language: "javascript",
              code: 'function memoizeAsync(fn) {\n  const caches = new Map();\n  return function (...args) {\n    if (!caches.has(this)) caches.set(this, new Map());\n    const cache = caches.get(this), key = JSON.stringify(args);\n    if (cache.has(key)) return cache.get(key);\n    const promise = Promise.resolve().then(() => fn.apply(this, args)).catch(error => {\n      cache.delete(key); throw error;\n    });\n    cache.set(key, promise);\n    return promise;\n  };\n}\nlet calls = 0;\nconst load = memoizeAsync(() => { if (++calls === 1) throw new Error("Temporary"); return "ok"; });\n(async () => {\n  try { await load(); } catch (error) { console.log(error.message); }\n  console.log(await load(), calls);\n})();',
            },
          ],
        },
        {
          name: "Timeout wrappers",
          explanation:
            "Rejects a waiting promise if a deadline settles first. Use it to bound how long a caller waits for an operation.",
          note: "The timer is cleared after either outcome. A race does not cancel its losing operation; use an operation-specific cancellation mechanism when actual cancellation is required.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
          examples: [
            {
              label: "Return before the deadline",
              language: "javascript",
              code: 'function withTimeout(promise, ms) {\n  let timer;\n  const deadline = new Promise((_, reject) => { timer = setTimeout(() => reject(new Error("Timeout")), ms); });\n  return Promise.race([promise, deadline]).finally(() => clearTimeout(timer));\n}\nwithTimeout(Promise.resolve("ready"), 1000).then(value => console.log(value)).catch(error => console.log(error.message));',
            },
            {
              label: "Observe timeout without pretending the work stopped",
              language: "javascript",
              code: 'function withTimeout(promise, ms) {\n  let timer;\n  const deadline = new Promise((_, reject) => { timer = setTimeout(() => reject(new Error("Timeout")), ms); });\n  return Promise.race([promise, deadline]).finally(() => clearTimeout(timer));\n}\nconst work = new Promise(resolve => setTimeout(() => { console.log("Work still completed"); resolve("late"); }, 30));\nwithTimeout(work, 5).catch(error => console.log(error.message));',
            },
          ],
        },
        {
          name: "using and Symbol.dispose",
          explanation:
            "Binds a synchronous disposable resource to a lexical scope and invokes its disposer when that scope exits. Use it to release files or other synchronous handles on success or failure.",
          note: "Save main.mjs and run it with a runtime supporting native explicit resource management (tested with Node.js 26). This newer syntax is not supported by every browser or older Node.js runtime; it cannot be enabled by merely defining the disposal symbols. Disposal is reverse declaration order. A synchronous disposer must finish synchronously; using does not await a returned promise.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/using",
          examples: [
            {
              label: "Close an actual file descriptor at scope exit",
              files: [
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'import fs from "node:fs";\nimport { fileURLToPath } from "node:url";\nclass FileHandle {\n  constructor(fd) { this.fd = fd; }\n  read() { return fs.readSync(this.fd, Buffer.alloc(16), 0, 16, 0); }\n  [Symbol.dispose]() { fs.closeSync(this.fd); console.log("Closed"); }\n}\nfunction readChunk(path) {\n  using file = new FileHandle(fs.openSync(path, "r"));\n  return file.read();\n}\nconsole.log(readChunk(fileURLToPath(import.meta.url)) > 0);',
                },
              ],
            },
            {
              label: "Dispose even when the body throws",
              files: [
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'class Resource { [Symbol.dispose]() { console.log("Disposed"); } }\nfunction run() { using resource = new Resource(); throw new Error("Read failed"); }\ntry { run(); } catch (error) { console.log(error.message); }',
                },
              ],
            },
          ],
        },
        {
          name: "await using and Symbol.asyncDispose",
          explanation:
            "Awaits asynchronous resource disposal when a scope exits. Use it for connections or locks whose release completes asynchronously.",
          note: "Save main.mjs and run it with a runtime supporting native explicit resource management (tested with Node.js 26). This newer syntax is not supported by every browser or older Node.js runtime; it cannot be enabled by merely defining the disposal symbols. Acquisition and disposal are separate awaits. Await operations that need the resource before returning so cleanup does not begin while that work is still using it.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/await_using",
          examples: [
            {
              label: "Await a query before releasing a simulated connection",
              files: [
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'class DbConnection {\n  async query(sql, params) { await Promise.resolve(); return { id: params[0] }; }\n  async close() { await Promise.resolve(); console.log("Connection closed"); }\n  async [Symbol.asyncDispose]() { await this.close(); }\n}\nconst pool = { async acquire() { return new DbConnection(); } };\nasync function getUser(id) {\n  await using conn = await pool.acquire();\n  return await conn.query("SELECT * FROM users WHERE id = $1", [id]);\n}\nconsole.log((await getUser(123)).id);',
                },
              ],
            },
            {
              label: "Release a simulated lock after failure",
              files: [
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'class Lock {\n  constructor(mutex) { this.mutex = mutex; }\n  async [Symbol.asyncDispose]() { await this.mutex.release(); }\n}\nconst mutex = { async acquire() { return { async release() { console.log("Released"); } }; } };\nasync function critical() {\n  await using lock = new Lock(await mutex.acquire());\n  throw new Error("Work failed");\n}\ntry { await critical(); } catch (error) { console.log(error.message); }',
                },
              ],
            },
          ],
        },
        {
          name: "Multiple disposables and reverse-order cleanup",
          explanation:
            "Releases several scoped resources in reverse acquisition order. Use it when later resources depend on earlier ones remaining available until cleanup.",
          note: "The transaction and locks are simulations. Disposal does not automatically imply rollback: the resource implementation must define that behavior. If body and cleanup both throw, resource management can report a SuppressedError. Save main.mjs and run it with a runtime supporting native explicit resource management (tested with Node.js 26). This newer syntax is not supported by every browser or older Node.js runtime; it cannot be enabled by merely defining the disposal symbols.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/await_using",
          examples: [
            {
              label: "Release locks before a committed transaction",
              files: [
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'class Transaction {\n  committed = false;\n  async debit() { console.log("Debit"); }\n  async credit() { console.log("Credit"); }\n  async commit() { this.committed = true; }\n  async [Symbol.asyncDispose]() { console.log(this.committed ? "Transaction committed" : "Transaction rolled back"); }\n}\nconst locks = { async acquire(name) { return { async [Symbol.asyncDispose]() { console.log("Released", name); } }; } };\nasync function transfer(fail) {\n  await using tx = new Transaction();\n  await using lockA = await locks.acquire("A");\n  await using lockB = await locks.acquire("B");\n  await tx.debit();\n  if (fail) throw new Error("Transfer failed");\n  await tx.credit();\n  await tx.commit();\n}\nawait transfer(false);',
                },
              ],
            },
            {
              label: "Roll back an uncommitted transaction",
              files: [
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'class Transaction {\n  committed = false;\n  async debit() { console.log("Debit"); }\n  async credit() { console.log("Credit"); }\n  async commit() { this.committed = true; }\n  async [Symbol.asyncDispose]() { console.log(this.committed ? "Transaction committed" : "Transaction rolled back"); }\n}\nconst locks = { async acquire(name) { return { async [Symbol.asyncDispose]() { console.log("Released", name); } }; } };\nasync function transfer(fail) {\n  await using tx = new Transaction();\n  await using lockA = await locks.acquire("A");\n  await using lockB = await locks.acquire("B");\n  await tx.debit();\n  if (fail) throw new Error("Transfer failed");\n  await tx.credit();\n  await tx.commit();\n}\ntry { await transfer(true); } catch (error) { console.log(error.message); }',
                },
              ],
            },
          ],
        },
        {
          name: "DisposableStack.use()",
          explanation:
            "Registers synchronous disposables with a stack that owns their cleanup. Use it when resources are discovered dynamically but should share a cleanup scope.",
          note: "A DisposableStack accepts synchronous disposers; it does not await an async-only lock. Use AsyncDisposableStack for async cleanup instead. Save main.mjs and run it with a runtime supporting native explicit resource management (tested with Node.js 26). This newer syntax is not supported by every browser or older Node.js runtime; it cannot be enabled by merely defining the disposal symbols.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DisposableStack/use",
          examples: [
            {
              label: "Register resources dynamically",
              files: [
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'class Resource {\n  constructor(name) { this.name = name; }\n  [Symbol.dispose]() { console.log("Disposed", this.name); }\n}\n{\n  using stack = new DisposableStack();\n  stack.use(new Resource("file A"));\n  stack.use(new Resource("file B"));\n  console.log("Working");\n}',
                },
              ],
            },
            {
              label: "Release registered resources after failure",
              files: [
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'class Resource {\n  constructor(name) { this.name = name; }\n  [Symbol.dispose]() { console.log("Disposed", this.name); }\n}\ntry {\n  using stack = new DisposableStack();\n  stack.use(new Resource("file"));\n  throw new Error("Setup failed");\n} catch (error) { console.log(error.message); }',
                },
              ],
            },
          ],
        },
        {
          name: "AsyncDisposableStack.use() for mixed resources",
          explanation:
            "Registers asynchronous or synchronous disposables for awaited stack cleanup. Use it to manage dynamic sets of files and async locks together.",
          note: "This corrects the screenshot’s attempt to put an async-only lock in a synchronous DisposableStack. Cleanup is sequential and reversed. Save main.mjs and run it with a runtime supporting native explicit resource management (tested with Node.js 26). This newer syntax is not supported by every browser or older Node.js runtime; it cannot be enabled by merely defining the disposal symbols.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncDisposableStack/use",
          examples: [
            {
              label: "Mix a synchronous file and async lock",
              files: [
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: '{\n  await using stack = new AsyncDisposableStack();\n  stack.use({ [Symbol.dispose]() { console.log("File closed"); } });\n  stack.use({ async [Symbol.asyncDispose]() { await Promise.resolve(); console.log("Lock released"); } });\n}',
                },
              ],
            },
            {
              label: "Await cleanup before continuing",
              files: [
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: '{\n  await using stack = new AsyncDisposableStack();\n  stack.use({ async [Symbol.asyncDispose]() { await Promise.resolve(); console.log("Cleanup complete"); } });\n}\nconsole.log("After scope");',
                },
              ],
            },
          ],
        },
        {
          name: "Promise.withResolvers()",
          explanation:
            "Returns a promise and its resolve/reject functions together. Use it when external events decide the outcome after the promise has been handed to a consumer.",
          note: "ES2024. This helper is separate from explicit resource management; constructing a deferred promise does not create any resource cleanup or cancellation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers",
          examples: [
            {
              label: "Resolve externally and await elsewhere",
              language: "javascript",
              code: '(async () => {\n  const { promise, resolve } = Promise.withResolvers();\n  setTimeout(() => resolve("done"), 5);\n  console.log(await promise);\n})();',
            },
            {
              label: "Reject externally and handle the reason",
              language: "javascript",
              code: '(async () => {\n  const { promise, reject } = Promise.withResolvers();\n  reject(new Error("Event failed"));\n  try { await promise; } catch (error) { console.log(error.message); }\n})();',
            },
          ],
        },
        {
          name: "Manual deferred promises",
          explanation:
            "Captures executor callbacks to expose a promise and its settlement functions. Recognize it as the earlier equivalent of Promise.withResolvers().",
          note: "The executor runs synchronously, so resolve and reject are initialized before deferred returns. Keep the resolver functions limited to code responsible for settling the operation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers",
          examples: [
            {
              label: "Resolve a manually constructed deferred",
              language: "javascript",
              code: 'function deferred() {\n  let resolve, reject;\n  const promise = new Promise((res, rej) => { resolve = res; reject = rej; });\n  return { promise, resolve, reject };\n}\nconst request = deferred();\nrequest.promise.then(value => console.log(value));\nrequest.resolve("ready");',
            },
            {
              label: "Reject a manually constructed deferred",
              language: "javascript",
              code: 'function deferred() {\n  let resolve, reject;\n  const promise = new Promise((res, rej) => { resolve = res; reject = rej; });\n  return { promise, resolve, reject };\n}\nconst request = deferred();\nrequest.promise.catch(error => console.log(error.message));\nrequest.reject(new Error("failed"));',
            },
          ],
        },
        {
          name: "Await an event-emitter result",
          explanation:
            "Converts a success or error event into one awaited promise. Use it when an event-emitter API needs a promise-based consumer.",
          note: "Save main.cjs and run node main.cjs. This custom helper returns the first success payload and removes both listeners on settlement. After cleanup, handling future error events remains the emitter owner’s responsibility.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers",
          examples: [
            {
              label: "Resolve and remove competing listeners",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const { EventEmitter } = require("node:events");\nfunction once(emitter, event) {\n  if (event === "error") throw new TypeError("Choose a success event");\n  const { promise, resolve, reject } = Promise.withResolvers();\n  const onDone = value => resolve(value);\n  const onError = error => reject(error);\n  emitter.once(event, onDone);\n  emitter.once("error", onError);\n  return promise.finally(() => { emitter.off(event, onDone); emitter.off("error", onError); });\n}\nconst emitter = new EventEmitter();\nconst waiting = once(emitter, "done");\nwaiting.then(value => console.log(value, emitter.listenerCount("error")));\nemitter.emit("done", "payload");',
                },
              ],
            },
            {
              label: "Reject and remove the success listener",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const { EventEmitter } = require("node:events");\nfunction once(emitter, event) {\n  if (event === "error") throw new TypeError("Choose a success event");\n  const { promise, resolve, reject } = Promise.withResolvers();\n  const onDone = value => resolve(value);\n  const onError = error => reject(error);\n  emitter.once(event, onDone);\n  emitter.once("error", onError);\n  return promise.finally(() => { emitter.off(event, onDone); emitter.off("error", onError); });\n}\nconst emitter = new EventEmitter();\nonce(emitter, "done").catch(error => console.log(error.message, emitter.listenerCount("done")));\nemitter.emit("error", new Error("failed"));',
                },
              ],
            },
          ],
        },
        {
          name: "Wait for an event with a timeout",
          explanation:
            "Combines event settlement with a deadline and cleans up whichever path loses. Use it for socket-style APIs that may never deliver their expected event.",
          note: "Node.js file examples use EventEmitter rather than a real socket. All success, error, and timeout paths remove listeners and clear the timer; rejecting the wait does not cancel the underlying event source.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers",
          examples: [
            {
              label: "Receive a payload before the deadline",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const { EventEmitter } = require("node:events");\nfunction waitFor(emitter, event, timeoutMs = 1000) {\n  if (event === "error") throw new TypeError("Choose a success event");\n  const { promise, resolve, reject } = Promise.withResolvers();\n  const onDone = payload => resolve(payload), onError = error => reject(error);\n  const timer = setTimeout(() => reject(new Error("Timeout")), timeoutMs);\n  emitter.once(event, onDone);\n  emitter.once("error", onError);\n  return promise.finally(() => {\n    clearTimeout(timer);\n    emitter.off(event, onDone);\n    emitter.off("error", onError);\n  });\n}\nconst emitter = new EventEmitter();\nwaitFor(emitter, "done").then(value => console.log(value, emitter.listenerCount("error")));\nemitter.emit("done", "ready");',
                },
              ],
            },
            {
              label: "Time out without leaking listeners",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const { EventEmitter } = require("node:events");\nfunction waitFor(emitter, event, timeoutMs = 1000) {\n  if (event === "error") throw new TypeError("Choose a success event");\n  const { promise, resolve, reject } = Promise.withResolvers();\n  const onDone = payload => resolve(payload), onError = error => reject(error);\n  const timer = setTimeout(() => reject(new Error("Timeout")), timeoutMs);\n  emitter.once(event, onDone);\n  emitter.once("error", onError);\n  return promise.finally(() => {\n    clearTimeout(timer);\n    emitter.off(event, onDone);\n    emitter.off("error", onError);\n  });\n}\nconst emitter = new EventEmitter();\nwaitFor(emitter, "done", 5).catch(error => console.log(error.message, emitter.listenerCount("done"), emitter.listenerCount("error")));',
                },
              ],
            },
            {
              label: "Handle an emitter failure before timeout",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const { EventEmitter } = require("node:events");\nfunction waitFor(emitter, event, timeoutMs = 1000) {\n  if (event === "error") throw new TypeError("Choose a success event");\n  const { promise, resolve, reject } = Promise.withResolvers();\n  const onDone = payload => resolve(payload), onError = error => reject(error);\n  const timer = setTimeout(() => reject(new Error("Timeout")), timeoutMs);\n  emitter.once(event, onDone);\n  emitter.once("error", onError);\n  return promise.finally(() => {\n    clearTimeout(timer);\n    emitter.off(event, onDone);\n    emitter.off("error", onError);\n  });\n}\nconst emitter = new EventEmitter();\nwaitFor(emitter, "done").catch(error => console.log(error.message, emitter.listenerCount("done")));\nemitter.emit("error", new Error("Socket failed"));',
                },
              ],
            },
          ],
        },
        {
          name: "Deduplicate in-flight requests",
          explanation:
            "Shares one pending parsed response per URL and removes the entry after fulfillment or rejection. Use it to coalesce simultaneous identical reads without caching completed results.",
          note: "This custom helper uses URL-only keys and assumes equivalent request context. HTTP and JSON failures reject every waiting caller. The internal completion handlers do not create an ignored rejecting finally chain; both paths evict before settling callers.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers",
          examples: [
            {
              label: "Share an in-flight fetch and then allow a fresh request",
              language: "javascript",
              code: 'function createFetchDedup(fetcher = fetch) {\n  const inflight = new Map();\n  return function fetchDedup(url) {\n    if (inflight.has(url)) return inflight.get(url).promise;\n    const deferred = Promise.withResolvers();\n    inflight.set(url, deferred);\n    Promise.resolve().then(() => fetcher(url)).then(response => {\n      if (!response.ok) throw new Error(`HTTP ${response.status}`);\n      return response.json();\n    }).then(\n      value => { inflight.delete(url); deferred.resolve(value); },\n      error => { inflight.delete(url); deferred.reject(error); }\n    );\n    return deferred.promise;\n  };\n}\nlet calls = 0;\nconst fetchDedup = createFetchDedup(url => { calls++; return fetch(url); });\nconst url = "data:application/json,%7B%22id%22%3A123%2C%22name%22%3A%22John%22%7D";\nconst first = fetchDedup(url), second = fetchDedup(url);\nconsole.log(first === second);\n(async () => {\n  const [a, b] = await Promise.all([first, second]);\n  console.log(a.name, a === b, calls);\n  await fetchDedup(url);\n  console.log(calls);\n})().catch(error => console.log(error.message));',
            },
            {
              label: "Evict failures so a later request can retry",
              language: "javascript",
              code: 'function createFetchDedup(fetcher = fetch) {\n  const inflight = new Map();\n  return function fetchDedup(url) {\n    if (inflight.has(url)) return inflight.get(url).promise;\n    const deferred = Promise.withResolvers();\n    inflight.set(url, deferred);\n    Promise.resolve().then(() => fetcher(url)).then(response => {\n      if (!response.ok) throw new Error(`HTTP ${response.status}`);\n      return response.json();\n    }).then(\n      value => { inflight.delete(url); deferred.resolve(value); },\n      error => { inflight.delete(url); deferred.reject(error); }\n    );\n    return deferred.promise;\n  };\n}\nlet calls = 0;\nconst fetchDedup = createFetchDedup(url => {\n  if (++calls === 1) throw new Error("Temporary");\n  return fetch(url);\n});\n(async () => {\n  const url = "data:application/json,%7B%22id%22%3A123%2C%22name%22%3A%22John%22%7D";\n  try { await fetchDedup(url); } catch (error) { console.log(error.message); }\n  console.log((await fetchDedup(url)).name, calls);\n})();',
            },
          ],
        },
      ],
    },
    {
      name: "Abort & Error Handling",
      id: "abort-error-handling",
      intro:
        "AbortController → Error Handling Strategies. Run examples independently. Fetch cancellation uses actual signals; complete Node.js files supply loopback servers or explicit simulated dependencies. React and Express files state installation requirements. Global rejection demonstrations intentionally run in isolated browser pages or Node.js processes.",
      methods: [
        {
          name: "AbortController and fetch cancellation",
          explanation:
            "Supplies an AbortSignal to a cooperative asynchronous operation and requests cancellation through abort(). Use it to stop fetch work that is no longer needed.",
          note: "An AbortSignal is one-shot: create a new controller for new work after cancellation. Aborting cannot undo completed side effects or interrupt arbitrary synchronous JavaScript.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
          examples: [
            {
              label: "Abort a started fetch",
              language: "javascript",
              code: 'const controller = new AbortController();\nfetch("data:application/json,%7B%22ok%22%3Atrue%7D", { signal: controller.signal })\n  .then(response => response.json())\n  .then(data => console.log(data.ok))\n  .catch(error => {\n    if (controller.signal.aborted) console.log("Aborted");\n    else console.log(error.name);\n  });\ncontroller.abort();',
            },
            {
              label: "Reject immediately with an already-aborted signal",
              language: "javascript",
              code: 'const controller = new AbortController();\ncontroller.abort();\nfetch("data:application/json,%7B%22ok%22%3Atrue%7D", { signal: controller.signal })\n  .catch(error => console.log(error.name, controller.signal.aborted));',
            },
          ],
        },
        {
          name: "Abort a fetch after a timeout",
          explanation:
            "Requests cancellation when a timer deadline is reached and clears the timer after the request settles. Use it when the operation itself should receive cancellation rather than merely losing a Promise.race.",
          note: "This helper returns parsed JSON so its deadline includes body consumption. Clearing a timer when fetch only returns headers would leave later parsing unprotected. Save main.cjs and run node main.cjs; examples start and close their own loopback HTTP server.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
          examples: [
            {
              label: "Cancel while waiting for response headers",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const http = require("node:http");\nasync function startServer(handler) {\n  const server = http.createServer(handler);\n  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));\n  return { server, url: `http://127.0.0.1:${server.address().port}` };\n}\nasync function fetchWithTimeout(url, timeout = 1000) {\n  const controller = new AbortController();\n  const timer = setTimeout(() => controller.abort(), timeout);\n  try {\n    const response = await fetch(url, { signal: controller.signal });\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    return await response.json();\n  } finally { clearTimeout(timer); }\n}\n(async () => {\n  const { server, url } = await startServer((req, res) => {\n    const timer = setTimeout(() => res.end(\'{"ok":true}\'), 200);\n    res.on("close", () => clearTimeout(timer));\n  });\n  try { await fetchWithTimeout(url, 20); }\n  catch (error) { console.log(error.name); }\n  finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }\n})();',
                },
              ],
            },
            {
              label: "Cancel while consuming a delayed response body",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const http = require("node:http");\nasync function startServer(handler) {\n  const server = http.createServer(handler);\n  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));\n  return { server, url: `http://127.0.0.1:${server.address().port}` };\n}\nasync function fetchWithTimeout(url, timeout = 1000) {\n  const controller = new AbortController();\n  const timer = setTimeout(() => controller.abort(), timeout);\n  try {\n    const response = await fetch(url, { signal: controller.signal });\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    return await response.json();\n  } finally { clearTimeout(timer); }\n}\n(async () => {\n  const { server, url } = await startServer((req, res) => {\n    res.writeHead(200, { "Content-Type": "application/json" });\n    res.write(\'{"ok":\');\n    const timer = setTimeout(() => res.end("true}"), 200);\n    res.on("close", () => clearTimeout(timer));\n  });\n  try { await fetchWithTimeout(url, 40); }\n  catch (error) { console.log(error.name); }\n  finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }\n})();',
                },
              ],
            },
          ],
        },
        {
          name: "Share one signal across operations",
          explanation:
            "Passes the same signal to multiple cooperative operations so one abort request reaches all of them. Use it for a group with a shared lifetime.",
          note: "Observe every result or rejection. Aborting does not imply every operation was still pending, and it cannot undo already-completed work.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
          examples: [
            {
              label: "Cancel two pending requests together",
              language: "javascript",
              code: 'const controller = new AbortController();\nconst requests = [1, 2].map(() => fetch("data:application/json,%7B%22ok%22%3Atrue%7D", { signal: controller.signal }));\nconst settled = Promise.allSettled(requests);\ncontroller.abort();\nsettled.then(results => console.log(...results.map(result => result.reason.name)));',
            },
            {
              label: "Observe a group rejection",
              language: "javascript",
              code: 'const controller = new AbortController();\nconst combined = Promise.all([\n  fetch("data:application/json,%7B%22ok%22%3Atrue%7D", { signal: controller.signal }),\n  fetch("data:application/json,%7B%22ok%22%3Atrue%7D", { signal: controller.signal })\n]);\ncombined.catch(error => console.log(error.name));\ncontroller.abort();',
            },
          ],
        },
        {
          name: "Track controllers with MultiAbort",
          explanation:
            "Keeps separate controllers for independent tasks while exposing group cancellation. Use it when tasks may be canceled individually or together.",
          note: "This custom tracker removes aborted controllers, and callers release normally completed ones in finally. An abort listener alone does not detect normal completion.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
          examples: [
            {
              label: "Cancel all tracked requests",
              language: "javascript",
              code: 'class MultiAbort {\n  constructor() { this.controllers = new Set(); }\n  create() {\n    const controller = new AbortController();\n    this.controllers.add(controller);\n    controller.signal.addEventListener("abort", () => this.controllers.delete(controller), { once: true });\n    return controller;\n  }\n  release(controller) { this.controllers.delete(controller); }\n  abortAll() {\n    for (const controller of this.controllers) controller.abort();\n    this.controllers.clear();\n  }\n}\nconst group = new MultiAbort();\nconst pending = [group.create(), group.create()].map(controller =>\n  fetch("data:application/json,%7B%22ok%22%3Atrue%7D", { signal: controller.signal }).finally(() => group.release(controller))\n);\nPromise.allSettled(pending).then(results => console.log(...results.map(result => result.reason.name), group.controllers.size));\ngroup.abortAll();',
            },
            {
              label: "Remove a normally completed request",
              language: "javascript",
              code: 'class MultiAbort {\n  constructor() { this.controllers = new Set(); }\n  create() {\n    const controller = new AbortController();\n    this.controllers.add(controller);\n    controller.signal.addEventListener("abort", () => this.controllers.delete(controller), { once: true });\n    return controller;\n  }\n  release(controller) { this.controllers.delete(controller); }\n  abortAll() {\n    for (const controller of this.controllers) controller.abort();\n    this.controllers.clear();\n  }\n}\nconst group = new MultiAbort(), controller = group.create();\nfetch("data:application/json,%7B%22ok%22%3Atrue%7D", { signal: controller.signal })\n  .then(response => response.json())\n  .finally(() => group.release(controller))\n  .then(data => console.log(data.ok, group.controllers.size))\n  .catch(error => console.log(error.name));',
            },
          ],
        },
        {
          name: "React cancellation hook and component cleanup",
          explanation:
            "Creates a fresh request controller and aborts obsolete work when an Effect changes or unmounts. Use it to prevent stale asynchronous results from updating component state.",
          note: "The hook returns a stable start function, avoiding the screenshot’s initial null controller and one-shot reuse. A fresh controller is created for each Effect setup, including Strict Mode replay. Save main.cjs after npm install react@19 react-dom@19 jsdom@26; these demos use actual React in a jsdom document.",
          source: "https://react.dev/reference/react/useEffect",
          examples: [
            {
              label: "Abort immediately on unmount",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const React = require("react");\nconst { createRoot } = require("react-dom/client");\nconst { flushSync } = require("react-dom");\nconst { JSDOM } = require("jsdom");\nconst dom = new JSDOM(\'<div id="root"></div>\');\nglobalThis.window = dom.window; globalThis.document = dom.window.document;\nfunction useAbortController() {\n  const controllerRef = React.useRef(null);\n  React.useEffect(() => () => controllerRef.current?.abort(), []);\n  return React.useCallback(() => {\n    controllerRef.current?.abort();\n    const controller = new AbortController();\n    controllerRef.current = controller;\n    return controller;\n  }, []);\n}\nfunction SearchComponent({ query }) {\n  const start = useAbortController();\n  const [results, setResults] = React.useState("Loading");\n  React.useEffect(() => {\n    const controller = start();\n    fetch("data:application/json,%7B%22name%22%3A%22Alice%22%7D", { signal: controller.signal })\n      .then(response => { if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.json(); })\n      .then(data => { if (!controller.signal.aborted) setResults(query + ": " + data.name); })\n      .catch(error => { if (controller.signal.aborted) console.log("Canceled"); else console.log(error.name); });\n    return () => controller.abort();\n  }, [start, query]);\n  return React.createElement("p", null, results);\n}\nconst root = createRoot(document.querySelector("#root"));\nflushSync(() => root.render(React.createElement(SearchComponent, { query: "Search" })));\nflushSync(() => root.unmount());\nsetTimeout(() => dom.window.close(), 30);',
                },
              ],
            },
            {
              label: "Display a completed current request",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const React = require("react");\nconst { createRoot } = require("react-dom/client");\nconst { flushSync } = require("react-dom");\nconst { JSDOM } = require("jsdom");\nconst dom = new JSDOM(\'<div id="root"></div>\');\nglobalThis.window = dom.window; globalThis.document = dom.window.document;\nfunction useAbortController() {\n  const controllerRef = React.useRef(null);\n  React.useEffect(() => () => controllerRef.current?.abort(), []);\n  return React.useCallback(() => {\n    controllerRef.current?.abort();\n    const controller = new AbortController();\n    controllerRef.current = controller;\n    return controller;\n  }, []);\n}\nfunction SearchComponent({ query }) {\n  const start = useAbortController();\n  const [results, setResults] = React.useState("Loading");\n  React.useEffect(() => {\n    const controller = start();\n    fetch("data:application/json,%7B%22name%22%3A%22Alice%22%7D", { signal: controller.signal })\n      .then(response => { if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.json(); })\n      .then(data => { if (!controller.signal.aborted) setResults(query + ": " + data.name); })\n      .catch(error => { if (controller.signal.aborted) console.log("Canceled"); else console.log(error.name); });\n    return () => controller.abort();\n  }, [start, query]);\n  return React.createElement("p", null, results);\n}\nconst root = createRoot(document.querySelector("#root"));\nflushSync(() => root.render(React.createElement(SearchComponent, { query: "Search" })));\nsetTimeout(() => {\n  console.log(document.querySelector("#root").textContent);\n  root.unmount(); dom.window.close();\n}, 100);',
                },
              ],
            },
          ],
        },
        {
          name: "Custom abort reasons",
          explanation:
            "Supplies a reason when aborting and reads it from signal.reason. Use it to distinguish the cause of cancellation.",
          note: "The default reason is an AbortError DOMException, but a custom reason may be any value and need not have name = AbortError. Error objects are a more portable diagnostic choice than primitive reasons.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/reason",
          examples: [
            {
              label: "Read an application-specific reason",
              language: "javascript",
              code: 'const controller = new AbortController();\nconst reason = new Error("User cancelled");\ncontroller.abort(reason);\nconsole.log(controller.signal.reason === reason, controller.signal.reason.message);',
            },
            {
              label: "Handle a fetch canceled with a custom Error",
              language: "javascript",
              code: 'const controller = new AbortController();\ncontroller.abort(new Error("User cancelled"));\nfetch("data:application/json,%7B%22ok%22%3Atrue%7D", { signal: controller.signal }).catch(error => {\n  if (controller.signal.aborted) console.log(controller.signal.reason.message);\n  else console.log(error.name);\n});',
            },
          ],
        },
        {
          name: "Check signal.aborted",
          explanation:
            "Reads whether cancellation has already been requested. Use it before subscribing or starting custom cooperative work.",
          note: "A signal stays aborted forever. Subscribing after abort does not replay its earlier abort event, so custom APIs must check existing state.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/aborted",
          examples: [
            {
              label: "Observe one-shot state",
              language: "javascript",
              code: "const controller = new AbortController();\nconsole.log(controller.signal.aborted);\ncontroller.abort();\nconsole.log(controller.signal.aborted);",
            },
            {
              label: "Reject custom work that is already canceled",
              language: "javascript",
              code: 'async function operation(signal) {\n  if (signal.aborted) throw signal.reason;\n  return "ready";\n}\nconst controller = new AbortController(); controller.abort();\noperation(controller.signal).catch(error => console.log(error.name));',
            },
          ],
        },
        {
          name: "Listen for the abort event",
          explanation:
            "Registers a callback to react when cancellation is requested. Use it to stop timers or release custom-operation resources.",
          note: "The event fires synchronously when abort is first requested. Register before abort, and remove listeners when work completes normally; once only removes a listener after it fires.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/abort_event",
          examples: [
            {
              label: "Listen before requesting cancellation",
              language: "javascript",
              code: 'const controller = new AbortController();\ncontroller.signal.addEventListener("abort", () => console.log("Signal was aborted"), { once: true });\ncontroller.abort();\nconsole.log("After abort");',
            },
            {
              label: "Cancel a custom timer and remove its listener",
              language: "javascript",
              code: 'function wait(ms, signal) {\n  return new Promise((resolve, reject) => {\n    if (signal.aborted) return reject(signal.reason);\n    const timer = setTimeout(() => { signal.removeEventListener("abort", onAbort); resolve("done"); }, ms);\n    function onAbort() { clearTimeout(timer); signal.removeEventListener("abort", onAbort); reject(signal.reason); }\n    signal.addEventListener("abort", onAbort, { once: true });\n  });\n}\nconst controller = new AbortController();\nwait(1000, controller.signal).catch(error => console.log(error.name));\ncontroller.abort();',
            },
          ],
        },
        {
          name: "Async recovery with try/catch",
          explanation:
            "Awaits a risky operation inside a protected block and returns a defined fallback on failure. Use it when recovery is part of the function’s contract.",
          note: "Define logging and fallback values explicitly. A fallback changes a failure into fulfillment, so callers need to know that contract.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
          examples: [
            {
              label: "Log and return a default value",
              language: "javascript",
              code: 'async function riskyOperation() { throw new Error("Unavailable"); }\nconst logger = { error(error) { console.log("Logged:", error.message); } };\nasync function safe() {\n  try { return await riskyOperation(); }\n  catch (error) { logger.error(error); return "default"; }\n}\nsafe().then(value => console.log(value));',
            },
            {
              label: "Return a successful result without fallback",
              language: "javascript",
              code: 'async function safe(operation) {\n  try { return await operation(); } catch { return "default"; }\n}\nsafe(async () => "ready").then(value => console.log(value));',
            },
          ],
        },
        {
          name: "Promise-chain error handling and cleanup",
          explanation:
            "Uses catch to handle earlier chain failures and finally to perform settlement cleanup. Use it when consuming promise-based operations without an async function.",
          note: "finally returns another promise that may reject if cleanup fails. Handle the final returned chain rather than leaving a cleanup rejection unobserved.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally",
          examples: [
            {
              label: "Recover and then clean up",
              language: "javascript",
              code: 'Promise.reject(new Error("Failed"))\n  .then(value => console.log(value))\n  .catch(error => console.log(error.message))\n  .finally(() => console.log("Cleanup"))\n  .catch(error => console.log("Cleanup failed:", error.message));',
            },
            {
              label: "Handle a cleanup failure at the end",
              language: "javascript",
              code: 'Promise.resolve("ok")\n  .finally(() => { throw new Error("Cleanup failed"); })\n  .catch(error => console.log(error.message));',
            },
          ],
        },
        {
          name: "Browser unhandledrejection handlers",
          explanation:
            "Observes promise rejections that have no handler by the browser’s reporting checkpoint. Use it for last-resort diagnostics alongside local rejection handling.",
          note: "Save each index.html and open it in a browser. These demonstrations intentionally create unhandled rejections and remove their listener after one event. preventDefault suppresses default reporting; it does not recover the failed operation. Cross-origin rejection reporting can be restricted.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event",
          examples: [
            {
              label:
                "Report an Error rejection and suppress duplicate default reporting",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<script>\nfunction report(event) {\n  console.log("Unhandled:", event.reason.message);\n  event.preventDefault();\n  window.removeEventListener("unhandledrejection", report);\n}\nwindow.addEventListener("unhandledrejection", report);\nPromise.reject(new Error("Demo failure"));\n</script>',
                },
              ],
            },
            {
              label: "Handle a rejection reason that is not an Error",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<script>\nfunction report(event) {\n  console.log("Unhandled:", String(event.reason));\n  event.preventDefault();\n  window.removeEventListener("unhandledrejection", report);\n}\nwindow.addEventListener("unhandledrejection", report);\nPromise.reject("Demo reason");\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Structured APIError handling",
          explanation:
            "Attaches stable codes and HTTP status information to an Error subclass. Use it to select authentication, service-error, or generic reporting behavior.",
          note: "The notification and redirect branches log defined messages here rather than changing navigation. A TypeError from a fetch pipeline can also be a programming or input error, so it is not definitive proof of a network outage. Node.js examples use a loopback server for actual HTTP statuses.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error",
          examples: [
            {
              label: "Distinguish real 401 and 503 responses",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const http = require("node:http");\nasync function startServer(handler) {\n  const server = http.createServer(handler);\n  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));\n  return { server, url: `http://127.0.0.1:${server.address().port}` };\n}\nclass APIError extends Error {\n  constructor(message, code, statusCode) { super(message); this.name = "APIError"; this.code = code; this.statusCode = statusCode; }\n}\nasync function apiCall(endpoint) {\n  const response = await fetch(endpoint);\n  if (!response.ok) throw new APIError(`HTTP ${response.status}`, "API_ERROR", response.status);\n  return await response.json();\n}\nfunction handleError(error) {\n  if (error instanceof APIError) {\n    if (error.statusCode === 401) console.log("Login required");\n    else if (error.statusCode >= 500) console.log("Server error. Please try later.");\n    else console.log(error.code, error.statusCode);\n  } else if (error instanceof TypeError) console.log("Request or type failure");\n  else console.log("Unexpected:", error.name);\n}\n(async () => {\n  const { server, url } = await startServer((req, res) => { res.writeHead(Number(req.url.slice(1))); res.end("{}"); });\n  try {\n    for (const status of [401, 503]) { try { await apiCall(url + "/" + status); } catch (error) { handleError(error); } }\n  } finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }\n})();',
                },
              ],
            },
            {
              label: "Report parsing and malformed-request errors",
              language: "javascript",
              code: 'class APIError extends Error {\n  constructor(message, code, statusCode) { super(message); this.name = "APIError"; this.code = code; this.statusCode = statusCode; }\n}\nasync function apiCall(endpoint) {\n  const response = await fetch(endpoint);\n  if (!response.ok) throw new APIError(`HTTP ${response.status}`, "API_ERROR", response.status);\n  return await response.json();\n}\nfunction handleError(error) {\n  if (error instanceof APIError) {\n    if (error.statusCode === 401) console.log("Login required");\n    else if (error.statusCode >= 500) console.log("Server error. Please try later.");\n    else console.log(error.code, error.statusCode);\n  } else if (error instanceof TypeError) console.log("Request or type failure");\n  else console.log("Unexpected:", error.name);\n}\n(async () => {\n  for (const endpoint of ["data:application/json,invalid", "http://["]) {\n    try { await apiCall(endpoint); } catch (error) { handleError(error); }\n  }\n})();',
            },
          ],
        },
        {
          name: "Async route error wrapper",
          explanation:
            "Forwards synchronous throws and rejected route-handler promises to next(error). Use it for Express 4-style callback error propagation.",
          note: "The wrapper returns its chain so it can be observed. Express 5 automatically forwards rejections from returned promises, so a wrapper is normally unnecessary there. A handler should choose either throwing/rejecting or next(error), avoiding duplicate forwarding.",
          source: "https://expressjs.com/en/guide/error-handling.html",
          examples: [
            {
              label: "Forward a rejected handler",
              language: "javascript",
              code: 'function asyncHandler(fn) {\n  return (req, res, next) => Promise.resolve().then(() => fn(req, res, next)).catch(next);\n}\nconst handler = asyncHandler(async () => { throw new Error("Route failed"); });\nhandler({}, {}, error => console.log(error.message));',
            },
            {
              label: "Let a successful handler respond",
              language: "javascript",
              code: 'function asyncHandler(fn) {\n  return (req, res, next) => Promise.resolve().then(() => fn(req, res, next)).catch(next);\n}\nconst handler = asyncHandler(async (req, res) => { res.json({ id: req.params.id }); });\nhandler({ params: { id: "123" } }, { json(user) { console.log(user.id); } }, error => console.log(error.message));',
            },
          ],
        },
        {
          name: "Express routes with defined error middleware",
          explanation:
            "Routes a failed asynchronous user lookup into an error middleware response. Use a defined error type and terminal middleware so requests receive a response.",
          note: "In an isolated folder run npm install express@5, save main.cjs, then run node main.cjs. These examples start, call, and close an actual loopback server. The explicit wrapper remains compatible but Express 5 can also handle the returned async function directly.",
          source: "https://expressjs.com/en/guide/error-handling.html",
          examples: [
            {
              label: "Respond to a found user",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const express = require("express");\nfunction asyncHandler(fn) {\n  return (req, res, next) => Promise.resolve().then(() => fn(req, res, next)).catch(next);\n}\nclass NotFoundError extends Error {\n  constructor(message) { super(message); this.statusCode = 404; }\n}\nasync function getUserById(id) { return id === "123" ? { id, name: "John" } : null; }\nconst app = express();\napp.get("/users/:id", asyncHandler(async (req, res) => {\n  const user = await getUserById(req.params.id);\n  if (!user) throw new NotFoundError("User not found");\n  res.json(user);\n}));\napp.use((error, req, res, next) => {\n  if (res.headersSent) return next(error);\n  res.status(error.statusCode ?? 500).json({ error: error.message });\n});\nconst server = app.listen(0, "127.0.0.1", async () => {\n  try {\n    const response = await fetch(`http://127.0.0.1:${server.address().port}/users/123`);\n    console.log(response.status, (await response.json()).name);\n  } finally { server.closeAllConnections(); server.close(); }\n});',
                },
              ],
            },
            {
              label: "Turn a missing user into a 404 response",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const express = require("express");\nfunction asyncHandler(fn) {\n  return (req, res, next) => Promise.resolve().then(() => fn(req, res, next)).catch(next);\n}\nclass NotFoundError extends Error {\n  constructor(message) { super(message); this.statusCode = 404; }\n}\nasync function getUserById(id) { return id === "123" ? { id, name: "John" } : null; }\nconst app = express();\napp.get("/users/:id", asyncHandler(async (req, res) => {\n  const user = await getUserById(req.params.id);\n  if (!user) throw new NotFoundError("User not found");\n  res.json(user);\n}));\napp.use((error, req, res, next) => {\n  if (res.headersSent) return next(error);\n  res.status(error.statusCode ?? 500).json({ error: error.message });\n});\nconst server = app.listen(0, "127.0.0.1", async () => {\n  try {\n    const response = await fetch(`http://127.0.0.1:${server.address().port}/users/missing`);\n    console.log(response.status, (await response.json()).error);\n  } finally { server.closeAllConnections(); server.close(); }\n});',
                },
              ],
            },
          ],
        },
        {
          name: "Result.ok(), Result.fail(), and map()",
          explanation:
            "Represents success or failure as a value that callers explicitly inspect. Use it when expected failures should not reject the public operation.",
          note: "This custom Result catches errors at the async boundary and in synchronous map transformations. map does not await asynchronous callbacks; outside operations can still throw, so this pattern does not eliminate every possible exception.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
          examples: [
            {
              label: "Transform a successful result",
              language: "javascript",
              code: 'class Result {\n  constructor(success, value, error) { this.success = success; this.value = value; this.error = error; }\n  static ok(value) { return new Result(true, value, null); }\n  static fail(error) { return new Result(false, null, error); }\n  map(fn) {\n    if (!this.success) return this;\n    try { return Result.ok(fn(this.value)); } catch (error) { return Result.fail(error); }\n  }\n}\nasync function fetchUserSafe(id) {\n  try {\n    if (id !== 123) throw new Error("User not found");\n    const response = await fetch("data:application/json,%7B%22name%22%3A%22John%22%7D");\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    return Result.ok(await response.json());\n  } catch (error) { return Result.fail(error); }\n}\nfetchUserSafe(123).then(result => {\n  const name = result.map(user => user.name.toUpperCase());\n  if (name.success) console.log(name.value);\n  else console.log(name.error.message);\n});',
            },
            {
              label: "Preserve failure and capture a mapping throw",
              language: "javascript",
              code: 'class Result {\n  constructor(success, value, error) { this.success = success; this.value = value; this.error = error; }\n  static ok(value) { return new Result(true, value, null); }\n  static fail(error) { return new Result(false, null, error); }\n  map(fn) {\n    if (!this.success) return this;\n    try { return Result.ok(fn(this.value)); } catch (error) { return Result.fail(error); }\n  }\n}\nasync function fetchUserSafe(id) {\n  try {\n    if (id !== 123) throw new Error("User not found");\n    const response = await fetch("data:application/json,%7B%22name%22%3A%22John%22%7D");\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    return Result.ok(await response.json());\n  } catch (error) { return Result.fail(error); }\n}\n(async () => {\n  const failed = await fetchUserSafe(0);\n  console.log(failed.success, failed.map(() => "not called") === failed, failed.error.message);\n  const mapped = Result.ok(1).map(() => { throw new Error("Mapping failed"); });\n  console.log(mapped.success, mapped.error.message);\n})();',
            },
          ],
        },
        {
          name: "Node.js unhandledRejection diagnostics",
          explanation:
            "Observes rejections that have no handler when Node.js performs its reporting check. Use it for last-resort telemetry rather than normal control flow.",
          note: "Run node --unhandled-rejections=throw main.cjs in an isolated process. These examples intentionally leave one promise unhandled; their once listener removes itself. Strict mode can still terminate the process before this event. A listener changes default reporting behavior and does not make failed application state safe to continue.",
          source:
            "https://nodejs.org/api/process.html#event-unhandledrejection",
          examples: [
            {
              label: "Report an Error through a defined tracker",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const errorTracker = { logError(reason) { console.log("Tracked:", reason.message); } };\nprocess.once("unhandledRejection", reason => errorTracker.logError(reason));\nPromise.reject(new Error("Demo failure"));',
                },
              ],
            },
            {
              label: "Record a non-Error rejection safely",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'process.once("unhandledRejection", reason => console.log("Unhandled:", String(reason)));\nPromise.reject("Demo reason");',
                },
              ],
            },
          ],
        },
        {
          name: "Graceful shutdown sequencing",
          explanation:
            "Stops accepting requests, waits for server and queued work, then disconnects downstream resources. Use it to close dependencies in an order that lets outstanding work finish.",
          note: "Node.js server.close uses a callback, so awaiting its return value does not wait for closure. This example wraps it and drains queued work before disconnecting the database. It sets exitCode instead of calling process.exit abruptly. Queue and database APIs are explicit simulations; real systems may need a bounded shutdown deadline.",
          source: "https://nodejs.org/api/http.html#serverclosecallback",
          examples: [
            {
              label:
                "Close an actual server and drain simulated dependent work",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'const http = require("node:http");\nasync function startServer(handler) {\n  const server = http.createServer(handler);\n  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));\n  return { server, url: `http://127.0.0.1:${server.address().port}` };\n}\nfunction createShutdown(server, database, queue) {\n  let shutdownPromise;\n  return function gracefulShutdown() {\n    if (shutdownPromise) return shutdownPromise;\n    shutdownPromise = (async () => {\n      console.log("Starting shutdown");\n      const closed = new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));\n      const outcomes = await Promise.allSettled([closed, queue.drain()]);\n      try { await database.disconnect(); } catch (error) { outcomes.push({ status: "rejected", reason: error }); }\n      const failures = outcomes.filter(outcome => outcome.status === "rejected");\n      if (failures.length) {\n        process.exitCode = 1; console.log("Shutdown failed:", failures[0].reason.message);\n      } else console.log("Shutdown complete");\n    })();\n    return shutdownPromise;\n  };\n}\n(async () => {\n  const { server } = await startServer((req, res) => res.end("ok"));\n  const queue = { async drain() { await new Promise(r => setTimeout(r, 5)); console.log("Queue drained"); } };\n  const database = { async disconnect() { console.log("Database disconnected"); } };\n  const close = createShutdown(server, database, queue);\n  const first = close(), second = close();\n  console.log(first === second);\n  await first;\n})();',
                },
              ],
            },
            {
              label: "Attempt database cleanup even when draining fails",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'function createShutdown(server, database, queue) {\n  let shutdownPromise;\n  return function gracefulShutdown() {\n    if (shutdownPromise) return shutdownPromise;\n    shutdownPromise = (async () => {\n      console.log("Starting shutdown");\n      const closed = new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));\n      const outcomes = await Promise.allSettled([closed, queue.drain()]);\n      try { await database.disconnect(); } catch (error) { outcomes.push({ status: "rejected", reason: error }); }\n      const failures = outcomes.filter(outcome => outcome.status === "rejected");\n      if (failures.length) {\n        process.exitCode = 1; console.log("Shutdown failed:", failures[0].reason.message);\n      } else console.log("Shutdown complete");\n    })();\n    return shutdownPromise;\n  };\n}\nconst server = { close(callback) { callback(); } };\nconst queue = { async drain() { throw new Error("Drain failed"); } };\nconst database = { async disconnect() { console.log("Database disconnected"); } };\ncreateShutdown(server, database, queue)();\n// This demo deliberately finishes with exit code 1.',
                },
              ],
            },
          ],
        },
        {
          name: "SIGTERM and SIGINT shutdown hooks",
          explanation:
            "Registers process signal handlers that invoke a single shutdown workflow. Use it to connect application cleanup to termination requests.",
          note: "The runnable examples emit signal events programmatically instead of sending OS signals. Real listeners replace default Node.js signal handling; they must eventually let the process exit or set an appropriate exit policy. Repeated notifications should share one shutdown promise.",
          source: "https://nodejs.org/api/process.html#signal-events",
          examples: [
            {
              label: "Handle repeated shutdown signals once",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'let pending;\nfunction gracefulShutdown() {\n  return pending ??= Promise.resolve().then(() => console.log("Cleanup once"));\n}\nfunction onSignal() { gracefulShutdown().catch(error => { console.log(error.message); process.exitCode = 1; }); }\nprocess.on("SIGTERM", onSignal); process.on("SIGINT", onSignal);\nprocess.emit("SIGTERM"); process.emit("SIGINT");\nsetTimeout(() => { process.off("SIGTERM", onSignal); process.off("SIGINT", onSignal); }, 10);',
                },
              ],
            },
            {
              label: "Remove installed signal hooks after shutdown",
              files: [
                {
                  path: "main.cjs",
                  language: "javascript",
                  code: 'function onSignal() {\n  console.log("Cleanup");\n  process.off("SIGTERM", onSignal); process.off("SIGINT", onSignal);\n}\nprocess.on("SIGTERM", onSignal); process.on("SIGINT", onSignal);\nprocess.emit("SIGTERM");\nconsole.log(process.listeners("SIGINT").includes(onSignal));',
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
      "language-" + (example.language || "javascript"),
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
          "async-javascript-cheatsheet:" +
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
                language: file.language || "javascript",
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
