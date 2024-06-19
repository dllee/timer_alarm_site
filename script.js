let timer;
let alarmTimeout;
let beepCount = 0;
let context;
let oscillator;

function startTimer() {
    const timeUnit = document.getElementById('timeUnit').value;
    const timeInput = document.getElementById('timeInput').value;
    const timerDisplay = document.getElementById('timerDisplay');
    let timeInSeconds = timeUnit === 'minutes' ? timeInput * 60 : timeInput;
    timerDisplay.innerText = timeInSeconds;
    clearInterval(timer);
    timer = setInterval(() => {
        let currentTime = parseInt(timerDisplay.innerText);
        if (currentTime > 0) {
            timerDisplay.innerText = currentTime - 1;
        } else {
            clearInterval(timer);
            beepCount = 0;
            playBeepFiveTimes();
        }
    }, 1000);
}

function setAlarm() {
    const alarmTime = document.getElementById('alarmTime').value;
    const alarmDisplay = document.getElementById('alarmDisplay');
    clearTimeout(alarmTimeout);
    alarmDisplay.innerText = `Alarm set for ${alarmTime}`;
    const [hours, minutes] = alarmTime.split(':').map(num => parseInt(num));
    const now = new Date();
    const alarmDate = new Date();
    alarmDate.setHours(hours);
    alarmDate.setMinutes(minutes);
    alarmDate.setSeconds(0);
    if (alarmDate < now) {
        alarmDate.setDate(alarmDate.getDate() + 1);
    }
    const timeToAlarm = alarmDate - now;
    alarmTimeout = setTimeout(() => {
        beepCount = 0;
        playBeepFiveTimes();
    }, timeToAlarm);
}

function playBeepFiveTimes() {
    context = new (window.AudioContext || window.webkitAudioContext)();
    beepInterval = setInterval(() => {
        if (beepCount < 5) {
            oscillator = context.createOscillator();
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(1000, context.currentTime);
            oscillator.connect(context.destination);
            oscillator.start();
            setTimeout(() => oscillator.stop(), 500);
            beepCount++;
        } else {
            clearInterval(beepInterval);
        }
    }, 1000);
}

function showCurrentTime() {
    const currentTimeDisplay = document.getElementById('currentTime');
    setInterval(() => {
        const now = new Date();
        currentTimeDisplay.innerText = now.toLocaleTimeString();
    }, 1000);
}
