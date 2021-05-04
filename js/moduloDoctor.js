document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});


let usuarioo = JSON.parse(localStorage.getItem("usuario"))
let nombreDoctor, idDoctor
    // let idPaciente;
usuarioo.forEach(element => {
    if (element.TipoUsuario == 1) {
        nombreDoctor = element.Nombre + " " + element.Apellido;
        idDoctor = element.Id
    }

});

function receta() {
    let id = "";
    plantillaHTML = "";
    const ruta = "https://proyecto2-uhospital.herokuapp.com/moduloDoctor/crearReceta";
    let fecha = document.getElementById("fecha").value;
    let nombre = document.getElementById("nombre-paciente").value;
    let padecimiento = document.getElementById("padecimiento").value;
    let descripcion = document.getElementById("descripcion").value;
    let receta = {
        fecha: fecha,
        nombre: nombre,
        padecimiento: padecimiento,
        descripcion: descripcion
    };
    fetch(ruta, {
            method: "POST",
            body: JSON.stringify(receta),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Receta agregada") {
                alert("Receta creada")
                window.location.href = "./moduloDoctor.html"
            }
        })
        .catch(error => console.log("error"))

    plantillaHTML = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        
            <title>Receta paciente</title>
        
            <link rel="icon" href="./images/favicon.png" type="image/x-icon" />
        
            <style>
              body {
                font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
                text-align: center;
                color: #777;
              }
        
              body h1 {
                font-weight: 300;
                margin-bottom: 0px;
                padding-bottom: 0px;
                color: #000;
              }
        
              body h3 {
                font-weight: 300;
                margin-top: 10px;
                margin-bottom: 20px;
                font-style: italic;
                color: #555;
              }
        
              body a {
                color: #06f;
              }
        
              .invoice-box {
                max-width: 800px;
                margin: auto;
                padding: 30px;
                border: 1px solid #eee;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                font-size: 16px;
                line-height: 24px;
                font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
                color: #555;
              }
        
              .invoice-box table {
                width: 100%;
                line-height: inherit;
                text-align: left;
                border-collapse: collapse;
              }
        
              .invoice-box table td {
                padding: 5px;
                vertical-align: top;
              }
        
              .invoice-box table tr td:nth-child(2) {
                text-align: right;
              }
        
              .invoice-box table tr.top table td {
                padding-bottom: 20px;
              }
        
              .invoice-box table tr.top table td.title {
                font-size: 45px;
                line-height: 45px;
                color: #333;
              }
        
              .invoice-box table tr.information table td {
                padding-bottom: 40px;
              }
        
              .invoice-box table tr.heading td {
                background: #eee;
                border-bottom: 1px solid #ddd;
                font-weight: bold;
              }
        
              .invoice-box table tr.details td {
                padding-bottom: 20px;
              }
        
              .invoice-box table tr.item td {
                border-bottom: 1px solid #eee;
              }
        
              .invoice-box table tr.item.last td {
                border-bottom: none;
              }
        
              .invoice-box table tr.total td:nth-child(2) {
                border-top: 2px solid #eee;
                font-weight: bold;
              }
        
              @media only screen and (max-width: 600px) {
                .invoice-box table tr.top table td {
                  width: 100%;
                  display: block;
                  text-align: center;
                }
        
                .invoice-box table tr.information table td {
                  width: 100%;
                  display: block;
                  text-align: center;
                }
              }
            </style>
          </head>
        
          <body>
            <div class="invoice-box">
              <table>
                <tr class="top">
                  <td colspan="2">
                    <table>
                      <tr>
                        <td class="title">
                        <h4>Receta Paciente</h4>
                        <h6>Paciente: ${nombre}</h6>
                        </td>
        
                        <td>Fecha receta: ${new Date().toLocaleDateString("es-US")}<br /></td>
                      </tr>
                    </table>
                  </td>
                </tr>
        
                <tr class="information">
                  <td colspan="2">
                  </td>
                </tr>
              </table>
        
              <table>
                <tr class="heading">
                  <td>Padecimiento</td>
                  <td>Descripcion</td>
                </tr>
                \n<tr class="item">
                          <td>${padecimiento}</td>
                          <td>${descripcion}</td>
                        </tr>\n
                `;
    plantillaHTML += `
              <tr class="item">
              <td></td>
              <td></td>
              </tr>\n
              </table>
                    </div>
                  </body>
                </html>`;

    html2pdf().from(plantillaHTML).toPdf().save("receta.pdf");
}




function cargarTabla() {
    const rutaTabla = "https://proyecto2-uhospital.herokuapp.com/moduloEnfermera/citasPendientes";
    let tabla = document.getElementById("tableCitasPendientes");

    fetch(rutaTabla, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Citas") {
                console.log(response.citas)

                for (let index = 0; index < response.citas.length; index++) {
                    const element = response.citas[index];
                    let nuevafila = tabla.insertRow(-1)
                    let nuevacolumna = nuevafila.insertCell(0)
                    nuevacolumna.textContent = element.Fecha
                    let nuevacolumna1 = nuevafila.insertCell(1)
                    nuevacolumna1.textContent = element.Hora
                    let nuevacolumna2 = nuevafila.insertCell(2)
                    nuevacolumna2.textContent = element.Motivo
                    let id = element.Id
                    let nuevacolumna7 = nuevafila.insertCell(3)
                    nuevacolumna7.innerHTML = `<button class="btn  green" type="submit"  onclick="editarCita(${element.Id})"  name="action">
                  <i class="material-icons right">check</i>
                </button>`
                    let nuevacolumna8 = nuevafila.insertCell(4)
                    nuevacolumna8.innerHTML = `<button class="btn red" type="submit"  onclick="rechazarCita(${element.Id})" name="action">
                  <i class="material-icons right">close</i>
                </button>`
                }
            } else {
                alert("Error cargando las citas")
            }
        })
        .catch(error => console.log("error"))

}

function editarCita(idcita) {
    const ruta = "https://proyecto2-uhospital.herokuapp.com/modificarCita/" + idcita;

    // console.log(doc);
    let doctor = {
        doctor: nombreDoctor
    };
    fetch(ruta, {
            method: "PUT",
            body: JSON.stringify(doctor),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Cita modificada") {
                alert("Doctor asignado")
                window.location.href = "./citasDoctor.html"

            } else {
                alert("Error cargando las enfermeras")
            }
        })
        .catch(error => console.log("error"))

}


function rechazarCita(idCita) {
    const ruta = "https://proyecto2-uhospital.herokuapp.com/rechazarCita/" + idCita;
    fetch(ruta, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Cita modificada") {
                alert("Cita rechazada")
                window.location.href = "./citasPendientesEnfermera.html"

            } else {
                alert("Error cargando las enfermeras")
            }
        })
        .catch(error => console.log("error"))

}


function citasDoctor() {
    const nombre = "doctor";
    const apellido = "loggeado"
    const rutaTabla = "https://proyecto2-uhospital.herokuapp.com/moduloDoctor/citas/" + nombre + " " + apellido;
    let tabla = document.getElementById("tableCitasDoctor");

    fetch(rutaTabla, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Citas") {
                console.log(response.citas)

                for (let index = 0; index < response.citas.length; index++) {
                    const element = response.citas[index];
                    let nuevafila = tabla.insertRow(-1)
                    let nuevacolumna = nuevafila.insertCell(0)
                    nuevacolumna.textContent = element.Fecha
                    let nuevacolumna1 = nuevafila.insertCell(1)
                    nuevacolumna1.textContent = element.Hora
                    let nuevacolumna2 = nuevafila.insertCell(2)
                    nuevacolumna2.textContent = element.Motivo
                    let id = element.Id
                    let nuevacolumna7 = nuevafila.insertCell(3)
                    nuevacolumna7.innerHTML = ` <p>
                    <label>
                      <input type="checkbox" class="filled-in" id="myCheck"  onclick="myFunction(${element.Id})" />
                      <span>Filled in</span>
                    </label>
                  </p>`
                }
            } else {
                alert("Error cargando las citas")
            }
        })
        .catch(error => console.log("error"))

}

function myFunction(idCita) {
    var checkBox = document.getElementById("myCheck");
    if (checkBox.checked == true) {
        // alert("Cita completada")
        editarCitaDoctor(idCita);
    } else {
        noEditarCitaDoctor(idCita);
    }
}

function editarCitaDoctor(id) {
    const ruta = "https://proyecto2-uhospital.herokuapp.com/modificarCitaDoctor/" + id;
    fetch(ruta, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Cita modificada") {
                alert("Cita completada")

            } else {
                alert("Error cargando las enfermeras")
            }
        })
        .catch(error => console.log("error"))
}

function noEditarCitaDoctor(id) {
    const ruta = "https://proyecto2-uhospital.herokuapp.com/noModificarCitaDoctor/" + id;
    fetch(ruta, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Cita modificada") {
                alert("Cita no completada")

            } else {
                alert("Error cargando las enfermeras")
            }
        })
        .catch(error => console.log("error"))
}

function cerrarSesion() {
    localStorage.removeItem('usuario');
}


function cargarDoctor() {
    const ruta = "https://proyecto2-uhospital.herokuapp.com/doctor/" + idDoctor
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
                    const paciente = response.doctor[index];
                    document.getElementById("id-field").value = paciente.Id
                    document.getElementById("nombre-field").value = paciente.Nombre
                    document.getElementById("apellido-field").value = paciente.Apellido
                    document.getElementById("fecha-field").value = paciente.FechaNacimiento
                    document.getElementById("username-field").value = paciente.Username
                    document.getElementById("password-field").value = paciente.Passsword
                    document.getElementById("especialidad-field").value = paciente.Especialidad
                    document.getElementById("sexo-field").value = paciente.Sexo
                    document.getElementById("telefono-field").value = paciente.Telefono
                }
            } else {
                alert("Error encontrado el paciente")
            }
        })
        .catch(error => console.log("error"))

}

function editarDoctor() {

    const ruta = "https://proyecto2-uhospital.herokuapp.com/modificarDoctor/" + idDoctor;
    let nombre = document.getElementById("nombre-field").value;
    let apellido = document.getElementById("apellido-field").value;
    let fechaNacimiento = document.getElementById("fecha-field").value;
    let sexo = document.getElementById("sexo-field").value;
    let username = document.getElementById("username-field").value;
    let password = document.getElementById("password-field").value;
    let telefono = document.getElementById("telefono-field").value;
    let especialidad = document.getElementById("especialidad-field").value;
    let paciente = {
        nombre: nombre,
        apellido: apellido,
        fechaNacimiento: fechaNacimiento,
        sexo: sexo,
        username: username,
        password: password,
        especialidad: especialidad,
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
            if (response.message == "Doctor modificado") {
                alert('Perfil modificado exitosamente')
                window.location.href = "./moduloDoctor.html"
            }
        })
        .catch(error => console.log("error"))
}