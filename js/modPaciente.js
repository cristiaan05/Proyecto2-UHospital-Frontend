let usuarioo = JSON.parse(localStorage.getItem("paciente"))
console.log(usuarioo)
let idPaciente = 2;
document.getElementById("idpaciente-fielde").value = idPaciente
const rutaTabla = "https://proyecto2-uhospital.herokuapp.com/cita/" + idPaciente;
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});


function cargarTabla() {
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
    let idPaciente = document.getElementById("idpaciente-fielde").value;
    let fecha = document.getElementById("fecha-fielde").value;
    let hora = document.getElementById("hora-fielde").value;
    let motivo = document.getElementById("motivo-fielde").value;
    let citaAgregada = {
        idPaciente: 2,
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
            }
            if (response.message == "Repetido") {
                console.log("holaaa");
                alert('Ya tienes una cita no puedes crear otra')
            }
        })
        .catch(error => console.log("error"))
}

// function cargarMedicamento(id) {
//     const ruta = "https://proyecto2-uhospital.herokuapp.com/medicamento/" + id
//     fetch(ruta, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })
//         .then(res => res.json())
//         .then(function(response) {
//             if (response.message == "Medicamento Encontrado") {
//                 for (let index = 0; index < response.medicamento.length; index++) {
//                     const medicamento = response.medicamento[index];
//                     document.getElementById("id-field").value = medicamento.Id
//                     document.getElementById("nombre-field").value = medicamento.Nombre
//                     document.getElementById("precio-field").value = medicamento.Precio
//                     document.getElementById("descripcion-field").value = medicamento.Descripcion
//                     document.getElementById("cantidad-field").value = medicamento.Cantidad
//                 }
//             } else {
//                 alert("Error encontrado el medicamento")
//             }
//         })
//         .catch(error => console.log("error"))

// }

// function getEditarMedicamento(id) {
//     const ruta = "https://proyecto2-uhospital.herokuapp.com/medicamento/" + id
//     fetch(ruta, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })
//         .then(res => res.json())
//         .then(function(response) {
//             if (response.message == "Medicamento Encontrado") {
//                 for (let index = 0; index < response.medicamento.length; index++) {
//                     const medicamento = response.medicamento[index];
//                     document.getElementById("id-fielde").value = medicamento.Id;
//                     document.getElementById("nombre-fielde").value = medicamento.Nombre;
//                     document.getElementById("precio-fielde").value = medicamento.Precio;
//                     document.getElementById("descripcion-fielde").value = medicamento.Descripcion;
//                     document.getElementById("cantidad-fielde").value = medicamento.Cantidad;
//                     idMedicamento = id;
//                 }
//             } else {
//                 alert("Error encontrado el medicamento")
//             }
//         })
//         .catch(error => console.log("error"))
// }

// function editarMedicamento() {
//     const ruta = "https://proyecto2-uhospital.herokuapp.com/modificarMedicamento/" + idMedicamento;
//     let nombre = document.getElementById("nombre-fielde").value;
//     let precio = document.getElementById("precio-fielde").value;
//     let descripcion = document.getElementById("descripcion-fielde").value;
//     let cantidad = document.getElementById("cantidad-fielde").value;
//     let medicamento = {
//         nombre: nombre,
//         precio: precio,
//         descripcion: descripcion,
//         cantidad: cantidad,
//     };
//     console.log(medicamento)

//     fetch(ruta, {
//             method: "PUT",
//             body: JSON.stringify(medicamento),
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })
//         .then(res => res.json())
//         .then(function(response) {
//             if (response.message == "Medicamento modificado") {
//                 alert('Medicamento modificado exitosamente')
//                 window.location.href = "moduloAdminMedicamentos.html"
//             }
//         })
//         .catch(error => console.log("error"))
// }

// function eliminarMedicamento(event) {
//     event.preventDefault();
//     console.log("hola");
//     const ruta = "https://proyecto2-uhospital.herokuapp.com/eliminarMedicamento/" + idMedicamento;

//     fetch(ruta, {
//             method: "DELETE",
//         })
//         .then(res => res.json())
//         .then(function(response) {
//             if (response.message == "Medicamento Eliminado") {
//                 window.location.href = "moduloAdminMedicamentos.html"
//             }
//         })
//         .catch(error => console.log("error"))
// }