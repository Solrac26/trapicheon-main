import mongoose from "mongoose";

const marcasShechema=new mongoose.Schema({
    nombreMarca: { type: String, ref:"nombre marca", required:true },
    descripcionMarca:{ type: String, ref:"descripcion marca", required:true },
    creadorMarca:{ type: String, ref:"creador marca", required:true },
    estado: {type: Number, default: 1},
})

const modelosmarcas = mongoose.model("marcas", marcasShechema )

export default modelosmarcas