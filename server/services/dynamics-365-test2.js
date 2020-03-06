const https = require('https')

// configuration details mostly extracted from Azure --> app registered as web application in Azure AD
var crmorg = 'https://fmfp-dev.api.crm4.dynamics.com'
var authhost = 'login.microsoftonline.com'
var authpath = '/6f504113-6b64-43f2-ade9-242e05780007/oauth2/token'
var clientid = 'a406e97e-f7c6-41c7-adb9-75a22661bf41'
var clientSecret = '5K[Z2z6h.8/:29D@iGtXOS-nyYtJEubV'

// token request parameters
var postData = 'client_id=' + clientid
postData += '&resource=' + encodeURIComponent(crmorg)
postData += '&client_secret=' + encodeURIComponent(clientSecret)
postData += '&grant_type=client_credentials'

// set the token request parameters
var options = {
  host: authhost,
  path: authpath,
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
}

// make the token request
var request = https.request(options, (response) => {
  let data = ''

  //  A chunk of data has been recieved
  response.on('data', (chunk) => {
    data += chunk
  })

  // The whole response has been recieved
  response.on('end', () => {
    var tokenresponse = JSON.parse(data)
    var accessToken = tokenresponse.access_token
    console.log('Token: ' + accessToken)
  })
})

request.on('error', (e) => {
  console.error(e)
})

request.write(postData)
request.end()
