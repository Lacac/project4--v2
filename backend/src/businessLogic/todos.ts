import { TodosAccess } from '../dataLayer/todoAcess'
import { AttachmentUtils } from '../helpers/attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import { TodoUpdate } from '../models/TodoUpdate';
// import { promises } from 'dns';
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

    // GetTodo funciton: return all todo items, that created by userId
export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
    logger.info('GetTodosForUser function called')
    return await todosAcess.getAllTodoItems(userId)
}

    // Function update
export async function updateTodo(
    userId: string, 
    todoId: string,
    todoUpdate: UpdateTodoRequest
): Promise<TodoUpdate> {
    logger.info('Update todo function called')
    return await todosAcess.updateTodoItem(userId,todoId,todoUpdate)
}

    // Function delete to do item
export async function deleteTodo(
    userId:string,
    todoId: string
): Promise<string> { 
    return todosAcess.deleteTodoItem(userId, todoId)
    } 

    // Function create presignedUrl: 
export async function createAttachmentPresignedUrl(
    todoId: string
): Promise<string> {
    return attachmentUtils.getUploadUrl(todoId)
}

    // Function delete image
export async function deleteImage(
//    userId:string,
    todoId: string
): Promise<string> {
    return todosAcess.deleteImageTodo(todoId)
}