// import { UserService } from '../service/userService.js'

// export default class UserController {

//     async getUsers(req, res, next) {
//         try {
//             const userService = new UserService();
//             const resultItems = await userService.getUsers();
//             return res.status(200).json(resultItems);
//         }
//         catch (ex) {
//             const err = {}
//             err.statusCode = 500;
//             err.message = ex;
//             next(err)
//         }
//     }

//     async getUserById(req, res, next) {
//         try {
//             const userService = new UserService();
//             const resultItem = await userService.getUserById(req.params.id);
//             res.status(200).json({ status: 200, data: resultItem });
//         }
//         catch (ex) {
//             const err = {}
//             err.statusCode = 500;
//             err.message = ex;
//             next(err)
//         }
//     }

//     async addUser(req, res, next) {
//         try {
//             const userService = new UserService();
//             await userService.addUser(req.body);
//             res.status(200).json({ status: 200 });
//         }
//         catch (ex) {
//             const err = {}
//             err.statusCode = 500;
//             err.message = ex;
//             next(err)
//         }
//     }

//     async deleteUser(req, res, next) {
//         try {
//             const userService = new UserService();
//             await userService.deleteUser(req.params.id);
//             res.status(200).json({ status: 200, data: req.params.id });
//         }
//         catch (ex) {
//             const err = {}
//             err.statusCode = 500;
//             err.message = ex;
//             next(err)
//         }
//     }

//     async updateUser(req, res, next) {
//         try {
//             const userService = new UserService();
//             await userService.updateUser(req.params.id, req.body);
//             res.status(200).json({ status: 200, data: req.params.id });
//         }
//         catch (ex) {
//             const err = {}
//             err.statusCode = 500;
//             err.message = ex;
//             next(err)
//         }
//     }
// }



// import Service from '../service/service.js'

// export default class UserController {

//     async getUsers(req, res, next) {
//         try {
//             const service = new Service();
//             const resultItems = await service.getAll("users");
//             return res.status(200).json(resultItems);
//         }
//         catch (ex) {
//             const err = {}
//             err.statusCode = 500;
//             err.message = ex;
//             next(err)
//         }
//     }

//     async getUserById(req, res, next) {
//         try {
//             const service = new Service();
//             const resultItem = await service.getById("users", req.params.id);
//             res.status(200).json({ status: 200, data: resultItem });
//         }
//         catch (ex) {
//             const err = {}
//             err.statusCode = 500;
//             err.message = ex;
//             next(err)
//         }
//     }

//     async addUser(req, res, next) {
//         try {
//             const service = new Service();
//             await service.create("users", req.body);
//             res.status(200).json({ status: 200 });
//         }
//         catch (ex) {
//             const err = {}
//             err.statusCode = 500;
//             err.message = ex;
//             next(err)
//         }
//     }

//     async deleteUser(req, res, next) {
//         try {
//             const service = new Service();
//             await service.delete("users", req.params.id);
//             res.status(200).json({ status: 200, data: req.params.id });
//         }
//         catch (ex) {
//             const err = {}
//             err.statusCode = 500;
//             err.message = ex;
//             next(err)
//         }
//     }

//     async updateUser(req, res, next) {
//         try {
//             const service = new Service();
//             await service.update("users", req.params.id, req.body);
//             res.status(200).json({ status: 200, data: req.params.id });
//         }
//         catch (ex) {
//             const err = {}
//             err.statusCode = 500;
//             err.message = ex;
//             next(err)
//         }
//     }
// }


import Service from '../service/service.js'

export default class UserController {
    async handleRequest(req, res, next, action) {
        try {
            const service = new Service();
            let result;
            switch (action) {
                case 'getUsers':
                    result = await service.getAll("users");
                    break;
                case 'getUserById':
                    result = await service.getById("users", req.params.id);
                    break;
                case 'addUser':
                    result = await service.create("users", req.body);
                    break;
                case 'deleteUser':
                    result = await service.delete("users", req.params.id);
                    break;
                case 'updateUser':
                    result = await service.update("users", req.params.id, req.body);
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
