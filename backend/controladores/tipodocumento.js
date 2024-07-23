import modelostipodocumento from "../modelos/tipodocumento.js";

const tipodocumentohttp= {

  tipodocumentoget : async (req, res) => {
    const tipodocumento = await modelostipodocumento.find();
    res.json( tipodocumento
    );
  },

  tipodocumentopost : async (req, res) => {
    const { tipoDocumento, numDocumento } = req.body;
    const tipodocumento = new modelostipodocumento({
      tipoDocumento, numDocumento
    });

    await tipodocumento.save();
    res.json({
      tipodocumento
    });
  },

  tipodocumentoSearchForTextGet: async (req, res) => {
    const { tipoDocumento, numDocumento } = req.query;
    const tipodocumento = await modelostipodocumento.find({ tipoDocumento, numDocumento });
    res,json({
      tipodocumento, 
    });
  },

  tipodocumentoput: async (req, res) => {
    const {id} = req.params
    const { tipoDocumento, numDocumento } = req.body;
    console.log (req.body);
    const tipodocumento = await modelostipodocumento.findByIdAndUpdate(id, {
      tipoDocumento, numDocumento
     });
    await tipodocumento.save();
    res.send(tipodocumento);
  },

  tipodocumentoInactivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const tipodocumento = await modelostipodocumento.findByIdAndUpdate(id, {estado: 0});
    res.send(tipodocumento);
  },

  tipodocumentoActivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const tipodocumento = await modelostipodocumento.findByIdAndUpdate(id, {estado: 1});
    res.send(tipodocumento);
  },
  
  tipodocumentoDelete: async (req, res) => {
    const {  tipoDocumento, numDocumento} = req.query;
    const tipodocumento = await modelostipodocumento.findOneAndDelete({
      tipoDocumento, numDocumento
    });
    res.json({ "Documento eliminado": tipodocumento });
  }
}

export default tipodocumentohttp