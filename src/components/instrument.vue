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
  background: #c9c7c7;
  color: black;
  padding: 0.4rem;
  margin: 0.2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}
button.checked {
  background-color: #3f3f3f;
  color: white;
}
</style>