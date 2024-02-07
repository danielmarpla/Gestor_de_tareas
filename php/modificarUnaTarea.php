<?php
    require_once 'connect.php';
    $db = 'gestortareas';
    $conexion = conectar($db);

        $nombre=$_POST['nombre'];
        $descripcion=$_POST['descripcion'];
        $id=$_POST['id'];

        $parametros= array(":id"=>$id, ":nombre"=>$nombre, ":descripcion"=>$descripcion);
        $pdo = $conexion->prepare("UPDATE tareas SET nombre=:nombre, descripcion=:descripcion WHERE id = :id;");
        $pdo->execute($parametros);
        
        

        echo "{ \"modificado\":\"si\"}";

?>