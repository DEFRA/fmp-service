const Boom = require('boom')

const dynamicsWebApi = require('../services/dynamics-authentication')

async function sendCustomerDetailsToCRM (customerDetails) {
  try {
    var customerPayload = {
      fmfp_name: customerDetails.customerName,
      fmfp_emailaddress: customerDetails.emailAddress,
      fmfp_location: customerDetails.location,
      fmfp_applicationreferencenumber: customerDetails.applicationReferenceNumber,
      fmfp_companyname: 'EA'
    }

    console.log(customerPayload)
    return await dynamicsWebApi.create(customerPayload, 'fmfp_customers').then(function (customerId) {
      // Need to replace with logging statement
      // console.log('Customer Created with ID', customerId)
      return customerId
    }).catch(function (error) {
      throw error
    })
  } catch (error) {
    Boom.badImplementation('Problem in saving customer record:' + error)
  }
}

async function updateReportGenerationTime (customerId) {
  try {
    var customerPayload = {
      fmfp_reportgenerationtime: new Date().toISOString()
    }
    // console.log('Updating report generation Time', customerPayload)
    // console.log('Customer Id to Update ', customerId)
    // Need to replace with logging statements
    dynamicsWebApi.update(customerId, 'fmfp_customers', customerPayload).then(function () {
    }).catch(function (error) {
      throw error
    })
  } catch (error) {
    Boom.badImplementation('Problem in updating the customer record:' + error)
  }
}

module.exports = { sendCustomerDetailsToCRM, updateReportGenerationTime }
