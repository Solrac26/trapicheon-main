import { Router } from "express";
import inventariohttp from "../controladores/inventario.js";
import { check } from "express-validator";
import helpersinventario from "../helpers/inventario.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutasinventario = Router();

rutasinventario.get("/", inventariohttp.inventariogetListar);
rutasinventario.get("/", inventariohttp.inventarioIdGet);
rutasinventario.get("/", inventariohttp.inventarioGetBuscar);
rutasinventario.delete("/", inventariohttp.inventarioDelete);
rutasinventario.post('/', [
    check('nombreAr', 'Los nombres del articulo son obligatorios').not().isEmpty(),
    check('cantidad', 'La cantidad es obligatoria').not().isEmpty(),
    check('numero_entradas', 'El numero de entradas de los articulos es obligatoria').not().isEmpty(),
    check('numero_salidas', 'El numero de salidas de los articulos es obligatoria').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),    
    check("codigo", "No es un codigo valido").isMongoId(),
    check("codigo").custom(helpersinventario.existeinventario),
    validarCampos], inventariohttp.inventarioPost);

export default rutasinventario;