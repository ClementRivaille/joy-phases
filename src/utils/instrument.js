import Tone from 'tone';

Tone.Transport.bpm.value = 120;
export function setBpm(value) {
  Tone.Transport.bpm.value = value;
}

let loop;

export function startLoop(callback) {
  loop = new Tone.Sequence(callback, [0], "16n");
  Tone.Transport.start();
  loop.start();
}

export function stopLoop() {
  loop.stop();
  Tone.Transport.stop();
}

// Instruments

function createSynth() {

  return new Tone.Synth({
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
}

const synths = {
  default: createSynth(),
  phase: createSynth(),
};

export function playNote(note, phase) {
  synths[phase ? 'phase' : 'default'].triggerAttackRelease(note, "16n");
}
