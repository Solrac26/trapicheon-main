import mongoose from "mongoose";

const etapasShechema=new mongoose.Schema({
    nombreE: { type: String, ref:"Nombre de la etapa", required:true },
    descripcionEtapa:{ type: String, ref:"Descipcion", required:true },
    estado: {type: Number, default: 1},
})

const modelosetapas = mongoose.model("etapas", etapasShechema )

export default modelosetapas