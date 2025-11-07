//26. Reflejo vertical (intercambia filas arriba ↔ abajo)
reflejoVertical() {
    for (let i = 0; i < Math.floor(this.rows / 2); i++) {
        const temp = this.data[i];
        this.data[i] = this.data[this.rows - 1 - i];
        this.data[this.rows - 1 - i] = temp;
    }
}

//27. Reflejo horizontal (invierte cada fila izquierda ↔ derecha)
reflejoHorizontal() {
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < Math.floor(this.cols / 2); j++) {
            const temp = this.data[i][j];
            this.data[i][j] = this.data[i][this.cols - 1 - j];
            this.data[i][this.cols - 1 - j] = temp;
        }
    }
}

//28. Rotar 90 a la derecha sentido horario 
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

//29. Rotar 90 a la izquierda sentido antihorario 
rotar90Izquierda() {
    const n = this.rows; // asumimos matriz cuadrada
    const nueva = new Matrix(n, n, 0);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            nueva.data[n - 1 - j][i] = this.data[i][j];
        }
    }

    this.data = nueva.data;
}

//30. Rotar 180 grados 
rotar180() {
    const n = this.rows; // asumimos matriz cuadrada
    const nueva = new Matrix(n, n, 0);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            nueva.data[n - 1 - i][n - 1 - j] = this.data[i][j];
        }
    }

    this.data = nueva.data;
}

//31. IIntercambiar filas pares por impares
intercambiarFilasParesImpares() {
  for (let i = 0; i < this.rows; i += 2) {
    if (i + 1 >= this.rows) break;
    const tempFila = this.data[i];
    this.data[i] = this.data[i + 1];
    this.data[i + 1] = tempFila;
  }
}

//32.  Intercambiar columnas pares por impares
intercambiarColumnasParesImpares() {
  for (let j = 0; j < this.cols; j += 2) {
    if (j + 1 >= this.cols) break;
    for (let i = 0; i < this.rows; i++) {
      const temp = this.data[i][j];
      this.data[i][j] = this.data[i][j + 1];
      this.data[i][j + 1] = temp;
    }
  }
}

//33. Intercambair primer y ultima fila
intercambiarPrimeraUltimaFila() {
  const n = this.rows;
  const temp = this.data[0];
  this.data[0] = this.data[n - 1];
  this.data[n - 1] = temp;
}

//34. Intercambiar primera y ultima columna 
intercambiarPrimeraUltimaColumna() {
  const n = this.rows;
  const m = this.cols;

  for (let i = 0; i < n; i++) {
    const temp = this.data[i][0];
    this.data[i][0] = this.data[i][m - 1];
    this.data[i][m - 1] = temp;
  }
}

//35. Transponer mitad superior
transponerMitadSuperior() {
  const n = this.rows;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const temp = this.data[i][j];
      this.data[i][j] = this.data[j][i];
      this.data[j][i] = temp;
    }
  }
}

//36. Contar ceros en la matriz
contarCeros() {
  let contador = 0;
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      if (this.data[i][j] === 0) {
        contador++;
      }
    }
  }
  return contador;
}

//37. Contar avlores mayores que el promedio 
contarMayoresPromedio() {
    let suma = 0;
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
            suma += this.data[i][j];
        }
    }
    const promedio = suma / (this.rows * this.cols);

    let contador = 0;
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
            if (this.data[i][j] > promedio) {
                contador++;
            }
        }
    }
    return contador;
}

/*botonMayores.addEventListener("click", function() {
    const resultado = matrix.contarMayoresPromedio();
    alert(
        `Promedio: ${resultado.promedio.toFixed(2)}\n` +
        `Cantidad de valores mayores al promedio: ${resultado.contador}`
    );
});*/

//38. Contar valores unicos 
contarValoresUnicos() {
    const conjunto = new Set();
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
            conjunto.add(this.data[i][j]);
        }
    }
    return conjunto.size;
}

// 39. Frecuencia de cada número
frecuenciaNumeros() {
  const frecuencia = {};

  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      const valor = this.data[i][j];
      if (frecuencia[valor]) {
        frecuencia[valor]++;
      } else {
        frecuencia[valor] = 1;
      }
    }
  }

  return frecuencia;
}

//40. Detectar filas duplicadas 
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

//41. Detectar columnas duplicadas
detectarColumnasDuplicadas() {
  const duplicadas = [];

  // Recorremos todas las columnas posibles
  for (let i = 0; i < this.cols; i++) {
    for (let j = i + 1; j < this.cols; j++) {
      let sonIguales = true;

      // Recorremos las filas para comparar las dos columnas
      for (let k = 0; k < this.rows; k++) {
        if (this.data[k][i] !== this.data[k][j]) {
          sonIguales = false;
          break;
        }
      }

      if (sonIguales) {
        duplicadas.push([i, j]); // guardamos el índice de las columnas duplicadas
      }
    }
  }

  return duplicadas;
}

//42. Detectar simetria vertical
esSimetricaVertical() {
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < Math.floor(this.cols / 2); j++) {
      if (this.data[i][j] !== this.data[i][this.cols - 1 - j]) {
        return false; // Si alguna celda no coincide, no es simétrica
      }
    }
  }
  return true; // Todas las filas cumplen la simetría vertical
}

//43. Detectar simetria horizontal
esSimetricaHorizontal() {
  for (let j = 0; j < this.cols; j++) {
    for (let i = 0; i < Math.floor(this.rows / 2); i++) {
      if (this.data[i][j] !== this.data[this.rows - 1 - i][j]) {
        return false; // Si alguna celda no coincide, no es simétrica
      }
    }
  }
  return true; // Todas las columnas cumplen la simetría horizontal
}

//44.Detectar simetría diagonal secundaria
esSimetricaDiagonalSecundaria() {
  const n = this.rows; // matriz cuadrada
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (this.data[i][j] !== this.data[n - 1 - j][n - 1 - i]) {
        return false;
      }
    }
  }
  return true;
}

//45. Detectar patrón escalonado
tienePatronEscalonado() {
  let cantidadEsperada = 1;

  for (let i = 0; i < this.rows; i++) {
    let valoresFila = this.data[i].filter(valor => valor !== 0).length;

    if (valoresFila !== cantidadEsperada) {
      return false;
    }

    cantidadEsperada++;
  }

  return true;
}

//46. Generar matriz escalonada
generarMatrizEscalonada() {
  let contador = 1;
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      this.data[i][j] = contador;
      contador++;
    }
  }
}

//47. Generar matriz tipo tablero de ajedrez
generarTableroAjedrez() {
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      this.data[i][j] = (i + j) % 2 === 0 ? 1 : 0;
    }
  }
}

//48. Generar matriz con diagonales en 1
generarDiagonales() {
  const n = this.rows; // matriz cuadrada

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      this.data[i][j] = (i === j || i + j === n - 1) ? 1 : 0;
    }
  }
}

//49. Generar matriz con borde en 1
generarBorde() {
  const n = this.rows;
  const m = this.cols;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      this.data[i][j] = (i === 0 || i === n - 1 || j === 0 || j === m - 1) ? 1 : 0;
    }
  }
}

//50. Generar matriz con patrón triangular
generarTriangulo() {
  const n = this.rows;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      this.data[i][j] = (j <= i) ? i + j + 1 : 0;
    }
  }
}

//51. Generar matriz en espiral
generarMatrizEspiral() {
  const n = this.rows;
  let valor = 1;
  let superior = 0, inferior = n - 1, izquierdo = 0, derecho = n - 1;

  while (valor <= n * n) {
    for (let j = izquierdo; j <= derecho; j++) this.data[superior][j] = valor++;
    superior++;
    for (let i = superior; i <= inferior; i++) this.data[i][derecho] = valor++;
    derecho--;
    for (let j = derecho; j >= izquierdo; j--) this.data[inferior][j] = valor++;
    inferior--;
    for (let i = inferior; i >= superior; i--) this.data[i][izquierdo] = valor++;
    izquierdo++;
  }
}

//52. Generar matriz en zigzag horizontal
generarMatrizZigzag() {
  const n = this.rows;
  const m = this.cols;
  let valor = 1;

  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) {
      for (let j = 0; j < m; j++) this.data[i][j] = valor++;
    } else {
      for (let j = m - 1; j >= 0; j--) this.data[i][j] = valor++;
    }
  }
}

//53. Generar matriz en zigzag vertical
generarMatrizZigzagVertical() {
  const n = this.rows;
  const m = this.cols;
  let valor = 1;

  for (let j = 0; j < m; j++) {
    if (j % 2 === 0) {
      for (let i = 0; i < n; i++) {
        this.data[i][j] = valor++;
      }
    } else {
      for (let i = n - 1; i >= 0; i--) {
        this.data[i][j] = valor++;
      }
    }
  }
}

//54. Generar matriz con múltiplos de 3
generarMatrizMultiplosDe3() {
  let valor = 3;
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      this.data[i][j] = valor;
      valor += 3;
    }
  }
}

//55. Generar matriz con numeros primos
generarMatrizPrimos() {
  let contador = 0;
  let numero = 2;

  // Función auxiliar para verificar si un número es primo
  const esPrimo = (n) => {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) return false;
    }
    return true;
  };

  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      while (!esPrimo(numero)) {
        numero++;
      }
      this.data[i][j] = numero;
      numero++;
      contador++;
    }
  }
}

//56. Multiplicar Matriz por escalar
multiplicarPorEscalar(escalar) {
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      this.data[i][j] *= escalar;
    }
  }
}

//59. Verificar si la matriz es identidad
esIdentidad() {
  if (this.rows !== this.cols) return false;

  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      if (i === j && this.data[i][j] !== 1) return false;
      if (i !== j && this.data[i][j] !== 0) return false;
    }
  }
  return true;
}

//60. Verificar si una matriz es diagonal
esDiagonal() {
  if (this.rows !== this.cols) return false;

  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      if (i !== j && this.data[i][j] !== 0) return false;
    }
  }
  return true;
}

//61/ Verificar si una matriz es nula
esNula() {
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      if (this.data[i][j] !== 0) return false;
    }
  }
  return true;
}

//62. Verificar si la matriz es ortogonal 
esOrtogonal() {
  if (this.rows !== this.cols) return false;

  const n = this.rows;
  const transpuesta = new Matrix(n, n, 0);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      transpuesta.data[i][j] = this.data[j][i];
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let suma = 0;
      for (let k = 0; k < n; k++) {
        suma += this.data[i][k] * transpuesta.data[k][j];
      }
      if (i === j && suma !== 1) return false;
      if (i !== j && suma !== 0) return false;
    }
  }
  return true;
}

//63. Normalizar matriz
normalizar() {
  let min = this.data[0][0];
  let max = this.data[0][0];

  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      if (this.data[i][j] < min) min = this.data[i][j];
      if (this.data[i][j] > max) max = this.data[i][j];
    }
  }

  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      this.data[i][j] = (this.data[i][j] - min) / (max - min);
    }
  }
}

//64. Aplicar umbral binario 
aplicarUmbral(umbral) {
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      this.data[i][j] = (this.data[i][j] >= umbral) ? 1 : 0;
    }
  }
}


//66. Extraer submatriz central
extraerSubmatrizCentral(p, q) {
  const startRow = Math.floor((this.rows - p) / 2);
  const startCol = Math.floor((this.cols - q) / 2);
  const submatriz = [];

  for (let i = 0; i < p; i++) {
    const fila = [];
    for (let j = 0; j < q; j++) {
      fila.push(this.data[startRow + i][startCol + j]);
    }
    submatriz.push(fila);
  }

  return submatriz;
}

//67. Extraer borde como arreglo
extraerBorde() {
  const borde = [];

  // Primera fila
  for (let j = 0; j < this.cols; j++) {
    borde.push(this.data[0][j]);
  }

  // Filas intermedias (solo extremos)
  for (let i = 1; i < this.rows - 1; i++) {
    borde.push(this.data[i][0]);
    borde.push(this.data[i][this.cols - 1]);
  }

  // Última fila
  for (let j = 0; j < this.cols; j++) {
    borde.push(this.data[this.rows - 1][j]);
  }

  return borde;
}

//68. Extraer diagonales como arreglos
extraerDiagonales() {
  const diagonalPrincipal = [];
  const diagonalSecundaria = [];

  for (let i = 0; i < this.rows; i++) {
    diagonalPrincipal.push(this.data[i][i]);
    diagonalSecundaria.push(this.data[i][this.cols - 1 - i]);
  }

  return { diagonalPrincipal, diagonalSecundaria };
}

//69. 
esSimetrica() {
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      if (this.data[i][j] !== this.data[j][i]) return false;
    }
  }
  return true;
}

//70.
triangularSuperior() {
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      if (j < i) this.data[i][j] = 0;
    }
  }
}

//71.
triangularInferior() {
  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      if (i < j) this.data[i][j] = 0;
    }
  }
}

//72. 
patronCruz() {
  const n = this.rows;
  const c = Math.floor(n / 2);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      this.data[i][j] = (i === c || j === c) ? 1 : 0;
    }
  }
}

//73.
patronX() {
  const n = this.rows;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      this.data[i][j] = (i === j || i + j === n - 1) ? 1 : 0;
    }
  }
}

//74
bordeAlternado() {
  const n = this.rows;
  const m = this.cols;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (i === 0 || i === n - 1 || j === 0 || j === m - 1) {
        this.data[i][j] = (i + j) % 2;
      } else {
        this.data[i][j] = 0;
      }
    }
  }
}

//75
generarEspinaPescado() {
    let contador = 1;
    const n = this.rows;
    const m = this.cols;

    for (let s = 0; s < n + m - 1; s++) {
        if (s % 2 === 0) {
            for (let i = 0; i < n; i++) {
                let j = s - i;
                if (j >= 0 && j < m) {
                    this.data[i][j] = contador++;
                }
            }
        } else {
            for (let i = n - 1; i >= 0; i--) {
                let j = s - i;
                if (j >= 0 && j < m) {
                    this.data[i][j] = contador++;
                }
            }
        }
    }
}

//76
generarSerpiente() {
    let contador = 1;
    for (let i = 0; i < this.rows; i++) {
        if (i % 2 === 0) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = contador++;
            }
        } else {
            for (let j = this.cols - 1; j >= 0; j--) {
                this.data[i][j] = contador++;
            }
        }
    }
}

//77
generarColumnasAlternadas() {
    let contador = 1;
    for (let j = 0; j < this.cols; j++) {
        if (j % 2 === 0) {
            for (let i = 0; i < this.rows; i++) {
                this.data[i][j] = contador++;
            }
        } else {
            for (let i = this.rows - 1; i >= 0; i--) {
                this.data[i][j] = contador++;
            }
        }
    }
}

//78
generarEspiralInversa() {
    const n = this.rows;
    let inicioFila = 0, finFila = n - 1;
    let inicioCol = 0, finCol = n - 1;
    let valor = 1;

    while (inicioFila <= finFila && inicioCol <= finCol) {
        for (let j = finCol; j >= inicioCol; j--) this.data[finFila][j] = valor++;
        for (let i = finFila - 1; i >= inicioFila; i--) this.data[i][inicioCol] = valor++;
        for (let j = inicioCol + 1; j <= finCol; j++) this.data[inicioFila][j] = valor++;
        for (let i = inicioFila + 1; i < finFila; i++) this.data[i][finCol] = valor++;
        inicioFila++; finFila--; inicioCol++; finCol--;
    }
}

//79. 
generarZigzagDiagonal() {
    const n = this.rows;
    const m = this.cols;
    let valor = 1;

    for (let s = 0; s <= n + m - 2; s++) {
        if (s % 2 === 0) {
            for (let i = 0; i <= s; i++) {
                let j = s - i;
                if (i < n && j < m) this.data[i][j] = valor++;
            }
        } else {
            for (let i = s; i >= 0; i--) {
                let j = s - i;
                if (i < n && j < m) this.data[i][j] = valor++;
            }
        }
    }
}

//80. 
generarCapasConcentricas() {
    const n = this.rows;
    const capas = Math.ceil(n / 2);
    for (let capa = 0; capa < capas; capa++) {
        let valor = capa + 1;
        for (let i = capa; i < n - capa; i++) {
            this.data[capa][i] = valor;
            this.data[n - 1 - capa][i] = valor;
        }
        for (let i = capa + 1; i < n - 1 - capa; i++) {
            this.data[i][capa] = valor;
            this.data[i][n - 1 - capa] = valor;
        }
    }
}

//81. 
generarPiramide() {
    let n = this.rows;
    let valor = 1;
    for (let i = 0; i < n; i++) {
        let inicio = Math.floor(n/2) - i;
        let fin = Math.floor(n/2) + i;
        for (let j = 0; j < n; j++) {
            this.data[i][j] = (j >= inicio && j <= fin) ? valor++ : 0;
        }
    }
}

//82.
generarDiamante() {
    let n = this.rows;
    let c = Math.floor(n/2);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            this.data[i][j] = (Math.abs(i - c) + Math.abs(j - c) <= c) ? 1 : 0;
        }
    }
}

//83.
generarEscalera() {
    let n = this.rows;
    let m = this.cols;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            this.data[i][j] = (i === j) ? 1 : 0;
        }
    }
}

//84.
generarFlecha() {
    let n = this.rows;
    let c = Math.floor(n/2);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            this.data[i][j] = (j === c || (i === j && i <= c)) ? 1 : 0;
        }
    }
}

// Ejercicio 85 - Reloj de arena
generarRelojArena() {
    const n = this.rows;
    const c = Math.floor(n / 2);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            this.data[i][j] = (j >= i - c && j < n - (i - c) && i <= c) || 
                              (j >= c - (n - 1 - i) && j < n - (c - (n - 1 - i)) && i > c) ? 1 : 0;
        }
    }
}

// Ejercicio 86 - Espejo diagonal
generarEspejoDiagonal() {
    const n = this.rows;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [this.data[i][j], this.data[j][i]] = [this.data[j][i], this.data[i][j]];
        }
    }
}

// Ejercicio 87 - Serpiente vertical
generarSerpienteVertical() {
    const n = this.rows;
    const m = this.cols;
    let contador = 1;
    for (let j = 0; j < m; j++) {
        if (j % 2 === 0) {
            for (let i = 0; i < n; i++) this.data[i][j] = contador++;
        } else {
            for (let i = n - 1; i >= 0; i--) this.data[i][j] = contador++;
        }
    }
}

// Ejercicio 88 - Columnas espejo
generarColumnasEspejo() {
    const n = this.rows;
    const m = this.cols;
    const mitad = Math.floor(m / 2);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= mitad; j++) {
            if (j !== m - 1 - j) this.data[i][m - 1 - j] = this.data[i][j];
        }
    }
}
