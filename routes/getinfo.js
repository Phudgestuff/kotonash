const express = require('express');
const router = express.Router();
const db = require('../dbFunctions.js');

// /getInfo
router.get('/getInfo', (req, res) => {
    const id = req.cookies['userID'];
    res.json(db.getInfo(id));
});

module.exports = router;