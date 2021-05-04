const ruta = "https://proyecto2-uhospital.herokuapp.com/cargarEnfermeras";
const rutaTabla = "https://proyecto2-uhospital.herokuapp.com/enfermeras";
var idEnfermera = 0;
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

function cargaMasiva(event) {
    event.preventDefault();
    let archivo = document.getElementById("archivo").files[0];
    console.log(archivo);

    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
        procesar(event.target.result);
    });

    reader.readAsText(archivo, "UTF-8");
}

function procesar(texto) {
    let enfermeras = [];
    console.log(texto);

    texto = texto.split("\n");

    texto.forEach((linea) => {
        if (linea != "") {
            let enfermera = linea.split(",");
            if (enfermera[0] != "nombre") {
                let enf = {
                    nombre: enfermera[0],
                    apellido: enfermera[1],
                    fecha: enfermera[2],
                    genero: enfermera[3],
                    usuario: enfermera[4],
                    password: enfermera[5],
                    telefono: enfermera[6],
                };
                enfermeras.push(enf);
            }
        }
    });
    let enfers = {
        enfermeras: enfermeras,
    };

    fetch(ruta, {
            method: "POST",
            body: JSON.stringify(enfers),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((response) => {
            if (response.mensaje != "OK") {
                console.error(response.mensaje);
                alert("Error al realizar la carga masiva");
            }
            alert("Carga masiva realizada con éxito");
            window.location.href = "./moduloAdminEnfermeras.html"
        });
}

function cargarTabla() {
    let tabla = document.getElementById("tableEnfermeras");

    fetch(rutaTabla, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Enfermeras") {
                console.log(response.enfermeras)
                for (let index = 0; index < response.enfermeras.length; index++) {
                    const element = response.enfermeras[index];
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
                    nuevacolumna6.innerHTML = `<button class="btn modal-trigger waves-effect waves-light blue" type="submit" data-target="idModal" onclick="cargarEnfermera(${id})" name="action">
                    <i class="material-icons right">remove_red_eye</i>
                  </button>`
                    let nuevacolumna7 = nuevafila.insertCell(7)
                    nuevacolumna7.innerHTML = `<button class="btn modal-trigger green" type="submit" data-target="idModalEditar" onclick="getEditarEnfermera(${id})" name="action">
                    <i class="material-icons right">edit</i>
                  </button>`
                    let nuevacolumna8 = nuevafila.insertCell(8)
                    nuevacolumna8.innerHTML = `<button class="btn modal-trigger red" type="submit" data-target="idModalEliminar" onclick="getEditarEnfermera(${id})" name="action">
                    <i class="material-icons right">delete</i>
                  </button>`
                }
            } else {
                alert("Error cargando las enfermeras")
            }
        })
        .catch(error => console.log("error"))

}

function cargarEnfermera(id) {
    const ruta = "https://proyecto2-uhospital.herokuapp.com/enfermera/" + id
    fetch(ruta, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Enfermera Encontrada") {
                for (let index = 0; index < response.enfermera.length; index++) {
                    const enfermera = response.enfermera[index];
                    document.getElementById("id-field").value = enfermera.Id
                    document.getElementById("nombre-field").value = enfermera.Nombre
                    document.getElementById("apellido-field").value = enfermera.Apellido
                    document.getElementById("fecha-field").value = enfermera.FechaNacimiento
                    document.getElementById("sexo-field").value = enfermera.Sexo
                    document.getElementById("telefono-field").value = enfermera.Telefono
                }
            } else {
                alert("Error encontrado la enfermera")
            }
        })
        .catch(error => console.log("error"))

}

function getEditarEnfermera(id) {
    const ruta = "https://proyecto2-uhospital.herokuapp.com/enfermera/" + id
    fetch(ruta, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Enfermera Encontrada") {
                for (let index = 0; index < response.enfermera.length; index++) {
                    const enfermera = response.enfermera[index];
                    document.getElementById("id-fielde").value = enfermera.Id;
                    document.getElementById("nombre-fielde").value = enfermera.Nombre;
                    document.getElementById("apellido-fielde").value = enfermera.Apellido;
                    document.getElementById("fecha-fielde").value = enfermera.FechaNacimiento;
                    document.getElementById("sexo-fielde").value = enfermera.Sexo;
                    document.getElementById("telefono-fielde").value = enfermera.Telefono
                    document.getElementById("username-fielde").value = enfermera.Username;
                    document.getElementById("password-fielde").value = enfermera.Password;
                    idEnfermera = id;
                }
            } else {
                alert("Error encontrado la enfermera")
            }
        })
        .catch(error => console.log("error"))
}

function editarEnfermera() {

    const ruta = "https://proyecto2-uhospital.herokuapp.com/modificarEnfermera/" + idEnfermera;
    let nombre = document.getElementById("nombre-fielde").value;
    let apellido = document.getElementById("apellido-fielde").value;
    let fechaNacimiento = document.getElementById("fecha-fielde").value;
    let sexo = document.getElementById("sexo-fielde").value;
    let username = document.getElementById("username-fielde").value;
    let password = document.getElementById("password-fielde").value;
    let telefono = document.getElementById("telefono-fielde").value;
    let enfermera = {
        nombre: nombre,
        apellido: apellido,
        fechaNacimiento: fechaNacimiento,
        sexo: sexo,
        username: username,
        password: password,
        telefono: telefono,
    };
    console.log(enfermera)

    fetch(ruta, {
            method: "PUT",
            body: JSON.stringify(enfermera),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Enfermera modificada") {
                alert('Enfermera modificado exitosamente')
                window.location.href = "moduloAdminEnfermeras.html"
            }
        })
        .catch(error => console.log("error"))
}

function eliminarEnfermera(event) {
    event.preventDefault();
    console.log("hola");
    const ruta = "https://proyecto2-uhospital.herokuapp.com/eliminarEnfermera/" + idEnfermera;

    fetch(ruta, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Enfermera eliminada") {
                window.location.href = "moduloAdminEnfermeras.html"
            }
        })
        .catch(error => console.log("error"))
}

function cerrarSesion() {
    localStorage.removeItem('usuario');
}