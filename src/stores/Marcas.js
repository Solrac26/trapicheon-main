import { defineStore } from "pinia";
import axios from "axios";

export const marStore = defineStore("mar", {
  state: () => ({
    userData: ":)",
    token: null,
  }),
  actions: {
    createToken(token) {
      this.token = token;
    },

    async getmarcas() {
      try {
        const resp = await axios.get(
          "https://proyecto-panelera-06ue.onrender.com/api/marcas"
        );
        console.log(resp);
        return resp.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async addmarcas(datos) {
      console.log("datos" + datos);
      console.log(JSON.stringify(datos));
      try {
        const resp = await axios.post(
          "https://proyecto-panelera-06ue.onrender.com/api/marcas",
          datos
        );
        return resp;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async editmarcas(id, datos) {
      try {
        console.log(datos);
        const resp = await axios.put(
          `https://proyecto-panelera-06ue.onrender.com/api/marcas/${id}`,
          datos
        );
        return resp;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async activemarcas(id) {
      try {
        const resp = await axios.put(
          `https://proyecto-panelera-06ue.onrender.com/api/marcas/activar/${id}`
        );
        return resp;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async inactivemarcas(id) {
      try {
        const resp = await axios.put(
          `https://proyecto-panelera-06ue.onrender.com/api/marcas/desactivar/${id}`
        );
        return resp;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
});
