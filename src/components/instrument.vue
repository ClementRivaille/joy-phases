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
}
button.checked {
  background-color: yellow;
}
</style>