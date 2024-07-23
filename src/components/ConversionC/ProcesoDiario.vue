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
              Coversión ‣ Proceso Diario
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
                <q-input
                  dense
                  outlined
                  v-model="nombreActi"
                  label="Nombre de Actividad*"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />
                <q-input
                  dense
                  outlined
                  v-model="descripcionActi"
                  label="Descripción*"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                  type="textarea"
                />
                <q-input
                  dense
                  outlined
                  v-model="horasActi"
                  label="Horas*"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                  type="number"
                />
                <q-input
                  dense
                  outlined
                  v-model="personas"
                  label="Personas*"
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
                <q-input
                  dense
                  outlined
                  v-model="lote"
                  label="Lote*"
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
  import { procesoDStore } from "../../stores/ProcesoDiario.js";
  import { useQuasar } from "quasar";
  
  const q = useQuasar();
  const procesoD = procesoDStore();
  let rows = ref();
  
  let nombreActi = ref("");
  let descripcionActi = ref("");
  let horasActi = ref("");
  let personas = ref("");
  let fecha = ref("");
  let lote = ref("");
  
  let nuevo = ref(false);
  let bd = ref(0);
  let _id = "";
  
  let columns = ref([
    {
      name: "nombreActi",
      required: true,
      label: "Nombre de la Actividad",
      align: "left",
      field: "nombreActi",
      sortable: false,
    },
    {
      name: "descripcionActi",
      required: true,
      label: "Descripción",
      align: "left",
      field: "descripcionActi",
      sortable: false,
    },
    {
      name: "horasActi",
      required: true,
      label: "Horas",
      align: "left",
      field: "horasActi",
      sortable: false,
    },
    {
      name: "personas",
      required: true,
      label: "Personas",
      align: "left",
      field: "personas",
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
      name: "lote",
      required: true,
      label: "Lote",
      align: "left",
      field: "lote",
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


  const listarprocesos = async () => {
  rows.value = await procesoD.getprocesos_diarios()
};

listarprocesos();

function edit(row) {
  bd.value = 1;
  nuevo.value = true;
  _id = row._id;
  nombreActi.value = row.nombreActi;
  descripcionActi.value = row.descripcionActi;
  horasActi.value = row.horasActi;
  personas.value = row.personas;
  fecha.value = row.fecha;
  lote.value = row.lote;
}

  function guardar() {
  bd.value = 0;
  limpiarFormulario();
  nuevo.value = true;
}

async function inactive(props) {
  console.log("desactivado", props.nombreActi);
  let res = await procesoD.inactiveprocesos_diarios(props._id);
  listarprocesos();
}

async function active(props) {
  console.log("activado", props.nombreActi);
  let res = await procesoD.activeprocesos_diarios(props._id);
  listarprocesos();
}

function limpiarFormulario() {
  nombreActi.value = "";
  descripcionActi.value = "";
  horasActi.value = "";
  personas.value = "";
  fecha.value = "";
  lote.value = "";
  bd.value = 0;
}

async function guardarEditarDatos() {
  if (bd.value === 0) {
    if (nombreActi.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre de actividad válido.",
        position: "top",
      });
      return;
    }

    if (descripcionActi.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una descripción de actividad válida.",
        position: "top",
      });
      return;
    }

    if (horasActi.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese hora de actividad válida.",
        position: "top",
      });
      return;
    }

    if (personas.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese persona válida.",
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

    const datos = {
      nombreActi: nombreActi.value,
      descripcionActi: descripcionActi.value,
      horasActi: horasActi.value,
      personas: personas.value,
      fecha: fecha.value,
      lote: lote.value,
      estado: 0,
    };

    let res = await procesoD.addprocesos_diarios(datos);

    listarprocesos();
    nuevo.value = false;
    console.log(res);

    q.notify({
      type: "positive",
      color: "black",
      message: "Proceso Diario añadido exitosamente.",
      position: "top",
      progress: true
    });
  } else {
    if (nombreActi.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre válido.",
        position: "top",
      });
      return;
    }

    if (descripcionActi.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una finca válida.",
        position: "top",
      });
      return;
    }

    if (horasActi.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una descripción válido.",
        position: "top",
      });
      return;
    }

    if (personas.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una fecha válida.",
        position: "top",
      });
      return;
    }

    if (fecha.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un metodo válido.",
        position: "top",
      });
      return;
    }

    if (lote.value === "") {
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
      nombreActi: nombreActi.value,
      descripcionActi: descripcionActi.value,
      horasActi: horasActi.value,
      personas: personas.value,
      fecha: fecha.value,
      lote: lote.value,
      estado: 1,
    };

    console.log(_id, { datos });
    let res = await procesoD.editprocesos_diarios(_id, datos);
    listarprocesos();
    nuevo.value = false; 
    console.log(res);
    q.notify({
      type: "negative",
      color: "black",
      progress: true,
      message: "Proceso Diario actualizado exitosamente.",
      position: "top",
    });
  }
}

listarprocesos();
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
