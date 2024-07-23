import { Router } from "express";
import bodegasIhttp from "../controladores/bodegasI.js";
import { check } from "express-validator";
import helpersbodegasI from "../helpers/bodegasI.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutasbodegasI = Router();

rutasbodegasI.get("/",bodegasIhttp.bodegasIget);
rutasbodegasI.get("/",bodegasIhttp.bodegasISearchForTextGet);
rutasbodegasI.delete("/",bodegasIhttp.bodegasIDelete);
rutasbodegasI.put("/desactivar/:id",[
    check('id').custom(helpersbodegasI.existebodegaI), validarCampos
],bodegasIhttp.bodegasIInactivoput);
rutasbodegasI.put("/activar/:id",[
    check('id').custom(helpersbodegasI.existebodegaI), validarCampos
],bodegasIhttp.bodegasIActivoput);
rutasbodegasI.put("/:id", [
    check('id').custom(helpersbodegasI.existebodegaI), validarCampos
],bodegasIhttp.bodegasIput);
rutasbodegasI.post('/',[
    check('nombreBodega', 'El nombre es obligatorio').not().isEmpty(),
    check('contentBodega', 'El contenido es obligatorio').not().isEmpty(),
    check('adminBodega', 'El administrador de la bodega es obligatorio').not().isEmpty(),
    check('extensionBodega', 'La extención de la bodega es obligatoria').not().isEmpty(),
    check('direccion', 'La direccion es obligatoria').not().isEmpty(),validarCampos
], bodegasIhttp.bodegasIpost);

export default rutasbodegasI;
