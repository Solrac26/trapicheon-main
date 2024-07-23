import modelosmarcas from "../modelos/marcas.js";

const marcashttp= {

  marcasget : async (req, res) => {
    const marcas = await modelosmarcas.find();
    res.json( marcas
    );
  },

  marcaspost : async (req, res) => {
    const { nombreMarca, descripcionMarca, creadorMarca } = req.body;
    const marcas = new modelosmarcas({
        nombreMarca, descripcionMarca, creadorMarca });

    await marcas.save();
    res.json({
      marcas
    });
  },


  marcasSearchForTextGet: async (req, res) => {
    const { nombreMarca, descripcionMarca, creadorMarca } = req.query;
    const marcas = await modelosmarcas.find({ nombreMarca, descripcionMarca, creadorMarca});
    res,json({
      marcas, 
    });
  },


  marcasput: async (req, res) => {
    const {id} = req.params
    const { nombreMarca, descripcionMarca, creadorMarca } = req.body;
    console.log (req.body);
    const marcas = await modelosmarcas.findByIdAndUpdate(id, {
        nombreMarca, descripcionMarca, creadorMarca     });
    await marcas.save();
    res.send(marcas);
  },


  marcasInactivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const marcas = await modelosmarcas.findByIdAndUpdate(id, {estado: 0});
    res.send(marcas);
  },

  marcasActivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const marcas = await modelosmarcas.findByIdAndUpdate(id, {estado: 1});
    res.send(marcas);
  },
  
  marcasDelete: async (req, res) => {
    const {nombreMarca, descripcionMarca, creadorMarca} = req.query;
    const marcas = await modelosmarcas.findOneAndDelete({
        nombreMarca, descripcionMarca, creadorMarca    });
    res.json({ "Marca eliminada": marcas });
  }
}

export default marcashttp