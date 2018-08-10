import teoria from 'teoria';
import { startLoop, stopLoop, playNote } from '../../utils/instrument';

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
  playing: false
};

// getters
const getters = {
  scaleNotes(state) {
    let scale = teoria.scale(state.tonic + '4', state.scale).notes();
    scale = scale.concat(scale.map(note => note.interval('P8')));
    scale.push(scale[7].interval('P8'));
    return scale.map(note => note.scientific());
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
  }
};

// actions
const actions = {
  setSignature({commit}, signature) {
    commit(SEQUENCER_MUTATIONS.SET_SIGNATURE, signature);
    commit(SEQUENCER_MUTATIONS.CLEAR);
    commit(SEQUENCER_MUTATIONS.SET_PLAYING, false);
    commit(SEQUENCER_MUTATIONS.INIT_BEAT);
  },

  setTonic({commit}, tonic) {
    commit(SEQUENCER_MUTATIONS.SET_TONIC, tonic);
  },

  setScale({commit}, scale) {
    commit(SEQUENCER_MUTATIONS.SET_SCALE, scale);
  },

  setBpm({commit}, bpm) {
    commit(SEQUENCER_MUTATIONS.SET_BPM, bpm);
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
  play({commit, state, getters, dispatch}) {
    commit(SEQUENCER_MUTATIONS.SET_PLAYING, true);
    startLoop(() => {
      dispatch('moveBeat');
      playNote(getters.scaleNotes[state.notes[state.beat]]);
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
