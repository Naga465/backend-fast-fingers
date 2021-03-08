const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { responseBody } = require('./utils/constants');
const config = require('./config');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token)
      return res.status(403).send({...responseBody,success:true, error: 'No token provided.' });
      
    jwt.verify(token, config.secretKey, function(err, decoded) {
      if (err)
      return res.status(500).send({ ...responseBody,success:true, error: 'Failed to authenticate token.' });
      req.user_id = decoded.id;
      next();
    });
  }
  
  module.exports = verifyToken;