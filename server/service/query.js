import executeQuery from './db.js';
import dotenv from 'dotenv'
dotenv.config();

const DB_NAME = process.env.DB_NAME;

export default async function getQuery(table, action, fieldsUpdate) {
    let query = "";
    switch (action) {
        case 'getAll':
            query = `SELECT * FROM ${DB_NAME}.${table}`;
            break;
        case 'getById':
            switch(table){
                case 'todos':
                case 'posts':
                    query = `SELECT * FROM ${DB_NAME}.${table} WHERE userId = ?`;
                    break;
                case 'comments':
                    query = `SELECT * FROM ${DB_NAME}.${table} WHERE postId = ?`;
                    break;
                case 'users':
                case 'passwords':
                    query = `SELECT * FROM ${DB_NAME}.${table} WHERE email = ?`;
                    break;
                default:
                    query = `SELECT * FROM ${DB_NAME}.${table} WHERE id = ?`;
            }
            
            break;
        case 'create':
            const queryFields = `DESC ${DB_NAME}.${table}`;
            const fieldsData = await executeQuery(queryFields);
            const fields = fieldsData.map(row => row.Field);
            const newFields = fields.filter(field => field !== 'id'&&field !== 'status');
            const questionMarks = Array(newFields.length).fill('?');
            query = `INSERT INTO ${DB_NAME}.${table} (${newFields.join(', ')}) VALUES (${questionMarks.join(', ')})`;
            // INSERT INTO DB_PROJECT.users (username, email, address, phone) VALUES (?, ?, ?, ?)
            break;
        case 'update':
            const fieldsUpdateStr = Object.keys(fieldsUpdate).map(field => `${field} = ?`).join(', ');
            query = `UPDATE ${DB_NAME}.${table} SET ${fieldsUpdateStr} WHERE id = ?`;
            // UPDATE DB_PROJECT.users SET  email = ?, address = ? WHERE id = ?
            break;
        case 'delete':
            query = `DELETE FROM ${DB_NAME}.${table} WHERE id = ?`;
            break;
        default:
            throw new Error('Invalid action');
    }
    return query;
}
