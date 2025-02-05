// tips.js
const readline = require('readline');

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


module.exports = {
    getOneTip,
    getFiveTips,
    checkTipsLetters
  };
  