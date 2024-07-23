import modelosgastosmensuales from "../modelos/gastosmensuales.js";

const gastosmensualeshttp = {

  gastosmensualesget: async (req, res) => {
    const gastosmensuales = await modelosgastosmensuales.find();
    res.json( gastosmensuales
    );
  },

  gastosmensualespost: async (req, res) => {
    const { nombreGastoMens, finca, descripcionMens, fechaPagosMens, metodPagosMens, valorGmensual  } = req.body;
    const gastosmensuales = new modelosgastosmensuales({ 
      nombreGastoMens, finca, descripcionMens, fechaPagosMens, metodPagosMens, valorGmensual
    });

    await gastosmensuales.save();
    res.json({
      gastosmensuales,
    })
  },

  gastosmensualesSearchForTextGet: async (req, res) => {
    const { nombreGastoMens, finca, descripcionMens, fechaPagosMens, metodPagosMens, valorGmensual } = req.query;
    const gastosmensuales = await modelosgastosmensuales.find({  nombreGastoMens, finca, descripcionMens, fechaPagosMens, metodPagosMens, valorGmensual  });
    res,json({
      gastosmensuales, 
    });
  },

  gastosmensualesput: async (req, res) => {
    const {id} = req.params
    const {  nombreGastoMens, finca, descripcionMens, fechaPagosMens, metodPagosMens, valorGmensual  } = req.body;
    console.log (req.body);
    const gastosmensuales = await modelosgastosmensuales.findByIdAndUpdate(id, {
      nombreGastoMens, finca, descripcionMens, fechaPagosMens, metodPagosMens, valorGmensual 
     });
    await gastosmensuales.save();
    res.send(gastosmensuales);
  },

  gastosmensualesInactivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const gastosmensuales = await modelosgastosmensuales.findByIdAndUpdate(id, {estado: 0});
    res.send(gastosmensuales);
  },

  gastosmensualesActivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const gastosmensuales = await modelosgastosmensuales.findByIdAndUpdate(id, {estado: 1});
    res.send(gastosmensuales);
  },

  gastosmensualesDelete: async (req, res) => {
    const {nombreGastoMens, finca, descripcionMens, fechaPagosMens, metodPagosMens, valorGmensual} = req.query;
    const gastosmensuales = await modelosgastosmensuales.findOneAndDelete({
      nombreGastoMens, finca, descripcionMens, fechaPagosMens, metodPagosMens, valorGmensual
    });
    res.json({ "Unidad eliminada": gastosmensuales });
  }
}


export default gastosmensualeshttp;