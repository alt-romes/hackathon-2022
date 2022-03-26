const myArgs = process.argv.slice(2);
var fieldNames;

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
    const id = "table_id";
    var head = myArgs.shift();
    myArgs = [id].concat(myArgs);
    myArgs.unshift(head);
    for (let i = 1; i < myArgs.length; i++) {
        if (i == 1) {
            myArgs[i] = myArgs[i] + " TEXT PRIMARY KEY AUTOINCREMENT";
        } else {
            myArgs[i] = myArgs[i] + " TEXT"
        }
    }
    fieldNames = fieldNamesFun(myArgs);
    return "CREATE TABLE " + myArgs[0] + stringify(myArgs);
}

console.log(createTable(myArgs));
console.log(fieldNames);