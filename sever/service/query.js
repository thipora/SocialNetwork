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
            query = `SELECT * FROM ${DB_NAME}.${table} WHERE id = ? AND status=true`;
            break;
        case 'create':
            const queryFields = `DESC ${DB_NAME}.${table}`;
            const fieldsData = await executeQuery(queryFields);
            const fields = fieldsData.map(row => row.Field);
            const newFields = fields.filter(field => field !== 'id' && field !== 'status');
            const questionMarks = Array(newFields.length).fill('?');
            query = `INSERT INTO ${DB_NAME}.${table} (${newFields.join(', ')}) VALUES (${questionMarks.join(', ')})`;
            // for example what would happen
            //INSERT INTO DB_PROJECT.users (username, email, address, phone, status) VALUES (?, ?, ?, ?,?)
            break;
        case 'update':
            const fieldsUpdateStr = Object.keys(fieldsUpdate).map(field => `${field} = ?`).join(', ');
            query = `UPDATE ${DB_NAME}.${table} SET ${fieldsUpdateStr} WHERE id = ?`;
            // for example what would happen
            // UPDATE DB_PROJECT.users SET  email = ?, address = ? WHERE id = ?
            break;
        case 'delete':
            if(table  == 'users')
                query=`UPDATE ${DB_NAME}.${table} SET status = false WHERE id = ?`
            else
                query = `DELETE FROM ${DB_NAME}.${table} WHERE id = ?`;
            break;
        default:
            throw new Error('Invalid action');
    }
    return query;
}
