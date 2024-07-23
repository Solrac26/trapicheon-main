import modelosprocesosdiarios from "../modelos/procesosdiarios.js";

const procesosdiarioshttp = {
  procesosdiariosget: async (req, res) => {
    const procesosdiarios = await modelosprocesosdiarios.find();
    res.json(procesosdiarios);
  },

  procesosdiariospost: async (req, res) => {
    const { nombreActi, descripcionActi, horasActi, personas, fecha, lote } = req.body;
    const procesosdiarios = new modelosprocesosdiarios({
      nombreActi,
      descripcionActi,
      horasActi,
      personas,
      fecha,
      lote,
    });

    await procesosdiarios.save();
    res.json({
      procesosdiarios,
    });
  },

  procesosdiariosSearchForTextGet: async (req, res) => {
    const { nombreActi, descripcionActi, horasActi, personas, fecha, lote } = req.query;
    const procesosdiarios = await modelosprocesosdiarios.find({
      nombreActi,
      descripcionActi,
      horasActi,
      personas,
      fecha,
      lote,
    });
    res,
      json({
        procesosdiarios,
      });
  },

  procesosdiariosput: async (req, res) => {
    const { id } = req.params;
    const { nombreActi, descripcionActi, horasActi, personas, fecha, lote } = req.body;
    console.log(req.body);
    const procesosdiarios = await modelosprocesosdiarios.findByIdAndUpdate(id, {
      nombreActi,
      descripcionActi,
      horasActi,
      personas,
      fecha,
      lote,
    });
    await procesosdiarios.save();
    res.send(procesosdiarios);
  },

  procesosdiariosInactivoput: async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const procesosdiarios = await modelosprocesosdiarios.findByIdAndUpdate(id, {
      estado: 0});
    res.send(procesosdiarios);
  },

  procesosdiariosActivoput: async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const procesosdiarios = await modelosprocesosdiarios.findByIdAndUpdate(id, {
      estado: 1});
    res.send(procesosdiarios);
  },

  procesosdiariosDelete: async (req, res) => {
    const { nombreActi, descripcionActi, horasActi, personas, fecha, lote } = req.query;
    const procesosdiarios = await modelosprocesosdiarios.findOneAndDelete({
      nombreActi,
      descripcionActi,
      horasActi,
      personas,
      fecha,
      lote,
    });
    res.json({ "Pedido eliminado": procesosdiarios });
  },
};

export default procesosdiarioshttp;
