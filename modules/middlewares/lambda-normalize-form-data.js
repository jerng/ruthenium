const querystring   = require ( 'querystring' )

//  Section on reserved characters:
//  -   https://tools.ietf.org/html/rfc3986#section-2.2
//
//  HTML5 has a special configuration for form-data sent via the GET method
//  -   https://www.w3.org/TR/html52/sec-forms.html#form-submission-algorithm    

const lambdaNormalizeHeadersFormData = async ( data ) => {

    if (    data.LAMBDA.event.headers
            &&  (   data.LAMBDA.event.headers['content-type'] 
                    == 'application/x-www-form-urlencoded'
                )
    )
    {
        data.RU.request.rawFormString =
            data.LAMBDA.event.isBase64Encoded
            ?   Buffer
                    .from ( data.LAMBDA.event.body, 'base64' )
                    .toString ('utf8')
            :   data.LAMBDA.event.body

        // NEW
        data.RU.formStringParameters
            = querystring.parse ( data.RU.request.rawFormString )

            
        /* OLD
        const parsedRawFormString
            = querystring.parse ( data.RU.request.rawFormString )
        
        data.RU.request.formStringParameters = {}
        
        // WIP
        //data.RU.parsedRawFormString = parsedRawFormString
        // END WIP
        
        for ( const name in parsedRawFormString ) {
            data.RU.request.formStringParameters[ name ] 
                = parsedRawFormString[ name ].split(',')
        }
        */

    }
    
    return data
}

module.exports  = lambdaNormalizeHeadersFormData