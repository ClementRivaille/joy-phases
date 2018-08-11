import Vue from 'vue';
import Vuex from 'vuex';

import sequencer from './modules/sequencer';
import phasing from './modules/phasing';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { sequencer, phasing },
});
