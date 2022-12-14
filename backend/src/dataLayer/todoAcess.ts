import * as AWS from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
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
    

    // Function 1: Get all TodoItems for 1 user by userId
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

    
    // Function 2: Create a new todo Items for user 
    async createTodoItem(todoItem: TodoItem): Promise<TodoItem> {
        logger.info('CreateTodoItem called')

        await this.docClient.put({
            TableName: this.todoTable,
            Item: todoItem
        }).promise()

        return todoItem as TodoItem
    }

    // Function 3: Update todo Item 
    async updateTodoItem(
        userId: string, 
        todoId: string,
        todoUpdate: TodoUpdate
    ): Promise<TodoUpdate> {
        logger.info('updateTodo called')
        await this.docClient.update({
            TableName: this.todoTable,
            Key: {
                userId,
                todoId
            },
            UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
            ExpressionAttributeValues:{
                ':name': todoUpdate.name,
                ':dueDate': todoUpdate.dueDate,
                ':done': todoUpdate.done
            },
            ExpressionAttributeNames: {
                '#name': 'name'
            },
        }).promise()

        return todoUpdate as TodoUpdate
    }

    // Function 4: delete a todo Item
    async deleteTodoItem(
        userId: string,
        todoId: string
    ): Promise<string> {
        logger.info('deleteTodo called')
        await this.docClient.delete({
            TableName: this.todoTable,
            Key: {
                userId,
                todoId
            }    
        }).promise()
        return todoId as string
    }

    // Function 5: Generate presinedURL for a todo item: attachment


    

}


    

