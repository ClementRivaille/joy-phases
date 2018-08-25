import Tone from 'tone';

// Sequence
let loop;
Tone.Transport.bpm.value = 120;

export function setBpm(value, playing) {
  // Pause loop if currently playing
  if (playing) {
    loop.stop();
  }

  Tone.Transport.bpm.value = value;

  // Restart loop
  if (playing) {
    loop.start();
    // Loop can sometime freeze, this is to prevent that
    setTimeout(() => {
      if (loop.state !== 'started') {
        loop.start();
      }
    }, (1 / (value / 60)) * 1000);
  }
}

export function startLoop(callback) {
  // Call callback every beat
  loop = new Tone.Sequence(callback, [0], "16n");
  Tone.Transport.start();
  loop.start();
}

export function stopLoop() {
  loop.stop();
  loop.removeAll();
  loop.dispose();
  Tone.Transport.stop();
}

// Instruments
function createPiano(callback) {
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
    onload: callback,
    volume: 0
  }).toMaster();
}

function createXylophone(callback) {
  return new Tone.Sampler({
    A4: 'A4.ogg',
    A5: 'A5.ogg',
    A6: 'A6.ogg',
    F4: 'F4.ogg',
    F5: 'F5.ogg',
    F6: 'F6.ogg',
    D5: 'D5.ogg',
    D6: 'D6.ogg',
  },
  {
    release: 1,
    baseUrl: './assets/xylophone/',
    onload: callback,
    volume: -15
  }).toMaster();
}

const instruments = {};

// Load an instrument
function makeInstrument(name, builder) {
  const promises = [];
  
  instruments[name] = {};
  // Instrument need two instances
  promises.push(new Promise((resolve) => {
    instruments[name].default = builder(resolve);
  }));
  promises.push(new Promise((resolve) => {
    instruments[name].phase = builder(resolve);
  }));
  return Promise.all(promises);
}

/** Load all isntruments */
export function loadInstruments() {
  const promises = [];

  promises.push(makeInstrument('piano', createPiano));
  promises.push(makeInstrument('xylophone', createXylophone));

  return Promise.all(promises);
}

/** Play a note on an instrument */
export function playNote(note, instrument, phase) {
  instruments[instrument][phase ? 'phase' : 'default'].triggerAttackRelease(note, "16n");
}
