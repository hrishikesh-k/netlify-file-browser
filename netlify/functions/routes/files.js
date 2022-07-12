import axios from 'axios'
import {ObjectId} from 'mongodb'
export function files(request, response) {
  const deployId = request.query.deploy
  if (ObjectId.isValid(deployId)) {
    axios({
      headers: {
        authorization: `Bearer ${request.token}`
      },
      timeout: 24000,
      url: `https://api.netlify.com/api/v1/deploys/${deployId}/files`
    }).then(filesResponse => {
      let size = 0
      response.status(200).json({
        files: filesResponse.data.map(file => {
          size += file.size
          return {
            id: file.id,
            size: file.size
          }
        }),
        size,
        token: request.token
      })
    }).catch(error => {
      if (error.code === 'ECONNABORTED') {
        response.status(504).json({
          message: 'Netlify API timed-out, probably because too many files.',
          stage: 103
        })
      } else {
        response.status(error.response.status).json({
          message: error.response.statusText,
          stage: 103
        })
      }
    })
  } else {
    response.status(400).json({
      message: 'Invalid deploy identifier format',
      stage: 102
    })
  }
}