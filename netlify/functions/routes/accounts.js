import axios from 'axios'
export function accounts(request, response) {
  axios({
    headers: {
      authorization: `Bearer ${request.token}`
    },
    url: 'https://api.netlify.com/api/v1/accounts?per_page=10'
  }).then(accountResponse => {
    response.status(200).json(accountResponse.data.map(account => {
      return {
        icon: account.team_logo_url,
        id: account.id,
        name: account.name,
        slug: account.slug,
        type: account.type_name
      }
    }))
  }).catch(error => {
    response.status(error.response.status).json({
      message: error.response.statusText,
      stage: 102
    })
  })
}