import Login from "../modelos/login.js"

const helperslogin={

    existeusuario : async (usuario) => {
        const existe = await Login.findById(usuario)

        if (!existe) {
            throw new Error(`El usuario no existe ${usuario}`)
        }
    },

    existe_contraseña :() => {
        return async (req, res) => {
            const existe = await contraseña.findOne({ contraseña: req.body.contraseña });
        
                if (existe ) {
                    return res.status(401).json({ msg: `Contraseña ingresada con exito` });
                }
        }
    },

}

export default helperslogin