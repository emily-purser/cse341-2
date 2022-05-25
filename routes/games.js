const routes = require('express').Router();
const gamesController = require('../controllers/games.js');
const {gamesValidation} = require('../validation');

routes.get('/', gamesController.allGames);
routes.get('/:id', gamesController.oneGame);
routes.post('/', gamesController.createGame);
routes.put('/:id', gamesController.updateGame);
routes.delete('/:id', gamesController.deleteGame);


module.exports = routes;