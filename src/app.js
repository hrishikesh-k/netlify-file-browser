import axios from 'axios'
import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {createRouter} from 'vue-router'
import {createWebHistory} from 'vue-router'
import {useStore} from './store'
import N404 from './pages/N-404.vue'
import NAccounts from './pages/N-Accounts.vue'
import NDeploys from './pages/N-Deploys.vue'
import NFiles from './pages/N-Files.vue'
import NIndex from './pages/N-Index.vue'
import NSites from './pages/N-Sites.vue'
import NPage from './layouts/N-Page.vue'
import 'virtual:windi.css'
const app = createApp(NPage)
app.use(createPinia())
const router = createRouter({
  history: createWebHistory(),
  routes: [{
    component: NIndex,
    name: 'Index',
    path: '/'
  }, {
    component: NAccounts,
    name: 'Accounts',
    path: '/accounts'
  }, {
    path: '/accounts/:account',
    redirect: to => {
      return {
        name: 'Sites',
        params: to.params
      }
    }
  }, {
    component: NSites,
    name: 'Sites',
    path: '/accounts/:account/sites'
  }, {
    path: '/accounts/:account/sites/:site',
    redirect: to => {
      return {
        name: 'Deploys',
        params: to.params
      }
    },
  }, {
    component: NDeploys,
    name: 'Deploys',
    path: '/accounts/:account/sites/:site/deploys'
  }, {
    path: '/accounts/:account/sites/:site/deploys/:deploy',
    redirect: to => {
      return {
        name: 'Files',
        params: to.params
      }
    }
  }, {
    component: NFiles,
    name: 'Files',
    path: '/accounts/:account/sites/:site/deploys/:deploy/files'
  }, {
    component: N404,
    name: '404',
    path: '/:path(.*)*'
  }]
})
const store = useStore()
router.beforeEach(to => {
  if (to.query.csrf) {
    if (to.query.csrf !== localStorage.getItem('csrf')) {
      localStorage.removeItem('csrf')
      return axios({
        url: '/api/logout'
      }).then(() => {
        return {
          name: 'Index'
        }
      })
    } else {
      localStorage.removeItem('csrf')
      return {
        name: to.name
      }
    }
  }
  if (store.error) {
    store.error = null
  }
})
app.use(router)
app.mount('div')