const numberArray = [
  ["zéro", "dix", ""],
  ["un", "onze", ""],
  ["deux", "douze", "vingt"],
  ["trois", "treize", "trente"],
  ["quatre", "quatorze", "quarante"],
  ["cinq", "quinze", "cinquante"],
  ["six", "seize", "soixante"],
  ["sept", "dix-sept", "soixante"],
  ["huit", "dix-huit", "quatre-vingt"],
  ["neuf", "dix-neuf", "quatre-vingt"],
];

function hundredInLetters(hundred) {
  const result = [];
  if (hundred >= 1) {
    if (hundred != 1) {
      result.push(numberArray[hundred][0]);
    }
    result.push("cent");
  }
  return result;
}

function tenInLetters(ten) {
  const result = [];
  if (ten > 1) {
    result.push(numberArray[ten][2]);
  }
  return result;
}

function unitInLetters(hundred, ten, unit) {
  const result = [];
  if (ten == 1 || ten == 7 || ten == 9) {
    result.push(numberArray[unit][1]);
  } else if (unit != 0 || (ten == 0 && hundred == 0)) {
    result.push(numberArray[unit][0]);
  }
  return result;
}

function numberInLetter(numberToTransform) {
  const unit = numberToTransform % 10;
  const ten = ((numberToTransform % 100) - unit) / 10;
  const hundred = (numberToTransform - ten * 10 - unit) / 100;

  const h = hundredInLetters(hundred);
  const t = tenInLetters(ten);
  // Ajoute un 'et' si l'unité est 1 et que nous somme pas dans un cas spéciale donc se finissant par 11,12 ...
  let part;
  if (ten != 0 && ten != 1 && ten != 8 && ten != 9 && unit == 1) {
    part = "et";
  }
  const u = unitInLetters(hundred, ten, unit);

  return [...h, ...t, part, ...u].filter(Boolean).join("-");
}

let numberToTransform = "";

do {
  numberToTransform = parseInt(prompt("Entrez un  nombre entre 0 et 999"), 10);
} while (
  isNaN(numberToTransform || numberToTransform < 0 || numberToTransform > 999)
);

alert(numberInLetter(numberToTransform));
