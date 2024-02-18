const math = require('mathjs');

module.exports = {
    encrypt: (key, input) => {
        return encrypt(key, input);
    },

    decrypt: (key, input) => {
        return decrypt(key, input);
    }
}

const encrypt = (key, input) => {
    let keyMatrix = strToMatrix(key, true)
    let inputMatrix = strToMatrix(input, false)

    let result = []

    for (let i=0; i<inputMatrix.length; i++){
        let temp = []
        inputMatrix[i].map(x => temp.push(x))
        math.multiply(keyMatrix, temp).map(
            x => result.push(String.fromCharCode(x % 26 + 97))
        )
    }

    return result.toString().replaceAll(',','');
}

const decrypt = (key, input) => {
    let keyMatrix = strToMatrix(key, true)
    let inputMatrix = strToMatrix(input, false)

    let detK = math.det(keyMatrix)
    console.log(detK)
    let kInverse = math.round(math.multiply(detK, math.inv(keyMatrix)))
    detK = math.invmod(detK % 26, 26)
    console.log(detK)
    console.log(math.multiply(math.mod(kInverse, 26), detK))
    kInverse = math.multiply(math.mod(kInverse, 26), detK)

    let result = []

    for (let i=0; i<inputMatrix.length; i++){
        let temp = []
        inputMatrix[i].map(x => temp.push(x))
        math.multiply(kInverse, temp).map(
            x => result.push(String.fromCharCode(x % 26 + 97))
        )
    }

    return result.toString().replaceAll(',','');
}

const strToMatrix = (str, isKey) =>{
    while (str.length % 3 != 0) str+="x"
    let result = []
    const iMax = isKey? 3 : (str.length/3);
    for (let i=0; i<iMax; i++){
        let row = []
        for (let j=0; j<3; j++){
            row.push(str.charCodeAt(i*3 + j) - 97)
        }
        result.push(row)
    }
    return result
}


// console.log(encrypt("rrfvsvcct", "paymoremoney"))
// console.log(decrypt("rrfvsvcct", "lnshdlewmtrw"))
// console.log(encrypt("gybnqkurp", "act"))
// console.log(decrypt("gybnqkurp", "poh"))

// console.log(encrypt("kolsahpon", "pakaian"))
// console.log(decrypt("kolsahpon", "acriaidfk"))