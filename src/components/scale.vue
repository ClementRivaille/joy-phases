<template>
  <div class="scale">
    <label>
      <span class="field-label">
        <span v-if="name">{{ name }}</span>
        Tonic
      </span>
      <select
        :value="tonic"
        :name="fullName('tonic')"
        @input="setTonic">
        <option
          v-for="(note, index) in notes"
          :key="index">
          {{ note }}
        </option>
      </select>
    </label>

    <label>
      <span class="field-label">
        <span v-if="name">{{ name }}</span>
        Mode
      </span>
      <select
        :value="mode"
        :name="fullName('mode')"
        @input="setScale">
        <option
          v-for="(mode, index) in modes"
          :key="index">
          {{ mode }}
        </option>
      </select>
    </label>
  </div>  
</template>

<script>
export default {
  props: {
    tonic: {
      type: String,
      default: 'C',
    },
    mode: {
      type: String,
      default: 'major'
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
      modes: [
        'major',
        'minor',
        'dorian',
        'phrygian',
        'lydian',
        'mixolydian',
        'locrian'
      ]
    };
  },
  computed: {
    fullName() {
      return (type) => (this.name ? `${this.name.replace(/ /g, '')}-` : '') + type
    }
  },
  methods: {
    setTonic(e) {
      this.$emit('set-tonic', e.target.value);
    },
    setScale(e) {
      this.$emit('set-scale', e.target.value);
    }
  }
}
</script>

<style scoped>
  select {
    background: rgba(255, 255, 255, 0.733);
    padding: 0.2rem 0.4rem;
    border-radius: 0.3rem;
    border: none;
    font-size: 0.8rem;
  }
  .field-label {
    margin-right: 0.4rem;
  }
</style>