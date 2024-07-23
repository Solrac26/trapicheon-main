import modelosbodegasI from "../modelos/bodegasI.js";

const bodegasIhttp= {

  bodegasIget : async (req, res) => {
    const bodegasI = await modelosbodegasI.find();
    res.json( bodegasI
    );
  },

  bodegasIpost : async (req, res) => {
    const { nombreBodega, contentBodega, adminBodega, extensionBodega, direccion } = req.body;
    const bodegasI = new modelosbodegasI({
        nombreBodega, contentBodega, adminBodega, extensionBodega, direccion    });

    await bodegasI.save();
    res.json({
      bodegasI
    });
  },


  bodegasISearchForTextGet: async (req, res) => {
    const { nombreBodega, contentBodega, adminBodega, extensionBodega, direccion } = req.query;
    const bodegasI = await modelosbodegasI.find({ nombreBodega, contentBodega, adminBodega, extensionBodega, direccion });
    res,json({
      bodegasI, 
    });
  },


  bodegasIput: async (req, res) => {
    const {id} = req.params
    const { nombreBodega, contentBodega, adminBodega, extensionBodega, direccion } = req.body;
    console.log (req.body);
    const bodegasI = await modelosbodegasI.findByIdAndUpdate(id, {
        nombreBodega, contentBodega, adminBodega, extensionBodega, direccion     });
    await bodegasI.save();
    res.send(bodegasI);
  },


  bodegasIInactivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const bodegasI = await modelosbodegasI.findByIdAndUpdate(id, {estado: 0});
    res.send(bodegasI);
  },

  bodegasIActivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const bodegasI = await modelosbodegasI.findByIdAndUpdate(id, {estado: 1});
    res.send(bodegasI);
  },
  
  bodegasIDelete: async (req, res) => {
    const {nombreBodega, contentBodega, adminBodega, extensionBodega, direccion } = req.query;
    const bodegasI = await modelosbodegasI.findOneAndDelete({
        nombreBodega, contentBodega, adminBodega, extensionBodega, direccion    });
    res.json({ "Bodega eliminada": bodegasI });
  }
}

export default bodegasIhttp