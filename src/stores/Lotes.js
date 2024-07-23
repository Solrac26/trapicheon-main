import { defineStore } from "pinia";
import axios from "axios";

export const lotesStore = defineStore("lotes", {
  state: () => ({
    userData: ":)",
    token: null,
  }),
  actions: {
    createToken(token) {
      this.token = token;
    },

    async getLotes() {
      try {
        const resp = await axios.get(
          "https://proyecto-panelera-06ue.onrender.com/api/lotes"
        );
        console.log(resp);
        return resp.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async addLotes(datos) {
      console.log("datos" + datos);
      console.log(JSON.stringify(datos));
      try {
        const resp = await axios.post(
          "https://proyecto-panelera-06ue.onrender.com/api/lotes",
          datos
        );
        return resp;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async editLotes(id, datos) {
      try {
        console.log(datos);
        const resp = await axios.put(
          `https://proyecto-panelera-06ue.onrender.com/api/lotes/${id}`,
          datos
        );
        return resp;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async activeLotes(id) {
      try {
        const resp = await axios.put(
          `https://proyecto-panelera-06ue.onrender.com/api/lotes/activar/${id}`
        );
        return resp;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async inactiveLotes(id) {
      try {
        const resp = await axios.put(
          `https://proyecto-panelera-06ue.onrender.com/api/lotes/desactivar/${id}`
        );
        return resp;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
});