import modelousuario from "../modelos/usuarios.js";

const usuariohttp = {
  usuarioget: async (req, res) => {
    const usuario = await modelousuario.find();
    res.json({ usuarios: usuario });
  },

  usuariopost: async (req, res) => {
    const { id, nombre, correo, contrasena, rol, estado } = req.body;
    const user = await modelousuario.findOne({ correo: correo });
    if (user) {
      res.send("correo duplicado")
    } else {

    const usuario = new modelousuario({
      id,
      nombre,
      correo,
      contrasena,
      rol,
      estado,
    });
    await usuario.save();
    res.send("usuario creado");
  }
  },

  usuariologin: async (req, res) => {
    const { correo, contrasena } = req.body;

    const user = await modelousuario.findOne({ correo: correo });
    
    if(!user) {
      return res.status(404).send('no existe usuario')
    }

    user.contrasena == contrasena
      ? res.send("usuario login")
      : res.status(400).send("contraseña incorrecta");
  },

  usuarioput: async (req, res) => {
    const { nombre, correo, rol } = req.body;
    const { id } = req.params;
    
    const usuario = await modelousuario.findByIdAndUpdate(id, {
      nombre,
      correo,
      rol,
    });

    await usuario.save();
    res.send("usario actualizado ;)");
  },

  usuarioInactivoput: async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const usuario = await modelousuario.findByIdAndUpdate(id, { estado: 0 });
    // await user.save();
    // return res.send("usuario");
    res.send(usuario);
},

usuarioActivoput: async (req, res) => {
      console.log(req.params);
    // console.log(req.body);
    const { id } = req.params;
    const usuario = await modelousuario.findByIdAndUpdate(id, { estado: 1 });
    res.send(usuario);
  },
};

export default usuariohttp;