import express from 'express';
import Service from '../service/service.js'
import 'dotenv/config'
import {createToken} from '../middleware/authenticateToken.js';

const loginController = express.Router();

loginController.post('/', async (req, res, next) => {
  try {
    const service = new Service();
    const existingUser = await service.get("passwords", req.body);

    if (Object.values(existingUser[0]) == 0) {
      res.status(401);
      return next(res);
    }

    const accessToken = createToken(req, res);
    return res.json({ accessToken: accessToken });

  } catch (error) {
    return next(error);
  }
});

export default loginController;
