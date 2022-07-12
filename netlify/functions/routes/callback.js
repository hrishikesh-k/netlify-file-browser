import {parse} from 'qs'
import {auth} from '../data/constants.js'
export function callback(request, response) {
  const query = request.apiGateway.event.queryStringParameters
  const state = parse(query.state)
  auth.getToken({
    code: query.code,
    redirect_uri: `${request.origin}/api/callback`
  }).then(tokenObject => {
    response.cookie('nf_token', tokenObject.token.access_token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
      path: '/api/',
      sameSite: 'strict',
      secure: true,
      signed: true
    }).redirect(`${request.origin}${state.path}?csrf=${state.csrf}`)
  })
}