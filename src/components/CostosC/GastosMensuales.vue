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
              Costos ‣ Gastos Mensuales
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
                <!-- <q-input outlined v-model="nombreGastoMens" label="Nombre del Gasto" style="margin-bottom: 10px" />
                <q-input outlined v-model="finca" label="Finca" style="margin-bottom: 10px" />
                <q-input outlined v-model="descripcionMens" label="Descripcion" style="margin-bottom: 10px" />
                <q-input outlined v-model="fechaPagosMens" label="Fecha" style="margin-bottom: 10px" />
                <q-input outlined v-model="metodPagosMens" label="Metodo de Pago" style="margin-bottom: 10px" />
                <q-input outlined v-model="valorGmensual" label="Valor del Gasto" style="margin-bottom: 10px" /> -->

                <q-input
                  dense
                  outlined
                  v-model="nombreGastoMens"
                  label="Nombre del Gasto*"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />

                <q-input
                  dense
                  outlined
                  v-model="finca"
                  label="Finca*"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />

                <q-input
                  dense
                  outlined
                  v-model="descripcionMens"
                  label="Descripcion*"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                  type="textarea"
                />

                <q-input
                  dense
                  outlined
                  v-model="fechaPagosMens"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                  type="date"
                />

                <q-select
                  dense
                  outlined
                  v-model="metodPagosMens"
                  label="Metodo de Pago*"
                  :options="['Tarjeta', 'Efectivo']"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />

                <q-input
                  dense
                  outlined
                  v-model="valorGmensual"
                  label="Valor del Gasto*"
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
import { gastosMStore } from "../../stores/GastosMensuales.js";
import { useQuasar } from "quasar";

const q = useQuasar();
const gastosM = gastosMStore();
let rows = ref();

let nombreGastoMens = ref("");
let finca = ref("");
let descripcionMens = ref("");
let fechaPagosMens = ref("");
let metodPagosMens = ref("");
let valorGmensual = ref("");

let nuevo = ref(false);
let bd = ref(0);
let _id = "";

let columns = ref([
  {
    name: "nombreGastoMens",
    required: true,
    label: "Nombre del Gasto",
    align: "left",
    field: "nombreGastoMens",
    sortable: false,
  },
  {
    name: "finca",
    required: true,
    label: "Finca",
    align: "left",
    field: "finca",
    sortable: false,
  },
  {
    name: "descripcionMens",
    required: true,
    label: "Descripcion",
    align: "left",
    field: "descripcionMens",
    sortable: false,
  },
  {
    name: "fechaPagosMens",
    required: true,
    label: "Fecha",
    align: "left",
    field: "fechaPagosMens",
    sortable: false,
  },
  {
    name: "metodPagosMens",
    required: true,
    label: "Metodo de Pago",
    align: "left",
    field: "metodPagosMens",
    sortable: false,
  },
  {
    name: "valorGmensual",
    required: true,
    label: "Valor del Gasto",
    align: "left",
    field: "valorGmensual",
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
 
const listargastosM = async () => {
  rows.value = await gastosM.getgastosmensuales();
};

listargastosM();

function edit(row) {
  bd.value = 1;
  nuevo.value = true;
  _id = row._id;
  nombreGastoMens.value = row.nombreGastoMens;
  finca.value = row.finca;
  descripcionMens.value = row.descripcionMens;
  fechaPagosMens.value = row.fechaPagosMens;
  metodPagosMens.value = row.metodPagosMens;
  valorGmensual.value = row.valorGmensual;
}

function guardar() {
  bd.value = 0;
  limpiarFormulario();
  nuevo.value = true;
}

async function inactive(props) {
  console.log("desactivado", props.nombreGastoMens);
  let res = await gastosM.inactivegastosmensuales(props._id);
  listargastosM();
}

async function active(props) {
  console.log("desactivado", props.nombreGastoMens);
  let res = await gastosM.activegastosmensuales(props._id);
  listargastosM();
}

function limpiarFormulario() {
  nombreGastoMens.value = "";
  finca.value = "";
  descripcionMens.value = "";
  fechaPagosMens.value = "";
  metodPagosMens.value = "";
  valorGmensual.value = "";
}

async function guardarEditarDatos() {
  if (bd.value === 0) {
    if (nombreGastoMens.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre de gasto válido.",
        position: "top",
      });
      return;
    }

    if (finca.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una finca válida.",
        position: "top",
      });
      return;
    }

    if (descripcionMens.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una descripcion para el gasto válida.",
        position: "top",
      });
      return;
    }

    if (fechaPagosMens.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una fecha válida.",
        position: "top",
      });
      return;
    }

    if (metodPagosMens.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un metodo de pago válido.",
        position: "top",
      });
      return;
    }

    if (valorGmensual.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un valor válido.",
        position: "top",
      });
      return;
    }

    const datos = {
      nombreGastoMens: nombreGastoMens.value,
      finca: finca.value,
      descripcionMens: descripcionMens.value,
      fechaPagosMens: fechaPagosMens.value,
      metodPagosMens: metodPagosMens.value,
      valorGmensual: valorGmensual.value,
      estado: 0,
    };

    let res = await gastosM.addgastosmensuales(datos);

    listargastosM();
    nuevo.value = false;
    console.log(res);

    q.notify({
      type: "positive",
      color: "black",
      message: "Gasto mensual añadido exitosamente.",
      position: "top",
      progress: true
    });
  } else {
    if (nombreGastoMens.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre de gasto válido.",
        position: "top",
      });
      return;
    }

    if (finca.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una finca válida.",
        position: "top",
      });
      return;
    }

    if (descripcionMens.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una descripcion para el gasto válida.",
        position: "top",
      });
      return;
    }

    if (fechaPagosMens.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una fecha válida.",
        position: "top",
      });
      return;
    }

    if (metodPagosMens.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un metodo válido.",
        position: "top",
      });
      return;
    }

    if (valorGmensual.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un valor válido.",
        position: "top",
      });
      return;
    }

    const datos = {
      nombreGastoMens: nombreGastoMens.value,
      finca: finca.value,
      descripcionMens: descripcionMens.value,
      fechaPagosMens: fechaPagosMens.value,
      metodPagosMens: metodPagosMens.value,
      valorGmensual: valorGmensual.value,
      estado: 1,
    };

    console.log(_id, { datos });
    let res = await gastosM.editgastosmensuales(_id, datos);
    listargastosM();
    nuevo.value = false; 
    console.log(res);
    q.notify({
      type: "negative",
      color: "black",
      progress: true,
      message: "Gasto mensual actualizado exitosamente.",
      position: "top",
    });
  }
}

listargastosM();

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
