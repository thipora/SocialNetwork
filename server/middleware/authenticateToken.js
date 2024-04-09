import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null){
    res.sendStatus(401);
    return next();
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    return next();
  });
}

export const createToken = (req, res) => {
  try {
      const accessToken = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET);
      return accessToken;
  } catch (error) {
      console.error('Error creating token:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};