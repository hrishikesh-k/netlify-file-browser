<script
  setup>
  import axios from 'axios'
  import {format} from 'date-fns'
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
  function fetchDeploys() {
    store.deploys = null
    loading = true
    axios({
      url: `/api/deploys?site=${route.params.site}`
    }).then(deploysResponse => {
      store.user = true
      store.deploys = deploysResponse.data.map(deploy => {
        return {
          ...deploy,
          gradient: {
            angle: Math.floor(Math.random() * 360),
            color1: store.randomColour(),
            color2: store.randomColour()
          }
        }
      })
    }).catch(deployError => {
      store.error = deployError.response.status
    }).finally(() => {
      loading = false
    })
  }
  function findDeploy() {
    loading = true
    axios({
      data: {
        search: 'deploys',
        string: store.deployId
      },
      method: 'post',
      url: '/api/find'
    }).then(() => {
      router.push(`/accounts/${route.params.account}/sites/${route.params.site}/deploys/${store.deployId}/files`)
    }).catch(deployError => {
      store.error = deployError.response.status
    }).finally(() => {
      store.loading = false
    })
  }
  onMounted(() => {
    document.title = 'Deploys :: Netlify File Browser'
    if (store.siteChosen !== route.params.site || !store.deploys) {
      fetchDeploys()
    }
    store.siteChosen = route.params.site
  })
</script>
<template>
  <NError
    v-if = "store.error"/>
  <template
    v-else>
    <NSkeleton
      v-if = "loading || !store.deploys"/>
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
            v-on:click = "router.push(`/accounts/${route.params.account}/sites`)"/>
          <p
            w-text = "xl">
            Deploys
          </p>
        </div>
        <NButton
          icon = "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          text = "Refresh"
          v-on:click = "fetchDeploys"/>
      </div>
      <hr
        w-border = "gray300 top-1 dark:gray400"
        w-w = "full"/>
      <p
        v-if = "store.deploys.length === 0">
        The selected site doesn't seem to have any recent deploy in the ready state.
      </p>
      <template
        v-else>
        <p
          w-w = "full">
          Showing {{store.deploys.length}} of maximum 10 successfully completed deploys. If the one you're looking for is not listed, enter the deploy ID:
        </p>
        <NFind
          v-model = "store.deployId"
          v-on:find = "findDeploy"/>
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
            v-bind:key = "deploy.id"
            v-for = "deploy in store.deploys"
            v-on:click = "router.push(`/accounts/${route.params.account}/sites/${route.params.site}/deploys/${deploy.id}/files`)">
            <div
              w-align = "items-center"
              w-aspect = "video"
              w-border = "rounded-lg"
              w-flex = "~ wrap"
              w-justify = "center"
              w-overflow = "hidden"
              w-w = "30"
              v-bind:style = "`background-image:linear-gradient(${deploy.gradient.angle}deg,${deploy.gradient.color1},${deploy.gradient.color2})`">
              <img
                alt = "deploy screenshot"
                w-h = "full"
                w-w = "full"
                v-bind:src = "deploy.icon"
                v-if = "deploy.icon"/>
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
                {{deploy.name || 'Deploy'}}
              </p>
              <p
                w-text = "gray500 sm truncate dark:gray200"
                v-if = "deploy.branch">
                Branch: {{deploy.branch}}
              </p>
              <p
                w-text = "gray500 sm truncate dark:gray200">
                Time: {{format(new Date(deploy.time), 'PPPp')}}
              </p>
            </div>
          </div>
        </div>
      </template>
    </template>
  </template>
</template>