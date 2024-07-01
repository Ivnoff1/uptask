<div class="contenedor crear">

    <?php include_once __DIR__ . '/../templates/nombre-sitio.php'; ?>

    <div class="contenedor-xsm">

        <p class="descripcion-pagina">Crea una cuenta en UpTask</p>

        <?php include_once __DIR__ . '/../templates/alertas.php'; ?>

        <form method="POST" action="/crear" class="form">

            <div class="campo">
                <label for="name">Nombre</label>
                <input type="text" id="name" name="nombre" value="<?php echo $usuario->nombre;?>" placeholder="Ingresa tu nombre">
            </div>

            <div class="campo">
                <label for="email">Correo electrónico</label>
                <input type="email" id="email" name="email" value="<?php echo $usuario->email; ?>" placeholder="Ingresa tu correo electrónico">
            </div>
            <div class="campo">
                <label for="password">Contraseña</label>
                <input type="password" id="password" name="password" placeholder="Ingresa tu contraseña">
            </div>
            <div class="campo">
                <label for="password2">Repite tu contraseña</label>
                <input type="password" id="password2" name="password2"  placeholder="Repite tu contraseña">
            </div>

            <input type="submit" class="boton" value="Crear Cuenta">

        </form>

        <div class="acciones">
            <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
            <a href="/recuperar">¿Olvidaste tu contraseña?</a>
        </div>

    </div>
</div>