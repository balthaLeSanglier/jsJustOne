wordList = [
    "javascript",
    "golang",
    "elm",
    "gns",
    "java",
    "react",
    "angular"
];

//Readline est un module permettant l'interaction I/O
const readline = require('readline');



function askQuestion(question) {
    return new Promise((resolve) => {
        lineReader = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        lineReader.question(question, (answer) => {
            resolve(answer);
            lineReader.close()
        });
    });
}

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
    nbOfNumber = await askQuestion("Choisissez un nombre en 1 et 5 \n")
    wordToGuess = wordToGuessList[nbOfNumber-1]
    console.log("Le mot choisi est : "+ wordToGuess)
    console.log("C'est parti pour les indices !")
    tipsList = await getFiveTips()
    console.log("Okay, les indices sont collectés. Vérification des indices")
    tipsList = checkTipsLetters(tipsList)
    console.log(tipsList)
    response = await askQuestion("Devinez le mot !!\n")
    checkResponse(wordToGuess, response)
}

function checkResponse(wordToGuess, response) {
    win = wordToGuess==response
    if(win) {
        console.log("BRAVO, c'est une victoire !")
    }
    else {
        console.log("oh non, c'est perdu ...")
    }
}

async function askGuess(){

}

function checkTipsLetters(tipsList) {
    return tipsList.filter((el) => {
        return tipsList.indexOf(el) === tipsList.lastIndexOf(el);
    })
}

function checkTipsPronunciation(tipsList) {
    return tipsList.filter((el) => {
        return tipsList.indexOf(el) === tipsList.lastIndexOf(el);
    })
}

async function getFiveTips() {
    let tips = [];

    for (let i = 0; i < 5; i++) {
        let tip = await getOneTip(i + 1);
        tips.push(tip);
    }
    return tips;
}

async function getOneTip(index) {
    return new Promise((resolve) => {
        const lineReader = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        lineReader.question(`Indice ${index} : `, (answer) => {
            lineReader.close(); // Ferme readline après avoir reçu la réponse
            for (let i = 0; i < 10; i++) {
                console.log("")
            }
            resolve(answer);
        });
        
    });
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