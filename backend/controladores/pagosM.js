import modelospagos from "../modelos/pagosM.js";

const pagoshttp= {

  pagosget : async (req, res) => {
    const pagos = await modelospagos.find();
    res.json( pagos
    );
  },

  pagospost : async (req, res) => {
    const { codigoPago, nombrePago, tipoPago } = req.body;
    const pagos = new modelospagos({
      codigoPago, nombrePago, tipoPago
    });

    await pagos.save();
    res.json({
      pagos
    });
  },


  pagosSearchForTextGet: async (req, res) => {
    const { codigoPago, nombrePago, tipoPago } = req.query;
    const pagos = await modelospagos.find({ codigoPago, nombrePago, tipoPago });
    res,json({
      pagos, 
    });
  },


  pagosput: async (req, res) => {
    const {id} = req.params
    const { codigoPago, nombrePago, tipoPago } = req.body;
    console.log (req.body);
    const pagos = await modelospagos.findByIdAndUpdate(id, {
      codigoPago, nombrePago, tipoPago
     });
    await pagos.save();
    res.send(pagos);
  },


  pagosInactivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const pagos = await modelospagos.findByIdAndUpdate(id, {estado: 0});
    res.send(pagos);
  },

  pagosActivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const pagos = await modelospagos.findByIdAndUpdate(id, {estado: 1});
    res.send(pagos);
  },
  
  pagosDelete: async (req, res) => {
    const {codigoPago, nombrePago, tipoPago} = req.query;
    const pagos = await modelospagos.findOneAndDelete({
      codigoPago, nombrePago, tipoPago
    });
    res.json({ "Pago eliminado": pagos });
  }
}

export default pagoshttp