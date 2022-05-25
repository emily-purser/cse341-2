const { check } = require('express-validator');

exports.gamesValidation = [
    check('name', 'Game name is required').not().isEmpty(),
    check('year', 'Game year is required').not().isEmpty(),
    check('players', 'Games players is required').not().isEmpty
]