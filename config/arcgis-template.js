var floodMapTemplateArcGisUrl = function () {
    let floodMapDataURL = '';
    var floodMapTemaplateURL = 'https://fra-snd-inbound.azure.defra.cloud/arcgisserver/rest/services/fmfp/fmfp_dev_print/GPServer/Export%20Web%20Map/execute?'
    var floodMapTemplateName = 'Layout_Template=flood_map';
    var floodMapParameters = 'Web_Map_as_JSON={}'
    var floodMapFormat = 'Format=JPG';
    var outputFormat = 'f=json'
    floodMapDataURL = floodMapTemaplateURL + '&' + floodMapParameters + '&' + floodMapTemplateName + '&' + floodMapFormat + '&' + outputFormat;
    return floodMapDataURL;
}
var nodalMapTemplateArcGisUrl = function () {
    let nodalMapDataURL = '';
    var nodalMapTemplateURL = 'https://fra-snd-inbound.azure.defra.cloud/arcgisserver/rest/services/fmfp/fmfp_dev_print/GPServer/Export%20Web%20Map/execute?'
    var nodalMapTemplateName = 'Layout_Template=modelled_data_points_map';
    var nodalMapParameters = 'Web_Map_as_JSON={}'
    var nodalMapFormat = 'Format=JPG';
    var nodalFormatOutputFormat = 'f=json'
    nodalMapDataURL = nodalMapTemplateURL + '&' + nodalMapParameters + '&' + nodalMapTemplateName + '&' + nodalMapFormat + '&' + nodalFormatOutputFormat;
    return nodalMapDataURL;
}

var modelledDatapointsTableMapTemplateArcGisUrl = function () {
    let modelledDatapointsTableDataURL = '';
    var modelledDatapointsTableMapTemplateURL = 'https://fra-snd-inbound.azure.defra.cloud/arcgisserver/rest/services/fmfp/fmfp_dev_print/GPServer/Export%20Web%20Map/execute?'
    var modelledDatapointsTableMapTemplateName = 'Layout_Template=modelled_data_points_table';
    var modelledDatapointsTableMapParameters = 'Web_Map_as_JSON={}'
    var modelledDatapointsTableMapFormat = 'Format=JPG';
    var modelledDatapointsTableFormatOutputFormat = 'f=json'
    modelledDatapointsTableDataURL = modelledDatapointsTableMapTemplateURL + '&' + modelledDatapointsTableMapParameters + '&' + modelledDatapointsTableMapTemplateName + '&' + modelledDatapointsTableMapFormat + '&' + modelledDatapointsTableFormatOutputFormat;
    return modelledDatapointsTableDataURL;
}


var historicFloodMapTemplateArcGisUrl = function () {
    let historicFloodDataURL = '';
    var historicFloodMapTemplateURL = 'https://fra-snd-inbound.azure.defra.cloud/arcgisserver/rest/services/fmfp/fmfp_dev_print/GPServer/Export%20Web%20Map/execute?'
    var historicFloodMapTemplateName = 'Layout_Template=historic_flood_map';
    var historicFloodMapParameters = 'Web_Map_as_JSON={}'
    var historicFloodMapFormat = 'Format=JPG';
    var historicFloodFormatOutputFormat = 'f=json'
    historicFloodDataURL = historicFloodMapTemplateURL + '&' + historicFloodMapParameters + '&' + historicFloodMapTemplateName + '&' + historicFloodMapFormat + '&' + historicFloodFormatOutputFormat;
    return historicFloodDataURL;
}

var floodExtentsMapTemplateArcGisUrl = function () {
    let floodExtentsDataURL = '';
    var floodExtentsMapTemplateURL = 'https://fra-snd-inbound.azure.defra.cloud/arcgisserver/rest/services/fmfp/fmfp_dev_print/GPServer/Export%20Web%20Map/execute?'
    var floodExtentsMapTemplateName = 'Layout_Template=modelled_map';
    var floodExtentsMapParameters = 'Web_Map_as_JSON={}'
    var floodExtentsMapFormat = 'Format=JPG';
    var floodExtentsFormatOutputFormat = 'f=json'
    floodExtentsDataURL = floodExtentsMapTemplateURL + '&' + floodExtentsMapParameters + '&' + floodExtentsMapTemplateName + '&' + floodExtentsMapFormat + '&' + floodExtentsFormatOutputFormat;
    return floodExtentsDataURL;
}

module.exports = { floodMapTemplateArcGisUrl, nodalMapTemplateArcGisUrl,modelledDatapointsTableMapTemplateArcGisUrl, historicFloodMapTemplateArcGisUrl,floodExtentsMapTemplateArcGisUrl};
