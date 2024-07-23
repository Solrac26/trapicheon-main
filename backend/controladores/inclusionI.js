// INCLUSION DE DATOS (INVENTARIO)

import modeloinclusion from "../modelos/inclusionI.js";

const inclusionhttp={

  InclusionPost : async (req, res) => {
    const { codigo, cantidad, precio } = req.body;
    const Inclusion_DI = new modeloinclusion({ 
      codigo, 
      cantidad, 
      precio 
  });
    await Inclusion_DI.save();
  
    res.json({
      msg: "Inclusion de datos exitoso",
    });
  },

  InclusionActualizarPut : async (req, res) => {
    const { codigo, cantidad, precio } = req.query;
    const Inclusion_DI = await modeloinclusion.findOneAndUpdate({
      codigo,
      cantidad,
      precio,
    });
  
    res.json({ "Inclusion actualizada": Inclusion_DI });
  },

  InclusionDelete : async (req, res) => {
    const { codigo, cantidad, precio } = req.query;
    const Inclusion_DI = await modeloinclusion.findOnedDelete({
      codigo,
      cantidad,
      precio,
    });
  
    res.json({ "Inclusion eliminado": Inclusion_DI });
  },

  InclusionGet : async (req, res) => {
    const Inclusion_DI = await modeloinclusion.find(
      ({ codigo, cantidad, precio } = req.query)
    );
    res.json({
      Inclusion_DI,
    });
  },

}

export default inclusionhttp
