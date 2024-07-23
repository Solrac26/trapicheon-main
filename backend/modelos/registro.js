import mongoose from "mongoose";

const RegistroShechema=new mongoose.Schema({
    id: { type:mongoose.Schema.ObjectId, ref:"id", required:true},
    nombre: { type:mongoose.Schema.ObjectId, ref:"nombre", required:true},
    fecha: { type:mongoose.Schema.ObjectId, ref:"fecha", required:true},
    accion: { type:mongoose.Schema.ObjectId, ref:"accion", required:true},
})

export default mongoose.model("Registro", RegistroShechema)