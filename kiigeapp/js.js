var hasSaid = false;

function onRotate() {
	document.getElementById("degree").innerHTML = rotX;
	if (rotX < 10 && !hasSaid) {
		hasSaid = true;
	}
	if (20 < rotX) {
		hasSaid = false;
	}

	oscillator.frequency.setValueAtTime(300 + Math.abs(rotX * 6), audioCtx.currentTime);
}

function start() {
	startRotation();
	if (document.getElementById("doSound").checked) {
		oscillator.start();
	}
}