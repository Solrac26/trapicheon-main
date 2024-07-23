import modelospagosC from "../modelos/pagosC.js";

const pagosChttp= {

  pagosCget : async (req, res) => {
    const pagosC = await modelospagosC.find();
    res.json( pagosC
    );
  },

  pagosCpost : async (req, res) => {
    const { cedula, rolPagos, conceptoPagos, fechaPagos, tiempoPagos, metodPagos } = req.body;
    const pagosC = new modelospagosC({
        cedula, rolPagos, conceptoPagos, fechaPagos, tiempoPagos, metodPagos });

    await pagosC.save();
    res.json({
      pagosC
    });
  },


  pagosCSearchForTextGet: async (req, res) => {
    const { cedula, rolPagos, conceptoPagos, fechaPagos, tiempoPagos, metodPagos } = req.query;
    const pagosC = await modelospagosC.find({ 
        cedula, rolPagos, conceptoPagos, fechaPagos, tiempoPagos, metodPagos });
    res,json({
      pagosC, 
    });
  },


  pagosCput: async (req, res) => {
    const {id} = req.params
    const { cedula, rolPagos, conceptoPagos, fechaPagos, tiempoPagos, metodPagos } = req.body;
    console.log (req.body);
    const pagosC = await modelospagosC.findByIdAndUpdate(id, {
        cedula, rolPagos, conceptoPagos, fechaPagos, tiempoPagos, metodPagos });
    await pagosC.save();
    res.send(pagosC);
  },


  pagosCInactivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const pagosC = await modelospagosC.findByIdAndUpdate(id, {estado: 0});
    res.send(pagosC);
  },

  pagosCActivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const pagosC = await modelospagosC.findByIdAndUpdate(id, {estado: 1});
    res.send(pagosC);
  },
  
  pagosCDelete: async (req, res) => {
    const {cedula, rolPagos, conceptoPagos, fechaPagos, tiempoPagos, metodPagos} = req.query;
    const pagosC = await modelospagosC.findOneAndDelete({
        cedula, rolPagos, conceptoPagos, fechaPagos, tiempoPagos, metodPagos });
    res.json({ "Pago eliminado": pagosC });
  }
}

export default pagosChttp