'use strict'

const mark      = require ( '../../modules/mark' )            
const DDBDC     = require ( '../../io/DDBDC.js' )

const getAllSchemasTask = async ( data ) => {
    
    data.RU.io.gridSchemasScan = await DDBDC.scan ( {
        TableName: 'TEST-APP-GRID-SCHEMAS',
        ReturnConsumedCapacity : 'TOTAL'
    } ).promise()
    
    data.RU.response.markupName = 'allSchemasMarkup'

    mark ( `getAllSchemasTask.js EXECUTED` )
}

module.exports = getAllSchemasTask
mark ( `getAllSchemasTask.js LOADED` )