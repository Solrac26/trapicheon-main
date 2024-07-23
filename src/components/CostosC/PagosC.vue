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
              Costos ‣ Pagos
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
                    :loading="loading"
                    :disable="loading"
                    :class="{ 'cursor-not-allowed': loading }"
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
                    :loading="loading"
                    :disable="loading"
                    :class="{ 'cursor-not-allowed': loading }"
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
                  v-model="cedula"
                  label="Cedula*"
                  style="margin-bottom: 10px"
                  type= "number"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />

                <q-select
                  dense
                  outlined
                  v-model="rolPagos"
                  label="Rol*"
                  style="margin-bottom: 10px"
                  :options="['Admin', 'Empleado']"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />

                <q-input
                  dense
                  outlined
                  v-model="conceptoPagos"
                  label="Descripción*"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                  type="textarea"
                />           
                
                <q-select
                  dense
                  outlined
                  v-model="metodPagos"
                  label="Metodo de Pago*"
                  :options="['Tarjeta', 'Efectivo']"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />
                
                <p style="margin-left: 10px; opacity: 0.5;">Fecha Inicio</p>
                <q-input
                  dense
                  outlined
                  v-model="fechaPagos"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                  type="date"
                />

                <p style="margin-left: 10px; opacity: 0.5;">Fecha Fin</p>
                <q-input
                  dense
                  outlined
                  v-model="tiempoPagos"
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
  import { pagosCStore } from "../../stores/PagosC.js";
  import { useQuasar } from "quasar";
  
  const q = useQuasar();
  const pagosC = pagosCStore();
  let rows = ref();
  
  let cedula = ref("");
  let rolPagos = ref("");
  let conceptoPagos = ref("");
  let fechaPagos = ref("");
  let tiempoPagos = ref("");
  let metodPagos = ref("");

  let nuevo = ref(false);
  let bd = ref(0);
  let _id = "";
  
  let loading = ref(false);

  let columns = ref([
    {
      name: "cedula",
      required: true,
      label: "Cedula",
      align: "left",
      field: "cedula",
      sortable: false,
    },
    {
      name: "rolPagos",
      required: true,
      label: "Rol",
      align: "left",
      field: "rolPagos",
      sortable: false,
    },
    {
      name: "conceptoPagos",
      required: true,
      label: "Descripción",
      align: "left",
      field: "conceptoPagos",
      sortable: false,
    },
    {
      name: "fechaPagos",
      required: true,
      label: "Fecha Inicio",
      align: "left",
      field: "fechaPagos",
      sortable: false,
    },
    {
      name: "metodPagos",
      required: true,
      label: "Metodo de Pago",
      align: "left",
      field: "metodPagos",
      sortable: false,
    },
    {
      name: "tiempoPagos",
      required: true,
      label: "Fecha Final",
      align: "left",
      field: "tiempoPagos",
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

  const listarPagosC = async () => {
  rows.value = await pagosC.getpagosC();
};

listarPagosC();

function edit(row) {
  bd.value = 1;
  nuevo.value = true;
  _id = row._id;
  cedula.value = row.cedula;
  rolPagos.value = row.rolPagos;
  conceptoPagos.value = row.conceptoPagos;
  fechaPagos.value = row.fechaPagos;
  tiempoPagos.value = row.tiempoPagos;
  metodPagos.value = row.metodPagos;
}

function guardar() {
  bd.value = 0
  nuevo.value = true;
  limpiarformulario()
}

async function inactive(props) {
  loading.value = true;
  console.log("desactivado", props.cedula);
  let res = await pagosC.inactivepagosC(props._id);
  loading.value = false;
  listarPagosC();
}

async function active(props) {
  loading.value = true;
  console.log("activado", props.cedula);
  let res = await pagosC.activepagosC(props._id);
  loading.value = false;
  listarPagosC();
}

function limpiarformulario() {
  cedula.value = "";
  rolPagos.value = "";
  conceptoPagos.value = "";
  fechaPagos.value = "";
  tiempoPagos.value = "";
  metodPagos.value = "";
  bd.value = 0;
}

async function guardarEditarDatos() {
  if (bd.value === 0) {
    if (cedula.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un número de pago válido.",
        position: "top",
      });
      return;
    }

    if (rolPagos.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un rol de pago válido.",
        position: "top",
      });
      return;
    }

    if (conceptoPagos.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un concepto de pago válido.",
        position: "top",
      });
      return;
    }

    if (fechaPagos.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese fecha de pago válida.",
        position: "top",
      });
      return;
    }

    if (tiempoPagos.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un tiempo de pago válido.",
        position: "top",
      });
      return;
    }

    if (metodPagos.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un metodo de pago válido.",
        position: "top",
      });
      return;
    }

    const datos = {
      cedula: cedula.value,
      rolPagos: rolPagos.value,
      conceptoPagos: conceptoPagos.value,
      fechaPagos: fechaPagos.value,
      tiempoPagos: tiempoPagos.value,
      metodPagos: metodPagos.value,
      estado: 0,
    };

    let res = await pagosC.addpagosC(datos);

    listarPagosC();
    nuevo.value = false;    
    console.log(res);

    q.notify({
      type: "positive",
      color: "black",
      message: "Pago añadido exitosamente.",
      position: "top",
      progress: true
    });
  } else {
    if (cedula.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un número de pago válido.",
        position: "top",
      });
      return;
    }

    if (rolPagos.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un rol de pago válido.",
        position: "top",
      });
      return;
    }

    if (conceptoPagos.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un concepto de pago válido.",
        position: "top",
      });
      return;
    }

    if (fechaPagos.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese fecha de pago válida.",
        position: "top",
      });
      return;
    }

    if (tiempoPagos.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un tiempo de pago válido.",
        position: "top",
      });
      return;
    }

    if (metodPagos.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un metodo de pago válido.",
        position: "top",
      });
      return;
    }

    const datos = {
      cedula: cedula.value,
      rolPagos: rolPagos.value,
      conceptoPagos: conceptoPagos.value,
      fechaPagos: fechaPagos.value,
      tiempoPagos: tiempoPagos.value,
      metodPagos: metodPagos.value,
      estado: 1,
    };

    console.log(_id, { datos });
    let res = await pagosC.editpagosC(_id, datos);
    listarPagosC();
    nuevo.value = false; 
    console.log(res);
    q.notify({
      type: "negative",
      color: "black",
      progress: true,
      message: "Pago actualizado exitosamente.",
      position: "top",
    });
  }
}
listarPagosC();
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
