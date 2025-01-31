

function startTimer(duration) {
    return new Promise((resolve) => {
        let seconds = duration;

        const timer = setInterval(() => {
            console.log(`${seconds} secondes restantes`);
            seconds--;

            if (seconds < 0) {
                clearInterval(timer);
                console.log("Temps écoulé !");
                resolve();
            }
        }, 1000);
    });
}

async function start() {
    console.log("Début du compte à rebours...");
    await startTimer(5);
}

start();
