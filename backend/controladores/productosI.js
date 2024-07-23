import modelosproductosI from "../modelos/productosI.js";

const productosIhttp= {

  productosIget : async (req, res) => {
    const productosI = await modelosproductosI.find();
    res.json( productosI
    );
  },

  productosIpost : async (req, res) => {
    const { nombreProducto, nombreMarca, categoriaProducto, cantidadProducto, fecha, tiempoVidaUtil } = req.body;
    const productosI = new modelosproductosI({
        nombreProducto, nombreMarca, categoriaProducto, cantidadProducto, fecha, tiempoVidaUtil    });

    await productosI.save();
    res.json({
      productosI
    });
  },


  productosISearchForTextGet: async (req, res) => {
    const { nombreProducto, nombreMarca, categoriaProducto, cantidadProducto, fecha, tiempoVidaUtil } = req.query;
    const productosI = await modelosproductosI.find({ nombreProducto, nombreMarca, categoriaProducto, cantidadProducto, fecha, tiempoVidaUtil });
    res,json({
      productosI, 
    });
  },


  productosIput: async (req, res) => {
    const {id} = req.params
    const { nombreProducto, nombreMarca, categoriaProducto, cantidadProducto, fecha, tiempoVidaUtil } = req.body;
    console.log (req.body);
    const productosI = await modelosproductosI.findByIdAndUpdate(id, {
        nombreProducto, nombreMarca, categoriaProducto, cantidadProducto, fecha, tiempoVidaUtil });
    await productosI.save();
    res.send(productosI);
  },


  productosIInactivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const productosI = await modelosproductosI.findByIdAndUpdate(id, {estado: 0});
    res.send(productosI);
  },

  productosIActivoput: async (req, res) => {
    console.log (req.params);
    const { id } = req.params;
    const productosI = await modelosproductosI.findByIdAndUpdate(id, {estado: 1});
    res.send(productosI);
  },
  
  productosIDelete: async (req, res) => {
    const { nombreProducto, nombreMarca, categoriaProducto, cantidadProducto, fecha, tiempoVidaUtil } = req.query;
    const productosI = await modelosLabores.findOneAndDelete({
        nombreProducto, nombreMarca, categoriaProducto, cantidadProducto, fecha, tiempoVidaUtil });
    res.json({ "Producto eliminado": productosI });
  }
}

export default productosIhttp