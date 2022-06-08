const { MongoDBNamespace } = require('mongodb');
const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

//Get all games
async function allGames(req, res, next) {
    try {
        const result = await mongodb.getDb().db('cse341-2').collection('games').find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        })
    } catch (err) {
        res.status(500).json(err);
    }
    
}

//Get one game by id
async function oneGame(req, res) {
    try {
        const userplayers = new ObjectId(req.params.players);
        const result = await mongodb.getDb().db('cse341-2').collection('games').find({ "players": "4"});
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        })
    } catch (err) {
        res.status(500).json(err);
    }
}

// Create New Contact
async function createGame(req, res){
    const newGame = {
        name: req.body.name,
        year: req.body.year,
        players: req.body.players,
        age: req.body.age,
        designer: req.body.designer,
        playtime: req.body.playtime,
        cityDesigned: req.body.cityDesigned
    };
    try {
        const result = await mongodb.getDb().db('cse341-2').collection('games').insertOne(newGame);
        res.status(200).json(result);
    } catch(err){
        res.status(500).json(err);
    }
}

// Update a Game
async function updateGame(req, res){
    const userId = new ObjectId(req.params.id);
    const game = {
        name: req.body.name,
        year: req.body.year,
        players: req.body.players,
        age: req.body.age,
        designer: req.body.designer,
        playtime: req.body.playtime,
        cityDesigned: req.body.cityDesigned
    };
    try {
        const result = await mongodb.getDb().db('cse341-2').collection('games').replaceOne({ _id: userId }, game);
        res.status(200).send();
    }catch(err){
        res.status(500).json(err);
    }
}

//Delete a game by id
async function deleteGame(req, res) {
    const userId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDb().db('cse341-2').collection('games').remove({_id: userId}, true);
        res.status(200).json(result);
    }catch(err){
        res.status(500).json(err)
    }

}

module.exports = {
    allGames,
    oneGame,
    createGame,
    updateGame,
    deleteGame
}