// Elementos del DOM
const canvas = document.getElementById('matrixCanvas');
const fillButton = document.getElementById('fillBtn');
const clearButton = document.getElementById('clearBtn');
const botonManual = document.getElementById("manualBtn");
// Botón para cambiar la matriz
const rotar90DerBtn = document.getElementById('rotar90DerBtn');
const botonSuma = document.getElementById("sumarBtn");
const botonDuplicadas = document.getElementById("duplicadasBtn");
const botonMultiplicarEscalar = document.getElementById("multiplicarEscalarBtn");



// Contexto de dibujo
const context = canvas.getContext('2d');

// Instancia de la matriz
const matrix = new Matrix(5, 5, 0);

// Inicializa el canvas y agrega eventos
function initializeCanvas() {
    drawMatrix();
    window.addEventListener('resize', drawMatrix);
    fillButton.addEventListener('click', fillMatrix);  // <-- CORREGIDO
    clearButton.addEventListener('click', clearCanvas);
}

// Dibuja la matriz en el canvas
function drawMatrix() {
    const width = canvas.width = canvas.clientWidth;
    const height = canvas.height = canvas.clientHeight;
    const cellWidth = width / matrix.cols;
    const cellHeight = height / matrix.rows;

    context.clearRect(0, 0, width, height);
    context.font = `${Math.min(cellWidth, cellHeight) / 3}px Arial`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    for (let row = 0; row < matrix.rows; row++) {
        for (let col = 0; col < matrix.cols; col++) {
            const x = col * cellWidth;
            const y = row * cellHeight;
            const value = matrix.getValue(row, col);

            context.strokeRect(x, y, cellWidth, cellHeight); // Dibuja la celda
            context.fillText(value, x + cellWidth / 2, y + cellHeight / 2); // Dibuja el valor
        }
    }
}

// Llena la matriz con valores aleatorios y la dibuja
function fillMatrix() {
    matrix.fillRandom(0, 9);
    drawMatrix();
}

// Limpia el canvas
function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

botonManual.addEventListener("click", function() {
  const contenedor = document.getElementById("matrizContainer");
  contenedor.innerHTML = "";
  const tabla = document.createElement("table");

  for (let i = 0; i < matrix.rows; i++) {
    const fila = document.createElement("tr");
    for (let j = 0; j < matrix.cols; j++) {
      const celda = document.createElement("td");
      const input = document.createElement("input");
      input.type = "number";
      input.value = matrix.data[i][j] || "";
      input.addEventListener("input", () => {
        matrix.data[i][j] = Number(input.value);
      });
      celda.appendChild(input);
      fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }
  contenedor.appendChild(tabla);
});

rotar90DerBtn.addEventListener('click', () => {
  matrix.rotar90Derecha();
  drawMatrix();
});

botonSuma.addEventListener("click", function() {
  let total = matrix.sumaTotal(); // llama al método que creaste
  alert("La suma total de la matriz es: " + total);
});

botonDuplicadas.addEventListener("click", function() {
  // Detecta las filas duplicadas en la matriz
  const duplicadas = matrix.detectarFilasDuplicadas();

  // Muestra el resultado en un alert
  if (duplicadas.length === 0) {
    alert("No hay filas duplicadas.");
  } else {
    let mensaje = "Filas duplicadas encontradas:\n";
    for (let par of duplicadas) {
      mensaje += `Fila ${par[0]} y Fila ${par[1]}\n`;
    }
    alert(mensaje);
  }
});

botonMultiplicarEscalar.addEventListener("click", function() {
  const escalar = parseFloat(prompt("Ingrese el número escalar para multiplicar la matriz:"));

  if (isNaN(escalar)) {
    alert("Por favor ingrese un número válido.");
    return;
  }

  // Multiplicar la matriz
  matrix.multiplicarPorEscalar(escalar);

  // Redibujar la matriz actualizada
  drawMatrix();

  alert("La matriz fue multiplicada por " + escalar);
});




// Ejecutar inicialización al cargar
initializeCanvas();