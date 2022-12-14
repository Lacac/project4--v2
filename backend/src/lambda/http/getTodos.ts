import 'source-map-support/register'
// import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getTodosForUser as getTodosForUser } from '../../businessLogic/todos'
import { getUserId } from '../utils';

// TODO: Get all TODO items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    const userId = getUserId(event)
    const todos = await getTodosForUser(userId)

    return {
      statusCode: 200,
      body: JSON.stringify({
        items: todos
      })
    }
  }
)
handler.use(
  cors({
    credentials: true
  })
)


// export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

//     // TODO: Implement creating a new TODO item

//         const userId = getUserId(event)
//         const todos = await getTodosForUser(userId)
    
//         return {
//           statusCode: 200,
//           headers: {
//             'Access-Control-Allow-Origin': '*'
//           },
//           body: JSON.stringify({
//             items: todos
//           })
//         }

// }