// tips.js
const readline = require('readline');

//permet de parser du html
const cheerio = require("cheerio");

async function getOneTip(index) {
  return new Promise((resolve) => {
    const lineReader = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    lineReader.question(`Indice ${index} : `, (answer) => {
      lineReader.close();
      console.log("\n".repeat(10)); // Optionnel : efface la console après saisie
      resolve(answer);
    });
  });
}

async function getFiveTips() {
    let tips = [];
    for (let i = 0; i < 5; i++) {
      let tip = await getOneTip(i + 1);
      tips.push(tip);
    }
    return tips;
  }

function checkTipsLetters(tipsList) {
    const seen = new Set();
    return tipsList.filter(el => {
      if (seen.has(el)) return false;
      seen.add(el);
      return true;
    });
  }

  async function checkTipsPrononciation(tipsList, wordToGuess) {
    try {
        const prononciationWordToGuess = await getPronunciation(wordToGuess);
        const pronunciationsIndice = await Promise.all(tipsList.map(el => getPronunciation(el)));

        console.log("Prononciation du mot à deviner:", prononciationWordToGuess);
        console.log("Prononciations des indices:", pronunciationsIndice);

        return tipsList.filter((word, index) => pronunciationsIndice[index] !== prononciationWordToGuess);
    } catch (error) {
        console.error("Erreur dans checkTipsPrononciation:", error);
        throw error; // Propage l'erreur pour que l'appelant puisse la gérer
    }
}
function getPronunciation(word) {
  const url = `https://fr.wiktionary.org/w/api.php?action=parse&format=json&origin=*&prop=text&page=${encodeURIComponent(word)}`;

  return fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error(`Erreur HTTP ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          const html = data.parse.text["*"];
          const $ = cheerio.load(html); // Charge le HTML avec cheerio

          const pronunciation = $("span.API").first().text().trim();

          if (pronunciation) {
              return pronunciation;
          } else {
              throw new Error(`Prononciation introuvable`);
          }
      })
      .catch(error => {
          // Relancer l'erreur pour qu'elle soit capturée correctement
          throw new Error(`Erreur lors de la récupération de la prononciation: ${error.message}`);
      });
}

module.exports = {
    getOneTip,
    getFiveTips,
    checkTipsLetters,
    checkTipsPrononciation
  };
  