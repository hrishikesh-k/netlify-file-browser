import {stringify} from 'qs'
export function authorize(request, response) {
  const query = request.apiGateway.event.queryStringParameters
  response.redirect(`https://app.netlify.com/authorize?${stringify({
    client_id: process.env.CLIENT_ID,
    redirect_uri: `${request.origin}/api/callback`,
    response_type: 'code',
    state: stringify({
      csrf: query.csrf,
      path: query.path
    })
  })}`)
}