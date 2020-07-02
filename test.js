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

function hundredInLetters(hundred, ten, unit, choice) {
  const result = [];
  if (hundred > 1) {
      result.push(numberArray[hundred][0]); 
      if (ten == 0 && unit == 0 && choice == 'unit' ) result.push('cents');
      else result.push('cent');
  }
  if (hundred == 1) result.push('cent');
  return result;
}

function tenInLetters(ten, unit, choice) {
  const result = [];
  if (ten > 1) {
    if ( ten == 8 && choice == 'unit') result.push('quatre-vingts');
    else result.push(numberArray[ten][2]); 
  }
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

function displayMilions(arrayToTransform){

  // Si tous les chiffres des millions ne sont pas nuls
  if (arrayToTransform[arrayToTransform.length - 9] > 0 || arrayToTransform[arrayToTransform.length - 8] > 0 || arrayToTransform[arrayToTransform.length - 7] > 0 ) {
    let sum = 0;
    for ( let i = 1 ; i <= 6 ; i++ ){
      sum += arrayToTransform[arrayToTransform.length - i]
    }
    const millions = parseInt(arrayToTransform[arrayToTransform.length - 7]) + 10 * parseInt(arrayToTransform[arrayToTransform.length - 8]) + 100 * parseInt(arrayToTransform[arrayToTransform.length - 9])
  // si les millions sont supérieurs à 1 et que tous les chiffres derrieres sont nuls met un 's' à million
  return ( millions > 1  && sum == 0 ) ? 'millions' : 'million';
  }
  else {
    return '';
  }
}

function addAnd(ten,unit){
  if ( ten > 1 && ten < 8 && unit ==1 ) return 'et';
  else return '';
}

function numbersInLetters(stringToTransform) {

  let arrayToTransform = [0,0,0,0,0,0,0,0,0];

  // Decale les chiffres a droite du tableau et met des 0 devant
  for ( let i = arrayToTransform.length - 1 ; i >= 0 ; i -- ){
    if (stringToTransform.length - arrayToTransform.length + i >= 0 ) arrayToTransform[i] = stringToTransform[stringToTransform.length - arrayToTransform.length + i]; 
  }

  const hundredMilion = hundredInLetters(arrayToTransform[arrayToTransform.length - 9], arrayToTransform[arrayToTransform.length - 8], arrayToTransform[arrayToTransform.length - 7, 'milion']);
  const tenMilion = tenInLetters(arrayToTransform[arrayToTransform.length - 8], arrayToTransform[arrayToTransform.length - 7], 'milion');
  const andMilion = addAnd(arrayToTransform[arrayToTransform.length - 8], arrayToTransform[arrayToTransform.length - 7]);
  const milion = unitInLetters(arrayToTransform[arrayToTransform.length - 9], arrayToTransform[arrayToTransform.length - 8], arrayToTransform[arrayToTransform.length - 7],'milion');
  const writeMilion = displayMilions(arrayToTransform);
  const hundredThousand = hundredInLetters(arrayToTransform[arrayToTransform.length - 6], arrayToTransform[arrayToTransform.length - 5], arrayToTransform[arrayToTransform.length - 4], 'thousand');
  const tenThousand = tenInLetters(arrayToTransform[arrayToTransform.length - 5], arrayToTransform[arrayToTransform.length - 4], 'thousand');
  const andThousand = addAnd(arrayToTransform[arrayToTransform.length - 5], arrayToTransform[arrayToTransform.length - 4]);
  const thousand = unitInLetters(arrayToTransform[arrayToTransform.length - 6], arrayToTransform[arrayToTransform.length - 5], arrayToTransform[arrayToTransform.length - 4],'thousand');  
  const writeThousand = (arrayToTransform[arrayToTransform.length - 6] > 0 || arrayToTransform[arrayToTransform.length - 5] > 0 || arrayToTransform[arrayToTransform.length - 4] > 0 ) ? 'mille' : '';
  const hundred = hundredInLetters(arrayToTransform[arrayToTransform.length - 3], arrayToTransform[arrayToTransform.length - 2], arrayToTransform[arrayToTransform.length - 1], 'unit');
  const ten = tenInLetters(arrayToTransform[arrayToTransform.length - 2], arrayToTransform[arrayToTransform.length - 1], 'unit');
  const andUnit = addAnd(arrayToTransform[arrayToTransform.length - 2], arrayToTransform[arrayToTransform.length - 1]);  
  const unit = unitInLetters(arrayToTransform[arrayToTransform.length - 3], arrayToTransform[arrayToTransform.length - 2], arrayToTransform[arrayToTransform.length - 1],'unit');
  return [...hundredMilion,...tenMilion,andMilion,...milion,writeMilion,...hundredThousand,...tenThousand,andThousand,...thousand,writeThousand,...hundred, ...ten, andUnit, ...unit].filter(Boolean).join("-");
}

let numberToTransform = "";
let stringToTransform = [];

do {
  stringToTransform = prompt("Entrez un  nombre entre 0 et 999 999 999").split('');
  numberToTransform = parseInt(stringToTransform, 10);

} while (isNaN(numberToTransform || numberToTransform < 0 || numberToTransform > 999999999));

alert(numbersInLetters(stringToTransform));