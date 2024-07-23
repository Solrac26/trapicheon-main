import { Router } from "express";
import fincashttp from "../controladores/fincas.js";
import { check } from "express-validator";
import helpersfincas from "../helpers/fincas.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutasfincas = Router();

rutasfincas.get("/",fincashttp.fincasget);
rutasfincas.get("/",fincashttp.fincasSearchForTextGet);
rutasfincas.delete("/",fincashttp.fincasDelete);
rutasfincas.put("/desactivar/:id",[
    check('id').custom(helpersfincas.existefinca), validarCampos
],fincashttp.fincasInactivoput);
rutasfincas.put("/activar/:id",[
    check('id').custom(helpersfincas.existefinca), validarCampos
],fincashttp.fincasActivoput);
rutasfincas.put("/:id",[
    check('id').custom(helpersfincas.existefinca), validarCampos
],fincashttp.fincasput);
rutasfincas.post('/',[
    check('nombreFinca', 'El nombre de la finca es obligatorio').not().isEmpty(),
    check('extensionFinca', 'La extención es obligatoria').not().isEmpty(),
    check('nMatriculaFinca', 'El numero de matricula es obligatorio').not().isEmpty(), validarCampos
], fincashttp.fincaspost);

export default rutasfincas;
