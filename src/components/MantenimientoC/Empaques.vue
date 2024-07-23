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
              Mantenimiento ‣ Empaques
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
                  v-model="nombreEmpaque"
                  label="Nombre del Empaque*"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />

                <q-input
                  dense
                  outlined
                  v-model="numEmpaque"
                  label="Peso Maximo del Empaque*"
                  style="margin-bottom: 10px"
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
import { empaquesStore } from "../../stores/Empaques";
import { useQuasar } from "quasar";

const q = useQuasar();
const empaques = empaquesStore();
let rows = ref();

let nombreEmpaque = ref("");
let numEmpaque  = ref("");

let nuevo = ref(false);
let bd = ref(0);
let _id = "";

let loading = ref(false);

let columns = ref([
  {
    name: "nombreEmpaque",
    required: true,
    label: "Nombre del Empaque",
    align: "left",
    field: "nombreEmpaque",
    sortable: false,
  },
  {
    name: "numEmpaque",
    align: "center",
    label: "Peso máximo del empaque",
    field: "numEmpaque",
    sortable: true,
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

const listarempaques = async () => {
  rows.value = await empaques.getempaques();
};

listarempaques();

function edit(row) {
  bd.value = 1;
  nuevo.value = true;
  _id = row._id;
  nombreEmpaque.value = row.nombreEmpaque;
  numEmpaque.value = row.numEmpaque;
}

function guardar() {
  bd.value = 0
  nuevo.value = true;
  limpiarempaques()
}

async function inactive(props) {
  loading.value = true;
  console.log("desactivado", props.nombreEmpaque);
  let res = await empaques.inactiveempaques(props._id);
  loading.value = false;
  listarempaques();
}

async function active(props) {
  loading.value = true;
  console.log("activado", props.nombreEmpaque);
  let res = await empaques.activeempaques(props._id);
  loading.value = false;
  listarempaques();
}

function limpiarempaques() {
  nombreEmpaque.value = "";
  numEmpaque.value = "";
  bd.value = 0;
}

async function guardarEditarDatos() {
  if (bd.value === 0) {
    if (nombreEmpaque.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre para el empaque válido.",
        position: "top",
      });
      return;
    }

    if (numEmpaque.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un peso máximo de empaque.",
        position: "top",
      });
      return;
    }

    const datos = {
      nombreEmpaque: nombreEmpaque.value,
      numEmpaque: numEmpaque.value,
      estado: 0,
    };

    let res = await empaques.addempaques(datos);

    listarempaques();
    nuevo.value = false;
    console.log(res);
    
    q.notify({
      type: "positive",
      color: "black",
      message: "Empaque añadido exitosamente.",
      position: "top",
      progress: true
    });
  } else {
    if (nombreEmpaque.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre para el empaque válido.",
        position: "top",
      });
      return;
    }

    if (numEmpaque.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un peso máximo de empaque.",
        position: "top",
      });
      return;
    }

    const datos = {
      nombreEmpaque: nombreEmpaque.value,
      numEmpaque: numEmpaque.value,
      estado: 1,
    };

    console.log(_id, { datos });
    let res = await empaques.editempaques(_id, datos);
    listarempaques();
    nuevo.value = false; 
    console.log(res);
    q.notify({
      type: "negative",
      color: "black",
      progress: true,
      message: "Empaque actualizado exitosamente.",
      position: "top",
    });
  }
}
listarempaques();
</script>
  
  <style scoped>
  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #ffffff;
    z-index: 9999;
    /* Asegúrate de que el z-index sea mayor que cualquier otra capa en la página */
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