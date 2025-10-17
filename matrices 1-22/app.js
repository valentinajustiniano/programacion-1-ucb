// Elementos del DOM
const canvas = document.getElementById('matrixCanvas');
const fillButton = document.getElementById('fillBtn');
const clearButton = document.getElementById('clearBtn');
const incrementBtn = document.getElementById('incrementBtn');
const squareBtn = document.getElementById('squareBtn');
const frameBtn = document.getElementById('frameBtn');
const crossBtn = document.getElementById('crossBtn');
const borderDiagBtn = document.getElementById('borderDiagBtn');
const flagBtn = document.getElementById('flagBtn');
const alternateBtn = document.getElementById('alternateBtn');
const zigzagBtn = document.getElementById('zigzagBtn');
const spiralBtn = document.getElementById('spiralBtn');
const upperLeftBtn = document.getElementById('upperLeftBtn');
const lowerRightBtn = document.getElementById('lowerRightBtn');
const gridBtn = document.getElementById('gridBtn');
const triangleBtn = document.getElementById('triangleBtn');
const rhombusBtn = document.getElementById('rhombusBtn');
const crossesBtn = document.getElementById('crossesBtn');
const diagFlagBtn = document.getElementById('diagFlagBtn');
const squareInsideBtn = document.getElementById('squareInsideBtn');
const bordersCenterBtn = document.getElementById('bordersCenterBtn');
const parallelLinesBtn = document.getElementById('parallelLinesBtn');
const crossMarksBtn = document.getElementById('crossMarksBtn');
const cornerDiamondsBtn = document.getElementById('cornerDiamondsBtn');
const chessBtn = document.getElementById('chessBtn');
const hourglassBtn = document.getElementById('hourglassBtn');


const context = canvas.getContext('2d');
const matrix = new Matrix(10, 10, 0);

function initializeCanvas() {
    drawMatrix();
    window.addEventListener('resize', drawMatrix);
    fillButton.addEventListener('click', fillMatrix);
    clearButton.addEventListener('click', clearCanvas);
    incrementBtn.addEventListener('click', fillIncrementRows);
}

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

            // Asignar color de fondo solo para 0, 1, 2
            let fillColor = '#ffffff'; // default blanco
            if (value === 1) fillColor = '#FFCF00'; // amarillo UCB
            else if (value === 2) fillColor = '#004679'; // azul UCB
            else fillColor = '#ffffff'; // cualquier otro número → blanco

            // Dibujar fondo
            context.fillStyle = fillColor;
            context.fillRect(x, y, cellWidth, cellHeight);

            // Dibujar borde
            context.strokeStyle = '#5A6675';
            context.strokeRect(x, y, cellWidth, cellHeight);

            // Dibujar número siempre
            context.fillStyle = '#000000'; // negro para todos los números
            context.fillText(value, x + cellWidth / 2, y + cellHeight / 2);
        }
    }
}


function fillMatrix() {
    matrix.fillRandom(0, 9); 
    drawMatrix();
}

function fillIncrementRows() {
    matrix.fillIncrementRows();
    drawMatrix();
}

function clearCanvas() {
    matrix.clear(0); 
    drawMatrix();
}

squareBtn.addEventListener('click', () => {
  matrix.fillAllOnes();
  drawMatrix();
});

frameBtn.addEventListener('click', () => {
  matrix.fillInnerFrame();
  drawMatrix();
});

crossBtn.addEventListener('click', () => {
  matrix.fillCross();
  drawMatrix();
});

borderDiagBtn.addEventListener('click', () => {
  matrix.fillBordersAndDiagonals();
  drawMatrix();
});

flagBtn.addEventListener('click', () => {
  matrix.fillFlag();
  drawMatrix();
});

alternateBtn.addEventListener('click', () => {
  matrix.fillAlternateRows();
  drawMatrix();
});

zigzagBtn.addEventListener('click', () => {
  matrix.fillZigZag();
  drawMatrix();
});

spiralBtn.addEventListener('click', () => {
    matrix.fillSpiral();  
    drawMatrix();          
});

upperLeftBtn.addEventListener('click', () => {
    matrix.fillUpperLeftTriangle();
    drawMatrix();
});

lowerRightBtn.addEventListener('click', () => {
    matrix.fillLowerRightTriangle();
    drawMatrix();
});

gridBtn.addEventListener('click', () => {
    matrix.fillGrid();
    drawMatrix();
});

triangleBtn.addEventListener('click', () => {
    matrix.fillTriangleCenter();
    drawMatrix();
});

rhombusBtn.addEventListener('click', () => {
    matrix.fillConcentricRhombus();
    drawMatrix();
});

crossesBtn.addEventListener('click', () => {
    matrix.fillConcentricCrosses();
    drawMatrix();
});

diagFlagBtn.addEventListener('click', () => {
    matrix.fillDiagonalFlag();
    drawMatrix();
});

squareInsideBtn.addEventListener('click', () => {
    matrix.fillSquareInsideSquare();
    drawMatrix();
});

bordersCenterBtn.addEventListener('click', () => {
    matrix.fillBordersAndCenter();
    drawMatrix();
});

parallelLinesBtn.addEventListener('click', () => {
    matrix.fillParallelLines();
    drawMatrix();
});

crossMarksBtn.addEventListener('click', () => {
    matrix.fillCrossMarks();
    drawMatrix();
});

cornerDiamondsBtn.addEventListener('click', () => {
    matrix.fillCornerDiamonds();
    drawMatrix();
});

chessBtn.addEventListener('click', () => {
    matrix.fillChessPattern();
    drawMatrix();
});

hourglassBtn.addEventListener('click', () => {
    matrix.fillHourglass();
    drawMatrix();
});


initializeCanvas();
