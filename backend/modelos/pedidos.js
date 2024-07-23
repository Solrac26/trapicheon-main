import mongoose from "mongoose";

const pedidosShechema=new mongoose.Schema({
    numeroDocCliente: { type: Number, ref:"numero documento", required:true },
    nombreCliente:{ type: String, ref:"nombre cliente", required:true },
    telefonoCliente:{ type: String, ref:"telefono cliente", required:true },
    direccionClien:{ type: String, ref:"direccion cliente", required:true },
    tipoPanela:{ type: String, ref:"tipo panela", required:true },
    cantidadesPedido:{ type: String, ref:"cantidades pedido", required:true },
    tipoEmpaque:{ type: String, ref:"tipo empaque", required:true },
    detallesFactura:{ type: String, ref:"detalles factura", required:true },
    estado: {type: Number, default: 1},
})

const modelospedidos = mongoose.model("pedidos", pedidosShechema )

export default modelospedidos