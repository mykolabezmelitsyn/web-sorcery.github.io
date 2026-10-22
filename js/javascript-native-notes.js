/* Native API reference notes; example source is never modified. */
window.JavaScriptNativeNotes = {
  apis: {
    "AbortController/AbortController": {
      title: "new AbortController()",
      does: "Creates an owner for a cancellation signal.",
      parameters: "No parameters.",
      returns: "An AbortController with a signal.",
      behavior:
        "Does not start or cancel work until an API observes its signal or abort is called.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/AbortController/AbortController",
      kind: "Browser API",
    },
    "AbortController/abort": {
      title: "controller.abort(reason)",
      does: "Marks the associated signal as aborted.",
      parameters:
        "Optional reason describes cancellation; omitted reason defaults to an AbortError DOMException.",
      returns: "undefined.",
      behavior:
        "Notifies observers and cancels participating APIs; does not cancel arbitrary JavaScript or roll back completed work.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort",
      kind: "Browser API",
    },
    "AbortSignal/throwIfAborted": {
      title: "signal.throwIfAborted()",
      does: "Throws the signal’s reason if already aborted.",
      parameters: "No parameters.",
      returns: "undefined if not aborted; otherwise throws.",
      behavior:
        "Only checks at this point; it does not subscribe to future cancellation.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/throwIfAborted",
      kind: "Browser API",
    },
    "Animation/cancel": {
      title: "animation.cancel()",
      does: "Cancels an animation and removes its animation effect.",
      parameters: "No parameters.",
      returns: "undefined.",
      behavior:
        "A running animation’s finished promise rejects with AbortError. Optional chaining here avoids calling on an absent animation.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Animation/cancel",
      kind: "Browser API",
    },
    "Array/every": {
      title: "array.every()",
      does: "Checks whether all visited elements satisfy a predicate.",
      parameters:
        "callback(value, index, array) returns a truthy/falsy result; optional thisArg sets its receiver.",
      returns: "A boolean.",
      behavior:
        "Stops at the first falsy result; an empty array returns true. Does not await callbacks.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every",
      kind: "JavaScript built-in",
    },
    "Array/filter": {
      title: "array.filter()",
      does: "Keeps elements whose callback returns a truthy value.",
      parameters:
        "callback(value, index, array) decides whether to keep each item; optional thisArg sets its receiver.",
      returns: "A new, shallow array of retained elements.",
      behavior: "Does not clone retained objects or await async predicates.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
      kind: "JavaScript built-in",
    },
    "Array/flatMap": {
      title: "array.flatMap()",
      does: "Maps elements and flattens one array level.",
      parameters:
        "callback(value, index, array) returns a value or array; optional thisArg sets its receiver.",
      returns: "A new array.",
      behavior:
        "Only actual arrays are flattened, exactly one level; input objects may remain shared.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap",
      kind: "JavaScript built-in",
    },
    "Array/from": {
      title: "Array.from(source, mapFn)",
      does: "Builds an array from an iterable or array-like input.",
      parameters:
        "source supplies values or length; optional mapFn(value, index) creates each element.",
      returns: "A new array.",
      behavior:
        "The length-only object here generates indices through the callback; object elements are not deeply cloned.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from",
      kind: "JavaScript built-in",
    },
    "Array/includes": {
      title: "array.includes()",
      does: "Tests array membership.",
      parameters:
        "searchElement is the sought value; optional fromIndex selects the starting position.",
      returns: "A boolean.",
      behavior:
        "Uses SameValueZero (NaN matches NaN); objects compare by identity.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes",
      kind: "JavaScript built-in",
    },
    "Array/isArray": {
      title: "Array.isArray(value)",
      does: "Checks whether a value is an actual Array.",
      parameters: "value is the input to check.",
      returns: "A boolean.",
      behavior:
        "Works across realms; typed arrays and array-like objects return false.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray",
      kind: "JavaScript built-in",
    },
    "Array/map": {
      title: "array.map()",
      does: "Transforms each present array element.",
      parameters:
        "callback(value, index, array) returns each output value; optional thisArg sets its receiver.",
      returns: "A new array of callback results.",
      behavior:
        "Does not itself mutate the input; returned objects can still share references. Async callbacks produce promises.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
      kind: "JavaScript built-in",
    },
    "Array/push": {
      title: "array.push()",
      does: "Appends one or more elements.",
      parameters: "...items are the values to append.",
      returns: "The array’s new length.",
      behavior:
        "Mutates the original array; the return value is not the array.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push",
      kind: "JavaScript built-in",
    },
    "Array/reduce": {
      title: "array.reduce()",
      does: "Folds elements into one accumulated result.",
      parameters:
        "callback(accumulator, value, index, array) returns the next accumulator; initialValue supplies the starting value.",
      returns: "The final accumulator.",
      behavior:
        "Without initialValue an empty array throws; a 0 seed here makes numeric totals explicit.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
      kind: "JavaScript built-in",
    },
    "Array/some": {
      title: "array.some()",
      does: "Checks whether at least one element satisfies a predicate.",
      parameters:
        "callback(value, index, array) returns a truthy/falsy result; optional thisArg sets its receiver.",
      returns: "A boolean.",
      behavior:
        "Stops at the first truthy result; an empty array returns false. Does not await callbacks.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some",
      kind: "JavaScript built-in",
    },
    "Array/toSorted": {
      title: "array.toSorted()",
      does: "Creates a sorted copy.",
      parameters:
        "Optional compareFn(a, b) returns negative/zero/positive to order the pair.",
      returns: "A new sorted array.",
      behavior:
        "Leaves the input array unchanged; without a comparator it sorts by string values. ES2023 API.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted",
      kind: "JavaScript built-in",
    },
    "ArrayBuffer/ArrayBuffer": {
      title: "new ArrayBuffer(input)",
      does: "Allocates zero-initialized binary storage.",
      parameters: "length is the number of bytes.",
      returns: "A new ArrayBuffer.",
      behavior:
        "Views share this storage; constructing a view does not copy the bytes.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/ArrayBuffer",
      kind: "JavaScript built-in",
    },
    "Atomics/add": {
      title: "Atomics.add(view, index, value)",
      does: "Atomically adds to an integer typed-array element.",
      parameters:
        "view selects storage; index selects the element; value is the amount to add.",
      returns: "The element’s previous value.",
      behavior:
        "Mutates memory atomically; use a supported integer typed array and valid index.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/add",
      kind: "JavaScript built-in",
    },
    "Atomics/load": {
      title: "Atomics.load(view, index)",
      does: "Atomically reads an integer typed-array element.",
      parameters: "view selects storage; index selects the element.",
      returns: "The current numeric/BigInt element value.",
      behavior:
        "Does not mutate storage; use the same atomic protocol for related shared-memory operations.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/load",
      kind: "JavaScript built-in",
    },
    "Boolean/Boolean": {
      title: "Boolean(value)",
      does: "Converts a value using JavaScript truthiness.",
      parameters: "value is the input to test.",
      returns: "true or false.",
      behavior:
        'All ordinary objects, including empty arrays, are truthy; the string "false" is also truthy.',
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean/Boolean",
      kind: "JavaScript built-in",
    },
    "Cache/add": {
      title: "cache.add(request)",
      does: "Fetches a request and stores its successful response.",
      parameters: "request is a Request or URL.",
      returns: "A Promise fulfilled with undefined.",
      behavior:
        "Performs network I/O and mutates the cache; unsuitable/error responses reject, which can fail worker installation.",
      source: "https://developer.mozilla.org/en-US/docs/Web/API/Cache/add",
      kind: "Browser API",
    },
    "CacheStorage/delete": {
      title: "caches.delete()",
      does: "Deletes a named cache.",
      parameters: "cacheName identifies the entire cache to remove.",
      returns: "A Promise for a boolean indicating whether it existed.",
      behavior:
        "Removes that namespace’s stored entries; do not delete caches belonging to other features.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/delete",
      kind: "Browser API",
    },
    "CacheStorage/keys": {
      title: "caches.keys()",
      does: "Lists named caches for the origin.",
      parameters: "No parameters.",
      returns: "A Promise for cache-name strings.",
      behavior:
        "Lists all cache names, so filter your namespace before deleting anything.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/keys",
      kind: "Browser API",
    },
    "CacheStorage/open": {
      title: "caches.open()",
      does: "Opens or creates a named cache.",
      parameters: "cacheName is the storage namespace.",
      returns: "A Promise for a Cache.",
      behavior:
        "Creates persistent origin storage if absent; storage can fail or later be evicted.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage/open",
      kind: "Browser API",
    },
    "Clipboard/writeText": {
      title: "navigator.clipboard.writeText(text)",
      does: "Requests writing text to the system clipboard.",
      parameters: "text is the string to copy.",
      returns: "A Promise fulfilled with undefined when successful.",
      behavior:
        "Requires a secure context and permission/user-activation rules; rejection must be handled.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText",
      kind: "Browser API",
    },
    "CustomElementRegistry/define": {
      title: "customElements.define(name, constructor, options)",
      does: "Registers a custom-element class.",
      parameters:
        "name is a valid custom-element name; constructor is its class; options is for supported customized built-ins.",
      returns: "undefined.",
      behavior:
        "Registration can upgrade existing matching elements; duplicate names/constructors or invalid definitions throw.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define",
      kind: "Browser API",
    },
    "CustomElementRegistry/get": {
      title: "customElements.get(name)",
      does: "Looks up a registered custom-element constructor.",
      parameters: "name is the custom-element tag name.",
      returns: "The constructor, or undefined.",
      behavior: "Does not register or instantiate an element.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/get",
      kind: "Browser API",
    },
    "CustomEvent/CustomEvent": {
      title: "new CustomEvent(type, options)",
      does: "Creates an application-defined DOM event.",
      parameters:
        "type names the event; options can supply detail, bubbles, cancelable, and composed.",
      returns: "A CustomEvent.",
      behavior:
        "Creating it does not dispatch it; bubbles/composed default to false, so this example opts in.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent",
      kind: "Browser API",
    },
    "DOMException/DOMException": {
      title: "new DOMException(message, name)",
      does: "Creates a named platform-style error.",
      parameters:
        "message describes the failure; name identifies its category, such as TimeoutError.",
      returns: "A DOMException.",
      behavior:
        "Construction alone does not throw; passing it to abort makes it the cancellation reason.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/DOMException/DOMException",
      kind: "Browser API",
    },
    "DOMStringList/contains": {
      title: "objectStoreNames.contains(name)",
      does: "Checks whether a store name exists in the name list.",
      parameters: "name is the string to find.",
      returns: "A boolean.",
      behavior:
        "This is a DOMStringList lookup, not Array.includes or a DOM descendant test.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/DOMStringList/contains",
      kind: "Browser API",
    },
    "DOMTokenList/toggle": {
      title: "element.classList.toggle(token, force)",
      does: "Toggles a class token or explicitly sets its presence.",
      parameters:
        "token is one class name; optional force=true adds it and false removes it.",
      returns: "Whether the token is present afterward.",
      behavior:
        "Mutates the class attribute; tokens cannot be empty or contain whitespace.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle",
      kind: "Browser API",
    },
    "DataView/DataView": {
      title: "new DataView(input)",
      does: "Creates a byte-offset-based view of binary storage.",
      parameters:
        "buffer is the backing store; optional byteOffset/byteLength restrict the region.",
      returns: "A new DataView.",
      behavior: "No copy is made; setters modify the shared backing bytes.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/DataView",
      kind: "JavaScript built-in",
    },
    "DataView/getUint16": {
      title: "view.getUint16(offset, littleEndian)",
      does: "Reads an unsigned 16-bit integer from the backing buffer.",
      parameters:
        "offset is the byte offset; littleEndian=true chooses little-endian (default false).",
      returns: "A number from 0 to 65535.",
      behavior:
        "Does not modify bytes; an out-of-bounds offset throws RangeError.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getUint16",
      kind: "JavaScript built-in",
    },
    "DataView/setUint16": {
      title: "view.setUint16(offset, value, littleEndian)",
      does: "Writes an unsigned 16-bit integer into the backing buffer.",
      parameters:
        "offset is the byte offset; value is converted to uint16; littleEndian=true chooses little-endian (default false).",
      returns: "undefined.",
      behavior:
        "Mutates shared bytes; an out-of-bounds offset throws RangeError.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setUint16",
      kind: "JavaScript built-in",
    },
    "Date/Date": {
      title: "new Date(value)",
      does: "Creates a date/time object storing a timestamp.",
      parameters:
        "value here is an ISO string with Z, explicitly selecting UTC.",
      returns: "A Date object; invalid input produces an invalid Date.",
      behavior:
        "Other string formats can be ambiguous; formatting and timezone display are separate concerns.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date",
      kind: "JavaScript built-in",
    },
    "DedicatedWorkerGlobalScope/postMessage": {
      title: "self.postMessage(message, transfer)",
      does: "Sends a message from a dedicated worker to its owner.",
      parameters:
        "message is structured-cloneable data; optional transfer transfers ownership of listed objects.",
      returns: "undefined.",
      behavior:
        "Delivery is asynchronous; normal object messages are cloned, not shared by reference.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/postMessage",
      kind: "Browser API",
    },
    "Document/createDocumentFragment": {
      title: "document.createDocumentFragment()",
      does: "Creates a detached container for assembling nodes.",
      parameters: "No parameters.",
      returns: "A new DocumentFragment.",
      behavior:
        "Appending the fragment inserts its children and empties the fragment.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment",
      kind: "Browser API",
    },
    "Document/createElement": {
      title: "document.createElement(tagName)",
      does: "Creates a detached HTML element.",
      parameters: "tagName names the element, such as li or button.",
      returns: "A new Element.",
      behavior:
        "Does not insert it into the document; custom-element creation can invoke lifecycle-related construction.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement",
      kind: "Browser API",
    },
    "Document/querySelector": {
      title: "querySelector(selectors)",
      does: "Finds the first matching element in the document/subtree.",
      parameters: "selectors is a CSS selector string.",
      returns: "An Element or null.",
      behavior:
        "Invalid selectors throw SyntaxError; using the result without checking assumes the example markup exists.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector",
      kind: "Browser API",
    },
    "Element/animate": {
      title: "element.animate(keyframes, options)",
      does: "Creates and immediately plays a Web Animations animation.",
      parameters:
        "keyframes defines property values; options sets duration, easing, fill, and timing.",
      returns: "An Animation object.",
      behavior:
        'fill:"forwards" keeps the animation effect active after completion; it does not write those values into inline style.',
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Element/animate",
      kind: "Browser API",
    },
    "Element/append": {
      title: "parent.append(...nodes)",
      does: "Appends nodes/text after existing children.",
      parameters: "Each argument is a Node or string to insert.",
      returns: "undefined.",
      behavior:
        "Moves existing nodes rather than copying them; strings become text, not parsed HTML.",
      source: "https://developer.mozilla.org/en-US/docs/Web/API/Element/append",
      kind: "Browser API",
    },
    "Element/attachShadow": {
      title: "element.attachShadow(options)",
      does: "Attaches a shadow root to a supported host.",
      parameters:
        "options.mode is open or closed; open exposes host.shadowRoot.",
      returns: "A ShadowRoot.",
      behavior:
        "Creates a separate DOM styling/lookup boundary; unsupported hosts or incompatible existing roots throw.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow",
      kind: "Browser API",
    },
    "Element/closest": {
      title: "element.closest(selectors)",
      does: "Searches this element and then its ancestors for a match.",
      parameters: "selectors is a CSS selector string.",
      returns: "The nearest matching Element or null.",
      behavior:
        "Includes the element itself; invalid selectors throw. Guard null before using the result.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Element/closest",
      kind: "Browser API",
    },
    "Element/querySelectorAll": {
      title: "element.querySelectorAll(selectors)",
      does: "Finds all matching descendants.",
      parameters: "selectors is a CSS selector string.",
      returns: "A static NodeList of matching elements.",
      behavior: "Not a live collection; later DOM changes do not update it.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelectorAll",
      kind: "Browser API",
    },
    "Element/remove": {
      title: "element.remove()",
      does: "Removes the element from its parent.",
      parameters: "No parameters.",
      returns: "undefined.",
      behavior:
        "A detached node does nothing; this alone does not clear external references or unrelated subscriptions.",
      source: "https://developer.mozilla.org/en-US/docs/Web/API/Element/remove",
      kind: "Browser API",
    },
    "Element/replaceChildren": {
      title: "parent.replaceChildren(...nodes)",
      does: "Replaces the parent’s complete child list.",
      parameters:
        "Arguments are replacement nodes/strings; no arguments clears the parent.",
      returns: "undefined.",
      behavior:
        "Removes existing children and their visible state; passed nodes are moved.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceChildren",
      kind: "Browser API",
    },
    "Element/setAttribute": {
      title: "element.setAttribute(name, value)",
      does: "Sets an HTML attribute.",
      parameters: "name is the attribute name; value is converted to a string.",
      returns: "undefined.",
      behavior:
        'Mutates DOM attributes; boolean attributes depend on presence, not the string "false".',
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute",
      kind: "Browser API",
    },
    "Error/Error": {
      title: "new Error(message)",
      does: "Creates an error object describing a failure.",
      parameters:
        "message is the diagnostic text; optional options.cause records an underlying error.",
      returns: "A new Error instance.",
      behavior:
        "Construction alone does not throw; throw or promise rejection propagates it.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error",
      kind: "JavaScript built-in",
    },
    "Event/preventDefault": {
      title: "event.preventDefault()",
      does: "Cancels a cancelable event’s default action.",
      parameters: "No parameters.",
      returns: "undefined.",
      behavior:
        "Does not stop propagation; ignored for passive listeners or non-cancelable events.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault",
      kind: "Browser API",
    },
    "EventSource/EventSource": {
      title: "new EventSource(url, options)",
      does: "Opens a server-sent events connection.",
      parameters:
        "url is the stream endpoint; optional options.withCredentials controls cross-origin credentials.",
      returns: "An EventSource.",
      behavior:
        "Maintains a connection and normally reconnects automatically; requires an SSE-speaking server.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/EventSource/EventSource",
      kind: "Browser API",
    },
    "EventSource/close": {
      title: "eventSource.close()",
      does: "Closes a server-sent events connection.",
      parameters: "No parameters.",
      returns: "undefined.",
      behavior:
        "Stops reconnection and releases the active stream; use during component teardown.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/EventSource/close",
      kind: "Browser API",
    },
    "EventTarget/addEventListener": {
      title: "target.addEventListener(type, listener, options)",
      does: "Registers an event listener.",
      parameters:
        "type is the event name; listener handles the event; options can include once, capture, passive, or signal.",
      returns: "undefined.",
      behavior:
        "May retain closures. once auto-removes after delivery; an AbortSignal can own cleanup. Event return values do not cancel defaults.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
      kind: "Browser API",
    },
    "EventTarget/dispatchEvent": {
      title: "target.dispatchEvent(event)",
      does: "Synchronously dispatches an event to listeners.",
      parameters: "event is an initialized Event/CustomEvent.",
      returns: "false if a cancelable event was prevented; otherwise true.",
      behavior:
        "Listener callbacks run before the call returns; listener exceptions are reported, not normally rethrown by dispatchEvent.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent",
      kind: "Browser API",
    },
    "EventTarget/removeEventListener": {
      title: "target.removeEventListener(type, listener, options)",
      does: "Removes a previously registered event listener.",
      parameters:
        "type, the same listener reference, and matching capture flag identify the registration.",
      returns: "undefined.",
      behavior:
        "Does nothing if no match exists; other options need not match.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener",
      kind: "Browser API",
    },
    "ExtendableEvent/waitUntil": {
      title: "event.waitUntil(promise)",
      does: "Extends service-worker event lifetime for async work.",
      parameters: "promise represents installation/activation work.",
      returns: "undefined.",
      behavior:
        "Installation rejection prevents the new worker from becoming active; call while the event permits lifetime extension.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil",
      kind: "Browser API",
    },
    "FetchEvent/respondWith": {
      title: "event.respondWith(response)",
      does: "Supplies a service-worker response to an intercepted request.",
      parameters: "response is a Response or promise for one.",
      returns: "undefined.",
      behavior:
        "Call synchronously during the fetch handler; the supplied promise may resolve later. Can replace network behavior.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith",
      kind: "Browser API",
    },
    "FormData/FormData": {
      title: "new FormData(form)",
      does: "Collects the form’s successful controls as entries.",
      parameters:
        "Optional form is the HTMLFormElement; optional submitter identifies the submit button.",
      returns: "A FormData object.",
      behavior:
        "Disabled/unnamed controls are omitted; captures current values and can contain File objects.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData",
      kind: "Browser API",
    },
    "FormData/get": {
      title: "formData.get(name)",
      does: "Reads the first entry with a given name.",
      parameters: "name is the form-field name.",
      returns: "A string, File, or null.",
      behavior:
        "Repeated names need getAll; this example’s text control makes trim valid only when that control exists.",
      source: "https://developer.mozilla.org/en-US/docs/Web/API/FormData/get",
      kind: "Browser API",
    },
    "Function/apply": {
      title: "function.apply()",
      does: "Invokes a function with a receiver and argument list.",
      parameters:
        "thisArg supplies this; argsArray is array-like (or null/undefined for no arguments).",
      returns: "The called function’s result.",
      behavior:
        "Executes immediately; arrow functions keep lexical this. Large lists can hit argument-count limits.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply",
      kind: "JavaScript built-in",
    },
    "Function/bind": {
      title: "function.bind()",
      does: "Creates a function with a fixed receiver and optional leading arguments.",
      parameters:
        "thisArg fixes this for ordinary calls; later arguments are prepended.",
      returns: "A new bound function.",
      behavior: "Does not invoke the target yet; arrow this cannot be rebound.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind",
      kind: "JavaScript built-in",
    },
    "Function/call": {
      title: "function.call()",
      does: "Invokes a function with a chosen receiver.",
      parameters:
        "thisArg supplies this; remaining arguments are passed individually.",
      returns: "The called function’s result.",
      behavior:
        "Executes immediately; arrow functions ignore the replacement receiver.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call",
      kind: "JavaScript built-in",
    },
    "HTMLDialogElement/showModal": {
      title: "dialog.showModal()",
      does: "Opens a modal dialog in the top layer.",
      parameters: "No parameters.",
      returns: "undefined.",
      behavior:
        "Makes the rest of the document inert and manages initial focus; incompatible open state can throw.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal",
      kind: "Browser API",
    },
    "HTMLElement/focus": {
      title: "element.focus(options)",
      does: "Requests keyboard focus on an element.",
      parameters:
        "Optional options controls preventScroll and supported focusVisible behavior.",
      returns: "undefined.",
      behavior:
        "Can scroll the page; the element must be focusable and available to receive focus.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus",
      kind: "Browser API",
    },
    "HTMLFormControlsCollection/namedItem": {
      title: "form.elements.namedItem(name)",
      does: "Looks up form controls by name or id.",
      parameters: "name identifies a control or group.",
      returns: "An Element, RadioNodeList, or null.",
      behavior:
        "Do not assume a unique input unless the form markup guarantees it.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormControlsCollection/namedItem",
      kind: "Browser API",
    },
    "HTMLFormElement/reportValidity": {
      title: "form.reportValidity()",
      does: "Checks form constraints and reports failures to the user.",
      parameters: "No parameters.",
      returns: "true if all controls are valid; otherwise false.",
      behavior:
        "Can show browser UI and dispatch invalid events; it does not submit the form.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reportValidity",
      kind: "Browser API",
    },
    "HTMLInputElement/setCustomValidity": {
      title: "input.setCustomValidity(message)",
      does: "Sets a custom constraint-validation error.",
      parameters: "message is the error text; an empty string clears it.",
      returns: "undefined.",
      behavior:
        "A nonempty message makes the control invalid until cleared; this does not itself display the browser’s validation UI.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity",
      kind: "Browser API",
    },
    "History/replaceState": {
      title: "history.replaceState(state, unused, url)",
      does: "Replaces the current history entry’s state and optionally URL.",
      parameters:
        'state is structured-cloneable data; unused is conventionally ""; optional url must be same-origin.',
      returns: "undefined.",
      behavior:
        "Does not fetch/navigate or create a new history entry; invalid origin/state can throw.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState",
      kind: "Browser API",
    },
    "IDBDatabase/close": {
      title: "db.close()",
      does: "Requests closing a database connection.",
      parameters: "No parameters.",
      returns: "undefined.",
      behavior:
        "Prevents new transactions and closes after existing ones finish; helps unblock later version upgrades.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/close",
      kind: "Browser API",
    },
    "IDBDatabase/createObjectStore": {
      title: "db.createObjectStore(name, options)",
      does: "Creates a store in an upgrade transaction.",
      parameters:
        "name identifies the store; options.keyPath specifies an inline primary-key field.",
      returns: "An IDBObjectStore.",
      behavior:
        "Changes the schema and is only allowed during an active version-change transaction.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/createObjectStore",
      kind: "Browser API",
    },
    "IDBDatabase/transaction": {
      title: "db.transaction(storeNames, mode, options)",
      does: "Starts an IndexedDB transaction.",
      parameters:
        "storeNames selects accessible stores; mode is readonly/readwrite; optional options can specify durability.",
      returns: "An IDBTransaction.",
      behavior:
        "A readwrite transaction can change persistent data; individual request success is not the same as transaction completion.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/transaction",
      kind: "Browser API",
    },
    "IDBFactory/open": {
      title: "indexedDB.open(name, version)",
      does: "Requests an IndexedDB connection and schema version.",
      parameters:
        "name identifies the database; optional version is a positive integer.",
      returns: "An IDBOpenDBRequest, not a Promise.",
      behavior:
        "Completes through events; upgrades run onupgradeneeded and can be blocked by other open connections.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/IDBFactory/open",
      kind: "Browser API",
    },
    "IDBObjectStore/put": {
      title: "store.put(value, key)",
      does: "Queues insertion or replacement of a record.",
      parameters:
        "value is structured-cloneable data; key is used for out-of-line keys (omitted for the id keyPath here).",
      returns: "An IDBRequest whose result is the record key.",
      behavior:
        "Persistent write happens within the transaction; wait for transaction completion before reporting the write as successful.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/put",
      kind: "Browser API",
    },
    "IDBTransaction/objectStore": {
      title: "transaction.objectStore(name)",
      does: "Gets a store handle within this transaction.",
      parameters: "name must belong to the transaction’s store scope.",
      returns: "An IDBObjectStore.",
      behavior:
        "Throws for an unknown store or invalid transaction state; the handle is bound to that transaction.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction/objectStore",
      kind: "Browser API",
    },
    "Int32Array/Int32Array": {
      title: "new Int32Array(input)",
      does: "Creates a signed 32-bit typed view.",
      parameters:
        "buffer here supplies existing storage; optional offset/length restrict the view.",
      returns: "A new Int32Array.",
      behavior:
        "No copy for buffer input; use Atomics for coordinated shared-memory access.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array/Int32Array",
      kind: "JavaScript built-in",
    },
    "IntersectionObserver/IntersectionObserver": {
      title: "new IntersectionObserver(callback, options)",
      does: "Watches intersection with a root viewport/container.",
      parameters:
        "callback(entries, observer) handles records; optional options sets root, rootMargin, and threshold.",
      returns: "A new IntersectionObserver.",
      behavior:
        "Delivery is asynchronous and threshold-based; intersection is not proof that content was read or visually unobscured.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver",
      kind: "Browser API",
    },
    "IntersectionObserver/disconnect": {
      title: "observer.disconnect()",
      does: "Stops this observer’s subscriptions.",
      parameters: "No parameters.",
      returns: "undefined.",
      behavior:
        "Does not remove the observed elements; resume with observe when appropriate.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/disconnect",
      kind: "Browser API",
    },
    "IntersectionObserver/observe": {
      title: "observer.observe(target, options)",
      does: "Starts observing a target with this observer.",
      parameters:
        "target is the element/node; options selects observation details.",
      returns: "undefined.",
      behavior:
        "MutationObserver requires at least one enabled mutation type; resize/intersection use their own options and delivery rules.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/observe",
      kind: "Browser API",
    },
    "Intl/Collator": {
      title: "new Intl.Collator(locales, options)",
      does: "Creates a locale-aware string comparison service.",
      parameters:
        "locales selects language/region; options such as sensitivity choose comparison rules.",
      returns: "A configured Intl.Collator instance.",
      behavior:
        "Ordering depends on locale data; comparison results are signed, not guaranteed to be exactly -1/1.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator",
      kind: "JavaScript built-in",
    },
    "Intl/Collator/compare": {
      title: "collator.compare(left, right)",
      does: "Compares two strings according to locale rules.",
      parameters:
        "left/right are the strings supplied by the sorting callback.",
      returns: "A negative number, zero, or a positive number.",
      behavior:
        "The getter supplies a bound function, so passing collator.compare directly to toSorted is safe.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/compare",
      kind: "JavaScript built-in",
    },
    "Intl/DateTimeFormat": {
      title: "new Intl.DateTimeFormat(locales, options)",
      does: "Creates a locale-aware date/time formatter.",
      parameters:
        "locales selects language/region; options sets dateStyle, timeZone, and other display choices.",
      returns: "A configured Intl.DateTimeFormat instance.",
      behavior:
        "Output depends on locale data; UTC here removes host-timezone variation.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat",
      kind: "JavaScript built-in",
    },
    "Intl/DateTimeFormat/format": {
      title: "dateFormatter.format(value)",
      does: "Formats a date/timestamp using the configured locale/timezone.",
      parameters:
        "value is a Date or numeric timestamp; omitting it uses the current time.",
      returns: "A localized date/time string.",
      behavior:
        "Invalid date inputs throw RangeError; the formatter does not modify the Date.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format",
      kind: "JavaScript built-in",
    },
    "Intl/NumberFormat": {
      title: "new Intl.NumberFormat(locales, options)",
      does: "Creates a locale-aware numeric formatter.",
      parameters:
        "locales selects language/region; options sets style, currency, and related presentation choices.",
      returns: "A configured Intl.NumberFormat instance.",
      behavior:
        "Formatting changes presentation, not numeric precision or business rounding rules.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat",
      kind: "JavaScript built-in",
    },
    "Intl/NumberFormat/format": {
      title: "numberFormatter.format(value)",
      does: "Formats a number using the formatter’s locale/options.",
      parameters: "value is the number to display.",
      returns: "A localized string.",
      behavior:
        "Currency separators and spacing vary; the bound format function may be passed as a callback.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format",
      kind: "JavaScript built-in",
    },
    "Intl/PluralRules": {
      title: "new Intl.PluralRules(locales, options)",
      does: "Creates a locale-aware plural-category selector.",
      parameters:
        "locales selects language/region; optional options selects cardinal/ordinal rules.",
      returns: "A configured Intl.PluralRules instance.",
      behavior: "Returns grammatical categories rather than translated words.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules",
      kind: "JavaScript built-in",
    },
    "Intl/PluralRules/select": {
      title: "pluralRules.select(number)",
      does: "Selects a locale’s plural category.",
      parameters: "number is the quantity to classify.",
      returns: 'A category string such as "one" or "other".',
      behavior:
        "Categories differ by locale; this does not itself choose or translate a noun.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules/select",
      kind: "JavaScript built-in",
    },
    "Iterator/next": {
      title: "iterator.next()",
      does: "Advances an iterator by one step.",
      parameters: "No argument is needed for the Map-key iterator here.",
      returns: "An object containing value and done.",
      behavior: "Consumes iterator state; done becomes true after exhaustion.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols",
      kind: "JavaScript built-in",
    },
    "JSON/parse": {
      title: "JSON.parse(text, reviver)",
      does: "Parses JSON text into JavaScript values.",
      parameters:
        "text is JSON input; optional reviver(key, value) transforms parsed values.",
      returns: "The parsed value.",
      behavior:
        "Malformed JSON throws SyntaxError; dates remain strings. Parsing does not validate an application schema.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse",
      kind: "JavaScript built-in",
    },
    "JSON/stringify": {
      title: "JSON.stringify(value, replacer, space)",
      does: "Serializes supported values to JSON text.",
      parameters:
        "value is the input; optional replacer filters/transforms properties; space controls indentation.",
      returns: "A string, or undefined for unsupported top-level values.",
      behavior:
        "Cycles and ordinary BigInt values throw; functions/undefined are omitted in objects. Calls toJSON hooks, including Date’s ISO conversion.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify",
      kind: "JavaScript built-in",
    },
    "Map/Map": {
      title: "new Map(iterable)",
      does: "Creates an insertion-ordered key/value collection.",
      parameters: "Optional iterable supplies [key, value] pairs.",
      returns: "A new Map.",
      behavior:
        "Keys may be any value; object keys use identity and references are strong.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map",
      kind: "JavaScript built-in",
    },
    "Map/delete": {
      title: "map.delete(value)",
      does: "Removes an entry/member if present.",
      parameters: "The key (Map) or member value (Set/WeakSet) to remove.",
      returns: "true if an entry was removed; otherwise false.",
      behavior: "Mutates the collection; does not destroy the removed object.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete",
      kind: "JavaScript built-in",
    },
    "Map/get": {
      title: "map.get()",
      does: "Looks up the value associated with a key.",
      parameters: "key identifies the stored entry.",
      returns: "The stored value, or undefined when absent.",
      behavior:
        "Returned objects are not cloned; undefined can also be an explicitly stored value.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get",
      kind: "JavaScript built-in",
    },
    "Map/keys": {
      title: "map.keys()",
      does: "Iterates keys in insertion order.",
      parameters: "No parameters.",
      returns: "A new iterator.",
      behavior:
        "Iteration is live rather than an array snapshot; get its first result with next().",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys",
      kind: "JavaScript built-in",
    },
    "Map/set": {
      title: "map.set()",
      does: "Stores or replaces a key’s value.",
      parameters: "key identifies the entry; value is the value to store.",
      returns: "The same collection for chaining.",
      behavior:
        "Mutates the collection. Replacing a Map value does not move its key to the end.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set",
      kind: "JavaScript built-in",
    },
    "Math/floor": {
      title: "Math.floor(value)",
      does: "Rounds down toward negative infinity.",
      parameters: "Numeric inputs; max accepts multiple arguments.",
      returns: "A number.",
      behavior: "Negative fractions round away from zero; NaN remains NaN.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor",
      kind: "JavaScript built-in",
    },
    "Math/max": {
      title: "Math.max(...values)",
      does: "Selects the greatest numeric argument.",
      parameters: "Numeric inputs; max accepts multiple arguments.",
      returns: "A number.",
      behavior:
        "Coerces arguments to numbers; any NaN produces NaN; no arguments gives -Infinity.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max",
      kind: "JavaScript built-in",
    },
    "Math/round": {
      title: "Math.round(value)",
      does: "Rounds to the nearest integer.",
      parameters: "Numeric inputs; max accepts multiple arguments.",
      returns: "A number.",
      behavior:
        "Halfway cases round toward positive infinity; floating-point precision still applies.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round",
      kind: "JavaScript built-in",
    },
    "MutationObserver/MutationObserver": {
      title: "new MutationObserver(callback, options)",
      does: "Watches selected DOM mutations.",
      parameters:
        "callback(records, observer) receives batches of mutation records.",
      returns: "A new MutationObserver.",
      behavior:
        "Delivery is asynchronous; attribute changes need the attributes option, and descendants need subtree.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/MutationObserver",
      kind: "Browser API",
    },
    "MutationObserver/disconnect": {
      title: "observer.disconnect()",
      does: "Stops this observer’s subscriptions.",
      parameters: "No parameters.",
      returns: "undefined.",
      behavior:
        "Does not remove the observed elements; resume with observe when appropriate.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/disconnect",
      kind: "Browser API",
    },
    "MutationObserver/observe": {
      title: "observer.observe(target, options)",
      does: "Starts observing a target with this observer.",
      parameters:
        "target is the element/node; options selects observation details.",
      returns: "undefined.",
      behavior:
        "MutationObserver requires at least one enabled mutation type; resize/intersection use their own options and delivery rules.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe",
      kind: "Browser API",
    },
    "Node/cloneNode": {
      title: "node.cloneNode(deep)",
      does: "Copies a DOM node.",
      parameters: "deep=true includes descendant nodes.",
      returns: "A detached cloned Node.",
      behavior:
        "Does not copy listeners registered with addEventListener; copied IDs may need to be made unique.",
      source: "https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode",
      kind: "Browser API",
    },
    "Node/contains": {
      title: "node.contains(other)",
      does: "Tests whether a node contains another node.",
      parameters: "other is a Node or null.",
      returns: "A boolean.",
      behavior:
        "A node contains itself; useful for rejecting delegated events outside the intended container.",
      source: "https://developer.mozilla.org/en-US/docs/Web/API/Node/contains",
      kind: "Browser API",
    },
    "Number/Number": {
      title: "Number(value)",
      does: "Converts a value to a primitive number.",
      parameters: "value is the input to coerce.",
      returns: "A number, possibly NaN.",
      behavior:
        "Whitespace/empty strings become 0; invalid numeric text becomes NaN. Coercion is not validation.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number",
      kind: "JavaScript built-in",
    },
    "Number/isFinite": {
      title: "Number.isFinite(value)",
      does: "Tests whether the input is a finite number.",
      parameters: "value is the value to test.",
      returns: "A boolean.",
      behavior:
        "Does not coerce: numeric strings, NaN, and infinities return false.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite",
      kind: "JavaScript built-in",
    },
    "Number/isInteger": {
      title: "Number.isInteger(value)",
      does: "Tests whether a numeric value has no fractional part.",
      parameters: "value is the value to test.",
      returns: "A boolean.",
      behavior: "Does not coerce or guarantee safe-integer precision.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger",
      kind: "JavaScript built-in",
    },
    "Number/isNaN": {
      title: "Number.isNaN(value)",
      does: "Tests specifically for the numeric NaN value.",
      parameters: "value is the value to test.",
      returns: "A boolean.",
      behavior:
        "Does not coerce: nonnumeric strings return false, unlike global isNaN.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN",
      kind: "JavaScript built-in",
    },
    "Number/toFixed": {
      title: "number.toFixed(digits)",
      does: "Formats a number with a fixed number of fractional digits.",
      parameters: "digits is the decimal-place count (2 here).",
      returns: "A string, not a rounded numeric value.",
      behavior:
        "Binary floating-point rounding may surprise; out-of-range digits throw RangeError.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed",
      kind: "JavaScript built-in",
    },
    "Object/create": {
      title: "Object.create()",
      does: "Creates an object with a chosen prototype.",
      parameters:
        "prototype is an object or null; optional descriptors define own properties.",
      returns: "A new object.",
      behavior:
        "A null prototype has no inherited Object methods; no constructor is invoked.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create",
      kind: "JavaScript built-in",
    },
    "Object/defineProperty": {
      title: "Object.defineProperty()",
      does: "Defines or reconfigures one own property.",
      parameters:
        "object is the target; key is a string/symbol; descriptor specifies value/get/set and flags.",
      returns: "The same target object.",
      behavior:
        "Mutates the target. Omitted writable/enumerable/configurable flags default to false for a new property.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty",
      kind: "JavaScript built-in",
    },
    "Object/entries": {
      title: "Object.entries()",
      does: "Lists enumerable own string-keyed properties as pairs.",
      parameters: "object is the source value.",
      returns: "An array of [key, value] arrays.",
      behavior:
        "Ignores symbols/inherited/non-enumerable properties; evaluating values can invoke getters.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries",
      kind: "JavaScript built-in",
    },
    "Object/freeze": {
      title: "Object.freeze()",
      does: "Prevents extensions and locks own property descriptors.",
      parameters: "object is the target.",
      returns: "The same object.",
      behavior:
        "Shallow: nested objects stay mutable; forbidden writes may throw in strict mode.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze",
      kind: "JavaScript built-in",
    },
    "Object/fromEntries": {
      title: "Object.fromEntries()",
      does: "Builds an object from key/value pairs.",
      parameters: "iterable supplies [key, value] entries.",
      returns: "A new ordinary object.",
      behavior:
        "Later duplicate keys overwrite earlier ones; the values remain shared references.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries",
      kind: "JavaScript built-in",
    },
    "Object/getPrototypeOf": {
      title: "Object.getPrototypeOf()",
      does: "Reads an object’s prototype.",
      parameters: "object is the inspected value.",
      returns: "Its prototype object, or null.",
      behavior: "Does not list own properties or change inheritance.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf",
      kind: "JavaScript built-in",
    },
    "Object/hasOwn": {
      title: "Object.hasOwn()",
      does: "Checks for an own property.",
      parameters: "object is the target; key is a string/symbol property name.",
      returns: "A boolean.",
      behavior:
        "Does not search the prototype chain and works with null-prototype objects.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn",
      kind: "JavaScript built-in",
    },
    "Object/is": {
      title: "Object.is()",
      does: "Compares values with SameValue equality.",
      parameters: "left and right are the values to compare.",
      returns: "A boolean.",
      behavior:
        "NaN equals NaN, but +0 and -0 differ; objects still compare by identity.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is",
      kind: "JavaScript built-in",
    },
    "Object/isExtensible": {
      title: "Object.isExtensible()",
      does: "Checks whether new own properties may be added.",
      parameters: "object is the target.",
      returns: "A boolean.",
      behavior:
        "Does not imply that existing properties are writable or deeply mutable.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible",
      kind: "JavaScript built-in",
    },
    "Object/keys": {
      title: "Object.keys()",
      does: "Lists enumerable own string keys.",
      parameters: "object is the source value.",
      returns: "An array of strings.",
      behavior:
        "Excludes symbols and inherited/non-enumerable properties; this is not every possible property key.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys",
      kind: "JavaScript built-in",
    },
    "Object/preventExtensions": {
      title: "Object.preventExtensions()",
      does: "Prevents adding new own properties.",
      parameters: "object is the target.",
      returns: "The same object.",
      behavior:
        "Existing configurable/writable properties can still be deleted/edited; operation is irreversible on that object.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions",
      kind: "JavaScript built-in",
    },
    "Object/seal": {
      title: "Object.seal()",
      does: "Prevents adding/deleting properties and makes them non-configurable.",
      parameters: "object is the target.",
      returns: "The same object.",
      behavior: "Shallow; existing writable data properties can still change.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal",
      kind: "JavaScript built-in",
    },
    "Performance/clearMarks": {
      title: "performance.clearMarks()",
      does: "Removes stored mark entries.",
      parameters: "Optional name restricts which marks to remove.",
      returns: "undefined.",
      behavior:
        "Without a name removes all marks, potentially affecting other instrumentation.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Performance/clearMarks",
      kind: "Browser API",
    },
    "Performance/clearMeasures": {
      title: "performance.clearMeasures()",
      does: "Removes stored measurement entries.",
      parameters: "Optional name restricts which measures to remove.",
      returns: "undefined.",
      behavior:
        "Does not undo the measured work; without a name clears all measures.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Performance/clearMeasures",
      kind: "Browser API",
    },
    "Performance/mark": {
      title: "performance.mark()",
      does: "Records a named performance timestamp.",
      parameters:
        "name labels the mark; optional options sets startTime/detail.",
      returns: "A PerformanceMark.",
      behavior:
        "Adds an entry to the performance timeline; clear entries after collecting needed data.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark",
      kind: "Browser API",
    },
    "Performance/measure": {
      title: "performance.measure()",
      does: "Records elapsed time between performance boundaries.",
      parameters:
        "name labels the measurement; start/end here are existing mark names.",
      returns: "A PerformanceMeasure.",
      behavior:
        "Adds a timeline entry; missing named marks throw. Measures elapsed time, not a universal performance score.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure",
      kind: "Browser API",
    },
    "Performance/now": {
      title: "performance.now()",
      does: "Reads a monotonic elapsed-time clock.",
      parameters: "No parameters.",
      returns: "Milliseconds relative to the runtime’s time origin.",
      behavior:
        "Not a calendar timestamp; privacy settings can reduce precision.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Performance/now",
      kind: "Browser API",
    },
    "Promise/Promise": {
      title: "new Promise(executor)",
      does: "Creates a promise and supplies its settlement functions.",
      parameters:
        "executor(resolve, reject) runs immediately; its return value is ignored.",
      returns: "A pending or already-settled Promise.",
      behavior:
        "A synchronous executor throw rejects the promise; later async throws are not automatically caught by that executor.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise",
      kind: "JavaScript built-in",
    },
    "Promise/all": {
      title: "Promise.all()",
      does: "Waits for all input fulfillments.",
      parameters: "iterable supplies values/promises.",
      returns: "A promise for results in input order.",
      behavior:
        "Rejects on the first observed rejection; remaining operations are not cancelled.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all",
      kind: "JavaScript built-in",
    },
    "Promise/allSettled": {
      title: "Promise.allSettled()",
      does: "Collects every input outcome.",
      parameters: "iterable supplies values/promises.",
      returns: "A promise for ordered {status, value/reason} records.",
      behavior:
        "Input rejection becomes a record rather than rejecting the aggregate; no cancellation occurs.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled",
      kind: "JavaScript built-in",
    },
    "Promise/any": {
      title: "Promise.any()",
      does: "Chooses the first fulfilled input.",
      parameters: "iterable supplies candidate values/promises.",
      returns: "A promise for the first fulfillment.",
      behavior:
        "Rejects with AggregateError if all reject (including empty input); losing operations continue.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any",
      kind: "JavaScript built-in",
    },
    "Promise/catch": {
      title: "promise.catch()",
      does: "Registers a rejection handler.",
      parameters:
        "onRejected(reason) can recover by returning a value or propagate by throwing.",
      returns: "A new Promise.",
      behavior:
        "Equivalent to then(undefined, handler); returning normally turns rejection into fulfillment.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch",
      kind: "JavaScript built-in",
    },
    "Promise/finally": {
      title: "promise.finally()",
      does: "Registers cleanup after either outcome.",
      parameters: "onFinally() receives no outcome arguments.",
      returns: "A new Promise.",
      behavior:
        "Usually preserves the original outcome; a thrown error or rejected returned promise replaces it.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally",
      kind: "JavaScript built-in",
    },
    "Promise/race": {
      title: "Promise.race()",
      does: "Adopts the first input to settle.",
      parameters: "iterable supplies competing values/promises.",
      returns: "A promise for the first fulfillment or rejection.",
      behavior:
        "Does not cancel losing operations; an empty iterable leaves the result pending.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race",
      kind: "JavaScript built-in",
    },
    "Promise/reject": {
      title: "Promise.reject()",
      does: "Creates a rejected promise.",
      parameters: "reason is the rejection value.",
      returns: "A rejected Promise.",
      behavior:
        "Does not adopt a promise supplied as reason; handle rejection to avoid unhandled-rejection reports.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject",
      kind: "JavaScript built-in",
    },
    "Promise/rejectFunction": {
      title: "reject(reason)",
      does: "Rejects the promise created by the enclosing executor.",
      parameters: "reason is the rejection value, usually an Error.",
      returns: "undefined.",
      behavior:
        "First settlement wins; this does not throw synchronously to the caller.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise",
      kind: "JavaScript built-in",
    },
    "Promise/resolve": {
      title: "Promise.resolve()",
      does: "Wraps/adopts a value as a promise.",
      parameters: "value is a value, promise, or thenable.",
      returns: "A promise adopting the input outcome.",
      behavior:
        "Reactions still run asynchronously; an existing promise of the same constructor can be returned unchanged.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve",
      kind: "JavaScript built-in",
    },
    "Promise/resolveFunction": {
      title: "resolve(value)",
      does: "Resolves the promise created by the enclosing executor.",
      parameters: "value is the success value; omitted value means undefined.",
      returns: "undefined.",
      behavior:
        "First settlement wins; a promise/thenable value is adopted, so resolution need not mean immediate fulfillment.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise",
      kind: "JavaScript built-in",
    },
    "Promise/then": {
      title: "promise.then()",
      does: "Registers fulfillment and optional rejection handlers.",
      parameters:
        "onFulfilled(value) and optional onRejected(reason) transform the outcome.",
      returns: "A new Promise.",
      behavior:
        "Callbacks run as microtasks; a returned promise is adopted and a thrown error rejects the new promise.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then",
      kind: "JavaScript built-in",
    },
    "Proxy/Proxy": {
      title: "new Proxy(target, handler)",
      does: "Creates an object wrapper that intercepts supported operations.",
      parameters:
        "target is the wrapped object; handler supplies traps such as get/set.",
      returns: "A Proxy.",
      behavior:
        "Traps must respect language invariants; the proxy is a distinct identity and may trigger code on ordinary property access.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy",
      kind: "JavaScript built-in",
    },
    "RangeError/RangeError": {
      title: "new RangeError(message)",
      does: "Creates an error object describing an out-of-range value.",
      parameters:
        "message is the diagnostic text; optional options.cause records an underlying error.",
      returns: "A new RangeError instance.",
      behavior:
        "Construction alone does not throw; throw or promise rejection propagates it.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError/RangeError",
      kind: "JavaScript built-in",
    },
    "Reflect/get": {
      title: "Reflect.get(target, key, receiver)",
      does: "Performs the underlying property read.",
      parameters:
        "target is searched; key is the property name/symbol; receiver becomes this in getters.",
      returns: "The property value or undefined.",
      behavior:
        "Can invoke a getter; forwarding receiver preserves accessor behavior through a proxy.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get",
      kind: "JavaScript built-in",
    },
    "Reflect/ownKeys": {
      title: "Reflect.ownKeys(target)",
      does: "Lists all own property keys.",
      parameters: "target is the inspected object.",
      returns: "An array of strings and symbols.",
      behavior:
        "Includes non-enumerable keys unlike Object.keys; does not include inherited properties.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys",
      kind: "JavaScript built-in",
    },
    "Reflect/set": {
      title: "Reflect.set(target, key, value, receiver)",
      does: "Performs the underlying property assignment.",
      parameters:
        "target/key identify the property; value is assigned; receiver controls setters and where data may be defined.",
      returns: "A boolean indicating success.",
      behavior:
        "May mutate state or invoke setters; a proxy set trap must return a success boolean.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/set",
      kind: "JavaScript built-in",
    },
    "RegExp/exec": {
      title: "regexp.exec(text)",
      does: "Finds the next pattern match and its captures.",
      parameters: "text is the input string.",
      returns: "A match array with index/groups, or null.",
      behavior:
        "With g or y, reads/updates lastIndex; repeated calls can walk through matches.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec",
      kind: "JavaScript built-in",
    },
    "RegExp/test": {
      title: "regexp.test(text)",
      does: "Tests whether a pattern matches a string.",
      parameters: "text is the input string.",
      returns: "A boolean.",
      behavior: "With g or y, updates lastIndex, so repeated tests can differ.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test",
      kind: "JavaScript built-in",
    },
    "Request/Request": {
      title: "new Request(input, options)",
      does: "Creates a request description.",
      parameters:
        "input is a URL or Request; options sets method, headers, body, and related options.",
      returns: "A Request.",
      behavior:
        "Does not send anything until fetch; request bodies are streams and cannot be consumed repeatedly without cloning first.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Request/Request",
      kind: "Browser API",
    },
    "ResizeObserver/ResizeObserver": {
      title: "new ResizeObserver(callback, options)",
      does: "Watches changes to element dimensions.",
      parameters: "callback(entries, observer) receives resize records.",
      returns: "A new ResizeObserver.",
      behavior:
        "DOM writes in callbacks can cause resize feedback loops; cleanup with disconnect.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/ResizeObserver",
      kind: "Browser API",
    },
    "ResizeObserver/disconnect": {
      title: "observer.disconnect()",
      does: "Stops this observer’s subscriptions.",
      parameters: "No parameters.",
      returns: "undefined.",
      behavior:
        "Does not remove the observed elements; resume with observe when appropriate.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/disconnect",
      kind: "Browser API",
    },
    "ResizeObserver/observe": {
      title: "observer.observe(target, options)",
      does: "Starts observing a target with this observer.",
      parameters:
        "target is the element/node; options selects observation details.",
      returns: "undefined.",
      behavior:
        "MutationObserver requires at least one enabled mutation type; resize/intersection use their own options and delivery rules.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/observe",
      kind: "Browser API",
    },
    "Response/Response": {
      title: "new Response(body, options)",
      does: "Creates a response object locally.",
      parameters:
        "body is supported response content; options sets status, statusText, and headers.",
      returns: "A Response.",
      behavior:
        "Does not send a network request; here it supplies the service-worker fallback response.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Response/Response",
      kind: "Browser API",
    },
    "Response/json": {
      title: "response.json()",
      does: "Consumes the response body and parses JSON.",
      parameters: "No parameters.",
      returns: "A Promise for the parsed JavaScript value.",
      behavior:
        "Body consumption is one-shot; malformed JSON rejects and parsed data still needs schema validation.",
      source: "https://developer.mozilla.org/en-US/docs/Web/API/Response/json",
      kind: "Browser API",
    },
    "ServiceWorkerContainer/register": {
      title: "navigator.serviceWorker.register(scriptURL, options)",
      does: "Registers or updates a service worker.",
      parameters:
        "scriptURL identifies its script; options may set scope/type.",
      returns: "A Promise for a ServiceWorkerRegistration.",
      behavior:
        "Requires a secure context (localhost is allowed); registration does not mean the current page is already controlled.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register",
      kind: "Browser API",
    },
    "Set/Set": {
      title: "new Set(iterable)",
      does: "Creates an insertion-ordered collection of unique values.",
      parameters: "Optional iterable supplies the initial values.",
      returns: "A new Set.",
      behavior:
        "Uses SameValueZero equality; duplicates collapse and object references are retained strongly.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set",
      kind: "JavaScript built-in",
    },
    "Set/add": {
      title: "set.add(value)",
      does: "Adds a value to the collection.",
      parameters: "value is the member to store.",
      returns: "The same collection.",
      behavior:
        "Mutates membership; adding the same member twice does not create duplicates.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add",
      kind: "JavaScript built-in",
    },
    "Set/delete": {
      title: "set.delete(value)",
      does: "Removes an entry/member if present.",
      parameters: "The key (Map) or member value (Set/WeakSet) to remove.",
      returns: "true if an entry was removed; otherwise false.",
      behavior: "Mutates the collection; does not destroy the removed object.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete",
      kind: "JavaScript built-in",
    },
    "Set/has": {
      title: "set.has(value)",
      does: "Checks membership.",
      parameters: "value is the member to test.",
      returns: "A boolean.",
      behavior: "Objects compare by identity; no mutation occurs.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has",
      kind: "JavaScript built-in",
    },
    "SharedArrayBuffer/SharedArrayBuffer": {
      title: "new SharedArrayBuffer(input)",
      does: "Allocates binary storage that contexts can share.",
      parameters: "length is the number of bytes.",
      returns: "A new SharedArrayBuffer.",
      behavior:
        "Browser use requires appropriate cross-origin isolation; coordinate concurrent access with an atomic protocol.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer/SharedArrayBuffer",
      kind: "JavaScript built-in",
    },
    "Storage/setItem": {
      title: "storage.setItem(key, value)",
      does: "Stores a persistent string value in Web Storage.",
      parameters: "key identifies the entry; value is converted to a string.",
      returns: "undefined.",
      behavior:
        "Synchronous; may throw for quota/security restrictions. JSON serialization is separate.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem",
      kind: "Browser API",
    },
    "String/String": {
      title: "String(value)",
      does: "Converts a value to a primitive string.",
      parameters: "value is the value to represent as text.",
      returns: "A string.",
      behavior:
        "Objects can run conversion hooks; unlike implicit string coercion, String(symbol) is allowed.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/String",
      kind: "JavaScript built-in",
    },
    "String/includes": {
      title: "string.includes()",
      does: "Tests whether a substring occurs.",
      parameters:
        "searchString is the text to find; optional position is the starting index.",
      returns: "A boolean.",
      behavior:
        "Case-sensitive; an empty search string matches; regular expressions are rejected.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes",
      kind: "JavaScript built-in",
    },
    "String/match": {
      title: "string.match()",
      does: "Matches text against a pattern.",
      parameters: "regexp is the search pattern.",
      returns: "A match array or null.",
      behavior:
        "Without g the array includes captures/index; with g it contains whole matches and omits capture details.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match",
      kind: "JavaScript built-in",
    },
    "String/matchAll": {
      title: "string.matchAll()",
      does: "Iterates regex matches including capture groups.",
      parameters: "regexp is a global regular expression.",
      returns: "An iterator of match arrays.",
      behavior:
        "A RegExp argument must have g; spreading the iterator consumes it. The original regex lastIndex is not advanced.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll",
      kind: "JavaScript built-in",
    },
    "String/replace": {
      title: "string.replace()",
      does: "Replaces matching text.",
      parameters:
        "pattern is a string/RegExp; replacement is text or a callback.",
      returns: "A new string.",
      behavior:
        "A non-global pattern replaces only the first match; $1 inserts capture group 1 in this example.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
      kind: "JavaScript built-in",
    },
    "String/slice": {
      title: "string.slice()",
      does: "Copies a substring without changing the input.",
      parameters:
        "start is inclusive; optional end is exclusive; negative indices count from the end.",
      returns: "A string.",
      behavior:
        "Omitted end means the remaining string; indices count UTF-16 code units.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice",
      kind: "JavaScript built-in",
    },
    "String/startsWith": {
      title: "string.startsWith()",
      does: "Tests the beginning of a string.",
      parameters:
        "searchString is the required prefix; optional position selects where to begin.",
      returns: "A boolean.",
      behavior:
        "Case-sensitive; does not validate a URL origin or path boundary by itself.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith",
      kind: "JavaScript built-in",
    },
    "String/toLowerCase": {
      title: "string.toLowerCase()",
      does: "Converts letters to their default Unicode lowercase mapping.",
      parameters: "No parameters.",
      returns: "A new string.",
      behavior:
        "Not locale-specific; use locale-aware APIs when language-specific case rules matter.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase",
      kind: "JavaScript built-in",
    },
    "String/trim": {
      title: "string.trim()",
      does: "Removes leading and trailing whitespace.",
      parameters: "No parameters.",
      returns: "A new string.",
      behavior:
        "Leaves internal whitespace unchanged and does not modify the original string.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim",
      kind: "JavaScript built-in",
    },
    "Symbol/Symbol": {
      title: "Symbol(description)",
      does: "Creates a unique symbol usable as an object key.",
      parameters: "Optional description labels the symbol for debugging.",
      returns: "A new primitive symbol.",
      behavior:
        "Equal descriptions do not make symbols equal; call without new.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/Symbol",
      kind: "JavaScript built-in",
    },
    "TypeError/TypeError": {
      title: "new TypeError(message)",
      does: "Creates an error object describing an invalid value type.",
      parameters:
        "message is the diagnostic text; optional options.cause records an underlying error.",
      returns: "A new TypeError instance.",
      behavior:
        "Construction alone does not throw; throw or promise rejection propagates it.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError/TypeError",
      kind: "JavaScript built-in",
    },
    "TypedArray/reduce": {
      title: "typedArray.reduce(callback, initialValue)",
      does: "Folds typed-array values into an accumulated result.",
      parameters:
        "callback(accumulator, value, index, array) computes the next result; initialValue is 0 here.",
      returns: "The final accumulator.",
      behavior:
        "Reads the typed view without copying it; an empty input without an initialValue throws.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/reduce",
      kind: "JavaScript built-in",
    },
    "TypedArray/slice": {
      title: "typedArray.slice(start, end)",
      does: "Copies a range of typed-array elements.",
      parameters:
        "Optional start is inclusive and end is exclusive; omitted arguments copy the entire view.",
      returns: "A new typed array with separate storage.",
      behavior:
        "Unlike subarray, modifying this result does not change the original backing bytes.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice",
      kind: "JavaScript built-in",
    },
    "URL/URL": {
      title: "new URL(input, base)",
      does: "Parses an absolute URL or resolves a relative URL.",
      parameters:
        "input is URL text; base supplies an absolute base for relative input.",
      returns: "A URL object.",
      behavior:
        "Invalid input throws TypeError; constructing a URL does not navigate or fetch.",
      source: "https://developer.mozilla.org/en-US/docs/Web/API/URL/URL",
      kind: "Browser API",
    },
    "URLSearchParams/set": {
      title: "url.searchParams.set(name, value)",
      does: "Sets a URL query parameter.",
      parameters: "name identifies the parameter; value is its string value.",
      returns: "undefined.",
      behavior:
        "Replaces duplicate entries for that name and serializes/encodes values; mutates the URL object, not browser history.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/set",
      kind: "Browser API",
    },
    "Uint32Array/Uint32Array": {
      title: "new Uint32Array(input)",
      does: "Creates an unsigned 32-bit typed view or copies input elements.",
      parameters:
        "A buffer shares storage; an iterable/array supplies elements; a number sets the element count.",
      returns: "A new Uint32Array.",
      behavior:
        "Uses platform byte order; byte offsets and buffer length must satisfy alignment constraints.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array/Uint32Array",
      kind: "JavaScript built-in",
    },
    "Uint8Array/Uint8Array": {
      title: "new Uint8Array(input)",
      does: "Creates an unsigned 8-bit typed view or copies input elements.",
      parameters:
        "A buffer shares storage; an iterable/array supplies copied elements; a number allocates that many elements.",
      returns: "A new Uint8Array.",
      behavior:
        "Buffer inputs share bytes; element values are converted to the target numeric representation.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/Uint8Array",
      kind: "JavaScript built-in",
    },
    "WeakMap/WeakMap": {
      title: "new WeakMap(iterable)",
      does: "Creates a weakly held key/value collection.",
      parameters: "Optional iterable supplies key/value pairs.",
      returns: "A new WeakMap.",
      behavior:
        "Keys must be objects or non-registered symbols; keys are not enumerable and may be garbage-collected.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/WeakMap",
      kind: "JavaScript built-in",
    },
    "WeakMap/get": {
      title: "weakmap.get()",
      does: "Looks up the value associated with a key.",
      parameters: "key identifies the stored entry.",
      returns: "The stored value, or undefined when absent.",
      behavior:
        "Returned objects are not cloned; undefined can also be an explicitly stored value.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/get",
      kind: "JavaScript built-in",
    },
    "WeakMap/set": {
      title: "weakmap.set()",
      does: "Stores or replaces a key’s value.",
      parameters: "key identifies the entry; value is the value to store.",
      returns: "The same collection for chaining.",
      behavior:
        "Mutates the collection. Replacing a Map value does not move its key to the end.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/set",
      kind: "JavaScript built-in",
    },
    "WeakSet/WeakSet": {
      title: "new WeakSet(iterable)",
      does: "Creates a weakly held membership collection.",
      parameters: "Optional iterable supplies weakly holdable values.",
      returns: "A new WeakSet.",
      behavior:
        "Objects/non-registered symbols can be members; no enumeration or reliable size is exposed.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/WeakSet",
      kind: "JavaScript built-in",
    },
    "WeakSet/add": {
      title: "weakset.add(value)",
      does: "Adds a value to the collection.",
      parameters: "value is the member to store.",
      returns: "The same collection.",
      behavior:
        "Mutates membership; adding the same member twice does not create duplicates.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/add",
      kind: "JavaScript built-in",
    },
    "WeakSet/has": {
      title: "weakset.has(value)",
      does: "Checks membership.",
      parameters: "value is the member to test.",
      returns: "A boolean.",
      behavior: "Objects compare by identity; no mutation occurs.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/has",
      kind: "JavaScript built-in",
    },
    "Window/cancelIdleCallback": {
      title: "cancelIdleCallback(handle)",
      does: "Cancels pending idle work.",
      parameters: "handle is an ID from requestIdleCallback.",
      returns: "undefined.",
      behavior:
        "Does not undo work already executed; only call when the API is available.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelIdleCallback",
      kind: "Browser API",
    },
    "Window/clearInterval": {
      title: "clearInterval(timer)",
      does: "Stops future runs of an interval.",
      parameters: "timer is the handle returned by setInterval.",
      returns: "undefined.",
      behavior:
        "Does not interrupt a callback already running or cancel async work that callback started.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Window/clearInterval",
      kind: "Browser API",
    },
    "Window/clearTimeout": {
      title: "clearTimeout(timer)",
      does: "Cancels a pending timeout.",
      parameters: "timer is the handle returned by setTimeout.",
      returns: "undefined.",
      behavior:
        "An unknown/already-fired handle is harmless; cannot undo a callback already executing.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Window/clearTimeout",
      kind: "Browser API",
    },
    "Window/fetch": {
      title: "fetch(input, options)",
      does: "Starts a network request.",
      parameters:
        "input is a URL or Request; options sets method, headers, body, signal, and other request behavior.",
      returns: "A Promise for a Response.",
      behavior:
        "HTTP 4xx/5xx normally fulfill, so check ok/status. Network/CORS/abort failures reject; abort is not server-side rollback.",
      source: "https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch",
      kind: "Browser API",
    },
    "Window/matchMedia": {
      title: "matchMedia(query)",
      does: "Evaluates a CSS media query.",
      parameters: "query is the media-query string.",
      returns: "A MediaQueryList with a current matches flag.",
      behavior:
        "The flag can change; this example checks it when clicked rather than subscribing to change events.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia",
      kind: "Browser API",
    },
    "Window/queueMicrotask": {
      title: "queueMicrotask(callback)",
      does: "Queues work for the microtask checkpoint.",
      parameters: "callback is a no-argument function.",
      returns: "undefined.",
      behavior:
        "Runs after the current stack and before the next task; recursive microtasks can delay rendering.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask",
      kind: "Browser API",
    },
    "Window/requestIdleCallback": {
      title: "requestIdleCallback(callback, options)",
      does: "Schedules low-priority work during an idle opportunity.",
      parameters:
        "callback receives an IdleDeadline; options.timeout bounds how long it may wait.",
      returns: "An idle callback ID.",
      behavior:
        "Not universally supported; callbacks should remain small. A timeout can run the work even without idle time.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback",
      kind: "Browser API",
    },
    "Window/setInterval": {
      title: "setInterval(callback, delay)",
      does: "Schedules repeated callback attempts.",
      parameters:
        "callback is the work; delay is milliseconds between scheduled runs.",
      returns: "An interval identifier in browsers (a Timeout object in Node).",
      behavior:
        "Timing is not exact; it does not wait for an async callback’s promise, so asynchronous work can overlap.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval",
      kind: "Browser API",
    },
    "Window/setTimeout": {
      title: "setTimeout(callback, delay)",
      does: "Schedules a callback once after a minimum delay.",
      parameters:
        "callback is the work; delay is milliseconds; later arguments are forwarded to the callback.",
      returns: "A timer identifier in browsers (a Timeout object in Node).",
      behavior:
        "Does not block. Zero is not immediate; busy event loops and background throttling can delay execution.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout",
      kind: "Browser API",
    },
    "Worker/Worker": {
      title: "new Worker(url, options)",
      does: "Starts a dedicated worker in another execution context.",
      parameters:
        'url identifies its script; options.type="module" selects an ES module.',
      returns: "A Worker.",
      behavior:
        "Starts loading/execution; cannot access the page DOM and can fail due to origin, CSP, or script errors.",
      source: "https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker",
      kind: "Browser API",
    },
    "Worker/postMessage": {
      title: "worker.postMessage(message, transfer)",
      does: "Sends a message to a worker.",
      parameters:
        "message is structured-cloneable data; optional transfer lists transferable objects.",
      returns: "undefined.",
      behavior:
        "Transferring the buffer detaches it from the sender; shared buffers are shared rather than transferred.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage",
      kind: "Browser API",
    },
    "Worker/terminate": {
      title: "worker.terminate()",
      does: "Stops the worker immediately.",
      parameters: "No parameters.",
      returns: "undefined.",
      behavior:
        "Pending work/messages can be lost; the worker is not given a normal cleanup opportunity.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Worker/terminate",
      kind: "Browser API",
    },
    "console/log": {
      title: "console.log(...values)",
      does: "Writes diagnostic values to the developer console.",
      parameters: "Any number of values to inspect.",
      returns: "undefined.",
      behavior:
        "Output is a side effect; developer tools may inspect objects lazily rather than preserving an immutable snapshot.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/console/log_static",
      kind: "Runtime console",
    },
    import: {
      title: "import(specifier)",
      does: "Loads an ES module dynamically.",
      parameters: "specifier identifies the module to resolve/load.",
      returns: "A Promise for the module namespace object.",
      behavior:
        "May load/evaluate module code and reject; modules are cached. This is language syntax rather than an ordinary function.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import",
      kind: "Language operation",
    },
    "node/fs/mkdtemp": {
      title: "mkdtemp(prefix)",
      does: "Creates a uniquely named temporary directory.",
      parameters:
        "prefix is the desired path prefix; optional options chooses the returned encoding.",
      returns: "A Promise for the created directory path.",
      behavior: "Writes to the filesystem; use an explicit cleanup lifecycle.",
      source: "https://nodejs.org/api/fs.html#fspromisesmkdtempprefix-options",
      kind: "Node.js API",
    },
    "node/fs/readFile": {
      title: "readFile(path, options)",
      does: "Reads the complete contents of a file.",
      parameters:
        "path identifies the file; options here requests utf8 decoding.",
      returns: "A Promise for a string with encoding, otherwise a Buffer.",
      behavior:
        "Performs I/O and loads the whole file into memory; failures reject.",
      source: "https://nodejs.org/api/fs.html#fspromisesreadfilepath-options",
      kind: "Node.js API",
    },
    "node/fs/rm": {
      title: "rm(path, options)",
      does: "Removes a filesystem path.",
      parameters:
        "path is the target; recursive=true permits directory contents; force=true ignores a missing target.",
      returns: "A Promise fulfilled with undefined.",
      behavior:
        "Deletes data; here the target is only the newly created temporary directory. Other filesystem errors can still reject.",
      source: "https://nodejs.org/api/fs.html#fspromisesrmpath-options",
      kind: "Node.js API",
    },
    "node/fs/writeFile": {
      title: "writeFile(path, data, options)",
      does: "Writes data to a file.",
      parameters:
        "path identifies the file; data is the content; options here is the utf8 encoding.",
      returns: "A Promise fulfilled with undefined.",
      behavior:
        "Creates/overwrites by default; failures reject. Avoid concurrent writes to the same file.",
      source:
        "https://nodejs.org/api/fs.html#fspromiseswritefilefile-data-options",
      kind: "Node.js API",
    },
    "node/os/tmpdir": {
      title: "tmpdir()",
      does: "Reads the runtime’s temporary-directory path.",
      parameters: "No parameters.",
      returns: "A path string.",
      behavior: "Does not create a private directory; use mkdtemp for that.",
      source: "https://nodejs.org/api/os.html#ostmpdir",
      kind: "Node.js API",
    },
    "node/path/join": {
      title: "join(...paths)",
      does: "Combines path segments using the host platform’s separators.",
      parameters: "...paths are string path segments.",
      returns: "A normalized path string.",
      behavior: "Does not create directories or check filesystem existence.",
      source: "https://nodejs.org/api/path.html#pathjoinpaths",
      kind: "Node.js API",
    },
    structuredClone: {
      title: "structuredClone(value, options)",
      does: "Deep-copies supported structured-clone data.",
      parameters:
        "value is the source; optional transfer lists transferable objects.",
      returns: "A separate cloned value.",
      behavior:
        "Functions/DOM nodes cannot be cloned. Without transfer, this example leaves the original intact.",
      source:
        "https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone",
      kind: "Runtime API",
    },
  },
  examples: [
    {
      chapter: 1,
      lesson: 0,
      file: 0,
      sourceHash: "b6cdbb1f",
      uses: [
        {
          api: "Document/querySelector",
          start: 112,
          end: 125,
          line: 3,
        },
        {
          api: "EventTarget/addEventListener",
          start: 146,
          end: 162,
          line: 4,
        },
        {
          api: "Document/querySelector",
          start: 193,
          end: 206,
          line: 5,
        },
      ],
    },
    {
      chapter: 1,
      lesson: 1,
      file: 0,
      sourceHash: "8cd691b6",
      uses: [
        {
          api: "Number/Number",
          start: 130,
          end: 136,
          line: 4,
        },
        {
          api: "console/log",
          start: 191,
          end: 194,
          line: 6,
        },
        {
          api: "Boolean/Boolean",
          start: 216,
          end: 223,
          line: 6,
        },
        {
          api: "console/log",
          start: 258,
          end: 261,
          line: 7,
        },
        {
          api: "console/log",
          start: 307,
          end: 310,
          line: 8,
        },
        {
          api: "Object/is",
          start: 318,
          end: 320,
          line: 8,
        },
        {
          api: "Object/is",
          start: 339,
          end: 341,
          line: 8,
        },
        {
          api: "console/log",
          start: 374,
          end: 377,
          line: 9,
        },
        {
          api: "Symbol/Symbol",
          start: 395,
          end: 401,
          line: 9,
        },
      ],
    },
    {
      chapter: 1,
      lesson: 2,
      file: 0,
      sourceHash: "7d1e017e",
      uses: [
        {
          api: "console/log",
          start: 174,
          end: 177,
          line: 7,
        },
        {
          api: "Object/entries",
          start: 305,
          end: 312,
          line: 13,
        },
        {
          api: "console/log",
          start: 338,
          end: 341,
          line: 14,
        },
        {
          api: "Number/isInteger",
          start: 394,
          end: 403,
          line: 16,
        },
        {
          api: "console/log",
          start: 469,
          end: 472,
          line: 19,
        },
      ],
    },
    {
      chapter: 2,
      lesson: 0,
      file: 0,
      sourceHash: "d17554f8",
      uses: [
        {
          api: "console/log",
          start: 8,
          end: 11,
          line: 1,
        },
        {
          api: "Array/reduce",
          start: 198,
          end: 204,
          line: 8,
        },
        {
          api: "console/log",
          start: 286,
          end: 289,
          line: 12,
        },
        {
          api: "console/log",
          start: 448,
          end: 451,
          line: 21,
        },
      ],
    },
    {
      chapter: 2,
      lesson: 1,
      file: 0,
      sourceHash: "c661ff43",
      uses: [
        {
          api: "Array/flatMap",
          start: 46,
          end: 53,
          line: 2,
        },
        {
          api: "console/log",
          start: 203,
          end: 206,
          line: 8,
        },
        {
          api: "console/log",
          start: 322,
          end: 325,
          line: 12,
        },
      ],
    },
    {
      chapter: 3,
      lesson: 0,
      file: 0,
      sourceHash: "9e3eb7c8",
      uses: [
        {
          api: "Array/filter",
          start: 155,
          end: 161,
          line: 6,
        },
        {
          api: "Array/map",
          start: 191,
          end: 194,
          line: 7,
        },
        {
          api: "String/trim",
          start: 249,
          end: 253,
          line: 9,
        },
        {
          api: "String/toLowerCase",
          start: 256,
          end: 267,
          line: 9,
        },
        {
          api: "Array/reduce",
          start: 301,
          end: 307,
          line: 11,
        },
        {
          api: "console/log",
          start: 353,
          end: 356,
          line: 12,
        },
        {
          api: "Number/isFinite",
          start: 390,
          end: 398,
          line: 12,
        },
        {
          api: "console/log",
          start: 434,
          end: 437,
          line: 13,
        },
        {
          api: "Number/isNaN",
          start: 445,
          end: 450,
          line: 13,
        },
        {
          api: "Number/Number",
          start: 451,
          end: 457,
          line: 13,
        },
        {
          api: "Math/max",
          start: 481,
          end: 484,
          line: 13,
        },
      ],
    },
    {
      chapter: 3,
      lesson: 1,
      file: 0,
      sourceHash: "17b219f7",
      uses: [
        {
          api: "console/log",
          start: 332,
          end: 335,
          line: 7,
        },
      ],
    },
    {
      chapter: 3,
      lesson: 2,
      file: 0,
      sourceHash: "12028e6b",
      uses: [
        {
          api: "Date/Date",
          start: 20,
          end: 24,
          line: 1,
        },
        {
          api: "Intl/DateTimeFormat",
          start: 72,
          end: 86,
          line: 2,
        },
        {
          api: "Intl/NumberFormat",
          start: 166,
          end: 178,
          line: 6,
        },
        {
          api: "console/log",
          start: 241,
          end: 244,
          line: 10,
        },
        {
          api: "Intl/DateTimeFormat/format",
          start: 250,
          end: 256,
          line: 10,
        },
        {
          api: "Intl/NumberFormat/format",
          start: 273,
          end: 279,
          line: 10,
        },
        {
          api: "JSON/stringify",
          start: 306,
          end: 315,
          line: 11,
        },
        {
          api: "JSON/parse",
          start: 368,
          end: 373,
          line: 12,
        },
        {
          api: "Number/isFinite",
          start: 428,
          end: 436,
          line: 13,
        },
        {
          api: "TypeError/TypeError",
          start: 463,
          end: 472,
          line: 14,
        },
        {
          api: "console/log",
          start: 500,
          end: 503,
          line: 15,
        },
      ],
    },
    {
      chapter: 4,
      lesson: 0,
      file: 0,
      sourceHash: "d04eaa73",
      uses: [
        {
          api: "console/log",
          start: 54,
          end: 57,
          line: 3,
        },
        {
          api: "console/log",
          start: 149,
          end: 152,
          line: 7,
        },
        {
          api: "console/log",
          start: 184,
          end: 187,
          line: 9,
        },
        {
          api: "console/log",
          start: 308,
          end: 311,
          line: 14,
        },
      ],
    },
    {
      chapter: 4,
      lesson: 1,
      file: 0,
      sourceHash: "d76124cc",
      uses: [
        {
          api: "console/log",
          start: 159,
          end: 162,
          line: 6,
        },
        {
          api: "Array/push",
          start: 281,
          end: 285,
          line: 8,
        },
        {
          api: "console/log",
          start: 308,
          end: 311,
          line: 9,
        },
        {
          api: "Array/map",
          start: 322,
          end: 325,
          line: 9,
        },
      ],
    },
    {
      chapter: 4,
      lesson: 2,
      file: 0,
      sourceHash: "1b2d2efb",
      uses: [
        {
          api: "console/log",
          start: 135,
          end: 138,
          line: 8,
        },
        {
          api: "Function/call",
          start: 167,
          end: 171,
          line: 8,
        },
        {
          api: "console/log",
          start: 204,
          end: 207,
          line: 9,
        },
        {
          api: "Function/apply",
          start: 219,
          end: 224,
          line: 9,
        },
        {
          api: "Function/bind",
          start: 272,
          end: 276,
          line: 10,
        },
        {
          api: "console/log",
          start: 292,
          end: 295,
          line: 11,
        },
        {
          api: "Function/call",
          start: 397,
          end: 401,
          line: 15,
        },
        {
          api: "console/log",
          start: 417,
          end: 420,
          line: 16,
        },
        {
          api: "Function/call",
          start: 428,
          end: 432,
          line: 16,
        },
      ],
    },
    {
      chapter: 5,
      lesson: 0,
      file: 0,
      sourceHash: "2b154e2b",
      uses: [
        {
          api: "Array/flatMap",
          start: 101,
          end: 108,
          line: 5,
        },
        {
          api: "Array/toSorted",
          start: 155,
          end: 163,
          line: 6,
        },
        {
          api: "Array/reduce",
          start: 203,
          end: 209,
          line: 7,
        },
        {
          api: "Object/fromEntries",
          start: 265,
          end: 276,
          line: 8,
        },
        {
          api: "Array/map",
          start: 284,
          end: 287,
          line: 8,
        },
        {
          api: "console/log",
          start: 326,
          end: 329,
          line: 9,
        },
        {
          api: "Array/some",
          start: 359,
          end: 363,
          line: 12,
        },
        {
          api: "Array/every",
          start: 395,
          end: 400,
          line: 13,
        },
        {
          api: "console/log",
          start: 432,
          end: 435,
          line: 15,
        },
        {
          api: "Object/keys",
          start: 456,
          end: 460,
          line: 15,
        },
      ],
    },
    {
      chapter: 5,
      lesson: 1,
      file: 0,
      sourceHash: "69327afe",
      uses: [
        {
          api: "structuredClone",
          start: 164,
          end: 179,
          line: 4,
        },
        {
          api: "Object/defineProperty",
          start: 323,
          end: 337,
          line: 13,
        },
        {
          api: "console/log",
          start: 398,
          end: 401,
          line: 14,
        },
        {
          api: "Object/keys",
          start: 471,
          end: 475,
          line: 18,
        },
        {
          api: "Object/freeze",
          start: 509,
          end: 515,
          line: 20,
        },
        {
          api: "Object/seal",
          start: 558,
          end: 562,
          line: 21,
        },
        {
          api: "console/log",
          start: 602,
          end: 605,
          line: 23,
        },
      ],
    },
    {
      chapter: 5,
      lesson: 2,
      file: 0,
      sourceHash: "73a79127",
      uses: [
        {
          api: "WeakMap/WeakMap",
          start: 45,
          end: 52,
          line: 2,
        },
        {
          api: "WeakMap/set",
          start: 65,
          end: 68,
          line: 3,
        },
        {
          api: "Set/Set",
          start: 127,
          end: 130,
          line: 4,
        },
        {
          api: "Map/Map",
          start: 168,
          end: 171,
          line: 5,
        },
        {
          api: "console/log",
          start: 211,
          end: 214,
          line: 9,
        },
        {
          api: "Map/get",
          start: 242,
          end: 245,
          line: 11,
        },
        {
          api: "WeakMap/get",
          start: 263,
          end: 266,
          line: 12,
        },
        {
          api: "WeakSet/WeakSet",
          start: 315,
          end: 322,
          line: 14,
        },
        {
          api: "WeakSet/add",
          start: 334,
          end: 337,
          line: 15,
        },
        {
          api: "console/log",
          start: 360,
          end: 363,
          line: 16,
        },
        {
          api: "WeakSet/has",
          start: 372,
          end: 375,
          line: 16,
        },
      ],
    },
    {
      chapter: 6,
      lesson: 0,
      file: 0,
      sourceHash: "845d9be9",
      uses: [
        {
          api: "String/trim",
          start: 199,
          end: 203,
          line: 8,
        },
        {
          api: "TypeError/TypeError",
          start: 228,
          end: 237,
          line: 9,
        },
        {
          api: "Number/Number",
          start: 278,
          end: 284,
          line: 10,
        },
        {
          api: "Number/isFinite",
          start: 306,
          end: 314,
          line: 11,
        },
        {
          api: "RangeError/RangeError",
          start: 350,
          end: 360,
          line: 12,
        },
        {
          api: "console/log",
          start: 545,
          end: 548,
          line: 19,
        },
        {
          api: "console/log",
          start: 628,
          end: 631,
          line: 21,
        },
      ],
    },
    {
      chapter: 7,
      lesson: 0,
      file: 0,
      sourceHash: "1324d8ad",
      uses: [
        {
          api: "console/log",
          start: 41,
          end: 44,
          line: 2,
        },
        {
          api: "RegExp/test",
          start: 50,
          end: 54,
          line: 2,
        },
        {
          api: "RegExp/test",
          start: 71,
          end: 75,
          line: 2,
        },
        {
          api: "String/matchAll",
          start: 157,
          end: 165,
          line: 4,
        },
        {
          api: "Array/map",
          start: 204,
          end: 207,
          line: 4,
        },
        {
          api: "Number/Number",
          start: 240,
          end: 246,
          line: 5,
        },
        {
          api: "console/log",
          start: 279,
          end: 282,
          line: 7,
        },
        {
          api: "Object/fromEntries",
          start: 290,
          end: 301,
          line: 7,
        },
        {
          api: "console/log",
          start: 345,
          end: 348,
          line: 8,
        },
        {
          api: "String/replace",
          start: 362,
          end: 369,
          line: 8,
        },
        {
          api: "console/log",
          start: 408,
          end: 411,
          line: 9,
        },
        {
          api: "RegExp/exec",
          start: 424,
          end: 428,
          line: 9,
        },
        {
          api: "String/match",
          start: 450,
          end: 455,
          line: 9,
        },
      ],
    },
    {
      chapter: 8,
      lesson: 0,
      file: 0,
      sourceHash: "80fbf647",
      uses: [
        {
          api: "Document/querySelector",
          start: 165,
          end: 178,
          line: 6,
        },
        {
          api: "Document/querySelector",
          start: 221,
          end: 234,
          line: 7,
        },
        {
          api: "Document/createDocumentFragment",
          start: 304,
          end: 326,
          line: 9,
        },
        {
          api: "Node/cloneNode",
          start: 421,
          end: 430,
          line: 11,
        },
        {
          api: "Document/querySelector",
          start: 483,
          end: 496,
          line: 13,
        },
        {
          api: "DOMTokenList/toggle",
          start: 553,
          end: 559,
          line: 14,
        },
        {
          api: "Element/append",
          start: 607,
          end: 613,
          line: 15,
        },
        {
          api: "Element/replaceChildren",
          start: 635,
          end: 650,
          line: 17,
        },
      ],
    },
    {
      chapter: 8,
      lesson: 1,
      file: 0,
      sourceHash: "622e8513",
      uses: [
        {
          api: "AbortController/AbortController",
          start: 237,
          end: 252,
          line: 7,
        },
        {
          api: "Document/querySelector",
          start: 280,
          end: 293,
          line: 8,
        },
        {
          api: "Document/querySelector",
          start: 333,
          end: 346,
          line: 10,
        },
        {
          api: "EventTarget/addEventListener",
          start: 357,
          end: 373,
          line: 10,
        },
        {
          api: "String/String",
          start: 433,
          end: 439,
          line: 13,
        },
        {
          api: "AbortController/abort",
          start: 552,
          end: 557,
          line: 19,
        },
        {
          api: "Document/querySelector",
          start: 620,
          end: 633,
          line: 23,
        },
        {
          api: "Document/querySelector",
          start: 659,
          end: 672,
          line: 24,
        },
      ],
    },
    {
      chapter: 9,
      lesson: 0,
      file: 0,
      sourceHash: "c8eedde0",
      uses: [
        {
          api: "Document/querySelector",
          start: 226,
          end: 239,
          line: 10,
        },
        {
          api: "AbortController/AbortController",
          start: 271,
          end: 286,
          line: 11,
        },
        {
          api: "EventTarget/addEventListener",
          start: 297,
          end: 313,
          line: 12,
        },
        {
          api: "Element/closest",
          start: 431,
          end: 438,
          line: 16,
        },
        {
          api: "Node/contains",
          start: 493,
          end: 501,
          line: 17,
        },
        {
          api: "Element/closest",
          start: 532,
          end: 539,
          line: 18,
        },
        {
          api: "Element/remove",
          start: 546,
          end: 552,
          line: 18,
        },
        {
          api: "Document/querySelector",
          start: 608,
          end: 621,
          line: 22,
        },
        {
          api: "Document/createElement",
          start: 673,
          end: 686,
          line: 23,
        },
        {
          api: "Document/createElement",
          start: 722,
          end: 735,
          line: 24,
        },
        {
          api: "Element/append",
          start: 865,
          end: 871,
          line: 28,
        },
        {
          api: "Element/append",
          start: 890,
          end: 896,
          line: 29,
        },
      ],
    },
    {
      chapter: 9,
      lesson: 1,
      file: 0,
      sourceHash: "addc396d",
      uses: [
        {
          api: "Document/querySelector",
          start: 169,
          end: 182,
          line: 4,
        },
        {
          api: "EventTarget/addEventListener",
          start: 204,
          end: 220,
          line: 5,
        },
        {
          api: "Document/querySelector",
          start: 263,
          end: 276,
          line: 6,
        },
        {
          api: "Document/querySelector",
          start: 354,
          end: 367,
          line: 9,
        },
        {
          api: "EventTarget/dispatchEvent",
          start: 407,
          end: 420,
          line: 10,
        },
        {
          api: "CustomEvent/CustomEvent",
          start: 432,
          end: 443,
          line: 11,
        },
      ],
    },
    {
      chapter: 10,
      lesson: 0,
      file: 0,
      sourceHash: "796f4374",
      uses: [
        {
          api: "Document/querySelector",
          start: 357,
          end: 370,
          line: 15,
        },
        {
          api: "HTMLFormControlsCollection/namedItem",
          start: 413,
          end: 422,
          line: 16,
        },
        {
          api: "Document/querySelector",
          start: 457,
          end: 470,
          line: 17,
        },
        {
          api: "EventTarget/addEventListener",
          start: 494,
          end: 510,
          line: 18,
        },
        {
          api: "HTMLInputElement/setCustomValidity",
          start: 537,
          end: 554,
          line: 19,
        },
        {
          api: "String/trim",
          start: 579,
          end: 583,
          line: 20,
        },
        {
          api: "HTMLInputElement/setCustomValidity",
          start: 609,
          end: 626,
          line: 21,
        },
        {
          api: "Element/setAttribute",
          start: 727,
          end: 739,
          line: 23,
        },
        {
          api: "String/String",
          start: 756,
          end: 762,
          line: 23,
        },
        {
          api: "EventTarget/addEventListener",
          start: 800,
          end: 816,
          line: 25,
        },
        {
          api: "Event/preventDefault",
          start: 848,
          end: 862,
          line: 26,
        },
        {
          api: "HTMLFormElement/reportValidity",
          start: 880,
          end: 894,
          line: 27,
        },
        {
          api: "FormData/FormData",
          start: 927,
          end: 935,
          line: 28,
        },
        {
          api: "Document/querySelector",
          start: 956,
          end: 969,
          line: 29,
        },
        {
          api: "FormData/get",
          start: 1023,
          end: 1026,
          line: 30,
        },
        {
          api: "String/trim",
          start: 1035,
          end: 1039,
          line: 30,
        },
      ],
    },
    {
      chapter: 11,
      lesson: 0,
      file: 0,
      sourceHash: "cb373f9a",
      uses: [
        {
          api: "Document/querySelector",
          start: 195,
          end: 208,
          line: 5,
        },
        {
          api: "URL/URL",
          start: 239,
          end: 242,
          line: 6,
        },
        {
          api: "URLSearchParams/set",
          start: 278,
          end: 281,
          line: 7,
        },
        {
          api: "Document/querySelector",
          start: 321,
          end: 334,
          line: 8,
        },
        {
          api: "History/replaceState",
          start: 378,
          end: 390,
          line: 9,
        },
        {
          api: "Storage/setItem",
          start: 436,
          end: 443,
          line: 11,
        },
        {
          api: "Document/querySelector",
          start: 618,
          end: 631,
          line: 17,
        },
        {
          api: "Clipboard/writeText",
          start: 707,
          end: 716,
          line: 19,
        },
      ],
    },
    {
      chapter: 11,
      lesson: 1,
      file: 0,
      sourceHash: "37c1ec5c",
      uses: [
        {
          api: "Document/querySelector",
          start: 294,
          end: 307,
          line: 12,
        },
        {
          api: "ResizeObserver/ResizeObserver",
          start: 339,
          end: 353,
          line: 13,
        },
        {
          api: "Document/querySelector",
          start: 380,
          end: 393,
          line: 14,
        },
        {
          api: "Math/round",
          start: 431,
          end: 436,
          line: 15,
        },
        {
          api: "ResizeObserver/observe",
          start: 487,
          end: 494,
          line: 17,
        },
        {
          api: "IntersectionObserver/IntersectionObserver",
          start: 524,
          end: 544,
          line: 18,
        },
        {
          api: "DOMTokenList/toggle",
          start: 577,
          end: 583,
          line: 19,
        },
        {
          api: "IntersectionObserver/observe",
          start: 639,
          end: 646,
          line: 21,
        },
        {
          api: "MutationObserver/MutationObserver",
          start: 677,
          end: 693,
          line: 22,
        },
        {
          api: "console/log",
          start: 717,
          end: 720,
          line: 23,
        },
        {
          api: "MutationObserver/observe",
          start: 768,
          end: 775,
          line: 25,
        },
        {
          api: "console/log",
          start: 881,
          end: 884,
          line: 27,
        },
        {
          api: "Window/requestIdleCallback",
          start: 939,
          end: 958,
          line: 29,
        },
        {
          api: "Window/setTimeout",
          start: 990,
          end: 1000,
          line: 30,
        },
        {
          api: "Document/querySelector",
          start: 1022,
          end: 1035,
          line: 31,
        },
        {
          api: "ResizeObserver/disconnect",
          start: 1074,
          end: 1084,
          line: 32,
        },
        {
          api: "IntersectionObserver/disconnect",
          start: 1100,
          end: 1110,
          line: 33,
        },
        {
          api: "MutationObserver/disconnect",
          start: 1127,
          end: 1137,
          line: 34,
        },
        {
          api: "Window/cancelIdleCallback",
          start: 1155,
          end: 1173,
          line: 35,
        },
        {
          api: "Window/clearTimeout",
          start: 1192,
          end: 1204,
          line: 36,
        },
      ],
    },
    {
      chapter: 11,
      lesson: 2,
      file: 0,
      sourceHash: "97bbb8cc",
      uses: [
        {
          api: "Element/attachShadow",
          start: 185,
          end: 197,
          line: 8,
        },
        {
          api: "Document/createElement",
          start: 247,
          end: 260,
          line: 9,
        },
        {
          api: "Element/append",
          start: 352,
          end: 358,
          line: 12,
        },
        {
          api: "AbortController/abort",
          start: 419,
          end: 424,
          line: 15,
        },
        {
          api: "AbortController/AbortController",
          start: 452,
          end: 467,
          line: 16,
        },
        {
          api: "Document/querySelector",
          start: 508,
          end: 521,
          line: 17,
        },
        {
          api: "EventTarget/addEventListener",
          start: 546,
          end: 562,
          line: 18,
        },
        {
          api: "AbortController/abort",
          start: 768,
          end: 773,
          line: 27,
        },
        {
          api: "CustomElementRegistry/get",
          start: 809,
          end: 812,
          line: 30,
        },
        {
          api: "CustomElementRegistry/define",
          start: 850,
          end: 856,
          line: 31,
        },
      ],
    },
    {
      chapter: 12,
      lesson: 0,
      file: 0,
      sourceHash: "260de9a3",
      uses: [
        {
          api: "Document/querySelector",
          start: 240,
          end: 253,
          line: 12,
        },
        {
          api: "Document/querySelector",
          start: 291,
          end: 304,
          line: 14,
        },
        {
          api: "Animation/cancel",
          start: 347,
          end: 353,
          line: 15,
        },
        {
          api: "Window/matchMedia",
          start: 365,
          end: 375,
          line: 16,
        },
        {
          api: "Element/animate",
          start: 512,
          end: 519,
          line: 20,
        },
        {
          api: "Promise/catch",
          start: 694,
          end: 699,
          line: 24,
        },
      ],
    },
    {
      chapter: 12,
      lesson: 1,
      file: 0,
      sourceHash: "400f9cd2",
      uses: [
        {
          api: "Element/querySelectorAll",
          start: 375,
          end: 391,
          line: 11,
        },
      ],
    },
    {
      chapter: 13,
      lesson: 0,
      file: 0,
      sourceHash: "e1a6dc88",
      uses: [
        {
          api: "console/log",
          start: 8,
          end: 11,
          line: 1,
        },
        {
          api: "Window/setTimeout",
          start: 18,
          end: 28,
          line: 2,
        },
        {
          api: "console/log",
          start: 43,
          end: 46,
          line: 2,
        },
        {
          api: "Promise/resolve",
          start: 69,
          end: 76,
          line: 3,
        },
        {
          api: "Promise/then",
          start: 79,
          end: 83,
          line: 3,
        },
        {
          api: "console/log",
          start: 98,
          end: 101,
          line: 3,
        },
        {
          api: "Window/queueMicrotask",
          start: 115,
          end: 129,
          line: 4,
        },
        {
          api: "console/log",
          start: 144,
          end: 147,
          line: 4,
        },
        {
          api: "console/log",
          start: 171,
          end: 174,
          line: 5,
        },
      ],
    },
    {
      chapter: 13,
      lesson: 1,
      file: 0,
      sourceHash: "fc1613cb",
      uses: [
        {
          api: "AbortController/AbortController",
          start: 129,
          end: 144,
          line: 4,
        },
        {
          api: "Window/setTimeout",
          start: 368,
          end: 378,
          line: 12,
        },
        {
          api: "Window/clearTimeout",
          start: 459,
          end: 471,
          line: 18,
        },
        {
          api: "AbortController/abort",
          start: 495,
          end: 500,
          line: 19,
        },
      ],
    },
    {
      chapter: 14,
      lesson: 0,
      file: 0,
      sourceHash: "c25f634b",
      uses: [
        {
          api: "Promise/Promise",
          start: 17,
          end: 24,
          line: 1,
        },
        {
          api: "Number/Number",
          start: 85,
          end: 91,
          line: 3,
        },
        {
          api: "Number/isFinite",
          start: 112,
          end: 120,
          line: 4,
        },
        {
          api: "Promise/resolveFunction",
          start: 129,
          end: 136,
          line: 4,
        },
        {
          api: "Promise/rejectFunction",
          start: 152,
          end: 158,
          line: 5,
        },
        {
          api: "TypeError/TypeError",
          start: 163,
          end: 172,
          line: 5,
        },
        {
          api: "Promise/then",
          start: 226,
          end: 230,
          line: 8,
        },
        {
          api: "Promise/then",
          start: 254,
          end: 258,
          line: 9,
        },
        {
          api: "RangeError/RangeError",
          start: 299,
          end: 309,
          line: 10,
        },
        {
          api: "Promise/catch",
          start: 349,
          end: 354,
          line: 13,
        },
        {
          api: "console/log",
          start: 378,
          end: 381,
          line: 14,
        },
        {
          api: "Promise/finally",
          start: 420,
          end: 427,
          line: 17,
        },
        {
          api: "console/log",
          start: 442,
          end: 445,
          line: 17,
        },
        {
          api: "console/log",
          start: 468,
          end: 471,
          line: 18,
        },
      ],
    },
    {
      chapter: 14,
      lesson: 1,
      file: 0,
      sourceHash: "aed346de",
      uses: [
        {
          api: "Promise/resolve",
          start: 24,
          end: 31,
          line: 1,
        },
        {
          api: "Promise/resolve",
          start: 44,
          end: 51,
          line: 1,
        },
        {
          api: "console/log",
          start: 65,
          end: 68,
          line: 2,
        },
        {
          api: "Promise/all",
          start: 83,
          end: 86,
          line: 2,
        },
        {
          api: "Promise/allSettled",
          start: 138,
          end: 148,
          line: 3,
        },
        {
          api: "Promise/resolve",
          start: 161,
          end: 168,
          line: 4,
        },
        {
          api: "Promise/reject",
          start: 186,
          end: 192,
          line: 5,
        },
        {
          api: "Error/Error",
          start: 197,
          end: 202,
          line: 5,
        },
        {
          api: "console/log",
          start: 222,
          end: 225,
          line: 7,
        },
        {
          api: "Array/map",
          start: 235,
          end: 238,
          line: 7,
        },
        {
          api: "console/log",
          start: 299,
          end: 302,
          line: 8,
        },
        {
          api: "Promise/any",
          start: 320,
          end: 323,
          line: 9,
        },
        {
          api: "Promise/reject",
          start: 338,
          end: 344,
          line: 10,
        },
        {
          api: "Error/Error",
          start: 349,
          end: 354,
          line: 10,
        },
        {
          api: "Promise/resolve",
          start: 380,
          end: 387,
          line: 11,
        },
        {
          api: "console/log",
          start: 414,
          end: 417,
          line: 14,
        },
        {
          api: "Promise/race",
          start: 435,
          end: 439,
          line: 15,
        },
        {
          api: "Promise/resolve",
          start: 449,
          end: 456,
          line: 15,
        },
        {
          api: "Promise/resolve",
          start: 475,
          end: 482,
          line: 15,
        },
      ],
    },
    {
      chapter: 15,
      lesson: 0,
      file: 0,
      sourceHash: "37455d90",
      uses: [
        {
          api: "Promise/all",
          start: 112,
          end: 115,
          line: 3,
        },
        {
          api: "Array/map",
          start: 120,
          end: 123,
          line: 3,
        },
        {
          api: "Array/push",
          start: 198,
          end: 202,
          line: 5,
        },
        {
          api: "console/log",
          start: 319,
          end: 322,
          line: 10,
        },
        {
          api: "console/log",
          start: 346,
          end: 349,
          line: 11,
        },
      ],
    },
    {
      chapter: 15,
      lesson: 1,
      file: 0,
      sourceHash: "7f5cc39b",
      uses: [
        {
          api: "AbortController/AbortController",
          start: 99,
          end: 114,
          line: 2,
        },
        {
          api: "AbortController/abort",
          start: 151,
          end: 156,
          line: 3,
        },
        {
          api: "EventTarget/addEventListener",
          start: 220,
          end: 236,
          line: 5,
        },
        {
          api: "Window/setTimeout",
          start: 286,
          end: 296,
          line: 6,
        },
        {
          api: "AbortController/abort",
          start: 319,
          end: 324,
          line: 7,
        },
        {
          api: "DOMException/DOMException",
          start: 329,
          end: 341,
          line: 7,
        },
        {
          api: "Window/fetch",
          start: 427,
          end: 432,
          line: 11,
        },
        {
          api: "Error/Error",
          start: 502,
          end: 507,
          line: 12,
        },
        {
          api: "Response/json",
          start: 562,
          end: 566,
          line: 13,
        },
        {
          api: "Window/clearTimeout",
          start: 588,
          end: 600,
          line: 15,
        },
        {
          api: "EventTarget/removeEventListener",
          start: 621,
          end: 640,
          line: 16,
        },
      ],
    },
    {
      chapter: 16,
      lesson: 0,
      file: 0,
      sourceHash: "fd9eeba5",
      uses: [
        {
          api: "Request/Request",
          start: 20,
          end: 27,
          line: 1,
        },
        {
          api: "Window/fetch",
          start: 205,
          end: 210,
          line: 8,
        },
        {
          api: "Error/Error",
          start: 249,
          end: 254,
          line: 9,
        },
        {
          api: "Response/json",
          start: 311,
          end: 315,
          line: 10,
        },
        {
          api: "Array/isArray",
          start: 333,
          end: 340,
          line: 12,
        },
        {
          api: "Array/every",
          start: 370,
          end: 375,
          line: 13,
        },
        {
          api: "TypeError/TypeError",
          start: 437,
          end: 446,
          line: 15,
        },
        {
          api: "console/log",
          start: 486,
          end: 489,
          line: 17,
        },
      ],
    },
    {
      chapter: 16,
      lesson: 1,
      file: 0,
      sourceHash: "ed89cc7c",
      uses: [
        {
          api: "Document/querySelector",
          start: 158,
          end: 171,
          line: 5,
        },
        {
          api: "Document/querySelector",
          start: 210,
          end: 223,
          line: 6,
        },
        {
          api: "Document/querySelector",
          start: 260,
          end: 273,
          line: 7,
        },
        {
          api: "AbortSignal/throwIfAborted",
          start: 433,
          end: 447,
          line: 13,
        },
        {
          api: "Array/filter",
          start: 471,
          end: 477,
          line: 14,
        },
        {
          api: "String/toLowerCase",
          start: 502,
          end: 513,
          line: 15,
        },
        {
          api: "String/includes",
          start: 516,
          end: 524,
          line: 15,
        },
        {
          api: "String/toLowerCase",
          start: 531,
          end: 542,
          line: 15,
        },
        {
          api: "EventTarget/addEventListener",
          start: 615,
          end: 631,
          line: 21,
        },
        {
          api: "Window/clearTimeout",
          start: 653,
          end: 665,
          line: 22,
        },
        {
          api: "AbortController/abort",
          start: 687,
          end: 692,
          line: 23,
        },
        {
          api: "Window/setTimeout",
          start: 739,
          end: 749,
          line: 25,
        },
        {
          api: "AbortController/AbortController",
          start: 784,
          end: 799,
          line: 26,
        },
        {
          api: "String/trim",
          start: 919,
          end: 923,
          line: 30,
        },
        {
          api: "Element/replaceChildren",
          start: 1017,
          end: 1032,
          line: 34,
        },
        {
          api: "Array/map",
          start: 1053,
          end: 1056,
          line: 35,
        },
        {
          api: "Document/createElement",
          start: 1100,
          end: 1113,
          line: 36,
        },
      ],
    },
    {
      chapter: 16,
      lesson: 2,
      file: 0,
      sourceHash: "8be555f0",
      uses: [
        {
          api: "EventSource/EventSource",
          start: 72,
          end: 83,
          line: 2,
        },
        {
          api: "JSON/parse",
          start: 154,
          end: 159,
          line: 5,
        },
        {
          api: "TypeError/TypeError",
          start: 244,
          end: 253,
          line: 7,
        },
        {
          api: "EventTarget/addEventListener",
          start: 364,
          end: 380,
          line: 13,
        },
        {
          api: "EventTarget/addEventListener",
          start: 411,
          end: 427,
          line: 14,
        },
        {
          api: "EventSource/close",
          start: 469,
          end: 474,
          line: 15,
        },
      ],
    },
    {
      chapter: 17,
      lesson: 0,
      file: 0,
      sourceHash: "4d95fe",
      uses: [
        {
          api: "console/log",
          start: 125,
          end: 128,
          line: 7,
        },
        {
          api: "Number/isInteger",
          start: 329,
          end: 338,
          line: 17,
        },
        {
          api: "RangeError/RangeError",
          start: 374,
          end: 384,
          line: 18,
        },
        {
          api: "console/log",
          start: 751,
          end: 754,
          line: 36,
        },
      ],
    },
    {
      chapter: 18,
      lesson: 0,
      file: 0,
      sourceHash: "2f1a9c1a",
      uses: [
        {
          api: "Array/reduce",
          start: 50,
          end: 56,
          line: 4,
        },
        {
          api: "String/trim",
          start: 123,
          end: 127,
          line: 5,
        },
        {
          api: "String/toLowerCase",
          start: 158,
          end: 169,
          line: 6,
        },
        {
          api: "Array/map",
          start: 433,
          end: 436,
          line: 11,
        },
        {
          api: "console/log",
          start: 537,
          end: 540,
          line: 16,
        },
      ],
    },
    {
      chapter: 19,
      lesson: 0,
      file: 0,
      sourceHash: "58b535f9",
      uses: [
        {
          api: "JSON/stringify",
          start: 54,
          end: 63,
          line: 1,
        },
        {
          api: "JSON/parse",
          start: 241,
          end: 246,
          line: 8,
        },
        {
          api: "Map/Map",
          start: 286,
          end: 289,
          line: 12,
        },
        {
          api: "Map/set",
          start: 397,
          end: 400,
          line: 15,
        },
        {
          api: "Map/get",
          start: 439,
          end: 442,
          line: 16,
        },
        {
          api: "console/log",
          start: 565,
          end: 568,
          line: 20,
        },
      ],
    },
    {
      chapter: 19,
      lesson: 1,
      file: 0,
      sourceHash: "43e7de21",
      uses: [
        {
          api: "Map/Map",
          start: 44,
          end: 47,
          line: 2,
        },
        {
          api: "Map/get",
          start: 118,
          end: 121,
          line: 5,
        },
        {
          api: "Set/Set",
          start: 135,
          end: 138,
          line: 5,
        },
        {
          api: "Map/set",
          start: 155,
          end: 158,
          line: 6,
        },
        {
          api: "Set/add",
          start: 193,
          end: 196,
          line: 7,
        },
        {
          api: "Set/delete",
          start: 247,
          end: 253,
          line: 9,
        },
        {
          api: "Map/delete",
          start: 301,
          end: 307,
          line: 10,
        },
        {
          api: "Map/get",
          start: 396,
          end: 399,
          line: 14,
        },
        {
          api: "console/log",
          start: 522,
          end: 525,
          line: 19,
        },
      ],
    },
    {
      chapter: 20,
      lesson: 0,
      file: 0,
      sourceHash: "13b74679",
      uses: [
        {
          api: "Array/reduce",
          start: 77,
          end: 83,
          line: 3,
        },
        {
          api: "Intl/NumberFormat",
          start: 181,
          end: 193,
          line: 6,
        },
        {
          api: "Intl/NumberFormat/format",
          start: 246,
          end: 252,
          line: 9,
        },
      ],
    },
    {
      chapter: 20,
      lesson: 0,
      file: 1,
      sourceHash: "53a749e3",
      uses: [
        {
          api: "console/log",
          start: 107,
          end: 110,
          line: 3,
        },
        {
          api: "import",
          start: 157,
          end: 163,
          line: 4,
        },
        {
          api: "console/log",
          start: 190,
          end: 193,
          line: 5,
        },
      ],
    },
    {
      chapter: 20,
      lesson: 1,
      file: 1,
      sourceHash: "3ccc85ab",
      uses: [
        {
          api: "console/log",
          start: 43,
          end: 46,
          line: 2,
        },
      ],
    },
    {
      chapter: 21,
      lesson: 0,
      file: 1,
      sourceHash: "bade6c8b",
      uses: [
        {
          api: "Document/querySelector",
          start: 73,
          end: 86,
          line: 2,
        },
      ],
    },
    {
      chapter: 22,
      lesson: 0,
      file: 0,
      sourceHash: "453fd774",
      uses: [
        {
          api: "String/trim",
          start: 331,
          end: 335,
          line: 11,
        },
        {
          api: "String/toLowerCase",
          start: 338,
          end: 349,
          line: 11,
        },
        {
          api: "Array/filter",
          start: 371,
          end: 377,
          line: 12,
        },
        {
          api: "String/toLowerCase",
          start: 448,
          end: 459,
          line: 15,
        },
        {
          api: "String/includes",
          start: 462,
          end: 470,
          line: 15,
        },
      ],
    },
    {
      chapter: 23,
      lesson: 0,
      file: 0,
      sourceHash: "30c5568d",
      uses: [
        {
          api: "Number/isFinite",
          start: 59,
          end: 67,
          line: 3,
        },
        {
          api: "Number/isFinite",
          start: 139,
          end: 147,
          line: 7,
        },
        {
          api: "RangeError/RangeError",
          start: 172,
          end: 182,
          line: 9,
        },
      ],
    },
    {
      chapter: 24,
      lesson: 0,
      file: 0,
      sourceHash: "31810255",
      uses: [
        {
          api: "Window/fetch",
          start: 498,
          end: 503,
          line: 13,
        },
        {
          api: "Response/json",
          start: 600,
          end: 604,
          line: 15,
        },
      ],
    },
    {
      chapter: 26,
      lesson: 0,
      file: 0,
      sourceHash: "9c3aedd0",
      uses: [
        {
          api: "Document/querySelector",
          start: 132,
          end: 145,
          line: 4,
        },
        {
          api: "Performance/mark",
          start: 192,
          end: 196,
          line: 5,
        },
        {
          api: "Array/from",
          start: 240,
          end: 244,
          line: 6,
        },
        {
          api: "Array/filter",
          start: 317,
          end: 323,
          line: 8,
        },
        {
          api: "Array/reduce",
          start: 357,
          end: 363,
          line: 9,
        },
        {
          api: "Performance/mark",
          start: 413,
          end: 417,
          line: 10,
        },
        {
          api: "Performance/measure",
          start: 466,
          end: 473,
          line: 11,
        },
        {
          api: "Document/querySelector",
          start: 563,
          end: 576,
          line: 16,
        },
        {
          api: "Number/toFixed",
          start: 638,
          end: 645,
          line: 17,
        },
        {
          api: "Performance/clearMarks",
          start: 671,
          end: 681,
          line: 18,
        },
        {
          api: "Performance/clearMarks",
          start: 716,
          end: 726,
          line: 19,
        },
        {
          api: "Performance/clearMeasures",
          start: 759,
          end: 772,
          line: 20,
        },
      ],
    },
    {
      chapter: 26,
      lesson: 1,
      file: 0,
      sourceHash: "c5179b94",
      uses: [
        {
          api: "Window/clearTimeout",
          start: 112,
          end: 124,
          line: 5,
        },
        {
          api: "Window/setTimeout",
          start: 145,
          end: 155,
          line: 6,
        },
        {
          api: "Function/apply",
          start: 165,
          end: 170,
          line: 6,
        },
        {
          api: "Window/clearTimeout",
          start: 225,
          end: 237,
          line: 8,
        },
        {
          api: "Performance/now",
          start: 386,
          end: 389,
          line: 14,
        },
        {
          api: "Function/apply",
          start: 458,
          end: 463,
          line: 17,
        },
        {
          api: "Number/isInteger",
          start: 644,
          end: 653,
          line: 23,
        },
        {
          api: "RangeError/RangeError",
          start: 689,
          end: 699,
          line: 24,
        },
        {
          api: "Map/delete",
          start: 736,
          end: 742,
          line: 25,
        },
        {
          api: "Map/set",
          start: 757,
          end: 760,
          line: 26,
        },
        {
          api: "Map/delete",
          start: 809,
          end: 815,
          line: 27,
        },
        {
          api: "Map/keys",
          start: 822,
          end: 826,
          line: 27,
        },
        {
          api: "Iterator/next",
          start: 829,
          end: 833,
          line: 27,
        },
      ],
    },
    {
      chapter: 27,
      lesson: 0,
      file: 0,
      sourceHash: "a5ad56f",
      uses: [
        {
          api: "Document/querySelector",
          start: 152,
          end: 165,
          line: 6,
        },
        {
          api: "Document/querySelector",
          start: 203,
          end: 216,
          line: 7,
        },
        {
          api: "EventTarget/addEventListener",
          start: 307,
          end: 323,
          line: 11,
        },
        {
          api: "URL/URL",
          start: 407,
          end: 410,
          line: 14,
        },
        {
          api: "Array/includes",
          start: 461,
          end: 469,
          line: 15,
        },
        {
          api: "TypeError/TypeError",
          start: 501,
          end: 510,
          line: 16,
        },
        {
          api: "console/log",
          start: 582,
          end: 585,
          line: 19,
        },
      ],
    },
    {
      chapter: 27,
      lesson: 1,
      file: 0,
      sourceHash: "93ada68",
      uses: [
        {
          api: "Array/isArray",
          start: 85,
          end: 92,
          line: 2,
        },
        {
          api: "TypeError/TypeError",
          start: 115,
          end: 124,
          line: 3,
        },
        {
          api: "Object/create",
          start: 169,
          end: 175,
          line: 4,
        },
        {
          api: "Object/hasOwn",
          start: 201,
          end: 207,
          line: 6,
        },
        {
          api: "Array/includes",
          start: 249,
          end: 257,
          line: 7,
        },
        {
          api: "Object/hasOwn",
          start: 325,
          end: 331,
          line: 11,
        },
        {
          api: "Number/isInteger",
          start: 365,
          end: 374,
          line: 12,
        },
        {
          api: "JSON/parse",
          start: 527,
          end: 532,
          line: 19,
        },
        {
          api: "console/log",
          start: 636,
          end: 639,
          line: 21,
        },
        {
          api: "Object/getPrototypeOf",
          start: 671,
          end: 685,
          line: 23,
        },
      ],
    },
    {
      chapter: 28,
      lesson: 0,
      file: 0,
      sourceHash: "f1f99c2a",
      uses: [
        {
          api: "Document/querySelector",
          start: 294,
          end: 307,
          line: 8,
        },
        {
          api: "Document/querySelector",
          start: 344,
          end: 357,
          line: 9,
        },
        {
          api: "EventTarget/addEventListener",
          start: 378,
          end: 394,
          line: 10,
        },
        {
          api: "HTMLDialogElement/showModal",
          start: 417,
          end: 426,
          line: 10,
        },
        {
          api: "EventTarget/addEventListener",
          start: 440,
          end: 456,
          line: 11,
        },
        {
          api: "HTMLElement/focus",
          start: 479,
          end: 484,
          line: 11,
        },
      ],
    },
    {
      chapter: 29,
      lesson: 0,
      file: 0,
      sourceHash: "1a1c7e8d",
      uses: [
        {
          api: "Promise/resolve",
          start: 146,
          end: 153,
          line: 7,
        },
        {
          api: "Promise/then",
          start: 156,
          end: 160,
          line: 7,
        },
        {
          api: "console/log",
          start: 175,
          end: 178,
          line: 7,
        },
        {
          api: "console/log",
          start: 229,
          end: 232,
          line: 9,
        },
      ],
    },
    {
      chapter: 30,
      lesson: 0,
      file: 0,
      sourceHash: "fbe9e10f",
      uses: [
        {
          api: "Object/create",
          start: 54,
          end: 60,
          line: 2,
        },
        {
          api: "Object/defineProperty",
          start: 75,
          end: 89,
          line: 3,
        },
        {
          api: "Symbol/Symbol",
          start: 171,
          end: 177,
          line: 5,
        },
        {
          api: "console/log",
          start: 218,
          end: 221,
          line: 7,
        },
        {
          api: "Object/hasOwn",
          start: 240,
          end: 246,
          line: 7,
        },
        {
          api: "console/log",
          start: 289,
          end: 292,
          line: 8,
        },
        {
          api: "Object/keys",
          start: 300,
          end: 304,
          line: 8,
        },
        {
          api: "Reflect/ownKeys",
          start: 320,
          end: 327,
          line: 8,
        },
        {
          api: "console/log",
          start: 344,
          end: 347,
          line: 9,
        },
        {
          api: "Object/getPrototypeOf",
          start: 355,
          end: 369,
          line: 9,
        },
        {
          api: "Object/preventExtensions",
          start: 402,
          end: 419,
          line: 10,
        },
        {
          api: "console/log",
          start: 435,
          end: 438,
          line: 11,
        },
        {
          api: "Object/isExtensible",
          start: 446,
          end: 458,
          line: 11,
        },
      ],
    },
    {
      chapter: 30,
      lesson: 1,
      file: 0,
      sourceHash: "3a2b5996",
      uses: [
        {
          api: "Proxy/Proxy",
          start: 49,
          end: 54,
          line: 2,
        },
        {
          api: "Number/isInteger",
          start: 139,
          end: 148,
          line: 4,
        },
        {
          api: "RangeError/RangeError",
          start: 187,
          end: 197,
          line: 5,
        },
        {
          api: "Reflect/set",
          start: 235,
          end: 238,
          line: 6,
        },
        {
          api: "Reflect/get",
          start: 325,
          end: 328,
          line: 9,
        },
        {
          api: "console/log",
          start: 388,
          end: 391,
          line: 13,
        },
        {
          api: "console/log",
          start: 486,
          end: 489,
          line: 17,
        },
      ],
    },
    {
      chapter: 31,
      lesson: 0,
      file: 0,
      sourceHash: "9014726d",
      uses: [
        {
          api: "console/log",
          start: 165,
          end: 168,
          line: 8,
        },
        {
          api: "console/log",
          start: 393,
          end: 396,
          line: 18,
        },
        {
          api: "Promise/resolve",
          start: 473,
          end: 480,
          line: 20,
        },
        {
          api: "console/log",
          start: 550,
          end: 553,
          line: 23,
        },
      ],
    },
    {
      chapter: 31,
      lesson: 1,
      file: 0,
      sourceHash: "cd2aa13b",
      uses: [
        {
          api: "ArrayBuffer/ArrayBuffer",
          start: 19,
          end: 30,
          line: 1,
        },
        {
          api: "DataView/DataView",
          start: 52,
          end: 60,
          line: 2,
        },
        {
          api: "DataView/setUint16",
          start: 75,
          end: 84,
          line: 3,
        },
        {
          api: "DataView/setUint16",
          start: 126,
          end: 135,
          line: 4,
        },
        {
          api: "console/log",
          start: 178,
          end: 181,
          line: 5,
        },
        {
          api: "Uint8Array/Uint8Array",
          start: 190,
          end: 200,
          line: 5,
        },
        {
          api: "console/log",
          start: 241,
          end: 244,
          line: 6,
        },
        {
          api: "DataView/getUint16",
          start: 250,
          end: 259,
          line: 6,
        },
        {
          api: "Uint8Array/Uint8Array",
          start: 296,
          end: 306,
          line: 7,
        },
        {
          api: "TypedArray/slice",
          start: 315,
          end: 320,
          line: 7,
        },
        {
          api: "console/log",
          start: 345,
          end: 348,
          line: 9,
        },
        {
          api: "Uint8Array/Uint8Array",
          start: 353,
          end: 363,
          line: 9,
        },
      ],
    },
    {
      chapter: 32,
      lesson: 0,
      file: 0,
      sourceHash: "8029bab4",
      uses: [
        {
          api: "AbortController/AbortController",
          start: 200,
          end: 215,
          line: 5,
        },
        {
          api: "String/String",
          start: 273,
          end: 279,
          line: 7,
        },
        {
          api: "EventTarget/addEventListener",
          start: 311,
          end: 327,
          line: 9,
        },
        {
          api: "Window/setInterval",
          start: 391,
          end: 402,
          line: 10,
        },
        {
          api: "AbortController/abort",
          start: 491,
          end: 496,
          line: 14,
        },
        {
          api: "Window/clearInterval",
          start: 506,
          end: 519,
          line: 15,
        },
        {
          api: "Element/remove",
          start: 539,
          end: 545,
          line: 16,
        },
        {
          api: "Document/querySelector",
          start: 593,
          end: 606,
          line: 19,
        },
        {
          api: "Document/querySelector",
          start: 637,
          end: 650,
          line: 21,
        },
        {
          api: "EventTarget/addEventListener",
          start: 668,
          end: 684,
          line: 22,
        },
      ],
    },
    {
      chapter: 33,
      lesson: 0,
      file: 1,
      sourceHash: "fd113bce",
      uses: [
        {
          api: "Document/querySelector",
          start: 21,
          end: 34,
          line: 2,
        },
        {
          api: "Worker/terminate",
          start: 71,
          end: 80,
          line: 3,
        },
        {
          api: "Worker/Worker",
          start: 99,
          end: 105,
          line: 4,
        },
        {
          api: "URL/URL",
          start: 110,
          end: 113,
          line: 4,
        },
        {
          api: "Document/querySelector",
          start: 282,
          end: 295,
          line: 10,
        },
        {
          api: "Worker/terminate",
          start: 369,
          end: 378,
          line: 12,
        },
        {
          api: "Document/querySelector",
          start: 479,
          end: 492,
          line: 17,
        },
        {
          api: "Worker/terminate",
          start: 549,
          end: 558,
          line: 18,
        },
        {
          api: "Uint32Array/Uint32Array",
          start: 615,
          end: 626,
          line: 22,
        },
        {
          api: "Worker/postMessage",
          start: 649,
          end: 660,
          line: 23,
        },
        {
          api: "console/log",
          start: 716,
          end: 719,
          line: 24,
        },
      ],
    },
    {
      chapter: 33,
      lesson: 0,
      file: 2,
      sourceHash: "a196da7e",
      uses: [
        {
          api: "Uint32Array/Uint32Array",
          start: 49,
          end: 60,
          line: 2,
        },
        {
          api: "TypedArray/reduce",
          start: 104,
          end: 110,
          line: 3,
        },
        {
          api: "DedicatedWorkerGlobalScope/postMessage",
          start: 151,
          end: 162,
          line: 4,
        },
      ],
    },
    {
      chapter: 33,
      lesson: 1,
      file: 0,
      sourceHash: "c41d4736",
      uses: [
        {
          api: "Document/querySelector",
          start: 79,
          end: 92,
          line: 3,
        },
        {
          api: "SharedArrayBuffer/SharedArrayBuffer",
          start: 200,
          end: 217,
          line: 5,
        },
        {
          api: "Int32Array/Int32Array",
          start: 273,
          end: 283,
          line: 6,
        },
        {
          api: "Atomics/add",
          start: 305,
          end: 308,
          line: 7,
        },
        {
          api: "Atomics/load",
          start: 375,
          end: 379,
          line: 8,
        },
      ],
    },
    {
      chapter: 34,
      lesson: 0,
      file: 0,
      sourceHash: "fe5dac07",
      uses: [
        {
          api: "Map/Map",
          start: 195,
          end: 198,
          line: 7,
        },
        {
          api: "String/slice",
          start: 331,
          end: 336,
          line: 12,
        },
        {
          api: "Document/createElement",
          start: 383,
          end: 396,
          line: 13,
        },
        {
          api: "Map/get",
          start: 439,
          end: 442,
          line: 14,
        },
        {
          api: "Element/replaceChildren",
          start: 511,
          end: 526,
          line: 16,
        },
        {
          api: "HTMLElement/focus",
          start: 595,
          end: 600,
          line: 18,
        },
        {
          api: "EventTarget/addEventListener",
          start: 621,
          end: 637,
          line: 20,
        },
        {
          api: "EventTarget/removeEventListener",
          start: 699,
          end: 718,
          line: 22,
        },
        {
          api: "Document/querySelector",
          start: 785,
          end: 798,
          line: 24,
        },
      ],
    },
    {
      chapter: 34,
      lesson: 1,
      file: 0,
      sourceHash: "98f36a96",
      uses: [
        {
          api: "Promise/Promise",
          start: 156,
          end: 163,
          line: 5,
        },
        {
          api: "IDBFactory/open",
          start: 219,
          end: 223,
          line: 6,
        },
        {
          api: "DOMStringList/contains",
          start: 325,
          end: 333,
          line: 8,
        },
        {
          api: "IDBDatabase/createObjectStore",
          start: 370,
          end: 387,
          line: 9,
        },
        {
          api: "Promise/rejectFunction",
          start: 457,
          end: 463,
          line: 11,
        },
        {
          api: "IDBDatabase/close",
          start: 587,
          end: 592,
          line: 14,
        },
        {
          api: "Promise/resolveFunction",
          start: 604,
          end: 611,
          line: 15,
        },
        {
          api: "Promise/Promise",
          start: 687,
          end: 694,
          line: 20,
        },
        {
          api: "IDBDatabase/transaction",
          start: 747,
          end: 758,
          line: 21,
        },
        {
          api: "IDBTransaction/objectStore",
          start: 801,
          end: 812,
          line: 22,
        },
        {
          api: "IDBObjectStore/put",
          start: 823,
          end: 826,
          line: 22,
        },
        {
          api: "Promise/resolveFunction",
          start: 872,
          end: 879,
          line: 23,
        },
        {
          api: "Promise/rejectFunction",
          start: 925,
          end: 931,
          line: 25,
        },
        {
          api: "Error/Error",
          start: 957,
          end: 962,
          line: 25,
        },
        {
          api: "Document/querySelector",
          start: 1011,
          end: 1024,
          line: 28,
        },
        {
          api: "Document/querySelector",
          start: 1201,
          end: 1214,
          line: 33,
        },
        {
          api: "Document/querySelector",
          start: 1286,
          end: 1299,
          line: 35,
        },
        {
          api: "IDBDatabase/close",
          start: 1388,
          end: 1393,
          line: 38,
        },
      ],
    },
    {
      chapter: 34,
      lesson: 2,
      file: 0,
      sourceHash: "ecbbc3c7",
      uses: [
        {
          api: "ServiceWorkerContainer/register",
          start: 188,
          end: 196,
          line: 6,
        },
        {
          api: "Document/querySelector",
          start: 279,
          end: 292,
          line: 8,
        },
        {
          api: "Document/querySelector",
          start: 415,
          end: 428,
          line: 11,
        },
      ],
    },
    {
      chapter: 34,
      lesson: 2,
      file: 1,
      sourceHash: "f77d4eeb",
      uses: [
        {
          api: "URL/URL",
          start: 53,
          end: 56,
          line: 2,
        },
        {
          api: "URL/URL",
          start: 117,
          end: 120,
          line: 3,
        },
        {
          api: "EventTarget/addEventListener",
          start: 158,
          end: 174,
          line: 4,
        },
        {
          api: "ExtendableEvent/waitUntil",
          start: 205,
          end: 214,
          line: 5,
        },
        {
          api: "CacheStorage/open",
          start: 222,
          end: 226,
          line: 5,
        },
        {
          api: "Promise/then",
          start: 234,
          end: 238,
          line: 5,
        },
        {
          api: "Cache/add",
          start: 254,
          end: 257,
          line: 5,
        },
        {
          api: "EventTarget/addEventListener",
          start: 277,
          end: 293,
          line: 7,
        },
        {
          api: "ExtendableEvent/waitUntil",
          start: 325,
          end: 334,
          line: 8,
        },
        {
          api: "CacheStorage/keys",
          start: 354,
          end: 358,
          line: 10,
        },
        {
          api: "Promise/then",
          start: 368,
          end: 372,
          line: 11,
        },
        {
          api: "Promise/all",
          start: 397,
          end: 400,
          line: 12,
        },
        {
          api: "Array/filter",
          start: 430,
          end: 436,
          line: 14,
        },
        {
          api: "String/startsWith",
          start: 448,
          end: 458,
          line: 14,
        },
        {
          api: "Array/map",
          start: 509,
          end: 512,
          line: 15,
        },
        {
          api: "CacheStorage/delete",
          start: 527,
          end: 533,
          line: 15,
        },
        {
          api: "EventTarget/addEventListener",
          start: 572,
          end: 588,
          line: 20,
        },
        {
          api: "String/startsWith",
          start: 718,
          end: 728,
          line: 24,
        },
        {
          api: "FetchEvent/respondWith",
          start: 760,
          end: 771,
          line: 27,
        },
        {
          api: "Window/fetch",
          start: 777,
          end: 782,
          line: 28,
        },
        {
          api: "Promise/catch",
          start: 798,
          end: 803,
          line: 28,
        },
        {
          api: "CacheStorage/open",
          start: 859,
          end: 863,
          line: 29,
        },
        {
          api: "String/match",
          start: 872,
          end: 877,
          line: 29,
        },
        {
          api: "Response/Response",
          start: 931,
          end: 939,
          line: 32,
        },
      ],
    },
    {
      chapter: 35,
      lesson: 0,
      file: 0,
      sourceHash: "c632bf5a",
      uses: [
        {
          api: "Intl/NumberFormat",
          start: 108,
          end: 120,
          line: 2,
        },
        {
          api: "Object/freeze",
          start: 189,
          end: 195,
          line: 6,
        },
        {
          api: "Number/isFinite",
          start: 236,
          end: 244,
          line: 8,
        },
        {
          api: "TypeError/TypeError",
          start: 271,
          end: 280,
          line: 9,
        },
        {
          api: "Intl/NumberFormat/format",
          start: 331,
          end: 337,
          line: 10,
        },
      ],
    },
    {
      chapter: 36,
      lesson: 0,
      file: 0,
      sourceHash: "f9290989",
      uses: [
        {
          api: "Math/floor",
          start: 141,
          end: 146,
          line: 5,
        },
        {
          api: "console/log",
          start: 322,
          end: 325,
          line: 12,
        },
        {
          api: "Map/Map",
          start: 418,
          end: 421,
          line: 13,
        },
        {
          api: "Array/map",
          start: 484,
          end: 487,
          line: 17,
        },
        {
          api: "console/log",
          start: 524,
          end: 527,
          line: 19,
        },
        {
          api: "Map/get",
          start: 536,
          end: 539,
          line: 19,
        },
      ],
    },
    {
      chapter: 36,
      lesson: 1,
      file: 0,
      sourceHash: "dd637911",
      uses: [
        {
          api: "Set/Set",
          start: 85,
          end: 88,
          line: 3,
        },
        {
          api: "Array/push",
          start: 213,
          end: 217,
          line: 7,
        },
        {
          api: "Map/get",
          start: 254,
          end: 257,
          line: 8,
        },
        {
          api: "Set/has",
          start: 292,
          end: 295,
          line: 9,
        },
        {
          api: "Set/add",
          start: 321,
          end: 324,
          line: 10,
        },
        {
          api: "Array/push",
          start: 346,
          end: 350,
          line: 11,
        },
        {
          api: "Map/Map",
          start: 413,
          end: 416,
          line: 17,
        },
        {
          api: "console/log",
          start: 501,
          end: 504,
          line: 23,
        },
      ],
    },
    {
      chapter: 37,
      lesson: 0,
      file: 1,
      sourceHash: "b5fd8175",
      uses: [
        {
          api: "console/log",
          start: 218,
          end: 221,
          line: 8,
        },
      ],
    },
    {
      chapter: 37,
      lesson: 1,
      file: 0,
      sourceHash: "e9ccbdb6",
      uses: [
        {
          api: "Intl/Collator",
          start: 66,
          end: 74,
          line: 2,
        },
        {
          api: "console/log",
          start: 115,
          end: 118,
          line: 3,
        },
        {
          api: "Array/toSorted",
          start: 125,
          end: 133,
          line: 3,
        },
        {
          api: "Intl/Collator/compare",
          start: 143,
          end: 150,
          line: 3,
        },
        {
          api: "Intl/PluralRules",
          start: 178,
          end: 189,
          line: 4,
        },
        {
          api: "Intl/PluralRules/select",
          start: 241,
          end: 247,
          line: 6,
        },
        {
          api: "console/log",
          start: 295,
          end: 298,
          line: 7,
        },
        {
          api: "console/log",
          start: 508,
          end: 511,
          line: 17,
        },
        {
          api: "console/log",
          start: 542,
          end: 545,
          line: 18,
        },
      ],
    },
    {
      chapter: 37,
      lesson: 2,
      file: 0,
      sourceHash: "3788ae1e",
      uses: [
        {
          api: "node/fs/mkdtemp",
          start: 161,
          end: 168,
          line: 4,
        },
        {
          api: "node/path/join",
          start: 169,
          end: 173,
          line: 4,
        },
        {
          api: "node/os/tmpdir",
          start: 174,
          end: 180,
          line: 4,
        },
        {
          api: "node/path/join",
          start: 220,
          end: 224,
          line: 6,
        },
        {
          api: "node/fs/writeFile",
          start: 257,
          end: 266,
          line: 7,
        },
        {
          api: "console/log",
          start: 312,
          end: 315,
          line: 8,
        },
        {
          api: "node/fs/readFile",
          start: 322,
          end: 330,
          line: 8,
        },
        {
          api: "node/fs/rm",
          start: 367,
          end: 369,
          line: 10,
        },
      ],
    },
  ],
};
