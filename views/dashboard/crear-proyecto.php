<?php include_once __DIR__ . '/header-dashboard.php' ?>
<div class="contenedor-short">
    
    <form class="form" method="POST" action="/crear-proyecto">
        <?php include_once __DIR__ . '/../templates/alertas.php'; ?>
        <?php include_once __DIR__ . '/form-proyecto.php' ?>
        <input type="submit" value="Crear proyecto">
    </form>
</div>




<?php include_once __DIR__ . '/footer-dashboard.php' ?>