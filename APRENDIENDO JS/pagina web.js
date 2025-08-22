//1. convertir un numero decimal a binario, cotal y hexadecimal
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
    console.log("Binario:", aBase(numero,2));
    console.log("Octal:", aBase(numero,8));
    console.log("Hexadecimal:", aBase(numero,16));
}

//2. sumar dos numeros binarios y mostrar resultado en decimal
function binarioADecimal(binario) {
    let decimal = 0;
    let potencia = 1;
    
    for(let i = binario.length - 1; i >= 0; i--) {
        if (binario[i] === '1') {
            decimal += potencia;

        }
    }
    return decimal;
}

function sumarBinarios(bin1, bin2) {
    let num1 = binarioADecimal(bin1);
    let num2 = binarioADecimal(bin2);
    let suma = num1 + num2;

    console.log("Suma en decimal:", suma);
}


//3. convertir hexadeimal a binario y viceversa 
function hexADecimal(hex) {
    let digitos = "0123456789ABCDEF";
    hex = hex.toUpperCase();
    let decimal = 0
    let potencia = 1;

    for (let i = hex.length - 1; i >= 0; i--) {
        let valor = digitos.indexOf(hex[i]);
        decimal += valor * potencia;
        potencia *= 16;
    }
    return decimal;
}

function deciamlABinario(numero) {
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

console.log("Hex a binario:", deciamlABinario(hexADecimal("1F")));
console.log("Binario a hex:", binarioAHex("11111"));


//4. operaciones aritmeticas basicas con binarios 
function operarBinarios (bin1, bin2, operacion) {
    let a = binarioADecimal(bin1);
    let b = binarioADecimal(bin2);
    let resultado;

    if (operacion === "suma") {
        resultado = a + b;
    } else if (operacion === "resta") {
        resultado = a - b;
    } else if (operacion === "multiplicacion") {
        resultado = a * b;
    } else if (operacion === "division") {
        if (b === 0) {
            console. log("Error: división por cero.");
            return;
        }
        resultado = Math.floor(a/b);
    } else {
        console. log("Operación no válida.");
        return;
    }

    console.log('Resultado en binario (${operacion}):', decimalABinario(resultado)); 
    console.log('Resultado en decimal ($(operacion}):', resultado);
}

//5. tabal de multiplicar usando while 
function tablaMultiplicar(numero) {
    let i = 1;
    while (i <= 10) {
        console.log(numero + "x" + i + " = " + (numero * i));
        i++;
    }
}
tablaMultiplicar();


//6. suma de los numeros pares entre 1 y 50
function sumaPares() {
    let suma = 0;
    let i = 1;

    while (i <= 50) {
        if (i % 2 === 0) {
            suma += i;
        }
        i++;
    } 
    console.log("Suma de pares entre 1 y 50:", suma);

}
sumaPares()



//7. Suma de los numeros primos entre 1 y 100
function esPrimo(n){
    if (n < 2) return false;

    let i = 2;
    while (i <= Math.sqrt(n)) {
        if (n%i ===0) return false;
        i++;
    }
    return true;
}

function sumaPrimos() {
    let suma = 0;
    let i = 1;

    while (i <= 100) {
        if(esPrimo(i)) {
            suma += i;
        }
        i++;
    }
    console.log("Suma de primos entre 1 y 100:", suma);
}

sumaPrimos();
