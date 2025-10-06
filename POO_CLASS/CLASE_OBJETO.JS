class Pasajero {

    //Atributos de la clase 
    nombre = "";
    edad = 0;
    genero = "";
    tipoBoleto = "";

    //Constructor 
    constructor(paramNombre, paramEdad, paramGenero, paramTipoBoleto){
        this.nombre = paramNombre;
        this.edad = paramEdad;
        this.genero = paramGenero;
        this.tipoBoleto = paramTipoBoleto;
    }

    //Setters 
    SetNombre(paramNombre) { this.nombre = paramNombre; }
    SetEdad(paramEdad) { this.edad = paramEdad; }
    SetGenero(paramGenero) { this.genero = paramGenero; }
    SetTipoBoleto(paramTipoBoleto) { this.tipoBoleto = paramTipoBoleto; }

    //Getters
    GetNombre() { return this.nombre; }
    GetEdad() { return this.edad ; }
    GetGenero() { return this.genero; }
    GetTipoBoleto() { return this.tipoBoleto; }

    //Mostrar los valores de los atributos 
    ToString(){
        return "Pasajero: " +
           "Nombre: " + this.GetNombre() + 
           "Edad: " + this.GetEdad() + 
           "Genero: " + this.GetGenero() + 
           "Tipo de Boleto : " + this.tipoBoleto(); 
    }

}