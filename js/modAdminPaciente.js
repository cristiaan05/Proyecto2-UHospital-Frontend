const ruta = "https://proyecto2-uhospital.herokuapp.com/cargarPacientes";
const rutaTabla = "https://proyecto2-uhospital.herokuapp.com/pacientes";
// const rutaTabla = "http://127.0.0.1:4000/pacientes";
var idPaciente = 0;
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
    let pacientes = [];
    console.log(texto);

    texto = texto.split("\n");

    texto.forEach((linea) => {
        if (linea != "") {
            let paciente = linea.split(",");
            if (paciente[0] != "nombre") {
                let usuario = {
                    nombre: paciente[0],
                    apellido: paciente[1],
                    fecha: paciente[2],
                    genero: paciente[3],
                    usuario: paciente[4],
                    password: paciente[5],
                    telefono: paciente[6],
                };
                pacientes.push(usuario);
            }
        }
    });
    let usuariosCM = {
        usuarios: pacientes,
    };

    fetch(ruta, {
            method: "POST",
            body: JSON.stringify(usuariosCM),
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
            window.location.href = "./pacientesModAdmin.html"
        });
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
                }
            } else {
                alert("Error encontrado el paciente")
            }
        })
        .catch(error => console.log("error"))
}

function editarPaciente() {

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

function cerrarSesion() {
    localStorage.removeItem('usuario');
}

function top5med() {
    let plantillaHTML = "";
    const ruta = "https://proyecto2-uhospital.herokuapp.com/pedidos";
    plantillaHTML = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    
        <title>Reporte top 5 medicamentos</title>
    
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
                    <h4>Pedido</h4>
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
              <td>Id Producto</td>
              <td>Nombre</td>
              <td>Cantidad</td>
            </tr>`;
    fetch(ruta, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Pedidos") {
                for (let index = 0; index < response.pedidos.length; index++) {
                    const paciente = response.pedidos[index];
                    console.log(paciente.Nombre);
                    plantillaHTML += `\n<tr class="item">
                                    <td>${paciente.IdProducto}</td>
                                    <td>${paciente.Nombre}</td>
                                    <td>${paciente.Cantidad}</td>
                                  </tr>\n`;
                }
            } else {
                alert("Error encontrado el paciente")
            }
        })
        .catch(error => console.log("error"))

    plantillaHTML += `
    <tr class="item">
    <td></td>
    <td></td>
    <td></td>
    </table>
          </div>
        </body>
      </html>`;

    html2pdf().from(plantillaHTML).toPdf().save("top5medicamentos.pdf");
}