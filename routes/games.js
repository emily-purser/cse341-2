const routes = require('express').Router();
const gamesController = require('../controllers/games.js');

routes.get('/', gamesController.allGames);
routes.get('/:id', gamesController.oneGame);
routes.post('/', gamesController.createGame);

module.exports = routes;