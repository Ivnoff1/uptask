<div class="contenedor recuperar">
    
    <?php include_once __DIR__ . '/../templates/nombre-sitio.php'; ?>

    <div class="contenedor-xsm">
        <p class="descripcion-pagina">Recupera tu contraseña</p>
        <?php include_once __DIR__ . '/../templates/alertas.php'; ?>

        <form method="POST" action="/recuperar" class="form">

            <div class="campo">
                <label for="email">Correo electrónico</label>
                <input type="email" id="email" name="email" placeholder="Ingresa tu correo electrónico">
            </div>

            <input type="submit" class="boton" value="Enviar instrucciones">

        </form>

        <div class="acciones">
            <a href="/crear">¿Aún no tienes una cuenta? Crea una</a>
            <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
        </div>

    </div>
</div>