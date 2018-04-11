var tabla;

//Funcion a ejecutar al inicio

function init() 
{
    mostrarform(false);
    listar();

    $("#formulario").on("submit", function(e){
        guardaryeditar(e);
    });

    $.post("../ajax/articulo.php?op=selectCategoria", function(r){
        $("#idcategoria").html(r);
        $("#idcategoria").selectpicker('refresh');
    });

    $("#imagenmuestra").hide();
}

//limpiar formularios
function limpiar()
{
    $("#idarticulo").val("");
    $("#codigo").val("");
    $("#nombre").val("");
    $("#descripcion").val("");
    $("#stock").val("");
    $("#imagenmuestra").attr("src","");
    $("#imagenactual").val("");
    $("#print").hide();
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
            url: '../ajax/articulo.php?op=listar',
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
        url: "../ajax/articulo.php?op=guardaryeditar",
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
function mostrar(idarticulo)
{
    $.post("../ajax/articulo.php?op=mostrar", {idarticulo: idarticulo}, function(data, status)
    {
        data = JSON.parse(data);
        mostrarform(true);

        $("#idcategoria").val(data.idcategoria);
        $("#idcategoria").selectpicker('refresh');
        $("#codigo").val(data.codigo);
        $("#nombre").val(data.nombre);
        $("#stock").val(data.stock);
        $("#descripcion").val(data.descripcion);
        $("#imagenmuestra").show();
        $("#imagenmuestra").attr("src", "../files/articulos/"+data.imagen);
        $("#imagenactual").val(data.imagen);
        $("#idarticulo").val(data.idarticulo);
        generarbarcode();
    });
}

//Desactivar la categoria
function desactivar(idarticulo)
{
    bootbox.confirm("¿Está seguro de desactivar el Artículo?", function(result) {
        if(result) 
        {
            $.post("../ajax/articulo.php?op=desactivar", {idarticulo: idarticulo}, function(e) {
                bootbox.alert(e);
                tabla.ajax.reload();
            });
        }
    });
}

//Activar la categoria
function activar(idarticulo)
{
    bootbox.confirm("¿Está seguro de activar el Artículo?", function(result) {
        if(result) 
        {
            $.post("../ajax/articulo.php?op=activar", {idarticulo: idarticulo}, function(e) {
                bootbox.alert(e);
                tabla.ajax.reload();
            });
        }
    });
}

function generarbarcode() {
    codigo= $("#codigo").val();
    JsBarcode("#barcode", codigo);
    $("#print").show();
}

function imprimir() {
    $("#print").printArea();
}

init();