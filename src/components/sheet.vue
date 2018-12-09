<template>
  <div>
    <ul>
      <li
        v-for="(sequence, index) in sheet"
        :key="index"
        :class="{active: index === currentSequence}"
        class="sequence">
        <header>
          <h3>
            {{ index }}
            <span
              v-if="index === currentSequence"
              class="sr-only">
              (active)
            </span>
          </h3>
          <div class="actions">
            <button
              v-if="index === currentSequence"
              :title="'Spread ' + sequence.tonic + ' ' + sequence.scale"
              @click="initSheet(signature)">
              <span
                aria-hidden="true"
                v-html="iconSpread"/>
              <span class="sr-only">Spread {{ sequence.tonic }} {{ sequence.scale }}</span>
            </button>
            <button
              :title="'Jump to sequence ' + index"
              @click="jumpToSequence(index)">
              <span 
                aria-hidden="true"
                v-html="iconNext"/>
              <span class="sr-only">Jump to sequence {{ index }}</span>
            </button>
          </div>
        </header>
        <Scale
          :tonic="sequence.tonic"
          :mode="sequence.scale"
          :name="'Section ' + index"
          @set-tonic="editTonic(index, $event)"
          @set-scale="editScale(index, $event)"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Scale from './scale';

import iconNext from '../../assets/icons/next.svg';
import iconSpread from '../../assets/icons/spread.svg';

export default {
  components: { Scale },
  data() {
    return {
      iconNext, iconSpread,
    };
  },
  computed: {
    ...mapState('phasing', {
      sheet: 'sheet',
      currentSequence: 'sequence',
      active: 'active'
    }),
    ...mapState('sequencer', ['signature']),
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
    },
    ...mapActions('phasing', ['jumpToSequence', 'initSheet']),
  }
}
</script>

<style scoped="true">
header {
  display: flex;
  justify-content: center;
}
h3 {
  flex-grow: 3;
  margin: 0.2rem 0;
  font-size: 1rem;
  text-align: center;
}
.actions button {
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  width: 1rem;
  fill: white;
  opacity: 0.8;
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
  background-color: rgba(255, 255, 255, 0.267);
}
li.active {
  background-color: rgba(0, 0, 0, 0.4);
}
</style>