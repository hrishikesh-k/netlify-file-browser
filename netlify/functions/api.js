import cookieParser from 'cookie-parser'
import express from 'express'
import {json} from 'express'
import {Router} from 'express'
import serverless from 'serverless-http'
import {accounts} from './routes/accounts.js'
import {authenticate} from './routes/authenticate.js'
import {authorize} from './routes/authorize.js'
import {callback} from './routes/callback.js'
import {deploys} from './routes/deploys.js'
import {error404} from './routes/error-404.js'
import {files} from './routes/files.js'
import {find} from './routes/find.js'
import {logout} from './routes/logout.js'
import {sites} from './routes/sites.js'
export async function handler(event, context) {
  const api = express()
  const router = Router()
  router.get('/accounts', accounts)
  router.get('/authenticate', authenticate)
  router.get('/authorize', authorize)
  router.get('/callback', callback)
  router.get('/deploys', deploys)
  router.get('/files', files)
  router.get('/logout', logout)
  router.get('/sites', sites)
  router.post('/find', find)
  router.all('*', error404)
  api.use(cookieParser(process.env.ENCRYPTION_KEY))
  api.use(json())
  api.use((request, response, next) => {
    request.origin = new URL(request.apiGateway.event.rawUrl).origin
    if (['accounts', 'authenticate', 'deploys', 'files', 'find', 'sites'].includes(request.path.slice(5))) {
      if (request.signedCookies['nf_token']) {
        request.token = request.signedCookies['nf_token']
        next()
      } else {
        response.clearCookie('nf_token').status(403).json({
          stage: 101
        })
      }
    } else {
      next()
    }
  })
  api.use('/api/', router)
  return serverless(api)(event, context)
}