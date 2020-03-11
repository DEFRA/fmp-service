const AuthenticationContext = require('adal-node').AuthenticationContext
const DynamicsWebAPI = require('dynamics-web-api')

// the following settings should be taken from Azure for your application
// and stored in app settings file or in global variables

// OAuth Token Endpoint
const authorityUrl = 'https://login.microsoftonline.com/6f504113-6b64-43f2-ade9-242e05780007/oauth2/token'

// CRM Organization URL
const resource = 'https://fmfp-dev.api.crm4.dynamics.com'

// Dynamics 365 Client Id when registered in Azure
const clientId = 'a406e97e-f7c6-41c7-adb9-75a22661bf41'
const username = 'Harsh.Vasudev@defradev.onmicrosoft.com'
const password = 'Data@2903'

const adalContext = new AuthenticationContext(authorityUrl)

// add a callback as a parameter for your function
const acquireToken = (dynamicsWebApiCallback) => {
  // a callback for adal-node
  function adalCallback (error, token) {
    if (!error) {
      // call DynamicsWebApi callback only when a token has been retrieved
      dynamicsWebApiCallback(token)
    } else {
      console.log('Token has not been retrieved. Error: ' + error.stack)
    }
  }

  // call a necessary function in adal-node object to get a token
  adalContext.acquireTokenWithUsernamePassword(resource, username, password, clientId, adalCallback)
}

// create DynamicsWebApi object
const dynamicsWebApi = new DynamicsWebAPI({
  webApiUrl: 'https://fmfp-dev.api.crm4.dynamics.com/api/data/v9.1/',
  onTokenRefresh: acquireToken
})

module.exports = dynamicsWebApi
