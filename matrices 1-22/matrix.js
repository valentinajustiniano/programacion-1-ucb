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


// EJERCICIO 12. Triángulo Central
fillTriangleCenter() {
    // Limpia la matriz
    this.clear(0);

    const mid = Math.floor(this.cols / 2); // centro horizontal
    let height = Math.floor(this.rows / 2); // controla hasta dónde llega el triángulo

    for (let i = 0; i <= height; i++) {
        // Rango de columnas para cada fila
        for (let j = mid - i; j <= mid + i; j++) {
            if (j >= 0 && j < this.cols) {
                this.data[i + 1][j] = 1; // el +1 baja un poco el triángulo al centro
            }
        }
    }
}


// EJERCICIO 13. Rombos Concéntricos
fillConcentricRhombus() {
    this.clear(0);
    const n = this.rows;
    const center = Math.floor(n / 2);

    for (let layer = 0; layer <= center; layer++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                // Si la suma de distancias desde el centro es igual a la capa, marca un 1
                if (Math.abs(i - center) + Math.abs(j - center) === layer) {
                    this.data[i][j] = 1;
                }
            }
        }
    }
}


// EJERCICIO 14. Cruces Concéntricas
// Dibuja cruces una dentro de otra
fillConcentricCrosses() {
    this.clear(0);
    const n = this.rows;

    for (let layer = 1; layer < n / 2; layer += 2) {
        for (let i = layer; i < n - layer; i++) {
            // líneas horizontales de la cruz
            this.data[layer][i] = 1;
            this.data[n - layer - 1][i] = 1;
            // líneas verticales de la cruz
            this.data[i][layer] = 1;
            this.data[i][n - layer - 1] = 1;
        }
    }
}


// EJERCICIO 15. Bandera Diagonal
// Rellena la mitad superior izquierda con 1 según la diagonal.
fillDiagonalFlag() {
    this.clear(0);
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j <= i; j++) {
            this.data[i][j] = 1;
        }
    }
}

// EJERCICIO 16. Cuadrado dentro de Cuadrado
// Dibuja un cuadrado de 1 en el borde exterior y otro cuadrado interno de 2.
fillSquareInsideSquare() {
    this.clear(0);

    const n = this.rows;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // Borde externo
            if (i === 0 || i === n - 1 || j === 0 || j === n - 1) {
                this.data[i][j] = 1;
            }
            // Cuadrado interno sólido
            else if (i >= 2 && i <= n - 3 && j >= 2 && j <= n - 3) {
                this.data[i][j] = 2;
            }
        }
    }
}



// EJERCICIO 17. Bordes y Centro
fillBordersAndCenter() {
    this.clear(0);

    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {

            // Bordes de la matriz
            if (i === 0 || i === this.rows - 1 || j === 0 || j === this.cols - 1) {
                this.data[i][j] = 1;
            }

            // Zona central (3x3)
            else if (i >= 3 && i <= 5 && j >= 3 && j <= 5) {
                this.data[i][j] = 2;
            }
        }
    }
}


// EJERCICIO 18. Líneas Paralelas
// Dibuja líneas horizontales y verticales alternas con 1.
fillParallelLines() {
    this.clear(0);

    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {

            // Fila o columna par → 1
            if (i % 2 === 0 || j % 4 === 0) {
                this.data[i][j] = 1;
            }
        }
    }
}


// EJERCICIO 19. Marcas de Cruz (X)
// Crea un patrón con cruces diagonales cada ciertos intervalos.
fillCrossMarks() {
    this.clear(0);

    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
            // Cruces diagonales en patrón X repetido
            if ( (i % 4 === j % 4) || (i % 4 === (3 - j % 4)) ) {
                this.data[i][j] = 1;
            }
        }
    }
}


// EJERCICIO 20. Rombo en Esquinas
fillCornerDiamonds() {
    this.clear(0);

    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {

            // Esquinas superiores
            if ((i + j) < 4 || (i + (this.cols - j - 1)) < 4) {
                this.data[i][j] = 1;
            }

            // Esquinas inferiores
            if (((this.rows - i - 1) + j) < 4 || ((this.rows - i - 1) + (this.cols - j - 1)) < 4) {
                this.data[i][j] = 1;
            }
        }
    }
}


// EJERCICIO 21. Relleno de Ajedrez
fillChessPattern() {
    this.clear(0);

    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
            // Alternar: fila + columna par = 1, impar = 0
            this.data[i][j] = (i + j) % 2 === 0 ? 1 : 0;
        }
    }
}


// EJERCICIO 22. Reloj de Arena
fillHourglass() {
    this.clear(0);

    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {

            // Reloj de arena: parte superior e inferior en diagonal
            if (j >= i && j < this.cols - i || j >= this.rows - i - 1 && j < i + 1) {
                this.data[i][j] = 1;
            }
        }
    }
}

}
