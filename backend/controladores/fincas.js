import modelosfincas from "../modelos/fincas.js";

const fincashttp= {

  fincasget : async (req, res) => {
    const fincas = await modelosfincas.find();
    res.json( fincas
    );
  },

  fincaspost : async (req, res) => {
    const { nombreFinca, extensionFinca, nMatriculaFinca } = req.body;
    const fincas = new modelosfincas({
      nombreFinca, extensionFinca, nMatriculaFinca
    });

    await fincas.save();
    res.json({
      fincas
    });
  },


  fincasSearchForTextGet: async (req, res) => {
    const { nombreFinca, extensionFinca, nMatriculaFinca } = req.query;
    const fincas = await modelosfincas.find({ nombreFinca, extensionFinca, nMatriculaFinca });
    res,json({
      fincas, 
    });
  },


  fincasput: async (req, res) => {
    const {id} = req.params
    const { nombreFinca, extensionFinca, nMatriculaFinca } = req.body;
    console.log (req.body);
    const fincas = await modelosfincas.findByIdAndUpdate(id, {
      nombreFinca, extensionFinca, nMatriculaFinca
     });
    await fincas.save();
    res.send(fincas);
  },


  fincasInactivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const fincas = await modelosfincas.findByIdAndUpdate(id, {estado: 0});
    res.send(fincas);
  },

  fincasActivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const fincas = await modelosfincas.findByIdAndUpdate(id, {estado: 1});
    res.send(fincas);
  },
  
  fincasDelete: async (req, res) => {
    const { nombreFinca, extensionFinca, nMatriculaFinca } = req.query;
    const fincas = await modelosfincas.findOneAndDelete({
      nombreFinca, extensionFinca, nMatriculaFinca
    });
    res.json({ "Finca eliminada": fincas });
  }
}

export default fincashttp