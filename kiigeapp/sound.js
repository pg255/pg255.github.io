const audioCtx = new AudioContext();
const oscillator = audioCtx.createOscillator();
oscillator.type = "sine";
oscillator.frequency.setValueAtTime(parseFloat(document.getElementById("0pitch").value), audioCtx.currentTime); // value in hertz
oscillator.connect(audioCtx.destination);