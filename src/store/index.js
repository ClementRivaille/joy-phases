import Vue from 'vue';
import Vuex from 'vuex';

import sequencer from './modules/sequencer';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { sequencer },
})