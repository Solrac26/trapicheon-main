import procesosdiarios from "../modelos/procesosdiarios.js";

const helpersprocesosdiarios={
    existeprocesosdiarios:async (actividad) => {
        const existe = await procesosdiarios.findById(actividad)

        if (!existe) {
            throw new Error(`La actividad no existe ${actividad}`)
        }
    },
    
    existedescripcionActi:async (descripcionActi) => {
        const existe = await procesosdiarios.findById(descripcionActi)

        if (!existe) {
            throw new Error(`La descripcion de la activdad no existe ${descripcionActi}`)
        }
    },

    existepersonas:async (personas) => {
        const existe = await procesosdiarios.findById(personas)

        if (!existe) {
            throw new Error(`personas no existe ${personas}`)
        }
    },

    existefecha:async (fecha) => {
        const existe = await procesosdiarios.findById(fecha)

        if (!existe) {
            throw new Error(`La fecha no existe ${fecha}`)
        }
    },

    existelote:async (lote) => {
        const existe = await procesosdiarios.findById(lote)

        if (!existe) {
            throw new Error(`El lote no existe ${lote}`)
        }
    },
}

export default helpersprocesosdiarios