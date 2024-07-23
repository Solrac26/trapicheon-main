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

    async getUsers() {
      try {
        const resp = await axios.get(
          "https://proyecto-panelera-06ue.onrender.com/api/registro"
        );
        return resp.data.usuarios;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async addUser(datos) {
      try {
        const resp = await axios.post(
          "https://proyecto-panelera-06ue.onrender.com/api/registro",
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
          `https://proyecto-panelera-06ue.onrender.com/api/registro/${id}`,
          datos
        );
        return resp;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
});
