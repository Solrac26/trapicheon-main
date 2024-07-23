import modelosempaques from "../modelos/empaques.js";

const empaqueshttp= {

  empaquesget : async (req, res) => {
    const empaques = await modelosempaques.find();
    res.json( empaques
    );
  },

  empaquespost : async (req, res) => {
    const { nombreEmpaque, numEmpaque } = req.body;
    const empaques = new modelosempaques({
        nombreEmpaque, numEmpaque
    });

    await empaques.save();
    res.json({
      empaques
    });
  },


  empaquesSearchForTextGet: async (req, res) => {
    const { nombreEmpaque, numEmpaque } = req.query;
    const empaques = await modelosempaques.find({ nombreEmpaque, numEmpaque });
    res,json({
      empaques, 
    });
  },


  empaquesput: async (req, res) => {
    const {id} = req.params
    const { nombreEmpaque, numEmpaque } = req.body;
    console.log (req.body);
    const empaques = await modelosempaques.findByIdAndUpdate(id, {
        nombreEmpaque, numEmpaque
     });
    await empaques.save();
    res.send(empaques);
  },


  empaquesInactivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const empaques = await modelosempaques.findByIdAndUpdate(id, {estado: 0});
    res.send(empaques);
  },

  empaquesActivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const empaques = await modelosempaques.findByIdAndUpdate(id, {estado: 1});
    res.send(empaques);
  },
  
  empaquesDelete: async (req, res) => {
    const {nombreEmpaque, numEmpaque} = req.query;
    const empaques = await modelosempaques.findOneAndDelete({
        nombreEmpaque, numEmpaque
    });
    res.json({ "Empaque eliminado": empaques });
  }
}

export default empaqueshttp