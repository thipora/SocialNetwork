
function getUsersQuery() {
    const query = `SELECT * FROM db_project.users `;
    return query
}

function getUserByIdQuery(id) {
    const query = `SELECT * FROM db_project.users where id = ?`;
    return query;
}

function addUserQuery(user) {
    const query = `INSERT INTO db_project.users (name, email, address, phone) VALUES (?, ?, ?, ?)`;
    const params = [user.name, user.email, user.address, user.phone];
    return { query, params };
}

function deleteUserQuery(id) {
    const query = `UPDATE db_project.users SET status = 'inactive' WHERE id = ?`;
    const params = [id];
    return { query, params };
}

function updateUserQuery(id, user) {
    const query = `UPDATE db_project.users SET name = ?, email = ?, address = ?, phone = ? WHERE id = ?`;
    const params = [user.name, user.email, user.address, user.phone, id];
    return { query, params };
}

export {
    getUsersQuery, getUserByIdQuery, addUserQuery, deleteUserQuery, updateUserQuery
}