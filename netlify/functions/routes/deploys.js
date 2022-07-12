import axios from 'axios'
import {validate} from 'uuid'
export function deploys(request, response) {
  const siteId = request.query.site
  if (validate(siteId)) {
    axios({
      headers: {
        authorization: `Bearer ${request.token}`
      },
      url: `https://api.netlify.com/api/v1/sites/${siteId}/deploys`
    }).then(deploysResponse => {
      response.status(200).json(deploysResponse.data.filter(deploy => {
        return deploy.state === 'ready'
      }).slice(0, 10).map(selectedDeploy => {
        return {
          branch: selectedDeploy.branch,
          icon: selectedDeploy.screenshot_url,
          id: selectedDeploy.id,
          name: selectedDeploy.title,
          time: selectedDeploy.created_at
        }
      }))
    }).catch(error => {
      response.status(error.response.status).json({
        message: error.response.statusText,
        stage: 103
      })
    })
  } else {
    response.status(400).json({
      message: 'Invalid site identifier format',
      stage: 102
    })
  }
}