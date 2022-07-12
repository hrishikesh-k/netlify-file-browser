<script
  setup>
  import {computed} from 'vue'
  import NIcon from './N-Icon.vue'
  const emit = defineEmits(['find', 'update:modelValue'])
  const props = defineProps({
    modelValue: [null, String]
  })
  const searchString = computed({
    get() {
      return props.modelValue || ''
    },
    set(value) {
      emit('update:modelValue', value);
    }
  })
</script>
<template>
  <form
    w-pos = "relative"
    w-w = "full xs:1/2"
    v-on:submit.prevent = "emit('find')">
    <input
      placeholder = "Search for ID"
      type = "search"
      w-bg = "white dark:black"
      w-h = "10"
      w-outline = "none"
      w-p = "x-2.5"
      w-w = "full"
      v-bind:w-border = "`${searchString.length > 0 ? 'teal300 dark:teal300' : 'gray300 dark:gray400 focus:teal100 focus:dark:teal400 hover:teal100 hover:dark:teal400'} 2 rounded-md`"
      v-model = "searchString"/>
    <NIcon
      path = "M6 18L18 6M6 6l12 12"
      w-cursor = "pointer"
      w-pos = "absolute right-2.5 top-2.5"
      v-if = "searchString.length > 0"
      v-on:click = "searchString = null"/>
  </form>
</template>