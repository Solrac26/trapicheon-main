import modelologin from "../modelos/login.js";

const loginhttp= {
  LoginPost : async (req, res) => {
    const { usuario, contrasena } = req.body;
    const login = new modelologin({ usuario: usuario, contrasena: contrasena });
    await login.save();
    res.json({
      msg: "Ingreso de usuario exitoso",
    });
  },

}

export default loginhttp
