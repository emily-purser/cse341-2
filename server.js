const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connection');
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
  };

app.use(bodyParser.json())
.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})
// .use('/', require('./routes'));
.use(auth(config));

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
})

app.use('/home', requiresAuth(), require('./routes'));

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connect to DB and listening on port ${port}`);
    }
});

