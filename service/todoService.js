import { getTodosQuery, getTodoByIdQuery, addTodoQuery, deleteTodoQuery, updateTodoQuery } from './queryToto.js'
import executeQuery from './db.js';


export class TodoService {

    async getTodos() {
        const query = getTodosQuery();
        const result = await executeQuery(query);
        return result;
    }

    async getTodoById(id) {
        const query  = getTodoByIdQuery();
        const result =  await executeQuery(query, [id]);
        return result;
    }
    
    async addTodo(todo) {
        const query = addTodoQuery();
        const params = [todo.userId ,todo.title, todo.completed ];
        const result =  await executeQuery(query, params);
        return result;
    }

    async deleteTodo(id) {
        const { query, params } = deleteTodoQuery(id);
        const result =  await executeQuery(query, params);
        return result;
    }

    async updateTodo(id, todo) {
        const query = updateTodoQuery(id, todo);
        const result =  await executeQuery(query.updateQuery, query.params);
        return result;
    }
}