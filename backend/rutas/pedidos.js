import { Router } from "express";
import pedidoshttp from "../controladores/pedidos.js";
import { check } from "express-validator";
import helperspedidos from "../helpers/pedidos.js";
import { validarCampos } from "../helpers/middleware/validar_campos.js";

const rutaspedidos = Router();

rutaspedidos.get("/", pedidoshttp.pedidosget);
rutaspedidos.get("/", pedidoshttp.pedidosSearchForTextGet);
rutaspedidos.delete("/", pedidoshttp.pedidosDelete);
rutaspedidos.put(
  "/desactivar/:id",
  [check("id").custom(helperspedidos.existepedido), validarCampos],
  pedidoshttp.pedidosInactivoput
);
rutaspedidos.put(
  "/activar/:id",
  [check("id").custom(helperspedidos.existepedido), validarCampos],
  pedidoshttp.pedidosActivoput
);
rutaspedidos.put(
  "/:id",
  [check("id").custom(helperspedidos.existepedido), validarCampos],
  pedidoshttp.pedidosput
);
rutaspedidos.post(
  "/",
  [
        check('numeroDocCliente', 'El numero de documento es obligatorio').not().isEmpty(),
        check('nombreCliente', 'El nombre del cliente es obligatorio').not().isEmpty(),
        check('telefonoCliente', 'El telefono del cliente es obligatorio').not().isEmpty(),
        check('direccionClien', 'La direccion del cliente es obligatoria').not().isEmpty(),
        check('tipoPanela', 'El tipo de panela es obligatorio').not().isEmpty(),
        check('cantidadesPedido', 'La cantidad de pedido es obligatorio').not().isEmpty(),
        check('tipoEmpaque', 'El tipo de empaque es obligatorio').not().isEmpty(),
        check('detallesFactura', 'El detalle de factura es obligatorio').not().isEmpty(), validarCampos
  ],
  pedidoshttp.pedidospost
);

export default rutaspedidos;
