import { Router } from "express";
import epshttp from "../controladores/eps.js";
import { check } from "express-validator";
import helperseps from "../helpers/eps.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutaseps = Router();

rutaseps.get("/",epshttp.epsget);
rutaseps.get("/",epshttp.epsSearchForTextGet);
rutaseps.delete("/",epshttp.epsDelete);
rutaseps.put("/desactivar/:id", [
    check('id').custom(helperseps.existeeps), validarCampos
],epshttp.epsInactivoput);
rutaseps.put("/activar/:id", [
    check('id').custom(helperseps.existeeps), validarCampos
],epshttp.epsActivoput);
rutaseps.put("/:id", [
    check('id').custom(helperseps.existeeps), validarCampos
],epshttp.epsput);
rutaseps.post('/', [
    check('nombre', 'El nombre de la EPS es obligatorio').not().isEmpty(),
    check('n_linea', 'El numero de linea es obligatorio').not().isEmpty(), validarCampos
], epshttp.epspost);

export default rutaseps;
