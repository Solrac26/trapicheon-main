// INGRESAR PROVEEDORES

import mongoose from "mongoose";

const IproveedoresShechema=new mongoose.Schema({
    cedula: { type:mongoose.Schema.ObjectId, ref:"cedula", required:true},
    nombre: { type:mongoose.Schema.ObjectId, ref:"nombre", required:true},
    producto: { type:mongoose.Schema.ObjectId, ref:"producto", required:true},
    direccion: { type:mongoose.Schema.ObjectId, ref:"direccion", required:true},
    ciudad: { type:mongoose.Schema.ObjectId, ref:"ciudad", required:true},
    telefono: { type:mongoose.Schema.ObjectId, ref:"telefono" ,required:true},
    ncbancaria: { type:mongoose.Schema.ObjectId, ref:"ncbancaria", required:true},
})

export default mongoose.model("Iproveedores", IproveedoresShechema)