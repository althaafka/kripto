module.exports = {
    encrypt: (m, b, input) => {
        return encrypt(m, b, input);
    },

    decrypt: (m, b, input) => {
        return decrypt(m, b, input);
    }
}

const encrypt = (m, b, input) =>{
    let result = "";
    let arr = stringToArrNumber(input);
    for (let i = 0; i < arr.length; i++) {
        result += String.fromCharCode((arr[i] * m + b) % 26 + 97);
    }
    return result;
}

const decrypt = (m, b, input) =>{
    let result = "";
    const mInverse = modInverse(m, 26);
    let arr = stringToArrNumber(input);
    for (let i=0; i < arr.length; i++){
        result += String.fromCharCode((mInverse * (arr[i] - b + 26)) % 26 + 97);
    }
    return result;
}

const stringToArrNumber = (str) => {
    let res = str.split("");
    res = res.map((val,i) => {
        return val.charCodeAt(0) - 97;
    })
    return res;
}

const modInverse = (a, m) => {
    for (let i = 1; i < m; i++){
        if ((a * i) % m == 1){
            return i;
        }
    }
    return 1;
}

// console.log(stringToArrNumber("kripto"));
// console.log(encrypt(7, 10, "kripto"));
// console.log(decrypt(7, 10, "czolne"));