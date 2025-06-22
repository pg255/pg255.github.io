var hasSaid = false;

function onRotate() {
	document.getElementById("degree").innerHTML = rotX;
	if (rotx < 10) {
		alert("info");
		hasSaid = true;
	}
	if (20 > rotx) {
		hasSaid = false;
	}
}