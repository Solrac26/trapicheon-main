import modelospedidos from "../modelos/pedidos.js";

const pedidoshttp = {
  pedidosget: async (req, res) => {
    const pedidos = await modelospedidos.find();
    res.json(pedidos);
  },

  pedidospost: async (req, res) => {
    const {
      numeroDocCliente,
      nombreCliente,
      telefonoCliente,
      direccionClien,
      tipoPanela,
      cantidadesPedido,
      tipoEmpaque,
      detallesFactura,
    } = req.body;
    const pedidos = new modelospedidos({
      numeroDocCliente,
      nombreCliente,
      telefonoCliente,
      direccionClien,
      tipoPanela,
      cantidadesPedido,
      tipoEmpaque,
      detallesFactura,
    });

    await pedidos.save();
    res.json({
      pedidos,
    });
  },

  pedidosSearchForTextGet: async (req, res) => {
    const {
      numeroDocCliente,
      nombreCliente,
      telefonoCliente,
      direccionClien,
      tipoPanela,
      cantidadesPedido,
      tipoEmpaque,
      detallesFactura,
    } = req.query;
    const pedidos = await modelospedidos.find({
      numeroDocCliente,
      nombreCliente,
      telefonoCliente,
      direccionClien,
      tipoPanela,
      cantidadesPedido,
      tipoEmpaque,
      detallesFactura,
    });
    res,
      json({
        pedidos,
      });
  },

  pedidosput: async (req, res) => {
    const { id } = req.params;
    const {
      numeroDocCliente,
      nombreCliente,
      telefonoCliente,
      direccionClien,
      tipoPanela,
      cantidadesPedido,
      tipoEmpaque,
      detallesFactura,
    } = req.body;
    console.log(req.body);
    const pedidos = await modelospedidos.findByIdAndUpdate(id, {
      numeroDocCliente,
      nombreCliente,
      telefonoCliente,
      direccionClien,
      tipoPanela,
      cantidadesPedido,
      tipoEmpaque,
      detallesFactura,
    });
    await pedidos.save();
    res.send(pedidos);
  },

  pedidosInactivoput: async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const pedidos = await modelospedidos.findByIdAndUpdate(id, { estado: 0 });
    res.send(pedidos);
  },

  pedidosActivoput: async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const pedidos = await modelospedidos.findByIdAndUpdate(id, { estado: 1 });
    res.send(pedidos);
  },

  pedidosDelete: async (req, res) => {
    const {
      numeroDocCliente,
      nombreCliente,
      telefonoCliente,
      direccionClien,
      tipoPanela,
      cantidadesPedido,
      tipoEmpaque,
      detallesFactura,
    } = req.query;
    const pedidos = await modelospedidos.findOneAndDelete({
      numeroDocCliente,
      nombreCliente,
      telefonoCliente,
      direccionClien,
      tipoPanela,
      cantidadesPedido,
      tipoEmpaque,
      detallesFactura,
    });
    res.json({ "Pedido eliminado": pedidos });
  },
};

export default pedidoshttp;
