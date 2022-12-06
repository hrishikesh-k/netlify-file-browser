import axios from 'axios'
import {parse} from 'qs'
export function callback(request, response) {
  const query = request.apiGateway.event.queryStringParameters
  const state = parse(query.state)
  axios({
    data: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: request.query.code,
      grant_type: 'authorization_code',
      redirect_uri: `${request.origin}/api/callback`
    },
    method: 'post',
    url: 'https://api.netlify.com/oauth/token'
  }).then(tokenResponse => {
    response.cookie('nf_token', tokenResponse.data.access_token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
      path: '/api/',
      sameSite: 'strict',
      secure: true,
      signed: true
    }).redirect(`${request.origin}${state.path}?csrf=${state.csrf}`)
  })
}