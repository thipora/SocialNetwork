import Service from '../service/service.js'

export default class Controller {
    async handleRequest(req, res, next, action, table) {
        try {
            const service = new Service();
            if(table == 'users' || table == 'passwords')
                req.query.status = 1;
            const result = await service[action](table, req.query, req.body);
            return res.status(200).json(result);
        }
        catch (ex) {
            next(ex);
        }
    }
}