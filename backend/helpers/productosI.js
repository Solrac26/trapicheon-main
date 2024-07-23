import productosI from "../modelos/productosI.js";

const helpersproductosI={
    existeproductoI:async (nombreProducto) => {
        const existe = await productosI.findById(nombreProducto)

        if (!existe) {
            throw new Error(`El nombre de el producto no existe ${nombreProducto}`)
        }
    },

    existenombreProducto:async (nombreProducto) => {
        const existe = await productosI.findById(nombreProducto)

        if (!existe) {
            throw new Error(`El nombre del producto no existe ${nombreProducto}`)
        }
    },

    existemarca:async (nombreMarca) => {
        const existe = await productosI.findById(nombreMarca)

        if (!existe) {
            throw new Error(`La marca no existe ${nombreMarca}`)
        }
    },

    existecategoria:async (categoriaProducto) => {
        const existe = await productosI.findById(categoriaProducto)

        if (!existe) {
            throw new Error(`La categoria no existe ${categoriaProducto}`)
        }
    },

    existecantidad:async (cantidadProducto) => {
        const existe = await productosI.findById(cantidadProducto)

        if (!existe) {
            throw new Error(`La cantidad no existe ${cantidadProducto}`)
        }
    },

    existefecha:async (fecha) => {
        const existe = await productosI.findById(fecha)

        if (!existe) {
            throw new Error(`la fecha no existe ${fecha}`)
        }
    },

    existetiempo_vida:async (tiempoVidaUtil) => {
        const existe = await productosI.findById(tiempoVidaUtil)

        if (!existe) {
            throw new Error(`El tiempo de vida util no existe ${tiempoVidaUtil}`)
        }
    },

}

export default helpersproductosI