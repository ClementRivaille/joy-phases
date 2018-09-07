import Vue from 'vue';
import Vuex from 'vuex';

import { default as sequencer, SEQUENCER_MUTATIONS } from './modules/sequencer';
import { default as phasing, PHASING_MUTATIONS } from './modules/phasing';

import { decrypt } from '../utils/encryption';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { sequencer, phasing },
  actions: {
    importSong({commit, dispatch, rootState}, hash) {
      const data = decrypt(hash);

      // Import to Sequencer
      commit(`sequencer/${SEQUENCER_MUTATIONS.SET_SIGNATURE}`, data.signature);
      dispatch('sequencer/setBpm', data.bpm);
      commit(`sequencer/${SEQUENCER_MUTATIONS.SET_INSTRUMENT}`, data.instrument);
      commit(`sequencer/${SEQUENCER_MUTATIONS.SET_NOTES}`, data.notes);
      // Import sheet
      commit(`phasing/${PHASING_MUTATIONS.SET_SHEET}`, data.sheet);

      // Initialize first measure
      dispatch('phasing/jumpToSequence', 0);
      if (rootState.phasing.active) {
        dispatch('phasing/stop');
      } else if (rootState.sequencer.playing) {
        dispatch('sequencer/stop');
      }
    }
  }
});
