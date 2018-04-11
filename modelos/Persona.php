<?php

require "../config/conexion.php";

Class Persona
{
    //constructor
    public function __construct()
    {
    }

    //insertar registro de persona
    public function insertar($tipo_persona, $nombre, $tipo_documento, $num_documento, $direccion, $telefono, $email)
    {
        $sql = "INSERT INTO persona(tipo_persona, nombre, tipo_documento, num_documento, direccion, telefono, email) VALUES('$tipo_persona', '$nombre', '$tipo_documento', '$num_documento', '$direccion', '$telefono', '$email')";

        return ejecutarConsulta($sql);
    }

    //editar Persona
    public function editar($idpersona, $tipo_persona, $nombre, $tipo_documento, $num_documento, $direccion, $telefono, $email)
    {
        $sql = "UPDATE persona SET tipo_persona='$tipo_persona', nombre= '$nombre', tipo_documento= '$tipo_documento', num_documento= '$num_documento', direccion= '$direccion', telefono= '$telefono', email= '$email' WHERE idpersona='$idpersona'";

        return ejecutarConsulta($sql);
    }

    //Eliminar un registro de una persona
    public function eliminar($idpersona)
    {
        $sql = "DELETE FROM persona WHERE idpersona='$idpersona'";

        return ejecutarConsulta($sql);
    }

    //mostrar los datos de la persona a modificar
    public function mostrar($idpersona) {
        
        $sql = "SELECT * FROM persona WHERE idpersona = '$idpersona'";

        return ejecutarConsultaSimpleFila($sql);
    }

    //Mostrar todos los proveedores
    public function listarp()
    {
        $sql = "SELECT * FROM persona WHERE tipo_persona='Proveedor'";

        return ejecutarConsulta($sql);
    }

    //Mostrar todos los clientes
    public function listarc()
    {
        $sql = "SELECT * FROM persona WHERE tipo_persona='Cliente'";

        return ejecutarConsulta($sql);
    }


}

?>