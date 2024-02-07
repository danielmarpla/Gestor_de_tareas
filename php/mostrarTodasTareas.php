<?php
    require_once 'connect.php';
    $db = 'gestortareas';

    $conexion = conectar($db);
    $sql = "SELECT * FROM tareas;";

    $pdo = $conexion->prepare($sql);
    $pdo->execute();
    

    $datos = $pdo->fetchAll(PDO::FETCH_ASSOC);
   echo json_encode($datos);
    

?>
