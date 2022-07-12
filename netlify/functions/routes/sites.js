import axios from 'axios'
import {ObjectId} from 'mongodb'
export function sites(request, response) {
  const accountId = request.query.account
  if (ObjectId.isValid(accountId)) {
    axios({
      headers: {
        authorization: `Bearer ${request.token}`
      },
      url: `https://api.netlify.com/api/v1/${accountId}/sites?per_page=10`
    }).then(sitesResponse => {
      response.status(200).json(sitesResponse.data.map(site => {
        return {
          domain: site.custom_domain,
          icon: site.screenshot_url,
          id: site.id,
          name: site.name
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
      message: 'Invalid account identifier format',
      stage: 102
    })
  }
}