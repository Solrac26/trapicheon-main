import { Router } from "express";
import procesosdiarioshttp from "../controladores/procesosdiarios.js";
import { check } from "express-validator";
import helpersprocesosdiarios from "../helpers/procesosdiarios.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutasprocesosdiarios = Router();

rutasprocesosdiarios.get("/",procesosdiarioshttp.procesosdiariosget);
rutasprocesosdiarios.get("/",procesosdiarioshttp.procesosdiariosSearchForTextGet);
rutasprocesosdiarios.delete("/",procesosdiarioshttp.procesosdiariosDelete);
rutasprocesosdiarios.put("/desactivar/:id",[
    check('id').custom(helpersprocesosdiarios.existeprocesosdiarios), validarCampos
],procesosdiarioshttp.procesosdiariosInactivoput);
rutasprocesosdiarios.put("/activar/:id",[
    check('id').custom(helpersprocesosdiarios.existeprocesosdiarios), validarCampos
],procesosdiarioshttp.procesosdiariosActivoput);
rutasprocesosdiarios.put("/:id",[
    check('id').custom(helpersprocesosdiarios.existeprocesosdiarios), validarCampos
],procesosdiarioshttp.procesosdiariosput);
rutasprocesosdiarios.post('/',[
    check('nombreActi', 'La actividad es obligatoria').not().isEmpty(),
    check('descripcionActi', 'La descripcion de la actividad es obligatoria').not().isEmpty(),
    check('horasActi', 'Las horas de la actividad es obligatoria').not().isEmpty(),
    check('personas', 'Las personas son obligatorias').not().isEmpty(),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('lote', 'El lote es obligatorio').not().isEmpty(), validarCampos
], procesosdiarioshttp.procesosdiariospost);

export default rutasprocesosdiarios;
