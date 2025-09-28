let jumlahSoal = 30;
let kunci = [];

// Buat form kunci jawaban dinamis
function renderKunci() {
  const container = document.getElementById("kunciContainer");
  container.innerHTML = "";
  for (let i = 1; i <= jumlahSoal; i++) {
    const label = document.createElement("label");
    label.textContent = i + ". ";
    const select = document.createElement("select");
    ["A","B","C","D"].forEach(opt => {
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = opt;
      select.appendChild(option);
    });
    container.appendChild(label);
    container.appendChild(select);
    container.appendChild(document.createElement("br"));
  }
}

// Update jumlah soal
document.getElementById("jumlahSoal").addEventListener("change", e => {
  jumlahSoal = parseInt(e.target.value);
  renderKunci();
});

// Simpan kunci
document.getElementById("simpanKunci").addEventListener("click", () => {
  kunci = Array.from(document.querySelectorAll("#kunciContainer select"))
               .map(s => s.value);
  alert("Kunci tersimpan!");
});

// Setup kamera
const video = document.getElementById("video");
navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
  .then(stream => { video.srcObject = stream; })
  .catch(err => alert("Tidak bisa akses kamera: " + err));

// Capture foto
document.getElementById("capture").addEventListener("click", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);

  // Proses OpenCV
  let src = cv.imread(canvas);
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY);
  cv.threshold(src, src, 120, 255, cv.THRESH_BINARY_INV);
  
  // TODO: crop grid (40x4), deteksi kotak isi, tentukan jawaban siswa
  
  document.getElementById("hasil").textContent = 
    "Foto diambil & diproses. Deteksi jawaban belum diimplementasi penuh.";
  
  src.delete();
});

function onOpenCvReady() {
  console.log("OpenCV.js siap!");
}

// Render awal
renderKunci();
