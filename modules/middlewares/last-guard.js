'use strict'

const rus = require ( '/var/task/modules/r-u-s.js' )

const lastGuard = async ( data ) => {




    const hasStatusCode = data.RU.response.statusCode   ? true : false
    const hasBody       = data.RU.response.body         ? true : false
    
    // strict disallowance of errors from any middleware (we can revisit this)
    if ( data.RU.errors.length ) {
        data.RU.responseBeforeLastGuard = data.RU.response
        data.RU.response = {
            statusCode  : 500,
            headers: {
                'content-type' : 'text/html'
            },
            body:   `<h1>Status: 500 Internal Server Error</h1>
                    The last guard said:
                    <h3>An Error was Thrown</h3>
                    ... in middlewares.`/*
                    Here's what we know : <pre><code>${
                    await rus.print.stringify4 ( data )
                    }</code></pre>` */
        }
        console.error   (   500,
                            `"Error in middlewares." (data.RU.errors).length > 0`,
                            data.RU.response.body,
                            `(data) logged:`,
                            data
                        )
    }
    else
    
    // strict minimum requirement of a status code OR body
    if ( ! ( hasStatusCode || hasBody ) ) { 
        data.RU.responseBeforeLastGuard = data.RU.response
        data.RU.response = {
            statusCode : 500,
            headers: {
                'content-type' : 'text/html'
            },
            body:   `<h1>Status: 500 Internal Server Error</h1>
                    The last guard said :
                    <h3>No "View" was Assigned</h3>`/*
                    The (data) looks like this : <pre><code>${
                    await rus.print.stringify4 ( data )
                    }</code></pre>` */
        }
        console.error   (   500,
                            `"No view." Neither (data.RU.response.statusCode) nor (data.RU.response.body) were assigned`,
                            data.RU.response.body,
                            `(data) logged:`,
                            data
                        )
    }
    else 

    // Either a (statusCode) or a (body) or both are in data.RU.response
    {
    
        // OP 1
        console.warn   (   data.RU.response.statusCode,
                            `"Falsy response body." However, (data.RU.response.statusCode) was found.`,
                            `(data) logged:`,
                            data
                        )
    }



    
    //*     
    console.warn (`(last-guard.js:75) This code is in a clumsy location; consider moving it to its own middleware;`)
    
    
    if (    data.RU.response.headers
        &&  data.RU.response.headers['content-type']
        &&  data.RU.response.headers['content-type']
                .toLowerCase()
                .includes('html') ) {
        
        // MAKE (COPY OF ORIGINAL VALUE)
        const response = { ... data.RU.response }
        
        // MODIFY (ORIGINAL ADDRESS) TO (NEW VALUE)
        if ( typeof data.RU.response.body == 'string' )
        {
            data.RU.response.body 
                =   await rus.print.xml300 ( data.RU.response.body )   
        }
        if (    data.RU.signals.sendResponse
                && typeof data.RU.signals.sendResponse.body == 'string' )
        {
            data.RU.signals.sendResponse.body 
                =   await rus.print.xml300( data.RU.signals.sendResponse.body )
        }
        
        // MODIFY (COPY OF ORIGINAL VALUE) TO INCLUDE (NEW VALUE)
        response.body +=
        `<hr>[ Debug of (data) by last-guard.js ] :
         <pre><code>${ await rus.print.dataDebug ( data ) }</code></pre>` 
        
        // INSERT (MODIFIED COPY OF ORGINAL VALUE) AT (ORIGINAL ADDRESS)
        data.RU.response = response
    
    }
    //*/
    
    return data.RU.response
    
    
    
    
}
module.exports = lastGuard
rus.mark (`~/modules/middlewares/last-guard.js LOADED`)