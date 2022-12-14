import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
// import * as middy from 'middy'
// import { cors } from 'middy/src/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
import { createTodo } from '../../businessLogic/todos'
// import * as AWS  from 'aws-sdk'

// const docClient = new AWS.DynamoDB.DocumentClient()

// export const handler = middy(
//   async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//     const newTodo: CreateTodoRequest = JSON.parse(event.body)
//     // TODO: Implement creating a new TODO item

//     const userId = getUserId(event)
//     const newItem = await createTodo(userId, newTodo)

//     return {
//       statusCode: 201,
//       headers: {
//         'Access-Control-Allow-Origin': '*'
//       },
//       body: JSON.stringify({
//         item: newItem
//       })
//     }
//   }
// )

// handler.use(
//   cors({
//     credentials: true
//   })
// )

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)
    // TODO: Implement creating a new TODO item

    const userId = getUserId(event)
    const newItem = await createTodo(userId, newTodo)

    return {
      statusCode: 201,
      headers: {
        // 'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        
      },
      body: JSON.stringify({
        item: newItem
      })
    }

}
