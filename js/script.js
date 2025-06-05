//Direccion del EndPoint generado en Retool
const API_URL = "https://retoolapi.dev/8ocJy3/integrantes"

//Funcion que llama a la API y realiza una solicitud GET. Obtiene un JSON
async function obtenerRegistros() {
    //Hacemos GET a la API y obtenemos su respuesta (response)
    const respuesta = await fetch(API_URL);
    
    //Obtenemos los datos en formato JSON a partir de la respuesta
    const data = await respuesta.json(); //Esto ya es un JSON

    //Llamamos a MostrarRegistros y le enviamos el JSON
    mostrarRegistro(data);
}

//Funcion para generar las filas de la tabla
//"Datos representa al Json"
function mostrarRegistro(datos){
    //Se llama al elemento tbody dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody");

    //Para inyectar codigo HTLM usamos innerHTML
    tabla.innerHTML = "" //Vaciamos el contenido de la tabla

    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.Nombre}</td>
                <td>${persona.Apellido}</td>
                <td>${persona.Correo}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
        `;
    }); //Por cada persona en el arrehlo Json
}


obtenerRegistros();

//Proceso para agregar registros

const modal = document.getElementById("mdAgregar"); //Cuadro de dialogo
const btnAgregar = document.getElementById("btnAgregar"); //Boton para abrir
const btnCerrar = document.getElementById("btnCerrarModal");
