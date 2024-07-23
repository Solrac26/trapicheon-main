import mongoose from "mongoose";

const epsShechema=new mongoose.Schema({
    nombre: { type: String, ref:"Nombre de la EPS", required:true },
    n_linea:{ type: Number, ref:"Numero de Atencion", required:true },
    estado: {type: Number, default: 1},
})

const modeloseps = mongoose.model("eps", epsShechema )

export default modeloseps