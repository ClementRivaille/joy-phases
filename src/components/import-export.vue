<template>
  <div id="import-export">
    <div class="line" id="import">
      <button
        @click="importSong()">
        Import
      </button>
      <label>
        <span class="sr-only">Hash to import</span>
        <input
          v-model="hashIn"
          type="text">
      </label>
    </div>
    <p v-if="error">
      The code you provided couldn't be read!
    </p>

    <div
      id="export"
      class="line">
      <button
        @click="exportSong()">
        Export
      </button>
      <label>
        <span class="sr-only">Exported hash</span>
        <input
          v-if="hashOut" 
          id="hash-out"
          v-model="hashOut"
          readonly="true">
      </label>
    </div>

    <p v-if="hashOut">
      Copy-paste the hash code above into the Import field to load your song, or use
      <a
        :href="link"
        title="Your song">
        this link
      </a>.
    </p>

    <div id="midi">
      <button
        @click="exportMidi()">
        Export as MIDI        
      </button>
    </div>
  </div>
</template>

<script>
import { encrypt } from '../utils/encryption';
import writeMidi from '../utils/midi'
import urljoin from 'url-join';

function getUrlParameter(name) {
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export default {
  data() {
    return {
      hashIn: '',
      hashOut: '',
      link: '',
      error: false
    };
  },
  mounted() {
    if (getUrlParameter('import')) {
      try {
        this.$store.dispatch('importSong', getUrlParameter('import'));
      } catch(e) {
        this.error = true;
      }
    }
  },
  methods: {
    importSong() {
      try {
        this.$store.dispatch('importSong', this.hashIn);
        this.error = false;
        this.hashIn = '';
      } catch(e) {
        this.error = true;
      }
    },
    exportSong() {
      this.hashOut = encrypt({
        signature: this.$store.state.sequencer.signature,
        bpm: this.$store.state.sequencer.bpm,
        instrument: this.$store.state.sequencer.instrument,
        notes: this.$store.state.sequencer.notes,
        sheet: this.$store.state.phasing.sheet,
        sequenceLength: this.$store.state.phasing.sequenceLength,
      });
      this.link = urljoin(window.location.origin, window.location.pathname, `?import=${encodeURIComponent(this.hashOut)}`);
    },
    exportMidi() {
      writeMidi(this.$store.state.sequencer.bpm, this.$store.state.sequencer.notes, this.$store.state.phasing.sheet, this.$store.state.phasing.sequenceLength)
    }
  },
};
</script>

<style scoped>
.line {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 0.6rem;
}
.line label {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.line label input {
  flex-grow: 1;
}
#import-export {
  width: 100%;
}

#import {
  margin-bottom: 1.5rem;
}

button {
  padding: 0 0.9rem;
  border-radius: 0.2rem;
  border: none;
  margin-right: 0.4rem;
  min-height: 2rem;
  cursor: pointer;
}

#import button {
  background-color: rgba(255, 255, 255, 0.8);
}

#export button, #midi button {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
}
</style>