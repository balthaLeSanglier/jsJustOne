// wordUtils.js
module.exports.createCardWords = (wordList) => {
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
    return selected;
  };
  
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
  
  module.exports.selectRandomWords = selectRandomWords;
  