module.exports = {
    encrypt: (input, key) => {
        return encrypt(input, key);
    },

    decrypt: (cipher, key) => {
        return decrypt(cipher, key);
    }
}

// Extended Vignere standars for 256 characters
const encrypt = (input, key) => {
    const cipher = [];
    let charIdx = 0;

    for (let i = 0; i < input.length; i++) {
        const p = input[i].charCodeAt(0);
        const k = key[charIdx % key.length].charCodeAt(0);
        cipher.push(modNonNegative((p + k), 256));

        charIdx++;
    }
    return String.fromCharCode(...cipher);
}

const decrypt = (cipher, key) => {
    const plaintext = [];
    let charIdx = 0;

    for (let i = 0; i < cipher.length; i++) {
        const c = cipher[i].charCodeAt(0);
        const k = key[charIdx % key.length].charCodeAt(0);
        plaintext.push(modNonNegative((c - k), 256));
        charIdx++;
    }
    return String.fromCharCode(...plaintext);
}

const modNonNegative = (n, m) => {
    return ((n % m) + m) % m;
}

// Debugging
let key = "cryptii";
let input = "The quick brown fox jumps over 13 lazy dogs.";
let cipher = encrypt(input, key);
console.log("Encrypted:", cipher);
let plain = decrypt(cipher, key);
console.log("Decrypted:", plain);