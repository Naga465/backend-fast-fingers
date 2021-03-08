const db = require("../db");
const { responseBody, INTERNAL_SERVER_ERROR } = require("../utils/constants");

function getWord(req, res) {
  let { game_level } = req.params;
  const query = `SELECT * FROM words WHERE game_level='${game_level}'`;
  db.query(query, function (err, results) {
    if (err) {
      return res.status(500).send(INTERNAL_SERVER_ERROR);
    }
    res.send({ ...responseBody, data: results, success: true });
  });
}

module.exports = getWord;
