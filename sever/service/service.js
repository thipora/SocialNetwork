import executeQuery from './db.js';
import getQuery from './query.js'

export default class Service {
    async getAll(table) {
        const query = await getQuery(table, "getAll");
        const result = await executeQuery(query, null);
        return result;
    }

    async getById(table, id) {
        const query = await getQuery(table, "getById");
        const result = await executeQuery(query, [id]);
        return result;
    }

    async create(table, item) {
        const query = await getQuery(table, "create");
        const params = Object.values(item);
        const result = await executeQuery(query, params);
        return result;
    }

    async delete(table, id) {
        const query = await getQuery(table, "delete");
        const result = await executeQuery(query, [id]);
        return result;
    }

    async update(table, id, fieldsUpdate) {
        const query = await getQuery(table, "update", fieldsUpdate);
        const params = Object.values(fieldsUpdate);
        const result = await executeQuery(query , [...params, id]);
        return result;
    }
};