<script
  setup>
  import {onMounted} from 'vue'
  import {useStore} from '../store'
  import NError from '../components/N-Error.vue'
  const store = useStore()
  onMounted(() => {
    document.title = 'Page not found :: Netlify File Browser'
    store.error = 404
  })
</script>
<template>
  <NError/>
</template>