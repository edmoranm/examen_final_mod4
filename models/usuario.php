<?php
require_once 'conexion.php';

class Usuario extends Conexion
{
    public $id;
    public $nombre_github;
    public $telefono;
    public $correo;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre_github = $args['nombre_github'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->correo = $args['correo'] ?? '';
    }

    public function guardar()
    {
        // Consulta SQL con parámetros
        $sql = "INSERT INTO usuarios (nombre_github, telefono, correo) VALUES (:nombre_github, :telefono, :correo)";

        // Preparar y ejecutar la consulta
        $conexion = self::getConexion();
        $sentencia = $conexion->prepare($sql);
        $resultado = $sentencia->execute([
            ':nombre_github' => $this->nombre_github,
            ':telefono' => $this->telefono,
            ':correo' => $this->correo
        ]);

        return $resultado;
    }

    public function obtenerTodos()
    {
        // Consulta SQL para obtener todos los usuarios
        $sql = "SELECT * FROM usuarios";

        // Preparar y ejecutar la consulta
        $conexion = self::getConexion();
        $sentencia = $conexion->prepare($sql);
        $sentencia->execute();

        // Obtener y retornar los resultados
        return $sentencia->fetchAll(PDO::FETCH_ASSOC);
    }
}
