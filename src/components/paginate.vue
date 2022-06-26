<template>
  <div class = "flex h-12 justify-center mt-5 mx-6 space-x-2.5">
    <button :class = "[$options.static.buttonClass, !(page === 0) && 'hover:bg-tealLightest dark:hover:bg-grayDarkest']" :disabled = "page === 0" @click = "page--">
      <icon :path = "$options.static.iconChevronLeft" class = "text-black dark:text-white" size = "5"/>
    </button>
    <form @submit.prevent = "page = $refs.pageInput.value - 1" class = "border-2 border-grayLighter flex focus:border-tealLightest font-medium hover:border-tealLighter items-center px-2.5 rounded-md dark:border-grayDarkest dark:hover:border-tealLightest">
      <input :max = "$props.max" :value = "page + 1" class = "appearance-none bg-white font-medium focus:border-tealLighter outline-none px-1.5 rounded-md text-center w-10 dark:bg-black" min = "1" ref = "pageInput" type = "number"/>
      <span class = "text-grayDarker">of {{$props.max}}</span>
    </form>
    <button :class = "[$options.static.buttonClass, !(page + 1 === $props.max) && 'hover:bg-tealLightest dark:hover:bg-grayDarkest']" :disabled = "page + 1 === max" @click = "page++">
      <icon :path = "$options.static.iconChevronRight" class = "text-black dark:text-white" size = "5"/>
    </button>
  </div>
</template>
<script>
  import icon from './icon.vue'
  export default {
    components: {
      icon
    },
    data() {
      return {
        page: this.$props.value
      }
    },
    emits: ['update:value'],
    name: 'paginate',
    props: {
      max: Number,
      value: Number
    },
    static: {
      buttonClass: 'bg-grayLighter flex h-full items-center justify-center rounded-md text-white w-12 dark:bg-grayDarker',
      iconChevronLeft: 'M15 19l-7-7 7-7',
      iconChevronRight: 'M9 5l7 7-7 7'
    },
    watch: {
      page: function(value) {
        this.$emit('update:value', value)
      },
      '$props.value': function(value) {
        this.page = value
      }
    }
  }
</script>