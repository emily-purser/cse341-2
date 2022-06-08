const { MongoDBNamespace } = require('mongodb');
const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;
const passwordUtil = require('../middleware/passwordCheck');

//Get all Users
async function allUsers(req, res, next) {
    try {
        const result = await mongodb.getDb().db('cse341-2').collection('user').find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        })
    } catch (err) {
        res.status(500).json(err);
    }
    
}

//Get one user by username
async function oneUser(req, res) {
    try {
        const result = await mongodb.getDb().db('cse341-2').collection('user').find({ "username": req.params.username});
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        })
    } catch (err) {
        res.status(500).json(err);
    }
}

// Create New Contact
async function createUser(req, res){
    try {
        if (!req.body.username || !req.body.password) {
            res.status(400).send({message: 'Username and Password cannot by empty!'});
            return;
        }
        const password = req.body.password;
        const checkPassword = passwordUtil.passwordCheck(password);
        if(checkPassword.error) {
            res.status(400).send({message: checkPassword.error});
            return;
        }
        const newUser = {
            username: req.body.username,
            password: password
        };
        const result = await mongodb.getDb().db('cse341-2').collection('user').insertOne(newUser);
        res.status(200).json(result);

    } catch (err) {
        res.status(500).json(err);
    }
}

// Update a User
async function updateUser(req, res){
    try {
        if (!req.body.username || !req.body.password) {
            res.status(400).send({message: 'Username and Password cannot by empty!'});
            return;
        }
        const password = req.body.password;
        const checkPassword = passwordUtil.passwordCheck(password);
        if(checkPassword.error) {
            res.status(400).send({message: checkPassword.error});
            return;
        }
        const newUser = {
            username: req.body.username,
            password: password
        };
        const result = await mongodb.getDb().db('cse341-2').collection('user').replaceOne({"username": req.params.username}, newUser);
        res.status(200).json(result);

    } catch (err) {
        res.status(500).json(err);
    }
}

//Delete a user by id
async function deleteUser(req, res) {
    const username = req.params.username;
    if(!username) {
        res.status(400).send({message: 'Invalid Username Supplied'});
    }
    try {
        const result = await mongodb.getDb().db('cse341-2').collection('user').remove({"username": req.params.username}, true);
        res.status(200).json(result);
    }catch(err){
        res.status(500).json(err)
    }

}

module.exports = {
    allUsers,
    oneUser,
    createUser,
    updateUser,
    deleteUser
}