document.addEventListener('DOMContentLoaded', () => {
    const formularioConsulta = document.getElementById('formularioConsulta');
    const formularioRegistro = document.getElementById('formularioRegistro');
    const nombreGithubElement = document.getElementById('nombreGithub');
    const selectPais = document.getElementById('selectPais');
    const tablaDatos = document.getElementById('tablaDatos').getElementsByTagName('tbody')[0];

    // Función para cargar países en el select
    function cargarPaises() {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(paises => {
                paises.forEach(pais => {
                    const option = document.createElement('option');
                    option.value = pais.name.common;
                    option.textContent = pais.name.common;
                    selectPais.appendChild(option);
                });
            })
            .catch(error => console.error('Error al cargar los países:', error));
    }

    // Cargar países al cargar la página
    cargarPaises();

    // Manejar el envío del formulario de consulta
    formularioConsulta.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;

        fetch(`https://api.github.com/users/${username}`)
            .then(response => response.json())
            .then(usuario => {
                if (usuario.name) {
                    nombreGithubElement.textContent = usuario.name;
                    document.getElementById('vista2').style.display = 'block';
                    document.getElementById('vista1').style.display = 'none';
                } else {
                    alert('No se encontró el usuario o el usuario no tiene nombre registrado.');
                }
            })
            .catch(error => console.error('Error al consultar GitHub:', error));
    });

    // Manejar el envío del formulario de registro
    formularioRegistro.addEventListener('submit', (event) => {
        event.preventDefault();

        const telefono = document.getElementById('telefono').value;
        const correo = document.getElementById('correo').value;
        const nombreGithub = nombreGithubElement.textContent;
        const paisSeleccionado = selectPais.value;

        // Consultar el dial code del país
        fetch(`https://restcountries.com/v3.1/name/${paisSeleccionado}`)
            .then(response => response.json())
            .then(pais => {
                const dialCode = pais[0].idd.root + pais[0].idd.suffixes[0];
                const telefonoConCodigo = `${dialCode} ${telefono}`;

                // Mostrar datos en la tabla
                const fila = tablaDatos.insertRow();
                fila.insertCell(0).textContent = nombreGithub;
                fila.insertCell(1).textContent = telefonoConCodigo;
                fila.insertCell(2).textContent = correo;

                // Enviar los datos a la API PHP
                fetch('index.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        nombre_github: nombreGithub,
                        telefono: telefonoConCodigo,
                        correo: correo
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === "success") {
                        console.log('Datos guardados exitosamente.');
                    } else {
                        console.error('Error al guardar los datos.');
                    }
                })
                .catch(error => console.error('Error al enviar los datos:', error));
            })
            .catch(error => console.error('Error al consultar el dial code:', error));
    });
});
