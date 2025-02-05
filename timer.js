// timer.js
module.exports.startTimer = (duration) => {
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
  };
  