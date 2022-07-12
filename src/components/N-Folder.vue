<script
  setup>
  import NFile from './N-File.vue'
  import NFolder from './N-Folder.vue'
  import NIcon from './N-Icon.vue'
  const props = defineProps({
    folder: Array
  })
  let open = $ref(false)
</script>
<template>
  <template
    v-if = "props.folder[0] === '_root' && props.folder[1].length > 0">
    <NFile
      v-bind:file = "file"
      v-for = "file in props.folder[1]"/>
  </template>
  <template
    v-else-if = "props.folder[0] !== '_root' ">
    <div
      w-w = "full">
      <div
        w-align = "items-center"
        w-cursor = "pointer"
        w-flex = "~"
        w-space = "x-1"
        w-w = "full"
        v-on:click = "open = !open">
        <NIcon
          v-bind:path = "open ? 'M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z' : 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'"/>
        <p
          w-flex = "1">
          {{props.folder[0]}}
        </p>
      </div>
      <div
        w-border = "l"
        w-overflow = "hidden"
        w-p = "l-3"
        w-space = "y-3"
        w-w = "file"
        v-bind:w-h = "open ? 'fit' : '0'"
        v-bind:w-m = "`${open ? 't-3' : 't-0'} l-2`">
        <NFolder
          v-bind:folder = "file"
          v-for = "file in Object.entries(props.folder[1])"/>
      </div>
    </div>
  </template>
</template>
<!--
  <safe
    w-h = "0 fit"
    w-m = "l-2 t-0 t-3"/>
-->