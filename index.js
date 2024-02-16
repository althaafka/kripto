const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

const playfair = require('./cipher/playfair');
const { send } = require('process');

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
        sendData(res, playfair.encrypt(req.body.key, req.body.input));
    } else if (alg == "affine"){
        sendData(res, req.body);
    } else {
        sendData(res, "invalid algorithm");
    }
});

app.post("/decrypt/:alg", function (req, res) {
    const alg = req.params.alg;

    let key = req.body.key.replace(/\s/g,'') ;
    let input = req.body.input.replace(/\s/g,'') ;

    if (alg == "vigenere") {
        sendData(res, "vigenere");
    } else if (alg == "playfair") {
        sendData(res, playfair.decrypt(req.body.key, req.body.input));
    }else {
        sendData(res, "invalid algorithm");
    }
});