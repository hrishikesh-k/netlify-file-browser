import {defineStore} from 'pinia'
import {stringify} from 'qs'
export const useStore = defineStore('main', {
  actions: {
    randomColour: () => {
      let hexCode = '#'
      for (let i = 0; i < 6; i++) {
        hexCode += Math.floor(Math.random() * 10)
      }
      return hexCode
    }
  },
  state: () => ({
    accountChosen: null,
    accountId: null,
    accounts: null,
    authorize: path => {
      const csrf = Math.random().toString().slice(2, 7)
      localStorage.setItem('csrf', csrf)
      location.href = `/api/authorize?${stringify({
        csrf,
        path
      })}`
    },
    deployChosen: null,
    deployId: null,
    deploys: null,
    error: null,
    files: null,
    fileTree: null,
    netlifyIcon: 'M13.73,.53l9.74,9.74,.36,.36,.17,.4v1.94l-.17,.4-.36,.36-9.74,9.74-.36,.36-.4,.17h-1.94l-.4-.17-.36-.36L.53,13.73l-.36-.36-.17-.4v-1.94l.17-.4,.36-.36L10.27,.53l.36-.36,.4-.17h1.94l.4,.17,.36,.36Zm-2.6,16.55v4.68l.12,.12h1.49l.12-.12v-4.68l-.12-.12h-1.49l-.12,.12Zm0-10.15V2.25l.12-.12h1.49l.12,.12V6.93l-.12,.12h-1.49l-.12-.12Zm-4.14,11.36h.21l1.36-1.36v-1.08l-.15-.14h-1.08s-1.36,1.36-1.36,1.36v.21l1.02,1.02Zm-1.02-11.29v-.2l1.02-1.02h.2l1.36,1.36v1.08l-.14,.15h-1.08l-1.36-1.36Zm1.14,4.13H1.85l-.12,.12v1.49l.12,.12H7.11l.12-.12v-1.49l-.12-.12Zm7.68,3.97h-1.49l-.12-.12v-3.48c0-.62-.24-1.1-.99-1.12-.38-.01-.83,0-1.3,.02l-.07,.07v4.51s-.12,.12-.12,.12h-1.49l-.12-.12v-5.95l.12-.12h3.35c1.3,0,2.36,1.05,2.36,2.36v3.72l-.12,.12Zm2.1-2.23h5.26l.12-.12v-1.49l-.12-.12h-5.26l-.12,.12v1.49l.12,.12Z',
    siteChosen: null,
    siteId: null,
    sites: null,
    token: null,
    user: false
  })
})