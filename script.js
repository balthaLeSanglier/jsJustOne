
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
    createCardWords(wordList);
}

function createCardWords(wordList) {
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