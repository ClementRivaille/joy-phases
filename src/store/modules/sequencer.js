import teoria from 'teoria';

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
  beat: 0,
  playing: false
};

// getters
const getters = {
  scaleNotes(state) {
    let scale = teoria.scale(state.tonic, state.scale).notes();
    scale = scale.concat(scale.map(note => note.interval('P8')));
    scale.push(scale[7].interval('P8'));
    return scale.map(note => note.scientific());
  }
};

// mutations
export const SEQUENCER_MUTATIONS = {
  SET_SIGNATURE: 'SET_SIGNATURE',
  SET_TONIC: 'SET_TONIC',
  SET_SCALE: 'SET_SCALE',
  SET_BPM: 'SET_BPM',
  CLEAR: 'CLEAR',
  EDIT_NOTE: 'EDIT_NOTE'
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
    state.notes[payload.index] = state.notes[payload.value];
  },
};

// actions
const actions = {
  setSignature({commit}, signature) {
    commit(SEQUENCER_MUTATIONS.SET_SIGNATURE, signature);
    commit(SEQUENCER_MUTATIONS.CLEAR);
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
