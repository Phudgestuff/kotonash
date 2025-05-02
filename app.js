const express = require('express');
const Database = require('better-sqlite3');
const dbFunc = require('dbFunctions.js');

const app = express();
const db = new Database('accounts.sqlite')


// set up server
const port = 3000;
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});

// serve index.html
app.use(express.static('public'));

// init message
const messages = require('./messages.js');
app.get('/', (req, res) => {
    res.send(messages.home);
});

// requests
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// /test
app.post('/login', (req, res) => {
    console.log(req.body.user);
    console.log(req.body.pass);
    res.send('logged in');
});

// Other cases
// 404
app.use((req, res) => {
    res.status(404).send(messages.notFound);
});