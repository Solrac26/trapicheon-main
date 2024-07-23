import bodegasI from "../modelos/bodegasI.js";

const helpersbodegasI={
    existebodegaI:async (nombreBodega) => {
        const existe = await bodegasI.findById(nombreBodega)

        if (!existe) {
            throw new Error(`El nombre de la bodega no existe ${nombreBodega}`)
        }
    },

    existecontenido:async (contentBodega) => {
        const existe = await bodegasI.findById(contentBodega)

        if (!existe) {
            throw new Error(`El contenido no existe ${contentBodega}`)
        }
    },
    
    existeadministrador:async (adminBodega) => {
        const existe = await bodegasI.findById(adminBodega)

        if (!existe) {
            throw new Error(`El administrador no existe ${adminBodega}`)
        }
    },

    existeextension:async (extensionBodega) => {
        const existe = await bodegasI.findById(extensionBodega)

        if (!existe) {
            throw new Error(`La extension no existe ${extensionBodega}`)
        }
    },

    existedireccion:async (direccion) => {
        const existe = await bodegasI.findById(direccion)

        if (!existe) {
            throw new Error(`La direccion no existe ${direccion}`)
        }
    },
}

export default helpersbodegasI