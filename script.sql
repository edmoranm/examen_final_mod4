create database Api_paises

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre_github VARCHAR(255),
    telefono VARCHAR(50),
    correo VARCHAR(255)
);

select * from usuarios