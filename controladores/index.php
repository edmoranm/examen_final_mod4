<?php
include '../models/conexion.php';
$conexion = new Conexion();
$nombre_github = $_POST['nombre_github'];
$telefono = $_POST['telefono'];
$correo = $_POST['correo'];

$sql = "INSERT INTO usuarios (nombre_github, telefono, correo) VALUES (:nombre_github, :telefono, :correo)";

$resultado = $conexion->ejecutar($sql, [
    ':nombre_github' => $nombre_github,
    ':telefono' => $telefono,
    ':correo' => $correo
]);

if ($resultado['resultado']) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>
