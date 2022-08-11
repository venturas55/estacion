
<?php 
include_once "funciones.php";

$db = conectaDb();

$datosRecibidos = json_decode(file_get_contents("php://input"));

$datos = array();

if($datosRecibidos->action == 'fetchall'){
    $sql = "select fecha,nudos from viento order by fecha desc limit 500";
    $result = $db->prepare($sql);
    $result->execute(); 

    while($row = $result->fetch(PDO::FETCH_NUM)){
         $datos[]=$row;
    }
    echo json_encode($datos);

}

?>