'use strict'

// Esta variable representa el elemento HTML input donde se escriben las operaciones y los resultados
var display = document.getElementById('display')
// Guarda el historial de todas las operaciones que se hagan en la calculadora
var historialOperaciones = ""
// Me dice cual es el último operador aritmético, se usará para contar los puntos decimales a la derecha
var ultimoOperador = ""

/**
 * En el transcurso del programa defino las funciones con la técnica de Arrow Function, cumpliendo
 * los últimos estándares de la industria
 */

// Borra todo lo que hay en display y pone a cero para iniciar de nuevo
const limpiar = () => display.value = '0'

// Detecta la acción sobre los botonos numéricos y asigan valores del 1 al 9 en el display
const asignarValor = numero => {
    if (display.value == "0") {
        display.value = numero
    } else {
        display.value += numero
    }
}

// Detecta la acción sobre los botones de operadores y asigna la operación a realizar
const asignarOperador = operador => {
    if (display.value == "0" && operador == "-") {
        display.value = operador
        ultimoOperador = operador
    }
    else if (display.value == "0" || (display.value.length == 1 && display.value.charAt(0) == "-")) {
        display.value = "0"
    }
    else if (display.value.charAt(display.value.length - 1) == "+" ||
        display.value.charAt(display.value.length - 1) == "-" ||
        display.value.charAt(display.value.length - 1) == "*" ||
        display.value.charAt(display.value.length - 1) == "/") {
        var nuevoDisplay = display.value.substring(0, display.value.length - 1)
        display.value = nuevoDisplay + operador
        ultimoOperador = operador
    } else {
        display.value = display.value + operador
        ultimoOperador = operador
    }
}

// Borra el último caracter de la cadena
const corregir = () => {
    if (display.value.length == 1) {
        display.value = 0
    } else {
        display.value = display.value.substring(0, display.value.length - 1)
    }
}

// Se envarga de evaluar la cadena generada en el display
const calcular = () => {

    historialOperaciones = `${historialOperaciones}+${display.value} = ${eval(display.value)}\n`
    if (eval(display.value) == "Infinity") {
        display.value = "No se puede dividir por CERO"
    } else {
        display.value = eval(display.value)
    }
}

// Una futura funcionalidad para que el usuario vea las operaciones que ha hecho
const historial = () => {
    document.getElementById('historial').innerHTML = `<p>${historialOperaciones}</p>`    
}

// Esta funcion se encaraga de validad que no sean introducidas más de una coma decilam por número
const contarComas = (cadena, coma) => {
    var posicionUltimoOperador = display.value.lastIndexOf(ultimoOperador)
    var nuevoDisplay = display.value.substring(posicionUltimoOperador, display.value.length)
    var contadorComas = 0
    for (let index = 0; index < nuevoDisplay.length; index++) {
        if (nuevoDisplay[index] == coma) {
            contadorComas++
        }        
    }
    return contadorComas    
}

// Con la ayuda de contarComas, se encarga de asignar el punto decimal
const ponerComa = (coma) => {
    if (display.value.charAt(display.value.length - 1) == coma) {
        var nuevoDisplay = display.value.substring(0, display.value.length - 1)
        display.value = nuevoDisplay + coma
    } else if (display.value.charAt(display.value.length - 1) == "+" ||
        display.value.charAt(display.value.length - 1) == "-" ||
        display.value.charAt(display.value.length - 1) == "*" ||
        display.value.charAt(display.value.length - 1) == "/") {
        display.value = display.value
    } else if (contarComas(display.value, coma) >= 1 ) {
        display.value = display.value
    }
    else {
        display.value = `${display.value}${coma}`
    }

}