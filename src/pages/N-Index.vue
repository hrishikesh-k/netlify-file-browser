<script
  setup>
  import axios from 'axios'
  import {onMounted} from 'vue'
  import {useRouter} from 'vue-router'
  import {useStore} from '../store'
  import NBrowser from '../assets/Browser.svg'
  import NButton from '../components/N-Button.vue'
  import NSkeleton from '../components/N-Skeleton.vue'
  const router = useRouter()
  const store = useStore()
  let loading = $ref(true)
  onMounted(() => {
    axios({
      url: '/api/authenticate'
    }).then(() => {
      router.push('/accounts')
    }).catch(() => {
      loading = false
    })
  })
</script>
<template>
  <NSkeleton
    v-if = "loading"/>
  <template
    v-else>
    <div
      w-align = "items-center"
      w-flex = "~"
      w-justify = "between">
      <p
        w-flex = "1"
        w-font = "semibold"
        w-text = "truncate xl xs:2xl">
        Netlify File Browser
      </p>
      <NButton
        fill
        text = "Login with Netlify"
        variant = "primary"
        v-bind:icon = "store.netlifyIcon"
        v-on:click = "store.authorize('/accounts')"/>
    </div>
    <hr
      w-border = "gray300 top-1 dark:gray400"
      w-w = "full"/>
    <NBrowser
      w-m = "x-auto"
      w-max-w = "120"/>
    <p>
      Netlify File Browser leverages Netlify API to create a UI-based file browser for your Netlify deploys. You can view the entire file-tree of your deploys, preview each file individually, or even download the entire deploy. This can help you debug your 404 errors, check your website's folder structure or download the deploys that fail in the Netlify UI. However, this tool has certain limitations too. Here are a few caveats:
    </p>
    <ul
      w-m = "l-3"
      w-list = "disc">
      <li>
        Files in
        <code
          w-bg = "code dark:code"
          w-border = "rounded-sm"
          w-p = "x-2 y-1">/.netlify/</code>
        paths cannot be downloaded or viewed. These usually include Netlify Functions, Netlify Edge Functions, Netlify Identity Endpoints, etc. These are not available for public viewing and are internally used by Netlify.
      </li>
      <li>
        Files hosted in Netlify Large Media cannot be downloaded via the API. They usually return the Git pointers. You could use preview to view those files, however the tool won't be able to label which files belong to Netlify Large Media.
      </li>
      <li>
        Previewing would respect your site's Netlify Edge Functions and redirects and thus, might not always show the exact file based on your configuration. Downloading the file would always give you the exact raw file.
      </li>
      <li>
        Generating the file-tree is done on the client-side, thus in cases of very large deploys, you might have to wait longer for the browser to complete its processing. Downloading extremely large deploys (consider 10,000 files) is not possible due to a limitation with the Netlify API.
      </li>
      <li>
        Downloading might fail due to content-blocking scripts, or blocking cookies and service workers. It's always recommended to pause all such extensions, or use the tool in an isolated environment without these extensions.
      </li>
    </ul>
  </template>
</template>