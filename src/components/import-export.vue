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

    <div class="line" id="export">
      <button
        @click="exportSong()">
        Export
      </button>
      <label>
        <span class="sr-only">Exported hash</span>
        <input
          v-if="hashOut" 
          id="hash-out"
          v-model="hashOut">
      </label>
    </div>

    <p v-if="hashOut">
      Copy-paste the hash code above into the Import field to load your song.
    </p>
  </div>
</template>

<script>
import { encrypt } from '../utils/encryption';

export default {
  data() {
    return {
      hashIn: '',
      hashOut: '',
      error: false
    };
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
        sheet: this.$store.state.phasing.sheet
      });
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

#export input {
  opacity: 0.7;
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
  background-color: #fffC;
}

#export button {
  background-color: #000C;
  color: white;
}
</style>