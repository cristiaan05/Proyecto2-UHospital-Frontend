function logIn(event) {
    event.preventDefault();
    const ruta = "https://proyecto2-uhospital.herokuapp.com/login";
    const usuario = document.getElementById("user").value;
    const password = document.getElementById("password").value;

    let login = {
        username: usuario,
        password: password,
    };

    console.log(login)

    fetch(ruta, {
            method: "POST",
            body: JSON.stringify(login),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(response => {
            if (response.message == "Incorrecto") {
                alert('Credenciales inválidas')
            } else {
                response.usuario.forEach(element => {
                    localStorage.setItem('usuario', JSON.stringify(response.usuario));
                    if (element.TipoUsuario == 0) {
                        window.location.href = './moduloAdmin.html';
                    }
                    if (element.TipoUsuario == 1) {
                        window.location.href = './moduloDoctor.html';
                    }
                    if (element.TipoUsuario == 2) {
                        window.location.href = './moduloEnfermera.html';
                    }
                    if (element.TipoUsuario == 3) {
                        window.location.href = './moduloPaciente.html';
                    }
                    // console.log(element.TipoUsuario);
                });
            }

        })
}