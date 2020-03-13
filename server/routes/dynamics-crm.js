const Boom = require('boom')
const dynamicsWebApi = require('../services/dynamics-authentication')

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
          console.log(request.payload.customerName)
          console.log(request.payload.emailAddress)
          console.log(request.payload.location)
          var customerPayload = {
            fmfp_name: request.payload.customerName,
            fmfp_emailaddress: request.payload.emailAddress,
            fmfp_location: request.payload.location,
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
