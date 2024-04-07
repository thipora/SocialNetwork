import executeQuery from './db.js';
import getQuery from './query.js'

export default class Service {

    async get(table, queryParams) {
        if(table == 'users')
            queryParams.status = 1;
        const query = await getQuery(table, "get", queryParams);
        const result = await executeQuery(query, Object.values(queryParams));
        return result;
    }

    async create(table, queryParams, params) {
        const query = await getQuery(table, "create");
        const result = await executeQuery(query, Object.values(params));
        return result;
    }

    async delete(table, queryParams) {
        if(table=='users'){
            const res = await this.get("users", queryParams)
            const userId = res[0].id;
            await this.delete("todos", {"userId": userId});
            await this.delete("posts", {"userId": userId});
            await this.delete("comments", queryParams);
            return this.update( table, userId, { 'status': false })
        } else if(table=='posts'){
            const res = await this.get("posts", queryParams)
            const postIds = res.map(post => post.id);
            await Promise.all(postIds.map(async postId => {
                await this.delete("comments", { "postId": postId });
            }));
        }
        const query = await getQuery(table, 'delete', queryParams);
        const result = await executeQuery(query, Object.values(queryParams));
        return result;
    }

    async update(table, queryParams, params) {
        const query = await getQuery(table, "update", queryParams, params);
        const updateValues = Object.values(params);
        const whereValues = Object.values(queryParams);
        const result = await executeQuery(query,[...updateValues, ...whereValues]);
        return result;
    }
};