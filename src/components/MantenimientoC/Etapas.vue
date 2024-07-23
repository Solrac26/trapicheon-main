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
              Mantenimiento ‣ Etapas
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
                  v-model="nombreE"
                  label="Nombre Etapa*"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />

                <q-input
                  dense
                  outlined
                  v-model="descripcionEtapa"
                  label="Descripcion*"
                  style="margin-bottom: 10px"
                  type="textarea"
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
import { etapasStore } from "../../stores/Etapas.js";
import { useQuasar } from "quasar";

const q = useQuasar();
const etapas = etapasStore();
let rows = ref();

let nombreE = ref("");
let descripcionEtapa = ref("");

let nuevo = ref(false);
let bd = ref(0);
let _id = "";

let loading = ref(false);

let columns = ref([
  {
    name: "nombreE",
    required: true,
    label: "Nombre de la Etapa",
    align: "left",
    field: "nombreE",
    sortable: false,
  },
  {
    name: "descripcionEtapa",
    required: true,
    label: "Descripcion",
    align: "left",
    field: "descripcionEtapa",
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

const listaretapas = async () => {
  rows.value = await etapas.getetapas();
  // console.log(rows.value);
};

listaretapas();

function edit(row) {
  bd.value = 1;
  nuevo.value = true;
  _id = row._id;
  nombreE.value = row.nombreE; 
  descripcionEtapa.value = row.descripcionEtapa;
}

function guardar() {
  bd.value = 0
  nuevo.value = true;
  limpiarformulario()
}

async function inactive(props) {
  loading.value = true;
  console.log("desactivado", props.nombreE);
  let res = await etapas.inactiveetapas(props._id);
  loading.value = false;
  listaretapas();
}

async function active(props) {
  loading.value = true;
  console.log("activado", props.nombreE);
  let res = await etapas.activeetapas(props._id);
  loading.value = false;
  listaretapas();
}

function limpiarformulario() {
  nombreE.value = "";
  descripcionEtapa.value = "";
  bd.value = 0;
}

async function guardarEditarDatos() {
  if (bd.value === 0) {
    if (nombreE.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre de etapa válido.",
        position: "top",
      });
      return;
    }

    if (descripcionEtapa.value === "") {
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
      nombreE: nombreE.value,
      descripcionEtapa:descripcionEtapa.value,
      estado: 0,
    };

    let res = await etapas.addetapas(datos);

    listaretapas();
    nuevo.value = false;
    console.log(res);

    q.notify({
      type: "positive",
      color: "black",
      message: "Etapa añadido exitosamente.",
      position: "top",
      progress: true
    });
  } else {
    if (nombreE.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre de etapa válido.",
        position: "top",
      });
      return;
    }

    if (descripcionEtapa.value === "") {
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
      nombreE: nombreE.value,
      descripcionEtapa: descripcionEtapa.value,
      estado: 1,
    };

    console.log(_id, { datos });
    let res = await etapas.editetapas(_id, datos);
    listaretapas();
    nuevo.value = false; 
    console.log(res);
    q.notify({
      type: "negative",
      color: "black",
      progress: true,
      message: "Etapa actualizada exitosamente.",
      position: "top",
    });
  }
}

listaretapas();
</script>

<style scoped>
.lg4 {
  text-decoration: none;
  color: white;
}

.material-icons {
  font-size: 5em;
  margin-top: 10%;
}

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

.contenedor {
  width: 90%;
  max-width: 1200px;
  margin: auto;
  padding: 40px 0;

  /* Flexbox */
  /* display: flex;
      gap: 20px; */

  /* Grid */
  display: grid;
  grid-template-columns: 3fr;
  gap: 20px;
}

.contenedor-conciertos {
  /* Flexbox */
  /* width: 70%;
      display: flex;
      flex-wrap: wrap;
      gap: 20px; */

  /* Grid */
  display: grid;
  grid-template-columns: repeat(3, 2fr);
  gap: 20px;
  margin-bottom: 50px;
}

.card {
  border-radius: 10px;
  min-height: 200px;
  font-weight: bold;
  padding: 20px;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center center;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  transition: transform 0.2s ease-in-out;

  /* Flexbox */
  /* width: calc(33.33% - 20px); */
}

.card:hover {
  transform: scale(1.05);
}

.card .textos {
  height: 100%;
  color: #000000;

  /* Flebox */
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;

  /* Grid */
  /* display: grid;
      grid-template-rows: 1fr auto; */
}

@media screen and (max-width: 900px) {
  .contenedor-conciertos {
    /* Flexbox */
    /* width: 70%;
      display: flex;
      flex-wrap: wrap;
      gap: 20px; */

    /* Grid */
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}

@media screen and (max-width: 700px) {
  .contenedor-conciertos {
    /* Flexbox */
    /* width: 70%;
      display: flex;
      flex-wrap: wrap;
      gap: 20px; */

    /* Grid */
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media screen and (max-width: 600px) {
  .contenedor-conciertos {
    /* Flexbox */
    /* width: 70%;
      display: flex;
      flex-wrap: wrap;
      gap: 20px; */

    /* Grid */
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
  }
}
</style>
