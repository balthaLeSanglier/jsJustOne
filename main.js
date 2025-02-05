// main.js
const { startTimer } = require('./timer');
const { askQuestion } = require('./interaction');
const { createCardWords } = require('./wordUtils');
const tips = require('./tips');

const wordList = [
  "javascript",
  "golang",
  "elm",
  "gns",
  "java",
  "react",
  "angular"
];

async function start() {
  console.log("Début du compte à rebours...");
  await startTimer(5);

  const wordToGuessList = createCardWords(wordList);
  
  let nbOfNumber;
  while (true) {
      nbOfNumber = await askQuestion("Choisissez un nombre entre 1 et 5 : ");
      nbOfNumber = parseInt(nbOfNumber, 10); 
      if (!isNaN(nbOfNumber) && nbOfNumber >= 1 && nbOfNumber <= 5) {
          break;
      }
      console.log("Entrée invalide. Veuillez entrer un nombre entre 1 et 5.");
  }
  
  const wordToGuess = wordToGuessList[nbOfNumber - 1];
  console.log("Le mot choisi est : " + wordToGuess);
  console.log("C'est parti pour les indices !");
  
  let tipsList = await tips.getFiveTips();
  console.log("Okay, les indices sont collectés. Vérification des indices");
  tipsList = tips.checkTipsLetters(tipsList);
  console.log("\nListe des indices : ");
  console.log(tipsList);
  
  const response = await askQuestion("Devinez le mot !!\n");
  checkResponse(wordToGuess, response);
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

start();
