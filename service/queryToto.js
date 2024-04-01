
function getTodosQuery() {
    const query = `SELECT * FROM db_project.todos `;
    return query
}

function getTodoByIdQuery() {
    const query = `SELECT * FROM db_project.todos where id = ?`;
    return query;
}

function addTodoQuery() {
    const query = `INSERT INTO db_project.todos (userId, title, completed) VALUES (?, ?, ?)`;
    return query;
}

function deleteTodoQuery() {
    const query = `DELETE FROM db_project.todos WHERE id = ?`;
    return query;
}

function updateTodoQuery(id, todo) {
    let updateQuery = `UPDATE db_project.todos SET `;
    const fieldsToUpdate = [];
    const params = [];

    if (todo.userId) {
        fieldsToUpdate.push(`userId = ?`);
        params.push(todo.userId);
    }
    if (todo.title) {
        fieldsToUpdate.push(`title = ?`);
        params.push(todo.title);
    }
    if (todo.completed!=undefined) {
        fieldsToUpdate.push(`completed = ?`);
        params.push(todo.completed);
    }

    updateQuery += fieldsToUpdate.join(', ');
    updateQuery += ' WHERE id = ?';
    params.push(id);

    return { updateQuery, params };
}

export {
    getTodosQuery, getTodoByIdQuery, addTodoQuery, deleteTodoQuery, updateTodoQuery
}