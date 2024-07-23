import mongoose from "mongoose";

 const conexion =() =>{

    try {
        mongoose.connect("mongodb+srv://karol26:karol26_@bspanelero.0ka39by.mongodb.net/bspanelero")
    console.log("Successful connection")
    } catch (error) {
        console.log(error)
    }
 }  
    
export default conexion