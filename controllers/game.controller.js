const db = require("../db");
const { responseBody, INTERNAL_SERVER_ERROR } = require("../utils/constants");

async function updateGameHistory(req, res) {
  const { score } = req.body;
  const { user_id} =req
  const query = `INSERT INTO games (id,score) VALUES (${user_id},'${score}')`;
  db.query(query, function (err, results) {
    if (err) {
      return res.status(500).send(INTERNAL_SERVER_ERROR);
    }
    res.send({
      ...responseBody,
      data: score,
    });
  });
}

function getGameHistory(req, res) {
  const { user_id } = req;
  const query = `SELECT * FROM games WHERE id=${user_id}`;
  db.query(query, function (err, results) {
    if (err) {
      return res.status(500).send(INTERNAL_SERVER_ERROR);
    }
    const scores = results.map((item) => item.score);
    res.send({
      ...responseBody,
      data: scores,
    });
  });
}

module.exports = {
  updateGameHistory: updateGameHistory,
  getGameHistory: getGameHistory,
};
