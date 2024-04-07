import express from 'express';
import jwt from 'jsonwebtoken';
import Service from '../service/service.js'
import 'dotenv/config'

const loginController = express.Router();

loginController.post('/', async (req, res) => {

  try {
    const service = new Service();
    const result = await service.get("passwords", req.body);

    if (result.length > 0) {
      const accessToken = jwt.sign({ email: req.body.email }, process.env.ACCESS_TOKEN_SECRET);
      res.json({ accessToken: accessToken });
    } else {
      res.status(401).json({ error: 'Authentication failed' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default loginController;
