import mongoose from "mongoose";

const LaboresShechema=new mongoose.Schema({
    nombreLabor: { type: String, ref:"nombreLabor", required:true },
    areaRealizar:{ type: String, ref:"areaRealizar", required:true },
    pagoDiario:{ type: String, ref:"pagoDiario", required:true },
    estado: {type: Number, default: 1},
})

const modelosLabores = mongoose.model("Labores", LaboresShechema )

export default modelosLabores