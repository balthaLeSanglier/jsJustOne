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

async function getFourTips() {
    let tips = [];
    for (let i = 0; i < 4; i++) { // Nombre d'indices
        let tip = await getOneTip(i + 1);
        tips.push(tip);
    }
    return tips;
}

function checkTipsLetters(tipsList, existingTip) {
    const occurrences = new Map();

    // Compter les occurrences de chaque mot
    tipsList.forEach(word => {
        occurrences.set(word, (occurrences.get(word) || 0) + 1);
    });

    // Filtrer les mots qui apparaissent exactement une seule fois et ne sont pas `existingTip`
    return tipsList.filter(word => occurrences.get(word) === 1 && word !== existingTip);
}

  async function checkTipsPrononciation(tipsList, wordToGuess) {
    try {
        const prononciationWordToGuess = await getPronunciation(wordToGuess);
        
        const pronunciationsIndice = await Promise.all(
            tipsList.map(async (el) => {
                try {
                    return await getPronunciation(el);
                } catch (error) {
                    console.warn(`Impossible d'obtenir la prononciation de "${el}", il sera ignoré.`);
                    return null; // On ignore cet élément
                }
            })
        );

        // console.log("Prononciation du mot à deviner:", prononciationWordToGuess);
        // console.log("Prononciations des indices:", pronunciationsIndice);

        return tipsList.filter((word, index) => 
            pronunciationsIndice[index] !== null && pronunciationsIndice[index] !== prononciationWordToGuess
        );
    } catch (error) {
        console.error("Erreur dans checkTipsPrononciation:", error);
        throw error;
    }
}

function getPronunciation(word) {
    word = word.toLowerCase();
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
    getFourTips,
    checkTipsLetters,
    checkTipsPrononciation
  };
  