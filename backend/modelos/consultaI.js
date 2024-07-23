// CONSULTA DE DATOS (INVENTARIO)

import mongoose from "mongoose";

const IdatosCShechema=new mongoose.Schema({
    codigo: { type:mongoose.Schema.ObjectId, ref:"codigo", required:true},
    fecha_venci: { type:mongoose.Schema.ObjectId, ref:"fecha_venci", required:true},
    n_stocks: { type:mongoose.Schema.ObjectId, ref:"n_stocks", required:true},
    nproductos_acabdos: { type:mongoose.Schema.ObjectId, ref:"nproductos_acabdos", required:true},
})

export default mongoose.model("Consulta", IdatosCShechema)