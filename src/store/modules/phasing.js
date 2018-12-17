const initState = {
  active: false,
  sequence: 0,
  sequenceLength: 4, 
  next: 4,
  sheet: [],
}

export const PHASING_MUTATIONS = {
  DECREMENT_NEXT: 'DECREMENT_NEXT',
  RESET_NEXT: 'RESET_NEXT',
  MOVE_SEQUENCE: 'MOVE_SEQUENCE',
  RESET_SEQUENCE: 'RESET_SEQUENCE',
  SET_ACTIVE: 'SET_ACTIVE',
  SET_SHEET: 'SET_SHEET',
  EDIT_SEQUENCE: 'EDIT_SEQUENCE',
  JUMP_SEQUENCE: 'JUMP_SEQUENCE',
  SET_SEQUENCE_LENGTH: 'SET_SEQUENCE_LENGTH',
};

const mutations = {
  [PHASING_MUTATIONS.DECREMENT_NEXT] (state) {
    state.next -= 1;
  },
  [PHASING_MUTATIONS.RESET_NEXT] (state) {
    state.next = state.sequenceLength;
  },
  [PHASING_MUTATIONS.MOVE_SEQUENCE] (state) {
    state.sequence += 1;
  },
  [PHASING_MUTATIONS.RESET_SEQUENCE] (state) {
    state.sequence = 0;
  },
  [PHASING_MUTATIONS.SET_ACTIVE] (state, value) {
    state.active = value;
  },
  [PHASING_MUTATIONS.SET_SHEET] (state, sheet) {
    state.sheet = sheet;
  },
  [PHASING_MUTATIONS.EDIT_SEQUENCE] (state, payload) {
    state.sheet = [...state.sheet];
    state.sheet[payload.index] = {
      tonic: payload.tonic,
      scale: payload.scale
    }
  },
  [PHASING_MUTATIONS.JUMP_SEQUENCE] (state, sequence) {
    state.sequence = sequence;
  },
  [PHASING_MUTATIONS.SET_SEQUENCE_LENGTH] (state, length) {
    state.sequenceLength = length;
    state.next = state.sequenceLength;
  }
}

function reset(commit) {
  commit(PHASING_MUTATIONS.RESET_SEQUENCE);
  commit(PHASING_MUTATIONS.RESET_NEXT);
}

function setScale(dispatch, tonic, scale) {
  dispatch('sequencer/setTonic', tonic, {root: true});
  dispatch('sequencer/setScale', scale, {root: true});
}

const actions = {
  start({commit, dispatch, state, rootState}) {
    // Start phasing
    reset(commit);
    commit(PHASING_MUTATIONS.SET_ACTIVE, true);

    // If sequencer is playing, stop it
    if (rootState.sequencer.playing) {
      dispatch('sequencer/stop', null, { root: true });
    }
    // Play
    dispatch('sequencer/play', null, { root: true });
    
    // Init scale to section 0
    setScale(dispatch, state.sheet[0].tonic, state.sheet[0].scale);
  },

  stop({commit, dispatch, state}) {
    commit(PHASING_MUTATIONS.SET_ACTIVE, false);
    reset(commit);
    
    dispatch('sequencer/stop', null, { root: true });
    setScale(dispatch, state.sheet[0].tonic, state.sheet[0].scale);
  },

  changeMeasure({commit, state, rootState, dispatch}) {
    commit(PHASING_MUTATIONS.DECREMENT_NEXT);

    // End section
    if (state.next <= 0) {
      commit(PHASING_MUTATIONS.MOVE_SEQUENCE);
      commit(PHASING_MUTATIONS.RESET_NEXT);

      // End piece
      if (state.sequence > rootState.sequencer.signature) {
        dispatch('stop');
      }
      else {
        setScale(dispatch, state.sheet[state.sequence].tonic, state.sheet[state.sequence].scale);
      }
    }
  },

  initSheet({commit, rootState}, signature) {
    const sheet = [];
    for (let i = 0 ; i <= signature ; i++) {
      sheet.push({
        tonic: rootState.sequencer.tonic,
        scale: rootState.sequencer.scale,
      });
    }
    commit(PHASING_MUTATIONS.SET_SHEET, sheet);
  },

  editSequence({commit, state, dispatch}, payload) {
    commit(PHASING_MUTATIONS.EDIT_SEQUENCE, payload);

    // If we edit the active one, update sequencer
    if (payload.index === state.sequence) {
      setScale(dispatch, payload.tonic, payload.scale);
    }
  },

  jumpToSequence({commit, dispatch, state}, sequence) {
    commit(PHASING_MUTATIONS.JUMP_SEQUENCE, sequence);
    commit(PHASING_MUTATIONS.RESET_NEXT);
    setScale(dispatch, state.sheet[sequence].tonic, state.sheet[sequence].scale);
  },

  setSequenceLength({ commit }, length) {
    commit(PHASING_MUTATIONS.SET_SEQUENCE_LENGTH, length)
  }
}

export default {
  namespaced: true,
  state: initState,
  mutations,
  actions
}
