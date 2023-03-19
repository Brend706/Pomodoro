window.onload = () => {
    let currentTime; /*Tiempo que dure un pomodoro...*/
    let seconds = 0;

    let workTime, breakTime, timesCompleted;

    let cyclesGoal, cyclesCompleted;

    function timer(){
        if ( currentTime > 0 || seconds > 0){
            if(seconds == 0){
                seconds = 59;
                currentTime--;
            }else{
                seconds--;
            }
            console.log(currentTime, seconds);
            //
            setTimeout( timer, 1000);
        }else{
            console.log("El temporizador termino...");
        }
    }

    function pomodoroController(){
        if(isRestTime()){
            cyclesCompleted++;
            if( !goalReached() ){
                currentTime = restTime;
                timer();
                timesCompleted = 0;
            }else{
                console.log("Pomodoro Finished");
            }
            return;
        }

        if( timesCompleted % 2 == 0){
            //toca work
            currentTime = workTime;
            timesCompleted++;
            timer();
            console.log("Time to Work! TC: " + timesCompleted);
        }else{
            //toca rest
            currentTime = breakTime;
            timesCompleted++;
            timer();
            console.log("Time to Break! TC: " + timesCompleted);
        }
    }

    function isRestTime(){
        return timesCompleted == 7;
    }

    function goalReached(){
        return cyclesGoal == cyclesCompleted;
    }
};