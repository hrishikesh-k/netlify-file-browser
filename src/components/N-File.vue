<script
  setup>
  import axios from 'axios'
  import filesize from 'file-size'
  import {getMaterialFileIcon} from 'file-extension-icon-js/dist'
  import Popper from 'vue3-popper'
  import {useRoute} from 'vue-router'
  import {useStore} from '../store'
  import NIcon from './N-Icon.vue'
  const props = defineProps({
    file: Array
  })
  const route = useRoute()
  const store = useStore()
  let downloaded = $ref(0)
  let downloading = $ref(false)
  let downloadStop
  function download() {
    downloading = true
    downloadStop = new AbortController()
    axios({
      data: {},
      headers: {
        authorization: `Bearer ${store.token}`,
        'content-type': 'application/vnd.bitballoon.v1.raw'
      },
      onDownloadProgress: progress => {
        downloaded = progress.loaded
      },
      responseType: 'blob',
      signal: downloadStop.signal,
      url: `https://api.netlify.com/api/v1/deploys/${route.params.deploy}/files${props.file[2]}`
    }).then(fileResponse => {
      let blob = document.createElement('a')
      blob.href = URL.createObjectURL(fileResponse.data)
      blob.download = props.file[2].substring(props.file[2].lastIndexOf('/') + 1)
      blob.click()
      URL.revokeObjectURL(blob.href)
      blob.remove()
      blob = fileResponse.data = null
    }).catch(fileError => {
      if (fileError.name !== 'CanceledError') {
        store.error = fileError.response.status
      }
    }).finally(() => {
      stopDownload()
    })
  }
  function preview() {
    window.open(`https://${route.params.deploy}--${route.params.site}.netlify.app${props.file[2]}`, '_blank')
  }
  function stopDownload() {
    downloadStop.abort()
    downloaded = 0
    downloading = false
    downloadStop = null
  }
</script>
<template>
  <div
    w-space = "y-3"
    w-w = "full">
    <div
      w-align = "items-center"
      w-flex = "~"
      w-space = "x-1"
      w-w = "full">
      <img
        alt = "file icon"
        w-h = "5"
        w-w = "5"
        v-bind:src = "getMaterialFileIcon(props.file[0])"/>
      <p
        w-flex = "1"
        w-text = "truncate">
        {{props.file[0]}}
      </p>
      <div
        w-bg = "gray500 dark:gray500"
        w-border = "rounded-full"
        w-display = "<xs:hidden"
        w-h = "2"
        w-pos = "relative"
        w-overflow = "hidden"
        w-w = "24"
        v-if = "downloading">
        <div
          w-bg = "teal300 dark:teal300"
          w-h = "full"
          w-pos = "absolute left-0 top-0"
          v-bind:style= "`width:${(downloaded/props.file[1])*100}%`">
        </div>
      </div>
      <p
        w-text = "right"
        w-w = "fit">
        {{filesize(props.file[1]).human()}}
      </p>
      <div
        w-h = "5"
        w-w = "5">
        <Popper
          arrow
          hover
          content = "Preview"
          placement = "left">
          <NIcon
            path = "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            w-cursor = "pointer"
            v-on:click = "preview"/>
        </Popper>
      </div>
      <div
        w-h = "5"
        w-w = "5"
        v-if = "downloading">
        <Popper
          arrow
          hover
          content = "Stop download"
          placement = "left">
          <NIcon
            path = "M6 18L18 6M6 6l12 12"
            w-cursor = "pointer"
            v-on:click = "stopDownload"/>
        </Popper>
      </div>
      <div
        w-h = "5"
        w-w = "5"
        v-else>
        <Popper
          arrow
          hover
          content = "Download"
          placement = "left">
          <NIcon
            path = "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            w-cursor = "pointer"
            v-on:click = "download"/>
        </Popper>
      </div>
    </div>
  </div>
</template>