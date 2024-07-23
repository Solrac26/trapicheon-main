import pagosM from "../modelos/pagosM.js";

const helperspagosM={
    existepagosM:async (codigoPago) => {
        const existe = await pagosM.findById(codigoPago)

        if (!existe) {
            throw new Error(`El codigo de pago no existe ${codigoPago}`)
        }
    },

    existenombre:async (nombrePago) => {
        const existe = await pagosM.findById(nombrePago)

        if (!existe) {
            throw new Error(`El nombre del pago no existe ${nombrePago}`)
        }
    },
    
    existetipo:async (tipoPago) => {
        const existe = await pagosM.findById(tipoPago)

        if (!existe) {
            throw new Error(`El tipo de pago no existe ${tipoPago}`)
        }
    },
}

export default helperspagosM