<template>
  <ul>
    <li
      v-for="instrument in instruments"
      :key="instrument">
      <button
        :class="{checked: current === instrument}"
        @click="setInstrument(instrument)">
        <span
          class="icon"
          aria-hidden
          v-html="icons[instrument]"/>
        <span class="sr-only"> {{ labels[instrument] }}</span>
      </button>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import pianoIcon from '../../assets/icons/piano.svg'
import xylophoneIcon from '../../assets/icons/xylophone.svg'
import squareIcon from '../../assets/icons/square.svg'
import exponentialIcon from '../../assets/icons/exponential.svg'

export default {
  data() {
    return {
      instruments: ['xylophone', 'piano', 'square', 'exponential'],
      icons: {
        piano: pianoIcon,
        xylophone: xylophoneIcon,
        square: squareIcon,
        exponential: exponentialIcon,
      },
      labels: {
        piano: 'Piano',
        xylophone: 'Xylophone',
        square: 'Square Wave',
        exponential: 'Exponential Wave',
      }
    }
  },
  computed: {
    ...mapState('sequencer', { current: 'instrument' })
  },
  methods: {
    ...mapActions('sequencer', ['setInstrument'])
  }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  list-style: none;
  padding-left: 0;
  margin: 0.2rem;
}
button {
  background: rgb(201, 199, 199);;
  color: black;
  padding: 0.4rem;
  margin: 0.2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  stroke: black;
}
button.checked {
  background-color: rgb(63, 63, 63);;
  color: white;
  fill: white;
  stroke: white;
}

button .icon {
  display: inline-block;
  height: 1.2rem;
  width: 1.2rem;
}
</style>