import mongoose from "mongoose";

const bodegasIShechema= new mongoose.Schema({
    nombreBodega:{type:String, ref:"nombreB", required:true},
    contentBodega:{type:String, ref:"contenido", required:true},
    adminBodega:{type:String, ref:"administrador de la bodega", required:true},
    extensionBodega:{type:String, ref:"extension de la bodega", required:true},
    direccion: {type:String, ref:"direccion", required:true},
    estado:{ type: Number, default: 1}
}) 

const modelosbodegasI = mongoose.model("bodegasI", bodegasIShechema )
export default modelosbodegasI