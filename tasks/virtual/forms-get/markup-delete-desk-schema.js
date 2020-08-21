'use strict'

const rus = require ( '/var/task/modules/r-u-s.js' )

const deleteDeskSchema = async ( data ) => {
    
    return `
    
        <h2>Desk Schema : <code>delete one</code> </h2>
    
        ${  await rus.html.form ( {
                action: await rus.appUrl( [ 
                    [ 'route','virtual' ], 
                    [ 'type','desk-schemas' ] 
                ] ),
                innerHTML: '-'
            } ) 
        }
    `
    
}
module.exports = deleteDeskSchema