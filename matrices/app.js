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


const context = canvas.getContext('2d');
const matrix = new Matrix(5, 5, 0);

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

            context.strokeRect(x, y, cellWidth, cellHeight);
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

initializeCanvas();
