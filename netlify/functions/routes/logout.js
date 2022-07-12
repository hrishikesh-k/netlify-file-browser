export function logout(request, response) {
  response.clearCookie('nf_token', {
    path: '/api/'
  }).sendStatus(204)
}