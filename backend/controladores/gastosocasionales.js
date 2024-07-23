import modelosgastosocasionales from "../modelos/gastosocasionales.js";

const gastosocasionaleshttp = {

  gastosocasionalesget: async (req, res) => {
    const gastosocasionales = await modelosgastosocasionales.find();
    res.json( gastosocasionales
    );
  },

  gastosocasionalespost: async (req, res) => {
    const { nombreGastoOcas, finca, descripcionOcas, fechaPagosOcas, metodPagosOcas, valorGOcas} = req.body;
    const gastosocasionales = new modelosgastosocasionales({ 
      nombreGastoOcas, finca, descripcionOcas, fechaPagosOcas, metodPagosOcas, valorGOcas
    });

    await gastosocasionales.save();
    res.json({
      gastosocasionales,
    })
  },

  gastosocasionalesSearchForTextGet: async (req, res) => {
    const { nombreGastoOcas, finca, descripcionOcas, fechaPagosOcas, metodPagosOcas, valorGOcas} = req.query;
    const gastosocasionales = await modelosgastosocasionales.find({nombreGastoOcas, finca, descripcionOcas, fechaPagosOcas, metodPagosOcas, valorGOcas });
    res,json({
      gastosocasionales, 
    });
  },

  gastosocasionalesput: async (req, res) => {
    const {id} = req.params
    const { nombreGastoOcas, finca, descripcionOcas, fechaPagosOcas, metodPagosOcas, valorGOcas } = req.body;
    console.log (req.body);
    const gastosocasionales = await modelosgastosocasionales.findByIdAndUpdate(id, {
      nombreGastoOcas, finca, descripcionOcas, fechaPagosOcas, metodPagosOcas, valorGOcas
     });
    await gastosocasionales.save();
    res.send(gastosocasionales);
  },

  gastosocasionalesInactivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const gastosocasionales = await modelosgastosocasionales.findByIdAndUpdate(id, {estado: 0});
    res.send(gastosocasionales);
  },

  gastosocasionalesActivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const gastosocasionales = await modelosgastosocasionales.findByIdAndUpdate(id, {estado: 1});
    res.send(gastosocasionales);
  },

  gastosocasionalesDelete: async (req, res) => {
    const {nombreGastoOcas, finca, descripcionOcas, fechaPagosOcas, metodPagosOcas, valorGOcas} = req.query;
    const gastosocasionales = await modelosgastosocasionales.findOneAndDelete({
      nombreGastoOcas, finca, descripcionOcas, fechaPagosOcas, metodPagosOcas, valorGOcas
    });
    res.json({ "Gasto ocacional eliminado": gastosocasionales });
  }
}


export default gastosocasionaleshttp;