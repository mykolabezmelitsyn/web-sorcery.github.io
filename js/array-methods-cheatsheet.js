/* Add only Array Methods categories supplied by the user, in image order. */
const handbook = {
  categories: [
    {
      name: "Transformation Methods",
      id: "transformation-methods",
      intro:
        "map() → filter() → reduce(), following all seven images. Run snippets independently in a modern browser or Node.js with fetch support. The DOM list example includes a complete HTML file. Inputs and async checks are defined; edge cases distinguish holes, shallow references, repeated keys, falsy values, and empty reductions.",
      methods: [
        {
          name: "map() — transform elements",
          explanation:
            "Creates a new array from each visited element’s callback result. Use it when each input position should produce a transformed output.",
          note: "map does not itself mutate the input, but its callback can. The output uses the initial input length; sparse holes are skipped and preserved rather than filled, and mutation during iteration can affect which positions are visited.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
          examples: [
            {
              label: "Double numbers without changing the input",
              language: "javascript",
              code: "const numbers = [1, 2, 3, 4, 5];\nconst doubled = numbers.map(value => value * 2);\nconsole.log(...doubled);\nconsole.log(doubled !== numbers, ...numbers);",
            },
            {
              label: "Preserve a sparse hole",
              language: "javascript",
              code: "const numbers = [1, , 3]; let calls = 0;\nconst mapped = numbers.map(value => { calls++; return value * 2; });\nconsole.log(mapped.length, 1 in mapped, calls, mapped[2]);",
            },
          ],
        },
        {
          name: "map() callback index and source array",
          explanation:
            "Receives the current value, index, and source array in the callback. Use them for labels, first/last flags, or position-aware records.",
          note: "The third argument is the source array, not the new result currently being constructed.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
          examples: [
            {
              label: "Build indexed labels",
              language: "javascript",
              code: 'const indexed = ["a", "b"].map((value, index) => `${index}: ${value}`);\nconsole.log(...indexed);',
            },
            {
              label: "Build records with boundary flags",
              language: "javascript",
              code: "const numbers = [10, 20];\nconst detailed = numbers.map((value, index, array) => ({ value, index, isFirst: index === 0, isLast: index === array.length - 1 }));\nfor (const row of detailed) console.log(row.value, row.index, row.isFirst, row.isLast);",
            },
          ],
        },
        {
          name: "Map objects into enriched records",
          explanation:
            "Returns new objects that combine existing fields with derived values. Use it to prepare presentation data while preserving original records.",
          note: "Object spread is shallow; nested references are still shared unless separately copied. Parenthesize an object literal returned by a concise arrow.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
          examples: [
            {
              label: "Add display names and adult flags",
              language: "javascript",
              code: 'const users = [{ id: 1, name: "John", age: 30 }, { id: 2, name: "Jane", age: 25 }];\nconst cards = users.map(user => ({ ...user, displayName: `${user.name} (${user.age})`, isAdult: user.age >= 18 }));\nconsole.log(cards[0].displayName, cards[1].isAdult, cards[0] !== users[0]);',
            },
            {
              label: "Keep original top-level fields unchanged",
              language: "javascript",
              code: 'const users = [{ id: 1, name: "John", age: 30 }, { id: 2, name: "Jane", age: 25 }];\nconst updated = users.map(user => ({ ...user, age: user.age + 1 }));\nconsole.log(users[0].age, updated[0].age);',
            },
          ],
        },
        {
          name: "Extract properties with map()",
          explanation:
            "Creates an array containing a selected property from each record. Use it for labels, IDs, or a data series.",
          note: "An absent property produces undefined at that position; map does not remove the item.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
          examples: [
            {
              label: "Extract user names",
              language: "javascript",
              code: 'const users = [{ id: 1, name: "John", age: 30 }, { id: 2, name: "Jane", age: 25 }];\nconsole.log(...users.map(user => user.name));',
            },
            {
              label: "Keep positions when a property is absent",
              language: "javascript",
              code: 'const users = [{ name: "John" }, {}];\nconst names = users.map(user => user.name);\nconsole.log(names.length, names[0], names[1]);',
            },
          ],
        },
        {
          name: "Chain map() with other transformations",
          explanation:
            "Feeds one transformation’s result into the next method. Use it to express ordered mapping and selection steps.",
          note: "Each map/filter step creates an intermediate array. Choose a clear pipeline first and measure if very large workloads make allocation significant.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
          examples: [
            {
              label: "Double, select, and label",
              language: "javascript",
              code: "const numbers = [1, 2, 3, 4, 5];\nconst result = numbers.map(value => value * 2).filter(value => value > 5).map(value => `Number: ${value}`);\nconsole.log(...result);",
            },
            {
              label: "Extract and normalize names",
              language: "javascript",
              code: 'const users = [{ name: "John" }, { name: "Jane" }];\nconsole.log(...users.map(user => user.name).map(name => name.toUpperCase()));',
            },
          ],
        },
        {
          name: "Convert strings to numbers with map()",
          explanation:
            "Applies numeric conversion to each input string. Use Number for whole-string conversion or a wrapper around parseInt for explicit integer parsing.",
          note: "Do not pass parseInt directly to map: the index becomes its radix argument. Number and parseInt also differ for strings containing units or extra text.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
          examples: [
            {
              label: "Convert complete numeric strings",
              language: "javascript",
              code: 'console.log(...["1", "2", "3"].map(Number));\nconsole.log(...["1", "2", "3"].map(value => parseInt(value, 10)));',
            },
            {
              label: "Avoid the parseInt callback-argument trap",
              language: "javascript",
              code: 'const wrong = ["10", "10", "10"].map(parseInt);\nconsole.log(wrong[0], Number.isNaN(wrong[1]), wrong[2]);\nconsole.log(...["10", "10", "10"].map(value => parseInt(value, 10)));',
            },
          ],
        },
        {
          name: "Create list markup or elements with map()",
          explanation:
            "Transforms item data into a list of markup strings or DOM nodes. Use plain text node construction for external text.",
          note: "Markup interpolation is only used with fixed trusted values here and does not escape external input. The second example is a complete HTML file; save it as index.html and open it in a browser.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
          examples: [
            {
              label: "Build trusted list markup",
              language: "javascript",
              code: 'const items = ["Apple", "Banana", "Orange"];\nconst listItems = items.map(item => `<li>${item}</li>`);\nconsole.log(listItems.join(""));',
            },
            {
              label: "Construct text-bearing list elements",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8">\n<title>Array transformation example</title>\n<body>\n<ul></ul>\n<script>\nconst items = ["Apple", "<b>Literal</b>"];\nconst listItems = items.map(item => { const li = document.createElement("li"); li.textContent = item; return li; });\ndocument.querySelector("ul").append(...listItems);\nconsole.log(document.querySelectorAll("li").length, listItems[1].textContent, document.querySelector("b"));\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Async mapping with Promise.all()",
          explanation:
            "Maps values to promises and awaits their input-ordered results together. Use it for independent asynchronous transformations.",
          note: "map itself does not await async callbacks. Operations begin as callbacks run; Promise.all coordinates them and does not impose a concurrency limit or cancel outstanding work after failure.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
          examples: [
            {
              label: "Fetch and parse self-contained URLs",
              language: "javascript",
              code: 'const urls = ["data:application/json,1", "data:application/json,2"];\nconst promises = urls.map(async url => {\n  const response = await fetch(url);\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  return response.json();\n});\nPromise.all(promises).then(results => console.log(...results)).catch(error => console.log(error.name));',
            },
            {
              label: "Handle a failed mapped operation",
              language: "javascript",
              code: 'const promises = ["data:application/json,1", "data:application/json,invalid"].map(async url => {\n  const response = await fetch(url); return response.json();\n});\nPromise.all(promises).catch(error => console.log(error.name));',
            },
          ],
        },
        {
          name: "filter() — select elements",
          explanation:
            "Creates a new array containing visited elements whose predicate returns a truthy result. Use it to select a subset without changing input membership.",
          note: "The method itself does not mutate the source, but callback code can. Sparse holes are skipped, and retained object references are not cloned.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
          examples: [
            {
              label: "Select even and odd numbers",
              language: "javascript",
              code: "const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\nconsole.log(...numbers.filter(value => value % 2 === 0));\nconsole.log(...numbers.filter(value => value % 2 !== 0));",
            },
            {
              label: "Handle no matches and sparse holes",
              language: "javascript",
              code: "const numbers = [1, , 3];\nconsole.log(numbers.filter(value => value > 10).length);\nconst allVisited = numbers.filter(() => true);\nconsole.log(allVisited.length, ...allVisited, numbers.length);",
            },
          ],
        },
        {
          name: "Filter by callback index",
          explanation:
            "Uses the predicate index to retain selected input positions. Use it for a prefix or positional subset.",
          note: "The index refers to the source array rather than the growing filtered result.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
          examples: [
            {
              label: "Keep the first half by index",
              language: "javascript",
              code: "const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\nconsole.log(...numbers.filter((value, index) => index < 5));",
            },
            {
              label: "Keep alternating source positions",
              language: "javascript",
              code: 'console.log(...["a", "b", "c", "d"].filter((value, index) => index % 2 === 0));',
            },
          ],
        },
        {
          name: "Filter objects by multiple conditions",
          explanation:
            "Selects records satisfying combined property tests. Use it for rules such as active adult membership.",
          note: "The selected records are the original object references, so later object mutations are shared with the source.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
          examples: [
            {
              label: "Select active adults",
              language: "javascript",
              code: 'const users = [{ name: "John", age: 30, active: true }, { name: "Jane", age: 25, active: false }, { name: "Bob", age: 17, active: true }];\nconst activeAdults = users.filter(user => user.age >= 18 && user.active);\nconsole.log(activeAdults.length, activeAdults[0].name);',
            },
            {
              label: "Inspect reference sharing",
              language: "javascript",
              code: 'const users = [{ name: "John", age: 30, active: true }, { name: "Jane", age: 25, active: false }, { name: "Bob", age: 17, active: true }];\nconst adults = users.filter(user => user.age >= 18);\nconsole.log(adults[0] === users[0], users.length);',
            },
          ],
        },
        {
          name: "Remove duplicates with filter() and indexOf()",
          explanation:
            "Keeps a value only at its first indexOf position. Use this familiar pattern for small collections with indexOf-compatible equality.",
          note: "This pattern can be quadratic and drops NaN because indexOf cannot find it. Objects are compared by identity, not by matching fields.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
          examples: [
            {
              label: "Keep the first occurrence",
              language: "javascript",
              code: "const values = [1, 2, 2, 3, 3, 3, 4];\nconsole.log(...values.filter((value, index, array) => array.indexOf(value) === index));",
            },
            {
              label: "Recognize the NaN limitation",
              language: "javascript",
              code: "const unique = [NaN, NaN, 1].filter((value, index, array) => array.indexOf(value) === index);\nconsole.log(unique.length, unique[0]);",
            },
          ],
        },
        {
          name: "Remove falsy values with filter(Boolean)",
          explanation:
            "Retains values that Boolean converts to true. Use it when every falsy value should be discarded.",
          note: "This also removes valid application values such as zero, false, and empty strings. Use an explicit predicate if only nullish values should be removed.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
          examples: [
            {
              label: "Remove all falsy values",
              language: "javascript",
              code: 'const mixed = [0, 1, false, 2, "", 3, null, undefined, 4, NaN];\nconsole.log(...mixed.filter(Boolean));',
            },
            {
              label:
                "Compare removing all falsy values with nullish-only selection",
              language: "javascript",
              code: 'const values = [0, false, "", null, undefined];\nconsole.log(values.filter(Boolean).length);\nconst kept = values.filter(value => value !== null && value !== undefined);\nconsole.log(kept.length, ...kept);',
            },
          ],
        },
        {
          name: "Filter records by a search term",
          explanation:
            "Retains records whose normalized text contains a search term. Use it for a simple case-insensitive substring search.",
          note: "This is a substring comparison rather than a locale-aware or accent-insensitive search engine. The example defines all input records and the search term.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
          examples: [
            {
              label: "Match product names case-insensitively",
              language: "javascript",
              code: 'const products = [{ name: "iPhone 12", price: 999 }, { name: "Samsung Galaxy", price: 899 }, { name: "iPhone 13", price: 1099 }];\nconst searchTerm = "IPHONE";\nconsole.log(...products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())).map(product => product.name));',
            },
            {
              label: "Return no matches for an absent term",
              language: "javascript",
              code: 'const products = [{ name: "Book" }, { name: "Pen" }], searchTerm = "phone";\nconsole.log(products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())).length);',
            },
          ],
        },
        {
          name: "Filter numeric ranges",
          explanation:
            "Combines comparison predicates to keep values within a numeric interval. Use explicit inclusive or exclusive limits to match the rule.",
          note: "The examples use actual numbers. Validate or convert external values deliberately rather than depending on accidental coercion.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
          examples: [
            {
              label: "Keep an inclusive interval",
              language: "javascript",
              code: "const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\nconsole.log(...numbers.filter(value => value >= 3 && value <= 7));",
            },
            {
              label: "Exclude the boundary values",
              language: "javascript",
              code: "console.log(...[2, 3, 4, 5, 6].filter(value => value > 2 && value < 6));",
            },
          ],
        },
        {
          name: "Chain filters and property mapping",
          explanation:
            "Applies separate selection rules and then projects the retained records. Use it when distinct rules improve readability.",
          note: "Each filter creates another array. A single combined predicate can express the same selection when that is clearer.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
          examples: [
            {
              label: "Select adults, then active users, then names",
              language: "javascript",
              code: 'const users = [{ name: "John", age: 30, active: true }, { name: "Jane", age: 25, active: false }, { name: "Bob", age: 17, active: true }];\nconsole.log(...users.filter(user => user.age >= 18).filter(user => user.active).map(user => user.name));',
            },
            {
              label: "Compare with a combined predicate",
              language: "javascript",
              code: 'const users = [{ name: "John", age: 30, active: true }, { name: "Jane", age: 25, active: false }, { name: "Bob", age: 17, active: true }];\nconst chained = users.filter(user => user.age >= 18).filter(user => user.active);\nconst combined = users.filter(user => user.age >= 18 && user.active);\nconsole.log(chained.length, combined.length, chained[0] === combined[0]);',
            },
          ],
        },
        {
          name: "Filter using asynchronous checks",
          explanation:
            "Awaits predicate results before applying a synchronous filter. Use a mapped keep flag or aligned result array for asynchronous selection.",
          note: "An async predicate passed directly to filter returns a truthy Promise, so it does not perform asynchronous filtering. Promise.all preserves alignment with input order.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
          examples: [
            {
              label: "Await keep flags and then select",
              language: "javascript",
              code: "const items = [1, 2, 3, 4];\nasync function checkAsync(item) { return item % 2 === 0; }\nPromise.all(items.map(async item => ({ item, keep: await checkAsync(item) })))\n  .then(results => results.filter(result => result.keep).map(result => result.item))\n  .then(filtered => console.log(...filtered));",
            },
            {
              label: "Avoid a direct async filter predicate",
              language: "javascript",
              code: "const items = [1, 2];\nconsole.log(items.filter(async () => false).length); // 2: promises are truthy\n(async () => {\n  const keep = await Promise.all(items.map(async () => false));\n  console.log(items.filter((item, index) => keep[index]).length);\n})();",
            },
          ],
        },
        {
          name: "reduce() — sum and product",
          explanation:
            "Combines visited values into one accumulator result. Use an initial value that represents the operation’s identity.",
          note: "An explicit initial value makes empty-input behavior predictable: zero for addition and one for multiplication. reduce can return any accumulator type; the callback must return the next accumulator.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
          examples: [
            {
              label: "Sum a numeric array",
              language: "javascript",
              code: "const numbers = [1, 2, 3, 4, 5];\nconsole.log(numbers.reduce((acc, current) => acc + current, 0));",
            },
            {
              label: "Multiply and handle empty inputs",
              language: "javascript",
              code: "const numbers = [1, 2, 3, 4, 5];\nconsole.log(numbers.reduce((acc, current) => acc * current, 1));\nconsole.log([].reduce((acc, current) => acc + current, 0), [].reduce((acc, current) => acc * current, 1));",
            },
          ],
        },
        {
          name: "reduce() callback parameters",
          explanation:
            "Receives accumulator, current value, source index, and source array. Use these to build an aggregate with position-aware information.",
          note: "With an explicit initial value, the first visited element starts the callback; without one, the first present element seeds the accumulator and is not passed through the callback.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
          examples: [
            {
              label: "Inspect all callback parameters",
              language: "javascript",
              code: "const numbers = [1, 2, 3];\nconst sum = numbers.reduce((acc, current, index, array) => {\n  console.log(index, acc, current, array === numbers);\n  return acc + current;\n}, 0);\nconsole.log(sum);",
            },
            {
              label: "Observe the first callback without an initial value",
              language: "javascript",
              code: "const indices = [];\nconst total = [1, 2, 3].reduce((acc, current, index) => { indices.push(index); return acc + current; });\nconsole.log(total, ...indices);",
            },
          ],
        },
        {
          name: "Find maximum and minimum with reduce()",
          explanation:
            "Carries the largest or smallest visited number as an accumulator. Use it for extrema when the input and empty-array policy are explicit.",
          note: "A reduction without an initial value throws on an empty array. Numeric sentinel seeds such as Infinity are alternatives, but their empty result must match the application’s intended policy.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
          examples: [
            {
              label: "Find extrema of a nonempty array",
              language: "javascript",
              code: "const numbers = [1, 2, 3, 4, 5];\nconst max = numbers.reduce((max, current) => current > max ? current : max);\nconst min = numbers.reduce((min, current) => Math.min(min, current));\nconsole.log(max, min);",
            },
            {
              label: "Choose null when the input is empty",
              language: "javascript",
              code: "function extrema(numbers) {\n  if (numbers.length === 0) return null;\n  return { max: numbers.reduce((a, b) => Math.max(a, b)), min: numbers.reduce((a, b) => Math.min(a, b)) };\n}\nconsole.log(extrema([]));\ntry { [].reduce((a, b) => Math.max(a, b)); } catch (error) { console.log(error.name); }",
            },
          ],
        },
        {
          name: "Count occurrences with reduce()",
          explanation:
            "Builds a dictionary of counts indexed by each item’s key. Use it to summarize category or token frequencies.",
          note: "A null-prototype accumulator avoids collisions with inherited names such as constructor or __proto__. Values become object property keys, so choose a key policy appropriate for the data.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
          examples: [
            {
              label: "Count repeated letters",
              language: "javascript",
              code: 'const items = ["a", "b", "a", "c", "b", "a"];\nconst counts = items.reduce((acc, item) => { acc[item] = (acc[item] ?? 0) + 1; return acc; }, Object.create(null));\nconsole.log(counts.a, counts.b, counts.c);',
            },
            {
              label: "Count keys that collide with Object.prototype names",
              language: "javascript",
              code: 'const counts = ["__proto__", "constructor", "__proto__"].reduce((acc, item) => { acc[item] = (acc[item] ?? 0) + 1; return acc; }, Object.create(null));\nconsole.log(counts.__proto__, counts.constructor, Object.getPrototypeOf(counts));',
            },
          ],
        },
        {
          name: "Group records by a property",
          explanation:
            "Accumulates an array for each selected property value. Use it to organize records into categories.",
          note: "Use a null-prototype dictionary for arbitrary string keys. Grouped records remain original references rather than cloned objects.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
          examples: [
            {
              label: "Group users by role",
              language: "javascript",
              code: 'const users = [{ name: "John", age: 30, role: "admin" }, { name: "Jane", age: 25, role: "user" }, { name: "Bob", age: 35, role: "admin" }];\nconst grouped = users.reduce((acc, user) => { (acc[user.role] ??= []).push(user); return acc; }, Object.create(null));\nconsole.log(...grouped.admin.map(user => user.name), grouped.user[0].name);',
            },
            {
              label: "Group items with a special category name",
              language: "javascript",
              code: 'const items = [{ category: "__proto__", value: 1 }, { category: "__proto__", value: 2 }];\nconst grouped = items.reduce((acc, item) => { (acc[item.category] ??= []).push(item); return acc; }, Object.create(null));\nconsole.log(grouped.__proto__.length, grouped.__proto__[0] === items[0]);',
            },
          ],
        },
        {
          name: "Flatten one level with reduce()",
          explanation:
            "Concatenates each nested array into one accumulator array. Use it to recognize a one-level flattening reduction.",
          note: "This does not recursively flatten deeper nesting. Repeated concatenation copies the growing accumulator and can be expensive for very large inputs.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
          examples: [
            {
              label: "Flatten a list of arrays",
              language: "javascript",
              code: "const nested = [[1, 2], [3, 4], [5]];\nconsole.log(...nested.reduce((acc, array) => acc.concat(array), []));",
            },
            {
              label: "Keep deeper arrays as shared values",
              language: "javascript",
              code: "const deep = [2, 3];\nconst result = [[1], [deep]].reduce((acc, array) => acc.concat(array), []);\nconsole.log(result.length, result[1] === deep);",
            },
          ],
        },
        {
          name: "Create a lookup dictionary",
          explanation:
            "Indexes records by a selected property for later access. Use it when a known key should retrieve a record.",
          note: "This example creates an object dictionary rather than a JavaScript Map. Repeated keys overwrite earlier records, and a null prototype avoids inherited-key collisions.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
          examples: [
            {
              label: "Index users by name",
              language: "javascript",
              code: 'const users = [{ name: "John", age: 30, role: "admin" }, { name: "Jane", age: 25, role: "user" }, { name: "Bob", age: 35, role: "admin" }];\nconst lookup = users.reduce((acc, user) => { acc[user.name] = user; return acc; }, Object.create(null));\nconsole.log(lookup.John.age, lookup.Jane === users[1]);',
            },
            {
              label: "Define the duplicate-key overwrite policy",
              language: "javascript",
              code: 'const users = [{ name: "John", id: 1 }, { name: "John", id: 2 }];\nconst lookup = users.reduce((acc, user) => { acc[user.name] = user; return acc; }, Object.create(null));\nconsole.log(lookup.John.id);',
            },
          ],
        },
        {
          name: "Calculate an average",
          explanation:
            "Aggregates a sum and divides by the array length. Use an explicit empty-input policy rather than silently returning a misleading result.",
          note: "The callback-last-index variation assumes a dense numeric array; holes can make that pattern incorrect. The helper here defines a dense finite-number input contract and returns null for an empty input.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
          examples: [
            {
              label: "Calculate a dense array average",
              language: "javascript",
              code: "const numbers = [1, 2, 3, 4, 5];\nconst average = numbers.reduce((acc, number, index, array) => {\n  acc += number;\n  return index === array.length - 1 ? acc / array.length : acc;\n}, 0);\nconsole.log(average);",
            },
            {
              label: "Handle an empty array deliberately",
              language: "javascript",
              code: "function average(numbers) { return numbers.length ? numbers.reduce((sum, value) => sum + value, 0) / numbers.length : null; }\nconsole.log(average([]), average([2, 4]));",
            },
          ],
        },
        {
          name: "Pipe synchronous functions with reduce()",
          explanation:
            "Passes a value through functions from left to right. Use it to compose a small synchronous transformation pipeline.",
          note: "An empty function list acts as the identity function. This helper is synchronous and does not automatically await promise-returning stages.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
          examples: [
            {
              label: "Compose addition, doubling, and squaring",
              language: "javascript",
              code: "const pipe = (...functions) => value => functions.reduce((acc, fn) => fn(acc), value);\nconst addOne = value => value + 1, double = value => value * 2, square = value => value * value;\nconsole.log(pipe(addOne, double, square)(3));",
            },
            {
              label: "Use the empty pipeline as identity",
              language: "javascript",
              code: "const pipe = (...functions) => value => functions.reduce((acc, fn) => fn(acc), value);\nconsole.log(pipe()(7));",
            },
          ],
        },
        {
          name: "Remove duplicates with reduce() and includes()",
          explanation:
            "Accumulates only values that are not already present in the result. Use it to recognize an explicit first-occurrence deduplication reduction.",
          note: "includes uses SameValueZero equality, so it can match NaN. Objects still compare by identity, and repeated linear membership tests can make the pattern quadratic.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
          examples: [
            {
              label: "Keep the first occurrence",
              language: "javascript",
              code: "const items = [1, 2, 2, 3, 3, 4];\nconst unique = items.reduce((acc, item) => { if (!acc.includes(item)) acc.push(item); return acc; }, []);\nconsole.log(...unique);",
            },
            {
              label: "Preserve a single NaN and shared object identity",
              language: "javascript",
              code: "const object = {};\nconst unique = [NaN, NaN, object, object].reduce((acc, item) => { if (!acc.includes(item)) acc.push(item); return acc; }, []);\nconsole.log(unique.length, Number.isNaN(unique[0]), unique[1] === object);",
            },
          ],
        },
      ],
    },
    {
      name: "Searching & Testing",
      id: "searching-testing",
      intro:
        "find()/findIndex() and reverse searches → some()/every() → includes()/indexOf()/lastIndexOf() → occurrence, duplicate, update and repeated-lookup patterns. Run examples independently in a modern browser or Node.js with ES2023 findLast support. All inputs are defined, and equality, holes, empty inputs, not-found sentinels, and fallback limits are explicit.",
      methods: [
        {
          name: "find() — first matching element",
          explanation:
            "Returns the first value satisfying a predicate, stopping once a match is found. Use it when one matching value is needed rather than every match.",
          note: "Returns undefined if nothing matches, which can be ambiguous if the matching value itself is undefined. Unlike some/every, find visits sparse holes as undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find",
          examples: [
            {
              label: "Find the first even and first larger number",
              language: "javascript",
              code: "const numbers = [1, 2, 3, 4, 5];\nconsole.log(numbers.find(value => value % 2 === 0), numbers.find(value => value > 3), numbers.find(value => value > 10));",
            },
            {
              label: "Visit a sparse hole as undefined",
              language: "javascript",
              code: "const values = [1, , 3]; let calls = 0;\nconst found = values.find(value => { calls++; return value === undefined; });\nconsole.log(found, calls);",
            },
          ],
        },
        {
          name: "Find objects by their properties",
          explanation:
            "Returns the original record matching an ID or field condition. Use it to retrieve one object without creating a filtered result array.",
          note: "The returned object is shared with the source array. Guard missing results before accessing fields.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find",
          examples: [
            {
              label: "Find a user and the first qualifying age",
              language: "javascript",
              code: 'const users = [{ id: 1, name: "John", age: 30 }, { id: 2, name: "Jane", age: 25 }, { id: 3, name: "Bob", age: 35 }];\nconsole.log(users.find(user => user.id === 2)?.name, users.find(user => user.age >= 30)?.name);',
            },
            {
              label: "Handle an absent record",
              language: "javascript",
              code: 'const users = [{ id: 1, name: "John", age: 30 }, { id: 2, name: "Jane", age: 25 }, { id: 3, name: "Bob", age: 35 }];\nconst user = users.find(user => user.id === 123);\nconsole.log(user, user?.name ?? "Not found");',
            },
          ],
        },
        {
          name: "Use the find callback index and source",
          explanation:
            "Combines a value test with source position or other source-array information. Use callback arguments for a position-sensitive search.",
          note: "find stops at the first truthy predicate result. The third callback argument is the source array.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find",
          examples: [
            {
              label: "Find an even value after index two",
              language: "javascript",
              code: "const numbers = [1, 2, 3, 4, 5];\nconsole.log(numbers.find((value, index) => index > 2 && value % 2 === 0));",
            },
            {
              label: "Inspect early termination and source identity",
              language: "javascript",
              code: "const numbers = [1, 2, 3]; const visited = [];\nconst found = numbers.find((value, index, array) => { visited.push(index); return array === numbers && value === 2; });\nconsole.log(found, ...visited);",
            },
          ],
        },
        {
          name: "findIndex() — first matching position",
          explanation:
            "Returns the index of the first predicate match or -1 when none matches. Use it when a position is needed for an update or removal.",
          note: "Index zero is valid and falsy, while -1 is truthy: compare explicitly with -1. Sparse holes are visited as undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex",
          examples: [
            {
              label: "Find the first even position",
              language: "javascript",
              code: "const numbers = [1, 2, 3, 4, 5];\nconsole.log(numbers.findIndex(value => value % 2 === 0), numbers.findIndex(value => value > 10));",
            },
            {
              label: "Keep index zero distinct from a missing match",
              language: "javascript",
              code: "console.log([2, 3].findIndex(value => value === 2), [2, 3].findIndex(value => value === 9));",
            },
          ],
        },
        {
          name: "Update a record found by index",
          explanation:
            "Finds a record position and replaces that array slot with an updated object. Use an explicit not-found guard before assigning.",
          note: "The array is mutated by the assignment, while object spread creates a new shallow record. findIndex itself does not perform the update.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex",
          examples: [
            {
              label: "Replace a found user record",
              language: "javascript",
              code: 'const users = [{ id: 1, name: "John", age: 30 }, { id: 2, name: "Jane", age: 25 }, { id: 3, name: "Bob", age: 35 }];\nconst index = users.findIndex(user => user.id === 2);\nif (index !== -1) users[index] = { ...users[index], age: 26 };\nconsole.log(users[1].name, users[1].age);',
            },
            {
              label: "Skip a missing record",
              language: "javascript",
              code: 'const users = [{ id: 1, name: "John", age: 30 }, { id: 2, name: "Jane", age: 25 }, { id: 3, name: "Bob", age: 35 }];\nconst index = users.findIndex(user => user.id === 123);\nif (index !== -1) users[index] = { ...users[index], age: 26 };\nconsole.log(users.length, Object.hasOwn(users, "-1"));',
            },
          ],
        },
        {
          name: "Remove a record found by condition",
          explanation:
            "Finds the matching slot and removes one element with splice. Use it for in-place removal of a single record.",
          note: "Always guard -1: splice(-1, 1) would remove the final element when no match exists.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex",
          examples: [
            {
              label: "Remove the matching user",
              language: "javascript",
              code: 'const users = [{ id: 1, name: "John", age: 30 }, { id: 2, name: "Jane", age: 25 }, { id: 3, name: "Bob", age: 35 }];\nconst index = users.findIndex(user => user.name === "Bob");\nif (index !== -1) users.splice(index, 1);\nconsole.log(...users.map(user => user.name));',
            },
            {
              label: "Do not remove an unrelated final element",
              language: "javascript",
              code: 'const users = [{ id: 1, name: "John", age: 30 }, { id: 2, name: "Jane", age: 25 }, { id: 3, name: "Bob", age: 35 }];\nconst index = users.findIndex(user => user.name === "Missing");\nif (index !== -1) users.splice(index, 1);\nconsole.log(users.length, users.at(-1).name);',
            },
          ],
        },
        {
          name: "findLast() — search values from the end",
          explanation:
            "Visits positions in descending index order and returns the first matching value encountered. Use it to retrieve the last match in array order.",
          note: "ES2023. It does not reverse or mutate the array; missing matches return undefined. Sparse holes are visited as undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast",
          examples: [
            {
              label: "Find the final even value",
              language: "javascript",
              code: "const numbers = [1, 2, 3, 4, 5];\nconsole.log(numbers.findLast(value => value % 2 === 0), numbers.findLast(value => value > 10));",
            },
            {
              label: "Observe reverse visitation order",
              language: "javascript",
              code: "const visited = [];\nconst found = [1, 2, 3, 4, 5].findLast((value, index) => { visited.push(index); return value % 2 === 0; });\nconsole.log(found, ...visited);",
            },
          ],
        },
        {
          name: "findLastIndex() — last matching position",
          explanation:
            "Returns the index of the first predicate match while searching from the end. Use it when a final matching slot is needed.",
          note: "ES2023. Returns -1 for no match and does not change the source ordering.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex",
          examples: [
            {
              label: "Find a final even index",
              language: "javascript",
              code: "console.log([1, 2, 3, 4, 5].findLastIndex(value => value % 2 === 0));",
            },
            {
              label: "Handle no match and an undefined hole",
              language: "javascript",
              code: "console.log([1, 2].findLastIndex(value => value > 10));\nconsole.log([1, , 3].findLastIndex(value => value === undefined));",
            },
          ],
        },
        {
          name: "Array-only findLast fallback",
          explanation:
            "Provides a standalone reverse predicate search when native findLast is unavailable. Use a feature check without modifying global prototypes.",
          note: "This is an explicitly array-only educational fallback, not a complete generic standards polyfill. A production polyfill must also implement the specification’s coercion and property-definition details; the image’s direct prototype assignment omits those.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast",
          examples: [
            {
              label: "Choose native support or a standalone fallback",
              language: "javascript",
              code: 'function findLastFallback(array, predicate, thisArg) {\n  if (!Array.isArray(array) || typeof predicate !== "function") throw new TypeError("Expected an array and predicate");\n  const length = array.length;\n  for (let index = length - 1; index >= 0; index--) {\n    const value = array[index];\n    if (predicate.call(thisArg, value, index, array)) return value;\n  }\n  return undefined;\n}\nconst values = [1, 2, 3, 4, 5];\nconst predicate = value => value % 2 === 0;\nconsole.log(typeof values.findLast === "function" ? values.findLast(predicate) : findLastFallback(values, predicate));\nconsole.log(findLastFallback(values, predicate));',
            },
            {
              label: "Forward thisArg and visit sparse positions",
              language: "javascript",
              code: 'function findLastFallback(array, predicate, thisArg) {\n  if (!Array.isArray(array) || typeof predicate !== "function") throw new TypeError("Expected an array and predicate");\n  const length = array.length;\n  for (let index = length - 1; index >= 0; index--) {\n    const value = array[index];\n    if (predicate.call(thisArg, value, index, array)) return value;\n  }\n  return undefined;\n}\nconst values = [1, , 3];\nconsole.log(findLastFallback(values, function (value) { return value === this.expected; }, { expected: undefined }));\ntry { findLastFallback(values, null); } catch (error) { console.log(error.name); }',
            },
          ],
        },
        {
          name: "some() — any passing value",
          explanation:
            "Returns true once a visited value passes the predicate, otherwise false. Use it for an existence test rather than retrieving the value itself.",
          note: "Short-circuits on the first truthy result and skips sparse holes. It is synchronous: an async predicate returns a truthy promise rather than an awaited boolean.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some",
          examples: [
            {
              label: "Check numeric conditions",
              language: "javascript",
              code: "const numbers = [1, 2, 3, 4, 5];\nconsole.log(numbers.some(value => value % 2 === 0), numbers.some(value => value < 0), numbers.some(value => value > 3));",
            },
            {
              label: "Skip sparse holes",
              language: "javascript",
              code: "const values = new Array(3); let calls = 0;\nconsole.log(values.some(() => { calls++; return true; }), calls);",
            },
          ],
        },
        {
          name: "Test object collections with some()",
          explanation:
            "Checks whether any record satisfies a property condition. Use it for flags such as any minor or inactive user.",
          note: "A missing property evaluates to undefined, so the supplied users have no admin role even though other fields are present.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some",
          examples: [
            {
              label: "Check for an admin, minor, and inactive user",
              language: "javascript",
              code: 'const users = [{ name: "John", age: 30, active: true }, { name: "Jane", age: 25, active: false }, { name: "Bob", age: 17, active: true }];\nconsole.log(users.some(user => user.role === "admin"), users.some(user => user.age < 18), users.some(user => !user.active));',
            },
            {
              label: "Require several properties on the same record",
              language: "javascript",
              code: 'const users = [{ name: "John", age: 30, active: true }, { name: "Jane", age: 25, active: false }, { name: "Bob", age: 17, active: true }];\nconsole.log(users.some(user => user.age >= 18 && user.active));',
            },
          ],
        },
        {
          name: "Observe some/every short-circuiting",
          explanation:
            "Stops some after the first passing result and every after the first failing result. Use it when testing should avoid unnecessary later work.",
          note: "These are value tests, not a substitute for a loop when every item must produce a side effect.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every",
          examples: [
            {
              label: "Stop some after the first true result",
              language: "javascript",
              code: "const visited = [];\nconst result = [1, 2, 3, 4, 5].some((value, index) => { visited.push(index); return value > 3; });\nconsole.log(result, ...visited);",
            },
            {
              label: "Stop every after the first false result",
              language: "javascript",
              code: "const visited = [];\nconst result = [1, 2, 3, 4, 5].every((value, index) => { visited.push(index); return value < 3; });\nconsole.log(result, ...visited);",
            },
          ],
        },
        {
          name: "every() — all passing values",
          explanation:
            "Returns true if all visited elements pass a predicate and false at the first failure. Use it for collection-wide conditions.",
          note: "Skips sparse holes and returns true for an empty array. If an application requires at least one item, check length separately.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every",
          examples: [
            {
              label: "Check positive, even, and small numbers",
              language: "javascript",
              code: "const numbers = [1, 2, 3, 4, 5];\nconsole.log(numbers.every(value => value > 0), numbers.every(value => value % 2 === 0), numbers.every(value => value < 10));",
            },
            {
              label: "Require a nonempty collection explicitly",
              language: "javascript",
              code: "function allPositiveNonempty(values) { return values.length > 0 && values.every(value => value > 0); }\nconsole.log([].every(value => value > 0), allPositiveNonempty([]), allPositiveNonempty([1, 2]));",
            },
          ],
        },
        {
          name: "Validate record fields with every()",
          explanation:
            "Applies a predicate to all records or field values. Use it for a clearly defined application-level validation rule.",
          note: "The email expression is a small syntax heuristic, not complete address validation or deliverability verification. A truthy result from each callback is sufficient.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every",
          examples: [
            {
              label: "Test all adults and nonempty names",
              language: "javascript",
              code: 'const users = [{ name: "John", age: 30, active: true }, { name: "Jane", age: 25, active: false }, { name: "Bob", age: 17, active: true }];\nconsole.log(users.every(user => user.age >= 18), users.every(user => typeof user.name === "string" && user.name.length > 0));',
            },
            {
              label: "Apply a simple email syntax heuristic",
              language: "javascript",
              code: 'const emails = ["user@example.com", "admin@site.org"];\nconst looksLikeEmail = email => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);\nconsole.log(emails.every(looksLikeEmail), ["invalid"].every(looksLikeEmail));',
            },
          ],
        },
        {
          name: "Empty arrays, sparse arrays, and all-falsy tests",
          explanation:
            "Distinguishes structural emptiness from a predicate that accepts every visited value. Use an explicit name for an all-falsy test instead of calling it empty.",
          note: "An array of holes can have positive length while some/every visit no elements. The image’s length === 0 || every(value => !value) condition accepts nonempty all-falsy arrays too.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every",
          examples: [
            {
              label: "Compare empty-array test results",
              language: "javascript",
              code: "console.log([].some(value => value > 0), [].every(value => value > 0));",
            },
            {
              label: "Do not mistake all-falsy values or holes for zero length",
              language: "javascript",
              code: 'const allFalsy = [0, false, ""];\nconst holes = new Array(2);\nconsole.log(allFalsy.length === 0, allFalsy.every(value => !value));\nconsole.log(holes.length, holes.every(() => false), holes.some(() => true));',
            },
          ],
        },
        {
          name: "Test selection, errors, and required values",
          explanation:
            "Builds collection-level UI flags with some and every. Use predicates that express exactly what counts as selected, erroneous, or filled.",
          note: "Whitespace-only text is treated as empty in the field example by trimming it. UI field checks are not a replacement for domain or server validation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every",
          examples: [
            {
              label: "Check selection and error flags",
              language: "javascript",
              code: 'const items = [{ selected: true, error: null }, { selected: false, error: "Missing" }];\nconsole.log(items.every(item => item.selected), items.some(item => Boolean(item.error)));',
            },
            {
              label: "Validate required nonblank text fields",
              language: "javascript",
              code: 'const fields = [{ value: "John" }, { value: "   " }];\nconsole.log(fields.every(field => typeof field.value === "string" && field.value.trim().length > 0));',
            },
          ],
        },
        {
          name: "includes() — value membership",
          explanation:
            "Returns whether an array contains a requested value. Use it for a boolean membership test.",
          note: "Uses SameValueZero equality, not exactly ===: NaN matches NaN, and positive/negative zero match. Objects still compare by reference.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes",
          examples: [
            {
              label: "Check present and missing values",
              language: "javascript",
              code: 'console.log([1, 2, 3].includes(2), ["a", "b"].includes("c"));',
            },
            {
              label: "Compare object identity",
              language: "javascript",
              code: "const user = { id: 1 };\nconsole.log([user].includes(user), [user].includes({ id: 1 }));",
            },
          ],
        },
        {
          name: "includes versus indexOf equality",
          explanation:
            "Distinguishes SameValueZero membership from indexOf’s strict-equality search. Use the difference deliberately for NaN and sparse arrays.",
          note: "includes treats sparse holes as undefined, whereas indexOf skips holes. Neither coerces string numbers into numeric equality.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes",
          examples: [
            {
              label: "Find NaN with includes only",
              language: "javascript",
              code: "console.log([NaN].includes(NaN), [NaN].indexOf(NaN), [0].includes(-0));",
            },
            {
              label: "Compare holes, undefined, and numeric strings",
              language: "javascript",
              code: 'const values = new Array(1);\nconsole.log(values.includes(undefined), values.indexOf(undefined), [1].includes("1"));',
            },
          ],
        },
        {
          name: "Search from a starting index",
          explanation:
            "Restricts includes or indexOf to positions at or after a normalized fromIndex. Use negative indices to start relative to the end while still searching forward.",
          note: "A negative index does not reverse the search. If the normalized start is at or beyond length, no match is possible.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes",
          examples: [
            {
              label: "Start at or after the matching position",
              language: "javascript",
              code: "const numbers = [1, 2, 3, 4, 5, NaN];\nconsole.log(numbers.includes(3, 3), numbers.includes(3, 2), numbers.indexOf(3, 3));",
            },
            {
              label: "Normalize negative and out-of-range starts",
              language: "javascript",
              code: "const numbers = [1, 2, 3, 4, 5, NaN];\nconsole.log(numbers.includes(3, -4), numbers.indexOf(3, -4), numbers.includes(3, 99), numbers.indexOf(3, -99));",
            },
          ],
        },
        {
          name: "Case-sensitive and multiple-value membership",
          explanation:
            "Combines includes with some or every to test requested values. Use some for any requested member and every for all requested members.",
          note: "String membership is case-sensitive. Normalize text explicitly if the application wants a different comparison policy.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes",
          examples: [
            {
              label: "Distinguish string case",
              language: "javascript",
              code: 'const fruits = ["apple", "banana", "orange"];\nconsole.log(fruits.includes("banana"), fruits.includes("Banana"));',
            },
            {
              label: "Test any and all requested values",
              language: "javascript",
              code: 'const array = ["a", "c"], requested = ["a", "b", "c"];\nconsole.log(requested.some(value => array.includes(value)), requested.every(value => array.includes(value)));',
            },
          ],
        },
        {
          name: "indexOf() — first value position",
          explanation:
            "Returns the first index strictly equal to a requested value, or -1 when missing. Use it when a position is needed instead of a boolean.",
          note: "Compare explicitly against -1 rather than checking truthiness. indexOf does not accept a predicate and cannot find NaN.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf",
          examples: [
            {
              label: "Read present and absent positions",
              language: "javascript",
              code: "const numbers = [1, 2, 3, 4, 5];\nconsole.log(numbers.indexOf(3), numbers.indexOf(10));",
            },
            {
              label: "Update a found value at index zero",
              language: "javascript",
              code: "const array = [1, 2, 3];\nconst position = array.indexOf(1);\nif (position !== -1) array[position] = 100;\nconsole.log(...array);",
            },
          ],
        },
        {
          name: "Find every occurrence with indexOf()",
          explanation:
            "Continues each search from the position after the previous match. Use it to collect matching indices without repeatedly returning the same match.",
          note: "The helper inherits indexOf equality and its inability to match NaN. Advancing the starting position ensures termination.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf",
          examples: [
            {
              label: "Collect repeated-value positions",
              language: "javascript",
              code: "function allIndices(array, value) {\n  const indices = [];\n  let index = array.indexOf(value);\n  while (index !== -1) { indices.push(index); index = array.indexOf(value, index + 1); }\n  return indices;\n}\nconsole.log(...allIndices([1, 2, 3, 2, 4, 2], 2));",
            },
            {
              label: "Handle missing and adjacent occurrences",
              language: "javascript",
              code: "function allIndices(array, value) {\n  const indices = [];\n  let index = array.indexOf(value);\n  while (index !== -1) { indices.push(index); index = array.indexOf(value, index + 1); }\n  return indices;\n}\nconsole.log(allIndices([1, 2], 9).length);\nconsole.log(...allIndices([2, 2, 2], 2));",
            },
          ],
        },
        {
          name: "lastIndexOf() — reverse value search",
          explanation:
            "Returns the last strictly equal position, searching backward from an optional start. Use it to find the final occurrence of a simple value.",
          note: "The start position is included in the search; negative starts are relative to the end. Returns -1 if no match exists and cannot match NaN.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf",
          examples: [
            {
              label: "Find the final occurrence and search before it",
              language: "javascript",
              code: "const array = [1, 2, 3, 2, 4, 2];\nconsole.log(array.lastIndexOf(2), array.lastIndexOf(2, 4));",
            },
            {
              label: "Handle negative starts and missing values",
              language: "javascript",
              code: "const array = [1, 2, 3, 2, 4, 2];\nconsole.log(array.lastIndexOf(2, -2), array.lastIndexOf(9), array.lastIndexOf(2, -99));",
            },
          ],
        },
        {
          name: "Remove all occurrences in place",
          explanation:
            "Repeatedly finds and splices a matching value until none remain. Use it when the original array must be mutated.",
          note: "The helper searches again after each removal so shifted adjacent matches are not skipped. Repeated searching and splicing can be costly for large arrays, and NaN is not matched by this pattern.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf",
          examples: [
            {
              label: "Remove repeated and adjacent matches",
              language: "javascript",
              code: "function removeAll(array, value) {\n  let index = array.indexOf(value);\n  while (index !== -1) { array.splice(index, 1); index = array.indexOf(value); }\n  return array;\n}\nconst array = [1, 2, 2, 3, 2];\nconsole.log(removeAll(array, 2) === array, ...array);",
            },
            {
              label: "Leave the array unchanged when no value matches",
              language: "javascript",
              code: "function removeAll(array, value) {\n  let index = array.indexOf(value);\n  while (index !== -1) { array.splice(index, 1); index = array.indexOf(value); }\n  return array;\n}\nconst array = [1, 3, 4];\nremoveAll(array, 2); console.log(...array);",
            },
          ],
        },
        {
          name: "Check whether a value occurs exactly once",
          explanation:
            "Compares its first and last found positions while requiring that it is present. Use it for exact single-occurrence checks.",
          note: "Without the presence guard, an absent value incorrectly appears unique because -1 equals -1. This helper uses indexOf equality and therefore does not count NaN.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf",
          examples: [
            {
              label: "Distinguish one occurrence from duplicates",
              language: "javascript",
              code: "function occursExactlyOnce(array, value) {\n  const first = array.indexOf(value);\n  return first !== -1 && first === array.lastIndexOf(value);\n}\nconst array = [1, 2, 2, 3];\nconsole.log(occursExactlyOnce(array, 1), occursExactlyOnce(array, 2));",
            },
            {
              label: "Reject absence rather than calling it unique",
              language: "javascript",
              code: "function occursExactlyOnce(array, value) {\n  const first = array.indexOf(value);\n  return first !== -1 && first === array.lastIndexOf(value);\n}\nconsole.log(occursExactlyOnce([1, 2], 9), occursExactlyOnce([], 9));",
            },
          ],
        },
        {
          name: "Detect duplicates with some() and indexOf()",
          explanation:
            "Checks whether any visited item is not at its first indexOf position. Use it for small inputs where strict-equality duplicate semantics are appropriate.",
          note: "The image’s pattern reports even a single NaN as a duplicate because indexOf(NaN) is -1. Document that limitation rather than treating it as a general-purpose duplicate detector.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some",
          examples: [
            {
              label: "Detect ordinary duplicate values",
              language: "javascript",
              code: "const hasDuplicates = array => array.some((item, index) => array.indexOf(item) !== index);\nconsole.log(hasDuplicates([1, 2, 2]), hasDuplicates([1, 2, 3]));",
            },
            {
              label: "Expose the NaN false positive",
              language: "javascript",
              code: "const array = [NaN];\nconsole.log(array.some((item, index) => array.indexOf(item) !== index)); // true despite one item",
            },
          ],
        },
        {
          name: "Choose membership or position results",
          explanation:
            "Uses includes for a boolean decision and indexOf for a known position to update. Use the method whose result matches the next operation.",
          note: "Neither scans object properties; use a predicate method for structural conditions. Both may inspect a linear number of array elements in a full search.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes",
          examples: [
            {
              label: "Use membership directly in a branch",
              language: "javascript",
              code: 'const array = [1, 2, 3], value = 2;\nif (array.includes(value)) console.log("Present");',
            },
            {
              label: "Use a position for a guarded update",
              language: "javascript",
              code: "const array = [1, 2, 3], value = 2, newValue = 20;\nconst position = array.indexOf(value);\nif (position !== -1) array[position] = newValue;\nconsole.log(...array);",
            },
          ],
        },
        {
          name: "Set membership for repeated lookups",
          explanation:
            "Builds a Set once and checks membership with has. Use it when repeated membership checks justify the construction and memory cost.",
          note: "Set uses SameValueZero equality and removes duplicate membership. The standard requires average sublinear access, not a universal guaranteed O(1); implementation and workload determine performance. A Set snapshot does not track later array changes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set",
          examples: [
            {
              label: "Reuse a membership set",
              language: "javascript",
              code: "const array = [1, 2, 2, 3, NaN], set = new Set(array);\nconsole.log(set.has(2), set.has(9), set.has(NaN), set.size);",
            },
            {
              label: "Keep the source and Set lifetimes explicit",
              language: "javascript",
              code: "const array = [1, 2], set = new Set(array);\narray.push(3);\nconsole.log(array.includes(3), set.has(3));\nset.add(3); console.log(set.has(3));",
            },
          ],
        },
      ],
    },
    {
      name: "Array Manipulation",
      id: "array-manipulation",
      intro:
        "Adding and removing elements → slice and concat → sort and reverse, following all nine images. Run each example independently in a modern browser or Node.js with ES2023 array methods. Helpers validate their index and size contracts; copying is shallow, and mutation and return values are explicit.",
      methods: [
        {
          name: "push() — append elements",
          explanation:
            "Adds one or more elements to the end and returns the new length. Use it to grow an existing array.",
          note: "Mutates the array; passing an array appends that array as one element. Spread arguments only for reasonably sized inputs.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push",
          examples: [
            {
              label: "Append one and several values",
              language: "javascript",
              code: "const a = [1, 2, 3];\nconsole.log(a.push(4), a.push(5, 6, 7));\nconsole.log(...a);",
            },
            {
              label: "Append an array versus its elements",
              language: "javascript",
              code: "const a = [1]; const values = [8, 9];\na.push(values);\nconsole.log(a.length, a[1] === values);\na.push(...values);\nconsole.log(a.length, a[2], a[3]);",
            },
          ],
        },
        {
          name: "pop() — remove the last element",
          explanation:
            "Removes and returns the last element. Use it with push for a last-in, first-out stack.",
          note: "Mutates the array; an empty array returns undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop",
          examples: [
            {
              label: "Remove the tail",
              language: "javascript",
              code: "const a = [1, 2, 3];\nconsole.log(a.pop(), ...a);",
            },
            {
              label: "Empty and sparse tails",
              language: "javascript",
              code: "const empty = []; const sparse = [1, ,];\nconsole.log(empty.pop(), empty.length);\nconsole.log(sparse.pop(), sparse.length);",
            },
          ],
        },
        {
          name: "shift() — remove the first element",
          explanation:
            "Removes and returns the first element, shifting later positions toward zero. Use it for a small FIFO queue.",
          note: "Mutates the array; empty arrays return undefined. Front operations can require moving many indexed properties.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift",
          examples: [
            {
              label: "Take the head",
              language: "javascript",
              code: "const a = [1, 2, 3];\nconsole.log(a.shift(), ...a);",
            },
            {
              label: "Drain a queue",
              language: "javascript",
              code: 'const queue = ["first", "second"];\nconsole.log(queue.shift(), queue.shift(), queue.shift(), queue.length);',
            },
          ],
        },
        {
          name: "unshift() — prepend elements",
          explanation:
            "Adds elements at the beginning in argument order and returns the new length. Use it when changing the front of an existing array.",
          note: "One multi-argument call preserves argument order; repeated single calls reverse that order.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift",
          examples: [
            {
              label: "Prepend one and several values",
              language: "javascript",
              code: "const a = [1, 2, 3];\nconsole.log(a.unshift(0));\nconsole.log(a.unshift(-2, -1), ...a);",
            },
            {
              label: "Compare call order",
              language: "javascript",
              code: "const together = [3]; together.unshift(1, 2);\nconst separate = [3]; separate.unshift(1); separate.unshift(2);\nconsole.log(...together); console.log(...separate);",
            },
          ],
        },
        {
          name: "splice() — remove, insert, or replace",
          explanation:
            "Changes an array at a starting index and returns an array of deleted elements. Set deleteCount to zero for insertion.",
          note: "The returned array contains removed values, not the edited array.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice",
          examples: [
            {
              label: "Remove then insert",
              language: "javascript",
              code: 'const a = [1, 2, 3, 4, 5];\nconsole.log(...a.splice(1, 2));\na.splice(1, 0, "a", "b");\nconsole.log(...a);',
            },
            {
              label: "Replace with a different number of values",
              language: "javascript",
              code: 'const a = [1, "a", "b", 4, 5];\nconsole.log(...a.splice(1, 2, "x", "y", "z"));\nconsole.log(...a);',
            },
          ],
        },
        {
          name: "splice() bounds and clearing",
          explanation:
            "Negative starts count back from the end; omitting deleteCount removes the remainder. Use splice(0) to empty an array while keeping its identity.",
          note: "Omitted deleteCount differs from explicit undefined, which converts to zero. splice is destructive; slice copies.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice",
          examples: [
            {
              label: "Negative start and the remaining tail",
              language: "javascript",
              code: "const a = [1, 2, 3, 4, 5];\nconsole.log(...a.splice(-2, 1));\nconsole.log(...a.splice(2));\nconsole.log(...a);",
            },
            {
              label: "Clear aliases and distinguish undefined",
              language: "javascript",
              code: "const a = [1, 2]; const alias = a;\nconsole.log(a.splice(1, undefined).length, a.length);\nconst removed = a.splice(0);\nconsole.log(...removed); console.log(alias === a, alias.length);",
            },
          ],
        },
        {
          name: "Stacks and queues",
          explanation:
            "Use push/pop for a stack and push/shift for a small queue. An index-based queue avoids repeatedly shifting the remaining items.",
          note: "Complexity depends on the engine and array shape; do not treat screenshot timing claims as guarantees. Compact or clear long-lived queue storage to release consumed values.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push",
          examples: [
            {
              label: "Last in, first out",
              language: "javascript",
              code: 'const stack = []; stack.push("A", "B");\nconsole.log(stack.pop(), stack.pop());',
            },
            {
              label: "A queue with a head pointer",
              language: "javascript",
              code: 'const queue = []; let head = 0;\nqueue.push("A", "B");\nconst take = () => head < queue.length ? queue[head++] : undefined;\nconsole.log(take(), take(), take());\nqueue.splice(0, head); head = 0;\nconsole.log(queue.length, head);',
            },
          ],
        },
        {
          name: "Copying alternatives to end and front edits",
          explanation:
            "Build a new array with spread to append or prepend, and slice to remove an end. Use these patterns when callers must retain the original array.",
          note: "These are shallow copies: nested objects remain shared.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice",
          examples: [
            {
              label: "Append and prepend without mutation",
              language: "javascript",
              code: "const a = [1, 2];\nconsole.log(...[...a, 3]); console.log(...[0, ...a]);\nconsole.log(...a);",
            },
            {
              label: "Drop either end",
              language: "javascript",
              code: "const a = [1, 2, 3];\nconsole.log(...a.slice(0, -1)); console.log(...a.slice(1));\nconsole.log(a.length, [].slice(1).length);",
            },
          ],
        },
        {
          name: "slice() — extract a range",
          explanation:
            "Returns a new array from start up to the exclusive end. Omit end to copy through the tail.",
          note: "Does not change the original; indices are clamped to the array bounds.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice",
          examples: [
            {
              label: "Extract a middle and a tail",
              language: "javascript",
              code: "const a = [1, 2, 3, 4, 5];\nconsole.log(...a.slice(1, 4)); console.log(...a.slice(2));\nconsole.log(...a);",
            },
            {
              label: "Empty and out-of-range intervals",
              language: "javascript",
              code: "const a = [1, 2, 3];\nconsole.log(a.slice(10).length, a.slice(2, 2).length, a.slice(2, 1).length);",
            },
          ],
        },
        {
          name: "slice() with negative indices",
          explanation:
            "A negative index is relative to the array length. Use it for the last few items or to exclude the final item.",
          note: "The end remains exclusive even when it is negative.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice",
          examples: [
            {
              label: "Take the end and exclude the end",
              language: "javascript",
              code: "const a = [1, 2, 3, 4, 5];\nconsole.log(...a.slice(-2)); console.log(...a.slice(0, -1));",
            },
            {
              label: "Middle range and clamping",
              language: "javascript",
              code: "const a = [1, 2, 3, 4, 5];\nconsole.log(...a.slice(1, -1)); console.log(...a.slice(-99, 2));",
            },
          ],
        },
        {
          name: "Shallow copies with slice() and concat()",
          explanation:
            "Calling slice() or concat() with no arguments copies the top-level array. Use this to change array membership independently while retaining shared object references.",
          note: "Neither operation deep-clones nested data; both preserve sparse holes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice",
          examples: [
            {
              label: "Separate arrays, shared records",
              language: "javascript",
              code: "const a = [{ count: 1 }]; const b = a.slice(); const c = a.concat();\nb[0].count = 2; b.push({ count: 3 });\nconsole.log(a !== b, c !== a, a[0].count, a.length, b.length);",
            },
            {
              label: "Preserve a missing position",
              language: "javascript",
              code: "const a = [1, , 3]; const b = a.slice(0); const c = a.concat();\nconsole.log(b.length, 1 in b, 1 in c);",
            },
          ],
        },
        {
          name: "concat() — combine arrays and values",
          explanation:
            "Returns a new array combining the receiver with supplied arrays or values. Use it to merge lists without changing their membership.",
          note: "Ordinary arrays spread one level; deeper nested arrays remain nested.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat",
          examples: [
            {
              label: "Combine several arrays and scalars",
              language: "javascript",
              code: "const a = [1, 2], b = [3, 4], c = [5, 6];\nconsole.log(...a.concat(b, c)); console.log(...a.concat(3, 4, [5, 6]));\nconsole.log(a.length, b.length);",
            },
            {
              label: "Keep deeper nesting",
              language: "javascript",
              code: "const nested = [1].concat([2, [3, 4]]);\nconsole.log(nested.length, nested[0], nested[1], Array.isArray(nested[2]));\nconsole.log(...nested[2]);",
            },
          ],
        },
        {
          name: "Combine arrays with spread",
          explanation:
            "Array spread inserts iterable values into a new array. Conditionally spread an empty array to omit an optional group.",
          note: "Spread uses iteration, so array holes become explicit undefined values; concat preserves holes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat",
          examples: [
            {
              label: "Merge with extra values",
              language: "javascript",
              code: "const a = [1, 2], b = [5, 6];\nconsole.log(...[...a, 3, 4, ...b]);\nconsole.log(...[...a, ...(false ? b : []), 7]);",
            },
            {
              label: "Conditional inclusion and sparse copying",
              language: "javascript",
              code: "const a = [1], b = [2, 3];\nconsole.log(...[...a, ...(true ? b : [])]);\nconst copy = [...new Array(1)];\nconsole.log(copy.length, 0 in copy, copy[0]);",
            },
          ],
        },
        {
          name: "removeAt() — copy without one position",
          explanation:
            "Combine two slices to remove one valid index from a copy. Validate indices to prevent accidental duplication with negative or out-of-range inputs.",
          note: "This helper accepts only an existing nonnegative integer index.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice",
          examples: [
            {
              label: "Remove the middle",
              language: "javascript",
              code: 'function removeAt(a, index) { if (!Number.isInteger(index) || index < 0 || index >= a.length) throw new RangeError("Invalid index"); return [...a.slice(0, index), ...a.slice(index + 1)]; }\nconst a = [1, 2, 3];\nconsole.log(...removeAt(a, 1)); console.log(...a);',
            },
            {
              label: "Reject an invalid position",
              language: "javascript",
              code: 'function removeAt(a, index) { if (!Number.isInteger(index) || index < 0 || index >= a.length) throw new RangeError("Invalid index"); return [...a.slice(0, index), ...a.slice(index + 1)]; }\ntry { removeAt([1, 2], -1); } catch (error) { console.log(error.name); }',
            },
          ],
        },
        {
          name: "insertAt() — insert into a copy",
          explanation:
            "Join the prefix, new item, and suffix to insert without changing the input. This helper allows positions from zero through length.",
          note: "An index equal to length appends; invalid positions throw.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice",
          examples: [
            {
              label: "Insert in the middle",
              language: "javascript",
              code: 'function insertAt(a, index, item) { if (!Number.isInteger(index) || index < 0 || index > a.length) throw new RangeError("Invalid index"); return [...a.slice(0, index), item, ...a.slice(index)]; }\nconst a = [1, 3]; console.log(...insertAt(a, 1, 2)); console.log(...a);',
            },
            {
              label: "Append to an empty array and reject invalid input",
              language: "javascript",
              code: 'function insertAt(a, index, item) { if (!Number.isInteger(index) || index < 0 || index > a.length) throw new RangeError("Invalid index"); return [...a.slice(0, index), item, ...a.slice(index)]; }\nconsole.log(...insertAt([], 0, "first"));\ntry { insertAt([1], 2, 9); } catch (error) { console.log(error.name); }',
            },
          ],
        },
        {
          name: "replaceAt() — replace in a copy",
          explanation:
            "Combine slices around an existing index with a replacement value. Use it for a shallow immutable array update.",
          note: "This helper replaces one existing index and preserves length.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice",
          examples: [
            {
              label: "Replace a value",
              language: "javascript",
              code: 'function replaceAt(a, index, item) { if (!Number.isInteger(index) || index < 0 || index >= a.length) throw new RangeError("Invalid index"); return [...a.slice(0, index), item, ...a.slice(index + 1)]; }\nconst a = [1, 2, 3]; console.log(...replaceAt(a, 1, 9)); console.log(...a);',
            },
            {
              label: "Replace the last item and reject a missing position",
              language: "javascript",
              code: 'function replaceAt(a, index, item) { if (!Number.isInteger(index) || index < 0 || index >= a.length) throw new RangeError("Invalid index"); return [...a.slice(0, index), item, ...a.slice(index + 1)]; }\nconsole.log(...replaceAt([1, 2], 1, 7));\ntry { replaceAt([], 0, 9); } catch (error) { console.log(error.name); }',
            },
          ],
        },
        {
          name: "move() — reorder a copy",
          explanation:
            "Remove one item from a copy and insert it at the destination. The destination is the item’s index in the final array.",
          note: "Both indices must identify existing positions; moving to the same index returns a separate copy.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice",
          examples: [
            {
              label: "Move forward",
              language: "javascript",
              code: 'function move(a, from, to) { if (![from, to].every(i => Number.isInteger(i) && i >= 0 && i < a.length)) throw new RangeError("Invalid index"); const copy = a.slice(); const [item] = copy.splice(from, 1); copy.splice(to, 0, item); return copy; }\nconst a = ["A", "B", "C", "D"]; console.log(...move(a, 0, 2)); console.log(...a);',
            },
            {
              label: "Move backward or keep the position",
              language: "javascript",
              code: 'function move(a, from, to) { if (![from, to].every(i => Number.isInteger(i) && i >= 0 && i < a.length)) throw new RangeError("Invalid index"); const copy = a.slice(); const [item] = copy.splice(from, 1); copy.splice(to, 0, item); return copy; }\nconst a = [1, 2, 3]; console.log(...move(a, 2, 0)); console.log(move(a, 1, 1) !== a);',
            },
          ],
        },
        {
          name: "paginate() — extract a page",
          explanation:
            "Calculate a one-based page offset and slice at most pageSize elements. Use positive integer page and size arguments.",
          note: "A page beyond the input returns an empty array.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice",
          examples: [
            {
              label: "Full and partial pages",
              language: "javascript",
              code: 'function paginate(a, page, pageSize) { if (![page, pageSize].every(n => Number.isSafeInteger(n) && n > 0)) throw new RangeError("Use positive integers"); const start = (page - 1) * pageSize; return a.slice(start, start + pageSize); }\nconst a = [1, 2, 3, 4, 5]; console.log(...paginate(a, 2, 2)); console.log(...paginate(a, 3, 2));',
            },
            {
              label: "Beyond the end and invalid size",
              language: "javascript",
              code: 'function paginate(a, page, pageSize) { if (![page, pageSize].every(n => Number.isSafeInteger(n) && n > 0)) throw new RangeError("Use positive integers"); const start = (page - 1) * pageSize; return a.slice(start, start + pageSize); }\nconsole.log(paginate([1], 4, 2).length);\ntry { paginate([1], 1, 0); } catch (error) { console.log(error.name); }',
            },
          ],
        },
        {
          name: "chunk() — split into groups",
          explanation:
            "Take consecutive slices of a fixed maximum size. Use it for batches, retaining a shorter final group.",
          note: "Reject zero, negative, fractional, and nonfinite sizes to avoid invalid or nonterminating loops.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice",
          examples: [
            {
              label: "Split with a shorter final group",
              language: "javascript",
              code: 'function chunk(a, size) { if (!Number.isSafeInteger(size) || size <= 0) throw new RangeError("Use a positive integer size"); const chunks = []; for (let i = 0; i < a.length; i += size) chunks.push(a.slice(i, i + size)); return chunks; }\nconst groups = chunk([1, 2, 3, 4, 5], 2);\nconsole.log(JSON.stringify(groups));',
            },
            {
              label: "Empty input and invalid size",
              language: "javascript",
              code: 'function chunk(a, size) { if (!Number.isSafeInteger(size) || size <= 0) throw new RangeError("Use a positive integer size"); const chunks = []; for (let i = 0; i < a.length; i += size) chunks.push(a.slice(i, i + size)); return chunks; }\nconsole.log(chunk([], 3).length);\ntry { chunk([1], 0); } catch (error) { console.log(error.name); }',
            },
          ],
        },
        {
          name: "sort() — default string ordering",
          explanation:
            "Sorts an array in place and returns the same array. Without a comparator, defined values are compared as UTF-16 strings.",
          note: "Default ordering is not numeric or language-aware alphabetic ordering.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",
          examples: [
            {
              label: "Sort words and observe identity",
              language: "javascript",
              code: 'const a = ["banana", "apple", "cherry"]; const result = a.sort();\nconsole.log(...a); console.log(result === a);',
            },
            {
              label: "See the default numeric trap",
              language: "javascript",
              code: "const a = [10, 5, 40, 25, 1000, 1]; a.sort();\nconsole.log(...a);",
            },
          ],
        },
        {
          name: "Numeric sort comparators",
          explanation:
            "Use a - b for ascending numbers and b - a for descending numbers. A comparator returns a negative, zero, or positive number to express relative order.",
          note: "Use a consistent comparator; engine algorithms and time/space complexity are not specified.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",
          examples: [
            {
              label: "Ascending numeric order",
              language: "javascript",
              code: "const a = [10, 5, 40, 25, 1000, 1]; a.sort((a, b) => a - b); console.log(...a);",
            },
            {
              label: "Descending numeric order",
              language: "javascript",
              code: "const a = [10, 5, 40, 25, 1000, 1]; a.sort((a, b) => b - a); console.log(...a);",
            },
          ],
        },
        {
          name: "Sort objects by one or several fields",
          explanation:
            "Compare a numeric property or use localeCompare for names. Chain criteria with a zero-result fallback for deterministic ties.",
          note: "localeCompare returns a sign, not necessarily exactly -1 or 1; locale rules can vary.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",
          examples: [
            {
              label: "Order by age then name",
              language: "javascript",
              code: 'const users = [{name:"John",age:30},{name:"Jane",age:25},{name:"Bob",age:30}];\nusers.sort((a,b) => a.age - b.age || a.name.localeCompare(b.name, "en"));\nconsole.log(...users.map(u => u.name));',
            },
            {
              label: "Order names independently",
              language: "javascript",
              code: 'const users = [{name:"John"},{name:"Jane"},{name:"Bob"}];\nusers.sort((a,b) => a.name.localeCompare(b.name, "en"));\nconsole.log(...users.map(u => u.name));',
            },
          ],
        },
        {
          name: "Case-insensitive and custom priority sorting",
          explanation:
            "Compare normalized strings for case-insensitive ordering or map known priority labels to ranks. Put unknown priorities after the known ones explicitly.",
          note: "A raw indexOf rank of -1 would incorrectly put unknown labels first.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",
          examples: [
            {
              label: "Ignore letter case",
              language: "javascript",
              code: 'const words = ["Cherry", "banana", "Apple"];\nwords.sort((a,b) => a.toLowerCase().localeCompare(b.toLowerCase(), "en"));\nconsole.log(...words);',
            },
            {
              label: "Place unknown priorities last",
              language: "javascript",
              code: 'const priority = ["high", "medium", "low"];\nconst rank = level => { const i = priority.indexOf(level); return i < 0 ? priority.length : i; };\nconst items = ["low", "unknown", "high", "medium"];\nitems.sort((a,b) => rank(a) - rank(b)); console.log(...items);',
            },
          ],
        },
        {
          name: "Stable sorting",
          explanation:
            "A stable sort preserves the input order of elements whose comparator result is zero. Use it when ties should retain earlier ordering.",
          note: "Stable Array sorting has been required since ES2019; comparisons must still be consistent.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",
          examples: [
            {
              label: "Keep equal-score records in order",
              language: "javascript",
              code: 'const a = [{id:"A",score:2},{id:"B",score:1},{id:"C",score:2}];\na.sort((a,b) => a.score - b.score); console.log(...a.map(x => x.id));',
            },
            {
              label: "All ties retain their order",
              language: "javascript",
              code: 'const a = ["first", "second", "third"]; a.sort(() => 0); console.log(...a);',
            },
          ],
        },
        {
          name: "reverse() — reverse in place",
          explanation:
            "Reverses indexed positions and returns the same array. Use it when changing the existing sequence is intended.",
          note: "Reversal does not sort values and preserves sparse holes at their mirrored positions.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse",
          examples: [
            {
              label: "Reverse and inspect identity",
              language: "javascript",
              code: "const a = [1, 2, 3, 4, 5]; console.log(a.reverse() === a, ...a);",
            },
            {
              label: "Reverse a sparse array",
              language: "javascript",
              code: "const a = [1, , 3, 4]; a.reverse(); console.log(a.length, 2 in a, a[0], a[3]);",
            },
          ],
        },
        {
          name: "Reverse string sequences",
          explanation:
            "Split or spread a string into an array, reverse it, then join it again. Use the ASCII split pattern only when UTF-16 code units are the intended units.",
          note: "Spread preserves Unicode code points but can still split multi-code-point grapheme clusters.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse",
          examples: [
            {
              label: "Reverse ASCII text",
              language: "javascript",
              code: 'const text = "hello"; console.log(text.split("").reverse().join(""));',
            },
            {
              label: "Preserve a supplementary code point",
              language: "javascript",
              code: 'const text = "A😀B"; console.log([...text].reverse().join(""));',
            },
          ],
        },
        {
          name: "Sort and reverse copies",
          explanation:
            "Copy with spread or slice before calling the mutating methods. Use this when other callers must keep the original order.",
          note: "Copies remain shallow; spreading a sparse array fills its holes with undefined, while slice preserves them.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",
          examples: [
            {
              label: "Sort two copies",
              language: "javascript",
              code: "const a = [3, 1, 2];\nconsole.log(...[...a].sort((a,b) => a-b)); console.log(...a.slice().sort((a,b) => a-b)); console.log(...a);",
            },
            {
              label: "Reverse copies",
              language: "javascript",
              code: "const a = [3, 1, 2];\nconsole.log(...[...a].reverse()); console.log(...a.slice().reverse()); console.log(...a);",
            },
          ],
        },
        {
          name: "toSorted() and toReversed()",
          explanation:
            "These ES2023 methods return reordered copies directly. Use them to retain the input order without an explicit preliminary copy.",
          note: "They create dense arrays: missing positions are read as undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted",
          examples: [
            {
              label: "Sort and reverse without changing the input",
              language: "javascript",
              code: "const a = [3, 1, 2]; console.log(...a.toSorted((a,b) => a-b)); console.log(...a.toReversed()); console.log(...a);",
            },
            {
              label: "Observe sparse-copy semantics",
              language: "javascript",
              code: "const a = [3, , 1]; const sorted = a.toSorted((a,b) => a-b); const reversed = a.toReversed();\nconsole.log(...sorted); console.log(2 in sorted, 1 in reversed, 1 in a);",
            },
          ],
        },
        {
          name: "Reverse with reduce()",
          explanation:
            "Prepend each visited value to an accumulator to produce reversed values. This illustrates accumulation but is unsuitable for large arrays because each step copies the growing result.",
          note: "Unlike reverse, reduce skips sparse holes; prefer toReversed or a copied reverse for general reversal.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
          examples: [
            {
              label: "Prepend into a new result",
              language: "javascript",
              code: "const a = [1, 2, 3]; const reversed = a.reduce((acc,value) => [value, ...acc], []);\nconsole.log(...reversed); console.log(...a);",
            },
            {
              label: "Empty and sparse inputs",
              language: "javascript",
              code: "console.log([].reduce((acc,value) => [value, ...acc], []).length);\nconsole.log(...[1, , 3].reduce((acc,value) => [value, ...acc], []));",
            },
          ],
        },
        {
          name: "shuffle() — Fisher–Yates",
          explanation:
            "Swap each position with a uniformly chosen position from zero through itself. Use this algorithm instead of a random sort comparator.",
          note: "The default Math.random is not cryptographically secure; the injected random function must return values in [0, 1). Tests use deterministic draws.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",
          examples: [
            {
              label: "Deterministic draws demonstrate swaps",
              language: "javascript",
              code: "function shuffle(a, random = Math.random) { const copy = [...a]; for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; }\nconst a = [1, 2, 3, 4]; console.log(...shuffle(a, () => 0)); console.log(...a);",
            },
            {
              label: "Retain every value and handle empty input",
              language: "javascript",
              code: 'function shuffle(a, random = Math.random) { const copy = [...a]; for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; }\nconst a = [1, 2, 3]; const result = shuffle(a);\nconsole.log(result !== a, result.length, result.slice().sort().join(",") === a.join(","));\nconsole.log(shuffle([]).length);',
            },
          ],
        },
        {
          name: "Natural ordering of numbered strings",
          explanation:
            "Use localeCompare with numeric: true to compare digit runs by numeric value. Use it for numbered filenames or labels.",
          note: "Specify a locale for reproducibility; locale-sensitive ordering depends on runtime locale data.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",
          examples: [
            {
              label: "Order numbered filenames",
              language: "javascript",
              code: 'const files = ["img10.png", "img2.png", "img1.png"];\nfiles.sort((a,b) => a.localeCompare(b, "en", {numeric:true})); console.log(...files);',
            },
            {
              label: "Contrast lexical and numeric ordering",
              language: "javascript",
              code: 'const a = ["item10", "item2"];\nconsole.log(...a.toSorted());\nconsole.log(...a.toSorted((a,b) => a.localeCompare(b, "en", {numeric:true})));',
            },
          ],
        },
        {
          name: "Sort with null and undefined values",
          explanation:
            "Handle null explicitly in a numeric comparator and return zero when both operands are null. Array sort automatically places undefined after defined values without passing it to the comparator.",
          note: "Sparse holes follow undefined; the comparator must not return a positive value for both-null comparisons. Define a separate policy if NaN is possible.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",
          examples: [
            {
              label: "Place null after numbers",
              language: "javascript",
              code: "const a = [null, 3, null, 1, undefined, 2];\na.sort((a,b) => a === null ? (b === null ? 0 : 1) : b === null ? -1 : a-b);\nconsole.log(...a);",
            },
            {
              label: "Observe undefined and hole handling",
              language: "javascript",
              code: "let sawUndefined = false; const a = [undefined, 2, , 1];\na.sort((a,b) => { sawUndefined ||= a === undefined || b === undefined; return a-b; });\nconsole.log(a[0], a[1], a[2], 2 in a, 3 in a, sawUndefined);",
            },
          ],
        },
      ],
    },
    {
      name: "Iteration Methods",
      id: "iteration-methods",
      intro:
        "forEach and side effects → join and string conversion → flat and flatMap, following all nine images. Run snippets independently; the DOM entries include complete HTML files, and async examples wait for their work. String examples distinguish code units from code points, and fallbacks state their limited array-only contracts.",
      methods: [
        {
          name: "forEach() — execute side effects",
          explanation:
            "Calls a function for each present indexed element and returns undefined. Use it for logging or updating existing state rather than building a transformed array.",
          note: "Callback return values are discarded; the method cannot be chained as an array result.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach",
          examples: [
            {
              label: "Log each value",
              language: "javascript",
              code: "const numbers = [1, 2, 3];\nconst result = numbers.forEach(value => console.log(value));\nconsole.log(result);",
            },
            {
              label: "Use value, index, and the source array",
              language: "javascript",
              code: "const numbers = [10, 20];\nnumbers.forEach((value, index, array) => console.log(index, value, array.length, array === numbers));",
            },
          ],
        },
        {
          name: "forEach() and mutation",
          explanation:
            "Reassigning a primitive callback parameter does not update its array position. Modify an object property or explicitly assign through the source array when mutation is intended.",
          note: "The initial length is captured; new values appended beyond that length are not visited, and deleted positions are skipped.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach",
          examples: [
            {
              label: "Local assignment versus indexed assignment",
              language: "javascript",
              code: "const a = [1, 2, 3]; a.forEach(value => { value *= 2; });\nconsole.log(...a);\na.forEach((value, index, array) => { array[index] = value * 2; }); console.log(...a);",
            },
            {
              label: "Update objects and inspect visit bounds",
              language: "javascript",
              code: "const users = [{age:30}, {age:25}]; users.forEach(user => user.age++);\nconsole.log(...users.map(user => user.age));\nconst a = [1, 2, 3]; const seen = [];\na.forEach((value,index) => { seen.push(value); if (index === 0) { a.push(4); delete a[1]; } });\nconsole.log(...seen); console.log(a.length);",
            },
          ],
        },
        {
          name: "forEach() with thisArg",
          explanation:
            "Pass a context object as the second argument to bind this inside a normal callback function. Use this when a callback updates state held on another object.",
          note: "Arrow functions retain lexical this and ignore thisArg.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach",
          examples: [
            {
              label: "Accumulate into a supplied context",
              language: "javascript",
              code: "const counter = {count:0};\n[1, 2, 3].forEach(function(value) { this.count += value; }, counter);\nconsole.log(counter.count);",
            },
            {
              label: "Call a method that passes its own context",
              language: "javascript",
              code: "const counter = {count:0, increment(values) { values.forEach(function(value) { this.count += value; }, this); }};\ncounter.increment([2, 4]); counter.increment([1]); console.log(counter.count);",
            },
          ],
        },
        {
          name: "forEach() for DOM updates",
          explanation:
            "NodeList also provides forEach for updating matched elements. Use it to apply classes or text to each selected node.",
          note: "These complete HTML examples run in a browser; NodeList.forEach is a separate API from Array.prototype.forEach.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach",
          examples: [
            {
              label: "Activate matching elements",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html><ul><li class="item">A</li><li class="item">B</li></ul><script>document.querySelectorAll(".item").forEach(el => el.classList.add("active")); console.log(document.querySelectorAll(".item.active").length);</script>',
                },
              ],
            },
            {
              label: "Update each element with its index",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html><p class="item"></p><p class="item"></p><script>document.querySelectorAll(".item").forEach((el,index) => { el.textContent = `Item ${index + 1}`; }); console.log(...Array.from(document.querySelectorAll(".item"), el => el.textContent));</script>',
                },
              ],
            },
          ],
        },
        {
          name: "forEach() does not await async callbacks",
          explanation:
            "Async callbacks return promises that forEach discards. Use a sequential loop or Promise.all with map when completion and rejection handling matter.",
          note: "The demonstration explicitly collects the promises so no work or rejection is left unobserved.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach",
          examples: [
            {
              label: "Observe completion after forEach returns",
              language: "javascript",
              code: "(async () => {\n  const done = []; const pending = [];\n  const result = [1, 2].forEach(value => { pending.push((async () => { await Promise.resolve(); done.push(value); })()); });\n  console.log(result, done.length);\n  await Promise.all(pending); console.log(...done);\n})().catch(error => { throw error; });",
            },
            {
              label: "Fetch sequentially or collect parallel results",
              language: "javascript",
              code: '(async () => {\n  const urls = ["data:application/json,1", "data:application/json,2"];\n  const sequential = [];\n  for (const url of urls) { const response = await fetch(url); sequential.push(await response.json()); }\n  const parallel = await Promise.all(urls.map(async url => { const response = await fetch(url); return response.json(); }));\n  console.log(...sequential); console.log(...parallel);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "forEach() versus map()",
          explanation:
            "Use forEach for effects such as writing records and map for a new array of transformed values. Define the side-effect function explicitly so the example can run independently.",
          note: "Avoid map when its returned array is unused.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach",
          examples: [
            {
              label: "Write to a local record store",
              language: "javascript",
              code: 'const records = new Map();\nconst updateDatabase = item => records.set(item.id, item.name);\n[{id:1,name:"John"},{id:2,name:"Jane"}].forEach(updateDatabase);\nconsole.log(records.size, records.get(2));',
            },
            {
              label: "Choose a transformation result",
              language: "javascript",
              code: "const a = [1, 2, 3]; const doubled = a.map(value => value * 2);\nconsole.log(...doubled); console.log(...a);",
            },
          ],
        },
        {
          name: "Early exits and callback return",
          explanation:
            "Returning from a forEach callback skips only the rest of that call; it does not stop iteration. Use for...of for break/continue or some for a boolean early-exit condition.",
          note: "A break or continue targeting the outer iteration is a syntax error inside a callback.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach",
          examples: [
            {
              label: "Return skips one callback; a loop can break",
              language: "javascript",
              code: "[1, 2, 3].forEach(value => { if (value === 2) return; console.log(value); });\nfor (const value of [1, 2, 3]) { if (value === 2) break; console.log(value); }",
            },
            {
              label: "Stop with some and skip with continue",
              language: "javascript",
              code: "const found = [1, 2, 3, 4].some(value => { if (value === 3) return true; console.log(value); return false; });\nconsole.log(found);\nfor (const value of [1, 2, 3]) { if (value === 2) continue; console.log(value); }",
            },
          ],
        },
        {
          name: "Exceptions and iteration choices",
          explanation:
            "An exception aborts forEach and propagates to its caller. Use ordinary loop control for expected early exits and reserve exceptions for exceptional conditions.",
          note: "If illustrating a sentinel exception, compare its identity so unrelated errors are rethrown. No loop form is universally the fastest; measure representative workloads.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach",
          examples: [
            {
              label: "Catch only the deliberate sentinel",
              language: "javascript",
              code: 'const stop = new Error("Stop");\ntry { [1, 2, 3, 4].forEach(value => { if (value === 3) throw stop; console.log(value); }); }\ncatch (error) { if (error !== stop) throw error; console.log("stopped"); }',
            },
            {
              label: "Compare indexed and iterable loops on sparse input",
              language: "javascript",
              code: "const a = [1, , 3]; let calls = 0;\na.forEach(() => calls++); console.log(calls);\nfor (let i = 0; i < a.length; i++) console.log(i, a[i]);\nfor (const value of a) console.log(value);",
            },
          ],
        },
        {
          name: "join() — combine values into a string",
          explanation:
            "Converts array elements to strings and inserts a separator between positions. Use the default comma, a custom separator, or an empty separator for compact output.",
          note: "Does not change the array; an empty array joins to an empty string.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join",
          examples: [
            {
              label: "Default and custom separators",
              language: "javascript",
              code: 'const a = ["Hello", "World"];\nconsole.log(a.join(), a.join(" "), a.join(" - "), a.join(""));',
            },
            {
              label: "Numbers and an empty array",
              language: "javascript",
              code: 'console.log([1, 2, 3].join("+")); console.log([].join("-"));',
            },
          ],
        },
        {
          name: "join() with missing and nested values",
          explanation:
            "Null, undefined, and holes contribute empty fields, while other values undergo string conversion. Nested arrays stringify with their own comma separators.",
          note: "join is display formatting rather than a reversible serialization format.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join",
          examples: [
            {
              label: "Mixed types and empty fields",
              language: "javascript",
              code: 'console.log([1, "two", true, null, undefined].join("|"));\nconsole.log([1, , 3].join("|"));',
            },
            {
              label: "Nested arrays and simple toString conversion",
              language: "javascript",
              code: 'console.log([1, [2, 3], 4].join("-"));\nconsole.log([1, 2, 3].toString());',
            },
          ],
        },
        {
          name: "Build HTML text with join()",
          explanation:
            "Join separately formatted list items to produce an HTML string. Escape interpolated text so markup characters remain text.",
          note: "These examples log strings; when manipulating a live page, creating nodes and setting textContent also avoids interpreting user text as markup.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join",
          examples: [
            {
              label: "Build a fixed list",
              language: "javascript",
              code: 'const items = ["Apple", "Banana", "Orange"];\nconst html = `<ul>${items.map(item => `<li>${item}</li>`).join("")}</ul>`; console.log(html);',
            },
            {
              label: "Escape dynamic item text",
              language: "javascript",
              code: 'const escapeHTML = value => String(value).replace(/[&<>"\']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",\'"\':"&quot;","\'":"&#39;"})[char]);\nconst items = ["<Apple>", "A&B"];\nconsole.log(items.map(item => `<li>${escapeHTML(item)}</li>`).join(""));',
            },
          ],
        },
        {
          name: "Create CSV with join()",
          explanation:
            "Join escaped cells into rows, then join rows with line endings. Quote cells containing commas, quotes, or newlines and double embedded quotes.",
          note: "A plain split on comma cannot parse general quoted CSV. Escaping CSV structure is distinct from spreadsheet formula policies.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join",
          examples: [
            {
              label: "Format simple tabular rows",
              language: "javascript",
              code: 'const rows = [["Name", "Age", "City"], ["John", 30, "NYC"], ["Jane", 25, "LA"]];\nconsole.log(rows.map(row => row.join(",")).join("\\n"));',
            },
            {
              label: "Escape commas, quotes, and line breaks",
              language: "javascript",
              code: 'const csvCell = value => {\n  const text = String(value ?? "");\n  return /[",\\r\\n]/.test(text) ? \'"\' + text.replace(/"/g, \'""\') + \'"\' : text;\n};\nconst rows = [["Name", "Note"], ["Jane, Jr.", \'Said "Hi"\'], ["John", "two\\nlines"]];\nconsole.log(rows.map(row => row.map(csvCell).join(",")).join("\\r\\n"));',
            },
          ],
        },
        {
          name: "split() — string to array",
          explanation:
            "Splits a string at a string separator or regular-expression matches. Use a limit to cap the number of output fields.",
          note: 'String.prototype.split is a string method. A limit discards remaining fields; split("") divides UTF-16 code units.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Separate fields, words, and ASCII units",
              language: "javascript",
              code: 'console.log(..."apple,banana,orange".split(","));\nconsole.log(..."hello world".split(" ")); console.log(..."hello".split(""));',
            },
            {
              label: "Limit output and split digit runs",
              language: "javascript",
              code: 'console.log(..."a-b-c-d".split("-", 2));\nconsole.log(..."hello123world456".split(/\\d+/));',
            },
          ],
        },
        {
          name: "Array.from() and string spread",
          explanation:
            'Array.from and spread consume a string’s iterator to produce Unicode code points. Use them instead of split("") when surrogate pairs must remain together.',
          note: 'Code points are not grapheme clusters: a displayed character may contain multiple code points. Modern browsers still split surrogate pairs with split("").',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from",
          examples: [
            {
              label: "Copy ASCII characters",
              language: "javascript",
              code: 'console.log(...Array.from("hello")); console.log(...[..."hello"]);',
            },
            {
              label: "Distinguish code units, points, and visible clusters",
              language: "javascript",
              code: 'const text = "😀😁"; console.log(text.split("").length, Array.from(text).length, [...text].length);\nconsole.log(...Array.from(text));\nconsole.log(Array.from("é").length);',
            },
          ],
        },
        {
          name: "Reverse and deduplicate string units",
          explanation:
            "Reverse an array of string units and join it, or use a Set to retain first occurrences. Choose code units or code points deliberately.",
          note: "These helpers do not preserve multi-code-point grapheme clusters as single units.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join",
          examples: [
            {
              label: "Reverse ASCII and code points",
              language: "javascript",
              code: 'const reverse = text => text.split("").reverse().join("");\nconst reversePoints = text => [...text].reverse().join("");\nconsole.log(reverse("hello"), reversePoints("A😀B"));',
            },
            {
              label: "Retain first occurrences in order",
              language: "javascript",
              code: 'const unique = text => [...new Set(text)].join("");\nconsole.log(unique("hello"), unique("😀😀😁"));',
            },
          ],
        },
        {
          name: "Count string code points with reduce()",
          explanation:
            "Accumulate a frequency for each code point. Use a dictionary without a prototype for a simple counter.",
          note: "This counts code points, not visual grapheme clusters, and includes whitespace.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
          examples: [
            {
              label: "Count repeated letters",
              language: "javascript",
              code: 'const count = text => Array.from(text).reduce((acc, char) => { acc[char] = (acc[char] ?? 0) + 1; return acc; }, Object.create(null));\nconst counts = count("hello"); console.log(counts.h, counts.e, counts.l, counts.o);',
            },
            {
              label: "Count emoji and handle an empty string",
              language: "javascript",
              code: 'const count = text => [...text].reduce((acc, char) => { acc[char] = (acc[char] ?? 0) + 1; return acc; }, Object.create(null));\nconsole.log(count("😀😀😁")["😀"], Object.keys(count("")).length);',
            },
          ],
        },
        {
          name: "Title case and whitespace cleanup",
          explanation:
            "Split into nonempty words, transform each word, and join with one space. Use this for simple display cleanup.",
          note: "This title-case helper uppercases each first code point; it is not a language-aware title-casing algorithm and leaves other letters unchanged.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join",
          examples: [
            {
              label: "Capitalize words while tolerating extra whitespace",
              language: "javascript",
              code: 'const titleCase = text => text.trim().split(/\\s+/).filter(Boolean).map(word => {\n  const [first, ...rest] = word;\n  return first.toUpperCase() + rest.join("");\n}).join(" ");\nconsole.log(titleCase("  hello   world  ")); console.log(titleCase(""));',
            },
            {
              label: "Collapse spaces, tabs, and line breaks",
              language: "javascript",
              code: 'const clean = text => text.split(/\\s+/).filter(Boolean).join(" ");\nconsole.log(clean("  hello \\t world\\n "), clean("   "));',
            },
          ],
        },
        {
          name: "Format integer digit groups",
          explanation:
            "Reverse digit units, insert separators every three positions, then reverse and join. Handle the sign separately so it cannot acquire an extra comma.",
          note: "This educational helper accepts safe integers only and uses fixed comma grouping.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join",
          examples: [
            {
              label: "Format a positive integer",
              language: "javascript",
              code: 'const format = number => { if (!Number.isSafeInteger(number)) throw new RangeError("Use a safe integer"); const sign = number < 0 ? "-" : ""; return sign + Math.abs(number).toString().split("").reverse().map((digit,i) => i > 0 && i % 3 === 0 ? digit + "," : digit).reverse().join(""); };\nconsole.log(format(1234567), format(0));',
            },
            {
              label: "Handle negative values and reject decimals",
              language: "javascript",
              code: 'const format = number => { if (!Number.isSafeInteger(number)) throw new RangeError("Use a safe integer"); const sign = number < 0 ? "-" : ""; return sign + Math.abs(number).toString().split("").reverse().map((digit,i) => i > 0 && i % 3 === 0 ? digit + "," : digit).reverse().join(""); };\nconsole.log(format(-123456));\ntry { format(12.5); } catch (error) { console.log(error.name); }',
            },
          ],
        },
        {
          name: "flat() — flatten nested arrays",
          explanation:
            "Returns a shallow copy with array nesting removed through the chosen depth. The default depth is one; Infinity traverses all finite nesting levels.",
          note: "Only arrays are flattened; nested object references remain shared. Avoid cyclic input with Infinity.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat",
          examples: [
            {
              label: "Flatten one level without changing the source",
              language: "javascript",
              code: "const a = [1, 2, [3, 4]]; console.log(...a.flat()); console.log(Array.isArray(a[2]), a.length);",
            },
            {
              label: "Choose a depth",
              language: "javascript",
              code: "const a = [1, [2, [3, [4]]]];\nconsole.log(JSON.stringify(a.flat()), JSON.stringify(a.flat(2)));\nconsole.log(...a.flat(3)); console.log(...a.flat(Infinity));",
            },
          ],
        },
        {
          name: "flat() holes and mixed nesting",
          explanation:
            "flat omits absent slots in every array level that it traverses. Arrays below the chosen depth remain intact, including their holes.",
          note: "Explicit undefined values are retained; a hole and undefined are different.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat",
          examples: [
            {
              label: "Remove holes but retain explicit undefined",
              language: "javascript",
              code: "console.log(...[1, , 3, , 5].flat());\nconst a = [1, , [2, , undefined]]; console.log(...a.flat());\nconsole.log(a.flat(0).length);",
            },
            {
              label: "Keep deeper arrays until their depth is reached",
              language: "javascript",
              code: "const a = [1, [2, 3], [[4]], [[[5]]]];\nconsole.log(JSON.stringify(a.flat())); console.log(JSON.stringify(a.flat(2)));",
            },
          ],
        },
        {
          name: "flatMap() — map and flatten one level",
          explanation:
            "Calls a mapping function then flattens returned arrays by one level. Use it to emit zero, one, or several output values per input.",
          note: "Sparse input holes are skipped; only actual arrays returned by the callback are flattened. Performance relative to map().flat() depends on the workload.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap",
          examples: [
            {
              label: "Expand each number",
              language: "javascript",
              code: "const a = [1, 2, 3]; console.log(...a.flatMap(value => [value, value * 2]));\nconsole.log(...a.map(value => [value, value * 2]).flat());",
            },
            {
              label: "One level only, and callback parameters",
              language: "javascript",
              code: "const a = [1, 2]; console.log(JSON.stringify(a.flatMap(value => [[value, value * 2]])));\nconsole.log(...a.flatMap((value,index,array) => [value + index + array.length]));",
            },
          ],
        },
        {
          name: "Filter and split with flatMap()",
          explanation:
            "Return an empty array to omit an item or an array of fields to expand it. Use this to combine selection and expansion in one expression.",
          note: "A returned string is inserted as one value; it is not spread into characters.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap",
          examples: [
            {
              label: "Keep only even values",
              language: "javascript",
              code: "console.log(...[1, 2, 3, 4, 5].flatMap(value => value % 2 === 0 ? [value] : []));\nconsole.log(...[1, , 3].flatMap(value => [value, , value * 2]));",
            },
            {
              label: "Split sentences into words",
              language: "javascript",
              code: 'const sentences = ["Hello world", "How are you"]; console.log(...sentences.flatMap(text => text.split(" ")));\nconsole.log(...[1, 2].flatMap(value => String(value)));',
            },
          ],
        },
        {
          name: "Expand task records with flatMap()",
          explanation:
            "Map each child collection into records carrying the parent identifier, then flatten the groups. Use it for one row per subtask.",
          note: "Parents with no children contribute no rows.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap",
          examples: [
            {
              label: "Carry the task identifier",
              language: "javascript",
              code: 'const tasks = [{id:1,subtasks:["a","b"]},{id:2,subtasks:["c"]}];\nconst rows = tasks.flatMap(task => task.subtasks.map(subtask => ({taskId:task.id, subtask})));\nconsole.log(JSON.stringify(rows));',
            },
            {
              label: "Skip an empty child collection",
              language: "javascript",
              code: 'const tasks = [{id:1,subtasks:[]},{id:2,subtasks:["x"]}];\nconsole.log(...tasks.flatMap(task => task.subtasks.map(subtask => `${task.id}:${subtask}`)));',
            },
          ],
        },
        {
          name: "Flatten data and object value groups",
          explanation:
            "Flatten nested values before selecting the values to keep, or flatten arrays collected with Object.values. Choose filtering rules that preserve valid zero and false values.",
          note: "filter(Boolean) removes every falsy value, not just null and undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat",
          examples: [
            {
              label: "Contrast falsy removal with nullish removal",
              language: "javascript",
              code: 'const data = [0, false, "", [1, null], [[2, undefined]], [[[3]]]];\nconsole.log(...data.flat(Infinity).filter(Boolean));\nconsole.log(...data.flat(Infinity).filter(value => value != null));',
            },
            {
              label: "Combine arrays from an object",
              language: "javascript",
              code: "const nested = {a:[1,2],b:[3,4],c:[5,6]};\nconsole.log(...Object.values(nested).flat());",
            },
          ],
        },
        {
          name: "Generate combinations with flatMap()",
          explanation:
            "For every value in one list, map all values from a second list. Flatten the groups to produce a Cartesian product.",
          note: "The result size is the product of the two input sizes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap",
          examples: [
            {
              label: "Combine colors and sizes",
              language: "javascript",
              code: 'const colors = ["red", "blue"], sizes = ["S", "M", "L"];\nconsole.log(...colors.flatMap(color => sizes.map(size => `${color}-${size}`)));',
            },
            {
              label: "An empty dimension produces no combinations",
              language: "javascript",
              code: 'const colors = ["red"]; const sizes = [];\nconsole.log(colors.flatMap(color => sizes.map(size => `${color}-${size}`)).length);',
            },
          ],
        },
        {
          name: "Array-only flat fallback",
          explanation:
            "Recursively copy present elements and traverse nested arrays only while depth remains. Use this standalone helper to illustrate flattening without changing built-in prototypes.",
          note: "This is not a full standards polyfill: it accepts only arrays and nonnegative integer depths or Infinity, uses recursion, and spread limits the size of intermediate arrays. Depth zero still omits root holes, matching native flat(0).",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat",
          examples: [
            {
              label: "Respect depth zero and explicit nesting",
              language: "javascript",
              code: 'function flatFallback(a, depth = 1) { if (!Array.isArray(a) || !(depth === Infinity || (Number.isInteger(depth) && depth >= 0))) throw new TypeError("Use an array and nonnegative integer depth"); const out = []; for (let i = 0, length = a.length; i < length; i++) { if (!(i in a)) continue; const value = a[i]; if (depth > 0 && Array.isArray(value)) out.push(...flatFallback(value, depth - 1)); else out.push(value); } return out; }\nconst a = [1, [2, [3]]]; console.log(JSON.stringify(flatFallback(a, 0)));\nconsole.log(JSON.stringify(flatFallback(a, 1))); console.log(...flatFallback(a, Infinity));',
            },
            {
              label: "Match sparse omission at traversed levels",
              language: "javascript",
              code: 'function flatFallback(a, depth = 1) { if (!Array.isArray(a) || !(depth === Infinity || (Number.isInteger(depth) && depth >= 0))) throw new TypeError("Use an array and nonnegative integer depth"); const out = []; for (let i = 0, length = a.length; i < length; i++) { if (!(i in a)) continue; const value = a[i]; if (depth > 0 && Array.isArray(value)) out.push(...flatFallback(value, depth - 1)); else out.push(value); } return out; }\nconst a = [1, , [2, , 3]];\nconsole.log(JSON.stringify(flatFallback(a)) === JSON.stringify(a.flat()));\nconsole.log(flatFallback([,], 0).length);',
            },
          ],
        },
        {
          name: "Array-only flatMap fallback",
          explanation:
            "Map each present input position and append present positions from returned arrays by one level. Use a standalone helper when explaining how mapping and flattening combine.",
          note: "This is an array-only teaching implementation, not a generic standards polyfill; it supports callback arguments and thisArg and skips output holes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap",
          examples: [
            {
              label: "Map values and flatten a single level",
              language: "javascript",
              code: 'function flatMapFallback(a, fn, thisArg) { if (!Array.isArray(a) || typeof fn !== "function") throw new TypeError("Use an array and callback"); const out = []; for (let i = 0, length = a.length; i < length; i++) { if (!(i in a)) continue; const mapped = fn.call(thisArg, a[i], i, a); if (Array.isArray(mapped)) { for (let j = 0; j < mapped.length; j++) if (j in mapped) out.push(mapped[j]); } else out.push(mapped); } return out; }\nconsole.log(...flatMapFallback([1, 2, 3], value => [value, value * 2]));\nconsole.log(JSON.stringify(flatMapFallback([1], value => [[value]])));',
            },
            {
              label: "Pass callback context and skip holes",
              language: "javascript",
              code: 'function flatMapFallback(a, fn, thisArg) { if (!Array.isArray(a) || typeof fn !== "function") throw new TypeError("Use an array and callback"); const out = []; for (let i = 0, length = a.length; i < length; i++) { if (!(i in a)) continue; const mapped = fn.call(thisArg, a[i], i, a); if (Array.isArray(mapped)) { for (let j = 0; j < mapped.length; j++) if (j in mapped) out.push(mapped[j]); } else out.push(mapped); } return out; }\nconst a = [1, , 3]; const context = {offset:10};\nconsole.log(...flatMapFallback(a, function(value,index,array) { return [value + this.offset, , index + array.length]; }, context));\ntry { flatMapFallback([], null); } catch (error) { console.log(error.name); }',
            },
          ],
        },
      ],
    },
    {
      name: "Array Creation & Conversion",
      id: "array-creation-conversion",
      intro:
        "Array.from and Array.of → initialization and conversion patterns → fill and copyWithin, following all six images. Run snippets independently; NodeList examples include complete HTML files. Examples distinguish dense arrays from holes, shared objects from fresh allocations, block shifts from rotations, and mutation from copying.",
      methods: [
        {
          name: "Array.from() — copy an iterable",
          explanation:
            "Creates an array from an iterable or array-like input. Use it to materialize strings, Sets, and Maps as arrays.",
          note: "String iteration produces code points, not grapheme clusters; Map iteration produces entry pairs.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from",
          examples: [
            {
              label: "Convert a string and a Set",
              language: "javascript",
              code: 'console.log(...Array.from("hello"));\nconsole.log(...Array.from(new Set([1, 2, 3, 2, 1])));',
            },
            {
              label: "Convert Map entries and Unicode code points",
              language: "javascript",
              code: 'const map = new Map([["a", 1], ["b", 2]]);\nconsole.log(JSON.stringify(Array.from(map)));\nconsole.log(...Array.from("😀😁"));',
            },
          ],
        },
        {
          name: "Array.from() for NodeList conversion",
          explanation:
            "Materializes a DOM selection as an array, optionally mapping each node during conversion. Use it when subsequent work needs array methods or extracted node data.",
          note: "These complete HTML files run in a browser. The result contains the selected node references; it does not clone DOM nodes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from",
          examples: [
            {
              label: "Convert a NodeList to an array",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html><div>A</div><div>B</div><script>const divs = Array.from(document.querySelectorAll("div")); console.log(Array.isArray(divs), divs.length, divs.map(el => el.textContent).join("|"));</script>',
                },
              ],
            },
            {
              label: "Map node text during conversion",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html><p class="item">One</p><p class="item">Two</p><script>const labels = Array.from(document.querySelectorAll(".item"), el => el.textContent); console.log(...labels);</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Convert arguments and array-like objects",
          explanation:
            "Array.from reads indexed properties through an array-like object’s length. Use it to convert arguments or a plain indexed collection.",
          note: "Absent indexed properties become explicit undefined elements; the resulting array is dense.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from",
          examples: [
            {
              label: "Convert arguments in a normal function",
              language: "javascript",
              code: "function example() { return Array.from(arguments); }\nconsole.log(...example(1, 2, 3));\nconsole.log(example().length);",
            },
            {
              label: "Read indexed properties and missing positions",
              language: "javascript",
              code: 'console.log(...Array.from({0:"a",1:"b",length:2}));\nconst a = Array.from({0:"a",length:3});\nconsole.log(a.length, 1 in a, a[1], a[2]);',
            },
          ],
        },
        {
          name: "Map while creating with Array.from()",
          explanation:
            "Pass a mapping function to calculate each new element as it is produced. Use the callback’s value and index to transform inputs or generate sequences.",
          note: "The callback receives value and index, without the source-array argument supplied by Array.prototype.map.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from",
          examples: [
            {
              label: "Transform input values",
              language: "javascript",
              code: "console.log(...Array.from([1, 2, 3], value => value * 2));\nconsole.log(...Array.from({length:5}, (_, index) => index));",
            },
            {
              label: "Generate independent random draws",
              language: "javascript",
              code: "const values = Array.from({length:3}, () => Math.random());\nconsole.log(values.length, values.every(value => value >= 0 && value < 1));\nconst draws = [0.1, 0.5, 0.9]; let index = 0;\nconsole.log(...Array.from({length:3}, () => draws[index++]));",
            },
          ],
        },
        {
          name: "Generate ranges and sequences",
          explanation:
            "Use an array-like length and an index-based mapper to generate values. A start/end range conventionally includes start and excludes end.",
          note: "This range helper rejects reversed or oversized ranges rather than silently returning an empty array or allocating excessively.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from",
          examples: [
            {
              label: "Generate an exclusive-end range",
              language: "javascript",
              code: 'const range = (start, end) => { if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || end < start || end - start > 1000000) throw new RangeError("Use ordered safe integers with at most one million values"); return Array.from({length:end-start}, (_, index) => start + index); };\nconsole.log(...range(5, 10)); console.log(range(5, 5).length);',
            },
            {
              label: "Generate square values and reject reversed bounds",
              language: "javascript",
              code: 'const range = (start, end) => { if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || end < start || end - start > 1000000) throw new RangeError("Use ordered safe integers with at most one million values"); return Array.from({length:end-start}, (_, index) => start + index); };\nconsole.log(...Array.from({length:10}, (_, index) => index * index));\ntry { range(10, 5); } catch (error) { console.log(error.name); }',
            },
          ],
        },
        {
          name: "Array.from() with thisArg",
          explanation:
            "Provide a context as the third argument for a normal mapping function. Use it to reuse a method that reads values from this.",
          note: "Arrow functions retain lexical this and do not use the supplied context.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from",
          examples: [
            {
              label: "Reuse an object method",
              language: "javascript",
              code: "const multiplier = {factor:2, multiply(value) { return value * this.factor; }};\nconsole.log(...Array.from([1, 2, 3], multiplier.multiply, multiplier));",
            },
            {
              label: "Bind context during sequence generation",
              language: "javascript",
              code: "const context = {start:10, step:3};\nconsole.log(...Array.from({length:4}, function(_, index) { return this.start + index * this.step; }, context));",
            },
          ],
        },
        {
          name: "Array.of() — elements from arguments",
          explanation:
            "Creates an array whose elements are exactly the supplied arguments. Use it when a single number must be an element rather than a length.",
          note: "Array(7) creates seven holes; Array.of(7) creates one present element containing 7.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of",
          examples: [
            {
              label: "Distinguish one numeric element from a sparse length",
              language: "javascript",
              code: "const single = Array.of(7), sparse = Array(7);\nconsole.log(single.length, single[0], 0 in single);\nconsole.log(sparse.length, 0 in sparse);",
            },
            {
              label: "Zero and several arguments",
              language: "javascript",
              code: "console.log(Array.of().length, Array().length);\nconsole.log(...Array.of(1, 2, 3)); console.log(...Array(1, 2, 3));",
            },
          ],
        },
        {
          name: "Array.of() with mixed values",
          explanation:
            "Array.of keeps each supplied value as one element without flattening or conversion. Use it for a heterogeneous collection with predictable construction.",
          note: "Objects and arrays are retained by reference.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of",
          examples: [
            {
              label: "Keep mixed types",
              language: "javascript",
              code: 'const a = Array.of("a", 1, true, null, {x:1});\nconsole.log(a.length, a[0], a[1], a[2], a[3], a[4].x);',
            },
            {
              label: "Keep a nested array and record references",
              language: "javascript",
              code: "const nested = [1, 2], record = {x:1}; const a = Array.of(nested, record);\nrecord.x = 9; console.log(a.length, a[0] === nested, a[1].x);",
            },
          ],
        },
        {
          name: "Initialize values with Array() and fill()",
          explanation:
            "Create a sparse array of the chosen length, then fill its positions with a value. Use it for simple constant initialization.",
          note: "fill mutates the array and writes the same supplied value at every selected position.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill",
          examples: [
            {
              label: "Initialize zero and repeated-text arrays",
              language: "javascript",
              code: 'console.log(...new Array(5).fill(0));\nconsole.log(...new Array(3).fill("hello"));',
            },
            {
              label: "Fill converts holes to present elements",
              language: "javascript",
              code: "const a = new Array(2); console.log(0 in a, a.length);\nconsole.log(a.fill(null) === a, 0 in a, 1 in a);",
            },
          ],
        },
        {
          name: "keys(), values(), and entries() iterators",
          explanation:
            "These methods return iterators for array indices, values, or index/value pairs. Use spread or Array.from to collect the yielded sequence.",
          note: "Unlike map and forEach, values and entries visit holes as undefined; keys visits every index through length.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries",
          examples: [
            {
              label: "Collect indices, values, and pairs",
              language: "javascript",
              code: 'const a = ["a", "b", "c"];\nconsole.log(...a.keys()); console.log(...a.values());\nconsole.log(JSON.stringify([...a.entries()]));',
            },
            {
              label: "Inspect sparse iterator output",
              language: "javascript",
              code: 'const a = ["a", , "c"];\nconsole.log(...Array.from(a.keys())); console.log(...Array.from(a.values()));\nconst pairs = Array.from(a.entries()); console.log(pairs[1][0], pairs[1][1]);',
            },
          ],
        },
        {
          name: "Create a matrix with independent rows",
          explanation:
            "Call the mapper separately for each row to allocate distinct inner arrays. Use this for a grid whose cells can change independently.",
          note: "Filling the outer array with one prebuilt row would share that row across every position.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from",
          examples: [
            {
              label: "Build a three-by-three matrix",
              language: "javascript",
              code: "const matrix = Array.from({length:3}, () => Array.from({length:3}, () => 0));\nconsole.log(JSON.stringify(matrix)); console.log(matrix[0] !== matrix[1]);",
            },
            {
              label: "Update only one row",
              language: "javascript",
              code: "const matrix = Array.from({length:2}, () => Array.from({length:2}, () => 0));\nmatrix[0][0] = 7; console.log(matrix[0][0], matrix[1][0]);",
            },
          ],
        },
        {
          name: "Clone an array with Array.from()",
          explanation:
            "Materializes the input into a new top-level array. Use it for an independent membership list while retaining nested references.",
          note: "The copy is shallow and dense; holes become present undefined values.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from",
          examples: [
            {
              label: "Copy primitive membership",
              language: "javascript",
              code: "const original = [1, 2, 3]; const clone = Array.from(original); clone.push(4);\nconsole.log(clone !== original, original.length, clone.length);",
            },
            {
              label: "Observe shared records and filled holes",
              language: "javascript",
              code: "const original = [{count:1}, ,]; const clone = Array.from(original);\nclone[0].count = 2; console.log(original[0].count, 1 in original, 1 in clone);",
            },
          ],
        },
        {
          name: "Sum converted arguments",
          explanation:
            "Convert the arguments object and reduce it with an initial total. Use it to demonstrate applying array methods to function arguments.",
          note: "This example expects numeric arguments; JavaScript addition otherwise follows its normal coercion rules.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from",
          examples: [
            {
              label: "Sum several numeric arguments",
              language: "javascript",
              code: "function sumAll() { return Array.from(arguments).reduce((sum,value) => sum + value, 0); }\nconsole.log(sumAll(1, 2, 3), sumAll(-2, 5));",
            },
            {
              label: "Handle no arguments",
              language: "javascript",
              code: "function sumAll() { return Array.from(arguments).reduce((sum,value) => sum + value, 0); }\nconsole.log(sumAll(), sumAll(7));",
            },
          ],
        },
        {
          name: "Unique values with Set and Array.from()",
          explanation:
            "Construct a Set and convert it back to an array to retain the first occurrence of each distinct value. Use it for deduplicating membership lists.",
          note: "Set uses SameValueZero equality: NaN matches itself, and object identity determines distinct objects.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from",
          examples: [
            {
              label: "Deduplicate numbers in insertion order",
              language: "javascript",
              code: "const unique = values => Array.from(new Set(values));\nconsole.log(...unique([1, 2, 2, 3, 3, 3]));",
            },
            {
              label: "Handle NaN and object identities",
              language: "javascript",
              code: "const item = {}; const values = Array.from(new Set([NaN, NaN, item, item, {}]));\nconsole.log(values.length, Number.isNaN(values[0]), values[1] === item, values[2] !== item);",
            },
          ],
        },
        {
          name: "Character frequency with Array.from()",
          explanation:
            "Convert a string into code points and accumulate a count for each. Use a dictionary without a prototype for the frequency table.",
          note: "Counts code points, including whitespace, rather than user-perceived grapheme clusters.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from",
          examples: [
            {
              label: "Count repeated letters",
              language: "javascript",
              code: 'const frequency = text => { const counts = Object.create(null); Array.from(text).forEach(char => { counts[char] = (counts[char] ?? 0) + 1; }); return counts; };\nconst counts = frequency("hello"); console.log(counts.h, counts.e, counts.l, counts.o);',
            },
            {
              label: "Count emoji and handle empty input",
              language: "javascript",
              code: 'const frequency = text => { const counts = Object.create(null); Array.from(text).forEach(char => { counts[char] = (counts[char] ?? 0) + 1; }); return counts; };\nconsole.log(frequency("😀😀😁")["😀"], Object.keys(frequency("")).length);',
            },
          ],
        },
        {
          name: "fill() — overwrite an array range",
          explanation:
            "Writes the supplied value from start up to the exclusive end and returns the same array. Omit bounds to fill the entire array.",
          note: "Mutates existing positions and holes without changing length; omitted end means length.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill",
          examples: [
            {
              label: "Fill the entire array, then a tail",
              language: "javascript",
              code: "const a = [1, 2, 3, 4, 5]; console.log(a.fill(0) === a, ...a);\na.fill(9, 2); console.log(...a);",
            },
            {
              label: "Fill an exclusive-end range",
              language: "javascript",
              code: "const a = [0, 0, 9, 9, 9]; a.fill(7, 1, 3); console.log(...a);\nconsole.log(...[1, 2, 3].fill(0, 1, 2));",
            },
          ],
        },
        {
          name: "fill() negative indices and bounds",
          explanation:
            "Negative bounds count back from the array length and are clamped to its bounds. Use them to overwrite the final few positions.",
          note: "An empty or reversed interval writes nothing.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill",
          examples: [
            {
              label: "Fill the last two positions",
              language: "javascript",
              code: "const a = [0, 7, 7, 9, 9]; a.fill(5, -2); console.log(...a);",
            },
            {
              label: "Clamp bounds and leave empty intervals alone",
              language: "javascript",
              code: "console.log(...[1, 2, 3].fill(8, -99, 1));\nconst a = [1, 2, 3]; a.fill(0, 2, 1); a.fill(0, 99); console.log(...a);",
            },
          ],
        },
        {
          name: "fill() shares object references",
          explanation:
            "fill stores a single supplied object reference at each selected position. Use an Array.from factory when every position needs a separate object.",
          note: "Changing a shared object affects every reference to it; replacing one array position is a different operation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill",
          examples: [
            {
              label: "Observe shared objects",
              language: "javascript",
              code: "const a = new Array(3).fill({}); a[0].x = 1;\nconsole.log(a[0] === a[1], ...a.map(item => item.x));",
            },
            {
              label: "Allocate independent objects",
              language: "javascript",
              code: "const a = Array.from({length:3}, () => ({})); a[0].x = 1;\nconsole.log(a[0] !== a[1], a[0].x, a[1].x, a[2].x);",
            },
          ],
        },
        {
          name: "fill() stores functions without calling them",
          explanation:
            "Passing a function to fill stores that function as the value. Use the Array.from mapping callback to calculate a separate value for each index.",
          note: "fill is a value-writing API, not a callback API.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill",
          examples: [
            {
              label: "Store one function reference",
              language: "javascript",
              code: "const identity = index => index; const a = new Array(3).fill(identity);\nconsole.log(typeof a[0], a[0] === a[1], a[2](7));",
            },
            {
              label: "Generate increasing values instead",
              language: "javascript",
              code: "const a = Array.from({length:5}, (_, index) => index); console.log(...a);",
            },
          ],
        },
        {
          name: "copyWithin() — copy inside the same array",
          explanation:
            "Copies a source range onto another position in the same array and returns that array. Use it to overwrite positions without changing length.",
          note: "Source end is exclusive; copying is truncated at the destination boundary and does not insert elements.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin",
          examples: [
            {
              label: "Copy the tail to the beginning",
              language: "javascript",
              code: "const a = [1, 2, 3, 4, 5]; console.log(a.copyWithin(0, 3) === a, ...a);",
            },
            {
              label: "Copy a single bounded source position",
              language: "javascript",
              code: "const a = [1, 2, 3, 4, 5]; a.copyWithin(1, 3, 4); console.log(...a);\nconsole.log(a.length);",
            },
          ],
        },
        {
          name: "copyWithin() negative and overlapping ranges",
          explanation:
            "Negative bounds count from the end, and overlapping source/destination ranges are copied safely. Use it when shifting an existing block of values in place.",
          note: "The result behaves as though source values were preserved before they were overwritten; holes in the source delete corresponding destination properties.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin",
          examples: [
            {
              label: "Copy with negative bounds and overlap",
              language: "javascript",
              code: "console.log(...[1, 2, 3, 4, 5].copyWithin(-2, -3, -1));\nconsole.log(...[1, 2, 3, 4, 5].copyWithin(2, 0, 3));",
            },
            {
              label: "Copy holes and truncate at the end",
              language: "javascript",
              code: "const a = [1, , 3, 4]; a.copyWithin(2, 0, 2);\nconsole.log(a.length, a[2], 3 in a);\nconsole.log(...[1, 2, 3].copyWithin(2, 0));",
            },
          ],
        },
        {
          name: "shiftRight() — overwrite a block to the right",
          explanation:
            "Copy an initial block to a later position without inserting elements or clearing the prefix. Use it when duplicate prefix values are acceptable.",
          note: "This helper is not rotation: overwritten tail values are lost. It accepts integer counts between zero and length.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin",
          examples: [
            {
              label: "Shift a block while retaining its prefix",
              language: "javascript",
              code: 'const shiftRight = (a, count) => { if (!Number.isInteger(count) || count < 0 || count > a.length) throw new RangeError("Use a count between zero and length"); return a.copyWithin(count, 0, a.length - count); };\nconst a = [1, 2, 3, 4, 5]; console.log(shiftRight(a, 2) === a, ...a);',
            },
            {
              label: "Handle zero and reject invalid counts",
              language: "javascript",
              code: 'const shiftRight = (a, count) => { if (!Number.isInteger(count) || count < 0 || count > a.length) throw new RangeError("Use a count between zero and length"); return a.copyWithin(count, 0, a.length - count); };\nconsole.log(...shiftRight([1, 2, 3], 0));\ntry { shiftRight([1, 2], -1); } catch (error) { console.log(error.name); }',
            },
          ],
        },
        {
          name: "Create patterns and reset sections with fill()",
          explanation:
            "Chain fills to create bands of constant values or reset a selected interval. Use explicit exclusive-end bounds for the section to change.",
          note: "All calls mutate and return the same array, making chaining possible.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill",
          examples: [
            {
              label: "Create two constant bands",
              language: "javascript",
              code: "const pattern = new Array(10).fill(0, 0, 5).fill(1, 5, 10); console.log(...pattern);",
            },
            {
              label: "Reset an internal section",
              language: "javascript",
              code: "const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; data.fill(0, 3, 7); console.log(...data);",
            },
          ],
        },
        {
          name: "Initialize a board with distinct rows",
          explanation:
            "Fill the outer array so map visits every position, then create a fresh inner array for each row. Use this to initialize a mutable board.",
          note: "Array(8).map alone skips its holes; filling first ensures callbacks run. Primitive null cells are safe to repeat.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill",
          examples: [
            {
              label: "Create an eight-by-eight board",
              language: "javascript",
              code: "const board = Array(8).fill(null).map(() => Array(8).fill(null));\nconsole.log(board.length, board.every(row => row.length === 8), board[0] !== board[1]);",
            },
            {
              label: "Change a single cell",
              language: "javascript",
              code: 'const board = Array(8).fill(null).map(() => Array(8).fill(null));\nboard[0][0] = "rook"; console.log(board[0][0], board[1][0]);',
            },
          ],
        },
        {
          name: "rotateBuffer() — preserve and rotate values",
          explanation:
            "Save the tail, shift the remaining block, then restore the saved values at the beginning. Positive counts rotate right; negative counts rotate left.",
          note: "The screenshot’s chained copies overwrite values before preserving them. This corrected helper mutates and returns the input, handles empty arrays, and assumes a dense array.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin",
          examples: [
            {
              label: "Rotate right without losing the tail",
              language: "javascript",
              code: 'const rotateBuffer = (buffer, positions) => { if (!Number.isSafeInteger(positions)) throw new RangeError("Use a safe integer rotation"); const length = buffer.length; if (length === 0) return buffer; const count = ((positions % length) + length) % length; if (count === 0) return buffer; const tail = buffer.slice(length - count); buffer.copyWithin(count, 0, length - count); for (let i = 0; i < count; i++) buffer[i] = tail[i]; return buffer; };\nconst a = [1, 2, 3, 4, 5]; console.log(rotateBuffer(a, 2) === a, ...a);\nconsole.log(...rotateBuffer([1, 2, 3, 4, 5], 7));',
            },
            {
              label: "Rotate left, handle empty input, and keep full turns",
              language: "javascript",
              code: 'const rotateBuffer = (buffer, positions) => { if (!Number.isSafeInteger(positions)) throw new RangeError("Use a safe integer rotation"); const length = buffer.length; if (length === 0) return buffer; const count = ((positions % length) + length) % length; if (count === 0) return buffer; const tail = buffer.slice(length - count); buffer.copyWithin(count, 0, length - count); for (let i = 0; i < count; i++) buffer[i] = tail[i]; return buffer; };\nconsole.log(...rotateBuffer([1, 2, 3, 4, 5], -1));\nconsole.log(rotateBuffer([], 2).length); console.log(...rotateBuffer([1, 2, 3], 3));',
            },
          ],
        },
      ],
    },
    {
      name: "Modern Array Methods (ES2023+)",
      id: "modern-array-methods",
      intro:
        "Copying methods → reverse searches → asynchronous collection and grouping, following all six images. ES2023 added the copying and reverse-search methods, ES2024 added Object.groupBy and Map.groupBy, and ES2026 specifies Array.fromAsync. Run each snippet independently in a current runtime with these APIs, fetch, File, and Web Streams support.",
      methods: [
        {
          name: "toSorted() — sort a copy",
          explanation:
            "Returns a new array in sorted order while retaining the source order. Use a numeric comparator for numbers or a locale-aware comparator for names.",
          note: "ES2023; default ordering compares string representations. The copy is shallow, so record references remain shared.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted",
          examples: [
            {
              label: "Sort numeric scores",
              language: "javascript",
              code: "const scores = [3, 1, 4, 1, 5, 9, 2, 6];\nconsole.log(...scores.toSorted((a,b) => a-b)); console.log(...scores);",
            },
            {
              label: "Replace local state with sorted users",
              language: "javascript",
              code: 'let users = [{name:"John"},{name:"Jane"}]; const previous = users;\nconst setUsers = next => { users = next; };\nsetUsers(users.toSorted((a,b) => a.name.localeCompare(b.name, "en")));\nconsole.log(...users.map(user => user.name)); console.log(previous !== users, previous[0] === users[1]);',
            },
          ],
        },
        {
          name: "toReversed() — reverse a copy",
          explanation:
            "Returns the values in reverse order in a new array. Use it for a reversed view while retaining the original queue or list.",
          note: "ES2023; holes become explicit undefined elements in the dense result.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed",
          examples: [
            {
              label: "Reverse a queue view",
              language: "javascript",
              code: 'const queue = ["a", "b", "c"]; const recent = queue.toReversed();\nconsole.log(...recent); console.log(...queue); console.log(recent !== queue);',
            },
            {
              label: "Keep record references and fill sparse positions",
              language: "javascript",
              code: "const record = {id:1}; const a = [record, , 3]; const reversed = a.toReversed();\nconsole.log(reversed[2] === record, 1 in reversed, reversed[1], 1 in a);",
            },
          ],
        },
        {
          name: "toSpliced() — remove, insert, or replace in a copy",
          explanation:
            "Returns the edited array without changing the source. Use start, deleteCount, and optional inserted values to express a membership update.",
          note: "ES2023; unlike splice, this returns the resulting array rather than the removed elements.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced",
          examples: [
            {
              label: "Remove or insert a todo",
              language: "javascript",
              code: 'const todos = ["buy milk", "walk dog", "pay bills"];\nconsole.log(...todos.toSpliced(1, 1)); console.log(...todos.toSpliced(1, 0, "gym"));\nconsole.log(...todos);',
            },
            {
              label: "Replace and use a negative starting position",
              language: "javascript",
              code: 'const todos = ["buy milk", "walk dog", "pay bills"];\nconsole.log(...todos.toSpliced(0, 1, "sleep"));\nconsole.log(...todos.toSpliced(-1, 1, "rest"));',
            },
          ],
        },
        {
          name: "toSpliced() omitted arguments and sparse arrays",
          explanation:
            "Omitting deleteCount removes the remaining tail; calling with no arguments returns a copy. Use explicit zero when inserting without deletion.",
          note: "An explicit undefined deleteCount converts to zero. The returned array is dense even when the source is sparse.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced",
          examples: [
            {
              label: "Distinguish omitted and undefined delete counts",
              language: "javascript",
              code: "const a = [1, 2, 3]; console.log(...a.toSpliced(1)); console.log(...a.toSpliced(1, undefined, 9));\nconsole.log(...a.toSpliced());",
            },
            {
              label: "Copy sparse membership into present positions",
              language: "javascript",
              code: "const a = [1, , 3]; const copy = a.toSpliced();\nconsole.log(copy !== a, copy.length, 1 in copy, copy[1], 1 in a);",
            },
          ],
        },
        {
          name: "with() — replace one index in a copy",
          explanation:
            "Returns a new array with one indexed value replaced. Use a negative index to count backward from the end.",
          note: "ES2023; unlike bracket assignment, out-of-range indices throw RangeError rather than extending the array.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with",
          examples: [
            {
              label: "Replace by positive and negative index",
              language: "javascript",
              code: "const row = [10, 20, 30, 40]; console.log(...row.with(2, 999));\nconsole.log(...row.with(-1, 0)); console.log(...row);",
            },
            {
              label: "Reject an invalid index and densify holes",
              language: "javascript",
              code: "try { [1, 2].with(2, 9); } catch (error) { console.log(error.name); }\nconst a = [1, , 3]; const next = a.with(0, 9); console.log(...next); console.log(1 in next);",
            },
          ],
        },
        {
          name: "Copying methods preserve top-level state",
          explanation:
            "Use these methods to produce a fresh array identity for a state update. Copy the edited record as well when changing object properties.",
          note: "These methods do not freeze data or perform structuredClone-style deep cloning. A callback can still mutate input objects if it explicitly does so.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with",
          examples: [
            {
              label: "Replace a record without changing its predecessor",
              language: "javascript",
              code: "const previous = [{id:1,done:false},{id:2,done:false}];\nconst next = previous.with(0, {...previous[0], done:true});\nconsole.log(next !== previous, next[0] !== previous[0], previous[0].done, next[0].done, next[1] === previous[1]);",
            },
            {
              label: "A no-op edit still creates a new array",
              language: "javascript",
              code: "const a = [{id:1}]; const copies = [a.toSorted(), a.toReversed(), a.toSpliced(0,0), a.with(0,a[0])];\nconsole.log(copies.every(copy => copy !== a), copies.every(copy => copy[0] === a[0]));",
            },
          ],
        },
        {
          name: "findLast() — last matching value",
          explanation:
            "Searches from the final index toward zero and returns the first matching value in that direction. Use it for the latest record when array order represents recency.",
          note: "ES2023; no match returns undefined. It avoids allocating a reversed copy, but timing depends on the data and runtime.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast",
          examples: [
            {
              label: "Find the latest login",
              language: "javascript",
              code: 'const events = [{type:"login",at:1},{type:"click",at:2},{type:"login",at:3},{type:"logout",at:4}];\nconst last = events.findLast(event => event.type === "login");\nconsole.log(last.at, last === events[2]);',
            },
            {
              label: "Find the most recent shipped order",
              language: "javascript",
              code: 'const orders = [{id:1,status:"shipped"},{id:2,status:"pending"},{id:3,status:"shipped"},{id:4,status:"pending"}];\nconst recent = orders.findLast(order => order.status === "shipped");\nconst copiedSearch = [...orders].reverse().find(order => order.status === "shipped");\nconsole.log(recent.id, recent === copiedSearch, orders[0].id); console.log(orders.findLast(order => order.status === "cancelled"));',
            },
          ],
        },
        {
          name: "findLastIndex() — last matching position",
          explanation:
            "Returns the original array index of the last matching element or -1 when none matches. Use it before a guarded indexed replacement or removal.",
          note: "ES2023; a -1 search result must be checked because with(-1, value) would replace the final element.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex",
          examples: [
            {
              label: "Find a last position and a missing status",
              language: "javascript",
              code: 'const orders = [{id:1,status:"paid"},{id:2,status:"pending"},{id:3,status:"paid"}];\nconsole.log(orders.findLastIndex(order => order.status === "paid"), orders.findLastIndex(order => order.status === "cancelled"));',
            },
            {
              label: "Inspect reverse callback order and holes",
              language: "javascript",
              code: "const a = [1, , 3]; const visited = [];\nconst index = a.findLastIndex((value,index,array) => { visited.push(index); return value === undefined && array === a; });\nconsole.log(index, ...visited);",
            },
          ],
        },
        {
          name: "Update or remove the last matching record",
          explanation:
            "Find the matching index, guard -1, then use with or toSpliced. Build replacements from the matched record so all its unrelated fields are retained.",
          note: "Using orders.at(-1) as the replacement source can copy the wrong record if the match is earlier in the array.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex",
          examples: [
            {
              label: "Update an earlier match without copying the last record",
              language: "javascript",
              code: 'const markLastPending = orders => { const index = orders.findLastIndex(order => order.status === "pending"); return index === -1 ? orders : orders.with(index, {...orders[index], status:"shipped"}); };\nconst orders = [{id:1,status:"pending",note:"keep"},{id:2,status:"shipped",note:"other"}];\nconst next = markLastPending(orders);\nconsole.log(next[0].id, next[0].status, next[0].note, orders[0].status);\nconsole.log(markLastPending(next) === next);',
            },
            {
              label: "Remove a last match with a missing-match guard",
              language: "javascript",
              code: 'const orders = [{id:1,status:"pending"},{id:2,status:"paid"},{id:3,status:"pending"}];\nconst removeLast = (items,status) => { const index = items.findLastIndex(item => item.status === status); return index === -1 ? items : items.toSpliced(index,1); };\nconsole.log(...removeLast(orders,"pending").map(item => item.id)); console.log(removeLast(orders,"cancelled") === orders);',
            },
          ],
        },
        {
          name: "Array.fromAsync() — collect an async source",
          explanation:
            "Returns a promise for an array collected from an async iterable, synchronous iterable, or array-like object. Use it to replace a manual for-await/push collection loop.",
          note: "Unlike the ES2023 copying methods, fromAsync is specified in ES2026. Check runtime support; async iteration and mapping are consumed sequentially.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync",
          examples: [
            {
              label: "Collect an async generator",
              language: "javascript",
              code: "(async () => {\nasync function* range(count) { for (let i = 0; i < count; i++) yield i; }\nconsole.log(...await Array.fromAsync(range(5)));\n})().catch(error => { throw error; });",
            },
            {
              label: "Await synchronous iterable values and array-like fields",
              language: "javascript",
              code: '(async () => {\nconsole.log(...await Array.fromAsync([Promise.resolve(1), Promise.resolve(2)]));\nconst a = await Array.fromAsync({0:Promise.resolve("a"),length:2});\nconsole.log(a.length, a[0], a[1], 1 in a);\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Array.fromAsync() mapping and concurrency",
          explanation:
            "An async mapper is awaited for each element before the next element is processed. Use Promise.all with map when you deliberately want to start all mapped operations together.",
          note: "Already-created promises may already be running; sequential consumption does not serialize the creation of those promises or make fromAsync equivalent to Promise.all.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync",
          examples: [
            {
              label: "Measure sequential mapping without timing assumptions",
              language: "javascript",
              code: "(async () => {\nlet active = 0, peak = 0;\nconst values = await Array.fromAsync([1,2,3], async value => { active++; peak = Math.max(peak,active); await Promise.resolve(); active--; return value * 2; });\nconsole.log(...values); console.log(peak);\nactive = 0; peak = 0;\nawait Promise.all([1,2,3].map(async () => { active++; peak = Math.max(peak,active); await Promise.resolve(); active--; }));\nconsole.log(peak);\n})().catch(error => { throw error; });",
            },
            {
              label: "Map with index and a supplied context",
              language: "javascript",
              code: '(async () => {\nconst context = {factor:3};\nconst values = await Array.fromAsync([Promise.resolve(2), 4], async function(value,index) { return value * this.factor + index; }, context);\nconsole.log(...values);\ntry { await Array.fromAsync([1], async () => { throw new Error("mapping failed"); }); } catch (error) { console.log(error.message); }\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Fetch responses with Array.fromAsync()",
          explanation:
            "Map URLs to responses and then collect their decoded text. Use defined URLs and check response status before reading bodies.",
          note: "Mapping fetch calls this way starts them sequentially; use Promise.all when parallel requests are intended.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync",
          examples: [
            {
              label: "Collect response objects then their text",
              language: "javascript",
              code: '(async () => {\nconst urls = ["data:text/plain,alpha", "data:text/plain,beta"];\nconst responses = await Array.fromAsync(urls, async url => { const response = await fetch(url); if (!response.ok) throw new Error(`HTTP ${response.status}`); return response; });\nconst docs = await Array.fromAsync(responses, response => response.text());\nconsole.log(...docs);\n})().catch(error => { throw error; });',
            },
            {
              label: "Collect JSON directly in the mapper",
              language: "javascript",
              code: '(async () => {\nconst urls = ["data:application/json,%7B%22id%22%3A1%7D", "data:application/json,%7B%22id%22%3A2%7D"];\nconst records = await Array.fromAsync(urls, async url => { const response = await fetch(url); if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.json(); });\nconsole.log(...records.map(record => record.id));\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Collect stream chunks with Array.fromAsync()",
          explanation:
            "Consume a ReadableStream as an async iterable, decoding byte chunks with TextDecoderStream when text is needed. Join decoded chunks before interpreting line boundaries.",
          note: "Stream chunks are not guaranteed to align with lines. Collection buffers the entire result; use incremental processing for large streams.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync",
          examples: [
            {
              label: "Fetch and parse newline-delimited JSON",
              language: "javascript",
              code: '(async () => {\nconst response = await fetch("data:application/x-ndjson,%7B%22id%22%3A1%7D%0A%7B%22id%22%3A2%7D%0A");\nif (!response.ok || !response.body) throw new Error("Missing response body");\nconst chunks = await Array.fromAsync(response.body.pipeThrough(new TextDecoderStream()));\nconst records = chunks.join("").trim().split(/\\r?\\n/).map(line => JSON.parse(line));\nconsole.log(...records.map(record => record.id));\n})().catch(error => { throw error; });',
            },
            {
              label: "Collect a defined file stream",
              language: "javascript",
              code: '(async () => {\nconst myFile = new File(["hello\\nworld\\n"], "notes.txt", {type:"text/plain"});\nasync function* chunks(file) { for await (const chunk of file.stream().pipeThrough(new TextDecoderStream())) yield chunk; }\nconst decoded = await Array.fromAsync(chunks(myFile));\nconsole.log(decoded.join("") === "hello\\nworld\\n");\n})().catch(error => { throw error; });',
            },
          ],
        },
        {
          name: "Object.groupBy() — group by property keys",
          explanation:
            "Groups an iterable into arrays stored in a new null-prototype object. Use it when the grouping keys are strings or symbols.",
          note: "ES2024; other callback results are converted to property keys. Use Object.hasOwn to check membership; grouped items retain their original references.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy",
          examples: [
            {
              label: "Group produce by type",
              language: "javascript",
              code: 'const items = [{name:"apple",type:"fruit"},{name:"carrot",type:"veg"},{name:"pear",type:"fruit"}];\nconst grouped = Object.groupBy(items,item => item.type);\nconsole.log(...grouped.fruit.map(item => item.name)); console.log(grouped.veg[0].name, Object.getPrototypeOf(grouped) === null);',
            },
            {
              label: "Group orders and check a missing group",
              language: "javascript",
              code: 'const orders = [{id:1,status:"paid"},{id:2,status:"pending"},{id:3,status:"paid"}];\nconst grouped = Object.groupBy(orders,order => order.status);\nconsole.log(...grouped.paid.map(order => order.id)); console.log(Object.hasOwn(grouped,"cancelled"), grouped.paid[0] === orders[0]);',
            },
          ],
        },
        {
          name: "Object.groupBy() symbols and key conversion",
          explanation:
            "A group key may be a symbol or a value converted to a string. Use Map.groupBy when distinct object identities must produce separate groups.",
          note: 'Number 1 and string "1" produce the same object property key. A null prototype permits ordinary grouping under keys such as __proto__.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy",
          examples: [
            {
              label: "Keep a symbol key and handle special names",
              language: "javascript",
              code: 'const key = Symbol("special"); const grouped = Object.groupBy([1,2], value => value === 1 ? key : "__proto__");\nconsole.log(grouped[key][0], grouped.__proto__[0], Object.getPrototypeOf(grouped) === null);',
            },
            {
              label: "Observe property-key coercion and callback indices",
              language: "javascript",
              code: 'const grouped = Object.groupBy([1,"1"], value => value); console.log(grouped["1"].length);\nconst indexed = Object.groupBy(["a","b","c"], (_,index) => index % 2 ? "odd" : "even");\nconsole.log(...indexed.even);',
            },
          ],
        },
        {
          name: "Map.groupBy() — group by arbitrary keys",
          explanation:
            "Groups an iterable into a Map whose keys may be any values, including objects. Use it for parent or team objects that must retain their identity.",
          note: "ES2024; keys follow SameValueZero equality. Distinct objects remain distinct keys even when their properties match.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/groupBy",
          examples: [
            {
              label: "Group users by team identity",
              language: "javascript",
              code: 'const t1 = {name:"Team"}, t2 = {name:"Team"};\nconst users = [{team:t1,name:"a"},{team:t2,name:"b"},{team:t1,name:"c"}];\nconst grouped = Map.groupBy(users,user => user.team);\nconsole.log(grouped.size, ...grouped.get(t1).map(user => user.name));\nconsole.log(grouped.has({name:"Team"}));',
            },
            {
              label: "Group rows by parent and preserve record references",
              language: "javascript",
              code: "const parentA = {}, parentB = {};\nconst rows = [{id:1,parent:parentA},{id:2,parent:parentB},{id:3,parent:parentA}];\nconst grouped = Map.groupBy(rows,row => row.parent);\nconsole.log(...grouped.get(parentA).map(row => row.id));\nconsole.log(grouped.get(parentB)[0] === rows[1], Map.groupBy([], value => value).size);",
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
          "array-methods-cheatsheet:" +
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
