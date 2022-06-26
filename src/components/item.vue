<template>
  <div v-bind = "$attrs" :class = "'cursor-pointer even:bg-grayLightest flex px-6 py-3 w-full dark:even:bg-tealDarker' + (!$props.disabled && ' hover:bg-grayLightest dark:hover:bg-tealDarker')" :disabled = "$props.disabled ? true : null">
    <img :class = "'hidden rounded-lg s:block ' + ($props.type === 'account' ? 'h-28 w-28' : 'h-20 w-32')" :src = "$props.type === 'account' ? ($props.dataStructure.team_logo_url || '/images/account.svg') : ($props.dataStructure['screenshot_url'] || '/images/deploy.svg')" alt = "icon"/>
    <div class = "flex-1 s:ml-5">
      <div class = "flex items-center space-x-2.5">
        <p class = "font-semibold text-lg">{{/account|site/.test($props.type) ? $props.dataStructure.name : 'Deploy # ' + ($props.totalDeploys - $props.deployIndex)}}</p>
        <p v-if = "$props.disabled" class = "bg-redLightest font-semibold mr-2.5 px-1.5 py-0.5 rounded-md text-redDarkest text-sm w-max dark:bg-redDarkest dark:text-redLighter">Error</p>
      </div>
      <p v-if = "subTitle" class = "break-all text-sm">{{subTitle}}</p>
    </div>
    <p v-if = "$props.type === 'deploy'" class = "text-right ml-auto text-sm w-24">{{date.slice(0, 12)}}<br/>{{date.slice(13)}}</p>
  </div>
</template>
<script>
  import {format, parseISO} from '../assets/data'
  export default {
    computed: {
      date() {
        return format(parseISO(this.$props.dataStructure.created_at), 'MMM dd, yyyy hh:mm aa')
      },
      subTitle() {
        if (this.$props.type === 'account') {
          return this.$props.dataStructure.slug
        } else if (this.$props.type === 'site') {
          return this.$props.dataStructure.custom_domain
        } else {
          return (this.$props.dataStructure.title || 'No deploy message')
        }
      },
    },
    name: 'item',
    props: {
      dataStructure: Object,
      deployIndex: Number,
      disabled: Boolean,
      type: String,
      totalDeploys: Number
    }
  }
</script>