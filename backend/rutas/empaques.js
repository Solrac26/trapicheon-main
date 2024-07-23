import { Router } from "express";
import empaqueshttp from "../controladores/empaques.js";
import { check } from "express-validator";
import helpersempaques from "../helpers/empaques.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutasempaques = Router();

rutasempaques.get("/",empaqueshttp.empaquesget);
rutasempaques.get("/",empaqueshttp.empaquesSearchForTextGet);
rutasempaques.delete("/",empaqueshttp.empaquesDelete);
rutasempaques.put("/desactivar/:id", [
    check('id').custom(helpersempaques.existeempaques), validarCampos
],empaqueshttp.empaquesInactivoput);
rutasempaques.put("/activar/:id", [
    check('id').custom(helpersempaques.existeempaques), validarCampos
],empaqueshttp.empaquesActivoput);
rutasempaques.put("/:id",[
    check('id').custom(helpersempaques.existeempaques), validarCampos
],empaqueshttp.empaquesput);
rutasempaques.post('/', [
    check('nombreEmpaque', 'El nombre del empaque es obligatorio').not().isEmpty(),
    check('numEmpaque', 'El numero de empaque es obligatorio').not().isEmpty(), validarCampos
], empaqueshttp.empaquespost);

export default rutasempaques;
