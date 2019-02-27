function decimal() {
	var textInput = document.getElementById("textareaDec").value;
	
	var initialRegex = /.* /g;
	var onlyDecimals = textInput.replace(initialRegex, '');
	
	var newlineRegex = /\n/g;
	var operation = onlyDecimals.replace(newlineRegex, '+');
	
	var output = eval(operation);
	output = "Total: " + output;
	
	var elem = document.createElement("h2");
	var textElem = document.createTextNode(output);
	elem.appendChild(textElem);
	document.body.appendChild(elem);
}

function colon() {
	var textInput = document.getElementById("textareaCol").value;
	
	var initialRegex = /.* /g;
	var onlyHours = textInput.replace(initialRegex, '');
	
	var removeColon = /:.*/g;
	var onlyHour = onlyHours.replace(removeColon, '');
	
	var newlineRegex = /\n/g;
	var operation = onlyHour.replace(newlineRegex, '+');
	
	var output = eval(operation);
	output = "Total: " + output;
	
	var elem = document.createElement("h2");
	var textElem = document.createTextNode(output);
	elem.appendChild(textElem);
	document.body.appendChild(elem);
}
