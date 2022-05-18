const { MongoDBNamespace } = require('mongodb');
const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

//Get all games
async function allGames(req, res, next) {
    const result = await mongodb.getDb().db('cse341-2').collection('games').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    })
}

//Get one game by id
async function oneGame(req, res) {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('cse341-2').collection('games').find({ _id: userId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    })
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

module.exports = {
    allGames,
    oneGame,
    createGame
}