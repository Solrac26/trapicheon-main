import { Router } from "express";
import inclusionhttp from "../controladores/inclusionI.js";
import { check } from "express-validator";
import helpersIdatosDI from "../helpers/inclusionI.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutasinclusionI = Router();

rutasinclusionI.put("/", inclusionhttp.InclusionActualizarPut);
rutasinclusionI.delete("/", inclusionhttp.InclusionDelete);
rutasinclusionI.get("/", inclusionhttp.InclusionGet);
rutasinclusionI.post('/', [
    check('costo', 'El costo es obligatorio').not().isEmpty(),
    check("codigo", "No es un codigo valido").isMongoId(),
    check("codigo").custom(helpersIdatosDI.existecodigo),
    validarCampos], inclusionhttp.InclusionPost)

export default rutasinclusionI;