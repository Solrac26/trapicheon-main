import { Router } from "express";
import gastosmensualeshttp from "../controladores/gastosmensuales.js";
import { check } from "express-validator";
import helpersgastosmensuales from "../helpers/gastosmensuales.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutasgastosmensuales = Router();

rutasgastosmensuales.get("/",gastosmensualeshttp.gastosmensualesget);
rutasgastosmensuales.get("/",gastosmensualeshttp.gastosmensualesSearchForTextGet);
rutasgastosmensuales.delete("/", gastosmensualeshttp.gastosmensualesDelete);
rutasgastosmensuales.put("/desactivar/:id",[
    check('id').custom(helpersgastosmensuales.existegastomensual), validarCampos
], gastosmensualeshttp.gastosmensualesInactivoput);
rutasgastosmensuales.put("/activar/:id",[
    check('id').custom(helpersgastosmensuales.existegastomensual), validarCampos
], gastosmensualeshttp.gastosmensualesActivoput);
rutasgastosmensuales.put("/:id",[
    check('id').custom(helpersgastosmensuales.existegastomensual), validarCampos
], gastosmensualeshttp.gastosmensualesput);
rutasgastosmensuales.post("/",[
    check('nombreGastoMens', 'El nombre del gasto mensual es obligatorio').not().isEmpty(),
    check('finca', 'La finca es obligatoria').not().isEmpty(),
    check('descripcionMens', 'La descripcion es obligatoria').not().isEmpty(),
    check('fechaPagosMens', 'La fecha de pago es obligatoria').not().isEmpty(),
    check('metodPagosMens', 'El metodo de pago es obligatorio').not().isEmpty(),
    check('valorGmensual', 'El valor mensual es obligatorio').not().isEmpty(), validarCampos

], gastosmensualeshttp.gastosmensualespost);

export default rutasgastosmensuales;