document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});



let usuarioo = JSON.parse(localStorage.getItem("usuario"))
let username, idPaciente
    // let idPaciente;
usuarioo.forEach(element => {
    if (element.TipoUsuario == 3) {
        username = element.Username;
        idPaciente = element.Id
    }

});
const rutaTabla = "https://proyecto2-uhospital.herokuapp.com/moduloPaciente/medicamentosCompra";
let nombre, precio, descripcion, cantidad
let total = 0;
let plantillaHTML = "";


function cargarMedicamentos() {
    let tabla = document.getElementById("tableMedicamentos");
    let body = document.getElementById("card");
    fetch(rutaTabla, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Medicamentos") {
                console.log(response.medicamentos);
                let cartas = "";
                response.medicamentos.forEach(med => {
                    let d = med
                    cartas += `
                    <div class="col s6 m4">
                      <div class="card" id="nombre" >
                        <div class="card-content">
                        <span id="n" class="card-title"><h4></h4>${med.Nombre}</span>
                        <li><span>Precio:</span>${med.Precio}</li>
                      <li><span>Descripción: </span>${med.Descripcion}</li>
                      <li><span>Cantidad:</span>${med.Cantidad}</li>
                        </div>
                        <div class="card-action">
                        <button class="btn  blue" type="submit" onclick="agregarCarrito(${med.Id})" name="action">
                        Agregar al pedido
                        </button>
                        </div>
                      </div>
                    </div>`
                });

                // $("#body").empty();
                $("#card").append(cartas);
            } else {
                alert("Error cargando las citas del paciente")
            }
        })
        .catch(error => console.log("error"))

}


async function agregarCarrito(id_producto) {
    const ruta = "https://proyecto2-uhospital.herokuapp.com/moduloPaciente/medicamentosCompra";
    let nombrep,
        preciop,
        descripcionp,
        cantidadp

    fetch(ruta, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Medicamentos") {
                response.medicamentos.forEach(med => {
                    if (med.Id == id_producto) {
                        nombrep = med.Nombre
                        preciop = med.Precio
                        descripcionp = med.Descripcion
                        cantidadp = med.Cantidad

                        let carrito = localStorage.getItem("carrito");
                        if (!carrito) {
                            console.log(nombrep);
                            carrito = [{ id: id_producto, cantidad: 1, nombre: nombrep, precio: preciop, subtotal: 1 * preciop }];
                            console.log(carrito);
                            localStorage.setItem("carrito", JSON.stringify(carrito));
                            alert("Agregado al pedido")
                            return;
                        }

                        carrito = JSON.parse(carrito);
                        let existe = false;

                        carrito.forEach((producto) => {
                            if (producto.id == id_producto) {
                                producto.cantidad++;
                                producto.subtotal = producto.cantidad * producto.precio
                                console.log(carrito);
                                localStorage.setItem("carrito", JSON.stringify(carrito));
                                existe = true;
                                alert("Agregado este producto otra vez")
                                return;
                            }
                        });

                        if (!existe) {
                            carrito.push({ id: id_producto, cantidad: 1, nombre: nombrep, precio: preciop, subtotal: 1 * preciop });
                            localStorage.setItem("carrito", JSON.stringify(carrito));
                            alert("Agregado al pedido")
                            console.log(carrito);
                        }

                    }
                })
            } else {
                alert("Error cargando las citas del paciente")
            }
        })
        .catch(error => console.log("error"))
}

function tablaPedido() {

    let tabla = document.getElementById("tablePedido");
    let pedido = JSON.parse(localStorage.getItem("carrito"))
    console.log(pedido)
    pedido.forEach(element => {
        console.log(element.cantidad);
        let nuevafila = tabla.insertRow(-1)
        let nuevacolumna = nuevafila.insertCell(0)
        nuevacolumna.textContent = element.id
        let nuevac = nuevafila.insertCell(1)
        nuevac.textContent = element.nombre
        let nuevacolumna1 = nuevafila.insertCell(2)
        nuevacolumna1.textContent = element.precio
        let nuevacolumna2 = nuevafila.insertCell(3)
        nuevacolumna2.textContent = element.cantidad
        let nuevacolumna3 = nuevafila.insertCell(4)
        nuevacolumna3.textContent = element.precio * element.cantidad
        total += element.precio * element.cantidad
        let columna4 = nuevafila.insertCell(5)
        columna4.innerHTML = `<button class="btn  red" type="submit" onclick="eliminarCarrito(${element.id})" name="action">
        Eliminar
        </button>`
    });
    let nuevafila = tabla.insertRow(-1)
    let nuevacolumna1 = nuevafila.insertCell(0)
    let nuevacolumna2 = nuevafila.insertCell(1)
    let nuevacolumnax = nuevafila.insertCell(2)
    let nuevacolumna3 = nuevafila.insertCell(3)
    nuevacolumna3.innerHTML = `<b>TOTAL<b>`
    let nuevacolumna4 = nuevafila.insertCell(4)
    nuevacolumna4.innerHTML = `<b>${total}<b>`


    plantillaHTML = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
      
          <title>Reporte Pedidos</title>
      
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
                <td>ID</td>
                <td>Nombre</td>
                <td>Precio</td>
                <td>Cantidad</td>
                <td>Sub Total</td>
              </tr>`;

    pedido.forEach((usuario) => {
        plantillaHTML += `\n<tr class="item">
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.precio}</td>
                <td>${usuario.cantidad}</td>
                <td>${usuario.subtotal}</td>
              </tr>\n`;
    });

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
}

async function eliminarCarrito(id_producto) {
    let carrito = localStorage.getItem("carrito");
    carrito = await JSON.parse(carrito);
    for (let index = 0; index < carrito.length; index++) {
        const element = carrito[index];
        if (element.id == id_producto) {
            carrito.splice(index, 1)
            localStorage.setItem("carrito", JSON.stringify(carrito));
            alert("Eliminado del pedido")
            window.location.href = "./pedidoPaciente.html"
            return;
        }
    }
}

function generarReporte() {
    const ruta = "https://proyecto2-uhospital.herokuapp.com/moduloPaciente/agregarProductoPedido";
    let pedido = JSON.parse(localStorage.getItem("carrito"))
    pedido.forEach((usuario) => {
        let producto = {
            idProducto: usuario.id,
            nombreProducto: usuario.nombre,
            cantidad: usuario.cantidad,
            total: total
        };
        fetch(ruta, {
                method: "POST",
                body: JSON.stringify(producto),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(res => res.json())
            .then(function(response) {
                if (response.message == "Producto agregado al pedido") {
                    localStorage.removeItem('carrito');
                    alert("Pedido guardado")
                }
            })
            .catch(error => console.log("error"))
    });




    html2pdf().from(plantillaHTML).toPdf().save("reporte_pedido.pdf");
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
                    document.getElementById("password-field").value = paciente.Username
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