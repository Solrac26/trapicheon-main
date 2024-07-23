// CONSULTA DE DATOS (INVENTARIO)

import modelconsulta from "../modelos/consultaI.js";

const consultahttp= {
  
  consultasPost : async (req, res) => {
    const { codigo, fecha_venci, n_stocks, nproductos_acabdos } = req.body;
    const consultas = new modelconsulta({
      codigo, fecha_venci, n_stocks, nproductos_acabdos,
    });
  
    await consultas.save();
    res.json({
      consultas,
    });
  },

  consultasActualizarPut : async (req, res) => {
    const { codigo, fecha_venci, n_stocks, nproductos_acabdos } = req.query;
    const consultas = await modelconsulta.findOneAndUpdate({
      codigo, fecha_venci, n_stocks, nproductos_acabdos,
    });
  
    res.json({ " Consulta actualizada ": consultas });
  },

  consultasGetListar : async (req, res) => {
    const consultas = await modelconsulta.find({});
    res.json({
      consultas,
    });
  },

}

export default consultahttp
