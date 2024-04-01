import executeQuery from './db.js';
import generateCrudQuery from './query.js'

export default class Service {
    async getAll(table) {
        const query = await generateCrudQuery(table, "getAll");
        const result = await executeQuery(query);
        return result;
    }

    async getById(table, id) {
        const query = await generateCrudQuery(table, "getById");
        const result = await executeQuery(query, [id]);
        return result;
    }

    async create(table, item) {
        const query = await generateCrudQuery(table, "create");
        console.log(query);
        const params = Object.values(item);
        console.log(params);
        const result = await executeQuery(query, params);
        return result;
    }

    async delete(table, id) {
        const query = await generateCrudQuery(table, "delete");
        const result = await executeQuery(query, [id]);
        return result;
    }

    async update(table, id, fieldsUpdate) {
        const query = await generateCrudQuery(table, "update", fieldsUpdate);
        const params = Object.values(fieldsUpdate);
        const result = await executeQuery(query , [...params, id]);
        return result;
    }
};