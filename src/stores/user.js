import { defineStore } from "pinia";
import axios from "axios";

export const UserStore = defineStore("user", {
  state: () => ({
    userData: ":)",
    token: null,
  }),
  actions: {
    createToken(token) {
      this.token = token;
    },

    async login(datos) {
      try{
        const {data, status} = await axios.post(
          "https://proyecto-panelera-06ue.onrender.com/api/usuario/login",
          datos
        );
        
        return {data, status}

        
      } catch(error) {
        return {data: error.response.data, status: 400}
      }
      
    },

    async getUsers() {
      try {
        const resp = await axios.get(
          "https://proyecto-panelera-06ue.onrender.com/api/usuario"
        );
        console.log(resp);
        return resp.data.usuarios;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async addUser(datos) {
      console.log("datos" + datos);
      console.log(JSON.stringify(datos));
      try {
        const resp = await axios.post(
          "https://proyecto-panelera-06ue.onrender.com/api/usuario",
          datos
        );
        return resp;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async editUser(id, datos) {
      try {
        console.log(datos);
        const resp = await axios.put(
          `https://proyecto-panelera-06ue.onrender.com/api/usuario/${id}`,
          datos
        );
        return resp;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async activeUser(id) {
      try {
        const resp = await axios.put(
          `https://proyecto-panelera-06ue.onrender.com/api/usuario/activar/${id}`
        );
        return resp;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async inactiveUser(id) {
      try {
        const resp = await axios.put(
          `https://proyecto-panelera-06ue.onrender.com/api/usuario/desactivar/${id}`
        );
        return resp;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
});


