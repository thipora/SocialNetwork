import express from 'express';
import Service from '../service/service.js';
import {createToken} from '../middleware/authenticateToken.js';

const registerController = express.Router();

registerController.post('/', async (req, res, next) => {
  try {
    const service = new Service();
    
    const existingUser = await service.get("passwords", { email: req.body.email });
    if (Object.values(existingUser[0]) > 0) {
      res.status(400);
      return next(res);
    }
    await service.create("passwords", null, req.body);

    const accessToken = createToken(req, res);
    return res.json({ accessToken: accessToken });

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default registerController;
