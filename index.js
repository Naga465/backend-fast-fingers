const express = require("express");
const bodyparser = require("body-parser");
const path = require('path');
const loginRoutes = require('./routes/login.routes');
const registerRoute = require("./routes/register.route");
const wordRoute = require("./routes/words.route");
const gameRoutes = require('./routes/game.routes');
const cors =require('cors')
require('dotenv').config();


const app = express();
const port = process.env.PORT || 8000;

app.set('port', port);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/api', registerRoute);
app.use('/api', loginRoutes);
app.use('/api', wordRoute);
app.use('/api/game',gameRoutes)


// app.get('*', function(req, res, next){
//     res.status(404);
// });

app.get('/', function (req, res) {
  res.send('root')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

