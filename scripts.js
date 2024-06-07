let isRecording = false;
let recordedAudio = [];
let mediaRecorder;
let audioChunks = [];

// document.querySelectorAll('.drum').forEach(button => {
    // button.addEventListener('click', () => {
        // const sound = button.getAttribute('data-sound');
        // playSound(sound);
    // });
// });

document.getElementById('record').addEventListener('click', () => {
    startRecording();
});

document.getElementById('stop').addEventListener('click', () => {
    stopRecording();
});

document.getElementById('download').addEventListener('click', () => {
    downloadRecording();
});

document.getElementById('play').addEventListener('click', () => {
    playRecording();
});

// function playSound(sound) {
    // const audio = new Audio(`sounds/${sound}.mp3`);
    // audio.play();
    // if (isRecording) {
        // recordedAudio.push({ sound, time: Date.now() });
    // }
// }

function startRecording() {
    isRecording = true;
    recordedAudio = [];
    document.getElementById('record').disabled = true;
    document.getElementById('stop').disabled = false;
    document.getElementById('download').disabled = true;
    document.getElementById('play').disabled = false;
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        
        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });
    });
}

function stopRecording() {
    isRecording = false;
    document.getElementById('record').disabled = false;
    document.getElementById('stop').disabled = true;
    document.getElementById('download').disabled = false;
    document.getElementById('play').disabled = false;
    mediaRecorder.stop();
    mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
    });
}
function playRecording( ){
    isRecording = false;
    document.getElementById('record').disabled = false;
    document.getElementById('stop').disabled = false;
    document.getElementById('download').disabled = false;
    document.getElementById('play').disabled = true;
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
}

function downloadRecording() {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'recording.wav';
    link.click();
}
