import { Router } from "express";
import loteshttp from "../controladores/lotes.js";
import { check } from "express-validator";
import helperslotes from "../helpers/lotes.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutaslotes = Router();

rutaslotes.get("/",loteshttp.lotesget);
rutaslotes.get("/",loteshttp.lotesSearchForTextGet);
rutaslotes.delete("/",loteshttp.lotesDelete);
rutaslotes.put("/desactivar/:id", [
    check('id').custom(helperslotes.existelotes), validarCampos
],loteshttp.lotesInactivoput);
rutaslotes.put("/activar/:id", [
    check('id').custom(helperslotes.existelotes), validarCampos
],loteshttp.lotesActivoput);
rutaslotes.put("/:id", [
    check('id').custom(helperslotes.existelotes), validarCampos
],loteshttp.lotesput);
rutaslotes.post('/', [
    check('nombres', 'Los nombres son obligatorios').not().isEmpty(),
    check('Descripcion', 'La descripcion es obligatoria').not().isEmpty(), validarCampos
], loteshttp.lotespost);

export default rutaslotes;
