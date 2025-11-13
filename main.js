// ===== main.js =====
let playerName = "";
let currentLevel = 1;

const startScreen = document.getElementById("start-screen");
const levelMenu   = document.getElementById("menu-screen");
const gameScreen  = document.getElementById("game-screen");
const levelsContainer = document.getElementById("levelsContainer");
const nameInput   = document.getElementById("playerName");
const startButton = document.getElementById("btnStart");
const btnMenu     = document.getElementById("btnMenu");
const btnReset    = document.getElementById("btnReset");
const levelTitle  = document.getElementById("levelTitle");
const todayDate   = document.getElementById("today-date"); // div flotante derecha

// ===== Fecha y hora =====
function formatNow(){
  const n = new Date();
  const dd = String(n.getDate()).padStart(2,"0");
  const mm = String(n.getMonth()+1).padStart(2,"0");
  const yy = n.getFullYear();
  const hh = String(n.getHours()).padStart(2,"0");
  const mi = String(n.getMinutes()).padStart(2,"0");
  const ss = String(n.getSeconds()).padStart(2,"0");
  return `${dd}/${mm}/${yy} ${hh}:${mi}:${ss}`;
}

// Actualiza el div flotante
function updateRightInfo(){
  if(todayDate){
    if(playerName){
      todayDate.textContent = `${playerName} - Nivel ${currentLevel} - ${formatNow()}`;
    } else {
      todayDate.textContent = `Hoy: ${formatNow()}`;
    }
  }
}
setInterval(updateRightInfo, 1000);

// ===== Inicio: pedir nombre y pasar al menú =====
startButton.addEventListener("click", () => {
  const name = (nameInput.value||"").trim();
  if (!name){ alert("Escribe tu nombre"); return; }
  playerName = name;
  setPlayerName && setPlayerName(playerName);
  loadPlayerData && loadPlayerData();
  renderLevelButtons();
  startScreen.classList.remove("active");
  levelMenu.classList.add("active");
  updateRightInfo();
});

// ===== Generar botones de niveles según progreso (Usando imágenes) =====
function renderLevelButtons(){
  levelsContainer.innerHTML = "";
  const maxUnlocked = getMaxLevelUnlocked ? getMaxLevelUnlocked() : 1;
  
  // Mapeo de número de nivel a la ruta de su imagen de ícono
  const levelImageMap = {
      1: "assets/5.png.png", // Patio/Jardín
      2: "assets/6.png.png", // Casa
      3: "assets/7.png.png"  // Cárcel
  };
  
  getAllLevels().forEach(lvl => {
    const btn = document.createElement("button");
    btn.className = "level-btn";
    
    // Añadir la imagen del icono
    const img = document.createElement("img");
    img.src = levelImageMap[lvl.number];
    img.alt = `Nivel ${lvl.number} - ${lvl.name}`;
    btn.appendChild(img);

    // Opcional: mantener el texto para accesibilidad (oculto por CSS)
    const textSpan = document.createElement("span");
    textSpan.textContent = `${lvl.number} — ${lvl.name}`;
    btn.appendChild(textSpan);

    if (lvl.number > maxUnlocked) {
      btn.disabled = true;
      btn.classList.add("locked");
    }
    btn.addEventListener("click", () => startLevel(lvl.number));
    levelsContainer.appendChild(btn);
  });
}

// ===== Arrancar un nivel =====
function startLevel(levelNumber){
  currentLevel = levelNumber;
  levelMenu.classList.remove("active");
  gameScreen.classList.add("active");


  const L = getLevel(levelNumber);
  if (levelTitle) levelTitle.textContent = `Nivel ${levelNumber} — ${L?.name || ""}`;

  // Inicia el juego
  if (typeof startGame === "function") {
    startGame(L);
  } else {
    alert("Error: startGame no está definido. Revisa el orden de los <script>.");
  }
  updateRightInfo();
}

// ===== Volver al menú =====
btnMenu.addEventListener("click", () => {
  gameScreen.classList.remove("active");
  levelMenu.classList.add("active");
  renderLevelButtons();
  updateRightInfo();
});

// ===== Reiniciar progreso =====
btnReset.addEventListener("click", () => {
  if (confirm("¿Borrar progreso?")) {
    resetPlayerData && resetPlayerData();
    resetLevels && resetLevels();
    renderLevelButtons();
    startScreen.classList.add("active");
    levelMenu.classList.remove("active");
    gameScreen.classList.remove("active");
    updateRightInfo();
  }
});

// ===== Completar nivel y desbloquear siguiente =====
window.levelComplete = function(score){
  // Añadir puntaje
  addPlayerScore && addPlayerScore(score);

  // Desbloquear siguiente nivel
  unlockPlayerLevel && unlockPlayerLevel(currentLevel);
  unlockNextLevel && unlockNextLevel(currentLevel);

  // Mostrar mensaje simple
  alert(`✅ ¡Nivel ${currentLevel} completado!\nPuntaje: ${score}`);

  // Volver al menú
  gameScreen.classList.remove("active");
  levelMenu.classList.add("active");
  renderLevelButtons();
  updateRightInfo();
};