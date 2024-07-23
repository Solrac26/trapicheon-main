import fincas from "../modelos/fincas.js";

const helpersfincas={
    existefinca:async (nombreFinca) => {
        const existe = await fincas.findById(nombreFinca)

        if (!existe) {
            throw new Error(`El nombre de la finca no existe ${nombreFinca}`)
        }
    },

    existeextension:async (extensionFinca) => {
        const existe = await fincas.findById(extensionFinca)

        if (!existe) {
            throw new Error(`La extension no existe ${extensionFinca}`)
        }
    },
    
    existematricula:async (nMatriculaFinca) => {
        const existe = await fincas.findById(nMatriculaFinca)

        if (!existe) {
            throw new Error(`El numero de matricula no existe ${nMatriculaFinca}`)
        }
    },
}

export default helpersfincas