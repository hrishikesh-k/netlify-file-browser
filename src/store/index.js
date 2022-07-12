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
    siteChosen: null,
    siteId: null,
    sites: null,
    token: null
  })
})