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
    this.player = new Player(
      this.playableRowStart,
      this.playableColStart,
      this.playableRows,
      this.playableCols
    );

    this.score = 0;
    this.gameOver = false;
    this.isPaused = false; // Para pausar durante alerts

    // --- Niveles y Desbloqueo ---
    this.nivelActual = 1;
    this.maxScorePorNivel = [50, 100, 150];
    this.manzanasRequeridas = 5; // Se ajusta por nivel
    this.applesEatenInLevel = 0; // Contador de manzanas comidas

    // --- Manzanas especiales ---
    this.doradasRestantes = 0;
    this.multicolorRestantes = 0;

    // --- Movimiento nivel 1 ---
    this.teclaPresionada = false;

    // --- Velocidad inicial ---
    this.velocidad = 1500;
    this.gameLoopTimeout = null; // Para controlar setTimeout

    // ---------- SONIDOS ----------
    // Asegúrate de tener estos archivos en assets/sounds/
    this.sounds = {
      button: new Audio("assets/sounds/button.mp3"),
      eat: new Audio("assets/sounds/eat.mp3"),
      death: new Audio("assets/sounds/death.mp3"),
      levelPassed: new Audio("assets/sounds/levelpassed.mp3"),
      move: new Audio("assets/sounds/move.mp3"),
      youWon: new Audio("assets/sounds/youwon.mp3"),
      accept: new Audio("assets/sounds/accept.mp3"),
      bg: new Audio("assets/sounds/background.mp3"),
    };

    // Música de fondo en loop
    if (this.sounds.bg) {
      this.sounds.bg.loop = true;
      this.sounds.bg.volume = 0.4; // ajusta si suena fuerte
    }
    // ------------------------------

    this.configurarNivel();
    this.ajustarVelocidad();
    this.apple = this.spawnApple();

    this.initControls();

    // Llamada inicial a updateUI (se asume que existe en app.js)
    if (typeof updateLevelButtons === "function") this.updateUI();
    this.loop();
  }

  // ---------- GESTOR DE SONIDOS ----------

  playSound(name) {
    const snd = this.sounds[name];
    if (!snd) return;
    try {
      snd.currentTime = 0;
      snd.play();
    } catch (e) {
      // por si el navegador bloquea el audio
    }
  }

  startBackgroundMusic() {
    const bg = this.sounds.bg;
    if (!bg) return;
    if (bg.paused) {
      try {
        bg.currentTime = 0;
        bg.play();
      } catch (e) {}
    }
  }

  stopBackgroundMusic() {
    const bg = this.sounds.bg;
    if (!bg) return;
    try {
      bg.pause();
    } catch (e) {}
  }

  // ---------------------------------------

  // Reinicia el jugador
  reiniciarPlayer() {
    this.player = new Player(
      this.playableRowStart,
      this.playableColStart,
      this.playableRows,
      this.playableCols
    );
    this.teclaPresionada = this.nivelActual !== 1;

    // Obligatorio para evitar saltos raros
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
          // sonido de botón
          this.playSound("button");
          // primera interacción → arrancamos música de fondo
          this.startBackgroundMusic();
        }
      }
    });
  }

  // Función para sincronizar el estado del juego con la UI
  updateUI() {
    if (typeof updateLevelButtons === "function") {
      updateLevelButtons(
        this.nivelActual,
        this.score,
        this.maxScorePorNivel[this.nivelActual - 1],
        this.applesEatenInLevel,
        this.manzanasRequeridas
      );
    }
    // Mostrar/ocultar botón "Volver"
    if (typeof toggleBackButton === "function") {
      toggleBackButton(this.nivelActual);
    }
  }

  configurarNivel() {
    // Resetear contadores de manzanas especiales y normales
    this.doradasRestantes = 0;
    this.multicolorRestantes = 0;
    this.applesEatenInLevel = 0;

    switch (this.nivelActual) {
      case 1:
        this.manzanasRequeridas = 3;
        break;

      case 1.5:
        this.manzanasRequeridas = 3;
        break;

      case 2:
        this.manzanasRequeridas = 5;
        this.doradasRestantes = 2;
        break;
      case 3:
        this.manzanasRequeridas = 5;
        this.multicolorRestantes = 3;
        break;
    }
  }

  ajustarVelocidad() {
    if (this.nivelActual === 1) this.velocidad = 300;
    if (this.nivelActual === 1.5) this.velocidad = 300;
    if (this.nivelActual === 2) this.velocidad = 300;
    if (this.nivelActual === 3) this.velocidad = 300;
  }

  esObstaculo(valor) {
    if (valor === 29) return true; // obstáculo original
    if (this.nivelActual === 2 && valor === 30) return true; // Casa
    if (this.nivelActual === 3 && valor === 28) return true; // Cárcel / lava
    return false;
  }

  puntosPorManzana(tipo) {
    if (tipo === 24) return 20; // Dorada
    if (tipo === 25) return 30; // Multicolor
    return 10; // Roja
  }

  spawnApple() {
    let r, c;
    let tipoManzana = 23; // roja por defecto

    // Manzanas especiales (30% prob. mientras queden)
    if (
      this.nivelActual === 2 &&
      this.doradasRestantes > 0 &&
      Math.random() < 0.3
    ) {
      tipoManzana = 24; // dorada
      this.doradasRestantes--;
    } else if (
      this.nivelActual === 3 &&
      this.multicolorRestantes > 0 &&
      Math.random() < 0.3
    ) {
      tipoManzana = 25; // multicolor
      this.multicolorRestantes--;
    }

    do {
      r =
        this.playableRowStart + Math.floor(Math.random() * this.playableRows);
      c =
        this.playableColStart + Math.floor(Math.random() * this.playableCols);
    } while (
      this.esObstaculo(this.mapMatrix.getValue(r, c)) ||
      this.player.body.some((part) => part.row === r && part.col === c)
    );

    return { row: r, col: c, tipo: tipoManzana };
  }

  handleMove() {
    const newHead = this.player.calculateNewHead();

    // --- 1. Verificar colisiones con límites ---
    if (
      newHead.row < this.playableRowStart ||
      newHead.row >= this.playableRowStart + this.playableRows ||
      newHead.col < this.playableColStart ||
      newHead.col >= this.playableColStart + this.playableCols
    ) {
      this.endGame("¡Chocaste contra el límite!");
      return;
    }

    // Colisión consigo mismo
    const isSelfCollision = this.player.body
      .slice(0, -1)
      .some((part) => part.row === newHead.row && part.col === newHead.col);

    // Colisión con obstáculo o consigo mismo
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
      this.applesEatenInLevel += Math.floor(puntos / 10);

      this.playSound("eat");
      this.draw();

      // Comprobar si completó el nivel
      const nivelCompletado =
        this.applesEatenInLevel >= this.manzanasRequeridas;

      if (nivelCompletado) {
        this.isPaused = true;
        this.playSound("levelPassed");

        setTimeout(() => {
          alert(`¡Nivel ${this.nivelActual} completado! Puntuación: ${this.score}.`);
          this.playSound("accept");
          this.isPaused = false;

          let siguiente;
          if (this.nivelActual === 1) siguiente = 1.5;
          else if (this.nivelActual === 1.5) siguiente = 3;
          else siguiente = null; 

          if (siguiente) {
            unlockNextLevelButton(siguiente);
            this.cambiarNivel(siguiente);
          } else {
            this.playSound("youwon");
            alert("¡Juego completado!");
            this.playSound("accept");
            this.endGame("Has ganado el juego.", true);
          }
        }, 100);
      } else {
        // Si no completó el nivel, generar nueva manzana
        this.apple = this.spawnApple();
      }
    } else {
      // --- 3. Movimiento normal (sin comer) ---
      this.player.move(newHead);
      this.playSound("move");
    }

    this.updateUI();
}


  // Función para terminar el juego (Game Over / Victoria final)
  endGame(message = "¡Game Over!", isVictory = false) {
    this.gameOver = true;
    this.isPaused = true;

    if (this.gameLoopTimeout) {
      clearTimeout(this.gameLoopTimeout);
    }

    // detener música de fondo
    this.stopBackgroundMusic();

    // Si no es victoria, reproducimos sonido de muerte
    if (!isVictory) {
      this.playSound("death");
    }

    this.draw();

    // Delay para que el audio arranque antes del alert
    setTimeout(() => {
      alert(`${message} Tu puntuación final: ${this.score}`);
      this.playSound("accept");
      this.updateUI();
    }, 150);
  }

  // Función para cambiar de nivel (llamado por el juego o la UI)
  cambiarNivel(nuevoNivel) {

    //  Saltar el nivel 2 siempre
    if (nuevoNivel === 2) {
        alert("El nivel 2 se salta automáticamente. Enviando al nivel 3...");
        this.playSound("accept");
        nuevoNivel = 3;
    }

    // Verificar si está desbloqueado
    if (typeof isLevelUnlocked === "function" && !isLevelUnlocked(nuevoNivel)) {
      alert("Este nivel no está desbloqueado.");
      this.playSound("accept");
      return;
    }

    // Limpiar loop anterior
    if (this.gameLoopTimeout) {
      clearTimeout(this.gameLoopTimeout);
    }

    // Establecer nuevo nivel
    this.nivelActual = nuevoNivel;

    // Cambiar mapa
    if (typeof getLevelMatrix === "function") {
      this.mapMatrix.fillFromArray(getLevelMatrix(nuevoNivel));
    } else {
      this.mapMatrix.fillFromArray(LEVELS[nuevoNivel]);
    }

    this.configurarNivel();
    this.ajustarVelocidad();

    // Resetear cosas
    this.score = 0;
    this.reiniciarPlayer();
    this.apple = this.spawnApple();
    this.gameOver = false;
    this.isPaused = false;

    // Actualizar UI y música
    this.updateUI();
    this.startBackgroundMusic();

    // Volver al loop
    this.loop();
}
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const offsetX = (this.canvas.width - this.cols * this.cellSize) / 2;
    const offsetY = (this.canvas.height - this.rows * this.cellSize) / 2;
    
    // DIBUJAR FONDO EN TODO EL CANVAS
    const fondoImg = this.images[31];
    if (fondoImg && fondoImg.complete) {
        this.ctx.drawImage(
            fondoImg,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }

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

    // Dibujar manzana
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

    // Dibujar serpiente
    this.player.body.forEach((part, i) => {
      const imgIndex = i === 0 ? 26 : 27; // 26 = cabeza, 27 = cuerpo
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
      // Si está en Game Over o en pausa (por alert), detenemos el loop.
      return;
    }

    // Nivel 1: espera a que se presione una tecla para iniciar
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