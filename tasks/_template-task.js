'use strict'

//  Provide a debuggable function name, 
//  in order to avoid debuggin (function).toString()

const rus = require ( '/var/task/modules/r-u-s.js' )

const thisIsMyName = async ( data ) => {

    // YOUR CODE HERE
    
    // set data in ( data.RU.io.thisIsMyName )


    rus.mark ( `~/tasks/_template-task.js EXECUTED` )
}
// manipulate (data.RU), for example
// no need to return (data)

module.exports = thisIsMyName
rus.mark ( `~/tasks/_template-task.js LOADED` )