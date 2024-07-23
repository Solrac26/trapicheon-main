import mongoose from "mongoose";

const procesosdiariosShechema=new mongoose.Schema({
    nombreActi: { type: String, ref:"actividad", required:true },
    descripcionActi:{ type: String, ref:"descripcion de la actividad", required:true },
    horasActi:{ type: String, ref:"horas actividad", required:true },
    personas:{ type: String, ref:"personas", required:true },
    fecha:{ type: String, ref:"fecha", required:true },
    lote:{ type: String, ref:"lote", required:true },
    estado: {type: Number, default: 1},
})

const modelosprocesosdiarios = mongoose.model("procesosdiarios", procesosdiariosShechema )

export default modelosprocesosdiarios