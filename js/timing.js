var heat;
var heatTimer;
var difficultyTimer;
var interval;
var timeElapsed;
var threshold = 5000;
var heatReduced = 10;
var lastCheckTime;

function startTiming() {
    heat = 500;
    interval = 1000;
    elapsedTime = 0;
    lastCheckTime = 0;
    combo = 0;
    runDifficultyTimer();
    runHeatTimer();
}

function runDifficultyTimer() {
    timeElapsed = 0;
    difficultyTimer = setInterval(function() {myDifficultyTimer()}, 10);
}

function runHeatTimer() {
    heatTimer = setInterval(function() {myHeatTimer()}, interval);
}

function myHeatTimer() {
    heat -= heatReduced;
    if (heat < 0) {
        stopAll();
    } 
    $('#heat').html(heat);
}

function myDifficultyTimer() {
    timeElapsed += 10;
    $('#time').html(millisToTime(timeElapsed));
    if (interval > 100 && lastCheckTime != timeElapsed && timeElapsed % threshold == 0) {
        reduceInterval();
        $('#interval').html(interval);
    }
}

function reduceInterval() {
    stopHeatTimer();
    interval -= 100;
    lastCheckTime = timeElapsed;
    runHeatTimer();
}
    
function addHeat(amount) {
    heat += amount;
}

function reduceHeat(amount) {
    heat -= amount;
}

function stopHeatTimer() {
    clearInterval(heatTimer);
}

function stopDifficultyTimer() {
    clearInterval(difficultyTimer);
}

function stopAll() {
    stopHeatTimer();
    stopDifficultyTimer();
}

function millisToTime(ms) {
    var millis = ms % 1000;
    var secs = Math.floor((ms / 1000) % 60);
    var mins = Math.floor((ms / 60000) % 60);

    return addZ(mins) + ":" + addZ(secs) + "." + millis;
}

function addZ(n) {
    return (n < 10? '0' : '') + n;
}