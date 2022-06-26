<template>
  <svg v-bind = "$attrs" :class = "`${$props.fill ? 'fill-current stroke-none' : 'fill-none stroke-current'} h-${$props.size} inline w-${$props.size}`" viewBox = "0 0 24 24" xmlns = "http://www.w3.org/2000/svg">
    <template v-if = "Array.isArray($props.path)">
      <path v-for = "path in $props.path" :d = "path" stroke-linecap = "round" stroke-linejoin = "round" stroke-width = "2"/>
    </template>
    <path v-else :d = "$props.path" stroke-linecap = "round" stroke-linejoin = "round" stroke-width = "2"/>
  </svg>
</template>
<script>
  export default {
    name: 'icon',
    props: {
      fill: Boolean,
      path: [Array, String],
      size: String
    }
  }
</script>