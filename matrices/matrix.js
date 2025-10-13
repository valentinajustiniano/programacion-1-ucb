class Matrix {
    rows;
    cols;
    data;

    constructor(rowsParam, colsParam, defaultValue) {
        this.rows = rowsParam;
        this.cols = colsParam;
        this.data = [];

        for (let i = 0; i < rowsParam; i++) {
            const rowTemp = [];
            for (let j = 0; j < colsParam; j++) {
                rowTemp.push(defaultValue);
            }
            this.data.push(rowTemp);
        }
    }

    isValidPosition(row, col) {
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }

    setValue(row, col, value) {
        if (this.isValidPosition(row, col)) {
            this.data[row][col] = value;
        }
    }

    getValue(row, col) {
        if (this.isValidPosition(row, col)) {
            return this.data[row][col];
        } else {
            return null;
        }
    }

    // ✅ Corregido: ahora recibe min y max
    fillRandom(min, max) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const random = Math.floor(Math.random() * (max - min + 1)) + min;
                this.data[i][j] = random;
            }
        }
    }

    fillIncrementRows() {
        let initialValue = 1;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = initialValue;
            }
            initialValue = initialValue + 2;
        }
    }

    // ✅ Nueva función opcional: limpiar matriz
    clear(value = 0) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = value;
            }
        }
    }

    toString() {
        return this.data.map(row => row.join('\t')).join('\n');
    }


    // EJERCICIO 1. Cuadrado Relleno
fillAllOnes() {
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      this.data[i][j] = 1;
    }
  }
}

// EJERCICIO 2. Marco Interno
fillInnerFrame() {
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      // Si estamos en los bordes (primera o última fila o columna)
      if (i === 0 || i === this.rows - 1 || j === 0 || j === this.cols - 1) {
        this.data[i][j] = 0;
      } else {
        this.data[i][j] = 1;
      }
    }
  }
}

// EJERCICIO 3.  Cruces
fillCross() {
  const midRow = Math.floor(this.rows / 2);
  const midCol = Math.floor(this.cols / 2);

  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      // Si estamos en la fila o columna centrales → 1
      if (i === midRow || j === midCol) {
        this.data[i][j] = 1;
      } else {
        this.data[i][j] = 0;
      }
    }
  }
}

// EJERCICIO 4. Bordes y Diagonales
fillBordersAndDiagonals() {
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      // Bordes → 1
      if (i === 0 || i === this.rows - 1 || j === 0 || j === this.cols - 1) {
        this.data[i][j] = 1;
      }
      // Diagonales → 2
      else if (i === j || j === this.cols - 1 - i) {
        this.data[i][j] = 2;
      }
      // Todo lo demás → 0
      else {
        this.data[i][j] = 0;
      }
    }
  }
}

// EJERCICIO 5. Bandera 
fillFlag() {
  const section = Math.floor(this.rows / 3);
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      if (i < section) this.data[i][j] = 1;           // Franja superior
      else if (i < 2 * section) this.data[i][j] = 2;  // Franja del medio
      else this.data[i][j] = 0;                       // Franja inferior
    }
  }
}

// EJERCICIO 6. Relleno alterno (filas 0 y 1 alternadas)
fillAlternateRows() {
  for (let i = 0; i < this.rows; i++) {
    const value = i % 2 === 0 ? 1 : 0; // Fila par = 1, impar = 0
    for (let j = 0; j < this.cols; j++) {
      this.data[i][j] = value;
    }
  }
}

// EJERCICIO 7. Zig-Zag horizontal 
fillZigZag() {
  // Primero llenar con ceros
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      this.data[i][j] = 0;
    }
  }
  // Luego colocar los 1 en forma diagonal
  for (let i = 0; i < Math.min(this.rows, this.cols); i++) {
    this.data[i][i] = 1;
  }
}

// EJERCICIO 8. Relleno en espiral 
fillSpiral() {
    // Reiniciar matriz a ceros
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
            this.data[i][j] = 0;
        }
    }

    let top = 0;
    let bottom = this.rows - 1;
    let left = 0;
    let right = this.cols - 1;

    // Recorremos "capas" pero avanzando las fronteras en 2
    // para dejar una fila/columna de ceros entre vueltas (camino).
    while (top <= bottom && left <= right) {
        // izquierda -> derecha (fila superior)
        for (let j = left; j <= right; j++) this.data[top][j] = 1;
        top++;

        // arriba -> abajo (columna derecha)
        for (let i = top; i <= bottom; i++) this.data[i][right] = 1;
        right--;

        // derecha -> izquierda (fila inferior)
        if (top <= bottom) {
            for (let j = right; j >= left; j--) this.data[bottom][j] = 1;
            bottom--;
        }

        // abajo -> arriba (columna izquierda)
        if (left <= right) {
            for (let i = bottom; i >= top; i--) this.data[i][left] = 1;
            left++;
        }

        // Avanzar las fronteras una vez más para dejar "línea" de ceros
        top++;
        left++;
        bottom--;
        right--;
    }
}

// EJERCICIO 9. Triángulo Superior Izquierdo
fillUpperLeftTriangle() {
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
            this.data[i][j] = (j <= i) ? 1 : 0;
        }
    }
}

// EJERCICIO 10. Triángulo Inferior Derecho
fillLowerRightTriangle() {
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
            this.data[i][j] = (j >= this.cols - 1 - i) ? 1 : 0;
        }
    }
}

// EJERCICIO 11. Cuadrícula
fillGrid() {
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
            if (i % 2 === 0) {
                // Filas pares (0,2,4) → todas las columnas = 1
                this.data[i][j] = 1;
            } else {
                // Filas impares (1,3) → solo primera y última columna = 1
                this.data[i][j] = (j === 0 || j === this.cols - 1) ? 1 : 0;
            }
        }
    }
}

}
