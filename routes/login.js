const express = require('express');
const router = express.Router();
const db = require('../dbFunctions.js');

// /login
router.post('/login', (req, res) => {
    const id = db.checkLogin(req.body.user, req.body.pass);
    cookieHalfLife = 1.5 // In days; Put as half life because I think it's funny
    if (id !== -1) {
        res.cookie('userID', id, {
            httpOnly: true,
            maxAge: cookieHalfLife * 172800000
        });
        res.redirect('/home.html');
    } else {
        res.redirect(`/index.html?error=${encodeURI('Username or password is invalid. Please try again.')}`)
    }
});

module.exports = router;
