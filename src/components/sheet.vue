<template>
  <div>
    <ul>
      <li
        v-for="(sequence, index) in sheet"
        :key="index"
        :class="{active: index === currentSequence}"
        class="sequence">
        <h3>{{ index }}</h3>
        <Scale
          :tonic="sequence.tonic"
          :mode="sequence.scale"
          @set-tonic="editTonic(index, $event)"
          @set-scale="editScale(index, $event)"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Scale from './scale';

export default {
  components: { Scale },
  computed: {
    ...mapState('phasing', {
      sheet: 'sheet',
      currentSequence: 'sequence'
    }),
  },
  methods: {
    editTonic(index, tonic) {
      this.$store.dispatch('phasing/editSequence', {
        index: index,
        tonic: tonic,
        scale: this.$store.state.phasing.sheet[index].scale
      });
    },
    editScale(index, scale) {
      this.$store.dispatch('phasing/editSequence', {
        index: index,
        tonic: this.$store.state.phasing.sheet[index].tonic,
        scale: scale
      });
    }
  }
}
</script>

<style scoped="true">
h3 {
  margin: 0.2rem 0;
  font-size: 1rem;
  text-align: center;
}
ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  margin: 0;
  padding: 0;
}
li {
  margin: 0.5rem;
  padding: 0.3rem 1rem;
  border-radius: 0.4rem;
  background-color: #fff4;
}
li.active {
  background-color: #0006;
}
</style>