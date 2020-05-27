'use strict'
const mark      = require ( '../modules/mark' )            

const fs                    = require ( 'fs' )
const htmlIndex             = fs.readFileSync ( 'io/blobs/index.html', { encoding: 'utf8' } )
mark( `index.html READ`)

const tableOfDeskSchemas   = require (`../markup/tableOfDeskSchemas.js`) 

const allDeskSchemasMarkup = async ( data ) => {

    return  ( 
        
        htmlIndex 
    
        + await tableOfDeskSchemas ( data.RU.io.deskSchemasScan )
    
        + ` <h6>initialTaskMarkup.js:</h6>
            <pre><code>${ JSON.stringify( data.RU.io.deskSchemasScan, null, 4 ) }</code></pre>`
    )
}

module.exports  = allDeskSchemasMarkup
mark ( `allDeskSchemasMarkup.js LOADED` )