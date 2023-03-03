const NGROK = `${window.location.hostname}`;
console.log('Server IP: ', NGROK);
let socket = io(NGROK, { path: '/real-time' });

// Obtener los botones
var botonPantalla2 = document.getElementById("boton-pantalla2");
var botonPantalla3 = document.getElementById("boton-pantalla3");
var botonPantalla4 = document.getElementById("boton-pantalla4");
var botonPantalla5 = document.getElementById("boton-pantalla5");


// Añadir un event listener a cada botón

botonPantalla2.addEventListener("click", function() {
  mostrarPantalla(2);
});

botonPantalla3.addEventListener("click", function() {
  mostrarPantalla(3);
});

botonPantalla4.addEventListener("click", function() {
  mostrarPantalla(4);
});

botonPantalla5.addEventListener("click", function() {
  mostrarPantalla(5);
});

// Función para mostrar la pantalla correspondiente
function mostrarPantalla(numPantalla) {
  var pantallas = document.getElementsByClassName("pantalla");
  for (var i = 0; i < pantallas.length; i++) {
    if (pantallas[i].id === "pantalla" + numPantalla) {
      pantallas[i].classList.add("activa");
    } else {
      pantallas[i].classList.remove("activa");
    }
  }
}

function showButton() {
  document.querySelector("boton-pantalla4").style.display = "block";
}

/*___________________________________________

1) Create a function that includes the socket method to emit the directions
_____________________________________________ */

let salta = false;
var buttonJump = document.querySelector('.miBoton');
console.log(buttonJump);
buttonJump.addEventListener('mousedown', ()=> {
  salta = false;
  socket.emit('eventoDeClick', salta);
});

buttonJump.addEventListener('mouseup', ()=> {
  salta = true;
  socket.emit('eventoDeClick', salta);
});

//Cambio pantallas emit
function changeDisplayScreen(target) {
  socket.emit('controller-change-screen', target);
}
botonPantalla2.addEventListener("click", function() {
  changeDisplayScreen(2);
});

botonPantalla3.addEventListener("click", function() {
  changeDisplayScreen(3);
});

botonPantalla4.addEventListener("click", function() {
  changeDisplayScreen(4);
});

botonPantalla5.addEventListener("click", function() {
  changeDisplayScreen(5);
});



/*
let cambio1 = 2
var btnPantalla2 = document.querySelector('.btn1')
btnPantalla2.addEventListener('click'), ()=> {
  cambio1 = 2;
  socket.emit('cambioClick', cambio1);
}
*/


