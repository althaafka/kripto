const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

const playfair = require('./cipher/playfair');
const affine = require('./cipher/affine');
const hill = require('./cipher/hill');
const enigma = require('./cipher/enigma');

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

    let key = req.body.key && req.body.key.replace(/\s/g,'');
    let input =  req.body.input && req.body.input.replace(/\s/g,'');

    if (alg == "vigenere") {
        sendData(res, "vigenere");
    } else if (alg == "playfair") {
        sendData(res, playfair.encrypt(key, input));
    } else if (alg == "affine"){
        console.log(req.body.keyM, req.body.keyB, req.body.input);
        sendData(res, affine.encrypt(req.body.keyM, req.body.keyB, req.body.input));
    } else if (alg == "hill"){
        sendData(res, hill.encrypt(key, input));
    } else if (alg == "enigma"){
        sendData(res, enigma.encrypt(key, input));
    } else {
        sendData(res, "invalid algorithm");
    }
});

app.post("/decrypt/:alg", function (req, res) {
    const alg = req.params.alg;

    let key = req.body.key && req.body.key.replace(/\s/g,'');
    let input =  req.body.input && req.body.input.replace(/\s/g,'');
    
    if (alg == "vigenere") {
        sendData(res, "vigenere");
    } else if (alg == "playfair") {
        sendData(res, playfair.decrypt(key, input));
    } else if(alg == "affine"){
        sendData(res, affine.decrypt(req.body.keyM, req.body.keyB, req.body.input));
    } else if (alg == "hill"){
        sendData(res, hill.decrypt(key, input));
    } else if (alg == "enigma"){
        sendData(res, enigma.decrypt(key, input));
    } else {
        sendData(res, "invalid algorithm");
    }
});