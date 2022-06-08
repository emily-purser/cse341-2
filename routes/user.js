const routes = require('express').Router();
const userController = require('../controllers/user.js');
const validation = require('../middleware/validate.js');

routes.get('/', userController.allUsers);
routes.get('/:username', userController.oneUser);
routes.post('/', userController.createUser);
routes.put('/:username', userController.updateUser);
routes.delete('/:username', userController.deleteUser);


module.exports = routes;