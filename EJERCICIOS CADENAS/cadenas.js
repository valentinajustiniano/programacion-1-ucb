function ContarVocales(palabra){
    var contarVocales = 0;
    palabra.split('').forEach(element => {
        if(element.match(/[aeiouáéíóúAEIOUÁÉÍÓÚ]/)){
            contarVocales++;
        }
    });
    return "Número de vocales: " + contarVocales;
}

function ContarPalabras(texto){
    var contar = 0;
    texto.split(' ').forEach(element => {
        if(element.trim() !== ""){
            contar++;
        }
    });
    return "Número de palabras: " + contar;
}

function ContarCaracteres(texto){
    var resultado = 0;
    texto.split('').forEach(() => {
        resultado++;
    });
    return "Número de caracteres: " + resultado;
}







