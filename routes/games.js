const routes = require('express').Router();
const gamesController = require('../controllers/games.js');
const validation = require('../middleware/validate.js');

routes.get('/', gamesController.allGames);
routes.get('/:id', gamesController.oneGame);
routes.post('/', validation.saveGame, gamesController.createGame);
routes.put('/:id', validation.saveGame, gamesController.updateGame);
routes.delete('/:id', gamesController.deleteGame);


module.exports = routes;