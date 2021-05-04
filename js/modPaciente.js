let usuarioo = JSON.parse(localStorage.getItem("usuario"))
let username, idPaciente
    // let idPaciente;
usuarioo.forEach(element => {
    if (element.TipoUsuario == 3) {
        username = element.Username;
        idPaciente = element.Id
    }

});
const rutaTabla = "https://proyecto2-uhospital.herokuapp.com/cita/" + idPaciente;

// document.getElementById("idpaciente-fielde").value = idPaciente
document.getElementById("idpaciente-fielde").value = idPaciente

// const rutaTabla = "http://127.0.0.1:4000/cita/" + id;
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});


function cargarTabla() {
    console.log(rutaTabla);
    document.getElementById("idpaciente-fielde").value = idPaciente
        // console.log(idPaciente);
    let tabla = document.getElementById("tableCitas");

    fetch(rutaTabla, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Citas Encontradas") {
                console.log(response.citas)
                for (let index = 0; index < response.citas.length; index++) {
                    const element = response.citas[index];
                    let nuevafila = tabla.insertRow(-1)
                    let nuevacolumna = nuevafila.insertCell(0)
                    nuevacolumna.textContent = element.Id
                    let nuevacolumna1 = nuevafila.insertCell(1)
                    nuevacolumna1.textContent = element.IdPaciente
                    let nuevacolumna2 = nuevafila.insertCell(2)
                    nuevacolumna2.textContent = element.Estado
                    let nuevacolumna3 = nuevafila.insertCell(3)
                    nuevacolumna3.textContent = element.Doctor
                }
            } else {
                alert("Error cargando las citas del paciente")
            }
        })
        .catch(error => console.log("error"))

}

function solicitarCita(event) {
    const link = "https://proyecto2-uhospital.herokuapp.com/moduloPaciente/solicitarCita";
    event.preventDefault();
    // let idPaciente = document.getElementById("idpaciente-fielde").value;
    let fecha = document.getElementById("fecha-fielde").value;
    let hora = document.getElementById("hora-fielde").value;
    let motivo = document.getElementById("motivo-fielde").value;
    let citaAgregada = {
        idPaciente: idPaciente,
        fecha: fecha,
        hora: hora,
        motivo: motivo,
    };
    fetch(link, {
            method: "POST",
            body: JSON.stringify(citaAgregada),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            console.log(response.message);
            if (response.message == "Cita creada exitosamente") {
                alert('Cita creada exitosamente')
                window.location.href = "./citaPaciente.html"
            }
            if (response.message == "Repetido") {
                console.log("holaaa");
                alert('Ya tienes una cita no puedes crear otra')
            }
        })
        .catch(error => console.log("error"))
}

function cerrarSesion() {
    localStorage.removeItem('usuario');
}





function cargarPaciente() {
    const ruta = "https://proyecto2-uhospital.herokuapp.com/paciente/" + idPaciente
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
                    document.getElementById("username-field").value = paciente.Username
                    document.getElementById("password-field").value = paciente.Password
                    document.getElementById("sexo-field").value = paciente.Sexo
                    document.getElementById("telefono-field").value = paciente.Telefono
                }
            } else {
                alert("Error encontrado el paciente")
            }
        })
        .catch(error => console.log("error"))

}

function editarPaciente() {

    const ruta = "https://proyecto2-uhospital.herokuapp.com/modificarPaciente/" + idPaciente;
    let nombre = document.getElementById("nombre-field").value;
    let apellido = document.getElementById("apellido-field").value;
    let fechaNacimiento = document.getElementById("fecha-field").value;
    let sexo = document.getElementById("sexo-field").value;
    let username = document.getElementById("username-field").value;
    let password = document.getElementById("password-field").value;
    let telefono = document.getElementById("telefono-field").value;
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
                alert('Perfil modificado exitosamente')
                window.location.href = "./citaPaciente.html"
            }
        })
        .catch(error => console.log("error"))
}