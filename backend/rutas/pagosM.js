import { Router } from "express";
import pagoshttp from "../controladores/pagosM.js";
import { check } from "express-validator";
import helperspagosM from "../helpers/pagosM.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutaspagos = Router();

rutaspagos.get("/",pagoshttp.pagosget);
rutaspagos.get("/",pagoshttp.pagosSearchForTextGet);
rutaspagos.delete("/", pagoshttp.pagosDelete);
rutaspagos.put("/desactivar/:id", [
    check('id').custom(helperspagosM.existepagosM), validarCampos
], pagoshttp.pagosInactivoput);
rutaspagos.put("/activar/:id", [
    check('id').custom(helperspagosM.existepagosM), validarCampos
], pagoshttp.pagosActivoput);
rutaspagos.put("/:id", [
    check('id').custom(helperspagosM.existepagosM), validarCampos
], pagoshttp.pagosput);
rutaspagos.post("/", [
    check('codigoPago', 'El codigo es obligatorio').not().isEmpty(), // Revisaaaaaaaaaar
    check('nombrePago', 'El nombre del pago es obligatorio').not().isEmpty(),
    check('tipoPago', 'El tipo de pago es obligatorio').not().isEmpty(), validarCampos
], pagoshttp.pagospost);

export default rutaspagos;

