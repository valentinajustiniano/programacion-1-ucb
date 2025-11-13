// ===== game.js =====

// Canvas y contexto
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Grid
const box = 20;
const GRID_W = 40;
const GRID_H = 25;
canvas.width = GRID_W * box;
canvas.height = GRID_H * box;

// Estado
let snake = [];
let direction = "RIGHT";
let food = {};
let score = 0;
let gameInterval = null;
let speed = 3000; // inicial, nivel 1 super lento

let currentFruitColor = "red";
let currentFruitValue = 10;
let currentObstacles = [];
let currentLevelNumber = 1;
let targetPoints = 50;

let allowSilver = false;
let allowGold = false;
let specialPos = null;
let specialValue = 0;
let specialColor = "";
let specialActive = false;
let specialTimer = null;

// ===== Imágenes de fondo por nivel (CORRECTO: 1, 2, 3) =====
const levelBackgroundImages = {
  1: new Image(),
  2: new Image(),
  3: new Image()
};

// Rutas de imagen ORIGINALES para los fondos de nivel en el juego
levelBackgroundImages[1].src = "assets/1.png.png"; // Nivel 1
levelBackgroundImages[2].src = "assets/2.png.png"; // Nivel 2
levelBackgroundImages[3].src = "assets/3.png.png"; // Nivel 3


// Obstáculos por nivel
const obstaclesByLevel = {
  2: [{x:10,y:10},{x:11,y:10},{x:12,y:10},{x:10,y:11},{x:10,y:12}],
  3: [{x:5,y:5},{x:6,y:5},{x:7,y:5},{x:5,y:6},{x:5,y:7},{x:20,y:15},{x:21,y:15},{x:22,y:15}]
};

// Nombres y fondos por nivel (Solo para respaldo si la imagen falla)
const levelNames = ["Jardín","Casa","Cárcel"];
const levelBackgrounds = ["#a2d149","#8eb8ff","#660000"];

// ===== Inicio del juego =====
function startGame(levelData){
  playButtonSound();
  if(!levelData) return;

  currentLevelNumber = levelData.number;

  snake = [{ x: Math.floor(GRID_W/2)*box, y: Math.floor(GRID_H/2)*box }];
  direction = "RIGHT";
  score = 0;

  currentFruitColor = "red";
  currentFruitValue = 10;
  currentObstacles = obstaclesByLevel[currentLevelNumber] || [];
  speed = levelData.speed;
  targetPoints = levelData.targetPoints;

  allowSilver = !!levelData.allowSilver;
  allowGold = !!levelData.allowGold;

  stopSpecial();
  if(allowSilver || allowGold) spawnSpecial();

  food = randomFreeCell();

  clearInterval(gameInterval);
  gameInterval = setInterval(drawGame, speed);

  document.onkeydown = changeDirection;
}

// ===== Utilidades =====
function randomFreeCell(){
  let c;
  do{
    c = { x: Math.floor(Math.random()*GRID_W)*box, y: Math.floor(Math.random()*GRID_H)*box };
  }while(
    snake.some(s=>s.x===c.x && s.y===c.y) ||
    currentObstacles.some(o=>o.x*box===c.x && o.y*box===c.y) ||
    (specialActive && specialPos && specialPos.x===c.x && specialPos.y===c.y)
  );
  return c;
}

function changeDirection(e){
  if(e.key==="ArrowLeft" && direction!=="RIGHT") direction="LEFT";
  else if(e.key==="ArrowUp" && direction!=="DOWN") direction="UP";
  else if(e.key==="ArrowRight" && direction!=="LEFT") direction="RIGHT";
  else if(e.key==="ArrowDown" && direction!=="UP") direction="DOWN";
  e.preventDefault();
}

// ===== Bucle principal =====
function drawGame(){
  // Dibujar imagen de fondo del nivel
const bgImg = levelBackgroundImages[currentLevelNumber];
if(bgImg.complete){ // se asegura de que la imagen esté cargada
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
} else {
    // Si la imagen no se cargó aún, usar color de respaldo
    ctx.fillStyle = levelBackgrounds[currentLevelNumber-1];
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


  // Dibujar obstáculos
  ctx.fillStyle="#555";
  currentObstacles.forEach(obs=>ctx.fillRect(obs.x*box, obs.y*box, box, box));

  // Calcular nueva cabeza
  let headX = snake[0].x;
  let headY = snake[0].y;
  if(direction==="LEFT") headX -= box;
  if(direction==="RIGHT") headX += box;
  if(direction==="UP") headY -= box;
  if(direction==="DOWN") headY += box;

  const newHead = {x:headX, y:headY};

  // Colisiones
  if(headX<0 || headY<0 || headX>=canvas.width || headY>=canvas.height || snakeCollision(newHead) || obstacleCollision(newHead)){
    endGame(false); // ❌ perdió
    return;
  }

  let grew=false;

  // Comer especial
  if(specialActive && specialPos && headX===specialPos.x && headY===specialPos.y){
    score += specialValue;
    grew=true;
    removeSpecial();
    playEatSound();
  }

  // Comer fruta normal
  if(headX===food.x && headY===food.y){
    score += currentFruitValue;
    grew=true;
    food=randomFreeCell();
    playEatSound();
  }

  if(!grew) snake.pop();
  snake.unshift(newHead);

  // Dibujar fruta normal
  ctx.fillStyle=currentFruitColor;
  ctx.fillRect(food.x, food.y, box, box);

  // Dibujar especial
  if(specialActive && specialPos){
    ctx.fillStyle=specialColor;
    ctx.fillRect(specialPos.x, specialPos.y, box, box);
  }

  // Dibujar serpiente
  snake.forEach((seg,i)=>{
    ctx.fillStyle=i===0?"green":"lightgreen";
    ctx.fillRect(seg.x, seg.y, box, box);
  });

  drawUI();

  // Meta alcanzada
  if(score >= targetPoints){
    clearInterval(gameInterval);
    stopSpecial();
    endGame(true); // ✅ pasó de nivel
  }
}

// ===== Colisiones =====
function snakeCollision(head){ return snake.some((seg,i)=>i>0 && seg.x===head.x && seg.y===head.y);}
function obstacleCollision(head){ return currentObstacles.some(obs=>head.x===obs.x*box && head.y===obs.y*box);}

// ===== UI fuera del canvas (sin cambios) =====
function drawUI(){
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    const dateStr = now.toLocaleDateString();

    // Actualizar HUD externo (HTML)
    const scoreUI = document.getElementById("score-ui");
    const playerUI = document.getElementById("player-ui");

    if(scoreUI) scoreUI.textContent = `Puntaje: ${score}`;
    if(playerUI) {
        if(playerName){
            playerUI.textContent = `${playerName} - ${levelNames[currentLevelNumber-1]} - ${dateStr} ${timeStr}`;
        } else {
            playerUI.textContent = `${dateStr} ${timeStr}`;
        }
    }
}

// ===== Especiales (opcional: desaparecer después de X seg) =====
function spawnSpecial(){
  if(specialActive) return;
  specialPos = randomFreeCell();
  if(currentLevelNumber===2){ specialColor="silver"; specialValue=20; }
  else if(currentLevelNumber===3){ specialColor="gold"; specialValue=30; }
  else return;
  specialActive=true;

  // Desaparecer después de 10 seg
  specialTimer = setTimeout(removeSpecial, 10000);
}




// ===== Mensaje central (sin cambios) =====
function showCenteredMessage(text, color="#fff") {
    const padding = 15;
    const lineHeight = 20;
    const fontSize = 16;
    const lines = text.split("\n");

    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Ancho máximo del texto
    let maxWidth = 0;
    lines.forEach(line => {
        const width = ctx.measureText(line).width;
        if(width > maxWidth) maxWidth = width;
    });

    const rectWidth = maxWidth + padding * 2;
    const rectHeight = lines.length * lineHeight + padding * 2;
    const rectX = canvas.width/2 - rectWidth/2;
    const rectY = canvas.height/2 - rectHeight/2;

    // Fondo negro semi-transparente
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

    // Borde
    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.lineWidth = 2;
    ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);

    // Texto
    ctx.fillStyle = color;
    lines.forEach((line,i)=>{
        const y = rectY + padding + i*lineHeight + lineHeight/2;
        ctx.fillText(line, canvas.width/2, y);
    });
}

// ===== Fin del juego / siguiente nivel (sin cambios) =====
function endGame(passed=false){
  clearInterval(gameInterval);
  stopSpecial();

  if(!passed) playGameOverSound(); // sonido si pierde

  let msg = passed
    ? `🎉 ¡${playerName} clasificaste al siguiente nivel!\nPuntaje: ${score}`
    : `💀 Fin del juego, ${playerName}!\nPuntaje: ${score}`;

  showCenteredMessage(msg);

  // Esperar y volver al menú
  setTimeout(()=>{
    document.getElementById("game-screen").classList.remove("active");
    document.getElementById("menu-screen").classList.add("active");
    renderLevelButtons && renderLevelButtons();
  },2000);

  // 🔓 Desbloqueo del siguiente nivel
  if(passed) unlockPlayerLevel && unlockPlayerLevel(currentLevelNumber);
}

// ===== Especiales (sin cambios) =====
function stopSpecial(){ if(specialTimer) clearInterval(specialTimer); specialTimer=null; removeSpecial();}
function removeSpecial(){ specialActive=false; specialPos=null;}