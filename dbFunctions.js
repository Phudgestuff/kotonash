const Database = require('better-sqlite3');
const crypto = require('crypto');
const db = new Database('account.sqlite');

// create, init table
db.prepare(`CREATE TABLE IF NOT EXISTS
    users (id INTEGER PRIMARY KEY,
    username TEXT,
    password TEXT);
`).run();

function checkLogin(username, password) {
    let passHash = crypto.createHash('sha256').update(password).digest('hex');
    resultID = db.prepare(`SELECT id FROM users
        WHERE username = ? AND password = ?`).get(username, passHash);
    if (resultID) {
        return resultID.id;
    } else {
        return -1;
    }
}

function createAccount(username, password) {
    try {
        let passHash = crypto.createHash('sha256').update(password).digest('hex');
        db.prepare(`INSERT INTO users (username, password)
            values(?, ?);`
        ).run(username, passHash);
        return true;
    } catch {
        return false;
    }
}

module.exports = {
    checkLogin,
    createAccount
};