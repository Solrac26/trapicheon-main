import Inventario from "../modelos/inventario.js"

const helpersinventario={

    existeinventario : async (codigo) => {
        const existe = await Inventario.findById(codigo)

        if (!existe) {
            throw new Error(`El inventario no existe ${codigo}`)
        }
    },

    existenombreAr :() => {
        return async (req, res) => {
            const existe = await nombreAr.findOne({ nombreAr: req.body.nombreAr });
        
                if (existe ) {
                    return res.status(401).json({ msg: `El nombre del articulo ya está registrado` });
                }
        
        }
    },

    existe_cantidad :() => {
        return async (req, res) => {
            const existe = await cantidad.findOne({ cantidad: req.body.cantidad });
        
                if (existe ) {
                    return res.status(401).json({ msg: `La cantidad ya está registrada` });
                }
        
        }
    },
    
    existen_entradas:() => {
        return async (req, res) => {
            const existe = await n_entradas.findOne({ n_entradas: req.body.n_entradas });
        
                if (existe ) {
                    return res.status(401).json({ msg: `El numero de entradas ya está registrado` });
                }
        
        }
    },

    existen_salidas:() => {
        return async (req, res) => {
            const existe = await n_salidas.findOne({ n_salidas: req.body.n_salidas });
        
                if (existe ) {
                    return res.status(401).json({ msg: `El numero de salidas ya está registrado` });
                }
        
        }
    },

    existe_precio:() => {
        return async (req, res) => {
            const existe = await precio.findOne({ precio: req.body.precio });
        
                if (existe ) {
                    return res.status(401).json({ msg: `El precio  ya está registrado` });
                }
        }
    },

}

export default helpersinventario