import mongoose from "mongoose";

const categoriasIShechema=new mongoose.Schema({
    nombreCategoria: { type: String, ref:"nombre categoria", required:true },
    descripcionCategoria:{ type: String, ref:"descripcion categoria", required:true },
    estado: {type: Number, default: 1},
})

const modeloscategoriasI = mongoose.model("categoriasI", categoriasIShechema )

export default modeloscategoriasI