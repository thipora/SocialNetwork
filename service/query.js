import executeQuery from './db.js';
import dotenv from 'dotenv'
dotenv.config();

const DB_NAME = process.env.DB_NAME;

async function getQueryFields(table){
    const queryFields = `DESC ${DB_NAME}.${table}`;
    return await executeQuery(queryFields);
}

export default function generateCrudQuery(table, action, fieldsUpdate) {
    let query = "";
    switch (action) {
        case 'create':
            const queryFields = getQueryFields(table);
            queryFields = queryFields.then(result => result);
            const fields = queryFields.map(row => row.Field).join(', ');
            const questionMarks = Array(fields.length).fill('?').join(', ');
            query = `INSERT INTO ${DB_NAME}.${table} (${fields}) VALUES (${questionMarks})`;
            break;
        case 'getAll':
            query = `SELECT * FROM ${DB_NAME}.${table}`;
            break;
        case 'getById':
            query = `SELECT * FROM ${DB_NAME}.${table} WHERE id = ?`;
            break;
        case 'update':
            const fieldsUpdateStr = Object.keys(fieldsUpdate).map(field => `${field} = ?`).join(', ');
            query = `UPDATE ${DB_NAME}.${table} SET ${fieldsUpdateStr} WHERE id = ?`;
            break;
        case 'delete':
            query = `DELETE FROM ${DB_NAME}.${table} WHERE id = ?`;
            break;
        default:
            throw new Error('Invalid action');
    }
    return query;
}
