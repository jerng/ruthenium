'use strict'

const rus = require('/var/task/modules/r-u-s.js')

const sessionGuard = async(data) => {

    /*  
     *  Complain if no session cookie is found in (request).
     */

    if (!(data.RU.signals.session && data.RU.signals.session.id )    ) 
    {
        data.RU.signals.sendResponse.statusCode = 401
        data.RU.signals.sendResponse.body = `Session not found.`
        data.RU.signals.skipToMiddlewareName = 'composeResponse'
    }

    return data
}

module.exports = sessionGuard
rus.mark(`~/modules/middlewares/sessionGuard.js LOADED`)


//rus.cookie.__HostExpire(data, rus.conf.obfuscations.sessionCookieName)