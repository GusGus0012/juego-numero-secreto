let numeroSecreto = 0; // Variable para almacenar el número secreto
let intentos = 1; // Variable para contar los intentos del usuario
let listaNumerosAleatorios = []; // Lista para almacenar los números aleatorios generados

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Adivina el número secreto');
    asignarTextoElemento('p', 'Indica un número del 1 al 10');
    numeroSecreto = generarNumeroSecreto(1, 10);
    intentos = 1;
    document.getElementById('valorUsuario').disabled = false; // Habilita el input para nuevos intentos
    document.getElementById('intentar').disabled = false; // Habilita el botón Intentar
    //document.getElementById('reiniciar').disabled = true; // Deshabilita el botón de reinicio (esta opción la veo más clara)
    document.getElementById('reiniciar').setAttribute("disabled",""); // Añade el atributo disabled del botón de reinicio
}

condicionesIniciales();

function condicionesFinales() {
    document.getElementById('valorUsuario').disabled = true; // Deshabilita el input para evitar más intentos
    document.getElementById('intentar').disabled = true; // Deshabilita el botón Intentar para evitar más intentos
    //document.getElementById('reiniciar').disabled = false; // Habilita el botón de reinicio
    document.getElementById('reiniciar').removeAttribute("disabled"); // Remueve el atributo disabled del botón de reinicio
}

function asignarTextoElemento(elemento,texto){
    let titulo = document.querySelector(elemento);
    titulo.innerHTML = texto;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `¡Acertaste el número en ${intentos} ${(intentos>1) ? "intentos" : "intento"}!`);
        condicionesFinales(); // Aquí define las condiciones luego de al acertar el número o llegar al máximo de intentos
    } else {
        if (numeroDeUsuario < numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es mayor');
        } else {
            asignarTextoElemento('p', 'El número secreto es menor');
        }
        intentos++;
        if (intentos > 3) {
            asignarTextoElemento('p', `Has agotado tus intentos. El número secreto era ${numeroSecreto}.`);
            condicionesFinales(); // Aquí define las condiciones luego de al acertar el número o llegar al máximo de intentos
        }
        LimpiarCajaTexto();
    } 
    return; 
}

function LimpiarCajaTexto() {
    document.getElementById('valorUsuario').value = ''; // Limpia el input del usuario
    document.querySelector('#valorUsuario').focus(); // Enfoca el input para que el usuario pueda ingresar un nuevo número
    //El # indica al querySelector que se trata de un ID
}

function generarNumeroSecreto(minimo, maximo) {
    let nuevoNumero;
    if (listaNumerosAleatorios.length >= (maximo - minimo + 1)) {
        asignarTextoElemento('p', 'Todos los números posibles ya han sido generados. Refresca la página para continuar.');
        return; // Si ya se han generado todos los números posibles, no genera un nuevo número
    }
    do {
        nuevoNumero = Math.floor((Math.random() * ((maximo + 1) - minimo) + minimo)); // Genera un número secreto aleatorio entre el mínimo y el máximo ingresados por el usuario
    } while (listaNumerosAleatorios.includes(nuevoNumero)); // Verifica que el número no se haya generado antes
    numeroSecreto = nuevoNumero;
    listaNumerosAleatorios.push(numeroSecreto); // Añade el número secreto a la lista de números aleatorios
    return numeroSecreto; // Retorna el número secreto generado
}


function reiniciarJuego() {
    condicionesIniciales(); // Reinicia las condiciones del juego
    LimpiarCajaTexto();
}