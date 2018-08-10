import Tone from 'tone';

export function setBpm(value) {
  Tone.Transport.bpm.value = value;
}

let loop;

export function startLoop(callback) {
  loop = new Tone.Sequence(callback, [0], "8n");
  Tone.Transport.start();
  loop.start();
}

export function stopLoop() {
  loop.stop();
  Tone.Transport.stop();
}

// Instruments

const synth = new Tone.Synth({
  "oscillator" : {
    "type" : "amtriangle",
    "harmonicity" : 0.5,
    "modulationType" : "sine"
  },
  "envelope" : {
    "attackCurve" : 'exponential',
    "attack" : 0.05,
    "decay" : 0.2,
    "sustain" : 0.2,
    "release" : 1.5,
  },
}).toMaster();

export function playNote(note) {
  synth.triggerAttackRelease(note, "8n");
}
