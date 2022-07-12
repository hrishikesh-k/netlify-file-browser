import axios from 'axios'
export function authenticate(request, response) {
  axios({
    headers: {
      authorization: `Bearer ${request.token}`
    },
    method: 'head',
    url: 'https://api.netlify.com/api/v1/user'
  }).then(() => {
    response.sendStatus(204)
  }).catch(error => {
    response.status(error.response.status).json({
      stage: 102
    })
  })
}