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
              Coversión ‣ Materia Prima Covertida
            </p>
          </div>
        </center>

        <div>
          <div class="q-pa-md">
            <div style="text-align: right">
              <q-btn elevated push icon="add_box" color="teal" label="Nuevo Registro" style="margin-bottom: 20px"
                @click="guardar"></q-btn>
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
                <q-select
                  dense
                  outlined
                  v-model="tipoUnidadMedida"
                  label="Tipo Unidad Medida*"
                  :options="['kg', 'm']"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />
                <q-input
                  dense
                  outlined
                  v-model="cantidadMP"
                  label="Cantidad*"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                  type="number"
                />
                <q-input
                  dense
                  outlined
                  v-model="lote"
                  label="Lote*"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />
                <q-input
                  dense
                  outlined
                  v-model="fecha"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                  type="date"
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
  import { materStore } from "../../stores/Materia.js";
  import { useQuasar } from "quasar";
  
  const q = useQuasar();
  const mater = materStore();
  let rows = ref();
  
  let tipoUnidadMedida = ref("");
  let cantidadMP = ref("");
  let lote = ref("");
  let fecha = ref("");

  let nuevo = ref(false);
  let bd = ref(0);
  let _id = "";
  
  let columns = ref([
    {
      name: " tipoUnidadMedida",
      required: true,
      label: "Tipo de Unidad de Medida",
      align: "left",
      field: "tipoUnidadMedida",
      sortable: false,
    },
    {
      name: "cantidadMP",
      required: true,
      label: "Cantidad",
      align: "left",
      field: "cantidadMP",
      sortable: false,
    },
    {
      name: "lote",
      required: true,
      label: "Lote",
      align: "left",
      field: "lote",
      sortable: false,
    },
    {
      name: "fecha",
      required: true,
      label: "Fecha",
      align: "left",
      field: "fecha",
      sortable: false,
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

  const listarmater = async () => {
  rows.value = await mater.getmateriaprimaC();
};

listarmater();

function edit(row) {
  bd.value = 1;
  nuevo.value = true;
  _id = row._id;
  tipoUnidadMedida.value = row.tipoUnidadMedida;
  cantidadMP.value = row.cantidadMP;
  lote.value = row.lote;
  fecha.value = row.fecha;
  
}

  function guardar() {
  bd.value = 0;
  limpiarFormulario();
  nuevo.value = true;
}

async function inactive(props) {
  console.log("desactivado", props.tipoUnidadMedida);
  let res = await mater.inactivemateriaprimaC(props._id);
  listarmater();
}

async function active(props) {
  console.log("activado", props.tipoUnidadMedida);
  let res = await mater.activemateriaprimaC(props._id);
  listarmater();
}

function limpiarFormulario() {
  tipoUnidadMedida.value = "";
  cantidadMP.value = "";
  lote.value = "";
  fecha.value = "";
}

async function guardarEditarDatos() {
  if (bd.value === 0) {
    if (tipoUnidadMedida.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un tipo de unidad válida.",
        position: "top",
      });
      return;
    }

    if (cantidadMP.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una cantidad válida.",
        position: "top",
      });
      return;
    }

    if (lote.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un lote válido.",
        position: "top",
      });
      return;
    }

    if (fecha.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una fecha válida.",
        position: "top",
      });
      return;
    }

    
    const datos = {
      tipoUnidadMedida: tipoUnidadMedida.value,
      cantidadMP: cantidadMP.value,
      lote: lote.value,
      fecha: fecha.value,
      estado: 0,
    };

    let res = await mater.addmateriaprimaC(datos);

    listarmater();
    nuevo.value = false;
    console.log(res);
    q.notify({
      type: "positive",
      color: "black",
      message: "Materia añadida exitosamente.",
      position: "top",
      progress: true,
    });
  } else {
    if (tipoUnidadMedida.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un tipo de unidad válida.",
        position: "top",
      });
      return;
    }

    if (cantidadMP.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una cantidad válida.",
        position: "top",
      });
      return;
    }

    if (lote.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un lote válido.",
        position: "top",
      });
      return;
    }

    if (fecha.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una fecha válida.",
        position: "top",
      });
      return;
    }

    
    const datos = {
      tipoUnidadMedida: tipoUnidadMedida.value,
      cantidadMP: cantidadMP.value,
      lote: lote.value,
      fecha: fecha.value,
      estado: 1,
    };

    console.log(_id, { datos });
    let res = await mater.editmateriaprimaC(_id, datos);
    listarmater();
    nuevo.value = false;
    console.log(res);
    q.notify({
      type: "positive",
      color: "black",
      message: "Materia actualizada exitosamente.",
      position: "top",
      progress: true,
    });
  }
}

listarmater();
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
