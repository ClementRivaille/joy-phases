<template>
  <div>
    <Scale/>
    <Sequencer/>
    <PlayStop/>
  </div>
</template>

<script>
import Sequencer from './sequencer';
import Scale from './scale';
import PlayStop from './play-stop';

export default {
  name: 'App',
  components: { Scale, Sequencer, PlayStop },
  data() {
    return {
      greeting: 'Hello'
    }
  },
};
</script>

<style scoped>
p {
  font-size: 2rem;
  text-align: center;
}
</style>
