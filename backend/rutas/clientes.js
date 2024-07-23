import { Router } from "express";
import clienteshttp from "../controladores/clientes.js";
import { check } from "express-validator";
import helpersIclientes from "../helpers/clientes.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutasclientes = Router();

rutasclientes.get("/",clienteshttp.clientesget);
rutasclientes.put("/",clienteshttp.clientesPut);
rutasclientes.delete("/",clienteshttp.clientesDelete);
rutasclientes.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('direccion', 'La direccion es obligatoria').not().isEmpty(),
    check('ciudad', 'La ciudad es obligatoria').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check("cedula", "La cedula no es valida").isMongoId(),
    check("cedula").custom(helpersIclientes.existeCliente),
    validarCampos], clienteshttp.clientesPost);

export default rutasclientes;

