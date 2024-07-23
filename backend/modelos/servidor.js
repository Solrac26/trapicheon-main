import cors from 'cors';
import express from "express";

import conexion from "../baseDeDatos/configuracion.js";

import rutasbodegas from "../rutas/bodegas.js";
import rutasclientes from "../rutas/clientes.js";
import rutasconsultaI from "../rutas/consultaI.js";
import rutasinclusionC from "../rutas/inclusionC.js";
import rutasinclusionI from "../rutas/inlcusionI.js";
import rutasinventario from "../rutas/inventario.js";
import rutaslogin from "../rutas/login.js";
import rutaslotes from "../rutas/lotes.js";
import rutasproveedores from "../rutas/proveedores.js";
import rutasregistro from "../rutas/registro.js";
import rutasusuarios from "../rutas/usuarios.js";
import rutaseps from '../rutas/eps.js';
import rutaslabores from '../rutas/labores.js';
import rutaspagosM from '../rutas/pagosM.js';
import rutasuMedida from '../rutas/uMedida.js';
import rutastiposdocumento from '../rutas/tipodocumento.js';
import rutasgastosmensuales from '../rutas/gastosmensuales.js';
import rutasgastosocasionales from '../rutas/gastosocasionales.js';
import rutaspedidos from '../rutas/pedidos.js';
import rutasprocesosdiarios from '../rutas/procesosdiarios.js';
import rutasmateriaprimaC from '../rutas/materiaprimaC.js';
import rutasempacados from '../rutas/empacados.js';
import rutasbodegasI from '../rutas/bodegasI.js';
import rutasmarcas from '../rutas/marcas.js';
import rutascategoriasI from '../rutas/categoriasI.js';
import rutasproductosI from '../rutas/productosI.js';
import rutasetapas from '../rutas/etapas.js';
import rutasfincas from '../rutas/fincas.js';
import rutasempaques from '../rutas/empaques.js';
import rutaspagosC from '../rutas/pagosC.js'

class servidor {
    constructor(){
        this.app=express()
        this.app.use(express.json())
        this.app.use(cors());
        this.app.use(express.static('public'))
        this.conexion()
        this.rutas()
    }
    async conexion(){
        await conexion()
    }
    rutas(){
        this.app.use("/api/bodegas", rutasbodegas)
        this.app.use("/api/clientes", rutasclientes)
        this.app.use("/api/consultaI", rutasconsultaI)
        this.app.use("/api/inclusionC", rutasinclusionC)
        this.app.use("/api/inclusionI", rutasinclusionI)
        this.app.use("/api/inventario", rutasinventario)
        this.app.use("/api/login", rutaslogin)
        this.app.use("/api/lotes", rutaslotes)
        this.app.use("/api/proveedores", rutasproveedores)
        this.app.use("/api/registro", rutasregistro)
        this.app.use("/api/eps", rutaseps)
        this.app.use("/api/labores", rutaslabores)
        this.app.use("/api/pagosM", rutaspagosM)
        this.app.use("/api/uMedida", rutasuMedida)
        this.app.use("/api/tipodocumento", rutastiposdocumento)
        this.app.use("/api/gastosmensuales", rutasgastosmensuales)
        this.app.use("/api/gastosocasionales", rutasgastosocasionales)
        this.app.use("/api/pedidos", rutaspedidos)
        this.app.use("/api/procesosdiarios", rutasprocesosdiarios)
        this.app.use("/api/materiaprimaC", rutasmateriaprimaC)
        this.app.use("/api/empacados", rutasempacados)
        this.app.use("/api/bodegasI", rutasbodegasI)
        this.app.use("/api/marcas", rutasmarcas)
        this.app.use("/api/categoriasI", rutascategoriasI)
        this.app.use("/api/productosI", rutasproductosI)
        this.app.use("/api/etapas", rutasetapas)
        this.app.use("/api/fincas", rutasfincas)
        this.app.use("/api/empaques", rutasempaques)
        this.app.use("/api/pagosC", rutaspagosC)
        this.app.use("/api/usuario", rutasusuarios)

        this.app.use("/api", (req,res) =>{
            res.send("Hello World")
        })
    }
    listen(){
        this.app.listen(4100,()=>{
            console.log("Escuchando puerto 4100 ")
        })
    }
}

export default servidor