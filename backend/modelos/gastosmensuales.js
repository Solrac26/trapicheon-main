import mongoose from "mongoose";

const gastosmensualesShechema=new mongoose.Schema({
    nombreGastoMens:{type:String, required:true},
    finca:{type:String, required:true},
    descripcionMens:{type:String, required:true},
    fechaPagosMens:{type:String, required:true},
    metodPagosMens:{type:String, required:true},
    valorGmensual:{type:String, required:true},
    estado:{type:Number, default:1},
})

const modelosgastosmensuales = mongoose.model("gastosmensuales", gastosmensualesShechema);
export default modelosgastosmensuales;