<?php
    require_once 'connect.php';
    $db = 'gestortareas';
    $conexion = conectar($db);

        $texto=$_POST['texto'];
        

        $parametros= array(":texto"=>('%'.$texto.'%'));
        $pdo = $conexion->prepare('SELECT * FROM tareas WHERE nombre LIKE  :texto;');
        $pdo->execute($parametros);
        

        $datos = $pdo->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($datos);

?>