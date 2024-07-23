import mongoose from "mongoose";

const fincasShechema=new mongoose.Schema({
    nombreFinca: { type: String, ref:"Nombre de la Finca", required:true },
    extensionFinca:{ type: String, ref:"Extension de la Finca", required:true },
    nMatriculaFinca:{ type: String, ref:"Numero de matricula de la finca", required:true },
    estado: {type: Number, default: 1},
})

const modelosfincas = mongoose.model("fincas", fincasShechema )

export default modelosfincas