const audioCtx = new AudioContext();
const oscillator = audioCtx.createOscillator();
oscillator.type = "sine";
oscillator.frequency.setValueAtTime(400, audioCtx.currentTime); // value in hertz
oscillator.connect(audioCtx.destination);