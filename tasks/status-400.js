'use strict'

const rus = require ( '/var/task/modules/r-u-s.js' )

const status400 = async ( data ) => {
    data.RU.signals.sendResponse.statusCode = 400
    data.RU.signals.sendResponse.body = 
        '<h3>HTTP Response Status Code</h3><h2>400 Bad Request</h2>What were you trying to do?'
}

module.exports = status400 
rus.mark ( `~/tasks/status-400.js LOADED` )