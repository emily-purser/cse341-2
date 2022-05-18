const routes = require('express').Router();

// routes.use('/', (req, res) => {
//     res.send('Welcome to the home page')
// });
routes.use('/games', require('./games.js'));
module.exports = routes;