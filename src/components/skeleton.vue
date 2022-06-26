<template>
  <div v-if = "$props.index === 1" class = "animate-pulse bg-grayLighter h-10 mb-5 mt-5 mx-6 rounded-md dark:bg-tealDarker s:w-1/2"></div>
  <div class = "flex px-6 py-3 w-full">
    <div :class = "'animate-pulse bg-grayLighter hidden rounded-lg dark:bg-tealDarker s:block ' + ($props.type === 'account' ? 'h-28 w-28' : 'h-20 w-32')"></div>
    <div class = "s:ml-5 flex-1">
      <div class = "flex items-center space-x-2.5 w-3/4 s:w-1/2">
        <div class = "animate-pulse bg-grayLighter flex-1 h-5 rounded dark:bg-tealDarker"></div>
        <div v-if = "$props.type === 'account'" class = "animate-pulse bg-grayLighter rounded h-6 w-20 dark:bg-tealDarker"></div>
      </div>
      <div class = "animate-pulse bg-grayLighter rounded h-3.5 mt-5 w-1/4 dark:bg-tealDarker"></div>
    </div>
    <div v-if = "$props.type === 'deploy'" class = "animate-pulse bg-grayLighter h-10 ml-auto rounded-md w-32 dark:bg-tealDarker"></div>
  </div>
  <div v-if = "$props.index === $props.max" class = "flex h-12 justify-center mt-5 mx-6 space-x-2.5">
    <div class = "animate-pulse bg-grayLighter h-full rounded-md w-12 dark:bg-tealDarker"></div>
    <div class = "animate-pulse bg-grayLighter h-full rounded-md w-24 dark:bg-tealDarker"></div>
    <div class = "animate-pulse bg-grayLighter h-full rounded-md w-12 dark:bg-tealDarker"></div>
  </div>
</template>
<script>
  export default {
    name: 'skeleton',
    props: {
      index: Number,
      max: Number,
      type: String
    }
  }
</script>