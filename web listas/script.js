function mostrarNombre() {
    const nombre = document.getElementById("nombre").value;
    const resultado = document.getElementById("resultado");

    if (nombre.trim() === "") {
        resultado.textContent = "Por favor, escribe tu nombre.";
    } else {
        resultado.textContent = "Hola, " + nombre + " 👋";
    }
}

var lista = [];

function InsertarLista() {
    var valorAleatorio = Math.floor(Math.random() * 10);
    lista.push(valorAleatorio);
    renderLista();
}

function EliminarLista() {
    const valorEliminar = document.getElementById("valorEliminar").value;

    if (valorEliminar === "") {
        alert("Por favor, ingresa un número para eliminar.");
        return;
    }

    // Filtrar la lista eliminando todas las ocurrencias del valor
    lista = lista.filter(num => num != valorEliminar);

    renderLista();
}

function renderLista() {
    const contenedor = document.getElementById("lista-contenedor");
    contenedor.innerHTML = ""; // Limpiar antes de renderizar

    lista.forEach(valor => {
        const nuevoBoton = document.createElement("button");
        nuevoBoton.textContent = valor;
        nuevoBoton.classList.add("item-lista");

        contenedor.appendChild(nuevoBoton);

        void nuevoBoton.offsetWidth; // Forzar reflow
        nuevoBoton.classList.add("aparecer");
    });
}
