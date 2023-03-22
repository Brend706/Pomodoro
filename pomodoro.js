
window.onload = () => {
    let currentTime; /*Tiempo que dure un pomodoro...*/
    let seconds = 0;

    let workTime, breakTime, restTime, timesCompleted;
    let cyclesGoal, cyclesCompleted;

    //Coneccion con el html
    let clock = document.getElementById("clock");
    let cyclesInput = document.getElementById("cycles-input");
    let startButton = document.getElementById("start-button");
    let workTimeInput = document.getElementById("work-time");
    let breakTimeInput = document.getElementById("break-time");
    let restTimeInput = document.getElementById("rest-time");
    let clockMinutes, clickSeconds;

    function timer() {
        if (currentTime > 0 || seconds > 0) {
            if (seconds == 0) {
                seconds = 59;
                currentTime--;
            } else {
                seconds--;
            }
            console.log(currentTime, seconds);
            //
            interval = setTimeout(timer, 1000);
        } else {
            pomodoroController();
            //console.log("El temporizador termino...");
        }
    }

    function pomodoroController() {
        if (isRestTime()) {
            cyclesCompleted++;
            if (!goalReached()) {
                currentTime = restTime;
                timer();
                timesCompleted = 0;
            } else {
                console.log("Pomodoro Finished");
            }
            return;
        }

        if (timesCompleted % 2 == 0) {
            //toca work
            currentTime = workTime;
            timesCompleted++;
            timer();
            console.log("Time to Work! TC: " + timesCompleted);
        } else {
            //toca rest
            currentTime = breakTime;
            timesCompleted++;
            timer();
            console.log("Time to Break! TC: " + timesCompleted);
        }
    }

    function isRestTime() {
        return timesCompleted == 7;
    }

    function goalReached() {
        return cyclesGoal == cyclesCompleted;
    }

    
    //Funcionalidad
    startButton.onclick = () => {
        populateVariables();
        startPomodoro();
    };

    function startPomodoro() {
        console.log("Started Pomodoro");
        pomodoroController();
    }

    function populateVariables() {
        console.log("populated variables");
        workTime = workTimeInput.value;
        breakTime = breakTimeInput.value;
        restTime = restTimeInput.value;
        cyclesGoal = cyclesInput.value;
        timesCompleted = 0;
    }

    function updateClock() {
        clockMinutes = formatNumbers(currentTime);
        clickSeconds = formatNumbers(seconds);
        clock.innerHTML = clockMinutes + ":" + clickSeconds;
    }

    function formatNumbers(time) {
        let formarttedDigits;
        if (time < 10) {
            formarttedDigits = "0" + time;
        } else {
            formarttedDigits = time;
        }
        return formarttedDigits;
    }
};
