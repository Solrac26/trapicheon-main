import pedidos from "../modelos/pedidos.js";

const helperspedidos={
    existepedido:async (numeroDocCliente) => {
        const existe = await pedidos.findById(numeroDocCliente)

        if (!existe) {
            throw new Error(`El numero de documento no existe ${numeroDocCliente}`)
        }
    },
    
    existenombreCliente:async (nombreCliente) => {
        const existe = await pedidos.findById(nombreCliente)

        if (!existe) {
            throw new Error(`El nombre del cliente no existe ${nombreCliente}`)
        }
    },

    existetelefonoCliente:async (telefonoCliente) => {
        const existe = await pedidos.findById(telefonoCliente)

        if (!existe) {
            throw new Error(`El telefono no existe ${telefonoCliente}`)
        }
    },

    existedireccionClien:async (direccionClien) => {
        const existe = await pedidos.findById(direccionClien)

        if (!existe) {
            throw new Error(`La direccion no existe ${direccionClien}`)
        }
    },

    existetipoPanela:async (tipoPanela) => {
        const existe = await pedidos.findById(tipoPanela)

        if (!existe) {
            throw new Error(`El tipo de panela no existe ${tipoPanela}`)
        }
    },

    existecantidadesPedido:async (cantidadesPedido) => {
        const existe = await pedidos.findById(cantidadesPedido)

        if (!existe) {
            throw new Error(`La cantiidad no existe ${cantidadesPedido}`)
        }
    },

    existetipoEmpaque:async (tipoEmpaque) => {
        const existe = await pedidos.findById(tipoEmpaque)

        if (!existe) {
            throw new Error(`El tipo de empaque no existe ${tipoEmpaque}`)
        }
    },

    existedetallesFactura:async (detallesFactura) => {
        const existe = await pedidos.findById(detallesFactura)

        if (!existe) {
            throw new Error(`El detalle de la factura no existe ${detallesFactura}`)
        }
    },
}

export default helperspedidos