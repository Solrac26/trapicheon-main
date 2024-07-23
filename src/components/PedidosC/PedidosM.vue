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
              Pedidos ‣ Ver Pedidos
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
                <q-input
                  dense
                  outlined
                  v-model="numeroDocCliente"
                  label="Numero Documento*"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"  
                  type="number"
                />
                <q-input
                  dense
                  outlined
                  v-model="nombreCliente"
                  label="Nombre*"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />
                <q-input
                  dense
                  outlined
                  v-model="telefonoCliente"
                  label="Telefono*"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                  type="number"
                />
                <q-input
                  dense
                  outlined
                  v-model="direccionClien"
                  label="Direccion*"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />
                <q-select
                  dense
                  outlined
                  v-model="tipoPanela"
                  label="Tipo Panela*"
                  :options="['Bloque', 'Granulada']"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />
                <q-input
                  dense
                  outlined
                  v-model="cantidadesPedido"
                  label="Cantidad*"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                  type="number"
                />
                
                <q-select
                  dense
                  outlined
                  v-model="tipoEmpaque"
                  :options="['Polímero', 'Papel', 'Cartón Corrugado']"
                  label="Tipo de Empaque*"
                  style="margin-bottom: 10px"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />

                <q-input
                  dense
                  outlined
                  v-model="detallesFactura"
                  label="Detalles Factura*"
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
  import { pedidosMStore } from "../../stores/PedidosM.js";
  import { useQuasar } from "quasar";
  
  const q = useQuasar();
  const pedidosM = pedidosMStore();
  let rows = ref();
  
  let numeroDocCliente = ref("");
  let nombreCliente = ref("");
  let telefonoCliente = ref("");
  let direccionClien = ref("");
  let tipoPanela = ref("");
  let cantidadesPedido = ref("");
  let tipoEmpaque = ref("");
  let detallesFactura= ref("");

  
  let nuevo = ref(false);
  let bd = ref(0);
  let _id = "";
  
  
  
  let columns = ref([
    {
      name: "numeroDocCliente",
      required: true,
      label: "Numero Documento",
      align: "left",
      field: "numeroDocCliente",
      sortable: false,
    },
    {
      name: "nombreCliente",
      required: true,
      label: "Nombre",
      align: "left",
      field: "nombreCliente",
      sortable: false,
    },
    {
      name: "telefonoCliente",
      required: true,
      label: "Telefono",
      align: "left",
      field: "telefonoCliente",
      sortable: false,
    },
    {
      name: "direccionClien",
      required: true,
      label: "Direccion",
      align: "left",
      field: "direccionClien",
      sortable: false,
    },
    {
      name: "tipoPanela",
      required: true,
      label: "Tipo Panela",
      align: "left",
      field: "tipoPanela",
      sortable: false,
    },
    {
      name: "cantidadesPedido",
      required: true,
      label: "Cantidad",
      align: "left",
      field: "cantidadesPedido",
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
      name: "detallesFactura",
      required: true,
      label: "Detalles Factura",
      align: "left",
      field: "detallesFactura",
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


  const listarpedidosM = async () => {
  rows.value = await pedidosM.getpedidos()
};

listarpedidosM();

function edit(row) {
  bd.value = 1;
  nuevo.value = true;
  _id = row._id;
  numeroDocCliente.value = row.numeroDocCliente;
  nombreCliente.value = row.nombreCliente;
  telefonoCliente.value = row.telefonoCliente;
  direccionClien.value = row.direccionClien;
  tipoPanela.value = row.tipoPanela;
  cantidadesPedido.value = row.cantidadesPedido;
  tipoEmpaque.value = row.tipoEmpaque;
  detallesFactura.value = row.detallesFactura;
}

  function guardar() {
  bd.value = 0;
  limpiarFormulario();
  nuevo.value = true;
}

async function inactive(props) {
  console.log("desactivado", props.numeroDocCliente);
  let res = await pedidosM.inactivepedidos(props._id);
  listarpedidosM();
}

async function active(props) {
  console.log("activado", props.numeroDocCliente);
  let res = await pedidosM.activepedidos(props._id);
  listarpedidosM();
}

function limpiarFormulario() {
  numeroDocCliente.value = "";
  nombreCliente.value = "";
  telefonoCliente.value = "";
  direccionClien.value = "";
  tipoPanela.value = "";
  cantidadesPedido.value = "";
  tipoEmpaque.value = "";
  detallesFactura.value = "";
}

async function guardarEditarDatos() {
  if (bd.value === 0) {
    if (numeroDocCliente.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un número de documento válido.",
        position: "top",
      });
      return;
    }

    if (nombreCliente.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre de cliente válido.",
        position: "top",
      });
      return;
    }

    if (telefonoCliente.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un número telefonico de cliente válido.",
        position: "top",
      });
      return;
    }

    if (direccionClien.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una dirección de cliente válida.",
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

    if (cantidadesPedido.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una cantidad de pedido válido.",
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

    if (detallesFactura.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un detalle de factura válido.",
        position: "top",
      });
      return;
    }

    const datos = {
      numeroDocCliente: numeroDocCliente.value,
      nombreCliente: nombreCliente.value,
      telefonoCliente: telefonoCliente.value,
      direccionClien: direccionClien.value,
      tipoPanela: tipoPanela.value,
      cantidadesPedido: cantidadesPedido.value,
      tipoEmpaque: tipoEmpaque.value,
      detallesFactura: detallesFactura.value,
      estado: 0,
    };

    let res = await pedidosM.addpedidos(datos);

    listarpedidosM();
    nuevo.value = false;
    console.log(res);

    q.notify({
      type: "positive",
      color: "black",
      message: "Pedido añadido exitosamente.",
      position: "top",
      progress: true
    });
  } else {
    if (numeroDocCliente.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un número de documento válido.",
        position: "top",
      });
      return;
    }

    if (nombreCliente.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un nombre de cliente válido.",
        position: "top",
      });
      return;
    }

    if (telefonoCliente.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un número telefonico de cliente válido.",
        position: "top",
      });
      return;
    }

    if (direccionClien.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una dirección de cliente válida.",
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

    if (cantidadesPedido.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese una cantidad de pedido válido.",
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

    if (detallesFactura.value === "") {
      q.notify({
        type: "negative",
        color: "black",
        progress: true,
        message: "Por favor, ingrese un detalle de factura válido.",
        position: "top",
      });
      return;
    }

    const datos = {
      numeroDocCliente: numeroDocCliente.value,
      nombreCliente: nombreCliente.value,
      telefonoCliente: telefonoCliente.value,
      direccionClien: direccionClien.value,
      tipoPanela: tipoPanela.value,
      cantidadesPedido: cantidadesPedido.value,
      tipoEmpaque: tipoEmpaque.value,
      detallesFactura: detallesFactura.value,
      estado: 1,
    };

    console.log(_id, { datos });
    let res = await pedidosM.editpedidos(_id, datos);
    listarpedidosM();
    nuevo.value = false; 
    console.log(res);
    q.notify({
      type: "negative",
      color: "black",
      progress: true,
      message: "Pedido actualizado exitosamente.",
      position: "top",
    });
  }
}

listarpedidosM();



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
