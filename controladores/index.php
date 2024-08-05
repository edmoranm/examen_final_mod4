<?php

require '../../models/usuarios.php';
header('Content-Type: application/json; charset=UTF-8');

$metodo = $_SERVER['REQUEST_METHOD'];
$tipo = $_REQUEST['tipo'];

try {
    switch ($metodo) {
        case 'POST':
            $usuario = new Usuario($_POST);
            switch ($tipo) {
                case '1':
                    $ejecucion = $usuario->guardar();
                    $mensaje = "Guardado correctamente";
                    break;

                default:
                    http_response_code(400);
                    echo json_encode([
                        "mensaje" => "Tipo de operación no soportado",
                        "codigo" => 2,
                    ]);
                    exit;
            }
            http_response_code(200);
            echo json_encode([
                "mensaje" => $mensaje,
                "codigo" => 1,
            ]);
            break;

        case 'GET':
            $usuario = new Usuario();
            $usuarios = $usuario->obtenerTodos();
            http_response_code(200);
            echo json_encode($usuarios);
            break;

        default:
            http_response_code(405);
            echo json_encode([
                "mensaje" => "Método no permitido",
                "codigo" => 9,
            ]);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "detalle" => $e->getMessage(),
        "mensaje" => "Error de ejecución",
        "codigo" => 0,
    ]);
}

exit;
