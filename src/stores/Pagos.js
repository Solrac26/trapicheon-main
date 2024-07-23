import { defineStore } from "pinia";
import axios from "axios";

export const pagosStore = defineStore("pagos", {
  state: () => ({
    userData: ":)",
    token: null,
  }),
  actions: {
    createToken(token) {
      this.token = token;
    },

    async getpagosM() {
      try {
        const resp = await axios.get(
          "https://proyecto-panelera-06ue.onrender.com/api/pagosM"
        );
        console.log(resp);
        return resp.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async addpagosM(datos) {
      console.log("datos" + datos);
      console.log(JSON.stringify(datos));
      try {
        const resp = await axios.post(
          "https://proyecto-panelera-06ue.onrender.com/api/pagosM",
          datos
        );
        return resp;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async editpagosM(id, datos) {
      try {
        console.log(datos);
        const resp = await axios.put(
          `https://proyecto-panelera-06ue.onrender.com/api/pagosM/${id}`,
          datos
        );
        return resp;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async activepagosM(id) {
      try {
        const resp = await axios.put(
          `https://proyecto-panelera-06ue.onrender.com/api/pagosM/activar/${id}`
        );
        return resp;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async inactivepagosM(id) {
      try {
        const resp = await axios.put(
          `https://proyecto-panelera-06ue.onrender.com/api/pagosM/desactivar/${id}`
        );
        return resp;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
});