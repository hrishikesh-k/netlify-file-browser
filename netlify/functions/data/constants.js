import {AuthorizationCode} from 'simple-oauth2'
export const auth = new AuthorizationCode({
  auth: {
    authorizePath: 'https://app.netlify.com/authorize',
    tokenHost: 'https://api.netlify.com'
  },
  client: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET
  }
})