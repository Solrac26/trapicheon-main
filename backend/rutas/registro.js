import { Router } from "express";
import registrohttp from "../controladores/registro.js";
import { check } from "express-validator";
import helpersregistro from "../helpers/registro.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutasregistro = Router();

rutasregistro.get("/",registrohttp.registroGetListar);
rutasregistro.get("/",registrohttp.registroIdGet);
rutasregistro.get("/",registrohttp.registroGetBuscar);
rutasregistro.delete("/",registrohttp.registroDelete);
rutasregistro.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('accion', 'La accion es obligatoria').not().isEmpty(),
    check("id").custom(helpersregistro.existe_registro),
    validarCampos], registrohttp.registroPost);

export default rutasregistro;