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

  /* Range */
  input[type=range] {
    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    background: transparent; /* Otherwise white in Chrome */
    margin: 0.6rem 0;
  }

  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;

    height: 1.5rem;
    width: 1.5rem;
    border-radius: 1rem;
    background: black;
    transform: translateY(-33%);
    opacity: 0.6 !important;
    border: none;
    cursor: pointer;
  }

  input[type=range]::-moz-range-thumb {
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 1rem;
    background: white;
    opacity: 0.6;
    border: none;
    cursor: pointer;
  }

  input[type=range]::-ms-thumb {
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 1rem;
    background: white;
    opacity: 0.6;
    border: none;
    cursor: pointer;
  }

  input[type=range]::-webkit-slider-runnable-track { 
    height: 0.5rem;
    background-color: lightblue;
    opacity: 0.3;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  input[type=range]::-moz-range-track { 
    height: 0.5rem;
    background-color: lightblue;
    opacity: 0.2;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  input[type=range]::-ms-track {
    width: 100%;
    cursor: pointer;

    /* Hides the slider so custom styles can be added */
    background: transparent; 
    border-color: transparent;
    color: transparent;

    height: 0.5rem;
    background-color: lightblue;
    opacity: 0.2;
    border-radius: 0.5rem;
  }
</style>