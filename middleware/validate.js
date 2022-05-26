const validator = require('../validation.js');

const saveGame = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        year: 'required|string',
        players: 'required|string',
        age: 'required|string',
        designer: 'string',
        cityDesigned: 'string',
        playtime: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if(!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveGame
};
