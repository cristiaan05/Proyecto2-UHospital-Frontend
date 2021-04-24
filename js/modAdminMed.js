const ruta = "https://proyecto2-uhospital.herokuapp.com/cargarMedicamentos";
const rutaTabla = "https://proyecto2-uhospital.herokuapp.com/medicamentos";
var idMedicamento = 0;
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
                window.location.href = "./moduloAdminMedicamentos.html";
            } else {
                alert("Error cargando el archivo csv")
            }
        })
        .catch(error => console.log("error"))
}

function cargarTabla() {
    let tabla = document.getElementById("tableMedicamentos");

    fetch(rutaTabla, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Medicamentos") {
                console.log(response.medicamentos)
                for (let index = 0; index < response.medicamentos.length; index++) {
                    const element = response.medicamentos[index];
                    let nuevafila = tabla.insertRow(-1)
                    let nuevacolumna = nuevafila.insertCell(0)
                    nuevacolumna.textContent = element.Id
                    let nuevacolumna1 = nuevafila.insertCell(1)
                    nuevacolumna1.textContent = element.Nombre
                    let nuevacolumna2 = nuevafila.insertCell(2)
                    nuevacolumna2.textContent = element.Precio
                    let nuevacolumna3 = nuevafila.insertCell(3)
                    nuevacolumna3.textContent = element.Cantidad
                    let nuevacolumna6 = nuevafila.insertCell(4)
                    let id = element.Id
                    nuevacolumna6.innerHTML = `<button class="btn modal-trigger waves-effect waves-light blue" type="submit" data-target="idModal" onclick="cargarMedicamento(${id})" name="action">
                    <i class="material-icons right">remove_red_eye</i>
                  </button>`
                    let nuevacolumna7 = nuevafila.insertCell(5)
                    nuevacolumna7.innerHTML = `<button class="btn modal-trigger green" type="submit" data-target="idModalEditar" onclick="getEditarMedicamento(${id})" name="action">
                    <i class="material-icons right">edit</i>
                  </button>`
                    let nuevacolumna8 = nuevafila.insertCell(6)
                    nuevacolumna8.innerHTML = `<button class="btn modal-trigger red" type="submit" data-target="idModalEliminar" onclick="getEditarMedicamento(${id})" name="action">
                    <i class="material-icons right">delete</i>
                  </button>`
                }
            } else {
                alert("Error cargando los medicamentos")
            }
        })
        .catch(error => console.log("error"))

}

function cargarMedicamento(id) {
    const ruta = "https://proyecto2-uhospital.herokuapp.com/medicamento/" + id
    fetch(ruta, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Medicamento Encontrado") {
                for (let index = 0; index < response.medicamento.length; index++) {
                    const medicamento = response.medicamento[index];
                    document.getElementById("id-field").value = medicamento.Id
                    document.getElementById("nombre-field").value = medicamento.Nombre
                    document.getElementById("precio-field").value = medicamento.Precio
                    document.getElementById("descripcion-field").value = medicamento.Descripcion
                    document.getElementById("cantidad-field").value = medicamento.Cantidad
                }
            } else {
                alert("Error encontrado el medicamento")
            }
        })
        .catch(error => console.log("error"))

}

function getEditarMedicamento(id) {
    const ruta = "https://proyecto2-uhospital.herokuapp.com/medicamento/" + id
    fetch(ruta, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Medicamento Encontrado") {
                for (let index = 0; index < response.medicamento.length; index++) {
                    const medicamento = response.medicamento[index];
                    document.getElementById("id-fielde").value = medicamento.Id;
                    document.getElementById("nombre-fielde").value = medicamento.Nombre;
                    document.getElementById("precio-fielde").value = medicamento.Precio;
                    document.getElementById("descripcion-fielde").value = medicamento.Descripcion;
                    document.getElementById("cantidad-fielde").value = medicamento.Cantidad;
                    idMedicamento = id;
                }
            } else {
                alert("Error encontrado el medicamento")
            }
        })
        .catch(error => console.log("error"))
}

function editarMedicamento() {
    const ruta = "https://proyecto2-uhospital.herokuapp.com/modificarMedicamento/" + idMedicamento;
    let nombre = document.getElementById("nombre-fielde").value;
    let precio = document.getElementById("precio-fielde").value;
    let descripcion = document.getElementById("descripcion-fielde").value;
    let cantidad = document.getElementById("cantidad-fielde").value;
    let medicamento = {
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        cantidad: cantidad,
    };
    console.log(medicamento)

    fetch(ruta, {
            method: "PUT",
            body: JSON.stringify(medicamento),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Medicamento modificado") {
                alert('Medicamento modificado exitosamente')
                window.location.href = "moduloAdminMedicamentos.html"
            }
        })
        .catch(error => console.log("error"))
}

function eliminarMedicamento(event) {
    event.preventDefault();
    console.log("hola");
    const ruta = "https://proyecto2-uhospital.herokuapp.com/eliminarMedicamento/" + idMedicamento;

    fetch(ruta, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Medicamento Eliminado") {
                window.location.href = "moduloAdminMedicamentos.html"
            }
        })
        .catch(error => console.log("error"))
}