import Registro from "../modelos/registro.js"

const helpersregistro={

    existe_registro : async (id) => {
        const existe = await Registro.findById(id)

        if (!existe) {
            throw new Error(`El registro no existe ${id}`)
        }
    },

    existe_nombre:() => {
        return async (req, res) => {
            const existe = await nombres.findOne({ nombre: req.body.nombre });
        
                if (existe ) {
                    return res.status(401).json({ msg: `El nombre ha sido registrado` });
                }
        
        }
    },

    existe_fecha:() => {
        return async (req, res) => {
            const existe = await fecha.findOne({ fecha: req.body.fecha });
        
                if (existe ) {
                    return res.status(401).json({ msg: `La fecha ha sido registrada` });
                }
        
        }
    },

    existe_accion:() => {
        return async (req, res) => {
            const existe = await accion.findOne({ accion: req.body.accion });
        
                if (existe ) {
                    return res.status(401).json({ msg: `La accion ha sido registrada` });
                }
        }
    },


}

export default helpersregistro