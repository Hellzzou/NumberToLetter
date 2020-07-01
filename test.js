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
    if (hundred != 1) result.push(numberArray[hundred][0]); 
    result.push('cent');
  }
  return result;
}

function tenInLetters(ten) {
  const result = [];
  if (ten > 1) result.push(numberArray[ten][2]); 
  return result;
}

function unitInLetters(hundred, ten, unit, choice) {
  const result = [];
  // Affiche les nombres spéciaux 11,12,...
  if (ten == 1 || ten == 7 || ten == 9) {
    result.push(numberArray[unit][1]);
  /* Sinon Affiche les unités que dans 3 cas : 1) ( choice == unit ) Dans le cas des unités : si nous ne sommes pas dans un cas spécial 11,12,... ou si tous les autres chiffres sont zéro
                                               2) ( choice == thousand ) Dans le cas des milliers ne les affiche que si c'est > 1 ( on ne dit pas "un mille" )
                                               3) ( choice == milion ) Dans le cas des millions ne les affiche que si c'est > ) ( oui dans ce cas on dit " un million ")*/
  } else if ((choice == 'unit' && (unit > 0 || (!ten && !hundred ))) || ( choice == 'thousand' && unit > 1) || (choice == 'milion' && unit > 0)) {
    result.push(numberArray[unit][0]);
  } 
  return result;
}

function numbersInLetters(stringToTransform) {

  let arrayToTransform = [0,0,0,0,0,0,0,0,0];

  // Decale les chiffres a droite du tableau et met des 0 devant
  for ( let i = arrayToTransform.length - 1 ; i >= 0 ; i -- ){
    if (stringToTransform.length - arrayToTransform.length + i >= 0 ) arrayToTransform[i] = stringToTransform[stringToTransform.length - arrayToTransform.length + i]; 
  }

  const hundredMilion = hundredInLetters(arrayToTransform[arrayToTransform.length - 9]);
  const tenMilion = tenInLetters(arrayToTransform[arrayToTransform.length - 8]);
  // Ajoute un 'et' si l'unité est 1 et que nous somme pas dans un cas spéciale donc se finissant par 11,12 ...
  let andMilion;
  if (arrayToTransform[arrayToTransform.length - 9] > 1 && arrayToTransform[arrayToTransform.length - 8] < 8 && arrayToTransform[arrayToTransform.length - 7] == 1) andMilion = "et";
  const milion = unitInLetters(arrayToTransform[arrayToTransform.length - 9], arrayToTransform[arrayToTransform.length - 8], arrayToTransform[arrayToTransform.length - 7],'milion');
  let million;
  if (arrayToTransform[arrayToTransform.length - 9] > 0 || arrayToTransform[arrayToTransform.length - 8] > 0 || arrayToTransform[arrayToTransform.length - 7] > 0 ) million = 'million';

  const hundredThousand = hundredInLetters(arrayToTransform[arrayToTransform.length - 6]);
  const tenThousand = tenInLetters(arrayToTransform[arrayToTransform.length - 5]);
  // Ajoute un 'et' si l'unité est 1 et que nous somme pas dans un cas spéciale donc se finissant par 11,12 ...
  let andThousand;
  if (arrayToTransform[arrayToTransform.length - 6] > 1 && arrayToTransform[arrayToTransform.length - 5] < 8 && arrayToTransform[arrayToTransform.length - 4] == 1) andThousand = "et";
  const thousand = unitInLetters(arrayToTransform[arrayToTransform.length - 6], arrayToTransform[arrayToTransform.length - 5], arrayToTransform[arrayToTransform.length - 4],'thousand');  
  let mille;
  if (arrayToTransform[arrayToTransform.length - 6] > 0 || arrayToTransform[arrayToTransform.length - 5] > 0 || arrayToTransform[arrayToTransform.length - 4] > 0 ) mille = 'mille';

  const hundred = hundredInLetters(arrayToTransform[arrayToTransform.length - 3]);
  const ten = tenInLetters(arrayToTransform[arrayToTransform.length - 2]);
  // Ajoute un 'et' si l'unité est 1 et que nous somme pas dans un cas spéciale donc se finissant par 11,12 ...
  let andUnit;
  if (arrayToTransform[arrayToTransform.length - 2] > 1 && arrayToTransform[arrayToTransform.length - 2] < 8 && arrayToTransform[arrayToTransform.length - 1] == 1) andUnit = "et";  
  const unit = unitInLetters(arrayToTransform[arrayToTransform.length - 3], arrayToTransform[arrayToTransform.length - 2], arrayToTransform[arrayToTransform.length - 1],'unit');
  return [...hundredMilion,...tenMilion,andMilion,...milion,million,...hundredThousand,...tenThousand,andThousand,...thousand,mille,...hundred, ...ten, andUnit, ...unit].filter(Boolean).join("-");
}

let numberToTransform = "";
let stringToTransform = [];

do {
  stringToTransform = prompt("Entrez un  nombre entre 0 et 999 999 999").split('');
  numberToTransform = parseInt(stringToTransform, 10);

} while (isNaN(numberToTransform || numberToTransform < 0 || numberToTransform > 999999999));

alert(numbersInLetters(stringToTransform));