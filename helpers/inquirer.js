require('colors');
const inquirer = require('inquirer');


const inquirerMenu = async () => {

  const pregunta = [
    {
      name: 'option',
      type: 'list',
      message: '¿Qué desea hacer?',
      choices: [
        {
          name: `${ '1.'.green } Crear tarea`,
          value: '1'
        },
        {
          name: `${ '2.'.green } Listar tareas`,
          value: '2'
        },
        {
          name: `${ '3.'.green } Listar tareas completadas`,
          value: '3'
        },
        {
          name: `${ '4.'.green } Listar tareas pendientes`,
          value: '4'
        },
        {
          name: `${ '5.'.green } Completar tarea(s)`,
          value: '5'
        },
        {
          name: `${ '6.'.green } Borrar tarea`,
          value: '6'
        },
        {
          name: `${ '0.'.green } Salir`,
          value: '0'
        }
      ]
    }
  ];

  console.clear();
  console.log('========================'.green);
  console.log(' Seleccione una opción'.white);
  console.log('========================\n'.green);

  const { option } = await inquirer.prompt(pregunta);

  return option;
}

const pausa = async () => {
  const pregunta = [
    {
      name: 'pause',
      type: 'input',
      message: `Presione ${ 'ENTER'.green } para continuar\n`
    }
  ]
  console.log('\n');
  await inquirer.prompt(pregunta);
}

const leerInput = async (message) => {

  const pregunta = [
    {
      name: 'desc',
      type: 'input',
      message,
      validate( value ){
        if(value.trim().length == 0){
          return 'Por favor ingrese un valor';
        }
        return true;
      }
    }
  ]

  const { desc } = await inquirer.prompt(pregunta);

  return desc;
}

const listadoTareasBorrar = async (tareas = []) => {

  const choices = tareas.map( (tarea,i) => {
    const index = ((++i).toString()+'.').green;
    return {
      value: tarea.id,
      name: `${index} ${tarea.desc}`
    }
  });

  choices.unshift({name: '0.'.green + ' Cancelar', value: '0'});

  const pregunta = [
    {
      name: 'idBorrar',
      type: 'list',
      message: 'Seleccione la tarea a eliminar',
      choices
    }
  ];

  const { idBorrar } = await inquirer.prompt(pregunta);

  return idBorrar;
}

const mostrarListadoCheckList = async (tareas = []) => {

  const choices = tareas.map( (tarea,i) => {
    const index = ((++i).toString()+'.').green;

    return {
      value: tarea.id,
      name: `${index} ${tarea.desc}`,
      checked: ( tarea.completadoEn ) ? true : false
    }
  });

  const pregunta = [
    {
      name: 'idsCompletar',
      type: 'checkbox',
      message: 'Seleccione la tarea a completar',
      choices
    }
  ];

  const { idsCompletar } = await inquirer.prompt(pregunta);

  return idsCompletar;
}

const confirmar = async(message) => {
  const pregunta = [
    {
      name: 'ok',
      type: 'confirm',
      message
    }
  ];

  const { ok } = await inquirer.prompt(pregunta);

  return ok;
}


module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  mostrarListadoCheckList,
  confirmar
}
