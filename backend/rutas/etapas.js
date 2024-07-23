import { Router } from "express";
import etapashttp from "../controladores/etapas.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";
import { check } from "express-validator";
import helpersetapas from "../helpers/etapas.js";

const rutasetapas = Router();

rutasetapas.get("/",etapashttp.etapasget);
rutasetapas.get("/",etapashttp.etapasSearchForTextGet);
rutasetapas.delete("/",etapashttp.etapasDelete);
rutasetapas.put("/desactivar/:id",[
    check('id').custom(helpersetapas.existeetapas), validarCampos
] ,etapashttp.etapasInactivoput);
rutasetapas.put("/activar/:id",[
    check('id').custom(helpersetapas.existeetapas), validarCampos
] ,etapashttp.etapasActivoput);
rutasetapas.put("/:id",[
    check('id').custom(helpersetapas.existeetapas), validarCampos
] ,etapashttp.etapasput);
rutasetapas.post('/',[
    check('nombreE', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcionEtapa', 'La descripcion es obligatoria').not().isEmpty(), validarCampos
], etapashttp.etapaspost);

export default rutasetapas;
