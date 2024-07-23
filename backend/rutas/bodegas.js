import { Router } from "express";
import bodegahttp from "../controladores/bodegas.js";
import { check } from "express-validator";
import helpersBodegas from "../helpers/bodegas.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutasbodegas = Router();

rutasbodegas.get("/",bodegahttp.bodegasIDGet);
rutasbodegas.get("/",bodegahttp.bodegasSearchForTextGet);
rutasbodegas.delete("/",bodegahttp.bodegasDelete);
rutasbodegas.post('/', [
    check('nombres', 'Los nombres son obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
    check("codigo", "No es un codigo valido").isMongoId(),
    check("codigo").custom(helpersBodegas.existeBodegasById),
    validarCampos], bodegahttp.bodegasPost);

export default rutasbodegas;

