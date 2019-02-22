function decimal() {
	var textInput = document.getElementById("textarea").value;
	
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
