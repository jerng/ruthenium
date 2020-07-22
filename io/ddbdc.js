'use strict'

const mark = require('/var/task/modules/mark.js')

const aws = require('aws-sdk')
aws.config.apiVersions = { dynamodb: '2012-08-10' }

const ddb = new aws.DynamoDB()

// 2020-07-11 : failed attempt to wrap (ddbdc) in a (try-catch) via Proxy. Using a 
//                  (get) handler for ddbdc's methods returned the error 'method 
//                  name is not a property of undefined'
//
//              Also failed to get this to work using (extends) and (super) :(
//
//  TODO - get help, or figure it out;
//
//  All this does is make debugging easier; moreover it is rather platform
//  specific; so it doesn't really matter if this
//  is not implemented in other language patterns of the Ruthenium pattern.

const ddbdc = new aws.DynamoDB.DocumentClient()

module.exports = ddbdc 
mark(`~/io/ddbdc.js LOADED`)

/*  TODO

    -   ~/tasks/restful/desk-cells-post.js
    -   ~/tasks/restful/desk-cells-ge.js


*/

/*

Cheat sheet for reference: https://github.com/jerng/aws-studies/blob/master/dynamodb-notes.md

Schema design - 
Ghetto Relational Database on DynamoDB : 

    Where a user application "boolean" datatypes, it should be implemented as a
    "number:1|0", which is bulkier but more transparent than a "binary", and 
    arguably less open-ended than a "string" (which has more code-points).

    LEGEND  -   H       :   #           <<string:the hash character>> 
            -   D       :   deskID      <<string:readable>>
            -   C       :   columnID    <<string:readable>>
            -   R       :   rowID       <<string:UUID>>
            
            -   S       :   data        <<string>> 
            -   N       :   data        <<number>> 
            -   B       :   data        <<binary>>
            
            -   L       :   N/A         <<list>>
            -   M       :   N/A         <<map>>
            -   NULL    :   N/A         <<null>>
            -   BOOL    :   N/A         <<boolean>> 

            -   SS      :   N/A         <<set:string>>
            -   NS      :   N/A         <<set:number>>
            -   BS      :   N/A         <<set:binary>>

        Using conventions established at : https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.LowLevelAPI.html

DRAFT 4.1

    Table : "desk-cells"  
            -   HASHKEY :   "DHC"       <<string:"deskID#columnID">>
            -   SORTKEY :   "R"         <<string:"rowID">>
            -   OTHER   :   "S", "N", "B"
    
            Facilitated reads:
                -   SCAN    : gets all data for ALL DESKS
                -   QUERY   : on "DHC", gets all data for ONE COLUMN
                            : can be compounded to build ONE DESK
                -   GETITEM : gets all data for ONE CELL
    
    GSI : "R-GSI"  
            -   HASHKEY :   "R"         <<string:"rowID">>
            -   OTHER   :   "S", "N", "B", "DHC"
    
            Facilitated reads:
                -   QUERY   : on "R", gets all data for ONE ROW

    LSI : "DHC-S-LSI"
            -   SORTKEY :   "S"
            -   OTHER   :   "R"
    
            Facilitated reads:
                -   QUERY   : on "DHC", gets RANGED data for ONE COLUMN
                            : rowIDs can be returned

    LSI : "DHC-N-LSI"
            -   SORTKEY :   "N"
            -   OTHER   :   "R"
    
            Facilitated reads:
                -   QUERY   : on "DHC", gets RANGED data for ONE COLUMN
                            : rowIDs can be returned

    LSI : "DHC-B-LSI"
            -   SORTKEY :   "B"
            -   OTHER   :   "R"

            Facilitated reads:
                -   QUERY   : on "DHC", gets RANGED data for ONE COLUMN
                            : rowIDs can be returned

    STORAGE -   DHC :   1x
                R   :   3x  -   times 36 string characters, HORRIBLE!
                S   :   2x
                N   :   2x
                B   :   2x

    CONSIDERATION   -   Yet flipping the TABLE's HASHKEY and SORTKEY don't seem
                        to solve much; that would prevent us from having LSIs
                        that can be queried with HASHKEY=DESK#COLUMN (we would
                        have to create GSIs to put DHC back as the HASHKEY, and 
                        we would then need one GSI per datatype for S/N/B)
DRAFT 5

    Table : "desk-cells"  
            -   HASHKEY :   "D"         <<string:"deskID">>
            -   SORTKEY :   "C#R"       <<string:"columnID#rowID">>
            -   OTHER   :   "S", "N", "B"
    
            Facilitated reads:
                -   SCAN    : gets all data for ALL DESKS
                -   QUERY   : on "D", gets all data for ONE DESK
                            : on "D", begins_with "C", gets all data for ONE COLUMN 
                -   GETITEM : gets all data for ONE ROW
    

R / rowID is currently a UUID

    UUIDs are represented as 36-character strings.
    32 are data, and 4 are for readability.
    Characters are hexadecimal, but strings are UTF-8.
    Therefore UUIDs could be de/encoded to binary for space savings, if CPU
    demands are not too high. TODO : CONSIDER ONLY
    

*/