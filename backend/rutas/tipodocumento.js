import { Router } from "express";
import tipodocumentohttp from "../controladores/tipodocumento.js";
import { check } from "express-validator";
import helperstipodocumento from "../helpers/tipodocumento.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutastipodocumento = Router();

rutastipodocumento.get("/",tipodocumentohttp.tipodocumentoget);
rutastipodocumento.get("/",tipodocumentohttp.tipodocumentoSearchForTextGet);
rutastipodocumento.delete("/",tipodocumentohttp.tipodocumentoDelete);
rutastipodocumento.put("/desactivar/:id",[
    check('id').custom(helperstipodocumento.existetipodocumento), validarCampos 
] ,tipodocumentohttp.tipodocumentoInactivoput);
rutastipodocumento.put("/activar/:id", [
    check('id').custom(helperstipodocumento.existetipodocumento), validarCampos
],tipodocumentohttp.tipodocumentoActivoput);
rutastipodocumento.put("/:id", [
    check('id').custom(helperstipodocumento.existetipodocumento), validarCampos
],tipodocumentohttp.tipodocumentoput);
rutastipodocumento.post('/', [
    check('tipoDocumento', 'El tipo de documento es obligatorio').not().isEmpty(),
    check('numDocumento', 'El numero de documento es obligatorio').not().isEmpty(), validarCampos
], tipodocumentohttp.tipodocumentopost);

export default rutastipodocumento;
