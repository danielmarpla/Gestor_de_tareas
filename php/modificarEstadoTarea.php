<?php
    require_once 'connect.php';
    $db = 'gestortareas';
    $conexion = conectar($db);

        $progreso=$_POST['progreso'];
        $id=$_POST['id'];
        
        
        $parametros= array(":progreso"=>($progreso),":id"=>$id);
        $pdo = $conexion->prepare("UPDATE tareas SET progreso=:progreso WHERE id = :id;");
        $pdo->execute($parametros);
        
        

        echo "{ \"modificado\":\"si\"}";

?>