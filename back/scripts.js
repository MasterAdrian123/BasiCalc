// definimos los div que seran padres
const operadores = document.querySelector(".operadores");
const numeros = document.querySelector(".numeros");
const controles = document.querySelector(".controles");

//creamos los objetos que se seran posicionados en los div's padres
const operador = {
    'suma' : "+",
    'resta' : "-",
    'multiplicacion' : "*",
    'division' : "/",
}
const numero = {
    'button1': "1",
    'button2': "2",
    'button3': "3",
    'button4': "4",
    'button5': "5",
    'button6': "6",
    'button7': "7",
    'button8': "8",
    'button9': "9",
    'button0': "0",
    'punto': ".",
}
const control = {
    'borrar' : "Clear",
    'resultado': "=",
    'deshacer': "|<=",
}

// iteramos por cada objeto para crear e insertar los botoes
for(let i in operador){
    const boton = document.createElement('button');
    boton.setAttribute('class',i);
    boton.setAttribute('value',operador[i]);
    boton.textContent = operador[i];
    operadores.appendChild(boton);
}

for(let i in numero){
    const boton = document.createElement('button');
    boton.setAttribute('class',i);
    boton.setAttribute('value',numero[i]);
    boton.textContent = numero[i];
    numeros.appendChild(boton);
}

for(let i in control){
    const boton = document.createElement('button');
    boton.setAttribute('class',i);
    boton.setAttribute('value',control[i]);
    boton.textContent = control[i];
    controles.appendChild(boton);
}