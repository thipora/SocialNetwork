import executeQuery from './db.js';
import dotenv from 'dotenv'
dotenv.config();

const DB_NAME = process.env.DB_NAME;

export default async function getQuery(table, action, queryParams, params) {
    let query = "";
    switch (action) {
        case 'getAll':
            query = `SELECT * FROM ${DB_NAME}.${table}`;
            break;
        case 'get':
            query = `SELECT * FROM ${DB_NAME}.${table}`;
            if(table=='passwords')
                query = `SELECT COUNT(*) FROM ${DB_NAME}.${table}`;
            
            if (Object.keys(queryParams).length > 0) {
                const conditions = [];
                Object.keys(queryParams).forEach(param => {
                    if (param !== 'sort' && param !== 'limit' && param !== 'page') {
                        conditions.push(`${param} = ?`);
                    }
                });
        
                if (conditions.length > 0) {
                    query += ` WHERE ${conditions.join(' AND ')}`;
                }
        
                if (queryParams.sort) {
                    query += ` ORDER BY ${queryParams.sort}`;
                }
                if (queryParams.limit && queryParams.page) {
                    const offset = (queryParams.page - 1) * queryParams.limit;
                    query += ` LIMIT ${queryParams.limit} OFFSET ${offset}`;
                }
            }
            break;

        case 'create':
            const queryFields = `DESC ${DB_NAME}.${table}`;
            const fieldsData = await executeQuery(queryFields);
            const fields = fieldsData.map(row => row.Field);
            const newFields = fields.filter(field => field !== 'id'&&field !== 'status');
            const questionMarks = Array(newFields.length).fill('?');
            query = `INSERT INTO ${DB_NAME}.${table} (${newFields.join(', ')}) VALUES (${questionMarks.join(', ')})`;
            break;

        case 'delete':
            query = `DELETE FROM ${DB_NAME}.${table}`;
            const conditions = [];
            Object.keys(queryParams).forEach(param => {
                conditions.push(`${param} = ?`);
            });
            if (conditions.length > 0) {
                query += ` WHERE ${conditions.join(' AND ')}`;
            }
            break;

        case 'update':
            const fieldsUpdateStr = Object.keys(params).map(field => `${field} = ?`).join(', ');
            const whereConditions = Object.keys(queryParams).map(param => `${param} = ?`).join(' AND ');
            query = `UPDATE ${DB_NAME}.${table} SET ${fieldsUpdateStr} WHERE ${whereConditions}`;        
            break;

        default:
            throw new Error('Invalid action');
    }
    return query;
}
