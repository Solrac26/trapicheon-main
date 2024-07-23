import etapas from "../modelos/etapas.js";

const helpersetapas={
    existeetapas:async (nombreE) => {
        const existe = await etapas.findById(nombreE)

        if (!existe) {
            throw new Error(`El nombre de la etapa no existe ${nombreE}`)
        }
    },

    existedescripcion:async (descripcionEtapa) => {
        const existe = await etapas.findById(descripcionEtapa)

        if (!existe) {
            throw new Error(`La descripcion de la etapa no existe ${descripcionEtapa}`)
        }
    },
}

export default helpersetapas