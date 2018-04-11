var tabla;

//Funcion a ejecutar al inicio

function init() 
{
    mostrarform(false);
    listar();

    $("#formulario").on("submit", function(e){
        guardaryeditar(e);
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
    $("#idpersona").val("");
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
            url: '../ajax/persona.php?op=listarc',
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
        url: "../ajax/persona.php?op=guardaryeditar",
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
function mostrar(idpersona)
{
    $.post("../ajax/persona.php?op=mostrar", {idpersona: idpersona}, function(data, status)
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
        $("#idpersona").val(data.idpersona);
    });
}

//Eliminar la categoria
function eliminar(idpersona)
{
    bootbox.confirm("¿Está seguro de eliminar el Cliente?", function(result) {
        if(result) 
        {
            $.post("../ajax/persona.php?op=eliminar", {idpersona: idpersona}, function(e) {
                bootbox.alert(e);
                tabla.ajax.reload();
            });
        }
    });
}

init();