const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 2000;
canvas.height = 1200;

const images = {};
let playerName = "";
let loadedCount = 0;
const totalImages = 31; 

// Estado de desbloqueo de niveles (Usado por SnakeGame y la UI)
const nivelesDesbloqueados = {
    1: true,
    2: false,
    3: false
};

// Referencias a los botones de la UI;
const btnNivel1 = document.getElementById("btnNivel1");
const btnNivel2 = document.getElementById("btnNivel2");
const btnNivel3 = document.getElementById("btnNivel3");

// lista para iterar
const levelButtons = [btnNivel1, btnNivel2, btnNivel3];

let game;

// --- Funciones Globales para Interactuar con SnakeGame ---

function getLevelMatrix(level) {
    // Asumimos que la matriz LEVELS es global o está disponible
    return LEVELS[level];
}

function isLevelUnlocked(level) {
    return nivelesDesbloqueados[level];
}

// Llamado por SnakeGame cuando cumple las condiciones
function unlockNextLevelButton(nextLevel) {
    if (nextLevel <= 3) {
        nivelesDesbloqueados[nextLevel] = true;
        // La actualización de botones ocurre automáticamente en game.cambiarNivel()
        // o llamando a updateLevelButtons después del unlock.
    }
}


// Función para actualizar el estado de los botones (Llamada por SnakeGame.updateUI)
function updateLevelButtons(currentLevel, score, maxScore, applesEaten, applesReq) {
    // Actualizar estados locked / active y disabled de botones
    nivelesDesbloqueados[2] = !!nivelesDesbloqueados[2];
    nivelesDesbloqueados[3] = !!nivelesDesbloqueados[3];

    // btnNivelX.disabled ya se puede manejar así:
    btnNivel1.disabled = false;
    btnNivel2.disabled = !nivelesDesbloqueados[2];
    btnNivel3.disabled = !nivelesDesbloqueados[3];

    // Agregar/quitar clases locked y active
    [btnNivel1, btnNivel2, btnNivel3].forEach((btn, idx) => {
      const lvl = idx + 1;
      if (!nivelesDesbloqueados[lvl]) {
        btn.classList.add('locked');
      } else {
        btn.classList.remove('locked');
      }
      if (currentLevel === lvl) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Actualizar HUD informativo (arriba a la izquierda)
    const hudLevel = document.getElementById('hudLevel');
    const hudScore = document.getElementById('hudScore');
    const hudApples = document.getElementById('hudApples');

    if (hudLevel) hudLevel.innerText = currentLevel;
    if (hudScore) hudScore.innerText = score ?? 0;
    if (hudApples) hudApples.innerText = applesEaten ?? 0;
}


// --- Event Listeners para Botones ---

btnNivel2.addEventListener('click', () => {
    if (game && isLevelUnlocked(2)) {
        game.cambiarNivel(2);
    }
});

btnNivel3.addEventListener('click', () => {
    if (game && isLevelUnlocked(3)) {
        game.cambiarNivel(3);
    }
});


// --- Lógica de Carga e Inicialización ---

// Cargar imágenes y dibujar
for (let i = 0; i < totalImages; i++) {
  const img = new Image();
  img.src = `assets/${i}.png`; 
  img.onload = () => {
    loadedCount++;
    if (loadedCount === totalImages) {
      const initialLevel = 1;
      const levelData = LEVELS[initialLevel];
      // Crear Matrix
      const mapMatrix = new Matrix(levelData.length, levelData[0].length);
      mapMatrix.fillFromArray(levelData);
      // Inicializar Game
      game = new SnakeGame("gameCanvas", mapMatrix, images);
      // game.draw() es llamado dentro de game.loop()
      
      // Llamada inicial para configurar botones al cargar
      updateLevelButtons(game.nivelActual, game.score, game.maxScorePorNivel[game.nivelActual - 1], game.applesEatenInLevel, game.manzanasRequeridas);
    }
  };
  images[i] = img;
}

// Asociar listeners a botones de nivel (después de inicializar game) 
levelButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const lvl = Number(btn.dataset.level);
    if (game && isLevelUnlocked(lvl)) {
      game.cambiarNivel(lvl);
    } else {
      // opcional: efecto al intentar clicar nivel bloqueado
      btn.classList.add('shake');
      setTimeout(() => btn.classList.remove('shake'), 350);
    }
  });
});

// Inicializar HUD con nombre (si ya hay valor)
document.getElementById('hudPlayerName').innerText = playerName || 'Jugador';


//AGREGAR INTRODUCIR NOMBRE Y ENTER EN INTERFAZ 

function startGameScreen() {
    const input = document.getElementById("playerNameInput");
    playerName = input.value.trim();

    if (playerName === "") {
        alert("Por favor ingresa un nombre.");
        return;
    }

    // Ocultar pantalla inicial
    document.getElementById("startScreen").style.display = "none";
    // Mostrar nombre de usuario
    document.getElementById("hudPlayerName").innerText = playerName || 'Jugador';
}

// Permitir Enter desde teclado
document.addEventListener("keydown", function(e) {
    const startScreen = document.getElementById("startScreen");
    if (e.key === "Enter" && startScreen.style.display !== "none") {
        startGameScreen();
    }
});

// Reloj en HUD (actualiza cada segundo)
function updateHudClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2,'0');
  const mm = String(now.getMinutes()).padStart(2,'0');
  const ss = String(now.getSeconds()).padStart(2,'0');
  const hudTime = document.getElementById('hudTime');
  if (hudTime) hudTime.innerText = `${hh}:${mm}:${ss}`;
}
setInterval(updateHudClock, 1000);
updateHudClock();

