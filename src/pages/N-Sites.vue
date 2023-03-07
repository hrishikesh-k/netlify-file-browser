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
      store.user = true
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
      store.error.value = siteError.response.status
    }).finally(() => {
      loading = false
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
              fill
              w-h = "10"
              w-text = "white"
              w-w = "10"
              v-bind:path = "store.netlifyIcon"
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