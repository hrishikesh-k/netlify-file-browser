<script
  setup>
  import axios from 'axios'
  import {onMounted} from 'vue'
  import Popper from 'vue3-popper'
  import {useRoute} from 'vue-router'
  import {useRouter} from 'vue-router'
  import {useStore} from '../store'
  import {watch} from 'vue'
  import NButton from '../components/N-Button.vue'
  import NIcon from '../components/N-Icon.vue'
  import NModal from '../components/N-Modal.vue'
  const npmPackages = ['@vitejs/plugin-vue', '@vue/devtools', '@windicss/plugin-scrollbar', 'axios', 'cookie-parser', 'date-fns', 'express', 'fflate', 'file-extension-icon-js', 'file-size', 'mongodb', 'netlify-cli', 'pinia', 'qs', 'serverless-http', 'streamsaver', 'uuid', 'vite', 'vite-plugin-html', 'vite-plugin-windicss', 'vite-svg-loader', 'vue', 'vue-router', 'vue3-popper', 'windicss']
  const otherCredits = [{
    link: 'https://www.heroicons.com/',
    name: 'Heroicons'
  }, {
    link: 'https://www.storyset.com/',
    name: 'Storyset'
  }]
  const route = useRoute()
  const router = useRouter()
  const store = useStore()
  let aboutModal = $ref(false)
  let theme = $ref('light')
  function checkTheme() {
    const selectedTheme = localStorage.getItem('theme')
    if (selectedTheme) {
      theme = selectedTheme
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = 'dark'
      } else {
        theme = 'light'
      }
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkTheme)
    }
  }
  function logout() {
    axios({
      url: '/api/logout'
    }).then(() => {
      router.push('/')
    })
  }
  function toggleTheme() {
    if (theme.value === 'dark') {
      theme.value = 'light'
    } else {
      theme.value = 'dark'
    }
    localStorage.setItem('theme', theme)
    window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', checkTheme)
  }
  watch(() => {
    return theme
  }, () => {
    document.querySelector('html').className = theme
  })
  onMounted(() => {
    checkTheme()
  })
</script>
<template>
  <header
    w-align = "items-center"
    w-flex = "~"
    w-justify = "between">
    <NButton
      fill
      text = "Netlify File Browser"
      variant = "outline"
      v-bind:icon = "store.netlifyIcon"
      v-on:click = "router.push('/')"/>
    <div
      w-flex = "~"
      w-space = "x-1">
      <div
        w-h = "9"
        w-w = "9">
        <Popper
          arrow
          hover
          placement = "bottom-start"
          v-bind:content = "store.user ? 'Logout' : 'Login'">
          <NButton
            icon = "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            v-if = "route.name !== 'Index'"
            v-bind:variant = "store.user ? 'danger' : 'primary'"
            v-on:click = "store.user ? logout() : store.authorize(route.path)"/>
        </Popper>
      </div>
      <div
        w-h = "9"
        w-w = "9">
        <Popper
          arrow
          hover
          content = "Toggle theme"
          placement = "bottom-end">
          <NButton
            v-bind:icon = "theme === 'light' ? 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' : 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'"
            v-on:click = "toggleTheme"/>
        </Popper>
      </div>
    </div>
  </header>
  <main
    w-bg = "white dark:black"
    w-border = "~ gray300 rounded-lg dark:gray700"
    w-m = "t-6"
    w-p = "6"
    w-space = "y-3"
    w-w = "full">
    <RouterView/>
  </main>
  <footer
    w-align = "items-center"
    w-flex = "~"
    w-justify = "between"
    w-m = "t-6"
    w-w = "full">
    <NButton
      text = "About"
      variant = "transparent"
      v-on:click = "aboutModal = true"/>
  </footer>
  <NModal
    title = "About"
    v-bind:open = "aboutModal"
    v-on:close = "aboutModal = false">
    <p
      w-w = "full">
      Netlify File Browser v2.0.2
      <br/>
      <a
        href = "https://www.github.com/Hrishikesh-K/netlify-file-browser/tree/v2"
        rel = "nofollow noopener noreferrer"
        target = "_blank">
        <span
          w-display = "inline-block"
          w-text = "underline">
          Source code on GitHub
        </span>
        <span
          w-display = "inline-block">
          <NIcon
            path = "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
        </span>
      </a>
    </p>
    <hr
      w-border = "gray300 top-1 dark:gray400"
      w-w = "1/2"/>
    <p
      w-w = "full">
      NPM Packages:
    </p>
    <div
      w-w = "full">
      <div
        w-align = "items-center"
        w-flex = "~"
        w-space = "x-1"
        v-for = "npm in npmPackages">
        <p
          w-flex = "1"
          w-text = "truncate">
          {{npm}}
        </p>
        <p
          w-w = "fit">
          <a
            rel = "nofollow noopener noreferrer"
            target = "_blank"
            v-bind:href = "`https://www.npmjs.com/package/${npm}`">
            <span
              w-display = "inline-block"
              w-text = "underline">
              NPM
            </span>
              <span
                w-display = "inline-block">
              <NIcon
                path = "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </span>
          </a>
        </p>
      </div>
    </div>
    <hr
      w-border = "gray300 top-1 dark:gray400"
      w-w = "1/2"/>
    <p
      w-w = "full">
      Other credits:
    </p>
    <div
      w-w = "full">
      <div
        w-align = "items-center"
        w-flex = "~"
        w-space = "x-1"
        v-for = "credit in otherCredits">
        <p
          w-flex = "1"
          w-text = "truncate">
          {{credit.name}}
        </p>
        <p
          w-w = "fit">
          <a
            rel = "nofollow noopener noreferrer"
            target = "_blank"
            v-bind:href = "credit.link">
            <span
              w-display = "inline-block"
              w-text = "underline">
              Website
            </span>
            <span
              w-display = "inline-block">
              <NIcon
                path = "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </span>
          </a>
        </p>
      </div>
    </div>
  </NModal>
</template>