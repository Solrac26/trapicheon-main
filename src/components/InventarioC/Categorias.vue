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
              Inventario ‣ Categorías
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
                <q-select
                  dense
                  outlined
                  v-model="nombreCategoria"
                  label="Nombre de la Categoria"
                  :options="['Semilla', 'Cítrico', 'Empaques', 'Batidores']"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />
                <q-input
                  dense
                  outlined
                  v-model="descripcionCategoria"
                  label="Descripcion"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                  type="textarea"
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
import { cateStore } from "../../stores/Categorias.js";
import { useQuasar } from "quasar";

const q = useQuasar();
const cate = cateStore();
let rows = ref();

let nombreCategoria = ref("");
let descripcionCategoria = ref("");

let nuevo = ref(false);
let bd = ref(0);
let _id = "";

let columns = ref([
  {
    name: "nombreCategoria",
    required: true,
    label: "Nombre de la Categoria",
    align: "left",
    field: "nombreCategoria",
    sortable: false,
  },
  {
    name: "descripcionCategoria",
    required: true,
    label: "Descripcion",
    align: "left",
    field: "descripcionCategoria",
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

const listarcate = async () => {
  rows.value = await cate.getcategoriasI();
};

listarcate();

function edit(row) {
  bd.value = 1;
  nuevo.value = true;
  _id = row._id;
  nombreCategoria.value = row.nombreCategoria;
  descripcionCategoria.value = row.descripcionCategoria;
}

function guardar() {
  bd.value = 0;
  limpiarFormulario();
  nuevo.value = true;
}

async function inactive(props) {
  console.log("desactivado", props.nombreCategoria);
  let res = await cate.inactivecategoriasI(props._id);
  listarcate();
}

async function active(props) {
  console.log("activado", props.nombreCategoria);
  let res = await cate.activecategoriasI(props._id);
  listarcate();
}

function limpiarFormulario() {
  nombreCategoria.value = "";
  descripcionCategoria.value = "";
}

async function guardarEditarDatos() {
  if (bd.value === 0) {
    if (nombreCategoria.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre de categoría válido.",
        position: "top",
      });
      return;
    }

    if (descripcionCategoria.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una descripción válida.",
        position: "top",
      });
      return;
    }

    const datos = {
      nombreCategoria: nombreCategoria.value,
      descripcionCategoria: descripcionCategoria.value,
      estado: 0,
    };

    let res = await cate.addcategoriasI(datos);

    listarcate();
    nuevo.value = false;
    console.log(res);
    q.notify({
      type: "positive",
      color: "black",
      message: "Categoría añadida exitosamente.",
      position: "top",
      progress: true,
    });
  } else {
    if (nombreCategoria.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre de categoría válido.",
        position: "top",
      });
      return;
    }

    if (descripcionCategoria.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una descripción válida.",
        position: "top",
      });
      return;
    }

    const datos = {
      nombreCategoria: nombreCategoria.value,
      descripcionCategoria: descripcionCategoria.value,
      estado: 1,
    };

    console.log(_id, { datos });
    let res = await cate.editcategoriasI(_id, datos);
    listarcate();
    nuevo.value = false;
    console.log(res);
    q.notify({
      type: "positive",
      color: "black",
      message: "Categoría actualizada exitosamente.",
      position: "top",
      progress: true,
    });
  }
}

listarcate();
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
