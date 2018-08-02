<template>
  <div>
    <Scale/>
    <ul>
      <li
        v-for="(note, index) in scaleNotes"
        :key="index">
        {{ note }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Scale from './scale';

export default {
  components: { Scale },
  computed: {
    ...mapGetters('sequencer', [
      'scaleNotes',
    ])
  }
};
</script>
