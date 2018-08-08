<template>
  <div>
    <Scale/>
    <Sequencer/>
  </div>
</template>

<script>
import Sequencer from './sequencer';
import Scale from './scale';

export default {
  name: 'App',
  components: { Scale, Sequencer },
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
