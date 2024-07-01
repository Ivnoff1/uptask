(function() {

    getTask();
    let tareas = [];
    let filtradas = [];


    // Boton para mostrar el modal de agregar tarea
    const nuevaTareaBtn = document.querySelector('#add-task');
    nuevaTareaBtn.addEventListener('click', function() {
        mostrarformulario();
    });

    // Filtros de búsqueda
    const filtros = document.querySelectorAll('#filters input[type="radio');
    filtros.forEach( radio => {
        radio.addEventListener('input', filtrarTareas);
    } )

    function filtrarTareas(e) {
        const filtro = e.target.value;

        if(filtro !== '') {
            filtradas = tareas.filter(tarea => tarea.estado === filtro);
        } else {
            filtradas = [];
        }

        showTask();
    }

    async function getTask() {
        try {
            const id = obtenerProyecto();
            const url = `/api/tareas?id=${id}`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            
            tareas = resultado.tareas;
            showTask();

        } catch (error) {
            console.log(error);
        }
    }

    function showTask () {
        cleanTask();
        totalPendientes();
        totalCompletas();

        const arrayTareas = filtradas.length ? filtradas : tareas;

        if(arrayTareas.length === 0) {
            const tasksContainer = document.querySelector('#task-list');
            const textNoTask = document.createElement('LI');
            textNoTask.textContent = 'No hay tareas';
            textNoTask.classList.add('no-task');

            tasksContainer.appendChild(textNoTask);
            return;
        }

        const estados = {
            0: 'Pendiente',
            1: 'Completada'
        }

        arrayTareas.forEach(tarea => {
            const taskContainer = document.createElement('LI');
            taskContainer.dataset.tareaId = tarea.id;
            taskContainer.classList.add('task');

            const taskName = document.createElement('P');
            taskName.textContent = tarea.nombre;
            taskName.ondblclick = function() {
                mostrarformulario(editar = true, {...tarea});
            }

            const opcionesDiv = document.createElement('DIV');
            opcionesDiv.classList.add('opciones');

            // Botones
            const btnEstadoTarea = document.createElement('BUTTON');
            btnEstadoTarea.classList.add('estado-tarea');
            btnEstadoTarea.classList.add(`${estados[tarea.estado].toLowerCase()}`)
            btnEstadoTarea.textContent = estados[tarea.estado];
            btnEstadoTarea.dataset.estadoTarea = tarea.estado;
            btnEstadoTarea.ondblclick = function() {
                cmabiarEstadoTarea({...tarea});
            }

            const btnDeleteTask = document.createElement('BUTTON');
            btnDeleteTask.classList.add('task-delete');
            btnDeleteTask.dataset.idTarea = tarea.id;
            btnDeleteTask.textContent = 'Eliminar';
            btnDeleteTask.ondblclick = function() {
                eliminarTarea({...tarea});
            }

            opcionesDiv.appendChild(btnEstadoTarea);
            opcionesDiv.appendChild(btnDeleteTask);

            taskContainer.appendChild(taskName);
            taskContainer.appendChild(opcionesDiv);


            const taskList = document.querySelector('#task-list');
            taskList.appendChild(taskContainer);
        });
    }
    function totalPendientes() {
        const totalPendientes = tareas.filter(tarea => tarea.estado === "0");
        const pendientesRadio = document.querySelector('#pendientes');

        if(totalPendientes.length === 0) {
            pendientesRadio.disabled = true;
        } else {
            pendientesRadio.disabled = false;
        }   
    }
    function totalCompletas() {
        const totalCompletas = tareas.filter(tarea => tarea.estado === "1");
        const completasRadio = document.querySelector('#completadas');

        if(totalCompletas.length === 0) {
            completasRadio.disabled = true;
        } else {
            completasRadio.disabled = false;
        }   
    }

    function mostrarformulario(editar = false, tarea = {}) {
        console.log(tarea);
        const modal = document.createElement('DIV');
        modal.classList.add('modal');
        modal.innerHTML = `
            <form class="form new-task">
                <legend>${editar ? 'Editar tarea' : 'Agrega una nueva tarea'}</legend>
                <div class="campo">
                    <label>Tarea</label>
                    <input
                        type="text"
                        name="tarea"
                        placeholder="${tarea.nombre ? 'Edita la Tarea' : 'Agregar tarea'}"
                        id="task"
                        value="${tarea.nombre ? tarea.nombre : ''}"
                    />
                </div>
                <div class="opciones">
                    <input 
                        type="submit" 
                        class="submit-newtask" 
                        value="${tarea.nombre ? 'Guardar Cambios' : 'Añadir Tarea'} "
                        />
                    <button type="button" class="close-modal">Cancelar</button>
                </div>

            </form>
        `;
        setTimeout(() => {
            const form = document.querySelector('.form');
            form.classList.add('animar');
        }, 0);
                                                                                                                                                      
        modal.addEventListener('click', function(e) {
            e.preventDefault();
            if(e.target.classList.contains('close-modal')) {
                const form = document.querySelector('.form');
                form.classList.add('close');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
            
            if(e.target.classList.contains('submit-newtask')) {
                const task = document.querySelector('#task').value.trim();
                if(task === '') {
                    mostrarAlerta('* Este campo no puede ir vacio', 'error', document.querySelector('.form legend'));
                    return;
                }

                if(editar) {
                    tarea.nombre = task;
                    actualizarTarea(tarea)
                } else {
                    addTask(task);
                }
            }
        })


        document.querySelector('.dashboard').appendChild(modal);
    }

    function mostrarAlerta(mensaje, tipo, referencia) {
        const alertaPrevia = document.querySelector('.alerta');
        if(alertaPrevia) {
            alertaPrevia.remove();
        }

        const alerta = document.createElement('DIV');
        alerta.classList.add('alerta', tipo);
        alerta.textContent = mensaje;
        referencia.parentElement.insertBefore(alerta, referencia.nextElementSibling);

        setTimeout(() => {
            alerta.remove();
        }, 3000);

    }

    async function addTask(task) {
        const datos = new FormData();
        datos.append('nombre', task);
        datos.append('proyectoId', obtenerProyecto());



        try {
            const url = '/api/tarea';
            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            });

            const resultado = await respuesta.json();

            mostrarAlerta(resultado.mensaje, resultado.tipo, document.querySelector('.form legend'));

            if(resultado.tipo === 'exito') {
                const modal = document.querySelector('.modal');
                modal.remove();

                const tareaObj = {
                    id: String(resultado.id),
                    nombre: task,
                    estado: "0",
                    proyectoId: resultado.proyectoId
                }

                tareas = [...tareas, tareaObj];
                showTask();
            }

        } catch (error) {
            console.log(error);
        }
    }

    function cmabiarEstadoTarea(tarea) {
        const nuevoEstado = tarea.estado === "1" ? "0" : "1";
        tarea.estado = nuevoEstado;
        actualizarTarea(tarea);
    }

    async function actualizarTarea(tarea) {

        const {estado, id, nombre, proyectoId} = tarea;
        
        const datos = new FormData();
        datos.append('id', id);
        datos.append('nombre', nombre);
        datos.append('estado', estado);
        datos.append('proyectoId', obtenerProyecto());

        try {
            const url = '/api/tarea/actualizar';

            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            });
            const resultado = await respuesta.json();

            // console.log(resultado);

            if(resultado.respuesta.tipo === 'exito') {
            //    Swal.fire(
            //       resultado.respuesta.mensaje,
            //       resultado.respuesta.mensaje,
            //        'success'
            //    );

                const modal = document.querySelector('.modal');
                if(modal) {
                    modal.remove();
                }
                

                tareas = tareas.map(tareaMemoria => {
                    if(tareaMemoria.id === id) {
                        tareaMemoria.estado = estado;
                        tareaMemoria.nombre = nombre;
                    }
                    return tareaMemoria;
                });
                showTask();
            }
        } catch (error) {
            console.log(error);
        }
    }

    function confirmarEliminarTarea(tarea) {
        Swal.fire({
            title: '¿Eliminar Tarea?',
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarTarea(tarea);
            } 
        })
    }

    async function eliminarTarea(tarea) {

        const {estado, id, nombre} = tarea;
        
        const datos = new FormData();
        datos.append('id', id);
        datos.append('nombre', nombre);
        datos.append('estado', estado);
        datos.append('proyectoId', obtenerProyecto());

        try {
            const url = '/api/tarea/eliminar';
            const respuesta = await fetch(url, {
                method: 'POST',
                body: datos
            });

            const resultado = await respuesta.json();
            if(resultado.resultado) {
                // mostrarAlerta(
                //     resultado.mensaje, 
                //     resultado.tipo, 
                //     document.querySelector('.contenedor-nueva-tarea')
                // );

                //Swal.fire('Eliminado!', resultado.mensaje, 'success');

                tareas = tareas.filter( tareaMemoria => tareaMemoria.id !== tarea.id);
                showTask();
            }
            
        } catch (error) {
            
        }
    }

    function obtenerProyecto() {
        const proyectParams = new URLSearchParams(window.location.search);
        const proyect = Object.fromEntries(proyectParams.entries());
        return proyect.id;
    }

    function cleanTask() {
        const taskList = document.querySelector('#task-list');
        
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }

})();


