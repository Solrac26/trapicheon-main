import mongoose from "mongoose";

const LoginSchema= new mongoose.Schema({
    usuario: { type:String, required:true},
    contrasena:{  type:String},
})

const modeloslogin = mongoose.model("login", LoginSchema )

export default modeloslogin