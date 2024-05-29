// se definen las referencias a los contenedores
const operadores = document.querySelector(".operadores");
const numeros = document.querySelector(".numeros");
const controles = document.querySelector(".controles");

//referencia de la pantalla
const output = document.getElementById('output');

// se crean objetos que contegan la informacion de los botones
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

// funcion que crea los botones dependiendo del objeto y el contenedor
// que se especifique
const asignarBotones = (contenedor,objeto) => {
    for(let i in objeto){
        // creamos el boton con los atributos class y value
        const boton = document.createElement('button');
        boton.setAttribute('class',i);
        boton.setAttribute('value',objeto[i]);
        boton.textContent = objeto[i];
        contenedor.appendChild(boton);
    }
}

//funcion que asigna un evento escucha tipo click para mostrar en pantalla
const mostrarEnPantalla = (objeto)=>{
    for(let i in objeto){
        document.querySelector('.'+i).addEventListener('click',()=>{
            output.textContent += objeto[i];
        });
    }
}

// asignamos la funcion que limpia la pantalla
const limpiarPantalla = () => {
    output.textContent = "";
}

// asignamos la funcion de eliminar ultimo elemento de la pantalla
const desHacer = () => {
    output.textContent = output.textContent.slice(0,-1);
}

const verificador = () => {
    for(let i in operador){
        let boton = document.querySelector("."+i);
        boton.addEventListener('click',()=>{
            //impedimos que haya 2 operadores de seguido y que inice con * o /
            let ultimoCaracter = output.textContent.charAt(output.textContent.length-2);
            let caracterActual = output.textContent.charAt(output.textContent.length-1);
            for(let j in operador){
                if(ultimoCaracter==="" && caracterActual === '*' || ultimoCaracter==="" && caracterActual === '/'){
                    alert("debe seleccionar un numero antes de usar este operador");
                    desHacer();
                    break;
                }else if(ultimoCaracter===operador[j]){//encontró 2 operadores de seguido
                    alert("no puede haber 2 operadores de seguido");
                    desHacer();
                }
            }
        })
    }
}
//solicitamos que se visualicen los botones en la calculadora y en pantalla
asignarBotones(operadores,operador);
mostrarEnPantalla(operador);
asignarBotones(numeros,numero);
mostrarEnPantalla(numero);
asignarBotones(controles,control);
verificador();
document.querySelector('.borrar').addEventListener('click',limpiarPantalla);
document.querySelector('.deshacer').addEventListener('click',desHacer);


// creamos condiciones logicas:
// 1- no puede haber 2 operadores ni puntos de seguido
// 2- se puede iniciar con los operadores - y + si no hay un numero antes pero no se puede iniciar con * o /
// 3- caundo se presione en resultado primero debe realizar la multiplicacion y la division y despues la suma y la resta 