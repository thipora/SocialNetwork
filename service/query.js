import executeQuery from './db.js';
import dotenv from 'dotenv'
dotenv.config();

const DB_NAME = process.env.DB_NAME;

export default async function generateCrudQuery(table, action, fieldsUpdate) {
    let query = "";
    switch (action) {
        case 'create':
            const queryFields = `DESC ${DB_NAME}.${table}`;
            const fieldsData = await executeQuery(queryFields);
            const fields = fieldsData.map(row => row.Field);
            // const newfieds = fields.map(({ id, ...rest }) => rest);
            const newFields = fields.filter(field => field !== 'id');
            const questionMarks = Array(newFields.length).fill('?');
            query = `INSERT INTO ${DB_NAME}.${table} (${newFields.join(', ')}) VALUES (${questionMarks.join(', ')})`;
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
