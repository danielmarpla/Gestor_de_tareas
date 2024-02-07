<?php
    require_once 'connect.php';
    $db = 'gestortareas';
    $conexion = conectar($db);

        $id=$_POST['id'];


        $parametros= array(":id"=>$id);
        $pdo = $conexion->prepare("DELETE FROM tareas WHERE id=:id");
        $pdo->execute($parametros);
        

        echo "{ \"borrado\":\"si\"}";

?>