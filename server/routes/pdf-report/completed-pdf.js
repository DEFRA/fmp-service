const pdfMake = require('../../../node_modules/pdfmake/build/pdfmake')
const vfsFonts = require('../../../node_modules/pdfmake/build/vfs_fonts')
pdfMake.vfs = vfsFonts.pdfMake.vfs
var fs = require('fs')
const body = require('./../../../server/services/pdfmake/body')
const Boom = require('boom')

var completedPDFData = async (rawdata) => {
  try {
    var bodyData = await body(rawdata)
    var fullContentForPDF = {
      pageSize: { height: 595.28, width: 841.89 },
      pageMargins: [0, 0, 0, 0],
      info: {
        title: 'Flood Map for Planning Document',
        author: 'FMFP Team',
        subject: 'This document, can be used for planning application',
        keywords: 'FMFP'
        },
      content: bodyData
    }
    pdfMake.createPdf(fullContentForPDF).getBuffer(function (result) {
      fs.writeFile(`generatedpdfs/${new Date().toISOString()}.pdf`, result, function (err) {
        if (err) throw err
      })
    })
  } catch (err) {
    return Boom.badImplementation(`${err.message} ${err}, issue occured in generating the complete PDF`)
  }
}
module.exports = completedPDFData
