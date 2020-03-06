const Joi = require('joi')
const Boom = require('boom')
const AppRefNumberGenerator = require('../util/refnumber')

const dynamicsWebApi = require('../services/dynamics-authentication')

// call any function
// dynamicsWebApi.executeUnboundFunction('WhoAmI').then(function (response) {
//   console.log('Hello Dynamics 365! My id is: ' + response.UserId)
// }).catch(function (error) {
//   console.log(error.message)
// })

// initialize a CRM entity record object
/* var customer = {
  fmfp_name: 'Harsh Vasudev',
  fmfp_emailaddress: 'harsh.vasudev@environment-agency.gov.uk',
  fmfp_companyname: 'Environment Agency',
  fmfp_location: '292924,232323',
  fmfp_telephonenumber: '23232323',
  fmfp_sitelocation: 'Chester'
}

// call dynamicsWebApi.create function
dynamicsWebApi.create(customer, 'fmfp_customers').then(function (id) {
  // do something with id here
}).catch(function (error) {
  console.log(error.message)
})
*/

// dynamicsWebApi.retrieve('c5cdf8f2-5c5a-ea11-a811-000d3a4b29de', 'fmfp_customers').then(function (record) {
//   // do something with record here
//   console.log(record)
// }).catch(function (error) {
//   console.log(error.message)
// })

module.exports = [
  {
    method: 'GET',
    path: '/customer/{applicationReferenceNumber}',
    options: {
      description: 'Returns the fmfp customer record with matching its application reference Number',
      handler: async (request, h) => {
        try {
          const applicationReferenceNumber = request.params.applicationReferenceNumber
          var payload = {
            collection: 'fmfp_customers',
            select: ['fmfp_name', 'fmfp_emailaddress', 'fmfp_applicationreferencenumber', 'fmfp_companyname', 'fmfp_location', 'fmfp_telephonenumber', 'fmfp_sitelocation'],
            filter: 'fmfp_applicationreferencenumber eq ' + '\'' + applicationReferenceNumber + '\'',
            maxPageSize: 5,
            count: true
          }

          console.log(payload)

          return dynamicsWebApi.retrieveAllRequest(payload).then(function (response) {
            console.log(response.value)
            return response.value
          })
        } catch (err) {
          return Boom.badImplementation('Get fmfp customer failed', err)
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/customer',
    options: {
      description: 'Post the customer details and create a record in the CRM',
      handler: async (request, h) => {
        try {
          var returnValue = ''
          const applicationReferenceNumber = AppRefNumberGenerator()
          console.log(request.payload.customerName)
          console.log(request.payload.emailAddress)
          console.log(request.payload.location)
          console.log(applicationReferenceNumber)
          var customerPayload = {
            fmfp_name: request.payload.customerName,
            fmfp_emailaddress: request.payload.emailAddress,
            fmfp_location: request.payload.location,
            fmfp_applicationreferencenumber: applicationReferenceNumber,
            fmfp_companyname: 'EA'
          }

          console.log(customerPayload)
          //     // call dynamicsWebApi.create function
          dynamicsWebApi.create(customerPayload, 'fmfp_customers', ['return=representation']).then(function (record) {
            // do something with a record here
            returnValue = record.subject
            console.log(returnValue)
            return returnValue
          }).catch(function (error) {
            throw error
          })
        } catch (error) {
          Boom.badImplementation('Problem in saving customer record:' + error)
        }
        return returnValue
      }
    }
  }
]
