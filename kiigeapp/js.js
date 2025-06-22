var degree, doneSaying = false, roundmax = 0, overallmax;

const acl = new Accelerometer({ frequency: 100 });
acl.addEventListener("reading", () => {
	degree = acl.x * 10;
	if (degree > max) {
		max = degree;
	}
	if (degree > overallmax) {
		overallmax = degree;
	}
	if (degree < 10 && !doneSaying) {
		document.write("done");
		doneSaying = true;
		max = 0;
	}
	if (degree > 20) {
		doneSaying = false;
	}
	document.getElementById("degree").innerHTML = degree;
});

acl.start();