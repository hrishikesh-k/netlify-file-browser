import axios from 'axios'
import {ObjectId} from 'mongodb'
import {validate} from 'uuid'
export function find(request, response) {
  const search = request.body.search
  const searchString = request.body.string
  if (/accounts|deploys|sites/.test(search)) {
    if (ObjectId.isValid(searchString) || validate(searchString)) {
      axios({
        headers: {
          authorization: `Bearer ${request.token}`
        },
        url: `https://api.netlify.com/api/v1/${search}/${searchString}`
      }).then(findResponse => {
        if (search === 'deploys') {
          if (findResponse.data.state !== 'ready') {
            response.status(400).json({
              message: 'Deploy is not ready',
              stage: 105
            })
          } else {
            response.sendStatus(204)
          }
        } else {
          response.status(200).json({
            id: findResponse.data.id
          })
        }
      }).catch(error => {
        response.status(error.response.status).json({
          message: error.response.statusText,
          stage: 104
        })
      })
    } else {
      response.status(400).json({
        message: 'Invalid search string',
        stage: 103
      })
    }
  } else {
    response.status(400).json({
      message: 'Invalid search type',
      stage: 102
    })
  }
}