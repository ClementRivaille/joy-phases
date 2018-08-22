<template>
  <div>
    <span v-if="!loaded">Loading…</span>
    <div v-if="loaded">
      <Signature/>
      <Bpm/>
      <Scale
        :tonic="tonic"
        :mode="scale"
        @set-tonic="setTonic"
        @set-scale="setScale"/>
      <Sequencer/>
      <Instrument/>

      <Sheet/>
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
import Bpm from './bpm';
import Sheet from './sheet';

import { loadInstruments } from '../utils/instrument';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'App',
  components: { Scale, Sequencer, PlayStop, Signature, Instrument, Bpm, Sheet },
  data() {
    return {
      greeting: 'Hello',
      loaded: false,
    }
  },
  computed: {
    ...mapState('sequencer', ['tonic', 'scale']),
  },
  created() {
    loadInstruments().then(() => {
      this.loaded = true;
      this.$store.dispatch('phasing/initSheet', this.$store.state.sequencer.signature);
    });
  },
  methods: {
    ...mapActions('sequencer', ['setTonic', 'setScale']),
  }
};
</script>

<style scoped>
p {
  font-size: 2rem;
  text-align: center;
}
</style>
