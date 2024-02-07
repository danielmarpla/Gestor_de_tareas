<?php
    require_once 'connect.php';
    $db = 'gestortareas';
    $conexion = conectar($db);

        $progreso=$_POST['progreso'];

        
        $parametros= array(":progreso"=>$progreso);
        $pdo = $conexion->prepare("SELECT * FROM tareas WHERE progreso =:progreso;");
        
        $pdo->execute($parametros);
        

        $datos = $pdo->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($datos);

?>