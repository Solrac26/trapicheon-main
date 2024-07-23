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
                margin: 0 0 0px;
                /* font-weight: bold; */
              "
            >
              Inventario ‣ Marcas
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
                  v-model="nombreMarca"
                  label="Nombre de la Marca"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />
                <q-input
                  dense
                  outlined
                  v-model="descripcionMarca"
                  label="Descripcion de la marca"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                  type="textarea"
                />
                <q-input
                  dense
                  outlined
                  v-model="creadorMarca"
                  label="Creador de la Marca"
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
import { marStore } from "../../stores/Marcas.js";
import { useQuasar } from "quasar";

const q = useQuasar();
const mar = marStore();
let rows = ref();

let nombreMarca = ref("");
let descripcionMarca = ref("");
let creadorMarca = ref("");

let nuevo = ref(false);
let bd = ref(0);
let _id = "";

let columns = ref([
  {
    name: "nombreMarca",
    required: true,
    label: "Nombre de la Marca",
    align: "left",
    field: "nombreMarca",
    sortable: false,
  },
  {
    name: "descripcionMarca",
    required: true,
    label: "Descripcion de la Marca",
    align: "left",
    field: "descripcionMarca",
    sortable: false,
  },
  {
    name: "creadorMarca",
    required: true,
    label: "Creador",
    align: "left",
    field: "creadorMarca",
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

const listarmar = async () => {
  rows.value = await mar.getmarcas();
};

listarmar();

function edit(row) {
  bd.value = 1;
  nuevo.value = true;
  _id = row._id;
  nombreMarca.value = row.nombreMarca;
  descripcionMarca.value = row.descripcionMarca;
  creadorMarca.value = row.creadorMarca;
}

function guardar() {
  bd.value = 0;
  limpiarFormulario();
  nuevo.value = true;
}

async function inactive(props) {
  console.log("desactivado", props.nombreMarca);
  let res = await mar.inactivemarcas(props._id);
  listarmar();
}

async function active(props) {
  console.log("activado", props.nombreMarca);
  let res = await mar.activemarcas(props._id);
  listarmar();
}

function limpiarFormulario() {
  nombreMarca.value = "";
  descripcionMarca.value = "";
  creadorMarca.value = "";
}

async function guardarEditarDatos() {
  if (bd.value === 0) {
    if (nombreMarca.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre de marca válido.",
        position: "top",
      });
      return;
    }

    if (descripcionMarca.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una descripción válida.",
        position: "top",
      });
      return;
    }

    if (creadorMarca.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un creador de marca válido.",
        position: "top",
      });
      return;
    }

    const datos = {
      nombreMarca: nombreMarca.value,
      descripcionMarca: descripcionMarca.value,
      creadorMarca: creadorMarca.value,
      estado: 0,
    };

    let res = await mar.addmarcas(datos);

    listarmar();
    nuevo.value = false;
    console.log(res);
    q.notify({
      type: "positive",
      color: "black",
      message: "Marca añadida exitosamente.",
      position: "top",
      progress: true,
    });
  } else {
    if (nombreMarca.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre de marca válido.",
        position: "top",
      });
      return;
    }

    if (descripcionMarca.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una descripción válida.",
        position: "top",
      });
      return;
    }

    if (creadorMarca.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un creador de marca válido.",
        position: "top",
      });
      return;
    }

    const datos = {
      nombreMarca: nombreMarca.value,
      descripcionMarca: descripcionMarca.value,
      creadorMarca: creadorMarca.value,
      estado: 1,
    };

    console.log(_id, { datos });
    let res = await mar.editmarcas(_id, datos);
    listarmar();
    nuevo.value = false;
    console.log(res);
    q.notify({
      type: "positive",
      color: "black",
      message: "Marca actualizada exitosamente.",
      position: "top",
      progress: true,
    });
  }
}

listarmar();
</script>

<style>

</style>
