/*
* Beginner
* */

//1. Personal expense summary
const expenses = [
  { label: "Groceries", category: "Food", amount: 125 },
  { label: "Restaurant", category: "Food", amount: 65 },
  { label: "Coffee", category: "Food", amount: 15 },
  { label: "Food Delivery", category: "Food", amount: 42 },

  { label: "Rent", category: "Housing", amount: 850 },
  { label: "Electricity", category: "Housing", amount: 75 },
  { label: "Water Bill", category: "Housing", amount: 30 },
  { label: "Internet", category: "Housing", amount: 45 },

  { label: "Gas", category: "Transportation", amount: 90 },
  { label: "Public Transport", category: "Transportation", amount: 35 },
  { label: "Taxi", category: "Transportation", amount: 28 },
  { label: "Car Maintenance", category: "Transportation", amount: 150 },

  { label: "Netflix", category: "Entertainment", amount: 16 },
  { label: "Cinema", category: "Entertainment", amount: 25 },
  { label: "Video Games", category: "Entertainment", amount: 60 },
  { label: "Concert Tickets", category: "Entertainment", amount: 85 },

  { label: "Gym Membership", category: "constructor", amount: 50 },
  { label: "Pharmacy", category: "constructor", amount: 22 },
  { label: "Doctor Visit", category: "constructor", amount: 100 },
  { label: "Vitamins", category: "constructor", amount: 35 },
];

//Solution:
const validExpenses = expenses.filter(expense => {
  const isValid = expense.amount >= 0 && Number.isFinite(expense.amount);

  if(!isValid) console.log(`Invalid amount for ${expense.category} -> ${expense.label}, (${typeof expense.amount === 'string' ? 'string' : expense.amount})`);

  return isValid;
});

const total = validExpenses.reduce((sum, expense) => sum + expense.amount, 0)

const totalsPerCategory = validExpenses.reduce((acc, expense) => {
  acc[expense.category] ??= 0;

  acc[expense.category] += expense.amount;

  return acc;
}, Object.create(null))

const theLargestExpense = validExpenses.reduce((acc, expense) => acc.amount > expense.amount ? acc : expense, null)

const report = `Your total expenses are ${total} UAH with largest expense of ${theLargestExpense.amount} for ${theLargestExpense.label}`

//2. Contact-name cleanup tool

// REVIEW (exercise 2): Useful fixture: mixed casing, outer/internal spaces,
// repeated names, and a blank entry. Also try whitespace-only names, tabs,
// empty input, and a completely different input array to expose hidden coupling.
const contactNames = [
  "  John Smith",
  "jane doe",
  "ALICE JOHNSON",
  "Michael Brown  ",
  "  emily davis  ",
  "Robert Wilson",
  "john smith",
  "JANE DOE",
  "  David Miller",
  "sarah   taylor",
  "Alice Johnson",
  "MICHAEL BROWN",
  "  Jessica Moore  ",
  "robert wilson",
  "Daniel Anderson",
  "EMILY DAVIS",
  "",
  "  sarah taylor",
  "jessica moore",
  "David Miller",
  "  daniel anderson  "
];

function cleanContactNames(names) {
  // 1. Clean whitespace and preserve original values
  const comparison = names.map(original => {
    const cleaned = original.trim().replace(/\s+/g, " ");

    return {
      original,
      cleaned,
      status: cleaned === "" ? "Blank" : "Pending"
    };
  });

  // 2. Remove blank entries from processing
  const validEntries = comparison.filter(entry => entry.cleaned !== "");

  // 3. Prepare collections
  const trackingNames = new Set();
  const uniqueNames = [];
  const duplicates = [];

  // 4. Detect duplicates
  validEntries.forEach(entry => {
    const normalizedName = entry.cleaned.toLowerCase();

    if (trackingNames.has(normalizedName)) {
      const firstMatch = uniqueNames.find(
        name => name.toLowerCase() === normalizedName
      );

      duplicates.push({
        name: entry.cleaned,
        duplicateOf: firstMatch
      });

      entry.status = "Duplicate";
    } else {
      trackingNames.add(normalizedName);
      uniqueNames.push(entry.cleaned);

      entry.status = "Accepted";
    }
  });

  // 5. Return results
  return {
    uniqueNames,
    duplicates,
    comparison
  };
}

const result = cleanContactNames(contactNames);

console.log("Unique names:", result.uniqueNames);
console.log("Duplicates:", result.duplicates);
console.table(result.comparison);

//3. Event registration form

//4. Daily reading checklist

//5. Product catalog filter

//6. File-name review report

//7. Focus-session timer

//8. Community announcement board

/*
* Intermediate
* */

//9.

//10.

//11.

//12.

//13.

//14.

//15.

//16.

/*
* Advanced
* */

//17.

//18.

//19.

//20.

//21.

//22.

//23.

//24.
