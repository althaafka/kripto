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
    let p = 0;

    if (typeof key === 'object') {
        key = Object.values(key).join('');
    }
    
    for (let i = 0; i < input.length; i++) {;
        if (typeof input[i] === 'object') {
            p = Object.values(input[i]);
        } else {
            p = input[i].charCodeAt(0);
        }
        const k = key[charIdx % key.length].charCodeAt(0);
        cipher.push(modNonNegative((p + k), 256));

        charIdx++;
    }
    return String.fromCharCode(...cipher);
}

const decrypt = (cipher, key) => {
    // console.log("Decrypt", cipher, key);
    const plaintext = [];
    let charIdx = 0;
    let c = 0;

    // console.log(typeof key, key)
    if (typeof key === 'object') {
        key = Object.values(key).join('');
        // console.log("Key Object", key);
    }

    for (let i = 0; i < cipher.length; i++) {
        if (typeof cipher[i] === 'string') { // Add this check
            c = cipher[i].charCodeAt(0);
        } else if (typeof cipher[i] === 'number' && cipher[i] >= 0 && cipher[i] <= 255) {
            c = cipher[i];
        } else {
            console.error('Invalid cipher character at index ' + i);
            return;
        }
        
        const k = key[charIdx % key.length].charCodeAt(0);
        plaintext.push(modNonNegative((c - k), 256));
        charIdx++;
    }
    // console.log("Plaintext", String.fromCharCode(...plaintext));
    return String.fromCharCode(...plaintext);
}


const modNonNegative = (n, m) => {
    return ((n % m) + m) % m;
}

// // Debugging
// console.log(" ------- Vigenere Extended ---------- ");
// let key = "cryptii";
// let input = "The quick brown fox jumps over 13 lazy dogs.";
// let cipher = encrypt(input, key);
// console.log("Encrypted:", cipher);
// let plain = decrypt(cipher, key);
// console.log("Decrypted:", plain);
// console.log(" ------------------------------------ ");