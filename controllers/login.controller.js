const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const db = require("../db");
const { responseBody, INTERNAL_SERVER_ERROR } = require("../utils/constants");
const register = require("./register.controller");

exports.login = (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM Users WHERE username='${username}'`;
  db.query(query, function (err, results) {
    if (err) return res.status(500).send(INTERNAL_SERVER_ERROR);
    if (!results.length) {
      register(req, res);
      return;
    }
    const [user] = results;
    let isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .send({ ...responseBody, error: "Invalid Password" });
    }
    const token = jwt.sign({ id: user.user_id }, config.secretKey, {
      expiresIn: 24 * 60 * 60,
    });
    res.send({
      ...responseBody,
      success: true,
      data: { name: user.username, user_id: user.user_id, token },
    });
  });
};
