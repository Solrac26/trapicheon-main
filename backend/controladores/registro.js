import modeloRegistro from "../modelos/registro.js";

const registrohttp= {
  
  registroGetListar:async(req,res) => {
      const registro= await modeloRegistro.find() 
      res.json({registro: registro})
  },

  registroIdGet : async (req, res) => {
    const { id, nombre, fecha, accion } = req.params;
    const registro = await modeloRegistro.findById(id, nombre, fecha, accion);
    res.json({
      registro,
    });
  },

  registroPost : async (req, res) => {


    const { id, nombre, fecha, accion } = req.body;
    const registro = new modeloRegistro({ id, nombre, fecha, accion });
    await registro.save();
    res.json({
      msg: "Registrado",
    });
  },

  registroGetBuscar : async (req, res) => {
    const { id, nombre, fecha, accion } = req.query;
    const registro = await modeloRegistro.find({ id, nombre, fecha, accion });
    res.json({
      registro,
    });
  },

  registroDelete : async (req, res) => {
    const { id, nombre, fecha, accion } = req.query;
    const registro = await modeloRegistro.findOneAndDelete({
      id, nombre, fecha, accion,
    });
    res.json({ "Registro eliminado": registro });
  }
}
export default registrohttp
