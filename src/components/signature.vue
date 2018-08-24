<template>
  <fieldset>
    <legend>Signature</legend>
    <ul>
      <li>
        <label>
          <input
            :checked="signature === 16"
            :value="16"
            type="radio"
            name="signature"
            @input="setSignature(16)">
          4 / 4
        </label>
      </li>
      <li>
        <label>
          <input
            :checked="signature === 12"
            :value="12"
            type="radio"
            name="signature"
            @input="setSignature(12)">
          3 / 4
        </label>
      </li>
      <li>
        <label>
          <input
            :checked="signature === 10"
            :value="10"
            type="radio"
            name="signature"
            @input="setSignature(10)">
          5 / 2
        </label>
      </li>
      <li>
        <label>
          <input
            :checked="signature === 14"
            :value="14"
            type="radio"
            name="signature"
            @input="setSignature(14)">
          7 / 2
        </label>
      </li>
    </ul>
  </fieldset>
</template>

<script>
import { mapState } from 'vuex';

export default {
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
</style>