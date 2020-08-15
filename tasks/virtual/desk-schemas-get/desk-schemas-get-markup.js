'use strict'


const rus = require('/var/task/modules/r-u-s.js')

//const htmlIndex
//    = rus.node.fs.readFileSync ( '/var/task/io/blobs/index.html', { encoding: 'utf8' } )

const tableInMarkup = require(`/var/task/tasks/virtual/desk-schemas-get/markup-table-in-markup.js`)

const deskSchemasMarkup = async(data) => {

    rus.conf.verbosity > 0 &&
        console.warn(`(desk-schemas-get.js) FIXME: (data.RU.io) fieldname no-longer coheres with convention established in (template-markup);`)


    const markup = await tableInMarkup(data.RU.io.deskSchemasScan)

        +
        (rus.conf.verbosity < 4 ?
            '' :
            ` <h6>all-desk-schemas/markup.js:</h6>
              <pre><code>${ JSON.stringify( data.RU.io.deskSchemasScan, null, 4 )
              }</code></pre>`)

    return markup
}
module.exports = deskSchemasMarkup