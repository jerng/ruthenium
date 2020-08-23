'use strict'

const rus = require ( '/var/task/modules/r-u-s.js' )

const status501 = async ( data ) => {
    data.RU.signals.sendResponse.statusCode = 501
    data.RU.signals.sendResponse.body = 
    '<h2>HTTP Response Status 501 : Not Implemented</h2><h3>Please report this to the system administrator.</h3>'
}

module.exports = status501 
rus.mark ( `~/tasks/status-501.js LOADED` )