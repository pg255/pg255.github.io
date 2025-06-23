const audioCtx = new AudioContext();
const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain(); // Create a GainNode

oscillator.type = "sine";
oscillator.frequency.setValueAtTime(parseFloat(document.getElementById("0pitch").value), audioCtx.currentTime); // value in hertz

gainNode.gain.setValueAtTime(1, audioCtx.currentTime);

oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);