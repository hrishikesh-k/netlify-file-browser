<template>
  <div class = "flex w-full">
    <p class = "flex-1 truncate">{{$props.name}}</p>
    <a :href = "$props.license[1]" class = "flex-1 text-center" rel = "nofollow noopener noreferrer" target = "_blank">
      <span>{{$props.license[0]}}</span>
      <icon v-if = "$props.license[1]" :path = "$options.static.iconExternalLink" class = "align-top" size = "4"/>
    </a>
    <a :href = "$props.homepage[1]" class = "flex-1 text-right" rel = "nofollow noopener noreferrer" target = "_blank">
      <span>{{$props.homepage[0]}}</span>
      <icon v-if = "$props.homepage[1]" :path = "$options.static.iconExternalLink" class = "align-top" size = "4"/>
    </a>
  </div>
</template>
<script>
  import icon from './icon.vue'
  import {iconExternalLink} from '../assets/data'
  export default {
    components: {
      icon
    },
    name: 'credit',
    props: {
      homepage: Array,
      license: Array,
      name: String
    },
    static: {
      iconExternalLink: iconExternalLink
    }
  }
</script>