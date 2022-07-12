import axios from 'axios'
export function error404(request, response) {
  axios({
    responseText: 'text',
    url: request.origin
  }).then(htmlPage => {
    response.status(404).send(htmlPage.data)
  })
}