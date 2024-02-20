module.exports = {
    encrypt: (input, key, numKey) => {
        return encrypt(input, key, numKey);
    },

    decrypt: (cipher, key, numKey) => {
        return decrypt(cipher, key, numKey);
    }
}

const vigenereExtended = require('./vigenere-extended.js');
const transposition = require('./transposition.js');

const encrypt = (plaintext, key, numKey) => {
    console.log("Encrypt Super", plaintext, key, numKey);
    const output = vigenereExtended.encrypt(plaintext, key);
    return transposition.encrypt(output, numKey);
};

const decrypt = (cipher, key, numKey) => {
    console.log("Decrypt Super", cipher, key, numKey);
    const output = transposition.decrypt(cipher, numKey);
    return vigenereExtended.decrypt(output, key);
}

// // Debugging
// let key = "cryptii";
// let input = "The quick brown fox jumps over 13 lazy dogs.";
// let num = 5;

// let cipher = encrypt(input, key, num);
// console.log("Encrypted:", cipher);
// let plain = decrypt(cipher, key, num);
// console.log("Decrypted:", plain);