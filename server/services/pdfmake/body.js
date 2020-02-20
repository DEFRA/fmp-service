const Wreck = require('@hapi/wreck');
const fs = require('fs');
async function body(rawdataASArray) {
    try {
        var data = rawdataASArray.map((item) => {
            if (!item.error) {
                if (item.imageUrl !== '') {
                    return [`Map Type: ${item.title},  Data Produced On: ${item.modellingDate} \n\n`, { image: item.imageUrl, height: 500, width: 500}]
                }
                else {
                    return [`Map Type: ${item.title}`, 'No data available \n\n']
                }
            }
            return ''
        })

        return data;
    } catch (error) {
        return error;
    }
};
module.exports = body;