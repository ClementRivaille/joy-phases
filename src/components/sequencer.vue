<template>
  <div class="sequencer">
    <table>
      <tr
        v-for="rIndex in scaleNotes.length"
        :key="rIndex">
        <th scope="row">{{ scaleNotes[scaleNotes.length - rIndex] }}</th>
        <td
          v-for="col in signature"
          :key="col"
          :class="{ active : beat === col - 1 }">
          <Note
            :enabled="isNoteEnabled(col - 1, scaleNotes.length - rIndex)"
            :phased="phasingActive && isNoteEnabled((col - 1 + sequence) % signature, scaleNotes.length - rIndex)"
            :note="scaleNotes.length - rIndex"
            :beat="col - 1"
            @click-note="onClickNote"
            @move="onMove"/>
        </td>
      </tr>
    </table>
    <div
      :class="{disabled: phasingActive}"
      class="controls">
      <button
        v-if="!playing"
        :disabled="phasingActive"
        class="play"
        @click="play"
        v-html="iconPlay"/>
      <button
        v-if="playing"
        :disabled="phasingActive"
        class="stop"
        @click="stop"
        v-html="iconStop"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Note from './note';

import iconPlay from '../../assets/icons/music-player-play.svg';
import iconStop from '../../assets/icons/stop.svg';

export default {
  components: { Note },
  data() {
    return {
      iconPlay,
      iconStop,
      shiftDown: false
    }
  },
  computed: {
    ...mapGetters('sequencer', [
      'scaleNotes',
      'isNoteEnabled'
    ]),
    ...mapState('sequencer', [
      'signature',
      'notes',
      'beat',
      'playing'
    ]),
    ...mapState('phasing', [
      'sequence'
    ]),
    phasingActive() {
      return this.$store.state.phasing.active;
    }
  },
  mounted() {
    // Watch shift key (in order to move focus)
    window.addEventListener('keydown', e => {
      if (e.key === 'Shift') this.shiftDown = true
    })
    window.addEventListener('keyup', e => {
      if (e.key === 'Shift') this.shiftDown = false
    })
  },
  methods: {
    onClickNote(beat, note, enable) {
      this.$store.dispatch('sequencer/editNote', {
        index: beat,
        value: enable ? note : -1
      });
    },
    onMove(direction, beat, note) {
      if (direction === 'out') {
        // Select either the first or the last button of the sequencer (tabulation will move before or after it)
        document.getElementById(this.shiftDown ? `note-0-${this.scaleNotes.length - 1}` : `note-${this.signature -1}-0`).focus()
      } else {
        // Select the button next to the current one (if it exists)
        const selectedBeat = beat + (direction === 'left' ? -1 : direction === 'right' ? 1 :0)
        const selectedNote = note + (direction === 'up' ? 1 : direction === 'down' ? -1 : 0)
        if (selectedBeat >= 0 && selectedBeat < this.signature && selectedNote >= 0 && selectedNote < this.scaleNotes.length)
          document.getElementById(`note-${selectedBeat}-${selectedNote}`).focus()
      }
    },
    ...mapActions('sequencer', ['play', 'stop']),
  },
};
</script>

<style scoped>
.sequencer {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0.7rem;
  padding: 2rem;
}

table {
  border-collapse: collapse;
}
th {
  font-weight: normal;
  color: white;
  opacity: 0.4;
  padding: 0.2rem;
  min-width: 3rem;
}
td {
  padding: 0.1rem;
}
td.active {
  background: rgba(255, 255, 255, 0.267);
}

.controls {
  margin-top: 0.8rem;
  display: flex;
  justify-content: center;

}
.controls button {
  padding: 0;
  background: none;
  border: none;
  height: 2rem;
  width: 2rem;
  cursor: pointer;
  fill: rgba(255, 255, 255, 0.4);
}

.controls.disabled {
  opacity: 0;
}

.controls.disabled button {
  cursor: unset;
}

@media (max-width: 920px) {
  .sequencer {
    padding: 1rem;
    border-radius: 0.4rem;
  }

  th {
    min-width: 1.2rem;
    font-size: 0.8rem;
  }

  .controls button {
    height: 1.5rem;
    width: 1.5rem;
  }
}
</style>