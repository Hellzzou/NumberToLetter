function hundredInLetters(hundred){
	if ( hundred >= 1) {
		if ( hundred != 1){
			numberTransformed.push(numberArray[hundred][0]);
		}
		numberTransformed.push('cent');
	}
}

function tenInLetters(ten){
	if ( ten > 1 ){
		numberTransformed.push(numberArray[ten][2]);
	}
}

function unitInLetters(hundred,ten,unit){
	if ( ten == 1 || ten == 7 || ten == 9) {
		numberTransformed.push(numberArray[unit][1]);																				
			} else if ( unit != 0  || ( ten == 0 && hundred == 0)) {								
		numberTransformed.push(numberArray[unit][0]);																		
	}
}

function numberInLetter(numberToTransform){

	const unit = numberToTransform % 10;
	const ten = ( numberToTransform % 100 - unit ) / 10;
	const hundred = ( numberToTransform - ( ten * 10 ) - unit) / 100;

	// Affiche les centaines
	hundredInLetters(hundred);																
	// Affiche la dizaine
	tenInLetters(ten);																				 
	// Ajoute un 'et' si l'unité est 1 et que nous somme pas dans un cas spéciale donc se finissant par 11,12 ...
	if ( ten != 0 && ten != 1 && ten != 8 && ten != 9 && unit == 1 ) numberTransformed.push('et');						
	// Affiche les unités
	unitInLetters(hundred,ten,unit);

	return numberTransformed.join('-');
}

let numberToTransform = '';
let numberTransformed = [];
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