document.addEventListener('DOMContentLoaded', () => {
    const formularioConsulta = document.getElementById('formularioConsulta');
    const resultadoConsulta = document.getElementById('resultadoConsulta');
    const nombreGithubElement = document.getElementById('nombreGithub');
    const irVista2 = document.getElementById('irVista2');
    const formularioRegistro = document.getElementById('formularioRegistro');
    const vista1 = document.getElementById('vista1');
    const vista2 = document.getElementById('vista2');
    const tablaDatos = document.getElementById('tablaDatos').getElementsByTagName('tbody')[0];
    const selectPais = document.getElementById('pais');

    // Cargar lista de países en la Vista 2
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

    // Manejar la consulta de GitHub
    formularioConsulta.addEventListener('submit', (event) => {
        event.preventDefault();
        const usuarioGithub = document.getElementById('usuarioGithub').value;

        fetch(`https://api.github.com/users/${usuarioGithub}`)
            .then(response => response.json())
            .then(usuario => {
                if (usuario.name) {
                    nombreGithubElement.textContent = usuario.name;
                    resultadoConsulta.classList.remove('oculto');
                    vista1.classList.add('oculto');
                    vista2.classList.remove('oculto');
                } else {
                    alert('No se encontró el usuario en GitHub.');
                }
            })
            .catch(error => console.error('Error al consultar GitHub:', error));
    });

    // Manejar el envío de datos en la Vista 2
    formularioRegistro.addEventListener('submit', (event) => {
        event.preventDefault();

        const telefono = document.getElementById('telefono').value;
        const correo = document.getElementById('correo').value;
        const nombreGithub = document.getElementById('nombreGithub').textContent;
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

                // Aquí puedes agregar el código para enviar los datos a la API PHP
            })
            .catch(error => console.error('Error al consultar el dial code:', error));
    });

    // Manejar el cambio de vista
    irVista2.addEventListener('click', () => {
        vista1.classList.add('oculto');
        vista2.classList.remove('oculto');
    });
});
