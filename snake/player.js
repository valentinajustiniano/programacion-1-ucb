// ===== player.js =====

// Datos del jugador
let player = {
  name: "",
  totalScore: 0,
  maxLevelUnlocked: 1 // nivel máximo desbloqueado
};

// ===== Guardar datos del jugador en localStorage =====
function savePlayerData() {
  localStorage.setItem("snakePlayer", JSON.stringify(player));
}

// ===== Cargar datos del jugador desde localStorage =====
function loadPlayerData() {
  const data = localStorage.getItem("snakePlayer");
  if (data) {
    player = JSON.parse(data);
  }
}

// ===== Establecer el nombre del jugador =====
function setPlayerName(name) {
  player.name = name;
  savePlayerData();
}

// ===== Añadir puntaje al jugador =====
function addPlayerScore(points) {
  player.totalScore += points;
  savePlayerData();
}

// ===== Desbloquear siguiente nivel automáticamente =====
function unlockPlayerLevel(levelNumber) {
  // Solo desbloquea si el nivel actual es >= al máximo desbloqueado
  if (levelNumber >= player.maxLevelUnlocked) {
    player.maxLevelUnlocked = levelNumber + 1;
    savePlayerData();
  }
}

// ===== Verificar si un nivel está desbloqueado =====
function isLevelUnlocked(levelNumber) {
  return levelNumber <= player.maxLevelUnlocked;
}

// ===== Obtener información del jugador =====
function getPlayerName() {
  return player.name;
}

function getMaxLevelUnlocked() {
  return player.maxLevelUnlocked;
}

// ===== Resetear progreso del jugador =====
function resetPlayerData() {
  player.totalScore = 0;
  player.maxLevelUnlocked = 1;
  savePlayerData();
}

// ===== Exportar funciones globalmente para main.js y game.js =====
window.setPlayerName = setPlayerName;
window.loadPlayerData = loadPlayerData;
window.addPlayerScore = addPlayerScore;
window.unlockPlayerLevel = unlockPlayerLevel;
window.getPlayerName = getPlayerName;
window.getMaxLevelUnlocked = getMaxLevelUnlocked;
window.isLevelUnlocked = isLevelUnlocked;
window.resetPlayerData = resetPlayerData;