$(document).ready(function(){
    //mostramos las tareas cuando carga la pagina
    mostrarTareas();

    //boton de guardar tarea
    $("#id_botonGuardar").click(function(){
        if($("#id_nombre").val()!="" && $("#id_descripcion").val()!=""){
            guardarTarea();
            $("#id_nombre").val("");
            $("#id_descripcion").val("");
        }

    })

    //boton modificar tarea
    $('#id_botonModificar').click(modificarTarea);

    //botones de eliminar y modificar. Radio para cambiar estado
    $('table').click((e)=>{
        
        //borrar una tarea
        idTarea=$(e.target).attr('id_borrar');
        if($(e.target).attr('id_borrar')){
            console.log(idTarea)
            $.ajax({
                type:'POST',
                url:'./php/borrarTarea.php',
                asyc:true,
                data:{id: idTarea,nocache: Math.random()},
                success:function(data){
                    if(data.borrado=='si'){
                        console.log('borrado');
                    }
                    
                    $('#id_tbody').empty();
                    mostrarTareas();
                },
                error: function(){
                    console.log('error al borrar');
                }
                  
                
            });
        }
        //modificar una tarea
        if($(e.target).attr('id_modificar')){
            $('#id_leyenda').text('Modificar una tarea');
            idTarea=$(e.target).attr('id_modificar');
            
            //valores iniciales
            nombre=$('td[id_nombreT="' + idTarea + '"]').text();
            descripcion=$('td[id_descT="' + idTarea + '"]').text();

            //pasamos los valores al formulario
            $('#id_nombre').val(nombre);
            $('#id_descripcion').val(descripcion);

            $('#id_botonGuardar').css('display', 'none');
            $('#id_botonModificar').attr('id_tarea', idTarea).css('display', 'block');


        }
        //cambiar proceso de la tarea
        if ($('input[type="radio"]')) {
            $('input[type="radio"]').change(function(){
                var valorSeleccionado = $(this).val();
                id=$(this).attr('id_tarea');

                $.ajax({
                    type:'POST',
                    url: './php/modificarEstadoTarea.php',
                    data:{progreso: valorSeleccionado,id:id, nocache:Math.random()},
                    dataType:'json',
                    success: function (data) {
            
                        $('#id_tbody').empty();
                        mostrarTareas();
                    },
                    error: function(){
                        console.log('error al cargar la tabla');
                    }
            
                })
                
            })
        }

    });

    //buscar en el titulo de las tareas
    $('#id_botonBuscar').click(mostrarTareasBuscar)

    //mostrar tareas segun prgreso
    $('#id_mostrarTodas').click(function(){
        $('#id_tbody').empty();
        mostrarTareas();
    });
    $('#id_sinHacer').click(function(){
        $('#id_tbody').empty();
        mostrarSegunProgreso(0)
    });
    $('#id_enProgreso').click(function(){
        $('#id_tbody').empty();
        mostrarSegunProgreso(1)
    });
    $('#id_hechas').click(function(){
        $('#id_tbody').empty();
        mostrarSegunProgreso(2)
    });


    
})

function mostrarTareas() {

    $.ajax({
        type:'POST',
        url: './php/mostrarTodasTareas.php',
        data:{nocache:Math.random()},
        dataType:'json',
        success: function (data) {
            
            $(data).each(function(){
                
                pintarUnaFila(this);
            })
        },
        error: function(){
            console.log('error al cargar la tabla');
        }

    })
    
}

function mostrarTareasBuscar() {
    texto=$('#id_buscar').val();

    $.ajax({
        type:'POST',
        url: './php/mostrarTareasBuscadas.php',
        data:{texto: texto, nocache:Math.random()},
        dataType:'json',
        success: function (data) {

            $('#id_tbody').empty();
            $(data).each(function(){
                pintarUnaFila(this);
            })
        },
        error: function(){
            console.log('error al cargar la tabla');
        }

    })
}


function modificarTarea() {
    nuevoNombre=$('#id_nombre').val();
    nuevaDesc=$('#id_descripcion').val();
    idTarea= $('#id_botonModificar').attr('id_tarea');
    console.log(nuevoNombre);
    console.log(nuevaDesc);
    console.log(idTarea);
    $.ajax({
        type:'POST',
        url:'./php/modificarUnaTarea.php',
        asyc:true,
        data:{id: idTarea, nombre: nuevoNombre,descripcion: nuevaDesc, nocache: Math.random()},
        success:function(data){
            if(data.modificado=='si'){
                console.log('modificado');
            }
            
            $('#id_tbody').empty();
            mostrarTareas();
        },
        error: function(){
            console.log('error al borrar');
        }
          
        
    });

    $('#id_botonGuardar').css('display', 'block');
    $('#id_botonModificar').css('display', 'none');
    $('#id_leyenda').text('Crear una tarea');
    $('#id_nombre').val("");
    $('#id_descripcion').val("");

}

function guardarTarea(){
    let nombre=$("#id_nombre").val();
    let descripcion=$("#id_descripcion").val();
    console.log(nombre);
    console.log(descripcion);
    $.ajax({
        type:'POST',
        url: './php/insertTarea.php',
        data:{nocache:Math.random(),
        nombre: nombre,
        descripcion: descripcion },
        success: function(data){
            $('#id_tbody').empty();
            mostrarTareas();

        },       
        error: function(){
            console.log('error al cargar la tabla');
        }
    });
}



function mostrarSegunProgreso(progreso) {
    $.ajax({
        type:'POST',
        url: './php/mostrarTareasEnProgreso.php',
        data:{progreso:progreso,nocache:Math.random()},
        dataType:'json',
        success: function(data){
            $('#id_tbody').empty();
            $(data).each(function(){
                pintarUnaFila(this);
            })

        },       
        error: function(){
            console.log('error al cargar la tabla');
        }
    });
}



function pintarUnaFila(data) {
    fila = $('<tr>').appendTo('#id_tbody');
        
    $('<td></td>').text(data.id).appendTo(fila);
    $('<td>').text(data.nombre).attr('id_nombreT',data.id).appendTo(fila);
    $('<td>').text(data.descripcion).attr('id_descT',data.id).appendTo(fila);
    
    
    //columna de progreso--> radio para cambiar el progreso


    celdaRadio=$('<td>').text("").appendTo(fila);
    formu=$('<form>').appendTo(celdaRadio);


    switch (data.progreso) {
        case '0':
            fila.attr('class', 'claseSinHacer');
            $('<label for="id_0">').text('Sin hacer').appendTo(formu);
            rad1=$('<input type="radio" id_tarea="'+data.id+'" name="progreso" checked>').val('0').text("sin hacer").appendTo(formu);
            
                
            $('<label for="id_1">').text('En progreso').appendTo(formu);
            rad2=$('<input type="radio" id_tarea="'+data.id+'" name="progreso">').val('1').appendTo(formu);
            
               
            $('<label for="id_2">').text('Hecho').appendTo(formu);
            rad3=$('<input type="radio" id_tarea="'+data.id+'" name="progreso">').val('2').appendTo(formu);
            
            break;

            case '1':
                fila.attr('class', 'claseEnProceso');
                $('<label for="id_0">').text('Sin hacer').appendTo(formu);
                $('<input type="radio" id_tarea="'+data.id+'" name="progreso">').val('0').text("sin hacer").appendTo(formu);
                
                
                $('<label for="id_1">').text('En progreso').appendTo(formu);
                $('<input type="radio" id_tarea="'+data.id+'" name="progreso" checked>').val('1').appendTo(formu);
                
                   
                $('<label for="id_2">').text('Hecho').appendTo(formu);
                $('<input type="radio" id_tarea="'+data.id+'" name="progreso">').val('2').appendTo(formu);
                
                break;


            case '2':
                fila.attr('class', 'claseHecho');
                $('<label for="id_0">').text('Sin hacer').appendTo(formu);
                $('<input type="radio" id_tarea="'+data.id+'" name="progreso">').val('0').text("sin hacer").appendTo(formu);
                
                        
                $('<label for="id_1">').text('En progreso').appendTo(formu);
                $('<input type="radio" id_tarea="'+data.id+'" name="progreso">').val('1').appendTo(formu);
                
                       
                $('<label for="id_2">').text('Hecho').appendTo(formu);
                $('<input type="radio" id_tarea="'+data.id+'" name="progreso" checked>').val('2').appendTo(formu);
                
                break;

            default:
                break;
    }

        celdaBotones=$('<td>').text("").appendTo(fila);
        $('<button class="botonesModificar">').text('Modificar').attr('id_modificar',data.id).appendTo(celdaBotones);
        $('<button class="botonesEliminar">').text('Eliminar').attr('id_borrar',data.id).appendTo(celdaBotones);

}