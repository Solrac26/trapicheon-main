import empacados from "../modelos/empacados.js";

const helpersempacados={
    existeempacados:async (codigoBodega) => {
        const existe = await empacados.findById(codigoBodega)

        if (!existe) {
            throw new Error(`El codigo de la bodega no existe ${codigoBodega}`)
        }
    },

    existeempaque:async (tipoEmpaque) => {
        const existe = await empacados.findById(tipoEmpaque)

        if (!existe) {
            throw new Error(`El tipo de empaque no existe ${tipoEmpaque}`)
        }
    },
    
    existepanela:async (tipoPanela) => {
        const existe = await empacados.findById(tipoPanela)

        if (!existe) {
            throw new Error(`El tipo de panela no existe ${tipoPanela}`)
        }
    },

    existepanelas:async (totalPanelas) => {
        const existe = await empacados.findById(totalPanelas)

        if (!existe) {
            throw new Error(`La total de panelas no existe ${totalPanelas}`)
        }
    },
}

export default helpersempacados