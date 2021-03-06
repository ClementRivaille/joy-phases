import { scaleNotes } from '../../utils/scale'
import { startLoop, stopLoop, playNote, setBpm } from '../../utils/instrument';

function initializeNotes(size) {
  const notes = [];
  for (let i = 0 ; i < size ; i++) {
    notes.push(-1);
  }
  return notes;
}

// Initial state
const state = {
  signature: 16,
  tonic: 'C',
  scale: 'major',
  bpm: 120,
  notes: initializeNotes(16),
  beat: -1,
  instrument: 'xylophone',
  playing: false
};

// getters
const getters = {
  scaleNotes(state) {
    return scaleNotes(state.tonic, state.scale)
  },
  isNoteEnabled(state) {
    return (beat, note) => state.notes[beat] === note;
  }
};

// mutations
export const SEQUENCER_MUTATIONS = {
  SET_SIGNATURE: 'SET_SIGNATURE',
  SET_TONIC: 'SET_TONIC',
  SET_SCALE: 'SET_SCALE',
  SET_BPM: 'SET_BPM',
  CLEAR: 'CLEAR',
  EDIT_NOTE: 'EDIT_NOTE',
  MOVE_BEAT: 'MOVE_BEAT',
  INIT_BEAT: 'INIT_BEAT',
  SET_PLAYING: 'SET_PLAYING',
  SET_INSTRUMENT: 'SET_INSTRUMENT',
  SET_NOTES: 'SET_NOTES',
};

const mutations = {
  [SEQUENCER_MUTATIONS.SET_SIGNATURE] (state, signature) {
    state.signature = signature;
  },
  [SEQUENCER_MUTATIONS.SET_TONIC] (state, tonic) {
    state.tonic = tonic;
  },
  [SEQUENCER_MUTATIONS.SET_SCALE] (state, scale) {
    state.scale = scale;
  },
  [SEQUENCER_MUTATIONS.SET_BPM] (state, bpm) {
    state.bpm = bpm;
  },
  [SEQUENCER_MUTATIONS.CLEAR] (state) {
    state.notes = initializeNotes(state.signature);
  },
  [SEQUENCER_MUTATIONS.EDIT_NOTE] (state, payload) {
    state.notes = [...state.notes];
    state.notes[payload.index] = payload.value;
  },
  [SEQUENCER_MUTATIONS.MOVE_BEAT] (state) {
    state.beat = (state.beat + 1) % state.signature;
  },
  [SEQUENCER_MUTATIONS.INIT_BEAT] (state) {
    state.beat = -1;
  },
  [SEQUENCER_MUTATIONS.SET_PLAYING] (state, value) {
    state.playing = value;
  },
  [SEQUENCER_MUTATIONS.SET_INSTRUMENT] (state, instrument) {
    state.instrument = instrument;
  },
  [SEQUENCER_MUTATIONS.SET_NOTES] (state, notes) {
    state.notes = notes;
  }
};

// actions
const actions = {
  setSignature({commit, dispatch, state, rootState}, signature) {
    commit(SEQUENCER_MUTATIONS.SET_SIGNATURE, signature);
    commit(SEQUENCER_MUTATIONS.CLEAR);
    if (state.playing) {
      if (rootState.phasing.active) {
        dispatch('phasing/stop', null, {root: true});
      } else {
        dispatch('stop');
      }
    }
    dispatch('phasing/initSheet', signature, {root:true});
  },

  setTonic({commit}, tonic) {
    commit(SEQUENCER_MUTATIONS.SET_TONIC, tonic);
  },

  setScale({commit}, scale) {
    commit(SEQUENCER_MUTATIONS.SET_SCALE, scale);
  },

  setBpm({commit, state}, bpm) {
    setBpm(bpm, state.playing);
    commit(SEQUENCER_MUTATIONS.SET_BPM, bpm);
  },
  setInstrument({commit}, instrument) {
    commit(SEQUENCER_MUTATIONS.SET_INSTRUMENT, instrument)
  },

  editNote({commit, state}, payload) {
    if (payload.index >= state.signature || payload.index < 0) {
      throw new Error(`Cannot edit beat ${payload.index} since it is out of range`);
    }
    commit(SEQUENCER_MUTATIONS.EDIT_NOTE, payload);
  },

  moveBeat({commit}) {
    commit(SEQUENCER_MUTATIONS.MOVE_BEAT);
  },
  play({commit, state, getters, dispatch, rootState}) {
    commit(SEQUENCER_MUTATIONS.SET_PLAYING, true);
    let starting = true;
    startLoop(() => {
      dispatch('moveBeat');
      if (state.beat === 0 && !starting && rootState.phasing.active) {
        dispatch('phasing/changeMeasure', null, { root: true });
      }
      starting = false;

      if (state.playing) {
        if (state.notes[state.beat] !== -1 )
          playNote(getters.scaleNotes[state.notes[state.beat]], state.instrument);
        if (rootState.phasing.active && state.notes[(state.beat + rootState.phasing.sequence) % state.signature]!== -1) {
          playNote(getters.scaleNotes[state.notes[(state.beat + rootState.phasing.sequence) % state.signature]], state.instrument, true);
        }
      }
    })
  },
  stop({commit}) {
    stopLoop();
    commit(SEQUENCER_MUTATIONS.SET_PLAYING, false);
    commit(SEQUENCER_MUTATIONS.INIT_BEAT);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
