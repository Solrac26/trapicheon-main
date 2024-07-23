import pagosC from "../modelos/pagosC.js";

const helperspagosC={
    existepagosC:async (cedula) => {
        const existe = await pagosC.findById(cedula)

        if (!existe) {
            throw new Error(`La cedula no existe ${cedula}`)
        }
    },
    
    existerol:async (rolPagos) => {
        const existe = await pagosC.findById(rolPagos)

        if (!existe) {
            throw new Error(`El rol no existe ${rolPagos}`)
        }
    },

    existeconcepto:async (conceptoPagos) => {
        const existe = await pagosC.findById(conceptoPagos)

        if (!existe) {
            throw new Error(`El concepto no existe ${conceptoPagos}`)
        }
    },

    existefecha:async (fechaPagos) => {
        const existe = await pagosC.findById(fechaPagos)

        if (!existe) {
            throw new Error(`La fecha de pago no existe ${fechaPagos}`)
        }
    },

    existetiempo:async (tiempoPagos) => {
        const existe = await pagosC.findById(tiempoPagos)
        
        if (!existe) {
            throw new Error(`El tiempo no existe ${tiempoPagos}`)
        }tiempoPagos
    },

    existemetodo:async (metodPagos) => {
        const existe = await pagosC.findById(metodPagos)
        
        if (!existe) {
            throw new Error(`El metodo de pago no existe ${metodPagos}`)
        }
    },
}

export default helperspagosC