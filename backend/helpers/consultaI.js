import Consulta from "../modelos/consultaI.js"

const helpersconsulta={

    existeconsulta : async (codigo) => {
        const existe = await Consulta.findById(codigo)

        if (!existe) {
            throw new Error(`La consulta no existe ${codigo}`)
        }
    },

    existefecha_venci :() => {
        return async (req, res) => {
            const existe = await fecha_venci.findOne({ fecha_venci: req.body.fecha_venci });
        
                if (existe ) {
                    return res.status(401).json({ msg: `La fecha de vencimiento ya está registrada` });
                }
        
        }
    },

    existen_stocks :() => {
        return async (req, res) => {
            const existe = await n_stocks.findOne({ n_stocks: req.body.n_stocks });
        
                if (existe ) {
                    return res.status(401).json({ msg: `El número de stocks ya está registrado` });
                }
        
        }
    },
    
    existenproductos_acabdos:() => {
        return async (req, res) => {
            const existe = await nproductos_acabdos.findOne({ nproductos_acabdos: req.body.nproductos_acabdos });
        
                if (existe ) {
                    return res.status(401).json({ msg: `El número de productos acabados ya está registrado` });
                }
        }
    },
  

}

export default helpersconsulta