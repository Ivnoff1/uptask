<?php 

namespace Model;

class Usuario extends ActiveRecord {
    protected static $tabla = 'usuarios';
    protected static $columnasDB = ['id', 'nombre', 'email', 'password', 'token', 'confirmado'];

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->password = $args['password'] ?? '';
        $this->password2 = $args['password2'] ?? '';
        $this->token = $args['token'] ?? '';
        $this->confirmado = $args['confirmado'] ?? 0;

    }

    public function validar() {
        if(!$this->nombre) {
            self::$alertas['error'] [] = '* El nombre es obligatorio';
        }
        if(!$this->email) {
            self::$alertas['error'] [] = '* El correo electrónico es obligatorio';
        }
        if(!$this->password) {
            self::$alertas['error'] [] = '* La contraseña es obligatoria';
        }
        if(strlen($this->password) < 6) {
            self::$alertas['error'] [] = '* La contraseña debe contener al menos 6 caracteres';
        }
        if($this->password !== $this->password2) {
            self::$alertas['error'] [] = '* La contraseñas son diferentes';
        }

        return self::$alertas;
    }

    public function validarLogin() {
        if(!$this->email) {
            self::$alertas['error'] [] = '* El correo electrónico es obligatorio';
        }
        if(!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            self::$alertas['error'] [] = '* Ingresa un correo electrónico válido';
        }
        if(!$this->password) {
            self::$alertas['error'] [] = '* La contraseña es obligatoria';
        }
        return self::$alertas;
    }

    public function validarEmail() {
        if(!$this->email) {
            self::$alertas['error'] [] = '* El correo electrónico es obligatorio';
        }
        if(!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            self::$alertas['error'] [] = '* Ingresa un correo electrónico válido';
        }
        return self::$alertas;
    }

    public function validarPassword() {
        if(!$this->password) {
            self::$alertas['error'] [] = '* La contraseña es obligatoria';
        }
        if(strlen($this->password) < 6) {
            self::$alertas['error'] [] = '* La contraseña debe contener al menos 6 caracteres';
        }
        return self::$alertas;
    }

    public function hashPassword() {
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
    }

    public function crearToken() {
        $this->token = uniqid();
    }

}