const operadores = document.querySelector(".operadores");
const numeros = document.querySelector(".numeros");
const controles = document.querySelector(".controles");
const output = document.getElementById('output');
const expresion = document.getElementById('expresion');

//evitamos con esta variable que se digite un numero con varios "." ej: (2 * 1.2.3) 
var esPunto;

//retorna el ultimo caracter que contiene la pantalla
const ultimoCaracter = () =>{
    return output.textContent.charAt(output.textContent.length-1);
}

// visualiza en pantalla el elemento que se le proporcione
const visualizar = elemento =>{
    output.textContent += elemento;
}

//retorna true si hay 2 signos de seguido, de lo contrario retorna false
const esSigno = ()=>{
    const caracter = ultimoCaracter();
    let respuesta = false;
    if(caracter ==='+' || caracter ==='-' || caracter ==='*' || caracter ==='/' || caracter ==='.'){
        respuesta = true;
    }
    return respuesta;
}

//valida que no se inicie con un signo y que no se puede digitar 2 signos de seguido
const visualizarSigno = signo =>{
    if(output.textContent === ''){
        alert("no puedes iniciar la expresion con un signo");
    }else{
        if(esSigno()){
            alert("verifique su expresion antes de proseguir");
        }else{
            if(signo === '.' && esPunto=== true){
                alert('no puedes colocar un numero con varios puntos');
            }else{
                visualizar(signo);
                if(signo==='.'){
                    esPunto = true;
                }else{
                    esPunto = false;
                }
            }
        }
    }
}

//limpia lo que contega la pantalla
const limpiar = () =>{
    output.textContent = '';
    expresion.textContent='';
    esPunto = false;
}

// elimina el ultimo elemento de la pantalla
const deshacer = () =>{
    output.textContent = output.textContent.slice(0,-1);
}

//identifica que es un numero y que es un signo y lo asigna a una lista
const identificador = () => {
    let lista = []
    let numero = '';
    for(let i of output.textContent){
        if(i==='+' || i==='-' || i==='*' || i=== '/'){
            lista.push(numero);
            lista.push(i),
            numero = '';
        }else{
            numero+= i;
        }
    }
    lista.push(numero);
    return lista;
}

//funcion creada para realizar la suma de una expresion matematica
const sumar = lista =>{
    let esSuma = false;
    let esResta = false;
    let respuesta;
    for(let i of lista){
        let numero = Number(i);
        if(esSuma || esResta){
            if(esSuma){
                respuesta += numero;
                esSuma = false;   
            }else{
                respuesta -= numero;
                esResta = false;
            }
            continue;
        }
        if(i==='+' || i==='-'){
            (i==='+') ? esSuma=true : esResta=true;
        }else{
            respuesta = numero;
        }
    }
    return respuesta;
}

// funcion que ejecuta los procesos logicomatematicos
const calculadora = () => {
    let pantalla = identificador();
    let lista = [];
    let esMultiplicacion = false;
    let esDivision = false;

    for(let i of pantalla){
        if(esMultiplicacion || esDivision){
            if(esMultiplicacion){
                esMultiplicacion= false;
                lista.push(lista.pop() * i);
            }else{
                esDivision = false;
                lista.push(lista.pop() / i);
            }
            continue;
        }
        if(i==='*' || i==='/'){
            (i==='*') ? esMultiplicacion=true : esDivision=true;
            continue;
        }
        lista.push(i);
    }
    return sumar(lista);
}

// inicia los procesos para obtener el resultado matematico
const respuesta = () =>{
    if(esSigno()){
        alert("no puedes terminar la expresion con un signo");
    }else{
        expresion.textContent = output.textContent;
        output.textContent = calculadora();
    }
}

//objeto que contiene cada boton y sus caracteristicas;
const objetos = {
    // class  : [contenedor value onclick()],
    'button1' : ['numeros','1','visualizar("1")'],
    'button2' : ['numeros','2','visualizar("2")'],
    'button3' : ['numeros','3','visualizar("3")'],
    'button4' : ['numeros','4','visualizar("4")'],
    'button5' : ['numeros','5','visualizar("5")'],
    'button6' : ['numeros','6','visualizar("6")'],
    'button7' : ['numeros','7','visualizar("7")'],
    'button8' : ['numeros','8','visualizar("8")'],
    'button9' : ['numeros','9','visualizar("9")'],
    'button0' : ['numeros','0','visualizar("0")'],
    'punto' : ['numeros','.','visualizarSigno(".")'],
    'suma' : ['operadores','+','visualizarSigno("+")'],
    'resta' : ['operadores','-','visualizarSigno("-")'],
    'multiplicacion' : ['operadores','*','visualizarSigno("*")'],
    'division' : ['operadores','/','visualizarSigno("/")'],
    'deshacer': ['controles','<=','deshacer()'],
    'limpiar': ['controles','C','limpiar()'],
    'repuesta' : ['controles','=','respuesta()']
}

//constructor de los botones;
const iniciar = () =>{
    for(let i in objetos){
        const button = document.createElement('button');
        button.setAttribute('class',i);
        button.setAttribute('value',objetos[i][1]);
        button.setAttribute('onclick',objetos[i][2]);
        button.textContent = objetos[i][1];
        var contenedor = objetos[i][0];
        switch(contenedor){
            case 'numeros':
                numeros.appendChild(button);
                break;
            case 'controles':
                controles.appendChild(button);
                break;
            case 'operadores':
                operadores.appendChild(button);
                break;
        }
    }
}
//iniciamos todos los botones
iniciar();