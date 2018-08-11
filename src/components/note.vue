<template>
  <button
    :class="{ enabled: enabled, phased: phased }"
    @click="$emit('click-note', beat, note, !enabled)"/>
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
  }
}
</script>

<style scoped="true">
button {
  border: solid 1px grey;
  background: none;
  width: 2rem;
  height: 2rem;
  display: block;
  cursor: pointer;
}
button.enabled {
  background: blue;
}
button.phased {
  background: red;
}
button.enabled.phased {
  background: black;
}
</style>