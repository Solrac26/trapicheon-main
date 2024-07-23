import usuarios from "../modelos/usuarios.js";

const helpersusuarios={
    existeusuario:async (nombre) => {
        const existe = await usuarios.findById(nombre)

        if (!existe) {
            throw new Error(`El nombre del usuario no existe ${nombre}`)
        }
    },

    existecorreo:async (correo) => {
        const existe = await usuarios.findById(correo)

        if (!existe) {
            throw new Error(`El correo no existe ${correo}`)
        }
    },
    
    existecontrasena:async (contrasena) => {
        const existe = await usuarios.findById(contrasena)

        if (!existe) {
            throw new Error(`La contraseña no existe ${contrasena}`)
        }
    },

    existerol:async (rol) => {
        const existe = await usuarios.findById(rol)

        if (!existe) {
            throw new Error(`El rol no existe ${rol}`)
        }
    },
}

export default helpersusuarios