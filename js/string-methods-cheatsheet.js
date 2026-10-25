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
            "Returns the string converted to uppercase with default Unicode case mappings. Use it when a locale-specific mapping is not required.",
          note: "Strings are immutable. Conversion may expand characters, so output length and positions need not match the input; default casing is not Turkish-specific.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase",
          examples: [
            {
              label: "Convert without changing the original",
              language: "javascript",
              code: 'const text="Hello World";const upper=text.toUpperCase();console.log(upper,text);',
            },
            {
              label: "Observe character expansion and empty input",
              language: "javascript",
              code: 'const text="straße";console.log(text.toUpperCase(),text.length,text.toUpperCase().length,"".toUpperCase());',
            },
          ],
        },
        {
          name: "toLowerCase() — default lowercase conversion",
          explanation:
            "Returns the string converted to lowercase with default Unicode case mappings. Use it for a defined non-locale-specific formatting rule.",
          note: "Casing is not general normalization or locale-aware equality. Some mappings add code points, and converting case can lose information.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase",
          examples: [
            {
              label: "Lowercase mixed text without mutation",
              language: "javascript",
              code: 'const text="Hello World";console.log(text.toLowerCase(),text);',
            },
            {
              label: "Observe a multi-code-point mapping",
              language: "javascript",
              code: 'const lower="İ".toLowerCase();console.log(lower==="i\\u0307",lower.length,"".toLowerCase());',
            },
          ],
        },
        {
          name: "toLocaleUpperCase() — locale-specific uppercase",
          explanation:
            "Returns uppercase text using the requested locale’s case mapping. Use an explicit locale when language-specific casing matters.",
          note: "Turkish i maps to dotted uppercase İ. German ß expands to SS in both demonstrated mappings; locale casing is not generally reversible or length-preserving.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleUpperCase",
          examples: [
            {
              label: "Compare default and Turkish casing",
              language: "javascript",
              code: 'const text="istanbul";console.log(text.toUpperCase(),text.toLocaleUpperCase("tr-TR"),text);',
            },
            {
              label: "Compare German and explicit English mappings",
              language: "javascript",
              code: 'console.log("straße".toUpperCase(),"straße".toLocaleUpperCase("de-DE"));console.log("istanbul".toLocaleUpperCase("en-US"),"".toLocaleUpperCase("tr-TR"));',
            },
          ],
        },
        {
          name: "toTitleCase() — custom token capitalization",
          explanation:
            "Capitalize the first character and lowercase the remainder of each token selected by the supplied regex. Use this helper for the demonstrated simple ASCII word formatting.",
          note: "Not a built-in method or linguistic title-casing algorithm. The word start uses ASCII-style word characters and a token extends through non-whitespace, so punctuation and international text need separate rules.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Format the supplied and mixed-case words",
              language: "javascript",
              code: 'const toTitleCase=text=>text.replace(/\\w\\S*/g,word=>word.charAt(0).toUpperCase()+word.slice(1).toLowerCase());console.log(toTitleCase("hello world"),toTitleCase("hELLO wORLD"));',
            },
            {
              label: "Keep spacing and show a hyphenated token",
              language: "javascript",
              code: 'const toTitleCase=text=>text.replace(/\\w\\S*/g,word=>word.charAt(0).toUpperCase()+word.slice(1).toLowerCase());console.log(toTitleCase("  hello   world "),toTitleCase("hello-world"),toTitleCase(""));',
            },
          ],
        },
        {
          name: "toSentenceCase() — custom first-character casing",
          explanation:
            "Uppercase the first string position and lowercase the remainder. Use it for a single simple sentence-like label.",
          note: "Not sentence detection: later sentences, names, and acronyms are lowercased. Leading whitespace is retained, and charAt operates on a UTF-16 code unit.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt",
          examples: [
            {
              label: "Convert the supplied uppercase label",
              language: "javascript",
              code: 'const toSentenceCase=text=>text.charAt(0).toUpperCase()+text.slice(1).toLowerCase();console.log(toSentenceCase("HELLO WORLD"),toSentenceCase("hello NASA"));',
            },
            {
              label: "Handle empty and whitespace-prefixed input",
              language: "javascript",
              code: 'const toSentenceCase=text=>text.charAt(0).toUpperCase()+text.slice(1).toLowerCase();console.log(toSentenceCase(""),toSentenceCase(" HELLO WORLD"));',
            },
          ],
        },
        {
          name: "toCamelCase() — custom separator conversion",
          explanation:
            "Remove a hyphen, underscore, or whitespace character before another character, uppercase that character, then lowercase the initial position. Use it for the supplied simple identifier forms.",
          note: "This preserves most existing internal casing and consumes one separator plus one following character per match. Repeated or trailing separators are not fully normalized, and this is not a general Unicode identifier tokenizer.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Convert the supplied hyphen and underscore forms",
              language: "javascript",
              code: 'const toCamelCase=text=>text.replace(/[-_\\s](.)/g,(_,char)=>char.toUpperCase()).replace(/^(.)/,(_,char)=>char.toLowerCase());console.log(toCamelCase("hello-world"),toCamelCase("hello_world"),toCamelCase("hello world"));',
            },
            {
              label: "Expose repeated separators and retained internal case",
              language: "javascript",
              code: 'const toCamelCase=text=>text.replace(/[-_\\s](.)/g,(_,char)=>char.toUpperCase()).replace(/^(.)/,(_,char)=>char.toLowerCase());console.log(toCamelCase("hello--world"),toCamelCase("HELLO-WORLD"),toCamelCase(""));',
            },
          ],
        },
        {
          name: "toPascalCase() — custom separator conversion",
          explanation:
            "Remove the demonstrated separators, uppercase the following characters, and uppercase the initial position. Use it for simple PascalCase labels.",
          note: "Like the camel-case helper, it preserves remaining internal casing and does not fully normalize repeated or trailing separators.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Convert the supplied simple forms",
              language: "javascript",
              code: 'const toPascalCase=text=>text.replace(/[-_\\s](.)/g,(_,char)=>char.toUpperCase()).replace(/^(.)/,(_,char)=>char.toUpperCase());console.log(toPascalCase("hello-world"),toPascalCase("hello_world"),toPascalCase("hello world"));',
            },
            {
              label: "Handle empty input and show separator limits",
              language: "javascript",
              code: 'const toPascalCase=text=>text.replace(/[-_\\s](.)/g,(_,char)=>char.toUpperCase()).replace(/^(.)/,(_,char)=>char.toUpperCase());console.log(toPascalCase(""),toPascalCase("hello--world"),toPascalCase("hELLO-world"));',
            },
          ],
        },
        {
          name: "toSnakeCase() — custom uppercase splitting",
          explanation:
            "Insert an underscore before each ASCII uppercase letter, lowercase that letter, then remove an initial inserted underscore. Use it for simple camelCase input.",
          note: "Acronyms split into separate letters, existing separators remain, and only ASCII uppercase letters are targeted. The final replacement also removes one pre-existing leading underscore.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Convert camelCase and initial uppercase input",
              language: "javascript",
              code: 'const toSnakeCase=text=>text.replace(/[A-Z]/g,letter=>"_"+letter.toLowerCase()).replace(/^_/,"");console.log(toSnakeCase("helloWorld"),toSnakeCase("HelloWorld"));',
            },
            {
              label: "Expose acronym and existing-separator behavior",
              language: "javascript",
              code: 'const toSnakeCase=text=>text.replace(/[A-Z]/g,letter=>"_"+letter.toLowerCase()).replace(/^_/,"");console.log(toSnakeCase("HTTPServer"),toSnakeCase("_helloWorld"),toSnakeCase(""));',
            },
          ],
        },
        {
          name: "toKebabCase() — custom uppercase splitting",
          explanation:
            "Insert a hyphen before each ASCII uppercase letter and remove one leading hyphen. Use it for the supplied camelCase-to-kebab-case transformation.",
          note: "Acronyms split into individual letters and existing separators are not normalized; one pre-existing leading hyphen is also removed.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Convert the supplied camelCase form",
              language: "javascript",
              code: 'const toKebabCase=text=>text.replace(/[A-Z]/g,letter=>"-"+letter.toLowerCase()).replace(/^-/ ,"");console.log(toKebabCase("helloWorld"),toKebabCase("HelloWorld"));',
            },
            {
              label: "Expose acronyms and existing leading punctuation",
              language: "javascript",
              code: 'const toKebabCase=text=>text.replace(/[A-Z]/g,letter=>"-"+letter.toLowerCase()).replace(/^-/ ,"");console.log(toKebabCase("HTTPServer"),toKebabCase("-helloWorld"),toKebabCase(""));',
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
            "Returns the first matching substring position at or after the optional starting index, or -1 when absent. Use it when the location matters.",
          note: "Case-sensitive and measured in UTF-16 code units. A result of zero is a successful match, so test against -1 rather than using truthiness.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf",
          examples: [
            {
              label: "Find the supplied substrings",
              language: "javascript",
              code: 'const text="Hello World, Hello Universe";console.log(text.indexOf("Hello"),text.indexOf("World"),text.indexOf("hello"));',
            },
            {
              label: "Start later and check existence correctly",
              language: "javascript",
              code: 'const text="Hello World, Hello Universe";console.log(text.indexOf("Hello",1),text.indexOf("o",5));console.log(text.indexOf("Hello")!==-1,text.indexOf("World")!==-1);',
            },
          ],
        },
        {
          name: "lastIndexOf() — last literal occurrence",
          explanation:
            "Returns the last occurrence whose starting position is at or before the optional position. Use it for reverse searching without reversing the string.",
          note: "The position limits match starts and is not an exclusive end bound. Negative positions clamp to zero; missing substrings return -1.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf",
          examples: [
            {
              label: "Read the final supplied occurrences",
              language: "javascript",
              code: 'const text="Hello World, Hello Universe";console.log(text.lastIndexOf("Hello"),text.lastIndexOf("o"),text.lastIndexOf("o",15));',
            },
            {
              label: "Check bounds and empty search strings",
              language: "javascript",
              code: 'console.log("abc".lastIndexOf("a",-1),"abc".lastIndexOf("z"),"abc".lastIndexOf("",99),"abc".indexOf("",99));',
            },
          ],
        },
        {
          name: "includes() — literal membership",
          explanation:
            "Returns whether the search string occurs at or after the optional position. Use it for a readable boolean existence check.",
          note: "Case-sensitive; the position is a starting offset, not a length. Empty strings are included even when the supplied position exceeds length.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes",
          examples: [
            {
              label: "Check membership and the starting position",
              language: "javascript",
              code: 'const text="Hello World, Hello Universe";console.log(text.includes("World"),text.includes("world"),text.includes("World",7));',
            },
            {
              label: "Handle empty searches and reject regex input",
              language: "javascript",
              code: 'console.log("abc".includes("",99),"".includes("a"));try{"abc".includes(/a/);}catch(error){console.log(error.name);}',
            },
          ],
        },
        {
          name: "startsWith() — match at a position",
          explanation:
            "Checks whether a literal substring begins at the given position, defaulting to zero. Use it for prefix checks without extracting a slice.",
          note: "Case-sensitive and rejects RegExp arguments. A prefix such as http also matches https; include the intended delimiter when that distinction matters.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith",
          examples: [
            {
              label: "Check the supplied URL prefixes",
              language: "javascript",
              code: 'const url="https://example.com/api";console.log(url.startsWith("https"),url.startsWith("http"),url.startsWith("ftp"),url.startsWith("example",8));',
            },
            {
              label: "Check a nonzero position and empty prefix",
              language: "javascript",
              code: 'const text="JavaScript is awesome";console.log(text.startsWith("Java"),text.startsWith("Script",4),text.startsWith("",999));',
            },
          ],
        },
        {
          name: "endsWith() — match an exclusive end position",
          explanation:
            "Checks whether a literal substring ends at the string length or the supplied exclusive end position. Use it for suffix checks or a suffix of a virtual prefix.",
          note: "The second argument is not a backward search start. Case-sensitive and rejects RegExp arguments.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith",
          examples: [
            {
              label: "Check the supplied URL suffixes",
              language: "javascript",
              code: 'const url="https://example.com/api";console.log(url.endsWith(".com/api"),url.endsWith(".com"),url.endsWith("api"),url.endsWith(".com",19));',
            },
            {
              label: "Check the exclusive end bound",
              language: "javascript",
              code: 'const text="JavaScript is awesome";console.log(text.endsWith("awesome"),text.endsWith("is",13),text.endsWith("is",12));',
            },
          ],
        },
        {
          name: "search() — first regex position",
          explanation:
            "Returns the first regex match position or -1. Use it when the search requires character classes or flags rather than a literal substring.",
          note: "No fromIndex parameter; g does not turn search into iteration. A string argument is interpreted as regex source, so use indexOf for literal user text.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search",
          examples: [
            {
              label: "Find the supplied price fields",
              language: "javascript",
              code: 'const text="The price is $99.99";console.log(text.search(/\\d+/),text.search(/\\$/),text.search(/[A-Z]/),text.search(/PRICE/i),text.search(/xyz/));',
            },
            {
              label: "Distinguish regex source from literal searching",
              language: "javascript",
              code: 'console.log("abc".search("."),"abc".indexOf("."));const pattern=/b/g;pattern.lastIndex=2;console.log("abc".search(pattern),pattern.lastIndex);',
            },
          ],
        },
        {
          name: "match() — first captures or all full matches",
          explanation:
            "Without g, returns a detailed first match with captures; with g, returns an array of full matching substrings. Use it when those result forms fit the task.",
          note: "Returns null on no match. The supplied email-shaped regex is a simple extractor, not an email validator or general email parser.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match",
          examples: [
            {
              label: "Read the first and all supplied address-shaped strings",
              language: "javascript",
              code: 'const text="Contact: john@example.com, jane@test.org";const first=text.match(/\\w+@\\w+\\.\\w+/);console.log(first[0],first.index);console.log(...text.match(/\\w+@\\w+\\.\\w+/g));',
            },
            {
              label: "Read capture fields and guard a missing match",
              language: "javascript",
              code: 'const text="Contact: john@example.com, jane@test.org";const match=text.match(/(\\w+)@(\\w+\\.\\w+)/);if(match)console.log(match[0],match[1],match[2]);console.log("No addresses".match(/\\w+@\\w+\\.\\w+/)===null);',
            },
          ],
        },
        {
          name: "matchAll() — all matches with capture details",
          explanation:
            "Returns an iterator of match arrays retaining capture groups and positions. Use it to collect every structured match.",
          note: "A RegExp argument must use g. The iterator is consumed once and uses a copy of the regex state; the address examples retain their limited extraction grammar.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll",
          examples: [
            {
              label: "Collect every supplied match and group",
              language: "javascript",
              code: 'const text="Contact: john@example.com, jane@test.org";const matches=[...text.matchAll(/(\\w+)@(\\w+\\.\\w+)/g)];for(const match of matches)console.log(match[1],match[2],match.index);',
            },
            {
              label: "Handle no matches and enforce the regex flag",
              language: "javascript",
              code: 'console.log([..."No addresses".matchAll(/(\\w+)@(\\w+\\.\\w+)/g)].length);try{[..."john@example.com".matchAll(/(\\w+)@(\\w+\\.\\w+)/)];}catch(error){console.log(error.name);}',
            },
          ],
        },
        {
          name: "Bracket notation — indexed UTF-16 code units",
          explanation:
            "Read the string property at a nonnegative index. Use it for direct code-unit access when surrogate-pair handling is understood.",
          note: "Out-of-range and negative numeric properties normally return undefined; indexing does not return an entire supplementary Unicode code point.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt",
          examples: [
            {
              label: "Read the first unit and the high surrogate",
              language: "javascript",
              code: 'const text="Hello 😀 World";console.log(text[0],text[6]==="\\uD83D",text[7]==="\\uDE00",text[100]);',
            },
            {
              label: "Distinguish indexed properties from negative indexing",
              language: "javascript",
              code: 'const text="Hello";console.log(text[-1],text[text.length-1],""[0]);',
            },
          ],
        },
        {
          name: "charAt() — code unit or empty string",
          explanation:
            "Returns one UTF-16 code unit at the specified index, or an empty string outside the string. Use it when that empty-string result is preferable to undefined.",
          note: "Negative indices do not count from the end. Like bracket notation, charAt can return half of a surrogate pair.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt",
          examples: [
            {
              label: "Compare valid and out-of-range access",
              language: "javascript",
              code: 'const text="Hello 😀 World";console.log(text.charAt(0),text.charAt(6)==="\\uD83D",text.charAt(100),text[100]);',
            },
            {
              label: "Handle negative and empty input",
              language: "javascript",
              code: 'console.log("Hello".charAt(-1),"".charAt(0),"Hello".charAt());',
            },
          ],
        },
        {
          name: "charCodeAt() — UTF-16 unit value",
          explanation:
            "Returns the numeric UTF-16 code unit at the index. Use it when a protocol or algorithm explicitly works in code units.",
          note: "A supplementary character uses two code units; out-of-range access returns NaN rather than undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt",
          examples: [
            {
              label: "Read ASCII and surrogate-unit values",
              language: "javascript",
              code: 'console.log("A".charCodeAt(0),"a".charCodeAt(0),"😀".charCodeAt(0),"😀".charCodeAt(1));',
            },
            {
              label: "Check missing units explicitly",
              language: "javascript",
              code: 'console.log("Hello".charCodeAt(0),Number.isNaN("".charCodeAt(0)),Number.isNaN("A".charCodeAt(100)));',
            },
          ],
        },
        {
          name: "codePointAt() — decode a code point at a unit offset",
          explanation:
            "Returns a full code point when the indexed position starts a valid surrogate pair. Use it for a numeric Unicode value at a known code-unit offset.",
          note: "The index is still a UTF-16 offset, not a code-point ordinal. Starting on the trailing surrogate returns that unit’s value; missing positions return undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt",
          examples: [
            {
              label: "Read a full supplementary code point",
              language: "javascript",
              code: 'const text="Hello 😀 World";console.log("😀".codePointAt(0),"A".codePointAt(0),text.codePointAt(6));',
            },
            {
              label: "Observe trailing-surrogate and missing access",
              language: "javascript",
              code: 'console.log("😀".codePointAt(1),"😀".codePointAt(2),"".codePointAt(0));',
            },
          ],
        },
        {
          name: "at() — relative code-unit indexing",
          explanation:
            "Returns the code unit at an index, allowing negative indices from the end. Use it for convenient final-position access.",
          note: "Still works in UTF-16 code units, not complete code points or visible characters. Out-of-range access returns undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/at",
          examples: [
            {
              label: "Read the supplied end positions",
              language: "javascript",
              code: 'const text="Hello 😀 World";console.log(text.at(0),text.at(-1),text.at(-2),text.at(100));',
            },
            {
              label: "Expose a trailing surrogate and empty input",
              language: "javascript",
              code: 'console.log("😀".at(-1)==="\\uDE00","😀".at(-2)==="\\uD83D","".at(-1));',
            },
          ],
        },
        {
          name: "String.fromCharCode() — construct UTF-16 units",
          explanation:
            "Creates a string from one or more numeric UTF-16 unit values. Use it for explicit unit sequences, including manually supplied surrogate pairs.",
          note: "Values are converted to 16-bit units; passing a supplementary code point directly truncates it rather than encoding that character.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode",
          examples: [
            {
              label: "Create the supplied ASCII values",
              language: "javascript",
              code: "console.log(String.fromCharCode(72),String.fromCharCode(65),String.fromCharCode(72,101,108,108,111));",
            },
            {
              label: "Contrast a full code point with a surrogate pair",
              language: "javascript",
              code: 'const truncated=String.fromCharCode(0x1F600);console.log(truncated==="😀",truncated.charCodeAt(0),String.fromCharCode(0xD83D,0xDE00));',
            },
          ],
        },
        {
          name: "String.fromCodePoint() — construct Unicode code points",
          explanation:
            "Creates a string from full numeric Unicode code points. Use it to encode supplementary characters without manually calculating surrogate pairs.",
          note: "Invalid or noninteger values outside 0–0x10FFFF throw RangeError. A resulting code point can still be part of a larger visible grapheme.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint",
          examples: [
            {
              label: "Create the supplied emoji and letters",
              language: "javascript",
              code: "console.log(String.fromCodePoint(128512),String.fromCodePoint(0x1F600),String.fromCodePoint(65,66,67));",
            },
            {
              label: "Check output length and invalid input",
              language: "javascript",
              code: "console.log(String.fromCodePoint(0x1F600).length);try{String.fromCodePoint(0x110000);}catch(error){console.log(error.name);}",
            },
          ],
        },
        {
          name: "for...of — iterate string code points",
          explanation:
            "String iteration yields complete code points for valid surrogate pairs. Use it when code-unit indexing would split supplementary characters.",
          note: "Code-point iteration is not grapheme segmentation; combining marks and joined emoji sequences may yield several values.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of",
          examples: [
            {
              label: "Iterate the supplied text and emoji",
              language: "javascript",
              code: 'for(const char of "Hello 😀")console.log(char);',
            },
            {
              label: "Observe a decomposed accented character",
              language: "javascript",
              code: 'const points=[];for(const char of "e\\u0301")points.push(char.codePointAt(0));console.log(...points);',
            },
          ],
        },
        {
          name: "Indexed for loops — inspect every code unit",
          explanation:
            "Loop from zero through length minus one to visit each UTF-16 unit. Use this when inspecting the string’s underlying encoding.",
          note: "The loop visits a surrogate pair twice; use for...of instead when the operation is defined over code points.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length",
          examples: [
            {
              label: "Inspect both surrogate units",
              language: "javascript",
              code: 'const text="😀",units=[];for(let index=0;index<text.length;index++)units.push(text[index].charCodeAt(0));console.log(...units);',
            },
            {
              label: "Iterate ordinary ASCII positions",
              language: "javascript",
              code: 'const text="Hi";for(let index=0;index<text.length;index++)console.log(index,text[index]);',
            },
          ],
        },
        {
          name: "Spread and Array.from() — collect code points",
          explanation:
            "Materialize the string iterator as an array using spread or Array.from. Use these for a code-point array rather than a code-unit split.",
          note: "Both preserve supplementary code points but do not combine grapheme sequences; array length is a code-point count for well-formed text.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from",
          examples: [
            {
              label: "Collect the supplied ASCII and emoji values",
              language: "javascript",
              code: 'console.log(...[..."Hello"]);console.log(...Array.from("Hello 😀"));',
            },
            {
              label: "Compare equivalent code-point collections",
              language: "javascript",
              code: 'const text="😀😁";console.log([...text].length,Array.from(text).length,Array.from(text).join("")===text);',
            },
          ],
        },
        {
          name: 'split("") — collect UTF-16 units',
          explanation:
            "Split on the empty string to obtain individual UTF-16 code units. Use it only when code units are the intended granularity.",
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
              code: 'const units="😀".split("");console.log(units.length,units[0].charCodeAt(0),units[1].charCodeAt(0),[..."😀"].length);',
            },
          ],
        },
        {
          name: "length and realLength() — encoding counts",
          explanation:
            "length reports UTF-16 units; the supplied realLength helper counts iterator values. Use names and documentation that distinguish those counts.",
          note: "Despite its name, realLength is a code-point count, not a count of user-perceived characters. Combining marks and joined emoji sequences need grapheme-aware segmentation for that task.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length",
          examples: [
            {
              label: "Compare the supplied lengths",
              language: "javascript",
              code: 'const realLength=text=>[...text].length;console.log("Hello".length,"😀".length,[..."😀"].length,realLength("Hello 😀"));',
            },
            {
              label: "Expose visible-character counting limits",
              language: "javascript",
              code: 'const realLength=text=>[...text].length;console.log(realLength("e\\u0301"),realLength("👨‍👩‍👧‍👦"),realLength(""));',
            },
          ],
        },
        {
          name: "Start/end checks at explicit bounds",
          explanation:
            "Use startsWith with a start offset and endsWith with an exclusive end position. Use this to inspect a known segment without allocating a substring.",
          note: "The two second arguments serve different roles. Neither method searches arbitrary positions within the supplied bound.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith",
          examples: [
            {
              label: "Check the supplied prose segments",
              language: "javascript",
              code: 'const text="Welcome to JavaScript programming";console.log(text.startsWith("Welcome"),text.startsWith("to",8),text.endsWith("programming"),text.endsWith("JavaScript",21));',
            },
            {
              label: "Show the effect of an adjacent bound",
              language: "javascript",
              code: 'const text="JavaScript is awesome";console.log(text.startsWith("Script",4),text.startsWith("Script",5),text.endsWith("is",13),text.endsWith("is",14));',
            },
          ],
        },
        {
          name: "Case-insensitive start/end checks — explicit folding",
          explanation:
            "Lowercase the text and literal search values under a defined casing policy before a boolean check. Use this for the demonstrated ASCII-style comparisons.",
          note: "Default lowercasing is not general locale-aware equality or Unicode normalization. Casing can change length, so transformed indices cannot blindly be mapped to original offsets.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase",
          examples: [
            {
              label: "Compare the supplied case-sensitive checks",
              language: "javascript",
              code: 'const text="Welcome to JavaScript programming";console.log(text.startsWith("welcome"),text.endsWith("Programming"));const lower=text.toLowerCase();console.log(lower.startsWith("welcome"),lower.endsWith("programming"));',
            },
            {
              label: "Fold both literal operands",
              language: "javascript",
              code: 'const text="HELLO WORLD",prefix="Hello",suffix="World";console.log(text.toLowerCase().startsWith(prefix.toLowerCase()),text.toLowerCase().endsWith(suffix.toLowerCase()));',
            },
          ],
        },
        {
          name: "Check a filename extension",
          explanation:
            "Use endsWith on a filename when testing its displayed extension. Normalize case first only when your application’s extension policy is case-insensitive.",
          note: "An extension is a naming convention, not proof of file content or type. URLs can include queries or fragments, so they are not always filenames.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith",
          examples: [
            {
              label: "Check the supplied filename",
              language: "javascript",
              code: 'const filename="document.pdf";console.log(filename.endsWith(".pdf"),filename.endsWith(".doc"));',
            },
            {
              label: "Choose an explicit case policy",
              language: "javascript",
              code: 'const filename="REPORT.PDF";console.log(filename.endsWith(".pdf"),filename.toLowerCase().endsWith(".pdf"),"report.pdf.exe".endsWith(".pdf"));',
            },
          ],
        },
        {
          name: "Check protocol-shaped prefixes",
          explanation:
            "Include the scheme delimiter when comparing HTTP and HTTPS prefixes. Use a literal prefix check only for the stated text-shape question.",
          note: 'startsWith("http") also matches https and other text. For actual URL protocol policy, parse with URL rather than treating a string prefix as a security boundary.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith",
          examples: [
            {
              label: "Check the supplied HTTPS URL text",
              language: "javascript",
              code: 'const url="https://example.com";console.log(url.startsWith("https://"),url.startsWith("http://"),url.startsWith("http"));',
            },
            {
              label: "Parse a URL before checking its protocol",
              language: "javascript",
              code: 'const url=new URL("HTTPS://example.com/path");console.log(url.protocol==="https:",url.hostname);',
            },
          ],
        },
        {
          name: "Check several allowed suffixes with some()",
          explanation:
            "Use some to test whether any allowed extension matches the filename. Use it for a short, explicit list of literal suffixes.",
          note: "This is case-sensitive unless you normalize first; an empty allowed suffix would match every filename, so keep the allowlist deliberate.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some",
          examples: [
            {
              label: "Match the supplied extension allowlist",
              language: "javascript",
              code: 'const extensions=[".jpg",".png",".gif"],image="photo.jpg";console.log(extensions.some(extension=>image.endsWith(extension)));',
            },
            {
              label: "Handle uppercase and a disallowed suffix",
              language: "javascript",
              code: 'const extensions=[".jpg",".png",".gif"];const allowed=name=>extensions.some(extension=>name.toLowerCase().endsWith(extension));console.log(allowed("PHOTO.PNG"),allowed("photo.jpg.exe"));',
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
            "Returns the portion from start up to the exclusive end, or through the tail when end is omitted. Use negative bounds to count from the string length.",
          note: "Leaves the original unchanged and uses UTF-16 units. Bounds are normalized and clamped; an end at or before the normalized start returns an empty string.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice",
          examples: [
            {
              label: "Extract the supplied prefix and tail",
              language: "javascript",
              code: 'const text="Hello World";console.log(text.slice(0,5),text.slice(6),text.slice(6,11),text);',
            },
            {
              label: "Use negative start and end bounds",
              language: "javascript",
              code: 'const text="Hello World";console.log(text.slice(-5),text.slice(-5,-1),text.slice(0,-6));',
            },
            {
              label:
                "Handle reversed bounds, clamping, and surrogate splitting",
              language: "javascript",
              code: 'console.log("Hello World".slice(5,2),"abc".slice(100),"abc".slice(-99,2));console.log("😀".slice(0,1)==="\\uD83D");',
            },
          ],
        },
        {
          name: "substring() — clamp and reorder bounds",
          explanation:
            "Returns the portion between two nonnegative bounds with an exclusive end. Use it when its argument-swapping semantics are intended.",
          note: "Negative values become zero, and reversed bounds are swapped after normalization. Uses UTF-16 units and does not mutate the source.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring",
          examples: [
            {
              label: "Extract the supplied portions",
              language: "javascript",
              code: 'const text="Hello World";console.log(text.substring(0,5),text.substring(6),text.substring(6,11));',
            },
            {
              label: "Swap reversed bounds and clamp negatives",
              language: "javascript",
              code: 'const text="Hello World";console.log(text.substring(5,0),text.substring(-3),text.substring(0,-3));',
            },
            {
              label: "Compare reversed ranges with slice",
              language: "javascript",
              code: 'console.log("JavaScript".substring(8,4),"JavaScript".slice(8,4),"abc".substring(99,1));',
            },
          ],
        },
        {
          name: "substr() — legacy start and length",
          explanation:
            "Returns up to a given number of UTF-16 units starting at the specified position. Recognize it in legacy code, where negative starts count from the end.",
          note: "Deprecated Annex B method: use slice or substring in new code. Its second argument is a length, so replacing it with an end-index method requires checking bounds and normalization.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr",
          examples: [
            {
              label: "Read the supplied legacy calls",
              language: "javascript",
              code: 'const text="Hello World";console.log(text.substr(0,5),text.substr(6,5),text.substr(6));',
            },
            {
              label: "Use a negative start and explicit length",
              language: "javascript",
              code: 'const text="Hello World";console.log(text.substr(-5),text.substr(-5,3),text.substr(6,0),text.substr(6,-1));',
            },
            {
              label: "Compare length with exclusive end",
              language: "javascript",
              code: 'const text="JavaScript";console.log(text.substr(4,4),text.slice(4,8),text.substring(4,8));',
            },
          ],
        },
        {
          name: "Take the last N or first N units",
          explanation:
            "Use slice(-n) for a positive tail size and slice(0,n) for a prefix. Compare the equivalent supplied methods when maintaining existing code.",
          note: "A zero tail count needs special handling because slice(-0) returns the entire string. These are unit counts rather than visible-character counts.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice",
          examples: [
            {
              label: "Compare the supplied final three units",
              language: "javascript",
              code: 'const text="JavaScript";console.log(text.slice(-3),text.substr(-3),text.substring(text.length-3));const n=0;console.log(n===0?"":text.slice(-n));',
            },
            {
              label: "Compare the supplied first four units",
              language: "javascript",
              code: 'const text="JavaScript";console.log(text.slice(0,4),text.substring(0,4),text.substr(0,4));',
            },
          ],
        },
        {
          name: "Extract a tail or middle range",
          explanation:
            "Use an omitted end to extract through the end, or explicit start/end to take a middle portion. Keep start/length and start/end conventions distinct.",
          note: "These equivalent examples use ordinary valid positive bounds; they do not imply equivalence for all negative, reversed, or omitted values.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice",
          examples: [
            {
              label: "Compare extraction through the tail",
              language: "javascript",
              code: 'const text="JavaScript";console.log(text.slice(4),text.substring(4),text.substr(4));',
            },
            {
              label: "Compare the supplied middle portion",
              language: "javascript",
              code: 'const text="JavaScript";console.log(text.slice(4,8),text.substring(4,8),text.substr(4,4));',
            },
          ],
        },
        {
          name: "Extract a filename extension",
          explanation:
            "Find the final dot and slice from it when it represents an extension under the stated policy. Use it for a filename rather than an arbitrary path or URL.",
          note: "A dot at the start alone denotes a dotfile, and a final dot is treated as no extension. Guarding -1 avoids accidentally taking the last character of a name without dots.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf",
          examples: [
            {
              label: "Read the supplied and multi-dot extensions",
              language: "javascript",
              code: 'function getExtension(filename){const dot=filename.lastIndexOf(".");return dot>0&&dot<filename.length-1?filename.slice(dot):"";}console.log(getExtension("document.pdf"),getExtension("archive.tar.gz"));',
            },
            {
              label: "Handle absent, leading, and trailing dots",
              language: "javascript",
              code: 'function getExtension(filename){const dot=filename.lastIndexOf(".");return dot>0&&dot<filename.length-1?filename.slice(dot):"";}console.log(getExtension("README"),getExtension(".env"),getExtension("name."));',
            },
          ],
        },
        {
          name: "Extract a filename without its extension",
          explanation:
            "Slice before the final extension dot using the same filename policy. Use it when a display stem should retain earlier dots.",
          note: "Names without an extension remain intact; a leading dotfile marker or final dot is preserved. This does not inspect file contents.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice",
          examples: [
            {
              label: "Read the supplied stem and preserve earlier dots",
              language: "javascript",
              code: 'function withoutExtension(filename){const dot=filename.lastIndexOf(".");return dot>0&&dot<filename.length-1?filename.slice(0,dot):filename;}console.log(withoutExtension("document.pdf"),withoutExtension("archive.tar.gz"));',
            },
            {
              label: "Preserve names that have no extension",
              language: "javascript",
              code: 'function withoutExtension(filename){const dot=filename.lastIndexOf(".");return dot>0&&dot<filename.length-1?filename.slice(0,dot):filename;}console.log(withoutExtension("README"),withoutExtension(".env"),withoutExtension("name."),withoutExtension(""));',
            },
          ],
        },
        {
          name: "truncate() — enforce a total length with ellipsis",
          explanation:
            "Reserve three units for dots when truncating a longer string. Use a small-limit branch so the result never exceeds the requested maximum.",
          note: "This helper caps UTF-16 length, not visible character count, and can split a surrogate pair. Limits zero through three return that many dots for overlong input; short input remains unchanged.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice",
          examples: [
            {
              label: "Truncate the supplied label and keep short input",
              language: "javascript",
              code: 'function truncate(text,maxLength){if(!Number.isSafeInteger(maxLength)||maxLength<0)throw new RangeError("Use a nonnegative integer length");if(text.length<=maxLength)return text;if(maxLength<=3)return ".".repeat(maxLength);return text.slice(0,maxLength-3)+"...";}console.log(truncate("Hello World",8),truncate("Hi",8));',
            },
            {
              label: "Handle tiny limits and reject invalid values",
              language: "javascript",
              code: 'function truncate(text,maxLength){if(!Number.isSafeInteger(maxLength)||maxLength<0)throw new RangeError("Use a nonnegative integer length");if(text.length<=maxLength)return text;if(maxLength<=3)return ".".repeat(maxLength);return text.slice(0,maxLength-3)+"...";}console.log(truncate("Hello",0),truncate("Hello",2),truncate("Hello",3));try{truncate("Hello",-1);}catch(error){console.log(error.name);}',
            },
          ],
        },
        {
          name: "Extract a URL host — slicing versus parsing",
          explanation:
            "Use the supplied slicing expression only for its known URL shape. Use URL.hostname or URL.host for general structured host extraction.",
          note: "The fixed-offset slice fails when a slash is absent and does not handle credentials, ports, or URL variants robustly. hostname excludes the port; host includes it.",
          source: "https://developer.mozilla.org/en-US/docs/Web/API/URL",
          examples: [
            {
              label: "Reproduce the supplied known-shape slice",
              language: "javascript",
              code: 'const url="https://www.example.com/path";const domain=url.slice(url.indexOf("://")+3,url.indexOf("/",8));console.log(domain);',
            },
            {
              label: "Parse no-path and credential/port variants",
              language: "javascript",
              code: 'console.log(new URL("https://www.example.com").hostname);const url=new URL("https://user:demo@example.com:8080?x=1");console.log(url.hostname,url.host);',
            },
          ],
        },
        {
          name: "at() — modern relative unit access",
          explanation:
            "Returns one UTF-16 unit at an index, allowing negative offsets from the end. Use it for convenient end access without subtracting from length.",
          note: "Negative indexing is length-relative, not cyclic wrapping: an index below -length is out of bounds. at still returns one code unit rather than a whole supplementary character.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/at",
          examples: [
            {
              label: "Read the supplied positions",
              language: "javascript",
              code: 'const text="Hello World";console.log(text.at(0),text.at(-1),text.at(-6));const word="JavaScript";console.log(word.at(0),word.at(4),word.at(9),word.at(-1),word.at(-2),word.at(-10));',
            },
            {
              label: "Distinguish bounds and a surrogate pair",
              language: "javascript",
              code: 'const text="JavaScript";console.log(text.at(100),text.at(-100),text.at(-11));console.log("😀".at(-1)==="\\uDE00");',
            },
            {
              label: "Compare positive and final-position access",
              language: "javascript",
              code: 'const text="JavaScript";console.log(text[0],text.charAt(0),text.at(0));console.log(text[text.length-1],text.at(-1));',
            },
          ],
        },
        {
          name: "Loop with negative at() positions",
          explanation:
            "Start at minus length and advance toward zero to visit every code unit in forward order. Use it to illustrate relative indexing in a loop.",
          note: "This is not reverse iteration: increasing negative offsets moves from the beginning toward the end. Empty strings run no iterations.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/at",
          examples: [
            {
              label: "Run the supplied relative-index loop",
              language: "javascript",
              code: 'const text="Hello";for(let index=-text.length;index<0;index++)console.log(text.at(index));',
            },
            {
              label: "Check empty input and unit semantics",
              language: "javascript",
              code: 'let visits=0;const empty="";for(let index=-empty.length;index<0;index++)visits++;const text="😀",units=[];for(let index=-text.length;index<0;index++)units.push(text.at(index).charCodeAt(0));console.log(visits,...units);',
            },
          ],
        },
        {
          name: "getLastN() — bounded relative-index extraction",
          explanation:
            "Collect at most n units from the end using the supplied loop pattern. Validate n and clamp it to length before iterating.",
          note: "Returns an empty string for zero and the whole string when n exceeds length. Clamping avoids unnecessary iterations and undefined elements; slice is shorter for the same unit-based task.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/at",
          examples: [
            {
              label: "Extract the supplied suffix and edge sizes",
              language: "javascript",
              code: 'function getLastN(text,n){if(!Number.isSafeInteger(n)||n<0)throw new RangeError("Use a nonnegative integer count");const chars=[];for(let index=-Math.min(n,text.length);index<0;index++)chars.push(text.at(index));return chars.join("");}console.log(getLastN("JavaScript",3),getLastN("JavaScript",0),getLastN("Hi",100));',
            },
            {
              label: "Compare slice and reject invalid counts",
              language: "javascript",
              code: 'function getLastN(text,n){if(!Number.isSafeInteger(n)||n<0)throw new RangeError("Use a nonnegative integer count");const chars=[];for(let index=-Math.min(n,text.length);index<0;index++)chars.push(text.at(index));return chars.join("");}const text="JavaScript",n=3;console.log(getLastN(text,n)===text.slice(-n),getLastN("",3));try{getLastN(text,-1);}catch(error){console.log(error.name);}',
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
            "Returns a new string with the first literal match or the matches selected by a regex replaced. Use g on a regex for all occurrences.",
          note: "The original string is unchanged; i changes case matching and does not imply global replacement.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Compare first and global replacement",
              language: "javascript",
              code: 'const text="Hello World, Hello Universe";console.log(text.replace("Hello","Hi"),text.replace(/hello/i,"Hi"));console.log(text.replace(/Hello/g,"Hi"),text);',
            },
            {
              label: "Match literal and regex syntax deliberately",
              language: "javascript",
              code: 'console.log("a.b".replace(".","-"),"a.b".replace(/./g,"-"));',
            },
          ],
        },
        {
          name: "Function replacers — calculate output",
          explanation:
            "Use a callback to transform each selected match and its captures. Use explicit numeric conversion when performing arithmetic.",
          note: "The example exchange factor is fixed demonstration data, not a current exchange rate or a monetary rounding policy. Returned callback text is inserted literally.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Transform the supplied amounts",
              language: "javascript",
              code: 'console.log("Price: $10, Tax: $2".replace(/\\$(\\d+)/g,(match,amount)=>"€"+Number(amount)*0.85));',
            },
            {
              label: "Double numbers and retain literal dollar tokens",
              language: "javascript",
              code: 'console.log("a12 b3".replace(/\\d+/g,value=>String(Number(value)*2)));console.log("abc".replace(/b/,()=>"$&"));',
            },
          ],
        },
        {
          name: "Numbered capture replacements",
          explanation:
            "Use dollar-number references to reorder captured fields in a replacement string. Use them for simple transformations without a callback.",
          note: "Dollar references in replacement strings differ from backreferences inside a regex.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Reorder the supplied name",
              language: "javascript",
              code: 'console.log("John Smith".replace(/(\\w+) (\\w+)/,"$2, $1"));',
            },
            {
              label: "Distinguish full match and literal dollar tokens",
              language: "javascript",
              code: 'console.log("abc".replace(/b/,"[$&]"),"abc".replace(/b/,"$$"));',
            },
          ],
        },
        {
          name: "Named capture replacements",
          explanation:
            "Use named groups and dollar-angle-bracket references to reformat structured text. Use names when numeric capture positions would be unclear.",
          note: "The date pattern checks only shape, not calendar validity.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Reformat the supplied date",
              language: "javascript",
              code: 'const pattern=/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;console.log("2024-03-15".replace(pattern,"$<month>/$<day>/$<year>"));',
            },
            {
              label: "Reformat several shaped dates",
              language: "javascript",
              code: 'const pattern=/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/g;console.log("2024-03-15 2025-04-20".replace(pattern,"$<day>.$<month>.$<year>"));',
            },
          ],
        },
        {
          name: "replaceAll() — every occurrence",
          explanation:
            "Replace all literal occurrences or all matches of a global regex. Use a literal string when user text should not be interpreted as a regex.",
          note: "A RegExp argument without g throws TypeError; no flag is needed for a string search.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll",
          examples: [
            {
              label: "Use literal and global-regex searches",
              language: "javascript",
              code: 'const text="cat and cat and cat";console.log(text.replaceAll("cat","dog"),text.replaceAll(/cat/g,"dog"));',
            },
            {
              label: "Reject a non-global regex and handle empty search",
              language: "javascript",
              code: 'try{"cat cat".replaceAll(/cat/,"dog");}catch(error){console.log(error.name);}console.log("ab".replaceAll("","-"));',
            },
          ],
        },
        {
          name: "Standalone literal replacement fallback",
          explanation:
            "Use split and join for a deliberately limited nonempty literal search and literal replacement. Use it as a teaching helper without modifying String.prototype.",
          note: "Not a replaceAll polyfill: it rejects empty search, accepts no regex/callback, and does not expand replacement tokens. The screenshot’s prototype replacement would fail those native semantics.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll",
          examples: [
            {
              label: "Replace every literal occurrence",
              language: "javascript",
              code: 'function replaceAllLiteral(text,search,replacement){if(typeof search!=="string"||!search.length||typeof replacement!=="string")throw new TypeError("Use a nonempty string search and string replacement");return text.split(search).join(replacement);}console.log(replaceAllLiteral("cat cat","cat","dog"));',
            },
            {
              label: "Expose literal replacement semantics",
              language: "javascript",
              code: 'function replaceAllLiteral(text,search,replacement){if(typeof search!=="string"||!search.length||typeof replacement!=="string")throw new TypeError("Use a nonempty string search and string replacement");return text.split(search).join(replacement);}console.log(replaceAllLiteral("a.a",".","$&"));try{replaceAllLiteral("ab","","-");}catch(error){console.log(error.name);}',
            },
          ],
        },
        {
          name: "Template replacement — preserve falsy values",
          explanation:
            "Replace supplied brace placeholders from an object’s own properties. Use a property-existence check rather than logical OR to preserve zero, false, and empty strings.",
          note: "Unknown placeholders remain intact; values are converted to text. This is text substitution, not HTML escaping or a general template language.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Fill the supplied template",
              language: "javascript",
              code: 'function fillTemplate(text,data){return text.replace(/\\{(\\w+)\\}/g,(match,key)=>Object.hasOwn(data,key)?String(data[key]):match);}console.log(fillTemplate("Hello {name}, you are {age} years old",{name:"John",age:30}));',
            },
            {
              label: "Retain falsy values and unknown placeholders",
              language: "javascript",
              code: 'function fillTemplate(text,data){return text.replace(/\\{(\\w+)\\}/g,(match,key)=>Object.hasOwn(data,key)?String(data[key]):match);}console.log(fillTemplate("{zero}|{flag}|{empty}|{missing}",{zero:0,flag:false,empty:""}));console.log(fillTemplate("{toString}",{}));',
            },
          ],
        },
        {
          name: "Highlight literal search terms",
          explanation:
            "Escape the term as regex text and build highlighted HTML from escaped text segments. Use it to highlight case-insensitive literal matches while retaining their original spelling.",
          note: "Requires RegExp.escape. Empty terms return escaped text; this is a text-to-HTML helper, not a transformer for existing markup.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Highlight a term containing regex punctuation",
              language: "javascript",
              code: 'const escapeHtml=text=>text.replace(/[&<>\\u0022\\u0027]/g,char=>({38:"&amp;",60:"&lt;",62:"&gt;",34:"&quot;",39:"&#39;"})[char.charCodeAt(0)]);function highlight(text,term){if(term==="")return escapeHtml(text);const regex=new RegExp(RegExp.escape(term),"gi");let result="",last=0;for(const match of text.matchAll(regex)){result+=escapeHtml(text.slice(last,match.index))+"<mark>"+escapeHtml(match[0])+"</mark>";last=match.index+match[0].length;}return result+escapeHtml(text.slice(last));}console.log(highlight("User.name and user.name","user.name"));',
            },
            {
              label: "Escape markup and handle an empty term",
              language: "javascript",
              code: 'const escapeHtml=text=>text.replace(/[&<>\\u0022\\u0027]/g,char=>({38:"&amp;",60:"&lt;",62:"&gt;",34:"&quot;",39:"&#39;"})[char.charCodeAt(0)]);function highlight(text,term){if(term==="")return escapeHtml(text);const regex=new RegExp(RegExp.escape(term),"gi");let result="",last=0;for(const match of text.matchAll(regex)){result+=escapeHtml(text.slice(last,match.index))+"<mark>"+escapeHtml(match[0])+"</mark>";last=match.index+match[0].length;}return result+escapeHtml(text.slice(last));}console.log(highlight("<b> & text","<b>"));console.log(highlight("<x>",""));',
            },
          ],
        },
        {
          name: "escapeHtml() — escape text characters",
          explanation:
            "Replace the five demonstrated HTML-significant characters with entity references. Use it for plain text embedded in appropriate HTML text contexts.",
          note: "Escaping is context-specific: this does not validate URLs, JavaScript, CSS, or arbitrary HTML. Setting textContent is preferable when creating DOM text directly.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Escape text and attribute-like punctuation",
              language: "javascript",
              code: 'const escapeHtml=text=>text.replace(/[&<>\\u0022\\u0027]/g,char=>({38:"&amp;",60:"&lt;",62:"&gt;",34:"&quot;",39:"&#39;"})[char.charCodeAt(0)]);console.log(escapeHtml(\'<a title="x">&\')+escapeHtml(String.fromCharCode(39)));',
            },
            {
              label: "Handle empty text and existing entity syntax",
              language: "javascript",
              code: 'const escapeHtml=text=>text.replace(/[&<>\\u0022\\u0027]/g,char=>({38:"&amp;",60:"&lt;",62:"&gt;",34:"&quot;",39:"&#39;"})[char.charCodeAt(0)]);console.log(escapeHtml(""),escapeHtml("&amp;"));',
            },
          ],
        },
        {
          name: "slugify() — supplied ASCII-style slug rules",
          explanation:
            "Lowercase text, remove characters outside the stated set, and normalize spaces/hyphens. Use this helper when its exact ASCII-oriented policy is desired.",
          note: "Keeps underscores and drops accented letters rather than transliterating them. Does not ensure uniqueness or implement a complete URL-routing policy.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Create the supplied slug",
              language: "javascript",
              code: 'const slugify=text=>text.toLowerCase().replace(/[^\\w\\s-]/g,"").replace(/\\s+/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"");console.log(slugify("Hello World!"),slugify("  Hello---World  "));',
            },
            {
              label: "Expose alphabet and empty-input behavior",
              language: "javascript",
              code: 'const slugify=text=>text.toLowerCase().replace(/[^\\w\\s-]/g,"").replace(/\\s+/g,"-").replace(/-+/g,"-").replace(/^-+|-+$/g,"");console.log(slugify("café_name"),slugify("!!!"));',
            },
          ],
        },
        {
          name: "maskEmail() — display-only masking",
          explanation:
            "Keep the demonstrated two-character prefix for longer local parts and replace the remainder with stars. Mask short or malformed input without accidentally leaving it fully visible.",
          note: "This is a display convention, not anonymization, email validation, or access control; the domain remains visible. It uses UTF-16 positions.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Mask the supplied address",
              language: "javascript",
              code: 'function maskEmail(email){const at=email.indexOf("@");if(at<1||at!==email.lastIndexOf("@"))return "***";const local=email.slice(0,at),shown=local.length>2?local.slice(0,2):"";return shown+"***"+email.slice(at);}console.log(maskEmail("john.doe@example.com"));',
            },
            {
              label: "Handle short local parts and malformed text",
              language: "javascript",
              code: 'function maskEmail(email){const at=email.indexOf("@");if(at<1||at!==email.lastIndexOf("@"))return "***";const local=email.slice(0,at),shown=local.length>2?local.slice(0,2):"";return shown+"***"+email.slice(at);}console.log(maskEmail("a@example.com"),maskEmail("ab@example.com"),maskEmail("invalid"));',
            },
          ],
        },
        {
          name: "trim() — remove whitespace at both ends",
          explanation:
            "Return a string without leading/trailing JavaScript whitespace and line terminators. Use it when edge whitespace is not meaningful.",
          note: "Internal spaces remain; this does not remove every invisible Unicode character.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim",
          examples: [
            {
              label: "Trim mixed edge whitespace",
              language: "javascript",
              code: 'const text="  Hello World \\n";console.log(text.trim(),text);console.log("\\t\\n Hello \\r\\n".trim());',
            },
            {
              label: "Keep internal spacing and non-whitespace characters",
              language: "javascript",
              code: 'console.log("  a  b  ".trim()," \\n ".trim(),"\\u200bhello\\u200b".trim()==="\\u200bhello\\u200b");',
            },
          ],
        },
        {
          name: "trimStart() and trimLeft()",
          explanation:
            "Remove whitespace only from the beginning. Use the direction-neutral trimStart name in new code.",
          note: "trimLeft is an alias, not a separate trimming algorithm; it is not currently marked deprecated in MDN, contrary to the image’s comment.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart",
          examples: [
            {
              label: "Keep trailing whitespace intact",
              language: "javascript",
              code: 'const text="  Hello World \\n";console.log(text.trimStart(),text.trimLeft(),text.trimStart()===text.trimLeft());',
            },
            {
              label: "Handle blank and already-trimmed strings",
              language: "javascript",
              code: 'console.log(" \\t".trimStart(),"hello  ".trimStart());',
            },
          ],
        },
        {
          name: "trimEnd() and trimRight()",
          explanation:
            "Remove whitespace only from the end. Use trimEnd when beginning whitespace should remain.",
          note: "trimRight is an alias; prefer trimEnd without claiming different behavior or unsupported deprecation status.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd",
          examples: [
            {
              label: "Keep leading whitespace intact",
              language: "javascript",
              code: 'const text="  Hello World \\n";console.log(text.trimEnd(),text.trimRight(),text.trimEnd()===text.trimRight());',
            },
            {
              label: "Handle blank and already-trimmed strings",
              language: "javascript",
              code: 'console.log(" \\n".trimEnd(),"  hello".trimEnd());',
            },
          ],
        },
        {
          name: "trimChar() — remove a literal edge character",
          explanation:
            "Escape a supplied character and remove repeated copies from either edge. Use it instead of treating caller input as regex syntax.",
          note: "Requires RegExp.escape and exactly one Unicode code point; callers pass a literal dot rather than a pre-escaped pattern.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Trim the supplied literal dot",
              language: "javascript",
              code: 'function trimChar(text,char){if([...char].length!==1)throw new TypeError("Use one Unicode code point");const literal=RegExp.escape(char);return text.replace(new RegExp("^(?:"+literal+")+|(?:"+literal+")+$","gu"),"");}console.log(trimChar("...hello...","."),trimChar("a.b","."));',
            },
            {
              label: "Trim regex punctuation and reject empty input",
              language: "javascript",
              code: 'function trimChar(text,char){if([...char].length!==1)throw new TypeError("Use one Unicode code point");const literal=RegExp.escape(char);return text.replace(new RegExp("^(?:"+literal+")+|(?:"+literal+")+$","gu"),"");}console.log(trimChar("***hello***","*"));try{trimChar("hello","");}catch(error){console.log(error.name);}',
            },
          ],
        },
        {
          name: "padStart() — fill to a minimum length",
          explanation:
            "Prepend the padding string until the target UTF-16 length is reached. Use it for zero-padding or simple right alignment.",
          note: "Does not truncate longer input. Padding repeats and is cut to fit; an omitted fill defaults to spaces and empty fill adds nothing.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart",
          examples: [
            {
              label: "Pad the supplied numeric strings",
              language: "javascript",
              code: 'console.log("5".padStart(3,"0"),"123".padStart(5,"0"),"12345".padStart(3,"0"));',
            },
            {
              label: "Use spaces, repeated text, or empty padding",
              language: "javascript",
              code: 'console.log("Hi".padStart(5),"Hi".padStart(10,"abc"),"Hi".padStart(5,""));',
            },
          ],
        },
        {
          name: "padEnd() — append to a minimum length",
          explanation:
            "Append repeated padding until the target length is reached. Use it for simple left-aligned text columns.",
          note: "Measures UTF-16 units, not terminal display width, and never shortens the original.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd",
          examples: [
            {
              label: "Pad the supplied string at the end",
              language: "javascript",
              code: 'console.log("5".padEnd(3,"0"),"Hi".padEnd(5));',
            },
            {
              label: "Repeat and truncate a padding token",
              language: "javascript",
              code: 'console.log("Hi".padEnd(10,"abc"),"long".padEnd(2,"."),"Hi".padEnd(5,""));',
            },
          ],
        },
        {
          name: "formatNumber() — zero-pad nonnegative integers",
          explanation:
            "Convert an integer to text and pad it to a minimum width. Use a stated numeric contract to avoid placing zeroes before a minus sign.",
          note: "This helper rejects negative and fractional numbers; a width smaller than the number leaves it intact.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart",
          examples: [
            {
              label: "Format the supplied integer",
              language: "javascript",
              code: 'function formatNumber(number,digits){if(!Number.isSafeInteger(number)||number<0||!Number.isSafeInteger(digits)||digits<0||digits>10000)throw new RangeError("Use a nonnegative safe integer and width 0–10000");return String(number).padStart(digits,"0");}console.log(formatNumber(42,5),formatNumber(1234,2));',
            },
            {
              label: "Handle zero and reject negative values",
              language: "javascript",
              code: 'function formatNumber(number,digits){if(!Number.isSafeInteger(number)||number<0||!Number.isSafeInteger(digits)||digits<0||digits>10000)throw new RangeError("Use a nonnegative safe integer and width 0–10000");return String(number).padStart(digits,"0");}console.log(formatNumber(0,3));try{formatNumber(-5,3);}catch(error){console.log(error.name);}',
            },
          ],
        },
        {
          name: "Align left, right, and center",
          explanation:
            "Use padding for simple monospaced ASCII alignment. Clamp center padding to zero when input already exceeds the width.",
          note: "These helpers do not calculate visual width for emoji, combining marks, or East Asian text; center padding puts any extra space on the right.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart",
          examples: [
            {
              label: "Align the same short label",
              language: "javascript",
              code: 'const alignRight=(text,width)=>text.padStart(width),alignLeft=(text,width)=>text.padEnd(width);function alignCenter(text,width){if(!Number.isSafeInteger(width)||width<0||width>10000)throw new RangeError("Invalid width");const padding=Math.max(0,width-text.length),left=Math.floor(padding/2);return " ".repeat(left)+text+" ".repeat(padding-left);}console.log(alignRight("Hi",5),alignLeft("Hi",5),alignCenter("Hi",5));',
            },
            {
              label: "Keep overlong text and handle empty text",
              language: "javascript",
              code: 'const alignRight=(text,width)=>text.padStart(width),alignLeft=(text,width)=>text.padEnd(width);function alignCenter(text,width){if(!Number.isSafeInteger(width)||width<0||width>10000)throw new RangeError("Invalid width");const padding=Math.max(0,width-text.length),left=Math.floor(padding/2);return " ".repeat(left)+text+" ".repeat(padding-left);}console.log(alignCenter("long",2),alignCenter("",3));',
            },
          ],
        },
        {
          name: "Create padded text tables",
          explanation:
            "Pad each cell to a chosen column width and join the cells with separators. Use it for small ASCII console tables.",
          note: "Padding does not truncate overlong cells; consistent widths and a monospaced display are assumptions.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd",
          examples: [
            {
              label: "Render the supplied table",
              language: "javascript",
              code: 'const table=[["Name","Age","City"],["John","30","NYC"],["Jane","25","LA"]];table.forEach(row=>console.log(row.map((cell,index)=>cell.padEnd(index===0?10:5)).join("|")));',
            },
            {
              label: "Convert numeric cells explicitly",
              language: "javascript",
              code: 'const row=["John",30];console.log(row.map(cell=>String(cell).padEnd(5)).join("|"));',
            },
          ],
        },
        {
          name: "formatTime() — padded time fields",
          explanation:
            "Pad validated hour, minute, and second fields to two digits and join them. Use for a 24-hour display value.",
          note: "Formatting is separate from date/timezone calculations; this helper rejects values outside the stated time-of-day range.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart",
          examples: [
            {
              label: "Format the supplied time",
              language: "javascript",
              code: 'function formatTime(hours,minutes,seconds){if(![hours,minutes,seconds].every(Number.isInteger)||hours<0||hours>23||minutes<0||minutes>59||seconds<0||seconds>59)throw new RangeError("Invalid 24-hour time");return [hours,minutes,seconds].map(value=>String(value).padStart(2,"0")).join(":");}console.log(formatTime(9,5,3),formatTime(23,59,59));',
            },
            {
              label: "Handle midnight and reject overflow",
              language: "javascript",
              code: 'function formatTime(hours,minutes,seconds){if(![hours,minutes,seconds].every(Number.isInteger)||hours<0||hours>23||minutes<0||minutes>59||seconds<0||seconds>59)throw new RangeError("Invalid 24-hour time");return [hours,minutes,seconds].map(value=>String(value).padStart(2,"0")).join(":");}console.log(formatTime(0,0,0));try{formatTime(24,0,0);}catch(error){console.log(error.name);}',
            },
          ],
        },
        {
          name: "toBinary() — minimum-width binary text",
          explanation:
            "Convert a nonnegative integer to radix two and zero-pad the result. Use it for a textual binary representation.",
          note: "The width is a minimum, not a fixed-size bit container; larger values are not truncated and signed two’s-complement encoding is not implemented.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart",
          examples: [
            {
              label: "Format the supplied binary values",
              language: "javascript",
              code: 'function toBinary(number,bits=8){if(!Number.isSafeInteger(number)||number<0||!Number.isSafeInteger(bits)||bits<0||bits>10000)throw new RangeError("Invalid integer or width");return number.toString(2).padStart(bits,"0");}console.log(toBinary(5),toBinary(255));',
            },
            {
              label: "Retain values wider than the requested width",
              language: "javascript",
              code: 'function toBinary(number,bits=8){if(!Number.isSafeInteger(number)||number<0||!Number.isSafeInteger(bits)||bits<0||bits>10000)throw new RangeError("Invalid integer or width");return number.toString(2).padStart(bits,"0");}console.log(toBinary(256,8),toBinary(0));try{toBinary(-1);}catch(error){console.log(error.name);}',
            },
          ],
        },
        {
          name: "split() — literal separators and limits",
          explanation:
            "Split a string at a literal delimiter and optionally cap the returned array length. Use it for simple delimiter-based fields.",
          note: "Limit discards later fields rather than retaining an unsplit tail. Missing separators return the whole string as one field.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Match the exact supplied delimiter",
              language: "javascript",
              code: 'const text="apple,banana,orange";console.log(...text.split(","));console.log(...text.split(", "));',
            },
            {
              label: "Apply an output limit",
              language: "javascript",
              code: 'console.log(..."a,b,c,d".split(",",2));console.log(..."a-b-c-d".split("-",2));',
            },
          ],
        },
        {
          name: 'split("") — code-unit arrays',
          explanation:
            "Split on an empty string to obtain individual UTF-16 units. Use it for ASCII text or when code units are intended.",
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
              code: 'console.log("😀".split("").length,[..."😀"].length,"".split("").length);',
            },
          ],
        },
        {
          name: "split() — regex separators and captures",
          explanation:
            "Use a regex to split on variable patterns or alternative delimiter characters. Capture a separator when it should remain in the result.",
          note: "No g flag is needed; captures add result elements and can also add undefined for absent alternative groups.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Split digit runs and several delimiter characters",
              language: "javascript",
              code: 'console.log(..."hello123world456".split(/\\d+/));console.log(..."apple,banana;orange|grape".split(/[,;|]/));',
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
            "Recognize the common newline sequences with the longer CRLF alternative first. Use it to process text whose line endings vary.",
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
            "Use a whitespace-run separator when repeated spaces should count as one separator. Trim or filter when edge blanks should not become words.",
          note: "Whitespace tokenization is not natural-language word segmentation; punctuation stays attached to tokens.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Compare literal spaces with whitespace runs",
              language: "javascript",
              code: 'console.log(..."Hello   World".split(" "));console.log(..."Hello   World".split(/\\s+/));',
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
          explanation:
            "Join array elements with a chosen separator. Use it after splitting, mapping, or reversing tokens.",
          note: "join is an Array method. Empty arrays produce an empty string, while null and undefined elements contribute empty fields.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join",
          examples: [
            {
              label: "Join the supplied values and a default separator",
              language: "javascript",
              code: 'console.log(["a","b"].join("-"),["a","b"].join());',
            },
            {
              label: "Observe empty values and empty arrays",
              language: "javascript",
              code: 'console.log(["a",null,undefined,"b"].join("|"),[].join("-"));',
            },
          ],
        },
        {
          name: "Filter empty split fields",
          explanation:
            "Use filter(Boolean) to remove empty strings when blanks carry no information. Use it for a list of nonempty tokens.",
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
          explanation:
            "Split rows into lines and each line at commas. Use this only for the simple unquoted data demonstrated.",
          note: "Not a CSV parser: quoted commas, escaped quotes, and multiline fields require a dedicated parser. Here each sample value is unquoted.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Parse the supplied unquoted table",
              language: "javascript",
              code: 'const csv="name,age,city\\nJohn,30,NYC\\nJane,25,LA";console.log(JSON.stringify(csv.split(/\\r?\\n/).map(row=>row.split(","))));',
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
            "Split a controlled path string at slashes and discard blank segments. Use it when repeated or edge slashes should not carry meaning.",
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
              code: 'console.log(..."//users///settings/".split("/").filter(Boolean));console.log("/".split("/").filter(Boolean).length);',
            },
          ],
        },
        {
          name: "Parse query fields — split versus URLSearchParams",
          explanation:
            "Use split only for the supplied simple unencoded query, or URLSearchParams for real query encoding and repeated fields. Use getAll when duplicate keys matter.",
          note: 'Object.fromEntries keeps only the last duplicate key. URLSearchParams decodes percent escapes and plus signs; a naive pair.split("=") loses later equals signs.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Read the supplied unencoded query",
              language: "javascript",
              code: 'const query="name=John&age=30&city=NYC";const data=Object.fromEntries(query.split("&").map(pair=>pair.split("=")));console.log(data.name,data.age,data.city);',
            },
            {
              label: "Decode real query syntax without losing repeated values",
              language: "javascript",
              code: 'const params=new URLSearchParams("q=A%2BB+%26+C&value=a=b&tag=one&tag=two");console.log(params.get("q"),params.get("value"),params.getAll("tag").join("|"));',
            },
          ],
        },
        {
          name: "wordCount() — whitespace token count",
          explanation:
            "Trim input and count nonempty whitespace-delimited tokens. Use an empty-input guard to return zero for blank text.",
          note: "Counts tokens rather than linguistic words; punctuation, scripts without whitespace, and grapheme sequences need other rules.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Count the supplied and mixed-whitespace text",
              language: "javascript",
              code: 'const wordCount=text=>{const trimmed=text.trim();return trimmed===""?0:trimmed.split(/\\s+/).length;};console.log(wordCount("Hello World"),wordCount(" Hello\\tWorld\\nagain "));',
            },
            {
              label: "Handle empty and blank input",
              language: "javascript",
              code: 'const wordCount=text=>{const trimmed=text.trim();return trimmed===""?0:trimmed.split(/\\s+/).length;};console.log(wordCount(""),wordCount(" \\n\\t "));',
            },
          ],
        },
        {
          name: "reverseWords() — reverse space-separated fields",
          explanation:
            "Split on literal spaces, reverse the fields, and join with spaces. Use it for the supplied simple example.",
          note: "Retains empty fields from repeated or edge spaces, so their positions move with the reversal. It does not reverse letters or normalize all whitespace.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Reverse the supplied two words",
              language: "javascript",
              code: 'const reverseWords=text=>text.split(" ").reverse().join(" ");console.log(reverseWords("Hello World"));',
            },
            {
              label: "Show empty-field behavior",
              language: "javascript",
              code: 'const reverseWords=text=>text.split(" ").reverse().join(" ");console.log(reverseWords(" Hello  World "),reverseWords(""));',
            },
          ],
        },
        {
          name: "capitalizeWords() — preserve spaces and empty fields",
          explanation:
            "Uppercase the first position of each literal-space-delimited field while retaining the remainder. Guard empty fields to avoid indexing undefined.",
          note: "Preserves existing internal case and spacing; not language-aware title casing or grapheme-aware capitalization.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Capitalize the supplied words",
              language: "javascript",
              code: 'const capitalizeWords=text=>text.split(" ").map(word=>word===""?"":word.charAt(0).toUpperCase()+word.slice(1)).join(" ");console.log(capitalizeWords("hello world"));',
            },
            {
              label: "Handle repeated spaces and an empty string",
              language: "javascript",
              code: 'const capitalizeWords=text=>text.split(" ").map(word=>word===""?"":word.charAt(0).toUpperCase()+word.slice(1)).join(" ");console.log(capitalizeWords("  hello   WORLD "),capitalizeWords(""));',
            },
          ],
        },
        {
          name: "extractHashtags() — whitespace token convention",
          explanation:
            "Select whitespace tokens starting with a hash and remove the hash. Use it when that simple token convention is the intended rule.",
          note: "The helper excludes a bare hash but retains punctuation and any additional hashes; it is not a social platform’s full hashtag grammar.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Extract the supplied tags",
              language: "javascript",
              code: 'const extractHashtags=text=>text.split(/\\s+/).filter(word=>word.startsWith("#")&&word.length>1).map(tag=>tag.slice(1));console.log(...extractHashtags("Hello #world #javascript"));',
            },
            {
              label: "Handle blank input and expose punctuation behavior",
              language: "javascript",
              code: 'const extractHashtags=text=>text.split(/\\s+/).filter(word=>word.startsWith("#")&&word.length>1).map(tag=>tag.slice(1));console.log(extractHashtags("").length,extractHashtags("#").length);console.log(...extractHashtags("#world! ##tag"));',
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
            "Return the string repeated the requested number of times. Use it for fixed repetition or separators.",
          note: "Count is converted to an integer; a negative integer or Infinity throws RangeError. Avoid relying on engine-specific maximum string lengths.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat",
          examples: [
            {
              label: "Repeat the supplied short strings",
              language: "javascript",
              code: 'console.log("ab".repeat(3),"x".repeat(3),"Hi".repeat(2),"*".repeat(10));',
            },
            {
              label: "Check zero, fractional, and invalid counts",
              language: "javascript",
              code: 'console.log("abc".repeat(0),"abc".repeat(2.5));try{"abc".repeat(-1);}catch(error){console.log(error.name);}try{"x".repeat(Infinity);}catch(error){console.log(error.name);}',
            },
          ],
        },
        {
          name: "Separator lines and indent()",
          explanation:
            "Use repetition for a separator or a fixed two-space indentation unit. Prefix each line when indenting a multiline string.",
          note: "This helper splits LF lines and indents blank lines too; it is text formatting rather than code-aware reindentation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat",
          examples: [
            {
              label: "Create a separator and indent lines",
              language: "javascript",
              code: 'function indent(text,level){if(!Number.isSafeInteger(level)||level<0||level>1000)throw new RangeError("Use an indentation level from 0 to 1000");const spaces=" ".repeat(level*2);return text.split("\\n").map(line=>spaces+line).join("\\n");}const separator="-".repeat(50);console.log(separator.length,separator==="-".repeat(50));console.log(indent("one\\ntwo",1));',
            },
            {
              label: "Handle zero indentation and invalid levels",
              language: "javascript",
              code: 'function indent(text,level){if(!Number.isSafeInteger(level)||level<0||level>1000)throw new RangeError("Use an indentation level from 0 to 1000");const spaces=" ".repeat(level*2);return text.split("\\n").map(line=>spaces+line).join("\\n");}console.log(indent("one\\ntwo",0));try{indent("text",-1);}catch(error){console.log(error.name);}',
            },
          ],
        },
        {
          name: "leftPad() — bounded repeat-based padding",
          explanation:
            "Repeat a one-unit padding character to reach a minimum length. Clamp the missing amount to zero for an already-long string.",
          note: "This helper deliberately requires one UTF-16 padding unit. For arbitrary padding strings, native padStart repeats and truncates the fill to fit.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat",
          examples: [
            {
              label: "Pad and retain overlong input",
              language: "javascript",
              code: 'function leftPad(text,length,char=" "){if(!Number.isSafeInteger(length)||length<0||length>10000||char.length!==1)throw new RangeError("Use width 0–10000 and one UTF-16 padding unit");return char.repeat(Math.max(0,length-text.length))+text;}console.log(leftPad("5",3,"0"),leftPad("hello",3));',
            },
            {
              label: "Use spaces and reject multi-unit padding",
              language: "javascript",
              code: 'function leftPad(text,length,char=" "){if(!Number.isSafeInteger(length)||length<0||length>10000||char.length!==1)throw new RangeError("Use width 0–10000 and one UTF-16 padding unit");return char.repeat(Math.max(0,length-text.length))+text;}console.log(leftPad("Hi",5));try{leftPad("Hi",8,"ab");}catch(error){console.log(error.name);}',
            },
          ],
        },
        {
          name: "progressBar() — clamped text progress",
          explanation:
            "Build filled and empty sections from a percentage and a fixed cell count. Clamp percentages to 0–100 before calculating repeat counts.",
          note: "The block characters each occupy one UTF-16 unit, but their rendered width depends on the font. This is a text indicator, not a browser progress control.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat",
          examples: [
            {
              label: "Render the supplied percentage",
              language: "javascript",
              code: 'function progressBar(percent,width=20){if(!Number.isFinite(percent)||!Number.isSafeInteger(width)||width<1||width>1000)throw new RangeError("Use a finite percentage and width 1–1000");const value=Math.max(0,Math.min(100,percent)),count=Math.floor(value/100*width);return "["+"█".repeat(count)+"░".repeat(width-count)+"] "+value+"%";}console.log(progressBar(75,4));console.log(progressBar(75).length);',
            },
            {
              label: "Handle out-of-range and invalid values",
              language: "javascript",
              code: 'function progressBar(percent,width=20){if(!Number.isFinite(percent)||!Number.isSafeInteger(width)||width<1||width>1000)throw new RangeError("Use a finite percentage and width 1–1000");const value=Math.max(0,Math.min(100,percent)),count=Math.floor(value/100*width);return "["+"█".repeat(count)+"░".repeat(width-count)+"] "+value+"%";}console.log(progressBar(-5,4),progressBar(150,4));try{progressBar(NaN);}catch(error){console.log(error.name);}',
            },
          ],
        },
        {
          name: "Plus operator and concat()",
          explanation:
            "Use + or concat to combine strings and explicit separators. Use the form that keeps the intended composition readable.",
          note: "The + operator also performs numeric addition depending on its operands; concat converts its arguments to strings. Neither inserts spaces automatically.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat",
          examples: [
            {
              label: "Combine the supplied greeting",
              language: "javascript",
              code: 'const first="Hello",second="World";console.log(first+" "+second,first.concat(" ",second),first.concat(" ",second,"!"));',
            },
            {
              label: "Observe conversion and addition order",
              language: "javascript",
              code: 'console.log(1+2+"x","x"+1+2,"".concat(1,2));',
            },
          ],
        },
        {
          name: "Template interpolation and array joining",
          explanation:
            "Use a template literal for named values or join for a list of string parts. Use separators explicitly in either approach.",
          note: "Templates interpolate expressions rather than evaluating text as code. join follows array stringification rules.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
          examples: [
            {
              label: "Use the supplied greeting forms",
              language: "javascript",
              code: 'const first="Hello",second="World";console.log(`${first} ${second}`,[first,second].join(" "));',
            },
            {
              label: "Interpolate values and expressions",
              language: "javascript",
              code: 'const name="John",age=30;console.log(`Hello, ${name}! You are ${age} years old.`);console.log(`2 + 2 = ${2+2}`,`Uppercase: ${name.toUpperCase()}`,`Ternary: ${age>=18?"Adult":"Minor"}`);',
            },
          ],
        },
        {
          name: "Build repeated output without performance assumptions",
          explanation:
            "Choose repeat for uniform repetition or accumulate parts and join for separately generated pieces. Compare outputs before considering workload-specific timing.",
          note: "Modern engines may optimize concatenation; loop +, concat, templates, and join do not have one universal speed ranking. The examples assert behavior, not timing.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat",
          examples: [
            {
              label: "Compare the supplied thousand-character constructions",
              language: "javascript",
              code: 'let joinedByPlus="";for(let i=0;i<1000;i++)joinedByPlus+="x";const parts=[];for(let i=0;i<1000;i++)parts.push("x");const joined=parts.join("");console.log(joinedByPlus.length,joined===joinedByPlus,joined==="x".repeat(1000));',
            },
            {
              label: "Join separately generated pieces",
              language: "javascript",
              code: 'const parts=[];for(let i=1;i<=3;i++)parts.push("item"+i);console.log(parts.join(", "));',
            },
          ],
        },
        {
          name: "Multiline template strings",
          explanation:
            "Write literal line breaks in a template to preserve multiline layout. Use it for fixed text where the whitespace is intentional.",
          note: "Leading/trailing newlines and indentation are part of the string. Interpolation into HTML is not automatically escaped.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
          examples: [
            {
              label: "Build the supplied multiline message",
              language: "javascript",
              code: 'const name="John",age=30;const message=`Dear ${name},\n\nThis is a multi-line message.\nYou are ${age} years old.\n\nBest regards`;console.log(message);',
            },
            {
              label: "Inspect preserved indentation and edge newlines",
              language: "javascript",
              code: 'const message=`\n  Line 1\n  Line 2\n`;console.log(message.startsWith("\\n  "),message.endsWith("\\n"),message.split("\\n").length);',
            },
          ],
        },
        {
          name: "Tagged templates — highlight interpolated text",
          explanation:
            "Receive literal fragments and values in a tag function and produce an explicit output format. Use value positions rather than truthiness so zero and false are retained.",
          note: "This tag escapes text fragments and values before adding mark elements. It is text-to-HTML formatting, not a generic HTML template system.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
          examples: [
            {
              label: "Highlight the supplied values",
              language: "javascript",
              code: 'const escapeText=text=>String(text).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");function highlight(strings,...values){return strings.reduce((result,part,index)=>result+escapeText(part)+(index<values.length?"<mark>"+escapeText(values[index])+"</mark>":""),"");}const name="John",age=30;console.log(highlight`Hello ${name}, you are ${age}`);',
            },
            {
              label: "Keep falsy values and escape markup",
              language: "javascript",
              code: 'const escapeText=text=>String(text).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");function highlight(strings,...values){return strings.reduce((result,part,index)=>result+escapeText(part)+(index<values.length?"<mark>"+escapeText(values[index])+"</mark>":""),"");}console.log(highlight`${0}|${false}|${""}|${"<img>"}`);',
            },
          ],
        },
        {
          name: "normalize() — NFC and NFD",
          explanation:
            "Normalize canonically equivalent Unicode representations before code-unit equality checks. Use NFC for canonical composition and NFD for canonical decomposition.",
          note: "This changes Unicode representation, not byte encoding. It does not remove accents, fold case, or guarantee that visually similar text is equal.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize",
          examples: [
            {
              label: "Compare explicit composed and decomposed values",
              language: "javascript",
              code: 'const composed="\\u00e9",decomposed="e\\u0301";console.log(composed===decomposed,composed.normalize()===decomposed.normalize());console.log(composed.normalize("NFC").length,composed.normalize("NFD").length);',
            },
            {
              label: "Normalize the supplied user-input example",
              language: "javascript",
              code: 'const first="caf\\u00e9",second="cafe\\u0301";console.log(first===second,first.normalize("NFC")===second.normalize("NFC"),first);',
            },
          ],
        },
        {
          name: "normalize() — NFKC and NFKD",
          explanation:
            "Apply compatibility composition or decomposition when compatibility distinctions should be collapsed. Choose that policy explicitly rather than treating it as ordinary equality.",
          note: "Compatibility normalization can lose meaningful formatting distinctions. Preserve original text where those distinctions matter.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize",
          examples: [
            {
              label: "Compare canonical and compatibility forms",
              language: "javascript",
              code: 'console.log("ﬀ".normalize("NFC"),"ﬀ".normalize("NFKC"),"①".normalize("NFKD"));',
            },
            {
              label: "Handle an invalid normalization name",
              language: "javascript",
              code: 'console.log("é".normalize("NFKD")==="e\\u0301");try{"text".normalize("INVALID");}catch(error){console.log(error.name);}',
            },
          ],
        },
        {
          name: "localeCompare() — compare by locale",
          explanation:
            "Compare strings according to a requested locale’s collation. Use the sign of the result for ordering.",
          note: "Only negative, zero, or positive is guaranteed, not exactly -1 or 1. Explicit locales make the demonstrated intent clearer than relying on the runtime default.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare",
          examples: [
            {
              label: "Check basic comparison signs",
              language: "javascript",
              code: 'console.log("a".localeCompare("b","en")<0,"b".localeCompare("a","en")>0,"a".localeCompare("a","en")===0);',
            },
            {
              label: "Compare the supplied English and Swedish order",
              language: "javascript",
              code: 'console.log("ä".localeCompare("z","en")<0,"ä".localeCompare("z","sv")>0);',
            },
          ],
        },
        {
          name: "localeCompare() numeric and sensitivity options",
          explanation:
            "Use numeric collation for digit runs and sensitivity to select which distinctions matter. Use these options for the stated locale and display-order contract.",
          note: "Comparison equality at a chosen sensitivity is not the same as identical string content. Locale data can differ across runtime versions.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare",
          examples: [
            {
              label: "Compare numeric labels and base-level text",
              language: "javascript",
              code: 'const options={numeric:true,sensitivity:"base"};console.log("item2".localeCompare("item10","en",options)<0,"a".localeCompare("A","en",{sensitivity:"base"})===0);',
            },
            {
              label: "Sort the supplied Swedish names",
              language: "javascript",
              code: 'const names=["Åsa","Örjan","Andreas"];names.sort((a,b)=>a.localeCompare(b,"sv"));console.log(...names);',
            },
          ],
        },
        {
          name: "toLocaleLowerCase() and toLocaleUpperCase()",
          explanation:
            "Convert case according to an explicit locale. Use Turkish mappings when dotted and dotless I distinctions are intended.",
          note: "Default casing is not Turkish-specific. Casing can change string length, and the transformations are not generally reversible.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleLowerCase",
          examples: [
            {
              label: "Compare Turkish lowercase with default Unicode lowercase",
              language: "javascript",
              code: 'const text="İstanbul";console.log(text.toLowerCase()==="i\\u0307stanbul",text.toLocaleLowerCase("tr-TR"));',
            },
            {
              label: "Choose Turkish and English uppercase mappings",
              language: "javascript",
              code: 'console.log("i".toLocaleUpperCase("tr-TR"),"i".toLocaleUpperCase("en-US"));',
            },
          ],
        },
        {
          name: "Intl.Collator — reusable locale comparison",
          explanation:
            "Construct a collator once and reuse its compare function for many comparisons. Use it when sorting repeatedly with a stable locale/options policy.",
          note: "The comparator returns a sign, not a guaranteed unit value. Array.sort mutates its input, so a helper can copy the input when preservation is intended.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator",
          examples: [
            {
              label: "Use the supplied German and numeric examples",
              language: "javascript",
              code: 'const german=new Intl.Collator("de-DE");console.log(german.compare("ä","z")<0);const collator=new Intl.Collator("en",{numeric:true,sensitivity:"accent"});const items=["item10","item2","item1"];items.sort(collator.compare);console.log(...items);',
            },
            {
              label: "Reuse a collator while preserving source order",
              language: "javascript",
              code: 'const collator=new Intl.Collator("sv");const sortNames=names=>names.slice().sort(collator.compare);const names=["Åsa","Örjan","Andreas"];console.log(...sortNames(names));console.log(...names);',
            },
          ],
        },
        {
          name: "Template literals — expressions and text layout",
          explanation:
            "Interpolate expressions in a backtick-delimited string and preserve its literal newlines. Use it for readable variable-based formatting.",
          note: "Template interpolation performs string conversion, not HTML escaping or data binding. Variables and expressions are evaluated in the surrounding JavaScript context.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
          examples: [
            {
              label: "Format the supplied user and expressions",
              language: "javascript",
              code: 'const user="Alice",age=30;console.log(`User ${user} is ${age} years old`);console.log(`2 + 2 = ${2+2}`,`Uppercase: ${user.toUpperCase()}`);',
            },
            {
              label: "Preserve multiline content",
              language: "javascript",
              code: 'const multiline=`Line 1\nLine 2\nLine 3`;console.log(multiline.split("\\n").length,multiline);',
            },
          ],
        },
        {
          name: "String.raw — preserve literal backslash sequences",
          explanation:
            "Use String.raw as a tag to retain the raw spelling of escapes in template fragments. Use it for paths and regex source strings with many backslashes.",
          note: "Substitutions are still evaluated and inserted; String.raw does not make substituted text safe for HTML, SQL, or regex embedding. Actual source line breaks remain actual line breaks.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw",
          examples: [
            {
              label: "Compare cooked escapes and raw spelling",
              language: "javascript",
              code: 'const normal=`Line 1\\nLine 2\\tTabbed`,raw=String.raw`Line 1\\nLine 2\\tTabbed`;console.log(normal.includes("\\n"),raw.includes("\\n"),raw);',
            },
            {
              label: "Keep a path while processing substitutions",
              language: "javascript",
              code: 'const folder="Documents";const path=String.raw`C:\\Users\\Documents\\file.txt`;console.log(path);const newline="\\n";console.log(String.raw`${newline}`.length);',
            },
          ],
        },
        {
          name: "String.raw for regular-expression source",
          explanation:
            "Construct a regex from a raw template so regex backslashes need no additional string-literal escaping. Use it for a fixed pattern source.",
          note: "Raw templates do not escape interpolated literals; use RegExp.escape when inserting text that must not be regex syntax.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw",
          examples: [
            {
              label: "Build the supplied phone-shaped pattern",
              language: "javascript",
              code: 'const source=String.raw`\\d{3}-\\d{3}-\\d{4}`;const regex=new RegExp("^"+source+"$");console.log(regex.test("123-456-7890"),regex.test("1234567890"));',
            },
            {
              label: "Read the preserved source explicitly",
              language: "javascript",
              code: 'const source=String.raw`\\d+`;console.log(source==="\\\\d+",new RegExp(source).exec("id42")[0]);',
            },
          ],
        },
        {
          name: "Custom raw tag — query text versus bound values",
          explanation:
            "Pass a template’s raw fragments and substitutions to String.raw for explicit text formatting. Use a separate parameter-producing tag when demonstrating value binding.",
          note: "The raw sql formatter below only logs fixed demo data; it is not SQL parameterization. Identifiers such as table names cannot generally be bound as values, and actual execution requires the database driver’s parameter API.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw",
          examples: [
            {
              label: "Reproduce fixed demonstration query text",
              language: "javascript",
              code: 'function sql(strings,...values){return String.raw(strings,...values);}const table="users",id=123;console.log(sql`SELECT * FROM ${table} WHERE id = ${id}`);',
            },
            {
              label: "Keep query values separate from query text",
              language: "javascript",
              code: 'function sql(strings,...values){let text=strings[0];for(let i=0;i<values.length;i++)text+="?"+strings[i+1];return {text,values};}const id="123 OR 1=1";const query=sql`SELECT * FROM users WHERE id = ${id}`;console.log(query.text,query.values[0]);',
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
            "Extract matching text, or null when no match exists. Without g, the result includes capture groups and the first match index; with g, it contains full matching strings.",
          note: "Run each example independently.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match",
          examples: [
            {
              label: "Find the first phone-shaped sequence",
              language: "javascript",
              code: 'const text="Phone: 123-456-7890, Fax: 098-765-4321"; const match=text.match(/\\d{3}-\\d{3}-\\d{4}/); console.log(match[0],match.index);',
            },
            {
              label: "Collect all matches and handle absence",
              language: "javascript",
              code: 'const text="123-456-7890, 098-765-4321"; console.log(...text.match(/\\d{3}-\\d{3}-\\d{4}/g)); console.log(text.match(/notfound/));',
            },
            {
              label: "Read captured address pieces",
              language: "javascript",
              code: 'const result="john.doe@example.com".match(/([^@]+)@([^@]+)/); console.log(result[0],result[1],result[2]);',
            },
          ],
        },
        {
          name: "search() — find the first matching index",
          explanation:
            "Return the first matching index or -1. Use this when the position matters more than the matched text.",
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
            "Return a new string with the first match replaced, or every match when the pattern has g. A callback can transform each matched value.",
          note: "The input string remains unchanged.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Replace all occurrences",
              language: "javascript",
              code: 'console.log("old and old".replace(/old/g,"new"));',
            },
            {
              label: "Transform numbers",
              language: "javascript",
              code: 'console.log("2 plus 3".replace(/\\d+/g,n=>Number(n)*2));',
            },
          ],
        },
        {
          name: "split() — divide by a pattern",
          explanation:
            "Return an array separated at regex matches. Use character classes for multiple delimiters and capture groups when separators should remain in the result.",
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
            "Iterate full match records containing captures and indices. Use it when every match needs the details that global match() omits.",
          note: "A RegExp argument must have the g flag.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll",
          examples: [
            {
              label: "Inspect captures and positions",
              language: "javascript",
              code: 'for(const match of "test1 test2 test3".matchAll(/test(\\d)/g)){ console.log(match[0],match[1],match.index); }',
            },
            {
              label: "Collect matches or an empty result",
              language: "javascript",
              code: 'const matches=[..."test1 test2".matchAll(/test(\\d)/g)]; console.log(matches.map(m=>m[1]).join(","),[..."none".matchAll(/test(\\d)/g)].length);',
            },
          ],
        },
        {
          name: "RegExp.test() — boolean checks",
          explanation:
            "Return whether a pattern matches. Use it for a presence check or an explicitly limited format rule.",
          note: "Unlike string methods, test belongs to RegExp. Patterns with g or y keep lastIndex state; avoid those flags for independent boolean checks.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test",
          examples: [
            {
              label: "Check for digits",
              language: "javascript",
              code: 'const str="item42"; console.log(/\\d/.test(str),/\\d/.test("plain"));',
            },
            {
              label: "Check the supplied ASCII email shape",
              language: "javascript",
              code: 'const pattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/; console.log(pattern.test("user@example.com"),pattern.test("invalid.email"));',
            },
          ],
        },
        {
          name: "isEmail() — basic address shape",
          explanation:
            "Check for non-whitespace address parts around one @ and a domain dot. Use this as a basic input hint.",
          note: "This does not establish RFC validity, deliverability, or ownership. The quick-reference /^[^@]+@[^@]+$/ only checks an even looser shape.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match",
          examples: [
            {
              label: "Check typical inputs",
              language: "javascript",
              code: 'const isEmail=str=>/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(str); console.log(isEmail("test@email.com"),isEmail("invalid.email"));',
            },
            {
              label: "Reject spaces and explain the loose quick check",
              language: "javascript",
              code: 'const isEmail=str=>/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(str); console.log(isEmail("a b@example.com"),/^[^@]+@[^@]+$/.test("a@b"),isEmail("a@b"));',
            },
          ],
        },
        {
          name: "isPhone() — permitted phone characters",
          explanation:
            "Check the supplied optional leading plus and digit/space/parenthesis/hyphen character set. Use it only as a character filter.",
          note: "The supplied pattern accepts punctuation alone and unbalanced parentheses; it does not validate a telephone number.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match",
          examples: [
            {
              label: "Check the allowed character set",
              language: "javascript",
              code: 'const isPhone=str=>/^\\+?[\\d\\s()-]+$/.test(str); console.log(isPhone("+1 (123) 456-7890"),isPhone("call me"));',
            },
            {
              label: "Expose the filter limitations",
              language: "javascript",
              code: 'const isPhone=str=>/^\\+?[\\d\\s()-]+$/.test(str); console.log(isPhone("---"),isPhone("((123"),isPhone(""));',
            },
          ],
        },
        {
          name: "isURL() — limited shape and URL parsing",
          explanation:
            "Use the supplied regex for a narrow host/path shape. For an absolute HTTP URL policy, parse with URL and check the resulting protocol.",
          note: "Neither a regex match nor successful parsing proves a destination exists or is safe to access.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match",
          examples: [
            {
              label: "Check the supplied restricted shape",
              language: "javascript",
              code: 'const isURL=str=>/^(https?:\\/\\/)?([\\w-]+\\.)+[\\w-]+(\\/[\\w./?%&=-]*)?$/.test(str); console.log(isURL("https://example.com/path"),isURL("example.com"),isURL("not a url"));',
            },
            {
              label: "Require an absolute HTTP or HTTPS URL",
              language: "javascript",
              code: 'const isURL=str=>{try{const url=new URL(str);return ["http:","https:"].includes(url.protocol);}catch{return false;}}; console.log(isURL("https://example.com"),isURL("example.com"),isURL("ftp://example.com"));',
            },
          ],
        },
        {
          name: "extractURLs() — collect HTTP-like substrings",
          explanation:
            "Collect non-whitespace sequences beginning with http:// or https://. Return an empty array when none match.",
          note: "Trailing punctuation is included by this simple pattern; it is an extractor rather than a URL validator.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match",
          examples: [
            {
              label: "Extract two links",
              language: "javascript",
              code: 'const extractURLs=text=>text.match(/https?:\\/\\/[^\\s]+/g)||[]; console.log(...extractURLs("See https://example.com and http://example.org/a"));',
            },
            {
              label: "Show punctuation and no-match behavior",
              language: "javascript",
              code: 'const extractURLs=text=>text.match(/https?:\\/\\/[^\\s]+/g)||[]; console.log(extractURLs("See https://example.com.")[0],extractURLs("no links").length);',
            },
          ],
        },
        {
          name: "extractHashtags() — ASCII word tags",
          explanation:
            "Collect hash-prefixed word-character sequences. Use this for the supplied simple ASCII tag convention.",
          note: "The returned tags retain #. JavaScript \\w covers ASCII letters, digits, and underscore, not all Unicode letters.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match",
          examples: [
            {
              label: "Extract tags",
              language: "javascript",
              code: 'const extractHashtags=text=>text.match(/#\\w+/g)||[]; console.log(...extractHashtags("Hello #world #javascript"));',
            },
            {
              label: "Handle no tags and underscores",
              language: "javascript",
              code: 'const extractHashtags=text=>text.match(/#\\w+/g)||[]; console.log(extractHashtags("plain").length,extractHashtags("#hello_world")[0]);',
            },
          ],
        },
        {
          name: "extractMentions() — ASCII mention substrings",
          explanation:
            "Collect @ followed by word characters. Use it for a simple mention convention.",
          note: "It also finds substrings inside email addresses and stops at punctuation; it is not a platform-specific mention parser.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match",
          examples: [
            {
              label: "Extract mentions",
              language: "javascript",
              code: 'const extractMentions=text=>text.match(/@\\w+/g)||[]; console.log(...extractMentions("Hi @alice and @bob_2"));',
            },
            {
              label: "Show email overlap and absence",
              language: "javascript",
              code: 'const extractMentions=text=>text.match(/@\\w+/g)||[]; console.log(extractMentions("a@example.com")[0],extractMentions("plain").length);',
            },
          ],
        },
        {
          name: "stripHtml() — a simple tag-shaped text demo",
          explanation:
            "Remove substrings that look like angle-bracket tags. Use this only to demonstrate regex replacement on controlled strings.",
          note: "This is not an HTML parser or sanitizer; quoted > characters and HTML syntax defeat the pattern.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Remove simple tag-shaped fragments",
              language: "javascript",
              code: 'const stripHtml=html=>html.replace(/<[^>]*>/g,""); console.log(stripHtml("<b>Hello</b> <i>world</i>"));',
            },
            {
              label: "Demonstrate a quoted-angle limitation",
              language: "javascript",
              code: 'const stripHtml=html=>html.replace(/<[^>]*>/g,""); console.log(stripHtml(\'<span title=">">hello</span>\'));',
            },
          ],
        },
        {
          name: "validatePassword() — report individual rules",
          explanation:
            "Return a boolean for each supplied length, case, digit, and special-character rule. Use the result to explain which stated requirements are met.",
          note: "These are policy checks rather than a strength estimate. The length rule here counts Unicode code points across the entire input, including line breaks.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test",
          examples: [
            {
              label: "Report all passing rules",
              language: "javascript",
              code: 'const validatePassword=password=>{const patterns={minLength:/^[\\s\\S]{8,}$/u,hasUpper:/[A-Z]/,hasLower:/[a-z]/,hasNumber:/\\d/,hasSpecial:/[!@#$%^&*]/};return Object.fromEntries(Object.entries(patterns).map(([key,pattern])=>[key,pattern.test(password)]));}; console.log(...Object.values(validatePassword("Abcdef1!")));',
            },
            {
              label: "Report missing requirements",
              language: "javascript",
              code: 'const validatePassword=password=>{const patterns={minLength:/^[\\s\\S]{8,}$/u,hasUpper:/[A-Z]/,hasLower:/[a-z]/,hasNumber:/\\d/,hasSpecial:/[!@#$%^&*]/};return Object.fromEntries(Object.entries(patterns).map(([key,pattern])=>[key,pattern.test(password)]));}; console.log(...Object.values(validatePassword("short")));',
            },
          ],
        },
        {
          name: "cleanWhitespace() — collapse and trim",
          explanation:
            "Replace each whitespace run with a single space, then remove whitespace at the ends. Use it for single-line text cleanup.",
          note: "This removes line-break structure as well as extra spaces.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Collapse mixed whitespace",
              language: "javascript",
              code: 'const cleanWhitespace=str=>str.replace(/\\s+/g," ").trim(); console.log(cleanWhitespace("  Hello\\n\\tworld  "));',
            },
            {
              label: "Handle blank and already clean input",
              language: "javascript",
              code: 'const cleanWhitespace=str=>str.replace(/\\s+/g," ").trim(); console.log(cleanWhitespace(" \\n "),cleanWhitespace("Hello world"));',
            },
          ],
        },
        {
          name: "toKebabCase() — supplied ASCII conversion",
          explanation:
            "Insert hyphens before ASCII uppercase letters, replace whitespace/underscore runs, trim edge hyphens, and lowercase. Use it for the supplied simple naming convention.",
          note: "Acronyms become separate letters, whitespace before an uppercase letter can produce two hyphens, and existing repeated interior hyphens remain; this is not a general Unicode word segmenter.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Convert mixed naming conventions",
              language: "javascript",
              code: 'const toKebabCase=str=>str.replace(/[A-Z]/g,letter=>`-${letter.toLowerCase()}`).replace(/[\\s_]+/g,"-").replace(/^-+|-+$/g,"").toLowerCase(); console.log(toKebabCase("helloWorld"),toKebabCase("Hello World"),toKebabCase("snake_case"));',
            },
            {
              label: "Show acronym and existing hyphen behavior",
              language: "javascript",
              code: 'const toKebabCase=str=>str.replace(/[A-Z]/g,letter=>`-${letter.toLowerCase()}`).replace(/[\\s_]+/g,"-").replace(/^-+|-+$/g,"").toLowerCase(); console.log(toKebabCase("XML"),toKebabCase("a--b"),toKebabCase(""));',
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
