const DynamicsWebAPI = require('dynamics-web-api')

const adal = require('adal-node').AuthenticationContext

const authorityHostUrl = 'https://login.microsoftonline.com'
const tenant = '6f504113-6b64-43f2-ade9-242e05780007'
const authorityUrl = authorityHostUrl + '/' + tenant
const clientId = 'a406e97e-f7c6-41c7-adb9-75a22661bf41'
const clientSecret = '5K[Z2z6h.8/:29D@iGtXOS-nyYtJEubV'
const resource = 'https://fmfp-dev.api.crm4.dynamics.com'

const context = new adal(authorityUrl)

function test () {
  context.acquireTokenWithClientCredentials(
    resource,
    clientId,
    clientSecret,
    function testCallBack (err, tokenResponse) {
      if (err) {
        // console.log(`Token generation failed due to ${err}`)
        // return undefined
      } else {
        // console.dir(tokenResponse.accessToken, { depth: null, colors: true })
        // return tokenResponse
      }
    }
  )
}
console.log(testCallBack())

// add a callback as a parameter for your function
// function acquireToken (dynamicsWebApiCallback) {
//   // a callback for adal-node
//   function adalCallback (err, tokenResponse) {
//     if (err) {
//       console.log(`Token generation failed due to ${err}`)
//     } else {
//       console.dir(tokenResponse.accessToken, { depth: null, colors: true })
//     }
//   }

//   // call a necessary function in adal-node object to get a token
//   context.acquireTokenWithClientCredentials(resource, clientId, clientSecret, adalCallback)
// }

// function acquireToken (dynamicsWebApiCallback) {
//   // a callback for adal-node
//   function adalCallback (error, token) {
//     if (!error) {
//       // call DynamicsWebApi callback only when a token has been retrieved
//       dynamicsWebApiCallback(token)
//     } else {
//       console.log('Token has not been retrieved. Error: ' + error.stack)
//     }
//   }

//   // call a necessary function in adal-node object to get a token
//   context.acquireTokenWithClientCredentials(resource, clientId, clientSecret, adalCallback)
// }

// create DynamicsWebApi object
// var dynamicsWebApi = new DynamicsWebAPI({
//   webApiUrl: 'https://fmfp-dev.api.crm4.dynamics.com/api/data/v9.1/',
//   onTokenRefresh: acquireToken
// })

// call any function
// dynamicsWebApi.executeUnboundFunction('WhoAmI').then(function (response) {
//   console.log('Hello Dynamics 365! My id is: ' + response.UserId)
// }).catch(function (error) {
//   console.log(error.message)
// })

// initialize a CRM entity record object
var customer = {
  fmfp_name: 'Harsh Vasudev',
  fmfp_emailaddress: 'harsh.vasudev@environment-agency.gov.uk',
  fmfp_companyname: 'Environment Agency',
  fmfp_location: '292924,232323',
  fmfp_telephonenumber: '7832323',
  fmfp_sitelocation: 'Chester'
}

// call dynamicsWebApi.create function
// dynamicsWebApi.create(customer, 'fmfp_customers').then(function (id) {
//   console.log('Customer created')
//   // do something with id here
// }).catch(function (error) {
//   console.log(error.message)
// })
