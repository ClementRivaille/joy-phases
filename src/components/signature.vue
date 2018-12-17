<template>
  <fieldset>
    <legend>
      Signature
      <p
        class="warning">
        <span v-if="hasNotes">Warning: changing this will clear the melody</span>
      </p>
    </legend>
    <ul>
      <li
        v-for="sig in signatures"
        :key="sig.value">
        <label
          :class="{active: signature === sig.value, focused: focused === sig.value}">
          <input
            :checked="signature === sig.value"
            :value="sig.value"
            type="radio"
            name="signature"
            @input="setSignature(sig.value)"
            @focus="focused = sig.value"
            @blur="focused = false">
          {{ sig.label }}
        </label>
      </li>
    </ul>
  </fieldset>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      signatures: [
        {label: '4 / 4', value: 16},
        {label: '3 / 4', value: 12},
        {label: '5 / 2', value: 10},
        {label: '7 / 2', value: 14},
      ],
      focused: 0
    }
  },
  computed: {
    ...mapState('sequencer', ['signature']),
    hasNotes() {
      return this.$store.state.sequencer.notes.find(note => note !== -1)
    }
  },
  methods: {
    setSignature(value) {
      this.$store.dispatch('sequencer/setSignature', value);
    }
  }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  list-style: none;
  margin: 0.4rem 0;
  padding: 0;
}
fieldset {
  border: none;
  margin-bottom: 1rem;
}
legend {
  width: 100%;
  text-align: center;
  margin-bottom: 0.7rem;
}
label {
  color: black;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.267);
  padding: 1.1rem;
  border-radius: 1.2rem;
}
label.active {
  background-color: rgba(0, 0, 0, 0.333);
  color: white;
}
[data-whatintent="keyboard"] label.focused {
  box-shadow: rgba(255, 255, 255, 0.3) 0 0 0.2em 0.2em;
}
input {
  position: absolute;
  top: -99999px;
}

.warning {
  font-style: italic;
  font-size: 0.7em;
  text-align: center;
  margin: 0.3em 0 0 0;
  height: 0.7em;
}

@media (max-width: 400px) {
  label {
    font-size: 0.9rem;
    padding: 0.6rem;
    border-radius: 0.8rem;
  }
}
</style>