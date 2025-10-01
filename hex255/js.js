function color(color) {
	document.getElementById("color").style.backgroundColor = `#${color}`;
	document.getElementById("colorText").innerHTML = `#${color}`;
}

function showColorButtons(colors) {
	if (colors.length == 0) {
		document.getElementById("colorButtons").innerHTML = "";
		color("0000");
		return;
	}
	var html = "";
	for (i in colors) {
		html += `<span class="colorButton" onclick="color('${colors[i].color}')">#${colors[i].color} (${colors[i].name})</span><br>`;
	}
	document.getElementById("colorButtons").innerHTML = `Choose color to show:<br><br><span>${html}</span>`;

	color(colors[0].color);
}

function generateColors(text) {
	let colors = [];
	text.replace("#", "");
	colors = colors.concat(getPossibleColors(textToHex(text), function(n) {return `Text to ASCII to hex, converted to ${n} long HEX color`;}));
	colors = colors.concat(getPossibleColors(text.replace(/[^0-9a-f]/gi, '0'), function(n) {return `Text where non hex letters replaced with 0, converted to ${n} long HEX color`;}));
	colors = colors.concat(getPossibleColors(text.replace(/[^0-9a-f]/gi, ''), function(n) {return `Text where non hex letters are removed, converted to ${n} long HEX color`;}))
	showColorButtons([...new Set(colors)]);
}

function getPossibleColors(hextext, namerFunction) {
	let colors = [];
	if (hextext == "") {
		return colors;
	}
	if (hextext.length % 6 == 0) {
		colors.push({color: filterLetters(hextext, hextext.length / 6), name: namerFunction(6)});
	} else if (hextext.length % 3 == 0) {
		colors.push({color: filterLetters(hextext, hextext.length / 3), name: namerFunction(3)});
	}
	if (hextext.length % 8 == 0) {
		colors.push({color: filterLetters(hextext, hextext.length / 8), name: namerFunction(8)});
	} else if (hextext.length % 4 == 0) {
		colors.push({color: filterLetters(hextext, hextext.length / 4), name: namerFunction(4)});
	}
	return colors;
}

function filterLetters(text, n) {
	let result = "";
	for (let i = 0; i < text.length; i += n) {
		result += text[i];
	}
	return result;
}

function textToHex(text) {
    let hexResult = '';
    for (let i = 0; i < text.length; i++) {
        // Get ASCII value of character
        let asciiValue = text.charCodeAt(i);
        // Convert ASCII value to hexadecimal and append to result
        hexResult += asciiValue.toString(16).padStart(2, '0'); // pad with zero if needed
    }
    return hexResult;
}