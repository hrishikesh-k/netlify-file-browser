<script
  setup>
  import {useRoute} from 'vue-router'
  import {useRouter} from 'vue-router'
  import {useStore} from '../store'
  import N400 from '../assets/400.svg'
  import N401 from '../assets/401.svg'
  import N403 from '../assets/403.svg'
  import N404 from '../assets/404.svg'
  import N429 from '../assets/429.svg'
  import N500 from '../assets/500.svg'
  import N504 from '../assets/504.svg'
  import N1000 from '../assets/1000.svg'
  import NButton from './N-Button.vue'
  const route = useRoute()
  const router = useRouter()
  const store = useStore()
</script>
<template>
  <p
    w-bg = "red100 dark:red500"
    w-border = "rounded-md"
    w-font = "medium"
    w-m = "x-auto"
    w-max-w = "full"
    w-p = "2"
    w-text = "center red500 lg dark:red100"
    w-w = "120">
    ERROR {{store.error}}
  </p>
  <N400
    w-m = "x-auto"
    w-max-w = "120"
    v-if = "store.error === 400"/>
  <N401
    w-m = "x-auto"
    w-max-w = "120"
    v-else-if = "store.error === 401"/>
  <N403
    w-m = "x-auto"
    w-max-w = "120"
    v-else-if = "store.error === 403"/>
  <N404
    w-m = "x-auto"
    w-max-w = "120"
    v-else-if = "store.error === 404"/>
  <N429
    w-m = "x-auto"
    w-max-w = "120"
    v-else-if = "store.error === 429"/>
  <N500
    w-m = "x-auto"
    w-max-w = "120"
    v-else-if = "store.error === 500"/>
  <N504
    w-m = "x-auto"
    w-max-w = "120"
    v-else-if = "store.error === 504"/>
  <N1000
    w-m = "x-auto"
    w-max-w = "120"
    v-else/>
  <div
    w-divide = "<xs:y xs:x"
    w-flex = "~ wrap">
    <div
      w-flex = "xs:1"
      w-p = "<xs:b-3 xs:r-3"
      w-space = "y-3"
      w-w = "<xs:full">
      <p
        w-font = "medium"
        w-text = "center underline">
        What could have gone wrong?
      </p>
      <ul
        w-list = "disc"
        v-if = "store.error === 400">
        <li>
          The request that you sent had invalid parameters.
        </li>
        <li>
          The application might be mis-configured to process the request.
        </li>
      </ul>
      <ul
        w-list = "disc"
        v-else-if = "store.error === 401">
        <li>
          The access token required to authorize you might be missing from the request.
        </li>
        <li>
          Your access token might not have the required permissions.
        </li>
      </ul>
      <ul
        w-list = "disc"
        v-else-if = "store.error === 403">
        <li>
          The access token stored in the cookie could have been tampered with.
        </li>
        <li>
          The server's encryption secret could have changed.
        </li>
        <li>
          The server blocked your access token from accessing the content.
        </li>
      </ul>
      <ul
        w-list = "disc"
        v-else-if = "store.error === 404">
        <li>
          The URL that you entered or the one that brought you here might be incorrect.
        </li>
        <li>
          The resource you were expecting to see, might have moved to a different URL.
        </li>
        <li>
          You might not have permissions to access the requested resource.
        </li>
      </ul>
      <ul
        w-list = "disc"
        v-else-if = "store.error === 429">
        <li>
          Your token has made too many requests to the server.
        </li>
        <li>
          You might using some kind of a proxy in front of Netlify.
        </li>
      </ul>
      <ul
        w-list = "disc"
        v-else-if = "store.error === 500">
        <li>
          The server had a fatal error while processing your request.
        </li>
        <li>
          The request could have crossed the limits tha the server could handle.
        </li>
      </ul>
      <ul
        w-list = "disc"
        v-else-if = "store.error === 504">
        <li>
          There are too many files in your deploy.
        </li>
        <li>
          The server is taking too long to process the request and the connection will most likely be terminated.
        </li>
      </ul>
      <ul
        w-list = "disc"
        v-else>
        <li>
          There was an unknown error in handling the request.
        </li>
      </ul>
    </div>
    <div
      w-flex = "xs:1"
      w-p = "<xs:t-3 xs:l-3"
      w-space = "y-3"
      w-w = "<xs:full">
      <p
        w-font = "medium"
        w-text = "center underline">
        What can you do?
      </p>
      <NButton
        text = "Retry"
        variant = "transparent"
        v-on:click = "router.go"/>
      <NButton
        text = "Re-login"
        variant = "transparent"
        v-on:click = "store.authorize(route.path)"/>
      <NButton
        text = "Return home"
        variant = "transparent"
        v-on:click = "router.push('/')"/>
    </div>
  </div>
</template>