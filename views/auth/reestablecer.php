<div class="contenedor recuperar">
    
    <?php include_once __DIR__ . '/../templates/nombre-sitio.php'; ?>

    <div class="contenedor-xsm">

        <p class="descripcion-pagina">Crea una nueva contraseña</p>
        <?php include_once __DIR__ . '/../templates/alertas.php'; ?>

        <form method="POST" class="form">

            <div class="campo">
                <label for="password">Contraseña</label>
                <input type="password" id="password" name="password" placeholder="Ingresa tu contraseña">
            </div>

            <input type="submit" class="boton" value="Cambiar contraseña">

        </form>

        <div class="acciones">
            <a href="/crear">¿Aún no tienes una cuenta? Crea una</a>
            <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
        </div>

    </div>
</div>