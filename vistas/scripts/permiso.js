var tabla;

//Funcion a ejecutar al inicio

function init() 
{
    mostrarform(false);
    listar();

}


//Mostrar formulario
function mostrarform(flag)
{
    //limpiar();
    if(flag) {
        $("#listadoregistros").hide();
        $("#formularioregistros").show();
        $("#btnGuardar").prop("disabled", false);
        $("#btnagregar").hide();
    }else {
        $("#listadoregistros").show();
        $("#formularioregistros").hide();
        $("#btnagregar").hide();
    }
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
            url: '../ajax/permiso.php?op=listar',
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

init();