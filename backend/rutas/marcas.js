import { Router } from "express";
import marcashttp from "../controladores/marcas.js";
import { check } from "express-validator";
import helpersmarcas from "../helpers/marcas.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutasmarcas = Router();

rutasmarcas.get("/",marcashttp.marcasget);
rutasmarcas.get("/",marcashttp.marcasSearchForTextGet);
rutasmarcas.delete("/",marcashttp.marcasDelete);
rutasmarcas.put("/desactivar/:id", [
    check('id').custom(helpersmarcas.existemarcas), validarCampos
],marcashttp.marcasInactivoput);
rutasmarcas.put("/activar/:id",[
    check('id').custom(helpersmarcas.existemarcas), validarCampos
],marcashttp.marcasActivoput);
rutasmarcas.put("/:id",[
    check('id').custom(helpersmarcas.existemarcas), validarCampos
],marcashttp.marcasput);
rutasmarcas.post('/',[
    check('nombreMarca', 'El nombre de la marca es obligatorio').not().isEmpty(),
    check('descripcionMarca', 'La descripcion es obligatoria').not().isEmpty(),
    check('creadorMarca', 'El nombre del creador de la marca es obligatorio').not().isEmpty(),validarCampos
], marcashttp.marcaspost);

export default rutasmarcas;
