<?php
  function conectaDb()
  {
    $host = "localhost"; /* Host name 152.228.133.198 */
    $user = "venturas"; /* User */
    $password = "weR65hS"; /* Password */
    $dbname = "estacion"; /* Database name */
      //uso de las excepciones en php try y catch
      try {
        $dsn = "mysql:host=".$host.";dbname=".$dbname;
        $db = new PDO($dsn, $user, $password);
        $db->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, TRUE);
        return ($db);
      } catch (PDOExcepton $e) {
        print "<p>Error: No puede conectarse con la base de datos.</p>\n";
        print "<p>Error: " . $e->getMessage() . "</p>\n";
        exit();
      }
  }

  function dilo(){
    echo "hola";
  }

?>