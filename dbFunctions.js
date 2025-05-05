const Database = require('better-sqlite3');
const crypto = require('crypto');
const db = new Database('account.sqlite');

// create, init table
db.prepare(`CREATE TABLE IF NOT EXISTS
    users (id INTEGER PRIMARY KEY,
    username TEXT,
    password TEXT,
    balance INTEGER);
`).run();

// check if username and password are in db
function checkLogin(username, password) {
    // hash the password for securityoo
    let passHash = crypto.createHash('sha256').update(password).digest('hex');
    resultID = db.prepare(`SELECT id FROM users
        WHERE username = ? AND password = ?`).get(username, passHash);
    if (resultID) {
        return resultID.id;
    } else {
        return -1;
    }
}

// add username and password to db
function createAccount(username, password) {
    try {
        // hash password for security
        let passHash = crypto.createHash('sha256').update(password).digest('hex');
        // insert into db
        // default balance: 0
        db.prepare(`INSERT INTO users (username, password, balance)
            values(?, ?, 0);`
        ).run(username, passHash);
        return true;
    } catch {
        // if it fails
        return false;
    }
}

// get info via userID
function getInfo(id) {
    const info = db.prepare(`SELECT username, balance FROM users
        WHERE id = ?`).get(id);
    return { username: info.username, balance: info.balance };
}

module.exports = {
    checkLogin,
    createAccount,
    getInfo
};