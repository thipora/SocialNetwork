import Service from '../service/service.js'

export default class Controller {
    async handleRequest(req, res, next, action, objectName) {
        try {
            const service = new Service();
            let result;
            switch (action) {
                case 'getAll':
                    result = await service.getAll(objectName);
                    break;
                case 'getById':
                    result = await service.getById(objectName, req.params.id);
                    break;
                case 'create':
                    result = await service.create(objectName, req.body);
                    break;
                case 'delete':
                    result = await service.delete(objectName, req.params.id);
                    break;
                case 'update':
                    result = await service.update(objectName, req.params.id, req.body);
                    break;
                default:
                    throw new Error('Invalid action');
            }
            return res.status(200).json(result);
        }
        catch (ex) {
            const err = {};
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }
}