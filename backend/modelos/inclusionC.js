// INCLUSION DE DATOS (COSTOS)

import mongoose from "mongoose";

const IdatosCShechema=new mongoose.Schema({
    codigo: { type:mongoose.Schema.ObjectId, ref:"codigo", required:true},
    costo: { type:mongoose.Schema.ObjectId, ref:"costo", required:true},
})

export default mongoose.model("IDclientes", IdatosCShechema)