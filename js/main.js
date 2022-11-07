//API
const precioDolar = "https://criptoya.com/api/dolar"
const contenedorDolar = document.getElementById("contenedorDolar");
let dolarucos = JSON.parse(localStorage.getItem("dolar"))

setInterval(() => {
    fetch(precioDolar)
        .then(response => response.json())
        .then(({ blue }) => {
            const dolarucos = blue
            localStorage.setItem("dolar", JSON.stringify(dolarucos))
        })
        .catch(error => console.error(error))
}, 9000)

//PRODUCTOS
class torta {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio
        this.img = img
        this.cantidad = 1
    }
}

const brownie = new torta(01, "Brownie", 9, "imagenes/brownie.jpg")
const cheescake = new torta(02, "Cheescake", 8, "imagenes/cheescake.jpg")
const ferrero = new torta(03, "Ferrero cake", 10, "imagenes/ferrero.jpg")
const lemonpie = new torta(04, "Lemon Pie", 7, "imagenes/lemonpie.jpg")
const matilda = new torta(05, "Matilda", 11, "imagenes/matilda.jpg")
const ricota = new torta(06, "Torta de ricota", 6, "imagenes/ricota.jpg")
const rogel = new torta(07, "Rogel", 5, "imagenes/rogel.jpg")
const redVelvet = new torta(08, "Red velvet", 8, "imagenes/redvelvet.jpg")
const number = new torta(09, "Number", 10, "imagenes/number.jpg")

const tortas = [brownie, cheescake, ferrero, lemonpie, matilda, ricota, rogel, redVelvet, number];

let carrito = [];
if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
}

const contenedorProductos = document.getElementById("contenedorProductos");

const restarDelCarrito = (id) => {
    const torta = tortas.find((torta) => torta.id === id);
    const productoEnCarrito = carrito.find((torta) => torta.id === id);
    if (productoEnCarrito.cantidad > 1) {
        productoEnCarrito.cantidad--;
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    else {
        eliminarDelCarrito(torta.id);
    }
    mostrarCarrito();
    calcularTotal();
}



const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach((torta) => {
        const card = document.createElement("div");
        card.classList.add("carritoCard");
        card.innerHTML = `
        <div class="cardCarrito card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
            <img src="${torta.img} " class="img-fluid rounded-start" alt="${torta.nombre} ">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title text-decoration-underline">${torta.nombre} </h5>
                <p class="card-text">Precio por unidad: $${torta.precio * dolarucos}</p>
                <p class="card-text">${torta.cantidad} Unidades</p>
                <button class="btn botoncss fw-bold resta" id="restar${torta.id}"></button>
                <button class="btn botoncss fw-bold suma" id="sumar${torta.id}"></button>
                <button class="btn botoncss mt-1 basura" id="eliminar${torta.id}"></button>
            </div>
            </div>
        </div>
        </div>
        `

        contenedorCarrito.appendChild(card);

        const boton = document.getElementById(`eliminar${torta.id}`)
        boton.addEventListener("click", () => {
            eliminarDelCarrito(torta.id)
        })

        const boton2 = document.getElementById(`sumar${torta.id}`)
        boton2.addEventListener("click", () => {
            agregarAlCarrito(torta.id)
        })

        const boton3 = document.getElementById(`restar${torta.id}`)
        boton3.addEventListener("click", () => {
            restarDelCarrito(torta.id)
        })

        const botonCompra = document.getElementById("finalizarCompra")
        botonCompra.addEventListener("click", () => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Gracias por tu compra!',
                showConfirmButton: false,
                timer: 4000
            })
            borrarTodoElCarrito()
        })
    })
    calcularTotal();
}

const eliminarDelCarrito = (id) => {
    const torta = carrito.find((torta) => torta.id === id);
    carrito.splice(carrito.indexOf(torta), 1);
    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito))
};

const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
    borrarTodoElCarrito();
})

const borrarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();
    localStorage.clear();
}

const total = document.getElementById("total");
const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach((torta) => {
        totalCompra += torta.precio * torta.cantidad;
    })
    total.innerHTML = `<p class="fs-2 text-center mb-2 mt-2"> Total: $ ${totalCompra * dolarucos}</p>`;
}

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})