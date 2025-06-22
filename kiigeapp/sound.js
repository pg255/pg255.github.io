const audioCtx = new AudioContext();
const oscillator = audioCtx.createOscillator();
oscillator.type = "sine";
oscillator.frequency.setValueAtTime(300, audioCtx.currentTime); // value in hertz
oscillator.connect(audioCtx.destination);