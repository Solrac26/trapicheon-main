import materiaprimaC from "../modelos/materiaprimaC.js";

const helpersmateriaprimaC={
    existemateriaprimaC:async (tipoUnidadMedida) => {
        const existe = await materiaprimaC.findById(tipoUnidadMedida)

        if (!existe) {
            throw new Error(`El tipo Unidad de Medida no existe ${tipoUnidadMedida}`)
        }
    },
    
    existecantidadMP:async (cantidadMP) => {
        const existe = await materiaprimaC.findById(cantidadMP)

        if (!existe) {
            throw new Error(`La cantidad MP no existe ${cantidadMP}`)
        }
    },

    existelote:async (lote) => {
        const existe = await materiaprimaC.findById(lote)

        if (!existe) {
            throw new Error(`El lote no existe ${lote}`)
        }
    },

    existefecha:async (fecha) => {
        const existe = await materiaprimaC.findById(fecha)

        if (!existe) {
            throw new Error(`La fecha no existe ${fecha}`)
        }
    },
}

export default helpersmateriaprimaC