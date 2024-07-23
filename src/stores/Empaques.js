import { defineStore } from "pinia";
import axios from "axios";

export const empaquesStore = defineStore("empaques", {
  state: () => ({
    userData: ":)",
    token: null,
  }),
  actions: {
    createToken(token) {
      this.token = token;
    },

    async getempaques() {
      try {
        const resp = await axios.get(
          "https://proyecto-panelera-06ue.onrender.com/api/empaques"
        );
        console.log(resp);
        return resp.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async addempaques(datos) {
      console.log("datos" + datos);
      console.log(JSON.stringify(datos));
      try {
        const resp = await axios.post(
          "https://proyecto-panelera-06ue.onrender.com/api/empaques",
          datos
        );
        return resp;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async editempaques(id, datos) {
      try {
        console.log(datos);
        const resp = await axios.put(
          `https://proyecto-panelera-06ue.onrender.com/api/empaques/${id}`,
          datos
        );
        return resp;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async activeempaques(id) {
      try {
        const resp = await axios.put(
          `https://proyecto-panelera-06ue.onrender.com/api/empaques/activar/${id}`
        );
        return resp;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async inactiveempaques(id) {
      try {
        const resp = await axios.put(
          `https://proyecto-panelera-06ue.onrender.com/api/empaques/desactivar/${id}`
        );
        return resp;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
});