# Netlify File Browser

A single-page web-app made to browse and download your Netlify deploys. Built with Vue.js and Vite, deployed on Netlify.

## Local testing:

The app is built in Node 17 environment.

* Clone the repo
* Create a new Netlify OAuth app here: https://app.netlify.com/user/applications#oauth-applications with `Redirect URI` as `http://localhost:3000`
* Create `.env` file with the content: `VITE_CLIENT_ID=client-id-from-the-above-app`
* Run `npm i && npm run dev`
* To use Vue devtools, uncomment `line 8` in `index.html` and run `npm run devtools` in another terminal window

## Reporting issues:

Bug reports and feature requests should strictly follow the templates. Including all the relevant info makes it easier to understand and debug the issue. Any other issue can be created using the blank template, but that's not recommended unless the issue does not fit in any of those 2 categories.

Note: This tool is not backed by official support from Netlify.