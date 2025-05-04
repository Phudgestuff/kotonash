const express = require('express');
const router = express.Router();
const db = require('../dbFunctions.js');
// profanity filtering
const { RegExpMatcher, englishDataset, englishRecommendedTransformers } = require('obscenity');
const matcher = new RegExpMatcher({
	...englishDataset.build(),
	...englishRecommendedTransformers,
});

function validate(str) {
    strl = str.toLowerCase();
    // check if alphanumeric (with _ and . included) and has no profanity
    if (/^[a-z._]+$/i.test(strl) && !matcher.hasMatch(strl)) {
        return true;
    } else {
        return false;
    }
}

// /register
router.post('/register', (req, res) => {
    // contains profanity
    if (!validate(req.body.user)) {
        res.redirect(`/accountCreate.html?error=${encodeURI('This username is not allowed, please pick another.')}`);
    // no password
    } else if (req.body.pass === "") {
        res.redirect(`/accountCreate.html?error=${encodeURI('No password provided.')}`);
    // too long
    } else if (req.body.user.length > 20) {
        res.redirect(`/accountCreate.html?error=${encodeURI('This username is too long.')}`);  
    // already exists          
    } else if (db.checkLogin(req.body.user.toLowerCase(), req.body.pass.toLowerCase()) !== -1) {
        res.redirect(`/accountCreate.html?error=${encodeURI('This username is taken.')}`);
    // if is appropriate
    } else {
        // add to db and tell user, send back to login page
        db.createAccount(req.body.user.toLowerCase(), req.body.pass.toLowerCase());
        res.redirect(`/index.html?msg=${encodeURI('Kotonash! account created. Please log in to your new account!')}`);
    }
});

module.exports = router;