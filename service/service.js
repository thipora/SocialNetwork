import executeQuery from './db.js';
import generateCrudQuery from './query.js'

export default class Service {
    async getAll(table) {
        const query = generateCrudQuery(table, "getAll");
        const result = await executeQuery(query);
        return result;
    }

    async getById(table, id) {
        const query = generateCrudQuery(table, "getById");
        const result = await executeQuery(query, [id]);
        return result;
    }

    async create(table, item) {
        const query = generateCrudQuery(table, "create");
        const params = Object.values(item);
        const result = await executeQuery(query, params);
        return result;
    }

    async delete(table, id) {
        const query = generateCrudQuery(table, "delete");
        const result = await executeQuery(query, [id]);
        return result;
    }

    async update(table, id, fieldsUpdate) {
        const query = generateCrudQuery(table, "update", fieldsUpdate);
        const params = Object.values(fieldsUpdate);
        const result = await executeQuery(query , {id, ...params});
        return result;
    }
};