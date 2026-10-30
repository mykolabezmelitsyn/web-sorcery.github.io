/* Add only String Methods categories supplied by the user, in image order. */
const handbook = {
  categories: [
    {
      name: "Case Manipulation",
      id: "case-manipulation",
      intro:
        "Default upper/lowercase → locale-specific uppercase → custom title, sentence, camel, Pascal, snake, and kebab casing, following all three images. Run each snippet independently in a current browser or Node.js with Turkish and German locale data. String conversions leave the original text unchanged; custom helper contracts and Unicode limits are stated rather than treated as universal naming rules.",
      methods: [
        {
          name: "toUpperCase() — default uppercase conversion",
          explanation:
            "Returns the string converted to uppercase with default Unicode case mappings.",
          note: "Strings are immutable. Conversion may expand characters, so output length and positions need not match the input; default casing is not Turkish-specific.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase",
          examples: [
            {
              label: "Convert without changing the original",
              language: "javascript",
              code: 'const text = "Hello World";\nconst upper = text.toUpperCase();\nconsole.log(upper, text);',
            },
            {
              label: "Observe character expansion and empty input",
              language: "javascript",
              code: 'const text = "straße";\nconsole.log(\n  text.toUpperCase(),\n  text.length,\n  text.toUpperCase().length,\n  "".toUpperCase(),\n);',
            },
          ],
        },
        {
          name: "toLowerCase() — default lowercase conversion",
          explanation:
            "Returns the string converted to lowercase with default Unicode case mappings.",
          note: "Casing is not general normalization or locale-aware equality. Some mappings add code points, and converting case can lose information.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase",
          examples: [
            {
              label: "Lowercase mixed text without mutation",
              language: "javascript",
              code: 'const text = "Hello World";\nconsole.log(text.toLowerCase(), text);',
            },
            {
              label: "Observe a multi-code-point mapping",
              language: "javascript",
              code: 'const lower = "İ".toLowerCase();\nconsole.log(lower === "i\\u0307", lower.length, "".toLowerCase());',
            },
          ],
        },
        {
          name: "toLocaleUpperCase() — locale-specific uppercase",
          explanation:
            "Returns uppercase text using the requested locale’s case mapping.",
          note: "Turkish i maps to dotted uppercase İ. German ß expands to SS in both demonstrated mappings; locale casing is not generally reversible or length-preserving.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleUpperCase",
          examples: [
            {
              label: "Compare default and Turkish casing",
              language: "javascript",
              code: 'const text = "istanbul";\nconsole.log(text.toUpperCase(), text.toLocaleUpperCase("tr-TR"), text);',
            },
            {
              label: "Compare German and explicit English mappings",
              language: "javascript",
              code: 'console.log("straße".toUpperCase(), "straße".toLocaleUpperCase("de-DE"));\nconsole.log(\n  "istanbul".toLocaleUpperCase("en-US"),\n  "".toLocaleUpperCase("tr-TR"),\n);',
            },
          ],
        },
        {
          name: "toTitleCase() — custom token capitalization",
          explanation:
            "Capitalize the first character and lowercase the remainder of each token selected by the supplied regex.",
          note: "Not a built-in method or linguistic title-casing algorithm. The word start uses ASCII-style word characters and a token extends through non-whitespace, so punctuation and international text need separate rules.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Format the supplied and mixed-case words",
              language: "javascript",
              code: 'const toTitleCase = (text) =>\n  text.replace(\n    /\\w\\S*/g,\n    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),\n  );\nconsole.log(toTitleCase("hello world"), toTitleCase("hELLO wORLD"));',
            },
            {
              label: "Keep spacing and show a hyphenated token",
              language: "javascript",
              code: 'const toTitleCase = (text) =>\n  text.replace(\n    /\\w\\S*/g,\n    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),\n  );\nconsole.log(\n  toTitleCase("  hello   world "),\n  toTitleCase("hello-world"),\n  toTitleCase(""),\n);',
            },
          ],
        },
        {
          name: "toSentenceCase() — custom first-character casing",
          explanation:
            "Uppercase the first string position and lowercase the remainder.",
          note: "Not sentence detection: later sentences, names, and acronyms are lowercased. Leading whitespace is retained, and charAt operates on a UTF-16 code unit.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt",
          examples: [
            {
              label: "Convert the supplied uppercase label",
              language: "javascript",
              code: 'const toSentenceCase = (text) =>\n  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();\nconsole.log(toSentenceCase("HELLO WORLD"), toSentenceCase("hello NASA"));',
            },
            {
              label: "Handle empty and whitespace-prefixed input",
              language: "javascript",
              code: 'const toSentenceCase = (text) =>\n  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();\nconsole.log(toSentenceCase(""), toSentenceCase(" HELLO WORLD"));',
            },
          ],
        },
        {
          name: "toCamelCase() — custom separator conversion",
          explanation:
            "Remove a hyphen, underscore, or whitespace character before another character, uppercase that character, then lowercase the initial position.",
          note: "This preserves most existing internal casing and consumes one separator plus one following character per match. Repeated or trailing separators are not fully normalized, and this is not a general Unicode identifier tokenizer.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Convert the supplied hyphen and underscore forms",
              language: "javascript",
              code: 'const toCamelCase = (text) =>\n  text\n    .replace(/[-_\\s](.)/g, (_, char) => char.toUpperCase())\n    .replace(/^(.)/, (_, char) => char.toLowerCase());\nconsole.log(\n  toCamelCase("hello-world"),\n  toCamelCase("hello_world"),\n  toCamelCase("hello world"),\n);',
            },
            {
              label: "Expose repeated separators and retained internal case",
              language: "javascript",
              code: 'const toCamelCase = (text) =>\n  text\n    .replace(/[-_\\s](.)/g, (_, char) => char.toUpperCase())\n    .replace(/^(.)/, (_, char) => char.toLowerCase());\nconsole.log(\n  toCamelCase("hello--world"),\n  toCamelCase("HELLO-WORLD"),\n  toCamelCase(""),\n);',
            },
          ],
        },
        {
          name: "toPascalCase() — custom separator conversion",
          explanation:
            "Remove the demonstrated separators, uppercase the following characters, and uppercase the initial position.",
          note: "Like the camel-case helper, it preserves remaining internal casing and does not fully normalize repeated or trailing separators.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Convert the supplied simple forms",
              language: "javascript",
              code: 'const toPascalCase = (text) =>\n  text\n    .replace(/[-_\\s](.)/g, (_, char) => char.toUpperCase())\n    .replace(/^(.)/, (_, char) => char.toUpperCase());\nconsole.log(\n  toPascalCase("hello-world"),\n  toPascalCase("hello_world"),\n  toPascalCase("hello world"),\n);',
            },
            {
              label: "Handle empty input and show separator limits",
              language: "javascript",
              code: 'const toPascalCase = (text) =>\n  text\n    .replace(/[-_\\s](.)/g, (_, char) => char.toUpperCase())\n    .replace(/^(.)/, (_, char) => char.toUpperCase());\nconsole.log(\n  toPascalCase(""),\n  toPascalCase("hello--world"),\n  toPascalCase("hELLO-world"),\n);',
            },
          ],
        },
        {
          name: "toSnakeCase() — custom uppercase splitting",
          explanation:
            "Insert an underscore before each ASCII uppercase letter, lowercase that letter, then remove an initial inserted underscore.",
          note: "Acronyms split into separate letters, existing separators remain, and only ASCII uppercase letters are targeted. The final replacement also removes one pre-existing leading underscore.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Convert camelCase and initial uppercase input",
              language: "javascript",
              code: 'const toSnakeCase = (text) =>\n  text\n    .replace(/[A-Z]/g, (letter) => "_" + letter.toLowerCase())\n    .replace(/^_/, "");\nconsole.log(toSnakeCase("helloWorld"), toSnakeCase("HelloWorld"));',
            },
            {
              label: "Expose acronym and existing-separator behavior",
              language: "javascript",
              code: 'const toSnakeCase = (text) =>\n  text\n    .replace(/[A-Z]/g, (letter) => "_" + letter.toLowerCase())\n    .replace(/^_/, "");\nconsole.log(\n  toSnakeCase("HTTPServer"),\n  toSnakeCase("_helloWorld"),\n  toSnakeCase(""),\n);',
            },
          ],
        },
        {
          name: "toKebabCase() — custom uppercase splitting",
          explanation:
            "Insert a hyphen before each ASCII uppercase letter and remove one leading hyphen.",
          note: "Acronyms split into individual letters and existing separators are not normalized; one pre-existing leading hyphen is also removed.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Convert the supplied camelCase form",
              language: "javascript",
              code: 'const toKebabCase = (text) =>\n  text\n    .replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase())\n    .replace(/^-/, "");\nconsole.log(toKebabCase("helloWorld"), toKebabCase("HelloWorld"));',
            },
            {
              label: "Expose acronyms and existing leading punctuation",
              language: "javascript",
              code: 'const toKebabCase = (text) =>\n  text\n    .replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase())\n    .replace(/^-/, "");\nconsole.log(\n  toKebabCase("HTTPServer"),\n  toKebabCase("-helloWorld"),\n  toKebabCase(""),\n);',
            },
          ],
        },
      ],
    },
    {
      name: "Searching & Testing",
      id: "searching-testing",
      intro:
        "Finding substrings → accessing characters and encoding values → start/end checks and practical conditions, following all eight images. Run each snippet independently in a current browser or Node.js. Positions and string length use UTF-16 units; iterator counts use code points, and neither automatically counts visible grapheme clusters.",
      methods: [
        {
          name: "indexOf() — first literal occurrence",
          explanation:
            "Returns the first matching substring position at or after the optional starting index, or -1 when absent.",
          note: "Case-sensitive and measured in UTF-16 code units. A result of zero is a successful match, so test against -1 rather than using truthiness.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf",
          examples: [
            {
              label: "Find the supplied substrings",
              language: "javascript",
              code: 'const text = "Hello World, Hello Universe";\nconsole.log(\n  text.indexOf("Hello"),\n  text.indexOf("World"),\n  text.indexOf("hello"),\n);',
            },
            {
              label: "Start later and check existence correctly",
              language: "javascript",
              code: 'const text = "Hello World, Hello Universe";\nconsole.log(text.indexOf("Hello", 1), text.indexOf("o", 5));\nconsole.log(text.indexOf("Hello") !== -1, text.indexOf("World") !== -1);',
            },
          ],
        },
        {
          name: "lastIndexOf() — last literal occurrence",
          explanation:
            "Returns the last occurrence whose starting position is at or before the optional position.",
          note: "The position limits match starts and is not an exclusive end bound. Negative positions clamp to zero; missing substrings return -1.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf",
          examples: [
            {
              label: "Read the final supplied occurrences",
              language: "javascript",
              code: 'const text = "Hello World, Hello Universe";\nconsole.log(\n  text.lastIndexOf("Hello"),\n  text.lastIndexOf("o"),\n  text.lastIndexOf("o", 15),\n);',
            },
            {
              label: "Check bounds and empty search strings",
              language: "javascript",
              code: 'console.log(\n  "abc".lastIndexOf("a", -1),\n  "abc".lastIndexOf("z"),\n  "abc".lastIndexOf("", 99),\n  "abc".indexOf("", 99),\n);',
            },
          ],
        },
        {
          name: "includes() — literal membership",
          explanation:
            "Returns whether the search string occurs at or after the optional position.",
          note: "Case-sensitive; the position is a starting offset, not a length. Empty strings are included even when the supplied position exceeds length.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes",
          examples: [
            {
              label: "Check membership and the starting position",
              language: "javascript",
              code: 'const text = "Hello World, Hello Universe";\nconsole.log(\n  text.includes("World"),\n  text.includes("world"),\n  text.includes("World", 7),\n);',
            },
            {
              label: "Handle empty searches and reject regex input",
              language: "javascript",
              code: 'console.log("abc".includes("", 99), "".includes("a"));\ntry {\n  "abc".includes(/a/);\n} catch (error) {\n  console.log(error.name);\n}',
            },
          ],
        },
        {
          name: "startsWith() — match at a position",
          explanation:
            "Checks whether a literal substring begins at the given position, defaulting to zero.",
          note: "Case-sensitive and rejects RegExp arguments. A prefix such as http also matches https; include the intended delimiter when that distinction matters.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith",
          examples: [
            {
              label: "Check the supplied URL prefixes",
              language: "javascript",
              code: 'const url = "https://example.com/api";\nconsole.log(\n  url.startsWith("https"),\n  url.startsWith("http"),\n  url.startsWith("ftp"),\n  url.startsWith("example", 8),\n);',
            },
            {
              label: "Check a nonzero position and empty prefix",
              language: "javascript",
              code: 'const text = "JavaScript is awesome";\nconsole.log(\n  text.startsWith("Java"),\n  text.startsWith("Script", 4),\n  text.startsWith("", 999),\n);',
            },
          ],
        },
        {
          name: "endsWith() — match an exclusive end position",
          explanation:
            "Checks whether a literal substring ends at the string length or the supplied exclusive end position.",
          note: "The second argument is not a backward search start. Case-sensitive and rejects RegExp arguments.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith",
          examples: [
            {
              label: "Check the supplied URL suffixes",
              language: "javascript",
              code: 'const url = "https://example.com/api";\nconsole.log(\n  url.endsWith(".com/api"),\n  url.endsWith(".com"),\n  url.endsWith("api"),\n  url.endsWith(".com", 19),\n);',
            },
            {
              label: "Check the exclusive end bound",
              language: "javascript",
              code: 'const text = "JavaScript is awesome";\nconsole.log(\n  text.endsWith("awesome"),\n  text.endsWith("is", 13),\n  text.endsWith("is", 12),\n);',
            },
          ],
        },
        {
          name: "search() — first regex position",
          explanation: "Returns the first regex match position or -1.",
          note: "No fromIndex parameter; g does not turn search into iteration. A string argument is interpreted as regex source, so use indexOf for literal user text.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search",
          examples: [
            {
              label: "Find the supplied price fields",
              language: "javascript",
              code: 'const text = "The price is $99.99";\nconsole.log(\n  text.search(/\\d+/),\n  text.search(/\\$/),\n  text.search(/[A-Z]/),\n  text.search(/PRICE/i),\n  text.search(/xyz/),\n);',
            },
            {
              label: "Distinguish regex source from literal searching",
              language: "javascript",
              code: 'console.log("abc".search("."), "abc".indexOf("."));\nconst pattern = /b/g;\npattern.lastIndex = 2;\nconsole.log("abc".search(pattern), pattern.lastIndex);',
            },
          ],
        },
        {
          name: "match() — first captures or all full matches",
          explanation:
            "Returns the first match with its groups, or all full matches with g. Returns null if nothing matches.",
          note: "Returns null on no match. The supplied email-shaped regex is a simple extractor, not an email validator or general email parser.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match",
          examples: [
            {
              label: "Read the first and all supplied address-shaped strings",
              language: "javascript",
              code: 'const text = "Contact: john@example.com, jane@test.org";\nconst first = text.match(/\\w+@\\w+\\.\\w+/);\nconsole.log(first[0], first.index);\nconsole.log(...text.match(/\\w+@\\w+\\.\\w+/g));',
            },
            {
              label: "Read capture fields and guard a missing match",
              language: "javascript",
              code: 'const text = "Contact: john@example.com, jane@test.org";\nconst match = text.match(/(\\w+)@(\\w+\\.\\w+)/);\nif (match) console.log(match[0], match[1], match[2]);\nconsole.log("No addresses".match(/\\w+@\\w+\\.\\w+/) === null);',
            },
          ],
        },
        {
          name: "matchAll() — all matches with capture details",
          explanation:
            "Returns an iterator of match arrays keeping capture groups and positions.",
          note: "A RegExp argument must use g. The iterator is consumed once and uses a copy of the regex state; the address examples retain their limited extraction grammar.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll",
          examples: [
            {
              label: "Collect every supplied match and group",
              language: "javascript",
              code: 'const text = "Contact: john@example.com, jane@test.org";\nconst matches = [...text.matchAll(/(\\w+)@(\\w+\\.\\w+)/g)];\nfor (const match of matches) console.log(match[1], match[2], match.index);',
            },
            {
              label: "Handle no matches and enforce the regex flag",
              language: "javascript",
              code: 'console.log([..."No addresses".matchAll(/(\\w+)@(\\w+\\.\\w+)/g)].length);\ntry {\n  [..."john@example.com".matchAll(/(\\w+)@(\\w+\\.\\w+)/)];\n} catch (error) {\n  console.log(error.name);\n}',
            },
          ],
        },
        {
          name: "Bracket notation — indexed UTF-16 code units",
          explanation: "Read the string property at a nonnegative index.",
          note: "Out-of-range and negative numeric properties normally return undefined; indexing does not return an entire supplementary Unicode code point.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt",
          examples: [
            {
              label: "Read the first unit and the high surrogate",
              language: "javascript",
              code: 'const text = "Hello 😀 World";\nconsole.log(text[0], text[6] === "\\uD83D", text[7] === "\\uDE00", text[100]);',
            },
            {
              label: "Distinguish indexed properties from negative indexing",
              language: "javascript",
              code: 'const text = "Hello";\nconsole.log(text[-1], text[text.length - 1], ""[0]);',
            },
          ],
        },
        {
          name: "charAt() — code unit or empty string",
          explanation:
            "Returns one UTF-16 code unit at the given index, or an empty string outside the string.",
          note: "Negative indices do not count from the end. Like bracket notation, charAt can return half of a surrogate pair.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt",
          examples: [
            {
              label: "Compare valid and out-of-range access",
              language: "javascript",
              code: 'const text = "Hello 😀 World";\nconsole.log(\n  text.charAt(0),\n  text.charAt(6) === "\\uD83D",\n  text.charAt(100),\n  text[100],\n);',
            },
            {
              label: "Handle negative and empty input",
              language: "javascript",
              code: 'console.log("Hello".charAt(-1), "".charAt(0), "Hello".charAt());',
            },
          ],
        },
        {
          name: "charCodeAt() — UTF-16 unit value",
          explanation: "Returns the numeric UTF-16 code unit at the index.",
          note: "A supplementary character uses two code units; out-of-range access returns NaN rather than undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt",
          examples: [
            {
              label: "Read ASCII and surrogate-unit values",
              language: "javascript",
              code: 'console.log(\n  "A".charCodeAt(0),\n  "a".charCodeAt(0),\n  "😀".charCodeAt(0),\n  "😀".charCodeAt(1),\n);',
            },
            {
              label: "Check missing units explicitly",
              language: "javascript",
              code: 'console.log(\n  "Hello".charCodeAt(0),\n  Number.isNaN("".charCodeAt(0)),\n  Number.isNaN("A".charCodeAt(100)),\n);',
            },
          ],
        },
        {
          name: "codePointAt() — decode a code point at a unit offset",
          explanation:
            "Returns a full code point when the indexed position starts a valid surrogate pair.",
          note: "The index is still a UTF-16 offset, not a code-point ordinal. Starting on the trailing surrogate returns that unit’s value; missing positions return undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt",
          examples: [
            {
              label: "Read a full supplementary code point",
              language: "javascript",
              code: 'const text = "Hello 😀 World";\nconsole.log("😀".codePointAt(0), "A".codePointAt(0), text.codePointAt(6));',
            },
            {
              label: "Observe trailing-surrogate and missing access",
              language: "javascript",
              code: 'console.log("😀".codePointAt(1), "😀".codePointAt(2), "".codePointAt(0));',
            },
          ],
        },
        {
          name: "at() — relative code-unit indexing",
          explanation:
            "Returns the code unit at an index, allowing negative indices from the end.",
          note: "Still works in UTF-16 code units, not complete code points or visible characters. Out-of-range access returns undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/at",
          examples: [
            {
              label: "Read the supplied end positions",
              language: "javascript",
              code: 'const text = "Hello 😀 World";\nconsole.log(text.at(0), text.at(-1), text.at(-2), text.at(100));',
            },
            {
              label: "Expose a trailing surrogate and empty input",
              language: "javascript",
              code: 'console.log("😀".at(-1) === "\\uDE00", "😀".at(-2) === "\\uD83D", "".at(-1));',
            },
          ],
        },
        {
          name: "String.fromCharCode() — construct UTF-16 units",
          explanation:
            "Creates a string from one or more numeric UTF-16 unit values.",
          note: "Values are converted to 16-bit units; passing a supplementary code point directly truncates it rather than encoding that character.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode",
          examples: [
            {
              label: "Create the supplied ASCII values",
              language: "javascript",
              code: "console.log(\n  String.fromCharCode(72),\n  String.fromCharCode(65),\n  String.fromCharCode(72, 101, 108, 108, 111),\n);",
            },
            {
              label: "Contrast a full code point with a surrogate pair",
              language: "javascript",
              code: 'const truncated = String.fromCharCode(0x1f600);\nconsole.log(\n  truncated === "😀",\n  truncated.charCodeAt(0),\n  String.fromCharCode(0xd83d, 0xde00),\n);',
            },
          ],
        },
        {
          name: "String.fromCodePoint() — construct Unicode code points",
          explanation:
            "Creates a string from full numeric Unicode code points.",
          note: "Invalid or noninteger values outside 0–0x10FFFF throw RangeError. A resulting code point can still be part of a larger visible grapheme.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint",
          examples: [
            {
              label: "Create the supplied emoji and letters",
              language: "javascript",
              code: "console.log(\n  String.fromCodePoint(128512),\n  String.fromCodePoint(0x1f600),\n  String.fromCodePoint(65, 66, 67),\n);",
            },
            {
              label: "Check output length and invalid input",
              language: "javascript",
              code: "console.log(String.fromCodePoint(0x1f600).length);\ntry {\n  String.fromCodePoint(0x110000);\n} catch (error) {\n  console.log(error.name);\n}",
            },
          ],
        },
        {
          name: "for...of — iterate string code points",
          explanation:
            "Reads string code points without splitting valid surrogate pairs.",
          note: "Code-point iteration is not grapheme segmentation; combining marks and joined emoji sequences may yield several values.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of",
          examples: [
            {
              label: "Iterate the supplied text and emoji",
              language: "javascript",
              code: 'for (const char of "Hello 😀") console.log(char);',
            },
            {
              label: "Observe a decomposed accented character",
              language: "javascript",
              code: 'const points = [];\nfor (const char of "e\\u0301") points.push(char.codePointAt(0));\nconsole.log(...points);',
            },
          ],
        },
        {
          name: "Indexed for loops — inspect every code unit",
          explanation:
            "Loop from zero through length minus one to visit each UTF-16 unit.",
          note: "The loop visits a surrogate pair twice; use for...of instead when the operation is defined over code points.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length",
          examples: [
            {
              label: "Inspect both surrogate units",
              language: "javascript",
              code: 'const text = "😀",\n  units = [];\nfor (let index = 0; index < text.length; index++)\n  units.push(text[index].charCodeAt(0));\nconsole.log(...units);',
            },
            {
              label: "Iterate ordinary ASCII positions",
              language: "javascript",
              code: 'const text = "Hi";\nfor (let index = 0; index < text.length; index++)\n  console.log(index, text[index]);',
            },
          ],
        },
        {
          name: "Spread and Array.from() — collect code points",
          explanation: "Copies a string’s Unicode code points into an array.",
          note: "Both preserve supplementary code points but do not combine grapheme sequences; array length is a code-point count for well-formed text.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from",
          examples: [
            {
              label: "Collect the supplied ASCII and emoji values",
              language: "javascript",
              code: 'console.log(...[..."Hello"]);\nconsole.log(...Array.from("Hello 😀"));',
            },
            {
              label: "Compare equivalent code-point collections",
              language: "javascript",
              code: 'const text = "😀😁";\nconsole.log(\n  [...text].length,\n  Array.from(text).length,\n  Array.from(text).join("") === text,\n);',
            },
          ],
        },
        {
          name: 'split("") — collect UTF-16 units',
          explanation:
            "Split on the empty string to obtain individual UTF-16 code units.",
          note: "Unlike spread, this always splits a supplementary emoji into surrogate halves; it is not merely a possible behavior on some engines.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Split the supplied ASCII text",
              language: "javascript",
              code: 'console.log(..."Hello".split(""));',
            },
            {
              label: "Inspect the split surrogate pair",
              language: "javascript",
              code: 'const units = "😀".split("");\nconsole.log(\n  units.length,\n  units[0].charCodeAt(0),\n  units[1].charCodeAt(0),\n  [..."😀"].length,\n);',
            },
          ],
        },
        {
          name: "length and realLength() — encoding counts",
          explanation:
            "length counts UTF-16 units. realLength counts Unicode code points, which may still split a visible character.",
          note: "Despite its name, realLength is a code-point count, not a count of user-perceived characters. Combining marks and joined emoji sequences need grapheme-aware segmentation for that task.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length",
          examples: [
            {
              label: "Compare the supplied lengths",
              language: "javascript",
              code: 'const realLength = (text) => [...text].length;\nconsole.log(\n  "Hello".length,\n  "😀".length,\n  [..."😀"].length,\n  realLength("Hello 😀"),\n);',
            },
            {
              label: "Expose visible-character counting limits",
              language: "javascript",
              code: 'const realLength = (text) => [...text].length;\nconsole.log(realLength("e\\u0301"), realLength("👨‍👩‍👧‍👦"), realLength(""));',
            },
          ],
        },
        {
          name: "Start/end checks at explicit bounds",
          explanation:
            "Use startsWith with a start offset and endsWith with an exclusive end position.",
          note: "The two second arguments serve different roles. Neither method searches arbitrary positions within the supplied bound.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith",
          examples: [
            {
              label: "Check the supplied prose segments",
              language: "javascript",
              code: 'const text = "Welcome to JavaScript programming";\nconsole.log(\n  text.startsWith("Welcome"),\n  text.startsWith("to", 8),\n  text.endsWith("programming"),\n  text.endsWith("JavaScript", 21),\n);',
            },
            {
              label: "Show the effect of an adjacent bound",
              language: "javascript",
              code: 'const text = "JavaScript is awesome";\nconsole.log(\n  text.startsWith("Script", 4),\n  text.startsWith("Script", 5),\n  text.endsWith("is", 13),\n  text.endsWith("is", 14),\n);',
            },
          ],
        },
        {
          name: "Case-insensitive start/end checks — explicit folding",
          explanation:
            "Lowercase the text and literal search values under a defined casing policy before a boolean check.",
          note: "Default lowercasing is not general locale-aware equality or Unicode normalization. Casing can change length, so transformed indices cannot blindly be mapped to original offsets.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase",
          examples: [
            {
              label: "Compare the supplied case-sensitive checks",
              language: "javascript",
              code: 'const text = "Welcome to JavaScript programming";\nconsole.log(text.startsWith("welcome"), text.endsWith("Programming"));\nconst lower = text.toLowerCase();\nconsole.log(lower.startsWith("welcome"), lower.endsWith("programming"));',
            },
            {
              label: "Fold both literal operands",
              language: "javascript",
              code: 'const text = "HELLO WORLD",\n  prefix = "Hello",\n  suffix = "World";\nconsole.log(\n  text.toLowerCase().startsWith(prefix.toLowerCase()),\n  text.toLowerCase().endsWith(suffix.toLowerCase()),\n);',
            },
          ],
        },
        {
          name: "Check a filename extension",
          explanation:
            "Use endsWith on a filename when testing its displayed extension.",
          note: "An extension is a naming convention, not proof of file content or type. URLs can include queries or fragments, so they are not always filenames.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith",
          examples: [
            {
              label: "Check the supplied filename",
              language: "javascript",
              code: 'const filename = "document.pdf";\nconsole.log(filename.endsWith(".pdf"), filename.endsWith(".doc"));',
            },
            {
              label: "Choose an explicit case policy",
              language: "javascript",
              code: 'const filename = "REPORT.PDF";\nconsole.log(\n  filename.endsWith(".pdf"),\n  filename.toLowerCase().endsWith(".pdf"),\n  "report.pdf.exe".endsWith(".pdf"),\n);',
            },
          ],
        },
        {
          name: "Check protocol-shaped prefixes",
          explanation:
            "Include the scheme delimiter when comparing HTTP and HTTPS prefixes.",
          note: 'startsWith("http") also matches https and other text. For actual URL protocol policy, parse with URL rather than treating a string prefix as a security boundary.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith",
          examples: [
            {
              label: "Check the supplied HTTPS URL text",
              language: "javascript",
              code: 'const url = "https://example.com";\nconsole.log(\n  url.startsWith("https://"),\n  url.startsWith("http://"),\n  url.startsWith("http"),\n);',
            },
            {
              label: "Parse a URL before checking its protocol",
              language: "javascript",
              code: 'const url = new URL("HTTPS://example.com/path");\nconsole.log(url.protocol === "https:", url.hostname);',
            },
          ],
        },
        {
          name: "Check several allowed suffixes with some()",
          explanation:
            "Use some to test whether any allowed extension matches the filename.",
          note: "This is case-sensitive unless you normalize first; an empty allowed suffix would match every filename, so keep the allowlist deliberate.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some",
          examples: [
            {
              label: "Match the supplied extension allowlist",
              language: "javascript",
              code: 'const extensions = [".jpg", ".png", ".gif"],\n  image = "photo.jpg";\nconsole.log(extensions.some((extension) => image.endsWith(extension)));',
            },
            {
              label: "Handle uppercase and a disallowed suffix",
              language: "javascript",
              code: 'const extensions = [".jpg", ".png", ".gif"];\nconst allowed = (name) =>\n  extensions.some((extension) => name.toLowerCase().endsWith(extension));\nconsole.log(allowed("PHOTO.PNG"), allowed("photo.jpg.exe"));',
            },
          ],
        },
      ],
    },
    {
      name: "Extracting Substrings",
      id: "extracting-substrings",
      intro:
        "slice, substring, and legacy substr → comparisons and practical extraction → modern at access and bounded helpers, following all six images. Run snippets independently in a current browser or Node.js; legacy substr examples require that Annex B method. String bounds and counts use UTF-16 units, not grapheme clusters. Each practical helper states its edge-case policy.",
      methods: [
        {
          name: "slice() — extract an exclusive-end range",
          explanation:
            "Returns the portion from start up to the exclusive end, or through the tail when end is omitted.",
          note: "Leaves the original unchanged and uses UTF-16 units. Bounds are normalized and clamped; an end at or before the normalized start returns an empty string.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice",
          examples: [
            {
              label: "Extract the supplied prefix and tail",
              language: "javascript",
              code: 'const text = "Hello World";\nconsole.log(text.slice(0, 5), text.slice(6), text.slice(6, 11), text);',
            },
            {
              label: "Use negative start and end bounds",
              language: "javascript",
              code: 'const text = "Hello World";\nconsole.log(text.slice(-5), text.slice(-5, -1), text.slice(0, -6));',
            },
            {
              label:
                "Handle reversed bounds, clamping, and surrogate splitting",
              language: "javascript",
              code: 'console.log("Hello World".slice(5, 2), "abc".slice(100), "abc".slice(-99, 2));\nconsole.log("😀".slice(0, 1) === "\\uD83D");',
            },
          ],
        },
        {
          name: "substring() — clamp and reorder bounds",
          explanation:
            "Returns the portion between two nonnegative bounds with an exclusive end.",
          note: "Negative values become zero, and reversed bounds are swapped after normalization. Uses UTF-16 units and does not mutate the source.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring",
          examples: [
            {
              label: "Extract the supplied portions",
              language: "javascript",
              code: 'const text = "Hello World";\nconsole.log(text.substring(0, 5), text.substring(6), text.substring(6, 11));',
            },
            {
              label: "Swap reversed bounds and clamp negatives",
              language: "javascript",
              code: 'const text = "Hello World";\nconsole.log(text.substring(5, 0), text.substring(-3), text.substring(0, -3));',
            },
            {
              label: "Compare reversed ranges with slice",
              language: "javascript",
              code: 'console.log(\n  "JavaScript".substring(8, 4),\n  "JavaScript".slice(8, 4),\n  "abc".substring(99, 1),\n);',
            },
          ],
        },
        {
          name: "substr() — legacy start and length",
          explanation:
            "Returns up to a given number of UTF-16 units starting at the given position.",
          note: "Deprecated Annex B method: use slice or substring in new code. Its second argument is a length, so replacing it with an end-index method requires checking bounds and normalization.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr",
          examples: [
            {
              label: "Read the supplied legacy calls",
              language: "javascript",
              code: 'const text = "Hello World";\nconsole.log(text.substr(0, 5), text.substr(6, 5), text.substr(6));',
            },
            {
              label: "Use a negative start and explicit length",
              language: "javascript",
              code: 'const text = "Hello World";\nconsole.log(\n  text.substr(-5),\n  text.substr(-5, 3),\n  text.substr(6, 0),\n  text.substr(6, -1),\n);',
            },
            {
              label: "Compare length with exclusive end",
              language: "javascript",
              code: 'const text = "JavaScript";\nconsole.log(text.substr(4, 4), text.slice(4, 8), text.substring(4, 8));',
            },
          ],
        },
        {
          name: "Take the last N or first N units",
          explanation:
            "Use slice(-n) for a positive tail size and slice(0,n) for a prefix.",
          note: "A zero tail count needs special handling because slice(-0) returns the entire string. These are unit counts rather than visible-character counts.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice",
          examples: [
            {
              label: "Compare the supplied final three units",
              language: "javascript",
              code: 'const text = "JavaScript";\nconsole.log(text.slice(-3), text.substr(-3), text.substring(text.length - 3));\nconst n = 0;\nconsole.log(n === 0 ? "" : text.slice(-n));',
            },
            {
              label: "Compare the supplied first four units",
              language: "javascript",
              code: 'const text = "JavaScript";\nconsole.log(text.slice(0, 4), text.substring(0, 4), text.substr(0, 4));',
            },
          ],
        },
        {
          name: "Extract a tail or middle range",
          explanation:
            "Use an omitted end to extract through the end, or explicit start/end to take a middle portion.",
          note: "These equivalent examples use ordinary valid positive bounds; they do not imply equivalence for all negative, reversed, or omitted values.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice",
          examples: [
            {
              label: "Compare extraction through the tail",
              language: "javascript",
              code: 'const text = "JavaScript";\nconsole.log(text.slice(4), text.substring(4), text.substr(4));',
            },
            {
              label: "Compare the supplied middle portion",
              language: "javascript",
              code: 'const text = "JavaScript";\nconsole.log(text.slice(4, 8), text.substring(4, 8), text.substr(4, 4));',
            },
          ],
        },
        {
          name: "Extract a filename extension",
          explanation:
            "Find the final dot and slice from it when it represents an extension under the stated policy.",
          note: "A dot at the start alone denotes a dotfile, and a final dot is treated as no extension. Guarding -1 avoids accidentally taking the last character of a name without dots.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf",
          examples: [
            {
              label: "Read the supplied and multi-dot extensions",
              language: "javascript",
              code: 'function getExtension(filename) {\n  const dot = filename.lastIndexOf(".");\n  return dot > 0 && dot < filename.length - 1 ? filename.slice(dot) : "";\n}\nconsole.log(getExtension("document.pdf"), getExtension("archive.tar.gz"));',
            },
            {
              label: "Handle absent, leading, and trailing dots",
              language: "javascript",
              code: 'function getExtension(filename) {\n  const dot = filename.lastIndexOf(".");\n  return dot > 0 && dot < filename.length - 1 ? filename.slice(dot) : "";\n}\nconsole.log(\n  getExtension("README"),\n  getExtension(".env"),\n  getExtension("name."),\n);',
            },
          ],
        },
        {
          name: "Extract a filename without its extension",
          explanation:
            "Slice before the final extension dot using the same filename policy.",
          note: "Names without an extension remain intact; a leading dotfile marker or final dot is preserved. This does not inspect file contents.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice",
          examples: [
            {
              label: "Read the supplied stem and preserve earlier dots",
              language: "javascript",
              code: 'function withoutExtension(filename) {\n  const dot = filename.lastIndexOf(".");\n  return dot > 0 && dot < filename.length - 1\n    ? filename.slice(0, dot)\n    : filename;\n}\nconsole.log(\n  withoutExtension("document.pdf"),\n  withoutExtension("archive.tar.gz"),\n);',
            },
            {
              label: "Preserve names that have no extension",
              language: "javascript",
              code: 'function withoutExtension(filename) {\n  const dot = filename.lastIndexOf(".");\n  return dot > 0 && dot < filename.length - 1\n    ? filename.slice(0, dot)\n    : filename;\n}\nconsole.log(\n  withoutExtension("README"),\n  withoutExtension(".env"),\n  withoutExtension("name."),\n  withoutExtension(""),\n);',
            },
          ],
        },
        {
          name: "truncate() — enforce a total length with ellipsis",
          explanation:
            "Reserve three units for dots when truncating a longer string.",
          note: "This helper caps UTF-16 length, not visible character count, and can split a surrogate pair. Limits zero through three return that many dots for overlong input; short input remains unchanged.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice",
          examples: [
            {
              label: "Truncate the supplied label and keep short input",
              language: "javascript",
              code: 'function truncate(text, maxLength) {\n  if (!Number.isSafeInteger(maxLength) || maxLength < 0)\n    throw new RangeError("Use a nonnegative integer length");\n  if (text.length <= maxLength) return text;\n  if (maxLength <= 3) return ".".repeat(maxLength);\n  return text.slice(0, maxLength - 3) + "...";\n}\nconsole.log(truncate("Hello World", 8), truncate("Hi", 8));',
            },
            {
              label: "Handle tiny limits and reject invalid values",
              language: "javascript",
              code: 'function truncate(text, maxLength) {\n  if (!Number.isSafeInteger(maxLength) || maxLength < 0)\n    throw new RangeError("Use a nonnegative integer length");\n  if (text.length <= maxLength) return text;\n  if (maxLength <= 3) return ".".repeat(maxLength);\n  return text.slice(0, maxLength - 3) + "...";\n}\nconsole.log(truncate("Hello", 0), truncate("Hello", 2), truncate("Hello", 3));\ntry {\n  truncate("Hello", -1);\n} catch (error) {\n  console.log(error.name);\n}',
            },
          ],
        },
        {
          name: "Extract a URL host — slicing versus parsing",
          explanation:
            "Use the supplied slicing expression only for its known URL shape.",
          note: "The fixed-offset slice fails when a slash is absent and does not handle credentials, ports, or URL variants robustly. hostname excludes the port; host includes it.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/URL",
          examples: [
            {
              label: "Reproduce the supplied known-shape slice",
              language: "javascript",
              code: 'const url = "https://www.example.com/path";\nconst domain = url.slice(url.indexOf("://") + 3, url.indexOf("/", 8));\nconsole.log(domain);',
            },
            {
              label: "Parse no-path and credential/port variants",
              language: "javascript",
              code: 'console.log(new URL("https://www.example.com").hostname);\nconst url = new URL("https://user:demo@example.com:8080?x=1");\nconsole.log(url.hostname, url.host);',
            },
          ],
        },
        {
          name: "at() — modern relative unit access",
          explanation:
            "Returns one UTF-16 unit at an index, allowing negative offsets from the end.",
          note: "Negative indexing is length-relative, not cyclic wrapping: an index below -length is out of bounds. at still returns one code unit rather than a whole supplementary character.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/at",
          examples: [
            {
              label: "Read the supplied positions",
              language: "javascript",
              code: 'const text = "Hello World";\nconsole.log(text.at(0), text.at(-1), text.at(-6));\nconst word = "JavaScript";\nconsole.log(\n  word.at(0),\n  word.at(4),\n  word.at(9),\n  word.at(-1),\n  word.at(-2),\n  word.at(-10),\n);',
            },
            {
              label: "Distinguish bounds and a surrogate pair",
              language: "javascript",
              code: 'const text = "JavaScript";\nconsole.log(text.at(100), text.at(-100), text.at(-11));\nconsole.log("😀".at(-1) === "\\uDE00");',
            },
            {
              label: "Compare positive and final-position access",
              language: "javascript",
              code: 'const text = "JavaScript";\nconsole.log(text[0], text.charAt(0), text.at(0));\nconsole.log(text[text.length - 1], text.at(-1));',
            },
          ],
        },
        {
          name: "Loop with negative at() positions",
          explanation:
            "Start at minus length and advance toward zero to visit every code unit in forward order.",
          note: "This is not reverse iteration: increasing negative offsets moves from the beginning toward the end. Empty strings run no iterations.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/at",
          examples: [
            {
              label: "Run the supplied relative-index loop",
              language: "javascript",
              code: 'const text = "Hello";\nfor (let index = -text.length; index < 0; index++) console.log(text.at(index));',
            },
            {
              label: "Check empty input and unit semantics",
              language: "javascript",
              code: 'let visits = 0;\nconst empty = "";\nfor (let index = -empty.length; index < 0; index++) visits++;\nconst text = "😀",\n  units = [];\nfor (let index = -text.length; index < 0; index++)\n  units.push(text.at(index).charCodeAt(0));\nconsole.log(visits, ...units);',
            },
          ],
        },
        {
          name: "getLastN() — bounded relative-index extraction",
          explanation:
            "Collect at most n units from the end using the supplied loop pattern.",
          note: "Returns an empty string for zero and the whole string when n exceeds length. Clamping avoids unnecessary iterations and undefined elements; slice is shorter for the same unit-based task.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/at",
          examples: [
            {
              label: "Extract the supplied suffix and edge sizes",
              language: "javascript",
              code: 'function getLastN(text, n) {\n  if (!Number.isSafeInteger(n) || n < 0)\n    throw new RangeError("Use a nonnegative integer count");\n  const chars = [];\n  for (let index = -Math.min(n, text.length); index < 0; index++)\n    chars.push(text.at(index));\n  return chars.join("");\n}\nconsole.log(\n  getLastN("JavaScript", 3),\n  getLastN("JavaScript", 0),\n  getLastN("Hi", 100),\n);',
            },
            {
              label: "Compare slice and reject invalid counts",
              language: "javascript",
              code: 'function getLastN(text, n) {\n  if (!Number.isSafeInteger(n) || n < 0)\n    throw new RangeError("Use a nonnegative integer count");\n  const chars = [];\n  for (let index = -Math.min(n, text.length); index < 0; index++)\n    chars.push(text.at(index));\n  return chars.join("");\n}\nconst text = "JavaScript",\n  n = 3;\nconsole.log(getLastN(text, n) === text.slice(-n), getLastN("", 3));\ntry {\n  getLastN(text, -1);\n} catch (error) {\n  console.log(error.name);\n}',
            },
          ],
        },
      ],
    },
    {
      name: "String Modification",
      id: "string-modification",
      intro:
        "Replacing text → trimming and padding → splitting and joining, following all eleven images. Run each snippet independently in a current browser or Node.js with RegExp.escape support. Helpers state their text and numeric contracts; examples distinguish literal replacement, safe text output, whitespace token conventions, and real parsing requirements.",
      methods: [
        {
          name: "replace() — first literal or selected regex matches",
          explanation:
            "Returns a new string with the first literal match or the matches selected by a regex replaced.",
          note: "The original string is unchanged; i changes case matching and does not imply global replacement.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Compare first and global replacement",
              language: "javascript",
              code: 'const text = "Hello World, Hello Universe";\nconsole.log(text.replace("Hello", "Hi"), text.replace(/hello/i, "Hi"));\nconsole.log(text.replace(/Hello/g, "Hi"), text);',
            },
            {
              label: "Match literal and regex syntax deliberately",
              language: "javascript",
              code: 'console.log("a.b".replace(".", "-"), "a.b".replace(/./g, "-"));',
            },
          ],
        },
        {
          name: "Function replacers — calculate output",
          explanation:
            "Use a callback to transform each selected match and its captures.",
          note: "The example exchange factor is fixed demonstration data, not a current exchange rate or a monetary rounding policy. Returned callback text is inserted literally.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Transform the supplied amounts",
              language: "javascript",
              code: 'console.log(\n  "Price: $10, Tax: $2".replace(\n    /\\$(\\d+)/g,\n    (match, amount) => "€" + Number(amount) * 0.85,\n  ),\n);',
            },
            {
              label: "Double numbers and retain literal dollar tokens",
              language: "javascript",
              code: 'console.log("a12 b3".replace(/\\d+/g, (value) => String(Number(value) * 2)));\nconsole.log("abc".replace(/b/, () => "$&"));',
            },
          ],
        },
        {
          name: "Numbered capture replacements",
          explanation:
            "Use dollar-number references to reorder captured fields in a replacement string.",
          note: "Dollar references in replacement strings differ from backreferences inside a regex.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Reorder the supplied name",
              language: "javascript",
              code: 'console.log("John Smith".replace(/(\\w+) (\\w+)/, "$2, $1"));',
            },
            {
              label: "Distinguish full match and literal dollar tokens",
              language: "javascript",
              code: 'console.log("abc".replace(/b/, "[$&]"), "abc".replace(/b/, "$$"));',
            },
          ],
        },
        {
          name: "Named capture replacements",
          explanation:
            "Use named groups and dollar-angle-bracket references to reformat structured text.",
          note: "The date pattern checks only shape, not calendar validity.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Reformat the supplied date",
              language: "javascript",
              code: 'const pattern = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;\nconsole.log("2024-03-15".replace(pattern, "$<month>/$<day>/$<year>"));',
            },
            {
              label: "Reformat several shaped dates",
              language: "javascript",
              code: 'const pattern = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/g;\nconsole.log(\n  "2024-03-15 2025-04-20".replace(pattern, "$<day>.$<month>.$<year>"),\n);',
            },
          ],
        },
        {
          name: "replaceAll() — every occurrence",
          explanation:
            "Replace all literal occurrences or all matches of a global regex.",
          note: "A RegExp argument without g throws TypeError; no flag is needed for a string search.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll",
          examples: [
            {
              label: "Use literal and global-regex searches",
              language: "javascript",
              code: 'const text = "cat and cat and cat";\nconsole.log(text.replaceAll("cat", "dog"), text.replaceAll(/cat/g, "dog"));',
            },
            {
              label: "Reject a non-global regex and handle empty search",
              language: "javascript",
              code: 'try {\n  "cat cat".replaceAll(/cat/, "dog");\n} catch (error) {\n  console.log(error.name);\n}\nconsole.log("ab".replaceAll("", "-"));',
            },
          ],
        },
        {
          name: "Standalone literal replacement fallback",
          explanation:
            "Use split and join for a deliberately limited nonempty literal search and literal replacement.",
          note: "Not a replaceAll polyfill: it rejects empty search, accepts no regex/callback, and does not expand replacement tokens. The screenshot’s prototype replacement would fail those native semantics.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll",
          examples: [
            {
              label: "Replace every literal occurrence",
              language: "javascript",
              code: 'function replaceAllLiteral(text, search, replacement) {\n  if (\n    typeof search !== "string" ||\n    !search.length ||\n    typeof replacement !== "string"\n  )\n    throw new TypeError("Use a nonempty string search and string replacement");\n  return text.split(search).join(replacement);\n}\nconsole.log(replaceAllLiteral("cat cat", "cat", "dog"));',
            },
            {
              label: "Expose literal replacement semantics",
              language: "javascript",
              code: 'function replaceAllLiteral(text, search, replacement) {\n  if (\n    typeof search !== "string" ||\n    !search.length ||\n    typeof replacement !== "string"\n  )\n    throw new TypeError("Use a nonempty string search and string replacement");\n  return text.split(search).join(replacement);\n}\nconsole.log(replaceAllLiteral("a.a", ".", "$&"));\ntry {\n  replaceAllLiteral("ab", "", "-");\n} catch (error) {\n  console.log(error.name);\n}',
            },
          ],
        },
        {
          name: "Template replacement — preserve falsy values",
          explanation:
            "Replace supplied brace placeholders from an object’s own properties.",
          note: "Unknown placeholders remain intact; values are converted to text. This is text substitution, not HTML escaping or a general template language.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Fill the supplied template",
              language: "javascript",
              code: 'function fillTemplate(text, data) {\n  return text.replace(/\\{(\\w+)\\}/g, (match, key) =>\n    Object.hasOwn(data, key) ? String(data[key]) : match,\n  );\n}\nconsole.log(\n  fillTemplate("Hello {name}, you are {age} years old", {\n    name: "John",\n    age: 30,\n  }),\n);',
            },
            {
              label: "Retain falsy values and unknown placeholders",
              language: "javascript",
              code: 'function fillTemplate(text, data) {\n  return text.replace(/\\{(\\w+)\\}/g, (match, key) =>\n    Object.hasOwn(data, key) ? String(data[key]) : match,\n  );\n}\nconsole.log(\n  fillTemplate("{zero}|{flag}|{empty}|{missing}", {\n    zero: 0,\n    flag: false,\n    empty: "",\n  }),\n);\nconsole.log(fillTemplate("{toString}", {}));',
            },
          ],
        },
        {
          name: "Highlight literal search terms",
          explanation:
            "Escape the term as regex text and build highlighted HTML from escaped text segments.",
          note: "Requires RegExp.escape. Empty terms return escaped text; this is a text-to-HTML helper, not a transformer for existing markup.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Highlight a term containing regex punctuation",
              language: "javascript",
              code: 'const escapeHtml = (text) =>\n  text.replace(\n    /[&<>\\u0022\\u0027]/g,\n    (char) =>\n      ({ 38: "&amp;", 60: "&lt;", 62: "&gt;", 34: "&quot;", 39: "&#39;" })[\n        char.charCodeAt(0)\n      ],\n  );\nfunction highlight(text, term) {\n  if (term === "") return escapeHtml(text);\n  const regex = new RegExp(RegExp.escape(term), "gi");\n  let result = "",\n    last = 0;\n  for (const match of text.matchAll(regex)) {\n    result +=\n      escapeHtml(text.slice(last, match.index)) +\n      "<mark>" +\n      escapeHtml(match[0]) +\n      "</mark>";\n    last = match.index + match[0].length;\n  }\n  return result + escapeHtml(text.slice(last));\n}\nconsole.log(highlight("User.name and user.name", "user.name"));',
            },
            {
              label: "Escape markup and handle an empty term",
              language: "javascript",
              code: 'const escapeHtml = (text) =>\n  text.replace(\n    /[&<>\\u0022\\u0027]/g,\n    (char) =>\n      ({ 38: "&amp;", 60: "&lt;", 62: "&gt;", 34: "&quot;", 39: "&#39;" })[\n        char.charCodeAt(0)\n      ],\n  );\nfunction highlight(text, term) {\n  if (term === "") return escapeHtml(text);\n  const regex = new RegExp(RegExp.escape(term), "gi");\n  let result = "",\n    last = 0;\n  for (const match of text.matchAll(regex)) {\n    result +=\n      escapeHtml(text.slice(last, match.index)) +\n      "<mark>" +\n      escapeHtml(match[0]) +\n      "</mark>";\n    last = match.index + match[0].length;\n  }\n  return result + escapeHtml(text.slice(last));\n}\nconsole.log(highlight("<b> & text", "<b>"));\nconsole.log(highlight("<x>", ""));',
            },
          ],
        },
        {
          name: "escapeHtml() — escape text characters",
          explanation:
            "Replace the five demonstrated HTML-significant characters with entity references.",
          note: "Escaping is context-specific: this does not validate URLs, JavaScript, CSS, or arbitrary HTML. Setting textContent is preferable when creating DOM text directly.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Escape text and attribute-like punctuation",
              language: "javascript",
              code: 'const escapeHtml = (text) =>\n  text.replace(\n    /[&<>\\u0022\\u0027]/g,\n    (char) =>\n      ({ 38: "&amp;", 60: "&lt;", 62: "&gt;", 34: "&quot;", 39: "&#39;" })[\n        char.charCodeAt(0)\n      ],\n  );\nconsole.log(escapeHtml(\'<a title="x">&\') + escapeHtml(String.fromCharCode(39)));',
            },
            {
              label: "Handle empty text and existing entity syntax",
              language: "javascript",
              code: 'const escapeHtml = (text) =>\n  text.replace(\n    /[&<>\\u0022\\u0027]/g,\n    (char) =>\n      ({ 38: "&amp;", 60: "&lt;", 62: "&gt;", 34: "&quot;", 39: "&#39;" })[\n        char.charCodeAt(0)\n      ],\n  );\nconsole.log(escapeHtml(""), escapeHtml("&amp;"));',
            },
          ],
        },
        {
          name: "slugify() — supplied ASCII-style slug rules",
          explanation:
            "Lowercase text, remove characters outside the stated set, and normalize spaces/hyphens.",
          note: "Keeps underscores and drops accented letters rather than transliterating them. Does not ensure uniqueness or implement a complete URL-routing policy.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Create the supplied slug",
              language: "javascript",
              code: 'const slugify = (text) =>\n  text\n    .toLowerCase()\n    .replace(/[^\\w\\s-]/g, "")\n    .replace(/\\s+/g, "-")\n    .replace(/-+/g, "-")\n    .replace(/^-+|-+$/g, "");\nconsole.log(slugify("Hello World!"), slugify("  Hello---World  "));',
            },
            {
              label: "Expose alphabet and empty-input behavior",
              language: "javascript",
              code: 'const slugify = (text) =>\n  text\n    .toLowerCase()\n    .replace(/[^\\w\\s-]/g, "")\n    .replace(/\\s+/g, "-")\n    .replace(/-+/g, "-")\n    .replace(/^-+|-+$/g, "");\nconsole.log(slugify("café_name"), slugify("!!!"));',
            },
          ],
        },
        {
          name: "maskEmail() — display-only masking",
          explanation:
            "Hides part of an email address with stars, including short or malformed input.",
          note: "This is a display convention, not anonymization, email validation, or access control; the domain remains visible. It uses UTF-16 positions.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Mask the supplied address",
              language: "javascript",
              code: 'function maskEmail(email) {\n  const at = email.indexOf("@");\n  if (at < 1 || at !== email.lastIndexOf("@")) return "***";\n  const local = email.slice(0, at),\n    shown = local.length > 2 ? local.slice(0, 2) : "";\n  return shown + "***" + email.slice(at);\n}\nconsole.log(maskEmail("john.doe@example.com"));',
            },
            {
              label: "Handle short local parts and malformed text",
              language: "javascript",
              code: 'function maskEmail(email) {\n  const at = email.indexOf("@");\n  if (at < 1 || at !== email.lastIndexOf("@")) return "***";\n  const local = email.slice(0, at),\n    shown = local.length > 2 ? local.slice(0, 2) : "";\n  return shown + "***" + email.slice(at);\n}\nconsole.log(\n  maskEmail("a@example.com"),\n  maskEmail("ab@example.com"),\n  maskEmail("invalid"),\n);',
            },
          ],
        },
        {
          name: "trim() — remove whitespace at both ends",
          explanation:
            "Return a string without leading/trailing JavaScript whitespace and line terminators.",
          note: "Internal spaces remain; this does not remove every invisible Unicode character.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim",
          examples: [
            {
              label: "Trim mixed edge whitespace",
              language: "javascript",
              code: 'const text = "  Hello World \\n";\nconsole.log(text.trim(), text);\nconsole.log("\\t\\n Hello \\r\\n".trim());',
            },
            {
              label: "Keep internal spacing and non-whitespace characters",
              language: "javascript",
              code: 'console.log(\n  "  a  b  ".trim(),\n  " \\n ".trim(),\n  "\\u200bhello\\u200b".trim() === "\\u200bhello\\u200b",\n);',
            },
          ],
        },
        {
          name: "trimStart() and trimLeft()",
          explanation: "Remove whitespace only from the beginning.",
          note: "trimLeft is an alias, not a separate trimming algorithm; it is not currently marked deprecated in MDN, contrary to the image’s comment.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart",
          examples: [
            {
              label: "Keep trailing whitespace intact",
              language: "javascript",
              code: 'const text = "  Hello World \\n";\nconsole.log(\n  text.trimStart(),\n  text.trimLeft(),\n  text.trimStart() === text.trimLeft(),\n);',
            },
            {
              label: "Handle blank and already-trimmed strings",
              language: "javascript",
              code: 'console.log(" \\t".trimStart(), "hello  ".trimStart());',
            },
          ],
        },
        {
          name: "trimEnd() and trimRight()",
          explanation: "Remove whitespace only from the end.",
          note: "trimRight is an alias; prefer trimEnd without claiming different behavior or unsupported deprecation status.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd",
          examples: [
            {
              label: "Keep leading whitespace intact",
              language: "javascript",
              code: 'const text = "  Hello World \\n";\nconsole.log(\n  text.trimEnd(),\n  text.trimRight(),\n  text.trimEnd() === text.trimRight(),\n);',
            },
            {
              label: "Handle blank and already-trimmed strings",
              language: "javascript",
              code: 'console.log(" \\n".trimEnd(), "  hello".trimEnd());',
            },
          ],
        },
        {
          name: "trimChar() — remove a literal edge character",
          explanation:
            "Escape a supplied character and remove repeated copies from either edge.",
          note: "Requires RegExp.escape and exactly one Unicode code point; callers pass a literal dot rather than a pre-escaped pattern.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Trim the supplied literal dot",
              language: "javascript",
              code: 'function trimChar(text, char) {\n  if ([...char].length !== 1) throw new TypeError("Use one Unicode code point");\n  const literal = RegExp.escape(char);\n  return text.replace(\n    new RegExp("^(?:" + literal + ")+|(?:" + literal + ")+$", "gu"),\n    "",\n  );\n}\nconsole.log(trimChar("...hello...", "."), trimChar("a.b", "."));',
            },
            {
              label: "Trim regex punctuation and reject empty input",
              language: "javascript",
              code: 'function trimChar(text, char) {\n  if ([...char].length !== 1) throw new TypeError("Use one Unicode code point");\n  const literal = RegExp.escape(char);\n  return text.replace(\n    new RegExp("^(?:" + literal + ")+|(?:" + literal + ")+$", "gu"),\n    "",\n  );\n}\nconsole.log(trimChar("***hello***", "*"));\ntry {\n  trimChar("hello", "");\n} catch (error) {\n  console.log(error.name);\n}',
            },
          ],
        },
        {
          name: "padStart() — fill to a minimum length",
          explanation:
            "Add to the start of the padding string until the target UTF-16 length is reached.",
          note: "Does not truncate longer input. Padding repeats and is cut to fit; an omitted fill defaults to spaces and empty fill adds nothing.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart",
          examples: [
            {
              label: "Pad the supplied numeric strings",
              language: "javascript",
              code: 'console.log(\n  "5".padStart(3, "0"),\n  "123".padStart(5, "0"),\n  "12345".padStart(3, "0"),\n);',
            },
            {
              label: "Use spaces, repeated text, or empty padding",
              language: "javascript",
              code: 'console.log("Hi".padStart(5), "Hi".padStart(10, "abc"), "Hi".padStart(5, ""));',
            },
          ],
        },
        {
          name: "padEnd() — append to a minimum length",
          explanation:
            "Add repeated padding until the target length is reached.",
          note: "Measures UTF-16 units, not terminal display width, and never shortens the original.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd",
          examples: [
            {
              label: "Pad the supplied string at the end",
              language: "javascript",
              code: 'console.log("5".padEnd(3, "0"), "Hi".padEnd(5));',
            },
            {
              label: "Repeat and truncate a padding token",
              language: "javascript",
              code: 'console.log("Hi".padEnd(10, "abc"), "long".padEnd(2, "."), "Hi".padEnd(5, ""));',
            },
          ],
        },
        {
          name: "formatNumber() — zero-pad nonnegative integers",
          explanation:
            "Convert an integer to text and pad it to a minimum width.",
          note: "This helper rejects negative and fractional numbers; a width smaller than the number leaves it intact.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart",
          examples: [
            {
              label: "Format the supplied integer",
              language: "javascript",
              code: 'function formatNumber(number, digits) {\n  if (\n    !Number.isSafeInteger(number) ||\n    number < 0 ||\n    !Number.isSafeInteger(digits) ||\n    digits < 0 ||\n    digits > 10000\n  )\n    throw new RangeError("Use a nonnegative safe integer and width 0–10000");\n  return String(number).padStart(digits, "0");\n}\nconsole.log(formatNumber(42, 5), formatNumber(1234, 2));',
            },
            {
              label: "Handle zero and reject negative values",
              language: "javascript",
              code: 'function formatNumber(number, digits) {\n  if (\n    !Number.isSafeInteger(number) ||\n    number < 0 ||\n    !Number.isSafeInteger(digits) ||\n    digits < 0 ||\n    digits > 10000\n  )\n    throw new RangeError("Use a nonnegative safe integer and width 0–10000");\n  return String(number).padStart(digits, "0");\n}\nconsole.log(formatNumber(0, 3));\ntry {\n  formatNumber(-5, 3);\n} catch (error) {\n  console.log(error.name);\n}',
            },
          ],
        },
        {
          name: "Align left, right, and center",
          explanation: "Use padding for simple monospaced ASCII alignment.",
          note: "These helpers do not calculate visual width for emoji, combining marks, or East Asian text; center padding puts any extra space on the right.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart",
          examples: [
            {
              label: "Align the same short label",
              language: "javascript",
              code: 'const alignRight = (text, width) => text.padStart(width),\n  alignLeft = (text, width) => text.padEnd(width);\nfunction alignCenter(text, width) {\n  if (!Number.isSafeInteger(width) || width < 0 || width > 10000)\n    throw new RangeError("Invalid width");\n  const padding = Math.max(0, width - text.length),\n    left = Math.floor(padding / 2);\n  return " ".repeat(left) + text + " ".repeat(padding - left);\n}\nconsole.log(alignRight("Hi", 5), alignLeft("Hi", 5), alignCenter("Hi", 5));',
            },
            {
              label: "Keep overlong text and handle empty text",
              language: "javascript",
              code: 'const alignRight = (text, width) => text.padStart(width),\n  alignLeft = (text, width) => text.padEnd(width);\nfunction alignCenter(text, width) {\n  if (!Number.isSafeInteger(width) || width < 0 || width > 10000)\n    throw new RangeError("Invalid width");\n  const padding = Math.max(0, width - text.length),\n    left = Math.floor(padding / 2);\n  return " ".repeat(left) + text + " ".repeat(padding - left);\n}\nconsole.log(alignCenter("long", 2), alignCenter("", 3));',
            },
          ],
        },
        {
          name: "Create padded text tables",
          explanation:
            "Pad each cell to a chosen column width and join the cells with separators.",
          note: "Padding does not truncate overlong cells; consistent widths and a monospaced display are assumptions.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd",
          examples: [
            {
              label: "Render the supplied table",
              language: "javascript",
              code: 'const table = [\n  ["Name", "Age", "City"],\n  ["John", "30", "NYC"],\n  ["Jane", "25", "LA"],\n];\ntable.forEach((row) =>\n  console.log(\n    row.map((cell, index) => cell.padEnd(index === 0 ? 10 : 5)).join("|"),\n  ),\n);',
            },
            {
              label: "Convert numeric cells explicitly",
              language: "javascript",
              code: 'const row = ["John", 30];\nconsole.log(row.map((cell) => String(cell).padEnd(5)).join("|"));',
            },
          ],
        },
        {
          name: "formatTime() — padded time fields",
          explanation:
            "Pad validated hour, minute, and second fields to two digits and join them.",
          note: "Formatting is separate from date/timezone calculations; this helper rejects values outside the stated time-of-day range.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart",
          examples: [
            {
              label: "Format the supplied time",
              language: "javascript",
              code: 'function formatTime(hours, minutes, seconds) {\n  if (\n    ![hours, minutes, seconds].every(Number.isInteger) ||\n    hours < 0 ||\n    hours > 23 ||\n    minutes < 0 ||\n    minutes > 59 ||\n    seconds < 0 ||\n    seconds > 59\n  )\n    throw new RangeError("Invalid 24-hour time");\n  return [hours, minutes, seconds]\n    .map((value) => String(value).padStart(2, "0"))\n    .join(":");\n}\nconsole.log(formatTime(9, 5, 3), formatTime(23, 59, 59));',
            },
            {
              label: "Handle midnight and reject overflow",
              language: "javascript",
              code: 'function formatTime(hours, minutes, seconds) {\n  if (\n    ![hours, minutes, seconds].every(Number.isInteger) ||\n    hours < 0 ||\n    hours > 23 ||\n    minutes < 0 ||\n    minutes > 59 ||\n    seconds < 0 ||\n    seconds > 59\n  )\n    throw new RangeError("Invalid 24-hour time");\n  return [hours, minutes, seconds]\n    .map((value) => String(value).padStart(2, "0"))\n    .join(":");\n}\nconsole.log(formatTime(0, 0, 0));\ntry {\n  formatTime(24, 0, 0);\n} catch (error) {\n  console.log(error.name);\n}',
            },
          ],
        },
        {
          name: "toBinary() — minimum-width binary text",
          explanation:
            "Convert a nonnegative integer to radix two and zero-pad the result.",
          note: "The width is a minimum, not a fixed-size bit container; larger values are not truncated and signed two’s-complement encoding is not implemented.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart",
          examples: [
            {
              label: "Format the supplied binary values",
              language: "javascript",
              code: 'function toBinary(number, bits = 8) {\n  if (\n    !Number.isSafeInteger(number) ||\n    number < 0 ||\n    !Number.isSafeInteger(bits) ||\n    bits < 0 ||\n    bits > 10000\n  )\n    throw new RangeError("Invalid integer or width");\n  return number.toString(2).padStart(bits, "0");\n}\nconsole.log(toBinary(5), toBinary(255));',
            },
            {
              label: "Retain values wider than the requested width",
              language: "javascript",
              code: 'function toBinary(number, bits = 8) {\n  if (\n    !Number.isSafeInteger(number) ||\n    number < 0 ||\n    !Number.isSafeInteger(bits) ||\n    bits < 0 ||\n    bits > 10000\n  )\n    throw new RangeError("Invalid integer or width");\n  return number.toString(2).padStart(bits, "0");\n}\nconsole.log(toBinary(256, 8), toBinary(0));\ntry {\n  toBinary(-1);\n} catch (error) {\n  console.log(error.name);\n}',
            },
          ],
        },
        {
          name: "split() — literal separators and limits",
          explanation:
            "Split a string at a literal delimiter and optionally cap the returned array length.",
          note: "Limit discards later fields rather than retaining an unsplit tail. Missing separators return the whole string as one field.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Match the exact supplied delimiter",
              language: "javascript",
              code: 'const text = "apple,banana,orange";\nconsole.log(...text.split(","));\nconsole.log(...text.split(", "));',
            },
            {
              label: "Apply an output limit",
              language: "javascript",
              code: 'console.log(..."a,b,c,d".split(",", 2));\nconsole.log(..."a-b-c-d".split("-", 2));',
            },
          ],
        },
        {
          name: 'split("") — code-unit arrays',
          explanation:
            "Split on an empty string to obtain individual UTF-16 units.",
          note: "Splits supplementary characters into surrogate halves; spread and Array.from iterate code points instead of code units, but still do not segment graphemes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Split the supplied ASCII word",
              language: "javascript",
              code: 'console.log(..."hello".split(""));',
            },
            {
              label: "Observe the Unicode difference",
              language: "javascript",
              code: 'console.log("😀".split("").length, [..."😀"].length, "".split("").length);',
            },
          ],
        },
        {
          name: "split() — regex separators and captures",
          explanation:
            "Use a regex to split on variable patterns or alternative delimiter characters.",
          note: "No g flag is needed; captures add result elements and can also add undefined for absent alternative groups.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Split digit runs and several delimiter characters",
              language: "javascript",
              code: 'console.log(..."hello123world456".split(/\\d+/));\nconsole.log(..."apple,banana;orange|grape".split(/[,;|]/));',
            },
            {
              label: "Retain delimiters with a capture",
              language: "javascript",
              code: 'console.log(..."a,b;c".split(/([,;])/));',
            },
          ],
        },
        {
          name: "Split lines — LF, CRLF, and CR",
          explanation:
            "Recognize the common newline sequences with the longer CRLF alternative first.",
          note: "A final newline produces a final empty field; decide whether to retain it for the application.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Read the supplied mixed line endings",
              language: "javascript",
              code: 'console.log(..."line1\\nline2\\rline3\\r\\nline4".split(/\\r?\\n|\\r/));',
            },
            {
              label: "Keep a trailing empty line explicitly",
              language: "javascript",
              code: 'console.log(..."one\\r\\n".split(/\\r?\\n|\\r/));',
            },
          ],
        },
        {
          name: "Split into whitespace-separated words",
          explanation:
            "Use a whitespace-run separator when repeated spaces should count as one separator.",
          note: "Whitespace tokenization is not natural-language word segmentation; punctuation stays attached to tokens.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Compare literal spaces with whitespace runs",
              language: "javascript",
              code: 'console.log(..."Hello   World".split(" "));\nconsole.log(..."Hello   World".split(/\\s+/));',
            },
            {
              label: "Handle tabs, line breaks, and edges",
              language: "javascript",
              code: 'console.log(..."  Hello\\tWorld\\n".trim().split(/\\s+/));',
            },
          ],
        },
        {
          name: "join() — array values to a string",
          explanation: "Join array elements with a chosen separator.",
          note: "join is an Array method. Empty arrays produce an empty string, while null and undefined elements contribute empty fields.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join",
          examples: [
            {
              label: "Join the supplied values and a default separator",
              language: "javascript",
              code: 'console.log(["a", "b"].join("-"), ["a", "b"].join());',
            },
            {
              label: "Observe empty values and empty arrays",
              language: "javascript",
              code: 'console.log(["a", null, undefined, "b"].join("|"), [].join("-"));',
            },
          ],
        },
        {
          name: "Filter empty split fields",
          explanation:
            "Use filter(Boolean) to remove empty strings when blanks carry no information.",
          note: 'On string-only results, "0" and a space remain truthy. Filtering blanks loses original field positions.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Remove the supplied empty fields",
              language: "javascript",
              code: 'console.log(..."a,,b,,c".split(",").filter(Boolean));',
            },
            {
              label: "Retain nonempty zero and space fields",
              language: "javascript",
              code: 'console.log(...",0,, ,".split(",").filter(Boolean));',
            },
          ],
        },
        {
          name: "Parse an explicitly unquoted CSV subset",
          explanation: "Split rows into lines and each line at commas.",
          note: "Not a CSV parser: quoted commas, escaped quotes, and multiline fields require a dedicated parser. Here each sample value is unquoted.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Parse the supplied unquoted table",
              language: "javascript",
              code: 'const csv = "name,age,city\\nJohn,30,NYC\\nJane,25,LA";\nconsole.log(JSON.stringify(csv.split(/\\r?\\n/).map((row) => row.split(","))));',
            },
            {
              label: "Expose the quoted-comma limitation",
              language: "javascript",
              code: 'console.log(...\'name,"last, first",age\'.split(","));',
            },
          ],
        },
        {
          name: "Extract path segments",
          explanation:
            "Split a controlled path string at slashes and remove blank segments.",
          note: "This does not parse a complete URL, percent-decode segments, or preserve meaningful empty path components.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Read the supplied path",
              language: "javascript",
              code: 'console.log(..."/users/profile/settings".split("/").filter(Boolean));',
            },
            {
              label: "Normalize repeated slashes under the stated rule",
              language: "javascript",
              code: 'console.log(..."//users///settings/".split("/").filter(Boolean));\nconsole.log("/".split("/").filter(Boolean).length);',
            },
          ],
        },
        {
          name: "Parse query fields — split versus URLSearchParams",
          explanation:
            "Use split only for the supplied simple unencoded query, or URLSearchParams for real query encoding and repeated fields.",
          note: 'Object.fromEntries keeps only the last duplicate key. URLSearchParams decodes percent escapes and plus signs; a naive pair.split("=") loses later equals signs.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Read the supplied unencoded query",
              language: "javascript",
              code: 'const query = "name=John&age=30&city=NYC";\nconst data = Object.fromEntries(\n  query.split("&").map((pair) => pair.split("=")),\n);\nconsole.log(data.name, data.age, data.city);',
            },
            {
              label: "Decode real query syntax without losing repeated values",
              language: "javascript",
              code: 'const params = new URLSearchParams("q=A%2BB+%26+C&value=a=b&tag=one&tag=two");\nconsole.log(\n  params.get("q"),\n  params.get("value"),\n  params.getAll("tag").join("|"),\n);',
            },
          ],
        },
        {
          name: "wordCount() — whitespace token count",
          explanation:
            "Trim input and count nonempty whitespace-delimited tokens.",
          note: "Counts tokens rather than linguistic words; punctuation, scripts without whitespace, and grapheme sequences need other rules.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Count the supplied and mixed-whitespace text",
              language: "javascript",
              code: 'const wordCount = (text) => {\n  const trimmed = text.trim();\n  return trimmed === "" ? 0 : trimmed.split(/\\s+/).length;\n};\nconsole.log(wordCount("Hello World"), wordCount(" Hello\\tWorld\\nagain "));',
            },
            {
              label: "Handle empty and blank input",
              language: "javascript",
              code: 'const wordCount = (text) => {\n  const trimmed = text.trim();\n  return trimmed === "" ? 0 : trimmed.split(/\\s+/).length;\n};\nconsole.log(wordCount(""), wordCount(" \\n\\t "));',
            },
          ],
        },
        {
          name: "reverseWords() — reverse space-separated fields",
          explanation:
            "Split on literal spaces, reverse the fields, and join with spaces.",
          note: "Retains empty fields from repeated or edge spaces, so their positions move with the reversal. It does not reverse letters or normalize all whitespace.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Reverse the supplied two words",
              language: "javascript",
              code: 'const reverseWords = (text) => text.split(" ").reverse().join(" ");\nconsole.log(reverseWords("Hello World"));',
            },
            {
              label: "Show empty-field behavior",
              language: "javascript",
              code: 'const reverseWords = (text) => text.split(" ").reverse().join(" ");\nconsole.log(reverseWords(" Hello  World "), reverseWords(""));',
            },
          ],
        },
        {
          name: "capitalizeWords() — preserve spaces and empty fields",
          explanation:
            "Uppercase the first position of each literal-space-delimited field while keeping the remainder.",
          note: "Preserves existing internal case and spacing; not language-aware title casing or grapheme-aware capitalization.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Capitalize the supplied words",
              language: "javascript",
              code: 'const capitalizeWords = (text) =>\n  text\n    .split(" ")\n    .map((word) =>\n      word === "" ? "" : word.charAt(0).toUpperCase() + word.slice(1),\n    )\n    .join(" ");\nconsole.log(capitalizeWords("hello world"));',
            },
            {
              label: "Handle repeated spaces and an empty string",
              language: "javascript",
              code: 'const capitalizeWords = (text) =>\n  text\n    .split(" ")\n    .map((word) =>\n      word === "" ? "" : word.charAt(0).toUpperCase() + word.slice(1),\n    )\n    .join(" ");\nconsole.log(capitalizeWords("  hello   WORLD "), capitalizeWords(""));',
            },
          ],
        },
        {
          name: "extractHashtags() — whitespace token convention",
          explanation:
            "Select whitespace tokens starting with a hash and remove the hash.",
          note: "The helper excludes a bare hash but retains punctuation and any additional hashes; it is not a social platform’s full hashtag grammar.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Extract the supplied tags",
              language: "javascript",
              code: 'const extractHashtags = (text) =>\n  text\n    .split(/\\s+/)\n    .filter((word) => word.startsWith("#") && word.length > 1)\n    .map((tag) => tag.slice(1));\nconsole.log(...extractHashtags("Hello #world #javascript"));',
            },
            {
              label: "Handle blank input and expose punctuation behavior",
              language: "javascript",
              code: 'const extractHashtags = (text) =>\n  text\n    .split(/\\s+/)\n    .filter((word) => word.startsWith("#") && word.length > 1)\n    .map((tag) => tag.slice(1));\nconsole.log(extractHashtags("").length, extractHashtags("#").length);\nconsole.log(...extractHashtags("#world! ##tag"));',
            },
          ],
        },
      ],
    },
    {
      name: "String Formatting",
      id: "string-formatting",
      intro:
        "Repetition and concatenation → Unicode normalization and locale operations → template literals and String.raw, following all ten images. Run each snippet independently in a current browser or Node.js with the demonstrated locale data. Examples state width limits, avoid universal timing claims, compare collation signs, and separate formatting from escaping or database parameterization.",
      methods: [
        {
          name: "repeat() — repeat string content",
          explanation:
            "Return the string repeated the requested number of times.",
          note: "Count is converted to an integer; a negative integer or Infinity throws RangeError. Avoid relying on engine-specific maximum string lengths.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat",
          examples: [
            {
              label: "Repeat the supplied short strings",
              language: "javascript",
              code: 'console.log("ab".repeat(3), "x".repeat(3), "Hi".repeat(2), "*".repeat(10));',
            },
            {
              label: "Check zero, fractional, and invalid counts",
              language: "javascript",
              code: 'console.log("abc".repeat(0), "abc".repeat(2.5));\ntry {\n  "abc".repeat(-1);\n} catch (error) {\n  console.log(error.name);\n}\ntry {\n  "x".repeat(Infinity);\n} catch (error) {\n  console.log(error.name);\n}',
            },
          ],
        },
        {
          name: "Separator lines and indent()",
          explanation:
            "Use repetition for a separator or a fixed two-space indentation unit.",
          note: "This helper splits LF lines and indents blank lines too; it is text formatting rather than code-aware reindentation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat",
          examples: [
            {
              label: "Create a separator and indent lines",
              language: "javascript",
              code: 'function indent(text, level) {\n  if (!Number.isSafeInteger(level) || level < 0 || level > 1000)\n    throw new RangeError("Use an indentation level from 0 to 1000");\n  const spaces = " ".repeat(level * 2);\n  return text\n    .split("\\n")\n    .map((line) => spaces + line)\n    .join("\\n");\n}\nconst separator = "-".repeat(50);\nconsole.log(separator.length, separator === "-".repeat(50));\nconsole.log(indent("one\\ntwo", 1));',
            },
            {
              label: "Handle zero indentation and invalid levels",
              language: "javascript",
              code: 'function indent(text, level) {\n  if (!Number.isSafeInteger(level) || level < 0 || level > 1000)\n    throw new RangeError("Use an indentation level from 0 to 1000");\n  const spaces = " ".repeat(level * 2);\n  return text\n    .split("\\n")\n    .map((line) => spaces + line)\n    .join("\\n");\n}\nconsole.log(indent("one\\ntwo", 0));\ntry {\n  indent("text", -1);\n} catch (error) {\n  console.log(error.name);\n}',
            },
          ],
        },
        {
          name: "leftPad() — bounded repeat-based padding",
          explanation:
            "Adds padding at the start until the minimum length is reached. Leaves longer text unchanged.",
          note: "This helper deliberately requires one UTF-16 padding unit. For arbitrary padding strings, native padStart repeats and truncates the fill to fit.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat",
          examples: [
            {
              label: "Pad and retain overlong input",
              language: "javascript",
              code: 'function leftPad(text, length, char = " ") {\n  if (\n    !Number.isSafeInteger(length) ||\n    length < 0 ||\n    length > 10000 ||\n    char.length !== 1\n  )\n    throw new RangeError("Use width 0–10000 and one UTF-16 padding unit");\n  return char.repeat(Math.max(0, length - text.length)) + text;\n}\nconsole.log(leftPad("5", 3, "0"), leftPad("hello", 3));',
            },
            {
              label: "Use spaces and reject multi-unit padding",
              language: "javascript",
              code: 'function leftPad(text, length, char = " ") {\n  if (\n    !Number.isSafeInteger(length) ||\n    length < 0 ||\n    length > 10000 ||\n    char.length !== 1\n  )\n    throw new RangeError("Use width 0–10000 and one UTF-16 padding unit");\n  return char.repeat(Math.max(0, length - text.length)) + text;\n}\nconsole.log(leftPad("Hi", 5));\ntry {\n  leftPad("Hi", 8, "ab");\n} catch (error) {\n  console.log(error.name);\n}',
            },
          ],
        },
        {
          name: "progressBar() — clamped text progress",
          explanation:
            "Builds a text progress bar, keeping the percentage between 0 and 100.",
          note: "The block characters each occupy one UTF-16 unit, but their rendered width depends on the font. This is a text indicator, not a browser progress control.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat",
          examples: [
            {
              label: "Render the supplied percentage",
              language: "javascript",
              code: 'function progressBar(percent, width = 20) {\n  if (\n    !Number.isFinite(percent) ||\n    !Number.isSafeInteger(width) ||\n    width < 1 ||\n    width > 1000\n  )\n    throw new RangeError("Use a finite percentage and width 1–1000");\n  const value = Math.max(0, Math.min(100, percent)),\n    count = Math.floor((value / 100) * width);\n  return (\n    "[" + "█".repeat(count) + "░".repeat(width - count) + "] " + value + "%"\n  );\n}\nconsole.log(progressBar(75, 4));\nconsole.log(progressBar(75).length);',
            },
            {
              label: "Handle out-of-range and invalid values",
              language: "javascript",
              code: 'function progressBar(percent, width = 20) {\n  if (\n    !Number.isFinite(percent) ||\n    !Number.isSafeInteger(width) ||\n    width < 1 ||\n    width > 1000\n  )\n    throw new RangeError("Use a finite percentage and width 1–1000");\n  const value = Math.max(0, Math.min(100, percent)),\n    count = Math.floor((value / 100) * width);\n  return (\n    "[" + "█".repeat(count) + "░".repeat(width - count) + "] " + value + "%"\n  );\n}\nconsole.log(progressBar(-5, 4), progressBar(150, 4));\ntry {\n  progressBar(NaN);\n} catch (error) {\n  console.log(error.name);\n}',
            },
          ],
        },
        {
          name: "Plus operator and concat()",
          explanation:
            "Use + or concat to combine strings and explicit separators.",
          note: "The + operator also performs numeric addition depending on its operands; concat converts its arguments to strings. Neither inserts spaces automatically.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat",
          examples: [
            {
              label: "Combine the supplied greeting",
              language: "javascript",
              code: 'const first = "Hello",\n  second = "World";\nconsole.log(\n  first + " " + second,\n  first.concat(" ", second),\n  first.concat(" ", second, "!"),\n);',
            },
            {
              label: "Observe conversion and addition order",
              language: "javascript",
              code: 'console.log(1 + 2 + "x", "x" + 1 + 2, "".concat(1, 2));',
            },
          ],
        },
        {
          name: "Template interpolation and array joining",
          explanation:
            "Use a template literal for named values or join for a list of string parts.",
          note: "Templates interpolate expressions rather than evaluating text as code. join follows array stringification rules.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
          examples: [
            {
              label: "Use the supplied greeting forms",
              language: "javascript",
              code: 'const first = "Hello",\n  second = "World";\nconsole.log(`${first} ${second}`, [first, second].join(" "));',
            },
            {
              label: "Interpolate values and expressions",
              language: "javascript",
              code: 'const name = "John",\n  age = 30;\nconsole.log(`Hello, ${name}! You are ${age} years old.`);\nconsole.log(\n  `2 + 2 = ${2 + 2}`,\n  `Uppercase: ${name.toUpperCase()}`,\n  `Ternary: ${age >= 18 ? "Adult" : "Minor"}`,\n);',
            },
          ],
        },
        {
          name: "Build repeated output without performance assumptions",
          explanation:
            "Choose repeat for uniform repetition or accumulate parts and join for separately generated pieces.",
          note: "Modern engines may optimize concatenation; loop +, concat, templates, and join do not have one universal speed ranking. The examples assert behavior, not timing.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat",
          examples: [
            {
              label: "Compare the supplied thousand-character constructions",
              language: "javascript",
              code: 'let joinedByPlus = "";\nfor (let i = 0; i < 1000; i++) joinedByPlus += "x";\nconst parts = [];\nfor (let i = 0; i < 1000; i++) parts.push("x");\nconst joined = parts.join("");\nconsole.log(\n  joinedByPlus.length,\n  joined === joinedByPlus,\n  joined === "x".repeat(1000),\n);',
            },
            {
              label: "Join separately generated pieces",
              language: "javascript",
              code: 'const parts = [];\nfor (let i = 1; i <= 3; i++) parts.push("item" + i);\nconsole.log(parts.join(", "));',
            },
          ],
        },
        {
          name: "Multiline template strings",
          explanation:
            "Write literal line breaks in a template to preserve multiline layout.",
          note: "Leading/trailing newlines and indentation are part of the string. Interpolation into HTML is not automatically escaped.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
          examples: [
            {
              label: "Build the supplied multiline message",
              language: "javascript",
              code: 'const name = "John",\n  age = 30;\nconst message = `Dear ${name},\n\nThis is a multi-line message.\nYou are ${age} years old.\n\nBest regards`;\nconsole.log(message);',
            },
            {
              label: "Inspect preserved indentation and edge newlines",
              language: "javascript",
              code: 'const message = `\n  Line 1\n  Line 2\n`;\nconsole.log(\n  message.startsWith("\\n  "),\n  message.endsWith("\\n"),\n  message.split("\\n").length,\n);',
            },
          ],
        },
        {
          name: "Tagged templates — highlight interpolated text",
          explanation:
            "Receive literal fragments and values in a tag function and produce an explicit output format.",
          note: "This tag escapes text fragments and values before adding mark elements. It is text-to-HTML formatting, not a generic HTML template system.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
          examples: [
            {
              label: "Highlight the supplied values",
              language: "javascript",
              code: 'const escapeText = (text) =>\n  String(text)\n    .replace(/&/g, "&amp;")\n    .replace(/</g, "&lt;")\n    .replace(/>/g, "&gt;");\nfunction highlight(strings, ...values) {\n  return strings.reduce(\n    (result, part, index) =>\n      result +\n      escapeText(part) +\n      (index < values.length\n        ? "<mark>" + escapeText(values[index]) + "</mark>"\n        : ""),\n    "",\n  );\n}\nconst name = "John",\n  age = 30;\nconsole.log(highlight`Hello ${name}, you are ${age}`);',
            },
            {
              label: "Keep falsy values and escape markup",
              language: "javascript",
              code: 'const escapeText = (text) =>\n  String(text)\n    .replace(/&/g, "&amp;")\n    .replace(/</g, "&lt;")\n    .replace(/>/g, "&gt;");\nfunction highlight(strings, ...values) {\n  return strings.reduce(\n    (result, part, index) =>\n      result +\n      escapeText(part) +\n      (index < values.length\n        ? "<mark>" + escapeText(values[index]) + "</mark>"\n        : ""),\n    "",\n  );\n}\nconsole.log(highlight`${0}|${false}|${""}|${"<img>"}`);',
            },
          ],
        },
        {
          name: "normalize() — NFC and NFD",
          explanation:
            "Gives equivalent Unicode text a consistent form so it can be compared.",
          note: "This changes Unicode representation, not byte encoding. It does not remove accents, fold case, or guarantee that visually similar text is equal.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize",
          examples: [
            {
              label: "Compare explicit composed and decomposed values",
              language: "javascript",
              code: 'const composed = "\\u00e9",\n  decomposed = "e\\u0301";\nconsole.log(\n  composed === decomposed,\n  composed.normalize() === decomposed.normalize(),\n);\nconsole.log(composed.normalize("NFC").length, composed.normalize("NFD").length);',
            },
            {
              label: "Normalize the supplied user-input example",
              language: "javascript",
              code: 'const first = "caf\\u00e9",\n  second = "cafe\\u0301";\nconsole.log(\n  first === second,\n  first.normalize("NFC") === second.normalize("NFC"),\n  first,\n);',
            },
          ],
        },
        {
          name: "normalize() — NFKC and NFKD",
          explanation:
            "Normalizes Unicode text while also merging compatibility differences, such as ligatures.",
          note: "Compatibility normalization can lose meaningful formatting distinctions. Preserve original text where those distinctions matter.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize",
          examples: [
            {
              label: "Compare canonical and compatibility forms",
              language: "javascript",
              code: 'console.log("ﬀ".normalize("NFC"), "ﬀ".normalize("NFKC"), "①".normalize("NFKD"));',
            },
            {
              label: "Handle an invalid normalization name",
              language: "javascript",
              code: 'console.log("é".normalize("NFKD") === "e\\u0301");\ntry {\n  "text".normalize("INVALID");\n} catch (error) {\n  console.log(error.name);\n}',
            },
          ],
        },
        {
          name: "localeCompare() — compare by locale",
          explanation:
            "Compares text using a language’s sorting rules. A negative result sorts before; a positive result sorts after.",
          note: "Only negative, zero, or positive is guaranteed, not exactly -1 or 1. Explicit locales make the demonstrated intent clearer than relying on the runtime default.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare",
          examples: [
            {
              label: "Check basic comparison signs",
              language: "javascript",
              code: 'console.log(\n  "a".localeCompare("b", "en") < 0,\n  "b".localeCompare("a", "en") > 0,\n  "a".localeCompare("a", "en") === 0,\n);',
            },
            {
              label: "Compare the supplied English and Swedish order",
              language: "javascript",
              code: 'console.log("ä".localeCompare("z", "en") < 0, "ä".localeCompare("z", "sv") > 0);',
            },
          ],
        },
        {
          name: "localeCompare() numeric and sensitivity options",
          explanation:
            "Sorts number parts numerically and lets you choose whether case and accents matter.",
          note: "Comparison equality at a chosen sensitivity is not the same as identical string content. Locale data can differ across runtime versions.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare",
          examples: [
            {
              label: "Compare numeric labels and base-level text",
              language: "javascript",
              code: 'const options = { numeric: true, sensitivity: "base" };\nconsole.log(\n  "item2".localeCompare("item10", "en", options) < 0,\n  "a".localeCompare("A", "en", { sensitivity: "base" }) === 0,\n);',
            },
            {
              label: "Sort the supplied Swedish names",
              language: "javascript",
              code: 'const names = ["Åsa", "Örjan", "Andreas"];\nnames.sort((a, b) => a.localeCompare(b, "sv"));\nconsole.log(...names);',
            },
          ],
        },
        {
          name: "toLocaleLowerCase() and toLocaleUpperCase()",
          explanation: "Convert case according to an explicit locale.",
          note: "Default casing is not Turkish-specific. Casing can change string length, and the transformations are not generally reversible.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleLowerCase",
          examples: [
            {
              label: "Compare Turkish lowercase with default Unicode lowercase",
              language: "javascript",
              code: 'const text = "İstanbul";\nconsole.log(\n  text.toLowerCase() === "i\\u0307stanbul",\n  text.toLocaleLowerCase("tr-TR"),\n);',
            },
            {
              label: "Choose Turkish and English uppercase mappings",
              language: "javascript",
              code: 'console.log("i".toLocaleUpperCase("tr-TR"), "i".toLocaleUpperCase("en-US"));',
            },
          ],
        },
        {
          name: "Intl.Collator — reusable locale comparison",
          explanation:
            "Creates a reusable text comparer with chosen language and sorting rules.",
          note: "The comparator returns a sign, not a guaranteed unit value. Array.sort mutates its input, so a helper can copy the input when preservation is intended.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator",
          examples: [
            {
              label: "Use the supplied German and numeric examples",
              language: "javascript",
              code: 'const german = new Intl.Collator("de-DE");\nconsole.log(german.compare("ä", "z") < 0);\nconst collator = new Intl.Collator("en", {\n  numeric: true,\n  sensitivity: "accent",\n});\nconst items = ["item10", "item2", "item1"];\nitems.sort(collator.compare);\nconsole.log(...items);',
            },
            {
              label: "Reuse a collator while preserving source order",
              language: "javascript",
              code: 'const collator = new Intl.Collator("sv");\nconst sortNames = (names) => names.slice().sort(collator.compare);\nconst names = ["Åsa", "Örjan", "Andreas"];\nconsole.log(...sortNames(names));\nconsole.log(...names);',
            },
          ],
        },
        {
          name: "Template literals — expressions and text layout",
          explanation:
            "Interpolate expressions in a backtick-delimited string and preserve its literal newlines.",
          note: "Template interpolation performs string conversion, not HTML escaping or data binding. Variables and expressions are evaluated in the surrounding JavaScript context.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
          examples: [
            {
              label: "Format the supplied user and expressions",
              language: "javascript",
              code: 'const user = "Alice",\n  age = 30;\nconsole.log(`User ${user} is ${age} years old`);\nconsole.log(`2 + 2 = ${2 + 2}`, `Uppercase: ${user.toUpperCase()}`);',
            },
            {
              label: "Preserve multiline content",
              language: "javascript",
              code: 'const multiline = `Line 1\nLine 2\nLine 3`;\nconsole.log(multiline.split("\\n").length, multiline);',
            },
          ],
        },
        {
          name: "String.raw — preserve literal backslash sequences",
          explanation:
            "Keeps backslash sequences in template text instead of turning them into escapes.",
          note: "Substitutions are still evaluated and inserted; String.raw does not make substituted text safe for HTML, SQL, or regex embedding. Actual source line breaks remain actual line breaks.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw",
          examples: [
            {
              label: "Compare cooked escapes and raw spelling",
              language: "javascript",
              code: 'const normal = `Line 1\\nLine 2\\tTabbed`,\n  raw = String.raw`Line 1\\nLine 2\\tTabbed`;\nconsole.log(normal.includes("\\n"), raw.includes("\\n"), raw);',
            },
            {
              label: "Keep a path while processing substitutions",
              language: "javascript",
              code: 'const folder = "Documents";\nconst path = String.raw`C:\\Users\\Documents\\file.txt`;\nconsole.log(path);\nconst newline = "\\n";\nconsole.log(String.raw`${newline}`.length);',
            },
          ],
        },
        {
          name: "String.raw for regular-expression source",
          explanation:
            "Keeps regex backslashes intact when writing a pattern in a template string.",
          note: "Raw templates do not escape interpolated literals; use RegExp.escape when inserting text that must not be regex syntax.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw",
          examples: [
            {
              label: "Build the supplied phone-shaped pattern",
              language: "javascript",
              code: 'const source = String.raw`\\d{3}-\\d{3}-\\d{4}`;\nconst regex = new RegExp("^" + source + "$");\nconsole.log(regex.test("123-456-7890"), regex.test("1234567890"));',
            },
            {
              label: "Read the preserved source explicitly",
              language: "javascript",
              code: 'const source = String.raw`\\d+`;\nconsole.log(source === "\\\\d+", new RegExp(source).exec("id42")[0]);',
            },
          ],
        },
        {
          name: "Custom raw tag — query text versus bound values",
          explanation:
            "Pass a template’s raw fragments and substitutions to String.raw for explicit text formatting.",
          note: "The raw sql formatter below only logs fixed demo data; it is not SQL parameterization. Identifiers such as table names cannot generally be bound as values, and actual execution requires the database driver’s parameter API.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw",
          examples: [
            {
              label: "Reproduce fixed demonstration query text",
              language: "javascript",
              code: 'function sql(strings, ...values) {\n  return String.raw(strings, ...values);\n}\nconst table = "users",\n  id = 123;\nconsole.log(sql`SELECT * FROM ${table} WHERE id = ${id}`);',
            },
            {
              label: "Keep query values separate from query text",
              language: "javascript",
              code: 'function sql(strings, ...values) {\n  let text = strings[0];\n  for (let i = 0; i < values.length; i++) text += "?" + strings[i + 1];\n  return { text, values };\n}\nconst id = "123 OR 1=1";\nconst query = sql`SELECT * FROM users WHERE id = ${id}`;\nconsole.log(query.text, query.values[0]);',
            },
          ],
        },
      ],
    },
    {
      name: "Regular Expressions",
      id: "string-regular-expressions",
      intro:
        "Regex string methods, match records, boolean checks, and the supplied extraction and cleanup helpers, following all four images. Each example runs independently; format checks state their limits.",
      methods: [
        {
          name: "match() — first match, groups, and global matches",
          explanation:
            "Returns the first match with its groups, or all full matches with g. Returns null if nothing matches.",
          note: "Run each example independently.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match",
          examples: [
            {
              label: "Find the first phone-shaped sequence",
              language: "javascript",
              code: 'const text = "Phone: 123-456-7890, Fax: 098-765-4321";\nconst match = text.match(/\\d{3}-\\d{3}-\\d{4}/);\nconsole.log(match[0], match.index);',
            },
            {
              label: "Collect all matches and handle absence",
              language: "javascript",
              code: 'const text = "123-456-7890, 098-765-4321";\nconsole.log(...text.match(/\\d{3}-\\d{3}-\\d{4}/g));\nconsole.log(text.match(/notfound/));',
            },
            {
              label: "Read captured address pieces",
              language: "javascript",
              code: 'const result = "john.doe@example.com".match(/([^@]+)@([^@]+)/);\nconsole.log(result[0], result[1], result[2]);',
            },
          ],
        },
        {
          name: "search() — find the first matching index",
          explanation: "Return the first matching index or -1.",
          note: "The index counts UTF-16 code units.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search",
          examples: [
            {
              label: "Locate digits",
              language: "javascript",
              code: 'console.log("item42".search(/\\d+/));',
            },
            {
              label: "Handle a missing pattern",
              language: "javascript",
              code: 'console.log("plain".search(/\\d/));',
            },
          ],
        },
        {
          name: "replace() — transform regex matches",
          explanation:
            "Return a new string with the first match replaced, or every match when the pattern has g.",
          note: "The input string remains unchanged.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Replace all occurrences",
              language: "javascript",
              code: 'console.log("old and old".replace(/old/g, "new"));',
            },
            {
              label: "Transform numbers",
              language: "javascript",
              code: 'console.log("2 plus 3".replace(/\\d+/g, (n) => Number(n) * 2));',
            },
          ],
        },
        {
          name: "split() — divide by a pattern",
          explanation: "Return an array separated at regex matches.",
          note: "Captured separators become additional array elements.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Split multiple delimiters",
              language: "javascript",
              code: 'console.log(..."apple,banana;orange".split(/[,;]/));',
            },
            {
              label: "Keep separators",
              language: "javascript",
              code: 'console.log(..."a,b;c".split(/([,;])/));',
            },
          ],
        },
        {
          name: "matchAll() — all matches with capture groups",
          explanation:
            "Iterate full match records containing captures and indices.",
          note: "A RegExp argument must have the g flag.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll",
          examples: [
            {
              label: "Inspect captures and positions",
              language: "javascript",
              code: 'for (const match of "test1 test2 test3".matchAll(/test(\\d)/g)) {\n  console.log(match[0], match[1], match.index);\n}',
            },
            {
              label: "Collect matches or an empty result",
              language: "javascript",
              code: 'const matches = [..."test1 test2".matchAll(/test(\\d)/g)];\nconsole.log(\n  matches.map((m) => m[1]).join(","),\n  [..."none".matchAll(/test(\\d)/g)].length,\n);',
            },
          ],
        },
        {
          name: "RegExp.test() — boolean checks",
          explanation: "Return whether a pattern matches.",
          note: "Unlike string methods, test belongs to RegExp. Patterns with g or y keep lastIndex state; avoid those flags for independent boolean checks.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test",
          examples: [
            {
              label: "Check for digits",
              language: "javascript",
              code: 'const str = "item42";\nconsole.log(/\\d/.test(str), /\\d/.test("plain"));',
            },
            {
              label: "Check the supplied ASCII email shape",
              language: "javascript",
              code: 'const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;\nconsole.log(pattern.test("user@example.com"), pattern.test("invalid.email"));',
            },
          ],
        },
        {
          name: "isEmail() — basic address shape",
          explanation:
            "Checks a simple email-like format. It does not check whether the address exists.",
          note: "This does not establish RFC validity, deliverability, or ownership. The quick-reference /^[^@]+@[^@]+$/ only checks an even looser shape.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match",
          examples: [
            {
              label: "Check typical inputs",
              language: "javascript",
              code: 'const isEmail = (str) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(str);\nconsole.log(isEmail("test@email.com"), isEmail("invalid.email"));',
            },
            {
              label: "Reject spaces and explain the loose quick check",
              language: "javascript",
              code: 'const isEmail = (str) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(str);\nconsole.log(\n  isEmail("a b@example.com"),\n  /^[^@]+@[^@]+$/.test("a@b"),\n  isEmail("a@b"),\n);',
            },
          ],
        },
        {
          name: "isPhone() — permitted phone characters",
          explanation:
            "Checks allowed phone characters, not whether the number is valid.",
          note: "The supplied pattern accepts punctuation alone and unbalanced parentheses; it does not validate a telephone number.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match",
          examples: [
            {
              label: "Check the allowed character set",
              language: "javascript",
              code: 'const isPhone = (str) => /^\\+?[\\d\\s()-]+$/.test(str);\nconsole.log(isPhone("+1 (123) 456-7890"), isPhone("call me"));',
            },
            {
              label: "Expose the filter limitations",
              language: "javascript",
              code: 'const isPhone = (str) => /^\\+?[\\d\\s()-]+$/.test(str);\nconsole.log(isPhone("---"), isPhone("((123"), isPhone(""));',
            },
          ],
        },
        {
          name: "isURL() — limited shape and URL parsing",
          explanation:
            "Compares a simple URL-shaped pattern with parsing a URL and checking its protocol.",
          note: "Neither a regex match nor successful parsing proves a destination exists or is safe to access.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match",
          examples: [
            {
              label: "Check the supplied restricted shape",
              language: "javascript",
              code: 'const isURL = (str) =>\n  /^(https?:\\/\\/)?([\\w-]+\\.)+[\\w-]+(\\/[\\w./?%&=-]*)?$/.test(str);\nconsole.log(\n  isURL("https://example.com/path"),\n  isURL("example.com"),\n  isURL("not a url"),\n);',
            },
            {
              label: "Require an absolute HTTP or HTTPS URL",
              language: "javascript",
              code: 'const isURL = (str) => {\n  try {\n    const url = new URL(str);\n    return ["http:", "https:"].includes(url.protocol);\n  } catch {\n    return false;\n  }\n};\nconsole.log(\n  isURL("https://example.com"),\n  isURL("example.com"),\n  isURL("ftp://example.com"),\n);',
            },
          ],
        },
        {
          name: "extractURLs() — collect HTTP-like substrings",
          explanation:
            "Collects text starting with http:// or https://. Returns an empty array when none is found.",
          note: "Trailing punctuation is included by this simple pattern; it is an extractor rather than a URL validator.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match",
          examples: [
            {
              label: "Extract two links",
              language: "javascript",
              code: 'const extractURLs = (text) => text.match(/https?:\\/\\/[^\\s]+/g) || [];\nconsole.log(...extractURLs("See https://example.com and http://example.org/a"));',
            },
            {
              label: "Show punctuation and no-match behavior",
              language: "javascript",
              code: 'const extractURLs = (text) => text.match(/https?:\\/\\/[^\\s]+/g) || [];\nconsole.log(\n  extractURLs("See https://example.com.")[0],\n  extractURLs("no links").length,\n);',
            },
          ],
        },
        {
          name: "extractHashtags() — ASCII word tags",
          explanation: "Collect hash-prefixed word-character sequences.",
          note: "The returned tags retain #. JavaScript \\w covers ASCII letters, digits, and underscore, not all Unicode letters.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match",
          examples: [
            {
              label: "Extract tags",
              language: "javascript",
              code: 'const extractHashtags = (text) => text.match(/#\\w+/g) || [];\nconsole.log(...extractHashtags("Hello #world #javascript"));',
            },
            {
              label: "Handle no tags and underscores",
              language: "javascript",
              code: 'const extractHashtags = (text) => text.match(/#\\w+/g) || [];\nconsole.log(\n  extractHashtags("plain").length,\n  extractHashtags("#hello_world")[0],\n);',
            },
          ],
        },
        {
          name: "extractMentions() — ASCII mention substrings",
          explanation: "Collect @ followed by word characters.",
          note: "It also finds substrings inside email addresses and stops at punctuation; it is not a platform-specific mention parser.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match",
          examples: [
            {
              label: "Extract mentions",
              language: "javascript",
              code: 'const extractMentions = (text) => text.match(/@\\w+/g) || [];\nconsole.log(...extractMentions("Hi @alice and @bob_2"));',
            },
            {
              label: "Show email overlap and absence",
              language: "javascript",
              code: 'const extractMentions = (text) => text.match(/@\\w+/g) || [];\nconsole.log(\n  extractMentions("a@example.com")[0],\n  extractMentions("plain").length,\n);',
            },
          ],
        },
        {
          name: "stripHtml() — a simple tag-shaped text demo",
          explanation:
            "Removes simple tag-shaped text. It is not an HTML parser or sanitizer.",
          note: "This is not an HTML parser or sanitizer; quoted > characters and HTML syntax defeat the pattern.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Remove simple tag-shaped fragments",
              language: "javascript",
              code: 'const stripHtml = (html) => html.replace(/<[^>]*>/g, "");\nconsole.log(stripHtml("<b>Hello</b> <i>world</i>"));',
            },
            {
              label: "Demonstrate a quoted-angle limitation",
              language: "javascript",
              code: 'const stripHtml = (html) => html.replace(/<[^>]*>/g, "");\nconsole.log(stripHtml(\'<span title=">">hello</span>\'));',
            },
          ],
        },
        {
          name: "validatePassword() — report individual rules",
          explanation:
            "Return a boolean for each supplied length, case, digit, and special-character rule.",
          note: "These are policy checks rather than a strength estimate. The length rule here counts Unicode code points across the entire input, including line breaks.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test",
          examples: [
            {
              label: "Report all passing rules",
              language: "javascript",
              code: 'const validatePassword = (password) => {\n  const patterns = {\n    minLength: /^[\\s\\S]{8,}$/u,\n    hasUpper: /[A-Z]/,\n    hasLower: /[a-z]/,\n    hasNumber: /\\d/,\n    hasSpecial: /[!@#$%^&*]/,\n  };\n  return Object.fromEntries(\n    Object.entries(patterns).map(([key, pattern]) => [\n      key,\n      pattern.test(password),\n    ]),\n  );\n};\nconsole.log(...Object.values(validatePassword("Abcdef1!")));',
            },
            {
              label: "Report missing requirements",
              language: "javascript",
              code: 'const validatePassword = (password) => {\n  const patterns = {\n    minLength: /^[\\s\\S]{8,}$/u,\n    hasUpper: /[A-Z]/,\n    hasLower: /[a-z]/,\n    hasNumber: /\\d/,\n    hasSpecial: /[!@#$%^&*]/,\n  };\n  return Object.fromEntries(\n    Object.entries(patterns).map(([key, pattern]) => [\n      key,\n      pattern.test(password),\n    ]),\n  );\n};\nconsole.log(...Object.values(validatePassword("short")));',
            },
          ],
        },
        {
          name: "cleanWhitespace() — collapse and trim",
          explanation:
            "Replace each whitespace run with a single space, then remove whitespace at the ends.",
          note: "This removes line-break structure as well as extra spaces.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Collapse mixed whitespace",
              language: "javascript",
              code: 'const cleanWhitespace = (str) => str.replace(/\\s+/g, " ").trim();\nconsole.log(cleanWhitespace("  Hello\\n\\tworld  "));',
            },
            {
              label: "Handle blank and already clean input",
              language: "javascript",
              code: 'const cleanWhitespace = (str) => str.replace(/\\s+/g, " ").trim();\nconsole.log(cleanWhitespace(" \\n "), cleanWhitespace("Hello world"));',
            },
          ],
        },
        {
          name: "toKebabCase() — supplied ASCII conversion",
          explanation:
            "Insert hyphens before ASCII uppercase letters, replace whitespace/underscore runs, trim edge hyphens, and lowercase.",
          note: "Acronyms become separate letters, whitespace before an uppercase letter can produce two hyphens, and existing repeated interior hyphens remain; this is not a general Unicode word segmenter.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Convert mixed naming conventions",
              language: "javascript",
              code: 'const toKebabCase = (str) =>\n  str\n    .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)\n    .replace(/[\\s_]+/g, "-")\n    .replace(/^-+|-+$/g, "")\n    .toLowerCase();\nconsole.log(\n  toKebabCase("helloWorld"),\n  toKebabCase("Hello World"),\n  toKebabCase("snake_case"),\n);',
            },
            {
              label: "Show acronym and existing hyphen behavior",
              language: "javascript",
              code: 'const toKebabCase = (str) =>\n  str\n    .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)\n    .replace(/[\\s_]+/g, "-")\n    .replace(/^-+|-+$/g, "")\n    .toLowerCase();\nconsole.log(toKebabCase("XML"), toKebabCase("a--b"), toKebabCase(""));',
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
    head.append(copy);
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
          "string-methods-cheatsheet:" +
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
