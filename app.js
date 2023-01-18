require('colors');
const {inquirerMenu,
       pausa,
       leerInput,
       listadoTareasBorrar,
       mostrarListadoCheckList,
       confirmar
} = require('./helpers/inquirer');
const {guardarDB, leerDB} = require('./helpers/guardarArchivo');
const Tareas = require('./models/tareas');


const main = async () => {

  let opt = '';
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if( tareasDB ){
     // Asigno tareas
     tareas.cargarTareasFromArray(tareasDB)
  }

  do {
      // Imprimo menu
      opt = await inquirerMenu();

      switch (opt) {
        case '1': // Crear tarea
          const desc = await leerInput('Descripción: ');
          tareas.crearTarea(desc);
        break;

        case '2': // Listar tareas
          console.log( tareas.listadoCompleto());
        break;

        case '3': // Listar tareas completadas
          console.log(tareas.listarPendientesCompletadas(true));
        break;

        case '4': // Listar tareas pendientes
          console.log(tareas.listarPendientesCompletadas(false));
        break;

        case '5': // Completar tarea(s)
          const idsCompletar = await mostrarListadoCheckList(tareas.listadoArray);
          tareas.toggleCompletadas(idsCompletar);
        break;

        case '6': // Borrar tarea
          const id = await listadoTareasBorrar( tareas.listadoArray);
          if( id !== '0' ){
            const ok = await confirmar('¿Está seguro?');
            if(ok){
              tareas.borrarTarea(id);
              console.log('\nTarea eliminada con éxito!'.green);
            }
          }
        break;
      }
      // Guardo las tareas en un archivo json
      guardarDB( tareas.listadoArray );

      await pausa();

  }while (opt !== '0');

}

main();
