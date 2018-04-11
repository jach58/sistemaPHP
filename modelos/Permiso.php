<?php

require "../config/conexion.php";

Class Permiso
{
    //constructor
    public function __construct()
    {
    }

    //Mostrar todos los permisos
    public function listar()
    {
        $sql = "SELECT * FROM permiso";

        return ejecutarConsulta($sql);
    }

}

?>