// INGRESO DE PROVEEDORES

import modeloproveedores from "../modelos/proveedores.js";

const proveedoreshttp={
  
  ProveePost : async (req, res) => {
    const { cedula, nombre, producto, direccion, ciudad, telefono, ncbancaria } =
      req.body;
    const ing_provee = new modeloproveedores({
      cedula, nombre, producto, direccion, ciudad, telefono, ncbancaria,
    });
    await ing_provee.save();
  
    res.json({
      msg: "Ingreso de proveedor exitoso",
    });
  },

  ProveeActualizarPut : async (req, res) => {
    const { cedula, nombre, producto, direccion, ciudad, telefono, ncbancaria } =
      req.query;
    const ing_provee = await modeloproveedores.findOneAndUpdate({
      cedula, nombre, producto, direccion, ciudad, telefono, ncbancaria,
    });
  
    res.json({ " Proveedor actualizado ": ing_provee });
  },

  proveeDelete : async (req, res) => {
    const { cedula, nombre, producto, direccion, ciudad, telefono, ncbancaria } =
      req.query;
    const ing_provee = await modeloproveedores.findOnedDelete({
      cedula, nombre, producto, direccion, ciudad, telefono, ncbancaria,
    });
  
    res.json({ " Proveedor eliminado ": ing_provee });
  },

  ProveeGet : async (req, res) => {
    const ing_provee = await modeloproveedores.find(
      ({ cedula, nombre, producto, direccion, ciudad, telefono, ncbancaria } = req.query)
    );
    res.json({
      ing_provee,
    });
  },

}

export default proveedoreshttp