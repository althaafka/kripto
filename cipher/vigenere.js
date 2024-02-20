module.exports = {
    encrypt: (input, key) => {
        return encrypt(input, key);
    },

    decrypt: (cipher, key) => {
        return decrypt(cipher, key);
    }
}

// Vignere standars for 26 alphabets
const encrypt = (input, key) => {
    console.log("-- Input", input);
    console.log("-- Key", key);
    const cipher = [];
    let charIdx = 0;

    // // Remove non-alphabets and convert to lowercase
    // input = input.toLowerCase().replace(/[^a-z]/g, '');
    // key = key.toLowerCase().replace(/[^a-z]/g, '');

    for (let i = 0; i < input.length; i++) {
        const p = input[i].charCodeAt(0) - 97;
        const k = key[charIdx % key.length].charCodeAt(0) - 97;
        cipher.push(modNonNegative((p + k), 26));

        // Make cipher all uppercase
        cipher[charIdx] += 65;

        charIdx++;
    }
    console.log("-- Cipher", cipher);
    return String.fromCharCode(...cipher);
}

const decrypt = (cipher, key) => {
    const plaintext = [];
    let charIdx = 0;

    // // Remove non-alphabets and convert to lowercase
    // cipher = cipher.toLowerCase().replace(/[^a-z]/g, '');
    // key = key.toLowerCase().replace(/[^a-z]/g, '');

    for (let i = 0; i < cipher.length; i++) {
        const c = cipher[i].charCodeAt(0) - 97;
        const k = key[charIdx % key.length].charCodeAt(0) - 97;
        plaintext.push(modNonNegative((c - k), 26));

        // Make plain all lowercase
        plaintext[charIdx] += 97;

        charIdx++;
    }
    return String.fromCharCode(...plaintext);
}

const modNonNegative = (n, m) => {
    return ((n % m) + m) % m;
}

// // Debugging
// let key = "cryptii";
// let input = "The quick brown fox jumps over 13 lazy dogs.";
// let cipher = encrypt(input, key);
// console.log("Encrypted:", cipher);
// let plain = decrypt(cipher, key);
// console.log("Decrypted:", plain); 