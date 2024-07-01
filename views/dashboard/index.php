
<?php include_once __DIR__ . '/header-dashboard.php' ?>
    <?php if(count($proyectos) === 0) { ?>
        <p class="null-proyect">No hay proyectos <a href="/crear-proyecto">Crea uno</a></p>
    <?php  } else { ?>
        <ul class="proyectos-li">
            <?php foreach($proyectos as $proyecto) { ?>
                <a href="/proyecto?id=<?php echo $proyecto->url; ?>">
                    <li class="proyecto"> 
                        <?php echo $proyecto->proyecto; ?>
                    </li>
                </a>
            <?php } ?>
        </ul>
    <?php } ?>
<?php include_once __DIR__ . '/footer-dashboard.php' ?>
