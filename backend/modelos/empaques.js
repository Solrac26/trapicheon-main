import mongoose from "mongoose";

const empaquesShechema=new mongoose.Schema({
    nombreEmpaque: { type: String, ref:"Nombre del empaque", required:true },
    numEmpaque:{ type: String, ref:"Numero del empaque", required:true },
    estado: {type: Number, default: 1},
})

const modelosempaques = mongoose.model("empaques", empaquesShechema )

export default modelosempaques