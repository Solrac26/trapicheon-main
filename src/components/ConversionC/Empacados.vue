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
              Coversión ‣ Empacados
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
                    style="margin-right: 10px"
                  />
                  <q-btn
                    v-if="props.row.estado == 1"
                    @click="inactive(props.row)"
                    icon="toggle_on"
                    color="teal"
                    title="Inactivar"
                    round
                    dense
                    push
                    style="margin-right: 10px"
                  />
                  <q-btn
                    v-else
                    @click="active(props.row)"
                    icon="toggle_off"
                    color="red"
                    title="Activar"
                    round
                    dense
                    push
                    style="margin-right: 10px"
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
                  v-model="codigoBodega"
                  label="Codigo de la Bodega"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                  type="number"
                />
                <q-select
                  dense
                  outlined
                  v-model="tipoEmpaque"
                  label="Tipo de Empaque"
                  :options="['Polímero', 'Papel', 'Cartón Corrugado']"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />
                <q-select
                  dense
                  outlined
                  v-model="tipoPanela"
                  label="Tipo de Panela"
                  :options="['Bloque', 'Granulada']"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />
                <q-select
                  dense
                  outlined
                  v-model="formaPanela"
                  label="Froma de Panela"
                  :options="['Cuadrada', 'Redonda']"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />
                <q-input
                  dense
                  outlined
                  v-model="totalPanelas"
                  label="Total de Panelas"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                  type="number"
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
import { empaquetadoStore } from "../../stores/Empacados.js";
import { useQuasar } from "quasar";

const q = useQuasar();
const empacados = empaquetadoStore();
let rows = ref();

let codigoBodega = ref("");
let tipoEmpaque = ref("");
let tipoPanela = ref("");
let formaPanela = ref("");
let totalPanelas = ref("");

let nuevo = ref(false);
let bd = ref(0);
let _id = "";

let columns = ref([
  {
    name: "codigoBodega",
    required: true,
    label: "Codigo de la Bodega",
    align: "left",
    field: "codigoBodega",
    sortable: false,
  },
  {
    name: "tipoEmpaque",
    required: true,
    label: "Tipo de Empaque",
    align: "left",
    field: "tipoEmpaque",
    sortable: false,
  },
  {
    name: "tipoPanela",
    required: true,
    label: "Tipo de Panela",
    align: "left",
    field: "tipoPanela",
    sortable: false,
  },
  {
    name: "formaPanela",
    required: true,
    label: "Forma de Panela",
    align: "left",
    field: "formaPanela",
    sortable: false,
  },
  {
    name: "totalPanelas",
    required: true,
    label: "Total de Panelas",
    align: "left",
    field: "totalPanelas",
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

const listarempaquetado = async () => {
  rows.value = await empacados.getempaquetado();
};

listarempaquetado();

function edit(row) {
  bd.value = 1;
  nuevo.value = true;
  _id = row._id;
  codigoBodega.value = row.codigoBodega;
  tipoEmpaque.value = row.tipoEmpaque;
  tipoPanela.value = row.tipoPanela;
  formaPanela.value = row.formaPanela;
  totalPanelas.value = row.totalPanelas;
}

function guardar() {
  bd.value = 0;
  nuevo.value = true;
  limpiarFormulario();
}

async function inactive(props) {
  console.log("desactivado", props.codigoBodega);
  let res = await empacados.inactiveempaquetado(props._id);
  listarempaquetado();
}

async function active(props) {
  console.log("activado", props.codigoBodega);
  let res = await empacados.activeempaquetado(props._id);
  listarempaquetado();
}

function limpiarFormulario() {
  codigoBodega.value = "";
  tipoEmpaque.value = "";
  tipoPanela.value = "";
  formaPanela.value = "";
  totalPanelas.value = "";
}

async function guardarEditarDatos() {
  if (bd.value === 0) {
    if (codigoBodega.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un codigo de bodega válido.",
        position: "top",
      });
      return;
    }

    if (tipoEmpaque.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un tipo de empaque válido.",
        position: "top",
      });
      return;
    }

    if (tipoPanela.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un tipo de panela válido.",
        position: "top",
      });
      return;
    }

    if (formaPanela.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una forma de panela válido.",
        position: "top",
      });
      return;
    }

    if (totalPanelas.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un total de panelas válido.",
        position: "top",
      });
      return;
    }

    const datos = {
      codigoBodega: codigoBodega.value,
      tipoEmpaque: tipoEmpaque.value,
      tipoPanela: tipoPanela.value,
      formaPanela: formaPanela.value,
      totalPanelas: totalPanelas.value,
      estado: 0,
    };

    let res = await empacados.addempaquetado(datos);

    listarempaquetado();
    nuevo.value = false;
    console.log(res);
    q.notify({
      type: "positive",
      color: "black",
      message: "Empaquetado añadida exitosamente.",
      position: "top",
      progress: true,
    });
  } else {
    if (codigoBodega.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un codigo de bodega válido.",
        position: "top",
      });
      return;
    }

    if (tipoEmpaque.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un tipo de empaque válido.",
        position: "top",
      });
      return;
    }

    if (tipoPanela.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un tipo de panela válido.",
        position: "top",
      });
      return;
    }

    if (formaPanela.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una forma de panela válido.",
        position: "top",
      });
      return;
    }

    if (totalPanelas.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un total de panelas válido.",
        position: "top",
      });
      return;
    }

    const datos = {
      codigoBodega: codigoBodega.value,
      tipoEmpaque: tipoEmpaque.value,
      tipoPanela: tipoPanela.value,
      formaPanela: formaPanela.value,
      totalPanelas: totalPanelas.value,
      estado: 1,
    };

    console.log(_id, { datos });
    let res = await empacados.editempaquetado(_id, datos);
    listarempaquetado();
    nuevo.value = false;
    console.log(res);
    q.notify({
      type: "positive",
      color: "black",
      message: "Empaquetado actualizada exitosamente.",
      position: "top",
      progress: true,
    });
  }
}

listarempaquetado();
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
