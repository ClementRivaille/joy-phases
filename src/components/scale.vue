<template>
  <div>
    <label>
      Tonic
      <select
        :value="tonic"
        name="tonic"
        @input="setTonic">
        <option
          v-for="(note, index) in notes"
          :key="index">
          {{ note }}
        </option>
      </select>
    </label>

    <label>
      Mode
      <select
        :value="mode"
        name="mode"
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