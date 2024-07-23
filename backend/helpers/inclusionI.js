import IclusionDI from "../modelos/inclusionI.js"

const helpersIdatosDI={
    
    existecodigo : async (codigo) => {
        const existe = await IclusionDI.findById(codigo)

        if (!existe) {
            throw new Error(`El codigo no existe ${codigo}`)
        }
    },

    existecantidad :() => {
        return async (req, res) => {
            const existe = await cantidad.findOne({ cantidad: req.body.cantidad });
        
                if (existe ) {
                    return res.status(401).json({ msg: `La cantidad ya está registrada` });
                    //throw new Error(`El email ya está registrado`)
                }
        }
    },

    existeprecio :() => {
        return async (req, res) => {
            const existe = await precio.findOne({ precio: req.body.precio });
        
                if (existe ) {
                    return res.status(401).json({ msg: `El precio ya está registrado` });
                    //throw new Error(`El email ya está registrado`)
                }
        }
    },

}

export default helpersIdatosDI