import { Router } from "express";
import materiaprimaChttp from "../controladores/materiaprimaC.js";
import { check } from "express-validator";
import helpersmateriaprimaC from "../helpers/materiaprimaC.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutasmateriaprimaC = Router();

rutasmateriaprimaC.get("/",materiaprimaChttp.materiaprimaCget);
rutasmateriaprimaC.get("/",materiaprimaChttp.materiaprimaCSearchForTextGet);
rutasmateriaprimaC.delete("/",materiaprimaChttp.materiaprimaCDelete);
rutasmateriaprimaC.put("/desactivar/:id",[
    check('id').custom(helpersmateriaprimaC.existemateriaprimaC), validarCampos
],materiaprimaChttp.materiaprimaCInactivoput);
rutasmateriaprimaC.put("/activar/:id",[
    check('id').custom(helpersmateriaprimaC.existemateriaprimaC), validarCampos
],materiaprimaChttp.materiaprimaCActivoput);
rutasmateriaprimaC.put("/:id",[
    check('id').custom(helpersmateriaprimaC.existemateriaprimaC), validarCampos
],materiaprimaChttp.materiaprimaCput);
rutasmateriaprimaC.post('/',[
    check('tipoUnidadMedida', 'El tipo de unidad de medida es obligatorio').not().isEmpty(),
    check('cantidadMP', 'La cantidad de materia prima es obligatoria').not().isEmpty(),
    check('lote', 'El lote es obligatorio').not().isEmpty(),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(), validarCampos
], materiaprimaChttp.materiaprimaCpost);

export default rutasmateriaprimaC;
