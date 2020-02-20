async function body (rawdataASArray) {
  try {
    var data = rawdataASArray.map((item) => {
      if (!item.error) { return [`Map Type: ${item.title},  Data Produced On: ${item.modellingDate} \n\n`, { image: item.imageUrl, height: 500, width: 500 }] }
      return 'no data'
    })

    return data
  } catch (error) {
    return error
  }
};
module.exports = body
