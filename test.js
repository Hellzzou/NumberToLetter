function hundredInLetters(hundred){
	if ( hundred > 1) {
		return numberArray[hundred][0] + '-cent';
	}else if (hundred == 1 ) {
		return 'cent';
	}
	return'';
}

function unitInLetters(hundred,ten,unit){
	if ( ten == 1 || ten == 7 || ten == 9) {
		return numberArray[unit][1];																				
			} else if ( unit != 0  || ( ten == 0 && hundred == 0)) {								
		return numberArray[unit][0];																		
	}
	else {
		return '';
	}
}

function numberInLetter(numberToTransform){

	const unit = numberToTransform % 10;
	const ten = ( numberToTransform % 100 - unit ) / 10;
	const hundred = ( numberToTransform - ( ten * 10 ) - unit) / 100;
	let numberTransformed = '';

	// Affiche les centaines
	numberTransformed += hundredInLetters(hundred);
	// Affiche un tiret entre les centaines et les dizaines si elles ne sont pas nulles
	if ( hundred != 0 && ( ten != 0 || unit != 0 )) numberTransformed += '-';																	
	// Affiche la dizaine
	numberTransformed += numberArray[ten][2];																					 
	// Ajoute un 'et' si l'unité est 1 et que nous somme pas dans un cas spéciale donc se finissant par 11,12 ...
	if ( ten != 0 && ten != 1 && ten != 8 && ten != 9 && unit == 1 ) numberTransformed += '-et';
	// Affiche un tiret si les dizaines et les unités ne sont pas nulles
	if ( ten > 1 && unit != 0 || (( ten == 7 || ten == 9 ) && unit == 0 )) numberTransformed += '-';							
	// Affiche les unités
	numberTransformed += unitInLetters(hundred,ten,unit);

	return numberTransformed;
}

let numberToTransform = '' ;
let numberArray = [['zéro','dix',''],					
				   ['un','onze',''],							
				   ['deux','douze','vingt'],							
				   ['trois','treize','trente'],
				   ['quatre','quatorze','quarante'],
				   ['cinq','quinze','cinquante'],
				   ['six','seize','soixante'],
				   ['sept','dix-sept','soixante'],
				   ['huit','dix-huit','quatre-vingt'],
				   ['neuf','dix-neuf','quatre-vingt']];
do {
	numberToTransform = parseInt(prompt('Entrez un  nombre entre 0 et 999'));
}
while ( isNaN(numberToTransform || numberToTransform < 0 || numberToTransform > 999));

alert(numberInLetter(numberToTransform));