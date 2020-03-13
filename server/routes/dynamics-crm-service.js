const Boom = require('boom')

const dynamicsWebApi = require('../services/dynamics-authentication')

async function sendCustomerDetailsToCRM (customerDetails) {
  try {
    var returnValue = ''
    console.log(customerDetails.customerName)
    console.log(customerDetails.emailAddress)
    console.log(customerDetails.location)
    console.log(customerDetails.applicationReferenceNumber)
    var customerPayload = {
      fmfp_name: customerDetails.customerName,
      fmfp_emailaddress: customerDetails.emailAddress,
      fmfp_location: customerDetails.location,
      fmfp_applicationreferencenumber: customerDetails.applicationReferenceNumber,
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

module.exports = sendCustomerDetailsToCRM
