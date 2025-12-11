class Player {
  constructor(playableRowStart, playableColStart, playableRows, playableCols) {
    this.playableRowStart = playableRowStart;
    this.playableColStart = playableColStart;
    this.playableRows = playableRows;
    this.playableCols = playableCols;

    // El cuerpo de la serpiente
    this.body = this.initBody();
    // La dirección de movimiento
    this.direction = { dr: 0, dc: 0 }; // Inicialmente a la derecha
  }

  initBody() {
    // Inicializa la cabeza de la serpiente en el centro del área jugable
    const startRow = this.playableRowStart + Math.floor(this.playableRows / 2);
    const startCol = this.playableColStart + Math.floor(this.playableCols / 2);
    return [{ row: startRow, col: startCol }];
  }

  setDirection(newDir) {
    // Evita que gire 180 grados instantáneamente
    if (this.direction.dr + newDir.dr !== 0 || this.direction.dc + newDir.dc !== 0) {
      this.direction = newDir;
      // Ya que la lógica de sonido y teclaPresionada está en Game,
      // solo devolvemos true/false para que Game actúe.
      return true; 
    }
    return false;
  }

  /**
   * Calcula la posición potencial de la nueva cabeza.
   * @returns {object} La posición potencial de la nueva cabeza.
   */
  calculateNewHead() {
    const head = this.body[0];
    return {
      row: head.row + this.direction.dr,
      col: head.col + this.direction.dc,
    };
  }

  /**
   * Mueve al jugador sin crecer (añade cabeza y quita cola).
   * @param {object} newHead - La posición ya validada de la nueva cabeza.
   */
  move(newHead) {
    this.body.unshift(newHead);
    this.body.pop();
  }

  /**
   * Hace crecer al jugador (añade cabeza sin quitar cola).
   * @param {object} newHead - La posición ya validada de la nueva cabeza.
   */
  grow(newHead) {
    this.body.unshift(newHead);
  }
  
  /**
   * Obtiene la posición de la cabeza.
   * @returns {object} La posición de la cabeza.
   */
  getHead() {
      return this.body[0];
  }
}