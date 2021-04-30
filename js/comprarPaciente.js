const rutaTabla = "https://proyecto2-uhospital.herokuapp.com/moduloPaciente/medicamentosCompra";
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});

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
                // for (let index = 0; index < response.medicamentos.length; index++) {
                //     const element = response.medicamentos[index];
                //     let nuevafila = tabla.insertRow(-1)
                //     let nuevacolumna = nuevafila.insertCell(0)
                //     nuevacolumna.textContent = element.Id
                //     let nuevacolumna1 = nuevafila.insertCell(1)
                //     nuevacolumna1.textContent = element.Nombre
                //     let nuevacolumna2 = nuevafila.insertCell(2)
                //     nuevacolumna2.textContent = element.Precio
                //     let nuevacolumna3 = nuevafila.insertCell(3)
                //     nuevacolumna3.innerHTML = `
                //     <select>
                //       <option value="1">Option 1</option>
                //       <option value="2">Option 2</option>
                //       <option value="3">Option 3</option>
                //     </select>`
                //     let nuevacolumna4 = nuevafila.insertCell(4)
                //     let id = element.Id
                //     nuevacolumna4.innerHTML = `<button class="btn  waves-effect waves-light blue" type="submit"  name="action">
                //             Agregar al pedido
                //           </button>`
                // }
                let cartas = "";
                response.medicamentos.forEach(med => {
                    let d = med
                    cartas += `
                    <div class="col s6 m4">
                      <div class="card">
                        <div class="card-content">
                        <span class="card-title"><h4></h4>${med.Nombre}</span>
                        <li><span>Precio:</span>${med.Precio}</li>
                      <li><span>Descripción: </span>${med.Descripcion}</li>
                      <li><span>Cantidad:</span>${med.Cantidad}</li>
                        </div>
                        <div class="card-action">
                        <button class="btn  waves-effect waves-light blue" type="submit" onclick="${localStorage.setItem("producto", JSON.stringify(med))}" name="action">
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

function agregarPedido(med) {
    console.log("hola");
    console.log("---", med);
    localStorage.setItem("producto", JSON.stringify(nombre, precio))
    let usuarioo = JSON.parse(localStorage.getItem("producto"))
    console.log(usuarioo);
    // const link = "https://proyecto2-uhospital.herokuapp.com/moduloPaciente/moduloPaciente/agregarProductoPedido";
    // event.preventDefault();
    // let idPaciente = document.getElementById("idpaciente-fielde").value;
    // let fecha = document.getElementById("fecha-fielde").value;
    // let hora = document.getElementById("hora-fielde").value;
    // let motivo = document.getElementById("motivo-fielde").value;
    // let citaAgregada = {
    //     idPaciente: 2,
    //     fecha: fecha,
    //     hora: hora,
    //     motivo: motivo,
    // };
    // fetch(link, {
    //         method: "POST",
    //         body: JSON.stringify(citaAgregada),
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //     .then(res => res.json())
    //     .then(function(response) {
    //         console.log(response.message);
    //         if (response.message == "Cita creada exitosamente") {
    //             alert('Cita creada exitosamente')
    //         }
    //         if (response.message == "Repetido") {
    //             console.log("holaaa");
    //             alert('Ya tienes una cita no puedes crear otra')
    //         }
    //     })
    //     .catch(error => console.log("error"))
}