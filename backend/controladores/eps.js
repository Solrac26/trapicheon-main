import modeloseps from "../modelos/eps.js";

const epshttp= {

  epsget : async (req, res) => {
    const eps = await modeloseps.find();
    res.json( eps
    );
  },

  epspost : async (req, res) => {
    const { nombre, n_linea } = req.body;
    const eps = new modeloseps({
      nombre, n_linea
    });

    await eps.save();
    res.json({
      eps
    });
  },


  epsSearchForTextGet: async (req, res) => {
    const { nombre, n_linea } = req.query;
    const eps = await modeloseps.find({ nombre, n_linea });
    res,json({
      eps, 
    });
  },


  epsput: async (req, res) => {
    const {id} = req.params
    const { nombre, n_linea } = req.body;
    console.log (req.body);
    const eps = await modeloseps.findByIdAndUpdate(id, {
      nombre, n_linea
     });
    await eps.save();
    res.send(eps);
  },


  epsInactivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const eps = await modeloseps.findByIdAndUpdate(id, {estado: 0});
    res.send(eps);
  },

  epsActivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const eps = await modeloseps.findByIdAndUpdate(id, {estado: 1});
    res.send(eps);
  },
  
  epsDelete: async (req, res) => {
    const { nombre, n_linea } = req.query;
    const eps = await modeloseps.findOneAndDelete({
      nombre, n_linea
    });
    res.json({ "EPS eliminada": eps });
  }
}

export default epshttp