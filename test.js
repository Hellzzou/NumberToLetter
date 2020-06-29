function numberInLetter(numberToTransform){

	let unit = numberToTransform % 10;
	let ten = ( numberToTransform % 100 - unit ) / 10;
	let hundred = ( numberToTransform - ( ten * 10 ) - unit) / 100;
	let numberTransformed = '';

	if ( hundred == 0 && ten == 0){																									// Affiche les unités si les centaines et les dizaines sont nulles
		numberTransformed += numberArray[unit][0];
	}else {
		if ( hundred > 1){																											// Affiche les unités suivis de -cent pour les centaines normales
			numberTransformed += numberArray[hundred][0] + '-cent'
		} else if ( hundred == 1){																									// Affiche seulement cent si les centaines sont 1
			numberTransformed += 'cent'
		}
		if ( hundred != 0 && ten != 0 ) numberTransformed += '-';																	// Affiche un tiret entre les centaines et les dizaines si elles ne sont pas nulles
		numberTransformed += numberArray[ten][2];																					// Affiche la dizaine et Ajoute un 'et' si l'unité est 1 merci le francais !
		if (ten != 0 && ten != 1 && ten != 8 && ten != 9 && unit == 1) numberTransformed += '-et';									// Ajoute un 'et' si l'unité est 1 et que nous somme pas dans un cas spéciale donc se finissant par 11,12 ...
		if ( ten == 1 ){
			numberTransformed += numberArray[unit][1];																				// Affiche les dizaines spéciales 11,12,etc....
		}else if ( ten == 7 || ten == 9 ){
			numberTransformed += '-' + numberArray[unit][1];																		// Affiche les dizaines speciales pour 70 et 90
		}
		if ( unit >= 7 || ( ten != 1 && ten != 7 && ten != 9)) numberTransformed = numberTransformed + '-' + numberArray[unit][0];	// Affiche les unités normales donc si nous ne somme pas dans les cas speciaux d'au dessus
	}
	return numberTransformed;
}

let numberToTransform = '' ;
let numberArray = [['zéro','',''],					
				   ['un','onze',''],							
				   ['deux','douze','vingt'],							
				   ['trois','treize','trente'],
				   ['quatre','quatorze','quarante'],
				   ['cinq','quinze','cinquante'],
				   ['six','seize','soixante'],
				   ['sept','dix','soixante'],
				   ['huit','dix','quatre-vingt'],
				   ['neuf','dix','quatre-vingt']];
do {
	numberToTransform = parseInt(prompt('Entrez un  nombre entre 0 et 999'));
}
while ( isNaN(numberToTransform || numberToTransform < 0 || numberToTransform > 999));

alert(numberInLetter(numberToTransform));