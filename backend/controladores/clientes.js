// INGRESO CLIENTES

import modeloClientes from "../modelos/clientes.js";

const clienteshttp= {
  
  clientesget:async(req,res) => {
      const clientes= await modeloClientes.find() 
      res.json({clientes: clientes})
  },

  clientesPost : async (req, res) => {
    const { cedula, nombre, direccion, ciudad, telefono } = req.body;
    const i_clientes = new modeloClientes({
      cedula, nombre, direccion, ciudad, telefono,
    });
    await i_clientes.save();
    res.json({
      i_clientes,
    })
  },

  clientesDelete : async (req, res) => {
    const { cedula, nombre, direccion, ciudad, telefono } = req.query;
    const clientes = await modeloClientes.findOneAndDelete({
      cedula, nombre, direccion, ciudad, telefono,
    });
    res.json({ " Cliente eliminado ": clientes });
  },
  
  clientesPut : async (req, res) => {
    const { cedula, nombre, direccion, ciudad, telefono } = req.query;
    const clientes = await modeloClientes.findOneAndUpdate({
      cedula, nombre, direccion, ciudad, telefono,
    });
    res.json({ " Cliente actualizado ": clientes });
  }
}

export default clienteshttp