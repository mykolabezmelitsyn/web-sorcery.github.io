const topics = [
  [
    "Arrays",
    [
      [
        "map()",
        "Transform every element into a new array.",
        `const products = [{name: 'Keyboard', price: 80}, {name: 'Mouse', price: 25}];\nconst labels = products.map(p => \`${"${p.name}"} — $${"${p.price}"}\`);\nconsole.log(labels); // ['Keyboard — $80', 'Mouse — $25']`,
        [
          "Format a list of delivery options",
          `const methods = ['standard', 'express'];\nconst options = methods.map((method, index) => ({\n  id: index + 1, label: method.toUpperCase()\n}));\nconsole.log(options);\n// [{id: 1, label: 'STANDARD'}, {id: 2, label: 'EXPRESS'}]`,
        ],
      ],
      [
        "filter()",
        "Keep elements that match a condition.",
        `const orders = [{id: 1, paid: true}, {id: 2, paid: false}];\nconst paidOrders = orders.filter(order => order.paid);`,
        [
          "Remove empty search terms",
          `const terms = ['JavaScript', '', 'CSS', '   '];\nconst usable = terms.filter(term => term.trim().length > 0);\nconsole.log(usable); // ['JavaScript', 'CSS']`,
        ],
      ],
      [
        "find()",
        "Get the first matching element, or undefined.",
        `const users = [{id: 7, name: 'Anna'}, {id: 8, name: 'Max'}];\nconst user = users.find(u => u.id === 8);`,
        [
          "Look up a product safely",
          `const products = [{sku: 'KB-01', stock: 3}];\nconst product = products.find(item => item.sku === 'MISSING');\nconsole.log(product?.stock ?? 0); // 0`,
        ],
      ],
      [
        "findIndex()",
        "Get the index of the first match, or -1.",
        `const tasks = [{id: 4}, {id: 9}];\nconst index = tasks.findIndex(task => task.id === 9); // 1`,
        [
          "Update a matching cart item",
          `const cart = [{sku: 'A', quantity: 1}, {sku: 'B', quantity: 2}];\nconst index = cart.findIndex(item => item.sku === 'B');\nif (index !== -1) cart[index].quantity += 1;\nconsole.log(cart[1].quantity); // 3`,
        ],
      ],
      [
        "some()",
        "Check whether at least one element matches.",
        `const cart = [{stock: 5}, {stock: 0}];\nconst hasOutOfStockItem = cart.some(item => item.stock === 0);`,
        [
          "Detect an overdue invoice",
          `const invoices = [{daysOverdue: 0}, {daysOverdue: 12}];\nconsole.log(invoices.some(invoice => invoice.daysOverdue > 0)); // true`,
        ],
      ],
      [
        "every()",
        "Check whether all elements match (true for an empty array).",
        `const fields = ['email', 'password'];\nconst form = {email: 'a@example.com', password: 'secret'};\nconst isComplete = fields.every(key => Boolean(form[key]));`,
        [
          "Validate uploaded file sizes",
          `const files = [{size: 1200}, {size: 4000}];\nconst limit = 5000;\nconst canUpload = files.length > 0 && files.every(file => file.size <= limit);\nconsole.log(canUpload); // true; the length check rejects an empty selection`,
        ],
      ],
      [
        "reduce()",
        "Accumulate elements into one result.",
        `const cart = [{price: 15, qty: 2}, {price: 8, qty: 3}];\nconst total = cart.reduce((sum, item) => sum + item.price * item.qty, 0); // 54`,
        [
          "Group tickets by status",
          `const tickets = [{id: 1, status: 'open'}, {id: 2, status: 'closed'},\n  {id: 3, status: 'open'}];\nconst grouped = tickets.reduce((groups, ticket) => {\n  (groups[ticket.status] ??= []).push(ticket.id);\n  return groups;\n}, Object.create(null));\nconsole.log(grouped.open); // [1, 3]`,
        ],
      ],
      [
        "forEach()",
        "Run a side effect for each item; does not return a new array.",
        `const notifications = ['Welcome', 'Payment received'];\nnotifications.forEach(message => console.log(message));`,
        [
          "Prepare personalized notifications",
          `const users = [{name: 'Mila'}, {name: 'Oleh'}];\nconst messages = [];\nusers.forEach(user => { messages.push('Hello, ' + user.name); });\nconsole.log(messages); // ['Hello, Mila', 'Hello, Oleh']`,
        ],
      ],
      [
        "sort() / toSorted()",
        "Sort values with a comparator; sort mutates, toSorted returns a copy.",
        `const prices = [100, 9, 35];\nconst ascending = prices.toSorted((a, b) => a - b); // [9, 35, 100]\n// For older runtimes: [...prices].sort((a, b) => a - b)`,
        [
          "Sort a leaderboard in place",
          `const players = [{name: 'Mila', score: 8}, {name: 'Oleh', score: 15}];\nplayers.sort((a, b) => b.score - a.score);\nconsole.log(players[0].name); // 'Oleh'; players was mutated\nconst alphabetical = players.toSorted((a, b) => a.name.localeCompare(b.name));\nconsole.log(alphabetical[0].name); // 'Mila'; players stays in score order`,
        ],
      ],
      [
        "includes()",
        "Check whether an array contains a value.",
        `const roles = ['editor', 'admin'];\nconst canEdit = roles.includes('editor');`,
        [
          "Check an allowed file extension",
          `const allowed = ['jpg', 'png', 'webp'];\nconst filename = 'Avatar.PNG';\nconst extension = filename.split('.').at(-1).toLowerCase();\nconsole.log(allowed.includes(extension)); // true`,
        ],
      ],
      [
        "indexOf()",
        "Find a value’s first index; returns -1 if missing.",
        `const tags = ['js', 'css', 'html'];\nconst cssIndex = tags.indexOf('css'); // 1`,
        [
          "Remove a selected tag if present",
          `const tags = ['html', 'css', 'js'];\nconst index = tags.indexOf('css');\nif (index !== -1) tags.splice(index, 1);\nconsole.log(tags); // ['html', 'js']`,
        ],
      ],
      [
        "slice()",
        "Copy a portion without mutating the original array.",
        `const articles = ['A', 'B', 'C', 'D'];\nconst pageOne = articles.slice(0, 2); // ['A', 'B']`,
        [
          "Get the most recent notifications",
          `const notifications = ['created', 'paid', 'packed', 'shipped'];\nconsole.log(notifications.slice(-2)); // ['packed', 'shipped']\nconsole.log(notifications.length); // 4; the original is unchanged`,
        ],
      ],
      [
        "splice() / toSpliced()",
        "Insert or remove items; splice mutates, toSpliced returns a copy.",
        `const queue = ['Alice', 'Bob', 'Cara'];\nconst nextQueue = queue.toSpliced(1, 1); // ['Alice', 'Cara']`,
        [
          "Replace a task in place or immutably",
          `const tasks = ['draft', 'review', 'publish'];\nconst removed = tasks.splice(1, 1, 'edit');\nconsole.log(removed); // ['review']\nconsole.log(tasks); // ['draft', 'edit', 'publish']\nconst revised = tasks.toSpliced(1, 1, 'approve');\nconsole.log(revised); // ['draft', 'approve', 'publish']`,
        ],
      ],
      [
        "push() / pop()",
        "Add or remove an item at the end; both mutate the array.",
        `const history = ['home'];\nhistory.push('products');\nconst lastPage = history.pop(); // 'products'`,
        [
          "Maintain an undo stack",
          `const undoStack = [];\nundoStack.push({action: 'rename', previous: 'Untitled'});\nundoStack.push({action: 'move', previous: 0});\nconst lastAction = undoStack.pop();\nconsole.log(lastAction.action); // 'move'\nconsole.log(undoStack.length); // 1`,
        ],
      ],
      [
        "shift() / unshift()",
        "Remove or add elements at the beginning; both mutate.",
        `const queue = ['second'];\nqueue.unshift('first');\nconst next = queue.shift(); // 'first'`,
        [
          "Prioritize a support queue",
          `const queue = ['normal ticket', 'another ticket'];\nqueue.unshift('urgent ticket');\nconsole.log(queue.shift()); // 'urgent ticket'\nconsole.log(queue); // ['normal ticket', 'another ticket']`,
        ],
      ],
      [
        "flat() / flatMap()",
        "Flatten nested arrays; flatMap maps and flattens one level.",
        `const orders = [{items: ['pen', 'book']}, {items: ['lamp']}];\nconst items = orders.flatMap(order => order.items);`,
        [
          "Combine batches and split tags",
          `const batches = [['A', 'B'], ['C']];\nconsole.log(batches.flat()); // ['A', 'B', 'C']\nconst rows = ['html,css', 'js,vue'];\nconsole.log(rows.flatMap(row => row.split(','))); // ['html', 'css', 'js', 'vue']`,
        ],
      ],
      [
        "Array.from()",
        "Convert iterables/array-like values into arrays, optionally mapping.",
        `const pageNumbers = Array.from({length: 5}, (_, i) => i + 1); // [1,2,3,4,5]`,
        [
          "Convert unique attendees to an array",
          `const attendees = new Set(['Mila', 'Oleh', 'Mila']);\nconst badges = Array.from(attendees, name => name.toUpperCase());\nconsole.log(badges); // ['MILA', 'OLEH']`,
        ],
      ],
      [
        "Array.isArray()",
        "Check that a value is an array.",
        `const payload = JSON.parse('[1,2,3]');\nif (Array.isArray(payload)) console.log(payload.length);`,
        [
          "Normalize an API field to an array",
          `function asList(value) {\n  if (value == null) return [];\n  return Array.isArray(value) ? value : [value];\n}\nconsole.log(asList('news')); // ['news']\nconsole.log(asList(['news', 'tips'])); // ['news', 'tips']`,
        ],
      ],
      [
        "at()",
        "Read by index, including negative indices.",
        `const events = ['created', 'updated', 'published'];\nconst latest = events.at(-1); // 'published'`,
        [
          "Read the previous step without changing history",
          `const steps = ['cart', 'address', 'payment'];\nconsole.log(steps.at(-2)); // 'address'\nconsole.log([].at(-1) ?? 'No steps yet'); // 'No steps yet'`,
        ],
      ],
      [
        "join()",
        "Join elements into a string.",
        `const path = ['products', 'laptops', '42'];\nconst urlPath = '/' + path.join('/');`,
        [
          "Build a readable address",
          `const address = ['24 Main Street', '', 'Kyiv', 'Ukraine'];\nconsole.log(address.filter(Boolean).join(', '));\n// '24 Main Street, Kyiv, Ukraine'`,
        ],
      ],
      [
        "Set / new Set()",
        "Deduplicate primitive values and maintain unique membership.",
        `const categoryIds = [2, 3, 2, 5];\nconst uniqueIds = [...new Set(categoryIds)]; // [2,3,5]`,
        [
          "Find visitors shared by two campaigns",
          `const campaignA = new Set([101, 102, 103]);\nconst campaignB = new Set([102, 104]);\nconst shared = [...campaignA].filter(id => campaignB.has(id));\nconsole.log(shared); // [102]`,
        ],
      ],
    ],
  ],
  [
    "Strings",
    [
      [
        "trim() / trimStart() / trimEnd()",
        "Remove surrounding whitespace.",
        `const email = '  user@example.com  '.trim();`,
        [
          "Preserve indentation or trailing spaces selectively",
          `const line = '  total: 42  ';\nconsole.log(line.trimStart()); // 'total: 42  '\nconsole.log(line.trimEnd()); // '  total: 42'\nconsole.log(line.trim()); // 'total: 42'`,
        ],
      ],
      [
        "toLowerCase() / toUpperCase()",
        "Normalize casing for display or basic comparisons.",
        `const input = '  ADMIN '.trim().toLowerCase(); // 'admin'`,
        [
          "Normalize a command and display a country code",
          `const command = 'Save'.toLowerCase();\nconst countryCode = 'ua'.toUpperCase();\nconsole.log(command, countryCode); // 'save', 'UA'`,
        ],
      ],
      [
        "includes()",
        "Check whether a substring exists (case-sensitive).",
        `const filename = 'invoice-2026.pdf';\nconst isInvoice = filename.includes('invoice');`,
        [
          "Search a title without case sensitivity",
          `const title = 'JavaScript Functions Handbook';\nconst query = 'FUNCTIONS';\nconsole.log(title.toLowerCase().includes(query.toLowerCase())); // true`,
        ],
      ],
      [
        "startsWith() / endsWith()",
        "Check prefixes and suffixes.",
        `const file = 'report.csv';\nconst isCsv = file.toLowerCase().endsWith('.csv');`,
        [
          "Identify a local asset path",
          `const path = '/images/banner.webp';\nconsole.log(path.startsWith('/images/')); // true\nconsole.log(path.endsWith('.webp')); // true\n// This checks text, not whether a URL or file is safe.`,
        ],
      ],
      [
        "slice()",
        "Extract a portion of a string.",
        `const card = '1234567812345678';\nconst masked = '**** **** **** ' + card.slice(-4);`,
        [
          "Create a short preview",
          `const message = 'Your order is ready for collection';\nconst preview = message.length > 20 ? message.slice(0, 20) + '…' : message;\nconsole.log(preview); // 'Your order is ready f…'`,
        ],
      ],
      [
        "split()",
        "Split a string into an array.",
        `const csvLine = 'red,green,blue';\nconst colors = csvLine.split(','); // Simple input only, not full CSV parsing`,
        [
          "Parse a list of tags",
          `const input = ' html, css , , javascript ';\nconst tags = input.split(',').map(tag => tag.trim()).filter(Boolean);\nconsole.log(tags); // ['html', 'css', 'javascript']`,
        ],
      ],
      [
        "replace() / replaceAll()",
        "Replace the first match or all matches.",
        `const slug = 'JavaScript Best Practices'.toLowerCase().replaceAll(' ', '-');`,
        [
          "Replace one placeholder or all placeholders",
          `const template = 'Hello, NAME. Your badge says NAME.';\nconsole.log(template.replace('NAME', 'Mila'));\n// 'Hello, Mila. Your badge says NAME.'\nconsole.log(template.replaceAll('NAME', 'Mila'));\n// 'Hello, Mila. Your badge says Mila.'`,
        ],
      ],
      [
        "match() / matchAll()",
        "Extract matches from a regular expression.",
        `const text = 'Order #123 and #456';\nconst ids = [...text.matchAll(/#(\\d+)/g)].map(match => match[1]);`,
        [
          "Extract prices and named fields",
          `const prices = 'Tea $4, coffee $6'.match(/\\$\\d+/g) ?? [];\nconsole.log(prices); // ['$4', '$6']\nconst fields = [...'width=80 height=40'.matchAll(/(\\w+)=(\\d+)/g)];\nconsole.log(fields.map(match => [match[1], Number(match[2])]));\n// [['width', 80], ['height', 40]]`,
        ],
      ],
      [
        "padStart() / padEnd()",
        "Pad strings to a target length.",
        `const invoiceNumber = String(42).padStart(6, '0'); // '000042'`,
        [
          "Align a duration and a receipt label",
          `const minutes = String(4).padStart(2, '0');\nconst seconds = String(7).padStart(2, '0');\nconsole.log(minutes + ':' + seconds); // '04:07'\nconsole.log('Tea'.padEnd(8, '.') + '$4'); // 'Tea.....$4'`,
        ],
      ],
      [
        "substring()",
        "Extract between nonnegative positions.",
        `const trackingCode = 'ORD-84921';\nconst number = trackingCode.substring(4); // '84921'`,
        [
          "Extract a year from an ISO date",
          `const isoDate = '2026-10-15';\nconsole.log(isoDate.substring(0, 4)); // '2026'\nconsole.log(isoDate.substring(4, 0)); // '2026'; reversed positions are swapped`,
        ],
      ],
      [
        "localeCompare()",
        "Compare text using locale-aware ordering.",
        `const names = ['Žana', 'Anna', 'Émile'];\nconst sorted = names.toSorted((a, b) => a.localeCompare(b, 'en'));`,
        [
          "Compare user-facing names ignoring case and accents",
          `const collatorOptions = {sensitivity: 'base'};\nconst sameName = 'Résumé'.localeCompare('resume', 'en', collatorOptions) === 0;\nconsole.log(sameName); // true\n// Compare the sign of localeCompare(), not an assumed exact -1 or 1.`,
        ],
      ],
      [
        "String()",
        "Convert values to text explicitly.",
        `const orderId = 182;\nconst label = 'Order #' + String(orderId);`,
        [
          "Normalize numeric identifiers for comparison",
          `const storedId = '42';\nconst selectedId = 42;\nconsole.log(storedId === String(selectedId)); // true\nconsole.log(String(null)); // 'null'; handle missing values separately`,
        ],
      ],
    ],
  ],
  [
    "Objects",
    [
      [
        "Object.keys()",
        "Get an object’s own enumerable string keys.",
        `const stock = {shirts: 12, hats: 4};\nconst categories = Object.keys(stock);`,
        [
          "Detect an empty settings object",
          `const settings = {};\nconsole.log(Object.keys(settings).length === 0); // true`,
        ],
      ],
      [
        "Object.values()",
        "Get an object’s own enumerable values.",
        `const scores = {html: 90, css: 85, js: 95};\nconst average = Object.values(scores).reduce((a,b) => a+b, 0) / 3;`,
        [
          "Calculate total inventory",
          `const stock = {shirts: 12, hats: 4, shoes: 6};\nconst total = Object.values(stock).reduce((sum, quantity) => sum + quantity, 0);\nconsole.log(total); // 22`,
        ],
      ],
      [
        "Object.entries()",
        "Get key-value pairs for iteration.",
        `const filters = {category: 'books', page: 2};\nconst query = new URLSearchParams(Object.entries(filters)).toString();`,
        [
          "Build readable settings lines",
          `const settings = {theme: 'dark', language: 'en'};\nconst lines = Object.entries(settings).map(([key, value]) => key + ': ' + value);\nconsole.log(lines); // ['theme: dark', 'language: en']`,
        ],
      ],
      [
        "Object.fromEntries()",
        "Create an object from key-value pairs.",
        `const formData = new FormData(document.querySelector('form'));\nconst values = Object.fromEntries(formData); // Repeated keys collapse`,
        [
          "Remove empty filters",
          `const filters = {category: 'books', brand: '', page: '2'};\nconst active = Object.fromEntries(\n  Object.entries(filters).filter(([, value]) => value !== '')\n);\nconsole.log(active); // {category: 'books', page: '2'}`,
        ],
      ],
      [
        "Object.assign()",
        "Copy enumerable properties (shallow copy).",
        `const defaults = {theme: 'light', pageSize: 20};\nconst settings = Object.assign({}, defaults, {theme: 'dark'});`,
        [
          "Apply a partial preference update",
          `const preferences = {theme: 'light', notifications: true};\nObject.assign(preferences, {theme: 'dark'});\nconsole.log(preferences); // {theme: 'dark', notifications: true}\n// The first argument is mutated; nested objects are not deep-cloned.`,
        ],
      ],
      [
        "Object.hasOwn()",
        "Check whether an object owns a property.",
        `const config = {timeout: 0};\nconst hasTimeout = Object.hasOwn(config, 'timeout'); // true`,
        [
          "Distinguish a missing property from an undefined value",
          `const options = {label: undefined};\nconsole.log(Object.hasOwn(options, 'label')); // true\nconsole.log(Object.hasOwn(options, 'toString')); // false; inherited property`,
        ],
      ],
      [
        "Object.freeze()",
        "Prevent direct changes to an object (shallow only).",
        `const constants = Object.freeze({API_VERSION: 'v2'});`,
        [
          "Protect top-level application settings",
          `const settings = Object.freeze({theme: 'dark', flags: {beta: false}});\nconsole.log(Reflect.set(settings, 'theme', 'light')); // false\nsettings.flags.beta = true; // Nested objects are still mutable\nconsole.log(settings.theme, settings.flags.beta); // 'dark', true`,
        ],
      ],
      [
        "structuredClone()",
        "Deep-clone supported data types; not functions or DOM nodes.",
        `const original = {customer: {name: 'Anna'}, dates: [new Date()]};\nconst copy = structuredClone(original);\ncopy.customer.name = 'Max';`,
        [
          "Make an independent editable draft",
          `const saved = {items: [{id: 1, quantity: 2}], updatedAt: new Date('2026-10-15')};\nconst draft = structuredClone(saved);\ndraft.items[0].quantity = 5;\nconsole.log(saved.items[0].quantity); // 2\nconsole.log(draft.updatedAt instanceof Date); // true`,
        ],
      ],
      [
        "Destructuring / spread",
        "Extract properties and make shallow copies.",
        `const user = {id: 1, name: 'Mila', role: 'viewer'};\nconst {name, ...rest} = user;\nconst updated = {...user, role: 'editor'};`,
        [
          "Separate an ID from an editable payload",
          `const product = {id: 42, name: 'Keyboard', price: 80};\nconst {id, ...fields} = product;\nconst payload = {...fields, price: 75};\nconsole.log(id, payload); // 42, {name: 'Keyboard', price: 75}\nconsole.log(product.price); // 80`,
        ],
      ],
      [
        "Optional chaining / nullish coalescing",
        "Read possibly missing properties and use defaults only for null/undefined.",
        `const order = {customer: null, discount: 0};\nconst city = order.customer?.address?.city ?? 'Unknown';\nconst discount = order.discount ?? 10; // 0`,
        [
          "Keep valid false and zero settings",
          `const settings = {sound: false, volume: 0};\nconsole.log(settings.sound ?? true); // false\nconsole.log(settings.volume ?? 50); // 0\nconsole.log(settings.profile?.name ?? 'Guest'); // 'Guest'`,
        ],
      ],
    ],
  ],
  [
    "Numbers & Math",
    [
      [
        "Number() / Number.isNaN()",
        "Convert input and detect invalid numeric results.",
        `const quantity = Number('12');\nconst invalid = Number.isNaN(Number('twelve')); // true`,
        [
          "Validate a numeric quantity input",
          `function readQuantity(input) {\n  if (input.trim() === '') return null; // Number('') would be 0\n  const quantity = Number(input);\n  return Number.isNaN(quantity) ? null : quantity;\n}\nconsole.log(readQuantity('12'), readQuantity('twelve')); // 12, null`,
        ],
      ],
      [
        "Number.isFinite() / Number.isInteger()",
        "Validate finite numbers and integers.",
        `const page = Number('3');\nconst validPage = Number.isInteger(page) && page > 0;`,
        [
          "Reject infinite prices and fractional item counts",
          `const price = 19.99;\nconst quantity = 2.5;\nconsole.log(Number.isFinite(price)); // true\nconsole.log(Number.isFinite(Infinity)); // false\nconsole.log(Number.isInteger(quantity)); // false`,
        ],
      ],
      [
        "parseInt() / parseFloat()",
        "Parse numeric prefixes; specify radix for integers.",
        `const px = parseInt('24px', 10); // 24\nconst rating = parseFloat('4.75 stars'); // 4.75`,
        [
          "Read hexadecimal colors and decimal measurements",
          `console.log(parseInt('ff', 16)); // 255\nconsole.log(parseFloat('12.5rem')); // 12.5\nconsole.log(parseInt('12.5rem', 10)); // 12; parsing stops at the decimal point`,
        ],
      ],
      [
        "toFixed()",
        "Format a number to fixed decimal places; returns a string.",
        `const subtotal = 19.9;\nconst displayed = subtotal.toFixed(2); // '19.90'`,
        [
          "Format a measurement label",
          `const distance = 12.345;\nconst label = distance.toFixed(1) + ' km';\nconsole.log(label); // '12.3 km'\nconsole.log(typeof distance.toFixed(1)); // 'string'`,
        ],
      ],
      [
        "Math.round() / floor() / ceil()",
        "Round to nearest, down, or up.",
        `const items = 23;\nconst pageCount = Math.ceil(items / 10); // 3`,
        [
          "Round a rating and calculate complete packs",
          `console.log(Math.round(4.6)); // 5; nearest whole rating\nconsole.log(Math.floor(23 / 6)); // 3 complete packs\nconsole.log(Math.ceil(23 / 6)); // 4 packs needed for every item`,
        ],
      ],
      [
        "Math.min() / max()",
        "Find bounds or clamp a value.",
        `const requested = 140;\nconst percentage = Math.min(100, Math.max(0, requested)); // 100`,
        [
          "Find a price range",
          `const prices = [15, 42, 9];\nconsole.log(Math.min(...prices)); // 9\nconsole.log(Math.max(...prices)); // 42\n// Handle an empty list separately: its min/max are Infinity/-Infinity.`,
        ],
      ],
      [
        "Math.abs()",
        "Get the absolute difference.",
        `const expected = 100, actual = 92;\nconst deviation = Math.abs(expected - actual); // 8`,
        [
          "Measure distance regardless of direction",
          `const previousPosition = 120;\nconst currentPosition = 75;\nconsole.log(Math.abs(currentPosition - previousPosition)); // 45`,
        ],
      ],
      [
        "Math.random()",
        "Generate non-cryptographic random numbers.",
        `const dice = Math.floor(Math.random() * 6) + 1; // 1–6\n// Do not use Math.random() for security tokens`,
        [
          "Pick a random promotional message",
          `const messages = ['Welcome back!', 'Explore new arrivals', 'See today’s picks'];\nconst index = Math.floor(Math.random() * messages.length);\nconsole.log(messages[index]); // One of the three messages; not security-sensitive`,
        ],
      ],
      [
        "Math.pow() / ** / sqrt()",
        "Calculate powers and square roots.",
        `const area = Math.PI * (5 ** 2);\nconst diagonal = Math.sqrt(3 ** 2 + 4 ** 2); // 5`,
        [
          "Calculate compound growth and a diagonal",
          `const initial = 1000;\nconst annualRate = 0.05;\nconsole.log(Math.pow(1 + annualRate, 2).toFixed(4)); // '1.1025'\nconsole.log((initial * (1 + annualRate) ** 2).toFixed(2)); // '1102.50'\nconsole.log(Math.sqrt(6 ** 2 + 8 ** 2)); // 10`,
        ],
      ],
      [
        "Intl.NumberFormat",
        "Format currencies and numbers for a locale.",
        `const formatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});\nconsole.log(formatter.format(1234.5)); // '$1,234.50'`,
        [
          "Display a percentage",
          `const percent = new Intl.NumberFormat('en-US', {\n  style: 'percent', maximumFractionDigits: 1\n});\nconsole.log(percent.format(0.127)); // '12.7%'`,
        ],
      ],
    ],
  ],
  [
    "Dates & Time",
    [
      [
        "new Date() / Date.now()",
        "Create a date or get current milliseconds since Unix epoch.",
        `const createdAt = new Date();\nconst startTime = Date.now();`,
        [
          "Calculate elapsed milliseconds",
          `const startedAt = Date.now();\nconst recordedAt = new Date(startedAt);\nconsole.log(recordedAt.getTime() === startedAt); // true\nconsole.log(Date.now() - startedAt); // Elapsed milliseconds (varies)`,
        ],
      ],
      [
        "getFullYear() / getMonth() / getDate()",
        "Read local calendar components (month is zero-based).",
        `const date = new Date(2026, 9, 8); // October 8, 2026\nconst monthNumber = date.getMonth() + 1; // 10`,
        [
          "Build a local calendar date label",
          `const date = new Date(2026, 0, 5);\nconst label = [date.getFullYear(),\n  String(date.getMonth() + 1).padStart(2, '0'),\n  String(date.getDate()).padStart(2, '0')].join('-');\nconsole.log(label); // '2026-01-05'`,
        ],
      ],
      [
        "toISOString()",
        "Serialize a Date in UTC ISO 8601 format.",
        `const savedAt = new Date().toISOString();\n// Good for API timestamps; it is UTC, not local time`,
        [
          "Normalize an offset timestamp for an API",
          `const meeting = new Date('2026-10-15T12:30:00+03:00');\nconsole.log(meeting.toISOString()); // '2026-10-15T09:30:00.000Z'\n// Invalid dates throw RangeError when converted to ISO.`,
        ],
      ],
      [
        "Intl.DateTimeFormat",
        "Format dates for people in a locale/time zone.",
        `const formatter = new Intl.DateTimeFormat('en-GB', {dateStyle: 'long', timeZone: 'Europe/Kyiv'});\nconsole.log(formatter.format(new Date('2026-10-08T10:00:00Z')));`,
        [
          "Show a meeting in a chosen time zone",
          `const meeting = new Date('2026-01-15T12:00:00Z');\nconst time = new Intl.DateTimeFormat('en-GB', {\n  hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Kyiv'\n});\nconsole.log(time.format(meeting)); // '14:00'`,
        ],
      ],
      [
        "setDate()",
        "Move calendar dates forward or backward in local time.",
        `const deadline = new Date(2026, 9, 8);\ndeadline.setDate(deadline.getDate() + 7); // October 15`,
        [
          "Calculate a return date across a month boundary",
          `const checkout = new Date(2026, 0, 30);\nconst returnDate = new Date(checkout);\nreturnDate.setDate(returnDate.getDate() + 7);\nconsole.log(returnDate.getMonth() + 1, returnDate.getDate()); // 2, 6\nconsole.log(checkout.getDate()); // 30; original preserved\n// Calendar days can differ from 24 elapsed hours across DST changes.`,
        ],
      ],
      [
        "setTimeout() / clearTimeout()",
        "Schedule or cancel a one-off callback.",
        `const timerId = setTimeout(() => console.log('Autosave reminder'), 2000);\n// clearTimeout(timerId) cancels it`,
        [
          "Cancel a pending reminder",
          `const reminder = setTimeout(() => console.log('Remember to save'), 1000);\nclearTimeout(reminder);\nconsole.log('Reminder cancelled'); // The delayed callback will not run`,
        ],
      ],
      [
        "setInterval() / clearInterval()",
        "Repeat a callback until stopped.",
        `let seconds = 0;\nconst timer = setInterval(() => {\n  seconds++;\n  if (seconds === 5) clearInterval(timer);\n}, 1000);`,
        [
          "Stop an automatic refresh when a view closes",
          `let refreshes = 0;\nconst timer = setInterval(() => {\n  refreshes += 1;\n  console.log('Refresh', refreshes);\n}, 1000);\nfunction closeView() { clearInterval(timer); }\ncloseView(); // Cleanup prevents background refreshes after leaving the view`,
        ],
      ],
    ],
  ],
  [
    "Promises & Async",
    [
      [
        "Promise / async / await",
        "Represent asynchronous work and write readable async workflows.",
        `async function loadProfile(userId) {\n  const response = await fetch(\`/api/users/${"${userId}"}\`);\n  if (!response.ok) throw new Error(\`HTTP ${"${response.status}"}\`);\n  return response.json();\n}`,
        [
          "Wrap a delayed result in a promise",
          `function waitForReceipt() {\n  return new Promise(resolve => {\n    setTimeout(() => resolve({orderId: 42, paid: true}), 20);\n  });\n}\nasync function showReceipt() {\n  const receipt = await waitForReceipt();\n  console.log(receipt.orderId); // 42\n}\nawait showReceipt();`,
        ],
      ],
      [
        "Promise.all()",
        "Run independent tasks concurrently; reject if any rejects.",
        `async function loadDashboard() {\n  const [user, orders] = await Promise.all([\n    fetch('/api/me').then(checkJson),\n    fetch('/api/orders').then(checkJson)\n  ]);\n  return {user, orders};\n}\nasync function checkJson(r) {if (!r.ok) throw Error(\`HTTP ${"${r.status}"}\`); return r.json();}`,
        [
          "Combine independent cached results",
          `const loadUser = () => Promise.resolve({name: 'Mila'});\nconst loadCart = () => Promise.resolve([{sku: 'A', quantity: 2}]);\nconst [user, cart] = await Promise.all([loadUser(), loadCart()]);\nconsole.log(user.name, cart[0].quantity); // 'Mila', 2`,
        ],
      ],
      [
        "Promise.allSettled()",
        "Wait for all operations even if some fail.",
        `const results = await Promise.allSettled([\n  fetch('/api/reviews'), fetch('/api/recommendations')\n]);\nconst successfulResponses = results.filter(r => r.status === 'fulfilled').map(r => r.value);`,
        [
          "Report partial import failures",
          `const results = await Promise.allSettled([\n  Promise.resolve('customers.csv imported'),\n  Promise.reject(new Error('orders.csv is invalid'))\n]);\nfor (const result of results) {\n  console.log(result.status === 'fulfilled' ? result.value : result.reason.message);\n}\n// 'customers.csv imported'\n// 'orders.csv is invalid'`,
        ],
      ],
      [
        "Promise.race()",
        "Settle when the first input settles.",
        `const delay = ms => new Promise(resolve => setTimeout(resolve, ms));\nconst result = await Promise.race([fetch('/api/status'), delay(3000).then(() => 'timeout')]);\n// This does NOT cancel the losing fetch`,
        [
          "Choose the first available response",
          `let timer;\ntry {\n  const cached = Promise.resolve('Cached product');\n  const delayed = new Promise(resolve => {\n    timer = setTimeout(() => resolve('Refreshed product'), 1000);\n  });\n  console.log(await Promise.race([cached, delayed])); // 'Cached product'\n} finally {\n  clearTimeout(timer); // race() itself does not cancel other work\n}`,
        ],
      ],
      [
        "Promise.any()",
        "Use the first fulfilled result; reject if all reject.",
        `const fastestMirror = await Promise.any([\n  fetch('/mirror-a/data'), fetch('/mirror-b/data')\n]);\n// Check fastestMirror.ok before processing`,
        [
          "Fall back to an available source",
          `const product = await Promise.any([\n  Promise.reject(new Error('Primary source unavailable')),\n  Promise.resolve({name: 'Keyboard', source: 'backup'})\n]);\nconsole.log(product.source); // 'backup'`,
        ],
      ],
      [
        "try / catch / finally",
        "Handle async failures and cleanup.",
        `try {\n  const response = await fetch('/api/save', {method: 'POST'});\n  if (!response.ok) throw Error('Save failed');\n} catch (error) {\n  console.error('Could not save:', error);\n} finally {\n  console.log('Request finished');\n}`,
        [
          "Reset a loading state after a failure",
          `let loading = true;\ntry {\n  await Promise.reject(new Error('Offline'));\n} catch (error) {\n  console.log(error.message); // 'Offline'\n} finally {\n  loading = false;\n}\nconsole.log(loading); // false`,
        ],
      ],
      [
        "AbortController",
        "Cancel fetch requests and avoid stale results.",
        `const controller = new AbortController();\nconst request = fetch('/api/search?q=keyboard', {signal: controller.signal});\ncontroller.abort();\ntry { await request; } catch (e) { if (e.name !== 'AbortError') throw e; }`,
        [
          "Clean up a browser event listener",
          `const button = document.createElement('button');\nconst controller = new AbortController();\nlet clicks = 0;\nbutton.addEventListener('click', () => { clicks++; }, {signal: controller.signal});\nbutton.click();\ncontroller.abort(); // Removes listeners registered with this signal\nbutton.click();\nconsole.log(clicks); // 1`,
        ],
      ],
      [
        "fetch()",
        "Send HTTP requests using the browser Fetch API.",
        `async function createOrder(items) {\n  const response = await fetch('/api/orders', {\n    method: 'POST', headers: {'Content-Type': 'application/json'},\n    body: JSON.stringify({items})\n  });\n  if (!response.ok) throw new Error('Order failed');\n  return response.json();\n}`,
        [
          "Read a response with an HTTP status check",
          `async function readProduct(url) {\n  const response = await fetch(url);\n  if (!response.ok) throw new Error('HTTP ' + response.status);\n  return response.json();\n}\n// A local data URL makes this example runnable without an API server.\nconst url = 'data:application/json,' + encodeURIComponent('{"name":"Keyboard"}');\nconst product = await readProduct(url);\nconsole.log(product.name); // 'Keyboard'`,
        ],
      ],
    ],
  ],
  [
    "JSON & Collections",
    [
      [
        "JSON.stringify() / JSON.parse()",
        "Serialize data for storage or transport; JSON drops unsupported values.",
        `const preferences = {theme: 'dark', compact: true};\nlocalStorage.setItem('preferences', JSON.stringify(preferences));\nconst saved = JSON.parse(localStorage.getItem('preferences') ?? '{}');`,
        [
          "Recover from malformed saved JSON",
          `function readPreferences(raw) {\n  try { return JSON.parse(raw); }\n  catch { return {theme: 'light'}; }\n}\nconsole.log(readPreferences('{broken').theme); // 'light'\nconsole.log(JSON.stringify({theme: 'dark'}, null, 2)); // Indented JSON text`,
        ],
      ],
      [
        "Map",
        "Store keyed data with keys of any type.",
        `const visits = new Map();\nvisits.set('home', 3);\nvisits.set('products', 5);\nconsole.log(visits.get('home')); // 3`,
        [
          "Count repeated categories",
          `const counts = new Map();\nfor (const category of ['books', 'games', 'books']) {\n  counts.set(category, (counts.get(category) ?? 0) + 1);\n}\nconsole.log(counts.get('books')); // 2\nconsole.log(counts.size); // 2 categories`,
        ],
      ],
      [
        "Set.add() / has() / delete()",
        "Manage unique membership efficiently.",
        `const selectedIds = new Set([12, 18]);\nselectedIds.add(24);\nif (selectedIds.has(18)) selectedIds.delete(18);`,
        [
          "Toggle a saved product",
          `const saved = new Set([42]);\nfunction toggleSaved(id) {\n  if (saved.has(id)) saved.delete(id);\n  else saved.add(id);\n}\ntoggleSaved(42);\ntoggleSaved(7);\nconsole.log([...saved]); // [7]`,
        ],
      ],
      [
        "URL / URLSearchParams",
        "Safely construct and read URLs and query parameters.",
        `const url = new URL('https://example.com/products');\nurl.searchParams.set('q', 'wireless keyboard');\nurl.searchParams.set('page', '2');\nconsole.log(url.toString());`,
        [
          "Read repeated filters and update pagination",
          `const url = new URL('https://example.com/shop?tag=js&tag=css&page=1');\nconsole.log(url.searchParams.getAll('tag')); // ['js', 'css']\nconst filters = new URLSearchParams(url.search);\nfilters.set('page', '2');\nurl.search = filters.toString();\nconsole.log(url.searchParams.get('page')); // '2'`,
        ],
      ],
      [
        "encodeURIComponent() / decodeURIComponent()",
        "Encode/decode a URL component, not a whole URL.",
        `const search = 'C++ & JavaScript';\nconst url = '/search?q=' + encodeURIComponent(search);`,
        [
          "Round-trip a filename in a URL component",
          `const filename = 'report & notes.pdf';\nconst encoded = encodeURIComponent(filename);\nconsole.log(encoded); // 'report%20%26%20notes.pdf'\nconsole.log(decodeURIComponent(encoded)); // 'report & notes.pdf'\n// Malformed percent escapes can throw URIError when decoding.`,
        ],
      ],
      [
        "RegExp.test()",
        "Check whether text matches a pattern.",
        `const sku = 'ABC-1234';\nconst valid = /^[A-Z]{3}-\\d{4}$/.test(sku); // true`,
        [
          "Check a hexadecimal color",
          `const hexColor = /^#[0-9a-f]{6}$/i;\nconsole.log(hexColor.test('#2563eb')); // true\nconsole.log(hexColor.test('blue')); // false\n// Avoid the g flag for repeated validation: it changes the regex lastIndex.`,
        ],
      ],
      [
        "RegExp.exec()",
        "Retrieve match groups and positions.",
        `const match = /order-(\\d+)/.exec('order-4821');\nconst orderId = match?.[1]; // '4821'`,
        [
          "Read dimensions from a label",
          `const match = /^(\\d+)x(\\d+)$/.exec('1920x1080');\nif (match) {\n  const width = Number(match[1]);\n  const height = Number(match[2]);\n  console.log(width * height); // 2073600\n}\nconsole.log(/^(\\d+)x(\\d+)$/.exec('unknown')); // null`,
        ],
      ],
    ],
  ],
  [
    "DOM & Browser",
    [
      [
        "querySelector() / querySelectorAll()",
        "Find one element or a static list of elements.",
        `const form = document.querySelector('#checkout-form');\nconst inputs = [...form.querySelectorAll('input[required]')];`,
        [
          "Find checked options within a form",
          `const form = document.createElement('form');\nform.innerHTML = '<input type=checkbox name=topic value=js checked>' +\n  '<input type=checkbox name=topic value=css>'; // Fixed example markup\nconst checked = form.querySelectorAll('input:checked');\nconsole.log([...checked].map(input => input.value)); // ['js']\nconsole.log(form.querySelector('[name=missing]')); // null`,
        ],
      ],
      [
        "addEventListener() / removeEventListener()",
        "Subscribe to and unsubscribe from browser events.",
        `function onResize() { console.log(window.innerWidth); }\nwindow.addEventListener('resize', onResize);\n// Later: window.removeEventListener('resize', onResize);`,
        [
          "Remove a subscription when it is no longer needed",
          `const button = document.createElement('button');\nlet clicks = 0;\nfunction countClick() { clicks++; }\nbutton.addEventListener('click', countClick);\nbutton.click();\nbutton.removeEventListener('click', countClick);\nbutton.click();\nconsole.log(clicks); // 1; removal needs the same function reference`,
        ],
      ],
      [
        "classList.add() / remove() / toggle()",
        "Manage CSS classes without rewriting class strings.",
        `const menu = document.querySelector('.menu');\ndocument.querySelector('.menu-button').addEventListener('click', () => {\n  menu.classList.toggle('is-open');\n});`,
        [
          "Update validation classes",
          `const field = document.createElement('input');\nfield.classList.add('field', 'is-invalid');\nfield.classList.remove('is-invalid');\nfield.classList.toggle('is-valid', field.value.length > 0);\nconsole.log(field.className); // 'field'`,
        ],
      ],
      [
        "closest() / matches()",
        "Match an element or find a matching ancestor.",
        `document.addEventListener('click', event => {\n  const button = event.target.closest('[data-action="delete"]');\n  if (!button) return;\n  console.log('Delete item:', button.dataset.id);\n});`,
        [
          "Locate a product card from its button",
          `const card = document.createElement('article');\ncard.className = 'product';\nconst button = document.createElement('button');\nbutton.className = 'buy';\ncard.append(button);\nconsole.log(button.matches('button.buy')); // true\nconsole.log(button.closest('.product') === card); // true`,
        ],
      ],
      [
        "createElement() / append() / replaceChildren()",
        "Create safe text-based DOM content.",
        `const list = document.querySelector('#results');\nconst li = document.createElement('li');\nli.textContent = 'New product'; // Safe for untrusted text\nlist.replaceChildren(li);`,
        [
          "Replace a loading message with safe list items",
          `const list = document.createElement('ul');\nconst loading = document.createElement('li');\nloading.textContent = 'Loading…';\nlist.append(loading);\nconst items = ['Keyboard', 'Mouse'].map(name => {\n  const item = document.createElement('li');\n  item.textContent = name;\n  return item;\n});\nlist.replaceChildren(...items);\nconsole.log(list.children.length); // 2`,
        ],
      ],
      [
        "getAttribute() / setAttribute() / dataset",
        "Read and update element attributes and data-* values.",
        `const button = document.querySelector('[data-product-id]');\nconst productId = button.dataset.productId;\nbutton.setAttribute('aria-pressed', 'true');`,
        [
          "Keep a disclosure button state in sync",
          `const button = document.createElement('button');\nbutton.dataset.panelId = 'shipping-details';\nbutton.setAttribute('aria-expanded', 'false');\nconst expanded = button.getAttribute('aria-expanded') === 'true';\nbutton.setAttribute('aria-expanded', String(!expanded));\nconsole.log(button.dataset.panelId); // 'shipping-details'\nconsole.log(button.getAttribute('aria-expanded')); // 'true'`,
        ],
      ],
      [
        "preventDefault()",
        "Prevent an event’s default browser behavior.",
        `document.querySelector('form').addEventListener('submit', event => {\n  event.preventDefault();\n  const data = new FormData(event.currentTarget);\n  console.log(data.get('email'));\n});`,
        [
          "Cancel a custom form submission",
          `const form = document.createElement('form');\nform.addEventListener('submit', event => {\n  event.preventDefault();\n  console.log(event.defaultPrevented); // true\n});\nconst event = new Event('submit', {cancelable: true});\nconsole.log(form.dispatchEvent(event)); // false; default was prevented`,
        ],
      ],
      [
        "FormData",
        "Collect form fields for submission.",
        `const form = document.querySelector('#profile-form');\nconst formData = new FormData(form);\nawait fetch('/api/profile', {method: 'POST', body: formData});\n// Do not manually set Content-Type for multipart FormData`,
        [
          "Collect repeated form values",
          `const data = new FormData();\ndata.append('tag', 'javascript');\ndata.append('tag', 'css');\ndata.set('title', 'Frontend notes');\nconsole.log(data.getAll('tag')); // ['javascript', 'css']\nconsole.log(data.get('title')); // 'Frontend notes'`,
        ],
      ],
      [
        "localStorage.getItem() / setItem() / removeItem()",
        "Persist small strings across browser sessions.",
        `localStorage.setItem('theme', 'dark');\nconst theme = localStorage.getItem('theme') ?? 'light';\nlocalStorage.removeItem('theme');\n// Do not store secrets or access tokens here`,
        [
          "Persist and reset a handbook preference",
          `const key = 'handbook-example:compact';\ntry {\n  localStorage.setItem(key, 'true');\n  console.log(localStorage.getItem(key) === 'true'); // true\n  localStorage.removeItem(key);\n  console.log(localStorage.getItem(key)); // null\n} catch (error) {\n  console.log('Storage is unavailable:', error.name);\n}`,
        ],
      ],
      [
        "requestAnimationFrame()",
        "Run a visual update before the next repaint.",
        `const progress = document.querySelector('.progress');\nrequestAnimationFrame(() => { progress.style.width = '75%'; });`,
        [
          "Animate a progress bar and provide cleanup",
          `const bar = document.createElement('div');\nbar.style.cssText = 'height:8px;background:royalblue;width:0';\ndocument.body.append(bar);\nconst started = performance.now();\nlet frame;\nfunction tick(now) {\n  const progress = Math.min((now - started) / 1000, 1);\n  bar.style.width = progress * 100 + '%';\n  if (progress < 1) frame = requestAnimationFrame(tick);\n}\nframe = requestAnimationFrame(tick);\n// On view teardown: cancelAnimationFrame(frame); bar.remove();`,
        ],
      ],
      [
        "IntersectionObserver",
        "Observe when elements enter or leave a viewport.",
        `const observer = new IntersectionObserver(entries => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      entry.target.classList.add('visible');\n      observer.unobserve(entry.target);\n    }\n  });\n});\ndocument.querySelectorAll('.reveal').forEach(el => observer.observe(el));`,
        [
          "Disconnect observation when a view is removed",
          `const sentinel = document.createElement('div');\nsentinel.textContent = 'End of results';\ndocument.body.append(sentinel);\nconst observer = new IntersectionObserver(entries => {\n  if (entries.some(entry => entry.isIntersecting)) {\n    console.log('Load the next results page');\n  }\n});\nobserver.observe(sentinel);\n// When leaving this view:\nobserver.disconnect();\nsentinel.remove();`,
        ],
      ],
      [
        "debounce() (utility)",
        "Delay work until rapid calls stop; custom helper, not built-in.",
        `function debounce(fn, delay = 300) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}\nconst search = debounce(query => console.log('Search:', query));`,
        [
          "Debounce a search input",
          `function debounce(fn, delay = 300) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}\nconst input = document.createElement('input');\ninput.placeholder = 'Search products';\nconst search = debounce(query => console.log('Search:', query));\ninput.addEventListener('input', event => search(event.target.value));\ndocument.body.append(input); // Typing quickly runs only the latest search`,
        ],
      ],
      [
        "throttle() (utility)",
        "Limit how frequently a handler runs; custom helper.",
        `function throttle(fn, delay = 200) {\n  let last = 0;\n  return (...args) => {\n    const now = Date.now();\n    if (now - last >= delay) { last = now; fn(...args); }\n  };\n}\nwindow.addEventListener('scroll', throttle(() => console.log(scrollY)));`,
        [
          "Throttle pointer coordinates while dragging",
          `function throttle(fn, delay = 200) {\n  let last = -Infinity;\n  return (...args) => {\n    const now = performance.now();\n    if (now - last >= delay) {\n      last = now;\n      fn(...args);\n    }\n  };\n}\nconst area = document.createElement('div');\narea.textContent = 'Move the pointer here';\nconst track = throttle((x, y) => console.log('Pointer:', x, y));\narea.addEventListener('pointermove', event => track(event.clientX, event.clientY));\ndocument.body.append(area); // Leading calls only; no trailing callback`,
        ],
      ],
    ],
  ],
  [
    "Function Patterns",
    [
      [
        "Function declaration / expression",
        "Declare reusable behavior; declarations are hoisted.",
        `function calculateTax(price, rate = 0.2) { return price * rate; }\nconst calculateTotal = function(price, tax) { return price + tax; };`,
        [
          "Calculate a line total with two function styles",
          `function lineTotal(price, quantity) { return price * quantity; }\nconst formatTotal = function(total) { return '$' + total.toFixed(2); };\nconsole.log(formatTotal(lineTotal(12.5, 2))); // '$25.00'`,
        ],
      ],
      [
        "Arrow functions",
        "Write concise callbacks; arrows capture lexical this.",
        `const products = [{price: 10}, {price: 20}];\nconst pricesWithTax = products.map(p => p.price * 1.2);`,
        [
          "Capture an instance in a callback",
          `const cart = {\n  taxRate: 0.2,\n  totals(prices) {\n    return prices.map(price => price * (1 + this.taxRate));\n  }\n};\nconsole.log(cart.totals([10, 20])); // [12, 24]\n// The arrow callback uses the this value of totals().`,
        ],
      ],
      [
        "Rest parameters / spread arguments",
        "Accept any number of inputs or expand an iterable.",
        `function sum(...numbers) { return numbers.reduce((a, b) => a + b, 0); }\nconst values = [10, 20, 30];\nconsole.log(sum(...values)); // 60`,
        [
          "Combine several groups of recipients",
          `function recipients(...groups) {\n  return [...new Set(groups.flat())];\n}\nconst teams = [['a@example.com'], ['a@example.com', 'b@example.com']];\nconsole.log(recipients(...teams)); // ['a@example.com', 'b@example.com']`,
        ],
      ],
      [
        "Default parameters",
        "Provide fallback values for omitted/undefined arguments.",
        `function greet(name = 'Guest') { return \`Hello, ${"${name}"}!\`; }\nconsole.log(greet()); // 'Hello, Guest!'`,
        [
          "Use defaults without overwriting valid zero values",
          `function deliveryFee(subtotal, threshold = 50, fee = 5) {\n  return subtotal >= threshold ? 0 : fee;\n}\nconsole.log(deliveryFee(20)); // 5\nconsole.log(deliveryFee(20, undefined, 0)); // 0\n// Defaults apply to undefined, not null, false, or 0.`,
        ],
      ],
      [
        "Closures",
        "Keep private state between calls.",
        `function createCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst nextId = createCounter();\nnextId(); // 1; nextId(); // 2`,
        [
          "Keep independent shopping cart counters",
          `function createCartCounter() {\n  let count = 0;\n  return {add: () => ++count, read: () => count};\n}\nconst cartA = createCartCounter();\nconst cartB = createCartCounter();\ncartA.add();\ncartA.add();\nconsole.log(cartA.read(), cartB.read()); // 2, 0`,
        ],
      ],
      [
        "Higher-order functions",
        "Pass functions to customize behavior.",
        `function withLogging(fn) {\n  return (...args) => {\n    console.log('Calling with', args);\n    return fn(...args);\n  };\n}\nconst add = withLogging((a, b) => a + b);`,
        [
          "Create reusable product filters",
          `function pricedBelow(limit) {\n  return product => product.price < limit;\n}\nconst products = [{name: 'Pen', price: 2}, {name: 'Desk', price: 150}];\nconsole.log(products.filter(pricedBelow(10)).map(product => product.name));\n// ['Pen']`,
        ],
      ],
      [
        "call() / apply() / bind()",
        "Control this for normal functions; bind returns a new function.",
        `const user = {name: 'Anna'};\nfunction sayHello(prefix) { return prefix + this.name; }\nconst greeting = sayHello.call(user, 'Hi ');\nconst boundGreeting = sayHello.bind(user, 'Hello ');`,
        [
          "Reuse a formatter with explicit context",
          `function formatPrice(amount, decimals) {\n  return this.currency + amount.toFixed(decimals);\n}\nconst context = {currency: '$'};\nconsole.log(formatPrice.call(context, 12.5, 2)); // '$12.50'\nconsole.log(formatPrice.apply(context, [12.5, 0])); // '$13'\nconst usd = formatPrice.bind(context);\nconsole.log(usd(8, 2)); // '$8.00'`,
        ],
      ],
      [
        "Pure functions / immutability",
        "Return predictable outputs without mutating inputs.",
        `function addItem(cart, item) { return [...cart, item]; }\nconst cart = [{id: 1}];\nconst updated = addItem(cart, {id: 2}); // cart unchanged`,
        [
          "Update one cart item without changing the original",
          `function setQuantity(cart, id, quantity) {\n  return cart.map(item => item.id === id ? {...item, quantity} : item);\n}\nconst original = [{id: 1, quantity: 2}];\nconst updated = setQuantity(original, 1, 5);\nconsole.log(original[0].quantity, updated[0].quantity); // 2, 5`,
        ],
      ],
      [
        "Memoization (utility)",
        "Cache results of expensive pure computations.",
        `function memoize(fn) {\n  const cache = new Map();\n  return key => {\n    if (cache.has(key)) return cache.get(key);\n    const result = fn(key);\n    cache.set(key, result);\n    return result;\n  };\n}\nconst square = memoize(n => n * n); // Single primitive key`,
        [
          "Cache a derived product label",
          `function memoize(fn) {\n  const cache = new Map();\n  return key => {\n    if (!cache.has(key)) cache.set(key, fn(key));\n    return cache.get(key);\n  };\n}\nlet calls = 0;\nconst label = memoize(id => { calls++; return 'Product #' + id; });\nconsole.log(label(42), label(42)); // 'Product #42', 'Product #42'\nconsole.log(calls); // 1; use bounded caches for growing input sets`,
        ],
      ],
    ],
  ],
];
const nav = document.querySelector("#nav");
const content = document.querySelector("#content");
const search = document.querySelector("#search");
const clearSearch = document.querySelector("#clear-search");
function render(query = "") {
  const q = query.trim().toLowerCase();
  clearSearch.hidden = query.length === 0;
  content.replaceChildren();
  nav.replaceChildren();
  let count = 0;
  for (const [topic, entries] of topics) {
    const matched = entries.filter(([name, desc, code, [title, extraCode]]) =>
      [topic, name, desc, code, title, extraCode].join(" ").toLowerCase().includes(q),
    );
    if (!matched.length) continue;
    const id = topic.toLowerCase().replace(/[^a-z]+/g, "-");
    const link = document.createElement("a");
    link.href = "#" + id;
    link.textContent = topic + " (" + matched.length + ")";
    nav.append(link);
    const section = document.createElement("section");
    section.id = id;
    const heading = document.createElement("h2");
    heading.textContent = topic;
    section.append(heading);
    for (const [name, desc, code, [title, extraCode]] of matched) {
      count++;
      const article = document.createElement("article");
      article.className = "entry";
      const h = document.createElement("h3");
      h.textContent = name;
      const p = document.createElement("p");
      p.textContent = desc;
      article.append(h, p);
      const examples = [["Example 1", code], ["Example 2: " + title, extraCode]];
      for (const [label, exampleCode] of examples) {
        const example = document.createElement("div");
        example.className = "example";
        const exampleHeading = document.createElement("h4");
        exampleHeading.textContent = label;
        const pre = document.createElement("pre");
        const codeEl = document.createElement("code");
        codeEl.textContent = exampleCode;
        pre.append(codeEl);
        const copy = document.createElement("button");
        copy.type = "button";
        copy.textContent = "Copy example";
        copy.setAttribute("aria-label", "Copy " + label + " for " + name);
        copy.addEventListener("click", async () => {
          try {
            await navigator.clipboard.writeText(exampleCode);
            copy.textContent = "Copied!";
            setTimeout(() => (copy.textContent = "Copy example"), 1500);
          } catch {
            copy.textContent = "Copy unavailable";
          }
        });
        example.append(exampleHeading, pre, copy);
        article.append(example);
      }
      section.append(article);
    }
    content.append(section);
  }
  document.querySelector("#count").textContent = count + " entries";
  if (!count) {
    const p = document.createElement("p");
    p.textContent = "No matching functions. Try another search.";
    content.append(p);
  }
  window.HandbookHighlight?.highlight(content);
}
search.addEventListener("input", () => render(search.value));
clearSearch.addEventListener("click", () => {
  search.value = "";
  render();
  search.focus();
});
render(search.value);
