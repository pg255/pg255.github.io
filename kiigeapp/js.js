var hasSaid = false, record = 0, highest = 0;

function onRotate() {
	if (Math.abs(rotY) < 10 && !hasSaid) {
		Speakit.readText(`${parseInt(highest)}`, "en-US");
		highest = 0;
		hasSaid = true;
	}
	if (20 < Math.abs(rotY)) {
		hasSaid = false;
	}

	if (Math.abs(rotY) > record) {
		record = Math.abs(rotY);
	}

	if (Math.abs(rotY) > highest) {
		highest = Math.abs(rotY);
	}

	if (record) {
		document.getElementById("record").innerHTML = parseFloat(record).toFixed(2);
	}
	document.getElementById("degree").innerHTML = parseFloat(Math.abs(rotY)).toFixed(2);

	gainNode.gain.setValueAtTime(document.getElementById("soundvolume").value / 100, audioCtx.currentTime);

	oscillator.frequency.setValueAtTime(parseFloat(document.getElementById("0pitch").value) + Math.abs(rotY * parseFloat(document.getElementById("multiplier").value)), audioCtx.currentTime);
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
