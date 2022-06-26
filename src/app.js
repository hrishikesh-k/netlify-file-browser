import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import {createStore} from 'vuex'
import index from './index.vue'
import './assets/styles.css'
const app = createApp(index)
const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/',
    component: index,
  }]
})
const store = createStore({
  state () {
    return {
      authToken: null,
      chosenDeploy: null,
      chosenSite: null,
      downloadStop: new AbortController(),
      error: null
    }
  },
  mutations: {
    setState(state, {
      property,
      value
    }) {
      if (Array.isArray(property)) {
        property.forEach((key, index) => {
          state[key] = value[index]
        })
      } else {
        state[property] = value
      }
    }
  }
})
app.use(router)
app.use(store)
app.mount('#app')
export {store}