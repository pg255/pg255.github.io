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
		html += `<span class="colorButton" onclick="color('${colors[i]}')">#${colors[i]}</span><br>`;
	}
	document.getElementById("colorButtons").innerHTML = `Choose color to show:<br><br><span>${html}</span>`;

	color("0000");

	if (colors.length == 1) {
		color(colors[0]);
	}
}

function generateColors(text) {
	let colors = [];
	text.replace("#", "");
	colors = colors.concat(getPossibleColors(text.replace(/[^0-9a-f]/gi, '0')));
	colors = colors.concat(getPossibleColors(text.replace(/[^0-9a-f]/gi, '')));
	showColorButtons([...new Set(colors)]);
}

function getPossibleColors(hextext) {
	let colors = [];
	if (hextext == "") {
		return colors;
	}
	if (hextext.length % 8 == 0) {
		colors.push(filterLetters(hextext, hextext.length / 8));
	} else if (hextext.length % 4 == 0) {
		colors.push(filterLetters(hextext, hextext.length / 4));
	}
	if (hextext.length % 6 == 0) {
		colors.push(filterLetters(hextext, hextext.length / 6));
	} else if (hextext.length % 3 == 0) {
		colors.push(filterLetters(hextext, hextext.length / 3));
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