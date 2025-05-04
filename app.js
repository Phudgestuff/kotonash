const express = require('express');
const app = express();

// set up server
const port = process.env.PORT || 3000;
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

// cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// requests
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// login
const login = require('./routes/login.js');
app.use('/auth', login);
// register
const register = require('./routes/register.js');
app.use('/auth', register);

// Other cases
// 404
app.use((req, res) => {
    res.status(404).send(messages.notFound);
});
