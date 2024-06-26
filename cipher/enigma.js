module.exports = {
    encrypt: (key, input) => {
        return encrypt(key, input);
    },

    decrypt: (key, input) => {
        return decrypt(key, input);
    }
}

let rotor1 = "nxjzfvhyqcmsbadlpueigkrotw"
let rotor2 = "frmlubvyqgazpstjhxwiokcedn"
let rotor3 = "udtlozjmxgsyprhqvfwbaecnik"
let spinCount = 0

const encrypt = (key, input) => {
    resetRotor()
    changeRotor(key)

    let result = []

    for (let i=0; i<input.length; i++){
        let temp = input[i].charCodeAt(0)-97
        temp = rotor1[temp]
        temp = rotor2[temp.charCodeAt(0)-97]
        temp = rotor3[temp.charCodeAt(0)-97]
        result.push(temp)
        spinRotor()
    }

    return result.toString().replaceAll(',','')
}

const decrypt = (key, input) => {
    resetRotor()
    changeRotor(key)
    
    let result = []

    for (let i=0; i<input.length; i++){
        let temp = rotor3.indexOf(input[i])
        temp = String.fromCharCode(temp+97)
        temp = rotor2.indexOf(temp)
        temp = String.fromCharCode(temp+97)
        temp = rotor1.indexOf(temp)
        temp = String.fromCharCode(temp+97)
        result.push(temp)
        spinRotor()
    }

    return result.toString().replaceAll(',','')
}


const spinRotor = () => {
    let temp = rotor3[25]
    rotor3 = temp + rotor3.slice(0,25)
    spinCount++
    if (spinCount%26==0){
        temp = rotor2[25]
        rotor2 = temp + rotor2.slice(0,25)
    }
    if (spinCount==676){
        temp = rotor3[25]
        rotor1 = temp + rotor1.slice(0,25)
        spinCount = 0
    }
}

const changeRotor = (key) => {
    rotor1 = rotor1.slice(key[0].charCodeAt(0)-97) + rotor1.slice(0,key[0].charCodeAt(0)-97)
    rotor2 = rotor2.slice(key[1].charCodeAt(0)-97) + rotor2.slice(0,key[1].charCodeAt(0)-97)
    rotor3 = rotor3.slice(key[2].charCodeAt(0)-97) + rotor3.slice(0,key[2].charCodeAt(0)-97)
}

const resetRotor = () => {
    rotor1 = "nxjzfvhyqcmsbadlpueigkrotw"
    rotor2 = "frmlubvyqgazpstjhxwiokcedn"
    rotor3 = "udtlozjmxgsyprhqvfwbaecnik"
    spinCount = 0
}

// console.log(encrypt("key", "kriptoo"))
// console.log(decrypt("key", "ihpuznc"))