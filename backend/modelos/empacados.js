import mongoose from "mongoose";

const empacadosShechema= new mongoose.Schema({
    codigoBodega:{type:String, ref:"codigo bodega", required:true},
    tipoEmpaque:{type:String, ref:"tipo empaque", required:true},
    tipoPanela:{type:String, ref:"forma panela", required:true},
    formaPanela:{type:String, ref:"tipo panela", required:true},
    totalPanelas:{type:String, ref:"total panelas", required:true},
    estado: {type: Number, default: 1},
})

const modelosempacados = mongoose.model("empacados", empacadosShechema )

export default modelosempacados