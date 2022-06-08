const routes = require('express').Router();
const userController = require('../controllers/user.js');
const validation = require('../middleware/validate.js');

routes.get('/', userController.allUsers);
routes.get('/:id', userController.oneUser);
routes.post('/', userController.createUser);
routes.put('/:id', userController.updateUser);
routes.delete('/:id', userController.deleteUser);


module.exports = routes;