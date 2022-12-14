import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
// import { TodoUpdate } from '../models/TodoUpdate';

var AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)


const logger = createLogger('TodosAccess')

// TODO: Implement the dataLayer logic

export class TodosAccess {
    constructor(
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly todoTable = process.env.TODOS_TABLE,
        private readonly todoIndex = process.env.TODOS_CREATED_AT_INDEX
    ){}
    
    async getAllTodoItems(userId: string): Promise<TodoItem[]> {
        logger.info('GetAllTodoItems called')

        const result = await this.docClient.query({
            TableName: this.todoTable,
            IndexName: this.todoIndex, 
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise()

        const todo = result.Items
        return todo as TodoItem[]
    }

    async createTodoItem(todoItem: TodoItem): Promise<TodoItem> {
        logger.info('CreateTodoItem called')

        await this.docClient.put({
            TableName: this.todoTable,
            Item: todoItem
        }).promise()

        return todoItem as TodoItem
    }
}

