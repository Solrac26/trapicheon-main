import { Router } from "express";
import uMediddahttp from "../controladores/uMedida.js";
import { check } from "express-validator";
import helpersuMedida from "../helpers/uMedida.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutasuMedida = Router();

rutasuMedida.get("/",uMediddahttp.uMedidaget);
rutasuMedida.get("/",uMediddahttp.uMedidaSearchForTextGen);
rutasuMedida.delete("/", uMediddahttp.uMedidaDelete);
rutasuMedida.put("/desactivar/:id", [
    check('id').custom(helpersuMedida.existeuMedida), validarCampos
], uMediddahttp.uMedidaInactivoput);
rutasuMedida.put("/activar/:id", [
    check('id').custom(helpersuMedida.existeuMedida), validarCampos
], uMediddahttp.uMedidaActivoput);
rutasuMedida.put("/:id", [
    check('id').custom(helpersuMedida.existeuMedida), validarCampos
], uMediddahttp.uMedidaput);
rutasuMedida.post("/", [
    check('nombreU', 'El nombre de la unidad es obligatorio').not().isEmpty(),
    check('formato', 'El formato es obligatorio').not().isEmpty(), validarCampos
], uMediddahttp.uMedidapost);

export default rutasuMedida;

