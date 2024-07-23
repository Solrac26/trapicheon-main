import { Router } from "express";
import pagosChttp from "../controladores/pagosC.js";
import { check } from "express-validator";
import helperspagosC from "../helpers/pagosC.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutaspagosC = Router();

rutaspagosC.get("/",pagosChttp.pagosCget);
rutaspagosC.get("/",pagosChttp.pagosCSearchForTextGet);
rutaspagosC.delete("/",pagosChttp.pagosCDelete);
rutaspagosC.put("/desactivar/:id",[
    check('id').custom(helperspagosC.existepagosC), validarCampos
],pagosChttp.pagosCInactivoput);
rutaspagosC.put("/activar/:id",[
    check('id').custom(helperspagosC.existepagosC), validarCampos
],pagosChttp.pagosCActivoput);
rutaspagosC.put("/:id",[
    check('id').custom(helperspagosC.existepagosC), validarCampos
],pagosChttp.pagosCput);
rutaspagosC.post('/',[
    check('cedula', 'La cedula es obligatoria').not().isEmpty(),
    check('rolPagos', 'El rol es obligatorio').not().isEmpty(),
    check('conceptoPagos', 'El concepto es obligatorio').not().isEmpty(),
    check('fechaPagos', 'La fecha es obligatoria').not().isEmpty(),
    check('tiempoPagos', 'El tiempo es obligatoria').not().isEmpty(), 
    check('metodPagos', 'El metodo de pago es obligatorio').not().isEmpty(), validarCampos
], pagosChttp.pagosCpost);

export default rutaspagosC;
