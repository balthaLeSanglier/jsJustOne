//Readline est un module permettant l'interaction I/O
const readline = require('readline');

const lineReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askNumber(question) {
    return new Promise((resolve) => {
        lineReader.question(question, (answer) => {
            lineReader.close()
            resolve(answer);
        });
    });
}



wordList = [
    "javascript",
    "golang",
    "elm",
    "gns",
    "java",
    "react",
    "angular"
];

function startTimer(duration) {
    return new Promise((resolve) => {
        let seconds = duration;

        const timer = setInterval(() => {
            console.log(`${seconds} secondes restantes`);
            seconds--;

            if (seconds < 0) {
                clearInterval(timer);
                console.log("Temps écoulé !\n");
                resolve();
            }
        }, 1000);
    });
}

async function start() {
    console.log("Début du compte à rebours...");
    await startTimer(5);
    wordToGuessList = createCardWords(wordList);
    nbOfNumber = await askNumber("Choisissez un nombre en 1 et 5 \n")
    wordToGuess = wordToGuessList[nbOfNumber-1]
    console.log(wordToGuess)
}

function createCardWords(wordList) {
    if (!Array.isArray(wordList)) {  
        console.error("Erreur : wordList doit être un tableau !");
        return;
    }

    console.log("Création des mots...\n");

    const selected = selectRandomWords(wordList, 5);

    selected.forEach(word => {
        console.log(`mot : ${word}`);
    });

    console.log("\nMots générées !");
    return selected
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