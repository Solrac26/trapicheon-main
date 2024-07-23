import Iproveedores from "../modelos/proveedores.js"

const helpersproveedores={
    
    existe_proveedor : async (cedula) => {
        const existe = await Iproveedores.findById(cedula)

        if (!existe) {
            throw new Error(`El proveedor no existe ${cedula}`)
        }
    },

    existe_nombre :() => {
        return async (req, res) => {
            const existe = await nombre.findOne({ nombre: req.body.nombre });
        
                if (existe ) {
                    return res.status(401).json({ msg: `El nombre ha sido registrado` });
                }
        }
    },

    existe_producto :() => {
        return async (req, res) => {
            const existe = await producto.findOne({ producto: req.body.producto });
        
                if (existe ) {
                    return res.status(401).json({ msg: `El producto ha sido registrado` });
                }
        }
    },

    existe_direccion :() => {
        return async (req, res) => {
            const existe = await precio.findOne({ direccion: req.body.direccion });
        
                if (existe ) {
                    return res.status(401).json({ msg: `La direccion ha sido registrada` });
                }
        }
    },

    existe_ciudad :() => {
        return async (req, res) => {
            const existe = await ciudad.findOne({ ciudad: req.body.ciudad });
        
                if (existe ) {
                    return res.status(401).json({ msg: `La ciudad ha sido registrada` });
                }
        }
    },

    existe_telefono :() => {
        return async (req, res) => {
            const existe = await telefono.findOne({ telefono: req.body.telefono });
        
                if (existe ) {
                    return res.status(401).json({ msg: `El telefono ha sido registrado` });
                }
        }
    },

    existenc_banacaria :() => {
        return async (req, res) => {
            const existe = await ncbancaria.findOne({ ncbancaria: req.body.ncbancaria });
        
                if (existe ) {
                    return res.status(401).json({ msg: `El numero de cuenta bancaria ha sido registrada` });
                }
        }
    },

}

export default helpersproveedores