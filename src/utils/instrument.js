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
    oscillator : {
      type : "square",
    },
    envelope : {
      attack: 0.01,
      release: '16n',
      volume: 0.01
    },
  }).connect(new Tone.Filter(15, 'lowpass', -12)).toMaster();
}

function createPiano() {
  return new Tone.Sampler({
    A4: 'A4v3.wav',
    A5: 'A5v3.wav',
    A6: 'A6v3.wav',
    C4: 'C4v3.wav',
    C5: 'C5v3.wav',
    C6: 'C6v3.wav',
    'D#4': 'Ds4v3.wav',
    'D#5': 'Ds5v3.wav',
    'D#6': 'Ds6v3.wav',
    'F#4': 'Fs4v3.wav',
    'F#5': 'Fs5v3.wav',
    'F#6': 'Fs6v3.wav',
  },
  {
    release: 1,
    baseUrl: './assets/piano/',
    // onload: resolve,
    volume: 0.5
  }).toMaster();
}

function createXylophone() {
  return new Tone.Sampler({
    A4: 'A4.wav',
    A5: 'A5.wav',
    A6: 'A6.wav',
    F4: 'F4.wav',
    F5: 'F5.wav',
    F6: 'F6.wav',
    D5: 'D5.wav',
    D6: 'D6.wav',
  },
  {
    release: 1,
    baseUrl: './assets/xylophone/',
    // onload: resolve,
    volume: -10
  }).toMaster();
}

const instruments = {
  piano: {
    default: createPiano(),
    phase: createPiano(),
  },
  xylophone: {
    default: createXylophone(),
    phase: createXylophone(),
  },
  synth: {
    default: createSynth(),
    phase: createSynth(),
  }
};

export function playNote(note, instrument, phase) {
  instruments[instrument][phase ? 'phase' : 'default'].triggerAttackRelease(note, "16n");
}
