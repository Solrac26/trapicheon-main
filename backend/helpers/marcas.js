import marcas from "../modelos/marcas.js"

const helpersmarcas={
    existemarcas:async (nombreMarca) => {
        const existe = await marcas.findById(nombreMarca)

        if (!existe) {
            throw new Error(`El nombre de la marca no existe ${nombreMarca}`)
        }
    },

    existedescripcion:async (descripcionMarca) => {
        const existe = await marcas.findById(descripcionMarca)

        if (!existe) {
            throw new Error(`La descripcion no existe ${descripcionMarca}`)
        }
    },

    existecreador:async (creadorMarca) => {
        const existe = await marcas.findById(creadorMarca)

        if (!existe) {
            throw new Error(`El creador no existe ${creadorMarca}`)
        }
    },
}

export default helpersmarcas