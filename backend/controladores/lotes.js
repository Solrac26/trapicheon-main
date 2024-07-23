import modeloslotes from "../modelos/lotes.js";

const loteshttp= {

  lotesget : async (req, res) => {
    const lotes = await modeloslotes.find();
    res.json( lotes
    );
  },

  lotespost : async (req, res) => {
    const { nombres, Descripcion } = req.body;
    const lotes = new modeloslotes({
      nombres, Descripcion
    });

    await lotes.save();
    res.json({
      lotes
    });
  },


  lotesSearchForTextGet: async (req, res) => {
    const { nombres, Descripcion } = req.query;
    const lotes = await modeloslotes.find({ nombres, Descripcion });
    res,json({
      lotes, 
    });
  },


  lotesput: async (req, res) => {
    const {id} = req.params
    const { nombres, Descripcion } = req.body;
    console.log (req.body);
    const lotes = await modeloslotes.findByIdAndUpdate(id, {
      nombres, Descripcion
     });
    await lotes.save();
    res.send(lotes);
  },


  lotesInactivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const lotes = await modeloslotes.findByIdAndUpdate(id, {estado: 0});
    res.send(lotes);
  },

  lotesActivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const lotes = await modeloslotes.findByIdAndUpdate(id, {estado: 1});
    res.send(lotes);
  },
  
  lotesDelete: async (req, res) => {
    const {nombres, Descripcion} = req.query;
    const lotes = await modeloslotes.findOneAndDelete({
      nombres, Descripcion
    });
    res.json({ "Lote eliminado": lotes });
  }
}

export default loteshttp