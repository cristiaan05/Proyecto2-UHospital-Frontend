const ruta = "https://proyecto2-uhospital.herokuapp.com/cargarPacientes";
const rutaTabla = "https://proyecto2-uhospital.herokuapp.com/pacientes";
var idPaciente = 0;
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

function cargaMasiva(event) {
    console.log("hola")
    event.preventDefault();
    const fileInput = document.querySelector('#archivo');
    console.log(fileInput)
    const formData = new FormData();

    formData.append('archivo', fileInput.files[0]);
    fetch(ruta, {
            method: "POST",
            body: formData,
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Datos cargados") {
                alert("Datos cargados")
                window.location.href = "./pacientesModAdmin.html";
            } else {
                alert("Error cargando el archivo csv")
            }
        })
        .catch(error => console.log("error"))

    // const reader = new FileReader();
    // reader.addEventListener("load", (event) => {
    //     procesarUsuarios(event.target.result);
    // });

    // reader.readAsText(archivo, "UTF-8");
}

function cargarTabla() {
    let tabla = document.getElementById("tablePacientes");

    fetch(rutaTabla, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Pacientes") {
                console.log(response.pacientes)
                for (let index = 0; index < response.pacientes.length; index++) {
                    const element = response.pacientes[index];
                    let nuevafila = tabla.insertRow(-1)
                    let nuevacolumna = nuevafila.insertCell(0)
                    nuevacolumna.textContent = element.Id
                    let nuevacolumna1 = nuevafila.insertCell(1)
                    nuevacolumna1.textContent = element.Nombre
                    let nuevacolumna2 = nuevafila.insertCell(2)
                    nuevacolumna2.textContent = element.Apellido
                    let nuevacolumna3 = nuevafila.insertCell(3)
                    nuevacolumna3.textContent = element.FechaNacimiento
                    let nuevacolumna4 = nuevafila.insertCell(4)
                    nuevacolumna4.textContent = element.Sexo
                    let nuevacolumna5 = nuevafila.insertCell(5)
                    nuevacolumna5.textContent = element.Telefono
                    let nuevacolumna6 = nuevafila.insertCell(6)
                    let id = element.Id
                    nuevacolumna6.innerHTML = `<button class="btn modal-trigger waves-effect waves-light blue" type="submit" data-target="idModal" onclick="cargarPaciente(${id})" name="action">
                    <i class="material-icons right">remove_red_eye</i>
                  </button>`
                    let nuevacolumna7 = nuevafila.insertCell(7)
                    nuevacolumna7.innerHTML = `<button class="btn modal-trigger green" type="submit" data-target="idModalEditar" onclick="getEditarPaciente(${id})" name="action">
                    <i class="material-icons right">edit</i>
                  </button>`
                    let nuevacolumna8 = nuevafila.insertCell(8)
                    nuevacolumna8.innerHTML = `<button class="btn modal-trigger red" type="submit" data-target="idModalEliminar" onclick="getEditarPaciente(${id})" name="action">
                    <i class="material-icons right">delete</i>
                  </button>`
                }
            } else {
                alert("Error cargando los pacientes")
            }
        })
        .catch(error => console.log("error"))

}

function cargarPaciente(id) {
    const ruta = "https://proyecto2-uhospital.herokuapp.com/paciente/" + id
    fetch(ruta, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Paciente Encontrado") {
                for (let index = 0; index < response.paciente.length; index++) {
                    const paciente = response.paciente[index];
                    document.getElementById("id-field").value = paciente.Id
                    document.getElementById("nombre-field").value = paciente.Nombre
                    document.getElementById("apellido-field").value = paciente.Apellido
                    document.getElementById("fecha-field").value = paciente.FechaNacimiento
                    document.getElementById("sexo-field").value = paciente.Sexo
                    document.getElementById("telefono-field").value = paciente.Telefono
                }
            } else {
                alert("Error encontrado el paciente")
            }
        })
        .catch(error => console.log("error"))

}

function getEditarPaciente(id) {
    const ruta = "https://proyecto2-uhospital.herokuapp.com/paciente/" + id
    fetch(ruta, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Paciente Encontrado") {
                for (let index = 0; index < response.paciente.length; index++) {
                    const paciente = response.paciente[index];
                    document.getElementById("id-fielde").value = paciente.Id;
                    document.getElementById("nombre-fielde").value = paciente.Nombre;
                    document.getElementById("apellido-fielde").value = paciente.Apellido;
                    document.getElementById("fecha-fielde").value = paciente.FechaNacimiento;
                    document.getElementById("sexo-fielde").value = paciente.Sexo;
                    document.getElementById("telefono-fielde").value = paciente.Telefono
                    document.getElementById("username-fielde").value = paciente.Username;
                    document.getElementById("password-fielde").value = paciente.Password;
                    idPaciente = id;
                    console.log(idPaciente)
                        //                 `
                        //                  <!-- Compiled and minified CSS -->
                        // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

                    // <!-- Compiled and minified JavaScript -->
                    // <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
                    //                  <input type="submit" id="editarPaciente" value="editar" onclick="editarPaciente(${id})">

                    //                  `

                }
            } else {
                alert("Error encontrado el paciente")
            }
        })
        .catch(error => console.log("error"))
}

function editarPaciente() {
    // let id = document.getElementById("editarPaciente").value

    const ruta = "https://proyecto2-uhospital.herokuapp.com/modificarPaciente/" + idPaciente;
    let nombre = document.getElementById("nombre-fielde").value;
    let apellido = document.getElementById("apellido-fielde").value;
    let fechaNacimiento = document.getElementById("fecha-fielde").value;
    let sexo = document.getElementById("sexo-fielde").value;
    let username = document.getElementById("username-fielde").value;
    let password = document.getElementById("password-fielde").value;
    let telefono = document.getElementById("telefono-fielde").value;
    let paciente = {
        nombre: nombre,
        apellido: apellido,
        fechaNacimiento: fechaNacimiento,
        sexo: sexo,
        username: username,
        password: password,
        telefono: telefono,
    };
    console.log(paciente)

    fetch(ruta, {
            method: "PUT",
            body: JSON.stringify(paciente),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Paciente modificado") {
                alert('Paciente modificado exitosamente')
                window.location.href = "pacientesModAdmin.html"
            }
        })
        .catch(error => console.log("error"))
}

function eliminarPaciente(event) {
    event.preventDefault();
    // let id = document.getElementById("editarPaciente").value
    console.log("hola");
    const ruta = "https://proyecto2-uhospital.herokuapp.com/eliminarPaciente/" + idPaciente;

    fetch(ruta, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Paciente eliminado") {
                window.location.href = "pacientesModAdmin.html"
            }
        })
        .catch(error => console.log("error"))
}


// function procesarUsuarios(texto) {
//     const textarea_res = document.getElementById("textarea-res");
//     let usuarios_array = [];
//     console.log(texto);

//     texto = texto.split("\n");

//     texto.forEach((linea) => {
//         if (linea != "") {
//             let usuario_aux = linea.split(",");
//             textarea_res.innerHTML += `
//         Correo: ${usuario_aux[0]}
//         Pwd: ${usuario_aux[1]}
//         Nombre: ${usuario_aux[2]}
//         Edad: ${usuario_aux[3]}
//         Fecha nacimiento: ${usuario_aux[4]}
//         -------------------------------------
//         `;

//             let usuario = {
//                 correo: usuario_aux[0],
//                 pwd: usuario_aux[1],
//                 nombre: usuario_aux[2],
//                 edad: usuario_aux[3],
//                 fecha_nacimiento: usuario_aux[4],
//             };

//             usuarios_array.push(usuario);
//         }
//     });

//     console.log(usuarios_array);

//     let usuariosCM = {
//         usuarios: usuarios_array,
//     };

//     fetch(`${ruta}/carga-masiva`, {
//             method: "POST",
//             body: JSON.stringify(usuariosCM),
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })
//         .then((res) => res.json())
//         .then((response) => {
//             if (response.mensaje != "OK") {
//                 console.error(response.mensaje);
//                 //alert("Error al realizar la carga masiva");

//                 Swal.fire({
//                     title: "Carga masiva",
//                     text: "Error al realizar la carga masiva",
//                     icon: "error",
//                     timer: 1000,
//                     showConfirmButton: false,
//                 });
//             }

//             //alert("Carga masiva realizada con éxito");
//             Swal.fire({
//                 title: "Carga masiva",
//                 text: "Carga masiva realizada con éxito",
//                 icon: "success",
//                 timer: 1000,
//                 showConfirmButton: false,
//             });
//         });
// }