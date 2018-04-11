var tabla;

//Funcion a ejecutar al inicio

function init() 
{
    mostrarform(false);
    listar();

    $("#formulario").on("submit", function(e){
        guardaryeditar(e);
    });


    $("#imagenmuestra").hide();

    //Mostrar permisos
    $.post("../ajax/usuario.php?op=permisos&id=", function(r){
        $("#permisos").html(r);
    });
}

//limpiar formularios
function limpiar()
{
    $("#nombre").val("");
    $("#num_documento").val("");
    $("#direccion").val("");
    $("#telefono").val("");
    $("#email").val("");
    $("#cargo").val("");
    $("#login").val("");
    $("#clave").val("");
    $("#imagenmuestra").attr("src","");
    $("#imagenactual").val("");
    $("#idusuario").val("");

}

//Mostrar formulario
function mostrarform(flag)
{
    limpiar();
    if(flag) {
        $("#listadoregistros").hide();
        $("#formularioregistros").show();
        $("#btnGuardar").prop("disabled", false);
        $("#btnagregar").hide();
    }else {
        $("#listadoregistros").show();
        $("#formularioregistros").hide();
        $("#btnagregar").show();
    }
}

//Cancelar formulario

function cancelarform() 
{
    limpiar();
    mostrarform(false);
}

//Listar registros
function listar()
{
    tabla = $("#tbllistado").dataTable({
        "aProcessing": true, //Activamos el procesamiento del datatables
        "aServerSide": true, //Paginacion y filtrado por el server
        dom: 'Bfrtip', //Elementos del control de la tabla
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdf'
        ],
        "ajax": {
            url: '../ajax/usuario.php?op=listar',
            type: "get",
            dataType: "json",
            error: function(e) {
                console.log(e);
            }
        },
        "bDestroy": true,
        "iDisplayLength": 5, //Paginacion
        "order": [[0, "desc"]] //columna orden
    }).DataTable();
}

function guardaryeditar(e)
{
    e.preventDefault();
    $("#btnGuardar").prop("disabled", true);
    var formData = new FormData($("#formulario")[0]);

    $.ajax({
        url: "../ajax/usuario.php?op=guardaryeditar",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(datos)
        {
            bootbox.alert(datos);
            mostrarform(false);
            tabla.ajax.reload();
        }
    });
    limpiar();
}

//Mostrar registro en el formulario editar
function mostrar(idusuario)
{
    $.post("../ajax/usuario.php?op=mostrar", {idusuario: idusuario}, function(data, status)
    {
        data = JSON.parse(data);
        mostrarform(true);

        $("#nombre").val(data.nombre);
        $("#tipo_documento").val(data.tipo_documento);
        $("#tipo_documento").selectpicker('refresh');
        $("#num_documento").val(data.num_documento);
        $("#direccion").val(data.direccion);
        $("#telefono").val(data.telefono);
        $("#email").val(data.email);
        $("#cargo").val(data.cargo);
        $("#login").val(data.login);
        $("#clave").val(data.clave);
        $("#imagenmuestra").show();
        $("#imagenmuestra").attr("src", "../files/usuarios/"+data.imagen);
        $("#imagenactual").val(data.imagen);
        $("#idusuario").val(data.idusuario);
    });

    $.post('../ajax/usuario.php?op=permisos&id='+idusuario, function(r){
        $("#permisos").html(r);
    });
}

//Desactivar usuario
function desactivar(idusuario)
{
    bootbox.confirm("¿Está seguro de desactivar el Usuario?", function(result) {
        if(result) 
        {
            $.post("../ajax/usuario.php?op=desactivar", {idusuario: idusuario}, function(e) {
                bootbox.alert(e);
                tabla.ajax.reload();
            });
        }
    });
}

//Activar usuario
function activar(idusuario)
{
    bootbox.confirm("¿Está seguro de activar el Usuario?", function(result) {
        if(result) 
        {
            $.post("../ajax/usuario.php?op=activar", {idusuario: idusuario}, function(e) {
                bootbox.alert(e);
                tabla.ajax.reload();
            });
        }
    });
}

init();