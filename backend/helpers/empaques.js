import empaques from "../modelos/empaques.js";

const helpersempaques={
    existeempaques:async (nombreEmpaque) => {
        const existe = await empaques.findById(nombreEmpaque)

        if (!existe) {
            throw new Error(`El nombre de el empaque no existe ${nombreEmpaque}`)
        }
    },

    existenumero:async (numEmpaque) => {
        const existe = await empaques.findById(numEmpaque)

        if (!existe) {
            throw new Error(`El numero de empaque no existe ${numEmpaque}`)
        }
    },
}

export default helpersempaques