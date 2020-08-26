'use strict'

const rus = require ( '/var/task/modules/r-u-s.js' )

const readDeskSchema = async ( data ) => {
    
    return `
    
        <h2>Desk Schema : <code>read one</code> </h2>
        
        <pre><code>${ await rus.print.stringify4 ( data.RU.io.deskSchemasGet.Item ) }</code></pre>
        
        <a  class="button"
            href="${                         
                        await rus.appUrl ([
                            [ 'route', 'virtual' ],
                            [ 'type', 'desks' ],
                            [ 'thing', data.RU.io.deskSchemasGet.Item.name ],
                            [ 'reader', 'human']
                        ])
            }"
            
            >
            <h3>View Desk <i class='material-icons'>table_chart</i></h3> 
        </a>
        `
    
}
module.exports = readDeskSchema