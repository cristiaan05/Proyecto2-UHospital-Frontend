const ruta = "https://proyecto2-uhospital.herokuapp.com/cargarDoctores";
const rutaTabla = "https://proyecto2-uhospital.herokuapp.com/doctores";
var idDoctor = 0;
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
                window.location.href = "./moduloAdminDoctores.html";
            } else {
                alert("Error cargando el archivo csv")
            }
        })
        .catch(error => console.log("error"))
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
            if (response.message == "Pacientes") {
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
                    document.getElementById("especialidad-field").value = doctor.Telefono
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
    const ruta = "https://proyecto2-uhospital.herokuapp.com/eliminarDoctor/" + idDoctor;

    fetch(ruta, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Doctor eliminado") {
                window.location.href = "moduloAdminDoctores.html"
            }
        })
        .catch(error => console.log("error"))
}