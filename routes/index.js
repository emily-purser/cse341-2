const routes = require('express').Router();

// routes.use('/', (req, res) => {
//     res.send('Welcome to the home page')
// });
routes.use('/', require('./swagger.js'));
routes.use('/user', require('./user.js'));
routes.use('/games', require('./games.js'));
module.exports = routes;