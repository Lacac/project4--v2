import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

var AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)

const s3 = new XAWS.S3({signatureVersion: 'v4'})

const s3BucketName = process.env.ATTACHMENT_S3_BUCKET

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      const todoId = event.pathParameters.todoId
      // TODO: Remove a TODO item by id
      const params = {
            Bucket: s3BucketName,
            Key: todoId
      } 
      
      try{
        await s3.deleteObject(params).promise()
        return {
            statusCode: 204, 
            body: ''
          }
      } catch(err) {
        console.log('Fail to delete object in S3')
        return {
            statusCode: 400, 
            body: ''
          }

      }

      
    }
  )
  
  handler
    .use(httpErrorHandler())
    .use(
      cors({
        credentials: true,
      })
    )