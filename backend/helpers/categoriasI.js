import categoriasI from "../modelos/categoriasI.js";

const helperscategoriasI={
    existecategoriaI:async (nombreCategoria) => {
        const existe = await categoriasI.findById(nombreCategoria)

        if (!existe) {
            throw new Error(`El nombre de la categoria no existe ${nombreCategoria}`)
        }
    },

    existedescripcion:async (descripcionCategoria) => {
        const existe = await categoriasI.findById(descripcionCategoria)

        if (!existe) {
            throw new Error(`La descripcion no existe ${descripcionCategoria}`)
        }
    },
}

export default helperscategoriasI