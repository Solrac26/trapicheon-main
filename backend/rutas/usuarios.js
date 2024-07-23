import { Router } from "express";
import usuariohttp from "../controladores/usuarios.js";
import { check } from "express-validator";
import helpersusuarios from "../helpers/usuarios.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutasusuarios = Router() 

rutasusuarios.get("/",usuariohttp.usuarioget)
rutasusuarios.post("/login",usuariohttp.usuariologin)
rutasusuarios.put("/:id", [
    check('id').custom(helpersusuarios.existeusuario), validarCampos
],usuariohttp.usuarioput)
rutasusuarios.put("/desactivar/:id", [
    check('id').custom(helpersusuarios.existeusuario), validarCampos
],usuariohttp.usuarioInactivoput)
rutasusuarios.put("/activar/:id", [
    check('id').custom(helpersusuarios.existeusuario), validarCampos
],usuariohttp.usuarioActivoput)
rutasusuarios.post('/',[    
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('contrasena', 'La contraseña es obligatoria').not().isEmpty(),
    check('rol', 'El rol es obligatorio').not().isEmpty(), validarCampos
],usuariohttp.usuariopost);

export default rutasusuarios



