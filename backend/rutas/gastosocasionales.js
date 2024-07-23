import { Router } from "express";
import gastosocasionaleshttp from "../controladores/gastosocasionales.js";
import { check } from "express-validator";
import helpersgastosocasionales from "../helpers/gastosocasionales.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutasgastosocasionales = Router();

rutasgastosocasionales.get("/",gastosocasionaleshttp.gastosocasionalesget);
rutasgastosocasionales.get("/",gastosocasionaleshttp.gastosocasionalesSearchForTextGet);
rutasgastosocasionales.delete("/", gastosocasionaleshttp.gastosocasionalesDelete);
rutasgastosocasionales.put("/desactivar/:id",[
    check('id').custom(helpersgastosocasionales.existegastosocasionales), validarCampos
], gastosocasionaleshttp.gastosocasionalesInactivoput);
rutasgastosocasionales.put("/activar/:id",[
    check('id').custom(helpersgastosocasionales.existegastosocasionales), validarCampos
], gastosocasionaleshttp.gastosocasionalesActivoput);
rutasgastosocasionales.put("/:id",[
    check('id').custom(helpersgastosocasionales.existegastosocasionales), validarCampos
], gastosocasionaleshttp.gastosocasionalesput);
rutasgastosocasionales.post("/",[
    check('nombreGastoOcas', 'El nombre del gasto es obligatorio').not().isEmpty(),
    check('finca', 'La finca es obligatoria').not().isEmpty(),
    check('descripcionOcas', 'La descripcion es obligatoria').not().isEmpty(),
    check('fechaPagosOcas', 'La fecha es obligatoria').not().isEmpty(),
    check('metodPagosOcas', 'El metodo de pago es obligatorio').not().isEmpty(),
    check('valorGOcas', 'El valor del gasto es obligatorio').not().isEmpty(), validarCampos

], gastosocasionaleshttp.gastosocasionalespost);

export default rutasgastosocasionales;