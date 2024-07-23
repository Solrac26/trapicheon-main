import modelosmateriaprimaC from "../modelos/materiaprimaC.js";

const materiaprimaChttp= {

  materiaprimaCget : async (req, res) => {
    const materiaprimaC = await modelosmateriaprimaC.find();
    res.json( materiaprimaC
    );
  },

  materiaprimaCpost : async (req, res) => {
    const { tipoUnidadMedida, cantidadMP, lote, fecha } = req.body;
    const materiaprimaC = new modelosmateriaprimaC({
      tipoUnidadMedida, cantidadMP, lote, fecha });

    await materiaprimaC.save();
    res.json({
      materiaprimaC
    });
  },


  materiaprimaCSearchForTextGet: async (req, res) => {
    const { tipoUnidadMedida, cantidadMP, lote, fecha } = req.query;
    const materiaprimaC = await modelosmateriaprimaC.find({ tipoUnidadMedida, cantidadMP, lote, fecha });
    res,json({
      materiaprimaC, 
    });
  },


  materiaprimaCput: async (req, res) => {
    const {id} = req.params
    const { tipoUnidadMedida, cantidadMP, lote, fecha } = req.body;
    console.log (req.body);
    const materiaprimaC = await modelosmateriaprimaC.findByIdAndUpdate(id, {
      tipoUnidadMedida, cantidadMP, lote, fecha });
    await materiaprimaC.save();
    res.send(materiaprimaC);
  },


  materiaprimaCInactivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const materiaprimaC = await modelosmateriaprimaC.findByIdAndUpdate(id, {estado: 0});
    res.send(materiaprimaC);
  },

  materiaprimaCActivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const materiaprimaC = await modelosmateriaprimaC.findByIdAndUpdate(id, {estado: 1});
    res.send(materiaprimaC);
  },
  
  materiaprimaCDelete: async (req, res) => {
    const {tipoUnidadMedida, cantidadMP, lote, fecha} = req.query;
    const materiaprimaC = await modelosmateriaprimaC.findOneAndDelete({
      tipoUnidadMedida, cantidadMP, lote, fecha  });
    res.json({ "Materia prima eliminada": materiaprimaC });
  }
}

export default materiaprimaChttp