var hasSaid = false;

function onRotate() {
	document.getElementById("degree").innerHTML = rotX;
	if (rotX < 10 && !hasSaid) {
		hasSaid = true;
	}
	if (20 < rotX) {
		hasSaid = false;
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