import mongoose from "mongoose";

const pagosShechema=new mongoose.Schema({
    codigoPago: { type: String, ref:"Codigo del pago", required:true },
    nombrePago:{ type: String, ref:"Nombre pago", required:true },
    tipoPago:{ type: String, ref:"Tipo de pago", required:true },
    estado: {type: Number, default: 1},
})

const modelospagos = mongoose.model("pagos", pagosShechema )

export default modelospagos