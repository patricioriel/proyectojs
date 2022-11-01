const buscador = document.getElementById("buscador");
const resultado = document.getElementById("resultado");

const filtrar = () =>{
    resultado.innerHTML = '';
    const texto = buscador.value.toLowerCase();

    for (let torta of tortas){
        let nombre = torta.nombre.toLowerCase();

        if (nombre.indexOf(texto) !== -1){
            resultado.innerHTML += `
            <div class="card" style="width: 18rem; col-xl-3", "col-md-6", "col-xs-12">
        <img src="${torta.img}" class="card-img-top" alt="${torta.nombre}">
        <div class="card-body">
          <h5 class="card-title">${torta.nombre}</h5>
          <p class="card-text">$${torta.precio}</p>
          <button class="btn botoncss" onclick="agregarAlCarrito(${torta.id})" id="boton${torta.id}"> Agregar al Carrito </button>
        </div>
      </div>
         `
        }
    }
    
    if (resultado.innerHTML === ''){
        resultado.innerHTML = `<li>Producto no encontrado</li>`
    }
}

const agregarAlCarrito = (id) =>{
    const torta = tortas.find((torta)=> torta.id === id);
    const productoEnCarrito = carrito.find((torta)=>torta.id === id);
    if (productoEnCarrito){
        productoEnCarrito.cantidad++;
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    else{
        carrito.push(torta)
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    mostrarCarrito();
    calcularTotal();
}

buscador.addEventListener('keyup', filtrar)
filtrar();
