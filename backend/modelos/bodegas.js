// BODEGAS

import mongoose from "mongoose";

const BodegasShechema=new mongoose.Schema({
    codigo: { type:mongoose.Schema.ObjectId, ref:"codigo", required:true },
    nombres:{ type:mongoose.Schema.ObjectId, ref:"nombres", required:true },
    descripcion:{ type:mongoose.Schema.ObjectId, ref:"descripcion", required:true },
})

export default mongoose.model("Bodegas", BodegasShechema)