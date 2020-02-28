async function body (rawdataASArray) {
  try {
    var data = rawdataASArray.map((item) => {
      if (!item.error) {
        if (item.imageUrl !== '') {
          return [{ image: item.imageUrl,  height: 595.28, width: 841.89}]
        } else {
          return [`Map Type: ${item.title}`, 'No data available']
        }
      }
      return ''
    })

    return data
  } catch (error) {
    return error
  }
};
module.exports = body
