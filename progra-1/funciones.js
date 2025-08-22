// 1. Convertir decimal
function convertirDecimal(numero) {
    function aBase(numero, base) {
        let resultado = "";
        let digitos = "0123456789ABCDEF";
        if(numero === 0) return "0";
        while (numero > 0) {
            let residuo = numero % base;
            resultado = digitos[residuo] + resultado;
            numero = Math.floor(numero/base);
        }
        return resultado;
    }
    return {
        bin: aBase(numero,2),
        oct: aBase(numero,8),
        hex: aBase(numero,16)
    };
}
function convertirDecimalBtn() {
    const num = parseInt(document.getElementById("numDecimal").value);
    const res = convertirDecimal(num);
    document.getElementById("resultadoDecimal").innerHTML = `
      Binario: ${res.bin}<br>
      Octal: ${res.oct}<br>
      Hexadecimal: ${res.hex}
    `;
}

// 2. Sumar binarios
function binarioADecimal(binario) {
    let decimal = 0;
    let potencia = 1;
    for(let i = binario.length - 1; i >= 0; i--) {
        if (binario[i] === '1') {
            decimal += potencia;
        }
        potencia *= 2;
    }
    return decimal;
}
function sumarBinarios(bin1, bin2) {
    let num1 = binarioADecimal(bin1);
    let num2 = binarioADecimal(bin2);
    return num1 + num2;
}
function sumarBinariosBtn() {
    let bin1 = document.getElementById("bin1").value;
    let bin2 = document.getElementById("bin2").value;
    let suma = sumarBinarios(bin1, bin2);
    document.getElementById("resultadoSumaBin").innerText = "Suma en decimal: " + suma;
}

// 3. Hex ↔ Binario
function hexADecimal(hex) {
    let digitos = "0123456789ABCDEF";
    hex = hex.toUpperCase();
    let decimal = 0, potencia = 1;
    for (let i = hex.length - 1; i >= 0; i--) {
        let valor = digitos.indexOf(hex[i]);
        decimal += valor * potencia;
        potencia *= 16;
    }
    return decimal;
}
function decimalABinario(numero) {
    let resultado = "";
    if (numero === 0) return "0";
    while (numero > 0) {
        resultado = (numero % 2) + resultado;
        numero = Math.floor(numero/2);
    }
    return resultado;
}
function binarioAHex(binario) {
    let decimal = binarioADecimal(binario);
    return convertirDecimalAHex(decimal);
}
function convertirDecimalAHex(numero) {
    let resultado = "";
    let digitos = "0123456789ABCDEF";
    while (numero > 0) {
        let residuo = numero % 16;
        resultado = digitos[residuo] + resultado;
        numero = Math.floor(numero/16);
    }
    return resultado || "0";
}
function hexABinarioBtn() {
    let hex = document.getElementById("hexInput").value;
    let bin = decimalABinario(hexADecimal(hex));
    document.getElementById("resultadoHexBin").innerText = "Binario: " + bin;
}
function binarioAHexBtn() {
    let bin = document.getElementById("binInput").value;
    let hex = binarioAHex(bin);
    document.getElementById("resultadoHexBin").innerText = "Hexadecimal: " + hex;
}

// 4. Operaciones con binarios
function operarBinarios(bin1, bin2, operacion) {
    let a = binarioADecimal(bin1);
    let b = binarioADecimal(bin2);
    let resultado;
    if (operacion === "suma") resultado = a + b;
    else if (operacion === "resta") resultado = a - b;
    else if (operacion === "multiplicacion") resultado = a * b;
    else if (operacion === "division") {
        if (b === 0) return "Error: división por cero.";
        resultado = Math.floor(a/b);
    }
    return {
        decimal: resultado,
        binario: decimalABinario(resultado)
    };
}
function operarBinariosBtn() {
    let b1 = document.getElementById("binOp1").value;
    let b2 = document.getElementById("binOp2").value;
    let op = document.getElementById("operacion").value;
    let res = operarBinarios(b1,b2,op);
    document.getElementById("resultadoOperar").innerHTML = `
      Resultado en decimal: ${res.decimal}<br>
      Resultado en binario: ${res.binario}
    `;
}

// 5. Tabla multiplicar
function tablaMultiplicar(numero) {
    let i = 1, salida = "";
    while (i <= 10) {
        salida += `${numero} x ${i} = ${numero*i}<br>`;
        i++;
    }
    return salida;
}
function tablaMultiplicarBtn() {
    let num = parseInt(document.getElementById("numTabla").value);
    document.getElementById("resultadoTabla").innerHTML = tablaMultiplicar(num);
}

// 6. Suma pares 1-50
function sumaPares() {
    let suma = 0, i = 1;
    while (i <= 50) {
        if (i % 2 === 0) suma += i;
        i++;
    }
    return suma;
}
function sumaParesBtn() {
    document.getElementById("resultadoPares").innerText = "Suma: " + sumaPares();
}

// 7. Suma primos 1-100
function esPrimo(n) {
    if (n < 2) return false;
    let i = 2;
    while (i <= Math.sqrt(n)) {
        if (n % i === 0) return false;
        i++;
    }
    return true;
}
function sumaPrimos() {
    let suma = 0, i = 1;
    while (i <= 100) {
        if (esPrimo(i)) suma += i;
        i++;
    }
    return suma;
}
function sumaPrimosBtn() {
    document.getElementById("resultadoPrimos").innerText = "Suma: " + sumaPrimos();
}



