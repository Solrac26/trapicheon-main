import uMedida from "../modelos/uMedida.js";

const helpersuMedida={
    existeuMedida:async (nombreU) => {
        const existe = await uMedida.findById(nombreU)

        if (!existe) {
            throw new Error(`El nombre de la unidad no existe ${nombreU}`)
        }
    },

    existeformato:async (formato) => {
        const existe = await uMedida.findById(formato)

        if (!existe) {
            throw new Error(`El formato no existe ${formato}`)
        }
    },
}

export default helpersuMedida