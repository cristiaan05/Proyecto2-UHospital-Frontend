const rutaTabla = "https://proyecto2-uhospital.herokuapp.com/moduloPaciente/medicamentosCompra";

function cargarMedicamentos() {
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
                console.log(response.medicamentos);
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
                    let id = element.Id
                    nuevacolumna3.innerHTML = `<button class="btn  waves-effect waves-light blue" type="submit"  name="action">
                            Agregar al pedido
                          </button>`
                }

            } else {
                alert("Error cargando las citas del paciente")
            }
        })
        .catch(error => console.log("error"))

}