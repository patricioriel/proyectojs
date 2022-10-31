const buscador = document.getElementById("buscador");
const resultado = document.getElementById("resultado");

const filtrar = () =>{
    resultado.innerHTML = '';
    const texto = buscador.value.toLowerCase();

    for (let torta of tortas){
        let nombre = torta.nombre.toLowerCase();

        if (nombre.indexOf(texto) !== -1){
            resultado.innerHTML += `
            <div class="card" style="width: 18rem;">
        <img src="${torta.img}" class="card-img-top" alt="${torta.nombre}">
        <div class="card-body">
          <h5 class="card-title">${torta.nombre}</h5>
          <p class="card-text">$${torta.precio}</p>
          <button class="btn botoncss" id="boton${torta.id}"> Agregar al Carrito </button>
        </div>
      </div>
         `
        }
        const boton = document.getElementById(`boton${torta.id}`);
        boton.addEventListener("click", () =>{
            agregarAlCarrito(torta.id) 
        })
    }
    
    if (resultado.innerHTML === ''){
        resultado.innerHTML = `<li>Producto no encontrado</li>`
    }
}

buscador.addEventListener('keyup', filtrar)
filtrar();
