<template>
  <div>
    Number of measures in each section :
    <strong>{{ sequenceLength }}</strong>
    <span class="edition">
      <button
        :disabled="sequenceLength === 1"
        @click="decrement">
        <span class="sr-only">Decrement sections length</span>
        -
      </button>
      <button @click="increment">
        <span class="sr-only">Increment sections length</span>
        +
      </button>
    </span>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState('phasing', ['sequenceLength'])
    },
    methods: {
      increment() {
        this.$store.dispatch('phasing/setSequenceLength', this.sequenceLength + 1);
      },
      decrement() {
        this.$store.dispatch('phasing/setSequenceLength', Math.max(this.sequenceLength - 1, 1));
      }
    }
  }
</script>

<style>
.edition button {
  color: black;
  border: none;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.467);
  padding: 0.4em 0.9em;
  width: 2em;
  border-radius: 0.4em;
  font-weight: bold;
}

.edition button:disabled {
  background-color: rgba(255, 255, 255, 0.123);
  cursor: auto;
}
</style>