const express = require('express');
const app = express();
const HTTP_PORT = 8000;
//DB type shit
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'database.db');
//
const myArgs = process.argv.slice(2);
var fieldNames;

let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error(err.message);
    } else {
        console.log('Connected to the in-memory SQLite database.');
        if (myArgs.length > 0) {
            db.run(createTable(myArgs));
            (err) => {
                if (err) {
                    console.log('Table already created')
                }
            }
        }
    }
});

//app.use(cors());

app.get("/", (req, res, next) => { //Ir a db pedir table inteira
    var sql = "SELECT * from " + fieldNames[0];
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "Error:": err.message });
            return;
        }
        res.json({
            "data": rows,
        });
    })
});

app.post("/", (req, res, next) => {
    var data = req.body;
    var sql = "INSERT INTO " + fieldNames[0] + stringifyWithValues(fieldNames);
    var param = fieldNames.slice(1);
    db.run(sql, param, function (err, result) {
        if (err) {
            res.status(400).json({ "Error:": err.message });
            return;
        }
        res.json({
            "data": data,
        })
    })
});

app.use(function (req, res) {
    res.status(404);
});

app.listen(HTTP_PORT, () => { console.log("Server running on port %HTTP_PORT%".replace("%HTTP_PORT%", HTTP_PORT)) });

function stringify(arr) {
    let r = "";
    let values = "";
    for (let i = 1; i < arr.length; i++) {
        if (i == 1) {
            r = r + "("
        }
        r = r + arr[i];
        if (i != arr.length - 1) {
            r = r + ", ";
        } else {
            r = r + ");"
        }

    }
    return r;
}

function stringifyWithValues(arr) {
    let r = stringify(arr);
    r += "VALUES ("
    for (let i = 1; i < arr.length; i++) {
        r += "?";
        if (i != arr.length - 1) {
            r += ",";
        } else {
            r += ")"
        }
    }
}

function fieldNamesFun(myArgs) {
    for (let i = 1; i < myArgs.length; i++) {
        myArgs[i] = myArgs[i];
        if (i == 1) {
            myArgs[i] = myArgs[i];
        }
    }
    return myArgs;
}

function createTable(myArgs) {
    for (let i = 1; i < myArgs.length; i++) {
        myArgs[i] = myArgs[i] + " TEXT"
        if (i == 1) {
            myArgs[i] = myArgs[i] + " PRIMARY KEY";
        }
    }
    fieldNames = fieldNamesFun(myArgs);
    return "\'CREATE TABLE " + myArgs[0] + stringify(myArgs) + "\'";
}

