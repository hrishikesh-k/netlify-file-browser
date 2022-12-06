<script
  setup>
  import axios from 'axios'
  import {onMounted} from 'vue'
  import {useRouter} from 'vue-router'
  import {useStore} from '../store'
  import NButton from '../components/N-Button.vue'
  import NError from '../components/N-Error.vue'
  import NFind from '../components/N-Find.vue'
  import NIcon from '../components/N-Icon.vue'
  import NSkeleton from '../components/N-Skeleton.vue'
  const router = useRouter()
  const store = useStore()
  let loading = $ref(false)
  function fetchAccounts() {
    store.accounts = null
    loading = true
    axios({
      url: '/api/accounts'
    }).then(accountsResponse => {
      store.user = true
      store.accounts = accountsResponse.data.map(account => {
        return {
          ...account,
          gradient: {
            angle: Math.floor(Math.random() * 360),
            color1: store.randomColour(),
            color2: store.randomColour()
          }
        }
      })
    }).catch(accountError => {
      store.error = accountError.response.status
    }).finally(() => {
      loading = false
    })
  }
  function findAccount() {
    loading = true
    axios({
      data: {
        search: 'accounts',
        string: store.accountId
      },
      method: 'post',
      url: '/api/find'
    }).then(findResponse => {
      router.push(`/accounts/${findResponse.data.id}/sites`)
    }).catch(accountError => {
      store.error = accountError.response.status
    }).finally(() => {
      loading = false
    })
  }
  onMounted(() => {
    document.title = 'Accounts :: Netlify File Browser'
    if (!store.accounts) {
      fetchAccounts()
    }
  })
</script>
<template>
  <NError
    v-if = "store.error"/>
  <template
    v-else>
    <NSkeleton
      v-if = "loading || !store.accounts"/>
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
            v-on:click = "router.go(-1)"/>
          <p
            w-text = "xl">
            Accounts
          </p>
        </div>
        <NButton
          icon = "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          text = "Refresh"
          v-on:click = "fetchAccounts"/>
      </div>
      <hr
        w-border = "gray300 top-1 dark:gray400"
        w-w = "full"/>
      <p
        w-w = "full">
        Showing {{store.accounts.length}} of maximum 10 accounts. If the one you're looking for is not listed, enter the ID:
      </p>
      <NFind
        v-model = "store.accountId"
        v-on:find = "findAccount"/>
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
          v-bind:key = "account.id"
          v-for = "account in store.accounts"
          v-on:click = "router.push(`/accounts/${account.id}/sites`)">
          <div
            w-align = "items-center"
            w-aspect = "square"
            w-border = "rounded-lg"
            w-flex = "~"
            w-justify = "center"
            w-overflow = "hidden"
            w-w = "30"
            v-bind:style = "`background-image:linear-gradient(${account.gradient.angle}deg,${account.gradient.color1},${account.gradient.color2})`">
            <img
              alt = "account icon"
              w-h = "full"
              w-w = "full"
              v-bind:src = "account.icon"
              v-if = "account.icon"/>
            <NIcon
              fill
              w-h = "15"
              w-text = "white"
              w-w = "15"
              v-bind:path = "store.netlifyIcon"
              v-else/>
          </div>
          <div
            w-w = "full xs:cardTitle">
            <div
              w-align = "items-center"
              w-flex = "~"
              w-space = "x-1">
              <p
                w-text = "truncate">
                {{account.name}}
              </p>
              <span
                w-border = "rounded"
                w-display = "<sm:hidden"
                w-font = "medium"
                w-m = "x-auto"
                w-p = "x-1 y-0.5"
                v-bind:w-bg = "/Netlifriend|Open Source|Public Good/.test(account.type) ? 'teal300 dark:teal200' : 'gray100 dark:gray400'"
                v-bind:w-text = "`${/Netlifriend|Open Source/.test(account.type) ? 'teal500 dark:teal500' : 'black dark:white'} sm`">
                {{account.type}}
              </span>
            </div>
            <p
              w-text = "sm dark:gray200">
              Slug: {{account.slug}}
            </p>
          </div>
        </div>
      </div>
    </template>
  </template>
</template>
<!--
  <safe
    w-bg = "gray100 teal300 dark:teal200 dark:gray400"
    w-border = "2 gray300 rounded-md teal300 focus:teal100 focus:dark:teal400 dark:gray400 dark:teal300 hover:teal100 hover:dark:teal400"
    w-text = "black sm teal500 dark:teal500 dark:white"/>
-->