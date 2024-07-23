import { Router } from "express";
import productosIhttp from "../controladores/productosI.js";
import { check } from "express-validator";
import helpersproductosI from "../helpers/productosI.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutasproductosI = Router();

rutasproductosI.get("/",productosIhttp.productosIget);
rutasproductosI.get("/",productosIhttp.productosISearchForTextGet);
rutasproductosI.delete("/",productosIhttp.productosIDelete);
rutasproductosI.put("/desactivar/:id",[
    check('id').custom(helpersproductosI.existeproductoI), validarCampos
],productosIhttp.productosIInactivoput);
rutasproductosI.put("/activar/:id",[
    check('id').custom(helpersproductosI.existeproductoI), validarCampos
],productosIhttp.productosIActivoput);
rutasproductosI.put("/:id",[
    check('id').custom(helpersproductosI.existeproductoI), validarCampos
],productosIhttp.productosIput);
rutasproductosI.post('/',[
    check('nombreProducto', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('nombreMarca', 'El nombre de la marca es obligatorio').not().isEmpty(),
    check('categoriaProducto', 'La categoría es obligatorio').not().isEmpty(),
    check('cantidadProducto', 'La cantidad es obligatoria').not().isEmpty(),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('tiempoVidaUtil', 'El tiempo de vida util es obligatorio').not().isEmpty(), validarCampos
], productosIhttp.productosIpost);

export default rutasproductosI;
