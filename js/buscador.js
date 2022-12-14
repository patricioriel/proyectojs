const buscador = document.getElementById("buscador");
const resultado = document.getElementById("resultado");

const filtrar = () => {
    resultado.innerHTML = '';
    const texto = buscador.value.toLowerCase();

    for (let torta of tortas) {
        let nombre = torta.nombre.toLowerCase();

        if (nombre.indexOf(texto) !== -1) {
            resultado.innerHTML += `
            <div class="card" style="width: 18rem;">
        <img src="${torta.img}" class="card-img-top" alt="${torta.nombre}">
        <div class="card-body">
          <h5 class="card-title text-decoration-underline fs-4">${torta.nombre}</h5>
          <p class="card-text fs-5">$${(torta.precio * dolarucos)}</p>
          <button class="btn botoncss" onclick="agregarAlCarrito(${torta.id})" id="boton${torta.id}"> Agregar al Carrito </button>
        </div>
      </div>
         `
        }
    }
    if (resultado.innerHTML === '') {
        resultado.innerHTML = `<p class="fs-1 text-center mt-4">Producto no encontrado</p>`
    }
}

const agregarAlCarrito = (id) => {
    Toastify({
        text: "Producto agregado al carrito",
        className: "info",
        gravity: "bottom",
        position: "left",
        style: {
            background: "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(70,70,252,0.7931547619047619) 75%)",
        }
    }).showToast();
    const torta = tortas.find((torta) => torta.id === id);
    const productoEnCarrito = carrito.find((torta) => torta.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    else {
        carrito.push(torta)
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    mostrarCarrito();
    calcularTotal();
}

buscador.addEventListener('keyup', filtrar)
filtrar();
