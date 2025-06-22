var hasSaid = false;

function onRotate() {
	document.getElementById("degree").innerHTML = rotX;
	if (rotX < 10 && !hasSaid) {
		hasSaid = true;
	}
	if (20 < rotX) {
		hasSaid = false;
		console.log(hasSaid);
	}

	oscillator.stop();
	oscillator.frequency.setValueAtTime(400 + (rotX * 3), audioCtx.currentTime);
	oscillator.start();
}

function start() {
	startRotation();
	oscillator.start();
}