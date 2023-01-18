require('colors');
const Tarea = require('./tarea');

class Tareas {
  _listado = {};

  get listadoArray(){
    const listado = [];
    Object.keys(this._listado).forEach( (key) => {
      listado.push(this._listado[key]);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  cargarTareasFromArray( tareas = [] ){
    for (const tarea of tareas) {
      this._listado[tarea.id] = tarea;
    }
  }

  crearTarea( desc = '' ){
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto(){
    // 1.Ejemplo :: Completada | Pendiente
    return this.listadoTareas(this.listadoArray);
  }

  listarPendientesCompletadas( completadas = true){
    const tareas = this.listadoArray;
    if(completadas){
      const tareasCompletadas = tareas.filter(t => t.completadoEn);
      return this.listadoTareas(tareasCompletadas);
    }else{
      const tareasPendientes = tareas.filter(t => t.completadoEn == null);
      return this.listadoTareas(tareasPendientes);
    }
  }

  listadoTareas(tareas){
    let salida = '';
    console.log('');
    for (let [i, tarea] of tareas.entries()) {
      const index = ((++i).toString()+'.').green;
      const { desc, completadoEn} = tarea;
      const estado = (completadoEn)
                        ? completadoEn.green
                        : 'Pendiente'.red;
      salida += `${index} ${desc} :: ${estado}\n`;
    }
    return salida;
  }

  borrarTarea(id = ''){
    if (this._listado[id]){
      delete this._listado[id];
    }
  }

  toggleCompletadas(ids = []){

    for (let id of ids) {
      const tarea = this._listado[id];
      if( !tarea.completadoEn ){
        tarea.completadoEn = new Date().toISOString();
      }
    }

    for (let tarea of this.listadoArray) {

      if(!ids.includes(tarea.id)){
        this._listado[tarea.id].completadoEn = null;
      }

    }
  }

}


module.exports = Tareas
