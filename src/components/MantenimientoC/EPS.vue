<template>
  <div class="q-pa-mn">
    <q-layout view="lHh Lpr lff" style="height: auto">
      <q-page-container>
        <q-separator class="q2" style="background-color: #ddd" dark inset />

        <center>
          <div
            style="
              background-color: teal;
              display: inline-block;
              padding: 5px;
              border-radius: 5px;
              margin-top: 30px;
            "
          >
            <p
              style="
                text-align: center;
                color: #ffffff;
                /* font-weight: bold; */
              "
            >
              Mantenimiento ‣ EPS
            </p>
          </div>
        </center>

        <div>
          <div class="q-pa-md">
            <div style="text-align: right">
              <q-btn
                elevated
                push
                icon="add_box"
                color="teal"
                label="Nuevo Registro"
                style="margin-bottom: 20px"
                @click="guardar"
              ></q-btn>
            </div>

            <q-table :rows="rows" :columns="columns">
              <template v-slot:body-cell-estado="props">
                <td
                  v-if="props.row.estado == 1"
                  style="color: teal; text-align: center; font-weight: bold"
                >
                  ACTIVO
                </td>
                <td
                  v-else
                  style="color: red; text-align: center; font-weight: bold"
                >
                  INACTIVO
                </td>
              </template>
              <template v-slot:body-cell-opcion="props">
                <td style="text-align: center">
                  <q-btn 
                    @click="edit(props.row)"
                    class=""
                    icon="edit"
                    color="black"
                    title="Editar"
                    round
                    dense
                    push
                    style="margin-right: 10px;"
                  />
                  <q-btn
                    v-if="props.row.estado == 1"
                    @click="inactive(props.row)"
                    icon="toggle_on"
                    color="teal"
                    title="Inactivar"
                    :loading="loading"
                    :disable="loading"
                    :class="{ 'cursor-not-allowed': loading }"
                    round
                    dense
                    push
                    style="margin-right: 10px;"
                  />
                  <q-btn
                    v-else
                    @click="active(props.row)"
                    icon="toggle_off"
                    color="red"
                    title="Activar"
                    :loading="loading"
                    :disable="loading"
                    :class="{ 'cursor-not-allowed': loading }"
                    round
                    dense
                    push
                    style="margin-right: 10px;"
                  />
                </td>
              </template>
            </q-table>
          </div>

          <q-dialog
            v-model="nuevo"
            persistent
            transition-show="scale"
            transition-hide="scale"
          >
            <q-card style="width: 300px">
              <q-card-section style="background-color: teal">
                <div class="text-h6" style="color: #ffffff">
                  <center>
                    {{ bd == 0 ? "Nuevo Registro" : "Editar Registro" }}
                  </center>
                </div>
              </q-card-section>

              <q-card-section>
                <q-input
                  dense
                  outlined
                  v-model="n_linea"
                  label="Numero de la EPS*"
                  style="margin-bottom: 10px"
                  type="number"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />

                <q-select
                  outlined
                  dense
                  v-model="nombre"
                  label="Nombre de la EPS*"
                  :options="['EPS1', 'EPS2']"
                  :rules="[
                    (val) => !!val || 'Debe seleccionar una tipo de EPS',
                  ]"
                />
              </q-card-section>
              <q-card-actions
                align="center"
                class="bg-white"
                style="margin-bottom: 20px"
              >
                <q-btn
                  elevated
                  push
                  color="teal"
                  label="Cancelar"
                  @click="nuevo = false"
                />
                <q-btn elevated push color="teal" @click="guardarEditarDatos">
                  {{ bd === 0 ? "Guardar" : "Editar" }}
                </q-btn>
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { EpsStore } from "../../stores/EpsNew.js";
import { useQuasar } from "quasar";

const q = useQuasar();
const Eps = EpsStore();
let rows = ref();
  
let nombre = ref("");
let n_linea = ref("");

let nuevo = ref(false);
let bd = ref(0);
let _id = "";

let loading = ref(false);

let columns = ref([
  {
    name: "nombre",
    required: true,
    label: "Nombre de la EPS",
    align: "left",
    field: "nombre",
    sortable: false,
  },
  {
    name: "n_linea",
    required: true,
    label: "Numero de Atencion",
    align: "left",
    field: "n_linea",
    sortable: false,
  },

  {
    name: "estado",
    label: "Estado",
    field: "estado",
    align: "center",
  },

  {
    name: "opcion",
    label: "Opciones",
    field: "",
    sortable: true,
    align: "center",
  },
]);

const listarEps = async () => {
  rows.value = await Eps.getEps();
};

listarEps();

function edit(row) {
  bd.value = 1;
  nuevo.value = true;
  _id = row._id;
  nombre.value = row.nombre;
  n_linea.value = row.n_linea;
}

function guardar() {
  bd.value = 0;
  nuevo.value = true;
  limpiarFormulario();
}

async function inactive(props) {
  loading.value = true;
  console.log("desactivado", props.nombre);
  let res = await Eps.inactiveEps(props._id);
  loading.value = false;
  listarEps();
}

async function active(props) {
  loading.value = true;
  console.log("activado", props.nombre);
  let res = await Eps.activeEps(props._id);
  loading.value = false;
  listarEps();
}

function limpiarFormulario() {
  nombre.value = "";
  n_linea.value = "";
  bd.value = 0;
}

async function guardarEditarDatos() {
  if (bd.value === 0) {
    if (nombre.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre de EPS válido.",
        position: "top",
      });
      return;
    }

    if (n_linea.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un número de atención válido.",
        position: "top",
      });
      return;
    }

    const datos = {
      nombre: nombre.value,
      n_linea: n_linea.value,
      estado: 0,
    };

    let res = await Eps.addEps(datos);

    listarEps();
    nuevo.value = false;
    console.log(res);
    q.notify({
      type: "positive",
      color: "black",
      message: "EPS añadida exitosamente.",
      position: "top",
      progress: true
    });
  } else {
    if (nombre.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre de EPS válido.",
        position: "top",
      });
      return;
    }

    if (n_linea.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un número de atención válido.",
        position: "top",
      });
      return;
    }

    const datos = {
      nombre: nombre.value,
      n_linea: n_linea.value,
      estado: 1,
    };

    console.log(_id, { datos });
    let res = await Eps.editEps(_id, datos);
    listarEps();    
    nuevo.value = false;
    console.log(res);
    q.notify({
      type: "positive",
      color: "black",
      message: "EPS actualizada exitosamente.",
      position: "top",
      progress: true,
    });
  }
}

listarEps();
</script>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #ffffff;
  z-index: 9999;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background: #1d202b;
  color: #fff;
  font-family: "Roboto", sans-serif;
  min-height: 100vh;
}
</style>
