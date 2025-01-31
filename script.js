console.log("hello")

wordList = [
    "javascript",
    "golang",
    "elm",
    "gns",
    "java",
    "react",
    "angular"
];

function start(wordList) {
    createCardWords(wordList);
}

function createCardWords(wordList) {
    console.log(wordList)
    if (!Array.isArray(wordList)) {  
        console.error("Erreur : wordList doit être un tableau !");
        return;
    }

    console.log("Création des cartes...\n");

    const selected = selectRandomWords(wordList, 5);

    selected.forEach(word => {
        console.log(`Carte: ${word}`);
    });

    console.log("\nCartes générées !");
}


function selectRandomWords(array, n) {
    const selectedWords = [];
    const usedIndexes = new Set();
    
    while (selectedWords.length < n) {
        const i = Math.floor(Math.random() * array.length);

        if (!usedIndexes.has(i)) {
            selectedWords.push(array[i]);
            usedIndexes.add(i); 
        }
    }

    return selectedWords;
}

start(wordList);