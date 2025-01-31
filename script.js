console.log("hello")

wordList = [
    "javascript",
    "golang",
    "elm",
    "gns",
    "java",
    "react",
    "angular"
]

function start(wordList) {
    console.log("you clicked on the button")
    console.log()
}

function createCardWords(wordList) {
    copy = wordList

}

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }