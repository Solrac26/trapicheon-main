import modelosLabores from "../modelos/labores.js";

const laboreshttp= {

  laboresget : async (req, res) => {
    const labores = await modelosLabores.find();
    res.json( labores
    );
  },

  laborespost : async (req, res) => {
    const { nombreLabor, areaRealizar, pagoDiario } = req.body;
    const labores = new modelosLabores({
      nombreLabor, areaRealizar, pagoDiario
    });

    await labores.save();
    res.json({
      labores
    });
  },


  laboresSearchForTextGet: async (req, res) => {
    const { nombreLabor, areaRealizar, pagoDiario } = req.query;
    const labores = await modelosLabores.find({ nombreLabor, areaRealizar, pagoDiario });
    res,json({
      labores, 
    });
  },


  laboresput: async (req, res) => {
    const {id} = req.params
    const { nombreLabor, areaRealizar, pagoDiario } = req.body;
    console.log (req.body);
    const labores = await modelosLabores.findByIdAndUpdate(id, {
      nombreLabor, areaRealizar, pagoDiario
     });
    await labores.save();
    res.send(labores);
  },


  laboresInactivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const labores = await modelosLabores.findByIdAndUpdate(id, {estado: 0});
    res.send(labores);
  },

  laboresActivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const labores = await modelosLabores.findByIdAndUpdate(id, {estado: 1});
    res.send(labores);
  },
  
  laboresDelete: async (req, res) => {
    const {nombreLabor, areaRealizar, pagoDiario} = req.query;
    const labores = await modelosLabores.findOneAndDelete({
      nombreLabor, areaRealizar, pagoDiario
    });
    res.json({ "Labor eliminada": labores });
  }
}

export default laboreshttp