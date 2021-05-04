let usuarioo = JSON.parse(localStorage.getItem("usuario"))
let username, idEnfermera
    // let idPaciente;
usuarioo.forEach(element => {
    if (element.TipoUsuario == 2) {
        username = element.Username;
        idEnfermera = element.Id
    }

});

// const ruta = "https://proyecto2-uhospital.herokuapp.com/cargarEnfermeras";
const rutaTabla = "https://proyecto2-uhospital.herokuapp.com/moduloEnfermera/citasPendientes";
// var idEnfermera = 0;
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});

var idcita = 0;

function cargarDoctores() {
    const ruta = "https://proyecto2-uhospital.herokuapp.com/doctores";
    fetch(ruta, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Doctores") {
                // console.log(response.doctores)
                $('select#subcategory').attr('disabled', false);
                response.doctores.forEach(element => {
                    $('select#subcategory').append('<option value="' + element.Nombre + " " + element.Apellido + '">' + element.Nombre + " " + element.Apellido + '</option>');
                });
                var subcatSelectElem = document.querySelectorAll('#subcategory');
                var subcatSelectElem = M.FormSelect.init(subcatSelectElem);
            } else {
                alert("Error cargando las enfermeras")
            }
        })
        .catch(error => console.log("error"))
}

function cargarTabla(event) {
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
                    nuevacolumna7.innerHTML = `<button class="btn modal-trigger green" type="submit" data-target="idModalEditar" onclick="todos(${element.Id})"  name="action">
                    <i class="material-icons right">check</i>
                  </button>`
                    let nuevacolumna8 = nuevafila.insertCell(4)
                    nuevacolumna8.innerHTML = `<button class="btn red" type="submit"  onclick="rechazarCita(${element.Id})" name="action">
                    <i class="material-icons right">close</i>
                  </button>`
                }
            } else {
                alert("Error cargando las enfermeras")
            }
        })
        .catch(error => console.log("error"))

}


function cargarTablaAceptadas() {
    const ruta = "https://proyecto2-uhospital.herokuapp.com/moduloEnfermera/citasAceptadas";
    let tabla = document.getElementById("tableCitasAceptadas");

    fetch(ruta, {
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
                }
            } else {
                alert("Error cargando las enfermeras")
            }
        })
        .catch(error => console.log("error"))

}

function factura() {
    let id = "";
    plantillaHTML = "";
    const ruta = "https://proyecto2-uhospital.herokuapp.com/moduloEnfermera/crearFactura";
    let fecha = document.getElementById("fecha").value;
    let nombre = document.getElementById("nombre-paciente").value;
    let doctor = document.getElementById("doctor").value;
    let precioConsulta = document.getElementById("precio-consulta").value;
    let costoOperacion = document.getElementById("costo-op").value;
    let costoInter = document.getElementById("costo-inter").value;
    console.log(costoInter);
    let total;
    if (costoOperacion == "") {
        total = document.getElementById("total").value = parseFloat(precioConsulta) + parseFloat(costoInter);
    } else if (costoInter == "") {
        total = document.getElementById("total").value = parseFloat(precioConsulta) + parseFloat(costoOperacion);
    } else if (costoOperacion == "" && costoInter == "") {
        total = document.getElementById("total").value = parseFloat(precioConsulta);
    } else {
        total = document.getElementById("total").value = parseFloat(precioConsulta) + parseFloat(costoOperacion) + parseFloat(costoInter);
    }

    let factura = {
        fecha: fecha,
        nombre: nombre,
        doctor: doctor,
        precioConsulta: precioConsulta,
        costoOperacion: costoOperacion,
        costoInter: costoInter,
        total: total
    };
    fetch(ruta, {
            method: "POST",
            body: JSON.stringify(factura),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Factura agregada") {
                response.factura.forEach(element => {
                    id =
                        console.log(element.Id);
                });
                alert("Pedido guardado")
                window.location.href = "./facturaEnfermera.html"
            }
        })
        .catch(error => console.log("error"))

    plantillaHTML = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        
            <title>Factura paciente</title>
        
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
                        <h4>Factura No. ${id}</h4>
                        </td>
        
                        <td>Fecha creación: ${new Date().toLocaleDateString("es-US")}<br /></td>
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
                  <td>Fecha</td>
                  <td>Paciente</td>
                  <td>Precio Consulta</td>
                  <td>Costo Operacion</td>
                  <td>Costo Internado</td>
                </tr>
                \n<tr class="item">
                          <td>${fecha}</td>
                          <td>${nombre}</td>
                          <td>${precioConsulta}</td>
                          <td>${costoOperacion}</td>
                          <td>${costoInter}</td>
                        </tr>\n
                `;
    plantillaHTML += `
              <tr class="item">
              <td></td>
              <td></td>
              <td></td>
              <td><b>TOTAL</b></td>
                        <td>${total}</td>
                        </tr>\n
              </table>
                    </div>
                  </body>
                </html>`;

    html2pdf().from(plantillaHTML).toPdf().save("factura.pdf");
}

function todos(idCita) {
    cargarDoctores();
    idcita = idCita;
}

function cargarDoctoresFactura() {
    const ruta = "https://proyecto2-uhospital.herokuapp.com/doctores";
    fetch(ruta, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Doctores") {
                // console.log(response.doctores)
                $('select#doctor').attr('disabled', false);
                response.doctores.forEach(element => {
                    $('select#doctor').append('<option value="' + element.Nombre + " " + element.Apellido + '">' + element.Nombre + " " + element.Apellido + '</option>');
                });
                var subcatSelectElem = document.querySelectorAll('#doctor');
                var subcatSelectElem = M.FormSelect.init(subcatSelectElem);
            } else {
                alert("Error cargando las enfermeras")
            }
        })
        .catch(error => console.log("error"))
}

function editarCita() {
    const ruta = "https://proyecto2-uhospital.herokuapp.com/modificarCita/" + idcita;
    let doc = document.getElementById("subcategory").value;
    console.log(doc);
    let doctor = {
        doctor: doc,
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
                window.location.href = "./citasPendientesEnfermera.html"

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

function cerrarSesion() {
    localStorage.removeItem('usuario');
}



function cargarEnfermera() {
    const ruta = "https://proyecto2-uhospital.herokuapp.com/enfermera/" + idEnfermera
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
                    document.getElementById("username-field").value = enfermera.Username
                    document.getElementById("password-field").value = enfermera.Username
                    document.getElementById("sexo-field").value = enfermera.Sexo
                    document.getElementById("telefono-field").value = enfermera.Telefono
                }
            } else {
                alert("Error encontrado la enfermera")
            }
        })
        .catch(error => console.log("error"))

}

function editarEnfermera() {

    const ruta = "https://proyecto2-uhospital.herokuapp.com/modificarEnfermera/" + idEnfermera;
    let nombre = document.getElementById("nombre-field").value;
    let apellido = document.getElementById("apellido-field").value;
    let fechaNacimiento = document.getElementById("fecha-field").value;
    let sexo = document.getElementById("sexo-field").value;
    let username = document.getElementById("username-field").value;
    let password = document.getElementById("password-field").value;
    let telefono = document.getElementById("telefono-field").value;
    let enfermeraa = {
        nombre: nombre,
        apellido: apellido,
        fechaNacimiento: fechaNacimiento,
        sexo: sexo,
        username: username,
        password: password,
        telefono: telefono,
    };

    fetch(ruta, {
            method: "PUT",
            body: JSON.stringify(enfermeraa),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Enfermera modificada") {
                alert('Perfil modificado exitosamente')
                window.location.href = "./citasPendientesEnfermera.html"
            }
        })
        .catch(error => console.log("error"))
}