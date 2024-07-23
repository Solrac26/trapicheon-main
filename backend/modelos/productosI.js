import mongoose from "mongoose";

const productosIShechema=new mongoose.Schema({
    nombreProducto: { type: String, ref:"nombre producto", required:true },
    nombreMarca:{ type: String, ref:"nombre marca", required:true },
    categoriaProducto:{ type: String, ref:"categoria producto", required:true },
    cantidadProducto:{ type: String, ref:"cantidad producto", required:true },
    fecha:{ type: String, ref:"fecha", required:true },
    tiempoVidaUtil:{ type: String, ref:"tiempo vida util", required:true },
    estado: {type: Number, default: 1},
})

const modelosproductosI = mongoose.model("productosI", productosIShechema )

export default modelosproductosI