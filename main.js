alert ("Bienvenidos a la calculadora de costo final de tortas")
const minimoEnvioGratis = 300
const usuarioAutorizado = "carlitos"
const contraseniaAutorizada = "1234"
let usuario;
let contrasenia;

function solicitarNombre(){
    usuario = prompt("Ingrese su usuario: ")
    contrasenia = prompt("Ingrese su contraseña: ")
 }

 solicitarNombre();
 
function validarUsuario(){
    if (usuario === usuarioAutorizado && contrasenia === contraseniaAutorizada){
        return true;
    }
    else {
        return false;
    }  
}

function calcularPrecioConIVA(precio, iva){
    let resultado = precio*iva
    return resultado
}

if (validarUsuario()){
    alert ("Hola " + usuario + " ¿Que vas a llevar?");
    let preciotodaslastortas = 0
    let cantidadtortas = parseInt(prompt("ingrese la cantidad de tortas que va a llevar: "))

    for(let i = 0; i < cantidadtortas; i++) { 
        let preciotorta = parseInt(prompt("ingrese el precio de las tortas: "))
        preciotodaslastortas += preciotorta*1.21;  
    }

    if (preciotodaslastortas >= minimoEnvioGratis){
    alert("Tenes el envio bonificado!")
    alert ("el precio final es de: $" + preciotodaslastortas)
    }
    else{
    alert("El costo del envio es de $150")
    alert ("el precio final es de: $" + (preciotodaslastortas + 150))
    } 
}
else{
    alert("Usuario y/o contraseña incorrectos")
}

