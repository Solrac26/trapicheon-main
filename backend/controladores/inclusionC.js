// INCLUSION DE DATOS (COSTOS)

import modeloCostos from "../modelos/inclusionC.js";

const costoshttp= {

  costosget:async(req,res) => {
      const costos= await modeloCostos.find() 
      res.json({costos: costos})
  },

  costosPost : async (req, res) => {
    const { codigo, costo } = req.body;
    const datos_CS = new modeloCostos({ codigo, costo });
    await datos_CS.save();
    res.json({
      msg: "Ingreso de producto exitoso",
    });
  },

  costosPut : async (req, res) => {
    const { codigo, costo } = req.query;
    const datos_CS = await modeloCostos.findOneAndUpdate({ codigo, costo });
    res.json({ " Costo actualizado ": datos_CS });
  },
  
  costosDelete : async (req, res) => {
    const { codigo, costo } = req.query;
    const datos_CS = await modeloCostos.findOnedDelete({ codigo, costo });
  
    res.json({ " Informacion eliminada ": datos_CS });
  }
}

export default costoshttp
