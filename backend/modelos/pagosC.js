import mongoose from "mongoose";

const pagosCShechema=new mongoose.Schema({
    cedula: { type: String, ref:"cedula", required:true },
    rolPagos:{ type: String, ref:"rol pagos", required:true },
    conceptoPagos:{ type: String, ref:"concepto pago", required:true },
    fechaPagos:{ type: String, ref:"fecha pagos", required:true },
    tiempoPagos:{ type: String, ref:"tiempo pago", required:true },
    metodPagos:{ type: String, ref:"metodo de pago", required:true },
    estado: {type: Number, default: 1},
})

const modelospagosC = mongoose.model("pagosC", pagosCShechema )

export default modelospagosC