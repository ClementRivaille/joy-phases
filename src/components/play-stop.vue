<template>
  <button
    @click="onClick">
    {{ playing ? 'Stop' : 'Play' }}
  </button>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('sequencer', [
      'playing'
    ])
  },
  methods: {
    onClick() {
      this.$store.dispatch(`phasing/${this.playing ? 'stop' : 'start'}`);
    }
  }
}
</script>

<style scoped>
  button {
    font-size: 1.5rem;
    border: none;
    background: #5ddd5a;
    padding: 0.8rem;
    border-radius: 0.8rem;
    cursor: pointer;
  }
</style>