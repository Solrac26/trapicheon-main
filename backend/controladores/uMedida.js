import modelosuMedida from "../modelos/uMedida.js";

const uMedidahttp = {
  uMedidaget: async (req, res) => {
    const uMedida = await modelosuMedida.find();
    res.json(uMedida);
  },

  uMedidapost: async (req, res) => {
    const { nombreU, formato } = req.body;
    const uMedida = new modelosuMedida({
      nombreU,
      formato,
    });

    await uMedida.save();
    res.json({
      uMedida,
    });
  },

  uMedidaSearchForTextGen: async (req, res) => {
    const { nombreU, formato } = req.query;
    const uMedida = await modelosuMedida.find({ nombreU, formato });
    res,
      json({
        uMedida,
      });
  },

  uMedidaput: async (req, res) => {
    const { id } = req.params;
    const { nombreU, formato } = req.body;
    console.log(req.body);
    const uMedida = await modelosuMedida.findByIdAndUpdate(id, {
      nombreU,
      formato,
    });
    await uMedida.save();
    res.send(uMedida);
  },

  uMedidaInactivoput: async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const uMedida = await modelosuMedida.findByIdAndUpdate(id, { estado: 0 });
    res.send(uMedida);
  },

  uMedidaActivoput: async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const uMedida = await modelosuMedida.findByIdAndUpdate(id, { estado: 1 });
    res.send(uMedida);
  },

  uMedidaDelete: async (req, res) => {
    const { nombreU, formato } = req.query;
    const uMedida = await modelosuMedida.findOneAndDelete({
      nombreU,
      formato,
    });
    res.json({ "Unidad eliminada": uMedida });
  },
};

export default uMedidahttp;
