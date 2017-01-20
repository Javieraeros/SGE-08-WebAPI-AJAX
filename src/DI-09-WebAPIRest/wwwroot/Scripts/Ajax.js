window.addEventListener("load", start);
//TODO Falta eliminar,actualizar y buscar
function start() {
    document.getElementById("btnGetLista").addEventListener("click", getPersonas);
    document.getElementById("btnPostPersona").addEventListener("click", postPersona);
    document.getElementById("btnCancelarInsercion").addEventListener("click", cancelar);
    document.getElementById("btnCancelarInsercionPut").addEventListener("click", cancelarPut);
    document.getElementById("btnPutPersona").addEventListener("click", guardarPut);
}

function getPersonas() {
    document.getElementById("txtContenedor").innerHTML = "Cargando...";
    //1. Instanciar objeto XMLHttpRequest
    var xml = new XMLHttpRequest();

    //2. Definir método open
    xml.open("GET", "../api/persona");

    //3. Definir cabeceras
    //En ese caso nada

    //4. Definir qué hacer cuando va cambiando el estado
    xml.onreadystatechange = function ()
    {
        if (xml.readyState < 4)
        {
            document.getElementById("txtContenedor").innerHTML = "Cargando...";
        }
        else
            if (xml.readyState == 4 && xml.status == 200) {
                //6.Tratamiento de los datos recibidos del servidor
                var data = JSON.parse(xml.responseText);
                creaTablitaOP(data);
            }
    }
    
    //5. Enviar la solicitud, send tiene parámetros opcionales
    xml.send();
}

function getPersona() {

    return p;
}

function creaTablitaOP(data) {
    var persona = new Persona();
    
    var table = document.createElement("TABLE");
    table.setAttribute("border", "1");
    table.setAttribute("cellspacing", "0");
    var fila = document.createElement("TR");
    var columna = document.createElement("TH");
    var texto;
    texto = document.createTextNode("Nombre");
    columna.appendChild(texto);
    fila.appendChild(columna);


    columna = document.createElement("TH");
    texto = document.createTextNode("Apellidos");
    columna.appendChild(texto);
    fila.appendChild(columna);


    columna = document.createElement("TH");
    texto = document.createTextNode("Fecha de Nacimiento");
    columna.appendChild(texto);
    fila.appendChild(columna);


    columna = document.createElement("TH");
    texto = document.createTextNode("Teléfono");
    columna.appendChild(texto);
    fila.appendChild(columna);


    columna = document.createElement("TH");
    texto = document.createTextNode("Dirección");
    columna.appendChild(texto);
    fila.appendChild(columna);

    table.appendChild(fila);


    for (var i = 0; i < data.length; i++) {
        persona = data[i];
        fila = document.createElement("TR");
        columna = document.createElement("TD");
        texto = document.createTextNode(persona.nombre);
        columna.appendChild(texto);
        fila.appendChild(columna);


        columna = document.createElement("TD");
        texto = document.createTextNode(persona["apellidos"]);
        columna.appendChild(texto);
        fila.appendChild(columna);


        columna = document.createElement("TD");
        texto = document.createTextNode(persona["fechaNac"]);
        columna.appendChild(texto);
        fila.appendChild(columna);


        columna = document.createElement("TD");
        texto = document.createTextNode(persona["telefono"]);
        columna.appendChild(texto);
        fila.appendChild(columna);


        columna = document.createElement("TD");
        texto = document.createTextNode(persona["direccion"]);
        columna.appendChild(texto);
        fila.appendChild(columna);


        columna = document.createElement("TD");
        

        botonBorrar = document.createElement("input");
        botonBorrar.setAttribute("type", "button");
        botonBorrar.setAttribute("id", "borar_" + persona.id);
        botonBorrar.setAttribute("value", "Borrar");
        botonBorrar.setAttribute("onClick", "borraPersona(" + persona.id + ")");

        botonEditar = document.createElement("input");
        botonEditar.setAttribute("type", "button");
        botonEditar.setAttribute("id", "editar_" + persona.id);
        botonEditar.setAttribute("value", "Editar");
        botonEditar.setAttribute("onClick", "editaPersona(" + persona.id + ")");

        columna.appendChild(botonBorrar);
        columna.appendChild(botonEditar);
        fila.appendChild(columna);

        table.appendChild(fila);
    }
    document.getElementById("txtContenedor").innerHTML = "";

    document.getElementById("txtContenedor").appendChild(table);
}

function postPersona() {
    //1. Instanciar objeto XMLHttpRequest
    var xml = new XMLHttpRequest();

    //2. Definir método open
    xml.open("POST", "../api/persona");

    var p = new Persona();
    p.nombre = document.getElementById("inputNombre").value;
    p.apellidos = document.getElementById("inputApellidos").value;
    p.fechaNac = document.getElementById("inputFecha").value;
    p.telefono = document.getElementById("inputTelefono").value;
    p.direccion= document.getElementById("inputDireccion").value;
    //3. Definir cabeceras
    xml.setRequestHeader("Content-Type", "application/json");

    //4. Definir qué hacer cuando va cambiando el estado
    //5. Enviar la solicitud, send tiene parámetros opcionales
    xml.send(JSON.stringify(p));

    borrarInsert();

    $("#dialog").parent().hide();
}

function cancelar() {
    borrarInsert();

    $("#dialog").parent().hide();
}

function borrarInsert() {
    document.getElementById("inputNombre").value="";
    document.getElementById("inputApellidos").value = "";
    document.getElementById("inputFecha").value = "";
    document.getElementById("inputTelefono").value = "";
    document.getElementById("inputDireccion").value = "";
}

//Usar Alert
function borraPersona(id) {
    //1. Instanciar objeto XMLHttpRequest
    var xml = new XMLHttpRequest();

    //2. Definir método open
    xml.open("DELETE", "../api/persona/"+id);

    //3. Definir cabeceras
    //En ese caso nada

    //4. Definir qué hacer cuando va cambiando el estado
    xml.onreadystatechange = function () {
        if (xml.readyState < 4) {
            document.getElementById("txtContenedor").innerHTML = "Cargando...";
        }
        else
            if (xml.readyState == 4 && xml.status == 200) {
                //6.Tratamiento de los datos recibidos del servidor
                getPersonas();
            }
    }

    //5. Enviar la solicitud, send tiene parámetros opcionales
    xml.send();
}

function editaPersona(id) {

        $("#dialogPut").parent().show();
        $("#dialogPut").show();
        $("#dialogPut").dialog();

    //No me gusta, pero bueno....
    //1. Instanciar objeto XMLHttpRequest
        var xml = new XMLHttpRequest();

    //2. Definir método open
        xml.open("GET", "../api/persona/"+id);

    //3. Definir cabeceras
    //En ese caso nada

    //4. Definir qué hacer cuando va cambiando el estado
        xml.onreadystatechange = function () {
            if (xml.readyState < 4) {
            }
            else
                if (xml.readyState == 4 && xml.status == 200) {
                    //6.Tratamiento de los datos recibidos del servidor
                    var data = JSON.parse(xml.responseText);
                    //tratar los datos;
                    var persona = new Persona();
                    persona = data;

                    document.getElementById("idPersona").innerHTML = persona.id;
                    document.getElementById("inputNombrePut").value = persona.nombre;
                    document.getElementById("inputApellidosPut").value = persona.apellidos;

                    //TODO no funciona bieeeen!
                    document.getElementById("inputFechaPut").value = persona.fechaNac;

                    document.getElementById("inputTelefonoPut").value = persona.telefono;
                    document.getElementById("inputDireccionPut").value = persona.direccion;
                }
        }

    //5. Enviar la solicitud, send tiene parámetros opcionales
        xml.send();
}

function guardarPut() {
    id=document.getElementById("idPersona").innerHTML;
   //1. Instanciar objeto XMLHttpRequest
   var xml = new XMLHttpRequest();

   //2. Definir método open
   xml.open("PUT", "../api/persona/"+id);

   var p = new Persona();
   p.id =id ;
   p.nombre = document.getElementById("inputNombrePut").value;
   p.apellidos = document.getElementById("inputApellidosPut").value;
   p.fechaNac = document.getElementById("inputFechaPut").value;
   p.telefono = document.getElementById("inputTelefonoPut").value;
   p.direccion = document.getElementById("inputDireccionPut").value;
   //3. Definir cabeceras
   xml.setRequestHeader("Content-Type", "application/json");

   //4. Definir qué hacer cuando va cambiando el estado
   //5. Enviar la solicitud, send tiene parámetros opcionales
   xml.send(JSON.stringify(p));

   borrarInsertPut();

   $("#dialogPut").parent().hide();

   getPersonas();
}

function borrarInsertPut() {

    document.getElementById("inputNombrePut").value = "";
    document.getElementById("inputApellidosPut").value = "";
    document.getElementById("inputFechaPut").value = "";
    document.getElementById("inputTelefonoPut").value = "";
    document.getElementById("inputDireccionPut").value = "";
}

function cancelarPut() {
    borrarInsertPut();

    $("#dialogPut").parent().hide();

    getPersonas();
}