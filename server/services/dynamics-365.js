const DynamicsWebAPI = require('dynamics-web-api')

var AuthenticationContext = require('adal-node').AuthenticationContext

// the following settings should be taken from Azure for your application
// and stored in app settings file or in global variables

// OAuth Token Endpoint
var authorityUrl = 'https://login.microsoftonline.com/6f504113-6b64-43f2-ade9-242e05780007/oauth2/token'

// CRM Organization URL
var resource = 'https://fmfp-dev.api.crm4.dynamics.com'

// Dynamics 365 Client Id when registered in Azure
var clientId = 'a406e97e-f7c6-41c7-adb9-75a22661bf41'
var username = 'Harsh.Vasudev@defradev.onmicrosoft.com'
var password = '--'

var adalContext = new AuthenticationContext(authorityUrl)

// add a callback as a parameter for your function
function acquireToken (dynamicsWebApiCallback) {
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
var dynamicsWebApi = new DynamicsWebAPI({
  webApiUrl: 'https://fmfp-dev.api.crm4.dynamics.com/api/data/v9.1/',
  onTokenRefresh: acquireToken
})

// call any function
dynamicsWebApi.executeUnboundFunction('WhoAmI').then(function (response) {
  console.log('Hello Dynamics 365! My id is: ' + response.UserId)
}).catch(function (error) {
  console.log(error.message)
})

// initialize a CRM entity record object
var customer = {
  fmfp_name: 'Harsh Vasudev',
  fmfp_emailaddress: 'harsh.vasudev@environment-agency.gov.uk',
  fmfp_companyname: 'Environment Agency',
  fmfp_location: '292924,232323',
  fmfp_telephonenumber: '292924,232323',
  fmfp_sitelocation: 'Chester'
}

// call dynamicsWebApi.create function
dynamicsWebApi.create(customer, 'fmfp_customers').then(function (id) {
  // do something with id here
}).catch(function (error) {
  console.log(error.message)
})
