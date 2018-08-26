<template>
  <div class="sequencer">
    <table>
      <tr
        v-for="rIndex in scaleNotes.length"
        :key="rIndex">
        <th>{{ scaleNotes[scaleNotes.length - rIndex] }}</th>
        <td
          v-for="col in signature"
          :key="col"
          :class="{ active : beat === col - 1 }">
          <Note
            :enabled="isNoteEnabled(col - 1, scaleNotes.length - rIndex)"
            :phased="phasingActive && isNoteEnabled((col - 1 + sequence) % signature, scaleNotes.length - rIndex)"
            :note="scaleNotes.length - rIndex"
            :beat="col - 1"
            @click-note="onClickNote"/>
        </td>
      </tr>
    </table>
    <div
      v-if="!phasingActive"
      class="controls">
      <button
        v-if="!playing"
        class="play"
        @click="play"
        v-html="iconPlay"/>
      <button
        v-if="playing"
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
      iconStop
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
  methods: {
    onClickNote(beat, note, enable) {
      this.$store.dispatch('sequencer/editNote', {
        index: beat,
        value: enable ? note : -1
      });
    },
    ...mapActions('sequencer', ['play', 'stop']),
  },
};
</script>

<style scoped>
.sequencer {
  background-color: #fff3;
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
  background: #fff4;
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
  fill: #fff6;
}
</style>