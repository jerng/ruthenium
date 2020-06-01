'use strict'

const reindexFormNames = async ( data ) => {

    /*  Tool:           https://regexr.com/
    
        Related
        Public Query:   https://stackoverflow.com/questions/62111549/whats-the-best-way-to-validate-and-lex-a-string-that-looks-like-a-nested-array
    
                Is regex even the best approach?
        
                    Some simple valid-character assumptions:
                    
                    the form xxx[xxx][xxx].yy must be adhered to
                    'x' can be any non-uppercase letter, and non-square-bracket
                    'y' must be Arabic numerals only
                    the number of [xxx] blocks is undetermined, but must be greater than 0
                    xxx segments cannot be zero-length, but may be any other length
                    yy segments cannot be zero-length, but may be any other length
                    newlines are not 
                    Context: JavaScript (no look-behind?)            
        
        //////////////////////////////////////////////////////////////////////
            
        Sample Input:   ^shoes[country][source]###567###[arbitrarily-many-boxed-strings]$
                        
                        ^HEAD[SEGMENT-1][SEGMENT-2]toArray[SEGMENT-3][SEGMENT-N]$
                        
            Rules:      - HEAD & SEGMENT each have length > 0
                        - HEAD & SEGMENT disallow 
                            uppercase, line breaks, '[', ']'
                        - SEGMENT disallows 
                            ###
                        - ###\d+### can occur only once
                            implicitly, only outside [blocks]
                        
        Validation:     /^((?!###)[^A-Z\[\]\n\r])+(\[((?!###)[^A-Z\[\]\n\r])+\])*(###\d+###)*(\[((?!###)[^A-Z\[\]\n\r])+\])*$/
        
        Demarcation:    /(?<head>^((?!###)[^A-Z\[\]\n\r])+)|(\[(?<asIs>(?!###)[^A-Z\[\]\n\r]+)\]+?)|(?<toArray>###\d+###)/g
        
    */
    ///*
    let temp1 = {}
    let temp2 = {}
    const validationRegex = /^((?!###)[^A-Z\[\]\n\r])+(\[((?!###)[^A-Z\[\]\n\r])+\])*(###\d+###)*(\[((?!###)[^A-Z\[\]\n\r])+\])*$/
    const lexerRegex = /(?<head>^((?!###)[^A-Z\[\]\n\r])+)|(\[(?<asIs>(?!###)[^A-Z\[\]\n\r]+)\]+?)|(?<toArray>###\d+###)/g
    
    for ( const name in data.RU.request.formStringParameters ) {
        if (validationRegex.test (name)) {

            let temp3 = []
            
            const groups = Array.from ( name.matchAll ( lexerRegex ), match => match.groups )
    
            for ( const group of groups ) {
                for ( const name in group ) {
                    if ( group[ name ] ) {
                        temp3.push( group[ name ] ) 
                    }
                }
            }
            
            temp1[ name ] = temp3
            /* almost there, working example
            
            const matches     = Array.from ( 
                name.matchAll ( lexerRegex ), 
                match => {
                    for ( const groupName in match.groups ) {
                        if ( match.groups[ groupName ] ) {
                            temp3.push ( match.groups[ groupName ] )
                        }
                    }
                    return temp3  
                }
            )
            temp1[ name ] = matches[0] // All matches[n].groups are the same, so we only need the first.
            */
            
            //  an Array of Groups: 
            //  each group being an Array of ( Arrays of the form [groupName: matchedValue] )
            
            /*
                .matchAll(//g) returns anIterator, which you can pass as Array.from(anIterator) ... 
                
                ...  which in turn returns:
                
                [ //    Array: of matches
                
                    [   //  Array: one per match
                    
                        ... [ all the capture groups],   
                        
                                // become the numerically indexed elements;
                        
                        index,  // prop: index of the first result in the original string;
                        
                        input,  // prop: initial string;
                        
                        groups  // prop: Object
                        
                                    // { indices: values } ... named and unnamed capture groups 
                    ]
                ]
            */
            
            
            
            //temp2[ tailless ].push( data.RU.request.formStringParameters[ name ] )

    
        } else {
            temp1[ name ] = 'VALIDATION_FAILED'//new Error ( `(reindex-form-names.js) did not understand [name="${name}"]` )
        }
    }

    data.RU.request.formStringParameters = { temp1: temp1, temp2: temp2 }
    //*/
    return data
}

module.exports  = reindexFormNames