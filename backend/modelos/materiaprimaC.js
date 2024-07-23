import mongoose from "mongoose";

const materiaprimaCShechema=new mongoose.Schema({
    tipoUnidadMedida: { type: String, ref:"tipo unidad", required:true },
    cantidadMP:{ type: String, ref:"cantidad materia prima", required:true },
    lote:{ type: String, ref:"lote", required:true },
    fecha:{ type: String, ref:"fecha", required:true },
    estado: {type: Number, default: 1},
})

const modelosmateriaprimaC = mongoose.model("materiaprimaC", materiaprimaCShechema )

export default modelosmateriaprimaC