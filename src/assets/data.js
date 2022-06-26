import filesize from 'file-size'
import {format, getYear, parseISO} from 'date-fns'
import {store} from '../app'
function callApi (endpoint, raw, blob) {
  store.commit('setState', {
    property: 'downloadStop',
    value: new AbortController()
  })
  return new Promise((resolve, reject) => {
    fetch(`https://api.netlify.com/api/v1/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${store.state.authToken}`,
        'content-type': raw ? 'application/vnd.bitballoon.v1.raw' : 'application/json'
      },
      signal: store.state.downloadStop.signal
    }).then(response => {
      if (response.ok) {
        if (blob) {
          return response.blob()
        } else if (raw && !blob) {
          return response.body
        } else {
          return response.json()
        }
      } else {
        throw response.status
      }
    }).then(data => {
      resolve(data)
    }).catch(error => {
      if (!(error.name === 'AbortError')) {
        store.commit('setState', {
          property: 'error',
          value: `Failed to fetch because ${error}`
        })
        reject(error)
      }
    })
  })
}
const iconDownload = 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
const iconExternalLink = 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
const iconXCircle = 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
export {callApi, filesize, format, getYear, iconDownload, iconExternalLink, iconXCircle, parseISO}