<script
  setup>
  const props = defineProps({
    fill: Boolean,
    path: String
  })
</script>
<template>
  <svg
    viewBox = "0 0 24 24"
    w-h = "5"
    w-w = "5"
    v-bind:w-svg = "props.fill ? 'fill-current stroke-none' : 'fill-none stroke-2 stroke-current stroke-cap-round stroke-join-round'">
    <path
      v-bind:d = "props.path"/>
  </svg>
</template>