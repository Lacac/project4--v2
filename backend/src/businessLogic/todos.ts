import { TodosAccess } from '../dataLayer/todoAcess'
import { AttachmentUtils } from '../helpers/attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
// import * as createError from 'http-errors'

// TODO: Implement businessLogic
const logger = createLogger('TodoAcess')
const attachmentUtils = new AttachmentUtils()
const todosAcess = new TodosAccess()

// Create todo function
export async function createTodo(
    userId:string,
    newTodo:CreateTodoRequest
): Promise<TodoItem> { 
    logger.info('CreateTodo funciton called')

    const todoId = uuid.v4()
    var date = new Date()
    const createdAt = date.toISOString()
    const s3AttachmentUrl = attachmentUtils.getAttachmentUrl(todoId)
    const newItem = {
        userId,
        todoId,
        createdAt,
        done: false,
        attachmentUrl: s3AttachmentUrl,
        ...newTodo
    } 
    return await todosAcess.createTodoItem(newItem)

}