/* Add only Regular Expressions categories supplied by the user, in image order. */
const handbook = {
  categories: [
    {
      name: "Basic Patterns",
      id: "basic-patterns",
      intro:
        "Character classes → anchors → quantifiers, following all three images. Run each snippet independently in a current browser console or Node.js. Examples distinguish substring tests from full-input validation, ASCII word and digit sets from Unicode text, zero-width assertions from character matches, and greedy from lazy preferences.",
      methods: [
        {
          name: ". — wildcard character",
          explanation:
            "Matches one character, except a line break unless s is enabled.",
          note: "Without Unicode-aware mode, it matches one UTF-16 code unit. The s flag includes line terminators; [\\s\\S] is another way to match either whitespace or non-whitespace.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Wildcard",
          examples: [
            {
              label: "Match a varying character",
              language: "javascript",
              code: 'console.log(/h.t/.test("hat"), /h.t/.test("h9t"), /h.t/.test("ht"));',
            },
            {
              label: "Distinguish dotAll and Unicode behavior",
              language: "javascript",
              code: 'console.log(/a.b/.test("a\\nb"), /a.b/s.test("a\\nb"), /a[\\s\\S]b/.test("a\\nb"));\nconsole.log(/^.$/.test("😀"), /^.$/u.test("😀"));',
            },
          ],
        },
        {
          name: "\\d — digit",
          explanation: "Matches an ASCII digit from 0 through 9.",
          note: "Equivalent to [0-9], even with the u flag; it does not include every Unicode numeral. The phone pattern below checks only the demonstrated shape.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class_escape",
          examples: [
            {
              label: "Check a simple phone shape",
              language: "javascript",
              code: 'console.log(/^\\d{3}-\\d{4}$/.test("555-1234"), /^\\d{3}-\\d{4}$/.test("55-1234"));',
            },
            {
              label: "Extract ASCII digits",
              language: "javascript",
              code: 'console.log("Room 42".match(/\\d+/)[0]);\nconsole.log(/\\d/u.test("٣"));',
            },
          ],
        },
        {
          name: "\\D — non-digit",
          explanation: "Matches one character outside ASCII 0–9.",
          note: "Includes letters, punctuation, whitespace, and non-ASCII numerals; it is the complement of \\d.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class_escape",
          examples: [
            {
              label: "Remove separators from a demonstrated format",
              language: "javascript",
              code: 'console.log("(555) 123-4567".replace(/\\D/g, ""));',
            },
            {
              label: "Detect non-digit input",
              language: "javascript",
              code: 'console.log(/\\D/.test("123"), /\\D/.test("12a"), /\\D/u.test("٣"));',
            },
          ],
        },
        {
          name: "\\w — word character",
          explanation: "Matches ASCII letters, digits, and underscore.",
          note: "It is not a general Unicode-letter class. Unicode-aware case-insensitive matching can additionally include characters that case-fold to ASCII word characters.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class_escape",
          examples: [
            {
              label: "Match an ASCII identifier shape",
              language: "javascript",
              code: 'console.log(/^\\w+$/.test("user_42"), /^\\w+$/.test("user-name"));',
            },
            {
              label: "Observe the limits of word characters",
              language: "javascript",
              code: 'console.log(/\\w/.test("_"), /\\w/u.test("é"), /\\w/iu.test("K"));',
            },
          ],
        },
        {
          name: "\\W — non-word character",
          explanation: "Matches characters outside the word-character set.",
          note: "Underscore is a word character and is not matched by \\W; accented letters may count as non-word under these semantics.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class_escape",
          examples: [
            {
              label: "Split at non-word separators",
              language: "javascript",
              code: 'console.log(..."one-two three".split(/\\W+/));',
            },
            {
              label: "Distinguish underscores from punctuation",
              language: "javascript",
              code: 'console.log(/\\W/.test("user_42"), /\\W/.test("user-42"), /\\W/u.test("é"));',
            },
          ],
        },
        {
          name: "\\s — whitespace",
          explanation:
            "Matches whitespace, including spaces, tabs, and line breaks.",
          note: "Includes more than an ordinary space, such as non-breaking space; it is not limited to spaces, tabs, and newlines.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class_escape",
          examples: [
            {
              label: "Collapse repeated whitespace",
              language: "javascript",
              code: 'console.log("hello\\t \\nworld".replace(/\\s+/g, " "));',
            },
            {
              label: "Match several whitespace kinds",
              language: "javascript",
              code: 'console.log(\n  /\\s/.test(" "),\n  /\\s/.test("\\t"),\n  /\\s/.test("\\n"),\n  /\\s/.test("\\u00a0"),\n);',
            },
          ],
        },
        {
          name: "\\S — non-whitespace",
          explanation: "Matches a character that is not whitespace.",
          note: "A character class matches one character; add a quantifier to collect a token.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class_escape",
          examples: [
            {
              label: "Extract tokens",
              language: "javascript",
              code: 'console.log(..."  alpha\\tbeta\\n ".match(/\\S+/g));',
            },
            {
              label: "Require a visible token without spaces",
              language: "javascript",
              code: 'console.log(\n  /^\\S+$/.test("token_1"),\n  /^\\S+$/.test("two words"),\n  /^\\S+$/.test(""),\n);',
            },
          ],
        },
        {
          name: "[abc] — explicit character set",
          explanation: "Matches one of the characters listed between brackets.",
          note: "It matches one member, not the literal string abc; most punctuation has different meaning inside a class.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class",
          examples: [
            {
              label: "Find a vowel",
              language: "javascript",
              code: 'console.log(/[aeiou]/.test("hello"), /[aeiou]/.test("rhythm"));',
            },
            {
              label: "Collect selected characters",
              language: "javascript",
              code: 'console.log(..."cab-d".match(/[abc]/g));',
            },
          ],
        },
        {
          name: "[^abc] — negated character set",
          explanation: "Matches one character that is not in the listed set.",
          note: "This caret is class negation, distinct from the start anchor outside brackets. A negated class can match line terminators.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class",
          examples: [
            {
              label: "Find a non-digit",
              language: "javascript",
              code: 'console.log(/[^0-9]/.test("abc"), /[^0-9]/.test("123"));',
            },
            {
              label: "Exclude selected characters while retaining others",
              language: "javascript",
              code: 'console.log("abcXYZ".match(/[^abc]+/)[0]);\nconsole.log(/[^abc]/.test("\\n"));',
            },
          ],
        },
        {
          name: "[a-z] — lowercase range",
          explanation: "Matches one ASCII lowercase letter between a and z.",
          note: "The range is based on character values, not locale-aware alphabetical order; it does not include accented letters.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class",
          examples: [
            {
              label: "Require lowercase ASCII letters",
              language: "javascript",
              code: 'console.log(\n  /^[a-z]+$/.test("hello"),\n  /^[a-z]+$/.test("Hello"),\n  /^[a-z]+$/u.test("café"),\n);',
            },
            {
              label: "Extract lowercase runs",
              language: "javascript",
              code: 'console.log(..."ABcat42dog".match(/[a-z]+/g));',
            },
          ],
        },
        {
          name: "[A-Z] — uppercase range",
          explanation: "Matches one ASCII uppercase letter between A and Z.",
          note: "Combine separate ranges instead of [A-z], which also includes punctuation between Z and a.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class",
          examples: [
            {
              label: "Check an uppercase code",
              language: "javascript",
              code: 'console.log(/^[A-Z]{3}$/.test("USA"), /^[A-Z]{3}$/.test("Usa"));',
            },
            {
              label: "Combine uppercase, lowercase, and digit ranges",
              language: "javascript",
              code: 'console.log(/^[a-zA-Z0-9]+$/.test("Ab12"), /^[a-zA-Z0-9]+$/.test("Ab_12"));',
            },
          ],
        },
        {
          name: "[0-9] — digit range",
          explanation:
            "Matches one ASCII digit, with the same membership as \\d.",
          note: "Neither spelling matches non-ASCII decimal numerals.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class",
          examples: [
            {
              label: "Compare equivalent digit spellings",
              language: "javascript",
              code: 'console.log("a12b".match(/[0-9]+/)[0], "a12b".match(/\\d+/)[0]);',
            },
            {
              label: "Compose a small ASCII set",
              language: "javascript",
              code: 'console.log(/^[A-F0-9]+$/.test("A2F9"), /^[A-F0-9]+$/.test("G2"));',
            },
          ],
        },
        {
          name: "^ — start boundary",
          explanation:
            "Checks the start of input, or the start of a line with m.",
          note: "An anchor consumes no characters. With m, starts also occur immediately after JavaScript line terminators.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Input_boundary_assertion",
          examples: [
            {
              label: "Require an input prefix",
              language: "javascript",
              code: 'console.log(/^hello/.test("hello world"), /^hello/.test("say hello"));',
            },
            {
              label: "Enable line starts with multiline mode",
              language: "javascript",
              code: 'const text = "line1\\nline2";\nconsole.log(/^line2/m.test(text), /^line2/.test(text));',
            },
          ],
        },
        {
          name: "$ — end boundary",
          explanation: "Checks the end of input, or the end of a line with m.",
          note: "In JavaScript without m, $ requires the actual input end; it does not also match before a trailing newline. Under m it can match before a line terminator.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Input_boundary_assertion",
          examples: [
            {
              label: "Require a suffix and full-input match",
              language: "javascript",
              code: 'console.log(\n  /world$/.test("hello world"),\n  /^hello$/.test("hello"),\n  /^hello$/.test("hello world"),\n);',
            },
            {
              label: "Distinguish trailing newline and multiline mode",
              language: "javascript",
              code: 'console.log(/^hello$/.test("hello\\n"), /^hello$/m.test("hello\\n"));\nconsole.log(/line1$/m.test("line1\\nline2"));',
            },
          ],
        },
        {
          name: "\\b — word boundary",
          explanation:
            "Asserts a position between a word character and a non-word character or an input edge.",
          note: "Zero-width: it consumes no character. It follows \\w-style semantics, so it is not a general natural-language word separator; inside a class, [\\b] means backspace.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Word_boundary_assertion",
          examples: [
            {
              label: "Match a whole ASCII word",
              language: "javascript",
              code: 'console.log(/\\bcat\\b/.test("cat in hat"), /\\bcat\\b/.test("scatter"));',
            },
            {
              label: "Observe underscores and accented text",
              language: "javascript",
              code: 'console.log(/\\bcat\\b/.test("cat_1"), /\\bcat\\b/.test("cat!"));\nconsole.log(/\\bcat\\b/u.test("écaté"));',
            },
          ],
        },
        {
          name: "\\B — non-word-boundary assertion",
          explanation: "Asserts a position that is not a word boundary.",
          note: "It does not consume characters and is broader than simply “inside a word”; positions between non-word characters can also satisfy it.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Word_boundary_assertion",
          examples: [
            {
              label: "Find a substring inside a word",
              language: "javascript",
              code: 'console.log(/\\Bcat\\B/.test("scatter"), /\\Bcat\\B/.test("cat in hat"));',
            },
            {
              label: "Match positions between punctuation",
              language: "javascript",
              code: 'console.log(/!\\B!/.test("!!"), /!\\b!/.test("!!"));',
            },
          ],
        },
        {
          name: "* — zero or more repetitions",
          explanation:
            "Matches the preceding character or group zero or more times.",
          note: "Greedy by default; matching zero occurrences can produce an empty match, so an unanchored test may succeed without finding visible text.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Quantifier",
          examples: [
            {
              label: "Allow zero or several repeated letters",
              language: "javascript",
              code: 'console.log(/ab*c/.test("ac"), /ab*c/.test("abbbc"));',
            },
            {
              label: "Observe a zero-length match",
              language: "javascript",
              code: 'const match = /a*/.exec("bbb");\nconsole.log(match[0], match.index);',
            },
          ],
        },
        {
          name: "+ — one or more repetitions",
          explanation:
            "Matches the preceding character or group one or more times.",
          note: "Greedy by default; unlike *, it cannot satisfy the quantified atom with zero repetitions.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Quantifier",
          examples: [
            {
              label: "Require a repeated letter",
              language: "javascript",
              code: 'console.log(/ab+c/.test("ac"), /ab+c/.test("abc"), /ab+c/.test("abbbc"));',
            },
            {
              label: "Collect digit runs",
              language: "javascript",
              code: 'console.log(..."item12 and 345".match(/\\d+/g));',
            },
          ],
        },
        {
          name: "? — optional atom",
          explanation: "Makes the preceding character or group optional.",
          note: "This is a quantifier when applied to an atom; a ? appended to another quantifier instead selects lazy matching.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Quantifier",
          examples: [
            {
              label: "Accept two spelling variants",
              language: "javascript",
              code: 'console.log(\n  /^colou?r$/.test("color"),\n  /^colou?r$/.test("colour"),\n  /^colou?r$/.test("colouur"),\n);',
            },
            {
              label: "Make the scheme suffix optional",
              language: "javascript",
              code: 'console.log(\n  /^https?:\\/\\//.test("http://example.test"),\n  /^https?:\\/\\//.test("https://example.test"),\n);',
            },
          ],
        },
        {
          name: "{n} — exact repetition count",
          explanation:
            "Matches the preceding character or group exactly n times.",
          note: "An unanchored exact-count pattern can still match a substring inside a longer input.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Quantifier",
          examples: [
            {
              label: "Require three digits for the full input",
              language: "javascript",
              code: 'console.log(/^\\d{3}$/.test("123"), /^\\d{3}$/.test("1234"));',
            },
            {
              label: "Find a fixed-length substring",
              language: "javascript",
              code: 'console.log(/\\d{3}/.exec("id12345")[0]);',
            },
          ],
        },
        {
          name: "{n,} — minimum repetition count",
          explanation:
            "Matches the preceding character or group at least n times.",
          note: "Greedy by default; the engine may backtrack to satisfy what follows.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Quantifier",
          examples: [
            {
              label: "Require at least three digits",
              language: "javascript",
              code: 'console.log(/^\\d{3,}$/.test("12"), /^\\d{3,}$/.test("12345"));',
            },
            {
              label: "Match a longer repeated run",
              language: "javascript",
              code: 'console.log(/a{2,}/.exec("baaaac")[0]);',
            },
          ],
        },
        {
          name: "{n,m} — bounded repetition",
          explanation:
            "Matches the preceding character or group between n and m times.",
          note: "The bound applies to the quantified atom, not the entire input unless anchors require that.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Quantifier",
          examples: [
            {
              label: "Limit the full input length",
              language: "javascript",
              code: 'console.log(\n  /^\\d{2,4}$/.test("12"),\n  /^\\d{2,4}$/.test("1234"),\n  /^\\d{2,4}$/.test("12345"),\n);',
            },
            {
              label: "Take the greedy bounded substring",
              language: "javascript",
              code: 'const match = /\\d{2,4}/.exec("12345");\nconsole.log(match[0], match.index);',
            },
          ],
        },
        {
          name: "*? — lazy zero or more",
          explanation:
            "Starts with as few repetitions as possible and expands only when needed for the rest of the pattern.",
          note: "Lazy does not mean globally shortest across every alternative. These tag-shaped examples illustrate matching behavior and are not an HTML parser.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Quantifier",
          examples: [
            {
              label: "Compare greedy and lazy delimiters",
              language: "javascript",
              code: 'const text = "<div>text</div>";\nconsole.log(text.match(/<.*>/)[0], text.match(/<.*?>/)[0]);',
            },
            {
              label: "Match zero content between delimiters",
              language: "javascript",
              code: 'console.log(..."[] [abc]".match(/\\[.*?\\]/g));',
            },
          ],
        },
        {
          name: "+? — lazy one or more",
          explanation:
            "Requires at least one repetition, then expands minimally to satisfy the remaining pattern.",
          note: "A lazy quantifier can still consume several characters if the rest of the pattern requires them.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Quantifier",
          examples: [
            {
              label: "Require content and stop at each closing delimiter",
              language: "javascript",
              code: 'console.log(..."<a><bb>".match(/<.+?>/g));',
            },
            {
              label: "Compare lazy and greedy repetition",
              language: "javascript",
              code: 'console.log(\n  /a+?/.exec("aaaa")[0],\n  /a+/.exec("aaaa")[0],\n  /^a+?$/.exec("aaaa")[0],\n);',
            },
          ],
        },
        {
          name: "?? — lazy optional atom",
          explanation:
            "Tries zero occurrences of the preceding atom before trying one.",
          note: "The second ? modifies the first quantifier; it is unrelated to JavaScript’s nullish-coalescing operator outside a regex.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Quantifier",
          examples: [
            {
              label: "Compare optional greedy and lazy matches",
              language: "javascript",
              code: 'console.log(/a?/.exec("a")[0], /a??/.exec("a")[0]);',
            },
            {
              label: "Allow the remainder to require the optional atom",
              language: "javascript",
              code: 'console.log(/^ab??c$/.test("ac"), /^ab??c$/.test("abc"));',
            },
          ],
        },
        {
          name: "{n,}? — lazy minimum repetition",
          explanation: "Starts at n repetitions and expands only as needed.",
          note: "The minimum still applies; lazy changes the preference, not the permitted repetition counts.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Quantifier",
          examples: [
            {
              label: "Compare minimum and greedy runs",
              language: "javascript",
              code: 'console.log(/\\d{2,}?/.exec("12345")[0], /\\d{2,}/.exec("12345")[0]);',
            },
            {
              label: "Expand to satisfy a suffix",
              language: "javascript",
              code: 'console.log(/a{2,}?b/.exec("aaaab")[0], /^a{2,}?$/.exec("aaaa")[0]);',
            },
          ],
        },
      ],
    },
    {
      name: "Groups & References",
      id: "groups-references",
      intro:
        "Capturing and non-capturing groups → numbered and named references → lookarounds and the supplied practical patterns, following both images. Run each snippet independently in a current browser or Node.js with named-group and lookbehind support. Examples expose partial-match pitfalls and distinguish format demonstrations from complete validation.",
      methods: [
        {
          name: "(x) — capturing group",
          explanation: "Groups a pattern and saves its matched text.",
          note: "Index 0 is the full match. Captures are numbered by opening parenthesis, including nested captures; an absent optional capture is undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Capturing_group",
          examples: [
            {
              label: "Read two captured fields",
              language: "javascript",
              code: 'const match = "John Smith".match(/(\\w+) (\\w+)/);\nconsole.log(match[0], match[1], match[2]);',
            },
            {
              label: "Inspect nested and optional captures",
              language: "javascript",
              code: 'const match = /((a)b)(c)?/.exec("ab");\nconsole.log(match[0], match[1], match[2], match[3]);',
            },
          ],
        },
        {
          name: "(?:x) — non-capturing group",
          explanation: "Groups a pattern without saving its matched text.",
          note: "Does not change the numbering of later captures.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Non-capturing_group",
          examples: [
            {
              label: "Group a scheme without capturing it",
              language: "javascript",
              code: 'const pattern = /^(?:https?):\\/\\//;\nconsole.log(\n  pattern.test("https://"),\n  pattern.test("http://"),\n  pattern.test("ftp://"),\n);',
            },
            {
              label: "Repeat a group while retaining capture numbering",
              language: "javascript",
              code: 'const match = /^(?:ha)+(\\d+)$/.exec("hahaha42");\nconsole.log(match[0], match[1], match.length);',
            },
          ],
        },
        {
          name: "(?<name>x) — named capturing group",
          explanation:
            "Saves matched text under a readable name in match.groups while keeping its numeric capture position.",
          note: "The date pattern checks only numeric shape, not calendar validity. Check for null before accessing a match from arbitrary input.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Named_capturing_group",
          examples: [
            {
              label: "Extract named date fields",
              language: "javascript",
              code: 'const pattern = /^(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})$/;\nconst match = pattern.exec("2024-03-15");\nif (match)\n  console.log(\n    match.groups.year,\n    match.groups.month,\n    match.groups.day,\n    match[1],\n  );',
            },
            {
              label: "Handle absent fields and failed matches",
              language: "javascript",
              code: 'const pattern = /^(?<first>\\w+)(?: (?<last>\\w+))?$/;\nconst match = pattern.exec("John");\nconsole.log(match.groups.first, match.groups.last, pattern.exec("!") === null);',
            },
          ],
        },
        {
          name: "\\1, \\2 — numbered backreferences",
          explanation: "Matches text previously captured by a numbered group.",
          note: "Reuses captured text, not the original pattern. The i flag changes case comparison; a reference to a nonparticipating optional group can match the empty string.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Backreference",
          examples: [
            {
              label: "Require repeated fields",
              language: "javascript",
              code: 'console.log(/^(\\w+) \\1$/.test("hello hello"), /^(\\w+) \\1$/.test("hello world"));\nconsole.log(/^(\\w+)-(\\d+):\\1-\\2$/.test("item-42:item-42"));',
            },
            {
              label: "Pair quotes and observe case handling",
              language: "javascript",
              code: 'const quoted = /^([\'"])(.*?)\\1$/;\nconsole.log(\n  quoted.exec(\'"text"\')[2],\n  quoted.test("\'text\'"),\n  quoted.test("\\"text\'"),\n);\nconsole.log(/^(a)\\1$/.test("aA"), /^(a)\\1$/i.test("aA"));',
            },
          ],
        },
        {
          name: "\\k<name> — named backreference",
          explanation: "Matches the text saved by a named capturing group.",
          note: "Named captures still have numbered slots; names avoid renumbering mistakes when earlier groups are added.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Named_backreference",
          examples: [
            {
              label: "Require matching quote characters",
              language: "javascript",
              code: 'const pattern = /^(?<quote>[\'"])(?<text>.*?)\\k<quote>$/;\nconsole.log(\n  pattern.exec(\'"hello"\').groups.text,\n  pattern.test("\'hello\'"),\n  pattern.test("\\"hello\'"),\n);',
            },
            {
              label: "Require a repeated named token",
              language: "javascript",
              code: 'const pattern = /^(?<word>\\w+) \\k<word>$/;\nconsole.log(pattern.test("again again"), pattern.test("again different"));',
            },
          ],
        },
        {
          name: "(?=x) — positive lookahead",
          explanation:
            "Checks that x comes next without including it in the match.",
          note: "The assertion consumes no text, but captures inside a positive lookahead can still capture text.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookahead_assertion",
          examples: [
            {
              label: "Read digits before px",
              language: "javascript",
              code: 'const match = /\\d+(?=px)/.exec("100px");\nconsole.log(match[0], match.index);',
            },
            {
              label: "Observe zero width and an internal capture",
              language: "javascript",
              code: 'const match = /(?=(\\d+))/.exec("100px");\nconsole.log(match[0], match[1], match.index);',
            },
          ],
        },
        {
          name: "(?!x) — negative lookahead",
          explanation: "Checks that x does not come next.",
          note: "A preceding quantifier can backtrack to a shorter match, so a negative assertion does not automatically reject a whole numeric token.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookahead_assertion",
          examples: [
            {
              label: "Expose partial numeric backtracking",
              language: "javascript",
              code: 'console.log(/\\d+(?!px)/.exec("100em")[0], /\\d+(?!px)/.exec("100px")[0]);',
            },
            {
              label: "Prevent a partial run when excluding px",
              language: "javascript",
              code: 'const pattern = /\\b\\d+(?!\\d|px)/;\nconsole.log(pattern.exec("100em")[0], pattern.exec("100px") === null);',
            },
          ],
        },
        {
          name: "(?<=x) — positive lookbehind",
          explanation:
            "Checks that x comes before the match without including it.",
          note: "Current engines support lookbehind; older engines may reject its syntax before code executes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookbehind_assertion",
          examples: [
            {
              label: "Read a value after a dollar sign",
              language: "javascript",
              code: 'const match = /(?<=\\$)\\d+/.exec("$100");\nconsole.log(match[0], match.index);',
            },
            {
              label: "Require a preceding label",
              language: "javascript",
              code: 'console.log(\n  /(?<=ID:)\\d+/.exec("ID:42")[0],\n  /(?<=ID:)\\d+/.exec("NO:42") === null,\n);',
            },
          ],
        },
        {
          name: "(?<!x) — negative lookbehind",
          explanation: "Checks that x does not come before the match.",
          note: "Unanchored search can restart inside a digit run; exclude a preceding digit too when the whole run must be rejected.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookbehind_assertion",
          examples: [
            {
              label: "Expose a partial retry inside a number",
              language: "javascript",
              code: 'console.log(/(?<!\\$)\\d+/.exec("€100")[0], /(?<!\\$)\\d+/.exec("$100")[0]);',
            },
            {
              label: "Reject the entire dollar-prefixed run",
              language: "javascript",
              code: 'const pattern = /(?<![\\d$])\\d+/;\nconsole.log(pattern.exec("€100")[0], pattern.exec("$100") === null);',
            },
          ],
        },
        {
          name: "Combine lookaheads for independent conditions",
          explanation:
            "Checks several requirements before matching the full input.",
          note: "This demonstrates ASCII lowercase, uppercase, digit, and minimum length, not a full password policy or strength check. Dot excludes line terminators here.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookahead_assertion",
          examples: [
            {
              label: "Require all demonstrated character categories",
              language: "javascript",
              code: 'const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$/;\nconsole.log(\n  pattern.test("Abcdefg1"),\n  pattern.test("abcdefgh1"),\n  pattern.test("ABCDEFG1"),\n  pattern.test("Abcdefgh"),\n);',
            },
            {
              label: "Check length and newline behavior",
              language: "javascript",
              code: 'const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$/;\nconsole.log(pattern.test("Abcde1"), pattern.test("Abcdefg1\\n"));',
            },
          ],
        },
        {
          name: "Extract a token before @",
          explanation:
            "Use a lookahead to require @ after a word-character token without including the marker.",
          note: "This is not an email parser: punctuation in a local part can make it return only the final token.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookahead_assertion",
          examples: [
            {
              label: "Extract a simple local token",
              language: "javascript",
              code: 'const match = "test@email.com".match(/\\w+(?=@)/);\nconsole.log(match[0], match.index);',
            },
            {
              label: "Show the dotted-local-part limitation",
              language: "javascript",
              code: 'console.log(\n  "first.last@example.com".match(/\\w+(?=@)/)[0],\n  "no-address".match(/\\w+(?=@)/) === null,\n);',
            },
          ],
        },
        {
          name: "Extract grouped digits after $",
          explanation:
            "Use lookbehind to exclude a dollar marker and match the demonstrated digit/comma run.",
          note: "The pattern neither validates comma placement nor captures the decimal fraction; it is not a complete monetary parser.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookbehind_assertion",
          examples: [
            {
              label: "Extract the demonstrated integer portion",
              language: "javascript",
              code: 'const match = "$1,234.56".match(/(?<=\\$)[\\d,]+/);\nconsole.log(match[0], match.index);',
            },
            {
              label: "Distinguish extraction from validation",
              language: "javascript",
              code: 'console.log(\n  "$1,,2".match(/(?<=\\$)[\\d,]+/)[0],\n  "€1,234".match(/(?<=\\$)[\\d,]+/) === null,\n);',
            },
          ],
        },
        {
          name: "Extract a token before the final .txt suffix",
          explanation:
            "Require a literal .txt suffix at the input end without consuming it.",
          note: "This returns a token rather than necessarily the whole basename; dots and hyphens split it. Matching is case-sensitive unless i is enabled.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookahead_assertion",
          examples: [
            {
              label: "Read the token before the final extension",
              language: "javascript",
              code: 'console.log(\n  "not.a.file.txt".match(/\\w+(?=\\.txt$)/)[0],\n  "report.txt.bak".match(/\\w+(?=\\.txt$)/) === null,\n);',
            },
            {
              label: "Show basename limits and case-insensitive matching",
              language: "javascript",
              code: 'console.log("my-report.txt".match(/\\w+(?=\\.txt$)/)[0]);\nconsole.log(\n  "report.TXT".match(/\\w+(?=\\.txt$)/) === null,\n  "report.TXT".match(/\\w+(?=\\.txt$)/i)[0],\n);',
            },
          ],
        },
      ],
    },
    {
      name: "Flags",
      id: "flags",
      intro:
        "Global → case-insensitive → multiline → dotAll → Unicode → sticky → match indices, then combined flag syntax, following both images. Run each snippet independently in a current browser or Node.js with match-indices support. Stateful regex examples allocate their own instances so lastIndex cannot leak between snippets.",
      methods: [
        {
          name: "g — global matching",
          explanation:
            "Enables repeated matching for operations such as match and replace.",
          note: "With exec and test, a global regex reads and updates lastIndex, then resets it to zero after failure. String match with g returns full matches without individual capture fields.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global",
          examples: [
            {
              label: "Compare first and all matches",
              language: "javascript",
              code: 'console.log("aaa".match(/a/).length, ..."aaa".match(/a/g));',
            },
            {
              label: "Observe state across repeated test calls",
              language: "javascript",
              code: 'const pattern = /a/g;\nconsole.log(pattern.test("a"), pattern.lastIndex);\nconsole.log(pattern.test("a"), pattern.lastIndex);\npattern.lastIndex = 0;\nconsole.log(pattern.test("a"));',
            },
            {
              label: "Use global regex arguments with matchAll and replaceAll",
              language: "javascript",
              code: 'console.log(...Array.from("a1 a2".matchAll(/a(\\d)/g), (match) => match[1]));\nconsole.log("a-a".replaceAll(/a/g, "b"));\ntry {\n  "a-a".replaceAll(/a/, "b");\n} catch (error) {\n  console.log(error.name);\n}\ntry {\n  [..."aaa".matchAll(/a/)];\n} catch (error) {\n  console.log(error.name);\n}',
            },
          ],
        },
        {
          name: "i — case-insensitive matching",
          explanation: "Compares letters without requiring the same case.",
          note: "It does not perform locale-sensitive text comparison. Unicode-aware case folding can differ from legacy case folding.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/ignoreCase",
          examples: [
            {
              label: "Ignore ASCII case",
              language: "javascript",
              code: 'console.log(/hello/i.test("HELLO"), /hello/.test("HELLO"));',
            },
            {
              label: "Combine case folding with Unicode mode",
              language: "javascript",
              code: 'console.log(/[a-z]/i.test("K"), /[a-z]/iu.test("K"));\nconsole.log(/^i$/iu.test("İ"));',
            },
          ],
        },
        {
          name: "m — multiline anchors",
          explanation:
            "Makes ^ and $ recognize line boundaries as well as input boundaries.",
          note: "It does not make dot match line terminators; s controls that separately. Without m, ^ and $ refer to the input boundaries.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/multiline",
          examples: [
            {
              label: "Find a later line start",
              language: "javascript",
              code: 'const text = "line1\\nline2";\nconsole.log(/^line2/m.test(text), /^line2/.test(text));',
            },
            {
              label: "Collect complete lines and distinguish dot behavior",
              language: "javascript",
              code: 'console.log(..."first\\nsecond".match(/^\\w+$/gm));\nconsole.log(/^a.b$/m.test("a\\nb"));',
            },
          ],
        },
        {
          name: "s — dotAll matching",
          explanation: "Lets dot match line breaks too.",
          note: "s does not change anchor behavior or make dot Unicode-aware; combine u when one dot should consume one Unicode code point.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/dotAll",
          examples: [
            {
              label: "Compare the actual matched text",
              language: "javascript",
              code: 'const text = "line1\\nline2";\nconsole.log(text.match(/.+/)[0], text.match(/.+/s)[0]);',
            },
            {
              label: "Combine dotAll with Unicode and full-input anchors",
              language: "javascript",
              code: 'console.log(/^a.b$/s.test("a\\nb"), /^.$/s.test("😀"), /^.$/su.test("😀"));',
            },
          ],
        },
        {
          name: "u — Unicode-aware mode",
          explanation:
            "Interprets the pattern with Unicode-aware syntax and treats surrogate pairs as code points.",
          note: "Code points are not grapheme clusters. The flag does not make digit or word shorthand classes general Unicode numeral or letter sets.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode",
          examples: [
            {
              label: "Match an emoji code point",
              language: "javascript",
              code: 'console.log(/\\u{1F600}/u.test("😀"), /^.$/u.test("😀"), /^.$/.test("😀"));',
            },
            {
              label: "Use a Unicode property escape",
              language: "javascript",
              code: 'console.log(/\\p{Emoji}/u.test("😀"), /^\\p{Letter}+$/u.test("café"));\nconsole.log(/\\d/u.test("٣"), /\\w/u.test("é"));',
            },
            {
              label: "Distinguish properties from complete emoji sequences",
              language: "javascript",
              code: 'console.log(/\\p{Emoji}/u.test("1"));\nconsole.log(/^.$/u.test("e\\u0301"));',
            },
          ],
        },
        {
          name: "y — sticky matching",
          explanation:
            "Matches only at lastIndex, without searching later positions.",
          note: "Success advances lastIndex; failure resets it to zero. Sticky does not redefine ^, which still asserts an input or line boundary.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky",
          examples: [
            {
              label: "Stop at the gap and restart at an explicit position",
              language: "javascript",
              code: 'const pattern = /\\d+/y;\nconst text = "123 456";\nconsole.log(pattern.exec(text)[0], pattern.lastIndex);\nconsole.log(pattern.exec(text), pattern.lastIndex);\npattern.lastIndex = 4;\nconsole.log(pattern.exec(text)[0], pattern.lastIndex);',
            },
            {
              label: "Compare global scanning with sticky positioning",
              language: "javascript",
              code: 'const global = /\\d+/g,\n  sticky = /\\d+/y;\nglobal.lastIndex = 3;\nsticky.lastIndex = 3;\nconsole.log(global.exec("123 456")[0], sticky.exec("123 456"));',
            },
            {
              label: "Keep the meaning of the start anchor",
              language: "javascript",
              code: 'const anchored = /^\\d+/y,\n  plain = /\\d+/y;\nanchored.lastIndex = 4;\nplain.lastIndex = 4;\nconsole.log(anchored.exec("123 456"), plain.exec("123 456")[0]);',
            },
          ],
        },
        {
          name: "d — match and capture indices",
          explanation:
            "Adds start and end positions for the match and each saved group.",
          note: "Indices are UTF-16 string offsets even under u. Named groups also appear in indices.groups; a capture that did not participate has undefined indices.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/hasIndices",
          examples: [
            {
              label: "Read full-match and capture bounds",
              language: "javascript",
              code: 'const match = /a(b)/d.exec("ab");\nconsole.log(...match.indices[0]);\nconsole.log(...match.indices[1]);',
            },
            {
              label: "Read named spans and absent captures",
              language: "javascript",
              code: 'const match = /(?<word>\\w+)(?:-(?<number>\\d+))?/d.exec("hello");\nconsole.log(...match.indices.groups.word);\nconsole.log(match.indices.groups.number, match.indices[2]);',
            },
            {
              label: "Use indices directly with String.slice",
              language: "javascript",
              code: 'const text = "A😀B";\nconst match = /(?<face>😀)/du.exec(text);\nconst [start, end] = match.indices.groups.face;\nconsole.log(start, end, text.slice(start, end));',
            },
          ],
        },
        {
          name: "Combine flags in literals and RegExp constructors",
          explanation:
            "Supply flags after a regex literal or as the second RegExp constructor argument.",
          note: "The flags accessor returns canonical alphabetical order. Constructor strings need their own escaping; duplicate or unknown flags throw SyntaxError.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags",
          examples: [
            {
              label: "Combine global and case-insensitive matching",
              language: "javascript",
              code: 'const literal = /pattern/gi,\n  constructed = new RegExp("pattern", "ig");\nconsole.log(..."PATTERN pattern".match(literal));\nconsole.log(constructed.flags);\nconsole.log(..."One\\none".match(/^one$/gim));',
            },
            {
              label: "Escape a constructor pattern and reject duplicate flags",
              language: "javascript",
              code: 'const pattern = new RegExp("\\\\d+", "g");\nconsole.log(..."a12 b34".match(pattern));\ntry {\n  new RegExp("a", "gg");\n} catch (error) {\n  console.log(error.name);\n}',
            },
          ],
        },
      ],
    },
    {
      name: "String Methods",
      id: "string-methods",
      intro:
        "Testing and matching → replacing → splitting, following all four images. Run each snippet independently in a current browser or Node.js with matchAll and lookbehind support. RegExp.test and RegExp.exec operate on regex instances; the other methods operate on strings. Examples distinguish captures, full matches, mutable matching state, replacement tokens, and separator retention.",
      methods: [
        {
          name: "test() — boolean pattern check",
          explanation: "Returns whether a RegExp can match the input.",
          note: "This is a RegExp method, while most methods below belong to String. With g or y it uses mutable lastIndex; omit those flags for independent existence checks.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test",
          examples: [
            {
              label: "Check presence versus the full input",
              language: "javascript",
              code: 'console.log(\n  /\\d+/.test("123"),\n  /[a-z]+/.test("ABC"),\n  /\\d+/.test("id123"),\n  /^\\d+$/.test("id123"),\n);',
            },
            {
              label: "Reset state for a reused global regex",
              language: "javascript",
              code: 'const pattern = /a/g;\nconsole.log(pattern.test("a"), pattern.test("a"));\npattern.lastIndex = 0;\nconsole.log(pattern.test("a"));',
            },
          ],
        },
        {
          name: "match() — full matches or capture details",
          explanation:
            "Returns the first match and its groups, or all full matches with g. Returns null if none is found.",
          note: "Returns null when no match exists. Global match does not provide a capture array for each occurrence; use matchAll for that.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match",
          examples: [
            {
              label: "Compare global matches with captured fields",
              language: "javascript",
              code: 'console.log(..."hello".match(/[aeiou]/g));\nconst match = "hello".match(/(\\w)(\\w+)/);\nconsole.log(match[0], match[1], match[2]);',
            },
            {
              label: "Handle no matches explicitly",
              language: "javascript",
              code: 'const match = "rhythm".match(/[aeiou]/g);\nconsole.log(match === null);\nconsole.log((match ?? []).length);',
            },
          ],
        },
        {
          name: "matchAll() — iterate matches with captures",
          explanation:
            "Returns an iterator whose items contain full-match text, captures, and match positions.",
          note: "A RegExp argument must include g. The iterator is single-use and works from a copy of the regex state, retaining its starting lastIndex without mutating the original.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll",
          examples: [
            {
              label: "Read each matched word and capture",
              language: "javascript",
              code: 'const matches = "cat bat rat".matchAll(/(\\w)at/g);\nfor (const match of matches) console.log(match[0], match[1], match.index);',
            },
            {
              label: "Observe iterator exhaustion and copied regex state",
              language: "javascript",
              code: 'const pattern = /a(\\d)/g;\npattern.lastIndex = 1;\nconst matches = "a1a2".matchAll(pattern);\nconsole.log(\n  Array.from(matches, (match) => match[1]).join("|"),\n  pattern.lastIndex,\n);\nconsole.log(Array.from(matches).length);\ntry {\n  [..."a1".matchAll(/a(\\d)/)];\n} catch (error) {\n  console.log(error.name);\n}',
            },
          ],
        },
        {
          name: "search() — first matching position",
          explanation:
            "Returns the first match index or -1 when no match exists.",
          note: "Positions are UTF-16 offsets. search does not iterate all matches and does not begin searching from a global regex’s saved lastIndex.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search",
          examples: [
            {
              label: "Find a position or a missing pattern",
              language: "javascript",
              code: 'console.log("hello world".search(/world/), "hello world".search(/foo/));',
            },
            {
              label: "Ignore and preserve an existing lastIndex",
              language: "javascript",
              code: 'const pattern = /world/g;\npattern.lastIndex = 10;\nconsole.log("hello world".search(pattern), pattern.lastIndex);\nconsole.log("😀x".search(/x/));',
            },
          ],
        },
        {
          name: "exec() — detailed stateful matching",
          explanation:
            "Returns one match with its groups and position, or null if none is found.",
          note: "Allocate the regex outside the loop. A zero-length match does not advance lastIndex automatically in exec; advance explicitly or prefer matchAll for iteration.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec",
          examples: [
            {
              label: "Iterate date prefixes with captures and indices",
              language: "javascript",
              code: 'const pattern = /(\\d{4})-(\\d{2})/g;\nconst text = "2024-03-15 2025-04-20";\nlet match;\nwhile ((match = pattern.exec(text)) !== null)\n  console.log(match[0], match[1], match[2], match.index);\nconsole.log(pattern.lastIndex);',
            },
            {
              label: "Advance zero-length matches for an ASCII example",
              language: "javascript",
              code: 'const pattern = /(?=a)/g;\nconst positions = [];\nlet match;\nwhile ((match = pattern.exec("aa")) !== null) {\n  positions.push(match.index);\n  if (match[0] === "") pattern.lastIndex++;\n}\nconsole.log(...positions);',
            },
          ],
        },
        {
          name: "replace() — replace the first or global matches",
          explanation: "Returns a new string with matched text replaced.",
          note: "The original string is unchanged. “First match only” applies to a non-global regex, not to every replace call.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Compare first and global replacement",
              language: "javascript",
              code: 'const text = "hello world";\nconsole.log(text.replace(/o/, "0"), text.replace(/o/g, "0"), text);',
            },
            {
              label: "Retain the input when nothing matches",
              language: "javascript",
              code: 'console.log("hello".replace(/z/g, "!"));\nconsole.log("HELLO hello".replace(/hello/gi, "hi"));',
            },
          ],
        },
        {
          name: "replaceAll() — replace every occurrence",
          explanation: "Returns a new string with every occurrence replaced.",
          note: "A RegExp argument without g throws TypeError. A string search argument has no flag requirement.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll",
          examples: [
            {
              label: "Use a global regex or a literal string",
              language: "javascript",
              code: 'console.log("hello world".replaceAll(/o/g, "0"), "a.b.a".replaceAll(".", "-"));',
            },
            {
              label: "Reject a non-global regex argument",
              language: "javascript",
              code: 'try {\n  "hello world".replaceAll(/o/, "0");\n} catch (error) {\n  console.log(error.name);\n}\nconsole.log("aaa".replaceAll(/a/g, "b"));',
            },
          ],
        },
        {
          name: "$n — numbered captures in replacement strings",
          explanation:
            "Use $1, $2, and later capture references to insert captured text into a replacement string.",
          note: "Replacement references use dollar syntax, unlike backreferences inside a regex. Existing captures that did not participate insert an empty string.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Reorder captured names",
              language: "javascript",
              code: 'console.log("John Smith".replace(/(\\w+) (\\w+)/, "$2, $1"));',
            },
            {
              label: "Distinguish absent and nonexistent captures",
              language: "javascript",
              code: 'console.log("b".replace(/(a)?b/, "<$1>"));\nconsole.log("a".replace(/a/, "$1"));',
            },
          ],
        },
        {
          name: "$<name> — named replacement fields",
          explanation:
            "Insert named captures using $<name> in the replacement string.",
          note: "The date examples rearrange text with a known shape; they do not validate calendar dates.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Reformat named date fields",
              language: "javascript",
              code: 'const pattern = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;\nconsole.log("2024-03-15".replace(pattern, "$<month>/$<day>/$<year>"));',
            },
            {
              label: "Replace several shaped dates",
              language: "javascript",
              code: 'const pattern = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/g;\nconsole.log(\n  "2024-03-15 2025-04-20".replace(pattern, "$<day>.$<month>.$<year>"),\n);',
            },
          ],
        },
        {
          name: "Function replacers — compute replacement text",
          explanation:
            "Call a function for each selected match and use its returned value as replacement text.",
          note: "Callback results are inserted literally, without expanding replacement-string tokens. Number conversion here assumes small safe numeric values.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Double matched numbers explicitly",
              language: "javascript",
              code: 'console.log(\n  "hello123world456".replace(/\\d+/g, (match) => String(Number(match) * 2)),\n);',
            },
            {
              label: "Keep returned dollar tokens literal",
              language: "javascript",
              code: 'console.log("abc".replace(/b/, () => "$&"));\nconsole.log("abc".replace(/b/, "$&"));',
            },
          ],
        },
        {
          name: "Replacer callback captures and context",
          explanation:
            "Receive the full match, captured fields, offset, and input string in the callback.",
          note: "Named captures add a final groups argument, shifting the meaning of positional arguments in generic callbacks. Offset is a UTF-16 position.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Format names with initials",
              language: "javascript",
              code: 'const text = "John Smith, Jane Doe";\nconsole.log(\n  text.replace(/(\\w+) (\\w+)/g, (full, first, last, offset, input) => {\n    console.log(full, offset, input === text);\n    return last.toUpperCase() + ", " + first[0] + ".";\n  }),\n);',
            },
            {
              label: "Receive named groups explicitly",
              language: "javascript",
              code: 'const result = "item42".replace(\n  /(?<label>[a-z]+)(?<number>\\d+)/,\n  (full, label, number, offset, input, groups) => {\n    console.log(offset, input, groups.label, groups.number);\n    return label + ":" + number;\n  },\n);\nconsole.log(result);',
            },
          ],
        },
        {
          name: "Special replacement tokens — match, context, and dollar",
          explanation:
            "Inserts the full match, nearby text, or a literal dollar using special replacement tokens.",
          note: "Prefix and suffix tokens add copies of surrounding text; they do not remove the original surrounding text. A callback is clearer when literal external replacement text must be preserved.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace",
          examples: [
            {
              label: "Insert the full match and a literal dollar",
              language: "javascript",
              code: 'console.log("abc".replace(/b/, "[$&]"), "abc".replace(/b/, "[$$]"));',
            },
            {
              label: "Insert copies of the prefix and suffix",
              language: "javascript",
              code: 'const prefix = "$" + "\\u0060";\nconsole.log("abc".replace(/b/, "[" + prefix + "]"));\nconsole.log("abc".replace(/b/, "[$\']"));',
            },
          ],
        },
        {
          name: "split() — regex separators",
          explanation:
            "Splits a string at regex matches and returns the intervening fields.",
          note: "The regex does not need g. General CSV needs a parser that understands quoted fields and embedded delimiters; this example handles only unquoted text.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Accept commas, semicolons, and colons",
              language: "javascript",
              code: 'console.log(..."a,b;c:d".split(/[,;:]/));',
            },
            {
              label: "Consume surrounding separator whitespace",
              language: "javascript",
              code: 'console.log(..."one, two;  three".split(/\\s*[,;]\\s*/));',
            },
          ],
        },
        {
          name: "split() capturing groups — retain separators",
          explanation:
            "Capturing groups in the separator are inserted into the result between fields.",
          note: "Non-capturing groups do not insert fields; a separator capture that did not participate can insert undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Retain digit delimiters",
              language: "javascript",
              code: 'console.log(..."a1b2c3".split(/(\\d)/));',
            },
            {
              label: "Compare non-capturing and absent separator captures",
              language: "javascript",
              code: 'console.log(..."a1b2".split(/(?:\\d)/));\nconsole.log(..."a-b".split(/(-)|(,)/));',
            },
          ],
        },
        {
          name: "split() limit — cap output fields",
          explanation:
            "Pass a limit to cap the number of returned array elements.",
          note: "This is a maximum result length, not a maximum split count with the unsplit tail preserved. Captured separators also count toward the limit.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Discard fields after the limit",
              language: "javascript",
              code: 'console.log(..."a-b-c-d".split(/-/, 2));\nconsole.log("a-b".split(/-/, 0).length);',
            },
            {
              label: "Include captured separators in the limit",
              language: "javascript",
              code: 'console.log(..."a1b2c".split(/(\\d)/, 3));',
            },
          ],
        },
        {
          name: "Split at uppercase positions",
          explanation:
            "Use a zero-width lookahead to split before uppercase letters.",
          note: "This is an uppercase-position rule, not a word-boundary assertion or a complete identifier tokenizer; acronyms split into individual capitals.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Split the supplied PascalCase example",
              language: "javascript",
              code: 'console.log(..."HelloWorldTest".split(/(?=[A-Z])/));',
            },
            {
              label: "Observe acronym and lowercase behavior",
              language: "javascript",
              code: 'console.log(..."XMLParser".split(/(?=[A-Z])/));\nconsole.log(..."helloWorld".split(/(?=[A-Z])/));',
            },
          ],
        },
        {
          name: "Split around operators without consuming them",
          explanation:
            "Use lookahead and lookbehind to split on both sides of operator characters.",
          note: "This illustrates token boundaries, not a full expression parser; unary operators, decimals, and precedence need additional rules. Lookbehind requires a supporting runtime.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Retain every demonstrated operator",
              language: "javascript",
              code: 'console.log(..."1+2-3*4".split(/(?=[+*\\-])|(?<=[+*\\-])/));',
            },
            {
              label: "Handle adjacent operator characters literally",
              language: "javascript",
              code: 'console.log(..."1+-2".split(/(?=[+*\\-])|(?<=[+*\\-])/));',
            },
          ],
        },
        {
          name: "Remove empty split fields with filter(Boolean)",
          explanation:
            "Filter the split result to remove empty strings when they carry no meaning.",
          note: 'For a string-only split result, nonempty strings such as "0" remain truthy. Removing blanks loses positional information and is unsuitable when empty fields matter.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split",
          examples: [
            {
              label: "Discard leading and trailing empty fields",
              language: "javascript",
              code: 'console.log(...",,a,b,c,,".split(/,/).filter(Boolean));',
            },
            {
              label: "Retain nonempty zero and space fields",
              language: "javascript",
              code: 'const fields = ",0,, ,".split(/,/);\nconsole.log(...fields.filter(Boolean));\nconsole.log(fields.length);',
            },
          ],
        },
      ],
    },
    {
      name: "Common Patterns",
      id: "common-patterns",
      intro:
        "Validation patterns → text processing → data extraction, following all six images. Run snippets independently in a current browser or Node.js with named captures and matchAll support. Examples demonstrate accepted shapes and important limits; format checks do not establish real-world validity. Validate the same application contract on the server.",
      methods: [
        {
          name: "Email — basic shape",
          explanation:
            "Check non-whitespace text on both sides of @ and a dotted domain shape.",
          note: "Not full email syntax validation or proof of ownership or deliverability. Validate on the server and confirm address ownership when needed.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Check basic input shapes",
              language: "javascript",
              code: 'const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\nconsole.log(\n  re.test("user@example.com"),\n  re.test("user example.com"),\n  re.test("user@@example.com"),\n);',
            },
            {
              label: "Expose the broad domain check",
              language: "javascript",
              code: 'const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\nconsole.log(re.test("a@b..com"), re.test(""));',
            },
          ],
        },
        {
          name: "Email — restricted ASCII shape",
          explanation:
            "Restrict fields to the supplied ASCII character sets and a letter-only final suffix.",
          note: "The image’s RFC-like label does not mean RFC compliance: this pattern rejects valid forms and accepts invalid repeated dots.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Test the restricted shape",
              language: "javascript",
              code: 'const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;\nconsole.log(re.test("first.last+tag@example.com"), re.test("name@example.c"));',
            },
            {
              label: "Show format-check limitations",
              language: "javascript",
              code: 'const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;\nconsole.log(re.test("a..b@example.com"), re.test(\'"a b"@example.com\'));',
            },
          ],
        },
        {
          name: "URL — limited shape and protocol checks",
          explanation:
            "Use the supplied regex for a limited domain shape or URL for full address parsing.",
          note: "The regex excludes many valid URLs and does not validate hostnames robustly. Parsing alone does not establish safety or reachability.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Check the supplied limited shape",
              language: "javascript",
              code: 'const re = /^(https?:\\/\\/)?([\\w.-]+)\\.([a-z]{2,})(\\/.*)?$/i;\nconsole.log(\n  re.test("https://example.com/path"),\n  re.test("example.com"),\n  re.test("https://example.com:8080/path"),\n);',
            },
            {
              label: "Parse and allow only HTTP protocols",
              language: "javascript",
              code: 'const isHttp = (value) => {\n  try {\n    const url = new URL(value);\n    return ["http:", "https:"].includes(url.protocol);\n  } catch {\n    return false;\n  }\n};\nconsole.log(\n  isHttp("https://example.com:8080/path?x=1"),\n  isHttp("javascript:alert(1)"),\n  isHttp("invalid"),\n);',
            },
          ],
        },
        {
          name: "Phone — demonstrated US-style format",
          explanation:
            "Check a ten-digit shape with optional balanced area-code parentheses and simple separators.",
          note: "Does not verify a numbering plan, assignment, or reachability. Balanced alternatives correct the independently optional parentheses in the image.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Accept the demonstrated formats",
              language: "javascript",
              code: 'const re = /^(?:\\(\\d{3}\\)|\\d{3})[-.\\s]?\\d{3}[-.\\s]?\\d{4}$/;\nconsole.log(\n  re.test("(555) 123-4567"),\n  re.test("555.123.4567"),\n  re.test("555 123 4567"),\n);',
            },
            {
              label: "Reject unbalanced parentheses",
              language: "javascript",
              code: 'const re = /^(?:\\(\\d{3}\\)|\\d{3})[-.\\s]?\\d{3}[-.\\s]?\\d{4}$/;\nconsole.log(\n  re.test("(555 123-4567"),\n  re.test("555) 123-4567"),\n  re.test("15551234567"),\n);',
            },
          ],
        },
        {
          name: "Password — demonstrated format rules",
          explanation:
            "Require lowercase, uppercase, a digit, a listed special character, and eight allowed characters.",
          note: "Not a strength estimate or a complete password policy; the alphabet excludes spaces and most Unicode characters.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Require all demonstrated character kinds",
              language: "javascript",
              code: 'const re =\n  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;\nconsole.log(re.test("Abcdef1!"), re.test("abcdef1!"), re.test("Abcdefgh"));',
            },
            {
              label: "Enforce length and the allowed alphabet",
              language: "javascript",
              code: 'const re =\n  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;\nconsole.log(re.test("Ab1!"), re.test("Abcdef1! "), re.test("Abcdef1!#"));',
            },
          ],
        },
        {
          name: "Credit card — sixteen-digit formatting",
          explanation:
            "Check sixteen digits with optional spaces or hyphens between four-digit groups.",
          note: "Does not validate checksum, issuer, length variations, or an account. The supplied pattern permits mixed separators.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Recognize dummy display formats",
              language: "javascript",
              code: 'const re = /^(?:\\d{4}[-\\s]?){3}\\d{4}$/;\nconsole.log(re.test("1234-5678-9012-3456"), re.test("1234567890123456"));',
            },
            {
              label: "Expose format-only acceptance",
              language: "javascript",
              code: 'const re = /^(?:\\d{4}[-\\s]?){3}\\d{4}$/;\nconsole.log(\n  re.test("0000000000000000"),\n  re.test("1234-5678 9012-3456"),\n  re.test("123456789012345"),\n);',
            },
          ],
        },
        {
          name: "IPv4 — bounded dotted octets",
          explanation: "Checks four dot-separated numbers, each from 0 to 255.",
          note: "The supplied pattern permits leading zeroes; decide whether that is acceptable for your application. It does not establish routing or ownership.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Bound each octet",
              language: "javascript",
              code: 'const re =\n  /^(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$/;\nconsole.log(\n  re.test("192.168.1.1"),\n  re.test("255.255.255.255"),\n  re.test("256.1.1.1"),\n);',
            },
            {
              label: "Check zero padding and octet count",
              language: "javascript",
              code: 'const re =\n  /^(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$/;\nconsole.log(re.test("001.002.003.004"), re.test("1.2.3"), re.test("1.2.3.4.5"));',
            },
          ],
        },
        {
          name: "Date — YYYY-MM-DD shape",
          explanation:
            "Checks date field widths and ranges, not whether the calendar date exists.",
          note: "The supplied regex accepts February 31; a successful shape test is not calendar validation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Show shape versus calendar validity",
              language: "javascript",
              code: 'const re = /^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$/;\nconsole.log(\n  re.test("2024-03-15"),\n  re.test("2024-02-31"),\n  re.test("2024-13-01"),\n);',
            },
            {
              label: "Add Gregorian calendar rules",
              language: "javascript",
              code: 'const valid = (text) => {\n  const m = /^(\\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$/.exec(text);\n  if (!m) return false;\n  const y = Number(m[1]),\n    month = Number(m[2]),\n    day = Number(m[3]);\n  const leap = y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);\n  return (\n    day <=\n    [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1]\n  );\n};\nconsole.log(valid("2024-02-29"), valid("2023-02-29"), valid("2024-02-31"));',
            },
          ],
        },
        {
          name: "Time — HH:MM:SS",
          explanation: "Check a zero-padded 24-hour time.",
          note: "Excludes timezone offsets, fractions, and leap seconds.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Accept normal endpoints",
              language: "javascript",
              code: 'const re = /^([01]\\d|2[0-3]):([0-5]\\d):([0-5]\\d)$/;\nconsole.log(re.test("00:00:00"), re.test("23:59:59"));',
            },
            {
              label: "Reject overflow and missing padding",
              language: "javascript",
              code: 'const re = /^([01]\\d|2[0-3]):([0-5]\\d):([0-5]\\d)$/;\nconsole.log(re.test("24:00:00"), re.test("12:60:00"), re.test("1:02:03"));',
            },
          ],
        },
        {
          name: "Hex color — six digits",
          explanation: "Require six hexadecimal digits with an optional hash.",
          note: "Narrower than CSS color syntax: three-digit and alpha-channel hex forms are excluded.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Match six-digit forms",
              language: "javascript",
              code: 'const re = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i;\nconsole.log(re.test("#A1b2C3"), re.test("00ff88"));',
            },
            {
              label: "Reject other lengths and alphabets",
              language: "javascript",
              code: 'const re = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i;\nconsole.log(re.test("#fff"), re.test("#11223344"), re.test("#zzzzzz"));',
            },
          ],
        },
        {
          name: "Username — ASCII format",
          explanation: "Require 3–16 ASCII letters, digits, or underscores.",
          note: "Checks format rather than availability or identity. Digits and underscore may appear first.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Check the alphabet",
              language: "javascript",
              code: 'const re = /^[a-zA-Z0-9_]{3,16}$/;\nconsole.log(re.test("user_42"), re.test("1_ab"), re.test("user-name"));',
            },
            {
              label: "Check length boundaries",
              language: "javascript",
              code: 'const re = /^[a-zA-Z0-9_]{3,16}$/;\nconsole.log(re.test("ab"), re.test("a".repeat(16)), re.test("a".repeat(17)));',
            },
          ],
        },
        {
          name: "Collapse whitespace",
          explanation:
            "Replace whitespace runs with one space and trim the ends.",
          note: "Intentionally collapses tabs and line terminators; unsuitable for whitespace-sensitive formats.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Normalize mixed whitespace",
              language: "javascript",
              code: 'console.log("  hello\\t \\nworld  ".replace(/\\s+/g, " ").trim());',
            },
            {
              label: "Handle blanks and chain replacements",
              language: "javascript",
              code: 'const clean = (text) => text.replace(/\\s+/g, " ").trim();\nconsole.log(clean(" \\n\\t"), clean(" A   B ").replace(/ /g, "-"));',
            },
          ],
        },
        {
          name: "Remove tag-shaped text — limited example",
          explanation:
            "Removes simple tag-shaped text from controlled input. It does not sanitize HTML.",
          note: "Not HTML parsing or sanitization: quoted delimiters, entities, scripts, and malformed markup require a parser and suitable output policy.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Strip simple tags",
              language: "javascript",
              code: 'console.log("<p>Hello <b>world</b></p>".replace(/<[^>]*>/g, ""));',
            },
            {
              label: "Expose a quoted-delimiter failure",
              language: "javascript",
              code: 'console.log(\'<span title="a>b">Hello</span>\'.replace(/<[^>]*>/g, ""));',
            },
          ],
        },
        {
          name: "Extract HTTP URL candidates",
          explanation:
            "Collect non-whitespace runs starting with HTTP or HTTPS.",
          note: "May include trailing punctuation; not a complete link detector or URL validator.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Collect candidate links",
              language: "javascript",
              code: 'console.log(\n  ...("See https://example.com and http://example.test/path".match(\n    /https?:\\/\\/[^\\s]+/g,\n  ) ?? []),\n);',
            },
            {
              label: "Handle no results and trailing punctuation",
              language: "javascript",
              code: 'console.log(("No links".match(/https?:\\/\\/[^\\s]+/g) ?? []).length);\nconsole.log("See https://example.com.".match(/https?:\\/\\/[^\\s]+/g)[0]);',
            },
          ],
        },
        {
          name: "camelCase to kebab-case",
          explanation:
            "Insert a hyphen before ASCII uppercase letters, then lowercase.",
          note: "Acronyms become separate letters and an initial uppercase letter adds a leading hyphen.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Convert the supplied label",
              language: "javascript",
              code: 'console.log("camelCaseString".replace(/([A-Z])/g, "-$1").toLowerCase());',
            },
            {
              label: "Show acronym and empty-input behavior",
              language: "javascript",
              code: 'const convert = (text) => text.replace(/([A-Z])/g, "-$1").toLowerCase();\nconsole.log(convert("XMLParser"), convert(""));',
            },
          ],
        },
        {
          name: "snake_case to camelCase",
          explanation:
            "Uppercase a lowercase ASCII letter following an underscore.",
          note: "Repeated underscores and underscores before digits are not normalized automatically.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Convert the supplied identifier",
              language: "javascript",
              code: 'console.log(\n  "snake_case_string".replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),\n);',
            },
            {
              label: "Show unhandled separator forms",
              language: "javascript",
              code: 'console.log(\n  "a__b_value_2".replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),\n);',
            },
          ],
        },
        {
          name: "Extract hashtags",
          explanation: "Match a hash followed by word characters.",
          note: "Not a platform grammar or a general Unicode hashtag matcher; it may return a partial tag.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Collect simple tags",
              language: "javascript",
              code: 'console.log(...("Try #JavaScript and #web_2".match(/#\\w+/g) ?? []));',
            },
            {
              label: "Show Unicode limits and empty results",
              language: "javascript",
              code: 'console.log("#café".match(/#\\w+/g)[0], ("No tags".match(/#\\w+/g) ?? []).length);',
            },
          ],
        },
        {
          name: "Extract mentions",
          explanation:
            "Match @ followed by the supplied word-character/dot set.",
          note: "Can match email substrings and trailing dots; not an account-name validator.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Collect mention candidates",
              language: "javascript",
              code: 'console.log(...("Hi @john and @jane.doe".match(/@[\\w.]+/g) ?? []));',
            },
            {
              label: "Expose email and punctuation overmatching",
              language: "javascript",
              code: 'console.log(..."mail a@example.com or @name.".match(/@[\\w.]+/g));',
            },
          ],
        },
        {
          name: "Extract numbers with listed units",
          explanation:
            "Match an integer immediately followed by cm, kg, m, or ft.",
          note: "No numeric or unit boundaries: the supplied pattern may return decimal tails or prefixes of longer unit names.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Collect the supplied measurements",
              language: "javascript",
              code: 'console.log(\n  ...("Height: 180cm, Weight: 75kg".match(/\\d+(?:cm|kg|m|ft)/g) ?? []),\n);',
            },
            {
              label: "Expose decimal and unit-prefix limits",
              language: "javascript",
              code: 'console.log(..."1.5kg 20mm".match(/\\d+(?:cm|kg|m|ft)/g));',
            },
          ],
        },
        {
          name: "Remove adjacent duplicate words",
          explanation:
            "Replace an adjacent repeated word with the first captured spelling.",
          note: "Handles pairs using ASCII-style boundaries; a run of three can leave two, and separated repeats remain.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Remove a case-insensitive duplicate pair",
              language: "javascript",
              code: 'console.log("This this is fine".replace(/\\b(\\w+)\\s+\\1\\b/gi, "$1"));',
            },
            {
              label: "Distinguish longer and separated repetitions",
              language: "javascript",
              code: 'console.log(\n  "go go go".replace(/\\b(\\w+)\\s+\\1\\b/gi, "$1"),\n  "go then go".replace(/\\b(\\w+)\\s+\\1\\b/gi, "$1"),\n);',
            },
          ],
        },
        {
          name: "Truncate at a word boundary",
          explanation:
            "Guard short input, cut long text, then remove a partially cut final word when possible.",
          note: "Uses UTF-16 positions; the ellipsis is extra. Long unbroken tokens fall back to a hard cut.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Preserve short text and trim partial words",
              language: "javascript",
              code: 'function truncate(text, limit = 100) {\n  if (!Number.isInteger(limit) || limit < 1)\n    throw new RangeError("Use a positive limit");\n  if (text.length <= limit) return text;\n  let head = text.slice(0, limit);\n  if (!/\\s/.test(text[limit]) && !/\\s$/.test(head)) {\n    const shorter = head.replace(/\\s+\\S*$/, "");\n    if (shorter) head = shorter;\n  }\n  return head.trimEnd() + "…";\n}\nconsole.log(truncate("The quick brown fox", 13), truncate("short text", 100));',
            },
            {
              label: "Handle an exact boundary and unbroken token",
              language: "javascript",
              code: 'function truncate(text, limit = 100) {\n  if (!Number.isInteger(limit) || limit < 1)\n    throw new RangeError("Use a positive limit");\n  if (text.length <= limit) return text;\n  let head = text.slice(0, limit);\n  if (!/\\s/.test(text[limit]) && !/\\s$/.test(head)) {\n    const shorter = head.replace(/\\s+\\S*$/, "");\n    if (shorter) head = shorter;\n  }\n  return head.trimEnd() + "…";\n}\nconsole.log(truncate("The quick brown fox", 15), truncate("abcdefgh", 4));',
            },
          ],
        },
        {
          name: "Simple Markdown bold to HTML",
          explanation:
            "Escape input text, then wrap the demonstrated single-line bold spans in strong tags.",
          note: "Not a Markdown parser: nesting, escapes, and multiline syntax require more rules. Lazy quantifiers do not parse nesting.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Convert simple bold spans",
              language: "javascript",
              code: 'const simpleBold = (text) =>\n  text\n    .replace(/&/g, "&amp;")\n    .replace(/</g, "&lt;")\n    .replace(/>/g, "&gt;")\n    .replace(/\\*\\*(.+?)\\*\\*/g, "<strong>$1</strong>");\nconsole.log(simpleBold("**Hello** and **world**"));',
            },
            {
              label: "Escape markup-like input before conversion",
              language: "javascript",
              code: 'const simpleBold = (text) =>\n  text\n    .replace(/&/g, "&amp;")\n    .replace(/</g, "&lt;")\n    .replace(/>/g, "&gt;")\n    .replace(/\\*\\*(.+?)\\*\\*/g, "<strong>$1</strong>");\nconsole.log(simpleBold("**<img> & text**"), simpleBold(""));',
            },
          ],
        },
        {
          name: "Extract currency-prefixed prices",
          explanation:
            "Collect values beginning with the supplied currency symbols.",
          note: "The supplied pattern allows a trailing decimal point; these are not locale-aware monetary parsers.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Collect supplied prices",
              language: "javascript",
              code: 'console.log(\n  ...Array.from(\n    "Items: $10.99, $25.00, €30.50".matchAll(/[$€£]\\d+\\.?\\d*/g),\n    (m) => m[0],\n  ),\n);',
            },
            {
              label: "Read named fields",
              language: "javascript",
              code: 'for (const m of "Cost $10.99 or £5".matchAll(\n  /(?<currency>[$€£])(?<amount>\\d+(?:\\.\\d{2})?)(?![\\d.])/g,\n))\n  console.log(m.groups.currency, m.groups.amount);',
            },
          ],
        },
        {
          name: "parseCSV() — single-line subset",
          explanation:
            "Parse quoted commas, doubled quotes, and empty fields with a small state machine.",
          note: "Corrects empty-field loss in the supplied regex. Deliberately rejects line breaks; use a full CSV parser for multiline records.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Read a quoted comma",
              language: "javascript",
              code: 'function parseCSV(line) {\n  if (/[\\r\\n]/.test(line)) throw new Error("Use one physical line");\n  const quote = String.fromCharCode(34),\n    fields = [];\n  let value = "",\n    quoted = false,\n    closed = false;\n  for (let i = 0; i < line.length; i++) {\n    const c = line[i];\n    if (quoted) {\n      if (c === quote) {\n        if (line[i + 1] === quote) {\n          value += quote;\n          i++;\n        } else {\n          quoted = false;\n          closed = true;\n        }\n      } else value += c;\n    } else if (c === ",") {\n      fields.push(value);\n      value = "";\n      closed = false;\n    } else if (c === quote) {\n      if (value || closed) throw new Error("Malformed CSV field");\n      quoted = true;\n    } else {\n      if (closed) throw new Error("Malformed CSV field");\n      value += c;\n    }\n  }\n  if (quoted) throw new Error("Malformed CSV field");\n  fields.push(value);\n  return fields;\n}\nconsole.log(...parseCSV(\'name,"last, first",age\'));',
            },
            {
              label: "Keep empty fields and escaped quotes",
              language: "javascript",
              code: 'function parseCSV(line) {\n  if (/[\\r\\n]/.test(line)) throw new Error("Use one physical line");\n  const quote = String.fromCharCode(34),\n    fields = [];\n  let value = "",\n    quoted = false,\n    closed = false;\n  for (let i = 0; i < line.length; i++) {\n    const c = line[i];\n    if (quoted) {\n      if (c === quote) {\n        if (line[i + 1] === quote) {\n          value += quote;\n          i++;\n        } else {\n          quoted = false;\n          closed = true;\n        }\n      } else value += c;\n    } else if (c === ",") {\n      fields.push(value);\n      value = "";\n      closed = false;\n    } else if (c === quote) {\n      if (value || closed) throw new Error("Malformed CSV field");\n      quoted = true;\n    } else {\n      if (closed) throw new Error("Malformed CSV field");\n      value += c;\n    }\n  }\n  if (quoted) throw new Error("Malformed CSV field");\n  fields.push(value);\n  return fields;\n}\nconsole.log(...parseCSV(\'a,,"say ""hi""",\'));\ntry {\n  parseCSV(\'a,"broken\');\n} catch (e) {\n  console.log(e.message);\n}',
            },
          ],
        },
        {
          name: "Extract key-value pairs",
          explanation: "Read simple word=word assignments with named captures.",
          note: "Excludes quoted values, punctuation, and spaces; may return partial values from richer input.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Read supplied assignments",
              language: "javascript",
              code: 'for (const m of "name=John age=30 city=NYC".matchAll(\n  /(?<key>\\w+)=(?<value>\\w+)/g,\n))\n  console.log(m.groups.key, m.groups.value);',
            },
            {
              label: "Handle no pairs and partial values",
              language: "javascript",
              code: 'console.log([..."no pairs".matchAll(/(\\w+)=(\\w+)/g)].length);\nconsole.log("name=Mary-Jane".match(/(\\w+)=(\\w+)/)[2]);',
            },
          ],
        },
        {
          name: "Parse shaped log entries",
          explanation:
            "Read controlled log lines into named time, level, and message fields.",
          note: "Supports LF and CRLF; checks a log shape rather than semantic timestamps or level values.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Read fields across lines",
              language: "javascript",
              code: 'const text = "[10:30:45] [ERROR] Failed\\r\\n[11:00:00] [INFO] Ready";\nconst re = /^\\[(?<time>[\\d:]+)\\] \\[(?<level>\\w+)\\] (?<message>[^\\r\\n]*)\\r?$/gm;\nfor (const m of text.matchAll(re))\n  console.log(m.groups.time, m.groups.level, m.groups.message);',
            },
            {
              label: "Retain empty messages",
              language: "javascript",
              code: 'const re = /^\\[(?<time>[\\d:]+)\\] \\[(?<level>\\w+)\\] (?<message>[^\\r\\n]*)\\r?$/gm;\nconst matches = [..."noise\\n[10:00:00] [INFO] ".matchAll(re)];\nconsole.log(matches.length, matches[0].groups.message);',
            },
          ],
        },
        {
          name: "Extract embedded JSON objects",
          explanation:
            "Scan balanced object candidates while tracking quoted strings, then validate with JSON.parse.",
          note: "Assumes object candidates begin at braces in otherwise plain text; not a general mixed-document parser or standalone array extractor.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Handle nested objects and quoted braces",
              language: "javascript",
              code: 'function extractJSONObjects(text) {\n  const values = [];\n  let start = -1,\n    depth = 0,\n    inString = false,\n    escaped = false;\n  for (let i = 0; i < text.length; i++) {\n    const c = text[i];\n    if (start < 0) {\n      if (c === "{") {\n        start = i;\n        depth = 1;\n      }\n      continue;\n    }\n    if (inString) {\n      if (escaped) escaped = false;\n      else if (c === "\\\\") escaped = true;\n      else if (c === String.fromCharCode(34)) inString = false;\n      continue;\n    }\n    if (c === String.fromCharCode(34)) inString = true;\n    else if (c === "{") depth++;\n    else if (c === "}" && --depth === 0) {\n      values.push(JSON.parse(text.slice(start, i + 1)));\n      start = -1;\n    }\n  }\n  if (start >= 0) throw new Error("Incomplete JSON object");\n  return values;\n}\nconst values = extractJSONObjects(\n  \'prefix {"a":{"b":{"c":1}},"text":"}"} suffix {"ok":true}\',\n);\nconsole.log(values[0].a.b.c, values[0].text, values[1].ok);',
            },
            {
              label: "Handle no objects and incomplete input",
              language: "javascript",
              code: 'function extractJSONObjects(text) {\n  const values = [];\n  let start = -1,\n    depth = 0,\n    inString = false,\n    escaped = false;\n  for (let i = 0; i < text.length; i++) {\n    const c = text[i];\n    if (start < 0) {\n      if (c === "{") {\n        start = i;\n        depth = 1;\n      }\n      continue;\n    }\n    if (inString) {\n      if (escaped) escaped = false;\n      else if (c === "\\\\") escaped = true;\n      else if (c === String.fromCharCode(34)) inString = false;\n      continue;\n    }\n    if (c === String.fromCharCode(34)) inString = true;\n    else if (c === "{") depth++;\n    else if (c === "}" && --depth === 0) {\n      values.push(JSON.parse(text.slice(start, i + 1)));\n      start = -1;\n    }\n  }\n  if (start >= 0) throw new Error("Incomplete JSON object");\n  return values;\n}\nconsole.log(extractJSONObjects("none").length);\ntry {\n  extractJSONObjects(\'prefix {"a":1\');\n} catch (e) {\n  console.log(e.message);\n}',
            },
          ],
        },
        {
          name: "Extract simple function calls",
          explanation:
            "Capture a word-like name and argument text up to a closing parenthesis.",
          note: "Not JavaScript parsing: nested calls, quoted parentheses, comments, and expressions require a language parser.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Read names and argument text",
              language: "javascript",
              code: 'for (const m of "func1(arg1, arg2) func2(arg3)".matchAll(/(\\w+)\\(([^)]*)\\)/g))\n  console.log(m[1], m[2]);',
            },
            {
              label: "Expose nesting limits",
              language: "javascript",
              code: 'const m = "outer(inner(x))".match(/(\\w+)\\(([^)]*)\\)/);\nconsole.log(m[1], m[2]);\nconsole.log([..."none".matchAll(/(\\w+)\\(([^)]*)\\)/g)].length);',
            },
          ],
        },
        {
          name: "Extract simple fenced code blocks",
          explanation:
            "Capture an optional word-like language and body between standalone triple-backtick lines.",
          note: "Supports LF/CRLF, not full Markdown indentation, longer fences, tilde fences, or punctuation in labels.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Read a labeled block",
              language: "javascript",
              code: 'const ticks = String.fromCharCode(96).repeat(3);\nconst text = ticks + "js\\nconst x = 1;\\n" + ticks;\nconst re = new RegExp(\n  "^" + ticks + "(\\\\w*)[ \\\\t]*\\\\r?\\\\n([\\\\s\\\\S]*?)^" + ticks + "[ \\\\t]*\\\\r?$",\n  "gm",\n);\nfor (const m of text.matchAll(re)) console.log(m[1], m[2]);',
            },
            {
              label: "Read an unlabeled empty block",
              language: "javascript",
              code: 'const ticks = String.fromCharCode(96).repeat(3);\nconst re = new RegExp(\n  "^" + ticks + "(\\\\w*)[ \\\\t]*\\\\r?\\\\n([\\\\s\\\\S]*?)^" + ticks + "[ \\\\t]*\\\\r?$",\n  "gm",\n);\nconst m = re.exec(ticks + "\\n" + ticks);\nconsole.log(m[1], m[2]);',
            },
          ],
        },
        {
          name: "Parse URL components",
          explanation:
            "Extract the supplied HTTP URL shape with a limited regex or use URL for standard parsing.",
          note: "The regex does not handle general URL syntax such as IPv6 hosts; URL provides normalized structured components.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Extract the supplied URL shape",
              language: "javascript",
              code: 'const text = "https://example.com:8080/path?query=1#hash";\nconst re = /^(https?):\\/\\/([^:\\/]+):?(\\d+)?(\\/[^?#]*)?(\\?[^#]*)?(#.*)?$/;\nconst m = text.match(re);\nif (m) {\n  const [, protocol, host, port, path, query, hash] = m;\n  console.log(protocol, host, port, path, query, hash);\n}',
            },
            {
              label: "Use structured URL fields",
              language: "javascript",
              code: 'const url = new URL("https://example.com:8080/path?query=1#hash");\nconsole.log(\n  url.protocol,\n  url.hostname,\n  url.port,\n  url.pathname,\n  url.searchParams.get("query"),\n  url.hash,\n);',
            },
          ],
        },
      ],
    },
    {
      name: "Advanced Techniques",
      id: "advanced-techniques",
      intro:
        "Performance and optimization → dynamic factories → Unicode and internationalization, following all six images. Run each snippet independently in a current browser or Node.js with RegExp.escape and Unicode property support. Small performance examples verify behavior rather than assert timing; dynamic literal text is escaped, and Unicode examples distinguish code points, letter runs, and displayed sequences.",
      methods: [
        {
          name: "Remove ambiguous repeated quantifiers",
          explanation:
            "Simplifies overlapping repeats so the pattern has fewer matching paths to try.",
          note: "The screenshot pattern needs at least two x characters, so x{2,} preserves that minimum whereas x+ does not. Tiny examples demonstrate results, not a timing benchmark.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Quantifier",
          examples: [
            {
              label: "Preserve the two-character minimum",
              language: "javascript",
              code: 'const original = /^(x+x+)+y$/,\n  simplified = /^x{2,}y$/;\nfor (const text of ["xy", "xxy", "xxxxy", "xxxx!"])\n  console.log(original.test(text), simplified.test(text));',
            },
            {
              label: "Keep adversarial failure input small",
              language: "javascript",
              code: 'const small = "x".repeat(8) + "!";\nconsole.log(/^(x+x+)+y$/.test(small), /^x{2,}y$/.test(small));',
            },
          ],
        },
        {
          name: "Lookahead and backreference commitment",
          explanation:
            "Capture a greedy run in a lookahead and reference it afterward to avoid revisiting choices inside that assertion.",
          note: "This is a pattern-specific technique, not a general atomic-group replacement. Preventing backtracking can change which inputs match.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookahead_assertion",
          examples: [
            {
              label: "Commit the demonstrated x run",
              language: "javascript",
              code: 'const pattern = /^(?=(x{2,}))\\1y$/;\nconsole.log(pattern.test("xxxxy"), pattern.test("xy"), pattern.test("xxxx!"));',
            },
            {
              label: "Expose a semantic difference caused by commitment",
              language: "javascript",
              code: 'console.log(/^x+xy$/.test("xxy"), /^(?=(x+))\\1xy$/.test("xxy"));',
            },
          ],
        },
        {
          name: "Use non-capturing groups when captures are unused",
          explanation:
            "Groups pattern parts without saving text you do not need.",
          note: "This avoids an unnecessary capture slot but does not guarantee a speedup on every engine or workload.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Non-capturing_group",
          examples: [
            {
              label: "Group an HTTP scheme without extracting it",
              language: "javascript",
              code: 'const captured = /^(https?):\\/\\//.exec("https://"),\n  plain = /^(?:https?):\\/\\//.exec("https://");\nconsole.log(captured[0] === plain[0], captured.length, plain.length);',
            },
            {
              label: "Preserve a later capture index",
              language: "javascript",
              code: 'const match = /^(?:https?):\\/\\/([^/]+)/.exec("https://example.com/path");\nconsole.log(match[1], match.length);',
            },
          ],
        },
        {
          name: "Anchor when full-input matching is intended",
          explanation: "Use start and end assertions for full-field checks.",
          note: "Anchoring changes semantics; it is not a drop-in optimization for searching long text. Measure representative workloads rather than assuming all anchored checks are faster.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Input_boundary_assertion",
          examples: [
            {
              label: "Distinguish search from field validation",
              language: "javascript",
              code: 'const text = "Call 555-1234 today";\nconsole.log(/\\d{3}-\\d{4}/.test(text), /^\\d{3}-\\d{4}$/.test(text));',
            },
            {
              label: "Validate the supplied shape independently",
              language: "javascript",
              code: 'console.log(\n  /^\\d{3}-\\d{4}$/.test("555-1234"),\n  /^\\d{3}-\\d{4}$/.test("555-1234\\n"),\n);',
            },
          ],
        },
        {
          name: "Compile once and manage matching state",
          explanation: "Construct a reusable regex outside repeated calls.",
          note: "Reusing a regex object avoids repeated construction; execution performance depends on the runtime. Stateful flags can make naive repeated test calls incorrect.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex",
          examples: [
            {
              label: "Reuse a non-global validator",
              language: "javascript",
              code: 'const pattern = "^[A-Z]{2}\\\\d{2}$",\n  regex = new RegExp(pattern),\n  items = ["AB12", "bad", "CD34"];\nconsole.log(...items.map((item) => regex.test(item)));',
            },
            {
              label: "Reset a reused global matcher",
              language: "javascript",
              code: 'const regex = /a/g;\nconst results = ["a", "a"].map((text) => {\n  regex.lastIndex = 0;\n  return regex.test(text);\n});\nconsole.log(...results);',
            },
          ],
        },
        {
          name: "Use specific character classes",
          explanation:
            "Express allowed characters and delimiters directly instead of relying on repeated wildcard runs.",
          note: "The broad and specific email-shaped patterns do not accept the same inputs; neither is complete email validation. Specificity alone is not a universal performance guarantee.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class",
          examples: [
            {
              label: "Compare broad and restricted input shapes",
              language: "javascript",
              code: 'const broad = /^.+@.+\\..+$/,\n  specific = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\nconsole.log(broad.test("a b@example.com"), specific.test("a b@example.com"));',
            },
            {
              label: "Exclude a delimiter explicitly",
              language: "javascript",
              code: 'console.log(\'"one" "two"\'.match(/"[^"\\r\\n]*"/g).join("|"));',
            },
          ],
        },
        {
          name: "Alternation and exact word-list membership",
          explanation:
            "Keep alternation when a regex must recognize alternatives in text.",
          note: "Wrapping alternatives in a non-capturing group does not remove alternation. Set membership and unanchored regex searching have different semantics.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Disjunction",
          examples: [
            {
              label: "Grouping leaves alternatives intact",
              language: "javascript",
              code: 'console.log(/cat|dog|bird/.test("a dog"), /(?:cat|dog|bird)/.test("a dog"));',
            },
            {
              label: "Choose exact membership deliberately",
              language: "javascript",
              code: 'const words = new Set(["cat", "dog", "bird"]);\nconsole.log(\n  words.has("cat"),\n  words.has("catfish"),\n  /cat|dog|bird/.test("catfish"),\n);',
            },
          ],
        },
        {
          name: "Greedy versus lazy matching is a semantic choice",
          explanation:
            "Chooses longer or shorter matches based on what the pattern should capture.",
          note: "Lazy matching is not inherently faster and does not prevent every backtracking problem. These tag-shaped examples are not HTML parsers.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Quantifier",
          examples: [
            {
              label: "Compare the returned match extent",
              language: "javascript",
              code: 'const text = "<a><b>";\nconsole.log(text.match(/<.*>/)[0], text.match(/<.*?>/)[0]);',
            },
            {
              label: "Use a class for a simple delimiter",
              language: "javascript",
              code: 'console.log(..."<a><b>".match(/<[^>]*>/g));',
            },
          ],
        },
        {
          name: "Use simple string operations for literal tasks",
          explanation:
            "Use includes or startsWith when the task is a literal substring or prefix check.",
          note: "Choose based on required behavior and measure if performance matters; a literal string method avoids regex metacharacter interpretation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes",
          examples: [
            {
              label: "Check a literal substring",
              language: "javascript",
              code: 'console.log(\n  "user.name".includes("."),\n  "username".includes("."),\n  /./.test("username"),\n);',
            },
            {
              label: "Check a literal prefix",
              language: "javascript",
              code: 'console.log(\n  "https://example.com".startsWith("https://"),\n  "http://example.com".startsWith("https://"),\n);',
            },
          ],
        },
        {
          name: "escapeRegex() — escape dynamic literal text",
          explanation:
            "Escape externally supplied text before inserting it as literal pattern content.",
          note: "Requires a runtime with RegExp.escape. It handles embedding edge cases beyond the screenshot’s minimal replacement helper; escaping text does not make arbitrary user-supplied regex syntax safe to execute.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/escape",
          examples: [
            {
              label: "Match a supplied dot literally",
              language: "javascript",
              code: 'function escapeRegex(text) {\n  return RegExp.escape(text);\n}\nconst regex = new RegExp(escapeRegex("user.name"));\nconsole.log(regex.test("user.name"), regex.test("userXname"));',
            },
            {
              label: "Escape punctuation and avoid backreference ambiguity",
              language: "javascript",
              code: 'function escapeRegex(text) {\n  return RegExp.escape(text);\n}\nconst literal = new RegExp("^" + escapeRegex("C++ [x]") + "$", "u");\nconsole.log(literal.test("C++ [x]"));\nconst embedded = new RegExp("(x)\\\\1" + escapeRegex("2"));\nconsole.log(embedded.test("xx2"));',
            },
          ],
        },
        {
          name: "Build a word-list pattern from variables",
          explanation:
            "Escape each literal list item, combine alternatives, and add the intended boundaries.",
          note: "The demonstrated list contains ASCII word tokens; word boundaries do not make arbitrary punctuation-ending literals into whole-word matches. Alternation order matters for shared prefixes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp",
          examples: [
            {
              label: "Build the supplied fruit matcher",
              language: "javascript",
              code: 'function escapeRegex(text) {\n  return RegExp.escape(text);\n}\nconst words = ["apple", "banana", "orange"];\nconst pattern = new RegExp(\n  "\\\\b(" + words.map(escapeRegex).join("|") + ")\\\\b",\n  "gi",\n);\nconsole.log(...("APPLE banana pineapple orange".match(pattern) ?? []));',
            },
            {
              label: "Preserve literal dots inside an alternative",
              language: "javascript",
              code: 'function escapeRegex(text) {\n  return RegExp.escape(text);\n}\nconst words = ["a.b", "cat"];\nconst pattern = new RegExp(\n  "\\\\b(?:" + words.map(escapeRegex).join("|") + ")\\\\b",\n  "g",\n);\nconsole.log(...("a.b aXb cat".match(pattern) ?? []));',
            },
          ],
        },
        {
          name: "Build date patterns with string interpolation",
          explanation:
            "Combine validated literal variables with explicitly escaped regex syntax.",
          note: "Constructor strings need doubled backslashes, or a String.raw fragment. This checks a date shape, not calendar validity.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp",
          examples: [
            {
              label: "Insert a validated year",
              language: "javascript",
              code: 'function escapeRegex(text) {\n  return RegExp.escape(text);\n}\nconst year = "2024";\nif (!/^\\d{4}$/.test(year)) throw new Error("Invalid year");\nconst pattern = new RegExp("^" + escapeRegex(year) + "-\\\\d{2}-\\\\d{2}$");\nconsole.log(pattern.test("2024-03-15"), pattern.test("2025-03-15"));',
            },
            {
              label: "Use a raw fragment for regex escapes",
              language: "javascript",
              code: 'function escapeRegex(text) {\n  return RegExp.escape(text);\n}\nconst year = "2024",\n  digits = String.raw`\\d{2}`;\nconst pattern = new RegExp(\n  "^" + escapeRegex(year) + "-" + digits + "-" + digits + "$",\n);\nconsole.log(pattern.test("2024-99-99"), pattern.test("2024-1-01"));',
            },
          ],
        },
        {
          name: "buildValidator() — conditional pattern rules",
          explanation:
            "Build fixed lookahead fragments from boolean switches and a validated minimum length.",
          note: "Validating the numeric bound prevents injecting syntax into the quantifier. This is a character-rule example, not password-strength estimation; dot excludes line terminators.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookahead_assertion",
          examples: [
            {
              label: "Select the requested rules",
              language: "javascript",
              code: 'function buildValidator(options) {\n  const { minLength = 8 } = options;\n  if (!Number.isSafeInteger(minLength) || minLength < 1 || minLength > 1024)\n    throw new RangeError("Use an integer length from 1 to 1024");\n  const rules = {\n    uppercase: "(?=.*[A-Z])",\n    lowercase: "(?=.*[a-z])",\n    digit: "(?=.*\\\\d)",\n    special: "(?=.*[@$%*&])",\n  };\n  let pattern = "^";\n  for (const [key, rule] of Object.entries(rules)) {\n    if (options[key] !== undefined && typeof options[key] !== "boolean")\n      throw new TypeError("Use boolean switches");\n    if (options[key]) pattern += rule;\n  }\n  return new RegExp(pattern + ".{" + minLength + ",}$", "u");\n}\nconst pattern = buildValidator({\n  uppercase: true,\n  lowercase: true,\n  digit: true,\n  special: true,\n  minLength: 8,\n});\nconsole.log(pattern.test("Abcdef1@"), pattern.test("Abcdefgh"));',
            },
            {
              label: "Choose fewer rules and reject invalid bounds",
              language: "javascript",
              code: 'function buildValidator(options) {\n  const { minLength = 8 } = options;\n  if (!Number.isSafeInteger(minLength) || minLength < 1 || minLength > 1024)\n    throw new RangeError("Use an integer length from 1 to 1024");\n  const rules = {\n    uppercase: "(?=.*[A-Z])",\n    lowercase: "(?=.*[a-z])",\n    digit: "(?=.*\\\\d)",\n    special: "(?=.*[@$%*&])",\n  };\n  let pattern = "^";\n  for (const [key, rule] of Object.entries(rules)) {\n    if (options[key] !== undefined && typeof options[key] !== "boolean")\n      throw new TypeError("Use boolean switches");\n    if (options[key]) pattern += rule;\n  }\n  return new RegExp(pattern + ".{" + minLength + ",}$", "u");\n}\nconst pattern = buildValidator({ digit: true, minLength: 3 });\nconsole.log(pattern.test("ab1"), pattern.test("abc"));\ntry {\n  buildValidator({ minLength: "8}" });\n} catch (error) {\n  console.log(error.name);\n}',
            },
          ],
        },
        {
          name: "wordBoundary() — bounded ASCII token factory",
          explanation:
            "Create a reusable whole-token pattern for nonempty ASCII word-character input.",
          note: "This helper explicitly rejects punctuation-ending text such as C++; blindly wrapping arbitrary escaped input in word boundaries gives surprising results. g makes the returned regex stateful.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Word_boundary_assertion",
          examples: [
            {
              label: "Find whole token occurrences",
              language: "javascript",
              code: 'function escapeRegex(text) {\n  return RegExp.escape(text);\n}\nfunction wordBoundary(word) {\n  if (!/^\\w+$/.test(word))\n    throw new TypeError("Use a nonempty ASCII word token");\n  return new RegExp("\\\\b" + escapeRegex(word) + "\\\\b", "gi");\n}\nconsole.log(...("Cat scatter cat_1 CAT!".match(wordBoundary("cat")) ?? []));',
            },
            {
              label: "Reject input outside the factory contract",
              language: "javascript",
              code: 'function escapeRegex(text) {\n  return RegExp.escape(text);\n}\nfunction wordBoundary(word) {\n  if (!/^\\w+$/.test(word))\n    throw new TypeError("Use a nonempty ASCII word token");\n  return new RegExp("\\\\b" + escapeRegex(word) + "\\\\b", "gi");\n}\ntry {\n  wordBoundary("C++");\n} catch (error) {\n  console.log(error.name);\n}\nconsole.log("id_1 id_12".match(wordBoundary("id_1"))[0]);',
            },
          ],
        },
        {
          name: "anyOf() — literal alternatives from an array",
          explanation: "Escape and combine an array of literal choices.",
          note: "Rejects empty literal items and preserves input priority for alternatives with a common prefix. This is substring matching; constrain input size when building large patterns.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Disjunction",
          examples: [
            {
              label: "Match punctuation literally",
              language: "javascript",
              code: 'function escapeRegex(text) {\n  return RegExp.escape(text);\n}\nfunction anyOf(items) {\n  if (\n    !Array.isArray(items) ||\n    items.some((item) => typeof item !== "string" || item.length === 0)\n  )\n    throw new TypeError("Use nonempty literal strings");\n  return items.length\n    ? new RegExp("(?:" + items.map(escapeRegex).join("|") + ")", "g")\n    : /(?!)/g;\n}\nconsole.log(...("a.b aXb C++".match(anyOf(["a.b", "C++"])) ?? []));',
            },
            {
              label: "Handle an empty list and shared-prefix priority",
              language: "javascript",
              code: 'function escapeRegex(text) {\n  return RegExp.escape(text);\n}\nfunction anyOf(items) {\n  if (\n    !Array.isArray(items) ||\n    items.some((item) => typeof item !== "string" || item.length === 0)\n  )\n    throw new TypeError("Use nonempty literal strings");\n  return items.length\n    ? new RegExp("(?:" + items.map(escapeRegex).join("|") + ")", "g")\n    : /(?!)/g;\n}\nconsole.log(("anything".match(anyOf([])) ?? []).length);\nconsole.log("cater".match(anyOf(["cat", "cater"]))[0]);\ntry {\n  anyOf([""]);\n} catch (error) {\n  console.log(error.name);\n}',
            },
          ],
        },
        {
          name: "Unicode-aware property matching",
          explanation:
            "Use u for the demonstrated Unicode property escapes and code-point-aware matching.",
          note: "The examples use u consistently; properties also work in v mode, but u and v cannot be combined. Unicode mode does not perform text normalization automatically.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape",
          examples: [
            {
              label: "Match a supplementary code point",
              language: "javascript",
              code: 'console.log(/^.$/.test("😀"), /^.$/u.test("😀"), /\\u{1F600}/u.test("😀"));',
            },
            {
              label: "Recognize letters beyond ASCII",
              language: "javascript",
              code: 'console.log(/^\\p{Letter}+$/u.test("café"), /^[A-Za-z]+$/.test("café"));',
            },
          ],
        },
        {
          name: "Emoji property — code point membership",
          explanation:
            "Use the Emoji property to test code points marked with that Unicode property.",
          note: "Some ASCII digits have the Emoji property because they participate in keycap sequences; matching this property alone does not identify a complete emoji grapheme.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape",
          examples: [
            {
              label: "Test the supplied emoji",
              language: "javascript",
              code: 'console.log(/\\p{Emoji}/u.test("😀"), /\\p{Emoji}/u.test("A"));',
            },
            {
              label: "Expose digit membership",
              language: "javascript",
              code: 'console.log(/\\p{Emoji}/u.test("1"), /^\\p{Emoji}$/u.test("👨‍👩‍👧‍👦"));',
            },
          ],
        },
        {
          name: "Letter property — international letters",
          explanation:
            "Use Letter or its alias L for Unicode letter characters.",
          note: "Combining marks are a different category, so a decomposed accented letter can fail an all-letters check until normalized.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape",
          examples: [
            {
              label: "Match Hebrew and mixed-script letter runs",
              language: "javascript",
              code: 'console.log(/\\p{Letter}/u.test("א"), "Hello世界".match(/\\p{L}+/u)[0]);',
            },
            {
              label: "Distinguish combining marks",
              language: "javascript",
              code: 'const decomposed = "e\\u0301";\nconsole.log(\n  /^\\p{L}+$/u.test(decomposed),\n  /^\\p{L}+$/u.test(decomposed.normalize("NFC")),\n);',
            },
          ],
        },
        {
          name: "Script=Greek — a specific script property",
          explanation:
            "Use an explicit Script property to match characters assigned to Greek.",
          note: "JavaScript requires the property name here; script membership is not the same as a language identifier or a complete writing-system validator.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape",
          examples: [
            {
              label: "Check Greek versus Latin letters",
              language: "javascript",
              code: 'console.log(/\\p{Script=Greek}/u.test("Ω"), /\\p{Script=Greek}/u.test("A"));',
            },
            {
              label: "Extract a Greek run",
              language: "javascript",
              code: 'console.log("Latin Ελληνικά".match(/\\p{Script=Greek}+/u)[0]);',
            },
          ],
        },
        {
          name: "Sc — currency symbol category",
          explanation:
            "Use Sc or Currency_Symbol for Unicode currency-symbol characters.",
          note: "The image’s CurrencySymbol spelling is not the JavaScript property alias; Sc is valid. A currency code such as USD is letters, not a symbol.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape",
          examples: [
            {
              label: "Match the supplied euro symbol",
              language: "javascript",
              code: 'console.log(\n  /\\p{Sc}/u.test("€"),\n  /\\p{Currency_Symbol}/u.test("£"),\n  /\\p{Sc}/u.test("USD"),\n);',
            },
            {
              label: "Collect currency symbols",
              language: "javascript",
              code: 'console.log(...("$10 €20 ¥30".match(/\\p{Sc}/gu) ?? []));',
            },
          ],
        },
        {
          name: "General categories — L, N, P, S, Z",
          explanation:
            "Use Unicode general-category aliases for letters, numbers, punctuation, symbols, and separators.",
          note: "N includes more than decimal digits. Z is separator membership, not the same set as JavaScript whitespace; for example tab is whitespace but not a separator.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape",
          examples: [
            {
              label: "Check every supplied category",
              language: "javascript",
              code: 'console.log(\n  /\\p{L}/u.test("א"),\n  /\\p{N}/u.test("Ⅷ"),\n  /\\p{P}/u.test("!"),\n  /\\p{S}/u.test("+"),\n  /\\p{Z}/u.test(" "),\n);',
            },
            {
              label: "Distinguish categories from shorthand sets",
              language: "javascript",
              code: 'console.log(\n  /\\p{N}/u.test("٣"),\n  /\\d/u.test("٣"),\n  /\\p{Z}/u.test("\\t"),\n  /\\s/u.test("\\t"),\n);',
            },
          ],
        },
        {
          name: "Match Han, Arabic, and Cyrillic scripts",
          explanation:
            "Use Script values to find runs assigned to the selected script.",
          note: "Script names describe character properties, not exclusively one language; Han is used by several languages and punctuation or combining marks can have other Script values.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape",
          examples: [
            {
              label: "Read Han and Arabic runs",
              language: "javascript",
              code: 'console.log(\n  "Hello 世界".match(/\\p{Script=Han}+/u)[0],\n  "Hello مرحبا".match(/\\p{Script=Arabic}+/u)[0],\n);',
            },
            {
              label: "Read Cyrillic and reject another script",
              language: "javascript",
              code: 'console.log(\n  "Hello Привіт".match(/\\p{Script=Cyrillic}+/u)[0],\n  /^\\p{Script=Cyrillic}+$/u.test("Hello"),\n);',
            },
          ],
        },
        {
          name: "Emoji extraction — properties are not grapheme segmentation",
          explanation:
            "Finds matching emoji code points, which may be only part of a visible emoji.",
          note: "The alternatives overlap, and this pattern can split joined or modified emoji sequences and match digits. It does not return every displayed emoji as one item.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape",
          examples: [
            {
              label: "Collect the simple supplied emoji",
              language: "javascript",
              code: 'const pattern = /\\p{Emoji_Presentation}|\\p{Emoji}/gu;\nconsole.log(...("Hello 👋 World 🌍!".match(pattern) ?? []));',
            },
            {
              label: "Expose joined-sequence and digit behavior",
              language: "javascript",
              code: 'const pattern = /\\p{Emoji_Presentation}|\\p{Emoji}/gu;\nconst family = "👨‍👩‍👧‍👦".match(pattern);\nconsole.log(family.length, ...family);\nconsole.log("1".match(pattern)[0]);',
            },
          ],
        },
        {
          name: "Remove diacritics after NFD normalization",
          explanation:
            "Decompose text with NFD and remove characters carrying the Diacritic property.",
          note: "This is not general transliteration: some letters do not decompose into an ASCII base, and removing diacritics may change meaning. Preserve original text separately.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize",
          examples: [
            {
              label: "Fold the supplied Latin accents",
              language: "javascript",
              code: 'const text = "café naïve résumé";\nconsole.log(text.normalize("NFD").replace(/\\p{Diacritic}/gu, ""));',
            },
            {
              label: "Keep the original and show a nondecomposing letter",
              language: "javascript",
              code: 'const original = "café ø";\nconst folded = original.normalize("NFD").replace(/\\p{Diacritic}/gu, "");\nconsole.log(original, folded);',
            },
          ],
        },
        {
          name: "International letter runs versus words",
          explanation:
            "Collects runs of Unicode letters. These runs are not always whole words.",
          note: "The screenshot’s single exec call returns only the first run, and adjacent Hello, Han, and Arabic letters are one run. Unicode letter matching is not natural-language word segmentation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec",
          examples: [
            {
              label: "Observe one continuous mixed-script run",
              language: "javascript",
              code: 'const text = "Hello世界مرحبا";\nconst pattern = /\\p{L}+/gu;\nconsole.log(pattern.exec(text)[0], pattern.exec(text));',
            },
            {
              label: "Collect runs with actual separators",
              language: "javascript",
              code: 'console.log(...("Hello 世界 مرحبا".match(/\\p{L}+/gu) ?? []));',
            },
          ],
        },
        {
          name: "Case-insensitive Unicode and normalization",
          explanation:
            "Uses i and u for Unicode case matching. Normalize equivalent text separately.",
          note: "Case folding is not locale-specific casing, and the u flag alone does not equate composed and decomposed strings.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/ignoreCase",
          examples: [
            {
              label: "Match the supplied uppercase accented character",
              language: "javascript",
              code: 'console.log(/\\u{00E9}/iu.test("\\u{00C9}"), /\\u{00E9}/u.test("\\u{00C9}"));',
            },
            {
              label: "Normalize a decomposed form before matching",
              language: "javascript",
              code: 'const pattern = /^é$/iu,\n  text = "E\\u0301";\nconsole.log(pattern.test(text), pattern.test(text.normalize("NFC")));',
            },
          ],
        },
      ],
    },
    {
      name: "Debugging & Tools",
      id: "debugging-tools",
      intro:
        "Step-by-step inspection → readable fragments → incremental checks → exec progression → timing → test suites → match visualization and external reproduction, following all three images. Run snippets independently in a current browser or Node.js. Timing output is intentionally variable; matching results and diagnostics are deterministic. Test helpers isolate state and visual markers declare their layout limits.",
      methods: [
        {
          name: "Inspect a pattern step by step",
          explanation:
            "Start with a boolean check, then inspect the full match, position, and capture fields.",
          note: "Check for null before accessing a match. A date-shaped match is not a calendar-validity check; avoid carrying state from a global test into a later diagnostic.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec",
          examples: [
            {
              label: "Check the supplied date and its position",
              language: "javascript",
              code: 'const pattern = /(\\d{4})-(\\d{2})-(\\d{2})/,\n  input = "2024-03-15";\nconsole.log(pattern.test(input));\nconst match = pattern.exec(input);\nif (match) console.log(match[0], match.index, match.input === input);',
            },
            {
              label: "Enumerate the full match and capture fields",
              language: "javascript",
              code: 'const match = "2024-03-15".match(/(\\d{4})-(\\d{2})-(\\d{2})/);\nif (match) match.forEach((group, index) => console.log(index, group));',
            },
            {
              label: "Handle a failed match before inspecting fields",
              language: "javascript",
              code: 'const match = /(\\d{4})-(\\d{2})-(\\d{2})/.exec("not a date");\nconsole.log(match === null, match?.[1] ?? "no year");',
            },
          ],
        },
        {
          name: "Build a readable pattern from commented fragments",
          explanation:
            "Join small regex-source fragments while keeping comments in JavaScript.",
          note: "Joining fragments is not a free-spacing regex mode. Constructor strings require escaped backslashes, and g changes result/lastIndex behavior rather than readability.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp",
          examples: [
            {
              label: "Build the supplied year-month prefix",
              language: "javascript",
              code: 'const pattern = new RegExp(\n  [\n    "(", // Capture year\n    "\\\\d{4}", // Four digits\n    ")",\n    "-", // Literal dash\n    "(", // Capture month shape\n    "\\\\d{2}",\n    ")",\n  ].join(""),\n  "g",\n);\nconst match = pattern.exec("2024-03-15");\nconsole.log(match[0], match[1], match[2], pattern.lastIndex);',
            },
            {
              label: "Compare joined and literal patterns",
              language: "javascript",
              code: 'const joined = new RegExp(\n  ["^", "\\\\d{4}", "-", "\\\\d{2}", "-", "\\\\d{2}", "$"].join(""),\n);\nconst literal = /^\\d{4}-\\d{2}-\\d{2}$/;\nconsole.log(joined.source === literal.source, joined.test("2024-03-15"));',
            },
          ],
        },
        {
          name: "Test incremental pattern stages",
          explanation:
            "Add one requirement at a time and inspect which stage first fails.",
          note: "These stages use anchored prefixes and a full-input final stage; unanchored fragments can succeed at a different position and hide the actual failing prefix.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
          examples: [
            {
              label: "Verify every stage on the supplied input",
              language: "javascript",
              code: 'const steps = [\n  /^\\d/,\n  /^\\d{4}/,\n  /^\\d{4}-/,\n  /^\\d{4}-\\d{2}/,\n  /^\\d{4}-\\d{2}-\\d{2}$/,\n];\nconst input = "2024-03-15";\nsteps.forEach((step, index) => console.log(index, step.test(input)));',
            },
            {
              label: "Find the first failing stage",
              language: "javascript",
              code: 'const steps = [\n  /^\\d/,\n  /^\\d{4}/,\n  /^\\d{4}-/,\n  /^\\d{4}-\\d{2}/,\n  /^\\d{4}-\\d{2}-\\d{2}$/,\n];\nconst input = "2024/03-15";\nconsole.log(steps.findIndex((step) => !step.test(input)));',
            },
          ],
        },
        {
          name: "Log global exec progression",
          explanation:
            "Inspect matched text, match index, and lastIndex after each exec call.",
          note: "A failed global exec resets lastIndex. Empty matches need explicit advancement in an exec loop; the Unicode-aware example advances by code point.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex",
          examples: [
            {
              label: "Track each numeric run",
              language: "javascript",
              code: 'const pattern = /\\d+/g;\nlet match;\nwhile ((match = pattern.exec("a1b22c333")) !== null)\n  console.log(match[0], match.index, pattern.lastIndex);\nconsole.log(pattern.lastIndex);',
            },
            {
              label:
                "Advance an empty match without splitting a surrogate pair",
              language: "javascript",
              code: 'const text = "A😀B",\n  pattern = /(?=.)/gu;\nlet match;\nconst positions = [];\nwhile ((match = pattern.exec(text)) !== null) {\n  positions.push(match.index);\n  if (match[0] === "")\n    pattern.lastIndex += text.codePointAt(pattern.lastIndex) > 0xffff ? 2 : 1;\n}\nconsole.log(...positions);',
            },
          ],
        },
        {
          name: "Measure representative regex work",
          explanation:
            "Use a timer around a repeated, bounded workload and keep the results so correctness is checked alongside timing.",
          note: "console.time/timeEnd prints variable timing; it is not a portable performance assertion. Warmup, construction, stateful flags, input distribution, and adversarial failures all affect measurements. Large dangerous patterns can block before a timer finishes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/console/time_static",
          examples: [
            {
              label: "Time the supplied repeated check",
              language: "javascript",
              code: 'const pattern = /^\\d{4}-\\d{2}-\\d{2}$/,\n  input = "2024-03-15";\nlet successes = 0;\nconsole.time("regex-debug");\nfor (let i = 0; i < 100000; i++) if (pattern.test(input)) successes++;\nconsole.timeEnd("regex-debug");\nconsole.log(successes);',
            },
            {
              label:
                "Measure a mixed workload without asserting a speed threshold",
              language: "javascript",
              code: 'const pattern = /^\\d{4}-\\d{2}-\\d{2}$/,\n  inputs = ["2024-03-15", "bad", "2025-04-20"];\nlet successes = 0;\nconst start = performance.now();\nfor (let i = 0; i < 1000; i++)\n  for (const input of inputs) if (pattern.test(input)) successes++;\nconst elapsed = performance.now() - start;\nconsole.log(successes, Number.isFinite(elapsed), elapsed >= 0);',
            },
          ],
        },
        {
          name: "testPattern() — independent table-driven cases",
          explanation:
            "Run named inputs with expected boolean outcomes and show a diagnostic for any mismatch.",
          note: "This suite tests each case from index zero; a stateful parser that starts elsewhere needs explicit lastIndex expectations in a separate test. A reported failure is preserved rather than hidden.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test",
          examples: [
            {
              label: "Test expected matches and rejections",
              language: "javascript",
              code: 'function testPattern(pattern, tests) {\n  let passed = 0;\n  for (const { input, expected, description } of tests) {\n    if (typeof input !== "string" || typeof expected !== "boolean")\n      throw new TypeError("Use string input and boolean expected");\n    const regex = new RegExp(pattern.source, pattern.flags);\n    const actual = regex.test(input);\n    const ok = actual === expected;\n    if (ok) passed++;\n    console.log(ok ? "PASS" : "FAIL", description);\n    if (!ok) console.log(JSON.stringify(input), expected, actual);\n  }\n  return { passed, total: tests.length };\n}\nconst result = testPattern(/^\\d{4}-\\d{2}-\\d{2}$/, [\n  { input: "2024-03-15", expected: true, description: "date shape" },\n  { input: "", expected: false, description: "empty input" },\n  { input: "2024/03/15", expected: false, description: "wrong separator" },\n]);\nconsole.log(result.passed, result.total);',
            },
            {
              label: "Show a useful failure without mutating the caller regex",
              language: "javascript",
              code: 'function testPattern(pattern, tests) {\n  let passed = 0;\n  for (const { input, expected, description } of tests) {\n    if (typeof input !== "string" || typeof expected !== "boolean")\n      throw new TypeError("Use string input and boolean expected");\n    const regex = new RegExp(pattern.source, pattern.flags);\n    const actual = regex.test(input);\n    const ok = actual === expected;\n    if (ok) passed++;\n    console.log(ok ? "PASS" : "FAIL", description);\n    if (!ok) console.log(JSON.stringify(input), expected, actual);\n  }\n  return { passed, total: tests.length };\n}\nconst pattern = /a/g;\npattern.lastIndex = 1;\nconst result = testPattern(pattern, [\n  { input: "a", expected: true, description: "first case" },\n  { input: "a", expected: true, description: "independent case" },\n  { input: "b", expected: true, description: "intentional mismatch" },\n]);\nconsole.log(result.passed, result.total, pattern.lastIndex);',
            },
          ],
        },
        {
          name: "visualizeMatch() — show a first-match span",
          explanation:
            "Render a simple text marker and report explicit start/end offsets for the first match.",
          note: "Handles empty and one-character matches without negative repeat counts. Marker alignment is intended for single-line ASCII: tabs, line breaks, wide characters, and grapheme clusters need a richer visualizer. Offsets remain UTF-16 positions.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec",
          examples: [
            {
              label: "Visualize the supplied word match",
              language: "javascript",
              code: 'function visualizeMatch(text, pattern) {\n  const regex = new RegExp(pattern.source, pattern.flags);\n  const match = regex.exec(text);\n  if (!match) {\n    console.log("No match");\n    return null;\n  }\n  const start = match.index,\n    end = start + match[0].length;\n  const marker =\n    match[0].length > 1 ? "^" + "-".repeat(match[0].length - 2) + "^" : "^";\n  console.log(text);\n  console.log(" ".repeat(start) + marker);\n  console.log(JSON.stringify(match[0]), start, end);\n  return { start, end, text: match[0] };\n}\nvisualizeMatch("hello world", /world/g);',
            },
            {
              label: "Handle one character, an empty match, and no match",
              language: "javascript",
              code: 'function visualizeMatch(text, pattern) {\n  const regex = new RegExp(pattern.source, pattern.flags);\n  const match = regex.exec(text);\n  if (!match) {\n    console.log("No match");\n    return null;\n  }\n  const start = match.index,\n    end = start + match[0].length;\n  const marker =\n    match[0].length > 1 ? "^" + "-".repeat(match[0].length - 2) + "^" : "^";\n  console.log(text);\n  console.log(" ".repeat(start) + marker);\n  console.log(JSON.stringify(match[0]), start, end);\n  return { start, end, text: match[0] };\n}\nvisualizeMatch("a", /a/);\nvisualizeMatch("abc", /(?=b)/);\nvisualizeMatch("abc", /z/);',
            },
          ],
        },
        {
          name: "Reproduce cases in an online regex tester",
          explanation:
            "Checks a small example in a regex tester using JavaScript rules and the intended flags.",
          note: "Regex flavors differ; select JavaScript rather than assuming a PCRE result applies. Share synthetic input rather than sensitive data. External tool support and explanations can differ from the exact browser engine.",
          source: "https://regex101.com/",
          examples: [
            {
              label: "Create a portable reproduction description",
              language: "javascript",
              code: 'const pattern = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/g;\nconst input = "2024-03-15";\nconsole.log(\n  JSON.stringify({\n    flavor: "JavaScript",\n    source: pattern.source,\n    flags: pattern.flags,\n    input,\n  }),\n);',
            },
            {
              label: "Verify the reproduction locally with captures",
              language: "javascript",
              code: 'const source = String.raw`(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})`;\nconst regex = new RegExp(source, "g");\nfor (const match of "2024-03-15".matchAll(regex))\n  console.log(match.groups.year, match.groups.month, match.groups.day);',
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
          "regular-expressions-cheatsheet:" +
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
