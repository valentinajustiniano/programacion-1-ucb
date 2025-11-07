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

    // Función de validación de rango válido en la matriz
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

    fillRandom(min, max) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const random = Math.floor(Math.random() * (max - min + 1)) + min;
                this.data[i][j] = random;
            }
        }
    }


//EJERCICIOS EXAMEN 


rotar90Derecha() {
  const n = this.rows; // asumimos matriz cuadrada
  const nueva = new Matrix(n, n, 0);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      nueva.data[j][n - 1 - i] = this.data[i][j];
    }
  }

  this.data = nueva.data;
}

sumaTotal() {
  let suma = 0;
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      suma += this.data[i][j];
    }
  }
  return suma;
}

// 40. Detectar filas duplicadas
detectarFilasDuplicadas() {
  const duplicadas = [];

  for (let i = 0; i < this.rows; i++) {
    for (let j = i + 1; j < this.rows; j++) {
      let sonIguales = true;

      for (let k = 0; k < this.cols; k++) {
        if (this.data[i][k] !== this.data[j][k]) {
          sonIguales = false;
          break;
        }
      }

      if (sonIguales) {
        duplicadas.push([i, j]);
      }
    }
  }

  return duplicadas;
}

multiplicarPorEscalar(escalar) {
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      this.data[i][j] *= escalar;
    }
  }
}



    toString() {
        return this.data.map(row => row.join('\t')).join('\n');
    }
}