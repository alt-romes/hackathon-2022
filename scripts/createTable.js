const myArgs = process.argv.slice(2);

for (let i = 1; i < myArgs.length; i++) {
    myArgs[i] = myArgs[i] + " TEXT"
    if (i == 1) {
        myArgs[i] = myArgs[i] + " PRIMARY KEY";
    }
}

function stringify(arr) {
    let r = "";
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

let r = "\'CREATE TABLE " + myArgs[0] + stringify(myArgs) + "\'"
console.log(r);