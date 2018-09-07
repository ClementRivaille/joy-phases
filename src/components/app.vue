<template>
  <div>
    <div
      v-if="!loaded"
      id="loading">
      Loading…</div>
    <div
      v-if="loaded"
      id="main">
      <h1>JOY PHASES</h1>

      <section id="rhythm">
        <h2>Rhythm</h2>
        <Signature/>
        <Bpm/>
      </section>

      <section id="sequencer">
        <h2>Melody</h2>
        <Scale
          :tonic="tonic"
          :mode="scale"
          @set-tonic="setTonic"
          @set-scale="setScale"/>
        <Sequencer/>
        <Instrument/>
      </section>

      <section id="sheet">
        <h2>Sections</h2>
        <Sheet/>
        <PlayStop/>
      </section>

      <section>
        <h2>Import / Export</h2>
        <ImportExport/>
      </section>
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
import ImportExport from './import-export';

import { loadInstruments } from '../utils/instrument';
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: { Scale, Sequencer, PlayStop, Signature, Instrument, Bpm, Sheet, ImportExport },
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
    setTonic(tonic) {
      this.$store.dispatch('sequencer/setTonic', tonic);
      this.$store.dispatch('phasing/editSequence', {
        index: this.$store.state.phasing.sequence,
        tonic: this.$store.state.sequencer.tonic,
        scale: this.$store.state.sequencer.scale,
      });
    },
    setScale(scale) {
      this.$store.dispatch('sequencer/setScale', scale);
      this.$store.dispatch('phasing/editSequence', {
        index: this.$store.state.phasing.sequence,
        tonic: this.$store.state.sequencer.tonic,
        scale: this.$store.state.sequencer.scale,
      });
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  color: white;
  font-size: 4rem;
  font-family: serif;
  margin-top: 0.1rem;
}

@media (min-width: 650px) {
  #main {
    margin: 0 5%;
  }
}

section {
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: red;
  margin-bottom: 2rem;

  border-radius: 1rem;
  background-color: #8a791a66;

  padding: 1rem;
}

section h2 {
  width: 100%;
  text-align: left;
  color: lightgrey;
  font-weight: normal;
  margin-top: 0rem;
}

section#rhythm {
  align-items: stretch;
}

#controls {
  display: flex;
  justify-content: center;
}
</style>
