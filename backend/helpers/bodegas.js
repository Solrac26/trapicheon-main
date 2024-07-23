import Bodegas from "../modelos/bodegas.js"

const helpersBodegas={
    existeBodegasById : async (codigo) => {
        const existe = await Bodegas.findById(codigo)

        if (!existe) {
            throw new Error(`La bodega no existe ${codigo}`)
        }
    },

    existenombres :() => {
        return async (req, res) => {
            const existe = await nombres.findOne({ nombres: req.body.nombres });
        
                if (existe ) {
                    return res.status(401).json({ msg: `El nombre ya está registrado` });
                }
        
        }
    },

    existedescripcion :() => {
        return async (req, res) => {
            const existe = await descripcion.findOne({ descripcion: req.body.descripcion });
        
                if (existe ) {
                    return res.status(401).json({ msg: `La descripción ya está registrada` });
                }
        
        }
    },
}

export default helpersBodegas