const ruta = "http://localhost:4000/registroPaciente";

function registrarPaciente(event) {
    event.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let fechaNacimiento = document.getElementById("fechaNacimiento").value;
    let sexo = document.getElementById("sexo").value;
    console.log(sexo)
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let telefono = document.getElementById("telefono").value;
    let paciente = {
        nombre: nombre,
        apellido: apellido,
        fechaNacimiento: fechaNacimiento,
        sexo: sexo,
        username: username,
        password: password,
        telefono: telefono,
    };

    fetch(ruta, {
            method: "POST",
            body: JSON.stringify(paciente),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(function(response) {
            if (response.message == "Ok") {
                localStorage.setItem("paciente", JSON.stringify(response.usuario))
                alert('Usuario creado correctamente')
                window.location.href = "./registrarPaciente.html";
            } else if (response.message == "Este usuario ya existe") {
                console.log("Este usuario ya existeee")
                alert('Este usuario ya existe')
            } else if (response.message = "La contrasena debe al menos 8 caracteres") {
                alert("La contraseña debe tener más de 8 caracteres")
            }

            // Recuperar usuario del local storage
            let usuarioo = JSON.parse(localStorage.getItem("paciente"))
            console.log(usuarioo)
        })
        .catch(error => console.log("error"))
}