<template>
  <div>
    <span v-if="!loaded">Loading…</span>
    <div v-if="loaded">
      <Scale/>
      <Sequencer/>
      <PlayStop/>
    </div>
  </div>
</template>

<script>
import Sequencer from './sequencer';
import Scale from './scale';
import PlayStop from './play-stop';

import { loadInstruments } from '../utils/instrument';

export default {
  name: 'App',
  components: { Scale, Sequencer, PlayStop },
  data() {
    return {
      greeting: 'Hello',
      loaded: false,
    }
  },
  created() {
    loadInstruments().then(() => {
      this.loaded = true;
    });
  },
};
</script>

<style scoped>
p {
  font-size: 2rem;
  text-align: center;
}
</style>
