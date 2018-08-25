<template>
  <fieldset>
    <legend>Signature</legend>
    <ul>
      <li
        v-for="sig in signatures"
        :key="sig.value">
        <label
          :class="{active: signature === sig.value}">
          <input
            :checked="signature === sig.value"
            :value="sig.value"
            type="radio"
            name="signature"
            @input="setSignature(sig.value)">
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
      ]
    }
  },
  computed: {
    ...mapState('sequencer', ['signature'])
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
  margin: 0;
}
fieldset {
  border: none;
}
legend {
  width: 100%;
  text-align: center;
}
label {
  color: black;
  cursor: pointer;
  background-color: #fff4;
  padding: 1.1rem;
  border-radius: 1.2rem;
}
label.active {
  background-color: #0005;
  color: white;
}
input {
  position: absolute;
  top: -99999px;
}
</style>