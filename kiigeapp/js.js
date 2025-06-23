var hasSaid = false, record = 0, highest;

function onRotate() {
	if (rotX < 10 && !hasSaid) {
		hasSaid = true;
	}
	if (20 < rotX) {
		hasSaid = false;
	}

	if (Math.abs(rotX) > record) {
		record = Math.abs(rotX);
	}

	if (record) {
		document.getElementById("record").innerHTML = parseFloat(record).toFixed(2);
	}
	document.getElementById("degree").innerHTML = parseFloat(rotX).toFixed(2);

	oscillator.frequency.setValueAtTime(parseFloat(document.getElementById("0pitch").value) + Math.abs(rotX * parseFloat(document.getElementById("multiplier").value)), audioCtx.currentTime);
}

function start() {
	startRotation();
	if (document.getElementById("doSound").checked) {
		oscillator.start();
	}
	document.getElementById("start");
	requestWakeLock();
}

var output = document.createElement('pre');
document.body.appendChild(output);

// Reference to native method(s)
var oldLog = console.log;

console.log = function( ...items ) {

    // Call native method first
    oldLog.apply(this,items);

    // Use JSON to transform objects, all others display normally
    items.forEach( (item,i)=>{
        items[i] = (typeof item === 'object' ? JSON.stringify(item,null,4) : item);
    });
    output.innerHTML += items.join(' ') + '<br />';

};
