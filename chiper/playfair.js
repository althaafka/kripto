const encryptPlayfair = (key, input) => {
    let keyMatrix = generateKeyMatrix(key);
    let bigram = generateBigram(input);
    let result = "";
    console.log("keyM", keyMatrix);
    console.log("bigram", bigram);

    for (let i = 0; i < bigram.length; i++) {
        let first= getCharIndex(keyMatrix, bigram[i][0]);
        let second = getCharIndex(keyMatrix, bigram[i][1]);

        let cipherIndex = []

        if (first[1] == second[1]){
            first[0] = first[0] != 4? first[0]+1 : 0;
            second[0] = second[0] != 4? second[0]+1 : 0;
        } else if (first[0] == second[0]){
            first[1] = first[1] != 4? first[1]+1 : 0;
            second[1] = second[1] != 4? second[1]+1 : 0;
        } else {
            console.log(first,second);
            let temp = first[1];
            first[1] = second[1];
            second[1] = temp;
            console.log(first,second);
        }

        result += keyMatrix[first[0]][first[1]] + keyMatrix[second[0]][second[1]]
    }

    return result;

}

const generateKeyMatrix = (key) => {
    let keyMatrix = [];
    let alphabet = "abcdefghiklmnopqrstuvwxyz";
    let keyString = key.replaceAll('j','').replace(/\s/g,'') + alphabet;
    let keyStringSet = new Set(keyString);
    keyString = Array.from(keyStringSet).join('');
    for (let i = 0; i < 5; i++) {
        let row = [];
        for (let j = 0; j < 5; j++) {
            row.push(keyString[i * 5 + j]);
        }
        keyMatrix.push(row);
    }
    return keyMatrix;
}

const generateBigram = (input) => {
    let bigram = [];
    let inputArray = input.replaceAll('j','i').split('');
    if (inputArray.length % 2 == 1) {
        inputArray.push('x');
    }
    for (let i = 0; i < inputArray.length; i += 2) {
        if (inputArray[i] === inputArray[i + 1]) {
            inputArray.splice(i + 1, 0, 'x');
        }
        bigram.push(inputArray[i] + inputArray[i + 1]);
    }
    if (inputArray.length % 2 == 1) {
        bigram.pop();
        bigram.push(inputArray[inputArray.length - 1] + 'x');
    }
    return bigram;
}

const getCharIndex = (matrix, char) => {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (matrix[i][j] === char) {
                return [i, j];
            }
        }
    }
}

// debugging
// let key = "jalan ganesha sepuluh";
// let formatedKey = key.replaceAll('j','').replace(/\s/g,'');
// console.log(generateKeyMatrix(formatedKey));
// console.log(generateBigram("temui ibu nanti malam".replace(/\s/g,'')));
console.log(encryptPlayfair("alngeshpubcdfikmoqrtvwxyz","temuiibunantimalam"))