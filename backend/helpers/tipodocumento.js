import tipodocumento from "../modelos/tipodocumento.js";

const helperstipodocumento={
    existetipodocumento:async (tipoDocumento) => {
        const existe = await tipodocumento.findById(tipoDocumento)

        if (!existe) {
            throw new Error(`El tipo de documento no existe ${tipoDocumento}`)
        }
    },

    existenumero:async (numDocumento) => {
        const existe = await tipodocumento.findById(numDocumento)

        if (!existe) {
            throw new Error(`El numero de documento no existe ${numDocumento}`)
        }
    },
}

export default helperstipodocumento