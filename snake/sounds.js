// ==========================
// 🎵 Sistema de sonidos
// ==========================

// Carga de sonidos
const soundButton = new Audio("sounds/button.mp3.mp3");
const soundGameOver = new Audio("sounds/death.mp3.mp3");

// Reproduce el sonido de botón
function playButtonSound() {
  if (!soundButton.paused) {
    soundButton.currentTime = 0; // reinicia si se presiona rápido
  }
  soundButton.play().catch(() => {
    // Ignora error si el navegador bloquea la reproducción automática
  });
}

// Reproduce el sonido de fin del juego
function playGameOverSound() {
  if (!soundGameOver.paused) {
    soundGameOver.currentTime = 0;
  }
  soundGameOver.play().catch(() => {});
}