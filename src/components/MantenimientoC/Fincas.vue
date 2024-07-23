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
              Mantenimiento ‣ Fincas
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
              <template v-slot:body-cell-estado="props" style="opacity: 0">
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
              <template v-slot:body-cell-opcion="props" style="opacity: 0">
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
                    style="margin-right: 10px"
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
                  v-model="nombreFinca"
                  label="Nombre Finca*"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />

                <q-input
                  dense
                  outlined
                  v-model="extensionFinca"
                  label="Extension*"
                  style="margin-bottom: 10px"
                  :options="['EPS1', 'EPS2']"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />

                <q-input
                  dense
                  outlined
                  v-model="nMatriculaFinca"
                  label="Número de Matricula*"
                  style="margin-bottom: 10px"
                  type="number"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
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
                <q-btn elevated push color="teal" @click="guardarEditarDatos()">
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
import { fincasStore } from "../../stores/Fincas.js";
import { useQuasar } from "quasar";

const q = useQuasar();
const fincas = fincasStore();
let rows = ref();

let nombreFinca = ref("");
let extensionFinca = ref("");
let nMatriculaFinca = ref("");


let nuevo = ref(false);
let bd = ref(0);
let _id = "";

let loading = ref(false);

let columns = ref([
  {
    name: "nombreFinca",
    required: true,
    label: "Nombre",
    align: "left",
    field: "nombreFinca",
    sortable: false,
  },
  {
    name: "extensionFinca",
    required: true,
    label: "Extension",
    align: "left",
    field: "extensionFinca",
    sortable: false,
  },
  {
    name: "nMatriculaFinca",
    label: "Numero de Matricula",
    field: "nMatriculaFinca",
    sortable: true,
    align: "center"
  },

  {
    name: "estado",
    label: "Estado",
    field: "estado",
    align: "center"
  },

  {
    name: "opcion",
    label: "Opciones",
    field: "",
    sortable: true,
    align: "center",
  },
]);

function guardar() {
  bd.value = 0;
  limpiarFormulario();
  nuevo.value = true;
}

const listarFincas = async () => {
  rows.value = await fincas.getfincas();
  console.log(rows.value);
};

listarFincas();

function edit(row) {
  console.log(row._id);
  bd.value = 1;
  nuevo.value = true;
  _id = row._id;
  nombreFinca .value = row.nombreFinca;
  extensionFinca.value = row.extensionFinca;
  nMatriculaFinca.value = row.nMatriculaFinca;
}

async function inactive(props) {
  loading.value = true;
  console.log("desactivado", props.nombreFinca);
  let res = await fincas.inactivefincas(props._id);
  loading.value = false;
  listarFincas();
}

async function active(props) {
  loading.value = true;
  console.log("activado", props.nombreFinca);
  let res = await fincas.activefincas(props._id);
  loading.value = false;
  listarFincas();
}

async function guardarEditarDatos() {
  if (bd.value == 0) {
    if (nombreFinca.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre de finca válido.",
        position: "top",
      });
      return;
    }

    if (extensionFinca.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese la extension de la finca válida.",
        position: "top",
      });
      return;
    }

    if (nMatriculaFinca.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un número de matricula válido.",
        position: "top",
      });
      return;
    }

    const datos = {
      nombreFinca: nombreFinca.value,
      extensionFinca: extensionFinca.value,
      nMatriculaFinca: nMatriculaFinca.value,
      estado: 0,
    };
    

    let res = await fincas.addfincas(datos);
    console.log(res);
    listarFincas();
    nuevo.value = false;
    
    q.notify({
      type: "positive",
      color: "black",
      message: "Finca añadida exitosamente.",
      position: "top",
      progress: true
    });
  } else {
    if (nombreFinca.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre de finca válido.",
        position: "top",
      });
      return;
    }

    if (extensionFinca.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor,  ingrese la extension de la finca válida.",
        position: "top",
      });
      return;
    }

    if (nMatriculaFinca.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un número de matricula válido.",
        position: "top",
      });
      return;
    }

    const datos = {
      nombreFinca: nombreFinca.value,
      extensionFinca: extensionFinca.value,
      nMatriculaFinca: nMatriculaFinca.value,
      estado: 1,
    };
    
    let res = await fincas.editfincas(_id, datos);
    listarFincas();
    nuevo.value = false;
    console.log(res);
    q.notify({
      type: "positive",
      color: "black",
      message: "Finca editada exitosamente.",
      position: "top",
      progress: true,
    });
  }
}

function limpiarFormulario() {
  nombreFinca.value = "";
  extensionFinca.value = "";
  nMatriculaFinca.value = "";
}

listarFincas();
</script>
  
<style scoped>
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