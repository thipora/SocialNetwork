import executeQuery from './db.js';
import getQuery from './query.js'

export default class Service {

    async getAll(table, queryParams) {
        const query = await getQuery(table, "getAll");
        const result = await executeQuery(query, null);
        return result;
    }

    async get(table, queryParams) {
        const query = await getQuery(table, "get", queryParams);
        const result = await executeQuery(query, Object.values(queryParams));
        return result;
    }

    async create(table, queryParams, params) {
        if(table == 'users' || table == 'passwords'){
            const result = await this.get(table, {"email": params.email,"status":0});
            if((table == 'users'&&result[0])||(table == 'passwords'&&Object.values(result[0]) == 1)){
                params.status=1;
                return this.update(table,  {"email": params.email}, params);
            }
        }
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
            await this.delete("comments", {"email": queryParams.email});
            await this.delete("passwords", queryParams);
            return this.update( table, queryParams, { 'status': false })
        } else if(table=='posts'){
            const res = await this.get("posts", queryParams)
            const postIds = res.map(post => post.id);
            await Promise.all(postIds.map(async postId => {
                await this.delete("comments", { "postId": postId });
            }));
        } else if(table=='passwords'){
            return this.update( table, queryParams, { 'status': false })
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