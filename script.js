let stopwatch;
let startTime;
let elapsedTime = 0;
let isRunning = false;
let lapLimit = 20; 

function startStop() {
    let startStopButton = document.getElementById('startStopButton');
    if (!isRunning) {
        startStopButton.textContent = 'Stop';
        startTime = Date.now() - elapsedTime;
        stopwatch = setInterval(updateStopwatch, 10);
        isRunning = true;
    } else {
        startStopButton.textContent = 'Start';
        clearInterval(stopwatch);
        isRunning = false;
    }
}

function updateStopwatch() {
    elapsedTime = Date.now() - startTime;
    displayTime(elapsedTime);
}

function displayTime(milliseconds) {
    let hours = Math.floor(milliseconds / (1000 * 60 * 60));
    let minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    let millis = Math.floor((milliseconds % 1000) / 10);

    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;
    millis = (millis < 10) ? `0${millis}` : millis;

    document.getElementById('display').textContent = `${hours}:${minutes}:${seconds}.${millis}`;
}

function reset() {
    clearInterval(stopwatch);
    isRunning = false;
    elapsedTime = 0;
    displayTime(elapsedTime);
    document.getElementById('lapTimes').innerHTML = '';
}

function recordLap() {
    let lapTimesList = document.getElementById('lapTimes');
    if (lapTimesList.children.length < lapLimit) {
        let lapTime = elapsedTime;
        let lapItem = document.createElement('li');
        lapItem.innerHTML = `<span class="lap-number">${lapTimesList.children.length + 1}</span>: ${formatTime(lapTime)}`;

        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function() {
            lapTimesList.removeChild(lapItem);
            renumberLaps();
        };

        lapItem.appendChild(deleteButton);
        lapTimesList.appendChild(lapItem);

        renumberLaps();
    } else {
        alert(`You have reached the maximum limit of ${lapLimit} laps.`);
    }
}

function renumberLaps() {
    const lapTimesList = document.getElementById('lapTimes').children;
    for (let i = 0; i < lapTimesList.length; i++) {
        lapTimesList[i].querySelector('.lap-number').textContent = `Lap ${i + 1}`;
    }
}

function formatTime(milliseconds) {
    let minutes = Math.floor(milliseconds / (1000 * 60));
    let seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    let millis = Math.floor((milliseconds % 1000) / 10);

    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;
    millis = (millis < 10) ? `0${millis}` : millis;

    return `${minutes}:${seconds}.${millis}`;
}
