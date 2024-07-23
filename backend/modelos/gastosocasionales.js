import mongoose from "mongoose";

const gastosocasionalesShechema= new mongoose.Schema({
    
    nombreGastoOcas:{type:String, required:true},
    finca:{type:String, required:true},
    descripcionOcas:{type:String, required:true},
    fechaPagosOcas:{type:String, required:true},
    metodPagosOcas:{type:String, required:true},
    valorGOcas:{type:String, required:true},
    estado:{type:Number, default:1},
})

const modelosgastosocasionales = mongoose.model("gastosocasionales", gastosocasionalesShechema);

export default modelosgastosocasionales;