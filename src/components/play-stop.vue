<template>
  <button
    :class="{stop: playing}"
    @click="onClick">
    <span
      class="icon"
      v-html="playing ? iconStop : iconPlay"/>
    {{ playing ? 'Stop' : 'Start' }}
  </button>
</template>

<script>
import iconPlay from '../../assets/icons/music-player-play.svg';
import iconStop from '../../assets/icons/stop.svg';

export default {
  data() {
    return {
      iconPlay,
      iconStop,
    };
  },
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
    background: rgba(255, 255, 255, 0.467);
    padding: 0.8rem;
    border-radius: 0.8rem;
    cursor: pointer;
    margin-top: 0.5rem;
  }
  button.stop {
    background: rgba(0, 0, 0, 0.467);
    color: white;
    fill: white;
  }
  button .icon {
    display: inline-block;
    height: 1rem;
    width: 1rem;
  }
</style>