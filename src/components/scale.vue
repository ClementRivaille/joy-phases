<template>
  <div>
    <label>
      Tonic
      <select
        :value="tonic"
        name="tonic"
        @input="setTonic">
        <option
          v-for="(note, index) in notes"
          :key="index">
          {{ note }}
        </option>
      </select>
    </label>

    <label>
      Mode
      <select
        :value="mode"
        name="mode"
        @input="setScale">
        <option
          v-for="(mode, index) in modes"
          :key="index">
          {{ mode }}
        </option>
      </select>
    </label>
  </div>  
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
      modes: [
        'major',
        'minor',
        'dorian',
        'phrygian',
        'lydian',
        'mixolydian',
        'locrian'
      ]
    };
  },
  computed: {
    ...mapState('sequencer', {
      tonic: 'tonic',
      mode: 'scale'
    })
  },
  methods: {
    setTonic(e) {
      this.$store.dispatch('sequencer/setTonic', e.target.value);
    },
    setScale(e) {
      this.$store.dispatch('sequencer/setScale', e.target.value);
    }
  }
}
</script>