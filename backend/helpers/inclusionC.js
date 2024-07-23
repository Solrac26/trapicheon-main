import IDclientes from "../modelos/inclusionC.js"

const helpersIDclientes={

    existe_inclusion : async (codigo) => {
        const existe = await IDclientes.findById(codigo)

        if (!existe) {
            throw new Error(`La inclusion de los datos no existe ${codigo}`)
        }
    },

    existe_costo :() => {
        return async (req, res) => {
            const existe = await costo.findOne({ costo: req.body.costo });
        
                if (existe ) {
                    return res.status(401).json({ msg: `El costo ya está registrado` });
                    //throw new Error(`El email ya está registrado`)
                }
        }
    },

}

export default helpersIDclientes