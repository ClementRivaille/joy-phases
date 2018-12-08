<template>
  <button
    :class="{ enabled: enabled, phased: phased }"
    :id="btnId"
    :aria-pressed="enabled"
    @click="$emit('click-note', beat, note, !enabled)"
    @keydown="moveFocus">
    <span class="sr-only">Note</span>
  </button>
</template>

<script>
export default {
  props: {
    enabled: {
      type: Boolean,
      default: false
    },
    phased: {
      type: Boolean,
      default: false
    },
    note: {
      type: Number,
      default: 0
    },
    beat: {
      type: Number,
      default: 0
    },
  },
  computed: {
    btnId() {
      return `note-${this.beat}-${this.note}`
    }
  },
  methods: {
    moveFocus(e) {
      if (['ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight', 'Tab'].indexOf(e.key) > -1)
        this.$emit('move',
          e.key === 'Tab' ? 'out' : e.key.replace(/Arrow/g, '').toLowerCase(),
          this.beat,
          this.note
        )
    }
  }
}
</script>

<style scoped>
button {
  border: solid 0.13rem white;
  opacity: 0.4;
  background: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.3rem;
  display: block;
  cursor: pointer;
}
button.enabled {
  background: rgb(111, 16, 12);;
}
button.phased {
  background: rgb(32, 193, 212);
}
button.enabled.phased {
  background: rgb(54, 48, 155);
}

@media (max-width: 920px) {
  button {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.1rem;
  }
}
</style>