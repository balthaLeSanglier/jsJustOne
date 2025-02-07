// main.js
const { startTimer } = require('./timer');
const { askQuestion } = require('./interaction');
const { createCardWords } = require('./wordUtils');
const tips = require('./tips');

const wordList = [
        "Javascript", "Golang", "Elm", "Gns", "Java", "React", "Angular",
        "Verre", "Vert", "Ver", "Vair","Vers","Vaires",
        "Chat", "Chien", "Cheval", "Oiseau", "Dauphin", "Renard", "Hibou", "Lézard", "Tortue", "Souris",
        "Table", "Chaise", "Lampe", "Fenêtre", "Téléphone", "Ordinateur", "Clavier", "Miroir", "Livre", "Stylo",
        "Pomme", "Poire", "Banane", "Chocolat", "Fromage", "Pain", "Lait", "Carotte", "Fraise", "Raisin",
        "Arbre", "Forêt", "Montagne", "Rivière", "Océan", "Étoile", "Soleil", "Lune", "Pluie", "Nuage",
        "Rouge", "Bleu", "Vert", "Jaune", "Noir", "Blanc", "Violet", "Orange", "Rose", "Gris",
        "Médecin", "Pompier", "Enseignant", "Écrivain", "Architecte", "Ingénieur", "Avocat", "Coiffeur", "Peintre", "Pilote",
        "Joie", "Tristesse", "Colère", "Peur", "Surprise", "Amour", "Déception", "Sérénité", "Enthousiasme", "Nostalgie",
        "Voyage", "Mystère", "Histoire", "Aventure", "Magie", "Secret", "Passion", "Liberté", "Énergie", "Espoir",
        "Football", "Basketball", "Tennis", "Natation", "Athlétisme", "Cyclisme", "Boxe", "Rugby", "Golf", "Ski",
        "Carotte", "Tomate", "Concombre", "Poivron", "Courgette", "Aubergine", "Chou", "Épinard", "Radis", "Brocoli",
        "Paris", "New York", "Londres", "Tokyo", "Berlin", "Madrid", "Rome", "Sydney", "Moscou", "Dubaï",
        "France", "Espagne", "Italie", "Canada", "Japon", "Brésil", "Allemagne", "Chine", "Inde", "Mexique",
        "Bouteille", "Sac", "Montre", "Lunettes", "Télévision", "Casque", "Tasse", "Vélo", "Voiture", "Couteau"
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
  
  let tipsList = await tips.getFourTips();
  console.log("Okay, les indices sont collectés. Vérification des indices");
  try {
        tipsList = await tips.checkTipsPrononciation(tipsList, wordToGuess);
        tipsList = tips.checkTipsLetters(tipsList);
    } catch (error) {
        //Sin la vérification de la prononciation est impossible (erreur réseau par exemple), on vérifie simplement l'orthographe
        console.error("Erreur dans la vérification des prononciations :", error);
        tipsList = tips.checkTipsLetters(tipsList);
    }

  console.log("\nListe des indices : ");
  console.log(tipsList);
  
  const response = await askQuestion("Devinez le mot !!\n");
  checkResponse(wordToGuess, response);
}

function checkResponse(wordToGuess, response) {
    win = wordToGuess.toLowerCase()==response.toLowerCase()
    if(win) {
        console.log("BRAVO, c'est une victoire !")
    }
    else {
        console.log("oh non, c'est perdu ...")
    }
}

start();
