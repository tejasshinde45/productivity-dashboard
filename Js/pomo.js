export function pomoDoro() {
    let timer;
    let isRunning = false;
    let isBreak = false;

    let totalTime = 25 * 60;
    let timeLeft = totalTime;

    const appBox = document.querySelector(".app");
    const timeDisplay = document.getElementById("time");
    const sessionText = document.getElementById("sessionText");
    const progressCircle = document.querySelector(".progress-circle");

    const startBtn = document.getElementById("startBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const resetBtn = document.getElementById("resetBtn");
    const modes = document.querySelectorAll(".mode");

    const breakPopup = document.getElementById("breakPopup");
    const shortBreakBtn = document.getElementById("shortBreakBtn");
    const longBreakBtn = document.getElementById("longBreakBtn");

    const tickSound = new Audio("./audio/tick.mp3");
    tickSound.volume = 0.4;
    let lastSecondPlayed = null;

    const radius = 100;
    const circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = 0;

    function stopTickSound() {
        tickSound.pause();
        tickSound.currentTime = 0;
        lastSecondPlayed = null;
    }

    function showBreakPopup() {
        breakPopup.classList.add("active");
    }

    function hideBreakPopup() {
        breakPopup.classList.remove("active");
    }

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timeDisplay.textContent =
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");

        progressCircle.style.strokeDashoffset =
            circumference * (1 - timeLeft / totalTime);

        if (isRunning && isBreak && timeLeft <= 10 && timeLeft > 0) {
            appBox.classList.add("blink");

            if (lastSecondPlayed !== timeLeft) {
                tickSound.currentTime = 0;
                tickSound.play();
                lastSecondPlayed = timeLeft;
            }
        } else {
            appBox.classList.remove("blink");
            stopTickSound();
        }

        if (timeLeft === 0) {
            appBox.classList.remove("blink");
            stopTickSound();
        }
    }

    function startTimer() {
        if (isRunning) return;

        isRunning = true;
        startBtn.textContent = "Running";

        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                stopTimer();

                if (!isBreak) {
                    showBreakPopup();
                }
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
        isRunning = false;
        appBox.classList.remove("blink");
        stopTickSound();
    }

    function pauseTimer() {
        if (!isRunning) return;

        stopTimer();
        startBtn.textContent = "Start";
    }

    function resetTimer() {
        hideBreakPopup();
        setMode("focus");
        startBtn.textContent = "Start";
    }

    function setMode(mode) {
        stopTimer();
        hideBreakPopup();
        startBtn.textContent = "Start";

        modes.forEach(m => m.classList.remove("active"));

        if (mode === "focus") {
            totalTime = 25 * 60;
            isBreak = false;
            sessionText.textContent = "Focus Time";
            // progressCircle.style.stroke = "var(--tri2)";
            modes[0].classList.add("active");
        }

        if (mode === "short") {
            totalTime = 5 * 60;
            isBreak = true;
            sessionText.textContent = "Short Break";
            // progressCircle.style.stroke = "var(--tri1)";
            modes[1].classList.add("active");
        }

        if (mode === "long") {
            totalTime = 15 * 60;
            isBreak = true;
            sessionText.textContent = "Long Break";
            // progressCircle.style.stroke = "var(--tri1)";
            modes[2].classList.add("active");
        }

        timeLeft = totalTime;
        updateDisplay();
    }

    shortBreakBtn.addEventListener("click", () => {
        hideBreakPopup();
        setMode("short");
        startTimer();
    });

    longBreakBtn.addEventListener("click", () => {
        hideBreakPopup();
        setMode("long");
        startTimer();
    });

    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resetBtn.addEventListener("click", resetTimer);

    modes.forEach(mode => {
        mode.addEventListener("click", () => {
            setMode(mode.dataset.mode);
        });
    });
    updateDisplay();
}
