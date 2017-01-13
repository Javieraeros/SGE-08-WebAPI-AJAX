window.addEventListener("load", start);

function start() {
    document.getElementById("btnGetLista").addEventListener("click", getPersonas);
    //document.getElementById("btnGetPersona").addEventListener("click", getPersona);
    //document.getElementById("btnDeletePersona").addEventListener("click", deletePersona);
    //document.getElementById("btnPostPersona").addEventListener("click", postPersona);
    //document.getElementById("btnPutPersona").addEventListener("click",putPersona)
}

function getPersonas() {
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
            if (xml.readyState == 4 && xml.status == 200)
            {
                //6.Tratamiento de los datos recibidos del servidor
                var data=JSON.parse(xml.responseText);
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
                    texto = document.createTextNode(persona["direccion"]);
                    columna.appendChild(texto);
                    fila.appendChild(columna);


                    columna = document.createElement("TD");
                    texto = document.createTextNode(persona["telefono"]);
                    columna.appendChild(texto);
                    fila.appendChild(columna);


                    table.appendChild(fila);
                }
                document.getElementById("txtContenedor").innerHTML = "";

                document.getElementById("txtContenedor").appendChild(table);
            }
    }
    
    //5. Enviar la solicitud, send tiene parámetros opcionales
    xml.send();
}