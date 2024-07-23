import labores from "../modelos/labores.js";

const helperslabores={
    existelabor:async (nombreLabor) => {
        const existe = await labores.findById(nombreLabor)

        if (!existe) {
            throw new Error(`El nombre de la labor no existe ${nombreLabor}`)
        }
    },

    existearea:async (areaRealizar) => {
        const existe = await labores.findById(areaRealizar)

        if (!existe) {
            throw new Error(`El area a realizar no existe ${areaRealizar}`)
        }
    },
    
    existepago:async (pagoDiario) => {
        const existe = await labores.findById(pagoDiario)

        if (!existe) {
            throw new Error(`El pago no existe ${pagoDiario}`)
        }
    },
}

export default helperslabores