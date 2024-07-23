import mongoose from "mongoose";

const tipodocumentoShechema=new mongoose.Schema({
    tipoDocumento: { type: String, ref:"Tipo de Documento", required:true },
    numDocumento:{ type: String, ref:"Numero de Documento", required:true },
    estado: {type: Number, default: 1},
})

const modelostipodocumento = mongoose.model("tipodocumento", tipodocumentoShechema )

export default modelostipodocumento