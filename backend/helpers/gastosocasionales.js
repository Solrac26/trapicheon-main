import gastosocasionales from "../modelos/gastosocasionales.js";

const helpersgastosocasionales={
    existegastosocasionales:async (nombreGastoOcas) => {
        const existe = await gastosocasionales.findById(nombreGastoOcas)

        if (!existe) {
            throw new Error(`El nombre de gastos ocasionales no existe ${nombreGastoOcas}`)
        }
    },

    existefinca:async (finca) => {
        const existe = await gastosocasionales.findById(finca)

        if (!existe) {
            throw new Error(`La finca no existe ${finca}`)
        }
    },
    
    existedescripcion:async (descripcionOcas) => {
        const existe = await gastosocasionales.findById(descripcionOcas)

        if (!existe) {
            throw new Error(`La descripcion de gastos ocasionales no existe ${descripcionOcas}`)
        }
    },

    existefecha:async (fechaPagosOcas) => {
        const existe = await gastosocasionales.findById(fechaPagosOcas)

        if (!existe) {
            throw new Error(`La fecha de pago de gastos ocasionales no existe ${fechaPagosOcas}`)
        }
    },

    existemetodo:async (metodPagosOcas) => {
        const existe = await gastosocasionales.findById(metodPagosOcas)

        if (!existe) {
            throw new Error(`Los metodos de pago de gastos ocasionales no existe ${metodPagosOcas}`)
        }
    },

    existevalor:async (valorGOcas) => {
        const existe = await gastosocasionales.findById(valorGOcas)

        if (!existe) {
            throw new Error(`El valor de los gastos ocasionales no existe ${valorGOcas}`)
        }
    },

    existeestado:async (estado) => {
        const existe = await gastosocasionales.findById(estado)

        if (!existe) {
            throw new Error(`El estado no existe ${estado}`)
        }
    },
}

export default helpersgastosocasionales