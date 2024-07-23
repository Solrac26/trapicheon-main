import modeloscategoriasI from "../modelos/categoriasI.js";

const categoriasIhttp= {

  categoriasIget : async (req, res) => {
    const categoriasI = await modeloscategoriasI.find();
    res.json( categoriasI
    );
  },

  categoriasIpost : async (req, res) => {
    const { nombreCategoria, descripcionCategoria } = req.body;
    const categoriasI = new modeloscategoriasI({
        nombreCategoria, descripcionCategoria });

    await categoriasI.save();
    res.json({
      categoriasI
    });
  },


  categoriasISearchForTextGet: async (req, res) => {
    const { nombreCategoria, descripcionCategoria } = req.query;
    const categoriasI = await modeloscategoriasI.find({ nombreCategoria, descripcionCategoria });
    res,json({
      categoriasI, 
    });
  },


  categoriasIput: async (req, res) => {
    const {id} = req.params
    const { nombreCategoria, descripcionCategoria } = req.body;
    console.log (req.body);
    const categoriasI = await modeloscategoriasI.findByIdAndUpdate(id, {
        nombreCategoria, descripcionCategoria });
    await categoriasI.save();
    res.send(categoriasI);
  },


  categoriasIInactivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const categoriasI = await modeloscategoriasI.findByIdAndUpdate(id, {estado: 0});
    res.send(categoriasI);
  },

  categoriasIActivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const categoriasI = await modeloscategoriasI.findByIdAndUpdate(id, {estado: 1});
    res.send(categoriasI);
  },
  
  categoriasIDelete: async (req, res) => {
    const {nombreCategoria, descripcionCategoria} = req.query;
    const categoriasI = await modeloscategoriasI.findOneAndDelete({
        nombreCategoria, descripcionCategoria
    });
    res.json({ "Categoria eliminada": categoriasI });
  }
}

export default categoriasIhttp