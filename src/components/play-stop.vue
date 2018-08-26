<template>
  <button
    :class="{stop: playing}"
    @click="onClick">
    {{ playing ? 'Stop' : 'Play' }}
  </button>
</template>

<script>
export default {
  computed: {
    playing() {
      return this.$store.state.sequencer.playing && this.$store.state.phasing.active
    }
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
  button.stop {
    background-color: #f98b87;
  }
</style>