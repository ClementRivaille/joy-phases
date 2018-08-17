<template>
  <div>
    <input
      :value="bpm"
      type="range"
      min="80"
      max="200"
      @input="setBpm">
    {{ bpm }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('sequencer', ['bpm'])
  },
  methods: {
    setBpm(e) {
      this.$store.dispatch('sequencer/setBpm', e.target.value);
    },
  }
}
</script>