import Service from '../service/service.js'

export default class Controller {
    async handleRequest(req, res, next, action, objectName) {
        try {
            const service = new Service();
            const result = await service[action](objectName, req.query, req.body);
            return res.status(200).json(result);
        }
        catch (ex) {
            next(ex);
        }
    }
}