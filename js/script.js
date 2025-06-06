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
                    <button onclick = "EliminarPersona(${persona.id})">Eliminar</button>
 
                </td>
            </tr>
        `;
    }); //Por cada persona en el arrehlo Json
}


obtenerRegistros();

//Proceso para agregar registros

const modal = document.getElementById("mdAgregar"); //Cuadro de dialogo
const btnAgregar = document.getElementById("btnAgregar"); //Boton para abrir
const btnCerrar = document.getElementById("btnCerrarModal"); //Boton para cerrar
const frmAgregar = document.getElementById("frmAgregar"); //Agregar un nuevo integrante

btnAgregar.addEventListener("click", ()=>{
    modal.showModal(); //Abre modal cuando a btnAgregar se le hace click
});

btnCerrar.addEventListener("click", ()=>{
    modal.close(); //CIerra modal cuando a btnCerrarModal se le hace click
});

//Agregar un nuevop integrante desde el formulario
document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); //Evita que los datos se envie por defecto

    //Capturar los valores del formulario
    const Nombre = document.getElementById("txtNombre").value.Trim();
    const Apellido = document.getElementById("txtApellido").value.Trim();
    const Correo = document.getElementById("txtEmail").value.Trim();

    //Validacion basica
    if(!Nombre || !Apellido || !Correo){
        alert("Complete todos los campos");
        return; //Evita que el codigo se siga ejecutando
    }

    //Llamar a la API para enviar los datos
    const respuesta = await fetch(API_URL, {
        method: "POST", 
        headers: {'Content-Type':'application/json'}, //Lo que se tiene que enviar o en que formato se va a enviar
        body: JSON.stringify({Nombre, Apellido, Correo}) //Envia el contenido
    });

    //Validacion
    if(respuesta.ok){
        //Mensaje de confirmacion
        alert("El registro fue agregado correctamente")

        //Limpiar el formulario
        document.getElementById("frmAgregar").reset();

        //Cerrar el modal (dialog)
        modal.close();

        //Recargar la tabla
        obtenerRegistros();
    }
    else{
        alert("Hubo un error al guardar");
    }
});

//Funcion para borrar registros
async function EliminarPersona(id){
    const confirmacion = confirm("¿Desea de eliminar el registro?")
 
    //Validamos si el usuario eligio "Aceptar"
    if(confirmacion){
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        }); //Llamada al endpoint
 
        //Recargar la tabla para actualizar la vista
        obtenerRegistros();
    }
}