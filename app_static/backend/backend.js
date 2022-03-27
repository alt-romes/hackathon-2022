const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const HTTP_PORT = 8000;
var jsonParser = bodyParser.json()
//DB type shit
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'database.db');
var myArgs = process.argv.slice(2);
myArgs = myArgs.join().split(",");
var fieldNames;

let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error(err.message);
    } else {
        console.log('Connected to the in-memory SQLite database.');
        console.log(myArgs.length);
        if (myArgs.length > 0) {
            console.log("CREATE TABLE")
            db.run(createTable(myArgs));
            console.log("Tabela de pé");
            (err) => {
                if (err) {
                    console.log('Table already created')
                }
            }
        }
    }
});

app.use(cors({ origin: "http://localhost:3000" }));

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

function paramConstructor(req) {

    return param;
}

app.post("/", jsonParser, (req, res, next) => {
    let data = req.body;
    let param = [];
    for (let i = 0; i < myArgs.length; i++) {
        param.push(req.body[myArgs[i]]);
    }
    console.log(param);
    console.log(req.body);
    var sql = "INSERT INTO " + fieldNames[0] + stringifyWithValues(fieldNames);
    console.log("PEDIDO SQL: " + sql)
    db.run(sql, param, function (err, result) {
        if (err) {
            res.status(400).json({ "Error:": err.message });
            return;
        }
        res.send({
            "data:": data
        })
    })
});

app

/*function paramCompleter(req) {
    let param = "";
    for (let i = 2; i < fieldNames.length; i++) {
        param += req.body[fieldNames[i]];
    }
    console.log(param);
    return param;
}*/
app.use(function (req, res) {
    res.status(404);
});

app.listen(HTTP_PORT, () => { console.log("Server running on port %HTTP_PORT%".replace("%HTTP_PORT%", HTTP_PORT)) });

function stringifyForInsert() {
    let r = "";
    for (let i = 0; i < myArgs.length; i++) {
        if (i == 0) {
            r = r + "("
        }
        r = r + "\"" + myArgs[i] + "\"";
        if (i != myArgs.length - 1) {
            r = r + ", ";
        } else {
            r = r + ")"
        }
    }
    return r;
}

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
            r = r + ")"
        }
    }
    return r;
}

function stringifyWithValues(arr) {
    let r = stringifyForInsert();
    console.log(r);
    r += " VALUES ("
    for (let i = 2; i < arr.length; i++) {
        r += "?";
        if (i != arr.length - 1) {
            r += ",";
        } else {
            r += ")"
        }
    }
    return r;
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
    const id = "id";
    var head = myArgs.shift();
    myArgs = [id].concat(myArgs);
    myArgs.unshift(head);
    for (let i = 1; i < myArgs.length; i++) {
        if (i == 1) {
            myArgs[i] = myArgs[i] + " INTEGER PRIMARY KEY AUTOINCREMENT";
        } else {
            myArgs[i] = "\"" + myArgs[i] + "\"" + " TEXT";
        }
    }
    fieldNames = fieldNamesFun(myArgs);
    console.log(fieldNames)
    return "CREATE TABLE IF NOT EXISTS " + myArgs[0] + stringify(myArgs);
}

