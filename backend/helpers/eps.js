import eps from "../modelos/eps.js";

const helperseps={
    existeeps:async (nombre) => {
        const existe = await eps.findById(nombre)

        if (!existe) {
            throw new Error(`El nombre no existe ${nombre}`)
        }
    },

    existenumero:async (n_linea) => {
        const existe = await eps.findById(n_linea)

        if (!existe) {
            throw new Error(`El numero de linea no existe ${n_linea}`)
        }
    },
}

export default helperseps