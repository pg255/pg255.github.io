var hasSaid = false;

function onRotate() {
	document.getElementById("degree").innerHTML = rotX;
	if (rotX < 10) {
		alert("info");
		hasSaid = true;
	}
	if (20 > rotX) {
		hasSaid = false;
	}
}