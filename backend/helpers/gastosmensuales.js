import gastosmensuales from "../modelos/gastosmensuales.js";

const helpersgastosmensuales={
    existegastomensual:async (nombreGastoMens) => {
        const existe = await gastosmensuales.findById(nombreGastoMens)

        if (!existe) {
            throw new Error(`El nombre del gasto no existe ${nombreGastoMens}`)
        }
    },

    existefinca:async (finca) => {
        const existe = await gastosmensuales.findById(finca)

        if (!existe) {
            throw new Error(`La finca no existe ${finca}`)
        }
    },
    
    existedescripcionMens:async (descripcionMens) => {
        const existe = await gastosmensuales.findById(descripcionMens)

        if (!existe) {
            throw new Error(`La descripcion no existe ${descripcionMens}`)
        }
    },

    existefechaPagosMens:async (fechaPagosMens) => {
        const existe = await gastosmensuales.findById(fechaPagosMens)

        if (!existe) {
            throw new Error(`La fecha no existe ${fechaPagosMens}`)
        }
    },

    existemetodPagosMens:async (metodPagosMens) => {
        const existe = await gastosmensuales.findById(metodPagosMens)

        if (!existe) {
            throw new Error(`El metodo de pago no existe ${metodPagosMens}`)
        }
    },

    existevalorGmensual:async (valorGmensual) => {
        const existe = await gastosmensuales.findById(valorGmensual)

        if (!existe) {
            throw new Error(`El valor mensual no existe ${valorGmensual}`)
        }
    },
}

export default helpersgastosmensuales