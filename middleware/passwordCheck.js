const { validationResult } = require("express-validator")

module.exports.passwordCheck = (password) => {
    return validationResult(password);
}