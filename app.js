const bells = new Audio('./sounds/bell.wav')
const startBtn = document.querySelector('.btn-start');
const pauseBtn = document.querySelector('.btn-pause');

const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');

let intervalID;
let isRunning = false;

const startSession = () => {
    let currentTimeInSeconds = (Number.parseInt(minutes.textContent) * 60) + Number.parseInt(seconds.textContent);

    if (!isRunning) {
        isRunning = true;
        startBtn.classList.add("hidden");
        pauseBtn.classList.remove("hidden");

        const updateSeconds = () => {
            const minuteDiv = document.querySelector(".minutes");
            const secondDiv = document.querySelector(".seconds");

            currentTimeInSeconds--;
            let timeLeftInMinutes = Math.floor(currentTimeInSeconds/60);
            let timeLeftInSeconds = currentTimeInSeconds % 60;

            if (timeLeftInSeconds < 10) {
                secondDiv.textContent = "0" + timeLeftInSeconds;
            } else {
                secondDiv.textContent = timeLeftInSeconds;
            }
            minuteDiv.textContent = timeLeftInMinutes;

            if (timeLeftInMinutes === 0 && timeLeftInSeconds === 0) {
                bells.play();
                clearInterval(intervalID);
            }
        }
        intervalID = setInterval(updateSeconds, 1000);
    } else {
        alert("Session has already started.");
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