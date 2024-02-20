const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

const playfair = require('./cipher/playfair');
const affine = require('./cipher/affine');
const hill = require('./cipher/hill');
const enigma = require('./cipher/enigma');
const vigenere = require('./cipher/vigenere');
const autokey = require('./cipher/vigenere-autokey');
const extended = require('./cipher/vigenere-extended');
const supercipher = require('./cipher/super');
const e = require('express');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    }
);

const sendData = (res, data) => {
    res.send({
        "data": data
    });
}

app.post("/encrypt/:alg", function (req, res) {
    const alg = req.params.alg;
    let key;
    let input;

    if (alg != "super" || alg != "affine"){
        key = req.body.key;
        input =  req.body.input;
        console.log(key);
        console.log(input);
    }

    if (alg == "vigenere") {
        sendData(res, vigenere.encrypt(input, key));
    } else if (alg == "autokey") {
        sendData(res, autokey.encrypt(input, key));
    } else if (alg == "extended") {
        sendData(res, extended.encrypt(input, key));
    } else if (alg == "playfair") {
        sendData(res, playfair.encrypt(key, input));
    } else if (alg == "affine"){
        sendData(res, affine.encrypt(req.body.keyM, req.body.keyB, req.body.input));
    } else if (alg == "hill"){
        sendData(res, hill.encrypt(key, input));
    } else if (alg == "enigma"){
        sendData(res, enigma.encrypt(key, input));
    } else if (alg == "super"){
        console.log("Masuk super");
        sendData(res, supercipher.encrypt(req.body.input, req.body.key, req.body.numKey));
    } else {
        sendData(res, "invalid algorithm");
    }
});

app.post("/decrypt/:alg", function (req, res) {
    const alg = req.params.alg;
    let key;
    let input;

    if (alg != "super" || alg != "affine"){
        key = req.body.key;
        input =  req.body.input;
    }
    
    if (alg == "vigenere") {
        sendData(res, vigenere.decrypt(input, key));
    } else if (alg == "autokey") {
        sendData(res, autokey.decrypt(input, key));
    } else if (alg == "extended") {
        sendData(res, extended.decrypt(input, key));
    } else if (alg == "playfair") {
        sendData(res, playfair.decrypt(key, input));
    } else if(alg == "affine"){
        sendData(res, affine.decrypt(req.body.keyM, req.body.keyB, req.body.input));
    } else if (alg == "hill"){
        sendData(res, hill.decrypt(key, input));
    } else if (alg == "enigma"){
        sendData(res, enigma.decrypt(key, input));
    } else if (alg == "super"){
        sendData(res, supercipher.decrypt(req.body.input, req.body.key, req.body.numKey));
    } else {
        sendData(res, "invalid algorithm");
    }
});