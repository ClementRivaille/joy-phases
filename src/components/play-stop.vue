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
      console.log(this.playing);
      console.log(this.$store.state);
      this.$store.dispatch(`sequencer/${this.playing ? 'stop' : 'play'}`);
    }
  }
}
</script>