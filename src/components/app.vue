<template>
  <div>
    <span v-if="!loaded">Loading…</span>
    <div v-if="loaded">
      <Signature/>
      <Scale/>
      <Sequencer/>
      <Instrument/>
      <PlayStop/>
    </div>
  </div>
</template>

<script>
import Sequencer from './sequencer';
import Scale from './scale';
import PlayStop from './play-stop';
import Signature from './signature';
import Instrument from './instrument';

import { loadInstruments } from '../utils/instrument';

export default {
  name: 'App',
  components: { Scale, Sequencer, PlayStop, Signature, Instrument },
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
