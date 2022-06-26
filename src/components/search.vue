<template>
  <form @submit.prevent = "$emit('update:value', searchString)" class = "mt-5 mx-6 relative s:w-1/2">
    <input v-model = "searchString" :placeholder = "'Search ' + $props.placeholder" class = "appearance-none bg-white border-2 border-grayLighter font-medium focus:border-tealLighter outline-none pl-10 pr-6 py-1.5 rounded-md w-full dark:bg-black dark:border-grayDarkest dark:focus:border-tealLightest" type = "search"/>
    <icon :path = "$options.static.iconSearch" class = "absolute inset-2.5 text-gra¸yLighter dark:text-grayDarkest" size = "5"/>
    <icon v-if = "!(searchString === '')" :path = "$options.static.iconXCircle" @click = "clearSearch" class = "absolute cursor-pointer inset-y-2.5 right-2.5" size = "5"/>
  </form>
</template>
<script>
  import icon from './icon.vue'
  import {iconXCircle} from '../assets/data'
  export default {
    components: {
      icon
    },
    data() {
      return {
        searchString: this.$props.value
      }
    },
    emits: ['update:value'],
    methods: {
      clearSearch() {
        this.searchString = ''
        this.$emit('update:value', this.searchString)
      }
    },
    name: 'search',
    props: {
      placeholder: String,
      value: String
    },
    static: {
      iconSearch: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      iconXCircle: iconXCircle
    }
  }
</script>