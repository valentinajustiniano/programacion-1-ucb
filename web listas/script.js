  function mostrarNombre() {
        const nombre = document.getElementById("nombre").value;
        const resultado = document.getElementById("resultado");

        if (nombre.trim() === "") {
            resultado.textContent = "Por favor, escribe tu nombre.";
        } else {
            resultado.textContent = "Hola, " + nombre + "👋";
        }
    }

   var lista = [];

function InsertarLista() {
    var valorAleatorio = Math.floor(Math.random() * 10);
    lista.push(valorAleatorio);
    lista.push(valorAleatorio);

    const contenedor = document.getElementById("lista-contenedor");

    // Crear nuevo botón como ítem
    const nuevoBoton = document.createElement("button");
    nuevoBoton.textContent = valorAleatorio;
    nuevoBoton.classList.add("item-lista");

    // Agregar botón al contenedor
    contenedor.appendChild(nuevoBoton);

    // Forzar reflow para reiniciar animación (opcional, por si añades clase dinámica)
    void nuevoBoton.offsetWidth;

    // Añadir clase para animación
    nuevoBoton.classList.add("aparecer");
}  function mostrarNombre() {
        const nombre = document.getElementById("nombre").value;
        const resultado = document.getElementById("resultado");

        if (nombre.trim() === "") {
            resultado.textContent = "Por favor, escribe tu nombre.";
        } else {
            resultado.textContent = "Hola, " + nombre + "👋";
        }
    }

   var lista = [];

function InsertarLista() {
    var valorAleatorio = Math.floor(Math.random() * 10);
    lista.push(valorAleatorio);
    lista.push(valorAleatorio);

    const contenedor = document.getElementById("lista-contenedor");

    // Crear nuevo botón como ítem
    const nuevoBoton = document.createElement("button");
    nuevoBoton.textContent = valorAleatorio;
    nuevoBoton.classList.add("item-lista");

    // Agregar botón al contenedor
    contenedor.appendChild(nuevoBoton);

    // Forzar reflow para reiniciar animación (opcional, por si añades clase dinámica)
    void nuevoBoton.offsetWidth;

    // Añadir clase para animación
    nuevoBoton.classList.add("aparecer");
}