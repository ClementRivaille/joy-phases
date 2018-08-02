<template>
  <Sequencer/>
</template>

<script>
import Sequencer from './sequencer';

export default {
  name: 'App',
  components: { Sequencer },
  data() {
    return {
      greeting: 'Hello'
    }
  },
};
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
