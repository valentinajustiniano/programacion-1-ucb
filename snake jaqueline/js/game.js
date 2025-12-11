class SnakeGame {
  constructor(canvasId, mapMatrix, images) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.rows = mapMatrix.rows || 12;
    this.cols = mapMatrix.cols || 20;

    this.cellSize = Math.min(
      this.canvas.width / this.cols,
      this.canvas.height / this.rows
    );

    this.mapMatrix = mapMatrix;
    this.images = images;

    this.playableRowStart = 1;
    this.playableColStart = 1;
    this.playableRows = 10;
    this.playableCols = 18;

    // --- INSTANCIA DEL PLAYER ---
    this.player = new Player(this.playableRowStart, this.playableColStart, this.playableRows, this.playableCols);
    
    this.score = 0;
    this.gameOver = false;
    this.isPaused = false; // Agregado para pausar en alert

    // --- Niveles y Desbloqueo ---
    this.nivelActual = 1; 
    // Usaremos la variable global 'nivelesDesbloqueados' de app.js para la UI
    this.maxScorePorNivel = [50, 100, 150];
    this.manzanasRequeridas = 5; // Requisito fijo
    this.applesEatenInLevel = 0; // Contador de manzanas comidas

    // --- Manzanas especiales ---
    this.doradasRestantes = 0;
    this.multicolorRestantes = 0;

    // --- Movimiento nivel 1 ---
    this.teclaPresionada = false;

    
    // --- Velocidad inicial ---
    this.velocidad = 1500; 
    this.gameLoopTimeout = null; // Para control de setTimeout

    this.configurarNivel();
    this.ajustarVelocidad()
    this.apple = this.spawnApple();

    this.initControls();
    
    // Llamada inicial a updateUI (se asume que existe en app.js)
    if (typeof updateLevelButtons === 'function') this.updateUI(); 
    this.loop();
  }

  // initSnake() se mueve a Player, renombramos para reinicio
  reiniciarPlayer() {
  this.player = new Player(this.playableRowStart, this.playableColStart, this.playableRows, this.playableCols);
  this.teclaPresionada = (this.nivelActual !== 1);

  //  OBLIGATORIO PARA EVITAR SALTOS LOCOS
  this.player.direction = { dr: 0, dc: 0 };
}

  

  initControls() {
    document.addEventListener("keydown", (e) => {
      if (this.gameOver || this.isPaused) return;

      let newDirection = null;
      switch (e.key) {
        case "ArrowUp":
          newDirection = { dr: -1, dc: 0 };
          break;
        case "ArrowDown":
          newDirection = { dr: 1, dc: 0 };
          break;
        case "ArrowLeft":
          newDirection = { dr: 0, dc: -1 };
          break;
        case "ArrowRight":
          newDirection = { dr: 0, dc: 1 };
          break;
      }
      
      if (newDirection) {
          // Usamos el método de Player para gestionar la dirección
          if (this.player.setDirection(newDirection)) {
             this.teclaPresionada = true;
             new Audio("assets/sounds/button.mp3").play(); // Descomentar si usas sonido
          }
      }
    });
  }
  
  // Función para sincronizar el estado del juego con la UI
  updateUI() {
    if (typeof updateLevelButtons === 'function') {
        updateLevelButtons(this.nivelActual, this.score, this.maxScorePorNivel[this.nivelActual - 1], this.applesEatenInLevel, this.manzanasRequeridas);
    }
    // Llama a la función para mostrar/ocultar el botón "Volver"
    if (typeof toggleBackButton === 'function') {
        toggleBackButton(this.nivelActual);
    }
  }


  configurarNivel() {
    // Resetear contadores de manzanas especiales al inicio del nivel
    this.doradasRestantes = 0;
    this.multicolorRestantes = 0;
    this.applesEatenInLevel = 0; 

    switch (this.nivelActual) {
    case 1:
      this.manzanasRequeridas = 5;
      break;

    case 2:
      this.manzanasRequeridas = 10;
      this.doradasRestantes = 2;
      break;

    case 3:
      this.manzanasRequeridas = 15;
      this.multicolorRestantes = 3;
      break;
  }
  }

  
  ajustarVelocidad() {
    if (this.nivelActual === 1) this.velocidad = 1500; 
    if (this.nivelActual === 2) this.velocidad = 1200; 
    if (this.nivelActual === 3) this.velocidad = 900; 
}

  esObstaculo(valor) {
    if (valor === 29) return true; // obstáculo original
    if (this.nivelActual === 2 && valor === 30) return true; // Casa
    if (this.nivelActual === 3 && valor === 28) return true; // Cárcel
    return false;
  }

  puntosPorManzana(tipo) {
    if (tipo === 24) return 20; // Dorada
    if (tipo === 25) return 30; // Multicolor
    return 10; // Roja
  }

  spawnApple() {
    let r, c;
    let tipoManzana = 23; 

    // Lógica para spawnear manzanas especiales (Dorada 30% en N2, Multicolor 30% en N3)
    if (this.nivelActual === 2 && this.doradasRestantes > 0 && Math.random() < 0.3) {
      tipoManzana = 24; 
      this.doradasRestantes--;
    } else if (this.nivelActual === 3 && this.multicolorRestantes > 0 && Math.random() < 0.3) {
      tipoManzana = 25; 
      this.multicolorRestantes--;
    }

    do {
      r = this.playableRowStart + Math.floor(Math.random() * this.playableRows);
      c = this.playableColStart + Math.floor(Math.random() * this.playableCols);
    } while (
      this.esObstaculo(this.mapMatrix.getValue(r, c)) ||
      // Usamos this.player.body
      this.player.body.some((part) => part.row === r && part.col === c) 
    );

    return { row: r, col: c, tipo: tipoManzana };
  }

  
handleMove() {
  const newHead = this.player.calculateNewHead();

  // --- 1. Verificar colisiones ---
  if (
    newHead.row < this.playableRowStart ||
    newHead.row >= this.playableRowStart + this.playableRows ||
    newHead.col < this.playableColStart ||
    newHead.col >= this.playableColStart + this.playableCols
  ) {
    this.endGame("¡Chocaste contra el límite!");
    return;
  }

  const isSelfCollision = this.player.body
    .slice(0, -1)
    .some((part) => part.row === newHead.row && part.col === newHead.col);

  if (
    this.esObstaculo(this.mapMatrix.getValue(newHead.row, newHead.col)) ||
    isSelfCollision
  ) {
    this.endGame("¡Nooo, chocaste!");
    return;
  }

  // --- 2. Comer manzana ---
  if (newHead.row === this.apple.row && newHead.col === this.apple.col) {
    
    this.player.grow(newHead);

    const puntos = this.puntosPorManzana(this.apple.tipo);
    this.score += puntos;
    this.applesEatenInLevel+=Math.floor(puntos/10);

    new Audio("assets/sounds/eat.mp3").play();

    this.draw();

    const objetivoScore = this.maxScorePorNivel[this.nivelActual - 1];

    // --- ¿Completó el nivel? ---
    if (this.score >= objetivoScore && this.applesEatenInLevel >= this.manzanasRequeridas) {

      this.isPaused = true;

      setTimeout(() => {
        alert(`¡Nivel ${this.nivelActual} completado! Puntuación: ${this.score}.`);
        this.isPaused = false;

        if (this.nivelActual < 3) {
          unlockNextLevelButton(this.nivelActual + 1);
          this.cambiarNivel(this.nivelActual + 1);
        } else {
          alert("¡Juego completado!");
          this.endGame("Has ganado el juego.");
        }
      }, 100);

    } else {
      // No completó nivel → generar nueva manzana
      this.apple = this.spawnApple();
    }

  } else {
    // No comió → movimiento normal
    this.player.move(newHead);
  }

  this.updateUI();
}


// Función para terminar el juego (Game Over)
endGame(message = "¡Game Over!") {
    this.gameOver = true;
    this.isPaused = true;
    if (this.gameLoopTimeout) {
        clearTimeout(this.gameLoopTimeout);
    }
    const deathSound = new Audio("assets/sounds/death.mp3");
    deathSound.play().catch(() => {
    });
    this.draw();

    // Dejamos un pequeño delay para que el audio arranque antes del alert
    setTimeout(() => {
      alert(`${message} Tu puntuación final: ${this.score}`);
      // Al volver del alert, el juego ya está en estado Game Over
      this.updateUI();
    }, 150);
}

// Función para cambiar de nivel (puede ser llamado por el loop o por un botón)
cambiarNivel(nuevoNivel) {
  // Usamos una función global para verificar el desbloqueo
  if (typeof isLevelUnlocked === 'function' && !isLevelUnlocked(nuevoNivel)) {
      alert("Este nivel no está desbloqueado.");
      return;
  }
  
  if (this.gameLoopTimeout) {
      clearTimeout(this.gameLoopTimeout);
  }

  this.nivelActual = nuevoNivel;
  
  // Cambiar mapa (se asume que LEVELS es global o que getLevelMatrix existe)
  if (typeof getLevelMatrix === 'function') {
       this.mapMatrix.fillFromArray(getLevelMatrix(nuevoNivel));
  } else {
       this.mapMatrix.fillFromArray(LEVELS[nuevoNivel]); 
  }

  this.configurarNivel();
  this.ajustarVelocidad();
  this.score = 0;
  this.reiniciarPlayer(); // Reinicia el Player (cuerpo y dirección)
  this.apple = this.spawnApple();
  this.gameOver = false;
  this.isPaused = false;
  this.updateUI(); // Actualiza la UI para el nuevo nivel
  this.loop();
}


draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const offsetX = (this.canvas.width - this.cols * this.cellSize) / 2;
    const offsetY = (this.canvas.height - this.rows * this.cellSize) / 2;
    
 // Dibujar mapa
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const value = this.mapMatrix.getValue(r, c);
        const img = this.images[value];
        if (img) {
          this.ctx.drawImage(
            img,
            offsetX + c * this.cellSize,
            offsetY + r * this.cellSize,
            this.cellSize,
            this.cellSize
          );
        }
      }
    }

    // Dibujar manzana según tipo
    const appleImg = this.images[this.apple.tipo];
    if (appleImg) {
      this.ctx.drawImage(
        appleImg,
        offsetX + this.apple.col * this.cellSize,
        offsetY + this.apple.row * this.cellSize,
        this.cellSize,
        this.cellSize
      );
    }

    // Dibujar Player usando this.player.body
    this.player.body.forEach((part, i) => {
      const imgIndex = i === 0 ? 26 : 27; // 26=Cabeza, 27=Cuerpo
      const img = this.images[imgIndex];
      this.ctx.drawImage(
        img,
        offsetX + part.col * this.cellSize,
        offsetY + part.row * this.cellSize,
        this.cellSize,
        this.cellSize
      );
    });
    
  }
    
loop() {
  if (this.gameOver || this.isPaused) {
       // Si está en Game Over o Pausa (por Alert), detenemos el loop.
       return;
  }

  // Nivel 1: Espera a que se presione una tecla para iniciar
  if (this.nivelActual === 1 && !this.teclaPresionada) {
    this.draw();
    this.gameLoopTimeout = setTimeout(() => this.loop(), this.velocidad);
    return;
  }

  this.handleMove();
  this.draw();
  this.gameLoopTimeout = setTimeout(() => this.loop(), this.velocidad);
}
}