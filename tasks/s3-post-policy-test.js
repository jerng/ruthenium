'use strict'

//  Provide a debuggable function name, 
//  in order to avoid debuggin (function).toString()

const rus = require ( '/var/task/modules/r-u-s.js' )

const s3PostPolicyTest = async ( data ) => {

    // YOUR CODE HERE
    
    // set data in ( data.RU.io.thisIsMyName )


    data.RU.signals.sendResponse.body = `
        <h3>temporary body (s3-post-policy-test.js)</h3>
        
        From: 
        <br> - <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html">https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-post-example.html</a>
        <br> - <a href="https://docs.aws.amazon.com/general/latest/gr/sigv4_signing.html">https://docs.aws.amazon.com/general/latest/gr/sigv4_signing.html</a>
        <br> - <a href="https://docs.aws.amazon.com/lambda/latest/dg/with-s3-example.html">https://docs.aws.amazon.com/lambda/latest/dg/with-s3-example.html</a>
        
        <form action="http://sigv4examplebucket.s3.amazonaws.com/" method="post" enctype="multipart/form-data">
            Key to upload: 
            <input type="input"  name="key" value="user/user1/\${filename}" /><br />
            <input type="hidden" name="acl" value="public-read" />
            <input type="hidden" name="success_action_redirect" value="http://sigv4examplebucket.s3.amazonaws.com/successful_upload.html" />
            Content-Type: 
            <input type="input"  name="Content-Type" value="image/jpeg" /><br />
            <input type="hidden" name="x-amz-meta-uuid" value="14365123651274" /> 
            <input type="hidden" name="x-amz-server-side-encryption" value="AES256" /> 
            <input type="text"   name="X-Amz-Credential" value="AKIAIOSFODNN7EXAMPLE/20151229/us-east-1/s3/aws4_request" />
            <input type="text"   name="X-Amz-Algorithm" value="AWS4-HMAC-SHA256" />
            <input type="text"   name="X-Amz-Date" value="20151229T000000Z" />
        
            Tags for File: 
            <input type="input"  name="x-amz-meta-tag" value="" /><br />
            <input type="hidden" name="Policy" value='<Base64-encoded policy string>' />
            <input type="hidden" name="X-Amz-Signature" value="<signature-value>" />
            File: 
            <input type="file"   name="file" /> <br />
            <!-- The elements after this will be ignored -->
            <input type="submit" name="submit" value="Upload to Amazon S3" />
        </form>
    `

    rus.mark ( `~/tasks/s3-post-policy-test.js EXECUTED` )
}
// manipulate (data.RU), for example
// no need to return (data)

module.exports = s3PostPolicyTest
rus.mark ( `~/tasks/s3-post-policy-test.js LOADED` )