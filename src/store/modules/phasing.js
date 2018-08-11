const state = {
  active: false,
  sequence: 0,
  next: 4
}

const PHASING_MUTATIONS = {
  DECREMENT_NEXT: 'DECREMENT_NEXT',
  RESET_NEXT: 'RESET_NEXT',
  MOVE_SEQUENCE: 'MOVE_SEQUENCE',
  RESET_SEQUENCE: 'RESET_SEQUENCE',
  SET_ACTIVE: 'SET_ACTIVE',
};

const mutations = {
  [PHASING_MUTATIONS.DECREMENT_NEXT] (state) {
    state.next -= 1;
  },
  [PHASING_MUTATIONS.RESET_NEXT] (state) {
    state.next = 4;
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
}

const actions = {
  start({commit, dispatch}) {
    commit(PHASING_MUTATIONS.SET_ACTIVE, true);
    dispatch('sequencer/play', null, { root: true });
  },

  stop({commit, dispatch}) {
    commit(PHASING_MUTATIONS.SET_ACTIVE, true);
    commit(PHASING_MUTATIONS.RESET_SEQUENCE);
    commit(PHASING_MUTATIONS.RESET_NEXT);
    dispatch('sequencer/stop', null, { root: true });
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
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}