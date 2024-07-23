import mongoose from "mongoose";

const lotesShechema=new mongoose.Schema({
    nombres: { type: String, ref:"Nombres del lote", required:true },
    Descripcion:{ type: String, ref:"Descripcion", required:true },
    estado: {type: Number, default: 1},
})

const modeloslotes = mongoose.model("lotes", lotesShechema )

export default modeloslotes