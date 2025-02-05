// interaction.js
const readline = require('readline');

module.exports = {
  askQuestion(question) {
    return new Promise((resolve) => {
      const lineReader = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      lineReader.question(question, (answer) => {
        resolve(answer);
        lineReader.close();
      });
    });
  }
};

