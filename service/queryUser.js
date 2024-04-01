
function getUsersQuery() {
    const query = `SELECT * FROM db_project.users `;
    return query
}

function getUserByIdQuery() {
    const query = `SELECT * FROM db_project.users where id = ?`;
    return query;
}

function addUserQuery() {
    const query = `INSERT INTO db_project.users (userName, email, address, phone) VALUES (?, ?, ?, ?)`;
    return query;
}

function deleteUserQuery() {
    const query = `DELETE FROM db_project.users WHERE id = ?`;
    return query;
}

function updateUserQuery(id, user) {
    let updateQuery = `UPDATE db_project.users SET `;
    const fieldsToUpdate = [];
    const params = [];

    if (user.userName) {
        fieldsToUpdate.push(`userName = ?`);
        params.push(user.userName);
    }
    if (user.email) {
        fieldsToUpdate.push(`email = ?`);
        params.push(user.email);
    }
    if (user.address) {
        fieldsToUpdate.push(`address = ?`);
        params.push(user.address);
    }
    if (user.phone) {
        fieldsToUpdate.push(`phone = ?`);
        params.push(user.phone);
    }

    updateQuery += fieldsToUpdate.join(', ');
    updateQuery += ' WHERE id = ?';
    params.push(id);

    return { updateQuery, params };
}




// function updateUserQuery(id, user) {
//     let updateQuery = `UPDATE db_project.users SET `;
//     const fieldsToUpdate = fields.map(field => '${field.Field} = ?');
//     updateQuery += fieldsToUpdate.join(', ');
//     updateQuery += ' WHERE id = ?';
//     const params = [];

//     if (user.userName) {
//         params.push(user.userName);
//     }
//     if (user.email) {
//         params.push(user.email);
//     }
//     if (user.address) {
//         params.push(user.address);
//     }
//     if (user.phone) {
//         params.push(user.phone);
//     }

//     params.push(id);

//     return { updateQuery, params };
// }


export {
    getUsersQuery, getUserByIdQuery, addUserQuery, deleteUserQuery, updateUserQuery
}