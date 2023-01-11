// import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteImage } from '../../businessLogic/todos'
// import { getUserId } from '../utils'


export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      const todoId = event.pathParameters.todoId
  //    const userId = getUserId(event)
      console.log('DELETE images event called', event)
    
      await deleteImage(
        todoId
      )
      return {
        statusCode: 204, 
        body: ''
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