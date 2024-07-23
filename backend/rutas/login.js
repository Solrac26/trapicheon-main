import { Router } from "express";
import loginhttp from "../controladores/login.js";
import { check } from "express-validator";
import helperslogin from "../helpers/login.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutaslogin = Router();

rutaslogin.post('/', [
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check("contasena", "La contraseña no es valida").not().isEmpty(),
    // check("contraseña").custom(helperslogin.existe_contraseña),
    validarCampos], loginhttp.LoginPost);

export default rutaslogin;