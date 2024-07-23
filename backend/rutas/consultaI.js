import { Router } from "express";
import consultahttp from "../controladores/consultaI.js";
import { check } from "express-validator";
import helpersconsulta from "../helpers/consultaI.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutasconsultas = Router();

rutasconsultas.put("/",consultahttp.consultasActualizarPut);
rutasconsultas.get("/",consultahttp.consultasGetListar);
rutasconsultas.post('/', [
    check('fecha_venci', 'La fecha de vencimiento es obligatoria').not().isEmpty(),
    check('n_stocks', 'El numero de stocks es obligatorio').not().isEmpty(),
    check('nproductos_acabdos', 'El numero de productos acabados es obligatorio').not().isEmpty(),
    check("codigo", "No es un codigo valido").isMongoId(),
    check("codigo").custom(helpersconsulta.existeconsulta),
    validarCampos], consultahttp.consultasPost);

export default rutasconsultas;