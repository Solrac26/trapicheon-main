import { Router } from "express";
import costoshttp from "../controladores/inclusionC.js";
import { check } from "express-validator";
import helpersinclusionC from "../helpers/inclusionC.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutascostos = Router();

rutascostos.put("/", costoshttp.costosPut);
rutascostos.delete("/", costoshttp.costosDelete);
rutascostos.get("/", costoshttp.costosget);
rutascostos.post('/', [
    check('costo', 'El costo es obligatorio').not().isEmpty(),
    check("codigo", "No es un codigo valido").isMongoId(),
    check("codigo").custom(helpersinclusionC.existe_inclusion),
    validarCampos], costoshttp.costosPost);

export default rutascostos;