import modelosempacados from "../modelos/empacados.js";

const empacadoshttp= {

  empacadosget : async (req, res) => {
    const empacados = await modelosempacados.find();
    res.json( empacados
    );
  },

  empacadospost : async (req, res) => {
    const { codigoBodega, tipoEmpaque, tipoPanela, formaPanela, totalPanelas } = req.body;
    const empacados = new modelosempacados({
      codigoBodega, tipoEmpaque, tipoPanela, formaPanela, totalPanelas
    });

    await empacados.save();
    res.json({
      empacados
    });
  },


  empacadosSearchForTextGet: async (req, res) => {
    const { codigoBodega, tipoEmpaque, tipoPanela, formaPanela, totalPanelas } = req.query;
    const empacados = await modelosempacados.find({ codigoBodega, tipoEmpaque, tipoPanela, formaPanela, totalPanelas });
    res,json({
      empacados, 
    });
  },


  empacadosput: async (req, res) => {
    const {id} = req.params
    const { codigoBodega, tipoEmpaque, tipoPanela, formaPanela, totalPanelas } = req.body;
    console.log (req.body);
    const empacados = await modelosempacados.findByIdAndUpdate(id, {
      codigoBodega, tipoEmpaque, tipoPanela, formaPanela, totalPanelas
     });
    await empacados.save();
    res.send(empacados);
  },


  empacadosInactivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const empacados = await modelosempacados.findByIdAndUpdate(id, {estado: 0});
    res.send(empacados);
  },

  empacadosActivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const empacados = await modelosempacados.findByIdAndUpdate(id, {estado: 1});
    res.send(empacados);
  },
  
  empacadosDelete: async (req, res) => {
    const {codigoBodega, tipoEmpaque, tipoPanela, formaPanela, totalPanelas} = req.query;
    const empacados = await modelosempacados.findOneAndDelete({
      codigoBodega, tipoEmpaque, tipoPanela, formaPanela, totalPanelas });
    res.json({ "Empacado eliminado": empacados });
  }
}

export default empacadoshttp