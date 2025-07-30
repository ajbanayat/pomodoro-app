const bells = new Audio('./sounds/bell.wav')
const startBtn = document.querySelector('.btn-start');
const pauseBtn = document.querySelector('.btn-pause');

const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');

let intervalID;
let isRunning = false;
let timeLeftInSeconds;

const startSession = () => {
    timeLeftInSeconds = (Number.parseInt(minutes.textContent) * 60) + Number.parseInt(seconds.textContent);

    if (!isRunning) {
        isRunning = true;
        startBtn.classList.add("hidden");
        pauseBtn.classList.remove("hidden");

        intervalID = setInterval(updateSeconds, 1000);
    } else {
        alert("Session has already started.");
    }
}

const updateSeconds = () => {
    timeLeftInSeconds--;
    let minutesLeft = Math.floor(timeLeftInSeconds/60);
    let secondsLeft = timeLeftInSeconds % 60;

    if (secondsLeft < 10) {
        seconds.textContent = "0" + secondsLeft;
    } else {
        seconds.textContent = secondsLeft;
    }
    minutes.textContent = minutesLeft;

    if (minutesLeft === 0 && secondsLeft === 0) {
        bells.play();
        clearInterval(intervalID);
    }
}

const pauseSession = () => {
    isRunning = false;
    startBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");

    clearInterval(intervalID);
}

startBtn.addEventListener('click', startSession);
pauseBtn.addEventListener('click', pauseSession);