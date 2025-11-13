// ===== levels.js =====

// Definición de niveles
const levels = [
  {
    number: 1,
    name: "JARDÍN",
    fruitColor: "red",
    fruitValue: 10,
    speed: 800,
    targetPoints: 50,
    allowSilver: false,
    silverValue: 0,
    silverRespawnMs: 0,
    allowGold: false,
    goldValue: 0,
    goldRespawnMs: 0,
    obstacles: [],
    locked: false // primer nivel siempre desbloqueado
  },
  {
    number: 2,
    name: "CASA",
    fruitColor: "red",
    fruitValue: 10,
    speed: 500,
    targetPoints: 100,
    allowSilver: true,
    silverValue: 20,
    silverRespawnMs: 5000,
    allowGold: false,
    goldValue: 0,
    goldRespawnMs: 0,
    obstacles: [{ x: 5, y: 5 }, { x: 10, y: 15 }],
    locked: true // bloqueado inicialmente
  },
  {
    number: 3,
    name: "CÁRCEL",
    fruitColor: "red",
    fruitValue: 10,
    speed: 300,
    targetPoints: 150,
    allowSilver: false,
    silverValue: 0,
    silverRespawnMs: 0,
    allowGold: true,
    goldValue: 30,
    goldRespawnMs: 8000,
    obstacles: [{ x: 4, y: 10 }, { x: 8, y: 12 }, { x: 12, y: 6 }],
    locked: true
  }
];

// ===== Funciones de gestión de niveles =====

// Obtener un nivel por número
function getLevel(n) {
  return levels.find(l => l.number === n);
}

// Obtener todos los niveles
function getAllLevels() {
  return levels;
}

// Desbloquear siguiente nivel (interno)
function unlockNextLevel(n) {
  const next = getLevel(n + 1);
  if (next) next.locked = false;
}

// Resetear niveles al estado inicial (solo nivel 1 desbloqueado)
function resetLevels() {
  levels.forEach((l, i) => l.locked = i !== 0);
}

// Sincronizar niveles con el progreso del jugador
function syncLevelsWithPlayer() {
  const max = player.maxLevelUnlocked;
  levels.forEach(l => {
    l.locked = l.number > max;
  });
}

// Exportar funciones globalmente
window.getLevel = getLevel;
window.getAllLevels = getAllLevels;
window.unlockNextLevel = unlockNextLevel;
window.resetLevels = resetLevels;
window.syncLevelsWithPlayer = syncLevelsWithPlayer;