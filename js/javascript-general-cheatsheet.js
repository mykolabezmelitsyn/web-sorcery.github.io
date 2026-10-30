/* Add only JavaScript General categories supplied by the user, in image order. */
const handbook = {
  categories: [
    {
      name: "Variables & Data Types",
      id: "variables-data-types",
      intro:
        "Variable Declaration → Primitive Data Types → Type Checking & Conversion, following all six images. Run each example independently in a modern browser console or Node.js with BigInt support. Examples print their results; quoted strings in comments describe string values, while console styling varies. Declaration examples use userName rather than the browser’s global name property. const/let binding rules are separate from value types, and primitives are not wrapper objects.",
      methods: [
        {
          name: "const",
          explanation:
            "Creates a variable that cannot be reassigned. It is available only inside its block.",
          note: "An initializer is required for an ordinary const declaration. A constant binding does not freeze the object it references; access before initialization is in the temporal dead zone.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const",
          examples: [
            {
              label: "Declare a fixed text binding",
              language: "javascript",
              code: 'const userName = "John";\nconsole.log(userName); // "John"',
            },
            {
              label:
                "Observe reassignment failing without stopping the example",
              language: "javascript",
              code: 'const userName = "John";\ntry {\n  userName = "Jane";\n} catch (error) {\n  console.log(error.name); // "TypeError"\n}',
            },
            {
              label: "Mutate an object while retaining the same binding",
              language: "javascript",
              code: 'const user = { name: "John" };\nuser.name = "Jane";\nconsole.log(user.name); // "Jane"',
            },
          ],
        },
        {
          name: "let",
          explanation:
            "Creates a variable that can be reassigned. It is available only inside its block.",
          note: "A declaration without an initializer begins with undefined once its declaration executes. Access before initialization throws rather than returning undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let",
          examples: [
            {
              label: "Update a numeric value",
              language: "javascript",
              code: "let age = 30;\nage = 31;\nconsole.log(age); // 31",
            },
            {
              label: "Assign after declaring",
              language: "javascript",
              code: 'let message;\nconsole.log(message); // undefined\nmessage = "Ready";\nconsole.log(message); // "Ready"',
            },
          ],
        },
        {
          name: "var",
          explanation:
            "Creates a variable available throughout its function. Prefer let or const in new code.",
          note: "A var declaration is initialized to undefined before its assignment executes, and an ordinary block does not create its scope. Top-level behavior differs between classic scripts, modules, and Node.js wrappers.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var",
          examples: [
            {
              label: "Read a hoisted binding before its assignment",
              language: "javascript",
              code: 'function readLegacy() {\n  console.log(oldStyle); // undefined\n  var oldStyle = "legacy";\n  console.log(oldStyle); // "legacy"\n}\nreadLegacy();',
            },
            {
              label: "Keep var inside its enclosing function",
              language: "javascript",
              code: 'function legacyScope() {\n  if (true) {\n    var legacyValue = "function-local";\n  }\n  return legacyValue;\n}\nconsole.log(legacyScope()); // "function-local"',
            },
          ],
        },
        {
          name: "Block scope",
          explanation:
            "Keeps let and const variables inside the block where they are declared.",
          note: "The examples wrap declarations in a function to avoid depending on browser globals or module scope. An inner block can shadow an outer binding without changing it.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block",
          examples: [
            {
              label: "Compare block-scoped bindings with var",
              language: "javascript",
              code: 'function compareScopes() {\n  {\n    let blockScoped = "inside";\n    const alsoBlockScoped = "inside";\n    var functionScoped = "visible outside";\n    console.log(blockScoped, alsoBlockScoped); // "inside", "inside"\n  }\n  console.log(typeof blockScoped, typeof alsoBlockScoped); // "undefined", "undefined"\n  console.log(functionScoped); // "visible outside"\n}\ncompareScopes();',
            },
            {
              label: "Shadow a name without changing the outer value",
              language: "javascript",
              code: 'let label = "outer";\n{\n  const label = "inner";\n  console.log(label); // "inner"\n}\nconsole.log(label); // "outer"',
            },
          ],
        },
        {
          name: "String",
          explanation:
            "Stores text. String methods return new text instead of changing the original.",
          note: "String values cannot be mutated in place; assigning a different string changes a binding rather than the original text. These examples use primitives rather than boxed String objects.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
          examples: [
            {
              label: "Use ordinary quote styles",
              language: "javascript",
              code: 'const text = "Hello";\nconst singleQuotes = "World";\nconsole.log(text, singleQuotes); // "Hello", "World"',
            },
            {
              label: "Interpolate a value in a template literal",
              language: "javascript",
              code: 'const text = "Hello";\nconst template = `Value: ${text}`;\nconsole.log(template); // "Value: Hello"',
            },
          ],
        },
        {
          name: "Number",
          explanation: "Stores whole numbers and decimals.",
          note: "Integer and floating literal forms have the same number type. Floating-point rounding and the safe-integer limit matter; use BigInt when exact larger integers are required.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
          examples: [
            {
              label: "Represent an integer and a fractional value",
              language: "javascript",
              code: "const integer = 42;\nconst float = 3.14;\nconsole.log(integer, float); // 42, 3.14",
            },
            {
              label: "Use scientific and hexadecimal literals",
              language: "javascript",
              code: "const scientific = 1.5e3;\nconst hex = 0xff;\nconsole.log(scientific, hex); // 1500, 255",
            },
          ],
        },
        {
          name: "Boolean",
          explanation: "Stores true or false.",
          note: 'The strings "true" and "false" are text, not booleans. Boolean conversion and truthiness are covered later in this category.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean",
          examples: [
            {
              label: "Store true and false flags",
              language: "javascript",
              code: "const isActive = true;\nconst isComplete = false;\nconsole.log(isActive, isComplete); // true, false",
            },
            {
              label: "Produce a boolean with a comparison",
              language: "javascript",
              code: "const completed = 3;\nconst total = 3;\nconsole.log(completed === total); // true",
            },
          ],
        },
        {
          name: "undefined",
          explanation: "Means a value has not been provided or assigned.",
          note: "An undeclared identifier is different: reading it normally throws. undefined can also be assigned explicitly, so the value alone does not explain why it is missing.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined",
          examples: [
            {
              label: "Read a declared but unassigned variable",
              language: "javascript",
              code: "let notDefined;\nconsole.log(notDefined); // undefined",
            },
            {
              label: "Observe a function with no return value",
              language: "javascript",
              code: "const functionResult = (() => {})();\nconsole.log(functionResult); // undefined",
            },
          ],
        },
        {
          name: "null",
          explanation: "Marks an intentionally empty or missing value.",
          note: 'null and undefined are distinct values. typeof null returns "object" for historical compatibility, so use a direct null comparison when that distinction matters.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null",
          examples: [
            {
              label: "Store an intentional empty value",
              language: "javascript",
              code: "const empty = null;\nconsole.log(empty === null); // true",
            },
            {
              label: "Distinguish null from undefined",
              language: "javascript",
              code: "const selectedItem = null;\nconsole.log(selectedItem === undefined); // false\nconsole.log(selectedItem === null); // true",
            },
          ],
        },
        {
          name: "Symbol",
          explanation:
            "Creates a unique value that can be used as an object key.",
          note: 'Symbol("id") creates a new symbol each time; the description is a label rather than its identity. Symbols are not created with new.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol",
          examples: [
            {
              label: "Compare independently created symbols",
              language: "javascript",
              code: 'const first = Symbol("id");\nconst second = Symbol("id");\nconsole.log(first === second); // false',
            },
            {
              label: "Use a unique symbol as a property key",
              language: "javascript",
              code: 'const id = Symbol("id");\nconst user = { [id]: 123, name: "Alice" };\nconsole.log(user[id], user.name); // 123, "Alice"',
            },
          ],
        },
        {
          name: "BigInt",
          explanation: "Stores whole numbers beyond the safe range of Number.",
          note: "Use an n-suffixed literal or construct from an exact decimal string. Converting an already rounded Number cannot recover precision; arithmetic generally cannot mix BigInt and Number operands, and BigInt does not represent fractions.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt",
          examples: [
            {
              label: "Use a BigInt literal and same-type arithmetic",
              language: "javascript",
              code: "const big = 123n;\nconsole.log(big + 1n); // 124n",
            },
            {
              label: "Construct a large exact integer from text",
              language: "javascript",
              code: 'const big = BigInt("9007199254740992");\nconsole.log(big + 1n); // 9007199254740993n',
            },
          ],
        },
        {
          name: "typeof",
          explanation:
            'Returns a value’s type as text, such as "string" or "number".',
          note: 'null and arrays both report "object"; use more specific checks for them. typeof can read an undeclared name safely, but it still throws for a let or const binding in its temporal dead zone.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof",
          examples: [
            {
              label: "Check the primitive type result strings",
              language: "javascript",
              code: 'console.log(typeof "text", typeof 42, typeof true); // "string", "number", "boolean"\nconsole.log(typeof undefined, typeof Symbol("id"), typeof 123n); // "undefined", "symbol", "bigint"',
            },
            {
              label: "Recognize the object cases and function result",
              language: "javascript",
              code: 'console.log(typeof null, typeof {}, typeof []); // "object", "object", "object"\nconsole.log(typeof (() => {})); // "function"',
            },
          ],
        },
        {
          name: "Array.isArray()",
          explanation: "Checks whether a value is an actual array.",
          note: "It recognizes arrays across realms, unlike a constructor-identity check tied to one realm. Ordinary objects remain false.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray",
          examples: [
            {
              label: "Recognize an empty array",
              language: "javascript",
              code: "console.log(Array.isArray([])); // true",
            },
            {
              label: "Distinguish populated arrays from ordinary objects",
              language: "javascript",
              code: "console.log(Array.isArray([1, 2, 3])); // true\nconsole.log(Array.isArray({})); // false",
            },
          ],
        },
        {
          name: "instanceof Date",
          explanation:
            "Checks whether a value inherits from this Date constructor’s prototype.",
          note: "This is a prototype-chain test, not a universal date validator: a different realm can have a different Date constructor, and an invalid Date still passes instanceof Date.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof",
          examples: [
            {
              label: "Recognize a Date created with the current constructor",
              language: "javascript",
              code: 'const value = new Date("2026-01-01T00:00:00Z");\nconsole.log(value instanceof Date); // true',
            },
            {
              label: "Distinguish a date string from a Date object",
              language: "javascript",
              code: 'const value = "2026-01-01";\nconsole.log(value instanceof Date); // false',
            },
          ],
        },
        {
          name: "Object.prototype.toString.call()",
          explanation:
            'Returns a built-in type label such as "[object Array]".',
          note: "It can distinguish tags such as Array, Null, and Date, but custom Symbol.toStringTag values can spoof the result. It is not a security-grade validator.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString",
          examples: [
            {
              label: "Inspect array and ordinary object tags",
              language: "javascript",
              code: 'console.log(Object.prototype.toString.call([])); // "[object Array]"\nconsole.log(Object.prototype.toString.call({})); // "[object Object]"',
            },
            {
              label: "Inspect null and Date tags",
              language: "javascript",
              code: 'console.log(Object.prototype.toString.call(null)); // "[object Null]"\nconsole.log(Object.prototype.toString.call(new Date(0))); // "[object Date]"',
            },
          ],
        },
        {
          name: "String()",
          explanation: "Converts a value to text.",
          note: "It is distinct from creating a boxed String object. It handles null and undefined directly instead of invoking a method on those values.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/String",
          examples: [
            {
              label: "Convert a number to text",
              language: "javascript",
              code: 'console.log(String(42)); // "42"',
            },
            {
              label: "Convert boolean and empty-like primitive values",
              language: "javascript",
              code: 'console.log(String(true), String(null), String(undefined)); // "true", "null", "undefined"',
            },
          ],
        },
        {
          name: "Number()",
          explanation: "Converts a value to a number.",
          note: "An invalid numeric string produces NaN; unlike parseInt and parseFloat, trailing nonnumeric text is not accepted. Empty or whitespace-only strings and null convert to zero, which may need separate validation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number",
          examples: [
            {
              label: "Convert a numeric string and reject a unit suffix",
              language: "javascript",
              code: 'console.log(Number("42")); // 42\nconsole.log(Number("42px")); // NaN',
            },
            {
              label: "Convert boolean values to numeric flags",
              language: "javascript",
              code: "console.log(Number(true), Number(false)); // 1, 0",
            },
          ],
        },
        {
          name: "Boolean()",
          explanation: "Converts a value to true or false.",
          note: 'Ordinary objects and arrays are truthy, including empty ones; the string "false" is also truthy. The following examples use ordinary values, not the browser’s legacy document.all special case.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean/Boolean",
          examples: [
            {
              label: "Convert numeric and empty-string values",
              language: "javascript",
              code: 'console.log(Boolean(1), Boolean(0), Boolean("")); // true, false, false',
            },
            {
              label: "Distinguish nonempty text from its apparent meaning",
              language: "javascript",
              code: 'console.log(Boolean("hello"), Boolean("false")); // true, true',
            },
          ],
        },
        {
          name: "parseInt()",
          explanation:
            "Reads a whole number from the start of text using the given number base.",
          note: "Specify radix 10 for decimal input and 16 for hexadecimal input. Parsing can stop before trailing text and returns NaN if no valid initial digit is found; it is not whole-input validation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt",
          examples: [
            {
              label: "Parse decimal text with and without a unit suffix",
              language: "javascript",
              code: 'console.log(parseInt("42", 10), parseInt("42px", 10)); // 42, 42',
            },
            {
              label: "Parse an explicit hexadecimal value",
              language: "javascript",
              code: 'console.log(parseInt("0xFF", 16)); // 255',
            },
          ],
        },
        {
          name: "parseFloat()",
          explanation: "Reads a decimal number from the start of text.",
          note: "It can accept a trailing suffix, so it does not validate the entire string. Invalid starting text produces NaN; its grammar differs from Number for nondecimal numeric forms.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat",
          examples: [
            {
              label: "Parse a decimal string",
              language: "javascript",
              code: 'console.log(parseFloat("3.14")); // 3.14',
            },
            {
              label: "Accept a decimal prefix before trailing text",
              language: "javascript",
              code: 'console.log(parseFloat("3.14some")); // 3.14',
            },
          ],
        },
        {
          name: "Implicit conversion: + with a string",
          explanation: "Joins values as text when + receives a string.",
          note: "The operator also performs numeric addition for numeric operands. Objects can add further conversion behavior; these examples keep the operands primitive.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition",
          examples: [
            {
              label: "Observe concatenation with a string operand",
              language: "javascript",
              code: 'console.log("5" + 3); // "53"',
            },
            {
              label: "Choose numeric addition explicitly",
              language: "javascript",
              code: 'console.log(Number("5") + 3); // 8',
            },
          ],
        },
        {
          name: "Implicit conversion: subtraction",
          explanation:
            "Converts ordinary string values to numbers for subtraction.",
          note: "A nonnumeric string produces NaN. Unlike +, subtraction has no string-concatenation form; mixed Number and BigInt arithmetic throws.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Subtraction",
          examples: [
            {
              label: "Subtract from numeric text",
              language: "javascript",
              code: 'console.log("5" - 3); // 2',
            },
            {
              label: "Observe failed numeric conversion",
              language: "javascript",
              code: 'console.log("five" - 3); // NaN',
            },
          ],
        },
        {
          name: "Unary plus",
          explanation: "Converts a value to a number.",
          note: "It does not parse a partial numeric prefix and throws for BigInt operands. Number() is often clearer when validating user input, and an empty string still converts to zero.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus",
          examples: [
            {
              label: "Convert a numeric string",
              language: "javascript",
              code: 'console.log(+"42"); // 42',
            },
            {
              label: "Convert a boolean and an invalid numeric string",
              language: "javascript",
              code: 'console.log(+true, +"42px"); // 1, NaN',
            },
          ],
        },
        {
          name: "Double negation (!!)",
          explanation: "Converts a value to true or false, like Boolean().",
          note: "This is two operators, not a distinct type-checking construct. Nonempty strings and ordinary objects remain truthy even when they look empty or contain the word false.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
          examples: [
            {
              label: "Convert nonempty and empty text",
              language: "javascript",
              code: 'console.log(!!"hello", !!""); // true, false',
            },
            {
              label: "Convert an absent value and an ordinary object",
              language: "javascript",
              code: "console.log(!!null, !!{}); // false, true",
            },
          ],
        },
      ],
    },
    {
      name: "Operators",
      id: "operators",
      intro:
        "Arithmetic & Assignment → Comparison & Logical → Ternary & Special Operators, following all six images. Repeated operators are documented once within this category, at their first appearance; the supplied variations remain covered. Run every example independently in a modern browser console or Node.js. Each snippet defines its inputs and prints its results. Logical operators can return operand values, optional chaining guards only nullish bases, and spread creates shallow copies rather than deep clones.",
      methods: [
        {
          name: "+ (addition)",
          explanation: "Adds numbers or joins strings.",
          note: "A string operand can turn the result into concatenation. Number and BigInt arithmetic operands cannot be mixed without explicit conversion.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition",
          examples: [
            {
              label: "Add two numbers",
              language: "javascript",
              code: "console.log(10 + 5); // 15",
            },
            {
              label: "Add a numeric input explicitly",
              language: "javascript",
              code: 'const input = "10";\nconsole.log(Number(input) + 5); // 15',
            },
          ],
        },
        {
          name: "- (subtraction)",
          explanation: "Subtracts the right number from the left.",
          note: "Numeric strings are converted for subtraction; invalid numeric text produces NaN. It has no string-concatenation form.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Subtraction",
          examples: [
            {
              label: "Find a numeric difference",
              language: "javascript",
              code: "console.log(10 - 5); // 5",
            },
            {
              label: "Subtract after numeric coercion",
              language: "javascript",
              code: 'console.log("10" - 5); // 5',
            },
          ],
        },
        {
          name: "* (multiplication)",
          explanation: "Multiplies numeric values.",
          note: "Number multiplication follows floating-point arithmetic, while BigInt multiplication remains integer arithmetic. Avoid mixing the two types.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Multiplication",
          examples: [
            {
              label: "Multiply two values",
              language: "javascript",
              code: "console.log(10 * 5); // 50",
            },
            {
              label: "Calculate a price total",
              language: "javascript",
              code: "const price = 12;\nconst quantity = 3;\nconsole.log(price * quantity); // 36",
            },
          ],
        },
        {
          name: "/ (division)",
          explanation: "Divides the left number by the right.",
          note: "Number division can return fractions or Infinity; BigInt division truncates toward zero and rejects a zero divisor.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Division",
          examples: [
            {
              label: "Divide evenly",
              language: "javascript",
              code: "console.log(10 / 5); // 2",
            },
            {
              label: "Keep a fractional Number result",
              language: "javascript",
              code: "console.log(5 / 2); // 2.5",
            },
          ],
        },
        {
          name: "% (remainder)",
          explanation: "Returns the remainder after division.",
          note: "This is remainder, not mathematical modulo: a nonzero result has the dividend’s sign. For Numbers, a zero divisor yields NaN.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder",
          examples: [
            {
              label: "Get a positive remainder",
              language: "javascript",
              code: "console.log(10 % 3); // 1",
            },
            {
              label: "Observe the sign for a negative dividend",
              language: "javascript",
              code: "console.log(-10 % 3); // -1",
            },
          ],
        },
        {
          name: "** (exponentiation)",
          explanation: "Raises a number to a power.",
          note: "Exponentiation associates right to left. Parenthesize a negated base, as in (-2) ** 2, rather than writing an unparenthesized unary minus immediately before a power.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Exponentiation",
          examples: [
            {
              label: "Raise a value to a power",
              language: "javascript",
              code: "console.log(2 ** 3); // 8",
            },
            {
              label: "Make exponent grouping explicit",
              language: "javascript",
              code: "console.log(2 ** (3 ** 2)); // 512",
            },
          ],
        },
        {
          name: "+=",
          explanation: "Adds to the current value, or adds text to a string.",
          note: "It inherits + coercion behavior; it is not always numeric addition. Compound assignment evaluates the target reference once.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition_assignment",
          examples: [
            {
              label: "Increase a numeric total",
              language: "javascript",
              code: "let total = 10;\ntotal += 5;\nconsole.log(total); // 15",
            },
            {
              label: "Append text",
              language: "javascript",
              code: 'let message = "Hello";\nmessage += " World";\nconsole.log(message); // "Hello World"',
            },
          ],
        },
        {
          name: "-=",
          explanation: "Subtracts from the current value.",
          note: "The operation follows subtraction’s numeric conversion rules; the assignment target must be writable.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Subtraction_assignment",
          examples: [
            {
              label: "Reduce a value",
              language: "javascript",
              code: "let value = 15;\nvalue -= 3;\nconsole.log(value); // 12",
            },
            {
              label: "Remove a used quantity",
              language: "javascript",
              code: "let remaining = 8;\nremaining -= 2;\nconsole.log(remaining); // 6",
            },
          ],
        },
        {
          name: "*=",
          explanation: "Multiplies the current value.",
          note: "It follows multiplication’s Number or BigInt rules and requires compatible operand types.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Multiplication_assignment",
          examples: [
            {
              label: "Double a value",
              language: "javascript",
              code: "let value = 12;\nvalue *= 2;\nconsole.log(value); // 24",
            },
            {
              label: "Apply another scale factor",
              language: "javascript",
              code: "let size = 4;\nsize *= 3;\nconsole.log(size); // 12",
            },
          ],
        },
        {
          name: "/=",
          explanation: "Divides the current value.",
          note: "For Number values the result can be fractional; this is not an integer-division assignment.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Division_assignment",
          examples: [
            {
              label: "Divide an accumulated value",
              language: "javascript",
              code: "let value = 24;\nvalue /= 4;\nconsole.log(value); // 6",
            },
            {
              label: "Retain a fractional result",
              language: "javascript",
              code: "let portion = 5;\nportion /= 2;\nconsole.log(portion); // 2.5",
            },
          ],
        },
        {
          name: "%=",
          explanation:
            "Replaces the current value with the remainder after division.",
          note: "Negative inputs retain remainder’s dividend-sign behavior; this is not a universal positive-modulo normalization.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder_assignment",
          examples: [
            {
              label: "Keep the remainder",
              language: "javascript",
              code: "let value = 6;\nvalue %= 4;\nconsole.log(value); // 2",
            },
            {
              label: "Wrap a nonnegative index",
              language: "javascript",
              code: "let index = 12;\nindex %= 5;\nconsole.log(index); // 2",
            },
          ],
        },
        {
          name: "**=",
          explanation:
            "Raises the current value to a power and saves the result.",
          note: "This inherits exponentiation’s numeric-type rules. A const binding cannot be updated by compound assignment.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Exponentiation_assignment",
          examples: [
            {
              label: "Cube the current value",
              language: "javascript",
              code: "let value = 2;\nvalue **= 3;\nconsole.log(value); // 8",
            },
            {
              label: "Square a distance",
              language: "javascript",
              code: "let distance = 5;\ndistance **= 2;\nconsole.log(distance); // 25",
            },
          ],
        },
        {
          name: "x++ (post-increment)",
          explanation: "Adds one and returns the previous value.",
          note: "It still updates the target while evaluating the expression. Unlike += with a string, ++ performs numeric conversion rather than concatenation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Increment",
          examples: [
            {
              label: "Observe the returned value and updated counter",
              language: "javascript",
              code: "let count = 0;\nconsole.log(count++); // 0\nconsole.log(count); // 1",
            },
            {
              label: "Capture the prior value",
              language: "javascript",
              code: "let nextId = 10;\nconst id = nextId++;\nconsole.log(id, nextId); // 10, 11",
            },
          ],
        },
        {
          name: "++x (pre-increment)",
          explanation: "Adds one and returns the updated value.",
          note: "The difference from postfix is the expression result, not whether the target changes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Increment",
          examples: [
            {
              label: "Read the new value immediately",
              language: "javascript",
              code: "let count = 0;\nconsole.log(++count); // 1",
            },
            {
              label: "Assign the updated value",
              language: "javascript",
              code: "let count = 4;\nconst updated = ++count;\nconsole.log(updated, count); // 5, 5",
            },
          ],
        },
        {
          name: "x-- (post-decrement)",
          explanation: "Subtracts one and returns the previous value.",
          note: "It follows the same prefix/postfix distinction as increment, but subtracts one.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Decrement",
          examples: [
            {
              label: "Observe the old result and new target",
              language: "javascript",
              code: "let count = 3;\nconsole.log(count--); // 3\nconsole.log(count); // 2",
            },
            {
              label: "Capture the quantity before use",
              language: "javascript",
              code: "let remaining = 5;\nconst before = remaining--;\nconsole.log(before, remaining); // 5, 4",
            },
          ],
        },
        {
          name: "--x (pre-decrement)",
          explanation: "Subtracts one and returns the updated value.",
          note: "The target must be assignable; decrementing a literal or a const binding is invalid.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Decrement",
          examples: [
            {
              label: "Read the decremented value",
              language: "javascript",
              code: "let count = 3;\nconsole.log(--count); // 2",
            },
            {
              label: "Assign the updated remainder",
              language: "javascript",
              code: "let remaining = 5;\nconst after = --remaining;\nconsole.log(after, remaining); // 4, 4",
            },
          ],
        },
        {
          name: "Unary +",
          explanation: "Converts a value to a number.",
          note: "It rejects BigInt and does not accept a partial numeric prefix; Number() is often a clearer spelling.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus",
          examples: [
            {
              label: "Convert numeric text",
              language: "javascript",
              code: 'const value = "5";\nconsole.log(+value); // 5',
            },
            {
              label: "Convert a numeric flag",
              language: "javascript",
              code: "console.log(+true); // 1",
            },
          ],
        },
        {
          name: "Unary -",
          explanation: "Converts a value to a number and reverses its sign.",
          note: "It is distinct from subtracting two operands and does not mutate its input binding. BigInt negation is supported without mixing Number operands.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_negation",
          examples: [
            {
              label: "Negate numeric text",
              language: "javascript",
              code: 'const value = "5";\nconsole.log(-value); // -5',
            },
            {
              label: "Negate a negative number",
              language: "javascript",
              code: "const value = -8;\nconsole.log(-value); // 8",
            },
          ],
        },
        {
          name: "+ (string concatenation)",
          explanation: "Joins values as text.",
          note: "Evaluation is left-associative: mixing numbers and strings in a chain can change the result when grouping changes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition",
          examples: [
            {
              label: "Join text values",
              language: "javascript",
              code: 'console.log("Hello " + "World"); // "Hello World"',
            },
            {
              label: "Append a number as text",
              language: "javascript",
              code: 'console.log("Age: " + 30); // "Age: 30"',
            },
          ],
        },
        {
          name: "== (loose equality)",
          explanation:
            "Checks equality and may convert types before comparing.",
          note: "It is not a universal conversion to one shared type; null == undefined is a special match. Strict equality is usually easier to reason about.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality",
          examples: [
            {
              label: "Compare a number with numeric text",
              language: "javascript",
              code: 'console.log(5 == "5"); // true',
            },
            {
              label: "Observe empty-value and boolean coercion rules",
              language: "javascript",
              code: "console.log(null == undefined, 0 == false); // true, true",
            },
          ],
        },
        {
          name: "=== (strict equality)",
          explanation: "Checks equality without converting types.",
          note: "Distinct objects are compared by identity, not by their contents. NaN is not strictly equal to itself, while +0 and -0 are equal.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality",
          examples: [
            {
              label: "Keep numeric text distinct from a number",
              language: "javascript",
              code: 'console.log(5 === "5", 5 === 5); // false, true',
            },
            {
              label: "Keep different primitive types distinct",
              language: "javascript",
              code: "console.log(null === undefined, 0 === false); // false, false",
            },
          ],
        },
        {
          name: "!= (loose inequality)",
          explanation:
            "Checks inequality and may convert types before comparing.",
          note: "It inherits == rules rather than acting as a strict type-and-value mismatch test.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Inequality",
          examples: [
            {
              label: "Observe numeric text matching loosely",
              language: "javascript",
              code: 'console.log(5 != "5"); // false',
            },
            {
              label: "Compare loosely unequal values",
              language: "javascript",
              code: 'console.log(5 != "6"); // true',
            },
          ],
        },
        {
          name: "!== (strict inequality)",
          explanation: "Checks inequality without converting types.",
          note: "It does not compare object properties structurally; separate but similar objects are still different references.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_inequality",
          examples: [
            {
              label: "Detect a type difference",
              language: "javascript",
              code: 'console.log(5 !== "5"); // true',
            },
            {
              label: "Recognize equal same-type values",
              language: "javascript",
              code: "console.log(5 !== 5); // false",
            },
          ],
        },
        {
          name: ">",
          explanation:
            "Checks whether the left value is greater than the right.",
          note: "Both strings are compared lexicographically; other ordinary mixed primitive operands can trigger numeric conversion. Comparisons involving NaN are false.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Greater_than",
          examples: [
            {
              label: "Compare two numbers",
              language: "javascript",
              code: "console.log(5 > 3); // true",
            },
            {
              label: "Observe the equal boundary",
              language: "javascript",
              code: "console.log(5 > 5); // false",
            },
          ],
        },
        {
          name: ">=",
          explanation:
            "Checks whether the left value is greater than or equal to the right.",
          note: "It follows relational comparison rules and is not a separate strict-equality test. NaN-related cases can make it differ from a naive logical rewrite.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Greater_than_or_equal",
          examples: [
            {
              label: "Include the equal boundary",
              language: "javascript",
              code: "console.log(5 >= 5); // true",
            },
            {
              label: "Check an age threshold",
              language: "javascript",
              code: "const age = 18;\nconsole.log(age >= 18); // true",
            },
          ],
        },
        {
          name: "<",
          explanation: "Checks whether the left value is less than the right.",
          note: "Two strings use UTF-16 code-unit ordering, while a string paired with an ordinary Number can be converted numerically.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Less_than",
          examples: [
            {
              label: "Compare numeric values",
              language: "javascript",
              code: "console.log(5 < 3); // false",
            },
            {
              label: "Check a remaining capacity",
              language: "javascript",
              code: "const count = 2;\nconsole.log(count < 5); // true",
            },
          ],
        },
        {
          name: "<=",
          explanation:
            "Checks whether the left value is less than or equal to the right.",
          note: "As with other relational operators, invalid numeric conversions can yield false rather than a useful ordering.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Less_than_or_equal",
          examples: [
            {
              label: "Include the upper boundary",
              language: "javascript",
              code: "console.log(5 <= 5); // true",
            },
            {
              label: "Reject a value above the limit",
              language: "javascript",
              code: "console.log(6 <= 5); // false",
            },
          ],
        },
        {
          name: "String comparison",
          explanation:
            "Compares strings by UTF-16 values, rather than language-specific sorting rules.",
          note: "This is not locale-aware dictionary sorting or numeric-text comparison. Convert numeric text explicitly when numeric ordering is intended.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Less_than",
          examples: [
            {
              label: "Compare simple alphabetic strings",
              language: "javascript",
              code: 'console.log("a" < "b", "apple" < "banana"); // true, true',
            },
            {
              label: "Distinguish text order from numeric order",
              language: "javascript",
              code: 'console.log("2" < "10"); // false\nconsole.log(Number("2") < Number("10")); // true',
            },
          ],
        },
        {
          name: "&& (logical AND)",
          explanation:
            "Returns the first falsy value, or the final value if none is falsy.",
          note: "It short-circuits rather than evaluating every operand, and its result need not be a boolean.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND",
          examples: [
            {
              label: "Combine boolean values",
              language: "javascript",
              code: "console.log(true && true, true && false, false && false); // true, false, false",
            },
            {
              label: "Return an operand rather than a boolean",
              language: "javascript",
              code: 'console.log("ready" && "go", 0 && "ignored"); // "go", 0',
            },
          ],
        },
        {
          name: "|| (logical OR)",
          explanation:
            "Returns the first truthy value, or the final value if none is truthy.",
          note: "Values such as 0, false, and an empty string trigger the fallback. Use ?? when only null and undefined should do so.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR",
          examples: [
            {
              label: "Combine boolean values",
              language: "javascript",
              code: "console.log(true || true, true || false, false || false); // true, true, false",
            },
            {
              label: "Choose an ordinary falsy fallback",
              language: "javascript",
              code: 'console.log(null || "default", 0 || "default"); // "default", "default"',
            },
          ],
        },
        {
          name: "! (logical NOT)",
          explanation: "Converts a value to a boolean and reverses it.",
          note: "Applying it twice produces a primitive boolean rather than restoring the original operand value.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT",
          examples: [
            {
              label: "Invert boolean values",
              language: "javascript",
              code: "console.log(!true, !false); // false, true",
            },
            {
              label: "Normalize a value with double negation",
              language: "javascript",
              code: 'const value = "hello";\nconsole.log(!!value, !!0); // true, false',
            },
          ],
        },
        {
          name: "Short-circuit evaluation",
          explanation:
            "Skips the right side of a logical expression when it is not needed.",
          note: "These expressions can return nonboolean operands. An AND property guard can return the falsy base itself, not necessarily undefined; define every referenced name before using it.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND",
          examples: [
            {
              label: "Choose the first truthy fallback in a chain",
              language: "javascript",
              code: 'const value1 = null;\nconst value2 = "";\nconst result = value1 || value2 || "default";\nconsole.log(result); // "default"',
            },
            {
              label: "Guard property access and observe the actual result",
              language: "javascript",
              code: "const object = null;\nconst data = object && object.property;\nconsole.log(data); // null",
            },
            {
              label: "Run functions only when the guard permits",
              language: "javascript",
              code: 'const isValid = true;\nconst hasError = false;\nfunction executeFunction() {\n  console.log("Executed");\n}\nfunction continueExecution() {\n  console.log("Continued");\n}\nisValid && executeFunction();\nhasError || continueExecution();\n// "Executed", then "Continued"',
            },
          ],
        },
        {
          name: "?? (nullish coalescing)",
          explanation:
            "Returns the fallback only when the left value is null or undefined.",
          note: "The right operand is evaluated only when needed. Mixing ?? directly with && or || without parentheses is a syntax error.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing",
          examples: [
            {
              label: "Replace nullish input",
              language: "javascript",
              code: 'console.log(null ?? "default", undefined ?? "default"); // "default", "default"',
            },
            {
              label: "Preserve falsy values that are not nullish",
              language: "javascript",
              code: 'console.log(0 ?? "default", "" ?? "default", false ?? "default"); // 0, "", false',
            },
          ],
        },
        {
          name: "?: (ternary conditional)",
          explanation: "Chooses one of two values based on a condition.",
          note: "Only the selected branch is evaluated. Keep complex branching readable instead of packing unrelated side effects into the expression.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator",
          examples: [
            {
              label: "Choose an age category",
              language: "javascript",
              code: 'const age = 18;\nconst status = age >= 18 ? "adult" : "minor";\nconsole.log(status); // "adult"',
            },
            {
              label: "Choose the alternate text",
              language: "javascript",
              code: 'const condition = false;\nconst result = condition ? "yes" : "no";\nconsole.log(result); // "no"',
            },
          ],
        },
        {
          name: "Nested ternary",
          explanation:
            "Chains conditional expressions to select among several values.",
          note: "Conditional expressions associate right to left. Keep alternatives short and on separate lines; use a clearer branching structure when nesting becomes hard to scan.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator",
          examples: [
            {
              label: "Choose a grade with ordered thresholds",
              language: "javascript",
              code: 'const score = 85;\nconst grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";\nconsole.log(grade); // "B"',
            },
            {
              label: "Include the lower threshold exactly",
              language: "javascript",
              code: 'const score = 70;\nconst grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";\nconsole.log(grade); // "C"',
            },
          ],
        },
        {
          name: "?. (optional property access)",
          explanation:
            "Returns undefined instead of accessing a property when the guarded base is null or undefined.",
          note: "The base identifier must still be declared. Short-circuiting follows one continuous chain; grouping or an unguarded later operation can reintroduce an error. It is not an assignment target.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining",
          examples: [
            {
              label: "Read an optional address and an existing name length",
              language: "javascript",
              code: 'const user = { name: "John" };\nconsole.log(user?.address?.city); // undefined\nconsole.log(user?.name?.length); // 4',
            },
            {
              label: "Guard an explicitly missing base",
              language: "javascript",
              code: "const object = null;\nconsole.log(object?.property?.nested); // undefined",
            },
          ],
        },
        {
          name: "?.() (optional call)",
          explanation: "Calls a function unless it is null or undefined.",
          note: "A present nonfunction value still throws TypeError when called. Use object?.method?.() if the object itself can also be missing; a method call through its object keeps its receiver.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining",
          examples: [
            {
              label: "Call an existing method with its receiver",
              language: "javascript",
              code: 'const object = {\n  prefix: "Hello",\n  method() {\n    return this.prefix;\n  },\n};\nconsole.log(object.method?.()); // "Hello"',
            },
            {
              label: "Skip a missing method and callback",
              language: "javascript",
              code: "const object = {};\nconst callback = undefined;\nconsole.log(object.method?.(), callback?.()); // undefined, undefined",
            },
          ],
        },
        {
          name: "?.[] (optional bracket access)",
          explanation:
            "Reads a property or array item unless the object is null or undefined.",
          note: "When the base short-circuits, the bracket expression is not evaluated. Ordinary out-of-range array access still returns undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining",
          examples: [
            {
              label: "Read an item from an optional array",
              language: "javascript",
              code: "const array = [10, 20];\nconst index = 1;\nconsole.log(array?.[index]); // 20",
            },
            {
              label: "Observe that a missing base skips the index expression",
              language: "javascript",
              code: "const array = null;\nlet index = 0;\nconsole.log(array?.[index++]); // undefined\nconsole.log(index); // 0",
            },
          ],
        },
        {
          name: "Combining ?. with ??",
          explanation:
            "Reads optional data and uses a default when the result is null or undefined.",
          note: "Optional chaining guards property access; coalescing selects the default. An empty string remains an empty string.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing",
          examples: [
            {
              label: "Default a missing city",
              language: "javascript",
              code: 'const user = { name: "John" };\nconst city = user?.address?.city ?? "Unknown";\nconsole.log(city); // "Unknown"',
            },
            {
              label: "Keep an intentionally empty city value",
              language: "javascript",
              code: 'const user = { address: { city: "" } };\nconsole.log(user?.address?.city ?? "Unknown"); // ""',
            },
          ],
        },
        {
          name: "... (array spread)",
          explanation: "Expands iterable elements into a new array literal.",
          note: "Spread is syntax rather than a standalone operator. Copies are shallow: nested objects retain their identities, and array spread requires an iterable value.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax",
          examples: [
            {
              label: "Combine two arrays into one",
              language: "javascript",
              code: "const first = [1, 2, 3];\nconst second = [4, 5];\nconst combined = [...first, ...second];\nconsole.log(...combined); // 1, 2, 3, 4, 5",
            },
            {
              label: "Observe the shallow copy of nested objects",
              language: "javascript",
              code: "const original = [{ value: 1 }];\nconst copy = [...original];\ncopy[0].value = 2;\nconsole.log(copy === original, original[0].value); // false, 2",
            },
          ],
        },
        {
          name: "... (object spread)",
          explanation:
            "Copies own enumerable properties into a new object literal.",
          note: "Later properties replace earlier values for matching keys. The copy is shallow and does not preserve the original prototype or nonenumerable properties.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax",
          examples: [
            {
              label: "Extend an existing object",
              language: "javascript",
              code: "const original = { a: 1, b: 2 };\nconst extended = { ...original, c: 3 };\nconsole.log(extended.a, extended.b, extended.c); // 1, 2, 3",
            },
            {
              label: "Override an outer property while sharing a nested object",
              language: "javascript",
              code: "const original = { a: 1, nested: { value: 1 } };\nconst copy = { ...original, a: 10 };\ncopy.nested.value = 2;\nconsole.log(copy.a, original.a, original.nested.value); // 10, 1, 2",
            },
          ],
        },
        {
          name: ", (comma operator)",
          explanation:
            "Runs expressions from left to right and returns the last result.",
          note: "The comma separating declarations or arguments is different syntax, not this operator. Parentheses make a comma expression’s grouping clear.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_operator",
          examples: [
            {
              label: "Return the last expression value",
              language: "javascript",
              code: "const value = (5, 10);\nconsole.log(value); // 10",
            },
            {
              label: "Sequence increments before the returned sum",
              language: "javascript",
              code: "let x = 1,\n  y = 2,\n  z = 3;\nconst result = (x++, y++, x + y);\nconsole.log(result, x, y, z); // 5, 2, 3, 3",
            },
          ],
        },
        {
          name: "void",
          explanation: "Runs an expression and returns undefined.",
          note: "It does not suppress side effects or errors from the evaluated expression. The parentheses in void(0) group an operand; they do not make void a function.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void",
          examples: [
            {
              label: "Produce undefined with either grouping style",
              language: "javascript",
              code: "console.log(void 0, void 0); // undefined, undefined",
            },
            {
              label: "Evaluate a call but discard its returned value",
              language: "javascript",
              code: "let called = false;\nfunction functionCall() {\n  called = true;\n  return 5;\n}\nconst result = void functionCall();\nconsole.log(result, called); // undefined, true",
            },
          ],
        },
        {
          name: "delete",
          explanation: "Removes a configurable object property.",
          note: "It does not delete a lexical variable binding. Deleting an array element leaves a hole and does not shrink length; deleting a nonconfigurable property throws in strict mode.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete",
          examples: [
            {
              label: "Remove an ordinary object property",
              language: "javascript",
              code: "const object = { a: 1, b: 2 };\nconsole.log(delete object.a); // true\nconsole.log(object.a, object.b); // undefined, 2",
            },
            {
              label: "Observe an array hole without a length change",
              language: "javascript",
              code: "const items = [10, 20, 30];\ndelete items[1];\nconsole.log(items.length, 1 in items); // 3, false",
            },
          ],
        },
      ],
    },
    {
      name: "Control Flow",
      id: "control-flow",
      intro:
        "Conditional Statements → Loops, following all four images. Run each example independently in a modern browser console or Node.js; Object.hasOwn examples require ES2022 support. Every condition and input is defined, loops have finite exits, and output is printed. The examples distinguish choosing a branch, exiting a switch or function, iterating values, and enumerating own or inherited property keys.",
      methods: [
        {
          name: "if / else if / else",
          explanation:
            "Runs the first branch whose condition is truthy, or the final else when no earlier test succeeds.",
          note: "An else if is another if nested in the previous else branch. Order overlapping thresholds from most restrictive to least restrictive, and keep braces around multi-statement branches.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else",
          examples: [
            {
              label: "Choose a grade using ordered thresholds",
              language: "javascript",
              code: 'const score = 85;\nif (score >= 90) {\n  console.log("A grade");\n} else if (score >= 80) {\n  console.log("B grade");\n} else if (score >= 70) {\n  console.log("C grade");\n} else {\n  console.log("F grade");\n}\n// "B grade"',
            },
            {
              label: "Exercise the upper, lower, and fallback branches",
              language: "javascript",
              code: 'function grade(score) {\n  if (score >= 90) {\n    return "A";\n  } else if (score >= 80) {\n    return "B";\n  } else if (score >= 70) {\n    return "C";\n  } else {\n    return "F";\n  }\n}\nconsole.log(grade(95), grade(75), grade(50)); // "A", "C", "F"',
            },
          ],
        },
        {
          name: "Single-statement if",
          explanation: "Allows an if body to be one statement without braces.",
          note: "Only the immediately following statement is conditional; indentation does not create a block. Braces usually make later edits safer and clearer.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else",
          examples: [
            {
              label: "Call a defined function when the condition is true",
              language: "javascript",
              code: 'const isValid = true;\nfunction doSomething() {\n  console.log("Executed");\n}\nif (isValid) doSomething();\n// "Executed"',
            },
            {
              label:
                "Skip the conditional call but still run the next statement",
              language: "javascript",
              code: 'const isValid = false;\nfunction doSomething() {\n  console.log("Not reached");\n}\nif (isValid) doSomething();\nconsole.log("Finished"); // "Finished"',
            },
          ],
        },
        {
          name: "switch",
          explanation:
            "Selects a matching case using strict-equality-style comparisons.",
          note: "break exits the switch; without it or another control transfer, execution falls through subsequent statements. default handles no match. Wrap case-local lexical declarations in blocks when separate scopes are needed.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch",
          examples: [
            {
              label: "Dispatch an action with explicit breaks",
              language: "javascript",
              code: 'const action = "UPDATE";\nswitch (action) {\n  case "CREATE":\n    console.log("Creating...");\n    break;\n  case "UPDATE":\n    console.log("Updating...");\n    break;\n  case "DELETE":\n    console.log("Deleting...");\n    break;\n  default:\n    console.log("Unknown action");\n}\n// "Updating..."',
            },
            {
              label: "Observe that a string does not match a numeric case",
              language: "javascript",
              code: 'const value = "1";\nswitch (value) {\n  case 1:\n    console.log("Numeric one");\n    break;\n  default:\n    console.log("Different type");\n}\n// "Different type"',
            },
          ],
        },
        {
          name: "Multiple switch cases",
          explanation: "Groups several case labels before a shared body.",
          note: "Empty cases intentionally fall through into the shared statements; the terminating break prevents execution from continuing into another group.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch",
          examples: [
            {
              label: "Group weekend days",
              language: "javascript",
              code: 'const day = "Sunday";\nswitch (day) {\n  case "Saturday":\n  case "Sunday":\n    console.log("Weekend");\n    break;\n  default:\n    console.log("Not a weekend label");\n}\n// "Weekend"',
            },
            {
              label: "Group all weekday labels explicitly",
              language: "javascript",
              code: 'const day = "Wednesday";\nswitch (day) {\n  case "Monday":\n  case "Tuesday":\n  case "Wednesday":\n  case "Thursday":\n  case "Friday":\n    console.log("Weekday");\n    break;\n  default:\n    console.log("Not a weekday label");\n}\n// "Weekday"',
            },
          ],
        },
        {
          name: "switch with return",
          explanation: "Returns directly from a function’s selected case.",
          note: "return exits the function, so a following break is unnecessary and unreachable. A default return can handle unexpected values rather than assuming they are valid inputs.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch",
          examples: [
            {
              label: "Return a day classification and handle unknown inputs",
              language: "javascript",
              code: 'function getDayType(day) {\n  switch (day) {\n    case "Saturday":\n    case "Sunday":\n      return "Weekend";\n    case "Monday":\n    case "Tuesday":\n    case "Wednesday":\n    case "Thursday":\n    case "Friday":\n      return "Weekday";\n    default:\n      return "Unknown day";\n  }\n}\nconsole.log(getDayType("Sunday"), getDayType("Monday"), getDayType("Holiday"));\n// "Weekend", "Weekday", "Unknown day"',
            },
            {
              label: "Return an action result without breaks",
              language: "javascript",
              code: 'function describeAction(action) {\n  switch (action) {\n    case "CREATE":\n      return "Creating";\n    case "UPDATE":\n      return "Updating";\n    case "DELETE":\n      return "Deleting";\n    default:\n      return "Unknown action";\n  }\n}\nconsole.log(describeAction("UPDATE"), describeAction("OTHER"));\n// "Updating", "Unknown action"',
            },
          ],
        },
        {
          name: "for",
          explanation:
            "Repeats a body with an initialization, a condition checked before each iteration, and an update expression.",
          note: "The update runs after a completed body and after a continue targeting this loop. A let counter is scoped to the loop; ensure the condition can eventually become false.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for",
          examples: [
            {
              label: "Count from zero through four",
              language: "javascript",
              code: "for (let i = 0; i < 5; i++) {\n  console.log(i);\n}\n// 0, 1, 2, 3, 4",
            },
            {
              label: "Accumulate a finite numeric sequence",
              language: "javascript",
              code: "let total = 0;\nfor (let i = 1; i <= 3; i++) {\n  total += i;\n}\nconsole.log(total); // 6",
            },
          ],
        },
        {
          name: "while",
          explanation:
            "Repeats a body while its condition remains truthy, checking before each iteration.",
          note: "The body may never execute. Update the state or provide another valid exit so the loop can terminate.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while",
          examples: [
            {
              label: "Advance a counter until the condition becomes false",
              language: "javascript",
              code: "let count = 0;\nwhile (count < 3) {\n  console.log(count);\n  count++;\n}\n// 0, 1, 2",
            },
            {
              label: "Skip the body when the first test is false",
              language: "javascript",
              code: 'let count = 0;\nwhile (count < 0) {\n  console.log("Not reached");\n}\nconsole.log("After loop"); // "After loop"',
            },
          ],
        },
        {
          name: "do...while",
          explanation: "Executes the body before testing whether to repeat it.",
          note: "The condition is checked after each iteration, so even an initially false condition permits the first body execution. Keep the trailing semicolon.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while",
          examples: [
            {
              label: "Run once even though repeating is not allowed",
              language: "javascript",
              code: "let count = 0;\ndo {\n  console.log(count); // 0\n  count++;\n} while (count < 0);\nconsole.log(count); // 1",
            },
            {
              label: "Count down with an after-body check",
              language: "javascript",
              code: "let remaining = 2;\ndo {\n  console.log(remaining);\n  remaining--;\n} while (remaining > 0);\n// 2, 1",
            },
          ],
        },
        {
          name: "for...of",
          explanation: "Iterates values supplied by an iterable.",
          note: "A plain object is not iterable by default. Strings iterate Unicode code points rather than user-perceived grapheme clusters; Map entries can be destructured into key/value pairs.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of",
          examples: [
            {
              label: "Read array values",
              language: "javascript",
              code: 'const colors = ["red", "green", "blue"];\nfor (const color of colors) {\n  console.log(color);\n}\n// "red", "green", "blue"',
            },
            {
              label: "Read string values",
              language: "javascript",
              code: 'for (const char of "hello") {\n  console.log(char);\n}\n// "h", "e", "l", "l", "o"',
            },
            {
              label: "Read Map entries and unique Set values",
              language: "javascript",
              code: 'const entries = new Map([\n  ["a", 1],\n  ["b", 2],\n]);\nfor (const [key, value] of entries) {\n  console.log(key, value);\n}\n// "a", 1; then "b", 2\nfor (const color of new Set(["red", "red", "blue"])) {\n  console.log(color);\n}\n// "red", "blue"',
            },
          ],
        },
        {
          name: "for...in",
          explanation:
            "Iterates enumerable string property names, including inherited ones.",
          note: "Symbols and nonenumerable properties are excluded. Array indices are string keys in this loop; extra or inherited enumerable properties can appear too. Filter with Object.hasOwn when only own properties belong in the result.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in",
          examples: [
            {
              label: "Read keys and values from a simple object",
              language: "javascript",
              code: 'const user = { name: "Alice", age: 30, role: "admin" };\nfor (const key in user) {\n  console.log(key, user[key]);\n}\n// "name", "Alice"; "age", 30; "role", "admin"',
            },
            {
              label: "Observe an inherited enumerable property",
              language: "javascript",
              code: 'const user = Object.create({ role: "reader" });\nuser.name = "Bob";\nfor (const key in user) {\n  console.log(key, user[key]);\n}\n// "name", "Bob"; then inherited "role", "reader"',
            },
          ],
        },
        {
          name: "Object.hasOwn() in a loop",
          explanation:
            "Checks whether a property belongs directly to an object.",
          note: "Object.hasOwn is available in ES2022-capable environments. It also works for objects with a null prototype or an overridden hasOwnProperty method.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn",
          examples: [
            {
              label: "Filter inherited keys from an enumeration",
              language: "javascript",
              code: 'const user = Object.create({ role: "reader" });\nuser.name = "Alice";\nfor (const key in user) {\n  if (Object.hasOwn(user, key)) {\n    console.log(key, user[key]);\n  }\n}\n// "name", "Alice"',
            },
            {
              label: "Filter safely on a null-prototype object",
              language: "javascript",
              code: 'const record = Object.create(null);\nrecord.name = "Alice";\nfor (const key in record) {\n  if (Object.hasOwn(record, key)) {\n    console.log(key, record[key]);\n  }\n}\n// "name", "Alice"',
            },
          ],
        },
        {
          name: "break",
          explanation:
            "Exits the nearest applicable loop or switch when used without a label.",
          note: "In nested loops an unlabeled break exits only the innermost loop. It differs from return, which exits the enclosing function.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break",
          examples: [
            {
              label: "Stop before processing a sentinel counter value",
              language: "javascript",
              code: "for (let i = 0; i < 6; i++) {\n  if (i === 3) break;\n  console.log(i);\n}\n// 0, 1, 2",
            },
            {
              label: "Stop reading values when the sentinel appears",
              language: "javascript",
              code: 'for (const value of ["first", "STOP", "last"]) {\n  if (value === "STOP") break;\n  console.log(value);\n}\n// "first"',
            },
          ],
        },
        {
          name: "continue",
          explanation:
            "Skips the remainder of the current loop iteration and proceeds to the next iteration’s control step.",
          note: "In a for loop it proceeds through the update expression; in while loops, make sure skipped work does not also skip a necessary state update. continue targets loops, not a standalone switch.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue",
          examples: [
            {
              label: "Skip three and stop at seven, as in the image",
              language: "javascript",
              code: "for (let i = 0; i < 10; i++) {\n  if (i === 3) continue;\n  if (i === 7) break;\n  console.log(i);\n}\n// 0, 1, 2, 4, 5, 6",
            },
            {
              label: "Skip a deliberately unwanted iterable value",
              language: "javascript",
              code: "for (const value of [1, 0, 2]) {\n  if (value === 0) continue;\n  console.log(value);\n}\n// 1, 2",
            },
          ],
        },
        {
          name: "for...of vs for...in",
          explanation:
            "for...of consumes iterable values; for...in enumerates property names.",
          note: "They do not traverse the same abstraction. for...in is not an array-value loop and can include extra enumerable properties.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of",
          examples: [
            {
              label: "Compare values with index keys",
              language: "javascript",
              code: 'const array = ["a", "b", "c"];\nfor (const value of array) console.log(value);\n// "a", "b", "c"\nfor (const index in array) console.log(index);\n// "0", "1", "2"',
            },
            {
              label: "Observe an extra array property appearing only as a key",
              language: "javascript",
              code: 'const array = ["a", "b"];\narray.extra = "metadata";\nfor (const value of array) console.log(value);\n// "a", "b"\nfor (const key in array) console.log(key);\n// "0", "1", "extra"',
            },
          ],
        },
      ],
    },
    {
      name: "Functions",
      id: "functions",
      intro:
        "Function Declarations, Expressions & Arrows → Parameters & Arguments → Scope & Closures, following all six images. Run each snippet independently. Most work in modern Node.js or a browser console; the DOM listener and classic-script file examples explicitly require a browser, and scope.mjs requires module execution. The UUID example uses a real supported crypto.randomUUID implementation. Timers are finite and print asynchronously. Separate examples avoid the duplicate greet declarations shown together in the reference images.",
      methods: [
        {
          name: "Function declaration",
          explanation:
            "Defines a named function that can be called before its declaration.",
          note: "The hoisting example uses a declaration directly inside its enclosing function/script scope. Block-level function behavior in legacy sloppy scripts has additional rules, so avoid using that as a general hoisting model.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function",
          examples: [
            {
              label: "Call before the declaration’s textual location",
              language: "javascript",
              code: 'console.log(greet("Alice")); // "Hello Alice"\nfunction greet(name) {\n  return "Hello " + name;\n}',
            },
            {
              label: "Define and call a reusable arithmetic operation",
              language: "javascript",
              code: "function add(a, b) {\n  return a + b;\n}\nconsole.log(add(2, 3)); // 5",
            },
          ],
        },
        {
          name: "Function expression",
          explanation:
            "Creates a function as an expression and stores it in a variable or passes it as a value.",
          note: "The function value is created when the expression executes. A const/let binding is in its temporal dead zone before initialization; a var binding would instead initially contain undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function",
          examples: [
            {
              label: "Assign and call an anonymous function expression",
              language: "javascript",
              code: 'const greet = function (name) {\n  return "Hello " + name;\n};\nconsole.log(greet("John")); // "Hello John"',
            },
            {
              label:
                "Observe the const binding’s pre-initialization error safely",
              language: "javascript",
              code: 'try {\n  greet("Alice");\n} catch (error) {\n  console.log(error.name); // "ReferenceError"\n}\nconst greet = function (name) {\n  return "Hello " + name;\n};\nconsole.log(greet("Alice")); // "Hello Alice"',
            },
          ],
        },
        {
          name: "Named function expression",
          explanation: "Gives a function expression its own internal name.",
          note: "The expression’s internal name is available inside that function, not as a surrounding-scope declaration. The factorial example assumes a small nonnegative integer input.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function",
          examples: [
            {
              label: "Recurse through the function’s internal name",
              language: "javascript",
              code: "const factorial = function fact(n) {\n  return n <= 1 ? 1 : n * fact(n - 1);\n};\nconsole.log(factorial(5), factorial(0)); // 120, 1",
            },
            {
              label: "Use a named expression for a finite countdown",
              language: "javascript",
              code: "const countdown = function step(n) {\n  if (n <= 0) return;\n  console.log(n);\n  step(n - 1);\n};\ncountdown(3); // 3, 2, 1",
            },
          ],
        },
        {
          name: "Arrow function",
          explanation:
            "Defines a short function that keeps this from the surrounding code.",
          note: "An expression body implicitly returns its value. One simple parameter can omit parentheses; no parameters require (). Arrows have no own arguments binding and cannot be used as constructors.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions",
          examples: [
            {
              label: "Return the result of a two-parameter expression",
              language: "javascript",
              code: "const add = (a, b) => a + b;\nconsole.log(add(2, 3)); // 5",
            },
            {
              label: "Use one simple parameter without parentheses",
              language: "javascript",
              code: "const square = (x) => x * x;\nconsole.log(square(5)); // 25",
            },
            {
              label: "Declare a no-parameter arrow",
              language: "javascript",
              code: 'const log = () => console.log("hello");\nlog(); // "hello"',
            },
          ],
        },
        {
          name: "Arrow block body and explicit return",
          explanation:
            "Uses a statement block for a multi-step arrow function.",
          note: "A block body without return produces undefined; a concise object-literal result instead needs parentheses. The UUID example requires crypto.randomUUID: modern Node.js or a supported secure browser context such as HTTPS/localhost.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions",
          examples: [
            {
              label: "Return a computed value from a block body",
              language: "javascript",
              code: "const totalWithFee = (price, fee) => {\n  const total = price + fee;\n  return total;\n};\nconsole.log(totalWithFee(10, 2)); // 12",
            },
            {
              label: "Build a user with an actual generated UUID",
              language: "javascript",
              code: 'const createUser = (name, age) => {\n  const id = crypto.randomUUID();\n  return { id, name, age };\n};\nconst user = createUser("John", 30);\nconsole.log(user.name, user.age, typeof user.id, user.id.length);\n// "John", 30, "string", 36; the UUID value varies.',
            },
          ],
        },
        {
          name: "Arrow lexical this",
          explanation:
            "Keeps the surrounding this value inside an arrow function.",
          note: "An arrow does not get a new this from the callback host or from call/apply. A regular timer callback has host-dependent this behavior, not universally window. The interval below stops itself after three ticks and measures callback counts rather than elapsed seconds.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions",
          examples: [
            {
              label: "Keep the method receiver in a self-stopping timer",
              language: "javascript",
              code: "const timer = {\n  ticks: 0,\n  start() {\n    const id = setInterval(() => {\n      this.ticks++;\n      console.log(this.ticks);\n      if (this.ticks === 3) clearInterval(id);\n    }, 10);\n  },\n};\ntimer.start(); // asynchronously: 1, 2, 3, then stops",
            },
            {
              label:
                "Keep an enclosing receiver after detaching the returned arrow",
              language: "javascript",
              code: 'const owner = {\n  value: "captured",\n  makeReader() {\n    return () => this.value;\n  },\n};\nconst read = owner.makeReader();\nconsole.log(read()); // "captured"',
            },
          ],
        },
        {
          name: "Ordinary object methods when this is needed",
          explanation:
            "Uses an ordinary method to receive this from its call site.",
          note: "Object-literal braces do not create a this binding for an arrow. An ordinary method can also be detached, in which case the receiver must be supplied deliberately.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions",
          examples: [
            {
              label: "Update the receiving object’s state",
              language: "javascript",
              code: "const counter = {\n  count: 0,\n  increment() {\n    return ++this.count;\n  },\n};\nconsole.log(counter.increment(), counter.count); // 1, 1",
            },
            {
              label: "Supply a receiver explicitly for a detached method",
              language: "javascript",
              code: 'const reader = {\n  read() {\n    return this.label;\n  },\n};\nconst read = reader.read;\nconsole.log(read.call({ label: "explicit receiver" })); // "explicit receiver"',
            },
          ],
        },
        {
          name: "Constructor functions and arrows",
          explanation:
            "Uses a constructible ordinary function when creating instances with new.",
          note: "Not every callable function form is constructible; this entry compares an ordinary function constructor with an arrow. A failed new call on an arrow throws TypeError.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions",
          examples: [
            {
              label: "Create an instance with a regular function constructor",
              language: "javascript",
              code: 'function User(name) {\n  this.name = name;\n}\nconst user = new User("Alice");\nconsole.log(user.name, user instanceof User); // "Alice", true',
            },
            {
              label: "Observe an arrow rejecting constructor invocation",
              language: "javascript",
              code: 'const User = (name) => ({ name });\ntry {\n  new User("Alice");\n} catch (error) {\n  console.log(error.name); // "TypeError"\n}',
            },
          ],
        },
        {
          name: "Event handlers when this should be the element",
          explanation:
            "Uses an ordinary event listener when you want its this to be the event’s currentTarget.",
          note: "Browser DOM examples: run in a page console. Each creates a detached button, dispatches one click, and does not add visible UI. An arrow’s this remains lexical; event.currentTarget is the explicit alternative.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener",
          examples: [
            {
              label:
                "Receive the clicked element as an ordinary listener’s this",
              language: "javascript",
              code: 'const button = document.createElement("button");\nbutton.addEventListener("click", function (event) {\n  console.log(this === button, event.currentTarget === button);\n});\nbutton.click(); // true, true',
            },
            {
              label: "Use an explicit currentTarget inside an arrow listener",
              language: "javascript",
              code: 'const button = document.createElement("button");\nbutton.addEventListener("click", (event) => {\n  console.log(event.currentTarget === button);\n});\nbutton.click(); // true',
            },
          ],
        },
        {
          name: "IIFE",
          explanation:
            "Creates a function expression and calls it immediately.",
          note: "The leading semicolon avoids accidentally continuing a preceding expression when snippets are concatenated. Both ordinary and arrow expressions can be invoked immediately.",
          source: "https://developer.mozilla.org/en-US/docs/Glossary/IIFE",
          examples: [
            {
              label: "Invoke an ordinary function expression immediately",
              language: "javascript",
              code: '(function () {\n  const message = "runs immediately";\n  console.log(message);\n})();\n// "runs immediately"',
            },
            {
              label: "Invoke an arrow expression immediately",
              language: "javascript",
              code: '(() => console.log("arrow IIFE"))();\n// "arrow IIFE"',
            },
          ],
        },
        {
          name: "Default parameters",
          explanation:
            "Supplies a parameter value when the corresponding argument is omitted or undefined.",
          note: "Passing null does not select the default. Parameter initializers are evaluated when needed for each call, not just once when the function is defined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters",
          examples: [
            {
              label: "Use defaults and supplied values",
              language: "javascript",
              code: 'function greet(name = "Guest", greeting = "Hello") {\n  return `${greeting}, ${name}!`;\n}\nconsole.log(greet(), greet("John"), greet("John", "Hi"));\n// "Hello, Guest!", "Hello, John!", "Hi, John!"',
            },
            {
              label: "Distinguish undefined from null",
              language: "javascript",
              code: 'function greet(name = "Guest") {\n  return `Hello, ${name}`;\n}\nconsole.log(greet(undefined), greet(null)); // "Hello, Guest", "Hello, null"',
            },
          ],
        },
        {
          name: "Rest parameters",
          explanation: "Collects remaining arguments into a real array.",
          note: "The rest parameter must be last. Providing an initial accumulator to reduce makes an empty argument list work rather than throwing.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters",
          examples: [
            {
              label: "Sum any number of supplied values, including none",
              language: "javascript",
              code: "function sum(...numbers) {\n  return numbers.reduce((total, number) => total + number, 0);\n}\nconsole.log(sum(1, 2, 3, 4), sum(5), sum()); // 10, 5, 0",
            },
            {
              label: "Inspect the collected array and its size",
              language: "javascript",
              code: 'function inspect(...items) {\n  console.log(Array.isArray(items), items.length);\n}\ninspect("a", "b"); // true, 2\ninspect(); // true, 0',
            },
          ],
        },
        {
          name: "Mix regular and rest parameters",
          explanation:
            "Assigns leading arguments to named parameters and gathers later arguments into a final rest array.",
          note: "Rest collects only the remaining positions; it is not the full arguments object. Missing extras produce an empty array.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters",
          examples: [
            {
              label: "Gather nicknames after a first and last name",
              language: "javascript",
              code: 'function introduce(first, last, ...nicknames) {\n  console.log(`Name: ${first} ${last}`);\n  console.log(`Nicknames: ${nicknames.join(", ")}`);\n}\nintroduce("John", "Doe", "Johnny", "JD");\n// "Name: John Doe", then "Nicknames: Johnny, JD"',
            },
            {
              label: "Handle an empty rest list",
              language: "javascript",
              code: 'function countExtras(first, ...extras) {\n  return `${first}: ${extras.length}`;\n}\nconsole.log(countExtras("Alice")); // "Alice: 0"',
            },
          ],
        },
        {
          name: "Spread arguments",
          explanation: "Expands iterable values into separate call arguments.",
          note: "Rest gathers at the parameter declaration, while spread expands at the call site. Very large argument lists can exceed an engine’s call-argument limit.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax",
          examples: [
            {
              label: "Pass an array to a numeric function",
              language: "javascript",
              code: "const numbers = [1, 2, 3];\nconsole.log(Math.max(...numbers)); // 3",
            },
            {
              label: "Apply array entries to named parameters in order",
              language: "javascript",
              code: 'function greet(name, greeting = "Hello") {\n  return `${greeting}, ${name}!`;\n}\nconst args = ["John", "Hi"];\nconsole.log(greet(...args)); // "Hi, John!"',
            },
          ],
        },
        {
          name: "Object-destructuring parameters",
          explanation:
            "Extracts selected object properties into parameter variables.",
          note: "A property default applies when that property is missing or undefined, not null. A default for the entire parameter can separately allow an omitted argument; destructuring null still fails.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring",
          examples: [
            {
              label: "Extract required fields with a defaulted email",
              language: "javascript",
              code: 'function createUser({ name, age, email = "none" }) {\n  return { name, age, email };\n}\nconst user = createUser({ name: "John", age: 30 });\nconsole.log(user.name, user.age, user.email); // "John", 30, "none"',
            },
            {
              label: "Default the complete options parameter as well",
              language: "javascript",
              code: 'function describe({ name = "Guest" } = {}) {\n  return name;\n}\nconsole.log(describe(), describe({ name: "Alice" })); // "Guest", "Alice"',
            },
          ],
        },
        {
          name: "Array-destructuring parameters",
          explanation:
            "Extracts iterable positions directly into parameter variables.",
          note: "Positions, not property names, determine the bindings. The argument must be iterable; defaults can handle a missing item within a valid iterable.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring",
          examples: [
            {
              label: "Extract coordinates from an array",
              language: "javascript",
              code: "function getCoords([x, y]) {\n  return { x, y };\n}\nconst point = getCoords([10, 20]);\nconsole.log(point.x, point.y); // 10, 20",
            },
            {
              label: "Default a missing second coordinate",
              language: "javascript",
              code: "function getCoords([x, y = 0]) {\n  return { x, y };\n}\nconst point = getCoords([10]);\nconsole.log(point.x, point.y); // 10, 0",
            },
          ],
        },
        {
          name: "arguments object",
          explanation:
            "Provides an ordinary function’s array-like view of its passed arguments.",
          note: "It is not an Array. Arrows have no own arguments object but can read one lexically from an enclosing ordinary function; parameter-aliasing behavior also differs between strict and some legacy sloppy functions.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments",
          examples: [
            {
              label: "Inspect the array-like argument list",
              language: "javascript",
              code: 'function oldStyle() {\n  console.log(arguments.length, arguments[0], Array.isArray(arguments));\n}\noldStyle("first", "second"); // 2, "first", false',
            },
            {
              label: "Read enclosing arguments from an arrow",
              language: "javascript",
              code: 'function outer(first) {\n  const readFirst = () => arguments[0];\n  return readFirst();\n}\nconsole.log(outer("captured")); // "captured"',
            },
          ],
        },
        {
          name: "Global scope vs module scope",
          explanation:
            "Makes outermost variables available according to the script’s execution environment.",
          note: "Run the first file as its own browser document and the second as an ES module with node scope.mjs. In a classic script, top-level var creates a global-object property while top-level let/const are global lexical bindings; module bindings are not global-object properties. These examples intentionally run at their file’s top level.",
          source:
            "https://developer.mozilla.org/en-US/docs/Glossary/Global_scope",
          examples: [
            {
              label:
                "Browser classic script — global bindings and global-object properties",
              files: [
                {
                  path: "scope.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Classic script scope example</title>\n<script>\n  var jsGeneralGlobalVar = "global";\n  let jsGeneralGlobalLet = "also global";\n  const jsGeneralGlobalConst = "global constant";\n  function readShared() {\n    console.log(jsGeneralGlobalVar, jsGeneralGlobalLet, jsGeneralGlobalConst);\n  }\n  readShared(); // "global", "also global", "global constant"\n  console.log(globalThis.jsGeneralGlobalVar === jsGeneralGlobalVar); // true\n  console.log(Object.hasOwn(globalThis, "jsGeneralGlobalLet")); // false\n</script>',
                },
              ],
            },
            {
              label: "ES module — keep top-level bindings module-local",
              files: [
                {
                  path: "scope.mjs",
                  language: "javascript",
                  code: 'const moduleLocal = "module-local";\nfunction readLocal() {\n  return moduleLocal;\n}\nconsole.log(readLocal()); // "module-local"\nconsole.log(Object.hasOwn(globalThis, "moduleLocal")); // false',
                },
              ],
            },
          ],
        },
        {
          name: "Function scope and lexical access",
          explanation:
            "Makes function-local variables available inside that function and nested functions.",
          note: "An outer function cannot directly read a binding declared only inside its nested function. Lexical scope follows where functions are defined, not simply which function calls them.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures",
          examples: [
            {
              label: "Read outer state from a nested function",
              language: "javascript",
              code: 'const shared = "shared";\nfunction outerFunction() {\n  const outerVariable = "outer";\n  function innerFunction() {\n    const innerVariable = "inner";\n    console.log(outerVariable, shared, innerVariable);\n  }\n  innerFunction();\n}\nouterFunction(); // "outer", "shared", "inner"',
            },
            {
              label: "Observe that an inner binding is not visible outside",
              language: "javascript",
              code: 'function outer() {\n  function inner() {\n    const innerOnly = "private";\n    return innerOnly;\n  }\n  console.log(inner()); // "private"\n  try {\n    console.log(innerOnly);\n  } catch (error) {\n    console.log(error.name); // "ReferenceError"\n  }\n}\nouter();',
            },
          ],
        },
        {
          name: "Block scope in functions",
          explanation:
            "Keeps let and const inside an ordinary block while var belongs to the surrounding function.",
          note: "The examples use enclosing functions so they do not depend on top-level browser or module behavior. A block can also shadow an outer name without replacing it.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block",
          examples: [
            {
              label:
                "Keep lexical bindings inside a block and var in the function",
              language: "javascript",
              code: 'function scopeExample() {\n  if (true) {\n    let blockScoped = "inside block";\n    const alsoBlockScoped = "const block";\n    var functionScoped = "visible outside";\n    console.log(blockScoped, alsoBlockScoped);\n  }\n  console.log(functionScoped);\n}\nscopeExample(); // "inside block", "const block"; then "visible outside"',
            },
            {
              label: "Shadow an outer value only inside the block",
              language: "javascript",
              code: 'function showScope() {\n  let value = "outer";\n  {\n    const value = "inner";\n    console.log(value);\n  }\n  console.log(value);\n}\nshowScope(); // "inner", then "outer"',
            },
          ],
        },
        {
          name: "Closure",
          explanation:
            "Lets a function keep using variables from the code where it was created.",
          note: "A closure captures access to bindings, not a frozen snapshot of their values. Separate factory calls can create separate state.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures",
          examples: [
            {
              label: "Retain a counter through an arrow closure",
              language: "javascript",
              code: "function counter() {\n  let count = 0;\n  return () => ++count;\n}\nconst next = counter();\nconsole.log(next(), next(), next()); // 1, 2, 3",
            },
            {
              label: "Keep two ordinary-function closures independent",
              language: "javascript",
              code: "function createCounter() {\n  let count = 0;\n  return function () {\n    count++;\n    return count;\n  };\n}\nconst first = createCounter();\nconst second = createCounter();\nconsole.log(first(), first(), second()); // 1, 2, 1",
            },
          ],
        },
        {
          name: "Closure with parameters",
          explanation:
            "Lets a returned function keep using its parent function’s arguments.",
          note: "Each factory invocation gets its own parameter environment; returning from the factory does not remove the returned function’s access to it.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures",
          examples: [
            {
              label: "Create multiplication functions with captured factors",
              language: "javascript",
              code: "function multiplier(factor) {\n  return function (number) {\n    return number * factor;\n  };\n}\nconst double = multiplier(2);\nconst triple = multiplier(3);\nconsole.log(double(5), triple(5)); // 10, 15",
            },
            {
              label: "Create a greeting with a captured prefix",
              language: "javascript",
              code: 'function makeGreeting(prefix) {\n  return (name) => `${prefix}, ${name}!`;\n}\nconst greet = makeGreeting("Welcome");\nconsole.log(greet("Alice")); // "Welcome, Alice!"',
            },
          ],
        },
        {
          name: "Loop closures: var vs let",
          explanation:
            "Controls whether deferred callbacks share one loop variable or capture separate per-iteration variables.",
          note: "All callbacks here run after the synchronous loop finishes. var uses one shared binding, while the let loop creates the per-iteration bindings needed for 0, 1, 2. The timeout examples schedule three callbacks and then finish; delay timing is host-dependent.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures",
          examples: [
            {
              label: "Observe the shared var binding in deferred callbacks",
              language: "javascript",
              code: "for (var i = 0; i < 3; i++) {\n  setTimeout(function () {\n    console.log(i);\n  }, 10);\n}\n// asynchronously: 3, 3, 3",
            },
            {
              label: "Capture each iteration value with let",
              language: "javascript",
              code: "for (let i = 0; i < 3; i++) {\n  setTimeout(function () {\n    console.log(i);\n  }, 10);\n}\n// asynchronously: 0, 1, 2",
            },
          ],
        },
      ],
    },
    {
      name: "Hoisting & Strict Mode",
      id: "hoisting-strict-mode",
      intro:
        "Hoisting → Strict Mode, following all four images. Run snippets independently. Error examples catch runtime failures or compile fixed invalid source inside try/catch so the snippet remains runnable; Function/eval demonstrations should not receive external input. Hoisting describes binding creation and initialization, not literal source movement: var starts as undefined, while lexical declarations remain in the temporal dead zone until initialized. Strictness examples contain their own directive or explicitly use an ES module.",
      methods: [
        {
          name: "Function declaration hoisting",
          explanation:
            "Allows a function declaration to be called before its position in the code.",
          note: "Hoisting describes observable binding behavior, not literal source-code movement. These declarations are directly in their script or function scope, avoiding legacy sloppy-script block-function complications.",
          source: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting",
          examples: [
            {
              label: "Call a declaration before its written position",
              language: "javascript",
              code: 'greet();\nfunction greet() {\n  console.log("Hello");\n}\n// "Hello"',
            },
            {
              label: "Pass an argument before the declaration appears",
              language: "javascript",
              code: 'greet("John");\nfunction greet(name) {\n  console.log(`Hello, ${name}`);\n}\n// "Hello, John"',
            },
          ],
        },
        {
          name: "var hoisting",
          explanation:
            "Creates the function/script var variable and initializes it to undefined before ordinary execution.",
          note: "The initializer expression does not run early. Saying var initialization is not hoisted can be misleading: the binding’s undefined initialization is early, while its explicit assignment remains in execution order.",
          source: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting",
          examples: [
            {
              label: "Read before and after the explicit assignment",
              language: "javascript",
              code: "console.log(myVar); // undefined\nvar myVar = 5;\nconsole.log(myVar); // 5",
            },
            {
              label:
                "Show the separate declaration-and-assignment mental model",
              language: "javascript",
              code: "var myVar;\nconsole.log(myVar); // undefined\nmyVar = 5;\nconsole.log(myVar); // 5",
            },
          ],
        },
        {
          name: "let temporal dead zone",
          explanation:
            "Prevents reading a let variable before its declaration runs.",
          note: "The temporal dead zone begins when the scope is entered. After a let declaration with no initializer executes, the value becomes undefined.",
          source: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting",
          examples: [
            {
              label: "Catch the early read, then use the initialized value",
              language: "javascript",
              code: 'try {\n  console.log(value);\n} catch (error) {\n  console.log(error.name); // "ReferenceError"\n}\nlet value = 5;\nconsole.log(value); // 5',
            },
            {
              label:
                "Distinguish an early read from a completed empty declaration",
              language: "javascript",
              code: 'try {\n  console.log(pending);\n} catch (error) {\n  console.log(error.name); // "ReferenceError"\n}\nlet pending;\nconsole.log(pending); // undefined',
            },
          ],
        },
        {
          name: "Function expressions before initialization",
          explanation:
            "Creates the function value only when its expression executes.",
          note: "A const-bound expression has a temporal dead zone; a var-bound expression initially contains undefined, which cannot be called. Neither behaves like an initialized function declaration.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function",
          examples: [
            {
              label: "Catch a const expression’s ReferenceError",
              language: "javascript",
              code: 'try {\n  sayHi();\n} catch (error) {\n  console.log(error.name);\n}\n// "ReferenceError"\nconst sayHi = function () {\n  console.log("Hi");\n};\nsayHi(); // "Hi"',
            },
            {
              label: "Catch a var expression’s TypeError before assignment",
              language: "javascript",
              code: 'try {\n  sayHi();\n} catch (error) {\n  console.log(error.name);\n}\n// "TypeError"\nvar sayHi = function () {\n  console.log("Hi");\n};\nsayHi(); // "Hi"',
            },
          ],
        },
        {
          name: "const temporal dead zone",
          explanation:
            "Prevents reading a const variable before its declaration runs.",
          note: "A const must have an initializer in an ordinary declaration. Its lexical presence can shadow an outer name even before the inner initialization, so an early access does not fall back to the outer value.",
          source: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting",
          examples: [
            {
              label: "Catch a const read before initialization",
              language: "javascript",
              code: 'try {\n  console.log(value);\n} catch (error) {\n  console.log(error.name);\n}\n// "ReferenceError"\nconst value = 20;\nconsole.log(value); // 20',
            },
            {
              label: "Observe the inner binding shadowing the outer value",
              language: "javascript",
              code: 'const value = 1;\n{\n  try {\n    console.log(value);\n  } catch (error) {\n    console.log(error.name);\n  }\n  // "ReferenceError", not the outer 1\n  const value = 2;\n  console.log(value); // 2\n}\nconsole.log(value); // 1',
            },
          ],
        },
        {
          name: "Class declaration initialization",
          explanation:
            "Creates a lexical class variable that is unavailable before the declaration is initialized.",
          note: "An early new call produces ReferenceError because the binding is in its temporal dead zone. Class-body code is strict automatically.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/class",
          examples: [
            {
              label: "Catch an attempt to construct before the declaration",
              language: "javascript",
              code: 'try {\n  new MyClass();\n} catch (error) {\n  console.log(error.name);\n}\n// "ReferenceError"\nclass MyClass {\n  constructor() {\n    this.value = 1;\n  }\n}\nconsole.log(new MyClass().value); // 1',
            },
            {
              label: "Construct normally after initialization",
              language: "javascript",
              code: "class MyClass {\n  constructor(value) {\n    this.value = value;\n  }\n}\nconst instance = new MyClass(7);\nconsole.log(instance.value); // 7",
            },
          ],
        },
        {
          name: "Hoisting inside functions",
          explanation:
            "Initializes a function’s var variables even when their declarations appear inside later ordinary blocks.",
          note: "A var binding exists even if the declaring branch never executes. A let binding declared in an inner block is not directly accessible outside that block.",
          source: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting",
          examples: [
            {
              label: "Compare a later block var with its block-local let",
              language: "javascript",
              code: 'function example() {\n  console.log(inner); // undefined\n  if (true) {\n    var inner = "value";\n    let blockLet = "block";\n    console.log(blockLet); // "block"\n  }\n  console.log(inner); // "value"\n  try {\n    console.log(blockLet);\n  } catch (error) {\n    console.log(error.name);\n  }\n  // "ReferenceError"\n}\nexample();',
            },
            {
              label: "Observe a var whose assignment never executes",
              language: "javascript",
              code: "function example() {\n  if (false) {\n    var neverAssigned = 5;\n  }\n  console.log(neverAssigned); // undefined\n}\nexample();",
            },
          ],
        },
        {
          name: 'Script-level "use strict"',
          explanation:
            "Enables stricter JavaScript checks when placed at the start of a script.",
          note: "Comments may precede the directive, but arbitrary preceding statements prevent it from acting as a directive. It does not enable strictness merely by appearing in an ordinary block; modules are already strict.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode",
          examples: [
            {
              label: "Enable a strict script and observe a plain call’s this",
              language: "javascript",
              code: '"use strict";\nfunction readThis() {\n  return this;\n}\nconsole.log(readThis()); // undefined',
            },
            {
              label: "Use declared writable state in a strict script",
              language: "javascript",
              code: '"use strict";\nlet count = 0;\ncount++;\nconsole.log(count); // 1',
            },
          ],
        },
        {
          name: "Strict mode: accidental globals",
          explanation:
            "Throws when assigning to an unresolvable identifier instead of silently creating a global property.",
          note: "An explicit globalThis property assignment is still allowed when that property is writable; strict mode does not make the global object immutable. The second example removes its temporary property afterward.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode",
          examples: [
            {
              label: "Catch an undeclared assignment",
              language: "javascript",
              code: '"use strict";\ntry {\n  jsGeneralStrictMissing = 17;\n} catch (error) {\n  console.log(error.name); // "ReferenceError"\n}',
            },
            {
              label: "Make an explicit temporary global-object write",
              language: "javascript",
              code: '"use strict";\nglobalThis.jsGeneralStrictExample = 17;\nconsole.log(globalThis.jsGeneralStrictExample); // 17\ndelete globalThis.jsGeneralStrictExample;',
            },
          ],
        },
        {
          name: "Strict mode: duplicate parameters",
          explanation:
            "Rejects duplicate formal parameter names in strict function code.",
          note: "This is a parse-time SyntaxError, so the invalid fixed source below is compiled inside a try/catch rather than making the whole example unparseable. Default/rest/destructured parameter lists also forbid duplicate names independently of a use-strict directive.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode",
          examples: [
            {
              label: "Catch the syntax error from fixed demonstration source",
              language: "javascript",
              code: 'try {\n  Function(\'"use strict"; function sum(a, a, c) { return a + a + c; }\');\n} catch (error) {\n  console.log(error.name); // "SyntaxError"\n}',
            },
            {
              label: "Use unique parameter names",
              language: "javascript",
              code: 'function sum(a, b, c) {\n  "use strict";\n  return a + b + c;\n}\nconsole.log(sum(1, 2, 3)); // 6',
            },
          ],
        },
        {
          name: "Strict eval scope",
          explanation:
            "Keeps declarations created by strict direct eval from introducing variables into the caller’s surrounding scope.",
          note: "Strict eval can still read and modify accessible caller bindings; it is not a sandbox. The examples evaluate only fixed demonstration strings, not external input. A strict caller makes its direct eval strict too.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode",
          examples: [
            {
              label: "Keep eval-created var out of the surrounding scope",
              language: "javascript",
              code: '"use strict";\neval("var strictEvalOnly = 42;");\ntry {\n  console.log(strictEvalOnly);\n} catch (error) {\n  console.log(error.name);\n}\n// "ReferenceError"',
            },
            {
              label: "Show that existing lexical state remains accessible",
              language: "javascript",
              code: '"use strict";\nlet outer = 1;\neval("outer = 2; var evalLocal = 42;");\nconsole.log(outer, typeof evalLocal); // 2, "undefined"',
            },
          ],
        },
        {
          name: 'Function-level "use strict"',
          explanation: "Enables stricter JavaScript checks inside a function.",
          note: "A use-strict directive inside a function with default, rest, or destructured parameters is a SyntaxError. For such signatures, inherit strictness from a module or an enclosing strict script instead.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode",
          examples: [
            {
              label: "Enable strict semantics only in this function body",
              language: "javascript",
              code: 'function strictFunction() {\n  "use strict";\n  return this;\n}\nconsole.log(strictFunction()); // undefined',
            },
            {
              label: "Use a strict directive with a simple parameter list",
              language: "javascript",
              code: 'function add(a, b) {\n  "use strict";\n  return a + b;\n}\nconsole.log(add(2, 3)); // 5',
            },
          ],
        },
        {
          name: "Strict assignment to non-writable properties",
          explanation:
            "Throws TypeError when assignment cannot update a non-writable property.",
          note: "Strict mode does not itself freeze ordinary objects. The first example explicitly creates a read-only property; the second keeps an ordinary writable one.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode",
          examples: [
            {
              label: "Catch a write to an explicitly read-only property",
              language: "javascript",
              code: '"use strict";\nconst object = {};\nObject.defineProperty(object, "x", { value: 42, writable: false });\ntry {\n  object.x = 9;\n} catch (error) {\n  console.log(error.name);\n}\nconsole.log(object.x);\n// "TypeError", then 42',
            },
            {
              label: "Update a normal writable property successfully",
              language: "javascript",
              code: '"use strict";\nconst object = { x: 42 };\nobject.x = 9;\nconsole.log(object.x); // 9',
            },
          ],
        },
        {
          name: "Strict deletion of nonconfigurable properties",
          explanation:
            "Throws TypeError when deleting a property that cannot be removed.",
          note: "The failed deletion leaves the property intact. Deleting an identifier binding is a separate strict-mode syntax restriction, not the same property operation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode",
          examples: [
            {
              label: "Catch deletion of a built-in nonconfigurable property",
              language: "javascript",
              code: '"use strict";\ntry {\n  delete Object.prototype;\n} catch (error) {\n  console.log(error.name);\n}\n// "TypeError"',
            },
            {
              label: "Catch deletion of a nonconfigurable own property",
              language: "javascript",
              code: '"use strict";\nconst object = {};\nObject.defineProperty(object, "value", { value: 42, configurable: false });\ntry {\n  delete object.value;\n} catch (error) {\n  console.log(error.name);\n}\nconsole.log(object.value);\n// "TypeError", then 42',
            },
          ],
        },
        {
          name: "Strict mode and octal literals",
          explanation:
            "Rejects legacy leading-zero octal literal syntax in strict code.",
          note: "The invalid fixed-source example is compiled inside try/catch so its SyntaxError can be observed without breaking the surrounding snippet. 0o10 is the number eight, not decimal ten.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode",
          examples: [
            {
              label: "Catch the legacy octal syntax restriction",
              language: "javascript",
              code: 'try {\n  Function(\'"use strict"; return 010;\');\n} catch (error) {\n  console.log(error.name); // "SyntaxError"\n}',
            },
            {
              label: "Use modern explicit octal syntax",
              language: "javascript",
              code: '"use strict";\nconst number = 0o10;\nconsole.log(number); // 8',
            },
          ],
        },
        {
          name: "Strict mode and with",
          explanation:
            "Disallows the with statement, which obscures how names resolve.",
          note: "The fixed invalid demonstration is compiled separately so it produces a caught SyntaxError. This is an explanation of the restriction, not a recommendation to execute dynamically supplied code.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode",
          examples: [
            {
              label: "Catch the forbidden statement’s syntax error",
              language: "javascript",
              code: 'try {\n  Function(\'"use strict"; with ({ x: 1 }) { return x; }\');\n} catch (error) {\n  console.log(error.name); // "SyntaxError"\n}',
            },
            {
              label: "Use explicit property access",
              language: "javascript",
              code: '"use strict";\nconst object = { x: 1 };\nconsole.log(object.x); // 1',
            },
          ],
        },
        {
          name: "Strict function this",
          explanation:
            "Preserves the supplied this value in an ordinary strict function instead of replacing null or undefined values with the global object or boxing primitives.",
          note: "A plain call supplies undefined. A method call still supplies its object, while call can explicitly supply null or a primitive. Strict mode does not make a classic script’s top-level this undefined; arrow this remains lexical.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode",
          examples: [
            {
              label: "Observe an ordinary strict function’s plain call",
              language: "javascript",
              code: '"use strict";\nfunction showThis() {\n  return this;\n}\nconsole.log(showThis()); // undefined',
            },
            {
              label: "Distinguish method and explicit call receivers",
              language: "javascript",
              code: '"use strict";\nconst object = {\n  showThis() {\n    return this;\n  },\n};\nconsole.log(object.showThis() === object); // true\nconsole.log(object.showThis.call(null), object.showThis.call(7)); // null, 7',
            },
          ],
        },
        {
          name: "Modules are automatically strict",
          explanation:
            "Executes ES module code under strict semantics without a use-strict directive.",
          note: "Save each shown file independently as .mjs and run it with Node.js, or use equivalent browser type=module code. A filename or comment alone does not turn a classic script into a module.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode",
          examples: [
            {
              label: "Run a true module and catch an undeclared assignment",
              files: [
                {
                  path: "strict-assignment.mjs",
                  language: "javascript",
                  code: 'try {\n  jsGeneralModuleMissing = 17;\n} catch (error) {\n  console.log(error.name); // "ReferenceError"\n}',
                },
              ],
            },
            {
              label: "Inherit strictness with a default-parameter function",
              files: [
                {
                  path: "strict-functions.mjs",
                  language: "javascript",
                  code: "function add(a = 1, b = 2) {\n  return a + b;\n}\nfunction readThis() {\n  return this;\n}\nconsole.log(add()); // 3\nconsole.log(readThis()); // undefined",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Objects & Arrays",
      id: "objects-arrays",
      intro:
        "Object Basics → Array Basics → Map & Set → JSON, following all eight images. Run every snippet independently in a modern browser or Node.js; at() and structuredClone need a supported runtime. The localStorage and HTTP file examples state their browser/server prerequisites. Repeated topics are consolidated within this category, with independent inputs rather than relying on earlier mutations. JSON conversion is distinguished from general cloning, own-property enumeration from inherited keys, and shallow copies from independent nested graphs.",
      methods: [
        {
          name: "Object literal",
          explanation:
            "Creates an object with named properties and optional method shorthand.",
          note: "Property keys are strings or symbols; quote keys that are not valid identifier-style property names. An ordinary method gets its this from the call site.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer",
          examples: [
            {
              label: "Create a record and call its method",
              language: "javascript",
              code: 'const person = {\n  name: "John",\n  age: 30,\n  greet() {\n    return `Hello, I\'m ${this.name}`;\n  },\n};\nconsole.log(person.greet(), person.age); // "Hello, I\'m John", 30',
            },
            {
              label: "Use a quoted key containing punctuation",
              language: "javascript",
              code: 'const person = { "special-key": "value" };\nconsole.log(person["special-key"]); // "value"',
            },
          ],
        },
        {
          name: "Object property access",
          explanation:
            "Reads a property by its name or by a key stored in a variable.",
          note: "Dot notation uses a fixed identifier name. An absent ordinary property yields undefined; access on a nullish base requires a guard.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors",
          examples: [
            {
              label: "Read fixed and quoted property names",
              language: "javascript",
              code: 'const person = { name: "John", age: 30, "special-key": "value" };\nconsole.log(person.name, person["age"], person["special-key"]);\n// "John", 30, "value"',
            },
            {
              label: "Select a property using a variable",
              language: "javascript",
              code: 'const person = { name: "Alice", age: 25 };\nconst field = "age";\nconsole.log(person[field]); // 25',
            },
          ],
        },
        {
          name: "Add and modify object properties",
          explanation:
            "Assigns a new property or changes an existing writable property.",
          note: "A const binding still permits mutation of its object. Extensibility, setters, prototypes, and property descriptors can affect assignment; these examples use simple ordinary objects.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors",
          examples: [
            {
              label: "Add an email and update an age",
              language: "javascript",
              code: 'const person = { name: "John", age: 30 };\nperson.email = "john@example.com";\nperson.age = 31;\nconsole.log(person.email, person.age); // "john@example.com", 31',
            },
            {
              label: "Add a phone property with brackets",
              language: "javascript",
              code: 'const person = {};\nperson["phone"] = "555-0123";\nconsole.log(person.phone); // "555-0123"',
            },
          ],
        },
        {
          name: "Delete object properties",
          explanation: "Removes a configurable own property.",
          note: "delete does not remove lexical bindings or directly remove an inherited property. A nonconfigurable deletion throws in strict code.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete",
          examples: [
            {
              label: "Delete a property using dot notation",
              language: "javascript",
              code: 'const person = { name: "John", age: 30 };\ndelete person.age;\nconsole.log("age" in person, person.age); // false, undefined',
            },
            {
              label: "Delete a property using brackets",
              language: "javascript",
              code: 'const person = { phone: "555-0123" };\nconsole.log(delete person["phone"]); // true\nconsole.log("phone" in person); // false',
            },
          ],
        },
        {
          name: "Dynamic property names",
          explanation: "Uses a runtime key in bracket access or assignment.",
          note: "A string key is used as written, and symbols retain their own identity. Treat arbitrary external keys deliberately rather than assuming every property name is application data.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors",
          examples: [
            {
              label: "Create a property selected by a variable",
              language: "javascript",
              code: 'const person = {};\nconst prop = "dynamicKey";\nperson[prop] = "dynamic value";\nconsole.log(person.dynamicKey); // "dynamic value"',
            },
            {
              label: "Update a selected existing field",
              language: "javascript",
              code: 'const person = { age: 30 };\nconst field = "age";\nperson[field] += 1;\nconsole.log(person.age); // 31',
            },
          ],
        },
        {
          name: "Computed property names",
          explanation:
            "Evaluates a bracketed key expression while constructing an object literal.",
          note: "A computed key expression runs during object construction. The same bracket syntax here defines a property rather than accessing an existing object.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer",
          examples: [
            {
              label: "Construct a dynamic key",
              language: "javascript",
              code: 'const key = "computedKey";\nconst object = { [key]: "value" };\nconsole.log(object.computedKey); // "value"',
            },
            {
              label: "Construct a prefixed key",
              language: "javascript",
              code: 'const key = "computedKey";\nconst object = { [`prefix_${key}`]: "prefixed" };\nconsole.log(object.prefix_computedKey); // "prefixed"',
            },
          ],
        },
        {
          name: "in (property existence)",
          explanation:
            "Checks whether a property exists on an object or its prototype chain.",
          note: "A present property can hold undefined, so reading the value alone is not an existence check. Use an own-property check when inheritance must be excluded.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in",
          examples: [
            {
              label: "Distinguish a missing key from an undefined value",
              language: "javascript",
              code: 'const person = { name: undefined };\nconsole.log("name" in person, "age" in person); // true, false',
            },
            {
              label: "Include an inherited property",
              language: "javascript",
              code: 'const person = Object.create({ role: "reader" });\nconsole.log("role" in person); // true',
            },
          ],
        },
        {
          name: "hasOwnProperty()",
          explanation:
            "Checks whether a property belongs directly to the object.",
          note: "An object can shadow this method or have no prototype. Object.hasOwn is the modern alternative; calling Object.prototype.hasOwnProperty.call also works when the instance method is unavailable.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty",
          examples: [
            {
              label: "Check a simple object’s own property",
              language: "javascript",
              code: 'const person = { name: "John" };\nconsole.log(person.hasOwnProperty("name"), person.hasOwnProperty("age"));\n// true, false',
            },
            {
              label:
                "Call the standard method safely for a null-prototype record",
              language: "javascript",
              code: 'const record = Object.create(null);\nrecord.name = "Alice";\nconsole.log(Object.prototype.hasOwnProperty.call(record, "name")); // true',
            },
          ],
        },
        {
          name: "Object.keys()",
          explanation:
            "Returns an array of an object’s own enumerable string keys.",
          note: "Symbols and nonenumerable properties are excluded. Integer-index keys come first in numeric order, followed by other string keys in creation order.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys",
          examples: [
            {
              label: "List keys of a fixed record",
              language: "javascript",
              code: 'const person = { name: "John", age: 30 };\nconsole.log(...Object.keys(person)); // "name", "age"',
            },
            {
              label: "Observe numeric-key ordering",
              language: "javascript",
              code: 'const object = { 10: "ten", 2: "two", label: "value" };\nconsole.log(...Object.keys(object)); // "2", "10", "label"',
            },
          ],
        },
        {
          name: "Object.values()",
          explanation:
            "Returns own enumerable string-keyed property values in the corresponding key order.",
          note: "It has the same key-selection boundary as Object.keys; getters can execute while values are read.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values",
          examples: [
            {
              label: "Read a record’s values",
              language: "javascript",
              code: 'const person = { name: "John", age: 30 };\nconsole.log(...Object.values(person)); // "John", 30',
            },
            {
              label: "Read values in numeric-key order",
              language: "javascript",
              code: 'const object = { 10: "ten", 2: "two" };\nconsole.log(...Object.values(object)); // "two", "ten"',
            },
          ],
        },
        {
          name: "Object.entries()",
          explanation:
            "Returns own enumerable string-keyed properties as key/value pairs.",
          note: "The key selection and ordering match Object.keys. Each returned pair is an array, while nested property values remain shared references.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries",
          examples: [
            {
              label: "Iterate names and values together",
              language: "javascript",
              code: 'const person = { name: "John", age: 30 };\nfor (const [key, value] of Object.entries(person)) {\n  console.log(key, value);\n}\n// "name", "John"; then "age", 30',
            },
            {
              label: "Use entries to initialize a Map",
              language: "javascript",
              code: 'const config = new Map(Object.entries({ theme: "dark", lang: "en" }));\nconsole.log(config.get("theme"), config.get("lang")); // "dark", "en"',
            },
          ],
        },
        {
          name: "Object.assign()",
          explanation:
            "Copies own enumerable string and symbol properties from sources into a target.",
          note: "It mutates and returns the target, later sources overwrite earlier keys, and nested objects remain shared. Source getters and target setters can run; it does not copy property descriptors.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign",
          examples: [
            {
              label: "Observe a shallow copy sharing a nested object",
              language: "javascript",
              code: "const original = { nested: { value: 1 } };\nconst copy = Object.assign({}, original);\ncopy.nested.value = 2;\nconsole.log(copy === original, original.nested.value); // false, 2",
            },
            {
              label: "Merge into an existing target with an override",
              language: "javascript",
              code: "const target = { a: 1 };\nconst result = Object.assign(target, { b: 2 }, { a: 10 });\nconsole.log(result === target, target.a, target.b); // true, 10, 2",
            },
          ],
        },
        {
          name: "Object spread copying and merging",
          explanation:
            "Copies an object’s own enumerable properties into a new object. Nested objects stay shared.",
          note: "This is shallow and later entries win for duplicate keys. It is not a deep clone and does not copy prototypes or original property descriptors.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax",
          examples: [
            {
              label: "Copy the outer object",
              language: "javascript",
              code: 'const original = { name: "Alice" };\nconst copy = { ...original };\nconsole.log(copy.name, copy === original); // "Alice", false',
            },
            {
              label: "Merge and override fields",
              language: "javascript",
              code: "const first = { a: 1, b: 2 };\nconst second = { a: 10, c: 3 };\nconst merged = { ...first, ...second };\nconsole.log(merged.a, merged.b, merged.c); // 10, 2, 3",
            },
          ],
        },
        {
          name: "Object.defineProperty()",
          explanation:
            "Defines one property with explicit descriptor attributes.",
          note: "For a new data property, omitted descriptor flags default to false. writable controls assignment, enumerable controls ordinary enumeration, and configurable controls deletion or descriptor changes. These flags do not deeply freeze a referenced object.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty",
          examples: [
            {
              label: "Define an enumerable, read-only, nonconfigurable ID",
              language: "javascript",
              code: '"use strict";\nconst person = {};\nObject.defineProperty(person, "id", {\n  value: 123,\n  writable: false,\n  enumerable: true,\n  configurable: false,\n});\ntry {\n  person.id = 9;\n} catch (error) {\n  console.log(error.name);\n}\ntry {\n  delete person.id;\n} catch (error) {\n  console.log(error.name);\n}\nconsole.log(person.id, ...Object.keys(person));\n// "TypeError", "TypeError", then 123, "id"',
            },
            {
              label: "Keep a nonenumerable property out of the key list",
              language: "javascript",
              code: 'const object = { visible: 1 };\nObject.defineProperty(object, "hidden", { value: 2 });\nconsole.log(object.hidden, ...Object.keys(object)); // 2, "visible"',
            },
          ],
        },
        {
          name: "Array literal",
          explanation: "Creates an array using bracket notation.",
          note: "Arrays can contain mixed types and are objects with special index/length behavior. The literal creates a new array each time it is evaluated.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
          examples: [
            {
              label: "Create a numeric array",
              language: "javascript",
              code: "const array = [1, 2, 3];\nconsole.log(...array); // 1, 2, 3",
            },
            {
              label: "Store mixed primitive values",
              language: "javascript",
              code: 'const mixed = [1, "two", true, null];\nconsole.log(...mixed); // 1, "two", true, null',
            },
          ],
        },
        {
          name: "Array index access",
          explanation:
            "Reads or writes array elements using zero-based property indices.",
          note: "The last ordinary element is at length - 1. A negative bracket key such as array[-1] is not special relative indexing; at() provides that behavior.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
          examples: [
            {
              label: "Read the first and last elements",
              language: "javascript",
              code: 'const fruits = ["apple", "banana", "orange"];\nconsole.log(fruits[0], fruits[fruits.length - 1]); // "apple", "orange"',
            },
            {
              label: "Modify an existing position",
              language: "javascript",
              code: "const array = [1, 2, 3];\narray[1] = 20;\nconsole.log(...array); // 1, 20, 3",
            },
          ],
        },
        {
          name: "Array.prototype.at()",
          explanation:
            "Reads an element by an integer index, allowing negative indices from the end.",
          note: "An out-of-range index returns undefined. Negative indexing through at() does not create or access a property literally named -1.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at",
          examples: [
            {
              label: "Read from the end",
              language: "javascript",
              code: 'const fruits = ["apple", "banana", "orange"];\nconsole.log(fruits.at(-1), fruits.at(-2)); // "orange", "banana"',
            },
            {
              label: "Handle an out-of-range position",
              language: "javascript",
              code: "const array = [1, 2, 3];\nconsole.log(array.at(3)); // undefined",
            },
          ],
        },
        {
          name: "Array length",
          explanation:
            "Tracks the array index range and can truncate an array when assigned a smaller value.",
          note: "Length counts the index span, not necessarily the number of present elements. Increasing it creates holes, while truncation deletes higher-index elements.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length",
          examples: [
            {
              label: "Read and reduce length",
              language: "javascript",
              code: 'const fruits = ["apple", "banana", "orange"];\nconsole.log(fruits.length); // 3\nfruits.length = 2;\nconsole.log(...fruits); // "apple", "banana"',
            },
            {
              label: "Increase length without creating actual elements",
              language: "javascript",
              code: "const array = [1];\narray.length = 3;\nconsole.log(array.length, 1 in array); // 3, false",
            },
          ],
        },
        {
          name: "push()",
          explanation: "Adds one or more elements and returns the new length.",
          note: "It mutates the array and does not flatten an array supplied as a single argument.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push",
          examples: [
            {
              label: "Append two values",
              language: "javascript",
              code: "const array = [2, 3];\nconsole.log(array.push(4, 5)); // 4\nconsole.log(...array); // 2, 3, 4, 5",
            },
            {
              label: "Append an array as one element",
              language: "javascript",
              code: "const array = [1];\narray.push([2, 3]);\nconsole.log(array.length, Array.isArray(array[1])); // 2, true",
            },
          ],
        },
        {
          name: "pop()",
          explanation: "Removes and returns the last element.",
          note: "It mutates the array; an empty array returns undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop",
          examples: [
            {
              label: "Remove the final element",
              language: "javascript",
              code: "const array = [2, 3, 4, 5];\nconsole.log(array.pop()); // 5\nconsole.log(...array); // 2, 3, 4",
            },
            {
              label: "Pop an empty array",
              language: "javascript",
              code: "const array = [];\nconsole.log(array.pop(), array.length); // undefined, 0",
            },
          ],
        },
        {
          name: "unshift()",
          explanation:
            "Adds one or more elements at the beginning and returns the new length.",
          note: "It mutates the array and moves existing indexed elements. Multiple supplied values retain their supplied order.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift",
          examples: [
            {
              label: "Prepend one value",
              language: "javascript",
              code: "const array = [2, 3];\nconsole.log(array.unshift(1)); // 3\nconsole.log(...array); // 1, 2, 3",
            },
            {
              label: "Prepend several values in order",
              language: "javascript",
              code: "const array = [2, 3, 4];\narray.unshift(0, 1);\nconsole.log(...array); // 0, 1, 2, 3, 4",
            },
          ],
        },
        {
          name: "shift()",
          explanation:
            "Removes and returns the first element, moving later indexed elements down.",
          note: "It mutates the array and returns undefined when empty.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift",
          examples: [
            {
              label: "Remove the first element",
              language: "javascript",
              code: "const array = [0, 1, 2, 3];\nconsole.log(array.shift()); // 0\nconsole.log(...array); // 1, 2, 3",
            },
            {
              label: "Shift an empty array",
              language: "javascript",
              code: "const array = [];\nconsole.log(array.shift(), array.length); // undefined, 0",
            },
          ],
        },
        {
          name: "new Array()",
          explanation:
            "Constructs an array, with a single numeric argument interpreted as a length.",
          note: "new Array(5) contains five holes, not five explicitly stored undefined elements. Multiple arguments are element values; invalid numeric lengths throw RangeError.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array",
          examples: [
            {
              label: "Create an empty indexed span",
              language: "javascript",
              code: "const array = new Array(5);\nconsole.log(array.length, 0 in array); // 5, false",
            },
            {
              label: "Create elements with multiple arguments",
              language: "javascript",
              code: "const array = new Array(1, 2, 3);\nconsole.log(...array); // 1, 2, 3",
            },
          ],
        },
        {
          name: "Array.of()",
          explanation:
            "Creates an array whose elements are exactly the supplied arguments.",
          note: "A single number is an element rather than a request for holes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of",
          examples: [
            {
              label: "Create an ordinary three-element array",
              language: "javascript",
              code: "console.log(...Array.of(1, 2, 3)); // 1, 2, 3",
            },
            {
              label: "Keep one numeric argument as one element",
              language: "javascript",
              code: "const array = Array.of(5);\nconsole.log(array.length, array[0]); // 1, 5",
            },
          ],
        },
        {
          name: "Array.from()",
          explanation: "Creates an array from an iterable or array-like value.",
          note: "The outer container is copied, not deeply cloned. String iteration follows code points rather than complete user-perceived characters.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from",
          examples: [
            {
              label: "Create an array from string iteration",
              language: "javascript",
              code: 'console.log(...Array.from("hello")); // "h", "e", "l", "l", "o"',
            },
            {
              label: "Read indexed values from an array-like object",
              language: "javascript",
              code: 'const array = Array.from({ 0: "a", 1: "b", length: 2 });\nconsole.log(...array); // "a", "b"',
            },
          ],
        },
        {
          name: "splice()",
          explanation:
            "Removes and/or inserts elements at a selected index, returning the removed elements.",
          note: "It mutates the original array. The delete count is separate from the inserted values; zero permits insertion without removal.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice",
          examples: [
            {
              label: "Remove one element at index two",
              language: "javascript",
              code: "const numbers = [1, 2, 3, 4, 5];\nconst removed = numbers.splice(2, 1);\nconsole.log(removed[0], ...numbers); // 3, 1, 2, 4, 5",
            },
            {
              label: "Insert two elements without removal",
              language: "javascript",
              code: 'const numbers = [1, 2, 4, 5];\nconst removed = numbers.splice(2, 0, "a", "b");\nconsole.log(removed.length, ...numbers); // 0, 1, 2, "a", "b", 4, 5',
            },
          ],
        },
        {
          name: "slice()",
          explanation:
            "Returns a copy that shares nested objects of a selected range without editing the original array.",
          note: "The end index is excluded; negative indices count from the end. Nested objects stay shared.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice",
          examples: [
            {
              label: "Extract an interior range and the last two elements",
              language: "javascript",
              code: "const numbers = [1, 2, 3, 4, 5];\nconsole.log(...numbers.slice(1, 4)); // 2, 3, 4\nconsole.log(...numbers.slice(-2)); // 4, 5",
            },
            {
              label: "Observe a shallow full-array copy",
              language: "javascript",
              code: "const original = [{ value: 1 }];\nconst copy = original.slice();\ncopy[0].value = 2;\nconsole.log(copy === original, original[0].value); // false, 2",
            },
          ],
        },
        {
          name: "indexOf()",
          explanation:
            "Returns the first matching index or -1 when no strict-equality match is found.",
          note: "It does not find NaN and skips holes. Avoid treating the returned index as a boolean: zero is a valid match.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf",
          examples: [
            {
              label: "Find the first repeated value",
              language: "javascript",
              code: "const array = [1, 2, 3, 2, 1];\nconsole.log(array.indexOf(2)); // 1",
            },
            {
              label: "Recognize a missing value",
              language: "javascript",
              code: "console.log([1, 2, 3].indexOf(9)); // -1",
            },
          ],
        },
        {
          name: "lastIndexOf()",
          explanation: "Searches backward for the last strict-equality match.",
          note: "It returns -1 when absent and, like indexOf, does not recognize NaN as equal to itself.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf",
          examples: [
            {
              label: "Find the final repeated value",
              language: "javascript",
              code: "const array = [1, 2, 3, 2, 1];\nconsole.log(array.lastIndexOf(2)); // 3",
            },
            {
              label: "Return -1 for no match",
              language: "javascript",
              code: "console.log([1, 2].lastIndexOf(9)); // -1",
            },
          ],
        },
        {
          name: "includes()",
          explanation: "Reports whether an array contains a value.",
          note: "It uses SameValueZero equality, so NaN can match NaN and the two zero signs match. It does not perform object-content equality.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes",
          examples: [
            {
              label: "Check ordinary membership",
              language: "javascript",
              code: "console.log([1, 2, 3].includes(3), [1, 2, 3].includes(9)); // true, false",
            },
            {
              label: "Recognize NaN unlike indexOf",
              language: "javascript",
              code: "const array = [NaN];\nconsole.log(array.includes(NaN), array.indexOf(NaN)); // true, -1",
            },
          ],
        },
        {
          name: "Array.isArray()",
          explanation: "Recognizes actual arrays.",
          note: "It also recognizes arrays from other realms; a string or ordinary object is not an array.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray",
          examples: [
            {
              label: "Recognize an array",
              language: "javascript",
              code: "console.log(Array.isArray([1, 2, 3])); // true",
            },
            {
              label: "Reject text and an ordinary object",
              language: "javascript",
              code: 'console.log(Array.isArray("not array"), Array.isArray({})); // false, false',
            },
          ],
        },
        {
          name: "new Map()",
          explanation: "Creates a collection of key-value pairs.",
          note: "Iteration follows key insertion order. Keys use SameValueZero equality, with objects compared by identity; initializing from entries uses two-item iterable pairs.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map",
          examples: [
            {
              label: "Create an empty map",
              language: "javascript",
              code: "const map = new Map();\nconsole.log(map.size); // 0",
            },
            {
              label: "Initialize directly from entries",
              language: "javascript",
              code: 'const config = new Map([\n  ["theme", "dark"],\n  ["lang", "en"],\n  ["debug", false],\n]);\nconsole.log(config.get("theme"), config.get("lang"), config.get("debug"));\n// "dark", "en", false',
            },
          ],
        },
        {
          name: "Map.set()",
          explanation:
            "Adds a key/value entry or replaces the value for an existing key.",
          note: "Returns the map so calls can be chained. Replacing an existing value does not move the key to the end.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set",
          examples: [
            {
              label: "Store string, number, and boolean keys",
              language: "javascript",
              code: 'const map = new Map();\nmap.set("name", "Alice").set(42, "answer").set(true, "yes");\nconsole.log(map.get("name"), map.get(42), map.get(true)); // "Alice", "answer", "yes"',
            },
            {
              label: "Replace the value without growing the map",
              language: "javascript",
              code: 'const map = new Map([["name", "Alice"]]);\nmap.set("name", "Bob");\nconsole.log(map.size, map.get("name")); // 1, "Bob"',
            },
          ],
        },
        {
          name: "Map.get()",
          explanation:
            "Returns the value associated with a key, or undefined if absent.",
          note: "An explicitly stored undefined value also reads as undefined; use has to distinguish existence. Object keys require the same object identity.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get",
          examples: [
            {
              label: "Read an existing and a missing key",
              language: "javascript",
              code: 'const map = new Map([["name", "Alice"]]);\nconsole.log(map.get("name"), map.get("missing")); // "Alice", undefined',
            },
            {
              label: "Keep object-key identity distinct from object shape",
              language: "javascript",
              code: 'const key = {};\nconst map = new Map([[key, "value"]]);\nconsole.log(map.get(key), map.get({})); // "value", undefined',
            },
          ],
        },
        {
          name: "new Set()",
          explanation: "Creates a collection of unique values.",
          note: "Values use SameValueZero equality and iterate in insertion order. Similar-looking separate objects are different set values.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set",
          examples: [
            {
              label: "Remove repeated primitive values at construction",
              language: "javascript",
              code: "const set = new Set([1, 1, 2, 2, 3]);\nconsole.log(...set); // 1, 2, 3",
            },
            {
              label: "Start with an empty collection",
              language: "javascript",
              code: "const set = new Set();\nconsole.log(set.size); // 0",
            },
          ],
        },
        {
          name: "Map.has()",
          explanation: "Reports whether a map contains a key.",
          note: "It does not search values and does not coerce numeric keys to strings.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has",
          examples: [
            {
              label: "Recognize a numeric key",
              language: "javascript",
              code: 'const map = new Map([[42, "answer"]]);\nconsole.log(map.has(42), map.has("42")); // true, false',
            },
            {
              label: "Recognize a key storing undefined",
              language: "javascript",
              code: 'const map = new Map([["pending", undefined]]);\nconsole.log(map.has("pending"), map.has("missing")); // true, false',
            },
          ],
        },
        {
          name: "Map.size",
          explanation: "Reads the number of map entries.",
          note: "It is a getter rather than a method, and ordinary map entries are not object properties exposed by Object.keys.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size",
          examples: [
            {
              label: "Count several entries",
              language: "javascript",
              code: 'const map = new Map([\n  ["name", "Alice"],\n  [42, "answer"],\n  [true, "yes"],\n]);\nconsole.log(map.size); // 3',
            },
            {
              label: "Observe the count after deletion",
              language: "javascript",
              code: 'const map = new Map([\n  ["a", 1],\n  ["b", 2],\n]);\nmap.delete("a");\nconsole.log(map.size); // 1',
            },
          ],
        },
        {
          name: "Map.delete()",
          explanation:
            "Removes an entry by key and returns whether it existed.",
          note: "Deleting one key does not clear other entries. It returns a boolean rather than the removed value.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete",
          examples: [
            {
              label: "Delete an existing numeric key",
              language: "javascript",
              code: 'const map = new Map([\n  [42, "answer"],\n  ["name", "Alice"],\n]);\nconsole.log(map.delete(42), map.has(42), map.size); // true, false, 1',
            },
            {
              label: "Observe a missing deletion",
              language: "javascript",
              code: 'const map = new Map();\nconsole.log(map.delete("missing")); // false',
            },
          ],
        },
        {
          name: "Map iteration with for...of",
          explanation: "Iterates map entries as key/value pairs.",
          note: "Iteration follows insertion order, and each pair can be destructured. Map is iterable by default, unlike an ordinary record object.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
          examples: [
            {
              label: "Read a configuration in insertion order",
              language: "javascript",
              code: 'const config = new Map([\n  ["theme", "dark"],\n  ["lang", "en"],\n  ["debug", false],\n]);\nfor (const [key, value] of config) console.log(key, value);\n// "theme", "dark"; "lang", "en"; "debug", false',
            },
            {
              label: "Stop after the first entry",
              language: "javascript",
              code: 'const map = new Map([\n  ["a", 1],\n  ["b", 2],\n]);\nfor (const [key, value] of map) {\n  console.log(key, value);\n  break;\n}\n// "a", 1',
            },
          ],
        },
        {
          name: "Map.forEach()",
          explanation: "Calls a callback for each map entry.",
          note: "The callback receives value before key, unlike the pair order shown by for...of. A return from the callback does not break the traversal.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach",
          examples: [
            {
              label: "Print keys and values with the callback argument order",
              language: "javascript",
              code: 'const map = new Map([\n  ["theme", "dark"],\n  ["lang", "en"],\n]);\nmap.forEach((value, key) => console.log(key, value));\n// "theme", "dark"; then "lang", "en"',
            },
            {
              label: "Receive the map as the third callback argument",
              language: "javascript",
              code: 'const map = new Map([["a", 1]]);\nmap.forEach((value, key, collection) =>\n  console.log(value, key, collection === map),\n);\n// 1, "a", true',
            },
          ],
        },
        {
          name: "Map.keys()",
          explanation: "Returns an iterator over map keys in insertion order.",
          note: "Spread can materialize the iterator into an array. Updating an existing key’s value does not change its insertion position.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys",
          examples: [
            {
              label: "Collect configuration keys",
              language: "javascript",
              code: 'const config = new Map([\n  ["theme", "dark"],\n  ["lang", "en"],\n  ["debug", false],\n]);\nconst keys = [...config.keys()];\nconsole.log(...keys); // "theme", "lang", "debug"',
            },
            {
              label: "Keep order after updating an existing key",
              language: "javascript",
              code: 'const map = new Map([\n  ["first", 1],\n  ["second", 2],\n]);\nmap.set("first", 3);\nconsole.log(...map.keys()); // "first", "second"',
            },
          ],
        },
        {
          name: "Map.values()",
          explanation:
            "Returns an iterator over values in key insertion order.",
          note: "Different keys can hold equal values; values() does not deduplicate them.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values",
          examples: [
            {
              label: "Collect configuration values",
              language: "javascript",
              code: 'const config = new Map([\n  ["theme", "dark"],\n  ["lang", "en"],\n  ["debug", false],\n]);\nconsole.log(...config.values()); // "dark", "en", false',
            },
            {
              label: "Retain duplicate values held by different keys",
              language: "javascript",
              code: 'const map = new Map([\n  ["a", 1],\n  ["b", 1],\n]);\nconsole.log(...map.values()); // 1, 1',
            },
          ],
        },
        {
          name: "Set.add()",
          explanation: "Adds a value if absent and returns the set.",
          note: "Repeated equal primitive values do not increase size. Separate object identities can still be added separately.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add",
          examples: [
            {
              label: "Add a new value",
              language: "javascript",
              code: "const set = new Set([1, 2, 3]);\nset.add(4);\nconsole.log(...set); // 1, 2, 3, 4",
            },
            {
              label: "Ignore a duplicate while permitting chaining",
              language: "javascript",
              code: "const set = new Set();\nset.add(1).add(1).add(2);\nconsole.log(set.size, ...set); // 2, 1, 2",
            },
          ],
        },
        {
          name: "Set.has()",
          explanation: "Reports whether a set contains a value.",
          note: "It does not coerce strings to numbers and uses object identity rather than structural equality.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has",
          examples: [
            {
              label: "Check primitive membership",
              language: "javascript",
              code: "const set = new Set([1, 2, 3]);\nconsole.log(set.has(2), set.has(4)); // true, false",
            },
            {
              label: "Recognize the same object reference",
              language: "javascript",
              code: "const item = {};\nconst set = new Set([item]);\nconsole.log(set.has(item), set.has({})); // true, false",
            },
          ],
        },
        {
          name: "Set.delete()",
          explanation: "Removes a value and reports whether it was present.",
          note: "Other values retain their relative iteration order. The result is a boolean, not the removed value.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete",
          examples: [
            {
              label: "Remove a member after adding a fourth value",
              language: "javascript",
              code: "const set = new Set([1, 2, 3]);\nset.add(4);\nconsole.log(set.delete(2), set.size); // true, 3",
            },
            {
              label: "Observe a missing member",
              language: "javascript",
              code: "const set = new Set([1]);\nconsole.log(set.delete(9), set.has(1)); // false, true",
            },
          ],
        },
        {
          name: "Set.size",
          explanation: "Reads the number of unique stored values.",
          note: "It is a getter, not a method; repeated input values are counted only once.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size",
          examples: [
            {
              label: "Count unique input values",
              language: "javascript",
              code: "const set = new Set([1, 1, 2, 2, 3]);\nconsole.log(set.size); // 3",
            },
            {
              label: "Track size after removing a member",
              language: "javascript",
              code: "const set = new Set([1, 2, 3]);\nset.delete(2);\nconsole.log(set.size); // 2",
            },
          ],
        },
        {
          name: "Deduplicate an array with Set",
          explanation:
            "Creates a set from array values and spreads them into a new array.",
          note: "It does not deduplicate object records by their property contents. The original array remains unchanged.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set",
          examples: [
            {
              label: "Keep one instance of each number",
              language: "javascript",
              code: "const unique = [...new Set([1, 2, 2, 3, 3])];\nconsole.log(...unique); // 1, 2, 3",
            },
            {
              label: "Distinguish shared from merely similar objects",
              language: "javascript",
              code: "const item = { id: 1 };\nconst unique = [...new Set([item, item, { id: 1 }])];\nconsole.log(unique.length); // 2",
            },
          ],
        },
        {
          name: "Set union with spread",
          explanation: "Combines values from two sets in a new set.",
          note: "The pattern shown in the image uses spread and the Set constructor; it does not require newer dedicated set-operation methods.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set",
          examples: [
            {
              label: "Combine overlapping numeric sets",
              language: "javascript",
              code: "const a = new Set([1, 2, 3]);\nconst b = new Set([2, 3, 4]);\nconst union = new Set([...a, ...b]);\nconsole.log(...union); // 1, 2, 3, 4",
            },
            {
              label: "Combine text memberships",
              language: "javascript",
              code: 'const a = new Set(["read"]);\nconst b = new Set(["read", "write"]);\nconsole.log(...new Set([...a, ...b])); // "read", "write"',
            },
          ],
        },
        {
          name: "Set intersection with filter",
          explanation:
            "Keeps values from one set that are also present in another.",
          note: "This pattern uses an intermediate array and preserves the first set’s order for retained values. Neither input is mutated.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set",
          examples: [
            {
              label: "Find shared numeric values",
              language: "javascript",
              code: "const a = new Set([1, 2, 3]);\nconst b = new Set([2, 3, 4]);\nconst intersection = new Set([...a].filter((value) => b.has(value)));\nconsole.log(...intersection); // 2, 3",
            },
            {
              label: "Recognize an empty intersection",
              language: "javascript",
              code: "const a = new Set([1]);\nconst b = new Set([2]);\nconsole.log(new Set([...a].filter((value) => b.has(value))).size); // 0",
            },
          ],
        },
        {
          name: "Set difference with filter",
          explanation:
            "Keeps values from the first set that the second set lacks.",
          note: "a minus b and b minus a need not be equal. This is a new result, not an in-place deletion.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set",
          examples: [
            {
              label: "Find values only in the first set",
              language: "javascript",
              code: "const a = new Set([1, 2, 3]);\nconst b = new Set([2, 3, 4]);\nconst difference = new Set([...a].filter((value) => !b.has(value)));\nconsole.log(...difference); // 1",
            },
            {
              label: "Reverse the direction deliberately",
              language: "javascript",
              code: "const a = new Set([1, 2, 3]);\nconst b = new Set([2, 3, 4]);\nconsole.log(...new Set([...b].filter((value) => !a.has(value)))); // 4",
            },
          ],
        },
        {
          name: "Map vs Object",
          explanation:
            "Chooses between arbitrary-value Map keys and ordinary string/symbol object properties.",
          note: "Both have specified ordering rules, but objects are not iterable by default and have no built-in entry-count size property. Numeric object property keys become strings; Map preserves key type distinctions.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
          examples: [
            {
              label: "Keep numeric and string keys separate in a Map",
              language: "javascript",
              code: 'const map = new Map([\n  [1, "numeric"],\n  ["1", "text"],\n]);\nconsole.log(map.size, map.get(1), map.get("1")); // 2, "numeric", "text"',
            },
            {
              label: "Observe numeric object keys becoming strings",
              language: "javascript",
              code: 'const object = {};\nobject[1] = "numeric";\nobject["1"] = "text";\nconsole.log(Object.keys(object).length, object[1]); // 1, "text"',
            },
          ],
        },
        {
          name: "JSON.parse()",
          explanation: "Parses JSON text into JavaScript data.",
          note: "JSON can represent a primitive as well as an array or object. Invalid JSON throws SyntaxError; successful parsing is not application-schema validation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse",
          examples: [
            {
              label: "Parse a user record",
              language: "javascript",
              code: 'const user = JSON.parse(\'{"name":"Alice","age":30,"active":true}\');\nconsole.log(user.name, user.age, user.active); // "Alice", 30, true',
            },
            {
              label: "Handle malformed JSON without breaking the example",
              language: "javascript",
              code: 'try {\n  JSON.parse("not JSON");\n} catch (error) {\n  console.log(error.name);\n}\n// "SyntaxError"',
            },
          ],
        },
        {
          name: "JSON.stringify()",
          explanation: "Serializes supported JavaScript data into JSON text.",
          note: "It is not a general object-preserving snapshot. Cycles and unsupported BigInt values throw by default; custom toJSON or replacer behavior can change the output.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify",
          examples: [
            {
              label: "Serialize a record compactly",
              language: "javascript",
              code: 'const json = JSON.stringify({ name: "Alice", age: 30 });\nconsole.log(json); // \'{"name":"Alice","age":30}\'',
            },
            {
              label: "Serialize a supported primitive array",
              language: "javascript",
              code: 'console.log(JSON.stringify([1, true, null])); // "[1,true,null]"',
            },
          ],
        },
        {
          name: "JSON.parse() reviver",
          explanation:
            "Transforms parsed values through a callback during parsing.",
          note: "Traversal visits children before their container. Return the value to retain it; returning undefined removes a property, and removing the final root result makes the parse result undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse",
          examples: [
            {
              label: "Revive a known date field explicitly",
              language: "javascript",
              code: 'const data = JSON.parse(\'{"date":"2024-01-01"}\', (key, value) => {\n  if (key === "date") return new Date(value);\n  return value;\n});\nconsole.log(data.date.getUTCFullYear()); // 2024',
            },
            {
              label: "Remove an agreed property while parsing",
              language: "javascript",
              code: 'const data = JSON.parse(\'{"visible":1,"secret":"hidden"}\', (key, value) => {\n  if (key === "secret") return undefined;\n  return value;\n});\nconsole.log(data.visible, "secret" in data); // 1, false',
            },
          ],
        },
        {
          name: "JSON.stringify() indentation",
          explanation:
            "Uses the third stringify argument to format JSON for reading.",
          note: "The second argument is the replacer position; pass null when no replacer is needed. Indentation changes whitespace rather than the represented data.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify",
          examples: [
            {
              label: "Pretty-print with two spaces",
              language: "javascript",
              code: 'console.log(JSON.stringify({ name: "Alice", age: 30 }, null, 2));\n// {\n//   "name": "Alice",\n//   "age": 30\n// }',
            },
            {
              label: "Use a tab indentation string",
              language: "javascript",
              code: 'console.log(JSON.stringify({ active: true }, null, "\\t"));\n// Object properties are indented with one tab.',
            },
          ],
        },
        {
          name: "JSON.stringify() replacer",
          explanation:
            "Filters or transforms serialization with an allowed-property list or callback.",
          note: "Returning undefined omits an object property but yields null for an array element. Replacers are not a substitute for deciding which sensitive fields should be sent.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify",
          examples: [
            {
              label: "Allow only selected property names",
              language: "javascript",
              code: 'const user = { name: "Alice", age: 30 };\nconsole.log(JSON.stringify(user, ["name"])); // \'{"name":"Alice"}\'',
            },
            {
              label: "Exclude an object property with a callback",
              language: "javascript",
              code: 'const user = { name: "Alice", age: 30 };\nconst json = JSON.stringify(user, (key, value) => {\n  if (key === "age") return undefined;\n  return value;\n});\nconsole.log(json); // \'{"name":"Alice"}\'',
            },
          ],
        },
        {
          name: "JSON-supported values and serialization losses",
          explanation:
            "JSON represents strings, finite numbers, booleans, null, arrays, and string-keyed data objects.",
          note: "Object-valued undefined/functions/symbols are omitted; corresponding array entries and nonfinite numbers serialize as null. A top-level unsupported value can return undefined. Date normally becomes text, while ordinary Map/Set contents are not serialized by default; BigInt and cycles throw without special handling.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify",
          examples: [
            {
              label: "Retain supported data and omit unsupported object fields",
              language: "javascript",
              code: 'const data = {\n  text: "a",\n  number: 1,\n  active: true,\n  empty: null,\n  list: [1],\n  missing: undefined,\n  run() {},\n  token: Symbol("id"),\n};\nconsole.log(JSON.stringify(data));\n// \'{"text":"a","number":1,"active":true,"empty":null,"list":[1]}\'',
            },
            {
              label: "Observe array substitutions and an unsupported root",
              language: "javascript",
              code: 'console.log(JSON.stringify([undefined, () => {}, Symbol("id"), NaN, Infinity]));\n// "[null,null,null,null,null]"\nconsole.log(JSON.stringify(undefined)); // undefined',
            },
            {
              label: "Observe Date conversion and default Map/Set loss",
              language: "javascript",
              code: 'const data = {\n  date: new Date("2024-01-01T00:00:00Z"),\n  map: new Map([["a", 1]]),\n  set: new Set([1]),\n};\nconsole.log(JSON.stringify(data));\n// \'{"date":"2024-01-01T00:00:00.000Z","map":{},"set":{}}\'',
            },
          ],
        },
        {
          name: "Deep copying through JSON",
          explanation:
            "Parses a serialized copy to create separate nested containers for JSON-compatible data.",
          note: "This is not a general deep-clone method: Date becomes text, unsupported fields can disappear, cycles fail, and prototypes are not retained.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON",
          examples: [
            {
              label: "Copy a simple nested record independently",
              language: "javascript",
              code: "const original = { profile: { age: 25 } };\nconst copy = JSON.parse(JSON.stringify(original));\ncopy.profile.age = 30;\nconsole.log(original.profile.age, copy.profile.age); // 25, 30",
            },
            {
              label: "Observe the Date-to-string limitation",
              language: "javascript",
              code: 'const original = { date: new Date("2024-01-01T00:00:00Z") };\nconst copy = JSON.parse(JSON.stringify(original));\nconsole.log(typeof copy.date, copy.date); // "string", "2024-01-01T00:00:00.000Z"',
            },
          ],
        },
        {
          name: "structuredClone()",
          explanation:
            "Deeply copies supported structured-clone data such as Date, Map, Set, and cyclic object graphs.",
          note: "Requires a supported modern runtime. Functions and DOM nodes are not generally cloneable, and custom prototypes or property descriptors are not a universal preservation guarantee. Unsupported values can raise DataCloneError.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone",
          examples: [
            {
              label: "Copy supported built-in data types",
              language: "javascript",
              code: 'const original = {\n  date: new Date("2024-01-01T00:00:00Z"),\n  map: new Map([["name", "Alice"]]),\n  set: new Set([1]),\n};\nconst copy = structuredClone(original);\nconsole.log(copy.date.getUTCFullYear(), copy.map.get("name"), copy.set.has(1));\n// 2024, "Alice", true',
            },
            {
              label: "Preserve a cycle inside the new graph",
              language: "javascript",
              code: "const original = {};\noriginal.self = original;\nconst copy = structuredClone(original);\nconsole.log(copy !== original, copy.self === copy); // true, true",
            },
          ],
        },
        {
          name: "JSON with localStorage",
          explanation:
            "Serializes a value for string-based browser storage and parses it when reading.",
          note: "Browser examples require an origin with localStorage and, for the unique missing-key example, crypto.randomUUID. Access can be unavailable or throw. Stored JSON still needs schema validation in a real application. The first example restores any previous demo-key value.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
          examples: [
            {
              label: "Round-trip a user and restore the previous demo value",
              language: "javascript",
              code: 'const key = "js-general-demo-user";\nconst previous = localStorage.getItem(key);\ntry {\n  const user = { name: "Alice", age: 30 };\n  localStorage.setItem(key, JSON.stringify(user));\n  const saved = JSON.parse(localStorage.getItem(key));\n  console.log(saved.name, saved.age); // "Alice", 30\n} finally {\n  if (previous === null) localStorage.removeItem(key);\n  else localStorage.setItem(key, previous);\n}',
            },
            {
              label: "Handle an absent value before parsing",
              language: "javascript",
              code: 'const key = "js-general-missing-" + crypto.randomUUID();\nconst raw = localStorage.getItem(key);\nconst saved = raw === null ? { name: "Guest" } : JSON.parse(raw);\nconsole.log(saved.name); // "Guest"',
            },
          ],
        },
        {
          name: "Parse a JSON API response",
          explanation:
            "Uses response.json() to consume an HTTP response body and parse its JSON without waiting for the result.",
          note: "Run each independent file pair through an HTTP server, for example python3 -m http.server 8000 in that example folder, then open its index.html. The local JSON file stands in for an API endpoint. response.json() returns a promise and can reject on malformed JSON; it is not merely a synchronous shorthand call to JSON.parse.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Response/json",
          examples: [
            {
              label: "Fetch and parse an actual locally served JSON response",
              files: [
                {
                  path: "data.json",
                  language: "json",
                  code: '{ "name": "Alice", "age": 30 }',
                },
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>JSON response example</title>\n<script type="module">\n  const response = await fetch("./data.json");\n  if (!response.ok) throw new Error(`HTTP ${response.status}`);\n  const data = await response.json();\n  console.log(data.name, data.age); // "Alice", 30\n</script>',
                },
              ],
            },
            {
              label: "Catch malformed JSON from a successful HTTP response",
              files: [
                {
                  path: "data.txt",
                  language: "none",
                  code: "not valid JSON",
                },
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>Invalid JSON response example</title>\n<script type="module">\n  try {\n    const response = await fetch("./data.txt");\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    await response.json();\n  } catch (error) {\n    console.log(error.name); // "SyntaxError"\n  }\n</script>',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'The "this" Keyword',
      id: "this-keyword",
      intro:
        "Binding rules → explicit binding with call, apply, and bind. Run snippets independently. Browser-only examples include complete HTML files; Node.js examples specify .cjs or .mjs so top-level behavior is reproducible.",
      methods: [
        {
          name: "Global and module this",
          explanation:
            "The top-level this value depends on whether code runs as a script or a module.",
          note: "In browser classic scripts, top-level this is window even with a leading strict directive. ES modules have undefined top-level this; Node.js CommonJS files have module.exports, not globalThis.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
          examples: [
            {
              label: "Browser classic script, including strict mode",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>This binding example</title>\n<button id="demo">Run example</button>\n<script>\n  "use strict";\n  console.log(this === window); // true\n</script>',
                },
              ],
            },
            {
              label:
                "Node.js CommonJS: save as example.cjs and run node example.cjs",
              files: [
                {
                  path: "example.cjs",
                  language: "javascript",
                  code: "console.log(this === module.exports); // true\nconsole.log(this === globalThis); // false",
                },
              ],
            },
            {
              label: "ES module: save as example.mjs and run node example.mjs",
              files: [
                {
                  path: "example.mjs",
                  language: "javascript",
                  code: 'console.log(this); // undefined\nconsole.log(typeof globalThis); // "object"',
                },
              ],
            },
          ],
        },
        {
          name: "Ordinary function calls",
          explanation:
            "Determines this from how an ordinary function is called.",
          note: "Strictness belongs to the called function. A use strict directive must be in its directive prologue.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
          examples: [
            {
              label: "Non-strict standalone call",
              language: "javascript",
              code: "function receiver() {\n  return this;\n}\nconsole.log(receiver() === globalThis); // true",
            },
            {
              label: "Strict standalone call",
              language: "javascript",
              code: 'function receiver() {\n  "use strict";\n  return this;\n}\nconsole.log(receiver()); // undefined',
            },
          ],
        },
        {
          name: "Object method this",
          explanation:
            "Uses the object before the dot as the receiver of an ordinary method call.",
          note: "The receiver is chosen at the call site, not permanently attached to the original object.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
          examples: [
            {
              label: "Call a method on its object",
              language: "javascript",
              code: 'const person = {\n  name: "John",\n  greet() {\n    return this.name;\n  },\n};\nconsole.log(person.greet()); // "John"',
            },
            {
              label: "Borrow a method through another object",
              language: "javascript",
              code: 'const person = {\n  name: "John",\n  greet() {\n    return this.name;\n  },\n};\nconst other = { name: "Jane", greet: person.greet };\nconsole.log(other.greet()); // "Jane"',
            },
          ],
        },
        {
          name: "Arrow function lexical this",
          explanation:
            "Captures this from the surrounding scope instead of creating a receiver for each call.",
          note: "An arrow property in an object literal does not capture the object itself. call, apply, and bind cannot replace an arrow’s lexical this.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
          examples: [
            {
              label: "Capture the surrounding method receiver",
              language: "javascript",
              code: 'const person = {\n  name: "John",\n  greet() {\n    const arrow = () => this.name;\n    return arrow();\n  },\n};\nconsole.log(person.greet()); // "John"',
            },
            {
              label: "An object literal does not establish this",
              language: "javascript",
              code: 'function build() {\n  return { name: "Inner", greet: () => this.name };\n}\nconst person = build.call({ name: "Outer" });\nconsole.log(person.greet.call({ name: "Other" })); // "Outer"',
            },
          ],
        },
        {
          name: "this in delayed callbacks",
          explanation:
            "Passes a function to the timer host, which chooses the callback receiver independently of the enclosing method.",
          note: "These examples run in a browser. A browser timer invokes an ordinary callback with window as this, even if its body is strict; Node.js timers use a different receiver. window.name is normally a string, not necessarily undefined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
          examples: [
            {
              label: "Observe the browser timer receiver",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>This binding example</title>\n<button id="demo">Run example</button>\n<script>\n  const person = {\n    delayedGreet() {\n      setTimeout(function () {\n        "use strict";\n        console.log(this === window); // true\n      }, 0);\n    },\n  };\n  person.delayedGreet();\n</script>',
                },
              ],
            },
            {
              label: "Keep the method receiver with an arrow",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>This binding example</title>\n<button id="demo">Run example</button>\n<script>\n  const person = {\n    name: "John",\n    delayedGreet() {\n      setTimeout(() => console.log(this.name), 0);\n    },\n  };\n  person.delayedGreet(); // "John"\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Detached methods",
          explanation:
            "Loses the original object receiver when a method is saved and invoked as a standalone function.",
          note: "A strict detached method receives undefined; reading this.name then throws TypeError.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
          examples: [
            {
              label: "Observe a detached strict method",
              language: "javascript",
              code: 'const person = {\n  name: "John",\n  greet() {\n    "use strict";\n    return this.name;\n  },\n};\nconst greet = person.greet;\ntry {\n  greet();\n} catch (error) {\n  console.log(error.name);\n} // "TypeError"',
            },
            {
              label: "Supply the missing receiver",
              language: "javascript",
              code: 'const person = {\n  name: "John",\n  greet() {\n    return this.name;\n  },\n};\nconst greet = person.greet;\nconsole.log(greet.call(person)); // "John"',
            },
          ],
        },
        {
          name: "Constructor function this",
          explanation:
            "Receives the newly created instance when an ordinary function is invoked with new.",
          note: "Arrow functions cannot be used as constructors. These examples use constructors that do not return a replacement object.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
          examples: [
            {
              label: "Initialize a new instance",
              language: "javascript",
              code: 'function Person(name) {\n  this.name = name;\n}\nconst john = new Person("John");\nconsole.log(john.name, john instanceof Person); // "John", true',
            },
            {
              label: "Keep instance state separate",
              language: "javascript",
              code: 'function Person(name) {\n  this.name = name;\n}\nconst john = new Person("John");\nconst jane = new Person("Jane");\nconsole.log(john.name, jane.name); // "John", "Jane"',
            },
          ],
        },
        {
          name: "Class methods and arrow fields",
          explanation:
            "Uses the instance as this during construction and ordinary instance method calls.",
          note: "Class bodies are strict. Prototype methods still depend on their call receiver; an arrow field creates a separate function on each instance.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
          examples: [
            {
              label: "Call an instance method",
              language: "javascript",
              code: 'class User {\n  constructor(name) {\n    this.name = name;\n  }\n  greet() {\n    return this.name;\n  }\n}\nconsole.log(new User("John").greet()); // "John"',
            },
            {
              label: "Detach an arrow field safely",
              language: "javascript",
              code: 'class User {\n  constructor(name) {\n    this.name = name;\n  }\n  greet = () => this.name;\n}\nconst user = new User("Jane");\nconst greet = user.greet;\nconsole.log(greet()); // "Jane"',
            },
          ],
        },
        {
          name: "this in DOM event handlers",
          explanation:
            "Receives the listener’s currentTarget in an ordinary addEventListener callback.",
          note: "Run these independent HTML files in a browser. The top-level arrow in the module example captures undefined; it does not acquire the button receiver.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
          examples: [
            {
              label: "Ordinary listener receives the button",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>This binding example</title>\n<button id="demo">Run example</button>\n<script>\n  const button = document.querySelector("#demo");\n  button.addEventListener("click", function (event) {\n    console.log(this === button, this === event.currentTarget); // true, true\n  });\n  button.click();\n</script>',
                },
              ],
            },
            {
              label: "Module arrow uses lexical this",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>This binding example</title>\n<button id="demo">Run example</button>\n<script type="module">\n  const button = document.querySelector("#demo");\n  button.addEventListener("click", (event) => {\n    console.log(this === undefined, event.currentTarget === button); // true, true\n  });\n  button.click();\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Function.prototype.call()",
          explanation:
            "Invokes a function immediately with a supplied this value and individually listed arguments.",
          note: "An ordinary function can use the supplied receiver; an arrow keeps its lexical this.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call",
          examples: [
            {
              label: "Borrow a greeting method",
              language: "javascript",
              code: 'const person = {\n  name: "John",\n  greet(greeting, punctuation) {\n    return `${greeting}, I\'m ${this.name}${punctuation}`;\n  },\n};\nconsole.log(person.greet.call({ name: "Jane" }, "Hello", "!"));\n// "Hello, I\'m Jane!"',
            },
            {
              label: "Pass several individual arguments",
              language: "javascript",
              code: "function total(a, b) {\n  return this.base + a + b;\n}\nconsole.log(total.call({ base: 10 }, 2, 3)); // 15",
            },
          ],
        },
        {
          name: "Function.prototype.apply()",
          explanation:
            "Invokes a function immediately with a supplied this value and an array-like argument list.",
          note: "apply accepts an array-like object; it differs from call in how arguments are supplied.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply",
          examples: [
            {
              label: "Supply greeting arguments as an array",
              language: "javascript",
              code: 'function greet(greeting, punctuation) {\n  return `${greeting}, I\'m ${this.name}${punctuation}`;\n}\nconsole.log(greet.apply({ name: "Jane" }, ["Hi", "."]));\n// "Hi, I\'m Jane."',
            },
            {
              label: "Use an array-like argument list",
              language: "javascript",
              code: "function total(a, b) {\n  return this.base + a + b;\n}\nconsole.log(total.apply({ base: 10 }, { 0: 2, 1: 3, length: 2 })); // 15",
            },
          ],
        },
        {
          name: "Math methods with apply()",
          explanation:
            "Expands a short numeric array into arguments for a Math function.",
          note: "Math.max does not use this, so null is suitable here. Both approaches pass every value as a function argument and are unsuitable for arbitrarily large arrays.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply",
          examples: [
            {
              label: "Find a maximum with apply",
              language: "javascript",
              code: "const numbers = [5, 6, 2, 3, 7];\nconsole.log(Math.max.apply(null, numbers)); // 7",
            },
            {
              label: "Use modern spread syntax",
              language: "javascript",
              code: "const numbers = [5, 6, 2, 3, 7];\nconsole.log(Math.max(...numbers)); // 7",
            },
          ],
        },
        {
          name: "Function.prototype.bind()",
          explanation:
            "Creates a new function with a fixed receiver without invoking the original immediately.",
          note: "For ordinary calls, later call/apply or another bind cannot replace the bound receiver. A bound constructor invoked with new uses the newly constructed instance instead.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind",
          examples: [
            {
              label: "Create a bound greeting",
              language: "javascript",
              code: 'function greet(greeting, punctuation) {\n  return `${greeting}, I\'m ${this.name}${punctuation}`;\n}\nconst greetJane = greet.bind({ name: "Jane" });\nconsole.log(greetJane("Hey", "?")); // "Hey, I\'m Jane?"',
            },
            {
              label: "Keep the fixed receiver on a later call",
              language: "javascript",
              code: 'function readName() {\n  return this.name;\n}\nconst bound = readName.bind({ name: "Jane" });\nconsole.log(bound.call({ name: "John" })); // "Jane"',
            },
          ],
        },
        {
          name: "Partial application with bind()",
          explanation:
            "Pre-fills leading arguments while creating a bound function.",
          note: "New call arguments follow the arguments supplied to bind; binding does not invoke the function.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind",
          examples: [
            {
              label: "Pre-fill the greeting",
              language: "javascript",
              code: 'function greet(greeting, punctuation) {\n  return `${greeting}, I\'m ${this.name}${punctuation}`;\n}\nconst helloJane = greet.bind({ name: "Jane" }, "Hello");\nconsole.log(helloJane("!")); // "Hello, I\'m Jane!"',
            },
            {
              label: "Pre-fill a numeric argument",
              language: "javascript",
              code: "function add(a, b) {\n  return a + b;\n}\nconst addTen = add.bind(null, 10);\nconsole.log(addTen(5)); // 15",
            },
          ],
        },
        {
          name: "Preserve this in timer callbacks",
          explanation:
            "Keeps an object method’s receiver when scheduling it for later execution.",
          note: "Run these examples in a browser. Binding captures the current method and receiver; the arrow looks up the method through the object when it executes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this",
          examples: [
            {
              label: "Bind the callback receiver",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>This binding example</title>\n<button id="demo">Run example</button>\n<script>\n  const counter = {\n    count: 0,\n    increment() {\n      this.count++;\n    },\n  };\n  const increment = counter.increment.bind(counter);\n  setTimeout(() => {\n    increment();\n    console.log(counter.count); // 1\n  }, 0);\n</script>',
                },
              ],
            },
            {
              label: "Call through the object inside an arrow",
              files: [
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<meta charset="utf-8" />\n<title>This binding example</title>\n<button id="demo">Run example</button>\n<script>\n  const counter = {\n    count: 0,\n    increment() {\n      this.count++;\n    },\n  };\n  setTimeout(() => {\n    counter.increment();\n    console.log(counter.count); // 1\n  }, 0);\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Bind class callback methods",
          explanation:
            "Binds a class method in its constructor so a detached callback still receives the instance.",
          note: "This standalone class demonstrates the binding pattern used in React class components without requiring React. Constructor binding creates an own function property that shadows the prototype method.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind",
          examples: [
            {
              label: "Bind in the constructor",
              language: "javascript",
              code: 'class Component {\n  constructor() {\n    this.name = "Component";\n    this.handleClick = this.handleClick.bind(this);\n  }\n  handleClick() {\n    return this.name;\n  }\n}\nconst component = new Component();\nconst callback = component.handleClick;\nconsole.log(callback()); // "Component"',
            },
            {
              label: "Keep callbacks attached to their own instances",
              language: "javascript",
              code: 'class Component {\n  constructor(name) {\n    this.name = name;\n    this.handleClick = this.handleClick.bind(this);\n  }\n  handleClick() {\n    return this.name;\n  }\n}\nconst first = new Component("First");\nconst second = new Component("Second");\nconst callbacks = [first.handleClick, second.handleClick];\nconsole.log(callbacks[0](), callbacks[1]()); // "First", "Second"',
            },
          ],
        },
      ],
    },
    {
      name: "Prototypes & Inheritance",
      id: "prototypes-inheritance",
      intro:
        "Prototype Basics → Prototypal Inheritance. Run every example independently in a modern browser or Node.js. Prototype links provide delegation; constructor calls initialize instance state.",
      methods: [
        {
          name: "Prototype chains and legacy __proto__",
          explanation:
            "Looks up a missing property on successive prototypes until reaching null.",
          note: "Every ordinary object has an internal prototype link whose value is an object or null. The legacy __proto__ accessor is deprecated and may be absent or shadowed; a constructor’s .prototype is a separate ordinary property.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain",
          examples: [
            {
              label: "Inspect the ordinary object chain",
              language: "javascript",
              code: "const obj = { a: 1 };\nconsole.log(Object.getPrototypeOf(obj) === Object.prototype); // true\nconsole.log(Object.getPrototypeOf(Object.prototype)); // null",
            },
            {
              label: "Recognize the legacy accessor",
              language: "javascript",
              code: "const obj = {};\nconsole.log(obj.__proto__ === Object.prototype); // true (legacy)\nconst dictionary = Object.create(null);\nconsole.log(Object.getPrototypeOf(dictionary), dictionary.__proto__); // null, undefined",
            },
          ],
        },
        {
          name: "Constructor prototypes and shared methods",
          explanation:
            "Stores reusable methods on a constructor’s prototype so instances inherit the same function.",
          note: "The prototype method receives the instance as this when called through that instance; new Person() links to Person.prototype.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain",
          examples: [
            {
              label: "Call an inherited method",
              language: "javascript",
              code: 'function Person(name) {\n  this.name = name;\n}\nPerson.prototype.greet = function () {\n  return `Hello, I\'m ${this.name}`;\n};\nconst john = new Person("John");\nconsole.log(john.greet()); // "Hello, I\'m John"',
            },
            {
              label: "Share one method between instances",
              language: "javascript",
              code: 'function Person(name) {\n  this.name = name;\n}\nPerson.prototype.greet = function () {\n  return `Hello, I\'m ${this.name}`;\n};\nconst john = new Person("John"),\n  jane = new Person("Jane");\nconsole.log(jane.greet(), john.greet === jane.greet); // "Hello, I\'m Jane", true',
            },
          ],
        },
        {
          name: "Shared prototype properties",
          explanation:
            "Makes a property available to all objects inheriting from a prototype.",
          note: "Assigning an own property shadows the inherited value. A mutable object stored on the prototype is shared by every instance that has not shadowed it.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain",
          examples: [
            {
              label: "Read a shared default",
              language: "javascript",
              code: 'function Person(name) {\n  this.name = name;\n}\nPerson.prototype.greet = function () {\n  return `Hello, I\'m ${this.name}`;\n};\nPerson.prototype.species = "Homo sapiens";\nconst john = new Person("John"),\n  jane = new Person("Jane");\nconsole.log(john.species, jane.species); // "Homo sapiens", "Homo sapiens"',
            },
            {
              label: "Shadow without changing the prototype",
              language: "javascript",
              code: 'function Person(name) {\n  this.name = name;\n}\nPerson.prototype.greet = function () {\n  return `Hello, I\'m ${this.name}`;\n};\nPerson.prototype.species = "Homo sapiens";\nconst john = new Person("John"),\n  jane = new Person("Jane");\njohn.species = "custom";\nconsole.log(john.species, jane.species); // "custom", "Homo sapiens"',
            },
          ],
        },
        {
          name: "Own properties and inherited lookup",
          explanation:
            "Distinguishes data stored directly on an object from properties found along its prototype chain.",
          note: "hasOwnProperty() does not search the chain. A nearer property shadows a farther one; deleting an own property can reveal its inherited counterpart.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain",
          examples: [
            {
              label: "Distinguish instance state from a prototype method",
              language: "javascript",
              code: 'function Person(name) {\n  this.name = name;\n}\nPerson.prototype.greet = function () {\n  return `Hello, I\'m ${this.name}`;\n};\nconst john = new Person("John");\nconsole.log(john.hasOwnProperty("name"), john.hasOwnProperty("greet")); // true, false',
            },
            {
              label: "Reveal an inherited value after deletion",
              language: "javascript",
              code: 'const parent = { role: "reader" };\nconst user = Object.create(parent);\nuser.role = "admin";\nconsole.log(user.role); // "admin"\ndelete user.role;\nconsole.log(user.role, user.hasOwnProperty("role")); // "reader", false',
            },
          ],
        },
        {
          name: "instanceof",
          explanation:
            "Checks whether a constructor’s prototype appears in an object’s prototype chain under the default instanceof behavior.",
          note: "It does not check which constructor originally ran. Cross-realm objects and custom Symbol.hasInstance behavior can change the result.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof",
          examples: [
            {
              label: "Check a constructed instance",
              language: "javascript",
              code: 'function Person(name) {\n  this.name = name;\n}\nPerson.prototype.greet = function () {\n  return `Hello, I\'m ${this.name}`;\n};\nconst john = new Person("John");\nconsole.log(john instanceof Person, john instanceof Object); // true, true',
            },
            {
              label: "Check a linked object without running the constructor",
              language: "javascript",
              code: 'function Person(name) {\n  this.name = name;\n}\nPerson.prototype.greet = function () {\n  return `Hello, I\'m ${this.name}`;\n};\nconst linked = Object.create(Person.prototype);\nconsole.log(linked instanceof Person, linked.hasOwnProperty("name")); // true, false',
            },
          ],
        },
        {
          name: "Object.prototype.isPrototypeOf()",
          explanation:
            "Checks whether a particular object appears anywhere in another object’s prototype chain.",
          note: "The method is called on the prototype itself, such as Person.prototype.isPrototypeOf(john), not on Person.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf",
          examples: [
            {
              label: "Check the instance prototype",
              language: "javascript",
              code: 'function Person(name) {\n  this.name = name;\n}\nPerson.prototype.greet = function () {\n  return `Hello, I\'m ${this.name}`;\n};\nconsole.log(Person.prototype.isPrototypeOf(new Person("John"))); // true',
            },
            {
              label: "Check an indirect ancestor",
              language: "javascript",
              code: "const ancestor = {},\n  parent = Object.create(ancestor);\nconst child = Object.create(parent);\nconsole.log(ancestor.isPrototypeOf(child), child.isPrototypeOf(ancestor)); // true, false",
            },
          ],
        },
        {
          name: "Object.create()",
          explanation:
            "Creates a new object linked to the supplied prototype without running a constructor.",
          note: "The new object inherits rather than copies prototype properties. Object.create(null) has no inherited Object.prototype methods.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create",
          examples: [
            {
              label: "Combine inherited and own methods",
              language: "javascript",
              code: 'const animal = {\n  speak() {\n    return "Some sound";\n  },\n};\nconst dog = Object.create(animal);\ndog.bark = function () {\n  return "Woof!";\n};\nconsole.log(dog.speak(), dog.bark()); // "Some sound", "Woof!"',
            },
            {
              label: "Create a dictionary without inherited keys",
              language: "javascript",
              code: 'const dictionary = Object.create(null);\ndictionary.name = "Max";\nconsole.log(dictionary.name, "toString" in dictionary); // "Max", false',
            },
          ],
        },
        {
          name: "Object.getPrototypeOf()",
          explanation: "Returns an object’s direct prototype.",
          note: "It returns the immediate link, not every ancestor; repeat the call to walk farther up the chain.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf",
          examples: [
            {
              label: "Inspect a constructed instance",
              language: "javascript",
              code: 'function Person(name) {\n  this.name = name;\n}\nPerson.prototype.greet = function () {\n  return `Hello, I\'m ${this.name}`;\n};\nconst john = new Person("John");\nconsole.log(Object.getPrototypeOf(john) === Person.prototype); // true',
            },
            {
              label: "Walk two links",
              language: "javascript",
              code: "const ancestor = {},\n  parent = Object.create(ancestor);\nconst child = Object.create(parent);\nconsole.log(Object.getPrototypeOf(Object.getPrototypeOf(child)) === ancestor); // true",
            },
          ],
        },
        {
          name: "Object.setPrototypeOf()",
          explanation: "Changes an existing object’s direct prototype.",
          note: "Prefer Object.create() when creating the object: changing a prototype later can hurt performance. Cyclic links and prohibited changes throw TypeError.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf",
          examples: [
            {
              label: "Change the inherited behavior",
              language: "javascript",
              code: 'const obj = { name: "Max" };\nconst newProto = {\n  speak() {\n    return this.name + " speaks";\n  },\n};\nObject.setPrototypeOf(obj, newProto);\nconsole.log(obj.speak(), Object.getPrototypeOf(obj) === newProto); // "Max speaks", true',
            },
            {
              label: "Reject a prototype cycle",
              language: "javascript",
              code: 'const parent = {},\n  child = Object.create(parent);\ntry {\n  Object.setPrototypeOf(parent, child);\n} catch (error) {\n  console.log(error.name);\n} // "TypeError"',
            },
          ],
        },
        {
          name: "Parent constructor calls",
          explanation:
            "Runs a parent constructor with the child instance as this to initialize inherited instance state.",
          note: "Calling the parent initializes properties but does not establish prototype inheritance. ES class constructors cannot be invoked with call().",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain",
          examples: [
            {
              label: "Initialize parent and child state",
              language: "javascript",
              code: 'function Animal(name) {\n  this.name = name;\n  this.energy = 100;\n}\nAnimal.prototype.eat = function (amount) {\n  this.energy += amount;\n  return `${this.name} is eating`;\n};\nAnimal.prototype.sleep = function () {\n  this.energy += 10;\n  return `${this.name} is sleeping`;\n};\nfunction Dog(name, breed) {\n  Animal.call(this, name);\n  this.breed = breed;\n}\nDog.prototype = Object.create(Animal.prototype);\nDog.prototype.constructor = Dog;\nconst dog = new Dog("Max", "Golden Retriever");\nconsole.log(dog.name, dog.breed, dog.energy); // "Max", "Golden Retriever", 100',
            },
            {
              label: "Keep state on each instance",
              language: "javascript",
              code: 'function Animal(name) {\n  this.name = name;\n  this.energy = 100;\n}\nAnimal.prototype.eat = function (amount) {\n  this.energy += amount;\n  return `${this.name} is eating`;\n};\nAnimal.prototype.sleep = function () {\n  this.energy += 10;\n  return `${this.name} is sleeping`;\n};\nfunction Dog(name, breed) {\n  Animal.call(this, name);\n  this.breed = breed;\n}\nDog.prototype = Object.create(Animal.prototype);\nDog.prototype.constructor = Dog;\nconst first = new Dog("Max", "Retriever"),\n  second = new Dog("Rex", "Collie");\nfirst.eat(10);\nconsole.log(first.energy, second.energy); // 110, 100',
            },
          ],
        },
        {
          name: "Constructor prototype inheritance",
          explanation:
            "Links the child constructor’s prototype to the parent prototype so instances inherit both sets of methods.",
          note: "Replacing Child.prototype removes its original constructor property. Restoring constructor is metadata; the prototype links establish inheritance. Direct assignment makes the restored property enumerable.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain",
          examples: [
            {
              label: "Inherit methods and check both constructors",
              language: "javascript",
              code: 'function Animal(name) {\n  this.name = name;\n  this.energy = 100;\n}\nAnimal.prototype.eat = function (amount) {\n  this.energy += amount;\n  return `${this.name} is eating`;\n};\nAnimal.prototype.sleep = function () {\n  this.energy += 10;\n  return `${this.name} is sleeping`;\n};\nfunction Dog(name, breed) {\n  Animal.call(this, name);\n  this.breed = breed;\n}\nDog.prototype = Object.create(Animal.prototype);\nDog.prototype.constructor = Dog;\nconst dog = new Dog("Max", "Retriever");\nconsole.log(dog.sleep(), dog.energy); // "Max is sleeping", 110\nconsole.log(dog instanceof Dog, dog instanceof Animal); // true, true',
            },
            {
              label: "Inspect the restored constructor and parent link",
              language: "javascript",
              code: 'function Animal(name) {\n  this.name = name;\n  this.energy = 100;\n}\nAnimal.prototype.eat = function (amount) {\n  this.energy += amount;\n  return `${this.name} is eating`;\n};\nAnimal.prototype.sleep = function () {\n  this.energy += 10;\n  return `${this.name} is sleeping`;\n};\nfunction Dog(name, breed) {\n  Animal.call(this, name);\n  this.breed = breed;\n}\nDog.prototype = Object.create(Animal.prototype);\nDog.prototype.constructor = Dog;\nconst dog = new Dog("Max", "Retriever");\nconsole.log(dog.constructor === Dog); // true\nconsole.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype); // true',
            },
          ],
        },
        {
          name: "Child-specific prototype methods",
          explanation:
            "Adds behavior to the child prototype without modifying the parent prototype.",
          note: "Inherited methods and child methods operate on the same instance state.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain",
          examples: [
            {
              label: "Combine an inherited action with a child action",
              language: "javascript",
              code: 'function Animal(name) {\n  this.name = name;\n  this.energy = 100;\n}\nAnimal.prototype.eat = function (amount) {\n  this.energy += amount;\n  return `${this.name} is eating`;\n};\nAnimal.prototype.sleep = function () {\n  this.energy += 10;\n  return `${this.name} is sleeping`;\n};\nfunction Dog(name, breed) {\n  Animal.call(this, name);\n  this.breed = breed;\n}\nDog.prototype = Object.create(Animal.prototype);\nDog.prototype.constructor = Dog;\nDog.prototype.bark = function () {\n  this.energy -= 5;\n  return "Woof!";\n};\nconst dog = new Dog("Max", "Golden Retriever");\nconsole.log(dog.eat(10), dog.bark(), dog.energy); // "Max is eating", "Woof!", 105',
            },
            {
              label: "Keep the child method off the parent",
              language: "javascript",
              code: 'function Animal(name) {\n  this.name = name;\n  this.energy = 100;\n}\nAnimal.prototype.eat = function (amount) {\n  this.energy += amount;\n  return `${this.name} is eating`;\n};\nAnimal.prototype.sleep = function () {\n  this.energy += 10;\n  return `${this.name} is sleeping`;\n};\nfunction Dog(name, breed) {\n  Animal.call(this, name);\n  this.breed = breed;\n}\nDog.prototype = Object.create(Animal.prototype);\nDog.prototype.constructor = Dog;\nDog.prototype.bark = function () {\n  return "Woof!";\n};\nconsole.log(\n  typeof new Dog("Max", "Retriever").bark,\n  typeof new Animal("Cat").bark,\n); // "function", "undefined"',
            },
          ],
        },
        {
          name: "Override inherited methods",
          explanation:
            "Defines a nearer method with the same name to replace inherited behavior during lookup.",
          note: "The parent method remains available through the parent prototype and can be invoked explicitly with call().",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain",
          examples: [
            {
              label: "Specialize the parent behavior",
              language: "javascript",
              code: 'function Animal(name) {\n  this.name = name;\n  this.energy = 100;\n}\nAnimal.prototype.eat = function (amount) {\n  this.energy += amount;\n  return `${this.name} is eating`;\n};\nAnimal.prototype.sleep = function () {\n  this.energy += 10;\n  return `${this.name} is sleeping`;\n};\nfunction Dog(name, breed) {\n  Animal.call(this, name);\n  this.breed = breed;\n}\nDog.prototype = Object.create(Animal.prototype);\nDog.prototype.constructor = Dog;\nAnimal.prototype.speak = function () {\n  return `${this.name} makes a sound`;\n};\nDog.prototype.speak = function () {\n  return `${this.name} barks loudly`;\n};\nconsole.log(new Dog("Max", "Retriever").speak()); // "Max barks loudly"',
            },
            {
              label: "Call the parent implementation from an override",
              language: "javascript",
              code: 'function Animal(name) {\n  this.name = name;\n  this.energy = 100;\n}\nAnimal.prototype.eat = function (amount) {\n  this.energy += amount;\n  return `${this.name} is eating`;\n};\nAnimal.prototype.sleep = function () {\n  this.energy += 10;\n  return `${this.name} is sleeping`;\n};\nfunction Dog(name, breed) {\n  Animal.call(this, name);\n  this.breed = breed;\n}\nDog.prototype = Object.create(Animal.prototype);\nDog.prototype.constructor = Dog;\nAnimal.prototype.speak = function () {\n  return `${this.name} makes a sound`;\n};\nDog.prototype.speak = function () {\n  return Animal.prototype.speak.call(this) + ": woof";\n};\nconsole.log(new Dog("Max", "Retriever").speak()); // "Max makes a sound: woof"',
            },
          ],
        },
        {
          name: "Factory pattern with Object.create()",
          explanation:
            "Returns initialized objects that delegate shared behavior to a methods object.",
          note: "Define the shared methods before invoking the factory. Each returned object owns its own state and shares method references.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain",
          examples: [
            {
              label: "Create and use an animal",
              language: "javascript",
              code: 'const animalMethods = {\n  eat(amount) {\n    this.energy += amount;\n  },\n  sleep() {\n    this.energy += 10;\n  },\n};\nfunction createAnimal(name) {\n  const animal = Object.create(animalMethods);\n  animal.name = name;\n  animal.energy = 100;\n  return animal;\n}\nconst animal = createAnimal("Max");\nanimal.eat(5);\nanimal.sleep();\nconsole.log(animal.name, animal.energy); // "Max", 115',
            },
            {
              label: "Share methods while keeping separate state",
              language: "javascript",
              code: 'const animalMethods = {\n  eat(amount) {\n    this.energy += amount;\n  },\n  sleep() {\n    this.energy += 10;\n  },\n};\nfunction createAnimal(name) {\n  const animal = Object.create(animalMethods);\n  animal.name = name;\n  animal.energy = 100;\n  return animal;\n}\nconst first = createAnimal("Max"),\n  second = createAnimal("Rex");\nfirst.eat(10);\nconsole.log(first.energy, second.energy, first.eat === second.eat); // 110, 100, true',
            },
          ],
        },
        {
          name: "Delegation with an init() method",
          explanation:
            "Initializes an object created from a reusable prototype and returns it for chaining.",
          note: "init is an ordinary method, not an automatic constructor hook; call it explicitly on each new object.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain",
          examples: [
            {
              label: "Initialize and describe a delegated object",
              language: "javascript",
              code: 'const Vehicle = {\n  init(make, model) {\n    this.make = make;\n    this.model = model;\n    return this;\n  },\n  describe() {\n    return `${this.make} ${this.model}`;\n  },\n};\nconst car = Object.create(Vehicle).init("Toyota", "Camry");\nconsole.log(car.describe()); // "Toyota Camry"',
            },
            {
              label: "Initialize two independent objects",
              language: "javascript",
              code: 'const Vehicle = {\n  init(make, model) {\n    this.make = make;\n    this.model = model;\n    return this;\n  },\n  describe() {\n    return `${this.make} ${this.model}`;\n  },\n};\nconst first = Object.create(Vehicle).init("Toyota", "Camry");\nconst second = Object.create(Vehicle).init("Honda", "Civic");\nconsole.log(\n  first.describe(),\n  second.describe(),\n  Object.getPrototypeOf(first) === Vehicle,\n);\n// "Toyota Camry", "Honda Civic", true',
            },
          ],
        },
      ],
    },
    {
      name: "Classes",
      id: "classes",
      intro:
        "Class Basics → Class Inheritance → private fields and methods. Run snippets independently in a modern browser or Node.js supporting public and private class fields. Each example defines its own classes and state.",
      methods: [
        {
          name: "Class declarations",
          explanation:
            "Defines a named class for constructing instances with shared behavior.",
          note: "Class bodies are strict, and classes cannot be called without new. Class declarations have a temporal dead zone before initialization.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes",
          examples: [
            {
              label: "Declare and instantiate a class",
              language: "javascript",
              code: 'class Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n  greet() {\n    return `Hello, I\'m ${this.name}`;\n  }\n}\nconsole.log(new Person("John", 30).greet()); // "Hello, I\'m John"',
            },
            {
              label: "Require construction with new",
              language: "javascript",
              code: 'class Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n  greet() {\n    return `Hello, I\'m ${this.name}`;\n  }\n}\ntry {\n  Person("John", 30);\n} catch (error) {\n  console.log(error.name);\n} // "TypeError"',
            },
          ],
        },
        {
          name: "constructor()",
          explanation: "Initializes state when new creates an instance.",
          note: "A class has at most one constructor. A derived constructor must initialize this through super() before accessing it.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor",
          examples: [
            {
              label: "Initialize instance properties",
              language: "javascript",
              code: 'class Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n  greet() {\n    return `Hello, I\'m ${this.name}`;\n  }\n}\nconst john = new Person("John", 30);\nconsole.log(john.name, john.age); // "John", 30',
            },
            {
              label: "Create independent instance state",
              language: "javascript",
              code: 'class Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n  greet() {\n    return `Hello, I\'m ${this.name}`;\n  }\n}\nconst john = new Person("John", 30),\n  jane = new Person("Jane", 25);\njohn.age++;\nconsole.log(john.age, jane.age); // 31, 25',
            },
          ],
        },
        {
          name: "Instance methods",
          explanation:
            "Defines functions on the class prototype that instances share.",
          note: "Calling instance.method() supplies the instance as this; detaching a method does not preserve that receiver.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes",
          examples: [
            {
              label: "Call a method on an instance",
              language: "javascript",
              code: 'class Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n  greet() {\n    return `Hello, I\'m ${this.name}`;\n  }\n}\nconst john = new Person("John", 30);\nconsole.log(john.greet()); // "Hello, I\'m John"',
            },
            {
              label: "Inspect the shared prototype method",
              language: "javascript",
              code: 'class Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n  greet() {\n    return `Hello, I\'m ${this.name}`;\n  }\n}\nconst john = new Person("John", 30),\n  jane = new Person("Jane", 25);\nconsole.log(john.greet === jane.greet, john.greet === Person.prototype.greet); // true, true',
            },
          ],
        },
        {
          name: "Getters",
          explanation: "Runs a method when a property is read.",
          note: "Read the property without parentheses. The getter is defined on the prototype and can compute a fresh result each time.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get",
          examples: [
            {
              label: "Read computed information",
              language: "javascript",
              code: 'class Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n  get info() {\n    return `${this.name} is ${this.age} years old`;\n  }\n}\nconsole.log(new Person("John", 30).info); // "John is 30 years old"',
            },
            {
              label: "Reflect changed state",
              language: "javascript",
              code: 'class Person {\n  constructor(name) {\n    this.name = name;\n  }\n  get info() {\n    return this.name.toUpperCase();\n  }\n}\nconst person = new Person("John");\nperson.name = "Jane";\nconsole.log(person.info); // "JANE"',
            },
          ],
        },
        {
          name: "Setters",
          explanation: "Runs a method when a property is assigned.",
          note: "A setter has exactly one parameter. split() returns strings: assigning the image’s comma-separated info value leaves age as a string unless you convert it explicitly.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set",
          examples: [
            {
              label: "Split assigned information into string properties",
              language: "javascript",
              code: 'class Person {\n  set info(value) {\n    [this.name, this.age] = value.split(",");\n  }\n}\nconst person = new Person();\nperson.info = "Jane,25";\nconsole.log(person.name, person.age, typeof person.age); // "Jane", "25", "string"',
            },
            {
              label: "Convert age while pairing a setter and getter",
              language: "javascript",
              code: 'class Person {\n  set info(value) {\n    const [name, age] = value.split(",");\n    this.name = name;\n    this.age = Number(age);\n  }\n  get info() {\n    return `${this.name} is ${this.age} years old`;\n  }\n}\nconst person = new Person();\nperson.info = "Jane,25";\nconsole.log(person.info, typeof person.age); // "Jane is 25 years old", "number"',
            },
          ],
        },
        {
          name: "Static methods",
          explanation:
            "Defines a method on the class itself rather than its instance prototype.",
          note: "Invoke Person.species(), not person.species(). A static method’s this is the class through which it was called.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static",
          examples: [
            {
              label: "Call a class-level method",
              language: "javascript",
              code: 'class Person {\n  static species() {\n    return "Homo sapiens";\n  }\n}\nconsole.log(Person.species()); // "Homo sapiens"',
            },
            {
              label: "Distinguish class and instance members",
              language: "javascript",
              code: 'class Person {\n  static species() {\n    return "Homo sapiens";\n  }\n}\nconsole.log(typeof Person.species, typeof new Person().species); // "function", "undefined"',
            },
          ],
        },
        {
          name: "Static properties",
          explanation: "Stores a public field on the class object.",
          note: "Static fields are not instance fields. Updating a static counter requires explicit code; declaring population = 0 alone does not count instances.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static",
          examples: [
            {
              label: "Read a static field",
              language: "javascript",
              code: "class Person {\n  static population = 0;\n}\nconsole.log(Person.population, new Person().population); // 0, undefined",
            },
            {
              label: "Maintain a shared counter explicitly",
              language: "javascript",
              code: "class Person {\n  static population = 0;\n  constructor() {\n    Person.population++;\n  }\n}\nnew Person();\nnew Person();\nconsole.log(Person.population); // 2",
            },
          ],
        },
        {
          name: "Class expressions",
          explanation: "Creates a class as the value of an expression.",
          note: "The variable cannot be read before its initialization. Assigning a class expression does not instantiate it.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class",
          examples: [
            {
              label: "Assign an anonymous class expression",
              language: "javascript",
              code: 'const Animal = class {\n  constructor(name) {\n    this.name = name;\n  }\n};\nconsole.log(new Animal("Max").name); // "Max"',
            },
            {
              label: "Pass a class expression as a value",
              language: "javascript",
              code: 'function create(Type) {\n  return new Type("Rex");\n}\nconst animal = create(\n  class {\n    constructor(name) {\n      this.name = name;\n    }\n  },\n);\nconsole.log(animal.name); // "Rex"',
            },
          ],
        },
        {
          name: "Named class expressions",
          explanation:
            "Gives a class expression a name that is visible inside its own body.",
          note: "The inner name does not introduce a binding in the surrounding scope.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class",
          examples: [
            {
              label: "Construct through the outer variable",
              language: "javascript",
              code: 'const Dog = class DogClass {\n  constructor(name) {\n    this.name = name;\n  }\n};\nconsole.log(new Dog("Max").name, typeof DogClass); // "Max", "undefined"',
            },
            {
              label: "Reference the internal class name",
              language: "javascript",
              code: "const Dog = class DogClass {\n  static identity() {\n    return DogClass;\n  }\n};\nconsole.log(Dog.identity() === Dog); // true",
            },
          ],
        },
        {
          name: "Classes and prototypes",
          explanation:
            "Uses function objects and prototype links to implement class behavior.",
          note: "typeof Class is function, but a class still requires new. Ordinary instance methods live on Class.prototype and are non-enumerable.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes",
          examples: [
            {
              label: "Inspect the class and its method",
              language: "javascript",
              code: 'class Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n  greet() {\n    return `Hello, I\'m ${this.name}`;\n  }\n}\nconsole.log(typeof Person, typeof Person.prototype.greet); // "function", "function"',
            },
            {
              label: "Verify the prototype link and method visibility",
              language: "javascript",
              code: 'class Person {\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n  greet() {\n    return `Hello, I\'m ${this.name}`;\n  }\n}\nconst person = new Person("John", 30);\nconsole.log(Object.getPrototypeOf(person) === Person.prototype); // true\nconsole.log(Object.keys(Person.prototype).length); // 0',
            },
          ],
        },
        {
          name: "extends",
          explanation:
            "Creates a subclass that inherits instance behavior and static members from its parent.",
          note: "The instance prototype chain and the class constructor chain are both linked. Inherited instance methods operate on the child instance.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends",
          examples: [
            {
              label: "Add behavior while inheriting parent methods",
              language: "javascript",
              code: 'class Animal {\n  constructor(name) {\n    this.name = name;\n    this.energy = 100;\n  }\n  speak() {\n    return `${this.name} makes a sound`;\n  }\n  eat(amount) {\n    this.energy += amount;\n    return `${this.name} is eating`;\n  }\n  sleep() {\n    this.energy += 10;\n    return `${this.name} is sleeping`;\n  }\n  static kingdom() {\n    return "Animalia";\n  }\n}\nclass Dog extends Animal {\n  constructor(name, breed) {\n    super(name);\n    this.breed = breed;\n  }\n  bark() {\n    this.energy -= 5;\n    return "Woof!";\n  }\n}\nconst max = new Dog("Max", "Golden Retriever");\nconsole.log(max.name, max.breed, max.speak(), max.bark());\n// "Max", "Golden Retriever", "Max makes a sound", "Woof!"',
            },
            {
              label: "Inherit an instance method without a custom constructor",
              language: "javascript",
              code: 'class Animal {\n  constructor(name) {\n    this.name = name;\n    this.energy = 100;\n  }\n  speak() {\n    return `${this.name} makes a sound`;\n  }\n  eat(amount) {\n    this.energy += amount;\n    return `${this.name} is eating`;\n  }\n  sleep() {\n    this.energy += 10;\n    return `${this.name} is sleeping`;\n  }\n  static kingdom() {\n    return "Animalia";\n  }\n}\nclass Dog extends Animal {}\nconst max = new Dog("Max");\nconsole.log(max.sleep(), max.energy); // "Max is sleeping", 110',
            },
          ],
        },
        {
          name: "super() in derived constructors",
          explanation:
            "Invokes the parent constructor and initializes this in a derived constructor.",
          note: "A missing constructor in a derived class forwards construction to the parent automatically. Accessing this before super() throws ReferenceError.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super",
          examples: [
            {
              label: "Initialize parent state before child state",
              language: "javascript",
              code: 'class Animal {\n  constructor(name) {\n    this.name = name;\n    this.energy = 100;\n  }\n  speak() {\n    return `${this.name} makes a sound`;\n  }\n  eat(amount) {\n    this.energy += amount;\n    return `${this.name} is eating`;\n  }\n  sleep() {\n    this.energy += 10;\n    return `${this.name} is sleeping`;\n  }\n  static kingdom() {\n    return "Animalia";\n  }\n}\nclass Dog extends Animal {\n  constructor(name, breed) {\n    super(name);\n    this.breed = breed;\n  }\n  bark() {\n    this.energy -= 5;\n    return "Woof!";\n  }\n}\nconst max = new Dog("Max", "Golden Retriever");\nconsole.log(max.name, max.breed, max.energy); // "Max", "Golden Retriever", 100',
            },
            {
              label: "Observe the this-before-super error",
              language: "javascript",
              code: 'class Animal {\n  constructor(name) {\n    this.name = name;\n    this.energy = 100;\n  }\n  speak() {\n    return `${this.name} makes a sound`;\n  }\n  eat(amount) {\n    this.energy += amount;\n    return `${this.name} is eating`;\n  }\n  sleep() {\n    this.energy += 10;\n    return `${this.name} is sleeping`;\n  }\n  static kingdom() {\n    return "Animalia";\n  }\n}\nclass Dog extends Animal {\n  constructor(name) {\n    this.name = name;\n    super(name);\n  }\n}\ntry {\n  new Dog("Max");\n} catch (error) {\n  console.log(error.name);\n} // "ReferenceError"',
            },
          ],
        },
        {
          name: "Override class methods",
          explanation:
            "Defines a child method with the same name as an inherited method.",
          note: "The parent implementation remains on the parent prototype; the child method is found first during normal instance lookup.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes",
          examples: [
            {
              label: "Replace inherited speaking behavior",
              language: "javascript",
              code: 'class Animal {\n  constructor(name) {\n    this.name = name;\n    this.energy = 100;\n  }\n  speak() {\n    return `${this.name} makes a sound`;\n  }\n  eat(amount) {\n    this.energy += amount;\n    return `${this.name} is eating`;\n  }\n  sleep() {\n    this.energy += 10;\n    return `${this.name} is sleeping`;\n  }\n  static kingdom() {\n    return "Animalia";\n  }\n}\nclass Dog extends Animal {\n  speak() {\n    return `${this.name} barks: Woof!`;\n  }\n}\nconsole.log(new Dog("Max").speak()); // "Max barks: Woof!"',
            },
            {
              label: "Leave the parent implementation unchanged",
              language: "javascript",
              code: 'class Animal {\n  constructor(name) {\n    this.name = name;\n    this.energy = 100;\n  }\n  speak() {\n    return `${this.name} makes a sound`;\n  }\n  eat(amount) {\n    this.energy += amount;\n    return `${this.name} is eating`;\n  }\n  sleep() {\n    this.energy += 10;\n    return `${this.name} is sleeping`;\n  }\n  static kingdom() {\n    return "Animalia";\n  }\n}\nclass Dog extends Animal {\n  speak() {\n    return "Woof!";\n  }\n}\nconsole.log(new Animal("Cat").speak(), new Dog("Max").speak()); // "Cat makes a sound", "Woof!"',
            },
          ],
        },
        {
          name: "super.method()",
          explanation:
            "Calls a parent implementation while keeping the current this receiver.",
          note: "super resolves from the method’s defining class, while this still refers to the child instance.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super",
          examples: [
            {
              label: "Extend the parent eat operation",
              language: "javascript",
              code: 'class Animal {\n  constructor(name) {\n    this.name = name;\n    this.energy = 100;\n  }\n  speak() {\n    return `${this.name} makes a sound`;\n  }\n  eat(amount) {\n    this.energy += amount;\n    return `${this.name} is eating`;\n  }\n  sleep() {\n    this.energy += 10;\n    return `${this.name} is sleeping`;\n  }\n  static kingdom() {\n    return "Animalia";\n  }\n}\nclass Dog extends Animal {\n  eat(amount) {\n    return `${super.eat(amount)} (tail wagging)`;\n  }\n}\nconst max = new Dog("Max");\nconsole.log(max.eat(10), max.energy); // "Max is eating (tail wagging)", 110',
            },
            {
              label: "Reuse the parent operation in a child action",
              language: "javascript",
              code: 'class Animal {\n  constructor(name) {\n    this.name = name;\n    this.energy = 100;\n  }\n  speak() {\n    return `${this.name} makes a sound`;\n  }\n  eat(amount) {\n    this.energy += amount;\n    return `${this.name} is eating`;\n  }\n  sleep() {\n    this.energy += 10;\n    return `${this.name} is sleeping`;\n  }\n  static kingdom() {\n    return "Animalia";\n  }\n}\nclass Dog extends Animal {\n  rest() {\n    return super.sleep() + " peacefully";\n  }\n}\nconst max = new Dog("Max");\nconsole.log(max.rest(), max.energy); // "Max is sleeping peacefully", 110',
            },
          ],
        },
        {
          name: "Static method inheritance",
          explanation:
            "Makes parent static members available through a subclass constructor.",
          note: "Static inheritance belongs to the class objects, not the instances. A static method invoked through the child receives the child class as this.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static",
          examples: [
            {
              label: "Call inherited and child-specific static methods",
              language: "javascript",
              code: 'class Animal {\n  constructor(name) {\n    this.name = name;\n    this.energy = 100;\n  }\n  speak() {\n    return `${this.name} makes a sound`;\n  }\n  eat(amount) {\n    this.energy += amount;\n    return `${this.name} is eating`;\n  }\n  sleep() {\n    this.energy += 10;\n    return `${this.name} is sleeping`;\n  }\n  static kingdom() {\n    return "Animalia";\n  }\n}\nclass Dog extends Animal {\n  static family() {\n    return "Canidae";\n  }\n}\nconsole.log(Dog.kingdom(), Dog.family()); // "Animalia", "Canidae"',
            },
            {
              label: "Observe the class receiver in an inherited static method",
              language: "javascript",
              code: 'class Animal {\n  static identify() {\n    return this.name;\n  }\n}\nclass Dog extends Animal {}\nconsole.log(Dog.identify(), typeof new Dog().identify); // "Dog", "undefined"',
            },
          ],
        },
        {
          name: "instanceof with classes",
          explanation:
            "Checks whether a class prototype appears in an instance’s prototype chain under the default behavior.",
          note: "A subclass instance normally matches both classes. This is a prototype relationship check, not a check of an object’s properties.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof",
          examples: [
            {
              label: "Check child and parent relationships",
              language: "javascript",
              code: 'class Animal {\n  constructor(name) {\n    this.name = name;\n    this.energy = 100;\n  }\n  speak() {\n    return `${this.name} makes a sound`;\n  }\n  eat(amount) {\n    this.energy += amount;\n    return `${this.name} is eating`;\n  }\n  sleep() {\n    this.energy += 10;\n    return `${this.name} is sleeping`;\n  }\n  static kingdom() {\n    return "Animalia";\n  }\n}\nclass Dog extends Animal {\n  constructor(name, breed) {\n    super(name);\n    this.breed = breed;\n  }\n  bark() {\n    this.energy -= 5;\n    return "Woof!";\n  }\n}\nconst max = new Dog("Max", "Retriever");\nconsole.log(max instanceof Dog, max instanceof Animal); // true, true',
            },
            {
              label: "A parent instance does not become a child instance",
              language: "javascript",
              code: 'class Animal {\n  constructor(name) {\n    this.name = name;\n    this.energy = 100;\n  }\n  speak() {\n    return `${this.name} makes a sound`;\n  }\n  eat(amount) {\n    this.energy += amount;\n    return `${this.name} is eating`;\n  }\n  sleep() {\n    this.energy += 10;\n    return `${this.name} is sleeping`;\n  }\n  static kingdom() {\n    return "Animalia";\n  }\n}\nclass Dog extends Animal {\n  constructor(name, breed) {\n    super(name);\n    this.breed = breed;\n  }\n  bark() {\n    this.energy -= 5;\n    return "Woof!";\n  }\n}\nconst animal = new Animal("Cat");\nconsole.log(animal instanceof Animal, animal instanceof Dog); // true, false',
            },
          ],
        },
        {
          name: "Private fields",
          explanation:
            "Declares instance state with a # name that can only be accessed from the declaring class’s code.",
          note: 'Private names are not ordinary string properties and are not directly accessible in subclasses. An undeclared external # access is a syntax error; bracket access to "#name" does not read the private field.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements",
          examples: [
            {
              label: "Read private state through a public method",
              language: "javascript",
              code: 'class Person {\n  #privateField = "secret";\n  constructor(name) {\n    this.name = name;\n  }\n  getSecret() {\n    return this.#privateField;\n  }\n}\nconst person = new Person("John");\nconsole.log(person.getSecret(), person["#privateField"]); // "secret", undefined\n// person.#privateField; // SyntaxError if uncommented',
            },
            {
              label: "Keep private state independent per instance",
              language: "javascript",
              code: "class Counter {\n  #count = 0;\n  increment() {\n    return ++this.#count;\n  }\n}\nconst first = new Counter(),\n  second = new Counter();\nconsole.log(first.increment(), first.increment(), second.increment()); // 1, 2, 1",
            },
          ],
        },
        {
          name: "Private methods",
          explanation:
            "Declares helper behavior with a # name restricted to the declaring class.",
          note: "Private methods cannot be called from outside the class or accessed through a string property. Their receiver must carry the private elements of the declaring class.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements",
          examples: [
            {
              label: "Invoke a private helper through a public method",
              language: "javascript",
              code: 'class Person {\n  #privateMethod() {\n    return "private method";\n  }\n  describe() {\n    return this.#privateMethod();\n  }\n}\nconsole.log(new Person().describe()); // "private method"',
            },
            {
              label: "Use private state and a private helper together",
              language: "javascript",
              code: 'class Person {\n  #secret = "secret";\n  #format() {\n    return this.#secret.toUpperCase();\n  }\n  getSecret() {\n    return this.#format();\n  }\n}\nconsole.log(new Person().getSecret()); // "SECRET"',
            },
          ],
        },
      ],
    },
    {
      name: "Error Handling",
      id: "error-handling",
      intro:
        "Try/Catch/Finally → Throwing Errors → Error Types. Run snippets independently. Helpers and caught failures are fully defined; async examples use self-contained data URLs. Error names and controlled messages are used instead of engine-specific diagnostic wording.",
      methods: [
        {
          name: "try...catch",
          explanation:
            "Runs code and handles an exception thrown during that execution.",
          note: "A synchronous catch does not intercept a later callback failure or an unawaited promise rejection. Error message wording varies by engine.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
          examples: [
            {
              label: "Catch invalid JSON",
              language: "javascript",
              code: 'try {\n  JSON.parse("invalid json");\n} catch (error) {\n  console.log("Parsing failed:", error.name);\n} // "Parsing failed:", "SyntaxError"',
            },
            {
              label: "Continue after handling a failure",
              language: "javascript",
              code: 'function riskyOperation() {\n  throw new Error("Unavailable");\n}\ntry {\n  riskyOperation();\n} catch (error) {\n  console.log(error.message);\n}\nconsole.log("Continuing"); // "Unavailable", then "Continuing"',
            },
          ],
        },
        {
          name: "finally",
          explanation:
            "Executes after the try block and any matching catch before control leaves the statement.",
          note: "A return or throw in finally replaces a pending return or exception; keep cleanup from accidentally masking failures. Terminating the process can prevent cleanup.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
          examples: [
            {
              label: "Run cleanup after a caught exception",
              language: "javascript",
              code: 'try {\n  throw new Error("Failed");\n} catch (error) {\n  console.log(error.message);\n} finally {\n  console.log("Cleanup operations");\n}',
            },
            {
              label: "Run cleanup before a function returns",
              language: "javascript",
              code: 'function run() {\n  try {\n    return "result";\n  } finally {\n    console.log("cleanup");\n  }\n}\nconsole.log(run()); // "cleanup", then "result"',
            },
          ],
        },
        {
          name: "Catch specific error types",
          explanation:
            "Branches on the caught error type to select a suitable recovery path.",
          note: "Unexpected errors should usually propagate rather than being silently ignored. Cross-realm instanceof checks can fail.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
          examples: [
            {
              label: "Handle a TypeError explicitly",
              language: "javascript",
              code: 'try {\n  const value = null;\n  value.name;\n} catch (error) {\n  if (error instanceof TypeError) console.log("Type error");\n  else throw error;\n}',
            },
            {
              label: "Handle a ReferenceError explicitly",
              language: "javascript",
              code: 'try {\n  console.log(jsGeneralMissingErrorValue);\n} catch (error) {\n  if (error instanceof ReferenceError) console.log("Reference error");\n  else throw error;\n}',
            },
          ],
        },
        {
          name: "Rethrow errors",
          explanation:
            "Passes a caught error to an outer caller after local inspection or logging.",
          note: "Rethrowing the same object retains its identity and original stack information.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
          examples: [
            {
              label: "Log locally and let the caller handle parsing failure",
              language: "javascript",
              code: 'function processData(text) {\n  try {\n    return JSON.parse(text);\n  } catch (error) {\n    console.log("Parse error in processData");\n    throw error;\n  }\n}\ntry {\n  processData("invalid");\n} catch (error) {\n  console.log(error.name);\n}',
            },
            {
              label: "Preserve error identity",
              language: "javascript",
              code: 'const original = new Error("Failed");\ntry {\n  try {\n    throw original;\n  } catch (error) {\n    throw error;\n  }\n} catch (error) {\n  console.log(error === original);\n} // true',
            },
          ],
        },
        {
          name: "Nested try...catch",
          explanation:
            "Allows an inner operation to recover locally or propagate failure to an outer handler.",
          note: "An inner catch that completes normally consumes the exception; the outer catch runs only if another exception propagates.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
          examples: [
            {
              label: "Replace an inner failure",
              language: "javascript",
              code: 'try {\n  try {\n    throw new Error("Inner failure");\n  } catch (error) {\n    console.log(error.message);\n    throw new Error("Failed in inner operation");\n  }\n} catch (error) {\n  console.log(error.message);\n}',
            },
            {
              label: "Recover without reaching the outer catch",
              language: "javascript",
              code: 'try {\n  try {\n    throw new Error("Temporary");\n  } catch {\n    console.log("Recovered");\n  }\n} catch {\n  console.log("Outer handler");\n}',
            },
          ],
        },
        {
          name: "Async error handling with await",
          explanation:
            "Makes a rejected awaited operation throw inside an async function so try...catch can handle it.",
          note: "The self-contained examples fetch data URLs without an external endpoint. For HTTP URLs, check response.ok: HTTP error statuses alone do not reject fetch. Returning null is an explicit fallback policy.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
          examples: [
            {
              label: "Handle a rejected JSON parse asynchronously",
              language: "javascript",
              code: 'async function fetchData() {\n  try {\n    const response = await fetch("data:application/json,invalid");\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    return await response.json();\n  } catch (error) {\n    console.log("Fetch failed:", error.name);\n    return null;\n  }\n}\nfetchData().then((data) => console.log(data));\n// "Fetch failed:", "SyntaxError", then null',
            },
            {
              label: "Return parsed data on success",
              language: "javascript",
              code: 'async function fetchData() {\n  try {\n    const response = await fetch("data:application/json,%7B%22ok%22%3Atrue%7D");\n    if (!response.ok) throw new Error(`HTTP ${response.status}`);\n    return await response.json();\n  } catch (error) {\n    console.log(error.name);\n    return null;\n  }\n}\nfetchData().then((data) => console.log(data.ok)); // true',
            },
          ],
        },
        {
          name: "Resource cleanup in finally",
          explanation:
            "Releases an acquired resource even when using it throws.",
          note: "Release only resources that were successfully acquired. These examples use a small in-memory resource so all helper functions are defined.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch",
          examples: [
            {
              label: "Release after a usage failure",
              language: "javascript",
              code: 'let resource;\ntry {\n  resource = {\n    close() {\n      console.log("released");\n    },\n  };\n  throw new Error("Use failed");\n} catch (error) {\n  console.log(error.message);\n} finally {\n  if (resource) resource.close();\n}',
            },
            {
              label: "Skip release if acquisition fails",
              language: "javascript",
              code: 'let resource;\nfunction acquireResource() {\n  throw new Error("Acquisition failed");\n}\ntry {\n  resource = acquireResource();\n} catch (error) {\n  console.log(error.message);\n} finally {\n  if (resource) resource.close();\n  else console.log("Nothing acquired");\n}',
            },
          ],
        },
        {
          name: "throw",
          explanation:
            "Raises an exception and transfers control to the nearest applicable handler.",
          note: "Constructing an Error alone does not throw it. Put the thrown expression on the same line as throw.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw",
          examples: [
            {
              label: "Throw and catch a generic error",
              language: "javascript",
              code: 'try {\n  throw new Error("Something went wrong");\n} catch (error) {\n  console.log(error.name, error.message);\n}',
            },
            {
              label: "Reject division by zero explicitly",
              language: "javascript",
              code: 'function divide(a, b) {\n  if (b === 0) throw new Error("Division by zero");\n  return a / b;\n}\nconsole.log(divide(6, 2));\ntry {\n  divide(6, 0);\n} catch (error) {\n  console.log(error.message);\n}',
            },
          ],
        },
        {
          name: "Custom ValidationError classes",
          explanation:
            "Extends Error with a distinct type and validation metadata.",
          note: "The demonstration email rule only checks presence and an @ character; it is not complete email-address validation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error",
          examples: [
            {
              label: "Throw field-specific validation errors",
              language: "javascript",
              code: 'class ValidationError extends Error {\n  constructor(message, field) {\n    super(message);\n    this.name = "ValidationError";\n    this.field = field;\n  }\n}\nfunction validateEmail(email) {\n  if (!email) throw new ValidationError("Email is required", "email");\n  if (!email.includes("@"))\n    throw new ValidationError("Invalid email format", "email");\n}\ntry {\n  validateEmail("invalid");\n} catch (error) {\n  if (error instanceof ValidationError) console.log(error.field, error.message);\n  else throw error;\n}',
            },
            {
              label: "Keep Error inheritance and custom metadata",
              language: "javascript",
              code: 'class ValidationError extends Error {\n  constructor(message, field) {\n    super(message);\n    this.name = "ValidationError";\n    this.field = field;\n  }\n}\nconst error = new ValidationError("Email is required", "email");\nconsole.log(error instanceof Error, error.name, error.field);',
            },
          ],
        },
        {
          name: "Custom NetworkError classes",
          explanation:
            "Attaches application-specific status information to an Error subclass.",
          note: "NetworkError here is a user-defined class, not a built-in error automatically thrown by fetch.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error",
          examples: [
            {
              label: "Throw a status-bearing application error",
              language: "javascript",
              code: 'class NetworkError extends Error {\n  constructor(message, statusCode) {\n    super(message);\n    this.name = "NetworkError";\n    this.statusCode = statusCode;\n  }\n}\ntry {\n  throw new NetworkError("Service unavailable", 503);\n} catch (error) {\n  console.log(error.name, error.statusCode);\n}',
            },
            {
              label: "Inspect the custom error type",
              language: "javascript",
              code: 'class NetworkError extends Error {\n  constructor(message, statusCode) {\n    super(message);\n    this.name = "NetworkError";\n    this.statusCode = statusCode;\n  }\n}\nconst error = new NetworkError("Not found", 404);\nconsole.log(\n  error instanceof NetworkError,\n  error instanceof Error,\n  error.message,\n);',
            },
          ],
        },
        {
          name: "Error cause",
          explanation:
            "Records an original failure while throwing a higher-level error with contextual information.",
          note: "cause can hold any value; it is not guaranteed to be an Error. Wrapping creates a new error while retaining the original through cause.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause",
          examples: [
            {
              label: "Wrap a parsing failure",
              language: "javascript",
              code: 'try {\n  try {\n    JSON.parse("invalid");\n  } catch (cause) {\n    throw new Error("Failed to process data", { cause });\n  }\n} catch (error) {\n  console.log(error.message, error.cause.name);\n}',
            },
            {
              label: "Preserve the original error object",
              language: "javascript",
              code: 'const original = new TypeError("Expected a number");\nconst wrapped = new Error("Calculation failed", { cause: original });\nconsole.log(wrapped.cause === original); // true',
            },
          ],
        },
        {
          name: "Conditional error throwing",
          explanation:
            "Selects an error type according to an invalid input condition.",
          note: "The age limits are example application rules. The finite-number guard also rejects NaN and Infinity, which typeof alone would accept.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw",
          examples: [
            {
              label: "Distinguish type and range failures",
              language: "javascript",
              code: 'function checkAge(age) {\n  if (typeof age !== "number" || !Number.isFinite(age))\n    throw new TypeError("Age must be a finite number");\n  if (age < 0) throw new RangeError("Age cannot be negative");\n  if (age > 150) throw new RangeError("Age seems unrealistic");\n  return true;\n}\nfor (const value of ["30", -1, 151]) {\n  try {\n    checkAge(value);\n  } catch (error) {\n    console.log(error.name);\n  }\n}',
            },
            {
              label: "Accept valid input and reject NaN",
              language: "javascript",
              code: 'function checkAge(age) {\n  if (typeof age !== "number" || !Number.isFinite(age))\n    throw new TypeError("Age must be a finite number");\n  if (age < 0) throw new RangeError("Age cannot be negative");\n  if (age > 150) throw new RangeError("Age seems unrealistic");\n  return true;\n}\nconsole.log(checkAge(30));\ntry {\n  checkAge(NaN);\n} catch (error) {\n  console.log(error.name);\n}',
            },
          ],
        },
        {
          name: "Error stack traces",
          explanation:
            "Provides diagnostic call-stack information in runtimes that expose error.stack.",
          note: "stack is widely implemented but its format is engine-specific. Do not rely on exact frame text or line numbers across runtimes.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack",
          examples: [
            {
              label: "Inspect a diagnostic stack",
              language: "javascript",
              code: 'try {\n  throw new Error("Test error");\n} catch (error) {\n  console.log(typeof error.stack);\n} // "string" in modern browsers and Node.js',
            },
            {
              label: "Read a stack without assuming its frame format",
              language: "javascript",
              code: 'function fail() {\n  return new Error("Operation failed");\n}\nconst error = fail();\nconsole.log(\n  typeof error.stack === "string" && error.stack.includes(error.message),\n); // true in modern browsers and Node.js',
            },
          ],
        },
        {
          name: "Error",
          explanation:
            "Creates a generic error object with a name and message.",
          note: "Creating an error is separate from throwing it. Custom error subclasses can inherit its diagnostic properties.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error",
          examples: [
            {
              label: "Inspect a generic error",
              language: "javascript",
              code: 'const error = new Error("Something went wrong");\nconsole.log(error.name, error.message);',
            },
            {
              label: "Throw an already-created error",
              language: "javascript",
              code: 'const error = new Error("Generic error");\ntry {\n  throw error;\n} catch (caught) {\n  console.log(caught === error);\n}',
            },
          ],
        },
        {
          name: "TypeError",
          explanation:
            "Represents an operation applied to an incompatible value or an invalid assignment.",
          note: "Typical cases include calling a non-function, accessing a property of null, and reassigning a const binding.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError",
          examples: [
            {
              label: "Catch incompatible method and property operations",
              language: "javascript",
              code: "for (const operation of [() => (42).toUpperCase(), () => null.property]) {\n  try {\n    operation();\n  } catch (error) {\n    console.log(error.name);\n  }\n}",
            },
            {
              label: "Catch reassignment of a constant",
              language: "javascript",
              code: 'try {\n  const value = 1;\n  value = 2;\n} catch (error) {\n  console.log(error.name);\n} // "TypeError"',
            },
          ],
        },
        {
          name: "ReferenceError",
          explanation: "Represents access to an unavailable variable.",
          note: "A let or const binding exists before initialization but cannot yet be read.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError",
          examples: [
            {
              label: "Read an undeclared identifier",
              language: "javascript",
              code: "try {\n  console.log(jsGeneralUndeclaredErrorExample);\n} catch (error) {\n  console.log(error.name);\n}",
            },
            {
              label: "Read a binding before initialization",
              language: "javascript",
              code: "try {\n  console.log(value);\n  let value = 1;\n} catch (error) {\n  console.log(error.name);\n}",
            },
          ],
        },
        {
          name: "SyntaxError",
          explanation:
            "Represents source or data that cannot be parsed according to the required syntax.",
          note: "A syntax error in the surrounding script prevents that script from running, including its try block. JSON.parse and dynamic eval parsing can instead throw into an already-running catch.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError",
          examples: [
            {
              label: "Catch invalid JSON data",
              language: "javascript",
              code: 'try {\n  JSON.parse("{invalid}");\n} catch (error) {\n  console.log(error.name);\n}',
            },
            {
              label: "Catch malformed dynamically parsed source",
              language: "javascript",
              code: 'try {\n  eval("function foo( {}");\n} catch (error) {\n  console.log(error.name);\n}\n// Static import declarations inside a function would prevent the script from parsing.',
            },
          ],
        },
        {
          name: "RangeError",
          explanation:
            "Represents a value outside the range an operation accepts.",
          note: "Invalid array lengths and toFixed precision are predictable examples. Excessive recursion can produce RangeError in some engines and a different error type in others.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError",
          examples: [
            {
              label: "Reject a negative array length",
              language: "javascript",
              code: "try {\n  new Array(-1);\n} catch (error) {\n  console.log(error.name);\n}",
            },
            {
              label: "Reject out-of-range precision",
              language: "javascript",
              code: "try {\n  (42).toFixed(101);\n} catch (error) {\n  console.log(error.name);\n}",
            },
          ],
        },
        {
          name: "URIError",
          explanation:
            "Represents malformed input to URI encoding or decoding functions.",
          note: "An incomplete percent escape cannot be decoded, and a lone surrogate cannot be encoded as a valid UTF-8 sequence.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/URIError",
          examples: [
            {
              label: "Catch malformed percent encoding",
              language: "javascript",
              code: 'try {\n  decodeURIComponent("%");\n} catch (error) {\n  console.log(error.name);\n}',
            },
            {
              label: "Catch an unpaired surrogate",
              language: "javascript",
              code: 'try {\n  encodeURI("\ud800");\n} catch (error) {\n  console.log(error.name);\n}',
            },
          ],
        },
        {
          name: "EvalError",
          explanation:
            "Provides a legacy error type historically associated with eval.",
          note: "Modern ECMAScript does not use EvalError for ordinary eval failures; invalid evaluated syntax throws SyntaxError instead.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/EvalError",
          examples: [
            {
              label: "Inspect an explicitly created legacy error",
              language: "javascript",
              code: 'const error = new EvalError("Eval error");\nconsole.log(error.name, error instanceof Error);',
            },
            {
              label: "Distinguish actual eval parsing failure",
              language: "javascript",
              code: 'try {\n  eval("const =");\n} catch (error) {\n  console.log(error instanceof EvalError, error.name);\n}',
            },
          ],
        },
        {
          name: "AggregateError",
          explanation: "Groups multiple failures in one error object.",
          note: "The errors property contains the collected failures. Each member remains its original value or error object.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError",
          examples: [
            {
              label: "Throw a group of errors",
              language: "javascript",
              code: 'try {\n  throw new AggregateError(\n    [new Error("First error"), new Error("Second error")],\n    "Multiple failures",\n  );\n} catch (error) {\n  console.log(error.name, error.message, error.errors.length);\n}',
            },
            {
              label: "Inspect individual failures",
              language: "javascript",
              code: 'const error = new AggregateError(\n  [new TypeError("Wrong type"), new RangeError("Out of range")],\n  "Invalid inputs",\n);\nfor (const failure of error.errors) console.log(failure.name);',
            },
          ],
        },
        {
          name: "Common error properties and toString()",
          explanation:
            "Exposes an error’s type name and message and formats them as a diagnostic string.",
          note: "stack is covered above and varies by engine. A name string can be changed or imitated, so it is not a guarantee of error identity.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/toString",
          examples: [
            {
              label: "Read the name, message, and formatted string",
              language: "javascript",
              code: 'const error = new TypeError("Custom message");\nconsole.log(error.name, error.message);\nconsole.log(error.toString());',
            },
            {
              label: "Compare a type check with a name check",
              language: "javascript",
              code: 'try {\n  JSON.parse("invalid");\n} catch (error) {\n  console.log(error instanceof SyntaxError, error.name === "SyntaxError");\n}',
            },
          ],
        },
      ],
    },
    {
      name: "Modern JavaScript (ES6+)",
      id: "modern-javascript",
      intro:
        "Spread & Rest → Template Literals → Destructuring → Modules → Optional Chaining & Nullish Coalescing → Recent Additions. Run snippets independently. Module file sets include explicit execution instructions; newer APIs require runtime support. Related ES2022 and host features retain their actual attribution instead of being labeled as ES2023 additions.",
      methods: [
        {
          name: "Array spread",
          explanation: "Expands an iterable into array elements.",
          note: "The new outer array is independent, but nested objects remain shared.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax",
          examples: [
            {
              label: "Copy and extend an array",
              language: "javascript",
              code: "const nums = [1, 2, 3];\nconst copy = [...nums];\nconst merged = [...nums, 4, 5, 6];\nconsole.log(copy !== nums, ...merged); // true, 1, 2, 3, 4, 5, 6",
            },
            {
              label: "Merge two arrays and inspect a shallow copy",
              language: "javascript",
              code: "const arrA = [{ value: 1 }],\n  arrB = [2, 3];\nconst combined = [...arrA, ...arrB];\ncombined[0].value = 9;\nconsole.log(arrA[0].value, ...combined.slice(1)); // 9, 2, 3",
            },
          ],
        },
        {
          name: "Object spread",
          explanation:
            "Copies own enumerable properties into an object literal.",
          note: "Later properties win. Object spread does not copy the prototype or non-enumerable properties, and nested objects remain shared.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax",
          examples: [
            {
              label: "Copy, update, and extend a record",
              language: "javascript",
              code: 'const user = { name: "Alice", age: 30 };\nconst clone = { ...user };\nconst updated = { ...user, age: 31 };\nconst extended = { ...user, role: "admin" };\nconsole.log(clone !== user, updated.age, extended.role, user.age); // true, 31, "admin", 30',
            },
            {
              label: "Let overrides win",
              language: "javascript",
              code: 'const defaults = { theme: "light", debug: false };\nconst overrides = { theme: "dark" };\nconst merged = { ...defaults, ...overrides };\nconsole.log(merged.theme, merged.debug); // "dark", false',
            },
          ],
        },
        {
          name: "Spread in function arguments",
          explanation:
            "Expands iterable values into individual call arguments.",
          note: "Very large iterables can exceed engine argument limits.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax",
          examples: [
            {
              label: "Find a maximum",
              language: "javascript",
              code: "const nums = [1, 2, 3];\nconsole.log(Math.max(...nums)); // 3",
            },
            {
              label: "Pass collected arguments",
              language: "javascript",
              code: 'function greet(name, greeting) {\n  return `${greeting}, ${name}!`;\n}\nconst args = ["Alice", "Hello"];\nconsole.log(greet(...args)); // "Hello, Alice!"',
            },
          ],
        },
        {
          name: "Array rest elements",
          explanation:
            "Collects the remaining iterable elements into a new array during destructuring.",
          note: "The rest element must be last and cannot have a trailing comma.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring",
          examples: [
            {
              label: "Collect after two elements",
              language: "javascript",
              code: "const [first, second, ...rest] = [1, 2, 3, 4, 5];\nconsole.log(first, second, ...rest); // 1, 2, 3, 4, 5",
            },
            {
              label: "Collect an empty tail",
              language: "javascript",
              code: "const [head, ...tail] = [1];\nconsole.log(head, tail.length); // 1, 0",
            },
          ],
        },
        {
          name: "Object rest properties",
          explanation:
            "Collects remaining own enumerable properties after named properties are extracted.",
          note: "This is a shallow copy and does not collect inherited or non-enumerable properties.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring",
          examples: [
            {
              label: "Extract a name and collect remaining fields",
              language: "javascript",
              code: 'const { name, ...rest } = { name: "Alice", age: 30, role: "admin" };\nconsole.log(name, rest.age, rest.role); // "Alice", 30, "admin"',
            },
            {
              label: "Remove a property without modifying the input",
              language: "javascript",
              code: 'const fullUser = { name: "Alice", password: "secret" };\nconst { password, ...safeUser } = fullUser;\nconsole.log(safeUser.name, "password" in safeUser, "password" in fullUser); // "Alice", false, true',
            },
          ],
        },
        {
          name: "Rest parameters",
          explanation:
            "Collects remaining function arguments into a real array.",
          note: "The rest parameter must be last. An initial reduce value makes sum() work with zero arguments.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters",
          examples: [
            {
              label: "Sum any number of arguments",
              language: "javascript",
              code: "function sum(...nums) {\n  return nums.reduce((a, b) => a + b, 0);\n}\nconsole.log(sum(1, 2, 3, 4), sum()); // 10, 0",
            },
            {
              label: "Mix a regular parameter with rest",
              language: "javascript",
              code: 'function log(label, ...values) {\n  console.log(label + ":", ...values);\n}\nlog("Numbers", 1, 2, 3); // "Numbers:", 1, 2, 3',
            },
          ],
        },
        {
          name: "Conditional spread",
          explanation:
            "Includes properties or array elements only when a condition is met.",
          note: "Object spread can ignore false; array spread requires an iterable, so use an empty array for the false branch.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax",
          examples: [
            {
              label: "Include a development option",
              language: "javascript",
              code: 'const defaults = { theme: "dark" },\n  isDev = true;\nconst opts = { ...defaults, ...(isDev && { debug: true }) };\nconsole.log(opts.theme, opts.debug); // "dark", true',
            },
            {
              label: "Omit optional array elements",
              language: "javascript",
              code: 'const enabled = false;\nconst items = ["base", ...(enabled ? ["extra"] : [])];\nconsole.log(...items); // "base"',
            },
          ],
        },
        {
          name: "Template literal interpolation",
          explanation:
            "Creates a string with backticks and embedded expressions.",
          note: "The examples use actual backticks, without the extra escaping visible in the screenshots.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
          examples: [
            {
              label: "Interpolate a name and age",
              language: "javascript",
              code: 'const name = "John",\n  age = 30;\nconsole.log(`Hello, my name is ${name} and I\'m ${age} years old`);',
            },
            {
              label: "Format an expression result",
              language: "javascript",
              code: 'const price = 9.99,\n  quantity = 3;\nconsole.log(`Total: $${(price * quantity).toFixed(2)}`); // "Total: $29.97"',
            },
          ],
        },
        {
          name: "Multiline template literals",
          explanation: "Preserves line breaks inside a backtick string.",
          note: "Indentation inside the literal is also part of the resulting string.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
          examples: [
            {
              label: "Keep literal line breaks",
              language: "javascript",
              code: "const text = `Line 1\nLine 2\nLine 3`;\nconsole.log(text);",
            },
            {
              label: "Keep intentional indentation",
              language: "javascript",
              code: 'const text = `First\n  Second`;\nconsole.log(JSON.stringify(text)); // "First\\n  Second"',
            },
          ],
        },
        {
          name: "Nested template literals",
          explanation:
            "Uses a template literal within an interpolation expression.",
          note: "Keep nested templates short enough to remain readable.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
          examples: [
            {
              label: "Format a VIP greeting",
              language: "javascript",
              code: 'const name = "John",\n  isVip = true;\nconsole.log(`Welcome ${isVip ? `VIP ${name}` : name}!`); // "Welcome VIP John!"',
            },
            {
              label: "Use the regular greeting branch",
              language: "javascript",
              code: 'const name = "Jane",\n  isVip = false;\nconsole.log(`Welcome ${isVip ? `VIP ${name}` : name}!`); // "Welcome Jane!"',
            },
          ],
        },
        {
          name: "Tagged template literals",
          explanation:
            "Calls a tag function with literal string segments and separate interpolated values.",
          note: "Tags are ordinary functions you must define or import; css is not a built-in tag. A tag does not automatically escape SQL or HTML.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
          examples: [
            {
              label: "Highlight interpolated trusted values",
              language: "javascript",
              code: 'function highlight(strings, ...values) {\n  return strings.reduce(\n    (out, text, i) =>\n      out + text + (i < values.length ? `<mark>${values[i]}</mark>` : ""),\n    "",\n  );\n}\nconst name = "John",\n  age = 30;\nconsole.log(highlight`Hello ${name}, you are ${age} years old`);',
            },
            {
              label: "Define a minimal CSS text tag",
              language: "javascript",
              code: 'function css(strings, ...values) {\n  return strings.reduce(\n    (out, text, i) => out + text + (i < values.length ? values[i] : ""),\n    "",\n  );\n}\nconst color = "red";\nconsole.log(css`color: ${color};`); // "color: red;"',
            },
          ],
        },
        {
          name: "String.raw()",
          explanation:
            "Returns template text using raw literal segments so backslashes are preserved.",
          note: "Interpolated values are still evaluated normally; raw processing applies to the literal segments.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw",
          examples: [
            {
              label: "Preserve a Windows path",
              language: "javascript",
              code: "const path = String.raw`C:\\Users\\Documents\\file.txt`;\nconsole.log(path); // C:\\Users\\Documents\\file.txt",
            },
            {
              label: "Preserve a backslash-n sequence",
              language: "javascript",
              code: "const text = String.raw`Line 1\\nLine 2`;\nconsole.log(text); // literal backslash followed by n",
            },
          ],
        },
        {
          name: "SQL and HTML template text",
          explanation:
            "Builds readable text with template literals for query drafts or markup.",
          note: "Plain interpolation does not parameterize SQL or escape HTML. Use database parameters for external SQL values and textContent or an escaping library for external HTML content.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
          examples: [
            {
              label: "Build a fixed query draft",
              language: "javascript",
              code: "const minAge = 18,\n  status = \"active\";\nconst query = `SELECT * FROM users\nWHERE age > ${minAge}\nAND status = '${status}'`;\nconsole.log(query);",
            },
            {
              label: "Build markup from trusted fixed text",
              language: "javascript",
              code: 'const title = "Welcome",\n  description = "JavaScript notes";\nconst html = `<div class="card">\n  <h2>${title}</h2>\n  <p>${description}</p>\n</div>`;\nconsole.log(html);',
            },
          ],
        },
        {
          name: "Object destructuring and renaming",
          explanation:
            "Extracts object properties into variables and optionally gives them different local names.",
          note: "The original property names identify the source fields; names after a colon are local bindings.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring",
          examples: [
            {
              label: "Extract named properties",
              language: "javascript",
              code: 'const person = { name: "John", age: 30, city: "NYC" };\nconst { name, age } = person;\nconsole.log(name, age);',
            },
            {
              label: "Rename extracted properties",
              language: "javascript",
              code: "const point = { x: 10, y: 20 };\nconst { x: newX, y: newY } = point;\nconsole.log(newX, newY); // 10, 20",
            },
          ],
        },
        {
          name: "Destructuring defaults",
          explanation:
            "Supplies a fallback when an extracted value is undefined.",
          note: "A default does not replace null, false, zero, or an empty string.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring",
          examples: [
            {
              label: "Default an absent country",
              language: "javascript",
              code: 'const person = { name: "John" };\nconst { name, country = "USA" } = person;\nconsole.log(name, country);',
            },
            {
              label: "Keep null while defaulting undefined",
              language: "javascript",
              code: "const [first = 1, second = 2] = [null, undefined];\nconsole.log(first, second); // null, 2",
            },
          ],
        },
        {
          name: "Nested destructuring",
          explanation: "Extracts values through nested object patterns.",
          note: "Missing intermediate objects throw unless you provide defaults; a nested pattern does not bind the intermediate property name itself.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring",
          examples: [
            {
              label: "Extract a nested name and city",
              language: "javascript",
              code: 'const user = { profile: { name: "John", address: { city: "NYC" } } };\nconst {\n  profile: {\n    name,\n    address: { city },\n  },\n} = user;\nconsole.log(name, city);',
            },
            {
              label: "Default a missing nested object",
              language: "javascript",
              code: 'const user = {};\nconst { profile: { name = "Guest" } = {} } = user;\nconsole.log(name); // "Guest"',
            },
          ],
        },
        {
          name: "Array destructuring and skipped elements",
          explanation: "Extracts iterable elements by position.",
          note: "Array rest examples above show how to collect the remaining elements.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring",
          examples: [
            {
              label: "Extract the first two colors",
              language: "javascript",
              code: 'const colors = ["red", "green", "blue"];\nconst [primary, secondary] = colors;\nconsole.log(primary, secondary);',
            },
            {
              label: "Skip the middle color",
              language: "javascript",
              code: 'const colors = ["red", "green", "blue"];\nconst [first, , third] = colors;\nconsole.log(first, third);',
            },
          ],
        },
        {
          name: "Swap variables with destructuring",
          explanation:
            "Assigns values to existing variables through an array pattern.",
          note: "Use mutable bindings for reassignment. The right-hand values are evaluated before assignment.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring",
          examples: [
            {
              label: "Swap two numbers",
              language: "javascript",
              code: "let a = 1,\n  b = 2;\n[a, b] = [b, a];\nconsole.log(a, b); // 2, 1",
            },
            {
              label: "Swap two labels",
              language: "javascript",
              code: 'let first = "left",\n  second = "right";\n[first, second] = [second, first];\nconsole.log(first, second);',
            },
          ],
        },
        {
          name: "Destructured function parameters",
          explanation: "Extracts selected fields directly in a parameter list.",
          note: "A default object parameter handles omitted or undefined arguments, but does not make null destructurable.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring",
          examples: [
            {
              label: "Default an age while building a record",
              language: "javascript",
              code: 'function createUser({ name, email, age = 18 }) {\n  return { name, email, age };\n}\nconst user = createUser({ name: "John", email: "john@example.com" });\nconsole.log(user.name, user.email, user.age);',
            },
            {
              label: "Allow the options argument to be omitted",
              language: "javascript",
              code: 'function greet({ name = "Guest", age = 18 } = {}) {\n  return `${name}: ${age}`;\n}\nconsole.log(greet(), greet({ name: "John", age: 30 }));',
            },
          ],
        },
        {
          name: "Destructure returned and mixed values",
          explanation:
            "Extracts multiple returned values or combines object and array patterns.",
          note: "Patterns can nest object and iterable extraction, provided the source has the expected shape.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring",
          examples: [
            {
              label: "Unpack returned coordinates",
              language: "javascript",
              code: "function getCoordinates() {\n  return [10, 20];\n}\nconst [x, y] = getCoordinates();\nconsole.log(x, y);",
            },
            {
              label: "Combine object and array patterns",
              language: "javascript",
              code: "const {\n  data: [firstItem],\n} = { data: [1, 2, 3] };\nconsole.log(firstItem); // 1",
            },
          ],
        },
        {
          name: "Named exports and export lists",
          explanation:
            "Exports individual variables from a module so consumers can import them by name.",
          note: 'Save each file pair in its own folder and run node main.mjs. The .mjs extension explicitly selects ES modules; browser modules use type="module" and an HTTP server.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export",
          examples: [
            {
              label: "Export declarations",
              files: [
                {
                  path: "lib.mjs",
                  language: "javascript",
                  code: "export const PI = 3.14159;\nexport function add(a, b) {\n  return a + b;\n}\nexport function multiply(a, b) {\n  return a * b;\n}",
                },
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'import { PI, add, multiply } from "./lib.mjs";\nconsole.log(PI, add(2, 3), multiply(2, 3));',
                },
              ],
            },
            {
              label: "Export a list of existing bindings",
              files: [
                {
                  path: "lib.mjs",
                  language: "javascript",
                  code: "const subtract = (a, b) => a - b;\nconst divide = (a, b) => a / b;\nexport { subtract, divide };",
                },
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'import { subtract, divide } from "./lib.mjs";\nconsole.log(subtract(5, 2), divide(6, 2));',
                },
              ],
            },
          ],
        },
        {
          name: "Default exports and imports",
          explanation:
            "Exports one default variable that the consumer can name locally.",
          note: 'A module can have one default export alongside multiple named exports. Save each file pair in its own folder and run node main.mjs. The .mjs extension explicitly selects ES modules; browser modules use type="module" and an HTTP server.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import",
          examples: [
            {
              label: "Export and import a default class",
              files: [
                {
                  path: "lib.mjs",
                  language: "javascript",
                  code: "export default class User {\n  constructor(name) {\n    this.name = name;\n  }\n}",
                },
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'import User from "./lib.mjs";\nconsole.log(new User("John").name);',
                },
              ],
            },
            {
              label: "Choose a local name for the default import",
              files: [
                {
                  path: "lib.mjs",
                  language: "javascript",
                  code: 'export default function greet() {\n  return "Hello";\n}',
                },
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'import sayHello from "./lib.mjs";\nconsole.log(sayHello());',
                },
              ],
            },
          ],
        },
        {
          name: "Named and renamed imports",
          explanation:
            "Imports exported variables by their exact export names or gives them local aliases.",
          note: 'Save each file pair in its own folder and run node main.mjs. The .mjs extension explicitly selects ES modules; browser modules use type="module" and an HTTP server.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import",
          examples: [
            {
              label: "Import selected functions",
              files: [
                {
                  path: "lib.mjs",
                  language: "javascript",
                  code: "export const add = (a, b) => a + b;\nexport const multiply = (a, b) => a * b;",
                },
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'import { add, multiply } from "./lib.mjs";\nconsole.log(add(2, 3), multiply(2, 3));',
                },
              ],
            },
            {
              label: "Rename imports locally",
              files: [
                {
                  path: "lib.mjs",
                  language: "javascript",
                  code: "export const add = (a, b) => a + b;\nexport const multiply = (a, b) => a * b;",
                },
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'import { add as sum, multiply as mult } from "./lib.mjs";\nconsole.log(sum(2, 3), mult(2, 3));',
                },
              ],
            },
          ],
        },
        {
          name: "Namespace imports",
          explanation:
            "Imports a module namespace object containing its exports.",
          note: 'Save each file pair in its own folder and run node main.mjs. The .mjs extension explicitly selects ES modules; browser modules use type="module" and an HTTP server.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import",
          examples: [
            {
              label: "Access named exports through a namespace",
              files: [
                {
                  path: "lib.mjs",
                  language: "javascript",
                  code: "export const PI = 3.14159;\nexport const add = (a, b) => a + b;",
                },
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'import * as math from "./lib.mjs";\nconsole.log(math.PI, math.add(2, 3));',
                },
              ],
            },
            {
              label: "Access a default export through the namespace",
              files: [
                {
                  path: "lib.mjs",
                  language: "javascript",
                  code: 'export default "primary";\nexport const name = "John";',
                },
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'import * as utils from "./lib.mjs";\nconsole.log(utils.default, utils.name);',
                },
              ],
            },
          ],
        },
        {
          name: "Mixed default and named imports",
          explanation:
            "Imports a module’s primary export together with selected named variables.",
          note: 'Save each file pair in its own folder and run node main.mjs. The .mjs extension explicitly selects ES modules; browser modules use type="module" and an HTTP server.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import",
          examples: [
            {
              label: "Import a class and a count",
              files: [
                {
                  path: "lib.mjs",
                  language: "javascript",
                  code: "export default class User {\n  constructor(name) {\n    this.name = name;\n  }\n}\nexport const userCount = 0;",
                },
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'import User, { userCount } from "./lib.mjs";\nconsole.log(new User("John").name, userCount);',
                },
              ],
            },
            {
              label: "Alias a named export beside a default",
              files: [
                {
                  path: "lib.mjs",
                  language: "javascript",
                  code: 'export default "User";\nexport const userCount = 2;',
                },
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'import label, { userCount as count } from "./lib.mjs";\nconsole.log(label, count);',
                },
              ],
            },
          ],
        },
        {
          name: "Dynamic import()",
          explanation:
            "Loads a module and returns a promise for its namespace object.",
          note: 'Handle a rejected import when loading can fail. Save each file pair in its own folder and run node main.mjs. The .mjs extension explicitly selects ES modules; browser modules use type="module" and an HTTP server.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import",
          examples: [
            {
              label: "Load a module inside an async function",
              files: [
                {
                  path: "lib.mjs",
                  language: "javascript",
                  code: "export const add = (a, b) => a + b;",
                },
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'async function loadModule() {\n  const module = await import("./lib.mjs");\n  console.log(module.add(2, 3));\n}\nawait loadModule();',
                },
              ],
            },
            {
              label: "Read a dynamically imported default export",
              files: [
                {
                  path: "lib.mjs",
                  language: "javascript",
                  code: 'export default "Loaded";',
                },
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'const { default: value } = await import("./lib.mjs");\nconsole.log(value);',
                },
              ],
            },
          ],
        },
        {
          name: "Conditional dynamic imports",
          explanation:
            "Loads a module only when a runtime condition requests it.",
          note: 'Static import declarations cannot be placed inside if blocks. Save each file pair in its own folder and run node main.mjs. The .mjs extension explicitly selects ES modules; browser modules use type="module" and an HTTP server.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import",
          examples: [
            {
              label: "Initialize an enabled feature",
              files: [
                {
                  path: "lib.mjs",
                  language: "javascript",
                  code: 'export function init() {\n  console.log("initialized");\n}',
                },
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'const condition = true;\nif (condition) await import("./lib.mjs").then((module) => module.init());',
                },
              ],
            },
            {
              label: "Skip a disabled feature",
              files: [
                {
                  path: "lib.mjs",
                  language: "javascript",
                  code: 'console.log("module evaluated");',
                },
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'const condition = false;\nif (condition) await import("./lib.mjs");\nconsole.log("skipped");',
                },
              ],
            },
          ],
        },
        {
          name: "Re-exporting modules",
          explanation:
            "Forwards exports through another module to create a shared entry point.",
          note: 'export * does not forward a default export; re-export it explicitly under a name. Save each file pair in its own folder and run node main.mjs. The .mjs extension explicitly selects ES modules; browser modules use type="module" and an HTTP server.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export",
          examples: [
            {
              label: "Forward named exports",
              files: [
                {
                  path: "lib.mjs",
                  language: "javascript",
                  code: "export const add = (a, b) => a + b;\nexport const multiply = (a, b) => a * b;",
                },
                {
                  path: "index.mjs",
                  language: "javascript",
                  code: 'export { add, multiply } from "./lib.mjs";',
                },
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'import { add, multiply } from "./index.mjs";\nconsole.log(add(2, 3), multiply(2, 3));',
                },
              ],
            },
            {
              label: "Forward a default under a name and all named exports",
              files: [
                {
                  path: "lib.mjs",
                  language: "javascript",
                  code: "export default class User {\n  constructor(name) {\n    this.name = name;\n  }\n}\nexport const count = 1;",
                },
                {
                  path: "index.mjs",
                  language: "javascript",
                  code: 'export { default as User } from "./lib.mjs";\nexport * from "./lib.mjs";',
                },
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'import { User, count } from "./index.mjs";\nconsole.log(new User("Jane").name, count);',
                },
              ],
            },
          ],
        },
        {
          name: "Side-effect imports and stylesheets",
          explanation:
            "Evaluates a JavaScript module without importing variables.",
          note: 'Bare import "./styles.css" requires appropriate bundler support and is not a portable JavaScript side-effect import. The browser example uses standard HTML and must be served over HTTP.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import",
          examples: [
            {
              label: "Run initialization once even with repeated imports",
              files: [
                {
                  path: "lib.mjs",
                  language: "javascript",
                  code: "globalThis.jsModernInitialized = (globalThis.jsModernInitialized ?? 0) + 1;",
                },
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'import "./lib.mjs";\nimport "./lib.mjs";\nconsole.log(globalThis.jsModernInitialized);',
                },
              ],
            },
            {
              label: "Load a stylesheet alongside a JavaScript side effect",
              files: [
                {
                  path: "styles.css",
                  language: "css",
                  code: "#demo {\n  color: rgb(255, 0, 0);\n}",
                },
                {
                  path: "setup.mjs",
                  language: "javascript",
                  code: "globalThis.jsModernReady = true;",
                },
                {
                  path: "index.html",
                  language: "html",
                  code: '<!doctype html>\n<link rel="stylesheet" href="./styles.css" />\n<p id="demo">Ready</p>\n<script type="module">\n  import "./setup.mjs";\n  console.log(\n    globalThis.jsModernReady,\n    getComputedStyle(document.querySelector("#demo")).color,\n  );\n</script>',
                },
              ],
            },
          ],
        },
        {
          name: "Optional property access",
          explanation:
            "Stops a continuous property-access chain when its guarded base is null or undefined.",
          note: "The root identifier must still be declared. Each potentially nullish step needs appropriate guarding; grouping can end the short-circuit chain.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining",
          examples: [
            {
              label: "Read missing nested fields safely",
              language: "javascript",
              code: 'const user = { name: "John", address: { street: "123 Main St" } };\nconsole.log(\n  user?.address?.city,\n  user?.address?.country?.name,\n  user.name?.length,\n); // undefined, undefined, 4',
            },
            {
              label: "Guard the result of a function call",
              language: "javascript",
              code: "function getUser() {\n  return null;\n}\nconsole.log(getUser()?.name); // undefined",
            },
          ],
        },
        {
          name: "Optional method calls",
          explanation:
            "Calls a method only when the method value is not null or undefined.",
          note: "A present non-function value still throws TypeError. user.method?.() preserves the method receiver; user?.method?.() also guards the user.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining",
          examples: [
            {
              label: "Skip an absent method",
              language: "javascript",
              code: 'const user = { name: "John" };\nconsole.log(user.getData?.()); // undefined',
            },
            {
              label: "Keep the method receiver and reject non-callable values",
              language: "javascript",
              code: 'const user = {\n  name: "John",\n  getData() {\n    return this.name;\n  },\n};\nconsole.log(user?.getData?.());\ntry {\n  ({ method: 1 }).method?.();\n} catch (error) {\n  console.log(error.name);\n}',
            },
          ],
        },
        {
          name: "Optional bracket access",
          explanation:
            "Guards indexed or dynamically named property access on a null or undefined base.",
          note: "Index and key expressions are not evaluated when the chain short-circuits.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining",
          examples: [
            {
              label: "Read array and dynamic-key properties",
              language: "javascript",
              code: 'const array = ["first"],\n  object = { "dynamic-key": "value" };\nconsole.log(array?.[0], object?.["dynamic-key"]);',
            },
            {
              label: "Skip evaluation of the index",
              language: "javascript",
              code: "const array = null;\nlet index = 0;\nconsole.log(array?.[index++], index); // undefined, 0",
            },
          ],
        },
        {
          name: "Nullish coalescing (??)",
          explanation:
            "Returns a fallback only when the left value is null or undefined.",
          note: "Parenthesize when mixing ?? with && or ||; unparenthesized combinations are syntax errors.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing",
          examples: [
            {
              label: "Default null and undefined",
              language: "javascript",
              code: 'console.log(null ?? "default", undefined ?? "default");',
            },
            {
              label: "Preserve other falsy values",
              language: "javascript",
              code: 'console.log("" ?? "default", 0 ?? "default", false ?? "default");',
            },
          ],
        },
        {
          name: "Nullish defaults versus || and environment values",
          explanation:
            "Distinguishes missing values from all falsy values when selecting defaults.",
          note: 'Node.js process.env values are strings or undefined: "0" is truthy. The deterministic examples use ordinary objects instead of changing the process environment.',
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing",
          examples: [
            {
              label: "Preserve a numeric zero",
              language: "javascript",
              code: "const config = { port: 0 };\nconsole.log(config.port || 3000, config.port ?? 3000); // 3000, 0",
            },
            {
              label: "Model environment strings and absence",
              language: "javascript",
              code: 'const env = { PORT: "0" };\nconsole.log(env.PORT || 3000, env.PORT ?? 3000, Number(env.PORT ?? 3000));\nconsole.log({}.PORT ?? 3000); // "0", "0", 0; then 3000',
            },
          ],
        },
        {
          name: "Combine optional chaining and nullish defaults",
          explanation:
            "Uses safe access followed by a fallback for missing data.",
          note: "An optional call still requires a callable value when present; this is not general type validation.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining",
          examples: [
            {
              label: "Default nested configuration and an absent API user",
              language: "javascript",
              code: 'const config = { server: { port: 0 } },\n  response = {};\nconsole.log(config?.server?.port ?? 3000, config?.server?.host ?? "localhost");\nconsole.log(response?.data?.user?.name ?? "Anonymous");',
            },
            {
              label: "Build defaults and chain an optional method",
              language: "javascript",
              code: 'function createServer(options) {\n  return {\n    port: options?.port ?? 8080,\n    host: options?.host ?? "localhost",\n    ssl: options?.ssl ?? false,\n  };\n}\nconst server = createServer();\nconst user = { name: "John" };\nconsole.log(\n  server.port,\n  server.host,\n  server.ssl,\n  user?.name?.toUpperCase?.() ?? "ANONYMOUS",\n);',
            },
          ],
        },
        {
          name: "Array.prototype.toSorted()",
          explanation: "Returns a sorted copy of an array.",
          note: "ES2023 copying array method: the outer array is new and the source is unchanged; nested references remain shared. The default compares string representations.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted",
          examples: [
            {
              label: "Keep the source unchanged",
              language: "javascript",
              code: "const arr = [3, 1, 2];\nconsole.log(...arr.toSorted());\nconsole.log(...arr);",
            },
            {
              label: "Use a variation",
              language: "javascript",
              code: "const arr = [3, 10, 2];\nconsole.log(...arr.toSorted((a, b) => b - a));",
            },
          ],
        },
        {
          name: "Array.prototype.toReversed()",
          explanation: "Returns a reversed copy of an array.",
          note: "ES2023 copying array method: the outer array is new and the source is unchanged; nested references remain shared.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed",
          examples: [
            {
              label: "Keep the source unchanged",
              language: "javascript",
              code: "const arr = [3, 1, 2];\nconsole.log(...arr.toReversed());\nconsole.log(...arr);",
            },
            {
              label: "Use a variation",
              language: "javascript",
              code: 'const arr = ["a", "b"];\nconsole.log(...arr.toReversed());',
            },
          ],
        },
        {
          name: "Array.prototype.toSpliced()",
          explanation:
            "Returns a copy with elements removed, replaced, or inserted.",
          note: "ES2023 copying array method: the outer array is new and the source is unchanged; nested references remain shared.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced",
          examples: [
            {
              label: "Keep the source unchanged",
              language: "javascript",
              code: "const arr = [3, 1, 2];\nconsole.log(...arr.toSpliced(1, 1));\nconsole.log(...arr.toSpliced(1, 1, 99));\nconsole.log(...arr);",
            },
            {
              label: "Use a variation",
              language: "javascript",
              code: "const arr = [3, 1, 2];\nconsole.log(...arr.toSpliced(1, 0, 99, 100));",
            },
          ],
        },
        {
          name: "Array.prototype.with()",
          explanation: "Returns a copy with a single indexed element replaced.",
          note: "ES2023 copying array method: the outer array is new and the source is unchanged; nested references remain shared. An out-of-bounds index throws RangeError.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with",
          examples: [
            {
              label: "Keep the source unchanged",
              language: "javascript",
              code: "const arr = [3, 1, 2];\nconsole.log(...arr.with(0, 100));\nconsole.log(...arr);",
            },
            {
              label: "Use a variation",
              language: "javascript",
              code: "const arr = [3, 1, 2];\nconsole.log(...arr.with(-1, 99));",
            },
          ],
        },
        {
          name: "Object.groupBy()",
          explanation:
            "Groups iterable elements by callback results converted to property keys.",
          note: "ES2024. The result has a null prototype, and grouped elements are the original references.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy",
          examples: [
            {
              label: "Group records by type",
              language: "javascript",
              code: 'const items = [\n  { name: "apple", type: "fruit" },\n  { name: "carrot", type: "veg" },\n  { name: "banana", type: "fruit" },\n];\nconst groups = Object.groupBy(items, (x) => x.type);\nconsole.log(...groups.fruit.map((x) => x.name), groups.veg[0].name);',
            },
            {
              label: "Inspect the result and shared members",
              language: "javascript",
              code: 'const items = [\n  { name: "apple", type: "fruit" },\n  { name: "carrot", type: "veg" },\n  { name: "banana", type: "fruit" },\n];\nconst groups = Object.groupBy(items, (x) => x.type);\nconsole.log(Object.getPrototypeOf(groups), groups.fruit[0] === items[0]);',
            },
          ],
        },
        {
          name: "Map.groupBy()",
          explanation:
            "Groups iterable elements in a Map using callback values as keys.",
          note: "ES2024. The screenshot uses string category values, which also work with Object.groupBy; actual object keys demonstrate the identity distinction.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/groupBy",
          examples: [
            {
              label: "Use category objects as keys",
              language: "javascript",
              code: 'const items = [\n  { name: "apple", type: "fruit" },\n  { name: "carrot", type: "veg" },\n  { name: "banana", type: "fruit" },\n];\nconst fruit = { label: "fruit" },\n  veg = { label: "veg" };\nconst groups = Map.groupBy(items, (x) => (x.type === "fruit" ? fruit : veg));\nconsole.log(groups.get(fruit).length, groups.get(veg)[0].name);',
            },
            {
              label: "Keep numeric keys as numbers",
              language: "javascript",
              code: 'const groups = Map.groupBy([1, 2, 3], (x) => x % 2);\nconsole.log(...groups.get(1), groups.has("1")); // 1, 3, false',
            },
          ],
        },
        {
          name: "Promise.withResolvers()",
          explanation:
            "Creates a promise together with externally accessible resolve and reject functions.",
          note: "ES2024. It does not cancel an underlying operation, and only the first settlement takes effect.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers",
          examples: [
            {
              label: "Resolve a deferred promise",
              language: "javascript",
              code: '(async () => {\n  const { promise, resolve } = Promise.withResolvers();\n  resolve("ready");\n  console.log(await promise);\n})();',
            },
            {
              label: "Adapt a one-time event without a DOM dependency",
              language: "javascript",
              code: '(async () => {\n  function once(target, eventName) {\n    const { promise, resolve } = Promise.withResolvers();\n    target.addEventListener(eventName, resolve, { once: true });\n    return promise;\n  }\n  const target = new EventTarget();\n  const waiting = once(target, "ready");\n  target.dispatchEvent(new Event("ready"));\n  console.log((await waiting).type);\n})();',
            },
            {
              label: "Reject a deferred promise",
              language: "javascript",
              code: '(async () => {\n  const { promise, reject } = Promise.withResolvers();\n  reject(new Error("failed"));\n  try {\n    await promise;\n  } catch (error) {\n    console.log(error.message);\n  }\n})();',
            },
          ],
        },
        {
          name: "structuredClone() in modern runtimes",
          explanation:
            "Deep-copies supported data graphs while preserving cycles and supported built-in values.",
          note: "This is a host API available since before ES2023, not an ES2023 language addition. Functions and DOM nodes cannot be cloned; custom class prototypes and private fields are not preserved rather than necessarily causing a failure.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone",
          examples: [
            {
              label: "Clone supported built-ins and nested data",
              language: "javascript",
              code: 'const original = {\n  date: new Date("2024-01-01"),\n  map: new Map([["k", "v"]]),\n  set: new Set([1, 2, 3]),\n  nested: { items: [1, 2] },\n};\nconst deep = structuredClone(original);\ndeep.nested.items.push(3);\nconsole.log(\n  deep.date.getUTCFullYear(),\n  deep.map.get("k"),\n  deep.set.has(2),\n  original.nested.items.length,\n);',
            },
            {
              label: "Preserve cycles and reject a function",
              language: "javascript",
              code: "const original = {};\noriginal.self = original;\nconst copy = structuredClone(original);\nconsole.log(copy !== original, copy.self === copy);\ntry {\n  structuredClone(() => {});\n} catch (error) {\n  console.log(error.name);\n}",
            },
            {
              label: "Observe loss of custom prototype and private fields",
              language: "javascript",
              code: 'class Record {\n  #secret = 1;\n  value = 2;\n  read() {\n    return this.#secret;\n  }\n}\nconst copy = structuredClone(new Record());\nconsole.log(copy.value, copy instanceof Record, typeof copy.read); // 2, false, "undefined"',
            },
          ],
        },
        {
          name: "Array.fromAsync()",
          explanation:
            "Collects an async iterable, iterable, or array-like source into a promised array.",
          note: "This is a newer runtime API; the screenshot’s ES2024 label is not a reliable standard-edition attribution. It awaits iteration sequentially and requires a finite source.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync",
          examples: [
            {
              label: "Collect an async generator",
              language: "javascript",
              code: "(async () => {\n  async function* gen() {\n    yield 1;\n    yield 2;\n    yield 3;\n  }\n  console.log(...(await Array.fromAsync(gen())));\n})();",
            },
            {
              label: "Collect a readable stream",
              language: "javascript",
              code: '(async () => {\n  const readableStream = new ReadableStream({\n    start(controller) {\n      controller.enqueue("first");\n      controller.enqueue("second");\n      controller.close();\n    },\n  });\n  console.log(...(await Array.fromAsync(readableStream)));\n})();',
            },
          ],
        },
        {
          name: "Iterator.prototype.map()",
          explanation: "Lazily transforms each iterator value.",
          note: "ES2025 synchronous iterator helper. Iterators are stateful and generally single-use; lazy helpers run as values are requested, while terminal helpers consume values. Check runtime support rather than assuming every Node.js 22 or browser release includes every newer API.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/map",
          examples: [
            {
              label: "Basic iterator operation",
              language: "javascript",
              code: "console.log(\n  ...[1, 2, 3]\n    .values()\n    .map((n) => n * n)\n    .toArray(),\n);",
            },
            {
              label: "Variation or boundary case",
              language: "javascript",
              code: "function* counter() {\n  let i = 0;\n  while (true) yield i++;\n}\nconsole.log(\n  ...counter()\n    .map((n) => n * n)\n    .take(5)\n    .toArray(),\n);",
            },
          ],
        },
        {
          name: "Iterator.prototype.filter()",
          explanation: "Lazily keeps values that pass a predicate.",
          note: "ES2025 synchronous iterator helper. Iterators are stateful and generally single-use; lazy helpers run as values are requested, while terminal helpers consume values. Check runtime support rather than assuming every Node.js 22 or browser release includes every newer API.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/filter",
          examples: [
            {
              label: "Basic iterator operation",
              language: "javascript",
              code: "console.log(\n  ...[1, 2, 3, 4]\n    .values()\n    .filter((n) => n % 2 === 0)\n    .take(3)\n    .toArray(),\n);",
            },
            {
              label: "Variation or boundary case",
              language: "javascript",
              code: "console.log(\n  ...[1, 3]\n    .values()\n    .filter((n) => n % 2 === 0)\n    .toArray(),\n);",
            },
          ],
        },
        {
          name: "Iterator.prototype.take()",
          explanation: "Lazily yields at most the requested number of values.",
          note: "ES2025 synchronous iterator helper. Iterators are stateful and generally single-use; lazy helpers run as values are requested, while terminal helpers consume values. Check runtime support rather than assuming every Node.js 22 or browser release includes every newer API.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/take",
          examples: [
            {
              label: "Basic iterator operation",
              language: "javascript",
              code: "function* counter() {\n  let i = 0;\n  while (true) yield i++;\n}\nconsole.log(...counter().take(3).toArray());",
            },
            {
              label: "Variation or boundary case",
              language: "javascript",
              code: "console.log(...[1, 2].values().take(5).toArray());",
            },
          ],
        },
        {
          name: "Iterator.prototype.drop()",
          explanation: "Lazily skips a leading number of values.",
          note: "ES2025 synchronous iterator helper. Iterators are stateful and generally single-use; lazy helpers run as values are requested, while terminal helpers consume values. Check runtime support rather than assuming every Node.js 22 or browser release includes every newer API.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/drop",
          examples: [
            {
              label: "Basic iterator operation",
              language: "javascript",
              code: "console.log(...[1, 2, 3, 4].values().drop(2).toArray());",
            },
            {
              label: "Variation or boundary case",
              language: "javascript",
              code: "console.log(...[1, 2].values().drop(0).toArray());",
            },
          ],
        },
        {
          name: "Iterator.prototype.flatMap()",
          explanation:
            "Lazily transforms values into iterables and flattens one level.",
          note: "ES2025 synchronous iterator helper. Iterators are stateful and generally single-use; lazy helpers run as values are requested, while terminal helpers consume values. Check runtime support rather than assuming every Node.js 22 or browser release includes every newer API.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/flatMap",
          examples: [
            {
              label: "Basic iterator operation",
              language: "javascript",
              code: "console.log(\n  ...[1, 2]\n    .values()\n    .flatMap((n) => [n, n * 10])\n    .toArray(),\n);",
            },
            {
              label: "Variation or boundary case",
              language: "javascript",
              code: "console.log(\n  ...[1, 2, 3]\n    .values()\n    .flatMap((n) => (n % 2 ? [n] : []))\n    .toArray(),\n);",
            },
          ],
        },
        {
          name: "Iterator.prototype.reduce()",
          explanation: "Consumes an iterator into one accumulated result.",
          note: "ES2025 synchronous iterator helper. Iterators are stateful and generally single-use; lazy helpers run as values are requested, while terminal helpers consume values. Check runtime support rather than assuming every Node.js 22 or browser release includes every newer API.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/reduce",
          examples: [
            {
              label: "Basic iterator operation",
              language: "javascript",
              code: "console.log([1, 2, 3].values().reduce((total, n) => total + n, 0));",
            },
            {
              label: "Variation or boundary case",
              language: "javascript",
              code: "console.log([].values().reduce((total, n) => total + n, 0));",
            },
          ],
        },
        {
          name: "Iterator.prototype.toArray()",
          explanation: "Consumes the remaining iterator values into an array.",
          note: "ES2025 synchronous iterator helper. Iterators are stateful and generally single-use; lazy helpers run as values are requested, while terminal helpers consume values. Check runtime support rather than assuming every Node.js 22 or browser release includes every newer API.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/toArray",
          examples: [
            {
              label: "Basic iterator operation",
              language: "javascript",
              code: "console.log(...[1, 2, 3].values().toArray());",
            },
            {
              label: "Variation or boundary case",
              language: "javascript",
              code: "const iterator = [1, 2, 3].values();\niterator.next();\nconsole.log(...iterator.toArray());",
            },
          ],
        },
        {
          name: "Iterator.prototype.forEach()",
          explanation:
            "Consumes an iterator while invoking a callback for each value.",
          note: "ES2025 synchronous iterator helper. Iterators are stateful and generally single-use; lazy helpers run as values are requested, while terminal helpers consume values. Check runtime support rather than assuming every Node.js 22 or browser release includes every newer API.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/forEach",
          examples: [
            {
              label: "Basic iterator operation",
              language: "javascript",
              code: '["a", "b"].values().forEach((value, index) => console.log(index, value));',
            },
            {
              label: "Variation or boundary case",
              language: "javascript",
              code: "const iterator = [1, 2].values();\niterator.forEach(() => {});\nconsole.log(iterator.next().done);",
            },
          ],
        },
        {
          name: "Iterator.prototype.some()",
          explanation:
            "Consumes values until one passes a predicate or the iterator ends.",
          note: "ES2025 synchronous iterator helper. Iterators are stateful and generally single-use; lazy helpers run as values are requested, while terminal helpers consume values. Check runtime support rather than assuming every Node.js 22 or browser release includes every newer API.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/some",
          examples: [
            {
              label: "Basic iterator operation",
              language: "javascript",
              code: "console.log([1, 2, 3].values().some((n) => n > 2));",
            },
            {
              label: "Variation or boundary case",
              language: "javascript",
              code: "console.log([].values().some(() => true));",
            },
          ],
        },
        {
          name: "Iterator.prototype.every()",
          explanation:
            "Consumes values until one fails a predicate or the iterator ends.",
          note: "ES2025 synchronous iterator helper. Iterators are stateful and generally single-use; lazy helpers run as values are requested, while terminal helpers consume values. Check runtime support rather than assuming every Node.js 22 or browser release includes every newer API.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/every",
          examples: [
            {
              label: "Basic iterator operation",
              language: "javascript",
              code: "console.log([2, 4, 6].values().every((n) => n % 2 === 0));",
            },
            {
              label: "Variation or boundary case",
              language: "javascript",
              code: "console.log([2, 3].values().every((n) => n % 2 === 0));",
            },
          ],
        },
        {
          name: "Iterator.prototype.find()",
          explanation:
            "Consumes values until a predicate matches and returns that value.",
          note: "ES2025 synchronous iterator helper. Iterators are stateful and generally single-use; lazy helpers run as values are requested, while terminal helpers consume values. Check runtime support rather than assuming every Node.js 22 or browser release includes every newer API.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/find",
          examples: [
            {
              label: "Basic iterator operation",
              language: "javascript",
              code: "console.log([1, 2, 3].values().find((n) => n > 1));",
            },
            {
              label: "Variation or boundary case",
              language: "javascript",
              code: "console.log([1, 2].values().find((n) => n > 5));",
            },
          ],
        },
        {
          name: "Set.prototype.union()",
          explanation:
            "Returns a new Set containing values present in either set.",
          note: "ES2025 set composition method. The input sets are unchanged; object members are compared by identity.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/union",
          examples: [
            {
              label: "Compare overlapping sets",
              language: "javascript",
              code: "const a = new Set([1, 2, 3]),\n  b = new Set([2, 3, 4]);\nconsole.log(...a.union(b));",
            },
            {
              label: "Use a boundary case",
              language: "javascript",
              code: "const a = new Set([1, 2, 3]),\n  b = new Set();\nconsole.log(...a.union(b));",
            },
          ],
        },
        {
          name: "Set.prototype.intersection()",
          explanation:
            "Returns a new Set containing values shared by both sets.",
          note: "ES2025 set composition method. The input sets are unchanged; object members are compared by identity.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/intersection",
          examples: [
            {
              label: "Compare overlapping sets",
              language: "javascript",
              code: "const a = new Set([1, 2, 3]),\n  b = new Set([2, 3, 4]);\nconsole.log(...a.intersection(b));",
            },
            {
              label: "Use a boundary case",
              language: "javascript",
              code: "const a = new Set([1, 2, 3]),\n  b = new Set([9]);\nconsole.log(...a.intersection(b));",
            },
          ],
        },
        {
          name: "Set.prototype.difference()",
          explanation:
            "Returns a new Set containing members of the receiver absent from the other set.",
          note: "ES2025 set composition method. The input sets are unchanged; object members are compared by identity.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/difference",
          examples: [
            {
              label: "Compare overlapping sets",
              language: "javascript",
              code: "const a = new Set([1, 2, 3]),\n  b = new Set([2, 3, 4]);\nconsole.log(...a.difference(b));",
            },
            {
              label: "Use a boundary case",
              language: "javascript",
              code: "const a = new Set([1, 2, 3]),\n  b = new Set([1, 2, 3]);\nconsole.log(...a.difference(b));",
            },
          ],
        },
        {
          name: "Set.prototype.symmetricDifference()",
          explanation:
            "Returns a new Set containing values present in exactly one set.",
          note: "ES2025 set composition method. The input sets are unchanged; object members are compared by identity.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/symmetricDifference",
          examples: [
            {
              label: "Compare overlapping sets",
              language: "javascript",
              code: "const a = new Set([1, 2, 3]),\n  b = new Set([2, 3, 4]);\nconsole.log(...a.symmetricDifference(b));",
            },
            {
              label: "Use a boundary case",
              language: "javascript",
              code: "const a = new Set([1, 2, 3]),\n  b = new Set([1, 2, 3]);\nconsole.log(...a.symmetricDifference(b));",
            },
          ],
        },
        {
          name: "Set.prototype.isSubsetOf()",
          explanation:
            "Checks whether every member of the receiver exists in another set.",
          note: "ES2025. Equal sets are subsets of each other.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/isSubsetOf",
          examples: [
            {
              label: "Reject partial overlap",
              language: "javascript",
              code: "const a = new Set([1, 2, 3]),\n  b = new Set([2, 3, 4]);\nconsole.log(a.isSubsetOf(b)); // false",
            },
            {
              label: "Accept full inclusion",
              language: "javascript",
              code: "console.log(new Set([2, 3]).isSubsetOf(new Set([1, 2, 3]))); // true",
            },
          ],
        },
        {
          name: "Set.prototype.isDisjointFrom()",
          explanation: "Checks whether two sets share no members.",
          note: "ES2025. An empty set is disjoint from every set, including itself.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/isDisjointFrom",
          examples: [
            {
              label: "Detect shared members",
              language: "javascript",
              code: "const a = new Set([1, 2, 3]),\n  b = new Set([2, 3, 4]);\nconsole.log(a.isDisjointFrom(b)); // false",
            },
            {
              label: "Accept non-overlapping sets",
              language: "javascript",
              code: "console.log(new Set([1]).isDisjointFrom(new Set([2, 3]))); // true",
            },
          ],
        },
        {
          name: "Top-level await",
          explanation:
            "Pauses evaluation of an ES module until an awaited operation settles.",
          note: "ES2022, included here as a related modern feature. This syntax is not valid at the top level of a classic script or CommonJS file. Run node main.mjs for each example.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await",
          examples: [
            {
              label: "Parse a self-contained fetched response",
              files: [
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'const response = await fetch("data:application/json,%7B%22ok%22%3Atrue%7D");\nif (!response.ok) throw new Error(`HTTP ${response.status}`);\nconst data = await response.json();\nconsole.log(data.ok);',
                },
              ],
            },
            {
              label: "Wait for imported module initialization",
              files: [
                {
                  path: "lib.mjs",
                  language: "javascript",
                  code: 'export const value = await Promise.resolve("ready");',
                },
                {
                  path: "main.mjs",
                  language: "javascript",
                  code: 'import { value } from "./lib.mjs";\nconsole.log(value);',
                },
              ],
            },
          ],
        },
        {
          name: "Error cause in modern JavaScript",
          explanation:
            "Associates a higher-level error with its underlying failure.",
          note: "ES2022, included among the related modern features rather than described as an ES2023 addition.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause",
          examples: [
            {
              label: "Wrap an operation failure",
              language: "javascript",
              code: 'function doWork() {\n  throw new TypeError("Invalid input");\n}\ntry {\n  try {\n    doWork();\n  } catch (cause) {\n    throw new Error("Wrapped failure", { cause });\n  }\n} catch (error) {\n  console.log(error.message, error.cause.name);\n}',
            },
            {
              label: "Retain the original cause",
              language: "javascript",
              code: 'const cause = new Error("Original");\nconst error = new Error("Context", { cause });\nconsole.log(error.cause === cause);',
            },
          ],
        },
        {
          name: "RegExp v flag and Unicode set notation",
          explanation:
            "Enables Unicode-aware character-class intersection and subtraction.",
          note: "ES2024. Use -- for subtraction and && for intersection; the screenshot’s single hyphen is not the subtraction operator. Greek non-letter examples need a non-letter Greek-script character, such as U+0375.",
          source:
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_class",
          examples: [
            {
              label: "Subtract letters from the Greek script set",
              language: "javascript",
              code: 'const greekNonLetter = /[\\p{Script=Greek}--\\p{Letter}]/v;\nconsole.log(greekNonLetter.test("͵"), greekNonLetter.test("α")); // true, false',
            },
            {
              label: "Intersect decimal numbers with ASCII digits",
              language: "javascript",
              code: 'const digit = /[\\p{Decimal_Number}&&[0-9]]/v;\nconsole.log(digit.test("5"), digit.test("٥")); // true, false',
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
          "javascript-general-cheatsheet:" +
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
