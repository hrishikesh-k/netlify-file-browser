<script
  setup>
  import axios from 'axios'
  import filesize from 'file-size'
  import {onMounted} from 'vue'
  import streamSaver from 'streamsaver'
  import {useRoute} from 'vue-router'
  import {useRouter} from 'vue-router'
  import {watch} from 'vue'
  import {Zip} from 'fflate'
  import {ZipPassThrough} from 'fflate'
  import {useStore} from '../store'
  import NButton from '../components/N-Button.vue'
  import NError from '../components/N-Error.vue'
  import NFolder from '../components/N-Folder.vue'
  import NModal from '../components/N-Modal.vue'
  import NSkeleton from '../components/N-Skeleton.vue'
  streamSaver.mitm = `${location.origin}/mitm.html`
  const route = useRoute()
  const router = useRouter()
  const store = useStore()
  let downloaded = $ref(0)
  let downloading = $ref(false)
  let downloadModal = $ref(false)
  let downloadStop, zip, zipReadableStream
  let fileCount = $ref(null)
  let fileSize = $ref(null)
  let loading = $ref(false)
  function downloadAll(init) {
    if (init) {
      downloading = true
      downloadStop = new AbortController()
      zip = new Zip()
      zipReadableStream = new ReadableStream({
        start: controller => {
          zip.ondata = (error, data, final) => {
            if (error) {
              controller.error(error)
            } else {
              if (zipReadableStream.locked) {
                controller.enqueue(data)
              } else {
               stopDownload()
              }
              if (final) {
                controller.close()
              }
            }
          }
        }
      })
      zipReadableStream.pipeTo(streamSaver.createWriteStream(`deploy-${route.params.deploy}.zip`, {
        size: fileSize
      }), {
        signal: downloadStop.signal
      }).catch(error => {
        if (error && error.name !== 'AbortError') {
          stopDownload()
          store.error = 1000
        }
      })
      window.onunload = stopDownload
    }
    fetch(`https://api.netlify.com/api/v1/deploys/${route.params.deploy}/files${store.files[downloaded].id}`, {
      headers: {
        authorization: `Bearer ${store.token}`,
        'content-type': 'application/vnd.bitballoon.v1.raw'
      },
      signal: downloadStop.signal
    }).then(async fileResponse => {
      if (fileResponse.ok) {
        const zippedFileStream = new ZipPassThrough(`deploy-${route.params.deploy}${store.files[downloaded].id}`)
        zip.add(zippedFileStream)
        const fileReader = fileResponse.body.getReader()
        while (true) {
          const chunk = await fileReader.read()
          if (chunk.done) {
            zippedFileStream.push(new Uint8Array(0), true)
            break
          } else {
            zippedFileStream.push(chunk.value)
          }
        }
      } else {
        throw fileResponse.status
      }
    }).then(() => {
      downloaded++
      if (downloaded < store.files.length) {
        downloadAll()
      } else {
        zip.end()
      }
    }).catch(error => {
      if (error.name !== 'AbortError') {
        stopDownload()
        store.error = 1000
      }
    })
  }
  function fetchFiles() {
    if (downloading) {
      stopDownload()
    }
    store.files = null
    loading = true
    axios({
      url: `/api/files?deploy=${route.params.deploy}`
    }).then(filesResponse => {
      let current
      const output = {
        '_root': []
      }
      filesResponse.data.files.sort((firstItem, secondItem) => {
        return firstItem.id.localeCompare(secondItem.id, undefined, {
          numeric: true
        })
      }).forEach(file => {
        current = output
        const pathArray = file.id.slice(1).split('/')
        pathArray.forEach((segment, segmentIndex) => {
          if (!current.hasOwnProperty(segment)) {
            if ((segmentIndex + 1 === pathArray.length) && /(\.[^\\/]+)$/.test(segment)) {
              current['_root'].push([segment, file.size, file.id])
            } else {
              current[segment] = {
                '_root': []
              }
            }
          }
          current = current[segment]
        })
      })
      store.fileTree = Object.entries(output)
      store.files = filesResponse.data.files
      fileCount = filesResponse.data.files.length
      fileSize = filesResponse.data.size
      store.token = filesResponse.data.token
    }).catch(fileError => {
      store.error = fileError.response.status
    }).finally(() => {
      loading = false
    })
  }
  function stopDownload() {
    window.onunload = null
    downloadStop.abort()
    downloaded = 0
    downloading = downloadModal = false
    downloadStop = zip = zipReadableStream = null
  }
  watch(() => {
    return downloaded
  }, () => {
    if (downloaded === fileCount) {
      setTimeout(() => {
        stopDownload()
      }, 1000)
    }
  })
  onMounted(() => {
    document.title = 'Files :: Netlify File Browser'
    if (store.deployChosen !== route.params.deploy || !store.files) {
      fetchFiles()
    }
    store.deployChosen = route.params.deploy
  })
</script>
<template>
  <NError
    v-if = "store.error"/>
  <template
    v-else>
    <NSkeleton
      v-if = "loading || !store.files"/>
    <template
      v-else>
      <div
        w-align = "items-center"
        w-flex = "~"
        w-justify = "between"
        w-w = "full">
        <div
          w-align = "items-center"
          w-flex = "~"
          w-space = "x-3">
          <NButton
            icon = "M10 19l-7-7m0 0l7-7m-7 7h18"
            text = "Back"
            v-on:click = "router.push(`/accounts/${route.params.account}/sites/${route.params.site}/deploys`)"/>
          <p
            w-text = "xl">
            Files
          </p>
        </div>
        <div
          w-flex = "~"
          w-space = "x-1">
          <NButton
            icon = "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            text = "Download all"
            v-if = "!downloading"
            v-on:click = "downloadModal = true"/>
          <NButton
            icon = "M6 18L18 6M6 6l12 12"
            text = "Stop download"
            variant = "danger"
            v-else
            v-on:click = "downloadModal = true"/>
          <NButton
            icon = "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            text = "Refresh"
            v-on:click = "fetchFiles"/>
        </div>
      </div>
      <hr
        w-border = "gray300 top-1 dark:gray400"
        w-w = "full"/>
      <p>
        Showing {{fileCount}} file(s) totalling to {{filesize(fileSize).human()}}.
      </p>
      <NFolder
        v-bind:folder = "file"
        v-for = "file in store.fileTree"/>
    </template>
  </template>
  <NModal
    title = "Download all"
    v-bind:open = "downloadModal"
    v-on:close = "downloadModal = false">
    <template
      v-if = "downloaded === fileCount">
      <p
        w-w = "full">
        All files have been successfully downloaded.
      </p>
      <NButton
        text = "Close"
        v-on:click = "downloadModal = false"/>
    </template>
    <template
      v-else-if = "downloading">
      <p
        w-w = "full">
        Downloaded {{downloaded}} of {{fileCount}}
      </p>
      <div
        w-align = "items-center"
        w-flex = "~"
        w-space = "x-1">
        <div
          w-bg = "gray500 dark:gray500"
          w-border = "rounded-full"
          w-flex = "1"
          w-h = "2"
          w-pos = "relative"
          w-overflow = "hidden">
          <div
            w-bg = "teal300 dark:teal300"
            w-h = "full"
            w-pos = "absolute left-0 top-0"
            v-bind:style= "`width:${(downloaded/fileCount)*100}%`">
          </div>
        </div>
        <NButton
          icon = "M6 18L18 6M6 6l12 12"
          text = "Stop download"
          variant = "danger"
          v-on:click = "stopDownload"/>
      </div>
    </template>
    <template
      v-else>
      <p
        w-w = "full">
        Clicking "Start downloading" will download all the files from the deploy to your device as a zip. Note that, the zipping occurs on the client-side and will fail if the browser (or the tab) is closed.
      </p>
      <NButton
        text = "Start downloading"
        v-on:click = "downloadAll(true)"/>
    </template>
  </NModal>
</template>