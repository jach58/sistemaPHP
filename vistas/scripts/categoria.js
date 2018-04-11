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
    $("#idcategoria").val("");
    $("#nombre").val("");
    $("#descripcion").val("");
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
            url: '../ajax/categoria.php?op=listar',
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
        url: "../ajax/categoria.php?op=guardaryeditar",
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
function mostrar(idcategoria)
{
    $.post("../ajax/categoria.php?op=mostrar", {idcategoria: idcategoria}, function(data, status)
    {
        data = JSON.parse(data);
        mostrarform(true);

        $("#nombre").val(data.nombre);
        $("#descripcion").val(data.descripcion);
        $("#idcategoria").val(data.idcategoria);
    });
}

//Desactivar la categoria
function desactivar(idcategoria)
{
    bootbox.confirm("¿Está seguro de desactivar la Categoría?", function(result) {
        if(result) 
        {
            $.post("../ajax/categoria.php?op=desactivar", {idcategoria: idcategoria}, function(e) {
                bootbox.alert(e);
                tabla.ajax.reload();
            });
        }
    });
}

//Activar la categoria
function activar(idcategoria)
{
    bootbox.confirm("¿Está seguro de activar la Categoría?", function(result) {
        if(result) 
        {
            $.post("../ajax/categoria.php?op=activar", {idcategoria: idcategoria}, function(e) {
                bootbox.alert(e);
                tabla.ajax.reload();
            });
        }
    });
}

init();