<template>
  <ul>
    <li>
      <button
        :class="{checked: instrument === 'xylophone'}"
        @click="setInstrument('xylophone')">
        Xylophone
      </button>
    </li>
    <li>
      <button
        :class="{checked: instrument === 'piano'}"
        @click="setInstrument('piano')">
        Piano
      </button>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('sequencer', ['instrument'])
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
}
button.checked {
  background-color: rgb(63, 63, 63);;
  color: white;
}
</style>