// Clase Pasajero
class Pasajero {
    constructor(nombre, edad, genero, tipoBoleto) {
        this.nombre = nombre;
        this.edad = edad;
        this.genero = genero;
        this.tipoBoleto = tipoBoleto;
    }

    mostrarInfo() {
        return `${this.nombre} (${this.edad} años, ${this.genero}, ${this.tipoBoleto})`;
    }
}

// Clase BoteRescate
class BoteRescate {
    constructor(capacidadMaxima) {
        this.capacidadMaxima = capacidadMaxima;
        this.ocupantes = [];
    }

    agregarPasajero(pasajero) {
        if (this.ocupantes.length < this.capacidadMaxima) {
            this.ocupantes.push(pasajero);
            return true;
        } else {
            return false;
        }
    }

    mostrarOcupantes() {
        if (this.ocupantes.length === 0) {
            return "Sin ocupantes";
        }

        let texto = "";
        for (let p of this.ocupantes) {
            texto += "- " + p.mostrarInfo() + "\n";
        }
        return texto;
    }
}

// Función principal
function simularEvacuacion() {
    let pasajeros = [
        new Pasajero("Ana", 25, "Femenino", "1ra Clase"),
        new Pasajero("Luis", 35, "Masculino", "3ra Clase"),
        new Pasajero("Carla", 8, "Femenino", "2da Clase"),
        new Pasajero("Pedro", 40, "Masculino", "1ra Clase"),
        new Pasajero("Lucía", 16, "Femenino", "3ra Clase"),
        new Pasajero("Andrés", 30, "Masculino", "2da Clase"),
        new Pasajero("María", 50, "Femenino", "1ra Clase"),
        new Pasajero("Juan", 12, "Masculino", "3ra Clase"),
        new Pasajero("Sofía", 20, "Femenino", "2da Clase"),
        new Pasajero("Miguel", 28, "Masculino", "3ra Clase")
    ];

    let botes = [
        new BoteRescate(3),
        new BoteRescate(4),
        new BoteRescate(2)
    ];

    let fuera = [];

    for (let p of pasajeros) {
        let asignado = false;

        for (let b of botes) {
            if (b.agregarPasajero(p)) {
                asignado = true;
                break;
            }
        }

        if (!asignado) {
            fuera.push(p);
        }
    }

    let resultado = "=== RESULTADOS DE LA EVACUACIÓN ===\n\n";

    for (let i = 0; i < botes.length; i++) {
        resultado += `🚤 Bote ${i + 1} (capacidad ${botes[i].capacidadMaxima}):\n`;
        resultado += botes[i].mostrarOcupantes() + "\n\n";
    }

    resultado += "❌ Pasajeros que quedaron fuera:\n";
    if (fuera.length === 0) {
        resultado += "Todos fueron rescatados 🙌";
    } else {
        for (let p of fuera) {
            resultado += "- " + p.mostrarInfo() + "\n";
        }
    }

    document.getElementById("resultado").innerText = resultado;
}

// Para comprobar que el JS se cargó bien:
console.log("✅ script.js conectado correctamente");
