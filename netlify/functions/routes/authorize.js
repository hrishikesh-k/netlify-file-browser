import {stringify} from 'qs'
import {auth} from '../data/constants.js'
export function authorize(request, response) {
  const query = request.apiGateway.event.queryStringParameters
  response.redirect(auth.authorizeURL({
    redirect_uri: `${request.origin}/api/callback`,
    state: stringify({
      csrf: query.csrf,
      path: query.path
    })
  }))
}