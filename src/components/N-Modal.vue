<script
  setup>
  import Popper from 'vue3-popper'
  import {watch} from 'vue'
  import NButton from './N-Button.vue'
  const emit = defineEmits(['close'])
  const props = defineProps({
    open: Boolean,
    title: String
  })
  watch(() => {
    return props.open
  }, () => {
    if (props.open) {
      document.querySelector('body').style.overflow = 'hidden'
    } else {
      document.querySelector('body').style.removeProperty('overflow')
    }
  })
</script>
<template>
  <div
    w-align = "items-center"
    w-bg = "overlay dark:overlay"
    w-flex = "~"
    w-h = "full"
    w-justify = "center"
    w-m = "!0"
    w-p = "6"
    w-pos = "fixed left-0 top-0"
    w-w = "full"
    v-if = "props.open"
    v-on:click.self = "emit('close')">
    <div
      w-bg = "white dark:black"
      w-border = "~ gray300 rounded-lg dark:gray700"
      w-max-h = "96"
      w-max-w = "120"
      w-overflow = "hidden"
      w-w = "full">
      <div
        w-max-h = "96"
        w-p = "6"
        w-scrollbar = "thin thumb-teal400 track-teal500 dark:thumb-teal400 dark:track-teal500"
        w-space = "y-3"
        w-w = "full"><div
        w-align = "items-center"
        w-flex = "~"
        w-justify = "betweem"
        w-space = "x-1">
        <p
          w-text = "xl"
          w-flex = "1">
          {{props.title}}
        </p>
        <div
          w-h = "9"
          w-w = "9">
          <Popper
            arrow
            hover
            content = "Close"
            placement = "bottom-end">
            <NButton
              icon = "M6 18L18 6M6 6l12 12"
              v-on:click = "emit('close')"/>
          </Popper>
        </div>
        </div>
        <hr
          w-border = "gray300 top-1 dark:gray400"
          w-w = "full"/>
        <slot/>
      </div>
    </div>
  </div>
</template>