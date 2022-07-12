<script
  setup>
  import axios from 'axios'
  import {onMounted} from 'vue'
  import {useRoute} from 'vue-router'
  import {useRouter} from 'vue-router'
  import {useStore} from '../store'
  import NButton from '../components/N-Button.vue'
  import NError from '../components/N-Error.vue'
  import NFind from '../components/N-Find.vue'
  import NIcon from '../components/N-Icon.vue'
  import NSkeleton from '../components/N-Skeleton.vue'
  const route = useRoute()
  const router = useRouter()
  const store = useStore()
  let loading = $ref(false)
  function fetchSites() {
    store.sites = null
    loading = true
    axios({
      url: `/api/sites?account=${route.params.account}`
    }).then(sitesResponse => {
      store.sites = sitesResponse.data.map(site => {
        return {
          ...site,
          gradient: {
            angle: Math.floor(Math.random() * 360),
            color1: store.randomColour(),
            color2: store.randomColour()
          }
        }
      })
    }).catch(siteError => {
      store.error = siteError.response.status
    }).finally(() => {
      loading = false
    })
  }
  function findSite() {
    loading = true
    axios({
      data: {
        search: 'sites',
        string: store.siteId
      },
      method: 'post',
      url: '/api/find'
    }).then(findResponse => {
      router.push(`/accounts/${route.params.account}/sites/${findResponse.data.id}/deploys`)
    }).catch(siteError => {
      error.value = siteError.response.status
    }).finally(() => {
      loading.value = false
    })
  }
  onMounted(() => {
    document.title = 'Sites :: Netlify File Browser'
    if (store.accountChosen !== route.params.account || !store.sites) {
      fetchSites()
    }
    store.accountChosen = route.params.account
  })
</script>
<template>
  <NError
    v-if = "store.error"/>
  <template
    v-else>
    <NSkeleton
      v-if = "loading || !store.sites"/>
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
            v-on:click = "router.push(`/accounts`)"/>
          <p
            w-text = "xl">
            Sites
          </p>
        </div>
        <NButton
          icon = "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          text = "Refresh"
          v-on:click = "fetchSites"/>
      </div>
      <hr
        w-border = "gray300 top-1 dark:gray400"
        w-w = "full"/>
      <p
        w-w = "full">
        Showing {{store.sites.length}} of maximum 10 sites. If the one you're looking for is not listed, enter the site ID:
      </p>
      <NFind
        v-model = "store.siteId"
        v-on:find = "findSite"/>
      <div
        w-flex = "~ wrap"
        w-gap = "3"
        w-w = "full">
        <div
          style = "outline:var(--gray500) solid 1px;outline-offset:-2px;"
          w-bg = "hover:hover"
          w-border = "rounded-lg"
          w-cursor = "pointer"
          w-flex = "~ wrap"
          w-gap = "3"
          w-justify = "<xs:center"
          w-p = "3"
          w-w = "full xs:gap2"
          v-bind:key = "site.id"
          v-for = "site in store.sites"
          v-on:click = "router.push(`/accounts/${route.params.account}/sites/${site.id}/deploys`)">
          <div
            w-align = "items-center"
            w-aspect = "video"
            w-border = "rounded-lg"
            w-flex = "~ wrap"
            w-justify = "center"
            w-overflow = "hidden"
            w-w = "30"
            v-bind:style = "`background-image:linear-gradient(${site.gradient.angle}deg,${site.gradient.color1},${site.gradient.color2})`">
            <img
              alt = "site screenshot"
              w-h = "full"
              w-w = "full"
              v-bind:src = "site.icon"
              v-if = "site.icon"/>
            <NIcon
              w-h = "10"
              w-text = "white"
              w-w = "10"
              path = "M16.49,8.94L16.49,8.94c-0.01,0-0.02-0.01-0.02-0.01c-0.01-0.01-0.02-0.03-0.01-0.05l0.4-2.47l1.89,1.89 l-1.97,0.84c-0.01,0-0.01,0-0.02,0h-0.01c0,0-0.01,0-0.01-0.01C16.68,9.06,16.59,8.99,16.49,8.94z M19.24,8.79l2.02,2.02 c0.42,0.42,0.63,0.63,0.71,0.87c0.01,0.04,0.02,0.07,0.03,0.11l-4.84-2.05c0,0-0.01,0-0.01,0c-0.02-0.01-0.04-0.02-0.04-0.04 s0.02-0.03,0.04-0.04l0.01,0L19.24,8.79z M21.92,12.44c-0.1,0.2-0.31,0.4-0.65,0.74l-2.28,2.28l-2.95-0.61l-0.02,0 c-0.03,0-0.05-0.01-0.05-0.03c-0.02-0.25-0.15-0.47-0.34-0.62c-0.01-0.01-0.01-0.03-0.01-0.05c0,0,0-0.01,0-0.01l0.56-3.4l0-0.01 c0-0.03,0.01-0.06,0.03-0.06c0.24-0.03,0.46-0.15,0.61-0.35c0-0.01,0.01-0.01,0.01-0.01c0.02-0.01,0.04,0,0.05,0.01L21.92,12.44 L21.92,12.44z M18.46,15.99l-3.75,3.75l0.64-3.94l0-0.01c0-0.01,0-0.01,0-0.02c0.01-0.01,0.02-0.02,0.03-0.02l0.01,0 c0.14-0.06,0.27-0.15,0.36-0.27c0.01-0.01,0.03-0.03,0.05-0.03c0.01,0,0.01,0,0.02,0L18.46,15.99L18.46,15.99z M13.91,20.53 l-0.42,0.42L8.81,14.2c0,0,0,0-0.01-0.01c-0.01-0.01-0.02-0.02-0.01-0.03c0-0.01,0.01-0.02,0.01-0.02l0.01-0.01 c0.01-0.02,0.03-0.04,0.04-0.06l0.01-0.02l0,0c0.01-0.01,0.01-0.02,0.03-0.03c0.01-0.01,0.03,0,0.04,0l5.18,1.07 c0.01,0,0.03,0.01,0.04,0.02c0.01,0.01,0.01,0.01,0.01,0.02c0.07,0.28,0.27,0.5,0.54,0.61c0.01,0.01,0.01,0.02,0,0.04 c0,0.01-0.01,0.02-0.01,0.02C14.62,16.2,14.06,19.61,13.91,20.53z M13.03,21.41c-0.31,0.31-0.5,0.47-0.7,0.54 c-0.2,0.06-0.42,0.06-0.63,0c-0.24-0.08-0.45-0.29-0.87-0.71l-4.7-4.69l1.23-1.9c0.01-0.01,0.01-0.02,0.02-0.02 c0.01-0.01,0.03-0.01,0.05,0C7.7,14.71,8,14.7,8.28,14.59c0.01-0.01,0.03-0.01,0.04,0c0.01,0,0.01,0.01,0.01,0.02L13.03,21.41 L13.03,21.41z M5.67,16.1l-1.08-1.08l2.13-0.91c0.01,0,0.01,0,0.02,0c0.02,0,0.03,0.02,0.04,0.03c0.02,0.03,0.04,0.06,0.07,0.1 l0.01,0.01c0.01,0.01,0,0.02,0,0.03L5.67,16.1L5.67,16.1z M4.12,14.55l-1.36-1.36c-0.23-0.23-0.4-0.4-0.52-0.54l4.14,0.86 c0.01,0,0.01,0,0.02,0c0.03,0,0.05,0.01,0.05,0.03c0,0.03-0.03,0.04-0.06,0.05l-0.01,0.01L4.12,14.55z M2,11.94 c0-0.09,0.02-0.17,0.05-0.26c0.08-0.24,0.29-0.45,0.71-0.87L4.5,9.07c0.8,1.16,1.61,2.33,2.42,3.49c0.01,0.02,0.03,0.04,0.01,0.06 c-0.08,0.08-0.15,0.18-0.21,0.28c-0.01,0.01-0.01,0.02-0.03,0.03c-0.01,0-0.01,0-0.02,0h0L2,11.94L2,11.94z M4.97,8.6l2.34-2.34 C7.53,6.36,8.33,6.7,9.05,7c0.54,0.23,1.04,0.44,1.19,0.51c0.02,0.01,0.03,0.01,0.04,0.03c0,0.01,0,0.02,0,0.03 c-0.08,0.34,0.03,0.7,0.27,0.95c0.02,0.02,0,0.04-0.01,0.06l-0.01,0.01l-2.38,3.68c-0.01,0.01-0.01,0.02-0.02,0.03 c-0.01,0.01-0.03,0-0.04,0c-0.09-0.02-0.19-0.04-0.28-0.04c-0.09,0-0.18,0.02-0.27,0.03h0c-0.01,0-0.02,0-0.03,0 c-0.01-0.01-0.02-0.02-0.02-0.03L4.97,8.6L4.97,8.6z M7.78,5.79l3.04-3.03c0.42-0.42,0.63-0.63,0.87-0.71c0.2-0.06,0.42-0.06,0.63,0 c0.24,0.08,0.45,0.29,0.87,0.71l0.66,0.66L11.7,6.75c-0.01,0.01-0.01,0.02-0.02,0.03c-0.01,0.01-0.03,0.01-0.05,0 c-0.35-0.1-0.72-0.03-1,0.19c-0.01,0.01-0.03,0.01-0.05,0C10.29,6.85,8.1,5.92,7.78,5.79z M14.32,3.87l1.99,1.99l-0.48,2.97v0.01 c0,0.01,0,0.01,0,0.02c-0.01,0.01-0.02,0.01-0.03,0.02c-0.1,0.03-0.2,0.08-0.29,0.14c0,0-0.01,0.01-0.01,0.01 c-0.01,0.01-0.01,0.01-0.02,0.01c-0.01,0-0.02,0-0.02,0l-3.04-1.29l-0.01,0c-0.02-0.01-0.04-0.02-0.04-0.04 c-0.02-0.17-0.07-0.33-0.16-0.48c-0.01-0.02-0.03-0.05-0.02-0.07L14.32,3.87z M12.26,8.36l2.85,1.2c0.02,0.01,0.03,0.01,0.04,0.03 c0,0.01,0,0.02,0,0.03c-0.01,0.04-0.02,0.09-0.02,0.14v0.08c0,0.02-0.02,0.03-0.04,0.04l-0.01,0c-0.45,0.19-6.33,2.7-6.34,2.7 c-0.01,0-0.02,0-0.03-0.01c-0.02-0.02,0-0.04,0.01-0.06c0,0,0-0.01,0.01-0.01l2.34-3.62l0-0.01c0.01-0.02,0.03-0.05,0.05-0.05 l0.02,0c0.05,0.01,0.1,0.01,0.15,0.01c0.36,0,0.68-0.17,0.88-0.47c0-0.01,0.01-0.01,0.02-0.02C12.22,8.35,12.25,8.35,12.26,8.36z  M9,13.15l6.41-2.73c0,0,0.01,0,0.02,0.01c0.03,0.03,0.06,0.06,0.09,0.08l0.01,0.01c0.01,0.01,0.03,0.02,0.03,0.03 c0,0.01,0,0.01,0,0.01l-0.55,3.37l0,0.01c0,0.03-0.01,0.06-0.03,0.06c-0.3,0.02-0.57,0.19-0.72,0.44l0,0 c-0.01,0.01-0.01,0.02-0.03,0.03c-0.01,0.01-0.03,0-0.04,0l-5.11-1.05C9.08,13.42,9.01,13.15,9,13.15z"
              v-bind:fill = "true"
              v-else/>
          </div>
          <div
            w-w = "full xs:cardTitle">
            <p
              w-text = "truncate <xs:center">
              {{site.name}}
            </p>
            <p
              w-text = "gray500 sm truncate dark:gray200"
              v-if = "site.domain">
              Domain: {{site.domain}}
            </p>
          </div>
        </div>
      </div>
    </template>
  </template>
</template>