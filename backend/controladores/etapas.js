import modelosetapas from "../modelos/etapas.js";

const etapashttp= {

  etapasget : async (req, res) => {
    const etapas = await modelosetapas.find();
    res.json( etapas    );
  },

  etapaspost : async (req, res) => {
    const { nombreE, descripcionEtapa } = req.body;
    const etapas = new modelosetapas({
      nombreE, descripcionEtapa
    });

    await etapas.save();
    res.json({
      etapas
    });
  },


  etapasSearchForTextGet: async (req, res) => {
    const { nombreE, descripcionEtapa } = req.query;
    const labores = await modelosetapas.find({ nombreE, descripcionEtapa });
    res,json({
      labores, 
    });
  },


  etapasput: async (req, res) => {
    const {id} = req.params
    const { nombreE, descripcionEtapa } = req.body;
    console.log (req.body);
    const etapas = await modelosetapas.findByIdAndUpdate(id, {
      nombreE, descripcionEtapa
     });
    await etapas.save();
    res.send(etapas);
  },


  etapasInactivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const etapas = await modelosetapas.findByIdAndUpdate(id, {estado: 0});
    res.send(etapas);
  },

  etapasActivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const etapas = await modelosetapas.findByIdAndUpdate(id, {estado: 1});
    res.send(etapas);
  },
  
  etapasDelete: async (req, res) => {
    const {nombreE, descripcionEtapa} = req.query;
    const etapas = await modelosetapas.findOneAndDelete({
      nombreE, descripcionEtapa
    });
    res.json({ "Etapa eliminada": etapas });
  }
}

export default etapashttp