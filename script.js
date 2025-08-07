// Timer de Respiração 4-7-8
const breathText = document.getElementById('breath-text');
const countdownEl = document.getElementById('countdown');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const audioGuide = document.getElementById('audio-guide');

let timer;
let totalTime = 0;
let isRunning = false;

const breathSequence = [
    { text: "Inspire", duration: 4 },
    { text: "Segure", duration: 7 },
    { text: "Expire", duration: 8 }
];

function startBreathTimer() {
    if (isRunning) return;
    
    isRunning = true;
    startBtn.disabled = true;
    audioGuide.play();
    
    let cycleCount = 0;
    totalTime = breathSequence.reduce((acc, phase) => acc + phase.duration, 0);
    
    function updateTimer() {
        const phase = breathSequence[cycleCount % breathSequence.length];
        breathText.textContent = phase.text;
        
        let timeLeft = phase.duration;
        countdownEl.textContent = timeLeft;
        
        const phaseTimer = setInterval(() => {
            timeLeft--;
            countdownEl.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(phaseTimer);
                cycleCount++;
                
                if (cycleCount < breathSequence.length * 3) { // 3 ciclos completos
                    updateTimer();
                } else {
                    resetTimer();
                }
            }
        }, 1000);
    }
    
    updateTimer();
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    breathText.textContent = "Inspire";
    countdownEl.textContent = "4";
    audioGuide.pause();
    audioGuide.currentTime = 0;
}

startBtn.addEventListener('click', startBreathTimer);
resetBtn.addEventListener('click', resetTimer);

// Player de Áudio
document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const audioSrc = this.getAttribute('data-audio');
        const audio = new Audio(audioSrc);
        const icon = this.querySelector('i');
        
        if (icon.classList.contains('fa-play')) {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
            audio.play();
            this.textContent = " Pausar";
        } else {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            audio.pause();
            this.textContent = " Ouvir";
        }
        
        audio.addEventListener('ended', () => {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            this.textContent = " Ouvir";
        });
    });
});
