function parse() {
	var textInput = document.getElementById("theText").value;
	
	var initialRegex = /.* /g;
	var numbers = textInput.replace(initialRegex, '');

	var removeColon = /:.*/g;
	var minutesArray = numbers.match(removeColon);
	var removeBeforeColon = /.*:/g;
	var totalMinutes = 0;
	var minutesToHours = 0;
	if (minutesArray !== null) {
		minutesArray.forEach(minutes => {
			minutes = minutes.replace(removeBeforeColon, '');
			totalMinutes = totalMinutes + parseInt(minutes);
		});
		minutesToHours = totalMinutes / 60;
	}
	numbers = numbers.replace(removeColon, '');
	
	var newlineRegex = /\n/g;
	var operation = numbers.replace(newlineRegex, '+');
	
	var doublePlusRegex = /\+\+/g;
	var cleanedOperation = operation.replace(doublePlusRegex, '+');
	var remainingWordsRegex = /[a-z]/g;
	cleanedOperation = cleanedOperation.replace(remainingWordsRegex, '');
	if (cleanedOperation.charAt(cleanedOperation.length - 1) === '+') {
		cleanedOperation = cleanedOperation.slice(0, -1);
	}
	
	var output = eval(cleanedOperation);
	output = output + minutesToHours;
	output = "Total: " + output.toFixed(1);

	var elem = document.createElement("h2");
	var textElem = document.createTextNode(output);
	elem.appendChild(textElem);
	document.body.appendChild(elem);
}
function clearText() {
	document.getElementById("theText").value = "";
}
function clearResults() {
	var totals = document.body.getElementsByTagName("h2");
	while (totals[0]) totals[0].parentNode.removeChild(totals[0]);
}
