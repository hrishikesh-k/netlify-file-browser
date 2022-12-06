# Netlify File Browser

A single-page web-app to browse and download your Netlify deploys. Built with Vue.js and Vite, deployed on Netlify.

## Local testing:

The app is built in Node 18 environment. To develop locally:

* Clone the repo.
* Create a new Netlify OAuth app [here](https://app.netlify.com/user/applications#oauth-applications) with `Redirect URI` as `http://localhost:8888/api/callback`
* Create `.env` file with the following content:
```dotenv
CLIENT_ID=value-from-netlify
CLIENT_SECRET=value-from-netlify
ENCRYPTION_KEY=random-password
```
* Run `npm i && netlify dev`
* To use Vue devtools, uncomment `line 19-23` in `index.html` and run `vue-devtools` in another terminal window.

## Deploying to production:

The application is configured to have a seamless deploy experience on Netlify only. Other services might work, however the serverless functions might have to be re-written to support the underlying platform. The front-end should work fine on any platform that can serve a Single Page Application.

To make this functional in production, you'd have to create a different OAuth application for your production instance so that you can set a different `Redirect URI`. Add the 3 environment variables mentioned above with the new values in your Netlify Dashboard (or any other service that you might be using). If you're planning to keep your repository closed-source, you're free to hardcode the values in the functions.

## Reporting issues:

Bug reports and feature requests should strictly follow the templates. Including all the relevant info makes it easier to understand and debug the issue. Any other issue can be created using the blank template, but that's not recommended unless the issue does not fit in any of those 2 categories.

**Note: This application is not backed by official support from Netlify. Any issues about these reported in the helpdesk or on the forums, would most likely be ignored.**