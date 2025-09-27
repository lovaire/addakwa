let stream;
let video = document.getElementById('video');
let resultDiv = document.getElementById('result');

async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        requestAnimationFrame(processFrame);
    } catch (err) {
        alert('Gagal mengakses kamera: ' + err);
    }
}

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
        resultDiv.innerHTML = '';
    }
}

async function processFrame() {
    const keyInput = document.getElementById('keyAnswers').value.toUpperCase();
    if (keyInput.length !== 30) {
        resultDiv.innerHTML = 'Kunci jawaban harus 30 huruf (A/B/C/D)!';
        return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);

    const { data: { text } } = await Tesseract.recognize(canvas, 'eng', {
        logger: info => console.log(info)
    });

    const studentAnswers = extractAnswers(text);
    const score = compareAnswers(keyInput, studentAnswers);
    resultDiv.innerHTML = `Skor: ${score}/30<br>Jawaban Siswa: ${studentAnswers}<br>Kunci: ${keyInput}`;

    if (video.srcObject) requestAnimationFrame(processFrame);
}

function extractAnswers(text) {
    const answers = text.match(/[ABCD]/g) || [];
    return answers.slice(0, 30).join('');
}

function compareAnswers(key, student) {
    let correct = 0;
    for (let i = 0; i < 30; i++) {
        if (key[i] === student[i]) correct++;
    }
    return correct;
}