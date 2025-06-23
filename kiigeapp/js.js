var hasSaid = false, record, highest;

function onRotate() {
	document.getElementById("degree").innerHTML = rotX.toFixed(2);
	document.getElementById("degree").innerHTML = record.toFixed(2);
	if (rotX < 10 && !hasSaid) {
		hasSaid = true;
	}
	if (20 < rotX) {
		hasSaid = false;
	}

	if (rotX > highest) {
		highest = rotX;
	}

	oscillator.frequency.setValueAtTime(parseFloat(document.getElementById("0pitch").value) + Math.abs(rotX * parseFloat(document.getElementById("multiplier").value)), audioCtx.currentTime);
}

function start() {
	startRotation();
	if (document.getElementById("doSound").checked) {
		oscillator.start();
	}
	document.getElementById("start");
}