const Database = require('better-sqlite3');
const db = new Database('logins.sqlite');

// create, init table
db.prepare("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, password TEXT)").run();

export function addLogin() {
    
}