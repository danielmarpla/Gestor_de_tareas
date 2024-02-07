<?php
    require_once 'connect.php';
    $db = 'gestortareas';
    $conexion = conectar($db);

        $nombre=$_POST['nombre'];
        $descripcion=$_POST['descripcion'];
        //$clave_asignatura=1;
        
        $parametros= array(":nombre"=>$nombre,":descripcion"=>$descripcion);
        $sql = "INSERT INTO tareas (nombre, descripcion, fecha_creacion) VALUES (:nombre, :descripcion, NOW());";
    
        $pdo = $conexion->prepare($sql);
        $pdo->execute($parametros);
        

        echo "{ \"introducido\":\"si\"}";

?>