<div class="sidebar-mobile">
    <div class="close-item">
        <i class="fa-solid fa-circle-chevron-right close" id="close-menu"></i>
    </div>
    <nav class="sidebar-nav">
        <a class="<?php echo ($titulo === 'Mis proyectos') ? 'activo' : ''; ?>" href="/dashboard"><i class="fa-solid fa-bars-progress"></i> Proyectos</a>
        <a class="<?php echo ($titulo === 'Crear proyecto') ? 'activo' : ''; ?>" href="/crear-proyecto"><i class="fa-solid fa-plus"></i> Crear proyecto</a>
        <a class="<?php echo ($titulo === 'Mi perfil') ? 'activo' : ''; ?>" href="/perfil"><i class="fa-solid fa-user"></i> Perfil</a>
        <a href="/logout" class="logout"><i class="fa-solid fa-arrow-left"></i> Cerrar sesión</a>
    </nav>

</div>

<aside class="sidebar">
    <h2>UpTask</h2>
    <nav class="sidebar-nav">
        <a class="<?php echo ($titulo === 'Mis proyectos') ? 'activo' : ''; ?>" href="/dashboard"><i class="fa-solid fa-bars-progress"></i> Proyectos</a>
        <a class="<?php echo ($titulo === 'Crear proyecto') ? 'activo' : ''; ?>" href="/crear-proyecto"><i class="fa-solid fa-plus"></i> Crear proyecto</a>
        <a class="<?php echo ($titulo === 'Mi perfil') ? 'activo' : ''; ?>" href="/perfil"><i class="fa-solid fa-user"></i> Perfil</a>
        
    </nav>

    <div class="sidebar-nav">
        <a href="/logout" class="logout"><i class="fa-solid fa-arrow-left"></i> Cerrar sesión</a>
    </div>
</aside>