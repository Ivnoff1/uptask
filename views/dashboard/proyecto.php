<?php include_once __DIR__ . '/header-dashboard.php' ?>


    <div class="proyecto-contenido">
        <div class="newtask-container">
            <button
            type="button"
            class="add-task"
            id="add-task"
            ><i class="fa-solid fa-plus"></i> Nueva tarea </button>
        </div>
        <div id="filters" class="filters">
            <div class="filters-inputs">
                <h2>Filtros:</h2>
                <div class="campo">
                    <label for="todas">Todas</label>
                    <input type="radio" id="todas" name="filtro" value="" checked>
                </div>
                <div class="campo">
                    <label for="completadas">Completadas</label>
                    <input type="radio" id="completadas" name="filtro" value="1">
                </div>
                <div class="campo">
                    <label for="pendientes">Pendientes</label>
                    <input type="radio" id="pendientes" name="filtro" value="0">
                </div>
                
            </div>
        </div>

        <ul id="task-list" class="task-list"></ul>
    </div>

<?php include_once __DIR__ . '/footer-dashboard.php' ?>

<?php
$script .= '
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="build/js/task.js"></script>
';
?>