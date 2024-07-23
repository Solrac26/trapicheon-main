import { Router } from "express";
import empacadoshttp from "../controladores/empacados.js";
import { check } from "express-validator";
import helpersempacados from "../helpers/empacados.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutasempacados = Router();

rutasempacados.get("/",empacadoshttp.empacadosget);
rutasempacados.get("/",empacadoshttp.empacadosSearchForTextGet);
rutasempacados.delete("/",empacadoshttp.empacadosDelete);
rutasempacados.put("/desactivar/:id",[
    check('id').custom(helpersempacados.existeempacados), validarCampos
],empacadoshttp.empacadosInactivoput);
rutasempacados.put("/activar/:id",[
    check('id').custom(helpersempacados.existeempacados), validarCampos
],empacadoshttp.empacadosActivoput);
rutasempacados.put("/:id",[
    check('id').custom(helpersempacados.existeempacados), validarCampos
],empacadoshttp.empacadosput);
rutasempacados.post('/',[
    check('codigoBodega', 'El codigo de bodega es obligatorio').not().isEmpty(),
    check('tipoEmpaque', 'El tipo de empaque es obligatorio').not().isEmpty(),
    check('tipoPanela', 'El tipo de panela es obligatorio').not().isEmpty(),
    check('formaPanela', 'La forma de panela es obligatorio').not().isEmpty(),
    check('totalPanelas', 'El total de las panelas es obligatorio').not().isEmpty(), validarCampos
], empacadoshttp.empacadospost);

export default rutasempacados;
