/*
* Level 1 — Beginner
* */

//1.1 Running JavaScript - Done
//1.2 Variables and Constants
const ownerName = "Mykola"
let balance = 100

balance -= 30
console.log(`Balance: ${balance}`)

balance += 45
console.log(`Balance: ${balance}`)

balance -= 12.5
console.log(`Balance: ${balance}`)
console.log(`${ownerName} has ${balance} left`)

//1.3 Data Types
const values = [42, "42", true, null, undefined, 7n, NaN, [1, 2], { a: 1 }];
console.log(values.map(value => typeof value))

//1.4 Operators
const a = 17
const b = 5

console.log(`${a} + ${b} = ${a + b}`)
console.log(`${a} - ${b} = ${a - b}`)
console.log(`${a} * ${b} = ${a * b}`)
console.log(`${a} / ${b} = ${a / b}`)
console.log(`${a} % ${b} = ${a % b}`)
console.log(a ** 2)
console.log(a % 2 === 0)
console.log(10 <= a <= 20)
console.log((a * b) > 50 ? 'Big' : 'Small')

//1.5 Type Conversion and Equality
const ageInput = "29";
const heightInput = "1.82m";
const quantityInput = "";
const nicknameInput = "0";

console.log(Number(ageInput))
console.log(parseFloat(heightInput))
console.log(parseFloat(quantityInput) ? quantityInput : 'missing' )
console.log(!!nicknameInput)

//1.6 Strings
const fullName = "  ada LOVELACE ";
const birthYear = 1815;

function clearTheName(name) {
  const nameArray = name.trim().toLowerCase().split(' ');

  return nameArray.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}

const cleanFullName = clearTheName(fullName)

console.log(cleanFullName)

const username = cleanFullName.toLowerCase().replace(" ", ".") + birthYear.toString().slice(2);
console.log(username)

console.log(username.length)

//1.7 Conditionals
const orderTotal = 72.5;   // in EUR
const country = "PT";      // ISO country code
const isMember = false;
let shippingCost = null;

if(orderTotal === 0) {
  console.error('Invalid error')
} else {
  switch (country) {
    case "PT":
      shippingCost = 4.99
      break;
    case "ES":
      shippingCost = 4.99
      break;
    case "FR":
      shippingCost = 7.99
      break;
    case "DE":
      shippingCost = 7.99
      break;
    default:
      shippingCost = 14.99
  }
}

if(orderTotal >= 100) shippingCost = shippingCost / 2
if(isMember) shippingCost = 0

const total = orderTotal + shippingCost;

console.log(`Shipping: ${shippingCost} EUR`)
console.log(`Total: ${total} EUR`)

//1.8 Loops
const word = 'FizzBuzz';

for (let n = 1; n <= 20; n++) {
  if(n % 3 === 0 && n % 5 === 0) {
    console.log(word)
  } else if(n % 3 === 0) {
    console.log(word.slice(0, 4))
  } else if(n % 5 === 0) {
    console.log(word.slice(4))
  } else {
    console.log(n)
  }
}

let candidate = 1001;
while (!(candidate % 7 === 0 && candidate % 11 === 0 && candidate % 13 === 0)) {
  candidate++;
}
console.log(candidate); // → 1001

//1.9 Functions
function celsiusToFahrenheit(c) {
  return (c * 9 / 5 + 32);
}

function fahrenheitToCelsius(f) {
  return ((f - 32) * 5 / 9);
}

function getWeatherType(c) {
  if(c <= 0 ) return 'freezing'
  if(c <= 15 && c > 0 ) return 'cold'
  if(c <= 25 && c > 15 ) return 'mild'

  return 'hot'
}

function formatReading(t, unit = "C") {
  let tempValue = unit === 'F' ? celsiusToFahrenheit(t) : t

  const weatherType = getWeatherType(t)

  return `${tempValue.toFixed(1)}°${unit} (${weatherType})`;
}

const c = celsiusToFahrenheit(100)
const f = fahrenheitToCelsius(212)
const cold = getWeatherType(-3)
const hot = getWeatherType(30)
const f1 = formatReading(21)
const f2 = formatReading(21, "F")
const f3 = formatReading(8)

console.log(c)
console.log(f)
console.log(cold)
console.log(hot)
console.log(f1)
console.log(f2)
console.log(f3)

//1.10 Arrays
const playlist = ["Intro", "Blue", "Echoes", "Drift"];
playlist.push('Finale')
playlist.unshift('Overture')

const indexBlue = playlist.indexOf('Blue')
playlist.splice(indexBlue, 1)

const indexEchoes = playlist.indexOf('Echoes')

playlist[indexEchoes] = 'Echoes (Live)'

console.log(playlist.join(' -> '))

for(let i = 0; i < playlist.length; i++) {
  console.log(`${i+1}. ${playlist[i]}`)
}

function getLongestTitle(array) {
  let longestTitle = ''

  for(let i = 0; i < array.length; i++) {
    if(array[i].length > longestTitle.length) {
      longestTitle = array[i]
    }
  }

  return longestTitle;
}

const longestTitle = getLongestTitle(playlist)

console.log(longestTitle)

const sortedArray = playlist.toSorted()
console.log(sortedArray)
console.log(playlist)

//1.11 Objects
const library = {
  name: "City Library",
  books: [
    { title: "Dune", author: "Frank Herbert", year: 1965, available: true },
    { title: "Neuromancer", author: "William Gibson", year: 1984, available: false },
    { title: "Kindred", author: "Octavia E. Butler", year: 1979, available: true },
  ],
  addBook(title, author, year, available = true) {
    return this.books.push({title, author, year, available})
  },
  findByTitle(title) {
    return this.books.find(book => book.title === title);
  },
  checkOut(title) {
    const book = this.findByTitle(title);

    if(book && book.available) {
      book.available = false
      return true
    }

    return false
  },
  availableTitles() {
    return [...this.books].filter(book => book.available).map(book => book.title).join(', ')
  }
};

console.log(library.addBook("Parable of the Sower", "Octavia E. Butler", 1993));
console.log(library.findByTitle("Kindred")?.author);
console.log(library.findByTitle("Missing")?.author);
console.log(library.checkOut("Dune"));
console.log(library.checkOut("Dune"));
console.log(library.checkOut("Missing"));
console.log(library.availableTitles());
for (const [key, value] of Object.entries(library.findByTitle("Kindred"))) {
  console.log(`${key}: ${value}`);
}

//Beginner Milestone Project: Gradebook Report
const students = [
  { name: "Ana", scores: [88, 92, 79] },
  { name: "Ben", scores: [65, 70, 58] },
  { name: "Chloé", scores: [95, 98, 100] },
  { name: "Dev", scores: [] },
];