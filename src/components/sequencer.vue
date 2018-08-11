<template>
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
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Note from './note';

export default {
  components: { Note },
  computed: {
    ...mapGetters('sequencer', [
      'scaleNotes',
      'isNoteEnabled'
    ]),
    ...mapState('sequencer', [
      'signature',
      'notes',
      'beat'
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
    }
  },
};
</script>

<style scoped="true">
td.active {
  background: yellow;
}
</style>