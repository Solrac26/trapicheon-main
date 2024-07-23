// INVENTARIO

import modeloInventario from "../modelos/inventario.js";

const inventariohttp= {

  inventariogetListar:async(req,res) => {
      const inventario= await modeloInventario.find() 
      res.json({inventario: inventario})
  },

  inventarioIdGet : async (req, res) => {
    const { codigo, nombreAr, cantidad, n_entradas, n_salidas, precio } = req.params;
    const inventario = await modeloInventario.findById(
      codigo, nombreAr, cantidad, n_entradas, n_salidas, precio
    );
    res.json({
      inventario,
    });
  },

  inventarioPost : async (req, res) => {
    const { codigo, nombreAr, cantidad, n_entradas, n_salidas, precio } = req.body;
    const inventario = new modeloInventario({
      codigo, nombreAr, cantidad, n_entradas, n_salidas, precio,
    });
    await inventario.save();
    res.json({
      msg: "Inventario registrado",
    });
  },

  inventarioGetBuscar : async (req, res) => {
    const { codigo, nombreAr, cantidad, n_entradas, n_salidas, precio } = req.query;
    const inventario = await modeloInventario.find({
      codigo, nombreAr, cantidad, n_entradas, n_salidas, precio,
    });
    res.json({
      inventario,
    });
  },
  
  inventarioDelete : async (req, res) => {
    const { codigo, nombreAr, cantidad, n_entradas, n_salidas, precio } = req.query;
    const inventario = await modeloInventario.findOneAndDelete({
      codigo, nombreAr, cantidad, n_entradas, n_salidas, precio,
    });
    res.json({ "Inventario eliminado": inventario });
  }
}

export default inventariohttp