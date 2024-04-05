import executeQuery from './db.js';
import getQuery from './query.js'

export default class Service {

    async get(table, params) {
        const query = await getQuery(table, "get", params);
        const result = await executeQuery(query, Object.values(params));
        return result;
    }

    async create(table, params) {
        const query = await getQuery(table, "create");
        const result = await executeQuery(query, Object.values(params));
        return result;
    }

    async delete(table, param) {
        if(table=='users'){
            const res = await this.get("users", param)
            const userId = res[0].id;
            await this.delete("todos", {"userId": userId});
            await this.delete("posts", {"userId": userId});
            await this.delete("comments", param);
            await this.delete("passwords", param);

        } else if(table=='posts'){
            const res = await this.get("posts", param)
            const postIds = res.map(post => post.id);
            await Promise.all(postIds.map(async postId => {
                await this.delete("comments", { "postId": postId });
            }));
        
        }
        const query = await getQuery(table, "delete", param);
        const result = await executeQuery(query, Object.values(param));
        return result;
    }

    async update(table, id, fieldsUpdate) {
        const query = await getQuery(table, "update", fieldsUpdate);
        const params = Object.values(fieldsUpdate);
        const result = await executeQuery(query , [...params, id]);
        return result;
    }
};