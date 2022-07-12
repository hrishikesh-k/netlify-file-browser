<script
  setup>
  import axios from 'axios'
  import {onMounted} from 'vue'
  import Popper from 'vue3-popper'
  import {useRoute} from 'vue-router'
  import {useRouter} from 'vue-router'
  import {watch} from 'vue'
  import NButton from '../components/N-Button.vue'
  import NIcon from '../components/N-Icon.vue'
  import NModal from '../components/N-Modal.vue'
  const npmPackages = [
    '@vitejs/plugin-vue',
    '@vue/devtools',
    '@windicss/plugin-scrollbar',
    'axios',
    'cookie-parser',
    'date-fns',
    'express',
    'fflate',
    'file-extension-icon-js',
    'file-size',
    'mongodb',
    'netlify-cli',
    'pinia',
    'qs',
    'serverless-http',
    'simple-oauth2',
    'streamsaver',
    'uuid',
    'vite',
    'vite-plugin-html',
    'vite-plugin-windicss',
    'vite-svg-loader',
    'vue',
    'vue-router',
    'vue3-popper',
    'windicss'
  ]
  const otherCredits = [{
    link: 'https://www.heroicons.com/',
    name: 'Heroicons'
  }, {
    link: 'https://www.storyset.com/',
    name: 'Storyset'
  }]
  const route = useRoute()
  const router = useRouter()
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
      icon = "M16.49,8.94L16.49,8.94c-0.01,0-0.02-0.01-0.02-0.01c-0.01-0.01-0.02-0.03-0.01-0.05l0.4-2.47l1.89,1.89 l-1.97,0.84c-0.01,0-0.01,0-0.02,0h-0.01c0,0-0.01,0-0.01-0.01C16.68,9.06,16.59,8.99,16.49,8.94z M19.24,8.79l2.02,2.02 c0.42,0.42,0.63,0.63,0.71,0.87c0.01,0.04,0.02,0.07,0.03,0.11l-4.84-2.05c0,0-0.01,0-0.01,0c-0.02-0.01-0.04-0.02-0.04-0.04 s0.02-0.03,0.04-0.04l0.01,0L19.24,8.79z M21.92,12.44c-0.1,0.2-0.31,0.4-0.65,0.74l-2.28,2.28l-2.95-0.61l-0.02,0 c-0.03,0-0.05-0.01-0.05-0.03c-0.02-0.25-0.15-0.47-0.34-0.62c-0.01-0.01-0.01-0.03-0.01-0.05c0,0,0-0.01,0-0.01l0.56-3.4l0-0.01 c0-0.03,0.01-0.06,0.03-0.06c0.24-0.03,0.46-0.15,0.61-0.35c0-0.01,0.01-0.01,0.01-0.01c0.02-0.01,0.04,0,0.05,0.01L21.92,12.44 L21.92,12.44z M18.46,15.99l-3.75,3.75l0.64-3.94l0-0.01c0-0.01,0-0.01,0-0.02c0.01-0.01,0.02-0.02,0.03-0.02l0.01,0 c0.14-0.06,0.27-0.15,0.36-0.27c0.01-0.01,0.03-0.03,0.05-0.03c0.01,0,0.01,0,0.02,0L18.46,15.99L18.46,15.99z M13.91,20.53 l-0.42,0.42L8.81,14.2c0,0,0,0-0.01-0.01c-0.01-0.01-0.02-0.02-0.01-0.03c0-0.01,0.01-0.02,0.01-0.02l0.01-0.01 c0.01-0.02,0.03-0.04,0.04-0.06l0.01-0.02l0,0c0.01-0.01,0.01-0.02,0.03-0.03c0.01-0.01,0.03,0,0.04,0l5.18,1.07 c0.01,0,0.03,0.01,0.04,0.02c0.01,0.01,0.01,0.01,0.01,0.02c0.07,0.28,0.27,0.5,0.54,0.61c0.01,0.01,0.01,0.02,0,0.04 c0,0.01-0.01,0.02-0.01,0.02C14.62,16.2,14.06,19.61,13.91,20.53z M13.03,21.41c-0.31,0.31-0.5,0.47-0.7,0.54 c-0.2,0.06-0.42,0.06-0.63,0c-0.24-0.08-0.45-0.29-0.87-0.71l-4.7-4.69l1.23-1.9c0.01-0.01,0.01-0.02,0.02-0.02 c0.01-0.01,0.03-0.01,0.05,0C7.7,14.71,8,14.7,8.28,14.59c0.01-0.01,0.03-0.01,0.04,0c0.01,0,0.01,0.01,0.01,0.02L13.03,21.41 L13.03,21.41z M5.67,16.1l-1.08-1.08l2.13-0.91c0.01,0,0.01,0,0.02,0c0.02,0,0.03,0.02,0.04,0.03c0.02,0.03,0.04,0.06,0.07,0.1 l0.01,0.01c0.01,0.01,0,0.02,0,0.03L5.67,16.1L5.67,16.1z M4.12,14.55l-1.36-1.36c-0.23-0.23-0.4-0.4-0.52-0.54l4.14,0.86 c0.01,0,0.01,0,0.02,0c0.03,0,0.05,0.01,0.05,0.03c0,0.03-0.03,0.04-0.06,0.05l-0.01,0.01L4.12,14.55z M2,11.94 c0-0.09,0.02-0.17,0.05-0.26c0.08-0.24,0.29-0.45,0.71-0.87L4.5,9.07c0.8,1.16,1.61,2.33,2.42,3.49c0.01,0.02,0.03,0.04,0.01,0.06 c-0.08,0.08-0.15,0.18-0.21,0.28c-0.01,0.01-0.01,0.02-0.03,0.03c-0.01,0-0.01,0-0.02,0h0L2,11.94L2,11.94z M4.97,8.6l2.34-2.34 C7.53,6.36,8.33,6.7,9.05,7c0.54,0.23,1.04,0.44,1.19,0.51c0.02,0.01,0.03,0.01,0.04,0.03c0,0.01,0,0.02,0,0.03 c-0.08,0.34,0.03,0.7,0.27,0.95c0.02,0.02,0,0.04-0.01,0.06l-0.01,0.01l-2.38,3.68c-0.01,0.01-0.01,0.02-0.02,0.03 c-0.01,0.01-0.03,0-0.04,0c-0.09-0.02-0.19-0.04-0.28-0.04c-0.09,0-0.18,0.02-0.27,0.03h0c-0.01,0-0.02,0-0.03,0 c-0.01-0.01-0.02-0.02-0.02-0.03L4.97,8.6L4.97,8.6z M7.78,5.79l3.04-3.03c0.42-0.42,0.63-0.63,0.87-0.71c0.2-0.06,0.42-0.06,0.63,0 c0.24,0.08,0.45,0.29,0.87,0.71l0.66,0.66L11.7,6.75c-0.01,0.01-0.01,0.02-0.02,0.03c-0.01,0.01-0.03,0.01-0.05,0 c-0.35-0.1-0.72-0.03-1,0.19c-0.01,0.01-0.03,0.01-0.05,0C10.29,6.85,8.1,5.92,7.78,5.79z M14.32,3.87l1.99,1.99l-0.48,2.97v0.01 c0,0.01,0,0.01,0,0.02c-0.01,0.01-0.02,0.01-0.03,0.02c-0.1,0.03-0.2,0.08-0.29,0.14c0,0-0.01,0.01-0.01,0.01 c-0.01,0.01-0.01,0.01-0.02,0.01c-0.01,0-0.02,0-0.02,0l-3.04-1.29l-0.01,0c-0.02-0.01-0.04-0.02-0.04-0.04 c-0.02-0.17-0.07-0.33-0.16-0.48c-0.01-0.02-0.03-0.05-0.02-0.07L14.32,3.87z M12.26,8.36l2.85,1.2c0.02,0.01,0.03,0.01,0.04,0.03 c0,0.01,0,0.02,0,0.03c-0.01,0.04-0.02,0.09-0.02,0.14v0.08c0,0.02-0.02,0.03-0.04,0.04l-0.01,0c-0.45,0.19-6.33,2.7-6.34,2.7 c-0.01,0-0.02,0-0.03-0.01c-0.02-0.02,0-0.04,0.01-0.06c0,0,0-0.01,0.01-0.01l2.34-3.62l0-0.01c0.01-0.02,0.03-0.05,0.05-0.05 l0.02,0c0.05,0.01,0.1,0.01,0.15,0.01c0.36,0,0.68-0.17,0.88-0.47c0-0.01,0.01-0.01,0.02-0.02C12.22,8.35,12.25,8.35,12.26,8.36z  M9,13.15l6.41-2.73c0,0,0.01,0,0.02,0.01c0.03,0.03,0.06,0.06,0.09,0.08l0.01,0.01c0.01,0.01,0.03,0.02,0.03,0.03 c0,0.01,0,0.01,0,0.01l-0.55,3.37l0,0.01c0,0.03-0.01,0.06-0.03,0.06c-0.3,0.02-0.57,0.19-0.72,0.44l0,0 c-0.01,0.01-0.01,0.02-0.03,0.03c-0.01,0.01-0.03,0-0.04,0l-5.11-1.05C9.08,13.42,9.01,13.15,9,13.15z"
      text = "Netlify File Browser"
      variant = "outline"
      v-bind:fill = "true"
      v-on:click = "router.push('/')"/>
    <div
      w-flex = "~"
      w-space = "x-1">
      <div
        w-h = "9"
        w-w = "9">
        <Popper
          content = "Logout"
          placement = "bottom-start"
          v-bind:arrow = "true"
          v-bind:hover = "true">
          <NButton
            icon = "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            variant = "danger"
            v-if = "route.name !== 'Index'"
            v-on:click = "logout"/>
        </Popper>
      </div>
      <div
        w-h = "9"
        w-w = "9">
        <Popper
          content = "Toggle theme"
          placement = "bottom-end"
          v-bind:arrow = "true"
          v-bind:hover = "true">
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
      Netlify File Browser v2.0.0
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