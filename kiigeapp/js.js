var hasSaid = false, record = 0, highest;

function onRotate() {
	if (rotX < 10 && !hasSaid) {
		hasSaid = true;
	}
	if (20 < rotX) {
		hasSaid = false;
	}

	if (rotX > record) {
		record = rotX;
	}
	
	document.getElementById("degree").innerHTML = parseFloat(rotX).toFixed(2);
	document.getElementById("record").innerHTML = parseFloat(record).toFixed(2);

	oscillator.frequency.setValueAtTime(parseFloat(document.getElementById("0pitch").value) + Math.abs(rotX * parseFloat(document.getElementById("multiplier").value)), audioCtx.currentTime);
}

function start() {
	startRotation();
	if (document.getElementById("doSound").checked) {
		oscillator.start();
	}
	document.getElementById("start");
}