const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const db = require("../db");
const { responseBody, INTERNAL_SERVER_ERROR } = require("../utils/constants");

function register(req, res) {
  const { username, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);
  const query = `INSERT INTO USERS (username,password) VALUES ('${username}', '${hashPassword}')`;

  db.query(query, function (err, user) {
    if (err) {
      return res
        .status(500)
        .send(INTERNAL_SERVER_ERROR);
    }
    const token = jwt.sign({ id: user.user_id }, config.secretKey, {
      expiresIn: 86400, //  24 * 60 * 60
    });
    const data = {
      user_id: user.insertId,
      name: username,
      token,
    };
    res.send({
      ...responseBody,
      success: true,
      data,
    });
  });
}

module.exports = register;
