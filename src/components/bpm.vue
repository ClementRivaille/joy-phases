<template>
  <div>
    <label for="bpm">BPM</label>
    <input
      id="bpm"
      :value="bpm"
      type="range"
      min="80"
      max="200"
      @input="setBpm">
    <span class="value">{{ bpm }}</span>
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

<style scoped="true">
  * {
    display: block;
  }
  input {
    width: 100%;
  }
  .value, label {
    width: 100%;
    text-align: center;
  }
</style>