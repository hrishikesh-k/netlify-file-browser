<script
  setup>
  import {computed} from 'vue'
  import NIcon from './N-Icon.vue'
  const props = defineProps({
    fill: Boolean,
    icon: String,
    text: String,
    variant: String
  })
  const buttonStyle = computed(() => {
    switch (props.variant) {
      case 'danger':
        return {
          bg: 'red300 dark:red200 hover:red200 hover:dark:red100',
          text: 'black dark:read500'
        }
      case 'primary':
        return {
          bg: 'teal300 dark:teal200 hover:teal200 hover:dark:teal100',
          text: 'teal500 dark:teal500'
        }
      case 'outline':
      case 'transparent':
        return {
          bg: 'hover:teal100 hover:dark:teal500',
          text: 'hover:teal500 hover:dark:teal300'
        }
      default:
        return {
          bg: 'gray300 dark:gray400 hover:teal100 hover:dark:teal500',
          text: 'hover:teal500 hover:dark:white'
        }
    }
  })
</script>
<template>
  <button
    w-align = "items-center"
    w-border = "rounded-md"
    w-flex = "~"
    w-font = "medium"
    w-justify = "center"
    w-p = "2"
    w-space = "x-1"
    v-bind:style = "props.variant === 'outline' && `outline: var(--teal300) solid 1px;outline-offset: -2px;`"
    v-bind:w-bg = "buttonStyle.bg"
    v-bind:w-text = "buttonStyle.text">
    <NIcon
      v-bind:fill = "props.fill"
      v-bind:path = "props.icon"
      v-if = "props.icon"/>
    <span
      v-bind:w-display = "props.icon && '<xs:hidden'"
      v-if = "props.text">
      {{props.text}}
    </span>
  </button>
</template>
<!--
  <safe
    w-bg = "gray300 red300 teal300 dark:gray400 dark:red200 dark:teal200 hover:red200 hover:teal100 hover:teal200 hover:dark:red100 hover:dark:teal100 hover:dark:teal500"
    w-display = "<xs:hidden"
    w-text = "black teal500 dark:read500 dark:teal500 hover:teal500 hover:dark:teal300 hover:dark:white"/>
-->