import { Router } from "express";
import categoriasIhttp from "../controladores/categoriasI.js";
import { check } from "express-validator";
import helperscategoriasI from "../helpers/categoriasI.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutascategoriasI = Router();

rutascategoriasI.get("/",categoriasIhttp.categoriasIget);
rutascategoriasI.get("/",categoriasIhttp.categoriasISearchForTextGet);
rutascategoriasI.delete("/",categoriasIhttp.categoriasIDelete);
rutascategoriasI.put("/desactivar/:id",[
    check('id').custom(helperscategoriasI.existecategoriaI), validarCampos
],categoriasIhttp.categoriasIInactivoput);
rutascategoriasI.put("/activar/:id",[
    check('id').custom(helperscategoriasI.existecategoriaI), validarCampos
],categoriasIhttp.categoriasIActivoput);
rutascategoriasI.put("/:id",[
    check('id').custom(helperscategoriasI.existecategoriaI), validarCampos
],categoriasIhttp.categoriasIput);
rutascategoriasI.post('/',[
    check('nombreCategoria', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    check('descripcionCategoria', 'La descripcion de la categoria es obligatorio').not().isEmpty(), validarCampos

], categoriasIhttp.categoriasIpost);

export default rutascategoriasI;
