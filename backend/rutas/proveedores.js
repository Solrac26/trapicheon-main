import { Router } from "express";
import proveedoreshttp from "../controladores/proveedores.js";
import { check } from "express-validator";
import helpersprovee from "../helpers/proveedores.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutasproveedores = Router();

rutasproveedores.get("/",proveedoreshttp.ProveeActualizarPut);
rutasproveedores.get("/",proveedoreshttp.ProveeGet);
rutasproveedores.delete("/",proveedoreshttp.proveeDelete);
rutasproveedores.post('/', [
    check('nombre', 'Los nombres son obligatorio').not().isEmpty(),
    check('producto', 'El producto es obligatorio').not().isEmpty(),
    check('direccion', 'La direccion es obligatoria').not().isEmpty(),
    check('ciudad', 'La ciudad es obligatoria').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('ncbancaria', 'El numero de cuenta bancaria es obligatoria').not().isEmpty(),
    check("cedula", "La cedula no es valida").isMongoId(),
    check("cedula").custom(helpersprovee.existe_proveedor),
    validarCampos], proveedoreshttp.ProveePost);

export default rutasproveedores;