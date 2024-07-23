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
              Costos ‣ Gastos Ocasionales
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
                <!-- <q-input outlined v-model="nombreGastoOcas" label="Nombre del Gasto" style="margin-bottom: 10px" />
                <q-input outlined v-model="finca" label="Finca" style="margin-bottom: 10px" />
                <q-input outlined v-model="descripcionOcas" label="Descripcion" style="margin-bottom: 10px" />
                <q-input outlined v-model="fechaPagosOcas" label="Fecha" style="margin-bottom: 10px" />
                <q-input outlined v-model="metodPagosOcas" label="Metodo de Pago" style="margin-bottom: 10px" />
                <q-input outlined v-model="valorGOcas" label="Valor del Gasto" style="margin-bottom: 10px" /> -->

                <q-input
                  dense
                  outlined
                  v-model="nombreGastoOcas"
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
                  v-model="descripcionOcas"
                  label="Descripcion*"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                  type="textarea"
                />

                <q-input
                  dense
                  outlined
                  v-model="fechaPagosOcas"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                  type="date"
                />

                <q-select
                  dense
                  outlined
                  v-model="metodPagosOcas"
                  label="Metodo de Pago*"
                  :options="['Tarjeta', 'Efectivo']"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />

                <q-input
                  dense
                  outlined
                  v-model="valorGOcas"
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
  import { gastosocasionalesStore } from "../../stores/GastosOcasionales.js";
  import { useQuasar } from "quasar";
  
  const q = useQuasar();
  const gastosocasionales = gastosocasionalesStore();
  let rows = ref();
  
  let nombreGastoOcas = ref("");
  let finca = ref("");
  let descripcionOcas = ref("");
  let fechaPagosOcas = ref("");
  let metodPagosOcas = ref("");
  let valorGOcas = ref("");

  
  let nuevo = ref(false);
  let bd = ref(0);
  let _id = "";
  
  
  
  let columns = ref([
    {
      name: "nombreGastoOcas",
      required: true,
      label: "Nombre del Gasto",
      align: "left",
      field: "nombreGastoOcas",
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
      name: "descripcionOcas",
      required: true,
      label: "Descripcion",
      align: "left",
      field: "descripcionOcas",
      sortable: false,
    },
    {
      name: "fechaPagosOcas",
      required: true,
      label: "Fecha",
      align: "left",
      field: "fechaPagosOcas",
      sortable: false,
    },
    {
      name: "metodPagosOcas",
      required: true,
      label: "Metodo de Pago",
      align: "left",
      field: "metodPagosOcas",
      sortable: false,
    },
    {
      name: "valorGOcas",
      required: true,
      label: "Valor del Gasto",
      align: "left",
      field: "valorGOcas",
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

  const listargastosOcas = async () => {
  rows.value = await gastosocasionales.getgastosocasionales();
};

listargastosOcas();

function edit(row) {
  bd.value = 1;
  nuevo.value = true;
  _id = row._id;
  nombreGastoOcas.value = row.nombreGastoOcas;
  finca.value = row.finca;
  descripcionOcas.value = row.descripcionOcas;
  fechaPagosOcas.value = row.fechaPagosOcas;
  metodPagosOcas.value = row.metodPagosOcas;
  valorGOcas.value = row.valorGOcas;
}

  function guardar() {
  bd.value = 0;
  limpiarFormulario();
  nuevo.value = true;
}

async function inactive(props) {
  console.log("desactivado", props.nombreGastoOcas);
  let res = await gastosocasionales.inactivegastosocasionales(props._id);
  listargastosOcas();
}

async function active(props) {
  console.log("desactivado", props.nombreGastoOcas);
  let res = await gastosocasionales.activegastosocasionales(props._id);
  listargastosOcas();
}

function limpiarFormulario() {
  nombreGastoOcas.value = "";
  finca.value = "";
  descripcionOcas.value = "";
  fechaPagosOcas.value = "";
  metodPagosOcas.value = "";
  valorGOcas.value = "";
}

async function guardarEditarDatos() {
  if (bd.value === 0) {
    if (nombreGastoOcas.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre de medida válido.",
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

    if (descripcionOcas.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una descripcion válida.",
        position: "top",
      });
      return;
    }

    if (fechaPagosOcas.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una fecha válida.",
        position: "top",
      });
      return;
    }

    if (metodPagosOcas.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un metodo válido.",
        position: "top",
      });
      return;
    }

    if (valorGOcas.value === "") {
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
      nombreGastoOcas: nombreGastoOcas.value,
      finca: finca.value,
      descripcionOcas: descripcionOcas.value,
      fechaPagosOcas: fechaPagosOcas.value,
      metodPagosOcas: metodPagosOcas.value,
      valorGOcas: valorGOcas.value,
      estado: 0,
    };

    let res = await gastosocasionales.addgastosocasionales(datos);

    listargastosOcas();
    nuevo.value = false;
    console.log(res);

    q.notify({
      type: "positive",
      color: "black",
      message: "Gasto añadido exitosamente.",
      position: "top",
      progress: true
    });
  } else {
    if (nombreGastoOcas.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre válido.",
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

    if (descripcionOcas.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una descripción válido.",
        position: "top",
      });
      return;
    }

    if (fechaPagosOcas.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una fecha válida.",
        position: "top",
      });
      return;
    }

    if (metodPagosOcas.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un metodo válido.",
        position: "top",
      });
      return;
    }

    if (valorGOcas.value === "") {
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
      nombreGastoOcas: nombreGastoOcas.value,
      finca: finca.value,
      descripcionOcas: descripcionOcas.value,
      fechaPagosOcas: fechaPagosOcas.value,
      metodPagosOcas: metodPagosOcas.value,
      valorGOcas: valorGOcas.value,
      estado: 1,
    };

    console.log(_id, { datos });
    let res = await gastosocasionales.editgastosocasionales(_id, datos);
    listargastosOcas();
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

listargastosOcas();




  </script>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #ffffff;
  z-index: 9999;
  
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}


</style>
