import mongoose from "mongoose";

const uMedidaShechema= new mongoose.Schema({
    
    nombreU:{type:String, required:true},
    formato:{type:String, required:true},
    estado:{type:Number, default:1},
})

const modelosuMedida = mongoose.model("uMedida", uMedidaShechema);
export default modelosuMedida;