module.exports = {
    encrypt: (input, key) => {
        return encrypt(input, key);
    },

    decrypt: (cipher, key) => {
        return decrypt(cipher, key);
    }
}

// Transposition Cipher
const encrypt = (input, key) => {
    let cipher = "";

    // Generate matrix
    const matrix = [];
    const row = Math.ceil(input.length/key);
    for (let i = 0; i < row; i++) {
        const temp = [];
        for (let j = 0; j < key; j++) {
            if (i*key+j < input.length){
                temp.push(input[i*key+j]);
            } else {
                temp.push(" ");
            }
        }
        matrix.push(temp);
    }
    console.log("Matrix encrypt", matrix);

    // Read matrix by column
    for (let i = 0; i < key; i++) {
        for (let j = 0; j < row; j++) {
            if (matrix[j][i] != null) cipher += matrix[j][i];
        }
    }

    return cipher;
}

const decrypt = (cipher, key) => {
    let plaintext = "";

    // Generate matrix
    const matrix = [];
    const row = Math.ceil(cipher.length/key);
    let index = 0;
    for (let i = 0; i < key; i++) {
        const temp = [];
        let numRow = Math.floor(cipher.length/key);
        if (i < cipher.length%key) numRow++;
        for (let j = 0; j < numRow; j++) {
            temp.push(cipher[index]);
            index++;
        }
        matrix.push(temp);
    }
    console.log("Matrix decrypt", matrix);

    // Read matrix by row
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < key; j++) {
            if (matrix[j][i] != null) plaintext += matrix[j][i];
        }
    }

    return plaintext;
}

// // Debugging
// let key = 5;
// let input = "The quick brown fox jumps over 13 lazy dogs.";
// let enc = encrypt(input, key);
// console.log("Encrypted:", enc);
// let dec = decrypt(enc, key);
// console.log("Decrypted:", dec);