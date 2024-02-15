const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    }
);

const sendData = (res, data) => {
    res.send({
        data: data
    })
}

app.post("/encrypt/:alg", function (req, res) {
    const alg = req.params.alg;

    if (alg == "vigenere") {
        sendData(res, "Vigenerehj");
    } else {
        sendData(res, "dcfda");
    }
});