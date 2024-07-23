import lotes from "../modelos/lotes.js";

const helperslotes={
    existelotes:async (nombres) => {
        const existe = await lotes.findById(nombres)

        if (!existe) {
            throw new Error(`El nombre de los lotes no existen ${nombres}`)
        }
    },

    existedescripcion:async (Descripcion) => {
        const existe = await lotes.findById(Descripcion)

        if (!existe) {
            throw new Error(`La Descripcion no existe ${Descripcion}`)
        }
    },
}

export default helperslotes