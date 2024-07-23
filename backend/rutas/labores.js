import { Router } from "express";
import laboreshttp from "../controladores/labores.js";
import { check } from "express-validator";
import helperslabores from "../helpers/labores.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutaslabores = Router();

rutaslabores.get("/",laboreshttp.laboresget);
rutaslabores.get("/",laboreshttp.laboresSearchForTextGet);
rutaslabores.delete("/",laboreshttp.laboresDelete);
rutaslabores.put("/desactivar/:id", [
    check('id').custom(helperslabores.existelabor), validarCampos
],laboreshttp.laboresInactivoput);
rutaslabores.put("/activar/:id", [
    check('id').custom(helperslabores.existelabor), validarCampos
],laboreshttp.laboresActivoput);
rutaslabores.put("/:id", [
    check('id').custom(helperslabores.existelabor), validarCampos
],laboreshttp.laboresput);
rutaslabores.post('/', [
    check('nombreLabor', 'El nombre de la labor es obligatorio').not().isEmpty(),
    check('areaRealizar', 'El area a realizar es obligatorio').not().isEmpty(),
    check('pagoDiario', 'El pago diario es obligatorio').not().isEmpty(), validarCampos
], laboreshttp.laborespost);

export default rutaslabores;
