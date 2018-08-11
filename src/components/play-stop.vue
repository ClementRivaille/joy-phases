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