const ruta = "https://proyecto2-uhospital.herokuapp.com/cargarDoctores";
const rutaTabla = "https://proyecto2-uhospital.herokuapp.com/doctores";
var idDoctor = 0;
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
    let doctores = [];
    console.log(texto);

    texto = texto.split("\n");

    texto.forEach((linea) => {
        if (linea != "") {
            let doctor = linea.split(",");
            if (doctor[0] != "nombre") {
                let doc = {
                    nombre: doctor[0],
                    apellido: doctor[1],
                    fecha: doctor[2],
                    genero: doctor[3],
                    usuario: doctor[4],
                    password: doctor[5],
                    especialidad: doctor[6],
                    telefono: doctor[7],
                };
                doctores.push(doc);
            }
        }
    });
    let docs = {
        doctores: doctores,
    };

    fetch(ruta, {
            method: "POST",
            body: JSON.stringify(docs),
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
            window.location.href = "./moduloAdminDoctores.html"
        });
}

function cargarTabla() {
    let tabla = document.getElementById("tableDoctores");

    fetch(rutaTabla, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Doctores") {
                console.log(response.doctores)
                for (let index = 0; index < response.doctores.length; index++) {
                    const element = response.doctores[index];
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
                    nuevacolumna5.textContent = element.Especialidad
                    let nuevacolumna6 = nuevafila.insertCell(6)
                    let id = element.Id
                    nuevacolumna6.innerHTML = `<button class="btn modal-trigger waves-effect waves-light blue" type="submit" data-target="idModal" onclick="cargarDoctor(${id})" name="action">
                    <i class="material-icons right">remove_red_eye</i>
                  </button>`
                    let nuevacolumna7 = nuevafila.insertCell(7)
                    nuevacolumna7.innerHTML = `<button class="btn modal-trigger green" type="submit" data-target="idModalEditar" onclick="getEditarDoctor(${id})" name="action">
                    <i class="material-icons right">edit</i>
                  </button>`
                    let nuevacolumna8 = nuevafila.insertCell(8)
                    nuevacolumna8.innerHTML = `<button class="btn modal-trigger red" type="submit" data-target="idModalEliminar" onclick="getEditarDoctor(${id})" name="action">
                    <i class="material-icons right">delete</i>
                  </button>`
                }
            } else {
                alert("Error cargando los pacientes")
            }
        })
        .catch(error => console.log("error"))

}

function cargarDoctor(id) {
    console.log("holaaaa");
    const ruta = "https://proyecto2-uhospital.herokuapp.com/doctor/" + id
    fetch(ruta, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Doctor Encontrado") {
                for (let index = 0; index < response.doctor.length; index++) {
                    const doctor = response.doctor[index];
                    document.getElementById("id-field").value = doctor.Id
                    document.getElementById("nombre-field").value = doctor.Nombre
                    document.getElementById("apellido-field").value = doctor.Apellido
                    document.getElementById("fecha-field").value = doctor.FechaNacimiento
                    document.getElementById("sexo-field").value = doctor.Sexo
                    document.getElementById("especialidad-field").value = doctor.Especialidad
                    document.getElementById("telefono-field").value = doctor.Telefono
                }
            } else {
                alert("Error encontrado el doctor")
            }
        })
        .catch(error => console.log("error"))

}

function getEditarDoctor(id) {
    const ruta = "https://proyecto2-uhospital.herokuapp.com/doctor/" + id
    fetch(ruta, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Doctor Encontrado") {
                for (let index = 0; index < response.doctor.length; index++) {
                    const doctor = response.doctor[index];
                    document.getElementById("id-fielde").value = doctor.Id;
                    document.getElementById("nombre-fielde").value = doctor.Nombre;
                    document.getElementById("apellido-fielde").value = doctor.Apellido;
                    document.getElementById("fecha-fielde").value = doctor.FechaNacimiento;
                    document.getElementById("sexo-fielde").value = doctor.Sexo;
                    document.getElementById("especialidad-fielde").value = doctor.Especialidad
                    document.getElementById("telefono-fielde").value = doctor.Telefono
                    document.getElementById("username-fielde").value = doctor.Username;
                    document.getElementById("password-fielde").value = doctor.Password;
                    idDoctor = id;
                }
            } else {
                alert("Error encontrado el paciente")
            }
        })
        .catch(error => console.log("error"))
}

function editarDoctor() {
    console.log(idDoctor);
    const ruta = "https://proyecto2-uhospital.herokuapp.com/modificarDoctor/" + idDoctor;
    let nombre = document.getElementById("nombre-fielde").value;
    let apellido = document.getElementById("apellido-fielde").value;
    let fechaNacimiento = document.getElementById("fecha-fielde").value;
    let sexo = document.getElementById("sexo-fielde").value;
    let username = document.getElementById("username-fielde").value;
    let password = document.getElementById("password-fielde").value;
    let telefono = document.getElementById("telefono-fielde").value;
    let especialidad = document.getElementById("especialidad-fielde").value;
    let doctor = {
        nombre: nombre,
        apellido: apellido,
        fechaNacimiento: fechaNacimiento,
        sexo: sexo,
        username: username,
        password: password,
        especialidad: especialidad,
        telefono: telefono,
    };
    console.log(doctor)

    fetch(ruta, {
            method: "PUT",
            body: JSON.stringify(doctor),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Doctor modificado") {
                alert('Doctor modificado exitosamente')
                window.location.href = "moduloAdminDoctores.html"
            }
        })
        .catch(error => console.log("error"))
}

function eliminarDoctor(event) {
    event.preventDefault();
    console.log(idDoctor);
    const ruta = "https://proyecto2-uhospital.herokuapp.com/eliminarDoctor/" + idDoctor;

    fetch(ruta, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Doctor eliminado") {
                window.location.href = "moduloAdminDoctores.html"
            } else if (response.message == "No se encontro el paciente") {
                console.log("No se encontro el doctor")
            }
        })
        .catch(error => console.log("error"))
}

function cerrarSesion() {
    localStorage.removeItem('usuario');
}